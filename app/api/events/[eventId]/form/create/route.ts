import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
) {
  try {
    const { userId } = auth();
    const { values, applicationId } = await req.json();
    const { selectApplication, textApplication } = values

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const applicationOwner = await db.application.findUnique({
      where: {
        id: applicationId
      }
    });

    if (!applicationOwner) {
      return new NextResponse("SurveyUnauthorized", { status: 401 });
    }

    const userApplication = await db.userApplication.findFirst({
      where: {
        userId: userId,
        applicationId: applicationId
      }
    });

    if (!userApplication) {
      return new NextResponse("UserAnswer Not Found", { status: 404 });
    }

    const updatedUserApplication = await db.userApplication.update({
      where: {
        id: userApplication.id
      },
      data: {
        selectApplication: parseInt(selectApplication),
        textApplication: textApplication || null,
      }
    });

    return NextResponse.json(updatedUserApplication);
  } catch (error) {
    console.log("[USER_APPLICATION_ANSWERS]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function POST(
  req: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const applications = await db.application.findMany({
      where: {
        eventId: params.eventId
      },
      select: {
        id: true
      }
    });

    if (applications.length > 0) {
      await Promise.all(applications.map(async (application) => {
        await db.userAnswer.create({
          data: {
            userId: userId,
            surveyId: application.id,
            isCreated: true
          }
        });
      }));
    }

    return new NextResponse("Success", { status: 200 });

  } catch (error) {
    console.log("[USER_APPLICATION_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

