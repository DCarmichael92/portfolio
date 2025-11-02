// Serverless API route for the contact form. Integrates with Resend if configured.
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, message } = await req.json();

  if (!email || !message) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }

  try {
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Portfolio <noreply@yourdomain.dev>",
        to: "devin.a.carmichael@gmail.com",
        subject: `Message from ${email}`,
        text: String(message),
      });
    }

    return NextResponse.json({ message: "Thanks! I’ll get back to you soon." });
  } catch (err) {
    return NextResponse.json({ message: "Email failed. Please use the direct address." }, { status: 500 });
  }
}
