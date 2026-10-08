import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("exodus-3-explained", {
  title: "Exodus 3 Explained: The Burning Bush and the Name of God",
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

export default function ExodusThreeExplainedPage() {
  return (
    <BlogPostShell
      slug="exodus-3-explained"
      title={<>📖 Exodus 3 Explained: The Burning Bush and the Name of God</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A fugitive shepherd is minding someone else&apos;s sheep on the back side of nowhere, and a bush will not stop burning.</p>
            <p>
              <strong>Exodus 3 explained</strong> is the chapter where forty quiet years in Midian
              end in a single conversation. Moses, the man who fled Egypt with a death sentence on
              his head, is about to be told to walk back into the one country that wants him dead,
              and to bring an entire nation out with him.
            </p>
            <p>Maybe you have felt unqualified for something God was clearly asking of you anyway.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why a burning bush, of all things, to get Moses&apos;s attention?</li>
            <li>❓ Why does God tell Moses to take off his shoes?</li>
            <li>❓ What does &quot;I AM THAT I AM&quot; actually mean?</li>
            <li>❓ And why does God already predict that Pharaoh will say no?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>God does not call Moses because Moses is ready. He calls him, then spends
              the rest of the conversation answering every reason Moses gives for why he is
              not.</strong>
            </p>
            <p>
              This walkthrough goes through Exodus 3 in order: the bush that would not burn out,
              the holy ground, the name God gives Himself, the plan laid out in advance, and the
              resistance God tells Moses to expect before Moses ever takes a single step toward
              Egypt.
            </p>
            <p>A chapter about a voice from a bush turns out to be the chapter that defines who God is for the rest of the Bible.</p>
          </div>
        </>
      }
    >
      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          💙 What Happened Just Before This Chapter
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <ArticleLink href="/blog/exodus-2-explained">Exodus 2</ArticleLink> ended with Moses
            having built a quiet new life in Midian: a wife, a son, a father-in-law who took him
            in, and sheep to keep him busy. Forty years passed in a single verse while, back in
            Egypt, the king who wanted Moses dead finally died himself, and the Israelites kept
            crying out under their slavery. The last thing that chapter told us was that God heard
            that groaning, remembered His covenant, and looked on His people.
          </p>
          <p>
            Exodus 3 opens with Moses still out in Midian, still tending someone else&apos;s flock,
            with no idea that the quiet years are about to end in the middle of an ordinary
            workday.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Exodus 3 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A Bush That Would Not Burn Out (verses 1 to 3)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens on the most ordinary possible day.</p>
        </div>
        <VerseQuote
          text="Now Moses kept the flock of Jethro his father in law, the priest of Midian: and he led the flock to the backside of the desert, and came to the mountain of God, even to Horeb."
          reference="Exodus 3:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jethro is the same man Exodus 2 called Reuel. Moses is simply doing his job, following
            grass and water for someone else&apos;s sheep, when the path happens to lead him to a
            mountain that already has a name attached to it before anything has happened there:
            the mountain of God.
          </p>
        </div>
        <VerseQuote
          text="And the angel of the LORD appeared unto him in a flame of fire out of the midst of a bush: and he looked, and, behold, the bush burned with fire, and the bush was not consumed. And Moses said, I will now turn aside, and see this great sight, why the bush is not burnt."
          reference="Exodus 3:2 and 3"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 <strong>Fire that does not consume what it burns is the detail that stops
            Moses.</strong> A burning bush in the desert was not strange on its own. A bush that
            kept burning and never turned to ash was. The miracle here is not loud. It is a small,
            strange thing that simply refuses to behave the way fire behaves, and it is enough to
            make a busy shepherd stop and look twice.
          </p>
          <p>
            📌 <strong>God gets Moses&apos;s attention with curiosity, not fear.</strong> Nothing in
            these three verses is terrifying. It is simply unusual enough that Moses chooses to turn
            aside instead of walking past it, and that one choice is what the rest of the chapter
            hangs on.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Holy Ground, and a God Already Familiar (verses 4 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The moment Moses steps toward the bush, everything changes.</p>
        </div>
        <VerseQuote
          text="And when the LORD saw that he turned aside to see, God called unto him out of the midst of the bush, and said, Moses, Moses. And he said, Here am I."
          reference="Exodus 3:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God only speaks once Moses turns aside to look.</strong> The text is careful
            about that order. God does not shout at a man walking past. He waits for Moses to
            notice, then calls him by name, twice, the way a parent calls a child they already know
            well.
          </p>
        </div>
        <VerseQuote
          text="And he said, Draw not nigh hither: put off thy shoes from off thy feet, for the place whereon thou standest is holy ground."
          reference="Exodus 3:5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ Nothing about this patch of desert had changed physically. It is holy only because
            God is present there, which means holiness in this chapter is not a quality of the dirt.
            It is a quality of whoever is standing on it in that moment. Removing his shoes is
            Moses&apos;s one required response: a small, physical act of respect before a single
            word of the actual mission is spoken.
          </p>
        </div>
        <VerseQuote
          text="Moreover he said, I am the God of thy father, the God of Abraham, the God of Isaac, and the God of Jacob. And Moses hid his face; for he was afraid to look upon God."
          reference="Exodus 3:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Before God says one word about Egypt, He introduces Himself through a family line Moses
            already knows, the same three names given to{" "}
            <ArticleLink href="/blog/genesis-15-explained">Abraham in Genesis 15</ArticleLink>, then
            passed down through Isaac and Jacob. This is not a new deity showing up out of nowhere.
            It is the God of Moses&apos;s own ancestors, and Moses&apos;s fear at hearing it is the
            correct response, not an overreaction.
          </p>
          <p>
            Centuries later, Jesus points straight back to this exact verse to make an argument
            about the resurrection, treating the tense of the sentence as proof that Abraham,
            Isaac, and Jacob were still alive to God long after their deaths.
          </p>
        </div>
        <VerseQuote
          text="I am the God of Abraham, and the God of Isaac, and the God of Jacob? God is not the God of the dead, but of the living."
          reference="Matthew 22:32"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. I Have Seen, I Have Heard, I Am Come Down (verses 7 to 9)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Once the introduction is finished, God states exactly why He is here.</p>
        </div>
        <VerseQuote
          text="And the LORD said, I have surely seen the affliction of my people which are in Egypt, and have heard their cry by reason of their taskmasters; for I know their sorrows; And I am come down to deliver them out of the hand of the Egyptians, and to bring them up out of that land unto a good land and a large, unto a land flowing with milk and honey."
          reference="Exodus 3:7 and 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Four verbs do the work of this entire section: seen, heard, known, come
            down.</strong> This is the same God who, at the very end of Exodus 2, was described
            only in quiet verbs like remembered and looked. Now those same verbs turn into action.
            God is not announcing a plan He just came up with. He is acting on something He has
            already been watching for a long time.
          </p>
          <p>
            The land is described as flowing with milk and honey, a simple way of saying it is
            fertile and able to actually feed the people living on it, the opposite of a desert or a
            land of famine.
          </p>
        </div>
        <VerseQuote
          text="Now therefore, behold, the cry of the children of Israel is come unto me: and I have also seen the oppression wherewith the Egyptians oppress them."
          reference="Exodus 3:9"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. &quot;Who Am I?&quot; Moses&apos;s First Objection (verses 10 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>God finally says out loud what this whole encounter has been building toward.</p>
        </div>
        <VerseQuote
          text="Come now therefore, and I will send thee unto Pharaoh, that thou mayest bring forth my people the children of Israel out of Egypt."
          reference="Exodus 3:10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses answers with the first of several objections he raises across this chapter and the next.</p>
        </div>
        <VerseQuote
          text="And Moses said unto God, Who am I, that I should go unto Pharaoh, and that I should bring forth the children of Israel out of Egypt?"
          reference="Exodus 3:11"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ❓ This is not false modesty. Moses is a fugitive from Egyptian justice, a shepherd with
            no army, no title, and no standing with either Pharaoh or the people he is being sent
            to rescue. His question is a completely reasonable one. What is not reasonable, by
            normal standards, is God&apos;s answer.
          </p>
        </div>
        <VerseQuote
          text="And he said, Certainly I will be with thee; and this shall be a token unto thee, that I have sent thee: When thou hast brought forth the people out of Egypt, ye shall serve God upon this mountain."
          reference="Exodus 3:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God never actually answers &quot;who am I.&quot; He answers with who He
            is.</strong> &quot;Certainly I will be with thee&quot; is the whole reply. The
            qualification Moses is missing is not something he needs to acquire. It is a presence he
            is being promised. The sign God gives him will only be confirmed after Moses obeys,
            which means Moses has to act before he gets the proof he is asking for.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. I AM THAT I AM (verses 13 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses raises a second, more pointed question.</p>
        </div>
        <VerseQuote
          text="And Moses said unto God, Behold, when I come unto the children of Israel, and shall say unto them, The God of your fathers hath sent me unto you; and they shall say to me, What is his name? what shall I say unto them?"
          reference="Exodus 3:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            In the ancient world, a name was not just a label. It told you something about who a
            person or a god actually was. Moses is asking for the one piece of information that
            will tell the Israelites whether this God can actually be trusted to do what He says.
          </p>
        </div>
        <VerseQuote
          text="And God said unto Moses, I AM THAT I AM: and he said, Thus shalt thou say unto the children of Israel, I AM hath sent me unto you."
          reference="Exodus 3:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God&apos;s name is not a description of one thing He does. It is a statement
            about His own existence.</strong> He does not say &quot;I am the one who delivers&quot;
            or &quot;I am the one who judges.&quot; He simply says that He is, in a way that does
            not depend on anything outside Himself. Every other name for God in Scripture, see the
            full list on the{" "}
            <ArticleLink href="/blog/names-of-god-meanings">names of God page</ArticleLink>,
            describes something about Him. This one describes the fact that He exists at all,
            unchanging and uncaused.
          </p>
          <p>
            Jesus later takes this exact phrase for Himself in a conversation about Abraham,
            provoking a reaction from His listeners that makes clear they understood exactly what
            He was claiming.
          </p>
        </div>
        <VerseQuote
          text="Jesus said unto them, Verily, verily, I say unto you, Before Abraham was, I am."
          reference="John 8:58"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>Verse 15 then gives Moses the exact words to use, tying the unpronounceable name to the covenant God already made.</p>
        </div>
        <VerseQuote
          text="And God said moreover unto Moses, Thus shalt thou say unto the children of Israel, The LORD God of your fathers, the God of Abraham, the God of Isaac, and the God of Jacob, hath sent me unto you: this is my name for ever, and this is my memorial unto all generations."
          reference="Exodus 3:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 The word translated LORD in capital letters throughout most English Bibles is this
            same name, built from the same Hebrew root as &quot;I AM.&quot; Every time that word
            appears in capitals from here through the rest of the Old Testament, it is quietly
            pointing back to this exact conversation at the bush.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Plan, and a Pharaoh Who Will Not Listen (verses 16 to 22)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With the name settled, God lays out the actual steps Moses is to take.</p>
        </div>
        <VerseQuote
          text="Go, and gather the elders of Israel together, and say unto them, The LORD God of your fathers, the God of Abraham, of Isaac, and of Jacob, appeared unto me, saying, I have surely visited you, and seen that which is done to you in Egypt: And I have said, I will bring you up out of the affliction of Egypt unto the land of the Canaanites, and the Hittites, and the Amorites, and the Perizzites, and the Hivites, and the Jebusites, unto a land flowing with milk and honey."
          reference="Exodus 3:16 and 17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Moses is told to start with the elders, not with Pharaoh directly. Credibility with his
            own people comes first. Only after that does the plan send him to the throne.
          </p>
        </div>
        <VerseQuote
          text="And they shall hearken to thy voice: and thou shalt come, thou and the elders of Israel, unto the king of Egypt, and ye shall say unto him, The LORD God of the Hebrews hath met with us: and now let us go, we beseech thee, three days' journey into the wilderness, that we may sacrifice to the LORD our God."
          reference="Exodus 3:18"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>God tells Moses exactly what to expect before Moses ever opens his
            mouth.</strong> This is not a plan built on the assumption that Pharaoh will cooperate.
          </p>
        </div>
        <VerseQuote
          text="And I am sure that the king of Egypt will not let you go, no, not by a mighty hand. And I will stretch out my hand, and smite Egypt with all my wonders which I will do in the midst thereof: and after that he will let you go."
          reference="Exodus 3:19 and 20"
        />
        <VerseQuote
          text="But every woman shall borrow of her neighbour, and of her that sojourneth in her house, jewels of silver, and jewels of gold, and raiment: and ye shall put them upon your sons, and upon your daughters; and ye shall spoil the Egyptians."
          reference="Exodus 3:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>God does not promise Moses an easy road. He promises a certain
            outcome.</strong> Resistance from Pharaoh is built into the plan from the very first
            conversation, and so is the ending: Egypt will finally let Israel go, and Israel will
            leave carrying wealth instead of empty handed. The whole book of Exodus, from the
            plagues through the parting of the sea, is really just this one short paragraph playing
            out at full length.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Exodus 3 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>What does &quot;I AM THAT I AM&quot; actually mean?</strong> The Hebrew behind
            this phrase is built from the verb &quot;to be.&quot; Most conservative scholars read it
            as God declaring His own self existence: He does not derive His being from anything
            else, and He does not change. Some older translations and Jewish traditions render it
            slightly differently, such as &quot;I will be what I will be,&quot; stressing that God&apos;s
            character and actions cannot be pinned down or controlled by the one asking the
            question. Both readings agree on the core point: this name describes God&apos;s own
            nature, not one specific thing He does.
          </p>
          <p>
            <strong>Why a burning bush, specifically?</strong> Exodus never explains the choice
            directly. What the text does make clear is the detail that mattered to Moses: fire that
            burned without consuming anything. A thorn bush was also about the least impressive
            plant available in that landscape, which fits a pattern seen throughout Exodus of God
            working through small, unlikely things, a baby in a basket, a shepherd&apos;s staff, a
            bush nobody would normally look at twice.
          </p>
          <p>
            <strong>If God already knew Pharaoh would refuse, why send Moses to ask at
            all?</strong> The text does not treat the three days&apos; journey request as a trick
            meant to deceive Pharaoh. It was a real, modest request, and Pharaoh&apos;s refusal of
            even that small ask is what exposes exactly how hard his heart already was. God telling
            Moses the outcome in advance was not about scripting a con. It was about making sure
            Moses was not blindsided or discouraged the moment Pharaoh said no.
          </p>
          <p>
            <strong>Was Moses&apos;s &quot;who am I&quot; genuine humility, or fear talking?</strong>{" "}
            Scripture does not separate the two cleanly here, and by the next chapter Moses&apos;s
            objections start sounding less like humility and more like reluctance. What stands out
            in Exodus 3 itself is that God does not scold the question. He simply answers it with a
            promise of His own presence, which is the only qualification Moses actually needed.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses From Exodus 3
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Exodus 3:14</h3>
        <VerseQuote
          text="And God said unto Moses, I AM THAT I AM: and he said, Thus shalt thou say unto the children of Israel, I AM hath sent me unto you."
          reference="Exodus 3:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The most important name in the Old Testament, given at a burning bush to a fugitive
          shepherd who only wanted to know what to tell his own people.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Exodus 3:5</h3>
        <VerseQuote
          text="And he said, Draw not nigh hither: put off thy shoes from off thy feet, for the place whereon thou standest is holy ground."
          reference="Exodus 3:5"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Holiness here belongs to God&apos;s presence, not to the ground itself. The required
          response is simple respect, not any kind of achievement.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Exodus 3:12</h3>
        <VerseQuote
          text="And he said, Certainly I will be with thee; and this shall be a token unto thee, that I have sent thee: When thou hast brought forth the people out of Egypt, ye shall serve God upon this mountain."
          reference="Exodus 3:12"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God&apos;s full answer to &quot;who am I&quot; is simply His own presence, offered before
          any proof and before any success.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Exodus 3:7 and 8</h3>
        <VerseQuote
          text="I have surely seen the affliction of my people which are in Egypt, and have heard their cry by reason of their taskmasters; for I know their sorrows; And I am come down to deliver them out of the hand of the Egyptians."
          reference="Exodus 3:7 and 8"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The quiet verbs from the end of Exodus 2, seen and heard, turn into action the moment God
          speaks them out loud at the bush.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Exodus 3:19 and 20</h3>
        <VerseQuote
          text="And I am sure that the king of Egypt will not let you go, no, not by a mighty hand. And I will stretch out my hand, and smite Egypt with all my wonders which I will do in the midst thereof: and after that he will let you go."
          reference="Exodus 3:19 and 20"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          God warns Moses about Pharaoh&apos;s resistance before Moses ever leaves the mountain,
          and names the certain outcome in the very same breath.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Exodus 3
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Exodus 3?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Moses, tending sheep in Midian, sees a bush on fire that never burns up. God speaks to
          him from inside it, tells him to remove his shoes on holy ground, reveals His name as I
          AM THAT I AM, and sends Moses back to Egypt to confront Pharaoh and lead Israel out of
          slavery.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does I AM THAT I AM mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It is God describing His own self existence, that He depends on nothing outside Himself
          and does not change. It is the root of the name LORD, printed in capital letters
          throughout most English Old Testaments.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did God appear in a burning bush?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus does not explain the choice directly. The detail the text highlights is that the
          fire burned without consuming the bush, an unusual enough sight to make Moses stop and
          look, which is exactly what gets God&apos;s message heard.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Moses have to take off his shoes?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 3:5 ties it directly to the ground being holy because God was present there.
          Removing his shoes was a simple act of respect before anything else was said, not a
          ritual with power of its own.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Jethro, and is he the same person as Reuel?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 3:1 calls Moses&apos;s father-in-law Jethro, while Exodus 2:18 called the same
          household&apos;s priest Reuel. Both names point to the same man and family; Exodus never
          explains which was his personal name and which may have been an honorific title.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Moses ask God for a name?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In the ancient world, a god&apos;s name revealed something about that god&apos;s
          character and power. Moses expected the Israelites to ask, and wanted an answer that
          would actually mean something to people who had grown up in Egypt surrounded by many
          named gods.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did God know Pharaoh would refuse before Moses even asked?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Exodus 3:19 has God telling Moses plainly that Pharaoh will not let Israel go
          without being forced. The plan God lays out already accounts for that refusal and for
          what God will do in response.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does it mean that Israel would spoil the Egyptians?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 3:22 describes Israelite women receiving silver, gold, and clothing from their
          Egyptian neighbors on the way out. This is presented as Israel finally being paid, in
          part, for generations of forced, unpaid labor, not as theft.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Moses say &quot;who am I&quot; instead of simply agreeing?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Exodus 3:11 shows a man fully aware of his own limits: no army, no political standing, and
          an outstanding charge of murder in the very country he is being sent back to. His
          question is realistic, and God answers it with a promise of presence rather than a list
          of Moses&apos;s qualifications.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How is Exodus 3 connected to Jesus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jesus applies this exact chapter twice in the Gospels: once using God&apos;s words to
          Moses about Abraham, Isaac, and Jacob to argue for the resurrection, and once taking the
          name I AM directly for Himself in front of a crowd that understood precisely what He was
          claiming about His own identity.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does God call Himself the God of Abraham, Isaac, and Jacob here?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It ties this entire rescue back to the promise God already made in{" "}
          <ArticleLink href="/blog/genesis-12-explained">Genesis 12</ArticleLink> to Abraham and
          repeated to his son and grandson. Exodus 3 is not a new plan starting from scratch. It is
          an old promise finally coming due.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Exodus 3 is a short conversation that ends up defining who God says He is for the rest of Scripture.</p>
          <p>
            📌 <strong>God gets attention through something small and strange, not something
            terrifying.</strong> A bush that simply would not burn out was enough to make a working
            man stop and look twice.
          </p>
          <p>
            📌 <strong>&quot;Who am I&quot; is never answered with a resume. It is answered with a
            promise of presence.</strong> Moses never gets a list of reasons he is qualified. He
            gets &quot;I will be with thee,&quot; and that is treated as enough.
          </p>
          <p>
            📌 <strong>God tells His people the hard part in advance, not just the good
            part.</strong> Pharaoh&apos;s resistance is named before Moses ever leaves the mountain,
            right alongside the promise that it will not be the end of the story.
          </p>
          <p>
            You may feel as unqualified for whatever is in front of you as Moses felt standing
            barefoot at that bush.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Stop asking only &quot;who am I,&quot; and start listening for the answer Moses got
            instead: not a resume, but a presence that goes with you.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
