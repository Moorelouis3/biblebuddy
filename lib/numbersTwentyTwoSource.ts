export type NumbersTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersTwentyTwoRawNotes(rawText: string): NumbersTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 22:${startVerse}` : `Numbers 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Numbers 22 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TWENTY_TWO_RAW_NOTES = `# Numbers 22:1-4
# 😨 Balak Sees Israel Coming
---
## 🗺️ In The Plains Of Moab On This Side Jordan By Jericho
This is Israel's final staging camp before entering the promised land, sitting on the east side of the Jordan River, directly across from Jericho. Israel will stay in this same spot for the rest of Numbers and all of Deuteronomy, right up to Joshua's crossing.
🗺️ Israel's last camp before crossing into Canaan
📍 East side of the Jordan, directly opposite Jericho
🔑 The setting for the rest of Numbers and all of Deuteronomy

## 👑 Balak The Son Of Zippor Saw All That Israel Had Done To The Amorites
Balak is introduced watching from a distance what just happened in chapter 21 — Israel's decisive defeats of King Sihon and the giant King Og. He doesn't wait to be attacked; he acts on what he's already seen.
👑 Balak is the king of Moab, watching Israel's recent victories
⚔️ Refers directly back to the Sihon and Og battles in Numbers 21
🔑 Fear here is based on real, recent events, not rumor

## 😰 Moab Was Sore Afraid Of The People, Because They Were Many
"Sore" is an old word for "severely" or "greatly," not related to pain from an injury. Moab's fear is grounded in simple math — Israel's sheer numbers look overwhelming after watching two kingdoms fall.
😰 "Sore" means "severely" or "greatly"
🔢 Fear driven by Israel's large numbers
🔑 A very human, understandable panic

## 😖 Moab Was Distressed Because Of The Children Of Israel
"Distressed" describes a deeper, sicker dread than simple fear — a gnawing worry that doesn't go away. Moab's leaders now feel this constantly, with Israel camped right on their doorstep.
😖 "Distressed" means a heavy, ongoing dread, deeper than fear
🏕️ Israel is now camped right at Moab's border
🔑 Sets the emotional tone for the whole Balaam story

## 🤝 Moab Said Unto The Elders Of Midian
Moab and Midian were usually separate, unrelated peoples, but shared fear pushes them into an unlikely alliance here. This same partnership between Moab and Midian will matter again later, in the crisis of Numbers 25.
🤝 An unusual alliance, formed out of shared fear
🔗 Foreshadows the joint Moab/Midian trouble in Numbers 25
🔑 Fear makes unlikely partners

## 🐂 This Company Lick Up All That Are Round About Us, As The Ox Licketh Up The Grass
This is a vivid picture of an ox grazing a field completely bare, used here to describe how thoroughly Moab expects Israel to consume everything around them. It's not a literal claim about eating grass — it's an idiom for total, unstoppable overwhelm.
🐂 A farming idiom for total, complete consumption
🌾 Pictures an ox stripping a field bare
🔑 Not a literal claim, just a vivid way to describe overwhelming fear

## 📛 Balak The Son Of Zippor Was King Of The Moabites At That Time
The narrator repeats Balak's full name and title here, formally establishing him as this story's central human character right as the plot begins. "At that time" is a small note marking this as a specific historical moment, not a timeless saying.
📛 Formally establishes Balak as the story's central figure
🕰️ "At that time" marks this as a specific historical moment
🔑 The narrator pauses to make sure the reader knows exactly who Balak is

# Numbers 22:5-8
# 📜 Balak Sends For Balaam
---
## 🔮 Balaam The Son Of Beor
Balaam is introduced as a prophet or diviner known and respected far outside Israel's own nation — his reputation for reliable blessings and curses has traveled a long distance. He'll be mentioned again later in Deuteronomy 23, Joshua 24, Micah 6, 2 Peter 2, Jude, and Revelation, always as a cautionary example.
🔮 A prophet/diviner known well beyond Israel's borders
📖 Referenced again in several other books of the Bible
🔑 His reputation for real spiritual power is well established before this story even starts

## 🏞️ To Pethor, Which Is By The River
"The river" here almost certainly means the Euphrates, placing Pethor far to the northeast in Mesopotamia — hundreds of miles from Moab. Sending messengers that far shows just how seriously, and how far, Balak is willing to search for spiritual help.
🏞️ "The river" likely refers to the Euphrates
🗺️ Pethor sits hundreds of miles northeast, in Mesopotamia
🔑 Shows the great lengths Balak goes to secure this specific prophet

## 🌍 They Cover The Face Of The Earth
This is an exaggeration used for emphasis, not a literal claim — the same kind of language Pharaoh used about Israel's growing numbers back in Exodus 1:7. Two different foreign rulers, generations apart, describe Israel's size with almost identical fear.
🌍 An exaggeration for emphasis, not a literal claim
🔁 The same kind of language Pharaoh used in Exodus 1:7
🔑 Two different enemies, same fearful description

## 📍 They Abide Over Against Me
A simple, literal geographic detail — Israel is camped directly across from Moab, close enough to see. This isn't a distant rumor reaching Balak; it's a visible, immediate threat right outside his door.
📍 A literal detail: Israel is camped directly across from Moab
👀 Close enough to be seen, not just heard about
🔑 Makes the danger feel immediate, not distant

## 🗣️ Curse Me This People
In the ancient world, a formal curse pronounced by a recognized prophet or diviner was believed to carry real supernatural power to affect the outcome of events, not just express an opinion. Balak isn't asking Balaam for advice — he's hiring him to perform a specific spiritual act.
🗣️ A formal, ritual curse, not just an insult
✨ Believed to carry real supernatural power in this culture
🔑 Balak is hiring a specific spiritual service, not asking for advice

## ✅ I Wot That He Whom Thou Blessest Is Blessed, And He Whom Thou Cursest Is Cursed
"Wot" is an old word for "know." Balak states Balaam's professional track record plainly — his blessings and curses are known to actually come true, which is exactly why Balak wants him specifically and no one else.
✅ "Wot" means "know"
📈 States Balaam's reputation as a proven track record
🔑 Explains why Balak insists on this one specific prophet

## 💰 The Rewards Of Divination In Their Hand
"Divination" describes occult practices used to predict the future or influence spiritual outcomes — later forbidden to Israel by name in Deuteronomy 18:10-14. The elders arrive already carrying payment, treating this like hiring a professional for a paid service.
💰 The elders bring payment along with the request
🚫 "Divination" is later explicitly forbidden to Israel in Deuteronomy 18
🔑 This is framed as a paid transaction from the very start

## 🌙 Lodge Here This Night
Balaam's first response is delay, not an outright refusal — he wants to consult before giving any answer. This single choice to wait and ask sets up the entire theological drama that plays out over the rest of the chapter.
🌙 Balaam delays instead of answering immediately
🤔 Chooses to consult before deciding anything
🔑 This pause is what opens the door to everything that follows

## 🏕️ The Princes Of Moab Abode With Balaam
Moab's dignitaries stay overnight with Balaam rather than heading home to wait, showing exactly how urgent and important this mission is to Balak. Every detail so far emphasizes how seriously Moab is taking this threat.
🏕️ High-ranking officials wait in person, not from a distance
⏳ Shows real urgency behind the request
🔑 Confirms just how seriously Balak is treating this danger

# Numbers 22:9-14
# 🚫 God Says No
---
## 💬 God Came Unto Balaam, And Said, What Men Are These With Thee?
It's significant that God speaks directly to a prophet outside Israel's own nation at all — showing His authority isn't limited to Israel alone. The question isn't asked because God needs information; it invites Balaam to state the situation for himself first.
💬 God speaks directly to a non-Israelite prophet
🌍 Shows God's authority reaches beyond just Israel
🔑 A question meant to prompt Balaam's own account, not to gather new information

## 📋 Balaam Said Unto God, Balak The Son Of Zippor...Hath Sent Unto Me
Balaam lays out the whole situation for God in detail, almost repeating Balak's original message word for word. Treating this like a genuine, thorough consultation shows Balaam does take the idea of asking God's permission seriously, at least on the surface.
📋 Balaam reports the full situation, not just a summary
🔁 Nearly repeats Balak's original wording back to God
🔑 A real consultation, not just a formality he's skipping through

## 🤔 Peradventure I Shall Be Able To Overcome Them
"Peradventure" is an old word for "perhaps." Balaam repeats Balak's actual battle plan back to God almost exactly as it was given to him, laying the whole scheme out honestly rather than deciding to go on his own authority.
🤔 "Peradventure" means "perhaps"
🔁 Repeats Balak's plan nearly word for word
🔑 Shows Balaam presenting the full request honestly, not filtering it

## ⛔ Thou Shalt Not Go With Them; Thou Shalt Not Curse The People: For They Are Blessed
God's answer here is direct and unmistakable. "For they are blessed" ties straight back to God's original promise to Abraham in Genesis 12:3 — no paid curse from any prophet can undo a blessing God Himself already spoke.
⛔ A clear, unmistakable command with no ambiguity
📖 "Blessed" points back to God's promise in Genesis 12:3
🔑 A human curse cannot override a divine blessing

## 🗣️ The LORD Refuseth To Give Me Leave To Go With You
Balaam reports God's answer honestly and completely to the princes, naming God by His personal covenant name, the LORD (YHWH) — showing he actually knows this specific God, not just a vague "the gods." This first, honest response stands in real contrast to his behavior later in the chapter.
🗣️ Balaam reports the refusal honestly, without softening it
📛 Uses God's personal covenant name, the LORD (YHWH)
🔑 An honest first answer that his later actions won't fully match

## 🚶 The Princes Rose Up, And They Went Unto Balak, And Said, Balaam Refuseth To Come With Us
The messengers report back only the bottom line — a plain refusal — likely without the full theological reason God gave. Balak receives a simple "no" without necessarily understanding why.
🚶 The messengers return with a short, simple report
✂️ The full reasoning may not have been passed along
🔑 Balak hears only the outcome, not the explanation

# Numbers 22:15-21
# ⚖️ A Second Request, A Conditional Yes
---
## 👑 Balak Sent Yet Again Princes, More, And More Honourable Than They
Balak escalates instead of accepting the answer, sending a higher-ranking, more impressive delegation the second time. The pressure campaign grows rather than stopping at the first "no."
👑 A bigger, higher-status delegation than before
📈 Escalation instead of acceptance of the first refusal
🔑 Shows Balak's determination to get a different answer

## 🏆 I Will Promote Thee Unto Very Great Honour
Balak's offer shifts from a simple payment toward status and prestige, appealing directly to Balaam's reputation and ambition. It's a more personal, harder temptation than money alone.
🏆 The offer moves from payment to status and prestige
🎯 Aimed directly at Balaam's ambition
🔑 A harder, more personal temptation than a simple bribe

## 🏠 If Balak Would Give Me His House Full Of Silver And Gold, I Cannot Go Beyond The Word Of The LORD My God, To Do Less Or More
On the surface, this is the strongest possible statement of loyalty to God over any bribe. But later New Testament writers (2 Peter 2:15, Jude 1:11) point out that Balaam's heart didn't actually match these bold words — he still wanted to go and kept looking for a way.
🏠 A bold claim of total loyalty to God's word
📖 Later exposed as insincere in 2 Peter 2:15 and Jude 1:11
🔑 Strong words that his actions won't fully back up

## ➖ To Do Less Or More
This old idiom simply means "in any way at all" — a total, sweeping claim of inability to deviate even slightly from God's word. It makes his next move even more telling.
➖ An idiom meaning "in any way at all"
🗣️ A sweeping, total-sounding claim
🔑 Makes his next request look like backpedaling

## 🌙 Tarry Ye Also Here This Night, That I May Know What The LORD Will Say Unto Me More
Balaam asks God again, even though the answer in verse 12 was already completely clear. Asking a second time for a decision God has already settled is a quiet sign that Balaam is hoping to hear something different because part of him wants to go.
🌙 A second request, despite an already-clear answer
🤞 Suggests Balaam is hoping for a different response
🔑 A subtle crack revealing where his heart actually leans

## ✅ If The Men Come To Call Thee, Rise Up, And Go With Them
God's answer changes this time, but it reads as permission rather than approval — God allows what Balaam is already determined to do, rather than endorsing the trip as good. Sometimes God's "yes" to a persistent request isn't the same as His blessing on it.
✅ Permission given, not necessarily approval
🚪 God allows what Balaam already wants to do
🔑 A "yes" here isn't the same thing as a blessing

## 🔒 But Yet The Word Which I Shall Say Unto Thee, That Shalt Thou Do
The one unbreakable condition on this permission: Balaam may travel, but every single word he speaks will still be entirely controlled by God, not himself. This restriction gets repeated again later in the chapter, showing how central it is to the whole story.
🔒 The one hard limit built into this permission
🔁 This exact condition gets repeated again later in the chapter
🔑 God controls the outcome no matter what Balaam decides to do

## 🫏 Balaam Rose Up In The Morning, And Saddled His Ass
Balaam personally saddles his own donkey rather than having a servant handle it — a small detail that shows real eagerness and haste to get going. This everyday animal is about to become the most important character in the rest of the chapter.
🫏 Balaam saddles the donkey himself, showing real eagerness
🏃 A small detail hinting at how ready he is to leave
🔑 Sets up the donkey as the chapter's next major character

# Numbers 22:22-27
# 😠 The Angel Blocks The Path
---
## 🔥 God's Anger Was Kindled Because He Went
This creates a real tension: God told Balaam to go in verse 20, yet is angry that he went. The most likely explanation is that God permitted the trip while seeing that Balaam's heart was set on the reward and the honor, not on pure, willing obedience — the anger targets his motive, not the technical permission.
🔥 A real tension between permission given and anger shown
❤️ Likely targets Balaam's greedy motive, not the technical act
🔑 Being allowed to do something isn't the same as doing it for the right reason

## ⚔️ The Angel Of The LORD Stood In The Way For An Adversary Against Him
"Adversary" translates the Hebrew word "satan," meaning "one who opposes" or "one who blocks the way" — it's simply describing the angel's role here, not naming the devil. God Himself sends this opposition directly into Balaam's path.
⚔️ "Adversary" (Hebrew: satan) means "one who blocks the way"
👤 Describes the angel's role here, not the devil by name
🔑 The obstacle comes directly from God, not from an enemy

## 🫏 Riding Upon His Ass, And His Two Servants Were With Him
This establishes the full traveling party in detail — Balaam isn't alone on this trip. Only the donkey, though, will actually be able to see the danger standing in the road ahead.
🫏 The full traveling group is named: Balaam and two servants
👁️ Only the donkey can see what's really happening
🔑 Sets up the coming irony of who notices the danger first

## 👀 The Ass Saw The Angel Of The LORD Standing In The Way, And His Sword Drawn
The donkey sees clearly what her human rider cannot see at all — an ironic reversal that runs through this entire episode. The animal has better spiritual sight in this moment than the professional prophet does.
👀 The donkey perceives what Balaam entirely misses
🔄 A deliberate reversal: animal sight, human blindness
🔑 Sets the pattern for the rest of this strange scene

## 🪃 Balaam Smote The Ass, To Turn Her Into The Way
Balaam responds to behavior he doesn't understand with immediate physical punishment, rather than pausing to wonder why his normally obedient animal suddenly resists him. This is the first of three beatings in this short passage.
🪃 Immediate punishment instead of curiosity about the cause
1️⃣ The first of three beatings in this passage
🔑 Anger, not investigation, is Balaam's first reaction

## 🧱 The Angel Of The LORD Stood In A Path Of The Vineyards, A Wall Being On This Side, And A Wall On That Side
The angel moves to a narrower position, giving the donkey much less room to maneuver around Him than before. The blockade is escalating, even though Balaam still can't see it.
🧱 A narrower spot than the first encounter
📏 Less room for the donkey to avoid the angel
🔑 The blockade escalates while Balaam remains unaware

## 🦶 The Ass Thrust Herself Unto The Wall, And Crushed Balaam's Foot Against The Wall
The donkey's evasive move genuinely hurts Balaam this time, which makes his frustration understandable even though he still has no idea what's actually causing it. Real pain, wrong conclusion.
🦶 A real, physical injury to Balaam's foot
😣 His frustration is understandable, even though misdirected
🔑 Pain without understanding leads straight to more anger

## 🪃 He Smote Her Again
A second beating, and Balaam still hasn't stopped to ask why this normally reliable animal keeps resisting him. The pattern of punishing without understanding just repeats.
🪃 The second of three beatings
🔁 The same pattern of punishment without investigation
🔑 Frustration is building without any real answers

## 🚧 The Angel Of The LORD Went Further, And Stood In A Narrow Place, Where Was No Way To Turn Either To The Right Hand Or To The Left
This third and tightest blockade removes every possible escape route the donkey had used before. She now has no options left at all except to stop completely.
🚧 The third and final, tightest blockade
🚫 Every possible escape route is now removed
🔑 The donkey is left with only one option left

## 😑 The Ass Fell Down Under Balaam
This final act — simply sitting down where she stands — is the most extreme response yet, and it's the one that finally pushes Balaam's anger to its peak. He still doesn't know that the alternative to stopping could have been his own death, explained later in verse 33.
😑 The most extreme of the donkey's three responses
☠️ The unseen alternative was Balaam's own death (explained in verse 33)
🔑 What looks like the worst disobedience is actually the clearest rescue

## 😡 Balaam's Anger Was Kindled, And He Smote Her With A Staff
Balaam's anger here uses the exact same phrase as God's anger back in verse 22 — a deliberate wordplay in the original Hebrew. He is now furious at the very animal that has been saving his life three separate times.
😡 The same "anger kindled" phrase used for God in verse 22
🔁 Deliberate wordplay connecting the two angers
🔑 Balaam is furious at the one who is actually protecting him

# Numbers 22:28-30
# 🗣️ The Donkey Speaks
---
## ✨ The LORD Opened The Mouth Of The Ass
This is presented as a genuine, historical miracle — God directly causing an animal to speak real human words. 2 Peter 2:16 later references this exact event as a real occurrence, "the dumb ass speaking with man's voice."
✨ A real, direct miracle, not a figure of speech
📖 Referenced as historical fact in 2 Peter 2:16
🔑 Scripture treats this as an actual event, not a legend

## ❓ What Have I Done Unto Thee, That Thou Hast Smitten Me These Three Times?
The donkey's question is calm and completely reasonable, pointing directly at the pattern — three separate beatings — that Balaam himself never paused to notice. The animal is more level-headed here than the man.
❓ A calm, reasonable question, not an angry outburst
🔢 Points out the exact pattern: three separate beatings
🔑 The donkey shows more composure than her furious rider

## 😤 Balaam Said Unto The Ass, Because Thou Hast Mocked Me
Remarkably, Balaam answers a talking donkey with ordinary irritation, not shock or amazement. His anger has completely blinded him to how extraordinary this moment actually is.
😤 Balaam responds with plain anger, not astonishment
🙈 Shows exactly how blind his fury has made him
🔑 He's more upset about the beating than surprised by the miracle

## ⚔️ I Would There Were A Sword In Mine Hand, For Now Would I Kill Thee
A bitter irony sits inside this wish: Balaam is asking for the very weapon the angel is already holding drawn against him, without knowing how close he actually is to death. He's wishing for the danger he's already standing in.
⚔️ Wishes for the same weapon already drawn against him
🙈 He has no idea how close to death he really is
🔑 A wish that would have made things far worse, not better

## 🐴 Am Not I Thine Ass, Upon Which Thou Hast Ridden Ever Since I Was Thine Unto This Day?
The donkey appeals to their entire shared history — a lifetime of steady, reliable service — as proof this sudden disobedience is completely out of character for her. It's a genuinely fair argument.
🐴 Appeals to years of consistent, reliable service
📜 A lifetime track record used as evidence
🔑 An argument Balaam can't honestly dispute

## 🙅 Was I Ever Wont To Do So Unto Thee? And He Said, Nay
Balaam has to admit, even in the middle of his anger, that the honest answer is simply "no." The donkey's case is airtight, and he can't deny it even for a moment.
🙅 Balaam is forced to admit the plain truth
✅ "Nay" confirms the donkey's argument is completely fair
🔑 Even furious, Balaam can't deny an obvious fact

# Numbers 22:31-35
# 👁️ Balaam's Eyes Are Opened
---
## 👁️ Then The LORD Opened The Eyes Of Balaam
The exact same verb used for opening the donkey's mouth back in verse 28 is now used for opening Balaam's eyes — a deliberate piece of wordplay showing the donkey could already see spiritually what this professional "seer" could not.
👁️ The same Hebrew word used for the donkey's mouth in verse 28
🔮 "Seer" was actually a common title for a prophet like Balaam
🔑 Wordplay exposing that the animal saw more clearly than the prophet

## ⚔️ He Saw The Angel Of The LORD Standing In The Way, And His Sword Drawn In His Hand
Balaam finally sees exactly what his donkey has already seen three separate times — the real, life-threatening danger he had been blaming an innocent animal for all along.
⚔️ Balaam finally sees what the donkey saw three times already
🫏 Reveals the donkey was never actually in the wrong
🔑 The truth arrives only after three beatings and a rebuke

## 🙇 He Bowed Down His Head, And Fell Flat On His Face
An immediate posture of total submission and fear the moment the truth is revealed — a sharp, sudden contrast to his casual anger just moments earlier. Seeing clearly changes everything about his attitude.
🙇 A posture of total submission and fear
🔄 A sharp contrast to his earlier casual anger
🔑 Clear sight instantly reshapes his whole response

## ❓ Wherefore Hast Thou Smitten Thine Ass These Three Times?
The angel repeats almost the exact same question the donkey herself asked back in verse 28, holding Balaam accountable specifically for how he treated the animal, not just for making this trip.
❓ Nearly repeats the donkey's own question from verse 28
⚖️ Holds Balaam accountable for his treatment of the donkey
🔑 The rebuke is about cruelty, not only about the journey itself

## 〰️ I Went Out To Withstand Thee, Because Thy Way Is Perverse Before Me
"Perverse" here means crooked or twisted, not a sexual term — it describes Balaam's motives on this trip as bent away from what's right, even though God had technically permitted him to go.
〰️ "Perverse" means crooked or twisted, not sexual
❤️ Describes Balaam's motives, not just his outward actions
🔑 Being permitted to go didn't mean his heart was right about it

## 💔 Unless She Had Turned From Me, Surely Now Also I Had Slain Thee, And Saved Her Alive
A stunning reveal: the donkey's three acts of "disobedience" actually saved Balaam's life every single time. The angel confirms he would have killed the man and spared the animal.
💔 Each "disobedient" act actually saved Balaam's life
🔄 The angel would have killed the man, not the donkey
🔑 What looked like the animal's failure was really her rescue

## 😔 I Have Sinned; For I Knew Not That Thou Stoodest In The Way Against Me
Balaam's confession sounds sincere, but notice exactly what he claims ignorance of — only this specific physical encounter, not the deeper issue of his greedy motives already confronted back in verse 32.
😔 A confession that sounds sincere on the surface
🎯 Only addresses this one encounter, not his deeper motives
🔑 A partial admission, not a full change of heart

## 🔙 If It Displease Thee, I Will Get Me Back Again
Balaam offers to turn back and abandon the trip entirely — but the angel doesn't take him up on the offer. The door to walk away is opened and then simply left unused.
🔙 An offer to abandon the trip completely
🚪 The angel doesn't take him up on it
🔑 A genuine off-ramp that ends up going unused

## 🔒 Go With The Men: But Only The Word That I Shall Speak Unto Thee, That Thou Shalt Speak
The same restriction from verse 20 is repeated here a second time, almost word for word — a clear sign that this single condition is the one unbreakable rule governing this entire journey.
🔒 The same restriction from verse 20, repeated again
🔁 Word-for-word similarity emphasizes how firm this rule is
🔑 Nothing about this trip changes God's total control of Balaam's words

## 🚶 So Balaam Went With The Princes Of Balak
The episode closes simply and quietly, the journey finally continuing after this extraordinary detour. What started as a normal trip is now framed entirely by this warning.
🚶 The journey resumes after the extraordinary detour
📖 A quiet close to one of the Bible's strangest scenes
🔑 Everything that happens next is now colored by this warning

# Numbers 22:36-41
# 🤝 Balak Meets Balaam
---
## 🏙️ Balak Went Out To Meet Him Unto A City Of Moab, Which Is In The Border Of Arnon
Balak personally travels all the way to the border to meet Balaam, rather than waiting comfortably in his own capital city. It's a sign of exactly how urgent and important this meeting is to him.
🏙️ Balak travels to the border himself
👑 A king going out personally, not waiting to be brought a report
🔑 Shows the urgency Balak places on this meeting

## 😤 Did I Not Earnestly Send Unto Thee To Call Thee? Wherefore Camest Thou Not Unto Me?
Balak's greeting is actually a complaint. He's still frustrated about the earlier delay caused by Balaam's first refusal, even though Balaam did eventually come after all.
😤 A complaint disguised as a greeting
⏳ Still frustrated by the earlier delay
🔑 Old irritation surfaces even though the trip did happen

## 🏆 Am I Not Able Indeed To Promote Thee To Honour?
Balak repeats his earlier promise almost like a reminder or a threat, making sure Balaam remembers exactly what's on the table and what he's expecting in return.
🏆 Repeats his earlier promise of status and reward
📌 Functions as a reminder of what's expected in return
🔑 Keeps the pressure of the bribe firmly in view

## 🗣️ Have I Now Any Power At All To Say Any Thing? The Word That God Putteth In My Mouth, That Shall I Speak
Balaam immediately sets Balak's expectations correctly, restating the exact restriction God gave back in verses 20 and 35. No matter what Balak offers, he cannot buy a different outcome than what God allows.
🗣️ Restates God's restriction from verses 20 and 35
🚫 Makes clear no bribe can change the outcome
🔑 Sets honest expectations before anything else happens

## 🏙️ Kirjathhuzoth
A Moabite city whose name likely means "city of streets," mentioned nowhere else in the entire Bible. It's one more real, specific place marking exactly how far this journey has progressed.
🏙️ A real place name likely meaning "city of streets"
📍 Mentioned only this one time in all of Scripture
🔑 Grounds the story in real, trackable geography

## 🐂 Balak Offered Oxen And Sheep, And Sent To Balaam, And To The Princes That Were With Him
Balak hosts a formal feast, honoring both Balaam and his own officials before any curse is even attempted. This kind of hospitality builds goodwill and a sense of obligation before the real business begins.
🐂 A formal feast honoring Balaam and Balak's own officials
🤝 Hospitality offered before any actual work has begun
🔑 Builds goodwill and obligation ahead of the main event

## ⛰️ Brought Him Up Into The High Places Of Baal
"High places" were elevated hilltop worship sites, believed in this culture to bring a worshiper physically closer to the gods and to offer a clearer view for pronouncing spiritual blessings or curses. Baal was the chief storm-and-fertility god worshiped across Canaan and Moab.
⛰️ Hilltop sites believed to bring worshipers closer to the gods
⚡ Baal was the region's chief storm-and-fertility god
🔑 The setting itself is meant to help the coming curse work

## 👀 That Thence He Might See The Utmost Part Of The People
Balak deliberately shows Balaam only a portion of Israel's camp from this vantage point, not the whole nation at once. This small detail about a limited, partial view matters again once Balaam actually begins to speak in the chapters ahead.
👀 Balaam is shown only part of Israel's camp, not all of it
✂️ A deliberately limited, partial view
🔑 This detail becomes important once Balaam starts speaking next
`;

export const NUMBERS_TWENTY_TWO_PERSONAL_SECTIONS = parseNumbersTwentyTwoRawNotes(NUMBERS_TWENTY_TWO_RAW_NOTES);
