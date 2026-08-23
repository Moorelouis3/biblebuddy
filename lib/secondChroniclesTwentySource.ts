export type SecondChroniclesTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesTwentyRawNotes(rawText: string): SecondChroniclesTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 20:${startVerse}` : `2 Chronicles 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 2 Chronicles 20 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_TWENTY_RAW_NOTES = `# SecondChronicles 20:1-4
# ⚔️ Enemies Close In
---
## 👪 The Children Of Moab, And The Children Of Ammon

Moab and Ammon were nations descended from Lot, Abraham's own nephew.

That makes this attack a fight between distant relatives, not strangers.

Israel had shown restraint toward both nations centuries earlier during the exodus.

Family ties made this betrayal cut even deeper.

👪 Moab and Ammon descended from Lot

🤝 Lot was Abraham's own nephew

⚔️ This attack came from distant relatives

📖 Family ties made the betrayal deeper

## 🗺️ With Them Other Beside The Ammonites

This does not mean two separate enemy nations plus a mystery third group.

Many scholars believe "other" refers to the Meunites, a desert people mentioned elsewhere in Chronicles.

Jehoshaphat is not facing one army but a mixed coalition.

Multiple enemies moving together made this threat far larger than a normal border raid.

🗺️ Other likely means the Meunites

🤝 Moab and Ammon joined forces

⚔️ A mixed coalition, not one army

📖 The threat was larger than usual

## 🌊 Hazazontamar, Which Is Engedi

"Which is Engedi" tells the reader this old name and the familiar one point to the same place.

Engedi sat on the western shore of the Dead Sea, a short march from Jerusalem.

This detail is not a travel log.

It tells Jehoshaphat exactly how close the danger already was.

🗺️ Hazazontamar is the old name

🌊 Engedi sits by the Dead Sea

🏃 It was a short march from Jerusalem

➡️ The enemy was already close

## 😨 Jehoshaphat Feared, And Set Himself To Seek The LORD

Fear here is not condemned or hidden.

The text names it honestly, then shows exactly what Jehoshaphat did with it.

"Set himself" means he made a deliberate decision, not just a passing feeling.

Fear became the reason he turned toward God instead of panic.

😨 Fear is named honestly here

🎯 Set himself means a deliberate choice

🙏 Fear pointed him toward God

📖 Fear does not have to end in panic

## 🍽️ Proclaimed A Fast Throughout All Judah

A fast in this culture meant setting aside food to focus fully on prayer.

Jehoshaphat did not fast alone in private.

He called the entire nation to fast together.

A shared fast turned one king's fear into a whole nation's prayer.

🍽️ Fasting means setting food aside to pray

👑 Jehoshaphat did not act alone

🇮🇱 The whole nation joined the fast

➡️ One king's fear became a nation's prayer

# SecondChronicles 20:5-9
# 🙏 Jehoshaphat's Prayer Begins
---
## 🏛️ Before The New Court

The "new court" was a section of the temple grounds, likely added by an earlier king.

Standing there placed Jehoshaphat in full public view of the gathered nation.

This was not a private prayer whispered alone.

It was a king leading his people in prayer, out loud, in front of everyone.

🏛️ The new court was part of the temple

👀 Jehoshaphat prayed in full public view

👑 A king led, not just prayed alone

📖 Public leadership shaped this whole prayer

## 👑 Rulest Not Thou Over All The Kingdoms Of The Heathen

Jehoshaphat opens by naming who God actually is before asking for anything.

"Heathen" here simply means the nations outside Israel, not an insult.

He states plainly that God's rule reaches every kingdom marching against Judah.

Naming God's authority first is not flattery.

It is the foundation the rest of the prayer stands on.

👑 Heathen means nations outside Israel

🌍 God rules every kingdom, not just Judah

🏗️ This truth grounds the whole prayer

📖 Praise comes before the request

## 📜 Gavest It To The Seed Of Abraham Thy Friend For Ever

Jehoshaphat reaches back centuries to the promise God made to Abraham.

"Thy friend" is a striking title, since scripture rarely calls anyone God's friend by name.

He reminds God, and himself, that this land was a gift tied to an old promise.

The current threat is not just political.

It is a challenge to a promise God already made.

📜 The promise traces back to Abraham

🤝 Friend is a rare, striking title

🗺️ This land was a promised gift

➡️ The threat challenges God's own promise

## 🏛️ Built Thee A Sanctuary Therein For Thy Name

Solomon's temple stood as the one place God chose to put His name.

Jehoshaphat points directly at it while he prays.

The building itself becomes part of his argument.

This is the very house God's people built for Him, now surrounded by danger.

🏛️ The sanctuary is Solomon's temple

📛 God's name was placed there

👉 Jehoshaphat points to it while praying

📖 The temple itself argues for help

## ⚔️ The Sword, Judgment, Or Pestilence, Or Famine

This list is not random.

It echoes the exact prayer Solomon prayed when the temple was first dedicated.

"Judgment" here means a legal punishment, and "pestilence" means a deadly disease.

Jehoshaphat is holding God to a promise already spoken over this building.

⚔️ Sword means war or violence

⚖️ Judgment means legal punishment

🦠 Pestilence means a deadly disease

📖 This echoes Solomon's dedication prayer

# SecondChronicles 20:10-13
# 👀 Our Eyes Are Upon Thee
---
## 🚫 Whom Thou Wouldest Not Let Israel Invade

Centuries earlier, during the exodus from Egypt, God told Israel not to attack Moab, Ammon, or Seir.

That old restraint is the point of this reminder.

Israel showed mercy to these very nations at God's own command.

Those same nations are now repaying that old mercy with an attack.

🚫 God once blocked Israel from attacking them

📜 This goes back to the exodus

🤝 Israel showed mercy at God's command

📖 Mercy is being repaid with attack

## 😤 How They Reward Us

"Reward" here is used with heavy irony.

Jehoshaphat is not thanking anyone.

He is pointing out how unjust this attack really is.

Old kindness has been answered with a present threat to destroy Judah.

😤 Reward is used with bitter irony

🙅 This is not real gratitude

⚔️ Old kindness met with a new threat

📖 Injustice sharpens this whole appeal

## 💪 We Have No Might Against This Great Company

Jehoshaphat admits outright that Judah cannot win this fight alone.

That confession is not weakness.

It clears away any illusion that human strength will save them.

Admitting powerlessness is what opens the door for God to act.

💪 Might means military strength

🙅 Judah admits it has none here

🚪 Honesty opens the door for God

📖 Weakness confessed clears space for faith

## 👀 Our Eyes Are Upon Thee

This short line becomes the most quoted phrase in the whole chapter.

It is not a plan or a strategy.

It is a decision to keep watching God instead of the approaching army.

Where attention goes during a crisis often reveals what someone actually trusts.

👀 A decision to watch God, not fear

🚫 Not a plan or a strategy

🙏 Trust shows in where attention goes

📖 This line has outlasted the whole chapter

## 👶 With Their Little Ones, Their Wives, And Their Children

This is not just the army standing before God.

Entire families, including small children, stood together at the temple.

Everyone with something to lose showed up to pray.

The danger threatened the whole nation, so the whole nation prayed as one.

👪 Entire families stood together

👶 Even little ones were present

🇮🇱 The whole nation prayed as one

➡️ Shared danger brought a shared prayer

# SecondChronicles 20:14-17
# 🗣️ Jahaziel's Prophecy
---
## 🎶 A Levite Of The Sons Of Asaph

Jahaziel's family line is spelled out across four generations.

Asaph was one of David's original temple worship leaders.

That same family kept leading worship generations later.

This detail tells the reader Jahaziel was not a random voice in the crowd.

🎶 Asaph led worship under King David

👨‍👦 Jahaziel came from that same family

🗣️ This family had a history of public voice

📖 God spoke through a familiar, trusted line

## ⚔️ The Battle Is Not Yours, But God's

This line reframes the entire crisis in one sentence.

Judah had been treating this as their fight to survive.

God corrects that assumption directly.

The outcome no longer depends on Judah's weapons or numbers.

⚔️ Judah assumed this was their fight

🙅 God corrects that assumption directly

🙌 The outcome now belongs to God

📖 Ownership of the battle just changed

## 🗺️ The Cliff Of Ziz, The Wilderness Of Jeruel

These are specific, real locations near Engedi, on the Dead Sea's western side.

Naming exact places here was not decoration.

It gave Jehoshaphat's army an actual route to follow the next morning.

A vague promise would have felt comforting, but a precise location made the word usable.

🗺️ Ziz and Jeruel are real locations

🧭 Both sit near Engedi's region

🚶 This gave the army an actual route

➡️ A precise word is a usable word

## 🚫 Ye Shall Not Need To Fight In This Battle

This does not mean Judah's army stays home.

They still march out the next day, fully armed.

It means the actual fighting will not be theirs to do.

Their part is to show up, take position, and watch what God does.

🚫 Not fighting does not mean staying home

🚶 They still march out fully prepared

👀 Their role is to watch, not fight

📖 Obedience still required showing up

## 🧍 Stand Ye Still, And See The Salvation Of The LORD

"Stand still" here means hold your position with confidence, not freeze in fear.

"See" is an active kind of watching, expecting something to actually happen.

This instruction takes real courage, since standing still while an army approaches goes against instinct.

Faith here looked like staying put, not running toward the fight or away from it.

🧍 Stand still means hold your ground

👁️ See means expect God to act

😬 This instruction takes real courage

📖 Faith here looked like staying put

# SecondChronicles 20:18-21
# 🎶 Worship Before The Battle
---
## 🙇 Bowed His Head With His Face To The Ground

Jehoshaphat's first response to the prophecy is not a battle plan.

It is worship, face down on the ground.

The army had not yet moved, and already the king was thanking God.

Thanks came before the victory was even won.

🙇 Bowing low was a posture of worship

📋 No battle plan came first

🙏 Thanks came before the victory

📖 Worship was the immediate response

## 👨‍👦 Children Of The Kohathites, And Of The Children Of The Korhites

These were two Levite family lines, both descended from Levi's son Kohath.

The Korhites came from Korah, whose ancestor once led a rebellion against Moses.

That old family history makes this moment striking.

Descendants of a rebel family now lead worship at the chapter's loudest moment.

👨‍👦 Kohathites and Korhites were Levite families

⚠️ Korah's ancestor once rebelled against Moses

🎶 His descendants now lead worship

📖 A family history reversed generations later

## 🌅 Rose Early In The Morning, And Went Forth Into The Wilderness Of Tekoa

"Rose early" signals eagerness, not dread, about the day ahead.

Tekoa was a town in the wilderness south of Bethlehem.

It was later known as the prophet Amos's hometown.

Judah marched toward the fight the same morning, without delay.

🌅 Rose early shows eagerness, not dread

🗺️ Tekoa sat in the wilderness near Bethlehem

🚶 They marched out the same morning

📖 Obedience came without delay

## 🏗️ Believe In The LORD Your God, So Shall Ye Be Established

"Established" means made secure and unshakable, not just safe for one day.

Jehoshaphat links belief directly to security before the battle even starts.

He adds a second command right after it, believe the prophets too.

Trusting God's word was treated as inseparable from trusting God Himself.

🏗️ Established means made secure

🙏 Belief comes before the security

🗣️ Believing the prophets mattered too

📖 Trusting God's word is trusting God

## ✨ Praise The Beauty Of Holiness

This is an unusual phrase, since holiness is not normally called beautiful.

It treats honoring God's set apart purity as something worth celebrating.

Singers carrying this phrase were placed at the very front of the army.

That formation looked backward, yet it led the whole procession into battle.

✨ Holiness described as beautiful here

🙏 Honoring God treated as worth celebrating

🎤 Singers marched at the very front

➡️ Worship led the way into battle

# SecondChronicles 20:22-23
# 💥 The Enemy Destroys Itself
---
## 🎶 When They Began To Sing And To Praise, The LORD Set Ambushments

The timing here is the whole point.

God did not act before the singing started or after the battle began.

He acted the exact moment worship began.

"Ambushments" means a surprise attack, though the text never says who carried it out.

🎶 Praise and God's action lined up exactly

⏱️ Timing here is the whole point

❓ Ambushments means a surprise attack

📖 Worship became the trigger for victory

## 🏹 Every One Helped To Destroy Another

No arrow from Judah is ever described hitting anyone in this battle.

The coalition of Moab, Ammon, and Seir turns on itself instead.

Confusion or mistaken identity in the dark likely led allies to kill each other.

Judah's army never had to fight the battle they marched out for.

🏹 Judah never fires a single arrow

🤝 The coalition turns on itself instead

😵 Confusion led allies to kill each other

📖 God won without Judah's weapons

# SecondChronicles 20:24-30
# 🎁 The Valley Of Blessing
---
## 🏹 None Escaped

Judah's army arrives expecting a battle.

Instead they find a battlefield already finished, with no survivors left standing.

This detail confirms the ambush was total, not partial.

The victory was already complete before Judah's soldiers raised a weapon.

🏹 Judah arrives expecting to fight

💀 They find the battle already over

✅ The victory was already complete

📖 God finished it before they arrived

## 💰 Three Days In Gathering Of The Spoil

"Spoil" means the valuables left behind by a defeated enemy.

Three full days spent collecting it shows how enormous this coalition's supplies were.

More treasure was left behind than Judah's army could even carry.

The scale of the leftover wealth confirmed how large this threat really was.

💰 Spoil means captured valuables

📆 Three days shows the sheer amount

🎒 More than they could even carry

📖 Leftover wealth proved the threat's size

## 🏷️ The Valley Of Berachah

"Berachah" means blessing in Hebrew.

Judah stops mid journey specifically to bless God before continuing home.

Naming the valley after that moment made the memory permanent.

Long after this generation was gone, the place name kept preaching the story.

🏷️ Berachah means blessing

🙏 Judah paused there to bless God

📍 The name preserved the memory

➡️ A place can outlast a generation

## 🎻 With Psalteries And Harps And Trumpets

A "psaltery" was a stringed instrument similar to a small harp.

Judah does not sneak quietly back into Jerusalem.

They return with a full, loud musical procession straight to the temple.

The same worship that opened the crisis now closes it.

🎻 A psaltery is a stringed instrument

📯 Trumpets added to the celebration

🏛️ The procession ended at the temple

📖 Worship opened and closed this crisis

## 📰 The Fear Of God Was On All The Kingdoms

News of what happened spread to nations not even involved in the battle.

"Fear" here means serious respect for God's power, not simple terror.

Judah's neighbors drew the right conclusion without seeing the battle themselves.

One crisis Judah could not survive alone became a testimony far beyond its borders.

📰 News spread beyond the battle itself

😮 Fear means serious respect here

🌍 Neighboring nations drew the right conclusion

📖 One crisis became a wider testimony

# SecondChronicles 20:31-34
# 📜 Jehoshaphat's Reign Summarized
---
## 👴 He Walked In The Way Of Asa His Father

Asa, Jehoshaphat's father, mostly did right, with real failures late in his reign.

Following in someone's way here means continuing a pattern, not copying every choice.

Jehoshaphat is praised for keeping the good direction his father set.

A family's spiritual pattern can genuinely carry forward a generation later.

👴 Asa was Jehoshaphat's father

🛤️ Walking in his way means following his pattern

✅ Jehoshaphat kept the good direction

📖 Faith can carry forward generationally

## ⛰️ Howbeit The High Places Were Not Taken Away

"High places" were hilltop worship sites, often left over from before the temple existed.

Some were used to worship the true God incorrectly.

"Howbeit" signals a turn, the flaw inside an otherwise good report.

Even a genuinely faithful king left one real failure unfinished.

⛰️ High places were hilltop worship sites

⚠️ Some drifted toward other gods

🔄 Howbeit signals a turn in the report

📖 Even good kings left something unfinished

## 👑 The People Had Not Prepared Their Hearts

This blame is not placed only on the king.

The text says the people themselves were not ready to fully commit.

A king can lead reform, but he cannot force a nation's heart to change.

National faithfulness required more than one man's good example at the top.

👑 Not blamed on the king alone

👥 The people were not fully ready

🚫 A king cannot force a nation's heart

📖 Faithfulness needed the whole nation

## 🗣️ Written In The Book Of Jehu The Son Of Hanani

This is the same prophet who confronted Jehoshaphat back in chapter nineteen.

Chronicles often points to outside records, books that no longer survive today.

Naming a specific source was a mark of careful, honest history writing.

Even a king's full story was treated as worth recording accurately.

🗣️ Jehu confronted Jehoshaphat in chapter nineteen

📚 Chronicles often cites lost outside records

✅ Naming sources signaled careful history

📖 Even kings' stories were recorded honestly

## 👑 His Mother's Name Was Azubah The Daughter Of Shilhi

Kings and Chronicles regularly name the mother of each king of Judah.

That detail seems small, but it was not filler.

The queen mother held real influence and status in the royal court.

Naming her by name treated that role as worth remembering.

👑 Kings often named the queen mother

📜 This was standard royal record keeping

💪 Queen mothers held real court influence

➡️ A named role, not a forgotten one

# SecondChronicles 20:35-37
# ⚓ The Alliance That Failed
---
## 👑 Joined Himself With Ahaziah King Of Israel, Who Did Very Wickedly

This Ahaziah ruled the northern kingdom of Israel, not Judah.

Jehoshaphat had already been warned once, in chapter nineteen, for allying with a wicked king.

He makes almost the same mistake again here, right after his great victory.

Great faith in one chapter does not guarantee no stumbling in the next.

👑 Ahaziah ruled the northern kingdom

⚠️ Jehoshaphat was already warned once before

🔁 He repeats a similar mistake here

📖 Great faith does not guarantee no stumbling

## 🚢 Ships To Go To Tarshish

"Tarshish" was a distant trading port, likely somewhere in the western Mediterranean.

"Ships of Tarshish" became a phrase for large, ocean crossing trading vessels.

"Eziongaber" was Judah's own port city on the Red Sea.

This venture was about chasing wealth through a partnership God had already warned against.

🚢 Tarshish was a distant trading port

⚓ Eziongaber was Judah's Red Sea port

💰 This venture was about wealth

📖 Profit led him into a bad partnership

## 🛑 The LORD Hath Broken Thy Works

Eliezer's prophecy does not arrive after the ships wreck.

It comes first, naming the reason before the consequence even happens.

The failure was not bad luck or bad weather.

God directly ended a partnership He had already warned Jehoshaphat to avoid.

🗣️ The prophecy comes before the wreck

🌊 Not bad luck or bad weather

🛑 God directly ended this partnership

📖 Warned partnerships rarely end well

## 🗺️ Eliezer The Son Of Dodavah Of Mareshah

Mareshah was a town in the lowlands of Judah.

Naming Eliezer's father and hometown grounds this prophecy in a real, verifiable person.

Chronicles treats prophetic words as historical events, not vague sayings from nowhere.

A specific name attached to a specific warning gave it real weight.

🗺️ Mareshah was a town in Judah's lowlands

🗣️ Eliezer is a specific, named prophet

📚 Chronicles grounds prophecy in real history

📖 A named source carried real weight
`.trim();

export const SECOND_CHRONICLES_TWENTY_PERSONAL_SECTIONS = parseSecondChroniclesTwentyRawNotes(SECOND_CHRONICLES_TWENTY_RAW_NOTES);
