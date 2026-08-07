export type DeuteronomyThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyThirteenRawNotes(rawText: string): DeuteronomyThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 13:${startVerse}` : `Deuteronomy 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Deuteronomy 13 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_THIRTEEN_RAW_NOTES = `# Deuteronomy 13:1-3
# 🔮 A Sign That Comes True
---
## 🗣️ A Prophet, Or A Dreamer Of Dreams

A prophet claimed to carry a message straight from God.

A dreamer of dreams claimed God spoke to him through a vision at night.

Both titles carried real weight in ancient Israel.

People assumed either one could be trusted on sight.

Moses is warning that either title can be faked.

🗣️ Prophet means one who speaks for God

💤 Dreamer of dreams means night visions

👑 Both carried real weight in Israel

📖 Either title can be faked

---
## ✨ Giveth Thee A Sign Or A Wonder

A sign or a wonder means a miracle offered as proof.

It might be a healing, a prediction, or something unexplainable.

The miracle itself is not the test here.

What the miracle points toward is the real test.

✨ Sign or wonder means an offered miracle

🩹 It might be healing or a prediction

🎯 The miracle itself is not the test

➡️ Where it points is the real test

---
## ⚠️ The Sign Or The Wonder Come To Pass

This is the trap built into the test.

A real miracle can still come from a false source.

God allows the sign to actually happen.

The proof alone is never enough on its own.

Truth still has to match what God already said.

⚠️ A real miracle can still be false

🔮 God allows the sign to happen

🚫 Proof is never enough on its own

📖 Truth must match what God already said

---
## 🗿 Other Gods, Which Thou Hast Not Known

"Other gods" means the gods worshiped by the nations around Israel.

"Which thou hast not known" points to gods Israel had never served before.

This was not a pull back to old idols from Egypt.

It was a pull toward something entirely new.

Every generation faces a fresh version of this same pull.

🗿 Other gods means the neighboring nations' gods

🆕 Not known means never served before

🚫 This was not old idols from Egypt

➡️ Every generation faces this pull too

---
## 🔍 The LORD Your God Proveth You

"Proveth" means tests, not tricks.

God is not trying to catch Israel doing wrong.

He is checking where their loyalty actually lies.

A test only matters if the outcome is not already decided.

This test reveals what is already true in the heart.

🔍 Proveth means tests

🎯 God checks where loyalty lies

❓ The outcome was not already decided

📖 The test reveals what is already true

---
## ❤️ With All Your Heart And With All Your Soul

The standard here is complete, not partial.

Heart points to the will and the decisions a person makes.

Soul points to the whole inner life, not just feelings.

Together they rule out loving God with only half a life.

The test in this chapter aims straight at that whole loyalty.

❤️ Heart means the will and decisions

🌬️ Soul means the whole inner life

🚫 Half loyalty does not meet the standard

📖 The whole person is what God wants

# Deuteronomy 13:4-5
# 🚶 Walking After The LORD Alone
---
## 🚶 Ye Shall Walk After The LORD Your God

"Walk after" is an old way to describe a whole direction of life.

It does not mean a single decision made once.

It means every daily choice pointed toward following God.

The test in verses one through three has one real answer.

Keep walking the same direction you were already walking.

🚶 Walk after means a life direction

📆 It covers daily choices, not one moment

🧭 The test has one real answer

➡️ Keep walking the direction you were on

---
## 🔗 Cleave Unto Him

"Cleave" means to stay stuck close, not to drift.

Genesis uses this same word for a husband holding fast to his wife.

The command pictures loyalty to God like the closeness of a marriage.

This is not distant respect from far away.

It is a bond meant to stay tight.

🔗 Cleave means to stay stuck close

💍 Genesis uses this word for marriage

❤️ Loyalty to God is pictured like marriage

📖 The bond is meant to stay tight

---
## ⚖️ That Prophet, Or That Dreamer Of Dreams, Shall Be Put To Death

The penalty is death, even though the miracle in verse two was real.

A true sign does not excuse a false message.

This law guards the nation against a very persuasive kind of deception.

Israel cannot let impressive proof override what God already said.

⚖️ The penalty is death

✨ A real sign does not excuse a lie

🛡️ This law guards against persuasive deception

📖 Proof cannot override what God already said

---
## ⛓️ Redeemed You Out Of The House Of Bondage

"Redeemed" means bought back or rescued at a real cost.

"House of bondage" refers to Israel's slavery in Egypt.

God is reminding Israel exactly who earned the right to their loyalty.

He is not a stranger asking for trust.

He already proved himself through the exodus itself.

💰 Redeemed means rescued at a real cost

⛓️ House of bondage means slavery in Egypt

🙌 God already earned Israel's loyalty

📖 The exodus proved who God is

---
## 🦠 Put The Evil Away From The Midst Of Thee

False teaching gets treated here like a disease inside the camp.

It has to be removed, not managed or tolerated.

Left alone, this kind of deception spreads to more than one person.

The community's safety depends on dealing with it directly.

🦠 False teaching is treated like a disease

🚫 It must be removed, not tolerated

📈 Left alone, deception spreads further

📖 The community's safety depends on this

# Deuteronomy 13:6-8
# 🤫 Enticed By Someone You Love
---
## 👬 The Son Of Thy Mother

Son of thy mother points to a full brother, not just any brother.

Many households in this culture had children from more than one wife.

A half brother might feel like a more distant relative.

Naming the full brother closes off the easiest excuse to make.

Even the closest possible relative is not exempt from this law.

👬 Son of thy mother means full brother

👪 Households often had more than one wife

🚫 Closeness offers no exemption here

📖 Even the closest relative is included

---
## 💞 The Wife Of Thy Bosom

"Wife of thy bosom" is an old idiom for a deeply loved wife.

It pictures the closeness of an embrace, not distance.

Even a marriage this close does not earn an exception.

The law reaches into the most intimate relationship a person has.

💞 Wife of thy bosom means a beloved wife

🤗 It pictures the closeness of an embrace

🚫 No exception, even inside a marriage

📖 The law reaches the most intimate bond

---
## 🫂 Which Is As Thine Own Soul

"As thine own soul" pictures a friend as close as part of yourself.

The same phrase later describes David and Jonathan's friendship.

Deep friendship carries real influence over a person's choices.

That influence can be used for good or turned toward harm here.

🫂 As thine own soul means deepest friendship

🤝 The same phrase describes David and Jonathan

💡 Deep friendship carries real influence

📖 Influence can turn toward harm too

---
## 🎣 Entice Thee Secretly

"Entice" means to lure someone gradually, not force them all at once.

"Secretly" means this happens in private, away from public correction.

This is not a loud public debate about religion.

It is a quiet, personal pressure from someone trusted.

🎣 Entice means to lure gradually

🤫 Secretly means done away from correction

🗣️ This is not a public debate

📖 It is quiet pressure from someone trusted

---
## 🗺️ Nigh Unto Thee, Or Far Off From Thee

This warning covers every possible source of the temptation.

A neighboring nation counts, and a distant nation counts too.

Geography offers no safe zone from this kind of pull.

The warning is meant to leave no gap unguarded.

🗺️ Every possible source is covered here

🏘️ Nearby nations and distant nations both count

🚫 Geography offers no safe zone

📖 No gap is left unguarded

---
## 👁️ Neither Shall Thine Eye Pity Him

This command overrides normal compassion on purpose.

Pity here would mean letting the relationship soften the response.

God is not asking Israel to stop loving these people.

He is asking them to not let love excuse this specific sin.

👁️ Pity here means letting emotion soften justice

🚫 Compassion cannot excuse this sin

❤️ Love for the person is not the issue

📖 Love cannot override this command

---
## 🙈 Neither Shalt Thou Conceal Him

"Conceal" means to hide or protect someone from consequences.

Covering for a family member would feel natural here.

This command removes that option entirely.

Loyalty to God is placed above loyalty to family in this one case.

🙈 Conceal means hiding someone from consequences

👪 Covering family would feel natural here

🚫 That option is removed completely

📖 God's claim outranks family loyalty

# Deuteronomy 13:9-11
# 🪨 The Whole Nation Responds
---
## ✋ Thine Hand Shall Be First Upon Him

The person who was tempted has to act first, not hide behind someone else.

This makes it impossible to report the sin without also owning the response.

A private accusation could not lead to a private escape.

The law removes any distance between the accuser and the consequence.

✋ The tempted person must act first

🚫 No hiding behind someone else's hand

⚖️ Reporting and consequence stay connected

📖 Accusation and action cannot be separated

---
## 👥 Afterwards The Hand Of All The People

After the first hand, the whole community joins in.

This turns a private sin into a shared, public judgment.

No single person carries the full weight of the decision alone.

The whole nation takes responsibility for guarding its own loyalty to God.

👥 The whole community joins the judgment

⚖️ No one person carries it alone

🤝 This makes it a shared responsibility

📖 The nation guards its own loyalty

---
## 🪨 Thou Shalt Stone Him With Stones

Stoning was carried out by the community rather than by one executioner.

It required many hands, not a single blow from one person.

The method itself matched the point already made in verse nine.

The whole nation shares ownership of removing this sin.

🪨 Stoning required many hands, not one

👥 The community carried out the sentence

🎯 The method matches verse nine's point

📖 The whole nation owns the outcome

---
## 🙌 Brought Thee Out Of The Land Of Egypt, From The House Of Bondage

The same phrase already appeared back in verse five.

The repeat is not an accident or filler.

Moses keeps returning to the exodus as the reason obedience is owed.

Every warning in this chapter traces back to that same rescue.

🔁 This phrase already appeared in verse five

📜 The repeat is intentional, not filler

🙌 The exodus is why obedience is owed

📖 Every warning traces back to that rescue

---
## 📢 All Israel Shall Hear, And Fear

The public nature of this punishment served a purpose beyond one guilty person.

Word of it was meant to travel through the whole nation.

That fear was not meant to be cruelty for its own sake.

It was meant to stop the next quiet temptation before it started.

📢 Word of this spread through the nation

😨 Fear here served a real purpose

🚫 It was not cruelty for its own sake

➡️ It aimed to prevent the next temptation

# Deuteronomy 13:12-14
# 🔍 Investigating A Whole City
---
## 🏙️ One Of Thy Cities, Which The LORD Thy God Hath Given Thee

The danger widens here from one person to an entire town.

The land itself is described as a gift, not something Israel earned alone.

A gift can still be misused by the people living in it.

Even a whole city is not beyond this same warning.

🏙️ The danger widens to an entire city

🎁 The land is described as a gift

⚠️ A gift can still be misused

📖 No city is beyond this warning

---
## 💔 The Children Of Belial

"Belial" means worthless or wicked, describing someone with no regard for God.

Calling these men children of Belial brands them by character, not just action.

This same phrase later marks other genuinely corrupt figures in the Old Testament.

The harsh label matches a real danger.

💔 Belial means worthless or wicked

🏷️ The label describes character, not just action

⚠️ The harsh label matches a real danger

📖 The same phrase marks other corrupt figures

---
## 🧲 Have Withdrawn The Inhabitants Of Their City

"Withdrawn" here means led away from loyalty to God.

It does not mean the people physically moved away.

An entire town's direction changed because of a small group's influence.

Corruption spreads fast from a few people to a whole town.

One quiet compromise rarely stays contained to a single household.

🧲 Withdrawn means led away in loyalty

🏘️ A few people changed a whole town

📈 Corruption spreads faster than expected

📖 One compromise rarely stays contained

---
## 🔍 Enquire, And Make Search, And Ask Diligently

Three separate verbs stack together here on purpose.

God requires a careful investigation before any judgment happens.

Rumor alone was never enough to act on.

This law protects innocent people from a false report.

🔍 Three verbs stack up on purpose

🕵️ A careful investigation comes before judgment

🚫 Rumor alone was never enough

📖 This protects the innocent from false reports

---
## ✅ Truth, And The Thing Certain

The standard of proof gets set here, before any action.

Suspicion was not enough, and neither was one uncertain claim.

The evidence had to be solid and confirmed.

God's justice in this chapter is careful, not reckless.

⚖️ Proof had to be solid, not assumed

🚫 Suspicion alone was not enough

✅ The evidence had to be confirmed

📖 This justice is careful, not reckless

# Deuteronomy 13:15-18
# 🔥 An Heap Forever
---
## ⚔️ Smite The Inhabitants Of That City With The Edge Of The Sword

"Edge of the sword" is a common Old Testament phrase for total military defeat.

It does not describe a partial battle or a warning strike.

The judgment matches the seriousness already described back in verse fourteen.

This was the most severe penalty available under this law.

⚔️ Edge of the sword means total defeat

🚫 This was not a partial strike

⚖️ It matches the seriousness of verse fourteen

📖 This was the most severe penalty available

---
## 🐄 Destroying It Utterly, And All That Is Therein, And The Cattle Thereof

"Utterly" leaves nothing exempted from this judgment, not even the animals.

Livestock usually counted as valuable property worth keeping after a battle.

Here, even that value is not allowed to survive.

Nothing about this city was meant to continue in any form.

🐄 Even the livestock was not spared

💰 Livestock was normally valuable after a battle

🚫 That value was not allowed to survive

📖 Nothing here was meant to continue

---
## 🔥 Burn With Fire The City

This is not a normal war where the winning side keeps the plunder.

Every possession in the city gets gathered and burned along with the buildings.

Refusing the wealth proves the judgment was not about greed.

The whole action is aimed at God, not at Israel's own gain.

🔥 The plunder is burned, not kept

🚫 This was not a normal war for spoil

💸 Refusing the wealth rules out greed

📖 The action is aimed at God, not gain

---
## 🏚️ It Shall Be An Heap For Ever

The ruined city was left as a permanent landmark, never rebuilt.

Anyone who traveled past it afterward would know exactly what happened there.

The site itself became a lasting warning without needing a single word.

Some lessons in scripture are written into the land itself.

🏚️ The ruin was left as a landmark

🚷 It was never allowed to be rebuilt

👀 Travelers would know what happened there

📖 The land itself carried the warning

---
## 🔗 There Shall Cleave Nought Of The Cursed Thing To Thine Hand

"Cleave" again means to stick close, the same word used back in verse four.

"The cursed thing" refers to anything devoted to destruction under this judgment.

No soldier was allowed to quietly keep a valuable item for himself.

Personal gain could not attach itself to an act meant only for God.

🔗 Cleave means stick close, as in verse four

🚫 The cursed thing could not be kept

🙅 No soldier could quietly profit here

📖 Personal gain had no place in this act

---
## 🔥 That The LORD May Turn From The Fierceness Of His Anger

Obedience here is directly tied to the nation's safety, not one city's fate alone.

Keeping the cursed things would have put the whole nation at risk.

Mercy and growth were promised on the far side of full obedience.

God's anger was never random, and neither was his mercy.

🔥 Disobedience would risk the whole nation

🛡️ Full obedience protected everyone else

🌱 Mercy and growth follow real obedience

📖 God's anger and mercy are not random

---
## 🎯 To Do That Which Is Right In The Eyes Of The LORD Thy God

One standard sums up the whole chapter here.

Every warning about prophets, family members, and whole cities points back to it.

Right is measured by God's own eyes, not by popularity or good intentions.

A sign, a loved one, or a crowd can all be wrong at once.

Only one measure decides what Israel should actually follow.

🎯 This line sums up the whole chapter

👁️ Right is judged by God's eyes

🚫 Signs, love, and crowds can all mislead

📖 One measure decides what to follow
`.trim();

export const DEUTERONOMY_THIRTEEN_PERSONAL_SECTIONS = parseDeuteronomyThirteenRawNotes(DEUTERONOMY_THIRTEEN_RAW_NOTES);
