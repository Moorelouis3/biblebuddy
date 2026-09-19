export type PsalmsOneHundredThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredThreeRawNotes(rawText: string): PsalmsOneHundredThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+103:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 103 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+103:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+103:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 103 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 103,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 103:${startVerse}` : `Psalms 103:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 103 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_THREE_RAW_NOTES = `# Psalms 103:1-5
# 🙏 Bless The LORD For His Benefits
---
## 🙏 Bless The LORD, O My Soul

"Bless" usually describes God giving good things to people.

Here the direction turns around completely.

The soul is commanded to bless the LORD instead.

"Soul" means the whole inner self, not only feelings.

David is ordering his own heart to praise, not just describing a mood.

🔄 Bless flips direction here

❤️ Soul means the whole inner self

🗣️ David commands his own heart

📖 Praise is a choice, not just a feeling

## 💯 And All That Is Within Me

This phrase repeats the idea of the soul with more force.

Every part of David joins in, not just his lips.

Ancient Hebrew poetry often restates an idea a second way for emphasis.

Praise here is not a single word said in passing.

It is a whole person putting everything toward one purpose.

🔁 The soul gets named twice for emphasis

💯 Every part of him joins in

📜 Hebrew poetry repeats ideas for weight

📖 Praise involves the whole person

## 🎁 Forget Not All His Benefits

"Benefits" means gifts, favors God has already given.

David is not asking for anything new here.

He is telling himself to remember what already happened.

Forgetting comes easily when life feels ordinary again.

This verse is a command to keep memory sharp on purpose.

🎁 Benefits means gifts already given

🙅 Not a request for something new

🧠 A command to remember on purpose

📖 Gratitude fades unless memory stays sharp

## 🧼 Who Forgiveth All Thine Iniquities

"Iniquities" means moral wrongs, sins against God's standard.

The word "all" leaves nothing out of that forgiveness.

This is the first benefit David names.

It comes first for a reason.

Every other blessing in this psalm rests on this one.

🧼 Iniquities means moral wrongs

💯 All leaves nothing out

🥇 Forgiveness comes first in the list

📖 Every other blessing rests on this one

## 🩹 Who Healeth All Thy Diseases

Ancient readers rarely separated body and soul the way modern readers do.

Sickness and sin both counted as things that needed healing.

This line pairs forgiveness with physical healing on purpose.

God is shown caring for the whole person, not just the spirit.

🩹 Healing paired with forgiveness on purpose

🧍 Ancient readers saw body and soul together

🙏 God cares for the whole person

📖 Spiritual and physical care come together

## 💎 Who Redeemeth Thy Life From Destruction

"Redeemeth" means to buy back or rescue at a cost.

The word pictures a life that was headed toward ruin.

"Destruction" here points to the grave and complete loss.

God is the one who steps in and buys that life back.

💎 Redeemeth means bought back at a cost

🕳️ Destruction pictures the grave and complete loss

🛟 A rescue from total ruin

📖 God steps in before the end

## 👑 Crowneth Thee With Lovingkindness And Tender Mercies

A crown was worn by kings, not ordinary people.

Here God places one on an ordinary person instead.

"Lovingkindness" describes God's loyal, covenant love that does not quit.

"Tender mercies" describes the gentle compassion behind that loyalty.

The image turns rescue into royal honor.

👑 A crown usually belonged to kings

🤝 Lovingkindness means loyal, covenant love

💗 Tender mercies means gentle compassion

📖 Rescue becomes royal honor here

## 🦅 Thy Youth Is Renewed Like The Eagle's

Eagles were known in the ancient world for living a long time.

Many ancient writers believed an eagle's feathers renewed as it aged.

David uses that picture for feeling strong and young again.

This is not literal youth returning.

It is renewed strength instead.

🦅 Eagles were seen as long living birds

🪶 Ancient belief held their feathers renewed

💪 David pictures renewed strength, not literal age

📖 Being fed well leads to feeling young again

# Psalms 103:6-10
# 😇 Merciful And Slow To Anger
---
## ⚖️ Executeth Righteousness And Judgment For All That Are Oppressed

"Executeth" means carries out or puts into action.

God is not only fair in theory.

He puts that fairness into action.

"Oppressed" means people crushed or mistreated by someone stronger.

This verse shows God stepping in on their behalf.

⚖️ Executeth means carries out in action

💪 Not just fairness in theory

🙌 God acts on behalf of victims

📖 The oppressed are not forgotten

## 📜 Made Known His Ways Unto Moses

"Ways" means God's character, the reasons behind what He does.

Moses received more than a front row seat to miracles.

God explained Himself to Moses personally, especially at Sinai.

This is a deeper level of relationship than the rest of Israel had.

📜 Ways means God's character and reasons

🏔️ Moses met God personally at Sinai

🤝 A deeper relationship than the rest of Israel

📖 Understanding God is more than watching Him work

## 👥 His Acts Unto The Children Of Israel

"Acts" means the visible events God performed.

Israel as a whole nation witnessed these events happen.

They saw what God did without always understanding why.

Moses knew the reasons.

The nation mostly saw only the results.

👀 Acts means the visible events performed

🇮🇱 All Israel witnessed these events

❓ Seeing is not the same as understanding

📖 Moses knew why, Israel saw what

## 😇 Merciful And Gracious, Slow To Anger

These exact words first appeared when God revealed His name to Moses.

That moment is recorded back in Exodus chapter thirty four.

"Merciful" means compassionate toward suffering.

"Gracious" means kind to people who have not earned it.

"Slow to anger" means patient, not quick to punish.

🏔️ These words echo Exodus thirty four

❤️ Merciful means compassion, gracious means unearned kindness

⏳ Slow to anger means patient, not quick

📖 God named His own mercy out loud

## 🌊 Plenteous In Mercy

"Plenteous" means abundant, more than enough.

This is not a small, careful amount of mercy.

It is mercy poured out generously, again and again.

The psalm keeps stacking words for mercy because one word was not enough.

🌊 Plenteous means abundant, overflowing

🚫 Not a small or careful amount

🔁 Mercy poured out again and again

📖 One word could not capture it

## 🗣️ He Will Not Always Chide

"Chide" means to scold or rebuke sharply.

God does correct people when they do wrong.

This verse promises that correction will not last forever.

The next phrase repeats the same promise a second way.

Correction has a limit, but forgiveness does not.

😠 Chide means to scold sharply

⏳ Correction does not last forever

🔁 The promise gets repeated for emphasis

📖 Correction ends, forgiveness does not

## ⚖️ Not Dealt With Us After Our Sins

A fair court would deal with people exactly as their sins deserve.

This verse says God chose something different on purpose.

"After our sins" means matching the punishment to the crime.

God is described here as holding back what was actually deserved.

⚖️ A fair court matches punishment to crime

🚫 God chose a different path

❤️ Deserved punishment was held back

📖 Mercy overrides what is technically fair

## 🎁 Nor Rewarded Us According To Our Iniquities

"Rewarded" here does not mean a gift or a prize.

It means repaid, given back exactly what was earned.

This verse repeats verse ten's first half in different words.

Hebrew poetry often says one idea twice for weight.

Both lines land on the same truth.

God did not give sinners what they earned.

🎁 Rewarded here means repaid, not gifted

🔁 This repeats verse ten's first half

📜 Hebrew poetry often doubles an idea

📖 God withheld what sin actually earned

# Psalms 103:11-14
# 🕊️ As Far As The East Is From The West
---
## ☁️ As The Heaven Is High Above The Earth

Ancient readers had no way to measure the distance to the sky.

It represented the largest, most immeasurable distance they could picture.

David uses that picture to describe the size of God's mercy.

Mercy this large cannot be measured any more than the sky can.

☁️ Heaven pictured the largest distance imaginable

📏 Ancient readers could not measure the sky

❤️ Mercy is described as just as vast

📖 Some things are too big to measure

## 🧭 As Far As The East Is From The West

North and south both end at a pole, a fixed point.

East and west never end.

They simply keep going around the earth.

David picks that direction on purpose, not north and south.

The distance between east and west has no final point to reach.

🧭 North and south stop at a pole

🌍 East and west never reach an end

🎯 David chose this pair on purpose

📖 Some distance has no final point

## 🚮 So Far Hath He Removed Our Transgressions From Us

"Transgressions" means sins, specific acts of rebellion against God.

"Removed" means taken completely away, not just covered up.

The east and west image from the line before measures how far.

Forgiven sin is not sitting nearby waiting to be found again.

🚮 Transgressions means specific acts of rebellion

🧹 Removed means taken away, not hidden

🧭 The east west image measures the distance

📖 Forgiven sin does not stay nearby

## 👨‍👧 Like As A Father Pitieth His Children

"Pitieth" here does not mean looking down on someone.

It means feeling tender compassion for someone you love.

A good father feels this toward his own children naturally.

David uses that familiar picture to describe how God feels.

👨‍👧 Pitieth means tender compassion, not looking down

❤️ A father's love for his own child

👀 A familiar, natural picture for readers

📖 God's compassion works the same way

## 🙇 Them That Fear Him

"Fear" here does not mean being afraid or terrified.

It means deep reverence, taking God seriously as God.

This exact phrase appears three times already in this psalm.

Every promise in this psalm belongs to people who honor God this way.

🙇 Fear means reverence, not terror

🙏 Taking God seriously as God

🔁 This phrase repeats three times here

📖 Every promise is tied to this reverence

## 🏺 He Knoweth Our Frame

"Frame" means the physical body, the way a person is built.

God is described here as fully aware of human limits.

He does not expect more from people than their design allows.

This knowledge is part of why His mercy runs so deep.

🏺 Frame means the physical body's design

🧍 God knows human limits fully

🤲 He does not expect more than that

📖 Mercy grows from that understanding

## 🌫️ He Remembereth That We Are Dust

This line echoes Genesis, where God formed the first man from dust.

After sin entered the world, God told that man he would return to dust.

This verse recalls that same humble origin and ending.

God remembering it is not an insult.

It is the reason behind His patience.

🌫️ Dust recalls Genesis and man's creation

⏳ Life returns to dust after death

🤲 Remembering this is not an insult

📖 It explains why God stays patient

# Psalms 103:15-18
# 🌾 Grass That Fades, Mercy That Does Not
---
## 🌱 His Days Are As Grass

Grass in this climate could grow fast and die within days.

David compares a human lifetime to that short growing season.

This is not meant as discouraging.

It is simply an honest picture of a short life.

🌱 Grass grows and dies quickly

⏳ A human life is pictured the same way

🎯 The comparison is honest, not harsh

📖 Life is genuinely short

## 🌸 As A Flower Of The Field, So He Flourisheth

A wildflower blooms bright for a short season and nothing more.

"Flourisheth" means thriving, blooming at full strength.

The image pictures a life that looks strong and full one day.

That same life can be gone completely not long after.

🌸 A wildflower blooms brightly and briefly

💪 Flourisheth means thriving at full strength

📅 Strength today does not guarantee tomorrow

📖 Beauty and strength both fade quickly

## 💨 The Wind Passeth Over It, And It Is Gone

One gust of wind is enough to finish the flower off.

"The place thereof shall know it no more" completes the picture.

No trace is left behind once it is gone.

This verse sets up a sharp contrast with what comes next.

💨 One gust of wind finishes it

👻 No trace is left behind

🔚 A short, complete ending

📖 This sets up a sharp contrast next

## ♾️ From Everlasting To Everlasting Upon Them That Fear Him

This phrase is the turning point of the whole psalm.

Human life just got compared to grass, gone in a season.

God's mercy gets compared to nothing that fades at all.

It stretches backward and forward without any starting or ending point.

♾️ This verse is the psalm's turning point

🌱 Contrasts directly with the grass image

❤️ God's mercy never fades like grass

📖 Mercy has no starting or ending point

## 👪 His Righteousness Unto Children's Children

"Children's children" means grandchildren and generations beyond them.

God's faithful character does not stop with one lifetime.

It reaches forward to people not even born yet.

A short human life still connects to a promise that outlasts it.

👪 Children's children means generations to come

🔁 God's character reaches beyond one lifetime

👶 It reaches people not yet born

📖 A short life joins a lasting promise

## 🤝 To Such As Keep His Covenant

"Covenant" means a binding agreement, a serious two sided promise.

God had made specific covenants with Israel through Moses and others.

This mercy is not offered without any connection to response.

Keeping the covenant is how a person stays inside that promise.

🤝 Covenant means a binding, serious promise

📜 God made covenants through Moses and others

🔗 Mercy connects to a real response

📖 Keeping it stays inside the promise

## 🧠 Remember His Commandments To Do Them

"Remember" here means more than simply recalling facts.

In this culture, to remember a command meant to obey it.

Forgetting the commandments in this sense meant living as if they did not exist.

The psalm closes this section by tying memory directly to action.

🧠 Remember means more than recalling facts

✅ In this culture it meant obeying

🚫 Forgetting meant living as if ignorant

📖 Memory is tied directly to action

# Psalms 103:19-22
# 👑 Bless The LORD, All His Works
---
## 👑 Prepared His Throne In The Heavens

A throne was the seat of a ruling king's authority.

Placing it in the heavens puts God above every earthly king.

This verse shifts the psalm from personal mercy to universal rule.

The same God who forgives sin also rules all creation.

👑 A throne pictures a king's authority

☁️ Placed above every earthly ruler

🔄 The psalm shifts from personal to universal

📖 The forgiver is also the ruler

## 🌍 His Kingdom Ruleth Over All

This is not a kingdom limited to one nation or people.

"Over all" means every place, every ruler, every created thing.

Israel's God is shown here as ruler of the whole world.

Nothing exists that sits outside of His authority.

🌍 Not limited to one nation

🗺️ Over all means literally everything

👑 Israel's God rules the whole world

📖 Nothing sits outside His authority

## 👼 Ye His Angels, That Excel In Strength

The psalm now calls on angels to join the praise.

"Excel in strength" means angels possess power far beyond human strength.

Even beings that powerful are still commanded to bless the LORD.

Strength this great still bows to something greater.

👼 Angels are now called to praise

💪 Excel in strength means great power

🙇 Even angels are commanded to bless Him

📖 Great strength still bows to something greater

## 👂 Hearkening Unto The Voice Of His Word

"Hearkening" means listening closely and then obeying right away.

Angels are pictured here as instantly responsive to God's word.

There is no delay and no argument in their obedience.

Their strength gets paired with immediate obedience, not independence.

👂 Hearkening means listening closely and obeying

⚡ Angels respond instantly to God's word

🚫 No delay, no argument

📖 Great strength paired with instant obedience

## ⚔️ Ye His Hosts, Ye Ministers Of His

"Hosts" was a military word, meaning organized armies.

Here it describes the heavenly armies that serve God.

"Ministers" means servants who carry out someone else's will.

Both words picture heaven as active and highly organized, not idle.

⚔️ Hosts means organized heavenly armies

🙋 Ministers means servants who carry out orders

🏰 Heaven is pictured as organized, not idle

📖 Even heaven serves with purpose

## 🌐 All His Works In All Places Of His Dominion

"Dominion" means the full territory a ruler actually controls.

For God, that territory is described here as everywhere.

"All His works" widens the call to praise beyond angels alone.

Every created thing, in every place, gets included in this call.

🌐 Dominion means the ruler's full territory

♾️ For God, that means everywhere

🌱 The call to praise widens beyond angels

📖 Every created thing is included

## 🔁 O My Soul

This psalm opened with the exact same words back in verse one.

Now those same words close the psalm at the very end.

This pattern is called an inclusio, framing the whole psalm like a picture.

Everything the psalm said in between sits inside that one frame.

The whole song begins and ends focused on the same call to worship.

🔁 This line matches the psalm's opening

🖼️ The pattern is called an inclusio

📦 Everything in between sits inside that frame

📖 The psalm begins and ends the same way
`.trim();

export const PSALMS_ONE_HUNDRED_THREE_PERSONAL_SECTIONS = parsePsalmsOneHundredThreeRawNotes(PSALMS_ONE_HUNDRED_THREE_RAW_NOTES);
