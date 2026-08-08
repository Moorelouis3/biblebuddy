export type JudgesTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesTwoRawNotes(rawText: string): JudgesTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 2:${startVerse}` : `Judges 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Judges 2 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_TWO_RAW_NOTES = `# Judges 2:1-5
# ⚖️ The Angel's Rebuke At Bochim
---
## 👤 An Angel Of The Lord Came Up From Gilgal To Bochim

"Angel" here does not mean an ordinary messenger.

This angel speaks in the first person as God himself.

Many scholars believe this is God appearing directly, not just a created being.

Gilgal was Israel's very first camp inside the promised land.

This rebuke follows Israel all the way from where the conquest began.

👤 The angel speaks with God's own voice

⛺ Gilgal was Israel's first camp

🗣️ This rebuke follows the whole conquest

📖 God addresses Israel himself not through Moses

## 🐑 I Made You To Go Up Out Of Egypt

God opens by reminding Israel exactly what he already did.

This exact rescue formula repeats again and again in the Old Testament.

Before any complaint comes, God first names his own faithfulness.

Every rebuke that follows stands on grace already given.

🐑 God rescued Israel from Egypt first

📜 This rescue formula repeats often in scripture

⚖️ Grace comes before the rebuke here

📖 God's faithfulness never depended on Israel's obedience

## 🤝 I Will Never Break My Covenant With You

God's own promise here never wavers.

No matter what Israel does next.

This covenant traces back to the promise made to Abraham.

The angel is not threatening to leave.

He is confirming a promise that will never end.

What breaks in this chapter is Israel's obedience, not God's word.

🤝 God's covenant promise stays fixed

👴 It traces back to Abraham's own promise

🚫 The angel never threatens to leave

📖 Israel's obedience is what breaks down

## 📜 Ye Shall Make No League With The Inhabitants Of This Land

"League" means a formal treaty or alliance, not just friendliness.

God commanded this back in Exodus and Deuteronomy, long before Israel crossed the Jordan.

Chapter one already showed several tribes breaking this exact command.

The angel is not introducing a new rule here.

He is calling out one that Israel already ignored.

🤝 League means a formal alliance

📜 This command came before the Jordan crossing

⚠️ Chapter one already broke this rule

📖 This warns against forgetting an old command

## ⚖️ Why Have Ye Done This

This question is not God searching for new information.

It works like a legal charge, the same kind used against someone standing accused.

Prophets later reuse this same pattern, naming God's faithfulness before naming Israel's failure.

Grace is always named first here, and the charge comes second.

⚖️ This question works like a legal charge

🗣️ Prophets reuse this same accusing pattern

📜 Grace is named before the failure

📖 The order itself makes the point

## 🌵 They Shall Be As Thorns In Your Sides

"Thorns" pictures something small that causes constant, sharp pain.

Not one single attack, but pain that never fully stops.

This same image already appeared earlier, back in the book of Numbers.

The remaining nations would not conquer Israel outright.

They would wear Israel down slowly instead.

🌵 Thorns picture ongoing, sharp pain

🔁 Numbers already used this same image

⏳ The danger was slow, not sudden

📖 Compromise wears a nation down slowly

## 😢 They Called The Name Of That Place Bochim

"Bochim" means weepers in Hebrew.

The place is named directly for this loud, public grief.

Judges already renamed places this way, like Hormah in the chapter before.

The sacrifice here shows real sorrow.

The rest of the chapter shows that sorrow alone did not last.

😢 Bochim means weepers

🏷️ The name marks this exact moment

🔁 Judges already renamed places this way

📖 Real sorrow here did not yet mean change

# Judges 2:6-10
# ⚰️ Joshua's Death And A New Generation
---
## 🔁 Joshua Had Let The People Go

This verse actually repeats something already told at the very end of the book of Joshua.

The writer of Judges goes back in time here on purpose.

Repeating an ending like this is a common way ancient writers link one book to the next.

Chapter one had already jumped ahead of this exact moment.

Now the story finally catches back up to it.

🔁 This verse repeats the end of Joshua

⏪ The writer intentionally goes back in time

🔗 Repeats like this link one book to another

📖 Chapter one had already jumped ahead

## 🙏 The People Served The Lord All The Days Of Joshua

This generation stayed faithful for their entire lives.

They personally watched the Jordan stop and the walls of Jericho fall.

Faith held strong because they had firsthand memory of what God did.

That firsthand memory is exactly what the next generation will not have.

🙏 This generation stayed faithful for life

👀 They personally saw God's own miracles

🧠 Firsthand memory kept their faith strong

📖 That memory will not reach the next generation

## 🏅 Joshua The Son Of Nun The Servant Of The Lord Died

"Servant of the Lord" was a specific title, not a general compliment.

Moses carried this exact same title before him.

Being called this placed Joshua among a small, honored group of leaders.

One hundred and ten years old was considered the ideal full lifespan in Egyptian culture.

Joseph, back in Genesis, died at that exact same age.

🏅 Servant of the Lord was Moses's own title

👑 Joshua joins a small, honored group

💯 One hundred ten was an ideal lifespan

📖 Joseph died at this same exact age

## 🪦 They Buried Him In The Border Of His Inheritance

Joshua is buried inside his own personal land, not a national tomb.

The location is named Timnathheres, in the hill country of Ephraim.

Joshua's own book calls this same place Timnathserah, the same name with two parts switched.

Small spelling shifts like this were common as names passed through scribes and centuries.

🪦 Joshua is buried in his own land

🗺️ The site sits in the hills of Ephraim

🔄 Joshua called it Timnathserah, letters swapped

📖 Small name shifts were common back then

## 🕊️ All That Generation Were Gathered Unto Their Fathers

"Gathered unto their fathers" is simply a gentle way of saying they died.

It pictures joining ancestors who had already passed on.

Every person who had personally lived through the conquest is now gone.

The story now depends on people who never saw any of it happen.

🕊️ Gathered unto their fathers means died

👴 It pictures rejoining ancestors already gone

🚶 The eyewitness generation is now gone

📖 The story now shifts to new eyes

## ❓ Knew Not The Lord

This does not mean this new generation had never heard of God.

It means they had no personal experience of what he had actually done.

Faith that was once eyewitness memory became only a secondhand story.

That gap between hearing about God and truly knowing him drives everything that follows.

❓ They had heard of God, not seen him

🗣️ Faith became only a secondhand story

📉 Firsthand faith did not transfer well

📖 That gap explains the rest of the chapter

# Judges 2:11-15
# 🔥 Israel Turns To Baal
---
## 🚩 Did Evil In The Sight Of The Lord

This exact phrase becomes the Bible's shorthand label for idolatry through the rest of Judges.

Every time a new judge's story begins, this same line appears first.

It works like a chapter marker, always signaling the same failure again.

Watching for this phrase is the key to reading the whole book.

🔁 This phrase repeats through all of Judges

🚩 It marks the same failure each time

✍️ It works like a chapter marker

📖 Watch for it, the cycle is starting

## 👑 Served Baalim

"Baalim" is the plural of Baal, a Canaanite word meaning lord or master.

There was no single Baal, since nearly every town worshipped its own local version.

Baal was believed to control rain, storms, and the fertility of crops and animals.

In a farming culture, trusting Baal instead of God threatened daily survival itself.

👑 Baal means lord or master

🏘️ Nearly every town had its own Baal

🌦️ Baal was believed to control rain and crops

📖 This idol tempted a farming people directly

## 🚪 Forsook The Lord God Of Their Fathers

"Forsook" means they abandoned him completely, not that they simply drifted.

These are the same neighboring gods that chapter one already failed to remove.

Leaving those nations in place became worshipping their gods soon after.

One unfinished conquest quietly turned into outright abandonment of God.

🚪 Forsook means a complete abandonment

🔗 These are chapter one's unremoved neighbors

⚠️ Compromise became actual idolatry

📖 Chapter one's failure caused chapter two's collapse

## 👸 Served Baal And Ashtaroth

"Ashtaroth" is the plural of Ashtoreth, a Canaanite goddess of love, war, and fertility.

Baal and Ashtaroth were usually worshipped together, as a paired male and female pair.

Their worship regularly involved practices the law of Moses strictly forbade.

Choosing them meant choosing a religion built to compete directly with God's own commands.

👸 Ashtoreth was a fertility goddess

🤝 Baal and Ashtaroth were worshipped together

🚫 Their worship broke the law of Moses

📖 Israel chose a rival religion entirely

## 🔥 The Anger Of The Lord Was Hot Against Israel

This anger is not a sudden emotional outburst.

It is God responding to a covenant Israel had already agreed to keep.

The consequence that follows was written out generations earlier in Deuteronomy.

Nothing here happens outside of what God had already promised would happen.

🔥 This anger responds to a broken covenant

📜 Deuteronomy already promised this consequence

⚖️ Nothing here is random or unexpected

📖 God kept his own earlier word

## 💰 Sold Them Into The Hands Of Their Enemies

"Sold" is a legal picture, the same word used for selling a slave.

God is not losing a battle here, he is handing Israel over on purpose.

This mirrors the exact curse warned about back in Deuteronomy twenty eight.

Losing God's protection, not losing a fight, is the real disaster in this verse.

💰 Sold pictures a legal slave sale

✋ God hands them over on purpose

📜 Deuteronomy twenty eight warned of this curse

📖 Losing God's protection was the real loss

## 😣 Greatly Distressed

This distress was not simply bad luck catching up with Israel.

Verse fifteen says plainly this was exactly what the Lord had sworn would happen.

Every hardship in this verse traces back to a warning Israel already knew.

God's word proved true, even in judgment.

😣 This distress was not random

📜 God had already sworn this consequence

🔁 It traces back to a known warning

📖 The suffering fulfilled God's own word

# Judges 2:16-19
# 🔁 The Cycle Of Judges Begins
---
## ⚔️ The Lord Raised Up Judges

A "judge" here does not mean a courtroom official.

In Hebrew the word describes a deliverer, someone raised up to rescue Israel in crisis.

These leaders usually led armies more than they settled legal disputes.

This verse introduces the very office that gives the whole book its name.

⚔️ Judge means deliverer, not courtroom official

🛡️ Judges mostly led armies, not courts

📖 This verse names the book's title office

➡️ Watch for this same office again

## 💍 Went A Whoring After Other Gods

"A whoring after" pictures Israel's relationship with God as a marriage.

Idolatry here gets described as adultery, not simply disobedience.

This same marriage picture returns constantly through Israel's prophets, especially Hosea.

Breaking covenant with God was never treated as a small violation.

💍 God's covenant is pictured as a marriage

💔 Idolatry is described as adultery here

🗣️ Prophets like Hosea reuse this image

📖 Covenant breaking was never treated as small

## 🤝 The Lord Was With The Judge

Each judge only succeeded because God's own presence was with them.

The rescue never came from the judge's own strength alone.

That presence lasted only for the length of one judge's life.

The victory always belonged to God, even though a human led the battle.

🤝 God's presence made the rescue work

💪 The judge's strength was never the source

⏳ That presence lasted only one lifetime

📖 The victory always belonged to God

## ❤️ It Repented The Lord Because Of Their Groanings

This does not mean God made a mistake that needed fixing.

The phrase describes God being moved with real compassion.

"Groanings" describes real physical and emotional suffering, not simple complaining.

God responds even to pain that a people brought on themselves.

❤️ This is compassion, not a mistake

😩 Groanings describes real suffering, not complaining

🙏 God responds even to their own pain

📖 Mercy meets Israel inside their own consequence

## ⏳ When The Judge Was Dead That They Returned

Relief only ever lasted for one generation at a time.

As soon as that judge died, Israel drifted back into the same sin.

This verse says they corrupted themselves even more than the generation before them.

Each cycle through this pattern ends worse than the one before it.

⏳ Relief lasted only one generation

🔁 Old sin returned after each judge died

📉 Each generation grew more corrupt than the last

📖 The cycle was not repeating, it was worsening

## 🧱 They Ceased Not From Their Own Doings Nor From Their Stubborn Way

"Stubborn way" describes a hardened refusal to change direction.

This was not confusion about right and wrong.

Israel knew the pattern and kept choosing it anyway.

This whole stretch names the engine that drives every story for the rest of the book.

🧱 Stubborn way means a hardened refusal

🤔 This was not confusion, it was choice

🔁 Israel knew the pattern and repeated it

📖 This engine drives the rest of the book

# Judges 2:20-23
# 🎯 The Nations Left To Test Israel
---
## 🚧 This People Hath Transgressed My Covenant

"Transgressed" means they crossed a line they had agreed never to cross.

The covenant here traces all the way back to Sinai.

That is where Israel first accepted these exact terms.

This is not God changing the rules, this is God naming a broken agreement.

🚧 Transgressed means crossing an agreed line

📜 The covenant traces back to Sinai

⚖️ God is not changing the rules

📖 God names a broken agreement plainly

## ⏭️ I Also Will Not Henceforth Drive Out Any

"Henceforth" means from this point forward, permanently.

This makes the warning back in verse three an official, lasting policy.

The nations Judah and the other tribes failed to remove now stay by God's own decision.

What began as Israel's failure has now become part of God's plan.

⏭️ Henceforth means from now on, for good

📜 This makes verse three's warning permanent

🏘️ The remaining nations now stay on purpose

📖 Israel's failure becomes part of a plan

## 🧪 That Through Them I May Prove Israel

"Prove" here means to test, not to punish.

The remaining nations become a real, ongoing test of Israel's loyalty.

This reframes the whole situation, since it is not only judgment.

Every new generation growing up beside these nations gets its own chance to choose faithfulness.

🧪 Prove means test, not just punish

🎯 The nations become an ongoing loyalty test

🔄 This is judgment with a purpose attached

📖 Every new generation gets its own choice

## 🛤️ Whether They Will Keep The Way Of The Lord

"The way of the Lord" describes a whole pattern of living, not one rule.

Israel's fathers, back under Joshua, had kept that way faithfully.

The question left open here is whether this next generation will do the same.

That open question is really what the entire book of Judges exists to answer.

🛤️ Way of the Lord means a life pattern

👴 Their fathers had kept that way before

❓ This generation's answer stays open

📖 Judges exists to answer that question

## ⏪ Neither Delivered He Them Into The Hand Of Joshua

This detail reaches back before Joshua ever died.

God had always planned to leave some nations in the land, even during Joshua's own victories.

That means the unfinished conquest was never purely Israel's fault from the very start.

The chapter closes by widening the view to God's larger, older plan.

⏪ This plan predates Joshua's own death

🎯 Some nations were always meant to remain

⚖️ Not every failure here began with Israel

📖 The chapter ends on God's wider plan
`.trim();

export const JUDGES_TWO_PERSONAL_SECTIONS = parseJudgesTwoRawNotes(JUDGES_TWO_RAW_NOTES);
