"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function JosephBuddyPage() {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  function goBackToBuddies() {
    router.push("/bible-buddies");
  }

  function goToDashboard() {
    router.push("/dashboard");
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
            <span>Joseph</span>
          </h1>

          <p className="text-sm md:text-base text-gray-700 mb-6">
            The quiet carpenter God trusted to raise His Son
          </p>

          {/* Banner Image */}
          <Image
            src="/bible-buddies/josephbanner.png"
            alt="Joseph teaching young Jesus carpentry in the workshop"
            width={1600}
            height={700}
            className="w-full h-auto object-contain rounded-xl border border-blue-100 mb-8"
          />

          {/* Hero section */}
          <section className="mb-8 md:mb-10">
            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Joseph steps into the story of Scripture quietly.
              </p>

              <p>
                He is not a prophet thundering from the wilderness. He is not a king
                sitting on a throne. He is a working man in a small town called Nazareth.
              </p>

              <p>
                To most people, Joseph is just a carpenter. A steady pair of hands.
                A man who builds tables, doors, and roofs.
              </p>

              <p>
                But heaven sees more. God chooses this ordinary man for an extraordinary
                assignment, to become the earthly father of Jesus.
              </p>
            </div>
          </section>

          {/* Joseph the Righteous Carpenter */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🪚</span>
              <span>Joseph the Righteous Carpenter</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Scripture introduces Joseph with one simple but powerful phrase,
                he is a righteous man.
              </p>

              <p>
                That means he cares about God&apos;s law. He wants to do what is right.
                He honors truth, honesty, and integrity.
              </p>

              <p>
                Joseph does not live in the spotlight. He worships in the synagogue.
                He works with his hands. He builds a quiet life of faith and responsibility.
              </p>

              <p>
                When we first meet him, he is engaged to a young woman named Mary.
                He is planning a future, a home, and a family with her.
              </p>
            </div>
          </section>

          {/* Joseph the Man Whose Plans Were Interrupted */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>⚡</span>
              <span>Joseph the Man Whose Plans Were Interrupted</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Then everything shatters.
              </p>

              <p>
                Joseph discovers that Mary is pregnant.
              </p>

              <p>
                He knows the child is not his. His heart breaks. His trust feels
                destroyed. His future collapses in a single moment.
              </p>

              <p>
                Under the law, he could expose her publicly. He could demand judgment.
              </p>

              <p>
                But Joseph&apos;s heart leans toward mercy.
              </p>

              <p>
                He decides to end the engagement quietly, to protect Mary from
                shame as much as he can.
              </p>

              <p>
                Joseph chooses kindness in the middle of his own pain.
              </p>

              <p>
                And right when he has made this decision, God steps in.
              </p>

              <p className="italic">
                In a dream, an angel appears and says, &quot;Joseph, son of David,
                do not be afraid to take Mary as your wife, because what has
                been conceived in her is from the Holy Spirit.&quot;
              </p>

              <p>
                Joseph wakes up with a choice, believe what makes no sense, or
                walk away from the greatest miracle in history.
              </p>
            </div>
          </section>

          {/* Joseph the Obedient Guardian */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🛡️</span>
              <span>Joseph the Obedient Guardian</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Joseph chooses obedience.
              </p>

              <p>
                He takes Mary as his wife. He accepts the calling to raise a child
                who is not biologically his, but eternally God&apos;s.
              </p>

              <p>
                When Caesar&apos;s census forces them to travel to Bethlehem,
                Joseph leads Mary there. He searches for a place to stay when
                every door is closed.
              </p>

              <p>
                In a stable, next to animals and hay, Joseph watches the Messiah
                enter the world.
              </p>

              <p>
                He holds the newborn Jesus in his arms. He hears the cry of the
                One who created the universe.
              </p>

              <p>
                Joseph may not fully understand everything God is doing, but he
                knows this, his job is to protect this mother and this child.
              </p>
            </div>
          </section>

          {/* Joseph the Protector in the Night */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🌙</span>
              <span>Joseph the Protector in the Night</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                After Jesus is born, danger comes quickly.
              </p>

              <p>
                Wise men visit and honor the child. But King Herod, threatened
                by the news of a new &quot;king,&quot; plans to kill the baby.
              </p>

              <p>
                Once again, God speaks to Joseph in a dream.
              </p>

              <p className="italic">
                &quot;Get up. Take the child and His mother and flee to Egypt.&quot;
              </p>

              <p>
                Joseph does not argue. He does not delay.
              </p>

              <p>
                In the middle of the night, he wakes Mary, gathers what they can,
                and leads his small family into exile.
              </p>

              <p>
                The carpenter becomes a refugee. A foreigner in another land.
              </p>

              <p>
                He works to provide. He listens for God&apos;s next instruction.
                When the danger has passed, God calls them back, and Joseph
                leads the family home again, this time to Nazareth.
              </p>

              <p>
                Every step of the way, Joseph&apos;s obedience keeps Jesus safe.
              </p>
            </div>
          </section>

          {/* Joseph in the Hidden Years of Jesus */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🏡</span>
              <span>Joseph in the Hidden Years of Jesus</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Most of Joseph&apos;s story is not recorded in detail.
              </p>

              <p>
                We do not see long speeches from him. We do not see big public
                moments.
              </p>

              <p>
                We see a man who shows up.
              </p>

              <p>
                Joseph teaches Jesus how to work with wood. How to measure, cut,
                and build. How to show up early, keep his word, and serve people
                with his craft.
              </p>

              <p>
                Around the table, he leads the family in prayers and in the
                rhythms of Israel&apos;s feasts and worship.
              </p>

              <p>
                When twelve year old Jesus stays behind in the temple, Joseph and
                Mary search for Him in distress. They bring Him home. They guide
                Him as He grows.
              </p>

              <p>
                Joseph&apos;s life is mostly hidden, but his impact is not.
              </p>

              <p>
                The Son of God grows up watching Joseph obey, work, protect, and
                love in the everyday.
              </p>
            </div>
          </section>

          {/* Joseph's Final Days (What We Know and What We Don&apos;t) */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>⏳</span>
              <span>Joseph&apos;s Final Days</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                By the time Jesus begins His public ministry, Joseph is no longer
                mentioned in the stories.
              </p>

              <p>
                Most Bible teachers believe Joseph died sometime before Jesus
                turned thirty.
              </p>

              <p>
                We do not read about his death. We do not see his last words.
              </p>

              <p>
                But we know this, he finished his assignment.
              </p>

              <p>
                He took Mary as his wife. He protected the child God entrusted to
                him. He raised Jesus through His childhood and teenage years.
              </p>

              <p>
                Joseph&apos;s legacy is not loud, but it is faithful.
              </p>
            </div>
          </section>

          {/* Final Thought */}
          <section className="mb-2 md:mb-3">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>✨</span>
              <span>Final Thought</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Joseph is the Bible buddy for everyone who feels unseen but wants
                to be faithful.
              </p>

              <p>
                He shows us that you do not have to be loud to be used by God.
              </p>

              <p>
                The quiet carpenter God chose to guard the Savior of the world.
              </p>

              <p>
                If you want to learn obedience when life doesn&apos;t make sense,
                faithfulness in everyday work, and courage to protect what God
                has trusted you with, Joseph is the one to study.
              </p>
            </div>
          </section>

          {/* footer buttons */}
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
              onClick={goToDashboard}
              className="px-4 py-2 rounded-full text-sm md:text-base font-semibold bg-white text-blue-700 border border-blue-200 shadow-sm hover:bg-blue-50 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
