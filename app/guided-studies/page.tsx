// app/guided-studies/page.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ACTION_TYPE } from "../../lib/actionTypes";
import { trackNavigationActionOnce } from "../../lib/navigationActionTracker";
import { supabase } from "../../lib/supabaseClient";

const tools = [
  {
    href: "/devotionals",
    bg: "bg-teal-100 border-teal-200",
    emoji: "🌅",
    title: "Devotionals",
    desc: "Guided daily Bible reading and reflection",
  },
  {
    href: "/reading-plans",
    bg: "bg-yellow-100 border-yellow-200",
    emoji: "📋",
    title: "Bible Reading Plans",
    desc: "Different orders to read the Bible",
  },
  {
    href: "/bible-references",
    bg: "bg-purple-100 border-purple-200",
    emoji: "🔎",
    title: "Bible References",
    desc: "Explanations of Bible keywords and concepts",
  },
  {
    href: "/notes",
    bg: "bg-indigo-100 border-indigo-200",
    emoji: "📝",
    title: "Bible Study Notes",
    desc: "Create and save your personal study notes",
  },
];

export default function GuidedStudiesPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    void supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      setUserId(user?.id ?? null);
      const meta: any = user?.user_metadata || {};
      setUsername(
        meta.firstName ||
          meta.first_name ||
          (user?.email ? user.email.split("@")[0] : null) ||
          null
      );
    });
  }, []);

  useEffect(() => {
    if (!userId) return;
    void trackNavigationActionOnce({
      userId,
      username,
      actionType: ACTION_TYPE.guided_studies_viewed,
      actionLabel: "Bible Study Tools",
      dedupeKey: "guided-studies-viewed",
    }).catch((error) => console.error("[NAV] Failed to track Bible Study Tools view:", error));
  }, [userId, username]);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
      <nav className="text-sm text-gray-500">
        <Link href="/dashboard" className="hover:text-gray-700 transition">Dashboard</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-800 font-medium">Bible Study Tools</span>
      </nav>

      <div>
        <h1 className="text-3xl font-bold text-orange-800 mb-1">🔨 Bible Study Tools</h1>
        <p className="text-gray-600">A collection of Bible study tools</p>
      </div>

      <div className="flex flex-col gap-4">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            onClick={() => {
              if (!userId) return;
              void trackNavigationActionOnce({
                userId,
                username,
                actionType: ACTION_TYPE.guided_study_tool_opened,
                actionLabel: t.title,
                dedupeKey: `guided-study-tool:${t.title}`,
              }).catch((error) => console.error("[NAV] Failed to track tool click:", error));
            }}
          >
            <div className={`border rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition ${t.bg}`}>
              <h2 className="text-xl font-semibold">{t.emoji} {t.title}</h2>
              <p className="text-gray-700 mt-1">{t.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
