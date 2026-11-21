"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { DEFAULT_LAYOUT, sanitizeLayout, type HomeLayout } from "./homeWidgets";

/**
 * Where a reader's Home layout is kept (lib/homeWidgets.ts says what it is).
 *
 * The account is the truth: auth user_metadata.home_layout, written with the
 * reader's own session, so the layout follows them to every device. The same
 * place the Bible Cover choice lives. A copy sits on the device so Home paints
 * in the reader's order straight away instead of flashing the default first.
 *
 * Without a signed-in reader (guests are off, but the code path stays honest)
 * the device copy is the only copy.
 */

const deviceKey = (userId: string | null) => `bb:home-layout:v1:${userId ?? "guest"}`;

function readDevice(userId: string | null): HomeLayout | null {
  try {
    return sanitizeLayout(JSON.parse(window.localStorage.getItem(deviceKey(userId)) || "null"));
  } catch {
    return null;
  }
}

function writeDevice(userId: string | null, layout: HomeLayout | null) {
  try {
    if (layout) window.localStorage.setItem(deviceKey(userId), JSON.stringify(layout));
    else window.localStorage.removeItem(deviceKey(userId));
  } catch {
    /* storage blocked: the account copy still saves */
  }
}

export function useHomeLayout(userId: string | null) {
  const [layout, setLayout] = useState<HomeLayout>(DEFAULT_LAYOUT);
  /** The reader has a layout of their own (not the default). */
  const [customized, setCustomized] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const local = readDevice(userId);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLayout(local ?? DEFAULT_LAYOUT);
    setCustomized(Boolean(local));
    if (!userId) return;
    void supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      const meta = data.session?.user?.user_metadata as Record<string, unknown> | undefined;
      if (!meta || !("home_layout" in meta)) return;
      // null on the account means "Reset to default" was pressed elsewhere.
      const saved = meta.home_layout === null ? null : sanitizeLayout(meta.home_layout);
      setLayout(saved ?? DEFAULT_LAYOUT);
      setCustomized(Boolean(saved));
      writeDevice(userId, saved);
    });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  /** Done: keep this layout on the device and on the account. */
  const save = useCallback(
    async (next: HomeLayout) => {
      setLayout(next);
      setCustomized(true);
      writeDevice(userId, next);
      if (!userId) return { ok: true };
      const { error } = await supabase.auth.updateUser({ data: { home_layout: next } });
      return { ok: !error };
    },
    [userId],
  );

  /** Reset to Default: forget the custom layout everywhere. */
  const reset = useCallback(async () => {
    setLayout(DEFAULT_LAYOUT);
    setCustomized(false);
    writeDevice(userId, null);
    if (!userId) return { ok: true };
    const { error } = await supabase.auth.updateUser({ data: { home_layout: null } });
    return { ok: !error };
  }, [userId]);

  return { layout, customized, save, reset };
}
