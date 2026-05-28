import Link from "next/link";
import type { ReactNode } from "react";
import LegalPageThemeReset from "./LegalPageThemeReset";
import PublicHomeButton from "./PublicHomeButton";

type LegalPageLayoutProps = {
  eyebrow: string;
  title: string;
  description: string;
  lastUpdated: string;
  children: ReactNode;
};

export default function LegalPageLayout({
  eyebrow,
  title,
  description,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="bb-legal-public min-h-screen px-5 py-8 sm:px-8 lg:px-10">
      <LegalPageThemeReset />
      <style>{`
        html:has(.bb-legal-public),
        html:has(.bb-legal-public) body,
        html.bb-legal-page-active,
        html.bb-legal-page-active body {
          background: #F5F7FA !important;
          background-color: #F5F7FA !important;
          background-image: none !important;
          background-attachment: scroll !important;
          background-position: initial !important;
          background-repeat: initial !important;
          background-size: initial !important;
          color: #111827 !important;
        }
        html:has(.bb-legal-public) body::before,
        html:has(.bb-legal-public) body::after,
        html.bb-legal-page-active body::before,
        html.bb-legal-page-active body::after {
          content: none !important;
          display: none !important;
          background: none !important;
          background-image: none !important;
        }
        .bb-legal-public {
          background: #F5F7FA !important;
          color: #111827 !important;
        }
        .bb-legal-public .bb-legal-logo,
        .bb-legal-public .bb-legal-logo * {
          color: #111827 !important;
          -webkit-text-fill-color: #111827 !important;
        }
        .bb-legal-public .bb-legal-home {
          background: #ffffff !important;
          border-color: #E5E7EB !important;
          color: #111827 !important;
          -webkit-text-fill-color: #111827 !important;
        }
        .bb-legal-public .bb-legal-header {
          background: transparent !important;
          background-color: transparent !important;
          background-image: none !important;
          box-shadow: none !important;
          border: 0 !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
        }
        .bb-legal-public .bb-legal-card {
          background: #FFFFFF !important;
          border-color: #E5E7EB !important;
          box-shadow: 0 24px 70px rgba(14, 26, 58, 0.10) !important;
        }
        .bb-legal-public .bb-legal-hero {
          background: #FFFFFF !important;
          border-color: #E5E7EB !important;
        }
        .bb-legal-public .bb-legal-eyebrow,
        .bb-legal-public .bb-legal-gold {
          color: #7BAFD4 !important;
          -webkit-text-fill-color: #7BAFD4 !important;
        }
        .bb-legal-public h1 {
          color: #111827 !important;
          -webkit-text-fill-color: #111827 !important;
        }
        .bb-legal-public .bb-legal-description,
        .bb-legal-public .bb-legal-updated {
          color: #374151 !important;
          -webkit-text-fill-color: #374151 !important;
        }
        .bb-legal-public .bb-legal-updated {
          background: #ffffff !important;
          border-color: #E5E7EB !important;
        }
        .bb-legal-public .bb-legal-footer {
          background: #FFFFFF !important;
          border-color: #E5E7EB !important;
          color: #374151 !important;
        }
        .bb-legal-public .bb-legal-footer a {
          color: #111827 !important;
          -webkit-text-fill-color: #111827 !important;
        }
      `}</style>
      <div className="mx-auto max-w-5xl">
        <div className="bb-legal-header mb-8 flex items-center justify-between gap-5 rounded-none px-0 py-0" role="banner">
          <Link href="/" className="bb-legal-logo flex items-center gap-3">
            <svg className="h-8 w-8 shrink-0" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 8.5c4.8-1.7 7.8.2 11 2.7 3.2-2.5 6.2-4.4 11-2.7v17c-4.8-1.7-7.8.2-11 2.7-3.2-2.5-6.2-4.4-11-2.7v-17Z" />
              <path d="M16 11.2v17" />
            </svg>
            <span className="text-lg font-black tracking-tight">Bible Buddy</span>
          </Link>
          <PublicHomeButton className="bb-legal-home fixed right-5 top-6 z-50 rounded-full border px-5 py-2.5 text-sm font-black shadow-[0_10px_24px_rgba(14,26,58,0.06)] transition hover:-translate-y-0.5 sm:right-8" />
        </div>

        <section className="bb-legal-card overflow-hidden rounded-[30px] border">
          <div className="bb-legal-hero border-b px-6 py-9 text-center sm:px-10">
            <p className="bb-legal-eyebrow text-xs font-black uppercase tracking-[0.22em]">
              {eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-4xl font-black tracking-tight text-[#111827] sm:text-5xl">
              {title}
            </h1>
            <div className="bb-legal-gold mx-auto mt-5 flex max-w-[220px] items-center justify-center gap-3">
              <span className="h-px flex-1 bg-[#7BAFD4]/70" />
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.8 8.6c0 5.4-8.8 10.2-8.8 10.2S3.2 14 3.2 8.6A4.6 4.6 0 0 1 12 6.7a4.6 4.6 0 0 1 8.8 1.9Z" />
              </svg>
              <span className="h-px flex-1 bg-[#7BAFD4]/70" />
            </div>
            <p className="bb-legal-description mx-auto mt-5 max-w-2xl text-base font-semibold leading-7">
              {description}
            </p>
            <p className="bb-legal-updated mt-5 inline-flex rounded-full border px-4 py-2 text-xs font-black">
              Last updated: {lastUpdated}
            </p>
          </div>

          <div className="px-6 py-8 sm:px-10">
            {children}
          </div>
        </section>

        <footer className="bb-legal-footer mt-8 rounded-[24px] border px-6 py-6 shadow-[0_12px_30px_rgba(14,26,58,0.045)] sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <svg className="h-7 w-7 shrink-0 text-[#111827]" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 8.5c4.8-1.7 7.8.2 11 2.7 3.2-2.5 6.2-4.4 11-2.7v17c-4.8-1.7-7.8.2-11 2.7-3.2-2.5-6.2-4.4-11-2.7v-17Z" />
                <path d="M16 11.2v17" />
              </svg>
              <div>
                <p className="text-sm font-black text-[#111827]">Bible Buddy</p>
                <p className="text-xs font-semibold text-[#6B7280]">Simple. Guided. Transformative.</p>
              </div>
            </div>
            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-black">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/contact">Contact</Link>
            </nav>
          </div>
          <div className="mt-5 border-t border-[#E5E7EB] pt-4 text-xs font-semibold text-[#6B7280]">
            © 2026 Bible Buddy. All rights reserved.
          </div>
        </footer>
      </div>
    </main>
  );
}
