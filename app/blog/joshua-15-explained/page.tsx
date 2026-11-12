import BlogPostShell from "@/components/blog/BlogPostShell";
import Link from "next/link";
import { buildBlogArticleMetadata } from "@/lib/blogContent";

export const metadata = buildBlogArticleMetadata("joshua-15-explained", {
  title: "Joshua 15 Explained: Caleb Takes the Giants' Mountain",
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

export default function JoshuaFifteenExplainedPage() {
  return (
    <BlogPostShell
      slug="joshua-15-explained"
      title={<>📖 Joshua 15 Explained: Caleb Takes the Giants&apos; Mountain</>}
      intro={
        <>
          <div className="mt-8 space-y-5 text-lg leading-8 text-slate-700">
            <p>One chapter ago, an 85 year old man asked for the one piece of ground everyone else was afraid of.</p>
            <p>
              <strong>Joshua 15 explained</strong> is where you find out what happened when he actually went and
              took it. This is the longest tribal inheritance chapter in the whole book. Judah receives the
              biggest allotment of land in Canaan, Caleb personally drives out the giants he asked for by name,
              his own daughter makes a bold request of her own, and the chapter closes on a single sentence that
              will keep echoing for centuries.
            </p>
            <p>Maybe you have finished a big task and immediately found one more stubborn piece nobody warned you about.</p>
          </div>
          <ul className="mt-4 space-y-3 text-lg leading-8 text-slate-700">
            <li>❓ Why does Judah get a border description longer than any other tribe in the book?</li>
            <li>❓ Did Caleb actually drive out the giants he asked for in the chapter before this one?</li>
            <li>❓ Why does Caleb offer his own daughter as the prize for conquering a city?</li>
            <li>❓ Why does a chapter full of victories end by admitting a defeat?</li>
          </ul>
          <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
            <p>
              📌 <strong>Judah receives the single biggest inheritance in all of Canaan, and the chapter still
              ends by naming exactly what Judah never finished.</strong>
            </p>
            <p>
              This walkthrough moves through the whole chapter in order: Judah&apos;s border traced from Edom to
              the sea, Caleb finishing the fight he asked for, his daughter Achsah&apos;s request for springs of
              water, the long list of Judah&apos;s cities, and the one line that quietly explains hundreds of
              years of history still to come.
            </p>
            <p>Watch how a chapter built entirely out of borders and names still has room for courage, boldness, and one honest admission.</p>
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
            <ArticleLink href="/blog/joshua-14-explained">Joshua 14</ArticleLink> ended with an 85 year old Caleb
            reminding Joshua of a 45 year old promise, asking for Hebron and the mountain still held by the sons
            of Anak, and Joshua granting it to him on the spot. That chapter recorded the request and the grant.
            It did not yet record the fight.
          </p>
          <p>
            Joshua 15 steps back to describe the full territory the tribe of Judah received by lot, Caleb&apos;s
            own share included. It is inside that bigger description that the reader finally learns whether an 85
            year old man&apos;s confidence actually held up once the giants were standing in front of him instead
            of just named in a promise.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Joshua 15 Explained Verse by Verse
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          1. Judah&apos;s Border, Traced From Edom to the Sea (verses 1 to 12)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>The chapter opens with geography, not action, and it does not rush through it.</p>
        </div>
        <VerseQuote
          text="This then was the lot of the tribe of the children of Judah by their families; even to the border of Edom the wilderness of Zin southward was the uttermost part of the south coast."
          reference="Joshua 15:1"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Edom and the wilderness of Zin sit on Judah&apos;s most exposed, most hostile southern edge. The
            border runs along the salt sea to the east, then climbs north, before it does something worth
            slowing down for.
          </p>
        </div>
        <VerseQuote
          text="And the border went up by the valley of the son of Hinnom unto the south side of the Jebusite; the same is Jerusalem: and the border went up to the top of the mountain that lieth before the valley of Hinnom westward, which is at the end of the valley of the giants northward:"
          reference="Joshua 15:8"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Notice what the border does right at Jerusalem. It runs along &quot;the south side of the
            Jebusite,&quot; naming the city by the people who still lived in it, not as ground Judah had already
            taken.</strong> The map itself already knew, before a single city list begins, that this one place
            was still a problem. The chapter does not say so outright yet. It just quietly writes the older,
            unconquered name into the border line and keeps moving.
          </p>
        </div>
        <VerseQuote
          text="And the west border was to the great sea, and the coast thereof. This is the coast of the children of Judah round about according to their families."
          reference="Joshua 15:12"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            South to Edom and the wilderness of Zin, east along the salt sea, north past the edge of Jerusalem,
            west to the great sea. Four directions, and Judah&apos;s whole territory is fixed before a single
            city inside it gets named.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          2. Caleb Finishes What He Asked For (verses 13 to 15)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Before the chapter names a single city belonging to the tribe as a whole, it stops to record what
            Caleb did with what Joshua had just given him.
          </p>
        </div>
        <VerseQuote
          text="And unto Caleb the son of Jephunneh he gave a part among the children of Judah, according to the commandment of the LORD to Joshua, even the city of Arba the father of Anak, which city is Hebron."
          reference="Joshua 15:13"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            The mountain Caleb asked for in <ArticleLink href="/blog/joshua-14-explained">Joshua 14:12</ArticleLink>,
            &quot;whereof the LORD spake,&quot; turns out to be Hebron itself, named for Arba, the father of
            Anak.
          </p>
        </div>
        <VerseQuote
          text="And Caleb drove thence the three sons of Anak, Sheshai, and Ahiman, and Talmai, the children of Anak."
          reference="Joshua 15:14"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>The verse does not say an army drove out Sheshai, Ahiman, and Talmai. It says Caleb
            did.</strong> Naming the three giants individually matters. These are not an anonymous crowd the
            text calls &quot;giants&quot; in passing. This is the same family of Anakim that broke the nerve of
            <ArticleLink href="/blog/numbers-13-explained">Numbers 13&apos;s</ArticleLink> ten frightened spies 45
            years earlier. Caleb names the exact thing that terrified a whole generation, drives it out
            personally, and the text makes sure the reader knows whose hands did it.
          </p>
        </div>
        <VerseQuote
          text="And he went up thence to the inhabitants of Debir: and the name of Debir before was Kirjathsepher."
          reference="Joshua 15:15"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            Debir falls next, a second fortified city cleared in the same stretch of verses. Two cities, three
            named giants, one old man who said in the chapter before this one that his strength had not changed
            in 45 years, and nothing in the text here contradicts him.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          3. Achsah, Othniel, and a Bold Request for Water (verses 16 to 19)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Debir was still an open fight when Caleb turned it into a contest.</p>
        </div>
        <VerseQuote
          text="And Caleb said, He that smiteth Kirjathsepher, and taketh it, to him will I give Achsah my daughter to wife."
          reference="Joshua 15:16"
        />
        <VerseQuote
          text="And Othniel the son of Kenaz, the brother of Caleb, took it: and he gave him Achsah his daughter to wife."
          reference="Joshua 15:17"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>&quot;The brother of Caleb&quot; is all this verse says about Othniel.</strong> Judges
            1:13 fills in the detail this verse leaves out, calling him &quot;Caleb&apos;s younger brother&quot;
            directly. However the exact family tie is read, this is the same Othniel that Judges 3:9 and 10
            later names as the very first judge the LORD raised up to deliver Israel, decades after this wedding.
          </p>
        </div>
        <VerseQuote
          text="And it came to pass, as she came unto him, that she moved him to ask of her father a field: and she lighted off her ass; and Caleb said unto her, What wouldest thou? Who answered, Give me a blessing; for thou hast given me a south land; give me also springs of water. And he gave her the upper springs, and the nether springs."
          reference="Joshua 15:18 and 19"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            💡 Achsah does not wait for someone else to ask on her behalf. She gets down off her own donkey and
            makes the request herself, and she asks for exactly what a dry southern allotment needs to be worth
            anything: water. Caleb does not negotiate her down. He gives her both the upper springs and the
            lower springs, more than the bare word of her request.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          4. The Long List of Judah&apos;s Cities (verses 20 to 62)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>With Caleb&apos;s own share settled, the chapter turns to the rest of the tribe, and it does not summarize. It counts.</p>
        </div>
        <VerseQuote
          text="This is the inheritance of the tribe of the children of Judah according to their families."
          reference="Joshua 15:20"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            What follows is four separate regional lists: the southern towns near Edom, the lowland towns toward
            Philistine territory, the hill country towns, and a short list in the wilderness near the salt sea.
            Each region closes with its own stated total.
          </p>
        </div>
        <VerseQuote
          text="And Lebaoth, and Shilhim, and Ain, and Rimmon: all the cities are twenty and nine, with their villages:"
          reference="Joshua 15:32"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            📌 <strong>Add up every subtotal this chapter states for itself, 29, 14, 16, 9, 11, 9, 10, 6, 2, and
            6, and Judah&apos;s allotment comes to 112 named towns</strong>, not counting Jerusalem, which the
            chapter is about to say Judah never actually held. No other tribe in the book of Joshua receives a
            list this long. Judah already carries weight beyond this one chapter. It is the tribe Jacob named as
            the one kings would come from, and centuries later it is the tribe both David and Jesus belong to.
          </p>
        </div>

        <h3 className="mt-8 text-2xl font-black text-slate-950">
          5. One Line That Changes Everything: Jerusalem Still Not Taken (verse 63)
        </h3>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>After 62 verses of borders, names, and victories, the chapter ends with a single sentence that undercuts the feel of everything before it.</p>
        </div>
        <VerseQuote
          text="As for the Jebusites the inhabitants of Jerusalem, the children of Judah could not drive them out: but the Jebusites dwell with the children of Judah at Jerusalem unto this day."
          reference="Joshua 15:63"
        />
        <div className="mt-5 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            ⚠️ <strong>This is not a contradiction hiding in the text. It is the text being honest about
            itself.</strong> <ArticleLink href="/blog/joshua-10-explained">Joshua 10</ArticleLink> already
            recorded Adonizedek, the king of Jerusalem, defeated and executed alongside four other kings. Joshua
            12 counts &quot;the king of Jerusalem&quot; among the kings Israel struck down. But a king dying on a
            battlefield and a walled city surrendering are two different events, and Jerusalem&apos;s walls
            apparently held even after its king did not.
          </p>
          <p>
            This matches exactly what <ArticleLink href="/blog/joshua-13-explained">Joshua 13:13</ArticleLink>
            already admitted about the Geshurites and Maachathites east of the Jordan. Judah&apos;s own border,
            drawn so carefully at the start of this chapter, runs right past Jerusalem&apos;s edge rather than
            through its center, almost as if the border already knew what verse 63 would eventually say out
            loud.
          </p>
          <p>
            📌 <strong>The Jebusites stayed in Jerusalem for centuries after this verse was written.</strong> It
            takes until generations later, under King David, before Jerusalem finally changes hands and becomes
            the city the rest of the Bible calls the city of David.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ⚠️ Hard Questions Joshua 15 Raises
        </h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>
            <strong>Does verse 63 saying Judah could not drive out the Jebusites contradict Joshua 10 and 12
            recording Jerusalem&apos;s king as defeated?</strong> What the text says: Joshua 10:26 records
            Adonizedek&apos;s execution, and Joshua 12 lists the king of Jerusalem among the kings struck down.
            Joshua 15:63 says Judah still could not drive the Jebusite inhabitants out of the city itself. How
            this fits: defeating a king in open battle, which is what the earlier chapters describe, is a
            different event from capturing a walled, fortified city. Both are recorded as true because both
            happened. The king fell in the field. The city he ruled did not fall with him.
          </p>
          <p>
            <strong>Was Othniel really Caleb&apos;s biological brother, given how much older Caleb already
            was?</strong> What the text says: Joshua 15:17 calls him simply &quot;the brother of Caleb.&quot;
            Judges 1:13 and 3:9 both add the word &quot;younger,&quot; calling him &quot;Caleb&apos;s younger
            brother.&quot; How this is read: most read this plainly, as a much younger son of the same father,
            Kenaz, born well after Caleb. Caleb was 85 in the chapter before this one, so a far younger brother
            marrying Caleb&apos;s own adult daughter is unusual by today&apos;s standards, but Scripture states
            it without comment or apology anywhere it appears.
          </p>
          <p>
            <strong>Why does Caleb offer his own daughter as the prize for taking a city?</strong> What the text
            says: verse 16 states the offer plainly, with no explanation of the custom behind it. How this is
            read: this reflects a recognized ancient practice, where marrying a daughter to a proven, able
            warrior secured both an heir for land and a strong defender for family territory still contested by
            nearby peoples. The text does not treat Achsah as having no say in the matter. Her own bold request
            for springs in the very next verses shows she had standing to ask her father directly, and received
            it.
          </p>
          <p>
            <strong>Why does the chapter list wildly different city counts for each region, 29 in one, only 2 in
            another, with no explanation?</strong> What the text says: each regional subtotal is stated once, in
            the text&apos;s own words, with no commentary on why the numbers vary. How this is read: the size of
            each list most likely reflects how densely settled that stretch of land already was, not any ranking
            of importance. The wilderness region near the salt sea naturally supports far fewer towns than the
            farmland near Edom. The list reads as an administrative record of what Judah received, not a
            judgment on which towns mattered more.
          </p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          📖 Top Verses From Joshua 15
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">1. Joshua 15:13</h3>
        <VerseQuote
          text="And unto Caleb the son of Jephunneh he gave a part among the children of Judah, according to the commandment of the LORD to Joshua, even the city of Arba the father of Anak, which city is Hebron."
          reference="Joshua 15:13"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Hebron finally becomes Caleb&apos;s on paper, inside Judah&apos;s own borders, closing the loop the
          previous chapter opened with a 45 year old promise.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">2. Joshua 15:14</h3>
        <VerseQuote
          text="And Caleb drove thence the three sons of Anak, Sheshai, and Ahiman, and Talmai, the children of Anak."
          reference="Joshua 15:14"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Caleb personally drives out the exact family whose size broke an entire generation&apos;s nerve 45
          years earlier in the wilderness.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">3. Joshua 15:17</h3>
        <VerseQuote
          text="And Othniel the son of Kenaz, the brother of Caleb, took it: and he gave him Achsah his daughter to wife."
          reference="Joshua 15:17"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Othniel marries Achsah after taking Debir, decades before Judges 3 names him the very first judge the
          LORD raises up for Israel.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">4. Joshua 15:19</h3>
        <VerseQuote
          text="Who answered, Give me a blessing; for thou hast given me a south land; give me also springs of water. And he gave her the upper springs, and the nether springs."
          reference="Joshua 15:19"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          Achsah asks her father directly for what her new land actually needs, and receives more than the bare
          word of her own request.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">5. Joshua 15:63</h3>
        <VerseQuote
          text="As for the Jebusites the inhabitants of Jerusalem, the children of Judah could not drive them out: but the Jebusites dwell with the children of Judah at Jerusalem unto this day."
          reference="Joshua 15:63"
        />
        <p className="mt-5 text-lg leading-8 text-slate-700">
          The chapter&apos;s honest ending, admitting the one city Judah never took, centuries before David
          finally claimed it.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">
          ❓ Frequently Asked Questions About Joshua 15
        </h2>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What happened in Joshua 15?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The chapter describes the territory given to the tribe of Judah by lot, traces its border from Edom to
          the sea, records Caleb personally driving out three named Anakim giants and conquering Debir, tells
          how his daughter Achsah married Othniel and asked for springs of water, lists 112 towns across four
          regions, and closes by admitting Judah never drove the Jebusites out of Jerusalem.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How big was the tribe of Judah&apos;s land in Joshua 15?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Adding up every regional total the chapter states for itself gives 112 named towns across four
          regions, the south country, the valley, the hill country, and the wilderness, making Judah the largest
          tribal allotment recorded in the book of Joshua.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Did Caleb actually drive the giants out of Hebron?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Yes. Joshua 15:14 names him personally driving out Sheshai, Ahiman, and Talmai, the three sons of Anak,
          fulfilling what he told Joshua he could still do at 85 years old in the chapter before this one.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Who was Othniel in the Bible?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Othniel was Caleb&apos;s brother, called his younger brother in Judges 1:13. He took the city of Debir,
          married Caleb&apos;s daughter Achsah as the promised reward, and later became the first judge the LORD
          raised up to deliver Israel, told in Judges 3:9 and 10.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why did Caleb offer his daughter in marriage as a reward?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          This reflects an ancient practice of securing a capable warrior for a family through marriage, giving
          both an heir for the land and ongoing protection for territory still surrounded by other peoples.
          Achsah herself is shown having a voice in the chapter, asking her father directly for more.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What did Achsah ask for, and why?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          She asked her father Caleb for springs of water to go with the dry southern land he had already given
          her. Joshua 15:19 says he gave her both the upper springs and the lower springs, more than the single
          request she made.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Why does Joshua 15 end by saying Jerusalem was not conquered?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Verse 63 states plainly that the Jebusites remained in Jerusalem alongside Judah. The city sat inside
          Judah&apos;s own border, named back in verse 8, but it would stay partly in Jebusite hands for
          generations until King David finally took it.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">Does Joshua 15:63 contradict Jerusalem&apos;s king being defeated earlier in Joshua?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          No. Joshua 10 and 12 record the king of Jerusalem defeated in battle alongside four other kings. Joshua
          15:63 records the city itself, behind its walls, still holding out. A king&apos;s defeat in the field
          and a city&apos;s surrender are two different events, and Scripture records both as true.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">What was Kirjathsepher, and why does the text give it another name?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          Kirjathsepher was the earlier name of Debir, the city Othniel conquered to win Achsah. Joshua 15 notes
          the older name the same way it already noted Hebron&apos;s earlier name, Kirjatharba, pointing to a
          real history behind these cities before Israel ever arrived.
        </p>

        <h3 className="mt-8 text-2xl font-black text-slate-950">How many cities are listed as belonging to Judah in this chapter?</h3>
        <p className="mt-4 text-lg leading-8 text-slate-700">
          The chapter states its own regional totals as 29, 14, 16, 9, 11, 9, 10, 6, 2, and 6 towns across four
          regions, adding up to 112 named towns in all, not counting Jerusalem, which the chapter says Judah
          never actually held.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="text-3xl font-black tracking-tight text-slate-950">🔑 Final Thoughts</h2>
        <div className="mt-6 space-y-5 text-lg leading-8 text-slate-700">
          <p>Joshua 15 is a record book, and most record books do not tell you anything about the character of the people being recorded. This one does, three separate times.</p>
          <p>
            📌 <strong>A promise collected decades later still has to actually be fought for.</strong> Caleb did
            not get Hebron and then rest. He drove out three named giants himself at 85, exactly what he said he
            could still do in the chapter before this one.
          </p>
          <p>
            📌 <strong>Boldness runs in families.</strong> Caleb named the hardest ground on the map and asked
            for it directly. His own daughter, a few verses later, got off her donkey and asked her father for
            more than the bare minimum. Neither of them waited to be offered what they needed.
          </p>
          <p>
            📌 <strong>An honest record keeps its failures right next to its victories.</strong> Verse 63 could
            have been left out entirely. Judah&apos;s inheritance would still have looked impressive without it.
            Instead the chapter names exactly what did not get finished, the same way Joshua 13 already did for
            the land east of the Jordan.
          </p>
          <p>You probably are not drawing tribal borders this week. But you likely have one piece of unfinished business sitting right in the middle of something you would rather call complete.</p>
          <p>So here is the one thing this chapter actually asks of you.</p>
          <p>Name it as plainly as this chapter names Jerusalem, instead of letting a long list of real wins cover for the one thing still standing.</p>
        </div>
      </section>
    </BlogPostShell>
  );
}
