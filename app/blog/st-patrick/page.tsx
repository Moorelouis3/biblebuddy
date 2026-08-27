import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("st-patrick", {
  title: "Who Was St. Patrick? The Slave Who Went Back to Ireland",
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

export default function StPatrickPage() {
  return (
    <BlogPostShell
      slug="st-patrick"
      title={<>📖 Who Was St. Patrick? The Slave Who Went Back to Ireland</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>For most people today, St. Patrick&apos;s Day means one thing.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>🍀 Wear green</li>
            <li>🍺 Celebrate loudly</li>
            <li>🎉 Call it Irish culture</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>But the day was never meant to begin as a party.</p>
            <p>It began as a story about slavery, faith, and forgiveness.</p>
            <p>
              📌 <strong>Ask yourself something before you read this. Is there a person or a place
              you would never go back to?</strong>
            </p>
            <p>Somebody who took something from you that you are still paying for.</p>
            <p>A season you got out of and swore you would never revisit.</p>
            <p>Everybody has one.</p>
            <p>Patrick went back to his.</p>
            <p>He was kidnapped at sixteen and enslaved for six years.</p>
            <p>He escaped. He got home. He was free.</p>
            <p>And then he chose to return to the people who had taken his life from him.</p>
            <p>
              This is the real story of St. Patrick, what the history actually says, which famous
              parts are legend, and what his life still asks of you.
            </p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Patrick Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is the first surprise.</p>
          <p>
            ⚠️ <strong>Patrick was not Irish.</strong>
          </p>
          <p>He was born in Roman Britain in the late 300s AD.</p>
          <p>His birth name was likely Maewyn Succat.</p>
          <p>Patricius was the Latin name he took later, which became Patrick.</p>
          <p>His father was a deacon and his grandfather a priest.</p>
          <p>So he grew up around church without it meaning anything to him.</p>
          <p>He admitted that himself, in his own writing, as an old man.</p>
          <p>
            📌 Unlike most figures this old, we have two documents Patrick actually wrote: his{" "}
            <strong>Confessio</strong> and a <strong>Letter to the Soldiers of Coroticus</strong>.
          </p>
          <p>
            💡 That matters. Almost everything popular about Patrick is legend, but the core of his
            story comes from his own hand.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 The Life of St. Patrick</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Kidnapped at Sixteen</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>When Patrick was about sixteen, Irish raiders attacked his village.</p>
          <p>He was captured. Taken across the sea. Sold.</p>
          <p>For six years he worked as a shepherd in Ireland.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>🌧️ Alone in brutal weather</li>
          <li>🌙 Guarding animals through the night</li>
          <li>⛓️ No freedom, no family, no way home</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This was not a rough patch. This was his entire youth.</p>
          <p>Sixteen to twenty two, gone.</p>
          <p>And in those years, something in him changed.</p>
          <p>He later wrote that he began praying constantly.</p>
          <p>Sometimes, he says, close to a hundred prayers in a day.</p>
          <p>Not because a preacher told him to.</p>
          <p>Because he had nothing else.</p>
          <p>
            💡 <strong>Hardship stripped away his comfort. Isolation stripped away his
            distraction. And the faith he had ignored his whole life became real.</strong>
          </p>
          <p>
            ⚠️ Notice God did not rescue him out of it right away. He met him inside it. If you are
            praying in a hard place right now,{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-anxiety">what the Bible says
            about anxiety</ArticleLink> walks through that same ground.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. The Escape</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>After six years, Patrick says he heard a voice in a dream telling him to go.</p>
          <p>His ship was ready.</p>
          <p>So he ran.</p>
          <p>He traveled roughly two hundred miles on foot to reach the coast.</p>
          <p>A slave, alone, crossing hostile country with no map and no protection.</p>
          <p>He found a ship. He talked his way onto it.</p>
          <p>And eventually he made it home to Britain.</p>
          <p>His family was overjoyed. They begged him never to leave again.</p>
          <p>
            📌 <strong>That should have been the end of the story. Boy taken, boy escapes, boy comes
            home.</strong>
          </p>
          <p>It was not the end. It was the preparation.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Decades of Getting Ready</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Patrick did not turn around and sail back the next year.</p>
          <p>He spent years studying.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>🧠 Learning theology</li>
          <li>📖 Studying Scripture, which he had ignored as a boy</li>
          <li>⛪ Training under church leaders</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Eventually he was ordained as a bishop.</p>
          <p>
            ⏳ <strong>Nearly forty years passed between his capture as a teenager and his return to
            Ireland as a missionary.</strong>
          </p>
          <p>Forty years.</p>
          <p>His mission was not an emotional impulse.</p>
          <p>It was a prepared decision made by a grown man who knew exactly what he was walking into.</p>
          <p>
            💡 That is the same pattern you see in{" "}
            <ArticleLink href="/blog/moses">Moses</ArticleLink> and his forty years in the desert.
            God is rarely in a hurry with the people He plans to use.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. He Went Back</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Here is the sentence that defines his whole life.</p>
          <p>
            <strong>He chose to go back.</strong>
          </p>
          <p>Back to Ireland. Back to the land where he was a slave.</p>
          <p>Back to the same people who had stolen six years of his life.</p>
          <p>Not with soldiers. Not with revenge. Not with a lawsuit.</p>
          <p>With the gospel.</p>
          <p>
            📌 <strong>Patrick returned to preach Christ to the very people who had enslaved
            him.</strong>
          </p>
          <p>He said in his Confessio that he was compelled by the Spirit to go.</p>
          <p>Read that and then think about the person you are still angry at.</p>
          <p>❓ Would you go back for them?</p>
          <p>That is not a rhetorical question. It is the entire point of his life.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Ireland Before Christianity</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Understand what he was walking into.</p>
          <p>Fifth century Ireland was not part of the Roman Empire.</p>
          <p>It was tribal and pagan.</p>
          <p>Druid priests held the spiritual authority.</p>
          <p>Worship centered on nature, many gods, and ritual.</p>
          <p>Christianity was almost unknown there.</p>
          <p>He had no Roman law to protect him and no local status.</p>
          <p>He was, on paper, an escaped slave returning to the scene of his captivity.</p>
          <p>He wrote that he was in danger constantly and expected to be killed.</p>
          <p>He preached anyway.</p>
        </div>
        <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
          <li>✝️ Christ crucified and risen</li>
          <li>🙏 Repentance</li>
          <li>🕊️ New life through the Holy Spirit</li>
        </ul>
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>And over years, whole communities turned to Christ.</p>
          <p>He baptized thousands. He ordained local leaders.</p>
          <p>He worked with the tribal system rather than against it.</p>
          <p>He went to chieftains first, and when a chief believed, his people listened.</p>
          <p>He gave gifts to local kings for safe passage rather than demanding protection.</p>
          <p>
            💡 He was not naive. He was strategic, and he paid his own way through danger for
            decades.
          </p>
          <p>
            Compare that to what happened when Christianity later gained political power under{" "}
            <ArticleLink href="/blog/the-man-who-legalized-christianity">Constantine</ArticleLink>.
            Patrick had no empire behind him. Just a message and a willingness to be killed for it.
          </p>
          <p>
            💡 He did not build a mission that depended on him. He built one that could keep going
            without him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. The Man Who Called Out a King</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One story rarely gets told on March 17.</p>
          <p>A warlord named Coroticus raided a group of Patrick&apos;s new converts.</p>
          <p>They were killed or sold into slavery, some the day after their baptism.</p>
          <p>Coroticus called himself a Christian.</p>
          <p>Patrick wrote him a letter, and it is still in our hands.</p>
          <p>He publicly condemned him and demanded the captives be released.</p>
          <p>
            📌 <strong>A former slave used his position to fight slavery. He is one of the earliest
            voices in recorded history to do it.</strong>
          </p>
          <p>He had every reason to protect his standing and stay quiet.</p>
          <p>He spent it on people who could do nothing for him.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. What Is True and What Is Legend</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Let&apos;s be honest about the famous parts.</p>
          <p>
            🐍 <strong>The snakes.</strong> Legend says Patrick drove the snakes out of Ireland.
            There is no evidence snakes ever lived in Ireland after the Ice Age. Most historians
            read the story as symbolic, with snakes standing for paganism.
          </p>
          <p>
            ☘️ <strong>The shamrock.</strong> Tradition says he used a three leaf clover to explain
            the Trinity: one God, three persons. It is a beautiful picture and it may well be true,
            but it does not appear in his own writings and shows up centuries later.
          </p>
          <p>
            🍀 <strong>The green.</strong> Patrick was originally associated with blue. Green came
            later, tied to Irish identity rather than to him.
          </p>
          <p>
            ⚠️ <strong>He was also never formally canonized by a pope.</strong> He was declared a
            saint by popular acclaim in an earlier era of the Church.
          </p>
          <p>💡 None of that weakens his story. It sharpens it.</p>
          <p>
            📌 <strong>The real Patrick is better than the legend. You do not need snakes when the
            true story is a slave who forgave a nation.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">8. What He Said About Himself</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The Confessio is not a victory lap.</p>
          <p>It is a defense written by an old man who was being criticized.</p>
          <p>He calls himself a sinner, unlearned, and the least of all believers.</p>
          <p>He apologizes for his poor Latin, because slavery cost him his education.</p>
          <p>He gives God credit for everything and takes almost none of it.</p>
          <p>He also wrote about the fear he lived with.</p>
          <p>He expected to be murdered or enslaved again, and said so plainly.</p>
          <p>He mentions being held captive at least once more during his mission.</p>
          <p>
            ⚠️ Nothing about his return was safe. He simply decided the risk was worth it and kept
            going for roughly thirty years.
          </p>
          <p>
            💡 <strong>The most successful missionary of his century thought of himself as an
            uneducated ex slave who God used anyway.</strong>
          </p>
          <p>That is the voice of a man who never forgot where he came from.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Patrick&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. God can meet you in the worst season of your life</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Patrick did not find God in church. He grew up in church and ignored it.</p>
          <p>He found God on a freezing hillside as somebody&apos;s property.</p>
          <p>📌 The place you would never choose may be the place you finally hear Him.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Forgiveness is not a feeling. It is a direction you walk.</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Patrick did not just stop hating the Irish.</p>
          <p>He got on a boat and spent the rest of his life serving them.</p>
          <p>
            💡 Real forgiveness eventually shows up in your feet, not just your words.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Preparation is not procrastination</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Forty years passed between his capture and his return.</p>
          <p>He studied. He trained. He waited.</p>
          <p>⚠️ Rushing into a calling half ready has ruined more ministries than waiting ever did.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Your pain can become your assignment</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Patrick knew the Irish language because he was enslaved by Irish speakers.</p>
          <p>He knew the culture because he had lived inside it against his will.</p>
          <p>
            📌 The six years stolen from him became the exact training the mission required. God
            wastes nothing.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Use whatever standing you get for people who have none</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>When Patrick finally had influence, he spent it confronting a warlord over slaves.</p>
          <p>He risked his own reputation for people who could not repay him.</p>
          <p>❓ What is your influence actually for?</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses That Fit Patrick&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 50:20</h3>
        <VerseQuote
          text="But as for you, ye thought evil against me; but God meant it unto good, to bring to pass, as it is this day, to save much people alive."
          reference="Genesis 50:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joseph said this to the brothers who sold him into slavery.</p>
          <p>It is the closest thing in Scripture to Patrick&apos;s whole life.</p>
          <p>Notice he does not pretend the evil was good. He says God meant it for good.</p>
          <p>💡 Those are two very different sentences.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Matthew 5:44</h3>
        <VerseQuote
          text="Love your enemies, bless them that curse you, do good to them that hate you, and pray for them which despitefully use you."
          reference="Matthew 5:44"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Most of us read this verse and think about someone who annoyed us.</p>
          <p>Patrick applied it to the men who kidnapped him.</p>
          <p>Despitefully use you is not a small phrase. It means abuse.</p>
          <p>📌 He did not water the verse down to fit his comfort. He obeyed it at full strength.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Romans 8:28</h3>
        <VerseQuote
          text="And we know that all things work together for good to them that love God, to them who are the called according to his purpose."
          reference="Romans 8:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>This verse does not say everything that happens is good.</p>
          <p>It says God works things together toward good.</p>
          <p>Six stolen years became a nation reached.</p>
          <p>💡 Patrick could not have seen that at nineteen, freezing on a hill.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Isaiah 6:8</h3>
        <VerseQuote
          text="Also I heard the voice of the Lord, saying, Whom shall I send, and who will go for us? Then said I, Here am I; send me."
          reference="Isaiah 6:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Easy to say when the destination is somewhere you want to go.</p>
          <p>Patrick said it about the country that enslaved him.</p>
          <p>❓ Is there a place you have quietly told God you will go anywhere except there?</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. 1 Corinthians 1:27</h3>
        <VerseQuote
          text="But God hath chosen the foolish things of the world to confound the wise; and God hath chosen the weak things of the world to confound the things which are mighty."
          reference="1 Corinthians 1:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Patrick called himself unlearned and least.</p>
          <p>He was not being modest. Slavery genuinely cost him his education.</p>
          <p>📌 God reached an entire island through a man who apologized for his grammar.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About St. Patrick</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was St. Patrick Irish?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. He was born in Roman Britain, most likely in the late 300s AD. He first came to
          Ireland as a kidnapped slave, escaped home, and then returned decades later as a
          missionary by choice. The patron saint of Ireland was a foreigner who was once held there
          against his will.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did St. Patrick really drive the snakes out of Ireland?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No, and the honest answer is more interesting than the legend. There is no evidence
          snakes lived in Ireland after the Ice Age, so there were none to drive out. Most
          historians read the story as a symbol for Christianity displacing pagan worship. The
          legend appears centuries after Patrick died.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did St. Patrick use the shamrock to explain the Trinity?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Possibly, but we cannot confirm it. The story does not appear in his own writings and
          shows up much later. It is a genuinely helpful picture of one God in three persons, and it
          became a lasting symbol of Irish Christianity either way.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was St. Patrick a real person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes, and unusually for someone from that era, we have documents he wrote himself. His
          Confessio and his Letter to the Soldiers of Coroticus are widely accepted as authentic.
          They give us his own account of his capture, his faith, and his mission.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why do we celebrate St. Patrick&apos;s Day on March 17?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          March 17 is traditionally held as the date of his death, around AD 461. It began as a
          religious feast day in Ireland. The parades and heavy drinking came much later, largely
          developing among Irish communities in America.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was St. Patrick Catholic or Protestant?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Neither label fits cleanly. He lived roughly a thousand years before the Reformation, in
          an undivided Western Church. Both Catholic and Protestant Christians claim him, and both
          can read his own writings, which are focused on Christ, Scripture, and the Trinity.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How long was St. Patrick a slave?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Six years. He was captured around age sixteen and escaped around age twenty two, working
          that entire time as a shepherd. He describes those years as when his faith became real,
          praying many times a day out in the weather.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is green associated with St. Patrick?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Originally he was associated with blue, sometimes called St. Patrick&apos;s blue. Green
          came later through Irish nationalism, the shamrock, and Ireland&apos;s landscape. It is
          about Irish identity more than about Patrick himself.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was St. Patrick ever officially made a saint?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Not by a formal papal canonization, because that process did not exist in his time. He was
          recognized as a saint by popular acclaim and long standing tradition, which is how many
          early saints were declared.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What can Christians learn from St. Patrick?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That God can meet you in the worst season of your life. That forgiveness eventually shows
          up in what you do, not just what you say. That preparation is worth decades. And that the
          hardest thing you survived may turn out to be the training for what God asks of you next.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Strip away the parades, the green beer, and the snakes.</p>
          <p>What is left is one of the hardest stories in Church history.</p>
          <p>
            📌 <strong>A boy was stolen. A man came back on purpose.</strong>
          </p>
          <p>He did not go back with a lawsuit or an army.</p>
          <p>He went back with the only thing that had helped him out on that hillside.</p>
          <p>So here is your one next step.</p>
          <p>Think of the person or place you have written off.</p>
          <p>You do not have to move there. You do not have to pretend it did not hurt.</p>
          <p>Just pray for them once tonight, by name.</p>
          <p>
            That is where Patrick&apos;s story started too. Not with a mission. With a prayer on a
            cold hill.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🚀 Keep Growing With Bible Buddy</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            If stories like Patrick&apos;s make you want to understand Scripture better, you do not
            have to figure it out alone. Start with{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink> and
            take it one day at a time.
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
