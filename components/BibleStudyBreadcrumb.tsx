import Link from "next/link";
import React from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BibleStudyBreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function BibleStudyBreadcrumb({ items, className = "" }: BibleStudyBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-sm text-gray-500 mb-6 ${className}`.trim()}
    >
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-2">
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-black hover:underline transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-400 select-none">{item.label}</span>
            )}
            {!isLast && <span className="mx-1 text-gray-300">›</span>}
          </span>
        );
      })}
    </nav>
  );
}
