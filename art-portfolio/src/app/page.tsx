import { Suspense } from "react";
import { getAllArtworks, getArtworkById } from "@/lib/data";
import { ArtworkCard } from "@/components/artwork-card";
import { ArtworkModal } from "@/components/artwork-modal";

interface Props {
  searchParams: Promise<{ artwork?: string }>;
}

async function FeedContent({ artworkId }: { artworkId?: string }) {
  const artworks = await getAllArtworks();

  if (artworks.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center py-32">
        <p className="text-zinc-400">No artwork yet.</p>
      </div>
    );
  }

  return (
    <>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="mb-4 break-inside-avoid">
            <ArtworkCard artwork={artwork} />
          </div>
        ))}
      </div>

      {artworkId && <ModalWrapper artworkId={artworkId} />}
    </>
  );
}

async function ModalWrapper({ artworkId }: { artworkId: string }) {
  const artwork = await getArtworkById(artworkId);
  if (!artwork) return null;
  return <ArtworkModal artwork={artwork} />;
}

export default async function HomePage(props: Props) {
  const searchParams = await props.searchParams;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900">Sabari's Art Portfolio</h1>
      </header>
      <Suspense fallback={<div className="py-32 text-center text-zinc-400">Loading...</div>}>
        <FeedContent artworkId={searchParams.artwork} />
      </Suspense>
    </div>
  );
}
