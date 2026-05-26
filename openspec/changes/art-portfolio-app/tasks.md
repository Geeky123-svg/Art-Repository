## 1. Project Scaffold

- [x] 1.1 Create Next.js app with TypeScript and Tailwind CSS in `art-portfolio/`
- [x] 1.2 Configure `next.config.js` for image domains and uploads
- [x] 1.3 Set up `data/artworks.json` data store with initial shape
- [x] 1.4 Create `data/lib.ts` utility for reading/writing artworks JSON
- [x] 1.5 Add `ADMIN_PASSWORD` to `.env.local`

## 2. Data Layer & Image Handling

- [x] 2.1 Implement data utility functions (getAllArtworks, getArtworkById, createArtwork, updateArtwork, deleteArtwork)
- [x] 2.2 Configure Next.js API route or Server Action for file upload to `/public/uploads/`
- [x] 2.3 Add image validation (file type, size) in upload handler

## 3. Admin Authentication

- [x] 3.1 Create login form at `/admin/login` with password input and error state
- [x] 3.2 Implement login Server Action that sets a session cookie
- [x] 3.3 Create `middleware.ts` that checks session cookie and redirects unauthenticated users

## 4. Admin Dashboard

- [x] 4.1 Build admin layout with header and navigation
- [x] 4.2 Add image upload form with preview
- [x] 4.3 List all artworks in the admin dashboard with edit/delete actions
- [x] 4.4 Build edit form for artwork title and description
- [x] 4.5 Implement delete artwork with confirmation dialog

## 5. Public Feed (Instagram-style)

- [x] 5.1 Build responsive image grid on `/page.tsx` using CSS Grid or Masonry layout
- [x] 5.2 Create artwork card component with thumbnail overlay
- [x] 5.3 Build detail modal component with image, title, and description
- [x] 5.4 Wire modal open/close via URL search params (`?artwork=id`)
- [x] 5.5 Add keyboard (Escape) and backdrop-click to close modal
- [x] 5.6 Use Next.js `next/image` for optimized, lazy-loaded thumbnails

## 6. Vercel Deployment Refactor

- [x] 6.1 Install `@vercel/blob` and `@vercel/kv` packages
- [x] 6.2 Create `src/lib/kv.ts` — KV storage layer with local JSON fallback
- [x] 6.3 Create `src/lib/blob.ts` — Blob storage layer with local filesystem fallback
- [x] 6.4 Refactor `src/lib/data.ts` — delegate to KV + Blob abstractions
- [x] 6.5 Refactor `src/app/api/upload/route.ts` — use Blob for image upload
- [x] 6.6 Refactor `src/app/admin/actions.ts` — delete from Blob on artwork deletion
- [x] 6.7 Update `next.config.ts` — add Vercel Blob remote pattern
- [x] 6.8 Update `.env.local` — add Vercel env variable placeholders
- [x] 6.9 Verify `npm run build` succeeds without errors

## 7. Polish & Verification

- [ ] 7.1 Test full flow: upload artwork via admin → view in public feed → open modal → edit/delete in admin
- [ ] 7.2 Verify responsive layout at mobile, tablet, and desktop breakpoints
