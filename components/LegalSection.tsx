import type { ReactNode } from "react";

type LegalSectionProps = {
  title: string;
  children: ReactNode;
};

export default function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="mb-8">
      <h2 className="mb-2 block text-lg font-bold text-slate-900">{title}</h2>
      <div className="space-y-4 [&_a]:text-blue-700 [&_a]:underline [&_a]:underline-offset-2 [&_li]:mb-2 [&_li]:leading-7 [&_p]:leading-7 [&_p]:text-slate-700 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-slate-700">
        {children}
      </div>
    </section>
  );
}
