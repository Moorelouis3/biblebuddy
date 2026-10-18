export type JamesFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJamesFiveRawNotes(rawText: string): JamesFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JamesFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*James\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing James 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+James\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+James\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing James 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `James 5:${startVerse}` : `James 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 James 5 sections, received " + sections.length);
  }

  return sections;
}

const JAMES_FIVE_RAW_NOTES = `# James 5:1-6
# 💰 A Warning To The Rich
---
## Go To Now, Ye Rich Men, Weep And Howl

"Go to now" means stop and pay attention right now.

James aims that command straight at a specific group of wealthy landowners.

"Howl" is usually a word for an animal in pain, not for polite grief.

James chooses that harsh word on purpose to match the judgment that is coming.

📢 Go to now means stop and listen

💰 Aimed straight at wealthy landowners

🐺 Howl is a word for animal pain

📖 James matches the word to the judgment coming

## Your Riches Are Corrupted

"Corrupted" means rotted or ruined, not just old or worn out.

James pictures hoarded wealth decaying on its own, unused and untouched.

Grain could rot, cloth could rot, and even stored food could spoil.

Wealth that only sits in a pile was never actually safe at all.

🦠 Corrupted means rotted or ruined

🏚️ This wealth was hoarded, not used

🌾 Even stored grain and food could spoil

📖 Hoarded wealth was never truly safe

## Your Garments Are Motheaten

"Motheaten" means eaten through by moths, leaving holes in the fabric.

Clothing was one of the most common ways people stored wealth in this culture.

A moth quietly ruining an expensive robe pictures wealth being destroyed with no one watching.

The very thing meant to prove status instead proved how fragile that status really was.

🦋 Motheaten means eaten through by moths

👗 Clothing was a common form of wealth

🕳️ Destroyed quietly with no one watching

📖 Status built on cloth proved fragile

## Your Gold And Silver Is Cankered

"Cankered" means corroded, as if the metal itself had grown sick.

Gold and silver do not naturally rust the way iron does.

James uses that impossible image on purpose to picture total, pointless decay.

Hoarding wealth so tightly can waste it just as surely as losing it.

🧪 Cankered means corroded, like a sickness

🥇 Gold and silver do not naturally rust

🚫 This decay was never really natural

📖 Hoarding wealth can waste it too

## The Rust Of Them Shall Be A Witness Against You

"Witness" here means evidence presented at a trial, not a casual bystander.

The very wealth they hoarded will testify against them when they face God.

It will also "eat your flesh as it were fire," a picture of real torment.

The thing they trusted to protect them becomes the proof used to condemn them.

⚖️ Witness means evidence given at a trial

💰 Their hoarded wealth will testify against them

🔥 Eat your flesh pictures real torment

📖 Their own trust becomes their proof of guilt

## Ye Have Heaped Treasure Together For The Last Days

"Heaped" means piled up far beyond what anyone could actually use.

They assumed they were storing up security for a long and comfortable future.

James says they were really stacking up evidence for the day of judgment instead.

The very last days were the one time that pile could never help them.

📦 Heaped means piled far beyond any use

🏦 They thought they were storing up security

⚖️ They were really stacking up evidence

📖 That pile could never help on judgment day

## Kept Back By Fraud

"Crieth" means the unpaid wages themselves are described as crying out loud for justice.

These landowners hired workers for the harvest and then refused to pay them in full.

The law of Moses required a laborer's wage to be paid the same day it was earned.

Holding back a poor worker's pay for even one night was treated as a serious wrong.

🌾 Workers were hired and then underpaid

📜 The law required same day payment

🌙 Holding back pay overnight was a serious wrong

📖 The unpaid wages cry out for justice

## The Lord Of Sabaoth

"Sabaoth" is a Hebrew word meaning armies or hosts, often translated as hosts.

This title names God as commander over every army in heaven and on earth.

James chooses the most powerful title available right after describing stolen wages.

The cries of cheated workers reach the ears of the strongest judge there is.

👑 Sabaoth means armies or hosts

⚔️ God is named commander over every army

💪 James picks the most powerful title here

📖 Cheated workers are heard by the strongest judge

## Lived In Pleasure On The Earth, And Been Wanton

"Wanton" means living with no self control, chasing comfort without limits.

This is not a warning against enjoying good things God provides.

It is a warning against a life built entirely around personal comfort.

That kind of life was funded here by money stolen from working people.

🎉 Wanton means living with no self control

🙅 Not a warning against enjoying good things

🏖️ It warns against a life built on comfort

📖 That comfort was funded by stolen wages

## Nourished Your Hearts, As In A Day Of Slaughter

