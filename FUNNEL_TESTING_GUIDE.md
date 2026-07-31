# Bible Buddy 7-Day Email Funnel — Testing Guide

**Duration:** 8 days  
**Test Users:** 4  
**Time Commitment:** ~15 min total (most is automated)

---

## Pre-Testing Checklist

- [ ] Database migration complete (CREATE_EMAIL_FUNNEL_TABLES.sql ran)
- [ ] Code deployed (npm run build successful)
- [ ] SYSTEME_API_KEY is set in .env.local
- [ ] CRON_SECRET is set (or cron jobs will work without it)
- [ ] Can access your Supabase dashboard
- [ ] Have 4 test email addresses (personal emails preferred)

---

## Test Accounts Setup

Create 4 test accounts with these profiles:

### Account A: Power User (Free)
**Goal:** Receives "You're crushing it" upgrade offer  
**Behavior:**
- Day 1: Sign up
- Day 2-3: Log in once per day (2+ logins total)
- Day 3: Perform 2+ actions (click a button, complete a chapter, take a quiz, etc.)
- Day 4: Should receive "In just three days, you're crushing it"
- Day 8: Should receive "One week in — you're a power user"

### Account B: Active User (Free)
**Goal:** Receives "Get more out of this" gentle offer  
**Behavior:**
- Day 1: Sign up
- Day 2: Log in once only (1 login)
- Day 3: Do 1 action only (1 action)
- Day 4: Should receive "Get more out of Bible Buddy"
- Day 8: Should receive "One week in — ready to commit?"

### Account C: Ghost User
**Goal:** Receives "You haven't tried it yet" re-engagement  
**Behavior:**
- Day 1: Sign up
- Days 2-8: Never open app, never take any actions
- Day 4: Should receive "You signed up, but you haven't tried it yet"
- Day 8: Should receive "We built this for people like you"

### Account D: Power User (Pro)
**Goal:** Receives "You're a pro" congratulations  
**Behavior:**
- Day 1: Sign up
- Day 2-3: Log in 2+ times
- Day 3: Do 2+ actions
- Day 3: Upgrade to Pro (manually set `is_pro = true` in Supabase or via payment)
- Day 4: Should receive "You're a pro — literally"
- Day 8: Should receive "You're one week in — and you chose Pro"

---

## Day-by-Day Testing

### DAY 1: Signup & Verify Day 1 Email

**Morning:**
1. Create 4 test accounts (Account A-D)
2. Note the signup timestamp for each

**Immediately after signup (for each account):**
1. Check email inbox for Day 1 welcome email
2. Verify email content says: "My name is Louis. I'm the founder of Bible Buddy..."
3. Check Supabase `email_funnel_state` table:
   ```sql
   SELECT user_id, day1_sent_at FROM email_funnel_state 
   WHERE user_id IN ('account-a-uuid', 'account-b-uuid', 'account-c-uuid', 'account-d-uuid')
   ```
   - [ ] All 4 have day1_sent_at timestamp

**Optional manual test:**
1. Open server and run cron manually:
   ```bash
   curl -X GET "https://localhost:3000/api/cron/email-funnel-send-all" \
     -H "Authorization: Bearer $CRON_SECRET"
   ```
2. Response should show `{"ok": true, "results": {"day1": {"sent": 4, ...}}}` or similar

---

### DAYS 2-3: Verify Daily Emails Arrive

**Day 2 (24 hours after signup):**
- [ ] Account A email: "God's word changes you (unlike anything else)"
- [ ] Account B email: Same
- [ ] Account C email: Same
- [ ] Account D email: Same

Check Supabase:
```sql
SELECT user_id, day2_sent_at FROM email_funnel_state WHERE user_id IN (...)
```
- [ ] All 4 have day2_sent_at

**Day 3 (48 hours after signup):**
- [ ] Account A: "Study the Bible no matter what"
  - Also perform 2+ actions (click things, complete something)
- [ ] Account B: Same email
  - Perform 1 action only
- [ ] Account C: Same email
  - **Do NOT interact with app**
