import { getApplicantByEmail } from "@/data/applicant";
import Email from "@/emails";
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = auth();
    const user = await currentUser();
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const existingApplicant = await getApplicantByEmail(values.email);

    if (existingApplicant) {
      return new NextResponse(JSON.stringify({ message: "すでに登録されています" }), { status: 409 });
    }

    const applicant = await db.applicant.create({
      data: {
        ...values,
        userId,
        eventId: params.eventId,
        image: user?.imageUrl
      },
    });

    await resend.emails.send({
      from: "onboarding@eventi.jp",
      to: values.email,
      subject: "[参加申し込みについて]",
      react: Email(),
    })

    return NextResponse.json(applicant);
  } catch (error) {
    console.log("APPLICANT", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
