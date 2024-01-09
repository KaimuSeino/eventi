export const isHost = (userId?: string | null) => {
  const hostIds = process.env.NEXT_PUBLIC_HOSTS_ID?.split(",") || [];
  return hostIds.includes(userId!);
}