- [ ] Account D: Same email
  - Also perform 2+ actions (same as Account A)
  - **Upgrade to Pro** (manually in Supabase: `UPDATE profile_stats SET is_pro = true WHERE user_id = 'account-d-uuid'`)

Check Supabase:
```sql
SELECT user_id, day3_sent_at FROM email_funnel_state WHERE user_id IN (...)
```
- [ ] All 4 have day3_sent_at

---

### DAY 4: Verify Conditional Logic (72 hours)

**Before running cron:**
1. Make sure you've done the Day 3 actions (logins, app usage, upgrade)
2. Accounts A & B: Log in at least once on Day 4

**Run cron job manually:**
```bash
curl -X GET "https://yourdomain.com/api/cron/email-funnel-day4" \
  -H "Authorization: Bearer $CRON_SECRET"
```

Expected response:
```json
{
  "ok": true,
  "day": 4,
  "sent": 4,
  "failed": 0,
  "versions": {
    "a": 1,      // Account A (power user, free)
    "a_pro": 1,  // Account D (power user, pro)
    "b": 1,      // Account B (active user)
    "c": 1       // Account C (ghost)
  }
}
```

**Verify emails:**
- [ ] **Account A** receives: "In just three days, you're crushing it" (version a)
  - Contains: $29 upgrade offer
- [ ] **Account B** receives: "Get more out of Bible Buddy" (version b)
  - Contains: Gentle upgrade prompt
- [ ] **Account C** receives: "You signed up, but you haven't tried it yet" (version c)
  - Contains: Re-engagement link
- [ ] **Account D** receives: "You're a pro — literally" (version a_pro)
  - Contains: Congratulations message (no upgrade offer)

**Check Supabase:**
```sql
SELECT user_id, day4_sent_at, day4_version FROM email_funnel_state 
WHERE user_id IN (...)
```
- [ ] All 4 have day4_sent_at
- [ ] Versions match above

**Verify in email_funnel_sends:**
```sql
SELECT user_id, email_day, template_version FROM email_funnel_sends 
WHERE email_day = 4 AND user_id IN (...)
```
- [ ] Account A: day4_version_a
- [ ] Account B: day4_version_b
- [ ] Account C: day4_version_c
- [ ] Account D: day4_version_a_pro

---

### DAYS 5-7: Verify Daily Emails Continue

**Day 5 (96 hours):**
- [ ] All accounts receive: "How to actually understand the Bible"
- [ ] Check all 4 have day5_sent_at in email_funnel_state

**Day 6 (120 hours):**
- [ ] All accounts receive: "You don't have to study alone"
- [ ] Check all 4 have day6_sent_at

**Day 7 (144 hours):**
- [ ] All accounts receive: "Why I built this"
- [ ] Check all 4 have day7_sent_at

No action needed from test users on these days.

---

### DAY 8: Verify Final Conditional & Tier Assignment (168 hours)

**Run cron job:**
```bash
curl -X GET "https://yourdomain.com/api/cron/email-funnel-day8" \
  -H "Authorization: Bearer $CRON_SECRET"
```

Expected response:
```json
{
  "ok": true,
  "day": 8,
  "sent": 4,
  "failed": 0,
  "versions": {
    "a": 1,      // Account A (power user, free)
    "a_pro": 1,  // Account D (power user, pro)
    "b": 1,      // Account B (active user)
    "c": 1       // Account C (ghost)
  },
  "tiers": {
    "power_user": 2,    // A and D
    "regular_user": 1,  // B
    "ghost": 1          // C
  }
}
```

**Verify emails:**
- [ ] **Account A**: "One week in — you're a power user"
- [ ] **Account B**: "One week in — ready to commit?"
- [ ] **Account C**: "We built this for people like you"
- [ ] **Account D**: "You're one week in — and you chose Pro"

**Verify tier assignment in Supabase:**
```sql
SELECT user_id, tier, determined_at FROM user_email_funnel_tier 
WHERE user_id IN (...)
```
- [ ] Account A: power_user
- [ ] Account B: regular_user
- [ ] Account C: ghost
- [ ] Account D: power_user

