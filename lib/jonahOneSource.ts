export type JonahOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJonahOneRawNotes(rawText: string): JonahOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JonahOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jonah\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jonah 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jonah\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Jonah\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jonah 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jonah 1:${startVerse}` : `Jonah 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Jonah 1 sections, received " + sections.length);
  }

  return sections;
}

const JONAH_ONE_RAW_NOTES = `# Jonah 1:1-3
# 🏃 Jonah Runs The Other Way
---
## 📨 The Word Of The LORD Came Unto Jonah

"Word of the LORD" means a direct message straight from God.

It is not a feeling or a private hunch.

This exact phrase opens almost every prophetic story in the Old Testament.

Each time it appears, it marks the start of one specific assignment.

Jonah is about to receive one of the strangest assignments any prophet ever got.

📨 Word of the LORD means a direct message

🚫 Not a feeling or a hunch

📜 This phrase opens most prophetic stories

📖 Jonah gets a very strange assignment

## 📛 The Son Of Amittai

"Amittai" is a Hebrew name built from the word for truth.

Being called the son of Amittai ties Jonah to a real family, not a legend.

This same Jonah appears earlier in Second Kings, during the reign of Jeroboam the second.

There he predicted Israel's borders would expand, and scripture says it happened just as he said.

That Jonah already had a reputation for true, fulfilled prophecies before this book even begins.

📛 Amittai comes from the Hebrew word for truth

📚 This Jonah also appears in Second Kings

🗺️ He predicted Israel's borders expanding

📖 He already had a reputation for true words

## 🏛️ Arise, Go To Nineveh, That Great City

Nineveh was the capital of Assyria, Israel's most feared enemy.

Calling it "great" was not a compliment Jonah wanted to pay.

Ancient writers describe walls so wide that chariots could race along the top.

Assyria was infamous for brutal warfare and for terrorizing smaller nations like Israel.

God is sending His prophet straight into the heart of the nation Israel feared most.

🏛️ Nineveh was Assyria's capital city

⚔️ Assyria was Israel's most feared enemy

🧱 Its walls were famous for their size

📖 God sends Jonah into enemy territory

## 📈 Their Wickedness Is Come Up Before Me

This phrase describes sin piling up until it finally reaches God's attention.

The same wording describes Sodom's sin earlier, in the book of Genesis.

It pictures guilt rising like smoke until it cannot be ignored any longer.

Nineveh had crossed a line God was no longer willing to overlook.

📈 Sin can rise until God notices

🏚️ Same wording used for Sodom's sin

💨 Guilt pictured rising like smoke

📖 Nineveh crossed a line God would not overlook

## 🗺️ Jonah Rose Up To Flee Unto Tarshish

Tarshish was a distant port, likely located in modern day Spain.

Nineveh sat far to the east, deep inside modern day Iraq.

Tarshish sat far to the west, about as distant as a ship could sail.

Jonah did not simply refuse the job.

He booked passage in the exact opposite direction on purpose.

🗺️ Tarshish was likely in modern day Spain

🌅 Nineveh lay far to the east

🌇 Tarshish lay far to the west

📖 Jonah sailed the opposite direction on purpose

## ⚓ Went Down To Joppa

Joppa was the main seaport on Israel's coast in Jonah's day.

It sat about forty miles from Jonah's likely hometown.

This verse begins a pattern that repeats across the whole chapter.

Jonah goes down to Joppa, then down into the ship, then down into the sea.

Each step carries him further from the calling God gave him.

⚓ Joppa was Israel's main seaport

📏 About forty miles from his hometown

⬇️ Begins a going down pattern

📖 Each step moves him further away

## 🚪 From The Presence Of The LORD

This phrase appears twice in one verse for emphasis.

Jonah did not actually believe he could escape God's notice by changing location.

The phrase describes leaving the land and the Temple where God's presence was specially found.

Jonah was trying to resign from his calling, not hide from an all seeing God.

Running does not erase a calling someone has already received.

🔁 Phrase repeated twice for emphasis

🏛️ Points to the land and Temple

🚪 Jonah tries to resign, not hide

📖 A calling never vanishes just by running
# Jonah 1:4-6
# 🌊 The Storm Finds Him Anyway
---
## ⛵ The LORD Sent Out A Great Wind Into The Sea

Jonah found his own ship in verse three.

Now the LORD sends His own wind in verse four.

This is not a coincidence or an unlucky patch of weather.

God is directly answering Jonah's escape plan with a storm of His own.

The chase has officially begun.

⛵ Jonah found his own ship

🌬️ God sent His own wind

🎯 No coincidence, direct divine action

📖 God answers Jonah's plan with a storm

## 💥 So That The Ship Was Like To Be Broken

"Like to be broken" is an old way of saying about to break apart.

This was not a passing squall any sailor would shrug off.

Ancient Mediterranean trading ships were sturdy, built to survive rough seas.

For professional sailors to fear this storm meant it was genuinely violent.

💥 Means the ship was about to break

🌪️ Not a normal passing squall

🚢 These trading ships were built sturdy

📖 Professional sailors feared this storm

## 🙏 Cried Every Man Unto His God

These sailors were likely Phoenician, each from a different hometown and background.

Each one prayed to whatever god his own people worshipped.

A ship like this could carry a small crowd of different religions at once.

Only one man on board had any connection to the one true God.

That man was currently asleep below deck.

🌍 Sailors likely came from different backgrounds

🙏 Each cried to his own god

⛵ One ship, many different religions

📖 The one true God's man was asleep

## 📦 Cast Forth The Wares That Were In The Ship

"Wares" means the cargo, the goods the ship was carrying to sell.

Throwing cargo overboard was a last resort, not a first instinct.

A lighter ship rides higher and survives waves better than a loaded one.

These sailors were sacrificing their entire profit from the voyage to stay alive.

📦 Wares means the ship's cargo

⚖️ A lighter ship survives waves better

💰 They gave up their profit to survive

📖 This was a desperate, costly choice

## 😴 Gone Down Into The Sides Of The Ship

This is the third time in one chapter Jonah goes down.

Down to Joppa, down into the ship, now down into its lower hold.

While the sailors fight for their lives above him, Jonah sleeps below.

Running from God often looks like numbness long before it looks like rebellion.

⬇️ Third time Jonah goes down

😴 He sleeps while sailors fight to survive

🧊 Running can look like numbness

📖 He has never been further from his calling

## ❓ What Meanest Thou, O Sleeper?

"What meanest thou" is an old way of asking what are you doing.

A pagan ship captain is the one waking up God's own prophet.

The irony here is sharp.

The man who should be praying is found fast asleep instead.

❓ Old English for what are you doing

⛵ A pagan captain wakes the prophet

🔄 The outsider corrects the insider

📖 The one who should pray is asleep

## 🔁 Arise, Call Upon Thy God

"Arise" echoes the exact word God used to send Jonah in verse two.

A pagan captain unknowingly repeats God's own command back to him.

"Think upon us" means notice us and act on our behalf.

Jonah cannot escape the call.

It keeps finding him, even in a stranger's mouth.

🔁 Arise echoes God's own command

⛵ A captain repeats it unknowingly

👀 Think upon us means notice and act

📖 The call keeps finding Jonah anyway
# Jonah 1:7-10
# 🎲 The Lot Falls On Jonah
---
## 🎲 Let Us Cast Lots

Casting lots was an ancient way of asking God to reveal a hidden answer.

It worked something like drawing straws or rolling marked stones.

Israel used a similar method called the Urim and Thummim to seek God's will.

These pagan sailors reach for the same basic idea out of pure desperation.

🎲 Casting lots means drawing for an answer

🪨 Worked like marked stones or straws

📿 Israel had its own Urim and Thummim

📖 Desperate sailors reach for the same idea

## 🎯 The Lot Fell Upon Jonah

Out of an entire crew, the lot pointed straight at Jonah.

A method meant to be totally random landed on exactly the right man.

Proverbs says the lot is cast into the lap, but its outcome belongs to the LORD.

What looked like chance was never really chance at all.

🎯 The lot landed on Jonah exactly

🎲 A random method found the right man

📜 Proverbs ties the lot's outcome to the LORD

📖 Nothing here was actually left to chance

## ❓ What Is Thine Occupation? And Whence Comest Thou?

The sailors fire four rapid questions at once.

Job, hometown, nation, and people, all in a single breath.

They need to know exactly who they are dealing with and why.

Panic makes people ask everything at once instead of one thing at a time.

❓ Four urgent questions fired at once

🧳 Job, hometown, nation, and people

🔍 They need to know who this is

➡️ Panic makes people ask everything at once

## 🏷️ I Am An Hebrew

"Hebrew" was the term outsiders used for Israelites, not a word Israelites used much among themselves.

Jonah answers with his nationality before anything else.

To these sailors, that name now carries weight, since Hebrews worshipped a God with no rival.

He has just told them exactly who he serves.

🏷️ Hebrew is what outsiders called Israelites

🗣️ He answers with his nationality first

⚖️ The name now carries real weight

📖 He has told them exactly who he serves

## 🙇 I Fear The LORD

"Fear the LORD" means genuine reverence and submission, not simple fright.

Jonah says this while actively running from the very God he claims to fear.

His words are true in theory and false in his current actions.

A person can say the right thing while doing the exact opposite.

🙇 Fear the LORD means reverence, not fright

🏃 He says this while running from God

⚖️ True words, contradicted by his actions

📖 A person can say right, do wrong

## 🌊 Which Hath Made The Sea And The Dry Land

Jonah names the LORD as maker of the very sea now threatening everyone's life.

He also names the dry land he was trying to reach instead of Nineveh.

In one sentence, Jonah accidentally describes the full scope of what he cannot escape.

There is no border this God does not already rule.

🌊 He made the sea now raging around them

🏝️ He also made the land Jonah ran toward

🗺️ No place is outside His rule

📖 There is nowhere left to escape to

## 🌪️ The Men Were Exceedingly Afraid

This is a different fear than the storm fear from verse five.

That fear was about dying in a shipwreck.

This fear is about having an actual fugitive from God on board.

Knowing who you have angered can be more frightening than the storm itself.

🌪️ Different fear than the earlier storm

💀 That fear was about simply dying

⚡ This fear is about who they offended

📖 Knowing who you angered can be worse

## ❗ Why Hast Thou Done This?

The sailors already know the answer, since Jonah just told them himself.

The question is really shock dressed up as a question.

Verse ten even explains that they already knew he was fleeing the LORD.

A confession this large is hard to process all at once.

❗ The sailors already know the answer

😲 Shock disguised as a question

📜 Verse ten confirms they already knew

📖 Big confessions take time to process
# Jonah 1:11-14
# 🌀 Thrown Into The Storm
---
## 🤝 What Shall We Do Unto Thee?

The sailors turn to the guilty man and ask him for the solution.

That is a strange thing to do, yet it shows how desperate they are.

They already trust that Jonah's God controls the storm completely.

Only the one who angered this God can tell them how to fix it.

🤝 They ask the guilty man for help

😨 Shows how desperate they have become

🙏 They trust Jonah's God controls the storm

📖 Only Jonah can say how to fix it

## 🌀 For The Sea Wrought, And Was Tempestuous

"Wrought" is an old word meaning stirred up or churned.

This exact description appears twice, once here and again a few verses later.

Repeating it shows the storm never lets up, no matter what they try.

The sea refuses to calm until the real problem gets solved.

🌀 Wrought means stirred up or churned

🔁 This description repeats twice in the chapter

⏳ The storm never lets up

📖 The sea waits for the real fix

## 🙋 Take Me Up, And Cast Me Forth

Jonah offers his own life as the solution, without being asked to.

He already knows that his presence is the actual cause of the storm.

This is the same man who, soon after, will ask to die rather than see Nineveh spared.

A willingness to die shows up early, long before chapter four states it directly.

🙋 Jonah offers his own life

🎯 He knows he is the actual cause

💀 He wishes for death again later

📖 This willingness to die starts here

## 🚣 Nevertheless The Men Rowed Hard

"Nevertheless" signals the sailors refuse Jonah's offer at first.

They try to save the one man who brought this storm upon them.

Rowing toward land instead of simply obeying him shows real decency.

Pagan sailors end up treating Jonah more mercifully than he ever treated Nineveh.

🚫 They refuse the offer at first

🚣 They row hard to save him

❤️ This shows real decency under pressure

📖 They show more mercy than Jonah ever did

## 🙏 We Beseech Thee, O LORD

"Beseech" means to beg urgently, not a casual request.

Earlier, each sailor cried to his own god by name.

Now the whole crew prays together to one specific God, the LORD.

Watching Jonah's God work has already started changing who they pray to.

🙏 Beseech means to beg urgently

🌍 Earlier they each prayed to their own gods

☝️ Now they all pray to one God

📖 Watching God work is already changing them

## 🩸 Lay Not Upon Us Innocent Blood

The sailors worry that throwing Jonah overboard could make them guilty of murder.

"Innocent blood" was a serious legal and moral charge in the ancient world.

They are asking God himself to clear them of guilt before they act.

Killing a man, even at his own request, troubled their conscience deeply.

⚖️ They fear being guilty of murder

🩸 Innocent blood was a serious charge

🙏 They ask God to clear them first

📖 Their conscience is troubled by this act

## 👑 Thou, O LORD, Hast Done As It Pleased Thee

The sailors acknowledge that everything happening is God's will, not random bad luck.

They did not choose this storm, this lot, or this man.

Naming God's sovereignty here is their way of accepting what must happen next.

Pagan sailors end this prayer sounding more faithful than Jonah has all chapter.

👑 They acknowledge this is God's will

🎲 None of it was random chance

🙌 Naming His sovereignty helps them accept it

📖 They sound more faithful than Jonah so far
# Jonah 1:15-17
# 🐋 The Sea Calms, The Fish Waits
---
## 🔁 Cast Him Forth Into The Sea

The same words "cast forth" described the cargo thrown overboard back in verse five.

Jonah is now thrown overboard the exact same way the wares were.

He asked to be treated as the problem, and that is exactly what happens.

The man who ran from God now lands in the very sea he sailed across.

🔁 Same wording used for the cargo earlier

📦 Jonah is thrown out just like it was

🙋 He asked for this treatment himself

📖 The sea becomes his landing place

## 🌊 The Sea Ceased From Her Raging

"Raging" describes violent, churning water, not a gentle wave.

The moment Jonah hits the water, the sea goes completely calm.

No gradual settling, no slow fade, just instant stillness.

The suddenness itself is proof of what had actually been happening.

🌊 Raging means violent, churning water

⚡ The calm comes instantly, not gradually

🔇 No slow fade, just sudden stillness

📖 The suddenness proves what was really happening

## 😨 The Men Feared The LORD Exceedingly

This "feared" is deeper than the fear from the storm earlier.

It describes awe and reverence, the beginning of real worship.

These sailors watched a direct, visible act of God and responded to it.

Gentile sailors end up closer to true faith than the fleeing prophet himself.

😨 Deeper than their earlier storm fear

🙇 This fear means awe and reverence

👀 They watched God act directly

📖 These sailors end closer to faith than Jonah

## 🤝 Offered A Sacrifice, And Made Vows

"Vows" were binding promises made to God in exchange for deliverance.

A full sacrifice was hard to offer at sea.

This was likely a pledge to offer more once they reached land.

These were pagan sailors now worshipping Israel's God by name.

That is already a hint of the mercy this whole book is about.

🤝 Vows are binding promises to God

⛵ Hard to sacrifice fully at sea

📜 Likely a pledge for later on land

📖 Pagan sailors now worship Israel's God

## 🐟 The LORD Had Prepared A Great Fish

"Prepared" means this fish was arranged ahead of time, not a lucky accident.

The Hebrew text simply says a great fish, never specifying a whale.

God rescues Jonah using the same sea that almost just killed him.

The very thing Jonah ran toward becomes the tool God uses to save him.

📝 Prepared means arranged ahead of time

🐟 The text says fish, not whale

🌊 God rescues him through the same sea

📖 The sea becomes rescue, not just danger

## ⏳ Three Days And Three Nights

This exact phrase becomes a sign Jesus later points to in Matthew chapter twelve.

Jesus compares His own three days in the grave to Jonah's three days in the fish.

The number marks a complete, full period, not a vague stretch of time.

What looks like Jonah's lowest moment becomes a preview of resurrection itself.

⏳ Marks a full, complete period

✝️ Jesus later points to this exact phrase

📜 Found in Matthew chapter twelve

📖 Jonah's low point previews resurrection`.trim();

export const JONAH_ONE_PERSONAL_SECTIONS = parseJonahOneRawNotes(JONAH_ONE_RAW_NOTES);
