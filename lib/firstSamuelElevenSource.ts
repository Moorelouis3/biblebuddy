export type FirstSamuelElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelElevenRawNotes(rawText: string): FirstSamuelElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 11:${startVerse}` : `1 Samuel 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 1 Samuel 11 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_ELEVEN_RAW_NOTES = `# FirstSamuel 11:1-3
# 🐍 Nahash Threatens Jabeshgilead
---
## 🐍 Nahash The Ammonite

The name Nahash means serpent in Hebrew.

The Ammonites descended from Lot, Abraham's nephew.

They had lived as longtime rivals of Israel for generations.

Nahash now threatens a town on Israel's side of the Jordan River.

This is the first real crisis of Saul's brand new reign.

🐍 Nahash means serpent in Hebrew

📜 The Ammonites descended from Lot

⚔️ They were longtime rivals of Israel

📖 Saul's first crisis begins right away

## 🗺️ Encamped Against Jabeshgilead

Jabeshgilead sat east of the Jordan River in the region of Gilead.

It belonged to the tribe of Manasseh, across the river from the rest of Israel.

An army camping against a city meant a siege was beginning.

The town was cut off and surrounded, waiting for outside help.

🗺️ Jabeshgilead sat east of the Jordan

🌳 It belonged to the tribe of Manasseh

⛺ An army camping there meant a siege

📖 The town was surrounded and cut off

## 🤝 Make A Covenant With Us And We Will Serve Thee

The elders of Jabesh offer to surrender without a fight.

A covenant here means a treaty of submission, not friendship.

They would become servants who pay tribute to Nahash.

Surrender was common when a city had no hope of winning.

🤝 The elders offer to surrender

📜 A covenant here means a treaty

💰 They offer to pay tribute

📖 Surrender seemed like their only option

## 👁️ Thrust Out All Your Right Eyes

Nahash's threat was not random cruelty.

Ancient soldiers held a shield in the left hand.

Losing the right eye ruined a man's ability to aim a weapon.

Nahash wanted to disable every soldier in the city, not just shame them.

The wound would also mark them forever as a defeated people.

👁️ Losing an eye ruined a soldier

🛡️ Soldiers held their shield in the left hand

😨 The threat aimed to disable every fighter

📖 Defeat would mark them forever

## ⏳ Seven Days Respite

Respite means a short delay or a pause before something happens.

Seven often marks a complete or full period of time in scripture.

The elders were buying time, not truly agreeing to surrender.

They hoped an army would arrive before the week ended.

⏳ Respite means a short delay

🔢 Seven marks a complete period

🕰️ They were buying time, not surrendering

📖 They hoped for rescue before the deadline

## 📨 Messengers Unto All The Coasts Of Israel

Coasts here does not mean the edge of the sea.

It means the borders and territory of the whole nation.

Messengers were sent out to every tribe asking for help.

This was Israel's version of an emergency call to arms.

📨 Messengers went to every tribe

🗺️ Coasts here means Israel's borders

🚨 The call was a national emergency

📖 Every tribe was asked to respond

# FirstSamuel 11:4-7
# 😡 Saul's Anger Is Kindled
---
## 🏡 Gibeah Of Saul

Gibeah was Saul's own hometown in the territory of Benjamin.

It later became the capital city of his kingdom.

The messengers went there first because it was already known as his home.

News of the crisis reached Saul in the most personal way possible.

🏡 Gibeah was Saul's hometown

👑 It later became his capital

📨 Messengers brought the news there

📖 The crisis reached Saul personally

## 😭 Lifted Up Their Voices And Wept

This phrase describes loud, open weeping, not quiet tears.

The whole town reacted together once they heard the news.

Public grief like this showed how serious the threat felt.

Nobody yet knew what Saul, their newly anointed king, would do.

😭 The weeping was loud and open

🏘️ The whole town reacted together

⚠️ Public grief showed how serious this was

📖 Nobody yet knew what Saul would do

## 🐂 Came After The Herd Out Of The Field

Saul had already been anointed king back in chapter ten.

Yet here he is still doing ordinary farm work.

He had not moved into a palace or taken on royal duties yet.

Saul's kingship began quietly, without any change to his daily life.

🐂 Saul was still doing farm work

👑 He had already been anointed king

🏠 No palace or royal life yet

📖 His kingship began without any fanfare

## ❓ What Aileth The People That They Weep

Aileth is an old word that means what is wrong.

Saul has no idea yet what has happened at Jabeshgilead.

He returns from the field into a scene of public grief.

His first question shows he was still an ordinary man among his people.

❓ Aileth is an old word for wrong

🙈 Saul does not know the news yet

🚶 He walks straight into the grief

📖 He still acted like an ordinary man

## 🕊️ The Spirit Of God Came Upon Saul

This same Spirit had already changed Saul back in chapter ten.

Now that Spirit returns at the exact moment Saul needs it most.

It gives him the courage and authority to act like a king.

God equips Saul right when leadership is actually required of him.

🕊️ The Spirit had touched Saul before

⚡ It returns exactly when needed

💪 It gives him courage to lead

📖 God equips Saul for this moment

## 🐂 Hewed Them In Pieces

Saul cuts a pair of oxen into pieces and sends them out.

The pieces travel with messengers to every part of Israel.

The message is blunt and physical.

Join Saul now or your own oxen will suffer the same fate.

This was a dramatic way to demand a fast response.

🐂 Saul cuts oxen into pieces

📨 Pieces travel with messengers everywhere

⚠️ The threat demands a fast response

📖 Israel had never seen a summons like this

## 😨 The Fear Of The Lord Fell On The People

This was not fear of Saul or his threat alone.

It was a sense of holy urgency that God placed on the people.

That feeling pushed every tribe toward the same decision at once.

Israel's unity here came from God, not from persuasion.

😨 This fear came from God himself

🔥 It created holy urgency in the people

🤝 It pushed every tribe toward Saul

📖 Israel's unity came from God, not persuasion

## 🤝 They Came Out With One Consent

One consent means the tribes acted together without arguing.

No tribe hesitated or debated whether to help.

This unity was rare for Israel at this point in its history.

A shared threat had accomplished what nothing else had before.

🤝 The tribes acted together without arguing

⚡ No tribe hesitated to respond

📊 This unity was rare for Israel

📖 One shared threat united the whole nation

# FirstSamuel 11:8-11
# ⚔️ The Battle At Jabesh
---
## 🔢 Numbered Them In Bezek

Bezek was the gathering point where Saul mustered his army.

Numbering an army meant counting every man ready to fight.

This kind of count confirmed the army was truly ready for battle.

Saul is now acting fully like a king leading troops.

🔢 Bezek was the muster point

📋 Numbering confirmed the army's size

⚔️ The count showed Israel was ready

📖 Saul now leads like a true king

## 🏛️ The Men Of Judah Thirty Thousand

Israel is counted separately from the tribe of Judah here.

This is one of the earliest hints of a divide that grows later in the Bible.

Judah would eventually split from the rest of Israel after Solomon's reign.

Even in this early victory, an old pattern is already showing itself.

🏛️ Judah is counted apart from Israel

🔮 This hints at a later divide

👑 Judah would split off after Solomon

📖 An old pattern is already showing

## ☀️ By That Time The Sun Be Hot

Ancient Israel had no clocks or watches to mark the hour.

People measured time by where the sun sat in the sky.

This phrase points to midmorning, a few hours after sunrise.

Saul promises rescue at a specific, exact moment, not just someday soon.

☀️ Israel measured time by the sun

🕘 This phrase points to midmorning

⏰ Saul names an exact moment

📖 Rescue was promised, not just hoped for

## 🎭 To Morrow We Will Come Out Unto You

The men of Jabesh tell Nahash they will surrender tomorrow.

They know help is already on the way by then.

This answer is really a stall, not a true promise.

Nahash has no idea he has just been tricked.

🎭 Jabesh promises surrender for tomorrow

🤫 They already know help is coming

🎣 The answer is really a stall

📖 Nahash does not know he was tricked

## 🛡️ Three Companies

Saul splits his army into three separate groups.

Attacking from multiple directions confuses and overwhelms an enemy camp.

This tactic was common in ancient warfare for a surprise attack.

Saul plans this battle with real military skill.

🛡️ Saul splits his army in three

🌀 Multiple directions confuse the enemy

🌙 This tactic suited a surprise attack

📖 Saul shows real military skill

## 🌌 The Morning Watch

Ancient Israel divided the night into three watches for guard duty.

The morning watch was the final watch, right before sunrise.

Attacking then meant catching the Ammonites tired and half asleep.

Saul times the assault for the moment his enemy is weakest.

🌌 The night had three watches

🌅 The morning watch came before sunrise

😴 The Ammonites were tired and unready

📖 Saul struck when his enemy was weakest

## 🔥 Until The Heat Of The Day

The battle stretched from early morning into the hottest part of the day.

This was not a short skirmish that ended quickly.

Saul's men fought a long, relentless fight for total victory.

The length of the battle shows how completely Israel committed to winning.

🔥 The fight lasted into the hottest hours

⏳ This was a long battle, not brief

💪 Saul's men fought with full commitment

📖 Israel committed fully to this fight

## 💨 Two Of Them Were Not Left Together

This phrase describes total scattering, not a partial win.

The surviving Ammonites were split apart and unable to regroup.

Saul's first military campaign ends in complete, decisive victory.

Israel's new king proves himself before the whole nation.

💨 The enemy was completely scattered

🏃 Survivors could not regroup at all

🏆 Saul's first campaign was a total win

📖 Israel's new king proved himself

# FirstSamuel 11:12-13
# 🕊️ Saul Shows Mercy
---
## 😠 Shall Saul Reign Over Us

This question echoes the doubt some men raised back in chapter ten.

Those men had mocked Saul and refused to bring him gifts.

After the victory, the people want those doubters punished for their scorn.

Yesterday's mockery now looks foolish next to today's clear win.

😠 This echoes doubt from chapter ten

🙄 Some men had mocked Saul before

⚔️ The people now want them punished

📖 Victory made their mockery look foolish

## ⚔️ Bring The Men That We May Put Them To Death

The people ask Saul to execute everyone who doubted him.

This request comes from anger and a desire for revenge.

It also tests what kind of king Saul will actually be.

Power over life and death is now genuinely in Saul's hands.

⚔️ The people demand the doubters die

😤 Their request comes from anger

🧪 It tests what kind of king Saul is

📖 Real power now rests in Saul's hands

## 🕊️ There Shall Not A Man Be Put To Death This Day

Saul refuses the execution the people are demanding.

This is Saul's first major decision as a proven king.

He chooses mercy over revenge on the very day of his triumph.

This restraint stands in sharp contrast to choices Saul makes later in his story.

🕊️ Saul refuses to execute anyone

👑 This is his first major decision

❤️ He chooses mercy over revenge

📖 Later choices will not always match this one

## 🙏 The Lord Hath Wrought Salvation In Israel

Saul gives credit for the victory to God, not to himself.

Wrought simply means done or accomplished.

A king focused on his own glory would have said something different.

Saul begins his reign by pointing away from himself and toward God.

🙏 Saul credits God, not himself

🔨 Wrought simply means done or accomplished

🤴 A prideful king would say it differently

📖 Saul points to God, not his own glory

# FirstSamuel 11:14-15
# 👑 Kingship Renewed At Gilgal
---
## 🏕️ Let Us Go To Gilgal And Renew The Kingdom There

Saul had already been made king privately back in chapter ten.

Gilgal was the site of Israel's very first camp inside Canaan.

Renewing the kingdom there means confirming it publicly after a proven victory.

This second ceremony ties Saul's rule to Israel's own beginnings.

🏕️ Saul was already crowned once before

🚩 Gilgal was Israel's first camp in Canaan

✅ This ceremony confirms him after real proof

📖 Saul's rule is tied to Israel's beginnings

## 👑 Made Saul King Before The Lord

This phrase places God as the true witness of Saul's kingship.

Saul does not simply rule by the people's applause alone.

Every king in Israel ultimately answers to God as the higher authority.

The ceremony reminds everyone present exactly who Saul serves.

👑 God witnesses Saul's kingship directly

🙌 The people alone did not crown him

⚖️ Every king answers to God

📖 The ceremony shows who Saul truly serves

## 🔥 Sacrifices Of Peace Offerings

A peace offering was partly burned and partly shared as a meal.

It celebrated fellowship between the people and God, not just payment for sin.

Offering it here turns Saul's coronation into a shared, joyful meal.

The whole community eats together in celebration of their new king.

🔥 Peace offerings were partly burned

🍽️ The rest became a shared meal

🎉 It turned the day into celebration

📖 The whole community feasted together

## 🎉 Rejoiced Greatly

The chapter that opened with weeping now ends in joy.

Doubt and fear from chapter ten have turned into confidence.

Saul has proven himself as a leader chosen by God and by his people.

Israel's first king begins his reign on a note of real unity.

🎉 The chapter turns from grief to joy

🔄 Doubt has turned into confidence

🤝 Saul is accepted by God and people

📖 Israel's king begins his reign in unity
`.trim();

export const FIRST_SAMUEL_ELEVEN_PERSONAL_SECTIONS = parseFirstSamuelElevenRawNotes(FIRST_SAMUEL_ELEVEN_RAW_NOTES);
