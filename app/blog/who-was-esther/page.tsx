import Link from "next/link";
import BlogPostShell from "@/components/blog/BlogPostShell";
import StudyCta from "@/components/StudyCta";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("who-was-esther", {
  title: "Who Was Esther in the Bible? The Queen Who Risked Her Life to Save Her People",
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

export default function WhoWasEstherPage() {
  return (
    <BlogPostShell
      slug="who-was-esther"
      title={<>📖 Who Was Esther in the Bible? The Queen Who Risked Her Life to Save Her People</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>She was an orphan with no power and no family name that mattered.</p>
            <p>She was taken from her home and placed inside a palace she never asked to enter.</p>
            <p>She hid the one thing that made her who she was, the fact that she was Jewish.</p>
            <p>
              📌 <strong>Then one day she had to choose between staying quiet and safe, or speaking
              up when speaking up could get her killed.</strong>
            </p>
            <p>Maybe you know a smaller version of that fear.</p>
            <p>The moment where doing the right thing could actually cost you something real.</p>
            <p>
              A job. A friendship. Your place in a room full of people who do not know the real you.
              Most of us never have to risk our lives over it. Esther did.
            </p>
            <p>
              An entire nation was marked for destruction, and one young queen was the only person in
              a position to say anything about it. Saying it might have ended her life on the spot.
            </p>
            <p>
              This is the full story of Esther in the Bible, told in order, straight from the text.
              How an orphan girl became a queen. The enemy who plotted to wipe out her people. The
              cousin who told her plainly what was at stake. And the terrifying decision she made
              when staying silent was the easy road and speaking up was the only hope anyone had.
            </p>
            <p>Let&apos;s start with who she was before any of that happened.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🕰️ Who Esther Was</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Esther was a Jewish orphan whose birth name was Hadassah, which means myrtle tree.</p>
          <p>Esther was likely a Persian name given to her later, possibly connected to the word for star.</p>
          <p>Her parents died while she was young, so her older cousin Mordecai raised her as his own daughter.</p>
          <p>
            📌 They were living in Persia, far from Jerusalem, during a season called the exile.
            Years earlier the Babylonians had conquered Judah and carried the Jewish people away
            from their homeland. Persia later conquered Babylon, so by Esther&apos;s time her family
            had lived as foreigners in a foreign land for generations.
          </p>
          <p>
            The king of Persia at that time was Ahasuerus, also known as Xerxes in history books
            outside the Bible. His kingdom stretched from India to Ethiopia, over a hundred and
            twenty seven provinces.
          </p>
          <p>
            When the king needed a new queen, Esther was taken into his harem, a household of women
            kept for the king. She was eventually chosen and made queen of the whole empire.
          </p>
          <p>
            💡 Her entire story is told in one book of the Bible, the book of Esther, just ten
            chapters long. It reads like a true account with a hidden hand behind every turn, because
            that is exactly what it is.
          </p>
          <p>Now here is how her story actually unfolds.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Esther&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. An Orphan Who Learned to Hide</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Esther&apos;s story opens with loss.</p>
        </div>
        <VerseQuote
          text="And he brought up Hadassah, that is, Esther, his uncle's daughter: for she had neither father nor mother, and the maid was fair and beautiful; whom Mordecai, when her father and mother were dead, took for his own daughter."
          reference="Esther 2:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>No father. No mother. No say in what happened to her.</p>
          <p>
            📌 <strong>Esther started her story with nothing but a cousin who loved her enough to
            raise her as his own.</strong>
          </p>
          <p>
            When King Ahasuerus removed his previous queen, his officials searched the empire for
            beautiful young women to bring to the palace. Esther was gathered up along with many
            others and brought into the king&apos;s house in the capital city of Shushan.
          </p>
          <p>Mordecai gave her one instruction before she went in.</p>
        </div>
        <VerseQuote
          text="Esther had not shewed her people nor her kindred: for Mordecai had charged her that she should not shew it."
          reference="Esther 2:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Do not tell them you are Jewish.</p>
          <p>
            ⚠️ In a foreign palace, being part of a scattered, sometimes hated minority was not a
            safe thing to announce. Mordecai understood that better than anyone, and Esther obeyed
            him.
          </p>
          <p>
            💡 Think about what that meant every single day. She could not fully be herself with
            anyone around her. She carried a secret inside the most watched building in the empire.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. From the Harem to the Throne</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Esther spent months going through beauty preparations before she was ever brought before
            the king. When her turn finally came, something happened that nobody could have planned.
          </p>
        </div>
        <VerseQuote
          text="And the king loved Esther above all the women, and she obtained grace and favour in his sight more than all the virgins; so that he set the royal crown upon her head, and made her queen instead of Vashti."
          reference="Esther 2:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>An orphan girl with no family name was now wearing the royal crown of Persia.</p>
          <p>
            📌 <strong>She had no power the day she walked into that palace. Now she had a crown, a
            husband who ruled most of the known world, and still, a secret she was not allowed to
            tell.</strong>
          </p>
          <p>
            Not every woman who reaches a position of power uses it well. Compare Esther later to{" "}
            <ArticleLink href="/blog/who-is-jezebel">Jezebel</ArticleLink>, another queen who had far
            more freedom to speak and used it to destroy God&apos;s people rather than save them.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. The Man Who Would Not Bow</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Not long after Esther became queen, the king promoted a man named Haman above every other
            official in the kingdom.
          </p>
        </div>
        <VerseQuote
          text="And all the king's servants, that were in the king's gate, bowed, and reverenced Haman: for the king had so commanded concerning him. But Mordecai bowed not, nor did him reverence."
          reference="Esther 3:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Everyone bowed. Mordecai did not.</p>
          <p>
            Scripture does not fully explain why. Mordecai was a Jew, and bowing to a man in that way
            may have felt like the kind of worship that belonged to God alone. Whatever the reason,
            he held his ground day after day while everyone around him watched.
          </p>
        </div>
        <VerseQuote
          text="And when Haman saw that Mordecai bowed not, nor did him reverence, then was Haman full of wrath."
          reference="Esther 3:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>One man refused to bow, and Haman&apos;s anger did not stay small.</p>
        </div>
        <VerseQuote
          text="And he thought scorn to lay hands on Mordecai alone; for they had shewed him the people of Mordecai: wherefore Haman sought to destroy all the Jews that were throughout the whole kingdom of Ahasuerus, even the people of Mordecai."
          reference="Esther 3:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Haman did not just want to punish one man. He decided an entire people should
            die because one of them would not bow to him.</strong>
          </p>
          <p>❓ Notice how quickly one wounded ego turned into a plan for mass murder.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. A Plan to Wipe Out a Whole People</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Haman took his plan straight to the king, and he did not mention the real reason.</p>
        </div>
        <VerseQuote
          text="And Haman said unto king Ahasuerus, There is a certain people scattered abroad and dispersed among the people in all the provinces of thy kingdom; and their laws are diverse from all people; neither keep they the king's laws: therefore it is not for the king's profit to suffer them."
          reference="Esther 3:8"
        />
        <VerseQuote
          text="If it please the king, let it be written that they may be destroyed: and I will pay ten thousand talents of silver to the hands of those that have the charge of the business, to bring it into the king's treasuries."
          reference="Esther 3:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Haman offered to personally fund the murder of an entire nation, and the king agreed
            without asking who the people were.
          </p>
          <p>Letters went out across the empire, in every language, sealed with the king&apos;s own ring.</p>
        </div>
        <VerseQuote
          text="And the letters were sent by posts into all the king's provinces, to destroy, to kill, and to cause to perish, all Jews, both young and old, little children and women, in one day, even upon the thirteenth day of the twelfth month, which is the month Adar, and to take the spoil of them for a prey."
          reference="Esther 3:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>A date was set for the death of every Jewish man, woman, and child in the kingdom.</p>
          <p>
            📌 <strong>Esther was Jewish. The queen of Persia was on the same death list as everyone
            else, and almost nobody in the palace knew it.</strong>
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. For Such a Time as This</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Mordecai heard about the edict and tore his clothes in grief, a common way of showing
            deep sorrow in that culture. He sent word to Esther asking her to go to the king and beg
            for her people.
          </p>
          <p>Esther sent back an answer. There was a law that anyone who approached the king without being called could be put to death, unless the king held out his golden scepter to spare them. She had not been called to him in thirty days.</p>
          <p>Mordecai answered her plainly, and this is the heart of the whole book.</p>
        </div>
        <VerseQuote
          text="Then Mordecai commanded to answer Esther, Think not with thyself that thou shalt escape in the king's house, more than all the Jews."
          reference="Esther 4:13"
        />
        <VerseQuote
          text="For if thou altogether holdest thy peace at this time, then shall there enlargement and deliverance arise to the Jews from another place; but thou and thy father's house shall be destroyed: and who knoweth whether thou art come to the kingdom for such a time as this?"
          reference="Esther 4:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Being queen would not protect her. Silence would not protect her.</p>
          <p>
            📌 <strong>Who knoweth whether thou art come to the kingdom for such a time as this.
            Mordecai believed her whole life, including the parts that felt like an accident, had
            been leading to this exact moment.</strong>
          </p>
          <p>
            ❓ If you have ever wondered whether the strange path your life has taken actually has a
            purpose, this is the verse to sit with. If fear is what is holding you back from
            answering that call, it may help to read{" "}
            <ArticleLink href="/blog/what-does-the-bible-say-about-fear">
              what the Bible says about fear
            </ArticleLink>{" "}
            before you go any further.
          </p>
          <p>Esther asked Mordecai to gather the Jews in Shushan and fast for her three days. She would fast too. Then she gave her answer.</p>
        </div>
        <VerseQuote
          text="Go, gather together all the Jews that are present in Shushan, and fast ye for me, and neither eat nor drink three days, night or day: I also and my maidens will fast likewise; and so will I go in unto the king, which is not according to the law: and if I perish, I perish."
          reference="Esther 4:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ <strong>If I perish, I perish. She chose to act, knowing the cost could be her own
            life, and she chose it anyway.</strong>
          </p>
          <p>That is not confidence that everything would turn out fine. That is courage in spite of the fear.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">6. The Sceptre, the Banquet, and the Gallows</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>On the third day, Esther put on her royal robes and walked into the inner court, uninvited.</p>
        </div>
        <VerseQuote
          text="And it was so, when the king saw Esther the queen standing in the court, that she obtained favour in his sight: and the king held out to Esther the golden sceptre that was in his hand. So Esther drew near, and touched the top of the sceptre."
          reference="Esther 5:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ✅ <strong>The king held out the golden sceptre. Her life was spared the moment she
            walked in.</strong>
          </p>
          <p>Rather than making her request right away, Esther invited the king and Haman to a private banquet, and then to a second banquet the next day.</p>
          <p>Haman left that first banquet feeling like the most important man in the empire.</p>
        </div>
        <VerseQuote
          text="Then went Haman forth that day joyful and with a glad heart: but when Haman saw Mordecai in the king's gate, that he stood not up, nor moved for him, he was full of indignation against Mordecai."
          reference="Esther 5:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>One man refusing to bow was still ruining Haman&apos;s good mood.</p>
          <p>He bragged to his wife and friends about his wealth, his sons, and his closeness to the king and queen. Then he admitted the one thing that ate at him.</p>
        </div>
        <VerseQuote
          text="Yet all this availeth me nothing, so long as I see Mordecai the Jew sitting at the king's gate."
          reference="Esther 5:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>His wife Zeresh and his friends had a solution ready.</p>
        </div>
        <VerseQuote
          text="Then said Zeresh his wife and all his friends unto him, Let a gallows be made of fifty cubits high, and to morrow speak thou unto the king that Mordecai may be hanged thereon: then go thou in merrily with the king unto the banquet. And the thing pleased Haman; and he caused the gallows to be made."
          reference="Esther 5:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Haman built a gallows fifty cubits high, about seventy five feet, to hang the
            one man who would not bow to him.</strong>
          </p>
          <p>He went to bed satisfied. He had no idea what the next twenty four hours held.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">7. The Second Banquet, Haman&apos;s Fall, and a Feast Called Purim</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>That same night, the king could not sleep.</p>
        </div>
        <VerseQuote
          text="On that night could not the king sleep, and he commanded to bring the book of records of the chronicles; and they were read before the king."
          reference="Esther 6:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Out of every night in the story, the king lost sleep on this one. The records that
            were read to him happened to include the time Mordecai uncovered a plot to assassinate
            the king, a good deed that had never been rewarded.
          </p>
          <p>The next morning, the king asked Haman a question, without saying who he meant.</p>
        </div>
        <VerseQuote
          text="So Haman came in. And the king said unto him, What shall be done unto the man whom the king delighteth to honour? Now Haman thought in his heart, To whom would the king delight to do honour more than to myself?"
          reference="Esther 6:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Haman assumed the honor was for himself and described an elaborate parade through the city.</p>
        </div>
        <VerseQuote
          text="Then the king said to Haman, Make haste, and take the apparel and the horse, as thou hast said, and do even so to Mordecai the Jew, that sitteth at the king's gate: let nothing fail of all that thou hast spoken."
          reference="Esther 6:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Haman had to personally dress Mordecai in royal robes and lead him through the
            streets, announcing his honor to the whole city.</strong>
          </p>
          <p>The gallows he had built for Mordecai was still standing when he went to Esther&apos;s second banquet that evening. That is when Esther finally made her request.</p>
        </div>
        <VerseQuote
          text="For we are sold, I and my people, to be destroyed, to be slain, and to perish. But if we had been sold for bondmen and bondwomen, I had held my tongue, although the enemy could not countervail the king's damage."
          reference="Esther 7:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The king demanded to know who would dare do such a thing. Esther pointed at the man sitting right beside him.</p>
        </div>
        <VerseQuote
          text="And Esther said, The adversary and enemy is this wicked Haman. Then Haman was afraid before the king and the queen."
          reference="Esther 7:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The queen who had hidden her identity for years finally said it out loud, in
            front of the two most powerful men in the empire, at the exact moment it mattered
            most.</strong>
          </p>
        </div>
        <VerseQuote
          text="So they hanged Haman on the gallows that he had prepared for Mordecai. Then was the king's wrath pacified."
          reference="Esther 7:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>⚠️ Haman died on the very gallows he built for the man he hated.</p>
          <p>
            There was still a problem. A law signed with the king&apos;s ring could not simply be
            canceled once it was sent out. So the king let Mordecai and Esther write a new decree
            giving the Jews the right to defend themselves on the day they were meant to be
            destroyed. When that day came, the Jews survived, and their enemies did not prevail
            against them.
          </p>
          <p>
            The Jewish people turned their sorrow into a yearly celebration called Purim, still kept
            by Jewish families today.
          </p>
        </div>
        <VerseQuote
          text="As the days wherein the Jews rested from their enemies, and the month which was turned unto them from sorrow to joy, and from mourning into a good day: that they should make them days of feasting and joy, and of sending portions one to another, and gifts to the poor."
          reference="Esther 9:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Here is something worth pausing on. The book of Esther never once mentions the name of
            God directly. Not one time in ten chapters.
          </p>
          <p>
            📌 <strong>And yet everything in the story lines up too perfectly to be an accident. An
            orphan happens to become queen right before her people need her. A king happens to lose
            sleep on the one night it mattered. A forgotten good deed happens to be read aloud at the
            exact right moment.</strong>
          </p>
          <p>
            ✅ God is never named in this book, and He is present on every single page. That is a
            lesson worth carrying into your own life, especially on the days when you cannot see Him
            working at all.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">💡 Lessons From Esther&apos;s Life</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. God works even when He is not mentioned</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Esther is the only book in the Bible that never names God directly.</p>
          <p>Every detail still lines up like pieces of a plan.</p>
          <p>💡 Just because you cannot see God&apos;s name on a situation does not mean His hand is not on it.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Your position might exist for a reason bigger than you</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Esther did not seek out the crown. It was placed on her through circumstances she never chose.</p>
          <p>
            📌 The place you are standing right now, the job, the family, the community, might not be
            random either.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Courage is not the absence of fear</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Esther fasted for three days before she acted. She was clearly terrified.</p>
          <p>She went in anyway, saying if I perish, I perish.</p>
          <p>⚠️ Waiting for fear to disappear before you obey is a wait that may never end.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Doing right rarely feels convenient</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Esther could have stayed quiet and probably survived, at least for a while.</p>
          <p>Speaking up cost her comfort, safety, and possibly her life.</p>
          <p>She did it anyway because staying silent had a cost too, even if it was less visible.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Pride and cruelty tend to build their own downfall</h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Haman built a gallows for a man who had done him no wrong.</p>
          <p>He died on it himself.</p>
          <p>📌 Scripture keeps showing this pattern. Evil plans have a way of turning back on the person who made them.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">📖 Key Verses From Esther&apos;s Story</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Esther 4:14</h3>
        <VerseQuote
          text="For if thou altogether holdest thy peace at this time, then shall there enlargement and deliverance arise to the Jews from another place; but thou and thy father's house shall be destroyed: and who knoweth whether thou art come to the kingdom for such a time as this?"
          reference="Esther 4:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The most famous line in the whole book.</p>
          <p>Mordecai told Esther plainly that her position was not just for her own comfort.</p>
          <p>📌 Your current season may be preparing you for something you cannot see yet.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Esther 4:16</h3>
        <VerseQuote
          text="Go, gather together all the Jews that are present in Shushan, and fast ye for me, and neither eat nor drink three days, night or day: I also and my maidens will fast likewise; and so will I go in unto the king, which is not according to the law: and if I perish, I perish."
          reference="Esther 4:16"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Four words carry the weight of the whole decision. If I perish, I perish.</p>
          <p>She did not know how the story would end. She acted anyway.</p>
          <p>💡 Real courage is doing the right thing without a guarantee of the outcome.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Esther 2:17</h3>
        <VerseQuote
          text="And the king loved Esther above all the women, and she obtained grace and favour in his sight more than all the virgins; so that he set the royal crown upon her head, and made her queen instead of Vashti."
          reference="Esther 2:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>An orphan with no name became queen of the largest empire on earth.</p>
          <p>📌 God can lift up the overlooked person in ways nobody in the room would have predicted.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Esther 7:6</h3>
        <VerseQuote
          text="And Esther said, The adversary and enemy is this wicked Haman. Then Haman was afraid before the king and the queen."
          reference="Esther 7:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>The moment years of hiding turned into one sentence of truth.</p>
          <p>💡 Truth spoken at the right time can undo damage that has been building for years.</p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Esther 9:22</h3>
        <VerseQuote
          text="As the days wherein the Jews rested from their enemies, and the month which was turned unto them from sorrow to joy, and from mourning into a good day: that they should make them days of feasting and joy, and of sending portions one to another, and gifts to the poor."
          reference="Esther 9:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Sorrow turned into joy. Mourning turned into a good day.</p>
          <p>✅ That turn did not happen by accident, and it is a pattern God repeats far beyond this one story.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">❓ Frequently Asked Questions About Esther</h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Esther a real person?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The book of Esther presents her as a real historical queen of Persia, married to king
          Ahasuerus, who is widely identified with the historical king Xerxes the first. The book
          reads as detailed history, naming real places, real customs, and a specific timeline,
          rather than as a symbolic story.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why doesn&apos;t the book of Esther mention God?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture never explains why. God&apos;s name simply never appears in the text, which
          makes Esther unique among the books of the Bible. What the book does show, again and
          again, is a series of events that only make sense if someone unseen is arranging them. Many
          readers see that as the whole point. God does not need His name printed on a page to be at
          work in it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does for such a time as this mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is Mordecai&apos;s question to Esther in chapter four, asking whether her rise to become
          queen happened specifically so she would be positioned to save her people in this crisis.
          It has become a phrase people use to describe a moment when their circumstances, skills, or
          position suddenly line up with a need only they can meet.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened to Haman?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Haman built a gallows to execute Mordecai, the man who would not bow to him. After Esther
          exposed his plan to destroy the Jews at her second banquet, the king ordered Haman hanged
          on that same gallows. His plan against Mordecai ended up killing him instead.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was Esther&apos;s real name Hadassah?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Hadassah was her Hebrew name and it means myrtle tree. Esther appears to be a name she
          took, or was given, once she entered the Persian court, possibly connected to the Persian
          word for star.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Ahasuerus, and is he the same as Xerxes?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Ahasuerus was the king of Persia who made Esther his queen. Most historians identify him
          with Xerxes the first, who ruled Persia in the fifth century before Christ over a vast
          empire reaching from India to Ethiopia.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Mordecai refuse to bow to Haman?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not state his exact reason. He was a Jew, and the kind of bowing being
          demanded may have felt like the kind of honor reserved for God alone. Whatever his reasons,
          his refusal is what set Haman&apos;s entire plot against the Jewish people in motion.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Purim and why does it matter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Purim is the yearly Jewish celebration established at the end of the book of Esther,
          marking the day the Jewish people were saved from destruction. It is still celebrated
          today with feasting, gifts, and readings of the book of Esther, keeping the memory of that
          rescue alive across generations.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Was it wrong for Esther to hide that she was Jewish?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Scripture does not condemn her for it. Mordecai instructed her to keep it hidden, likely
          out of concern for her safety in a foreign court. When the moment finally came that
          required the truth, she told it, at real risk to herself. Her silence was not permanent,
          and it was not cowardice. It was timing.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Esther choose to enter the king&apos;s harem?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The text does not describe her as volunteering. Officials gathered young women from across
          the empire, and Esther was among those brought in. Once there, she had little control over
          what came next, which makes her later boldness even more remarkable.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What can we learn from Esther today?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          That God can place ordinary people in unlikely positions on purpose. That courage often
          looks like acting while still afraid, not waiting for fear to leave first. And that even
          when His name never appears on the page of your circumstances, He may be arranging every
          detail of them anyway.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Esther did not choose the danger she found herself in.</p>
          <p>She chose how to respond to it.</p>
          <p>
            📌 <strong>God can place you exactly where you are for a reason you may not see
            yet.</strong>
          </p>
          <p>
            📌 <strong>Courage does not mean the fear is gone. It means you act while it is still
            there.</strong>
          </p>
          <p>
            📌 <strong>God does not need His name on the page to be working through every detail of
            your story.</strong>
          </p>
          <p>She risked everything for people who might never know her name. In the end, her name is the one still remembered, thousands of years later.</p>
          <p>
            Read the book of Esther for yourself this week, all ten chapters, from beginning to end.
            If you want help building a habit of reading Scripture like that regularly, start with{" "}
            <ArticleLink href="/blog/how-to-read-the-bible">how to read the Bible</ArticleLink>. Then
            ask yourself the question Mordecai asked her. Who knows whether you have come to this
            exact place, at this exact time, for a reason bigger than yourself.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          🚀 Keep Growing With Bible Buddy
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
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
          <p>It is completely free. No pressure, no credit card, no account needed to begin.</p>
          <p>Just you, God&apos;s Word, and a little help understanding it.</p>
          <p>
            Thousands of Christians are already reading this way, one day at a time. There is room
            for you.
          </p>
        </div>

        <StudyCta
          slug="women-of-the-bible"
          title="Women of the Bible"
          days={21}
          description="Esther risked her life to save her people. This 21 day study walks through the women whose lives shaped Scripture, what they faced, what God did, and what it means for you."
        />
      </section>
    </BlogPostShell>
  );
}
