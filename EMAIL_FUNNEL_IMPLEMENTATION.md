# Bible Buddy 7-Day Email Funnel - Implementation Guide

**Status: Ready for Review**  
**Created: July 31, 2026**  
**Implementation Lead: Claude Code**

## Overview

The 7-day email funnel has been fully implemented in the codebase. This document outlines all the components, setup steps, and testing procedures.

## What's Been Implemented

### 1. Database Tables (CREATE_EMAIL_FUNNEL_TABLES.sql)

Four new tables track the funnel:

- **email_funnel_state**: Tracks when each email is sent per user, plus tier at completion
- **email_funnel_sends**: Log of every email sent (for analytics and deduplication)
- **user_email_funnel_tier**: Final engagement tier (power_user, regular_user, ghost)
- **email_funnel_events**: Tracks opens, clicks, bounces (extensible for future)

### 2. Email Templates (lib/emailFunnelTemplates.ts)

All 11 email templates defined:
- Day 1: Welcome
- Day 2: God's word changes you
- Day 3: Study the Bible no matter what
- Day 4: 4 versions (power user free, power user pro, active user, zero usage)
- Day 5: How to actually understand the Bible
- Day 6: You don't have to study alone
- Day 7: Why I built this
- Day 8: 4 versions (power user free, power user pro, active user, zero usage)

### 3. Helper Functions (lib/emailFunnelHelpers.ts)

**sendFunnelEmailViaSysteme()**: Send email via systeme.io API  
**determineUserTier()**: Check logins + actions to classify user (power_user/regular_user/ghost)  
**checkIfUserIsPro()**: Query is_pro status from profile_stats  
**getSignupTimestamp()**: Get when user signed up  
**recordEmailSent()**: Log every email send for analytics  
**updateEmailFunnelState()**: Update tracking table  
**updateUserTier()**: Record final engagement tier  

### 4. API Routes

#### Signup Integration
- `/api/systeme-sync`: **UPDATED** - Now initializes email_funnel_state when user signs up
- `app/signup/page.tsx`: **UPDATED** - Now passes userId to systeme-sync

#### Conditional Routes (For Direct Calls)
- `/api/email-funnel/day-4-conditional/route.ts`: Check engagement, send Day 4
- `/api/email-funnel/day-8-conditional/route.ts`: Check engagement, send Day 8, finalize tier
- `/api/email-funnel/send-day/route.ts`: Generic route to send emails for any day (not used in current setup)

#### Cron Routes (For Scheduled Execution)
- `/api/cron/email-funnel-send-all/route.ts`: Send Days 1-3, 5-7 to eligible users (hourly)
- `/api/cron/email-funnel-day4/route.ts`: Send Day 4 conditional to users 72h post-signup (daily)
- `/api/cron/email-funnel-day8/route.ts`: Send Day 8 conditional to users 168h post-signup (daily)
- `/api/cron/email-funnel-day1/route.ts`: Day 1 only (if you prefer separate scheduling)

#### Analytics
- `/api/email-funnel/analytics/route.ts`: Dashboard metrics (signups, sends, tier distribution, upgrade rate)

## Setup Instructions

### Step 1: Run Database Migration

Execute `CREATE_EMAIL_FUNNEL_TABLES.sql` in Supabase SQL editor:

```bash
# Copy entire contents of CREATE_EMAIL_FUNNEL_TABLES.sql
# Paste into Supabase > SQL Editor
# Click "Run"
```

This creates:
- email_funnel_state table with indexes
- email_funnel_sends table with indexes
- user_email_funnel_tier table
- email_funnel_events table
- All RLS policies for security

### Step 2: Verify Environment Variables

Check `.env.local` has these:
- `NEXT_PUBLIC_SUPABASE_URL` ✓
- `SUPABASE_SERVICE_ROLE_KEY` ✓
- `SYSTEME_API_KEY` ✓
- `CRON_SECRET` (optional, for securing cron endpoints)

### Step 3: Deploy Code Changes

The following files have been created/modified:

**Created:**
- `lib/emailFunnelTemplates.ts` - Email template definitions
- `lib/emailFunnelHelpers.ts` - Helper functions
- `app/api/email-funnel/day-4-conditional/route.ts`
- `app/api/email-funnel/day-8-conditional/route.ts`
- `app/api/email-funnel/send-day/route.ts`
- `app/api/email-funnel/cron-send-pending/route.ts`
- `app/api/email-funnel/analytics/route.ts`
- `app/api/cron/email-funnel-send-all/route.ts`
- `app/api/cron/email-funnel-day4/route.ts`
- `app/api/cron/email-funnel-day8/route.ts`
- `app/api/cron/email-funnel-day1/route.ts`
- `CREATE_EMAIL_FUNNEL_TABLES.sql` - Database schema

