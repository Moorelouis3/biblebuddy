export type PsalmsTwentySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsTwentySixRawNotes(rawText: string): PsalmsTwentySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsTwentySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+26:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 26 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+26:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+26:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 26 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 26,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 26:${startVerse}` : `Psalms 26:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 26 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_TWENTY_SIX_RAW_NOTES = `# Psalms 26:1-3
# ⚖️ An Honest Plea For Judgment
---
## ⚖️ Judge Me, O LORD

"Judge" does not mean condemn here.

It means examine a case and decide who is right.

David is asking God to look closely at his whole life.

That is a bold request, not a fearful one.

He wants the truth confirmed, whatever it shows.

⚖️ Judge means decide who is right
🙏 David invites a close look
😌 He is not afraid of scrutiny
📖 He wants the truth confirmed

## 🧭 I Have Walked In Mine Integrity

"Integrity" means being the same honest person whether anyone is watching or not.

David is not just claiming this in words.

He is asking God to test whether it is actually true.

Real integrity holds up under that kind of examination.

🧭 Integrity means being honest inside and out
👀 It holds up even when unseen
🔍 David invites God to test it
📖 Real integrity survives close examination

## 🦶 Therefore I Shall Not Slide

"Slide" here pictures a foot slipping out from under someone.

David is saying his trust in God keeps him steady.

That trust is the reason he does not fall away.

Firm footing starts with where a person places their trust.

🦶 Slide pictures a foot slipping
🛡️ Trust in God keeps him steady
🚫 He does not fall away
📖 Firm footing starts with real trust

## 🔬 Examine Me, O LORD, And Prove Me

"Examine" and "prove" both describe careful testing, not a quick glance.

David repeats the idea from verse one in stronger words.

He is not asking for comfort here.

He is asking to be tested and proven true.

🔬 Examine and prove both mean careful testing
🔁 This repeats verse one more strongly
🙅 David is not asking for comfort
📖 He wants to be proven true

## 🫘 Try My Reins And My Heart

"Reins" is an old word for the kidneys.

In Hebrew thought, the kidneys held a person's deepest feelings.

"Heart" here means the mind and will, not just emotion.

Together they cover the whole inner life, hidden thoughts included.

David wants all of it seen, not just his outward behavior.

🫘 Reins means the kidneys in Hebrew thought
💭 Heart means the mind and will
🔎 Together they cover the whole inner life
📖 David hides nothing from God

## 💗 Thy Lovingkindness Is Before Mine Eyes

"Lovingkindness" describes a loyal love that keeps its promises no matter what.

David keeps that love in constant view, like a picture he cannot stop looking at.

It shapes how he sees every part of his life.

Remembering that love is what keeps his own faithfulness alive.

💗 Lovingkindness means loyal, promise keeping love
👀 David keeps it constantly in view
🧭 It shapes how he sees his life
📖 Remembering it keeps his faithfulness alive

## 🛤️ I Have Walked In Thy Truth

"Truth" here means God's faithful guidance, not just correct facts.

Walking in it means actually following that guidance with his life.

David is not simply agreeing with truth in his head.

He is living inside it every day.

🛤️ Truth means God's faithful guidance
🚶 Walking means actually following it
🧠 Not just agreement in the mind
📖 David lives inside that truth daily

# Psalms 26:4-5
# 🚫 Refusing Bad Company
---
## 🫙 I Have Not Sat With Vain Persons

"Vain persons" means people who chase empty, worthless things instead of God.

Sitting with them here pictures close, ongoing friendship, not a passing conversation.

David has deliberately kept his distance from that kind of influence.

Who a person sits with shapes who that person becomes.

🫙 Vain persons chase empty, worthless things
🪑 Sitting pictures close, ongoing friendship
🚶 David keeps deliberate distance from them
📖 Company shapes character over time

## 🎭 Neither Will I Go In With Dissemblers

"Dissemblers" are people who hide their true intentions behind a false front.

"Go in with" pictures joining a group and taking part in what they do.

David refuses to team up with people who are not honest.

Avoiding deception starts before any harm is actually done.

🎭 Dissemblers hide their true intentions
🤝 Go in with means joining a group
🚫 David refuses to team up with them
📖 Avoiding deceit starts early, not late

## 👥 I Have Hated The Congregation Of Evil Doers

"Congregation of evil doers" describes a whole group organized around doing wrong.

"Hated" here is a strong moral rejection, not a personal grudge.

David is naming a settled conviction, not a passing mood.

He rejects the group's direction, not just the people in it.

👥 Congregation means a group organized for evil
💔 Hated means moral rejection, not a grudge
🧭 This is a settled conviction
📖 David rejects the direction, not just people

## ⚖️ Will Not Sit With The Wicked

"The wicked" refers to people who live in open, ongoing rebellion against God.

"Sit with" again pictures close fellowship, echoing verse four.

David draws the same line here that he drew before.

His convictions do not change depending on the group.

⚖️ Wicked means open rebellion against God
🪑 Sit with echoes the earlier verse
🔁 David draws the same line again
📖 His convictions do not shift with company

# Psalms 26:6-8
# 🙌 Worship At The Altar
---
## 🖐️ I Will Wash Mine Hands In Innocency

Washing hands before approaching the altar was a real priestly practice, not just a symbol here.

"Innocency" means a clean conscience, free from hidden guilt.

David is describing an honest approach to worship.

He is not hiding anything as he worships.

That honesty was the whole point of washing.

🖐️ Washing hands was an actual priestly practice
🕊️ Innocency means a clean conscience
🙏 David approaches worship honestly
📖 Clean hands should match a clean heart

## 🔄 So Will I Compass Thine Altar

"Compass" here means to walk around something in a circle.

Worshipers likely processed around the altar as part of temple worship.

David pictures himself joining that same circling procession.

Approaching God included the whole body, not just private thoughts.

🔄 Compass means walking around in a circle
🏛️ This describes a temple worship procession
🚶 David joins that same procession
📖 Worship involved the whole body, not just thoughts

## 📢 That I May Publish With The Voice Of Thanksgiving

"Publish" means to announce something loudly and publicly, not whisper it privately.

David wants his gratitude heard by others, not just felt inside.

Worship here becomes something spoken out loud, not silent.

Thanksgiving was meant to be shared, not hidden.

📢 Publish means announcing something loudly
🙌 David wants his gratitude heard
🗣️ Worship becomes something spoken aloud
📖 Thanksgiving was meant to be shared

## ✨ Tell Of All Thy Wondrous Works

"Wondrous works" means acts of God so unusual that only He could have done them.

David is not vague about what he is thankful for.

He points to specific, real things God has actually done.

Naming details makes gratitude concrete instead of generic.

✨ Wondrous works means acts only God could do
🎯 David is specific, not vague
📋 He names real, actual events
📖 Concrete gratitude beats generic gratitude

## 🏠 I Have Loved The Habitation Of Thy House

"Habitation" means a dwelling place, the actual location where someone lives.

"Thy house" refers to the tabernacle.

That was the tent where God's presence was worshiped before the temple was built.

David is not describing a building he merely visits.

He is naming a place he genuinely loves.

🏠 Habitation means a dwelling place
⛺ Thy house refers to the tabernacle
❤️ David genuinely loves this place
📖 This is more than a building visit

## 👑 The Place Where Thine Honour Dwelleth

"Honour" here means God's own glory and presence, not human praise.

"Dwelleth" means to stay permanently, not just visit for a moment.

David is describing the one place on earth where God's glory settled to stay.

That is why the place itself mattered so much to him.

👑 Honour means God's own glory
🏛️ Dwelleth means staying permanently
📍 God's glory settled in one place
📖 That is why the place mattered

# Psalms 26:9-10
# 🩸 Not With Sinners
---
## 🧺 Gather Not My Soul With Sinners

"Gather" here pictures being swept up and counted among a group at judgment.

David is asking God not to lump his fate in with sinners.

This is not about avoiding people day to day anymore.

It is a prayer about how his life gets judged in the end.

🧺 Gather pictures being swept into a group
⚖️ David asks not to share sinners' fate
🙏 This is about final judgment
📖 He wants his own life judged honestly

## 🩸 Nor My Life With Bloody Men

"Bloody men" means people who commit violence, including murder.

David widens the request from sinners in general to specifically violent people.

He does not want his life tied to theirs in any way.

The danger here is not just bad influence, it is real bloodshed.

🩸 Bloody men means violent people
📈 David widens this to violent people specifically
🚫 He rejects any tie to them
📖 The danger here is real bloodshed

## 🕳️ In Whose Hands Is Mischief

"Mischief" here means a deliberate, harmful scheme, not childish trouble.

"Hands" pictures the actual actions these people carry out.

David is describing people who plan harm and then carry it out.

Their danger comes from what they do, not just what they think.

🕳️ Mischief means a deliberate, harmful scheme
✋ Hands pictures the actions themselves
📋 They plan harm and act on it
📖 Danger lies in action, not just thought

## 💪 Their Right Hand Is Full Of Bribes

"Right hand" often pictures a person's power or main strength in scripture.

"Full of bribes" means corruption runs through their most active hand.

These are people who use their strength and influence dishonestly.

Power used this way becomes a tool for wrong instead of good.

💪 Right hand pictures power or strength
💰 Full of bribes means real corruption
🤝 Their strength gets used dishonestly
📖 Power can serve wrong instead of good

# Psalms 26:11-12
# 🦶 Standing On Level Ground
---
## 🔁 But As For Me, I Will Walk In Mine Integrity

David repeats the same claim he made all the way back in verse one.

Saying it again on purpose ties the whole psalm together.

No matter what others around him choose, his own path stays the same.

Integrity here means staying consistent from start to finish.

🔁 David repeats his claim from verse one
🧵 This ties the whole psalm together
🚶 His path stays the same throughout
📖 Integrity means staying consistent to the end

## 💳 Redeem Me, And Be Merciful Unto Me

"Redeem" means to rescue someone by paying a real price for them.

David is not claiming he can save himself.

He pairs that request immediately with a plea for mercy.

Integrity does not replace the need for God's rescue.

💳 Redeem means rescue by paying a price
🙅 David cannot save himself
🙏 He immediately asks for mercy too
📖 Integrity never replaces the need for rescue

## 🦶 My Foot Standeth In An Even Place

"Even place" pictures solid, level ground, the opposite of a slippery slope.

This directly answers the fear named back in verse one, not sliding.

David is saying that fear has been settled by the end of the psalm.

His feet are finally planted somewhere stable.

🦶 Even place pictures solid, level ground
🔄 This answers the fear from verse one
✅ That fear is now settled
📖 His feet stand somewhere stable

## 👥 In The Congregations Will I Bless The LORD

"Congregations" means the gathered assembly of God's people at worship.

David does not want to bless God privately and quietly alone.

He wants his gratitude said out loud in front of everyone.

The psalm that began with a private plea ends in public praise.

👥 Congregations means the gathered assembly
🗣️ David wants his praise heard publicly
🙌 Gratitude here is not private
📖 A private plea ends in public praise
`.trim();

export const PSALMS_TWENTY_SIX_PERSONAL_SECTIONS = parsePsalmsTwentySixRawNotes(PSALMS_TWENTY_SIX_RAW_NOTES);
