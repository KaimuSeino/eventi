import { getApplicantByEmail } from "@/data/applicant";
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer"

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

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.GMAILUSER,
        pass: process.env.GMAILPASSWORD,
      },
    })

    const toUserMailData = {
      from: "ksyki12b18@gmail.com",
      to: values.email,
      subject: `Eventi[申し込み完了のお知らせ]`,
      text: `株式会社Eventiから${values.email}様へ`,
      html: `
        <p>イベント名</p>
      `
    }

    transporter.sendMail(toUserMailData, function (err, info) {
      if (err) console.log(err)
      else console.log(info)
    })

    return NextResponse.json(applicant);
  } catch (error) {
    console.log("APPLICANT", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
