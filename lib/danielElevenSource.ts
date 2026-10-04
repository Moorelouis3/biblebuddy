export type DanielElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDanielElevenRawNotes(rawText: string): DanielElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DanielElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Daniel\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Daniel 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Daniel\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Daniel\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Daniel 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Daniel 11:${startVerse}` : `Daniel 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Daniel 11 sections, received " + sections.length);
  }

  return sections;
}

const DANIEL_ELEVEN_RAW_NOTES = `# Daniel 11:1-4
# 👑 Persia's Kings And The Mighty King
---
## 🤝 Stood To Confirm And To Strengthen Him

This verse continues the same angel speaking back in chapter ten.

He says he once stood beside Darius the Mede to support him.

That support happened behind the scenes of human politics.

Daniel never saw it, yet the angel was already active in world events before this vision even began.

God was managing history long before Daniel asked his question.

🤝 Same angel from chapter ten speaks

👑 He supported Darius the Mede

👻 This happened behind the scenes

📖 God was managing history already

## 👑 Yet Three Kings In Persia

This vision begins after Cyrus, the Persian king already ruling in Daniel's own lifetime.

Three more kings would follow him on the Persian throne.

Many scholars identify these as Cambyses, a brief usurper, and Darius the First.

None of these three needed a separate spotlight in the vision.

The real weight falls on the king who comes next.

👑 Cyrus already ruled in Daniel's time

🔢 Three more Persian kings would follow

📜 Many scholars name Cambyses and Darius

📖 The real weight falls later

## 💰 The Fourth Shall Be Far Richer Than They All

A fourth Persian king would surpass the other three in wealth.

Many scholars identify him as Xerxes the First, famous for his enormous treasury.

Wealth in the ancient world bought armies, not just comfort.

His riches became the engine behind his next move.

💰 A fourth king outweighs the first three

👑 Many scholars name him Xerxes

⚔️ Wealth bought armies in that world

📖 His riches fueled his next move

## 🏛️ Stir Up All Against The Realm Of Grecia

Xerxes used his enormous wealth to raise a massive invasion force.

He aimed that force at Grecia, the Greek world across the sea.

That invasion happened in history, around 480 before Christ.

It ended badly for Persia, but it set two world powers on a collision course.

That collision eventually produces the next king named in this chapter.

🏛️ Grecia is the Greek speaking world

⚔️ Xerxes invaded Greece around 480 BC

🔥 The invasion failed in the end

📖 It set up the chapter's next king

## ⚔️ A Mighty King Shall Stand Up

This king rules with far greater dominion than any Persian king named before him.

Many scholars identify him as Alexander the Great of Macedon.

He conquered the entire Persian Empire in about a decade.

"According to his will" means no council or law restrained his decisions.

One man's ambition reshaped the whole known world.

⚔️ Many scholars name him Alexander

🌍 He conquered the whole Persian Empire

👑 He ruled by his own will alone

📖 One man's ambition reshaped the world

## 🍂 Divided Toward The Four Winds Of Heaven

Alexander died young, still in his early thirties.

"The four winds of heaven" means his empire split in four separate directions.

"Not to his posterity" means his own children never actually inherited any of it.

History records that four of his generals divided the empire among themselves instead.

Two of those four generals, ruling Egypt and Syria, drive almost the entire rest of this chapter.

🍂 Four winds means split four ways

👶 His own children inherited nothing

⚔️ Four generals divided it instead

📖 Two of them drive this whole chapter

# Daniel 11:5-9
# ⚔️ The King Of The South And The King Of The North
---
## 💪 The King Of The South Shall Be Strong

"The king of the south" is a title, not one single ruler's permanent name.

It refers to whoever holds Egypt, starting with Alexander's general Ptolemy.

This title gets reused for an entire line of Egyptian kings across this chapter.

Keeping that in mind makes the rest of the chapter far easier to follow.

💪 King of the south is a title

🏺 It starts with Ptolemy ruling Egypt

🔁 The same title covers later kings

📖 Tracking titles unlocks this whole chapter

## 👑 One Of His Princes Shall Be Strong Above Him

"The king of the north" is the matching title for whoever rules Syria and the east.

Many scholars identify this first king of the north as Seleucus, once one of Ptolemy's own officers.

Seleucus eventually grew into a larger and stronger kingdom than Egypt itself.

A former subordinate outgrew the man he once served under.

👑 King of the north is the matching title

🏹 Seleucus began as Ptolemy's own officer

📈 His kingdom grew larger than Egypt

📖 A servant outgrew his former master

## 💍 The King's Daughter Of The South

Decades later, the two rival kingdoms try to make peace through marriage.

Many scholars identify this daughter as Berenice, sent north to marry the king of Syria.

Marriages like this were common ancient diplomacy, not romance.

A wedding was supposed to end a war that armies could not.

💍 A royal daughter is sent north

🤝 Marriage sealed ancient political peace

🏺 She is Berenice, an Egyptian princess

📖 A wedding was meant to end a war

## 💔 She Shall Not Retain The Power Of The Arm

The peace this marriage promised did not last.

Many scholars say the Syrian king's first wife had Berenice and her young son killed once he died.

Everyone connected to arranging that marriage also lost their lives in the fallout.

A peace treaty built on a wedding collapsed into murder within the same family.

💔 The marriage alliance did not last

🗡️ Berenice and her son were killed

⚰️ Those who arranged it died too

📖 A peace treaty collapsed into murder

## 🌿 Out Of A Branch Of Her Roots

"Her roots" points back to Berenice's own family line in Egypt.

A branch from that family rises up to answer what happened to her.

Many scholars identify him as her brother, Ptolemy the Third.

He invades the north with an army and succeeds against them.

🌿 Her roots means Berenice's own family

👨 Her brother Ptolemy the Third rises up

⚔️ He invades the north successfully

📖 Family loyalty answers a murder with war

## 🗿 Carry Captives Into Egypt Their Gods

Ptolemy the Third does not just defeat his enemy in battle.

He also hauls home their household idols, carried off as war trophies to Egypt.

Ancient records describe this as one of his proudest achievements as king.

Capturing another nation's gods was meant to prove whose god was actually stronger.

🗿 Their gods means captured idols

🏆 Ptolemy treats this as his proudest win

🏺 The idols are carried to Egypt

📖 Capturing gods claimed spiritual victory too

## 🏠 Return Into His Own Land

After his victorious campaign, the king of the south goes back home.

He does not stay to permanently occupy the northern kingdom he just defeated.

A quick, profitable campaign is not the same as lasting conquest.

This small detail sets up the next generation to try the fight all over again.

🏠 He returns home after winning

🚫 He does not occupy the north

⏳ The victory is not permanent

📖 The next generation restarts this fight

# Daniel 11:10-14
# 🐎 War Returns Between The Two Kingdoms
---
## 👦 His Sons Shall Be Stirred Up

The defeated king of the north has died, but he leaves sons behind.

Many scholars identify them as Seleucus the Third and his younger brother Antiochus the Third.

Both brothers raise large armies to reclaim what their father lost.

A grudge between two kingdoms rarely dies with just one generation.

👦 Two sons inherit the grudge

⚔️ Both raise large armies

🏺 Many scholars name Seleucus and Antiochus

📖 Grudges often outlive one generation

## 🌊 Overflow, And Pass Through

One of these sons, Antiochus the Third, launches a real offensive south.

"Overflow" pictures an army moving like floodwater across the land.

He eventually returns and regroups near his own stronghold to try again.

This is only his opening move in a much longer campaign.

🌊 Overflow pictures an army like floodwater

⚔️ Antiochus launches the real offensive

🏰 He regroups near his own stronghold

📖 This is only his opening move

## 😠 Moved With Choler

"Choler" is an old word for burning anger.

The king of the south, Ptolemy the Fourth, finally fights back in person.

Many scholars connect this to the Battle of Raphia near Gaza.

Ptolemy wins decisively, and the attacking army is handed into his power.

😠 Choler means burning anger

⚔️ This points to the Battle of Raphia

🏆 Ptolemy the Fourth wins decisively

📖 Anger finally turned into action

## 💭 His Heart Shall Be Lifted Up

After his victory, Ptolemy the Fourth lets pride take over.

He strikes down tens of thousands of enemy soldiers in the aftermath.

Yet all that bloodshed never actually makes his own kingdom stronger.

A battlefield win does not automatically build a lasting advantage.

💭 Victory filled him with pride

⚰️ Tens of thousands die in the aftermath

📉 His kingdom still gains no real strength

📖 A win does not guarantee an advantage

## 📈 A Multitude Greater Than The Former

Years pass before the king of the north tries again.

Antiochus the Third returns with a far larger army than his first attempt.

This time he also brings far greater wealth to fund the campaign.

Patience and better resources prepare him for a stronger second try.

📈 A far larger army returns

💰 Greater wealth funds this campaign

⏳ Years passed before trying again

📖 Patience built a stronger second try

## 🗡️ The Robbers Of Thy People Shall Exalt Themselves

"Thy people" means Daniel's own people, the Jews.

Some Jewish factions chose to support the invading king of the north during this chaos.

They believed siding with him would fulfill their own hopes and plans.

Their gamble ultimately fails, and nothing good comes of it for them.

🗡️ Thy people means Daniel's own nation

🤝 Some Jews sided with the invader

🎲 They gambled on his success

📖 Their gamble ultimately failed

# Daniel 11:15-19
# 🏰 The King Of The North Prevails
---
## ⛏️ Cast Up A Mount, And Take The Most Fenced Cities

"Cast up a mount" describes building a siege ramp against a city's walls.

Antiochus the Third uses this tactic to capture Egypt's best defended cities.

Even Egypt's elite troops cannot hold the line against him this time.

The momentum from the earlier battles has clearly shifted sides.

⛏️ A mount means a siege ramp

🏰 He captures Egypt's strongest cities

🛡️ Even elite troops cannot hold

📖 The momentum has clearly shifted

## 🕍 He Shall Stand In The Glorious Land

"The glorious land" is a title this chapter uses several times for Israel.

Antiochus the Third brings Judea under his control during this campaign.

"Which by his hand shall be consumed" means the land now answers to him.

From this point forward, the king of the north controls Daniel's own homeland.

🕍 The glorious land means Israel

🗺️ Judea comes under his control

✋ It now answers to his hand

📖 Daniel's homeland changes hands here

## 👰 The Daughter Of Women

Antiochus the Third tries a new strategy, the same kind of marriage alliance used back in verse six.

Many scholars identify his daughter here as Cleopatra the First, given in marriage to the young king of the south.

The plan was for her to quietly work in her father's interest from inside Egypt's own palace.

She stays loyal to her husband's kingdom instead, and the scheme fails completely.

👰 Another royal marriage is arranged

🏺 Cleopatra the First marries into Egypt

🕵️ The plan was to use her for spying

📖 Her loyalty shifted, and the scheme failed

## 🏝️ Turn His Face Unto The Isles

"The isles" refers to the coastlands and islands of Asia Minor and Greece.

Antiochus the Third turns his ambitions toward this new region and captures many of its cities.

His reach has grown far beyond the original fight between Egypt and Syria.

Rome, a power barely mentioned so far, is about to enter the story.

🏝️ The isles means Greek coastlands

🗺️ He captures many of their cities

📈 His ambitions now reach further

📖 Rome is about to enter

## 🛑 A Prince Shall Cause The Reproach To Turn Upon Him

Many scholars identify this prince as a Roman general, Lucius Scipio.

Rome defeats Antiochus the Third decisively at the Battle of Magnesia.

The humiliation Antiochus had been dishing out to others now lands back on him.

A new empire has just announced itself on the world stage.

🛑 A Roman general stops his advance

⚔️ Rome wins at the Battle of Magnesia

🔁 His own humiliation returns on him

📖 Rome just announced itself on the stage

## 💀 He Shall Stumble And Fall, And Not Be Found

Defeated and humbled, Antiochus the Third retreats back toward his own territory.

Historical records describe him dying while trying to rob a pagan temple of its treasures.

"Not be found" suggests an obscure, undignified end for a once powerful king.

Pride that reached toward Greece and Egypt ends quietly and without honor.

💀 He retreats toward his own land

🏺 He dies robbing a pagan temple

👻 Not be found means an obscure end

📖 Great pride ended without honor

# Daniel 11:20-24
# 🪙 A Raiser Of Taxes And A Vile Person
---
## 💰 A Raiser Of Taxes In The Glory Of The Kingdom

The next king of the north needs money to pay off a heavy war debt to Rome.

Many scholars identify him as Seleucus the Fourth.

He sends an official to collect funds, even from the Jerusalem temple treasury.

"In the glory of the kingdom" points to how wealthy that kingdom still looked from the outside.

Looking wealthy and actually having money are not always the same thing.

💰 He needs funds for a war debt

🏛️ His official targets the temple treasury

👑 Seleucus the Fourth is this king

📖 Looking wealthy differs from having money

## ☠️ Within Few Days He Shall Be Destroyed

This king's reign ends quickly, and not through battle.

"Neither in anger, nor in battle" rules out open war as the cause.

Ancient sources say his own official poisoned him.

A king can fall to a quiet betrayal just as easily as to an army.

☠️ His reign ends quickly

⚔️ Not killed in anger or battle

🗡️ His own official poisoned him

📖 Betrayal can be as deadly as war

## 👤 A Vile Person

"Vile person" is the chapter's harshest label for any king so far.

Many scholars identify him as Antiochus the Fourth, who later calls himself Epiphanes, meaning God made visible.

He was never the rightful heir to this throne.

The man who becomes most dangerous to Daniel's people enters the story with the worst possible introduction.

👤 Vile person is the harshest label yet

👑 Many scholars name Antiochus the Fourth

🙅 He was never the rightful heir

📖 His introduction is a warning in itself

## 🤥 Obtain The Kingdom By Flatteries

Rather than inherit the throne honestly, this king talks his way onto it.

He wins over the people and the powers around him with charm and empty promises.

No honest claim to the throne backs up his new position.

A kingdom obtained through flattery rarely stays loyal once the flattery runs out.

🤥 He talks his way onto the throne

🗣️ Charm and promises win over support

🙅 No honest claim backs his position

📖 Loyalty built on flattery does not last

## ⛪ The Prince Of The Covenant

"The prince of the covenant" points to Israel's own legitimate high priest.

Many scholars identify him as Onias the Third, removed from office and later murdered under this new king's influence.

Israel's highest religious leader becomes a casualty of foreign political scheming.

The chapter's focus is about to turn directly toward Jerusalem itself.

⛪ This points to Israel's high priest

👤 Many scholars name Onias the Third

🗡️ He is removed and later murdered

📖 The focus is turning toward Jerusalem

## 🎭 He Shall Work Deceitfully

This king makes alliances only to break them whenever it benefits him.

"Become strong with a small people" means his power base actually starts out small.

He builds strength through cunning and broken promises rather than raw military size.

Deception becomes this king's main weapon throughout the rest of the chapter.

🎭 He breaks alliances for his own benefit

👥 His starting power base is small

🧠 Cunning replaces raw military strength

📖 Deception becomes his main weapon

## 🍯 Scatter Among Them The Prey, And Spoil, And Riches

Unlike the kings who ruled before him, this king hands out captured wealth freely to buy loyalty.

He showers his followers with plunder that earlier kings kept for themselves.

He also quietly studies the strongest fortresses, planning how to take them later.

Generosity here is simply another form of calculated strategy.

🍯 He hands out plunder freely

👥 Earlier kings kept wealth to themselves

🏰 He studies strongholds for future plans

📖 His generosity is calculated strategy

# Daniel 11:25-28
# 🛡️ Antiochus Invades Egypt
---
## 💪 Stir Up His Power And His Courage

Antiochus the Fourth now moves south with a large army of his own.

Egypt, led by the young king Ptolemy the Sixth, raises just as large a force to meet him.

On paper, this battle should be an even contest between two major powers.

What actually decides the outcome has nothing to do with the size of either army.

💪 Antiochus marches south with a large army

🏺 Egypt matches him under Ptolemy the Sixth

⚖️ On paper this looks like an even fight

📖 Army size will not decide this battle

## 🍽️ They That Feed Of The Portion Of His Meat Shall Destroy Him

This phrase describes the king's own closest advisors and officials.

People who shared Ptolemy's own table end up betraying him from the inside.

Egypt's army collapses, and many of its soldiers are killed in the defeat.

The most dangerous threat to this king comes from inside his own court.

🍽️ This phrase means his own advisors

🗡️ They betray him from the inside

⚰️ Egypt's army collapses in defeat

📖 The real threat came from inside

## 🗣️ Speak Lies At One Table

After the battle, Antiochus and the defeated Ptolemy sit down together as if making peace.

Both kings privately intend harm to the other the entire time.

Their shared meal is really just a stage for mutual deception.

"It shall not prosper" means neither man's secret scheme actually succeeds.

🗣️ Both kings fake friendship at dinner

🎭 Each secretly intends harm to the other

🚫 Neither hidden scheme actually succeeds

📖 Appearances at the table hide real danger

## ⏳ The End Shall Be At The Time Appointed

Despite all the scheming between these two kings, God's own timetable still controls events.

Human plots cannot push history past the point God has already set.

This phrase repeats more than once later in the chapter.

No ruler, however clever, can outmaneuver God's appointed timing.

⏳ God's own timetable still controls events

🚫 Human plots cannot push past it

🔁 This phrase repeats later too

📖 No ruler outmaneuvers God's timing

## 😡 His Heart Shall Be Against The Holy Covenant

On his way home from Egypt, Antiochus the Fourth stops in Jerusalem.

He plunders the temple there, still angry from his failed scheme in Egypt.

"The holy covenant" refers to Israel's entire relationship and agreement with God.

A king frustrated in one country takes his anger out on a completely different people.

😡 He stops in Jerusalem heading home

🏛️ He plunders the temple there

📜 The holy covenant means Israel's agreement with God

📖 Frustration elsewhere lands on Jerusalem

# Daniel 11:29-31
# 🛑 The Abomination That Maketh Desolate
---
## 🏺 At The Time Appointed He Shall Return

Antiochus tries invading Egypt a second time.

"Not be as the former, or as the latter" warns that this attempt will go differently than before.

Something is about to stop him that none of his previous campaigns ever faced.

A pattern of success is about to break completely.

🏺 He tries invading Egypt again

⚠️ This attempt will go differently

🛑 Something new is about to stop him

📖 A pattern of success is breaking

## 🚢 The Ships Of Chittim

"Chittim" is an old name connected to Cyprus, used here for the wider power of Rome.

A Roman representative meets Antiochus and simply orders him to leave Egypt immediately.

According to history, Antiochus has no real choice but to obey.

Rome has just proven it can stop even a powerful eastern king with words alone.

🚢 Chittim points to Roman power

🗣️ A Roman envoy orders him to leave

😤 Antiochus has no real choice

📖 Words alone proved Rome's power

## 💔 Have Indignation Against The Holy Covenant

Humiliated by Rome, Antiochus cannot take his anger out on Rome itself.

Instead he turns that fury back toward Jerusalem and the Jewish people.

He also begins working closely with Jews who had already abandoned their own covenant with God.

Weaker targets often absorb the anger a stronger power causes.

💔 He cannot strike back at Rome

🏛️ His fury turns toward Jerusalem instead

🤝 He allies with Jews who forsook God

📖 Weaker targets absorb a stronger power's anger

## 🛕 Pollute The Sanctuary Of Strength

"The sanctuary of strength" refers to the Jerusalem temple itself.

Antiochus's forces defile this sacred space that had stood as the center of Jewish worship.

This marks one of the darkest moments in the whole Old Testament.

The place meant to represent God's presence becomes a scene of desecration instead.

🛕 The sanctuary means the Jerusalem temple

⚔️ His forces defile this sacred place

😞 One of the Old Testament's darkest moments

📖 God's dwelling place is desecrated

## 🔥 Take Away The Daily Sacrifice

The daily sacrifice was Israel's unbroken, twice daily offering at the temple, commanded all the way back under Moses.

Antiochus halts this offering completely, cutting off a practice that had continued faithfully for centuries.

Stopping it was meant to crush Jewish worship at its very core.

An enemy does not need to destroy a whole nation to wound its faith deeply.

🔥 The daily sacrifice honored God morning and evening

🛑 Antiochus halts it completely

📜 Commanded centuries earlier under Moses

📖 Wounding worship can wound a whole people

## 🗿 The Abomination That Maketh Desolate

Many scholars believe Antiochus set up a pagan altar, likely to the Greek god Zeus, inside God's own temple.

"Abomination" names something that disgusts God completely.

"Maketh desolate" describes how this act leaves the temple spiritually empty and unusable for true worship.

Jesus Himself later quotes this exact phrase in Matthew chapter twenty four.

He points to an even larger fulfillment still to come.

🗿 Likely a pagan altar set up to Zeus

💔 Abomination means something disgusting to God

🏚️ Desolate means spiritually emptied out

📖 Jesus later quotes this exact phrase

# Daniel 11:32-35
# 🕎 The Faithful Resist
---
## 🤥 Corrupt By Flatteries

Not every Jew resists Antiochus during this crisis.

Some are won over by promises of status, safety, or reward for cooperating with him.

"Corrupt" here means their loyalty to God quietly bends under that pressure.

Flattery can succeed where outright force sometimes fails.

🤥 Some Jews cooperate with Antiochus

🎁 Promises of reward win them over

💔 Their loyalty to God quietly bends

📖 Flattery can succeed where force fails

## 💪 The People That Do Know Their God Shall Be Strong

Other Jews respond in the exact opposite way.

Many scholars connect this directly to the Maccabean family, who lead an armed revolt against Antiochus.

"Know their God" means a real, personal relationship, not simply knowing facts about Him.

That kind of relationship produces real courage under real pressure.

💪 Some Jews respond with real courage

⚔️ This points to the Maccabean revolt

🙏 Knowing God means a real relationship

📖 Real relationship produces real courage

## 📢 They That Understand Among The People Shall Instruct Many

Faithful teachers keep instructing others even while this persecution rages on.

Many of them pay for that faithfulness with their own lives.

"Sword," "flame," "captivity," and "spoil" list four different ways this suffering actually plays out.

Teaching truth under pressure still comes at a very real, personal cost.

🗡️ Sword, flame, captivity, and spoil describe the cost

📢 Teachers keep instructing anyway

⚰️ Many pay for it with their lives

📖 Truth still gets taught under pressure

## 🤲 Holpen With A Little Help

"Holpen" is an old word for helped.

When the faithful resisters fall under persecution, they receive only a small amount of outside help.

Many scholars connect this modest help to the early military gains of the Maccabean revolt.

It is real help, but it is not a sweeping, instant rescue.

🤲 Holpen is an old word for helped

⚔️ The Maccabean revolt offers some aid

📉 The help is real but modest

📖 Not every rescue arrives all at once

## 🎭 Many Shall Cleave To Them With Flatteries

As the resistance grows, not everyone who joins it does so for honest reasons.

Some people attach themselves to a winning side purely out of self interest.

"Flatteries" signals that their support is not fully sincere.

A good cause can still attract people who are only using it.

🎭 Not every new supporter is sincere

📈 Some join a cause once it is winning

💰 Flatteries signals self interested motives

📖 Good causes can attract users too

## ⚪ To Try Them, And To Purge, And To Make Them White

This suffering is never described as random or meaningless in this chapter.

"Try" means testing, the same word used elsewhere for refining metal in fire.

"Purge" and "make them white" both describe a process of being cleaned and made pure.

Persecution here becomes a tool God actually uses to refine His people's faith.

⚪ Suffering here is not random

🔥 Try means testing like refining metal

🧼 Purge and white both mean made pure

📖 God can use persecution to refine faith

## 📅 Because It Is Yet For A Time Appointed

This whole refining process has a clear end point already set by God.

"Time appointed" repeats a phrase already used twice earlier in this chapter.

The suffering described here will not simply continue forever without limit.

God's appointed calendar governs the end of this trial, not the strength of the enemy.

📅 The refining has a set end point

🔁 Time appointed repeats earlier phrasing

⏳ The suffering will not last forever

📖 God's calendar governs the trial's end

# Daniel 11:36-39
# 😤 The King Who Exalts Himself
---
## 🙋 He Shall Do According To His Will

Starting here, the chapter's description of this king grows far more extreme than anything said about Antiochus earlier.

Many scholars believe these verses still describe Antiochus.

Others believe the description now stretches toward a future figure he only foreshadows.

Either way, this king recognizes no authority higher than his own desires.

Total self rule like this always ends up colliding with God eventually.

🙋 This description grows more extreme

📜 Many scholars debate who this king is

👑 He recognizes no higher authority

📖 Total self rule collides with God

## 😤 Speak Marvellous Things Against The God Of Gods

"Marvellous things" here does not mean impressive words, it means shocking, blasphemous claims.

Antiochus actually gave himself the title Epiphanes, meaning God made visible, during his own lifetime.

"The God of gods" is a title the Bible uses for the one true God above every false god.

Open blasphemy like this is the clearest sign yet of where this king's pride has led him.

😤 Marvellous things means shocking blasphemy

👑 Antiochus called himself God made visible

🙏 God of gods names the one true God

📖 Open blasphemy reveals this king's pride

## 💍 Nor The Desire Of Women

Scholars genuinely disagree about exactly what this phrase means.

Some believe it points to normal family affection and marriage, which this king ignores completely.

Others connect it to a popular god many women specifically mourned for in the ancient world.

What stays clear either way is that this king values nothing above his own ambition.

💍 Scholars disagree on its exact meaning

👪 It may mean normal family affection

🕯️ It may point to a popular mourned god

📖 His own ambition outranks everything else

## 🛡️ The God Of Forces

"Forces" here is an old word for military strength and fortresses.

This king treats raw military power as his real god.

He honors war and conquest with the kind of devotion other people give to actual gods.

A love of power that strong can quietly replace real worship altogether.

🛡️ Forces means military strength and fortresses

⚔️ He treats power itself as a god

💰 Gold, silver, and jewels honor this devotion

📖 Love of power can replace real worship

## 🗺️ Divide The Land For Gain

This king rewards loyal followers by handing them control over conquered territory.

"For gain" makes clear his real motive, personal profit rather than any higher cause.

Land and power become bargaining chips to buy continued loyalty.

Everything about this king's rule serves his own advantage first.

🗺️ He rewards followers with conquered land

💰 For gain reveals his real motive

🤝 Land becomes a bargaining chip

📖 His own advantage comes first always

# Daniel 11:40-45
# 🌪️ The Time Of The End
---
## 🐏 The King Of The South Shall Push At Him

This final section opens a new conflict explicitly tied to "the time of the end."

The king of the south makes the first aggressive move here.

This exact pairing of titles has driven the whole chapter since verse five.

Many scholars see this final clash reaching beyond anything Antiochus actually lived to see.

🐏 A new conflict opens at the end

👊 The king of the south strikes first

🔁 The same two titles return once more

📖 Many see this reaching beyond Antiochus

## 🌪️ Like A Whirlwind

The king of the north responds with overwhelming force.

Chariots, horsemen, and a large fleet of ships all move together in this assault.

"Like a whirlwind" pictures speed and destruction that nothing in its path can resist.

This is described as the most powerful and sweeping of all the invasions in this chapter.

🌪️ A whirlwind pictures unstoppable speed

🐎 Chariots and horsemen lead the assault

⛵ A large fleet joins the attack

📖 This is the chapter's most sweeping invasion

## 🏜️ Edom, And Moab, And The Chief Of The Children Of Ammon

These three nations lived just east of Israel and were often its enemies.

This advancing king overruns many countries, yet these three specifically escape his hand.

The text never explains exactly why they are spared.

Even inside a prophecy this destructive, God still marks out exceptions on purpose.

🏜️ Edom, Moab, and Ammon sat east of Israel

⚔️ Many other countries fall before him

❓ The text does not explain why they escape

📖 God marks out exceptions on purpose

## 💰 The Land Of Egypt Shall Not Escape

Egypt, the historic king of the south, finally falls completely to this invader.

"Shall not escape" closes out a rivalry between north and south that has run through this entire chapter.

The nation that started this long conflict back in verse five is the one left standing at its end.

This king now controls the lands on both ends of the ancient world's biggest rivalry.

💰 Egypt finally falls completely

🔚 This closes the chapter's long rivalry

🏺 Egypt started this conflict back in verse five

📖 One king now controls both ends

## 💎 Power Over The Treasures Of Gold And Of Silver

Beyond simply conquering Egypt, this king seizes all its accumulated wealth.

Egypt had been one of the richest nations in the entire ancient world.

Controlling that wealth gives him resources far beyond what any single army could carry.

Total victory here includes economic power, not only military conquest.

💎 He seizes all of Egypt's wealth

🏺 Egypt was one of the richest nations

💰 Its wealth funds him further

📖 Victory includes economic power too

## 🌍 The Libyans And The Ethiopians Shall Be At His Steps

Libya and Ethiopia sat along Egypt's own borders in ancient geography.

Once Egypt falls, these nearby nations simply submit without any recorded resistance.

"At his steps" pictures them following along obediently wherever he leads.

Total regional dominance spreads out from a single decisive victory.

🌍 Libya and Ethiopia bordered Egypt

🙇 Both submit without any resistance

👣 At his steps means obedient following

📖 One victory produced total regional control

## 📯 Tidings Out Of The East And Out Of The North

Just when this king's conquest looks complete, unexpected news reaches him.

"Tidings" means reports or rumors, not a direct attack yet.

Whatever this news contains clearly alarms him enough to react violently.

Even the most dominant power in the chapter still cannot fully control what happens next.

📯 Unexpected news reaches him

🗺️ It comes from the east and north

😠 It alarms him into great fury

📖 Even his power has real limits

## ⛺ Plant The Tabernacles Of His Palace Between The Seas

This king sets up his own royal headquarters near Jerusalem, called here the glorious holy mountain.

"Between the seas" likely points to the land lying between the Mediterranean Sea and the Dead Sea.

Setting a throne this close to God's own holy mountain is an open act of defiance.

He has placed himself right at the center of everything God calls sacred.

⛺ He sets up his palace near Jerusalem

🗺️ Between the seas describes that location

🏔️ The glorious holy mountain means Jerusalem

📖 He defies God at God's own center

## 💀 He Shall Come To His End, And None Shall Help Him

After all his conquests, wealth, and raw power, this king's story still ends in total defeat.

No ally, no army, and no god he claimed to honor shows up to rescue him.

This final collapse matches a pattern seen throughout the whole chapter, every proud king eventually falls.

Daniel's vision closes exactly where the whole book of Daniel keeps pointing, no empire outlasts God.

💀 His story still ends in total defeat

🙅 No ally or god rescues him

🔁 Every proud king in this chapter falls

📖 No empire outlasts God
`.trim();

export const DANIEL_ELEVEN_PERSONAL_SECTIONS = parseDanielElevenRawNotes(DANIEL_ELEVEN_RAW_NOTES);