**Modified:**
- `app/api/systeme-sync/route.ts` - Now initializes funnel state
- `app/signup/page.tsx` - Passes userId to systeme-sync

Run `npm run build` to verify no type errors.

### Step 4: Set Up Cron Jobs

You need to configure three recurring jobs (example using a cron service like cron-job.org, EasyCron, or Vercel Cron):

**Option A: Vercel Cron (Recommended)**

Add to `vercel.json`:

```json
{
  "crons": [
    {
      "path": "/api/cron/email-funnel-send-all",
      "schedule": "0 * * * *"
    },
    {
      "path": "/api/cron/email-funnel-day4",
      "schedule": "0 3 * * *"
    },
    {
      "path": "/api/cron/email-funnel-day8",
      "schedule": "0 3 * * *"
    }
  ]
}
```

This runs:
- `send-all` every hour (Days 1-3, 5-7)
- `day4` daily at 3 AM UTC (72h window)
- `day8` daily at 3 AM UTC (168h window)

**Option B: External Cron Service**

Using cron-job.org or similar:

```
GET https://mybiblebuddy.net/api/cron/email-funnel-send-all
  Authorization: Bearer [CRON_SECRET]
  Every hour

GET https://mybiblebuddy.net/api/cron/email-funnel-day4
  Authorization: Bearer [CRON_SECRET]
  Daily at 3 AM UTC

GET https://mybiblebuddy.net/api/cron/email-funnel-day8
  Authorization: Bearer [CRON_SECRET]
  Daily at 3 AM UTC
```

### Step 5: Stripe Setup (Optional - For Upgrade Tracking)

To track when users upgrade:

1. In Stripe Dashboard, create a product:
   - Name: "Bible Buddy Pro (Lifetime)"
   - Price: $29
   - Billing: One-time payment
   - Note the product ID

2. Update the upgrade link in email templates:
   - Current: `https://mybiblebuddy.net/upgrade?tier=lifetime_29`
   - Ensure this connects to your Stripe payment flow

3. When payment succeeds, set `is_pro = true` in profile_stats and call:
   ```
   POST /api/email-funnel/day-4-conditional
   {
     "user_id": "uuid",
     "email": "user@example.com"
   }
   ```
   to re-send Day 4 with the "a_pro" version if they're a power user

## Testing Checklist

### Pre-Launch Testing

- [ ] Database tables created successfully (check Supabase schema)
- [ ] No TypeScript errors: `npm run build`
- [ ] SYSTEME_API_KEY is set and valid
- [ ] CRON_SECRET is set (if using external cron)

### Unit Tests (Manual)

1. **Test Signup Flow**
   - [ ] Create new account
   - [ ] Verify `email_funnel_state` record created with `signup_timestamp`
   - [ ] Check Supabase > email_funnel_state table

2. **Test Day 1 Email**
   ```bash
   curl -X GET "https://mybiblebuddy.net/api/cron/email-funnel-day1" \
     -H "Authorization: Bearer [CRON_SECRET]"
   ```
   - [ ] Response shows `{"ok": true, "sent": 1, ...}`
   - [ ] Check email_funnel_sends table - new record with day=1
   - [ ] Check email_funnel_state - day1_sent_at is filled

3. **Test Day 4 Conditional (Power User, Free)**
   ```bash
   # Simulate user with 2+ logins and 2+ actions
   # (manually insert test actions into master_actions)
   
   curl -X GET "https://mybiblebuddy.net/api/cron/email-funnel-day4" \
     -H "Authorization: Bearer [CRON_SECRET]"
   ```
   - [ ] Response shows version "a" (power user, free)
   - [ ] Email sent with "In just three days, you're crushing it"

4. **Test Day 4 Conditional (Power User, Pro)**
   - [ ] Set `is_pro = true` for test user
   - [ ] Re-run Day 4 test
   - [ ] Response shows version "a_pro"
   - [ ] Email sent with "You're a pro — literally"

5. **Test Day 4 Conditional (Active User)**
   - [ ] Test user with only 1 login, 0 actions
   - [ ] Response shows version "b"
   - [ ] Email sent with "Get more out of Bible Buddy"

6. **Test Day 4 Conditional (Ghost)**
   - [ ] Test user with 0 logins, 0 actions
   - [ ] Response shows version "c"
   - [ ] Email sent with "You signed up, but you haven't tried it yet"

7. **Test Day 8 (Same as Day 4, after 7 days)**
   - [ ] Verify tier is determined and updated in user_email_funnel_tier
   - [ ] Verify funnel_completed_at is set

