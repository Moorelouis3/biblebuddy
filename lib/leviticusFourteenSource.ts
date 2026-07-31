export type LeviticusFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLeviticusFourteenRawNotes(rawText: string): LeviticusFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LeviticusFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Leviticus\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

    if (!verseMatch) {
      index += 1;
      continue;
    }

    const startVerse = Number(verseMatch[1]);
    const endVerse = Number(verseMatch[2] || verseMatch[1]);
    index += 1;

    while (index < lines.length && !lines[index].trim()) index += 1;
    const titleMatch = lines[index]?.trim().match(/^#\s*(.+)$/);
    if (!titleMatch) {
      throw new Error("Missing Leviticus 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Leviticus\s+14:/i.test(lines[index].trim())) {
      const trimmed = lines[index].trim();
      const phraseMatch = trimmed.match(/^##\s+(.+)$/);

      if (!phraseMatch) {
        index += 1;
        continue;
      }

      const phraseHeading = phraseMatch[1].trim();
      index += 1;
      const bodyLines: string[] = [];

      while (
        index < lines.length &&
        !/^##\s+/.test(lines[index].trim()) &&
        !/^#\s+Leviticus\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Leviticus 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Leviticus 14:${startVerse}` : `Leviticus 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 Leviticus 14 sections, received " + sections.length);
  }

  return sections;
}

const LEVITICUS_FOURTEEN_RAW_NOTES = `# Leviticus 14:1-3

# 🕊️ The Law Of The Leper's Cleansing

---

## 📜 This Shall Be The Law Of The Leper In The Day Of His Cleansing

Chapter 13 was about diagnosis - figuring out whether a skin problem was tzaraat (the "leprosy" condition) and declaring someone unclean. Chapter 14 runs the opposite direction: what happens once that person gets better and needs to be declared clean again and let back into the camp. This is a reintegration ceremony, not a treatment.

The healing itself already happened before any of this starts. The priest's job here is verifying that change and guiding the person back into community and worship, step by step.

📜 Chapter 13 diagnosed sickness; chapter 14 restores the healed

🩺 The priest didn't cure anyone here - he confirms and readmits

🏕️ The goal is bringing an exile back into full community life

---

## 🚶 The Priest Shall Go Forth Out Of The Camp

Everywhere else in Leviticus, the worshipper brings an offering to the priest at the tabernacle door. Here the priest leaves the sacred space and walks out to find the unclean man, who is still living outside the camp under chapter 13:46's rule.

🚶 Normally people come to the priest; here the priest goes to him

🏕️ The leper is still living in exile at this point, per chapter 13:46

❤️ A picture of the priest reaching toward someone who can't come in

---

## 🔍 If The Plague Of Leprosy Be Healed In The Leper

This whole chapter only starts once the skin problem itself is already gone. Nothing here is medicine. It's entirely about status - moving someone from "unclean, outside" to "clean, welcomed home."

🔍 This ceremony only starts after the sickness is already over

⚖️ The whole chapter is about status, not treatment

🔄 Physical healing comes first, then ceremonial cleansing follows

# Leviticus 14:4-7

# 🐦 Two Birds, Cedar, Scarlet, And Hyssop

---

## 🐦 Two Birds Alive And Clean

"Clean" here means an allowed species under chapter 11's food laws, likely small wild birds such as sparrows rather than the turtledoves and pigeons used for standard sacrifices. Two birds are required because the ritual needs one to die and one to live - the death and the release both carry meaning.

🐦 A "clean" wild-bird species, not the usual sacrificial doves

🔢 Two birds because the ritual needs both a death and a release

🕊️ A different kind of bird than the pigeons used at the altar

---

## 🪵 Cedar Wood, And Scarlet, And Hyssop

Three items, each worth knowing: cedar wood is tough, long-lasting timber. Scarlet is a strip of wool dyed a deep red. Hyssop is a small bushy plant used like a brush for sprinkling liquid - the very same plant Israel used to apply the Passover lamb's blood to their doorposts in Exodus 12:22, and the one David later begs God for in Psalm 51:7, "purge me with hyssop."

🪵 Cedar wood is durable, long-lasting timber

🧵 Scarlet is a strip of wool dyed deep red

🌿 Hyssop is a bushy herb used as a sprinkling brush

🔗 The same three items reappear at Passover and in Psalm 51

---

## 💧 One Of The Birds Be Killed...Over Running Water

"Running water" means water from a moving source, a stream or spring, not water sitting still in a jar. The dead bird's blood is caught and mixed into that flowing water inside a plain clay bowl.

💧 "Running water" means flowing water, not stagnant water

🏺 Blood and water mix together in a plain clay bowl

🌊 Moving, living water fits the purpose of a cleansing rite

---

## 🩸 Dip Them...In The Blood Of The Bird That Was Killed

The cedar wood, the scarlet thread, and the still-living bird are all bundled together and dipped into the blood-and-water mixture at once. The living bird ends up carrying the dead bird's blood on its wings when it eventually flies free.

🩸 Wood, scarlet, and the live bird are dipped together

🐦 The living bird ends up carrying the dead bird's blood

🔗 One bundled ritual object stands in for the whole sacrifice

---

## 7️⃣ Sprinkle...Seven Times

Seven is the number of completeness running through Leviticus - the same count used for the quarantine days in chapter 13 and the ordination days in chapters 8-9. Sprinkling the man seven times marks this cleansing as fully finished, not partway done.

7️⃣ Seven signals completeness throughout Leviticus

🔁 Same count already used for quarantine and ordination days

✅ Marks the cleansing as fully done, not partway

---

## 🕊️ Let The Living Bird Loose Into The Open Field

The dead bird's blood pays for the cleansing. The living bird, carrying that blood, is set free instead of being kept or killed. This previews the two-goat pattern in chapter 16's Day of Atonement, where one animal is sacrificed and the other carries guilt away into the wilderness.

🕊️ The live bird is released, not kept or killed

🔗 A preview of the two-goat pattern in chapter 16's Day of Atonement

🌄 Pictures guilt being carried away and never brought back

# Leviticus 14:8-9

# 🧼 Washing, Shaving, And Waiting

---

## 👕 Wash His Clothes, And Shave Off All His Hair

Every piece of clothing gets washed, not just some, and every hair on the body is shaved, not just the area near the old mark. This is a total reset, stripping away any last trace of the old unclean condition before the man starts life inside camp again.

👕 Every piece of clothing gets washed, not just some

✂️ All hair on the body is shaved off, a total reset

🔄 Symbolically stripping away every trace of the old condition

---

## 🏕️ Come Into The Camp, And Shall Tarry Abroad Out Of His Tent Seven Days

He's now allowed inside the camp boundary, a real step forward, but not all the way home yet. He still can't rejoin his own household for one more week, the same staged-return pattern used elsewhere in this book, where clean status arrives in steps rather than one instant switch.

🏕️ Allowed inside the camp, but not yet inside his own tent

📅 One more full week before full reintegration

🔁 Clean status here comes in stages, not one instant switch

---

## ✂️ Shave All His Hair Off His Head And His Beard And His Eyebrows

A second complete shave, repeated exactly one week after the first. Naming the eyebrows specifically stands out - it makes clear that literally no hair anywhere on the body is left unshaved before his full return.

✂️ A second full-body shave exactly one week later

👁️ Eyebrows named specifically, leaving nothing unshaved

🔁 Doubling the ritual reinforces how total the change must be

# Leviticus 14:10-14

# 🐑 The Eighth Day Offerings Begin

---

## 8️⃣ On The Eighth Day

One day past a complete seven-day cycle. This exact "eighth day" pattern also marks circumcision in Genesis 17:12 and the finish of priestly ordination in Leviticus 9:1 - a recurring biblical marker for a genuinely new beginning right after a full cycle of preparation is complete.

8️⃣ One day past a full seven-day cycle

🔗 Same pattern used for circumcision and priestly ordination

🌅 A number pattern for a fresh start right after completion

---

## 🐑 Two He Lambs...And One Ewe Lamb...And Three Tenth Deals Of Fine Flour...And One Log Of Oil

A "tenth deal" is a standard dry measure, roughly two quarts, used throughout the tabernacle offerings. A "log" is a small liquid measure, about half a pint, the smallest oil unit named in the Torah. This full set - three animals plus grain plus oil - is genuinely expensive, which matters later when a cheaper version is offered for the poor.

📏 "Tenth deal" is a standard dry measure, about two quarts

🫗 A "log" is a small liquid measure, roughly half a pint

💰 Three animals plus flour plus oil - a costly full offering

---

## 🐑 The Priest Shall Take One He Lamb, And Offer Him For A Trespass Offering

A trespass offering (also called a guilt offering) normally pays for a specific wrong someone owes God or another person. Its use here is notable, since being sick was never a sin. The likeliest reason is that the man's forced isolation cut him off from the worship and offerings he would have owed God during that whole time.

⚖️ Trespass/guilt offerings normally pay for a specific wrong

🤔 Being sick wasn't a sin, yet this offering type still applies

🕊️ Possibly restoring what his isolation kept him from giving

---

## 🚪 Present The Man That Is To Be Made Clean...At The Door Of The Tabernacle Of The Congregation

This is the closest the man has been allowed to approach God's dwelling place since his diagnosis back in chapter 13. He still can't go inside, but standing at the tabernacle's own door is a major, visible step back toward full worship.

🚪 The closest he's been to God's dwelling since his diagnosis

👁️ A visible, public marker of his return

📈 One more stage on the path back to full worship

---

## 🩸 Slay The Lamb In The Place Where He Shall Kill The Sin Offering And The Burnt Offering

This trespass offering is killed in the same holy spot used for the other two main offering types, and the text calls it "most holy," the top tier of sacrificial holiness - a rank it shares with the sin offering and the priestly portion of the grain offering from earlier chapters.

📍 Killed in the same sacred spot as the other main offerings

👑 Called "most holy," the top tier of sacrificial holiness

🔗 Shares that top rank with the sin offering and grain offering

---

## 👂 Upon The Tip Of The Right Ear...The Thumb Of His Right Hand...The Great Toe Of His Right Foot

This exact three-point blood application, ear, thumb, and toe, all on the right side, is identical to how Aaron and his sons were consecrated as priests back in Leviticus 8:23-24. Marking a returning man this same way gives his return the same ritual dignity once reserved for entering priestly service - hearing, doing, and walking, all marked as set apart to God.

👂 The exact ritual once used to ordain Aaron's priests in chapter 8

🖐️ Ear, hand, and foot cover hearing, doing, and walking

🔗 A returning leper receives ritual dignity echoing priestly ordination

# Leviticus 14:15-18

# 🫗 The Oil Mirrors The Blood

---

## 🫗 Pour It Into The Palm Of His Own Left Hand

The priest pours oil into his own hand rather than directly onto the man, then works from there. This personal, hands-on detail appears nowhere else in Leviticus quite this way, underlining how directly the priest is personally involved in this one man's restoration.

🫗 The priest's own hand becomes the container for the oil

🤲 A uniquely hands-on ritual detail not repeated elsewhere

👤 Underlines the priest's direct, personal involvement

---

## 7️⃣ Sprinkle Of The Oil With His Finger Seven Times Before The LORD

The same seven-fold pattern used for the blood sprinkling back in verse 7, now done with oil, and explicitly "before the LORD" rather than onto the man directly. The direction matters here - this particular sprinkling is offered toward God, not applied to the person.

7️⃣ Same seven-count pattern as the earlier blood sprinkling

🙏 This sprinkling is offered toward God, not onto the man

🔁 Oil now does parallel work to what blood did earlier

---

## Upon The Blood Of The Trespass Offering

The oil goes onto the exact same three spots, ear, thumb, and toe, laid directly over where the blood was just applied rather than a new location. Blood deals with guilt; oil, throughout Scripture, marks something as set apart for God's service - the very same oil anoints priests and the tabernacle in Exodus 30. Blood and oil together say this man is both forgiven and dedicated.

🩸 Oil is layered directly over the blood, same three spots

🫒 Oil marks something as set apart for God, same as anointing oil

✝️ Together, blood plus oil say both forgiven and dedicated

---

## The Remnant Of The Oil...He Shall Pour Upon The Head Of Him That Is To Be Cleansed

Whatever oil remains in the priest's hand after the ear, thumb, and toe get poured entirely onto the man's head, echoing how the high priest himself was anointed back in Leviticus 8:12. Nothing is saved back - the whole log of oil is used up on this one person.

💧 Leftover oil goes entirely onto his head, none saved back

👑 Echoes how the high priest himself was anointed in chapter 8

🎁 The whole portion of oil is used up on this one man

---

## The Priest Shall Make An Atonement For Him Before The LORD

"Atonement" translates the Hebrew kaphar, meaning to cover over or make right so a relationship with God can continue undamaged. This phrase repeats at the end of nearly every step in this chapter (verses 18, 19, 20, 21, 29, and 31), tying every part of the skin-disease law back to a restored relationship with God, not just restored health.

📖 "Atonement" (kaphar) means covering over or making right

🔁 This exact phrase repeats through nearly the whole chapter

❤️ Ties skin healing to a restored relationship with God

# Leviticus 14:19-20

# 🔥 Sin Offering, Burnt Offering, And Full Cleanness

---

## 🔥 The Priest Shall Offer The Sin Offering...And Afterward He Shall Kill The Burnt Offering

Order matters here. The sin offering, which deals with the specific uncleanness, always comes before the burnt offering, which represents full surrender and dedication to God. The debt gets settled before the gift is given.

🔢 Sin offering always goes first, burnt offering second

⚖️ Debt is cleared before the gift of full dedication is given

🔗 The same order pattern runs through Leviticus's rituals

---

## The Priest Shall Offer The Burnt Offering And The Meat Offering Upon The Altar

By this point, one single ceremony has involved four separate offerings - trespass, sin, burnt, and grain ("meat") - on top of the bird ritual outside camp at the very start. No other purification law in Leviticus stacks this many offering types into one ceremony, showing how seriously this particular return to community is treated.

🔢 Four separate offerings in all, plus the earlier bird ritual

📚 No other Leviticus purification law stacks this many

🏕️ Reflects how seriously this specific return is treated

---

## And He Shall Be Clean

This exact declaration is the payoff the whole chapter has been building toward since verse 1's opening promise, "the law of the leper in the day of his cleansing." Everything from the two birds outside camp to this final offering leads to this one sentence.

✅ The payoff promised back in verse 1

🔄 A full return from complete exile to complete belonging

📜 Marks the formal, legal end of his uncleanness

# Leviticus 14:21-24

# 💰 If He Be Poor

---

## 💰 If He Be Poor, And Cannot Get So Much

Leviticus builds in an economic safety valve so poverty never blocks anyone from full cleansing. This exact sliding-scale idea already appeared in chapter 5:7-11's sin offering law, and it shows up again here for the same reason - forgiveness and restoration were never meant to be priced out of reach.

💰 A built-in safety valve so poverty can't block cleansing

🔁 Same sliding-scale idea already used in chapter 5:7-11

❤️ Restoration was never meant to be priced out of reach

---

## One Lamb For A Trespass Offering To Be Waved, To Make An Atonement For Him

Notice what stays the same even in the poor man's version: the trespass-offering lamb is never reduced or swapped for a bird. Every other item in the ceremony can be substituted for something cheaper, but this one offering stays fixed, showing it carried a weight that couldn't be lowered no matter someone's income.

🐑 The trespass-offering lamb stays fixed, never substituted

💸 Every other item in the ceremony can be made cheaper

⚖️ This one offering's weight didn't scale down with income

---

## One Tenth Deal Of Fine Flour...And A Log Of Oil

The flour drops from three-tenths deal in verse 10 down to just one-tenth, a two-thirds cut, but the log of oil stays exactly the same amount either way. The reduction targets the genuinely expensive items while leaving the cheaper ones untouched.

📉 Flour drops from three-tenths deal down to just one-tenth

🫗 The oil amount stays exactly the same either way

💡 Cuts fall on the costliest items, not evenly across the board

---

## Two Turtledoves, Or Two Young Pigeons, Such As He Is Able To Get

This swaps the two costly lambs used in the full sin-and-burnt offering (verse 10) for birds, the same substitution already used for the poorest worshippers in chapter 5:7 and for a new mother who couldn't afford a lamb in chapter 12:8. "Such as he is able to get" is the law stating outright that it bends to real financial hardship.

🕊️ Birds replace the two costly lambs from the full version

🔁 Same substitution used in chapter 5:7 and chapter 12:8

📜 The law states outright that it bends to real hardship

# Leviticus 14:25-32

# 🔁 The Same Ritual, Scaled Down

---

## 🔁 The Priest Shall Take Some Of The Blood Of The Trespass Offering, And Put It Upon The Tip Of The Right Ear

This repeats the exact ear, thumb, and toe blood ritual from verse 14, word for word, using the cheaper lamb. The ceremony's meaning doesn't shrink even though the offering's cost does - a poor person's cleansing carries the exact same ritual weight as a wealthy person's.

🔁 Word-for-word repeat of the blood ritual from verse 14

⚖️ The ceremony's meaning doesn't shrink with the offering's cost

❤️ A poor person's cleansing carries equal ritual weight

---

## The Priest Shall Sprinkle With His Right Finger Some Of The Oil...Seven Times Before The LORD

Again identical to verses 16-18's oil ritual - poured into the palm, sprinkled seven times toward God, then applied over the same blood spots. The text simply repeats the full procedure rather than shortening it for the poor version, treating full ritual detail as owed regardless of income.

🔁 An identical repeat of the full oil ritual from verses 16-18

📜 Nothing about the procedure itself is shortened for the poor

❤️ Full ritual detail is owed regardless of income

---

## The Rest Of The Oil That Is In The Priest's Hand He Shall Put Upon The Head...To Make An Atonement For Him Before The LORD

The same remnant-on-the-head act from verse 18, closing this stage of the poor man's ceremony with the identical wording used for the wealthy version. "Before the LORD" keeps showing up through this whole chapter, a reminder that every one of these steps happens directly in God's presence, not as private paperwork a priest quietly files away.

👑 The same remnant-on-the-head act used in verse 18

🙏 "Before the LORD" marks every step as happening in God's presence

🔁 Identical closing wording to the wealthy version

---

## 🕊️ He Shall Offer The One Of The Turtledoves, Or Of The Young Pigeons, Such As He Can Get

These are the same two birds listed back in verse 22 as part of the flour-and-oil provisions, only now actually killed and offered, after the fixed trespass lamb and its blood-and-oil ritual are finished. Guilt is dealt with first, then the sin and burnt offerings follow.

🕊️ The same birds named back in verse 22, now actually offered

🔢 The fixed trespass lamb and its ritual come first

📖 Guilt is settled before the sin and burnt offerings follow

---

## The One For A Sin Offering, And The Other For A Burnt Offering, With The Meat Offering

The poor man ends up completing the exact same offering categories as the wealthy version - trespass, sin, burnt, and grain - four types either way. Only the price of the animals changed. The required structure never did.

🔢 Same four offering categories as the wealthy version

💸 Only the price of the animals changed

📜 The required structure never scales down

---

## This Is The Law Of Him In Whom Is The Plague Of Leprosy, Whose Hand Is Not Able To Get

This closing line is a standard Leviticus formula, "this is the law of...", used elsewhere to mark the end of a legal section (compare 13:59 and 11:46). Giving the poor man's path its own formally named "law," rather than treating it as a footnote or shortcut, tells the reader it was fully legitimate and equally valid.

📜 A standard closing formula also used at 13:59 and 11:46

⚖️ Given its own formal name, not treated as a lesser shortcut

❤️ Marks the poor man's path as fully legitimate and equally valid

---

## 💰 Same Four Offerings, A Fraction Of The Cost

Add it up: the fixed trespass lamb, sin-offering bird instead of a lamb, burnt-offering bird instead of a lamb, and one-tenth deal of flour instead of three-tenths. The dollar cost drops sharply, yet the atonement declared complete uses identical wording to the rich man's version back in verse 20.

💰 The total cost drops sharply across nearly every item

📜 The atonement declaration uses identical wording either way

⚖️ Cost changes; the outcome in God's eyes doesn't

# Leviticus 14:33-36

# 🏠 Leprosy In A House

---

## 🏠 When Ye Be Come Into The Land Of Canaan...And I Put The Plague Of Leprosy In A House

This law is written ahead of time, for a future that hasn't happened yet - Israel is still in the wilderness with no permanent houses at all. Leviticus is planning for Israel's settled future long before the nation actually arrives there. Also worth noticing: the text says God "puts" this plague in a house, not that it's blind chance.

🏠 Written for future settled life, before Israel even has houses

🗓️ Planning ahead for a future Israel hasn't reached yet

🤔 The text says God "puts" this plague, not random chance

---

## He That Owneth The House Shall Come And Tell The Priest, Saying, It Seemeth To Me There Is As It Were A Plague

The homeowner reports the issue himself, in careful, hedged language, "it seemeth to me... as it were," rather than making the call himself. Just like chapter 13's skin laws, an ordinary person never gets to declare something clean or unclean - that authority belongs to the priest alone, even over someone's own property.

🗣️ The homeowner reports it himself, in careful hedged language

⚖️ He doesn't diagnose it - only the priest can make that call

🏠 The same rule of priestly authority applied to private property

---

## The Priest Shall Command That They Empty The House...That All That Is In The House Be Not Made Unclean

If the priest declared the house unclean before it was emptied, everything inside, furniture, dishes, clothing, food, would become unclean by contact and have to be destroyed along with it. Emptying the house first, before any official ruling, protects the family's belongings from an automatic total loss.

📦 Emptying happens before any official ruling is made

💰 Protects belongings from an automatic total loss

🧠 A genuinely practical provision, not just ritual formality

---

## Afterward The Priest Shall Go In To See The House

Just like chapter 13's skin exams, the priest inspects the house directly rather than relying on secondhand description. This same direct, physical-inspection standard runs through both this chapter's laws, whether the subject is a person or a building.

👁️ The priest inspects the house directly, not by description

🔗 Same direct-inspection standard used for skin conditions

🏠 Consistent method whether the subject is a person or property

# Leviticus 14:37-42

# 🧱 Diagnosing And Treating The House

---

## Hollow Strakes, Greenish Or Reddish, Which In Sight Are Lower Than The Wall

"Strakes" means streaks or marks. The two diagnostic signs used for a house exactly parallel the two used for skin in chapter 13: unusual color (greenish or reddish) and depth (sitting visibly lower than the surrounding wall, like a mark sitting deeper than the skin around it).

🎨 Greenish or reddish color is warning sign number one

📏 Sitting lower than the wall is warning sign number two

🔗 The exact same two-sign method used for skin in chapter 13

---

## The Priest Shall Go Out Of The House To The Door Of The House

Before ruling on an uncertain mark, the priest steps back to the doorway rather than staying inside. It's the same instinct behind verse 3's "priest shall go forth out of the camp" - assessing from a safe boundary point while the diagnosis is still undecided.

🚪 The priest steps back to the doorway before ruling

🔗 Same instinct as verse 3's priest stepping outside the camp

⚠️ A cautious boundary kept during an uncertain diagnosis

---

## Shut Up The House Seven Days

The same seven-day waiting period used throughout chapter 13's skin exams, now applied to a building instead of a body. Nobody rushes the verdict; time is given to see whether the mark spreads or holds still.

📅 The same seven-day waiting period used in chapter 13

⏳ Time reveals whether the mark spreads or holds still

🏠 Applied to buildings using the identical method used for skin

---

## Take Away The Stones In Which The Plague Is, And They Shall Cast Them Into An Unclean Place Without The City

If the mold has spread after the wait, only the specific affected stones are removed at first, not the whole house. They're carried entirely outside the city to a designated unclean dumping area, kept far from anything the community would touch.

🧱 Only the specific affected stones are removed first

🚮 Carried entirely outside the city, not just outside the house

📍 Dumped in a designated unclean area, away from daily life

---

## Cause The House To Be Scraped Within Round About

After the bad stones come out, the whole interior surface gets scraped down, and that scraped-off dust is treated exactly like the stones were - hauled outside the city to the same unclean dumping place. Nothing potentially contaminated is allowed to stay inside town.

🧹 The whole interior surface gets scraped, not just the bad spot

♻️ The scraped dust goes to the same unclean dumping place

🏙️ Nothing potentially contaminated is allowed to stay in town

---

## Take Other Stones, And Put Them In The Place Of Those Stones...Take Other Morter, And Shall Plaister The House

"Morter" is mortar, the material binding stones together, and "plaister" is plaster, a smooth protective coating - both older spellings of familiar words. This is a genuine repair project: new stones go in, the wall gets replastered, and the house gets a real chance to be resolved rather than automatically condemned.

🧱 "Morter" is mortar, the material binding stones together

🎨 "Plaister" is plaster, a protective coating spelling

🔨 A genuine repair, not an automatic condemnation

# Leviticus 14:43-47

# 💥 If The Plague Returns

---

## If The Plague Come Again, And Break Out In The House

Even after a full repair, new stones and fresh plaster, the house gets one more real chance, since the mold can still return. This isn't a rigged outcome built into the law - it's a genuine possible result of honest repair not being enough.

🔁 A full repair still gets a genuine second chance to succeed

🏠 Recurrence is a real possible outcome, not a guaranteed one

⚖️ The law isn't rigged to condemn the house no matter what

---

## It Is A Fretting Leprosy In The House

"Fretting" means eating away at or steadily corroding, the same word used back in chapter 13:51-52 for the worst cases of garment mold. Calling it "fretting" marks this as the worst-case category - the mold has proven persistent and destructive, not just a one-time surface stain.

🦠 "Fretting" means eating away at or steadily corroding

🔗 The same word used for the worst garment-mold cases in ch13

📉 Marks this as the persistent, destructive worst case

---

## He Shall Break Down The House, The Stones Of It, And The Timber Thereof, And All The Morter Of The House

Total demolition, not another round of stone-swapping - stones, wooden beams, and mortar all removed and carried entirely outside the city. Losing an entire house was a severe financial and personal loss in this culture, so the law reserves it as a last resort, only after two real chances to fix the problem.

🔨 Full demolition, not another round of stone-swapping

💸 Losing an entire house was a severe financial loss

⚖️ Reserved as a true last resort, after two real chances to repair

---

## He That Goeth Into The House All The While That It Is Shut Up Shall Be Unclean Until The Even

Anyone entering the quarantined house during its shut-up period picks up a mild uncleanness lasting only until evening, the standard length for minor uncleanness throughout Leviticus, not the extended isolation a diagnosed leper faced in chapter 13. Entering a house under investigation is a far smaller ritual risk than actually having the disease.

🌆 Uncleanness lasts only until evening, the standard minor length

⚖️ A far lighter consequence than a diagnosed leper's isolation

🏠 Entering a house under investigation is a small ritual risk

---

## He That Lieth In The House Shall Wash His Clothes; And He That Eateth In The House Shall Wash His Clothes

Two specific, everyday activities, sleeping there and eating there, are named separately, both requiring the same simple response of washing clothes. The law doesn't leave the reader to guess whether ordinary at-home activities count - it spells out the common cases directly.

🛏️ Sleeping in the house named as one specific case

🍽️ Eating in the house named as a separate specific case

👕 Both require the same simple response: wash the clothes

# Leviticus 14:48-53

# 🕊️ Cleansing A Healed House

---

## The Priest Shall Pronounce The House Clean, Because The Plague Is Healed

Notice the same word used for the leper's healing back in verse 3, "healed," is applied here to a building. The text treats a house's restoration with the same seriousness and vocabulary as a person's healing, not as a lesser, merely practical matter.

🏠 Same "healed" language used for the leper back in verse 3

📜 The house's restoration is treated with real seriousness

🔗 Same vocabulary bridges a person's healing and a building's

---

## He Shall Take To Cleanse The House Two Birds, And Cedar Wood, And Scarlet, And Hyssop

This is the exact same four-item kit used for a person's cleansing back in verses 4-7, two birds, cedar wood, scarlet, and hyssop, applied now to a building instead of a body. The whole property, not only the people living there, needed restoring to God.

🔁 The identical four-item kit used for a person in verses 4-7

🏠 A building receives the same ceremony as a healed person

🙏 The whole property, not only the people, needed restoring

---

## Kill The One Of The Birds In An Earthen Vessel Over Running Water

This duplicates verse 5's process for the person's cleansing exactly, same earthen vessel, same running water. It's a full parallel ceremony for the house, not a shortened version.

🩸 Duplicates verse 5's process for the person's cleansing

🏺 Same earthen vessel and running water combination

📜 A full parallel ceremony, not a shortened version for property

---

## Sprinkle The House Seven Times

The same seven-fold sprinkling pattern used on the person in verse 7 and on the oil ritual in verse 16, now applied to a physical structure. Every version of this cleansing across the chapter, whether for skin, oil, or a house, lands on the same number of completion.

🔁 Same seven-fold pattern used for the person and the oil

🏠 Now applied to walls instead of skin

✅ Every version of this ceremony lands on the same completion number

---

## Let Go The Living Bird Out Of The City Into The Open Fields

The exact same release act from verse 7, just moved from "the open field" outside the wilderness camp to "outside the city," matching the shift from tent-camp language, used for the person, to settled land-and-city language, used once Israel actually has houses in Canaan.

🕊️ The same bird-release act as verse 7's cleansing

🏙️ Wording shifts from "camp" to "city," matching settled life

🔗 One ceremony, adapted in language for two different eras

---

## Make An Atonement For The House: And It Shall Be Clean

Scripture applies "atonement," a term normally reserved for a person's relationship with God, to a building here. It's a reminder that in this worldview, nothing, not even property, sits outside the reach of being made right with God, and it closes with the same "clean" declaration used for the healed person.

🏠 "Atonement," a term usually for people, applied to a building

❤️ Nothing, not even property, sits outside being made right with God

✅ Closes with the same "clean" declaration used for the person

# Leviticus 14:54-57

# 📖 The Whole Law Of Leprosy, Closed

---

## This Is The Law For All Manner Of Plague Of Leprosy, And Scall

"Scall" is the scalp-and-beard condition from chapter 13:30-37, where thin yellow hair, not white hair, was the warning sign. This closing list works like a table of contents, naming each specific case that chapters 13 and 14 have just covered.

📖 "Scall" is the scalp/beard condition from chapter 13:30-37

📋 This list works like a table of contents for both chapters

🔗 Ties the closing summary back to a specific earlier case

---

## And For The Leprosy Of A Garment, And Of A House

Stepping back, one single Hebrew concept, tzaraat, has now been applied across three completely different subjects: human skin, woven fabric, and building material. English splits this into different words like mold, mildew, and disease. The Hebrew text treats all three as variations of one underlying problem.

🧵 The same Hebrew word covers skin, garment mold, and house mold

🌐 English splits this into different words; Hebrew treats it as one

📚 Two whole chapters build outward from a single unifying idea

---

## For A Rising, And For A Scab, And For A Bright Spot

This exact three-item list is a direct callback to chapter 13:2, the opening verse of the whole section. Ending on the same three words it opened with is a deliberate literary bookend, signaling that the entire two-chapter law is now formally closed.

🔁 A direct callback to chapter 13:2's opening words

📚 Ending on the same three terms it started with

✅ A deliberate bookend marking the whole law as formally closed

---

## To Teach When It Is Unclean, And When It Is Clean: This Is The Law Of Leprosy

The stated purpose of this entire two-chapter law, in its own words, was never punishment. It was teaching - giving Israel a clear, consistent, learnable way to tell clean from unclean. That's the exact instructional purpose Aaron himself was charged with all the way back in chapter 10:10-11.

📖 The stated purpose is teaching, not punishment

🎯 A clear, consistent, learnable way to tell clean from unclean

🔗 The same purpose given to Aaron back in chapter 10:10-11
`;

export const LEVITICUS_FOURTEEN_PERSONAL_SECTIONS = parseLeviticusFourteenRawNotes(LEVITICUS_FOURTEEN_RAW_NOTES);
