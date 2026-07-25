import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

type ProductRow = {
  name?: string;
  unit?: string;
  price?: string;
};

type SubmissionBody = {
  name?: string;
  description?: string;
  city?: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  telegram?: string;
  email?: string;
  website?: string;
  categories?: string[];
  products?: ProductRow[];
  brands?: string[];
  // Honeypot: a real visitor never fills this in.
  company?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: NextRequest) {
  let body: SubmissionBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const name = body.name?.trim();
  const phone = body.phone?.trim();
  const email = body.email?.trim();
  const whatsapp = body.whatsapp?.trim();

  if (!name) {
    return NextResponse.json({ error: "Business name is required" }, { status: 400 });
  }
  if (!phone && !email && !whatsapp) {
    return NextResponse.json({ error: "Please provide at least one way to contact you (phone, email, or WhatsApp)" }, { status: 400 });
  }

  const categories = (body.categories ?? []).map((c) => c.trim()).filter(Boolean);
  const brands = (body.brands ?? []).map((b) => b.trim()).filter(Boolean);
  const products = (body.products ?? [])
    .map((p) => ({ name: p.name?.trim() ?? "", unit: p.unit?.trim() || undefined, price: p.price?.trim() || undefined }))
    .filter((p) => p.name);

  const submission = await prisma.supplierSubmission.create({
    data: {
      name,
      description: body.description?.trim() || null,
      city: body.city?.trim() || null,
      address: body.address?.trim() || null,
      phone: phone || null,
      whatsapp: whatsapp || null,
      telegram: body.telegram?.trim() || null,
      email: email || null,
      website: body.website?.trim() || null,
      categories,
      products: products.length > 0 ? products : undefined,
      brands,
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    const rows: string[] = [
      `<p><strong>Business:</strong> ${escapeHtml(name)}</p>`,
      body.description && `<p><strong>Description:</strong> ${escapeHtml(body.description)}</p>`,
      body.city && `<p><strong>City:</strong> ${escapeHtml(body.city)}</p>`,
      body.address && `<p><strong>Address:</strong> ${escapeHtml(body.address)}</p>`,
      phone && `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>`,
      whatsapp && `<p><strong>WhatsApp:</strong> ${escapeHtml(whatsapp)}</p>`,
      body.telegram && `<p><strong>Telegram:</strong> ${escapeHtml(body.telegram)}</p>`,
      email && `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
      body.website && `<p><strong>Website:</strong> ${escapeHtml(body.website)}</p>`,
      categories.length > 0 && `<p><strong>Categories:</strong> ${escapeHtml(categories.join(", "))}</p>`,
      brands.length > 0 && `<p><strong>Brands:</strong> ${escapeHtml(brands.join(", "))}</p>`,
      products.length > 0 &&
        `<p><strong>Products:</strong></p><ul>${products
          .map((p) => `<li>${escapeHtml(p.name)}${p.unit ? ` — ${escapeHtml(p.unit)}` : ""}${p.price ? ` — ${escapeHtml(p.price)}` : ""}</li>`)
          .join("")}</ul>`,
    ].filter((row): row is string => Boolean(row));

    await sendEmail({
      to: { email: adminEmail },
      subject: `New supplier submission — ${name}`,
      htmlContent: `<div>${rows.join("")}<p style="color:#78716c;font-size:12px;">Submission ID: ${submission.id}</p></div>`,
    });
  }

  return NextResponse.json({ ok: true });
}
