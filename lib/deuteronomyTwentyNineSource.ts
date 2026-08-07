export type DeuteronomyTwentyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyTwentyNineRawNotes(rawText: string): DeuteronomyTwentyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyTwentyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+29:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 29 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+29:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+29:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 29 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 29,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 29:${startVerse}` : `Deuteronomy 29:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Deuteronomy 29 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_TWENTY_NINE_RAW_NOTES = `# Deuteronomy 29:1-3
# 🤝 The Covenant Renewed In Moab
---
## 📜 These Are The Words Of The Covenant

"Covenant" means a binding agreement sealed by both sides.

This one is made in the land of Moab, not at Sinai.

Moses already sealed a covenant with the first generation forty years earlier.

That generation died in the wilderness for their unbelief.

This fresh covenant is for the generation about to enter Canaan.

Each generation must own the agreement for itself.

📜 Covenant means a binding agreement
🏜️ Made in Moab, not Sinai
⏳ Written for the next generation
📖 Each generation must own the covenant

## ⛰️ Beside The Covenant Which He Made With Them In Horeb

"Horeb" is another name for Mount Sinai, the same mountain.

The word "beside" here means added to, not instead of.

This new covenant does not cancel the one from Sinai.

It builds directly on top of it.

The Ten Commandments and the laws already given still stand.

Moab simply adds a fresh, personal agreement on top of the old one.

⛰️ Horeb is another name for Sinai
➕ Beside means added, not replacing
📜 The Sinai laws still stand
📖 Moab adds a personal layer on top

## 👁️ Ye Have Seen All That The LORD Did Before Your Eyes

This generation did not hear about the exodus secondhand.

They watched it happen with their own eyes.

Some in the crowd were children during the plagues and the Red Sea.

Others are old enough to remember every detail firsthand.

Moses appeals to what they personally witnessed, not what they were told.

Firsthand memory carries a weight that no secondhand story ever could.

👁️ This generation witnessed it firsthand
👶 Some were children during the exodus
🗣️ Moses appeals to memory, not rumor
📖 Firsthand memory carries unique weight

## ⚡ The Great Temptations Which Thine Eyes Have Seen, The Signs, And Those Great Miracles

"Temptations" here does not mean personal urges to sin.

It means the trials and tests God put Pharaoh and Egypt through.

The ten plagues counted as public proof of God's power.

"Signs" and "miracles" describe the same events from a different angle.

Israel watched Egypt's gods and army fail in front of them.

These were not private struggles.

They were a whole nation watching history proven true.

⚡ Temptations means trials, not personal urges
🐸 The ten plagues proved God's power
👀 Israel watched it happen publicly
📖 A nation witnessed history, not rumor

# Deuteronomy 29:4-6
# 🥾 Forty Years Of Provision
---
## 👂 Yet The LORD Hath Not Given You An Heart To Perceive

Seeing a miracle and understanding it are not the same thing.

Israel watched the plagues, the sea, and the fire on the mountain.

Even so, real spiritual understanding had not yet taken root in them.

"Heart to perceive" means the inner capacity to truly grasp what God did.

Miracles alone do not automatically produce faith.

Faith still requires God opening the heart, not just the eyes.

👂 Seeing is not the same as understanding
🌾 Israel witnessed miracles firsthand
💗 Heart to perceive means real inner grasp
📖 Faith requires more than watching miracles

## 🥾 Your Clothes Are Not Waxen Old Upon You, And Thy Shoe Is Not Waxen Old Upon Thy Foot

"Waxen old" means worn out or falling apart from age.

A forty year journey should have destroyed ordinary clothing many times over.

Israel's clothes and sandals simply did not wear out.

This detail is easy to miss.

It shows God's care even in the smallest daily needs.

God did not only rescue Israel once.

He kept sustaining them every single day for forty years.

🥾 Waxen old means worn out
👕 Clothes lasted forty years without wearing out
🕰️ A small detail with a big meaning
📖 God sustained them daily, not only once

## 🍞 Ye Have Not Eaten Bread, Neither Have Ye Drunk Wine Or Strong Drink

This does not mean Israel ate nothing at all.

It means they lived without the normal foods of settled life.

No wheat fields meant no bread baked from grain.

No vineyards meant no wine.

Manna filled that gap every single morning instead.

Their food came from heaven, not from farms they had time to plant.

🍞 Israel had no bread from grain
🍇 No vineyards meant no wine
🥣 Manna filled the daily gap instead
📖 Their food came from heaven, not farms

## 🙏 That Ye Might Know That I Am The LORD Your God

Every strange provision in the wilderness had one real purpose.

The manna, the durable clothes, and the guidance were never random.

They were built to teach Israel who was actually providing for them.

Survival was never really the point.

Knowing God personally was always the goal behind the miracle.

🙏 Every provision had one real purpose
🥣 The manna was a teaching tool
🧭 Survival was never the actual goal
📖 God wanted to be personally known

# Deuteronomy 29:7-9
# ⚔️ A Land Already Won
---
## ⚔️ Sihon The King Of Heshbon, And Og The King Of Bashan, Came Out Against Us Unto Battle

Sihon and Og were two Amorite kings east of the Jordan River.

Both had already refused Israel safe passage through their land.

Both attacked Israel first and lost everything as a result.

Numbers 21 and Deuteronomy 2 and 3 tell the full story of these battles.

Moses reminds the people that this victory already happened before they even cross the Jordan.

⚔️ Sihon and Og were Amorite kings
🗺️ They ruled land east of the Jordan
🛡️ Both attacked Israel first and lost
📖 Victory already happened before crossing Jordan

## 🏞️ We Took Their Land, And Gave It For An Inheritance Unto The Reubenites, And To The Gadites, And To The Half Tribe Of Manasseh

These three groups chose to settle east of the Jordan instead of crossing over.

Their land had excellent grazing, which fit their large herds and flocks.

They still had to help the other tribes conquer Canaan first.

This inheritance was a preview of the promise for the rest of Israel.

Two and a half tribes already had proof the promise was real.

🏞️ Reuben, Gad, and half Manasseh settled early
🐑 The land suited their large herds
🤝 They still had to help conquer Canaan
📖 Their inheritance previewed the promise for all

## 🌱 Keep Therefore The Words Of This Covenant, And Do Them, That Ye May Prosper

Obedience here is not offered as a suggestion.

It is tied directly to whether Israel prospers in the land.

"Do them" means actually living out the covenant, not just agreeing to it.

The land already won from Sihon and Og backs up the promise.

God delivers first, then calls for a response of obedience.

🌱 Obedience is tied to prosperity here
🗣️ Do them means action, not agreement
🏆 Sihon and Og already proved the promise
📖 God delivers first, then asks obedience

# Deuteronomy 29:10-13
# 🧍 Everyone Stands Before The LORD
---
## 🧍 Ye Stand This Day All Of You Before The LORD Your God

This is a formal covenant ceremony, not a casual gathering.

The whole nation physically stands together for it.

Standing before the LORD was a legal posture, like standing before a judge.

No one in Israel is exempt or represented by someone else.

Every single person answers for themselves in this moment.

🧍 This is a formal covenant ceremony
⚖️ Standing before the LORD is a legal posture
👥 The whole nation stands together
📖 Every person answers for themselves

## 🎖️ Your Captains Of Your Tribes, Your Elders, And Your Officers

"Captains" here means military and tribal leaders, not police.

"Elders" were respected older men who settled disputes and gave counsel.

"Officers" managed practical matters like labor assignments and records.

Naming each role shows that Israel's whole leadership stands accountable together.

No level of leadership escapes the covenant's demands.

🎖️ Captains means military and tribal leaders
👴 Elders settled disputes and gave counsel
📋 Officers managed practical daily matters
📖 Every leadership level is held accountable

## 👶 Your Little Ones, Your Wives, And Thy Stranger That Is In Thy Camp

This covenant was never limited to grown Israelite men.

Children too young to fully understand it are still included.

Wives stand as full participants, not as an afterthought.

"Stranger" means a foreigner living among Israel, not a citizen by birth.

The covenant reaches every person living inside the camp, not just its leaders.

👶 Even children are included here
👩 Wives are full participants, not afterthoughts
🌍 Stranger means a foreigner living among Israel
📖 The covenant reaches everyone in camp

## 🪓 From The Hewer Of Thy Wood Unto The Drawer Of Thy Water

This idiom names the lowest working class in the camp.

A "hewer of wood" chopped firewood for a living.

A "drawer of water" hauled water, one of the hardest daily chores.

Joshua 9 later uses this exact phrase for the Gibeonites, Israel's lowest servants.

Even the humblest laborer in the camp stands included in this covenant.

🪓 Hewer of wood means a firewood chopper
💧 Drawer of water means a water hauler
🔗 Joshua 9 uses this same phrase later
📖 Even the lowest laborer is included

## 🤝 That Thou Shouldest Enter Into Covenant With The LORD Thy God, And Into His Oath

A covenant is a binding agreement between two parties.

An "oath" adds a sworn promise on top of that agreement.

Entering both means Israel is not just listening.

They are actively committing themselves.

This moment is legally and spiritually binding, not merely ceremonial.

Israel signs on with both an agreement and a sworn promise.

🤝 Covenant means a binding agreement
🖋️ Oath adds a sworn promise on top
⚖️ This moment is legally binding
📖 Israel commits, not just listens

## 👑 That He May Establish Thee To Day For A People Unto Himself

This covenant is not only about rules and behavior.

It is about identity.

Israel becomes God's own people through this covenant.

This fulfills the promise first given to Abraham, Isaac, and Jacob.

God is not simply picking a nation.

He is claiming one as his own.

The relationship, not just the law, is the real point of this ceremony.

👑 This covenant creates identity, not just rules
📜 It fulfills the promise to Abraham
❤️ God claims Israel as his own
📖 Relationship is the real point here

# Deuteronomy 29:14-15
# 🕰️ A Promise For Those Not Yet Born
---
## 🌍 Neither With You Only Do I Make This Covenant And This Oath

A reader might assume this covenant only bound the people physically present.

Moses corrects that assumption directly.

The agreement was never meant to stop with one generation.

It was designed to reach forward through time.

This is a promise every future generation inherits, not just witnesses.

🌍 The covenant is not limited to one crowd
⏳ It was built to reach forward in time
👪 Future generations inherit it, not just witness it
📖 One agreement binds every generation

## 🔮 Also With Him That Is Not Here With Us This Day

"Him that is not here" points to people not yet born.

It includes children not yet born and generations centuries away.

A reader today is included in the reach of this same promise.

The covenant was never sealed for one crowd alone.

Anyone who reads these words later is still standing inside their reach.

🔮 This reaches beyond the crowd in Moab
👶 It includes generations not yet born
📖 A reader today falls inside its reach
➡️ The covenant was never meant to expire

# Deuteronomy 29:16-19
# ☠️ A Root Of Bitter Poison
---
## 🇪🇬 How We Have Dwelt In The Land Of Egypt

Moses reminds Israel of exactly where they came from.

Egypt was not a neutral place.

It was full of idols and false worship.

Israel lived inside that culture for centuries before the exodus.

Their history with idolatry was long, not a single mistake.

🇪🇬 Egypt shaped Israel's history for centuries
🗿 Egypt was full of idols and false gods
⏳ Their exposure to idolatry was long
📖 This history is the backdrop for the warning

## 🗿 Ye Have Seen Their Abominations, And Their Idols, Wood And Stone, Silver And Gold

"Abominations" means practices God finds deeply offensive, often tied to idol worship.

These idols were carved from wood and stone or cast in silver and gold.

Materials alone could not make a lifeless object into a real god.

Israel had personally watched other nations worship objects that could not act or answer.

The warning that follows grows directly out of what they already witnessed.

🗿 Abominations means deeply offensive idol practices
🪵 Idols were carved wood or cast metal
🤐 Lifeless objects cannot act or answer
📖 Israel witnessed this firsthand already

## ☠️ A Root That Beareth Gall And Wormwood

"Gall" and "wormwood" are both extremely bitter, poisonous plants.

A hidden root can grow underground long before anyone notices the plant above.

This pictures one secretly unfaithful heart growing quietly inside the whole community.

By the time it is visible, the poison has often already spread.

One hidden root of idolatry can eventually poison the entire camp.

☠️ Gall and wormwood are bitter poisons
🌱 A root grows unseen before it shows
🫥 It pictures hidden unfaithfulness in the camp
📖 One hidden root can poison everyone

## 🧠 He Bless Himself In His Heart, Saying, I Shall Have Peace

This is not someone honestly seeking God's blessing.

It is a person privately reassuring themselves that everything is fine.

"Bless himself in his heart" means silent, self given false comfort.

The danger is exactly how quiet this self deception can be.

No one else in the camp may even notice the lie forming.

🧠 This is silent self deception, not prayer
🤫 Bless himself means quiet, private reassurance
👀 No one else notices this happening
📖 Hidden lies are the most dangerous kind

## 🍺 To Add Drunkenness To Thirst

This is an idiom, not a literal description of drinking.

Thirst already signals a real need for something.

Adding drunkenness on top makes that same need far worse instead of better.

It pictures sin that claims to satisfy but only deepens the craving.

Stubborn willfulness never actually solves what it promises to fix.

🍺 This idiom is not about literal drinking
💧 Thirst pictures a real, honest need
🔥 Drunkenness pictures a need made worse
📖 Sin often deepens the craving it fixes

# Deuteronomy 29:20-21
# 🔥 The LORD's Jealousy Kindled
---
## 🚫 The LORD Will Not Spare Him

This is a direct, unqualified statement of judgment.

It follows immediately after the description of secret idolatry.

There is no quiet exception for someone who hides their unfaithfulness well.

Hidden sin does not stay hidden from God.

What is unseen by the camp is still fully seen by the LORD.

🚫 This is a direct statement of judgment
🫥 It follows straight after hidden idolatry
👁️ Hidden sin is not hidden from God
📖 What people miss, God still sees

## 🔥 The Anger Of The LORD And His Jealousy Shall Smoke Against That Man

"Jealousy" here means God's protective claim over Israel's exclusive loyalty.

It is not petty envy.

It is the reaction of a betrayed covenant partner.

"Smoke" pictures rising anger, like smoke pouring off a burning altar.

God's jealousy exists because the relationship itself was real.

🔥 Jealousy means protective covenant loyalty
💔 It is a betrayed partner's reaction
💨 Smoke pictures anger rising visibly
📖 God's jealousy proves the relationship was real

## 📚 All The Curses That Are Written In This Book Shall Lie Upon Him

"This book" points back to the curses already spoken in chapters 27 and 28.

Those curses were not empty threats meant only for effect.

They were a written, binding part of the covenant itself.

A person who breaks the covenant quietly still faces everything already written down.

The written curses apply personally, not just to the nation in general.

📚 This book points to chapters 27 and 28
✍️ The curses were written, not just spoken
⚖️ They are binding, not empty threats
➡️ They apply personally, not just nationally

## 🕳️ The LORD Shall Blot Out His Name From Under Heaven

"Blot out" means to erase completely, like ink wiped from a page.

In this culture, a name carried a family's whole legacy and memory.

Losing your name meant losing your place in the story of Israel.

This is the opposite of the blessing of a lasting inheritance promised earlier.

Complete erasure is the harshest outcome this culture could imagine.

🕳️ Blot out means erased completely
📛 A name carried a family's legacy
🚫 Losing it meant losing your place
📖 This is the opposite of lasting blessing

## ✂️ The LORD Shall Separate Him Unto Evil Out Of All The Tribes Of Israel

This separation is not a random accident.

God himself actively sets this person apart for judgment.

"Out of all the tribes" means removed from the whole community, not one group.

The same God who chose Israel as a whole also singles out the unfaithful individual.

Belonging to the covenant community was never automatic protection from its curses.

✂️ God actively sets this person apart
👥 Out of all tribes means total removal
⚖️ Belonging is not automatic protection
📖 God who chooses also judges

# Deuteronomy 29:22-28
# 🌋 A Land Like Sodom
---
## 👶 The Generation To Come Of Your Children

This looks ahead to people not even born yet.

Even a foreign traveler passing through generations later will notice the ruin.

The devastation described here becomes a lasting, visible warning sign.

Anyone who sees it will ask what caused it.

Israel's own future disobedience would end up teaching outsiders a lesson.

👶 This looks ahead to future generations
🧳 A foreign traveler notices it too
⚠️ The ruin becomes a lasting warning
📖 Others learn from Israel's failure

## 🤒 The Plagues Of That Land, And The Sicknesses Which The LORD Hath Laid Upon It

This pictures the land itself as sick and struck, not just its people.

The judgment is visible on the ground, not hidden or spiritual only.

Outsiders would be able to see the damage with their own eyes.

A ruined land became living proof that something had gone seriously wrong.

🤒 The land itself appears sick and struck
👁️ The judgment is visible, not hidden
🧳 Outsiders could see the damage directly
📖 A ruined land proves something went wrong

## 🧂 Brimstone, And Salt, And Burning, That It Is Not Sown, Nor Beareth

"Brimstone" means burning sulfur, the same word used for Sodom's destruction.

Salting a field was an ancient way to make land useless for farming.

"Not sown, nor beareth" means nothing could be planted or grown there again.

The picture is total, lasting agricultural ruin, not a temporary famine.

The land becomes permanently unable to sustain life.

🧂 Salt made ancient land unfarmable
🔥 Brimstone means burning sulfur
🌾 Not sown means nothing could grow
📖 This ruin is permanent, not temporary

## 🏙️ Like The Overthrow Of Sodom, And Gomorrah, Admah, And Zeboim

Sodom and Gomorrah are the well known cities God destroyed in Genesis 19.

Admah and Zeboim were two smaller neighboring cities destroyed the same day.

All four sat near the Dead Sea before their destruction.

Naming all four, not just the famous two, makes the comparison feel total.

Israel's own land could end up as infamous as Sodom's ruins.

🏙️ Sodom and Gomorrah were destroyed in Genesis 19
🏘️ Admah and Zeboim were smaller neighboring cities
🗺️ All four sat near the Dead Sea
📖 Israel's land could share that same fate

## ❓ Wherefore Hath The LORD Done Thus Unto This Land

This is the question every outside observer will eventually ask.

A devastated land with no obvious cause invites this exact question.

The chapter is building toward giving a clear, direct answer.

The nations will not be left guessing about the reason.

❓ Outsiders will ask this exact question
🌋 A ruined land demands an explanation
🗣️ The text is building toward an answer
📖 The reason will not stay a mystery

## 💔 Because They Have Forsaken The Covenant Of The LORD God Of Their Fathers

This is the answer given directly, with no vague excuses.

"Forsaken" means abandoned on purpose, not lost by accident.

The covenant broken here is the same one being sealed in this very chapter.

The cause of the disaster traces straight back to a broken promise.

💔 Forsaken means abandoned on purpose
📜 This is the same covenant sealed today
🎯 The answer is direct, not vague
📖 A broken promise causes the disaster

## 🗿 They Went And Served Other Gods, And Worshipped Them, Gods Whom They Knew Not

This was not confusion over which god was the true one.

"Gods whom they knew not" means gods with no real history with Israel.

Israel had generations of firsthand experience with the true LORD already.

Choosing an unfamiliar god over a proven one made the betrayal even worse.

🗿 They chose strange, unfamiliar gods
🤷 Knew not means no real relationship
📚 Israel already knew the true LORD
📖 Choosing strangers over proof deepened the betrayal

## 🌪️ The LORD Rooted Them Out Of Their Land In Anger, And In Wrath, And In Great Indignation

Three separate words for anger appear together on purpose here.

"Anger," "wrath," and "indignation" stack up to show the full weight of the judgment.

"Rooted out" pictures a plant pulled up completely, not just trimmed back.

"Cast into another land" points forward to a real, future exile.

This warning would later be fulfilled in Israel's actual history, not only in theory.

🌪️ Three anger words stack up here
🌱 Rooted out means pulled up completely
🧳 Cast into another land means exile
📖 This warning was later fulfilled in history

# Deuteronomy 29:29
# 🔒 What Belongs To God, What Belongs To Us
---
## 🔒 The Secret Things Belong Unto The LORD Our God

Some questions about God's plans and purposes remain fully His own.

Israel is not given every reason behind every judgment or blessing.

This is not a gap in the text.

It is a deliberate boundary.

Some things stay in God's hands alone, and that is by design.

Trusting God does not require understanding everything about him first.

🔒 Some things remain God's alone
🚧 This boundary is deliberate, not a gap
🙏 Trust does not require full understanding
📖 Mystery has a proper place here

## 📖 Those Things Which Are Revealed Belong Unto Us And To Our Children For Ever

"Those things which are revealed" means the law Moses has just finished explaining.

This revealed portion is not private information for one generation.

It belongs permanently to Israel's children and every generation after them.

This echoes verse 15's promise that the covenant reaches those not yet born.

What God has already made known is meant to be kept and passed down.

📖 Revealed means the law just given
👪 It belongs to every future generation
🔗 This echoes verse 15's earlier promise
➡️ Known truth is meant to be passed down

## 🎯 That We May Do All The Words Of This Law

God did not reveal his law simply to be studied and admired.

The purpose stated here is direct action, not just knowledge.

"Do all the words" means complete, practical obedience, not partial effort.

The chapter closes exactly where the whole covenant renewal began, on obedience.

🎯 The purpose is action, not just knowledge
✅ Do all means complete obedience
🔄 This closes the loop from verse 9
📖 Revelation exists to be obeyed
`.trim();

export const DEUTERONOMY_TWENTY_NINE_PERSONAL_SECTIONS = parseDeuteronomyTwentyNineRawNotes(DEUTERONOMY_TWENTY_NINE_RAW_NOTES);
