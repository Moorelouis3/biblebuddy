export type FirstSamuelFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelFifteenRawNotes(rawText: string): FirstSamuelFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 15:${startVerse}` : `1 Samuel 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 1 Samuel 15 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_FIFTEEN_RAW_NOTES = `# FirstSamuel 15:1-3
# ⚔️ The Command Against Amalek
---
## 👑 The LORD Sent Me To Anoint Thee To Be King

Samuel reminds Saul who actually made him king.

It was not Saul's own doing.

The LORD chose him, and Samuel only carried out the anointing.

That reminder comes right before a hard command.

👑 The LORD chose Saul, not Saul himself

🙏 Samuel only carried out the anointing

📌 This reminder comes before a hard command

📖 Kings answer to the one who appointed them

## 👂 Hearken Thou Unto The Voice Of The Words Of The LORD

"Hearken" means to listen closely and then obey what is heard.

It is stronger than simply hearing a sound.

Samuel is asking for total attention before he says one more word.

Everything that goes wrong later in this chapter starts with Saul not hearkening.

👂 Hearken means listen and then obey

🔊 It is more than just hearing sound

⚠️ Samuel asks for full attention first

📖 The chapter's failure begins right here

## 👊 I Remember That Which Amalek Did To Israel

God does not forget a wrong just because time has passed.

Amalek attacked Israel generations earlier, right after they left Egypt.

That earlier attack is recorded back in Exodus seventeen.

This judgment answers a memory, not a sudden impulse.

👊 Amalek attacked Israel long ago

📜 The attack is recorded in Exodus seventeen

⏳ Generations passed before this judgment came

📖 God does not forget old wrongs

## 🗡️ How He Laid Wait For Him In The Way

"Laid wait" means Amalek set an ambush.

They did not fight Israel face to face.

Deuteronomy twenty five says they struck the ones too tired and weak to defend themselves.

It was a cowardly attack on a vulnerable people.

🗡️ Laid wait means they set an ambush

🏃 Israel was not fighting face to face

😔 The weak and weary were struck first

📖 The attack was cowardly, not fair

## 🚫 Utterly Destroy All That They Have

Scholars often call this kind of total destruction "the ban."

It meant everything was devoted to the LORD, not to soldiers.

Nothing could be kept back for personal profit.

The whole point was that no one could gain from it personally.

🚫 The ban means total devotion, no profit

🏆 Soldiers could not keep any spoils

⚖️ This was judgment, not an ordinary war

📖 Obedience meant walking away with nothing

## 👶 Slay Both Man And Woman, Infant And Suckling

Judgment came after generations, not overnight.

The text does not explain every detail behind this command.

Amalek's hostility toward Israel repeats across many generations in the story.

This command closes a long pattern, not a single event.

😞 Judgment came after generations, not overnight

📜 The text does not explain every detail

🔁 Hostility repeated across many generations

📖 God judges a pattern, not one moment

# FirstSamuel 15:4-9
# 🗡️ Saul's Incomplete Obedience
---
## 📋 Numbered Them In Telaim

Numbering troops before a major battle was common in the ancient world.

"Telaim" was a location near the southern edge of Judah.

The name itself likely comes from a word meaning young lambs.

Saul is preparing for a serious campaign, not a small raid.

📋 Numbering troops prepared for a real battle

📍 Telaim sat near southern Judah

🐑 The name likely means young lambs

📖 This was a serious campaign, not a raid

## 🔢 Two Hundred Thousand Footmen, And Ten Thousand Men Of Judah

Judah's soldiers get counted separately from the rest of Israel.

That small detail already hints at a divide inside the nation.

Years later that same divide splits Israel into two kingdoms.

Saul's story is already showing cracks that widen after his reign.

🔢 Judah is counted apart from Israel

⚡ This hints at a coming divide

🏚️ That divide later splits the kingdom

📖 Cracks already show under Saul's reign

## 🕳️ Laid Wait In The Valley

Saul uses the very tactic Amalek used against Israel back in verse two.

He sets his own ambush in the valley.

This is not random strategy.

It is deliberate justice matching the crime.

🕳️ Saul sets his own ambush

🔁 This matches Amalek's tactic from verse two

⚖️ The judgment fits the original crime

📖 Justice here answers ambush with ambush

## 🤝 Said Unto The Kenites, Go, Depart

The Kenites descended from Jethro, Moses' father in law.

They had shown kindness to Israel back during the exodus from Egypt.

Saul warns them to leave before the attack begins.

He protects old friends of Israel from a judgment meant for someone else.

🤝 Kenites descended from Jethro's family

🛡️ They had helped Israel during the exodus

⚠️ Saul warns them before the attack

📖 Old kindness earns real protection here

## 🚶 So The Kenites Departed From Among The Amalekites

Saul carries this part of the plan out exactly.

He does not improvise or skip a step here.

That matters later in the chapter.

Saul is fully capable of precise obedience when he wants to be.

🚶 Saul follows this instruction exactly

🎯 No shortcuts are taken here

🔑 This detail matters later on

📖 Saul can obey precisely when he chooses

## 🗺️ Smote The Amalekites From Havilah Until Thou Comest To Shur

Havilah and Shur mark two far ends of Amalekite territory.

Havilah sat toward Arabia, and Shur sat near the border of Egypt.

Naming both boundaries shows the campaign covered the whole territory.

This was not a partial raid on one town.

🗺️ Havilah and Shur mark two borders

🧭 One end reached toward Arabia

🏜️ The other reached near Egypt

📖 The campaign covered the whole land

## 👑 Took Agag The King Of The Amalekites Alive

"Agag" was likely a royal title used by Amalekite kings.

It worked much like how "Pharaoh" named Egypt's rulers.

Saul was told to destroy the Amalekites completely.

Instead he keeps their king alive.

👑 Agag was likely a royal title

📜 The full command was to destroy them

❌ Saul spares the king instead

📖 The first disobedience starts at the top

## ⚔️ Utterly Destroyed All The People With The Edge Of The Sword

On the surface, this line sounds like full obedience.

Saul does carry out the destruction against the people.

But keeping Agag alive already broke the command.

Partial obedience still counts as disobedience.

⚔️ The people were destroyed as commanded

👀 This looks like obedience at first

🚫 Keeping Agag alive already broke it

📖 Partial obedience is still disobedience

## 🐑 Saul And The People Spared Agag, And The Best Of The Sheep

This verse lists exactly what Saul kept back.

Agag survives, along with the strongest and healthiest animals.

Nothing here was accidental or hard to notice.

Saul made a clear choice to disobey a clear command.

🐑 The best animals were kept alive

👑 Agag also survived the judgment

🎯 Nothing here was an accident

📖 Saul chose to disobey plainly

## 🗑️ That Which Was Vile And Refuse, That They Destroyed Utterly

"Vile" and "refuse" mean weak, sick, or worthless.

Saul destroyed only the animals nobody wanted anyway.

He kept everything valuable for himself and his men.

Obedience that costs nothing is not real obedience at all.

🗑️ Vile and refuse means worthless and weak

💰 Only worthless animals were destroyed

🙌 Saul kept everything valuable instead

📖 Costless obedience is not real obedience

# FirstSamuel 15:10-12
# 😢 The Lord Regrets Saul
---
## 📜 Then Came The Word Of The LORD Unto Samuel

This phrase marks the start of a direct message from God.

It shows up often throughout the Old Testament before major turning points.

Whatever Samuel says next is not his own opinion.

It comes straight from God.

📜 This phrase marks a direct message

🔁 It appears before many major turning points

🗣️ Samuel is not sharing his own opinion

📖 What follows comes straight from God

## 😢 It Repenteth Me That I Have Set Up Saul To Be King

"Repenteth" here means deep grief and regret, not that God made an error.

God is not surprised by Saul's choices.

The word describes genuine sorrow over a real relationship gone wrong.

God's grief over Saul is honest and personal.

😢 Repenteth means deep grief, not error

🎯 God was never actually surprised

💔 This is sorrow over a real relationship

📖 God's grief here is honest and personal

## 🔙 For He Is Turned Back From Following Me

"Turned back" is covenant language for walking away from a relationship.

It describes someone who once followed and then stopped.

Saul had not simply made one mistake.

He had drifted into a pattern of going his own way.

🔙 Turned back means walking away

🤝 It describes a broken relationship

🔁 This was a pattern, not one slip

📖 Saul had drifted from following God

## 🌙 It Grieved Samuel And He Cried Unto The LORD All Night

Samuel's grief matches God's own grief from the verse right before this one.

He does not simply report the news and move on.

He spends the whole night in prayer over it.

Samuel feels the real weight of what has happened to Saul.

🌙 Samuel prays through the entire night

🪞 His grief mirrors God's own grief

💭 He does not move on quickly

📖 Samuel carries the weight of this news

## 🏛️ Saul Came To Carmel, And, Behold, He Set Him Up A Place

This Carmel is a town in Judah, not the famous mountain up north.

"Set him up a place" means Saul built a monument to celebrate himself.

He does this right after failing to fully obey God.

Pride shows up exactly where humility was needed most.

🏛️ This Carmel sits in Judah, not the north

🗿 Saul built a monument to himself

😤 This came right after his failure

📖 Pride appeared where humility was needed

## 🚶 Is Gone About, And Passed On, And Gone Down To Gilgal

Gilgal was a meaningful place for Saul and for Israel.

Saul's kingship had already run into trouble once before there, back in chapter thirteen.

Returning there sets up a second confrontation in the very same location.

The place itself carries weight before Samuel even arrives.

🚶 Saul travels on toward Gilgal

📍 Gilgal already held past trouble for Saul

🔁 A second confrontation happens there

📖 The location carries its own weight

# FirstSamuel 15:13-16
# 🐑 The Bleating That Exposes The Lie
---
## 🙏 Blessed Be Thou Of The LORD

Saul greets Samuel with a normal, warm blessing.

It sounds like the greeting of a man with a clear conscience.

The greeting does not match what actually happened in the valley.

Words alone do not prove obedience.

🙏 Saul offers a warm greeting

😌 It sounds like a clear conscience

⚠️ The words do not match reality

📖 Words alone cannot prove obedience

## ✅ I Have Performed The Commandment Of The LORD

Saul states this as plain fact, not as a guess.

He genuinely seems to believe he obeyed fully.

That confidence makes what happens next even more striking.

Self deception can feel just like the real thing.

✅ Saul states this as plain fact

😳 He seems to believe it himself

😮 That makes the next moment striking

📖 Self deception can feel like truth

## 🐑 What Meaneth Then This Bleating Of The Sheep In Mine Ears

Samuel does not argue with Saul's words.

He simply points to a sound Saul cannot explain away.

"Bleating" is the sound sheep make.

Evidence Saul cannot control now speaks louder than his claim.

🐑 Bleating means the sound sheep make

👂 Samuel points to sound, not argument

🚫 Saul cannot explain the sound away

📖 Evidence spoke louder than Saul's claim

## 🐂 And The Lowing Of The Oxen Which I Hear

"Lowing" is the deep sound cattle make.

Samuel names a second sound on top of the first.

Sheep and oxen were both supposed to be destroyed completely.

Two different animals confirm the same broken command.

🐂 Lowing means the sound cattle make

🔢 A second sound joins the first

🚫 Both animals were meant to be destroyed

📖 Two sounds confirm one broken command

## 👉 They Have Brought Them From The Amalekites

Saul does not deny that the animals exist.

He shifts blame immediately to "the people."

This is the first sign that Saul will not simply own his choice.

Blame shifting becomes a pattern through the rest of the chapter.

👉 Saul shifts blame to the people

🙅 He does not simply own it

🔁 This becomes a pattern later on

📖 Blame shifting replaces honest confession

## 🙏 To Sacrifice Unto The LORD Thy God

Saul calls God "thy God," not "my God."

That small word choice creates real distance between Saul and the LORD.

He frames disobedience as an act of worship.

Using God's name does not make a broken command acceptable.

🙏 Thy God creates real distance

📏 A small word reveals a big gap

🎭 Disobedience gets dressed up as worship

📖 God's name cannot cover a broken command

## 🗑️ And The Rest We Have Utterly Destroyed

Saul treats partial destruction as if it counts as full obedience.

He highlights what he did right and skips what he kept.

This is the same selective reporting seen back in verse nine.

A command with one exception is still a broken command.

🗑️ Saul highlights the part he did

🙈 He skips over what he kept

🔁 This matches the pattern from verse nine

📖 One exception still breaks a command

## ✋ Stay, And I Will Tell Thee What The LORD Hath Said To Me This Night

"Stay" is Samuel's way of saying be quiet and listen.

Samuel takes control of the conversation here.

Saul has spoken enough for one meeting.

Now it is time for Saul to only listen.

✋ Stay means be quiet and listen

🎤 Samuel takes control of the talk

🤐 Saul has said enough already

📖 It is time for Saul to listen

# FirstSamuel 15:17-19
# 👑 Samuel's Rebuke
---
## 🔎 When Thou Wast Little In Thine Own Sight

Samuel reminds Saul of who he used to be.

Back in chapters nine and ten, Saul hid among the baggage rather than step forward as king.

He was humble then, maybe even unsure of himself.

That humility is exactly what seems to be missing now.

🔎 Saul once saw himself as small

📦 He once hid among the baggage

😌 Humility marked his early days

📖 That humility seems gone now

## 👑 Wast Thou Not Made The Head Of The Tribes Of Israel

Samuel reminds Saul that kingship was a gift, not an achievement.

Saul did not fight his way to the throne.

God raised him up from nothing.

Forgetting where power came from is often where pride begins.

👑 Kingship was given, not earned

🎁 God raised Saul up from nothing

💭 Saul seems to have forgotten this

📖 Forgetting the source is where pride begins

## 🧭 The LORD Sent Thee On A Journey

Samuel restates the mission in the plainest possible terms.

There was no ambiguity in what Saul was asked to do.

The instructions were clear from the very beginning.

Confusion cannot be Saul's excuse here.

🧭 The mission was stated plainly

📋 The instructions were never unclear

🚫 Confusion is not a real excuse

📖 Saul knew exactly what to do

## ⚖️ Go And Utterly Destroy The Sinners The Amalekites

Samuel calls Amalek "sinners," not just an enemy nation.

The judgment against them was moral, not political.

This was framed as justice, not conquest.

Israel was carrying out judgment, not simply expanding territory.

⚖️ Sinners frames this as justice

🚫 It was not political conquest

🎯 God's judgment targeted real guilt

📖 Israel acted as an instrument, not a conqueror

## ❓ Wherefore Then Didst Thou Not Obey The Voice Of The LORD

This question echoes the very first word of the chapter, "hearken."

Samuel is closing the loop he opened back in verse one.

The whole chapter has been building toward this exact question.

There is no good answer available to Saul.

❓ This question echoes verse one

🔁 Samuel closes the loop he opened

🎯 The chapter built toward this moment

📖 Saul has no good answer left

## 🏃 But Didst Fly Upon The Spoil, And Didst Evil In The Sight Of The LORD

"Fly upon the spoil" pictures someone grabbing plunder fast and eagerly.

It is not a picture of reluctant, careful obedience.

Saul moved quickly toward what benefited him.

Eagerness for gain replaced careful obedience to God.

🏃 Fly upon the spoil means grabbing fast

💰 Saul moved quickly toward benefit

🚫 This was not careful obedience

📖 Eagerness for gain replaced obedience

# FirstSamuel 15:20-23
# 📖 To Obey Is Better Than Sacrifice
---
## 🙋 Yea, I Have Obeyed The Voice Of The LORD

Saul still insists he obeyed, even after Samuel's direct question.

He is not simply mistaken anymore.

He is choosing to argue instead of confess.

Denial has replaced any chance at honesty.

🙋 Saul still insists he obeyed

🚫 This is no longer confusion

🗣️ He argues instead of confessing

📖 Denial replaced any honesty here

## 👑 Have Brought Agag The King Of Amalek

Saul points to Agag's capture as proof of obedience.

Capturing the king was never the actual command.

Saul treats a partial result as though it were the whole task.

Proof of effort is not the same as proof of obedience.

👑 Saul points to Agag as proof

🚫 Capturing him was never the command

🧩 A partial result is treated as complete

📖 Effort is not the same as obedience

## 🐑 The People Took Of The Spoil, To Sacrifice Unto The LORD Thy God In Gilgal

This is the third time in the chapter Saul says "thy God."

The pattern is now impossible to miss.

Blame lands on the people again, just like verses fifteen and twenty one.

Saul keeps repeating the very same excuse.

🔁 This is the third thy God phrase

📏 The pattern is now impossible to miss

👉 Blame lands on the people again

📖 Saul repeats the very same excuse

## ❓ Hath The LORD As Great Delight In Burnt Offerings And Sacrifices, As In Obeying The Voice Of The LORD

Samuel asks a question that answers itself.

Sacrifice was never meant to replace obedience.

Ritual without a willing heart behind it means very little to God.

The question exposes what Saul has been hiding behind.

❓ Samuel's question answers itself

🕊️ Sacrifice never replaces obedience

💔 Ritual without a willing heart means little

📖 The question exposes Saul's excuse

## 📖 Behold, To Obey Is Better Than Sacrifice, And To Hearken Than The Fat Of Rams

This is the most quoted line in the whole chapter.

"Fat of rams" was considered the richest, most costly part of an offering.

Even the best possible sacrifice still ranks below simple obedience.

The most expensive gift cannot buy back a broken command.

📖 This line is the chapter's most quoted

💰 Fat of rams meant the costliest offering

🥇 Even the best offering ranks lower

➡️ No gift buys back a broken command

## 🔮 For Rebellion Is As The Sin Of Witchcraft

Witchcraft, or divination, meant trying to control outcomes apart from trusting God.

Samuel places Saul's rebellion in that same category.

Both replace trust in God with control on someone's own terms.

That comparison would have shocked Saul more than any insult could.

🔮 Witchcraft means controlling outcomes apart from God

⚖️ Samuel places rebellion in that category

🎯 Both replace trust with self control

📖 This comparison would have shocked Saul

## 🗿 And Stubbornness Is As Iniquity And Idolatry

"Stubbornness" means refusing to yield even after being corrected.

Idolatry means giving worship and trust to something other than God.

Samuel says persistent stubbornness functions the very same way.

Refusing to change course becomes its own kind of worship.

🗿 Stubbornness means refusing to yield

🙏 Idolatry means misplaced worship and trust

⚖️ Samuel equates the two here

📖 Refusing to change becomes its own worship

## ⚡ Because Thou Hast Rejected The Word Of The LORD, He Hath Also Rejected Thee From Being King

The sentence uses the same word twice on purpose, "rejected."

Saul rejected God's word first.

God's rejection of Saul simply answers Saul's own choice.

This verse is the hinge the entire book turns on.

⚡ Rejected appears twice on purpose

👉 Saul rejected God's word first

🔁 God's rejection answers Saul's own choice

📖 This verse is the book's hinge

# FirstSamuel 15:24-26
# 😔 Saul Confesses, Too Late
---
## 😔 I Have Sinned For I Have Transgressed The Commandment Of The LORD

Saul finally uses the word "sinned" out loud.

On the surface this sounds like real repentance.

The verse right after this one reveals what is actually driving the confession.

Not every confession comes from a changed heart.

😔 Saul finally says the word sinned

👀 It sounds like real repentance

🔎 The next verse reveals his real motive

📖 Not every confession means a changed heart

## 😨 Because I Feared The People, And Obeyed Their Voice

Saul names his real motive plainly.

He feared what people thought more than he feared disobeying God.

That is the opposite of what a king was supposed to model.

Fear of man had quietly replaced fear of God.

😨 Saul feared people more than God

🙅 That is the opposite of true leadership

🔁 Fear of man replaced fear of God

📖 The real motive is finally named

## 🙏 Now Therefore, I Pray Thee, Pardon My Sin

Saul asks for pardon using formal, careful language.

The request sounds respectful on the surface.

Nothing in it shows any sign that his heart has actually changed.

Polished words are not the same as genuine sorrow.

🙏 Saul asks for pardon formally

🎭 The request sounds respectful on the surface

💭 No real change shows underneath it

📖 Polished words are not genuine sorrow

## 🔄 Turn Again With Me, That I May Worship The LORD

Saul wants Samuel to walk back with him in public.

Worshiping together would make Saul look fully restored to everyone watching.

The request is about appearance as much as it is about worship.

Saul manages how this looks more than he owns what he did.

🔄 Saul wants a public walk back

👀 It would make him look restored

🎭 Appearance matters as much as worship

📖 Saul manages the image, not the guilt

## 🚫 I Will Not Return With Thee

Samuel gives Saul a short, direct answer.

There is no long explanation attached to it.

The time for a private fix has already passed.

Samuel's refusal makes the seriousness of the moment unmistakable.

🚫 Samuel refuses in one short line

⏱️ No lengthy explanation is given

⌛ The moment for a quiet fix is gone

📖 The refusal makes the stakes unmistakable

## 👑 The LORD Hath Rejected Thee From Being King Over Israel

Samuel repeats the exact verdict already given back in verse twenty three.

Repeating it removes any last hope of reversal.

This is not a threat or a warning anymore.

It is a finished decision, stated a second time.

👑 Samuel repeats the same verdict

🔁 Repeating it removes any hope

🚫 This is not a warning anymore

📖 The decision is finished, not threatened

# FirstSamuel 15:27-31
# 👘 The Torn Robe
---
## 🚶 As Samuel Turned About To Go Away

Samuel actually starts walking away this time.

His earlier refusal in verse twenty six was not just words.

Saul reacts physically to stop him.

The next moment happens because Samuel truly meant to leave.

🚶 Samuel begins to walk away

✅ His earlier refusal was not empty

🖐️ Saul reacts physically to stop him

📖 The next scene starts because Samuel meant it

## 👘 He Laid Hold Upon The Skirt Of His Mantle, And It Rent

The "mantle" was an outer robe, and the "skirt" was its edge.

Saul grabs it to stop Samuel from leaving.

The fabric tears in the struggle.

An accident becomes the object lesson for everything that just happened.

👘 Mantle means an outer robe

✋ The skirt is the robe's edge

💥 It tears during the struggle

📖 An accident becomes an object lesson

## 💔 The LORD Hath Rent The Kingdom Of Israel From Thee This Day

Samuel turns the torn cloth into a spoken sign.

The tear in the robe now pictures the tear in Saul's kingdom.

Other prophets later act out the same kind of sign for a different king.

A ruined piece of fabric becomes an unforgettable message.

💔 The torn robe becomes a spoken sign

🖼️ It pictures the torn kingdom

📜 Other prophets later reuse this sign

📖 A small accident carries a huge message

## 🤝 Given It To A Neighbour Of Thine, That Is Better Than Thou

Samuel does not name this "neighbour" yet.

A reader who knows the rest of the story can already guess David.

For Saul in this moment, the news is simply about a stranger.

The next king is already chosen before Saul even leaves this room.

🤝 The neighbour is not named yet

👀 It points ahead toward David

❓ To Saul, it is still a stranger

📖 The next king is already chosen

## 🛡️ The Strength Of Israel Will Not Lie Nor Repent

This "repent" does not carry the same meaning as the one back in verse eleven.

There, it meant deep grief over Saul's choices.

Here it means going back on a spoken word.

God feels real grief, but He does not break His own declared decisions.

🛡️ Repent here means going back on a word

🪞 Verse eleven used repent to mean grief

⚖️ Grief and broken promises are different things

📖 God grieves but never breaks His word

## 🙅 For He Is Not A Man, That He Should Repent

People often go back on their word.

Fear or changed feelings usually explain why.

God does not operate that way.

A decision like this one stands once God has spoken it.

🙅 People go back on their word often

🎯 God does not operate that way

🔒 A spoken decision like this stands

📖 Saul's kingdom will not be restored

## 🙏 Yet Honour Me Now, I Pray Thee, Before The Elders Of My People

Saul's focus stays fixed on how this looks to others.

He does not ask again for the kingdom to be restored.

He asks only to be honored publicly in front of witnesses.

Reputation still matters more to Saul than repentance does.

🙏 Saul asks to be honored publicly

👥 Elders and Israel are his witnesses

🚫 He does not ask for restoration

📖 Reputation still outweighs real repentance

## 🙏 That I May Worship The LORD Thy God

Saul says "thy God" one more time, the fourth time in this chapter.

By now the pattern cannot be missed.

Saul keeps naming God as belonging to someone else, not to himself.

A small phrase reveals how far Saul has actually drifted.

🙏 Thy God appears a fourth time

🔁 The pattern is unmistakable by now

📏 Saul keeps distancing himself from God

📖 A small phrase reveals real drift

## 🚶 So Samuel Turned Again After Saul And Saul Worshipped The LORD

Samuel agrees to walk back with Saul after all.

This is a concession, not a reversal of the verdict.

The kingdom is still torn away, exactly as verse twenty eight said.

Samuel gives Saul this much mercy without changing what was already decided.

🚶 Samuel walks back with Saul

🤲 This is mercy, not a reversal

💔 The kingdom stays torn away

📖 Mercy and consequence exist together here

# FirstSamuel 15:32-35
# ⚔️ Agag Falls, Samuel Mourns
---
## 👑 Bring Ye Hither To Me Agag The King Of The Amalekites

Samuel now finishes the task Saul refused to complete.

He calls for Agag directly.

This was always part of the original command back in verse three.

Someone still has to carry it out, even if it is not the king.

👑 Samuel calls for Agag directly

📜 This was always part of the command

🔁 Saul left this task unfinished

📖 Someone still has to finish it

## 😌 And Agag Came Unto Him Delicately

"Delicately" pictures someone moving carefully, almost hopefully.

Agag has already survived once, so he may believe the danger has passed.

His calm walk shows he does not expect what happens next.

Confidence built on a false hope can be shattered quickly.

😌 Delicately means moving carefully, almost hopefully

🎯 Agag believes danger has already passed

😳 He does not expect what comes next

📖 False hope collapses very quickly

## ⏳ Surely The Bitterness Of Death Is Past

Agag speaks with real relief in his voice.

He assumes his life has been spared for good.

This idiom describes a feeling of danger finally being over.

He could not be more wrong about what is about to happen.

⏳ Agag believes his danger has passed

😅 His words carry real relief

🎭 The idiom describes false safety

📖 He is completely wrong here

## 🗡️ As Thy Sword Hath Made Women Childless, So Shall Thy Mother Be Childless Among Women

Samuel matches Agag's judgment to Agag's own past violence.

Whatever grief Agag caused other families now returns to his own.

This is not random cruelty from Samuel.

It is the same justice that fit the crime seen earlier with Saul's ambush.

🗡️ Agag's judgment matches his own violence

🔁 What he caused others now returns to him

⚖️ This is justice, not random cruelty

📖 The punishment fits the pattern of the crime

## ⚔️ And Samuel Hewed Agag In Pieces Before The LORD In Gilgal

"Hewed in pieces" describes a violent, decisive killing.

Before the LORD means this counted as obedience, not revenge.

Samuel finishes what Saul left undone back in verse nine.

The prophet completes the very command the king refused.

⚔️ Hewed in pieces means a decisive killing

🙏 Before the LORD frames this as obedience

🔁 Samuel finishes what Saul left undone

📖 The prophet completes the king's failure

## 🏘️ Then Samuel Went To Ramah And Saul Went Up To His House To Gibeah

Ramah was Samuel's own hometown.

Gibeah was Saul's hometown and the base of his kingdom.

The two men now head in completely separate directions.

Their partnership as prophet and king has effectively ended here.

🏘️ Ramah was Samuel's home

🏰 Gibeah was Saul's home base

🔀 The two men part ways

📖 Their partnership ends in this moment

## 🚪 And Samuel Came No More To See Saul Until The Day Of His Death

This line states plainly that the relationship is over.

Samuel does not visit or advise Saul again for the rest of his life.

The break is not just emotional distance, it is a real, lasting separation.

Some consequences do not get undone with time.

🚪 Samuel never visits Saul again

⏳ The separation lasts the rest of Saul's life

🔒 This break is real, not just distant

📖 Some consequences never get undone

## 😢 Nevertheless Samuel Mourned For Saul And The LORD Repented That He Had Made Saul King

Samuel stops visiting Saul, but he never stops grieving over him.

Ending a relationship and ending love for someone are not the same thing.

The chapter closes by repeating the same grief language used back in verse eleven.

God's sorrow over Saul remains, even after the decision cannot be undone.

😢 Samuel mourns even after the break

💔 Ending contact is not ending love

🔁 The chapter repeats verse eleven's grief

📖 God's sorrow outlasts an unchangeable decision
`.trim();

export const FIRST_SAMUEL_FIFTEEN_PERSONAL_SECTIONS = parseFirstSamuelFifteenRawNotes(FIRST_SAMUEL_FIFTEEN_RAW_NOTES);
