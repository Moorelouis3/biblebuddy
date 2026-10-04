export type HoseaFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHoseaFiveRawNotes(rawText: string): HoseaFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HoseaFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hosea\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hosea 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hosea\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Hosea\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hosea 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hosea 5:${startVerse}` : `Hosea 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Hosea 5 sections, received " + sections.length);
  }

  return sections;
}

const HOSEA_FIVE_RAW_NOTES = `# Hosea 5:1-3
# 🎯 Judgment Falls On Priest And King
---
## 👂 Hear Ye This, O Priests

This verse addresses three separate groups together.

Priests led the nation's worship.

House of Israel means the common people.

House of the king points to the royal court.

👂 Three groups are named here together
⛪ Priests led the nation's worship
👑 House of the king means the royal court
📖 No group can escape this judgment

## ⚖️ Judgment Is Toward You

Judgment here means a legal sentence about to be carried out.

This same word opened Hosea chapter four as a formal charge.

The leaders assumed their position would protect them from blame.

Instead the text says judgment is aimed straight at them.

Being a priest or a king never earns an exemption.

⚖️ Judgment means a legal sentence here
🔁 This recalls the charge from chapter four
👑 Leaders assumed their rank would protect them
📖 No position earns an exemption from judgment

## 🏔️ A Snare On Mizpah, And A Net Spread Upon Tabor

Mizpah and Tabor were two known high places in Israel.

Leaders likely used these sites to trap travelers headed to worship there.

A snare and a net are both tools built to catch prey.

Worship itself had become a hunting ground for these leaders.

🏔️ Mizpah and Tabor were known high places
🪤 A snare and net both trap prey
😈 Leaders preyed on people headed to worship
📖 Worship itself became a hunting ground

## 😈 The Revolters Are Profound To Make Slaughter

Revolters means people who turned away from God on purpose.

Profound in this verse means skilled, not deep like water.

These leaders had become experts at violence, not beginners stumbling into it.

Practice had turned their sin into a trained skill.

😈 Revolters means those who turned from God
🎯 Profound means skilled, not literally deep
⚔️ These leaders had become experts at violence
📖 Practice made their sin a trained skill

## 📢 Though I Have Been A Rebuker Of Them All

Rebuker means someone who corrects and warns before judgment falls.

God says He already tried to correct every single one of them.

The warning came first, and judgment only followed after it was ignored.

This verse closes the loop on any claim that God acted without warning.

📢 Rebuker means one who warns before judgment
⏳ God had already tried correcting them all
➡️ Warning always came before judgment fell
📖 God never judged without warning first

## 👁️ I Know Ephraim, And Israel Is Not Hid From Me

This line claims complete knowledge, not guesswork or rumor.

Ephraim and Israel are two names for the same northern kingdom.

Nothing the nation did in secret escaped God's sight.

Hidden sin is still fully visible to Him.

👁️ God claims complete knowledge, not guesswork
🏞️ Ephraim and Israel name the same kingdom
🙈 Nothing done in secret escaped God
📖 Hidden sin is still visible to Him

## 💔 Thou Committest Whoredom, And Israel Is Defiled

Whoredom in Hosea almost always pictures worshipping other gods.

Defiled means made ritually and morally unclean, unfit to approach God.

The marriage image from earlier chapters stands behind this accusation.

Israel had broken covenant loyalty the same way an unfaithful spouse would.

💔 Whoredom here pictures worshipping other gods
🚫 Defiled means unclean, unfit to approach God
💍 This recalls the marriage image in Hosea
📖 Israel broke covenant like an unfaithful spouse

# Hosea 5:4-7
# 🚶 Seeking God Without Finding Him
---
## 🏗️ They Will Not Frame Their Doings To Turn Unto Their God

Frame here means to shape or direct, like framing a house.

Their actions were never shaped toward turning back to God.

This was not a single failure but a whole way of living.

Every habit in their life pointed away from Him instead.

🏗️ Frame means to shape or direct
🧭 Actions never turned them back to God
🔁 This was a pattern, not one failure
📖 Every habit pointed away from God

## 🌀 The Spirit Of Whoredoms Is In The Midst Of Them

This same phrase already appeared back in Hosea chapter four.

It describes a whole mindset bent toward chasing false gods.

Repeating the phrase shows the problem had not improved at all.

The nation was still stuck in the exact same condition.

🔁 This phrase already appeared in chapter four
🌀 It describes a mindset bent toward false gods
😔 Repeating it shows no improvement occurred
📖 The nation stayed stuck in the same place

## ❤️ They Have Not Known The LORD

Known here means a close, personal relationship, not simple facts.

This exact charge already appeared in chapter four as the root problem.

A nation can perform religious rituals and still miss this kind of knowing.

The whole chapter keeps circling back to this one missing piece.

❤️ Known means close relationship, not facts
🔁 This charge already appeared in chapter four
🛐 Rituals alone can still miss real knowing
📖 This missing piece keeps resurfacing here

## ⚖️ The Pride Of Israel Doth Testify To His Face

Testify means to give evidence, like a witness in court.

Israel's own pride becomes the witness that convicts the nation.

No outside accuser is even needed here.

The nation's own attitude proves the case against itself.

⚖️ Testify means giving evidence like a witness
💔 Israel's own pride becomes that witness
🙅 No outside accuser was even needed
📖 Their own pride proved the case

## 🏞️ Judah Also Shall Fall With Them

Judah was the separate southern kingdom, not part of Israel's ten tribes.

Earlier in Hosea, Judah was warned not to copy Israel's sin.

Here that warning has already failed to take hold.

Both kingdoms now fall together under the same charge.

🏞️ Judah was the separate southern kingdom
⚠️ Judah was warned not to copy Israel
😔 That warning had already failed here
📖 Both kingdoms now fall under one charge

## 🐑 They Shall Go With Their Flocks And With Their Herds To Seek The LORD

Flocks and herds here mean the animals brought for sacrifice.

The people were still showing up to offer sacrifices at the temple.

Outward religious activity had not stopped at all.

The problem was never a lack of ritual or offerings.

🐑 Flocks and herds mean sacrificial animals
🛐 People still showed up to offer sacrifices
✅ Outward religion had not stopped here
📖 The problem was never missing ritual

## 🚶 He Hath Withdrawn Himself From Them

Withdrawn pictures God stepping back from active closeness with His people.

This does not mean God stopped existing or stopped ruling.

It means the relationship itself had been broken by their choices.

Sacrifices offered without real devotion could not call Him back.

🚶 Withdrawn means God stepping back from closeness
🙅 This does not mean God stopped ruling
💔 Their choices broke the relationship itself
📖 Empty sacrifice could not call Him back

## 👶 They Have Begotten Strange Children

Strange here means children raised apart from devotion to the LORD.

Some of these children may have come from marriage to foreign worshippers of other gods.

Others may simply have grown up never taught to know Him.

Either way, the next generation was already drifting before it began.

👶 Strange means raised apart from the LORD
🌍 Some came from marriage to foreign worshippers
📚 Others simply were never taught of Him
📖 The next generation was drifting already

## 📅 Now Shall A Month Devour Them With Their Portions

A month here pictures a short, specific span of time.

Devour means judgment will consume them completely, not just slow them down.

Portions likely refers to their land, crops, or shares of inheritance.

Disaster would arrive fast and would not leave much behind.

📅 A month pictures a short span of time
🔥 Devour means complete consuming judgment
🌾 Portions likely means land, crops, or inheritance
📖 Disaster would arrive fast and total

# Hosea 5:8-10
# 📯 Sound The Alarm In Benjamin
---
## 📯 Blow Ye The Cornet In Gibeah, And The Trumpet In Ramah

A cornet and a trumpet were both horns used to sound an alarm.

Gibeah and Ramah were towns inside the territory of Benjamin.

Sounding horns in both towns meant an invasion warning was spreading fast.

This was the ancient version of a citywide emergency alert.

📯 Cornet and trumpet were alarm horns
🏘️ Gibeah and Ramah sat inside Benjamin
🚨 Horns in both towns spread the warning
📖 This worked like an ancient emergency alert

## 🏠 Cry Aloud At Bethaven, After Thee, O Benjamin

Bethaven is a mocking nickname that swaps the meaning of Bethel.

Bethel means house of God, but Bethaven means house of trouble.

After thee pictures an enemy army coming up right behind Benjamin.

The warning cry and the place name both point to disaster closing in.

🏠 Bethaven mocks Bethel, house of God
😈 Bethaven instead means house of trouble
🏃 After thee means an enemy closing in
📖 The name itself points to disaster

## 🏚️ Ephraim Shall Be Desolate In The Day Of Rebuke

Desolate means emptied out, left with no people or life remaining.

Day of rebuke points to a specific coming day of judgment.

This was certain, not a vague threat.

Ephraim's whole land and people were at stake here.

🏚️ Desolate means emptied of people and life
📅 Day of rebuke means a coming judgment
🎯 This was certain, not a vague threat
📖 Ephraim's whole land and people were at stake

## 📢 Among The Tribes Of Israel Have I Made Known That Which Shall Surely Be

Made known means God announced this judgment publicly ahead of time.

No tribe in Israel could later claim they never heard the warning.

Surely be underlines that this outcome was certain, not just possible.

Prophecy here functions as advance notice, not a vague guess.

📢 Made known means announced ahead of time
🙅 No tribe could claim it never heard
✅ Surely be means certain, not possible
📖 Prophecy here works as advance notice

## 🪨 The Princes Of Judah Were Like Them That Remove The Bound

Removing the bound meant moving a boundary stone to steal land.

This specific sin was directly forbidden back in the law of Moses.

Judah's own leaders were acting like common land thieves.

Even the ruling class had turned to open theft.

🪨 Removing the bound meant stealing land
📜 This sin broke the law of Moses
👑 Judah's leaders acted like common thieves
📖 Even the ruling class turned to theft

## 🌊 I Will Pour Out My Wrath Upon Them Like Water

Water here pictures a flood, not a gentle trickle.

Wrath poured out like water means sudden, overwhelming, unstoppable judgment.

There is no small warning left to give, only the flood itself.

The same God who once flooded the earth now floods it with judgment.

🌊 Water here pictures a flood
⚡ This means sudden, unstoppable judgment
🚫 No small warning was left to give
📖 Judgment comes now like a flood

# Hosea 5:11-13
# 🦷 A Wound Assyria Cannot Heal
---
## ⚖️ Ephraim Is Oppressed And Broken In Judgment

Oppressed and broken both describe the crushing weight of this judgment.

This is not a minor setback but a complete collapse.

The judgment described earlier in the chapter has now landed.

Ephraim's strength and standing are both gone.

⚖️ Oppressed and broken describe crushing judgment
💥 This is total collapse, not a setback
🔁 Earlier judgment in the chapter has landed
📖 Ephraim's strength and standing are gone

## ❓ He Willingly Walked After The Commandment

Scholars disagree about exactly what commandment this verse means.

Many believe it points to following manmade religious rules instead of God's law.

Others connect it to chasing after idols set up by Israel's own kings.

Either reading agrees that the choice to follow it was Ephraim's own.

❓ Scholars disagree on this exact commandment
📜 Many think it means manmade religious rules
🗿 Others connect it to following local idols
📖 Either way, Ephraim chose this path willingly

## 🦋 I Will Be Unto Ephraim As A Moth

A moth slowly eats away at cloth, barely noticed until the damage is done.

This pictures judgment as a slow, quiet process, not a single blow.

By the time anyone notices, the damage is already serious.

God's judgment here works gradually, not all at once.

🦋 A moth eats cloth slowly, unnoticed at first
🐌 Judgment here moves slow, not sudden
👀 Damage was already serious before anyone noticed
📖 God's judgment can work gradually, not instantly

## 🍂 To The House Of Judah As Rottenness

Rottenness pictures decay working from the inside out.

Unlike a moth eating from outside, rot spreads from within the material itself.

Judah's corruption was not an outside attack but an internal collapse.

Both images show judgment that creeps, not one that strikes suddenly.

🍂 Rottenness means decay from the inside
🦋 Unlike the moth, rot spreads from within
💥 Judah's collapse came from within, not outside
📖 Both images show judgment that creeps in

## 🤕 When Ephraim Saw His Sickness, And Judah Saw His Wound

Sickness and wound both picture the damage caused by the sins named earlier.

Both kingdoms could see something was seriously wrong with them.

Seeing a problem is not repenting of it.

Ephraim and Judah saw the symptom but chased the wrong cure.

🤕 Sickness and wound picture damage from sin
👀 Both kingdoms could see something was wrong
🙅 Seeing a problem is not repenting
📖 They saw the symptom, not the cure

## 🏛️ Then Went Ephraim To The Assyrian, And Sent To King Jareb

Instead of turning to God, Ephraim turned to a foreign empire for help.

Assyria was the rising superpower threatening the whole region at this time.

King Jareb is likely a mocking title, meaning something like contentious king.

Seeking a human king's help became its own form of unfaithfulness.

🏛️ Ephraim turned to Assyria instead of God
⚔️ Assyria was the region's rising superpower
👑 King Jareb likely means contentious king
📖 Seeking human help became its own unfaithfulness

## 🤝 Yet Could He Not Heal You, Nor Cure You Of Your Wound

Assyria could offer soldiers, treaties, or tribute, but never real healing.

Political alliances cannot fix a spiritual problem at its root.

The wound named earlier in this section was never a physical one.

Only God could ever cure what their sin had actually broken.

🤝 Assyria offered treaties, never real healing
💔 Alliances cannot fix a spiritual problem
🩹 This wound was never a physical one
📖 Only God could cure what sin broke

# Hosea 5:14-15
# 🦁 The Lion Withdraws Until They Seek Him
---
## 🦁 I Will Be Unto Ephraim As A Lion, And As A Young Lion To The House Of Judah

The image shifts here from a slow moth to a violent lion.

A lion does not simply decay its prey, it attacks directly.

Both Ephraim and Judah now face this same fierce image together.

Judgment has moved from quiet erosion to a sudden, violent strike.

🦁 The image shifts from moth to lion
🩸 A lion attacks directly, not slowly
⚔️ Both Ephraim and Judah face this image
📖 Judgment moved from erosion to a strike

## 🗣️ I, Even I, Will Tear And Go Away

The doubled phrase, I even I, makes this personal and emphatic.

God is not delegating this judgment to anyone else.

Tear pictures a lion ripping into its prey without mercy.

Go away pictures the lion leaving with no one able to stop it.

🗣️ I even I makes this personal
🙅 God delegates this judgment to no one
🩸 Tear pictures a lion attacking its prey
📖 No one could stop the lion leaving

## 🔁 None Shall Rescue Him

This directly answers the earlier attempt to find rescue through Assyria.

No foreign king, including the one Ephraim already turned to, could help now.

The lion image makes rescue sound physically impossible, not just unlikely.

Every other option in this chapter has now closed.

🔁 This answers Ephraim's earlier plea to Assyria
🙅 No foreign king could help now
🦁 Rescue sounds physically impossible, not unlikely
📖 Every other option has now closed

## 🦁 I Will Go And Return To My Place

This continues the lion image, picturing the lion retreating to its den.

God withdraws His presence instead of staying to be ignored.

The withdrawal is not permanent, it has a clear condition attached.

God is waiting, not abandoning them forever.

🦁 This continues the lion retreating image
🚶 God withdraws instead of staying ignored
⏳ This withdrawal is not permanent
📖 God is waiting, not abandoning them

## 🙏 Till They Acknowledge Their Offence, And Seek My Face

Acknowledge means admitting the offence honestly, not just feeling bad.

Seek my face pictures coming close enough to look God in the eye again.

Everything earlier here described judgment.

This line finally offers a way home.

🙏 Acknowledge means admitting honestly, not just feeling bad
👀 Seek my face means coming close to God
⚖️ Everything earlier here described judgment
📖 This line finally offers a way home

## 😣 In Their Affliction They Will Seek Me Early

Affliction means hardship or suffering, the pain that comes from judgment.

Seek me early does not mean early in the morning.

It means seeking God urgently and eagerly, putting Him first again.

Sometimes it takes real pain before people turn back to what matters most.

😣 Affliction means hardship or suffering
⏰ Seek early does not mean morning time
🙏 It means seeking God urgently and eagerly
📖 Pain often turns people back to God
`.trim();

export const HOSEA_FIVE_PERSONAL_SECTIONS = parseHoseaFiveRawNotes(HOSEA_FIVE_RAW_NOTES);
