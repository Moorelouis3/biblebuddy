export type FirstKingsFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsFourteenRawNotes(rawText: string): FirstKingsFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsFourteen\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsFourteen\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsFourteen\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 14:${startVerse}` : `1 Kings 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 1 Kings 14 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_FOURTEEN_RAW_NOTES = `# FirstKingsFourteen 14:1-4
# 🤒 Abijah's Sickness And The Disguised Journey
---
## 👶 Abijah The Son Of Jeroboam Fell Sick

"Abijah" means my father is the LORD.

Jeroboam gave his own son a name honoring the true God.

Yet Jeroboam filled Israel with golden calves instead.

The name and the father's life do not match.

A sick child now forces Jeroboam to face that gap.

👶 Abijah means my father is the LORD

🐄 Jeroboam still worshiped golden calves

⚖️ His son's name contradicts his own life

📖 Sickness forces him to face the gap

## 🥸 Disguise Thyself, That Thou Be Not Known

Jeroboam does not want his wife recognized in Shiloh.

He built new altars and turned Israel away from the LORD's true worship.

Being seen consulting God's true prophet would expose that hypocrisy.

The king who replaced worship of the LORD still needs a true word from Him.

He wants a word without admitting need.

🥸 Jeroboam hides his wife's identity

🐄 He built rival altars to the LORD's worship

🙈 Exposure would reveal his hypocrisy

📖 He wants a word without admitting need

## 👑 Ahijah The Prophet, Which Told Me That I Should Be King

Ahijah is not a stranger to Jeroboam.

Years earlier Ahijah met him on a road outside Jerusalem.

He tore his own new garment into twelve pieces.

He gave Jeroboam ten of them as a sign he would rule ten tribes.

That earlier promise from Ahijah is exactly why Jeroboam trusts him now.

✂️ Ahijah once tore a garment into pieces

👑 Ten pieces promised Jeroboam ten tribes

🤝 That promise made Jeroboam king

📖 The same prophet is trusted again now

## 🍞 Take With Thee Ten Loaves, And Cracknels, And A Cruse Of Honey

"Cracknels" means small hard baked cakes or biscuits.

A "cruse" is a small clay jar used for holding liquid.

This gift looks like something a common woman would bring, not a queen.

The plain food matches the plain disguise Jeroboam wants her to wear.

Even the offering is part of the deception.

🍞 Cracknels means hard baked cakes

🏺 A cruse is a small clay jar

👗 The gift matches a common woman's disguise

📖 Even the offering hides the truth

## 😨 He Shall Tell Thee What Shall Become Of The Child

Jeroboam sends this errand because he is afraid for his son.

He does not go to Ahijah himself.

Sending his wife in disguise lets him hide his own desperation.

A king who abandoned God's prophet now quietly needs his help.

Fear can drive people back to the very voice they ignored.

😨 Jeroboam fears for his sick son

🙅 He will not go himself

🥸 His wife hides his desperation

📖 Fear drives him back to God's prophet

## ⛺ Jeroboam's Wife Did So, And Arose, And Went To Shiloh

Shiloh once held the tabernacle for hundreds of years before Solomon's temple.

It was the place Israel worshiped the LORD long before Jerusalem became the center.

By this time Shiloh was not the capital of anything.

It was simply where God's faithful prophet still lived.

Jeroboam's wife walks a long road back to that old holy place.

⛺ Shiloh once held the tabernacle

🕰️ Israel worshiped there before Jerusalem

👴 A faithful prophet still lived there

📖 She returns to old holy ground

## 👴 Ahijah Could Not See, For His Eyes Were Set By Reason Of His Age

Ahijah has grown elderly by this point in the story.

His eyes have failed with age, and he cannot see who enters his house.

This detail seems small, but it sets up what happens next.

A man who cannot see with his eyes is about to prove he sees with something else.

Physical blindness never limits what God reveals to him.

👴 Ahijah has grown old and blind

🕶️ His eyes fail him completely

🔮 Physical sight is not spiritual sight

📖 God reveals truth beyond his eyes

# FirstKingsFourteen 14:5-6
# 👂 The Blind Prophet Already Knows
---
## 📣 The LORD Said Unto Ahijah, Behold, The Wife Of Jeroboam Cometh

God warns Ahijah before Jeroboam's wife ever reaches his door.

Ahijah does not need his eyes to know who is coming.

The LORD tells him everything he needs to say to her.

Nothing about this visit will surprise the prophet.

God's knowledge reaches further than any disguise can hide.

📣 God warns Ahijah in advance

👂 Ahijah needs no eyes to know

📜 The LORD supplies his exact words

📖 No disguise can hide from God

## 🎭 She Shall Feign Herself To Be Another Woman

"Feign" means to pretend or fake something that is not true.

Jeroboam's wife plans to act like an ordinary visitor, not a queen.

God names her plan before she even attempts it.

Her disguise was never going to work on the LORD.

What fools men rarely fools God.

🎭 Feign means to pretend

👑 She plans to hide her identity

🚫 God already knows the plan

📖 Human tricks cannot deceive the LORD

## 👣 Ahijah Heard The Sound Of Her Feet

Ahijah cannot see her, but he hears her footsteps at the door.

His blindness sharpened other senses, but the real source here is God.

The LORD had already told him exactly who was coming.

Hearing footsteps becomes the moment prophecy meets reality.

What looks like a natural detail carries a supernatural cause behind it.

👣 He hears footsteps, not sees her

🙉 Blindness sharpened his hearing

📜 God had already told him who it was

📖 A natural sound carries a supernatural cause

## 🥸 Why Feignest Thou Thyself To Be Another? I Am Sent With Heavy Tidings

Ahijah exposes her disguise the moment she walks in.

There is no point pretending any further.

"Heavy tidings" means news that will bring grief and sorrow.

Ahijah warns her plainly before he says one more word.

Nothing gentle is about to be spoken in this house.

🥸 Her disguise fails instantly

🗣️ Ahijah exposes her at once

😔 Heavy tidings means grievous news

📖 A hard message is coming next

# FirstKingsFourteen 14:7-9
# ⚖️ The LORD Lists Jeroboam's Betrayal
---
## 🙋 Forasmuch As I Exalted Thee From Among The People

Jeroboam did not start life as a king or a prince.

God calls him up from being an ordinary man in Israel.

This reminder comes before any accusation is made.

God wants Jeroboam to remember where his power actually came from.

Every gift he was given traces back to this one choice by God.

🙋 Jeroboam started as an ordinary man

👑 God lifted him up personally

🎁 His power came as a gift

📖 Every gift traces back to God

## 👑 Made Thee Prince Over My People Israel

"Prince" here simply means ruler or leader, not a king's son.

God calls Israel "my people," not Jeroboam's people.

The nation Jeroboam rules still belongs to the LORD.

Jeroboam was only ever a caretaker, never the true owner.

Forgetting that difference is at the center of his failure.

👑 Prince means ruler here

🙌 Israel is still called God's people

🧑‍🌾 Jeroboam was only a caretaker

📖 Forgetting that truth caused his failure

## ✂️ Rent The Kingdom Away From The House Of David, And Gave It Thee

"Rent" means torn or torn away by force.

This is the same image Ahijah used when he tore his garment years earlier.

God tore ten tribes away from David's family and handed them to Jeroboam.

That gift was never something Jeroboam earned on his own.

The same tearing language now returns to describe his coming judgment.

✂️ Rent means torn away

👗 It echoes the torn garment sign

🎁 Jeroboam did not earn this gift

📖 The same word returns as judgment

## 👑 Thou Hast Not Been As My Servant David, Who Kept My Commandments

David was not a perfect king by any measure.

He sinned seriously more than once during his reign.

But David kept turning back to God with his whole heart.

Jeroboam has shown no sign of that same wholehearted return.

God is not asking for perfection, only for a loyal heart.

👑 David was not a perfect king

🔁 He kept turning back to God

🚫 Jeroboam shows no such return

📖 God asks for loyalty, not perfection

## 📈 Hast Done Evil Above All That Were Before Thee

This is a strong claim, since kings before Jeroboam had real failures too.

Solomon himself turned to foreign gods late in his reign.

Jeroboam's sin is not a private failure kept quiet.

He built an entire system of worship around it for the whole nation.

Leading a nation into sin is worse than falling into it alone.

👑 Earlier kings had real failures too

🕌 Solomon turned to foreign gods late

🏛️ Jeroboam built a whole system of sin

📖 Leading a nation into sin is worse

## 🔥 Made Thee Other Gods, And Molten Images

"Molten images" means statues formed from metal melted down and poured into a mold.

These are the golden calves Jeroboam set up at Bethel and Dan.

He built them so his people would not travel to Jerusalem to worship.

A political decision to keep power turned into a permanent sin.

Convenience became the excuse for open idolatry.

🔥 Molten images means melted metal statues

🐄 These are the golden calves

🚧 They kept people from Jerusalem

📖 A political choice became lasting sin

## 🙈 Cast Me Behind Thy Back

"Cast behind the back" means thrown away where it cannot even be seen.

Jeroboam did not just neglect God quietly.

He deliberately pushed the LORD out of view.

Turning your back on someone is a deliberate act, not an accident.

God names that rejection in the plainest possible terms.

🙈 Cast behind means thrown away

🚶 It is a deliberate act

🙅 Jeroboam pushed God out of view

📖 God names the rejection plainly

# FirstKingsFourteen 14:10-11
# 💀 The Sentence On His House
---
## 🚹 Him That Pisseth Against The Wall

"Pisseth against the wall" is an old, blunt way of saying every male.

It is not polite language, but the Bible does not soften it here.

The judgment reaches every son and every male descendant.

No male heir will be spared from this sentence.

Plain language matches the seriousness of what is coming.

🚹 This phrase simply means every male

🗣️ The Bible states it bluntly

👨‍👦 Every son and heir is included

📖 No male heir escapes this sentence

## 🚪 Him That Is Shut Up And Left In Israel

This old phrase covers every kind of person, with no exceptions.

It includes those under authority and those left completely on their own.

Together with the previous phrase, it means the judgment misses no one.

Jeroboam's family will not be able to hide a single survivor.

A sentence this total leaves nothing to chance.

🚪 Shut up and left means everyone

🚫 No one is excepted here

👪 The whole family is covered

📖 Nothing is left to chance

## 💩 Take Away The Remnant Of The House Of Jeroboam, As A Man Taketh Away Dung

Dung was swept up and hauled away completely, with nothing left behind.

That is the picture God uses for what remains of Jeroboam's family.

This is not gentle removal, but total and shameful disposal.

A once honored royal house is compared to waste.

Pride built on rebellion ends in this kind of ruin.

💩 Dung means waste, swept away completely

🧹 Removal here is total, not gentle

👑 A royal house is compared to waste

📖 Rebellion ends in shameful ruin

## 🐕 Him That Dieth In The City Shall The Dogs Eat

A proper burial mattered deeply in this culture.

Being eaten by dogs or birds instead was the worst kind of dishonor.

Families believed the dead needed rest with their ancestors.

This judgment removes that dignity from everyone in Jeroboam's house.

Even in death there is no peace for this family.

🐕 Dogs eating the dead was total dishonor

🪦 Burial with ancestors mattered deeply

🚫 This judgment removes that dignity

📖 No peace follows this family, even in death

## 🗣️ For The LORD Hath Spoken It

This short line closes the sentence with total certainty.

It is not a threat that might change.

Every earlier detail in this judgment now stands as settled fact.

God's spoken word does not need anyone's agreement to come true.

What He has spoken, He will bring to pass.

🗣️ This closes the sentence with certainty

🔒 The judgment is now settled

🙌 God needs no agreement to act

📖 What He speaks, He brings to pass

# FirstKingsFourteen 14:12-13
# ⚰️ One Son Gets A Grave
---
## 👣 When Thy Feet Enter Into The City, The Child Shall Die

Ahijah gives an exact and testable detail, not a vague warning.

The child's death is tied to the very moment she steps into the city.

A prophecy this specific cannot be explained away later.

There is no room to doubt whether this word truly came true.

God ties His warnings to real, checkable moments.

👣 The timing is exact and specific

🚪 Death comes right as she enters

✅ This detail cannot be explained away

📖 God ties warnings to real moments

## ⚰️ He Only Of Jeroboam Shall Come To The Grave

Every other member of Jeroboam's house loses the honor of burial.

This one child is the only exception in the entire judgment.

Losing a son to death is grief, but this grave is still a mercy.

God draws a clear line between this child and the rest of the family.

Judgment on a family can still leave room for individual mercy.

⚰️ Only this child receives a grave

🚫 The rest of the family loses that honor

❤️ A grave here is still mercy

📖 Judgment can still leave room for mercy

## ❓ In Him There Is Found Some Good Thing Toward The LORD

The text never explains exactly what this good thing was.

It is enough that God saw something faithful in this one child.

Even inside a corrupt household, one person's heart can still stand apart.

God notices that difference even when no one else does.

A single faithful spark can matter even in a ruined family.

❓ The text does not name the good thing

👀 God still noticed something faithful

💎 One heart can stand apart from a family

📖 God sees faithfulness others miss

# FirstKingsFourteen 14:14-16
# 🌊 A Nation Uprooted, A Word Fulfilled
---
## 👑 The LORD Shall Raise Him Up A King Over Israel

This verse points ahead to a king not yet named.

Later in this same book, a man named Baasha rises up and does exactly this.

Baasha kills every remaining member of Jeroboam's family.

God had already announced that future king before he ever appeared.

A judgment spoken here plays out in a chapter still to come.

👑 A future king is announced here

⚔️ Baasha later fulfills this exact word

👪 He wipes out Jeroboam's whole family

📖 A later chapter completes this promise

## ⏱️ But What? Even Now

This strange little phrase adds urgency to the warning.

It signals that events are already beginning, not sitting far in the future.

The judgment on Jeroboam's house is not a distant possibility.

It is already starting to move.

God's warnings are rarely as far away as people hope.

⏱️ This phrase adds urgent timing

🚀 Judgment is already beginning

🚫 It is not a distant possibility

📖 Warnings arrive sooner than people hope

## 🌾 As A Reed Is Shaken In The Water

A reed growing in water has no firm roots in solid ground.

The current can push it back and forth without resistance.

God compares Israel's future to that same unstable image.

The nation will be shaken and unsettled instead of standing firm.

A people who abandoned their true foundation cannot expect to stand steady.

🌾 A reed has no firm roots

🌊 Water pushes it back and forth

🇮🇱 Israel will be shaken the same way

📖 Abandoning God removes true stability

## 🌳 Scatter Them Beyond The River, Because They Have Made Their Groves

"Groves" refers to wooden poles or trees set up to worship the goddess Asherah.

This was a common and serious form of idolatry in the ancient Near East.

"Beyond the river" points to exile far past the Euphrates River.

This is an early prophecy of the exile that later strikes the northern kingdom.

Centuries later, Assyria carries Israel away almost exactly as described here.

🌳 Groves means Asherah worship poles

🚫 This idolatry was a serious sin

🌊 Beyond the river points to exile

📖 Assyria later fulfills this warning

## 🔁 Who Did Sin, And Who Made Israel To Sin

This exact phrase becomes a refrain used again and again in the book of Kings.

Later kings of Israel are measured against this same description of Jeroboam.

His personal sin was serious, but leading a whole nation into it was worse.

A leader's influence can multiply one man's failure into a national one.

This phrase becomes his lasting legacy in Israel's story.

🔁 This phrase repeats often in Kings

⚖️ Personal sin and national sin differ

📢 A leader's influence multiplies failure

📖 This becomes Jeroboam's lasting legacy

# FirstKingsFourteen 14:17-18
# 🚪 The Word Comes True
---
## 🏙️ Came To Tirzah

Tirzah was a city that later became a capital of the northern kingdom.

At this point it seems to be Jeroboam's own royal home.

The wife travels all the way back from Shiloh to reach it.

This detail places the story on a real, specific map.

These were not distant legends but events tied to real places.

🏙️ Tirzah later became a royal capital

🏠 It appears to be Jeroboam's home here

🗺️ The journey covers real distance

📖 This story is tied to real places

## 🎯 When She Came To The Threshold Of The Door, The Child Died

Ahijah's exact words from earlier in the chapter come true here.

The child dies at the very moment she steps through the door.

Nothing about the timing is vague or approximate.

God's word lands exactly where He said it would.

A prophecy this precise leaves no room for coincidence.

🚪 The child dies right at the threshold

🎯 This matches Ahijah's exact timing

✅ Nothing here is left vague

📖 Precise fulfillment rules out coincidence

## ✋ According To The Word Of The LORD, By The Hand Of His Servant Ahijah

"By the hand of" is an old way of saying through or by means of.

The narrator stops to confirm that this event matches God's earlier word exactly.

Ahijah is called God's servant here, a title of honor.

The whole nation ends up mourning what Ahijah first spoke privately.

A quiet prophecy in a blind man's house becomes a nationwide event.

✋ By the hand of means through

✅ The narrator confirms exact fulfillment

👴 Ahijah is honored as God's servant

📖 A private word becomes a national event

# FirstKingsFourteen 14:19-20
# 📜 Jeroboam's Reign Ends
---
## 📚 Written In The Book Of The Chronicles Of The Kings Of Israel

This "book of the chronicles" is not the same as the Bible books called Chronicles.

It was likely an official court record that has since been lost.

The Bible often points to sources like this without including everything they contained.

Not everything Jeroboam did made it into Scripture.

Scripture keeps what matters for its own purpose, not a complete record.

📚 This chronicles book is now lost

🏛️ It was likely an official court record

🚫 It differs from the Bible's Chronicles

📖 Scripture keeps only what serves its purpose

## 😴 He Slept With His Fathers

This is a common way the Bible describes a king's death.

It gently means that he died, not that he woke up again.

The phrase often includes being buried near earlier family members.

Kings pass in this same worded way throughout the book of Kings.

Even for Jeroboam, the ordinary language of death is used.

😴 Slept with his fathers means died

🪦 It often points to family burial

🔁 This phrase repeats throughout Kings

📖 Even Jeroboam gets ordinary death language

## 👑 Nadab His Son Reigned In His Stead

Nadab becomes the next king of Israel after his father.

His reign will not last long, according to later chapters.

Baasha, the king promised back in verse fourteen, kills him and takes the throne.

This short mention quietly sets up that whole story.

The judgment spoken in this chapter is already moving toward Nadab.

👑 Nadab succeeds his father Jeroboam

⏳ His reign will be brief

⚔️ Baasha later kills him and rules

📖 This verse sets up that judgment

# FirstKingsFourteen 14:21-24
# 🐄 Rehoboam Reigns Over A Sinning Judah
---
## 🏙️ The City Which The LORD Did Choose Out Of All The Tribes, To Put His Name There

God specifically chose Jerusalem as the city for His name to dwell.

This choice makes Jeroboam's rival altars in Bethel and Dan even more serious.

Rehoboam still rules from the city God actually selected.

Political division did not erase that original choice.

One truth about Jerusalem never changed, even after the kingdom split.

🏙️ God chose Jerusalem specifically

🐄 That makes Jeroboam's altars worse

👑 Rehoboam rules from the true city

📖 God's choice outlasted the divided kingdom

## 👑 His Mother's Name Was Naamah An Ammonitess

Naamah was one of the foreign wives Solomon married late in his life.

Those foreign marriages were part of what drew Solomon's heart away from God.

Rehoboam is literally the son of that very compromise.

The consequences of Solomon's choices did not end with Solomon.

A father's decisions can shape the next generation long after he is gone.

👑 Naamah was one of Solomon's foreign wives

💔 Those marriages pulled Solomon from God

👶 Rehoboam is the son of that compromise

📖 A father's choices outlive him

## 💍 They Provoked Him To Jealousy With Their Sins

God's jealousy here is not the same as ordinary human jealousy.

It is the response of a husband whose wife has been unfaithful.

The covenant between God and Israel was often described using marriage language.

Idolatry was treated as a kind of spiritual unfaithfulness.

This word carries real relational weight, not just anger.

💍 Jealousy fits covenant marriage language

💔 Idolatry acted like unfaithfulness

🚫 This is not petty human jealousy

📖 God's jealousy reflects a real relationship

## 📈 Above All That Their Fathers Had Done

Sin rarely stays the same size once it starts.

Judah's wrongdoing under Rehoboam goes further than what came before.

Earlier generations under David and Solomon had serious failures too.

This new generation somehow pushes past even those failures.

Toleration in one generation often grows into worse sin in the next.

📈 This sin surpasses earlier generations

🌱 Unaddressed sin tends to grow

🔁 Judah slides the same direction as Israel

📖 Toleration lets sin multiply over time

## ⛰️ Built Them High Places, And Images, And Groves

"High places" were raised outdoor platforms used for worship and sacrifice.

Some were originally used to worship the LORD Himself, though not the way He commanded.

Over time these same sites became centers for idols instead.

Judah copies the same pattern already condemned in the north.

The whole land begins filling up with unauthorized worship sites.

⛰️ High places were raised worship sites

🕯️ Some once honored the LORD improperly

🐄 Many became sites for idols

📖 Judah copies Israel's same pattern

## 🌳 On Every High Hill, And Under Every Green Tree

This exact phrase shows up again and again throughout the book of Kings.

It is a fixed way of describing worship that has spread absolutely everywhere.

This is not one shrine in one town.

It describes idolatry covering the entire landscape of Judah.

A phrase this repeated signals just how normal this sin had become.

🌳 This phrase repeats often in Kings

🗺️ It describes worship spreading everywhere

🚫 This is not one isolated shrine

📖 Repetition shows how normal sin had become

## 🏛️ There Were Also Sodomites In The Land

"Sodomites" here refers to male shrine prostitutes connected to pagan fertility worship.

These practices were part of the same false religion behind the high places.

This detail shows the sin was not just about wrong locations.

The rituals themselves had become deeply corrupt.

Worship had drifted far from anything God had commanded.

🏛️ Sodomites means male shrine prostitutes

🌾 These rituals tied to fertility worship

🚫 The corruption went beyond location

📖 Worship had drifted far from God

## 🚫 The Abominations Of The Nations Which The LORD Cast Out Before The Children Of Israel

"Abominations" means practices God finds deeply detestable.

God had already driven the earlier nations out of the land for these same sins.

Israel was warned repeatedly not to copy the practices of the people before them.

Judah is now doing the exact things that got the earlier nations removed.

Repeating a sin never changes how seriously God takes it.

🚫 Abominations means deeply detestable practices

🚶 God removed earlier nations for these sins

⚠️ Israel was warned not to copy them

📖 The same sin still brings the same danger

# FirstKingsFourteen 14:25-28
# 🏛️ Shishak Strips The Temple
---
## 👑 In The Fifth Year Of King Rehoboam, Shishak King Of Egypt Came Up Against Jerusalem

Shishak was a real Egyptian pharaoh, known outside the Bible as Sheshonq the First.

His invasion is recorded on an actual Egyptian temple wall in Karnak.

This attack comes only five years after Solomon's glorious reign ended.

Jerusalem's wealth and safety collapse far faster than anyone might expect.

History outside the Bible confirms this exact event took place.

👑 Shishak was a real Egyptian pharaoh

🗿 His invasion is carved on an Egyptian wall

⏱️ This happens just five years after Solomon

📖 History outside Scripture confirms this event

## 🏛️ Took Away The Treasures Of The House Of The LORD

Solomon filled the temple with extraordinary wealth just decades earlier.

Now that same wealth leaves the temple in a single invasion.

This is not slow decline but a sudden and total loss.

The glory built up over years can disappear in one attack.

What people build does not always stay protected by its own beauty.

🏛️ Solomon had filled the temple with wealth

📉 That wealth is now stripped away

⚡ The loss happens suddenly, not slowly

📖 Human glory offers no real protection

## 🛡️ All The Shields Of Gold Which Solomon Had Made

These same golden shields were described earlier as a sign of Solomon's riches.

They were meant to display Israel's wealth and power to the world.

Shishak carries them off along with everything else of value.

The very symbols of Solomon's glory now belong to a foreign king.

Nothing built for display was strong enough to defend itself.

🛡️ These shields once showed Solomon's wealth

👑 They displayed Israel's glory to the world

🏃 An enemy carries them off completely

📖 Display cannot defend what it shows

## 🥉 Made In Their Stead Brasen Shields

"Brasen" means made of brass or bronze, a much cheaper metal than gold.

Rehoboam cannot replace what was lost, so he settles for an imitation.

The shields still look impressive from a distance.

Underneath the shine, the truth is that the real wealth is gone.

A copy can hide a loss, but it cannot undo it.

🥉 Brasen means made of bronze

💰 Bronze cost far less than gold

👀 The copy still looked impressive

📖 A copy hides loss, not fixes it

## 💂 Committed Them Unto The Hands Of The Chief Of The Guard

The chief of the guard led the soldiers who protected the king's household.

Handing him these shields kept up the appearance of royal ceremony.

Every trip into the temple still looked grand from the outside.

The show continued even though the substance behind it had changed.

Appearances can survive long after the real thing is gone.

💂 The chief of the guard led royal soldiers

🎭 The shields kept up royal appearance

🏛️ Ceremony continued despite the real loss

📖 Appearances can outlast the truth behind them

## 🔒 The Guard Bare Them, And Brought Them Back Into The Guard Chamber

These shields never stay with the king personally anymore.

Guards carry them out for show, then lock them away again after each visit.

The original golden shields were valuable enough to guard permanently.

This new routine only proves how much smaller the kingdom's glory has become.

A ritual meant to look grand quietly confesses what was lost.

💂 Guards carry the shields out and back

🔒 The shields get locked away again

📉 This proves how much glory was lost

📖 A hollow ritual confesses real loss

# FirstKingsFourteen 14:29-31
# 👑 Rehoboam's Reign Ends
---
## 📚 Written In The Book Of The Chronicles Of The Kings Of Judah

This is the same kind of closing formula used for Jeroboam earlier in this chapter.

Judah now keeps its own separate royal record from Israel's.

Two kingdoms means two different official histories being written side by side.

The divided nation is now fully divided in its record keeping too.

Even the paperwork reflects how completely the kingdom has split.

📚 This matches Jeroboam's closing formula

🏛️ Judah keeps its own separate records

✂️ Two kingdoms write two separate histories

📖 Even the records reflect the split

## ⚔️ There Was War Between Rehoboam And Jeroboam All Their Days

The split between the two kingdoms never heals during either king's lifetime.

This war continues quietly in the background of both of their stories.

Neither king manages to reunite what Solomon's sins first broke apart.

The division from an earlier chapter becomes a lasting, permanent reality.

What starts as rebellion settles into decades of open conflict.

⚔️ The two kingdoms stay at war

🚫 Neither king reunites the nation

✂️ The split becomes permanent

📖 Rebellion settles into lasting conflict

## 🪦 Buried With His Fathers In The City Of David

Rehoboam receives an honored burial among his own royal ancestors.

This stands in sharp contrast to the judgment on Jeroboam's family earlier in this chapter.

Judah's sins were serious, yet this king still receives a peaceful end.

God's patience with Judah runs differently than His judgment on Jeroboam's house.

Consequences do not always arrive on the same timeline for every family.

🪦 Rehoboam receives an honored burial

⚖️ This contrasts with Jeroboam's family

🕊️ Judah still receives God's patience

📖 Consequences do not follow one timeline

## ➡️ Abijam His Son Reigned In His Stead

Abijam becomes the next king of Judah after his father.

His reign is covered in the very next chapter of this book.

The pattern of kings rising, sinning, and passing continues right on.

This short line closes one story and opens another.

The books of Kings keep moving forward one ruler at a time.

👑 Abijam succeeds his father Rehoboam

📆 His reign begins the next chapter

🔁 The pattern of kings continues

➡️ One story closes, another begins
`.trim();

export const FIRST_KINGS_FOURTEEN_PERSONAL_SECTIONS = parseFirstKingsFourteenRawNotes(FIRST_KINGS_FOURTEEN_RAW_NOTES);
