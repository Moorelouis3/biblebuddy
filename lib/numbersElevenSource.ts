export type NumbersElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersElevenRawNotes(rawText: string): NumbersElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 11:${startVerse}` : `Numbers 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Numbers 11 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_ELEVEN_RAW_NOTES = `# Numbers 11:1-3
# 🔥 Fire At Taberah
---
## 🔥 And When The People Complained, It Displeased The Lord
"Complained" here means grumbling and murmuring, not a specific request. It's the same pattern of complaint that started back in Exodus, only now it happens right after Israel leaves Sinai instead of right after leaving Egypt.
Israel had just spent almost a year camped at Sinai receiving God's law and building His tabernacle (Numbers 10:11-12). Complaining starts again almost the moment they start moving.
🔥 "Complained" means grumbling, not a clear request
🕰️ Comes right after nearly a year of law-giving at Sinai
🔑 Old habits return the moment the journey restarts
---
## 📍 The Fire Of The Lord Burnt Among Them...In The Uttermost Parts Of The Camp
The fire didn't strike the whole camp at once. It hit the outer edges first, the parts farthest from the tabernacle at the center.
This lines up with a detail later in the chapter: a "mixt multitude" of non-Israelites likely camped near the edges, and they're named as the ones who start the next complaint in verse 4.
🔥 A targeted judgment, not a random or total one
📍 Hit the camp's outer edges, farthest from the tabernacle
🔑 Possibly tied to the "mixt multitude" mentioned next
---
## 🙏 The People Cried Unto Moses; And When Moses Prayed Unto The Lord, The Fire Was Quenched
This is a pattern readers have already seen in Exodus: the people panic, they run to Moses, and Moses prays on their behalf.
Moses' role as go-between isn't new here. It's the same job he's had since the plagues in Egypt, and it will keep showing up for the rest of the wilderness years.
🙏 A repeated pattern: panic, then Moses intercedes
🔁 The same role Moses has held since the Egypt plagues
🔑 God listens to Moses' prayer immediately
---
## 🗺️ He Called The Name Of The Place Taberah
Taberah means "burning" in Hebrew. Naming a location after what happened there is a habit that shows up again and again in the wilderness (Massah and Meribah in Exodus 17 are two more examples).
These names work like permanent markers, so that every time Israel passes by or hears the name again, they remember exactly what happened and why.
🔥 Taberah means "burning" in Hebrew
🗺️ Wilderness places are often named after events, not geography
🔑 A permanent memory marker for future generations

# Numbers 11:4-9
# 🥒 Craving The Food Of Egypt
---
## 🚶 The Mixt Multitude That Was Among Them
This is a group of non-Israelites who left Egypt together with Israel during the Exodus (Exodus 12:38 calls them a "mixed multitude" too). They weren't part of the covenant people by birth, but they traveled along with everyone else.
The text singles them out as the ones who start "lusting" first, with the rest of Israel picking up the complaint right after them.
🚶 Non-Israelites who left Egypt alongside Israel
📖 Mentioned back in Exodus 12:38 at the actual Exodus
🔑 They're named as where this specific complaint starts
---
## 😤 Fell A Lusting
"Lusting" here means a strong, uncontrolled craving for food, not anything sexual. It's a sudden, intense appetite that spreads through the camp like a mood.
The word choice makes clear this isn't a reasonable request for variety. It's described as an overwhelming, almost uncontrollable desire.
🍖 Means a strong craving, specifically for food here
😤 Described as sudden and hard to control
🔑 Sets the emotional tone for the whole complaint
---
## 🍖 Who Shall Give Us Flesh To Eat?
The specific complaint is about meat, not food in general. Israel already has bread from heaven every single morning, the manna, so this isn't about hunger.
It's about wanting something different from what God is faithfully providing, which is what makes the complaint sting as ingratitude rather than a genuine need.
🍖 A craving for meat specifically, not general hunger
🍞 They already have daily bread from heaven, the manna
🔑 A complaint about variety dressed up as a need
---
## 🐟 We Remember The Fish, Which We Did Eat In Egypt Freely
"Freely" means without cost, not without effort. The Nile River was full of fish, so it really was cheap and easy to get there.
What the people leave out is that they ate this "free" fish as slaves under Pharaoh (Exodus 1:13-14). Their memory of Egypt is selective, keeping the good and erasing the forced labor.
🐟 "Freely" means cheap and easy to get, from the Nile
⛓️ Leaves out that they ate it while enslaved
🔑 A one-sided, rosy memory of Egypt
---
## 🥒 The Cucumbers, And The Melons, And The Leeks, And The Onions, And The Garlick
These are all real garden vegetables that grew easily along the Nile's irrigated fields in Egypt. None of them need much explaining beyond that they were common, everyday produce.
Listing five specific foods by name makes the complaint feel vivid and detailed, almost like the people can still taste them, compared to the plain manna in front of them now.
🥒 Common vegetables grown in Egypt's irrigated fields
📝 A specific, detailed list, not a vague memory
🔑 Vividness makes the manna feel duller by comparison
---
## 😔 Our Soul Is Dried Away
This is a Hebrew idiom for total exhaustion and emptiness, not just an empty stomach. "Soul" here means the whole person, body and spirit together.
It's a dramatic way of saying life itself feels drained out of them, over a food complaint. The intensity of the language shows just how much they've let this craving take over.
😔 An idiom for whole-person exhaustion, not just hunger
🫀 "Soul" means the whole person, not just the stomach
🔑 Dramatic language for what is really a food complaint
---
## 🍞 There Is Nothing At All, Beside This Manna
This claim isn't fair to what's actually happening. God has provided fresh manna every single morning without fail since Exodus 16, an ongoing daily miracle they've apparently stopped noticing.
Calling a reliable, miraculous food source "nothing at all" shows how quickly people can stop being amazed by something once it becomes routine.
🍞 Ignores that manna has never once failed to appear
😐 Shows how routine can erase amazement at a miracle
🔑 An unfair claim dressed up as an honest complaint
---
## 🌾 The Manna Was As Coriander Seed, And The Colour Thereof As The Colour Of Bdellium
This matches almost exactly how manna is described back in Exodus 16:31: small, round, and pale like a light-colored resin called bdellium. Coriander seed gives a sense of the actual size.
The narrator pauses here to describe manna carefully, almost as if reminding the reader, and the complaining people, what a strange, wonderful substance this really is.
🌾 Matches the description already given in Exodus 16:31
💎 Bdellium is a pale, light-colored natural resin
🔑 A careful description of something the people are dismissing
---
## ⚒️ Ground It In Mills, Or Beat It In A Mortar...Baked It In Pans, And Made Cakes
Manna wasn't eaten raw straight off the ground. People had to process it first, grinding or pounding it, then cooking it into cakes, real work every single day.
This quietly undercuts the complaint. The people aren't rejecting manna because it takes no effort. They're rejecting it because they're bored of it, even though it still requires real labor to prepare.
⚒️ Had to be ground or pounded, then baked, like real grain
👩‍🍳 Daily preparation work, not effortless free food
🔑 Undercuts the idea that manna itself was the problem
---
## 🫒 The Taste Of It Was As The Taste Of Fresh Oil
Exodus 16:31 describes manna's taste as being like honey wafers. Here it's compared to fresh oil instead. Both descriptions can be true at once, describing a rich, satisfying taste rather than a bland one.
Whichever comparison a reader focuses on, the point stands: manna wasn't flavorless survival food. It was genuinely good, which makes the complaint even harder to justify.
🫒 Compared to fresh oil here, honey wafers in Exodus 16:31
😋 Both descriptions point to a genuinely rich taste
🔑 Makes the complaint about "nothing to eat" less fair
---
## 🌙 When The Dew Fell Upon The Camp In The Night, The Manna Fell Upon It
This is a small, easy-to-miss detail: manna arrived gently overnight, together with the dew, like a quiet daily gift rather than a dramatic event.
The quietness of the miracle may be part of why it stopped feeling miraculous to the people. Something that happens every single night without fail is easy to take for granted.
🌙 Arrived quietly overnight, together with the dew
😴 A daily miracle easy to stop noticing
🔑 Faithfulness can look ordinary if it never stops

# Numbers 11:10-15
# 😩 Moses Reaches His Breaking Point
---
## 😭 Every Man In The Door Of His Tent
This detail shows the weeping wasn't private. Every family was crying out loud, right at their own tent entrance, where everyone else could see and hear it.
A whole camp visibly falling apart at once creates a completely different atmosphere than a few isolated complaints. Moses is surrounded by it on every side.
😭 Public weeping, not private grumbling
⛺ Happening at every single family's tent door
🔑 Moses is surrounded by the mood on all sides
---
## 🔥 The Anger Of The Lord Was Kindled Greatly; Moses Also Was Displeased
Two different reactions are named side by side here: God's anger at the people's ingratitude, and Moses' own frustration on top of it.
Moses isn't just a calm mediator standing between an angry God and a complaining people. He's caught in the middle and genuinely worn down himself.
🔥 Both God's anger and Moses' frustration, named together
😤 Moses isn't a calm outsider here, he's worn down too
🔑 Sets up the raw honesty of his prayer that follows
---
## 😩 Wherefore Hast Thou Afflicted Thy Servant?
This is Moses speaking to God with real, raw honesty, almost like an accusation. He's asking God directly why this leadership job feels like punishment.
The Bible allows this kind of honest complaint straight to God. It shows up again later in Psalms and in prophets like Jeremiah, who also brought raw frustration straight to God instead of hiding it.
😩 A raw, almost accusatory question aimed at God
🗣️ Honest complaint prayed straight to God, not hidden
🔑 A pattern that continues later in Psalms and Jeremiah
---
## 😔 Wherefore Have I Not Found Favour In Thy Sight
Moses feels like this heavy burden must mean he's done something wrong or fallen out of God's good graces, even though nothing in the story says that.
This is an emotional read on his situation, not a theological fact. Feeling punished and actually being punished aren't always the same thing.
😔 Moses feels punished, though nothing says he actually is
💭 An emotional read on the situation, not a stated fact
🔑 Exhaustion can distort how someone reads their own life
---
## ⚖️ That Thou Layest The Burden Of All This People Upon Me
"Burden" is a weight metaphor for responsibility, the emotional and practical load of leading over 600,000 complaining people.
Moses names this weight directly instead of just quietly enduring it, and it becomes the exact word God responds to a few verses later.
⚖️ "Burden" pictures leadership as a physical weight
🗣️ Moses names the weight instead of silently carrying it
🔑 The exact word God answers directly in verse 17
---
## ❓ Have I Conceived All This People? Have I Begotten Them?
These are rhetorical questions with an obvious answer: no. Moses isn't Israel's father, and he didn't create this nation.
He's pointing out that the people belong to God by covenant promise, so providing for them ultimately isn't a job Moses can be expected to do alone, on his own strength.
❓ Rhetorical questions with an obvious "no" answer
👪 Israel belongs to God by covenant, not to Moses
🔑 Points responsibility back toward God, not away from it
---
## 👶 Carry Them In Thy Bosom, As A Nursing Father Beareth The Sucking Child
"Nursing father" is an unusual, vivid image: a father carrying and comforting a nursing infant the way a mother normally would.
Moses feels like he's expected to provide this kind of constant, tender care for a whole nation, a role he never signed up to fill and doesn't feel equipped for.
👶 A vivid image of a father doing a nursing mother's job
😩 Moses feels expected to give this kind of constant care
🔑 A role he feels unequipped and unwilling to fill alone
---
## 📜 Unto The Land Which Thou Swarest Unto Their Fathers
This is a callback to the promise God made to Abraham, Isaac, and Jacob generations earlier, starting in Genesis 12:7, not a promise Moses personally made.
Moses is reminding God that this whole journey was God's idea and God's promise, so the responsibility for keeping it ultimately belongs to God too.
📜 Points back to God's promise to Abraham in Genesis 12:7
🙏 A promise God made, not one Moses personally made
🔑 Responsibility for the promise belongs to its maker
---
## 🍖 Whence Should I Have Flesh To Give Unto All This People?
This is a genuine, practical question about impossible logistics. Feeding meat to over 600,000 people isn't something any single leader could arrange.
The scale of the problem sets up the math Moses spells out a few verses later, when he lists exactly why this demand seems impossible to meet.
🍖 A real question about impossible logistics
🔢 Sets up the specific math Moses gives later
🔑 Not rhetorical exaggeration, a genuine practical concern
---
## 😮‍💨 I Am Not Able To Bear All This People Alone, Because It Is Too Heavy For Me
"Heavy" repeats the same weight idea as "burden" a few verses earlier. Moses is saying plainly that this load has become more than one person can carry.
This isn't Moses failing at his job. It's an honest admission that no single human being was ever meant to carry a whole nation's needs by himself.
⚖️ "Heavy" repeats the same weight image as "burden"
😮‍💨 An honest admission of a real human limit
🔑 Not failure, just an accurate description of the load
---
## 😰 Kill Me, I Pray Thee, Out Of Hand
This is a shocking, desperate request. Moses would rather die immediately than keep carrying this burden any longer.
This isn't the only time a faithful leader in the Bible reaches this point. Elijah says something very similar in 1 Kings 19:4, showing this kind of total burnout isn't a sign of weak faith.
😰 A shocking, desperate request to end his own life
🔥 Elijah says something almost identical in 1 Kings 19:4
🔑 Total burnout, not a sign of weak or failed faith
---
## 😞 Let Me Not See My Wretchedness
"Wretchedness" means ongoing trouble or misery, not personal sin or guilt. Moses is asking to be spared from watching more of this suffering play out.
It's the final line of a prayer that's completely honest about how overwhelmed Moses feels, with no attempt to sound composed or put-together for God.
😞 "Wretchedness" means ongoing trouble, not personal sin
🙏 The honest, unfiltered end of a raw prayer
🔑 No attempt to sound composed in front of God

# Numbers 11:16-20
# 👴 Seventy Elders And A Month Of Meat
---
## 🔢 Gather Unto Me Seventy Men Of The Elders
Seventy is a meaningful number here, echoing the seventy elders who already went partway up Sinai with Moses back in Exodus 24:1. This isn't a brand-new idea, it's expanding something already established.
"Whom thou knowest" means God isn't asking Moses to pick strangers. These are already-recognized leaders the people trust.
🔢 Seventy echoes the elders already named in Exodus 24:1
👴 "Whom thou knowest" means already-recognized leaders
🔑 An expansion of existing leadership, not a new system
---
## 📋 Officers Over Them
"Officers" (Hebrew shoterim) is a different role from elders, more like administrators or record-keepers. The same word describes the Israelite foremen forced to enforce Pharaoh's brick quotas back in Exodus 5:6.
Pairing elders with officers means both wisdom and organization get shared, not just spiritual authority.
📋 "Officers" means administrators, a different role than elders
🧱 The same word describes the foremen from Exodus 5:6
🔑 Combines wisdom and organizational skill together
---
## ⛺ Bring Them Unto The Tabernacle Of The Congregation, That They May Stand There With Thee
The tabernacle entrance is the same meeting place used for major, formal moments throughout the wilderness journey. Choosing this spot makes the commissioning official and public.
Standing "there with thee" pictures shared, visible leadership, not the seventy replacing Moses but joining him.
⛺ The tabernacle entrance, the spot for formal, public moments
🤝 Pictures shared leadership, not a replacement for Moses
🔑 A visible, official ceremony, not a quiet appointment
---
## 🕊️ I Will Take Of The Spirit Which Is Upon Thee, And Will Put It Upon Them
This doesn't mean Moses ends up with less of the Spirit, like slicing a pie into smaller pieces. It means the same kind of empowerment God gave Moses gets extended to others too.
Sharing responsibility here means sharing real spiritual authority, not just handing off busywork.
🕊️ Not division, Moses doesn't end up with less
🤝 The same kind of empowerment extended to others
🔑 Shared responsibility backed by shared spiritual authority
---
## ⚖️ That They May Bear The Burden Of The People With Thee, That Thou Bear It Not Thyself Alone
This directly answers Moses' own complaint word for word: he said the burden was too heavy in verse 14, and God's plan uses that exact same word back.
God's answer to overwhelmed leadership isn't to remove the responsibility, it's to add more shoulders under the same load.
⚖️ Repeats "burden," the exact word Moses used in verse 14
🤝 Solves the problem by adding shoulders, not removing weight
🔑 God answers Moses' specific complaint specifically
---
## 🧼 Sanctify Yourselves Against To Morrow, And Ye Shall Eat Flesh
"Sanctify" means a ritual act of preparation or purification, getting ready to receive something significant from God.
Notice the announcement sounds like good news on the surface, meat is coming, but the rest of the passage reveals it's actually framed as judgment in disguise.
🧼 "Sanctify" means ritual preparation, not just excitement
🍖 Sounds like a reward, but is framed as judgment
🔑 A warning wrapped inside what sounds like good news
---
## 👂 Ye Have Wept In The Ears Of The Lord
This is a vivid, physical way of saying God directly and personally heard every complaint, not that He was simply aware of it in some distant, abstract way.
It matches the pattern already seen in verse 1, where the LORD "heard" the people's complaining before the fire broke out.
👂 Pictures God directly, personally hearing every word
🔥 Matches "the LORD heard it" back in verse 1
🔑 Nothing about their complaint went unnoticed
---
## 🔢 Not Eat One Day, Nor Two Days, Nor Five Days, Neither Ten Days, Nor Twenty Days
This escalating list builds tension on purpose, one day, two days, five, ten, twenty, each number bigger than the last, like a countdown building toward something bigger.
The buildup makes the actual answer that follows, "even a whole month," land with much more force than if God had just said the final number right away.
🔢 An escalating list building tension on purpose
⏳ Works like a countdown toward a bigger number
🔑 Makes the final answer land harder
---
## 🤢 Even A Whole Month, Until It Come Out At Your Nostrils, And It Be Loathsome Unto You
This is a disturbing, almost gross image on purpose: so much meat for so long that it becomes sickening instead of satisfying.
This isn't framed as a reward for asking. It's a corrective consequence, meant to teach the people what they were really asking for.
🤢 A deliberately disturbing, almost gross image
⚖️ Framed as correction, not as a reward
🔑 Meant to teach a lesson, not satisfy a craving
---
## ⛺ Because That Ye Have Despised The Lord Which Is Among You
This is the real charge behind the punishment: not just wanting different food, but rejecting God's provision and His presence living right there in the camp, in the tabernacle.
"Despised" is a strong word, showing this goes past simple pickiness into real disrespect toward God Himself.
⛺ God's presence lives right there in the camp
😤 "Despised" is strong, more than simple pickiness
🔑 The real charge is rejecting God, not just the menu
---
## ⛓️ Why Came We Forth Out Of Egypt?
This is the deepest layer of the complaint, finally spoken out loud: some of the people actually regret leaving Egypt and wish they'd stayed enslaved there.
Wanting to go back to slavery over a food craving reveals just how far unbelief had spread through the camp.
⛓️ Reveals regret over leaving slavery in Egypt at all
😔 The deepest, most honest layer of the complaint
🔑 Shows how far unbelief had actually spread

# Numbers 11:21-23
# 🤔 Moses Doubts, God Answers
---
## 🔢 Six Hundred Thousand Footmen
This matches the exact census number from Numbers 1:46, 603,550 fighting men, not counting women, children, or the elderly. The real total population was likely several million people.
Moses brings up this number to highlight just how impossible God's promise sounds from a purely human, logistical point of view.
🔢 Matches the census count from Numbers 1:46
👨‍👩‍👧‍👦 Doesn't even count women, children, or elders
🔑 Used to highlight an apparently impossible scale
---
## 🐑 Shall The Flocks And The Herds Be Slain For Them?
Moses does the math out loud: even slaughtering every single animal Israel owns wouldn't provide a full month of meat for this many people.
This is honest problem-solving, not defiance. Moses genuinely can't picture how this promise works.
🐑 Even all their livestock wouldn't be nearly enough
🧮 Honest math, not open defiance
🔑 A real practical limit, from a human point of view
---
## 🐟 Shall All The Fish Of The Sea Be Gathered Together For Them?
The question becomes even more absurd here, imagining every fish in the sea somehow gathered up to feed the camp.
This kind of escalating doubt is striking, since it comes right after Moses just watched seventy elders receive God's Spirit in this very chapter.
🐟 An increasingly absurd, impossible-sounding picture
😳 Comes right after Moses just witnessed a real miracle
🔑 Doubt can creep in even after seeing God act
---
## ✋ Is The Lord's Hand Waxed Short?
"Waxed short" is an old way of saying "become shortened" or "grown weak." God's "hand" is a common Bible picture for His power and ability to act.
This is a direct, pointed rebuke of Moses' doubt, not an angry outburst but a firm reminder that the real question was never about God's power.
✋ "Hand" pictures God's power and ability to act
📏 "Waxed short" means grown weak or limited
🔑 A firm rebuke aimed at doubt, not anger at Moses
---
## 🔮 Thou Shalt See Now Whether My Word Shall Come To Pass Or Not
Instead of arguing the math with Moses, God simply promises to prove it by doing it. Actions will settle the doubt, not more explanation.
This sets up the very next section, where the promised meat actually, dramatically arrives.
🗣️ God answers with proof, not more explanation
🔮 Settles doubt by demonstration, not argument
🔑 Sets up the quail miracle in the next section

# Numbers 11:24-30
# 🗣️ The Spirit Rests On Seventy — And Two More
---
## ⛺ Gathered The Seventy Men Of The Elders, And Set Them Round About The Tabernacle
This is the formal, visible moment God's plan from verse 16 actually happens. Arranging the seventy in a circle around the tabernacle makes the ceremony public and orderly.
Everyone in view can see exactly who has just been given a new, shared share of leadership.
⛺ The formal moment verse 16's plan is carried out
👥 Arranged visibly, so the whole camp can see
🔑 A public, orderly ceremony, not a quiet appointment
---
## ☁️ The Lord Came Down In A Cloud
This is the same kind of visible divine appearance already seen at Sinai in Exodus 19 and 24, and later at the tabernacle's dedication in Exodus 40. God's presence isn't abstract here, it's described as physically descending.
Repeating this pattern reminds the reader that the God guiding Israel through the wilderness is the same God who spoke from the mountain.
☁️ A visible appearance, like Exodus 19, 24, and 40
👁️ God's presence pictured as physically descending
🔑 Ties this event back to the earlier Sinai appearances
---
## 🕊️ Took Of The Spirit That Was Upon Him, And Gave It Unto The Seventy Elders
This confirms exactly what God promised back in verse 17: sharing empowerment with others, not draining any of it away from Moses.
The event happening in full view of the camp makes it clear this authority truly comes from God, not from Moses simply picking favorites.
🕊️ Confirms the promise made back in verse 17
👀 Happens visibly, proving the authority is really from God
🔑 Moses loses nothing by sharing it with others
---
## 🗣️ When The Spirit Rested Upon Them, They Prophesied, And Did Not Cease
"Prophesied" here most likely means spontaneous, spirit-filled speech or praise, a visible, public sign confirming these seventy men were genuinely equipped for the job.
It functioned like a one-time proof to the whole watching camp, not a permanent new role each elder would keep performing every day going forward.
🗣️ Likely spontaneous, spirit-filled speech or praise
✅ A public sign confirming their new role was real
🔑 A one-time proof, not an ongoing daily practice
---
## 🚶 There Remained Two Of The Men In The Camp...Eldad And Medad
For whatever reason, these two never made it out to the tabernacle with the other sixty-eight elders. Yet the Spirit rested on them anyway, right where they were.
This shows God's Spirit isn't limited by physical location or by whether someone made it to the "official" ceremony on time.
🚶 Didn't make it out to the tabernacle with the others
🕊️ The Spirit rested on them anyway, right in the camp
🔑 God's Spirit isn't limited by location or timing
---
## 📝 They Were Of Them That Were Written
"Written" means these two were already enrolled on the original list of seventy chosen elders. They weren't outsiders or impostors, just absent from the ceremony itself.
This detail matters for what happens next, since it means their prophesying is legitimate, not something Joshua is right to be alarmed about.
📝 Already listed among the seventy chosen elders
✅ Legitimately part of the group, just not physically there
🔑 Sets up why Joshua's alarm turns out to be misplaced
---
## 🏃 A Young Man Ran, And Told Moses, Eldad And Medad Do Prophesy In The Camp
The urgency of running suggests this seemed alarming or unusual, activity happening outside the official, visible ceremony at the tabernacle.
It's reported almost like a problem needing Moses' attention, setting up Joshua's reaction in the very next verse.
🏃 The running suggests real urgency or alarm
❓ Reported like a problem, not good news
🔑 Sets up Joshua's protective reaction next
---
## 🛡️ My Lord Moses, Forbid Them
Joshua, already introduced as Moses' close assistant back in Exodus 17 and 24, reacts protectively, wanting Moses to shut this down.
His concern seems to be about protecting order and Moses' unique authority, treating this unofficial prophesying as some kind of threat.
🛡️ Joshua, already Moses' close assistant, reacts protectively
⚠️ Seems worried about order or Moses' unique status
🔑 Wants Moses to shut it down immediately
---
## ❓ Enviest Thou For My Sake?
Moses' rebuke is a pointed question: is Joshua really concerned about God's order here, or is he actually protecting Moses' personal status and reputation?
It's a gentle but direct challenge, asking Joshua to examine his own motive rather than assuming his instinct was automatically right.
❓ Challenges whether this is really about God's order
🪞 Asks Joshua to examine his own real motive
🔑 A gentle but direct correction, not harsh anger
---
## 🙌 Would God That All The Lord's People Were Prophets, And That The Lord Would Put His Spirit Upon Them!
This is a remarkably generous, forward-looking wish from Moses. He shows zero jealousy over sharing his unique authority as widely as possible.
Centuries later, the prophet Joel pictures exactly this kind of widespread outpouring of God's Spirit (Joel 2:28-29), a promise the apostle Peter says starts coming true at Pentecost in Acts 2.
🙌 A generous wish, with zero jealousy over shared authority
📜 Echoed centuries later in Joel 2:28-29
🔑 Peter points back to this kind of promise at Pentecost, Acts 2

# Numbers 11:31-35
# 🪶 Quails And The Graves Of Craving
---
## 🌬️ There Went Forth A Wind From The Lord, And Brought Quails From The Sea
Quail migrations across this region were a real, natural seasonal event, birds exhausted from flying low enough to be caught by hand. God uses an ordinary natural process to deliver an extraordinary, precisely-timed answer.
Using a natural means doesn't make this any less miraculous. The timing, scale, and location line up exactly with what God had just promised Moses.
🌬️ Quail migrations were a real, natural seasonal event
⏰ The timing here lines up exactly with God's promise
🔑 A natural process used for a clearly supernatural purpose
---
## 📏 Two Cubits High Upon The Face Of The Earth
A cubit is roughly a foot and a half, so two cubits is about three feet deep. That's an enormous, almost overwhelming layer of birds covering the ground.
This description shows the answer to Moses' doubt wasn't a modest, careful provision. It was extravagant, far beyond what the math in verse 22 seemed to allow.
📏 About three feet deep in quail across the ground
🤯 An extravagant amount, not a careful, modest supply
🔑 Directly answers the doubt raised back in verse 22
---
## 📦 He That Gathered Least Gathered Ten Homers
A homer is a large unit of dry measure, somewhere around sixty to ninety gallons. Even the person with the smallest haul ended up with an enormous personal supply.
God's answer to "shall the fish of the sea be gathered for them?" turns out to be an emphatic yes, and then some.
📦 A homer is a huge unit, roughly sixty to ninety gallons
🥇 Even the smallest haul was still an enormous amount
🔑 God's answer to Moses' doubt is an emphatic yes
---
## ☀️ Spread Them All Abroad For Themselves Round About The Camp
Drying meat in the sun was a common, practical way to preserve food in the ancient world before refrigeration existed.
The sheer amount of work needed to spread and dry this much meat shows just how much quail actually fell that day, an image of total, overwhelming abundance.
☀️ Sun-drying was a normal ancient preservation method
🌾 The huge effort needed shows the true scale of the quail
🔑 A picture of total, overwhelming abundance
---
## 👄 While The Flesh Was Yet Between Their Teeth, Ere It Was Chewed
This is a strikingly immediate, vivid detail: judgment strikes at the very moment people are still chewing their very first bites of meat.
The timing ties the punishment directly to the sin itself, making an unmistakable connection between craving meat and the consequence that follows right in the middle of eating it.
👄 Strikingly immediate, mid-first-bite timing
⚡ Ties judgment directly to the act of craving itself
🔑 An unmistakable connection between sin and consequence
---
## ⚖️ The Wrath Of The Lord Was Kindled Against The People, And...Smote The People With A Very Great Plague
The meat itself wasn't the problem. This plague is a consequence for the contempt behind the complaint, treating God's daily provision and presence with real disrespect.
It's a sobering reminder that getting exactly what was demanded doesn't always turn out to be a blessing.
🍖 The meat wasn't the problem, the contempt was
⚖️ A consequence for disrespecting God's provision
🔑 Getting what you demand isn't always a blessing
---
## ⚰️ He Called The Name Of That Place Kibrothhattaavah
Kibroth-hattaavah means "graves of craving" or "graves of lust" in Hebrew. It's a permanent, sobering name for a place, matching the naming pattern already seen at Taberah earlier in this same chapter.
Every time Israel or later readers hear this name, it's a built-in reminder of exactly what happened here and why.
⚰️ Means "graves of craving" in Hebrew
🔥 Matches the naming pattern already seen at Taberah
🔑 A permanent, built-in reminder of the lesson learned here
---
## 🗺️ The People Journeyed From Kibrothhattaavah Unto Hazeroth
This short travel note quietly sets up the next chapter. Hazeroth is exactly where Miriam and Aaron will challenge Moses' unique authority in Numbers 12.
Even a brief geography note like this one is often doing more work than it looks like, connecting one story directly into the next.
🗺️ Hazeroth is the setting for the very next chapter
👨‍👩‍👧 Miriam and Aaron's challenge to Moses happens there
🔑 A quiet transition into Numbers 12's events
`;

export const NUMBERS_ELEVEN_PERSONAL_SECTIONS = parseNumbersElevenRawNotes(NUMBERS_ELEVEN_RAW_NOTES);
