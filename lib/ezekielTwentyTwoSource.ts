export type EzekielTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielTwentyTwoRawNotes(rawText: string): EzekielTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 22:${startVerse}` : `Ezekiel 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 22 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_TWENTY_TWO_RAW_NOTES = `# Ezekiel 22:1-5
# 👁️ Judge The Bloody City
---
## ❓ Wilt Thou Judge, Wilt Thou Judge The Bloody City

God already knows the answer before He asks it.

Repeating the question twice is a Hebrew way to add weight to a charge.

Jerusalem is called the bloody city before anything else is said.

That title names the city by its worst sin, not by its temple or its king.

Ezekiel cannot soften this charge before he even begins to speak.

❓ God asks a question already answered

🔁 Repetition doubles the weight here

🩸 Bloody city names Jerusalem's worst sin

📖 The city is known by its violence

## 📜 Shew Her All Her Abominations

"Shew" is an old word meaning to show or make plain.

Ezekiel cannot just hint at Jerusalem's sin in general terms.

He must name every specific abomination out loud.

A vague accusation is easy to dismiss.

A detailed list is much harder to ignore.

📜 Shew means to show plainly

🎯 Ezekiel must name specific sins

🙅 Vague charges are easy to dismiss

➡️ Detail makes the charge impossible to escape

## 🩸 The City Sheddeth Blood In The Midst Of It

"Sheddeth blood" means murder happening inside the city itself.

This is not an enemy attacking from outside the walls.

The violence described here comes from Jerusalem's own people.

"In the midst of it" makes the location impossible to miss.

The danger was never foreign, it was already inside.

🩸 Sheddeth blood means murder happens here

🏙️ The violence comes from inside Jerusalem

🚪 This is not an outside enemy

📖 The real danger was already inside

## 🚫 Maketh Idols Against Herself To Defile Herself

"Defile" means to make something unclean or unfit for God's presence.

Jerusalem is not a victim of idols forced on her from outside.

The city made these idols for herself, by her own choice.

Each idol left her further from the God she was meant to worship.

Sin here is self inflicted, not accidental.

🚫 Defile means made unclean before God

🙋 She built these idols by choice

🎯 No outside force forced this sin

📖 Her own choices caused this distance

## ⏳ Thy Days To Draw Near

This phrase does not describe Jerusalem growing old peacefully.

It pictures a life running out, the way a person's final years approach.

Judgment is being described as the natural end of a long life of sin.

The city brought this ending near through her own actions.

Time was not against her, her choices were.

⏳ This pictures a life running out

📅 Judgment arrives like a final year

🚫 Not old age, but earned judgment

📖 Her choices brought this day near

## 😳 A Reproach Unto The Heathen, And A Mocking To All Countries

"Reproach" means public shame, the kind everyone around can see.

Jerusalem's humiliation will not stay hidden within her own walls.

Surrounding nations will openly mock what was once God's chosen city.

The nations watching were never neutral observers.

What happens to Jerusalem becomes a lesson to everyone nearby.

😳 Reproach means shame everyone can see

👀 Other nations are watching closely

🏙️ Jerusalem was once God's chosen city

📖 Her fall becomes a lesson abroad

## 🧭 Those That Be Near, And Those That Be Far

Naming both near and far nations covers the whole known world.

No distance will keep anyone from hearing about Jerusalem's downfall.

"Infamous" means having a bad reputation that everyone already knows.

"Vexed" means deeply troubled and disturbed.

Jerusalem's shame will travel further than her own borders ever did.

🧭 Near and far means everyone everywhere

📰 Jerusalem's downfall cannot be hidden

😤 Infamous means a reputation already ruined

📖 Her shame spreads past her borders

# Ezekiel 22:6-12
# ⚖️ A City Full Of Sin
---
## 👑 The Princes Of Israel Were In Thee To Shed Blood

"Princes" here means the ruling class, not just the sons of a king.

These are the very leaders responsible for protecting the city.

Instead they used their position and power to commit murder.

Leadership here became a license for violence instead of justice.

👑 Princes means the ruling leaders

🛡️ They were meant to protect

🩸 Instead they used power for murder

📖 Leadership was turned into violence

## ⚖️ Set Light By Father And Mother

"Set light by" is an old way of saying someone treated a thing as worthless.

Honoring father and mother was one of the ten commandments.

Jerusalem had grown careless about the most basic family duty.

A city that ignores this command at home rarely keeps order anywhere else.

⚖️ Set light by means treated worthless

👪 Honoring parents was a core command

🏠 Family duty was ignored at home

➡️ Small breakdowns lead to bigger ones

## 🛡️ Oppression With The Stranger, The Fatherless, And The Widow

The law repeatedly named these three groups as the ones God watched most closely.

"Stranger" means a foreigner living among Israel without the protection of their own family or land.

"Fatherless" and "widow" had no husband or father to defend them legally.

Jerusalem specifically targeted the people the law commanded her to protect.

🛡️ God named these groups for protection

🧳 Stranger means a foreigner living there

👨‍👩‍👧 Fatherless and widow had no defender

📖 She harmed those she should shield

## 📅 Despised Mine Holy Things, And Profaned My Sabbaths

"Profaned" means treating something sacred as common and ordinary.

The Sabbath was meant to be a weekly reminder that Israel belonged to God.

Jerusalem had stopped treating that day, and God's holy things, as special at all.

Disrespecting a day of rest reflects a much deeper disrespect underneath.

🚫 Profaned means treating sacred as ordinary

📅 Sabbath marked Israel as God's own

😔 The city abandoned that weekly rhythm

📖 Disrespect for rest showed deeper rebellion

## 🗣️ Carry Tales To Shed Blood

"Carry tales" means spreading gossip or false reports about someone.

In this city, that gossip was not harmless talk.

It led directly to people being accused and killed.

Words here became a weapon just as real as a sword.

🗣️ Carry tales means spreading false reports

💀 This gossip led to real deaths

⚔️ Words became a weapon here

📖 Speech can carry deadly weight

## ⛰️ They Eat Upon The Mountains

Eating upon the mountains describes meals eaten as part of pagan worship at high places.

These hilltop shrines were set up to honor other gods, not the LORD.

Sharing a meal there was treated as an act of loyalty to that god.

Jerusalem's own people were feeding a worship God had forbidden from the beginning.

⛰️ Mountains here means pagan worship sites

🍽️ Meals there pledged loyalty to idols

🚫 God had forbidden this worship

📖 Her own people fed false gods

## 👨‍👧 Discovered Their Fathers' Nakedness

"Discovered their fathers' nakedness" is a Hebrew way of naming incest within a family.

The law listed this exact phrase to describe forbidden relationships with a close relative.

This was not a vague accusation, it pointed to a specific, named sin.

A boundary meant to protect the family had been broken from the inside.

👨‍👧 This phrase names incest plainly

📜 The law used this exact wording

🚫 A clear, specific boundary was broken

📖 Family protection failed from within

## 💔 Defiled His Daughter In Law, And Humbled His Sister

Verse eleven lists three separate acts, each naming a specific forbidden relationship.

One man defiled his neighbor's wife, breaking a marriage that was not his own.

Another defiled his daughter in law, and another his own sister.

These were not rumors, they were named, specific violations of the law's clearest boundaries.

📋 Three named sins fill this verse

💔 A neighbor's wife was wrongly taken

👪 A daughter in law and a sister

📖 Specific sins, not vague rumors

## 💰 Taken Gifts To Shed Blood, And Taken Usury

"Gifts" here means bribes paid to have someone killed unjustly.

"Usury" means charging interest on a loan to a fellow Israelite, which the law forbade.

"Extortion" means taking more from someone than they actually owed.

Jerusalem profited from violence and from squeezing her own poor neighbors for money.

💰 Gifts here means bribes for murder

📈 Usury means forbidden interest charged

🤝 Extortion means taking more than owed

📖 The city profited from others' pain

## 🧠 Hast Forgotten Me, Saith The Lord GOD

Every sin named in this list traces back to one root cause.

Jerusalem had simply stopped remembering who God was.

Forgetting God here does not mean an honest memory lapse.

It means living as though He were not watching at all.

Every broken law in this list grew out of that one forgetting.

🧠 Forgetting God is the root cause

👁️ It means living as though unwatched

📜 Every sin traces back to this

📖 One forgetting produced a long list

# Ezekiel 22:13-16
# ✋ I Have Smitten Mine Hand
---
## 👏 I Have Smitten Mine Hand At Thy Dishonest Gain

Smiting one's hand together was an ancient gesture of shock and outrage.

God is not reacting with cold, distant judgment here.

He responds to Jerusalem's dishonest profit the way a person reacts to something appalling.

This is a personal, emotional response, not a detached legal ruling.

👏 Smiting hands showed shock and outrage

😠 God reacts personally, not coldly

💰 Dishonest gain provoked this response

📖 Judgment here carries real emotion

## ❓ Can Thine Heart Endure, Or Can Thine Hands Be Strong

This question expects one honest answer, no.

Jerusalem has no strength left to withstand what is coming.

A heart that cannot endure and hands that cannot stay strong describe total collapse.

There will be no clever defense left to offer God.

❓ The expected answer here is no

💔 Heart and hands picture total collapse

🛡️ No real defense remains for her

➡️ Strength will not save her now

## 🗣️ I The LORD Have Spoken It, And Will Do It

God does not separate His word from His action here.

What He says and what He does are the same thing.

Jerusalem could not talk her way around a sentence already settled.

This phrase closes the door on any hope of negotiation.

🗣️ God's word and action match exactly

🚪 No negotiation is possible here

⚖️ The sentence is already settled

📖 God's promises always become real

## 🌍 Scatter Thee Among The Heathen, And Disperse Thee In The Countries

Scattering a nation among foreign countries was the exact opposite of the promised land.

God had once gathered Israel into one place as a blessing.

Now that same gathering is reversed as a judgment.

The people would soon live scattered among the very nations they had copied in sin.

🌍 Scattering reverses God's gift of land

🔁 This undoes the earlier gathering

🧭 Israel copied the nations in sin

📖 Now they will live among them

## 🧼 Consume Thy Filthiness Out Of Thee

"Filthiness" here means moral corruption, not ordinary dirt.

This judgment is not only punishment, it also works like a cleaning.

Something unwanted is being burned away, not just punished for its own sake.

Even a painful judgment can carry out a purifying purpose.

🧼 Filthiness means moral corruption here

🔥 Judgment also works like cleaning

🎯 Something unwanted is being removed

📖 Pain here still serves a purpose

## 🔁 Thou Shalt Know That I Am The LORD

This exact phrase repeats constantly throughout the book of Ezekiel.

It is the real goal behind every judgment described in this chapter.

Jerusalem did not know God rightly while things were comfortable.

Painful consequences become the moment she finally recognizes who He is.

🔁 This phrase repeats throughout Ezekiel

🎯 Recognizing God is the real goal

😌 Comfort had hidden this truth

📖 Pain can finally reveal who God is

# Ezekiel 22:17-22
# 🔥 Israel Becomes Dross In The Furnace
---
## 🔥 The House Of Israel Is To Me Become Dross

"Dross" is the waste material that rises to the top when metal is melted down.

It looks like metal but has no real value left in it.

God is saying Israel now resembles that worthless leftover, not the valuable metal itself.

A nation meant to shine like silver had become something to be thrown away.

🔥 Dross means worthless metal waste

👀 It looks like metal but is not

💎 Israel should have been valuable silver

📖 Worth had been replaced with waste

## 🔩 Brass, And Tin, And Iron, And Lead

Pure silver was considered the valuable metal in the ancient world.

Brass, tin, iron, and lead were common, cheaper metals mixed in with it.

Naming all four metals describes a nation fully corrupted, not partly.

There was no untouched pure silver left to find underneath the mixture.

🥈 Silver was the valuable metal here

🔩 Brass, tin, iron, lead were cheap mix

💯 Four metals show total corruption

📖 No pure silver remained underneath

## 🏙️ I Will Gather You Into The Midst Of Jerusalem

God is about to turn the city itself into the furnace of this metaphor.

Gathering everyone into Jerusalem describes a coming siege, not a safe reunion.

The city that should have been a refuge becomes the place of melting instead.

Jerusalem's own walls would trap her people inside the judgment.

🏙️ Jerusalem itself becomes the furnace

🪖 Gathering here describes a coming siege

🧱 Her walls now trap instead of protect

📖 Refuge turns into the place of judgment

## ⚒️ To Blow The Fire Upon It, To Melt It

A refiner gathers mixed metals together and blows air onto the fire to raise the heat.

Higher heat forces the metal to separate from its waste material.

This verse walks through that entire process step by step.

God is describing exactly how this coming judgment will work, like a planned refining.

🔥 Blowing air raises the furnace heat

⚒️ Heat forces metal apart from waste

📋 This verse walks through each step

📖 Judgment here follows a real process

## 😠 Gather You In Mine Anger And In My Fury

God places Himself directly inside His own metaphor.

He is the refiner gathering the metal into the furnace.

"Anger" and "fury" are not out of control emotions here.

They describe the controlled heat needed to finish this refining process.

🔥 God plays the role of refiner

😠 Anger and fury are not random

🎯 This heat is controlled, not wild

➡️ Judgment here is deliberate, not reckless

## 🚫 I Will Leave You There, And Melt You

There is no rescue planned partway through this process.

God says plainly that He will leave them inside the furnace.

The melting is meant to run its full course.

A refining that gets interrupted early never actually separates anything.

🚫 No early rescue is planned here

🔥 The melting must run its course

⏳ Interrupting it early would fail

📖 Full judgment finishes what it starts

## 🔁 Blow Upon You In The Fire Of My Wrath

This verse repeats the same image from verse twenty on purpose.

Repetition here confirms the sentence will not be softened or reversed.

"Blow upon you" places the people themselves directly inside the flame.

This was never a distant, impersonal threat.

🔁 Repetition confirms the sentence stands

🔥 The people are inside the flame

🚫 This threat was never distant

📖 God's word here does not soften

## 🎯 Ye Shall Know That I The LORD

The furnace image ends on the same note as the section before it.

Recognizing God is still the real point of this entire ordeal.

A nation that forgot God in comfort finally remembers Him in the fire.

That recognition, even this painfully, was always the goal.

🎯 Recognizing God remains the real goal

😔 Comfort had let them forget Him

🔥 Fire succeeded where comfort had failed

📖 The goal was always to be known

# Ezekiel 22:23-26
# 👑 Prophets And Priests Fail The Land
---
## 🌧️ The Land That Is Not Cleansed, Nor Rained Upon

God's law had long promised rain as a blessing for covenant faithfulness.

Withholding rain was one of the specific warnings for covenant unfaithfulness.

Calling the land unrained upon points directly back to that old warning.

This was not random bad weather, it was a broken promise coming due.

🌧️ Rain was tied to covenant blessing

⚠️ Withheld rain was a named warning

📜 This fulfills an old promise

📖 Not random weather, but broken covenant

## 🦁 Like A Roaring Lion Ravening The Prey

"Conspiracy" here means the prophets were working together, not failing individually.

A roaring lion tearing apart prey describes violent, predatory hunger.

These prophets used their position to devour the very people who trusted them.

Their failure was coordinated, not accidental.

🤝 Conspiracy means they worked together

🦁 A lion pictures violent hunger

😨 They preyed on their own people

📖 This failure was planned, not accidental

## 🦁 They Have Devoured Souls

"Devoured souls" pictures prophets consuming human lives the way a predator eats prey.

These were not outsiders attacking the nation from a distance.

The very people meant to guide Israel toward God were destroying her from within.

Spiritual leaders can do more damage than any outside enemy.

🦁 Devoured pictures predator and prey

👤 Prophets harmed their own people

🏠 The damage came from within

📖 Bad leaders can outdo outside enemies

## 💰 Made Her Many Widows

These prophets did not only lie, they also profited from the chaos they caused.

Taking treasure and precious things describes outright theft hidden behind a religious title.

Making many widows means their lies and greed led directly to men's deaths.

A corrupt prophet's words carried real, deadly consequences for real families.

💰 They stole under a religious title

🩸 Their lies led to real deaths

👩 Widows were left behind by this

📖 False words brought real consequences

## 📜 Her Priests Have Violated My Law

Priests were specifically trained to know and guard God's law better than anyone else.

Violating that law was not a case of simple ignorance.

These were the exact people responsible for teaching it correctly to others.

Their failure carried more weight because of their position, not less.

📜 Priests were trained to know the law

🎓 This was not simple ignorance

👨‍🏫 They were meant to teach others

➡️ Position made their failure worse

## ⚖️ Put No Difference Between The Holy And Profane

Teaching the difference between holy and common things was a priest's basic daily job.

The same was true for teaching clean from unclean under the law.

These priests simply stopped doing the most basic part of their calling.

Without that teaching, the whole nation lost its sense of right and wrong.

⚖️ Teaching these differences was basic duty

🙅 Priests stopped doing this job

🌀 The nation lost its moral sense

📖 Neglected teaching has national consequences

## 👁️ Hid Their Eyes From My Sabbaths

"Hid their eyes" means they deliberately chose not to see what they already knew.

This was not an honest mistake or confusion about the law.

God says plainly that their neglect profaned, or disgraced, His own name.

Leaders who look away still carry responsibility for what they refuse to see.

👁️ Hid their eyes means willful blindness

🚫 This was not honest confusion

😔 Their neglect disgraced God's name

📖 Looking away does not remove blame

# Ezekiel 22:27-31
# 🧱 No Man To Stand In The Gap
---
## 🐺 Like Wolves Ravening The Prey

Earlier this chapter already compared the prophets to a roaring lion.

Now the princes get their own predator image, wolves hunting prey.

Wolves hunt in coordinated packs, picturing organized rather than random violence.

Leadership across this entire city had turned predatory from top to bottom.

🐺 Wolves describe organized, coordinated violence

🦁 Prophets were lions, princes are wolves

👑 Leadership itself had turned predatory

📖 Corruption ran from top to bottom

## 🧱 Daubed Them With Untempered Morter

"Daubed with untempered morter" means covering a cracked wall with weak, unmixed plaster.

It looks repaired on the surface while the real damage stays hidden underneath.

Ezekiel used this exact same image back in chapter thirteen for false prophets.

These prophets were papering over real danger instead of warning anyone about it.

🧱 Untempered morter means weak, fake plaster

👀 It hides damage instead of fixing it

🔁 Chapter thirteen used this same image

📖 False comfort covers real danger

## 🎭 Seeing Vanity, And Divining Lies

These prophets claimed to speak for God when God had said nothing at all.

"Vanity" here means empty, worthless visions with no real substance.

Borrowing God's own name made their lies sound far more convincing.

Using God's name falsely is treated as a serious offense throughout scripture.

🎭 They claimed to speak for God falsely

🫧 Vanity means empty, worthless visions

🗣️ God's name made lies convincing

📖 False claims in God's name are serious

## 👥 The People Of The Land Have Used Oppression

This verse shifts blame away from leaders and onto ordinary people.

Corruption in this city was never only a problem at the top.

Everyday citizens had also learned to oppress and rob their own neighbors.

A whole society had absorbed the same pattern as its failed leaders.

👥 Blame shifts to ordinary citizens here

🏙️ Corruption was not only at the top

🤝 Neighbors learned to oppress neighbors

➡️ A whole society copied its leaders

## 🌿 Make Up The Hedge, And Stand In The Gap

A hedge around a field in the ancient world kept dangerous animals out.

A gap in that hedge was the one open, exposed, vulnerable point.

Standing in the gap pictures someone willing to physically block the danger there.

God was looking for even one person willing to intercede for this land.

🌿 A hedge kept danger out of a field

🕳️ A gap was the exposed weak point

🛡️ Standing there means blocking danger personally

📖 God wanted one person to intercede

## 📏 But I Found None

This is one of the shortest and heaviest lines in the entire book.

Abraham once interceded for Sodom, and Moses once interceded for Israel at Sinai.

This time, after searching the whole land, God found no one at all.

Three short words describe the complete absence of anyone willing to stand up.

📏 A short line carrying heavy weight

🙏 Abraham and Moses once interceded

🔍 This time God found no one

📖 No one stood up for this land

## ⚖️ Their Own Way Have I Recompensed Upon Their Heads

This final verse closes the chapter the way it opened, with full responsibility on the people.

"Recompensed upon their heads" means the consequences they receive match exactly what they chose to do.

This was never random punishment or divine overreaction.

What they sowed throughout the chapter, they now reap in full.

🔥 Indignation and wrath both poured out fully

⚖️ Recompensed means consequences matched the choice

🌱 They reap exactly what they sowed

📖 No punishment here was random or unfair
`.trim();

export const EZEKIEL_TWENTY_TWO_PERSONAL_SECTIONS = parseEzekielTwentyTwoRawNotes(EZEKIEL_TWENTY_TWO_RAW_NOTES);
