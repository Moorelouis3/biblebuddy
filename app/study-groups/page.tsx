"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";

interface StudyGroup {
  id: string;
  name: string;
  description: string | null;
  leader_name: string | null;
  category: string;
  status: string;
  member_count: number;
  max_members: number;
  current_weekly_study: string | null;
  cover_emoji: string | null;
  cover_color: string | null;
}

export default function StudyGroupsPage() {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadGroups() {
      try {
        const { data, error } = await supabase
          .from("study_groups")
          .select("id, name, description, leader_name, category, status, member_count, max_members, current_weekly_study, cover_emoji, cover_color")
          .neq("status", "archived")
          .order("created_at", { ascending: true });

        if (error) {
          console.error("[STUDY_GROUPS] Error loading groups:", error);
          return;
        }

        setGroups(data || []);
      } catch (err) {
        console.error("[STUDY_GROUPS] Error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadGroups();
  }, []);

  const activeGroups = groups.filter((g) => g.status === "active");
  const comingSoonGroups = groups.filter((g) => g.status === "coming_soon");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/dashboard" className="hover:text-gray-700 transition">Dashboard</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-800 font-medium">Bible Study Groups</span>
        </nav>

        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Study Groups</h1>
          <p className="text-gray-500 mt-1">Study the Bible with others.</p>
        </div>

        {loading ? (
          <div className="text-gray-500 text-sm">Loading groups...</div>
        ) : (
          <>
            {/* Active groups */}
            {activeGroups.length > 0 && (
              <div className="flex flex-col gap-4 mb-8">
                {activeGroups.map((group) => (
                  <Link key={group.id} href={`/study-groups/${group.id}`}>
                    <div
                      className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all duration-200"
                      style={{ borderLeftWidth: 4, borderLeftColor: group.cover_color || "#d4ecd4" }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Cover emoji */}
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                          style={{ backgroundColor: group.cover_color || "#d4ecd4" }}
                        >
                          {group.cover_emoji || "🤝"}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-lg font-bold text-gray-900">{group.name}</h2>
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Active</span>
                          </div>
                          {group.leader_name && (
                            <p className="text-sm text-gray-500 mt-0.5">Led by {group.leader_name}</p>
                          )}
                          {group.current_weekly_study && (
                            <p className="text-sm text-gray-700 mt-2 font-medium">
                              📖 {group.current_weekly_study}
                            </p>
                          )}
                          <div className="flex items-center gap-1 mt-2">
                            <span className="text-xs text-gray-400">
                              {group.member_count} / {group.max_members} members
                            </span>
                          </div>
                        </div>

                        {/* Arrow */}
                        <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Coming Soon section */}
            {comingSoonGroups.length > 0 && (
              <>
                <h2 className="text-base font-semibold text-gray-500 uppercase tracking-wide mb-3">Coming Soon</h2>
                <div className="flex flex-col gap-4">
                  {comingSoonGroups.map((group) => (
                    <div
                      key={group.id}
                      className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm opacity-60"
                      style={{ borderLeftWidth: 4, borderLeftColor: group.cover_color || "#e5e7eb" }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Cover emoji */}
                        <div
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 grayscale"
                          style={{ backgroundColor: group.cover_color || "#f3f4f6" }}
                        >
                          {group.cover_emoji || "🤝"}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-lg font-bold text-gray-600">{group.name}</h2>
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">Coming Soon</span>
                          </div>
                          {group.leader_name && (
                            <p className="text-sm text-gray-400 mt-0.5">Led by {group.leader_name}</p>
                          )}
                          <p className="text-sm text-gray-400 mt-2">This group isn't open yet. Check back soon.</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {groups.length === 0 && (
              <p className="text-gray-500 text-sm">No groups available yet. Check back soon.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
