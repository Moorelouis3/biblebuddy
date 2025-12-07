"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DavidBuddyPage() {
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
      <div className="relative w-full max-w-3xl md:max-w-4xl rounded-[32px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-2 md:p-3 mb-10">
        <button
          onClick={handleClose}
          className="absolute right-4 top-3 text-sm text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <div className="rounded-3xl bg-blue-50 px-4 md:px-6 py-5 md:py-7">
          {/* Header */}
          <h1 className="text-2xl md:text-3xl font-bold mb-2 flex items-center gap-2 text-gray-900">
            <span>⭐</span>
            <span>David</span>
          </h1>

          <p className="text-sm md:text-base text-gray-700 mb-6">
            The man after God&apos;s own heart
          </p>

          {/* Banner Image */}
          <Image
            src="/bible-buddies/davidbanner.png"
            alt="David with harp and sling looking toward a battlefield"
            width={1600}
            height={700}
            className="w-full h-auto object-contain rounded-xl border border-blue-100 mb-8"
          />

          {/* Hero section */}
          <section className="mb-8 md:mb-10">
            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>David enters Scripture when Israel is restless and disappointed.</p>

              <p>
                The people begged for a king. God allowed Saul to reign. Saul
                started strong but drifted away from obedience and the fear of
                the Lord.
              </p>

              <p>
                Israel has a king on the throne but not a shepherd for their
                hearts.
              </p>

              <p>
                So God looks past the palace and turns His eyes toward a small
                town called Bethlehem.
              </p>

              <p>
                There in the hills is a boy no one is watching. A boy named
                David.
              </p>
            </div>
          </section>

          {/* David the Overlooked Shepherd */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>👦</span>
              <span>David the Overlooked Shepherd</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>David grows up as the youngest son in a large family.</p>

              <p>
                He is not the first choice. He is not the tallest. He is not the
                strongest. He is the one left out with the sheep.
              </p>

              <p>While his brothers train for war, David learns to:</p>

              <ul className="list-disc list-inside space-y-1">
                <li>Protect lambs from lions and bears</li>
                <li>Play the harp under the open sky</li>
                <li>Talk to God in the quiet of the fields</li>
              </ul>

              <p>The world sees a shepherd boy. Heaven sees a future king.</p>

              <p>
                One day the prophet Samuel comes to Jesse&apos;s house to anoint
                the next king of Israel.
              </p>

              <p>Each older brother passes before Samuel.</p>

              <p>Strong. Impressive. King material.</p>

              <p>But God says no to every one of them.</p>

              <p>Samuel asks, &quot;Are these all your sons&quot;</p>

              <p>Jesse almost forgets.</p>

              <p>
                &quot;There is still the youngest. He is out keeping the
                sheep.&quot;
              </p>

              <p>
                They bring David in, smelling like grass and wilderness. God
                speaks.
              </p>

              <p className="font-semibold">&quot;This is the one.&quot;</p>

              <p>
                In front of his family, the prophet pours oil on David&apos;s
                head. The Spirit of the Lord comes on him.
              </p>

              <p>The world still sees a shepherd.</p>
              <p>God has just crowned a king in training.</p>
            </div>
          </section>

          {/* David the Giant Slayer */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>⚔️</span>
              <span>David the Giant Slayer</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>Israel soon faces a giant named Goliath.</p>

              <p>
                He stands tall in armor and arrogance. For forty days his voice
                keeps the camp frozen in fear. An entire army is held back by
                one man.
              </p>

              <p>
                David is only there to bring food to his brothers. He hears
                Goliath mocking God and something burns inside him. He cannot
                stay silent.
              </p>

              <p>
                David steps forward with simple faith and a simple question:
              </p>

              <p className="italic">
                &quot;Who is this that defies the armies of the living God&quot;
              </p>

              <p>He refuses Saul&apos;s armor. He chooses what he knows.</p>

              <ul className="list-disc list-inside space-y-1">
                <li>A sling</li>
                <li>Five smooth stones</li>
                <li>Confidence in the Lord</li>
              </ul>

              <p>
                Goliath laughs when he sees the boy. But David runs toward the
                battle line and declares:
              </p>

              <p className="italic">
                &quot;You come to me with sword and spear, but I come to you in
                the name of the Lord.&quot;
              </p>

              <p>One stone. One throw. One moment.</p>

              <p>The giant falls face down.</p>

              <p>
                The shepherd boy becomes a legend in a single day. Not because
                of his aim. Because of his trust.
              </p>
            </div>
          </section>

          {/* David the Worshiper and Psalm Writer */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🎵</span>
              <span>David the Worshiper and Psalm Writer</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Before David ever sits on a throne, he learns to live in the
                presence of God.
              </p>

              <p>
                He writes songs in the fields. He pours out his heart in poetry.
                He plays the harp until the anxiety of Saul lifts in the palace.
              </p>

              <p>David&apos;s secret place with God becomes his real strength.</p>

              <p>Out of his life come songs that still shape our faith:</p>

              <ul className="list-disc list-inside space-y-1">
                <li>&quot;The Lord is my shepherd.&quot;</li>
                <li>&quot;Create in me a clean heart.&quot;</li>
                <li>&quot;I will fear no evil, for You are with me.&quot;</li>
              </ul>

              <p>
                David shows us that worship is not just music. It is honesty. It
                is repentance. It is trust poured out in words.
              </p>

              <p>
                He praises when he feels close to God. He cries out when he
                feels abandoned. He brings every emotion into the presence of
                the Lord.
              </p>

              <p>This is why his Psalms still feel like our prayers.</p>
            </div>
          </section>

          {/* David the King in Training */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>👑</span>
              <span>David the King in Training</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>After Goliath, David&apos;s life does not get easier.</p>

              <p>
                Saul becomes jealous. Songs about David&apos;s victories echo
                through the streets. Fear and envy grow in Saul&apos;s heart.
              </p>

              <p>David becomes a fugitive.</p>

              <p>He hides in caves. He moves from town to town.</p>

              <p>
                He leads a small group of outcasts and warriors who gather
                around him.
              </p>

              <p>
                More than once he has the chance to kill Saul, in the cave and
                in the camp at night.
              </p>

              <p>
                But David refuses to take the throne by force. He says, &quot;I
                will not lay my hand on the Lord&apos;s anointed.&quot;
              </p>

              <p>
                He chooses honor over revenge. Patience over shortcuts.
                Obedience over opportunity.
              </p>

              <p>The wilderness becomes David&apos;s classroom.</p>

              <p>
                This is where God shapes his character so he can carry the
                weight of the crown.
              </p>
            </div>
          </section>

          {/* David the Man Who Fell Hard */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>💔</span>
              <span>David the Man Who Fell Hard</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>David is not a perfect hero.</p>

              <p>
                In a season of success and comfort, he lets his guard down.
                Instead of leading his army in battle, he stays home.
              </p>

              <p>
                From the roof of his palace, he sees a woman named Bathsheba.
              </p>

              <p>
                Desire turns into sin. Lust turns into adultery. Adultery turns
                into a plan to cover it up. The plan turns into the death of her
                husband, Uriah.
              </p>

              <p>
                David, the man after God&apos;s own heart, falls into deep and
                devastating sin.
              </p>

              <p>
                God sends the prophet Nathan with a story and a sentence:
                &quot;You are the man.&quot;
              </p>

              <p>David is crushed.</p>

              <p>
                He could have defended himself. He could have hardened his
                heart. Instead he drops to his knees.
              </p>

              <p className="italic">
                &quot;I have sinned against the Lord.&quot;
              </p>

              <p>
                Out of this moment comes one of the most powerful prayers in
                Scripture:
              </p>

              <p className="italic">
                &quot;Create in me a clean heart, O God, and renew a right
                spirit within me.&quot;
              </p>

              <p>David still faces consequences.</p>

              <p>The sword in his family. Pain in his house. Tears on his pillow.</p>

              <p>But he also finds mercy. God does not throw him away.</p>

              <p>
                David&apos;s story shows that even people who love God deeply
                can fall badly and still be restored by grace.
              </p>
            </div>
          </section>

          {/* David the Covenant King */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🏛️</span>
              <span>David the Covenant King</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Despite his failures, God makes a promise to David that goes far
                beyond his lifetime.
              </p>

              <p>
                God says that David&apos;s throne will be established forever.
                Not because David is flawless. Because God is faithful.
              </p>

              <p>
                David gathers materials for the temple. He brings the ark of the
                covenant to Jerusalem. He turns the city into a place of worship
                and praise.
              </p>

              <p>
                He does not get to build the temple himself. That task is for
                his son Solomon.
              </p>

              <p>But God builds something greater for David.</p>

              <p>
                A promise that from his line will come a King who will reign
                forever.
              </p>

              <p>Generations later, a baby is born in Bethlehem.</p>

              <p>He is called the Son of David. His name is Jesus.</p>
            </div>
          </section>

          {/* David's Final Days */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>⛰️</span>
              <span>David&apos;s Final Days</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>David grows old.</p>

              <p>
                The warrior who once ran toward giants now leans on a staff. He
                looks back on victories and failures, songs and battles, tears
                and joy.
              </p>

              <p>He prepares Solomon to reign. He gives final instructions.</p>

              <p>
                He calls the people to worship the Lord with all their hearts.
              </p>

              <p>
                Then David dies after a long life of walking with God through
                heights and valleys.
              </p>

              <p>
                He is buried in the city that became the center of his kingdom.
              </p>

              <p>His story does not end in perfection. It ends in grace.</p>
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
                David is not remembered because he never sinned. He is
                remembered because he always came back to God.
              </p>

              <p>The shepherd God saw when no one was looking.</p>
              <p>The giant slayer who trusted God more than weapons.</p>
              <p>The worshiper whose songs still teach us how to pray.</p>
              <p>The king who fell hard but repented deeply.</p>
              <p>The ancestor of the one true King, Jesus.</p>

              <p>
                If you want to learn honesty with God, courage in battle,
                repentance after failure, and a heart that keeps returning to
                the Lord, David is the one to study.
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
