// app/reading/books/matthew/chapters/chapter1/notes/page.tsx
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { markMatthewStepDone } from "../../../../../../lib/readingProgress";

// overview + 28 chapters
const MATTHEW_TOTAL_ITEMS = 28 + 1;

export default function MatthewChapter1NotesPage() {
  const router = useRouter();
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  function handleMarkFinished() {
    if (isSaving) return;

    try {
      setIsSaving(true);

      // chapter 1 is step index 1 (overview was 0)
      markMatthewStepDone(MATTHEW_TOTAL_ITEMS, 1);

      setIsFinished(true);

      router.push("/reading/books/matthew");
    } catch (err) {
      console.error("Error marking Matthew 1 finished", err);
    } finally {
      setIsSaving(false);
    }
  }

  function goToMatthewChapterOne() {
    router.push("/reading/books/matthew/chapters/chapter1");
  }

  function goHome() {
    router.push("/dashboard");
  }

  return (
    <div className="fixed inset-0 z-40 bg-black/70 flex items-start justify-center overflow-y-auto p-4 py-10">
      {/* outer white card */}
      <div className="relative w-full max-w-3xl md:max-w-4xl rounded-[32px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-2 md:p-3 mb-10">

        {/* close button */}
        <button
          onClick={() => router.back()}
          className="absolute right-4 top-3 text-sm text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* inner light blue column */}
        <div className="rounded-3xl bg-blue-50 px-4 md:px-6 py-5 md:py-7">

          {/* header */}
          <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <span>⭐</span>
            <span>Matthew Chapter 1 Notes</span>
          </h1>

          {/** ------------------------------------------------------ */}
          {/** 1. FAMILY LINE OF THE KING */}
          {/** ------------------------------------------------------ */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>📜</span>
              <span>The Family Line of the King</span>
            </h2>

            <Image
              src="/Bible/Matthew/chapters/Chapter1/JesusAbrahamDavid.jpg"
              alt="Jesus, Abraham, and David illustration"
              width={1200}
              height={700}
              className="rounded-3xl mb-4 border border-blue-100"
            />

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>Matthew does not open his Gospel with angels, miracles, or a manger. He opens with a list of names.</p>
              <p>Most Christians skim this part. Most people think it is boring. But if you slow down and read it through Jewish eyes, Matthew one is <span className="font-semibold">explosive.</span></p>
              <p>Matthew is standing in front of the Jewish people saying:</p>
              <p className="font-semibold">The Messiah you have been waiting for has arrived, and He came exactly the way God promised.</p>
              <p>He proves it with the very first sentence:</p>
              <p className="italic">“Jesus Christ, the son of David, the son of Abraham.”</p>
            </div>

            {/* Son of Abraham / Son of David */}
            <div className="mt-6 space-y-6 text-sm md:text-base leading-relaxed text-gray-800">
              <div>
                <h3 className="font-semibold mb-1 flex items-center gap-2">
                  <span>🧩</span>
                  <span>Son of Abraham</span>
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-1">📍 <span className="italic">Genesis 12</span></p>
                <p>God promised Abraham that through his seed <span className="font-semibold">all nations</span> would be blessed. Jesus is that promised seed.</p>
              </div>

              <div>
                <h3 className="font-semibold mb-1 flex items-center gap-2">
                  <span>👑</span>
                  <span>Son of David</span>
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-1">📍 <span className="italic">2 Samuel 7</span></p>
                <p>God promised David that one of his descendants would sit on an <span className="font-semibold">everlasting throne.</span> Jesus is that eternal King.</p>
                <p className="mt-2">If Jesus is not connected to Abraham and David, He cannot be the Messiah.</p>
              </div>
            </div>
          </section>

          {/** ------------------------------------------------------ */}
          {/** 2. RISE - FALL - QUIET FAITHFULNESS */}
          {/** ------------------------------------------------------ */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🌿</span>
              <span>Rise Fall Quiet Faithfulness</span>
            </h2>

            <p className="mb-4 text-sm md:text-base text-gray-800">Matthew splits Jewish history into three movements.</p>

            {/* Rise */}
            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800 mb-6">
              <h3 className="font-semibold flex items-center gap-2">
                <span>🌱</span>
                <span>One. Rise from Abraham to David</span>
              </h3>

              <p>The birth of God's people and the rise of the royal line.</p>

              <ul className="list-disc list-inside space-y-1">
                <li>Abraham — covenant father</li>
                <li>Isaac — miracle son</li>
                <li>Jacob — renamed Israel</li>
                <li>Judah — tribe of the Messiah</li>
                <li>Tamar — messy story</li>
                <li>Rahab — saved by faith</li>
                <li>Ruth — loyal outsider</li>
                <li>Boaz — redeemer</li>
                <li>David — greatest king</li>
              </ul>

              <p className="font-semibold mt-2">God works through the noble and the broken.</p>
            </div>

            {/* Fall */}
            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800 mb-6">
              <h3 className="font-semibold flex items-center gap-2">
                <span>🔥</span>
                <span>Two. Fall from David to the Exile</span>
              </h3>

              <p>Pride, idolatry, corrupt kings, division, judgment.</p>

              <Image
                src="/Bible/Matthew/chapters/Chapter1/exile-illustration.png"
                alt="Babylonian exile illustration"
                width={1200}
                height={700}
                className="rounded-3xl mt-3 border border-blue-100"
              />

              <h4 className="font-semibold mt-4 flex items-center gap-2">
                <span>🏛</span>
                <span>586 BC: The Babylonian Exile</span>
              </h4>

              <p>Jerusalem falls. The temple burns. Survivors are marched away.</p>
            </div>

            {/* Quiet Faithfulness */}
            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <h3 className="font-semibold flex items-center gap-2">
                <span>🌅</span>
                <span>Three. Quiet Faithfulness from the Exile to Jesus</span>
              </h3>

              <p>No kings. No prophets. Just faithful families carrying the promise.</p>

              <p>Joseph’s adoption of Jesus gives Him full legal claim to David’s royal line.</p>

              <h4 className="font-semibold mt-2 flex items-center gap-2">
                <span>🔢</span>
                <span>Three Sets of Fourteen</span>
              </h4>

              <p>The name David = 14 in Hebrew. Matthew structures the genealogy around David to show everything points to Jesus.</p>
            </div>
          </section>

          {/** ------------------------------------------------------ */}
          {/** 3. BIRTH OF JESUS — FULL VERSION */}
          {/** ------------------------------------------------------ */}
          <section className="mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>👼</span>
              <span>The Birth of Jesus Christ</span>
            </h2>

            <Image
              src="/Bible/Matthew/chapters/Chapter1/birth-of-jesus.png"
              alt="Birth of Jesus illustration"
              width={1200}
              height={700}
              className="rounded-3xl mb-4 border border-blue-100"
            />

            <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-800">

              <p>Matthew jumps straight into the story — from genealogy into glory.</p>

              <p>The year is around <span className="font-semibold">5–4 BC</span>. A tiny village where everyone knows everyone.</p>

              <p>Mary is maybe 15 or 16. Joseph is a stable, respected carpenter. They are <span className="font-semibold">betrothed</span>.</p>

              <h3 className="font-semibold flex items-center gap-2 mt-4">
                <span>💍</span>
                <span>What is betrothal?</span>
              </h3>

              <p>A binding covenant. Legally husband and wife — but not yet living together or sleeping together.</p>

              <p>The groom used this time to prepare the home, save money, and finalize family agreements.</p>

              <h3 className="font-semibold flex items-center gap-2 mt-4">
                <span>😨</span>
                <span>The Scandal</span>
              </h3>

              <Image
                src="/Bible/Matthew/chapters/Chapter1/JosephMary.jpg"
                alt="Joseph learns Mary is pregnant"
                width={1200}
                height={700}
                className="rounded-3xl mb-4 border border-blue-100"
              />

              <p>During betrothal Mary is found pregnant. Joseph knows the child is not his. The village whispers. Joseph is devastated.</p>

              <h3 className="font-semibold flex items-center gap-2 mt-4">
                <span>❤️</span>
                <span>Joseph’s Character: A Just Man</span>
              </h3>

              <p>Joseph is righteous, compassionate, God-fearing. He refuses to destroy Mary. He chooses mercy.</p>

              <h3 className="font-semibold flex items-center gap-2 mt-4">
                <span>👼</span>
                <span>God Steps In</span>
              </h3>

              <p>An angel appears: <span className="italic">“Joseph, son of David, do not fear to take Mary as your wife…”</span></p>

              <p>Jesus truly comes from David’s royal line. This child is from the Holy Spirit.</p>

              <h3 className="font-semibold flex items-center gap-2 mt-4">
                <span>✨</span>
                <span>The Name: Jesus</span>
              </h3>

              <p>“Yeshua” — <span className="font-semibold">The Lord saves</span>. His name is His mission.</p>

              <h3 className="font-semibold flex items-center gap-2 mt-4">
                <span>🌟</span>
                <span>Prophecy Fulfilled</span>
              </h3>

              <p className="italic">
                “Behold, the virgin shall conceive and bear a son… they shall call His name Immanuel.”
              </p>

              <p>Jesus is what He came to do. Immanuel is who He is.</p>

              <h3 className="font-semibold flex items-center gap-2 mt-4">
                <span>🙌</span>
                <span>Joseph’s Obedience</span>
              </h3>

              <p>Joseph obeys immediately: protects Mary, supports her, waits until after the birth, and names Him Jesus.</p>

              <p className="font-semibold">The Savior has arrived. The King is here. Prophecy is fulfilled.</p>

              <p className="font-semibold">
                Jesus came from real people, real pain, real history —
                and a real promise kept by God.
              </p>

            </div>
          </section>

          {/* FOOTER BUTTONS */}
          <div className="mt-8 pt-4 border-t border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={goToMatthewChapterOne}
              className="px-4 py-2 rounded-full text-sm md:text-base font-semibold bg-white text-blue-700 border border-blue-200 shadow-sm hover:bg-blue-50 transition"
            >
              Go back to Matthew 1
            </button>

            <button
              type="button"
              onClick={goHome}
              className="text-sm md:text-base font-medium text-blue-700 hover:underline"
            >
              Home
            </button>

            <button
              type="button"
              onClick={handleMarkFinished}
              disabled={isSaving}
              className={`px-4 py-2 rounded-full text-sm md:text-base font-semibold shadow-sm transition ${
                isFinished
                  ? "bg-green-600 text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isFinished ? "Chapter one finished" : "Mark Matthew 1 as finished"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
