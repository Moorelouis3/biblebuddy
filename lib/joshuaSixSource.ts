export type JoshuaSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaSixRawNotes(rawText: string): JoshuaSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 6:${startVerse}` : `Joshua 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Joshua 6 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_SIX_RAW_NOTES = `# Joshua 6:1-5
# 🔒 Jericho Sealed Shut Before The Battle Begins
---
## 🔒 Straitly Shut Up

Straitly means completely, with no exception at all.

Jericho had locked every gate against the army camped outside.

No one went out and no one came in, not even to trade.

The whole city already lived in constant fear before a single arrow flew.

Fear, not weapons, was already doing half of the LORD's work.

🔒 Straitly means completely, without exception

🏰 Jericho was sealed on every side

🚪 No one entered or left at all

📖 Fear worked before the battle began

## 👑 The King Thereof, And The Mighty Men Of Valour

The LORD speaks of Jericho as already conquered before the siege begins.

Valour is an old word for courage and skill in battle.

The mighty men of valour were the city's most dangerous soldiers.

God names the king and the toughest fighters in the same promise.

Nothing about Jericho's defenses is left out of what God has already given.

👑 God speaks of Jericho as already won

⚔️ Valour means courage and skill in battle

🛡️ The mighty men were Jericho's toughest fighters

📖 Nothing about Jericho's strength is left out

## 🔄 Go Round About The City Once

Compass means to walk completely around something, not to attack it directly.

For six straight days, Israel's army did nothing but march in a circle.

No weapon was drawn and no shout was raised during these six days.

This was not a normal siege with ladders, battering rams, or arrows.

Obedience looked like patience long before it looked like victory.

🔄 Compass means to walk completely around

🚶 Israel marched, they did not attack

🤐 No weapon or shout for six days

📖 Obedience came before victory, not after

## 🐏 Seven Priests Shall Bear Seven Trumpets Of Rams' Horns

These trumpets were rams' horns, the same instrument known today as a shofar.

A shofar was normally blown to call Israel to worship or to war.

Here the priests carried it while marching, not while standing still.

Seven priests and seven trumpets tie this event to the number of completeness.

Worship and warfare are joined together in this one command.

🐏 Rams' horns are what we call a shofar

📯 A shofar called Israel to worship or war

🔢 Seven priests, seven trumpets, the number of completeness

📖 Worship and warfare are joined here

## 📅 The Seventh Day Ye Shall Compass The City Seven Times

This verse announces the seventh day's plan before the first day has even happened.

Six days bring one circuit each, then the seventh day brings seven circuits alone.

Thirteen total trips around the city, all before a single stone falls.

The number seven again marks this as the day everything changes.

God had already scheduled Jericho's fall before Israel took a single step.

📅 The seventh day's plan comes first

🔁 Six days, one circuit, then seven more

🔢 Thirteen total circuits before the wall falls

📖 God scheduled the fall in advance

## 📜 The Wall Of The City Shall Fall Down Flat

This is a promise, spoken days before Israel ever raises a shout.

The people are told exactly what will happen and exactly how it will happen.

No battering ram or siege tower is ever mentioned in this plan.

The wall's collapse is presented as a certainty, not a hope.

Israel is being asked to trust a promise before they see any proof.

📜 This is a promise, not a report

🔮 Israel is told the outcome in advance

🚫 No siege tower or battering ram is used

📖 Trust comes before the proof does

# Joshua 6:6-9
# 📯 The Priests Lead The Procession
---
## 📦 Take Up The Ark Of The Covenant

Joshua gathers the priests before giving the people any instructions at all.

The ark of the covenant held the stone tablets of God's law.

Carrying the ark meant carrying God's own presence at the front of the march.

This same ark had already led Israel safely across the Jordan River.

Every part of this plan centers on the ark, not on Israel's army.

📦 The ark held the tablets of the law

✝️ Carrying it meant carrying God's presence

🌊 This ark already led them across the Jordan

📖 The ark leads, not the army

## 🚶 Let Him That Is Armed Pass On Before The Ark

Pass on simply means to move forward, to begin marching.

Armed men marched ahead of the ark, not behind it.

They were acting as a guard, not attackers.

Their swords stayed sheathed for all six days of marching.

Being ready to fight is not the same as fighting.

🚶 Pass on means to move forward

🛡️ Armed men marched ahead as a guard

⚔️ Their swords stayed sheathed the whole time

📖 Being ready to fight is not fighting

## 🔁 The Ark Of The Covenant Of The Lord Followed Them

This verse repeats the marching order almost word for word from before.

Repetition in the Bible is often a sign of importance, not carelessness.

The ark followed the priests and their trumpets, right at the center.

Everyone else took their place around this one object.

The whole procession was built around where the ark stood.

🔁 Repetition here signals importance

📦 The ark stayed at the center

🚶 Everyone else took a place around it

📖 The procession was built around the ark

## 🔤 The Rereward Came After The Ark

Rereward is an old word for the rear guard, the group marching last.

Every part of the order is now accounted for, front to back.

Armed men led the way, and the ark came next.

The rereward followed at the very end of the line.

Order itself was part of the obedience God asked for.

🔤 Rereward means the rear guard

📋 Every position is now accounted for

🚶 Armed men led, the ark followed

📖 Order itself was part of the obedience

# Joshua 6:10-11
# 🤫 Silence Until The Command To Shout
---
## 🤫 Ye Shall Not Shout, Nor Make Any Noise

Joshua orders complete silence except for the sound of the trumpets themselves.

No shouting, no talking, not even a single word was allowed.

This kind of discipline is unusual for an army marching toward a battle.

The silence made the final shout, when it finally came, unmistakable.

Israel had to trust the plan even when it made no sense yet.

🤫 Complete silence was commanded, trumpets excepted

🗣️ Not even one word was allowed

⏳ The silence built toward one final shout

📖 Trust came before understanding here

## 🏕️ They Came Into The Camp, And Lodged In The Camp

The first day's march ends exactly where it began, back at the camp.

No wall fell and nothing visibly changed after this first circuit.

Six more days like this one still lay ahead of them.

Faith here meant repeating an act that looked pointless from the outside.

Nothing about day one proved the promise was working yet.

🏕️ Day one ended right back at camp

👀 Nothing visibly changed after this circuit

🔁 Six more days like it remained

📖 Faith meant repeating what looked pointless

# Joshua 6:12-14
# 🌅 Six Days, The Same Every Time
---
## 🌅 Joshua Rose Early In The Morning

Rising early becomes a small detail that repeats through the rest of the story.

Joshua does not wait for the army to be ready, he leads first.

This same habit shows up again on the seventh and final day.

A leader's discipline in small things often shapes the discipline of everyone following him.

Six days of early mornings built toward one extraordinary day.

🌅 Rising early becomes a repeated detail

👣 Joshua leads first, before the army

🔁 This habit returns on day seven

📖 Small discipline shaped the whole outcome

## ⏱️ Went On Continually, And Blew With The Trumpets

Continually means without stopping, from the very start of the march to its end.

The trumpets sounded the whole time, not just at the beginning or end.

This steady, unbroken sound filled the six days of otherwise complete silence.

Only the priests' trumpets were allowed to make any noise at all.

The sound itself became a constant reminder that God was present in the march.

⏱️ Continually means without stopping at all

📯 Trumpets sounded through the whole march

🤐 Only the priests were allowed to sound

📖 The trumpets reminded them God was present

## 🔁 So They Did Six Days

The exact same procedure repeats without a single change for six straight days.

Nothing about the plan gets easier or shorter as the days pass.

Repeating an unusual command daily takes more discipline than doing it once.

The text stays brief on purpose because nothing new happens yet.

Everything changes on the seventh day, but not before it.

🔁 The same plan repeats for six days

⏳ Nothing gets shorter or easier

💪 Repetition here takes real discipline

📖 Day seven changes everything

# Joshua 6:15-19
# 🔥 The City Devoted To The Lord
---
## 🔢 They Compassed The City Seven Times

The seventh day breaks the pattern that repeated for six straight days before it.

Instead of one circuit, Israel marches around the city seven times in a row.

Seven again marks this day as complete, finished, and set apart from the rest.

This is by far the longest and most demanding march of the whole week.

Everything the previous six days built toward comes to a head today.

🔢 Seven circuits break the six day pattern

🏁 This is the longest march of the week

✅ Seven marks the day as complete

📖 Everything builds toward this one day

## ⏰ Shout, For The Lord Hath Given You The City

Joshua times this command to the exact moment the priests finish the seventh trumpet blast.

The city is described as already given, even though the walls are still standing.

Israel's shout does not cause the miracle, it only responds to what God already decided.

Obedience and God's power work together here.

Timing mattered as much as the shout itself.

⏰ Joshua times the shout precisely

🎁 The city is called already given

🙌 The shout responds, it does not cause

📖 Obedience and power worked together

## 🔥 The City Shall Be Accursed

Accursed here translates an old word meaning devoted entirely to the LORD for destruction.

Jericho is not treated as ordinary plunder for Israel's army to keep.

The whole city, people and property alike, belongs to God alone in this command.

This same idea appears elsewhere in the Old Testament as a rule for holy war.

Jericho becomes something closer to an offering than a conquest.

🔥 Accursed means devoted to the Lord for destruction

🚫 Jericho was not ordinary plunder

🙏 The whole city belonged to God alone

📖 Jericho was an offering, not a conquest

## 🕊️ Only Rahab The Harlot Shall Live

Rahab hid the two spies back in chapter two of this same book.

In exchange, the spies swore an oath to keep her and her family safe.

Joshua now repeats that promise publicly, in front of the whole army.

Everyone inside the accursed city dies except the one household that showed faith.

A promise made privately in chapter two now holds firm in front of everyone.

🕊️ Rahab hid the spies in chapter two

🤝 The spies swore an oath to protect her

🏠 Her household survives what no one else does

📖 A private promise held firm publicly

## ⚠️ Keep Yourselves From The Accursed Thing

This is a warning aimed directly at Israel's own soldiers, not at Jericho.

Taking anything devoted to the LORD would make the person who takes it accursed too.

Worse, it would bring trouble on the whole camp of Israel, not just one man.

The very next chapter shows exactly what happens when this warning is ignored.

One person's greed here is treated as a danger to the entire nation.

⚠️ This warning targets Israel's own soldiers

🚫 Taking the accursed thing spreads the curse

🏕️ One person's sin could trouble the whole camp

📖 The next chapter shows this warning ignored

## ✨ Consecrated Unto The Lord

Consecrated means set apart for a sacred purpose, not available for ordinary use.

Silver, gold, brass, and iron were the only things spared from total destruction.

These metals went into the treasury of the LORD instead of any soldier's pocket.

Even inside a city devoted to destruction, some things were set apart differently.

Not everything accursed was treated exactly the same way.

✨ Consecrated means set apart for a sacred use

💰 Silver, gold, brass, and iron were spared

🏛️ These metals went into the Lord's treasury

📖 Even destruction had its own careful order

# Joshua 6:20-21
# 🧱 The Wall Falls, The City Falls
---
## 📜 The Wall Fell Down Flat

This is the exact promise from verse five, now finally fulfilled in real time.

No battering ram, no siege engine, and no hand touched the wall itself.

The shout and the trumpets came first, and only then did the wall fall.

Six days of silent obedience finally met one moment of collapse.

The promise and the fulfillment use almost the same words on purpose.

📜 This fulfills the promise from verse five

🚫 No weapon or hand touched the wall

🙌 The shout came first, the collapse followed

📖 Promise and fulfillment share the same words

## 🧱 Every Man Straight Before Him

Once the wall was down, each soldier climbed up right where he was standing.

No one needed to run around searching for a gap or an opening.

The entire flattened wall became one giant entrance into the city at once.

This detail shows just how complete the collapse actually was.

Every soldier could enter Jericho from wherever he happened to stand.

🧱 The whole wall came down at once

🚶 Each soldier climbed up where he stood

🚪 The flattened wall became one giant entrance

📖 The collapse was total, not partial

## 🔥 They Utterly Destroyed All That Was In The City

Utterly destroyed translates the same word behind Jericho's accursed status from verse seventeen.

This judgment reached every person and every animal inside the city walls.

Only Rahab's household, already promised safety, was excluded from this destruction.

The scale of it matches how completely the city had been devoted to the LORD.

Jericho's fall was as total as the command that ordered it.

🔥 Utterly destroyed matches the earlier accursed word

👥 The judgment reached every person and animal

🏠 Only Rahab's household was excluded

📖 The destruction matched the command exactly

# Joshua 6:22-25
# 🕊️ Rahab Kept Safe As Promised
---
## 🕵️ Go Into The Harlot's House

Joshua sends the same two spies from chapter two back to keep their word.

These were the exact men Rahab had helped escape out of Jericho earlier.

Sending the original spies made sure Rahab would be recognized and believed.

A promise made in secret now gets carried out in the middle of a battle.

Keeping an oath mattered even during the chaos of the city's fall.

🕵️ Joshua sent the same two spies back

🏠 They were the men Rahab had helped

🤝 Sending them kept the promise recognizable

📖 An oath mattered even during the battle

## 🏕️ Left Them Without The Camp Of Israel

Rahab and her family were placed just outside Israel's camp, not inside it yet.

Being a Canaanite, she was not yet ritually clean enough to camp with Israel.

This was a temporary placement, not a rejection of the promise made to her.

Her full acceptance into Israel would take time and further steps afterward.

Safety came immediately, but belonging fully still had to wait.

🏕️ Rahab's family camped just outside Israel's camp

🧼 She was not yet ritually clean to enter

⏳ This placement was temporary, not a rejection

📖 Safety came first, full belonging came later

## 🔥 They Burnt The City With Fire

Fire finished what the trumpets and the shout had already started.

Everything in Jericho went up in flames except the metals named earlier.

Burning a city this completely left nothing behind to rebuild from quickly.

This total destruction matches the accursed status the city carried from the start.

Jericho did not just fall, it was erased.

🔥 Fire finished what the shout started

🏚️ Everything burned except the named metals

💨 Nothing was left to rebuild from quickly

📖 Jericho was not just defeated, it was erased

## 📖 She Dwelleth In Israel Even Unto This Day

This phrase tells the reader Rahab's story kept going long after Jericho's fall.

Dwelleth simply means lives, using an older form of the word.

Rahab, once a Canaanite outsider, became a permanent part of Israel's story.

The book of Matthew later names her directly in the family line of Jesus.

One act of faith carried her from Jericho's wall into a much larger story.

📖 Dwelleth is an old word for lives

🏡 Rahab became a permanent part of Israel

👑 Matthew later names her in Jesus' family line

➡️ One act of faith reached far beyond Jericho

# Joshua 6:26-27
# ⚔️ A Curse On Whoever Rebuilds Jericho
---
## 🔏 Cursed Be The Man Before The Lord

Adjured means Joshua placed this curse under a solemn, binding oath.

The curse targets anyone who ever tries to rebuild Jericho as a city.

Jericho was meant to stay a ruin as a permanent reminder of this day.

Cursed here means placed under God's judgment, not simply insulted or disliked.

Joshua was not just predicting the future, he was pronouncing a formal sentence.

🔏 Adjured means placed under a solemn oath

🏚️ The curse targets anyone who rebuilds Jericho

🪦 Jericho was meant to stay a permanent ruin

📖 Joshua pronounced a formal sentence, not a guess

## 👶 He Shall Lay The Foundation Thereof In His Firstborn

This names the specific cost of breaking Joshua's curse, generations before it happens.

Laying the foundation in his firstborn means that son would die during the building.

The curse does not explain exactly how, only that it will happen.

Centuries later, the book of Kings records a man named Hiel doing exactly this.

Hiel rebuilt Jericho and lost his firstborn son just as this verse warned.

👶 The curse names a father's firstborn son

🏗️ That son would die during the rebuilding

📜 The text does not explain the method

📖 Hiel of Bethel fulfilled this centuries later

## 🚪 In His Youngest Son Shall He Set Up The Gates

The curse has two parts, one for the foundation and one for the gates.

Setting up the gates was the last stage of finishing a fortified city.

Losing the youngest son here means the curse followed the entire building project.

From the very first stone to the very last gate, the cost stayed the same.

The rebuilder would lose sons at both the start and the finish.

🚪 The gates mark the building's final stage

👶 A second son is named in the curse

🏗️ The curse covers the whole project

📖 Loss bookended the rebuilder's entire effort

## 📢 His Fame Was Noised Throughout All The Country

This closing line answers the promise God gave Joshua back in chapter three.

God had promised to magnify Joshua in the sight of all Israel.

Now that reputation spreads even further, into the surrounding nations themselves.

Jericho's fall became the story that introduced Joshua to the whole land.

One obedient battle changed how every nation nearby now saw Israel's new leader.

📢 This fulfills God's promise from chapter three

🌍 Joshua's reputation now spreads beyond Israel

🏆 Jericho's fall introduced Joshua to the land

➡️ One battle reshaped how nations saw him
`.trim();

export const JOSHUA_SIX_PERSONAL_SECTIONS = parseJoshuaSixRawNotes(JOSHUA_SIX_RAW_NOTES);
