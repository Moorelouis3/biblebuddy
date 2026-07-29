export type NumbersTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersTwentyThreeRawNotes(rawText: string): NumbersTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 23:${startVerse}` : `Numbers 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Numbers 23 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TWENTY_THREE_RAW_NOTES = `# Numbers 23:1-6
# 🐂 Balaam Prepares The First Sacrifice
---
## 🔢 Build Me Here Seven Altars
Seven altars is not a random number. In the ancient world, seven marked completeness — a full, proper ritual meant to get a god's full attention. Balaam is using the same divination methods pagan prophets used everywhere in this era, even though the God he's about to hear from is Israel's God, not a local idol.
🔢 Seven marks completeness in ancient ritual
🕯️ Standard pagan divination practice of the time
🔑 Balaam's methods are ordinary; the God who answers him is not

## 🐂 Seven Oxen And Seven Rams
This is a huge, costly offering — fourteen animals in total, one ox and one ram burned whole on each of the seven altars. Balak is sparing no expense, hoping the sheer size of the sacrifice will help sway the outcome.
🐂 Fourteen animals total across seven altars
💰 An expensive, all-out ritual effort
🔑 Balak is betting everything on getting this right

## 🙋 Balak Did As Balaam Had Spoken
Balak, a king, follows a hired prophet's exact instructions without question or negotiation. This small detail shows how desperate Balak really is — kings don't usually take orders from anyone.
🙋 A king following a prophet's instructions exactly
😰 Reveals just how desperate Balak has become
🔑 The power dynamic between them is already shifting

## 🐄 Offered On Every Altar A Bullock And A Ram
A "bullock" is a young bull. Each of the seven altars gets its own separate pair of animals, not one shared sacrifice split between them — a deliberate, repeated ritual act at every single site.
🐄 "Bullock" means a young bull
🔁 Each altar gets its own separate pair of animals
🔑 A repeated ritual act, not a single one-time offering

## 🧍 Stand By Thy Burnt Offering, And I Will Go
A "burnt offering" is an animal completely burned up on the altar, not eaten — the whole gift goes up to God. Balaam sends Balak away and goes to seek a private answer alone, the same pattern he used back in Numbers 22.
🔥 A "burnt offering" is fully consumed, not eaten
🚶 Balaam deliberately separates himself to seek an answer alone
🔑 Repeats his earlier pattern of pausing to consult before speaking

## 🤞 Peradventure The LORD Will Come To Meet Me
"Peradventure" is an old word for "perhaps." Balaam still isn't fully certain God will even respond to him this way, which fits his identity as an outsider prophet unsure exactly how this particular God operates.
🤞 "Peradventure" means "perhaps"
❓ Balaam still isn't sure exactly how this will go
🔑 Shows real uncertainty, not confident control over the process

## ⛰️ He Went To An High Place
High places were elevated hilltop sites believed to bring a worshiper physically closer to the gods, already explained back in Numbers 22:41. Balaam uses this same location type for his private search for an answer.
⛰️ An elevated site believed to be closer to the divine
🔁 The same setting type used at the end of Numbers 22
🔑 Consistent with Balaam's usual divination methods

## 💬 God Met Balaam
Remarkably, God actually shows up for this. He isn't obligated to answer a foreign diviner using pagan-style rituals, yet He engages directly anyway, just as He did back in Numbers 22:9.
💬 God directly engages a non-Israelite prophet again
🎁 Not something Balaam earned through his rituals
🔑 Consistent with God's pattern from earlier in the story

## 🗣️ The LORD Put A Word In Balaam's Mouth
This is the fulfillment of the one hard condition set twice already in Numbers 22 — Balaam doesn't get to choose his own words. God supplies the exact message, and Balaam is only the messenger.
🗣️ Fulfills the restriction repeated twice in Numbers 22
📜 God supplies the message; Balaam only delivers it
🔑 Confirms Balaam has zero control over the outcome

# Numbers 23:7-10
# 📜 The First Oracle: Israel Cannot Be Cursed
---
## 📖 He Took Up His Parable
"Parable" here doesn't mean a short story like the ones Jesus told. It means a formal, elevated, poetic speech — a solemn oracle meant to be remembered and repeated. Balaam is about to speak in verse, not casual conversation.
📖 "Parable" here means a formal, poetic oracle
🎙️ A solemn style meant to be remembered, not casual speech
🔑 Marks a shift into elevated, prophetic language

## 🏔️ Brought Me From Aram, Out Of The Mountains Of The East
Aram is the region near the Euphrates, matching Pethor's location from Numbers 22:5 — confirming Balaam traveled a very long distance, hundreds of miles, to reach Moab.
🏔️ Aram is the region near the Euphrates
🗺️ Matches Pethor's location from Numbers 22:5
🔑 Confirms just how far Balaam actually traveled

## 🚫 Come, Curse Me Jacob... Defy Israel
Balaam names Balak's original request plainly, using "Jacob" and "Israel" as two names for the same nation — Jacob was the patriarch's original name before God renamed him Israel in Genesis 32:28.
🚫 States Balak's original request directly
👤 "Jacob" and "Israel" both refer to the same nation
🔑 Recalls the renaming in Genesis 32:28

## ❓ How Shall I Curse, Whom God Hath Not Cursed?
This is Balaam's central point, put as a simple, unanswerable question. He isn't refusing out of personal virtue — he's stating a plain fact: no one can curse what God has already decided to bless.
❓ A rhetorical question with an obvious answer
⚖️ States a fact about God's decision, not Balaam's own choice
🔑 The real reason no curse is possible here

## 🏔️ From The Top Of The Rocks I See Him
Balaam describes his physical vantage point looking down at Israel's camp, but the phrase also carries a sense of clear, elevated perspective — seeing the nation as God sees them, set apart from everyone else.
🏔️ Describes his literal high viewpoint over the camp
👁️ Also suggests a clearer, God-given perspective
🔑 Ties his physical position to what he's about to say

## 🏕️ The People Shall Dwell Alone, And Shall Not Be Reckoned Among The Nations
This describes Israel's unique, set-apart identity as God's covenant people, distinct from every other nation around them — not isolation as punishment, but a deliberate difference tied to their special relationship with God.
🏕️ Describes Israel's set-apart covenant identity
🌍 Distinct from surrounding nations by design, not accident
🔑 A description of calling, not isolation as punishment

## 🌫️ Who Can Count The Dust Of Jacob, And The Number Of The Fourth Part Of Israel?
This echoes God's promise to Abraham in Genesis 13:16 that his descendants would be too many to count, like the dust of the earth. "The fourth part of Israel" likely refers to the four large tribal divisions the nation was organized into for camping and marching, back in Numbers 2.
🌫️ Echoes the "dust of the earth" promise in Genesis 13:16
4️⃣ "Fourth part" likely points to Israel's four tribal divisions from Numbers 2
🔑 A poetic way of saying Israel has become too many to count

## ☠️ Let Me Die The Death Of The Righteous, And Let My Last End Be Like His
Balaam wishes for a good, blessed death like the one he sees ahead for Israel — an oddly personal and ironic line, since his own eventual death (Numbers 31:8) will actually come while fighting against Israel's enemies.
☠️ A personal wish for a blessed death
😬 Deeply ironic in light of his actual death in Numbers 31:8
🔑 His words here don't match how his story really ends

# Numbers 23:11-12
# 😤 Balak's First Complaint
---
## 😠 What Hast Thou Done Unto Me?
Balak's shock is immediate and personal — he doesn't hide his anger at getting the opposite of what he paid for. This is the first crack in his confidence that hiring Balaam would work exactly as planned.
😠 An immediate, personal expression of shock and anger
💸 He paid for a curse and received the opposite
🔑 The first sign his plan isn't going the way he expected

## ⚔️ I Took Thee To Curse Mine Enemies
Balak's own words reveal his true motive from the very start — he sees Israel purely as a threat to be eliminated, not a people to understand. This blunt self-description sets up the strong contrast with what Balaam has just declared about them.
⚔️ Reveals Balak's real motive: elimination, not understanding
🆚 Sets up the contrast with Balaam's actual words
🔑 Confirms Israel was never anything but a threat in Balak's eyes

## 🙅 Thou Hast Blessed Them Altogether
"Altogether" emphasizes this wasn't a partial or hedged blessing — Balaam's words came out as a complete, unqualified blessing, the exact opposite of the curse Balak specifically requested.
🙅 "Altogether" means completely, with no hedging
🔄 The exact opposite of what Balak asked for
🔑 Leaves no room for Balak to reinterpret what happened

## 🗣️ Must I Not Take Heed To Speak That Which The LORD Hath Put In My Mouth?
Balaam's defense is simple and consistent with everything established in Numbers 22 — he isn't apologizing, because from his side, he never had a choice about the words at all.
🗣️ A simple, consistent defense
🔒 Matches the restriction repeated throughout Numbers 22
🔑 Not an apology, because he genuinely had no choice

# Numbers 23:13-17
# 🏔️ A Second Attempt, A Different View
---
## 🙏 Come, I Pray Thee, With Me Unto Another Place
Balak's plan now is simple, almost magical thinking: if the location and the view change, maybe the outcome will too. He assumes the problem is where Balaam is standing, not what God has already decided.
🙏 Balak assumes a different spot might change the result
🧠 A kind of magical thinking about location and outcome
🔑 He still hasn't grasped that God controls the words, not the place

## 👁️ Thou Shalt See But The Utmost Part Of Them, And Shalt Not See Them All
Balak deliberately limits what Balaam can see, assuming a smaller, partial view of Israel's camp might make cursing them easier. This callback to Numbers 22:41 shows this strategy of a limited view is something Balak keeps trying.
👁️ A deliberately smaller, partial view of the camp
🔁 The same strategy already used in Numbers 22:41
🔑 Balak keeps repeating an approach that hasn't worked yet

## 🏔️ The Field Of Zophim, To The Top Of Pisgah
"Zophim" means "watchers," and Pisgah is a mountain range in Moab. This exact spot matters later in the Bible — Moses will stand on Pisgah to view the promised land for the first and only time, right before he dies, in Deuteronomy 34:1.
🏔️ "Zophim" means "watchers"
📖 Pisgah is where Moses will later view the promised land (Deuteronomy 34:1)
🔑 The same mountain range plays a major role again soon

## 🐂 Built Seven Altars, And Offered A Bullock And A Ram On Every Altar
The exact same ritual from the first attempt is repeated in full — seven altars, one bullock and one ram on each. Balak is trying the identical process again, just in a new spot.
🐂 The identical ritual repeated from the first attempt
🔁 Same seven altars, same offerings, new location
🔑 Balak changes the place but not the method

## 🧍 Stand Here By Thy Burnt Offering, While I Meet The LORD Yonder
Balaam repeats his exact pattern from the first oracle — step away, seek God privately, then return with whatever message he's given. Nothing about his actual process has changed, only the geography.
🧍 The identical process from the first oracle
🚶 Steps away to seek God privately, just like before
🔑 Only the location is different; the method stays the same

## 🤔 What Hath The LORD Spoken?
Balak asks eagerly, still hoping for a different result despite the first failed attempt. His hope hasn't run out yet, even though nothing about the actual process has changed.
🤔 An eager question despite the previous failure
🤞 Shows Balak's hope hasn't run out yet
🔑 He still expects a different outcome from an unchanged process

# Numbers 23:18-24
# ⚖️ The Second Oracle: God Does Not Lie
---
## 📢 Rise Up, Balak, And Hear
Balaam opens this second oracle by directly commanding the king to stand and listen — a striking reversal of the usual roles, since kings don't normally take orders from the people they've hired.
📢 A direct command from Balaam to the king
🔄 A striking reversal of the normal hired-servant relationship
🔑 Sets an authoritative tone before the oracle even begins

## 👂 Hearken Unto Me, Thou Son Of Zippor
"Hearken" is an old word for "listen carefully." Using Balak's father's name, Zippor, is a formal address — similar to using someone's full name to make sure they're paying full attention.
👂 "Hearken" means "listen carefully"
📛 Using "son of Zippor" is a formal, attention-getting address
🔑 Signals this message deserves Balak's full focus

## 🧍 God Is Not A Man, That He Should Lie; Neither The Son Of Man, That He Should Repent
This is one of the Bible's clearest statements about God's unchanging character. "Repent" here means "change his mind," not "turn from sin" — humans go back on their word constantly, but God's promises don't work that way.
🧍 One of Scripture's clearest statements on God's reliability
🔄 "Repent" here means "change his mind," not "turn from sin"
🔑 Human unreliability is not something God shares

## ✅ Hath He Said, And Shall He Not Do It?
A rhetorical question with an obvious answer — of course He will. Balaam is stating a principle that applies to every promise God has ever made, not just the one about Israel right now.
✅ A rhetorical question with an obvious "yes"
📜 A general principle about all of God's promises, not just this one
🔑 Reinforces that what God has spoken will always happen

## 📩 I Have Received Commandment To Bless; And He Hath Blessed; And I Cannot Reverse It
Balaam plainly admits he has zero power to undo what God has already done. This isn't Balaam being generous or choosing not to curse Israel — it's a flat statement that the option was never actually his to take.
📩 A plain admission of zero personal power here
🚫 Not generosity — the option was never really his
🔑 Confirms again that Balaam is only a messenger, not a decision-maker

## 👁️ He Hath Not Beheld Iniquity In Jacob, Neither Hath He Seen Perverseness In Israel
This doesn't mean Israel is sinless — the rest of the Bible makes that very clear. It means that for the purpose of this specific blessing, God isn't counting their sin against them, because of His covenant commitment to them.
👁️ Doesn't mean Israel has no sin at all
🤝 Reflects God's covenant commitment overriding a legal case against them
🔑 A statement about God's chosen posture, not Israel's actual record

## 👑 The Shout Of A King Is Among Them
Since Israel has no human king yet at this point in the story, this "king" almost certainly points to God Himself as Israel's true king. The "shout" pictures the kind of joyful noise made at a coronation or a victory celebration.
👑 Likely refers to God as Israel's true king, since they have no human king yet
📯 "Shout" pictures a coronation or victory celebration sound
🔑 Frames Israel's camp as already living under God's kingship

## 🐫 God Brought Them Out Of Egypt
A direct callback to the entire Exodus story, reminding both Balak and the reader exactly who has been backing Israel from the very beginning of this journey.
🐫 A direct callback to the Exodus
📖 Reminds the reader who has been guiding Israel all along
🔑 Frames the recent battles and this whole journey as part of one bigger story

## 🐂 The Strength Of An Unicorn
"Unicorn" in the King James translation refers to a real animal — likely the wild ox or aurochs, an enormously strong and now-extinct wild bovine — not the mythical horned horse most readers picture today.
🐂 "Unicorn" here means a real wild ox (aurochs), not a myth
💪 Known for enormous strength in the ancient world
🔑 A real-animal comparison, not a fantasy creature

## 🔮 No Enchantment Against Jacob, Neither Divination Against Israel
There's real irony here: Balaam himself is a diviner by trade, yet he's declaring that no occult practice — including his own — has any power against God's people.
🔮 A diviner declaring divination powerless against Israel
😅 Genuinely ironic, given Balaam's own profession
🔑 Confirms no human ritual can override God's decision

## 📰 What Hath God Wrought!
This triumphant phrase became famous centuries later as the first message ever sent by telegraph, quoted by Samuel Morse in 1844. Here, it's simply an exclamation of amazement at what God has visibly done for Israel.
📰 Later famous as the first telegraph message (1844)
🎉 An exclamation of amazement at God's visible work
🔑 A celebration, not a question

## 🦁 Rise Up As A Great Lion... Not Lie Down Until He Eat Of The Prey
This pictures Israel as a fierce, victorious predator, unstoppable until its conquest is complete. It's poetic imagery about total military success, not a claim that Israel behaves like a literal wild animal.
🦁 Pictures Israel as an unstoppable, victorious predator
⚔️ Poetic imagery describing total military success
🔑 Not a literal description, but a common ancient way to picture victory

## 🩸 Drink The Blood Of The Slain
This is graphic, standard ancient war poetry describing total, decisive victory over enemies — not a literal claim about Israel's behavior. Similar violent imagery for total conquest appears elsewhere in Old Testament poetry.
🩸 Standard ancient poetic imagery for decisive victory
📜 Not a literal description of behavior
🔑 A common style of describing total conquest in this era's poetry

# Numbers 23:25-30
# 🏔️ On To Peor
---
## 🤐 Neither Curse Them At All, Nor Bless Them At All
Balak has given up on getting a curse and now just wants Balaam to stay completely silent. Two failed attempts have lowered his goal from "curse my enemy" to simply "stop making things worse."
🤐 Balak's goal has shrunk to just wanting silence
📉 Two failures have lowered his expectations
🔑 A quiet admission that his original plan isn't working

## 🗣️ Told Not I Thee, Saying, All That The LORD Speaketh, That I Must Do?
Balaam reminds Balak of something he already said plainly back in verse 12 — this isn't new information, just Balak refusing to accept an answer he's already been given twice.
🗣️ Repeats what Balaam already said back in verse 12
🔁 Balak is refusing to accept an answer he's already heard
🔑 Shows Balak's persistence isn't based on new hope, just stubbornness

## 🙏 Peradventure It Will Please God That Thou Mayest Curse Me Them From Thence
Balak tries the exact same location-based logic a third time, still hoping a different physical spot will somehow produce a different divine decision. The pattern from verse 13 repeats almost word for word.
🙏 The same location-based hope tried a third time
🔁 Nearly repeats the same logic from verse 13
🔑 Balak still hasn't learned that the place was never the issue

## ⛰️ The Top Of Peor, That Looketh Toward Jeshimon
Peor is a mountain associated with the god Baal-peor, a site that becomes the center of a major crisis for Israel just two chapters later, in Numbers 25. "Jeshimon" means "wasteland" or "desert," describing the wilderness view from this height.
⛰️ Peor is linked to the god Baal-peor
📖 This same location becomes central to the crisis in Numbers 25
🔑 "Jeshimon" means "wasteland," describing the desert view from here

## 🚶 Balak Brought Balaam Unto The Top Of Peor
For the third time, Balak personally escorts Balaam to a new site rather than sending someone else. This hands-on persistence across three separate locations shows exactly how much is riding on this for him.
🚶 Balak personally leads Balaam here himself
3️⃣ The third different location tried in this story
🔑 Shows how much personal stake Balak has in the outcome

## 🐂 Build Me Here Seven Altars, And Prepare Me Here Seven Bullocks And Seven Rams
The exact same ritual is set up a third time, word for word identical to the instructions in verse 1. Nothing about Balaam's method changes no matter how many times it's tried.
🐂 The identical ritual instructions from verse 1
🔁 The third repetition of the exact same process
🔑 The method never changes, no matter the outcome

## ✅ Balak Did As Balaam Had Said
The chapter ends mid-ritual, setting up the third and final oracle that will come in the next chapter. Balak's compliance, even after two failures, shows just how much he still wants this to work.
✅ The chapter ends in the middle of the ritual process
⏭️ Sets up the third oracle that follows in Numbers 24
🔑 Balak's continued compliance shows he hasn't given up hope yet
`;

export const NUMBERS_TWENTY_THREE_PERSONAL_SECTIONS = parseNumbersTwentyThreeRawNotes(NUMBERS_TWENTY_THREE_RAW_NOTES);
