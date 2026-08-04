# My Ledger

A dark, precision personal-finance app: ledger, budgets, transfers, receipts, multi-currency, and a public landing page — built for an interview test.

**Stack:** Next.js 16 (App Router, route groups), React 19, TypeScript, Tailwind CSS v4, Montserrat, lucide-react, Supabase (`@supabase/supabase-js`). Vitest for unit tests.

---

## Requirements

- **Node.js 20.19+ or 22 LTS** (`.nvmrc` pins 22). Node 24 also works.
- npm 10+

> ⚠️ This project requires **Next.js 16.2.6** (see `package.json`). If `npm run dev` shows `babel-loader`/`webpack 4` stack traces or rewrites your `tsconfig.json`, your `node_modules` contains an old Next — do a clean install (Troubleshooting below).

## Quick start (local demo, no Supabase needed)

```bash
npm install
# optional: seed a local Postgres with supabase/schema.sql + supabase/seed.sql
npm run dev        # http://localhost:3000
```

Without `SUPABASE_URL`, the API transparently falls back to the local Postgres in `DATABASE_URL` (plain `pg`, no Drizzle) so every screen works out of the box.

## Connect Supabase (production data)

1. In your Supabase project, open the **SQL Editor** and run:
    - `supabase/schema.sql` (tables + indexes)
    - `supabase/seed.sql` (demo user, accounts, categories, budgets, contacts, 23 transactions)
2. Copy `.env.example` to `.env.local` and set:
   ```
   SUPABASE_URL=https://YOUR-PROJECT.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   ```
3. `npm run dev` — every screen now fetches live from Supabase.

## Scripts

| Command          | Purpose                          |
| ---------------- | -------------------------------- |
| `npm run dev`    | Dev server (Turbopack)           |
| `npm run build`  | Production build                 |
| `npm start`      | Serve production build           |
| `npx vitest run` | Unit tests (28 tests, money/validation logic) |

## Routes

`/` landing · `/dashboard` · `/transactions` · `/transactions/[id]` receipt + budget analysis · `/add-transaction` · `/transfer` · `/budgets` · `/privacy` · `/terms` · `/help`

API: `/api/bootstrap · /api/dashboard · /api/transactions · /api/transactions/[id] · /api/contacts · /api/transfer · /api/budgets · /api/health`

## Feature checklist

- Search + filters (type, category, date range, keyword) with CSV export
- Categorisation + breakdown (bars, donut) and per-category budgets with 90% warnings
- Multi-currency toggle (KSh / $ / €), persisted
- Pull-to-refresh, loading skeletons, error + empty states, simulated API latency
- Edge cases: huge numbers, negative-balance banner, over-budget/over-limit guards
- Initials-avatar fallback for users/contacts without photos
- Vitest unit tests for balance, validation, savings-rate, formatting

---

## Design decisions & trade-offs

- **Repository abstraction over Supabase.** All data access lives in `src/lib/repo.ts` behind one interface, implemented with `@supabase/supabase-js`. A plain-`pg` fallback (same SQL schema) lets reviewers run the app with zero credentials. *Trade-off:* two backends to keep in sync — mitigated by sharing one schema file and one mapping layer.
- **Server-mediated writes.** Every mutation goes through `/api/*` route handlers so keys stay server-side and validation + balance adjustment happen in one place. *Trade-off:* an extra network hop vs. client-direct PostgREST writes; accepted for centralised invariants.
- **Balance model.** Single-entry with a cached `accounts.balance` adjusted on each mutation, *plus* a headline total derived purely from the transaction list (`Σ income − Σ expenses`, transfers excluded as internal moves) with a per-row running balance. *Trade-off:* a cached balance can theoretically drift from the row set; guarded by unit tests and the derivable total. With more time → double-entry journal lines with DB-enforced invariants.
- **Exact currency math.** Amounts are `numeric(18,2)` (never floats); formatting/conversion centralised in `src/lib/money.ts` with `Intl.NumberFormat`, and the pure logic is unit-tested.
- **Rolling 30-day "monthly" windows** so stats/budgets are meaningful on any demo date, not just a hard-coded month.
- **Validation in shared pure functions** (`validateTransaction`, `validateTransfer`) used by both API routes and forms, so client and server can never disagree.
- **Tests target pure logic** (balance, validation, formatting, savings rate) — fast, deterministic, no DB needed.

