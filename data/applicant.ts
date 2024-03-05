import { db } from "@/lib/db"

export const getApplicantByEmailAndEventId = async (email?: string, eventId?: string) => {
  try {
    const applicant = await db.applicant.findFirst({
      where: { email, eventId }
    });

    return applicant;
  } catch {
    return null;
  }
}

export const getApplicantByUserIdAndEventId = async (userId?: string, eventId?: string) => {
  try {
    const applicant = await db.applicant.findFirst({
      where: { userId, eventId }
    });

    return applicant;
  } catch {
    return null;
  }
}


export const getApplicantsByEventId = async (eventId?: string) => {
  try {
    const applicant = await db.applicant.findMany({
      where: { eventId }
    });

    return applicant
  } catch {
    return null;
  }
}