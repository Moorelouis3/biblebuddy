import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("deuteronomy-14-explained", {
  title: "Deuteronomy 14 Explained: Holy People, Clean Food, Costly Giving",
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

export default function DeuteronomyFourteenExplainedPage() {
  return (
    <BlogPostShell
      slug="deuteronomy-14-explained"
      title={<>📖 Deuteronomy 14 Explained: Holy People, Clean Food, Costly Giving</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>A funeral. A dinner table. A harvest barn. None of them sound like worship.</p>
            <p>
              <strong>Deuteronomy 14 explained</strong> is Moses taking the loyalty test of the
              last chapter and pointing it somewhere quieter than a prophet or a burning city. If
              a sign, a loved one, or a whole town can pull Israel toward other gods, this chapter
              asks whether that same loyalty shows up in smaller places: how you grieve, what you
              eat, what you give away.
            </p>
            <p>Maybe you have skimmed this chapter as an old food list with nothing left to say to you.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does God care how Israel grieves the dead?</li>
            <li>❓ Why name so many animals as forbidden and never explain why?</li>
            <li>❓ Why does the Levite keep showing up in a chapter about dinner?</li>
            <li>❓ Why does Israel tithe once a year, and then again every three years?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Deuteronomy 14 is holiness worked all the way down into the ordinary:
              grief, groceries, and giving.</strong>
            </p>
            <p>
              Twenty nine verses, and every one answers the same question from a different angle.
              What does it actually look like for a nation that belongs to God to live like it,
              starting at the dinner table.
            </p>
            <p>Read slowly. The smallest rules here carry the biggest claim in the whole book: you belong to someone, and it shows.</p>
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
            <ArticleLink href="/blog/deuteronomy-13-explained">Deuteronomy 13</ArticleLink> closed
            three scenarios that tested Israel&apos;s loyalty from the outside: a prophet whose
            sign came true, a loved one who whispered in private, a whole city that agreed
            together. Each time, Moses answered the same way. Follow the LORD, whatever the
            pressure looks like.
          </p>
          <p>
            Deuteronomy 14 takes that same loyalty and moves it indoors. It stops asking who might
            try to pull Israel away and starts naming what belonging to God actually looks like on
            an ordinary day, long before any prophet or crowd ever shows up to test it.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Deuteronomy 14 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. A People Set Apart, Even in Grief (verses 1 and 2)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Moses opens with identity, not instruction.</p>
        </div>
        <VerseQuote
          text="Ye are the children of the LORD your God: ye shall not cut yourselves, nor make any baldness between your eyes for the dead."
          reference="Deuteronomy 14:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The command comes after the identity, not before it.</strong> Canaanite
            mourning rites included cutting the body and shaving the front of the head, a visible
            way of showing grief that had become tangled up with pagan worship of the dead.
            Israel&apos;s grief had to look different, because <ArticleLink href="/blog/leviticus-19-explained">
            Leviticus 19</ArticleLink> had already drawn the same line for the exact same reason.
          </p>
          <p>Verse 2 gives the reason behind every rule still to come in this chapter.</p>
        </div>
        <VerseQuote
          text="For thou art an holy people unto the LORD thy God, and the LORD hath chosen thee to be a peculiar people unto himself, above all the nations that are upon the earth."
          reference="Deuteronomy 14:2"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 &quot;Peculiar&quot; in 1611 English did not mean strange. It meant a treasured
            possession, something set apart and kept close on purpose. The food laws, the mourning
            laws, and the giving laws that fill the rest of this chapter are not random rules.
            They are what it looks like to actually live as someone&apos;s treasured possession.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Which Animals Israel Could Eat (verses 3 to 8)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From grief, Moses moves straight to the dinner table.</p>
        </div>
        <VerseQuote text="Thou shalt not eat any abominable thing." reference="Deuteronomy 14:3" />
        <VerseQuote
          text="These are the beasts which ye shall eat: the ox, the sheep, and the goat, The hart, and the roebuck, and the fallow deer, and the wild goat, and the pygarg, and the wild ox, and the chamois."
          reference="Deuteronomy 14:4 and 5"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Some of these names are easy to picture today, the ox, the sheep, the goat, the deer.
            A few, like the pygarg and the chamois, name animals scholars still debate the exact
            identity of. What matters for the chapter is not the zoology. It is the rule behind the
            list.
          </p>
        </div>
        <VerseQuote
          text="And every beast that parteth the hoof, and cleaveth the cleft into two claws, and cheweth the cud among the beasts, that ye shall eat."
          reference="Deuteronomy 14:6"
        />
        <VerseQuote
          text="Nevertheless these ye shall not eat of them that chew the cud, or of them that divide the cloven hoof; as the camel, and the hare, and the coney: for they chew the cud, but divide not the hoof; therefore they are unclean unto you. And the swine, because it divideth the hoof, yet cheweth not the cud, it is unclean unto you: ye shall not eat of their flesh, nor touch their dead carcase."
          reference="Deuteronomy 14:7 and 8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Clean land animals had to meet both marks at once, not just one.</strong>
            {" "}The camel and the coney miss the parted hoof. The pig misses the chewed cud. Each
            animal named here fails the test a different way, which is the whole point. One
            matching feature was never going to be enough.
          </p>
          <p>
            <ArticleLink href="/blog/leviticus-11-explained">Leviticus 11</ArticleLink> gave Israel
            this same two part test at Sinai. Moses is not inventing a new law in the plains of
            Moab. He is reminding a generation that never heard it the first time.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Which Creatures of the Water and Sky (verses 9 to 20)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The same pattern repeats for water, then for the air.</p>
        </div>
        <VerseQuote
          text="These ye shall eat of all that are in the waters: all that have fins and scales shall ye eat: And whatsoever hath not fins and scales ye may not eat; it is unclean unto you."
          reference="Deuteronomy 14:9 and 10"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 One test, fins and scales, replaces the two part test used for land animals. Each
            category God names gets its own simple mark, not a copy of the last one.
          </p>
          <p>Birds get a list instead of a rule, bookended the same way the chapter opened.</p>
        </div>
        <VerseQuote text="Of all clean birds ye shall eat." reference="Deuteronomy 14:11" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Verses 12 through 18 then name the birds forbidden in between: the eagle, the vulture,
            the raven, several kinds of owl, the stork, and the bat, grouped with birds here simply
            because it flies, not because ancient Israel classified animals the way a modern
            textbook does.
          </p>
        </div>
        <VerseQuote text="And every creeping thing that flieth is unclean unto you: they shall not be eaten." reference="Deuteronomy 14:19" />
        <VerseQuote text="But of all clean fowls ye may eat." reference="Deuteronomy 14:20" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Look at the shape repeated three times in this chapter.</strong> Land
            animals, water creatures, and birds each get the same frame: a short clean side, a
            longer unclean side, and nothing offered by way of explanation. Verse 2 already gave
            the reason, and Moses does not feel the need to repeat it under every heading.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. A Death Law and an Ancient Ban Stand Side by Side (verse 21)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>One verse closes out the whole food section, and it does two things at once.</p>
        </div>
        <VerseQuote
          text="Ye shall not eat of anything that dieth of itself: thou shalt give it unto the stranger that is in thy gates, that he may eat it; or thou mayest sell it unto an alien: for thou art an holy people unto the LORD thy God. Thou shalt not seethe a kid in his mother’s milk."
          reference="Deuteronomy 14:21"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>An animal that died on its own could not be eaten by Israel, but it was not
            thrown away either.</strong> It went to the stranger in the gate, or was sold to a
            foreigner. Israel&apos;s stricter standard for holiness never became an excuse to waste
            food that someone else, under no such covenant, could still safely eat.
          </p>
          <p>
            The last line of the verse is one Moses already gave twice before, first at{" "}
            <ArticleLink href="/blog/exodus-23-explained">Exodus 23</ArticleLink> and again on
            Sinai. Boiling a young goat in its own mother&apos;s milk was tied to a Canaanite
            fertility rite, and the command sits here, in the middle of a food chapter, because it
            is also, in the end, a rule about what does and does not go on Israel&apos;s table.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. The Tithe You Ate With Joy (verses 22 to 27)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>From what Israel could eat, Moses turns to what Israel had to give.</p>
        </div>
        <VerseQuote text="Thou shalt truly tithe all the increase of thy seed, that the field bringeth forth year by year." reference="Deuteronomy 14:22" />
        <VerseQuote
          text="And thou shalt eat before the LORD thy God, in the place which he shall choose to place his name there, the tithe of thy corn, of thy wine, and of thine oil, and the firstlings of thy herds and of thy flocks; that thou mayest learn to fear the LORD thy God always."
          reference="Deuteronomy 14:23"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            That one chosen place is the same place{" "}
            <ArticleLink href="/blog/deuteronomy-12-explained">Deuteronomy 12</ArticleLink>{" "}
            already named without naming it. This tithe was never meant to be a quiet transaction.
            It was a trip, a meal, and a lesson in fearing God, repeated every single year.
          </p>
          <p>Moses then plans for the household too far from that place to travel easily.</p>
        </div>
        <VerseQuote
          text="And if the way be too long for thee, so that thou art not able to carry it; or if the place be too far from thee, which the LORD thy God shall choose to set his name there, when the LORD thy God hath blessed thee: Then shalt thou turn it into money, and bind up the money in thine hand, and shalt go unto the place which the LORD thy God shall choose: And thou shalt bestow that money for whatsoever thy soul lusteth after, for oxen, or for sheep, or for wine, or for strong drink, or for whatsoever thy soul desireth: and thou shalt eat there before the LORD thy God, and thou shalt rejoice, thou, and thine household,"
          reference="Deuteronomy 14:24 to 26"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Converting the tithe into money was never a loophole. The grain, wine, or flock
            animal is simply rebought once Israel arrives, so the same offering still ends in the
            same place, eaten before the LORD with the same rejoicing.
          </p>
          <p>One name appears right where the celebration verse ends.</p>
        </div>
        <VerseQuote text="And the Levite that is within thy gates; thou shalt not forsake him; for he hath no part nor inheritance with thee." reference="Deuteronomy 14:27" />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>This is the same reminder Deuteronomy 12 already repeated three times.</strong>
            {" "}A tribe with no farmland of its own depended entirely on households remembering to
            include him, and Moses keeps returning to that one name until it cannot be forgotten.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          6. The Third Year Tithe for the Forgotten (verses 28 and 29)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter ends on a different rhythm altogether.</p>
        </div>
        <VerseQuote
          text="At the end of three years thou shalt bring forth all the tithe of thine increase the same year, and shalt lay it up within thy gates: And the Levite, (because he hath no part nor inheritance with thee,) and the stranger, and the fatherless, and the widow, which are within thy gates, shall come, and shall eat and be satisfied; that the LORD thy God may bless thee in all the work of thine hand which thou doest."
          reference="Deuteronomy 14:28 and 29"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Every third year, the tithe stays home instead of traveling to the chosen
            place.</strong> It gets stored locally so the Levite, the stranger, the fatherless, and
            the widow can eat until they are satisfied, not just fed. This is the first time this
            book names all four of those groups together, and it will not be the last.
          </p>
          <p>
            ✅ <strong>The chapter that opened with Israel&apos;s own identity ends with a promise
            tied to how Israel treats people with no identity of their own to fall back on.</strong>{" "}
            Blessing, in the final line, is linked directly to generosity toward exactly the people
            who could offer nothing back.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Deuteronomy 14 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Why does the Bible forbid certain foods without ever explaining the
            reason?</strong> The text gives its own reason up front, in verse 2: Israel is a holy
            people, chosen to belong to the LORD above every other nation. Scripture never states
            a health or hygiene reason here. The stated purpose is identity, the same purpose
            already given for the mourning ban in verse 1.
          </p>
          <p>
            <strong>Does &quot;unclean&quot; mean an animal is disgusting or sinful to eat?</strong>{" "}
            No. Unclean in this chapter is a covenant category, not a verdict on the animal
            itself. The same creature could still be touched, raised, or sold, as verse 21 shows
            when an animal that died of itself is sold to a foreigner rather than destroyed. The
            restriction belonged to what Israel specifically was allowed to eat.
          </p>
          <p>
            <strong>Why does Israel tithe once a year and then again every three years?</strong>{" "}
            The text does not fully explain how the two instructions fit together, and Bible
            teachers read it differently. Some see two separate tithes layered on top of each
            other. Others see the same tithe used two different ways depending on the year, spent
            at the sanctuary most years and kept local on the third. What the text makes certain,
            regardless of which view is right, is that the Levite, the stranger, the fatherless,
            and the widow were never allowed to be forgotten in either pattern.
          </p>
          <p>
            <strong>Do Christians still have to follow the food laws in Deuteronomy 14?</strong>{" "}
            The New Testament addresses this directly. Jesus taught in Mark 7 that it is not what
            enters a person that makes them unclean, and Peter received a vision in Acts 10 of
            every kind of animal, with the message that God had made it clean. The civil and
            dietary law given specifically to Israel under this covenant does not bind Christians
            the way it bound Israel, though the deeper call toward holiness it was always pointing
            to still does.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Deuteronomy 14
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Deuteronomy 14:2</h3>
        <VerseQuote
          text="For thou art an holy people unto the LORD thy God, and the LORD hath chosen thee to be a peculiar people unto himself, above all the nations that are upon the earth."
          reference="Deuteronomy 14:2"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The reason behind every rule in the chapter, stated before a single food law appears.
          Belonging to God comes first. The instructions only describe what that belonging looks
          like.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Deuteronomy 14:6</h3>
        <VerseQuote
          text="And every beast that parteth the hoof, and cleaveth the cleft into two claws, and cheweth the cud among the beasts, that ye shall eat."
          reference="Deuteronomy 14:6"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The actual test behind the long list of names in verses 4 and 5. Two marks, not one, had
          to be present together for a land animal to be considered clean.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Deuteronomy 14:21</h3>
        <VerseQuote
          text="Ye shall not eat of anything that dieth of itself: thou shalt give it unto the stranger that is in thy gates, that he may eat it; or thou mayest sell it unto an alien: for thou art an holy people unto the LORD thy God."
          reference="Deuteronomy 14:21"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A stricter standard for Israel is never allowed to become an excuse to waste what someone
          else could still eat. Holiness here comes paired with generosity, not isolation.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Deuteronomy 14:23</h3>
        <VerseQuote
          text="And thou shalt eat before the LORD thy God, in the place which he shall choose to place his name there, the tithe of thy corn, of thy wine, and of thine oil, and the firstlings of thy herds and of thy flocks; that thou mayest learn to fear the LORD thy God always."
          reference="Deuteronomy 14:23"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          A tithe that was meant to teach, not just transfer wealth. Learning to fear God shows up
          here as the actual goal, with the giving itself as the method.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Deuteronomy 14:29</h3>
        <VerseQuote
          text="And the Levite, (because he hath no part nor inheritance with thee,) and the stranger, and the fatherless, and the widow, which are within thy gates, shall come, and shall eat and be satisfied; that the LORD thy God may bless thee in all the work of thine hand which thou doest."
          reference="Deuteronomy 14:29"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Blessing tied directly to how the most vulnerable people in the community were treated.
          Four names with no land or income of their own, all promised to be satisfied, not merely
          fed.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Deuteronomy 14
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is Deuteronomy 14 about?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 14 bans Canaanite style mourning rites, lists which land animals, water
          creatures, and birds Israel could and could not eat, and commands two different tithes to
          support worship and provide for the Levite, the stranger, the fatherless, and the widow.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Deuteronomy 14 forbid cutting yourself for the dead?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Cutting the body and shaving the forehead were Canaanite mourning practices tied to
          worship of the dead. Deuteronomy 14:1 bans the practice for Israel, and Leviticus 19
          gives the same ban, because Israel&apos;s grief had to look different from its
          neighbors&apos; grief.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What does &quot;peculiar people&quot; mean in Deuteronomy 14:2?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          In 1611 English, &quot;peculiar&quot; meant a treasured possession kept apart on purpose,
          not strange or odd as the word suggests today. Deuteronomy 14:2 uses it to describe
          Israel as God&apos;s own chosen possession among all the nations.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why is pork unclean in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Deuteronomy 14:8 states the reason directly. A pig divides the hoof but does not chew the
          cud, so it fails the two part test given in verse 6 for a clean land animal. The text
          gives no health explanation, only this stated rule.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why can&apos;t Israel eat a kid boiled in its mother&apos;s milk?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This command first appears in Exodus 23 and Exodus 34, tied to a Canaanite fertility
          rite. Deuteronomy 14:21 repeats it at the close of the food laws because it belongs, in
          the end, to the same question of what does and does not go on Israel&apos;s table.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What is the difference between the yearly tithe and the third year tithe?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The tithe in verses 22 through 27 traveled to the one place God chose, eaten there in
          celebration. The tithe in verses 28 and 29 stayed local every third year specifically to
          feed the Levite, the stranger, the fatherless, and the widow within the gates.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does the Levite keep appearing in Deuteronomy 14?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The Levites received no tribal land and depended on tithes from the other tribes to
          survive. Deuteronomy 14 names him twice, in verse 27 and again in verse 29, continuing a
          reminder Deuteronomy 12 had already repeated three times.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Do Christians have to follow the food laws in Deuteronomy 14?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Jesus taught in Mark 7 that food does not defile a person, and Peter&apos;s vision in
          Acts 10 showed every kind of animal declared clean. The specific dietary law given to
          Israel under this covenant does not bind Christians the same way today.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Deuteronomy 14 still matter if the food laws do not apply anymore?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. The chapter&apos;s deeper claim never expired with the diet. Belonging to God was
          always meant to reach into ordinary choices, and the call to care for the Levite, the
          stranger, the fatherless, and the widow in verse 29 is repeated throughout the rest of
          Scripture.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Deuteronomy 14 never asks Israel to believe something new. It asks them to let what they already believe reach the dinner table.</p>
          <p>
            📌 <strong>Holiness was never meant to stay in the sanctuary.</strong> Verse 2 names
            the reason for everything that follows, and the chapter spends the next twenty seven
            verses working that identity into grief, groceries, and giving.
          </p>
          <p>
            📌 <strong>Belonging to God comes with no explanation owed.</strong> The text never
            defends the food list with health or logic. It simply says who Israel belongs to, and
            lets that be reason enough.
          </p>
          <p>
            📌 <strong>Generosity sits inside the holiness laws, not apart from them.</strong> An
            animal too unclean for Israel still fed the stranger. A tithe every third year still
            found its way to the Levite, the stranger, the fatherless, and the widow.
          </p>
          <p>
            You do not sort animals by hoof and cud anymore. But you still decide, in ordinary
            moments no one is testing you on, whether your life actually looks like it belongs to
            someone.
          </p>
          <p>So here is your one next step.</p>
          <p>
            Pick one ordinary habit this week, how you grieve, what you spend, or what you give
            away, and let it show whose you actually are.
          </p>
        </div>
      </section>
    </BlogPostShell>
  );
}
