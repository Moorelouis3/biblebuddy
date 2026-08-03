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

Chapter thirteen was about figuring out if a skin problem was tzaraat, the disease behind the word leprosy.

Chapter fourteen begins only once that person has already gotten better.

This is not a treatment chapter.

It is about bringing a healed person back into the camp.

The priest is not curing anyone here.

He is confirming a change that already happened.

📜 Chapter thirteen diagnosed sickness

🩺 Chapter fourteen restores the healed

🏕️ The priest confirms, not cures

📖 Healing comes first, ceremony follows

## 🚶 The Priest Shall Go Forth Out Of The Camp

Everywhere else in Leviticus, the worshipper comes to the priest at the tabernacle door.

Here the priest leaves the sacred space instead.

He walks out to find the man who is still living outside the camp.

That rule came from chapter thirteen, verse forty six.

🚶 The worshipper usually comes to him

🏕️ Here the priest goes to him

📜 The exile rule is from chapter thirteen

➡️ The priest seeks out the unclean man

## 🔍 If The Plague Of Leprosy Be Healed In The Leper

This whole chapter only starts once the skin disease is already gone.

Nothing here is medicine.

It is entirely about status.

The man moves from unclean and outside to clean and welcomed home.

🔍 Ceremony starts after sickness ends

⚖️ This chapter is about status

🔄 Healing always comes before ceremony

📖 Standing before God is restored

# Leviticus 14:4-7
# 🐦 Two Birds, Cedar, Scarlet, And Hyssop
---
## 🐦 Two Birds Alive And Clean

"Clean" here means an allowed species under chapter eleven's food laws.

These were likely small wild birds such as sparrows, not the doves normally used for sacrifice.

Two birds are required because the ritual needs one to die and one to live.

The death and the release each carry their own meaning.

🐦 Clean means an allowed species

🕊️ Likely small wild birds

🔢 One bird dies, one lives

📖 Each bird carries its own meaning

## 🪵 Cedar Wood, And Scarlet, And Hyssop

Cedar wood is tough, long lasting timber.

Scarlet is a strip of wool dyed a deep red.

Hyssop is a small bushy plant used like a brush for sprinkling liquid.

The same three items were used to spread the Passover lamb's blood on the doorposts in Exodus twelve.

David later begs God to be cleansed with hyssop in Psalm fifty one.

🪵 Cedar wood is durable timber

🧵 Scarlet is deep red dyed wool

🌿 Hyssop is a sprinkling brush plant

📖 These three reappear at Passover

## 💧 Killed In An Earthen Vessel Over Running Water

"Running water" means water from a moving source, a stream or a spring.

It does not mean water sitting still in a jar.

The bird's blood is caught and mixed into that flowing water.

The mixing happens inside a plain clay bowl, not a fine vessel.

💧 Running water means flowing water

🏺 Blood mixes into a clay bowl

🌊 Moving water fits this cleansing

➡️ Nothing fine or costly is used

## 🩸 Dip Them And The Living Bird In The Blood

The cedar wood, the scarlet thread, and the still living bird are bundled together.

That bundle is dipped into the blood and water mixture all at once.

The living bird ends up carrying the dead bird's blood on its wings.

One bundled object stands in for the whole sacrifice.

🩸 Wood, scarlet, and the bird dip together

🐦 The living bird carries the blood

🔗 One bundle stands for the sacrifice

➡️ The bird carries the bundle's blood

## 🔁 Sprinkle Upon Him Seven Times

Seven is the number of completeness that runs through Leviticus.

The same count marked the quarantine days back in chapter thirteen.

It also marked the ordination days for the priests in chapters eight and nine.

Sprinkling the man seven times marks this cleansing as fully finished.

🔁 Seven means completeness in Leviticus

📅 The same count marked quarantine

👑 The same count marked ordination

➡️ Seven means the cleansing is finished

## 🕊️ Let The Living Bird Loose Into The Open Field

The dead bird's blood pays for the cleansing.

The living bird, carrying that blood, is set free instead of being kept.

This previews the two goat pattern in chapter sixteen's Day of Atonement.

One animal is sacrificed there, the other carries guilt away into the wilderness.

🕊️ The live bird is released

🐐 It previews chapter sixteen's two goats

🌄 One dies, the other carries guilt away

