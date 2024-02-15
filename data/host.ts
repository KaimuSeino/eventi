import { db } from "@/lib/db"

export const getHostByEmail = async (email?: string) => {
  try {
    const host = await db.host.findUnique({
      where: { email }
    });

    return host;
  } catch {
    return null;
  }
}

export const getHostById = async (userId?: string) => {
  try {
    const host = await db.host.findUnique({
      where: { userId }
    });

    return host;
  } catch {
    return null
  }
}