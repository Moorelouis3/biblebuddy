import BibleStudyBreadcrumb from "@/components/BibleStudyBreadcrumb";
import Image from "next/image";

export default function HowToDefendTheBiblePage() {
  return (
    <article className="max-w-2xl mx-auto px-4 py-10">
      <BibleStudyBreadcrumb
        items={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Bible Study Hub", href: "/bible-study-hub" },
          { label: "Bible Insights", href: "/bible-study-hub/bible-insights" },
          { label: "How to Defend the Bible" }
        ]}
      />
      <div className="mb-8">
        <Image
          src="/Defenthebiblebanner.png"
          alt="How to Defend the Bible Banner"
          width={1200}
          height={600}
          className="rounded-xl shadow-sm w-full h-auto object-cover"
          priority
        />
      </div>
      <h1 className="text-3xl font-bold mb-2">How to Defend the Bible</h1>
      <h2 className="text-xl font-semibold mb-8 text-gray-700">Answering the Three Biggest Attacks Against Scripture</h2>

      <section className="mb-8">
        <p className="mb-4">When people want to tear down Christianity, they usually start with the Bible.</p>
        <p className="mb-4">If they can discredit Scripture, they think the entire faith collapses.</p>
        <p className="mb-4">So they say things like:</p>
        <p className="mb-4 italic">“It’s been changed.”<br/>“It was written by men.”<br/>“It’s just a myth.”</p>
        <p className="mb-4">If you don’t know how to respond, those statements can shake you.</p>
        <p className="mb-4">But here’s the truth:</p>
        <p className="mb-4">The Bible is not fragile.</p>
        <p className="mb-4">It has survived empires.<br/>Outlived critics.<br/>Buried skeptics.</p>
        <p className="mb-4">And it stands stronger today than ever.</p>
        <p className="mb-4">Let’s walk through the three biggest attacks — and how to answer them with confidence.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">1️⃣ “The Bible Was Changed.”</h2>
        <p className="mb-4">This is the most common accusation.</p>
        <p className="mb-4">People say the Bible has been rewritten, edited, corrupted over centuries.</p>
        <p className="mb-4">It sounds convincing.</p>
        <p className="mb-4">Until you look at the evidence.</p>
        <p className="mb-4">📜 We have over 25,000 manuscripts of the New Testament.</p>
        <p className="mb-4">That includes:</p>
        <p className="mb-4">• Greek manuscripts<br/>• Early translations (Latin, Syriac, Coptic)<br/>• Quotations from early church fathers</p>
        <p className="mb-4">To put that in perspective:</p>
        <p className="mb-4">Homer’s Iliad — one of the best preserved ancient works — has around 1,800 manuscripts.</p>
        <p className="mb-4">The New Testament has over 25,000.</p>
        <p className="mb-4">And many of them date incredibly close to the original writings.</p>
        <p className="mb-4">The John Rylands fragment (P52) is dated around AD 125 — possibly within 30 years of the original Gospel of John.</p>
        <p className="mb-4">The Dead Sea Scrolls — discovered in 1947 — contain Old Testament copies from 200 BC.</p>
        <p className="mb-4">When scholars compared them to modern Hebrew Bibles, the text matched almost word for word.</p>
        <p className="mb-4">Over 1,000 years of copying.<br/>And the message remained the same.</p>
        <p className="mb-4">Are there minor spelling differences?</p>
        <p className="mb-4">Yes.</p>
        <p className="mb-4">Are there textual variations?</p>
        <p className="mb-4">Yes.</p>
        <p className="mb-4">But here’s what matters:</p>
        <p className="mb-4">No core doctrine changes.<br/>No central belief is altered.<br/>No resurrection disappears.<br/>No crucifixion vanishes.</p>
        <p className="mb-4">The Bible has not been corrupted.</p>
        <p className="mb-4">It has been preserved.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">2️⃣ “The Bible Was Written by Men.”</h2>
        <p className="mb-4">Yes.</p>
        <p className="mb-4">And no.</p>
        <p className="mb-4">Yes — human authors physically wrote it.</p>
        <p className="mb-4">Moses wrote the Law.<br/>David wrote Psalms.<br/>Paul wrote letters.<br/>Luke compiled eyewitness accounts.</p>
        <p className="mb-4">But the claim misses something deeper.</p>
        <p className="mb-4">📖 2 Timothy 3:16 says:</p>
        <blockquote className="border-l-4 border-blue-300 pl-4 italic text-gray-700 mb-4">“All Scripture is God-breathed.”</blockquote>
        <p className="mb-4">That word in Greek means inspired — literally “breathed out by God.”</p>
        <p className="mb-4">Over 40 authors.<br/>Three languages.<br/>Three continents.<br/>1,500 years.</p>
        <p className="mb-4">And yet one unified story.</p>
        <p className="mb-4">From Genesis to Revelation, the Bible tells a single narrative:</p>
        <p className="mb-4">Creation.<br/>Fall.<br/>Redemption.<br/>Restoration.</p>
        <p className="mb-4">How do shepherds, kings, prophets, fishermen, tax collectors — people who never met — write one cohesive story?</p>
        <p className="mb-4">They didn’t collaborate.<br/>They didn’t share Google Docs.<br/>They lived centuries apart.</p>
        <p className="mb-4">And yet they point to the same Messiah.</p>
        <p className="mb-4">That’s not coincidence.</p>
        <p className="mb-4">That’s orchestration.</p>
        <p className="mb-4">Even secular scholars acknowledge the Bible’s literary unity.</p>
        <p className="mb-4">The human hands wrote.<br/>But the divine Author guided.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">3️⃣ “The Bible Is Fake.”</h2>
        <p className="mb-4">This one usually means:</p>
        <p className="mb-4 italic">“It’s myth.”<br/>“It’s legend.”<br/>“It’s religious imagination.”</p>
        <p className="mb-4">But the Bible is deeply rooted in real history.</p>
        <p className="mb-4">Archaeology continues to confirm names, places, and events described in Scripture.</p>
        <p className="mb-4">🏺 The Tel Dan Inscription references the “House of David” — confirming King David as a real historical figure.</p>
        <p className="mb-4">🏺 The Pilate Stone discovered in Caesarea confirms Pontius Pilate as Roman governor — exactly as the Gospels describe.</p>
        <p className="mb-4">🏺 The walls of Jericho show evidence of sudden collapse consistent with Joshua 6.</p>
        <p className="mb-4">🏺 The Pool of Bethesda in John 5 was once considered fictional — until archaeologists uncovered it.</p>
        <p className="mb-4">Again and again, critics say, “That never existed.”</p>
        <p className="mb-4">Then a shovel hits the ground.<br/>And history answers back.</p>
        <p className="mb-4">Even the resurrection of Jesus is defended historically.</p>
        <p className="mb-4">Multiple independent eyewitness accounts.<br/>An empty tomb.<br/>Hostile witnesses unable to produce a body.<br/>Disciples willing to die for what they claimed to see.</p>
        <p className="mb-4">People may die for what they believe is true.</p>
        <p className="mb-4">They do not die for what they know is false.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">The Bible Is Not Just a Religious Book</h2>
        <p className="mb-4">It is 66 books.</p>
        <p className="mb-4">Written by over 40 authors.</p>
        <p className="mb-4">Across 1,500 years.</p>
        <p className="mb-4">In Hebrew, Aramaic, and Greek.</p>
        <p className="mb-4">And somehow — it tells one continuous story of God saving humanity through Jesus Christ.</p>
        <p className="mb-4">Empires tried to burn it.</p>
        <p className="mb-4">Roman emperors destroyed copies.</p>
        <p className="mb-4">Philosophers mocked it.</p>
        <p className="mb-4">Enlightenment thinkers dismissed it.</p>
        <p className="mb-4">Communist regimes banned it.</p>
        <p className="mb-4">And yet today, it is the most translated, most distributed, most read book in human history.</p>
        <p className="mb-4">It has outlived every attack.</p>
        <p className="mb-4">Because truth does not expire.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Final Word</h2>
        <p className="mb-4">You don’t defend the Bible with emotion.</p>
        <p className="mb-4">You defend it with evidence.</p>
        <p className="mb-4">With history.</p>
        <p className="mb-4">With manuscripts.</p>
        <p className="mb-4">With archaeology.</p>
        <p className="mb-4">With fulfilled prophecy.</p>
        <p className="mb-4">When someone says:</p>
        <p className="mb-4 italic">“It was changed.”</p>
        <p className="mb-4">You say:<br/>We have the manuscripts.</p>
        <p className="mb-4 italic">When someone says:<br/>“It was written by men.”</p>
        <p className="mb-4">You say:<br/>Yes — guided by God.</p>
        <p className="mb-4 italic">When someone says:<br/>“It’s fake.”</p>
        <p className="mb-4">You say:<br/>Then explain the empty tomb.</p>
        <p className="mb-4">The Bible does not need panic.<br/>It needs understanding.</p>
        <p className="mb-4">Study it.<br/>Know it.<br/>Stand on it.</p>
        <p className="mb-4">Because when you know why it’s true —<br/>no comment section can shake you.</p>
      </section>
    </article>
  );
}