📖 Guilt is carried away for good

# Leviticus 14:8-9
# 🧼 Washing, Shaving, And Waiting
---
## 👕 Wash His Clothes, And Shave Off All His Hair

Every piece of clothing gets washed, not only some of it.

Every hair on the body gets shaved, not only the area near the old mark.

This is a total reset.

It strips away any last trace of the old unclean condition.

👕 Every garment gets washed

✂️ Every hair gets shaved

🔄 This is a total reset

📖 The old condition is erased

## 🏕️ Come Into The Camp, And Tarry Abroad Out Of His Tent Seven Days

He is now allowed inside the camp boundary.

That is real progress, but it is not all the way home yet.

He still cannot rejoin his own household for one more week.

Clean status here arrives in stages, not in one instant switch.

🏕️ Allowed inside camp, not his tent

📅 One more week before full return

🔁 Clean status arrives in stages

➡️ Restoration here takes real time

## ✂️ Shave All His Hair Off His Head And His Beard And His Eyebrows

This is a second complete shave, done exactly one week after the first.

Naming the eyebrows on their own stands out.

It makes clear that no hair anywhere on the body is left unshaved.

Doubling the ritual shows how total this change has to be.

✂️ A second shave, one week later

👁️ Eyebrows are named on their own

🔍 No hair anywhere is left unshaved

📖 The change must be total

# Leviticus 14:10-14
# 🐑 The Eighth Day Offerings Begin
---
## 🌅 On The Eighth Day

This is one day past a complete seven day cycle.

The same eighth day pattern marks circumcision back in Genesis seventeen.

It also marks the finish of the priests' ordination in chapter nine.

An eighth day in this book usually signals a genuinely new beginning.

🌅 One day past a full week

👶 Circumcision used this same pattern

👑 Ordination also used this pattern

📖 An eighth day signals a fresh start

## 🐑 Two He Lambs, And One Ewe Lamb

He lambs are male, an ewe lamb is female.

Three animals are required, two male and one female.

Alongside them come three tenth deals of fine flour and one log of oil.

A tenth deal is a standard dry measure, close to two quarts.

A log is a small liquid measure, close to half a pint.

🐑 Two male lambs, one female lamb

📏 A tenth deal is near two quarts

🫗 A log is near half a pint

📖 Three animals plus flour is costly

## ⚖️ Offer Him For A Trespass Offering

A trespass offering, also called a guilt offering, normally pays for a specific wrong.

Being sick was never a sin.

So its use here stands out.

The likeliest reason is that his isolation kept him from the worship he owed God during that time.

⚖️ Trespass offerings pay for a wrong

🤔 Being sick was never a sin

🕊️ Isolation kept him from worship

📖 The offering restores what he missed

## 🚪 Present The Man At The Door Of The Tabernacle Of The Congregation

This is the closest he has been allowed to approach God's dwelling place since chapter thirteen.

He still cannot go inside.

Standing at the tabernacle's own door is still a major, visible step.

It marks a public return toward full worship.

🚪 The closest he has come since diagnosis

👁️ He still cannot go inside

📈 A visible step toward full worship

➡️ His return is public, not private

## 👂 Upon The Tip Of The Right Ear, And Upon The Thumb Of His Right Hand, And Upon The Great Toe Of His Right Foot

Blood is applied to three points, the right ear, the right thumb, and the right great toe.

This exact three point pattern already marked Aaron and his sons as priests back in chapter eight.

Ear, hand, and foot cover hearing, doing, and walking.

Marking a returning man this same way gives him a dignity once reserved for priests.

👂 Three points, ear, thumb, and toe

👑 The same pattern ordained Aaron's sons

🖐️ Hearing, doing, and walking are covered

📖 A returning man receives priestly dignity

# Leviticus 14:15-18
# 🫗 The Oil Mirrors The Blood
---
## 🫗 Pour It Into The Palm Of His Own Left Hand

The priest pours the oil into his own hand rather than directly onto the man.

He then works from there.

This personal, hands on detail appears nowhere else in Leviticus in this way.

It underlines how directly the priest is involved in this one man's return.

🫗 The priest's hand becomes the container

🤲 A detail unique to this ritual

👤 It shows his personal involvement

➡️ This man gets the priest's full attention

