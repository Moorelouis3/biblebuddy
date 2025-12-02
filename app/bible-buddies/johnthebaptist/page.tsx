"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function JohnTheBaptistBuddyPage() {
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
            <span>John the Baptist</span>
          </h1>

          <p className="text-sm md:text-base text-gray-700 mb-6">
            The voice that prepared the way for the King
          </p>

          {/* Banner Image */}
          <Image
            src="/bible-buddies/johnthebaptistbanner.png"
            alt="John the Baptist preaching by the Jordan River"
            width={1600}
            height={700}
            className="w-full h-auto object-contain rounded-xl border border-blue-100 mb-8"
          />

          {/* Hero section */}
          <section className="mb-8 md:mb-10">
            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>John enters Scripture at the edge of two worlds.</p>

              <p>
                The Old Testament is closing. The New Testament is about to
                begin. Four hundred years of silence have passed since the last
                prophet spoke.
              </p>

              <p>Israel is waiting. Longing. Hoping.</p>

              <p>
                In that silence, God chooses a couple who could not have
                children, an elderly priest named Zechariah and his wife
                Elizabeth.
              </p>

              <p>
                From their miracle comes a child who will break the silence of
                heaven.
              </p>

              <p>His name is John.</p>
            </div>
          </section>

          {/* John the Miracle Child */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>👶</span>
              <span>John the Miracle Child</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>John&apos;s story begins before he is born.</p>

              <p>
                Zechariah is serving in the temple when the angel Gabriel
                appears.
              </p>

              <p className="italic">
                &quot;Your wife Elizabeth will bear you a son. You will call him
                John. He will be great before the Lord.&quot;
              </p>

              <p>
                Zechariah doubts. God silences his voice until the baby is born.
              </p>

              <p>
                Elizabeth, far past childbearing age, becomes pregnant. The
                whole village whispers. The whole family celebrates.
              </p>

              <p>This child is different.</p>

              <p>
                When Mary, pregnant with Jesus, visits Elizabeth, baby John
                leaps in the womb, the first person to recognize the presence of
                Christ.
              </p>

              <p>Even before birth, John points to Jesus.</p>
            </div>
          </section>

          {/* John the Voice in the Wilderness */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🏜️</span>
              <span>John the Voice in the Wilderness</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>John does not grow up in palaces or priestly chambers.</p>

              <p>He grows up in the wilderness.</p>

              <p>
                A man with a burning purpose. A prophet wrapped in camel hair.
                Eating locusts and wild honey. Living far from comfort so his
                message is free from compromise.
              </p>

              <p>He fulfills Isaiah&apos;s prophecy:</p>

              <p className="italic">
                &quot;A voice of one crying out in the wilderness, prepare the
                way of the Lord.&quot;
              </p>

              <p>John preaches repentance. He calls people to turn from sin.</p>

              <p>
                Crowds travel many miles to hear him. Some fear him. Some mock
                him. But everyone feels the weight of his words.
              </p>

              <p>John is not there to entertain. He is there to awaken.</p>
            </div>
          </section>

          {/* John the Baptizer */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🌊</span>
              <span>John the Baptizer</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                John stands in the Jordan River, the same river where Israel
                once crossed into the Promised Land.
              </p>

              <p>
                People step into the water to confess their sins, and John
                baptizes them as a picture of cleansing, renewal, and
                preparation.
              </p>

              <p>But John makes something clear:</p>

              <p className="italic">
                &quot;I baptize you with water. But someone is coming after me
                who is greater than me. I am not even worthy to untie His
                sandals.&quot;
              </p>

              <p>
                The crowds admire John. The religious leaders fear him. But John
                refuses the spotlight.
              </p>

              <p>
                He knows his purpose is not to build his own following but to
                point to the One who is coming.
              </p>
            </div>
          </section>

          {/* John the One Who Prepared the King */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>👑</span>
              <span>John the One Who Prepared the King</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>Then the moment he has lived his whole life for arrives.</p>

              <p>Jesus walks toward the Jordan.</p>

              <p>John looks up and sees Him.</p>

              <p>With a voice that shakes the riverbank, he declares:</p>

              <p className="font-semibold">
                &quot;Behold, the Lamb of God, who takes away the sin of the
                world.&quot;
              </p>

              <p>Jesus steps into the water and tells John to baptize Him.</p>

              <p>John hesitates, &quot;I need to be baptized by You.&quot;</p>

              <p>But Jesus insists.</p>

              <p>
                John lowers Him into the water. The heavens open. The Spirit
                descends like a dove. A voice speaks:
              </p>

              <p className="font-semibold">
                &quot;This is My beloved Son, with whom I am well pleased.&quot;
              </p>

              <p>
                This moment becomes the launch of Jesus&apos; public ministry.
                John is the one who prepares the way.
              </p>
            </div>
          </section>

          {/* John the Bold Prophet */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🔥</span>
              <span>John the Bold Prophet</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>John does not soften his message.</p>

              <p>
                He calls out hypocrisy. He confronts religious pride. He even
                rebukes King Herod for his sin.
              </p>

              <p>John is not afraid of crowds or thrones.</p>

              <p>He fears one thing only, disobeying God.</p>

              <p>His boldness makes him a threat. Herod arrests him.</p>

              <p>The prophet of the wilderness is locked in a dungeon.</p>

              <p>John&apos;s followers are devastated.</p>

              <p>
                Even John feels the weight of doubt and sends a question to
                Jesus:
              </p>

              <p className="italic">
                &quot;Are You the One, or should we look for another&quot;
              </p>

              <p>Jesus answers with actions and a report:</p>

              <p className="italic">
                &quot;The blind see. The lame walk. The deaf hear. The dead are
                raised. The good news is preached.&quot;
              </p>

              <p>Jesus is saying, yes John, you did not run in vain.</p>
            </div>
          </section>

          {/* John the Martyr */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>⚔️</span>
              <span>John the Martyr</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>Herod fears John but also respects him.</p>

              <p>Herod&apos;s wife hates him and wants him gone.</p>

              <p>
                One night during a feast, Herod makes a foolish promise. Her
                daughter asks for the head of John the Baptist.
              </p>

              <p>Herod is grieved, but he gives the order.</p>

              <p>John dies a prophet, not a celebrity.</p>

              <p>A martyr, not a man of comfort.</p>

              <p>
                His life is cut short, but his mission is complete. He prepared
                the world for Jesus.
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
                John the Baptist is not remembered for miracles. He is
                remembered for his message.
              </p>

              <p>The voice crying in the wilderness.</p>
              <p>The prophet who would not bend.</p>
              <p>
                The man who pointed the world to Jesus and stepped out of the
                way.
              </p>

              <p>
                If you want boldness, purity, courage, humility, and a life that
                puts Jesus first, John the Baptist is the one to study.
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
