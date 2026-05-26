import { NextRequest, NextResponse } from "next/server";
import { createArtwork } from "@/lib/data";
import { uploadImage } from "@/lib/blob";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string) || "Untitled";
    const description = (formData.get("description") as string) || "";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Accepted: JPEG, PNG, WebP" }, { status: 400 });
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json({ error: "File too large. Maximum 10MB" }, { status: 400 });
    }

    const ext = file.name.split(".").pop() || "jpg";
    const filename = `${crypto.randomUUID()}.${ext}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imageUrl = await uploadImage(filename, buffer);

    const artwork = await createArtwork({
      title,
      description,
      imageUrl,
    });

    return NextResponse.json(artwork, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
