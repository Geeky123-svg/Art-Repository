import Image from "next/image";
import Link from "next/link";
import { Artwork } from "@/lib/types";

interface Props {
  artwork: Artwork;
}

export function ArtworkCard({ artwork }: Props) {
  return (
    <Link
      href={`/?artwork=${artwork.id}`}
      scroll={false}
      className="group relative block overflow-hidden rounded-xl bg-zinc-100"
    >
      <div className="aspect-square">
        <Image
          src={artwork.imageUrl}
          alt={artwork.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <h3 className="text-sm font-medium text-white drop-shadow-sm">
          {artwork.title}
        </h3>
      </div>
    </Link>
  );
}
