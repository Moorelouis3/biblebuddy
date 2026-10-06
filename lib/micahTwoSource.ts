export type MicahTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMicahTwoRawNotes(rawText: string): MicahTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MicahTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Micah\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Micah 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Micah\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Micah\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Micah 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Micah 2:${startVerse}` : `Micah 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Micah 2 sections, received " + sections.length);
  }

  return sections;
}

const MICAH_TWO_RAW_NOTES = `# Micah 2:1-5
# 💰 Stealing Fields And Homes
---
## 😔 Woe To Them That Devise Iniquity

"Woe" is a word of warning, not just sadness.

Prophets used it to open a formal announcement of coming judgment.

"Devise" means these people plan their sin ahead of time.

This is not a sudden mistake.

It is a calculated plot.

😔 Woe opens a warning of judgment

🧠 Devise means planned ahead

📝 This sin is calculated, not sudden

📖 God names premeditated evil first

## 🛏️ They Work Evil Upon Their Beds

The bed here pictures the quiet of nighttime, not sleep itself.

These leaders lie awake plotting harm instead of resting.

Planning sin at night shows how deliberate this evil really is.

Darkness becomes the workshop for the next day's wrongdoing.

🛏️ Beds picture quiet nighttime scheming

🌙 They plot instead of resting

🔧 Night becomes a workshop for sin

📖 Deliberate evil, not sudden sin

## ☀️ When The Morning Is Light, They Practise It

These men do not wait or hesitate once daylight comes.

"Practise" here means to carry out the plan, to actually do it.

They move the instant they have the chance to act.

Having power in their hand means no one can stop them.

☀️ Morning light starts the action

🏃 Practise means carry out the plan

✊ Power in hand meets no resistance

📖 Nothing slows down this sin

## 🌾 They Covet Fields, And Take Them By Violence

"Covet" means wanting something badly enough to take it wrongly.

Fields were not just property.

They were a family's whole livelihood.

Taking a field by violence meant using force to simply seize it.

🌾 Covet means wanting it wrongly

🏡 A field was a family's livelihood

✊ Violence seized what wanting could not

📖 Wanting became outright theft

## 🏠 They Oppress A Man And His House, Even A Man And His Heritage

"Heritage" means the land passed down inside one family for generations.

Under God's law, this land was never supposed to leave that family permanently.

Taking someone's heritage erased their place in Israel's whole inheritance system.

This was not a small theft.

It broke apart God's design for the land.

🏠 Heritage means land passed down

📜 God's law protected family land

🧩 Losing it erased their place

📖 This broke God's design for land

## ⚖️ Against This Family Do I Devise An Evil

God answers their plotting with his own plotting.

The same word "devise" used against the people in verse one now describes God's own plan.

Whatever evil they planned against others, God now plans to answer in kind.

No one escapes justice simply because they thought of the plan first.

⚖️ God devises an answer too

🔁 The same word turns back on them

🧑‍⚖️ Planned sin meets planned judgment

📖 No one outplots God

## ⛓️ Ye Shall Not Remove Your Necks

This pictures an ox that cannot slip out of its yoke.

A yoke was a heavy wooden frame locked around an animal's neck for work.

These people will not be able to wriggle free from the judgment coming.

What they did to others with force will now hold them fast.

⛓️ Necks locked like an ox's yoke

🐂 A yoke forced constant labor

🔒 No wriggling free this time

📖 Their own force returns on them

## 🚶 Neither Shall Ye Go Haughtily

"Haughtily" means walking with proud, superior confidence.

These leaders once strutted through town secure in their stolen wealth.

That proud walk will not survive the judgment God just announced.

Pride always looks strongest right before it gets humbled.

🚶 Haughtily means proud confident walking

💰 Stolen wealth once fueled their pride

📉 That pride is about to fall

📖 Pride breaks right before judgment

## 📜 One Shall Take Up A Parable Against You

A "parable" here is not a gentle teaching story.

It means a mocking taunt song sung about someone's downfall.

Enemies and neighbors will sing this song once judgment lands.

The very people who once feared them will now mock them.

📜 Parable means a mocking taunt

🎵 It became a song about their fall

😏 Former fear turns into mockery

📖 The powerful became a punchline

## 🌾 He Hath Changed The Portion Of My People

"Portion" means the specific plot of land each family was given.

That land was supposed to stay inside the family forever.

Now it has been handed over to someone else entirely.

Losing a portion meant losing an identity tied to that ground.

🌾 Portion means a family's own land

🔄 It changed hands to someone else

🪪 Land was tied to identity

📖 Their inheritance is now gone

## 🪢 None That Shall Cast A Cord By Lot

Casting a cord by lot was how Israel's land was first divided under Joshua.

A measuring cord decided exactly which family received which plot.

This verse says that process will simply stop happening for these people.

There is no land left to measure out or inherit anymore.

🪢 A cord measured out the land

📏 Joshua used this method first

🚫 The process stops for them

📖 No land is left to inherit
# Micah 2:6-11
# 🤐 Silencing The Prophets
---
## 🤐 Prophesy Ye Not, Say They To Them That Prophesy

The people are not asking Micah a question here.

They are commanding him and other true prophets to stop speaking.

Hearing hard truth made them want to silence the messenger instead of listening.

Shutting down the warning never actually stops the danger it describes.

🤐 They command the prophets to stop

👂 Hard truth made them want silence

🙈 The messenger gets blamed, not the sin

📖 Silence never removes the danger

## 😳 They Shall Not Prophesy To Them, That They Shall Not Take Shame

"Take shame" means being publicly exposed and embarrassed by the truth.

These people want comfort, not correction, from anyone claiming to speak for God.

Refusing to hear a hard word does not erase the sin underneath it.

A warning avoided is still a warning that eventually comes true.

😳 Take shame means public exposure

🙉 They want comfort, not correction

🚫 Avoiding a warning does not erase sin

📖 Ignored warnings still come true

## 🏛️ O Thou That Art Named The House Of Jacob

"House of Jacob" is another name for the whole nation of Israel.

Jacob was renamed Israel generations earlier.

His family became the whole nation descended from him.

This is not a stranger's accusation.

It comes from inside the family.

🏛️ House of Jacob means all Israel

👤 Jacob was renamed Israel long before

👨‍👩‍👧 One family became a whole nation

📖 This warning comes from inside the family

## ❓ Is The Spirit Of The LORD Straitened?

"Straitened" means limited, shortened, or running low on patience.

The people act as if God himself has suddenly become impatient.

This question pushes back on the idea that God changed.

God's character has not shifted.

Their own behavior has.

❓ Straitened means running out of patience

😠 They blame God for feeling harsh

🔄 The question flips the real problem

📖 God did not change, they did

## 💬 Do Not My Words Do Good To Him That Walketh Uprightly?

God's words were never meant to feel like a burden.

For someone actually walking uprightly, those same words bring comfort and good.

The warning only feels harsh to people living against it.

A hard word and a good word can come from the very same mouth.

💬 God's words are meant for good

🙏 Uprightly means living in line with God

😣 Only sin makes the words feel harsh

📖 Same words, different reactions

## 😡 My People Is Risen Up As An Enemy

This is one of the sharpest lines in the whole chapter.

God calls his own covenant people an enemy, a word usually saved for outsiders.

They are not just failing to help each other anymore.

They are actively working against their own neighbors like attackers would.

😡 Enemy is usually a word for outsiders

💔 God's own people now fit it

🤝 Neighbors stopped helping each other

📖 They act like attackers, not family

## 🧥 Ye Pull Off The Robe With The Garment From Them That Pass By Securely

Stripping someone's robe in public left them exposed and humiliated.

These victims were simply passing by peacefully, expecting no trouble at all.

"Averse from war" means these people were not soldiers or enemies at all.

Robbing an unsuspecting traveler is a very different crime than taking spoils in battle.

🧥 Robes were stripped off in public

🚶 Victims were peaceful travelers, not soldiers

⚔️ Averse from war means not enemies

📖 This was robbery, not warfare

## 🚪 The Women Of My People Have Ye Cast Out From Their Pleasant Houses

These women were likely widows who depended on a family home for safety.

Casting them out left them without shelter or protection in a harsh world.

"Pleasant houses" shows these were not shacks.

They were real family homes.

Taking a widow's home was taking away her only remaining security.

🚪 Likely widows lost their homes

🏠 Pleasant houses means real family homes

🛡️ A home was a widow's safety

📖 Their only security was taken

## 👶 From Their Children Have Ye Taken Away My Glory For Ever

"My glory" here refers to the blessing and inheritance God intended for these children.

Taking land or homes from children robbed them of a future, not just property.

God calls that inheritance his own glory, not simply the family's.

Stealing a child's future is treated here as stealing from God himself.

👶 Glory means the children's future blessing

🏡 Stolen land stole their future too

👑 God calls that inheritance his own

📖 Robbing children means robbing God

## 🚶 Arise Ye, And Depart, For This Is Not Your Rest

God tells the people to get up and leave the land they are standing on.

"Rest" here means the settled, secure home God originally gave Israel.

Their own sin has made that rest impossible to keep enjoying.

The land itself cannot stay peaceful once it has been treated this way.

🚶 God tells them to leave

🏡 Rest means a secure settled home

💔 Sin made rest impossible to keep

📖 A sinful land cannot stay peaceful

## ☣️ Because It Is Polluted, It Shall Destroy You

"Polluted" here means the land itself became spiritually defiled by the people's sin.

Under God's law, persistent sin was pictured as contaminating the ground itself.

A defiled land could no longer safely hold the people living on it.

Destruction here is described almost like a natural result, not just a punishment.

☣️ Polluted means spiritually defiled ground

📜 Sin was pictured as contaminating land

⚠️ A defiled land cannot safely hold them

📖 Destruction follows like a natural result

## 🤥 If A Man Walking In The Spirit And Falsehood Do Lie

This describes a false prophet claiming to speak by God's own spirit.

"Falsehood" shows the claim was fake from the very start, not just mistaken.

Claiming spiritual authority does not make a lie into truth.

The real test is whether the message lines up with God's actual character.

🤥 A false prophet claims God's spirit

🎭 Falsehood means the claim was fake

🚫 Spiritual claims do not excuse lies

📖 Truth is tested by God's character

## 🍷 He Shall Even Be The Prophet Of This People

This line drips with irony rather than approval.

The people preferred a prophet who promised them wine and strong drink.

A comfortable lie sounded better to them than Micah's hard truth.

People often choose the voice that tells them what they want to hear.

🍷 Wine and drink made the lie appealing

😌 Comfort beat hard truth for them

🙉 They chose what they wanted to hear

📖 Popularity is not the same as truth
# Micah 2:12-13
# 🐑 A Promise To Gather The Remnant
---
## 🐑 I Will Surely Assemble, O Jacob, All Of Thee

The tone flips completely from judgment to promise in this verse.

God switches from scattering the people to gathering them back together.

"Assemble" pictures a shepherd calling scattered sheep back into one flock.

Judgment was never God's final word for his people.

🐑 The tone flips to promise here

🔄 God moves from scattering to gathering

📣 Assemble means calling the flock back

📖 Judgment was not God's final word

## 🌾 I Will Surely Gather The Remnant Of Israel

"Remnant" means the smaller group that survives a larger disaster.

Not everyone will be lost, even after everything Micah has warned about.

God promises to personally gather whoever is left after judgment passes.

A remnant proves the covenant family line will continue.

🌾 Remnant means those who survive

👥 Not everyone will be lost

🤲 God personally gathers the survivors

📖 The covenant line continues

## 🐏 As The Sheep Of Bozrah

Bozrah was a region known for raising large, thriving flocks of sheep.

Comparing the people to sheep of Bozrah pictures safety, abundance, and numbers.

This is the opposite picture of scattered, defenseless sheep without a shepherd.

God promises a full, secure flock, not a handful of survivors.

🐏 Bozrah was known for thriving flocks

🔢 It pictures safety and numbers

🛡️ The opposite of defenseless sheep

📖 God promises a full secure flock

## 🚪 The Breaker Is Come Up Before Them

"The breaker" pictures someone who breaks open a path for the whole flock.

Shepherds would break down a wall or fence to let sheep move freely.

This figure leads the way out of confinement and danger first.

God himself goes ahead of his people, not behind them.

🚪 The breaker opens the way out

🐑 Shepherds broke paths for the flock

🏃 This leader goes first, not last

📖 God leads ahead of his people

## 👑 Their King Shall Pass Before Them, And The LORD On The Head Of Them

This king is not a human ruler like the ones Israel already had.

The verse names the LORD himself as the one leading at the very front.

"On the head of them" means out in front, leading the whole procession.

The chapter that opened with God as judge closes with God as shepherd king.

👑 This king is the LORD himself

🚶 Head of them means leading in front

⚖️ The judge of chapter two becomes shepherd

📖 God leads his people home
`.trim();

export const MICAH_TWO_PERSONAL_SECTIONS = parseMicahTwoRawNotes(MICAH_TWO_RAW_NOTES);
