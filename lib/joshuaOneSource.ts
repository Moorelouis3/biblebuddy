export type JoshuaOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaOneRawNotes(rawText: string): JoshuaOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 1:${startVerse}` : `Joshua 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Joshua 1 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_ONE_RAW_NOTES = `# Joshua 1:1-2
# 🕊️ A New Leader Steps Forward
---
## 🎖️ The Servant Of The LORD

"Servant of the LORD" is a title, not a job description.

Only a handful of leaders in the Old Testament ever receive it.

Moses carried this title from Egypt to the edge of the promised land.

Using it here shows the story is turning a page.

🎖️ Servant of the LORD is a high title

📜 Few leaders ever receive this title

🚶 Moses carried it his whole life

📖 The title marks a turning point

## 🕵️ Joshua The Son Of Nun

Joshua is not a new character in this story.

He was one of the twelve spies sent into Canaan back in Numbers.

Ten of those spies panicked at the size of the land.

Joshua and Caleb trusted God's promise instead.

That old trust is exactly why he stands here now.

🕵️ Joshua was one of the twelve spies

😨 Ten spies panicked at the land

🙌 Joshua and Caleb trusted God instead

📖 That old trust leads to this moment

## 🧍 Moses' Minister

"Minister" here does not mean a religious title.

It means a personal attendant who serves a leader up close.

Joshua had already spent decades serving right beside Moses.

That closeness is why God speaks to him next.

🧍 Minister means personal attendant

🚫 Not a religious title here

📆 Joshua served Moses for decades

📖 Closeness prepared him for this role

## ⚰️ Moses My Servant Is Dead

The sentence is short and direct on purpose.

Moses' death was already told in full back in Deuteronomy.

The story does not pause to grieve again here.

God moves straight into what happens next.

⚰️ Moses' death is stated plainly

📚 Deuteronomy already told the account

⏭️ The story does not pause again

➡️ God moves straight into the next step

# Joshua 1:3-5
# 🗺️ The Promise Of The Land
---
## 👣 The Sole Of Your Foot Shall Tread Upon

This is not a promise that Israel already owns the whole land.

The promise activates as Israel actually walks into it.

Possession comes through action, not by standing still.

God ties the promise to Joshua's own footsteps.

👣 Foot means actual movement into the land

🚫 Ownership was not automatic yet

🚶 The people had to walk it out

📖 God ties the promise to obedience

## 🏔️ From The Wilderness And This Lebanon

God names the borders of the promised land in one sweep.

The wilderness marks the southern edge.

Lebanon marks the northern edge.

These borders are close to what was first promised to Abraham.

Naming them again shows the promise has not shrunk over time.

🏜️ Wilderness marks the southern edge

🏔️ Lebanon marks the northern edge

📜 Close to what Abraham was promised

📖 The promise has not shrunk over time

## 🌊 Unto The Great River, The River Euphrates

The Euphrates sits far to the northeast.

Today that same region is part of modern day Iraq.

It marks the outer edge of the land God describes here.

Israel never fully settled land this large in its history.

The offer was bigger than what the nation actually claimed.

🌊 Euphrates lies far to the northeast

🗺️ It marks the far edge of the promise

📉 Israel never filled this whole territory

📖 The offer was larger than what was claimed

## 🤝 I Will Not Fail Thee, Nor Forsake Thee

This exact promise once belonged to Moses.

God now hands it directly to Joshua.

Not one word of the promise changes with the new leader.

Israel's security was never really about which man led them.

🤝 The same promise moves to Joshua

🔁 Not one word of it changes

🛡️ The new leader gets the same guarantee

📖 Israel's security rests on God, not the leader

# Joshua 1:6-9
# 💪 Be Strong And Courageous
---
## 💪 Be Strong And Of A Good Courage

God repeats some version of this command three times in four verses.

Repetition in scripture is rarely filler.

It signals real emphasis.

Joshua is stepping into a job that would frighten anyone.

God is not asking Joshua to feel brave.

He is commanding him to act brave.

🔁 The command repeats three times here

📣 Repetition signals real emphasis

😰 Joshua's job would frighten anyone

📖 Courage here is a command, not a feeling

## 🏡 Divide For An Inheritance

"Inheritance" means land passed down as a lasting possession.

Joshua's task is to divide that inheritance among the tribes.

This land was promised generations earlier to Abraham, Isaac, and Jacob.

Joshua is finishing a promise he did not start.

🏡 Inheritance means a lasting possession

⚖️ Joshua divides it evenly among tribes

📜 Promised generations earlier to the patriarchs

📖 Joshua completes a promise he did not begin

## 🛣️ Turn Not From It To The Right Hand Or To The Left

This phrase pictures a road with one clear straight path.

Turning either direction off that path still counts as leaving it.

God is not just warning against obvious disobedience here.

Small drifts to either side are treated the same as walking away.

🛣️ The picture is a straight road

↔️ Either direction off it counts as leaving

⚠️ Small drifts matter, not just big ones

📖 Full obedience means staying on the path

## 📖 This Book Of The Law Shall Not Depart Out Of Thy Mouth

This does not just mean owning a copy of the law.

It means speaking it and thinking about it constantly.

"Meditate" in this culture usually meant repeating the words quietly out loud.

The law was meant to shape daily habits, not sit on a shelf.

🗣️ Meditate means repeating the words quietly

📚 The law was meant to be spoken

🔁 Day and night means constant habit

➡️ Daily habit was the actual command

## 🥇 Then Thou Shalt Make Thy Way Prosperous

This is not a promise of wealth or an easy path.

"Prosperous" here is tied to obeying the law, not to comfort.

Success for Joshua meant faithfulness to what God commanded.

Obedience comes first.

Success follows after it.

💰 Prosperous does not mean easy or wealthy

📏 Success is tied to obedience here

🥇 Faithfulness defines success for Joshua

📖 Obedience comes first, success follows

# Joshua 1:10-11
# 📣 Joshua Gives The Order
---
## 👔 The Officers Of The People

"Officers" means the leaders in charge of organizing each tribe.

Joshua does not speak to the whole nation directly here.

He works through the existing chain of command instead.

God's instructions become an actual plan through these officers.

👔 Officers led each tribe's organization

🔗 Joshua works through a chain of command

📋 God's word becomes an actual plan

📖 Leadership moves through structure, not speeches

## 🍞 Prepare You Victuals

"Victuals" is an old word for food supplies packed for a journey.

The people had three days to gather what they needed.

This was a real, practical instruction.

It was not just a spiritual pep talk.

Faith and preparation worked together here.

🍞 Victuals means food supplies

📆 Three days to prepare and pack

🧰 A practical instruction, not just words

📖 Faith and preparation work together

# Joshua 1:12-15
# ⚔️ A Reminder For The Eastern Tribes
---
## 🗺️ The Reubenites, And The Gadites, And Half The Tribe Of Manasseh

These three groups already had land on the east side of the Jordan.

Moses granted that request back in Numbers.

There was one condition attached to it.

Their fighting men still had to help the other tribes first.

Joshua now reminds them that the deal still stands.

🗺️ These tribes settled east of the Jordan

📜 Moses approved it on one condition

⚔️ Their men still had to help

📖 Joshua reminds them the deal still stands

## 🧭 On This Side Jordan

"This side" refers to the eastern side of the Jordan river.

That land was already settled and secured for these families.

Their wives, children, and animals could safely stay behind there.

Only the fighting men needed to cross over with the rest.

🧭 This side means east of the Jordan

🏡 That land was already secured for them

👪 Families could safely remain there

➡️ Only fighting men needed to cross

## 🗡️ All The Mighty Men Of Valour

"Valour" means courage and skill in battle.

This phrase describes trained fighting men, not every male in the tribe.

Their assignment was to fight alongside their brothers until the land was won.

Loyalty to family did not excuse them from the shared mission.

🗡️ Valour means battle courage and skill

🎖️ This describes trained fighters, not everyone

🤝 They still had to fight for others

📖 Shared mission came before staying home

## 🕊️ Until The LORD Have Given Your Brethren Rest

"Rest" here means safety and settled peace.

It does not simply mean relaxation.

The eastern tribes could not go home for good yet.

They had to wait until the western tribes had that same rest.

One tribe's peace was tied to the whole nation's peace.

🕊️ Rest means safety and settled peace

⏳ They had to wait for everyone

🤝 One tribe's peace was tied to all

📖 The nation moved forward together

# Joshua 1:16-18
# 🙋 The People Pledge Their Support
---
## 🙋 All That Thou Commandest Us We Will Do

This is the people's direct answer to Joshua's new leadership.

They do not question whether Joshua deserves the role.

Their support comes immediately.

It arrives before any battle has even started.

A united people made Joshua's task far less impossible.

🙋 The people answer with full support

🚫 No questioning of Joshua's leadership

⚡ Their support comes before any battle

📖 Unity made the mission possible

## 👂 As We Hearkened Unto Moses

"Hearkened" means listened closely and obeyed.

It means more than simply hearing the words.

The people compare their promised obedience to their history with Moses.

That comparison carries real weight.

Moses had led them for forty years.

They are choosing to transfer that same trust to a new leader.

👂 Hearkened means listened and obeyed

📆 Moses led them for forty years

🔁 They transfer that trust to Joshua

📖 A whole generation's trust changes hands

## ⚖️ He Shall Be Put To Death

This sounds harsh to modern ears.

It reflects real ancient wartime law instead of casual anger.

A divided army moving into hostile territory was dangerous for everyone.

The penalty is severe because the stakes were just as severe.

The chapter still closes on the same command it kept repeating.

⚖️ This reflects real ancient wartime law

💀 Disobedience risked the whole nation

⚔️ The stakes explain the severity

📖 The chapter closes on courage, not fear
`.trim();

export const JOSHUA_ONE_PERSONAL_SECTIONS = parseJoshuaOneRawNotes(JOSHUA_ONE_RAW_NOTES);
