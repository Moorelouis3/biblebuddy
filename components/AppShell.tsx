"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { ChatLouis } from "./ChatLouis";

const HIDDEN_ROUTES = ["/", "/login", "/signup"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session);
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
      {/* NAVBAR (hide on landing / login / signup) */}
      {!isBarePage && (
        <header className="w-full bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-black"
            >
              The Bible Buddy
            </Link>

            <nav className="flex items-center gap-3 text-xs sm:text-sm">
              <Link
                href="https://joinhopenation.com"
                target="_blank"
                className="px-3 py-1 rounded-full text-black hover:bg-gray-100"
              >
                Join Our Free Community
              </Link>

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

      {/* CHAT LOUIS (hidden on landing / login / signup) */}
      {!isBarePage && <ChatLouis />}
    </>
  );
}
