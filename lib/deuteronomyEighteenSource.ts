export type DeuteronomyEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyEighteenRawNotes(rawText: string): DeuteronomyEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 18:${startVerse}` : `Deuteronomy 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Deuteronomy 18 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_EIGHTEEN_RAW_NOTES = `# Deuteronomy 18:1-5
# 🕎 The Priests Who Live Off The Altar
---
## 🌾 No Part Nor Inheritance With Israel

The tribe of Levi never received a slice of the Promised Land.

Every other tribe was given a specific territory to settle and farm.

Levi was left out of that division on purpose.

Numbers eighteen and Joshua thirteen both confirm the same arrangement.

🕎 Levi got no tribal territory
🌾 Every other tribe received land
📜 Numbers and Joshua both confirm this
📖 Levi's calling replaced a land inheritance

## 🔥 They Shall Eat The Offerings Of The LORD Made By Fire

"Made by fire" means offerings burned on the altar as part of worship.

Certain portions of nearly every sacrifice were set aside for the priests to eat.

This was not scraps from someone else's meal.

It was their assigned share of the worship system itself.

🔥 Made by fire means burned offerings
🍖 Set portions went to the priests
🙏 This was their assigned share
📖 Worship itself provided their food

## 🙏 The LORD Is Their Inheritance

This does not mean the Levites had nothing at all.

It means their entire livelihood came directly from serving God.

Other tribes lived off their land.

Levites lived off the altar itself.

That arrangement kept them tied closely to worship every single day.

🙏 The LORD is their inheritance
🌾 Other tribes lived off land
🕎 Levites lived off the altar
📖 Worship became their daily livelihood

## 🐑 The Shoulder, And The Two Cheeks, And The Maw

"Shoulder" means the upper foreleg of the animal, a substantial cut of meat.

"Cheeks" means the meat around the jaw.

"Maw" means the stomach.

These three specific parts belonged to the priest from every qualifying sacrifice.

This law was more exact than simply saying give the priest some meat.

🐑 Shoulder means the upper foreleg
😮 Cheeks means the jaw meat
🍲 Maw means the stomach
📖 The law named exact portions

## 🌾 The Firstfruit Also Of Thy Corn, Of Thy Wine, And Of Thine Oil

"Firstfruit" means the first and best part of the harvest, offered before anyone used the rest.

"Corn" here means grain in general, like wheat or barley, not corn on the cob.

"Wine" means the juice pressed from grapes.

"Oil" means oil pressed from olives.

Israel offered the top of each harvest before touching the rest for themselves.

🌾 Firstfruit means the harvest's first part
🌽 Corn means grain in general
🍇 Wine means pressed grape juice
📖 The best came before the rest

## ✂️ The First Of The Fleece Of Thy Sheep

"Fleece" means the wool sheared from a sheep.

Sheep were normally sheared once a year for their wool.

The very first cut of that wool belonged to the priest, not the shepherd.

This added one more everyday product to the priest's provision, beyond food alone.

🐑 Fleece means sheared wool
✂️ Sheep were sheared yearly
🧑‍🌾 The first cut went to the priest
📖 Provision reached beyond food alone

## 👆 Chosen Him Out Of All Thy Tribes

The word him refers to the tribe of Levi.

Levi was not the largest or most powerful of Israel's twelve tribes.

Numbers three describes God setting this tribe apart to replace Israel's firstborn sons in service.

Being chosen here was about calling, not size or strength.

👆 Him refers to the tribe of Levi
🔢 Levi was not the largest tribe
📜 Numbers three explains this choice
📖 Calling mattered more than size

## 🧍 To Stand To Minister In The Name Of The LORD, Him And His Sons For Ever

"Stand to minister" describes the priest's regular position and duty at the altar.

This was not an occasional task done once in a while.

"For ever" means the role stayed inside Levi's family line for every future generation.

One tribe carried this responsibility permanently, not just for one lifetime.

🧍 Stand to minister means regular service
🔁 The duty was not occasional
👨‍👦‍👦 For ever means every future generation
📖 One family carried this permanently

# Deuteronomy 18:6-8
# 🚶 Any Levite Who Comes To Serve
---
## 🚪 If A Levite Come From Any Of Thy Gates Out Of All Israel

"Gates" means a local town, the same meaning already used earlier in Deuteronomy.

Levites did not live together in one region.

Numbers thirty five describes forty eight Levitical towns scattered among the other tribes.

Any Levite from any of those towns could come serve at the central sanctuary.

🚪 Gates means a local town
🗺️ Levites lived scattered, not together
🏘️ Numbers describes forty eight Levite towns
📖 Any of them could come serve

## 🏠 Where He Sojourned

"Sojourned" means living somewhere as a resident, not as the land's original owner.

Levites always lived this way, since they held no tribal inheritance of their own.

Every town a Levite lived in was, in a sense, borrowed ground.

🏠 Sojourned means living as a resident
🚫 Levites owned no tribal land
🤝 Every town was borrowed ground
📖 Their true portion was still God

## ❤️ Come With All The Desire Of His Mind

This describes a free, personal choice, not an order or a draft.

A Levite could stay in his hometown and never travel to the sanctuary.

Choosing to come and serve came from his own heart.

That kind of willing service mattered more than a forced attendance ever could.

❤️ This was a personal choice
🚫 No Levite was drafted here
🙋 Service came from a willing heart
📖 Willingness mattered more than duty alone

## 📍 Unto The Place Which The LORD Shall Choose

This phrase points to one specific location, not just any worship site.

Chapter twelve already introduced this same phrase for Israel's central sanctuary.

At this point in Israel's history, that location had not yet been fixed permanently.

It would later be Shiloh, and still later Jerusalem.

📍 This means one specific location
📜 Chapter twelve used this phrase first
⛺ The site later became Shiloh
📖 It later became Jerusalem too

## ⚖️ They Shall Have Like Portions To Eat

This does not mean the visiting Levite received leftovers.

He received the same share as the priests who already served there full time.

Nothing about arriving later reduced his portion.

Fair treatment mattered even inside the priesthood's own ranks.

⚖️ Like portions means an equal share
🕎 Full time priests got no extra
🚫 Arriving later changed nothing
📖 Fairness reached inside the priesthood too

## 💰 Beside That Which Cometh Of The Sale Of His Patrimony

"Patrimony" means property or possessions passed down through his family.

A Levite might have sold personal family property before coming to serve.

That extra money was his to keep.

It never reduced the equal share of food he was owed at the sanctuary.

💰 Patrimony means inherited family property
🏠 A Levite could sell his own
🚫 That sale never reduced his share
📖 Both provisions belonged to him fully

# Deuteronomy 18:9-14
# 🔮 Israel And The Occult
---
## 📋 Thou Shalt Not Learn To Do After The Abominations Of Those Nations

"Learn to do after" is an old way of saying copy or imitate.

Israel was not just told to avoid these nations' gods.

They were told not to even copy their religious customs.

Living in the land was allowed.

Copying its worship was not.

📋 Learn to do after means copy
🚫 Avoiding false gods was not enough
🛑 Copying pagan customs was forbidden too
📖 Living there did not mean copying them

## 🔥 Maketh His Son Or His Daughter To Pass Through The Fire

This phrase describes child sacrifice, one of the darkest practices in the ancient Near East.

Nearby nations burned their own children as offerings to a false god called Molech.

Leviticus eighteen and twenty both name this same practice directly.

God forbids it here in the strongest possible terms.

🔥 This describes child sacrifice
👹 Molech worship practiced this act
📜 Leviticus names this same practice
📖 God forbids it outright

## 🔮 Useth Divination

"Divination" means trying to predict the future or uncover hidden knowledge through occult methods.

This could involve reading patterns in oil, water, or the entrails of animals.

Israel was told to seek guidance from God directly instead.

Not from secret techniques borrowed off the nations around them.

🔮 Divination means predicting hidden things
🫗 Ancient methods used oil or water
🙏 Israel was to ask God instead
📖 Guidance was never meant to be secret

## 👀 An Observer Of Times, Or An Enchanter, Or A Witch

These three terms name different kinds of occult practitioners among Israel's neighbors.

An observer of times read omens in weather or the sky to predict events.

An enchanter used chants or hidden signs to influence what happened next.

A witch claimed the power to cast spells over people or events.

Each one claimed a shortcut to hidden knowledge that bypassed God entirely.

👀 Observer of times read weather omens
🗣️ An enchanter used chants and signs
🪄 A witch claimed power through spells
📖 Israel was to trust none of these

## 🐍 A Charmer, Or A Consulter With Familiar Spirits, Or A Wizard, Or A Necromancer

These four more terms complete the list of forbidden occult roles.

A charmer used spoken spells, often to control snakes.

A consulter with familiar spirits spoke through a spirit medium.

A wizard was a male sorcerer, sometimes called a knowing one.

A necromancer tried to contact and question the dead.

Eight different roles appear across these two verses alone.

🐍 A charmer often controlled snakes
👻 A consulter used a spirit medium
🔮 A wizard was a male sorcerer
📖 A necromancer tried contacting the dead

## 💔 An Abomination Unto The LORD

"Abomination" is the same strong word used repeatedly back in chapter seventeen.

There it described careless offerings and false worship.

Here it covers the entire list of occult practices just named.

God places these practices in the same serious category as covenant betrayal.

💔 Abomination repeats chapter seventeen's word
🕎 There it named careless worship
🔮 Here it names occult practice
📖 Both count as covenant betrayal

## 🏞️ The LORD Thy God Doth Drive Them Out From Before Thee

These very practices are given here as the reason Canaan's nations were being removed.

Chapter nine already made this same point about the conquest.

Israel was not simply taking land by military strength.

God's judgment on these nations' sin was the deeper cause behind it.

🏞️ These practices caused the nations' removal
📜 Chapter nine already made this point
⚔️ Conquest was not only military strength
📖 Judgment on sin was the deeper cause

## ❤️ Thou Shalt Be Perfect With The LORD Thy God

This does not mean Israel had to live without ever sinning.

"Perfect" here means wholehearted and undivided in loyalty, not flawless.

The word describes complete devotion to God, not moral perfection.

It stands in contrast to the occult practices just listed, which split loyalty between God and hidden powers.

❤️ Perfect means wholehearted loyalty
🚫 It does not mean sinless
⚖️ It contrasts with divided loyalty
📖 Devotion to God had to be complete

## 👂 Hearkened Unto Observers Of Times, And Unto Diviners

Canaan's nations built entire practices around these occult methods.

They trusted omens and diviners the way Israel was meant to trust God's word.

This verse names exactly what Israel was being asked to leave behind.

👂 Canaan's nations trusted these methods
🔮 Omens replaced God's word for them
🚫 Israel had to leave this behind
📖 Trust had one proper direction only

## 🚫 The LORD Thy God Hath Not Suffered Thee So To Do

"Suffered" here is an old word for permitted or allowed.

Israel was not simply told to avoid these practices out of good judgment.

God directly forbade the entire category as off limits.

The next verses explain exactly what Israel was given instead of divination.

🚫 Suffered here means allowed
⛔ God forbade this category outright
🙅 Avoiding this was not optional
📖 A true alternative comes next

# Deuteronomy 18:15-19
# 🗣️ A Prophet Like Moses
---
## 🗣️ A Prophet From The Midst Of Thee, Of Thy Brethren, Like Unto Me

This promise points to a future prophet who would speak for God the way Moses did.

That prophet would come from Israel itself.

Later New Testament writers, including Peter and Stephen, apply this promise to Jesus.

Jewish tradition had also read this verse as a promise about one specific prophet.

🗣️ A prophet like Moses was promised
🇮🇱 He would come from Israel itself
✝️ The New Testament applies this to Jesus
📖 The promise pointed toward one figure

## 👂 Unto Him Ye Shall Hearken

"Hearken" means more than simply hearing words.

It carries the sense of listening in order to obey.

Israel was not just being told a prophet would show up.

They were being told in advance to follow what he said.

👂 Hearken means listening to obey
🚫 It is not passive hearing
✅ Obedience was expected in advance
📖 The command came before the prophet did

## ⛰️ According To All That Thou Desiredst Of The LORD Thy God In Horeb In The Day Of The Assembly

Horeb is another name for Mount Sinai.

The day of the assembly refers back to Israel gathered at the mountain to receive the law.

Exodus twenty and Deuteronomy five both describe what happened there.

This verse looks all the way back to that first encounter with God's voice.

⛰️ Horeb is another name for Sinai
👥 The assembly means Israel gathered there
📜 Exodus and Deuteronomy both describe it
📖 This promise reaches back to that day

## 😨 Let Me Not Hear Again The Voice Of The LORD My God, Neither Let Me See This Great Fire Any More, That I Die Not

This was not a failure of faith on Israel's part.

Hearing God's voice directly, out of the fire, had genuinely terrified the people.

They were not asking to avoid God entirely.

They were asking for a mediator so they could survive the encounter.

😨 Israel was genuinely terrified
🔥 God's direct voice came from fire
🙅 This was not avoiding God
📖 They needed a mediator to survive it

## ✅ They Have Well Spoken That Which They Have Spoken

God calls Israel's fearful request wise, not weak.

Wanting a mediator between themselves and God's overwhelming presence was the right instinct.

That request becomes the reason this whole promise of a future prophet is given.

✅ God approved this request
🙏 Wanting a mediator was wise
🗣️ This request led to the promise
📖 Fear here produced a good result

## 📤 I Will Put My Words In His Mouth

This describes how the promised prophet would receive his message.

He would not invent what to say on his own.

God would supply the exact words, and the prophet would deliver them.

This is the basic definition of true prophecy throughout the whole Bible.

🗣️ God would supply the exact words
🚫 The prophet would not invent them
📤 He would only deliver the message
📖 This defines true prophecy itself

## ⚖️ Whosoever Will Not Hearken Unto My Words Which He Shall Speak In My Name, I Will Require It Of Him

"Require it of him" means God himself will hold that person personally accountable.

Rejecting this future prophet's message would not be a small, private choice.

It would be treated the same as rejecting God's own words.

The weight of that promise fell directly on how Israel responded to him.

⚖️ Require it means hold accountable
🚫 Rejecting him was not private
🗣️ It equaled rejecting God's words
📖 Response to him carried real weight

# Deuteronomy 18:20-22
# ⚖️ Testing A True Prophet
---
## 😤 Shall Presume To Speak A Word In My Name, Which I Have Not Commanded Him To Speak

"Presume" shares the same root as "presumptuously," the word already used back in chapter seventeen.

There it described defying a court's ruling on purpose.

Here it describes claiming to speak for God without actually being sent by him.

Both are treated as serious, willful offenses, not honest mistakes.

😤 Presume shares chapter seventeen's word
⚖️ There it meant defying a court
🗣️ Here it means false prophecy
📖 Both count as willful offenses

## 👹 Or That Shall Speak In The Name Of Other Gods

This names a second, separate kind of false prophet.

One type falsely claims to speak for the true God.

The other openly speaks for other gods entirely.

The law treats both categories the exact same way.

🗣️ Two kinds of false prophet are named
🙏 One falsely claims God's authority
👹 The other serves other gods openly
📖 Both receive the same judgment

## ⚠️ Even That Prophet Shall Die

This penalty matches the same severity already given to false prophets back in chapter thirteen.

Misleading an entire nation about God's word was treated as an extremely serious crime.

A false prophet could steer thousands of people away from God at once.

The punishment reflects the size of that danger.

⚠️ This matches chapter thirteen's penalty
🌍 False prophecy could mislead a nation
🔥 The danger was treated as severe
📖 The punishment matched the risk

## ❓ How Shall We Know The Word Which The LORD Hath Not Spoken

This is the exact question a sincere reader would already be asking.

If a prophet's message cannot simply be taken on faith, how can anyone test it?

God does not leave Israel guessing.

The next verse gives a clear, practical answer.

❓ This anticipates a natural question
🤔 How can a prophet be tested
✅ God provides a clear answer
📖 Guessing was never required

## ✅ If The Thing Follow Not, Nor Come To Pass

This describes a simple fulfillment test.

A message that genuinely comes from God will actually happen.

If a prophet's specific prediction fails, that failure exposes the message as false.

This test could not catch every kind of false teaching, but it caught this one clearly.

✅ True prophecy comes true
❌ A failed prediction exposes a fraud
🔍 This was a clear, testable standard
📖 God's word never fails to happen

## 🙅 Thou Shalt Not Be Afraid Of Him

Once a prophet's prediction failed, Israel had no reason to fear him any longer.

His claim to speak for God had already been disproven.

The community was never left powerless against a false prophet's threats.

A clear test gave ordinary people real confidence, not just religious leaders.

🙅 No reason remained to fear him
❌ His claim was already disproven
💪 The community was not powerless
📖 Ordinary people could tell true from false
`.trim();

export const DEUTERONOMY_EIGHTEEN_PERSONAL_SECTIONS = parseDeuteronomyEighteenRawNotes(DEUTERONOMY_EIGHTEEN_RAW_NOTES);
