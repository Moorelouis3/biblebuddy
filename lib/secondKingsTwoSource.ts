export type SecondKingsTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsTwoRawNotes(rawText: string): SecondKingsTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsTwo\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsTwo\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsTwo\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 2:${startVerse}` : `2 Kings 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 2 Kings 2 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_TWO_RAW_NOTES = `# SecondKingsTwo 2:1-3
# 🌪️ Elijah And Elisha Leave Gilgal
---
## 🌪️ Take Up Elijah Into Heaven By A Whirlwind

A whirlwind is a violent spinning column of wind, not a soft breeze.

This opening verse tells the reader the ending before the story even begins.

Elisha inside the story does not get that same warning.

The chapter is not really about Elijah leaving.

It is about how Elisha responds to losing him.

🌪️ Whirlwind means violent spinning wind

👀 Elisha gets no advance warning

➡️ Elijah's ending is named up front

📖 The chapter follows Elisha's response

---

## 🏕️ Elijah Went With Elisha From Gilgal

Gilgal was the camp Israel set up first after crossing the Jordan into Canaan.

Joshua chapter four already tells that same crossing story.

By Elijah's time Gilgal had also become home to a community of prophets.

This whole journey begins from that same historic ground.

The ground under their feet already carried decades of Israel's story.

🏕️ Gilgal was Israel's first camp in Canaan

📜 Joshua four already tells that crossing

👥 Sons of the prophets lived there too

📖 This journey starts on historic ground

---

## 🗣️ Tarry Here I Pray Thee

Tarry is an old word that simply means stay or wait.

Elijah tests Elisha three separate times in this chapter, first here at Gilgal.

Each time Elijah gives Elisha a chance to quit and go home.

Elisha refuses every single time.

That refusal is the real proof of how much Elisha wants to follow him.

🗣️ Tarry means stay or wait

🧪 Elijah tests Elisha three times

🚫 Elisha refuses to leave each time

➡️ His loyalty proves itself through refusal

---

## 🤝 As The LORD Liveth, And As Thy Soul Liveth, I Will Not Leave Thee

This is a solemn oath, not just an emotional promise.

Elisha swears by the LORD, then swears again by his own soul.

A double oath like that was the strongest way to bind a promise in this culture.

Elisha repeats this exact vow three separate times in this chapter.

Each repetition makes his commitment to Elijah harder to doubt.

🙏 Elisha swears by the LORD

❤️ Then swears again by his soul

🔁 He repeats this vow three times

📖 Each repeat strengthens his commitment

---

## 👑 Take Away Thy Master From Thy Head To Day

This does not necessarily mean the sons of the prophets expected Elijah to die.

The phrase just means his position over Elisha is about to end.

From thy head pictures Elijah as an authority sitting above Elisha like a covering.

They already sense today is the day, without knowing the exact details yet.

Even people outside Elijah's inner circle sensed something enormous was about to happen.

👥 Sons of the prophets sense the day

🚫 Take away does not mean death

👑 From thy head means authority above him

📖 Others sensed this moment approaching too

---

## 👨‍🎓 The Sons Of The Prophets

Sons of the prophets does not mean Elijah's literal children.

It names a group of prophets in training who lived and studied together.

Communities like this existed at Bethel, Jericho, and other towns across Israel.

Elisha will end up leading this same kind of community after Elijah is gone.

This whole chapter is really the changing of leadership over that community.

👨‍🎓 Sons of the prophets means students not sons

🏘️ Communities existed in several towns

📚 They trained under senior prophets

📖 Elisha will soon lead them himself

---

# SecondKingsTwo 2:4-6
# 🚶 The Journey Continues To The Jordan
---
## 🏚️ For The LORD Hath Sent Me To Jericho

Jericho was not just any city on this route.

Joshua chapter six had cursed anyone who rebuilt its walls.

First Kings chapter sixteen already told how a man named Hiel rebuilt it anyway.

He lost two sons in the process, exactly as that curse had warned.

Even a city under judgment still held a faithful community of prophets inside it.

🏚️ Jericho carried an old curse

📜 Joshua six warned against rebuilding it

💔 Hiel rebuilt it and lost two sons

📖 Faithful prophets still lived there anyway

---

## 🤫 Yea I Know It Hold Ye Your Peace

Hold ye your peace is an old way of saying stay quiet about this.

Elisha already knows what is coming and does not want to talk about it.

Naming a coming loss too early can make grief feel heavier before it is time.

Elisha is choosing to carry this quietly instead of dwelling on it with everyone.

Sometimes the kindest response to hard news is simply choosing not to repeat it.

🤫 Hold your peace means stay quiet

😔 Elisha already knows what is coming

💭 He does not want to dwell on it

➡️ Silence can be its own kind of strength

---

## 👥 And They Two Went On

They two simply means only the two of them, Elijah and Elisha alone.

Everyone else stays behind at each stop along this journey.

The Bethel and Jericho groups do not travel all the way to the Jordan.

Only Elisha stays close enough to witness what happens next.

That closeness is exactly what Elisha asked for when he refused to leave.

👥 They two means Elijah and Elisha alone

🛑 Others stay behind at each stop

👀 Only Elisha goes all the way

📖 His closeness pays off what happens next

---

## 🎯 For The LORD Hath Sent Me To Jordan

This is the third and final test in this same pattern.

First Bethel, then Jericho, now Jordan itself.

Three repeated tests were a common way scripture showed something was fully proven.

Elisha passes every single one without wavering.

By the third refusal, there is no doubt left about where his loyalty stands.

🎯 Bethel Jericho and Jordan complete the pattern

🔁 Three repeated tests prove something fully

🏆 Elisha passes every single test

📖 His loyalty is now beyond doubt

---

# SecondKingsTwo 2:7-8
# 🌊 Elijah Parts The Jordan
---
## 👀 Stood To View Afar Off

These fifty men come from the same prophet communities already introduced at Bethel and Jericho.

They do not follow all the way to the riverbank.

Watching from a distance still makes them witnesses to whatever happens next.

Their presence confirms this moment was seen by more than just Elisha alone.

God provided outside witnesses even though only one person would walk through what came next.

👥 Fifty men from the prophet communities

👀 They watch from a safe distance

✅ Their presence makes them real witnesses

📖 God provided witnesses beyond Elisha alone

---

## 🧥 Took His Mantle, And Wrapped It Together

A mantle was a heavy outer cloak worn by a prophet.

First Kings chapter nineteen already showed Elijah throwing this same mantle over Elisha when he first called him.

Wrapping it together here turns the cloak into something more like a rolled up rod.

This same garment is about to become the sign of who inherits Elijah's authority.

The cloak has carried meaning since the very first day these two men met.

🧥 Mantle means a heavy outer cloak

🔁 First Kings nineteen already used this cloak

🌀 Wrapping it made it like a rod

📖 This cloak carries Elijah's authority

---

## 🌊 Smote The Waters, And They Were Divided Hither And Thither

This is not a brand new kind of miracle.

Moses parted the Red Sea, and Joshua parted this exact same river generations earlier.

Elijah performing the same sign shows the same God is still at work.

This spot may even be close to where Israel first crossed into the land.

One prophet crossing alone here echoes an entire nation crossing here long before.

🌊 Moses parted the Red Sea first

🏞️ Joshua parted this same river too

🔥 Elijah performs that same kind of sign

📖 The same God still works today

---

## 🥾 They Two Went Over On Dry Ground

Dry ground means the riverbed itself became walkable, not just shallow water.

This matches the exact language used when Israel first crossed the Jordan under Joshua.

The miracle was not partial or symbolic, the ground was fully solid under their feet.

Elijah is about to leave, but the pattern of God opening a path continues.

The same power that once opened a path for a whole nation now opens one for two men.

🥾 Dry ground means a fully solid path

🔁 This matches Israel's crossing under Joshua

💪 The miracle was complete, not partial

📖 The same power still opens the way

---

# SecondKingsTwo 2:9-10
# 🎁 Elisha Asks For A Double Portion
---
## 🎁 Ask What I Shall Do For Thee

Elijah offers Elisha one final request before their time together ends.

This is not a genie granting any wish Elisha can imagine.

Elijah is really asking what kind of successor Elisha wants to become.

The answer Elisha gives will define the next chapter of his whole life.

A parting wish like this one is never really about things, it is about identity.

🎁 Elijah offers one final request

🚫 Not a wish for random things

🧑‍🎓 Really a question about succession

📖 The answer will define Elisha's future

---

## 👶 Let A Double Portion Of Thy Spirit Be Upon Me

Double portion does not mean Elisha wants to be twice as powerful as Elijah.

Deuteronomy chapter twenty one gave the firstborn son a double share of a father's inheritance.

Elisha is asking to be recognized as Elijah's spiritual firstborn, not his rival.

He wants to carry on the work, not outshine the man who trained him.

This is a request for responsibility, not a request for glory.

👶 Double portion was the firstborn's legal share

📜 Deuteronomy twenty one explains that law

🙏 Elisha asks to be Elijah's true heir

📖 He wants responsibility, not glory

---

## 🚫 Thou Hast Asked A Hard Thing

This is not Elijah being reluctant or withholding a gift out of pride.

The double portion was never Elijah's to hand out in the first place.

Only God could actually confirm that kind of spiritual inheritance.

Elijah is honestly telling Elisha the decision is now out of his own hands.

Even a great prophet had limits on what he could personally grant someone else.

🚫 Not reluctance or pride from Elijah

🎁 The gift was never his to give

🙏 Only God could confirm this inheritance

📖 Even prophets have real limits

---

## 👁️ If Thou See Me When I Am Taken

Elijah gives Elisha one clear condition to watch for.

Seeing the actual moment of departure would be the confirming sign.

This is not a test of luck, it depends on Elisha staying close and watching.

The condition explains why Elisha refuses to leave Elijah's side through this whole chapter.

His loyalty back in verses two, four, and six turns out to matter for this.

👁️ Seeing the moment becomes the sign

🎯 Success depends on staying close

🔁 This explains his refusals earlier

📖 His loyalty pays off right here

---

# SecondKingsTwo 2:11-12
# 🔥 Elijah Is Taken Up To Heaven
---
## 🔥 There Appeared A Chariot Of Fire, And Horses Of Fire

Many people picture Elijah riding a flaming chariot straight up into the sky.

The text does not actually say that.

The fiery chariot and horses appear and separate Elijah from Elisha.

The whirlwind, not the chariot, is what actually carries Elijah up.

The fire marks the moment as holy, even if it is not the vehicle itself.

🔥 Fire marks this as a holy moment

🚫 The chariot does not carry him up

🌪️ The whirlwind is the actual means

📖 Fire signals holiness, not transportation

---

## ✂️ Parted Them Both Asunder

Asunder is an old word meaning split apart or separated.

This is the literal, final separation between Elijah and Elisha.

Everything in this chapter has been building toward this exact moment.

Three towns, three tests, and one long walk all end right here.

The separation is sudden, but nothing about it happens without warning.

✂️ Asunder means split apart completely

😢 This is the final separation

🚶 Three towns and tests led here

📖 Nothing about this comes without warning

---

## 🕊️ Elijah Went Up By A Whirlwind Into Heaven

Only two people in the entire Bible are recorded going to heaven without dying first.

Enoch was the other one, back in Genesis chapter five.

Elijah's departure confirms he pleased God the same way Enoch did.

This also explains why Elijah later appears alive on the mount of transfiguration.

Elijah's story does not end with a grave, it ends with an open sky.

🕊️ Only Enoch left earth this way before

📜 Genesis five records Enoch's departure

✨ Elijah later appears alive in the Gospels

📖 His story ends with an open sky

---

## 👑 The Chariot Of Israel, And The Horsemen Thereof

Elisha is not talking about literal war chariots or horses here.

He is calling Elijah Israel's true strength, greater than any army the nation owned.

A king named Joash will use this exact same title for Elisha himself later.

Elisha's cry is really about spiritual protection, not physical vehicles.

Losing Elijah felt like losing Israel's whole defense at once.

👑 Chariot of Israel means true strength

⚔️ Greater than any literal army

🔁 King Joash reuses this title later

📖 Losing Elijah felt like losing protection

---

## 😭 Rent Them In Two Pieces

Rent means torn, and tearing your own clothes was a well known sign of grief.

Genesis and Job both describe the same custom after devastating news.

Elisha is not panicking, he is grieving in the way his whole culture understood grief.

This single act says more than words could at this exact moment.

Even someone about to inherit great power still needed to properly mourn what he lost.

😭 Rent means torn in grief

📜 A well known ancient mourning custom

🤐 Grief needs no words here

📖 Even the chosen heir still mourned

---

# SecondKingsTwo 2:13-15
# 🧥 Elisha Takes Up The Mantle
---
## 🧥 He Took Up Also The Mantle Of Elijah That Fell From Him

The same cloak from verse eight now belongs to Elisha.

Picking it up is Elisha's first act as Elijah's successor.

Nobody hands him a title or gives him a speech.

He simply picks up the responsibility that was left behind.

Leadership here begins with an action, not with a ceremony.

🧥 The same cloak now belongs to Elisha

✋ His first act as successor

🚫 No title or speech is given

📖 Leadership begins with action, not ceremony

---

## 📍 Stood By The Bank Of Jordan

Elisha stands at the exact spot Elijah stood earlier in this chapter.

The same river that opened for Elijah is about to be tested again.

This time Elisha will have to act with the mantle himself.

The setting repeats on purpose, marking a clear before and after.

The river becomes the line between what Elijah did and what Elisha will now do.

📍 Same riverbank as the earlier miracle

🌊 The river is tested again

🧥 Elisha must act with the mantle

📖 The scene marks a before and after

---

## ❓ Where Is The LORD God Of Elijah

Elisha does not call on his own name or his own power.

He asks a real question, not just a dramatic phrase.

The question makes clear Elisha knows the miracle never came from Elijah himself.

It always came from the LORD that Elijah served.

Elisha is asking whether that same God will now work through him too.

❓ A real question, not just drama

🙏 Elisha calls on the LORD, not himself

🔥 The power always came from God

📖 He asks if God will work through him

---

## ✅ They Parted Hither And Thither, And Elisha Went Over

The waters split exactly the same way they did for Elijah.

This is Elisha's answer to his own question in the verse before.

God works through Elisha the same way He worked through Elijah.

The double portion Elisha asked for is already visibly at work.

God confirmed the succession before anyone even had to say a word about it.

🌊 The waters split the same way again

✅ This answers his own question

🔥 God works through Elisha too

📖 The double portion is already visible

---

## 🙇 The Spirit Of Elijah Doth Rest On Elisha

The sons of the prophets from Jericho see the miracle happen from a distance.

They immediately recognize what it means without needing an explanation.

This is the same community introduced back in verse five.

Their bow shows real respect, not just formal politeness.

The transition from Elijah to Elisha is now confirmed by more than his own eyes.

👀 Jericho's prophets witness this from afar

🙇 They bow in genuine respect

🔁 The same group from verse five

📖 The succession is confirmed publicly

---

# SecondKingsTwo 2:16-18
# 🔍 The Search For Elijah
---
## ❓ Lest Peradventure The Spirit Of The LORD Hath Taken Him Up

Peradventure is an old word meaning perhaps or possibly.

The fifty men wonder if God simply set Elijah down somewhere nearby.

Earlier in First Kings, the Spirit of God had carried Elijah to unexpected places.

Their guess is reasonable, based on what they had seen God do before.

They simply do not know yet that this departure was final.

❓ Peradventure means perhaps or possibly

🌬️ They wonder if God moved him nearby

📜 First Kings showed that happening before

📖 They do not yet know this was final

---

## 🚫 Ye Shall Not Send

Elisha already knows the search will find nothing.

He saw exactly what happened and does not need confirmation.

His answer is short, direct, and confident.

Certainty like this is hard for others to simply accept secondhand.

Elisha's calm here shows he has already made peace with what he witnessed.

🚫 Elisha knows the search is pointless

👁️ He personally witnessed the truth

🗣️ His answer is short and direct

📖 He has already made peace with it

---

## 😔 When They Urged Him Till He Was Ashamed

The fifty men keep pressing until Elisha finally gives in.

Ashamed here means the pressure became too uncomfortable to keep refusing.

Elisha allows the search even though he is certain it will fail.

Sometimes leading well means letting people prove things to themselves.

Elisha's patience here matters as much as his certainty did before.

😔 Ashamed means the pressure grew uncomfortable

🔁 He finally allows the search

🙏 He lets them learn for themselves

📖 Patience matters as much as certainty

---

## 📆 They Sought Three Days, But Found Him Not

Three days of searching was a normal length of time before giving up hope.

The number confirms the search was thorough, not half hearted.

Elisha was right from the very beginning.

The failed search becomes its own quiet proof of the miracle.

What could not be found on earth had already gone somewhere they could never reach.

📆 Three days was a normal search period

🔎 The search was thorough, not careless

✅ Elisha was right from the start

📖 The failed search proves the miracle

---

# SecondKingsTwo 2:19-22
# 💧 Elisha Heals The Water
---
## 🏞️ The Situation Of This City Is Pleasant

The men of Jericho are not complaining about everything.

The city's location itself was genuinely good, close to water and fertile land.

Their real problem was not the location, it was the water supply itself.

Even a well placed city can still have a serious hidden flaw.

Elisha's first miracle as leader responds to a real, practical need.

🏞️ Jericho's location itself was good

💧 The real problem was the water

🩹 Even good places can have flaws

📖 Elisha responds to a practical need

---

## 🚫 The Water Is Naught, And The Ground Barren

Naught is an old word meaning worthless or no good.

This was not a small inconvenience, crops could not grow and water was unsafe.

Some connect this lingering problem back to Jericho's old curse from Joshua's day.

A cursed history still shaped daily life for the people living there now.

This miracle is about to reverse something that had lasted for generations.

🚫 Naught means worthless or no good

🌾 Crops and drinking water both suffered

📜 Possibly linked to Jericho's old curse

📖 Generations of harm are about to end

---

## 🏺 Bring Me A New Cruse, And Put Salt Therein

A cruse was a small clay jar used for holding liquid.

Elisha specifically asks for a new one, never used before.

A brand new container kept the act free from anything old or unclean.

Every detail here is deliberate, nothing about this miracle is careless.

Even the choice of container carried meaning before the miracle even happened.

🏺 Cruse means a small clay jar

✨ A new jar avoided old impurity

🎯 Every detail here is deliberate

📖 Meaning starts before the miracle itself

---

## 🧂 I Have Healed These Waters

A small handful of salt cannot naturally purify a whole spring.

This was never meant to work like a household remedy.

Salt in scripture often stood for purity and lasting covenant faithfulness.

The real healing came from the LORD's word, not from the salt itself.

Elisha names the true source clearly, so nobody mistakes the method for the miracle.

🧂 Salt alone could not purify a spring

📖 Salt symbolized purity and covenant

🙏 The true healing came from the LORD

➡️ Elisha names the real source clearly

---

## 📆 So The Waters Were Healed Unto This Day

Unto this day tells the reader this healing was still true when the book was written.

This was not a temporary fix that faded over time.

A lasting result gave lasting proof that Elisha's word carried real authority.

The double portion Elisha asked for is now visible in a second miracle.

One healed spring became permanent evidence of who God was now working through.

📆 Unto this day means it lasted

🔒 Not a temporary or fading fix

🔥 Lasting proof of Elisha's authority

📖 A second miracle confirms the first

---

# SecondKingsTwo 2:23-25
# 🐻 The Mockery At Bethel
---
## 👦 There Came Forth Little Children Out Of The City

Little children in this phrase likely describes a large group of young people, not toddlers.

The Hebrew word covers a wide range of ages, including older boys and young men.

A crowd large enough to be mauled by two bears was not a handful of small kids.

This detail matters for understanding what actually happens later in this story.

This appears to be an organized gang, not a few innocent children playing nearby.

👦 Likely a large group, not toddlers

📖 The Hebrew word covers a wide age range

👥 A crowd large enough to matter

➡️ This shapes how the rest reads

---

## 🐄 Go Up, Thou Bald Head

This insult is not simply mocking Elisha's appearance.

Bethel was one of the cities where King Jeroboam had set up a golden calf.

Go up likely mocks Elijah's recent ascension, daring Elisha to disappear the same way.

This is organized contempt for the LORD's prophet from a city already committed to idolatry.

The mockery targets God's power, not just one man's bald head.

🐄 Bethel already worshiped a golden calf

🌪️ Go up likely mocks Elijah's ascension

😠 This is organized contempt for God

📖 The target is God, not baldness

---

## 🧍 He Turned Back, And Looked On Them, And Cursed Them

Elisha does not lash out in a moment of quick anger.

He turns, looks, and then speaks a formal curse in the LORD's name.

This was a deliberate act, not an emotional overreaction.

Cursing in the LORD's name meant Elisha was asking God to act, not himself.

The punishment that follows comes from God's judgment, not from Elisha's temper.

🧍 Elisha turns and looks deliberately

🗣️ He curses in the LORD's name

🙏 He asks God to act, not himself

📖 The judgment is God's, not his temper

---

## 🐻 Two She Bears Out Of The Wood

Bears actually lived in the wooded hill country around ancient Israel.

This detail is not a fantasy element added for effect.

A mother bear defending territory was already known as one of the most dangerous animals.

The punishment fits the danger already present in that landscape.

God used something ordinary to that region to carry out a very serious judgment.

🐻 Bears were real animals in that region

🌲 Not a fantasy detail added for effect

⚠️ Mother bears were already known as dangerous

📖 God used something ordinary for judgment

---

## 🩸 Tare Forty And Two Children Of Them

Tare is an old word meaning tore or mauled.

Forty two is a specific, counted number, not a vague exaggeration.

This is one of the harder passages in the Bible to read.

The text does not soften it or explain away how severe it was.

Scripture records this honestly instead of hiding the weight of what happened.

🩸 Tare means tore or mauled

🔢 Forty two is a specific count

😬 One of the harder passages to read

📖 Scripture records it honestly, without softening

---

## 🏔️ He Went From Thence To Mount Carmel

Mount Carmel was the exact place Elijah defeated the prophets of Baal in First Kings.

Elisha now travels to that same significant location as he begins his own ministry.

The mountain of Elijah's greatest public victory now becomes part of Elisha's own story.

This links the beginning of Elisha's work back to Elijah's greatest triumph.

Elisha's ministry starts by walking through the same ground Elijah once claimed for God.

🏔️ Carmel was Elijah's site of victory

🔥 Site of the contest with Baal's prophets

🔁 Now becomes part of Elisha's story too

📖 Elisha walks ground Elijah once claimed

---

## 🏛️ From Thence He Returned Unto Samaria

Samaria was the capital city of the northern kingdom of Israel.

This is where the king and the seat of national power were located.

Elisha's ministry now moves from remote wilderness towns into the center of national life.

The chapter that began with a quiet walk from Gilgal ends at the nation's capital.

Elisha's influence is about to reach the highest levels of the kingdom.

🏛️ Samaria was Israel's capital city

👑 The seat of the king's power

📈 Elisha's reach grows from here

📖 His influence reaches the whole kingdom
`.trim();

export const SECOND_KINGS_TWO_PERSONAL_SECTIONS = parseSecondKingsTwoRawNotes(SECOND_KINGS_TWO_RAW_NOTES);
