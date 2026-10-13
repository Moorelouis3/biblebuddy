#!/usr/bin/env bash
# Boot Bible Buddy in an iPhone simulator and photograph what happens.
#
# Why this exists: the app has never run. CI proved it compiles, which is not
# the same thing and never was. Everything we are unsure about - the notch and
# safe areas, the status bar, whether the service worker survives inside
# WKWebView, whether the remote site even loads in the shell - is invisible
# until something actually launches it.
#
# A simulator is not a real iPhone. It will not tell us about push, haptics or
# the lock screen. It will tell us whether the app opens and what it looks
# like, which is most of what we do not know, and it costs nothing.
#
# Captures run on a timer rather than waiting for a selector, because the app
# loads mybiblebuddy.net remotely and there is nothing local to hook into.
# Three shots spread over the first half minute catch the launch screen, the
# first paint and the settled page.
set -euo pipefail

DEVICE="${SIMULATOR_DEVICE:-iPhone 16 Pro Max}"
BUNDLE_ID="net.mybiblebuddy.app"
OUT="${1:-build/simulator-screenshots}"
DERIVED="build/DerivedData"

mkdir -p "$OUT"

echo "==> Building for the simulator"
xcodebuild \
  -project ios/App/App.xcodeproj \
  -scheme App \
  -sdk iphonesimulator \
  -configuration Debug \
  -derivedDataPath "$DERIVED" \
  CODE_SIGNING_ALLOWED=NO \
  build

APP_PATH="$(find "$DERIVED/Build/Products" -name "App.app" -maxdepth 3 | head -1)"
if [ -z "$APP_PATH" ]; then
  echo "No App.app came out of the build - nothing to run." >&2
  exit 1
fi
echo "==> Built $APP_PATH"

echo "==> Booting $DEVICE"
# Already-booted is fine; anything else is not.
xcrun simctl boot "$DEVICE" 2>/dev/null || true
xcrun simctl bootstatus "$DEVICE" -b

echo "==> Installing and launching"
xcrun simctl install "$DEVICE" "$APP_PATH"
xcrun simctl launch "$DEVICE" "$BUNDLE_ID"

for seconds in 5 15 30; do
  sleep "$((seconds - ${last:-0}))"
  last=$seconds
  shot="$OUT/t${seconds}s.png"
  xcrun simctl io "$DEVICE" screenshot "$shot"
  echo "==> Captured $shot"
done

# The logs are where a white screen explains itself - a failed load, a blocked
# request, an App Transport Security refusal.
xcrun simctl spawn "$DEVICE" log show --last 2m --predicate "process == 'App'" \
  > "$OUT/app-log.txt" 2>&1 || true

echo "==> Shutting down"
xcrun simctl shutdown "$DEVICE" || true

ls -la "$OUT"
