export type ExodusTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTenRawNotes(rawText: string): ExodusTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 10:${startVerse}` : `Exodus 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 10 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TEN_RAW_NOTES = `# Exodus 10:1-3
# 📢 The LORD Confronts Pharaoh Again
---
## 🧠 I Have Hardened His Heart

This does not mean God forced Pharaoh to sin against his own will.

Pharaoh already hardened his own heart by choice in earlier chapters.

Here God simply confirms that choice and lets it run its full course.

Think of a judge who finally lets a stubborn defendant face a penalty already chosen.

God is not creating rebellion in this moment.

He is refusing to rescue Pharaoh from the rebellion Pharaoh already picked.

🧠 Pharaoh already hardened his own heart
⚖️ God lets that choice run its course
👨‍⚖️ Like a judge honoring a stubborn choice
📖 God confirms rebellion, He does not create it

## 👦 That Thou Mayest Tell In The Ears Of Thy Son, And Of Thy Son's Son

God tells Moses these plagues are not only for Pharaoh's benefit.

They are meant to become a story told for generations after this one.

"Son's son" is an old way of saying grandson.

Every plague becomes a fact Israel will retell long after Egypt is only a memory.

The real goal named at the end of the verse is bigger than Pharaoh.

The whole point of every plague is for people to know who God is.

👦 Son's son means grandson
📜 Plagues become a story told for generations
🎯 Egypt was never the only audience
📖 Every plague reveals who God is

## 🙇 How Long Wilt Thou Refuse To Humble Thyself Before Me?

To humble yourself means giving up control instead of demanding your own way.

God asks Pharaoh plainly how long he plans to keep refusing that surrender.

Nine warnings have already come and gone by this point in the story.

Pharaoh's problem was never a shortage of proof.

It was pride that refused to bend even when the evidence was overwhelming.

The real fight in Exodus was never actually about frogs or locusts.

It was about who Pharaoh would finally admit was in charge.

🙇 Humble means giving up control
🔢 Nine warnings had already come
💔 Pharaoh's problem was pride, not proof
➡️ The real fight was over control

# Exodus 10:4-6
# 🦗 The Locusts Are Threatened
---
## 🗺️ To Morrow Will I Bring The Locusts Into Thy Coast

"Coast" here does not mean a beach or a shoreline.

It means the whole border and territory that Pharaoh rules.

God is not threatening one small region of Egypt.

He is threatening the entire land at once.

Locusts were one of the most feared disasters in the ancient world.

One swarm could destroy a whole season's crop in a single day.

🗺️ Coast means Egypt's whole territory
🦗 Locusts were a feared ancient disaster
🌾 One swarm could destroy a season's crop
📖 God threatens the whole land, not one spot

## 🌾 The Residue Of That Which Is Escaped

"Residue" means whatever survives after something else has already happened.

The hail plague in the chapter before this one had already damaged the crops.

This new plague targets exactly what survived that earlier storm.

Nothing that escaped one disaster gets to escape the next one too.

Two plagues working together leave Egypt with almost no harvest left standing.

🌾 Residue means whatever survived before
🧊 The hail already damaged the crops
🦗 Locusts finish what the hail started
➡️ Two plagues together leave no harvest

## 👴 Which Neither Thy Fathers, Nor Thy Fathers' Fathers Have Seen

This phrase spans two full generations back, a father and a grandfather.

Egypt was an old civilization with centuries of remembered history behind it.

God says this coming disaster will be worse than anything in that entire memory.

This was never going to be just a bad harvest season.

It was a plague without precedent in Egypt's whole recorded past.

👴 Fathers' fathers means two generations back
🏛️ Egypt had centuries of remembered history
📉 This plague breaks that whole record
📖 Nothing like it had happened before

## 🚶 He Turned Himself, And Went Out From Pharaoh

Moses does not wait for Pharaoh to answer him.

He simply turns and walks out right after delivering the warning.

That is a bold move for anyone standing in front of a king.

Moses is no longer pleading for a hearing at this point in the story.

He is speaking with the confidence of someone who already knows how it ends.

🚶 Moses leaves before Pharaoh replies
👑 Bold for anyone facing a king
💪 Moses speaks with real confidence now
➡️ He already knows how this will end

# Exodus 10:7-11
# 😤 Pressure From Pharaoh's Own Court
---
## 🪤 How Long Shall This Man Be A Snare Unto Us?

A "snare" is a trap, usually one hidden to catch an animal.

Pharaoh's own officials now call Moses a trap that is catching all of Egypt.

This is the first moment in the story where Pharaoh's own government turns on him.

These are not slaves or foreigners raising the complaint.

They are Pharaoh's own trusted advisors.

Even the people closest to Pharaoh can now see what he still refuses to admit.

🪤 Snare means a hidden trap
👥 These are Pharaoh's own officials
⚠️ Egypt itself is being destroyed
📖 Even his own court sees the truth

## 🤔 But Who Are They That Shall Go?

This sounds like Pharaoh is finally agreeing to let Israel go.

He is not.

He is only asking a question meant to limit the deal before agreeing to anything.

Pharaoh negotiates like a man hunting for a loophole, not a man who has surrendered.

Every plague so far has ended the exact same way, a partial offer instead of full release.

❓ Sounds like surrender, but is not
🤔 Pharaoh is negotiating, not agreeing
🔁 The same partial pattern repeats again
➡️ A question can hide a refusal

## 👨‍👩‍👧‍👦 We Will Go With Our Young And With Our Old

Moses insists the whole nation leaves together, not just a chosen few.

Children, elders, sons, daughters, flocks, and herds are all named on purpose.

This was never going to be a quick errand for a few men.

It was worship for an entire people, and worship required everyone present.

A feast unto the LORD meant a full household act, not a private trip.

👨‍👩‍👧‍👦 Every generation is named on purpose
🐑 Flocks and herds go too
🙏 Worship required the whole nation
📖 This was never a private errand

## 😏 Let The LORD Be So With You, As I Will Let You Go

This line sounds like a blessing on the surface.

It is actually a sarcastic threat aimed straight at Moses.

Pharaoh is mocking the idea that God would really help them leave at all.

"Evil is before you" is his way of promising trouble if they try.

Kind sounding words can still carry a real warning underneath them.

😏 Sounds kind, is actually mockery
⚠️ Evil before you means expect trouble
🗯️ Pharaoh threatens while pretending to bless
➡️ Words can hide a real warning

## 🚪 They Were Driven Out From Pharaoh's Presence

"Driven out" means forced out, not politely shown the door.

Pharaoh only agrees to let the men go, keeping women and children behind.

Moses and Aaron refuse that partial deal completely.

Guards physically remove them from the room for saying no.

A king who claims to be negotiating just had two men thrown out by force.

🚪 Driven out means forced out
👨‍👩‍👧 Pharaoh tries to keep families behind
🙅 Moses refuses the partial deal
📖 Force replaces any real negotiation

# Exodus 10:12-15
# 🦗 The Locusts Strike Egypt
---
## ✋ Stretch Out Thine Hand Over The Land Of Egypt For The Locusts

Moses does not summon the locusts by his own power.

Stretching out his hand is simply the visible signal that God is about to act.

The same rod already used in earlier plagues appears again in the very next verse.

Moses is the messenger here, never the actual source of the miracle.

Every plague in this book works the same way underneath the visible action.

✋ The hand is only a signal
🌾 It targets what the hail had left
🪄 The rod appears again next verse
📖 Moses signals, but God acts

## 🧭 The LORD Brought An East Wind Upon The Land

Egypt sits west of Arabia, where large locust swarms often begin.

An east wind blowing all day and all night would carry a swarm straight into Egypt.

God chooses a real, natural weather pattern to deliver a supernatural plague.

The miracle sits in the timing and the scale, not in bypassing nature entirely.

God works through the wind here instead of working around it.

🧭 East wind blows from Arabia's direction
🌬️ A whole day and night of wind
🦗 Nature carries a supernatural plague
📖 God works through creation, not around it

## 😖 Very Grievous Were They

"Grievous" means severe enough to cause real, lasting harm.

The text goes further and calls this swarm one of a kind.

No locust plague before it, and none after it, would ever match this scale.

That claim is not exaggeration for dramatic effect.

It is the narrator marking this moment as a true historical extreme.

😖 Grievous means severely harmful
🥇 Called the worst locust swarm ever
🚫 Nothing before or after matched it
📖 The Bible marks this as extreme

## 🌑 There Remained Not Any Green Thing

The land goes completely dark under the sheer number of locusts.

That darkness quietly points ahead to an actual plague of darkness only verses later.

Every green plant left standing after the hailstorm disappears now.

Egypt's whole food supply for the year is wiped out in one plague.

There is nothing gradual about this kind of destruction.

🌑 The swarm blocks out visible light
🔮 It hints at the darkness plague ahead
🌾 Every green plant is gone
📖 A whole year's food supply vanishes

# Exodus 10:16-20
# 😰 Pharaoh Breaks, Then Hardens Again
---
## ⏱️ Pharaoh Called For Moses And Aaron In Haste

"In haste" means Pharaoh rushed, without his usual delay or ceremony.

Earlier plagues brought stalling and half offers from him.

This time Pharaoh sends for Moses immediately instead of waiting.

The speed itself reveals how frightened Pharaoh has actually become.

This is the most shaken he has appeared anywhere in the story so far.

⏱️ Haste means rushing without delay
🐢 Earlier plagues brought stalling instead
😨 The speed reveals real fear
📖 This is Pharaoh's most shaken moment yet

## 🙏 Forgive, I Pray Thee, My Sin Only This Once

This sounds like a genuine, lasting change of heart.

The history in this story says otherwise.

Pharaoh made a very similar promise after the hail plague and broke it.

"Only this once" is Pharaoh managing the moment, not repenting of the pattern.

Fear can produce words that sound like faith without actually becoming faith.

🙏 Sounds sincere on the surface
🔁 He made this same promise before
🎭 Only this once manages the moment
📖 Fear can imitate faith without becoming it

## 🤝 He Went Out From Pharaoh, And Intreated The LORD

Moses prays for the very king who just threatened his people.

Nothing in the text says Pharaoh has actually changed inside.

Moses intercedes anyway, on Pharaoh's word alone.

This same pattern happens after nearly every plague in this book.

Moses keeps praying for Egypt's relief long after Egypt stops deserving it.

🤝 Moses prays for his own enemy
🙏 He acts on Pharaoh's word alone
🔁 This pattern repeats after each plague
📖 Mercy keeps being offered undeserved

## 🌊 There Remained Not One Locust In All The Coasts Of Egypt

The same God who sent an east wind now sends a west wind instead.

Every single locust is driven into the Red Sea, not just scattered away.

The removal is as total and complete as the plague itself had been.

The very sea that later swallows Pharaoh's army first swallows his locusts here.

🌬️ A west wind reverses the plague
🌊 The Red Sea takes every locust
✅ The relief is total, not partial
📖 The same sea returns again later

## 💔 The LORD Hardened Pharaoh's Heart

Total relief from the locusts still does not soften Pharaoh for long.

Every earlier plague in this book ended the exact same way.

A brief moment of fear gives way to the same old refusal.

The pattern itself has become part of the message by now.

Even complete relief cannot fix a heart that keeps choosing itself.

🔁 The same pattern repeats again
😮‍💨 Relief did not soften Pharaoh
💔 A hardened heart resists even mercy
📖 The pattern has become the message

# Exodus 10:21-23
# 🌑 Darkness Over The Land
---
## ✋ Darkness Which May Be Felt

This is not simply describing a very dark night.

The text describes darkness thick enough to feel against your skin.

It is heavy and oppressive, not just an absence of light.

A plague built from nothing suddenly becomes something you can almost touch.

🌑 More than an ordinary dark night
✋ Described as thick enough to feel
😰 Heavy and oppressive, not just dim
📖 Absence of light becomes something physical

## ☀️ A Thick Darkness In All The Land Of Egypt Three Days

Egypt worshiped the sun as one of its most powerful gods, called Ra.

Three full days without sunlight was not simply uncomfortable.

It directly confronted the very god Egypt trusted to rule the sky.

A plague of darkness humiliates Pharaoh's whole religious system, not only his people.

☀️ Ra was Egypt's sun god
📆 Three full days with no sunlight
🛐 This plague confronts Egypt's own religion
📖 Darkness humiliates the god Pharaoh trusted

## 🏠 All The Children Of Israel Had Light In Their Dwellings

Every Egyptian home sits in total darkness at the very same moment.

Every Israelite home somehow still has light.

God draws a visible, physical line between the two peoples.

This was not luck in the middle of a natural disaster.

It was a clear sign showing exactly whose God was really in control.

🏠 Israelite homes still had light
🌑 Egyptian homes sat in total dark
📍 God drew a visible line here
📖 The sign showed who was in control

# Exodus 10:24-27
# 🐑 Another Compromise Rejected
---
## 🐑 Only Let Your Flocks And Your Herds Be Stayed

This finally sounds like real progress toward full release.

It still is not.

Pharaoh wants the animals left behind as insurance that Israel will return.

Every offer from Pharaoh in this whole story keeps something back.

🐑 Pharaoh still keeps something back
🔒 Livestock is held as insurance
🔁 Every offer has come with a catch
📖 Full release is still not offered

## 🔥 Thou Must Give Us Also Sacrifices And Burnt Offerings

A "burnt offering" was an animal completely burned as a gift to God.

"Sacrifices" more broadly covered other offerings, some later even shared as a meal.

Both required real, living animals, never symbols or substitutes.

That is exactly why Moses refuses to leave a single animal behind.

🔥 Burnt offering means a fully burned animal
🍽️ Sacrifices could include other offerings too
🐐 Real animals were required, not symbols
📖 Worship explains why every hoof matters

## 🐾 There Shall Not An Hoof Be Left Behind

"Not an hoof" is an old way of saying absolutely none, not even one.

Moses will not negotiate over a single animal.

He even admits Israel does not yet know exactly what God will require at Sinai.

Taking everything now means being ready for whatever comes later.

🐾 Not an hoof means not even one
🙅 Moses refuses to leave anything behind
❓ They do not yet know what is required
📖 Obedience prepares for instructions not yet given

## 🔟 He Would Not Let Them Go

The refrain returns one more time before the story reaches its final break.

Nine plagues have already come and gone with this same ending.

Only one plague remains after this point in the whole account.

The pattern itself is quietly building toward something final.

🔁 The same refrain returns again
🔟 Nine plagues have already passed
⏳ Only one plague remains after this
📖 The pattern points toward something final

# Exodus 10:28-29
# 💔 The Final Meeting
---
## 🚫 In That Day Thou Seest My Face Thou Shalt Die

Pharaoh is not just angry now.

He permanently bans Moses from ever appearing before him again.

Breaking that ban would mean an automatic death sentence.

This is the most severe threat Pharaoh has made anywhere in the story.

Any future word from God to Pharaoh will have to come a different way.

🚫 Moses is permanently banned from Pharaoh
☠️ Breaking the ban means death
📈 This is Pharaoh's harshest threat yet
📖 Future warnings will come differently

## 😌 Thou Hast Spoken Well, I Will See Thy Face Again No More

Moses agrees immediately, with no fear in his answer.

A death threat from the most powerful man in Egypt does not shake him.

This marks the last face to face meeting between Moses and Pharaoh in the book.

One plague still remains, and it will not need another audience like this one.

Moses' calm here says more about his trust in God than any argument could.

😌 Moses answers without any fear
🚪 Their last face to face meeting
⏳ One final plague still remains
📖 Calm trust speaks louder than argument
`.trim();

export const EXODUS_TEN_PERSONAL_SECTIONS = parseExodusTenRawNotes(EXODUS_TEN_RAW_NOTES);
