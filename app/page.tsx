"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";

const taskSteps = [
  {
    task: "Task 1",
    icon: "📕",
    title: "Read Chapter Intro",
    copy: "Start with a clear, cinematic intro so you understand what you are about to read before you open the chapter.",
  },
  {
    task: "Task 2",
    icon: "✝️",
    title: "Read the Chapter",
    copy: "Read Scripture in a focused Bible reader built for progress, highlighting, saving, and returning without losing your place.",
  },
  {
    task: "Task 3",
    icon: "📝",
    title: "Review Study Notes",
    copy: "Go deeper with notes that explain the story, themes, history, meaning, and the parts that usually make people stop reading.",
  },
  {
    task: "Task 4",
    icon: "🧠",
    title: "Play Trivia",
    copy: "Check what is sticking with a short chapter quiz that helps you remember the people, events, and main ideas.",
  },
  {
    task: "Task 5",
    icon: "🔤",
    title: "Play Scrambled",
    copy: "Lock key words into memory with a quick word game connected to the chapter you just studied.",
  },
  {
    task: "Task 6",
    icon: "✍️",
    title: "Answer Reflection",
    copy: "Slow down and write what the chapter is stirring in you, then keep the conversation going with other Bible Buddies.",
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
    setShowSuccessModal(true);
  }

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f7fd]">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#f3f7fd] text-slate-950">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:py-7">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-[#d9ecff] ring-1 ring-white/15">
            <Image src="/louis/louis-wave.png" alt="Bible Buddy Logo" width={36} height={36} className="h-9 w-9 object-contain" />
          </div>
          <div className="text-xl font-black tracking-tight text-slate-950 md:text-2xl">BibleBuddy</div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-bold text-slate-700 transition hover:text-slate-950 md:text-base">
            Log In
          </Link>
          <button
            type="button"
            onClick={() => setShowSignupModal(true)}
            className="inline-flex items-center gap-2 rounded-full bg-[#7BAFD4] px-5 py-2.5 text-sm font-black text-[#05111f] shadow-[0_14px_36px_rgba(123,175,212,0.35)] transition hover:bg-[#91c2df] md:px-7 md:text-base"
          >
            Start free <span aria-hidden="true">→</span>
          </button>
        </div>
      </header>

      <main>
        <section className="mx-auto grid min-h-[760px] w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-20 pt-12 lg:grid-cols-[0.86fr_1.14fr] lg:pt-20">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex rounded-full border border-[#7BAFD4]/30 bg-[#7BAFD4]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#b7dbf0]">
              Guided Bible Study
            </p>
            <h1 className="text-5xl font-black leading-[0.96] tracking-tight text-slate-950 md:text-7xl">
              Understand the Bible.
              <span className="block text-[#7BAFD4]">Build a rhythm.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 md:text-xl">
              Bible Buddy gives you a daily Bible Study system that helps you know where to start,
              understand what you read, and keep coming back without feeling rushed.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={() => setShowSignupModal(true)}
                className="inline-flex justify-center rounded-2xl bg-[#7BAFD4] px-8 py-4 text-base font-black text-[#05111f] shadow-[0_16px_44px_rgba(123,175,212,0.36)] transition hover:-translate-y-0.5 hover:bg-[#91c2df]"
              >
                Get started free <span className="ml-2" aria-hidden="true">→</span>
              </button>
              <p className="text-sm font-semibold text-slate-500">No credit card required.</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setHeroFocus((current) => (current + 1) % 4)}
            className="group relative mx-auto w-full max-w-3xl text-left outline-none"
            aria-label="Animate Bible Buddy dashboard preview"
          >
            <div className="absolute -inset-4 rounded-[34px] border border-[#b7d6ef] bg-[#e8f4ff] opacity-80 transition group-hover:opacity-100" />
            <div className="relative overflow-hidden rounded-[28px] border border-[#d9e4f2] bg-white shadow-[0_30px_90px_rgba(42,88,125,0.18)] transition duration-300 group-hover:-translate-y-1">
              <div className="flex items-center justify-between border-b border-[#dbe7f6] bg-[#f8fbff] px-5 py-3">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-emerald-400" />
                </div>
                <div className="rounded-lg bg-[#e9f3ff] px-4 py-1 text-xs font-bold text-slate-600">biblebuddy.app/dashboard</div>
              </div>

              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-4 gap-3">
                  {[
                    ["1", "🔥 Streak", "bg-slate-100"],
                    ["0", "💎 Grace Days", "bg-[#d7eaff]"],
                    ["5", "🛡️ Level", "bg-[#d5f8e4]"],
                    ["7", "🏅 Badges", "bg-[#ffdede]"],
                  ].map((card, index) => (
                    <div
                      key={card[1]}
                      className={`rounded-xl px-2 py-4 text-center text-slate-950 transition ${card[2]} ${heroFocus === index ? "scale-[1.04] ring-4 ring-[#7BAFD4]/55" : ""}`}
                    >
                      <p className="text-2xl font-black">{card[0]}</p>
                      <p className="mt-1 text-[10px] font-bold sm:text-xs">{card[1]}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-3xl border border-emerald-300/60 bg-[#effdf4] p-5 text-slate-950 shadow-lg">
                  <div className="flex gap-4">
                    <Image src="/louis/louis-stareyes.png" alt="Louis" width={58} height={58} className="h-14 w-14 rounded-full bg-white object-contain" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold leading-6 sm:text-base">
                        Well done. Esther 1 is behind you now, and Esther 2 is waiting with more of Esther entering the palace.
                      </p>
                      <div className="mt-5 h-3 overflow-hidden rounded-full bg-emerald-100">
                        <div className="h-full w-full rounded-full bg-[#8bc97d] transition-all duration-700" />
                      </div>
                      <p className="mt-4 text-center text-sm font-black">Click the button below to start the next Chapter study.</p>
                      <div className="mt-4 rounded-full bg-[#7BAFD4] py-3 text-center text-sm font-black shadow-md">Start next chapter</div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {taskSteps.slice(0, 4).map((step, index) => (
                    <div
                      key={step.title}
                      className={`flex items-center gap-3 rounded-2xl border bg-white p-3 text-slate-950 transition ${heroFocus === index ? "border-[#7BAFD4] shadow-[0_0_0_6px_rgba(123,175,212,0.18)]" : "border-emerald-200"}`}
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-2xl">{step.icon}</div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-black">{index + 1}. {index === 1 ? "Read Esther 1" : step.title}</p>
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

        <section className="border-y border-[#dbe7f6] bg-white px-5 py-24">
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#5f95bd]">The real problem</p>
            <h2 className="mt-6 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
              You do not lack motivation.
              <span className="block text-slate-400">You lack a system that guides you.</span>
            </h2>
            <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-slate-600">
              You have tried reading plans. You have tried starting over in Genesis. You have tried willpower.
              But it is hard to stay consistent when you do not know where to start or what you are reading.
            </p>

            <div className="mt-14 space-y-5">
              {problemRows.map((row) => (
                <div key={row.pain} className="grid gap-4 rounded-3xl border border-[#dbe7f6] bg-[#f8fbff] p-5 text-left shadow-sm md:grid-cols-[1fr_auto_1fr] md:items-center md:p-7">
                  <div className="flex items-center gap-4 text-slate-700">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-100 text-red-500">×</span>
                    <span className="text-lg font-bold">{row.pain}</span>
                  </div>
                  <span className="hidden text-slate-400 md:block">→</span>
                  <div className="flex items-center gap-4 text-slate-950">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">✓</span>
                    <span className="text-lg font-black">{row.fix}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#eef6ff] px-5 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-[#5f95bd]">The Bible Study system</p>
              <h2 className="mt-6 text-4xl font-black leading-tight text-slate-950 md:text-6xl">
                One chapter.
                <span className="block text-[#7BAFD4]">Six guided tasks.</span>
              </h2>
              <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-600">
                Bible Buddy turns Bible reading into a clear rhythm: preview the chapter, read it, study it,
                test what you learned, remember key words, and reflect on what God is showing you.
              </p>
            </div>

            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {taskSteps.map((step) => (
                <div key={step.title} className="rounded-3xl border border-[#dbe7f6] bg-white p-6 shadow-[0_18px_46px_rgba(42,88,125,0.12)]">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#e3f2ff] px-3 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-[#4f85ad]">{step.task}</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl">{step.icon}</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-slate-950">{step.title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{step.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-5 py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
            <div>
              <p className="mb-5 inline-flex rounded-full bg-[#e9f3ff] px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#5f95bd]">
                Why people keep going
              </p>
              <h2 className="text-4xl font-black leading-tight text-slate-950 md:text-6xl">Bible study should feel alive, not like homework.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Bible Buddy keeps the serious part serious, but makes progress visible. You see your streak,
                protect it with Grace Days, earn badges, level up, and always know the next chapter waiting for you.
              </p>
              <button
                type="button"
                onClick={() => setShowSignupModal(true)}
                className="mt-9 rounded-2xl bg-[#7BAFD4] px-8 py-4 text-base font-black text-[#05111f] shadow-[0_16px_44px_rgba(123,175,212,0.34)] transition hover:-translate-y-0.5 hover:bg-[#91c2df]"
              >
                Start Your Bible Study <span className="ml-2" aria-hidden="true">→</span>
              </button>
            </div>

            <div className="overflow-hidden rounded-[30px] border border-[#dbe7f6] bg-white shadow-[0_30px_90px_rgba(42,88,125,0.14)]">
              <div className="border-b border-[#dbe7f6] bg-[#f8fbff] px-5 py-3">
                <div className="rounded-lg bg-[#e9f3ff] px-4 py-1 text-center text-xs font-bold text-slate-600">biblebuddy.app/progress</div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    ["🔥", "62", "day streak"],
                    ["💎", "5", "Grace Days"],
                    ["🏅", "14", "badges"],
                  ].map((stat) => (
                    <div key={stat[2]} className="rounded-2xl border border-[#dbe7f6] bg-[#f8fbff] p-4 text-center">
                      <p className="text-2xl">{stat[0]}</p>
                      <p className="mt-2 text-3xl font-black text-slate-950">{stat[1]}</p>
                      <p className="mt-1 text-xs font-bold text-slate-500">{stat[2]}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    ["Compete with yourself", "Your progress bar moves as you finish each chapter study."],
                    ["Celebrate small wins", "Task animations, badges, and chapter completion keep momentum visible."],
                    ["Never lose the thread", "If a chapter takes more than one day, Bible Buddy keeps you right there."],
                  ].map((item, index) => (
                    <div key={item[0]} className="flex gap-4 rounded-2xl border border-[#dbe7f6] bg-[#f8fbff] p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#7BAFD4] text-xl font-black text-[#05111f]">{index + 1}</div>
                      <div>
                        <h3 className="text-lg font-black text-slate-950">{item[0]}</h3>
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

      <footer className="border-t border-[#dbe7f6] bg-[#f8fbff] text-slate-600">
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
              <p className="mb-6 text-sm text-gray-600">Please check your email to confirm your account before logging in.</p>
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
