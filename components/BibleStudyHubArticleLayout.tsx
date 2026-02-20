"use client";
// ...existing code...
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function toTitleCase(str: string) {
  return str
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

type Crumb = { label: string; href?: string };

export default function BibleStudyHubArticleLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // Breadcrumb logic
  const crumbs: Crumb[] = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Bible Study Hub", href: "/bible-study-hub" },
  ];

  if (segments[1]) {
    // Subject page or deeper
    const subject = toTitleCase(segments[1]);
    crumbs.push({ label: subject, href: `/bible-study-hub/${segments[1]}` });
  }

  if (segments[2]) {
    // Article page
    const article = toTitleCase(segments[2]);
    crumbs.push({ label: article }); // Not clickable
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <nav className="mb-6 text-sm text-gray-500 flex flex-wrap items-center gap-1">
        {crumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {crumb.href ? (
              <Link href={crumb.href} className="hover:underline text-gray-700 font-medium">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-gray-900 font-semibold">{crumb.label}</span>
            )}
            {idx < crumbs.length - 1 && <span className="mx-1">→</span>}
          </React.Fragment>
        ))}
      </nav>
      {children}
    </div>
  );
}
