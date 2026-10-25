/**
 * Make the generated Android project signable and give it a version.
 *
 * `npx cap add android` writes an app/build.gradle with `versionCode 1`,
 * `versionName "1.0"` and no release signing config at all. Both are problems
 * the moment a build is meant for Google Play rather than an emulator:
 *
 *   - Play rejects an upload whose versionCode it has seen before, and the
 *     error arrives AFTER the upload rather than before it, same as Apple's.
 *     Left at 1, the second upload ever would fail.
 *   - An unsigned release bundle cannot be uploaded at all.
 *
 * android/ is regenerated on every build, so neither can be committed - this
 * runs after `npx cap add android`, the same way the iOS build patches its
 * generated project in scripts/ios-*.sh.
 *
 * Signing values come from Codemagic's own keystore store, which exports
 * CM_KEYSTORE_PATH, CM_KEYSTORE_PASSWORD, CM_KEY_ALIAS and CM_KEY_PASSWORD
 * when the workflow declares `android_signing`. Nothing secret is written
 * here: the gradle file reads the environment at build time. Without those
 * variables the script leaves signing alone and only sets the version, so a
 * debug/emulator build still works.
 *
 * The version string follows the iPhone convention already in use (Louis,
 * 2026-10-17: "so I know it's version 1 build 9") - 1.09 is version 1, build
 * 9, padded to two digits so the numbers keep rising past 1.99 into 1.100.
 *
 *   node scripts/android-release-config.mjs
 */

import fs from "node:fs";

const GRADLE = "android/app/build.gradle";

const major = process.env.APP_MAJOR_VERSION || "1";
// Codemagic's own counter, which only ever goes up.
const build = Number(process.env.BUILD_NUMBER || process.env.PROJECT_BUILD_NUMBER || 1);
const versionCode = build;
const versionName = `${major}.${String(build).padStart(2, "0")}`;

if (!fs.existsSync(GRADLE)) {
  console.error(`No ${GRADLE} - run 'npx cap add android' first.`);
  process.exit(1);
}

let gradle = fs.readFileSync(GRADLE, "utf8");

const before = gradle;
gradle = gradle.replace(/versionCode\s+\d+/, `versionCode ${versionCode}`);
gradle = gradle.replace(/versionName\s+"[^"]*"/, `versionName "${versionName}"`);
if (gradle === before) {
  console.error("Could not find versionCode/versionName to replace - has the template changed?");
  process.exit(1);
}

const signingWanted = Boolean(process.env.CM_KEYSTORE_PATH);

if (signingWanted) {
  if (/signingConfigs/.test(gradle)) {
    console.log("A signingConfigs block is already present; leaving it alone.");
  } else {
    // Inserted directly before buildTypes, which is where Gradle expects it.
    const signing = `    signingConfigs {
        release {
            storeFile file(System.getenv("CM_KEYSTORE_PATH"))
            storePassword System.getenv("CM_KEYSTORE_PASSWORD")
            keyAlias System.getenv("CM_KEY_ALIAS")
            keyPassword System.getenv("CM_KEY_PASSWORD")
        }
    }
    buildTypes {`;

    if (!gradle.includes("    buildTypes {")) {
      console.error("Could not find the buildTypes block to sign.");
      process.exit(1);
    }
    gradle = gradle.replace("    buildTypes {", signing);

    // And point the release build type at it.
    gradle = gradle.replace(
      /(release\s*\{\s*\n)(\s*)minifyEnabled/,
      `$1$2signingConfig signingConfigs.release\n$2minifyEnabled`,
    );
    if (!/signingConfig signingConfigs\.release/.test(gradle)) {
      console.error("Added signingConfigs but could not attach it to the release build type.");
      process.exit(1);
    }
  }
} else {
  console.log("No CM_KEYSTORE_PATH in the environment - version only, build will not be signed.");
}

fs.writeFileSync(GRADLE, gradle);

console.log(`versionCode ${versionCode}, versionName ${versionName}`);
console.log(`release signing: ${signingWanted ? "wired to the Codemagic keystore" : "not configured"}`);
