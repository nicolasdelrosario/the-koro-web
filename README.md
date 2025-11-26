# The Koro Web – E‑commerce Frontend (Next.js)

A Next.js App Router frontend for The Koro e‑commerce platform. It integrates with The Koro API, provides product browsing, cart and checkout, user authentication, reviews, and order history. Built with Tailwind CSS, React Query, Zod, and Zustand, with clean component architecture and good UX defaults.

## ✨ Features

- Products listing with pagination, sorting, text search (`q`) and stock filter
- Product detail pages with image gallery and price display
- Cart management and wishlist
- Authentication: register, login, forgot password
- Account pages: details, edit profile
- Orders list with expandable details
- Reviews: list and submit
- Responsive header with categories navigation and search
- Metadata and social cards via a central helper

## ⚙️ Prerequisites

- Node.js v18 or higher
- pnpm or npm installed
- Running The Koro API (backend) and its database

> Note: In development the frontend runs by default on `http://localhost:3000`. Configure your backend CORS to allow this origin (or run the frontend on `3001` and set backend `FRONTEND_URL` accordingly).

## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/nicolasdelrosario/the-koro-web
cd the-koro-web
```

Install dependencies:

```bash
pnpm install
# or
npm install
```

Configure environment variables:

```bash
cp .env.example .env
```

Edit `.env` and set:

```env
# Base URL of the frontend, used for metadataBase
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Base URL of the backend API
# Example if backend runs on port 3000 with global prefix /api/v1
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1

# Branding for metadata and social cards
NEXT_PUBLIC_APP_NAME=The Koro
NEXT_PUBLIC_APP_DESCRIPTION=E-commerce web application
```

## 🧪 Development

Start the dev server:

```bash
pnpm dev
# open http://localhost:3000

# Optional: run on a different port
# pnpm dev -- -p 3001
```

Run checks:

```bash
pnpm lint   # Biome checks
pnpm check  # Biome checks with safe fixes
pnpm format # Format with Biome
```

## 🏗️ Build & Run

```bash
pnpm build
pnpm start
# open http://localhost:3000
```

## 📘 API Integration

- HTTP client is configured in `lib/api/api.ts` with `axios` and `NEXT_PUBLIC_API_URL`.
- If an `access_token` exists in `localStorage`, it is attached as `Authorization: Bearer <token>` to requests.
- 401 responses clear the token client‑side; pages should handle redirects where appropriate.

## 🧱 Project Structure

- `app/` App Router routes and layouts
  - `(routes)/products` list and detail pages
  - `(routes)/cart`, `(routes)/checkout`
  - `(routes)/auth` login, register, account
  - `(routes)/orders`, `(routes)/reviews`, `(routes)/categories`
- `components/` shared UI and feature components (header, sheets, forms, icons)
- `lib/` API client, hooks, stores, schemas, and utilities
- `public/` static assets like `favicon.svg`

## 🎨 Styling & UI

- Tailwind CSS v4 for styling
- Radix UI primitives with custom components
- Theme support via `next-themes`

## 📝 Metadata

- Centralized metadata helper in `lib/utils/construct-metadata.ts`
- Defaults include title, description, icons (`/favicon.svg`), Open Graph, and Twitter cards

## 📜 Scripts

- `pnpm dev` – start dev server
- `pnpm build` – build for production
- `pnpm start` – start production server
- `pnpm lint` – Biome checks
- `pnpm check` – Biome checks and safe fixes
- `pnpm format` – format with Biome

## 🧑‍💻 Author

Developed by `https://github.com/nicolasdelrosario`

## 📜 License

MIT

## 🗺️ Routes

- `/` home product listing
- `/products` product catalog with pagination and filters
- `/products/[id]` product detail
- `/cart` shopping cart
- `/checkout` checkout flow
- `/auth/register`, `/auth/login`, `/auth/forgot-password`
- `/auth/account` account details and profile edit
- `/orders` my orders list
- `/reviews` my reviews
- `/categories/[id]` products by category

## 🔧 Environment Variables

Frontend reads the following from `.env`:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_APP_NAME=The Koro
NEXT_PUBLIC_APP_DESCRIPTION=E-commerce web application
```

Ensure the backend allows CORS for your frontend origin and uses the API prefix (`/api/v1`) shown above, or adjust `NEXT_PUBLIC_API_URL` to match your backend.

## 🧩 Data & Hooks

- `lib/hooks/use-products.tsx` fetches paginated products, fed by search params
- `lib/hooks/use-orders.tsx` loads authenticated user orders
- `lib/hooks/use-user.tsx` reads current user profile
- `lib/hooks/use-reviews.tsx` handles reviews
- `lib/hooks/use-search-params.tsx` manages URL params; wrapped in `Suspense` where used
- `lib/store/cart-store.ts`, `lib/store/wishlist-store.ts` client state

## 🛠️ Troubleshooting

- Missing Suspense boundary with `useSearchParams`: Components that read URL search params must be wrapped in `Suspense` to avoid CSR bailouts during prerender. This keeps the route statically generated and prevents build errors.
- Prerender errors: Verify no browser‑only APIs run in Server Components and handle undefined data during build.
- CORS issues: Set backend `FRONTEND_URL` to your frontend origin and enable CORS accordingly.
- 401 responses: Token is cleared from `localStorage`; login again and ensure the backend issues a valid JWT.
- Favicon not rendering font: Favicons don’t load CSS/fonts. Use vector paths or PNG/ICO; this repo uses a font‑independent SVG.

## 🌐 Deployment

- Vercel: Set project env vars (`NEXT_PUBLIC_*`) and connect to backend URL.
- Self‑host: Build with `pnpm build`, serve with `pnpm start` behind a reverse proxy; set `NEXT_PUBLIC_APP_URL` to the public origin so social metadata resolves correctly.

## 🤝 Contributing

- Run `pnpm lint` and `pnpm check` before pushing.
- Keep components small and colocate route‑specific UI under `app/(routes)/...`.
