import type { Metadata } from "next";
import LegalPageLayout from "@/components/LegalPageLayout";
import { APP_STORE_URL, FAQ } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ | Bible Buddy",
  description:
    "Answers to the questions people ask Bible Buddy most: translations, the phone app, study days, past Verses of the Day, your account and more.",
};

/**
 * The questions people actually ask (Louis, 2026-11-15). The list lives in
 * lib/faq.ts, which the automatic DM reply reads too, so this page and the
 * replies always say the same thing. Each entry has its own anchor,
 * /faq#<id>, which is where the DM buttons point.
 */
export default function FaqPage() {
  return (
    <LegalPageLayout
      eyebrow="Help"
      title="Frequently asked questions"
      description="The questions people send me most, answered in one place. If yours is not here, tap Report a Problem at the bottom of any page in the app."
      lastUpdated="November 15, 2026"
    >
      {/* LegalPageLayout does not style what it wraps, so this page does. */}
      <nav aria-label="Questions" className="rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-5">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[#0056FD]">Jump to a question</p>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2">
          {FAQ.map((entry) => (
            <li key={entry.id}>
              <a href={`#${entry.id}`} className="text-sm font-bold leading-6 text-[#0056FD] hover:underline">
                {entry.question}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 grid gap-4">
        {FAQ.map((entry) => (
          <section
            key={entry.id}
            id={entry.id}
            className="scroll-mt-24 rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:p-6"
          >
            <h2 className="text-lg font-black leading-snug text-[#111827] sm:text-xl">{entry.question}</h2>
            {entry.answer.map((paragraph) => (
              <p key={paragraph} className="mt-3 text-[15px] font-medium leading-7 text-[#374151]">
                {paragraph}
              </p>
            ))}
            {entry.id === "phone-app" || entry.id === "app-store-review" ? (
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex rounded-xl bg-[#111827] px-4 py-2.5 text-sm font-black text-white"
                style={{ color: "#ffffff" }}
              >
                Bible Buddy on the App Store
              </a>
            ) : null}
          </section>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-[#E5E7EB] bg-[#F8FAFC] p-5 sm:p-6">
        <h2 className="text-lg font-black text-[#111827]">Still need help?</h2>
        <p className="mt-2 text-[15px] font-medium leading-7 text-[#374151]">
          Email{" "}
          <a href="mailto:support@mybiblebuddy.net" className="font-bold text-[#0056FD] underline">
            support@mybiblebuddy.net
          </a>
          , or tap Report a Problem inside the app. It comes straight to me.
        </p>
      </section>
    </LegalPageLayout>
  );
}
