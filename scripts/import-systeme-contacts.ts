/**
 * Copy the Systeme.io mailing list into our own email_subscribers table.
 *
 * Does NOT need SES production access - this is just moving the list off a
 * provider that charges per contact. Run it as often as you like; it upserts on
 * the email address, so it is safe to re-run right up until we stop sending
 * through Systeme.
 *
 *   npx tsx scripts/import-systeme-contacts.ts --dry
 *   npx tsx scripts/import-systeme-contacts.ts
 *
 * Anyone Systeme has flagged unsubscribed or bounced goes to email_suppressions
 * instead of the list. Carrying those over is the whole point: the fastest way
 * to wreck a new SES reputation is to start emailing people who already said no.
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const DRY = process.argv.includes("--dry");

type SystemeContact = {
  id: number;
  email: string;
  registeredAt?: string | null;
  locale?: string | null;
  unsubscribed?: boolean;
  bounced?: boolean;
  fields?: Array<{ slug?: string; fieldName?: string; value?: string }>;
  tags?: Array<{ id: number; name: string }>;
};

function firstName(contact: SystemeContact) {
  const field = (contact.fields || []).find(
    (f) => f.slug === "first_name" || f.fieldName === "First name",
  );
  const raw = (field?.value || "").trim();
  return raw ? raw.slice(0, 60) : null;
}

async function main() {
  const systemeKey = process.env.SYSTEME_API_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!systemeKey) throw new Error("SYSTEME_API_KEY is required.");
  if (!url || !serviceKey) throw new Error("Supabase credentials are required.");

  const db = createClient(url, serviceKey, { auth: { persistSession: false } });

  // Page the whole list. Systeme pages with startingAfter on the contact id.
  const contacts: SystemeContact[] = [];
  let after: number | null = null;
  for (let page = 0; page < 200; page += 1) {
    const qs = `limit=100${after ? `&startingAfter=${after}` : ""}`;
    const res = await fetch(`https://api.systeme.io/api/contacts?${qs}`, {
      headers: { "X-API-Key": systemeKey },
    });
    if (!res.ok) throw new Error(`Systeme returned ${res.status}`);
    const json = (await res.json()) as { items?: SystemeContact[] };
    const items = json.items || [];
    contacts.push(...items);
    if (items.length < 100) break;
    after = items[items.length - 1].id;
  }

  const suppress = contacts.filter((c) => c.unsubscribed || c.bounced);
  const keep = contacts.filter((c) => c.email && !c.unsubscribed && !c.bounced);

  console.log(`Systeme contacts fetched: ${contacts.length}`);
  console.log(`  to import as subscribers: ${keep.length}`);
  console.log(`  already unsubscribed/bounced -> suppressions: ${suppress.length}`);

  const tagCounts = new Map<string, number>();
  for (const c of keep) for (const t of c.tags || []) tagCounts.set(t.name, (tagCounts.get(t.name) || 0) + 1);
  if (tagCounts.size) {
    console.log("  tags carried over:");
    for (const [name, n] of [...tagCounts.entries()].sort((a, b) => b[1] - a[1])) {
      console.log(`    ${String(n).padStart(5)}  ${name}`);
    }
  }

  if (DRY) {
    console.log("\n--dry: nothing written.");
    return;
  }

  let written = 0;
  for (let i = 0; i < keep.length; i += 500) {
    const rows = keep.slice(i, i + 500).map((c) => ({
      email: c.email.toLowerCase().trim(),
      first_name: firstName(c),
      locale: c.locale || null,
      source: "systeme_import",
      tags: (c.tags || []).map((t) => t.name),
      systeme_id: c.id,
      subscribed_at: c.registeredAt || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
    const { error } = await db.from("email_subscribers").upsert(rows, { onConflict: "email" });
    if (error) throw new Error(`subscriber upsert failed: ${error.message}`);
    written += rows.length;
    console.log(`  written ${written}/${keep.length}`);
  }

  let suppressed = 0;
  for (let i = 0; i < suppress.length; i += 500) {
    const rows = suppress.slice(i, i + 500).map((c) => ({
      email: c.email.toLowerCase().trim(),
      reason: c.bounced ? "bounce" : "unsubscribe",
      detail: "carried over from Systeme.io on import",
    }));
    const { error } = await db.from("email_suppressions").upsert(rows, { onConflict: "email" });
    if (error) throw new Error(`suppression upsert failed: ${error.message}`);
    suppressed += rows.length;
  }

  console.log(`\ndone: ${written} subscribers, ${suppressed} suppressions.`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