## With more time I would

1. Move to **double-entry bookkeeping**: every transaction writes balanced debit/credit journal lines inside a DB transaction with row locks, and the balance becomes an invariant, not a cache.
2. Add **idempotency keys** on transfers/creates so retries and double-taps can't double-spend.
3. Wire **Supabase Auth** with per-user RLS (`auth.uid() = user_id`) instead of the open demo policies.
4. Store amounts as **integer minor units** (cents) and use optimistic UI with an offline mutation queue + server-side conflict reconciliation.
5. Add **React Query/SWR** for request dedupe/caching and **Playwright** E2E covering the CRUD + transfer-limit flows.

## Troubleshooting

### `Error: error:0308010C:digital envelope routines::unsupported` (ERR_OSSL_EVP_UNSUPPORTED)

Cause: an **old Next.js (webpack 4)** in `node_modules` using the removed md4 hash on Node 17+. This project needs Next 16 — fix with a clean install:

```bash
# Windows
rmdir /s /q node_modules
del package-lock.json
npm install
npm run dev

# macOS / Linux
rm -rf node_modules package-lock.json
npm install
npm run dev
```

Verify with `npx next --version` → should print `16.2.6`.

If you're stuck on an old Next for another project, the legacy workaround is
`set NODE_OPTIONS=--openssl-legacy-provider` (Windows) before `npm run dev` — but **this codebase will not run on old Next**.

### `SyntaxError: Unexpected token '{'` at `next dev` startup

Caused by loading a TypeScript `next.config.ts` on Node versions without type-stripping. This repo now ships `next.config.mjs` (plain JS). If you still see it, delete `.next` and restart, and ensure Node ≥ 20.19 / 22 LTS.

### Port 3000 in use

Kill the stray process or run `npx next dev -p 3001`.

## Deploy to Vercel

### Prerequisites
1. Supabase project with `supabase/schema.sql`, `supabase/seed.sql` and `supabase/rls.sql` executed.
2. Your Supabase **Project URL** and **anon public** key (Settings → API).
3. Code pushed to GitHub/GitLab/Bitbucket (recommended) or the Vercel CLI installed.

### Method A — Git (recommended, auto-deploys on push)
1. Push this repo to GitHub.
2. On vercel.com → **Add New… → Project** → import the repo. Vercel auto-detects Next.js.
3. In **Environment Variables** add:
    - `SUPABASE_URL` = `https://xxxx.supabase.co`
    - `SUPABASE_ANON_KEY` = `eyJ...`
4. Deploy. Node version is picked from `.nvmrc` (22). Build command `next build`, output `.next` — all automatic.
5. Verify: `https://your-app.vercel.app/api/health` should return `{"ok":true,"store":"supabase",...}`.

### Method B — Vercel CLI
```bash
npm i -g vercel
vercel login
vercel link          # answers: Vercel, your scope, project name; framework Next.js
vercel env add SUPABASE_URL production      # paste value
vercel env add SUPABASE_ANON_KEY production # paste value
vercel --prod
```

### Notes
- Only the **anon** key is needed — secrets never reach the browser; all writes go through `/api/*` route handlers.
- `DATABASE_URL` is **not** required on Vercel; the local-Postgres fallback only activates when `SUPABASE_URL` is absent.
- If `/api/health` 500s after deploy, open it in a browser — it returns the exact error + fix hint (usually: run `rls.sql` or `seed.sql`).

## Data & privacy

Legal pages (`/privacy`, `/terms`) are written for Kenya's **Data Protection Act, 2019**, the National Payment System Act, and the Computer Misuse and Cybercrimes Act, 2018.
