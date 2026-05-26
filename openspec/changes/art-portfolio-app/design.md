## Context

Greenfield Next.js art portfolio app within an existing monorepo-like repository. The app needs a public-facing Instagram-style gallery and a password-protected admin panel. No existing auth system exists — the admin panel will use a simple shared-password check.

## Goals / Non-Goals

**Goals:**
- Server-rendered public feed with responsive image grid and modal detail views
- Admin page with image upload and description editing, protected by an environment-variable password
- Static JSON file as the data store (simple, no database needed)
- Tailwind CSS for all styling — zero external CSS frameworks
- Fully self-contained in `/art-portfolio/` directory

**Non-Goals:**
- User registration or multi-user support
- Database setup or ORM integration
- Image CDN or cloud storage — images stored locally in `/public/uploads/`
- E-commerce, prints, or payment processing

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Project location | `/art-portfolio/` | Keep isolated from other projects in the repo |
| Data store | Vercel KV (Redis) via `@vercel/kv` with local JSON fallback (`data/artworks.json`) | Persistent metadata on Vercel; zero-setup local dev via JSON file |
| Admin auth | Simple password cookie via middleware + env var | No database, no ORM, no auth library needed for a single-admin setup |
| Image handling | Vercel Blob (`@vercel/blob`) with local `/public/uploads/` fallback | Images persisted on Vercel CDN; local filesystem works for development |
| Modal vs separate page | Modal (dialog) via URL query param (`?artwork=id`) | Preserves scroll position; shareable URLs; no router dependency inside modal |
| Form handling | Server Actions (Next.js App Router native) | No client-side form library needed; works without JS; co-located with route |

## Risks / Trade-offs

- **Vercel Blob cold start** → First upload after deployment may be slow. Mitigation: acceptable for single-admin use.
- **KV quota** → Hobby tier KV has 256 MB limit with 30 req/s. Mitigation: metadata is tiny (JSON strings), will not approach limit.
- **Simple password auth** → Session not cryptographically signed. Mitigation: use `crypto.randomUUID()` for session token; accept that this is not production-grade auth.
- **Local fallback drift** → JSON file and KV may get out of sync if switched between environments. Mitigation: single source of truth per environment.
