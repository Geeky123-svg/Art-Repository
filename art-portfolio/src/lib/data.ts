import { promises as fs } from "fs";
import path from "path";
import { Artwork } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "artworks.json");

async function readArtworks(): Promise<Artwork[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeArtworks(artworks: Artwork[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(artworks, null, 2), "utf-8");
}

export async function getAllArtworks(): Promise<Artwork[]> {
  return readArtworks();
}

export async function getArtworkById(id: string): Promise<Artwork | null> {
  const artworks = await readArtworks();
  return artworks.find((a) => a.id === id) ?? null;
}

export async function createArtwork(data: Omit<Artwork, "id" | "createdAt" | "updatedAt">): Promise<Artwork> {
  const artworks = await readArtworks();
  const artwork: Artwork = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  artworks.push(artwork);
  await writeArtworks(artworks);
  return artwork;
}

export async function updateArtwork(
  id: string,
  data: Partial<Pick<Artwork, "title" | "description">>
): Promise<Artwork | null> {
  const artworks = await readArtworks();
  const index = artworks.findIndex((a) => a.id === id);
  if (index === -1) return null;
  artworks[index] = {
    ...artworks[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  await writeArtworks(artworks);
  return artworks[index];
}

export async function deleteArtwork(id: string): Promise<boolean> {
  const artworks = await readArtworks();
  const index = artworks.findIndex((a) => a.id === id);
  if (index === -1) return false;
  const [removed] = artworks.splice(index, 1);
  await writeArtworks(artworks);
  const imagePath = path.join(process.cwd(), "public", removed.imageUrl);
  try {
    await fs.unlink(imagePath);
  } catch {
    // image file might not exist
  }
  return true;
}
