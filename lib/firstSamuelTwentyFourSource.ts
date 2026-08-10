export type FirstSamuelTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelTwentyFourRawNotes(rawText: string): FirstSamuelTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 24:${startVerse}` : `1 Samuel 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Samuel 24 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_TWENTY_FOUR_RAW_NOTES = `# FirstSamuel 24:1-3
# 🐐 Saul Pursues David Into Engedi
---
## 🏜️ David Is In The Wilderness Of Engedi

Engedi was a lush oasis on the western shore of the Dead Sea.

Fresh springs made it a rare patch of green inside a harsh desert.

David had already moved there at the end of the last chapter.

Saul now learns exactly where his enemy has gone to hide.

🏜️ Engedi sits by the Dead Sea

💧 Fresh springs made it a green oasis

🏃 David fled there at the last chapter's end

📖 Saul now knows exactly where to look

## 🔢 Three Thousand Chosen Men

Saul brings three thousand men handpicked for this single hunt.

This is not a border patrol or a police detail.

It is one of the largest forces mentioned anywhere in Saul's reign.

One king spends an army chasing a single unarmed rival.

🔢 Three thousand men were handpicked

⚔️ This was a major military force

👑 One of Saul's largest efforts recorded

📖 A whole army chases one man

## 🐐 Rocks Of The Wild Goats

"Wild goats" refers to ibex, sure footed animals that live on steep cliffs.

Only rugged, broken terrain like this could support a herd of them.

David is hiding in ground so rough that soldiers struggle to search it well.

The same wilderness that hides David also slows the army chasing him.

🐐 Wild goats means the mountain ibex

⛰️ Ibex live on steep, rocky cliffs

🙈 David hides in nearly unsearchable ground

➡️ Rough terrain protects him too

## 🏘️ Sheepcotes By The Way, Where Was A Cave

A sheepcote was a stone walled pen used to shelter sheep overnight.

Shepherds often built these pens near natural caves for extra protection.

Saul stops at an ordinary shepherd's shelter, not expecting anything unusual.

The cave beside it happens to be the very place David is hiding.

🏘️ Sheepcotes were stone pens for sheep

🕳️ Caves often sat right beside them

😮 Saul stops there without any warning

📖 David is hiding in that very cave

## 🚻 Saul Went In To Cover His Feet

"Cover his feet" is an old, polite way of saying he relieved himself.

Long robes in this culture were lifted and spread out for privacy.

Saul walks deep into the cave completely alone.

His guard is entirely down in this moment.

He has no idea he is standing feet away from the men hunting him.

🚻 Covering his feet meant relieving himself

👘 Long robes gave a simple privacy

😌 Saul is alone with his guard down

➡️ He has no idea David is near

## 🙈 David And His Men Remained In The Sides Of The Cave

Caves in this region often ran back much further than they first appeared.

David and his men are hidden deep in the dark, unseen from the entrance.

The hunter has walked into the very room where his prey is sitting still.

This single scene decides the direction of the rest of the chapter.

🙈 The cave ran deeper than it looked

🌑 David's men sat hidden in the dark

😲 The hunter enters his prey's own room

📖 This moment shapes the whole chapter

# FirstSamuel 24:4-7
# ✂️ David Spares Saul's Life
---
## 📜 Behold The Day Of Which The LORD Said

David's men treat this moment as the fulfillment of an old promise.

Scripture never actually records God saying He would deliver Saul that exact way.

David's men are filling in a promise with their own hopeful guess.

Not every confident claim about God's will is actually God's own word.

📜 The men claim an old promise

❓ Scripture never records that exact promise

🙏 They fill the gap with a guess

📖 Confidence is not the same as truth

## ✂️ Cut Off The Skirt Of Saul's Robe Privily

The "skirt" of a robe means its hem, the lower edge of the garment.

"Privily" is an old word meaning secretly, done without anyone noticing.

Robes carried real royal meaning in this culture, closely tied to a king's authority.

David could have taken Saul's life just as easily as this small piece of cloth.

✂️ Skirt means the hem of the robe

🤫 Privily means done secretly

👑 A king's robe carried real authority

➡️ A life was as reachable as cloth

## 💓 David's Heart Smote Him

"Smote" here does not mean a physical blow of any kind.

It means a sudden, sharp pang of guilt hit David's conscience.

Even this small act against a king's robe feels like too much to David.

His conscience is far more sensitive than the situation actually required.

💓 Smote here means a sudden pang

😔 Guilt hit David's conscience immediately

✂️ Even the robe felt like too much

📖 David's conscience runs deeper than needed

## 🙏 The LORD Forbid That I Should Do This Thing

David treats even harming Saul's robe as something to catch himself from.

He immediately corrects course out loud, right in front of his own men.

Refusing sin here happens instantly, not after a long inner struggle.

David's example of restraint teaches his own followers something in real time.

🙏 David catches himself immediately

🗣️ He speaks it aloud to his men

⚡ The correction comes right away

➡️ His restraint teaches his men, too

## 👑 The LORD's Anointed

"Anointed" means someone set apart for office by having oil poured on their head.

Kings, priests, and prophets could all be anointed for their specific calling.

Touching God's anointed king with violence was treated as touching God's own choice.

David repeats this exact phrase again later in the chapter as his main defense.

👑 Anointed means set apart with oil

⛪ Kings, priests, and prophets were anointed

🚫 Harming him meant defying God's choice

📖 This phrase becomes David's main defense

## ✋ David Stayed His Servants With These Words

"Stayed" here is an old word meaning he held them back by force of will.

David's men were ready and willing to kill Saul on the spot.

One man's conviction stops several others from acting on real opportunity.

Leadership here means restraining anger, not commanding an attack.

✋ Stayed means held back, not remained

⚔️ His men were ready to kill

🛑 One man's conviction stopped several others

📖 Restraint was the real leadership shown

## 🚶 Saul Rose Up Out Of The Cave, And Went On His Way

Saul finishes and leaves the cave with no idea what almost happened.

He never learns in this moment how close he came to death.

David's mercy will only become visible to Saul once he is safely outside.

The most dramatic choice of the whole chapter happens in complete silence.

🚶 Saul leaves the cave unaware

😶 He never learns how close he came

🤫 David's mercy stays hidden until later

📖 A silent choice changes everything

# FirstSamuel 24:8-12
# 🗣️ David Calls Out To Saul
---
## 🙇 David Stooped With His Face To The Earth

David waits until Saul is a safe distance away before revealing himself.

Bowing all the way to the ground was a full gesture of submission to a king.

David proves his loyalty with his whole body, not only with his words.

He still honors Saul's office even after years of being hunted by him.

🙇 David waits for a safe distance

🛬 Full bowing showed total submission

🗣️ Loyalty is shown with his body

📖 Saul's office is still honored

## 👑 My Lord The King

David still calls Saul "my lord the king" despite years on the run.

He never once claims the throne for himself in this whole speech.

Respect for Saul's position remains firm, even while he defends his own innocence.

David separates the office he honors from the man who is hunting him.

👑 David still uses Saul's royal title

🚫 He never claims the throne himself

🙇 He respects the office, not just the man

➡️ Honor and self defense are not opposites

## ❓ Wherefore Hearest Thou Men's Words

"Wherefore" is simply an old word for "why."

David directly names the real problem, rumors reaching Saul's ears.

He does not deny hearing the accusation, he confronts it directly instead.

Naming the real issue is the first step in David's whole defense.

❓ Wherefore means why

👂 Rumors are the real problem named

🎯 David confronts the accusation directly

📖 Naming the issue starts his defense

## 🎯 David Seeketh Thy Hurt

This is the exact accusation David is trying to answer.

Someone has told Saul that David is actively plotting to harm him.

The very opposite just happened only moments earlier in this same cave.

David's whole demonstration exists to prove that specific claim false.

🎯 The accusation is that David plans harm

🔄 The opposite just happened in the cave

✅ David sets out to disprove this claim

📖 Truth answers rumor with plain evidence

## 👁️ This Day Thine Eyes Have Seen

David points Saul to something Saul can verify with his own senses.

This is not an argument that depends only on David's word.

Saul just walked out of that very cave himself moments ago.

Physical proof carries more weight here than any spoken promise could.

👁️ David points to what Saul can verify

🚫 This is not just David's word

🕳️ Saul just left that very cave

📖 Proof outweighs a spoken promise here

## 🗡️ Some Bade Me Kill Thee, But Mine Eye Spared Thee

David admits out loud that his own men urged him toward violence.

He does not hide that real temptation from Saul at all.

"Mine eye spared thee" means David personally chose mercy over that advice.

Honesty about temptation makes David's mercy mean even more.

🗡️ His own men urged violence

🗣️ David admits the temptation openly

👁️ He personally chose mercy instead

📖 Honesty makes the mercy mean more

## 👴 See The Skirt Of Thy Robe In My Hand

David calls Saul "my father" here, even in the middle of his own defense.

Saul is actually David's father in law through his marriage to Michal.

The physical piece of cloth is undeniable proof David was close enough to kill him.

David chooses proof and honor together instead of proof alone.

👴 David calls Saul "my father"

💍 Saul is his father in law by marriage

✂️ The cloth proves how close he was

📖 David pairs proof with real honor

## ✅ Neither Evil Nor Transgression In Mine Hand

"Transgression" is an old word for breaking a law or a trust.

David states his innocence in plain, direct terms.

He has broken no command and betrayed no loyalty toward Saul.

This claim stands on the evidence he already gave, not on his word alone.

✅ Transgression means breaking a law or trust

🗣️ David states his innocence plainly

🚫 He has broken no command or loyalty

📖 Evidence backs up this claim

## 🏃 Thou Huntest My Soul To Take It

David states the painful contrast at the center of this whole speech.

He has just proven his innocence with clear, physical evidence.

Saul is still actively chasing him down to end his life anyway.

Innocence alone has not been enough to stop the manhunt.

🏃 Saul still hunts David's life

⚖️ Innocence has just been proven

😔 Proof alone does not stop the chase

➡️ The danger continues despite the evidence

# FirstSamuel 24:13-15
# ⚖️ David Appeals To The LORD As Judge
---
## 📜 The Proverb Of The Ancients

David quotes an old, well known saying rather than only his own opinion.

Ancient cultures often passed down short sayings like this as shared wisdom.

Leaning on common wisdom makes David's argument harder to dismiss as personal bias.

He is reasoning from something both men would already recognize as true.

📜 David quotes an old shared saying

🗣️ Ancient cultures passed down wisdom this way

⚖️ Shared wisdom is harder to dismiss

📖 David reasons from common ground

## 😈 Wickedness Proceedeth From The Wicked

This old saying means a person's actions reveal their true character.

David is arguing backward from the saying, not forward into a threat.

If he acted wickedly right now, it would prove he really is wicked.

Refusing to strike Saul is David's way of proving his own character.

😈 The saying links actions to character

🔄 David argues from the saying, not a threat

✋ Acting wickedly would prove him wicked

📖 Restraint proves David's real character

## 🐕 After A Dead Dog, After A Flea

Dogs in ancient Israel were usually wild scavengers, not loved household pets.

Calling himself a "dead dog" means David names himself as worthless and harmless.

A flea is small, easily overlooked, and almost impossible to actually catch.

David shrinks himself down on purpose to make Saul's manhunt look absurd.

🐕 Dead dog meant something worthless

🐜 A flea is tiny and hard to catch

🙇 David makes himself sound harmless

➡️ He makes the manhunt look absurd

## ⚖️ The LORD Therefore Be Judge

David refuses to settle this conflict by his own hand a second time.

He hands the entire dispute over to God's judgment instead.

This exact line already appeared earlier in David's speech, in verse twelve.

Repeating it shows David's mind has not shifted at all under pressure.

⚖️ David refuses to judge this himself

🙏 He hands the case to God

🔁 This line already appeared in verse twelve

📖 David's position never wavers under pressure

## 🗣️ Plead My Cause, And Deliver Me

"Plead my cause" is old courtroom language for arguing someone's side in a trial.

David is asking God to act as his defense before any human judge.

He wants deliverance to come from that same divine ruling, not from violence.

Legal language shapes how David frames his whole appeal here.

🗣️ Plead my cause means argue his case

⚖️ God is asked to be his defense

🙏 Deliverance should come from that ruling

📖 Legal language shapes David's whole appeal

# FirstSamuel 24:16-19
# 😢 Saul Weeps And Confesses
---
## 🎙️ Is This Thy Voice, My Son David

Saul cannot see David clearly from this distance at first.

He recognizes David only by the sound of his voice.

Calling him "my son" is a sudden, striking softness after years of hatred.

The hardened king briefly sounds like a father again.

🎙️ Saul knows the voice before the face

👶 He calls David "my son"

❄️ This softness breaks years of hatred

📖 A hardened king sounds fatherly again

## 😭 Saul Lifted Up His Voice, And Wept

This is the first time in the whole conflict that Saul shows real grief.

Weeping openly in front of his own soldiers was not a small thing for a king.

Guilt, relief, and shame likely all mix together in this one moment.

A private battle of anger finally breaks out into the open.

😭 Saul's first real grief in this conflict

👑 Weeping publicly was not small for a king

😔 Guilt, relief, and shame all mix here

📖 Private anger breaks into the open

## 🙌 Thou Art More Righteous Than I

Saul openly admits that David has behaved better than he has.

This kind of confession almost never appears elsewhere from Saul in this book.

He is not just apologizing, he is naming an actual moral gap between them.

The words come easily here, though his actions will not stay changed for long.

🙌 Saul admits David is more righteous

📖 This kind of honesty is rare for Saul

⚖️ He names a real moral gap

➡️ Words here outrun his actual actions

## ⚖️ Rewarded Me Good, Whereas I Have Rewarded Thee Evil

Saul lays the contrast out in the plainest possible terms.

David repaid real danger with mercy instead of revenge.

Saul repaid loyal service with years of jealousy and violence.

Saying it plainly does not erase the years David has already suffered for it.

⚖️ Saul names the contrast plainly

🤝 David repaid danger with mercy

😠 Saul repaid loyalty with violence

📖 Naming it does not undo the harm

## ❓ Will He Let Him Go Well Away

Saul asks a question with an obvious answer built right into it.

No normal person would let a cornered enemy simply walk free.

David just proved himself to be exactly that unusual.

Saul's own question makes David's mercy look even more remarkable.

❓ The question has an obvious answer

🚶 No one lets a cornered enemy go

🌟 David just did the unusual thing

📖 The question highlights David's mercy

## 🙏 The LORD Reward Thee Good

Saul prays an actual blessing over the very man he has been hunting.

He asks God to repay David for the mercy just shown to him.

This blessing sits strangely close to Saul's ongoing pursuit of David's life.

Words of blessing and acts of hostility exist side by side in Saul.

🙏 Saul blesses the man he is hunting

🤝 He asks God to repay David's mercy

😬 The blessing sits close to real hostility

📖 Words and actions do not always match

# FirstSamuel 24:20-22
# 👑 Saul's Prophecy And The Final Oath
---
## 👑 Thou Shalt Surely Be King

Saul openly admits what he has likely feared for a long time.

Jonathan already said almost this same thing back in the previous chapter.

Now Saul himself confirms it, coming straight from the reigning king's own mouth.

This admission does not stop him from resuming the chase again soon after.

👑 Saul admits David's future kingship

🔁 Jonathan already said this in chapter twenty three

🗣️ It now comes from the king himself

📖 Admission does not end the pursuit

## 🏛️ The Kingdom Shall Be Established In Thine Hand

"Established" means made secure and lasting, not just temporarily won.

Saul is not describing a lucky, short lived victory for David.

He is predicting a real, stable kingdom that will hold together.

This turns out to be exactly what happens later in David's reign.

🏛️ Established means secure and lasting

🎲 Not a lucky, short lived win

🔮 Saul predicts a stable future kingdom

📖 This matches David's actual reign later

## 🤝 Swear Now Unto Me By The LORD

Swearing an oath by God's name made a promise seriously binding in this culture.

Breaking an oath like this was treated as a direct offense against God.

Saul wants more than David's spoken word alone.

He wants a promise backed by the highest possible authority.

🤝 Oaths by God's name were binding

⚠️ Breaking one offended God directly

🗣️ Saul wants more than a plain promise

📖 He wants God as the guarantee

## 👶 Not Cut Off My Seed After Me

"Seed" here means Saul's children and future descendants, not literal plant seed.

Ancient kings who took a throne by force often killed off the old family line.

Saul is not just afraid of losing his own life anymore.

He is afraid his whole family could be wiped out once David becomes king.

👶 Seed means Saul's children and descendants

⚔️ New kings often killed old family lines

😨 Saul fears more than his own death

📖 He fears for his entire family

## 📛 Destroy My Name Out Of My Father's House

A family's "name" being wiped out meant its whole line disappearing from memory.

Having no descendants left to carry the family forward was a serious loss in this culture.

Saul is asking David for something bigger than personal safety.

He is asking for his family's whole legacy to survive him.

📛 A family's name meant its whole legacy

😟 Losing it meant vanishing from memory

🙏 Saul asks for more than his own safety

📖 He asks his legacy to survive him

## 🤝 David Sware Unto Saul

David agrees to the oath Saul has just requested.

This promise gets tested and kept many years later in the book of Second Samuel.

David eventually shows kindness to Mephibosheth, Jonathan's disabled son, instead of harming Saul's line.

A quiet oath made in the wilderness holds up long after this chapter ends.

🤝 David agrees to Saul's request

📚 Second Samuel later tests this promise

👶 Mephibosheth receives kindness, not harm

➡️ A wilderness oath outlives this chapter

## 🏰 Gat Them Up Unto The Hold

"Gat them up" is an old way of saying they went up to a place.

A "hold" was a natural stronghold, a defensible position in rough terrain.

David returns to hiding right away, even after this emotional reconciliation.

He trusts God's promise about the future far more than he trusts Saul's current mood.

🏰 Gat them up means they went up

🛡️ A hold was a defensible stronghold

🧠 David returns to hiding right away

📖 He trusts God more than Saul's mood
`.trim();

export const FIRST_SAMUEL_TWENTY_FOUR_PERSONAL_SECTIONS = parseFirstSamuelTwentyFourRawNotes(FIRST_SAMUEL_TWENTY_FOUR_RAW_NOTES);
