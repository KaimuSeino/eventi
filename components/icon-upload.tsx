"use client";

import toast from "react-hot-toast";

import { UploadButton } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

interface IconUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
};

export const IconUpload = ({
  onChange,
  endpoint
}: IconUploadProps) => {
  return (
    <UploadButton
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error.message}`);
      }}
    />
  )
}