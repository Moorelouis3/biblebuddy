export type ExodusThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusThreeRawNotes(rawText: string): ExodusThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 3:${startVerse}` : `Exodus 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Exodus 3 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_THREE_RAW_NOTES = `# Exodus 3:1-3
# 🔥 The Burning Bush
---
## 🐑 Jethro His Father In Law, The Priest Of Midian

Jethro is the same man called Reuel back in chapter two.

Many think one name was personal.

The other may have been a title for the family's leader.

A priest of Midian led that region's worship, not Israel's.

Moses has lived inside a different faith system for decades.

🐑 Jethro and Reuel name the same man

📖 Chapter two already introduced him

👳 Priest of Midian means a Midianite religious leader

➡️ Moses lived far from Israel's faith for years

## 🏜️ The Backside Of The Desert

Backside of the desert means the far edge of the wilderness.

It is the emptiest, most remote part of the land.

Moses is not on any kind of mission here.

He is doing an ordinary day's work, watching sheep.

God chooses to meet him in a completely ordinary moment.

🏜️ Backside of the desert means the remote edge

🚶 Far from any town or road

🐑 Moses is just doing his daily work

📖 God meets him in an ordinary moment

## ⛰️ The Mountain Of God, Even To Horeb

Horeb is another name for the same mountain.

Later it is called Sinai.

Israel will camp here and receive the Ten Commandments.

Moses has no idea any of that is coming.

Right now it is just another hill with grazing land.

⛰️ Horeb is another name for Sinai

📜 Israel later receives the law here

🐑 Moses only sees grazing land today

➡️ This place's importance is still hidden

## 🔥 The Angel Of The LORD Appeared Unto Him In A Flame Of Fire

The angel of the LORD is a title, not a lesser being.

It often describes God himself appearing directly to someone.

Fire is a common sign of God's presence in Scripture.

Here that presence takes the shape of fire in a bush.

Nothing about the setting was grand or expected.

👼 Angel of the LORD often means God himself

🔥 Fire is a common sign of His presence

🌵 The bush was an ordinary desert shrub

📖 God chose a plain setting for this

## 🌵 The Bush Burned With Fire, And The Bush Was Not Consumed

Real fire destroys whatever it burns.

This fire does not.

The bush keeps burning without ever turning to ash.

That is the whole point of the sign.

Something here cannot be explained by ordinary nature.

🔥 Real fire always destroys what it burns

🌵 This bush never turns to ash

❗ The sign breaks the rules of nature

📖 God announces His presence, unmistakably

## 👣 I Will Now Turn Aside, And See This Great Sight

Moses could have kept walking past the bush.

Instead he stops to go look closer.

That small choice puts him right where God is waiting.

Curiosity, not a plan or a summons, opens this calling.

👣 Moses chooses to stop and look

🔍 Curiosity leads him toward the bush

🚪 A small choice opens a huge moment

➡️ God often meets people in everyday moments

# Exodus 3:4-6
# 🩴 God Calls Moses By Name
---
## 📢 Moses, Moses

God calls Moses' name twice in a row.

That same pattern shows up elsewhere in the Bible.

God called Abraham's name twice before stopping his hand at the altar.

Every time it happens, someone stands at a turning point.

The double call gets full attention before anything else is said.

📢 God repeats Moses' name twice

🔁 The same pattern appears elsewhere in Scripture

🔀 It marks a major turning point

➡️ It grabs full attention first

## 🙏 Here Am I

Moses answers with a short, ready reply.

The phrase does not just mean I am over here.

It signals full attention and a readiness to listen.

Abraham gave this same answer generations earlier.

Moses steps into that same readiness without knowing what comes next.

🗣️ Here am I means full attention

🙏 It signals readiness to listen

📖 Abraham answered God the same way

➡️ Moses agrees before he knows the request

## 🛑 Draw Not Nigh Hither

Nigh is an old word for near.

Hither means to this place.

God tells Moses to stop moving closer, right where he stands.

The command comes before any explanation.

📏 Nigh means near

📍 Hither means to this place

🛑 God stops Moses before he gets closer

➡️ The reason comes only after the command

## 👟 Put Off Thy Shoes From Off Thy Feet

Removing sandals before sacred ground showed humility in the ancient world.

Shoes carried the dust and dirt of ordinary travel.

Taking them off meant approaching without anything common attached.

This was more than simple manners.

It was a physical way of admitting whose ground this was.

👟 Removing sandals showed humility

🌍 Shoes carried ordinary travel dust

🙇 It meant approaching without anything common

📖 The act admitted whose ground this was

## ✨ For The Place Whereon Thou Standest Is Holy Ground

Holy means set apart, different from anything ordinary.

The ground itself has not physically changed.

It is holy only because God's presence is there right now.

Nothing about the location matters more than who has shown up.

✨ Holy means set apart from the ordinary

🌍 The ground is unchanged in itself

👁️ God's presence is what makes it holy

📖 Presence matters more than location

## 📜 I Am The God Of Thy Father, The God Of Abraham, The God Of Isaac, And The God Of Jacob

Thy father here points to Moses' own father, Amram.

It does not mean one of the three patriarchs named next.

God then names three generations by name.

Abraham, Isaac, and Jacob already carried God's old promises.

Moses is not meeting a new or unfamiliar God.

He is meeting the same God his whole family already knew.

👨‍👦 Thy father means Moses' father, Amram

📜 Abraham, Isaac, and Jacob are named directly

🔗 This ties Moses to his family's old promises

📖 The same God, across every generation

## 😨 He Was Afraid To Look Upon God

Moses does not hide out of guilt.

He hides out of pure reverence.

Fear here means awe at God's greatness, not simple terror.

Ancient tradition held that seeing God fully was more than anyone could survive.

Moses' instinct protects him and honors God at the same time.

🙈 Moses hides from reverence, not guilt

😨 This fear means awe, not simple terror

⚠️ Seeing God fully was considered unsurvivable

➡️ Reverence and protection combine here

# Exodus 3:7-9
# 👀 God Has Seen Israel's Suffering
---
## 😖 I Have Surely Seen The Affliction Of My People

Affliction means deep, ongoing suffering, not a passing hardship.

God does not say He merely noticed it.

Surely seen adds emphasis in the original language.

This directly answers the ending of chapter two.

There, Israel's cry was described as reaching God.

Now God confirms it in His own words.

😖 Affliction means deep, ongoing suffering

👁️ Surely seen adds emphasis, not mere notice

📖 This answers chapter two's closing verses

➡️ God confirms it in His own voice

## 👷 Heard Their Cry By Reason Of Their Taskmasters

Taskmasters were Egyptian overseers forcing impossible work quotas.

By reason of means because of.

Israel's cry was not a vague complaint about hard times.

It was a direct response to real cruelty from real people.

👷 Taskmasters were Egyptian slave overseers

📏 By reason of means because of

⛓️ The cry responded to specific cruelty

📖 Real people caused this suffering

## 🧠 For I Know Their Sorrows

God moves from seeing and hearing to something closer, knowing.

This is not distant awareness.

It means understanding pain from the inside.

Three verbs stack together here on purpose.

Seeing, hearing, and knowing describe total, personal awareness.

🧠 Knowing means understanding from the inside

👀 Seeing, hearing, and knowing stack together

🎯 Together they show total awareness

📖 God's awareness is personal, not distant

## ⬇️ I Am Come Down To Deliver Them

God is already present everywhere, so this is not a literal trip.

Come down is human language describing active involvement.

Genesis uses this same kind of phrase for the tower of Babel.

It signals God is about to act personally, not stay distant.

⬇️ Come down describes involvement, not motion

🌍 God is already present everywhere

📖 Genesis uses this same kind of phrase

➡️ God is about to act personally

## 🗺️ A Good Land And A Large

Large here means spacious, not physically huge.

God describes a land with room for a whole nation.

This contrasts sharply with Egypt.

There Israel was confined to hard labor with no land of their own.

🗺️ Large means spacious, roomy

🌾 The land can support a whole nation

⛓️ Egypt gave them no land of their own

➡️ Freedom includes real room to grow

## 🍯 A Land Flowing With Milk And Honey

This is not a literal river of dairy and honey.

It is an idiom for land rich in food and grazing.

Milk points to healthy livestock.

Honey points to rich, wild vegetation.

This becomes the Bible's standard phrase for the promised land.

🍯 Milk and honey is an idiom, not literal

🐄 Milk points to healthy livestock

🌿 Honey points to rich vegetation

📖 This becomes the Bible's standard phrase

## 🗺️ The Canaanites, And The Hittites, And The Amorites, And The Perizzites, And The Hivites, And The Jebusites

This is a standard list of the land's current peoples.

Naming them is not decoration.

It means Israel's future home is occupied territory.

It is not empty land waiting for new settlers.

Taking the promise will mean a real conquest.

🗺️ This lists the land's current inhabitants

🏘️ The land is occupied, not empty

⚔️ Taking it will require real conquest

📖 This same list appears again later in Exodus

## 🔁 The Cry Of The Children Of Israel Is Come Unto Me

God repeats almost the same claim from verse seven.

Repetition here is not filler.

It builds toward the assignment God is about to hand Moses.

Everything so far has been about what God has seen and heard.

The next verse turns to what Moses must now do.

🔁 God repeats the claim from verse seven

📢 Repetition builds toward Moses' assignment

👂 What God has heard now leads to action

➡️ God is about to ask Moses to move

# Exodus 3:10-12
# 🙋 Moses Is Sent, And Objects
---
## 👑 Come Now Therefore, And I Will Send Thee Unto Pharaoh

Pharaoh is a title for Egypt's king, not a personal name.

It works the way king or president works today.

God is not sending Moses to argue with a minor official.

He is sending him straight to the region's most powerful ruler.

👑 Pharaoh is a title, not a name

🏛️ It works like the word king

🎯 Moses is sent to the top ruler

➡️ This is the highest possible confrontation

## 👥 Bring Forth My People The Children Of Israel Out Of Egypt

God calls Israel my people, not simply a group of slaves.

That phrase carries real ownership and relationship.

He has not forgotten who these people belong to.

Centuries in Egypt did not erase that bond.

The mission is personal to God before it reaches Moses.

👥 My people shows real ownership

🤝 God has not forgotten this relationship

⏳ Centuries in Egypt did not erase it

📖 The mission starts as personal to God

## ❓ Who Am I, That I Should Go Unto Pharaoh?

Moses' question is not really about his own identity.

It means something closer to why would anyone listen to me.

This is a striking change from chapter two's bold young man.

Decades of quiet shepherd life in Midian wore down that confidence.

❓ Who am I means why would they listen

🔥 Moses once acted boldly in chapter two

🐑 Years as a shepherd changed him

➡️ Confidence had quietly worn away

## 🤝 Certainly I Will Be With Thee

God does not answer Moses' doubt with a list of strengths.

He answers with a promise of presence instead.

This mission was never going to rest on Moses' own courage.

It rests entirely on who is sending him.

🤝 God promises presence, not a pep talk

🚫 No list of Moses' strengths is given

🎯 Success depends on God, not Moses

📖 Presence, not ability, is the real guarantee

## ✅ This Shall Be A Token Unto Thee, That I Have Sent Thee

A token here means a confirming sign, proof a promise is real.

The odd part is this sign will not happen until after Moses obeys.

Normally a sign proves something before someone acts.

Here, obedience comes first, and the proof follows after.

✅ Token means a confirming sign

⏳ This sign only comes after obedience

🔄 Proof follows action here, not the reverse

➡️ Moses must trust before he sees

## ⛰️ Ye Shall Serve God Upon This Mountain

This mountain is Horeb, the same place named back in verse one.

God promises Israel will return here to worship after leaving Egypt.

That promise comes true months later.

Israel receives the Ten Commandments at this same mountain, now called Sinai.

⛰️ This mountain is Horeb from verse one

🔁 Israel will return here later

📜 They receive the Ten Commandments here

📖 A promise made now, fulfilled months later

# Exodus 3:13-15
# ✨ God Reveals His Name
---
## 👀 Behold, When I Come Unto The Children Of Israel

Behold is an old word meaning look, or pay attention.

Moses uses it to introduce a scene he already pictures.

Notice the shift here.

One verse earlier Moses was still objecting.

Now he is already planning the actual conversation ahead.

👀 Behold means look, or pay attention

🎬 Moses pictures a future conversation

🔄 His objection is already turning into planning

➡️ A shift from resistance toward action

## 🛕 What Is His Name? What Shall I Say Unto Them?

Moses is not asking a random question.

Egypt worshiped many different gods, each with its own name.

Israel would want to know exactly which God sent Moses.

Moses is thinking ahead to a real conversation.

❓ Moses expects a real, practical question

🛕 Egypt worshiped many different named gods

🎯 Israel would want a specific identity

➡️ Moses is preparing for that conversation

## ✨ I AM THAT I AM

This is one of the most important statements in the Bible.

God does not give a title or a job description.

He describes His own existence, that He simply is.

God depends on nothing and no one else to exist.

Every created thing depends on something else, air, food, a beginning.

God alone needs none of that.

✨ God describes His own existence, not a title

🚫 God depends on nothing outside Himself

🌍 Everything created depends on something else

📖 This defines who God fundamentally is

## 🔤 Thus Shalt Thou Say Unto The Children Of Israel, I AM Hath Sent Me Unto You

God shortens the statement into a name Moses can use, I AM.

In Hebrew this connects to the name written as four letters, YHWH.

Most English Bibles translate that name as the LORD, in small capitals.

Every time this chapter says the LORD in capitals, this name is meant.

✂️ I AM becomes the name Moses can use

🔤 It connects to the Hebrew name YHWH

🔠 English Bibles print it as LORD, in capitals

📖 This name recurs constantly through the Old Testament

## 📜 The LORD God Of Your Fathers, The God Of Abraham, The God Of Isaac, And The God Of Jacob

God repeats the same lineage already given back in verse six.

This time it connects directly to His new, personal name, the LORD.

The message to Israel is clear.

The God with the eternal name is the God their ancestors knew.

📜 The same lineage repeats from verse six

🔗 It now connects directly to the LORD's name

🤝 One God, known across every generation

📖 Nothing new is introduced here, only revealed

## 🕯️ This Is My Name For Ever, And This Is My Memorial Unto All Generations

A memorial is something kept on purpose so it will never be forgotten.

God is not giving Moses a name for one single conversation.

He is establishing the name Israel will use forever.

Every later use of the LORD in the Old Testament traces back here.

🕯️ Memorial means kept on purpose, never forgotten

♾️ This name is permanent, not temporary

👨‍👩‍👧‍👦 It carries forward through every generation

📖 Every later LORD in the Bible starts here

# Exodus 3:16-18
# 🗣️ Instructions For Israel's Elders
---
## 👴 Gather The Elders Of Israel Together

Elders were the respected leaders inside Israel's tribal structure.

Even generations of slavery did not erase that leadership.

Moses is told to approach leaders first, not the whole nation at once.

Trusted voices hearing the news first helps it spread well.

👴 Elders were Israel's recognized tribal leaders

⛓️ Leadership survived even through slavery

🎯 Moses approaches leaders before the whole nation

➡️ Trusted voices help news spread well

## 📖 I Have Surely Visited You

Visited here does not mean a friendly stop by.

In the Old Testament this word describes God stepping in to act.

It can mean help, or it can mean judgment.

Israel would recognize this as a sign God is finally intervening.

📖 Visited signals God actively stepping in

🚫 It does not mean a casual stop by

⚖️ It can mean help or judgment

➡️ Here, it means help has arrived

## 👂 They Shall Hearken To Thy Voice

Hearken is an old word for listening that leads to action.

It is more than simply hearing sound.

God reassures Moses that Israel's own people will respond well.

That matters, since the next hearer, Pharaoh, will not hearken at all.

👂 Hearken means listening that leads to action

✅ God promises Israel will respond well

⚖️ This contrasts sharply with Pharaoh's response

📖 Not everyone reacts to God's word alike

## 🏷️ The LORD God Of The Hebrews Hath Met With Us

Hebrews is the term Egyptians typically used for Israel.

Israel used it less often for itself.

This message targets Egypt's king, so the wording fits its audience.

Even word choice served the mission here.

🏷️ Hebrews was the term Egyptians used for Israel

🎯 This message targets Pharaoh specifically

🗣️ The wording matches its intended audience

➡️ Even word choice served the mission

## 🙏 We Beseech Thee

Beseech means to ask earnestly, almost to beg.

It is a strong request, not a casual suggestion.

This is the tone Moses is told to take at first.

That respectful tone will not last for long.

🙏 Beseech means to ask earnestly

🎭 The initial tone is respectful, not forceful

⏳ This approach will not last

➡️ A soft first request, before escalation

## 🚶 Three Days' Journey Into The Wilderness, That We May Sacrifice

Notice how small this first request actually is.

Moses asks for a short trip to worship, not full freedom.

This is a deliberate opening move.

It tests Pharaoh's willingness before the larger confrontation begins.

The full release will take several escalating rounds to unfold.

🚶 A three day trip is modest

🎯 It tests Pharaoh before the bigger demand

📈 The real story escalates from here

➡️ A first move, not the final one

# Exodus 3:19-22
# ⚔️ Pharaoh Will Resist, And God Will Act
---
## 🚫 I Am Sure That The King Of Egypt Will Not Let You Go

God tells Moses exactly what to expect before it happens.

Pharaoh is going to refuse.

This is not a plan that might fail.

God prepares Moses in advance so resistance does not catch him off guard.

🚫 God predicts Pharaoh's refusal in advance

📖 This is not a plan that might fail

🛡️ Moses is prepared ahead of time

➡️ Knowing resistance is coming softens the blow

## ❓ No, Not By A Mighty Hand

This short phrase is genuinely hard to translate.

Many scholars read it as except by a mighty hand, meaning by force.

Mighty hand later describes God's own power in Exodus, not Pharaoh's.

Read that way, this line already hints at the plagues ahead.

❓ This phrase is genuinely hard to translate

💪 Mighty hand later describes God's own power

🔮 It hints force alone will move Pharaoh

📖 The coming plagues are already foreshadowed here

## 💥 I Will Stretch Out My Hand, And Smite Egypt With All My Wonders

Smite means to strike with force, often to bring judgment.

Wonders means miraculous acts that only God could do.

This line previews the plague sequence still to come.

Ten separate acts of judgment fill the chapters ahead.

💥 Smite means to strike with judgment

✨ Wonders are miracles beyond natural cause

📜 This previews the ten plagues ahead

➡️ Egypt's confrontation escalates from here

## ❤️ I Will Give This People Favour In The Sight Of The Egyptians

Favour means good will, a positive attitude from someone who could easily be hostile.

This is a striking promise after generations of Egyptian mistreatment.

God promises to change how ordinary Egyptians feel toward Israel.

It is not just about changing Pharaoh's final decision.

❤️ Favour means good will from others

⚖️ This is striking after generations of mistreatment

🔄 God changes hearts, not just Pharaoh's decision

📖 This favour plays out later in Exodus

## 👐 Ye Shall Not Go Empty

Freed slaves in the ancient world often left with nothing.

No pay ever came for years of forced labor.

God promises Israel's exit will look different.

They will not walk away empty handed this time.

⛓️ Freed slaves usually left with nothing

💰 God promises a different outcome here

👐 Israel will not leave empty handed

📖 Unpaid generations will finally be answered

## 💍 Borrow Of Her Neighbour ... Jewels Of Silver, And Jewels Of Gold, And Raiment

Borrow here does not mean Israel planned to give it back.

The word describes simply asking, closer to request than loan.

Raiment means clothing.

Silver, gold jewelry, and clothing were valuable, portable wealth.

That is exactly what a traveling people would actually need.

🙋 Borrow here means to ask, not a loan

👗 Raiment means clothing

💍 Silver and gold jewelry were portable wealth

➡️ These were practical gifts for a journey ahead

## 🎁 Ye Shall Spoil The Egyptians

Spoil means to take valuables, not to ruin or destroy.

Israel leaves Egypt carrying real wealth, given willingly, not stolen.

This quietly fulfills an old promise God made to Abraham.

Genesis fifteen predicted his descendants would leave captivity with great wealth.

🎁 Spoil means to take valuables, not destroy

🤝 The wealth is given willingly, not stolen

📜 This fulfills God's promise to Abraham

📖 Genesis fifteen predicted this exact moment`.trim();

export const EXODUS_THREE_PERSONAL_SECTIONS = parseExodusThreeRawNotes(EXODUS_THREE_RAW_NOTES);
