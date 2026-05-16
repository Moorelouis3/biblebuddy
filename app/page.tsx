"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";
import { BIBLE_STUDY_SERIES_CATALOG } from "@/lib/bibleStudiesCatalog";

const taskSteps = [
  {
    icon: "📕",
    title: "Read Chapter Intro",
    copy: "Begin with a clear intro that shows what the chapter is about before you start reading.",
  },
  {
    icon: "✝️",
    title: "Read the Chapter",
    copy: "Read Scripture in a focused Bible reader built for highlighting, saving, and keeping your place.",
  },
  {
    icon: "📝",
    title: "Review Study Notes",
    copy: "Go deeper with study notes that explain the story, themes, history, and meaning.",
  },
  {
    icon: "🧠",
    title: "Play Trivia",
    copy: "Check what is sticking with a short chapter quiz that helps you remember the main ideas.",
  },
  {
    icon: "🔤",
    title: "Play Scrambled",
    copy: "Lock key words into memory with a quick word game connected to the chapter.",
  },
  {
    icon: "✍️",
    title: "Answer Reflection",
    copy: "Slow down and write what the chapter is stirring in you.",
  },
];

const problemRows = [
  {
    pain: "You do not know where to start",
    fix: "Bible Buddy gives you a clear first step and keeps the next one ready.",
  },
  {
    pain: "You are not fully understanding what you read",
    fix: "Chapter intros and study notes help the Bible make sense before and after you read.",
  },
  {
    pain: "You are not staying consistent",
    fix: "Streaks, Grace Days, levels, badges, and chapter progress make returning feel rewarding.",
  },
];

const dashboardPreviewPages = [
  {
    key: "home",
    label: "Home",
    icon: "H",
    eyebrow: "Today",
    title: "Esther 2 Study",
    copy: "Pick up with the next chapter, daily tasks, streaks, and progress in one focused dashboard.",
    action: "Start chapter",
  },
  {
    key: "bible",
    label: "Bible",
    icon: "B",
    eyebrow: "Scripture",
    title: "The Bible",
    copy: "Open Scripture without leaving the dashboard frame, so reading still feels connected.",
    action: "Read Esther 2",
  },
  {
    key: "studies",
    label: "Bible Studies",
    icon: "S",
    eyebrow: "Chapter journeys",
    title: "Bible Studies",
    copy: "Browse studies in Bible order, from Genesis forward, and jump into the next chapter.",
    action: "View studies",
  },
  {
    key: "community",
    label: "Community",
    icon: "C",
    eyebrow: "Together",
    title: "Community",
    copy: "Move into community from the same center column, with the dashboard navigation still there.",
    action: "Open community",
  },
  {
    key: "tv",
    label: "TV",
    icon: "T",
    eyebrow: "Watch",
    title: "Bible Buddy TV",
    copy: "Watch study videos and teaching moments as part of the same app experience.",
    action: "Watch now",
  },
  {
    key: "games",
    label: "Games",
    icon: "G",
    eyebrow: "Practice",
    title: "Study Games",
    copy: "Use quizzes and word games to remember what each chapter is teaching.",
    action: "Play game",
  },
  {
    key: "share",
    label: "Share",
    icon: "+",
    eyebrow: "Invite",
    title: "Share Bible Buddy",
    copy: "Invite friends into the same rhythm and keep studying together.",
    action: "Share app",
  },
];

const landingStudySeries = BIBLE_STUDY_SERIES_CATALOG.map((series) => {
  const chapterMatch = series.description.match(/through ([^,]+?) with/i);
  return {
    ...series,
    chapters: chapterMatch?.[1] ?? series.subtitle,
  };
});

