import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-wrote-the-bible");

function VerseQuote({ text, reference }: { text: string; reference: string }) {
  return (
    <blockquote className="mt-5 rounded-2xl border border-[#d7e5ff] bg-[#f7faff] px-6 py-5 text-lg italic leading-8 text-slate-700">
      <p>&quot;{text}&quot;</p>
      <footer className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-[#0056fd]">
        {reference}
      </footer>
    </blockquote>
  );
}

function ArticleLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-bold text-[#0056fd] underline decoration-2 underline-offset-2 transition hover:text-[#003bb0]">
      {children}
    </Link>
  );
}

export default function WhoActuallyWroteTheBiblePage() {
  return (
    <BlogPostShell
      slug="who-wrote-the-bible"
      title={<>📖 Who Actually Wrote the Bible?</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>You have probably heard it from a friend, a professor, or a comment section.</p>
            <p>&quot;The Bible was just written by a bunch of men.&quot;</p>
            <p>
              Said that way, it is supposed to sting. It is supposed to make the whole book feel
              smaller. Less than the word of God. Just old writing from old men.
            </p>
            <p>
              📌 <strong>Here is the honest answer to who wrote the Bible. Around forty different
              people wrote it, across roughly 1,500 years, and the writers were not a club of
              scholars working together in one room.</strong>
            </p>
            <p>
              They were kings and shepherds. Fishermen and a doctor. A tax collector and a
              Pharisee who hated Christians before he became one. Some were rich. Some had
              nothing. Some wrote from a palace. One wrote from a Roman prison cell.
            </p>
            <p>That is not a weakness in the Bible&apos;s case. It is the heart of it.</p>
            <p>
              They wrote in three different languages. Hebrew, Aramaic, and Greek. On three
              different continents. Under empires that no longer exist today, from Egypt to Rome.
            </p>
          </div>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              This guide walks through who actually held the pen, what it means that God
              &quot;inspired&quot; them, and how all 66 books ended up recognized as one Bible.
              No dodging the hard parts. No pretending every question has a tidy, easy answer.
            </p>
            <p>
              Because the real story is more convincing than the caricature. Forty writers, one
              story, and a coherence across all of it that nobody can fully explain by coincidence
              alone.
            </p>
            <p>Let&apos;s get into it.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 Why This Matters for Your Faith
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>This is not a trivia question for Bible nerds.</p>
          <p>
            Your whole faith stands on the claim that the Bible is actually God&apos;s word, not
            just a good book someone wrote long ago.
          </p>
          <p>
            ⚠️ <strong>If the authorship of the Bible is a house of cards, so is everything you
            believe on top of it.</strong>
          </p>
          <p>
            So when someone says &quot;men wrote the Bible, not God,&quot; they are quietly asking
            you to choose. Either it came from God through people, or it is just people, full
            stop.
          </p>
          <p>
            The world&apos;s answer stops at &quot;ancient literature.&quot; A collection of
            myths, laws, and poems, the same as any other old book from any other old culture.
            Interesting, maybe. Worth studying, maybe. But nothing you would build your whole life
            on.
          </p>
          <p>That answer is not enough, because it cannot account for what is actually in the text.</p>
          <p>
            It cannot explain how forty strangers scattered across fifteen centuries, who never
            met, who wrote in three languages, who disagreed on plenty of ordinary things, kept
            telling the exact same story. One God. One fall. One promise. One Savior.
          </p>
          <p>
            📌 <strong>Knowing who wrote the Bible, and how, is not a side project. It is part of
            knowing why you can trust it.</strong>
          </p>
          <p>
            Think about what is actually at stake the next time a doubt like this creeps in
            during a Bible study, or a child at your dinner table asks who really wrote this book
            anyway. If you have no answer, the doubt sits there unanswered too.
          </p>
          <p>
            Once you see the real human hands behind it, and the ordinary lives those hands
            belonged to, this stops being an attack you have to defend against. It becomes one of
            the best reasons you have to believe.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Who Actually Wrote Each Part of the Bible
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Not One Author. Around Forty.
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Start with the plain scale of it.</p>
          <p>
            The Bible is 66 books, written by roughly 40 different people, over about 1,500 years.
            Not 1,500 years of editing one manuscript. 1,500 years between the first writer and
            the last one.
          </p>
          <p>
            Picture that span. It is longer than the entire history of the United States,
            stretched out more than seven times. The first writer could not have read the last
            writer&apos;s book in a thousand years, let alone met him.
          </p>
          <p>And the writers were not all the same kind of person, either.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>👑 Kings, like David and Solomon.</li>
          <li>🐑 Shepherds, like Moses and Amos.</li>
          <li>🎣 Fishermen, like Peter and John.</li>
          <li>💰 A tax collector, Matthew.</li>
          <li>🩺 A doctor, Luke.</li>
          <li>📜 A former Pharisee turned apostle, Paul.</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Some were highly educated. Some were working men with calloused hands. They wrote in
            Hebrew, Aramaic, and Greek, on three different continents, under at least half a dozen
            empires.
          </p>
          <p>
            💡 <strong>That spread is exactly why the coherence underneath it matters so much.</strong>
          </p>
          <p>
            No publisher assigned these writers a shared outline. No editor was alive across all
            fifteen centuries to keep everyone on the same page. Each one wrote in his own time,
            to his own audience, usually about a problem right in front of him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Shepherds and Kings Wrote Side by Side
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <ArticleLink href="/blog/moses">Moses</ArticleLink> is traditionally credited with
            writing the first five books of the Bible, Genesis through Deuteronomy. Before that,
            he spent forty years in the wilderness tending another man&apos;s sheep. Not the
            résumé you would expect for the man who records creation, the flood, and the exodus
            from Egypt.
          </p>
          <p>
            Centuries later, a shepherd boy named David was anointed king while his older brothers
            stood in line ahead of him. He spent the rest of his life writing the raw, honest
            poetry you find in the Psalms. Fear, guilt, joy, war, worship. All of it is in there,
            because he lived all of it.
          </p>
          <p>David himself said where the words came from:</p>
        </div>
        <VerseQuote
          text="The Spirit of the LORD spake by me, and his word was in my tongue."
          reference="2 Samuel 23:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Then there is Amos, a working herdsman with no formal training and no family of
            prophets behind him. He said so himself, plainly, when a priest tried to discredit him:
          </p>
        </div>
        <VerseQuote
          text="Then answered Amos, and said to Amaziah, I was no prophet, neither was I a prophet's son; but I was an herdman, and a gatherer of sycomore fruit: And the LORD took me as I followed the flock, and the LORD said unto me, Go, prophesy unto my people Israel."
          reference="Amos 7:14 and 15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A shepherd wrote the Law. A shepherd wrote the Psalms. A herdsman wrote a book of
            prophecy. God did not wait for a scholar before He started speaking.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Fishermen, a Tax Collector, and a Doctor
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jump a thousand years forward to the Gospels, and the pattern repeats with completely
            different men.
          </p>
          <p>
            Peter and John were working fishermen on the Sea of Galilee when Jesus called them.
            No seminary. No scrolls of their own to study from, most likely. Just nets, boats, and
            a willingness to drop both and follow.
          </p>
          <p>
            Matthew was a tax collector, which meant most of his own countrymen saw him as a
            traitor working for Rome. Jesus walked up to his booth and said two words:
          </p>
        </div>
        <VerseQuote
          text="And as Jesus passed forth from thence, he saw a man, named Matthew, sitting at the receipt of custom: and he saith unto him, Follow me. And he arose, and followed him."
          reference="Matthew 9:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That same man wrote one of the four Gospels. The despised tax collector became one of
            the four witnesses to the life of Christ.
          </p>
          <p>
            Then there is <ArticleLink href="/blog/luke">Luke</ArticleLink>, a Gentile physician
            and the only Gentile writer in the whole Bible. He opens his Gospel almost like a
            careful researcher explaining his method:
          </p>
        </div>
        <VerseQuote
          text="Forasmuch as many have taken in hand to set forth in order a declaration of those things which are most surely believed among us, Even as they delivered them unto us, which from the beginning were eyewitnesses, and ministers of the word; It seemed good to me also, having had perfect understanding of all things from the very first, to write unto thee in order, most excellent Theophilus, That thou mightest know the certainty of those things, wherein thou hast been instructed."
          reference="Luke 1:1 through 4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            A doctor&apos;s instinct for careful detail, used by God to write the longest Gospel
            and the book of Acts right after it.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. A Pharisee Who Became the Most Prolific Writer
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Of the roughly 27 books in the New Testament, around thirteen are traditionally
            attributed to one man. <ArticleLink href="/blog/paul">Paul</ArticleLink> wrote more of
            the New Testament than anyone else.
          </p>
          <p>
            He started out as a Pharisee who hunted down Christians. He was present at the stoning
            of Stephen. He was on the road to arrest more believers in Damascus when Jesus met him
            and knocked him flat.
          </p>
          <p>
            After that, he spent years as a tentmaker, earning his own keep with his hands, while
            planting churches across the Roman world.
          </p>
        </div>
        <VerseQuote
          text="And because he was of the same craft, he abode with them, and wrought: for by their occupation they were tentmakers."
          reference="Acts 18:3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Several of his letters were written from prison, including the very one that tells
            believers not to be anxious. A man in chains, writing peace to people who were free.
          </p>
          <p>
            And Peter, the fisherman, read Paul&apos;s letters and called them Scripture in his own
            words, while Paul was still alive writing more of them:
          </p>
        </div>
        <VerseQuote
          text="And account that the longsuffering of our Lord is salvation; even as our beloved brother Paul also according to the wisdom given unto him hath written unto you; As also in all his epistles, speaking in them of these things; in which are some things hard to be understood, which they that are unlearned and unstable wrest, as they do also the other scriptures, unto their own destruction."
          reference="2 Peter 3:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Notice that. One apostle calling another apostle&apos;s letters &quot;scripture,&quot;
            in the same breath as the Old Testament. That recognition did not wait a thousand
            years. It started while the ink was barely dry.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. What &quot;Inspired by God&quot; Actually Means
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            So if real, ordinary men held the pen, in what sense is this God&apos;s word and not
            just theirs?
          </p>
          <p>Paul answers that directly, writing to a young pastor named Timothy:</p>
        </div>
        <VerseQuote
          text="All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, throughly furnished unto all good works."
          reference="2 Timothy 3:16 and 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Inspiration</strong> there does not mean the writers felt inspired the way an
            artist feels inspired by a sunset. It means the words themselves came from God&apos;s
            own breath, working through a human writer.
          </p>
          <p>Peter puts it a different way, talking about the prophets:</p>
        </div>
        <VerseQuote
          text="Knowing this first, that no prophecy of the scripture is of any private interpretation. For the prophecy came not in old time by the will of man: but holy men of God spake as they were moved by the Holy Ghost."
          reference="2 Peter 1:20 and 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Moved</strong> is the key word. Think of a sail catching wind. The sailor is
            still steering, still working the ropes, still bringing his own skill to the job. But
            the wind is what actually moves the ship.
          </p>
          <p>
            That is a world away from dictation. God was not standing over Luke&apos;s shoulder
            reading out sentences word for word while Luke copied them down with no mind of his
            own.
          </p>
          <p>
            ❓ How do we know that? Because you can hear the difference in the writers themselves.
          </p>
          <p>
            Luke writes like a careful physician documenting a case. Paul writes like a trained
            debater building an argument point by point. David writes like a man pouring out raw
            emotion in verse. Amos writes like a plain spoken farmer who does not care whose feelings
            get hurt.
          </p>
          <p>
            📌 <strong>God worked through each writer&apos;s own vocabulary, education, and
            personality. He did not erase it.</strong>
          </p>
          <p>
            There is one place in the Bible that shows us the mechanics of this up close. The
            prophet Jeremiah dictated his prophecies out loud to a scribe named Baruch, who wrote
            them down on a scroll.
          </p>
        </div>
        <VerseQuote
          text="Then Jeremiah called Baruch the son of Neriah: and Baruch wrote from the mouth of Jeremiah all the words of the LORD, which he had spoken unto him, upon a roll of a book."
          reference="Jeremiah 36:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Baruch confirmed exactly how it happened when he was questioned about it later:</p>
        </div>
        <VerseQuote
          text="Then Baruch answered them, He pronounced all these words unto me with his mouth, and I wrote them with ink in the book."
          reference="Jeremiah 36:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That is one real, recorded process: a prophet speaking, a scribe writing it down. It
            shows the human side was never hidden or denied. It also shows that even here, the
            words going down on that scroll were still, in the text&apos;s own claim, &quot;the
            words of the LORD.&quot;
          </p>
          <p>Human hands. Divine words. The Bible never pretends it was any other way.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Striking Thing Underneath All of This
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is what should actually stop you.</p>
          <p>
            Forty writers. Three languages. Three continents. Fifteen centuries. Kings, shepherds,
            fishermen, a doctor, a tax collector, and a former persecutor of the church. Most of
            them never met each other. Many had no way of reading what the others had written.
          </p>
          <p>And yet one story runs through every single book.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>✅ One God, who exists from the beginning.</li>
          <li>✅ One humanity, made in His image and fallen from it.</li>
          <li>✅ One promise, running from Genesis to a Savior nobody but God could have arranged.</li>
          <li>✅ One ending, where everything broken gets made new.</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Try that experiment with any other forty writers across fifteen hundred years. Pick
            any topic. You will not get agreement. You will get contradiction, drift, and forty
            different conclusions.
          </p>
          <p>
            📌 <strong>The Bible&apos;s coherence across that kind of spread is not something
            forty independent men could have coordinated on their own.</strong>
          </p>
          <p>
            That does not prove every reader&apos;s question gets answered. But it is exactly the
            kind of evidence 2 Timothy 3:16 claims. One divine mind, working through many human
            ones.
          </p>
          <p>
            Look at how far back the thread runs. Genesis promises that a descendant of the woman
            will crush the serpent&apos;s head. The prophets, writing centuries later with no way
            to compare notes with Moses, keep pointing forward to a coming King and a suffering
            Servant. Then the Gospels, written by men who actually watched Jesus die and rise,
            show that promise landing exactly where it was always pointed.
          </p>
          <p>
            A lamb covers sin at the very first Passover in Exodus. A lamb is what John the
            Baptist calls Jesus when he first sees Him. A lamb is still the picture of Christ in
            the very last chapters of Revelation, written decades later by yet another author on
            an island in exile.
          </p>
          <p>
            Nobody planned that image across four different writers and well over a thousand
            years between the first and the last of them. That is not luck. That is a single
            author working through many pens.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. How the Books Were Recognized as the Bible
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            One more honest question belongs here. If forty different people wrote separate
            books over fifteen centuries, who decided which books belonged together as one Bible?
          </p>
          <p>
            Start with the Old Testament. By the time Jesus walked the earth, the Jewish people
            already recognized a settled collection of Scripture, organized in three parts.
            Jesus Himself names all three after His resurrection:
          </p>
        </div>
        <VerseQuote
          text="And he said unto them, These are the words which I spake unto you, while I was yet with you, that all things must be fulfilled, which were written in the law of Moses, and in the prophets, and in the psalms, concerning me."
          reference="Luke 24:44"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The law, the prophets, and the psalms. That is Jesus affirming the Hebrew Scriptures
            as already settled and authoritative in His own day. No church council invented the
            Old Testament centuries later. It was already there, already trusted, long before the
            first Gospel was written.
          </p>
          <p>
            The New Testament came together differently, but just as early. As you already saw,
            Peter was calling Paul&apos;s letters &quot;scripture&quot; while Paul was still
            alive. The early church was not waiting around for permission. They recognized the
            apostles&apos; writings as carrying God&apos;s authority almost as soon as they were
            written, because the apostles had walked with Jesus or been personally sent by Him.
          </p>
          <p>
            Over the next few centuries, church leaders did formally confirm which books had
            always been treated this way across the churches. That process is usually called
            establishing the canon. It was not a vote to decide which books should count. It was a
            recognition of which books already had been counted from the start, because they
            carried apostolic authority and lined up with what had already been received.
          </p>
          <p>
            And here is the honest part some people never get told. There are other ancient
            Jewish and early Christian writings, often grouped under the name Apocrypha, that did
            not make it into most Protestant Bibles, though some are included in Catholic and
            Orthodox Bibles. Those books were weighed and set aside by most of the church because
            they were not recognized as carrying the same prophetic or apostolic authority, not
            because anyone was trying to hide something.
          </p>
          <p>
            💡 <strong>The question was never which books Christians liked best. It was which
            books had actually been received as God&apos;s word from the beginning.</strong>
          </p>
          <p>
            One more piece of evidence is worth knowing. The Dead Sea Scrolls, copies of Old
            Testament books hidden in caves centuries before Christ and rediscovered in the last
            century, match the text handed down through the ages remarkably closely. Across all
            those centuries of hand copying by scribes, with no printing press and no computer,
            the words did not quietly drift into something different.
          </p>
          <p>
            That kind of care did not happen by accident. Scribes who copied Scripture treated
            the task as sacred, because they believed, just like you are learning here, that real
            men were handling real words from God.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ✅ Practical Tips: Reading the Bible With This in Mind
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Knowing who wrote the Bible should change how you read it, not just how you argue about it.</p>
          <p>Here are seven ways to put that knowledge to work.</p>
        </div>
        <ol className="mt-4 list-decimal space-y-4 pl-6 text-lg leading-8 text-slate-700">
          <li>
            <strong>Notice the writer&apos;s voice.</strong> Before you read a book, ask who wrote
            it and what their life looked like. David&apos;s Psalms read differently once you
            remember he was both a shepherd and a king who sinned badly and repented honestly.
          </li>
          <li>
            <strong>Let the human detail stay human.</strong> Luke&apos;s careful opening, Paul&apos;s
            arguments, Amos&apos;s bluntness. These are not flaws to explain away. They are evidence
            that God really did work through real personalities.
          </li>
          <li>
            <strong>Read across the spread on purpose.</strong> Read a psalm from David next to a
            letter from Paul. Notice how different they sound and how the same God and the same
            story still come through both.
          </li>
          <li>
            <strong>Do not let one hard question stall the whole book.</strong> A question about
            how the canon formed, or how a specific verse was written down, is worth studying. It
            is not a reason to set down the whole Bible while you wait for a perfect answer.
          </li>
          <li>
            <strong>Learn basic authorship before a conversation gets hard.</strong> When someone
            says &quot;men just wrote the Bible,&quot; you now have a real answer. Forty men,
            fifteen centuries, one coherent story. That is worth knowing before you need it.
          </li>
          <li>
            <strong>Use a study Bible or a trusted resource for the details.</strong> Who wrote
            Hebrews, how the Pentateuch came together, where a particular book was likely written
            from. These are good questions to keep learning about for the rest of your life.
          </li>
          <li>
            <strong>Remember the point was never the writers.</strong> Forty different men held
            the pen. One God is the reason their books agree. Keep your eyes on Him, not just on
            the history behind the page.
          </li>
          <li>
            <strong>Bring this to someone who is doubting, gently.</strong> If a friend or your
            own teenager says the Bible is just old writing by old men, you do not need to argue.
            You can just hand them the real story. It is more interesting than the caricature
            they were given.
          </li>
        </ol>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses About Who Wrote Scripture
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you want the five verses that anchor everything in this guide, start here.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. 2 Timothy 3:16 and 17</h3>
        <VerseQuote
          text="All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness: That the man of God may be perfect, throughly furnished unto all good works."
          reference="2 Timothy 3:16 and 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the clearest claim in the whole Bible about where Scripture comes from. Paul
            wrote it to Timothy, a young pastor he was training, as a reminder of what he was
            actually holding in his hands when he opened the Scriptures.
          </p>
          <p>
            Notice what it is for. Not trivia. Doctrine, reproof, correction, and instruction in
            righteousness. God did not inspire Scripture to win arguments. He inspired it to shape
            lives.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. 2 Peter 1:20 and 21</h3>
        <VerseQuote
          text="Knowing this first, that no prophecy of the scripture is of any private interpretation. For the prophecy came not in old time by the will of man: but holy men of God spake as they were moved by the Holy Ghost."
          reference="2 Peter 1:20 and 21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This is the sail catching wind, in Scripture&apos;s own words. The prophets spoke, but
            what carried them was not their own will. It was the Holy Ghost moving them.
          </p>
          <p>
            That is the balance this whole guide is built on. Real human writers, truly moved by
            God, never erased, never acting on their own apart from Him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. 2 Peter 3:15 and 16</h3>
        <VerseQuote
          text="And account that the longsuffering of our Lord is salvation; even as our beloved brother Paul also according to the wisdom given unto him hath written unto you; As also in all his epistles, speaking in them of these things; in which are some things hard to be understood, which they that are unlearned and unstable wrest, as they do also the other scriptures, unto their own destruction."
          reference="2 Peter 3:15 and 16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            This verse is proof that the New Testament was not recognized centuries after the
            fact by strangers. One apostle who knew Jesus personally called another apostle&apos;s
            letters Scripture, in writing, while that apostle was still alive.
          </p>
          <p>
            It is also refreshingly honest. Peter admits some of Paul&apos;s writing is hard to
            understand. The Bible does not claim to be simple. It claims to be true.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Luke 24:44</h3>
        <VerseQuote
          text="And he said unto them, These are the words which I spake unto you, while I was yet with you, that all things must be fulfilled, which were written in the law of Moses, and in the prophets, and in the psalms, concerning me."
          reference="Luke 24:44"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jesus stakes His own resurrection claim on the authority of a Scripture collection that
            already existed in His day. He did not invent a new book. He fulfilled the one that was
            already there, written by Moses the shepherd, the prophets after him, and David the
            shepherd king.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 2 Samuel 23:1 and 2</h3>
        <VerseQuote
          text="Now these be the last words of David. David the son of Jesse said, and the man who was raised up on high, the anointed of the God of Jacob, and the sweet psalmist of Israel, said, The Spirit of the LORD spake by me, and his word was in my tongue."
          reference="2 Samuel 23:1 and 2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Near the end of his life, David himself names exactly what you have been reading about
            this whole guide. His tongue, his words, his poetry. And behind it, the Spirit of the
            Lord speaking by him.
          </p>
          <p>That is the pattern for every writer in this whole article. A real man. A real voice. A real God behind it.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Who Wrote the Bible
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did one person write the whole Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. The Bible is 66 books written by roughly 40 different people over about 1,500
          years. It is often bound as one book today, but it was never written by one hand or in
          one sitting.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Moses really write the first five books?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jewish and Christian tradition has long credited Genesis through Deuteronomy to Moses,
          and Scripture itself connects him to this writing in several places, including the law
          given at Sinai. Scholars discuss how later editing and compiling may have shaped the
          final form, but the core content is tied to Moses and his role as Israel&apos;s leader
          and lawgiver.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who wrote the four Gospels?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Matthew the former tax collector, Mark, Luke the physician, and John, one of Jesus&apos;s
          closest disciples. Each wrote with a different purpose and a different audience in
          mind, which is exactly why reading all four together gives a fuller picture of the same
          life.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did God dictate every word to the writers?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not in the sense of forcing writers to copy exact sentences with no mind of their own.
          2 Peter 1:21 says holy men were &quot;moved&quot; by the Holy Ghost, language that
          points to guidance working through a person, not dictation erasing that person. You can
          hear each writer&apos;s own voice and vocabulary throughout Scripture, and sometimes,
          as with Paul, you can even see him using a secretary to write down what he dictated,
          a common practice of the time that never changed whose authority the letter carried.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">If humans wrote it, how can the Bible be God&apos;s word?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because Scripture claims both things are true at once. Human writers held the pen, and
          the Holy Spirit moved them as they wrote, so the result carries God&apos;s authority
          through human language. That is what 2 Timothy 3:16 means by &quot;given by
          inspiration of God.&quot;
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who decided which books went into the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No single council invented the Bible from scratch. The Old Testament was already a
          recognized collection by the time of Jesus, who affirmed it. The New Testament books
          were recognized as carrying apostolic authority very early, often within the lifetimes
          of other apostles, and later councils confirmed what churches had already received
          rather than creating something new.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the Apocrypha, and why is it not in every Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Apocrypha is a group of ancient Jewish writings included in Catholic and Orthodox
          Bibles but left out of most Protestant ones. They were weighed against the same
          standard as the rest of Scripture, and most of the church did not recognize them as
          carrying prophetic or apostolic authority, which is why they are often published
          separately or omitted rather than treated as Scripture.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How do we know the authors are who they claim to be?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Through a mix of internal claims, early church testimony, and historical evidence like
          manuscripts and quotations from early Christian writers close to the apostles&apos; own
          time. No ancient document comes with a video recording, but the Bible has far more
          manuscript support than almost any other ancient text, and those manuscripts agree with
          each other to a remarkable degree across many centuries of hand copying.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Were the Gospel writers eyewitnesses to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Matthew and John were among the twelve disciples who walked with Jesus daily. Mark is
          traditionally connected to Peter&apos;s own eyewitness preaching, and Luke was not an
          eyewitness himself but says plainly that he gathered his account from those who were
          (Luke 1:2). That mix of direct eyewitness testimony and careful secondhand research is
          exactly what you would expect from honest historical reporting, not invented legend.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does it matter who wrote the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because trust in the Bible is not blind trust. It is informed trust, built on real
          history, real writers, and a real pattern of agreement across centuries that nobody
          coordinated on their own. Knowing the human story behind Scripture only makes the
          divine story behind it more remarkable, not less.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>If you remember nothing else from this guide, remember these three things.</p>
          <p>
            📌 <strong>Around forty people wrote the Bible, across fifteen centuries, and they
            were kings, shepherds, fishermen, a doctor, a tax collector, and a former persecutor
            of the church.</strong>
          </p>
          <p>
            📌 <strong>God worked through each writer&apos;s own voice and personality. Inspiration
            was never dictation that erased the human hand.</strong>
          </p>
          <p>
            📌 <strong>One coherent story runs through all of it, and that coherence is some of the
            best evidence you have that a single divine mind stands behind every human one.</strong>
          </p>
          <p>
            The next time someone says &quot;the Bible was just written by men,&quot; you can
            agree with the first half of that sentence without flinching.
          </p>
          <p>Yes. Real men held the pen.</p>
          <p>
            And then you can finish the sentence the way <ArticleLink href="/blog/what-is-the-bible">Scripture itself</ArticleLink>{" "}
            does. Moved by God, every one of them, into one story that still has not stopped
            changing lives.
          </p>
          <p>
            If this question has ever shaken you, or you want to go deeper into{" "}
            <ArticleLink href="/blog/why-so-many-bible-translations">how we got the Bible we read today</ArticleLink>{" "}
            or{" "}
            <ArticleLink href="/blog/how-to-defend-the-bible">how to answer the hardest questions about it</ArticleLink>
            , keep studying. The evidence only gets stronger the closer you look.
          </p>
          <p>
            A shepherd, a king, a fisherman, a doctor, a tax collector, and a former persecutor of
            the church all picked up a pen at different points across fifteen centuries. None of
            them set out to write a bestseller. Most of them never knew how far their words would
            travel.
          </p>
          <p>That is the one next step worth taking today. Keep looking closer. The story holds up.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
