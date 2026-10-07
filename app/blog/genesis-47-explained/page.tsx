import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("genesis-47-explained", {
  title: "Genesis 47 Explained: Jacob Settles in Goshen and Joseph Feeds Egypt",
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

export default function GenesisFortySevenExplainedPage() {
  return (
    <BlogPostShell
      slug="genesis-47-explained"
      title={<>📖 Genesis 47 Explained: Jacob Settles in Goshen and Joseph Feeds Egypt</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>Five brothers stand in front of the most powerful man in the ancient world and tell him, plainly, that they are shepherds.</p>
            <p>
              <strong>Genesis 47 explained</strong> is the chapter where the plan from the end of
              the last chapter actually plays out. Joseph&apos;s family is granted land. His
              father meets Pharaoh face to face. And while the famine keeps grinding on outside
              Goshen, Joseph runs an economic policy so sweeping it reshapes who owns Egypt
              itself.
            </p>
            <p>Maybe you have wondered how far is too far when someone in power is trying to save your life.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Jacob call his long life &quot;few and evil&quot;?</li>
            <li>❓ Did Joseph really turn the whole Egyptian population into servants?</li>
            <li>❓ Why are the priests the one group excused from the deal?</li>
            <li>❓ And what does Jacob mean by asking Joseph to put a hand under his thigh?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>The same famine that hands Joseph his family back also hands him more
              power over Egypt than any foreigner in its history.</strong>
            </p>
            <p>
              This walkthrough goes through Genesis 47 in order: the brothers standing before
              Pharaoh, Jacob&apos;s blessing and his strange answer about his own age, the land
              Joseph secures for his family, the famine that will not let up, the two years of
              bartering that end with Egypt itself belonging to Pharaoh, and the oath an old man
              asks for before he is willing to rest.
            </p>
            <p>A chapter about bread turns out to be a chapter about where you finally belong.</p>
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
            <ArticleLink href="/blog/genesis-46-explained">Genesis 46</ArticleLink> ended with
            Joseph coaching his brothers on exactly what to tell Pharaoh about their trade.
            Shepherding was looked down on in Egypt, and Joseph planned to use that very
            prejudice to win his family a separate home in Goshen, away from Egyptian cities,
            with their flocks and customs left alone.
          </p>
          <p>
            Genesis 47 opens with that plan put to the test, in front of the one man who can
            actually grant or deny it.
          </p>
          <p>
            The full account of how a Hebrew shepherd ended up with this much authority in Egypt
            in the first place, sold by his own brothers and raised up through a prison cell and
            a pair of dreams, is covered in{" "}
            <ArticleLink href="/blog/who-was-joseph">the story of Joseph</ArticleLink>.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Genesis 47 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Five Brothers Stand Before Pharaoh (verses 1 to 6)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joseph wastes no time getting the arrangement official.</p>
        </div>
        <VerseQuote
          text="Then Joseph came and told Pharaoh, and said, My father and my brethren, and their flocks, and their herds, and all that they have, are come out of the land of Canaan; and, behold, they are in the land of Goshen."
          reference="Genesis 47:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            He does not bring his whole family before the throne at once. He takes five brothers,
            and lets them speak for themselves.
          </p>
        </div>
        <VerseQuote
          text="And Pharaoh said unto his brethren, What is your occupation? And they said unto Pharaoh, Thy servants are shepherds, both we, and also our fathers."
          reference="Genesis 47:3"
        />
        <VerseQuote
          text="They said moreover unto Pharaoh, For to sojourn in the land are we come; for thy servants have no pasture for their flocks; for the famine is sore in the land of Canaan: now therefore, we pray thee, let thy servants dwell in the land of Goshen."
          reference="Genesis 47:4"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>They say exactly what Joseph told them to say, word for word.</strong> They
            do not dress up their trade or hide the part Egyptians found distasteful. They ask
            for nothing more than Goshen, land to sojourn on, not land to own or rule.
          </p>
          <p>Pharaoh&apos;s answer goes further than Joseph even asked for.</p>
        </div>
        <VerseQuote
          text="The land of Egypt is before thee; in the best of the land make thy father and brethren to dwell; in the land of Goshen let them dwell: and if thou knowest any men of activity among them, then make them rulers over my cattle."
          reference="Genesis 47:6"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Pharaoh does not ration out the worst corner of Egypt to foreign shepherds. He offers
            the best of the land, and invites Joseph to put his own brothers in charge of
            Pharaoh&apos;s royal herds if any of them are capable. The family that came begging
            for pasture is handed responsibility instead.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Jacob Blesses Pharaoh and Names His Years (verses 7 to 10)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With the brothers settled, Joseph brings his father in.</p>
        </div>
        <VerseQuote
          text="And Joseph brought in Jacob his father, and set him before Pharaoh: and Jacob blessed Pharaoh."
          reference="Genesis 47:7"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice who is blessing whom.</strong> An old shepherd, with nothing to his
            name but what his sons carried out of Canaan, stands in front of the most powerful
            ruler on earth and blesses him, not the other way around. The text does not record
            the words of the blessing, only that it happened, twice, framing this whole visit.
          </p>
          <p>Pharaoh asks one personal question.</p>
        </div>
        <VerseQuote text="And Pharaoh said unto Jacob, How old art thou?" reference="Genesis 47:8" />
        <VerseQuote
          text="And Jacob said unto Pharaoh, The days of the years of my pilgrimage are an hundred and thirty years: few and evil have the days of the years of my life been, and have not attained unto the days of the years of the life of my fathers in the days of their pilgrimage."
          reference="Genesis 47:9"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Jacob calls himself a pilgrim, not a resident, even now. His own grandfather
            Abraham lived to a hundred seventy five and his father Isaac to a hundred eighty.
            Next to them, a hundred thirty feels short to him.
          </p>
          <p>
            ⚠️ <strong>&quot;Few and evil&quot; is not false humility.</strong> This is a man who
            fled his brother, served Laban for twenty years, lost his beloved Rachel in
            childbirth, buried his grief over a daughter&apos;s violation, and spent twenty two
            years believing Joseph was torn apart by a wild animal. A long life and a hard life
            are not opposites, and Jacob names both without pretending otherwise.
          </p>
        </div>
        <VerseQuote text="And Jacob blessed Pharaoh, and went out from before Pharaoh." reference="Genesis 47:10" />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. A Permanent Home in Rameses (verses 11 and 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Pharaoh&apos;s word becomes Joseph&apos;s action.</p>
        </div>
        <VerseQuote
          text="And Joseph placed his father and his brethren, and gave them a possession in the land of Egypt, in the best of the land, in the land of Rameses, as Pharaoh had commanded."
          reference="Genesis 47:11"
        />
        <VerseQuote
          text="And Joseph nourished his father, and his brethren, and all his father's household, with bread, according to their families."
          reference="Genesis 47:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is the first time in the whole family&apos;s story that land in
            another man&apos;s country is called their own possession.</strong> Not a loan, not a
            favor that could be revoked on a bad day, but a holding named Rameses, in the richest
            part of the country. And every household, down to the smallest child, is fed by
            Joseph&apos;s own hand.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Famine That Would Not Let Up, and the First Year of Bartering (verses 13 to 17)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The chapter turns away from Jacob&apos;s family entirely and spends the rest of its
            length on a problem much bigger than one household.
          </p>
        </div>
        <VerseQuote
          text="And there was no bread in all the land; for the famine was very sore, so that the land of Egypt and all the land of Canaan fainted by reason of the famine."
          reference="Genesis 47:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Joseph had already been collecting money for grain since the famine began, and
            Genesis 47:14 says he brought all of it into Pharaoh&apos;s house. But money is only
            useful as long as there is anything left to buy with it.
          </p>
        </div>
        <VerseQuote
          text="And when money failed in the land of Egypt, and in the land of Canaan, all the Egyptians came unto Joseph, and said, Give us bread: for why should we die in thy presence? for the money faileth."
          reference="Genesis 47:15"
        />
        <VerseQuote
          text="And they brought their cattle unto Joseph: and Joseph gave them bread in exchange for horses, and for the flocks, and for the cattle of the herds, and for the asses: and he fed them with bread for all their cattle for that year."
          reference="Genesis 47:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Once the Egyptians run out of silver, Joseph does not turn them away. He simply
            changes the currency. Livestock becomes payment, and an entire nation eats for
            another year.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Second Year: Land, Freedom, and a Fifth Part Forever (verses 18 to 26)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            When the people run out of animals too, they come back with an offer Joseph never
            demanded.
          </p>
        </div>
        <VerseQuote
          text="Wherefore shall we die before thine eyes, both we and our land? buy us and our land for bread, and we and our land will be servants unto Pharaoh: and give us seed, that we may live, and not die, that the land be not desolate."
          reference="Genesis 47:19"
        />
        <VerseQuote
          text="And Joseph bought all the land of Egypt for Pharaoh; for the Egyptians sold every man his field, because the famine prevailed over them: so the land became Pharaoh's."
          reference="Genesis 47:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>Read carefully who makes this offer.</strong> It is the Egyptian people
            themselves who propose selling their land and their freedom in exchange for seed and
            survival. Joseph does not seize anything by force. He is handed an empire, one
            desperate request at a time, by people who would rather live as servants than starve
            as free men.
          </p>
          <p>One group is left out of the arrangement entirely.</p>
        </div>
        <VerseQuote
          text="Only the land of the priests bought he not; for the priests had a portion assigned them of Pharaoh, and did eat their portion which Pharaoh gave them: wherefore they sold not their lands."
          reference="Genesis 47:22"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Egypt&apos;s priests already received a fixed ration directly from Pharaoh, so they
            never faced the choice everyone else did. They had no land to lose because they had
            never depended on their own fields to begin with.
          </p>
          <p>With the land secured, Joseph sets the terms going forward.</p>
        </div>
        <VerseQuote
          text="And it shall come to pass in the increase, that ye shall give the fifth part unto Pharaoh, and four parts shall be your own, for seed of the field, and for your food, and for them of your households, and for food for your little ones."
          reference="Genesis 47:24"
        />
        <VerseQuote
          text="And Joseph made it a law over the land of Egypt unto this day, that Pharaoh should have the fifth part; except the land of the priests only, which became not Pharaoh's."
          reference="Genesis 47:26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>That number is not new.</strong> Back in{" "}
            <ArticleLink href="/blog/genesis-41-explained">Genesis 41</ArticleLink>, Joseph told
            Pharaoh to collect a fifth of every harvest during the seven good years, purely to
            stockpile grain for the lean ones ahead. Here that same one fifth tax outlives the
            emergency that created it and becomes permanent Egyptian law, long after the famine
            itself has ended.
          </p>
          <p>
            And the people&apos;s own response is relief, not resentment.
          </p>
        </div>
        <VerseQuote
          text="And they said, Thou hast saved our lives: let us find grace in the sight of my lord, and we will be Pharaoh's servants."
          reference="Genesis 47:25"
        />

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. A Family Multiplies While an Empire Changes Hands (verses 27 and 28)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Against the backdrop of an entire country losing its land, one small family quietly
            does the opposite.
          </p>
        </div>
        <VerseQuote
          text="And Israel dwelt in the land of Egypt, in the country of Goshen; and they had possessions therein, and grew, and multiplied exceedingly."
          reference="Genesis 47:27"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>While Egyptians are selling what they own, Jacob&apos;s family is
            growing what it owns.</strong> They hold actual possessions in Goshen, not a ration
            from Pharaoh, and they grow exceedingly in the very years everyone around them is
            losing ground. It is a quiet, almost buried fulfillment of the promise God renewed to
            Jacob at Beersheba in the last chapter.
          </p>
        </div>
        <VerseQuote
          text="And Jacob lived in the land of Egypt seventeen years: so the whole age of Jacob was an hundred forty and seven years."
          reference="Genesis 47:28"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 This is a summary verse, stepping outside the immediate scene to give the full
            count of Jacob&apos;s life before the narrative returns to the final days that follow.
            A hundred thirty when he arrived, seventeen years in Egypt, a hundred forty seven in
            total.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          7. One Last Request Before Jacob Will Rest (verses 29 to 31)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Near the end of those seventeen years, Jacob has one piece of unfinished business.</p>
        </div>
        <VerseQuote
          text="And the time drew nigh that Israel must die: and he called his son Joseph, and said unto him, If now I have found grace in thy sight, put, I pray thee, thy hand under my thigh, and deal kindly and truly with me; bury me not, I pray thee, in Egypt:"
          reference="Genesis 47:29"
        />
        <VerseQuote
          text="But I will lie with my fathers, and thou shalt carry me out of Egypt, and bury me in their buryingplace. And he said, I will do as thou hast said."
          reference="Genesis 47:30"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Jacob has land, food, and his favorite son restored to him. Egypt has given him
            everything except the one thing he actually wants at the end: to be buried back in
            Canaan, with Abraham, Isaac, and the rest of the family God made His promise to.
          </p>
        </div>
        <VerseQuote
          text="And he said, Swear unto me. And he sware unto him. And Israel bowed himself upon the bed's head."
          reference="Genesis 47:31"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>A promise alone is not enough for Jacob. He asks Joseph to swear it.</strong>
            This same gesture, putting a hand under another man&apos;s thigh while making a
            binding vow, is how Abraham made his own servant swear an oath back in Genesis 24.
            Jacob is not improvising a strange ritual. He is reaching for the most solemn form of
            promise his family knew, because where his body ends up is tied, in his mind, directly
            to the land God swore to his grandfather.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Genesis 47 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Did Joseph enslave the Egyptian people?</strong> The text never has Joseph
            demand this. Genesis 47:19 and 25 show the Egyptians themselves proposing it, selling
            their land and offering their own service to Pharaoh in exchange for seed and survival,
            and then thanking Joseph afterward for saving their lives. The arrangement that
            follows looks like tenant farmers working land owned by the crown for a fixed share of
            the harvest, four parts kept for every one part paid, not people stripped of their
            humanity or sold between owners.
          </p>
          <p>
            <strong>Is it troubling that this happens at all?</strong> It is worth sitting with.
            Joseph&apos;s own family was sold into actual slavery back in{" "}
            <ArticleLink href="/blog/genesis-37-explained">Genesis 37</ArticleLink>, and generations
            later Jacob&apos;s descendants will be the ones forced into hard labor by a different
            Pharaoh in Exodus. Genesis 47 does not resolve that tension or comment on it. It simply
            records what happened, and leaves the echo for a reader who already knows what comes
            later in the story.
          </p>
          <p>
            <strong>Why were the priests exempt from selling their land?</strong> Genesis 47:22
            says they already received a fixed portion of food directly from Pharaoh, so they
            never depended on their own fields the way ordinary farmers did. With nothing to lose
            to the famine, they had nothing to sell when everyone else did.
          </p>
          <p>
            <strong>Why does Jacob describe a hundred thirty years as &quot;few and evil&quot;?</strong>{" "}
            He is not denying that he was blessed. He is being honest that length of life and
            ease of life are two different things, and his own has been marked by exile, grief,
            and decades of believing his favorite son was dead.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top 5 Bible Verses From Genesis 47
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Genesis 47:9</h3>
        <VerseQuote
          text="And Jacob said unto Pharaoh, The days of the years of my pilgrimage are an hundred and thirty years: few and evil have the days of the years of my life been, and have not attained unto the days of the years of the life of my fathers in the days of their pilgrimage."
          reference="Genesis 47:9"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A patriarch&apos;s own honest verdict on his long life, calling himself a pilgrim to the
          very end and refusing to pretend a hard life was an easy one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Genesis 47:20</h3>
        <VerseQuote
          text="And Joseph bought all the land of Egypt for Pharaoh; for the Egyptians sold every man his field, because the famine prevailed over them: so the land became Pharaoh's."
          reference="Genesis 47:20"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The moment a whole nation&apos;s economy is rebuilt from the ground up, one desperate,
          willing sale at a time.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Genesis 47:25</h3>
        <VerseQuote
          text="And they said, Thou hast saved our lives: let us find grace in the sight of my lord, and we will be Pharaoh's servants."
          reference="Genesis 47:25"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Gratitude, not resentment, from the very people who just lost their land, a sign of how
          close the famine had brought them to the edge.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Genesis 47:27</h3>
        <VerseQuote
          text="And Israel dwelt in the land of Egypt, in the country of Goshen; and they had possessions therein, and grew, and multiplied exceedingly."
          reference="Genesis 47:27"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          While Egypt sells away its land, God&apos;s promise to Abraham quietly keeps compounding
          inside one small corner of it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Genesis 47:29 and 30</h3>
        <VerseQuote
          text="And the time drew nigh that Israel must die: and he called his son Joseph, and said unto him, If now I have found grace in thy sight, put, I pray thee, thy hand under my thigh, and deal kindly and truly with me; bury me not, I pray thee, in Egypt: But I will lie with my fathers, and thou shalt carry me out of Egypt, and bury me in their buryingplace. And he said, I will do as thou hast said."
          reference="Genesis 47:29 and 30"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A man with every comfort Egypt can offer still asks for one thing Egypt cannot give him:
          to be carried home.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Genesis 47
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens in Genesis 47?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Joseph presents his brothers and then his father Jacob to Pharaoh, who grants the
          family land in Goshen. The chapter then follows the famine as it worsens across Egypt,
          with Joseph trading bread first for livestock and then for the people&apos;s own land
          and freedom, before closing with Jacob asking Joseph to swear he will be buried in
          Canaan rather than Egypt.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Joseph really make all of Egypt servants to Pharaoh?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 47:19 to 25 shows the Egyptian people themselves offering their land and their
          service in exchange for seed and survival, not Joseph forcing it on them. The result
          functioned like tenant farming, with four fifths of each harvest kept by the farmer and
          one fifth paid to Pharaoh as a permanent tax.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why were the priests excused from selling their land?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 47:22 says Egypt&apos;s priests already lived on a fixed portion Pharaoh gave
          them directly, so the famine never forced a choice on them the way it did on ordinary
          landowners who depended on their own fields.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;put thy hand under my thigh&quot; mean?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It was a solemn way of making someone swear a binding oath. Genesis 24 records Abraham
          using the same gesture to make his servant swear about finding a wife for Isaac. Jacob
          uses it here to bind Joseph to a promise he considers too important to leave as a
          casual agreement.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why didn&apos;t Jacob want to be buried in Egypt?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Jacob wanted to be buried alongside Abraham and Isaac in Canaan, the land God had sworn
          to give his family. Even with every comfort Egypt offered him, he wanted his burial
          place to point back to the promise rather than to the country that was only ever meant
          to be a temporary shelter from famine.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Jacob call his life &quot;few and evil&quot; if he lived to 147?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          He is comparing his years to his father and grandfather, who lived even longer, and
          being honest that a long life is not automatically an easy one. Exile, the loss of
          Rachel, and decades of grief over Joseph all stand behind that one line.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was the fifth part Joseph required from Egypt?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          It was a twenty percent tax on every harvest, the same fraction Joseph first proposed
          in Genesis 41 during the seven good years to stockpile grain. Genesis 47:26 turns that
          temporary wartime measure into permanent Egyptian law.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How is Jacob&apos;s family different from the rest of Egypt in this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          While Egyptians are selling their land and their freedom to survive, Genesis 47:27 says
          Jacob&apos;s family holds actual possessions in Goshen and grows exceedingly in the same
          years. The family under God&apos;s promise prospers right alongside a nation losing
          everything it owns.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How does Genesis 47 connect to Exodus?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The same Goshen where Jacob&apos;s family multiplies here is where their descendants
          will still be living, and still multiplying, when a new Pharaoh grows afraid of their
          numbers at the start of Exodus. The welcome of Genesis 47 sets up the very population
          that book opens by fearing.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happens after Genesis 47?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Genesis 48 opens with Jacob, now sick and near death, blessing Joseph&apos;s two sons,
          Ephraim and Manasseh, and giving the younger son the greater blessing ahead of custom.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Genesis 47 covers an entire nation changing hands, and still ends on one old man&apos;s one request.</p>
          <p>
            📌 <strong>Being well provided for is not the same as being home.</strong> Jacob has
            the best land in Egypt, a grateful Pharaoh, and his favorite son beside him again, and
            still asks to be carried somewhere else when he dies.
          </p>
          <p>
            📌 <strong>A temporary emergency measure can outlive the emergency.</strong> The fifth
            part tax that started as a plan to survive seven good years in Genesis 41 becomes
            permanent Egyptian law here, long after the famine that justified it has passed.
          </p>
          <p>
            📌 <strong>A long, hard life can be named honestly without losing sight of the
            promise.</strong> Jacob calls his years few and evil in the same breath he blesses
            Pharaoh and trusts Joseph with his final request.
          </p>
          <p>
            You may be living somewhere comfortable right now that still is not quite where you
            belong.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Name honestly, the way Jacob did, which promise of God you are actually waiting to be
            carried home to.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