This pictures an animal being fattened right before it is killed for food.

The rich men fattened themselves on luxury without noticing judgment was near.

They thought they were enjoying life when they were really being prepared for it.

The very comfort they chased was quietly sealing their own fate.

🐄 Pictures an animal fattened before slaughter

😋 They fattened themselves on luxury

😳 They never noticed judgment coming closer

📖 Their comfort was sealing their own fate

## Ye Have Condemned And Killed The Just

"The just" means innocent people who had done nothing to deserve this treatment.

Economic cheating like unpaid wages could slowly starve a poor family to death.

James treats that slow harm as seriously as he would treat an actual killing.

"He doth not resist you" shows the victims had no power to fight back at all.

⚖️ The just means innocent people wronged

💀 Economic cheating could slowly kill a family

🗡️ James treats that harm as real killing

📖 The victims had no power to resist

# James 5:7-11
# ⏳ Patient Like The Farmer
---
## Be Patient Therefore, Brethren, Unto The Coming Of The Lord

"Patient" here means staying steady under pressure instead of giving up.

James turns from the rich oppressors to speak directly to their suffering victims.

"The coming of the Lord" points forward to Christ's promised return.

That future hope is the reason the readers can wait instead of taking revenge.

🧘 Patient means staying steady under pressure

👥 James now speaks to the suffering victims

🙌 The coming of the Lord means Christ's return

📖 That hope replaces revenge with waiting

## The Husbandman Waiteth For The Precious Fruit Of The Earth

"Husbandman" is an older word for a farmer who works the soil by hand.

A farmer cannot force a crop to ripen faster by worrying over it.

He plants the seed and then waits through a season he cannot control.

James offers that farmer as the picture of patience he wants his readers to copy.

🌱 Husbandman means a farmer who works the soil

⏱️ A farmer cannot force a crop to ripen

🌾 He waits through a season he cannot control

📖 The farmer models the patience James wants

## The Early And Latter Rain

Israel depended on two separate rainy seasons each year to grow any food at all.

The early rain fell around planting time, softening the ground for seed.

The latter rain fell near harvest, swelling the grain for its final growth.

Missing either rainy season could mean real hunger for an entire community.

🌧️ Israel depended on two yearly rains

🌱 Early rain softened the ground for planting

🌾 Latter rain swelled the grain before harvest

📖 Missing either rain could mean real hunger

## Stablish Your Hearts

"Stablish" is an older spelling of establish, meaning to make firm and steady.

A heart that is stablished does not wobble every time circumstances change.

James is not describing a feeling but a decision to stay settled.

That steadiness is only possible because the Lord's coming draws near.

🏛️ Stablish means to make firm and steady

🌀 It does not wobble with circumstances

🎯 This is a decision, not just a feeling

📖 Steadiness comes from the Lord's coming being near

## Grudge Not One Against Another, Brethren

"Grudge" here means groaning or complaining bitterly against someone else.

Hard pressure between people can quickly turn their suffering against each other.

James warns believers not to let shared hardship become a reason to blame their own brethren.

The real enemy was never the person sitting next to them.

😤 Grudge means groaning bitterly against another

💥 Hard pressure can turn people on each other

🙅 Shared hardship should not create blame

📖 The person beside them was never the enemy

## The Judge Standeth Before The Door

This pictures judgment as someone already standing right outside, about to knock.

It is not a distant, theoretical event far off in the future.

James uses that closeness to make the warning against grudges feel urgent.

Whatever needs to change between believers needs to change now, not eventually.

🚪 Pictures judgment standing at the door

⏰ Not a distant or theoretical event

⚡ The closeness makes the warning urgent

📖 Change was needed now, not eventually

## Take, My Brethren, The Prophets, For An Example

James points his readers back to the Old Testament prophets as living proof.

Those prophets were mocked, hunted, and mistreated while still serving God faithfully.

"For an example" means their lives are meant to be studied and copied.

If they endured suffering while remaining faithful, so can James's readers.

📜 James points to the Old Testament prophets

🏃 They were mocked and hunted for serving God

🔁 Example means a life meant to be copied

📖 Their endurance shows James's readers can endure too

## We Count Them Happy Which Endure

"Happy" here does not mean cheerful or lighthearted in the moment.

It means being in a genuinely good position, blessed in the long run.

James is not saying suffering feels pleasant while it is happening.

He is saying the person who stays faithful through it ends up truly blessed.

😊 Happy here does not mean cheerful

🏆 It means genuinely blessed in the long run

🚫 Suffering itself is never called pleasant

📖 Staying faithful through it leads to real blessing

## The Patience Of Job

James assumes his readers already know Job's story without explaining it again.

