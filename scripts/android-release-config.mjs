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
 * It also strips the advertising-ID permission - see stripAdIdPermission.
 *
 *   node scripts/android-release-config.mjs
 */

import fs from "node:fs";

const GRADLE = "android/app/build.gradle";
const MANIFEST = "android/app/src/main/AndroidManifest.xml";

/**
 * Remove com.google.android.gms.permission.AD_ID from the merged manifest.
 *
 * Bible Buddy shows no ads and never reads the advertising ID, but
 * @capacitor/push-notifications pulls in Firebase Messaging, which pulls in
 * play-services-ads-identifier, which declares AD_ID in its own library
 * manifest. The merger folds it into ours without anyone asking.
 *
 * Play notices, and it blocked the first submission over it. The Advertising
 * ID page says in as many words: "Your manifest file includes the
 * com.google.android.gms.permission.AD_ID permission. This means your app
 * declares the use of advertising ID. Answer 'yes' or remove this permission
 * from your manifest." Answering yes would be false, and would put "may use
 * advertising ID" on the listing of an app whose own description says there
 * are no ads. So remove it.
 *
 * tools:node="remove" is the merger's own opt-out. It needs the tools
 * namespace on <manifest>, which the generated file does not carry.
 */
function stripAdIdPermission() {
  if (!fs.existsSync(MANIFEST)) {
    console.error(`No ${MANIFEST} - run 'npx cap add android' first.`);
    process.exit(1);
  }

  let manifest = fs.readFileSync(MANIFEST, "utf8");

  if (manifest.includes("com.google.android.gms.permission.AD_ID")) {
    console.log("AD_ID removal already present; leaving it alone.");
    return;
  }

  if (!manifest.includes("xmlns:tools=")) {
    const before = manifest;
    manifest = manifest.replace(
      "<manifest ",
      '<manifest xmlns:tools="http://schemas.android.com/tools" ',
    );
    if (manifest === before) {
      console.error("Could not add the tools namespace to the manifest.");
      process.exit(1);
    }
  }

  if (!manifest.includes("</manifest>")) {
    console.error("Could not find </manifest> to insert the AD_ID removal before.");
    process.exit(1);
  }
  const removal = [
    '    <uses-permission android:name="com.google.android.gms.permission.AD_ID" tools:node="remove" />',
    "</manifest>",
  ].join("\n");
  manifest = manifest.replace("</manifest>", removal);

  fs.writeFileSync(MANIFEST, manifest);
  console.log("AD_ID permission marked for removal from the merged manifest");
}

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

stripAdIdPermission();

console.log(`versionCode ${versionCode}, versionName ${versionName}`);
console.log(`release signing: ${signingWanted ? "wired to the Codemagic keystore" : "not configured"}`);
