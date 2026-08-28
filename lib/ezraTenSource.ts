export type EzraTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzraTenRawNotes(rawText: string): EzraTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzraTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezra\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezra 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezra\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezra\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezra 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezra 10:${startVerse}` : `Ezra 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 Ezra 10 sections, received " + sections.length);
  }

  return sections;
}

const EZRA_TEN_RAW_NOTES = `# Ezra 10:1-2
# 📢 Confession Reaches The Congregation
---
## 🙏 Now When Ezra Had Prayed, And When He Had Confessed

To confess here means openly owning the sin as his own.

Ezra had already been praying since the end of chapter nine.

He did this in full view of the temple, not in private.

His honest grief drew others toward the same honesty.

🙏 Confessing means openly owning the sin

🏛️ Ezra prayed in full view of the temple

😢 This grief was public, not hidden

📖 Honest leaders draw others toward honesty

## 👥 There Assembled Unto Him Out Of Israel A Very Great Congregation Of Men And Women And Children

This was not a small gathering of leaders behind closed doors.

Men, women, and children came together in the open square.

The whole community felt the weight of what Ezra was confessing.

Grief this raw is rarely private for long.

👥 The whole community gathered, not just leaders

🏙️ They met in the open square

😭 Everyone felt the weight together

📖 Public grief rarely stays private for long

## 🗣️ We Have Trespassed Against Our God

Shechaniah was the first man to speak up in the crowd.

His own father, Jehiel, appears later among the guilty men of Elam's family.

He was not standing outside this sin looking in from a distance.

Confession is more convincing when it costs the person speaking it.

🗣️ Shechaniah spoke first to Ezra

👨 His own father was among the guilty

🪞 He was not judging from outside

📖 Real confession costs the one speaking

# Ezra 10:3-4
# 🤝 The Covenant Proposed
---
## 🤝 Let Us Make A Covenant With Our God To Put Away All The Wives

A covenant here means a solemn, binding agreement made before God.

Shechaniah is proposing the community formally commit to fixing this together.

Putting away the wives meant ending marriages that broke God's command against foreign idol worship.

Also included were the children born from those marriages.

This was already an extremely costly solution being proposed.

🤝 A covenant is a binding agreement

🙏 Made together, before God, on purpose

💔 It meant ending these marriages

📖 The plan was costly from the start

## 👑 According To The Counsel Of My Lord, And Of Those That Tremble At The Commandment Of Our God

Shechaniah calls Ezra "my lord" out of deep personal respect.

Those who tremble take God's word seriously enough to feel real fear over it.

This same phrase already appeared once in Ezra nine.

Shechaniah is asking that same group to help lead the plan.

👑 My lord shows deep respect for Ezra

😨 Tremble means taking God's word seriously

🔁 This group appeared already in chapter nine

📖 That same group now helps lead the plan

## 💪 Be Of Good Courage, And Do It

The leaders promised to stand with Ezra, not leave him alone in this.

Courage here does not mean the fear was gone.

It means moving forward anyway because obedience mattered more than comfort.

Doing something hard is easier when others commit to walk through it together.

🤝 Leaders promised to stand with Ezra

💪 Courage does not mean fear is gone

✅ Obedience mattered more than comfort

📖 Hard things are easier done together

# Ezra 10:5-6
# 😔 Ezra's Oath And Fast
---
## 🤲 Then Arose Ezra, And Made The Chief Priests, The Levites, And All Israel, To Swear

Ezra required an oath, not just a verbal agreement in the moment.

An oath in this culture bound a person publicly and permanently to their word.

He included every level of leadership, priests, Levites, and the wider community.

This made backing out later far harder to do quietly.

🤲 An oath was more binding than a promise

👑 Priests, Levites, and Israel all swore

🔒 Backing out later became far harder

📖 Ezra built accountability into the plan

## 🚱 He Did Eat No Bread, Nor Drink Water

Going without food or water was an extreme, physical form of mourning.

Ezra was not simply sad, his whole body reflected his grief.

This kind of fast in Scripture usually signals a crisis, not routine devotion.

Ezra's private grief matched the public confession he had just led.

🚱 No food or water was extreme mourning

😢 His whole body showed the grief

🚨 This kind of fast signals a crisis

📖 His private grief matched the public one

# Ezra 10:7-8
# 📯 The Proclamation Goes Out
---
## 📯 They Made Proclamation Throughout Judah And Jerusalem Unto All The Children Of The Captivity

A proclamation was a formal, public announcement read aloud in the streets.

Children of the captivity refers to the Jews who had returned from exile in Babylon.

This was not a quiet suggestion whispered to a few families.

Everyone who had returned from exile was expected to respond.

📯 A proclamation was read publicly aloud

🏙️ It reached all of Judah and Jerusalem

🔙 Children of the captivity means the returned exiles

📖 Everyone who returned was expected to respond

## ⏳ Whosoever Would Not Come Within Three Days

Three days was a short, urgent deadline, not a casual invitation.

Substance meant a person's property, land, and belongings.

Separated from the congregation meant losing standing in the community entirely.

The penalty was severe because the leaders believed the sin itself was severe.

⏳ Three days gave almost no delay

💰 Substance meant a person's property

🚪 Separation meant losing community standing

📖 A severe penalty matched a severe sin

# Ezra 10:9-12
# 🌧️ The Assembly In The Rain
---
## ⏱️ All The Men Of Judah And Benjamin Gathered Themselves Together Unto Jerusalem Within Three Days

The response was fast, exactly matching the deadline just given.

Judah and Benjamin were the two tribes that had mostly returned from exile.

Gathering this many people this quickly shows how seriously the threat was taken.

Obedience here was immediate.

⏱️ The people obeyed within three days

🏛️ Judah and Benjamin were the returned tribes

😮 That speed shows how seriously they took it

📖 Obedience here was immediate

## 🌧️ All The People Sat In The Street Of The House Of God, Trembling Because Of This Matter, And For The Great Rain

It was the ninth month, which falls in the cold rainy season in Judah.

The crowd sat outside in the open, not inside a sheltered building.

Their trembling came from the weather and the weight of their sin.

Physical discomfort mirrored the discomfort already in their hearts.

🌧️ The ninth month was Judah's rainy season

🧍 They sat outside, unsheltered, in public

😨 Trembling came from weather and guilt together

📖 Their bodies mirrored their hearts

## 🗣️ Ye Have Transgressed, And Have Taken Strange Wives, To Increase The Trespass Of Israel

Ezra stood up publicly to name the sin plainly, without softening it.

Strange wives meant wives from nations that worshiped other gods.

He said this sin did not just affect individual families.

It added directly to the guilt already carried by the whole nation.

🗣️ Ezra named the sin plainly

🌍 Strange wives meant wives from other nations

⚖️ This added to Israel's shared guilt

📖 Private sin still carries public weight

## ✂️ Separate Yourselves From The People Of The Land, And From The Strange Wives

Confession alone was not going to fix this problem by itself.

Ezra required an action step, not just an admission of guilt.

Separate meant physically ending these marriages, not simply feeling sorry.

Real repentance always leads to a change, not just a feeling.

🙏 Confession alone was not the fix

✅ Ezra required a real action step

✂️ Separate meant ending the marriages

📖 Real repentance always leads to change

## 📢 As Thou Hast Said, So Must We Do

The people responded with immediate, full agreement, not debate.

With a loud voice shows this was a shared, public commitment.

Agreeing out loud in front of everyone made it harder to quietly back out later.

Words spoken together in public carry a different weight than private ones.

📢 The people answered with a loud voice

🤝 This was full, immediate agreement

🔒 Public words are harder to break

📖 Shared commitment carries real weight

# Ezra 10:13-15
# ⚖️ A Careful Process, Not A Rushed One
---
## 🌧️ It Is A Time Of Much Rain, And We Are Not Able To Stand Without

The crowd agreed with the plan but flagged a real practical problem.

Standing outside in heavy rain for a long process was not sustainable.

They also admitted how many people were actually involved.

This was not a small handful of families to sort through quickly.

🌧️ Standing outside in the rain was not sustainable

👥 Many people were involved, not a few

🗣️ The crowd raised an honest, practical concern

📖 Agreement did not mean ignoring reality

## 👥 Let Now Our Rulers Of All The Congregation Stand

Instead of one massive gathering, the people proposed a structured process.

Local leaders and judges from each city would help oversee individual cases.

Families would come forward at scheduled times rather than all at once.

This turned an overwhelming problem into something that could actually be handled well.

👥 Local leaders would oversee each case

🗓️ Families came forward at scheduled times

🏙️ Every city sent its own judges

📖 A hard problem became manageable this way

## 🙅 Only Jonathan The Son Of Asahel And Jahaziah The Son Of Tikvah Were Employed About This Matter

This verse likely does not mean only two men helped with the investigation.

Many scholars believe only points to two men who stood against the plan instead.

Meshullam and Shabbethai the Levite are named alongside them.

Scripture records dissent honestly, even when the majority had already agreed.

🙅 Only marks opposition, not just two helpers

⚖️ Jonathan and Jahaziah stood against the plan

🤝 Two more men supported their objection

📖 The text records dissent honestly

# Ezra 10:16-17
# 📋 The Investigation Concludes
---
## 👥 Sat Down In The First Day Of The Tenth Month To Examine The Matter

A small committee replaced the entire congregation for the detailed work.

Chief of the fathers meant the heads of Israel's major family lines.

The tenth month began this careful case by case review.

Big problems are often solved by a few faithful people doing steady work.

👥 A small committee did the detailed work

👑 Chief of the fathers meant family heads

🗓️ The tenth month began the review

📖 Steady work by a few solved this

## 🗓️ They Made An End With All The Men That Had Taken Strange Wives By The First Day Of The First Month

The investigation took about three months from start to finish.

That pace shows real care rather than a rushed, careless process.

Getting this right mattered more than getting it done quickly.

The first month marked a clean, complete finish to the work.

🗓️ The process took about three months

🐢 Careful work took time on purpose

✅ Getting it right mattered most

📖 The work reached a clean finish

# Ezra 10:18-24
# 👑 The Priests And Levites Named First
---
## 👑 Among The Sons Of The Priests There Were Found That Had Taken Strange Wives

The list of guilty men begins with priests, not ordinary Israelites.

Priests were held to the highest standard because they led Israel's worship.

Naming Jeshua's own family first made clear no one was above the process.

Leadership does not exempt anyone from accountability.

👑 The list starts with priests, not laity

⛪ Priests were held to the highest standard

👪 Even Jeshua's own family was named

📖 Leadership never means exemption

## 🤝 They Gave Their Hands That They Would Put Away Their Wives

Gave their hands was a physical gesture sealing a solemn promise.

This was likely a handshake or a raised hand, a visible sign everyone could see.

It made their private repentance into a public, verifiable commitment.

Actions like this left no room for quiet backsliding later.

🤝 Gave their hands sealed the promise

👀 It was a visible, public gesture

✍️ Private repentance became a public act

📖 The gesture left no room to backslide

## 🐏 Being Guilty, They Offered A Ram Of The Flock For Their Trespass

A guilt offering was required under the law after certain sins.

A ram was a costly animal, not a cheap or token sacrifice.

The offering did not replace putting away the wife.

It came alongside that change, not instead of it.

🐏 A ram was a costly sacrifice

⚖️ A guilt offering made the wrong right

➕ It came alongside the change, not instead

📖 Real repentance cost something real

## 👑 And Of The Sons Of Harim

Three more priestly families are named after Jeshua's: Immer, Harim, and Pashur.

Harim's family alone contributed five men to this list.

This same name, Harim, will appear again later among the ordinary Israelites.

The repetition shows how common these family names had become across the returned community.

👑 Three priestly families are listed together

✋ Harim's family alone gave five names

🔁 Harim appears again later in the list

📖 Family names repeat across the community

## 📜 Also Of The Levites

The list moves next to the Levites, the priests' assistants in temple worship.

Six Levites are named, including one identified by two different names.

The same is Kelita clarifies that Kelaiah and Kelita were one person.

Even minor identification notes like this show how carefully this record was kept.

📜 The list moves to the Levites

🔢 Six Levites are named here

🪪 Kelaiah and Kelita were one person

📖 This record was kept with real care

## 🎵 Of The Singers Also, And Of The Porters

Singers led musical worship at the temple.

Porters guarded the gates and kept order there.

Only one singer is named here.

Three porters are named alongside him.

Even temple staff were not exempt from this process.

🎵 Singers led musical worship

🚪 Porters guarded the temple gates

🎤 Only one singer is named

📖 Temple staff were not exempt

# Ezra 10:25-29
# 📜 Israel's Families Begin
---
## 🔀 Of The Sons Of Parosh

The list now shifts from temple staff to ordinary Israelite families.

This section is much longer than the priests and Levites before it.

Parosh's family was already the largest group to return from exile back in Ezra two.

Seven men from that same family are named here.

The sin reached across the whole community, not just its leaders.

🔀 The list shifts to ordinary families

📈 Parosh's family was the largest to return

👥 Seven men are named from Parosh

📖 The sin reached the whole community

## 👨 And Of The Sons Of Elam

Elam's family, already mentioned once in verse two, appears again here.

Shechaniah's own father, Jehiel, is named among these six men.

Zattu's family follows right after with six more names of its own.

The man who proposed the solution watched his own relative be named in it.

👨 Elam's family included Shechaniah's father

🔁 This family was already mentioned in verse two

👥 Zattu's family follows with six more names

📖 The proposer's own family was not spared

## 👥 Of The Sons Also Of Bebai

Bebai's family gave four names to the list.

Bani's family follows with six more men.

The name Bani will actually appear twice in this chapter, in two separate family lines.

Common names repeating across ancient Israel could easily create confusion without careful records like this one.

👥 Bebai's family gave four names

📋 Bani's family added six more

🔁 Bani will appear again later

📖 Careful records prevented real confusion

# Ezra 10:30-33
# 👥 The Longest Family Lists
---
## 👥 Of The Sons Of Pahathmoab

Pahathmoab's family gave eight names, the longest single list in this chapter.

The name means "governor of Moab," a title connected to earlier authority over that region.

A family this large having eight men involved shows how widespread this sin had become.

Size here reflects the true scope of the problem, not just a random detail.

👥 Pahathmoab's family gave eight names

🏛️ The name means governor of Moab

📈 Eight men show the sin's real scope

📖 Size here was not a random detail

## 👥 Eliezer, Ishijah, Malchiah, Shemaiah, Shimeon

This is a second, separate family also named Harim, distinct from the priestly Harim earlier.

Two families sharing one name shows how common that name really was in Israel.

Five men are listed here, with three more added in the next verse.

The repeated name proves this was not a single family's failure alone.

👥 This is a second, separate Harim family

🔁 Two families shared the same name

✋ Five men are listed in this verse

📖 This was not just one family's failure

## 👥 Of The Sons Of Hashum

Hashum's family gave seven names to this list.

This is a different family from the earlier list, even though similar names repeat throughout this chapter.

Repetition of names across different families was common in ancient Israel.

Careful identification, family by family, prevented real confusion.

👥 Hashum's family gave seven names

🔁 Similar names repeat across this list

📋 Records kept each family distinct

📖 Careful identification prevented confusion

# Ezra 10:34-40
# 🔚 The List Closes Part One
---
## 📜 Of The Sons Of Bani, Maadai, And Amram, And Uel

This second Bani family becomes the longest single list in the whole chapter.

It stretches across nine verses and includes about twenty seven names.

A family this size shows how deeply this sin had spread through Israel.

The sheer length of the list is itself part of the point.

📜 This is the longest family list here

📊 It covers about twenty seven names

📈 Its size shows how deep the sin spread

📖 The length itself carries the point

## 🧱 Vaniah, Meremoth, Eliashib

Meremoth is one name worth pausing on inside this long list.

A man by this same name later helped repair Jerusalem's wall in Nehemiah three.

Many believe this is the same Meremoth who weighed the temple treasure in Ezra eight.

If so, a name recorded here for failure was later recorded again for faithful service.

🧱 Meremoth later repaired Jerusalem's wall

⚖️ He may be the same man

🔁 The same name may appear three times

📖 Failure recorded here was not the end

# Ezra 10:41-44
# 🔚 The List Closes Part Two
---
## 📍 Of The Sons Of Nebo

Nebo is named here as a place, not a person.

That is unusual among these family headers.

Nebo was also the name of a Babylonian god.

This family may have taken its name from a nearby town.

This is the last family named in the whole list.

📍 Nebo names a place, not a person

🔀 That is unusual among these headers

🏛️ Nebo was also a Babylonian god's name

📖 This is the last family named

## 📊 All These Had Taken Strange Wives

The chapter closes with a final, sobering count of the whole list.

The full list names 113 men across the whole investigation.

Some of these marriages had already produced children by this point.

Putting away a wife with children meant a painful, costly choice, not a clean fix.

The book of Ezra ends here, in the middle of a hard obedience, not a celebration.

📊 The full list names 113 men

👶 Some marriages had already produced children

💔 This was a painful, costly choice

📖 Ezra ends mid obedience, not celebration
`.trim();

export const EZRA_TEN_PERSONAL_SECTIONS = parseEzraTenRawNotes(EZRA_TEN_RAW_NOTES);
