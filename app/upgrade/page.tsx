"use client";

import { useEffect, useState } from "react";

export default function UpgradePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Upgrade to Pro</h1>
      <p className="text-gray-600 mb-8">
        Unlock unlimited access to deep Bible study resources.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Free Plan */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-2">Free</h2>
          <p className="text-gray-600 mb-4">Perfect for getting started</p>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li>✓ Full Bible reading</li>
            <li>✓ Notes and progress tracking</li>
            <li>✓ Levels and streaks</li>
            <li>✓ 3 deep study views per day</li>
          </ul>
          <div className="text-2xl font-bold mb-2">$0</div>
          <p className="text-sm text-gray-500">Forever free</p>
        </div>

        {/* Pro Plan */}
        <div className="bg-blue-50 border-2 border-blue-500 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-semibold">Pro</h2>
            <span className="px-2 py-1 bg-blue-600 text-white text-xs font-semibold rounded">
              RECOMMENDED
            </span>
          </div>
          <p className="text-gray-600 mb-4">Unlimited Bible study</p>
          <ul className="space-y-2 text-gray-700 mb-6">
            <li>✓ Everything in Free</li>
            <li>✓ Unlimited people, places, and keywords</li>
            <li>✓ No daily limits</li>
            <li>✓ Priority support</li>
          </ul>
          <div className="text-2xl font-bold mb-2">Coming Soon</div>
          <p className="text-sm text-gray-500">Pricing will be announced soon</p>
        </div>
      </div>

      {/* Animated Section Header */}
      <div
        className={`text-center mb-8 transition-all duration-400 ease-out ${
          mounted
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2.5"
        }`}
        style={{
          transitionDuration: "400ms",
          transitionTimingFunction: "ease-out",
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          What You Unlock With BibleBuddy Pro
        </h2>
        <p className="text-lg text-gray-600">
          Go deeper into Scripture with unlimited Bible study tools.
        </p>
      </div>

      {/* Pro Feature Card */}
      <div
        className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-10 mb-12 shadow-lg border border-blue-100 transition-all duration-200 ease-out hover:scale-[1.01] hover:shadow-xl ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{
          transitionDelay: mounted ? "100ms" : "0ms",
          transitionDuration: "400ms",
          transitionTimingFunction: "ease-out",
        }}
      >
        <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          BibleBuddy Pro Includes
        </h3>

        <div className="space-y-8">
          {/* Feature 1: Unlimited Deep Study Views */}
          <div
            className={`transition-all duration-400 ease-out ${
              mounted
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }`}
            style={{
              transitionDelay: mounted ? "200ms" : "0ms",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl flex-shrink-0">🔓</div>
              <div>
                <h4 className="text-xl font-bold mb-3">
                  Unlimited Deep Study Views
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Unlimited access to People in the Bible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Unlimited access to Places in the Bible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Unlimited access to Keywords of the Bible</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>No daily limits or study caps</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 2: Over 6,000 Bible Study Entries */}
          <div
            className={`transition-all duration-400 ease-out ${
              mounted
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }`}
            style={{
              transitionDelay: mounted ? "280ms" : "0ms",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl flex-shrink-0">📚</div>
              <div>
                <h4 className="text-xl font-bold mb-3">
                  Over 6,000 Bible Study Entries
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>
                      Deep studies covering people, places, and keywords
                      throughout Scripture
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>
                      Designed to help users understand the story behind the
                      verses
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 3: Unlimited Little Louis (AI) Messages */}
          <div
            className={`transition-all duration-400 ease-out ${
              mounted
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }`}
            style={{
              transitionDelay: mounted ? "360ms" : "0ms",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl flex-shrink-0">🤖</div>
              <div>
                <h4 className="text-xl font-bold mb-3">
                  <span
                    className={`inline-block ${
                      mounted ? "animate-subtle-pulse" : ""
                    }`}
                  >
                    Unlimited
                  </span>{" "}
                  Little Louis (AI) Messages
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Ask Bible study questions anytime</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>
                      Get Scripture explanations, summaries, and guidance
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>No daily message limits</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>
                      Designed to help you understand what you're reading, not
                      replace Scripture
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 4: Study Without Interruptions */}
          <div
            className={`transition-all duration-400 ease-out ${
              mounted
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }`}
            style={{
              transitionDelay: mounted ? "440ms" : "0ms",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl flex-shrink-0">🧠</div>
              <div>
                <h4 className="text-xl font-bold mb-3">
                  Study Without Interruptions
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>No "daily limit reached" messages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>No lockouts while studying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Read, explore, and connect Scripture freely</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Feature 5: Everything From the Free Plan */}
          <div
            className={`transition-all duration-400 ease-out ${
              mounted
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }`}
            style={{
              transitionDelay: mounted ? "520ms" : "0ms",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl flex-shrink-0">📈</div>
              <div>
                <h4 className="text-xl font-bold mb-3">
                  Everything From the Free Plan
                </h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Unlimited Bible reading</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Unlimited notes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Levels and streaks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Action points and progress tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>Reading Plan + Study Plan combined</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Buttons */}
      <div
        className={`text-center mb-8 transition-all duration-400 ease-out ${
          mounted
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
        style={{
          transitionDelay: mounted ? "600ms" : "0ms",
        }}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
          {/* Monthly Button */}
          <button
            className="group relative px-8 py-4 bg-white border-2 border-gray-300 rounded-xl text-gray-900 font-semibold text-lg hover:border-gray-400 hover:shadow-lg transition-all duration-200 ease-out hover:-translate-y-0.5"
            onClick={(e) => {
              e.preventDefault();
              // Stripe integration will go here
            }}
          >
            <div className="flex flex-col items-center">
              <span>Choose Monthly</span>
              <span
                className={`text-blue-600 font-bold mt-1 ${
                  mounted ? "animate-price-attention" : ""
                }`}
                style={{
                  animationDelay: mounted ? "1s" : "0s",
                }}
              >
                $5.99 / month
              </span>
            </div>
          </button>

          {/* Yearly Button */}
          <button
            className="group relative px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200 ease-out hover:-translate-y-0.5"
            onClick={(e) => {
              e.preventDefault();
              // Stripe integration will go here
            }}
          >
            <div className="flex flex-col items-center">
              <span>Choose Yearly</span>
              <span
                className={`font-bold mt-1 ${
                  mounted ? "animate-price-attention" : ""
                }`}
                style={{
                  animationDelay: mounted ? "1.2s" : "0s",
                }}
              >
                $50 / year
              </span>
              <span className="text-sm text-blue-100 mt-1">
                (Save 30%)
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Footnote */}
      <div
        className={`text-center text-sm text-gray-500 transition-all duration-500 ease-out ${
          mounted ? "opacity-60" : "opacity-0"
        }`}
        style={{
          transitionDelay: mounted ? "800ms" : "0ms",
        }}
      >
        <p>
          Pro unlocks unlimited study views and AI assistance. Reading, notes,
          and progress are always free.
        </p>
      </div>

      <div className="bg-gray-50 rounded-xl p-6 mb-8 mt-12">
        <h3 className="text-lg font-semibold mb-3">
          What are deep study views?
        </h3>
        <p className="text-gray-700 leading-relaxed mb-4">
          Deep study views include detailed information about people, places,
          and keywords in the Bible. These are the pop-up explanations you see
          when clicking on highlighted terms while reading Scripture.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Free members can access 3 of these detailed views per day. Pro members
          have unlimited access to help you dive deeper into your Bible study.
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
          Go Back
        </button>
      </div>

    </div>
  );
}

