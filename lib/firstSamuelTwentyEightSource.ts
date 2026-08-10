export type FirstSamuelTwentyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelTwentyEightRawNotes(rawText: string): FirstSamuelTwentyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelTwentyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+28:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 28 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+28:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+28:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 28 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 28,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 28:${startVerse}` : `1 Samuel 28:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Samuel 28 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_TWENTY_EIGHT_RAW_NOTES = `# FirstSamuel 28:1-3
# ⚔️ Achish Demands David's Loyalty For Battle
---
## ⚔️ Gathered Their Armies Together For Warfare

This is a new war between the Philistines and Israel.

Chapter twenty seven already showed David hiding among the Philistines for safety.

Now that same alliance is about to be tested in battle.

David's own people are on one side of this war.

His host Achish is on the other side.

The timing puts David in an impossible position.

⚔️ A new war begins here

🏕️ David has been living with the Philistines

🇮🇱 Israel is on the other side

➡️ David is trapped between both armies

---
## 👑 Know Thou Assuredly That Thou Shalt Go Out With Me To Battle

Achish is not asking David a question here.

He is giving David a direct order.

David is a vassal living in Philistine land now.

He is expected to fight for his king when called.

This request is the price of the safety David has enjoyed since fleeing to Gath.

👑 Achish gives an order, not a request

🤝 David is Achish's vassal now

💰 Safety in Gath has a price

📖 David cannot easily refuse this

---
## 🎭 Surely Thou Shalt Know What Thy Servant Can Do

David's answer sounds like a yes, but it is not a real commitment.

He never says whose side he will fight for.

"Thy servant" is polite language expected when speaking to a king.

The vague answer buys David time without forcing a decision yet.

This kind of careful wording will matter later in the story.

🎭 David's answer sounds like a yes

🤐 He never actually commits to a side

🙇 Servant language was expected courtesy

📖 The vague wording buys David time

---
## 🛡️ Keeper Of Mine Head For Ever

"Keeper of mine head" means Achish is naming David his permanent bodyguard.

The phrase pictures a trusted guard standing close enough to protect the king's own life.

This was one of the highest positions of trust a king could give.

Achish believes he has fully won David's loyalty.

That belief will not survive the rest of this story.

🛡️ Keeper of mine head means bodyguard

👑 It was a position of high trust

🤝 Achish believes David is now loyal

📖 That trust will not last

---
## ⚰️ Now Samuel Was Dead

Samuel had already died back in chapter twenty five.

The text repeats it here on purpose.

Saul is about to face a crisis with no prophet left to guide him.

Samuel was the one voice who used to speak for God to Saul.

That voice is now permanently gone.

⚰️ Samuel died back in chapter twenty five

🔁 The text repeats this on purpose

🗣️ Samuel used to speak for God

📖 Saul has no prophet left now

---
## 👻 Saul Had Put Away Those That Had Familiar Spirits, And The Wizards

A "familiar spirit" means a spirit some people claimed could contact the dead.

A "wizard" here means a person who practiced that kind of contact.

God's law commanded Israel to remove mediums and wizards from the land.

Saul had obeyed that law and driven this practice out.

That earlier obedience makes what Saul does later in this chapter especially troubling.

👻 Familiar spirit means contact with the dead

🧙 Wizard means a practitioner of that

📜 God's law banned this practice

📖 Saul once enforced that very law

# FirstSamuel 28:4-7
# 😨 Saul Faces War With No Word From God
---
## 🏕️ Pitched In Shunem

"Pitched" means the Philistines set up their military camp there.

Shunem sat in the wide Jezreel Valley, good open ground for chariots.

This valley cut through the middle of Israel's territory.

Endor, where Saul is about to travel, sat only a few miles from this camp.

Saul's coming visit will happen dangerously close to enemy lines.

🏕️ Pitched means they set up camp

🗺️ Shunem sat in the Jezreel Valley

🛞 Open ground favored Philistine chariots

📖 Endor sat just a few miles away

---
## ⛰️ Pitched In Gilboa

Gilboa is a mountain range on the opposite side of the valley from Shunem.

Saul camps here with all of Israel's gathered army.

This is the same mountain where Saul and his sons will die by the end of this book.

The name Gilboa marks the beginning of the end for Saul's reign.

⛰️ Gilboa sat across the valley from Shunem

🏕️ Saul camps here with all Israel

💀 Saul will die on this mountain

📖 This chapter marks the start of his end

---
## 😨 He Was Afraid, And His Heart Greatly Trembled

Saul has led Israel's armies into battle many times before.

This fear is different from ordinary battle nerves.

Saul now stands without Samuel and without a clear answer from God.

His fear here comes from feeling completely alone.

An army without God's assurance can feel far larger than it really is.

😨 Saul feels a new kind of fear

🕳️ He faces this without Samuel now

🙏 He has no clear word from God

📖 Feeling alone makes the enemy feel larger

---
## 🎲 Neither By Dreams, Nor By Urim, Nor By Prophets

These were the three normal ways God spoke to His people at this time.

A dream from God was one recognized way He revealed His will.

The Urim was a sacred object kept in the high priest's breastplate, used to seek answers from God.

A prophet was someone God spoke through directly, the way Samuel once did for Saul.

All three doors are closed to Saul at once.

💤 Dreams were one way God spoke

🎲 Urim was a priestly tool for answers

🗣️ Prophets spoke directly for God

📖 All three ways are silent now

---
## 🤐 The Lord Answered Him Not

This is not a delay or a test.

Silence itself is God's answer here.

Saul spent years disobeying and ignoring God's earlier instructions through Samuel.

Now, in his moment of greatest need, God gives him nothing back.

The silence is the direct result of everything that came before this chapter.

🤐 Silence is the answer itself

⏳ This is not just a delay

📜 Years of disobedience led here

📖 God's silence has a cause

---
## 🔄 Seek Me A Woman That Hath A Familiar Spirit

Saul is now asking for the exact thing he outlawed in verse three.

He banned mediums and wizards from the land with his own authority.

Desperation is pushing him to break his own law.

Saul is not seeking God here.

He is seeking a workaround for God's silence instead.

🔄 Saul now asks for what he banned

⚖️ He is breaking his own law

🙈 He seeks a workaround, not God

📖 This marks a turning point for Saul

---
## 📍 A Woman That Hath A Familiar Spirit At Endor

Endor was a small village north of Mount Gilboa, close to the Philistine camp.

The servants already know exactly where to find this woman.

That detail suggests this practice was still happening quietly, even after Saul's ban.

Saul's law had not actually erased the practice.

It had only pushed it into hiding.

📍 Endor sat near the Philistine camp

🤫 The servants already knew where to look

🙈 The ban had not truly ended this

📖 It only pushed the practice into hiding

# FirstSamuel 28:8-11
# 🌙 Saul Seeks A Medium By Night
---
## 👘 Saul Disguised Himself, And Put On Other Raiment

"Raiment" means clothing.

Here it means Saul's ordinary clothes, not his royal ones.

Saul hides his identity as king before this visit.

He knows this act breaks his own law.

A king who once enforced this ban now sneaks around it in secret.

👘 Raiment means clothing

🎭 Saul hides his identity as king

⚖️ He knows this breaks his own law

📖 The enforcer now hides from his own rule

---
## 🌙 By Night

Saul makes this trip after dark on purpose.

Night travel hides him from both his own people and the nearby Philistines.

Everything about this visit is meant to stay secret.

A king desperate enough to hide from his own kingdom has run out of better options.

🌙 Night hides Saul's movements

🙈 Secrecy is the whole point here

😔 Saul is out of better options

📖 Desperation drives this hidden trip

---
## 🔮 Divine Unto Me By The Familiar Spirit

To "divine" means to seek hidden knowledge through forbidden means.

Saul is asking this woman to use the very practice he once outlawed.

He wants information that God has already refused to give him directly.

Going around God's silence does not count as hearing from God.

🔮 Divine means seeking hidden knowledge

🚫 This was the practice Saul banned

🙉 God already refused to answer him

📖 A workaround is not an answer

---
## 🤫 Bring Me Him Up, Whom I Shall Name Unto Thee

Saul does not yet say the name out loud.

He is being careful, even here, about who might be listening.

This sets up the reveal that comes in the very next verses.

Whatever Saul hopes to hear, he still has not said whose voice he wants.

🤫 Saul withholds the name for now

👂 He is still being careful

⏭️ This sets up the next verses

📖 The name is coming

---
## 🎭 Thou Knowest What Saul Hath Done

The woman has no idea she is speaking to Saul himself.

She only knows Saul, the king, as the man who outlawed her practice.

The reader already knows what she does not.

That gap between what she knows and what is true builds tension in this scene.

🎭 She does not know this is Saul

👑 She only knows Saul as king

👀 The reader knows what she does not

📖 This gap builds the scene's tension

---
## 🪤 Wherefore Then Layest Thou A Snare For My Life

A "snare" is a trap, usually pictured as a trap for catching an animal.

The woman fears this stranger is testing her.

She fears he will report her and have her killed.

Saul's own earlier law carried the death penalty for exactly what she is being asked to do.

Her fear shows that Saul's ban, even in hiding, was still a real danger to her.

🪤 Snare means a trap

😨 She fears being reported and killed

⚖️ Saul's own law carried a death penalty

📖 The ban still put her at real risk

---
## 🙏 Saul Sware To Her By The Lord

Saul uses God's own name to guarantee protection for an act God's law forbids.

This is not a small detail.

The king is invoking the LORD to shield a practice the LORD condemned.

Saul's oath shows how far he has drifted from obedience by this point in the story.

🙏 Saul swears using God's own name

🚫 He protects what God's law forbids

📉 This shows how far Saul has drifted

📖 The oath itself is part of the sin

---
## 🗣️ Bring Me Up Samuel

Saul finally says the name he has been holding back.

He wants to speak with Samuel, the prophet who anointed him king years earlier.

Samuel was also the one who told Saul God had rejected him as king.

Saul is not looking for comfort from an old friend.

He is trying to reach the one voice that used to carry God's word to him.

🗣️ Saul finally names Samuel

👑 Samuel once anointed Saul king

⚖️ Samuel also announced God's rejection of him

📖 Saul wants God's voice, not comfort

# FirstSamuel 28:12-14
# 👻 The Witch Sees Samuel Rise
---
## 😱 The Woman Saw Samuel, She Cried With A Loud Voice

This reaction does not match how this woman normally worked.

Her usual practice likely relied on trickery.

This time, something real seems to break through instead.

Her shock and loud cry suggest she did not expect this to actually work.

Many readers see this moment as genuine, not a trick.

😱 Her cry does not match a normal act

🎭 Her usual practice likely relied on trickery

👻 This time something real seems to happen

📖 Many readers see this as genuine

---
## 🔍 Why Hast Thou Deceived Me? For Thou Art Saul

The woman only now realizes her visitor is the king.

The text does not fully explain how she figured this out.

It may be tied to what she just witnessed, something only Saul's presence would explain.

Her fear returns immediately, since Saul is the very man who banned her practice.

🔍 She suddenly realizes this is Saul

❓ The text does not explain exactly how

😨 Her fear returns immediately

📖 Saul is the one who banned her

---
## 🙅 Be Not Afraid

Saul reassures her instead of punishing her.

He needs her cooperation more than he needs to enforce his own law right now.

His priorities in this moment reveal what he actually cares about.

Getting an answer matters more to him than justice or obedience.

🙅 Saul reassures instead of punishing her

🎯 He needs her cooperation now

⚖️ Justice takes a back seat here

📖 Getting an answer is his real priority

---
## 👻 I Saw Gods Ascending Out Of The Earth

The word translated "gods" here does not mean multiple deities.

The same Hebrew word can describe any powerful spiritual being.

The woman is describing something otherworldly rising up, not a group of false gods.

This description sets up the identification that comes in the very next verse.

🌀 Gods here means a spiritual being

🌍 She describes something rising from the earth

🚫 This is not a group of false gods

📖 The description leads to the next verse

---
## 🧥 An Old Man Cometh Up, And He Is Covered With A Mantle

A "mantle" is an outer robe or cloak.

Samuel wore this exact garment throughout his life as a mark of his role.

Years earlier, Saul had torn Samuel's mantle by accident.

Samuel used that torn robe to picture the kingdom being torn from Saul.

That old memory makes this detail land even harder for Saul now.

🧥 Mantle means an outer robe

👴 Samuel is described as an old man

✂️ Saul once tore Samuel's mantle

📖 That memory makes this moment heavier

---
## 👀 Saul Perceived That It Was Samuel

Saul recognizes Samuel immediately from the description alone.

He does not need more proof.

Years spent under Samuel's leadership made this figure unmistakable to him.

Recognition brings no comfort, only dread of what comes next.

👀 Saul recognizes Samuel right away

🧠 He needs no more proof

📜 Years together made him unmistakable

📖 Recognition brings dread, not comfort

---
## 🙇 He Stooped With His Face To The Ground, And Bowed Himself

This is an act of deep respect, the same kind shown to a king or to God.

Saul, the actual king of Israel, bows to his former prophet's spirit.

Even in death, Samuel still outranks Saul in authority.

The posture says more than any words could about who truly holds power here.

🙇 Bowing shows deep respect

👑 A king bows to a prophet's spirit

⚖️ Samuel still outranks Saul

📖 The posture reveals who holds real authority

# FirstSamuel 28:15-19
# 💀 Samuel Pronounces Saul's Doom
---
## 😤 Why Hast Thou Disquieted Me, To Bring Me Up

"Disquieted" means disturbed or troubled out of rest.

Samuel's first words are a rebuke, not a greeting.

This is not the comforting reunion Saul may have hoped for.

Even from beyond death, Samuel still speaks the truth plainly to Saul.

😤 Disquieted means disturbed out of rest

🗣️ Samuel opens with a rebuke

🚫 This is not a comforting reunion

📖 Samuel still speaks the truth plainly

---
## 🙏 God Is Departed From Me, And Answereth Me No More

Saul finally admits out loud what verse six already showed.

He names his own abandonment by God as the reason for tonight's visit.

Saul knows exactly why he came here.

He is not confused about his situation, only desperate to change it.

🙏 Saul admits God has left him

🎯 He names his own reason clearly

😔 He is not confused, only desperate

📖 Desperation, not confusion, drives this visit

---
## ⚔️ Is Become Thine Enemy

Samuel does not soften this news for Saul.

God has not merely stepped back or gone quiet.

Samuel states plainly that the LORD now stands against Saul as an enemy.

This is one of the most severe verdicts spoken about anyone in the Old Testament.

⚔️ God is now called Saul's enemy

🚫 Samuel does not soften this

📢 This is stated plainly, not implied

📖 It is one of scripture's harshest verdicts

---
## ✂️ The Lord Hath Rent The Kingdom Out Of Thine Hand

"Rent" means torn, the same word used when Saul tore Samuel's robe back in chapter fifteen.

Samuel had used that torn robe as a picture of the kingdom being torn from Saul.

That prophecy is now confirmed as already happening.

This is not a new punishment.

It is only a reminder of one already set in motion years earlier.

✂️ Rent means torn

🧥 This echoes the torn robe from chapter fifteen

⏳ The kingdom is already being torn away

📖 This confirms an old prophecy

---
## 👑 Given It To Thy Neighbour, Even To David

Samuel names David directly here.

Saul has spent years trying to kill the very man God already chose to replace him.

Every chapter of pursuit did not change this outcome.

The kingdom was decided long before tonight.

👑 Samuel names David directly

🏃 Saul spent years chasing this same man

🚫 The chase never changed the outcome

📖 The kingdom's future was already decided

---
## 📜 Thou Obeyedst Not The Voice Of The Lord

This points back to a specific command from chapter fifteen.

God had told Saul to completely destroy the Amalekites and everything they owned.

Saul disobeyed by sparing their king.

He also kept the best of their livestock.

That single act of disobedience is named here as the reason for everything happening tonight.

📜 This points to the command in chapter fifteen

⚔️ God ordered Amalek's total destruction

🐑 Saul spared their king and kept livestock

📖 This disobedience is the reason for tonight

---
## ⏰ To Morrow Shalt Thou And Thy Sons Be With Me

Samuel now tells Saul the exact timing of his death.

Saul will die tomorrow, along with his sons.

"With me" means Saul will join Samuel in death by the next day.

This is one of the most direct death sentences given anywhere in scripture.

⏰ Samuel gives an exact timeline

💀 Saul and his sons will die tomorrow

🪦 With me means joining Samuel in death

📖 This is a direct death sentence

---
## ⚔️ The Lord Shall Deliver The Host Of Israel Into The Hand Of The Philistines

This is not only Saul's personal punishment.

The entire army of Israel will suffer defeat alongside their king.

One man's disobedience carries consequences for the whole nation gathered with him.

That connection between a leader's choices and a nation's fate runs throughout this book.

⚔️ This is a national defeat, not just Saul's

🇮🇱 Israel's whole army will suffer with him

👑 A leader's choices affect the whole nation

📖 This pattern runs through the whole book

# FirstSamuel 28:20-25
# 🍞 A Meal Before Saul's Final Night
---
## 😵 Saul Fell Straightway All Along On The Earth

Saul physically collapses under the weight of what he just heard.

This is not a dramatic gesture.

His body simply gives out.

The king who once stood head and shoulders above the people is now flat on the ground.

😵 Saul physically collapses

🚫 This is not a dramatic gesture

📉 His body simply gives out

📖 The tall king now lies flat

---
## 🍞 He Had Eaten No Bread All The Day, Nor All The Night

Saul has gone without food for a full day and night before this visit.

This kind of fasting sometimes marked deep distress.

His body was already weak before Samuel ever appeared.

Physical exhaustion and emotional shock now hit him together.

🍞 Saul had not eaten in over a day

😔 Fasting often marked deep distress

💪 His body was already weak

📖 Exhaustion and shock hit him together

---
## 🎲 I Have Put My Life In My Hand

This idiom means the woman risked her own life to do what Saul asked.

Practicing her craft for the king who had banned it could have cost her everything.

She reminds Saul of that risk now.

Perhaps she hopes he will show her some consideration in return.

🎲 The idiom means risking her own life

⚖️ Saul's own ban made this dangerous for her

🙏 She reminds him of that risk

📖 She hopes for consideration in return

---
## 🍞 Let Me Set A Morsel Of Bread Before Thee

The woman now shifts from medium to host.

She offers Saul practical care instead of more frightening news.

Her concern for his physical strength stands in sharp contrast to Samuel's harsh words.

A stranger shows Saul more simple kindness here than he received from his own vision.

🍞 She offers Saul food

🤝 She shifts from medium to host

💔 Her kindness contrasts Samuel's harsh words

📖 A stranger shows him unexpected kindness

---
## 🚫 He Refused, And Said, I Will Not Eat

Saul's refusal reflects the weight of what he just learned.

A man told he will die tomorrow has little appetite for a meal tonight.

Grief and shock often show up first as a loss of basic desire.

Even hunger fades under that kind of weight.

🚫 Saul refuses to eat at first

💀 He just learned he will die tomorrow

😔 Grief often shows up as lost appetite

📖 Shock silences even basic desires

---
## 🤝 His Servants, Together With The Woman, Compelled Him

Three people together finally convince Saul to eat.

Even the men who normally follow Saul's orders now push back against him.

Basic human care overrides royal authority in this moment.

🤝 Three people convince Saul together

👥 Even his own servants push back

❤️ Basic care overrides his authority

📖 Kindness wins out over his refusal

---
## 🍞 Unleavened Bread

"Unleavened" means bread made without yeast, so it needed no time to rise.

The woman needed to feed Saul quickly, in the middle of the night.

There was no time to spare.

This detail shows real urgency, not a planned or comfortable meal.

🍞 Unleavened means made without yeast

⏳ It required no time to rise

🌙 Everything happened quickly, in the night

📖 The urgency shows real care, not comfort

---
## 🐄 A Fat Calf In The House

A fat calf was valuable.

It was kept for a special occasion, not an everyday meal.

The woman gives Saul her best.

She has every reason to resent him instead.

This is a costly kindness from someone Saul had wronged.

🐄 A fat calf was valuable

🎉 It was kept for special occasions

💔 Given to the man who wronged her

📖 Her generosity outweighs any grudge

---
## 🌙 They Rose Up, And Went Away That Night

The chapter ends quietly, with a meal and a walk into the dark.

There is no battle in this chapter.

Saul only faces his own end in advance.

Saul now knows exactly what tomorrow holds and walks toward it anyway.

That is the last picture of Saul before his final battle.

🌙 The chapter ends quietly, in darkness

⚔️ No battle happens in this chapter

🚶 Saul walks knowingly toward his own end

📖 This is Saul's last picture before his end
`.trim();

export const FIRST_SAMUEL_TWENTY_EIGHT_PERSONAL_SECTIONS = parseFirstSamuelTwentyEightRawNotes(
  FIRST_SAMUEL_TWENTY_EIGHT_RAW_NOTES,
);
