import { db } from "@/lib/db"

export const getApplicantByEmail = async (email?: string) => {
  try {
    const applicant = await db.applicant.findUnique({
      where: { email }
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