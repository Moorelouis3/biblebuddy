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
const MAIN_ACTIVITY = "android/app/src/main/java/net/mybiblebuddy/app/MainActivity.java";

/**
 * Make the login survive the app being closed.
 *
 * Jessica, through Louis, 2026-11-04: she logs in, and the app sends her
 * back to the welcome screen. Her password was never the problem - auth
 * recorded the sign-in and she reached the dashboard at 10:35 - she was
 * being logged out again, and signed in twice inside fifteen minutes.
 *
 * The session lives in a cookie (lib/supabaseClient uses @supabase/ssr,
 * which stores it there rather than in localStorage). Android's WebView
 * keeps cookies written by JavaScript in memory and only syncs them to disk
 * on its own schedule, so when Android kills the app process - which it does
 * eagerly - anything unsynced is simply gone. The cookie already carries a
 * year-long max-age, so this is not an expiry problem; it never reached disk.
 * CookieManager.flush() is the documented way to force that sync, and
 * ionic-team/capacitor#6216 is this exact symptom.
 *
 * iOS is unaffected, which is why only Android testers hit it: WKWebView
 * owns its cookie store and persists it without being asked.
 *
 * onPause rather than onStop or onDestroy: onPause is the last callback
 * Android guarantees before a process can be killed.
 */
function flushCookiesOnPause() {
  if (!fs.existsSync(MAIN_ACTIVITY)) {
    console.error(`No ${MAIN_ACTIVITY} - run 'npx cap add android' first.`);
    process.exit(1);
  }

  let java = fs.readFileSync(MAIN_ACTIVITY, "utf8");

  if (java.includes("CookieManager")) {
    console.log("Cookie flush already present; leaving it alone.");
    return;
  }

  if (!java.includes("import com.getcapacitor.BridgeActivity;")) {
    console.error("MainActivity does not look like the generated one - not patching it.");
    process.exit(1);
  }
  java = java.replace(
    "import com.getcapacitor.BridgeActivity;",
    "import android.webkit.CookieManager;\nimport com.getcapacitor.BridgeActivity;",
  );

  // The generated class body is empty: `public class MainActivity extends BridgeActivity {}`.
  const empty = "public class MainActivity extends BridgeActivity {}";
  const withOverride = [
    "public class MainActivity extends BridgeActivity {",
    "    @Override",
    "    public void onPause() {",
    "        super.onPause();",
    "        // Without this the login is lost whenever Android kills the app.",
    "        CookieManager.getInstance().flush();",
    "    }",
    "}",
  ].join("\n");

  if (!java.includes(empty)) {
    console.error("MainActivity already has a body - not patching it blindly.");
    process.exit(1);
  }
  java = java.replace(empty, withOverride);

  fs.writeFileSync(MAIN_ACTIVITY, java);
  console.log("MainActivity will flush cookies on pause, so the login survives a restart");
}

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
flushCookiesOnPause();

console.log(`versionCode ${versionCode}, versionName ${versionName}`);
console.log(`release signing: ${signingWanted ? "wired to the Codemagic keystore" : "not configured"}`);
