#!/usr/bin/env bash
# Put Bible Buddy's icon into the generated iOS project.
#
# Without this the app ships with Capacitor's placeholder - a grey square -
# on the home screen, in TestFlight, and in the App Store listing. Nothing in
# `cap add ios` knows about native/appstore/app-icon-1024.png, so it has to be
# copied in on every build, same as the Info.plist keys.
#
# No image processing: the source is already 1024x1024 PNG with no alpha
# channel, which is exactly what Apple requires and what Xcode's single-size
# app icon asset wants. An icon WITH an alpha channel is rejected at upload,
# so if the source is ever replaced, keep it flat.
set -euo pipefail

SRC="${1:-native/appstore/app-icon-1024.png}"
SET="ios/App/App/Assets.xcassets/AppIcon.appiconset"

if [ ! -f "$SRC" ]; then
  echo "No icon at $SRC" >&2
  exit 1
fi
if [ ! -d "$SET" ]; then
  echo "No $SET - run 'npx cap add ios' first." >&2
  exit 1
fi

# Clear whatever the template left behind so a stale placeholder cannot
# survive as a leftover filename referenced by Contents.json.
rm -f "$SET"/*.png

cp "$SRC" "$SET/AppIcon-512@2x.png"

cat > "$SET/Contents.json" <<'JSON'
{
  "images" : [
    {
      "filename" : "AppIcon-512@2x.png",
      "idiom" : "universal",
      "platform" : "ios",
      "size" : "1024x1024"
    }
  ],
  "info" : {
    "author" : "xcode",
    "version" : 1
  }
}
JSON

echo "Installed app icon:"
ls -la "$SET"
