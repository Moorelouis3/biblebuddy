export type PsalmsTwentySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsTwentySevenRawNotes(rawText: string): PsalmsTwentySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsTwentySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+27:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 27 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+27:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+27:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 27 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 27,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 27:${startVerse}` : `Psalms 27:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 27 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_TWENTY_SEVEN_RAW_NOTES = `# Psalms 27:1-3
# 🕯️ Whom Shall I Fear
---
## 🕯️ The LORD Is My Light And My Salvation

"Light" here means the one who removes darkness and shows the way forward.

David is not describing a feeling, he is naming who God is to him.

Salvation means rescue from real danger, not just a general sense of safety.

Naming God this way comes before any mention of the actual threat.

🕯️ Light means the one who removes darkness
🛟 Salvation means real rescue from danger
🧭 David names who God is first
📖 Confidence starts with naming God rightly

## ❓ Whom Shall I Fear

This is a question David expects to answer with silence.

He has already named the LORD as his light and salvation.

If God holds that role, no other threat can outrank Him.

The question is not fear denied, it is fear measured against the right size of God.

❓ The question expects no real answer
🕯️ God was just named light and salvation
⚖️ No threat can outrank that
📖 Fear shrinks next to a rightly sized God

## 🏰 The Strength Of My Life

"Strength" here means the source that holds David's whole life together.

This is not physical muscle, it is what keeps him standing at all.

David is saying his very ability to keep going comes from God.

Take away that strength and there is no life left to defend.

🏰 Strength means what holds his life together
🚶 Not muscle, but the power to keep going
🙏 David's endurance comes from God
📖 God is the source, not just the shield

## ⚔️ To Eat Up My Flesh

This phrase pictures enemies acting like predators devouring prey.

"Eat up my flesh" is a violent image, not a figure of speech about gossip.

David is describing people who wanted him destroyed, not just insulted.

Naming the danger this clearly makes his calm in verse one even more striking.

⚔️ The image pictures predators devouring prey
🩸 This describes real violence, not gossip
💀 Enemies wanted David destroyed
📖 His calm stands out against a real threat

## 🦵 They Stumbled And Fell

David describes his enemies falling before he ever lifts a hand against them.

This is not something David did, it is something that happened to them.

The verb tense points back to a real memory, a battle already won.

David's confidence in verse one is not blind hope, it rests on something God already did.

🦵 The enemies fell on their own
🙅 David did not cause this himself
🕰️ This recalls a real, past victory
📖 Confidence rests on what God already did

# Psalms 27:4-6
# 🏛️ One Thing Have I Desired
---
## 🏛️ One Thing Have I Desired

David narrows a lifetime of wants down to a single request.

"Desired" here means a settled longing, not a passing wish.

Naming one thing does not mean David had no other needs.

It means this one thing outranks every other thing he could ask for.

🏛️ One thing means a single, ranked priority
💭 Desired means a settled longing
📋 Other needs still existed
📖 This request outranked all the rest

## 🏠 To Dwell In The House Of The LORD

"Dwell" means to live somewhere permanently, not just to visit.

"The house of the LORD" refers to the tabernacle, the tent where God's presence was worshiped.

David is not asking for a single visit or a quick prayer.

He wants ongoing closeness, not an occasional appointment with God.

🏠 Dwell means to live there permanently
⛺ The house of the LORD means the tabernacle
🚪 David is not asking for a visit
📖 He wants ongoing closeness, not an appointment

## 👁️ To Behold The Beauty Of The LORD

"Behold" means to gaze at something with full attention, not a quick glance.

"Beauty" here points to God's own glory and character, not physical scenery.

David wants to keep looking at who God is, not just receive things from Him.

Wanting to look at someone, not just get something from them, describes real love.

👁️ Behold means gazing with full attention
✨ Beauty here means God's glory and character
❤️ David wants God Himself, not just gifts
📖 That desire describes real love

## 🕵️ To Enquire In His Temple

"Enquire" means to seek understanding, to ask and keep asking.

This pairs with beholding, David wants to look and to learn at once.

The temple was the place where a worshiper could bring questions to God.

David treats worship as a place for genuine seeking, not empty ritual.

🕵️ Enquire means to seek understanding
👁️ It pairs with beholding God's beauty
❓ The temple was a place to bring questions
📖 Worship here means real seeking, not ritual

## 🛖 He Shall Hide Me In His Pavilion

"Pavilion" is an old word for a tent, specifically a shelter used for protection.

David pictures God's presence as a physical hiding place in a real crisis.

"Time of trouble" makes clear this is not abstract comfort, it is rescue during danger.

The same God he wants to dwell with is also the one who hides him.

🛖 Pavilion is an old word for a tent
🌩️ David pictures shelter in a real crisis
🛟 This is rescue, not abstract comfort
📖 The one he seeks also hides him

## 🎵 I Will Sing Praises Unto The LORD

David moves from being hidden to actively celebrating.

"Sacrifices of joy" describes an offering given gladly, not out of duty.

His head being lifted above his enemies pictures a public reversal, not a private feeling.

Rescue in this psalm always leads David back to worship.

🎵 David moves from hiding to celebrating
🎁 Sacrifices of joy means a glad offering
👑 A lifted head pictures a public reversal
📖 Rescue always leads David back to worship

# Psalms 27:7-10
# 🙏 Seek Ye My Face
---
## 📣 Hear, O LORD, When I Cry With My Voice

David shifts from confident declaration to an urgent request.

"Cry with my voice" means an audible, out loud plea, not a silent thought.

Confidence in God does not erase the need to actually ask Him for help.

The psalm holds both trust and urgent asking together without contradiction.

📣 Cry with my voice means an audible plea
🔄 David shifts from declaring to asking
🤝 Trust does not remove the need to ask
📖 Confidence and urgent prayer can coexist

## 🗣️ When Thou Saidst, Seek Ye My Face

This records God's own invitation, spoken before David ever responds.

"Seek my face" pictures wanting real closeness with someone, not just their help.

David is remembering a word God already gave him, not inventing a new request.

The invitation to seek God comes from God first.

🗣️ This records an invitation from God
👁️ Seek my face means wanting real closeness
🔁 David remembers a word already given
📖 God invites first, before David responds

## 💬 My Heart Said Unto Thee, Thy Face, LORD, Will I Seek

David answers God's invitation from verse eight in his own heart.

Repeating the exact words "thy face" ties his answer directly to God's call.

This shows David's desire is a response, not something he came up with on his own.

The whole exchange reads like a conversation, not a monologue.

💬 David answers the invitation from his heart
🔁 Thy face ties his answer to God
🤝 His desire responds to God, not the reverse
📖 This reads like a real conversation

## 🙈 Hide Not Thy Face Far From Me

"Hide not thy face" is the opposite request from what David just said.

He is asking God not to reverse the very closeness he just promised to seek.

"Put not thy servant away in anger" shows real fear of losing that relationship.

Naming a fear honestly, right after a confident declaration, is not weakness.

🙈 Hide not thy face means the opposite request
😨 David fears losing the closeness he sought
🙇 Servant shows humility before God
📖 Naming fear honestly is not weakness

## 👪 When My Father And My Mother Forsake Me

David names the deepest possible human abandonment, a parent leaving a child.

He is not necessarily saying this actually happened to him.

He is describing the worst case to make a bigger point about God.

Even if that worst case happened, David says the LORD would still take him up.

👪 David names the deepest possible abandonment
❓ This may be a worst case, not history
📈 It sets up a bigger point about God
📖 God still takes him up even then

# Psalms 27:11-14
# 🛡️ Wait On The LORD
---
## 🧭 Teach Me Thy Way, O LORD

David asks to be shown how to live, not just to be rescued.

"Thy way" means God's own path and instructions, not David's own plan.

"Lead me in a plain path" asks for a way that is clear, not confusing.

David wants direction as much as he wants protection.

🧭 Thy way means God's own path
🗺️ David wants guidance, not just rescue
🛤️ A plain path means a clear one
📖 Direction matters as much as protection

## 👁️‍🗨️ Because Of Mine Enemies

David explains why he needs a clear path right now.

Enemies were watching for him to stumble or misstep.

Living carefully was not optional while under that kind of pressure.

Needing guidance and facing danger are directly connected here.

👁️‍🗨️ Enemies were watching for a misstep
⚠️ Careful living was not optional
🔗 Guidance and danger are connected
📖 Pressure makes clear direction urgent

## ⚖️ False Witnesses Are Risen Up Against Me

"False witnesses" means people lying about David in a formal accusation, not casual gossip.

"Risen up" pictures them actively standing to testify against him.

"Breathe out cruelty" describes violence, not just harsh words.

David faces both legal danger and physical threat at the same time.

⚖️ False witnesses means formal, lying testimony
🧍 Risen up pictures an active accusation
🩸 Breathe out cruelty means real violence
📖 David faces both legal and physical danger

## 😔 I Had Fainted, Unless I Had Believed

David admits how close he came to giving up entirely.

"Fainted" here means losing heart completely, not physically passing out.

"Unless I had believed" names the one thing that kept him from collapsing.

"The land of the living" means this present life, not just a future hope.

😔 Fainted means losing heart completely
🙏 Belief is what kept him from collapsing
🌍 The land of the living means life now
📖 Faith holds him up right now

## ⏳ Wait On The LORD

"Wait" here is not passive killing time, it means trusting expectation while staying ready.

David repeats this command twice in one verse, on purpose.

"Be of good courage" pairs waiting with active strength, not weakness.

The psalm that opened with confident fear ends with patient courage.

⏳ Wait means trusting expectation, not idleness
🔁 David repeats the command on purpose
💪 Courage pairs with waiting, not weakness
📖 Fear at the start becomes patience
`.trim();

export const PSALMS_TWENTY_SEVEN_PERSONAL_SECTIONS = parsePsalmsTwentySevenRawNotes(PSALMS_TWENTY_SEVEN_RAW_NOTES);
