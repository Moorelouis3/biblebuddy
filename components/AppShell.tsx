"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { ChatLouis } from "./ChatLouis";

const HIDDEN_ROUTES = ["/", "/login", "/signup", "/reset-password"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      setIsLoggedIn(!!session);
      setUserEmail(session?.user?.email ?? null);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
        setUserEmail(session?.user?.email ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const isBarePage = HIDDEN_ROUTES.includes(pathname ?? "/");

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <>
      {/* NAVBAR (hidden on landing/login/signup) */}
      {!isBarePage && (
        <header className="w-full bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-black"
            >
              Bible Buddy
            </Link>

            <nav className="flex items-center gap-3 text-xs sm:text-sm">
              {/* PUBLIC LINK */}
              <Link
                href="https://joinhopenation.com"
                target="_blank"
                className="px-3 py-1 rounded-full text-black hover:bg-gray-100"
              >
                Join Our Free Community
              </Link>

              {/* HOME LINK */}
              <Link
                href="/dashboard"
                className={`px-3 py-1 rounded-full ${
                  pathname?.startsWith("/dashboard")
                    ? "bg-sky-100 text-black"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                Home
              </Link>

              {/* HOW TO USE BIBLEBUDDY LINK */}
              <Link
                href="/lessons"
                className={`px-3 py-1 rounded-full ${
                  pathname?.startsWith("/lessons")
                    ? "bg-sky-100 text-black"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                How to Use BibleBuddy
              </Link>

              {/* SETTINGS LINK */}
              <Link
                href="/settings"
                className={`px-3 py-1 rounded-full ${
                  pathname?.startsWith("/settings")
                    ? "bg-sky-100 text-black"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                Settings
              </Link>

              {/* 🔥 ADMIN-ONLY ANALYTICS BUTTON */}
              {isLoggedIn && userEmail === "moorelouis3@gmail.com" && (
                <Link
                  href="admin/analytics"
                  className={`px-3 py-1 rounded-full ${
                    pathname?.startsWith("/analytics")
                      ? "bg-sky-100 text-black"
                      : "text-black hover:bg-gray-100"
                  }`}
                >
                  Analytics
                </Link>
              )}

              {/* LOGOUT */}
              {isLoggedIn && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="ml-1 px-3 py-1 rounded-full border border-gray-300 text-black hover:bg-gray-100"
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        </header>
      )}

      {/* PAGE CONTENT */}
      <main className={!isBarePage ? "pt-2 bg-gray-50 min-h-screen" : ""}>
        {children}
      </main>

      {/* CHAT LOUIS */}
      {!isBarePage && <ChatLouis />}
    </>
  );
}
