#!/usr/bin/env bash
# Boot Bible Buddy in an Android emulator and photograph what happens.
#
# The twin of scripts/ios-simulator-run.sh, and it exists for the same reason:
# "it compiles" was never the same as "it runs", and on the iPhone side that
# step is the only reason anybody ever saw the app open. Android gets it from
# the first build rather than from build nine.
#
# What an emulator will tell us: whether the shell loads mybiblebuddy.net at
# all, whether the status bar and gesture inset are handled, whether the
# adaptive icon came out right, and what the first paint looks like. What it
# will not tell us: push, Google sign-in, or anything needing Play Services on
# a real device.
#
# Nothing here hard-codes a device or an image name. The iOS script learned
# that the hard way - build #9 died on `Invalid device` because the runner's
# Xcode shipped a different simulator set than expected - so this works from
# whatever the machine actually has installed, and only downloads an image
# when there is none.
set -euo pipefail

APP_ID="net.mybiblebuddy.app"
OUT="${1:-build/emulator-screenshots}"
AVD_NAME="biblebuddy-ci"
# The ABI has to match the machine, not the app. An x86_64 system image will
# not boot on Apple Silicon at all, and this build moved to a Mac mini M2 on
# 2026-10-25 because Codemagic's free plan has no Linux instances. Hard-coding
# x86_64 here is the same shape of mistake the iOS script made with device
# names, so it is read off the host instead.
case "$(uname -m)" in
  arm64|aarch64) ABI="arm64-v8a" ;;
  *)             ABI="x86_64" ;;
esac
echo "==> Host is $(uname -m), using $ABI system images"

# The emulator image, which is NOT the app's target. The app targets 36; an
# emulator a level or two back boots faster and more reliably, and minSdk is
# 24, so running there proves as much.
FALLBACK_IMAGE="system-images;android-35;google_apis;$ABI"

mkdir -p "$OUT"

SDK="${ANDROID_SDK_ROOT:-${ANDROID_HOME:-}}"
if [ -z "$SDK" ] || [ ! -d "$SDK" ]; then
  echo "No Android SDK (set ANDROID_SDK_ROOT or ANDROID_HOME)." >&2
  exit 1
fi
echo "==> Android SDK at $SDK"

find_tool() {
  # cmdline-tools/latest is the modern home; the others are where older images
  # put these, and Codemagic has changed which it ships before.
  for candidate in \
    "$SDK/cmdline-tools/latest/bin/$1" \
    "$SDK/cmdline-tools/bin/$1" \
    "$SDK/tools/bin/$1" \
    "$(command -v "$1" 2>/dev/null || true)"; do
    if [ -n "$candidate" ] && [ -x "$candidate" ]; then
      echo "$candidate"
      return 0
    fi
  done
  return 1
}

SDKMANAGER="$(find_tool sdkmanager || true)"
AVDMANAGER="$(find_tool avdmanager || true)"
EMULATOR="$SDK/emulator/emulator"
ADB="$SDK/platform-tools/adb"
[ -x "$EMULATOR" ] || EMULATOR="$(command -v emulator || true)"
[ -x "$ADB" ] || ADB="$(command -v adb || true)"

if [ -z "$EMULATOR" ] || [ -z "$ADB" ]; then
  echo "No emulator or adb on this machine - cannot run the app." >&2
  exit 1
fi

echo "==> Building the debug APK"
( cd android && ./gradlew --no-daemon assembleDebug )

APK="$(find android/app/build/outputs/apk/debug -name "*.apk" | head -1)"
if [ -z "$APK" ]; then
  echo "No APK came out of the build - nothing to run." >&2
  exit 1
fi
echo "==> Built $APK"

# An installed image, newest first, before downloading anything.
IMAGE=""
if [ -n "$SDKMANAGER" ]; then
  IMAGE="$("$SDKMANAGER" --list_installed 2>/dev/null \
    | grep -oE "system-images;android-[0-9]+;google_apis[a-z_]*;$ABI" \
    | sort -t';' -k2 -V \
    | tail -1 || true)"
fi

if [ -z "$IMAGE" ]; then
  if [ -z "$SDKMANAGER" ]; then
    echo "No system image installed and no sdkmanager to fetch one." >&2
    exit 1
  fi
  echo "==> No system image installed; fetching $FALLBACK_IMAGE"
  yes | "$SDKMANAGER" --licenses >/dev/null 2>&1 || true
  "$SDKMANAGER" "$FALLBACK_IMAGE"
  IMAGE="$FALLBACK_IMAGE"
fi
echo "==> Using image $IMAGE"

if [ -n "$AVDMANAGER" ]; then
  echo "no" | "$AVDMANAGER" create avd \
    --force \
    --name "$AVD_NAME" \
    --package "$IMAGE" \
    --device "pixel_6" >/dev/null 2>&1 \
  || echo "no" | "$AVDMANAGER" create avd --force --name "$AVD_NAME" --package "$IMAGE"
fi

echo "==> Booting the emulator"
# swiftshader_indirect because CI machines have no GPU, and -no-snapshot so a
# half-written snapshot from an earlier build cannot poison this one.
"$EMULATOR" -avd "$AVD_NAME" \
  -no-window -no-audio -no-boot-anim -no-snapshot \
  -gpu swiftshader_indirect \
  -accel auto \
  > "$OUT/emulator.log" 2>&1 &
EMULATOR_PID=$!

cleanup() {
  echo "==> Shutting down"
  "$ADB" emu kill >/dev/null 2>&1 || true
  kill "$EMULATOR_PID" >/dev/null 2>&1 || true
}
trap cleanup EXIT

"$ADB" wait-for-device

echo "==> Waiting for boot to complete"
for _ in $(seq 1 120); do
  if [ "$("$ADB" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" = "1" ]; then
    break
  fi
  sleep 5
done
if [ "$("$ADB" shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" != "1" ]; then
  echo "The emulator never finished booting. See $OUT/emulator.log" >&2
  tail -40 "$OUT/emulator.log" >&2 || true
  exit 1
fi
"$ADB" shell wm dismiss-keyguard >/dev/null 2>&1 || true

echo "==> Installing and launching"
"$ADB" install -r -t "$APK"
"$ADB" shell monkey -p "$APP_ID" -c android.intent.category.LAUNCHER 1 >/dev/null

# On a timer rather than waiting for anything on the page: the app loads
# mybiblebuddy.net remotely, so there is no local signal to hook into. Three
# shots across the first half minute catch the splash, the first paint and the
# settled page - the same three the iPhone script takes.
last=0
for seconds in 5 15 30; do
  sleep "$((seconds - last))"
  last=$seconds
  "$ADB" exec-out screencap -p > "$OUT/t${seconds}s.png"
  echo "==> Captured t${seconds}s.png"
done

# Where a white screen explains itself: a failed load, a blocked request, a
# cleartext or CORS refusal.
"$ADB" logcat -d > "$OUT/logcat.txt" 2>&1 || true
"$ADB" shell dumpsys package "$APP_ID" > "$OUT/package.txt" 2>&1 || true

ls -la "$OUT"
