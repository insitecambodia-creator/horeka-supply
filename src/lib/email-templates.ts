import { escapeHtml } from "@/lib/html";

const PAPER = "#efe9d8";
const PAPER_RAISED = "#f5f0e3";
const INK = "#221d16";
const INK_SOFT = "#52483a";
const STAMP = "#a7332a";
const LINE = "#d2c6a6";

type InquiryEmailOptions = {
  // Shown as the small eyebrow label above the heading, e.g. "New buyer inquiry"
  eyebrow: string;
  categoryName: string;
  buyerEmail: string;
  detailRows: string; // pre-built <tr> markup for name/business/item/notes
  // Extra note rendered in a muted box below the details — used for the
  // admin copy's "sent to N of M suppliers" line. Omitted for the
  // supplier-facing version.
  footnote?: string;
};

// Table-based layout with every style inlined — email clients (Gmail,
// Outlook, Apple Mail) strip external/`<style>` CSS unpredictably, so
// nothing here relies on a stylesheet. Matches the site's cream/ink/
// brick-red "trade manifest" palette with web-safe font fallbacks, since
// custom fonts (Fraunces/IBM Plex) aren't reliably loadable in email.
export function renderInquiryEmail({ eyebrow, categoryName, buyerEmail, detailRows, footnote }: InquiryEmailOptions): string {
  const category = escapeHtml(categoryName);
  const buyer = escapeHtml(buyerEmail);

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>New buyer inquiry — ${category}</title>
</head>
<body style="margin:0; padding:0; background:${PAPER}; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};">
    <tr>
      <td align="center" style="padding:24px 16px;">
        <table role="presentation" width="100%" style="max-width:560px; background:${PAPER};" cellpadding="0" cellspacing="0">

          <!-- Header -->
          <tr>
            <td style="border-bottom:2px solid ${INK}; padding:0 0 16px;">
              <span style="font-family:ui-monospace,'SFMono-Regular',Menlo,monospace; font-size:12px; letter-spacing:0.03em; color:${INK_SOFT};">
                RESTAURANT CAMBODIA <strong style="color:${INK};">SUPPLY</strong>
              </span>
            </td>
          </tr>

          <!-- Body card -->
          <tr>
            <td style="padding:28px 0 8px;">
              <span style="display:inline-block; font-family:ui-monospace,'SFMono-Regular',Menlo,monospace; font-size:11px; letter-spacing:0.08em; text-transform:uppercase; color:${STAMP};">
                ${escapeHtml(eyebrow)}
              </span>
              <h1 style="margin:10px 0 0; font-family:Georgia,'Times New Roman',serif; font-size:24px; font-weight:500; color:${INK}; line-height:1.2;">
                ${category}
              </h1>
              <p style="margin:12px 0 0; font-size:15px; line-height:1.6; color:${INK_SOFT};">
                A hotel, restaurant or caf&eacute; in Cambodia is looking for ${category} suppliers and would like you to get in touch.
              </p>
            </td>
          </tr>

          <!-- Buyer contact box -->
          <tr>
            <td style="padding:16px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER_RAISED}; border:1.5px solid ${INK};">
                <tr>
                  <td style="padding:16px 18px;">
                    <span style="display:block; font-family:ui-monospace,'SFMono-Regular',Menlo,monospace; font-size:10.5px; text-transform:uppercase; letter-spacing:0.04em; color:${INK_SOFT};">Buyer contact</span>
                    <a href="mailto:${buyer}" style="display:block; margin-top:4px; font-size:16px; font-weight:600; color:${STAMP}; text-decoration:none;">${buyer}</a>
                  </td>
                </tr>
                ${detailRows}
              </table>
            </td>
          </tr>

          ${
            footnote
              ? `<tr><td style="padding:14px 0 0;"><p style="margin:0; font-size:12.5px; color:${INK_SOFT};">${footnote}</p></td></tr>`
              : ""
          }

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0 28px; border-top:1px solid ${LINE}; margin-top:20px;">
              <p style="margin:16px 0 0; font-family:ui-monospace,'SFMono-Regular',Menlo,monospace; font-size:11px; color:${INK_SOFT};">
                Sent via Restaurant Cambodia Supply, a directory connecting hospitality buyers with suppliers in Cambodia.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function renderDetailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:12px 18px 16px; border-top:1px solid ${LINE};">
      <span style="display:block; font-family:ui-monospace,'SFMono-Regular',Menlo,monospace; font-size:10.5px; text-transform:uppercase; letter-spacing:0.04em; color:${INK_SOFT};">${escapeHtml(label)}</span>
      <span style="display:block; margin-top:3px; font-size:14px; color:${INK};">${escapeHtml(value)}</span>
    </td>
  </tr>`;
}
