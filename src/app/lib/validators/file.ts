import { z } from "zod"

const MAX_FILE_SIZE = 1024 * 1024 * 10;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg", 
  "image/jpg", 
  "image/png", 
  "image/webp", 
  "image/gif", 
  "video/mp4", 
  "video/webm"
];

export const fileSchema = z.object({
    size: z
      .number()
      .max(10 * 1024 * 1024, { message: "File is to large. Max file size is 10MB."}),
    type: z
      .string()
      .refine(type => type.startsWith('image/') || type.startsWith('video/'), {
        message: "Only .jpg, .jpeg, .png, .gif, .mp4, webm, and .webp formats are supported.",
      }),
    name: z
        .string(),
  });

  export type TFileSchema = z.infer<typeof fileSchema>


  
