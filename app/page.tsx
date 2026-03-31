"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";

const heroBullets = [
  "Understand hard words, people, and places without leaving your reading",
  "Read with chapter reviews, notes, highlights, and guided help built in",
  "Join a live Bible Study Group with weekly lessons, trivia, and reflection",
];

const featureCards = [
  {
    title: "Read the Bible and actually understand it",
    body:
      "Bible Buddy is built for the moment when you hit a verse, name, or phrase and realize you do not fully understand what you just read. Instead of leaving the app to search all over the internet, the help opens right inside your reading flow.",
  },
  {
    title: "Tap into explanations while you read",
    body:
      "People, places, and Bible keywords are connected directly into the reading experience. Tap Moses, Babylon, covenant, or any hard term and get clear context fast, so the Bible starts making more sense while you are still in the chapter.",
  },
  {
    title: "Study with structure, not guesswork",
    body:
      "When you do not know where to start, Bible Buddy gives you devotionals, reading plans, chapter reviews, guided notes, and study tools that walk you forward one step at a time.",
  },
];

const platformHighlights = [
  {
    kicker: "The Bible Reader",
    title: "Scripture, chapter reviews, highlights, and notes in one place",
    body:
      "Switch translations, save your place, mark what stands out, and open chapter notes without breaking your focus. This is built to help you stay inside the Bible longer.",
  },
  {
    kicker: "Bible Study Group",
    title: "Weekly live study lessons with a real community around them",
    body:
      "Each week, the Bible Study Group moves through a structured lesson with reading, trivia, reflection, discussion, and group momentum that keeps people coming back.",
  },
  {
    kicker: "Bible Understanding Tools",
    title: "People, places, keywords, devotionals, and guided study support",
    body:
      "Bible Buddy helps connect the story of Scripture for you. Learn the people, understand the setting, follow the bigger picture, and keep growing with practical tools that make hard parts feel clear.",
  },
];

const studyFlow = [
  {
    step: "01",
    title: "Read the chapter",
    body:
      "Open Scripture and keep your place with a reader built specifically for Bible study, not just passive scrolling.",
  },
  {
    step: "02",
    title: "Understand what you are reading",
    body:
      "Tap Bible words, people, and places. Open the chapter review. See what the text is saying and why it matters.",
  },
  {
    step: "03",
    title: "Go deeper with structure",
    body:
      "Use devotionals, reading plans, notes, chapter reviews, and study tools to stay consistent instead of guessing what to do next.",
  },
  {
    step: "04",
    title: "Study with other people too",
    body:
      "Step into the Bible Study Group for weekly lessons, reflection, trivia, discussion, and a real sense of shared momentum.",
  },
];

