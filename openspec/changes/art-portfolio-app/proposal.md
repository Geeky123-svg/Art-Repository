## Why

I need a personal art portfolio website to showcase my work. Existing portfolio templates are either too generic, lack admin controls, or don't provide a clean Instagram-style browsing experience. This app solves that by combining a beautiful public gallery with a private admin panel for managing content.

## What Changes

- Scaffold a new Next.js 14+ (App Router) project with TypeScript and Tailwind CSS
- Implement a public art feed page (`/`) with an image grid (Instagram/Pinterest style) and detail modals showing artwork descriptions
- Implement a password-protected admin page (`/admin`) for uploading images and writing descriptions
- Store artwork data (images, metadata) in the filesystem or a simple database
- Protect admin routes with a simple password check (no full auth system)

## Capabilities

### New Capabilities
- `public-feed`: Instagram-style image grid with modal detail view for browsing artwork
- `admin-panel`: Password-protected admin dashboard for uploading images and managing descriptions

### Modified Capabilities
*(None — this is a new project)*

## Impact

- New Next.js project with dependencies: `next`, `react`, `typescript`, `tailwindcss`, `shadcn/ui` (optional), image handling libraries
- Simple data store for artwork metadata (JSON file or SQLite via `better-sqlite3`)
- Admin password via environment variable
- No existing code affected — this is a greenfield project within the current repo
