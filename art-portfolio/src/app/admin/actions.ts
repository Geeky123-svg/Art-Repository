"use server";

import { revalidatePath } from "next/cache";
import { deleteArtwork, updateArtwork } from "@/lib/data";

export async function updateArtworkAction(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  await updateArtwork(id, { title, description });
  revalidatePath("/admin");
}

export async function deleteArtworkAction(formData: FormData) {
  const id = formData.get("id") as string;
  await deleteArtwork(id);
  revalidatePath("/admin");
}
