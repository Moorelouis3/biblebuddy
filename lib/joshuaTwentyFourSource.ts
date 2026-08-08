export type JoshuaTwentyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaTwentyFourRawNotes(rawText: string): JoshuaTwentyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaTwentyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+24:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 24 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+24:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+24:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 24 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 24,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 24:${startVerse}` : `Joshua 24:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 Joshua 24 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_TWENTY_FOUR_RAW_NOTES = `# Joshua 24:1-2
# 👴 Joshua Gathers Israel At Shechem
---
## 🏔️ Joshua Gathered All The Tribes Of Israel To Shechem

Shechem was not a random meeting place.

Abraham built his first altar in Canaan there, generations before this day.

Jacob later bought land there and buried foreign idols under a tree nearby.

Joshua gathers the whole nation at the exact place their story with this land began.

🏔️ Shechem carried deep history for Israel
⛪ Abraham built his first Canaan altar there
🌳 Jacob buried foreign idols there too
📖 Joshua closes the story where it opened

## 📯 Called For The Elders Of Israel, And For Their Heads, And For Their Judges, And For Their Officers

Joshua summons the exact same leadership list one final time.

Elders, heads, judges, and officers, every rank of Israel's leadership stood present.

Chapter twenty three used this identical list of titles for the first gathering.

A second full assembly like this shows how much weight Joshua placed on this moment.

📯 The same leadership list gathers again
👴 Elders, heads, judges, and officers all attend
📜 Chapter twenty three used this same list
📖 A second gathering shows real weight

## 🌊 Your Fathers Dwelt On The Other Side Of The Flood

This does not mean the flood of Noah.

"The flood" here is an old word for a river, the Euphrates in Mesopotamia.

Abraham's family lived far to the east, near the cities of Ur and Haran.

Joshua starts this story long before Abraham ever set foot in Canaan.

🌊 Flood here means a river, not Noah's flood
🗺️ It points to the Euphrates region
🏙️ Abraham's family lived near Ur and Haran
📖 The story starts before Canaan

## 🗿 Even Terah, The Father Of Abraham, And They Served Other Gods

Terah was Abraham's own father.

Before God ever called Abraham, Terah's whole family worshipped other gods.

This detail is easy to skip past.

Abraham did not start out as an unusually faithful man surrounded by pagans.

He started inside an idol worshipping household, just like everyone else around him.

🗿 Terah was Abraham's father
🙇 His whole family served other gods
👪 Abraham grew up inside that household
📖 God's call set Abraham apart, not his upbringing

# Joshua 24:3-5
# 🕯️ From Abraham To Egypt
---
## 🚶 I Took Your Father Abraham From The Other Side Of The Flood

God speaks through Joshua in the first person for this entire speech.

"I took" describes an act of rescue, pulling Abraham out of that idol worshipping land.

Abraham did not walk away from Ur and Haran on his own initiative.

God reached in and removed him.

🚶 God speaks in the first person here
✋ I took describes a rescue, not a choice
🗺️ Abraham left Ur and Haran behind
📖 God reached in and moved Abraham

## 🌍 Led Him Throughout All The Land Of Canaan

God did not simply place Abraham in Canaan and leave him there.

"Throughout" pictures Abraham walking the full length of the land over time.

That walking mattered, because every step became part of the promise God later kept.

The whole land Abraham once wandered is the same land Israel now possesses.

🌍 Throughout means Abraham crossed the whole land
🚶 God led each step personally
🤝 Those steps shaped a future promise
📖 That same land now belongs to Israel

## 👶 Multiplied His Seed, And Gave Him Isaac

"Seed" is an old word for descendants or offspring.

Abraham and Sarah were old and childless when this promise was first made.

Isaac's birth was the first fulfillment of a promise that felt impossible.

Everything that follows in this speech grows out of one child born to elderly parents.

👶 Seed means descendants, not literal seed
👴 Abraham and Sarah were old and childless
🤱 Isaac arrived as an impossible promise
📖 One birth started the whole family line

## ⛰️ I Gave Unto Esau Mount Seir, To Possess It

Isaac had two sons, Jacob and Esau, who split into two very different paths.

Esau received mount Seir, the hill country that later became the nation of Edom.

Jacob received no land of his own at this point in the story.

God gave each brother a different inheritance, on purpose.

⛰️ Esau received the hill country of Seir
🇪🇩 Seir later became the nation of Edom
👥 Jacob and Esau took different paths
📖 God assigned each brother his own inheritance

## 🇪🇬 Jacob And His Children Went Down Into Egypt

"Went down" describes the direction traveled, from the highlands of Canaan into the Nile valley.

This move happened during the famine, when Joseph was already a ruler in Egypt.

What began as one family of seventy people grew for centuries inside Egypt.

That growth is exactly what the next verses pick up.

🇪🇬 Went down describes travel toward Egypt
🌾 Famine drove Jacob's family there
👪 Seventy people entered as one family
📖 That family grew for centuries in Egypt

# Joshua 24:6-7
# 🌊 Delivered At The Red Sea
---
## ⚔️ The Egyptians Pursued After Your Fathers With Chariots And Horsemen

Chariots and horsemen made up Egypt's most feared and advanced military force.

Israel, by contrast, left Egypt as a mass of former slaves on foot.

The mismatch was total, humanly speaking.

That mismatch is exactly the point Joshua wants Israel to remember.

⚔️ Chariots and horsemen were Egypt's elite force
🚶 Israel left Egypt on foot, unarmed
⚖️ The two sides were never evenly matched
📖 That gap makes what happened next stand out

## 🌑 He Put Darkness Between You And The Egyptians

This darkness is not the same as the plague of darkness earlier in Exodus.

Here it describes a supernatural cloud that physically separated the two camps at the sea.

Israel's side stayed lit while Egypt's side stayed dark and confused through the night.

God personally stood between His people and the army chasing them.

🌑 This darkness separated the two camps
🕯️ Israel's side stayed lit through the night
😵 Egypt's side stayed dark and confused
📖 God stood physically between His people and danger

## 🌊 Brought The Sea Upon Them, And Covered Them

The same sea that had opened a dry path for Israel closed over Egypt's army.

"Covered" means the water returned in full, drowning the chariots and horsemen completely.

Not one soldier from that pursuing force survived the crossing.

The sea became the very thing that finally ended the threat.

🌊 The same sea Israel crossed then closed
💧 Covered means the army drowned completely
🚫 No soldier from that army survived
📖 The sea itself ended the threat

## 👀 Your Eyes Have Seen What I Have Done In Egypt

Joshua is not speaking to a generation relying on secondhand stories.

Many people standing there had personally witnessed the plagues and the sea firsthand.

Firsthand memory carries a weight that no retelling can match.

Joshua leans on that shared eyewitness memory before asking anything of them.

👀 This generation saw the events firsthand
🙋 Many present witnessed the plagues themselves
💪 Firsthand memory outweighs any retelling
📖 Joshua leans on shared eyewitness memory

# Joshua 24:8-10
# 🎯 Amorites, Balak, And Balaam
---
## 🏞️ I Brought You Into The Land Of The Amorites, Which Dwelt On The Other Side Jordan

"The other side Jordan" here means the eastern side, away from Canaan proper.

The Amorites under Sihon and Og controlled that territory before Israel arrived.

This land later became the inheritance of Reuben, Gad, and half of Manasseh.

Joshua is retracing ground the people themselves marched through years earlier.

🏞️ The other side Jordan means the eastern bank
👑 Sihon and Og ruled the Amorites there
🗺️ That land became Reuben, Gad, and Manasseh's home
📖 Joshua retraces ground the people already walked

## 👑 Then Balak The Son Of Zippor, King Of Moab, Arose And Warred Against Israel

Balak ruled Moab, a kingdom east of the Dead Sea that feared Israel's approach.

He did not attack with an army first.

Instead he tried a different weapon entirely.

That weapon is named in the very next line.

👑 Balak ruled the kingdom of Moab
😨 Moab feared Israel's approach deeply
🚫 Balak avoided open warfare at first
📖 A different weapon comes in the next line

## ⚔️ Arose And Warred Against Israel

Balak's hostility began the moment Israel camped near Moab's border.

"Warred" suggests active hostility.

Yet no soldier from Moab ever actually attacked Israel in open battle.

Fear of Israel's growing numbers drove Balak toward a different kind of weapon instead.

⚔️ Balak's hostility started immediately
🗡️ Warred suggests active hostility
🚫 No real battle ever followed
📖 Fear pushed him toward a different weapon

## 🗣️ Sent And Called Balaam The Son Of Beor To Curse You

Balaam was a hired prophet, known across the region for spoken blessings and curses.

Balak paid him specifically to speak a curse over Israel from a distance.

Words carried real, feared power in this culture, not just polite speech.

Balak believed a curse could defeat Israel where soldiers could not.

🗣️ Balaam was a hired prophet for pay
💰 Balak paid him to curse Israel
🔮 Spoken words were feared as real power
📖 A curse replaced an army here

## 🙏 I Would Not Hearken Unto Balaam, Therefore He Blessed You Still

The full story fills three chapters in the book of Numbers.

Balaam opened his mouth to curse Israel and blessed them instead, again and again.

God controlled what left Balaam's mouth, no matter what Balak paid for.

Israel never even knew this spiritual battle was happening on their behalf.

🙏 God overruled Balaam's intended curse
📜 Numbers tells this full story
💰 Balak's payment could not change the outcome
📖 Israel was protected without ever knowing it

# Joshua 24:11-13
# 🐝 Jordan, The Hornet, And Unearned Land
---
## 🏙️ Ye Went Over Jordan, And Came Unto Jericho

This single line compresses the entire book of Joshua up to this point.

Crossing the Jordan and taking Jericho were the opening moves of the whole conquest.

Joshua reminds them how the story that started long ago actually began.

Everything since has flowed out of that first crossing.

🏙️ This line summarizes the whole conquest
🌊 Crossing Jordan came first
🧱 Jericho fell right after
📖 Everything since flows from that start

## 🐝 I Sent The Hornet Before You, Which Drave Them Out From Before You

This exact image also appears earlier in Exodus and Deuteronomy.

Many scholars believe it describes literal hornets causing panic among Israel's enemies.

Others read it as a picture of terror and confusion sent ahead of Israel.

Either way, the credit for driving nations out belongs to God, not to Israel's army.

🐝 The hornet appears in Exodus too
😰 It caused panic among Israel's enemies
⚔️ It went ahead of Israel's own army
📖 The credit belongs to God, not Israel

## 🏹 Not With Thy Sword, Nor With Thy Bow

Joshua names Israel's actual weapons and then denies they won the war.

Sword and bow were the standard tools of ancient warfare, present but not decisive.

This line protects Israel from ever thinking their own skill won these battles.

The victory belonged to God from the very start.

🏹 Sword and bow were Israel's real weapons
🚫 Neither one actually won the war
🛡️ This guards against pride in military skill
📖 God's power, not Israel's, decided the outcome

## 🍇 Of The Vineyards And Oliveyards Which Ye Planted Not Do Ye Eat

Vineyards and olive groves took years of patient labor to become productive.

Israel walked into land where Canaanite farmers had already done that slow work.

Houses, cities, and orchards were all handed over already built and already grown.

This entire inheritance was a gift Israel never had to earn through labor.

🍇 Vineyards and orchards take years to grow
🏡 Israel received cities already built
🌾 Someone else did the slow labor
📖 The whole inheritance was a pure gift

# Joshua 24:14-15
# ⚖️ Choose You This Day
---
## 🙏 Fear The LORD, And Serve Him In Sincerity And In Truth

"Fear" here means deep reverence, not being afraid of punishment.

"Sincerity" describes wholeness, serving God with an undivided heart rather than a split loyalty.

"Truth" adds the idea of faithfulness that holds steady over time.

Joshua asks for a complete, honest devotion, not a partial or performed one.

🙏 Fear means reverence, not terror
❤️ Sincerity means an undivided heart
⏳ Truth means loyalty that lasts
📖 Joshua asks for complete, honest devotion

## 🚮 Put Away The Gods Which Your Fathers Served On The Other Side Of The Flood, And In Egypt

This command names two separate sources of leftover idolatry, not just one.

Some idols traced back to Mesopotamia, where Terah's family originally worshipped other gods.

Others were picked up more recently during Israel's centuries living inside Egypt.

Old habits from two different pagan homelands were apparently still lingering among the people.

🚮 This names two separate idol sources
🗺️ One traced back to Mesopotamia
🇪🇬 The other came from Egypt
📖 Old habits from both places still lingered

## 🎭 If It Seem Evil Unto You To Serve The LORD, Choose You This Day

Joshua offers a real choice instead of forcing an outward show of loyalty.

He names the alternatives plainly, the old gods from Mesopotamia or the gods of the Amorites.

A forced yes would have meant nothing.

Joshua wants a decision the people actually mean.

🎭 Joshua offers a genuine choice
🗿 Old gods and Amorite gods are named
🚫 A forced answer would mean nothing
📖 Joshua wants a decision people actually mean

## 🏡 But As For Me And My House, We Will Serve The LORD

Joshua answers his own question before anyone else can respond.

He commits not only himself but his entire household to this decision.

Leadership here means going first, not simply telling others what to choose.

This line has echoed far beyond this one chapter for thousands of years since.

🏡 Joshua includes his whole household
🥇 He answers before the people do
👑 Leadership meant going first
📖 This line has echoed for generations

# Joshua 24:16-18
# 🙌 The People Answer
---
## 😨 God Forbid That We Should Forsake The LORD, To Serve Other Gods

This is a strong, urgent phrase, closer to an oath than a casual reply.

The people react quickly, almost defensively, to the idea of leaving God.

Their words sound confident, though later verses will test how deep that confidence truly runs.

Joshua has not finished testing them yet.

😨 This phrase reads like an urgent oath
⚡ The people respond quickly and firmly
🎭 Confident words still need to be tested
📖 Joshua is not finished testing them

## ⛓️ Brought Us Up And Our Fathers Out Of The Land Of Egypt, From The House Of Bondage

"House of bondage" is a common phrase describing Egypt as a place of slavery.

The people root their loyalty in a real historical rescue, not an abstract idea.

They remember exactly where they came from and what it cost to leave it.

Gratitude for that rescue becomes their stated reason for choosing God.

⛓️ House of bondage means Egypt as slavery
🕰️ The people remember their real history
🙏 Gratitude drives their answer here
📖 A real rescue grounds their loyalty

## 👁️ Which Did Those Great Signs In Our Sight, And Preserved Us In All The Way

"Great signs" refers to the plagues and the miracles surrounding the Exodus.

"In our sight" repeats the same eyewitness claim Joshua made earlier in this speech.

"Preserved us in all the way" points to forty years of provision in the wilderness.

The people recite God's own résumé back to Him as their reason for loyalty.

👁️ Great signs means the plagues and wonders
👀 In our sight repeats Joshua's own claim
🏜️ The wilderness years show God's provision
📖 The people recite God's record as their reason

## 🗡️ The LORD Drave Out From Before Us All The People, Even The Amorites

The people close their answer by naming the conquest itself as final proof.

Every enemy nation driven from the land becomes evidence supporting their decision.

"Therefore will we also serve the LORD" follows this claim immediately.

Their conclusion rests on what they personally watched happen, not on blind tradition.

🗡️ The conquest itself becomes their proof
🏘️ Every driven out nation counts as evidence
✅ Their answer follows straight from that proof
📖 Personal experience, not tradition, shapes their conclusion

# Joshua 24:19-21
# ⚠️ Joshua's Surprising Warning
---
## 🚫 Ye Cannot Serve The LORD

This line sounds jarring right after the people just promised exactly that.

Joshua is not contradicting himself or reversing his own invitation.

He is testing whether the people understand what real devotion actually costs them.

An easy yes, given too quickly, often reveals a shallow understanding of the commitment.

🚫 This line jars right after their promise
🎯 Joshua is testing, not contradicting himself
⚖️ He checks if they grasp the real cost
📖 A quick yes can hide shallow understanding

## ✨ For He Is An Holy God, He Is A Jealous God

"Holy" means completely set apart, in a category no other god shares.

"Jealous" here does not describe pettiness or insecurity, the way the word can sound today.

It describes an exclusive claim, like a marriage that will not tolerate a rival.

God will not share the loyalty He is owed with any other god.

✨ Holy means set apart, in a category alone
💍 Jealous here means exclusive, like marriage
🚫 No rival loyalty will be tolerated
📖 God claims full, undivided devotion

## ❌ He Will Not Forgive Your Transgressions Nor Your Sins

This warning is specific to the sin of abandoning God for other gods.

It is not a claim that God never forgives any sin under any circumstance.

Scripture elsewhere shows God forgiving people who genuinely turn back to Him in repentance.

Joshua is describing the danger of walking away entirely, not a single failure.

❌ This warning targets abandoning God specifically
🙅 It does not deny all forgiveness everywhere
🔄 Scripture shows forgiveness for real repentance
📖 The danger is walking away entirely

## 🔥 If Ye Forsake The LORD, And Serve Strange Gods, Then He Will Turn And Do You Hurt

Joshua spells out the full sequence of cause and consequence plainly.

"Turn" pictures God's favor shifting direction, no longer working in Israel's benefit.

This warning is conditional, tied directly to the choice the people are about to make.

Nothing here is inevitable if the people actually stay faithful.

🔥 Joshua spells out cause and consequence
🔄 Turn pictures God's favor shifting direction
⚖️ This warning stays conditional, not fixed
📖 Faithfulness could still avoid this outcome

## 🎁 After That He Hath Done You Good

This warning does not describe punishment arriving out of nowhere.

God's blessing came first, generously and repeatedly, throughout this entire speech.

The turn toward hurt would only follow a real choice to abandon Him.

Good given freely could still be followed by real loss, depending on Israel's choice.

🔄 Blessing came first, not punishment
🎁 God's good gifts fill this whole speech
⚖️ Any turn would follow a real choice
📖 A gift can still be lost

# Joshua 24:22-24
# 🤝 Witnesses And A Final Answer
---
## ⚖️ Ye Are Witnesses Against Yourselves That Ye Have Chosen You The LORD

Joshua turns the people's own promise into binding legal testimony.

Naming themselves as witnesses means they cannot later claim they never agreed to this.

Ancient treaties often used exactly this kind of formal, spoken self testimony.

Their own words now stand as evidence against any future excuse.

⚖️ Joshua makes their promise legally binding
🗣️ Self testimony was a real treaty practice
🚫 They cannot later claim ignorance
📖 Their own words become future evidence

## 🚮 Now Therefore Put Away The Strange Gods Which Are Among You

Notice the timing carefully here.

Joshua asks them to remove idols only after they already gave their verbal answer.

Actions were expected to follow the promise immediately, not sometime later.

A choice that never changes daily habits was never really the choice being asked for.

🚮 Timing matters in this instruction
🗣️ Action follows their promise right away
🏠 Idols still sat inside their homes
📖 Real choices change daily habits

## ❤️ Incline Your Heart Unto The LORD God Of Israel

"Incline" pictures deliberately leaning or turning your whole self toward something.

Joshua is not satisfied with correct outward actions alone.

He wants the inward direction of their hearts to genuinely match those actions.

Removing idols without a changed heart would only address half the problem.

❤️ Incline means deliberately turning toward
👐 Outward action alone was not enough
💭 The heart needed to match the actions
📖 Half measures never solve the real problem

## 🗣️ The LORD Our God Will We Serve, And His Voice Will We Obey

The people's final answer adds one important word missing from their first response.

"Obey his voice" goes further than simply choosing to serve in general terms.

It commits them to a specific, ongoing pattern of listening and doing.

Loyalty in words has now grown into a promise of continued obedience.

🗣️ Obey goes beyond a general promise
👂 It commits them to ongoing listening
✅ Words have grown into real commitment
📖 Loyalty now includes continued obedience

# Joshua 24:25-28
# 📜 The Covenant And The Stone
---
## 🤝 So Joshua Made A Covenant With The People That Day

A covenant was a formal, binding agreement, closer to a legal treaty than a casual promise.

This was not simply an emotional moment that faded once everyone went home.

Joshua treats this day as a permanent, official transaction between Israel and God.

The nation was now formally bound to what it had just spoken aloud.

🤝 A covenant was a formal, binding treaty
📋 This moment was official, not just emotional
✍️ Israel became formally bound that day
📖 Spoken words turned into a lasting bond

## 📖 Joshua Wrote These Words In The Book Of The Law Of God

This links directly back to the written law Joshua mentioned back in chapter one.

Writing the words down protected them from being softened or forgotten over time.

A spoken promise can quietly drift.

A written one stays exactly as it was first recorded.

🔗 This connects back to chapter one
✍️ Writing protects words from being forgotten
💨 Spoken promises can quietly drift
📖 Written words stay exactly as recorded

## 🪨 Took A Great Stone, And Set It Up There Under An Oak

Setting up a large stone as a legal witness was a known ancient Near Eastern custom.

Jacob himself had already used this exact same practice generations earlier in Genesis.

The oak likely marked a well known, easily found location near the sanctuary.

A visible landmark meant nobody could pretend this covenant never happened.

🪨 A standing stone served as a witness
📜 Jacob used this same custom earlier
🌳 The oak marked a known location
📖 A visible landmark prevented future denial

## 👂 This Stone Shall Be A Witness Unto Us, For It Hath Heard All The Words

Joshua speaks about the stone as though it were a living witness.

This is a poetic device, not a claim that rocks can literally hear or speak.

The stone stood exactly where every word of this covenant was spoken aloud.

Every time the people passed it, the stone would silently hold them to their promise.

👂 Joshua treats the stone poetically
🪨 It never literally heard or spoke
📍 It stood where every word was said
📖 It silently held the people to their promise

## 🚶 So Joshua Let The People Depart, Every Man Unto His Inheritance

The formal ceremony ends, and ordinary daily life resumes right after it.

Each family returns to the exact land inheritance already assigned earlier in the book.

Nothing about this moment removed the people from their normal responsibilities.

Faithfulness was now meant to be lived out back home, not only spoken at Shechem.

🚶 The ceremony ends and life resumes
🏡 Families return to their assigned land
📋 Earlier chapters already assigned that land
📖 Faithfulness had to be lived out at home

# Joshua 24:29-31
# 🪦 Joshua's Death
---
## 🌍 Joshua The Son Of Nun, The Servant Of The LORD, Died

"Servant of the LORD" is a rare, honored title in the Old Testament.

Moses is the only other major figure who consistently carries this exact same title.

Placing Joshua beside Moses this way signals the highest possible respect for his leadership.

The book that opened with Joshua succeeding Moses now closes with Joshua's own death.

🌍 Servant of the LORD is a rare title
👤 Moses alone shares this exact title
🏆 This signals the highest possible respect
📖 The book closes where Joshua's leadership began

## 🔢 Being An Hundred And Ten Years Old

A lifespan of one hundred and ten years was considered the ideal, full life in ancient Egyptian culture.

Joseph, who spent his life in Egypt, is recorded as living to that exact same age.

Joshua reaching that same number frames his life as a complete, full, well lived one.

Nothing about his death reads as early, unfinished, or cut short.

🔢 A hundred and ten was an ideal lifespan
🇪🇬 That number came from Egyptian culture
👤 Joseph lived to that same age
📖 Joshua's life reads as complete, not cut short

## ⛰️ Buried Him In The Border Of His Inheritance In Timnathserah, Mount Ephraim

This exact town and location were already assigned to Joshua back in chapter nineteen.

He receives no special royal tomb or unusual burial honor beyond that ordinary inheritance.

Joshua is buried on the very same plot of land given to every other Israelite family.

Even in death, Joshua remains one of the people rather than set above them.

⛰️ This land was assigned back in chapter nineteen
🚫 Joshua received no special royal tomb
🏡 He is buried on ordinary inherited land
📖 Joshua remained one of the people

## ✅ Israel Served The LORD All The Days Of Joshua, And All The Days Of The Elders That Overlived Him

This verse marks a real high point for Israel's faithfulness as a nation.

As long as leaders remained who had personally witnessed God's great works, loyalty held steady.

The book of Judges opens right after this generation finally passes away completely.

That next book shows plainly what happens once firsthand memory of God's works fades.

✅ This marks a real high point of loyalty
👴 Eyewitness leaders kept that loyalty steady
📉 Judges begins once this generation is gone
📖 Faded memory led to Judges' steep decline

# Joshua 24:32-33
# ⚰️ Two More Burials
---
## 🦴 The Bones Of Joseph, Which The Children Of Israel Brought Up Out Of Egypt, Buried They In Shechem

Joseph made his brothers swear an oath to carry his bones out of Egypt someday.

That promise appears at the very end of the book of Genesis, over four hundred years earlier.

Israel carried those bones through the entire wilderness journey and the whole conquest of Canaan.

This burial finally closes a promise kept across many generations of faithful carrying.

🦴 Joseph's oath appears at Genesis's very end
⏳ Over four hundred years passed before this
🚶 Israel carried his bones the whole journey
📖 One long kept promise finally closes here

## 💰 In A Parcel Of Ground Which Jacob Bought Of The Sons Of Hamor For An Hundred Pieces Of Silver

This exact land purchase is recorded back in the book of Genesis as well.

Jacob paid real silver for this plot generations before Israel ever needed it as a nation.

Joseph's bones now rest on ground his own family had legally purchased long ago.

The whole book of Joshua ends by tying directly back to that much earlier promise.

💰 This purchase is recorded in Genesis too
👴 Jacob bought this land generations earlier
🦴 Joseph now rests on that same ground
📖 Joshua's ending ties back to Genesis

## 🔄 Buried They In Shechem

The chapter opened with Israel gathered alive at Shechem to renew their covenant.

It now closes with Joseph's bones finally laid to rest in that same city.

One long journey, stretching back to Egypt and beyond, ends exactly where this chapter began.

The whole book of Joshua closes its final circle in this one shared location.

🔄 The chapter opened and closes in Shechem
🦴 Joseph's bones finally rest there
🗺️ A long journey ends in that place
📖 Joshua's whole story closes its circle there

## ⚰️ Eleazar The Son Of Aaron Died, And They Buried Him In A Hill That Pertained To Phinehas His Son

Eleazar served as high priest after his father Aaron died back in the wilderness.

His death here closes out the founding generation of Israel's priesthood alongside Joshua's own death.

Phinehas, his son, inherits both the land and the priestly role that follows.

The chapter ends by quietly handing every kind of leadership forward to the next generation.

⚰️ Eleazar was Israel's second high priest
👴 His death closes the founding priestly generation
👶 Phinehas inherits the land and the role
📖 Leadership passes forward as the chapter ends
`.trim();

export const JOSHUA_TWENTY_FOUR_PERSONAL_SECTIONS = parseJoshuaTwentyFourRawNotes(JOSHUA_TWENTY_FOUR_RAW_NOTES);
