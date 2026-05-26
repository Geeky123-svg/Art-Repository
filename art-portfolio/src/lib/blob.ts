import { writeFile, unlink } from "fs/promises";
import path from "path";

export async function uploadImage(
  filename: string,
  buffer: Buffer
): Promise<string> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    const blob = await put(filename, buffer, {
      access: "public",
    });
    return blob.url;
  }

  const uploadPath = path.join(process.cwd(), "public", "uploads", filename);
  await writeFile(uploadPath, buffer);
  return `/uploads/${filename}`;
}

export async function deleteImage(imageUrl: string): Promise<void> {
  if (!imageUrl) return;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { del } = await import("@vercel/blob");
    await del(imageUrl);
    return;
  }

  const imagePath = path.join(process.cwd(), "public", imageUrl);
  try {
    await unlink(imagePath);
  } catch {
    // file might not exist
  }
}
