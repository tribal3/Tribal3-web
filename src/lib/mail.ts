import nodemailer from "nodemailer";

const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || "tribal3tech@gmail.com";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "tribal3tech@gmail.com";

export function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const transporter = getTransporter();
  if (!transporter) {
    throw new Error(
      "Email is not configured. Add GMAIL_USER and GMAIL_APP_PASSWORD to .env.local"
    );
  }

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #06b6d4; border-bottom: 2px solid #06b6d4; padding-bottom: 8px;">
        New Contact Form Submission
      </h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; width: 140px; background: #f8fafc;"><strong>Name</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>Email</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;"><a href="mailto:${email}">${email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #e2e8f0; background: #f8fafc;"><strong>Received</strong></td>
          <td style="padding: 8px; border: 1px solid #e2e8f0;">${new Date().toLocaleString()}</td>
        </tr>
      </table>
      <h3 style="margin-top: 20px;">Message</h3>
      <p style="white-space: pre-wrap; padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">${message}</p>
      <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">Sent from the Tribal 3 contact form</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Tribal 3 Contact Form" <${FROM_EMAIL}>`,
    to: TO_EMAIL,
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nReceived: ${new Date().toLocaleString()}\n\nMessage:\n${message}`,
    html,
  });
}
