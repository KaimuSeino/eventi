import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { generateSolidHelpers } from "@uploadthing/solid";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();

export const { useUploadThing } = generateSolidHelpers<OurFileRouter>();