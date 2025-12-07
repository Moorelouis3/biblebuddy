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

      // send them back to the Matthew chapters page
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

          {/* 1. Family line of the King */}
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
              <p>
                Matthew does not open his Gospel with angels, miracles, or a
                manger. He opens with a list of names.
              </p>

              <p>
                Most Christians skim this part. Most people think it is boring.
                But if you slow down and read it through Jewish eyes, Matthew
                one is
                <span className="font-semibold"> explosive.</span>
              </p>

              <p>Matthew is standing in front of the Jewish people saying:</p>

              <p className="font-semibold">
                The Messiah you have been waiting for has arrived, and He came
                exactly the way God promised.
              </p>

              <p>He proves it with the very first sentence:</p>

              <p className="italic">
                “Jesus Christ, the son of David, the son of Abraham.”
              </p>

              <p>This one line hits like a bomb.</p>
            </div>

            {/* Son of Abraham / Son of David */}
            <div className="mt-6 space-y-6 text-sm md:text-base leading-relaxed text-gray-800">
              <div>
                <h3 className="font-semibold mb-1 flex items-center gap-2">
                  <span>🧩</span>
                  <span>Son of Abraham</span>
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-1">
                  📍 <span className="italic">Genesis 12</span>
                </p>
                <p>
                  God promised Abraham that through his seed
                  <span className="font-semibold"> all nations</span> would be
                  blessed. Jesus is that promised seed.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-1 flex items-center gap-2">
                  <span>👑</span>
                  <span>Son of David</span>
                </h3>
                <p className="text-xs md:text-sm text-gray-600 mb-1">
                  📍 <span className="italic">2 Samuel 7</span>
                </p>
                <p>
                  God promised David that one of his descendants would sit on an
                  <span className="font-semibold"> everlasting throne.</span>
                  Jesus is that eternal King.
                </p>
                <p className="mt-2">
                  If Jesus is not connected to Abraham and David, He cannot be
                  the Messiah. Matthew solves that in one verse and then proves
                  it with the genealogy.
                </p>
                <p className="mt-2">
                  This is not a random list. It is a
                  <span className="font-semibold"> theological statement</span>{" "}
                  written in the shape of a family tree.
                </p>
              </div>
            </div>
          </section>

          {/* 2. Rise Fall Quiet Faithfulness */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🌿</span>
              <span>Rise Fall Quiet Faithfulness</span>
            </h2>

            <p className="mb-4 text-sm md:text-base text-gray-800">
              Matthew splits Jewish history into three movements.
            </p>

            {/* Rise */}
            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800 mb-6">
              <h3 className="font-semibold flex items-center gap-2">
                <span>🌱</span>
                <span>One. Rise from Abraham to David</span>
              </h3>

              <p>
                This is the birth of God’s people and the rise of the royal
                line. Name by name the story builds:
              </p>

              <ul className="list-disc list-inside space-y-1">
                <li>Abraham — covenant father</li>
                <li>Isaac — miracle son</li>
                <li>Jacob — renamed Israel</li>
                <li>Judah — tribe of the Messiah</li>
                <li>Tamar — messy story but part of God’s plan</li>
                <li>Rahab — former prostitute saved by faith</li>
                <li>Ruth — outsider with bold loyalty</li>
                <li>Boaz — redeemer</li>
                <li>Jesse — faithful father</li>
                <li>David — Israel’s greatest king</li>
              </ul>

              <p className="mt-3">Matthew is teaching something:</p>
              <p className="font-semibold">
                God works through the noble and the broken, the kings and the
                outsiders, the pure and the stained.
              </p>
              <p>The genealogy itself is a message of grace.</p>
            </div>

            {/* Fall */}
            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800 mb-6">
              <h3 className="font-semibold flex items-center gap-2">
                <span>🔥</span>
                <span>Two. Fall from David to the Exile</span>
              </h3>

              <p>This section tells the tragic collapse of Israel.</p>

              <p>Pride.</p>
              <p>Idolatry.</p>
              <p>Corrupt kings.</p>
              <p>Division.</p>
              <p>Violence.</p>
              <p>Drifting from God.</p>

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

              <p>Babylon invades Jerusalem. The walls fall. The temple burns.</p>
              <p>
                The palace is destroyed. People are killed. The survivors are
                chained and marched away.
              </p>
              <p>
                To the Jewish mind this was the darkest moment in their history
                <span className="font-semibold">
                  {" "}
                  the throne of David looked gone forever.
                </span>
              </p>
              <p>
                But Matthew includes this moment to show:
                <span className="font-semibold">
                  {" "}
                  Even in judgment, God’s promises were still alive.
                </span>
              </p>
            </div>

            {/* Quiet faithfulness */}
            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <h3 className="font-semibold flex items-center gap-2">
                <span>🌅</span>
                <span>Three. Quiet Faithfulness from the Exile to Jesus</span>
              </h3>

              <p>No kings. No prophets. No dramatic miracles.</p>

              <p>
                Just ordinary families trying to honor God and carry the promise
                forward. Names like Shealtiel, Zerubbabel, Eliakim, and Matthan
                are not well known, but they were
                <span className="font-semibold"> guardians of the promise.</span>
              </p>

              <p>
                This period teaches us something powerful:
                <span className="font-semibold">
                  {" "}
                  God does some of His greatest work in quiet seasons.
                </span>
              </p>

              <p>
                Finally the genealogy lands on Jacob, Joseph as legal father,
                and Mary as chosen mother.
              </p>

              <h4 className="font-semibold flex items-center gap-2 mt-2">
                <span>🍼</span>
                <span>Why Joseph Matters</span>
              </h4>

              <p>
                In Jewish law, adoption carries full legal rights. When Joseph
                names Jesus, Jesus receives the
                <span className="font-semibold"> full legal claim</span> to
                David’s royal line.
              </p>

              <h4 className="font-semibold flex items-center gap-2 mt-2">
                <span>🔢</span>
                <span>Three Sets of Fourteen</span>
              </h4>

              <p>
                Matthew structures the genealogy like poetry. In Hebrew the name
                David adds up to fourteen.
              </p>

              <p className="font-semibold">
                Everything in Israel’s story points to the Son of David.
                Everything points to Jesus.
              </p>
            </div>
          </section>

          {/* 3. Birth of Jesus */}
          <section className="mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>👼</span>
              <span>The Birth of Jesus Christ</span>
            </h2>

            {/* image removed here */}

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              {/* keep or restore your birth-of-Jesus text here */}
            </div>
          </section>

          {/* footer buttons */}
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
              {isFinished
                ? "Chapter one finished"
                : "Mark Matthew 1 as finished"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
