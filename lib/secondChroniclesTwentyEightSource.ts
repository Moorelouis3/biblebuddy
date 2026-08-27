export type SecondChroniclesTwentyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesTwentyEightRawNotes(rawText: string): SecondChroniclesTwentyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesTwentyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+28:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 28 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+28:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+28:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 28 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 28,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 28:${startVerse}` : `2 Chronicles 28:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Chronicles 28 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_TWENTY_EIGHT_RAW_NOTES = `# SecondChronicles 28:1-4
# 🔥 A King Who Broke The Pattern
---
## 👎 Did Not That Which Was Right In The Sight Of The Lord

This phrase opens the story of nearly every king in Chronicles.

It measures each king by one single standard.

Did he obey the Lord.

Ahaz fails that test from his very first verse.

Nothing else in his reign makes up for that failure.

📏 One verse sets the whole standard

❌ Ahaz fails it right away

📚 Chronicles judges every king this way

📖 This verse frames the whole chapter

## 👴 Like David His Father

"Father" here does not mean Ahaz's actual father.

It means his ancestor David, generations earlier.

Chronicles often measures a king against David's example.

Uzziah and Jotham, the two kings before him, were measured the same way.

Both of them started well by that measure.

Ahaz is the first in this family line who does not.

👴 Father here means ancestor David

📏 Chronicles measures kings against David

👑 Uzziah and Jotham started well

📖 Ahaz breaks that family pattern

## 🚶 Walked In The Ways Of The Kings Of Israel

This does not mean Ahaz simply ruled like any king.

Every king of the northern kingdom of Israel is judged as unfaithful in the Bible.

Comparing a king of Judah to them was a serious insult.

Ahaz is the first king of Judah in generations measured this low.

His own family line traced back to David, not to Israel's idolatrous kings.

👑 Kings of Israel means the north

❌ Every one of them is condemned

😔 Comparing Ahaz to them is harsh

📖 He abandons his own family's line

## 🔥 Molten Images For Baalim

"Molten images" means statues made by pouring melted metal into a mold.

"Baalim" is the plural form of Baal, a Canaanite storm and fertility god.

The plural shows Ahaz was not worshipping one false god but many local versions of Baal at once.

Each town in Canaan often had its own version of Baal worship.

Ahaz imported all of it into Judah.

🔥 Molten means poured melted metal

👥 Baalim is the plural of Baal

🌍 Each town had its own Baal

📖 Ahaz imported many gods at once

## 🗺️ The Valley Of The Son Of Hinnom

This valley sat just south of Jerusalem.

Its later Greek name, Gehenna, became a New Testament word for hell.

That name traces directly back to what happened here under Ahaz.

The place best known today for judgment first became infamous for child sacrifice.

The valley's location made this abomination visible right outside the city.

🗺️ Hinnom sat just south of Jerusalem

🔥 Its later name became Gehenna

😱 That word became a name for hell

📖 Judgment's name began here first

## 😢 Burnt His Children In The Fire

This describes child sacrifice to a foreign god, likely Molech.

Some ancient Near Eastern cultures believed burning a child could win a god's favor in a crisis.

Israel's own law forbade this practice by name in Leviticus.

Ahaz did not stumble into this by accident.

He broke one of the clearest commands in the whole law on purpose.

🔥 This describes child sacrifice

🚫 Leviticus forbids this practice by name

😢 More than one child was lost this way

📖 Ahaz broke a clear command on purpose

## ⛰️ In The High Places, And On The Hills, And Under Every Green Tree

"High places" were raised platforms built for worship outside the temple.

Hills and shady trees were also popular worship sites across the ancient Near East.

Canaanite religion associated fertility with these natural high and green places.

This phrase repeats often in Kings and Chronicles for a reason.

It marks a king who let worship happen anywhere except where God commanded it.

⛰️ High places were raised worship platforms

🌳 Green trees were common worship sites

🌍 Canaanite religion tied these to fertility

📖 Worship happened anywhere but the temple

# SecondChronicles 28:5-8
# ⚔️ Judah Crushed By Syria And Israel
---
## 🤲 Delivered Him Into The Hand Of The King Of Syria

"Delivered into the hand of" is a common Bible phrase for military defeat.

It signals more than bad luck on the battlefield.

The text credits God directly for allowing this loss.

Ahaz's own idolatry from the verses just before this one is the reason given.

Judgment, not chance, explains what happens next.

🤲 Delivered into the hand means defeated

⚔️ God allowed this military loss

🔥 Ahaz's own idolatry caused it

📖 Judgment explains what happens next

## 🏙️ Brought Them To Damascus

Damascus was the capital city of Syria, also called Aram.

Syria sat northeast of Israel, a longtime regional rival to both Israel and Judah.

Captives taken to Damascus were now far from home in a foreign king's territory.

This defeat cost Judah people, not just land or money.

🏙️ Damascus was Syria's capital city

🗺️ Syria sat northeast of Israel

🚶 Captives were taken far from home

📖 This cost Judah its own people

## 💔 The King Of Israel, Who Smote Him With A Great Slaughter

This is not a foreign invasion.

Israel and Judah both descended from the same twelve tribes.

They had split into two kingdoms generations earlier and often fought each other since.

This particular defeat came from Judah's own relatives, not a stranger.

That makes the slaughter that follows even harder to read.

👥 Israel and Judah share one ancestry

⚔️ These two kingdoms often fought

💔 This defeat came from relatives

📖 Family conflict makes this harder

## 🔢 An Hundred And Twenty Thousand In One Day

This number describes a single day of battle losses.

"Valiant men" means these were trained, experienced soldiers, not untrained farmers.

Losing this many skilled fighters in one day was a catastrophic military blow.

The text does not soften the number to make it easier to hear.

🔢 A huge number in one day

🛡️ Valiant men means trained soldiers

💥 This was a catastrophic loss

📖 The text states it plainly

## 🙏 Because They Had Forsaken The LORD God Of Their Fathers

The text gives one clear reason for this disaster.

Judah did not lose because Syria and Israel were simply stronger.

Judah lost because the nation had abandoned God first.

The military defeat follows directly from the spiritual one described earlier in the chapter.

📖 The text names the real reason

❌ Not simple military weakness

🙏 Judah had abandoned God first

➡️ Spiritual failure led to defeat

## ⚔️ Slew Maaseiah The King's Son, And Azrikam The Governor Of The House, And Elkanah That Was Next To The King

Zichri, a soldier from Israel, killed three of Judah's top leaders in one attack.

The dead included the king's own son Maaseiah and the palace governor Azrikam.

Elkanah, the official ranked just under the king, was killed too.

This was not a random skirmish.

It targeted Judah's royal government directly.

⚔️ Zichri was a soldier from Israel

👑 He killed the king's own son

🏛️ He also killed top officials

📖 This struck Judah's government directly

## 🔢 The Children Of Israel Carried Away Captive Of Their Brethren Two Hundred Thousand

Israel's army did not just defeat Judah in battle.

They took two hundred thousand of their own relatives as captives.

Women, sons, and daughters were taken along with the soldiers.

Everything of value was stripped from them and carried to Samaria, Israel's capital.

This sets up the confrontation in the next section.

A prophet is about to call this exact act a sin.

🔢 Two hundred thousand were taken captive

👨‍👩‍👧 Whole families were taken, not soldiers

🏙️ Samaria was Israel's own capital

➡️ A prophet is about to object

# SecondChronicles 28:9-11
# 🕊️ A Prophet's Rebuke
---
## 🗣️ A Prophet Of The LORD Was There, Whose Name Was Oded

Oded was a prophet living in the northern kingdom of Israel, not in Judah.

Most prophets named in Kings and Chronicles who speak against Israel come from outside it.

Oded is different.

He confronts his own nation's army from the inside.

His warning carries extra weight because of that.

🗣️ Oded was a prophet in Israel

🏠 He confronts his own nation

💪 That takes real courage

📖 His warning carries extra weight

## ☁️ In A Rage That Reacheth Up Unto Heaven

This phrase means the violence was so extreme that it drew God's direct attention.

Ezra later uses almost this same wording to describe Israel's sin as grown up unto the heavens.

The image is not a literal distance.

It means the cruelty was too great to ignore.

Even a nation God is using to punish Judah can go too far in how it does it.

☁️ Reacheth unto heaven means extreme cruelty

📜 Ezra later uses similar wording

🚫 Being God's instrument has limits

📖 Even judgment can go too far

## ⛓️ Keep Under The Children Of Judah And Jerusalem For Bondmen And Bondwomen

"Bondmen and bondwomen" means slaves.

Israel's army planned to keep their own relatives from Judah as permanent slaves.

The law of Moses placed strict limits on enslaving a fellow Israelite.

This plan crossed a line their own law was supposed to prevent.

⛓️ Bondmen and bondwomen means slaves

👥 The captives were their own relatives

📜 The law limited enslaving Israelites

📖 This plan broke that ancient limit

## ⚖️ Are There Not With You, Even With You, Sins Against The LORD Your God

Oded is not saying Judah did nothing wrong.

The chapter already named Judah's sin plainly.

His point is that Israel's own hands are not clean either.

Punishing a guilty nation with cruelty does not make the punisher innocent.

The repeated phrase "even with you" pushes that point hard.

⚖️ Judah's guilt is not the issue here

🪞 Oded turns the mirror on Israel

🔁 Even with you repeats for emphasis

📖 Punishing sin with sin is still sin

## 🕊️ Deliver The Captives Again, For The Fierce Wrath Of The LORD Is Upon You

Oded does not just diagnose the problem.

He gives a clear command, send the captives home.

He warns that God's anger is already aimed at Israel too.

Obeying this word is the only way to avoid becoming the next disaster in this chapter.

🗣️ Oded commands their release

⚠️ God's anger already threatens Israel

🕊️ Obedience is the only way out

➡️ The next section shows what they choose

# SecondChronicles 28:12-15
# 🤝 Mercy From Unlikely Hands
---
## 👥 Certain Of The Heads Of The Children Of Ephraim

Ephraim was the leading tribe of the northern kingdom, often used to represent Israel as a whole.

These were not priests or prophets.

They were tribal and civic leaders with real standing in their communities.

The text names four of them directly, Azariah, Berechiah, Jehizkiah, and Amasa.

Naming ordinary leaders like this makes their choice a matter of public record, not an anonymous act.

🏛️ Ephraim was Israel's leading tribe

👥 These were civic leaders, not prophets

📛 Four are named directly

📖 Naming them makes this accountable

## 🛑 Ye Shall Not Bring In The Captives Hither

These leaders directly overrule their own returning army.

That took real authority and real courage.

Soldiers coming home from a bloody victory expected to keep what they had taken.

Instead they were told to stop before they even reached the city.

🛑 Leaders overrule the returning army

💪 That took real courage

⚔️ Soldiers expected to keep their captives

📖 They were stopped before entering the city

## 🙏 For Whereas We Have Offended Against The LORD Already

These leaders admit their own nation's guilt openly.

They are not claiming Israel is innocent.

They are saying Israel cannot afford to add a worse sin on top of an existing one.

That kind of honesty is rare from a winning army.

🙏 The leaders admit their own guilt

🚫 They refuse to add to it

🏆 This is a winning army speaking

📖 Honesty here is genuinely rare

## 🧺 Clothed All That Were Naked, And Gave Them To Eat And To Drink, And Anointed Them

These leaders did more than release the captives.

They personally cared for them.

They clothed those who had nothing to wear.

They fed the hungry and gave them something to drink.

They also rubbed oil on the captives' skin for basic comfort.

That kind of anointing was simple physical care, not a religious ritual.

🤲 Care went beyond just letting them go

🧺 Clothing covered a basic need

🍞 Food and drink met their hunger

📖 Anointing meant simple comfort, not ritual

## 🐴 Carried All The Feeble Of Them Upon Asses, And Brought Them To Jericho, The City Of Palm Trees

The weakest captives could not walk the whole way home.

They were carried on donkeys instead.

Jericho was known across the Bible as "the city of palm trees."

That nickname goes back to the book of Deuteronomy.

Jericho sat close to the border with Judah.

That made it a natural place to hand the captives back to their own people.

🐴 The weak were carried on donkeys

🌴 Jericho's nickname was city of palm trees

🗺️ Jericho sat near Judah's border

📖 Captives were returned to their own people

# SecondChronicles 28:16-21
# 😰 An Alliance That Made Things Worse
---
## 🆘 Send Unto The Kings Of Assyria To Help Him

Ahaz is under attack from every direction in this chapter.

Instead of turning back to God, he turns to a foreign empire for rescue.

Assyria was the rising superpower of the region at this time.

This decision looks practical on the surface.

The rest of this section shows it was actually a serious mistake.

🆘 Ahaz seeks Assyria's help

🙏 He does not turn back to God

🏛️ Assyria was the rising superpower

📖 This choice backfires badly

## 👨‍👦 The Edomites Had Come And Smitten Judah, And Carried Away Captives

Edom was a nation descended from Esau, Jacob's brother.

Edom and Judah had a long history of conflict.

Judah's weakness after the losses to Syria and Israel invited this new attack.

One nation's collapse often draws in more than one enemy.

👨‍👦 Edom descended from Esau

⚔️ Edom and Judah were longtime rivals

📉 Weakness invited a new attack

📖 One collapse draws more enemies

## 🌊 The Philistines Also Had Invaded The Cities Of The Low Country

The Philistines were Judah's longtime enemies along the western coast.

"The low country" refers to the Shephelah, the rolling foothills between the coast and Judah's mountains.

The Philistines captured several named towns there, including Bethshemesh, Ajalon, and Gederoth.

They also took Shocho, Timnah, and Gimzo, along with the small villages around each one.

This was not a raid.

It was a permanent land grab while Judah was too weak to respond.

🌊 Philistines attacked from the west

🗺️ Low country means the Shephelah foothills

🏘️ Six towns were captured and settled

📖 This was a land grab, not a raid

## 📉 The LORD Brought Judah Low Because Of Ahaz

The text does not blame geopolitics alone for Judah's collapse.

It states plainly that God brought this low point about.

This verse also calls Ahaz "king of Israel," even though he ruled Judah.

Many scholars believe this labels him as acting like Israel's wicked kings rather than naming the wrong nation.

The point either way is the same, Ahaz led like the kings Chronicles condemns.

📉 God is named as the cause

👑 Ahaz is oddly called king of Israel

🤔 Many scholars read this as an insult

📖 Ahaz led like the condemned kings

## 📜 Tilgathpilneser King Of Assyria Came Unto Him, But Strengthened Him Not

Tilgathpilneser is another spelling of Tiglathpileser, a real Assyrian king known from history outside the Bible.

Ahaz paid heavily for this king's help.

Assyria's army did arrive.

It did not actually make Judah stronger.

The ally Ahaz was counting on left him worse off than before.

📜 Tilgathpilneser is a real historical king

💰 Ahaz paid heavily for his help

🚫 Assyria did not strengthen Judah

📖 The ally left him worse off

## 💰 Ahaz Took Away A Portion Out Of The House Of The LORD

Ahaz stripped treasure from the temple to pay off Assyria.

He also took from his own palace and from his officials.

None of it worked.

The next verse repeats plainly that Assyria still did not help him.

Emptying God's house for that political deal was a serious step.

The deal failed anyway, and worse choices about the temple are still coming.

💰 Ahaz stripped temple treasure

🏛️ He also emptied his own palace

🚫 None of it actually helped

➡️ Worse choices about the temple are coming

# SecondChronicles 28:22-27
# 🚪 Shutting The Doors Of The Lord's House
---
## 😣 In The Time Of His Distress Did He Trespass Yet More

Pressure reveals what someone actually believes.

Some kings in Chronicles turn back to God when trouble hits.

Ahaz does the opposite here.

His response to crisis is more idolatry, not less.

The worse things get, the further he runs from God.

😣 Distress reveals real belief

🔁 Some kings turn back to God then

❌ Ahaz turns further away instead

📖 Crisis exposed what he really trusted

## ✋ This Is That King Ahaz

This line interrupts the story to point directly at Ahaz by name.

Chronicles rarely stops to add a line like this.

It reads almost like the narrator cannot stay silent any longer.

The phrase marks Ahaz as a byword for failure, not just one king among many.

✋ The narrator interrupts the story

📛 Ahaz is named directly again

😤 It reads like open disapproval

📖 Ahaz becomes a byword for failure

## 🙇 Sacrificed Unto The Gods Of Damascus, Which Smote Him

Ahaz worships the very gods credited with defeating him.

His reasoning follows a common ancient belief, that a god's help explains a victory.

He assumes serving Syria's gods will win their favor for himself too.

The next line shows exactly how wrong that reasoning was.

🙇 Ahaz worships his enemy's gods

🤔 He assumes their gods caused his defeat

🎯 He hopes for their favor instead

📖 The next verse proves him wrong

## ⚖️ But They Were The Ruin Of Him, And Of All Israel

The narrator states the verdict plainly here.

Ahaz did not gain anything from this new worship.

It ruined him personally.

It also damaged the whole nation, not just the king.

Bad leadership rarely stays contained to the leader alone.

⚖️ The narrator states the verdict

💔 Ahaz gained nothing from this

🇮🇱 The whole nation was harmed too

📖 Bad leadership rarely stays contained

## 🏺 Cut In Pieces The Vessels Of The House Of God

Temple vessels were the sacred bowls, basins, and tools used in daily worship.

Cutting them into pieces made them useless for that purpose.

This was not theft for profit.

It was a direct attack on the ability to worship God at all.

Hezekiah will have to replace and restore these very vessels in the chapters just ahead.

🏺 Vessels were sacred worship tools

🔨 Cutting them made worship impossible

🎯 This targeted worship itself

➡️ Hezekiah must restore them later

## 🚪 Shut Up The Doors Of The House Of The LORD

This is not a small gesture.

Ahaz physically closed the temple to stop worship there completely.

No king of Judah before him had gone this far.

The center of the nation's relationship with God simply stopped functioning.

🚪 Ahaz closes the temple completely

🛑 No earlier king went this far

🏛️ Worship there simply stopped

📖 This is the chapter's low point

## 🔥 He Made Him Altars In Every Corner Of Jerusalem

Judah's law allowed exactly one legitimate place to sacrifice, the temple.

Ahaz replaces that one place with many.

Altars now sit on street corners across the capital city.

Idolatry becomes something a person could stumble into anywhere in Jerusalem, not one place someone had to seek out.

🔥 Many altars replace the one temple

🏙️ They spread across Jerusalem itself

🚶 Idolatry becomes impossible to avoid

📖 One true place became many false ones

## 🗿 They Brought Him Not Into The Sepulchres Of The Kings

Kings of Judah were normally buried in a special royal tomb.

Uzziah and Jotham, the two kings before Ahaz, were both buried with that honor or close to it.

Ahaz is buried in Jerusalem, but not among the other kings.

This final detail acts as the last verdict on his entire reign.

👑 Royal burial was normally an honor

🗿 Uzziah and Jotham received it

🚫 Ahaz is denied that same honor

📖 Burial becomes his final verdict

## 👑 Hezekiah His Son Reigned In His Stead

"In his stead" means Hezekiah took the throne in his father's place.

Hezekiah becomes one of the most faithful kings in the entire book of Chronicles.

He will reopen the very doors his father shut.

The darkest chapter about Judah's kings so far ends by pointing straight at its brightest turnaround.

👑 Hezekiah takes the throne next

🚪 He will reopen the temple doors

🌟 He becomes one of Judah's best kings

📖 Darkness here sets up a turnaround
`.trim();

export const SECOND_CHRONICLES_TWENTY_EIGHT_PERSONAL_SECTIONS = parseSecondChroniclesTwentyEightRawNotes(
  SECOND_CHRONICLES_TWENTY_EIGHT_RAW_NOTES,
);
