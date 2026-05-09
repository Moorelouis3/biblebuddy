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
    label: "Bible Study Games",
    href: "/bible-study-games",
    activePrefixes: ["/bible-study-games", "/bible-trivia"],
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
    label: "Bible Buddy TV",
    href: "/biblebuddy-tv",
    activePrefixes: ["/biblebuddy-tv"],
    activeClasses: "bg-violet-50 text-violet-700 font-medium cursor-not-allowed",
    hoverClasses: "text-gray-700 hover:bg-violet-50 hover:text-violet-600 active:scale-[0.98]",
  },
];

const BREADCRUMB_LABELS: Record<string, string> = {
  reading: "The Bible",
  Bible: "The Bible",
  books: "Books",
  "study-groups": "Bible Study Group",
  "guided-studies": "Bible Study Tools",
  devotionals: "Bible Studies",
  "reading-plans": "Bible Reading Plans",
  "bible-study-games": "Bible Study Games",
  "bible-trivia": "Trivia",
  scrambled: "Scrambled",
  "biblebuddy-tv": "Bible Buddy TV",
  browse: "Browse",
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
  "little-louis": "Little Louis",
  scheduler: "Scheduler",
  lessons: "How to Use",
  "comments-admin": "Comments Admin",
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

  if (segments[0] === "reading") {
    if (segments.length === 1) {
      return [...breadcrumbs, { label: "The Bible" }];
    }

    if (segments[1] === "books") {
      const bookSegment = segments[2];
      const bookHref = bookSegment ? `/reading/books/${bookSegment}` : undefined;

      breadcrumbs.push({ label: "The Bible", href: "/reading" });

      if (bookSegment) {
        breadcrumbs.push({
          label: segmentLabel(bookSegment, "books"),
          href: segments.length > 3 ? bookHref : undefined,
        });
      }

      for (let index = 3; index < segments.length; index += 1) {
        const segment = segments[index];
        breadcrumbs.push({
          label: segmentLabel(segment, segments[index - 1]),
          href: index === segments.length - 1 ? undefined : `${bookHref}/${segment}`,
        });
      }

      return breadcrumbs;
    }
  }

  if (segments[0] === "Bible") {
    breadcrumbs.push({ label: "The Bible", href: "/reading" });

    const bookSegment = segments[1];
    if (bookSegment) {
      const bookHref = `/reading/books/${bookSegment}`;
      breadcrumbs.push({
        label: segmentLabel(bookSegment, "Bible"),
        href: segments.length > 2 ? bookHref : undefined,
      });
    }

    for (let index = 2; index < segments.length; index += 1) {
      const segment = segments[index];
      breadcrumbs.push({
        label: segmentLabel(segment, segments[index - 1]),
        href: undefined,
      });
    }

    return breadcrumbs;
  }

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
