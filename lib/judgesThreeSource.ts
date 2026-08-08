export type JudgesThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesThreeRawNotes(rawText: string): JudgesThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 3:${startVerse}` : `Judges 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Judges 3 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_THREE_RAW_NOTES = `# Judges 3:1-6
# 🎯 The Nations Left To Test Israel
---
## ⛰️ Now These Are The Nations Which The Lord Left

"Left" here means God deliberately chose not to remove them.

This is not a failure God is covering up.

Chapter two already explained this decision as a test of loyalty.

The nations still standing in Canaan were part of God's own plan.

⛰️ Left means kept on purpose

📜 Chapter two already explained why

🧪 This decision was a loyalty test

📖 The nations remain by God's design

## ⚔️ To Prove Israel By Them

"Prove" means to test, not to punish.

This word already appeared twice in chapter two describing the same plan.

The test measured whether Israel would obey without a living eyewitness generation.

Testing faith only matters when the outcome is not already forced.

⚔️ Prove means test, not punish

🔁 Chapter two used this same word

👀 The test needed a new generation

📖 Real faith cannot be forced

## 👶 As Many Of Israel As Had Not Known All The Wars Of Canaan

The phrase points to a generation born after the conquest wars ended.

They never personally fought to take the promised land.

Without that experience, they had no firsthand memory of trusting God in battle.

This gap in experience is exactly what chapter two already warned about.

👶 This is the next generation

⚔️ They never fought the conquest wars

🧠 They lacked firsthand battle experience

📖 Chapter two already named this gap

## 🗺️ Five Lords Of The Philistines

The Philistines were organized under five ruling cities, not one king.

Those five cities were Gaza, Ashkelon, Ashdod, Gath, and Ekron.

Each lord ruled his own city independently but could unite for war.

This alliance structure made the Philistines a lasting threat for generations.

🗺️ Five cities, five separate lords

🏛️ Gaza, Ashkelon, Ashdod, Gath, Ekron

🤝 They could unite for war

📖 This threat lasted for generations

## 🌊 The Sidonians

The Sidonians were Phoenician traders from the coastal city of Sidon.

They were skilled sailors and merchants, not primarily a military threat.

Their religion still pulled Israel toward foreign gods like Baal and Ashtoreth.

A trading partner could tempt Israel just as much as an army could.

🌊 Sidonians were Phoenician traders

⛵ Sidon was a coastal city

👑 Their gods still tempted Israel

📖 Trade could corrupt faith too

## 🏔️ From Mount Baalhermon Unto The Entering In Of Hamath

This phrase marks the far northern edge of the promised land.

Mount Hermon sat at Israel's northern border, with Baal worship attached to its name.

Hamath lay even further north, past land Israel never fully controlled.

The description shows how much of the promised territory still sat unconquered.

🏔️ Hermon marked the northern border

👑 Baal's name was attached to it

🗺️ Hamath sat even further north

📖 Much of the land stayed unconquered

## 💍 They Took Their Daughters To Be Their Wives

This intermarriage was directly forbidden back in Deuteronomy seven.

Moses warned that foreign spouses would turn Israel's hearts toward other gods.

The warning was not about ethnicity, it was about protecting worship of the Lord.

Verse six shows Moses was exactly right about where this would lead.

💍 This intermarriage broke Deuteronomy seven

🗣️ Moses warned of this outcome

👑 The danger was about worship

📖 Verse six proves Moses right

## 👑 And Served Their Gods

This is the direct result the marriages were warned to prevent.

Intermarriage was never really the whole problem by itself.

Shared worship inside a shared household is what actually broke the covenant.

One quiet compromise at a wedding grew into open idolatry.

👑 Serving other gods was the real danger

💍 Marriage was the doorway, not the sin

🏠 Shared households meant shared worship

📖 A small compromise became open idolatry

# Judges 3:7-11
# ⚔️ Othniel, The First Deliverer
---
## 🌳 Served Baalim And The Groves

"The groves" refers to Asherah poles, wooden symbols of a Canaanite goddess.

Asherah was often worshipped as a partner alongside Baal.

These poles stood beside altars in the high places used for false worship.

Israel was not just borrowing new gods, they were building shrines to them.

🌳 Groves means Asherah worship poles

👸 Asherah was often paired with Baal

⛰️ These poles stood at high places

📖 Israel built shrines to false gods

## 🔥 The Anger Of The Lord Was Hot Against Israel

This anger follows directly from the covenant Israel agreed to keep.

It is not an unpredictable outburst but a response already promised in Deuteronomy.

The consequence had been named centuries earlier, long before this generation was born.

Nothing that follows in this chapter comes as a surprise to God.

🔥 This anger follows the covenant

📜 Deuteronomy already promised this response

⏳ The warning predates this generation

📖 Nothing here surprises God

## 👤 Chushanrishathaim King Of Mesopotamia

This king's name likely means Cushan of double wickedness.

"Mesopotamia" here refers to Aramnaharaim, the land between two rivers to the north.

A name like this was probably a mocking nickname, not his birth name.

Israel's first oppressor came from far outside the promised land entirely.

👤 His name likely means double wickedness

🌊 Mesopotamia means the land between rivers

😠 The name was likely a mocking title

📖 The first oppressor came from far away

## ⛓️ Served Chushanrishathaim Eight Years

"Served" pictures forced submission, paying tribute under a foreign king's control.

Eight years is the shortest oppression of any cycle in this book.

Even a short bondage was enough to make Israel cry out for rescue.

The length of suffering never determined how real the suffering felt.

⛓️ Served means forced tribute

⏳ Eight years, the shortest bondage yet

😣 A short bondage still hurt deeply

📖 Length did not lessen the suffering

## 🙏 The Children Of Israel Cried Unto The Lord

This cry becomes the fixed turning point in every judges cycle.

Crying out is not the same as full repentance.

It simply means the pain finally became too great to ignore.

This same short cry now sets the whole rescue in motion.

🙏 Crying starts every judges cycle

😣 It shows pain, not always repentance

🔁 This pattern repeats through the book

📖 A cry alone moves God to act

## 🛡️ Othniel The Son Of Kenaz, Caleb's Younger Brother

Othniel already appeared once before in chapter one, capturing a city for Caleb.

He was tied to Caleb's family, either as a brother or a close relative by marriage.

That earlier victory already proved Othniel's courage before this crisis ever began.

Israel's first deliverer was already a known, trusted man.

🛡️ Othniel already appeared in chapter one

🏙️ He earlier captured a city for Caleb

👨‍👩‍👧 He was tied closely to Caleb's family

📖 His courage was already proven

## 💨 The Spirit Of The Lord Came Upon Him

This is the first time this exact phrase appears in the book of Judges.

It describes God's power taking hold of a person for a specific mission.

Every major judge who follows receives this same description at least once.

The victory was never really about Othniel's own military skill.

💨 First use of this phrase in Judges

🎯 It marks power given for a mission

🔁 Later judges repeat this same phrase

📖 The victory belonged to God, not skill

## ✌️ The Land Had Rest Forty Years

Forty years was considered a full, complete generation in this culture.

This exact number appears again later for both Deborah and Gideon's periods of peace.

Rest this long meant an entire generation could grow up without war.

Othniel's own death right after this verse quietly signals the cycle can restart.

✌️ Forty years was one full generation

🔁 This same number returns twice more

👶 A whole generation grew up in peace

📖 Othniel's death opens the door again

# Judges 3:12-14
# 👑 Eglon Oppresses Israel
---
## 🔁 The Children Of Israel Did Evil Again

The word "again" marks the exact start of a second full cycle.

Nothing new happened here that chapter two had not already predicted.

Rest did not lead to lasting faithfulness, it led right back to compromise.

This pattern will now repeat with a longer, harsher oppression.

🔁 Again signals a second full cycle

📜 Chapter two already predicted this pattern

✌️ Peace did not produce lasting faith

📖 A harsher oppression follows this time

## 💪 The Lord Strengthened Eglon The King Of Moab Against Israel

God himself is described as giving Eglon his strength here.

This is not God losing control, it is God actively handing Israel over.

The same picture appeared in chapter two as being sold to an enemy.

Judgment in this book always comes from God's own hand, not chance.

💪 God strengthened Eglon on purpose

✋ This is judgment, not a loss of control

🔁 Chapter two already used this same picture

📖 Judgment always came from God's hand

## 🤝 Gathered Unto Him The Children Of Ammon And Amalek

Eglon did not act alone, he built a coalition of three nations.

Ammon and Amalek were both older enemies Israel had faced since the wilderness years.

A combined force made this oppression far stronger than a single king could manage.

Israel's punishment grew in proportion to how deep their compromise had gone.

🤝 Eglon built a three nation coalition

🏜️ Ammon and Amalek were old wilderness enemies

💪 Together they were far stronger

📖 The punishment matched the compromise

## 🌴 Possessed The City Of Palm Trees

"The city of palm trees" is another name for Jericho.

Jericho had been destroyed under Joshua and placed under a curse against rebuilding.

Enemy forces occupying this site made the disgrace even sharper for Israel.

A city that once fell to God's power now stood in an enemy's hand.

🌴 The city of palm trees is Jericho

🏚️ Jericho fell under Joshua's earlier conquest

⚠️ Rebuilding it was placed under a curse

📖 The old victory site was now lost

## ⏳ Served Eglon The King Of Moab Eighteen Years

Eighteen years is more than double the length of the first oppression.

Each cycle in this book tends to grow longer and heavier than the last.

An entire generation could live under Eglon's control without knowing anything else.

The pattern from chapter two, growing worse each time, is already proving true.

⏳ Eighteen years, more than double before

📈 Cycles tend to grow longer each time

👶 A whole generation knew only bondage

📖 Chapter two's warning proves true again

# Judges 3:15-19
# 🗡️ Ehud's Secret Mission
---
## 👤 Ehud The Son Of Gera, A Benjamite

"Benjamite" means Ehud belonged to the tribe of Benjamin, whose name means son of the right hand.

That name makes it a sharp irony that their deliverer fought with his left.

Benjamin was a small tribe, yet God chose one of its own for this rescue.

God's choice of deliverer rarely matched what anyone would expect.

👤 Ehud came from the tribe of Benjamin

✋ Benjamin's name means son of the right hand

🤏 Benjamin was one of the smaller tribes

📖 God's choice rarely matched expectations

## ✋ A Man Lefthanded

This phrase literally describes a man restricted or bound in his right hand.

Some scholars believe this meant Ehud trained himself to fight primarily with his left.

A lefthanded fighter was unusual enough that guards would not expect an attack from that side.

This small physical detail becomes the key to the entire plan that follows.

✋ Lefthanded describes his right hand as weak

⚔️ He likely trained to fight left handed

👀 Guards would not expect that side

📖 This detail becomes the whole plan

## 💰 Sent A Present Unto Eglon The King Of Moab

This present was tribute money, paid under Israel's forced submission to Moab.

Sending tribute publicly confirmed Israel's status as a defeated, subject people.

Ehud used this shameful yearly duty as cover for his real mission.

The very system that oppressed Israel became the way to end it.

💰 The present was forced tribute money

😔 It confirmed Israel's defeated status

🎭 Ehud used it as cover

📖 The oppression itself enabled the plan

## 🗡️ A Dagger Which Had Two Edges, Of A Cubit Length

A cubit was about eighteen inches, close to the length of a forearm.

A two edged blade could cut on either side without turning the wrist.

A weapon this short could be hidden easily under loose clothing.

Every detail here points toward a hidden, close range attack.

🗡️ A cubit was about eighteen inches

⚔️ Two edges meant cutting either direction

👕 Its short size made it easy to hide

📖 Every detail pointed to a hidden attack

## 🦵 He Did Gird It Under His Raiment Upon His Right Thigh

A righthanded man would normally strap a weapon to his left thigh.

Guards searching a visitor would expect to check that same left side.

Ehud placed his weapon exactly where a search would least expect it.

His lefthandedness turned an ordinary security check into a fatal blind spot.

🦵 Righthanded men usually strapped it left

🔍 Guards would search the expected side

🙈 Ehud hid it on the opposite side

📖 His weakness became a security blind spot

## 🐂 Eglon Was A Very Fat Man

Eglon's name likely means little bull calf, an odd fit for a large ruler.

This detail is not just physical description, it sets up what happens moments later.

His size will directly affect how well his own wound can be hidden.

The text is preparing the reader for what comes right after the strike.

🐂 Eglon's name likely means bull calf

👑 An unusual name for a large king

🩸 His size matters for what happens next

📖 The text is setting up the next scene

## 🤫 I Have A Secret Errand Unto Thee, O King

This claim was technically true, just not in the way Eglon expected.

Kings regularly received private messages, so the request itself raised no suspicion.

Eglon's own curiosity and pride made him dismiss his own guards.

The trap worked because it used the truth to hide the real danger.

🤫 The claim was technically true

👑 Private messages to kings were common

😌 Eglon's pride dismissed his own guards

📖 Truth was used to hide danger

# Judges 3:20-23
# ⚖️ The Assassination Of Eglon
---
## 🏛️ Sitting In A Summer Parlour, Which He Had For Himself Alone

A summer parlour was a cool upper room built to escape the heat.

Eglon being alone there meant no witnesses and no guards nearby.

This private setting was exactly what Ehud's plan needed to succeed.

The king's own comfort became the opportunity for his downfall.

🏛️ A summer parlour was a cool upper room

🚪 Eglon was completely alone inside it

🎯 Privacy was exactly what the plan needed

📖 His comfort opened the door to danger

## 🗣️ I Have A Message From God Unto Thee

Ehud's words were literally true, even though Eglon misunderstood their meaning.

Hearing this, Eglon respectfully rose from his seat as if receiving a royal word.

That single act of respect placed him standing, unguarded, right in front of Ehud.

The king's own courtesy toward what he thought was a divine word killed him.

🗣️ Ehud's claim was literally true

🧍 Eglon rose out of respect

🎯 Standing left him fully exposed

📖 His own courtesy proved fatal

## ✋ Ehud Put Forth His Left Hand

This moment is the payoff for every detail set up earlier in the chapter.

The weapon's placement, Ehud's dismissed escorts, and the private room all lead here.

Nothing in this account happened by accident or lucky timing.

Every earlier detail existed to make this exact moment possible.

✋ This moment pays off earlier details

🗡️ The weapon's hidden placement now matters

🚪 The private, guardless room enabled it

📖 Nothing here happened by accident

## 🩸 The Fat Closed Upon The Blade

This graphic detail confirms Eglon's size, mentioned earlier in the chapter.

The wound closing over the blade left Ehud unable to retrieve his own weapon.

Losing the dagger inside the wound actually helped delay any outside discovery.

Even this small detail worked in favor of Ehud's escape.

🩸 This confirms Eglon's earlier described size

🗡️ Ehud could not pull the blade free

⏳ The lost weapon delayed discovery

📖 Even this detail aided the escape

## 🚪 Shut The Doors Of The Parlour Upon Him, And Locked Them

Locking the room bought Ehud crucial time before anyone would suspect trouble.

A locked door from a private meeting would not immediately alarm the servants.

This calculated move gave Ehud a clear head start to escape unnoticed.

The plan's success depended on this final, careful detail as much as the strike itself.

🚪 Locking the room bought Ehud time

😌 A locked door would not alarm servants

🏃 It gave him a clear head start

📖 The final detail mattered too

# Judges 3:24-30
# 📯 Israel Defeats Moab
---
## 🚻 Surely He Covereth His Feet In His Summer Chamber

"Covereth his feet" is a polite, ancient way of describing relieving oneself.

The servants assumed privacy, not danger, explained the locked door.

This false assumption gave Ehud even more time to get away safely.

A simple, everyday explanation kept anyone from suspecting murder right away.

🚻 Covereth his feet is a polite euphemism

😌 Servants assumed privacy, not danger

⏳ The delay gave Ehud more time

📖 An everyday guess covered a murder

## 😳 They Tarried Till They Were Ashamed

The servants waited an embarrassingly long time before finally acting.

Ancient customs made it deeply awkward to interrupt a king's private moment.

That same social awkwardness became one more gift toward Ehud's escape.

Simple manners, of all things, helped an assassin get away clean.

😳 Servants waited far too long

🙊 Interrupting a king was deeply awkward

🏃 The delay favored Ehud's escape

📖 Ordinary manners aided the getaway

## 🗝️ They Took A Key, And Opened Them

By the time the servants finally acted, far too much time had already passed.

Discovering their dead king, they had no way to know who was responsible.

Ehud was already gone, with no trail left for them to follow.

The delay this chapter has built up now pays off completely.

🗝️ The servants finally forced the door

☠️ They found their king already dead

🏃 Ehud had a total head start

📖 The built up delay paid off fully

## 📯 He Blew A Trumpet In The Mountain Of Ephraim

A trumpet, or shofar, was the standard signal used to call Israel to war.

Blowing it from the hill country of Ephraim rallied fighters quickly across the region.

Ehud did not just escape, he immediately turned his escape into an uprising.

The very same man who struck alone now led an entire army.

📯 A shofar trumpet called Israel to war

🏔️ Ephraim's hill country rallied nearby fighters

🔥 Escape turned instantly into rebellion

📖 One man's strike became a national uprising

## 🌊 Took The Fords Of Jordan Toward Moab

The fords were the only shallow, crossable points along the Jordan River.

Controlling them cut off any retreat for Moabite soldiers trying to flee home.

This tactic trapped the enemy army instead of simply chasing them away.

Ehud's plan again showed careful strategy, not just a lucky single strike.

🌊 Fords were the river's crossable points

🚫 Controlling them blocked Moab's retreat

🪤 The enemy army was trapped, not chased

📖 Careful strategy shaped this whole victory

## ⚔️ There Escaped Not A Man

This total victory matches the total humiliation Moab had inflicted for eighteen years.

The word "lusty" in this passage is an old word for physically strong, not a modern meaning.

Even Moab's strongest, most capable soldiers could not escape this defeat.

The oppressor who once seemed unstoppable was completely broken in a single day.

⚔️ The victory was total and complete

💪 Lusty here means strong, not a modern meaning

🚫 Even Moab's best soldiers could not flee

📖 Eighteen years of bondage ended in one day

## ✌️ The Land Had Rest Fourscore Years

"Fourscore" is an older way of saying eighty.

Eighty years is double the rest that followed Othniel's earlier victory.

This was the longest peace recorded anywhere in the whole book of Judges.

Even the deepest oppression could still be followed by the deepest rest.

✌️ Fourscore is an old word for eighty

📈 This doubled Othniel's earlier rest period

🏆 It was the longest peace in Judges

📖 Deep oppression was followed by deep rest

# Judges 3:31
# 🐂 Shamgar Delivers Israel
---
## 👤 Shamgar The Son Of Anath

"Anath" was also the name of a Canaanite goddess of war, not a common Israelite name.

Many scholars believe this detail suggests Shamgar may not have been a full Israelite by birth.

If true, God used someone entirely outside Israel's own family line to deliver His people.

Rescue in this book was never limited to who looked like the expected hero.

👤 Anath was a Canaanite goddess's name

🌍 Shamgar was likely not fully Israelite

🎯 God still chose him to deliver Israel

📖 Rescue never needed the expected hero

## 🐂 Slew Of The Philistines Six Hundred Men With An Ox Goad

An ox goad was a long wooden pole with a sharpened metal point, used to steer farm animals.

It was a farming tool, not a weapon ever meant for war.

Six hundred men defeated with a farm tool shows this victory came from God's own power.

This single verse quietly points ahead to the ordinary judges still to come in this book.

🐂 An ox goad was a farming tool

⚔️ It was never built for war

💪 The victory clearly came from God's power

📖 This verse points toward the judges ahead
`.trim();

export const JUDGES_THREE_PERSONAL_SECTIONS = parseJudgesThreeRawNotes(JUDGES_THREE_RAW_NOTES);
