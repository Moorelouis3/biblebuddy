export type JoshuaTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaTwentyThreeRawNotes(rawText: string): JoshuaTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 23:${startVerse}` : `Joshua 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Joshua 23 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_TWENTY_THREE_RAW_NOTES = `# Joshua 23:1-2
# 👴 Joshua Gathers Israel One Last Time
---
## 🕰️ A Long Time After

"A long time after" ties this chapter to the rest God had just given Israel in the chapters before it.

That rest was described at the end of chapter twenty one, after every tribe finally had land.

Years passed peacefully between that rest and this final gathering.

Joshua is now speaking near the very end of his life, not right after the conquest.

🕰️ Years passed after Israel's rest began
🏞️ Chapter twenty one described that rest
👴 Joshua speaks near the end of his life
📖 This gathering comes much later

## 👴 Waxed Old And Stricken In Age

"Waxed old" means grew old over time, not suddenly.

"Stricken in age" describes the physical weakness that comes with many years of life.

This same exact phrase describes Abraham in Genesis, right before he arranges Isaac's marriage.

Joshua now stands in that same late stage of life Abraham once stood in.

👴 Waxed old means grew old gradually
🦴 Stricken in age means physically weakened
📜 Genesis uses this same phrase for Abraham
📖 Joshua stands where Abraham once stood

## 📯 Called For All Israel, And For Their Elders, And For Their Heads, And For Their Judges, And For Their Officers

Joshua does not call a private meeting.

He summons every layer of Israel's leadership by name.

Elders were the respected older leaders.

Heads led each tribe, judges settled disputes, officers carried out daily duties.

Gathering every rank at once shows how important this final message really was.

📯 Every leadership rank was summoned
👴 Elders were respected older leaders
⚖️ Judges settled disputes among the people
📖 Gathering all ranks showed real importance

## 🗣️ I Am Old And Stricken In Age

Joshua repeats the exact phrase the narrator just used about him.

Saying it about himself, out loud, carries more weight than the narrator's own description.

Moses opened his own farewell speech in Deuteronomy the same way.

He named his own age before giving his final instructions.

Joshua now follows that same pattern for saying goodbye to Israel.

🗣️ Joshua names his own age aloud
📜 Moses did the same in Deuteronomy
👴 Both leaders opened farewell speeches this way
📖 Joshua follows the pattern Moses set

# Joshua 23:3-5
# ⚔️ The LORD Your God Is He That Hath Fought For You
---
## 👀 Ye Have Seen All That The LORD Your God Hath Done

Joshua starts by pointing to what the people already witnessed with their own eyes.

He is not asking them to take his word for it.

Every battle, every victory, and every acre of land were things this generation saw for themselves.

Personal memory makes the point that follows impossible to argue with.

👀 Israel witnessed these victories firsthand
🚫 Joshua asks for no blind trust
⚔️ Every battle happened in their own lifetime
📖 Personal memory backs up his point

## ⚔️ The LORD Your God Is He That Hath Fought For You

This is the central claim of Joshua's whole speech.

Israel's armies marched and fought, but the victories themselves belonged to God.

This idea is often called holy war theology, where God himself is the true warrior behind Israel's battles.

Every land grant that follows in this chapter rests on this one claim.

⚔️ God is named as Israel's true warrior
🚶 Israel marched, but victory came from Him
📜 Scholars call this holy war theology
📖 This claim holds up everything that follows

## 🎲 I Have Divided Unto You By Lot

"By lot" means Israel's land was assigned using a method similar to drawing straws, trusting God to decide the outcome.

This same method already appears in detail across chapters fourteen through twenty one.

Using a lot instead of Joshua's own preference kept any single leader from playing favorites.

The land distribution was treated as God's decision, not a human one.

🎲 By lot means chosen like drawing straws
📜 Chapters fourteen through twenty one show this
⚖️ A lot kept leaders from playing favorites
📖 God, not Joshua, decided the outcome

## 🏡 To Be An Inheritance For Your Tribes

"Inheritance" here does not mean land bought or earned.

It means a permanent gift passed down through a family line, exactly like a father's estate.

Calling the land an inheritance ties it back to the promise God made to Abraham centuries earlier.

Every tribe received a lasting family possession, not a temporary loan.

🏡 Inheritance means a permanent family gift
🚫 It was never bought or earned
📜 It traces back to Abraham's promise
📖 Each tribe kept it for good

## 🌊 Even Unto The Great Sea Westward

"The great sea" is the Mediterranean Sea, the natural western border of Canaan.

To someone standing in Israel, that sea marked the edge of the known world in that direction.

Naming a clear border shows exactly how far the promised inheritance actually reached.

The promise was specific and geographic, not vague or symbolic.

🌊 The great sea means the Mediterranean
🗺️ It marked Canaan's western edge
📏 The border was specific, not vague
📖 The promise had real geography behind it

## 🏹 These Nations That Remain

Joshua carefully separates two groups in this speech.

Some nations had already been cut off during the conquest this book already records.

Others, called "nations that remain," were still living inside or near Israel's borders at this point.

That second group becomes the whole subject of Joshua's warning later in the chapter.

🏹 Some nations were already cut off
🏘️ Others still remained nearby
⚠️ The remaining nations become the real warning
📖 This distinction shapes the rest of the speech

# Joshua 23:6-8
# 📜 Be Ye Therefore Very Courageous
---
## 📖 The Book Of The Law Of Moses

This refers to a real, physical written document, most likely the book of Deuteronomy.

By Joshua's time, Israel's law was not just spoken tradition passed down by memory.

It existed as something the people could read, copy, and check their own actions against.

Joshua points them to a fixed written standard, not his own personal authority.

📖 This means an actual written document
📜 It was likely the book of Deuteronomy
🔎 Israel could check itself against it
➡️ Joshua points to God's law, not himself

## ↔️ Turn Not Aside Therefrom To The Right Hand Or To The Left

This phrase pictures walking a straight road without wandering off either edge.

It is a common Hebrew idiom for complete obedience, not partial or selective obedience.

God used this exact same phrase to charge Joshua personally back in chapter one.

Joshua now hands that very same charge straight on to the people.

↔️ The idiom pictures staying on a straight road
✅ It means complete, not partial, obedience
📜 God gave Joshua this charge in chapter one
📖 Joshua passes that same charge onward

## 🤐 Neither Make Mention Of The Name Of Their Gods

This means Israel should not even casually say the names of foreign gods out loud.

Speaking a name in this culture was never treated as neutral or meaningless.

Repeating a name kept it familiar, and familiarity could slowly wear down resistance to worshipping it.

Refusing to even speak the name was meant as the very first line of defense.

🤐 They were told not to say the names
🗣️ Names were never treated as neutral
⚠️ Familiarity could wear down resistance
📖 Silence was the first line of defense

## 🙇 Nor Bow Yourselves Unto Them

Bowing was the physical posture of worship in the ancient world.

Refusing to bow meant refusing to physically act out devotion to another god, even once.

This command targets the body, not just private belief.

Right belief was expected to show up in what a person's body actually did.

🙇 Bowing was a worship posture
🚫 They were told never to perform it
💪 The command targets actions, not just belief
📖 Belief was expected to show in the body

## 🤝 But Cleave Unto The LORD Your God

"Cleave" means to hold on tightly, refusing to ever let go.

The same Hebrew word describes a husband and wife becoming one in Genesis.

Joshua already used this exact word for the eastern tribes back in chapter twenty two.

Loyalty to God is described using the strongest bond language this culture had.

🤝 Cleave means holding on tightly
💍 The same word describes marriage in Genesis
📜 Joshua used this word in chapter twenty two
📖 Loyalty to God uses marriage level language

# Joshua 23:9-11
# 🛡️ One Man Of You Shall Chase A Thousand
---
## 💪 The LORD Hath Driven Out From Before You Great Nations And Strong

Joshua names the size of the problem honestly.

These were not weak or small opponents Israel happened to overpower.

The text credits their defeat directly to God, not to Israel's own military skill.

Naming the enemy as genuinely strong makes the credit to God mean something real.

💪 The defeated nations were genuinely strong
🚫 Israel's own skill is never credited
🙏 God alone gets credit for the outcome
📖 A real threat makes the credit meaningful

## 🛡️ No Man Hath Been Able To Stand Before You

"Stand before you" is a military phrase meaning to successfully resist in battle.

Not one enemy nation had managed to hold its ground against Israel up to this point.

That undefeated record spans years and many different opponents.

Joshua treats this record as further proof backing the claim in verse three.

🛡️ Stand before means resist in battle
🏆 No enemy had held its ground
📅 This record spanned many years
📖 It backs up Joshua's earlier claim

## 🔢 One Man Of You Shall Chase A Thousand

This is intentional exaggeration, meant to make a point vividly.

The same striking image appears earlier in the law, in the book of Leviticus.

The point is about scale, not literal math.

A single obedient Israelite carried disproportionate strength because of who fought for him.

🔢 This number is exaggeration for effect
📜 Leviticus uses this same striking image
⚖️ The point is scale, not literal math
📖 God's presence provided the real advantage

## ❗ Take Good Heed Therefore Unto Yourselves

Joshua's tone visibly shifts at this point in the speech.

Everything before this was celebration and confidence in what God had already done.

"Take good heed" is a serious warning phrase, telling the people to pay close attention.

The rest of the chapter turns from encouragement toward genuine danger.

❗ Joshua's tone clearly shifts here
🎉 Before this, the speech was confident
⚠️ Take good heed signals a real warning
📖 Danger, not celebration, comes next

## ❤️ That Ye Love The LORD Your God

"Love" here is not only a feeling.

It is a covenant word describing loyal, whole commitment.

The same command appears as Israel's central call to obedience in Deuteronomy chapter six.

Love was expected to be the reason obedience happened, not fear alone.

Joshua roots everything that follows in this one relationship, not a list of rules.

❤️ Love here means loyal covenant commitment
📜 Deuteronomy six gives this same central command
🙏 Love, not fear, was meant to drive obedience
📖 One relationship grounds every rule that follows

# Joshua 23:12-13
# ⚠️ Snares And Traps Unto You
---
## ↩️ Go Back, And Cleave Unto The Remnant Of These Nations

Joshua uses the exact same word, cleave, that described loyalty to God earlier in this speech.

Here it describes the opposite outcome, holding tightly to the wrong thing instead.

The same strong bond meant for God could just as easily attach itself elsewhere.

A person's loyalty always cleaves to something.

The only real question is what.

↩️ Cleave here describes the wrong bond
🔄 It is the exact same word as before
⚠️ Loyalty can attach to the wrong thing
📖 The real question is always what

## 💍 Shall Make Marriages With Them

Marriage in the ancient world connected two families and their gods, not just two individuals.

Moses had already warned against exactly this kind of marriage back in Deuteronomy.

The real danger was never ethnicity.

It was the false worship bundled with it.

A single marriage could quietly reroute an entire family's loyalty over time.

💍 Marriage joined families and their gods together
📜 Deuteronomy already warned against this
🚫 The danger was false worship, not ethnicity
📖 One marriage could redirect a whole family

## 🕳️ Snares And Traps Unto You, And Scourges In Your Sides, And Thorns In Your Eyes

Joshua stacks four violent images back to back on purpose.

A snare and a trap catch something before it even sees danger coming.

A scourge means a whip, striking pain into the body from close range.

A thorn in the eye pictures something small causing constant, sharp irritation.

🕳️ Snares and traps catch without warning
🩹 A scourge means a painful whip
👁️ A thorn in the eye means constant irritation
📖 Four images describe one growing danger

## 🏞️ Until Ye Perish From Off This Good Land

The land itself was never an unconditional, permanent guarantee.

It remained a gift, tied to Israel's ongoing loyalty to God.

This exact warning eventually comes true generations later, ending in exile from this same land.

A good gift could still be lost through a genuinely bad choice.

🏞️ The land was a gift, not a guarantee
🔗 It stayed tied to Israel's loyalty
😢 Exile later fulfilled this exact warning
📖 A good gift can still be lost

# Joshua 23:14-16
# 📖 Not One Thing Hath Failed
---
## 🌍 I Am Going The Way Of All The Earth

This is a gentle, respectful way of saying Joshua knows he is about to die.

Every living person eventually walks this same universal road.

Many years later, David uses this identical phrase right before his own death in the book of Kings.

Joshua names his own death plainly, without fear or drama.

🌍 A gentle way to say dying
🚶 Every person walks this same road
📜 David later uses this same phrase
📖 Joshua names death without fear

## ✅ Not One Thing Hath Failed Of All The Good Things

Joshua repeats this claim twice in the very same verse on purpose.

Every single promise God ever made to this generation came true exactly as spoken.

Not most promises, not almost all of them, but literally every one of them.

This becomes the strongest possible foundation for trusting what Joshua says comes next.

✅ Every promise came true exactly as spoken
🔁 Joshua repeats this claim twice for emphasis
💯 Not most promises but literally all of them
📖 This backs up everything Joshua says next

## ⚖️ So Shall The LORD Bring Upon You All Evil Things

Joshua builds this warning on the exact same logic as the promise before it.

The same God who kept every good promise perfectly will keep every warning just as perfectly.

God's reliability was never only good news.

It also made judgment absolutely certain.

Trusting God's faithfulness meant taking His warnings just as seriously as His promises.

⚖️ The same logic covers blessing and warning
🙌 God kept every promise perfectly
⚠️ That same reliability makes judgment certain
📖 His faithfulness covers warnings too

## 🔥 Then Shall The Anger Of The LORD Be Kindled Against You

"Kindled" pictures anger starting small, like a spark, and then growing into a full fire.

This is the same word the Bible often uses to describe God's anger elsewhere.

The anger described here is not sudden or random.

It follows a clear, named cause.

Verse sixteen states that cause plainly, serving other gods after breaking the covenant.

🔥 Kindled pictures anger growing like fire
📜 This word describes God's anger elsewhere too
🎯 The anger follows a clear, named cause
📖 Serving other gods was that exact cause

## ⏱️ Ye Shall Perish Quickly From Off The Good Land

"Quickly" stands out against how patient this warning has been up to now.

Judgment, once it finally starts, would not drag out slowly like the original conquest did.

This sentence points forward to the fast unraveling described later in the book of Judges.

This chapter once described rest being given.

It now ends with a warning that rest can be lost.

⏱️ Quickly contrasts with how patient the warning is
📉 Judgment would not unfold slowly
📜 Judges later shows this fast unraveling
📖 A chapter about rest ends with a warning
`.trim();

export const JOSHUA_TWENTY_THREE_PERSONAL_SECTIONS = parseJoshuaTwentyThreeRawNotes(JOSHUA_TWENTY_THREE_RAW_NOTES);