export default function LandingPage() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [heroFocus, setHeroFocus] = useState(0);
  const [studyCarouselIndex, setStudyCarouselIndex] = useState(0);
  const focusedSeries = landingStudySeries[studyCarouselIndex] ?? landingStudySeries[0];

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
    const normalizedEmail = email.trim().toLowerCase();
    const displayName = normalizedEmail.split("@")[0] || "New User";

    const { data, error } = await supabase.auth.signUp({
      email: normalizedEmail,
      password: password.trim(),
      options: {
        emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined,
        data: {
          firstName: displayName,
          first_name: displayName,
          display_name: displayName,
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
      await supabase.from("user_signups").insert({
        user_id: user.id,
        email: user.email,
      });
    } catch (analyticsError) {
      console.error("Analytics insert error (non-blocking):", analyticsError);
    }

    try {
      await supabase.from("master_actions").insert({
        user_id: user.id,
        username: displayName,
        action_type: ACTION_TYPE.user_signup,
        action_label: "Signed up for Bible Buddy",
        created_at: new Date().toISOString(),
      });
    } catch (actionTrackingError) {
      console.error("Signup action tracking error (non-blocking):", actionTrackingError);
    }

    try {
      await fetch("/api/send-welcome-dm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, firstName: displayName, lastName: "" }),
      });
    } catch (err) {
      console.error("Welcome DM failed (non-blocking):", err);
    }

    if (data.session) {
      window.location.href = "/dashboard";
      return;
    }

    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password: password.trim(),
    });

    if (loginData.session) {
      window.location.href = "/dashboard";
      return;
    }

    setLoading(false);
    setError(
      loginError?.message?.toLowerCase().includes("email not confirmed")
        ? "Your account was created, but Supabase email confirmation is still turned on. Turn it off in Supabase Auth so new users can start onboarding right away."
        : loginError?.message || "Account created, but Bible Buddy could not start your session yet. Try logging in."
    );
  }

  async function handleOAuthSignIn(provider: "google") {
    setLoading(true);
    setError(null);

    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined;
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: redirectTo ? { redirectTo } : undefined,
    });

    if (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#eef4ff]">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#eef4ff] text-slate-950">
      <style>{`
        @keyframes landing-fire-flicker {
          0%, 100% { transform: translateY(0) scale(1); filter: drop-shadow(0 0 0 rgba(255, 145, 0, 0)); }
          50% { transform: translateY(-1px) scale(1.08); filter: drop-shadow(0 0 8px rgba(255, 145, 0, 0.35)); }
        }
        @keyframes landing-diamond-shine {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(59, 130, 246, 0)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.4)); }
        }
        @keyframes landing-soft-pulse {
          0%, 100% { transform: translateY(0); box-shadow: 0 12px 30px rgba(123, 175, 212, 0.22); }
          50% { transform: translateY(-2px); box-shadow: 0 18px 42px rgba(123, 175, 212, 0.32); }
        }
        @keyframes landing-card-rise {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes landing-progress-fill {
          from { width: 8%; }
          to { width: 100%; }
        }
        @keyframes landing-shimmer {
          0% { transform: translateX(-130%) rotate(18deg); opacity: 0; }
          40% { opacity: 0.7; }
          100% { transform: translateX(150%) rotate(18deg); opacity: 0; }
        }
        .landing-fire { animation: landing-fire-flicker 2s ease-in-out infinite; display: inline-block; }
        .landing-diamond { animation: landing-diamond-shine 2.4s ease-in-out infinite; display: inline-block; }
        .landing-pulse { animation: landing-soft-pulse 2.6s ease-in-out infinite; }
        .landing-card { animation: landing-card-rise 700ms ease-out both; }
        .landing-progress { animation: landing-progress-fill 1.4s ease-out both; }
        .landing-badge { position: relative; overflow: hidden; }
        .landing-badge::after { content: ""; position: absolute; inset-block: 0; left: 0; width: 34px; background: rgba(255,255,255,0.65); filter: blur(8px); animation: landing-shimmer 2.8s ease-out infinite; }
      `}</style>
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 md:px-5 md:py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-[#d9ecff] ring-1 ring-white/15 md:h-10 md:w-10">
            <Image src="/louis/louis-wave.png" alt="Bible Buddy Logo" width={36} height={36} className="h-9 w-9 object-contain" />
          </div>
          <div className="text-lg font-black tracking-tight text-slate-950 md:text-2xl">Bible Buddy</div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <Link href="/login" className="text-sm font-bold text-slate-700 transition hover:text-slate-950 md:text-base">
            Log In
          </Link>
          <button
            type="button"
            onClick={() => setShowSignupModal(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[#7BAFD4] px-4 py-2 text-sm font-black text-[#05111f] shadow-[0_14px_36px_rgba(123,175,212,0.28)] transition hover:bg-[#91c2df] md:px-7 md:py-2.5 md:text-base"
          >
            Start free <span aria-hidden="true">→</span>
          </button>
        </div>
      </header>

      <main>
        <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-4 pb-6 pt-3 sm:px-5 md:pb-8 md:pt-4 lg:min-h-[560px] lg:grid-cols-[0.86fr_1.14fr] lg:gap-8 lg:pt-6">
          <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
            <h1 className="text-[42px] font-black leading-[0.98] tracking-tight text-slate-950 sm:text-5xl md:text-7xl">
              Making Bible study easier.
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 md:mt-7 md:text-xl md:leading-8 lg:mx-0">
              Bible Buddy helps you build a daily Bible study rhythm, grow closer to God, know where to start, understand what you read, and keep coming back without feeling rushed.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center md:mt-9 lg:justify-start">
              <button
                type="button"
                onClick={() => setShowSignupModal(true)}
                className="inline-flex justify-center rounded-2xl bg-[#7BAFD4] px-7 py-3.5 text-base font-black text-[#05111f] shadow-[0_16px_44px_rgba(123,175,212,0.3)] transition hover:-translate-y-0.5 hover:bg-[#91c2df] md:px-8 md:py-4"
              >
                Get started free <span className="ml-2" aria-hidden="true">→</span>
              </button>
              <p className="text-xs font-medium text-slate-500 md:text-sm">No credit card required.</p>
            </div>
          </div>

          <div
            role="button"
            tabIndex={0}
            onClick={() => setHeroFocus((current) => (current + 1) % dashboardPreviewPages.length)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setHeroFocus((current) => (current + 1) % dashboardPreviewPages.length);
              }
            }}
            className="group relative mx-auto w-full max-w-[420px] cursor-pointer text-left outline-none sm:max-w-2xl lg:max-w-3xl"
            aria-label="Animate Bible Buddy dashboard preview"
          >
            <div className="absolute -inset-2 rounded-[28px] border border-[#d8cbb8] bg-white/60 opacity-80 transition group-hover:opacity-100 sm:-inset-4 sm:rounded-[34px]" />
            <div className="relative overflow-hidden rounded-[24px] border border-[#d9e4f2] bg-white shadow-[0_22px_60px_rgba(42,88,125,0.16)] transition duration-300 group-hover:-translate-y-1 sm:rounded-[28px]">
              <div className="flex items-center justify-between border-b border-[#e5edf7] bg-[#fbfdff] px-3 py-3 sm:px-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl bg-[#d9ecff]">
                    <Image src="/louis/louis-wave.png" alt="Bible Buddy" width={30} height={30} className="h-8 w-8 object-contain" />
                  </div>
                  <span className="text-sm font-black text-slate-950">Bible Buddy</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-black sm:gap-2">
                  <span>!</span>
                  <span>DM</span>
                  <Image src="/louis/louis-cool.png" alt="Profile" width={26} height={26} className="rounded-full" />
                </div>
              </div>

              <div className="bg-[#eef4ff] p-3 sm:p-5">
                <div className="grid grid-cols-4 gap-2">
                  {[
                    ["1", "Streak", "#fff6e8"],
                    ["5", "Grace", "#eaf6ff"],
                    ["12", "Level", "#eefdf4"],
                    ["14", "Badges", "#fff0f0"],
                  ].map((stat, index) => (
                    <div key={stat[1]} className={`rounded-2xl border border-white px-2 py-3 text-center shadow-sm ${heroFocus === index ? "ring-4 ring-[#7BAFD4]/35" : ""}`} style={{ backgroundColor: stat[2] }}>
                      <p className="text-lg font-black text-slate-950 sm:text-2xl">{stat[0]}</p>
                      <p className="mt-1 text-[10px] font-black text-slate-500 sm:text-xs">{stat[1]}</p>
                    </div>
                  ))}
                </div>

                <div className="landing-card mt-3 rounded-[24px] border border-[#ecd8b2] bg-gradient-to-br from-[#fff6e8] via-[#fffaf2] to-[#fff2db] p-3 shadow-sm sm:mt-4 sm:p-4">
                  <div className="flex items-start gap-3">
                    <Image src="/louis/louis-stareyes.png" alt="Louis" width={52} height={52} className="h-12 w-12 shrink-0 rounded-full bg-white object-contain ring-4 ring-white/70" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-[#946327]">Next Bible Study Step</p>
                      <h3 className="mt-1 text-xl font-black leading-tight text-slate-950 sm:text-2xl">The Rise of Esther</h3>
                      <p className="mt-1 text-sm font-bold leading-5 text-slate-600">Esther 2 is ready. Keep going through the story one chapter at a time.</p>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-[78px_1fr] gap-3">
                    <div className="overflow-visible rounded-2xl bg-white/65 p-1 shadow-sm">
                      <img src="/theriseofester.png" alt="The Rise of Esther cover" className="aspect-[3/4] w-full object-contain drop-shadow-sm" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center justify-between text-xs font-black text-slate-700">
                        <span>4 of 6 tasks</span>
                        <span>67%</span>
                      </div>
                      <div className="mt-2 h-3 overflow-hidden rounded-full bg-white">
                        <div className="landing-progress h-full rounded-full bg-[#7BAFD4]" />
                      </div>
                      <div className="mt-3 grid gap-2">
                        {["Read Esther 2", "Review Notes", "Play Trivia"].map((task, index) => (
                          <div key={task} className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white/80 px-3 py-2 shadow-sm">
                            <span className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-black ${index < 2 ? "bg-emerald-500 text-white" : "bg-[#d7eaff] text-[#1f5278]"}`}>
                              {index < 2 ? "✓" : index + 1}
                            </span>
                            <span className="min-w-0 truncate text-xs font-black text-slate-800 sm:text-sm">{task}</span>
                            <span className="ml-auto whitespace-nowrap text-[10px] font-black text-slate-500">+5 pts</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {["Fire streak", "Grace days", "Chapter path"].map((label) => (
                      <div key={label} className="rounded-2xl bg-white/75 px-2 py-2 text-center text-[10px] font-black text-slate-600 shadow-sm">
                        {label}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 overflow-hidden rounded-[22px] border border-[#dbe7f6] bg-[#fbfdff] p-2">
                  <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {dashboardPreviewPages.map((page, index) => (
                      <span
                        key={page.key}
                        className={`flex min-w-[86px] flex-col items-center gap-1 rounded-2xl px-3 py-2 text-center transition sm:min-w-[96px] ${
                          heroFocus === index ? "bg-[#d7eaff] text-[#1f5278] ring-1 ring-[#7BAFD4]/45" : "bg-white text-slate-500"
                        }`}
                      >
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-current/10 text-xs font-black">{page.icon}</span>
                        <span className="text-[10px] font-black leading-tight sm:text-xs">{page.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-5 md:py-12">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5f95bd] sm:text-sm sm:tracking-[0.22em]">The real problem</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl md:mt-4 md:text-6xl">
              You want to read and understand the Bible,
              <span className="block text-slate-400">but you do not know how.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-slate-600 md:mt-4 md:text-lg md:leading-8">
              You have tried reading plans. You have tried devotionals. You have tried willpower.
              But it is hard to stay consistent with the Bible when you do not know where to start or what you are reading.
            </p>

            <div className="mt-5 space-y-3 md:mt-7 md:space-y-4">
              {problemRows.map((row) => (
                <div key={row.pain} className="grid gap-3 rounded-2xl border border-[#dbe7f6] bg-[#f8fbff] p-4 text-left shadow-sm md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-4 md:rounded-3xl md:p-7">
                  <div className="flex items-center gap-3 text-slate-700 md:gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-500">×</span>
                    <span className="text-base font-bold md:text-lg">{row.pain}</span>
                  </div>
                  <span className="hidden text-slate-400 md:block">→</span>
                  <div className="flex items-center gap-3 text-slate-950 md:gap-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">✓</span>
                    <span className="text-base font-black leading-6 md:text-lg">{row.fix}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-transparent px-4 py-8 sm:px-5 md:py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5f95bd] sm:text-sm sm:tracking-[0.22em]">The secret sauce</p>
              <h2 className="mt-3 text-3xl font-black leading-tight text-slate-950 sm:text-4xl md:mt-4 md:text-6xl">
                Studying the Bible
                <span className="block text-[#7BAFD4]">chapter by chapter.</span>
              </h2>
              <p className="mx-auto mt-3 max-w-3xl text-base leading-7 text-slate-600 md:mt-4 md:text-lg md:leading-8">
                Bible Buddy turns Bible reading into a clear rhythm that helps you understand Scripture and build consistency in God&apos;s Word:
                preview the chapter, read it, study it, test what you learned, remember key words, and reflect on what God is showing you.
              </p>
            </div>

            <div className="mt-5 grid gap-4 md:mt-7 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
              {taskSteps.map((step) => (
                <div key={step.title} className="rounded-2xl border border-[#dbe7f6] bg-white p-5 shadow-[0_14px_34px_rgba(42,88,125,0.1)] md:rounded-3xl md:p-6 md:shadow-[0_18px_46px_rgba(42,88,125,0.12)]">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#eef6ff] text-2xl md:h-12 md:w-12">{step.icon}</span>
                    <h3 className="text-xl font-black leading-tight text-slate-950 md:text-2xl">{step.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600 md:mt-4 md:text-base md:leading-7">{step.copy}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 overflow-hidden rounded-[28px] border border-[#dbe7f6] bg-white/85 py-5 shadow-[0_20px_60px_rgba(42,88,125,0.12)] md:mt-10 md:rounded-[34px] md:py-7">
              <div className="mx-auto max-w-4xl px-5 text-center">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5f95bd]">Detailed Bible study series</p>
                <h3 className="mt-2 text-2xl font-black leading-tight text-slate-950 md:text-4xl">
                  Study the Bible with 65+ guided series.
                </h3>
                <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold leading-6 text-slate-600 md:text-base md:leading-7">
                  Bible Buddy is built to walk you through the Bible with detailed chapter-by-chapter studies. Swipe through the series, see what chapters they cover, and follow the story in order.
                </p>
              </div>

              <div className="relative mt-5 overflow-hidden py-4 md:mt-7">
                <div
                  className="flex gap-4 transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(calc(50% - ${studyCarouselIndex * 176 + 88}px))` }}
                >
                  {landingStudySeries.map((series, index) => {
                    const active = index === studyCarouselIndex;
                    return (
                      <button
                        key={series.key}
                        type="button"
                        onClick={() => setStudyCarouselIndex(index)}
                        className={`w-[160px] shrink-0 text-left transition duration-300 ${
                          active ? "scale-105" : "scale-95 opacity-65 hover:opacity-100"
                        }`}
                      >
                        <div className={`overflow-visible rounded-[22px] border bg-[#f8fbff] p-2 shadow-sm transition ${
                          active ? "border-[#7BAFD4] shadow-[0_18px_42px_rgba(123,175,212,0.28)]" : "border-[#dbe7f6]"
                        }`}>
                          <img src={series.image} alt={`${series.title} cover`} className="aspect-[3/4] w-full object-contain drop-shadow-sm" />
                        </div>
                        <p className="mt-3 line-clamp-2 text-center text-sm font-black leading-tight text-slate-950">{series.title}</p>
                        <p className="mt-1 text-center text-xs font-bold text-[#5f95bd]">{series.chapters}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mx-auto grid max-w-4xl gap-4 px-5 md:grid-cols-[1fr_auto] md:items-center">
                <div className="rounded-3xl border border-[#dbe7f6] bg-[#f8fbff] p-5 text-left">
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-[#5f95bd]">Featured in the center</p>
                  <h4 className="mt-2 text-2xl font-black text-slate-950">{focusedSeries.title}</h4>
                  <p className="mt-1 text-sm font-black text-[#3f6f91]">{focusedSeries.chapters}</p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-slate-600 md:text-base">
                    {focusedSeries.description.split(". ").slice(0, 2).join(". ").replace(/\.$/, "")}.
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStudyCarouselIndex((index) => (index - 1 + landingStudySeries.length) % landingStudySeries.length)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-[#dbe7f6] bg-white text-xl font-black text-[#3f6f91] shadow-sm transition hover:bg-[#eef6ff]"
                    aria-label="Previous Bible study series"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={() => setStudyCarouselIndex((index) => (index + 1) % landingStudySeries.length)}
                    className="grid h-11 w-11 place-items-center rounded-full border border-[#dbe7f6] bg-white text-xl font-black text-[#3f6f91] shadow-sm transition hover:bg-[#eef6ff]"
                    aria-label="Next Bible study series"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-transparent px-4 py-8 sm:px-5 md:py-12">
          <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-6">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-black leading-tight text-slate-950 sm:text-4xl md:text-6xl">Bible study should feel alive, not like homework.</h2>
              <p className="mt-3 text-base leading-7 text-slate-600 md:mt-4 md:text-lg md:leading-8">
                Bible Buddy keeps the serious part serious, but makes progress visible. You see your streak,
                protect it with Grace Days, earn badges, level up, and always know the next chapter waiting for you.
              </p>
              <button
                type="button"
                onClick={() => setShowSignupModal(true)}
                className="mt-4 w-full rounded-2xl bg-[#7BAFD4] px-7 py-3.5 text-base font-black text-[#05111f] shadow-[0_16px_44px_rgba(123,175,212,0.28)] transition hover:-translate-y-0.5 hover:bg-[#91c2df] sm:w-auto md:mt-5 md:px-8 md:py-4"
              >
                Start Your Bible Study <span className="ml-2" aria-hidden="true">→</span>
              </button>
            </div>

            <div className="overflow-hidden rounded-3xl border border-[#dbe7f6] bg-white shadow-[0_22px_60px_rgba(42,88,125,0.12)] md:rounded-[30px] md:shadow-[0_30px_90px_rgba(42,88,125,0.14)]">
              <div className="flex items-center justify-between border-b border-[#dbe7f6] bg-[#fbfdff] px-4 py-3 md:px-5">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-xl bg-[#d9ecff]">
                    <Image src="/louis/louis-wave.png" alt="Bible Buddy" width={30} height={30} className="h-8 w-8 object-contain" />
                  </div>
                  <span className="text-sm font-black text-slate-950">Bible Buddy</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-black text-slate-800 sm:gap-2">
                  <span>🔔</span>
                  <span>💬</span>
                  <Image src="/louis/louis-cool.png" alt="Profile" width={26} height={26} className="rounded-full" />
                </div>
              </div>
              <div className="p-4 md:p-6">
                <div className="grid grid-cols-4 gap-2 md:gap-4">
                  {[
                    ["🔥", "62", "day streak"],
                    ["💎", "5", "Grace Days"],
                    ["🏅", "14", "badges"],
                    ["", "", ""],
                  ].map((stat, index) => {
                    const displayStat = [
                      ["🔥", "62", "Streak"],
                      ["💎", "5", "Grace Days"],
                      ["🛡", "12", "Level"],
                      ["🏅", "14", "Badges"],
                    ][index] ?? stat;
                    return (
                    <div key={displayStat[2]} className="rounded-2xl border border-[#dbe7f6] bg-[#f8fbff] p-2 text-center sm:p-4">
                      <p className={`text-xl sm:text-2xl ${index === 0 ? "landing-fire" : ""} ${index === 1 ? "landing-diamond" : ""}`}>{displayStat[0]}</p>
                      <p className="mt-1 text-xl font-black text-slate-950 sm:mt-2 sm:text-2xl md:text-3xl">{displayStat[1]}</p>
                      <p className="mt-1 text-[10px] font-bold leading-tight text-slate-500 sm:text-xs">{displayStat[2]}</p>
                    </div>
                    );
                  })}
                </div>

                <div className="mt-4 space-y-3 md:mt-4 md:space-y-4">
                  {[
                    ["Compete with yourself", "Your progress bar moves as you finish each chapter study."],
                    ["Celebrate small wins", "Task animations, badges, and chapter completion keep momentum visible."],
                    ["Never lose the thread", "If a chapter takes more than one day, Bible Buddy keeps you right there."],
                  ].map((item, index) => (
                    <div key={item[0]} className="flex gap-3 rounded-2xl border border-[#dbe7f6] bg-[#f8fbff] p-4 md:gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#7BAFD4] text-lg font-black text-[#05111f] md:h-12 md:w-12 md:text-xl">{index + 1}</div>
                      <div>
                        <h3 className="text-base font-black text-slate-950 md:text-lg">{item[0]}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{item[1]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#dbe7f6] bg-transparent text-slate-600">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 md:grid-cols-3 md:py-12">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-950">Connect with me</h3>
            <ul className="space-y-2 text-sm">
              {[
                ["YouTube", "https://www.youtube.com/@BibleStudyWithLouis"],
                ["Instagram", "https://www.instagram.com/biblestudywithlouis"],
                ["Threads", "https://www.threads.net/@biblestudywithlouis"],
                ["TikTok", "https://www.tiktok.com/@biblestudywithlouis"],
                ["Facebook", "https://www.facebook.com/profile.php?id=100085924826685"],
              ].map((item) => (
                <li key={item[0]}>
                  <a href={item[1]} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#7BAFD4]">
                    {item[0]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-950">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="transition-colors hover:text-[#7BAFD4]">Contact</Link></li>
              <li><Link href="/privacy" className="transition-colors hover:text-[#7BAFD4]">Privacy Policy</Link></li>
              <li><Link href="/terms" className="transition-colors hover:text-[#7BAFD4]">Terms of Service</Link></li>
            </ul>
          </div>

          <div className="text-sm md:text-base">
            <h3 className="mb-3 text-lg font-semibold text-slate-950">Bible Buddy</h3>
            <p className="max-w-sm leading-relaxed text-slate-600">
              A Bible study app built to help you read Scripture with more clarity, better context,
              and a stronger daily study rhythm.
            </p>
          </div>
        </div>

        <div className="border-t border-[#dbe7f6]">
          <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-slate-500 md:text-right md:text-sm">© 2026 Bible Buddy</div>
        </div>
      </footer>

      {showSignupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 text-slate-950 shadow-2xl md:p-7">
            <button type="button" onClick={() => setShowSignupModal(false)} className="absolute right-4 top-3 text-sm text-gray-400 hover:text-gray-700">
              ×
            </button>

            <h2 className="mb-1 text-center text-xl font-bold text-gray-900 md:text-2xl">Create your free Bible Buddy account</h2>
            <p className="mb-4 text-center text-xs text-gray-500">Free to use. No credit card required.</p>

            <div className="grid gap-2">
              <button
                type="button"
                onClick={() => void handleOAuthSignIn("google")}
                disabled={loading}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-900 transition hover:bg-gray-50 disabled:opacity-60"
              >
                Continue with Google
              </button>
            </div>

            <div className="my-4 flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400">
              <span className="h-px flex-1 bg-gray-200" />
              or
              <span className="h-px flex-1 bg-gray-200" />
            </div>

            <form onSubmit={handleSubmit} className="mt-2 space-y-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#7BAFD4]"
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
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#7BAFD4]"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                />
              </div>

              {error && <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>}

              <button type="submit" disabled={loading} className="mt-1 w-full rounded-lg bg-[#7BAFD4] py-2.5 text-sm font-black text-[#05111f] shadow-md transition hover:bg-[#91c2df] disabled:opacity-60">
                {loading ? "Creating account..." : "Create Free Account"}
              </button>

              <p className="mt-1.5 text-center text-[10px] text-gray-500">
                By creating an account, you agree to the{" "}
                <Link href="/terms" className="underline underline-offset-2 hover:text-[#7BAFD4]">terms of service</Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-[#7BAFD4]">privacy policy</Link>.
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
