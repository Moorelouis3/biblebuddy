import type { ReactNode } from "react";

type LegalSectionProps = {
  title: string;
  children: ReactNode;
};

export default function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="bb-legal-section mb-5 rounded-[22px] border p-5 shadow-[0_12px_30px_rgba(14,26,58,0.045)] sm:p-6">
      <style>{`
        html[data-bb-skin] .bb-legal-public .bb-legal-section,
        .bb-legal-public .bb-legal-section {
          background: #FFFFFF !important;
          border-color: #E5E7EB !important;
          color: #374151 !important;
        }
        html[data-bb-skin] .bb-legal-public .bb-legal-section h2,
        .bb-legal-public .bb-legal-section h2 {
          color: #111827 !important;
          -webkit-text-fill-color: #111827 !important;
          font-family: "Playfair Display", "Cormorant Garamond", "Libre Baskerville", Georgia, serif !important;
        }
        html[data-bb-skin] .bb-legal-public .bb-legal-section p,
        html[data-bb-skin] .bb-legal-public .bb-legal-section li,
        .bb-legal-public .bb-legal-section p,
        .bb-legal-public .bb-legal-section li {
          color: #374151 !important;
          -webkit-text-fill-color: #374151 !important;
        }
        html[data-bb-skin] .bb-legal-public .bb-legal-section ul,
        .bb-legal-public .bb-legal-section ul {
          margin-top: 0.75rem !important;
        }
        html[data-bb-skin] .bb-legal-public .bb-legal-section li::marker,
        .bb-legal-public .bb-legal-section li::marker {
          color: #7BAFD4 !important;
        }
        html[data-bb-skin] .bb-legal-public .bb-legal-section a,
        .bb-legal-public .bb-legal-section a {
          color: #2563EB !important;
          -webkit-text-fill-color: #2563EB !important;
          font-weight: 900 !important;
          text-decoration: underline !important;
          text-underline-offset: 2px !important;
        }
      `}</style>
      <h2 className="mb-3 block text-xl font-black tracking-tight">{title}</h2>
      <div className="space-y-4 text-sm font-semibold leading-7 sm:text-[15px] [&_li]:mb-2 [&_li]:leading-7 [&_p]:leading-7 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