## 🔁 Sprinkle Of The Oil With His Finger Seven Times Before The LORD

This is the same seven fold pattern already used for the blood back in verse seven.

Now it is done with oil instead.

The phrase before the LORD matters here.

This particular sprinkling is offered toward God, not applied onto the man himself.

🔁 The same seven fold pattern returns

🙏 This faces God, not the man

💧 Oil now parallels what blood did

📖 This act faces God directly

## 🩸 Upon The Blood Of The Trespass Offering

The oil goes onto the exact same three spots as the blood did.

It is laid directly over where the blood was just applied.

Blood deals with guilt.

Oil throughout scripture marks something as set apart for God's service, the same oil that anointed priests in Exodus thirty.

Blood and oil together say this man is both forgiven and dedicated.

🩸 Oil covers the same three spots

🫒 Oil marks something set apart for God

✝️ Blood forgives, oil dedicates

📖 He is both forgiven and dedicated

## 💧 He Shall Pour Upon The Head Of Him That Is To Be Cleansed

Whatever oil is left in the priest's hand after the three points goes entirely onto the man's head.

This echoes how the high priest himself was anointed back in chapter eight.

Nothing is saved back.

The whole log of oil gets used up on this one person.

💧 Leftover oil goes onto his head

👑 It echoes the high priest's anointing

🎁 Nothing from the oil is saved

➡️ The whole portion is spent on him

## 📖 The Priest Shall Make An Atonement For Him Before The LORD

"Atonement" translates a Hebrew word meaning to cover over or make right.

It describes repairing a relationship with God so it can continue undamaged.

This exact phrase repeats at the end of nearly every step in this chapter.

It ties every part of this law back to a restored relationship with God, not only restored health.

📖 Atonement means covering over or fixing

🔁 This phrase repeats through the chapter

❤️ It ties healing to a restored bond

➡️ The relationship mattered more than health

# Leviticus 14:19-20
# 🔥 Sin Offering, Burnt Offering, And Full Cleanness
---
## 🔢 The Priest Shall Offer The Sin Offering, And Afterward The Burnt Offering

Order matters here.

The sin offering deals with the specific uncleanness.

It always comes before the burnt offering, which represents full surrender to God.

The debt gets settled before the gift is given.

🔢 Sin offering first, burnt offering second

⚖️ The debt is cleared before the gift

🔗 This order runs through Leviticus

📖 Forgiveness comes before full dedication

## 🔥 Offer The Burnt Offering And The Meat Offering Upon The Altar

By this point one ceremony has involved four separate offerings.

Trespass, sin, burnt, and grain, on top of the bird ritual outside the camp at the very start.

No other purification law in Leviticus stacks this many offering types into one ceremony.

That says something about how seriously this particular return is treated.

🔢 Four offerings, plus the bird ritual

📚 No other law stacks this many

🏕️ This return is treated with care

➡️ The ceremony matches the size of loss

## ✅ And He Shall Be Clean

This declaration is the payoff the whole chapter has been building toward.

Verse one already promised the law of the leper in the day of his cleansing.

Everything from the two birds outside the camp to this final offering leads to this one sentence.

It marks the formal end of his uncleanness.

✅ The payoff promised in verse one

🔄 A full return from exile to home

📜 It marks the end of uncleanness

📖 One sentence closes many steps

# Leviticus 14:21-24
# 💰 If He Be Poor
---
## 💰 If He Be Poor, And Cannot Get So Much

Leviticus builds in an economic allowance so poverty never blocks anyone from full cleansing.

This same sliding scale already appeared in chapter five's sin offering law.

It shows up again here for the same reason.

Forgiveness and restoration were never meant to be out of reach because of money.

💰 Poverty cannot block full cleansing

🔁 The same scale used in chapter five

❤️ Restoration was never priced out of reach

📖 God's law made room for the poor

## 🐑 One Lamb For A Trespass Offering, To Make An Atonement For Him

Notice what stays the same even in the poor man's version.

The trespass offering lamb is never reduced or swapped for a bird.

Every other item in the ceremony can be substituted for something cheaper.

This one offering stays fixed, carrying a weight that never lowers no matter someone's income.

🐑 The trespass lamb is never swapped

💸 Every other item can be cheaper

⚖️ This offering's weight never scales down

