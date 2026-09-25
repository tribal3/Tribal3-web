import { NextRequest, NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mail";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Please fill in all fields" }, { status: 400 });
    }
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }
    if (name.length > 120 || message.length > 5000) {
      return NextResponse.json({ error: "Input is too long" }, { status: 400 });
    }

    await sendContactEmail({ name, email, message });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form error:", err);
    const message =
      err instanceof Error && err.message.includes("Email is not configured")
        ? err.message
        : "Failed to send message. Please try again later.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
