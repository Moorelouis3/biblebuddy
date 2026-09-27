export type JeremiahTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahTwentyFiveRawNotes(rawText: string): JeremiahTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 25:${startVerse}` : `Jeremiah 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Jeremiah 25 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_TWENTY_FIVE_RAW_NOTES = `# Jeremiah 25:1-3
# 📜 Twenty Three Years Of Warning
---
## 🗓️ The Fourth Year Of Jehoiakim

Jehoiakim was a king of Judah, not a prophet.

Jeremiah gives this same year two different names.

The fourth year of Jehoiakim was also the first year of Nebuchadrezzar.

Judah and Babylon each counted years by their own king's reign.

Naming both marks the exact moment two nations' histories crossed.

👑 Jehoiakim ruled Judah at this time

🗓️ Two nations, two ways of counting years

⚔️ Babylon's rise lines up with this year

📖 History marks the exact moment of collision

## 🏙️ Unto All The People Of Judah, And To All The Inhabitants Of Jerusalem

This message was not just for the capital city.

"The people of Judah" means everyone across the countryside and smaller towns.

"The inhabitants of Jerusalem" means the people living inside the capital itself.

Jeremiah addressed the whole nation, not one town.

No one in the land could later say they were never warned.

🏙️ Jerusalem means the capital city

🌾 Judah means the towns and countryside

📢 The warning reached the whole nation

➡️ No one could claim they missed it

## 🔢 Three And Twentieth Year

"Three and twentieth" is an old way of saying twenty three.

Jeremiah had been preaching since the thirteenth year of Josiah.

Add up the years and this is his twenty third year of ministry.

He calls himself rising early and speaking that whole time.

Rising early was not really about the time of day.

It meant showing up again and again without giving up.

🔢 Three and twentieth means twenty three

📆 Jeremiah had preached that whole span

🌅 Rising early means persistent effort

📖 Twenty three years of a message ignored

## 👂 But Ye Have Not Hearkened

"Hearkened" means more than simply hearing sound.

It means actually listening and doing something about it.

The people heard Jeremiah's voice for over two decades.

They just never let the message change anything.

Hearing without responding is its own kind of refusal.

👂 Hearkened means listening and obeying

🗣️ The people heard the words clearly

🚫 They never let it change them

➡️ Hearing is not the same as obeying

# Jeremiah 25:4-7
# 👂 Sent And Not Heard
---
## 🌅 Rising Early And Sending Them

God did not send just one prophet, one time.

He kept sending His servants the prophets, year after year.

"Rising early" pictures someone getting up before dawn out of urgency.

God treated warning His people like urgent, first priority work.

🌅 Rising early pictures urgent effort

📨 Many prophets were sent, not one

🔁 God kept sending them for years

📖 God treated warning them as urgent

## 👂 Nor Inclined Your Ear To Hear

"Inclined your ear" is an old picture for leaning in to listen.

The people did not even lean in.

They kept their attention turned away on purpose.

This was not confusion about the message.

It was a choice not to pay attention at all.

👂 Inclined your ear means leaning in to listen

🙅 The people never leaned in

🎯 Their deafness was a choice

➡️ Refusing to listen is still a choice

## 🔄 Turn Ye Again Now Every One From His Evil Way

The command was personal, not just national.

"Every one" means each person had their own turning to do.

God was not asking for a group policy change.

He wanted individual people to walk away from their own sins.

The land itself was never the real problem.

🔄 Turn again means repent and return

👤 Every one means personal responsibility

🚫 Not a group policy, a personal choice

📖 God calls individuals, not just nations

## 🗺️ Dwell In The Land That The LORD Hath Given

This promise was not a new offer.

The land had already been given generations earlier, in the time of Joshua.

Staying in it was tied to obedience, not just ownership.

Turning from evil was the condition for staying put.

🗺️ The land was already given long ago

📜 Ownership was tied to obedience

🏠 Staying required turning from evil

➡️ A gift can still come with conditions

## 🚶 Go Not After Other Gods To Serve Them

"Go after" pictures actually following behind something, like a servant follows a master.

Serving other gods was not a side hobby.

It meant giving another god the loyalty that belonged only to the LORD.

🚶 Go after means following as a servant

🙏 Serving means giving total loyalty

💔 That loyalty belonged only to the LORD

➡️ Idolatry always steals loyalty meant for God

## 🔨 Provoke Me Not To Anger With The Works Of Your Hands

"The works of your hands" is a plain way to describe idols.

People carved or shaped these gods themselves.

Worshiping something you built with your own hands stirred God's anger.

He warns that the same hands crafting idols would end up bringing them harm.

🔨 Works of your hands means idols people made

😠 Worshiping self made gods provoked God

🪓 Their own hands built their own trouble

📖 What people make can end up hurting them

# Jeremiah 25:8-11
# ⚔️ Nebuchadrezzar My Servant
---
## ⏳ Because Ye Have Not Heard My Words

This verse marks the turn from warning to sentence.

Twenty three years of pleading finally reach a stopping point.

The judgment that follows is not sudden or unfair.

It is the direct result of years of refusal.

⏳ Twenty three years of pleading are over

⚖️ The judgment follows years of refusal

🚫 This was never sudden or unfair

➡️ Ignored warnings eventually run out

## 🧭 All The Families Of The North

Armies attacking Judah usually came from the north.

They followed the easiest travel routes into the land.

"All the families" pictures an entire coalition, not one single army.

Babylon would lead this coalition, but many nations would march with it.

🧭 Invaders usually came from the north

👥 Families of the north means a coalition

⚔️ Babylon leads, others march alongside

📖 Judgment arrives as a combined force

## 👑 Nebuchadrezzar The King Of Babylon, My Servant

Nebuchadrezzar worshiped his own gods, not the LORD.

Yet God calls him "my servant" here without hesitation.

A servant simply carries out someone else's will.

Nebuchadrezzar had no idea he was carrying out God's plan.

👑 Nebuchadrezzar worshiped foreign gods

🛠️ Servant means carrying out another's will

🤷 He had no idea he served God's plan

📖 God can use even an unwilling king

## 😲 An Astonishment, And An Hissing, And Perpetual Desolations

"Astonishment" means the shock of watching something collapse.

"Hissing" pictures onlookers mocking with a sharp, contemptuous sound.

"Perpetual desolations" means the ruin would not be temporary.

Judah would become the example other nations pointed to and mocked.

😲 Astonishment means shocked disbelief

😤 Hissing means mocking contempt

🏚️ Perpetual desolations means lasting ruin

➡️ Judah becomes a warning to others

## 💍 The Voice Of The Bridegroom, And The Voice Of The Bride

Weddings in this culture were loud, joyful, public events.

Losing "the voice of the bridegroom and the bride" means losing weddings altogether.

No new families would be starting in a land under judgment.

Even something as happy as a wedding would disappear from daily life.

💍 Weddings were loud, public celebrations

🔇 Losing that voice means no more weddings

👶 No new families being started

📖 Even ordinary joy would vanish

## 🌾 The Sound Of The Millstones, And The Light Of The Candle

Millstones ground grain into flour, a daily household sound in every home.

A lit candle at night meant a home was lived in and active.

Losing both pictures total silence and total darkness across the land.

This is not just war, it is the end of ordinary daily life.

🌾 Millstones ground grain every day

🕯️ A lit candle meant an active home

🔇 Losing both means total silence

➡️ Ordinary daily life disappears completely

## 🔢 Serve The King Of Babylon Seventy Years

Seventy years is not a vague guess here.

It is not a round symbolic number either.

It describes about one full lifetime under Babylon's control.

Later chapters and the book of Daniel treat this number as literal.

An entire generation would live and die never knowing freedom from Babylon.

🔢 Seventy years means about one lifetime

📖 Daniel later treats this number as literal

👴 A whole generation would live under it

➡️ Judgment here had a real, measured length

# Jeremiah 25:12-14
# ⏳ Seventy Years, Then Babylon's Turn
---
## 🔄 When Seventy Years Are Accomplished

Babylon's judgment on Judah was never meant to be permanent.

The same seventy years that punished Judah had an end point already fixed.

God announces Babylon's own reckoning before Babylon has even finished conquering.

⏳ Seventy years had a fixed end

🔄 Babylon's judgment would end too

📅 God announces this ahead of time

📖 Every judgment here has a limit

## 🛠️ I Will Punish The King Of Babylon

Babylon was God's chosen tool, not God's favorite nation.

Being used by God did not make Babylon exempt from justice.

Being used for judgment now would not protect Babylon later.

🛠️ Babylon was a tool, not a favorite

⚖️ Being used did not mean being excused

🔁 The tool of judgment gets judged too

➡️ No nation stands outside God's justice

## 🏛️ The Land Of The Chaldeans

"Chaldeans" was another name for the Babylonians, especially their ruling class.

The name shows up often in Jeremiah and later in Daniel.

Naming them this way makes clear exactly who will face this reversal.

🏛️ Chaldeans means the Babylonian ruling class

📖 The name appears again in Daniel

🎯 This names exactly who gets judged

➡️ The empire of judgment becomes judged itself

## 📜 Even All That Is Written In This Book

Jeremiah is pointing to his own written scroll of prophecies.

This is one of the few moments the book names itself directly.

The words were not only spoken.

They were recorded to outlast the moment.

📜 This points to Jeremiah's own written scroll

🖋️ The book names itself here

🗣️ Spoken words were also written down

📖 Written words outlast a single moment

## ⚖️ According To Their Deeds, And According To The Works Of Their Own Hands

This is the same phrase used earlier for Judah's idols in verse six.

Now it applies to Babylon's own actions instead.

Whoever brings judgment on others still answers for their own conduct.

🔁 The same phrase now applies to Babylon

⚖️ Deeds and hands mean personal responsibility

🪓 Bringing judgment does not erase your own

📖 Everyone answers for their own actions

# Jeremiah 25:15-19
# 🍷 The Cup Of Fury
---
## 🍷 Take The Wine Cup Of This Fury At My Hand

A cup in this culture often pictured a person's assigned portion in life.

Here the cup holds God's fury instead of wine.

Jeremiah is told to physically act out God's judgment as a symbol.

Every nation would be handed this same cup in turn.

🍷 A cup pictures someone's assigned portion

😠 This cup holds God's fury

🎭 Jeremiah acts out the judgment as a symbol

📖 Every nation receives the same cup

## 🌍 Cause All The Nations, To Whom I Send Thee, To Drink It

Jeremiah's mission was never limited to his own people.

He was sent as a messenger to nations far beyond Judah's borders.

The list that follows in this chapter shows exactly how wide that mission reached.

🌍 Jeremiah's mission reached beyond Judah

📨 He carried this message to many nations

🗺️ The list ahead shows how far it reached

➡️ God's justice was never local

## 🥴 They Shall Drink, And Be Moved, And Be Mad

"Be moved" pictures staggering, the way a drunk person cannot walk straight.

"Be mad" pictures losing control of clear thinking entirely.

Drinking this cup makes nations act erratic and disoriented under judgment.

The sword mentioned right after is the real cause behind that chaos.

🥴 Be moved means staggering like a drunk

🌀 Be mad means losing clear thinking

⚔️ The sword causes this chaos

📖 Judgment makes nations lose control

## 🤲 Then Took I The Cup At The LORD's Hand

Jeremiah does not just deliver a message about the cup.

He personally receives it from God's own hand first.

A messenger who has held the cup himself speaks with real weight.

🤲 Jeremiah personally receives the cup

🗣️ He does not just describe it

💪 Holding it himself gives his words weight

➡️ Carrying the burden gives his words authority

## 📝 To Wit, Jerusalem, And The Cities Of Judah, And The Kings Thereof

"To wit" is an old way of saying "namely" or "specifically."

The list of nations begins at home, with Judah itself.

Judah's own kings and princes are named first, not last.

📝 To wit means namely or specifically

🏠 The list of nations starts at home

👑 Judah's kings are named first

📖 Judgment begins with God's own people

## 🏚️ To Make Them A Desolation, An Astonishment, An Hissing, And A Curse

These are the same four words already used back in verse nine.

Repeating them here confirms the warning was not exaggerated.

Judah becomes exactly what was already promised, no more and no less.

🔁 These words repeat verse nine exactly

✅ The warning was never exaggerated

🏚️ Judah becomes exactly what was promised

➡️ God's words match His actions

# Jeremiah 25:20-26
# 🗺️ Every Nation Drinks
---
## 🏺 Pharaoh King Of Egypt

Egypt was the great southern power Judah had often looked to for help.

Even Egypt, one of the strongest nations on earth, is handed this same cup.

No political alliance with Egypt could shield Judah from this judgment.

🏺 Egypt was Judah's most powerful ally

👑 Pharaoh still drinks the same cup

🤝 No alliance could block this judgment

📖 The strongest nations are not exempt

## 🗺️ The Land Of Uz

Uz was a region likely east of Israel.

It is remembered elsewhere as Job's homeland.

Naming it here shows the judgment reaching places far outside Judah's normal neighbors.

🗺️ Uz was likely Job's homeland

🧭 It sat east of Israel

🌍 Judgment reached distant, unfamiliar places

➡️ No region was too far away

## 🏙️ Ashkelon, And Azzah, And Ekron, And The Remnant Of Ashdod

These were four of the five major Philistine cities.

They were Judah's old enemies to the west.

"The remnant of Ashdod" hints that Ashdod had already been badly weakened.

A fifth city, Gath, is missing here, likely because it no longer stood as a power.

🏙️ Four Philistine cities are named here

⚔️ Old enemies also drink this cup

📉 Remnant of Ashdod means already weakened

📖 Even fading powers are not skipped

## 👪 Edom, And Moab, And The Children Of Ammon

These three nations were Judah's closest relatives by blood.

Edom descended from Esau, Jacob's own brother.

Moab and Ammon descended from Lot, Abraham's nephew.

Family ties did not earn any of them an exemption.

👪 These nations were Judah's blood relatives

🧬 Edom came from Esau, Jacob's brother

🌳 Moab and Ammon came from Lot

➡️ Family ties gave no exemption

## ⚓ All The Kings Of Tyrus, And All The Kings Of Zidon

Tyrus and Zidon were wealthy trading ports along the Mediterranean coast.

These cities built their power on trade routes and shipping.

Wealth built on trade could not buy protection from this judgment either.

⚓ Tyrus and Zidon were trading ports

💰 Their power came from trade, not land

🚫 Wealth bought no protection here

📖 Money cannot outrun judgment

## 🏝️ The Kings Of The Isles Which Are Beyond The Sea

"The isles beyond the sea" points to lands across the Mediterranean.

Many scholars believe this points to Cyprus and nearby coasts.

This phrase stretches the reach of judgment even farther from Judah's own borders.

🏝️ Isles beyond the sea means distant coastlands

🧭 Likely Cyprus and nearby regions

🌊 The reach kept stretching farther out

➡️ Even sea faring nations were included

## 🐫 Dedan, And Tema, And Buz

These were Arabian tribes living deep in desert territory.

They traded in spices and goods carried by camel caravans.

Their remote desert location offered them no more safety than any other nation on the list.

🐫 These were Arabian desert tribes

🌶️ They traded spices by caravan

🏜️ Desert distance offered no safety

📖 Isolation could not stop judgment

## 🔤 The King Of Sheshach

"Sheshach" is not a real place name on any map.

Hebrew scribes sometimes used a coded alphabet trick called atbash.

It swapped letters from opposite ends of the alphabet.

Decoded, Sheshach actually spells out Babel, the Hebrew name for Babylon.

The list ends by hiding Babylon's own name inside a puzzle, right before its own judgment lands.

🔤 Sheshach is a coded name, not a place

🔄 Scribes swapped letters using a cipher

🏛️ Decoded, it spells out Babylon

📖 Babylon's own judgment closes this list

# Jeremiah 25:27-29
# 🥴 Ye Shall Certainly Drink
---
## 🤢 Drink Ye, And Be Drunken, And Spue

This language is deliberately coarse and physical.

It is not polite or softened language.

"Spue" means to vomit, the natural result of drinking too much.

God wants the ugliness of judgment described plainly, not softened.

🍷 The language here is deliberately coarse

🤢 Spue means to vomit

🚫 Judgment is not softened or prettified

➡️ Some truths need blunt language

## 📉 Fall, And Rise No More

This is not a temporary stumble that gets recovered from later.

"Rise no more" means a final, permanent collapse.

Nations under this judgment would not simply dust themselves off and continue.

📉 This fall is not temporary

🚫 Rise no more means permanent collapse

⏹️ No recovery follows this judgment

📖 Some falls do not get reversed

## 🙅 If They Refuse To Take The Cup At Thine Hand

God anticipates that some nations will resist accepting this judgment.

Refusing the cup would not cancel it or delay it.

Jeremiah is told exactly what to say if that resistance happens.

🙅 Some nations would try to refuse

🚫 Refusing does not cancel judgment

🗣️ Jeremiah has a ready answer prepared

➡️ Resistance does not stop what is coming

## 🔒 Ye Shall Certainly Drink

This phrase leaves no room for negotiation.

Every nation on the list drinks, whether willing or not.

Judah drinking first in verse eighteen already proved no one gets special treatment.

🔒 Certainly drink means no negotiation

🌍 Every nation drinks eventually

🏠 Judah already drank first

📖 No one talks their way out of this

# Jeremiah 25:30-33
# 🦁 The LORD Shall Roar
---
## 🦁 The LORD Shall Roar From On High

A lion's roar was the most fearsome, unmistakable sound in the ancient world.

Comparing God's voice to a roar pictures overwhelming, undeniable power.

"On high" places this roar above every nation, not from a rival on the ground.

🦁 A roar pictures overwhelming power

📢 God's voice carries that same force

⬆️ On high means above every nation

➡️ No nation can out shout this voice

## 🍇 As They That Tread The Grapes

Treading grapes meant crushing them underfoot in a winepress to make wine.

It was hard, physical, stomping labor, not a gentle process.

Comparing judgment to this picture shows force applied directly and without hesitation.

🍇 Treading grapes meant crushing them underfoot

👣 It was hard, stomping labor

💪 Judgment applies force just as directly

📖 A harvest image becomes a judgment image

## ⚖️ The LORD Hath A Controversy With The Nations

"Controversy" here is a legal word, like a case brought before a judge.

God is not simply angry.

He is bringing formal charges.

⚖️ Controversy means a legal case

👨‍⚖️ God is not just angry, He is prosecuting

📜 Charges are brought against the nations

➡️ This judgment follows a verdict, not a mood

## 👨‍⚖️ He Will Plead With All Flesh

"Plead" here does not mean begging or asking for mercy.

It means presenting and arguing a legal case, the same idea as "controversy."

"All flesh" means every human being, not one nation singled out.

👨‍⚖️ Plead means arguing a legal case

🌍 All flesh means every human being

⚖️ No single nation is singled out

📖 God's case covers all humanity

## ⚰️ They Shall Not Be Lamented, Neither Gathered, Nor Buried

Proper burial and public mourning were considered essential honors in this culture.

Being denied all three at once was the worst possible disgrace imaginable.

This judgment strips away even the basic dignity normally given to the dead.

⚰️ Burial and mourning were expected honors

🚫 All three honors are denied here

😢 This was the worst disgrace imaginable

➡️ Judgment removes even basic dignity

## 💥 They Shall Be Dung Upon The Ground

This is deliberately shocking, ugly language.

It is not poetic softening.

Comparing human bodies to dung strips away all remaining honor.

The image is meant to disturb the reader, not comfort them.

💥 The language is meant to shock

🚫 Dung imagery strips away all honor

😨 It is meant to disturb, not comfort

📖 Judgment is described without softening

# Jeremiah 25:34-38
# 🐑 Howl, Ye Shepherds
---
## 👑 Howl, Ye Shepherds, And Cry

"Shepherds" here is a common ancient title for kings and rulers.

It does not mean literal herdsmen in a field.

Rulers who were supposed to protect their people are now told to grieve instead.

👑 Shepherds here means kings and rulers

🐑 Not literal herdsmen in a field

😭 Rulers are told to grieve now

➡️ Protectors become mourners in this scene

## 🪨 Wallow Yourselves In The Ashes, Ye Principal Of The Flock

Sitting or rolling in ashes was a physical act of deep mourning in this culture.

"Principal of the flock" means the leading rulers, the most important among them.

Even the highest ranked leaders are told to mourn this openly and publicly.

🪨 Wallowing in ashes showed deep mourning

👑 Principal of the flock means top leaders

😢 Even the highest ranks must mourn

📖 No rank is too high to grieve

## ⏰ The Days Of Your Slaughter And Of Your Dispersions Are Accomplished

"Accomplished" means the appointed time has fully arrived, not just started.

"Dispersions" means being scattered away from their own land and people.

Both slaughter and scattering were announced long before this.

Now their time has come.

⏰ Accomplished means the time has fully arrived

💔 Dispersions means being scattered from home

📅 Both were announced long before this

➡️ A long announced day finally lands

## 🏺 Ye Shall Fall Like A Pleasant Vessel

A "pleasant vessel" was a fine, valuable piece of pottery.

It was not a cheap clay jar.

Fine pottery shatters completely once it breaks, with no easy repair.

Comparing these rulers to broken fine pottery shows how total their fall would be.

🏺 Pleasant vessel means fine, valuable pottery

💥 Fine pottery shatters completely when broken

🚫 No easy repair once it breaks

📖 Their fall would be total, not partial

## 🏃 The Shepherds Shall Have No Way To Flee

Ordinary soldiers might scatter and hide during a defeat.

These rulers, the ones most responsible, are given no such escape route.

The very people who led their nations into judgment cannot outrun it themselves.

🏃 Ordinary soldiers might still escape

🚫 These rulers have no escape route

👑 The most responsible cannot outrun judgment

➡️ Leadership does not buy an exit

## 🌾 The LORD Hath Spoiled Their Pasture

"Pasture" pictures the land and resources a shepherd depends on to feed his flock.

Taking away the pasture means taking away the very thing that gave these rulers their power.

A shepherd with no pasture has nothing left to rule over.

🌾 Pasture means the land rulers depended on

🐑 It is the shepherd image reversed

💔 Losing it removes their real power

📖 Without pasture, there is nothing left to rule

## 🦁 He Hath Forsaken His Covert, As The Lion

A "covert" is a lion's hidden den.

It is the place a lion normally stays quiet and out of sight.

Comparing God to a lion leaving its den pictures Him coming out to act directly.

This echoes the roar from verse thirty, now followed by the lion actually moving.

🦁 Covert means a lion's hidden den

🚶 Leaving it means stepping out to act

🔁 This echoes the roar from verse thirty

➡️ The lion no longer stays hidden
`.trim();

export const JEREMIAH_TWENTY_FIVE_PERSONAL_SECTIONS = parseJeremiahTwentyFiveRawNotes(JEREMIAH_TWENTY_FIVE_RAW_NOTES);
