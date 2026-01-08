# How to Add user_id Metadata to Your Stripe Subscription

## Step 1: Get Your Supabase User ID

1. Go to your **Supabase Dashboard**
2. Navigate to **Authentication** → **Users**
3. Find your email: `moorelouis3@gmail.com`
4. Click on your user
5. **Copy the User ID** (it's a UUID like `123e4567-e89b-12d3-a456-426614174000`)

**OR** run this SQL in Supabase SQL Editor:
```sql
SELECT id, email FROM auth.users WHERE email = 'moorelouis3@gmail.com';
```

---

## Step 2: Add Metadata to Your Stripe Subscription

1. Go to **Stripe Dashboard** → **Customers**
2. Search for or find your customer (email: `moorelouis3@gmail.com`)
3. Click on your customer
4. Go to the **Subscriptions** tab
5. Click on your active subscription
6. Scroll down to the **Metadata** section
7. Click the **pencil/edit icon** (or "Add metadata" button)
8. Click **"Add item"** or the **"+"** button
9. Add:
   - **Key**: `user_id`
   - **Value**: `<paste-your-supabase-user-id-here>`
10. Click **"Save"** or **"Update metadata"**

---

## Step 3: Verify Metadata Was Added

After saving, you should see:
```
Metadata
user_id: <your-user-id>
```

---

## Step 4: Trigger Webhook (Optional)

Now that metadata is added, you can either:

### Option A: Wait for Next Event
- The next subscription event (payment, update, etc.) will trigger the webhook
- Your account will be upgraded automatically

### Option B: Manually Trigger Webhook (Faster)
1. Go to **Stripe Dashboard** → **Developers** → **Webhooks**
2. Click on your webhook endpoint
3. Click **"Send test webhook"** button
4. Select event type: `customer.subscription.updated`
5. Click **"Send test webhook"**
6. Check your Supabase `profile_stats` table to verify `membership_status` changed to `'pro'`

---

## Step 5: Verify Upgrade Worked

Run this SQL in Supabase SQL Editor:
```sql
SELECT 
  u.email,
  ps.membership_status,
  ps.updated_at
FROM auth.users u
LEFT JOIN public.profile_stats ps ON ps.user_id = u.id
WHERE u.email = 'moorelouis3@gmail.com';
```

You should see `membership_status = 'pro'`

---

## Alternative: Quick Fix (No Stripe Needed)

If you just want to upgrade immediately without dealing with Stripe metadata:

1. Go to **Bible Buddy** → **Settings**
2. Find **"Unlock Pro with a Code"** section
3. Enter code: `BIBLEBUDDY100OFF`
4. Click **"Apply Code"**
5. ✅ Done!

This will upgrade your account instantly without needing to fix Stripe metadata.

