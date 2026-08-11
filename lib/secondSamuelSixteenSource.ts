export type SecondSamuelSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelSixteenRawNotes(rawText: string): SecondSamuelSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 16:${startVerse}` : `2 Samuel 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 2 Samuel 16 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_SIXTEEN_RAW_NOTES = `# SecondSamuel 16:1-4
# 🍇 Ziba's Provisions
---
## 🐴 Ziba The Servant Of Mephibosheth Met Him

Ziba was the steward David placed over Mephibosheth's land back in chapter nine.

Mephibosheth was Jonathan's crippled son, the one David chose to bless for Jonathan's sake.

David is fleeing Jerusalem right now, running from his own son Absalom.

Ziba shows up exactly where the road needs help most.

🐴 Ziba manages Mephibosheth's household
🦵 Mephibosheth is Jonathan's crippled son
🏃 David is fleeing his own son
📖 Help arrives at the hardest moment

## 🍞 Two Hundred Loaves Of Bread, And An Hundred Bunches Of Raisins

This is a large, carefully assembled supply for an army on the run.

Raisins and dried summer fruit traveled well and gave quick energy on a hard march.

A "bottle of wine" here means a full skin, not a small modern bottle.

🍞 Bread meant real food for many men
🍇 Raisins traveled well on the road
🍷 A bottle meant a full wineskin
➡️ Someone prepared for a long journey

## 🐴 The Asses Be For The King's Household To Ride On

Ziba explains each gift item by item before David even asks a second question.

Donkeys carried people, not soldiers on horseback, across the rough hill country here.

The wine was meant for anyone who grew "faint," meaning exhausted and weak, in the wilderness.

🐴 Donkeys carried the king's family
🥖 Bread and fruit fed the young men
🍷 Wine helped the weary recover
📖 Every gift matched a real need

## 🙏 I Humbly Beseech Thee That I May Find Grace

"Beseech" means to beg or plead earnestly, not a casual request.

Ziba claims Mephibosheth stayed behind in Jerusalem hoping Israel would restore Saul's kingdom to him.

David believes Ziba without checking the story, and instantly gives him everything that belonged to Mephibosheth.

Chapter nineteen later reveals Mephibosheth's own side of this story, so David's judgment here may prove hasty.

🙏 Beseech means to plead earnestly
❓ Ziba accuses Mephibosheth of disloyalty
⚖️ David judges without hearing both sides
➡️ A fast decision can still be wrong

# SecondSamuel 16:5-8
# 🪨 Shimei's Curse
---
## 📍 When King David Came To Bahurim

Bahurim was a village near Jerusalem, on the road David's group is now traveling.

This is the second person from Saul's old household David meets on this same road.

The mood keeps darkening as the king's small procession moves further from the city.

📍 Bahurim sat along David's escape route
👥 A second encounter from Saul's family
😔 The mood grows darker with distance
➡️ The journey out of Jerusalem is not over

## 👨 A Man Of The Family Of The House Of Saul

Shimei belongs to Saul's own extended family, the king David replaced years earlier.

He has waited for a moment like this, when David finally looks weak and defeated.

Old grudges often stay hidden until the person holding power suddenly loses it.

👨 Shimei comes from Saul's family
⏳ He waited for David's weak moment
💔 Old grudges surface when power shifts
📖 Weakness invites old enemies forward

## 🗣️ Cursed Still As He Came

To curse here means calling down harm and disgrace on someone, not just using rude language.

Shimei does not curse once and stop, he keeps it up the whole time he walks alongside them.

This is a sustained public attack, not one angry outburst.

🗣️ Cursed means calling down harm
🚶 Shimei walked and cursed the whole time
📢 This was a sustained public attack
➡️ Anger this old rarely stays brief

## 🪨 He Cast Stones At David

Shimei throws actual stones at the king and his officers, not just insults.

David's mighty men surround him on both sides, yet no one stops Shimei by force.

That restraint only makes sense a few verses later, once David explains why he allows it.

🪨 Real stones were thrown, not words
🛡️ Guards stood by without stopping him
🤔 The restraint seems strange at first
📖 David's reason comes only a few verses later

## 🩸 Thou Bloody Man, And Thou Man Of Belial

"Bloody man" accuses David of murder, blaming him for the deaths tied to Saul's family.

"Belial" is an old word for a worthless, wicked person.

Later Bible writers use it as a name for evil itself.

Shimei picks the two harshest labels his language has and throws both at once.

🩸 Bloody man means an accused murderer
😈 Belial means a worthless wicked person
🎯 Both are the harshest insults available
➡️ Shimei aims for maximum shame

## 👑 The LORD Hath Delivered The Kingdom Into The Hand Of Absalom

Shimei twists a partial truth into a full accusation.

David never personally killed Saul, and Scripture shows him mourning Saul's death rather than causing it.

Shimei still reads David's rise and Absalom's revolt as God's direct payback for Saul's whole family.

👑 Shimei blames David for Saul's fall
🙅 David never killed Saul himself
😢 David actually mourned Saul's death
📖 Shimei twists truth into blame

## 😤 Taken In Thy Mischief, Because Thou Art A Bloody Man

"Mischief" here is an old word for real trouble or disaster, not childish pranks.

Shimei treats David's current flight from Absalom as proof that guilt has finally caught up with him.

He reads David's suffering as punishment rather than as a painful test of faith.

😤 Mischief means real trouble or disaster
⚖️ Shimei sees this as deserved punishment
❓ He misreads suffering as guilt
➡️ Pain is not always proof of wrongdoing

# SecondSamuel 16:9-14
# ⚔️ David's Restraint
---
## 🐕 This Dead Dog Curse My Lord The King

"Dead dog" was one of the harshest insults available in this culture, meaning worthless and beneath notice.

Abishai, Joab's brother, cannot stand hearing the king spoken to this way.

He calls Shimei a dead dog right back, treating the insult as something no one should be allowed to survive.

🐕 Dead dog meant utterly worthless
😡 Abishai cannot tolerate the insult
🗣️ He turns the insult back on Shimei
➡️ Loyalty can turn quickly into rage

## ⚔️ Let Me Go Over, And Take Off His Head

Abishai offers to execute Shimei on the spot for cursing the king.

He is Zeruiah's son, David's own nephew, and one of the fiercest men in David's army.

His instinct is protection through violence, ending the threat immediately.

⚔️ Abishai offers to kill Shimei
👨‍👩‍👦 He is David's nephew through Zeruiah
🛡️ His instinct is violent protection
📖 Loyalty and violence sit close together

## 🛑 What Have I To Do With You, Ye Sons Of Zeruiah

This is an old expression meaning "this is not your decision to make."

David says nearly the identical line to Abishai and Joab earlier in his reign.

This tension between them was not new.

David overrules his strongest soldier in this exact moment of danger.

🛑 The phrase means stay out of this
🔁 David has said this line before
👑 The king overrules his top soldier
➡️ Restraint took real strength here

## 🙏 It May Be That The LORD Will Look On Mine Affliction

David chooses to see Shimei's cursing as something God might be allowing, not just an accident.

"Affliction" means his present suffering and disgrace, fleeing his own capital and his own son.

David hopes God will "requite," meaning repay, him with good later because he endured this cursing without striking back.

🙏 David sees a possible purpose in it
😔 Affliction means his current suffering
⚖️ Requite means repay in the future
📖 David chooses patience over revenge

## 😴 Came Weary, And Refreshed Themselves There

Shimei keeps pace with them, cursing and throwing stones and dust the entire way to this point.

The chase and the shouting finally stop once David's group reaches a resting place.

A hard, humiliating day ends simply with tired men catching their breath.

😴 The whole group arrives exhausted
🪨 Shimei's attack lasted the entire walk
🧺 Rest finally comes at day's end
➡️ Even a brutal day eventually ends

# SecondSamuel 16:15-19
# 🏙️ Absalom Enters Jerusalem
---
## 🏙️ Absalom, And All The People The Men Of Israel, Came To Jerusalem

Absalom now controls the capital city David built his whole kingdom around.

This is the visible proof of just how far the rebellion has succeeded.

Ahithophel, once David's own trusted counselor, stands beside Absalom instead.

🏙️ Absalom now holds Jerusalem
👑 The rebellion has clearly succeeded
🧠 Ahithophel now advises Absalom
📖 David's own advisor changed sides

## 🧠 Ahithophel With Him

Ahithophel had served as one of David's most valued counselors for years.

Chapter fifteen already showed him quietly joining Absalom's conspiracy before David even left the city.

His switch to Absalom's side is treated in this culture as a serious, almost unthinkable betrayal.

🧠 Ahithophel once counseled David closely
🔁 He already defected back in chapter fifteen
💔 His betrayal was seen as extreme
➡️ Trusted advisors can still turn away

## 🤝 Hushai The Archite, David's Friend

Hushai was sent back into Jerusalem earlier by David for one specific purpose.

His job was to work against Ahithophel's advice from the inside.

"The Archite" names the region Hushai came from, a detail marking him as a real, known person.

He now approaches Absalom directly, exactly according to David's plan.

🤝 Hushai was David's planted spy
🏞️ Archite names his home region
🎯 He approaches Absalom on purpose
📖 David's strategy is already in motion

## 👑 God Save The King, God Save The King

Hushai shouts the loyalty cry twice, doubling it for full dramatic effect.

The line sounds like total submission to Absalom as the new king.

Absalom cannot yet tell that the words are carefully aimed to sound loyal while hiding Hushai's real mission.

👑 The cry is repeated for emphasis
🎭 It sounds like full submission
😏 Absalom cannot see the deception
➡️ Words can hide a hidden purpose

## ❓ Is This Thy Kindness To Thy Friend

Absalom directly questions why David's own close friend would abandon him and switch sides so easily.

Hushai answers with a carefully worded line that never actually names Absalom as the rightful king.

He claims loyalty to "whom the LORD, and this people" choose, technically true and yet completely misleading.

❓ Absalom doubts Hushai's loyalty
🗣️ Hushai's answer avoids naming Absalom
🎭 His words are technically true
📖 A careful answer can still deceive

# SecondSamuel 16:20-23
# 🏕️ Ahithophel's Counsel
---
## 🗣️ Give Counsel Among You What We Shall Do

Absalom now turns to his advisors for a plan to secure his new position.

Asking for counsel here is really asking how to make this rebellion permanent and irreversible.

Ahithophel is about to answer with advice far more shocking than a simple battle strategy.

🗣️ Absalom seeks advice on next steps
🎯 The real goal is an irreversible break
😨 Ahithophel's answer will be extreme
➡️ Not every counsel given is wise

## 🏕️ Go In Unto Thy Father's Concubines

Ahithophel advises Absalom to publicly take David's concubines, the women David left behind to keep the house in chapter fifteen.

In this culture, taking a king's concubines was widely understood as a direct claim to his throne.

This single act was meant to announce Absalom's kingship in the most public way possible.

🏕️ David's concubines were left behind
👑 Taking them claimed the throne publicly
📢 It announced Absalom's kingship loudly
📖 A shocking act carried real political weight

## 💔 All Israel Shall Hear That Thou Art Abhorred Of Thy Father

"Abhorred" means hated or completely rejected, a permanent and public break, not a private argument.

Ahithophel wants everyone in the kingdom to know reconciliation with David is now impossible.

That certainty is the entire point of the plan.

💔 Abhorred means totally rejected
📢 The break becomes fully public
🚫 Reconciliation is made impossible
➡️ Permanence was the whole strategy

## 💪 The Hands Of All That Are With Thee Be Strong

Ahithophel's real goal is not humiliating David, it is locking Absalom's own soldiers into the fight.

Once this act cannot be undone, no soldier could quietly slip back to David's side without facing Absalom's wrath.

Fear of no return, not loyalty alone, is what Ahithophel is really building here.

💪 The goal is locking in the soldiers
🚫 No quiet return to David after this
😨 Fear replaces loyalty as the glue
📖 Some leaders bind followers through fear

## ⛺ Spread Absalom A Tent Upon The Top Of The House

This fulfills a specific warning God gave through the prophet Nathan back in chapter twelve, after David's sin with Bathsheba.

Nathan had said David's own household would rise against him.

Nathan added that this exact shame would happen openly, in broad daylight.

What looks like Ahithophel's clever political scheme is actually judgment already spoken years earlier.

⛺ A tent was set on the rooftop
📜 Nathan's warning from chapter twelve is fulfilled
☀️ It happened openly, as Nathan said
📖 A political scheme fulfilled God's word

## 🧠 As If A Man Had Enquired At The Oracle Of God

Ahithophel's advice carried the weight of a direct answer from God himself, at least in most people's eyes.

That reputation explains why both David and Absalom trusted his counsel so completely at different points.

His wisdom was real, yet even this trusted voice was now serving a rebellion built on betrayal.

🧠 Ahithophel's counsel seemed god given
👥 Both David and Absalom trusted him
⚠️ Real wisdom still served a betrayal
➡️ Trusted advice is not always good advice
`.trim();

export const SECOND_SAMUEL_SIXTEEN_PERSONAL_SECTIONS = parseSecondSamuelSixteenRawNotes(SECOND_SAMUEL_SIXTEEN_RAW_NOTES);
