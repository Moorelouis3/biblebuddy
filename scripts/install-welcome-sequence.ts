/**
 * Install the five-email welcome funnel as campaign rows.
 *
 *   npx tsx scripts/install-welcome-sequence.ts --dry
 *   npx tsx scripts/install-welcome-sequence.ts
 *   npx tsx scripts/install-welcome-sequence.ts --preview   (writes HTML to tmp/)
 *
 * EVERY ROW IS CREATED PAUSED, and this script will not arm one. Arming is a
 * separate, deliberate act once Louis has seen the previews. Nothing here can
 * send an email: the sender only ever looks at status='sending'.
 *
 * Re-runnable. An existing row has its subject, html and text refreshed from
 * lib/email/welcomeSequence.ts, and its status is left exactly as it is - so a
 * re-run after Louis arms a step cannot silently unarm it, and a copy fix can
 * be pushed without touching the schedule.
 */
import { config } from "dotenv";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { createClient } from "@supabase/supabase-js";
import { WELCOME_SEQUENCE, isReadyToSend } from "../lib/email/welcomeSequence";
import { renderWelcomeHtml, renderWelcomeText } from "../lib/email/welcomeRender";

for (const path of [".env.local", ".env"]) {
  if (existsSync(path)) config({ path, override: false, quiet: true });
}

const DRY = process.argv.includes("--dry");
const PREVIEW = process.argv.includes("--preview");

async function main(): Promise<number> {
  if (PREVIEW) {
    mkdirSync("tmp/welcome-preview", { recursive: true });
    const index: string[] = [];
    for (const step of WELCOME_SEQUENCE) {
      const file = `tmp/welcome-preview/day-${step.step}.html`;
      writeFileSync(
        file,
        renderWelcomeHtml(step)
          .replace(/\{\{first_name\}\}/g, "Grace")
          .replace(/\{\{UNSUBSCRIBE\}\}/g, "#preview"),
      );
      index.push(
        `<li><a href="day-${step.step}.html">Day ${step.step} &mdash; ${step.subject}</a>` +
          (isReadyToSend(step) ? "" : " <strong style='color:#c0392b'>(asset missing)</strong>") +
          `</li>`,
      );
      console.log(`  ${file}`);
    }
    writeFileSync(
      "tmp/welcome-preview/index.html",
      `<!doctype html><meta charset="utf-8"><title>Welcome funnel</title>` +
        `<h1>Bible Buddy welcome funnel</h1><ul>${index.join("")}</ul>`,
    );
    console.log("  tmp/welcome-preview/index.html");
    return 0;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env");
  const db = createClient(url, key, { auth: { persistSession: false } });

  console.log(DRY ? "[DRY RUN - nothing will be written]" : "[LIVE - rows are created PAUSED]");

  const { data: existingRows, error: readError } = await db
    .from("email_campaigns")
    .select("campaign_id, status")
    .in("campaign_id", WELCOME_SEQUENCE.map((s) => s.campaignId));
  if (readError) throw new Error(readError.message);
  const existing = new Map(
    ((existingRows as Array<{ campaign_id: string; status: string }>) || []).map((r) => [r.campaign_id, r.status]),
  );

  let created = 0;
  let updated = 0;

  for (const step of WELCOME_SEQUENCE) {
    const ready = isReadyToSend(step);
    const was = existing.get(step.campaignId);
    const action = was ? `update (status stays '${was}')` : "create (status 'paused')";
    console.log(
      `  Day ${step.step}  ${step.campaignId.padEnd(10)} ${ready ? "ready " : "BLOCKED"}  ${action}`,
    );
    if (!ready && step.pendingAsset) {
      console.log(`             needs: ${step.pendingAsset.what}`);
      console.log(`             after: "${step.pendingAsset.placeAfter}"`);
    }

    if (DRY) {
      if (was) updated += 1;
      else created += 1;
      continue;
    }

    const payload: Record<string, unknown> = {
      campaign_id: step.campaignId,
      subject: step.subject,
      html: renderWelcomeHtml(step),
      text: renderWelcomeText(step),
      kind: "transactional",
      rate_per_second: 5,
      max_per_run: 200,
      notes:
        `Welcome funnel step ${step.step} of ${WELCOME_SEQUENCE.length}. ` +
        `Approved by Louis 2026-11-11, copy verbatim from lib/email/welcomeSequence.ts.` +
        (ready ? "" : ` BLOCKED: ${step.pendingAsset?.what ?? "asset missing"}.`),
    };
    // Only set status when creating. An existing row keeps whatever it has, so
    // a re-run cannot unarm a step Louis has deliberately switched on.
    if (!was) payload.status = "paused";

    const { error } = await db.from("email_campaigns").upsert(payload, { onConflict: "campaign_id" });
    if (error) {
      console.error(`    FAILED: ${error.message}`);
      return 1;
    }
    if (was) updated += 1;
    else created += 1;
  }

  console.log(`\n${DRY ? "[dry] would create" : "created"} ${created}, ${DRY ? "would update" : "updated"} ${updated}`);

  if (!DRY) {
    // Read back rather than trust the write, and prove nothing is armed.
    const { data: after } = await db
      .from("email_campaigns")
      .select("campaign_id, status")
      .in("campaign_id", WELCOME_SEQUENCE.map((s) => s.campaignId));
    const armed = ((after as Array<{ campaign_id: string; status: string }>) || []).filter(
      (r) => r.status === "sending",
    );
    console.log(`welcome rows in the database: ${(after || []).length} of ${WELCOME_SEQUENCE.length}`);
    console.log(`armed (status 'sending'): ${armed.length}${armed.length ? " <- " + armed.map((r) => r.campaign_id).join(", ") : ""}`);
  }

  const blocked = WELCOME_SEQUENCE.filter((s) => !isReadyToSend(s));
  if (blocked.length) {
    console.log(`\nBLOCKED until assets are hosted publicly: ${blocked.map((s) => s.campaignId).join(", ")}`);
    for (const s of blocked) {
      console.log(`  ${s.campaignId}: ${s.pendingAsset?.source}`);
    }
    console.log("A Google Drive viewer link is an HTML page, not an image, and will not render.");
  }

  return 0;
}

main()
  .then((code) => {
    if (code) process.exit(code);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
