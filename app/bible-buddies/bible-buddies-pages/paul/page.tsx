"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PaulBuddyPage() {
  const router = useRouter();

  function handleClose() {
    router.back();
  }

  function goBackToBuddies() {
    router.push("/reading/bible-buddies");
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
            <span>Paul</span>
          </h1>

          <p className="text-sm md:text-base text-gray-700 mb-6">
            From Persecutor to Preacher
          </p>

          {/* Banner Image */}
          <Image
            src="/bible-buddies/paulbanner.png"
            alt="Saul on the Damascus road seeing the light of Jesus"
            width={1600}
            height={700}
            className="w-full h-56 md:h-64 object-cover rounded-xl border border-blue-100 mb-8"
          />

          {/* Intro: From Persecutor to Preacher */}
          <section className="mb-8 md:mb-10">
            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Before he became the Apostle Paul, he was known as Saul, a violent
                enemy of the church. One encounter with Jesus changed everything.
              </p>
            </div>
          </section>

          {/* Paul was handpicked by Jesus */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>✋📖</span>
              <span>Paul Was Handpicked By Jesus</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Paul did not become an apostle the usual way. He was not one of
                the twelve. He did not walk with Jesus during His earthly ministry.
              </p>

              <p>
                After the resurrection, Jesus personally appeared to Paul and sent
                him out to preach the gospel to the Gentiles
                {" "}
                <span className="italic">(Acts 9:3–6)</span>.
              </p>

              <p>
                Paul did not start as a follower of Christ. He began as one of the
                biggest threats to the early church.
              </p>
            </div>
          </section>

          {/* Paul before Jesus: Saul of Tarsus */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>😡</span>
              <span>Paul Before Jesus: Saul of Tarsus</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Saul was born in Tarsus, an important city in the Roman Empire,
                known for education and culture.
              </p>

              <ul className="list-disc list-inside space-y-1">
                <li>
                  Raised as a strict Pharisee
                  {" "}
                  <span className="italic">(Philippians 3:5–6)</span>
                </li>
                <li>
                  Trained under Gamaliel, a respected Jewish teacher
                  {" "}
                  <span className="italic">(Acts 22:3)</span>
                </li>
                <li>Passionate about the Law and protecting Jewish tradition</li>
              </ul>

              <p>
                Saul believed Christians were dangerous heretics that needed to be
                silenced. He hunted them, approved of their executions, and stood
                by as Stephen was stoned to death
                {" "}
                <span className="italic">
                  (Acts 7:57–60, Acts 8:1–3)
                </span>
                .
              </p>
            </div>
          </section>

          {/* Damascus road encounter */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🔥</span>
              <span>Paul’s Encounter With Jesus</span>
            </h2>

            <p className="text-xs md:text-sm text-gray-600 mb-2">
              <span className="italic">The Damascus Road – Acts 9:3–6</span>
            </p>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                On his way to Damascus to arrest more Christians, everything
                changed.
              </p>

              <ul className="list-disc list-inside space-y-1">
                <li>A bright light from heaven flashed around him.</li>
                <li>Saul fell to the ground.</li>
                <li>
                  Jesus said, “Saul, Saul, why are you persecuting Me?”
                </li>
                <li>Saul asked, “Who are You, Lord?”</li>
                <li>
                  Jesus replied, “I am Jesus, whom you are persecuting.”
                </li>
              </ul>

              <p>
                Saul was struck blind for three days and had to be led into
                Damascus by the hand. It was a humbling moment for a proud man.
              </p>

              <p>
                This was not only a vision. The risen Christ appeared to Saul
                personally. Later Paul could defend his apostleship with confidence,
                because Jesus Himself had called him.
              </p>
            </div>
          </section>

          {/* After the encounter */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🕊️</span>
              <span>After the Encounter: A Brand New Man</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                God sent a disciple named Ananias to pray for Saul and restore his
                sight
                {" "}
                <span className="italic">(Acts 9:10–18)</span>.
              </p>

              <ul className="list-disc list-inside space-y-1">
                <li>Saul was baptized.</li>
                <li>
                  He started preaching that Jesus is the Son of God
                  {" "}
                  <span className="italic">(Acts 9:20–22)</span>.
                </li>
                <li>
                  People were shocked. The man who once arrested Christians was now
                  one of them.
                </li>
                <li>
                  Jewish leaders turned on him, and he had to escape the city to
                  save his life.
                </li>
              </ul>
            </div>
          </section>

          {/* Hidden years */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>⏳</span>
              <span>The Hidden Years in Arabia</span>
            </h2>

            <p className="text-xs md:text-sm text-gray-600 mb-2">
              <span className="italic">Galatians 1:17–18</span>
            </p>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Before Paul became the well known missionary we read about in Acts,
                he spent three years in Arabia.
              </p>

              <p>
                He did not rush into public ministry. He spent time being taught by
                the Holy Spirit and relearning everything he thought he knew about
                God.
              </p>

              <p>Those quiet years became his training ground.</p>
            </div>
          </section>

          {/* New identity: apostle on a mission */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>✈️</span>
              <span>Paul’s New Identity: An Apostle on a Mission</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Paul was not only saved, he was sent. The word
                {" "}
                <span className="italic">apostle</span>
                {" "}
                means “one who is sent out.”
              </p>

              <p>
                Jesus personally called Paul to preach the gospel
                {" "}
                <span className="italic">(Galatians 1:11–12)</span>. In many of
                his letters he introduces himself with the same line:
                {" "}
                <span className="italic">
                  “Paul, an apostle of Christ Jesus…”
                </span>
                {" "}
                (Romans 1:1, Galatians 1:1).
              </p>

              <p>
                Some people questioned his authority, but Paul stood firm. He knew
                his calling came straight from Jesus.
              </p>
            </div>
          </section>

          {/* Mission to the nations */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>🌍</span>
              <span>Paul’s Mission: Bring the Gospel to the Nations</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Paul did not only preach in his hometown. He carried the gospel
                across the Roman world.
              </p>

              <h3 className="font-semibold mt-1">Major cities he visited:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Antioch</li>
                <li>Corinth</li>
                <li>Philippi</li>
                <li>Thessalonica</li>
                <li>Ephesus</li>
                <li>Rome</li>
              </ul>

              <p>
                He endured beatings, shipwrecks, and prison yet he kept going. His
                life verse could be summed up in his own words:
                {" "}
                <span className="italic">
                  “To live is Christ, to die is gain”
                </span>
                {" "}
                (Philippians 1:21).
              </p>
            </div>
          </section>

          {/* Paul’s letters */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>📬</span>
              <span>Paul’s Letters: Half the New Testament</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                Paul did not sit down to “write the Bible.” He wrote letters to
                real churches and real people facing real problems.
              </p>

              <p>
                Over time, those letters were recognized as inspired by the Holy
                Spirit
                {" "}
                <span className="italic">(2 Timothy 3:16)</span>
                {" "}
                and became part of Scripture.
              </p>

              <h3 className="font-semibold mt-1">Some of Paul’s letters:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <span className="font-semibold">Romans</span> – salvation by
                  faith.
                </li>
                <li>
                  <span className="font-semibold">1 and 2 Corinthians</span> –
                  church problems and spiritual gifts.
                </li>
                <li>
                  <span className="font-semibold">Galatians</span> – grace and the
                  Law.
                </li>
                <li>
                  <span className="font-semibold">Ephesians</span> – our identity
                  in Christ.
                </li>
                <li>
                  <span className="font-semibold">Philippians</span> – joy in every
                  season.
                </li>
                <li>
                  <span className="font-semibold">Colossians</span> – Jesus above
                  all.
                </li>
                <li>
                  <span className="font-semibold">1 and 2 Thessalonians</span> –
                  Jesus is coming back.
                </li>
                <li>
                  <span className="font-semibold">
                    1 and 2 Timothy, Titus, Philemon
                  </span>
                  {" "}
                  – letters to leaders and a friend.
                </li>
              </ul>

              <p>
                By the second century, Paul’s letters were being read all over the
                Christian world. When the New Testament was collected, thirteen of
                its books came from Paul.
              </p>
            </div>
          </section>

          {/* Legacy */}
          <section className="mb-2 md:mb-3">
            <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2 mb-3 text-gray-900">
              <span>💥</span>
              <span>Paul’s Legacy</span>
            </h2>

            <div className="space-y-3 text-sm md:text-base leading-relaxed text-gray-800">
              <p>
                The man who tried to destroy the church ended up helping build it.
                His story proves no one is too far gone for Jesus to redeem and use.
              </p>

              <p>From murderer to missionary.</p>
              <p>From legalist to preacher of grace.</p>
              <p>From enemy of Jesus to His servant.</p>

              <p className="font-semibold">
                “If anyone is in Christ, he is a new creation…” (2 Corinthians
                5:17)
              </p>
            </div>
          </section>

          {/* footer button */}
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
