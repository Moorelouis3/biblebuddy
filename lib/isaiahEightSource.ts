export type IsaiahEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahEightRawNotes(rawText: string): IsaiahEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 8:${startVerse}` : `Isaiah 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Isaiah 8 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_EIGHT_RAW_NOTES = `# Isaiah 8:1-4
# 📜 A Son Named For Coming Plunder
---
## 📜 Take Thee A Great Roll

"A roll" means a large sheet used for writing, similar to a scroll.

It was big enough that anyone passing by could read it.

God tells Isaiah to make this message public, not private.

This was meant to be seen by the whole city, not filed away quietly.

📜 Roll means a large writing sheet

👀 Sized to be read from a distance

📢 God wanted this message seen publicly

📖 A public sign, not a private note
---
## ✍️ With A Man's Pen Concerning Mahershalalhashbaz

"A man's pen" means plain, ordinary handwriting anyone could read.

Many scholars translate Mahershalalhashbaz as quick to the plunder, swift to the spoil.

Mahershalalhashbaz is the name Isaiah will give his own son two verses later.

Isaiah writes the name down before the child is even conceived.

That timing turns ordinary handwriting into prophecy.

✍️ A man's pen means plain handwriting

👶 Mahershalalhashbaz names Isaiah's coming son

⚡ It means quick to the plunder

📖 A name written before it happens
---
## 👥 Faithful Witnesses To Record, Uriah The Priest, And Zechariah The Son Of Jeberechiah

Isaiah does not just write the name down in private.

He brings in two respected men to witness it formally.

Uriah the priest and Zechariah were well known figures in Jerusalem.

Their signatures worked like a dated, notarized document today.

This made the prophecy impossible to deny once it came true.

👥 Two respected witnesses confirm the writing

⛪ Uriah served as a priest

✅ Their presence worked like notarizing it

📖 No one could deny it later
---
## 👩 I Went Unto The Prophetess

"The prophetess" refers to Isaiah's own wife.

Scripture never names her directly anywhere in this book.

She likely carries the title prophetess because she is married to a prophet.

Their marriage becomes part of the sign God is building in this chapter.

👩 The prophetess is Isaiah's own wife

🤫 Scripture never gives her a name

💍 Marriage becomes part of the sign

➡️ Even his household serves the message
---
## 👶 Call His Name Mahershalalhashbaz

God commands Isaiah to give this exact name to his newborn son.

Every time someone said the boy's name, they repeated a prophecy out loud.

Quick to the plunder, swift to the spoil, was not a compliment.

It announced fast coming disaster for two specific enemy kingdoms.

👶 God names the child himself

🗣️ Saying the name repeated a prophecy

⚔️ It warned of fast coming disaster

📖 A living sign in the house
---
## ⏳ Before The Child Shall Have Knowledge To Cry, My Father, And My Mother

"My father" and "my mother" were some of a toddler's very first words.

That phrase sets a short timeframe, about a year or two.

God is not describing a distant, vague future event here.

He is naming a deadline that Isaiah's own listeners would live to see.

👶 First baby words set the timeline

⏳ Only a year or two away

🗓️ Not a distant, vague future

📖 A deadline the listeners would see
---
## 🏙️ The Riches Of Damascus And The Spoil Of Samaria

Damascus was Rezin's capital, the same king named back in chapter seven.

Samaria was Pekah's capital, the other king threatening Judah.

Mahershalalhashbaz's name promised plunder taken from exactly these two cities.

Assyria would strip both kingdoms bare before the child could speak a sentence.

🏛️ Damascus was Rezin's capital city

🏙️ Samaria was Pekah's capital city

⚔️ The boy's name named these targets

📖 Assyria stripped both cities bare
# Isaiah 8:5-8
# 🌊 Gentle Waters Or A Flooding River
---
## 🗣️ The LORD Spake Also Unto Me Again

This introduces a second message inside the very same chapter.

The first message centered on a child's name and a coming judgment.

This next message explains exactly why that judgment is coming.

God does not just announce disaster, he explains the reason behind it.

🗣️ A second message begins here

👶 The first was about the child's name

❓ This one explains the reason why

📖 God always explains his judgments
---
## 🌊 This People Refuseth The Waters Of Shiloah That Go Softly

Shiloah was a gentle stream that quietly supplied water to Jerusalem.

It flowed slowly and softly, needing no army to protect it.

The stream stood for calm trust in God's quiet provision.

Judah rejected that quiet trust and reached for a louder solution instead.

🌊 Shiloah was Jerusalem's gentle water source

🤫 It flowed slowly, needing no army

🙏 It pictured quiet trust in God

📖 Judah rejected that quiet trust
---
## 😠 Rejoice In Rezin And Remaliah's Son

Rezin and Remaliah's son, Pekah, were the two enemy kings from chapter seven.

Many scholars believe part of Judah actually welcomed an alliance with these kings.

That alliance looked like safety, but it meant trusting enemies instead of God.

Comfort in the wrong place was the real problem God named here.

👑 Rezin and Pekah are chapter seven's kings

🤝 Some in Judah wanted their alliance

🚫 Trusting them meant not trusting God

📖 Comfort in the wrong place
---
## 🌊 The Waters Of The River, Strong And Many

"The river" here means the Euphrates, the heart of the Assyrian empire.

It was wide, fast, and impossible to walk across safely.

Isaiah sets it directly against the gentle stream of Shiloah from two verses earlier.

Judah wanted a stronger ally, and God warns that strength would drown them instead.

🌊 The river means the mighty Euphrates

💪 Assyria's power dwarfed Shiloah's stream

⚖️ Isaiah contrasts the two waters

📖 The stronger ally would drown them
---
## 🌊 He Shall Overflow And Go Over, He Shall Reach Even To The Neck

This pictures a flood rising on a person's body, inch by inch.

"To the neck" means the water rises almost high enough to drown completely.

Jerusalem is the head still above the flood in this picture.

The city would survive this invasion, but only barely.

🌊 A flood rising higher and higher

😰 To the neck means almost drowning

🏙️ Jerusalem is the head, still above

📖 Survival here was barely, not easily
---
## 🕊️ The Stretching Out Of His Wings Shall Fill The Breadth Of Thy Land, O Immanuel

"Wings" here pictures the flood spreading across the whole width of the land.

The invading army would cover every part of Judah, not just the borders.

God speaks directly to Immanuel, the child named back in chapter seven.

Even in judgment, the land still belongs to the promised child, not to Assyria.

🕊️ Wings pictures the flood spreading wide

🗺️ The whole land would be covered

👶 God speaks to Immanuel by name

📖 The land still belongs to the promise
# Isaiah 8:9-10
# 🛡️ Every Plot Against God Fails
---
## ⚔️ Associate Yourselves, O Ye People, And Ye Shall Be Broken In Pieces

Isaiah suddenly turns and speaks straight to the surrounding nations.

"Associate yourselves" means banding together, forming an alliance for war.

The command "gird yourselves" repeats three times in this single verse.

Repetition here builds tension before this whole plan collapses.

⚔️ Isaiah addresses the nations directly

🤝 Associate means joining forces for war

🔁 Gird yourselves repeats three times

📖 Repetition builds tension before it fails
---
## 📜 Take Counsel Together, And It Shall Come To Nought

"Counsel" here means a war plan, strategy made in secret meetings.

"Come to nought" means the plan will collapse into nothing.

Every scheme built by these nations is doomed before it even starts.

📜 Counsel means a secret war plan

💥 Come to nought means total collapse

⏳ Doomed before it even starts

📖 No plan can defeat God's own purpose
---
## 🙌 For God Is With Us

This phrase is the Hebrew words Immanu and El joined together.

It is the exact same promise from the sign given back in chapter seven.

No war plan can succeed against a people who truly carry this promise.

The chapter's whole argument rests on this one short phrase.

🙌 Immanu El means God is with us

🔁 The same promise from chapter seven

🛡️ No plan succeeds against this promise

📖 This phrase anchors the whole chapter
# Isaiah 8:11-15
# ⚖️ Fear The LORD, Not The Nations
---
## 💪 The LORD Spake Thus To Me With A Strong Hand

"A strong hand" describes an intense, overpowering sense of God's presence.

This was not a quiet suggestion whispered to Isaiah.

It felt forceful enough that Isaiah could not ignore or explain it away.

God wanted this next instruction taken with total seriousness.

💪 A strong hand means overwhelming presence

🤐 Not a quiet suggestion at all

🚫 Isaiah could not ignore it

📖 God wanted total seriousness here
---
## 🚶 I Should Not Walk In The Way Of This People

"The way of this people" means the fear driving Judah's political panic.

Most of Jerusalem wanted Isaiah to share their terror of Syria and Israel.

God instructs Isaiah to stand apart from that popular fear completely.

Standing apart from the crowd's fear takes real, deliberate obedience.

🚶 Their way means political fear and panic

😱 Most of Jerusalem shared that fear

🧍 Isaiah is told to stand apart

📖 Obedience meant not following the crowd
---
## 🤝 Say Ye Not, A Confederacy

"A confederacy" means a conspiracy, a secret alliance people feared was forming.

Rumors of enemy alliances were spreading fear through Jerusalem.

God tells Isaiah not to repeat that same fearful word.

Refusing to say it out loud was a way of refusing to fear it.

🤝 Confederacy means a feared conspiracy

🗣️ Rumors were spreading through Jerusalem

🚫 Isaiah is told not to repeat it

📖 Refusing the word refused the fear
---
## 😨 Neither Fear Ye Their Fear, Nor Be Afraid

Isaiah is told not to catch the panic spreading around him.

Fear can spread through a crowd the same way a rumor does.

God calls Isaiah to a completely different response than everyone around him.

That kind of calm only comes from trusting someone bigger than the threat.

😨 Their fear means the crowd's panic

🔁 Fear spreads like a rumor does

🧘 Isaiah is called to stay calm

📖 Calm comes from trusting someone bigger
---
## 🙏 Sanctify The LORD Of Hosts Himself

"Sanctify" means to treat something as set apart, holy, and worthy of reverence.

"LORD of hosts" pictures God commanding armies of angels, not just one nation.

Instead of treating rumors as the biggest threat, Isaiah is told to treat God that way.

Reverence for God was meant to replace fear of Syria and Israel entirely.

🙏 Sanctify means treat as holy

⚔️ LORD of hosts commands angel armies

🔄 Reverence was meant to replace fear

📖 God, not rumors, deserved the awe
---
## 😰 Let Him Be Your Fear, And Let Him Be Your Dread

This repeats the same idea from the verse just before it.

Fear itself was not being erased, only redirected toward the right object.

A healthy fear of God actually cancels out an unhealthy fear of enemies.

That kind of fear leads to trust, not to panic.

🔁 This repeats the verse before it

🎯 Fear gets redirected, not erased

⚖️ Fear of God cancels fear of enemies

📖 This kind of fear leads to trust
---
## 🏛️ He Shall Be For A Sanctuary

A "sanctuary" is a safe place set apart for protection and worship.

For those who trust him, God himself becomes that safe place.

This promise applies to anyone who takes the two verses before it seriously.

Safety was never found in political alliances, only in God himself.

🏛️ Sanctuary means a safe, set apart place

🙏 God himself becomes that place

✅ True for anyone who trusts him

📖 Safety was never in alliances
---
## 🪨 But For A Stone Of Stumbling And For A Rock Of Offence To Both The Houses Of Israel

The same God who protects the faithful trips up the unfaithful.

"Both the houses of Israel" means the northern and southern kingdoms together.

A stone of stumbling is something people trip over without noticing.

They refuse to see it clearly.

So they stumble instead of standing firm.

The New Testament later quotes this exact verse about Jesus himself.

🪨 The same God can trip people up

🏘️ Both houses means north and south together

👁️ Stumbling means refusing to see clearly

📖 The New Testament applies this to Jesus
---
## 🪤 A Gin And For A Snare To The Inhabitants Of Jerusalem

A "gin" is an old word for a trap used to catch birds.

A "snare" works the same way, a hidden trap that catches someone off guard.

Jerusalem's own residents could be caught off guard by rejecting this same God.

The warning was aimed at insiders, not just outside enemies.

🪤 Gin means an old bird trap

🕸️ Snare means a hidden trap

🏙️ Jerusalem's own people were warned

📖 The warning targeted insiders, not outsiders
---
## 💥 Many Among Them Shall Stumble, And Fall, And Be Broken, And Be Snared, And Be Taken

Five verbs pile up in this one verse without a break.

Stumble, fall, broken, snared, taken, describe one steady collapse, not five separate events.

This is the real cost of treating God as optional instead of essential.

The same God who offers a sanctuary can also become a trap.

💥 Five verbs describe one long collapse

⬇️ Stumble leads straight into being taken

⚠️ This is the cost of rejecting God

📖 Sanctuary and trap come from the same God
# Isaiah 8:16-18
# 📜 Sealed Words And Living Signs
---
## 📜 Bind Up The Testimony, Seal The Law Among My Disciples

"Bind up" and "seal" both describe closing a scroll so it cannot be changed.

"The testimony" and "the law" mean this same spoken message from God.

"My disciples" refers to the small circle of people who actually believed Isaiah.

Sealing this message meant preserving it as proof for whenever it came true.

📜 Bind up and seal close a scroll

🔒 Sealing prevents any later changes

👥 Disciples means those who believed him

📖 Sealed words became proof later
---
## 🙏 I Will Wait Upon The LORD, That Hideth His Face From The House Of Jacob

God "hiding his face" describes a period when he seems silent or distant.

Most of Judah felt abandoned during this stretch of political danger.

Isaiah's response is patient waiting, not panic or complaint.

Waiting quietly for God takes more trust than demanding an instant answer.

🙈 Hiding his face means feeling distant

😟 Most of Judah felt abandoned

🧘 Isaiah waits instead of panicking

📖 Patient trust outlasts an instant answer
---
## 👨‍👦 I And The Children Whom The LORD Hath Given Me Are For Signs And For Wonders

Isaiah's own children, Shearjashub and Mahershalalhashbaz, both carried prophetic names.

Their names alone preached a message every time someone spoke them.

The New Testament book of Hebrews later quotes this exact verse.

God used an ordinary family as walking, talking proof of his word.

👨‍👦 Isaiah's own sons carried prophetic names

🗣️ Their names preached without a sermon

👪 An ordinary family became living proof

📖 Hebrews later quotes this verse
---
## ⛰️ Which Dwelleth In Mount Zion

Mount Zion was the hill in Jerusalem where the temple stood.

Naming this place ties "the LORD of hosts" back to a real, physical address.

God was not a distant idea during this crisis.

He was present in the city Isaiah and his family called home.

⛰️ Zion was Jerusalem's temple hill

📍 It gave God a real address

🏠 Not a distant, abstract idea

📖 God was present in their own city
# Isaiah 8:19-22
# 🌑 Darkness Before The Dawn
---
## 👻 Seek Unto Them That Have Familiar Spirits, And Unto Wizards That Peep, And That Mutter

"Familiar spirits" refers to mediums who claimed to summon spirits of the dead.

"Wizards that peep and mutter" describes eerie, whispered chanting used in these sessions.

The Law of Moses strictly forbade consulting these mediums for guidance.

Fear was pushing some in Judah toward exactly the practice God had already banned.

👻 Familiar spirits means mediums for the dead

🗣️ Peep and mutter describes eerie chanting

🚫 The Law already forbade this practice

📖 Fear pushed people toward what God banned
---
## ❓ Should Not A People Seek Unto Their God? For The Living To The Dead?

Isaiah answers the temptation with one sharp, obvious question.

Why ask the dead for answers when the living God was right there.

The question exposes how backward fear had made their thinking.

Real guidance was never actually missing, only ignored.

❓ Isaiah answers with one sharp question

💀 Why ask the dead for answers

🙃 Fear had made their thinking backward

📖 Real guidance was never missing
---
## 📏 To The Law And To The Testimony

This phrase names the real test for any spiritual claim.

"The law" and "the testimony" both point back to God's own recorded word.

Any message, even one that sounds impressive, still has to match this standard.

Isaiah hands his readers a permanent measuring stick, not a one time answer.

⚖️ Law and testimony means God's own word

📏 This is the real test to use

🚫 Impressive claims still must match it

📖 A permanent standard, not a one time answer
---
## 🌑 If They Speak Not According To This Word, It Is Because There Is No Light In Them

"No light" pictures spiritual darkness, someone without real understanding or truth.

Any teacher or medium whose words contradict scripture fails this test completely.

Isaiah gives a clear, simple way to spot a false guide.

The standard is not eloquence or confidence, only agreement with God's word.

🌑 No light pictures spiritual darkness

🚫 Contradicting scripture fails the test

🔍 A clear way to spot false guides

📖 Agreement with God's word is the standard
---
## 😫 Hardly Bestead And Hungry

"Bestead" is an old word meaning pressed hard by trouble or distress.

Isaiah pictures a population worn down by both war and famine.

This is the real, physical cost of ignoring the warnings God had already given.

Suffering here is not random, it follows directly from rejecting the verse before it.

😫 Bestead means pressed hard by trouble

🍞 War and famine strike together

⚠️ A real physical cost of ignoring warnings

📖 Suffering follows from rejecting God's word
---
## 😤 Curse Their King And Their God, And Look Upward

This is not repentance, even though they look up toward heaven.

Looking upward here comes paired with cursing, not with prayer.

Suffering by itself does not automatically produce a changed heart.

Some people grow angrier at God the worse their circumstances become.

😤 Looking up here is not repentance

🤬 It comes paired with cursing

💔 Suffering does not guarantee a changed heart

📖 Some grow angrier, not humbler
---
## 🌑 They Shall Look Unto The Earth

The chapter that opened with a specific, named child now closes in darkness.

"Dimness of anguish" describes a grief so heavy it blurs a person's whole outlook.

This bleak ending sets up the sudden change in the chapter that follows.

Isaiah nine opens with light breaking into this exact darkness.

🌑 The chapter ends in real darkness

😢 Dimness of anguish means blurring grief

🌗 This sets up chapter nine's turn

📖 Light is about to break in
`.trim();

export const ISAIAH_EIGHT_PERSONAL_SECTIONS = parseIsaiahEightRawNotes(ISAIAH_EIGHT_RAW_NOTES);
