export type JeremiahFortyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahFortyRawNotes(rawText: string): JeremiahFortyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahFortyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+40:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 40 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+40:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+40:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 40 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 40,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 40:${startVerse}` : `Jeremiah 40:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Jeremiah 40 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_FORTY_RAW_NOTES = `# Jeremiah 40:1-3
# ⛓️ Nebuzaradan Releases Jeremiah
---
## ⛓️ Nebuzaradan The Captain Of The Guard

Nebuzaradan commanded Babylon's whole army under King Nebuchadnezzar.

"Captain of the guard" means he commanded the king's own bodyguard and prisoners.

He is the same officer who already destroyed the temple back in chapter thirty nine.

Ramah sat a few miles north of Jerusalem.

It was the gathering point where captives were sorted before the walk to Babylon.

Jeremiah had been swept into that line along with everyone else.

Even God's own prophet did not escape the chains of judgment.

⚔️ Nebuzaradan commanded Babylon's army

🏰 Captain of the guard oversaw prisoners

📜 He already destroyed the temple

📖 Even Jeremiah was swept into the chains

## 🔗 Being Bound In Chains Among All That Were Carried Away Captive

Chapter thirty nine already said Jeremiah was released straight to Gedaliah, unharmed.

Here he shows up bound in chains at Ramah instead.

He is swept in with the larger group of unnamed captives.

Many scholars believe these are two tellings of the same events, not two separate stories.

The second telling simply fills in a detail the first skipped.

God's promise to protect him never actually broke.

📜 Chapter thirty nine promised him safety

⛓️ Chains at Ramah tell a fuller version

🔀 Two tellings, not two separate stories

📖 God's promise never actually broke

## ⚖️ The LORD Thy God Hath Pronounced This Evil Upon This Place

These words come out of a Babylonian officer's mouth, not a Hebrew prophet's.

Nebuzaradan serves Nebuchadnezzar and worships Babylon's gods, not the LORD.

Yet he names Judah's God correctly and repeats what Jeremiah had preached for forty years.

An outsider ends up stating Judah's own guilt more plainly than Judah ever did.

Truth came from an unexpected voice.

🗣️ A Babylonian officer speaks, not a prophet

🙏 Nebuzaradan worships Babylon's gods

🎯 He names the LORD's judgment correctly

📖 Truth came from an unexpected voice

## 🔥 Because Ye Have Sinned Against The LORD

Nebuzaradan is not guessing at a cause.

He explains the destruction as a direct result of sin, not bad luck or weak armies.

"Obeyed his voice" means Judah heard the LORD's commands through the prophets and ignored them anyway.

Jeremiah had warned this exact message for decades starting back in chapter one.

This collapse was predicted, not random.

❌ Not bad luck, but real sin

👂 Obeying his voice means heeding the prophets

📆 Jeremiah warned this for decades

📖 This collapse was predicted, not random

# Jeremiah 40:4-6
# 🧭 Jeremiah Chooses Home Over Babylon
---
## 🔓 I Loose Thee This Day From The Chains

"Loose" means to untie or set free.

Nebuzaradan personally removes the chains from Jeremiah's hands.

This is an official, formal release, not a quiet favor done in secret.

The same Babylon that destroyed Jerusalem now hands its most prominent prisoner his freedom.

Jeremiah walks away from this moment a completely free man.

🔓 Loose means to untie and free

✋ Nebuzaradan removes the chains himself

📜 This release is official, not secret

📖 Babylon frees the prophet it once chained

## 🏙️ If It Seem Good Unto Thee To Come With Me Into Babylon

Nebuzaradan offers Jeremiah an easy life in Babylon.

"I will look well unto thee" means Jeremiah would receive real care and provision there.

Judah lay in ruins at this point.

Babylon was the strongest empire in the world.

Staying home would mean starting over with nothing but risk.

🏙️ Babylon offered comfort and safety

🤲 Nebuzaradan promises real care there

💔 Judah lay in ruins

➡️ The easier path was right there waiting

## 🗺️ Behold, All The Land Is Before Thee

Nebuzaradan does not force Jeremiah either way.

Jeremiah could go to Babylon, stay in Judah, or go wherever else seemed good to him.

This kind of total freedom was rare for a conquered nation's leading voice.

Forcing Jeremiah would make a mockery of his own message.

Jeremiah's choice here reveals what he truly values.

🆓 No one is forcing Jeremiah's decision

🧭 He could choose Babylon or Judah

👑 Rare freedom for a conquered people's prophet

📖 His choice reveals what he truly values

## 🏛️ Go Back Also To Gedaliah The Son Of Ahikam

Gedaliah's father Ahikam once protected Jeremiah from execution back in chapter twenty six.

His grandfather Shaphan was the scribe who read the lost Book of the Law to King Josiah.

This family had stood on the side of reform and obedience for two generations already.

The king of Babylon chose Gedaliah to govern what remained of Judah.

A friendly, familiar family now holds real political power.

👨‍👦 Ahikam once saved Jeremiah's life

📜 Shaphan read the Law to Josiah

🏛️ Babylon appointed Gedaliah governor over Judah

📖 A friendly family now held real power

## 🎁 Gave Him Victuals And A Reward

"Victuals" means food supplies for the road ahead.

Nebuzaradan also gives Jeremiah a reward, likely money or valuable goods.

This is remarkable treatment for a man who had just survived a dungeon and a siege.

The same empire that burned Jerusalem sends its prophet off provided for.

Jeremiah does not leave empty handed.

🍞 Victuals means supplies for the journey

💰 Nebuzaradan adds a reward too

⛓️ Remarkable after a dungeon and a siege

📖 Jeremiah leaves provided for, not empty handed

## 🧭 Then Went Jeremiah Unto Gedaliah... To Mizpah

Jeremiah had every reason to go to Babylon and live comfortably.

Instead he chooses to stay among the poorest survivors left in a ruined land.

Mizpah sat a few miles north of Jerusalem.

It became the new, temporary center of what was left of Judah.

Jeremiah's whole life had been spent loving a people who mostly rejected his message.

He is not finished with them yet.

🚶 Jeremiah chooses hardship over comfort

📍 Mizpah becomes Judah's temporary center

💔 He stays with the people, not Babylon

📖 His love for them was not finished

# Jeremiah 40:7-10
# 🤝 Gedaliah Gathers The Survivors
---
## 🏕️ All The Captains Of The Forces Which Were In The Fields

These were Judean military officers who never formally surrendered to Babylon.

They had scattered into the countryside rather than die defending a city that was already falling.

Babylon left them alone once the main war was over.

Gedaliah's new government also took responsibility for women, children, and the poorest survivors.

An entire broken nation starts regathering itself around one appointed leader.

⚔️ Officers scattered instead of surrendering

🌾 They hid out in the open countryside

👶 Gedaliah also cared for women and children

📖 A broken nation begins regathering itself

## ⚠️ Even Ishmael The Son Of Nethaniah

This is the first time this chapter names Ishmael directly.

He came from the royal line of Judah, a descendant of King David's family.

Nothing here hints yet at what he is about to do.

The next chapter shows him murdering Gedaliah and everyone with him at this very table.

Scripture often introduces its villains quietly, long before the moment they strike.

📛 Ishmael is named for the first time

👑 He came from David's royal line

🗡️ He later murders Gedaliah himself

📖 Villains often enter the story quietly

## 🕊️ Fear Not To Serve The Chaldeans

"Chaldeans" is another name for the Babylonians.

Gedaliah swears a formal oath to guarantee the people's safety.

An oath in this culture was a binding, public promise backed by God's own name.

Serving Babylon was not betrayal here.

It was simply survival, exactly what God's prophets had already told them to accept.

Peace remained possible even after total defeat.

🏴 Chaldeans is another name for Babylon

🤝 Gedaliah swears a formal, binding oath

🙏 Serving Babylon was survival, not betrayal

📖 Peace remained possible after defeat

## 🌾 Gather Ye Wine, And Summer Fruits, And Oil

Gedaliah gives practical, immediate instructions, not just comforting words.

Wine, fruit, and olive oil were the normal harvest of the land around Judah.

"Summer fruits" means figs, grapes, and other fruit gathered late in the growing season.

Rebuilding a shattered nation starts with ordinary work like harvesting a field.

Daily life quietly begins again in the middle of national disaster.

🍇 Wine, fruit, and oil were everyday goods

🍈 Summer fruits means figs and grapes

🌾 Rebuilding started with ordinary farm work

📖 Daily life begins again after disaster

# Jeremiah 40:11-12
# 🏡 Refugees Come Home
---
## 🧳 The Jews That Were In Moab, And Among The Ammonites, And In Edom

Moab, Ammon, and Edom were neighboring kingdoms east and south of Judah.

Many Judeans had fled there earlier to escape Babylon's invasion.

News of a surviving, governed remnant back home reaches them even in exile.

Gedaliah's appointment becomes the signal that it is finally safe to come home.

Hope traveled faster than anyone expected after such total destruction.

🗺️ Moab, Ammon, and Edom bordered Judah

🏃 Refugees had fled there from the invasion

📰 News of Gedaliah reaches them in exile

📖 Hope traveled fast after the destruction

## 🍯 Gathered Wine And Summer Fruits Very Much

Refugees stream back into Judah from every direction at once.

The exact phrase from verse ten, wine and summer fruits, shows up again here.

What Gedaliah commanded in words is now actually happening in the fields.

"Very much" signals a genuinely large harvest, not a bare survival crop.

A ruined land is producing abundance again within the very same chapter.

🏠 Refugees return from every direction

🔁 The same harvest instruction is now fulfilled

🍇 Very much means a truly large harvest

📖 Abundance returns fast to a ruined land

# Jeremiah 40:13-16
# ⚠️ The Warning Gedaliah Refused
---
## 🐍 Baalis The King Of The Ammonites Hath Sent Ishmael

Baalis ruled Ammon, one of the neighboring kingdoms named back in verse eleven.

He had political reasons to want Judah weak and divided, not peacefully rebuilding.

Ishmael, already identified back in verse eight as a royal descendant, becomes his weapon.

Johanan and the other captains bring Gedaliah a direct, specific warning.

An outside king is working to undo everything verse ten just finished rebuilding.

👑 Baalis ruled neighboring Ammon

🎯 He wanted Judah weak, not rebuilt

🗡️ Ishmael becomes his chosen weapon

📖 One king works to undo another's rebuilding

## 😔 Gedaliah The Son Of Ahikam Believed Them Not

Gedaliah dismisses a specific, named warning from his own military captains.

He had already shown himself to be fair and trusting back in verse nine.

That same trust now becomes a dangerous blind spot.

The very next chapter proves the warning was completely true.

Good character is not the same thing as good judgment.

🙅 Gedaliah dismisses a specific warning

🤝 Gedaliah already trusted too easily

⚠️ That trust becomes a blind spot

📖 Kindness is not the same as judgment

## 🗡️ Let Me Go, I Pray Thee, And I Will Slay Ishmael

Johanan offers to quietly kill Ishmael before Ishmael can strike first.

"No man shall know it" means the killing would happen in total secrecy.

Johanan's reasoning is simple.

One quiet death now could prevent many deaths later.

This is the last chance to stop the disaster before it happens.

🤫 Johanan offers a secret killing

🛡️ The goal was protecting the whole remnant

⏳ The last chance to stop it

📖 One choice could have prevented a disaster

## ⚖️ Thou Shalt Not Do This Thing

Gedaliah refuses Johanan's offer outright.

He accuses Johanan of lying about Ishmael instead of thanking him for the warning.

This is the last decision Gedaliah ever makes in scripture.

Chapter forty one opens with Ishmael doing exactly what Johanan said he would do.

Refusing good counsel can cost everything, even for a genuinely good man.

🚫 Gedaliah refuses the offer outright

😡 He accuses Johanan of lying instead

⌛ This is Gedaliah's last decision in scripture

📖 Refusing good counsel can cost everything
`.trim();

export const JEREMIAH_FORTY_PERSONAL_SECTIONS = parseJeremiahFortyRawNotes(JEREMIAH_FORTY_RAW_NOTES);
