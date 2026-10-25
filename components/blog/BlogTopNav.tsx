"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { isNativeApp } from "@/lib/nativeApp";

/**
 * The blog's top menu.
 *
 * The blog is where strangers arrive from search, so a signed-out visitor
 * gets the way in: Start Studying, which creates a guest and opens the app.
 * There is no account to sign up for. Someone already signed
 * in is inside the product, so they get the app's destinations instead of an
 * invitation to make an account they already have.
 *
 * Signed-out is the first paint in both cases: the check runs in the browser,
 * and guessing wrong would flash app links at a visitor who has no account.
 */
export default function BlogTopNav() {
  const [signedIn, setSignedIn] = useState(false);
  const [isNative, setIsNative] = useState(false);

  // In the app this header is the website intruding: the shell already has
  // the bottom tabs, and a Start Studying button makes no sense to someone
  // who is signed in and reading inside it (Louis, 2026-10-17).
  useEffect(() => {
    setIsNative(isNativeApp());
  }, []);

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const { data } = await supabase.auth.getUser();
        if (!cancelled) setSignedIn(Boolean(data?.user));
      } catch {
        // A failed check just leaves the signed-out menu, which is safe.
      }
    })();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!cancelled) setSignedIn(Boolean(session?.user));
    });

    return () => {
      cancelled = true;
      listener?.subscription.unsubscribe();
    };
  }, []);

  if (isNative) return null;

  return (
    <header className="mx-auto flex w-full max-w-[860px] items-center justify-between gap-3 px-5 py-4 sm:px-8">
      <Link href={signedIn ? "/dashboard" : "/"} className="flex shrink-0 items-center gap-2 text-[#07162f]">
        <Image
          src="/TherealiconforBB.png"
          alt=""
          width={28}
          height={28}
          className="h-6 w-6 rounded-md object-cover sm:h-7 sm:w-7"
        />
        <span className="whitespace-nowrap text-base font-black tracking-tight sm:text-lg">Bible Buddy</span>
      </Link>
      <nav className="flex items-center gap-3 whitespace-nowrap text-[13px] font-black text-[#07162f] sm:gap-7 sm:text-sm">
        {signedIn ? (
          <>
            <Link href="/blog" className="transition hover:text-[#0056fd]">Blog</Link>
            <Link href="/bible/genesis/1" className="hidden transition hover:text-[#0056fd] sm:inline">Bible</Link>
            <Link href="/plans" className="transition hover:text-[#0056fd]">Plans</Link>
            <Link
              href="/dashboard"
              className="rounded-full bg-[#0056fd] px-3.5 py-1.5 text-white transition hover:bg-[#0049d8]"
            >
              My&nbsp;Dashboard
            </Link>
          </>
        ) : (
          <>
            <a href="/#about" className="transition hover:text-[#0056fd]">About</a>
            <Link href="/blog" className="transition hover:text-[#0056fd]">Blog</Link>
            {/* /start 404s since guests were turned off on 2026-10-06 - see
                components/blog/PromoSlot.tsx. Signup is the door now. */}
            <Link
              href="/signup?src=blog&promo=nav"
              className="rounded-full bg-[#0056fd] px-3.5 py-1.5 text-white transition hover:bg-[#0049d8]"
            >
              Start&nbsp;Studying
            </Link>
            <Link href="/login" className="transition hover:text-[#0056fd]">Login</Link>
          </>
        )}
      </nav>
    </header>
  );
}
