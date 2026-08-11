export type SecondSamuelFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelFourRawNotes(rawText: string): SecondSamuelFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 4:${startVerse}` : `2 Samuel 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 2 Samuel 4 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_FOUR_RAW_NOTES = `
# SecondSamuel 4:1-4
# 😨 Ishbosheth's Kingdom Starts To Crumble
---
## 👑 Saul's Son Heard That Abner Was Dead In Hebron

"Saul's son" refers to Ishbosheth, the man Abner had set up as king.

Ishbosheth ruled the northern tribes only because Abner backed him.

Word of Abner's murder in Hebron reaches him almost immediately.

Without Abner, Ishbosheth has nothing left holding his throne together.

👑 Saul's son means Ishbosheth
💪 Abner was the power behind his throne
📰 News of the murder reaches him fast
📖 Ishbosheth has nothing left without Abner

## 😨 His Hands Were Feeble

"Feeble" here is not about Ishbosheth's actual hands.

The phrase is an old way of describing sudden loss of courage.

Think of hearing terrible news and feeling your whole body go weak.

That is the picture this old expression paints.

😨 Feeble hands means sudden loss of courage
💧 It describes an emotional collapse
🫥 Ishbosheth loses his nerve instantly
📖 Fear takes over the moment Abner dies

## 😟 All The Israelites Were Troubled

This trouble spreads past Ishbosheth to the whole northern kingdom.

Abner had personally united Israel behind Ishbosheth in the first place.

Their strongest leader is now gone.

The tribes suddenly have no clear direction.

The kingdom Abner built is already coming apart.

😟 The Israelites means the northern tribes
🛡️ Abner had personally united them
🧭 They lose direction without him
📖 The kingdom Abner built is unraveling

## ⚔️ Saul's Son Had Two Men That Were Captains Of Bands

A "band" here means a small armed raiding group.

These two men led their own private fighting units under Ishbosheth.

Such groups often acted with real independence from a king's main army.

That independence is exactly what makes these two men so dangerous here.

⚔️ A band means a small raiding group
👤 These men led their own fighters
🏹 Such groups often acted independently
📖 That independence makes them dangerous

## 📛 The Name Of The One Was Baanah, And The Name Of The Other Rechab

The text names both captains before they do anything else.

Naming men this early in the story often signals they are about to matter.

Rechab and Baanah are about to become two of the most infamous traitors in David's story.

Watch these two names closely.

📛 Both captains are named up front
🚩 Early naming often signals importance
🗡️ These two become infamous traitors
📖 Watch these names closely

## 🏘️ The Sons Of Rimmon A Beerothite, Of The Children Of Benjamin

Beeroth was a small town that belonged to the tribe of Benjamin.

Benjamin was Saul's own tribe.

These men are supposed to serve that family.

Their coming act is a betrayal from inside Saul's own household.

🏘️ Beeroth was a town in Benjamin
👪 Benjamin was Saul's own tribe
🗡️ Their coming act is a betrayal
📖 Loyalty here is about to break

## 🧮 For Beeroth Also Was Reckoned To Benjamin

"Reckoned" is an old word for counted.

Beeroth was originally assigned to Gibeon in the book of Joshua.

The writer clarifies that everyone still treated it as Benjamite land.

🧮 Reckoned is an old word for counted
🗺️ Beeroth was originally listed under Gibeon
👪 People still treated it as Benjamite
📖 The writer clears up the confusion

## 🚶 The Beerothites Fled To Gittaim, And Were Sojourners There Until This Day

"Sojourners" means people living as outsiders in a land that is not their own.

At some point the town of Beeroth was abandoned.

Its people scattered to a nearby place called Gittaim.

"Until this day" tells us the writer is speaking from his own later time.

🚶 Sojourners means outsiders living elsewhere
🏚️ Beeroth's people scattered to Gittaim
🖋️ Until this day marks the writer's time
📖 Even small towns carry real history

## 👶 Jonathan, Saul's Son, Had A Son That Was Lame Of His Feet

This introduces a boy the text will later name Mephibosheth.

Jonathan was David's closest friend.

Jonathan died alongside Saul back in chapter one.

This grandson of Saul returns later in the story.

👶 This introduces Jonathan's young son
🤝 Jonathan was David's closest friend
🔁 This child returns later in the story
📖 David will show him real kindness later

## 🤕 He Fell, And Became Lame. And His Name Was Mephibosheth

His nurse fled with him the moment news came that Saul and Jonathan were dead.

In her rush to escape, she dropped him.

The fall permanently injured his feet.

He was only five years old when this happened.

Mephibosheth's injury becomes part of his identity later in the story.

🏃 His nurse fled with him in panic
🤕 The fall left him permanently lame
🎂 He was only five years old
📖 This injury defines him later on

# SecondSamuel 4:5-8
# 🗡️ Rechab And Baanah Murder Ishbosheth
---
## ☀️ They Came About The Heat Of The Day To The House Of Ishbosheth

The heat of the day means early afternoon.

These were the hottest hours in this climate.

Most people in the ancient Near East rested indoors during these hours.

Rechab and Baanah time their visit for exactly this quiet window.

☀️ Heat of the day means early afternoon
😴 People typically rested during these hours
🎯 The timing is chosen on purpose
📖 They strike when no one is watching

## 🛏️ Who Lay On A Bed At Noon

Ishbosheth is resting in the middle of his own house.

He is completely unguarded at this moment.

A stronger king would usually have guards posted even at rest.

This detail shows how weak Ishbosheth's kingship had already become.

🛏️ Ishbosheth is resting unguarded at noon
🛡️ A stronger king would have guards posted
😬 His weakness leaves him exposed
📖 The murder plot fits into that gap

## 🌾 As Though They Would Have Fetched Wheat

Rechab and Baanah use a simple errand as their cover story.

Wheat was a basic household staple.

This excuse would draw no suspicion at all.

The false errand gets them past the door and into the house.

🌾 Fetching wheat was an ordinary errand
🚪 It gives them a reason to enter
🎭 The excuse hides their real purpose
📖 A small lie opens the door to murder

## 🗡️ They Smote Him Under The Fifth Rib

This is the exact same phrase used for Abner's murder back in chapter three.

Striking under the fifth rib meant a fast blow to a vital spot.

That kind of strike was meant to kill quickly.

The writer uses matching language to link these two murders together.

🗡️ The same phrase described Abner's death
🎯 It marks a fatal blow
🔁 The wording links the two murders
📖 Violence in this family keeps repeating

## 🏃 Rechab And Baanah His Brother Escaped

The two men slip away immediately after the killing.

Calling Baanah "his brother" confirms Rechab and Baanah share the same father.

Their father was named Rimmon.

For now, nothing stops them from getting away clean.

🏃 They escape right after the murder
👪 His brother confirms they share a father
🚫 Nothing stops their getaway yet
📖 Their plan seems to be working

## 💀 They Smote Him, And Slew Him, And Beheaded Him

The writer piles up three separate violent verbs back to back.

Striking, killing, and beheading are named as three distinct acts.

Stacking the verbs this way makes the brutality impossible to soften.

This was no quick or merciful killing.

🗡️ Three separate violent acts are named
📜 Each verb marks a deliberate act
💔 The stacking shows real brutality
📖 This was no quick mercy killing

## 🌙 Took His Head, And Gat Them Away Through The Plain All Night

"Gat them away" is an old way of saying they got away or fled.

They carry the severed head as proof.

They travel all night through open ground called the plain.

Ishbosheth ruled from Mahanaim, so this journey covers real distance toward Hebron.

🏃 Gat them away means they fled
🩸 They carry the head as proof
🌙 They travel through the night
📖 The proof is meant to win a reward

## 🎁 Behold The Head Of Ishbosheth The Son Of Saul Thine Enemy

Rechab and Baanah present the head to David as a gift.

They expect praise and a reward for it.

They call Ishbosheth David's enemy.

They frame the murder as a favor done for David's benefit.

🎁 They present the head as a gift
😈 They call Ishbosheth David's enemy
🤑 They expect a reward for the killing
📖 They badly misjudge David's character

## ⚖️ The LORD Hath Avenged My Lord The King This Day Of Saul, And Of His Seed

"Avenged" means paid back a wrong.

"Seed" is an old word for offspring or descendants.

The killers dress up their crime as God's own justice against Saul's family.

They are copying the same excuse the Amalekite used back in 2 Samuel 1.

That excuse worked no better the first time either.

⚖️ Avenged means paid back for a wrong
👪 Seed is an old word for descendants
🗣️ They claim this murder was God's justice
📖 David has heard this excuse before

# SecondSamuel 4:9-12
# ⚖️ David Judges The Assassins
---
## 🙏 As The LORD Liveth, Who Hath Redeemed My Soul Out Of All Adversity

"As the LORD liveth" is a formal oath.

David calls on God as a witness to what he is about to say.

"Redeemed" means rescued, and "adversity" means hardship or trouble.

David credits God, not luck, for surviving every danger so far.

🙏 As the LORD liveth is a formal oath
🛡️ Redeemed means rescued from danger
⛈️ Adversity means hardship or trouble
📖 David credits God for his survival

## 📜 One Told Me, Saying, Behold, Saul Is Dead

David recalls an almost identical moment from years earlier.

Back in 2 Samuel 1, an Amalekite claimed he had personally killed Saul.

He expected David to celebrate the news and reward him for it.

David is about to repeat that exact same response.

📜 David recalls a nearly identical moment
👤 An Amalekite once claimed he killed Saul
🎉 He expected celebration and reward
📖 David is about to repeat his response

## ⚔️ I Took Hold Of Him, And Slew Him In Ziklag

David had that earlier messenger executed on the spot.

That messenger had claimed to kill God's anointed king.

Ziklag was the town David was living in at the time.

David is reminding Rechab and Baanah exactly how that case ended.

⚔️ David executed that earlier messenger
🏘️ Ziklag was David's home at the time
🔁 David points back to that exact case
📖 The two situations are about to match

## 📰 Who Thought That I Would Have Given Him A Reward For His Tidings

"Tidings" is an old word for news.

That earlier messenger assumed violence against Saul's family would please David.

Rechab and Baanah are making the exact same assumption now.

Both times, that assumption turns out badly wrong.

📰 Tidings is an old word for news
🤔 The earlier messenger assumed David would celebrate
❌ Both assumptions turn out badly wrong
📖 David does not reward this kind of news

## ⚖️ How Much More, When Wicked Men Have Slain A Righteous Person

David argues that this case is actually worse than the Amalekite's.

That earlier messenger at least claimed a killing in the chaos of battle.

Rechab and Baanah murdered a defenseless man resting in his own home.

⚖️ David argues this case is worse
⚔️ The earlier claim involved a battlefield killing
🛏️ These men killed a man at rest
📖 The circumstances make it far worse

## 🏠 In His Own House Upon His Bed

David names exactly where and how the murder happened.

A man's own bed was supposed to mean safety.

That safety was inside his own house.

Violating both makes the crime even harder to excuse.

🏠 David names the exact scene of the crime
🛏️ A bed was supposed to mean safety
🚫 That safety was violated on purpose
📖 The setting makes the crime worse

## ⚖️ Shall I Not Therefore Now Require His Blood Of Your Hand

"Require his blood" is a formal way of demanding payment for a killing.

David is announcing a verdict here.

This is not simply anger speaking.

He refuses to treat this murder as a favor.

⚖️ Require his blood means demand justice
🗣️ David is announcing a verdict
🚫 He refuses to treat this as a favor
📖 Justice replaces gratitude here

## ⚔️ David Commanded His Young Men, And They Slew Them

David orders his own soldiers to carry out the execution immediately.

There is no trial or delay.

David has already stated the verdict himself.

Rechab and Baanah receive the fate they gave Ishbosheth.

⚔️ David orders their execution
⚡ There is no delay or trial
🔁 They receive the fate they gave Ishbosheth
📖 David's justice matches his words

## 🩸 Cut Off Their Hands And Their Feet, And Hanged Them Up Over The Pool In Hebron

Displaying the bodies this way marked them as condemned criminals.

They were not treated as fallen heroes.

Hebron's pool was a busy public spot.

Everyone in the city would see this display.

The display served as a clear warning against this kind of crime.

🩸 Public display marked them as criminals
🚶 Hebron's pool was a busy public spot
⚠️ The display served as a warning
📖 David makes his justice highly visible

## ⚰️ Buried It In The Sepulchre Of Abner In Hebron

A "sepulchre" is a tomb built specifically for burial.

Ishbosheth receives an honorable burial right beside Abner.

David is not celebrating this death either.

No rival king remains standing between David and the whole nation.

⚰️ A sepulchre is a burial tomb
🤝 Ishbosheth receives an honorable burial
👑 No rival king remains after this
📖 The path to uniting Israel is open
`.trim();

export const SECOND_SAMUEL_FOUR_PERSONAL_SECTIONS = parseSecondSamuelFourRawNotes(
  SECOND_SAMUEL_FOUR_RAW_NOTES,
);
