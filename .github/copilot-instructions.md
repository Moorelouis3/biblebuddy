# Bible Buddy - Copilot Instructions

## Project Overview
**Bible Buddy** is a Next.js 16+ SPA for guided Bible reading with study tools, user authentication via Supabase, and monetization via Stripe. The app prioritizes user activity tracking for analytics and streak-based gamification.

Stack: Next.js 16 (App Router, TypeScript), React 19, Supabase (auth + database), Stripe, TipTap (rich text), Tailwind CSS v4.

---

## Architecture & Key Components

### Three-Layer Data Architecture

1. **Master Actions (Event Log)**
   - Single source of truth: `master_actions` table records EVERY user action
   - Never aggregated, never edited—immutable append-only event log
   - Actions: `user_login`, `chapter_completed`, `note_created`, `person_learned`, `place_discovered`, `keyword_mastered`, `study_view`
   - See `lib/actionRecorder.ts` for insertion pattern: always use `logActionToMasterActions()` function

2. **Profile Stats (User Aggregates)**
   - Denormalized counters from `master_actions`: `total_actions`, `chapters_completed_count`, `notes_created_count`, etc.
   - Houses membership info: `membership_status` (free/pro), `pro_expires_at` for subscription tracking
   - See `lib/profileStats.ts` for reads; updates come from feature pages or webhooks

3. **Feature Tables (Domain Data)**
   - Notes: `notes`, `bible_notes`
   - Study items: `bible_people_notes`, `places_in_the_bible_notes`, `keywords_in_the_bible`
   - Devotionals: `devotionals`, `devotional_days`
   - RLS policies enforce user ownership

### Authentication Flow
- **Client**: `lib/supabaseClient.ts` uses `createBrowserClient` (stores session in cookies)
- **Server**: `middleware.ts` checks protected paths (/dashboard, /reading-plan, /notes, /ai, /grow, /profile) via `createServerClient`
- **API Routes**: Use service role key (`SUPABASE_SERVICE_ROLE_KEY`) to bypass RLS for webhooks/admin operations

### Payment & Membership
- **Stripe Webhook** (`app/api/stripe/webhook/route.ts`): Updates `profile_stats.membership_status` and `pro_expires_at`
- **Pro Expiration Check** (`lib/checkProExpiration.ts`): Runs on app load in `AppShell.tsx`; reverts users from "pro" to "free" if expired
- **Promo Codes** (`app/api/promo/apply-code/route.ts`): Updates membership directly
- Free users have unlimited access to all features (study view limits removed)

---

## Key Files & Patterns

### Page Structure
- **Landing / Auth**: `app/page.tsx` (signup), `app/login/page.tsx`, `app/reset-password/`
- **Protected Pages**: All use `"use client"` + fetch session in `useEffect` + middleware guard
- **Page Pattern**: `app/[feature]/page.tsx` → fetch user data → render component with cleanup

Example (`app/dashboard/page.tsx`):
```typescript
"use client";
const [userId, setUserId] = useState<string | null>(null);

useEffect(() => {
  const getUser = async () => {
    const { data } = await supabase.auth.getSession();
    if (!data.session) router.push("/login");
    setUserId(data.session.user.id);
  };
  getUser();
}, []);

// Log action after completion
await logActionToMasterActions(userId, "chapter_completed", "Genesis 1", username);
```

### Supabase Client Patterns
- **Browser Client**: `supabase` from `lib/supabaseClient.ts` (public anon key, session in cookies)
- **Server Client**: `createServerClient()` with cookie handlers (used in middleware, API routes with auth)
- **Admin Client**: `createClient(url, serviceKey)` with `autoRefreshToken: false` (API routes, scripts)

### Admin Routes
- Require `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS
- Located in `app/api/admin/` and `app/api/stripe/`
- Example: `app/api/admin/analytics/route.ts` queries `master_actions`, `user_signups`, auth stats via RPC

### Styling
- Tailwind CSS v4 (not v3) with `@tailwindcss/postcss` plugin
- No component library—use semantic HTML + Tailwind classes
- Modal components: Custom modals in `components/` (e.g., `BibleReadingModal.tsx`, `NewNoteModal.tsx`)

### Hooks
- **`useBibleHighlights.ts`**: Fetches highlight terms from three tables, merges into array of `{term, type}` objects
- **`useFeaturedCharacters.ts`**: Loads featured Bible people for carousel
- Pattern: Use `useEffect` to fetch on mount, handle loading/errors, cleanup in dependency array

---

## Development Workflow

### Running the App
```powershell
npm run dev          # Next.js dev server on localhost:3000
npm run build        # TypeScript check + Next.js build
npm run lint         # ESLint (ESLint v9 config in eslint.config.mjs)
npm start            # Run production build
```

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_ROLE_KEY=eyJxxx (for admin API routes & scripts)
STRIPE_SECRET_KEY=sk_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx
```

