import { promises as fs } from "fs";
import path from "path";
import { Artwork } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "artworks.json");

let kvClient: import("@vercel/kv").VercelKV | null = null;

async function getKv() {
  if (!kvClient && process.env.KV_URL) {
    const { createClient } = await import("@vercel/kv");
    kvClient = createClient({
      url: process.env.KV_URL,
      token: process.env.KV_REST_API_TOKEN!,
    });
  }
  return kvClient;
}

const ARTWORKS_KEY = "artworks";

async function readFromKv(): Promise<Artwork[]> {
  const kv = await getKv();
  if (!kv) return readFromFile();
  const raw = await kv.get<Artwork[]>(ARTWORKS_KEY);
  return raw ?? [];
}

async function writeToKv(artworks: Artwork[]): Promise<void> {
  const kv = await getKv();
  if (kv) {
    await kv.set(ARTWORKS_KEY, artworks);
  } else {
    await writeToFile(artworks);
  }
}

async function readFromFile(): Promise<Artwork[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeToFile(artworks: Artwork[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(artworks, null, 2), "utf-8");
}

export async function getAllArtworks(): Promise<Artwork[]> {
  return readFromKv();
}

export async function getArtworkById(id: string): Promise<Artwork | null> {
  const artworks = await readFromKv();
  return artworks.find((a) => a.id === id) ?? null;
}

export async function createArtwork(
  data: Omit<Artwork, "id" | "createdAt" | "updatedAt">
): Promise<Artwork> {
  const artworks = await readFromKv();
  const artwork: Artwork = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  artworks.push(artwork);
  await writeToKv(artworks);
  return artwork;
}

export async function updateArtwork(
  id: string,
  data: Partial<Pick<Artwork, "title" | "description">>
): Promise<Artwork | null> {
  const artworks = await readFromKv();
  const index = artworks.findIndex((a) => a.id === id);
  if (index === -1) return null;
  artworks[index] = {
    ...artworks[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  await writeToKv(artworks);
  return artworks[index];
}

export async function deleteArtwork(id: string): Promise<Artwork | null> {
  const artworks = await readFromKv();
  const index = artworks.findIndex((a) => a.id === id);
  if (index === -1) return null;
  const [removed] = artworks.splice(index, 1);
  await writeToKv(artworks);
  return removed;
}
