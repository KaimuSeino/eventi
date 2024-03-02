import Email from "@/emails";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const data = await resend.emails.send({
      from: "onboarding@eventi.jp",
      to: "skim07a19yki@icloud.com",
      subject: "Hello world",
      react: Email(),
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}