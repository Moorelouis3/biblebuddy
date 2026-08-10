export type FirstSamuelTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelTwentyFiveRawNotes(rawText: string): FirstSamuelTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 25:${startVerse}` : `1 Samuel 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 1 Samuel 25 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_TWENTY_FIVE_RAW_NOTES = `# FirstSamuel 25:1-3
# 📜 Samuel Dies, A Fool Enters The Story
---
## 📜 Samuel Died

Samuel had guided Israel for most of his life.

He anointed both Saul and David as king.

His death marks the end of an entire era.

The whole nation stops to mourn him.

This is the last time Samuel is seen alive in the story.

📜 Samuel led Israel for decades

👑 He anointed both Saul and David

⏳ His death ends an era

📖 All Israel stops to mourn

## 🏜️ Went Down To The Wilderness Of Paran

The wilderness of Paran sits in the desert south of Judah.

David no longer has Samuel's protection or influence at court.

Moving south put more distance between David and Saul.

This wilderness is rough, dry, and hard to survive in.

🏜️ Paran is a desert region south of Judah

🛡️ Samuel's protection is now gone

🧭 David moves farther from Saul

➡️ The land is rough and dry

## 📛 The Name Of The Man Was Nabal

"Nabal" is a Hebrew word that means fool.

His parents did not necessarily intend it as an insult.

Names in this era often carried a hoped for blessing instead.

This name becomes painfully accurate by the end of the chapter.

📛 Nabal means fool in Hebrew

👶 Names often carried a family hope

🎭 This name turns out to fit him exactly

📖 Watch how the story proves the name true

## 🧠 A Woman Of Good Understanding

"Understanding" here means wisdom and good judgment.

Abigail is introduced as intelligent before anything else is said about her.

She is also called beautiful, but her mind is named first.

That order matters for how the rest of the chapter reads.

🧠 Understanding means wisdom and judgment

🥇 Her intelligence is named first

✨ Beauty comes second in the description

📖 Her wisdom will carry the whole chapter

## 😠 Churlish And Evil In His Doings

"Churlish" means harsh and rude.

Nabal is also called a Calebite and enormously wealthy.

Wealth and family name did not make him a good man.

His character is stated plainly before the story even begins.

😠 Churlish means harsh and rude

💰 Nabal was very wealthy

👤 Wealth did not make him decent

➡️ His bad character is named up front

# FirstSamuel 25:4-8
# 🐑 David's Peaceful Request
---
## ✂️ David Heard That Nabal Did Shear His Sheep

Sheep shearing was a major event in this culture.

It marked a season of profit and often included a feast.

Owners were expected to be generous during this time.

David's timing here is deliberate, not random.

✂️ Shearing was a profitable season

🎉 It often came with a feast

🎁 Generosity was expected then

➡️ David's timing is intentional

## 🗣️ Greet Him In My Name

David sends ten young men with a specific message.

Greeting "in my name" means they represent David personally.

Whatever they say carries David's own authority behind it.

This is not a random visit.

🗣️ The men speak for David himself

👑 His name carries his authority

📜 This is a formal request

➡️ Every word is deliberate

## 🕊️ Peace Be Unto All That Thou Hast

This is a traditional greeting of goodwill.

Repeating "peace" three times makes the blessing feel complete.

David is opening the request as kindly as possible.

Nothing here sounds like a threat yet.

🕊️ Peace was a traditional greeting

🔁 Repeating it three times shows warmth

🤝 David opens gently

➡️ Nothing here threatens Nabal

## 🛡️ Thy Shepherds...We Hurt Them Not

David's men had been protecting Nabal's shepherds in the wilderness.

Bandits and wild animals were a real danger out there.

David's six hundred men acted like an unpaid security force.

Nothing of Nabal's was ever stolen or harmed.

🛡️ David's men protected Nabal's shepherds

🐺 The wilderness held real danger

💪 Six hundred men gave real protection

📖 Nothing was ever stolen

## 🙏 Whatsoever Cometh To Thine Hand

David is not demanding a set price.

He is asking Nabal to give whatever he thinks is fair.

This kind of request depended completely on the other man's honor.

David is trusting Nabal to do the right thing.

🙏 David asks for a fair gift

⚖️ The request relies on Nabal's honor

🤝 It is framed respectfully

➡️ David expects decent treatment

# FirstSamuel 25:9-13
# 😤 Nabal's Insult And David's Rage
---
## ❓ Who Is David, And Who Is The Son Of Jesse

Nabal pretends not to know who David is.

By now David was already famous for killing Goliath.

Refusing to use his name is a deliberate insult.

Nabal is choosing to disrespect him on purpose.

❓ Nabal pretends not to know David

⚔️ David was already famous for Goliath

😤 Refusing his name is an insult

➡️ The ignorance is fake

## 🏃 Many Servants That Break Away Every Man From His Master

Nabal compares David to a runaway servant.

This was a serious accusation in that culture.

It ignores that David is fleeing an unjust king, not stealing from a fair one.

The insult is meant to make David sound like a criminal.

🏃 Nabal compares David to a runaway servant

😡 That was a serious accusation

🙅 It ignores why David is really fleeing

➡️ The insult paints David as a criminal

## 🍞 Shall I Then Take My Bread, And My Water, And My Flesh

Nabal refuses to share anything he has worked to gain.

He frames David's men as strangers with no claim on him.

This ignores the months of protection they already provided.

Nabal's greed blinds him to what he actually owes.

🍞 Nabal refuses to share his food

🙅 He treats David's men as strangers

🛡️ He ignores the protection they gave

➡️ Greed blinds him to what he owes

## ⚔️ Gird Ye On Every Man His Sword

David responds to the insult by preparing for war.

Girding a sword meant strapping it on and getting ready to fight.

Four hundred men move out with David immediately.

This is a fast, furious decision, not a calm one.

⚔️ Girding a sword means preparing to fight

🏃 David responds instantly

👥 Four hundred men march with him

➡️ This is anger, not calm judgment

## 🎒 Two Hundred Abode By The Stuff

"Stuff" here means the baggage and supplies of the camp.

Two hundred men stay behind to guard it.

Splitting the group shows this was still an organized force.

It was not a disorganized mob.

🎒 Stuff means baggage and supplies

🛡️ Two hundred men guard the camp

📋 The force stays organized

➡️ Anger did not erase discipline

# FirstSamuel 25:14-17
# 🗣️ The Servant Warns Abigail
---
## 🗣️ One Of The Young Men Told Abigail

A servant goes around Nabal entirely and warns Abigail instead.

This shows the household already trusted her judgment more than her husband's.

He knows Nabal will not listen or act wisely.

Going to Abigail is the servant's only real option.

🗣️ A servant reports directly to Abigail

🧠 The household trusts her judgment

🙅 Nabal cannot be reasoned with

➡️ She is the household's real decision maker

## 😡 He Railed On Them

"Railed" means Nabal shouted insults at David's messengers.

The servant is describing exactly how badly Nabal handled this.

He is giving Abigail the full picture before disaster hits.

Nothing about the report is exaggerated for effect.

😡 Railed means shouted insults

🗣️ The servant reports it honestly

⚠️ He is warning her plainly

📖 No exaggeration is needed here

## 🧱 They Were A Wall Unto Us Both By Night And Day

The servant compares David's men to a protective wall.

A wall keeps danger out on every side, day and night.

This confirms David's own account of the protection given.

Nabal's version of events was simply a lie.

🧱 A wall means constant protection

🌓 It worked day and night

✅ This confirms David's own claim

📖 Nabal's version was false

## 😈 Evil Is Determined Against Our Master

"Belial" is an old word for someone worthless and wicked.

The servant already knows how serious this threat has become.

He understands David's reputation well enough to expect real violence.

The whole household is now in danger because of Nabal's choice.

😈 Belial means worthless and wicked

⚠️ The servant senses real danger

⚔️ David's reputation makes the threat real

➡️ The whole household is at risk

# FirstSamuel 25:18-22
# 🐫 Abigail's Swift Preparation
---
## ⏱️ Abigail Made Haste

Abigail does not hesitate or ask her husband first.

She understands the danger and moves immediately.

Every minute wasted brings David's men closer.

Her speed alone may save the household.

⏱️ Abigail acts immediately

🙅 She does not consult Nabal

⚠️ Every minute matters

➡️ Her speed may save everyone

## 🍞 Two Hundred Loaves...Five Sheep Ready Dressed

This is a large, carefully assembled gift, not a token offering.

Bread, wine, meat, grain, raisins, and figs cover a full feast.

It matches exactly what David originally asked for.

Abigail is giving David everything Nabal refused to give.

🍞 The gift is large and complete

🍇 It covers bread, wine, meat, and fruit

🎯 It matches David's original request

📖 Abigail gives what Nabal withheld

## 🤫 She Told Not Her Husband Nabal

Abigail acts entirely without her husband's knowledge.

She already knows he would refuse or make things worse.

This is a risky decision inside her own household.

She chooses to save lives over asking permission.

🤫 Abigail acts without telling Nabal

🙅 He would only make it worse

⚠️ This risks trouble at home

➡️ Saving lives comes first

## 🏞️ The Covert Of The Hill

"Covert" means a hidden or sheltered spot, like a fold in the hillside.

Abigail's caravan and David's armed men approach from opposite sides.

Neither group can fully see the other until they meet.

The next moment could go either way.

🏞️ Covert means a hidden spot

🐫 Abigail approaches from one side

⚔️ David's men approach from the other

➡️ Neither side sees the other yet

## 🚹 Any That Pisseth Against The Wall

This blunt phrase is an old way of saying every male person.

David is swearing to kill every man in Nabal's household by morning.

The vow is crude on purpose, meant to sound absolute.

David is about to commit mass murder over one insult.

🚹 The phrase means every male person

☠️ David vows to kill them all

😡 The vow sounds absolute

➡️ One insult is about to cause a massacre

# FirstSamuel 25:23-27
# 🙇 Abigail Falls Before David
---
## 🐴 She Hasted, And Lighted Off The Ass

Abigail gets down from her donkey the moment she sees David.

Staying seated above him would have looked disrespectful.

Every action here is chosen to lower herself before him.

Her body language begins the plea before her words do.

🐴 She dismounts immediately

🙇 Staying seated would look proud

👇 Her posture lowers her before David

➡️ Her body speaks before her words

## 🙇 Fell At His Feet

Falling at someone's feet was a total act of submission.

Abigail is not just being polite.

She is placing herself completely at David's mercy.

"Handmaid" is a word she repeats through her whole speech.

It marks her as a servant asking for grace, not an equal negotiating terms.

🙇 Falling at his feet meant total submission

❤️ She places herself at David's mercy

🗣️ Handmaid repeats through her speech

📖 She is asking for grace, not a deal

## ⚖️ Upon Me, My Lord, Upon Me Let This Iniquity Be

"Iniquity" means guilt or wrongdoing.

Abigail asks David to blame her instead of Nabal.

She takes responsibility for a mistake she did not even make.

This is a bold move meant to redirect David's anger.

⚖️ Iniquity means guilt or wrongdoing

🙋 Abigail takes the blame herself

🙅 She did not cause the offense

➡️ She redirects David's anger

## 📛 As His Name Is, So Is He...Folly Is With Him

Abigail plays directly on her husband's name.

"Nabal" means fool, and she says he is exactly that.

She is not defending him.

She is exposing him.

This honesty helps her argument land with David.

📛 Nabal means fool

🎯 Abigail admits he fits the name

🙅 She is not defending him

📖 Honesty strengthens her plea

## 👀 I Thine Handmaid Saw Not The Young Men Of My Lord

Abigail admits she never even saw David's messengers arrive.

If she had been there, she claims, this could have been avoided.

This is a gentle way of saying the disaster was preventable.

She is building a path for David to step back without losing honor.

👀 Abigail never saw the messengers arrive

🔁 She implies this was preventable

🕊️ Her words offer David a way back

➡️ She protects his honor while pleading

# FirstSamuel 25:28-31
# 🙏 Abigail's Prophetic Plea
---
## 🏠 The LORD Will Certainly Make My Lord A Sure House

"Sure house" means a lasting dynasty, a family line that continues.

Abigail is telling David that God has already decided his future.

She is speaking with confidence about a promise not yet fulfilled.

This is one of the earliest hints in the book that David will become king.

🏠 Sure house means a lasting dynasty

👑 Abigail predicts David's future

🙏 She speaks with real confidence

📖 An early hint of David's kingship

## 🎒 Bound In The Bundle Of Life

This pictures something valuable tied up safely inside a pouch.

Abigail is saying David's life is kept safe by God himself.

The image contrasts with what she says next about David's enemies.

Their fate is very different from his.

🎒 A bundle pictures something kept safe

🛡️ David's life is protected by God

⚖️ This contrasts sharply with his enemies

📖 Safety belongs to the one God protects

## 🪨 Sling Out, As Out Of The Middle Of A Sling

A sling was a simple weapon, the same kind David used against Goliath.

Abigail pictures God flinging David's enemies away with force.

The image would have struck David personally, given his own history.

Even his enemies' end is completely in God's hands.

🪨 A sling was David's own old weapon

💥 God flings his enemies away

🎯 The image connects to David's past

📖 God controls how enemies fall

## 😔 No Grief Unto Thee, Nor Offence Of Heart

Abigail is asking David to think ahead to how he will feel later.

Killing Nabal now would leave David with guilt he cannot undo.

She wants him to become king with a clean conscience, not a bloody memory.

This appeal to his future self is the heart of her whole argument.

😔 Grief means lasting regret

🩸 Killing now would leave real guilt

👑 A clean conscience matters for a king

📖 She appeals to David's future self

# FirstSamuel 25:32-35
# 🙌 David Blesses Abigail's Wisdom
---
## 🙌 Blessed Be The LORD God Of Israel, Which Sent Thee

David credits God immediately, not Abigail's timing or luck.

He recognizes her arrival as something arranged, not accidental.

This is the same instinct David showed earlier in chapter twenty four with Saul.

He keeps giving God credit instead of taking matters into his own hands.

🙌 David credits God first

⏰ Her arrival was not luck

🔁 This matches chapter twenty four

📖 David keeps trusting God over his own hand

## 🧠 Blessed Be Thy Advice

"Advice" here means her wise counsel, not just a suggestion.

David openly admits a woman just talked him out of murder.

This took real humility for a warrior already marching to kill.

He is grateful, not embarrassed, about being corrected.

🧠 Advice means wise counsel

😳 A woman just stopped him from murder

💪 Admitting it took real humility

➡️ David is grateful, not embarrassed

## 🔁 Except Thou Hadst Hasted...There Had Not Been Left Unto Nabal Any

David repeats his earlier vow almost word for word.

Saying it again shows exactly how close disaster really came.

Abigail arrived with only minutes to spare.

This was never a small risk David is casually shrugging off.

🔁 David repeats his own vow

⏳ It shows how close disaster came

😬 Minutes were the real margin

📖 This was a real, serious danger

## 👂 I Have Hearkened To Thy Voice, And Have Accepted Thy Person

David formally accepts both her gift and her plea.

"Hearkened" means he listened and actually changed his mind.

Nothing about this response is halfhearted or reluctant.

The crisis genuinely ends here.

👂 Hearkened means he truly listened

🎁 David accepts her gift

🕊️ He fully changes course

📖 The crisis is genuinely over

# FirstSamuel 25:36-38
# 🍷 Nabal's Feast And Sudden Death
---
## 🎉 Like The Feast Of A King

Nabal throws himself a lavish party, completely unaware of what almost happened.

He has no idea how close his entire household came to death that same day.

His drunkenness blocks him from hearing the news at all.

The contrast between his ignorance and the danger is jarring.

🎉 Nabal throws a lavish feast

😳 He has no idea what almost happened

🍷 Drunkenness blocks the news

➡️ Ignorance and danger sit side by side

## 🗿 His Heart Died Within Him, And He Became As A Stone

Abigail waits until morning, when Nabal is sober, to tell him everything.

The shock of hearing it appears to trigger something like a stroke.

"Became as a stone" pictures him frozen, unable to move or respond.

His body reacts before anything else happens to him.

🌅 Abigail waits until he is sober

😱 The shock hits him hard

🗿 He becomes frozen like a stone

📖 His own body reacts to the truth

## 🙌 The LORD Smote Nabal, That He Died

Ten days pass between Nabal's collapse and his actual death.

The text credits God directly with ending his life.

This fulfills exactly what Abigail predicted back in verse twenty six.

David never had to lift a hand against him.

📆 Ten days pass before he dies

🙌 God is credited with his death

🎯 This fulfills Abigail's own words

📖 David never had to act himself

# FirstSamuel 25:39-42
# 💍 David Sends For Abigail
---
## 🙌 Blessed Be The LORD, That Hath Pleaded The Cause Of My Reproach

David again gives God the credit, not his own restraint.

"Reproach" refers to the insult Nabal threw at him earlier.

God settled the score in a way David never had to.

This becomes the pattern David keeps returning to through the whole chapter.

🙌 David credits God again

😤 Reproach means the earlier insult

⚖️ God settled it, not David

➡️ This pattern repeats through the chapter

## 💍 David Sent And Communed With Abigail, To Take Her To Wife

David moves quickly to make Abigail his wife after Nabal's death.

Marriages in this culture were often arranged through messengers.

This also secured Abigail's wealth and household under David's protection.

It was both a personal and a practical decision.

💍 David proposes through messengers

📜 That was normal for the culture

💰 It also secured her household

➡️ Both love and practicality played a part

## 🧺 A Servant To Wash The Feet Of The Servants Of My Lord

Washing feet was one of the lowest tasks a servant could perform.

Abigail offers to do work far beneath her actual status.

This mirrors the same humility she showed earlier before David in the wilderness.

Her character stays consistent from crisis to celebration.

🧺 Foot washing was a low, humble task

👑 Abigail already had high status

🔁 This matches her earlier humility

📖 Her character never changes

## 🐴 Rode Upon An Ass, With Five Damsels

Abigail travels with a formal escort of five attendants.

This detail confirms she brings real wealth and standing into the marriage.

She leaves her old household completely behind.

A new chapter of her life begins immediately.

🐴 Abigail travels with a real escort

💰 Five attendants show her wealth

🚪 She leaves her old life behind

➡️ A new chapter begins at once

# FirstSamuel 25:43-44
# 👰 Two Wives, One Taken Away
---
## 💍 David Also Took Ahinoam Of Jezreel

David marries a second wife, Ahinoam, around this same time.

Taking multiple wives was common practice for powerful men in this era.

Scripture records the fact without necessarily endorsing it as ideal.

These marriages will matter later when David's family faces real conflict.

💍 David also marries Ahinoam

👑 Multiple wives were common for powerful men

📖 The text records this without praising it

➡️ These marriages cause conflict later

## 💔 Saul Had Given Michal...To Phalti The Son Of Laish

Michal was David's first wife, given to him earlier for defeating Goliath.

Saul forces her into a second marriage, apparently as an act of spite.

This strips David of a wife while he is out of favor with the king.

The conflict between David and Saul now reaches into David's own family.

💔 Michal was David's first wife

😡 Saul reassigns her out of spite

🏠 David loses her without any say

📖 The family conflict follows the political one
`.trim();

export const FIRST_SAMUEL_TWENTY_FIVE_PERSONAL_SECTIONS = parseFirstSamuelTwentyFiveRawNotes(
  FIRST_SAMUEL_TWENTY_FIVE_RAW_NOTES,
);
