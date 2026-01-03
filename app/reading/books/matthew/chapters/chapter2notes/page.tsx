"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { markMatthewStepDone } from "../../../../../../lib/readingProgress"; // Legacy - using database now

// overview + 28 chapters
const MATTHEW_TOTAL_ITEMS = 28 + 1;

export default function MatthewChapter2NotesPage() {
  const router = useRouter();
  const [isFinished, setIsFinished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  function handleMarkFinished() {
    if (isSaving) return;

    try {
      setIsSaving(true);

      // chapter 2 is step index 2 (legacy - using database now)
      // markMatthewStepDone(MATTHEW_TOTAL_ITEMS, 2);

      setIsFinished(true);

      // send them back to the Matthew overview with chapters
      router.push("/reading/books/matthew");
    } catch (err) {
      console.error("Error marking chapter two finished", err);
    } finally {
      setIsSaving(false);
    }
  }

  function goToMatthewChapterTwo() {
    router.push("/reading/books/matthew/chapters/chapter2");
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
            <span>Matthew Chapter 2 Notes</span>
          </h1>

          {/* Intro – Early Years of the King */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-4 text-gray-900">
              <span></span>
              <span></span>
            </h2>

            <div className="space-y-4 text-sm md:text-base leading-loose text-gray-800">
              <p>
                Matthew chapter one ended with the greatest miracle in history.
                Joseph obeyed the angel. Mary delivered her Son. And for the
                first time ever, God stepped into the world as a baby.
              </p>

              <p>
                But Matthew is not finished. He now shows us what happened after
                the birth. And it gets intense.
              </p>
            </div>
          </section>

          {/* Wise Men Arrive */}
          <section className="mb-10 md:mb-12">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-4 text-gray-900">
              <span>⭐</span>
              <span>The Wise Men Arrive</span>
            </h2>

            <p className="text-xs md:text-sm text-gray-600 mb-3">
              📍 <span className="italic">Matthew 2:1–2</span>
            </p>

            <Image
              src="/Bible/Matthew/chapters/Chapter2/TheMagi.png"
              alt="Wise men following the star illustration"
              width={1200}
              height={700}
              className="rounded-3xl mb-5 border border-blue-100"
            />

            <div className="space-y-4 text-sm md:text-base leading-loose text-gray-800">
              <p>
                Matthew opens the chapter simply: “After Jesus was born in
                Bethlehem of Judea, in the days of Herod the king…”
              </p>

              <p>
                Bethlehem was a tiny village. A place nobody cared about. A
                place nobody expected greatness to come from. But it was the
                exact place God had promised.
              </p>

              <p>
                From the east, a group of wise men begin a long journey. They
                are not magicians or fortune tellers, but educated scholars,
                respected men who studied the stars. Their ancestors once
                learned from Daniel during Israel’s exile in Babylon.
              </p>

              <p>
                When they saw a strange star rise in the sky, they knew it was
                not random. It was a sign. A King had been born.
              </p>

              <p>
                They traveled hundreds of miles following that light until they
                reached Jerusalem, asking:
              </p>

              <p className="italic">
                “Where is the One born King of the Jews? We saw His star. We
                have come to worship Him.”
              </p>

              <p>They expected celebration. Instead, Jerusalem froze.</p>
            </div>
          </section>

          {/* Herod and the Leaders */}
          <section className="mb-10 md:mb-12">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-4 text-gray-900">
              <span>👑</span>
              <span>Herod and the Leaders</span>
            </h2>

            <p className="text-xs md:text-sm text-gray-600 mb-3">
              📍 <span className="italic">Matthew 2:3–6</span>
            </p>

            <Image
              src="/Bible/Matthew/chapters/Chapter2/Herodangry.png"
              alt="Herod troubled with religious leaders illustration"
              width={1200}
              height={700}
              className="rounded-3xl mb-5 border border-blue-100"
            />

            <div className="space-y-4 text-sm md:text-base leading-loose text-gray-800">
              <p>
                Herod was powerful, paranoid, and dangerous. If he even felt
                threatened, someone died.
              </p>

              <p>
                So when strangers walked into his city saying a new King of the
                Jews had been born, Herod panicked. And when Herod panicked,
                everyone panicked.
              </p>

              <p>
                He called the chief priests and scribes, the religious experts,
                and demanded to know where the Messiah was supposed to be born.
                They did not guess. They quoted Scripture.
              </p>

              <p>
                Micah 5:2 — a prophecy written seven hundred years earlier —
                said the Messiah would come from Bethlehem in Judah, a ruler who
                would shepherd Israel.
              </p>

              <p>
                The leaders knew the prophecy. The wise men knew the sign. Herod
                knew the threat. Bethlehem was now the center of the story.
              </p>
            </div>
          </section>

          {/* The Star Leads Them to Jesus */}
          <section className="mb-10 md:mb-12">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-4 text-gray-900">
              <span>🌟</span>
              <span>The Star Leads Them to Jesus</span>
            </h2>

            <p className="text-xs md:text-sm text-gray-600 mb-3">
              📍 <span className="italic">Matthew 2:7–12</span>
            </p>

            <div className="space-y-4 text-sm md:text-base leading-loose text-gray-800">
              <p>
                Herod secretly met with the wise men. He told them, “Go and
                search carefully for the child. When you find Him, report back
                to me, so that I too may come and worship Him.” He had no
                intention of worshiping Jesus. He wanted to eliminate Him. But
                the wise men did not know that.
              </p>

              <p>
                As they left Jerusalem, the star moved again. It guided them
                directly to the house where Jesus was. Not a palace, not a
                mansion, just an ordinary home.
              </p>

              <p>
                When they saw the child with Mary His mother, they knew they had
                found the One. They fell to the ground in worship and opened
                their treasures:
              </p>

              <ul className="list-disc list-inside space-y-2">
                <li>🪙 Gold — gift fit for a King</li>
                <li>🌿 Frankincense — used in worship to God</li>
                <li>🪔 Myrrh — connected with burial and sacrifice</li>
              </ul>

              <p>
                Even their gifts preached who Jesus is: King, God, and future
                sacrifice.
              </p>

              <p>
                That night, God warned them in a dream not to return to Herod.
                So they went back to their country by another road and quietly
                disappeared from the story.
              </p>
            </div>
          </section>

          {/* Joseph Protects the Child – Flight to Egypt */}
          <section className="mb-10 md:mb-12">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-4 text-gray-900">
              <span>🛡️</span>
              <span>Joseph Protects the Child</span>
            </h2>

            <p className="text-xs md:text-sm text-gray-600 mb-3">
              📍 <span className="italic">Matthew 2:13–15</span>
            </p>

            <Image
              src="/Bible/Matthew/chapters/Chapter2/Josephfleeing.png"
              alt="Joseph, Mary, and Jesus fleeing to Egypt illustration"
              width={1200}
              height={700}
              className="rounded-3xl mb-5 border border-blue-100"
            />

            <div className="space-y-4 text-sm md:text-base leading-loose text-gray-800">
              <p>
                As soon as the wise men left, God stepped in again. An angel
                appeared to Joseph in a dream:
              </p>

              <p className="italic">
                “Get up. Take the child and His mother. Flee to Egypt. Stay
                there until I tell you, because Herod is about to search for the
                child to destroy Him.”
              </p>

              <p>
                Joseph did not wait. In the middle of the night he woke up, took
                Mary and Jesus, and started walking. Egypt was far, but
                obedience was more important than comfort.
              </p>

              <p>
                While they traveled, Matthew shows us the bigger story. Jesus
                was reliving Israel’s history:
              </p>

              <ul className="list-disc list-inside space-y-2">
                <li>Israel came out of Egypt — Jesus will come out of Egypt.</li>
                <li>Israel failed in the wilderness — Jesus will succeed.</li>
                <li>
                  Israel was God’s son symbolically — Jesus is God’s Son
                  literally.
                </li>
              </ul>

              <p className="font-semibold">
                Jesus is the true and better Israel, faithful where Israel
                failed.
              </p>
            </div>
          </section>

          {/* Herod’s Anger and Bethlehem’s Grief */}
          <section className="mb-10 md:mb-12">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-4 text-gray-900">
              <span>💔</span>
              <span>Herod’s Anger</span>
            </h2>

            <p className="text-xs md:text-sm text-gray-600 mb-3">
              📍 <span className="italic">Matthew 2:16–18</span>
            </p>

            <div className="space-y-4 text-sm md:text-base leading-loose text-gray-800">
              <p>
                When Herod realized the wise men were not coming back, he
                snapped. He ordered soldiers to go into Bethlehem and kill every
                male child two years old and under.
              </p>

              <p>
                Bethlehem was small, maybe only a dozen baby boys. But for those
                families, their world collapsed.
              </p>

              <p>
                Matthew connects their grief to Jeremiah’s prophecy about Rachel
                weeping for her children as they were taken into exile. The pain
                of Israel’s past was echoing again in the present.
              </p>

              <p>But Jesus was safe. God had already carried Him away.</p>
            </div>
          </section>

          {/* Return to Nazareth */}
          <section className="mb-4 md:mb-6">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-4 text-gray-900">
              <span>🏡</span>
              <span>The Return Home</span>
            </h2>

            <p className="text-xs md:text-sm text-gray-600 mb-3">
              📍 <span className="italic">Matthew 2:19–23</span>
            </p>

            <Image
              src="/Bible/Matthew/chapters/Chapter2/Nazareth.png"
              alt="Nazareth home of Jesus illustration"
              width={1200}
              height={700}
              className="rounded-3xl mb-5 border border-blue-100"
            />

            <div className="space-y-4 text-sm md:text-base leading-loose text-gray-800">
              <p>
                Eventually Herod died. Once again an angel spoke to Joseph in a
                dream: “Take the child and His mother. Go back to Israel. The
                ones who wanted to kill Him are gone.”
              </p>

              <p>
                Joseph obeyed immediately. But when he heard that Herod’s son
                Archelaus was ruling in Judea, he became afraid. God warned him
                again in a dream, so Joseph took the family north to Galilee, to
                a small town called Nazareth.
              </p>

              <p>
                Nazareth was the kind of place people mocked. “Can anything good
                come out of Nazareth?” they would say. Yet this is where Jesus
                grew up.
              </p>

              <p>
                Matthew ends the chapter by reminding us that even this fulfilled
                what the prophets had spoken. The Messiah would come from
                humble, rejected places.
              </p>

              <h3 className="font-semibold flex items-center gap-2 mt-2">
                <span>🌿</span>
                <span>How Matthew 2 Ends</span>
              </h3>

              <ul className="list-disc list-inside space-y-2">
                <li>Born in Bethlehem</li>
                <li>Protected in Egypt</li>
                <li>Raised in Nazareth</li>
              </ul>

              <p>
                Every step guided by God. Every move fulfilling prophecy. Every
                moment part of the plan.
              </p>

              <p className="font-semibold">
                The King is here — quietly growing, waiting for the perfect time
                to step into His mission. Nothing in Jesus’ life was random. God
                was directing every detail, from the star in the sky to the
                dreams in Joseph’s sleep.
              </p>
            </div>
          </section>

          {/* footer buttons */}
          <div className="mt-8 pt-4 border-t border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={goToMatthewChapterTwo}
              className="px-4 py-2 rounded-full text-sm md:text-base font-semibold bg-white text-blue-700 border border-blue-200 shadow-sm hover:bg-blue-50 transition"
            >
              Go back to Matthew 2
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
                ? "Chapter two finished"
                : "Mark Matthew 2 as finished"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