**Verify funnel completion:**
```sql
SELECT user_id, funnel_completed_at, tier_at_completion 
FROM email_funnel_state 
WHERE user_id IN (...)
```
- [ ] All 4 have funnel_completed_at timestamp (same as day8_sent_at)
- [ ] Tier at completion matches expectations

---

## Post-Testing Verification

### Run Analytics Dashboard

```bash
curl -X GET "https://yourdomain.com/api/email-funnel/analytics" \
  -H "Authorization: Bearer $CRON_SECRET"
```

Expected output:
```json
{
  "ok": true,
  "summary": {
    "total_signups": 4,
    "completed_funnel": 4,
    "upgraded_count": 1,  // Only D actually upgraded
    "upgrade_rate": "25%"  // 1/4
  },
  "by_day": {
    "1": {"sent": 4},
    "2": {"sent": 4},
    "3": {"sent": 4},
    "4": {"sent": 4},
    "5": {"sent": 4},
    "6": {"sent": 4},
    "7": {"sent": 4},
    "8": {"sent": 4}
  },
  "tier_distribution": {
    "power_user": 2,
    "regular_user": 1,
    "ghost": 1,
    "unknown": 0
  }
}
```

- [ ] Total signups = 4
- [ ] Completed funnel = 4
- [ ] All days have sent = 4
- [ ] Tier distribution matches

---

## Troubleshooting

### Email Not Received

**Check 1:** Is it in spam?
- [ ] Check Gmail/Outlook spam folder
- [ ] Check systeme.io was not blocked

**Check 2:** Did cron run?
- [ ] Check server logs for `[EMAIL_FUNNEL]` entries
- [ ] Run cron manually and check response

**Check 3:** Is user in database?
```sql
SELECT * FROM user_signups WHERE email = 'test@example.com'
```
- [ ] User record exists

**Check 4:** Is email_funnel_state created?
```sql
SELECT * FROM email_funnel_state WHERE user_id = 'uuid'
```
- [ ] Record exists with signup_timestamp

### Wrong Version Sent on Day 4

**Check:** User's logins + actions
```sql
SELECT action_type, COUNT(*) FROM master_actions 
WHERE user_id = 'uuid' 
AND created_at > NOW() - INTERVAL '72 hours'
GROUP BY action_type
```
- Should see: 2+ 'user_login' + 2+ other actions for power user

**Check:** User's pro status
```sql
SELECT is_pro FROM profile_stats WHERE user_id = 'uuid'
```
- Should be true for Account D, false for A, B, C

### Funnel Not Completing After Day 8

**Check:** Did Day 8 cron run?
- [ ] Check logs
- [ ] Check day8_sent_at is filled in email_funnel_state

**Check:** Is tier being set?
```sql
SELECT * FROM user_email_funnel_tier WHERE user_id = 'uuid'
```
- Should have an entry with tier='power_user', 'regular_user', or 'ghost'

---

## Success Criteria

The funnel is working correctly if:

- [ ] All 4 accounts receive all 8 emails (32 emails total)
- [ ] Day 4 conditional logic routes to correct versions (a, a_pro, b, c)
- [ ] Day 8 conditional logic routes to correct versions
- [ ] All users are assigned to correct tier (power_user, regular_user, ghost)
- [ ] Analytics dashboard shows 4 signups, 4 completed, 1 upgraded (25%)
- [ ] No errors in server logs

---

## After Testing

1. **Review email open rates** (from Systeme.io dashboard)
   - Target: Day 1-3 ~30-50%, Day 4-8 ~20-40%

2. **Review click rates** (especially on upgrade links)
   - Target: Version A (power user) 10-20%, Version B 3-5%, Version C 1-2%

3. **Decide:** Are you happy with:
   - Email content?
   - Conditional routing logic?
   - Upgrade pricing ($29)?

4. **Launch:** If everything looks good, enable cron jobs for production

---

## Notes

- **Time zones:** All times are in UTC. Cron jobs run at 3 AM UTC (schedule in vercel.json)
- **Duplicates:** The system prevents duplicate sends (idempotent)
- **Real users:** After testing, you can delete test records from Supabase
- **Production:** Real signups will flow through the same system automatically

---

**Questions?** Check EMAIL_FUNNEL_IMPLEMENTATION.md or email support.
