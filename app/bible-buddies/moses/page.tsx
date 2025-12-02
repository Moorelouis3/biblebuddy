"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MosesBuddyPage() {
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
            <span>Moses</span>
          </h1>

          <p className="text-sm md:text-base text-gray-700 mb-6">
            The reluctant leader God used to set His people free
          </p>

          {/* Banner Image */}
          <Image
            src="/bible-buddies/mosesbanner.png"
            alt="Moses standing before the Red Sea with staff raised"
            width={1600}
            height={700}
            className="w-full h-auto object-contain rounded-xl border border-blue-100 mb-8"
          />

          {/* Hero section */}
          <section className="mb-8 md:mb-10">
            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Moses&apos; story begins in a world where his people are slaves.
              </p>

              <p>
                Pharaoh fears the growing strength of Israel and orders every
                Hebrew baby boy to be killed.
              </p>

              <p>
                In the middle of this darkness, a Hebrew mother places her baby
                in a basket and sets him gently in the Nile, trusting God more
                than her eyes can see.
              </p>

              <p>
                That baby is Moses. The child God will one day use to confront
                kings and split seas.
              </p>
            </div>
          </section>

          {/* Moses the Baby in the Basket */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🧺</span>
              <span>Moses the Baby in the Basket</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Pharaoh&apos;s daughter finds the basket among the reeds and
                opens it.
              </p>

              <p>
                She sees a crying baby and feels compassion. Instead of
                ordering his death, she chooses to raise him as her own.
              </p>

              <p>
                Moses grows up between two worlds, born a Hebrew, raised in an
                Egyptian palace.
              </p>

              <p>
                He learns the language, culture, and wisdom of Egypt, but the
                blood of Israel still runs through his veins.
              </p>
            </div>
          </section>

          {/* Moses Who Ran Away */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🏃‍♂️</span>
              <span>Moses the Man Who Ran Away</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                One day, Moses sees an Egyptian beating a Hebrew slave.
              </p>

              <p>
                Anger explodes. Moses kills the Egyptian and hides the body.
              </p>

              <p>
                The next day, his secret is exposed. Pharaoh wants him dead.
              </p>

              <p>
                Moses runs, leaving behind the palace, the power, and the life
                he once knew.
              </p>

              <p>
                He ends up in the wilderness of Midian, becomes a shepherd, and
                builds a quiet, hidden life.
              </p>

              <p>
                For forty years, Moses watches sheep instead of nations, waiting
                with no idea that God is not finished with him.
              </p>
            </div>
          </section>

          {/* Moses at the Burning Bush */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🔥</span>
              <span>Moses at the Burning Bush</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                On an ordinary day in the wilderness, Moses sees something
                extraordinary, a bush on fire that does not burn up.
              </p>

              <p>
                As he comes closer, a voice calls his name, &quot;Moses,
                Moses.&quot;
              </p>

              <p>
                God tells him to take off his sandals. He is standing on holy
                ground.
              </p>

              <p>
                God reveals His heart, &quot;I have seen the misery of My
                people. I have heard their cries. I have come down to rescue
                them.&quot;
              </p>

              <p>
                Then God says something Moses never expected, &quot;I am
                sending you to Pharaoh.&quot;
              </p>

              <p>
                Moses feels unqualified, insecure, and afraid. He says, &quot;Who
                am I? I am not a good speaker.&quot;
              </p>

              <p>
                God&apos;s answer is simple and powerful, &quot;I will be with
                you.&quot;
              </p>
            </div>
          </section>

          {/* Moses the Deliverer of Israel */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🌊</span>
              <span>Moses the Deliverer of Israel</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Moses returns to Egypt with his brother Aaron as his helper and
                spokesperson.
              </p>

              <p>
                He stands before Pharaoh with a message that shakes the throne,
                &quot;Let My people go.&quot;
              </p>

              <p>
                Pharaoh refuses. God sends ten plagues, each one exposing the
                weakness of Egypt&apos;s gods and the power of the Lord.
              </p>

              <p>
                Finally, after the Passover night, Pharaoh breaks and lets
                Israel go.
              </p>

              <p>
                Moses leads the people out, but Pharaoh changes his mind and
                chases them to the edge of the Red Sea.
              </p>

              <p>
                Trapped between water and the army, the people panic. Moses
                raises his staff as God commands.
              </p>

              <p>
                The sea splits. A path opens. Israel walks through on dry land.
              </p>

              <p>
                When the Egyptians follow, the waters crash back. God rescues
                His people and crushes their oppressors.
              </p>
            </div>
          </section>

          {/* Moses the Lawgiver and Friend of God */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>📜</span>
              <span>Moses the Lawgiver and Friend of God</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                In the wilderness, Moses climbs Mount Sinai and meets with God.
              </p>

              <p>
                God gives him the Ten Commandments, not just rules, but a
                covenant, a way for Israel to live as God&apos;s people.
              </p>

              <p>
                Scripture says God spoke with Moses &quot;face to face, as a man
                speaks with his friend.&quot;
              </p>

              <p>
                Moses carries the weight of leading a nation that often grumbles,
                complains, and disobeys.
              </p>

              <p>
                Yet again and again, he intercedes for them, begging God to show
                mercy instead of judgment.
              </p>

              <p>
                Moses is not perfect. He struggles with anger and frustration.
                He makes mistakes that keep him from entering the Promised Land.
              </p>

              <p>
                But through it all, he walks closely with God in a way few ever
                have.
              </p>
            </div>
          </section>

          {/* Moses' Final Days */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>⛰️</span>
              <span>Moses&apos; Final Days</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                At the end of his life, God leads Moses up a mountain and shows
                him the Promised Land from a distance.
              </p>

              <p>
                Moses will not enter it, but he sees the fulfillment of the
                promise he carried for so many years.
              </p>

              <p>
                He blesses the tribes of Israel, reminds them of God&apos;s
                faithfulness, and encourages them to obey the Lord with all
                their hearts.
              </p>

              <p>
                Then Moses dies, and Scripture says God Himself buries him.
              </p>

              <p>
                Later, the Bible describes him like this, &quot;There has never
                arisen another prophet like Moses, whom the Lord knew face to
                face.&quot;
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
                Moses is the Bible buddy for anyone who feels unqualified but
                called.
              </p>

              <p>
                The baby rescued from the river. The runaway God brought back.
                The leader who doubted his voice but trusted God&apos;s presence.
              </p>

              <p>
                If you want to learn courage in calling, faith in hard seasons,
                and what it looks like to walk closely with God in real life,
                Moses is the one to study.
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
