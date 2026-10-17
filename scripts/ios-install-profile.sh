#!/usr/bin/env bash
# Install the real provisioning profile, replacing whatever Codemagic fetched.
#
# Why (2026-10-17): Apple's profile for net.mybiblebuddy.app is correct. Louis
# downloaded it from the portal and it contains everything:
#
#   com.apple.developer.family-controls   true
#   com.apple.security.application-groups  group.net.mybiblebuddy.app
#   com.apple.developer.applesignin        Default
#   aps-environment                        production
#
# The profile Codemagic puts on the build machine, under the same name,
# contains application-identifier and get-task-allow and nothing else. That is
# why eight builds died with
#
#   error: Provisioning profile "Bible Buddy App Store" doesn't include the
#   com.apple.developer.family-controls entitlement
#
# while the portal insisted the entitlement was Assigned. Both were telling the
# truth about different files. Regenerating, deleting and hand-creating the
# profile at Apple all changed nothing, because the stale copy is on
# Codemagic's side.
#
# So the known-good file travels with the repository and is installed over the
# top, after code signing is set up and before xcode-project use-profiles reads
# the directory.
#
# A provisioning profile carries no private key - it is a signed list of what
# an app is allowed to do, useless without the distribution certificate, which
# is not here and never will be. Replace the file when it expires (2027-10-13)
# by downloading it again from the portal.
set -euo pipefail

DEST_DIR="$HOME/Library/MobileDevice/Provisioning Profiles"

shopt -s nullglob
PROFILES=(ios-signing/*.mobileprovision)
if [ ${#PROFILES[@]} -eq 0 ]; then
  echo "No profiles in ios-signing/." >&2
  exit 1
fi

mkdir -p "$DEST_DIR"

# Clear the stale ones first. Leaving them means xcode-project use-profiles
# picks whichever it finds, and the whole point is to stop it finding those.
rm -f "$DEST_DIR"/*.mobileprovision || true

for SOURCE in "${PROFILES[@]}"; do
  UUID=$(security cms -D -i "$SOURCE" 2>/dev/null | plutil -extract UUID raw - 2>/dev/null || true)
  if [ -z "$UUID" ]; then
    echo "Could not read the UUID out of $SOURCE." >&2
    exit 1
  fi
  cp "$SOURCE" "$DEST_DIR/$UUID.mobileprovision"
  echo "Installed $(basename "$SOURCE") as $UUID.mobileprovision"
  security cms -D -i "$SOURCE" 2>/dev/null \
    | plutil -p - 2>/dev/null \
    | grep -iE "\"Name\"|com\.apple|application-identifier" || true
done
