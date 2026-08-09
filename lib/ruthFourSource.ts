export type RuthFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRuthFourRawNotes(rawText: string): RuthFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RuthFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ruth\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ruth 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ruth\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Ruth\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ruth 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ruth 4:${startVerse}` : `Ruth 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ruth 4 sections, received " + sections.length);
  }

  return sections;
}

const RUTH_FOUR_RAW_NOTES = `# Ruth 4:1-4
# 🚪 Boaz Goes To The Gate
---
## Then Went Boaz Up To The Gate

The gate means the entrance area of an ancient town.

It was the busiest public spot in the whole city.

Elders and townsmen gathered there to settle legal matters.

Boaz picks this exact spot on purpose.

Everything he does next needs real witnesses.

Nothing about this transaction will happen quietly.

🚪 Gate means the city entrance
🏛️ Elders settled legal matters there
👀 Boaz wanted real witnesses present
📖 This transaction happens openly

## The Kinsman Of Whom Boaz Spake Came By

This man stood ahead of Boaz in line to redeem the land.

He is never actually named anywhere in this chapter.

The text calls him only such a one, a placeholder title.

Boaz is named again and again through this same story.

The contrast is easy to miss.

One man is remembered by name.

The other is never named at all.

❓ He had first right to redeem
🚫 The text never names him at all
🔁 Boaz gets named again and again
➡️ Only one man gets remembered by name

## Ho, Such A One

Ho was simply a way of calling someone over, not an insult.

Such a one works like saying hey you over there.

This was normal blunt speech for a public gathering spot.

The exact name still goes unspoken even in the greeting itself.

Boaz keeps the scene informal but very public.

📣 Ho meant hey come over here
🗣️ Such a one means hey you
🏛️ Normal speech for a public gate
📖 Even the greeting hides his name

## Ten Men Of The Elders Of The City

Ten elders made a legal quorum for this kind of business.

A quorum means the minimum number needed to make something official.

Their presence turns this into a real legal proceeding.

Nothing said today can be denied or forgotten later.

🔟 Ten elders formed the legal quorum
⚖️ Quorum means the minimum number required
👥 Their presence makes this official
📖 Boaz builds a case nobody can deny

## Selleth A Parcel Of Land

Selleth is an old way of saying is selling.

Naomi has no husband or sons left to work this ground.

Land like this normally stayed inside one family for generations.

Selling it off was often a last resort, not a first choice.

🌾 Selleth means is selling
👵 Naomi has no one left to farm it
🏠 Land normally stayed within a family
📖 Selling it was a last resort

## Which Was Our Brother Elimelech's

Brother here does not mean an actual sibling relationship.

It reflects the close, tight bond of belonging to the same town and family line.

Elimelech was Naomi's husband, introduced all the way back in chapter one.

This land had sat unused since his family left for Moab years earlier.

🤝 Brother here means close community ties
🕊️ Elimelech was Naomi's husband
📜 Chapter one already introduced him
📖 This land sat unused for years

## Before The Inhabitants, And Before The Elders Of My People

Boaz insists the offer happen in front of everyone at the gate.

A private deal could be denied or twisted later.

A public offer cannot be taken back quietly.

This protects both Naomi and whoever ends up buying the land.

👀 The offer happens in public
🚫 A private deal could get denied
🛡️ A public offer cannot be undone quietly
➡️ This protects both Naomi and the buyer

## If Thou Wilt Redeem It, Redeem It

Boaz says redeem twice in the very same breath.

Redeem means buying back land to keep it inside the family.

This immediate repetition demands a clear yes or no.

Boaz will not accept a vague or delayed answer.

The kinsman answers immediately, I will redeem it.

🔁 Redeem gets said twice at once
🏠 Redeem means buying back family land
📋 This repetition demands a clear answer
📖 The kinsman agrees right away

# Ruth 4:5-6
# 🙅 The Kinsman Steps Aside
---
## Thou Must Buy It Also Of Ruth The Moabitess

Boaz adds a condition the man was not expecting.

Buying the land also means marrying Ruth, the widow tied to it.

This was not a separate, optional choice.

The land and the widow came as one package under this law.

📜 A hidden condition gets added now
🤝 Land and widow came together
🚫 This was not optional
📖 One detail changes his whole answer

## To Raise Up The Name Of The Dead Upon His Inheritance

This custom has a name, a levirate marriage.

A close relative marries the widow to continue the dead man's family line.

Any son born would legally carry the dead husband's name and inheritance.

The land was never meant to just vanish from that family.

👶 A close relative marries the widow
🏠 A son continues the dead man's name
🌾 This kept land inside the family
📖 The law kept a family's name alive

## Lest I Mar Mine Own Inheritance

Mar means to damage or ruin something valuable.

Buying this land and marrying Ruth would cost him money now.

Any son from that marriage would inherit through Mahlon's name, not his own.

He would be spending his own estate to build someone else's family line.

That risk was too costly for him to accept.

💔 Mar means to damage or ruin
💰 The deal would cost him now
👶 A son would inherit through Mahlon
📖 He judged the risk too costly

## Redeem Thou My Right To Thyself

The man formally passes his right to redeem over to Boaz.

This was not a private handshake.

The elders and everyone else in the gate hear it clearly.

Boaz now has a legal, public path to move forward.

🤲 He passes his right to Boaz
👥 The whole gate hears it clearly
✅ This makes it fully legal
📖 Boaz can now move forward

# Ruth 4:7-8
# 👞 The Custom Of The Shoe
---
## The Manner In Former Time In Israel

The narrator pauses the story to explain an old custom.

By the time this book was written, this custom had already faded from use.

Without this explanation, later readers would not understand what happens next.

The Bible sometimes stops to explain its own history like this.

⏸️ The narrator pauses to explain
📜 The custom had already faded
❓ Readers needed this background
📖 Scripture sometimes explains its own history

## A Man Plucked Off His Shoe, And Gave It To His Neighbour

Removing a shoe and handing it over sealed a legal transfer.

It worked the same way a signature seals a contract today.

Testimony here means legal proof that everyone present could later confirm.

Nobody needed paperwork when a whole town watched it happen.

The shoe itself became the evidence of the deal.

👞 A shoe sealed the transfer
📝 It worked like signing a contract
👀 The whole town watched it happen
📖 The shoe itself became the evidence

## So He Drew Off His Shoe

The kinsman performs the custom just described a moment earlier.

His own shoe becomes the physical sign of giving up his right.

From this point forward, the deal is done in the eyes of the town.

Boaz now legally stands in his place.

👞 He performs the shoe custom himself
✋ His shoe marks giving up his right
✅ The deal is now done
📖 Boaz legally stands in his place

# Ruth 4:9-12
# 📢 Boaz Declares His Purchase
---
## Ye Are Witnesses This Day

Boaz repeats this phrase to lock in the legal moment.

Witnesses here means people who could later confirm the transaction happened.

He says it now and will say it again in verse ten.

This kind of doubling made the moment impossible to dispute later.

👥 Witnesses could confirm this later
🔁 Boaz repeats the phrase on purpose
🔒 Repetition locked the moment in
📖 Nobody could dispute it afterward

## All That Was Elimelech's, And All That Was Chilion's And Mahlon's

Three men from one family had already died before this chapter began.

Elimelech was Naomi's husband, and Chilion and Mahlon were their two sons.

Mahlon was Ruth's husband, first introduced back in chapter one.

Boaz is buying back the estate of an entire lost family line.

👨‍👩‍👦 Elimelech, Chilion, and Mahlon all died
👰 Mahlon was Ruth's own husband
🏠 Boaz buys the whole family estate
📖 One purchase restores three men's legacy

## Ruth The Moabitess, The Wife Of Mahlon, Have I Purchased To Be My Wife

Boaz names Ruth specifically in front of the whole town.

He calls her Mahlon's wife to make the legal connection clear.

He purchased her as part of this whole transaction, not as an afterthought.

This makes their marriage a matter of public legal record.

📢 Boaz names Ruth publicly
🔗 He names Mahlon to make it clear
💍 Their marriage becomes part of the record
📖 Nothing about this stays private

## That The Name Of The Dead Be Not Cut Off From Among His Brethren

This restates the whole purpose of the levirate custom explained earlier.

A dead man's name and land could otherwise disappear from Israel's memory.

Boaz makes sure Mahlon's line and inheritance continue through this marriage.

The purpose was never romance alone, it was preserving a family's future.

🌳 A dead man's line could vanish
🛡️ Boaz protects Mahlon's name and land
👶 Their marriage continues that family line
📖 This preserves a family's future

## Like Rachel And Like Leah, Which Two Did Build The House Of Israel

The whole town blesses Ruth by comparing her to Israel's two founding mothers.

Rachel and Leah were Jacob's wives.

Together their children became the twelve tribes of Israel.

This is a remarkable blessing for a woman from Moab.

The town treats Ruth as if she already belongs fully to Israel's story.

👪 Rachel and Leah founded Israel's tribes
🌍 Ruth was a woman from Moab
🙌 The blessing welcomes her fully
➡️ Ruth already belongs to Israel's story

## Do Thou Worthily In Ephratah, And Be Famous In Bethlehem

Ephratah is an older name closely tied to the town of Bethlehem.

The blessing wishes Boaz a life of honor and a lasting reputation.

Worthily means living in a way people respect and remember.

Small town blessings like this one can still echo for generations.

📍 Ephratah is tied to Bethlehem
🌟 Worthily means living honorably
🗣️ The blessing wishes lasting respect
📖 A small blessing can echo for generations

## Let Thy House Be Like The House Of Pharez, Whom Tamar Bare Unto Judah

Pharez was born generations earlier through a very messy family story in Genesis.

Tamar disguised herself to secure a child after her husband's family failed her.

That difficult story still produced Pharez, an ancestor of great honor by now.

The elders bless Boaz to have a family line just as significant.

God had already shown He can bring good out of a broken situation.

👶 Pharez came from a messy family story
👗 Tamar disguised herself to secure an heir
🌳 Pharez became an honored ancestor
📖 God brings good from broken situations

# Ruth 4:13-17
# 👶 A Son Is Born
---
## So Boaz Took Ruth, And She Was His Wife

The public legal process from the gate finally becomes a real marriage.

Every witness, blessing, and legal step led directly to this moment.

Ruth moves from being a poor widow to Boaz's honored wife.

Her whole story changes with this one short sentence.

💍 The marriage is now real
📜 Every legal step led here
👰 Ruth becomes Boaz's honored wife
📖 Her story changes in one line

## The LORD Gave Her Conception

Ruth had been married for about ten years back in Moab without children.

That detail was mentioned quietly back in chapter one.

This time the text credits God directly for the pregnancy.

The years of waiting make this moment even more meaningful.

⏳ Ruth had years without children before
🙏 God gets direct credit here
🎁 Long waiting makes this gift sweeter
📖 God provides in His own timing

## Blessed Be The LORD, Which Hath Not Left Thee This Day Without A Kinsman

The women of Bethlehem speak this blessing directly to Naomi, not to Ruth.

Kinsman here likely points ahead to the baby himself, not only to Boaz.

This same town watched Naomi return empty and grieving back in chapter one.

Now those same neighbors celebrate what God has restored to her.

🗣️ The women bless Naomi directly
👶 Kinsman may point to the baby
🔁 The same town saw her grief before
📖 Neighbors now celebrate her restoration

## A Restorer Of Thy Life, And A Nourisher Of Thine Old Age

Restorer means someone who brings life and hope back after real loss.

Nourisher means someone who provides and cares for her in her later years.

This baby will legally count as a son who can support Naomi.

Her empty years from chapter one now end in real provision.

🌱 Restorer means bringing life back
🍽️ Nourisher means providing lasting care
👶 The baby legally supports Naomi
📖 Empty years end in real provision

## Better To Thee Than Seven Sons

Seven was often used in the Bible to mean a full complete number.

Calling Ruth better than seven sons was the highest praise this culture had.

This praise comes from the women of the town, not from Naomi herself.

A foreign widow now receives the town's highest possible honor.

🔢 Seven often means fully complete
👑 This was the highest praise available
🗣️ The town's women say this
📖 A foreign widow receives the highest honor

## Naomi Took The Child, And Laid It In Her Bosom

Bosom simply means holding the baby close against her chest.

Naomi becomes a caretaker for this child.

She is his grandmother, not his birth mother.

This detail shows Naomi restored to a full family role again.

The empty, bitter woman from chapter one now holds a grandson.

🤱 Bosom means holding him close
👵 Naomi becomes his caretaker
🔁 She was empty, now restored
📖 Naomi now holds a grandson

## There Is A Son Born To Naomi

The neighbor women are the ones who announce this baby's name.

They credit the birth to Naomi, even though Ruth is the actual mother.

This reflects the legal purpose behind the whole marriage arrangement.

The child legally continues Naomi's family line, not just Ruth's.

🗣️ The neighbor women announce the name
👵 They credit the birth to Naomi
⚖️ This matches the marriage's legal purpose
📖 The child continues Naomi's family line

## They Called His Name Obed

Obed means one who serves or worships.

This child grows up to become the grandfather of King David.

Nobody at this small town celebration could have known that yet.

A quiet birth in Bethlehem quietly changes the whole nation's future.

📛 Obed means one who serves
👑 Obed becomes David's grandfather
🤫 Nobody there knew this yet
📖 A quiet birth changes the nation's future

# Ruth 4:18-22
# 👑 The Line To David
---
## Now These Are The Generations Of Pharez

Generations here introduces a genealogy, a list tracing father to son.

Pharez was born back in Genesis, through Judah and Tamar's difficult story.

This same Pharez was just named in the blessing back in verse twelve.

The chapter now shows exactly how that blessing came true.

📜 Generations means a father to son list
👶 Pharez was born in Genesis
🔁 Verse twelve already named him
📖 This shows the blessing coming true

## Pharez Begat Hezron, And Hezron Begat Ram

The list moves quickly through several generations with almost no detail.

These names would mean little to a modern reader on their own.

To the original audience, this was proof of an unbroken family line.

Every name here is a real link in one long chain.

⛓️ The list moves through generations fast
❓ These names mean little today
📜 It proved an unbroken family line
📖 Every name is a real link

## Ram Begat Amminadab, And Amminadab Begat Nahshon

Amminadab and Nahshon both appear earlier in Israel's story during the wilderness years.

Nahshon was a recognized leader of the tribe of Judah under Moses.

This family already carried real standing before Boaz or Ruth were born.

Ruth's marriage joins her into a line already respected in Israel.

🏜️ Both names appear in the wilderness story
👑 Nahshon led the tribe of Judah
🌳 This family already had real standing
➡️ Ruth joins an already respected line

## Nahshon Begat Salmon, And Salmon Begat Boaz

Salmon is Boaz's own father, the last name before the story reaches Boaz.

Some other parts of scripture connect this family to Rahab, a woman from Jericho.

If that connection is right, this family already included another outsider before Ruth.

God repeatedly brings people from outside Israel into this one royal line.

👨‍👦 Salmon was Boaz's own father
🏙️ This family may connect to Rahab
🌍 Outsiders already appear in this line
📖 God keeps including outsiders in this story

## Boaz Begat Obed, And Obed Begat Jesse

This line repeats what the story itself already showed happening.

Boaz and Ruth's son Obed grows up and eventually has a son named Jesse.

Jesse will later become the father of Israel's most famous king.

The small, quiet ending of Ruth's story is only the beginning.

🔁 This repeats what the story showed
👶 Obed grows up and has Jesse
👑 Jesse becomes a future king's father
➡️ A quiet ending is only the beginning

## And Jesse Begat David

This is the whole reason this genealogy was included at all.

David becomes Israel's greatest king, chosen personally by God.

A poor Moabite widow ends up in the direct family line of a king.

Ruth's small, faithful choices in a foreign field led all the way here.

The book of Ruth ends by quietly pointing toward Israel's whole future.

🎯 This is the genealogy's whole point
👑 David becomes Israel's greatest king
🌍 A Moabite widow reaches a king's line
📖 Small faithfulness led to this ending
`.trim();

export const RUTH_FOUR_PERSONAL_SECTIONS = parseRuthFourRawNotes(RUTH_FOUR_RAW_NOTES);
