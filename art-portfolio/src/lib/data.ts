import { deleteImage } from "./blob";
import {
  getAllArtworks as kvGetAll,
  getArtworkById as kvGetById,
  createArtwork as kvCreate,
  updateArtwork as kvUpdate,
  deleteArtwork as kvDelete,
} from "./kv";
import { Artwork } from "./types";

export async function getAllArtworks(): Promise<Artwork[]> {
  return kvGetAll();
}

export async function getArtworkById(id: string): Promise<Artwork | null> {
  return kvGetById(id);
}

export async function createArtwork(
  data: Omit<Artwork, "id" | "createdAt" | "updatedAt">
): Promise<Artwork> {
  return kvCreate(data);
}

export async function updateArtwork(
  id: string,
  data: Partial<Pick<Artwork, "title" | "description">>
): Promise<Artwork | null> {
  return kvUpdate(id, data);
}

export async function deleteArtwork(id: string): Promise<boolean> {
  const removed = await kvDelete(id);
  if (!removed) return false;
  await deleteImage(removed.imageUrl);
  return true;
}
