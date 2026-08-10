export type FirstSamuelTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelTwentyOneRawNotes(rawText: string): FirstSamuelTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 21:${startVerse}` : `1 Samuel 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 1 Samuel 21 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_TWENTY_ONE_RAW_NOTES = `# FirstSamuel 21:1-3
# 😨 David's Desperate Arrival At Nob
---
## 🗺️ Then Came David To Nob

Nob was a small town of priests, located close to Jerusalem and Saul's own city of Gibeah.

It served as a gathering place for priests after Israel's tabernacle had moved on from Shiloh.

David comes here first because it was the nearest safe stop once he fled the royal court.

He arrives alone, with no soldiers, no supplies, and no plan beyond staying alive.

🗺️ Nob was a town of priests

🏠 It sat close to Saul's own city

🏃 David fled here with almost nothing

📖 This chapter opens already in flight

---

## 😨 Ahimelech Was Afraid At The Meeting Of David

A priest greeting the man who killed Goliath should feel honored, not afraid.

David had grown famous through chapter seventeen and had served for years at Saul's own court.

Something about this visit looks wrong to Ahimelech the moment he sees David coming.

A great warrior traveling completely alone, with no guard and no announcement, was not normal.

😨 Ahimelech reacts with real alarm

🏆 David was already Israel's famous hero

🚶 Traveling alone broke every normal pattern

📖 Ahimelech senses something is wrong immediately

---

## ❓ Why Art Thou Alone, And No Man With Thee

This question is not simple curiosity about David's travel plans.

A captain of Saul's army moving without an escort was almost unheard of.

Ahimelech is really asking whether David is in some kind of trouble.

His instincts about David are correct.

David is about to lie to him anyway.

❓ The question hides real suspicion

🪖 Captains normally traveled with an escort

🤔 Ahimelech senses David may be in danger

➡️ David is about to lie to him

---

## 🤥 The King Hath Commanded Me A Business

David is not on any real mission from Saul.

He is fleeing for his life after Saul tried to kill him in the previous chapter.

Telling the truth here would put Ahimelech in an impossible position.

So David invents a cover story instead, the first of several lies in this chapter.

🤥 This is David's first lie here

🏃 He is really fleeing, not working

🛡️ The lie protects Ahimelech from a hard choice

📖 More lies will follow this one

---

## 🤫 Let No Man Know Any Thing Of The Business

David adds urgency to the story by insisting on total secrecy.

A secret mission is much harder for anyone to question or verify.

He also claims to have servants already stationed at a certain place.

There are no such servants.

David is completely alone.

🤫 Secrecy makes the story harder to check

🕵️ David invents fake urgency and importance

👥 He even invents servants who do not exist

📖 The lie grows more detailed to sound real

---

## 🍞 What Is Under Thine Hand

This phrase is an old way of asking what someone currently has available.

David is asking Ahimelech for whatever food happens to be on hand.

Five loaves would be a normal, everyday request, nothing suspicious on its own.

Yet this same man just claimed to have servants waiting somewhere else with supplies.

A fugitive begging for his own next meal does not match that story.

🍞 The phrase means whatever is available

🥖 David asks for ordinary bread

🤨 His hunger does not match his story

📖 The lie is already cracking

# FirstSamuel 21:4-6
# 🍞 Holy Bread For A Hungry Fugitive
---
## 🍞 There Is No Common Bread Under Mine Hand

Common bread simply means ordinary, everyday bread with no special status.

Ahimelech has none of that kind on hand at the moment.

The only bread in the sanctuary right now is bread set apart for God.

That creates a real problem for what David is asking.

🍞 Common bread means ordinary bread

🚫 None of that kind is available

✨ Only holy bread remains right now

📖 A simple request becomes complicated

---

## 🙏 If The Young Men Have Kept Themselves At Least From Women

Hallowed bread was reserved for priests and required ceremonial purity to eat.

Sexual activity was one of several things that made a person ritually unclean under the law.

Ahimelech is checking whether David and his men meet that standard.

This was not about morality in the modern sense.

It was about ritual readiness before God.

🙏 Hallowed bread required ritual purity

⚖️ The law linked purity to certain activities

❓ Ahimelech checks before allowing the bread

📖 Purity guarded what belonged to God

---

## 🗓️ Women Have Been Kept From Us About These Three Days

David answers with a specific number to sound convincing.

Three days lines up neatly with the secret mission he invented earlier.

A vague answer would have raised more questions than it settled.

Precise details make a false story sound far more believable.

🗓️ Three days sounds specific and true

🤥 It matches the earlier invented mission

🎯 Precise details make lies convincing

📖 David keeps building the same false story

---

## 📜 The Bread Is In A Manner Common

David makes a clever argument about the bread itself.

He claims that holy bread becomes usable once it sits among ordinary people.

This is a real theological point, not just a convenient excuse.

Centuries later, Jesus points back to this exact moment.

He uses it to teach that mercy outweighs strict rule keeping.

📜 David argues the bread can be used

⚖️ His reasoning has real theological weight

🕊️ Jesus later points back to this event

📖 Human need can outweigh strict ritual rules

---

## 🍞 Shewbread, That Was Taken From Before The LORD

Shewbread means the bread of the presence, kept always before the LORD in the sanctuary.

Twelve loaves sat on a special table, one for each tribe of Israel.

Priests replaced them with fresh loaves every single week.

The bread David receives had just been removed during that weekly exchange.

🍞 Shewbread means bread of the presence

🔢 Twelve loaves represented Israel's twelve tribes

🔄 Priests replaced the loaves every week

📖 David arrives at exactly the right moment

---

## 🤝 So The Priest Gave Him Hallowed Bread

Ahimelech chooses to help David despite the ritual complication.

Real hunger outweighs the letter of the rule in this moment.

He is not breaking the law carelessly.

He is showing mercy under real pressure.

This same choice will later cost Ahimelech his life at the hands of Saul.

🤝 Ahimelech chooses mercy over rigid rule

🍞 He gives David the only bread available

⚠️ This choice carries a real future cost

📖 Kindness here will not go unpunished by Saul

# FirstSamuel 21:7-9
# ⚔️ Doeg And The Sword Of Goliath
---
## 👁️ His Name Was Doeg, An Edomite

This is the first appearance of a man who will matter greatly very soon.

Doeg comes from Edom, a nation with a long history of conflict with Israel.

He works for Saul as the chief of his herdsmen.

Everything David says and does here, Doeg is watching.

👁️ Doeg witnesses this entire scene

🌍 Edom had old tensions with Israel

🐑 Doeg served Saul over his herds

📖 This quiet detail sets up real danger

---

## 🛐 Detained Before The LORD

Detained here suggests Doeg was kept at the sanctuary for some kind of vow or ritual duty.

The text does not explain exactly why he was there that day.

His presence puts him in the wrong place at the wrong time.

A private, dangerous secret is about to have an unwanted witness.

🛐 Detained suggests a vow or duty

❓ The exact reason is not given

👀 Doeg happens to be there that day

📖 A secret is about to be seen

---

## ⚔️ I Have Neither Brought My Sword Nor My Weapons With Me

The man who once killed a giant is now completely unarmed.

He fled Saul's court so suddenly that he grabbed nothing on his way out.

His excuse about haste is technically true.

The real reason behind it is still a lie.

A hero reduced to begging for a weapon shows how desperate this moment really is.

⚔️ David has no weapon at all

🏃 He fled too fast to prepare

🤥 His excuse is true, his reason is not

📖 Israel's hero is now completely vulnerable

---

## 🗡️ The Sword Of Goliath The Philistine, Whom Thou Slewest In The Valley Of Elah

This is the exact sword David used to finish off Goliath back in chapter seventeen.

After that battle, the sword had been brought to the sanctuary as an offering.

Keeping a weapon like this at the sanctuary honored God as the true source of the victory.

David is about to hold the very proof of his most famous moment again.

🗡️ This is Goliath's actual sword

🏛️ It was kept as an offering to God

🙌 God got credit for that victory

📖 A trophy is about to return home

---

## 👗 Wrapped In A Cloth Behind The Ephod

An ephod was a special garment worn by the high priest during sacred duties.

Something extremely important, like this sword, would be stored near it for safekeeping.

The location shows how much honor this particular weapon carried.

It had not been used or moved in years, until today.

👗 An ephod was the priest's sacred garment

🗺️ The sword was stored near it

🏆 Its placement showed real honor

📖 Today it finally leaves storage

---

## 🗡️ There Is None Like That

David does not want just any weapon.

He wants this one specifically.

The sword that killed a Philistine giant will now defend a fugitive fleeing his own king.

This weapon once proved God's power over Israel's enemies.

Now it protects God's future king from his own people.

David's greatest victory becomes his last resort in his lowest moment.

🗡️ David asks for this sword by name

🔁 The same weapon returns for a new purpose

🛡️ A weapon of war becomes a lifeline

📖 Yesterday's triumph becomes today's survival

# FirstSamuel 21:10-12
# 🏃 Fleeing To Enemy Territory
---
## 🏛️ Went To Achish The King Of Gath

Gath was one of the five major Philistine cities.

It was also Goliath's own hometown, the very giant David had killed.

David is fleeing straight into the territory of his people's greatest enemies.

He is still carrying Goliath's own sword when he arrives there.

🏛️ Gath was a major Philistine city

👹 It was Goliath's own hometown

🏃 David flees into enemy territory

📖 He arrives carrying his enemy's own sword

---

## 👑 Is Not This David The King Of The Land

Achish's servants do not actually think David is Israel's official king.

Saul still holds that title at this point in the story.

They mean that David is already viewed as Israel's greatest warrior and rising leader.

To Philistine ears, that reputation alone makes him dangerous.

👑 King here means a rising leader

⚔️ Saul is still the official king

🏆 David's reputation already outshines his title

📖 Fame made him a threat before power did

---

## 🎶 Saul Hath Slain His Thousands, And David His Ten Thousands

This is the exact song Israel's women sang about David back in chapter eighteen.

At the time, that song made Saul jealous and afraid of David.

Now the same words follow David into Philistine territory and put him in danger there too.

His own fame has become impossible to escape, wherever he goes.

🎶 This recalls the song from chapter eighteen

😠 That song once made Saul jealous

🌍 The same fame now follows David abroad

📖 Fame can travel faster than safety

---

## 💭 David Laid Up These Words In His Heart

This phrase means David took the servants' words seriously and thought hard about them.

He realizes his own fame has just put him in real danger.

The very reputation that made him a hero back home now threatens his life here.

Recognition is not always safe, especially in the wrong company.

💭 The phrase means serious reflection

⚠️ David realizes he is in danger

🔁 His own fame turns against him

📖 Recognition is not always safe

---

## 😱 Sore Afraid Of Achish The King Of Gath

Sore here does not mean physically hurt or painful.

It is an old way of saying very much or deeply.

David is not just nervous here.

He is genuinely terrified in this moment.

The hero who once faced Goliath without fear now feels real terror in enemy hands.

😱 Sore means very or deeply

💔 David feels genuine terror here

⚔️ This contrasts his fearless fight with Goliath

📖 Even great heroes feel real fear

# FirstSamuel 21:13-15
# 🎭 David Feigns Madness
---
## 🎭 He Changed His Behaviour Before Them, And Feigned Himself Mad

Feigned means faked or pretended, not a real change of mind.

David decides that acting insane is his only remaining way out.

In this culture, people usually treated mad men as harmless and left them alone.

Pretending to lose his mind might be the one thing that saves his life.

🎭 Feigned means faked, not real

🧠 Madness becomes David's last option

🙅 Mad men were usually left alone

📖 A desperate plan built on pretending

---

## ✍️ Scrabbled On The Doors Of The Gate

Scrabbled means scratched or clawed at something in a wild, uncontrolled way.

David claws at the gate like someone with no control over his own body.

This was not subtle acting.

It was a full physical performance.

✍️ Scrabbled means clawed or scratched wildly

🚪 David claws at the city gate

🎬 This was full, physical acting

📖 Every detail aimed to convince the guards

---

## 🧔 Let His Spittle Fall Down Upon His Beard

A man's beard was treated with real respect and dignity in this culture.

Letting spit run freely down it was a shocking, degrading sight to witnesses.

No sane man would allow himself to look that way in public.

The disgust this caused helped sell the act completely.

🧔 A beard carried real cultural dignity

🤢 Spit on it looked shocking and degrading

🙅 No sane man would allow that

📖 Disgust made the act believable

---

## 😤 Lo, Ye See The Man Is Mad: Wherefore Then Have Ye Brought Him To Me

Achish is not fooled into thinking David is dangerous.

He is simply annoyed that his servants brought a supposed madman before him at all.

The plan is already working exactly the way David hoped.

Being seen as harmless is exactly what keeps David alive right now.

😤 Achish is annoyed, not suspicious

🙄 He questions why David was even brought in

✅ The disguise is already working

📖 Looking harmless keeps David alive

---

## 🚪 Shall This Fellow Come Into My House

Achish erupts, asking if he needs more mad men around him already.

He orders David out of his house immediately after that.

Being thrown out in disgust is actually the safest possible outcome here.

David walked into Gath carrying Goliath's sword and walks out only with his life.

Years later, David writes Psalm thirty four about this exact escape.

In it, he praises God for hearing him in that fear.

🚪 Achish sends David away in disgust

🕊️ Rejection here means safety

🗡️ He escapes with only his life

📖 Psalm thirty four remembers this exact moment
`.trim();

export const FIRST_SAMUEL_TWENTY_ONE_PERSONAL_SECTIONS = parseFirstSamuelTwentyOneRawNotes(FIRST_SAMUEL_TWENTY_ONE_RAW_NOTES);