8. **Test Analytics Dashboard**
   ```bash
   curl -X GET "https://mybiblebuddy.net/api/email-funnel/analytics" \
     -H "Authorization: Bearer [CRON_SECRET]"
   ```
   - [ ] Response shows metrics: total_signups, completed_funnel, upgraded_count
   - [ ] Shows breakdown by day
   - [ ] Shows tier distribution

### Integration Tests (With Real Users)

1. **Create 4 Test Accounts**
   - Account A: Will log in 2+ times, do 2+ actions (power user)
   - Account B: Will log in once, do no actions (active user)
   - Account C: Will not log in at all (ghost)
   - Account D: Same as A, but upgrade to Pro (power user pro)

2. **Monitor Over 8 Days**
   - Day 1: Verify welcome email in all 4 inboxes
   - Day 2-3: Verify daily emails
   - Day 4: Verify conditional emails match expected versions
   - Days 5-7: Verify daily emails
   - Day 8: Verify final conditional emails
   - Verify funnel_completed_at is set after Day 8

3. **Verify Email Content**
   - [ ] No broken links
   - [ ] Correct tone (personal, from Louis)
   - [ ] Upgrade link works
   - [ ] Proper HTML formatting

## Success Metrics (Track on Day 30)

Once funnel launches, track these metrics:

```
Per Email Day:
- % who received email (sent count)
- % who opened email (from Systeme.io webhooks)
- % who clicked links (from Systeme.io webhooks)

Funnel Progression:
- % reaching Power User tier
- % reaching Regular User tier
- % as Ghosts
- % who upgraded during funnel

Upgrade Metrics:
- Upgrade rate by version (which version converts best?)
- Day 4 vs Day 8 upgrade rate
- Power users who upgrade by Day 4 vs Day 8
```

Target (by Jan 28, 2027):
- Day-1 retention: 2.4% → 8-12% (3-5x improvement)
- Power user conversion: 1-2% → 5-10%
- Upgrade rate: 5-10% of free users → Pro

## Troubleshooting

### Emails Not Sending

1. Check cron job ran: Look in server logs for `[EMAIL_FUNNEL]` entries
2. Check API key: `echo $SYSTEME_API_KEY` should output the key
3. Check email_funnel_state exists: `SELECT COUNT(*) FROM email_funnel_state`
4. Manually test Systeme.io API:
   ```bash
   curl -X POST "https://api.systeme.io/api/emails/send" \
     -H "X-API-Key: [SYSTEME_API_KEY]" \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","subject":"Test","body":"Test body"}'
   ```

### Conditional Logic Not Working

1. Check master_actions table has login/action records for test user
2. Verify determineUserTier function logic:
   - Login count: `SELECT COUNT(*) FROM master_actions WHERE user_id='X' AND action_type='user_login'`
   - Action count: `SELECT COUNT(*) FROM master_actions WHERE user_id='X' AND action_type != 'user_login'`

### Cron Jobs Not Running

1. Verify CRON_SECRET is set and correct
2. Check cron endpoint is accessible: `curl https://mybiblebuddy.net/api/cron/email-funnel-send-all`
3. If using Vercel Cron, check vercel.json is committed
4. Check Vercel logs: vercel.com > [Project] > Functions

## Next Steps

1. **Run database migration** (CREATE_EMAIL_FUNNEL_TABLES.sql)
2. **Deploy code** (npm run build && git push)
3. **Set up cron jobs** (Vercel or external service)
4. **Test with 4 users over 8 days**
5. **Monitor analytics dashboard** for funnel progression
6. **Adjust email content** based on early open/click rates
7. **Track upgrade conversions** by version

## Files Created/Modified

### New Files
- lib/emailFunnelTemplates.ts (287 lines)
- lib/emailFunnelHelpers.ts (175 lines)
- app/api/email-funnel/day-4-conditional/route.ts (92 lines)
- app/api/email-funnel/day-8-conditional/route.ts (97 lines)
- app/api/email-funnel/send-day/route.ts (121 lines)
- app/api/email-funnel/cron-send-pending/route.ts (126 lines)
- app/api/email-funnel/analytics/route.ts (83 lines)
- app/api/cron/email-funnel-send-all/route.ts (119 lines)
- app/api/cron/email-funnel-day4/route.ts (152 lines)
- app/api/cron/email-funnel-day8/route.ts (162 lines)
- app/api/cron/email-funnel-day1/route.ts (74 lines)
- CREATE_EMAIL_FUNNEL_TABLES.sql (104 lines)
- EMAIL_FUNNEL_IMPLEMENTATION.md (this file)

### Modified Files
- app/api/systeme-sync/route.ts (+17 lines)
- app/signup/page.tsx (+1 line)

**Total:** 1,510 lines of implementation code

---

**Ready for review. Next step: Run CREATE_EMAIL_FUNNEL_TABLES.sql in Supabase, deploy code, and configure cron jobs.**
