export type JoshuaTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaTwoRawNotes(rawText: string): JoshuaTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 2:${startVerse}` : `Joshua 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Joshua 2 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_TWO_RAW_NOTES = `# Joshua 2:1
# 🕵️ Two Spies Enter Jericho
---
## 🌵 Sent Out Of Shittim

Shittim was Israel's camp east of the Jordan River.

It was the last stop before crossing into Canaan.

The name means acacia trees, a hardy tree common in that dry valley.

Sending spies from this camp marks the true start of the conquest of Jericho.

🌵 Shittim means acacia trees

🏕️ Israel's last camp before Canaan

🕵️ Two spies leave from here

📖 The conquest of Jericho begins

## 🕵️ To Spy Secretly

To spy secretly means gathering information without the enemy knowing.

Joshua needed to know how strong Jericho's walls were.

He also needed to know if the people still had courage to fight.

Forty years earlier, twelve spies scouted this same land and brought back a fearful report.

Joshua was one of only two who trusted God back then.

This time he sends just two men, not twelve.

🕵️ Spying means gathering secret information

🏰 They study Jericho's walls and will

📜 Numbers 13 sent spies before

➡️ Joshua learned from that first mission

## 🚪 An Harlot's House, Named Rahab

A harlot was a woman who sold sex for money.

Her house often worked like a public inn for travelers.

Strangers could lodge there without drawing much attention.

Rahab's name appears again later, in the family line of Jesus in Matthew 1.

The book of Hebrews also names her as an example of real faith.

An unlikely woman becomes one of the most surprising heroes in this whole story.

🚪 A harlot ran her own household

🏠 Her house worked like a public inn

👑 Rahab is named in Jesus's genealogy

📖 An unlikely woman becomes a hero

# Joshua 2:2-4
# 👑 The King Of Jericho Demands The Spies
---
## 👀 It Was Told The King Of Jericho

News of the spies reached the king almost immediately.

Jericho was a walled city on high alert.

Guards watched every stranger who entered its gates.

A busy household like Rahab's was exactly the kind of place a report would come from.

👀 News reached the king quickly

🏰 Jericho stayed on high alert

🚪 Rahab's house drew attention fast

📖 The king suspects the real reason

## 👑 Bring Forth The Men

The king sends a direct order to Rahab's house.

He commands her to hand over the two men.

Kings in walled cities held real power over every house inside the walls.

Rahab now must choose between the king's authority and the men hiding on her roof.

👑 The king gives a direct order

🚪 He commands the men handed over

🏰 Kings controlled every house inside

➡️ Rahab must choose who to protect

## 🤥 But I Wist Not Whence They Were

Wist is an old word that means knew.

Rahab tells the king's men she does not know where the strangers came from.

That is not true. She has already hidden the spies on her roof.

The Bible records her lie plainly, without excusing it here.

Later Bible writers praise her faith and her actions, not this lie.

📖 Wist is an old word for knew

🤥 Rahab tells the king a lie

🙈 The text records it plainly

➡️ Later writers praise her faith, not the lie

# Joshua 2:5-7
# 🌙 The Escape At The Gate
---
## 🌆 About The Time Of Shutting Of The Gate

Walled cities like Jericho closed their gates every night at dark.

Once the gate shut, no one could enter or leave until morning.

Rahab times her lie right at this deadline.

The guards are eager to act fast before the gate closes for good.

That urgency keeps them from searching her house carefully.

🌆 City gates closed every night at dark

🚧 No one could pass after that

⏱️ Rahab lies right at the deadline

➡️ Urgency stops a careful search

## 🧭 I Wot Not

Wot is another old word, like wist, that means know.

Rahab claims she does not know which way the men went.

She sends the king's pursuers toward the Jordan River.

That is the wrong direction for anyone hiding on her own roof.

Every detail in her story points the search away from her house.

📖 Wot is an old word for know

🧭 She points pursuers toward the Jordan

🙈 The wrong direction, on purpose

➡️ Every detail protects the spies

## 🌾 Hid Them With The Stalks Of Flax

Flax is a plant used to make linen thread and cloth.

After harvest, farmers spread flax stalks on flat rooftops to dry.

Piles of drying flax gave Rahab a natural place to hide two grown men.

Flat roofs across the ancient Near East were used for work and storage, not just shelter.

🌾 Flax made linen thread and cloth

☀️ Stalks dried in piles on rooftops

🙈 The piles hid two grown men

📖 Roofs were everyday workspaces too

## 🌊 Unto The Fords

A ford is a shallow place in a river where people can walk across.

The Jordan River had a few known fords.

Pursuers head straight for them, expecting the spies to run for the camp.

The chase leads them far away from Rahab's house and her roof.

🌊 A ford is a shallow river crossing

🏃 Pursuers rush toward the Jordan fords

🎯 They assume the spies fled fast

➡️ The chase clears Rahab's house of suspicion

# Joshua 2:8-11
# 🙏 Rahab's Confession Of Faith
---
## 📖 I Know That The Lord Hath Given You The Land

Rahab uses the name LORD, the personal covenant name of Israel's God.

She is a Canaanite woman from a pagan city.

Yet she names Israel's God correctly, by his own covenant name.

She states the outcome of the conquest before a single battle has started.

Her confidence comes from reports she has heard, not from anything she has witnessed herself.

📖 LORD is Israel's own covenant name

🙏 A Canaanite woman speaks it correctly

⚔️ She predicts victory before any battle

➡️ Her faith comes from what she heard

## 😨 Your Terror Is Fallen Upon Us

Terror here means a deep, paralyzing dread, not ordinary fear.

This dread had already fallen on Jericho before Israel ever attacked.

Moses had promised this exact fear generations earlier, back in Exodus.

God was clearing the way ahead of Israel's army, not just beside it.

😨 Terror means paralyzing, deep dread

🏰 It struck Jericho before any battle

📜 Moses had already promised this fear

📖 God worked ahead of Israel's army

## 😰 All The Inhabitants Of The Land Faint Because Of You

Faint here means to melt or lose all strength from fear.

Rahab says this fear has spread to every person in the land.

It is not just the king who is afraid.

An entire population losing its nerve before one battle is a strange kind of victory.

God had promised Moses this exact outcome long before Israel crossed into Canaan.

😰 Faint means melting with fear

🌍 Fear spread to the whole land

⚔️ Victory begins before any battle

📖 God had promised Moses this outcome

## 🌊 The Lord Dried Up The Water Of The Red Sea

This event happened about forty years before Rahab ever met these spies.

News of Israel's escape from Egypt had still reached a city far away in Canaan.

Old news travels slowly, but it still arrives.

Fear had been building in Jericho for decades, not just from recent news.

🌊 The Red Sea crossing was decades old

📰 Old news still reached distant Jericho

⏳ Fear had built for a long time

📖 Old victories still shape present fear

## 👑 Sihon And Og, Whom Ye Utterly Destroyed

Sihon and Og were two powerful kings east of the Jordan River.

Israel had defeated both of them shortly before reaching Jericho.

That battle is recorded earlier, back in the book of Numbers.

Utterly destroyed means a total defeat, with no army left to fight back.

News of two real, recent victories travels faster than an old story ever could.

👑 Sihon and Og ruled east of Jordan

⚔️ Israel defeated both in Numbers

💥 Utterly destroyed means total defeat

➡️ Recent wins spread fear fastest

## 🙏 He Is God In Heaven Above, And In Earth Beneath

Rahab makes the clearest theological statement in the entire chapter.

She says Israel's God rules over heaven and earth, not one land alone.

Most people in her world believed each god ruled only one place or one people.

A Canaanite woman states what many in Israel still struggled to fully believe.

🙏 Rahab's clearest statement in the chapter

🌍 God rules heaven and earth both

⚡ Most gods were seen as local

📖 Her faith outpaces her own city

# Joshua 2:12-14
# 🤝 Rahab's Request And The Spies' Oath
---
## 🙏 Swear Unto Me By The Lord

Swearing an oath by a god's name made that oath binding.

Breaking it meant facing that god's judgment.

Rahab could have asked the spies to swear by any god of Canaan.

Instead she asks them to swear by the LORD, the God she just named.

Her request treats Israel's God as the only one whose word truly matters.

🙏 Oaths by a god's name were binding

🌍 She could have named any local god

📖 She chooses the LORD by name

➡️ Her request matches her confession

## 🤝 Shewed You Kindness

Shewed is an old spelling of showed.

The kindness Rahab means is hiding the spies and lying to protect them.

She is now asking for the same loyalty in return.

This kind of loyal, covenant style kindness is often called hesed in the Hebrew Bible.

📖 Shewed is an old spelling of showed

🤝 She already showed real kindness first

⚖️ She asks for kindness in return

➡️ Hebrew calls this loyal kindness hesed

## 🔖 Give Me A True Token

A token is a physical sign that proves a promise is real.

Words alone would not protect Rahab once the army reached her door.

She asks for something a soldier could actually recognize in the chaos of battle.

This request sets up the scarlet cord that appears later in the chapter.

🔖 A token is a physical proof

🗣️ Words alone were not enough

⚔️ Soldiers needed something to recognize

➡️ This sets up the scarlet cord later

## 👨‍👩‍👧‍👦 Save Alive My Father, And My Mother

Rahab does not ask to save herself alone.

She names her father, mother, brothers, and sisters by name.

Her faith becomes an act on behalf of her whole family, not just her own life.

These named relatives set the exact terms the rest of the chapter will follow.

👨‍👩‍👧‍👦 She asks for her whole family

🙏 Faith becomes an act for others

📜 Named relatives set clear terms

➡️ These terms play out later

## ⚖️ Our Life For Yours

The spies answer with a solemn promise.

They stake their own lives as the guarantee of the deal.

One condition is attached, that Rahab keep their business a secret.

A promise this serious was not made lightly in the ancient world.

⚖️ They stake their own lives on it

🤐 One condition, keep the secret

📜 Serious promises were rarely made lightly

➡️ The oath is now sealed both ways

# Joshua 2:15-16
# 🪢 Down The Wall And Into The Hills
---
## 🧱 Her House Was Upon The Town Wall

Many ancient cities built houses directly into the thickness of the town wall.

A window in a wall house could open straight outside the city.

It did not need to open into a courtyard at all.

Living on the wall let Rahab lower the spies down without passing a single guard.

Her ordinary home turns out to be the perfect escape route.

🧱 Houses were sometimes built into city walls

🪟 Her window opened straight outside

🚶 No guards had to be passed

📖 Her home doubled as an escape route

## 🪢 Let Them Down By A Cord

A cord strong enough to lower two grown men had to be well made.

Lowering them at night from a wall window kept the escape hidden.

Watching eyes below would never see it happen.

This same kind of cord returns later in the chapter as a signal in her window.

🪢 The cord had to be strong

🌙 A night escape stayed hidden

🔁 The same cord returns later

📖 One rope, two purposes

## 🏔️ Get You To The Mountain

Rahab gives the spies a specific escape plan, not just a warning.

The mountains near Jericho offered caves and rough terrain.

Pursuers would struggle to search that ground carefully.

Her advice works exactly as she says it will.

🏔️ She gives a specific escape plan

🕳️ Mountains offered caves to hide in

🔍 Pursuers would struggle to search there

➡️ Her advice works exactly as planned

## 🔢 Hide Yourselves There Three Days

Three days is not a random number in the book of Joshua.

Joshua had already told the people to prepare three days of food back in chapter one.

The spies now spend that same span of time hiding in the hills.

Two separate timelines are quietly lining up around the same number.

🔢 Three days repeats through Joshua

📜 Chapter one used the same span

🏔️ The spies hide for that long

📖 Two timelines move together

# Joshua 2:17-21
# 🧵 The Scarlet Cord Oath
---
## ⚖️ We Will Be Blameless Of This Thine Oath

Blameless here means free of guilt if certain conditions are not met.

The spies are setting the exact terms under which their promise still holds.

An oath in this culture was never open ended.

It came with real conditions attached, spoken out loud.

Both sides now know exactly what could break the deal.

⚖️ Blameless means free of guilt

📜 Oaths came with real conditions

🤝 Both sides now know the terms

📖 Nothing here is left vague

## 🧵 Bind This Line Of Scarlet Thread

Scarlet thread was dyed bright red, easy to spot from a distance.

Tying it in the window would mark Rahab's house as the one to spare.

A visible sign of protection echoes the blood marked on doorposts back in Exodus.

Both signs use color and a doorway to separate the protected from everyone else.

🧵 Scarlet thread was bright and visible

🪟 It marks the one house to spare

🩸 It echoes the doorposts of Exodus

📖 Color and doorway mark the protected

## 🏠 Thy Father's Household

Protection under this oath only covers people gathered inside Rahab's own house.

Her family could not scatter through the city and expect the same safety.

Bringing everyone under one roof turns the whole household into a single place of refuge.

The scarlet cord protects a house, not relatives scattered across Jericho.

🏠 Safety only covers Rahab's own house

👨‍👩‍👧‍👦 Family had to gather under one roof

🛡️ One house becomes a place of refuge

➡️ Location matters as much as identity

## 📖 His Blood Shall Be Upon His Head

This is a Hebrew idiom that means a person caused their own death.

Anyone who leaves the marked house forfeits the spies' promise of protection.

The same idiom shifts blame onto Rahab's household if anyone inside is harmed.

The oath was written with no loopholes on either side.

📖 An idiom meaning self caused harm

🚪 Leaving the house forfeits protection

🏠 Harm inside shifts blame the other way

➡️ The oath left no loopholes

## 🔓 Then We Will Be Quit Of Thine Oath

Quit here means released or let off from a promise.

The spies attach one final condition to the deal.

Rahab must keep silent about their mission.

If she breaks that silence, their oath to protect her no longer holds.

The same oath that offers safety can also be canceled by one careless word.

📖 Quit means released from a promise

🤐 Silence was the one condition

🔓 Breaking it cancels the oath

➡️ Safety and silence stayed linked

## 🧵 She Bound The Scarlet Line In The Window

Rahab ties the cord immediately, before there is any proof the spies kept their word.

Her action matches her earlier confession, not just her words on the roof.

Faith here looks like a specific, visible action, not only a private belief.

The book of James later points to exactly this kind of faith, backed up by action.

🧵 She ties the cord right away

🙏 Action matches her earlier confession

👀 Faith becomes something visible here

📖 James later points to this same faith

# Joshua 2:22-24
# 🏕️ Back To Joshua With A Report
---
## 🔍 The Pursuers Sought Them Throughout All The Way, But Found Them Not

Rahab's plan works exactly the way she said it would.

The king's men search hard and still come up empty.

A lie told by one woman succeeds where a royal search party fails.

The chapter never hides the fact that deception was part of how this rescue happened.

🔍 The search comes up completely empty

👑 A royal search party still fails

🙏 Rahab's plan works as promised

📖 The text does not hide how

## 🌊 Passed Over, And Came To Joshua

The spies cross the Jordan River to rejoin the camp.

This same river crossing becomes the next major event in the book of Joshua.

Their safe return proves the mission was worth the risk.

Joshua now has firsthand information instead of secondhand rumors about Jericho.

🌊 They cross the Jordan to return

📖 The river crossing comes next

✅ The mission proves worth the risk

➡️ Joshua gets firsthand information now

## 🗣️ Truly The Lord Hath Delivered Into Our Hands All The Land

The spies report back using almost the same words Rahab used on her roof.

A frightened enemy and Israel's own scouts now agree on the same outcome.

Confidence for the coming battle grows from a Canaanite woman's confession as much as anything the spies saw.

Jericho's walls have not fallen yet.

But its people have already lost the will to defend them.

🗣️ The spies echo Rahab's own words

🤝 Enemy and scout agree on the outcome

🙏 Confidence grows from Rahab's confession

📖 The walls stand, but courage is gone
`.trim();

export const JOSHUA_TWO_PERSONAL_SECTIONS = parseJoshuaTwoRawNotes(JOSHUA_TWO_RAW_NOTES);
