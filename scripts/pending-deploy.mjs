#!/usr/bin/env node
/**
 * What is finished but not live yet (Louis, 2026-10-02).
 *
 * Vercel only builds a commit tagged [deploy], and the Deploy routine adds
 * that tag twice a day. Everything pushed in between is real, finished work
 * sitting on main that nobody can see yet - and Louis had no way to know what
 * was in that pile without asking an agent, which costs money. This prints it.
 *
 *   npm run pending
 *
 * Same source of truth the Deploy routine uses: the last commit that touched
 * DEPLOY_LOG.md, never a search for "[deploy]" in messages (commit bodies
 * discuss the tag and would match).
 */
import { execFileSync } from "node:child_process";

const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();

/** The two daily deploy times, as Berlin wall-clock hours (cron 0 8,16 UTC). */
const DEPLOY_HOURS_UTC = [8, 16];

function nextDeploy(now = new Date()) {
  for (let addDays = 0; addDays < 2; addDays += 1) {
    for (const hour of DEPLOY_HOURS_UTC) {
      const at = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + addDays, hour, 5, 0),
      );
      if (at > now) return at;
    }
  }
  return null;
}

function main() {
  let since = "";
  try {
    since = git("log", "-1", "--format=%H", "--", "DEPLOY_LOG.md");
  } catch {
    /* no log yet - fall through to the 14-day window */
  }
  const range = since ? `${since}..HEAD` : "--since=14 days ago";
  const lines = git("log", "--format=%h\t%ad\t%s", "--date=format:%d %b %H:%M", range)
    .split("\n")
    .filter(Boolean);

  const lastDeployedAt = since ? git("log", "-1", "--format=%ad", "--date=format:%d %b %H:%M", since) : "unknown";

  if (!lines.length) {
    console.log("Nothing waiting - everything on main is live.");
    return;
  }

  // Chapter notes and blog entries are the routines' own output and arrive in
  // bulk; they are listed last and folded into one line so the things Louis
  // actually has to look at are at the top.
  const isRoutineWork = (subject) =>
    /^(Add|Publish|Write)\b.*\b(study notes|chapter notes|Explained|blog post|Bible in One Year day)/i.test(subject);

  const mine = lines.filter((l) => !isRoutineWork(l.split("\t")[2]));
  const routine = lines.filter((l) => isRoutineWork(l.split("\t")[2]));

  const next = nextDeploy();
  const berlin = next
    ? new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/Berlin",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(next)
    : "unknown";

  console.log(`${lines.length} commit${lines.length === 1 ? "" : "s"} waiting to go live.`);
  console.log(`Last deploy: ${lastDeployedAt}.  Next: ${berlin} Berlin.\n`);

  for (const line of mine) {
    const [sha, date, subject] = line.split("\t");
    console.log(`  ${date}  ${subject}  (${sha})`);
  }
  if (routine.length) {
    console.log(`\n  + ${routine.length} routine content commits (chapter notes, blog entries, day writer).`);
  }
}

main();
