import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="text-lg font-bold text-zinc-900">
            Admin
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-zinc-500 hover:text-zinc-900">
              View Site
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
