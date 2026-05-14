"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";

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
  const [heroFocus, setHeroFocus] = useState(0);

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
        emailRedirectTo: typeof window !== "undefined" ? `${window.location.origin}/dashboard` : undefined,
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
      await supabase.from("user_signups").insert({
        user_id: user.id,
        email: user.email,
      });
    } catch (analyticsError) {
      console.error("Analytics insert error (non-blocking):", analyticsError);
    }

    try {
      const username = firstName.trim() || user.email?.split("@")[0] || "New User";
      await supabase.from("master_actions").insert({
        user_id: user.id,
        username,
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

    if (data.session) {
      router.push("/dashboard");
      return;
    }

    setShowSuccessModal(true);
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

          <button
            type="button"
            onClick={() => setHeroFocus((current) => (current + 1) % 4)}
            className="group relative mx-auto w-full max-w-[420px] text-left outline-none sm:max-w-2xl lg:max-w-3xl"
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
                  <span>🔔</span>
                  <span>💬</span>
                  <Image src="/louis/louis-cool.png" alt="Profile" width={26} height={26} className="rounded-full" />
                </div>
              </div>

              <div className="p-3 sm:p-6">
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  {[
                    ["1", "🔥 Streak", "bg-slate-100"],
                    ["0", "💎 Grace Days", "bg-[#d7eaff]"],
                    ["5", "🛡️ Level", "bg-[#d5f8e4]"],
                    ["7", "🏅 Badges", "bg-[#ffdede]"],
                  ].map((card, index) => {
                    const displayCard = [
                      ["1", "🔥 Streak", "bg-slate-100"],
                      ["5", "💎 Grace Days", "bg-[#d7eaff]"],
                      ["5", "🛡 Level", "bg-[#d5f8e4]"],
                      ["7", "🏅 Badges", "bg-[#ffdede] landing-badge"],
                    ][index] ?? card;
                    return (
                    <div
                      key={displayCard[1]}
                      className={`rounded-xl px-1.5 py-2.5 text-center text-slate-950 transition sm:px-2 sm:py-4 ${displayCard[2]} ${heroFocus === index ? "scale-[1.03] ring-4 ring-[#7BAFD4]/45" : ""}`}
                    >
                      <p className="text-lg font-black sm:text-2xl">{displayCard[0]}</p>
                      <p className="mt-1 text-[9px] font-bold leading-tight sm:text-xs">{displayCard[1]}</p>
                    </div>
                    );
                  })}
                </div>

                <div className="landing-card mt-3 rounded-2xl border border-emerald-300/60 bg-[#effdf4] p-4 text-slate-950 shadow-sm sm:mt-5 sm:rounded-3xl sm:p-5">
                  <div className="flex gap-3 sm:gap-4">
                    <Image src="/louis/louis-stareyes.png" alt="Louis" width={58} height={58} className="h-11 w-11 rounded-full bg-white object-contain sm:h-14 sm:w-14" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold leading-5 sm:text-base sm:leading-6">
                        Well done. Esther 1 is behind you now, and Esther 2 is waiting with more of Esther entering the palace.
                      </p>
                      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-emerald-100 sm:mt-5 sm:h-3">
                        <div className="landing-progress h-full rounded-full bg-[#8bc97d] transition-all duration-700" />
                      </div>
                      <p className="mt-3 text-center text-xs font-black sm:mt-4 sm:text-sm">Start the next Chapter study.</p>
                      <div className="landing-pulse mt-3 rounded-full bg-[#7BAFD4] py-2.5 text-center text-xs font-black shadow-sm sm:mt-4 sm:py-3 sm:text-sm">Start next chapter</div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {taskSteps.slice(0, 4).map((step, index) => (
                    <div
                      key={step.title}
                      className={`items-center gap-3 rounded-2xl border bg-white p-3 text-slate-950 transition ${index >= 2 ? "hidden sm:flex" : "flex"} ${heroFocus === index ? "border-[#7BAFD4] shadow-[0_0_0_5px_rgba(123,175,212,0.16)]" : "border-emerald-200"}`}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-xl sm:h-12 sm:w-12 sm:text-2xl">{step.icon}</div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-black sm:text-base">{index + 1}. {index === 1 ? "Read Esther 1" : step.title}</p>
                        <p className="line-clamp-2 text-xs font-semibold text-slate-600">{step.copy}</p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-black">+5 pts</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </button>
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

            <form onSubmit={handleSubmit} className="mt-2 space-y-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="mb-1.5 block text-xs font-semibold text-gray-700">First Name</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#7BAFD4]"
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
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#7BAFD4]"
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

      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 text-slate-950 shadow-xl">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mb-2 text-2xl font-bold text-gray-900">Account created successfully!</h2>
              <p className="mb-6 text-sm leading-6 text-gray-600">
                Check your email to confirm your account. If Bible Buddy does not open automatically, confirm first and then log in.
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  setShowSignupModal(false);
                }}
                className="w-full rounded-xl bg-[#7BAFD4] px-6 py-3 font-black text-[#05111f] transition hover:bg-[#91c2df]"
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
