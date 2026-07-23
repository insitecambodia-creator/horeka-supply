import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

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
    where: { categories: { some: { categoryId: category.id } }, email: { not: null } },
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
    buyerName && `<p><strong>Name:</strong> ${buyerName}</p>`,
    business && `<p><strong>Business:</strong> ${business}</p>`,
    item && `<p><strong>Looking for:</strong> ${item}${quantity ? ` (${quantity})` : ""}</p>`,
    notes && `<p><strong>Notes:</strong> ${notes}</p>`,
  ]
    .filter(Boolean)
    .join("");

  const htmlContent = `
    <p>A hotel, restaurant or café in Cambodia is looking for <strong>${category.name}</strong> suppliers and would like you to get in touch.</p>
    <p><strong>Buyer contact:</strong> ${email}</p>
    ${detailRows}
    <p style="color:#78716c;font-size:12px;">Sent via Restaurant Cambodia Supply, a directory connecting hospitality buyers with suppliers in Cambodia.</p>
  `;

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
