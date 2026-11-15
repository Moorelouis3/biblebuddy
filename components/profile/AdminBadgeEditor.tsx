"use client";

/**
 * Change somebody's label (Teacher, Moderator, Top Buddy...) from their
 * profile. Louis only.
 *
 * This control lived on the old profile page (app/profile/[userId]/page.tsx).
 * When every profile link was pointed at the feed instead (2026-10-25,
 * /bb-feed?user=<id>), that page started forwarding straight there, and the
 * control became unreachable without anybody removing it (Louis, 2026-11-15:
 * "the ability to change peoples labels on their profile is no longer there").
 * It belongs on the profile people actually land on, which is
 * ProfileSummaryCard. The old page's copy is still there for the one way in
 * that is left (?details=1 on your own profile); both call the same route.
 *
 * Nothing here decides who may change a label: /api/admin/member-badge checks
 * the signed-in account itself and refuses everybody else. This only decides
 * whether to draw the control, so nobody else sees a button that would fail.
 */

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { CUSTOM_MEMBER_BADGE_OPTIONS, normalizeCustomMemberBadge } from "@/lib/userBadges";

const ADMIN_EMAIL = "moorelouis3@gmail.com";

export default function AdminBadgeEditor({
  userId,
  currentBadge,
  onSaved,
}: {
  userId: string;
  currentBadge: string | null;
  onSaved: (saved: { memberBadge: string | null; isPaid?: boolean; proExpiresAt?: string | null }) => void;
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [draft, setDraft] = useState(normalizeCustomMemberBadge(currentBadge) || "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) setIsAdmin(data.session?.user.email === ADMIN_EMAIL);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // The profile's own label arrives after the card has drawn.
  useEffect(() => {
    setDraft(normalizeCustomMemberBadge(currentBadge) || "");
  }, [currentBadge]);

  if (!isAdmin) return null;

  async function save() {
    setSaving(true);
    setMessage(null);
    try {
      const token = (await supabase.auth.getSession()).data.session?.access_token;
      if (!token) {
        setMessage("Could not verify your session. Sign in again.");
        return;
      }
      // Absolute URL: inside the iOS app a relative fetch can hang forever.
      const response = await fetch(`${window.location.origin}/api/admin/member-badge`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ userId, memberBadge: normalizeCustomMemberBadge(draft) }),
      });
      const payload = (await response.json().catch(() => ({}))) as {
        error?: string;
        memberBadge?: string | null;
        isPaid?: boolean;
        proExpiresAt?: string | null;
      };
      if (!response.ok) {
        setMessage(payload.error || "Could not save the label.");
        return;
      }
      onSaved({ memberBadge: payload.memberBadge || null, isPaid: payload.isPaid, proExpiresAt: payload.proExpiresAt });
      setMessage("Label updated.");
    } catch {
      setMessage("Could not save the label.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mt-4 rounded-2xl border border-gray-200 bg-gray-50 p-3.5">
      <label htmlFor={`admin-badge-${userId}`} className="block text-sm font-semibold text-gray-900">
        Label <span className="font-normal text-gray-500">(only you see this)</span>
      </label>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <select
          id={`admin-badge-${userId}`}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="min-h-[44px] w-full flex-1 rounded-xl border border-gray-200 bg-white px-3 text-sm text-gray-900 outline-none focus-visible:ring-2 focus-visible:ring-[#0056fd]"
        >
          {CUSTOM_MEMBER_BADGE_OPTIONS.map((option) => (
            <option key={option.value || "none"} value={option.value}>
              {option.value ? option.label : "No label"}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => void save()}
          disabled={saving}
          className="min-h-[44px] rounded-xl px-5 text-sm font-bold text-white transition disabled:opacity-60"
          style={{ backgroundColor: "#0056fd" }}
        >
          {saving ? "Saving..." : "Save label"}
        </button>
      </div>
      {message ? (
        <p role="status" className="mt-2 text-xs font-semibold text-gray-600">
          {message}
        </p>
      ) : null}
    </div>
  );
}