const proofPoints = [
  "Interactive Bible reader",
  "Chapter reviews and notes",
  "People, places, and keyword help",
  "21-day devotionals",
  "Weekly Bible study group lessons",
  "Bible trivia and reading plans",
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
      if (insertError) console.error("Analytics insert failed (non-blocking):", insertError);
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
      if (actionError) console.error("Signup action tracking failed (non-blocking):", actionError);
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <header className="sticky top-0 z-30 border-b border-[#e9e5da] bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef4ff] shadow-sm">
              <Image
                src="/louis/louis-bible.png"
                alt="Bible Buddy Logo"
                width={28}
                height={28}
                className="h-7 w-7"
              />
            </div>
            <div>
              <p className="text-lg font-semibold tracking-tight text-gray-950">Bible Buddy</p>
              <p className="text-xs uppercase tracking-[0.24em] text-[#7286a8]">Understand Scripture Better</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden text-sm font-medium text-gray-700 transition hover:text-gray-950 sm:inline-block"
            >
              Log In
            </Link>
            <button
              type="button"
              onClick={() => setShowSignupModal(true)}
              className="rounded-full bg-[#2f63c8] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#2755ac]"
            >
              Start Free
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(214,228,255,0.45),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(244,239,224,0.55),_transparent_26%)]" />
          <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-4 pb-16 pt-12 md:px-6 md:pb-20 md:pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex rounded-full border border-[#dbe4f5] bg-[#f8fbff] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-[#6f86ad] shadow-sm">
                Built for people who want to understand the Bible
              </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
                The Bible study app that helps you understand what you are reading.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-700">
                Bible Buddy is not just another place to read verses. It is a full Bible study experience designed to help you understand Scripture, follow the story, learn the context, and stay consistent with tools that actually work together.
              </p>

              <div className="mt-8 grid gap-3">
                {heroBullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="flex items-start gap-3 rounded-2xl border border-[#e8edf7] bg-[#fbfdff] px-4 py-3 shadow-sm"
                  >
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#2f63c8]" />
                    <p className="text-sm leading-6 text-gray-700 sm:text-[15px]">{bullet}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setShowSignupModal(true)}
                  className="rounded-2xl bg-[#2f63c8] px-7 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-[#2755ac]"
                >
                  Create Your Free Account
                </button>
                <Link
                  href="/login"
                  className="rounded-2xl border border-[#d9e3f4] bg-white px-7 py-4 text-center text-base font-semibold text-[#35568f] transition hover:bg-[#f7fbff]"
                >
                  Log In
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {proofPoints.map((point) => (
                  <span
                    key={point}
                    className="rounded-full border border-[#e5ebf6] bg-[#f8fbff] px-3 py-1.5 text-xs font-medium text-[#617898] sm:text-sm"
                  >
                    {point}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-[34px] bg-gradient-to-br from-[#e9f1ff]/70 via-transparent to-[#f6efe2]/70 blur-2xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-[#e8ebf2] bg-white shadow-[0_24px_70px_rgba(46,54,68,0.10)]">
                <div className="border-b border-[#edf1f7] bg-[#fafcff] px-5 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#7085aa]">Inside Bible Buddy</p>
                      <h2 className="mt-1 text-xl font-semibold text-gray-950">Read, understand, study, and grow in one place</h2>
                    </div>
                    <div className="hidden rounded-2xl bg-[#eef4ff] px-3 py-2 text-right text-xs font-medium text-[#5e7aa8] sm:block">
                      Built for daily Bible study
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="overflow-hidden rounded-[26px] border border-[#e9edf5] bg-white">
                    <Image
                      src="/LandingPage1.png"
                      alt="Bible Buddy app preview"
                      width={1200}
                      height={900}
                      className="h-auto w-full object-cover"
                      priority
                    />
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-[#e8edf7] bg-[#fbfdff] px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#7085aa]">Read</p>
                      <p className="mt-1 text-sm text-gray-700">Stay in the chapter with notes, highlights, and review tools built in.</p>
                    </div>
                    <div className="rounded-2xl border border-[#e8edf7] bg-[#fbfdff] px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#7085aa]">Understand</p>
                      <p className="mt-1 text-sm text-gray-700">Tap people, places, and Bible words to understand the context without leaving the app.</p>
                    </div>
                    <div className="rounded-2xl border border-[#e8edf7] bg-[#fbfdff] px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.2em] text-[#7085aa]">Study Together</p>
                      <p className="mt-1 text-sm text-gray-700">Follow weekly Bible Study Group lessons with reading, trivia, reflection, and discussion.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-4 md:px-6 md:py-8">
          <div className="rounded-[30px] border border-[#e7ebf3] bg-white px-6 py-8 shadow-sm md:px-10">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7085aa]">Why people stay with Bible Buddy</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950 md:text-4xl">
                Most Bible apps help you read more.
                <br />
                Bible Buddy helps you understand more.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-gray-700 md:text-lg">
                If you have ever read a chapter, finished it, and still felt like you did not fully understand what was happening, Bible Buddy was built for that exact problem. This app brings Scripture, explanation, study tools, and community together so Bible study finally feels connected instead of scattered.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {featureCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-[26px] border border-[#e7ebf3] bg-[#fbfdff] p-5 shadow-sm"
                >
                  <h3 className="text-xl font-semibold text-gray-950">{card.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-700 md:text-[15px]">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-16">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="rounded-[30px] border border-[#dce6f4] bg-[#eef4ff] p-7 text-gray-950 shadow-sm md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6881aa]">Bible Study Group</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Weekly Bible study lessons with a community around them.
              </h2>
              <p className="mt-4 text-base leading-8 text-gray-700">
                Bible Buddy is not just a private reading app. Inside the Bible Study Group, you can follow a live weekly series with structured lessons, chapter reading, trivia, reflection, discussion, and group momentum that keeps people coming back.
              </p>

              <div className="mt-6 grid gap-3">
                <div className="rounded-2xl border border-[#d9e5f6] bg-white px-4 py-3">
                  <p className="text-sm font-semibold">Weekly lesson structure</p>
                  <p className="mt-1 text-sm text-gray-700">Each series moves week by week so you are not guessing what to study next.</p>
                </div>
                <div className="rounded-2xl border border-[#d9e5f6] bg-white px-4 py-3">
                  <p className="text-sm font-semibold">Reading, trivia, reflection, discussion</p>
                  <p className="mt-1 text-sm text-gray-700">The lesson is not just content. It gives people a full flow for studying and engaging.</p>
                </div>
                <div className="rounded-2xl border border-[#d9e5f6] bg-white px-4 py-3">
                  <p className="text-sm font-semibold">Real community and accountability</p>
                  <p className="mt-1 text-sm text-gray-700">See what other people are learning, post your thoughts, and keep moving with the group.</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              {platformHighlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[26px] border border-[#e7ebf3] bg-white p-6 shadow-sm"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7085aa]">{item.kicker}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-gray-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-700 md:text-[15px]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-4 md:px-6 md:py-8">
          <div className="rounded-[30px] border border-[#e7ebf3] bg-white px-6 py-8 shadow-sm md:px-10">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7085aa]">How it works</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950 md:text-4xl">
                One app. One study flow. A much clearer way to stay in Scripture.
              </h2>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {studyFlow.map((item) => (
                <div
                  key={item.step}
                  className="rounded-[24px] border border-[#e7ebf3] bg-[#fbfdff] p-5 shadow-sm"
                >
                  <p className="text-sm font-semibold tracking-[0.22em] text-[#6f84a9]">{item.step}</p>
                  <h3 className="mt-3 text-xl font-semibold text-gray-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-700">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-[30px] border border-[#e7ebf3] bg-white p-7 shadow-sm md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7085aa]">Built for real Bible readers</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-950 md:text-4xl">
                If you want to read the Bible more consistently and understand it more deeply, this is for you.
              </h2>
              <p className="mt-4 text-base leading-8 text-gray-700">
                Bible Buddy was made for the person who wants more than a verse image, more than a random reading streak, and more than just getting through the chapter. It is for people who want to understand what is happening in Scripture, build a real habit, and grow with tools that actually support the way Bible study works in real life.
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setShowSignupModal(true)}
                  className="rounded-2xl bg-[#2f63c8] px-7 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-[#2755ac]"
                >
                  Start Studying Free
                </button>
                <Link
                  href="/login"
                  className="rounded-2xl border border-[#d9e3f4] bg-[#f8fbff] px-7 py-4 text-center text-base font-semibold text-[#35568f] transition hover:bg-white"
                >
                  I Already Have an Account
                </Link>
              </div>
            </div>

            <div className="rounded-[30px] border border-[#e7ebf3] bg-[#f8fbff] p-7 shadow-sm md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7085aa]">What you get</p>
              <div className="mt-5 space-y-4">
                {[
                  "A serious Bible reader with built-in help",
                  "Chapter reviews that explain what is happening",
                  "Tap-to-open Bible words, places, and people",
                  "Guided devotionals and reading plans",
                  "Weekly Bible Study Group lessons and discussion",
                  "Trivia, notes, highlights, and progress tracking",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[#2f63c8]" />
                    <p className="text-sm leading-7 text-gray-700 md:text-[15px]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-6 border-t border-[#e7ebf3] bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-10 md:grid-cols-3 md:px-6 md:py-12">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">Connect with me</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <a href="https://www.youtube.com/@BibleStudyWithLouis" target="_blank" rel="noreferrer" className="transition hover:text-[#204ea6]">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/biblestudywithlouis" target="_blank" rel="noreferrer" className="transition hover:text-[#204ea6]">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://www.threads.net/@biblestudywithlouis" target="_blank" rel="noreferrer" className="transition hover:text-[#204ea6]">
                  Threads
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@biblestudywithlouis" target="_blank" rel="noreferrer" className="transition hover:text-[#204ea6]">
                  TikTok
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/profile.php?id=100085924826685" target="_blank" rel="noreferrer" className="transition hover:text-[#204ea6]">
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-900">Resources</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/contact" className="transition hover:text-[#204ea6]">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="transition hover:text-[#204ea6]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="transition hover:text-[#204ea6]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-950">Bible Buddy</h3>
            <p className="mt-3 max-w-sm text-sm leading-7 text-gray-600 md:text-[15px]">
              A Bible study app built to help people understand Scripture with more clarity, better structure, and real community around the Word.
            </p>
          </div>
        </div>

        <div className="border-t border-[#eceff6]">
          <div className="mx-auto max-w-7xl px-4 py-4 text-center text-xs text-gray-500 md:px-6 md:text-right">
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
              ×
            </button>

            <h2 className="text-center text-xl font-bold text-gray-900 md:text-2xl">
              Create your free Bible Buddy account
            </h2>
            <p className="mb-4 mt-1 text-center text-xs text-gray-500">
              Free to use. No credit card required.
            </p>

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

              {error ? (
                <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-600">
                  {error}
                </p>
              ) : null}

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