➡️ Some things here never get discounted

## 📉 One Tenth Deal Of Fine Flour, And A Log Of Oil

The flour drops from three tenth deals in verse ten down to just one.

That is a two thirds cut.

The log of oil stays exactly the same amount either way.

The reduction targets the genuinely expensive items while leaving the cheaper ones untouched.

📉 Flour drops from three tenths to one

🫗 The oil amount stays the same

💡 Cuts fall on the costliest items

📖 Mercy here is precise, not vague

## 🕊️ Two Turtledoves, Or Two Young Pigeons, Such As He Is Able To Get

This swaps the two costly lambs used in the full offering for birds.

The same substitution was already used for the poorest worshippers in chapter five.

It was also used for a new mother who could not afford a lamb in chapter twelve.

"Such as he is able to get" states outright that the law bends to real hardship.

🕊️ Birds replace the two costly lambs

🔁 Used in chapters five and twelve

📜 The law states it bends to hardship

📖 God leaves a door open for the poor

# Leviticus 14:25-32
# 🔁 The Same Ritual, Scaled Down
---
## 🔁 He Shall Kill The Lamb Of The Trespass Offering

This repeats the exact ear, thumb, and toe blood ritual from verse fourteen.

The only change is that this version uses the cheaper lamb allowed for the poor.

The ceremony's meaning does not shrink even though the offering's cost does.

A poor person's cleansing carries the same ritual weight as a wealthy person's.

🔁 A repeat of the ear and toe ritual

💸 Only the offering's cost changes

⚖️ The ceremony's meaning does not shrink

📖 A poor man's cleansing carries equal weight

## 🔁 Sprinkle With His Right Finger Some Of The Oil Seven Times Before The LORD

This is identical to the oil ritual already described in verses sixteen through eighteen.

Poured into the palm, sprinkled seven times toward God, then applied over the same blood spots.

The text repeats the full procedure rather than shortening it for the poor version.

Full ritual detail is owed to every person regardless of income.

🔁 An identical repeat of the oil ritual

📜 The procedure is never shortened

❤️ Full detail is owed to everyone

➡️ No part of this gets cheaper

## 🕊️ Offer The One Of The Turtledoves, Or Of The Young Pigeons, Such As He Can Get

These are the same two birds listed back in verse twenty two.

Now they are actually killed and offered.

This happens only after the fixed trespass lamb and its blood and oil ritual are finished.

Guilt is dealt with first, then the sin and burnt offerings follow.

🕊️ The same birds named in verse twenty two

🔢 The fixed lamb ritual comes first

📖 Guilt is settled before the rest

➡️ Order still matters in the cheaper version

## 📜 This Is The Law Of Him In Whom Is The Plague Of Leprosy

This closing line is a standard Leviticus formula, "this is the law of."

The same formula marks the end of a legal section elsewhere in chapters eleven and thirteen.

Giving the poor man's path its own formally named law matters.

It tells the reader this path was fully legitimate, not a lesser shortcut.

📜 A standard closing formula in Leviticus

⚖️ The poor man's path gets its own name

❤️ This path was legitimate, not a shortcut

📖 Mercy here is fully lawful

# Leviticus 14:33-36
# 🏠 Leprosy In A House
---
## 🏠 When Ye Be Come Into The Land Of Canaan

This law is written for a future that has not happened yet.

Israel is still in the wilderness with no permanent houses at all.

Leviticus is planning ahead for Israel's settled future long before the nation arrives there.

The text also says God puts this plague in a house, not that it is blind chance.

🏠 Written for a future Israel has not reached

🗓️ Leviticus plans ahead for settled life

🤔 God puts the plague there, not chance

📖 Even mold sits under God's hand

## 🗣️ He That Owneth The House Shall Come And Tell The Priest

The homeowner reports the issue himself, using careful, hedged language.

"It seemeth to me, there is as it were a plague," he says.

He does not diagnose it himself.

Just like chapter thirteen's skin laws, only the priest can declare something clean or unclean, even on someone's own property.

🗣️ The homeowner reports it in hedged language

⚖️ Only the priest can diagnose it

🏠 Priestly authority reaches private property

➡️ Nobody rules on their own case

## 📦 The Priest Shall Command That They Empty The House

If the priest ruled the house unclean before it was emptied, everything inside would become unclean too.

