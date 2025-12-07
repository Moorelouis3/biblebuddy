"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AbrahamBuddyPage() {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  function goBackToBuddies() {
    router.push("/bible-buddies"); // 👈 updated path
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
            <span>Abraham</span>
          </h1>

          <p className="text-sm md:text-base text-gray-700 mb-6">
            The man whose faith became the foundation of God&apos;s story
          </p>

          {/* Banner Image */}
          <Image
            src="/bible-buddies/abrahambanner.png"
            alt="Abraham looking at the stars in the night sky"
            width={1600}
            height={700}
            className="w-full h-auto object-contain rounded-xl border border-blue-100 mb-8"
          />

          {/* Hero section */}
          <section className="mb-8 md:mb-10">
            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>Abraham enters Scripture in a world drowning in idolatry.</p>

              <p>
                Nations bow to carved statues. Families pray to the moon.
                Kingdoms chase false gods as if they can save them. Humanity has
                forgotten the God who created them.
              </p>

              <p>
                In the middle of that darkness, God looks at one man living in
                Mesopotamia, a place filled with idols.
              </p>

              <p>
                That man is Abram. A man with no children, no legacy, no land,
                and no idea that God is about to rewrite the future of salvation
                through him.
              </p>
            </div>
          </section>

          {/* Abraham the Man God Called Out of Nowhere */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>👴</span>
              <span>Abraham the Man God Called Out of Nowhere</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Abram&apos;s story begins with a voice that breaks into his
                ordinary life:
              </p>

              <p className="italic">
                &quot;Go from your country to the land I will show you.&quot;
              </p>

              <p>No map.</p>
              <p>No instructions.</p>
              <p>No explanation.</p>

              <p>Just a promise:</p>

              <p>&quot;I will bless you.&quot;</p>
              <p>&quot;I will make your name great.&quot;</p>
              <p>&quot;All nations on earth will be blessed through you.&quot;</p>

              <p>So Abram leaves everything familiar:</p>

              <ul className="list-disc list-inside space-y-1">
                <li>His homeland</li>
                <li>His culture</li>
                <li>His father&apos;s house</li>
                <li>His family&apos;s gods</li>
                <li>His comfort</li>
              </ul>

              <p>
                He steps into the unknown with nothing but faith in a God he just
                met.
              </p>

              <p>
                This moment becomes the blueprint of biblical faith, believing
                God before you see anything change.
              </p>
            </div>
          </section>

          {/* Abraham the Sojourner */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🌾</span>
              <span>Abraham the Sojourner</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>Abraham becomes a sojourner, not a wanderer.</p>

              <p>A wanderer is lost. A sojourner is called.</p>

              <p>
                A wanderer has no direction. A sojourner moves with purpose under
                God&apos;s hand.
              </p>

              <p>The word sojourner in Scripture means:</p>

              <ul className="list-disc list-inside space-y-1">
                <li>A temporary resident.</li>
                <li>Someone living in a land that is not yet his.</li>
                <li>A person traveling forward because God said, &quot;Go.&quot;</li>
              </ul>

              <p>And this becomes Abraham&apos;s identity.</p>

              <p>He lives in tents.</p>
              <p>He moves through the land of Canaan as a guest.</p>
              <p>He builds altars everywhere God leads him.</p>

              <p>
                He is standing in the land God promised, but it does not belong
                to him yet. He walks through territory his future descendants
                will inherit long after he is gone.
              </p>

              <p>
                And through it all, the deepest ache in Abraham&apos;s heart
                remains.
              </p>

              <p>He has no heir.</p>
              <p>No child.</p>
              <p>No fulfillment of the promise.</p>

              <p>
                Every night, Abraham looks at the stars, the very stars God used
                as His symbol, and he waits.
              </p>
            </div>
          </section>

          {/* Abraham the Man of the Promise */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>👼</span>
              <span>Abraham the Man of the Promise</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>Then God speaks again.</p>

              <p>He takes Abraham outside and says:</p>

              <p className="italic">
                &quot;Look up at the sky and count the stars, so shall your
                offspring be.&quot;
              </p>

              <p>The next verse becomes the heartbeat of biblical faith:</p>

              <p className="font-semibold">
                &quot;Abraham believed the Lord, and He credited it to him as
                righteousness.&quot;
              </p>

              <p>But time keeps passing.</p>
              <p>Sarah remains barren.</p>
              <p>Hope begins to tremble.</p>

              <p>
                In impatience, Abraham and Sarah try to fulfill the promise
                themselves, and Ishmael is born.
              </p>

              <p>Yet God does not withdraw His promise.</p>

              <p>He reaffirms it.</p>
              <p>He deepens it.</p>
              <p>He marks it with a covenant.</p>
              <p>He changes Abram&apos;s name to Abraham, father of many nations.</p>

              <p>Then God gives an impossible prophecy:</p>

              <p className="italic">
                &quot;This time next year Sarah will have a son.&quot;
              </p>

              <p>
                At ninety nine years old, Abraham hears words that defy biology,
                logic, and human reasoning, but the God of the impossible is
                writing the story.
              </p>
            </div>
          </section>

          {/* Abraham the Father of Isaac */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>👶</span>
              <span>Abraham the Father of Isaac</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>And God keeps His word.</p>

              <p>Sarah conceives. Isaac is born. Laughter fills the tent.</p>

              <p>
                A miracle child arrives, the living reminder that God is faithful
                even when the promise looks dead.
              </p>

              <p>
                Abraham raises Isaac with the joy of a man who knows this boy is
                proof that God always keeps His word.
              </p>

              <p>But then comes the moment no parent can read without trembling.</p>
            </div>
          </section>

          {/* Abraham Who Laid the Promise on the Altar */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🔥</span>
              <span>Abraham Who Laid the Promise on the Altar</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>God speaks:</p>

              <p className="italic">
                &quot;Take your son, your only son Isaac, whom you love, and
                offer him.&quot;
              </p>

              <p>The command shatters the heart.</p>

              <p>Yet Abraham obeys.</p>

              <p>He wakes up early.</p>
              <p>Takes two servants.</p>
              <p>Splits the wood.</p>
              <p>Climbs the mountain with Isaac beside him.</p>

              <p>
                Isaac asks, &quot;Where is the lamb?&quot; Abraham answers,
                &quot;God will provide.&quot;
              </p>

              <p>On the mountain, Isaac is bound. The knife is raised.</p>

              <p>And heaven intervenes.</p>

              <p className="font-semibold">
                &quot;Do not lay a hand on the boy.&quot;
              </p>

              <p>
                A ram appears, God&apos;s substitute. The altar becomes a
                prophecy pointing forward.
              </p>

              <p>
                One day another Father will offer His only Son, but this time,
                the knife will not be stopped.
              </p>

              <p>
                This defines Abraham&apos;s legacy, faith that surrenders
                everything because it trusts God with everything.
              </p>
            </div>
          </section>

          {/* Abraham the Father of Nations */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🌍</span>
              <span>Abraham the Father of Nations</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>The story unfolds exactly as God promised.</p>

              <p>From Isaac comes Jacob.</p>
              <p>From Jacob come the twelve tribes.</p>
              <p>From the tribes comes Israel.</p>
              <p>
                And from Israel comes Jesus, the ultimate fulfillment of
                God&apos;s promise to bless all nations.
              </p>

              <p>
                Billions trace their spiritual heritage back to Abraham. Three
                major world religions know his name.
              </p>

              <p>
                The promise God made to a man with no children becomes a global
                reality.
              </p>
            </div>
          </section>

          {/* Abraham's Final Days */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>⛰️</span>
              <span>Abraham&apos;s Final Days</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Abraham lives a long, full life, shaped by faith, tested by
                trials, strengthened by covenant.
              </p>

              <p>He buries Sarah.</p>
              <p>He secures the future for Isaac.</p>
              <p>He blesses his descendants.</p>

              <p>
                Then Abraham dies at a good old age, satisfied and at peace,
                resting in the fulfillment of promises he once waited decades to
                see.
              </p>

              <p>
                He is buried beside Sarah, the partner who laughed, doubted,
                believed, and followed him through every step of the
                sojourner&apos;s life.
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
                Abraham is not remembered for being perfect. He is remembered
                for believing God when few others did.
              </p>

              <p>The man God called out of nowhere.</p>
              <p>The man God shaped into a covenant.</p>
              <p>The man God used to build a nation and bless the world.</p>

              <p>
                If you want to learn trust, surrender, patience, and walking
                with God through uncertainty, Abraham is the one to study.
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
              Back home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
