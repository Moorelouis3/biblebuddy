import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("inspiring-biblical-characters", {
  title: "Inspiring Biblical Characters and What We Can Learn From Them",
});

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

export default function InspiringBiblicalCharactersPage() {
  return (
    <BlogPostShell
      slug="inspiring-biblical-characters"
      title={<>📖 Inspiring Biblical Characters and What We Can Learn From Them</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Some Bible stories feel like they are about someone else&apos;s life.</p>
            <p>Not yours.</p>
            <p>
              You read about people who heard from God clearly, obeyed instantly, and never
              doubted.
            </p>
            <p>
              Then you close the book and go back to your actual week. The deadline. The
              diagnosis. The doubt at 2am.
            </p>
            <p>
              📌 <strong>Here is what the text actually shows. The most inspiring biblical
              characters were not superheroes. They were flawed, afraid, and ordinary, and God
              used them anyway.</strong>
            </p>
            <p>This is a walk through eight of them.</p>
            <p>Noah, David, Esther, Daniel, Ruth, Jonah, Mary, and Paul.</p>
            <p>
              Each one shows a different face of faith: obedience, repentance, courage, prayer,
              loyalty, perseverance, humility, and transformation.
            </p>
            <p>
              You will get their real stories, straight from Scripture, not the version that got
              simplified for a graphic on a phone screen.
            </p>
            <p>Let&apos;s meet them.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🕰️ Who These People Were
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>These eight did not live in the same country or even close to the same century.</p>
          <p>Noah lived before the flood. Paul lived after the resurrection of Jesus.</p>
          <p>That is roughly two thousand years apart, spread across Genesis and Acts.</p>
          <p>
            Some were kings. Some were exiles and prisoners. One was a teenage girl in a small
            town nobody had heard of.
          </p>
          <p>
            📌 <strong>What they share is not status. It is that God met each of them exactly
            where they were and asked them to trust Him with what came next.</strong>
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 8 Inspiring Biblical Characters and the Faith They Show
        </h2>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Here is each one, in their own story, with the detail that matters most.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Noah: Obedience Before the Rain Ever Came
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            God told Noah to build an ark, on dry land, with no rain in the forecast, because a
            flood was coming that would cover the earth.
          </p>
          <p>
            Noah did not argue. He built it exactly to the size and material God specified, gopher
            wood sealed with pitch inside and out.
          </p>
          <p>
            📌 A detail popular retellings usually simplify: the animals did not all come in two
            by two. Clean animals came in by sevens, unclean animals by twos (Genesis 7:2).
          </p>
        </div>
        <VerseQuote
          text="Thus did Noah; according to all that God commanded him, so did he."
          reference="Genesis 6:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Obedience that only shows up once the payoff is obvious is not really obedience.
            Noah&apos;s was tested for decades before it ever rained.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. David: Repentance That Did Not Make Excuses
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            David was Israel&apos;s greatest king, and he committed adultery with Bathsheba, then
            had her husband Uriah killed in battle to cover it up.
          </p>
          <p>
            The prophet Nathan confronted him directly, and David did not defend himself or shift
            the blame. He simply said, I have sinned against the LORD.
          </p>
          <p>Then he wrote what became one of the most honest prayers in Scripture.</p>
        </div>
        <VerseQuote
          text="Create in me a clean heart, O God; and renew a right spirit within me."
          reference="Psalm 51:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ David&apos;s sin was serious and it had real consequences he carried for the rest of
            his life. His repentance did not undo the damage. It restored his walk with God.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Esther: Courage for a Moment She Did Not Choose
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Esther was a Jewish orphan raised by her cousin Mordecai, and she became queen of
            Persia without anyone in the palace knowing she was Jewish.
          </p>
          <p>
            When a royal official named Haman schemed to destroy every Jew in the empire, Mordecai
            asked Esther to go before the king uninvited, a move that could legally get her
            killed.
          </p>
          <p>
            📌 One famous line often gets attributed to Esther as her own bold declaration. It was
            actually Mordecai&apos;s challenge to her.
          </p>
        </div>
        <VerseQuote
          text="For if thou altogether holdest thy peace at this time, then shall there enlargement and deliverance arise to the Jews from another place; but thou and thy father's house shall be destroyed: and who knoweth whether thou art come to the kingdom for such a time as this?"
          reference="Esther 4:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Esther fasted three days, then went in anyway, and her courage saved her entire
            people.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. Daniel: Prayer That Did Not Stop for a Death Threat
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Daniel was taken from Jerusalem to Babylon as a young man and served under multiple
            pagan kings for decades without compromising his faith.
          </p>
          <p>
            When jealous officials talked the king into outlawing prayer to anyone but himself for
            thirty days, Daniel did not change a single habit.
          </p>
        </div>
        <VerseQuote
          text="Now when Daniel knew that the writing was signed, he went into his house; and his windows being open in his chamber toward Jerusalem, he kneeled upon his knees three times a day, and prayed, and gave thanks before his God, as he did aforetime."
          reference="Daniel 6:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            He prayed with his windows open in a city where anyone could see him do it, knowing
            the penalty was the lions&apos; den.
          </p>
          <p>
            💡 You can walk through that whole night, verse by verse, inside{" "}
            <strong>Bible Buddy</strong>, and it is completely free to open right now.
          </p>
          <p>God shut the lions&apos; mouths, and Daniel walked out the next morning unharmed.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. Ruth: Loyalty With Nothing Left to Gain
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Ruth was a Moabite woman whose husband died, leaving her with her mother in law Naomi
            and no obligation, by custom, to stay attached to Naomi&apos;s people or Naomi&apos;s
            God.
          </p>
          <p>Naomi told her to go back home to Moab. Ruth refused.</p>
        </div>
        <VerseQuote
          text="And Ruth said, Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God:"
          reference="Ruth 1:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            She left her homeland for a country with no reason to welcome her, gleaned leftover
            grain in the fields to keep them both fed, and later married a man named Boaz.
          </p>
          <p>
            📌 Ruth became the great grandmother of King David, placing a Moabite widow directly
            in the family line that leads to Jesus.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. Jonah: Perseverance He Did Not Volunteer For
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            God told Jonah to preach to Nineveh, the capital of Israel&apos;s enemy, and Jonah
            booked a ship sailing the opposite direction instead.
          </p>
          <p>
            A storm hit, the sailors threw him overboard at his own suggestion, and Scripture says
            God prepared a great fish to swallow him.
          </p>
          <p>
            ⚠️ Popular versions call it a whale. The text just says a great fish and never names
            the species.
          </p>
        </div>
        <VerseQuote
          text="Now the LORD had prepared a great fish to swallow up Jonah. And Jonah was in the belly of the fish three days and three nights."
          reference="Jonah 1:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Three days in the dark changed his mind. He prayed, was vomited onto dry land, and
            finally went and preached, and the whole city repented.
          </p>
          <p>
            💡 Jonah never fully got comfortable with the outcome. He obeyed and saw it through
            anyway. That is what perseverance looks like when your heart has not caught up yet.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. Mary: Humility in an Impossible Assignment
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Mary was likely a teenager in the small town of Nazareth, engaged to a carpenter named
            Joseph, when the angel Gabriel told her she would carry and give birth to the Messiah
            while still a virgin.
          </p>
          <p>
            This was not a comfortable honor. It risked her reputation, her engagement, and
            possibly her life under the law of that time.
          </p>
        </div>
        <VerseQuote
          text="And Mary said, Behold the handmaid of the Lord; be it unto me according to thy word. And the angel departed from her."
          reference="Luke 1:38"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 She did not ask for proof or a delay. She surrendered before she understood how any
            of it would work.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          8. Paul: Transformation From Persecutor to Preacher
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Before he was Paul, he was Saul, a man who approved of the stoning of Stephen and
            hunted down Christians to have them imprisoned or killed.
          </p>
          <p>
            On the road to Damascus, a light from heaven stopped him and the risen Jesus spoke to
            him directly. Saul was blind for three days afterward.
          </p>
          <p>
            He came out of that encounter a different man, and spent the rest of his life planting
            churches, writing most of the New Testament, and absorbing beatings, shipwrecks, and
            imprisonment for the gospel he once tried to destroy.
          </p>
          <p>
            His full conversion and everything that came after it are worth reading start to
            finish in <ArticleLink href="/blog/paul">Paul&apos;s complete story</ArticleLink>. And
            if a total turnaround like that interests you,{" "}
            <ArticleLink href="/blog/moses">Moses</ArticleLink> went through something similar,
            from a wanted fugitive to the man who led Israel out of Egypt.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💡 What Their Lives Teach You Today
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. God Does Not Wait for You to Be Ready
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Not one of these eight felt fully qualified going in. Ruth was a foreigner with no
            standing. Mary was a teenager.
          </p>
          <p>📌 Feeling unready has never disqualified anyone God actually called.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Obedience and Courage Usually Come Before the Proof
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Noah built for decades before it rained. Esther risked her life before she knew the
            outcome.{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">Fear</ArticleLink> and
            faith showed up in the same room for both of them, and faith moved first anyway.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Character Is Built in Small, Repeated Choices
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Daniel&apos;s habit of praying three times a day did not start the week the death
            decree was signed. It was already who he was.{" "}
            <ArticleLink href="/blog/building-self-control">Self control</ArticleLink> practiced
            when nobody is watching is what holds when everybody is.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Bible Characters
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Were these Bible characters real historical people?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Scripture presents Noah, David, Esther, Daniel, Ruth, Jonah, Mary, and Paul as real
          people in real historical settings, not symbols or parables. Their stories come with
          specific names, places, and events that the rest of the Bible treats as history, and
          figures like David and Paul are also referenced outside Scripture in ways that support
          their existence.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          What is the difference between Esther&apos;s courage and Ruth&apos;s loyalty?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Esther risked her life in one dramatic moment, approaching the king uninvited to save
          her people. Ruth&apos;s loyalty was quieter and longer, a daily decision to stay with
          Naomi with no promise anything good would come of it. Both required real faith. One was
          a moment, the other was a season.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Why does the Bible include people who failed, like David and Jonah?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Because Scripture is honest about the people God uses. Neither David&apos;s affair nor
          Jonah&apos;s running away is hidden or excused. Their failures sit right alongside their
          faith, which is part of what makes these stories trustworthy instead of propaganda.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Which biblical character is easiest to relate to?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Whichever one is closest to what you are facing right now. If you feel unqualified, look
          at Mary or Ruth. If you are running from something God has asked of you, look at Jonah.
          If you need to repent honestly, look at David. That is exactly how these stories are
          meant to work.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          Are these eight characters connected in the Bible&apos;s bigger story?
        </h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, loosely. Ruth&apos;s family line leads to David, and both lead to Jesus, whom Paul
          later spent his life preaching. Even Daniel&apos;s exile and Esther&apos;s rescue happen
          inside the same larger story of God preserving His people through captivity so that
          story could continue. None of these are isolated tales.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Eight different people. Eight different struggles. One thing in common.</p>
          <p>
            📌 <strong>None of them were impressive before God got involved. All of them were
            faithful once He did.</strong>
          </p>
          <p>
            Noah obeyed before it made sense. David repented without excuses. Esther risked
            everything for a moment she never asked for. Daniel prayed through a death threat.
            Ruth stayed loyal with nothing to gain. Jonah persevered even reluctantly. Mary
            surrendered to the impossible. Paul let God completely remake him.
          </p>
          <p>❓ Which one sounds the most like where you are right now?</p>
          <p>
            Whichever it is, their God is still the same God, and He is not asking you to be
            impressive either.
          </p>
          <p>He is asking you to be willing.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Reading these stories in a paragraph is a start. Reading them for yourself, one verse
            at a time, is where they actually come alive. If you have never done that before,{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink> is
            a good place to begin.
          </p>
          <p>
            Inside <strong>Bible Buddy</strong>, you will find:
          </p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>📖 Verse by verse explanations in plain English</li>
          <li>🌱 Daily devotionals that meet you where you are</li>
          <li>🔥 A reading streak that keeps you coming back one day at a time</li>
          <li>🤝 A community of believers walking the same road</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>It is free to start. No pressure, no credit card.</p>
          <p>Just you, God&apos;s Word, and a little help understanding it.</p>
          <p>
            Thousands of Christians are already reading this way, one day at a time. There is room
            for you.
          </p>
          <p>Start studying by clicking the button below. 👇</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