Furniture, dishes, clothing, and food would all have to be destroyed along with it.

Emptying the house first protects the family's belongings from total loss.

This is a genuinely practical provision, not just ceremony.

📦 Emptying happens before any ruling

💰 It protects belongings from total loss

🧠 A practical step, not just ceremony

📖 Mercy shows up in the details

# Leviticus 14:37-42
# 🧱 Diagnosing And Treating The House
---
## 🎨 Hollow Strakes, Greenish Or Reddish, Which Are Lower Than The Wall

"Strakes" means streaks or marks.

Two signs mark a suspicious spot, an unusual color and an unusual depth.

Greenish or reddish color is the first sign.

Sitting visibly lower than the surrounding wall is the second.

The exact same two signs were already used to examine skin back in chapter thirteen.

🎨 Strakes means streaks or marks

📏 Color and depth are the signs

🔗 The same signs were used for skin

📖 God's law stays consistent across subjects

## 🚪 The Priest Shall Go Out Of The House To The Door

Before ruling on an uncertain mark, the priest steps back to the doorway.

He does not stay inside while deciding.

This is the same instinct behind verse three's priest stepping outside the camp.

He assesses from a safe boundary while the diagnosis is still undecided.

🚪 The priest steps back before ruling

🔗 The same instinct as verse three

⚠️ Caution matters during an undecided case

➡️ Careful process protects the whole family

## 📅 Shut Up The House Seven Days

This is the same seven day waiting period already used throughout chapter thirteen's skin exams.

Now it applies to a building instead of a body.

Nobody rushes the verdict.

Time is given to see whether the mark spreads or holds still.

📅 The same seven day wait returns

🏠 Now applied to a building

⏳ Time reveals whether the mark spreads

📖 Patience runs through this whole law

## 🧱 Take Away The Stones In Which The Plague Is

If the mold has spread after the wait, only the affected stones are removed at first.

The whole house is not torn down right away.

Those stones are carried entirely outside the city to a designated unclean place.

They are kept far from anything the community would touch.

🧱 Only the affected stones are removed

🚮 Carried entirely outside the city

📍 Dumped in a designated unclean place

➡️ The law starts with the smallest fix

## 🔨 He Shall Take Other Morter, And Shall Plaister The House

"Morter" is mortar, the material that binds stones together.

"Plaister" is plaster, a smooth protective coating.

Both are simply older spellings of familiar words.

New stones go in, the wall gets replastered, and the house gets a real chance instead of automatic loss.

🧱 Morter means mortar between stones

🎨 Plaister means plaster, a protective coat

🔨 A genuine repair, not automatic loss

📖 The house gets a real second chance

# Leviticus 14:43-47
# 💥 If The Plague Returns
---
## 🔁 If The Plague Come Again, And Break Out In The House

Even after a full repair, new stones and fresh plaster, the mold can still return.

The house gets one more real chance.

This is not a rigged outcome built into the law.

It is a genuine possible result of honest repair not being enough.

🔁 A repaired house can still fail

🏠 Recurrence is a genuine possible outcome

⚖️ The law is not rigged here

📖 Honest effort is expected, not certainty

## 🦠 It Is A Fretting Leprosy In The House

"Fretting" means eating away at something or steadily wearing it down.

The same word marked the worst cases of garment mold back in chapter thirteen.

Calling it fretting marks this as the worst case category.

The mold has proven persistent and destructive, not just a passing stain.

🦠 Fretting means steadily eating away

🔗 The same word marked the worst mold

📉 This marks the worst case category

➡️ Precise words track how severe this is

## 🔨 He Shall Break Down The House, The Stones Of It, And The Timber Thereof

This is total demolition, not another round of swapping stones.

Stones, wooden beams, and mortar are all removed.

Everything is carried entirely outside the city.

Losing an entire house was a severe financial loss in this culture.

The law reserves this for a true last resort.

🔨 Full demolition, not another repair

💸 Losing a house was a real loss

⚖️ Reserved as a true last resort

📖 The law is slow to take a home

## 🌆 He That Goeth Into The House Shall Be Unclean Until The Even

Anyone entering the quarantined house during its shut up period picks up a mild uncleanness.

That uncleanness lasts only until evening.

