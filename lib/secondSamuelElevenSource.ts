export type SecondSamuelElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelElevenRawNotes(rawText: string): SecondSamuelElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 11:${startVerse}` : `2 Samuel 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 2 Samuel 11 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_ELEVEN_RAW_NOTES = `
# SecondSamuel 11:1
# ⚔️ David Stays Behind
---
## 🌱 At The Time When Kings Go Forth To Battle

Kings in the ancient world were expected to lead their own armies into war.

This was the season each spring when campaigns usually began.

The ground had dried out enough for armies and chariots to move again.

David sent Joab instead and did not go himself.

The king meant to be out front was about to be somewhere else entirely.

⚔️ Kings normally led their armies

🌱 Spring was the season for war

🏠 David sent Joab instead

➡️ The king was about to stay dangerously idle

## 🛏️ But David Tarried Still At Jerusalem

Tarried means stayed behind.

David had led his own army out to battle many times before.

This time he sent Joab and stayed in the palace instead.

An idle king with nothing pressing to do is a dangerous thing.

The rest of this chapter happens because David had nowhere else to be.

🛏️ Tarried means he stayed behind

⚔️ David usually led his own army

🏠 He sent Joab and stayed home

➡️ An idle king becomes a dangerous one

# SecondSamuel 11:2-3
# 👀 David Sees Bathsheba
---
## 🌆 In An Eveningtide

Eveningtide simply means the evening, right around sunset.

Ancient homes rested through the hottest part of the afternoon.

David is getting up from that rest as evening cools the air.

He was not coming back from any task.

David was simply relaxing as everyone else worked or fought.

This is the restless quiet just before trouble begins.

🌆 Eveningtide simply means evening

😴 Ancient homes rested through hot afternoons

🛏️ David is getting up from rest

➡️ Quiet moments can turn dangerous fast

## 🏠 Walked Upon The Roof Of The King's House

Flat roofs were a normal part of homes in ancient Israel.

Families used them in the evening to cool off and relax.

The king's roof stood higher than the houses around it.

That height let David see down into places he should not have looked.

A privilege of being king became the doorway into temptation.

🏠 Flat roofs were common evening space

📏 The king's roof stood highest

👀 David could see into other homes

➡️ A royal privilege became a temptation

## 🛁 He Saw A Woman Washing Herself

This washing was almost certainly a purification bath.

The text later explains she had just finished her time of uncleanness.

That bath was a private, expected part of her regular life.

Bathsheba was not doing anything wrong or exposed on purpose.

David is the one who saw more than he should have from that roof.

🛁 The washing was a purification bath

🩸 It followed her time of uncleanness

🙅 Bathsheba did nothing improper

➡️ David saw what he should not have

## ❓ Is Not This Bathsheba, The Daughter Of Eliam, The Wife Of Uriah The Hittite

This answer names three reasons David should stop right here.

Her father Eliam was likely one of David's own mighty men.

She has a husband, Uriah, one of David's soldiers away at war.

The servant lists these facts like a warning, not simple information.

David hears every reason to walk away and sends for her anyway.

👨‍👧 Eliam was likely one of David's soldiers

💍 Uriah was already her husband

⚠️ The answer reads like a warning

➡️ David ignored every warning in it

# SecondSamuel 11:4-5
# 🤰 The Child Is Conceived
---
## 👑 David Sent Messengers, And Took Her

A summons from the king was not something anyone could refuse.

David did not ask.

He sent messengers to bring her instead.

The gap in power between a king and a soldier's wife was enormous.

This was not a romance between equals.

It was the use of royal power to take what was not his.

👑 A king's summons could not be refused

🚫 David sent for her without asking

⚖️ The power gap was enormous

➡️ Power took what love never offered

## 🩸 For She Was Purified From Her Uncleanness

This detail is not random information.

It means Bathsheba had just finished her monthly cycle.

That timing rules out any question about whose child this is.

Uriah had been away at the war and could not be the father.

The text quietly closes the door on any other explanation before the child even exists.

🩸 This detail is not random

📅 She had just finished her monthly cycle

🚫 Uriah could not be the father

📖 The text rules out any other explanation

## 🤰 I Am With Child

Bathsheba's message is short and direct.

In this culture, a wife pregnant with her husband away faced open shame.

Adultery under the law carried the penalty of death for both people involved.

David is not only facing guilt now.

He is facing exposure that could reach the whole kingdom.

One short sentence turns a private sin into an urgent problem David must solve.

🤰 Her message is short and direct

⚖️ Adultery could carry a death penalty

👁️ A pregnancy with Uriah away meant exposure

➡️ Private sin has just become a public danger

# SecondSamuel 11:6-9
# 🏠 Summoning Uriah Home
---
## ✉️ Send Me Uriah The Hittite

David is not calling Uriah home to check on him.

This request is the first move in a plan.

If Uriah goes home to his wife, the pregnancy has a simple explanation.

Nobody at the front line would ever need to know the real story.

A summons that looks routine is actually the beginning of a cover up.

📜 This summons is not routine concern

🎭 It is the first move of a plan

🏠 Home time would explain the pregnancy

➡️ A cover up begins with one quiet request

## 🗣️ How The War Prospered

These questions sound like a concerned commander checking on his army.

David already knows all of this because Joab sends regular reports.

The real purpose of this meeting has nothing to do with the war.

Small talk here is cover for what David actually wants.

🗣️ The questions sound like normal concern

📨 Joab already sends regular war reports

🎭 The real purpose is not the war

➡️ Small talk hides David's actual plan

## 🦶 Go Down To Thy House, And Wash Thy Feet

Washing the feet after a journey was normal hospitality in this culture.

Here it also means go relax at home with your wife.

David sends a mess of meat after him.

That was a portion of food straight from the king's own table.

It was meant to make going home feel like a reward.

Every part of this invitation was designed to get Uriah into his own bed.

🦶 Washing feet meant relaxing after a journey

🍖 A mess of meat was a royal gift

🎁 The gift was meant to sweeten the trip

➡️ Every detail aimed Uriah toward his own bed

## 🚪 Uriah Slept At The Door Of The King's House

Uriah does not go home at all.

He sleeps at the palace door with the king's own guards instead.

Soldiers on campaign often held themselves back from ordinary comforts like this.

Uriah is living out that discipline without even knowing why it matters right now.

His loyalty just quietly wrecked David's entire plan.

🚪 Uriah slept at the palace door

🪖 He chose a soldier's discipline over comfort

🤷 He does not know what is at stake

➡️ His loyalty accidentally ruins David's plan

# SecondSamuel 11:10-13
# 🍷 Uriah Will Not Go Home
---
## ❓ Camest Thou Not From Thy Journey

David acts confused about why Uriah did not go home.

This is a direct push after the quiet invitation already failed.

David is not really concerned about Uriah's comfort.

He needs Uriah in that bed for the plan to work.

A simple question is hiding real desperation underneath it.

❓ David feigns confusion at Uriah's choice

🔁 This is a second, more direct push

🎯 David needs Uriah home for his plan

➡️ A calm question hides real desperation

## 📦 The Ark, And Israel, And Judah, Abide In Tents

The ark held the presence of God and normally stayed in Jerusalem.

During this campaign it had gone out with the army instead.

Uriah names the ark before he names any person.

God's presence with the troops mattered to him more than his own comfort.

Uriah's list of loyalties puts God first, his brothers second, and himself last.

📦 The ark represented God's presence

🪖 It had gone out with the army

🙏 Uriah names God before any person

📖 His loyalties put himself last

## 🚫 Shall I Then Go Into Mine House, To Eat And To Drink, And To Lie With My Wife

Uriah asks this question and already knows the answer is no.

Eating, drinking, and being with his wife are ordinary comforts.

Uriah refuses them all because his fellow soldiers have none of it.

David is at this very moment living out the comfort Uriah refuses.

Uriah's loyalty accidentally becomes a mirror held up to David's own choices.

🚫 Uriah refuses ordinary home comforts

🪖 His soldiers have none of those comforts

🪞 His words unknowingly mirror David's own choices

➡️ Loyalty exposes exactly what David was doing

## 🍷 He Made Him Drunk

David tries one more way to get Uriah home.

Getting him drunk was meant to weaken his self control.

Even drunk, Uriah still will not go down to his house.

His discipline holds even when his guard should have been down.

When persuasion fails completely, David moves to something far worse than a plan gone wrong.

🍷 David tries getting Uriah drunk

🧠 The plan aimed to weaken his self control

🛡️ Even drunk, Uriah holds his discipline

➡️ Failure here leads David toward something worse

# SecondSamuel 11:14-17
# ✉️ The Letter That Kills
---
## 💀 David Wrote A Letter To Joab, And Sent It By The Hand Of Uriah

Uriah carries this letter himself, back to the war.

He has no idea what it says.

The letter is his own death order, written by the king he trusts.

Nothing on the outside of a sealed letter reveals what is inside.

David has now moved from hiding a sin to planning a killing.

✉️ Uriah personally carries the letter

🤷 He has no idea what it says

💀 The letter orders his own death

➡️ David moved from hiding sin to murder

## ⚔️ Set Ye Uriah In The Forefront Of The Hottest Battle

This order asks for something very specific.

Put Uriah where the fighting is worst, then pull support away from him.

This is not really a battle death.

It is a murder made to look like one.

David uses the chaos of war to hide what he has actually done.

⚔️ The order targets the worst fighting

🚶 Support gets pulled away from Uriah

🎭 It is murder disguised as a battle death

➡️ War becomes the perfect cover for David's crime

## 🎯 He Assigned Uriah Unto A Place Where He Knew That Valiant Men Were

Joab does not need the order explained twice.

He places Uriah near the enemy's strongest defenders on purpose.

Joab understood exactly what David wanted without being told everything.

A commander willing to follow an order like this reveals something about David's court.

Corruption at the top rarely stays contained to just one person.

🎯 Joab places Uriah near strong defenders

🤝 He understood the order without explanation

🏛️ This reveals corruption beyond David alone

➡️ Sin at the top tends to spread downward

## ➕ Uriah The Hittite Died Also

The word also matters here.

Other soldiers from David's army died in this same maneuver.

Their deaths get almost no attention in the text.

David's cover up cost more lives than just the one he was targeting.

Sin rarely stays contained to the person who committed it.

➕ The word also signals more deaths

🪖 Other soldiers died in this maneuver

🙈 Their deaths get almost no attention

➡️ One sin ended up costing many lives

# SecondSamuel 11:18-21
# 📜 Coaching The Messenger
---
## 📨 Charged The Messenger

Joab expects David might react with anger over this report.

Approaching a city wall that closely was a known military mistake.

Joab prepares the messenger with an exact script to use if needed.

He knows exactly how risky the order he carried out really was.

📨 Joab expects a possible angry reaction

🧱 Approaching the wall was a known mistake

🗒️ He scripts the messenger's exact response

➡️ Joab knew how risky his own order was

## 📖 Who Smote Abimelech The Son Of Jerubbesheth

This is a callback to a story in the book of Judges.

Abimelech was killed by a millstone thrown down from a wall in Thebez.

Jerubbesheth is another name for Gideon, Abimelech's father.

Every soldier would have known this story as a warning about walls.

Joab expects David to bring up this exact comparison.

📖 This recalls Abimelech's death in Judges

🧱 He died from a millstone at a wall

👴 Jerubbesheth is another name for Gideon

➡️ Joab expects David to know this story

## 🎯 Thy Servant Uriah The Hittite Is Dead Also

Joab tells the messenger to end with this exact line.

He is counting on this news to end any complaint about tactics.

Joab never says out loud that he knows why Uriah had to die.

Both men understand the real story without saying it plainly.

Silence between them says as much as the letter did.

🎯 This line ends any tactical complaint

🤐 Joab never says the real reason aloud

🤝 Both men understand without saying it

➡️ Silence carries as much weight as words

# SecondSamuel 11:22-25
# 🗣️ The Report To David
---
## 📖 Shewed David All That Joab Had Sent Him For

Shewed is an old spelling of showed.

The messenger delivers exactly what Joab told him to say.

That includes the planned line about Uriah at the very end.

The whole report unfolds precisely the way Joab planned it.

📖 Shewed is an old word for showed

🗣️ The messenger follows Joab's script exactly

🎯 The Uriah line comes at the end

➡️ Everything unfolds exactly as Joab planned

## 😌 Let Not This Thing Displease Thee

This is exactly the reaction Joab expected.

The complaint about risky tactics disappears the moment David hears Uriah is dead.

The sword devoureth one as well as another was an old saying about war's randomness.

David uses that proverb to excuse a death he actually planned.

A true saying about war becomes a convenient cover for a lie.

🎯 This is exactly what Joab expected

😌 The tactical complaint disappears instantly

⚔️ The proverb is really about war's randomness

➡️ David uses truth to cover his own lie

## 🏹 Make Thy Battle More Strong Against The City, And Encourage Thou Him

David tells Joab to keep pressing the attack.

He even adds a word of encouragement for Joab.

This comes right after David used that same siege to hide a murder.

A hardened conscience can sound completely calm and in control.

David shows no sign yet that anything is wrong.

🏹 David orders the siege to continue

👍 He even encourages Joab directly

💔 This follows a murder he just ordered

➡️ A hardened conscience can sound calm

# SecondSamuel 11:26-27
# ⚖️ The Thing Displeased The LORD
---
## 😢 She Mourned For Her Husband

Mourning in this culture followed a set pattern, usually about seven days.

Bathsheba is not shown to know that David caused Uriah's death.

As far as the text tells us, she is simply grieving her husband.

Her grief is real, and David is the one who caused it.

The chapter never lets the reader forget who is actually responsible.

😢 Mourning usually lasted about seven days

🤷 Bathsheba is not shown knowing the truth

💔 Her grief appears genuine

➡️ The text never forgets who caused it

## 💍 David Sent And Fetched Her To His House, And She Became His Wife

On the surface, this looks like a happy ending.

David marries Bathsheba and she has a son.

A watching Israelite might have seen nothing but a king caring for a widow.

The story is built to look resolved before the final sentence changes everything.

One more sentence is coming that undoes this entire tidy picture.

💍 David marries Bathsheba

👶 She bears him a son

🎭 It looks like a tidy resolution

➡️ One more sentence changes everything

## ⚖️ But The Thing That David Had Done Displeased The LORD

Every earlier verse in this chapter just describes what happened.

This is the first sentence that tells the reader what God thinks of it.

Nothing about David's plan escaped notice, not the adultery and not the murder.

This short verdict sets up everything that happens in the next chapter.

A king can silence a messenger, but he cannot silence God's own verdict.

⚖️ This is the narrator's own verdict

👁️ Nothing escaped God's notice

📖 It sets up the next chapter

➡️ No king can silence God's verdict
`.trim();

export const SECOND_SAMUEL_ELEVEN_PERSONAL_SECTIONS = parseSecondSamuelElevenRawNotes(SECOND_SAMUEL_ELEVEN_RAW_NOTES);
