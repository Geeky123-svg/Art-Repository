"use client";

import { useRouter } from "next/navigation";
import { useEffect, useCallback } from "react";
import Image from "next/image";
import { Artwork } from "@/lib/types";

interface Props {
  artwork: Artwork;
}

export function ArtworkModal({ artwork }: Props) {
  const router = useRouter();

  const close = useCallback(() => {
    router.push("/", { scroll: false });
  }, [router]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [close]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="relative max-h-[90vh] max-w-3xl overflow-auto rounded-2xl bg-white shadow-2xl">
        <button
          onClick={close}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-zinc-700 hover:bg-white"
        >
          ✕
        </button>
        <div className="relative aspect-auto max-h-[60vh] w-full">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            width={1200}
            height={900}
            className="h-auto w-full rounded-t-2xl object-contain"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-bold text-zinc-900">{artwork.title}</h2>
          {artwork.description && (
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 whitespace-pre-line">
              {artwork.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
