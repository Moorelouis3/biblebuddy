export type SecondChroniclesEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesEighteenRawNotes(rawText: string): SecondChroniclesEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 18:${startVerse}` : `2 Chronicles 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 2 Chronicles 18 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_EIGHTEEN_RAW_NOTES = `# SecondChronicles 18:1-3
# 🤝 Jehoshaphat Joins With Ahab
---
## 👑 Riches And Honour In Abundance

Jehoshaphat already had everything a king could want before this chapter begins.

Chapters sixteen and seventeen already showed him removing idols and teaching God's law across Judah.

He did not need Ahab for money or status.

He already had both in full measure.

That makes the choice he is about to make even more troubling.

A faithful king is about to link his family to one of the worst.

👑 Jehoshaphat already had wealth and honor

📜 Earlier chapters showed his faithful reforms

🚫 He did not need this alliance

📖 Even faithful kings can choose poorly

## 💍 Joined Affinity With Ahab

"Affinity" means a relationship formed through marriage, not friendship alone.

Jehoshaphat had arranged for his son Jehoram to marry Ahab's daughter Athaliah.

That single marriage tied Judah's royal line to Israel's most wicked king.

Ahab and his wife Jezebel had spent years pushing Baal worship across their kingdom.

This alliance later carried that same idolatry straight into Judah's own palace.

💍 Affinity means a marriage relationship

👑 Jehoram married Ahab's daughter Athaliah

🔥 Ahab and Jezebel promoted Baal worship

📖 One marriage carried lasting consequences

## 🍖 Ahab Killed Sheep And Oxen For Him In Abundance

Ancient kings often used a lavish feast to soften someone up before asking a favor.

Ahab was not simply being generous here.

He was building goodwill right before pitching a risky military campaign.

Jehoshaphat walked into a warm welcome without yet knowing what it would cost him.

🍖 A feast built goodwill before the ask

🎯 Ahab wanted something from Jehoshaphat

🤝 Warm hospitality masked a coming request

➡️ Kindness can still come with a cost

## 🗡️ I Am As Thou Art, And My People As Thy People

Jehoshaphat commits his entire army before asking a single question about the plan.

He does not ask what the battle is for.

He does not ask if the LORD approves.

Full loyalty is given before any real thought is given.

Verse four shows him finally asking for God's word, but only after his troops were already promised.

🗡️ Jehoshaphat commits fully and fast

❓ No question asked about the plan

⏳ God is consulted only afterward

➡️ Loyalty without discernment is risky

# SecondChronicles 18:4-8
# 📯 Sending For Micaiah
---
## 🙏 Enquire At The Word Of The LORD Today

Jehoshaphat finally asks for God's guidance, but only now, after already agreeing to fight.

The order is backwards.

A wiser king would seek the LORD before making any promise, not after.

Even a good instinct can come too late to change what was already set in motion.

🙏 Jehoshaphat finally asks God's will

⏳ The question comes too late

📋 His promise was already made

➡️ Seek God before committing, not after

## 👥 Prophets Four Hundred Men

Four hundred men sounds like overwhelming agreement.

A large crowd of prophets does not automatically mean a true message from God.

These men served in Ahab's court and likely told the king what he wanted to hear.

Numbers can make a lie sound like consensus.

👥 Four hundred prophets speak as one

🎭 A crowd can still be wrong

👑 Court prophets often please the king

📖 Truth is not decided by a vote

## 🤔 Is There Not Here A Prophet Of The LORD Besides

Jehoshaphat senses something is wrong even with four hundred voices agreeing.

His instinct for discernment finally shows up, even if it is late.

He wants a prophet who actually belongs to the LORD, not simply one who claims to.

Real faith notices when something feels too easy.

🤔 Jehoshaphat senses something is off

🔍 Discernment shows up even if late

🙏 He wants a true prophet of God

➡️ Unanimous agreement can still hide a lie

## 😠 I Hate Him, For He Never Prophesied Good Unto Me

Ahab already knows exactly who Micaiah is before Jehoshaphat asks.

He has simply chosen never to consult him.

Ahab does not want truth from a prophet.

He wants comfort and permission instead.

A king who only wants agreement will always find someone willing to give it.

😠 Ahab already knows about Micaiah

🙉 He has avoided him on purpose

🎭 He wants comfort, not truth

📖 Rejecting correction never removes the truth

## 🛑 Let Not The King Say So

Jehoshaphat gently corrects Ahab's dismissal of Micaiah.

He refuses to accept dislike as a reason to avoid the truth.

This is one of the few moments in the chapter where Jehoshaphat's better judgment shows clearly.

🛑 Jehoshaphat pushes back on Ahab

⚖️ Dislike is not a reason to avoid truth

👀 A rare clear moment of judgment

➡️ Truth deserves a hearing either way

# SecondChronicles 18:9-11
# 👑 Robes At The City Gate
---
## 🏛️ Sat In A Void Place At The Entering In Of The Gate

The city gate in the ancient world served as the courtroom and town square combined.

Legal decisions, public announcements, and formal meetings all happened there.

Both kings sit in full royal robes for everyone in Samaria to see.

This was a public spectacle, not a private planning meeting.

🏛️ The gate served as the public courtroom

👑 Both kings appeared in full royal robes

👀 The whole city could watch this scene

📖 Public spectacle added pressure to agree

## 🐂 Horns Of Iron

Zedekiah performs a prophetic style act instead of only speaking.

Horns were an old symbol of military strength, an image tied to a wild ox goring its enemies.

He is acting out a promise of total victory for the crowd to see.

A dramatic prop does not make a false message true.

🐂 Horns symbolize military strength

🎭 Zedekiah performs instead of just speaking

🎯 The act promises total victory

📖 A dramatic display does not equal truth

## 🎤 All The Prophets Prophesied So

Every single prophet in the room repeats the same message.

That kind of unanimous agreement can feel impossible to argue against.

One true prophet is about to stand alone against all four hundred of them.

Being outnumbered does not mean being wrong.

🎤 Every prophet repeats the same message

😬 Unanimous voices feel hard to challenge

🧍 One true prophet stands apart

➡️ Being outnumbered does not mean being wrong

# SecondChronicles 18:12-14
# 🗣️ Speak Thou Good
---
## 📢 Let Thy Word Therefore Be Like One Of Theirs

The messenger pressures Micaiah before he even reaches the king.

He is told to match the crowd instead of saying what God actually revealed to him.

Peer pressure reached prophets just as easily as it reaches anyone else.

📢 The messenger pressures Micaiah in advance

👥 He is told to match the crowd

🎯 Peer pressure targets prophets too

➡️ Pressure to conform reaches everyone

## 🤞 As The LORD Liveth, Even What My God Saith, That Will I Speak

Micaiah makes this vow before he ever reaches the king.

He commits to speaking only what God actually tells him.

The cost of that promise will show up just a few verses later.

Ahab throws him in prison for keeping this exact vow.

🤞 Micaiah vows to speak only truth

📜 The vow comes before he meets the king

⚠️ Keeping it costs him his freedom

📖 Integrity is decided before pressure arrives

## 🎭 Go Ye Up, And Prosper

Micaiah repeats the exact words the four hundred prophets already said.

His tone gives away that he does not mean a word of it.

The king catches the sarcasm immediately in the very next verse.

This is mockery, not a real prophecy.

Ahab knows Micaiah well enough to recognize mockery when he hears it.

🎭 Micaiah repeats the crowd's exact words

😏 His tone reveals he does not mean it

👂 Ahab catches the sarcasm right away

➡️ Mockery can expose a lie fast

# SecondChronicles 18:15-17
# 🐑 Sheep Without A Shepherd
---
## ❓ How Many Times Shall I Adjure Thee

"Adjure" means to solemnly command someone under oath to tell the truth.

Ahab already senses that Micaiah was not being sincere with his first answer.

He demands the real message this time, no games.

Even a king determined to hear good news cannot fully ignore an obvious lie.

❓ Adjure means command under oath

😒 Ahab senses the first answer was fake

🎯 He demands the real message now

➡️ Even Ahab cannot fully ignore a lie

## 🐑 As Sheep That Have No Shepherd

This image pictures Israel's army after their king has been killed in battle.

A shepherd led, protected, and directed the flock in ancient Israel.

Without one, the sheep simply scatter across the hillside with nowhere to go.

Micaiah is describing exactly what will happen to Israel's soldiers after this battle ends.

🐑 Sheep without a shepherd scatter

👑 The shepherd here pictures the king

⚔️ This shows Israel's army after Ahab dies

📖 The vision describes the battle's true outcome

## 🏠 Let Them Return Every Man To His House In Peace

God's word here is surprisingly gentle toward the ordinary soldiers.

The judgment in this vision falls on Ahab, not on the whole army.

The common people are sent home safely once their king is gone.

Judgment on a leader does not always mean judgment on everyone he leads.

🏠 The soldiers are sent home safely

👑 Judgment falls on Ahab alone

🕊️ The army is spared, not punished

📖 A leader's guilt does not spread to everyone

# SecondChronicles 18:18-22
# 🕊️ The Council In Heaven
---
## 👑 I Saw The LORD Sitting Upon His Throne

Micaiah now describes an actual vision, not a guess or an opinion.

He is shown a scene happening in heaven itself, behind everything unfolding on earth.

This kind of throne room vision also appears later in Isaiah and Daniel.

The battle plans of two kings are not the biggest thing happening in this chapter.

👑 Micaiah describes a real vision

🌌 A heavenly throne room scene unfolds

📚 Similar visions appear in Isaiah and Daniel

📖 Heaven is the real center of this scene

## ⚔️ All The Host Of Heaven Standing On His Right Hand And On His Left

"The host of heaven" refers to the angels who serve and surround God's throne.

They are pictured here almost like a royal council brought in for a decision.

This is a rare and striking glimpse behind the curtain of how God governs history.

⚔️ Host of heaven means God's angels

🏛️ They are pictured like a royal council

👀 A rare glimpse behind the curtain

📖 God governs history through means we rarely see

## ❓ Who Shall Entice Ahab

"Entice" means to lure or draw someone toward a trap they cannot see coming.

God is not asking for information here.

He already knows exactly what will happen to Ahab.

The question sets up a scene for Micaiah and the reader to watch unfold.

❓ Entice means lure toward a trap

👁️ God already knows the outcome

🎬 The question sets up the scene

➡️ Nothing here catches God by surprise

## 👻 I Will Be A Lying Spirit In The Mouth Of All His Prophets

A spirit volunteers to influence the four hundred prophets to speak falsely.

This does not mean God is the source of every lie ever spoken.

It pictures God giving Ahab exactly what a persistently hardened heart had already chosen.

Ahab had ignored true prophets so many times that this became his own judgment.

👻 A spirit offers to deceive the prophets

🚫 God is not the source of every lie

💔 Ahab's hardened heart invited this judgment

📖 Persistent rejection of truth has consequences

## ⚖️ The LORD Hath Put A Lying Spirit In The Mouth Of These Thy Prophets

Micaiah states the hardest part of the vision directly to the king's face.

The unanimous agreement Ahab wanted to hear was allowed by God, not sent for comfort.

Ahab has hated true prophets throughout his entire reign.

He now receives exactly the false comfort he always preferred.

⚖️ Micaiah states the hard truth plainly

🎭 The false unity served as judgment

💔 Ahab preferred comfort over correction

📖 A hardened heart can get what it wanted

# SecondChronicles 18:23-27
# 👊 Struck For Telling The Truth
---
## 👊 Smote Micaiah Upon The Cheek

Zedekiah responds to the truth with violence instead of an argument.

Striking someone on the cheek was a deep public insult in this culture, not simply a slap.

A true prophet pays a physical price the moment his words expose a lie.

👊 Zedekiah strikes instead of arguing

😳 A cheek strike was a public insult

🩹 The truth cost Micaiah a real price

➡️ Rejecting truth often turns violent fast

## 🌬️ Which Way Went The Spirit Of The LORD From Me

Zedekiah claims that he himself also speaks for the LORD.

He mocks Micaiah by asking exactly where God's spirit supposedly went instead.

Two men both claim to speak for God.

Only one of them is telling the truth.

🌬️ Zedekiah claims God speaks through him too

🎭 His question is meant to mock

⚖️ Only one prophet here speaks truth

📖 Claiming God's name does not make it true

## 🚪 Thou Shalt See On That Day When Thou Shalt Go Into An Inner Chamber To Hide Thyself

Micaiah answers the mocking question with a specific prophecy of his own.

He predicts that Zedekiah will one day run and hide out of pure fear.

An inner chamber was a small private room deep inside a house, used for hiding or safety.

This is not a vague warning.

It names the exact kind of fear Zedekiah will feel.

🚪 Micaiah predicts Zedekiah's future fear

🏠 Inner chamber means a small hiding room

😨 Fear will replace his confident mocking

➡️ False confidence rarely survives contact with truth

## 🍞 Bread Of Affliction And Water Of Affliction

This phrase describes prison rations meant to punish, not simply feed.

The portions were kept small and plain on purpose.

Ahab throws the one honest voice in the room into the harshest treatment available.

🍞 Bread and water of affliction means prison rations

⛓️ Portions were kept small on purpose

😔 The honest prophet gets the harshest treatment

📖 Truth telling cost Micaiah his freedom

## 📣 If Thou Certainly Return In Peace, Then Hath Not The LORD Spoken By Me

Micaiah stakes his entire reputation on this one outcome.

He is willing to be publicly proven wrong if Ahab actually comes home safely.

Calling in all the people as witnesses means this test cannot be forgotten or denied later.

A true prophet is willing to be tested this openly.

📣 Micaiah stakes his reputation publicly

⚖️ He accepts being proven wrong if untrue

👥 Witnesses make the test impossible to deny

📖 True prophecy can survive being tested

# SecondChronicles 18:28-31
# 🎭 The Disguise
---
## 🥸 I Will Disguise Myself, And Will Go To The Battle

Ahab heard Micaiah's prophecy and clearly took it seriously enough to act.

He tries to outsmart his own fate by hiding his identity in battle.

Removing his royal robes was meant to make him unrecognizable as the king.

🥸 Ahab takes the prophecy seriously

🎭 He tries to hide his identity

👑 Removing his robes hides his rank

➡️ Fear of judgment does not stop it

## 👘 Put Thou On Thy Robes

Ahab asks Jehoshaphat to wear the very robes that mark a king as a target.

Jehoshaphat agrees without apparently questioning why.

This single request quietly shifts the danger meant for Ahab onto his ally instead.

👘 Ahab hands the target role to Jehoshaphat

🤝 Jehoshaphat agrees without question

⚠️ The danger shifts onto the wrong king

📖 This alliance keeps costing Jehoshaphat more

## 🎯 Fight Ye Not With Small Or Great, Save Only With The King Of Israel

The king of Syria gives his captains one single target for the entire battle.

Every other soldier on the field becomes irrelevant to this specific order.

Jehoshaphat, wearing the royal robes, becomes that target by mistake.

🎯 Syria's whole army targets one man

🙅 Every other soldier is irrelevant to this order

😳 Jehoshaphat becomes the target by mistake

➡️ A disguise put the wrong man at risk

## 🙏 The LORD Helped Him, And God Moved Them To Depart From Him

Jehoshaphat cries out for help in the middle of real danger.

God personally intervenes to turn the pursuing chariots away from him.

The alliance with Ahab was a mistake.

God still protects Jehoshaphat inside that mistake.

🙏 Jehoshaphat cries out under threat

🛡️ God turns the danger away

💔 The alliance was still a mistake

📖 God's protection can reach even a bad decision

# SecondChronicles 18:32-34
# 🏹 A Bow Drawn At A Venture
---
## 🏹 A Certain Man Drew A Bow At A Venture

"At a venture" means the arrow was shot without aiming at anyone in particular.

No soldier picked Ahab out of the crowd on purpose.

What looked like pure chance landed exactly where God's word had already said it would.

🏹 At a venture means an unaimed shot

🎯 No one picked Ahab on purpose

🎲 Chance still fulfilled the prophecy

📖 Nothing in this battle escaped God's word

## 🛡️ Between The Joints Of The Harness

"Harness" here refers to a soldier's armor, made of overlapping metal plates.

The joints were the small gaps between those plates, left open so a soldier could actually move.

The arrow found the one narrow opening in Ahab's armor by accident.

Disguise and armor together still could not stop what had already been declared.

🛡️ Harness means the king's armor

🔓 Joints were small gaps between plates

🎯 The arrow found the one opening

➡️ No disguise could outrun the prophecy

## 🌇 Stayed Himself Up In His Chariot Against The Syrians Until The Even

Ahab refuses to leave the battlefield even after being seriously wounded.

Retreating in front of his own army would have shattered their morale completely.

He props himself up and keeps facing the enemy until sundown.

He dies exactly as Micaiah described, with his own soldiers scattering soon after.

🌇 Ahab stays upright to protect morale

🩸 He is already seriously wounded

⏳ He holds on until sundown

📖 He dies exactly as Micaiah foretold
`.trim();

export const SECOND_CHRONICLES_EIGHTEEN_PERSONAL_SECTIONS = parseSecondChroniclesEighteenRawNotes(SECOND_CHRONICLES_EIGHTEEN_RAW_NOTES);
