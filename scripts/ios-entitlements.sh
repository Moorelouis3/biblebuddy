#!/usr/bin/env bash
# Give the generated iOS app the Sign in with Apple entitlement.
#
# Two entitlements now.
#
# Sign in with Apple: App Review Guideline 4.8 makes it mandatory because Bible
# Buddy offers Google.
#
# Family Controls: the Bible lock. Apple grants this one by application rather
# than by ticking a box - granted 2026-10-14 - and without it in the built app
# the Screen Time frameworks refuse everything at runtime. The Apple side is already in place - the App ID has the
# capability, the key exists, and Supabase has the bundle id under Client IDs -
# but none of that matters without this: iOS refuses to present the sign-in
# sheet if the running app does not carry the entitlement, and the error it
# gives says nothing about why.
#
# ios/ is regenerated on every build, so like the Info.plist keys and the app
# icon this has to be written each time rather than committed.
#
# Two parts, and both are needed:
#   1. the entitlements file itself
#   2. CODE_SIGN_ENTITLEMENTS pointing at it, in every build configuration
set -euo pipefail

PROJECT_DIR="ios/App"
ENTITLEMENTS="$PROJECT_DIR/App/App.entitlements"
PBXPROJ="$PROJECT_DIR/App.xcodeproj/project.pbxproj"

if [ ! -f "$PBXPROJ" ]; then
  echo "No Xcode project at $PBXPROJ - run 'npx cap add ios' first." >&2
  exit 1
fi

cat > "$ENTITLEMENTS" <<'PLIST'
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>com.apple.developer.applesignin</key>
	<array>
		<string>Default</string>
	</array>
	<key>com.apple.developer.family-controls</key>
	<true/>
</dict>
</plist>
PLIST
echo "Wrote $ENTITLEMENTS"

# Point every build configuration at it. The bundle identifier line appears
# once per configuration, which makes it a reliable anchor - and matching on it
# means we only ever touch the App target, never a dependency's settings.
if grep -q "CODE_SIGN_ENTITLEMENTS" "$PBXPROJ"; then
  echo "CODE_SIGN_ENTITLEMENTS already set; leaving the project alone."
else
  python3 - "$PBXPROJ" <<'PY'
import re
import sys

path = sys.argv[1]
with open(path, "r", encoding="utf-8") as handle:
    contents = handle.read()

# Insert immediately after each bundle identifier line, preserving indentation.
pattern = re.compile(r"^(\s*)PRODUCT_BUNDLE_IDENTIFIER = net\.mybiblebuddy\.app;$", re.M)
matches = pattern.findall(contents)
if not matches:
    sys.exit("No PRODUCT_BUNDLE_IDENTIFIER lines found - refusing to guess.")

contents = pattern.sub(
    lambda m: f"{m.group(1)}PRODUCT_BUNDLE_IDENTIFIER = net.mybiblebuddy.app;\n"
              f"{m.group(1)}CODE_SIGN_ENTITLEMENTS = App/App.entitlements;",
    contents,
)

with open(path, "w", encoding="utf-8") as handle:
    handle.write(contents)

print(f"Added CODE_SIGN_ENTITLEMENTS to {len(matches)} build configuration(s).")
PY
fi

echo "--- entitlements ---"
cat "$ENTITLEMENTS"
