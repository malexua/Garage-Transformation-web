# Mahogany Garage Tranformation Co.

Marketing site + lead inbox for a garage transformation studio (epoxy floors, custom walls, slatwall, LED lighting) . Built with Next.js (App Router), Tailwind CSS, Drizzle ORM, and PostgreSQL.

## Run locally

```bash
npm install
# DATABASE_URL is already in .env for this project
npx drizzle-kit push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Path | What it is |
| --- | --- |
| `/` | Homepage |
| `/gallery` | Project work |
| `/services` | Service catalog |
| `/quote` | Quote form (saves to Postgres) |
| `/admin` | Lead inbox |

Admin password: `ADMIN_PASSWORD` in `.env` (default `blackline-studio`).

## Environment

```
DATABASE_URL=postgresql://USER:PASS@HOST:5432/DB
ADMIN_PASSWORD=choose-a-long-secret
```

## Deploy (operational)

This is a standard Next.js app. The production path is:

1. Push this folder to a GitHub repo.
2. Provision Postgres (Neon, Supabase, or Railway). Copy the connection string.
3. Host the app on **Vercel** (or Railway / Render / Fly):
   - Import the repo
   - Set `DATABASE_URL` and `ADMIN_PASSWORD`
   - Build command: `npx drizzle-kit push && next build` **or** run `npx drizzle-kit push` once against production, then use the default `next build`
4. After the first deploy, open `/admin`, sign in, and you will see quote requests.

### Vercel, specifically

- Framework preset: Next.js
- Node 20+
- Environment variables on Production + Preview
- If the database is not on the public internet, allow Vercel IPs or use a pooled URL (`-pooler` on Neon)

### Custom domain

In Vercel: Project → Settings → Domains → add `blacklinegarage.co` (or your domain) and point DNS as instructed. Then update `url` in `src/lib/site.ts` and the phone / email / city there.

## Brand copy to edit

All public phone, email, service area, and pricing live in `src/lib/site.ts`. Services, projects, FAQs, and sample leads seed from `src/db/seed.ts` on first boot.

## Scripts

```bash
npm run dev       # local
npm run build     # production build
npm run start     # serve the build
npx drizzle-kit push   # sync schema to Postgres
```
