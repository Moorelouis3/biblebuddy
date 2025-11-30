"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MosesBuddyPage() {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  function goBackToBuddies() {
    router.push("/reading/bible-buddies");
  }

  return (
    <div className="fixed inset-0 z-40 bg-black/70 flex items-start justify-center overflow-y-auto p-4 py-10">
      {/* outer white card */}
      <div className="relative w-full max-w-3xl md:max-w-4xl rounded-[32px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-2 md:p-3 mb-10">
        {/* close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-3 text-sm text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* inner light blue column */}
        <div className="rounded-3xl bg-blue-50 px-4 md:px-6 py-5 md:py-7">
          {/* Header */}
          <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2 text-gray-900">
            <span>⭐</span>
            <span>Moses</span>
          </h1>

          <p className="text-sm md:text-base text-gray-700 mb-6">
            The Man God Drew Out
          </p>

          {/* Banner Image */}
          <Image
            src="/bible-buddies/mosesbanner.png"
            alt="Moses leading Israel through the Red Sea"
            width={1600}
            height={700}
            className="w-full h-56 md:h-64 object-cover rounded-xl border border-blue-100 mb-8"
          />

          {/* Hero section */}
          <section className="mb-8 md:mb-10">
            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>Moses enters Scripture in the middle of a genocide.</p>

              <p>
                Pharaoh has ordered every Hebrew baby boy to be killed. Mothers
                hide their newborns in fear. Fathers pray for miracles. Israel
                cries out for deliverance.
              </p>

              <p>
                In the middle of that darkness a woman makes a desperate choice.
                She places her three-month-old son in a basket, sets it among
                the reeds of the Nile, and lets him go.
              </p>

              <p>
                That baby is Moses. The child God protects while his world is
                being torn apart.
              </p>
            </div>
          </section>

          {/* Moses the child who should have died */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>👶</span>
              <span>Moses the Child Who Should Have Died</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                The Nile carries Moses straight into the hands of Pharaoh’s
                daughter.
              </p>

              <p>
                She opens the basket, sees the crying child, and her heart
                breaks. She adopts him as her own.
              </p>

              <p>Moses grows up in two worlds:</p>

              <ul className="list-disc list-inside space-y-1">
                <li>Hebrew by blood</li>
                <li>Egyptian by culture</li>
                <li>Trained in the wisdom of Egypt</li>
                <li>Raised in royalty</li>
                <li>
                  Groomed for leadership without knowing God was shaping him for
                  a calling far greater than a throne
                </li>
              </ul>

              <p>
                Moses becomes a man caught between identities — living in a
                palace while belonging to a people in chains.
              </p>
            </div>
          </section>

          {/* Moses the runaway */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>⚔️</span>
              <span>Moses the Runaway</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>Everything changes when Moses is around forty.</p>

              <p>
                He sees an Egyptian beating a Hebrew slave. Something snaps
                inside him. Moses kills the Egyptian and hides the body.
              </p>

              <p>
                When Pharaoh finds out, Moses becomes a fugitive. He runs into
                the wilderness and disappears from the story for forty years.
              </p>

              <p>
                Forty years of silence. Forty years of humility. Forty years as a
                shepherd in Midian.
              </p>

              <p>This is where God breaks the prince and builds the prophet.</p>
            </div>
          </section>

          {/* Moses who met God in the flame */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🔥</span>
              <span>Moses Who Met God in the Flame</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>Then the moment comes.</p>

              <p>
                Moses sees a bush on fire, but the flames do not consume it. He
                steps closer. God calls his name:
              </p>

              <p className="italic">“Moses… Moses.”</p>

              <p>God reveals His identity, His holiness, and His mission.</p>

              <p>
                Moses is terrified. He argues. He says he cannot speak well. He
                says he is not qualified.
              </p>

              <p>God responds with the only promise Moses will ever need:</p>

              <p className="font-semibold">“I will be with you.”</p>

              <p>
                The mission is simple: go back to Egypt, face Pharaoh, and tell
                him to let My people go.
              </p>
            </div>
          </section>

          {/* Moses the Deliverer */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🌊</span>
              <span>Moses the Deliverer</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                With the authority of God, Moses returns to the nation that
                raised him.
              </p>

              <p>
                Ten plagues fall on Egypt. Judgment comes on Pharaoh. Israel
                walks free.
              </p>

              <p>
                Then Moses raises his staff over the Red Sea — and the waters
                split open. Israel walks through on dry ground while walls of
                ocean stand beside them.
              </p>

              <p>Moses becomes the visible representative of the invisible God.</p>

              <p>
                He leads Israel through the wilderness, receives the Law at
                Sinai, establishes the covenant, builds the tabernacle, and
                shepherds a stubborn nation for forty years.
              </p>
            </div>
          </section>

          {/* Moses the writer of the Law */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>📜</span>
              <span>Moses the Writer of the Law</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>Moses writes:</p>

              <ul className="list-disc list-inside space-y-1">
                <li>Genesis</li>
                <li>Exodus</li>
                <li>Leviticus</li>
                <li>Numbers</li>
                <li>Deuteronomy</li>
                <li>Psalm 90</li>
              </ul>

              <p>
                He becomes the first historian, theologian, and preacher of
                Israel. For the next fifteen hundred years, the people of God
                stand on the foundation he wrote.
              </p>
            </div>
          </section>

          {/* Moses final days */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>⛰️</span>
              <span>Moses Final Days</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>After forty years of leading Israel, Moses climbs Mount Nebo.</p>

              <p>He sees the Promised Land — but he cannot enter it.</p>

              <p>Moses dies on the mountain with God Himself burying him.</p>

              <p>No grave. No monument. Just a life poured out in obedience.</p>
            </div>
          </section>

          {/* Final thought */}
          <section className="mb-2 md:mb-3">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>✨</span>
              <span>Final Thought</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Moses is not remembered for being perfect. He is remembered for
                being faithful.
              </p>

              <p>The man God drew out of the water.</p>

              <p>The man God drew out of obscurity.</p>

              <p>The man God used to draw His people out of slavery.</p>

              <p>
                If you want a model for leadership, obedience, courage, and
                intimacy with God, Moses is the one to study.
              </p>
            </div>
          </section>

          {/* footer button */}
          <div className="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={goBackToBuddies}
              className="px-4 py-2 rounded-full text-sm md:text-base font-semibold bg-white text-blue-700 border border-blue-200 shadow-sm hover:bg-blue-50 transition"
            >
              Back to Bible Buddies
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="text-sm md:text-base font-medium text-blue-700 hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
