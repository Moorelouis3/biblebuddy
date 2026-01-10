# How to Run the Devotional Seed Script

## Step 1: Install tsx (if not already installed)

The seed script is a TypeScript file, so you need `tsx` to run it. Install it globally or as a dev dependency:

```bash
npm install -D tsx
```

Or install globally:
```bash
npm install -g tsx
```

## Step 2: Set Up Environment Variables

Create a `.env` file in your project root (or add to existing `.env.local`) with your Supabase credentials:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Important:** 
- The seed script uses `SUPABASE_URL` (not `NEXT_PUBLIC_SUPABASE_URL`) - this is a server-only variable
- Get your `SUPABASE_URL` from: Supabase Dashboard → Project Settings → API
- Get your `SERVICE_ROLE_KEY` from: Supabase Dashboard → Project Settings → API → Service Role Key (⚠️ Keep this secret!)
- The script will also check `NEXT_PUBLIC_SUPABASE_URL` as a fallback, but prefer `SUPABASE_URL` for seed scripts

## Step 3: Make Sure Tables Are Created

Before running the seed script, make sure you've run the SQL migration:

1. Open Supabase Dashboard → SQL Editor
2. Run the contents of `SETUP_DEVOTIONALS_COMPLETE.sql`
3. Verify tables were created (check Table Editor)

## Step 4: Run the Seed Script

From your project root directory, run:

```bash
npx tsx scripts/seed-tempting-of-jesus.ts
```

Or if you installed tsx globally:

```bash
tsx scripts/seed-tempting-of-jesus.ts
```

## Step 5: Verify Success

You should see output like:
```
Seeding 'The Tempting of Jesus' devotional...

Inserting 21 days...
✅ Inserted day 1: The Three Tricks of the Devil
✅ Inserted day 2: Jesus in the Wilderness
✅ Inserted day 3: Fighting Temptation Isn't Easy
...
✅ Seeding complete!
   Success: 21 days
```

Then check:
- Supabase Dashboard → Table Editor → `devotionals` (should have 1 row)
- Supabase Dashboard → Table Editor → `devotional_days` (should have 21 rows)
- Your app at `/devotionals` (should show the devotional card)

## Troubleshooting

**Error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"**
- Make sure `.env.local` file exists in project root
- Make sure variables are spelled correctly (no typos)
- Restart your terminal/editor after creating `.env.local`

**Error: "Cannot find module 'tsx'"**
- Run: `npm install -D tsx`
- Or use: `npx tsx` (doesn't require installation)

**Error: "relation 'devotionals' does not exist"**
- Run `SETUP_DEVOTIONALS_COMPLETE.sql` in Supabase SQL Editor first

**Error: "permission denied"**
- Make sure you're using the SERVICE_ROLE_KEY (not anon key)
- Service role key bypasses RLS and can insert data

