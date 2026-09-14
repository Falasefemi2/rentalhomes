# EazyRent web

Frontend for the EazyRent rental platform. TanStack Start + React, talks to the Go API in `C:\Users\FEMI\eazyrent`.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

The API has to be running too (defaults to `http://localhost:8080`).

## Env (`.env`)

```text
VITE_API_URL=http://localhost:8080
VITE_CLOUDINARY_CLOUD_NAME=
VITE_CLOUDINARY_UPLOAD_PRESET=      # unsigned preset, e.g. easyrent_listings
```

Photos upload straight to Cloudinary with the unsigned preset, then the URL is saved through `POST /listings/{id}/media` — same flow as avatars. Without the two Cloudinary vars, the photo picker falls back to pasting image links.

## What's in here

Browse with search + filters, listing pages with landlord contact and map link, favorites with toasts, landlord create/edit with a map pin picker (Leaflet/OpenStreetMap, no key), profile + avatar upload, full auth (signup, signin, verify, forgot, reset) with show/hide passwords.

## Scripts

```bash
npm run dev               # vite dev on :3000
npm run generate-routes   # regenerate routeTree.gen.ts after adding routes
npm run build             # production build
npm run check             # biome check
```
