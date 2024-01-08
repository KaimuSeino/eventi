export const isHost = (userId?: string | null) => {
  return userId === process.env.NEXT_PUBLIC_TEACHER_ID;
}