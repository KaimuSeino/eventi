import { isHost } from "@/lib/host";
import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  const isAuthorized = isHost(userId);

  if (!userId || !isAuthorized) throw new Error("Unauthorized");
  return { userId };
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  eventImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),
  eventAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => { }),
  iconImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => { })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;