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
            The Father Who Raised the King
          </p>

          {/* Banner Image */}
          <Image
            src="/bible-buddies/josephbanner.png"
            alt="Joseph caring for Mary and the child Jesus"
            width={1600}
            height={700}
            className="w-full h-56 md:h-64 object-cover rounded-xl border border-blue-100 mb-8"
          />

          {/* From Carpenter to Guardian */}
          <section className="mb-8 md:mb-10">
            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Joseph enters the story of Jesus quietly. No trumpet. No big
                speech. Just a working man in a small town.
              </p>

              <p>
                He lives in Nazareth, earns his living with tools and timber,
                and is engaged to a young woman named Mary. Scripture calls him{" "}
                <span className="italic">“a righteous man.”</span>
              </p>

              <p>
                He is not a prophet, not a priest, not a king. But God chooses
                him for one of the most important roles in history:
              </p>

              <p className="font-semibold">
                To protect and raise the Messiah.
              </p>
            </div>
          </section>

          {/* The News That Broke His Heart */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>💔</span>
              <span>The News That Broke His Heart</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Before the wedding, Joseph discovers that Mary is pregnant. He
                knows the child is not his.
              </p>

              <p>
                In that moment Joseph has every reason to be angry and ashamed.
                But instead of exposing her, he decides to break off the
                engagement quietly.
              </p>

              <p>
                Even in heartbreak, his instinct is mercy. He chooses to protect
                Mary’s dignity rather than defend his own reputation.
              </p>
            </div>
          </section>

          {/* Joseph Who Listened in the Night */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🌙</span>
              <span>Joseph Who Listened in the Night</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                As Joseph is wrestling with what to do, God meets him in a
                dream.
              </p>

              <p className="italic">
                “Joseph, son of David, do not be afraid to take Mary home as
                your wife, because what is conceived in her is from the Holy
                Spirit.” (Matthew 1:20–21)
              </p>

              <p>
                Joseph wakes up and does exactly what the angel says. No
                arguing. No delay. He takes Mary as his wife and becomes the
                legal father of Jesus.
              </p>

              <p className="font-semibold">
                Joseph’s greatness is not loud faith. It is quiet obedience.
              </p>
            </div>
          </section>

          {/* Protector of the Child */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🛡️</span>
              <span>Joseph the Protector</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Joseph is there when Jesus is born in Bethlehem. He hears the
                shepherds’ story, watches visitors from the East bring gifts,
                and holds the child God placed in his care.
              </p>

              <p>
                But danger quickly follows. King Herod wants the child dead. In
                another dream, God warns Joseph to get up and flee.
              </p>

              <p className="italic">
                “Get up, take the child and his mother and escape to Egypt.”
                (Matthew 2:13)
              </p>

              <p>
                Joseph gets up in the middle of the night, takes Mary and Jesus,
                and leads his family on the run to a foreign land. Later, God
                guides him back and Joseph settles the family in Nazareth.
              </p>

              <p>
                Again and again the pattern repeats: God speaks, Joseph rises,
                Joseph obeys, Jesus is protected.
              </p>
            </div>
          </section>

          {/* The Father Who Stayed */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🏠</span>
              <span>The Father Who Stayed</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                After the early chapters of the Gospels, Joseph quietly fades
                from the story. But for years he would have been there in the
                background of Jesus’ life.
              </p>

              <p>
                Teaching Him how to work with His hands. Taking Him to
                synagogue. Leading the family in prayer. Modeling what a
                righteous man looks like in everyday life.
              </p>

              <p>
                Joseph never preaches a sermon in Scripture. He never writes a
                book of the Bible. But he faithfully does the one thing God
                asked of him:
              </p>

              <p className="font-semibold">
                Be a present, protective, obedient father to the Son of God.
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
                Joseph shows that God loves to use ordinary, quiet, overlooked
                people for world-changing assignments.
              </p>

              <p>
                He is a model for every parent, step-parent, guardian, and
                mentor who has been trusted with someone else’s future.
              </p>

              <p>
                When you do not know what to say, you can do what Joseph did:
                listen to God, obey quickly, and protect what He has placed in
                your hands.
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
