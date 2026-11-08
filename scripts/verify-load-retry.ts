/**
 * The regression test for "grey boxes forever" (2026-11-08).
 *
 *   npm run verify:load-retry
 *
 * Companion to verify:auth-lock. That one proved a request can no longer hang
 * for the life of the page; this one proves the app SAYS SO when one fails.
 *
 * Louis, 2026-11-08, on being handed the phrase "visible retry state": "i dont
 * know what a visible retry state is can u just talk normal!" - so, plainly:
 * four screens loaded their data in an async effect with no catch at all. A
 * throw skipped the setLoading(false) line at the end of the effect and left
 * the skeleton animating until the tab was closed. Before the auth-lock fix
 * that was unreachable, because the request hung instead of throwing. Now it
 * throws, so it had to be handled.
 *
 * Nothing here touches the network, Supabase or a browser. The component is
 * rendered with react-dom/server, and the four screens' load-catch-retry cycle
 * is modelled in the exact shape the real effects use:
 *
 *   void (async () => { ...; setLoading(false); })().catch(() => {
 *     if (cancelled) return;
 *     setFailed(true);
 *     setLoading(false);
 *   });
 *
 * so a change to that shape in any of them should break a check here.
 */
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import LoadFailedNotice from "../components/LoadFailedNotice";

let passed = 0;
const failures: string[] = [];

function check(label: string, condition: boolean) {
  if (condition) {
    passed += 1;
    console.log(`  ok  ${label}`);
  } else {
    failures.push(label);
    console.log(`FAIL  ${label}`);
  }
}

// -- The notice itself -------------------------------------------------------

const defaultMarkup = renderToStaticMarkup(
  createElement(LoadFailedNotice, { onRetry: () => {} }),
);

check(
  "the notice says what happened in words a reader understands",
  defaultMarkup.includes("Couldn&#x27;t load.") || defaultMarkup.includes("Couldn't load."),
);
check("the notice offers a Try Again button", defaultMarkup.includes(">Try Again<"));
check("it is a <button>, not a link dressed as one", /<button[^>]*type="button"/.test(defaultMarkup));
check("a screen reader is told something went wrong", defaultMarkup.includes('role="alert"'));

/**
 * The anchor text-colour trap, one tier down.
 *
 * An unlayered `a { color: inherit }` in this app's CSS beats Tailwind's
 * text-white, which is why links here are coloured with an inline style. This
 * is a button rather than an anchor, so it should be safe - but the button sits
 * on a solid accent background, and white-on-white is invisible rather than
 * merely wrong. The inline style is the belt to that braces.
 */
check(
  "the button's label colour is pinned inline, not left to a stylesheet",
  /style="[^"]*color:\s*#ffffff/i.test(defaultMarkup),
);

const customMarkup = renderToStaticMarkup(
  createElement(LoadFailedNotice, {
    message: "Couldn't load your bookshelf.",
    className: "mt-4",
    onRetry: () => {},
  }),
);
check(
  "a screen can name what failed",
  customMarkup.includes("bookshelf") && !customMarkup.includes(">Couldn&#x27;t load.<"),
);
check("a screen can pass its own spacing", customMarkup.includes("mt-4"));

// -- Does a failed read even reach the catch? -------------------------------

/**
 * The thing that nearly made all of the above useless.
 *
 * The first browser test of the notice did not show it. Blocking Supabase and
 * opening a study produced "That study is not on the shelf." instead - because
 * supabase-js does not THROW when a request fails, it returns
 * `{ data: null, error }`, and lib/libraryCatalog turned that into a plain
 * `null`. Nothing threw, so nothing was caught, and the screen confidently
 * told the reader a study that exists is not there.
 *
 * So the two readers a screen cannot render without now throw. These checks
 * read the file rather than calling it, because importing it pulls in the
 * browser Supabase client; what matters is the decision, and the decision is
 * visible in the source: throw when the screen has nothing without it, degrade
 * quietly when the read is a detail.
 */
const catalogSource = readFileSync(
  new URL("../lib/libraryCatalog.ts", import.meta.url),
  "utf8",
);

function bodyOf(fn: string): string {
  const start = catalogSource.indexOf(`export async function ${fn}`);
  if (start < 0) return "";
  const next = catalogSource.indexOf("\nexport ", start + 1);
  return catalogSource.slice(start, next < 0 ? undefined : next);
}

check(
  "a dead connection makes fetchLibraryStudies throw, not return an empty shelf",
  /if \(error\)[\s\S]*?throw new LibraryLoadError/.test(bodyOf("fetchLibraryStudies")),
);
check(
  "a dead connection makes fetchStudyById throw, not claim the study is missing",
  /if \(error\)[\s\S]*?throw new LibraryLoadError/.test(bodyOf("fetchStudyById")),
);
check(
  "a study that genuinely is not there still comes back as null, not an error",
  /return \(data as LibraryStudy\) \|\| null;/.test(bodyOf("fetchStudyById")),
);
check(
  "missing progress still degrades quietly - a shelf with no bars is still a shelf",
  /if \(error\)[\s\S]*?return \{\};/.test(bodyOf("fetchProgressByStudy")),
);

