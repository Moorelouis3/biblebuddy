# Stripe Webhook Verification Guide

## Quick Fix: Upgrade Your Account Manually

Since you already paid but your account is still 'free', you have **3 options**:

### Option 1: Use the Promo Code (Easiest) ⚡
1. Go to Settings page in Bible Buddy
2. Find "Unlock Pro with a Code" section
3. Enter code: `BIBLEBUDDY100OFF`
4. Click "Apply Code"
5. Your account will be upgraded to Pro immediately

### Option 2: Run SQL Script
1. Go to your Supabase Dashboard → SQL Editor
2. Copy and paste the SQL from `MANUAL_UPGRADE_ADMIN.sql`
3. Run the query
4. Verify your membership_status changed to 'pro'

### Option 3: Verify Stripe Subscription and Re-trigger Webhook
See steps below ⬇️

---

## How to Verify Webhook is Working

### Step 1: Check Your Stripe Subscription
1. Go to Stripe Dashboard → Customers
2. Find your customer (search by email: `moorelouis3@gmail.com`)
3. Click on your customer → Subscriptions tab
4. Check if subscription exists and is `active`

### Step 2: Check Subscription Metadata
1. In Stripe, open your subscription
2. Scroll to "Metadata" section
3. **IMPORTANT**: Check if `user_id` exists in metadata
   - If `user_id` is missing → webhook won't know which user to upgrade
   - If `user_id` is there → webhook should work

### Step 3: Check Webhook Delivery Logs
1. Go to Stripe Dashboard → Developers → Webhooks
2. Click on your webhook endpoint
3. Check "Webhook deliveries" tab
4. Look for recent events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `invoice.payment_succeeded`
5. Check if any failed (red status)
   - If failed, click on the event to see error message
   - Common error: "No user_id found in metadata" → subscription metadata missing

### Step 4: Fix Missing Metadata (If Needed)
If your subscription doesn't have `user_id` in metadata:

1. Get your Supabase user ID:
   ```sql
   SELECT id FROM auth.users WHERE email = 'moorelouis3@gmail.com';
   ```

2. In Stripe Dashboard, go to your subscription
3. Click "Update metadata"
4. Add key: `user_id` with value: `<your-supabase-user-id>`
5. Save

3. Manually trigger webhook (optional):
   - In Stripe webhook deliveries, click "Send test webhook"
   - Or wait for next subscription event (payment, update, etc.)

### Step 5: Test Webhook Manually
1. Stripe Dashboard → Developers → Webhooks
2. Click your webhook → "Send test webhook"
3. Select event: `customer.subscription.updated` or `invoice.payment_succeeded`
4. Send test webhook
5. Check your Supabase logs or app logs to see if webhook received it
6. Check `profile_stats` table to see if membership_status updated

---

## How to Verify Code is Correct

### Check Checkout Session Creation
The checkout endpoint (`/api/stripe/create-checkout-session/route.ts`) now:
- ✅ Requires authentication (401 if not logged in)
- ✅ Passes `user_id` in `metadata.user_id`
- ✅ Passes `user_id` in `subscription_data.metadata.user_id`

### Check Webhook Handler
The webhook (`/api/stripe/webhook/route.ts`) now:
- ✅ Reads `session.metadata.user_id` for checkout.session.completed
- ✅ Reads `subscription.metadata.user_id` for invoice/subscription events
- ✅ Has defensive checks (won't crash on missing metadata)
- ✅ Updates `profile_stats.membership_status` correctly

---

## Common Issues & Solutions

### Issue: "No user_id found in metadata"
**Cause**: Subscription was created before we added metadata to checkout sessions
**Fix**: 
1. Add `user_id` to subscription metadata manually in Stripe
2. OR use promo code to upgrade manually

### Issue: Webhook returns 500 error
**Cause**: Missing environment variables or database errors
**Fix**: 
1. Check server logs for error message
2. Verify `STRIPE_WEBHOOK_SECRET` is set
3. Verify `SUPABASE_SERVICE_ROLE_KEY` is set

### Issue: Webhook received but membership_status not updated
**Cause**: User_id not found or update failed
**Fix**: 
1. Check webhook logs in Stripe for error details
2. Check server logs for "[WEBHOOK]" messages
3. Verify user_id exists in subscription metadata

---

## Testing Going Forward

For new signups after this fix:
1. User clicks upgrade button
2. Checkout session created with `user_id` in both metadata locations
3. User completes payment
4. Webhook receives `checkout.session.completed`
5. Webhook reads `session.metadata.user_id`
6. Webhook updates `profile_stats.membership_status = 'pro'`
7. ✅ User account upgraded automatically

---

## Quick Admin Commands

Check current membership status:
```sql
SELECT 
  u.email,
  ps.membership_status,
  ps.created_at
FROM auth.users u
LEFT JOIN public.profile_stats ps ON ps.user_id = u.id
WHERE u.email = 'moorelouis3@gmail.com';
```

Manually upgrade any user (replace user_id):
```sql
INSERT INTO public.profile_stats (user_id, membership_status)
VALUES ('<user-id-here>', 'pro')
ON CONFLICT (user_id) 
DO UPDATE SET membership_status = 'pro';
```

