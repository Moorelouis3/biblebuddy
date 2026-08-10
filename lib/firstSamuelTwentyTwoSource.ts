export type FirstSamuelTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelTwentyTwoRawNotes(rawText: string): FirstSamuelTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 22:${startVerse}` : `1 Samuel 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Samuel 22 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_TWENTY_TWO_RAW_NOTES = `# FirstSamuel 22:1-2
# 🕳️ Fleeing To The Cave Adullam
---
## 🕳️ Escaped To The Cave Adullam

Adullam was a network of caves cut into limestone hills.

It sat on the border between Judah and Philistine territory.

A cave gave David shelter, but it also gave him control of the terrain.

He knew this region from growing up nearby in Bethlehem.

This is not a helpless hiding spot.

It is the first base of an army that has not gathered yet.

🕳️ Adullam means a hillside cave network

🗺️ It sat near Judah and Philistine land

🏠 David knew this region from home

➡️ His first base before his first army

---

## 👪 His Brethren And All His Father's House

This means David's whole extended family, not just his brothers.

Saul had just tried to kill David at his own table.

That danger now reached anyone connected to him by blood.

Coming to Adullam was not a visit.

It was every relative choosing exile over staying exposed to Saul.

👪 His father's house means the whole family

⚔️ Saul's threat now reached David's relatives too

🏃 Coming here meant leaving safety behind

📖 The family chooses exile together

---

## 😩 Every One That Was In Distress

These three words describe men with nothing left to lose.

Distress meant physical danger or hardship of some kind.

Debt meant they owed more than they could ever repay.

Discontented meant deep bitterness toward how life had treated them.

None of these men came to David because they admired him yet.

They came because every other door had already closed.

😩 Distress means real hardship or danger

💰 Debt means owing more than they could repay

😠 Discontented means deep bitterness

➡️ They came because no other door was open

---

## 🎖️ He Became A Captain Over Them

David is not just hiding anymore.

He is now leading people who depend on him.

Four hundred broken, desperate men needed real structure to survive.

This ragtag group becomes the core of David's future army.

The king who has not been crowned yet is already learning to lead.

🎖️ David moves from fugitive to leader

👥 Four hundred men now depend on him

🌱 This group becomes his future army

📖 Leadership starts before the crown does

---

## 🔢 About Four Hundred Men

Four hundred is a large number for a group with no formal training.

This band grows to six hundred men later in the story.

Feeding, organizing, and protecting that many people was a real burden.

David is suddenly responsible for far more than his own survival.

🔢 Four hundred men join David here

📈 The group later grows to six hundred

🍞 Feeding and organizing them was a real task

➡️ Survival now means leading, not just running

# FirstSamuel 22:3-5
# 🧭 Parents To Moab, The Prophet Sends Him Home
---
## 🗺️ Mizpeh Of Moab

Moab sat east of the Dead Sea, outside Saul's reach.

David's own great grandmother Ruth had come from Moab generations earlier.

That family history may explain why David trusted this king.

Choosing Moab was not random.

It was the safest realistic option nearby.

🗺️ Moab sat safely outside Saul's reach

👵 Ruth, David's ancestor, was from Moab

🤝 Family history likely built this trust

➡️ A safe choice, not a random one

---

## 👴 Let My Father And My Mother, I Pray Thee, Come Forth

David is thinking about his parents before he thinks about himself.

Jesse and his wife were likely elderly by this point.

They could not survive life on the run the way David could.

Moving them to safety came before anything else on David's mind.

👴 Jesse and his wife were likely elderly

🏃 They could not survive life as fugitives

❤️ David protects them before protecting himself

📖 Family duty guides his very first move

---

## ⏳ Till I Know What God Will Do For Me

David does not claim to know his own future here.

He admits he is waiting on God, not planning every step himself.

This is not despair.

It is honest trust in the middle of real uncertainty.

⏳ David admits he does not know

🙏 He waits on God instead of planning

😌 This is trust, not despair

➡️ Uncertainty does not stop him from trusting

---

## 🏰 All The While That David Was In The Hold

"The hold" means a natural stronghold, likely the caves near Adullam.

David's parents stay safely in Moab during this whole stretch of time.

At the same time, David keeps building his camp in hiding.

Two separate safe places protect two separate parts of his family.

🏰 The hold means a natural stronghold

👴 His parents stay safely in Moab

🕳️ David remains hidden at his own camp

📖 Two places protect two parts of one family

---

## 📜 The Prophet Gad

Gad appears here for the very first time in the Bible.

He becomes David's court prophet for the rest of his life.

Later scripture even credits Gad with recording parts of David's history.

This quiet introduction marks the start of a lifelong partnership.

📜 Gad is introduced here for the first time

👑 He becomes David's prophet for life

✍️ He later helps record David's history

📖 A lifelong partnership starts quietly here

---

## 🚶 Depart, And Get Thee Into The Land Of Judah

God does not tell David to keep hiding in Moab.

He tells him to go back toward danger instead, into his own territory.

Judah was Saul's kingdom, not a safe foreign country.

Real faith here means obeying even when the safer option looks obvious.

🚶 God sends David back toward Judah

⚠️ Judah was still Saul's own territory

🙏 Obedience mattered more than staying safe

➡️ Faith means trusting the harder instruction

---

## 🌲 The Forest Of Hareth

Hareth was a wooded area inside Judah's own hill country.

Trees gave David's growing camp cover that open ground never could.

This was a real, specific place, not a vague retreat.

David is now operating inside his homeland again, just carefully.

🌲 Hareth was a wooded area in Judah

🌳 Trees gave David's camp real cover

📍 A specific place, not a vague hideout

➡️ David returns home, but very carefully

# FirstSamuel 22:6-10
# 😠 Saul's Paranoia And Doeg's Report
---
## 🌳 Abode In Gibeah Under A Tree In Ramah

Saul is holding court outdoors, under a tree, instead of in a palace hall.

This detail paints a king who feels unsettled and exposed.

Ramah sat close to Gibeah, Saul's own hometown.

Even surrounded by his own people, Saul does not feel secure.

🌳 Saul holds court under a tree

🏠 Ramah sat near his hometown Gibeah

😰 The setting shows a king who feels unsettled

➡️ Comfort at home does not calm his fear

---

## 🗡️ Having His Spear In His Hand

This same spear had already been thrown at David and at Jonathan.

Saul keeps it close even during a quiet meeting with his own servants.

A weapon in hand during a quiet meeting reveals real fear.

Saul is not just angry.

He is afraid, and it shows in something as small as his grip.

🗡️ This spear was already thrown twice before

😨 Carrying it here shows constant fear

👥 Even his own servants do not calm him

📖 Small details reveal Saul's real state of mind

---

## 👂 Hear Now, Ye Benjamites

Saul appeals to his servants by their shared tribe, not by their names.

Saul and most of his officials came from the tribe of Benjamin.

David came from Judah, a different tribe entirely.

Saul is trying to turn a personal fear into a tribal loyalty test.

👂 Saul appeals to shared tribal identity

🏛️ Saul and his officials were Benjamites

⚖️ David belonged to the tribe of Judah

📖 Fear gets dressed up as loyalty

---

## 🍇 Will The Son Of Jesse Give Every One Of You Fields And Vineyards

Saul refuses to say David's name here.

"The son of Jesse" is a way of stripping David of his identity.

Saul asks whether David would ever reward his men the way a king can.

The real question hiding underneath is simpler.

Saul is asking who these men are truly loyal to.

🍇 Fields and vineyards were a king's rewards

🚫 Saul avoids saying David's name on purpose

❓ The real question is about loyalty

📖 Fear tests everyone's true allegiance

---

## 🤝 My Son Hath Made A League With The Son Of Jesse

This league refers to the covenant Jonathan and David made back in chapter eighteen.

Saul frames his own son's loyalty to David as a betrayal of him.

Jonathan's love for David gets twisted into a conspiracy in Saul's mind.

Fear can turn even family loyalty into evidence of treason.

🤝 The league recalls Jonathan and David's covenant

😠 Saul reads loyalty to David as betrayal

👨‍👦 Even his own son becomes a suspect

📖 Fear rewrites loyalty as treachery

---

## 🕵️ Stirred Up My Servant Against Me, To Lie In Wait

Saul calls David his servant, refusing to admit how far David has risen.

He accuses David of lying in wait for him.

In truth, Saul is the one who has been hunting David for chapters.

Saul accuses others of exactly what he himself is doing.

🕵️ Saul still calls David his servant

🔁 He accuses David of what he does himself

🏃 Saul has been the one hunting David

📖 Fear projects guilt onto the innocent

---

## 👤 Doeg The Edomite, Which Was Set Over The Servants Of Saul

Doeg is an Edomite, meaning he is not an Israelite at all.

Edom had a long, bitter history of conflict with Israel.

His job was overseeing Saul's herdsmen, a position of real trust.

An outsider is about to prove more loyal to Saul than any Israelite here.

👤 Doeg was an Edomite, not an Israelite

⚔️ Edom and Israel shared old tensions

🐑 He oversaw Saul's own herdsmen

➡️ An outsider proves the most willing informant

---

## 🙏 He Enquired Of The LORD For Him

Chapter twenty one never actually records Ahimelech inquiring of the LORD for David.

Doeg adds this detail on his own, whether from assumption or exaggeration.

A small added detail like this can turn a kindness into a capital crime.

Words carry real weight once they reach an already frightened king.

🙏 This detail was not in chapter twenty one

➕ Doeg adds it, true or not

⚠️ A small addition raises the stakes greatly

📖 Words become dangerous in a fearful king's ears

# FirstSamuel 22:11-16
# ⚖️ Saul Condemns The Priests Of Nob
---
## 👪 Ahimelech The Priest, The Son Of Ahitub

Ahitub was the grandson of Eli, the priest from the start of this book.

Years earlier, God had promised judgment on Eli's entire priestly line.

That promise is quietly about to be fulfilled through this very family.

Saul does not know he is becoming the instrument of an old prophecy.

👪 Ahitub descended from Eli the priest

📜 God once promised judgment on Eli's line

⚠️ That old promise is about to land

📖 Saul unknowingly fulfills an ancient word

---

## 🏘️ All His Father's House, The Priests That Were In Nob

Saul does not summon Ahimelech alone.

He calls the entire priestly family that served at Nob.

Bringing everyone together in one place makes them all one easy target.

This detail sets up the scale of what is about to happen.

🏘️ Saul summons the whole priestly family

👥 Everyone from Nob arrives together

🎯 Gathering them together makes them one target

➡️ The scale of what follows is set here

---

## 🙋 Here I Am, My Lord

Ahimelech answers Saul with total respect and readiness.

This same phrase appears elsewhere in scripture when someone answers God's own call.

Ahimelech has no idea he is walking into a death sentence.

His honesty here will not save him.

🙋 Ahimelech answers with full respect

😳 He has no idea what is coming

⚠️ Honesty will not be enough to save him

📖 The same phrase often answers God's own call

---

## 🍞 Given Him Bread, And A Sword, And Hast Enquired Of God For Him

Saul lists three separate acts as though they were all one obvious crime.

Chapter twenty one already showed Ahimelech giving David bread and Goliath's sword.

Ahimelech did those things believing David was still on the king's own business.

Saul treats an honest mistake as an act of open rebellion.

🍞 Saul lists three supposed offenses at once

📜 Chapter twenty one already showed the real events

🤥 Ahimelech acted on David's own lie

➡️ An honest mistake gets treated as rebellion

---

## 👑 Which Is The King's Son In Law

Ahimelech reminds Saul that David is not some random stranger.

David married Saul's own daughter Michal back in chapter eighteen.

Helping the king's own son in law should never have looked suspicious.

Ahimelech's defense is calm, specific, and completely reasonable.

👑 David married Michal, Saul's daughter

🤝 Helping family should not look suspicious

🗣️ Ahimelech's defense stays calm and specific

📖 Reason cannot reach a king ruled by fear

---

## 🏆 Who Is So Faithful Among All Thy Servants As David

Ahimelech praises David openly, with no hesitation, right to Saul's face.

He has no reason yet to think David has done anything wrong.

This is not flattery.

It is simply what everyone in the kingdom already believed about David.

🏆 Ahimelech praises David without hesitation

😌 He has no idea David is a fugitive

🗣️ This reflects the kingdom's honest opinion

📖 Truth spoken plainly still cannot save him

---

## 🙅 Be It Far From Me

This phrase is an old way of saying absolutely not.

Ahimelech is denying any thought of conspiring against Saul.

He is not just defending his actions.

He is defending his own loyalty as a person.

🙅 Be it far from me means absolutely not

🛡️ Ahimelech denies any real conspiracy

❤️ He defends his loyalty, not just his choice

➡️ A clear conscience still meets a closed mind

---

## ⚖️ Knew Nothing Of All This, Less Or More

"Less or more" is an old way of saying not even a little, not even a lot.

Ahimelech insists he had no knowledge of any plot, large or small.

This matches exactly what actually happened back in chapter twenty one.

He is telling the complete truth, and it still will not matter.

⚖️ Less or more means not at all

✅ This matches chapter twenty one exactly

🗣️ Ahimelech tells the complete truth

➡️ Truth alone cannot stop Saul's fear

---

## ☠️ Thou Shalt Surely Die, Ahimelech

Saul answers a reasonable, honest defense with an immediate death sentence.

He condemns not just Ahimelech, but his entire family too.

Evidence was never really what decided this outcome.

Fear decided it before the conversation even began.

☠️ Saul sentences Ahimelech to death

👪 The sentence covers his whole family too

🙈 Evidence was never really what decided this

📖 Fear decided it before the conversation even began

# FirstSamuel 22:17-19
# 🩸 The Massacre At Nob
---
## 🚫 Turn, And Slay The Priests Of The LORD

Saul commands his own soldiers to kill Israel's priests.

These are not enemy soldiers or foreign criminals.

They are men who serve at God's own sanctuary.

Saul is ordering an attack on the very center of Israel's worship.

🚫 Saul orders his soldiers to kill priests

🛐 These men served at God's own sanctuary

⚔️ This targets Israel's own worship, not an enemy

📖 A king turns against his people's faith

---

## 🙅 The Servants Of The King Would Not Put Forth Their Hand

Saul's own soldiers refuse a direct order from their king.

They recognize the priests of the LORD as untouchable, even under royal command.

This refusal takes real courage in front of an already furious king.

Not everyone in Saul's court has lost their conscience.

🙅 Saul's soldiers refuse this direct order

🛐 They see the priests as untouchable

💪 Refusing took real courage here

➡️ Conscience still lives in some of Saul's men

---

## 👤 Doeg The Edomite Turned, And He Fell Upon The Priests

Where Israelite soldiers refused, an outsider steps forward instead.

Doeg carries out the massacre the king's own men would not touch.

His earlier report in verse nine now leads directly to this moment.

One informant's words become eighty five deaths.

👤 Doeg does what Israelite soldiers refused

🗣️ His earlier report set this in motion

⚔️ He alone carries out the massacre

📖 Words spoken earlier become deaths now

---

## 🔢 Fourscore And Five Persons

"Fourscore and five" is an old way of counting, meaning eighty five.

That many priests died in a single act of royal rage.

This is not a symbolic number picked for effect.

It is the real, staggering size of the loss.

🔢 Fourscore and five means eighty five

☠️ That many priests died that day

📊 This is a real count, not a symbol

➡️ The scale of this loss is staggering

---

## 👗 That Did Wear A Linen Ephod

A linen ephod marked these men clearly as priests in active service.

This detail removes any doubt about who Saul ordered killed.

These were not soldiers or bystanders caught in a conflict.

They were consecrated men, killed specifically because of their calling.

👗 The linen ephod marked active priests

✅ There is no doubt who was targeted

🛐 These were consecrated men, not soldiers

📖 They died for their calling alone

---

## 🏘️ Nob, The City Of The Priests

Saul does not stop with the men who came to answer his summons.

He sends soldiers to destroy the entire town of Nob itself.

This was a whole community built around serving at God's sanctuary.

One king's fear erases an entire town in a single day.

🏘️ Nob was a whole town of priests

🔥 Saul destroys the town, not just individuals

🛐 A community built around worship is erased

➡️ Fear grows from one man to a massacre

---

## 👶 Children And Sucklings

"Sucklings" is an old word for infants still nursing.

Saul's order reaches even the youngest, most defenseless people in Nob.

This goes far beyond punishing anyone who actually helped David.

It is complete, indiscriminate destruction.

👶 Sucklings means nursing infants

😢 Even the youngest were not spared

🚫 This was no longer really about justice

📖 Fear stopped drawing any lines at all

---

## 🐑 Oxen, And Asses, And Sheep

Saul destroys the town's animals along with its people.

This matches the total destruction God once commanded against Amalek in chapter fifteen.

Saul disobeyed that command when it targeted Israel's actual enemy.

Now he carries out the same total destruction against his own people instead.

🐑 Even the livestock is destroyed

🔁 This mirrors the command against Amalek

🙈 Saul disobeyed that command against a real enemy

📖 He obeys it fully against his own people

# FirstSamuel 22:20-23
# 🏃 Abiathar Finds Refuge With David
---
## 🏃 Named Abiathar, Escaped, And Fled After David

Abiathar is the one son of Ahimelech who survives the massacre.

His name means something like father of abundance, a hopeful name after a tragic day.

He immediately runs to the one place that made sense, David's camp.

Out of an entire slaughtered town, one survivor reaches exactly the right person.

🏃 Abiathar is the sole survivor named here

📛 His name carries a hopeful meaning

🎯 He runs straight to David's camp

📖 One survivor reaches the right place

---

## 📢 Shewed David That Saul Had Slain The LORD's Priests

Abiathar is the one who has to deliver this devastating news.

David learns that his own actions in chapter twenty one led directly to this.

The bread and the sword he asked for cost eighty five lives.

This news changes David far more than any battle has so far.

📢 Abiathar delivers the terrible news himself

💔 David learns the true cost of his lie

🍞 A simple request led to eighty five deaths

➡️ This loss weighs heavier than any battle

---

## 💭 I Knew It That Day, When Doeg The Edomite Was There

David remembers seeing Doeg that day at Nob.

He noticed the threat back in chapter twenty one but said nothing about it.

Silence in that moment now feels like a costly mistake.

David is being honest about a warning he did not act on.

💭 David remembers seeing Doeg that day

🤐 He stayed silent about the danger then

😔 That silence now feels like a real mistake

📖 David admits the warning he missed

---

## ⚖️ I Have Occasioned The Death Of All The Persons Of Thy Father's House

"Occasioned" means caused, even without directly intending the outcome.

Saul gave the actual order, but David still takes real responsibility here.

He does not try to shift the blame entirely onto Saul or Doeg.

This kind of honest ownership is rare, even from someone this powerful.

⚖️ Occasioned means caused, even indirectly

🙋 David takes real responsibility for this outcome

🚫 He does not fully blame Saul or Doeg

📖 Honest ownership is rare and costly

---

## 🛡️ Abide Thou With Me, Fear Not

David makes Abiathar a direct, personal promise of protection.

This is the beginning of a partnership that lasts for the rest of David's life.

Abiathar goes on to serve as high priest throughout David's entire reign.

Out of tragedy, David gains a lifelong ally and friend.

🛡️ David promises Abiathar real protection

🤝 This begins a lifelong partnership

👑 Abiathar becomes high priest under David

📖 A tragedy leads to a lasting friendship

---

## ⚔️ He That Seeketh My Life Seeketh Thy Life

David tells Abiathar plainly that they now share the same enemy.

Saul's hatred for David has already spilled onto everyone connected to him.

Abiathar is safer standing with David than hiding anywhere alone.

Two men who lost everything to Saul now protect each other instead.

⚔️ David and Abiathar now share one enemy

💔 Saul's hatred already spilled onto Abiathar

🤝 Standing together is safer than hiding alone

📖 Shared loss becomes shared protection
`.trim();

export const FIRST_SAMUEL_TWENTY_TWO_PERSONAL_SECTIONS = parseFirstSamuelTwentyTwoRawNotes(FIRST_SAMUEL_TWENTY_TWO_RAW_NOTES);
