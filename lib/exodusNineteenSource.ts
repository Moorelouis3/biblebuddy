export type ExodusNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusNineteenRawNotes(rawText: string): ExodusNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 19:${startVerse}` : `Exodus 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 19 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_NINETEEN_RAW_NOTES = `# Exodus 19:1-2
# ⛰️ Israel Arrives At Sinai
---
## 📅 In The Third Month

The third month is counted from the exodus, not the regular calendar year.

That places Israel at Sinai about seven weeks after the first Passover.

Many scholars believe this exact timing shaped the later feast of Pentecost.

Pentecost was celebrated fifty days after Passover every year.

This was not a random stop along the way.

God brought Israel to this mountain on His own calendar.

📅 Third month counts from the exodus

⏳ About seven weeks after Passover

🎉 Later shaped the feast of Pentecost

📖 God moved Israel on His own calendar

## ⛰️ Israel Camped Before The Mount

This is the exact mountain where Moses first met God at the burning bush.

Exodus chapter three already told that story in detail.

Israel has now reached the very place where this all began.

The journey out of Egypt was always aimed at this mountain.

What started as a rescue was always meant to lead here.

⛰️ Same mountain as the burning bush

🔥 Moses met God there in chapter three

🧭 The whole journey aimed at this place

📖 Rescue was always meant to lead somewhere

# Exodus 19:3-6
# 🦅 God's Covenant Proposal
---
## 👁️ Ye Have Seen What I Did Unto The Egyptians

God begins by pointing back to what Israel already witnessed firsthand.

This is not a new claim that needs proving.

The ten plagues and the parted sea happened in front of the whole nation.

God grounds the coming covenant in something Israel already experienced.

Obedience is asked for on the basis of trust already earned.

👁️ Israel already witnessed these events directly

🌊 The plagues and the sea were public

🤝 Trust here was earned, not assumed

📖 God builds the covenant on real history

## 🦅 I Bare You On Eagles' Wings

The word bare means carried, the same way an eagle carries its young.

Picture an eagle catching a falling chick on its own wings in the air.

That is the strength and protection behind this one image.

The exodus was never distant management from far away.

It was personal rescue, carried out one wing beat at a time.

🦅 Bare means carried, like an eagle

🐣 Pictures an eagle catching a falling chick

💪 Strength and protection combined in one image

📖 The exodus was personal rescue, not distant control

## 💎 Ye Shall Be A Peculiar Treasure Unto Me

Peculiar does not mean strange or odd, the way it sounds today.

It means specially chosen, set apart for God alone.

The word describes something a king would keep for his own personal use.

This offer came with a condition attached in the line just before it.

Obedience was the doorway into this relationship, not a guarantee without it.

💎 Peculiar means specially chosen, not strange

👑 Language a king used for a personal treasure

⚖️ This offer was tied to obedience

📖 Relationship here was offered, not automatic

## 👑 A Kingdom Of Priests, And An Holy Nation

A priest in this culture stood between God and the people.

God now gives that same role to the whole nation of Israel.

Israel was meant to represent God to every other nation on earth.

The New Testament later echoes this same language for all believers.

One family's calling was never meant to stay private.

🙏 Priests stood between God and people

🌍 Israel would represent God to other nations

📜 Echoed later for believers in the New Testament

📖 God's calling was never meant to stay private

# Exodus 19:7-9
# 🙌 The People Agree
---
## 🙌 All That The LORD Hath Spoken We Will Do

The people answer as one voice, with total agreement.

No one asks a question or raises an objection here.

This same united people will break this exact promise within weeks.

Chapter thirty two shows exactly how fast that confidence failed.

Quick agreement is not the same thing as lasting faithfulness.

🙌 The people agree with one voice

❓ No objection is raised here

🐄 Chapter thirty two breaks this promise

📖 Quick agreement is not lasting faithfulness

## 🔁 Moses Returned The Words Of The People Unto The LORD

Moses carries messages in both directions throughout this chapter.

He takes God's words down the mountain to the people.

Then he takes the people's answer back up to God.

This back and forth defines his whole role at Sinai.

Moses stands in the middle so the people never have to.

🔼 Moses carries God's words down

🔽 Moses carries the people's answer up

🔁 Back and forth defines his role

📖 Moses stands between God and the people

## ☁️ In A Thick Cloud, That The People May Hear ... And Believe Thee For Ever

God explains His own reason for the coming display of thunder and fire.

The goal was never to frighten Israel for its own sake.

It was to prove to everyone that Moses truly speaks for God.

That proof needed to last far beyond this one dramatic morning.

Moses would go on leading this nation for forty more years.

☁️ God announces His coming in a cloud

🎯 The purpose is proving Moses speaks truth

⏳ This trust needed to last for years

📖 One dramatic day secured decades of leadership

# Exodus 19:10-13
# 🚧 Boundaries And Preparation
---
## 🧼 Sanctify Them To Day And To Morrow

Sanctify means to set apart as holy, made ready for God's presence.

This was never a private, personal choice for each person to make alone.

Moses gave the whole camp two full days to prepare together.

Meeting with God was treated as an event worth real preparation.

Nothing about approaching God here was casual or rushed.

🧼 Sanctify means set apart as holy

📆 Two full days were given to prepare

👥 The whole camp prepared together

📖 Meeting God was never treated casually

## 👕 Let Them Wash Their Clothes

Washing clothes here was not really about ordinary cleanliness.

It was an outward sign of an inward readiness.

Think of putting on your best clothes before an important meeting.

The clean clothes said something words alone could not say.

The outside was made to match what needed to happen on the inside.

👕 Clean clothes were an outward sign

🪞 The real point was inward readiness

🎽 Like dressing carefully for an important meeting

📖 Outside preparation pointed to inside change

## 🚫 Whosoever Toucheth The Mount Shall Be Surely Put To Death

This boundary sounds harsh to modern ears.

It was meant to teach something true about God's holiness.

God's presence was not safe to approach carelessly.

The strict penalty matched the seriousness of what was happening.

Reverence here was taught through real consequence, not a gentle suggestion.

🚫 Touching the mount carried a death penalty

⚡ The penalty matched the weight of God's presence

🧠 This was not casual accessibility

📖 Reverence was taught through real consequence

## 🎺 When The Trumpet Soundeth Long, They Shall Come Up To The Mount

A trumpet blast would signal exactly when it became safe to approach.

The boundary was not permanent or left unexplained.

It had a clear start and a clear end.

God set the terms, and God alone would announce when they changed.

Even a strict rule here came with a way through it.

🎺 A trumpet signal marked the safe moment

⏱️ The boundary was temporary, not permanent

📢 God controlled when the terms changed

📖 Even strict rules came with a way through

# Exodus 19:14-15
# 🧼 Moses Prepares The People
---
## 🔽 Moses Went Down From The Mount Unto The People, And Sanctified The People

Moses moves constantly between the mountain and the camp in this chapter.

He carries out God's instructions personally instead of handing them off.

This trip down the mountain is at least his third one so far.

Every instruction from God reached the people through Moses directly.

Nothing about this covenant skipped the mediator God had chosen.

🔽 Moses goes down the mountain again

🚶 He carries out instructions personally

🔢 At least his third trip so far

📖 Every instruction passed through Moses himself

## 🚫 Come Not At Your Wives

This instruction called for temporary distance between husbands and wives.

It was not a judgment against marriage itself.

It was part of a wider pattern of focused preparation before meeting God.

Every normal routine paused for these two days.

Total attention was placed on what was about to happen.

🚫 A temporary instruction, not a judgment on marriage

⏸️ Normal routines paused for two days

🎯 Total focus aimed at meeting God

📖 Preparation touched every part of daily life

# Exodus 19:16-19
# ⚡ God Descends In Fire And Smoke
---
## ⚡ Thunders And Lightnings, And A Thick Cloud Upon The Mount

This moment is often called a theophany, a visible appearance of God.

Thunder, lightning, and a thick cloud all arrive together, not one at a time.

Every sense in the camp was overwhelmed at once.

God was making sure no one could miss what was happening.

This was not a quiet, private encounter.

⚡ A theophany means a visible appearance of God

👂 Thunder, lightning, and cloud arrived together

😳 Every sense in the camp was overwhelmed

📖 No one in the camp could miss this

## 🎺 The Voice Of The Trumpet Exceeding Loud

No human trumpeter stood anywhere on the mountain that day.

Verse nineteen says the sound kept waxing louder and louder.

That growing volume made the whole moment feel alive, not staged.

The people trembled in the camp, and the text says so plainly.

Fear here was the honest, natural response to something this real.

🎺 No human trumpeter stood on the mountain

📈 The sound grew louder as it continued

😨 The people trembled in the camp

📖 Fear was the honest response here

## 🔥 Mount Sinai Was Altogether On A Smoke ... As The Smoke Of A Furnace

The mountain itself looked as though it were on fire.

The text compares the smoke directly to a furnace.

Think of watching thick smoke pour from a blacksmith's forge.

That was an image the ancient audience already knew well.

God chose a comparison His people could picture right away.

🔥 The mountain looked like it was burning

⚒️ Compared directly to a blacksmith's furnace

👀 A picture the ancient audience already knew

📖 God used imagery His people could instantly picture

## 🌍 The Whole Mount Quaked Greatly

The ground itself trembled under the weight of God's presence.

This was not only a display of sound and light.

Creation itself responded physically to its Creator's arrival.

Nothing at Sinai that day was symbolic only.

The mountain answered God the way the sea and the plagues once did.

🌍 The ground itself trembled

🎇 More than only sound and light

🌱 Creation responded to its Creator

📖 Nothing that day was symbolic only

# Exodus 19:20-22
# 👥 Moses Called Up The Mountain
---
## ⛰️ The LORD Called Moses Up To The Top Of The Mount

Moses alone climbs all the way to the summit.

Everyone else stays at the base under the boundary already set.

This is the closest access anyone receives in the whole chapter.

Being singled out here comes with responsibility, not just honor.

Moses now carries what he hears back down to a whole nation.

⛰️ Moses alone reaches the summit

👥 Everyone else stays at the base

🎖️ The closest access in this chapter

📖 Access came with responsibility, not just honor

## 👀 Charge The People, Lest They Break Through Unto The LORD To Gaze

God is worried about ordinary curiosity here, not open defiance.

Some in the camp might simply want a closer look.

That impulse alone was dangerous enough to cause real harm.

God sends Moses back down to repeat a warning already given.

Even a well meaning curiosity still needed a clear boundary.

👀 God is concerned about curiosity, not defiance

⚠️ A closer look could still cause real harm

🔁 Moses repeats a warning already given

📖 Even innocent curiosity needed a clear boundary

## 🙏 Let The Priests Also ... Sanctify Themselves, Lest The LORD Break Forth Upon Them

Priests already held a role closer to God than ordinary Israelites.

That closer role did not excuse them from preparing themselves.

No one at Sinai was automatically exempt from reverence.

Status alone was never a substitute for readiness.

The closer someone stood to God, the more preparation mattered.

🙏 Priests held a closer role already

🚫 Closeness did not excuse preparation

⚖️ No one was automatically exempt

📖 Closer access required more readiness, not less

# Exodus 19:23-25
# 🔽 Moses' Objection And Final Instructions
---
## 🗣️ The People Cannot Come Up To Mount Sinai: For Thou Chargedst Us

Moses points back to the boundary God already gave him earlier in the chapter.

He seems to think the warning has already been made clear enough.

God still sends him back down to repeat it one more time.

Some warnings matter enough to repeat, even after they are understood.

God was not being repetitive without a reason.

🗣️ Moses points back to the earlier boundary

❓ He questions whether it needs repeating

🔁 God sends him down to repeat it anyway

📖 Some warnings are worth repeating

## 👥 Thou Shalt Come Up, Thou, And Aaron With Thee

God adds one specific exception to the strict boundary.

Moses and Aaron alone may come up together.

Everyone else, including the rest of the priests, stays below.

Aaron will soon become Israel's first high priest in the chapters ahead.

This early access hints at the role waiting for him.

👥 Moses and Aaron alone may come up

🚧 Everyone else remains below the boundary

🙏 Aaron will soon become the first high priest

📖 This early access hints at his coming role

## 🔽 Moses Went Down Unto The People, And Spake Unto Them

The chapter ends the way much of it began, with Moses moving down the mountain.

He has gone up and down this mountain several times already.

Every trip carried God's words to people who could not go up themselves.

This constant movement is the real shape of Moses' calling here.

The very next chapter opens with the law he was preparing them to receive.

🔽 Moses goes down the mountain again

🔢 Several trips up and down already

🌉 His calling was carrying words between two sides

📖 The covenant law comes next
`.trim();

export const EXODUS_NINETEEN_PERSONAL_SECTIONS = parseExodusNineteenRawNotes(EXODUS_NINETEEN_RAW_NOTES);
