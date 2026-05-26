import { getAllArtworks } from "@/lib/data";
import { AdminDashboardClient } from "./client";

export default async function AdminDashboardPage() {
  const artworks = await getAllArtworks();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900">Dashboard</h1>
      <AdminDashboardClient artworks={artworks} />
    </div>
  );
}
