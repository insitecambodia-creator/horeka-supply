import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { PUBLIC_SUPPLIER_WHERE } from "@/lib/supplier-status";
import { escapeHtml } from "@/lib/html";
import { renderInquiryEmail, renderDetailRow } from "@/lib/email-templates";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_HOURS = 24;

type InquiryBody = {
  categorySlug?: string;
  email?: string;
  name?: string;
  business?: string;
  item?: string;
  quantity?: string;
  notes?: string;
  // Honeypot: a real visitor never fills this in; a bot filling any form field
  // blindly usually will. If set, pretend success without doing anything.
  company?: string;
};

export async function POST(request: NextRequest) {
  let body: InquiryBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (body.company) {
    return NextResponse.json({ suppliersSent: 0 });
  }

  const categorySlug = body.categorySlug?.trim();
  const email = body.email?.trim();
  if (!categorySlug || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email and category are required" }, { status: 400 });
  }

  const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
  if (!category) {
    return NextResponse.json({ error: "Unknown category" }, { status: 404 });
  }

  const since = new Date(Date.now() - RATE_LIMIT_HOURS * 60 * 60 * 1000);
  const recent = await prisma.inquiry.findFirst({
    where: { buyerEmail: email, categoryId: category.id, createdAt: { gte: since } },
  });
  if (recent) {
    return NextResponse.json(
      { error: "You've already sent a request for this category recently. Please try again later." },
      { status: 429 }
    );
  }

  const suppliers = await prisma.supplier.findMany({
    where: { categories: { some: { categoryId: category.id } }, email: { not: null }, ...PUBLIC_SUPPLIER_WHERE },
    select: { name: true, email: true },
  });

  if (suppliers.length === 0) {
    return NextResponse.json(
      { error: "No suppliers with a contact email are available in this category yet." },
      { status: 404 }
    );
  }

  const buyerName = body.name?.trim();
  const business = body.business?.trim();
  const item = body.item?.trim();
  const quantity = body.quantity?.trim();
  const notes = body.notes?.trim();

  const detailRows = [
    buyerName && renderDetailRow("Name", buyerName),
    business && renderDetailRow("Business", business),
    item && renderDetailRow("Looking for", quantity ? `${item} (${quantity})` : item),
    notes && renderDetailRow("Notes", notes),
  ]
    .filter(Boolean)
    .join("");

  const htmlContent = renderInquiryEmail({
    eyebrow: "New buyer inquiry",
    categoryName: category.name,
    buyerEmail: email,
    detailRows,
  });

  let suppliersSent = 0;
  for (const supplier of suppliers) {
    if (!supplier.email) continue;
    const sent = await sendEmail({
      to: { email: supplier.email, name: supplier.name },
      subject: `New buyer inquiry — ${category.name}`,
      htmlContent,
    });
    if (sent) suppliersSent += 1;
  }

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    const suppliersList = suppliers.map((s) => escapeHtml(s.name)).join(", ");
    const adminHtmlContent = renderInquiryEmail({
      eyebrow: "Inquiry copy",
      categoryName: category.name,
      buyerEmail: email,
      detailRows,
      footnote: `Sent to ${suppliersSent} of ${suppliers.length} suppliers with an email on file: ${suppliersList}.`,
    });
    await sendEmail({
      to: { email: adminEmail },
      subject: `Inquiry copy — ${category.name} (${suppliersSent}/${suppliers.length} sent)`,
      htmlContent: adminHtmlContent,
    });
  }

  await prisma.inquiry.create({
    data: {
      categoryId: category.id,
      buyerEmail: email,
      buyerName: buyerName || null,
      business: business || null,
      item: item || null,
      quantity: quantity || null,
      notes: notes || null,
      suppliersSent,
    },
  });

  return NextResponse.json({ suppliersSent });
}
