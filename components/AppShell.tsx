"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { ChatLouis } from "./ChatLouis";

const HIDDEN_ROUTES = ["/", "/login", "/signup", "/reset-password"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

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

  const isAdmin = isLoggedIn && userEmail === "moorelouis3@gmail.com";

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
    }

    if (isProfileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isProfileMenuOpen]);

  // Close dropdown on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape" && isProfileMenuOpen) {
        setIsProfileMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isProfileMenuOpen]);

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

            {/* PROFILE DROPDOWN MENU */}
            {isLoggedIn && (
              <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors"
                  aria-label="Profile menu"
                  aria-expanded={isProfileMenuOpen}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>

                {/* DROPDOWN MENU */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    {/* HOME */}
                    <Link
                      href="/dashboard"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className={`block px-4 py-2 text-sm ${
                        pathname?.startsWith("/dashboard")
                          ? "bg-sky-100 text-black font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Home
                    </Link>

                    {/* PROFILE */}
                    <Link
                      href="/profile"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className={`block px-4 py-2 text-sm ${
                        pathname?.startsWith("/profile")
                          ? "bg-sky-100 text-black font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Profile
                    </Link>

                    {/* SETTINGS */}
                    <Link
                      href="/settings"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className={`block px-4 py-2 text-sm ${
                        pathname?.startsWith("/settings")
                          ? "bg-sky-100 text-black font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Settings
                    </Link>

                    {/* HOW TO USE BIBLEBUDDY */}
                    <Link
                      href="/lessons"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className={`block px-4 py-2 text-sm ${
                        pathname?.startsWith("/lessons")
                          ? "bg-sky-100 text-black font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      How to Use
                    </Link>

                    {/* JOIN OUR FREE COMMUNITY */}
                    <a
                      href="https://joinhopenation.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Join our Free Community
                    </a>

                    {/* ANALYTICS (ADMIN ONLY) */}
                    {isAdmin && (
                      <Link
                        href="/admin/analytics"
                        onClick={() => setIsProfileMenuOpen(false)}
                        className={`block px-4 py-2 text-sm ${
                          pathname?.startsWith("/admin/analytics")
                            ? "bg-sky-100 text-black font-medium"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        Analytics
                      </Link>
                    )}

                    {/* DIVIDER */}
                    <div className="border-t border-gray-200 my-1" />

                    {/* LOGOUT */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        handleLogout();
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
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
