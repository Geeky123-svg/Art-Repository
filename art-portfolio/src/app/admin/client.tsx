"use client";

import { useState } from "react";
import Image from "next/image";
import { Artwork } from "@/lib/types";
import { updateArtworkAction, deleteArtworkAction } from "./actions";

interface Props {
  artworks: Artwork[];
}

export function AdminDashboardClient({ artworks: initial }: Props) {
  const [artworks, setArtworks] = useState(initial);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleUpload(formData: FormData) {
    setUploading(true);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (res.ok) {
        const created: Artwork = await res.json();
        setArtworks((prev) => [created, ...prev]);
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Upload form */}
      <section className="rounded-xl border border-zinc-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900">Upload Artwork</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            handleUpload(formData);
            form.reset();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Image</label>
            <input
              type="file"
              name="file"
              accept="image/jpeg,image/png,image/webp"
              required
              className="w-full text-sm text-zinc-500 file:mr-3 file:rounded-lg file:border-0 file:bg-zinc-900 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-zinc-800"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-1">Description</label>
            <textarea
              name="description"
              rows={3}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="rounded-lg bg-zinc-900 px-6 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </form>
      </section>

      {/* Artwork list */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-zinc-900">
          Artworks ({artworks.length})
        </h2>
        {artworks.length === 0 && (
          <p className="text-sm text-zinc-500">No artworks yet. Upload your first piece above.</p>
        )}
        <div className="space-y-4">
          {artworks.map((artwork) => (
            <div
              key={artwork.id}
              className="flex gap-4 rounded-xl border border-zinc-200 bg-white p-4"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              {editingId === artwork.id ? (
                <form
                  action={async (formData) => {
                    await updateArtworkAction(formData);
                    setEditingId(null);
                  }}
                  className="flex flex-1 flex-col gap-2"
                >
                  <input type="hidden" name="id" value={artwork.id} />
                  <input
                    type="text"
                    name="title"
                    defaultValue={artwork.title}
                    className="rounded border border-zinc-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
                  />
                  <textarea
                    name="description"
                    defaultValue={artwork.description}
                    rows={2}
                    className="rounded border border-zinc-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-400"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="rounded bg-zinc-900 px-3 py-1 text-xs font-medium text-white hover:bg-zinc-800"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="rounded border border-zinc-300 px-3 py-1 text-xs text-zinc-600 hover:bg-zinc-100"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-medium text-zinc-900">{artwork.title}</h3>
                    <p className="mt-1 text-sm text-zinc-500 line-clamp-2">
                      {artwork.description || "No description"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingId(artwork.id)}
                      className="text-xs text-zinc-500 hover:text-zinc-900"
                    >
                      Edit
                    </button>
                    {deletingId === artwork.id ? (
                      <div className="flex gap-2">
                        <form action={deleteArtworkAction}>
                          <input type="hidden" name="id" value={artwork.id} />
                          <button
                            type="submit"
                            className="text-xs font-medium text-red-600 hover:text-red-700"
                          >
                            Confirm Delete
                          </button>
                        </form>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="text-xs text-zinc-500 hover:text-zinc-900"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeletingId(artwork.id)}
                        className="text-xs text-red-500 hover:text-red-700"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
