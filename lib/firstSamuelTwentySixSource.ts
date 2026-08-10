export type FirstSamuelTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelTwentySixRawNotes(rawText: string): FirstSamuelTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 26:${startVerse}` : `1 Samuel 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Samuel 26 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_TWENTY_SIX_RAW_NOTES = `# FirstSamuel 26:1-3
# 🕵️ The Ziphites Betray David Again
---
## 🗣️ The Ziphites Came Unto Saul

The Ziphites lived near the wilderness where David was hiding.

They had already betrayed David once before, back in chapter twenty three.

Here they come to Saul a second time with the very same information.

Betrayal from the same people can happen more than once.

🗣️ Ziphites means people from the town of Ziph

🔁 They already betrayed David once before

😞 The same danger returns from the same source

📖 Some threats do not go away easily

## 🏜️ Doth Not David Hide Himself In The Hill Of Hachilah

The Ziphites give Saul exact directions this time.

Hachilah is a specific hill in the wilderness of Judah.

This is the same location named back when the Ziphites betrayed David before.

Precise details make betrayal far more dangerous than a vague rumor.

🏜️ Hachilah is a specific hill in Judah

🔁 The same location named in chapter twenty three

🎯 Exact directions make this threat serious

➡️ Precise information is more dangerous than rumor

## 🏝️ Before Jeshimon

Jeshimon means a wasteland, a dry and desolate wilderness area.

It sat east of Ziph, overlooking the Dead Sea region.

Naming it before Jeshimon places David deep in harsh, empty country.

Hiding there meant survival itself was already a daily struggle.

🏝️ Jeshimon means a desolate wasteland

🗺️ It overlooked the Dead Sea region

🌵 David hid in truly harsh country

📖 Survival there was already a struggle

## 🔢 Three Thousand Chosen Men Of Israel

This is the exact same size force Saul brought in chapter twenty four.

Chosen men means an elite unit, not an ordinary army draft.

Saul commits serious military resources to hunt one man a second time.

Nothing about this pursuit has cooled down since the last chapter.

🔢 Same three thousand men as chapter twenty four

⚔️ Chosen men means an elite unit

🎯 Serious resources aimed at one man

📖 Saul's pursuit has not cooled at all

## 🏕️ Saul Pitched In The Hill Of Hachilah, By The Way

Saul sets up camp right on the hill the Ziphites named.

By the way means along the main road through that area.

Saul is not searching blindly this time.

He is camped exactly where he was told to look.

🏕️ Saul camps on the exact hill named

🛣️ By the way means along the road

🎯 Saul is not searching blindly here

📖 Precise information shaped his whole plan

## 👁️ David Saw That Saul Came After Him

David abode in the wilderness, watching from a place of safety.

Abode means he stayed and waited rather than fled right away.

He personally sees Saul's army approaching before anyone tells him.

David's own eyes confirm the danger, not just a rumor.

👁️ Abode means David stayed and watched

🏜️ He waited in the wilderness itself

🎯 David confirmed the danger with his own eyes

➡️ Watching first let David plan carefully

# FirstSamuel 26:4-8
# 🕵️ David Scouts The Camp By Night
---
## 🕵️ David Therefore Sent Out Spies

David does not walk into danger blindly.

He sends scouts ahead to confirm what the Ziphites reported.

In very deed means the report is now confirmed as true.

David waits for solid proof before risking anything.

🕵️ David sends scouts to confirm the report

✅ In very deed means fully confirmed true

🧠 David does not act on rumor alone

➡️ Careful confirmation comes before any risk

## 👁️ David Beheld The Place Where Saul Lay

David does not send someone else to check this time.

He goes and sees the camp with his own eyes.

This is a personal, dangerous act of reconnaissance.

The king who hunts him could be looking back at any moment.

👁️ David personally scouts the enemy camp

😨 This was a dangerous, personal risk

🎯 David needed to see it firsthand

➡️ Real courage often means going yourself

## ⚔️ Abner The Son Of Ner, The Captain Of His Host

Host means Saul's whole army.

Abner commands that army as its top general.

He is Saul's cousin, and one of the most powerful men in Israel.

Naming him here shows how well guarded this camp should have been.

⚔️ Host means Saul's entire army

👑 Abner commands as Saul's top general

👨‍👩‍👧 Abner was also Saul's cousin

📖 This camp should have been well guarded

## 🏕️ Saul Lay In The Trench, And The People Pitched Round About Him

A trench here likely means a circle formed by wagons and gear.

Soldiers slept around Saul in every direction as a living wall of protection.

This was meant to make the king nearly impossible to reach.

David is about to prove that plan wrong.

🏕️ Trench means a circular camp barrier

🛡️ Soldiers formed a wall around Saul

🚫 The camp was built to be unreachable

➡️ That protection will not hold tonight

## 🤝 Ahimelech The Hittite, And Abishai The Son Of Zeruiah, Brother To Joab

Ahimelech the Hittite is a foreign soldier fighting loyally for David.

Abishai belongs to David's own family, the sons of Zeruiah.

Zeruiah was David's own sister, which makes Abishai his nephew.

Joab, also named here, will become David's most famous military commander later.

🌍 Ahimelech was a loyal Hittite soldier

👨‍👩‍👧 Zeruiah was David's own sister

👦 That makes Abishai David's nephew

📖 Joab becomes a major commander later

## 🙋 Who Will Go Down With Me To Saul To The Camp

David asks for a volunteer for an extremely dangerous mission.

Walking into a sleeping army's camp risks instant death if discovered.

Abishai answers immediately, without hesitation.

Loyalty like this is rare even among family.

🙋 David asks for one volunteer

☠️ Discovery there meant instant death

⚡ Abishai answers without hesitation

📖 Loyalty proves itself in risk

## 🌙 So David And Abishai Came To The People By Night

Night gave them cover, but it also carried real danger.

One misstep, one snapped twig, could have ended everything instantly.

Only two men walked into a camp of three thousand.

The odds needed more than skill to survive.

🌙 Night gave them cover and risk

🤫 Any misstep could end everything

😳 Only two men entered the camp

📖 The odds needed God's help

## 💤 Saul Lay Sleeping Within The Trench, His Spear Stuck In The Ground At His Bolster

Bolster is an old word for a pillow or headrest.

Saul's spear was a symbol of his royal authority.

Keeping it within arm's reach even in sleep shows how much Saul depended on it.

David and Abishai are now standing right beside a sleeping king.

😴 Bolster means an old word for pillow

👑 The spear symbolized Saul's authority

🗡️ He kept it within arm's reach

➡️ They now stand beside a sleeping king

## ⚡ God Hath Delivered Thine Enemy Into Thine Hand This Day

Abishai reads this moment as God's clear permission to kill Saul.

He offers to end it with a single strike, no second blow needed.

Abishai's logic sounds reasonable on the surface.

David is about to answer with a very different kind of faith.

🗡️ Abishai sees this as God's chance

💥 He offers a single fatal strike

🤔 His logic sounds reasonable at first

➡️ David will answer completely differently

# FirstSamuel 26:9-12
# 🛡️ David Refuses To Kill The Lord's Anointed
---
## 🚫 Destroy Him Not

David refuses Abishai's offer instantly and completely.

This is not hesitation, it is a firm decision already made.

David faced this exact same choice before, back in the cave in chapter twenty four.

His answer has not changed.

🚫 David refuses the offer at once

🧠 This is a firm decision, not fear

🔁 The same choice came up before

📖 His conviction has not changed

## 👑 Who Can Stretch Forth His Hand Against The Lord's Anointed, And Be Guiltless

The Lord's anointed means the king God himself chose and set apart.

Killing him, even in self defense, would still carry real guilt before God.

David trusts that removing a king belongs to God, not to him.

This belief guides nearly every choice David makes in this chapter.

👑 Anointed means chosen and set apart by God

⚖️ Killing him would still bring guilt

🙏 Removing a king belongs to God alone

📖 This belief shapes David's whole choice

## ⚡ As The Lord Liveth

As the LORD liveth was a solemn oath formula used often in this era.

Saying it meant staking real conviction on the truth of what followed.

David uses this exact phrase to open his vow of patience.

His trust in God is not casual, it is sworn.

⚡ As the LORD liveth was a solemn oath

🗣️ It staked real conviction on the words

🙏 David used it to vow patience

📖 His trust in God was sworn, not casual

## ⏳ The Lord Shall Smite Him, Or His Day Shall Come To Die, Or He Shall Descend Into Battle

David lists three different ways God could still remove Saul.

Direct judgment, natural death, or death in a future battle.

Each option leaves the outcome in God's timing, not David's hand.

David chooses patience over a shortcut that felt available right now.

⏳ David names three possible endings

🎯 Direct judgment, natural death, or battle

🙏 Every option stays in God's timing

➡️ Patience wins over an easy shortcut

## 💧 The Cruse Of Water

A cruse is a small clay jug used for carrying water.

David takes the spear and the water jug instead of Saul's life.

Both items sat within arm's reach of the sleeping king.

Taking them proves David could have killed Saul easily, but chose not to.

💧 Cruse means a small clay jug

🗡️ David takes the spear too

🎯 Both proved how close he got

📖 Proof of restraint, not weakness

## 😴 A Deep Sleep From The Lord Was Fallen Upon Them

This was not an ordinary, lucky, heavy sleep.

The text states plainly that God caused it on purpose.

That sleep is the only reason David and Abishai could walk through camp unseen.

God protected this moment from the very start.

😴 The sleep was not ordinary luck

🙏 God caused it on purpose

🚶 It let them move unseen

📖 God protected this entire moment

# FirstSamuel 26:13-16
# 📣 David Calls Out To Abner
---
## 🏔️ Stood On The Top Of An Hill Afar Off

David crosses to a different hill, putting real distance between himself and the camp.

A great space means the gap was wide enough to guarantee his safety.

From there, he can speak without being caught.

Distance now gives David the confidence to confront Saul's own general.

🏔️ David puts real distance from the camp

📏 A great space means a wide, safe gap

🗣️ Distance let him speak safely

➡️ Safety gave David room to confront Abner

## 📣 Answerest Thou Not, Abner?

David shouts directly at Saul's top general, by name.

This is a bold, public challenge, not a quiet whisper.

Everyone in the camp would hear this exchange.

David wants witnesses to what he is about to prove.

📣 David calls out Abner by name

🗣️ This was a bold public challenge

👂 The whole camp could hear it

📖 David wanted witnesses to the truth

## ❓ Who Art Thou That Criest To The King?

Abner does not recognize David's voice from this distance.

His response sounds dismissive, almost insulting.

Abner has no idea yet how badly he has failed at his job.

The insult is about to turn back on him completely.

❓ Abner does not recognize the voice

😤 His tone sounds dismissive

🙈 He does not know his failure yet

➡️ The insult turns back on him

## ⚖️ Art Not Thou A Valiant Man? Wherefore Hast Thou Not Kept Thy Lord The King?

Valiant means brave and highly skilled in battle.

David uses Abner's own famous reputation against him.

A guard this respected should never have let an enemy walk in unseen.

The praise and the accusation arrive in the very same breath.

⚖️ Valiant means brave and highly skilled

🎯 David uses Abner's own reputation

🚨 A guard this good should have noticed

📖 Praise and blame land together here

## ☠️ Ye Are Worthy To Die

This is not an exaggeration, it reflects a real standard of the time.

A guard who let harm reach the king could face death for the failure.

David proves the accusation with hard evidence, not just words.

Abner is left with nothing to say in his own defense.

☠️ A guard's failure could mean death

⚖️ This reflects a real standard then

🎯 David backs it up with proof

📖 Abner has no real defense left

## 🗡️ See Where The King's Spear Is, And The Cruse Of Water

David holds up the missing items for the whole camp to see.

This proof cannot be argued away or explained as a lie.

Anyone who doubted David's story now has to face the evidence.

The king's own belongings testify louder than any argument.

🗡️ David displays the missing spear

💧 The water jug proves it too

👀 The whole camp can see the evidence

📖 Objects prove what words alone could not

# FirstSamuel 26:17-20
# 🎙️ Saul Recognizes David's Voice
---
## 🎙️ Saul Knew David's Voice

Saul does not need to see David to know exactly who is speaking.

Years of history together let him recognize the voice instantly.

This same moment happened once before, in chapter twenty four.

Recognition brings the whole chase to a sudden pause.

🎙️ Saul recognizes the voice instantly

📆 Years together made it familiar

🔁 The same thing happened in chapter twenty four

📖 Recognition pauses the whole chase

## 👦 Is This Thy Voice, My Son David?

Saul still calls David my son, even while hunting him.

That title reveals real affection buried under real jealousy and fear.

The relationship between them was never simple.

Saul's feelings and Saul's actions do not match here.

👦 My son shows real leftover affection

💔 Jealousy and love mixed together

🤷 Their relationship was never simple

➡️ Feelings and actions did not match

## 🙇 Wherefore Doth My Lord Thus Pursue After His Servant?

David still calls Saul my lord and himself servant.

That respectful language continues even after everything Saul has done.

David is not attacking Saul's right to be king.

He only questions why this specific chase continues.

🙇 David still uses respectful titles

🚫 He never attacks Saul's kingship

❓ He only questions the chase itself

📖 Respect and honesty can coexist

## 👂 Let My Lord The King Hear The Words Of His Servant

David asks for something simple, just to be heard.

He is not demanding surrender or promising loyalty on the spot.

He wants Saul to actually listen before this ends in violence.

A fair hearing is the first thing David asks for.

👂 David simply asks to be heard

🚫 He demands nothing else yet

🗣️ He wants Saul to truly listen

📖 A fair hearing came first

## 🙏 If The Lord Have Stirred Thee Up Against Me, Let Him Accept An Offering

David considers that God himself might allow this trial for a reason.

An offering here means a sacrifice meant to make things right with God.

If humans caused this instead, David says they deserve a curse.

David weighs two very different possible causes honestly.

🙏 David considers God's possible purpose

🎁 An offering means a sacrifice to God

😡 He curses any human cause instead

📖 He weighs both options honestly

## 🌍 Driven Me Out From Abiding In The Inheritance Of The Lord, Saying, Go, Serve Other Gods

Being forced out of Israel felt like being cut off from worshiping the true God.

Other nations at that time each had their own local gods.

Leaving the land, to David, meant losing access to God's own presence there.

This is one of the deepest losses David names in the whole chase.

🌍 Inheritance means the promised land itself

🚫 Exile felt like losing access to God

🗿 Other nations worshiped separate local gods

📖 This is David's deepest loss named here

## 🩸 Let Not My Blood Fall To The Earth Before The Face Of The Lord

David pictures his own death in vivid, physical terms.

Spilled blood was seen as something that cried out and could not be hidden.

He asks God directly to prevent an unjust killing.

This plea shows real fear beneath David's calm words.

🩸 David pictures his death vividly

👁️ Spilled blood could not be hidden

🙏 He appeals straight to God

➡️ Real fear sits under his calm

## 🐦 The King Of Israel Is Come Out To Seek A Flea, As When One Doth Hunt A Partridge In The Mountains

A flea is tiny, nearly impossible to catch, and no real threat.

Chasing David with an army is wildly out of proportion to any danger he poses.

Hunting a partridge in rocky mountains meant chasing a bird that could vanish in an instant.

Both images mock how much effort Saul is wasting on so little.

🐦 A flea is tiny and harmless

⚔️ An army is a huge overreaction

🏔️ A partridge is nearly impossible to catch

📖 Both images mock wasted effort

# FirstSamuel 26:21-25
# 🕊️ Saul Confesses And They Part Ways
---
## 😔 I Have Sinned, Return, My Son David

Saul admits wrongdoing out loud, in front of his own army.

He calls David my son again, the same words from chapter twenty four.

This confession sounds sincere in the moment.

Saul's pattern in this book shows these moments rarely last.

😔 Saul confesses in front of his men

👦 He repeats the my son language

🗣️ The words sound sincere here

📖 Saul's past pattern rarely lasted

## 🃏 I Have Played The Fool, And Have Erred Exceedingly

Erred means made a serious mistake.

Saul admits his pursuit of David was foolish from the very start.

This is one of Saul's most honest moments in the entire book.

Honesty in a moment does not always lead to lasting change.

🃏 Erred means made a serious mistake

😳 Saul admits the whole chase was foolish

💯 This is unusually honest for Saul

➡️ Honesty here did not bring lasting change

## 💛 My Soul Was Precious In Thine Eyes This Day

Saul admits David could have killed him and chose not to.

That restraint is what finally breaks through Saul's anger.

Value shown in action moved Saul more than any argument could have.

Mercy proved itself more convincing than pleading ever was.

💛 Saul admits David spared his life

🛡️ Restraint broke through his anger

🎯 Action convinced him, not argument

📖 Mercy proved itself in practice

## 🗡️ Behold The King's Spear

David gives the spear back instead of keeping it as a trophy.

He could have used it as proof forever, or even as a weapon.

Returning it shows David wanted peace, not leverage.

The gesture matches everything David has said about respecting Saul's position.

🗡️ David returns the spear itself

🚫 He keeps no trophy or leverage

🕊️ The gesture aims at real peace

📖 Actions match David's earlier words

## ⚖️ The Lord Render To Every Man His Righteousness And His Faithfulness

Render means to give back or repay.

David asks God to judge honestly, based on how each man actually acted tonight.

He is not asking for revenge against Saul.

He is asking for simple, honest justice.

⚖️ Render means to give back or repay

🙏 David asks God to judge honestly

🚫 This is not a request for revenge

📖 David wants honest justice, nothing more

## 💎 As Thy Life Was Much Set By This Day In Mine Eyes

David valued Saul's life highly enough to spare it completely.

He now hopes God will value David's own life the same way.

This links directly back to the sparing of Saul earlier in the chapter.

David's mercy becomes the measure he hopes for in return.

💎 David valued Saul's life highly

🙏 He hopes for the same in return

🔁 This ties back to David's mercy

📖 Mercy shown becomes mercy hoped for

## 🛡️ Let Him Deliver Me Out Of All Tribulation

Tribulation means ongoing hardship and trouble.

David does not place his final hope in Saul's promise to stop.

He places it in God's protection instead.

That trust will matter, since Saul's peace here will not last forever.

🛡️ Tribulation means ongoing hardship

🙏 David trusts God, not Saul's word

🚫 Saul's promises had broken before

📖 Real hope rested in God alone

## 👋 So David Went On His Way, And Saul Returned To His Place

This is the last time David and Saul ever speak directly in the Bible.

Both men simply walk away in opposite directions.

No final battle, no dramatic reunion, just two paths splitting for good.

Their long conflict ends quietly, not with a resolution.

👋 Their final direct conversation in scripture

🚶 Both men walk away peacefully

🔀 Two paths split apart for good

📖 A long conflict ends quietly
`.trim();

export const FIRST_SAMUEL_TWENTY_SIX_PERSONAL_SECTIONS = parseFirstSamuelTwentySixRawNotes(
  FIRST_SAMUEL_TWENTY_SIX_RAW_NOTES,
);
