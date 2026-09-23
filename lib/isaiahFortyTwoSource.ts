export type IsaiahFortyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFortyTwoRawNotes(rawText: string): IsaiahFortyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFortyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+42:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 42 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+42:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+42:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 42 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 42,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 42:${startVerse}` : `Isaiah 42:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Isaiah 42 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FORTY_TWO_RAW_NOTES = `# Isaiah 42:1-4
# 🕊️ The Servant Introduced
---
## 🕊️ Behold My Servant

This is the first of four "Servant Songs" in Isaiah.

Each song describes a coming figure who will rescue and restore.

Matthew twelve quotes this exact passage and applies it directly to Jesus.

The servant is not just any faithful worker.

He is the one this whole book has been building toward.

🕊️ Servant Songs appear four times in Isaiah

📜 Matthew twelve applies this to Jesus

🎯 The servant is the whole book's goal

📖 God names His chosen rescuer here

## 🎯 Mine Elect, In Whom My Soul Delighteth

"Elect" means specially chosen for an important purpose.

This was not a random pick.

God set this servant apart before anything else in the chapter happens.

"Delighteth" means God takes deep joy in him.

That joy is not the same as simple approval.

Being chosen for hard work rarely brings real delight too.

Here both come together completely.

🎯 Elect means specially chosen

😊 Delighteth means deep joy, not approval

🤝 Both chosen and delighted in

📖 God's joy rests on His servant

## ✨ I Have Put My Spirit Upon Him

God is not just choosing a title here.

He is giving the servant real power to do the work.

This same language appears later when Jesus is baptized in Matthew three.

Kings and prophets in the Old Testament often received the Spirit too.

The servant belongs to that same line.

He goes far beyond any king or prophet before him.

✨ Spirit means real power, not a title

👑 Kings and prophets received it too

🌊 Jesus receives the same Spirit at baptism

📖 The servant surpasses every one before him

## ⚖️ He Shall Bring Forth Judgment To The Gentiles

"Judgment" here does not mean punishment.

It means true justice, right order set in place.

"Gentiles" means every nation that is not Israel.

For most of the Old Testament, God's covenant focused on Israel alone.

Here the servant's mission suddenly reaches the whole world.

⚖️ Judgment means justice, not punishment

🌍 Gentiles means nations outside Israel

📜 God's focus had been Israel alone

📖 The servant's mission reaches everyone

## 🤫 He Shall Not Cry, Nor Lift Up His Voice

A conquering king in the ancient world announced himself loudly.

He shouted commands, paraded through streets, forced people to notice him.

This servant works the opposite way.

He brings a message without ever raising his voice in public.

Quiet strength turns out to be a real kind of strength.

🤫 No shouting, no loud announcements

👑 Ancient kings ruled with noise and force

🌿 This servant works quietly instead

📖 Quiet strength is still real strength

## 🌾 A Bruised Reed Shall He Not Break

A "reed" is a tall, thin plant stalk that grows near water.

A bruised reed is already cracked and weak, ready to snap.

Most people would finish breaking it off and throw it away.

The servant treats broken, struggling people the same gentle way.

He does not finish off what is already weak.

🌾 Reed means a thin, weak plant stalk

🩹 Bruised means already cracked, nearly broken

🤲 The servant does not finish it off

📖 Broken people are handled gently, not discarded

## 🕯️ The Smoking Flax Shall He Not Quench

"Flax" was the plant fiber used to make lamp wicks in this culture.

"Smoking flax" means a wick that has almost burned out.

It gives off smoke but no real flame anymore.

Anyone would just pinch it out and light a fresh one.

The servant does not snuff out a fading, struggling faith.

Even a small flicker of belief stays safe in his hands.

🕯️ Flax means the fiber used for lamp wicks

💨 Smoking flax means a wick nearly out

🚫 The servant does not snuff it out

📖 A small flicker of faith is safe

## 💪 He Shall Not Fail Nor Be Discouraged

This servant does not run out of strength partway through.

He does not lose heart when the work gets hard.

Verse four adds a clear finish line.

He will not stop until justice is set firmly in the earth.

That is a long, patient mission, not a quick fix.

Steady endurance matters as much as raw power here.

💪 Fail means run out of strength

😔 Discouraged means losing heart partway through

⏳ The mission is long and patient

📖 Endurance matters as much as power

## 🏝️ The Isles Shall Wait For His Law

"Isles" means distant coastlands and islands far from Israel.

"Law" here means torah, God's teaching and instruction, not just legal rules.

Distant nations are not an afterthought in this promise.

They are already pictured waiting for what the servant will bring.

This whole section opened with Israel's God and closes with the whole world.

🏝️ Isles means distant coastlands and islands

📜 Law means God's teaching, not just rules

🌍 Distant nations wait for the servant too

📖 The whole world is in view here

# Isaiah 42:5-9
# 🌌 The LORD Who Made The World
---
## 📢 Thus Saith God The LORD

This phrase marks a shift from description to direct speech.

Verses one through four describe the servant from the outside.

Starting here, God speaks in His own voice for the first time in this chapter.

What follows is a personal promise, not just a report.

📢 The chapter shifts to God's own voice

👀 Verses one through four only describe him

🗣️ Now God speaks directly and personally

📖 A promise follows, not just a report

## 🌌 He That Created The Heavens, And Stretched Them Out

Before God makes any promise, He states His credentials first.

He is the one who made the sky and everything beyond it.

"Stretched them out" pictures the heavens like a tent being pulled wide open.

The same power that shaped the whole universe now backs this one promise.

🌌 God names His power before His promise

🌠 He made the sky and everything beyond

⛺ Stretched out pictures a tent pulled wide

📖 That same power backs this promise

## 🌬️ Giveth Breath Unto The People Upon It

"Breath" here means life itself, not just air moving in and out.

This echoes Genesis two, where God breathed life into the first man.

The same God who gives every breath now sends this servant.

He owns life itself before He commissions anyone.

🌬️ Breath means life itself, not just air

👤 This echoes Genesis two and Adam's first breath

🎁 The life giver now sends the servant

📖 God owns life before He commissions anyone

## ✊ I The LORD Have Called Thee In Righteousness

"Called" here means chosen and commissioned for a specific task.

"Righteousness" means this calling lines up with what is right and just.

The servant is not self appointed.

God Himself names the purpose and backs it with His own just character.

✊ Called means chosen for a task

⚖️ Righteousness means the calling is right and just

🚫 The servant did not appoint himself

📖 God's own character backs this calling

## 🤝 Will Hold Thine Hand, And Will Keep Thee

Holding someone's hand pictures close, personal guidance.

This is not a distant command shouted from far away.

God promises to stay right beside the servant the whole time.

"Keep" adds the idea of protection along with guidance.

🤝 Holding a hand pictures close guidance

📏 Not a distant, shouted command

🛡️ God stays beside the servant always

📖 Keep adds protection to that guidance

## 📜 Give Thee For A Covenant Of The People

A "covenant" is a binding promise between two parties.

Normally a covenant is something a person receives or signs.

Here the servant himself becomes the covenant.

He does not just deliver God's promise, he embodies it in person.

📜 Covenant means a binding promise

✍️ Usually a person receives a covenant

🎁 Here the servant becomes the covenant itself

📖 He embodies the promise in person

## 💡 For A Light Of The Gentiles

Light lets people see where they could not see before.

The servant's mission is not only to save Israel.

He brings understanding of God to every nation outside Israel too.

This promise repeats later in the New Testament about Jesus himself.

💡 Light means seeing what was hidden

🌍 The mission reaches beyond Israel

🕯️ Every nation gets this same light

📖 The New Testament applies this to Jesus

## 👁️ To Open The Blind Eyes

This means more than curing physical blindness.

It pictures people who cannot see spiritual truth finally understanding it.

The servant's mission includes both kinds of sight.

Verse nineteen later in this same chapter shows Israel struggling with this exact blindness.

👁️ Blind eyes means more than physical sight

🧠 It includes spiritual understanding too

🎯 The servant's mission covers both kinds

📖 Verse nineteen returns to this same theme

## 🔓 To Bring Out The Prisoners From The Prison

"Prison" here works on two levels at once.

It first points to Judah's coming exile in Babylon, a real captivity.

It also pictures anyone trapped by sin, unable to free themselves.

The servant's rescue reaches both kinds of captivity.

🔓 Prison works on two levels

⛓️ It points to the coming exile in Babylon

💔 It also pictures being trapped by sin

📖 The servant frees both kinds of captives

## 👑 My Glory Will I Not Give To Another

"Glory" means the honor and praise that belongs to God alone.

"Graven images" were idols carved from wood or stone.

God refuses to share His unique honor with any manmade object.

This claim sets up the failure described later in this same chapter.

👑 Glory means honor that belongs to God

🪵 Graven images means idols carved from wood

🚫 God shares this honor with nothing else

📖 This claim sets up the chapter's later warning

## 🔮 The Former Things Are Come To Pass, And New Things Do I Declare

"Former things" means earlier predictions that already came true.

God points back to a real track record before making a new claim.

"New things" means fresh events that have not happened yet.

God announces them before they happen.

That way no one can doubt where they came from.

🔮 Former things means past predictions fulfilled

📊 God points to a real track record

🆕 New things means events not yet here

📖 God announces the future before it happens

# Isaiah 42:10-13
# 🎶 Sing A New Song
---
## 🎶 Sing Unto The LORD A New Song

A "new song" in scripture usually marks a fresh, specific act of God.

This is not a call to write new music for its own sake.

Something new is about to happen that deserves brand new praise.

Old words are not enough for what comes next.

🎶 New song marks a fresh act of God

🎼 Not about new music for its own sake

🎁 Something new is about to happen

📖 Fresh praise fits a fresh act

## ⛵ Ye That Go Down To The Sea

This phrase points to sailors and everyone who works on the water.

Even people far out at sea, rarely near a temple, get invited to praise.

No group is too distant or too busy to be part of this song.

⛵ This points to sailors and seafarers

🌊 Even those far from land are invited

🙌 No one is too distant to praise

📖 This song reaches every kind of worker

## 🏝️ The Isles, And The Inhabitants Thereof

"Isles" repeats the same word from verse four.

There the servant's law reached the isles.

Here the isles are called to sing back in response.

The promise and the praise use the exact same word on purpose.

🏝️ Isles repeats the word from verse four

📜 There the servant's law reached them

🎤 Here they respond with praise

📖 Promise and praise share one word

## 🏜️ The Villages That Kedar Doth Inhabit

"Kedar" was a nomadic tribe descended from Ishmael, living in the Arabian desert.

They were known across the ancient world for herding and desert life.

Even a tribe outside Israel's family line gets named and invited to praise.

🏜️ Kedar was a desert tribe from Ishmael

🐪 They were known for herding and desert life

🌍 A tribe outside Israel still gets named

📖 The invitation reaches far beyond Israel's borders

## ⛰️ The Inhabitants Of The Rock

"The rock" likely points to Sela, a mountain stronghold city in Edomite territory.

Today many identify this same region with Petra.

People living in a rugged, hard to reach place still hear this call to praise.

⛰️ The rock likely means Sela in Edom

🏛️ Many connect this region to Petra today

🧗 Even remote, rugged places hear the call

📖 Distance never excludes anyone from praise

## ⚔️ The LORD Shall Go Forth As A Mighty Man

The tone shifts sharply here.

Verses one through four showed a gentle, quiet servant.

Now the LORD Himself appears as a warrior marching out to battle.

Gentleness and strength are not opposites in this chapter.

⚔️ The tone shifts to a warrior image

🕊️ Verses one through four showed gentleness

💪 Now the LORD marches out as a warrior

📖 Gentleness and strength stand side by side

## 🔥 He Shall Stir Up Jealousy Like A Man Of War

"Jealousy" here does not mean petty envy.

It means fierce, protective passion for what rightly belongs to God.

Husbands and kings in this culture felt something similar when defending their own.

God's jealousy for His people works the same protective way.

🔥 Jealousy here means protective passion

🛡️ It is not petty envy

👨‍👩‍👧 Husbands and kings felt this protective urge too

📖 God protects His people the same way

## 📣 He Shall Cry, Yea, Roar

This directly answers verse two, where the servant would not cry or lift up his voice.

The servant stayed quiet.

The LORD Himself does not.

Different roles call for different kinds of strength in this chapter.

📣 This answers verse two directly

🤫 The servant stayed quiet there

🦁 The LORD roars here instead

📖 Different roles need different strength

# Isaiah 42:14-17
# 🌪️ A Long Silence Breaks
---
## 🤐 I Have Long Time Holden My Peace

"Holden my peace" is an old way of saying stayed silent.

God's silence was never the same as being absent or uninvolved.

He was watching and waiting the whole time.

That patience is now about to end.

🤐 Holden my peace means stayed silent

👀 Silence did not mean God was absent

⏳ He was watching the whole time

📖 That long patience is about to end

## 😖 Now Will I Cry Like A Travailing Woman

"Travailing" describes the intense pain of a woman in labor.

God compares His own coming action to that sudden, powerful moment.

After long silence, what comes next arrives suddenly and cannot be stopped.

😖 Travailing means the pain of childbirth

💥 God compares His action to that moment

⏱️ After silence, this arrives suddenly

📖 What God does next cannot be stopped

## 💥 I Will Destroy And Devour At Once

This is blunt, decisive judgment language.

God is not describing a slow process here.

"At once" means this happens suddenly, without long delay.

The patient God from verse fourteen can also act decisively.

💥 This is blunt, decisive language

⚡ At once means suddenly, not slowly

🐢 God is patient, but not passive

📖 Patience and decisive action both fit God

## 🏔️ I Will Make Waste Mountains And Hills

Mountains and hills stood for lasting strength and stability in this culture.

Turning them to waste pictures total, complete devastation.

Even what looks permanent is not beyond God's power to undo.

🏔️ Mountains pictured lasting strength

💨 Waste means total devastation

⚠️ Even permanent things are not beyond God

📖 God's power reaches what looks unshakable

## 🏞️ I Will Make The Rivers Islands

This is a striking, almost impossible sounding image.

Rivers do not normally become dry land you could call an island.

The picture describes drought so severe that water simply disappears.

Judgment here reaches even the most reliable water sources.

🏞️ Rivers becoming islands is a drought image

💧 Water sources completely disappear

🌊 Even reliable rivers are not safe

📖 God's judgment reaches every resource

## 🦯 I Will Bring The Blind By A Way That They Knew Not

The tone shifts again here from judgment back to mercy.

"The blind" points forward to Israel's own spiritual blindness, named later in this chapter.

God still leads them, even down a path they cannot see for themselves.

He does not abandon the very people who cannot find the way alone.

🦯 The tone shifts back to mercy

👁️ Blind points forward to Israel's own blindness

🧭 God still leads a path they cannot see

📖 He does not abandon those who cannot see

## 🌗 I Will Make Darkness Light Before Them, And Crooked Things Straight

This pictures a complete reversal for people who are lost.

Darkness becomes light, and a crooked path becomes a straight one.

Both images describe guidance for someone who could not find the way alone.

God does this Himself.

He does not just describe the destination and leave them to find it.

🌗 Darkness turning to light pictures reversal

🛤️ Crooked turning straight pictures the same

🤲 God guides them Himself

📖 He does not just point, He leads

## 🪵 That Trust In Graven Images

"Graven" means carved by hand, usually from wood or stone.

"Molten" images, mentioned right after, were cast from melted metal instead.

Two different methods, the same empty result, a manmade object with no real power.

This directly echoes verse eight, where God said He would not share His glory with idols.

🪵 Graven means carved from wood or stone

🔥 Molten means cast from melted metal

🚫 Both methods produce the same empty result

📖 This echoes God's claim back in verse eight

# Isaiah 42:18-20
# 👂 Hear Ye Deaf, Look Ye Blind
---
## 👂 Hear, Ye Deaf, And Look, Ye Blind

This command sounds impossible on its own terms.

How can someone who is deaf hear, or someone blind see?

The command is not about physical senses at all.

It is calling people to finally pay attention to what God is saying.

👂 The command sounds impossible at first

🚫 It is not about physical senses

🧠 It calls for real attention instead

📖 God is asking people to finally listen

## 🙈 Who Is Blind, But My Servant

This "servant" is a different figure from the one in verses one through four.

Here it points to the nation of Israel itself.

Israel was chosen to carry God's light to the world.

Instead, the very messenger has gone spiritually blind.

🙈 This servant means Israel, not the earlier one

🔄 The word servant shifts meaning here

💡 Israel was meant to carry God's light

📖 Instead the messenger itself went blind

## 📯 Or Deaf, As My Messenger That I Sent

"Messenger" describes Israel's calling to carry God's word to other nations.

A messenger who cannot hear the message is no use to anyone.

This is the tragedy sitting underneath the whole passage.

📯 Messenger means Israel's calling to other nations

🤐 A deaf messenger cannot carry a message

😞 This is the passage's central tragedy

📖 Israel's own calling was going unmet

## 😌 Blind As He That Is Perfect

"Perfect" here means complete or fully devoted, not sinless.

It describes someone meant to be fully devoted to God's mission.

The irony is sharp here.

The one meant to see clearly the most ends up seeing the least.

😌 Perfect here means fully devoted

🎯 Devotion was Israel's whole calling

😔 The most devoted becomes the most blind

📖 Sharp irony sits at the center here

## 👀 Seeing Many Things, But Thou Observest Not

Seeing and observing are not the same thing in this verse.

"Seeing" means the information reaches someone's eyes.

"Observing" means actually taking it in and letting it matter.

Israel had plenty of revelation in front of them.

They simply were not letting any of it sink in.

👀 Seeing means information reaches the eyes

🧠 Observing means it actually sinks in

📚 Israel had plenty of revelation available

📖 Truth unused is not truth learned

## 👂 Opening The Ears, But He Heareth Not

This repeats the same pattern as the seeing and observing line before it.

"Hearing" and truly "heareth" work the same two step way.

Sound can reach an ear without ever reaching the heart.

That gap between hearing and heeding closes out this section.

👂 Hearing repeats the seeing pattern

🔊 Sound can reach an ear

❤️ It does not always reach the heart

📖 Hearing and heeding are two different things

# Isaiah 42:21-25
# 💔 A People Robbed And Spoiled
---
## ✅ The LORD Is Well Pleased For His Righteousness' Sake

This shifts focus back to the servant from the start of the chapter.

Even though Israel has failed badly, God's larger plan has not failed.

His righteousness, His own right and just character, still moves forward.

✅ Focus returns to the servant here

❌ Israel's failure does not stop the plan

⚖️ God's righteousness still moves forward

📖 One nation's failure cannot cancel God's purpose

## 📜 He Will Magnify The Law, And Make It Honourable

"Magnify" means to make something look greater than before.

"The law" means the torah, God's teaching for His people.

God still intends to honor His own instruction.

That plan stands even while the people carrying it are struggling.

📜 Magnify means to make greater

📖 The law means God's own teaching

🏆 God still intends to honor it

➡️ The plan stands despite the people's struggle

## 💔 A People Robbed And Spoiled

The tone turns from promise to plain description of disaster.

"Robbed and spoiled" pictures a people stripped of everything by conquest.

This describes the coming exile in blunt, painful language.

💔 The tone shifts to plain disaster

🏚️ Robbed and spoiled means stripped by conquest

😢 This describes the coming exile

📖 The language here is blunt on purpose

## 🕳️ Snared In Holes, And Hid In Prison Houses

A "snare" was a trap used to catch animals.

Comparing people to trapped animals shows how helpless the exile made them feel.

"Prison houses" adds the picture of captivity on top of being trapped.

🕳️ Snared means trapped like an animal

🐾 The comparison shows real helplessness

🔒 Prison houses adds captivity on top

📖 Two pictures together show total helplessness

## 🎯 For A Prey, And None Delivereth

"Prey" describes something hunted and captured by a stronger enemy.

Normally a family member or ally would step in to rescue a captive.

Here the text says plainly, no one comes.

That detail makes the loss feel even heavier.

🎯 Prey means hunted by a stronger enemy

🤝 Normally someone would step in to rescue

🚫 Here the text says no one comes

📖 That absence makes the loss heavier

## ❓ Who Among You Will Give Ear To This

This question is aimed directly at the reader, not just ancient Israel.

"Give ear" means more than hearing the words go by.

It means actually taking the warning to heart and learning from it.

❓ The question is aimed at every reader

👂 Give ear means more than hearing words

🧠 It means truly taking the warning in

📖 A warning ignored teaches no one anything

## 🏹 Who Gave Jacob For A Spoil

This is not a rhetorical question with no answer.

The very next words supply the answer plainly, the LORD did.

The exile was not bad luck or a random disaster.

It was God's own judgment, carried out on purpose.

🏹 The question has a clear answer

✍️ The text answers itself immediately

🎲 This was not random bad luck

📖 God's own judgment caused the exile

## 🚷 They Would Not Walk In His Ways

This verse finally names the real cause behind the disaster.

Robbery, captivity, and loss were not random events.

Israel simply refused to follow God's ways.

That refusal brought consequences that could not be undone.

🚷 This verse names the real cause

🎲 The disaster was not random

🙅 Israel refused to follow God's ways

📖 Refusal brought consequences that could not be undone

## 🔥 He Hath Poured Upon Him The Fury Of His Anger

"Fury" describes God's anger at its full, unrestrained strength.

This is not a passing irritation.

Fire imagery follows right after, showing judgment that consumes completely.

Judgment this intense only makes sense as a response to real, serious sin.

🔥 Fury means anger at full strength

😠 This is not a passing irritation

🌋 Fire imagery shows total judgment

📖 Judgment this size answers serious sin

## 😔 Yet He Knew Not, And It Burned Him

The chapter ends on a heartbreaking note, not a triumphant one.

Judgment fell in full force.

Israel still did not understand what was happening or why.

"Laid it not to heart" means the lesson still had not sunk in.

This sets up the very next chapters, where God begins to comfort and restore anyway.

😔 The chapter ends without triumph

🔥 Judgment fell in full force

🤷 Israel still did not understand why

📖 Comfort and restoration still follow anyway
`.trim();

export const ISAIAH_FORTY_TWO_PERSONAL_SECTIONS = parseIsaiahFortyTwoRawNotes(ISAIAH_FORTY_TWO_RAW_NOTES);
