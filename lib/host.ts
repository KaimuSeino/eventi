export const isHost = (userId?: string | null) => {
  return userId === process.env.NEXT_PUBLIC_HOST_ID;
}