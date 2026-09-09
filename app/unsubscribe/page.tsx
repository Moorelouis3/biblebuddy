import { createClient } from "@supabase/supabase-js";
import { unsubscribeToken } from "@/lib/blogBroadcast";

// One-click unsubscribe, no login. Every marketing email is legally
// required to carry a working one, and the link is signed so a stranger
// cannot unsubscribe somebody else by guessing an address.

export const dynamic = "force-dynamic";
export const metadata = { title: "Unsubscribe | Bible Buddy" };

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string; t?: string }>;
}) {
  const { email = "", t = "" } = await searchParams;
  const address = email.trim().toLowerCase();
  const valid = Boolean(address) && t === unsubscribeToken(address);

  let done = false;
  let failed = false;

  if (valid) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (url && key) {
      const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
      const { error } = await supabase
        .from("email_unsubscribes")
        .upsert({ email: address, source: "email_link" }, { onConflict: "email" });
      done = !error;
      failed = Boolean(error);
    } else {
      failed = true;
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-lg flex-col justify-center px-6 py-16 text-slate-950">
      {done ? (
        <>
          <h1 className="text-3xl font-black tracking-tight">You&apos;re unsubscribed</h1>
          <p className="mt-3 text-base font-semibold leading-7 text-[#41506b]">
            We won&apos;t email <strong>{address}</strong> about new studies again. Bible Buddy itself stays free and
            open whenever you want it.
          </p>
        </>
      ) : failed || !valid ? (
        <>
          <h1 className="text-3xl font-black tracking-tight">That link didn&apos;t work</h1>
          <p className="mt-3 text-base font-semibold leading-7 text-[#41506b]">
            It may have been broken by your email app. Reply to any Bible Buddy email and we&apos;ll take you off the
            list by hand.
          </p>
        </>
      ) : null}
      <a
        href="/"
        className="mt-6 inline-block w-fit rounded-2xl bg-[#0056FD] px-6 py-3 text-sm font-black text-white"
      >
        Open Bible Buddy
      </a>
    </main>
  );
}
