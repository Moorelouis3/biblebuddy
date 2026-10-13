export type RomansElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRomansElevenRawNotes(rawText: string): RomansElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RomansElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Romans\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Romans 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Romans\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Romans\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Romans 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Romans 11:${startVerse}` : `Romans 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Romans 11 sections, received " + sections.length);
  }

  return sections;
}

const ROMANS_ELEVEN_RAW_NOTES = `# Romans 11:1-6
# 🙋 A Remnant Kept By Grace
---
## Hath God Cast Away His People

Paul asks this question right after two chapters describing Israel's unbelief.

"Cast away" would mean God rejected the whole nation forever.

Paul answers with the strongest no in his vocabulary, God forbid.

He offers himself as proof, an Israelite from the tribe of Benjamin.

God's choice of a people does not end just because many reject it.

🙅 Cast away means a total final rejection
❌ Paul answers with the strongest possible no
🙋 Paul offers himself as living proof
📖 God's choice of a people still stands

## I Also Am An Israelite

Paul names his own background to prove God has not abandoned Israel.

He says he is an Israelite, from Abraham's own bloodline.

He is specifically from the tribe of Benjamin, a small but faithful tribe.

One rescued Israelite already breaks the idea of a total rejection.

Paul counts himself as living evidence of the remnant he is about to describe.

🧬 Paul names his own Jewish background
🌳 He comes from Abraham's bloodline
🛡️ He is from the tribe of Benjamin
📖 Paul himself breaks the idea of total rejection

## They Have Killed Thy Prophets

This line is quoted from Elijah's complaint in First Kings chapter nineteen.

Elijah had just faced down Baal's prophets, and Jezebel wanted him dead.

He tells God that Israel has killed the prophets and torn down the altars.

Elijah feels like the last faithful believer left alive.

Paul borrows Elijah's old complaint to describe his own moment.

📜 Quoted from Elijah's prayer in First Kings
😨 Elijah was fleeing Jezebel's threat on his life
🏛️ Israel had killed prophets and torn altars
📖 Paul borrows Elijah's old complaint

## Have Not Bowed The Knee To The Image Of Baal

God's answer to Elijah reveals something Elijah did not know.

"Reserved" means God had quietly kept this group safe without Elijah seeing it.

Seven thousand people had stayed faithful the entire time.

Elijah simply did not know they existed.

They refused to bow to Baal even under heavy pressure to conform.

Elijah's despair was real, but his information was incomplete.

🤐 Reserved means quietly kept safe
🔢 Seven thousand stayed faithful without Elijah knowing
🚫 They refused to bow to Baal
📖 Elijah's despair did not match the full picture

## A Remnant According To The Election Of Grace

"Remnant" means a small surviving part left out of a much larger whole.

Paul says the same pattern from Elijah's day is happening again now.

A remnant of believing Jews still exists alongside the larger unbelief.

This remnant exists because God chose it, not because it earned the honor.

"Election of grace" means God's free choosing, not anyone's effort.

🌱 Remnant means a small surviving part
🔁 The same pattern repeats in Paul's own day
🎁 This remnant exists by God's choosing
📖 Election of grace means a free, unearned choice

## Then Is It No More Of Works

Paul draws out the logical result of calling something grace.

Grace and works cannot both be the reason for the same outcome.

If a person earns something by working for it, it stops being a gift.

The remnant is kept by grace alone, with no exception carved out for effort.

Mixing grace with earning simply erases the meaning of grace.

⚖️ Grace and works cannot share credit
🎁 Earning something removes it from being a gift
🚫 No exception is carved out for effort
📖 Mixing grace with earning erases grace

# Romans 11:7-10
# 😴 The Rest Were Blinded
---
## The Rest Were Blinded

Paul separates Israel into two groups, the remnant and the rest.

"The election" refers to the remnant who did believe and were saved.

"The rest" refers to the larger portion who did not believe.

Blinded here does not mean God prevented them from ever being able to see.

It describes a hardening that followed their own repeated refusal.

👥 Paul separates Israel into two groups
🙋 The election is the remnant who believed
🙅 The rest refused to believe
📖 Blinded describes hardening, not forced blindness

## The Spirit Of Slumber

"Spirit of slumber" is a figure of speech, not a literal sleeping spell.

It pictures a mind so dulled that truth no longer wakes it up.

Paul quotes this image from the Old Testament prophets.

Eyes that do not see and ears that do not hear describe the same dullness.

This condition grew out of choices Israel had already made.

😴 Spirit of slumber is a figure of speech
🧠 It pictures a mind that truth cannot wake
👂 Eyes and ears that do not work
📖 The dullness grew out of Israel's own choices

## Let Their Table Be Made A Snare

This quote comes from King David in the Psalms.

A table was meant to be a place of comfort and provision.

David asks that the very thing meant to bless instead becomes a trap.

A snare, a trap, and a stumblingblock all describe the same reversal.

What should have fed Israel becomes the thing that catches them instead.

📜 Quoted from King David in the Psalms
🍽️ A table was meant for comfort
🪤 David asks comfort to become a trap
📖 What should feed them instead catches them

## Let Their Eyes Be Darkened

David's prayer continues by asking for eyes that cannot see clearly.

"Darkened" describes a dimming of understanding, not literal blindness.

"Bow down their back alway" pictures a people worn down under constant strain.

Paul applies this old prayer to Israel's unbelief in his own time.

The hardening Paul describes is not new, it echoes a pattern David already named.

🌑 Darkened describes dimmed understanding
🏋️ Bowed down pictures constant strain
🔁 Paul applies this old prayer today
📖 The pattern is not new

# Romans 11:11-15
# 🌍 Salvation Come Unto The Gentiles
---
## Have They Stumbled That They Should Fall

Paul asks this question to correct a wrong conclusion.

"Stumbled" pictures tripping, not a final, fatal collapse.

Israel's unbelief is serious, but it is not the end of the story.

Paul's flat answer is God forbid, the same strong denial from verse one.

A stumble leaves room for standing back up again.

🙅 Stumbled pictures tripping, not final collapse
❌ Paul again answers with a strong no
⏸️ Israel's unbelief is not the end
📖 A stumble leaves room to stand again

## Salvation Is Come Unto The Gentiles

Paul reveals an unexpected purpose hiding inside Israel's stumble.

Israel's fall became the very opening through which Gentiles received salvation.

This was not an accident or a plan B for God.

"Provoke them to jealousy" means Israel was meant to notice and want it back.

God used one nation's fall to open a door for the whole world.

🌍 Israel's fall opened salvation to the Gentiles
🎯 This was no accident or backup plan
👀 Jealousy means Israel was meant to notice
📖 One nation's fall opened the whole world's door

## How Much More Their Fulness

"Fulness" here means Israel fully restored and believing again.

Paul argues from a smaller fact to a far bigger one.

If Israel's fall already enriched the world, their full return will do far more.

Riches and diminishing describe the same event from two angles.

Paul is building hope for something still ahead, not already finished.

📈 Fulness means Israel fully restored
🔁 Paul argues from small to much bigger
💰 Even their fall enriched the world
📖 Their full return will do far more

## I Magnify Mine Office

Paul calls himself the apostle sent specifically to the Gentiles.

"Magnify mine office" means Paul takes his assigned task seriously, not that he brags.

He is explaining why he preaches to Gentiles at all.

His ministry to outsiders is itself part of God's larger plan for Israel.

Reaching Gentiles was never a detour from Paul's concern for his own people.

📢 Paul is the apostle to the Gentiles
🙏 Magnify means taking the task seriously
🧩 Preaching to Gentiles fits God's larger plan
📖 It was never a detour from Israel

## Life From The Dead

Paul closes this section with the biggest comparison yet.

Israel's rejection of the gospel led to the world being reconciled to God.

Paul asks what Israel's eventual acceptance will lead to instead.

He answers his own question with a picture of resurrection itself.

Israel's future restoration is pictured as nothing less than life returning to the dead.

⚰️ Israel's rejection reconciled the world
❓ Paul asks what their acceptance will bring
🌅 He answers with a picture of resurrection
📖 Israel's restoration is pictured as life from death

# Romans 11:16-19
# 🌳 The Olive Tree Begins
---
## The Firstfruit Be Holy

"Firstfruit" was the first portion of a harvest, set apart and offered to God.

Paul says that portion being holy makes the whole batch holy too.

He is describing Abraham, Isaac, and Jacob as that set apart portion.

If the root of a family is holy, the rest carries that same mark.

Israel's calling was never separate from these founding fathers.

🌾 Firstfruit was the first part offered to God
✅ A holy firstfruit makes the whole batch holy
🌳 The patriarchs are pictured as that firstfruit
📖 Israel's calling traces back to them

## Graffed In Among Them

"Graffed" means a branch from one tree cut and attached onto another tree.

Gentile believers are pictured as a wild branch grafted into Israel's own tree.

A wild olive branch on its own produced nothing worth harvesting.

Once attached, it begins drawing life from the same root as the others.

Gentiles were added into an existing story, not handed a brand new one.

✂️ Graffed means cutting one branch onto another tree
🌿 Gentiles are pictured as a wild branch
🌳 The branch now draws life from Israel's root
📖 Gentiles joined an existing story

## Boast Not Against The Branches

Paul warns Gentile believers against a specific, tempting attitude.

"Boast" means looking down on the natural branches that were broken off.

A grafted branch did not grow its own root or its own sap.

Everything it has access to belongs first to the tree it was added onto.

Pride forgets where its own nourishment actually came from.

🙅 Boast means looking down on others
🌿 A grafted branch grew no root
🌳 Its life comes from the tree it joined
📖 Pride forgets where nourishment came from

## That I Might Be Graffed In

Paul anticipates an objection a Gentile reader might raise.

A reader could twist the warning into an excuse to feel special.

"That I might be graffed in" sounds like the branches were broken off just to make room.

Paul is about to correct that exact misreading in the very next verse.

Being included was never about Israel losing so Gentiles could win.

🤔 Paul anticipates an objection
😏 A reader could feel falsely special
🪑 It can sound like branches fell for room
📖 Inclusion was never about Israel losing

# Romans 11:20-24
# 🌳 Grafted By Faith, Not Fear
---
## Because Of Unbelief They Were Broken Off

Paul names the exact reason the natural branches were cut away.

It was not a random accident or an unfair decision.

"Unbelief" is the one specific cause Paul points to.

The Gentile branch, by contrast, stands only "by faith," the opposite cause.

Paul warns against pride and tells the reader to fear instead.

✂️ Unbelief is the exact reason given
🎯 It was not random or unfair
🙏 The Gentile branch stands by faith instead
📖 Paul warns against pride, not confidence

## Take Heed Lest He Also Spare Not Thee

Paul turns the warning directly toward the Gentile reader.

"Take heed" means pay close attention, do not grow careless.

God did not spare the natural branches when they stopped believing.

Being grafted in does not make a Gentile branch immune to the same danger.

Standing by faith today is not a permanent guarantee without continuing in it.

⚠️ Take heed means do not grow careless
✂️ God did not spare the unbelieving branches
🌿 Grafted branches face the same danger
📖 Standing today needs continuing, not just starting

## The Goodness And Severity Of God

Paul holds up two sides of God's character side by side.

"Severity" fell on the branches that were broken off in unbelief.

"Goodness" continues toward the branch that stays attached by faith.

Both qualities describe the same God, aimed at two different responses.

Continuing in God's goodness is the condition, not a one time event.

⚖️ Goodness and severity sit side by side
✂️ Severity fell on the unbelieving branches
🌿 Goodness continues toward the branch of faith
📖 Continuing in goodness is the real condition

## God Is Able To Graff Them In Again

Paul turns from warning to hope within the very same picture.

The natural branches that were cut off are not cut off forever.

If they stop clinging to unbelief, God can graft them back in.

Grafting a wild branch in once was already unusual.

Grafting the natural branch back into its own original tree is even more fitting.

🔁 Cut off branches are not cut off forever
🌿 Ending unbelief opens the door to return
🌳 God can graft the natural branch back in
📖 Returning them home fits even better than before

# Romans 11:25-27
# 🔓 This Mystery
---
## That Ye Should Be Ignorant Of This Mystery

A "mystery" in Paul's letters means a plan once hidden, now revealed.

Paul does not want his Gentile readers to misunderstand what is happening.

Some Gentile believers were tempted to feel superior to unbelieving Israel.

Paul calls that attitude being wise in their own conceits.

Knowing the full plan should humble a reader, not inflate them.

🔓 Mystery means a once hidden plan now revealed
⚠️ Some Gentiles felt superior to Israel
🙅 Paul calls that wise in their own conceits
📖 The full plan should humble, not inflate

## The Fulness Of The Gentiles Be Come In

"Blindness in part" means the hardening on Israel is partial, not total.

It is also temporary, lasting only until a certain point is reached.

That point is the fulness of the Gentiles, a complete number coming to faith.

The hardening has a built in expiration tied to God's own timetable.

Israel's story is not frozen, it is still moving toward an ending.

🔢 Blindness in part means partial, not total
⏳ The hardening is also temporary
🎯 It ends when the Gentiles' fulness is reached
📖 Israel's story is still moving forward

## All Israel Shall Be Saved

Paul states the outcome of this mystery in one direct line.

"All Israel" describes the nation reaching its promised, future salvation.

Paul backs this claim with a quote from the prophet Isaiah.

"The Deliverer" who comes out of Sion is Christ Himself.

Israel's future is not abandonment, it is a rescue still coming.

🎯 Paul states the outcome directly
📜 He backs it with a quote from Isaiah
🙌 The Deliverer from Sion is Christ
📖 Israel's future is rescue, not abandonment

## When I Shall Take Away Their Sins

Paul names the covenant behind this future rescue.

"Covenant" means a binding promise, not a vague hope.

Taking away sins is the specific content of that promise.

This echoes the new covenant promised through the prophet Jeremiah.

The same gospel that saves Gentiles is the gospel that will save Israel.

🤝 Covenant means a binding promise
🧽 Taking away sins is the promise's content
📜 It echoes Jeremiah's new covenant
📖 The same gospel saves both Israel and Gentiles

# Romans 11:28-32
# 🎁 Gifts Without Repentance
---
## Beloved For The Fathers' Sakes

Paul names two ways to view Israel at the same time.

"Enemies for your sakes" describes their current resistance to the gospel.

That resistance is actually what opened the door to the Gentiles.

"Beloved for the fathers' sakes" describes God's loyalty to Abraham, Isaac, and Jacob.

God can call the same people both resistant now and loved for good.

↔️ Paul holds two views of Israel together
🚫 Enemies describes their current resistance
🚪 That resistance opened the door to Gentiles
📖 God still loves them for the fathers' sake

## The Gifts And Calling Of God Are Without Repentance

"Repentance" here means God changing His mind and taking something back.

Paul says God's gifts and calling never work that way.

Once God calls a people, that calling does not expire with their unbelief.

This single line anchors the whole chapter's hope for Israel's future.

If God's calling could be revoked, none of His other promises would be safe either.

🔄 Repentance here means taking something back
🎁 God's gifts and calling do not expire
⚓ This line anchors the chapter's hope
📖 An unstable calling would make every promise unsafe

## That Through Your Mercy They Also May Obtain Mercy

Paul draws a straight line between Gentile mercy and Israel's future mercy.

Gentiles once disobeyed and still received mercy through Israel's fall.

Paul says the same mercy will eventually reach Israel through the Gentiles.

"These also" ties Israel's future directly to the mercy Gentiles already received.

Mercy is shown to pass back and forth between the two groups.

🔁 Mercy passes between Gentiles and Israel
🙅 Gentiles once disobeyed, yet received mercy
🔮 The same mercy will reach Israel
📖 Mercy moves between both groups, not one way

## That He Might Have Mercy Upon All

Paul closes the argument with a wide, summarizing statement.

"Concluded them all in unbelief" means God allowed everyone the same shared failure.

Jew and Gentile both end up guilty by the same measure.

That shared guilt becomes the ground for a shared mercy.

No one earns a place ahead of anyone else in this story.

📏 God allowed everyone the same shared failure
⚖️ Jew and Gentile share the same guilt
🎁 Shared guilt becomes the ground for shared mercy
📖 No one earns a head start here

# Romans 11:33-36
# 🙌 The Depth Of The Riches
---
## O The Depth Of The Riches

Paul breaks into worship after finishing this long argument about Israel.

This outburst is not a new argument, it is a response to everything just said.

"Riches" here pairs with both God's wisdom and His knowledge.

Depth pictures something far below the surface, impossible to measure from the top.

After nine chapters of hard argument, Paul lands on wonder instead of a conclusion.

🙌 Paul breaks into worship
🔁 It responds to everything just argued
💎 Riches pairs with wisdom and knowledge
📖 Hard argument lands on wonder

## His Ways Past Finding Out

"Unsearchable" means a search could run forever and still come up short.

God's judgments are not random, they are simply too vast to fully trace.

"Past finding out" describes His ways the same way, beyond full discovery.

Paul is not frustrated by this, he is in awe of it.

Some things about God are meant to be worshipped, not fully solved.

🔍 Unsearchable means endless searching still falls short
⚖️ Judgments are vast, not random
🛣️ His ways go past full discovery
📖 Some things are worshipped, not solved

## Who Hath Been His Counsellor

Paul asks three rapid questions to make one single point.

A counsellor is someone whose advice shapes another person's decision.

No one advised God on how to run this plan of salvation.

No one gave God something first that He now owes back.

Every piece of this plan, including Israel's future, was God's own idea from the start.

❓ Paul asks three rapid questions
⚖️ A counsellor shapes another's decision
🚫 No one advised God on this plan
📖 The whole plan was God's own idea

## Of Him, And Through Him, And To Him, Are All Things

Paul gathers the whole chapter into one final sentence.

"Of him" means everything originates from God.

"Through him" means everything keeps moving by His power.

"To him" means everything is aimed back at His own glory.

Israel's past hardening and future rescue both belong inside that one sentence.

🧭 Of him means everything starts with God
⚙️ Through him means everything moves by His power
🎯 To him means everything aims at His glory
📖 Israel's whole story fits inside that sentence
`.trim();

export const ROMANS_ELEVEN_PERSONAL_SECTIONS = parseRomansElevenRawNotes(ROMANS_ELEVEN_RAW_NOTES);
