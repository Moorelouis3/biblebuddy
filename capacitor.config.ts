import type { CapacitorConfig } from "@capacitor/cli";

/**
 * The iOS/Android shell (Louis, 2026-10-11).
 *
 * Bible Buddy is a server-rendered Next app, so the store builds load the live
 * site rather than bundling it. See docs/APP_STORE_READINESS_AUDIT.md - the
 * answer to Apple's "repackaged website" rule is not to avoid remote loading,
 * it is to put enough real native capability around it: offline reading,
 * background audio, share, haptics, notifications.
 *
 * @capacitor/ios is a runtime dependency, not a dev one: `npx cap add ios`
 * reads it out of node_modules to lay down the Xcode project, and CI installs
 * with --omit=dev often enough that this is worth stating. The first build
 * failed on exactly this - core, cli and the plugins were installed, the
 * platform itself was not.
 *
 * appendUserAgent is the important line. lib/nativeApp.ts has been watching
 * for the string "BibleBuddyApp" since September, and every native switch
 * already shipped - hiding install banners, web push, the service worker and
 * ads - keys off it. Setting it here is what turns all of that on, and it is
 * also how the SERVER can tell, which window.Capacitor alone cannot do.
 */

const NATIVE_APP_UA_MARKER = "BibleBuddyApp";

const config: CapacitorConfig = {
  appId: "net.mybiblebuddy.app",
  appName: "Bible Buddy",

  // NOT public/ - that is 1GB of audio and images and would all be copied
  // into the app bundle. This holds only the offline page below.
  webDir: "native/www",

  // Must match lib/nativeApp.ts:9 exactly.
  appendUserAgent: NATIVE_APP_UA_MARKER,

  server: {
    url: "https://www.mybiblebuddy.net",
    // Shown when the site cannot be reached, instead of the webview's own
    // "cannot connect to server" page with a URL in it.
    errorPath: "offline.html",
  },

  ios: {
    // Let the page handle the safe area itself; the site already does.
    contentInset: "never",
    // The app opens outside links in the in-app browser (NativeExternalLinks),
    // so navigation is not limited to declared app-bound domains.
    limitsNavigationsToAppBoundDomains: false,
  },
};

export default config;
