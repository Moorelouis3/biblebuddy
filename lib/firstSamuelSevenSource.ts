export type FirstSamuelSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelSevenRawNotes(rawText: string): FirstSamuelSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 7:${startVerse}` : `1 Samuel 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 1 Samuel 7 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_SEVEN_RAW_NOTES = `# FirstSamuel 7:1-2
# 🏠 Twenty Years At Kirjathjearim
---
## 🗺️ Fetched Up The Ark Of The LORD

Kirjathjearim was a town on a hill about nine miles from Jerusalem.

The men there volunteer to bring the ark home after the disasters in the last two chapters.

No priest gives this order.

Ordinary townspeople step forward when no one else will.

🗺️ Kirjathjearim sat about nine miles from Jerusalem

🙋 Ordinary townspeople volunteered for this

⚠️ Chapters five and six already showed the danger

➡️ Faithfulness sometimes starts with an ordinary person

## 🕯️ Sanctified Eleazar His Son To Keep The Ark

To sanctify something means to set it apart for God alone.

Abinadab's son Eleazar was given the job of guarding the ark.

This role usually belonged only to Levites, the tribe assigned to handle holy objects.

The text does not say Eleazar was a Levite.

It only says he was chosen and set apart for this one task.

🕯️ Sanctified means set apart for God

👦 Eleazar was chosen to guard the ark

✝️ Levites usually held this kind of role

📖 God can set apart anyone He chooses

## 📆 The Time Was Long, For It Was Twenty Years

Twenty years is a long time for anything to sit untouched.

The ark stayed at Kirjathjearim through the last years of the judges and into Samuel's rise as a leader.

No king ruled Israel during this whole stretch.

The nation waited that long before really turning back to God.

📆 Twenty years is a long stretch

⏳ The ark sat there the whole time

👑 No king ruled Israel yet

➡️ Israel waited years before turning back

## 😢 Lamented After The LORD

To lament means to mourn with real sorrow, not just feel a little sad.

For twenty years the ark sat far from where Israel worshiped regularly.

The whole nation finally began longing for God again instead of the gods of their neighbors.

That longing sets up everything Samuel does in the rest of this chapter.

😢 Lament means deep mourning

🕰️ Twenty years passed without real worship

🙏 Israel finally longed for God again

📖 This longing leads into Samuel's call

# FirstSamuel 7:3-4
# 🙏 Samuel Calls Israel To Repent
---
## 🔙 Return Unto The LORD With All Your Hearts

Samuel does not ask for a quick apology.

He calls for a return built on complete devotion, not half hearted regret.

This is the first time in the chapter Samuel speaks as Israel's spiritual leader.

His words set the condition for everything that follows.

🔙 Return means a complete turning back

❤️ All your hearts means full devotion

🗣️ Samuel speaks as Israel's leader here

➡️ Real repentance requires the whole heart

## 🌍 Put Away The Strange Gods And Ashtaroth

"Strange gods" means foreign gods borrowed from Israel's neighbors.

Ashtaroth was a Canaanite goddess connected to fertility and war.

Israel often worshiped her alongside the true God instead of choosing one or the other.

Samuel demands a clean break, not a shared devotion.

🌍 Strange gods means foreign idols

👑 Ashtaroth was a Canaanite goddess

🚫 Israel had mixed her worship with God's

➡️ Samuel demands a full break from both

## ❤️ Prepare Your Hearts Unto The LORD

To prepare the heart means to get ready inside, not just change outward behavior.

Samuel is asking for a real shift in loyalty, not a quick ritual fix.

Serving God only meant giving up any backup gods they still trusted.

That kind of total loyalty was rare for Israel during this whole period.

❤️ Prepare the heart means an inner change

🔄 Not just an outward ritual fix

🙏 Serve him only means total loyalty

📖 Total loyalty to God was rare then

## ⛈️ Did Put Away Baalim And Ashtaroth

"Baalim" is the plural of Baal, the Canaanite storm and fertility god worshiped under many local names.

For once, the whole nation actually obeys Samuel's exact instruction.

They do not just agree in words, they physically remove the idols.

This obedience becomes the turning point of the whole chapter.

⛈️ Baalim means many local Baal idols

✅ Israel actually obeyed this time

🙌 They removed the idols, not just talked

📖 Obedience here becomes the chapter's turning point

# FirstSamuel 7:5-6
# 💧 Gathered At Mizpeh
---
## 🗼 Gather All Israel To Mizpeh

"Mizpeh" means watchtower, a raised location used for gathering the whole nation together.

Samuel calls for a national assembly, not just a private prayer.

He promises to personally pray for the whole nation there.

This marks Samuel stepping fully into a national leadership role.

🗼 Mizpeh means watchtower

🇮🇱 A national assembly is called here

🙏 Samuel promises to pray for everyone

➡️ Samuel steps into national leadership now

## 💧 Drew Water, And Poured It Out Before The LORD

This act does not appear as a command anywhere else in the law.

Many scholars believe pouring out water pictured pouring out their own guilt before God.

It was a visible, physical way to show sorrow that words alone could not carry.

The whole assembly performs this together, not just their leaders.

💧 Water poured out symbolized their guilt

👀 A visible sign, not just words

🤝 The whole assembly did this together

📖 Physical acts often carried real meaning

## 🗣️ We Have Sinned Against The LORD

This is a direct, spoken confession, not a vague feeling of regret.

Naming the sin out loud made the moment real instead of private.

The nation admits fault together instead of blaming the Philistines or their leaders.

Public confession like this appears rarely in Israel's history.

🗣️ A direct spoken confession, not a feeling

👥 The whole nation admits fault together

🚫 No blame placed on anyone else

📖 Public confession like this was rare

## ⚖️ Samuel Judged The Children Of Israel In Mizpeh

To judge here means far more than deciding legal cases.

A judge in this period led the nation, settled disputes, and represented Israel before God.

Samuel becomes Israel's judge at the very moment the nation finally repents.

His leadership and their repentance arrive together.

⚖️ Judge meant national leader, not just referee

👑 Samuel leads Israel from this moment

🔄 Leadership and repentance arrive together

📖 God raises up leaders at the right time

# FirstSamuel 7:7-9
# ⚔️ Philistines Advance, Samuel Prays
---
## 👑 The Lords Of The Philistines Went Up Against Israel

The Philistines were ruled by five lords, one over each major city.

News that Israel had gathered at Mizpeh looked like the start of a rebellion to them.

They respond with a full military advance, not a small raid.

Israel's moment of repentance becomes a moment of real danger too.

👑 Five lords ruled the Philistine cities

📰 Israel's gathering looked like a rebellion

⚔️ A full army marches against them

➡️ Repentance and danger arrive at once

## 😨 They Were Afraid Of The Philistines

Israel had already lost the ark to this same enemy in an earlier battle.

That memory made this new threat feel even more frightening.

Fear here does not cancel out their repentance from the verses before.

Fear and faith often sit side by side in real life.

😨 Israel remembered losing the ark before

💭 Old defeat made new fear stronger

🙏 Fear did not cancel their repentance

📖 Fear and faith can coexist

## 🙅 Cease Not To Cry Unto The LORD Our God For Us

The people do not turn back to their old idols under pressure.

Instead they ask Samuel to keep praying without stopping.

This request shows their repentance from earlier in the chapter was real.

They trust Samuel's connection to God more than their own strength.

🙅 They did not return to old idols

🗣️ They asked Samuel to keep praying

✅ This proved their repentance was real

📖 They trusted God over their own strength

## 🐑 Took A Sucking Lamb

A sucking lamb is a young lamb still nursing from its mother.

This animal was considered a purer, more valuable offering than an older one.

Nothing here is a leftover or a cheap substitute.

Samuel gave the very best he had available in this moment of crisis.

🐑 A sucking lamb is a young nursing lamb

💎 It counted as a purer offering

🚫 Nothing here was a leftover offering

➡️ Samuel gave his very best

## 🔥 Offered It For A Burnt Offering Wholly Unto The LORD

A burnt offering was completely consumed by fire, with nothing kept back for the priest or the people.

"Wholly" makes that total surrender explicit here.

Most offerings under the law included a portion for the priest to eat.

This one holds nothing back at all.

🔥 Burnt offering means fully consumed by fire

💯 Wholly means nothing was held back

🍞 Most offerings kept a portion for priests

📖 This offering surrendered everything to God

## 👂 The LORD Heard Him

Samuel's prayer happens at the exact same moment the sacrifice burns.

The timing connects worship and prayer as one single act, not two separate steps.

"Heard" here means God actually acted on the request, not simply noticed it.

What happens next in the chapter is God's direct answer.

🔥 Prayer and sacrifice happened together

👂 Heard means God acted, not just noticed

⏱️ The timing was not a coincidence

📖 What follows is God's direct answer

# FirstSamuel 7:10-11
# ⛈️ The LORD Thundered
---
## ⛈️ The LORD Thundered With A Great Thunder

The Philistines worshiped Baal partly as a storm god who supposedly controlled thunder.

Here the real God uses thunder himself, on the very day Israel repented.

The timing makes the message impossible to miss.

The true God controls the weapon the Philistines thought belonged to their own god.

⛈️ Philistines saw Baal as a storm god

👑 The true God controls thunder instead

🎯 The timing matched Israel's repentance exactly

📖 God answered on their own terms

## 😱 Discomfited Them

"Discomfited" is an old word for thrown into panic and confusion.

This was not a normal battlefield retreat.

The Philistine army broke apart from sheer terror before Israel even reached them.

God did the real fighting before Israel's swords were even needed.

😱 Discomfited means thrown into panic

💥 Not a normal retreat, real terror

⚔️ Israel had barely engaged them yet

📖 God fought before Israel's swords were needed

## 🏃 Pursued The Philistines, And Smote Them

Only after God's thunder breaks the Philistine ranks does Israel move to attack.

"Smote" means they struck them down in battle.

Israel finishes what God already started.

This is teamwork between divine power and human obedience.

🏃 Israel pursued only after the thunder

⚔️ Smote means struck down in battle

🤝 Israel finished what God started

📖 Divine power and human action worked together

## 🗺️ Until They Came Under Bethcar

Bethcar was a location west of Mizpeh whose exact site is no longer known today.

Naming the endpoint of the chase shows how far and how thorough this victory really was.

This was not a narrow escape for Israel.

It was a complete rout of the Philistine army.

🗺️ Bethcar's exact location is unknown today

🏃 It marks how far the chase went

🏆 This was a complete Israelite victory

➡️ Not a narrow escape, a full rout

# FirstSamuel 7:12
# 🪨 Ebenezer
---
## 🪨 Called The Name Of It Ebenezer

"Ebenezer" means stone of help in Hebrew.

Chapter four already mentioned this same location.

That was the place where Israel first lost the ark to the Philistines.

Samuel sets up this memorial stone at the very spot of that old defeat.

The place of Israel's worst failure becomes the place of God's clear victory.

🪨 Ebenezer means stone of help

📖 Chapter four named this same location

💔 Israel's old defeat happened here too

➡️ Defeat's location becomes victory's memorial

## 📖 Hitherto Hath The LORD Helped Us

"Hitherto" is an old word meaning up until this exact point.

Samuel names the stone with a statement of gratitude, not a boast about the battle.

The credit goes entirely to God, not to Israel's own army.

This single sentence becomes the whole point of the chapter.

📖 Hitherto means up until now

🙏 A statement of gratitude, not a boast

🚫 Credit goes to God, not Israel's army

➡️ This line sums up the whole chapter

# FirstSamuel 7:13-14
# 🕊️ Peace Restored
---
## 🛡️ The Philistines Were Subdued

Subdued means brought fully under control, not just pushed back for a while.

This single battle changes the entire balance of power between the two nations.

The Philistines had dominated Israel for years before this moment.

That domination effectively ends here.

🛡️ Subdued means fully brought under control

⚖️ The balance of power shifts here

📉 Years of Philistine dominance end now

📖 One battle changed the whole outlook

## 🗺️ Came No More Into The Coast Of Israel

"Coast" here is an old word for border or territory, not a beach.

The Philistines stop raiding Israel's land entirely for a long stretch afterward.

This peace lasts for the rest of Samuel's leadership.

It becomes one of the most stable periods in this whole era.

🗺️ Coast means border, not a beach

🚫 Philistine raids stopped completely

📆 This peace lasted a long stretch

📖 A rare stable era for Israel

## 🏙️ From Ekron Even Unto Gath

Ekron and Gath were two of the five major Philistine cities.

Naming both cities marks exactly how much territory Israel recovered.

This was not a vague, general improvement.

It was specific, measurable land returned to Israel's control.

🏙️ Ekron and Gath were Philistine cities

🗺️ Naming them marks real recovered land

📏 This was specific, not vague

➡️ Real ground was actually regained

## 🏘️ Peace Between Israel And The Amorites

"Amorites" was a broad term covering various peoples already living in Canaan.

Israel's enemies did not attack while the nation was focused on the Philistines.

Peace on one front freed Israel to face pressure from only one enemy at a time.

God's help extended beyond just the battle already described.

🏘️ Amorites were other peoples living in Canaan

🕊️ They did not attack during this time

🎯 Israel faced only one enemy at once

📖 God's help reached beyond one battle

# FirstSamuel 7:15-17
# ⚖️ Samuel's Lifelong Circuit
---
## 📆 Samuel Judged Israel All The Days Of His Life

This is not a short term appointment.

Samuel serves as Israel's leader for the rest of his entire life.

His leadership begins with a real spiritual revival, not a political power grab.

That beginning shapes the rest of his years in this role.

📆 A lifelong role, not a short term

🙏 Leadership began with real revival

🚫 Not a political power grab

📖 The beginning shaped Samuel's whole career

## 🔁 In Circuit To Bethel, And Gilgal, And Mizpeh

A circuit means Samuel traveled a regular loop between these towns instead of staying in one place.

Bethel was the site where Jacob once saw a ladder reaching to heaven.

Gilgal was where Israel first camped after crossing into the promised land.

Mizpeh was the very place this chapter's revival just happened.

🔁 Circuit means a regular traveling loop

🪜 Bethel recalls Jacob's ladder to heaven

🏕️ Gilgal recalls Israel's first camp in Canaan

📖 Mizpeh recalls this chapter's own revival

## 🏠 His Return Was To Ramah

Ramah was Samuel's actual hometown, first named back in chapter one.

After each stop on his circuit, he always returns to this one place.

A traveling leader still needed a real home base.

Ramah anchors Samuel's whole life in this chapter's closing verses.

🏠 Ramah was Samuel's actual hometown

🔁 He always returned there after each stop

🧭 Even a traveling leader needed a base

➡️ Ramah anchors the rest of his life

## 🏡 For There Was His House

This simple detail confirms Ramah was not just a stop but Samuel's permanent residence.

Judges in this period did not rule from a palace or a capital city.

Samuel's home was ordinary, not built for show or status.

His authority came from his calling, not from where he lived.

🏡 Ramah was his permanent residence

🚫 Judges did not rule from a palace

🛖 His home was ordinary, not grand

📖 His authority came from his calling

## 🏠 There He Judged Israel

Ramah becomes a second regular location for Samuel's leadership work, alongside the circuit towns.

People could count on finding him there when he was not traveling.

Consistency mattered as much as the actual decisions he made.

A steady presence built real trust over time.

🏠 Ramah became a steady base for judging

👥 People knew where to find him

🔄 Consistency mattered as much as decisions

📖 Steady presence built real trust

## 🔥 There He Built An Altar Unto The LORD

Building a personal altar was a serious act of worship, not just decoration for his house.

Samuel had already led the whole nation back to God earlier in this chapter.

Here he makes sure his own home reflects that same devotion.

Leading a nation in worship and living it out personally are not automatically the same thing.

🔥 A personal altar meant real devotion

🙏 Samuel had already led national worship

🏠 He made sure his own home matched

📖 Public leadership and private devotion both matter
`.trim();

export const FIRST_SAMUEL_SEVEN_PERSONAL_SECTIONS = parseFirstSamuelSevenRawNotes(FIRST_SAMUEL_SEVEN_RAW_NOTES);
