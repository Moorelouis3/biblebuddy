"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type SupabaseUserState = {
  // True until the auth check resolves. Components that render different
  // things for visitors vs members should render neither while loading to
  // avoid flashing the wrong state.
  loading: boolean;
  userId: string | null;
};

export function useSupabaseUser(): SupabaseUserState {
  const [state, setState] = useState<SupabaseUserState>({ loading: true, userId: null });

  useEffect(() => {
    let cancelled = false;

    void supabase.auth
      .getUser()
      .then(({ data }) => {
        if (!cancelled) setState({ loading: false, userId: data.user?.id ?? null });
      })
      .catch(() => {
        if (!cancelled) setState({ loading: false, userId: null });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
