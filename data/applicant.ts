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