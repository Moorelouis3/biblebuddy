export type FirstChroniclesNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesNineteenRawNotes(rawText: string): FirstChroniclesNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 19:${startVerse}` : `1 Chronicles 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Chronicles 19 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_NINETEEN_RAW_NOTES = `# FirstChronicles 19:1-3
# 🕊️ David Reaches Out To Hanun
---
## 💀 Nahash The King Of The Children Of Ammon Died

Nahash had ruled Ammon for years before this chapter opens.

Ammon traced its ancestry back to Lot, Abraham's nephew.

Israel and Ammon had a long, tangled history.

His death opens a new chapter in that old relationship.

💀 Nahash ruled Ammon for years
👪 Ammon descended from Lot
⚔️ Their peoples shared a tense history
📖 His death reopens that old relationship

---

## 👑 His Son Reigned In His Stead

"Stead" is an old word meaning place or position.

Nahash's son takes over the throne the moment his father dies.

That son's name is Hanun, named later in this same verse.

Royal succession in this culture usually passed straight from father to son.

👑 Stead means place or position
🧒 Hanun is Nahash's son
⏳ The throne passes immediately
📖 Succession usually ran father to son

---

## 🕊️ I Will Shew Kindness Unto Hanun

"Shew" is simply the old spelling of show.

David remembers a favor Nahash once did for him.

The text does not say exactly what that favor was.

Many think it happened while David was still running from Saul.

🕊️ Shew means the old spelling of show
🤝 David remembers an old favor
❓ The text does not name the favor
📖 It likely came during David's years fleeing Saul

---

## 📜 Sent Messengers To Comfort Him

Sending messengers after a king's death was a normal diplomatic custom.

It let one kingdom honor another during a time of loss.

David had already used a similar gesture with Tou of Hamath.

Good will between kingdoms was the entire goal here.

📜 Sending messengers was a diplomatic custom
🤝 It honored a kingdom during loss
🔁 Similar to David's gesture with Tou
📖 Good will was the entire goal

---

## 🕵️ Thinkest Thou That David Doth Honour Thy Father

"Thinkest thou" is an old way of asking do you really believe.

The princes doubt that David's comforters came for an honest reason.

Their question is not really a question.

It is an accusation dressed up as a doubt.

🕵️ Thinkest thou means do you really believe
😒 The princes doubt David's motives
❓ Their question hides an accusation
📖 Suspicion can twist kindness into threat

---

## 🔍 To Search, And To Overthrow, And To Spy Out The Land

To spy out means to secretly gather information for an attack.

The princes accuse David's men of scouting Ammon for war.

Nothing in the text actually supports that fear.

An invented fear is about to start a real war.

🔍 Spy out means secret scouting for war
😨 The princes fear an invasion
🚫 Nothing in the text supports it
📖 An invented fear starts a real war

# FirstChronicles 19:4-5
# ✂️ Hanun Humiliates David's Servants
---
## ✂️ Hanun Took David's Servants And Shaved Them

A beard was a mark of dignity and manhood in this culture.

Shaving a man against his will stripped him of that honor in public.

This was not a simple haircut.

Hanun turned a peaceful mission into an act of war.

🧔 A beard marked dignity and manhood
✂️ Shaving against his will stripped that honor
😡 This was a calculated insult
📖 A peaceful mission became an act of war

---

## 👗 Cut Off Their Garments In The Midst Hard By Their Buttocks

This describes cutting the servants' robes off at the waist.

Long robes were a basic sign of modesty and status in that world.

Exposing a man like this in public was meant to shame him deeply.

The two insults together, shaving and exposure, made the humiliation complete.

✂️ Their robes were cut at the waist
🙈 Long robes signaled modesty and status
😳 Exposure was meant to shame them
📖 Two insults combined for total humiliation

---

## 🚪 Sent Them Away

Hanun did not apologize or explain himself.

He simply sent David's humiliated men back across the border.

Mistreating a king's official messengers was widely understood as an act of war.

Hanun had just declared war without ever saying the words.

🚪 Hanun sent them away without apology
⚔️ Mistreating messengers meant declaring war
🤐 He never said the words
📖 War had begun without a formal declaration

---

## 😔 The Men Were Greatly Ashamed

Shame in this culture was not just a private feeling.

A man's beard and clothing were tied to his public honor.

Losing both stripped these men of their standing in front of everyone.

David understood exactly how deep that wound really was.

😔 Shame was a public matter here
🧔 Beard and clothing carried public honor
📉 Losing both cost their standing
📖 David understood the depth of that wound

---

## ⏳ Tarry At Jericho Until Your Beards Be Grown

"Tarry" means to wait or stay in one place for a while.

Jericho was the nearest Israelite city to the border where the men could recover.

David let them stay out of public view until their beards grew back.

That decision shows real compassion for men who could not control what happened to them.

⏳ Tarry means wait for a while
🏙️ Jericho was the nearest safe city
🧔 They waited there until beards regrew
📖 David showed real compassion for their shame

# FirstChronicles 19:6-9
# ⚔️ Ammon Hires Mercenaries
---
## 😖 Made Themselves Odious To David

"Odious" means deeply hated or offensive.

The children of Ammon realize their own insult cannot be undone.

They know David will respond with war, not a shrug.

Fear of what is coming pushes them toward a desperate decision.

😖 Odious means deeply hated
💭 Ammon knows the insult cannot be undone
😨 They expect David to respond with war
📖 Fear pushes them toward a desperate choice

---

## ⚖️ A Thousand Talents Of Silver

A talent was a unit of weight, not a coin.

One talent of silver weighed close to seventy five pounds.

A thousand talents was an enormous fortune for one nation to spend.

That number alone shows how frightened Ammon truly was.

⚖️ A talent was a weight, not a coin
💰 One talent weighed close to seventy five pounds
🏦 A thousand talents was a massive fortune
📖 The number reveals real fear

---

## 🗺️ Out Of Mesopotamia, And Out Of Syriamaachah, And Out Of Zobah

These were separate kingdoms located north and east of Israel.

Mesopotamia lay far beyond the Euphrates river.

Zobah is the same kingdom David already crushed in the chapter before this one.

Ammon is hiring the very enemies David had just defeated.

🗺️ These kingdoms sat north and east of Israel
🏞️ Mesopotamia lay beyond the Euphrates
🔁 Zobah was already defeated in chapter eighteen
📖 Ammon hires David's own recent enemies

---

## 🔢 Thirty And Two Thousand Chariots

"Thirty and two thousand" is the King James way of writing thirty two thousand.

Chariots were the most expensive and elite weapon of the ancient world.

David had kept only a hundred chariots for himself back in chapter eighteen.

This mercenary force dwarfed anything Israel had ever fielded before.

🔢 Thirty and two thousand means thirty two thousand
🐎 Chariots were the elite weapon of war
📉 David kept only a hundred for himself
📖 This force dwarfed Israel's entire army

---

## 🏕️ Pitched Before Medeba

Medeba was a town on the plain east of the Jordan river.

Pitching camp there put the mercenary army on Israel's doorstep.

This same region had already changed hands between Israel and Moab before.

The location alone signaled how serious this threat had become.

🏕️ Medeba sat on the plain east of Jordan
📍 The camp sat near Israel's border
🔁 The region had changed hands before
📖 Location alone signaled real danger

---

## 🛡️ He Sent Joab, And All The Host Of The Mighty Men

The "mighty men" were David's elite corps of warriors, listed by name back in chapter eleven.

David does not send an ordinary army for this fight.

He sends his very best, led by his most trusted general.

The scale of the enemy demanded Israel's full strength in response.

🛡️ Mighty men were David's elite warriors
📜 They were listed by name in chapter eleven
🗡️ Joab leads Israel's best troops
📖 A major threat received Israel's full strength

---

## 🏙️ Put The Battle In Array Before The Gate Of The City

"The city" here almost certainly means Rabbah, the Ammonite capital.

The Ammonites stay close to their own walls for protection.

This positions their soldiers as the second line of defense.

The real threat still comes from the hired mercenaries out in the open field.

🏙️ The city was likely Rabbah, Ammon's capital
🧱 Ammon's troops stayed near their own walls
🛡️ They formed a defensive second line
📖 The mercenaries remained the greater threat

---

## 🧭 The Kings That Were Come Were By Themselves In The Field

The hired kings and their armies camp apart from the Ammonites.

This splits the battlefield into two separate fronts.

Joab now has to fight two forces at the same time.

That split sets up the hard decision Joab makes in the next verse.

🧭 Two enemy forces camp apart
⚔️ The battlefield splits into two fronts
🤔 Joab must fight both at once
📖 That split forces a hard decision

# FirstChronicles 19:10-13
# 🛡️ Joab's Battle Plan
---
## 👀 The Battle Was Set Against Him Before And Behind

Joab sees the danger clearly before the fighting even starts.

The mercenary Syrians wait for him out in the open field.

The Ammonites wait behind him near the city gate.

He is caught between two enemies at the exact same time.

👀 Joab sees the danger immediately
⚔️ Syrians wait ahead in the open field
🏙️ Ammonites wait behind near the gate
📖 He is trapped between two enemies

---

## 🎯 He Chose Out Of All The Choice Of Israel

"The choice of Israel" means the best trained soldiers available.

Joab hand picks his strongest men for this fight.

He sends them against the Syrians, the more dangerous of the two enemies.

A smart commander puts his best strength against the biggest threat.

🎯 Choice of Israel means the best soldiers
🖐️ Joab hand picks his strongest men
⚔️ They face the more dangerous enemy
📖 Best strength goes against the biggest threat

---

## 👤 Delivered Unto The Hand Of Abishai His Brother

Abishai already appeared in chapter eighteen as David's nephew and a trusted commander.

Joab gives him command of the rest of the army.

This second force will face the children of Ammon.

Splitting command between brothers kept both armies under trusted leadership.

👤 Abishai already appeared in chapter eighteen
🗡️ He commands the second army
🎯 His force faces the Ammonites
📖 Trusted brothers led both halves of the army

---

## 🤝 If The Syrians Be Too Strong For Me, Then Thou Shalt Help Me

Joab lays out a simple backup plan before the fighting starts.

Whichever brother struggles first, the other one comes to help.

Neither army has to face defeat completely alone.

This kind of planning shows real trust between the two commanders.

🤝 Joab sets a simple backup plan
🔄 Either brother can call for help
🚫 Neither army faces defeat alone
📖 The plan shows real trust between them

---

## 🗣️ Be Of Good Courage

Speeches like this appear before major battles throughout the Old Testament.

Joshua heard nearly the same words before entering the promised land.

Joab repeats that same pattern here for his own men.

A leader's words right before battle can shape how the whole army fights.

🗣️ This speech pattern repeats through the Old Testament
📜 Joshua heard nearly the same words
🔁 Joab follows that same pattern
📖 Words before battle shape how armies fight

---

## 🏙️ For Our People, And For The Cities Of Our God

Joab is not fighting for personal glory or plunder here.

He frames the coming battle as protecting God's own covenant land.

The cities belong to God before they belong to Israel.

That framing turns a military campaign into an act of faith.

🏙️ The cities belong to God first
🚫 This is not about personal glory
🙏 Joab frames war as an act of faith
📖 Faith reshapes the meaning of the battle

---

## 🙌 Let The LORD Do That Which Is Good In His Sight

Joab ends his speech by handing the outcome to God.

He does not promise victory, only faithful effort.

The rest is left entirely in God's hands.

That kind of trust echoes through many other battle speeches in scripture.

🙌 Joab hands the outcome to God
💪 He promises effort, not victory
🤲 The result rests in God's hands
📖 This trust echoes through scripture

# FirstChronicles 19:14-15
# 🏃 The Syrians And Ammonites Flee
---
## 🗡️ So Joab And The People That Were With Him Drew Nigh Before The Syrians Unto The Battle

Joab personally leads the harder assignment against the stronger enemy.

He does not send his men into the tougher fight without him.

Leading from the front was part of what made Joab respected.

His example set the tone for the whole army.

🗡️ Joab leads the harder fight himself
🚫 He does not send men without him
🏆 Leading from the front earned respect
📖 His example set the army's tone

---

## 🏃 They Fled Before Him

The larger, better funded mercenary army breaks and runs.

Numbers and money did not decide this battle after all.

The same pattern already appeared throughout chapter eighteen.

God's protection, not superior forces, explains the outcome again.

🏃 The larger army breaks and runs
💰 Money could not buy this outcome
🔁 The same pattern repeats from chapter eighteen
📖 God's protection explains the victory again

---

## 😨 When The Children Of Ammon Saw That The Syrians Were Fled

Ammon's courage depended entirely on their hired allies.

The moment the Syrians ran, Ammon's own resolve collapsed too.

Borrowed confidence rarely survives without the ally that supplied it.

Their whole plan falls apart in a single moment.

😨 Ammon's courage depended on their allies
📉 Their resolve collapsed the moment Syria ran
🪢 Borrowed confidence rarely lasts alone
📖 One moment unraveled their whole plan

---

## 🏰 Entered Into The City

The Ammonites retreat behind the walls of their capital city.

A fortified city was much harder to attack than an open field.

This retreat buys them safety, but only for now.

The siege of that very city comes later, in the next chapter.

🏰 Ammon retreats behind their capital's walls
🛡️ Walls offered protection an open field could not
⏳ This safety was only temporary
📖 The city's siege comes in the next chapter

---

## 🏠 Then Joab Came To Jerusalem

Joab does not press the attack any further this time.

He brings the army home instead of laying siege right away.

This war is not finished, only paused.

The next chapter picks the story back up at that same city.

🏠 Joab brings the army home
⏸️ The war pauses instead of ending
🚧 No siege happens yet
📖 The story resumes at this same city

# FirstChronicles 19:16-19
# 🌊 The Syrians Regroup And Make Peace
---
## 📉 Put To The Worse Before Israel

This old phrase simply means decisively defeated.

The Syrian mercenaries realize their first attempt has completely failed.

Instead of giving up, they decide to try again with a bigger army.

Pride and fear can push people to double down instead of stopping.

📉 Put to the worse means decisively beaten
🔁 The Syrians try again instead of quitting
💪 They bring a bigger army this time
📖 Pride can push people to double down

---

## 🏞️ Drew Forth The Syrians That Were Beyond The River

"The river" means the Euphrates, the same river named back in chapter eighteen.

These reinforcements come from deep inside Aramean territory.

This is a far larger mobilization than the first battle.

The whole northern Aramean world is now getting pulled into this war.

🏞️ The river means the Euphrates again
🗺️ Reinforcements travel from deep Aramean territory
📈 This mobilization is far larger
📖 A regional war is now underway

---

## 👑 Shophach The Captain Of The Host Of Hadarezer

Hadarezer already lost badly to David back in chapter eighteen.

He now sends his own general, Shophach, to lead this second attempt.

Hadarezer himself stays out of this fight personally.

His earlier defeat has not stopped him from trying again.

👑 Hadarezer already lost in chapter eighteen
🗡️ Shophach leads his second attempt
🚫 Hadarezer does not fight personally
📖 One defeat did not end his ambition

---

## 🌊 He Gathered All Israel, And Passed Over Jordan

David personally leads the army this time, not Joab alone.

The size of this new threat demands the king himself.

Crossing the Jordan puts Israel's full force on enemy ground.

This response matches the seriousness of a full Aramean mobilization.

👑 David personally leads this time
📊 The threat's size demanded the king
🌊 Crossing Jordan brought the fight to them
📖 A serious threat received a serious response

---

## ⚔️ They Fought With Him

Unlike the earlier battle, the Syrians do not simply run away first.

This time they commit to a direct, full scale fight.

Reinforcements had given them fresh confidence going in.

That confidence is about to be tested against David himself.

⚔️ The Syrians commit to a direct fight
🚫 They do not flee immediately this time
💪 Reinforcements gave them fresh confidence
📖 That confidence meets David himself

---

## 🐎 David Slew Of The Syrians Seven Thousand Men Which Fought In Chariots

Chariot crews were the most skilled and expensive soldiers in any ancient army.

Losing seven thousand of them crippled the Syrian military for years.

This loss hit their most valuable fighting force directly.

The chariot corps that helped hire this whole war is now largely gone.

🐎 Chariot crews were the most skilled soldiers
📉 Seven thousand losses crippled their military
💥 Their most valuable force was hit directly
📖 The war's own engine is now broken

---

## 🚶 And Forty Thousand Footmen

Footmen made up the largest part of any ancient army.

Forty thousand losses is one of the largest numbers recorded in Chronicles.

Combined with the chariot losses, this battle nearly wiped out the Syrian force.

The scale here dwarfs even the earlier victory in chapter eighteen.

🚶 Footmen were the largest part of the army
📊 Forty thousand is a massive recorded loss
💀 The Syrian force was nearly wiped out
📖 This battle dwarfs chapter eighteen's victory

---

## 💀 Killed Shophach The Captain Of The Host

Losing an army is bad.

Losing its commander is worse.

Shophach's death removes the man who organized this entire mobilization.

Killing an enemy general was both a practical and a symbolic blow.

This death effectively ends the whole campaign.

💀 Shophach's death removes the mobilization's leader
⚔️ Killing a general was both practical and symbolic
🏆 This victory hits harder than the first
📖 This death effectively ends the campaign

---

## 🤝 Made Peace With David, And Became His Servants

This is the same vassal pattern already seen with Moab and Edom.

Every nation David defeats in these chapters ends up in this same position.

Peace here means submission, not friendship between equals.

Repetition throughout these chapters shows how far David's kingdom has grown.

🤝 The same pattern repeats from earlier chapters
👑 Every defeated nation ends up here
⚖️ Peace here means submission, not friendship
📖 Repetition shows David's growing kingdom

---

## 💔 Neither Would The Syrians Help The Children Of Ammon Any More

This single line explains the true cost of Ammon's insult back in verse four.

Ammon started this war expecting powerful allies to protect them.

Those same allies now refuse to help them ever again.

Ammon is left completely alone to face what comes next in the story.

💔 This line reveals Ammon's true cost
🤝 Ammon expected allies to protect them
🚫 Those allies now refuse to help
📖 Ammon stands alone for what comes next
`.trim();

export const FIRST_CHRONICLES_NINETEEN_PERSONAL_SECTIONS = parseFirstChroniclesNineteenRawNotes(FIRST_CHRONICLES_NINETEEN_RAW_NOTES);
