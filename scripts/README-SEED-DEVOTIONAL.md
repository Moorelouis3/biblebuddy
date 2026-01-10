# Seeding "The Tempting of Jesus" Devotional

## Overview
This script seeds the first devotional into the database with all 21 days of content from the PDF.

## Current Status
- ✅ Day 1: Complete (from PDF)
- ⚠️ Days 2-19: Need to be extracted from full PDF (content was truncated in processing)
- ✅ Day 20: Complete (from PDF)
- ✅ Day 21: Complete (from PDF)

## To Complete the Seed Script

1. **Extract Days 2-19 from PDF**:
   - Open "The Tempting Of Jesus devotional.pdf"
   - For each day (2-19), extract:
     - Day number
     - Day title
     - Full devotional text (exact text, don't summarize)
     - Bible reading reference (e.g., "Luke 4:1-13", "Matthew 4:1-11")
     - One reflection question (if multiple exist, use the first/main one)

2. **Update `scripts/seed-tempting-of-jesus.ts`**:
   - Replace the placeholder days (currently days 7-19 are in a loop)
   - Add each day as a complete object in the `devotionalDays` array
   - Ensure the `bible_reading_reference` field matches the format in the PDF

3. **Bible Reading Reference Format**:
   - The script automatically parses references like:
     - "1 John 2:1-17" → book: "1 John", chapter: 2
     - "Luke 4:1-13" → book: "Luke", chapter: 4
     - "Ephesians 6:10-18" → book: "Ephesians", chapter: 6

## Running the Script

Once all days are added:

```bash
# Set environment variables
export NEXT_PUBLIC_SUPABASE_URL="your-url"
export SUPABASE_SERVICE_ROLE_KEY="your-key"

# Run the script
npx tsx scripts/seed-tempting-of-jesus.ts
```

## Database Schema

The script will:
1. Create the main devotional record in `devotionals` table
2. Create 21 day records in `devotional_days` table
3. If devotional already exists, it will delete and re-seed all days

## Notes

- **Do not summarize** devotional text - use exact content from PDF
- **Reflection questions** are optional but should be included if present
- **Bible readings** should match exactly what's in the PDF
- All content must be **text-only** (no images or formatting)

