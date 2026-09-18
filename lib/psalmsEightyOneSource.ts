export type PsalmsEightyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsEightyOneRawNotes(rawText: string): PsalmsEightyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsEightyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+81:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 81 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+81:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+81:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 81 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 81,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 81:${startVerse}` : `Psalms 81:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 81 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_EIGHTY_ONE_RAW_NOTES = `# Psalms 81:1-4
# 🎺 Sing Aloud Unto God Our Strength
---
## 🎤 Sing Aloud Unto God Our Strength

"Sing aloud" means singing with full volume and open joy, not holding back.

This worship is aimed at the "God of Jacob," tying it to the family that became the nation of Israel.

The command comes at the very start of the psalm, before any reason is given.

Obedient celebration comes first, and the reasons for it follow after.

🎤 Sing aloud means full, open joy

👪 God of Jacob names Israel's ancestor

📅 Celebration is commanded before reasons follow

📖 Joy in worship does not wait for explanation

## 🥁 Take A Psalm, And Bring Hither The Timbrel

A "psalm" here means a song set to instrumental accompaniment, not just spoken words.

The "timbrel" was a small hand held frame drum, similar to a tambourine.

It was often played by women while dancing, especially after a victory.

Miriam played one after the Red Sea crossing in the book of Exodus.

🎵 Psalm means a song set to music

🥁 Timbrel was a hand held frame drum

💃 It was often played during dancing

📖 Miriam used one after the Red Sea

## 🎻 The Pleasant Harp With The Psaltery

The "harp" was a stringed instrument often described as having a warm, pleasant tone.

The "psaltery" was a smaller stringed instrument, closer to a portable lyre.

Naming both together pictures a full band of strings joining the drum and voice.

Worship here uses every available instrument, not just the human voice.

🎻 Harp was a warm toned stringed instrument

🪕 Psaltery was a smaller, portable instrument

🎶 Together they picture a full band

📖 Worship uses every instrument available

## 🌙 Blow Up The Trumpet In The New Moon

The "new moon" marked the start of a new month on Israel's calendar.

The book of Numbers commands trumpets to be blown at the start of every month.

"Blow up" here means to sound a loud blast, not to destroy anything.

The trumpet announced that a sacred time had officially begun.

🌙 New moon marked a new month's start

🎺 Numbers commands this same trumpet blast

📢 Blow up means sound a loud blast

📖 The trumpet announced sacred time

## 📅 In The Time Appointed, On Our Solemn Feast Day

"The time appointed" points to a specific festival date already fixed on Israel's calendar.

Many scholars believe this "solemn feast day" was the Feast of Tabernacles.

That feast began at the full moon, two weeks after this new moon trumpet blast.

The new moon signal gave the nation time to prepare and travel to Jerusalem.

📅 Time appointed means a fixed festival date

🏕️ Many scholars link this to Tabernacles

🌕 That feast began two weeks later

📖 The trumpet gave time to prepare

## 📜 This Was A Statute For Israel, And A Law Of The God Of Jacob

A "statute" is a fixed, binding rule, not a suggestion or local custom.

Calling it "a law of the God of Jacob" roots that rule directly in God's own authority.

This explains why the whole nation kept the same festival together.

Worship here was covenant obedience, not personal preference.

📜 Statute means a fixed, binding rule

👑 It comes from God's own authority

🤝 The whole nation kept it together

📖 Worship was obedience, not preference

# Psalms 81:5-7
# ⛓️ This He Ordained In Joseph For A Testimony
---
## 👪 This He Ordained In Joseph For A Testimony

"Joseph" again stands for the whole nation, the same use seen earlier in the Psalms.

A "testimony" is a witness meant to remind people of something true, not just a memory.

This festival was set up specifically to keep the exodus story alive generation after generation.

Without a yearly reminder, that history could have quietly faded.

👪 Joseph again stands for the nation

📜 Testimony means a lasting witness

🔁 The festival kept the story alive

📖 Without it, the story could fade

## 🚪 When He Went Out Through The Land Of Egypt

"He went out" refers to Israel leaving Egypt during the exodus.

This links the festival being described directly back to that deliverance.

The trumpet and instruments already mentioned were not random celebration.

They specifically remembered one historical rescue.

🚪 He went out means the exodus event

🔗 It ties the feast to that history

🎺 The instruments were not random joy

📖 They remembered one specific rescue

## 🗣️ Where I Heard A Language That I Understood Not

The speaker shifts here, this line marks where God begins speaking in the first person.

From this point through the rest of the psalm, the words in quotes come directly from God.

"A language I understood not" recalls Israel hearing Egyptian, a foreign tongue tied to slavery.

That unfamiliar language marked the start of a hard chapter for the whole nation.

🗣️ The speaker shifts to God himself

📢 God now speaks in the first person

🇪🇬 Foreign language recalls Egyptian slavery

📖 It marked a hard chapter beginning

## 💪 I Removed His Shoulder From The Burden

"His shoulder" pictures the physical labor of carrying heavy loads under slavery.

"The burden" refers to the forced construction work Israel endured in Egypt.

Removing that weight pictures God personally lifting off a load Israel could not lift alone.

This turns a national memory into a personal, physical act of rescue.

💪 Shoulder pictures Egypt's hard labor

🧱 Burden means forced construction work

🙌 God pictures lifting the weight off

📖 Rescue becomes personal, physical relief

## 🧺 His Hands Were Delivered From The Pots

"The pots" likely refers to the baskets or clay vessels used in Egypt's brick making work.

Freed hands pictures relief from that specific, repetitive labor.

Naming both shoulder and hands covers the whole body's forced work.

Every part of Israel's labor is pictured as personally undone by God.

🧺 Pots likely means brick making tools

✋ Freed hands means labor relief

🦴 Shoulder and hands cover the whole body

📖 God undid all of that labor

## 📣 Thou Calledst In Trouble, And I Delivered Thee

"Calledst in trouble" pictures Israel crying out honestly during real distress.

"I delivered thee" answers that cry with a direct, personal rescue.

This same pattern of honest crying met with rescue repeats throughout Israel's history.

The psalm treats desperate prayer as something God actually answers.

📣 Calledst means crying out in distress

🛟 Delivered means a direct rescue

🔁 This pattern repeats often in Israel's story

📖 God treats desperate prayer seriously

## ⛈️ I Answered Thee In The Secret Place Of Thunder

"The secret place of thunder" likely points to Mount Sinai, hidden in thick cloud and thunder.

The book of Exodus describes God speaking from that same mountain in thunder and smoke.

"Secret" here means hidden from view, not private or unknown.

God's answer came wrapped in an overwhelming, awe filled presence.

⛈️ Secret place of thunder points to Sinai

🏔️ Exodus describes that same fearsome scene

👁️ Secret means hidden, not unknown

📖 God's answer came wrapped in awe

## 🧪 I Proved Thee At The Waters Of Meribah

"Proved" here means tested, not proved in the modern sense of demonstrating something true.

"Meribah" means strife, named for Israel's complaints about having no water.

Exodus and Numbers both record Israel testing God at that same place.

Testing worked both directions, Israel doubted God even after being rescued.

🧪 Proved means tested, not demonstrated

💧 Meribah means strife over water

🪨 Exodus and Numbers both record this place

📖 Israel tested God even after rescue

# Psalms 81:8-10
# 👂 Hear, O My People, And I Will Testify Unto Thee
---
## 👂 Hear, O My People, And I Will Testify Unto Thee

"Hear" is a direct command, not a casual suggestion.

"Testify" means God is about to state something solemn and binding, like a witness in court.

Pairing hearing with testifying shows this is a formal warning, not idle conversation.

Hearkening becomes the condition for everything God says next.

👂 Hear is a direct command

⚖️ Testify means a solemn, binding statement

📢 This is warning, not conversation

📖 Hearkening is the condition that follows

## ⛔ There Shall No Strange God Be In Thee

A "strange god" means any foreign deity worshipped in Israel's land.

This restates the first of the Ten Commandments given at Sinai.

"Be in thee" pictures a foreign god actually living inside the nation, not just nearby.

The warning targets what happens inside Israel, not just outside threats.

⛔ Strange god means any foreign deity

📜 This restates the first commandment

🏠 Be in thee pictures an inside threat

📖 The danger comes from within, not outside

## 🌍 Neither Shalt Thou Worship Any Strange God

This is not simply repeating the previous command a second time.

Ancient nations often worshipped several gods together without conflict.

This line closes off that loophole for Israel completely.

Worshipping other gods, even alongside the true one, was never permitted.

🔁 This closes a possible loophole

🌍 Other nations mixed many gods

🚫 Israel could not do the same

📖 Even mixed worship was never allowed

## 📛 I Am The LORD Thy God, Which Brought Thee Out Of The Land Of Egypt

God grounds this command in his own name and his past action.

"I am the LORD thy God" repeats the opening line of the Ten Commandments.

The reason to avoid other gods is the rescue already accomplished in Egypt.

Obedience is a response to what God did, not a bargain for future favor.

📛 This repeats the commandments' opening line

🚪 Egypt names the rescue already done

🤝 Obedience responds to what already happened

📖 It is not a bargain for the future

## 🐦 Open Thy Mouth Wide, And I Will Fill It

This pictures complete trust, the way a young bird opens wide for its parent.

Opening wide means asking for more than a small, cautious amount.

"I will fill it" promises abundant provision in return for that trust.

The image ties obedience directly to blessing, not punishment.

🐦 Open wide pictures a young bird feeding

🙌 It means asking for abundance, not caution

🍽️ God promises to fill what is opened

📖 Obedience connects to blessing here

# Psalms 81:11-16
# 💔 But My People Would Not Hearken To My Voice
---
## 🙉 But My People Would Not Hearken To My Voice

This verse reports what Israel actually did, not just what could have happened.

"Would not hearken" means a stubborn, ongoing refusal, not one missed moment.

"Israel would none of me" states the refusal even more bluntly, wanting nothing of God.

The warning from the verses just before had already gone unheeded.

🙉 Would not hearken means stubborn refusal

🚫 Would none of me means wanting nothing

⚠️ The earlier warning went unheeded

📖 This reports what actually happened

## 🙌 So I Gave Them Up Unto Their Own Hearts' Lust

"Gave them up" means God stepped back and allowed their own desires to lead them.

This is not God causing sin, it is God releasing them to what they already chose.

"Their own counsels" means human plans, made without seeking God's guidance.

The New Testament describes this same pattern when it names persistent rejection of God.

🙌 Gave them up means stepping back

🚶 God allowed their own desires to lead

🧠 Counsels means plans made without God

📖 The New Testament names this same pattern

## 😔 Oh That My People Had Hearkened Unto Me

"Oh that" expresses deep longing for something that did not happen.

This is not a threat, it is closer to open hearted grief.

God is pictured wishing for the very obedience Israel refused.

The tone here is sorrow, not simply anger at what was lost.

😔 Oh that expresses longing, not anger

💭 It names something that did not happen

❤️ God is pictured grieving the refusal

📖 The tone here is sorrow, not fury

## ⚔️ I Should Soon Have Subdued Their Enemies

"Should soon have subdued" describes a victory that could have come quickly.

This names a real cost, actual battles Israel still had to fight the hard way.

Obedience was directly tied to military protection in this picture.

The disobedience already described left that protection unclaimed.

⚔️ Subdued enemies means quick victory

⏱️ Soon means this could have come fast

🛡️ Obedience was tied to protection

📖 That protection went unclaimed

## 😠 The Haters Of The LORD Should Have Submitted Themselves Unto Him

"Haters of the LORD" names the enemy nations opposed to Israel's God.

"Submitted themselves" pictures forced, humbled surrender, not willing worship.

"Their time should have endured for ever" likely describes Israel's own security lasting forever.

Israel's safety and its enemies' defeat are pictured as tied together.

😠 Haters of the LORD means enemy nations

🙇 Submitted means forced, humbled surrender

♾️ Their time may mean Israel's own security

📖 Safety and defeat are pictured together

## 🌾 He Should Have Fed Them Also With The Finest Of The Wheat

"Finest of the wheat" names the very best portion of the grain harvest.

This pictures generous provision, not bare survival rations.

The promise moves from military safety to everyday, physical abundance.

Both protection and provision were available through simple obedience.

🌾 Finest wheat means the harvest's best

🍞 It pictures abundance, not survival

🛡️ The promise moves from safety to food

📖 Both were available through obedience

## 🐝 With Honey Out Of The Rock Should I Have Satisfied Thee

Wild bees often built hives inside cracks and crevices in desert rock.

"Honey out of the rock" pictures unexpected sweetness from a hard, unlikely place.

This echoes the promised land described elsewhere as flowing with milk and honey.

The psalm closes describing exactly the blessing Israel's refusal had cost them.

🐝 Wild honey was found inside rock crevices

🍯 It pictures sweetness from a hard place

🌍 It echoes the promised land's description

📖 The psalm closes naming what was lost`.trim();

export const PSALMS_EIGHTY_ONE_PERSONAL_SECTIONS = parsePsalmsEightyOneRawNotes(PSALMS_EIGHTY_ONE_RAW_NOTES);
