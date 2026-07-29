export type NumbersSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersSixteenRawNotes(rawText: string): NumbersSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 16:${startVerse}` : `Numbers 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Numbers 16 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_SIXTEEN_RAW_NOTES = `# Numbers 16:1-3
# ⚔️ Korah's Rebellion Begins
---
## 👨‍👩‍👧 Korah, The Son Of Izhar, The Son Of Kohath, The Son Of Levi
Korah wasn't an outsider looking in - he was Moses and Aaron's first cousin. Kohath, Levi's son, had four sons: Amram (Moses and Aaron's father), Izhar (Korah's father), Hebron, and Uzziel. That makes this a family conflict at its core, not a stranger's complaint.
Korah already held real responsibility. Kohath's descendants were assigned to carry the tabernacle's holiest furniture - the ark, the table, the lampstand - on their shoulders whenever Israel moved camp (Numbers 4:15). He wasn't overlooked. He wanted more than what he already had.
👨‍👩‍👧 Korah was Moses and Aaron's first cousin, not a stranger
🎗️ His branch of Levites already carried the tabernacle's holiest furniture
🔑 This is a family conflict over status, not an outsider's complaint
---
## 🧍 Dathan And Abiram, The Sons Of Eliab...And On, The Son Of Peleth, Sons Of Reuben
These three men came from a completely different tribe than Korah - Reuben, Jacob's firstborn son. Reuben's descendants had a long memory of lost status: Reuben himself forfeited his birthright generations earlier for sleeping with his father's concubine (Genesis 35:22, 49:3-4), and the tribe never regained the leadership role a firstborn line would normally expect.
Pairing a demoted Levite's ambition with a demoted firstborn tribe's grievance made this rebellion far more dangerous than one man acting alone - two very different complaints found each other and joined forces.
🧍 Reuben was Jacob's firstborn son, a tribe with lost status of its own
📜 Reuben forfeited his birthright generations earlier (Genesis 49:3-4)
🔑 Two separate grievances, from two different tribes, joined into one revolt
---
## 👤 On, The Son Of Peleth
On is named here as one of the ringleaders, then never mentioned again anywhere else in this story - not among those who die, not among those who repent. The text simply drops him.
Jewish tradition later filled in the gap, crediting his wife with talking him out of joining before it was too late. The Bible itself doesn't say that; it's worth being honest that this is a traditional guess, not a stated fact.
👤 Named once here, then never mentioned again in the story
❓ The text never explains what happened to him
🔑 A later tradition (not the Bible itself) credits his wife with saving him
---
## 🧑‍🤝‍🧑 Took Men
This old phrasing means Korah actively recruited and organized followers, not that he simply "took" people by force. It's the same kind of language used elsewhere in the Bible for gathering a group around a cause.
🧑‍🤝‍🧑 Means he recruited and organized followers
📋 Not a literal kidnapping - a gathering of allies
🔑 This was planned, not a spontaneous outburst
---
## 👑 Two Hundred And Fifty Princes Of The Assembly, Famous In The Congregation, Men Of Renown
These weren't troublemakers or nobodies. "Princes" here means tribal leaders and chiefs, the same kind of men counted and named back in Numbers 1-2 as heads of their families. "Famous" and "men of renown" both point to genuine respect and standing.
That detail matters. A rebellion led by respected leaders is far more dangerous, and far more persuasive to everyone else, than one led by outcasts with nothing to lose.
👑 Real tribal leaders, not troublemakers or outsiders
⭐ Already respected and well known before this happened
🔑 Respected leaders make a rebellion more persuasive, not less
---
## 🗣️ Ye Take Too Much Upon You
This is the accusation at the center of the whole rebellion: that Moses and Aaron had grabbed more authority than God actually gave them. It's phrased as a complaint about fairness, not open blasphemy - which is exactly what makes it so persuasive.
🗣️ The core accusation: Moses and Aaron overstepped their authority
⚖️ Framed as a fairness complaint, not open blasphemy
🔑 A persuasive half-truth is more dangerous than an obvious lie
---
## ✨ Seeing All The Congregation Are Holy, Every One Of Them, And The LORD Is Among Them
This part of the accusation is actually true - God did call all of Israel "a kingdom of priests, and an holy nation" back at Sinai (Exodus 19:6). Korah isn't lying here; he's taking a real truth and stretching it into a false conclusion.
Being holy as a nation never meant every person could serve as priest or leader. God still assigned specific roles - Aaron's family at the altar, the Levites carrying the furniture, Moses leading. Equal standing before God was never the same thing as identical jobs.
✨ A real truth (Exodus 19:6) stretched into a false conclusion
🎭 National holiness never meant identical roles for everyone
🔑 The most convincing lies usually start from something true
---
## ❓ Wherefore Then Lift Ye Up Yourselves Above The Congregation Of The LORD?
This closing question is the accusation's real punch line - accusing Moses and Aaron of self-promotion, as if they had appointed themselves rather than being called by God. The irony, which the rest of the chapter will expose, is that Korah is the one actually trying to lift himself above his assigned place.
❓ Accuses Moses and Aaron of self-appointed authority
🪞 The irony: Korah is the one really reaching for more status
🔑 Sets up exactly what the rest of the chapter will disprove

# Numbers 16:4-7
# 🔥 Moses Proposes A Test
---
## 🙇 When Moses Heard It, He Fell Upon His Face
Moses doesn't argue back or defend himself. Falling on his face was a posture of prayer and humble appeal to God, the same response he'll repeat twice more before this story ends. His first move under a direct challenge to his authority is to go to God, not to win the argument himself.
🙇 A posture of prayer, not defeat or fear
🔁 The first of three times Moses falls on his face in this chapter
🔑 His instinct is to appeal to God, not to argue back
---
## ☀️ Even To Morrow The LORD Will Shew Who Are His
Rather than settling this by his own authority, Moses hands the whole question to God and sets a specific time. He's confident enough in his calling to let God prove it publicly instead of insisting on it himself.
☀️ Moses refuses to settle this by his own word
⏰ Sets a specific, public time for God to answer instead
🔑 Confidence that doesn't need to defend itself immediately
---
## 🕯️ Cause Him To Come Near Unto Him
"Come near" is priestly language throughout the Law - it describes the unique privilege of approaching the altar and serving in God's presence, something only Aaron's family was given (Leviticus 21:17, Numbers 3:10). This is exactly the privilege Korah is trying to claim for himself.
🕯️ "Come near" is technical priestly language in the Law
🚪 Describes the unique right to approach the altar directly
🔑 The exact privilege Korah is trying to take without being given it
---
## 🔥 Take You Censers... And Put Fire Therein, And Put Incense In Them Before The LORD
A censer was a small metal pan used to carry burning coals and incense - the same kind of tool Aaron used every morning and evening inside the tabernacle (Exodus 30:7-8). Moses proposes a real, high-stakes test: let every claimant actually perform the priestly incense ritual and see who God accepts.
This is the same ritual that got Aaron's own sons Nadab and Abihu killed for using "strange fire" without authorization (Leviticus 10:1-2) - Moses is handing 250 men the exact tool that already proved fatal when misused.
🔥 A censer was a small pan for burning incense before God
⚠️ The same ritual that already killed Nadab and Abihu for misuse
🔑 A genuinely dangerous test, not a symbolic gesture
---
## ✅ It Shall Be That The Man Whom The LORD Doth Choose, He Shall Be Holy
The test's outcome isn't left ambiguous - whoever God accepts is holy, and by clear implication, whoever God doesn't accept isn't. Moses stakes everything on a visible, public answer rather than a private argument.
✅ The test has one clear, public outcome, not a vague result
👁️ Everyone watching will see exactly who God chooses
🔑 Moses stakes the whole dispute on God's visible answer
---
## ⚠️ Ye Take Too Much Upon You, Ye Sons Of Levi
Moses throws Korah's own opening accusation back at him, word for word - but now aimed specifically at the Levites' overreach into the priesthood, not at Moses and Aaron's leadership. The same phrase now lands on the person who first used it.
⚠️ The exact same words Korah used, now aimed back at him
🔄 Redirected from Moses's leadership to Korah's overreach
🔑 Turns Korah's accusation into his own indictment

# Numbers 16:8-11
# 👥 Moses Rebukes The Levites
---
## 🙏 Hear, I Pray You, Ye Sons Of Levi
Moses's tone shifts here. Where his words to Korah were sharp, this opens gently - "I pray you" is a polite request, not a command. He's trying to reason with the wider group of Levites before this goes any further, distinguishing them from Korah's inner circle.
🙏 A noticeably gentler, more pleading tone than before
🎯 Aimed at Levites in general, not just Korah's core group
🔑 Moses is still trying to head off worse consequences
---
## 🤏 Seemeth It But A Small Thing Unto You
This is a pointed rhetorical question - Moses is asking whether the Levites have lost sight of how significant their calling already is. It sets up the list of privileges that follows.
🤏 A rhetorical question about lost perspective
📋 Sets up the list of privileges about to be named
🔑 Suggests Korah's ambition has made him blind to what he already has
---
## 🎗️ That The God Of Israel Hath Separated You From The Congregation Of Israel, To Bring You Near To Himself
"Separated" describes a deliberate, permanent setting-apart, not a random assignment. Out of all twelve tribes, the Levites alone were chosen for direct tabernacle service (Numbers 3:5-10, 8:14-19) - already an extraordinary honor most of Israel didn't have.
🎗️ "Separated" means deliberately and permanently set apart
🏆 An honor given to one tribe out of twelve
🔑 Already far more access to God than most of Israel had
---
## 🛠️ To Do The Service Of The Tabernacle Of The LORD, And To Stand Before The Congregation To Minister Unto Them
This names the Levites' actual job: caring for and transporting the tabernacle, and serving as the link between the ordinary people and the priests. It was real, essential, God-assigned work - just not the same as the priesthood itself.
🛠️ Real, essential work: caring for and moving the tabernacle
🌉 Served as the link between ordinary Israelites and the priests
🔑 Essential work, but distinct from the priesthood Korah wanted
---
## 👑 And Seek Ye The Priesthood Also?
This is the heart of Korah's actual complaint, finally named directly. Levites handled the tabernacle; only Aaron's direct descendants could serve as priests at the altar and in the Most Holy Place (Exodus 28:1). Korah had real, honored work - he wanted someone else's job on top of it.
👑 Names Korah's real complaint plainly for the first time
🚪 Only Aaron's family could serve as priests at the altar
🔑 Korah didn't lack a role - he wanted a role that wasn't his
---
## 🧑‍⚖️ For Which Cause Both Thou And All Thy Company Are Gathered Together Against The LORD
Moses reframes the whole conflict. What looked like a complaint against him and Aaron personally was, underneath, a complaint against how God had structured Israel's worship. Korah wasn't really fighting two men - he was fighting God's arrangement.
🧑‍⚖️ Reframes the target: not really Moses and Aaron
🎯 The real complaint is against God's own arrangement
🔑 Human leaders were just standing where the complaint landed
---
## 😤 What Is Aaron, That Ye Murmur Against Him?
Moses points out that Aaron has no independent power of his own to be jealous of - he only does what God assigned him. Being angry at Aaron personally misses the point entirely; Aaron isn't the source of the arrangement, only the one carrying it out.
😤 Aaron has no independent authority to resent
📜 He only carries out what God already assigned
🔑 Directing anger at Aaron misses where the real decision was made

# Numbers 16:12-14
# 🚫 Dathan And Abiram Refuse To Come
---
## ❌ We Will Not Come Up
When Moses sends for Dathan and Abiram, they simply refuse - twice, once here and again at the end of verse 14. Where Korah at least showed up to make his case, these two won't even appear before Moses to discuss it.
❌ A flat, repeated refusal - stated at both ends of this passage
🚪 Won't even appear before Moses to make their case
🔑 A harder, more defiant stance than Korah's own
---
## 🍯 Is It A Small Thing That Thou Hast Brought Us Up Out Of A Land That Floweth With Milk And Honey
This line is shocking once you catch it - "a land flowing with milk and honey" is the Bible's standard phrase for the Promised Land (Exodus 3:8), and Dathan and Abiram apply it to Egypt instead. They've rewritten their own history, calling the place of their slavery the good land they were dragged away from.
🍯 "Flowing with milk and honey" is normally Canaan's description
🔁 Here it's twisted to describe Egypt, the place of their slavery
🔑 A complete rewrite of their own history
---
## ⚰️ To Kill Us In The Wilderness
Dathan and Abiram flip the story completely - the God who rescued them from slavery becomes, in their retelling, someone trying to kill them. This is the same accusation Israel has already made against Moses more than once earlier in the wilderness journey (Exodus 16:3, 17:3).
⚰️ Turns the rescue itself into an accusation of murder
🔁 The same complaint Israel has already made more than once
🔑 A familiar pattern of blame repeating itself
---
## 👑 Except Thou Make Thyself Altogether A Prince Over Us
This accuses Moses of the exact thing Korah accused him of in verse 3 - self-appointed, illegitimate power. Two separate rebel groups land on nearly identical language, showing how widely this same complaint had spread through the camp.
👑 The same "self-appointed ruler" accusation as Korah's group
🔁 Nearly identical wording from a separate group of rebels
🔑 Shows how far this complaint had already spread
---
## 👁️ Wilt Thou Put Out The Eyes Of These Men?
This old idiom means to deceive or blind someone into not seeing the truth - not a literal threat of violence. Dathan and Abiram are accusing Moses of trying to keep the rest of Israel fooled about what's really happening.
👁️ An idiom meaning to deceive or mislead, not a literal act
🎭 Accuses Moses of trying to keep everyone else fooled
🔑 A charge of manipulation, dressed up as a rhetorical question

# Numbers 16:15-19
# 😠 The Test Begins
---
## 😠 Moses Was Very Wroth
This is the first time in the story Moses shows open anger, right after Dathan and Abiram's accusations. Everything before this - falling on his face, reasoning gently with the Levites - was patient. This is the moment patience runs out.
😠 The first open anger Moses shows in this whole story
⏳ Comes right after the most personal, twisted accusation yet
🔑 Marks a clear turning point in his response
---
## 🙏 Respect Not Thou Their Offering
Moses asks God to reject the incense the rebels are about to bring - essentially praying that their worship not be accepted. This isn't personal spite; it's Moses trusting the very test he proposed to expose the truth.
🙏 A prayer that their offering be rejected, not a curse
⚖️ Trusts the test's outcome rather than taking revenge himself
🔑 Still working through God's judgment, not his own
---
## 🫏 I Have Not Taken One Ass From Them, Neither Have I Hurt One Of Them
Moses defends his own integrity as a leader - he's never exploited or abused his position for personal gain. Centuries later, the prophet Samuel makes almost the identical claim when his own leadership is questioned (1 Samuel 12:3), a real echo across Israel's history.
🫏 Moses defends his record: no exploitation, no abuse of power
📜 Samuel later makes an almost identical claim (1 Samuel 12:3)
🔑 A leader answering accusations with an honest record, not just words
---
## 🔥 Take Every Man His Censer... Two Hundred And Fifty Censers
All 250 rebel leaders actually go through with the test, each bringing his own censer. This is full commitment from the whole group - no one backs out once the moment arrives.
🔥 All 250 men actually follow through with the test
🚫 No one backs out once the real moment arrives
🔑 Shows how convinced this group really was
---
## 🚪 Stood In The Door Of The Tabernacle Of The Congregation With Moses And Aaron
The entire confrontation now happens at the tabernacle's own entrance - the most sacred, visible location available. This isn't a private dispute anymore; it's staged exactly where all of Israel can see the outcome.
🚪 Staged at the tabernacle's own entrance, the most visible spot
👀 Impossible for anyone in the camp to miss what happens
🔑 A fully public trial, not a quiet resolution
---
## 👥 Korah Gathered All The Congregation Against Them
What started with 250 leaders now escalates into the entire nation gathering to watch, and by implication, taking sides. Korah pulls the whole camp into the confrontation, not just his original followers.
👥 Escalates from 250 leaders to the entire nation watching
⚖️ The whole camp is now effectively taking sides
🔑 Korah widens the conflict far beyond his original group
---
## ✨ The Glory Of The LORD Appeared Unto All The Congregation
God doesn't stay hidden for this. His visible glory - the same kind of appearance that filled the tabernacle in Exodus 40:34 - shows up in front of everyone, guaranteeing that whatever happens next can't be dismissed as coincidence or explained away later.
✨ God's visible glory appears in front of the entire nation
📖 The same kind of appearance as Exodus 40:34's tabernacle dedication
🔑 Makes sure what happens next can't be explained away

# Numbers 16:20-22
# 🙏 Moses And Aaron Intercede
---
## 🔥 Separate Yourselves From Among This Congregation, That I May Consume Them In A Moment
God offers to destroy the entire nation instantly, not just the 250 rebels - a judgment on the same scale God once proposed after the golden calf (Exodus 32:10) and after the spies' report (Numbers 14:12). Israel's collective willingness to gather against Moses has put everyone at risk, not only the ringleaders.
🔥 God offers to destroy the whole nation, not just the rebels
🔁 The same scale of judgment offered after the golden calf and the spies
🔑 The crowd's support for Korah put everyone at risk
---
## 😨 They Fell Upon Their Faces
Moses and Aaron immediately intercede, the same posture Moses used alone back in verse 4 - but now Aaron joins him, and the stakes are the whole nation's survival rather than his own authority.
😨 The same posture as verse 4, now shared by both men
📈 The stakes have grown from Moses's authority to the nation's survival
🔑 Instant intercession, with no hesitation
---
## 🌬️ O God, The God Of The Spirits Of All Flesh
This title for God appears only here and in one other place in the whole Bible (Numbers 27:16) - it points to God as the source and giver of life to every living thing. Moses and Aaron use it deliberately: the God who gives life to everyone, not just the guilty, should weigh that before wiping out the whole camp.
🌬️ A rare title for God, used only twice in the entire Bible
💨 Points to God as the source of life for every living thing
🔑 Chosen deliberately to appeal to God's role as life-giver
---
## ⚖️ Shall One Man Sin, And Wilt Thou Be Wroth With All The Congregation?
Moses and Aaron appeal to a principle of individual guilt over collective punishment - strikingly close to Abraham's earlier appeal for Sodom, asking whether the righteous should be destroyed along with the guilty (Genesis 18:23-25). It works: the judgment that follows lands on the guilty specifically, not the whole camp.
⚖️ Appeals to individual guilt over blanket collective punishment
📖 Echoes Abraham's earlier appeal for Sodom in Genesis 18
🔑 The appeal succeeds - judgment lands on the guilty specifically

# Numbers 16:23-30
# ⚖️ The Line Is Drawn
---
## 🚶 Get You Up From About The Tabernacle Of Korah, Dathan, And Abiram
God's answer to Moses and Aaron's appeal is a compromise of sorts - instead of destroying everyone, He commands the rest of the camp to physically separate from the three ringleaders' tents. Distance itself becomes the way the innocent are protected.
🚶 God's answer: physical separation, not blanket destruction
📏 Distance becomes the way the rest of the camp stays safe
🔑 The appeal in verse 22 gets a specific, workable answer
---
## 👴 Moses Rose Up And Went Unto Dathan And Abiram; And The Elders Of Israel Followed Him
Even though Dathan and Abiram had already flatly refused to come to him twice, Moses goes to them personally instead of sending someone else. The elders following along adds public, respected witnesses to whatever happens next.
👴 Moses goes to them personally, despite their earlier refusal
👥 The elders following adds respected, public witnesses
🔑 Moses doesn't avoid the confrontation, he walks into it
---
## ⚠️ Depart, I Pray You, From The Tents Of These Wicked Men, And Touch Nothing Of Theirs, Lest Ye Be Consumed In All Their Sins
Moses warns the crowd to keep clear of both the men and their possessions - even physical contact with what belongs to the rebels carries real risk. This is the same logic behind the uncleanness laws already given in Leviticus: sin and its consequences can spread by association.
⚠️ Warns against even touching the rebels' belongings
🦠 Same logic as the uncleanness laws already given in Leviticus
🔑 Consequences here could spread by association, not just guilt
---
## 👨‍👩‍👧‍👦 Dathan And Abiram Came Out, And Stood In The Door Of Their Tents, And Their Wives, And Their Sons, And Their Little Children
This is one of the hardest details in the chapter, and it's worth being honest about rather than skipped: the text specifically names the wives and small children standing there too, right before the judgment described in the next section. The Bible doesn't hide the human cost of this rebellion or pretend it only touched the guilty men themselves.
👨‍👩‍👧‍👦 Wives and small children are specifically mentioned as present
😔 One of the hardest, most honest details in the whole chapter
🔑 The text doesn't soften or hide the human cost involved
---
## 🎯 Hereby Ye Shall Know That The LORD Hath Sent Me To Do All These Works; For I Have Not Done Them Of Mine Own Mind
Moses puts everything on the line here. He's not asking Israel to simply trust him - he's telling them exactly what would prove or disprove his entire mission, in advance, in public. If nothing unusual happens, he's admitting his leadership claim would be false.
🎯 Moses states in advance exactly what would prove him wrong
📢 Said publicly, before the outcome is known
🔑 He risks his entire credibility on a specific, testable outcome
---
## 💀 If These Men Die The Common Death Of All Men... Then The LORD Hath Not Sent Me
This sets up a clear control case - ordinary death, from natural causes or old age, would prove nothing either way. Moses needs something nobody could mistake for coincidence.
💀 Ordinary death would prove nothing about who's right
🎲 Sets up a clear test with a real chance of failure
🔑 Moses isn't hedging - he names the outcome that would disprove him
---
## 🌍 If The LORD Make A New Thing, And The Earth Open Her Mouth
"A new thing" signals something that has never happened before - not a natural disaster or an existing kind of judgment, but an entirely unprecedented act tied directly to this specific moment.
🌍 "A new thing" means something without precedent
🆕 Not an existing kind of disaster, but something never seen before
🔑 Deliberately unmistakable as a direct, specific answer
---
## 🕳️ And They Go Down Quick Into The Pit
"Quick" here is an old English word meaning alive, not fast - the same meaning behind the older phrase "the quick and the dead." Moses predicts they'll be swallowed while still living, not killed first and then buried.
🕳️ "Quick" is old English for "alive," not "fast"
📖 The same meaning behind the phrase "the quick and the dead"
🔑 Predicts they'll be swallowed alive, not killed first
---
## 💡 Then Ye Shall Understand That These Men Have Provoked The LORD
Moses names the real charge one final time before the outcome plays out - not disagreement with him personally, but active provocation against God. Whatever happens next is framed as God's own verdict, not Moses's revenge.
💡 Names the real charge: provoking God, not disagreeing with Moses
⚖️ Frames the coming outcome as God's verdict, not Moses's revenge
🔑 The last word before the test is carried out

# Numbers 16:31-35
# 🌍 The Earth Opens
---
## ⚡ It Came To Pass, As He Had Made An End Of Speaking All These Words
The timing is immediate and precise - the judgment happens the instant Moses finishes speaking, not later, not gradually. There's no gap where the prediction could be seen as a lucky guess.
⚡ Happens the exact moment Moses stops speaking
⏱️ No delay that could make it look like coincidence
🔑 Timing itself becomes part of the proof
---
## 🪨 The Ground Clave Asunder That Was Under Them
"Clave asunder" is old English for split or tore apart completely. The ground doesn't just crack - it opens up specifically and only under the rebels, exactly where they're standing.
🪨 "Clave asunder" means split or torn completely apart
🎯 The ground opens specifically under the rebels, not elsewhere
🔑 A precise judgment, not random destruction
---
## 🕳️ The Earth Opened Her Mouth, And Swallowed Them Up, And Their Houses, And All The Men That Appertained Unto Korah, And All Their Goods
This fulfills Moses's exact prediction from verse 30, word for word - even including their households and possessions, just as he described. Nothing about the outcome is vague or partial.
🕳️ Matches Moses's prediction from verse 30 exactly
🏠 Includes their households and possessions, as predicted
🔑 A complete, precise fulfillment, not a rough approximation
---
## 🚶 They... Went Down Alive Into The Pit, And The Earth Closed Upon Them: And They Perished From Among The Congregation
The earth doesn't just open - it closes again afterward, leaving no visible trace, no bodies, no grave. Their disappearance from Israel's camp is total and permanent.
🚶 The earth closes again, leaving no trace behind
🚫 No bodies, no burial, no visible grave afterward
🔑 A permanent, total disappearance from the camp
---
## 😱 All Israel That Were Round About Them Fled At The Cry Of Them
The nearby crowd's panic is described in raw, human terms - people screaming and running in real time as the ground opens beneath their neighbors' feet. This wasn't a calm, distant miracle; it was terrifying up close.
😱 Described in raw, human terms - screaming, running
🏃 A terrifying, chaotic scene, not a calm distant miracle
🔑 Grounds the miracle in real human panic, not abstraction
---
## 💭 Lest The Earth Swallow Us Up Also
The fleeing crowd's fear reveals something important - they clearly understood this as targeted judgment specifically on the rebels, and worried it might spread if they stood too close. Their fear was for their own safety, not grief for the men who died.
💭 Reveals the crowd understood this as targeted judgment
😨 Their fear is for their own safety, not grief for the rebels
🔑 Shows how clearly the judgment's message landed, even in panic
---
## 🔥 There Came Out A Fire From The LORD, And Consumed The Two Hundred And Fifty Men That Offered Incense
This is a separate judgment from the earth swallowing Korah, Dathan, and Abiram - the 250 censer-bearing leaders die by fire instead, echoing exactly how Nadab and Abihu died for unauthorized incense back in Leviticus 10:2. The punishment matches the specific sin: they misused the priestly fire ritual, so fire is what judges them.
🔥 A separate method of judgment from the earth-swallowing
📖 Echoes Nadab and Abihu's death for unauthorized incense (Leviticus 10:2)
🔑 The judgment matches the specific misuse of fire and incense

# Numbers 16:36-40
# 🔨 The Censers Become A Warning
---
## 👨‍⚕️ Speak Unto Eleazar The Son Of Aaron The Priest, That He Take Up The Censers Out Of The Burning
God assigns this task to Eleazar, Aaron's son, rather than to Aaron himself. As the active high priest, Aaron likely needed to stay clear of contact with dead bodies and burned remains under the purity rules given later in Leviticus 21:10-11 - so his son, next in line, handles it instead.
👨‍⚕️ Assigned to Eleazar, not Aaron himself
🚫 Likely tied to priestly purity rules around corpse contact
🔑 Shows the priesthood's own rules already shaping decisions
---
## ✨ For They Are Hallowed
Even though the 250 men used these censers wrongly, the objects themselves became consecrated the moment they were used before the LORD in a formal ritual - misuse by a person doesn't undo an object's holy status once it's been offered. The censers outlive the men who misused them.
✨ Wrongly used, but the objects themselves became consecrated
🔄 Misuse by a person doesn't undo an object's holy status
🔑 The censers outlast the men who carried them
---
## 🔨 Broad Plates For A Covering Of The Altar
The 250 bronze censers were hammered flat and fused into a permanent overlay covering the altar of burnt offering - the same altar every Israelite would see every single time they brought a sacrifice from now on.
🔨 Hammered flat into a permanent covering for the altar
👁️ The same altar every Israelite would see at every sacrifice
🔑 Turns a judgment into something built into daily worship
---
## 📌 A Memorial Unto The Children Of Israel... A Sign
"Memorial" and "sign" both point to the same purpose: a permanent, physical reminder meant to outlast anyone who actually witnessed the event firsthand. Future generations who never saw the earth open would still see this bronze plating and know why it was there.
📌 Built to outlast anyone who saw the event happen
🔔 Future generations would see it without hearing the story firsthand
🔑 Turns a one-time event into a lasting, physical teaching tool
---
## 🚫 That No Stranger, Which Is Not Of The Seed Of Aaron, Come Near To Offer Incense Before The LORD
This states the direct, practical rule this whole event was meant to settle once and for all: only Aaron's actual descendants may offer incense before the LORD. Korah's entire challenge gets a permanent, written answer built right into the altar itself.
🚫 States the rule this whole event was meant to settle
👨‍👦 Only Aaron's actual descendants could offer incense
🔑 Korah's challenge gets a permanent answer built into the altar
---
## 🔁 That He Be Not As Korah, And As His Company: As The LORD Said To Him By The Hand Of Moses
"By the hand of Moses" is an idiom meaning "through Moses" or "by way of Moses" - the same phrasing already used back in chapter 15:23, tying this ruling directly to that earlier statement about the Law's real source. Moses delivered the message; God is still the one who gave it.
🔁 "By the hand of" means "through," not "made by," Moses
🔗 The same idiom already used in chapter 15:23
🔑 Keeps the credit for this ruling with God, not Moses

# Numbers 16:41-45
# 😤 Israel Blames Moses Again
---
## 😤 On The Morrow
This entire section happens the very next day after the earth swallowed Korah's group and fire consumed the 250 leaders - not weeks or months later, when memory might have faded, but immediately, while the ground itself was still fresh.
😤 Happens the very next day after the judgment
🕐 Not enough time to have simply forgotten what happened
🔑 Shows how quickly the lesson was ignored
---
## 💀 Ye Have Killed The People Of The LORD
This accusation is staggering given what just happened - the crowd blames Moses and Aaron personally for a judgment that came directly and visibly from God Himself. They watched the earth open and fire fall, and still found a way to place the blame on the human leaders instead.
💀 Blames Moses and Aaron for what God visibly did Himself
👀 Said by people who watched it happen with their own eyes
🔑 Shows how far denial can go, even after witnessing a miracle
---
## ☁️ The Cloud Covered It, And The Glory Of The LORD Appeared
This is nearly identical language to verse 19's appearance right before the first judgment - a clear signal to the reader that the same kind of confrontation is about to happen again, this time triggered by the whole nation's complaint instead of just 250 leaders.
☁️ Nearly identical wording to verse 19's earlier appearance
🔁 Signals a second, similar confrontation is starting
🔑 The pattern repeats because the underlying problem repeats
---
## 🔥 Get You Up From Among This Congregation, That I May Consume Them As In A Moment
God repeats almost exactly what He said in verse 21 - a second offer to destroy the entire nation at once. The people's continued blame, right after witnessing undeniable judgment, has put everyone at risk all over again.
🔥 Nearly word-for-word repeat of God's offer in verse 21
🔁 The second time this exact threat is made in one chapter
🔑 Continued blame puts the whole nation at risk again
---
## 🙇 And They Fell Upon Their Faces
Moses and Aaron repeat their same posture of intercession a third time in this chapter - but this time there's no room for a long conversation first. The plague described in the next section has already started.
🙇 The third time this posture appears in one chapter
⏱️ No time for a long appeal - the plague has already begun
🔑 Intercession now has to happen at emergency speed

# Numbers 16:46-50
# 🕯️ Aaron Stands Between The Dead And The Living
---
## 🔥 Take A Censer, And Put Fire Therein From Off The Altar
This is the same tool that got 250 men killed earlier in this very chapter - but this time the fire comes from the authorized altar itself, not from an unauthorized source. The censer isn't the problem; using it without God's authorization was.
🔥 The same tool that just killed 250 men for misuse
✅ This time the fire is properly taken from the altar itself
🔑 Shows the ritual itself wasn't the problem - unauthorized use was
---
## 🏃 Go Quickly Unto The Congregation, And Make An Atonement For Them: For There Is Wrath Gone Out From The LORD; The Plague Is Begun
There's real urgency here - people are already dying while Aaron runs to intervene. Atonement isn't a scheduled ritual this time; it's an emergency response to stop an active, spreading disaster.
🏃 People are already dying as Aaron runs to respond
⏱️ Atonement here is an emergency, not a scheduled ritual
🔑 Urgency itself is part of how this atonement works
---
## 🧍 He Stood Between The Dead And The Living; And The Plague Was Stayed
This is one of the most vivid pictures in the whole book - Aaron physically positions himself as a barrier between those who have already died and those still at risk, and the plague simply stops advancing past him. It's a striking early picture of a priest standing in the gap on behalf of the people he serves.
🧍 Aaron physically stands as a barrier between death and life
🛑 The plague stops advancing the moment he takes that position
🔑 A vivid, literal picture of priestly mediation
---
## 🔢 Now They That Died In The Plague Were Fourteen Thousand And Seven Hundred, Beside Them That Died About The Matter Of Korah
This death toll is kept entirely separate from Korah's group, and the text is careful to say so - fourteen thousand seven hundred people died in this second wave alone, on top of whoever died with Korah, Dathan, Abiram, and the 250 censer-bearers. The chapter refuses to blur these numbers together or soften the total cost.
🔢 Kept separate from Korah's group's own death toll
📊 14,700 people died in this second wave alone
🔑 The text doesn't blur or soften the real scale of the loss
---
## 🚪 And Aaron Returned Unto Moses Unto The Door Of The Tabernacle Of The Congregation: And The Plague Was Stayed
The chapter closes back at the same location where the very first confrontation happened in verses 18-19 - the tabernacle's door. What began as a challenge to Aaron's priesthood ends with Aaron's priesthood being the very thing that stops a nation from being wiped out.
🚪 Closes at the same location the first confrontation began
🔄 The challenge to Aaron's role ends with that role saving the nation
🔑 A deliberate full-circle ending to the whole chapter
`;

export const NUMBERS_SIXTEEN_PERSONAL_SECTIONS = parseNumbersSixteenRawNotes(NUMBERS_SIXTEEN_RAW_NOTES);
