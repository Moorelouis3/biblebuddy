export type AppNavItem = {
  label: string;
  href: string;
  activePrefixes: string[];
  activeExact?: string[];
  activeClasses: string;
  hoverClasses: string;
};

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export const APP_NAV_ITEMS: AppNavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    activePrefixes: ["/dashboard"],
    activeClasses: "bg-sky-50 text-sky-700 font-medium cursor-not-allowed",
    hoverClasses: "text-gray-700 hover:bg-sky-50 hover:text-sky-600 active:scale-[0.98]",
  },
  {
    label: "The Bible",
    href: "/reading",
    activePrefixes: ["/reading", "/Bible", "/bible-study-notes", "/reading-plan"],
    activeClasses: "bg-blue-50 text-blue-700 font-medium cursor-not-allowed",
    hoverClasses: "text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:scale-[0.98]",
  },
  {
    label: "Bible Study Group",
    href: "/study-groups",
    activePrefixes: ["/study-groups"],
    activeClasses: "bg-green-50 text-green-700 font-medium cursor-not-allowed",
    hoverClasses: "text-gray-700 hover:bg-green-50 hover:text-green-600 active:scale-[0.98]",
  },
  {
    label: "Bible Trivia",
    href: "/bible-trivia",
    activePrefixes: ["/bible-trivia"],
    activeClasses: "bg-emerald-50 text-emerald-700 font-medium cursor-not-allowed",
    hoverClasses: "text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 active:scale-[0.98]",
  },
  {
    label: "Bible Study Tools",
    href: "/guided-studies",
    activePrefixes: ["/guided-studies", "/devotionals", "/reading-plans", "/bible-study-hub", "/bible-study-tips", "/bible-study-guides"],
    activeExact: ["/bible-references"],
    activeClasses: "bg-orange-50 text-orange-700 font-medium cursor-not-allowed",
    hoverClasses: "text-gray-700 hover:bg-orange-50 hover:text-orange-600 active:scale-[0.98]",
  },
  {
    label: "Notes",
    href: "/notes",
    activePrefixes: ["/notes"],
    activeClasses: "bg-purple-50 text-purple-700 font-medium cursor-not-allowed",
    hoverClasses: "text-gray-700 hover:bg-purple-50 hover:text-purple-600 active:scale-[0.98]",
  },
];

const BREADCRUMB_LABELS: Record<string, string> = {
  reading: "The Bible",
  Bible: "The Bible",
  books: "Books",
  "study-groups": "Bible Study Group",
  "guided-studies": "Bible Study Tools",
  devotionals: "Devotionals",
  "reading-plans": "Bible Reading Plans",
  "bible-trivia": "Bible Trivia",
  notes: "Notes",
  "people-in-the-bible": "People in the Bible",
  "places-in-the-bible": "Places in the Bible",
  "keywords-in-the-bible": "Keywords in the Bible",
  "bible-references": "Bible References",
  "bible-study-hub": "Bible Study Tools",
  "bible-study-guides": "Bible Study Guides",
  "bible-study-tips": "Bible Study Tips",
  "bible-study-notes": "Bible Study Notes",
  messages: "Messages",
  profile: "Profile",
  settings: "Settings",
  "bb-feed": "Community Feed",
  ambassador: "Partner Dashboard",
  "verse-of-the-day": "Verse of the Day",
  updates: "Updates",
  upgrade: "Upgrade",
  contact: "Contact",
  privacy: "Privacy Policy",
  terms: "Terms of Service",
  series: "Series",
  week: "Week",
  analytics: "Analytics",
  scheduler: "Scheduler",
  lessons: "How to Use",
};

function titleCase(value: string) {
  return value
    .split(/[\s-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function isOpaqueId(segment: string) {
  return /^[a-f0-9-]{16,}$/i.test(segment) || /^[0-9a-f]{8,}$/i.test(segment);
}

function segmentLabel(segment: string, previous?: string) {
  if (previous === "week" && /^\d+$/.test(segment)) return `Week ${segment}`;
  if (previous === "chapter" && /^\d+$/.test(segment)) return `Chapter ${segment}`;
  if ((previous === "Bible" || previous === "books" || previous === "reading-plan" || previous === "bible-study-notes") && /^\d+$/.test(segment)) {
    return `Chapter ${segment}`;
  }
  if (BREADCRUMB_LABELS[segment]) return BREADCRUMB_LABELS[segment];
  if (isOpaqueId(segment)) {
    if (previous === "study-groups") return "Group";
    if (previous === "messages") return "Conversation";
    if (previous === "profile") return "Profile";
    return "Details";
  }

  const decoded = decodeURIComponent(segment);
  return titleCase(decoded);
}

export function isNavItemActive(pathname: string | null | undefined, item: AppNavItem) {
  if (!pathname) return false;
  if (item.activeExact?.includes(pathname)) return true;
  return item.activePrefixes.some((prefix) => pathname.startsWith(prefix));
}

export function buildBreadcrumbs(pathname: string | null | undefined): BreadcrumbItem[] {
  if (!pathname || pathname === "/" || pathname.startsWith("/dashboard")) return [];

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [{ label: "Dashboard", href: "/dashboard" }];

  let cumulative = "";
  segments.forEach((segment, index) => {
    cumulative += `/${segment}`;
    breadcrumbs.push({
      label: segmentLabel(segment, segments[index - 1]),
      href: index === segments.length - 1 ? undefined : cumulative,
    });
  });

  return breadcrumbs;
}
