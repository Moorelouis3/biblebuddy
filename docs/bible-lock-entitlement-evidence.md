# Bible Lock: why it cannot ship yet

Written 2026-10-17 after eight failed builds. Everything here was read off
Apple's own files, not inferred.

## What is true

**Apple has granted the entitlement.** The App ID page for
`net.mybiblebuddy.app` shows:

> Family Controls (Distribution) · Platform Support iOS, visionOS · Provisioning
> Support Development, Ad hoc, App Store Connect · Entitlement Keys
> `com.apple.developer.family-controls` · **Assigned**

Both Family Controls capabilities are ticked on the identifier — (Distribution)
was already on, and (Development) was added on 2026-10-17 while chasing this.
App Groups is ticked too, with one group configured.

**And the provisioning profile does not contain it.** The build decodes every
`.mobileprovision` on the machine before archiving. Every run, including after
the profile was deleted outright so Apple generated a brand new one, prints:

```
profile: .../provisioning_profile_888__amh.mobileprovision
    "application-identifier" => "Q8TDSF2RP2.net.mybiblebuddy.app"
    "get-task-allow" => false
  "Name" => "Bible Buddy App Store"
```

No `com.apple.developer.family-controls`. No
`com.apple.security.application-groups` either, although App Groups has been
enabled on the identifier for weeks. So this is not one missing entitlement —
the profile Apple issues for this App ID is missing every capability that was
added after it was first created.

Which is why the archive says, in thirteen seconds, every time:

```
error: Provisioning profile "Bible Buddy App Store" doesn't include the
Family Controls (Development) capability
error: ...doesn't include the com.apple.developer.family-controls entitlement
```

An app that asks for an entitlement its profile lacks cannot be signed at all,
so this one line blocks the whole build.

## What was already tried

1. Regenerated the profile in the portal (it was **Invalid** — genuinely broken,
   and worth fixing on its own). Still missing.
2. Enabled Family Controls (Development) alongside (Distribution) on the App ID,
   regenerated again. Still missing.
3. Deleted the profile entirely so Codemagic's App Store Connect integration
   created a fresh one. Still missing.

## What to do next

This is an Apple-side question now, and it wants a human with the account:

- In **Xcode on a Mac**, sign in with the account and let it manage signing for
  `net.mybiblebuddy.app`. Xcode's own profile request sometimes succeeds where
  the API's does not, and the profile it produces can then be used by name.
- Failing that, **Apple Developer Support**: the entitlement reads Assigned on
  the App ID and does not appear in generated profiles. Quote the two errors
  above and the decoded profile. That is a specific, reproducible complaint.

## Until then

`BIBLE_LOCK_ENTITLEMENT` in codemagic.yaml is `off`, so the app does not ask for
the entitlement and builds sign normally. Set it to `on` the day a profile
arrives carrying `com.apple.developer.family-controls`, and Bible Lock works —
the plugin, the UI and the page are all finished and waiting.

The dashboard banner and the page only appear where the lock can actually run,
so nobody on the website or on Android is shown a feature that does nothing.
