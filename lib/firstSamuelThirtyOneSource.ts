export type FirstSamuelThirtyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelThirtyOneRawNotes(rawText: string): FirstSamuelThirtyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelThirtyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+31:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 31 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+31:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+31:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 31 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 31,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 31:${startVerse}` : `1 Samuel 31:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 1 Samuel 31 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_THIRTY_ONE_RAW_NOTES = `# FirstSamuel 31:1-3
# ⚔️ The Battle Turns Against Saul
---
## ⚔️ The Philistines Fought Against Israel

This chapter closes out the entire book of First Samuel.

It happens on the very same days David is chasing the Amalekites back in chapter thirty.

Two very different stories move across Israel at once.

Saul chose to fight the Philistines himself instead of waiting for help.

One king is falling on this battlefield.

Another king is already being made ready to take his place.

⚔️ Saul fights the Philistines directly

🗓️ Same days as David's Amalekite chase

👑 One king is falling here

➡️ Another king is being prepared

---
## 🏃 The Men Of Israel Fled From Before The Philistines

This was not an orderly retreat.

The whole Israelite line broke and ran at once.

Philistine armies fought with iron weapons and disciplined infantry.

Israel's mountain fighters had no answer for that kind of force in open ground.

Saul had feared this exact outcome the night before, in chapter twenty eight.

The witch of Endor's warning is now coming true in real time.

🏃 The whole army broke at once

⚙️ Philistines fought with iron and discipline

🏔️ Israel had no answer in open ground

📖 Samuel's warning from chapter 28 comes true

---
## 🏔️ Fell Down Slain In Mount Gilboa

Mount Gilboa is a mountain ridge in the north of Israel.

It sits inside the Jezreel Valley, close to where the fighting happened.

Open, rolling terrain there favored the Philistines and their chariots.

Choosing this ground to fight on may have already cost Israel the battle.

David will mourn this exact place by name in his lament in the next book.

🏔️ Gilboa sits in the Jezreel Valley

🛡️ Open terrain favored Philistine chariots

📉 The battlefield already worked against Israel

➡️ David will mourn this place by name

---
## 🏃 Followed Hard Upon Saul And Upon His Sons

"Followed hard" means the Philistines pursued Saul without letting up.

This was not a stray skirmish.

The enemy focused directly on killing the king and his sons.

Cutting down a royal family ends a kingdom faster than winning one battle.

Saul becomes the primary target the moment the line breaks.

🏃 Followed hard means relentless pursuit

🎯 Saul and his sons were the target

👑 Killing a royal line topples a kingdom

➡️ The chase decides Israel's future

---
## 💔 Slew Jonathan, And Abinadab, And Melchishua, Saul's Sons

Jonathan was Saul's oldest son and David's closest friend.

Their covenant of loyalty was formed back in chapter eighteen.

Abinadab and Melchishua are two more of Saul's sons named beside him.

All three die in the very same battle their father is losing.

Jonathan will never see the king he actually wanted David to become.

David's grief for Jonathan becomes one of the rawest moments in all of scripture.

🤝 Jonathan was David's closest friend

👥 Abinadab and Melchishua were also Saul's sons

💔 All three sons die together

➡️ David will grieve Jonathan deeply

---
## 📖 The Battle Went Sore Against Saul

"Sore" here does not mean physically sore or achy.

In the King James Bible, sore usually means severely or greatly.

The battle turned harshly against Saul in particular.

The text narrows the focus from the whole army down to one man.

Everything happening now closes in directly on the king himself.

📖 Sore means severely, not achy

🎯 The verse narrows in on Saul himself

⚔️ The battle turns hard against him

➡️ Everything now closes in on the king

---
## 🏹 Sore Wounded Of The Archers

Archers fought from a distance with bows, not hand to hand.

Being wounded by archers means Saul was hit before any soldier got close to him.

Ancient armies used archers to weaken enemy leaders before the real fighting began.

Saul is already badly hurt before the final moment of the chapter arrives.

His death is close, but it has not happened yet.

🏹 Archers fought from a distance

🩸 Saul was hit before close combat

⚔️ Archers often targeted enemy leaders first

➡️ His death is near but not yet here

# FirstSamuel 31:4-6
# 🗡️ Saul Falls On His Sword
---
## 🗡️ Draw Thy Sword, And Thrust Me Through Therewith

Saul is asking his own armor bearer to end his life.

This was not cowardice by the standards of that time.

Kings captured alive could expect public torture and mockery before they died.

Falling by his own choice kept Saul in control of this one last moment.

Soldiers in that era often saw this kind of death as honorable, not weak.

🗡️ Saul asks his armor bearer to end it

🛡️ Capture meant torture and mockery

👑 He keeps control of his last moment

📖 That era saw this as honorable, not weak

---
## 🚫 Lest These Uncircumcised Come And Thrust Me Through, And Abuse Me

"Uncircumcised" was a common insult Israelites used for the Philistines.

Circumcision marked a man as part of God's covenant people, going back to Abraham.

The Philistines did not practice it, so the word marks them as outsiders to that covenant.

Saul is not just afraid of dying here.

He is afraid of exactly how these enemies would treat him first.

📖 Uncircumcised was an insult for Philistines

✡️ Circumcision marked God's covenant people

🚫 Philistines stood outside that covenant

➡️ Saul fears their cruelty, not just death

---
## 🛡️ His Armourbearer Would Not

An armor bearer carried a soldier's extra weapons and protected him in battle.

His whole job was to serve and defend Saul, not to kill him.

Striking down God's anointed king would have felt unthinkable, even as mercy.

He was sore afraid, meaning deeply and genuinely terrified, not just nervous.

He would rather watch his king suffer than be the one to end it.

🛡️ An armor bearer served and defended

😨 Killing the king felt unthinkable

👑 Reverence, not cowardice, holds him back

➡️ He cannot bring himself to strike

---
## 🗡️ Saul Took A Sword, And Fell Upon It

Saul ends his own life rather than be captured.

Back in chapter twenty eight, Samuel's spirit gave Saul a warning.

He said Saul and his sons would join him the very next day.

That warning is now fulfilled exactly as spoken.

Saul's reign began with the people begging for a king like the other nations.

It ends here, alone on a mountainside, by his own hand.

🗡️ Saul takes his own life

📖 Fulfills Samuel's warning from chapter 28

👑 His reign began with the people's request

➡️ It ends alone on a mountainside

---
## 🗡️ He Fell Likewise Upon His Sword, And Died With Him

The armor bearer follows Saul in death by the exact same method.

"Likewise" ties his death directly to Saul's, on purpose.

He had refused to kill his king only moments earlier.

Watching Saul die changes what he is willing to do to himself.

His loyalty carries him all the way to the grave.

🗡️ He dies the same way Saul did

🔗 Likewise ties the two deaths together

🤝 His loyalty never wavers

📖 It carries him to the grave

---
## 💀 So Saul Died, And His Three Sons, And His Armourbearer, And All His Men, That Same Day Together

This one sentence lists an entire household and command wiped out in a single day.

Saul, all three named sons, his armor bearer, and his soldiers all die together.

The line that once held Israel's throne is suddenly almost entirely gone.

One more son, Ishbosheth, is left alive, though he is not even mentioned in this chapter.

Israel's monarchy is left with a vacancy the very next book has to answer.

💀 An entire household dies in one day

👑 Saul's line is nearly wiped out

❓ Ishbosheth survives but goes unmentioned

➡️ Israel's throne is left empty

# FirstSamuel 31:7
# 🏚️ Israel Abandons The Land
---
## 🗺️ That Were On The Other Side Of The Valley, And They That Were On The Other Side Jordan

This describes two different groups of Israelites living away from the battlefield.

The valley likely means the Jezreel Valley, close to Gilboa itself.

The other side of Jordan means territory across the Jordan River, further east.

News of this defeat reached towns far beyond where the fighting happened.

Even people who never saw a single soldier fall began to panic.

🗺️ Two groups lived away from the battle

🏞️ The valley likely means Jezreel

🌊 Jordan marks land further east

📖 Panic spread far beyond the battlefield

---
## 🏚️ They Forsook The Cities, And Fled

"Forsook" means these people abandoned their homes completely, not just retreated.

Whole towns emptied out, not just defeated soldiers.

Losing the king and his sons made people believe the entire nation was finished.

Fear over one battle spread into fear over the whole future of Israel.

🏚️ Forsook means they abandoned everything

🏘️ Entire towns emptied, not just soldiers

😨 Losing the king felt like losing the nation

➡️ Fear outran the actual battle

---
## 🏠 The Philistines Came And Dwelt In Them

The Philistines did not just win a battle, they took real land.

"Dwelt" means they moved in and lived there themselves.

Territory Israel had held is now, for a time, enemy territory.

This is the lowest point for the nation of Israel in the entire book.

David's rise in the next book will have to reverse exactly this kind of loss.

🏠 Dwelt means the Philistines moved in

🗺️ Israelite land becomes enemy territory

📉 This is the book's lowest point

➡️ David's rise must reverse this loss

# FirstSamuel 31:8-10
# 🏛️ The Philistines Display Saul's Body
---
## ⚔️ Came To Strip The Slain

Ancient armies often returned to a battlefield after fighting ended to collect valuables from the dead.

Weapons, armor, and clothing were stripped from fallen soldiers on both sides.

This was standard practice, not something unusual to the original audience.

It sets up exactly how the Philistines end up finding Saul's own body.

⚔️ Armies looted battlefields after fighting

🛡️ Weapons and armor were taken as spoil

📜 This was normal ancient practice

➡️ It leads them straight to Saul

---
## 👑 Found Saul And His Three Sons Fallen In Mount Gilboa

The king the Philistines fought all day is found lying among his own soldiers.

There is no distinction left between Saul and any other body on the field.

The three sons named earlier, Jonathan, Abinadab, and Melchishua, are found beside him.

An entire royal family is discovered together, all dead in the same place.

👑 Saul is found among ordinary soldiers

💀 No distinction remains in death

👥 His three sons lie beside him

📖 A royal family dies together

---
## 🗡️ Cut Off His Head, And Stripped Off His Armour

Cutting off an enemy's head and taking his armor claimed a trophy of victory.

David did this exact same thing to Goliath, back in chapter seventeen.

Here the Philistines do it to Saul, the king Israel once wanted instead of trusting God.

The image that once marked Israel's greatest early victory now marks its lowest defeat.

🗡️ Beheading claimed a trophy of victory

📖 David did this to Goliath in chapter 17

🔄 Now it happens to Saul instead

➡️ Victory's image now marks defeat

---
## 📢 To Publish It In The House Of Their Idols, And Among The People

"Publish" here means to announce or proclaim, not to print a book.

The Philistines sent word of Saul's death to towns throughout their own territory.

Announcing it inside their temples credited the victory to their gods, not to themselves.

A king's death becomes a religious celebration for an entire enemy nation.

📖 Publish means to announce widely

🗺️ News spread through Philistine territory

🛕 The victory was credited to their gods

➡️ A death becomes a national celebration

---
## 🛕 Put His Armour In The House Of Ashtaroth

Ashtaroth was a goddess worshiped across the ancient Near East, tied to fertility and war.

Placing Saul's armor in her temple offered it to her as a trophy of thanks.

This is the same goddess whose worship kept pulling Israel away from God throughout Judges.

Saul's own armor now sits inside the very kind of temple Israel was warned about.

🛕 Ashtaroth was a war and fertility goddess

🎁 The armor was offered as a trophy

📜 Her worship plagued Israel throughout Judges

➡️ Israel was warned about this exact temple

---
## 🏛️ Fastened His Body To The Wall Of Bethshan

Bethshan was a fortified city near the Jordan Valley, close to where Saul died.

Fastening a body to a city wall displayed it publicly for as long as possible.

The goal was to humiliate Saul's memory and warn any Israelites who saw it.

His own people will risk everything in the next few verses to take him down.

🏛️ Bethshan was a fortified city nearby

📌 His body was displayed on the wall

😔 The goal was public humiliation

➡️ His people will risk everything to retrieve him

# FirstSamuel 31:11-13
# 🔥 Jabeshgilead Honors Saul
---
## 📖 The Inhabitants Of Jabeshgilead Heard

Jabeshgilead was the very city Saul rescued at the start of his reign, back in chapter eleven.

Nahash the Ammonite had threatened to gouge out the right eye of every man there.

Saul's rescue mission that day was the moment that first proved he could actually lead.

Decades later, this same city refuses to let his body stay disgraced.

📖 Saul rescued this city in chapter 11

👁️ Nahash had threatened to blind them

👑 That rescue proved Saul as king

➡️ Now the city returns the favor

---
## 💪 All The Valiant Men Arose, And Went All Night

"Valiant" means brave, willing to face real danger for the sake of something right.

Traveling all night let them reach Bethshan before Philistine patrols could stop them.

This was a rescue mission deep inside territory the enemy now controlled.

Every man who went was risking his own life for a king who could no longer reward him.

💪 Valiant means willing to face danger

🌙 Night travel avoided Philistine patrols

🚶 The mission went deep into enemy land

➡️ They risked everything for no reward

---
## ⬇️ Took The Body Of Saul And The Bodies Of His Sons From The Wall Of Bethshan

This is the act of taking the bodies down from public display.

It reverses the humiliation the Philistines had set up in the verses just before this.

Saul is treated with honor by his own people even after such a public disgrace.

Loyalty here reaches past his death and past his failures as king.

⬇️ The bodies are taken down

🔄 It reverses the Philistines' humiliation

🙇 Saul is honored despite his failures

📖 Loyalty outlasts his death

---
## 🔥 Burnt Them There

Burning a body was not the normal Israelite burial practice.

Most burials in this culture involved a tomb or a simple grave, not fire.

The bodies had likely been damaged after days hanging exposed on the wall.

Burning here is a practical response to that condition, not a religious ritual.

🔥 Cremation was not the normal practice

⚰️ Israel usually buried in tombs or graves

😔 The bodies were likely badly damaged

➡️ This was practical, not religious

---
## 🌳 Buried Them Under A Tree At Jabesh

After the burning, the remaining bones still receive a proper burial.

A tree at Jabesh becomes a simple, marked resting place.

This detail shows the men were not being careless with Saul's remains.

Even in a difficult situation, they still gave him a real burial.

🌳 A tree marked the burial site

⚰️ Bones still received a proper burial

🙏 The men were not careless

📖 Saul was given a real resting place

---
## 🍽️ Fasted Seven Days

Fasting means going without food, usually as an act of mourning or prayer.

Seven days was a full, complete period of mourning in this culture.

This same length of time marks serious grief elsewhere in scripture too.

First Samuel opened with a prayer asking God for a king.

It closes here with a nation grieving the king that prayer eventually brought.

🍽️ Fasting means going without food

📅 Seven days marked complete mourning

📖 The same span appears elsewhere in scripture

➡️ The book ends grieving that same king
`.trim();

export const FIRST_SAMUEL_THIRTY_ONE_PERSONAL_SECTIONS = parseFirstSamuelThirtyOneRawNotes(
  FIRST_SAMUEL_THIRTY_ONE_RAW_NOTES,
);
