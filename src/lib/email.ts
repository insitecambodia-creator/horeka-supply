type SendEmailParams = {
  to: { email: string; name?: string };
  subject: string;
  htmlContent: string;
};

export async function sendEmail({ to, subject, htmlContent }: SendEmailParams): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || "Restaurant Cambodia Supply";

  if (!apiKey || !senderEmail) {
    console.error("BREVO_API_KEY or BREVO_SENDER_EMAIL is not configured");
    return false;
  }

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { email: senderEmail, name: senderName },
        to: [{ email: to.email, name: to.name }],
        subject,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      console.error(`Brevo send failed (${response.status}): ${body}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error("Brevo send error:", error);
    return false;
  }
}
