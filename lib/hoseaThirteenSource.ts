export type HoseaThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHoseaThirteenRawNotes(rawText: string): HoseaThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HoseaThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hosea\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hosea 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hosea\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Hosea\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hosea 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hosea 13:${startVerse}` : `Hosea 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Hosea 13 sections, received " + sections.length);
  }

  return sections;
}

const HOSEA_THIRTEEN_RAW_NOTES = `# Hosea 13:1-3
# 📉 Ephraim's Fall From Honor
---
## 😮 When Ephraim Spake Trembling

"Trembling" here does not mean Ephraim was shaking with fear.

It means Ephraim's voice carried so much weight that others took real notice.

Ephraim was the strongest tribe in the whole northern kingdom.

For a time its word could settle disputes and set the nation's direction.

That kind of authority was once real, and once good.

😮 Trembling means others took real notice

💪 Ephraim's voice carried real weight

🏔️ Ephraim led the whole northern kingdom

📖 That authority was once real and good

## 🔝 He Exalted Himself In Israel

"Exalted" means lifted up above others, in rank or in pride.

Ephraim did not stay content as one tribe among twelve.

Its name grew until it stood for the whole northern kingdom.

Hosea often says Ephraim when he really means all of Israel.

A single tribe's pride became the story of an entire nation.

👆 Exalted means lifted up in pride

🔝 Ephraim rose above the other tribes

🏔️ Its name came to mean Israel

📖 One tribe's pride became the nation's story

## 🌧️ But When He Offended In Baal, He Died

Baal was a Canaanite god, worshipped as the one who sent rain and crops.

"Offended in Baal" means Ephraim mixed worship of the LORD with worship of Baal.

"He died" is not describing one single moment of physical death.

It pictures the death of the honor and strength Ephraim once carried.

Mixing worship with Baal is what finally brought that fall.

🌧️ Baal was a Canaanite rain god

🙏 Ephraim mixed worship of God and Baal

💀 Died pictures lost honor, not literal death

📖 Mixing worship brought Ephraim's fall

## 🔥 Made Them Molten Images Of Their Silver

"Molten" means metal that was melted down and poured into a mold.

Silver was valuable, so this idol was not cheap or careless.

Real wealth and real effort went into building something that could not help them.

Craftsmen could shape a figure, but they could never give it life.

Skill never turns a lifeless object into a real god.

🔥 Molten means melted and poured into a mold

💰 Silver made this an expensive idol

🔨 Craftsmen shaped every piece by hand

📖 Skill cannot make a lifeless thing alive

## 💋 Let The Men That Sacrifice Kiss The Calves

Kissing an idol was a normal act of worship in the ancient world.

It showed honor and submission to whatever was being kissed.

These calves recall the golden calves set up at Dan and Bethel.

Jeroboam built those shrines generations earlier so Israel would not travel south to worship.

A gesture meant for God was now being given to a statue of an animal.

💋 Kissing an idol showed honor and submission

🐂 Recalls the golden calves of Dan and Bethel

👑 Jeroboam built those shrines generations earlier

📖 Honor meant for God went to a statue

## ☁️ As The Morning Cloud, And As The Early Dew That Passeth Away

Hosea stacks four pictures together here, and all four say the same thing.

A morning cloud burns off within an hour after the sun rises.

Early dew dries up just as fast once the day turns warm.

Chaff is the light, useless husk that blows off the threshing floor in the wind.

Smoke from a chimney spreads out and disappears almost as soon as it is seen.

Ephraim's pride and false worship would vanish exactly that fast.

☁️ A morning cloud burns off fast

💧 Early dew dries up just as fast

🌬️ Chaff blows off the threshing floor

📖 Ephraim's worship would vanish just as fast

# Hosea 13:4-6
# 🐑 I Did Know Thee In The Wilderness
---
## 🇪🇬 I Am The LORD Thy God From The Land Of Egypt

God names the exodus again as proof of who he has always been.

This same claim already opened chapter two and chapter eleven before it.

"The LORD thy God" is personal, not a title for a distant power.

Egypt reminds Israel exactly where their story as a free nation began.

A God who rescues from slavery has the right to ask for loyalty.

🇪🇬 God again points back to the exodus

🔁 This same claim repeats across the book

🤝 The LORD thy God is deeply personal

📖 A rescuing God has the right to loyalty

## 🚫 Thou Shalt Know No God But Me

This line echoes the first of the ten commandments given at Sinai.

"Know" here means more than believing a fact in your head.

It means trusting, obeying, and depending on God alone for everything.

"There is no saviour beside me" closes the door on every rival option.

Ephraim had been trusting other gods and other nations instead.

📜 This echoes the very first commandment

🧠 Know means trust, not just belief

🚪 No saviour beside me closes every option

📖 Ephraim had been trusting other gods instead

## 🏜️ I Did Know Thee In The Wilderness, In The Land Of Great Drought

"Know" here means an intimate, caring relationship, not simple awareness.

God is not saying he merely noticed Israel existed in the desert.

He is saying he cared for them personally through forty hard years.

"Great drought" names the real danger of that wilderness journey.

Water, food, and safety all depended completely on God during those years.

🤝 Know means intimate care, not awareness

🏜️ God cared for Israel through the wilderness

💧 Great drought names a real daily danger

📖 Survival there depended completely on God

## 🐑 According To Their Pasture, So Were They Filled

"Pasture" means the grazing land where a flock finds its food.

Once Israel entered the promised land, that pasture became rich and full.

God is pictured here as the shepherd who provided that pasture.

Being "filled" describes a nation that lacked for nothing under his care.

That abundance never came from Israel's own hands.

🐑 Pasture means the land where a flock feeds

🌾 The promised land became rich and full

🤲 God is pictured as Israel's shepherd

📖 That abundance never came from their own hands

## 💔 They Were Filled, And Their Heart Was Exalted

Being filled was not the problem on its own.

What came next was the danger, a heart that grew proud from comfort.

"Exalted" here describes pride that forgets where the blessing came from.

Comfort can make people feel self sufficient instead of thankful.

That shift from grateful to proud happens quietly, one full season at a time.

🍽️ Being filled was not the real problem

💔 Exalted here means pride born from comfort

🙄 Comfort can feel like self sufficiency

📖 Gratitude slowly turned into pride

## 🙈 Therefore Have They Forgotten Me

Prosperity did not make Israel grateful.

It made Israel forgetful instead.

Forgetting God here is not a simple memory lapse.

It means living as though his past rescue no longer matters.

The nation that once depended on God in the wilderness stopped needing him at home.

🙈 Prosperity made Israel forgetful, not grateful

🧠 Forgetting God means more than a memory lapse

🏠 God felt unnecessary once life got comfortable

📖 The desert God was forgotten at home

# Hosea 13:7-8
# 🦁 As A Lion, As A Bear, As A Leopard
---
## 🦁 Therefore I Will Be Unto Them As A Lion

God switches suddenly from shepherd language to predator language.

A lion was the most feared hunter in the region, fast and lethal.

This threat is not random.

It directly answers the forgetting named just one verse earlier.

The same God who once fed and protected Israel would now hunt them.

🦁 God shifts from shepherd to predator language

😨 A lion was the region's most feared hunter

🔁 This answers the forgetting just mentioned

📖 The feeder would now become the hunter

## 🐆 As A Leopard By The Way Will I Observe Them

A leopard does not chase its prey across open ground.

It waits quietly beside a path and strikes without warning.

"Observe" here means watching closely before the moment to attack.

Ephraim would not see this coming until it was already too late.

That kind of judgment gives no warning shot.

🐆 Leopards ambush instead of chasing prey

👀 Observe means watching closely before attacking

😮 Ephraim would not see this coming

📖 This judgment gave no warning shot

## 🐻 I Will Meet Them As A Bear That Is Bereaved Of Her Whelps

"Bereaved" means a mother who has lost her young.

"Whelps" simply means cubs, a bear's own babies.

A mother bear robbed of her cubs becomes the most dangerous animal in the forest.

She is not calculating or careful.

She attacks with everything she has.

That is the picture God chooses for this judgment.

🐻 Bereaved means a mother who lost her young

🐾 Whelps simply means a bear's cubs

😡 A robbed mother bear becomes most dangerous

📖 That is the picture chosen for judgment

## 💔 And Will Rend The Caul Of Their Heart

"Rend" means to tear violently apart.

"Caul" refers to a covering, here pictured around the heart.

This is graphic language on purpose, not an accident of translation.

It pictures total, inward devastation, not a surface wound.

Nothing about this judgment would stay shallow.

💔 Rend means to tear violently apart

🫀 Caul pictures a covering around the heart

🎯 This language is graphic on purpose

📖 The wound here runs deep, not shallow

## 🐾 And There Will I Devour Them Like A Lion, The Wild Beast Shall Tear Them

Three animals appear in these two verses, a lion, a leopard, and a bear.

Each one pictures a different way judgment would strike without warning.

"The wild beast shall tear them" sums up all three images at once.

This is the harshest language God uses anywhere in this book.

It describes exactly how serious forgetting him had become.

🦁 Three animals appear across these two verses

⚡ Each pictures judgment striking without warning

📣 Wild beast sums up all three images

📖 Forgetting God had become this serious

# Hosea 13:9-11
# 👑 Thou Hast Destroyed Thyself
---
## 💥 O Israel, Thou Hast Destroyed Thyself

This judgment does not come from some outside accident.

Israel did not lose a battle it could not have avoided.

The ruin described here is self inflicted, not forced on them from outside.

God names this honestly instead of letting Israel blame someone else.

Taking responsibility is the first step any nation could take.

💥 This ruin was not an outside accident

🪞 Israel's own choices caused this fall

🗣️ God names the cause honestly

📖 Responsibility is the first step forward

## 🙏 But In Me Is Thine Help

Even after naming Israel's self inflicted ruin, God does not walk away.

"Help" here is not vague encouragement.

It is a real offer of rescue.

The same verse that names the disaster also names the only way out.

Judgment and mercy sit side by side in this single sentence.

🙏 God does not walk away after this

🎁 Help here means a real offer of rescue

⚖️ Judgment and mercy sit side by side

📖 The way out is named in this verse

## 👑 I Will Be Thy King, Where Is Any Other That May Save Thee

This question is rhetorical.

God already knows the answer.

No human king in any of Israel's many cities could actually save them.

The question exposes how empty Israel's trust in human rulers had been.

God offers himself as the only king worth having.

❓ This question already has its answer

🏙️ No human king in any city could save

🪞 It exposes empty trust in human rulers

📖 God alone was the king worth having

## 📜 And Thy Judges Of Whom Thou Saidst, Give Me A King And Princes

This line looks back to 1 Samuel 8, when Israel first asked for a king.

The people wanted to look like the nations around them.

They rejected God's direct rule in favor of a human one.

Saul became that first king.

The whole monarchy grew from that one request.

Hosea brings up that old demand as the root of the present trouble.

📜 This recalls Israel's first request in 1 Samuel

🌍 They wanted to look like other nations

👑 Saul became Israel's first human king

📖 Hosea traces today's trouble to that old request

## 😡 I Gave Thee A King In Mine Anger, And Took Him Away In My Wrath

God allowed the monarchy even though it was not his first choice for Israel.

Giving in to that request still came with real anger attached.

The northern kingdom's history bore this out.

Many of its kings were overthrown or killed.

"Took him away" points to that constant, violent instability at the top.

Even something God permits can still carry consequences.

😡 God allowed this, but anger came with it

⚔️ The northern kingdom's kings were often overthrown

💔 Took away points to constant instability

📖 Even permission can carry real consequences

# Hosea 13:12-13
# 🤰 The Sorrows Of A Travailing Woman
---
## 📦 The Iniquity Of Ephraim Is Bound Up

"Bound up" pictures something tied together and stored for later.

This is not describing forgiveness or a record wiped clean.

It describes guilt collected and kept, like a bundle set aside.

The bill for Ephraim's sin had not disappeared.

It had only been saved for later.

📦 Bound up means tied up and stored

🚫 This is not forgiveness or a clean record

🧾 Guilt was collected like a kept bundle

📖 The bill for sin was only saved

## 🙈 His Sin Is Hid

"Hid" does not mean forgotten or erased from the record.

It means kept out of sight until the right moment for judgment.

Ephraim may have felt like guilt without consequence meant guilt that no longer mattered.

That delay was never the same thing as a pardon.

Nothing stored away by God stays hidden forever.

🙈 Hid means kept out of sight, not erased

⏳ Judgment was delayed, not cancelled

😌 Ephraim mistook delay for pardon

📖 Nothing hidden from God stays hidden forever

## 🤰 The Sorrows Of A Travailing Woman Shall Come Upon Him

"Travailing" describes a woman in active labor, deep in the pains of childbirth.

Those pains are sudden, intense, and impossible to ignore once they start.

Hosea uses that image for the judgment about to hit Ephraim.

This was not a slow fade.

It was about to arrive all at once.

🤰 Travailing means active, intense labor pain

⚡ Those pains arrive suddenly and cannot be ignored

📈 Hosea borrows this image for coming judgment

📖 This judgment was arriving all at once

## 👶 He Is An Unwise Son

Ephraim is now pictured as a baby, not a grown nation.

"Unwise" here describes a child resisting the very process meant to bring new life.

Birth itself is not the danger.

Delay during it is the real danger.

A baby who will not come when the moment is right only puts himself at risk.

👶 Ephraim is pictured as an unwise baby

🚫 Unwise means resisting a needed process

⏰ Delay, not birth itself, was the danger

📖 Resisting the right moment brings real risk

## 🚪 For He Should Not Stay Long In The Place Of The Breaking Forth Of Children

"The place of the breaking forth of children" is the birth canal itself.

A baby stuck there too long is in real, immediate danger.

Hosea is picturing Ephraim as stalled at the most dangerous possible moment.

Staying stuck there, refusing to move forward, could prove fatal.

There comes a point where delay itself becomes the real danger.

🚪 This phrase names the birth canal itself

⚠️ A baby stuck there faces real danger

🧭 Ephraim is pictured stalled at that moment

📖 Delay itself had become the real danger

# Hosea 13:14
# ⚰️ I Will Ransom Them From The Power Of The Grave
---
## 💰 I Will Ransom Them From The Power Of The Grave

"Ransom" means paying a price to free someone held captive.

"The grave" here names death's power over every person, not one tomb.

Just a few verses after describing fierce judgment, God speaks of buying his people back.

This sudden turn shows judgment was never God's last word.

Mercy can sit right next to judgment in the very same breath.

💰 Ransom means paying to free a captive

⚰️ The grave names death's power over everyone

🔄 This turn follows right after fierce judgment

📖 Judgment was never God's final word

## 🕊️ I Will Redeem Them From Death

"Redeem" is a legal and family word, used when someone bought back a person or property that was lost.

A close relative, called a kinsman redeemer, had the right to buy back a family member's freedom or land.

God here claims that same role for himself.

He is not only a distant judge.

He is also the closest possible relative.

🕊️ Redeem is a legal, family rescue word

👪 A kinsman redeemer bought back a relative's freedom

⚖️ God claims that same family role here

📖 God is judge and closest relative both

## ☠️ O Death, I Will Be Thy Plagues

God speaks directly to death itself, like confronting an enemy by name.

"Plagues" here means God himself will be the force that defeats death.

This is bold language about a power no human being can overcome alone.

The apostle Paul later quotes this line in 1 Corinthians fifteen about the resurrection.

What Hosea announced here, Paul says Jesus finally accomplished.

☠️ God confronts death directly, by name

⚡ Plagues means God defeats death himself

📜 Paul quotes this in 1 Corinthians fifteen

📖 Jesus later accomplished what Hosea announced

## ⚰️ O Grave, I Will Be Thy Destruction

"Grave" here translates a word for the realm of the dead, not one burial plot.

God names himself as the very thing that will destroy the grave's hold.

This repeats the same bold claim just made about death, now aimed at the grave.

Together the two lines leave no part of death's power unchallenged.

Nothing about death would stay in charge forever.

⚰️ Grave here means the realm of the dead

💥 God names himself as the grave's destroyer

🔁 This repeats the claim just made about death

📖 Nothing about death stays in charge forever

## 🙅 Repentance Shall Be Hid From Mine Eyes

This line is genuinely difficult, and honest readers should say so plainly.

Many scholars read "repentance" here as God's own mind, not Israel's.

In that reading, God is saying his resolve to act will not change course.

It is not a promise that mercy is gone forever.

Mercy was just promised two lines earlier in this very verse.

🙅 This verse is genuinely hard to read

🧠 Many scholars read this as God's resolve

🚫 Mercy is not actually withdrawn here

📖 Mercy was just promised two lines earlier

# Hosea 13:15-16
# 🌬️ An East Wind Shall Come
---
## 🌾 Though He Be Fruitful Among His Brethren

"Ephraim" itself means fruitful, a name going back to Joseph's son in Genesis.

That name once matched reality, when the tribe grew large and strong.

This phrase names Ephraim's success right before its sudden collapse.

Hosea uses that irony on purpose.

Prosperity right before judgment makes the fall even more striking.

🌾 Ephraim's name itself means fruitful

📈 For a time, that name matched reality

🔁 Hosea uses this irony on purpose

📖 Prosperity made the coming fall more striking

## 🌬️ An East Wind Shall Come, The Wind Of The LORD Shall Come Up From The Wilderness

The east wind in this region blew hot, dry, and often destructive.

It rolled in off the desert instead of bringing rain from the sea.

Calling it "the wind of the LORD" removes any doubt about its source.

This was not bad luck or a random weather pattern.

God himself was sending this storm.

🌬️ The east wind was hot, dry, and destructive

🏜️ It came from the desert, not the sea

✅ Calling it God's wind removes any doubt

📖 God himself was sending this storm

## 💧 His Spring Shall Become Dry, And His Fountain Shall Be Dried Up, He Shall Spoil The Treasure Of All Pleasant Vessels

Springs and fountains were a region's lifeline, feeding crops, animals, and people.

Losing them meant losing the ability to survive, not just an inconvenience.

"Treasure" and "pleasant vessels" point to valuables, likely looted once an invading army arrived.

Water and wealth both disappeared at once.

Nature and conquest work together here to strip Ephraim of everything it trusted.

💧 Springs and fountains were the region's lifeline

⚠️ Losing water meant losing the ability to survive

🏺 Pleasant vessels means valuables, likely looted

📖 Nature and conquest stripped away everything trusted

## 🏙️ Samaria Shall Become Desolate

Samaria was the capital city of the entire northern kingdom.

"Desolate" means emptied out, left in ruins with no one living there.

This happened in real history when Assyria conquered the northern kingdom in 722 BC.

A city that once held a throne and a royal palace would stand empty.

Hosea names the exact place where the fall would be felt most.

🏙️ Samaria was the northern kingdom's capital

🏚️ Desolate means emptied out and ruined

📜 Assyria conquered this kingdom in 722 BC

📖 Hosea names exactly where the fall landed

## ⚔️ For She Hath Rebelled Against Her God

This line names the actual cause behind Samaria's coming ruin.

It was not bad luck, broken alliances, or a stronger enemy alone.

Rebellion against God sits underneath every other cause named in this chapter.

Naming the real cause matters more than listing every surface symptom.

The fall traced back to this one root problem.

⚔️ This names the real cause of the ruin

🚫 It was not bad luck or weak alliances

🌳 Rebellion sits underneath every other cause

📖 The fall traced back to one root problem

## 👶 Their Infants Shall Be Dashed In Pieces, And Their Women With Child Shall Be Ripped Up

This verse describes something genuinely horrifying, and it should not be softened.

Ancient armies sometimes treated conquered civilians with exactly this kind of brutality.

Other prophets describe this same wartime horror happening to other nations as well.

Hosea is not inventing this cruelty.

He is naming what real conquest actually looked like.

This is the full weight of what turning away from God's protection could cost.

👶 This verse describes real wartime horror

⚔️ Ancient armies treated civilians this brutally

📜 Other prophets describe this same horror elsewhere

📖 This shows the full cost of rebellion
`.trim();

export const HOSEA_THIRTEEN_PERSONAL_SECTIONS = parseHoseaThirteenRawNotes(HOSEA_THIRTEEN_RAW_NOTES);
