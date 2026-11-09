/**
 * The regression test for "I wrote a comment and it just disappeared".
 *
 *   npm run verify:comment-not-lost
 *
 * Two separate bugs, both on the community feed, both found 2026-11-09.
 *
 * 1. `submitComment` in app/bb-feed/page.tsx cleared the box on its way out
 *    whether or not the insert worked. supabase-js does not throw on a dropped
 *    connection - it RESOLVES with { data: null, error } - so the failure ran
 *    straight through the success check and wiped what the person had typed,
 *    with no message anywhere. They wrote it, it vanished, nothing said why.
 *
 * 2. app/people-in-the-bible/page.tsx polled profile_stats every 2 seconds, not
 *    gated on the tab being visible, to open a modal that CORE_STUDY_IS_FREE
 *    makes unreachable. The same shape as the 8-second poll in AppShell that
 *    caused three database outages in October.
 *
 * Nothing here touches the network or a browser. The source is read and
 * asserted against, and the handler's failure path is modelled in the exact
 * shape the real one uses - with the error RETURNED, never thrown, because
 * that is what the client actually does.
 */
import { readFileSync } from "node:fs";

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

/** The body of `name`, found by matching braces from its opening one. */
function functionBody(source: string, name: string): string {
  const start = source.indexOf(name);
  if (start < 0) return "";
  const open = source.indexOf("{", start);
  if (open < 0) return "";
  let depth = 0;
  for (let i = open; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    else if (source[i] === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(open, i + 1);
    }
  }
  return "";
}

// -- 1. The comment box keeps what you typed when the save fails -------------

const feed = readFileSync("app/bb-feed/page.tsx", "utf8");
const submit = functionBody(feed, "async function submitComment(");

check("submitComment is still there to check", submit.length > 0);

const errorBlock = functionBody(submit, "if (error");
check("submitComment looks at the error the insert returns", errorBlock.length > 0);
check("a failed save leaves the handler early", /\breturn;/.test(errorBlock));
check("a failed save says so instead of failing silently", /setCommentError\(/.test(errorBlock));
check("a failed save stops the spinner", /setSubmitting\(false\)/.test(errorBlock));

const clearIndex = submit.indexOf('setNewComment("")');
const errorIndex = submit.indexOf("if (error");
check("the box is only cleared after the error has been ruled out", clearIndex > errorIndex && errorIndex >= 0);
check(
  "nothing clears the reply box before the error is ruled out",
  submit.indexOf('setReplyText("")') > errorIndex && errorIndex >= 0,
);

check("the failure is rendered where the person is looking", /\{commentError &&/.test(feed));
check("the message is cleared when a comment goes through", /setCommentError\(null\)/.test(feed));
check(
  "the reply box shows the failure too, not just the top-level one",
  /ctx\.commentError/.test(feed),
);

// -- The failure path, in the shape the real handler uses --------------------

type Result = { data: { id: string } | null; error: { message: string } | null };

async function modelSubmit(
  insert: () => Promise<Result>,
  state: { text: string; error: string | null; submitting: boolean; posted: number },
) {
  state.submitting = true;
  state.error = null;
  const { data, error } = await insert();
  if (error || !data) {
    state.error = "Your comment did not send. Check your connection and try again.";
    state.submitting = false;
    return;
  }
  state.posted += 1;
  state.text = "";
  state.submitting = false;
}

// supabase-js RESOLVES with an error object on a dropped connection. If this
// test ever stubs a rejection instead, it is testing the wrong thing.
const dropped = async (): Promise<Result> => ({
  data: null,
  error: { message: "TypeError: Failed to fetch" },
});
const accepted = async (): Promise<Result> => ({ data: { id: "c1" }, error: null });

async function main() {
  const failState = { text: "Thank you for this study", error: null as string | null, submitting: false, posted: 0 };
  await modelSubmit(dropped, failState);
  check("a dropped connection leaves the typed comment in the box", failState.text === "Thank you for this study");
  check("a dropped connection tells the person", Boolean(failState.error));
  check("a dropped connection does not count a comment", failState.posted === 0);
  check("a dropped connection releases the button", failState.submitting === false);

  const okState = { text: "Thank you for this study", error: "stale message" as string | null, submitting: false, posted: 0 };
  await modelSubmit(accepted, okState);
  check("a successful comment clears the box", okState.text === "");
  check("a successful comment clears any earlier message", okState.error === null);
  check("a successful comment is counted once", okState.posted === 1);

  // -- 2. No 2-second database poll -------------------------------------------

  // Two intervals remain in that file on purpose - animated loading dots and a
  // progress bar. Neither goes near the network, and that is the line this
  // draws: a timer may animate, it may not query.
  const people = readFileSync("app/people-in-the-bible/page.tsx", "utf8");
  const timerBodies: string[] = [];
  for (let at = people.indexOf("setInterval("); at >= 0; at = people.indexOf("setInterval(", at + 1)) {
    timerBodies.push(functionBody(people.slice(at), "setInterval("));
  }
  check("the timers in people-in-the-bible are still only animations", timerBodies.length === 2);
  check(
    "no timer there asks the database anything",
    timerBodies.every((body) => !body.includes("supabase")),
  );
  check(
    "nothing there polls profile_stats",
    !timerBodies.some((body) => body.includes("profile_stats")),
  );

  // -- Report ------------------------------------------------------------------

  console.log(`\n${passed} passed, ${failures.length} failed.`);
  if (failures.length) {
    for (const f of failures) console.error(`  failed: ${f}`);
    process.exit(1);
  }
}

void main();
