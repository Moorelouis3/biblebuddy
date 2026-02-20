"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { supabase } from "../lib/supabaseClient";
import { ChatLouis } from "./ChatLouis";
import { syncNotesCount, shouldSyncNotesCount } from "../lib/syncNotesCount";
import { syncChaptersCount, shouldSyncChaptersCount } from "../lib/syncChaptersCount";
import { trackUserActivity } from "../lib/trackUserActivity";
import { recalculateTotalActions } from "../lib/recalculateTotalActions";
import { FeedbackModal } from "./FeedbackModal";
import { ContactUsModal } from "./ContactUsModal";
import { NewMessageAlert } from "./NewMessageAlert";
import { OnboardingModal } from "./OnboardingModal";
import { FeatureRenderPriorityProvider } from "./FeatureRenderPriorityContext";

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
  const [feedbackChecked, setFeedbackChecked] = useState(false);
  
  // Contact Us modal state
  const [showContactUsModal, setShowContactUsModal] = useState(false);
  
  // Onboarding state
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [initialTrafficSource, setInitialTrafficSource] = useState<string | null>(null);
  const [initialBibleExperienceLevel, setInitialBibleExperienceLevel] = useState<string | null>(null);
  const [featureToursEnabled, setFeatureToursEnabled] = useState(false);

  async function checkOnboardingStatus(currentUserId: string) {
    try {
      const { data: profileStats, error: profileStatsError } = await supabase
        .from("profile_stats")
        .select("onboarding_completed, traffic_source, bible_experience_level")
        .eq("user_id", currentUserId)
        .maybeSingle();

      if (profileStatsError) {
        console.error("[ONBOARDING] Error loading onboarding status:", profileStatsError);
        setShowOnboardingModal(true);
        setFeatureToursEnabled(false);
        setInitialTrafficSource(null);
        setInitialBibleExperienceLevel(null);
        return;
      }

      if (!profileStats) {
        const { error: upsertError } = await supabase.from("profile_stats").upsert(
          {
            user_id: currentUserId,
            onboarding_completed: false,
            traffic_source: null,
            bible_experience_level: null,
          },
          { onConflict: "user_id" }
        );

        if (upsertError) {
          console.error("[ONBOARDING] Error creating profile_stats row:", upsertError);
        }

        setShowOnboardingModal(true);
        setFeatureToursEnabled(false);
        setInitialTrafficSource(null);
        setInitialBibleExperienceLevel(null);
        return;
      }

      setInitialTrafficSource(profileStats.traffic_source ?? null);
      setInitialBibleExperienceLevel(profileStats.bible_experience_level ?? null);
      const onboardingCompleted = profileStats.onboarding_completed === true;
      setShowOnboardingModal(!onboardingCompleted);
      setFeatureToursEnabled(onboardingCompleted);
    } catch (_err) {
      console.error("[ONBOARDING] Unexpected onboarding status error:", _err);
      setShowOnboardingModal(true);
      setFeatureToursEnabled(false);
      setInitialTrafficSource(null);
      setInitialBibleExperienceLevel(null);
      return;
    }
  }

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
        void checkOnboardingStatus(session.user.id);
      } else {
        setUserId(null);
        setUsername("");
        setShowOnboardingModal(false);
        setFeatureToursEnabled(false);
        setInitialTrafficSource(null);
        setInitialBibleExperienceLevel(null);
      }

      // Sync notes count on initial session check if user is logged in (non-blocking)
      if (session?.user?.id) {
        // Run all sync/tracking in background - don't block UI
        (async () => {
          try {
            // Temporarily disabled for stability:
            // await checkProExpiration(session.user.id);
            
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
            console.warn("[APPSHELL] Background sync skipped due to transient issue.");
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
          void checkOnboardingStatus(session.user.id);
        } else {
          setUserId(null);
          setUsername("");
          setShowOnboardingModal(false);
          setFeatureToursEnabled(false);
          setInitialTrafficSource(null);
          setInitialBibleExperienceLevel(null);
        }
        
        // Sync notes count when user logs in or session changes (non-blocking)
        if (session?.user?.id) {
          // Run all sync/tracking in background - don't block UI
          (async () => {
            try {
              // Temporarily disabled for stability:
              // await checkProExpiration(session.user.id);
              
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
              console.warn("[APPSHELL] Background sync skipped due to transient issue.");
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

  // Check feedback eligibility and show modal directly (no banner)
  useEffect(() => {
    async function checkFeedbackEligibility() {
      if (!userId || feedbackChecked || showFeedbackModal) {
        return;
      }

      try {
        // Check if user has 5+ total actions
        const { data: profileStats, error: statsError } = await supabase
          .from("profile_stats")
          .select("total_actions")
          .eq("user_id", userId)
          .maybeSingle();

        if (statsError) {
          console.warn("[FEEDBACK] Profile stats unavailable; skipping feedback check.");
          setFeedbackChecked(true);
          return;
        }

        const totalActions = profileStats?.total_actions || 0;
        
        if (totalActions < 5) {
          setFeedbackChecked(true);
          return;
        }

        // Check if user has already submitted feedback
        const { data: existingFeedback, error: feedbackError } = await supabase
          .from("user_feedback")
          .select("happiness_rating, usefulness_rating, usage_frequency, recommendation_likelihood, last_dismissed_at, permanently_dismissed")
          .eq("user_id", userId)
          .maybeSingle();

        if (feedbackError && feedbackError.code !== 'PGRST116') {
          console.warn("[FEEDBACK] Feedback lookup unavailable; skipping feedback modal.");
          setFeedbackChecked(true);
          return;
        }

        // Check if user has submitted feedback (has any rating filled)
        const hasSubmitted = existingFeedback?.happiness_rating || 
                            existingFeedback?.usefulness_rating || 
                            existingFeedback?.usage_frequency || 
                            existingFeedback?.recommendation_likelihood;
        
        if (hasSubmitted) {
          // User has submitted feedback, never show again
          setFeedbackChecked(true);
          return;
        }

        // If user clicked "No" (permanently dismissed), never show again
        if (existingFeedback?.permanently_dismissed) {
          setFeedbackChecked(true);
          return;
        }

        // If user clicked "Do later", check if 30 days have passed
        if (existingFeedback?.last_dismissed_at && !existingFeedback?.permanently_dismissed) {
          const dismissedDate = new Date(existingFeedback.last_dismissed_at);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
          
          if (dismissedDate > thirtyDaysAgo) {
            // Still within 30 day window, don't show
            setFeedbackChecked(true);
            return;
          }
        }

        // All conditions met - show modal directly
        setShowFeedbackModal(true);
        setFeedbackChecked(true);
      } catch (err) {
        console.warn("[FEEDBACK] Eligibility check skipped due to transient issue.");
        setFeedbackChecked(true);
      }
    }

    if (userId && isLoggedIn) {
      checkFeedbackEligibility();
    }
  }, [userId, isLoggedIn, feedbackChecked, showFeedbackModal]);

  return (
    <FeatureRenderPriorityProvider value={{ featureToursEnabled }}>
      {/* NEW MESSAGE ALERT (admin only) */}
      {isAdmin && <NewMessageAlert />}

      {/* ONBOARDING MODAL */}
      {userId && (
        <OnboardingModal
          isOpen={showOnboardingModal}
          userId={userId}
          initialTrafficSource={initialTrafficSource}
          initialBibleExperienceLevel={initialBibleExperienceLevel}
          onFinished={(upgrade) => {
            setShowOnboardingModal(false);
            setFeatureToursEnabled(true);
            if (upgrade) {
              router.push("/upgrade");
            } else {
              router.replace("/dashboard");
              router.refresh();
            }
          }}
        />
      )}


      {/* FEEDBACK MODAL */}
      {isLoggedIn && userId && !showOnboardingModal && (
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
      {isLoggedIn && userId && !showOnboardingModal && (
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
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <Image
                  src="/Biblelogo.png"
                  alt="Bible Buddy Logo"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <div>
                  <div className="text-sm font-bold text-gray-900 tracking-tight">
                    Bible Buddy
                  </div>
                  <div className="text-[10px] text-gray-500 -mt-0.5">Powered by Hope Nation</div>
                </div>
              </Link>
              <a
                href="https://joinhopenation.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-gray-500 hover:text-blue-600 transition-colors"
              >
                Visit Hope Nation
              </a>
            </div>

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

                    {/* NOTES */}
                    <Link
                      href="/notes"
                      onClick={() => setIsProfileMenuOpen(false)}
                      className={`block px-4 py-2 text-sm ${
                        pathname?.startsWith("/notes")
                          ? "bg-sky-100 text-black font-medium"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Notes
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
      <main className={!isBarePage ? "pt-2 pb-2 bg-gray-50 min-h-screen" : ""}>
        {children}
      </main>

      {/* CHAT LOUIS - always rendered in AppShell */}
      {!isBarePage && <ChatLouis />}
    </FeatureRenderPriorityProvider>
  );
}
