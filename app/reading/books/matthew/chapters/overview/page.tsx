"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LouisAvatar } from "../../../../../../components/LouisAvatar";

export default function MatthewOverviewPage() {
  const router = useRouter();

  const [completed, setCompleted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  function handleDoneClick() {
    // first click: mark completed and show Louis popup
    if (!completed) {
      setCompleted(true);
      setShowPrompt(true);
      return;
    }

    // second click when it is already completed: go to Matthew 1
    router.push("/reading/books/matthew/chapters/chapter1");
  }

  function handleContinueYes() {
    router.push("/reading/books/matthew/chapters/chapter1");
  }

  function handleContinueNo() {
    router.push("/reading/books/matthew");
  }

  return (
    <>
      {/* dimmed background with overview callout */}
      <div className="fixed inset-0 z-40 bg-black/70 flex items-start justify-center overflow-y-auto p-4 py-10">
        {/* outer card with strong shadow so it looks lifted */}
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
              <span>Matthew Overview</span>
            </h1>

            {/* Why Matthew wrote this book */}
            <section className="mb-8 md:mb-10">
              <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
                <span>📖</span>
                <span>Why Matthew Wrote This Book</span>
              </h2>

              <Image
                src="/images/matthew-overview/overview1.png"
                alt="Matthew writing this Gospel"
                width={1200}
                height={700}
                className="rounded-3xl mb-4 border border-blue-100"
              />

              <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
                <p>
                  Sooo… before we jump into chapter 1, let us talk about why Matthew wrote
                  this Gospel.
                </p>

                <p>
                  Matthew is trying to help his people, the Jews, understand something huge.
                </p>

                <p className="font-semibold">
                  Jesus really is the Messiah they have been waiting for.
                </p>

                <p>
                  The Jewish people were tired, frustrated, and living under Roman pressure.
                  They expected a powerful warrior king who would destroy Rome and restore
                  Israel. Instead, God sent a humble carpenter who preached forgiveness,
                  healed the broken, and welcomed everyone.
                </p>

                <p>Matthew’s mission is simple.</p>

                <p className="font-semibold">
                  He wants to prove to the Jews that Jesus is the Savior God promised.
                </p>
              </div>
            </section>

            {/* How Matthew builds his Gospel */}
            <section className="mb-8 md:mb-10">
              <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
                <span>🧾</span>
                <span>How Matthew Builds His Gospel</span>
              </h2>

              <p className="mb-3 text-sm md:text-base text-gray-800">
                Matthew knows his audience wants evidence. So he structures this book like
                someone presenting a clear case.
              </p>

              <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-gray-800">
                <li>Jesus comes from Abraham and David</li>
                <li>Jesus fulfills many prophecies</li>
                <li>Jesus teaches with real authority</li>
                <li>Jesus performs miracles no one else can do</li>
                <li>Jesus dies and rises exactly as Scripture said</li>
              </ul>

              <p className="mt-4 text-sm md:text-base">
                Every chapter is Matthew saying,
              </p>

              <p className="font-semibold text-sm md:text-base">
                Jesus matches everything the prophets wrote about. Jesus is the real Messiah.
              </p>
            </section>

            {/* Who Matthew was */}
            <section className="mb-8 md:mb-10">
              <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
                <span>👤</span>
                <span>Who Matthew Was</span>
              </h2>

              <Image
                src="/images/matthew-overview/overview2.png"
                alt="Matthew at his tax booth"
                width={1200}
                height={700}
                className="rounded-3xl mb-4 border border-blue-100"
              />

              <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
                <p>Matthew was not a priest or a religious leader.</p>
                <p>He was a tax collector, a job almost everyone disliked.</p>
                <p>
                  Tax collectors worked for Rome and often collected more money than required.
                  They were seen as traitors to their own people.
                </p>

                <p>And this is what makes Matthew’s story beautiful.</p>

                <p>Jesus looked at a man everyone avoided and said,</p>

                <p className="font-semibold">Follow me.</p>

                <p>Matthew experienced real grace.</p>

                <p>You can feel that in the way he writes this Gospel.</p>

                <p>
                  He writes like someone who knows what it feels like to be forgiven, chosen,
                  and given a new purpose.
                </p>
              </div>
            </section>

            {/* What you will see in this Gospel */}
            <section className="mb-8 md:mb-10">
              <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
                <span>🧠</span>
                <span>What You Will See in This Gospel</span>
              </h2>

              <Image
                src="/images/matthew-overview/overview3.png"
                alt="Themes in the Gospel of Matthew"
                width={1200}
                height={700}
                className="rounded-3xl mb-4 border border-blue-100"
              />

              <div className="space-y-5 text-sm md:text-base leading-relaxed text-gray-800">
                <div>
                  <h3 className="font-semibold mb-1">👑 Jesus Is the Promised King</h3>
                  <p>
                    Matthew opens the book by connecting Jesus to King David and Abraham to
                    show His rightful position as the Messiah.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">🕊️ Jesus Brings a New Kind of Kingdom</h3>
                  <p>
                    Not a kingdom built on armies and weapons, but a kingdom built on mercy,
                    righteousness, and transformation.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">📜 Jesus Fulfills the Old Testament</h3>
                  <p>You will see this phrase again and again.</p>
                  <p className="font-semibold">
                    This happened so that what God said would come true.
                  </p>
                  <p>Matthew is always connecting the dots.</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-1">🌍 Jesus Came for Everyone</h3>
                  <p>
                    At the end, Jesus gives the Great Commission and sends His followers to
                    all nations. Matthew wants you to see that the message of Jesus is for
                    the whole world.
                  </p>
                </div>
              </div>
            </section>

            {/* Why this matters for you and done button */}
            <section className="mb-2 md:mb-3">
              <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
                <span>🚀</span>
                <span>Why This Matters For You</span>
              </h2>

              <div className="space-y-2 text-sm md:text-base leading-relaxed text-gray-800 mb-4">
                <p>When you read Matthew, you are not just reading stories.</p>
                <p>You are watching God keep His promises.</p>
                <p>You are seeing Jesus reveal the heart of God.</p>
                <p>You are watching the main story of the Bible reach its turning point.</p>
              </div>

              <button
                onClick={handleDoneClick}
                className={`inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold shadow-md shadow-blue-300 transition-colors ${
                  completed
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {completed ? "Completed" : "Click when done reading"}
              </button>
            </section>
          </div>
        </div>
      </div>

      {/* full screen Louis popup after they click done */}
      {showPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="w-full max-w-md mx-4 rounded-3xl bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-6">
            <div className="flex items-start gap-3 mb-4">
              <LouisAvatar mood="wave" size={48} />
              <div>
                <p className="font-semibold text-sm md:text-base mb-1">
                  Great job, you finished your first reading.
                </p>
                <p className="text-sm md:text-base text-gray-800">
                  Do you want to continue on to Matthew chapter 1 today.
                </p>
              </div>
            </div>

            <div className="flex gap-2 justify-end mt-4">
              <button
                onClick={handleContinueNo}
                className="px-3 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-xs md:text-sm font-semibold text-gray-800"
              >
                No, I am done for today
              </button>
              <button
                onClick={handleContinueYes}
                className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs md:text-sm font-semibold text-white"
              >
                Yes, continue to chapter 1
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
