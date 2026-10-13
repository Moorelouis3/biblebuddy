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
# Do NOT hard-code a device name here. The first version asked for
# "iPhone 16 Pro Max" and build #9 died on `Invalid device` - the runner's
# Xcode ships whatever simulators it ships, and that set changes without
# warning. Everything below works from whatever is actually installed.
set -euo pipefail

BUNDLE_ID="net.mybiblebuddy.app"
OUT="${1:-build/simulator-screenshots}"
DERIVED="build/DerivedData"

mkdir -p "$OUT"

echo "==> Simulators this machine actually has"
xcrun simctl list devices available | tee "$OUT/available-devices.txt"

# Pick a device UDID, preferring the biggest screen because that is the size
# the App Store wants screenshots in. Falls back down the list rather than
# insisting on a model that may not exist.
udid_for() {
  xcrun simctl list devices available \
    | grep -E "^ *$1 \(" \
    | tail -1 \
    | sed -E 's/.*\(([0-9A-Fa-f-]{36})\).*/\1/'
}

UDID="${SIMULATOR_UDID:-}"
if [ -z "$UDID" ]; then
  for pattern in 'iPhone .*Pro Max' 'iPhone .*Pro' 'iPhone .*Plus' 'iPhone.*'; do
    UDID="$(udid_for "$pattern" || true)"
    [ -n "$UDID" ] && break
  done
fi

# Nothing installed at all - make one from whatever runtime is present.
if [ -z "$UDID" ]; then
  echo "==> No iPhone simulator installed; creating one"
  RUNTIME="$(xcrun simctl list runtimes available | grep -oE 'com\.apple\.CoreSimulator\.SimRuntime\.iOS[^ ]*' | tail -1)"
  DEVTYPE="$(xcrun simctl list devicetypes | grep -oE 'com\.apple\.CoreSimulator\.SimDeviceType\.iPhone[^)]*' | tail -1)"
  if [ -z "$RUNTIME" ] || [ -z "$DEVTYPE" ]; then
    echo "No iOS runtime or iPhone device type available - cannot run anything." >&2
    exit 1
  fi
  UDID="$(xcrun simctl create "Bible Buddy Test Phone" "$DEVTYPE" "$RUNTIME")"
fi

echo "==> Using simulator $UDID"
xcrun simctl list devices | grep "$UDID" || true

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

echo "==> Booting"
xcrun simctl boot "$UDID" 2>/dev/null || true
xcrun simctl bootstatus "$UDID" -b

echo "==> Installing and launching"
xcrun simctl install "$UDID" "$APP_PATH"
xcrun simctl launch "$UDID" "$BUNDLE_ID"

# Captures run on a timer rather than waiting for a selector, because the app
# loads mybiblebuddy.net remotely and there is nothing local to hook into.
# Three shots across the first half minute catch the launch screen, the first
# paint and the settled page.
last=0
for seconds in 5 15 30; do
  sleep "$((seconds - last))"
  last=$seconds
  xcrun simctl io "$UDID" screenshot "$OUT/t${seconds}s.png"
  echo "==> Captured t${seconds}s.png"
done

# The logs are where a white screen explains itself - a failed load, a blocked
# request, an App Transport Security refusal.
xcrun simctl spawn "$UDID" log show --last 2m --predicate "process == 'App'" \
  > "$OUT/app-log.txt" 2>&1 || true

echo "==> Shutting down"
xcrun simctl shutdown "$UDID" || true

ls -la "$OUT"
