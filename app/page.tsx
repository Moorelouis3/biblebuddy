"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";

export default function LandingPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push("/dashboard");
        return;
      }
      setIsChecking(false);
    };
    checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push("/dashboard");
      } else {
        setIsChecking(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setShowSuccessModal(false);

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: password.trim(),
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;
    if (!user) {
      setError("Signup failed: no user returned.");
      setLoading(false);
      return;
    }

    try {
      const { error: insertError } = await supabase.from("user_signups").insert({
        user_id: user.id,
        email: user.email,
      });

      if (insertError) {
        console.error("Analytics insert failed (non-blocking):", insertError);
      }
    } catch (analyticsError) {
      console.error("Analytics insert error (non-blocking):", analyticsError);
    }

    try {
      const username = firstName.trim() || user.email?.split("@")[0] || "New User";

      const { error: actionError } = await supabase.from("master_actions").insert({
        user_id: user.id,
        username,
        action_type: ACTION_TYPE.user_signup,
        action_label: "Signed up for Bible Buddy",
        created_at: new Date().toISOString(),
      });

      if (actionError) {
        console.error("Signup action tracking failed (non-blocking):", actionError);
      }
    } catch (actionTrackingError) {
      console.error("Signup action tracking error (non-blocking):", actionTrackingError);
    }

    try {
      await fetch("/api/send-welcome-dm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, firstName: firstName.trim(), lastName: lastName.trim() }),
      });
    } catch (err) {
      console.error("Welcome DM failed (non-blocking):", err);
    }

    setLoading(false);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setShowSuccessModal(true);
  }

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:py-6">
        <div className="flex items-center gap-3">
          <Image
            src="/louis/louis-bible.png"
            alt="Bible Buddy Logo"
            width={32}
            height={32}
            className="h-8 w-8"
          />
          <div className="text-lg font-bold tracking-tight text-gray-900 md:text-xl">Bible Buddy</div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-700 transition hover:text-gray-900 md:text-base"
          >
            Log In
          </Link>
          <button
            type="button"
            onClick={() => setShowSignupModal(true)}
            className="inline-block rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 md:px-6 md:py-2.5 md:text-base"
          >
            Sign Up →
          </button>
        </div>
      </header>

      <main className="flex w-full justify-center px-4 pb-4 pt-8 md:pb-6 md:pt-10">
        <div className="mx-auto w-full max-w-5xl">
          <div className="mb-8 text-center md:mb-10">
            <h1 className="mb-3 text-3xl font-bold leading-tight text-gray-900 md:mb-4 md:text-4xl lg:text-5xl">
              Understand the Bible with Bible Buddy
            </h1>
            <p className="mx-auto max-w-2xl text-base text-gray-600 md:text-lg">
              Read Scripture, understand hard chapters, learn the people and places behind the story,
              and grow with guided tools, weekly Bible Study Group lessons, and real support that
              help the Bible finally make sense.
            </p>
          </div>

          <div className="mb-2 md:mb-2">
            <div className="relative mx-auto max-w-4xl">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-50/50 to-gray-50/50 blur-2xl" />

              <div className="p-2 md:p-3">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <Image
                    src="/LandingPage1.png"
                    alt="Bible Buddy preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 900px"
                    className="absolute left-0 top-0 h-full w-full object-contain"
                    style={{
                      WebkitMaskImage: "radial-gradient(120% 120% at 50% 40%, #000 70%, transparent 100%)",
                      maskImage: "radial-gradient(120% 120% at 50% 40%, #000 70%, transparent 100%)",
                    }}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-3 text-center md:mb-4">
            <button
              type="button"
              onClick={() => setShowSignupModal(true)}
              className="inline-block rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-blue-700 md:px-10 md:py-4 md:text-lg"
            >
              Start Studying Free →
            </button>
            <p className="mt-2 text-xs text-gray-500 md:text-sm">Create your Bible Buddy account now</p>
          </div>
        </div>
      </main>

      <section className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-12 pt-0 md:pb-16">
          <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-3 md:gap-12">
            <div className="space-y-3">
              <svg
                viewBox="0 0 24 24"
                className="mx-auto h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2 6.5C2 5.12 3.12 4 4.5 4H12a3 3 0 0 1 3 3v13H4.5A2.5 2.5 0 0 0 2 22Z" />
                <path d="M12 4h7.5A2.5 2.5 0 0 1 22 6.5V22H15" />
              </svg>
              <h3 className="text-base font-semibold text-gray-900 md:text-lg">Interactive Bible</h3>
              <p className="text-sm text-gray-600 md:text-base">
                Read the Bible in a clean, focused way, save your place, and keep moving chapter by
                chapter without losing your flow.
              </p>
            </div>

            <div className="space-y-3">
              <svg
                viewBox="0 0 24 24"
                className="mx-auto h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a8 8 0 1 0-14.8 0" />
                <path d="M12 2v2" />
              </svg>
              <h3 className="text-base font-semibold text-gray-900 md:text-lg">Guided Studies</h3>
              <p className="text-sm text-gray-600 md:text-base">
                Follow devotionals, reading plans, and weekly Bible Study Group lessons with
                reading, trivia, and reflection so you always know what to study next.
              </p>
            </div>

            <div className="space-y-3">
              <svg
                viewBox="0 0 24 24"
                className="mx-auto h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4" />
                <path d="M12 8h.01" />
              </svg>
              <h3 className="text-base font-semibold text-gray-900 md:text-lg">Bible Help</h3>
              <p className="text-sm text-gray-600 md:text-base">
                Tap people, places, and key Bible words to get fast context right inside your
                reading, so hard passages start becoming clear.
              </p>
            </div>

            <div className="space-y-3">
              <svg
                viewBox="0 0 24 24"
                className="mx-auto h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="6" y="4" width="12" height="16" rx="2" />
                <path d="M9 8h6" />
                <path d="M9 12h6" />
                <path d="M9 16h4" />
              </svg>
              <h3 className="text-base font-semibold text-gray-900 md:text-lg">Chapter Reviews</h3>
              <p className="text-sm text-gray-600 md:text-base">
                Get a plain-language review of what happened in the chapter, why it matters, and how
                it fits into the larger story of Scripture.
              </p>
            </div>

            <div className="space-y-3">
              <svg
                viewBox="0 0 24 24"
                className="mx-auto h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <h3 className="text-base font-semibold text-gray-900 md:text-lg">Bible Trivia</h3>
              <p className="text-sm text-gray-600 md:text-base">
                Lock in what you are learning with Bible trivia that helps you remember the people,
                chapters, and stories you just studied.
              </p>
            </div>

            <div className="space-y-3">
              <svg
                viewBox="0 0 24 24"
                className="mx-auto h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 2c1.8 3.6 1.5 6.1 0 8.5 2.7-.2 4.5-2.1 4.5-4.8 3.3 3 3.7 8.1.6 11.6-2.9 3.3-8.2 3.4-11.1.3C2.1 14 2.6 8.9 6 6c0 2.7 1.9 4.6 4.6 4.8" />
              </svg>
              <h3 className="text-base font-semibold text-gray-900 md:text-lg">Streak Tracker</h3>
              <p className="text-sm text-gray-600 md:text-base">
                Stay consistent, build a real habit, and keep your momentum going as you spend time
                in the Bible day after day.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-blue-100 bg-blue-50/60 px-6 py-7 text-center">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Study with the Bible Study Group each week</h2>
            <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-gray-600 md:text-base">
              Bible Buddy is not just for solo reading. Join the Bible Study Group for weekly lessons
              that guide you through a live series with chapter reading, trivia, reflection, and
              discussion, so you can study the Bible with structure and with other people.
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-4 border-t border-gray-200 bg-white text-gray-700">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 md:grid-cols-3 md:py-12">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-900">
              Connect with me
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.youtube.com/@BibleStudyWithLouis"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-blue-600"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/biblestudywithlouis"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-blue-600"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.threads.net/@biblestudywithlouis"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-blue-600"
                >
                  Threads
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@biblestudywithlouis"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-blue-600"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=100085924826685"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-blue-600"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-900">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="transition-colors hover:text-blue-600">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition-colors hover:text-blue-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition-colors hover:text-blue-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-sm md:text-base">
            <h3 className="mb-3 text-lg font-semibold text-gray-900">Bible Buddy</h3>
            <p className="max-w-sm leading-relaxed text-gray-600">
              A Bible study app built to help you read Scripture with more clarity, better context,
              and a stronger daily study habit.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200">
          <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-gray-500 md:text-right md:text-sm">
            © 2026 Bible Buddy
          </div>
        </div>
      </footer>

      {showSignupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl md:p-7">
            <button
              type="button"
              onClick={() => setShowSignupModal(false)}
              className="absolute right-4 top-3 text-sm text-gray-400 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="mb-1 text-center text-xl font-bold text-gray-900 md:text-2xl">
              Create your free Bible Buddy account
            </h2>
            <p className="mb-4 text-center text-xs text-gray-500">Free to use. No credit card required.</p>

            <form onSubmit={handleSubmit} className="mt-2 space-y-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">First Name</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">Last Name</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                />
              </div>

              {error && (
                <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create Free Account"}
              </button>

              <p className="mt-1.5 text-center text-[10px] text-gray-500">
                By creating an account, you agree to the{" "}
                <Link href="/terms" className="underline underline-offset-2 hover:text-blue-600">
                  terms of service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-blue-600">
                  privacy policy
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">Account created successfully!</h2>
              <p className="mb-6 text-sm text-gray-600">
                Please check your email to confirm your account before logging in.
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setShowSignupModal(false);
                }}
                className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
