export type FirstSamuelEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelEightRawNotes(rawText: string): FirstSamuelEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 8:${startVerse}` : `1 Samuel 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 1 Samuel 8 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_EIGHT_RAW_NOTES = `# FirstSamuel 8:1-3
# 👴 Samuel's Corrupt Sons
---
## 👴 When Samuel Was Old

Samuel had led Israel for decades as judge and prophet.

Age now forced a question Israel could not avoid.

Every earlier judge simply led until death.

Nobody had planned what would happen when that leader grew old.

This chapter opens right at that uncertain hinge point.

👴 Samuel now leads in old age

⏳ No earlier judge planned a successor

❓ Israel faced real uncertainty ahead

➡️ This chapter opens at that hinge point

## ⚖️ Made His Sons Judges Over Israel

Samuel appoints his own sons Joel and Abiah as judges.

God never told Samuel to do this.

Every earlier judge in the book of Judges was raised up directly by God.

Samuel instead treats the office like something a father can simply hand down.

That choice sets up the failure the rest of the chapter describes.

⚖️ Samuel appoints his own sons

🙅 God never commanded this move

📜 Earlier judges were raised up by God

📖 Samuel treated the office like inheritance

## 📛 The Name Of His Firstborn Was Joel

The name Joel means the LORD is God.

Abiah, the second son's name, means my father is the LORD.

Both names sound like faithful, godly households.

Names in this culture were meant to declare truth about a family's faith.

Verse three will show how far the sons drifted from what their own names claimed.

📛 Joel's name means the LORD is God

🗣️ Abiah means my father is the LORD

🙏 Both names sound deeply faithful

📖 The sons betrayed what their names claimed

## 📍 Judges In Beersheba

Beersheba sat at the southern edge of Israel's territory.

Samuel himself judged from Ramah in the center of the land.

Placing his sons at a distant outpost meant little direct oversight.

Corruption often grows fastest exactly where supervision is weakest.

📍 Beersheba sat at Israel's southern edge

🏠 Samuel judged from Ramah instead

👀 Distance meant little real oversight

📖 Corruption grows where oversight is weak

## 💰 Turned Aside After Lucre

Lucre is an old word for money gained dishonestly.

The sons did not simply enjoy their position.

They chased personal profit at the expense of justice.

This is the first clear sign that Samuel's own household has failed.

💰 Lucre means dishonestly gained money

🎯 The sons chased personal profit

⚖️ Justice suffered for their gain

📖 Samuel's own household now failed him

## 🤝 Took Bribes, And Perverted Judgment

Bribes meant a judge's ruling could be bought.

Perverted judgment means a fair ruling gets twisted into an unfair one.

This was the exact opposite of the justice Samuel had modeled for decades.

Israel's elders are about to react to this failure directly.

🤝 Bribes meant justice was for sale

⚖️ Perverted judgment means twisted rulings

🙅 The opposite of Samuel's own example

➡️ Israel's elders respond to this next

# FirstSamuel 8:4-9
# 👥 Israel Demands A King
---
## 👥 Then All The Elders Of Israel Gathered Themselves Together

Elders were the recognized leaders of each tribe and town.

This was not a mob or a handful of angry men.

The entire national leadership came together with one shared complaint.

A request this organized carried real political weight.

👥 Elders were Israel's recognized leaders

🚫 This was not a random mob

🏛️ The whole nation's leadership united

📖 An organized request carried real weight

## 🏠 Came To Samuel Unto Ramah

Ramah was Samuel's hometown and the base of his ministry.

The elders traveled there to confront him directly instead of sending a message.

A face to face demand was harder to brush aside.

This was a deliberate, formal appeal, not a casual complaint.

🏠 Ramah was Samuel's home base

🚶 The elders traveled there in person

🗣️ A direct appeal was harder to ignore

📖 This was a formal, deliberate request

## 👴 Thou Art Old

The elders open with Samuel's own age, stated bluntly.

This was not cruelty so much as urgency.

They genuinely feared what came after Samuel was gone.

Their fear was real even though their solution was wrong.

👴 They name Samuel's age bluntly

⏳ Real urgency, not simple cruelty

😟 They feared what came after him

➡️ Real fear led to the wrong solution

## 👀 Thy Sons Walk Not In Thy Ways

The elders point straight at the corruption from verse three.

Samuel cannot deny it since he already knows it is true.

Their complaint is accurate even though their proposed fix is not.

A true diagnosis does not guarantee a wise solution.

👀 They point to the sons' corruption

✅ Samuel cannot deny the charge

🎯 A true complaint, not a lie

📖 True problems can still get the wrong fix

## 👑 Make Us A King To Judge Us Like All The Nations

This is the real request underneath everything else.

Israel was meant to be different from surrounding nations, ruled directly by God.

Wanting to look like all the nations meant trading that difference away.

This request is not really about Samuel's sons at all.

👑 The real request is a king

🌍 Israel wanted to match other nations

🙅 That meant giving up its difference

📖 The real issue was never the sons

## 😔 The Thing Displeased Samuel

Samuel takes the request personally at first.

Years of faithful service seem to be getting rejected.

His own reaction is honest, not sanitized for the reader.

Scripture does not hide a leader's hurt feelings here.

😔 Samuel takes the request personally

😞 Years of service feel dismissed

🙈 The Bible does not hide his hurt

📖 Honest emotion is recorded plainly

## 🙏 Samuel Prayed Unto The LORD

Instead of arguing back, Samuel takes his hurt straight to God.

That single choice separates him from many leaders in this book.

Prayer becomes the place where he processes disappointment.

This is the example the rest of Samuel's life keeps returning to.

🙏 Samuel brings his hurt to God

🚫 He does not argue with the elders

🕊️ Prayer becomes his response to pain

📖 A pattern he keeps for life

## 🔄 They Have Not Rejected Thee, But They Have Rejected Me

God reframes the whole moment for Samuel.

The people's complaint sounds personal, but it is not really about Samuel.

Wanting a human king instead of God's direct rule is the deeper rejection.

This line quietly reassures Samuel that God saw the situation clearly all along.

🔄 God reframes what is really happening

👑 The rejection targets God, not Samuel

😌 Samuel receives real reassurance here

📖 God saw the situation clearly all along

## 👑 That I Should Not Reign Over Them

Israel had been ruled directly by God since the exodus from Egypt.

Judges like Samuel spoke for God, but they were never kings themselves.

Asking for a king meant asking to trade that arrangement away.

This is the first time Israel formally rejects that structure.

👑 God had reigned over Israel directly

🏛️ Judges spoke for God, not as kings

🔄 A king would replace that structure

📖 Israel formally rejects it here

## ✅ Hearken Unto The Voice Of The People

God tells Samuel to give the people what they are asking for.

This is not approval so much as permission.

God sometimes allows people to choose a path He does not prefer.

Free choice, even a flawed one, is respected here.

✅ God permits the people's request

🙅 Permission is not the same as approval

🧭 God respects real human choice

📖 Even flawed choices get respected here

## 📢 Protest Solemnly Unto Them

To protest here means to warn formally, not to object.

Samuel must lay out exactly what a king would cost them.

God wants Israel to choose with full information, not blind hope.

Nobody will be able to say later that they were not warned.

📢 Protest here means a formal warning

📋 Samuel must explain the real cost

💡 God wants an informed choice

📖 Nobody can claim they were not warned

## 📖 Shew Them The Manner Of The King

Shew is the old spelling of show.

Samuel is told to describe exactly how a king will govern.

That description becomes the long warning covered in the verses just ahead.

This sets up the most detailed part of the whole chapter.

📖 Shew is the old word for show

📋 Samuel must describe a king's rule

⚠️ A long warning follows next

➡️ This sets up the chapter's core section

# FirstSamuel 8:10-13
# ⚔️ The King Will Take Your Sons
---
## 🗣️ Told All The Words Of The LORD

Samuel repeats God's warning without softening any part of it.

He had every reason to shape the message to protect his own position.

Instead he delivers it exactly as God gave it.

Faithful obedience meant telling people what they did not want to hear.

🗣️ Samuel repeats God's warning exactly

🚫 He does not soften the message

✅ Full obedience over self protection

📖 Truth mattered more than popularity

## ⚠️ This Will Be The Manner Of The King

Samuel opens with a clear warning label.

Everything that follows describes real cost, not royal glory.

The list reads like a legal contract nobody has actually signed yet.

Israel is being shown the fine print before it is too late.

⚠️ Samuel opens with a warning label

📜 A list of real costs follows

📋 It reads like an unsigned contract

📖 Israel sees the fine print early

## 👦 He Will Take Your Sons, And Appoint Them For Himself

Every family's sons become the king's personal property in effect.

Fathers lose the ability to decide their own sons' futures.

This begins a long list of things a king simply takes.

Kingship here is described as taking, not giving.

👦 Sons become the king's property

🚫 Fathers lose control over their sons

📜 The first item in a long list

📖 Kingship here means taking, not giving

## 🐎 For His Chariots, And To Be His Horsemen

Chariots and cavalry were the most expensive parts of an ancient army.

Common Israelite sons would be pulled from farms and homes to staff them.

This created a permanent military class serving the king alone.

Regular families paid that cost with their own children.

🐎 Chariots and cavalry cost the most

🌾 Sons were pulled from ordinary farms

⚔️ A permanent royal military class forms

📖 Families paid this cost directly

## 🏃 Some Shall Run Before His Chariots

Ancient kings used runners to clear crowds and announce their arrival.

It was a visible, public display of royal status.

These runners were regular sons, drafted purely for appearance.

Even public spectacle would come out of Israel's own families.

🏃 Runners cleared crowds for the king

👑 It displayed pure royal status

😔 Ordinary sons were drafted for show

📖 Spectacle also came from Israel's families

## 🎖️ Captains Over Thousands, And Captains Over Fifties

This describes a full military chain of command.

Some sons rise to command positions, but only under the king.

Even those honors keep power flowing toward the throne, not the family.

The structure looks impressive, but every layer answers upward.

🎖️ A full military chain forms

📈 Some sons gain rank under the king

🔝 Power still flows toward the throne

📖 Every layer of it answers upward

## 🌾 To Ear His Ground, And To Reap His Harvest

Ear is an old word meaning to plow.

Sons who once worked their own family's land would plow the king's instead.

Farming labor shifts from family survival to royal supply.

This is forced labor dressed up as royal service.

🌾 Ear is the old word for plow

🚜 Sons plow the king's land instead

📦 Labor shifts to supplying the throne

📖 This is forced labor, not honor

## 🔨 To Make His Instruments Of War, And Instruments Of His Chariots

Skilled craftsmen get pulled into full time weapon production.

Their trade no longer serves their own village or family.

A king's ongoing wars require a constant supply of equipment.

Ordinary skill becomes permanent conscripted labor.

🔨 Craftsmen build weapons full time

🏘️ Their skill no longer serves their village

⚔️ Constant wars need constant supply

📖 Skill becomes forced, permanent labor

## 🌸 Your Daughters To Be Confectionaries, And To Be Cooks, And To Be Bakers

Confectionaries here means perfume makers, not candy makers.

The king's household required a full domestic staff to run smoothly.

Daughters, like sons, get pulled directly into that staff.

No family member, son or daughter, is left outside the king's reach.

🌸 Confectionaries means perfume makers here

🏰 The palace needed a full staff

👧 Daughters are pulled in too

📖 No family member stays outside his reach

# FirstSamuel 8:14-18
# 🌾 What The King Will Take
---
## 🌾 He Will Take Your Fields, And Your Vineyards, And Your Oliveyards

Land was the core of a family's long term wealth in Israel.

Fields, vineyards, and olive orchards represented generations of inherited labor.

A king could simply seize any of it for his own use.

This threatened the very inheritance God had promised each family at the conquest.

🌾 Fields meant generations of family wealth

🍇 Vineyards and olive orchards included too

👑 A king could seize any of it

📖 This threatened God's promised inheritance

## 🎯 Even The Best Of Them

The king does not take leftover or damaged land.

He takes the most valuable property first.

This detail shows the seizure was not incidental or rare.

It was deliberate, and it targeted a family's most valuable asset.

🎯 The king takes the best land

🚫 Not leftovers, but prime property

📋 This was deliberate, not incidental

📖 Families lose their most valuable asset

## 🔄 Give Them To His Servants

Seized land does not disappear, it simply changes hands.

It gets redistributed to whoever serves the king closely.

This describes a patronage system built on royal favor.

Loyalty to the throne now determines who prospers.

🔄 Seized land changes hands, not vanishes

🤝 It rewards those who serve the king

👑 A patronage system built on favor

📖 Royal loyalty now decides who prospers

## 🔟 The Tenth Of Your Seed, And Of Your Vineyards

A tenth, or tithe, was already owed to God under the law.

Now a king demands his own tenth on top of that.

Israel would effectively be paying two tithes instead of one.

The text lets that math speak for itself.

🔟 A tenth was already owed to God

👑 The king adds his own tenth

➕ Israel would pay two tithes total

📖 The math is left to speak plainly

## 🧑‍🤝‍🧑 Your Menservants, And Your Maidservants

Even household servants, already serving one family, get reassigned to the king.

The chapter says plainly that he will put them to his own work.

Nobody's labor stays fully under their own family's control.

The king's demand for workers reaches into every level of society.

🧑‍🤝‍🧑 Household servants get reassigned to the king

🚫 No labor stays fully private

📊 The demand reaches every social level

📖 No household is too small to notice

## 💪 Your Goodliest Young Men, And Your Asses

Goodliest means the strongest and most capable.

The king takes Israel's best workers, not a random sample.

Even work animals like donkeys are seized for royal use.

The best of both human labor and livestock now belongs to the throne.

💪 Goodliest means the strongest and best

🎯 The king takes the best workers

🫏 Even donkeys get seized for his use

📖 The best of everything now serves him

## 📉 The Tenth Of Your Sheep, And Ye Shall Be His Servants

The list of what the king takes finally reaches its low point.

After land, labor, and livestock, Israel itself becomes described as servants.

That word is jarring for a people God had personally freed from slavery in Egypt.

A king was supposed to lead them, not replace one master with another.

📉 The king's list reaches its low point

⛓️ Israel itself is called servants

😢 That word recalls slavery in Egypt

📖 One master would simply replace another

## 😭 Ye Shall Cry Out In That Day

Samuel warns that regret is coming, not maybe but certainly.

Israel will eventually feel the true weight of this decision.

That cry will come after the choice, not before it.

Warnings given now will be remembered painfully later.

😭 Regret is certain, not just possible

⏳ The weight comes after the choice

🗣️ A future cry is predicted here

📖 This warning will be remembered later

## 🚫 The LORD Will Not Hear You In That Day

This is the most severe line in Samuel's entire warning.

God will not rescue Israel from a king it insisted on having.

Some consequences do not get reversed just because they hurt.

Free choices, once made, still have to be lived with.

🚫 God will not rescue them then

⚠️ The most severe line in the warning

🔒 Some consequences cannot simply be reversed

📖 Free choices still must be lived with

# FirstSamuel 8:19-22
# 👑 Israel Gets What It Asked For
---
## 📋 Nevertheless The People Refused To Obey

Every warning in the chapter has just been laid out in full.

The people hear all of it and choose the king anyway.

This is not confusion or ignorance about the cost.

It is a clear, informed decision to accept it.

📋 Every warning was heard in full

👑 The people still choose a king

🚫 This is not confusion or ignorance

📖 It is a fully informed choice

## 🚫 Nay, But We Will Have A King Over Us

The people reject Samuel's entire warning in five words.

Their answer is not a request anymore, it is a demand.

Nothing in the previous verses talks them out of it.

Stubbornness here overrides every specific warning just given.

🚫 They reject the whole warning

📢 Their answer becomes a flat demand

🧱 Nothing talks them out of it

📖 Stubbornness overrides every warning given

## 🌍 That We Also May Be Like All The Nations

This repeats the exact motive named back in verse five.

Israel wants to look just like the nations around it.

God had always called Israel to be different, not identical to its neighbors.

Repeating the phrase shows this desire never really changed through the whole conversation.

🔁 This repeats the motive from verse five

🌍 Israel wants to look like the nations

🙅 God called Israel to be different

📖 The desire never changed through it all

## ⚔️ That Our King May Judge Us, And Go Out Before Us, And Fight Our Battles

The people want a visible commander, not an unseen God.

They want someone who marches at the front of the army.

God had fought Israel's battles directly many times before this request.

A king seemed more certain than trusting a God they could not see.

⚔️ They want a visible battle leader

🚶 Someone to march at the army's front

🙌 God had already fought for them before

📖 A king felt more certain than faith

## 🗣️ Samuel Rehearsed Them In The Ears Of The LORD

Rehearsed means Samuel repeated their exact words back to God.

He does not paraphrase or soften what the people said.

God hears the request in the people's own language, not Samuel's summary.

Samuel stays a faithful messenger despite his own disagreement.

🗣️ Rehearsed means repeated word for word

🚫 Samuel does not soften their words

👂 God hears their exact language

📖 Samuel stays faithful despite his disagreement

## 🔁 Hearken Unto Their Voice, And Make Them A King

God repeats almost the same instruction given back in verse seven.

The final decision remains fully in place, unchanged by anything said since.

God allows the request even though every warning still stands.

Permission was never the same thing as endorsement.

🔁 God repeats His instruction from verse seven

✅ The decision remains unchanged

⚠️ Every warning still stands regardless

📖 Permission was never full endorsement

## 🚶 Go Ye Every Man Unto His City

The tense meeting ends with a simple, ordinary instruction.

Everyone returns home to wait for what comes next.

No king has been chosen yet, only approved in principle.

The next chapter picks up the search for exactly who that king will be.

🚶 The meeting ends with a simple order

🏠 Everyone returns home to wait

❓ No specific king is chosen yet

➡️ The next chapter finds that king
`.trim();

export const FIRST_SAMUEL_EIGHT_PERSONAL_SECTIONS = parseFirstSamuelEightRawNotes(FIRST_SAMUEL_EIGHT_RAW_NOTES);
