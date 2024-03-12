import { isHost } from "@/lib/host";
import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server"; // UploadThingErrorをインポート

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  const isAuthorized = isHost(userId);

  if (!userId || !isAuthorized) throw new UploadThingError("Unauthorized");
  return { userId };
}

const handleUserOnlyAuth = () => {
  const { userId } = auth();

  if (!userId) throw new UploadThingError("Unauthorized");
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
    .middleware(() => handleUserOnlyAuth())
    .onUploadComplete(() => { })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;