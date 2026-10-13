# Family Controls entitlement — the application to Apple

For the Bible lock: the reader picks apps, and Bible Buddy shields them until
that day's reading is done.

Apple gates this behind an entitlement that has to be **granted before the app
can be submitted** — their words: *"Before submitting your app to the App
Store, you must request permission to use the entitlement."* It is not
instant, so this goes in early and runs in the background while everything
else carries on.

**Form:** https://developer.apple.com/contact/request/family-controls-distribution

Louis submits it — it is a request to Apple in his name. The answers are
below, ready to paste.

---

## The facts it asks for

| Field | Answer |
|---|---|
| App name | Bible Buddy: Study & Devotions |
| Bundle ID | `net.mybiblebuddy.app` |
| Apple ID | `6822155944` |
| Team ID | `Q8TDSF2RP2` |
| Entitlement | Family Controls (Distribution) |
| Who it is for | **Individual** — the person applying it to their own device, not a parent managing a child |

---

## What the app does with it

```
Bible Buddy is a free Bible reading app. We are adding a feature our readers
have asked for: a way to hold themselves to their daily reading before the
apps that usually win their attention get it.

The person chooses which apps to shield, in the system FamilyActivityPicker,
so we never learn which apps they selected. We request authorization for
.individual, so this only ever applies to the device of the person who set it
up — we are not managing anyone else's device, and there is no parent or
guardian relationship involved.

Those apps stay shielded until that day's Bible reading is complete. The
moment it is, the shield is cleared. The person can turn the whole feature
off at any time from inside Bible Buddy, and revoking authorization removes
every shield immediately.

We use ManagedSettingsStore for the shield and DeviceActivity to reset it at
the start of each day. We do not read, store or transmit any Screen Time
data, and nothing about the person's app usage leaves their device.
```

---

## What to expect after approval

The entitlement is added to the App ID, and the capability goes into Xcode.
Then it needs building — this is real Swift, the first part of Bible Buddy
that is not the website in a shell. iOS only; Android blocks apps through a
completely different mechanism and is a separate piece of work.

Notes for whoever builds it:

- `AuthorizationCenter.shared.requestAuthorization(for: .individual)` — the
  system shows a biometric prompt. Handle a refusal gracefully; plenty of
  people will say no, and the rest of the app must work exactly as before.
- Selections come back as opaque tokens. They are deliberately unreadable, so
  **do not** design anything that needs to know which app was picked.
- Clear the shield from the same place that marks the day's reading complete,
  so the two can never disagree.
- Make turning it off obvious and instant. A Bible app that traps someone out
  of their phone is a one-star review and a support thread.