### Database Migrations
- SQL files in root: `CREATE_*.sql`, `ADD_*.sql`, `FIX_*.sql`
- Run in Supabase SQL Editor before deploying
- RLS policies critical: See `FIX_BIBLE_NOTES_RLS_POLICIES.sql` as example
- Service role key needed for seed scripts (`scripts/seed-devotionals.ts`)

### Seeding Data
```powershell
npx tsx scripts/seed-devotionals.ts
```
Requires `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`.

---

## Common Tasks

### Adding a New User Action Type
1. Add to `ActionType` union in `lib/actionRecorder.ts`
2. Update master_actions constraint in SQL: `CREATE_MASTER_ACTIONS_TABLE.sql`
3. Call `logActionToMasterActions(userId, actionType, label?, username?)` from feature page
4. (Optional) Update `profile_stats` counter if it's a key metric

### Updating User Membership (Post-Upgrade)
- **Via Webhook** (Stripe): `app/api/stripe/webhook/route.ts` → `updateMembershipStatus()`
- **Direct Update** (Promo): `app/api/promo/apply-code/route.ts` → upsert `profile_stats`
- Always set `pro_expires_at` timestamp for expiration tracking

### Reading User Activity (Analytics)
- Admin page queries `master_actions` table directly
- See `app/admin/analytics/page.tsx` for filter patterns (time range, action type)
- Example: `supabase.from("master_actions").select("...").gte("created_at", fromDate)`

### Protecting API Routes
- Check auth via `supabase.auth.getUser()` (browser client won't work—use `createServerClient()`)
- Return 401 if no user; return 403 if insufficient permissions
- See `app/api/stripe/create-checkout-session/route.ts` for pattern

### Adding a Modal Component
1. Create `components/YourModal.tsx` with `"use client"` and `useState`
2. Import into page, control visibility with state
3. Use Tailwind for backdrop (fixed inset), modal styling; confetti on success (e.g., `DevotionalDayCompletionModal.tsx`)
4. No external modal library—keep it simple

---

## Critical Patterns & Gotchas

✅ **Do**
- Use `maybeSingle()` when expecting 0 or 1 row; handle null
- Log actions to `master_actions` THEN update `profile_stats` in two steps (see `app/dashboard/page.tsx`)
- Use service role key in server-only routes (API routes, scripts)
- Check `pro_expires_at` before granting Pro features (run `checkProExpiration()` on app init)
- Use middleware for auth checks on protected routes—don't rely on client-side guards alone

❌ **Don't**
- Call admin Supabase client in browser code (it requires service role key)
- Update `profile_stats` directly from client (use webhooks or API routes)
- Forget to set RLS policies for new tables (default deny—explicitly allow reads/writes)
- Use `select("*")` on large tables in loops (always specify columns)

---

## File Structure Conventions
- **`app/[feature]/page.tsx`**: Protected pages
- **`lib/*.ts`**: Utilities (Supabase queries, action recording, stats fetching)
- **`components/` (no subfolders)**: Reusable React components
- **`hooks/`**: Custom React hooks
- **`app/api/`**: API routes (must return `NextResponse`)
- **`scripts/`**: CLI scripts (Node.js, use service role key)
- **SQL files in root**: Migrations (run manually in Supabase)

---

## Notes for AI Agents

- **Supabase Auth**: Session lives in cookies; middleware reads it. Always check auth before sensitive operations.
- **RLS is not optional**: Every table needs explicit policies—"deny all" is the default.
- **Master Actions is the event log**: All user interactions flow there. Queries against it are safe for analytics.
- **Pro status is time-based**: Check `pro_expires_at` on load; don't cache membership.
- **No form validation library**: Use native HTML + manual error handling (see login page).
- **TypeScript strict mode**: All files must be strict-compliant; no `any` without justification.
