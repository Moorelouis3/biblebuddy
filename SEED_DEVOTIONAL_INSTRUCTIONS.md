# How to Seed "The Tempting of Jesus" Devotional

## Step 1: Run the SQL Migration

First, you need to apply the RLS policy fixes. Run this SQL in your Supabase SQL Editor:

```sql
-- File: FIX_DEVOTIONALS_RLS.sql
```

This will ensure that:
- Authenticated users can read devotionals
- Anonymous users can read devotionals (so they show up without login)
- Service role can insert/update/delete (for seeding)

## Step 2: Set Environment Variables

Make sure you have these environment variables set in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**Important:** The `SUPABASE_SERVICE_ROLE_KEY` is needed for the seed script to bypass RLS and insert data.

## Step 3: Run the Seed Script

Run the seed script from your project root:

```bash
npx tsx scripts/seed-tempting-of-jesus.ts
```

Or if you have tsx installed globally:

```bash
tsx scripts/seed-tempting-of-jesus.ts
```

This will:
- Create the main devotional record "The Tempting of Jesus"
- Insert all 21 days of content
- If the devotional already exists, it will delete and re-seed all days

## Step 4: Verify

After running the seed script, check:

1. **In Supabase Dashboard:**
   - Go to Table Editor → `devotionals` table
   - You should see "The Tempting of Jesus" devotional
   - Go to `devotional_days` table
   - You should see 21 rows (one for each day)

2. **In the App:**
   - Navigate to `/devotionals` page
   - You should see "The Tempting of Jesus" card
   - Click it to see the 21-day structure

## Troubleshooting

### "No devotionals available yet"
- Check that the seed script ran successfully (check terminal output)
- Verify RLS policies are applied (run FIX_DEVOTIONALS_RLS.sql)
- Check browser console for any errors
- Verify you're logged in OR that anon policies are active

### "Permission denied" errors
- Make sure `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- Verify RLS policies allow reads for authenticated/anon users
- Check Supabase dashboard → Authentication → Policies

### Seed script errors
- Make sure all 21 days are properly formatted in the script
- Check for TypeScript errors: `npm run build`
- Verify environment variables are set

