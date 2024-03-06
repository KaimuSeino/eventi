import { getApplicantByEmailAndEventId, getApplicantByUserIdAndEventId } from "@/data/applicant";
import { getEventByEventId } from "@/data/event";
import { getHostByEventId } from "@/data/host";
import { getUserById } from "@/data/user";
import ApplicantHostEmail from "@/emails/host/applicant-host-email";
import ApplicantAttendanceEmail from "@/emails/user/applicant-attendace-email";
import ApplicantEmail from "@/emails/user/applicant-email";
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

    const existingApplicant = await getApplicantByEmailAndEventId(values.email, params.eventId);

    if (existingApplicant) {
      return new NextResponse(JSON.stringify({ message: "すでに登録されています" }), { status: 409 });
    }

    const event = await getEventByEventId(params.eventId);

    if (!event) {
      return new NextResponse("not found", { status: 404 })
    }

    const host = await getHostByEventId(params.eventId);

    if (!host) {
      return new NextResponse("not found", { status: 404 })
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
      from: "Eventi <onboarding@eventi.jp>",
      to: host.email!,
      subject: "[イベントに申し込みがありました]",
      react: ApplicantHostEmail({
        image: event.imageUrl!,
        campany: host.campany!,
        eventTitle: event.title,
        eventId: event.id,
      })
    })

    await resend.emails.send({
      from: "Eventi <onboarding@eventi.jp>",
      to: values.email,
      subject: "[参加申し込みについて]",
      react: ApplicantEmail({
        image: event.imageUrl!,
        name: values.name,
        eventTitle: event.title,
        campany: host.campany!,
      }),
    })

    return NextResponse.json(applicant);
  } catch (error) {
    console.log("APPLICANT", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = await req.json();

    const event = await getEventByEventId(params.eventId);
    if (!event) {
      return new NextResponse("not found", { status: 404 })
    }

    const host = await getHostByEventId(params.eventId);
    if (!host) {
      return new NextResponse("not found", { status: 404 })
    }

    const applicant = await getApplicantByUserIdAndEventId(userId, params.eventId);
    if (!applicant) {
      return new NextResponse("not found", { status: 404 })
    }

    const attendanceApplicant = await db.applicant.updateMany({
      where: { userId: userId, eventId: params.eventId },
      data: {
        isAttendance: true
      }
    });

    await resend.emails.send({
      from: "Eventi <onboarding@eventi.jp>",
      to: applicant.email,
      subject: "[Eventiアンケートに答えましょう]",
      react: ApplicantAttendanceEmail({
        image: event.imageUrl!,
        name: applicant.name,
        eventTitle: event.title,
        campany: host.campany!,
        eventId: event.id
      }),
    })


    return NextResponse.json(attendanceApplicant);
  } catch (error) {
    console.log("ATTENDANCE", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