Job lost his family, his health, and his wealth in a single season.

Through all of that, Job still refused to turn away from God.

James holds up that same endurance as proof patience is actually possible.

📖 James assumes readers already know Job's story

💔 Job lost family, health, and wealth together

🙏 He still refused to turn away from God

➡️ His endurance proves patience is possible

## The Lord Is Very Pitiful, And Of Tender Mercy

"Pitiful" in this old English usage means full of compassion, not pathetic.

Modern readers can easily mishear this word as an insult toward God.

James closes this section by naming exactly who God actually is.

The same God who allowed Job's suffering is full of tender mercy toward him.

🤍 Pitiful here means full of compassion

❌ A modern reader could easily mishear the word

🪞 James names exactly who God actually is

📖 Job's God is also tender mercy

# James 5:12
# 🗣️ Let Your Yes Mean Yes
---
## Swear Not, Neither By Heaven, Neither By The Earth

In this culture, people sometimes swore oaths by heaven, earth, or other sacred things.

Swearing by something was meant to make a promise feel more binding.

That practice quietly suggested an ordinary promise, on its own, was not trustworthy enough.

James echoes Jesus's own teaching on this exact subject in the Gospels.

🙋 People swore oaths by heaven or earth

🔗 Swearing was meant to strengthen a promise

🤔 It suggested plain promises were not trustworthy

📖 James echoes Jesus's own teaching here

## Let Your Yea Be Yea, And Your Nay, Nay

"Yea" and "nay" are older words for a simple yes and no.

James wants a person's plain word to already be completely trustworthy.

No oath, no extra guarantee, and no special wording should be required.

Adding all of that machinery to a promise, he warns, risks falling into condemnation.

✅ Yea and nay mean simple yes and no

🤝 A plain word should already be trustworthy

🚫 No oath or extra guarantee should be needed

📖 Adding all that risks real condemnation

# James 5:13-18
# 🙏 A Church That Prays
---
## Is Any Among You Afflicted? Let Him Pray

"Afflicted" means suffering real hardship, whether physical, emotional, or financial.

James gives a direct, practical instruction instead of a vague comfort.

Prayer is presented as the first move, not a last resort after everything else fails.

Trouble is meant to send a believer toward God, not away from Him.

😔 Afflicted means suffering real hardship

🎯 James gives a direct, practical instruction

🙏 Prayer is the first move, not the last

📖 Trouble should send a believer toward God

## Is Any Merry? Let Him Sing Psalms

"Merry" means genuinely joyful, not foolish or careless.

James pairs hardship with joy on purpose, covering both ends of ordinary life.

Singing psalms was the normal way worshippers expressed thanks in this culture.

Good seasons are meant to be brought to God too, not just hard ones.

😄 Merry means genuinely joyful

⚖️ James pairs hardship with joy on purpose

🎵 Singing psalms was the normal way to worship

📖 Good seasons belong to God too

## Let Him Call For The Elders Of The Church

"Elders" were the recognized, respected leaders responsible for caring for a local church.

Calling for them meant inviting trusted spiritual leadership into a private, difficult moment.

This was never meant to be handled alone in isolation.

Serious need was a reason to bring the community closer, not to withdraw from it.

👴 Elders were the recognized leaders of a church

📞 Calling them meant inviting trusted leadership in

🙅 This was never meant to be handled alone

📖 Need should draw a believer toward community

## Anointing Him With Oil In The Name Of The Lord

Anointing with oil was a common, practical sign of care in this culture.

Oil was also used in everyday life as a basic treatment for wounds.

Here it carries a deeper meaning, done specifically "in the name of the Lord."

The physical act becomes a visible sign that God Himself is the one being asked to act.

🫗 Anointing with oil was a sign of care

🩹 Oil was also a basic wound treatment

🙏 Done here in the name of the Lord

📖 The act shows who is really asked

## The Prayer Of Faith Shall Save The Sick

"Faith" here means real trust placed in God, not a formula that forces an outcome.

This verse is not a guarantee that every prayer for healing will be answered exactly as asked.

James is describing God's normal, gracious pattern of care for His people.

Real trust in God always matters, even when the outcome is not what was asked for.

🙏 Faith means real trust, not a formula

❌ Not a guarantee of healing every single time

🤲 This describes God's normal pattern of care

📖 Trusting God matters no matter the outcome

## If He Have Committed Sins, They Shall Be Forgiven Him

This does not mean every sickness is caused directly by a specific sin.

James simply allows for the possibility that sin and sickness are sometimes connected.

Where that connection exists, forgiveness is offered alongside physical healing.

God is shown caring for the whole person, body and soul together.

