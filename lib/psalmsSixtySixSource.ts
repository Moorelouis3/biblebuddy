export type PsalmsSixtySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSixtySixRawNotes(rawText: string): PsalmsSixtySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSixtySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+66:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 66 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+66:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+66:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 66 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 66,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 66:${startVerse}` : `Psalms 66:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 66 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SIXTY_SIX_RAW_NOTES = `# Psalms 66:1-4
# 📢 All The Earth Is Called To Worship
---
## 📢 Make A Joyful Noise Unto God, All Ye Lands

"Joyful noise" does not mean quiet or careful worship.

It describes loud, unrestrained shouting and singing together.

"All ye lands" means every nation on earth.

This invitation reaches far beyond Israel alone.

The psalm opens by calling the whole world to praise.

📢 Joyful noise means loud, unrestrained praise
🌍 All ye lands means every nation
🌐 This invitation reaches beyond Israel
📖 The whole world is called to praise

## 🎶 Sing Forth The Honour Of His Name

"Sing forth" means to sing loudly and openly, not quietly.

"The honour of his name" means the glory that belongs to who God is.

God's name in scripture often stands for his whole character.

Praise here is not humming quietly to yourself.

It is telling others out loud exactly who God is.

🎶 Sing forth means singing loudly, openly
👑 His name stands for his character
📣 Praise is not private humming
📖 Worship declares who God is

## ✨ Make His Praise Glorious

"Glorious" means splendid, weighty, worthy of real honor.

This is not a casual or halfhearted kind of praise.

The word pushes worshippers to give their very best effort.

Praise here should match the greatness of the one receiving it.

✨ Glorious means splendid and weighty
💯 Not casual or halfhearted praise
🎯 Worship should match God's greatness
📖 Best effort belongs in real praise

## 😮 How Terrible Art Thou In Thy Works

"Terrible" in this psalm does not mean evil or frightening in a bad way.

It means awe inspiring, powerful enough to make people tremble.

Ancient readers used this word for storms, armies, and mighty kings.

Here it describes God's own works and actions.

This kind of fear is closer to wonder than to dread.

😮 Terrible means awe inspiring, not evil
⛈️ The word once described storms and kings
💪 Here it describes God's own works
📖 This fear is closer to wonder

## 🏳️ Shall Thine Enemies Submit Themselves Unto Thee

"Submit themselves" pictures an enemy giving in, unable to keep resisting.

Some scholars believe the phrase can also describe a forced, grudging surrender.

That is not the same as freely choosing to follow God.

God's power alone was enough to force even hostile nations to yield.

🏳️ Submit means giving in, unable to resist
😬 This surrender may be forced, not willing
💪 God's power alone forces this yielding
📖 Even hostile nations cannot resist him

## 🌍 All The Earth Shall Worship Thee, And Shall Sing Unto Thee

Worship in this psalm is never meant to stay silent.

This line repeats the opening invitation from verse one, on purpose.

Worship and singing are placed side by side here.

True praise in this psalm is always heard out loud.

🌍 The whole earth worships and sings
🔁 This repeats the psalm's opening call
🔊 Worship here is never silent
📖 True praise is meant to be heard

## 🎤 They Shall Sing To Thy Name

Singing "to thy name" means directing the song at who God is.

This is not vague, wordless music without a clear target.

The praise names God specifically instead of praising in general.

Every verse so far keeps circling back to God's own name.

🎤 Singing to his name means specific praise
🎯 The song has a clear target
🔁 God's name keeps returning in this psalm
📖 Praise names God, not a vague idea

## ⏸️ Selah

"Selah" is a word whose exact meaning is not fully known today.

Most scholars believe it marked a musical or liturgical pause.

It likely told singers or musicians to stop and reflect.

This word appears three times in this psalm, including here.

Its placement invites a moment to consider what was just sung.

⏸️ Selah likely marked a pause
🎼 It may have guided musicians
🤔 The exact meaning is not fully known
📖 It invites a moment to reflect

# Psalms 66:5-8
# 🌊 Remembering How God Delivered His People
---
## 👀 Come And See The Works Of God

"Come and see" is a real invitation, not just a figure of speech.

The psalm calls every listener to actually look at what God has done.

Faith here connects to paying attention, not only believing blindly.

God's works were meant to be examined, not simply assumed.

👀 Come and see is a real invitation
🔍 Faith connects to paying attention
🙌 God's works were meant to be examined
📖 Belief here is not blind assumption

## 💪 Terrible In His Doing Toward The Children Of Men

"Terrible" again means awe inspiring, not cruel or frightening.

This same word appeared in verse three, on purpose.

"The children of men" simply means humanity in general.

God's awe inspiring works reach every person, not one nation only.

💪 Terrible again means awe inspiring
👥 Children of men means all humanity
🌍 God's works reach every person
📖 No nation is left outside this reach

## 🌊 He Turned The Sea Into Dry Land

"The sea" here refers to the Red Sea from the exodus out of Egypt.

God split it so his people could walk through safely.

What was once a deadly barrier became solid, walkable ground.

This was not a small or forgettable moment in Israel's history.

🌊 This recalls the exodus from Egypt
🚶 A deadly sea became solid ground
🔑 A barrier turned into a way through
📖 Israel never forgot this deliverance

## 🚶 They Went Through The Flood On Foot

"The flood" here likely also recalls crossing the Jordan River.

Joshua later led Israel through that river on dry ground too.

Two separate water crossings are remembered together in this one verse.

Both moments proved that God could open a path where none existed.

🚶 The flood likely recalls the Jordan crossing
🔗 Two water crossings are remembered together
🛤️ Both proved God opens a path
📖 No water blocks God's people for long

## 🎉 There Did We Rejoice In Him

The exodus becomes personal here, not just historical.

The psalm suddenly shifts from "he" to "we" in this line.

Later generations could say "we" even though they were not there.

God's past deliverance still belonged to the whole community.

🎉 The pronoun shifts from he to we
🕰️ Ancient history becomes present celebration
👥 Later Israel still claims this "we"
📖 God's past deliverance still belongs to today

## 👑 He Ruleth By His Power For Ever

God's rule did not stop after the exodus.

This verse moves from one past event into his ongoing power.

The same power that split the sea never actually stopped ruling.

His authority stretches from that ancient moment into every age after.

👑 Rule here is ongoing, not one time
🌊 The same power split the sea
♾️ God's authority never stopped
📖 His rule reaches every age after

## ⚠️ Let Not The Rebellious Exalt Themselves

"The rebellious" refers to nations or people who resist God's authority.

"Exalt themselves" means to act proudly, as if no one rules over them.

This line is a warning placed right after praising God's power.

No amount of pride can actually outlast God's real authority.

⚠️ The rebellious resist God's authority
😤 Exalt themselves means acting proudly
🧱 This warning follows praise on purpose
📖 Pride cannot outlast God's authority

## 🔊 Make The Voice Of His Praise To Be Heard

"The voice of his praise" means praise spoken or sung out loud.

Quiet, private appreciation is not what this verse describes.

This repeats the psalm's opening call, using slightly different words.

The whole community is told to praise where others can hear it.

🔊 This echoes the psalm's opening call
🗣️ Praise here is spoken out loud
🤫 Not quiet, private appreciation
📖 The whole community praises out loud

# Psalms 66:9-12
# ⚖️ Tested Like Silver, Brought Through Fire And Water
---
## 🙌 Which Holdeth Our Soul In Life

"Holdeth" pictures God actively grasping and sustaining something.

This is not a distant God who simply lets life happen.

"Our soul in life" means our very existence and breath.

God is described as the one actively keeping his people alive.

🙌 Holdeth means actively grasping, sustaining
💨 Soul in life means our existence itself
🤲 God actively keeps his people alive
📖 Life is held by God, not chance

## 🦶 Suffereth Not Our Feet To Be Moved

"Suffereth not" means God does not allow something to happen.

"Feet to be moved" pictures losing footing and falling.

Think of someone standing firm on solid ground during a storm.

God is credited with keeping his people stable through hardship.

🦶 Feet moved pictures losing footing
🌪️ Like standing firm during a storm
🛡️ God keeps his people stable
📖 Stability through hardship comes from God

## 🔬 Thou Hast Proved Us

"Proved" means tested to reveal what is really true.

This is not God discovering something he did not already know.

The testing reveals the people's character to themselves and to others.

Hard seasons in scripture often serve this same purpose.

🔬 Proved means tested to reveal truth
🪞 The test reveals character, not new facts
👥 It shows others what was already true
📖 Hard seasons often test in this way

## 🔥 Thou Hast Tried Us, As Silver Is Tried

"Tried" here means refined, the same word used for purifying silver.

Refining silver meant heating it until impurities rose to the surface.

A refiner would skim those impurities away, leaving the silver pure.

God's testing is compared to that same slow, purifying fire.

🔥 Refining silver used intense heat
🧪 Impurities rose and were skimmed away
⏳ The process could not be rushed
📖 God's testing purifies like that fire

## 🕸️ Thou Broughtest Us Into The Net

"The net" pictures a trap used to catch animals or fish.

Once caught, there was no easy way to escape it.

This pictures a season of feeling caught, with no way out.

The psalm credits God directly with allowing this trapped feeling.

🕸️ A net trapped animals with no escape
😣 This pictures feeling caught, stuck
🙏 God is credited with allowing it
📖 Hard seasons are not random accidents

## 😖 Thou Laidst Affliction Upon Our Loins

"Loins" refers to the lower back and hips, a place of strength.

Placing weight there pictures a heavy, physical kind of burden.

Ancient readers pictured this like a load strapped tightly to the body.

The affliction described here is felt, not just imagined.

😖 Loins means the lower back and hips
🎒 This pictures a heavy physical burden
🔗 Like a load strapped to the body
📖 This affliction was truly felt

## ⚔️ Thou Hast Caused Men To Ride Over Our Heads

"Ride over our heads" pictures enemy armies riding over the defeated.

It is a vivid image of conquest and total defeat.

The psalm does not soften how painful this season really was.

Even this humiliation is described as something God allowed.

⚔️ This pictures enemies riding over the defeated
😔 It shows total conquest and defeat
🗣️ The psalm does not soften the pain
📖 Even this was something God allowed

## 🔥 We Went Through Fire And Through Water

Fire and water represent two completely different kinds of danger.

Together they picture every possible extreme of hardship and loss.

This was not one single trial but a whole range of them.

The people faced nearly every kind of trouble scripture can picture.

🔥 Fire and water picture two extremes
🌊 Together they cover every kind of trial
📉 This was not one single trouble
📖 Nearly every kind of hardship is pictured

## 🏞️ Thou Broughtest Us Out Into A Wealthy Place

"Wealthy place" describes a spacious, abundant place, not just money.

It pictures open room to breathe after being trapped and confined.

The verse moves from net, fire, and water straight into relief.

God is credited with both allowing the trial and ending it.

🏞️ Wealthy place means spacious and abundant
🌬️ It pictures room to breathe again
🔁 The verse moves from trial to relief
📖 God allowed the trial and ended it

# Psalms 66:13-16
# 🙏 Vows Paid In The House Of God
---
## 🏛️ I Will Go Into Thy House With Burnt Offerings

"Thy house" refers to the temple, where sacrifices were formally offered.

The psalm shifts here from "we" back to a single voice, "I."

A burnt offering was completely consumed on the altar, given entirely to God.

This was not a partial gift but a full, costly one.

🏛️ Thy house refers to the temple
🔥 Burnt offerings were fully consumed
👤 The psalm shifts to one voice
📖 The gift given here was complete

## 🤝 I Will Pay Thee My Vows

A vow was a specific promise made to God, often during hardship.

"Pay" means the promise is now being kept, not just remembered.

People sometimes promised an offering if God brought them through trouble.

This moment is that earlier promise finally being fulfilled.

🤝 A vow was a promise to God
💰 Pay means the promise is now kept
😟 Vows often came during real hardship
📖 This is an earlier promise fulfilled

## 🗣️ Which My Lips Have Uttered, And My Mouth Hath Spoken

"Uttered" means spoken clearly out loud, not just merely thought.

Naming lips and mouth together stresses an actual, spoken promise.

"When I was in trouble" places the vow in one hard moment.

He is holding himself to words said under real pressure.

🗣️ The vow was spoken, not just felt
👄 Lips and mouth stress a spoken promise
😣 It was made during real trouble
📖 He holds himself to his own words

## 🐏 Burnt Sacrifices Of Fatlings, With The Incense Of Rams

"Fatlings" were young animals specially fed to be at their very best.

Offering the best animal, not a leftover one, showed real honor.

"Incense of rams" likely describes the smell of the offering as it burned.

Every detail here points to a costly, carefully chosen gift.

🐏 Fatlings were animals raised to be best
🎁 The best animal showed real honor
💨 Incense describes the smell as it burned
📖 Every detail points to a costly gift

## 🐂 I Will Offer Bullocks With Goats

Bullocks and goats added even more to an already large offering.

This was not a single small animal quietly brought to the altar.

The size of the offering matched the size of the deliverance described earlier.

A small rescue would not have called for a gift this large.

🐂 Bullocks and goats added to the offering
📈 This was a large, not small, gift
⚖️ The gift matched the rescue's size
📖 A big rescue deserved a big gift

## 👂 Come And Hear, All Ye That Fear God

This echoes the "come and see" invitation from verse five.

Now the invitation shifts from seeing God's works to hearing personal testimony.

"That fear God" describes people who take God seriously, not casual bystanders.

The psalmist is about to speak directly to people like himself.

👂 This echoes the earlier "come and see"
🔄 The invitation shifts to hearing testimony
🙏 Fear God means taking him seriously
📖 He speaks to people like himself

## 📣 I Will Declare What He Hath Done For My Soul

"Declare" means to announce something publicly and clearly.

"For my soul" makes this deeply personal, not a general statement.

The psalmist is about to tell his own specific story of rescue.

Public testimony is treated here as a real form of worship.

📣 Declare means to announce publicly
❤️ For my soul makes this personal
📖 He is about to tell his story
➡️ Testimony itself becomes an act of worship

# Psalms 66:17-20
# 🙌 A Prayer That God Actually Heard
---
## 😢 I Cried Unto Him With My Mouth

"Cried" describes an urgent, desperate call for help, not quiet asking.

The psalmist is remembering exactly how he prayed during his trouble.

This was not a calm, formal request spoken from a distance.

Real prayer here sounds loud and honest, not polished.

😢 Cried means an urgent, desperate call
🗣️ He remembers exactly how he prayed
🙅 This was not calm or distant
📖 Honest prayer need not be polished

## 👅 He Was Extolled With My Tongue

"Extolled" means lifted up high in praise and honor.

The same mouth that cried out in trouble now praises God.

Crying for help and praising God are placed side by side.

One naturally leads to the other in this psalm's pattern.

👅 Extolled means lifted up in praise
🔁 The same mouth cries and praises
🔗 Crying for help leads to praise
📖 This is the psalm's pattern throughout

## 💔 If I Regard Iniquity In My Heart

"Regard" here means to hold onto or cherish something on purpose.

This is not about having sin, since everyone struggles with that.

It describes clinging to sin instead of turning away from it.

The heart's private posture toward sin matters, not just outward actions.

💔 Regard means holding onto on purpose
🙅 This is not simply having sin
🔒 It means clinging instead of turning
📖 The heart's posture matters to God

## 🚫 The Lord Will Not Hear Me

This does not mean God cannot physically hear a sinner's words.

It means a hidden, unrepentant heart blocks real answered prayer.

Honest confession is treated here as necessary for real communication with God.

The psalmist names this risk honestly instead of hiding from it.

🚫 God can hear, but blocks the exchange
🔓 Unrepentant hearts block answered prayer
🙏 Honest confession opens real communication
📖 He names this risk honestly

## 👂 But Verily God Hath Heard Me

"Verily" means truly or certainly, adding real emphasis to this claim.

This verse directly answers the warning from the line just before it.

The psalmist did not hide his sin from God in secret.

Because of that honesty, his prayer actually reached God.

👂 Verily means truly, adding emphasis
🔗 This answers the warning just before
🙏 He did not hide his sin
📖 Honesty let his prayer reach God

## 🎧 He Hath Attended To The Voice Of My Prayer

"Attended" means to pay close, focused attention to something.

This is more than simply allowing a prayer to be spoken.

God is described as actively leaning in to listen.

The psalmist felt genuinely heard, not just technically permitted to speak.

🎧 Attended means close, focused attention
👂 More than simply allowing speech
🙌 God actively leans in to listen
📖 He felt truly heard, not just permitted

## 🙌 Blessed Be God

Praise here turns from struggle straight into pure thanks.

This short line shifts the whole psalm into gratitude.

"Blessed be God" is a common way scripture closes real prayer.

It marks a change from asking to genuinely thanking.

🙌 The psalm shifts into pure gratitude
🔄 It moves from testing to blessing
🙏 This is a common way prayer closes
📖 The tone changes from asking to thanking

## ❤️ Which Hath Not Turned Away My Prayer, Nor His Mercy From Me

Two separate gifts stand side by side in this final line.

God did not turn away the prayer itself.

God also did not withhold his mercy that followed it.

The psalm that opened with the whole earth ends with one grateful heart.

❤️ Two gifts are named side by side
🗣️ God did not turn away the prayer
🤲 God did not withhold his mercy
📖 One grateful heart ends this worldwide call
`.trim();

export const PSALMS_SIXTY_SIX_PERSONAL_SECTIONS = parsePsalmsSixtySixRawNotes(PSALMS_SIXTY_SIX_RAW_NOTES);
