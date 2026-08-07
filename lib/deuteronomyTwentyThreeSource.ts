export type DeuteronomyTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyTwentyThreeRawNotes(rawText: string): DeuteronomyTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 23:${startVerse}` : `Deuteronomy 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Deuteronomy 23 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_TWENTY_THREE_RAW_NOTES = `# Deuteronomy 23:1-3
# 🚪 Who May Enter The Assembly
---
## 🩹 He That Is Wounded In The Stones

"Wounded in the stones" means his reproductive organs were injured.

"Privy member cut off" means they were removed entirely.

Together these describe what we now call castration.

Many pagan temples used castrated priests to serve their gods.

This law kept that specific practice separate from Israel's worship.

Being barred here was about worship practice, not personal worth.

🩹 Wounded in the stones means injured organs

✂️ Privy member cut off means removed entirely

🛕 Pagan priests were often castrated

📖 The law protected worship, not worth

---
## 🏛️ Congregation Of The LORD

The "congregation of the LORD" was Israel's formal worship assembly.

It gathered for national events, feasts, and covenant renewal.

Being excluded did not mean a person was cut off from God.

It meant a person could not take part in that specific formal gathering.

Israel's whole camp still lived alongside these people day to day.

🏛️ Congregation means Israel's formal worship assembly

🎉 It gathered for feasts and events

🤍 Exclusion did not mean rejection by God

📖 Daily life still included everyone

---
## 🚫 A Bastard Shall Not Enter

"Bastard" here does not mean any child born to unmarried parents.

The Hebrew word points to a child born from a forbidden union, like incest.

This law was not aimed at children in general.

It targeted the specific sin that produced that child.

Even so, the child, not the parents, carried this exclusion.

🚫 Bastard does not mean any unmarried birth

⚠️ It means a child from a forbidden union

👶 The law targeted the sin, not children

📖 The child still carried the exclusion

---
## 🔟 Even To His Tenth Generation

"Tenth generation" was a Hebrew way of saying forever.

Ancient writers often used the number ten to mean completeness.

This was not a countdown that would run out after ten generations.

It meant the exclusion had no real end point.

🔟 Tenth generation is a Hebrew idiom

♾️ Ten often meant completeness, not a count

🚫 This exclusion had no real end

📖 The number carries weight, not math

---
## 🗺️ An Ammonite Or Moabite

Ammon and Moab were nations east of Israel across the Jordan.

Both nations descended from Lot through his own daughters.

Genesis nineteen records how that family line began, after Sodom was destroyed.

Israel and these nations shared real blood ties, yet stayed distant enemies.

🗺️ Ammon and Moab sat east of Israel

👨‍👩‍👧 Both descended from Lot's own daughters

📜 Genesis nineteen records how that began

📖 Blood ties did not erase real conflict

---
## ⏳ For Ever

Verse three adds "for ever" right after "tenth generation."

That makes this exclusion stronger than the bastard's exclusion in verse two.

Ammon and Moab receive the harshest limit in this whole law.

Later verses will show Edom and Egypt were treated very differently.

⏳ For ever strengthens the tenth generation line

⚖️ Ammon and Moab get the harshest limit

🆚 Not every excluded nation was treated the same

📖 The next verses explain exactly why

# Deuteronomy 23:4-8
# 🐫 Why Ammon And Moab Were Barred
---
## 🍞 Met You Not With Bread And Water

Travelers in the ancient world depended on nearby towns for food and water.

Refusing that basic hospitality to a vulnerable group was a serious insult.

Israel had just left Egypt with no supply lines of their own.

Ammon and Moab let a whole nation go hungry and thirsty on purpose.

🍞 Bread and water meant basic hospitality

🚷 Refusing it was a serious insult

🏜️ Israel had no supply lines yet

📖 Ammon and Moab withheld help on purpose

---
## 💰 Hired Against Thee Balaam The Son Of Beor

Moab paid Balaam, a prophet for hire, to curse Israel.

Numbers twenty two through twenty four tells that whole story.

Pethor sat in Mesopotamia, far northeast of where Israel was camped.

Balaam traveled a long distance because the payment was large.

💰 Balaam was a prophet paid to curse

📜 Numbers twenty two tells the story

🗺️ Pethor sat far off in Mesopotamia

📖 A high price bought a long trip

---
## 🚫 The LORD Thy God Would Not Hearken Unto Balaam

God refused to let the hired curse take effect.

Balaam wanted to curse Israel for the payment offered.

God overruled that plan before it could happen.

Money could not buy power over God's chosen people.

🚫 God refused to hear Balaam's curse

💵 Balaam wanted the payment badly

🛡️ God overruled the plan completely

📖 No price could buy power over Israel

---
## 🔄 Turned The Curse Into A Blessing

God did not just block the curse.

He reversed it completely instead.

Balaam ended up blessing Israel instead of cursing them.

The reason given is simple, the LORD loved Israel.

A plan built to destroy Israel became proof of God's love.

🔄 God reversed the curse completely

🗣️ Balaam blessed Israel instead

❤️ The reason was God's love

📖 An attack became proof of love

---
## 🚷 Thou Shalt Not Seek Their Peace Nor Their Prosperity

Israel was told never to pursue a friendly treaty with these two nations.

This stands out because Israel later made peace with other former enemies.

The ban applied specifically and permanently to Ammon and Moab.

It closes out the reasoning that began back in verse four.

🚫 No treaty was ever allowed here

⚖️ Other nations later received different treatment

🔒 The ban applied to Ammon and Moab only

📖 This closes the reasoning from verse four

---
## 💔 Thou Shalt Not Abhor An Edomite, For He Is Thy Brother

"Abhor" means to hate someone with disgust.

Edomites descended from Esau, Jacob's own twin brother.

That family tie set Edom apart from Ammon and Moab.

Israel could still resist Edom in a real conflict.

Even so, they were never to hold Edom in contempt.

💔 Abhor means hate with disgust

👬 Edomites descended from Esau, Jacob's twin

🆚 Family ties set Edom apart

📖 Conflict never excused real contempt

---
## 🏠 Thou Wast A Stranger In His Land

Egypt had once given Israel's family a home during a famine.

Joseph's story in Genesis explains how that welcome began.

Egypt later enslaved Israel, yet the earlier kindness was not forgotten.

Israel was told to remember the good, not only the harm.

🏠 Egypt once gave Israel's family a home

📜 Joseph's story explains how it began

⛓️ Slavery came later, kindness came first

📖 Remember good, not only harm

---
## 🔢 In Their Third Generation

Edom and Egypt were given a path back into full worship.

Their children could enter after only three generations, not ten.

That gap shows real mercy compared to Ammon and Moab's total ban.

God's judgments here were specific, not identical across every nation.

🔢 Third generation opened a path back

⚖️ Far shorter than the ten generation ban

🤍 Real mercy shown to Edom and Egypt

📖 Judgment was specific, not identical

# Deuteronomy 23:9-14
# ⛺ Keeping The War Camp Holy
---
## ⚔️ When The Host Goeth Forth Against Thine Enemies

"The host" means Israel's army gathered for battle.

This whole section governs life inside a moving war camp.

These rules applied even during the chaos and danger of war.

Holiness was not suspended just because the nation was fighting.

⚔️ Host means Israel's gathered army

⛺ These rules governed the war camp

🌀 They applied during real danger

📖 Holiness did not pause for war

---
## 🧹 Keep Thee From Every Wicked Thing

This is a broad command covering the whole camp's conduct.

It is placed at the start of the section on purpose.

Everything that follows explains specific wicked things to avoid.

The general command comes first, the details come next.

🧹 A broad command opens the section

📋 Specific rules follow right after

🎯 General command, then real details

📖 Order and holiness were tied together

---
## 🌙 Uncleanness That Chanceth Him By Night

This describes a nocturnal emission, a normal bodily event.

It made a man ceremonially unclean under Israel's law.

Ceremonial uncleanness was not the same thing as sin.

It simply meant a temporary block from full camp life.

🌙 This describes a normal nighttime event

🚫 It caused ceremonial uncleanness

❌ Uncleanness here was not sin

📖 It only meant a temporary block

---
## 🚶 He Shall Go Abroad Out Of The Camp

"Go abroad" simply means to step outside the camp boundary.

This was not a punishment.

It was a required pause until he was clean again.

The camp's holiness mattered more than personal convenience.

🚶 Go abroad means step outside camp

🚫 This was not a punishment

⏳ It was a required pause

📖 Holiness outweighed personal convenience

---
## 💧 He Shall Wash Himself With Water

Washing with water restored ceremonial cleanness after the day passed.

The timing was specific, evening, right as the sun went down.

Only after washing could the man return to camp.

The ritual was simple, but the rule was strict.

💧 Washing restored ceremonial cleanness

🌇 Evening was the required timing

🚪 Only then could he return

📖 Simple ritual, strict requirement

---
## 🛠️ Thou Shalt Have A Paddle Upon Thy Weapon

A "paddle" here was a small digging tool, like a trowel.

Soldiers carried it alongside their actual weapons.

It was meant for one very practical purpose.

That purpose is explained in the very next verse.

🛠️ Paddle means a small digging tool

🎒 Soldiers carried it with their weapons

🎯 It served one practical purpose

📖 The next verse explains why

---
## 🕳️ Thou Shalt Dig Therewith, And Cover That Which Cometh From Thee

Soldiers had to dig a hole and bury their own waste.

This kept the entire camp physically clean during a long war.

A large army staying in one place for weeks needed real sanitation.

God cared about basic hygiene, not only ritual purity.

🕳️ Soldiers had to bury their waste

🧼 This kept the whole camp clean

⛺ Long camps needed real sanitation

📖 God cared about hygiene, not only ritual

---
## 👣 The LORD Thy God Walketh In The Midst Of Thy Camp

God Himself was present inside Israel's war camp.

That presence is the real reason behind every rule in this section.

These were not random hygiene laws invented by soldiers.

They existed because a holy God was walking among them.

👣 God walked inside the war camp

🎯 That presence explains every rule here

🚫 These were not random soldier customs

📖 A holy God required a holy camp

---
## 🛡️ That He See No Unclean Thing In Thee

God's presence in the camp brought protection and victory.

That presence could also withdraw if the camp stayed unclean.

"Turn away" describes God removing His protective presence.

The whole chapter's hygiene laws protected something far bigger than health.

🛡️ God's presence brought real protection

⚠️ Uncleanness put that presence at risk

🚪 Turn away means God's presence leaving

📖 These laws protected more than health

# Deuteronomy 23:15-16
# 🏃 Protecting The Runaway Servant
---
## 🏃 The Servant Which Is Escaped From His Master Unto Thee

This law is about a servant fleeing a foreign master into Israel.

It is not about Israel's own servant release laws.

Those rules already appear earlier in Deuteronomy chapter fifteen.

This case covers someone arriving from outside the nation entirely.

🏃 This covers a servant fleeing a foreign master

🚫 It is not Israel's own release law

📜 That law already appears in chapter fifteen

📖 This case is about outside arrivals

---
## 📜 Thou Shalt Not Deliver Him Unto His Master

Other ancient law codes required returning an escaped servant.

The famous Hammurabi code even ordered death for anyone who hid one.

Israel's law flips that pattern completely.

Here, protecting the escaped person came first.

📜 Other ancient codes required returning servants

⚰️ Hammurabi's code even threatened death

🔄 Israel's law reversed that pattern

📖 Protection came before property claims

---
## 🚪 In One Of Thy Gates, Where It Liketh Him Best

"Gates" refers to Israelite towns, since gates marked a town's entrance.

The servant could choose freely where inside Israel to settle.

No one could assign him a place against his will.

This was real freedom, not just safety from being returned.

🚪 Gates means an Israelite town

🗺️ He could choose where to live

🙅 No one could assign his place

📖 Freedom went beyond simple safety

---
## ⛓️ Thou Shalt Not Oppress Him

Israel had lived under harsh oppression for centuries in Egypt.

This command asked them to remember that experience.

The escaped servant deserved better treatment than Israel once received.

A rescued nation was told to become a place of rescue.

⛓️ Israel remembered oppression from Egypt

🤝 That memory shaped this command

🛡️ The servant deserved fair treatment

📖 A rescued nation became a rescuer

# Deuteronomy 23:17-18
# 🚫 No Sacred Prostitution In Israel
---
## 🛕 There Shall Be No Whore Of The Daughters Of Israel

This law bans a specific pagan worship practice, sacred prostitution.

Nearby Canaanite religions used sex acts as part of fertility worship.

Worshipers believed this ritual could persuade their gods to bless crops.

Israel's God rejected that entire system of worship.

🛕 Canaanite worship used sex as ritual

🌾 Worshipers linked it to crop fertility

🚫 Israel's God rejected that whole system

📖 True worship never required this practice

---
## 🛕 Nor A Sodomite Of The Sons Of Israel

This word describes a male cult prostitute in pagan temple worship.

It names a specific religious role, not a broad category of people.

The ban matched the one just given for women in the same system.

Both bans target the same pagan practice from two directions.

🛕 This names a male temple role

🎯 It targets one specific practice

⚖️ It matches the ban just given

📖 One pagan system, banned from both sides

---
## 💰 The Hire Of A Whore, Or The Price Of A Dog

"The price of a dog" meant payment made to a male cult prostitute.

Calling it a "dog" was a harsh insult toward that role.

Both kinds of payment were forbidden as offerings to God.

Money earned through pagan ritual could not buy God's favor.

💰 Price of a dog means a prostitute's pay

😠 Dog was a harsh insult here

🚫 Neither payment could enter God's house

📖 That money could not buy God's favor

---
## 💢 It Is Even Both Abomination Unto The LORD Thy God

"Abomination" is the Bible's strongest word for something detestable to God.

It appears again and again across the law for the worst offenses.

These two verses group both practice and payment under that one word.

God rejected the whole system, not just parts of it.

💢 Abomination is the strongest word used

🔁 It marks the law's worst offenses

🎯 Both practice and payment are included

📖 God rejected the whole system

# Deuteronomy 23:19-20
# 💰 Lending Without Usury To Your Brother
---
## 📈 Thou Shalt Not Lend Upon Usury To Thy Brother

"Usury" means charging interest on top of a loan.

"Brother" here means a fellow Israelite, part of the same covenant family.

Loans between Israelites were meant to help a neighbor in need.

Charging interest turned a rescue into a profit opportunity.

📈 Usury means charging interest on a loan

🤝 Brother means a fellow Israelite

🆘 Loans were meant to help neighbors

📖 Interest turned rescue into profit

---
## 🍞 Usury Of Money, Usury Of Victuals

"Victuals" is an old word for food supplies.

This law covered more than just cash loans.

Lending grain or food with interest attached was banned too.

The rule reached every form of profit taken off a neighbor's need.

🍞 Victuals means food supplies

💵 The law covered more than cash

🌾 Food loans with interest were banned

📖 Every form of neighbor profit was covered

---
## 🌍 Unto A Stranger Thou Mayest Lend Upon Usury

This does not describe unfair treatment of foreigners.

A "stranger" here was usually a foreign trader, not a needy neighbor.

That kind of loan looked more like a normal business deal.

The covenant protection was specifically for the family of Israel.

🌍 Stranger here often meant a trader

💼 That loan worked like a business deal

🚫 This was not unfair treatment

📖 Covenant care was for Israel's own family

---
## 🙌 That The LORD Thy God May Bless Thee

Obeying this law was tied directly to a promised blessing.

The blessing was linked to entering and living in the land.

Caring for a neighbor instead of profiting off them pleased God.

Economic fairness inside Israel was part of its worship, not separate from it.

🙌 Obedience here was tied to blessing

🗺️ The blessing pointed toward the land

❤️ Caring for neighbors pleased God

📖 Fair economics was part of worship

# Deuteronomy 23:21-23
# 🗣️ Keeping A Vow You Made
---
## 🗣️ When Thou Shalt Vow A Vow Unto The LORD Thy God

A "vow" was a voluntary promise made directly to God.

No one was ever required to make one.

Once spoken, though, a vow became fully binding.

This section explains exactly what that binding promise required.

🗣️ A vow is a voluntary promise

🙅 No one was required to make one

🔒 Once spoken, it became binding

📖 This section explains that requirement

---
## ⏳ Thou Shalt Not Slack To Pay It

"Slack" means to delay or put something off.

God expected a vow to be paid without stalling.

The text warns that God Himself would require payment.

Delay here counted as a real sin, not a small mistake.

⏳ Slack means delay or putting off

📆 God expected the vow paid quickly

⚠️ God would require payment Himself

📖 Delay counted as a real sin

---
## 🙅 But If Thou Shalt Forbear To Vow, It Shall Be No Sin

Choosing not to make a vow was never sinful.

This verse protects that freedom clearly.

The sin was never in staying silent.

The sin was in speaking a promise and then breaking it.

🙅 Silence about a vow was never sin

🛡️ This verse protects that freedom

🗣️ The danger was breaking a spoken promise

📖 Words carried real weight once spoken

---
## 👄 That Which Is Gone Out Of Thy Lips

This phrase means whatever a person has already spoken out loud.

In this culture, a spoken promise carried the weight of a signed contract.

There was no quiet way to walk it back later.

Speech itself became binding the moment it left a person's mouth.

👄 Gone out of thy lips means spoken aloud

📜 Spoken promises worked like signed contracts

🚫 There was no quiet way back

📖 Speech became binding once spoken

---
## 🎁 According As Thou Hast Vowed, A Freewill Offering

A "freewill offering" was a gift given by choice, not by command.

Choosing to give did not make the promise any less serious.

Once offered to God, the gift had to be delivered in full.

Free choice at the start still demanded full follow through at the end.

🎁 Freewill offering means a chosen gift

✅ Choice did not lower the stakes

📦 The gift still had to be delivered

📖 Free choice still demanded follow through

# Deuteronomy 23:24-25
# 🍇 Eating From A Neighbor's Field
---
## 🍇 Thou Mayest Eat Grapes Thy Fill At Thine Own Pleasure

Israel's law let a hungry traveler eat freely from any vineyard.

This protected poor or traveling people from real hunger.

The right applied to eating on the spot, not to hoarding food.

Generosity toward strangers was built directly into the land laws.

🍇 Travelers could eat freely from vineyards

🥺 This protected hungry or poor people

🍽️ The right covered eating, not hoarding

📖 Generosity was built into the land laws

---
## 🧺 But Thou Shalt Not Put Any In Thy Vessel

A "vessel" here means a basket or container for carrying food.

Eating on the spot was generosity.

Filling a container to carry away was theft.

That one boundary kept a kind law from becoming an invitation to steal.

🧺 Vessel means a basket or container

🤲 Eating on the spot was generosity

🚫 Filling a container counted as theft

📖 One boundary kept the law honest

---
## 🌾 Thou Mayest Pluck The Ears With Thine Hand

The same generous rule applied to a neighbor's grain field.

A hungry traveler could pluck grain heads and eat by hand.

Centuries later, Jesus's own disciples used this exact law.

The gospels record them plucking grain on a Sabbath walk.

🌾 The same rule covered grain fields

✋ Travelers could pluck grain by hand

📖 The gospels show disciples using this law

➡️ An old law still mattered centuries later

---
## 🔪 Thou Shalt Not Move A Sickle Unto Thy Neighbour's Standing Corn

A "sickle" was a curved tool used for harvesting grain in bulk.

Using a hand meant a small personal snack.

Using a sickle meant harvesting a share of the actual crop.

The whole chapter shares one idea here.

Take only what you need, never what belongs to someone else.

🔪 Sickle means a curved harvesting tool

✋ A hand meant a small snack

🌾 A sickle meant taking a real share

📖 Take what you need, not another's share
`.trim();

export const DEUTERONOMY_TWENTY_THREE_PERSONAL_SECTIONS = parseDeuteronomyTwentyThreeRawNotes(DEUTERONOMY_TWENTY_THREE_RAW_NOTES);