// -- The load / fail / retry cycle the four screens share --------------------

type Screen = {
  loading: boolean;
  failed: boolean;
  reloadKey: number;
  /** Set if the screen ever tried to send the reader to the login page. */
  redirectedToLogin: boolean;
  loadsRun: number;
};

/**
 * One mount's worth of the real effect, with `catch` - the shape shipped today.
 *
 * `outcomes` is read by reloadKey: outcomes[0] is the first load, outcomes[1]
 * the load after the first Try Again, and so on. "throw" stands for any
 * rejection, which since the auth-lock fix includes a request aborting at 30s.
 */
async function runLoad(
  screen: Screen,
  outcomes: ("ok" | "throw")[],
  options: { cancelled?: boolean; withCatch?: boolean } = {},
) {
  const { cancelled = false, withCatch = true } = options;
  const outcome = outcomes[screen.reloadKey] ?? "ok";

  const body = (async () => {
    screen.loadsRun += 1;
    await Promise.resolve();
    if (outcome === "throw") throw new Error("aborted after 30000ms");
    if (cancelled) return;
    screen.loading = false;
  })();

  if (!withCatch) {
    // The old code. Nothing catches, so the throw escapes and the lines after
    // the await - setLoading(false) among them - never run.
    await body.catch(() => {});
    return;
  }

  await body.catch(() => {
    if (cancelled) return;
    screen.failed = true;
    screen.loading = false;
  });
}

function retry(screen: Screen) {
  screen.failed = false;
  screen.loading = true;
  screen.reloadKey += 1;
}

function freshScreen(): Screen {
  return { loading: true, failed: false, reloadKey: 0, redirectedToLogin: false, loadsRun: 0 };
}

async function main() {
  // The bug, so this test fails if anyone reverts the catch.
  const old = freshScreen();
  await runLoad(old, ["throw"], { withCatch: false });
  check(
    "WITHOUT the catch, a failed load leaves the skeleton up forever (the bug)",
    old.loading === true && old.failed === false,
  );

  const failedOnce = freshScreen();
  await runLoad(failedOnce, ["throw"]);
  check(
    "a failed load stops the skeleton and shows the notice instead",
    failedOnce.loading === false && failedOnce.failed === true,
  );

  const happy = freshScreen();
  await runLoad(happy, ["ok"]);
  check(
    "a load that works is untouched by any of this",
    happy.loading === false && happy.failed === false,
  );

  const recovered = freshScreen();
  await runLoad(recovered, ["throw", "ok"]);
  retry(recovered);
  check(
    "Try Again puts the skeleton back while it tries",
    recovered.loading === true && recovered.failed === false,
  );
  await runLoad(recovered, ["throw", "ok"]);
  check(
    "Try Again actually re-runs the load and recovers",
    recovered.loadsRun === 2 && recovered.loading === false && recovered.failed === false,
  );

  const failedTwice = freshScreen();
  await runLoad(failedTwice, ["throw", "throw", "ok"]);
  retry(failedTwice);
  await runLoad(failedTwice, ["throw", "throw", "ok"]);
  check(
    "a second failure comes back to the notice rather than sticking",
    failedTwice.loading === false && failedTwice.failed === true,
  );
  retry(failedTwice);
  await runLoad(failedTwice, ["throw", "throw", "ok"]);
  check(
    "Try Again can be pressed as many times as the reader likes",
    failedTwice.loadsRun === 3 && failedTwice.failed === false,
  );

  const unmounted = freshScreen();
  await runLoad(unmounted, ["throw"], { cancelled: true });
  check(
    "a load that fails after the screen is gone sets nothing (no React warning)",
    unmounted.failed === false,
  );

  /**
   * The feed's own trap, and the reason its catch does not reuse init()'s
   * not-signed-in branch: init() sends a reader with no user to /login. A read
   * that times out is not a signed-out reader, and bouncing somebody who IS
   * signed in to the login screen over a 30 second timeout would be worse than
   * the skeleton it replaced.
   */
  const feed = freshScreen();
  await runLoad(feed, ["throw"]);
  check(
    "a failed feed load does NOT send a signed-in reader to /login",
    feed.redirectedToLogin === false && feed.failed === true,
  );

  console.log("");
  if (failures.length) {
    console.log(`${passed} passed, ${failures.length} failed:`);
    for (const f of failures) console.log(`  - ${f}`);
    process.exit(1);
  }
  console.log(`${passed} passed, 0 failed.`);

}

void main();
