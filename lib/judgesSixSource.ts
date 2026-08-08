export type JudgesSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesSixRawNotes(rawText: string): JudgesSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 6:${startVerse}` : `Judges 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Judges 6 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_SIX_RAW_NOTES = `# Judges 6:1-6
# 😢 Seven Years Under Midian
---
## 😔 Did Evil In The Sight Of The LORD

This does not describe one single mistake.

It is the same opening line used for judge after judge in this book.

Israel keeps drifting back into worshiping other nations gods.

That drifting always comes before the hardship in the story.

The trouble that follows is a consequence, not a random disaster.

🔄 Same opening line repeats often

🙏 Israel keeps returning to other gods

⚠️ Sin comes before the suffering

📖 The pattern always starts with Israel's choice

## 🏜️ Delivered Them Into The Hand Of Midian Seven Years

The Midianites were desert raiders from east of the Jordan river.

They were distant relatives of Israel through Abraham and Keturah.

Seven years matches the length of several full harvest cycles.

That means years of crops got destroyed under this oppression.

God allowed this hardship to correct Israel, not to erase them.

🏜️ Midianites were eastern desert raiders

👪 Distantly related to Israel through Abraham

🌾 Seven years spans several harvest cycles

📖 Hardship aimed to correct, not destroy

## 🕳️ The Dens Which Are In The Mountains, And Caves, And Strong Holds

Israel was normally a farming people living in open villages.

Hiding in mountain dens and caves was a new humiliation.

Midianite raids made ordinary farmland too dangerous to live on.

A free nation was reduced to living like fugitives in its own land.

🏘️ Israel normally farmed in open villages

🕳️ Caves became forced hiding places

😨 Danger made farmland unlivable

📖 A free nation reduced to hiding

## 🤝 The Midianites Came Up, And The Amalekites, And The Children Of The East

Midian did not raid Israel alone.

The Amalekites were old enemies from the wilderness years.

The children of the east refers to nomadic desert tribes further out.

Three separate groups joined together against one small nation.

That combined force made the raids far harder to fight off.

🤝 Three separate groups joined together

⚔️ Amalekites were old wilderness enemies

🏕️ Children of the east means desert nomads

📖 Combined enemies made resistance harder

## 🌾 Destroyed The Increase Of The Earth, Till Thou Come Unto Gaza

"Increase" means the crops and produce the land had grown.

The raiders timed their attacks for right after harvest.

Gaza sat far to the southwest, near the coast.

Naming Gaza shows how far these raiders were willing to travel.

This was not a small problem near one village.

🌾 Increase means the harvested crops

📅 Raiders struck right after harvest

🗺️ Gaza marks the raid's far reach

📖 This threat covered the whole land

## 🦗 They Came As Grasshoppers For Multitude

This is a picture, not a claim about actual insects.

A grasshopper swarm can strip a field bare within hours.

The raiders arrived in numbers that felt just as overwhelming.

Nothing could be done once a swarm like that appeared.

🦗 Grasshoppers pictures overwhelming numbers

🌾 A swarm can strip a field fast

😨 The raiders felt just as unstoppable

📖 Overwhelming force left no defense

## 🐫 Their Camels Were Without Number

Camels let raiders travel fast across open desert terrain.

Most armies of this time still fought and moved on foot.

A camel mounted force could strike suddenly and vanish just as fast.

This gave Midian a real military advantage over Israel.

🐫 Camels allowed fast desert travel

🏃 Most armies still moved on foot

💨 Raiders struck suddenly, then vanished

📖 Speed gave Midian the advantage

## 🏕️ For They Came Up With Their Cattle And Their Tents

Bringing cattle and tents meant this was not a quick raid.

These groups moved in and set up camps for a whole season.

The threat was not a single attack but an extended occupation.

Israel faced this danger for weeks at a stretch, not hours.

🏕️ Tents show this was not a quick raid

🐄 Cattle came along with the raiders

📅 They stayed for extended periods

📖 Israel faced an occupation, not one battle

## 😢 Cried Unto The LORD

Crying out to God is the turning point of the whole story.

It happens only after every other option runs out.

This same cry starts the deliverance pattern seen throughout Judges.

God does not wait for perfect repentance before He listens.

He responds the moment His people finally turn back to Him.

😢 Crying out marks the turning point

🔁 This starts the deliverance pattern again

👂 God listens the moment they turn

📖 Turning back matters more than timing

# Judges 6:7-10
# 📯 A Prophet Before A Deliverer
---
## 📯 The LORD Sent A Prophet

Israel expected rescue, not a rebuke.

Before any deliverer shows up, God first sends a message.

This prophet is not named anywhere in the text.

His job is only to explain why the suffering happened at all.

📯 A prophet came before any rescue

❓ Israel expected help, not a rebuke

🤷 This prophet is never named

📖 Truth comes before deliverance begins

## ⛓️ I Brought You Up From Egypt, And Brought You Forth Out Of The House Of Bondage

"House of bondage" is an old way to describe slavery in Egypt.

The prophet opens by reminding Israel exactly who rescued them before.

That rescue is the whole reason Israel owes God their loyalty.

Forgetting the exodus story is what led to this new crisis.

⛓️ House of bondage means slavery in Egypt

🙏 God reminds Israel who saved them first

💔 Forgetting that rescue caused this crisis

📖 Past deliverance demands present loyalty

## 📜 Out Of The Hand Of All That Oppressed You

God lists every enemy He already defeated for Israel.

Egypt was only the first name on that list.

Every later oppressor was also removed by God's hand.

This is evidence laid out before the accusation even starts.

📜 God lists every enemy He defeated

🥇 Egypt was only the first name

🛡️ Every later oppressor was removed too

📖 Evidence comes before the accusation

## 🏞️ Fear Not The Gods Of The Amorites, In Whose Land Ye Dwell

"Amorites" was a common label for the peoples living in Canaan.

God had already commanded Israel not to worship their gods.

Living in someone else's land made that command easy to forget.

The warning here names the exact command Israel broke.

🏞️ Amorites means the peoples of Canaan

🚫 God had already banned their gods

🏠 Living there made the command easy to forget

📖 This names the exact command broken

## ⚖️ Ye Have Not Obeyed My Voice

This is the plain verdict, stated without softening.

No excuse is offered on Israel's behalf here.

The prophet's whole message ends on this one line.

Everything that follows in the chapter grows out of this verdict.

⚖️ The verdict is stated plainly

🚫 No excuse softens the charge

🎯 This ends the prophet's message

📖 Everything after grows from this line

# Judges 6:11-16
# 👼 The Angel Finds Gideon Hiding
---
## 👼 There Came An Angel Of The LORD, And Sat Under An Oak Which Was In Ophrah

"The angel of the LORD" often means God himself appearing.

This title shows up elsewhere for direct appearances of God.

Ophrah was a small town in Gideon's own clan territory.

Oak trees often marked a meeting place in this culture.

This meeting happens in an ordinary field, not a temple.

👼 Angel of the LORD often means God himself

📍 Ophrah sat in Gideon's own territory

🌳 Oaks often marked meeting places

📖 God meets Gideon in an ordinary field

## 🌾 Gideon Threshed Wheat By The Winepress, To Hide It From The Midianites

Threshing was normally done in the open on a hilltop.

Wind on a hilltop blew away the loose chaff from the grain.

A winepress was a walled pit dug into rock, with no wind.

Gideon threshes there anyway, hiding his grain from raiders.

This detail shows exactly how much fear controlled daily life.

🌾 Threshing normally happened on open hills

💨 Wind there separated grain from chaff

🕳️ A winepress was a walled hiding spot

📖 Fear now shaped even daily chores

## 🎭 The LORD Is With Thee, Thou Mighty Man Of Valour

This greeting does not match the man it is spoken to.

Gideon is currently hiding grain out of fear.

"Valour" describes courage and strength in battle.

God speaks to Gideon as who he will become, not who he is yet.

🎭 The greeting does not match the moment

😨 Gideon is currently hiding out of fear

⚔️ Valour means courage in battle

📖 God names Gideon's future, not his past

## ❓ Oh My Lord, If The LORD Be With Us, Why Then Is All This Befallen Us

Gideon answers a blessing with a genuine complaint.

He is not being disrespectful, just painfully honest.

His question is the same one many people still ask during suffering.

Scripture records this doubt without correcting or condemning it here.

❓ Gideon answers a blessing with a complaint

😔 His honesty is not disrespect

🙋 Many still ask this same question

📖 Scripture records doubt without condemning it

## 📚 Where Be All His Miracles Which Our Fathers Told Us Of

Gideon means the exodus story his own family told him growing up.

Parting the sea and manna in the desert were common examples.

He is really asking why that same God feels absent now.

His question is grief over a felt distance from God, not open rebellion.

📚 Gideon means the old exodus stories

🌊 Parting the sea was one story

🍞 Manna in the desert was another

➡️ His question is grief, not rebellion

## 😔 The LORD Hath Forsaken Us

Gideon believes God abandoned Israel first.

The order was actually reversed.

Israel turned to other gods before any hardship came.

God did not leave.

Israel wandered away first instead.

😔 Gideon feels abandoned by God

🔄 The real order is reversed

🙏 Israel wandered away before trouble came

📖 God did not leave His people

## 🎯 Have Not I Sent Thee

God answers Gideon's doubt with a direct command.

"This thy might" points to the strength Gideon already has.

The question at the end is not really a question.

It is God confirming that Gideon is the one being sent.

🎯 God answers doubt with a command

💪 This thy might points to real strength

❓ The closing question is really a statement

📖 Gideon is confirmed as the one sent

## 👪 My Family Is Poor In Manasseh, And I Am The Least In My Father's House

Manasseh was one of the twelve tribes of Israel.

Families within a tribe were ranked by size and wealth.

Gideon claims his family is small and unimportant.

Being "the least" meant he was the lowest ranking son.

God repeatedly chooses people who see themselves as unqualified.

👪 Manasseh was one of Israel's tribes

📉 Gideon calls his family small

🔚 The least meant lowest ranking son

📖 God often chooses the unqualified

## ❓ Wherewith Shall I Save Israel

Gideon does not ask if Israel can be saved.

He asks how he personally could be the one to do it.

The doubt is about his own qualification, not about God's power.

Most callings in scripture start with someone feeling exactly this unqualified.

❓ Gideon doubts his own qualification

💪 He never doubts God's actual power

🙋 This is a common start to callings

📖 Feeling unqualified rarely disqualifies anyone

# Judges 6:17-24
# 🔥 Fire From The Rock
---
## 🙏 Shew Me A Sign That Thou Talkest With Me

Gideon asks for proof before trusting this command.

This is not the same as refusing to believe at all.

Asking for confirmation is different from outright doubt.

God does not rebuke him for asking.

🙏 Gideon asks for proof first

🤝 Asking is not the same as refusing

✅ God does not rebuke the request

📖 Honest questions can still lead to faith

## 🎁 Bring Forth My Present

"Present" here means a gift of food, not a wrapped item.

Offering food to a guest was standard hospitality in this culture.

Gideon treats the visitor with full honor before knowing exactly who he is.

That respect will soon prove to be well placed.

🎁 Present means a gift of food

🤲 Hospitality was standard for any guest

🙇 Gideon honors the visitor fully

➡️ That respect proves well placed

## 🍞 A Kid, And Unleavened Cakes Of An Ephah Of Flour

An ephah was a dry measure close to twenty pounds of flour.

That is a very large amount of bread for one guest.

Gideon prepares far more than a normal meal requires.

The size of the offering matches the size of the moment.

🍞 An ephah was about twenty pounds of flour

🐐 A kid means a young goat

🎉 This was far more than a normal meal

📖 The offering matched the moment's weight

## 🔥 There Rose Up Fire Out Of The Rock

The food is not eaten.

It is consumed by fire instead.

Fire consuming an offering showed divine acceptance elsewhere in scripture.

This is the exact proof Gideon had asked for.

Doubt gets answered with something hard to explain away.

🔥 Fire consumes the offering instead

✅ This was a sign of divine acceptance

🙏 It answers the exact proof requested

📖 Doubt met with undeniable proof

## 😱 Alas, O LORD God! For Because I Have Seen An Angel Of The LORD Face To Face

Many in this culture believed seeing God directly meant death.

Gideon reacts in real terror, not just surprise.

He now realizes exactly who has been speaking with him.

That realization is more frightening than the fire itself.

😱 Seeing God directly was believed deadly

😨 Gideon reacts in real terror

👀 He now knows who spoke to him

📖 That truth frightens more than the fire

## 🕊️ Peace Be Unto Thee

God answers Gideon's terror immediately, without delay.

"Peace" here means more than a calm feeling.

It is a direct promise that Gideon's life is not in danger.

Fear gets addressed before the mission even continues.

🕊️ Peace means more than a calm feeling

✅ God promises Gideon will not die

⏱️ The fear is addressed right away

📖 Comfort comes before the mission continues

## 🪨 Called It Jehovahshalom

"Jehovahshalom" means "the LORD is peace."

Naming an altar was a way to preserve a memory permanently.

Anyone passing this spot later would know exactly what happened here.

Gideon turns his own fear into a lasting testimony.

🪨 Jehovahshalom means the LORD is peace

📍 Naming the altar preserved the memory

👀 Later travelers would know what happened

📖 Fear became a lasting testimony

## 🌳 Brought It Out Unto Him Under The Oak, And Presented It

This is the same oak tree mentioned back in verse eleven.

Gideon returns to the exact spot where the conversation began.

Presenting the meal there ties the whole scene to one place.

The oak becomes the physical setting for Gideon's whole turning point.

🌳 This is the same oak from verse eleven

📍 Gideon returns to the same spot

🍽️ The meal ties back to that place

📖 One location holds his whole turning point

# Judges 6:25-27
# 🪓 Tearing Down Baal's Altar
---
## 🐂 Take Thy Father's Young Bullock, Even The Second Bullock Of Seven Years Old

Two bulls are mentioned here, and only the second one matters yet.

A seven year old bull was fully grown and genuinely valuable.

The number seven likely echoes the seven years of Midianite oppression.

God asks Gideon to sacrifice something costly, not something spare.

🐂 Two bulls are named, only one used yet

💰 A seven year old bull was valuable

🔢 Seven may echo the years of oppression

📖 God asks for something costly

## ⛈️ Throw Down The Altar Of Baal That Thy Father Hath

Baal was the chief storm and fertility god worshiped across Canaan.

This altar belonged to Gideon's own father, Joash.

That detail is genuinely shocking for an Israelite household.

Idol worship had settled quietly into Gideon's own family.

⛈️ Baal was Canaan's chief storm god

🏠 The altar belonged to Gideon's father

😳 That detail is genuinely shocking

📖 Idolatry had settled into his own home

## 🌳 Cut Down The Grove That Is By It

"Grove" here refers to a wooden pole representing the goddess Asherah.

Baal and Asherah were usually worshiped together as a pair.

Tearing down one without the other would have left the job half finished.

God's command removes both false gods at once.

🌳 Grove means a pole for Asherah

👫 Baal and Asherah were worshiped together

🚫 Removing only one left the job unfinished

📖 God's command removes both at once

## 🏗️ Build An Altar Unto The LORD Thy God Upon The Top Of This Rock, In The Ordered Place

Gideon does not just tear something down.

He is told to build something true in its place.

"The ordered place" points to the exact spot where the fire had already appeared.

Removing false worship was never the whole task by itself.

🏗️ Gideon replaces, not just removes

📍 The ordered place was where fire appeared

🔁 Tearing down was only half the task

📖 True worship replaces the false one

## 😨 He Feared His Father's Household, And The Men Of The City, That He Could Not Do It By Day

Gideon obeys, but not without real fear.

He knows this act could get him killed by his own neighbors.

Courage here does not mean feeling no fear at all.

It means obeying anyway, even at night, even afraid.

😨 Gideon obeys while still afraid

⚠️ The act genuinely risked his life

🌙 He acts at night out of caution

📖 Courage means obeying despite the fear

## 👥 Took Ten Men Of His Servants

Gideon called his family the least in Manasseh earlier in this chapter.

Yet he has at least ten servants available to help.

"Least" was likely about social rank, not actual poverty.

Even a modest family in Israel could still hold real resources.

👥 Gideon has ten servants to call on

📉 He called his family the least earlier

🏅 Least likely meant rank, not poverty

📖 Modest families still held real resources

# Judges 6:28-32
# ⚖️ Joash Defends His Son
---
## 🌅 The Men Of The City Arose Early In The Morning

The destroyed altar is discovered at first light.

News like this could not stay hidden for long in a small town.

The whole town gathers around the scene almost immediately.

What Gideon did overnight becomes public within hours.

🌅 The altar is discovered at dawn

🏘️ News spreads fast in a small town

👥 The whole town gathers quickly

📖 A private act becomes public fast

## 🚨 Who Hath Done This Thing?

This was treated as a serious crime, not childish mischief.

Damaging a god's altar was considered an offense against the whole community.

The investigation is treated with real urgency.

Religious loyalty and civic loyalty were the same thing here.

🚨 This was treated as a real crime

🏛️ Religion and community loyalty were linked

🔍 The investigation moves with urgency

📖 An offense against Baal felt communal

## 🗣️ Gideon The Son Of Joash Hath Done This Thing

Someone identifies Gideon quickly, likely one of his own ten servants.

His identity is now public and undeniable.

The private night mission has fully unraveled.

Gideon must now face the consequences openly.

🗣️ Someone identifies Gideon quickly

📢 His identity becomes fully public

🌙 The secret mission has unraveled

📖 Gideon must face this openly now

## ☠️ Bring Out Thy Son, That He May Die

The townsmen demand Gideon's execution from his own father.

This shows how seriously his community valued Baal worship.

Joash is placed in an impossible family situation.

His answer in the next verse will decide his son's life.

☠️ The town demands Gideon's execution

🙇 They demand it from his own father

😬 Joash faces an impossible choice

📖 His answer decides his son's life

## 🔄 Will Ye Plead For Baal? Will Ye Save Him?

Joash does not defend Gideon directly at first.

Instead he turns the question back onto Baal himself.

If Baal is truly a god, he should be able to fight his own battles.

This argument protects Gideon without ever denying his own son's guilt.

🔄 Joash turns the question around

⚡ A real god should defend himself

🛡️ This argument protects Gideon cleverly

📖 Joash never denies his son's guilt

## 📛 He Called Him Jerubbaal, Saying, Let Baal Plead Against Him

"Jerubbaal" means "let Baal contend" or "let Baal plead."

It began as a taunt aimed at a powerless idol.

Gideon carries this new name through the rest of the book of Judges.

A public shaming turned into a lasting mark of honor.

📛 Jerubbaal means let Baal plead

😏 It began as a taunt against Baal

🏷️ Gideon keeps this name going forward

📖 A shaming became a mark of honor

## 🔥 Let Him Be Put To Death Whilst It Is Yet Morning

Joash throws the town's own death threat back at them.

He dares anyone who truly believes in Baal to defend him personally.

The urgency of this very morning matches their own urgency.

Nobody in the crowd steps forward to take up that challenge.

🔥 Joash throws the threat back at them

🙋 He dares believers to defend Baal themselves

⏱️ This morning matches their own urgency

📖 Nobody steps forward to answer the dare

# Judges 6:33-35
# 🎺 Gideon Sounds The Trumpet
---
## 🗺️ Pitched In The Valley Of Jezreel

The valley of Jezreel was wide, fertile, and easy to cross.

Armies from the east often used it as a natural invasion route.

Every enemy from the start of this chapter now gathers there at once.

This is the largest combined threat Israel has faced in this story so far.

🗺️ Jezreel was a wide fertile valley

🚪 It served as a natural invasion route

🤝 Every enemy gathers there together

📖 This is the largest threat yet

## 🕊️ The Spirit Of The LORD Came Upon Gideon

This Hebrew phrase can literally mean the Spirit clothed itself with Gideon.

It describes sudden empowerment for one specific task.

This same pattern repeats for other judges throughout this book.

The fearful man hiding grain earlier is not the one leading now.

🕊️ The Spirit clothed itself with Gideon

⚡ It brought sudden empowerment for this task

🔁 This pattern repeats for other judges

📖 A fearful man now leads boldly

## 📯 He Blew A Trumpet

The trumpet here was a ram's horn, called a shofar.

Its loud blast was the standard way to call troops together quickly.

Anyone hearing it within range understood it as a call to arms.

Gideon has moved from hiding grain to summoning an army.

📯 The trumpet was a ram's horn

📢 Its blast called troops together fast

⚔️ Hearers understood it as a call to arms

📖 Gideon now summons an army

## 👪 He Sent Messengers Throughout All Manasseh

Gideon's own tribe, Manasseh, responds first to his call.

Three more tribes get direct messages sent out to them.

Not every tribe in Israel is mentioned as responding here.

This uneven response quietly sets up the story in the next chapter.

👪 Manasseh responds to Gideon's call first

📨 Three more tribes receive direct messages

❓ Not every tribe answers the call

📖 This sets up the next chapter's test

# Judges 6:36-40
# 🐑 The Sign Of The Fleece
---
## 🙏 If Thou Wilt Save Israel By Mine Hand, As Thou Hast Said

Gideon already received a direct promise earlier in this chapter.

He is not questioning whether God can win this battle.

He is asking for one more personal confirmation before he moves.

Even a Spirit filled leader can still want reassurance.

🙏 Gideon already has God's promise

💪 He is not doubting God's power

✅ He wants personal confirmation first

📖 Even bold leaders can want reassurance

## 🌾 A Fleece Of Wool In The Floor

"The floor" here means the threshing floor, an open flat area.

A fleece is the whole coat of wool freshly cut from a sheep.

Wool naturally holds moisture well, more than bare ground does.

Gideon chooses an object suited to catching or missing dew clearly.

🌾 The floor means the threshing floor

🐑 A fleece is freshly cut wool

💧 Wool naturally holds moisture well

📖 Gideon picks a clear test object

## 💧 If The Dew Be On The Fleece Only, And It Be Dry Upon All The Earth Beside

Dew normally forms evenly across open ground on cool nights.

Gideon asks for dew concentrated on one small object instead.

Everything around that object should stay completely dry.

This request quietly goes against how dew naturally spreads.

💧 Dew normally forms evenly outdoors

🎯 Gideon asks for it on one spot

🏜️ Everything else should stay dry

📖 This request goes against nature itself

## 🙏 Let Not Thine Anger Be Hot Against Me

Gideon asks for a second sign, and he knows it.

He is careful and almost apologetic in how he asks it.

He is fully aware he might be testing God's patience here.

God never rebukes him for asking either time.

🙏 Gideon asks for one more sign

😬 He is careful, almost apologetic

⏳ He knows he may be pushing patience

📖 God never rebukes either request

## 🔄 Let It Now Be Dry Only Upon The Fleece, And Upon All The Ground Let There Be Dew

This second test reverses the first one completely.

Wool naturally holds dew longer than open ground does.

A bone dry fleece is harder to explain than wet ground.

Gideon deliberately makes his own test more difficult, not easier.

🔄 The second test reverses the first

🐑 Wool naturally holds dew longer

🎯 A dry fleece is the harder sign

📖 Gideon makes his own test harder

## ✅ God Did So That Night

God answers the second request exactly as asked.

This closes a chapter full of doubt, fear, and repeated questions.

A man who once hid grain out of fear now leads with confidence.

God's patience through every doubt made that confidence possible.

✅ God answers the second request fully

🔁 The chapter closes a cycle of doubt

💪 Fear has turned into real confidence

📖 God's patience made that change possible
`.trim();

export const JUDGES_SIX_PERSONAL_SECTIONS = parseJudgesSixRawNotes(JUDGES_SIX_RAW_NOTES);
