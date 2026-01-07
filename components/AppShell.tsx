"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { ChatLouis } from "./ChatLouis";
import { syncNotesCount, shouldSyncNotesCount } from "../lib/syncNotesCount";
import { syncChaptersCount, shouldSyncChaptersCount } from "../lib/syncChaptersCount";
import { trackUserActivity } from "../lib/trackUserActivity";
import { recalculateTotalActions } from "../lib/recalculateTotalActions";
import { FeedbackBanner } from "./FeedbackBanner";
import { FeedbackModal } from "./FeedbackModal";
import { ContactUsModal } from "./ContactUsModal";
import { NewMessageAlert } from "./NewMessageAlert";

const HIDDEN_ROUTES = ["/", "/login", "/signup", "/reset-password"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null);
  
  // Feedback system state
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  
  // Contact Us modal state
  const [showContactUsModal, setShowContactUsModal] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      setIsLoggedIn(!!session);
      setUserEmail(session?.user?.email ?? null);
      
      // Set userId and username for feedback system
      if (session?.user?.id) {
        setUserId(session.user.id);
        const meta: any = session.user.user_metadata || {};
        const extractedUsername =
          meta.firstName ||
          meta.first_name ||
          (session.user.email ? session.user.email.split("@")[0] : null) ||
          "User";
        setUsername(extractedUsername);
      } else {
        setUserId(null);
        setUsername("");
      }

      // Sync notes count on initial session check if user is logged in (non-blocking)
      if (session?.user?.id) {
        // Run all sync/tracking in background - don't block UI
        (async () => {
          try {
            // Track user activity (login/refresh) - once per 24 hours
            await trackUserActivity(session.user.id);
            
            // Recalculate total_actions from current counts
            await recalculateTotalActions(session.user.id);
            
            if (shouldSyncNotesCount(session.user.id)) {
              console.log("[APPSHELL] Syncing notes count on initial session check (new day detected)");
              await syncNotesCount(session.user.id);
            }
            
            // Sync chapters count on initial session check
            if (shouldSyncChaptersCount(session.user.id)) {
              console.log("[APPSHELL] Syncing chapters count on initial session check (new day detected)");
              await syncChaptersCount(session.user.id);
            }
          } catch (err) {
            console.error("[APPSHELL] Error in background sync:", err);
          }
        })();
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setIsLoggedIn(!!session);
        setUserEmail(session?.user?.email ?? null);
        
        // Set userId and username for feedback system
        if (session?.user?.id) {
          setUserId(session.user.id);
          const meta: any = session.user.user_metadata || {};
          const extractedUsername =
            meta.firstName ||
            meta.first_name ||
            (session.user.email ? session.user.email.split("@")[0] : null) ||
            "User";
          setUsername(extractedUsername);
        } else {
          setUserId(null);
          setUsername("");
        }
        
        // Sync notes count when user logs in or session changes (non-blocking)
        if (session?.user?.id) {
          // Run all sync/tracking in background - don't block UI
          (async () => {
            try {
              // Track user activity (login/refresh) - once per 24 hours
              await trackUserActivity(session.user.id);
              
              // Recalculate total_actions from current counts
              await recalculateTotalActions(session.user.id);
              
              // Check if we should sync (new day or first time)
              if (shouldSyncNotesCount(session.user.id)) {
                console.log("[APPSHELL] Syncing notes count on login/new day");
                await syncNotesCount(session.user.id);
              }
              
              // Sync chapters count when user logs in or session changes
              if (shouldSyncChaptersCount(session.user.id)) {
                console.log("[APPSHELL] Syncing chapters count on login/new day");
                await syncChaptersCount(session.user.id);
              }
            } catch (err) {
              console.error("[APPSHELL] Error in background sync:", err);
            }
          })();
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const isBarePage = HIDDEN_ROUTES.includes(pathname ?? "/");

  const isAdmin = isLoggedIn && userEmail === "moorelouis3@gmail.com";

  // Determine if navigation menu should be shown (only on content pages)
  // Shows on: Bible main page (/Bible), book pages (/Bible/[book]), chapter pages (/Bible/[book]/[chapter]),
  // Notes pages, People, Places, and Keywords pages
  // Hidden on: landing, login, signup, dashboard, and main home page
  const shouldShowNavMenu = isLoggedIn && !isBarePage && pathname && (
    pathname.startsWith("/Bible") ||  // Matches /Bible, /Bible/[book], /Bible/[book]/[chapter]
    pathname.startsWith("/notes") ||
    pathname.startsWith("/people-in-the-bible") ||
    pathname.startsWith("/places-in-the-bible") ||
    pathname.startsWith("/keywords-in-the-bible")
  ) && !pathname.startsWith("/dashboard");

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileMenuOpen(false);
      }
      if (
        navMenuRef.current &&
        !navMenuRef.current.contains(event.target as Node)
      ) {
        setIsNavMenuOpen(false);
      }
    }

    if (isProfileMenuOpen || isNavMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isProfileMenuOpen, isNavMenuOpen]);

  // Close dropdowns on Escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (isProfileMenuOpen) setIsProfileMenuOpen(false);
        if (isNavMenuOpen) setIsNavMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isProfileMenuOpen, isNavMenuOpen]);

  return (
    <>
      {/* NEW MESSAGE ALERT (admin only) */}
      {isAdmin && <NewMessageAlert />}

      {/* FEEDBACK BANNER (shows on all pages when conditions are met) */}
      {/* Banner visibility is controlled by FeedbackBanner component based on database state */}
      {isLoggedIn && userId && (
        <FeedbackBanner
          userId={userId}
          onBannerClick={() => setShowFeedbackModal(true)}
        />
      )}

      {/* FEEDBACK MODAL */}
      {isLoggedIn && userId && (
        <FeedbackModal
          userId={userId}
          username={username}
          isOpen={showFeedbackModal}
          onClose={() => {
            setShowFeedbackModal(false);
            // Don't dismiss banner on close - only on "No"
          }}
          onDoLater={() => {
            setShowFeedbackModal(false);
            // Banner stays visible
          }}
          onNo={() => {
            setShowFeedbackModal(false);
            setBannerDismissed(true); // Permanently hide banner
          }}
        />
      )}

      {/* CONTACT US MODAL */}
      {isLoggedIn && userId && (
        <ContactUsModal
          userId={userId}
          username={username}
          isOpen={showContactUsModal}
          onClose={() => setShowContactUsModal(false)}
        />
      )}

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

            <div className="flex items-center gap-2">
              {/* NAVIGATION DROPDOWN MENU */}
              {shouldShowNavMenu && (
                <div className="relative" ref={navMenuRef}>
                  <button
                    type="button"
                    onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-all duration-150 active:scale-[0.98] shadow-sm"
                    aria-label="Navigation menu"
                    aria-expanded={isNavMenuOpen}
                  >
                    Navigation
                  </button>

                  {/* NAVIGATION DROPDOWN */}
                  {isNavMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-lg border border-gray-200 py-1.5 z-50">
                      {/* BIBLE */}
                      <Link
                        href="/Bible"
                        onClick={(e) => {
                          if (pathname?.startsWith("/Bible")) {
                            e.preventDefault();
                          } else {
                            setIsNavMenuOpen(false);
                          }
                        }}
                        className={`block px-4 py-2.5 text-sm transition-all duration-150 ${
                          pathname?.startsWith("/Bible")
                            ? "bg-blue-50 text-blue-700 font-medium cursor-not-allowed"
                            : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 active:scale-[0.98]"
                        }`}
                      >
                        Bible
                      </Link>

                      {/* NOTES */}
                      <Link
                        href="/notes"
                        onClick={(e) => {
                          if (pathname?.startsWith("/notes")) {
                            e.preventDefault();
                          } else {
                            setIsNavMenuOpen(false);
                          }
                        }}
                        className={`block px-4 py-2.5 text-sm transition-all duration-150 ${
                          pathname?.startsWith("/notes")
                            ? "bg-purple-50 text-purple-700 font-medium cursor-not-allowed"
                            : "text-gray-700 hover:bg-purple-50 hover:text-purple-600 active:scale-[0.98]"
                        }`}
                      >
                        Notes
                      </Link>

                      {/* PEOPLE IN THE BIBLE */}
                      <Link
                        href="/people-in-the-bible"
                        onClick={(e) => {
                          if (pathname?.startsWith("/people-in-the-bible")) {
                            e.preventDefault();
                          } else {
                            setIsNavMenuOpen(false);
                          }
                        }}
                        className={`block px-4 py-2.5 text-sm transition-all duration-150 ${
                          pathname?.startsWith("/people-in-the-bible")
                            ? "bg-green-50 text-green-700 font-medium cursor-not-allowed"
                            : "text-gray-700 hover:bg-green-50 hover:text-green-600 active:scale-[0.98]"
                        }`}
                      >
                        People in the Bible
                      </Link>

                      {/* PLACES IN THE BIBLE */}
                      <Link
                        href="/places-in-the-bible"
                        onClick={(e) => {
                          if (pathname?.startsWith("/places-in-the-bible")) {
                            e.preventDefault();
                          } else {
                            setIsNavMenuOpen(false);
                          }
                        }}
                        className={`block px-4 py-2.5 text-sm transition-all duration-150 ${
                          pathname?.startsWith("/places-in-the-bible")
                            ? "bg-amber-50 text-amber-700 font-medium cursor-not-allowed"
                            : "text-gray-700 hover:bg-amber-50 hover:text-amber-600 active:scale-[0.98]"
                        }`}
                      >
                        Places in the Bible
                      </Link>

                      {/* KEYWORDS IN THE BIBLE */}
                      <Link
                        href="/keywords-in-the-bible"
                        onClick={(e) => {
                          if (pathname?.startsWith("/keywords-in-the-bible")) {
                            e.preventDefault();
                          } else {
                            setIsNavMenuOpen(false);
                          }
                        }}
                        className={`block px-4 py-2.5 text-sm transition-all duration-150 ${
                          pathname?.startsWith("/keywords-in-the-bible")
                            ? "bg-red-50 text-red-700 font-medium cursor-not-allowed"
                            : "text-gray-700 hover:bg-red-50 hover:text-red-600 active:scale-[0.98]"
                        }`}
                      >
                        Keywords in the Bible
                      </Link>
                    </div>
                  )}
                </div>
              )}

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

                    {/* CONTACT US */}
                    <button
                      type="button"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        setShowContactUsModal(true);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      👉 Contact Us
                    </button>

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

                    {/* UPDATES */}
                    <Link
                      href="/updates"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className={`block px-4 py-2 text-sm ${
                        pathname?.startsWith("/updates")
                          ? "bg-sky-100 text-black font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Updates
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
