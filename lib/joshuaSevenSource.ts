export type JoshuaSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaSevenRawNotes(rawText: string): JoshuaSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 7:${startVerse}` : `Joshua 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Joshua 7 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_SEVEN_RAW_NOTES = `# Joshua 7:1-5
# 🚨 Trespass And Defeat At Ai
---
## 😤 Committed A Trespass In The Accursed Thing

A trespass means breaking a clear command from God.

This was not an accident or a misunderstanding.

Joshua six already warned Israel to stay away from anything devoted to the Lord in Jericho.

One man ignored that warning and it cost the whole nation.

😤 Trespass means breaking a clear command
📖 Joshua six already gave this warning
👤 One man's choice reached the whole camp
➡️ Sin here was not private

---

## 👨‍👦 Achan, The Son Of Carmi, The Son Of Zabdi, The Son Of Zerah

The text names four generations before it even names the sin.

Carmi was Achan's father, Zabdi his grandfather, and Zerah his great grandfather.

This much detail is unusual for a single soldier in the story.

The full lineage matters later, once Israel has to search family by family to find him.

👨‍👦 Four generations are named at once
🔍 That much detail is unusual
🎯 It matters later in the search
📖 Genealogy sets up the rest of the chapter

---

## 👑 Of The Tribe Of Judah

Judah was the leading tribe among the twelve.

Judah had already been promised the strongest blessing back in Genesis forty nine.

That makes this sin more shocking, not less.

The tribe expected to lead the conquest is the one that broke the covenant first.

👑 Judah was the leading tribe
📜 Genesis forty nine blessed Judah highest
😳 The strongest tribe sinned first
➡️ Leadership does not guarantee obedience

---

## 🔥 The Anger Of The Lord Was Kindled

Kindled is an old way of describing a fire starting.

God's anger here is pictured the same way, catching and beginning to burn.

This happens immediately after Achan's sin, before Israel even marches to Ai.

The defeat that follows is not random bad luck.

🔥 Kindled means a fire starting
😠 God's anger caught like a flame
⏱️ This came before the battle at Ai
📖 The defeat was not bad luck

---

## 🕵️ Sent Men From Jericho To Ai, Which Is Beside Bethaven

Joshua sends scouts to Ai just like he did to Jericho in chapter two.

Bethel means house of God, a name Jacob gave the place generations earlier.

Bethaven sat close by, and its name means house of nothing or house of vanity.

This time no prayer or request to the Lord is mentioned before the scouting begins.

🕵️ Scouts go to Ai, like Jericho
🏠 Bethel means house of God
🚫 Bethaven means house of nothing
📖 No prayer is mentioned this time

---

## 📋 Let Not All The People Go Up

The spies recommend sending only a small force against Ai.

They judge the city weak based on how small it looked.

Nobody asks the Lord whether that judgment is correct.

The plan sounds reasonable and turns out to be wrong.

📋 Spies recommend a small force
👀 Their judgment is based on appearance
🙏 Nobody asks the Lord first
➡️ Reasonable plans can still be wrong

---

## 🔢 About Two Or Three Thousand Men

Only a small fraction of Israel's army marches to Ai.

At Jericho the whole nation marched together around the walls.

Here a few thousand men go up while most of the camp stays behind.

The scale of this plan already looks different from what worked before.

🔢 Two or three thousand men march
🏰 Jericho used the whole nation
📉 Ai's plan used a small fraction
➡️ A smaller plan skipped a bigger lesson

---

## 🏃 They Fled Before The Men Of Ai

This is Israel's first defeat since crossing the Jordan River.

Jericho fell in one obedient day.

Ai sends Israel's men running instead.

The soldiers who marched confidently into battle now turn and run from a small city.

Nothing outside of Achan's sin explains this sudden reversal.

🏃 Israel's first defeat since the Jordan
🏆 Jericho fell in just one day
😱 A small city routs Israel's men
📖 Achan's sin explains the reversal

---

## 🩸 Smote Of Them About Thirty And Six Men

Thirty six men die in this single failed attack, the first Israelite deaths inside the promised land.

The men of Ai chase Israel's soldiers downhill toward a place called Shebarim.

Going down here means a real retreat down a slope.

It was not an orderly withdrawal.

A small number of casualties still marked a devastating first defeat.

🔢 Thirty six men die at Ai
🩸 The first deaths inside the land
⛰️ Israel's men were chased downhill
📖 A small number still meant a real defeat

---

## 💧 The Hearts Of The People Melted, And Became As Water

This exact idiom already appeared in Joshua two.

Rahab told the spies that the Canaanites' hearts melted with fear of Israel.

Now that same fear falls on Israel instead of their enemies.

One man's hidden sin reversed the fear God had placed on the nations.

💧 Melted like water means overwhelming fear
🔁 Rahab used this same phrase in chapter two
🔄 The fear now falls on Israel
📖 Achan's sin reversed the advantage

# Joshua 7:6-9
# 😥 Joshua's Grief And Desperate Prayer
---
## ✂️ Joshua Rent His Clothes

Rent means torn, an old word for ripping something apart.

Tearing your own clothes was a physical way of showing grief without needing any words.

Joshua does this the moment he understands Israel has been defeated.

This is a leader publicly showing that the loss has struck him personally.

✂️ Rent means torn
😭 Torn clothes showed grief without words
👑 Joshua showed this grief publicly
➡️ A leader felt the loss personally

---

## 🌆 Fell To The Earth Upon His Face Before The Ark Of The Lord Until The Eventide

Eventide is an old word for evening.

Joshua stays face down before the ark for an entire day, not just a few minutes.

This was not a quick prayer said in passing.

The length of time shows how completely the defeat had shaken him.

🌆 Eventide means evening
⏳ Joshua stayed down all day
🙇 This was not a quick prayer
📖 The length showed real grief

---

## 🌫️ The Elders Of Israel, And Put Dust Upon Their Heads

Putting dust on the head was another common way to show grief in this culture.

Joshua does not grieve alone.

The elders, the leaders representing every tribe, mourn with him in the same posture.

The whole nation's leadership owns this failure together, not just one man.

🌫️ Dust on the head showed grief
👥 The elders joined Joshua's mourning
🤝 Leadership shared this failure together
📖 Grief here was corporate, not private

---

## 😢 Alas, O Lord God

Alas is an old word used to open a cry of distress or grief.

Joshua speaks directly to God instead of blaming his soldiers or his spies.

His prayer begins as a raw, honest complaint.

There is no attempt here to sound composed or in control.

😢 Alas opens a cry of distress
🗣️ Joshua speaks straight to God
🙅 He does not blame his men
➡️ Honest prayer does not need to sound composed

---

## 🔁 Wherefore Hast Thou At All Brought This People Over Jordan

This question echoes complaints Israel's own people made years earlier in the wilderness.

Back then the people accused Moses of leading them out of Egypt just to die.

Now Joshua, of all people, asks a very similar question about crossing the Jordan.

Even a faithful leader can echo the same doubts he once had to correct in others.

🔁 This echoes old wilderness complaints
📜 The people once blamed Moses this way
😳 Now Joshua asks something similar
📖 Doubt can reach even faithful leaders

---

## 😔 Would To God We Had Been Content, And Dwelt On The Other Side Jordan

Joshua says out loud that he almost wishes they had never crossed into Canaan at all.

This is a striking thing for the conquest's own leader to say.

One battle lost is enough to make him question the entire mission.

Grief can distort perspective even for someone who has already seen God work.

😔 Joshua wishes they had stayed put
😳 A striking admission from the leader
⚖️ One loss shook his whole outlook
📖 Grief can distort even strong faith

---

## 🔄 When Israel Turneth Their Backs Before Their Enemies

Turning their backs simply means running away.

Just one chapter earlier, Israel's enemies were the ones melting with fear.

Now Israel is the side fleeing in retreat.

Joshua names the shame of this reversal directly, without softening it.

🏃 Turned their backs means fled
🔄 Israel is now the fearful side
😳 Joshua names the shame plainly
📖 Roles had completely reversed

---

## ⚠️ Cut Off Our Name From The Earth

Joshua fears total national destruction, not just one lost battle.

If the surrounding nations gain confidence, they could surround and wipe out Israel entirely.

This fear reaches all the way back to God's promise to make Israel a great nation.

One hidden sin now threatens to undo generations of promise.

⚠️ Joshua fears total destruction
🌍 Confident enemies could surround Israel
📜 This threatens God's older promise
📖 One sin threatened generations of promise

---

## 🙏 What Wilt Thou Do Unto Thy Great Name

Joshua's final appeal is not really about Israel at all.

He argues that God's own reputation is tied to what happens to His people.

Moses used this same kind of argument back in Exodus and Numbers.

Joshua is not commanding God, he is reminding God of what He already promised to protect.

🙏 Joshua appeals to God's reputation
🔁 Moses used this same argument before
🛡️ God's name was tied to Israel
➡️ This was a reminder, not a demand

# Joshua 7:10-12
# ⚖️ The Lord's Rebuke
---
## 🛑 Wherefore Liest Thou Thus Upon Thy Face

This is not God being unkind to Joshua's grief.

God is telling him that lying face down will not fix what actually happened.

Grief has a place, but this moment calls for action instead.

Sin needs to be dealt with directly, not just mourned over.

🛑 God interrupts the mourning
😢 Grief alone will not fix this
🏃 Action was needed instead
📖 Sin required a direct response

---

## 👥 Israel Hath Sinned, And They Have Also Transgressed My Covenant

Only one man actually took the accursed thing.

God still says all of Israel has sinned.

In this culture, the whole community was treated as one body under the same covenant.

One person's hidden sin was never only that person's problem.

👤 Only Achan actually took the thing
👥 God still blames all of Israel
🤝 The nation shared one covenant
📖 Hidden sin was never private

---

## 🎭 Stolen, And Dissembled Also

Dissembled is an old word for hiding the truth through deception.

Achan did not just take something forbidden.

He also lied about it, or at least stayed silent long enough to let the lie stand.

Two separate sins are named here, not just one.

🎭 Dissembled means hiding the truth
🤥 Achan also lied or stayed silent
✌️ Two sins are named, not one
📖 Theft and deception often travel together

---

## 🎒 Put It Even Among Their Own Stuff

Stuff here simply means personal belongings or baggage.

Achan mixed something devoted to God in with his own ordinary things.

That detail shows how deliberately he tried to hide what he had done.

Nothing about this was a careless accident.

🎒 Stuff means personal belongings
🙈 Achan hid it among ordinary items
🧠 This was deliberate, not careless
➡️ Hiding sin usually takes planning

---

## 🚫 Because They Were Accursed

Israel's whole army loses its edge in battle, not because of weak soldiers.

The text says plainly that the reason was the accursed thing hidden in the camp.

Military strength was never really the source of Israel's victories.

Removing one hidden sin mattered more than any battle strategy.

⚔️ Israel's army was not weak
🚫 The accursed thing caused the loss
💪 Victory never came from strength alone
📖 One hidden sin outweighed strategy

---

## ⚠️ Neither Will I Be With You Any More, Except Ye Destroy The Accursed From Among You

This is the most serious sentence in the entire chapter.

God ties His own presence directly to Israel's obedience.

Without God's presence, none of Israel's future battles could succeed.

The fix is specific and required, remove the accursed thing completely.

⚠️ God's presence is now at stake
🛡️ Presence, not numbers, won every battle
🚫 The fix is specific and required
📖 Obedience had to come before victory

# Joshua 7:13-15
# 🌙 Sanctify Yourselves For Tomorrow
---
## 🧼 Up, Sanctify The People, And Say, Sanctify Yourselves Against To Morrow

Sanctify means to set apart as ritually clean before meeting with God.

This same word describes how Israel prepared before crossing the Jordan back in chapter three.

God does not deal with this crisis that same hour.

He sets the whole process for the next day instead.

A full night passes between the rebuke and the search for Achan.

🧼 Sanctify means set apart as clean
🔁 The same word appeared in chapter three
🌙 The process waits until tomorrow
📖 Even urgent problems can wait for order

---

## 🚧 Thou Canst Not Stand Before Thine Enemies, Until Ye Take Away The Accursed Thing

God repeats the exact reason for the defeat a second time.

The repetition makes sure nobody in Israel could later claim confusion about the cause.

Nothing changes in Israel's military position until this one problem is solved.

The solution has to come before the next battle, not during it.

🔁 God repeats the reason plainly
❓ No room is left for confusion
🚧 Nothing changes until this is fixed
📖 The solution comes before the next fight

---

## 🔢 Ye Shall Be Brought According To Your Tribes

Israel narrows down the search in four stages, from tribe, to family, to household, to one man.

Each stage gets smaller than the one before it.

This structure mirrors how Israelite society itself was organized.

The process was thorough on purpose, leaving no easy place to hide.

🔢 Four stages narrow the search
📉 Each stage gets smaller
🏛️ This mirrors Israel's own structure
📖 Thoroughness left no place to hide

---

## 🎲 The Household Which The Lord Shall Take

The Lord shall take describes the process of casting lots.

Casting lots let God choose an outcome that people could not predict or control.

Nobody could accuse Joshua of picking a family out of favoritism or suspicion.

The method itself protected the fairness of the whole search.

🎲 The Lord shall take means casting lots
🎯 The outcome could not be predicted
⚖️ Nobody could claim favoritism
📖 The method protected fairness

---

## 🔥 Shall Be Burnt With Fire, He And All That He Hath

The penalty announced here matches the fire that will end the chapter.

This penalty reaches the guilty man along with what belongs to him.

The severity was meant to match how seriously the accursed thing had been treated.

God had already said in chapter six that taking it would bring real trouble.

🔥 The penalty involves fire
⚖️ It reaches what belongs to him too
🚨 Severity matched the seriousness of the sin
📖 Chapter six already warned of this trouble

---

## 🙈 He Hath Wrought Folly In Israel

Folly here does not mean a simple, small mistake.

It is a phrase the Bible uses elsewhere for a serious moral disgrace, not silliness.

Achan's sin was not treated as bad luck or an honest slip.

It was treated as an act that shamed the entire nation.

🙈 Folly here means a moral disgrace
🚫 Not a small mistake or bad luck
😳 It shamed the whole nation
📖 Words in scripture carry real weight

# Joshua 7:16-18
# 🎯 The Lot Falls On Achan
---
## 🌅 Joshua Rose Up Early In The Morning

Rising early was already a habit Joshua showed back in chapter six, before Jericho fell.

He does not wait for the nation to gather on its own.

A leader who moves first tends to shape how everyone else responds.

This same discipline shows up again in a much harder moment.

🌅 Rising early was already Joshua's habit
👣 He leads before the nation gathers
🔁 Chapter six showed this pattern too
📖 Discipline showed up even in hard moments

---

## 🎯 The Tribe Of Judah Was Taken

Out of twelve tribes, the lot lands on Judah first.

Judah was the tribe already promised the greatest blessing in Genesis forty nine.

This narrows an entire nation down to one tribe in a single moment.

The tension in the room would have been enormous.

🎯 The lot lands on Judah
👑 Judah held the greatest blessing
😬 Tension would have been enormous
📖 One tribe narrowed from twelve

---

## 👪 The Family Of The Zarhites

The Zarhites were descended from Zerah, a name that already appeared back in verse one.

Zerah was one of the twin sons born to Judah and Tamar in Genesis thirty eight.

That earlier story already involved deception within the same family line.

The lot now points straight at that same branch of Judah's family tree.

👪 Zarhites descend from Zerah
📜 Zerah's birth is told in Genesis thirty eight
🎯 The lot points at this same family
📖 That story already involved deception

---

## 👴 Zabdi Was Taken

Zabdi is Achan's own grandfather, already named back in verse one.

The reader already knows exactly where this search is heading.

Everyone in the story, though, is still searching without that knowledge.

The tension comes from watching characters slowly discover what the reader already knows.

👴 Zabdi is Achan's grandfather
📖 Verse one already named him
👀 The reader already knows the outcome
➡️ Suspense comes from what characters do not know

---

## ⚖️ The Son Of Zerah, Of The Tribe Of Judah, Was Taken

The lot finally lands on the exact man named at the very start of the chapter.

Four stages, tribe, family, household, and man, all end at the same person.

Nothing about this process looks random once it reaches its answer.

The precision of the search matches the precision of God's justice.

🎯 The lot lands exactly on Achan
🔢 Four stages end at one man
⚖️ Nothing here looks random
📖 God's justice was precise, not chaotic

# Joshua 7:19-23
# 😔 Achan's Confession And The Evidence
---
## 👴 My Son, Give, I Pray Thee, Glory To The Lord God Of Israel

Calling Achan my son shows Joshua speaking gently, even now.

Give glory to the Lord is an old way of asking someone to tell the full truth.

Confessing honestly was treated as an act of honoring God, not just admitting guilt.

Joshua is inviting Achan toward honesty rather than simply accusing him.

👴 My son shows a gentle tone
🙏 Give glory means tell the truth
📖 Honesty itself honored God
➡️ Joshua invited confession, did not just accuse

---

## 🗣️ Hide It Not From Me

Joshua already knows Achan is guilty because of the lot.

He still asks Achan to say it out loud himself.

A confession spoken freely carries different weight than a fact simply proven by a process.

Truth still needed to be spoken, even after it was already known.

✅ Joshua already knew the answer
🗣️ He still asked Achan to say it
⚖️ Spoken confession carried real weight
📖 Truth mattered even after proof existed

---

## 🗣️ I Have Sinned Against The Lord God Of Israel

Achan does not argue or make excuses once confronted.

His confession is immediate and direct.

This is very different from Adam and Eve's response to sin back in Genesis three.

They shifted blame onto each other.

A clear confession, even coming late, was still better than continued denial.

🗣️ Achan confesses immediately
🚫 No excuses or blame shifting
🔁 This contrasts with Genesis three
📖 A late confession was still real

---

## 🧵 A Goodly Babylonish Garment

Babylonish points to Babylon, a region famous for expensive, finely woven cloth.

A garment like this would have been imported and extremely valuable.

Goodly simply means beautiful or highly desirable.

This was not an ordinary piece of clothing anyone in the camp would have owned.

🧵 Babylonish points to Babylon
💰 The garment was imported and valuable
✨ Goodly means beautiful and desirable
📖 This was not ordinary clothing

---

## ⚖️ Two Hundred Shekels Of Silver, And A Wedge Of Gold Of Fifty Shekels Weight

A shekel was a weight, not a coin.

It was worth about two fifths of an ounce.

Two hundred shekels of silver came to about five pounds.

A wedge of gold means a bar shaped like a tongue.

Fifty shekels of that gold weighed about a pound and a quarter.

⚖️ A shekel was a weight, not a coin
🥈 Two hundred shekels was about five pounds
🥇 Fifty shekels was over a pound of gold
📖 A single tent hid real wealth

---

## 👀 Then I Coveted Them, And Took Them

Achan names the exact order his sin followed, seeing, wanting, and taking.

This same pattern appears all the way back in Genesis three, when Eve looked at the fruit.

Coveting happens quietly, inside the mind, long before any hand moves.

Naming that order honestly is part of what makes this confession real.

👀 Seeing came before wanting
😍 Coveting happened quietly, inside the mind
🖐️ Taking was the final step
📖 Genesis three shows this same pattern

---

## 🕳️ Hid In The Earth In The Midst Of My Tent, And The Silver Under It

Achan buried the stolen items directly beneath his own living space.

Hiding it there kept the goods close without anyone else needing to know the location.

The silver sat even deeper, tucked under the rest of the hidden pile.

Layer by layer, this was a careful, deliberate hiding job, not a rushed one.

🕳️ Buried under his own tent
🤫 Close by, but hidden from others
🥈 Silver sat even deeper in the pile
📖 This hiding was careful, not rushed

---

## 📦 Laid Them Out Before The Lord

The stolen items are not handed quietly to Joshua alone.

They are laid out in front of the entire community.

Laying them before the Lord made this a spiritual matter, not only a legal one.

Public accountability was part of how Israel handled this kind of sin.

📦 Items were displayed publicly
👥 The whole community saw the evidence
⚖️ This was legal and spiritual, both
📖 Accountability here was public

# Joshua 7:24-26
# 🪨 Judgment In The Valley Of Achor
---
## 👴 Took Achan The Son Of Zerah

Achan is called the son of Zerah here instead of the son of Carmi from verse one.

Zerah was his great grandfather, the more distant ancestor of the whole clan.

Using the older family name ties this judgment back to the founding of his tribe's branch.

The shame of this moment reaches back several generations at once.

👴 Zerah was his great grandfather
🏛️ The older name ties to the clan
📜 This links back several generations
📖 Shame here reached beyond one man

---

## 👪 His Sons, And His Daughters, And His Oxen, And His Asses, And His Sheep, And His Tent, And All That He Had

Achan's family and everything he owned are brought to the valley along with him.

The text does not clearly say whether his sons and daughters were executed or only brought as witnesses.

Many readers assume the worst, but the Bible does not spell out that detail here.

What is certain is that sin here reached far beyond just one man's own life.

👪 Family and property are brought together
❓ The text does not clarify their fate
📖 The Bible leaves this detail unclear
➡️ Sin's reach went beyond one life

---

## 😖 Unto The Valley Of Achor

Achor is a word connected to trouble or disaster.

This valley gets its name from what happens to Achan in this very moment.

Centuries later, the prophet Hosea speaks of this same valley becoming a door of hope.

A place named for disaster in Joshua later becomes a symbol of restoration.

😖 Achor connects to trouble
📍 The valley is named for this event
🔮 Hosea later calls it a door of hope
📖 Disaster became a symbol of hope

---

## ⚖️ Why Hast Thou Troubled Us? The Lord Shall Trouble Thee This Day

Joshua's words play directly on the name of the valley, Achor, meaning trouble.

Achan brought trouble on the whole camp through his hidden sin.

Now that same trouble lands back on him personally.

The punishment and the crime are tied together by this one repeated word.

🔁 Trouble echoes the valley's name
😬 Achan brought trouble on the camp
⚖️ That trouble now returns to him
📖 The punishment matched the crime's shape

---

## 🔥 All Israel Stoned Him With Stones, And Burned Them With Fire

This was a public execution carried out by the whole community, not by Joshua alone.

Everyone present took part in carrying out the sentence together.

Communal participation like this made the whole nation share responsibility for removing the sin.

This matched the seriousness God had already placed on the accursed thing back in chapter six.

👥 The whole community carried this out
⚖️ Everyone shared in the responsibility
🔥 Stoning and burning followed together
📖 This matched chapter six's warning

---

## 🪨 Raised Over Him A Great Heap Of Stones Unto This Day

A heap of stones served as a lasting marker in the ancient world.

Jacob and Laban built a similar heap back in Genesis thirty one.

This heap was not a monument of honor.

It stood as a permanent warning about what happens when someone takes what belongs to God.

The phrase unto this day shows the writer expected the heap to still be visible much later.

🪨 A heap of stones marked the spot
🔁 Genesis thirty one used a similar heap
⚠️ This heap warned instead of honored
📖 It remained visible long afterward

---

## ✅ The Lord Turned From The Fierceness Of His Anger

This is the resolution to the anger that first appeared back in verse one.

Removing the accursed thing satisfied what God's justice required.

God's presence and blessing could now return to Israel's camp.

The very next chapter shows Israel finally ready to fight again.

🔥 God's anger began in verse one
✅ Removing the sin satisfied justice
🛡️ God's presence could now return
📖 Chapter eight shows Israel ready again
`.trim();

export const JOSHUA_SEVEN_PERSONAL_SECTIONS = parseJoshuaSevenRawNotes(JOSHUA_SEVEN_RAW_NOTES);