That is the standard length for minor uncleanness throughout Leviticus.

It is far lighter than the extended isolation a diagnosed leper faced in chapter thirteen.

🌆 Uncleanness here lasts until evening

📏 The standard length for minor cases

⚖️ Far lighter than a leper's isolation

➡️ Entering a suspect house is a small risk

# Leviticus 14:48-53
# 🕊️ Cleansing A Healed House
---
## ✅ The Priest Shall Pronounce The House Clean, Because The Plague Is Healed

Notice the word "healed" here.

The exact same word was used for the leper's healing back in verse three.

It is now applied to a building.

The text treats a house's restoration with the same seriousness and vocabulary as a person's healing.

✅ The same word marked the leper's healing

🏠 Now applied to a building instead

📜 The house's restoration is treated seriously

📖 One vocabulary spans both healings

## 🐦 Take To Cleanse The House Two Birds, And Cedar Wood, And Scarlet, And Hyssop

This is the exact same four item kit used for a person's cleansing back in verses four through seven.

Two birds, cedar wood, scarlet, and hyssop.

Now it is applied to a building instead of a body.

The whole property, not only the people living there, needed restoring to God.

🔁 The same kit used on a person

🏠 Now applied to a building

🙏 The property itself needed restoring

➡️ Nothing that is his sits outside this law

## 🕊️ Let Go The Living Bird Out Of The City Into The Open Fields

This is the exact same release act from verse seven.

Only the setting shifts, from the open field outside the wilderness camp to outside the city.

That shift matches the move from tent camp language to settled city language.

It is one ceremony, adapted for two different stages of Israel's life.

🕊️ The same release act as verse seven

🏙️ Wording shifts from camp to city

🔗 One ceremony spans two different eras

📖 God's law travels with His people

## ❤️ Make An Atonement For The House, And It Shall Be Clean

Atonement is a term normally reserved for a person's relationship with God.

Here scripture applies it to a building.

Nothing, not even property, sits outside the reach of being made right with God.

The chapter closes this section with the same word "clean" used for the healed person.

❤️ Atonement usually describes a person

🏠 Here it applies to a building

🌍 Nothing sits outside being made right

📖 The same word closes both stories

# Leviticus 14:54-57
# 📖 The Whole Law Of Leprosy, Closed
---
## 📋 This Is The Law For All Manner Of Plague Of Leprosy, And Scall

"Scall" is the scalp and beard condition from chapter thirteen, where thin yellow hair was the warning sign.

This closing list works like a table of contents.

It names each specific case that chapters thirteen and fourteen have just covered.

Nothing gets left out of the summary.

📋 Scall is a scalp condition

📚 This list works like a table of contents

🔗 It names every case just covered

📖 A careful law ends carefully

## 🧵 And For The Leprosy Of A Garment, And Of A House

One single Hebrew word, tzaraat, has now been applied across three very different subjects.

Human skin, woven fabric, and building material.

English splits this into different words, like mold, mildew, and disease.

The Hebrew text treats all three as versions of one underlying problem.

🧵 One word covers skin, fabric, and house

🌐 English splits what Hebrew treats as one

📚 Two chapters build from one idea

➡️ One word can carry more meaning

## 🔁 For A Rising, And For A Scab, And For A Bright Spot

This exact three item list is a direct callback to chapter thirteen, verse two.

That verse opened the whole section on skin disease.

Ending on the same three words it opened with is a deliberate literary bookend.

It signals that the entire two chapter law is now formally closed.

🔁 A callback to chapter thirteen's opening

📚 The same three words return

✅ A deliberate bookend closes the law

📖 Scripture often echoes its own start

## 🎯 To Teach When It Is Unclean, And When It Is Clean

The stated purpose of this entire two chapter law was never punishment.

It was teaching.

Israel needed a clear, consistent, learnable way to tell clean from unclean.

That is the exact instructional purpose Aaron himself was charged with back in chapter ten.

🎯 The purpose is teaching, not punishment

📖 Israel needed a learnable standard

🔗 The same purpose was given to Aaron

➡️ God's laws were meant to be understood
`.trim();

export const LEVITICUS_FOURTEEN_PERSONAL_SECTIONS = parseLeviticusFourteenRawNotes(LEVITICUS_FOURTEEN_RAW_NOTES);