🚫 Not every sickness is caused by sin

🔗 Sin and sickness are sometimes connected

🤍 Forgiveness is offered alongside healing here

📖 God cares for body and soul together

## Confess Your Faults One To Another

"Faults" means failures and sins, not just small mistakes or slips.

This instruction assumes believers are close enough to be honest with each other.

Hiding sin quietly tends to let it grow in the dark, unseen.

Naming it out loud to another person is part of how healing actually happens.

🗣️ Faults means real failures and sins

🤝 This assumes believers are honest with each other

🌑 Hidden sin tends to grow in the dark

📖 Naming it out loud is part of healing

## The Effectual Fervent Prayer Of A Righteous Man Availeth Much

"Effectual" means genuinely effective, producing a real result rather than just words.

"Fervent" means prayed with real heat and earnestness, not a routine recitation.

"Availeth" means accomplishes or achieves, an older way of saying it works.

James is promising that this kind of prayer truly changes things.

🔥 Effectual means genuinely producing a real result

🌡️ Fervent means prayed with real earnestness

💪 Availeth means it actually accomplishes something

📖 This kind of prayer truly changes things

## Elias Was A Man Subject To Like Passions As We Are

"Elias" is the Greek form of the Hebrew name Elijah.

"Passions" here means ordinary human weaknesses and emotions, not sinful desires.

Elijah is remembered as one of the most powerful prophets in the Old Testament.

James insists he was still an ordinary man, not a different kind of being.

📛 Elias is the Greek form of Elijah

🧍 Passions means ordinary human weaknesses

⚡ Elijah is remembered as a powerful prophet

📖 He was still an ordinary man like us

## He Prayed Earnestly That It Might Not Rain

James is recalling the famous drought from the story of Elijah and King Ahab.

That drought lasted three years and six months, a severe and lasting famine.

James credits that entire national event to one ordinary man's earnest prayer.

If prayer like that worked for Elijah, it can work for James's readers too.

📜 James recalls Elijah's drought under King Ahab

⏳ The drought lasted three years and six months

🙏 One man's prayer caused a national event

📖 That same prayer power is open to us

## The Heaven Gave Rain, And The Earth Brought Forth Her Fruit

This closes the Elijah story with the drought finally ending in answered prayer.

Elijah prayed again, and this time the rain returned as he asked.

The dry ground that had failed for years produced fruit again right away.

James ends this whole section by proving that real prayer truly works both ways.

🌧️ The drought ended through answered prayer

🙏 Elijah prayed again, and rain returned

🌾 The dry ground produced fruit again

📖 Real prayer works in both directions

# James 5:19-20
# 🤝 Bringing A Brother Back
---
## If Any Of You Do Err From The Truth

"Err" means to wander away or drift off course, not a sudden, dramatic fall.

James pictures this as a slow straying rather than one single decision.

"The truth" here means the faith and way of life James has been describing all along.

This closing warning assumes that any believer could drift this way without noticing.

🧭 Err means wandering off course slowly

🐑 It pictures a slow straying, not a fall

📜 The truth means the faith James has described

📖 Any believer could drift this way unnoticed

## And One Convert Him

"Convert" here means to turn someone back toward the truth they wandered from.

James assumes other believers have a real responsibility to go after the one who strayed.

This is active rescue, not quiet observation from a safe distance.

Watching a brother wander away without saying anything was never the model James gives.

🔄 Convert means turning someone back to truth

👥 Other believers are responsible to go after them

🏃 This is active rescue, not quiet observation

📖 Silent watching was never the model James gives

## Shall Save A Soul From Death

"Death" here points to spiritual ruin, not only physical death.

James treats bringing one wandering person back as a genuinely life saving act.

This gives real, eternal weight to what could look like a small, quiet conversation.

One honest word to a straying friend can matter far more than it seems.

⚰️ Death here points to spiritual ruin

🛟 Bringing someone back is a life saving act

⚖️ A small conversation carries eternal weight

📖 One honest word can matter this much

## Shall Hide A Multitude Of Sins

"Hide" here means cover over completely, the way forgiveness removes guilt from view.

"A multitude of sins" means a whole pattern of wrongdoing, not one single mistake.

James closes his letter on this note of real rescue and real mercy.

The whole book that began with trials and temptation ends on hope for the wanderer.

🫥 Hide means cover over completely

📚 A multitude means a whole pattern of sin

🙏 James closes on rescue and mercy

📖 The letter ends on hope for the wanderer
`.trim();

export const JAMES_FIVE_PERSONAL_SECTIONS = parseJamesFiveRawNotes(JAMES_FIVE_RAW_NOTES);
