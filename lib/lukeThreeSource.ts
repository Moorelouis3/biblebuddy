export type LukeThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeThreeRawNotes(rawText: string): LukeThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 3:${startVerse}` : `Luke 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Luke 3 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_THREE_RAW_NOTES = `# Luke 3:1
# 👑 Caesar's Rulers Named
---
## 👑 The Fifteenth Year Of The Reign Of Tiberius Caesar

Tiberius Caesar was the emperor who ruled the entire Roman world.

Luke dates this story by his reign instead of a calendar year.

Ancient writers often counted years from a ruler's reign, not a fixed number.

This detail lets historians line up the Gospel with other Roman records.

👑 Tiberius ruled the entire Roman world

📆 Rulers' reigns worked like ancient calendars

🏛️ Historians can date this with Roman records

📖 Luke anchors the Gospel in real history

---
## ⚖️ Pontius Pilate Being Governor Of Judaea

Pontius Pilate governed Judaea on behalf of Rome.

A Roman governor collected taxes and kept order by force if needed.

This is the same Pilate who will later judge Jesus in chapter twenty three.

Luke introduces him here, years before that final trial.

⚖️ Pilate governed Judaea for Rome

💰 Governors collected taxes and kept order

⛓️ This is the same Pilate from later chapters

➡️ His role here sets up his later choice

---
## 🏛️ Herod Being Tetrarch Of Galilee

A tetrarch ruled only one fourth of a larger kingdom.

Rome had split Herod the Great's old territory among his sons.

This Herod, often called Herod Antipas, ruled just the region of Galilee.

He is not the same Herod who once tried to kill the infant Jesus.

🏛️ Tetrarch means ruler of one fourth

👑 Herod the Great's kingdom was divided

📍 This Herod ruled only Galilee

➡️ A different Herod than Jesus's infancy story

---
## 👪 His Brother Philip Tetrarch Of Ituraea And Of The Region Of Trachonitis

Philip was another of Herod the Great's sons.

He ruled a separate territory northeast of Galilee.

Ituraea and Trachonitis were rough, mountainous regions near Damascus.

Four brothers now ruled four different pieces of their father's old kingdom.

👪 Philip was Herod's brother, another son

🗺️ He ruled Ituraea and Trachonitis

⛰️ Both regions sat northeast of Galilee

📖 One kingdom split into several smaller rulers

---
## 📍 Lysanias The Tetrarch Of Abilene

Abilene was a small region near Damascus, far north of Judaea.

Lysanias ruled it as a minor tetrarch, barely mentioned outside this verse.

Naming a ruler this obscure shows how carefully Luke checked his facts.

A writer inventing history would not bother naming someone so minor.

📍 Abilene sat near Damascus

👤 Lysanias was a minor, lesser known ruler

🔍 Naming him shows careful research

📖 Small details support Luke's reliability

# Luke 3:2
# 📜 The Word Comes To John
---
## ✝️ Annas And Caiaphas Being The High Priests

Only one man could serve as the official high priest at a time.

Annas had held that office years earlier and still carried real influence.

Caiaphas was his son in law and now held the official title.

Luke names them both because real power stayed split between them.

✝️ Only one official high priest existed

👴 Annas was the former high priest

👤 Caiaphas held the office now

➡️ Real power stayed split between them

---
## 🗣️ The Word Of God Came Unto John

This exact phrase was used for prophets throughout the Old Testament.

It means God gave John a direct, personal message to deliver.

John was not guessing at a feeling or an idea of his own.

He was receiving a real call, the same way Isaiah or Jeremiah once did.

🗣️ This phrase marks a prophet's call

📨 God gave John a direct message

📜 Isaiah and Jeremiah received this same call

📖 John stands in that same prophetic line

---
## 🏜️ The Son Of Zacharias In The Wilderness

Zacharias was John's father, a priest introduced back in Luke chapter one.

An angel had promised Zacharias that this son would prepare the way for the Lord.

John grew up and settled in the wilderness instead of serving in the temple like his father.

That wild, empty setting fits a messenger meant to call people back to God.

🏜️ The wilderness became John's chosen home

👴 Zacharias was his priest father

👼 An angel promised this very calling

📖 John's life fulfilled chapter one's promise

# Luke 3:3-6
# 🌊 Prepare The Way
---
## 🌊 Preaching The Baptism Of Repentance

Repentance means turning away from sin and changing direction completely.

John's baptism was a public, physical sign of that inward change.

Going under the water pictured washing away an old way of living.

Coming back up pictured starting fresh.

🔄 Repentance means turning away from sin

🌊 Baptism showed that change in public

🧼 Going under pictured washing the old self away

📖 Coming up pictured a fresh start

---
## 🕊️ For The Remission Of Sins

Remission means sins being cancelled, not just excused or ignored.

It pictures a debt that gets fully erased, not just paused.

John's baptism pointed toward that cancellation, but could not accomplish it alone.

Only the one coming after him could actually pay that debt.

🕊️ Remission means sins fully cancelled

💳 Think of it like a cancelled debt

🌊 John's baptism pointed toward that promise

➡️ Jesus alone could truly pay it

---
## 📜 The Book Of The Words Of Esaias The Prophet

Esaias is simply the Greek form of the name Isaiah.

Isaiah had written this exact prophecy hundreds of years earlier.

Luke quotes him to show John's ministry was planned long in advance.

Nothing about John's arrival caught God by surprise.

📜 Esaias means Isaiah

⏳ Isaiah wrote this centuries earlier

🎯 John fulfilled a specific, old promise

📖 God planned this far in advance

---
## 📣 The Voice Of One Crying In The Wilderness

This voice is John himself, though Isaiah never names him directly.

A herald in the ancient world ran ahead of an important visitor.

His job was to shout out that someone great was coming.

John's whole ministry fits that same picture.

📣 The voice refers to John himself

🏃 Heralds ran ahead of important visitors

📢 Their job was announcing who was coming

➡️ John's ministry fits that exact role

---
## 🛣️ Prepare Ye The Way Of The Lord

Ancient kings sent workers ahead to repair the roads before they traveled.

Crews would clear rocks, fill holes, and straighten the path for the journey.

Isaiah uses that same picture for preparing hearts, not literal roads.

John's preaching worked like that advance road crew for the Lord.

🛣️ Kings sent crews to fix roads ahead

🪨 Crews cleared rocks and filled holes

❤️ Isaiah applies that picture to hearts

📖 John prepared people, not pavement

---
## ⛰️ Every Valley Shall Be Filled, And Every Mountain And Hill Shall Be Brought Low

This pictures the same road crew leveling out a rough, uneven path.

Valleys get filled in and hills get cut down so the road stays flat.

Applied to people, it means pride gets humbled and despair gets lifted.

Everyone meets Jesus on the same level ground.

⛰️ Hills and valleys picture a leveled road

💔 Proud hearts get humbled

🙌 Low, despairing hearts get lifted

📖 Everyone meets Jesus on equal ground

---
## 🔀 The Crooked Shall Be Made Straight, And The Rough Ways Shall Be Made Smooth

A crooked road forces travelers to slow down and struggle.

Smoothing it out clears every obstacle in the way.

This continues the same picture of hearts being made ready.

Nothing is left blocking the path to God.

🔀 Crooked roads slow travelers down

🧹 Smoothing clears away every obstacle

❤️ This pictures hearts being made ready

➡️ Nothing is left blocking the way

---
## 🌍 And All Flesh Shall See The Salvation Of God

All flesh means every single human being, not just the people of Israel.

Isaiah's original words already pointed past one nation to the whole world.

Luke, writing mainly for a Gentile audience, highlights this exact line.

Salvation was always meant to reach further than Israel alone.

🌍 All flesh means every human being

📜 Isaiah's prophecy already looked past Israel

✍️ Luke highlights this universal promise

📖 Salvation was always meant for everyone

# Luke 3:7-9
# 🪓 John's Sharp Warning
---
## 🐍 O Generation Of Vipers

A viper is a venomous, deadly snake.

Calling the crowd vipers means John saw real danger in their pride, not just their actions.

Snakes also flee instantly from any approaching fire.

John may be picturing people running from judgment without any real change in their hearts.

🐍 Vipers means venomous, deadly snakes

💔 John saw danger in their pride

🔥 Snakes flee fast from fire

➡️ Fleeing judgment is not real change

---
## 🔥 Who Hath Warned You To Flee From The Wrath To Come

Wrath to come means God's coming judgment on sin.

John questions whether the crowd actually understands what they are running from.

Showing up for baptism was easy.

Living a changed life afterward would prove whether it was real.

🔥 Wrath to come means God's judgment

❓ John questions their real understanding

🌊 Showing up for baptism was easy

➡️ A changed life proves it was real

---
## 🍎 Fruits Worthy Of Repentance

Fruit here means visible actions that come from a changed life.

A tree does not have to explain its fruit.

The fruit itself proves what kind of tree it is.

John expects behavior that actually proves repentance, not just words claiming it.

🍎 Fruit means visible, changed actions

🌳 A tree's fruit proves what it is

🗣️ Words alone do not prove repentance

📖 Real change shows up in behavior

---
## 👴 We Have Abraham To Our Father

Many in the crowd assumed being Abraham's descendants guaranteed their place with God.

John directly challenges that assumption.

Family history alone was never the real requirement.

God's own faithfulness mattered more than bloodline.

👴 Many assumed lineage guaranteed salvation

🚫 John challenges that exact assumption

🩸 Bloodline alone was never enough

➡️ A relationship with God is not inherited

---
## 🪨 God Is Able Of These Stones To Raise Up Children Unto Abraham

In Hebrew, the word for stones and the word for children sound almost alike.

John may be using that wordplay to make his point land harder.

God does not need Abraham's actual bloodline to keep His promises.

He can raise up faithful children from anywhere, even from nothing.

🪨 Stones and children sound alike in Hebrew

🔤 John likely uses that wordplay on purpose

🚫 God does not need bloodline alone

📖 God can raise up faith from nothing

---
## 🪓 The Axe Is Laid Unto The Root Of The Trees

A farmer lays an axe at the root right before cutting a tree down.

It is a picture of judgment that has already begun, not judgment far in the future.

John warns that time to change was running out quickly.

The danger was already resting at the base of the tree.

🪓 An axe at the root means judgment

⏳ Not a future danger, an active one

🌳 Time to change was running out

➡️ Delay was no longer safe

---
## 🔥 Every Tree Therefore Which Bringeth Not Forth Good Fruit Is Hewn Down, And Cast Into The Fire

A tree that never produces good fruit gets cut down and burned.

Farmers did this to keep a bad tree from wasting good soil.

John applies the same standard to people's lives.

A life with no real fruit faces the same fate as that wasted tree.

🔥 Fruitless trees were cut down and burned

🌱 Bad trees wasted good soil

👤 John applies this to people's lives

📖 Fruitless living faces real judgment

# Luke 3:10-14
# 💰 What Shall We Do
---
## ❓ What Shall We Do Then

This same question gets asked three separate times in this passage.

Ordinary crowds, tax collectors, and soldiers all ask it.

John never tells any of them to abandon their jobs.

He tells each group to do their existing work honestly instead.

❓ Three different groups ask this question

👥 Crowds, tax collectors, and soldiers all ask

🚫 John never demands a new career

📖 Honesty in daily life was the real answer

---
## 👕 He That Hath Two Coats, Let Him Impart To Him That Hath None

A coat here means a basic outer garment, not a luxury item.

Owning two meant having more than enough for one person.

John calls for simple, practical generosity, not a dramatic gesture.

True repentance shows up in ordinary sharing, not just strong emotion.

👕 A coat was a basic outer garment

➕ Two coats meant having more than enough

🤝 John calls for practical generosity

📖 Real repentance shows in daily sharing

---
## 💰 Then Came Also Publicans To Be Baptized

Publicans were local tax collectors working for the Roman government.

Most Jews despised them as traitors who grew rich off their own people.

Even this hated group came looking for a changed life.

John never turns away anyone who genuinely wants to change.

💰 Publicans were local tax collectors

😠 Most Jews despised them as traitors

🚪 Even outcasts came seeking change

➡️ John welcomed anyone willing to repent

---
## ⚖️ Exact No More Than That Which Is Appointed You

Rome allowed tax collectors to set their own collection fees.

Many used that freedom to overcharge and pocket the difference.

John tells them to collect only the honest, appointed amount.

Repentance meant giving up easy, dishonest profit.

⚖️ Collectors could legally set their own fees

💸 Many overcharged people for personal profit

✅ John demands only the honest amount

➡️ Repentance meant giving up easy profit

---
## 🛡️ The Soldiers Likewise Demanded Of Him

These were likely local soldiers serving under Herod, not Roman legionaries.

Soldiers held real power over ordinary people in daily life.

Their question shows John's message was reaching every level of society.

Nobody was outside the reach of his warning.

🛡️ These were likely Herod's local soldiers

💪 Soldiers held real power daily

🌍 John's message reached every level of society

📖 No one stood outside his warning

---
## ✋ Do Violence To No Man, Neither Accuse Any Falsely

Soldiers in this era sometimes used their power to extort money.

A false accusation could threaten someone into paying a bribe.

John condemns both the violence and the lying that often came with that power.

Power without honesty always leads to real harm.

✋ Soldiers sometimes extorted money through threats

🗣️ False accusations could force a bribe

🚫 John condemns both abuses directly

➡️ Power without honesty causes real harm

---
## 💵 Be Content With Your Wages

A soldier's wage was fixed and often modest.

Many soldiers supplemented it through bribery, theft, or abuse of their position.

John calls for contentment instead of exploiting people for extra income.

Honest living meant accepting a fair wage instead of taking more.

💵 A soldier's wage was fixed and modest

🪙 Many took bribes to supplement it

🙏 John calls for simple contentment

📖 Honesty meant accepting a fair wage

# Luke 3:15-18
# 🔥 The One Who Is Coming
---
## 🤔 All Men Mused In Their Hearts Of John, Whether He Were The Christ

Christ means Messiah, God's promised anointed King.

Many Jews in this era were actively watching for that figure to appear.

John's popularity made some wonder if he was finally that long awaited King.

John is about to correct that assumption directly.

🤔 Christ means Messiah, the promised King

👀 Many were actively watching for him

❓ Some wondered if John was that King

➡️ John is about to correct that idea

---
## 🌊 I Baptize You With Water

John immediately lowers himself compared to the one coming after him.

Water baptism was real, but it only pictured an inward change.

It could not actually produce that change on its own.

John wants no confusion about who holds the greater role here.

🌊 Water baptism only pictured change

🚫 It could not produce that change alone

👤 John lowers himself on purpose

➡️ A greater role belongs to another

---
## 💪 One Mightier Than I Cometh

John openly admits someone far greater is coming after him.

This takes real humility from a man the whole crowd was following.

John never lets his own popularity distract from his actual mission.

His entire purpose was pointing people toward someone else.

💪 Someone far greater is coming

🙇 This admission took real humility

🎯 John never chased his own fame

📖 His mission always pointed elsewhere

---
## 👞 The Latchet Of Whose Shoes I Am Not Worthy To Unloose

A latchet was simply the strap or lace of a sandal.

Removing someone's sandals was considered the lowest servant's job in this culture.

John says he is not even worthy of that lowest task.

That is how far beneath Jesus John considered himself.

👞 A latchet means a sandal strap

🧎 Removing sandals was the lowest servant's task

⬇️ John places himself beneath that task

📖 True greatness often looks like humility

---
## 🔥 He Shall Baptize You With The Holy Ghost And With Fire

This baptism is not water at all, but God's own presence.

The Holy Ghost fills and changes a person from the inside.

Fire here pictures purifying what is truly valuable and burning away what is not.

Jesus offers a baptism John's water could never provide.

🔥 This baptism is not water at all

🕊️ The Holy Ghost changes a person inside

🧹 Fire pictures purifying what matters

➡️ Jesus offers what water never could

---
## 🌬️ Whose Fan Is In His Hand

A fan here means a winnowing fork, a farming tool.

Farmers used it to toss grain into the air after harvest.

Wind would carry off the light, useless husks while the heavy grain fell back down.

This becomes a picture of Jesus sorting out what is real from what is not.

🌬️ A fan here means a winnowing fork

🌾 It separated grain from husks by wind

⬇️ Heavy grain fell back to the ground

➡️ Jesus sorts what is real

---
## 🏚️ Purge His Floor, And Will Gather The Wheat Into His Garner

A threshing floor was a flat, open space used to process harvested grain.

A garner means a storehouse built to keep valuable grain safe.

Jesus is pictured gathering what is genuine into lasting safety.

Nothing good gets lost in that final sorting.

🏚️ A threshing floor processed harvested grain

🏠 A garner means a storehouse

🌾 Jesus gathers what is genuine

📖 Nothing good is lost in the end

---
## 🔥 The Chaff He Will Burn With Fire Unquenchable

Chaff means the dry, useless husk left over after threshing.

Farmers burned it because it had no value and no other use.

Unquenchable means this fire cannot be put out once it starts.

John's warning ends on the seriousness of a judgment nobody can stop.

🔥 Chaff means the useless leftover husk

🗑️ It had no value and was burned

♾️ Unquenchable means it cannot be put out

📖 John ends on judgment's real seriousness

# Luke 3:19-20
# ⛓️ Herod Silences John
---
## 👑 But Herod The Tetrarch

This is the same Herod Antipas named back in verse one.

He ruled Galilee, the very region where much of John's ministry happened.

A local ruler was about to collide directly with a bold prophet.

John's message was never only for ordinary crowds.

👑 Same Herod Antipas from verse one

📍 He ruled Galilee, John's own region

⚔️ A ruler now collides with a prophet

➡️ John's message reached rulers too

---
## 😠 Being Reproved By Him For Herodias His Brother Philip's Wife

Reproved means openly corrected or rebuked.

Herod had taken Herodias, who was already married to his own brother.

Jewish law clearly forbade marrying a brother's living wife.

John said so publicly, at real personal risk.

😠 Reproved means openly rebuked

💍 Herod took his own brother's wife

🚫 Jewish law clearly forbade that marriage

➡️ John spoke the truth at real risk

---
## 👪 His Brother Philip's Wife

This Philip is not the same tetrarch Philip named back in verse one.

Herod the Great had several sons, and more than one was named Philip.

This particular Philip was a private half brother, not a ruling tetrarch.

Herodias left him to marry Herod Antipas instead.

👪 A different Philip than verse one's tetrarch

👨‍👨‍👦 Herod the Great had multiple sons named Philip

🏠 This Philip held no public office

➡️ Herodias left him for Herod Antipas

---
## ⛓️ He Shut Up John In Prison

Herod silences the one man willing to confront him publicly.

Power can lock away a messenger, but it cannot undo the truth already spoken.

This sets up John's final chapter later in the Gospels.

Boldness toward sin always carries a real cost.

⛓️ Herod silences his loudest critic

🔒 Power can jail a man, not his words

📖 This sets up John's coming end

➡️ Speaking truth to power carries real cost

# Luke 3:21-22
# 🕊️ Heaven Opens Over Jesus
---
## 🌊 Jesus Also Being Baptized

Jesus joins the ordinary crowd instead of standing apart from them.

He had no sin of His own needing to be washed away.

He identified fully with the people He came to save.

Humility marks His ministry from this very first public act.

🌊 Jesus was baptized among the crowd

✝️ He had no sin needing washing

🤝 He identified fully with sinful people

📖 Humility marked His ministry from the start

---
## 🙏 And Praying

Luke mentions Jesus praying far more often than the other Gospels do.

This moment of prayer comes right before heaven visibly responds.

Prayer consistently comes before major turning points in Luke's account.

Jesus depended on real, ongoing communication with His Father.

🙏 Luke highlights prayer more than other Gospels

⏳ This prayer comes right before heaven answers

🔑 Prayer often precedes major turning points

➡️ Jesus depended on His Father constantly

---
## ☁️ The Heaven Was Opened

This phrase pictures a barrier between heaven and earth being pulled back.

The prophet Isaiah had once begged God to tear the heavens open like this.

What Isaiah longed for finally happens visibly at this moment.

Heaven is no longer silent or distant.

☁️ A barrier between heaven and earth opens

📜 Isaiah once prayed for this exact moment

⏳ His old prayer is answered here

📖 Heaven is no longer silent

---
## 🕊️ The Holy Ghost Descended In A Bodily Shape Like A Dove Upon Him

The Spirit takes a visible, physical form that everyone present could see.

A dove often pictures gentleness and peace rather than raw power.

Some see an echo of Genesis, where God's Spirit hovered over the waters at creation.

A new act of creation begins through this one moment.

🕊️ The Spirit took a visible form

🌿 A dove pictures gentleness and peace

🌊 Some see an echo of Genesis one

📖 A new creation begins here

---
## 🗣️ A Voice Came From Heaven

God the Father speaks directly and audibly at this moment.

Father, Son, and Holy Spirit all appear together in this single scene.

This is one of the clearest moments in the Gospels where all three are visible at once.

God confirms who Jesus is before His public ministry even begins.

🗣️ The Father speaks audibly here

✝️ Father, Son, and Spirit all appear together

👁️ Rarely are all three this visible at once

📖 God confirms Jesus before His ministry starts

---
## ❤️ Thou Art My Beloved Son

This declaration comes before Jesus performs a single miracle.

In thee I am well pleased means the Father's approval was already complete.

These words echo both Psalm two and Isaiah forty two.

Both passages point to a chosen king and a chosen servant, now united in one person.

❤️ Approval comes before any miracle

🎁 The Father's love was never earned

📜 Echoes Psalm two and Isaiah forty two

📖 King and servant unite in Jesus

# Luke 3:23
# 📜 As Was Supposed
---
## 📆 Jesus Himself Began To Be About Thirty Years Of Age

Thirty was the age many priests and kings began their official service.

Jesus begins His public ministry at that same meaningful age.

Luke marks the moment carefully instead of leaving it vague.

A long, quiet life now opens into a public one.

📆 Thirty marked a meaningful age for service

👑 Priests and kings often began at that age

🎯 Jesus starts His ministry right on time

➡️ A quiet life opens into a public one

---
## 👤 Being, As Was Supposed, The Son Of Joseph

Luke already explained in chapter one that Joseph was not Jesus's biological father.

Supposed means this was Joseph's legal, assumed role, not a hidden secret from Luke.

Mary conceived Jesus through the Holy Spirit, not through Joseph.

Luke includes this detail on purpose, not by accident.

👤 Joseph was not the biological father

📜 Chapter one already explained the virgin birth

✅ Supposed means the public, legal assumption

📖 Luke includes this detail on purpose

---
## 🌳 Which Was The Son Of Heli

Joseph's genealogy in Matthew traces through his own father, a different man named Jacob.

Many scholars believe Heli here was actually Mary's father.

Ancient custom sometimes listed a son in law under his father in law's line.

That would make Luke's genealogy Mary's family line, while Matthew gives Joseph's.

🌳 Matthew names Joseph's father as Jacob

👩 Many scholars believe Heli was Mary's father

📋 Sons in law were sometimes listed this way

📖 Two Gospels may trace two different parents

# Luke 3:24-30
# 🌳 Familiar Names Repeat
---
## 🔁 Which Was The Son Of

This same phrase repeats dozens of times across these verses.

Luke moves backward in time, from Joseph's generation toward the very beginning.

Matthew's genealogy in his first chapter moves forward instead, from Abraham to Jesus.

Two different directions, telling two different parts of the same story.

🔁 This phrase repeats dozens of times

⬅️ Luke moves backward through history

➡️ Matthew's genealogy instead moves forward

📖 Two directions, one connected story

---
## 🌳 Which Was The Son Of Matthat

The name Matthat appears twice in this one genealogy.

Verse twenty four and verse twenty nine both name a different man called Matthat.

Ancient Jewish families often reused the same names across generations.

A repeated name in a family tree does not mean the same person appears twice.

🌳 Matthat appears twice in this list

🔁 Verse twenty four and verse twenty nine

👪 Families often reused names across generations

📖 A repeated name is not the same man

---
## 👪 Which Was The Son Of Simeon, Which Was The Son Of Juda

Simeon and Juda were also the names of two of Jacob's famous twelve sons.

These two men in Jesus's family line are not those same patriarchs.

They simply carried names that were already common and honored in Israel.

Sharing a famous name does not create a direct family link.

👪 Simeon and Juda were common Israelite names

🚫 These men are not Jacob's famous sons

📛 The names were already honored in Israel

➡️ A shared name is not a shared identity

# Luke 3:31-38
# 🌳 Back To Adam
---
## 👑 Which Was The Son Of David

David was Israel's great king, promised an heir who would reign forever.

Matthew's genealogy reaches David through his son Solomon, the next king.

Luke instead reaches David through Nathan, a different, lesser known son.

Two separate family branches both lead back to the same promised king.

📜 David received a promise of an eternal heir

👑 Matthew traces David through Solomon

🌿 Luke traces David through Nathan instead

📖 Two branches, one royal promise

---
## 🙏 Which Was The Son Of Abraham

Abraham received God's original promise to bless every nation through his family.

Matthew's genealogy begins with Abraham as its very first name.

Luke keeps going much further back than that starting point.

Luke's Gospel keeps widening its focus beyond Israel alone.

🙏 Abraham received the original family promise

🏁 Matthew's genealogy begins right here

🌍 Luke continues much further back

📖 Luke keeps widening the story's reach

---
## 🌊 Which Was The Son Of Noe

Noe is simply the name Noah, written in its Greek form.

Noah survived the flood described earlier in the book of Genesis.

His family became the ancestor of every nation on earth, not Israel alone.

Jesus's line passes directly through that same shared, universal ancestor.

🌊 Noe means Noah

📜 Noah's flood fills Genesis chapters six through nine

🌍 His family became every nation's ancestor

📖 Jesus shares that universal ancestry

---
## 🚶 Which Was The Son Of Enoch

Genesis describes this Enoch as a man who walked closely with God.

Genesis also says plainly that Enoch never died in the normal way.

Luke lists his name here without stopping to explain that detail.

A careful reader catches it anyway, buried quietly in a long list of names.

🚶 Enoch walked closely with God

🚫 Genesis says he did not die normally

📜 Luke lists him without extra comment

➡️ Careful readers notice it anyway

---
## 👤 Adam, Which Was The Son Of God

This final name reaches all the way back to the very first human being.

Son of God here means directly created by God, not born through a human father.

Luke's genealogy ends further back than any other Gospel's family record.

Jesus's story connects to every person who ever lived, not just one nation.

👤 Adam was the very first human being

🛠️ Son of God means directly created by God

📏 Luke's genealogy reaches furthest back of any Gospel

📖 Jesus's story connects to all humanity
`.trim();

export const LUKE_THREE_PERSONAL_SECTIONS = parseLukeThreeRawNotes(LUKE_THREE_RAW_NOTES);
