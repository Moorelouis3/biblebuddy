export type ExodusThirtyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusThirtyFourRawNotes(rawText: string): ExodusThirtyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusThirtyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+34:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 34 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+34:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+34:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 34 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 34,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 34:${startVerse}` : `Exodus 34:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Exodus 34 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_THIRTY_FOUR_RAW_NOTES = `# Exodus 34:1-4
# 🪨 New Tablets Are Prepared
---
## 🔨 Hew Thee Two Tables Of Stone Like Unto The First

"Hew" means to cut and shape stone with a chisel.

This time Moses himself must do the physical cutting.

The first tablets came directly from God's own hand instead.

Moses shattered those tablets earlier in anger.

Making new ones now costs him real, personal effort.

🔨 Hew means to cut stone with a chisel

🪨 Moses cuts these tablets himself this time

💥 He shattered the first set earlier

📖 The words remain fully God's own

## ⏳ Which Thou Brakest

"Brakest" is an old form of the word broke.

Moses shattered the first tablets in furious anger back in chapter thirty two.

He smashed the very words God had written by His own hand.

God does not scold Moses again for that moment here.

Instead God simply provides a way to start over.

💥 Brakest is an old form of broke

😡 Moses smashed the first tablets in anger

🙏 God does not scold him again here

📖 Grace repairs what anger destroyed

## 🌄 Be Ready In The Morning

God sets a strict appointment for Moses to keep.

He must be ready and waiting the very next morning.

This mirrors the same early morning meeting back in chapter nineteen.

The mountain becomes a meeting place kept on God's own schedule.

Nothing about this second climb happens on Moses' own timing.

🌄 God sets an exact morning appointment

⛰️ This mirrors the meeting in chapter nineteen

⏰ The schedule belongs to God, not Moses

➡️ Moses obeys without any delay

## 👑 Present Thyself There To Me In The Top Of The Mount

"Present thyself" is formal language used for approaching a king.

Moses is not just climbing a hill to look around.

He is entering a royal audience with the God of Israel.

The mountain's peak becomes a throne room for this meeting.

👑 Present thyself means formal royal language

⛰️ The mountain's top becomes a throne room

🚶 Moses climbs to meet with a king

📖 God grants Moses direct royal access

## 🚧 No Man Shall Come Up With Thee

This repeats the same restricted access boundary from chapter nineteen.

Only Moses may approach the mountain's summit this time too.

The people below have already broken trust with the golden calf.

Even so, the mountain's holiness has not lessened at all.

🚧 This repeats the boundary from chapter nineteen

🙅 Only Moses may climb to the summit

🐂 The people broke trust with the golden calf

📖 The mountain's holiness never changed

## 🐑 Neither Let The Flocks Nor Herds Feed Before That Mount

The warning extends even to grazing animals near the mountain.

Herds wandering too close could not tell the ground was holy.

Israel must guard this boundary completely, not almost completely.

A single animal crossing the line still breaks the command.

🐑 The warning covers animals, not only people

🌾 Herds cannot sense holy ground on their own

🚧 The boundary has to be kept completely

📖 Holiness allows no small exceptions

## ⏰ Moses Rose Up Early In The Morning

Moses does not delay or hesitate after receiving the command.

He wakes early the very next day and starts climbing.

This same eager response already appeared in chapter twenty four.

Nothing about this second ascent shows any reluctance.

⏰ Moses rises early without any delay

🔁 This matches his response in chapter twenty four

🏔️ He climbs the mountain again himself

➡️ Obedience here comes without hesitation

## 💪 Took In His Hand The Two Tables Of Stone

Moses personally carries the heavy stone tablets up the mountain.

No servant or assistant helps him with this task.

He cut these stones himself and now hauls them alone.

The labor of this second set falls entirely on him.

🪨 Moses carries the stone tablets himself

🚫 No servant helps him with this climb

💪 He personally bears the weight of this task

📖 This second set costs Moses real labor

# Exodus 34:5-9
# 🌟 God Proclaims His Name
---
## ☁️ The LORD Descended In The Cloud

God does not appear in blinding light this time.

He comes down wrapped inside a cloud instead.

A cloud already marked God's presence back in chapter nineteen.

The visible symbol has not changed since then.

What has changed is the trust being rebuilt between them.

☁️ God descends inside a cloud again

⛰️ This matches chapter nineteen's earlier cloud

🔁 The outward symbol stays the same

📖 Trust is what gets rebuilt here

## 📛 Proclaimed The Name Of The LORD

God had already promised this exact moment back in chapter thirty three.

"I will proclaim the name of the LORD," He said there.

Now God keeps that promise out loud, in person.

A name in this culture carries someone's full character, not just a label.

📛 God promised this back in chapter thirty three

🗣️ He now keeps that promise aloud

🏷️ A name here means full character

📖 God reveals who He truly is

## 🔁 The LORD, The LORD God

God says His own name twice in a row here.

Repeating a name this way was a way of adding weight and certainty.

It functioned almost like an official seal on a document.

What follows next is meant to be taken with total seriousness.

🔁 Saying the name twice adds emphasis

📜 It works like an official seal

⚖️ It marks total certainty and weight

➡️ What follows deserves full attention

## 💛 Merciful And Gracious, Longsuffering

"Merciful" means God treats people better than their sin deserves.

"Gracious" means He gives good gifts that were never earned.

"Longsuffering" is an old word meaning patient and slow to anger.

These three words together describe God's steady, patient character.

💛 Merciful means better treatment than deserved

🎁 Gracious means gifts that were never earned

⏳ Longsuffering means patient and slow to anger

📖 Together they describe God's steady character

## 🌊 Abundant In Goodness And Truth

"Abundant" means overflowing, far more than just enough.

God's goodness is not measured out carefully or given sparingly.

"Truth" here means God is completely reliable and never lies.

This exact description gets quoted again and again across the Old Testament.

🌊 Abundant means far more than enough

💧 Goodness pours out without limit

✅ Truth means God is fully reliable

📖 This description repeats throughout the Old Testament

## ⚖️ Forgiving Iniquity And Transgression And Sin

Three separate words for wrongdoing appear together in this one line.

"Iniquity" means a deep, twisted guilt inside a person.

"Transgression" means stepping over a line on purpose.

"Sin" literally means missing the mark, like an arrow that misses its target.

God's forgiveness is described as covering every one of these categories.

⚖️ Iniquity means a deep inner guilt

🚷 Transgression means crossing a line on purpose

🎯 Sin means missing the mark entirely

📖 God's forgiveness covers all three categories

## 🌍 Visiting The Iniquity Of The Fathers Upon The Children

Mercy and justice are named together in the very same breath.

Sin's effects can ripple forward into a family across generations.

This does not mean children are punished for sins they never committed.

Ezekiel chapter eighteen later explains that each person answers for their own sin.

⚖️ Mercy and justice appear together here

👨‍👦 Sin's effects can ripple into future generations

🚫 Children are not blamed for another's sin

📖 Ezekiel eighteen later explains this clearly

## 🙇 Moses Made Haste, And Bowed His Head Toward The Earth

Moses responds the instant he hears God's own description of Himself.

He does not question it or ask for proof first.

Bowing to the ground here is a physical act of worship.

Hearing who God truly is moves Moses to instant reverence.

🙇 Moses responds the instant he hears this

🙏 Bowing shows a physical act of worship

❤️ He asks no question and needs no proof

📖 Hearing God rightly leads to reverence

## 🐂 It Is A Stiffnecked People

"Stiffnecked" pictures an ox that refuses to turn its neck under the yoke.

Moses uses this same word God already used back in chapter thirty two.

He does not hide or soften Israel's stubbornness in this prayer.

Naming the problem honestly becomes the actual basis for his request.

🐂 Stiffnecked pictures an ox resisting the yoke

🔁 Moses repeats God's own earlier word

🗣️ He names Israel's stubbornness honestly

📖 Honesty becomes the basis for his plea

## 🙏 Pardon Our Iniquity, And Take Us For Thine Inheritance

Moses asks God to forgive and to keep Israel as His own possession.

"Inheritance" means something treasured and kept within a family permanently.

He builds this entire plea on the mercy God just proclaimed aloud.

The request is bold, but it rests on what God already said about Himself.

🙏 Moses asks for pardon and belonging

💎 Inheritance means treasured and kept forever

🗣️ The plea rests on God's own words

➡️ God answers by renewing the covenant

# Exodus 34:10-17
# 📜 The Covenant Is Renewed
---
## 🤝 Behold, I Make A Covenant

God formally renews His covenant relationship with Israel here.

This comes right after the golden calf crisis nearly ended everything.

A covenant in this culture is a binding, formal agreement between two parties.

God is choosing to start again instead of walking away.

🤝 God formally renews the covenant here

💥 This follows the golden calf crisis

📜 A covenant is a binding formal agreement

📖 God chooses to restart, not walk away

## 👀 Before All Thy People I Will Do Marvels

God's next work will not happen quietly or in private.

Every person in the whole camp will watch these marvels happen.

Public miracles rebuild public trust after a public failure.

The golden calf failure happened in front of everyone.

So does this restoration.

👀 God's work here happens in full view

🏕️ The whole camp will witness it

💥 The golden calf failure was public too

📖 Public trust is rebuilt in public

## 😮 It Is A Terrible Thing That I Will Do With Thee

"Terrible" in this old English sense means awe inspiring, not simply scary or evil.

God promises to do marvels that have never been done for any other nation.

The whole watching world will see the work of the LORD through Israel.

This is a promise meant to inspire wonder, not fear of harm.

😮 Terrible here means awe inspiring

🌍 No other nation has seen marvels like this

👀 The whole world will witness this work

📖 The promise inspires wonder, not harm

## 🏹 I Drive Out Before Thee The Amorite, And The Canaanite

This same list of nations already appeared back in chapters twenty three and thirty three.

Each name here belongs to a different people group already living in Canaan.

God repeats the promise to clear the land ahead of Israel.

Naming each nation individually makes the promise concrete, not vague.

📜 This list already appeared in chapter twenty three

🗺️ Each name is a real nation in Canaan

🏹 God repeats His promise to clear the land

📖 Naming them makes the promise concrete

## 🔢 The Hittite, And The Perizzite, And The Hivite, And The Jebusite

Six different nations are named here living inside the promised land.

Deuteronomy chapter seven later names a seventh nation added to this same list.

Each nation had its own gods, customs, and cities already built.

God promises to clear all of them out ahead of Israel's arrival.

🔢 Six nations are named in this verse

📜 Deuteronomy seven later adds a seventh

🏙️ Each nation had its own gods and cities

📖 God promises to clear them all out

## 🪤 Lest It Be For A Snare In The Midst Of Thee

A "snare" is a trap, often used for catching wild animals.

Israel is warned against making friendly deals with nations still in the land.

An alliance could quietly become a trap Israel does not even notice.

The real danger is not open war.

It is slow, comfortable compromise.

🪤 A snare is a hidden trap

🤝 Friendly deals with pagan nations are warned against

👀 The danger is easy to miss at first

📖 Slow compromise threatens more than open war

## 🪓 Destroy Their Altars, Break Their Images, Cut Down Their Groves

Three separate objects of pagan worship are named here for destruction.

"Images" means carved idols shaped to represent false gods.

"Groves" refers to wooden poles or trees used in pagan fertility worship.

Israel is told to leave nothing standing that could pull hearts toward these gods.

🪓 Three objects of pagan worship are named

🗿 Images means carved idols of false gods

🌳 Groves means wooden poles used in pagan worship

📖 Nothing pagan is allowed to remain standing

## 💍 The LORD, Whose Name Is Jealous, Is A Jealous God

God's jealousy here is relational, not petty or small minded.

It is closer to the jealousy of a husband who will not share his wife's devotion.

This marriage picture for God's relationship with Israel runs through the rest of the Old Testament.

Hosea later builds an entire book around this exact image.

💍 God's jealousy is relational, like a marriage

🚫 It is not petty or small minded

📜 Hosea builds a whole book on it

📖 This image runs through the Old Testament

## 💔 They Go A Whoring After Their Gods

"Go a whoring" is the KJV's blunt idiom for spiritual unfaithfulness.

It compares worshipping other gods directly to betraying a marriage.

Israel is warned that eating a pagan sacrifice could pull them into that same betrayal.

One shared meal could open the door to a much deeper compromise.

💔 Go a whoring means spiritual unfaithfulness

💍 It compares idolatry to marriage betrayal

🍽️ Sharing a pagan meal risked real compromise

📖 A small door can lead somewhere deeper

## 👨‍👩‍👧 Thou Take Of Their Daughters Unto Thy Sons

Intermarriage with these nations is warned against here specifically.

The concern named is religious influence, not ethnicity or bloodline.

A foreign wife raised in pagan worship could quietly pull sons toward those same gods.

This same warning becomes a very real problem later in Israel's history.

👨‍👩‍👧 Intermarriage is warned against here

🙏 The concern is religious influence, not bloodline

🚸 A pagan upbringing could shape the next generation

📖 This warning becomes real trouble later on

## 🐄 Thou Shalt Make Thee No Molten Gods

This is a direct callback to the exact sin of chapter thirty two.

"Molten" means melted down and poured into a mold, like the golden calf.

Of everything just commanded, this warning is stated most plainly and most briefly.

Its shortness makes it land harder than a longer explanation would.

🐄 This callback points to chapter thirty two

🔥 Molten means melted down and poured

🎯 It is the chapter's plainest warning

📖 Short words can carry the heaviest weight

# Exodus 34:18-21
# 🍞 Unleavened Bread And The Firstborn
---
## 📅 In The Time Of The Month Abib

"Abib" is the old Hebrew name for the first month of their calendar.

It lines up with our March and April, later renamed Nisan.

This month marks the anniversary of Israel's exit from Egypt.

Every year the calendar itself becomes a yearly reminder of that rescue.

📅 Abib is the old first month's name

🌱 It lines up with our March and April

🏃 It marks Israel's escape from Egypt

📖 The calendar itself remembers that rescue

## 🍞 The Feast Of Unleavened Bread Shalt Thou Keep

This feast was first commanded back in chapters twelve and thirteen.

Seven days without leaven recall the hurried, unrisen bread of the exodus.

God restates it here as part of this freshly renewed covenant.

Old commands do not expire just because a new covenant begins.

🍞 This feast was first given in chapter twelve

🏃 It recalls the hurried bread of the exodus

📜 It gets restated in the new covenant

📖 Old commands still stand under the new one

## 👶 All That Openeth The Matrix Is Mine

"Openeth the matrix" is an old phrase meaning the first offspring born from a womb.

Every firstborn male, whether animal or child, belongs to God in a special way.

This law was first given back in chapter thirteen, right after the exodus.

It ties every family permanently back to the night the firstborn of Egypt died instead of Israel's.

👶 Openeth the matrix means firstborn from the womb

🐑 Every firstborn belongs to God specially

📜 This law began back in chapter thirteen

📖 It ties families to Passover night forever

## 🐴 The Firstling Of An Ass Thou Shalt Redeem With A Lamb

A donkey was considered an unclean animal, unlike a sheep or a lamb.

"Redeem" means to buy back or pay a price to release something.

A family could pay with a lamb instead of losing the donkey.

If they refused to pay, the donkey's neck had to be broken instead.

🐴 A donkey counted as an unclean animal

💰 Redeem means to pay a price back

🐑 A lamb could replace the donkey's price

📖 Refusing the price cost the donkey its life

## 🙌 None Shall Appear Before Me Empty

Coming to worship God was never meant to be a one way transaction.

Every worshipper brought something along, a firstborn animal, an offering, or a gift.

Showing up with empty hands would treat God like He needed nothing from them.

Worship here always includes giving something real back.

🙌 Worship always came with something given

🎁 Empty hands were never acceptable here

🤲 Every worshipper brought a real offering

📖 Giving is part of true worship

## 🌾 In Earing Time And In Harvest Thou Shalt Rest

"Earing" is an old word for plowing a field before planting.

Plowing season and harvest season were the two busiest times of the farming year.

Exactly when skipping a rest day would seem most justified, the command still stands.

God builds rest into the calendar even during the most pressured seasons of work.

🌾 Earing is an old word for plowing

📆 Plowing and harvest were the busiest seasons

🛑 Even those seasons do not excuse skipping rest

📖 God builds rest into the busiest weeks

# Exodus 34:22-26
# 🎉 The Full Feast Calendar
---
## 🌾 The Feast Of Weeks, Of The Firstfruits Of Wheat Harvest

This feast celebrates the very first grain cut from the wheat harvest.

It later becomes known as Pentecost, counted fifty days after Passover.

Farmers thank God for the harvest before the rest of it is even gathered in.

Gratitude here comes before the full reward arrives, not after.

🌾 This feast marks the first wheat cut

🔢 It later becomes Pentecost, on day fifty

🙏 Farmers give thanks before the full harvest

📖 Gratitude here comes before the reward

## 🧺 The Feast Of Ingathering At The Year's End

This feast comes at the very end of the harvest season.

It later becomes known as the Feast of Tabernacles, or Sukkot.

Families would live in temporary shelters for a week to remember the wilderness years.

The whole harvest year closes with a celebration, not just quiet relief.

🧺 This feast closes out the harvest year

⛺ It later becomes the Feast of Tabernacles

🏕️ Families lived in shelters for a week

📖 The year ends in celebration, not just relief

## 🚹 Thrice In The Year Shall All Your Menchildren Appear

"Menchildren" means the males of Israel specifically, not the whole family.

Three times a year, every man was required to travel and appear before God.

Women and young children were not required to make this exact journey.

This pilgrimage rhythm shaped the entire yearly calendar for every household.

🚹 Menchildren means the males specifically

🔢 Three trips were required every year

🚶 Women and children were not required to go

📖 This rhythm shaped the whole year

## 🛡️ Neither Shall Any Man Desire Thy Land

Leaving the land undefended three times a year sounds genuinely risky.

God promises here to guard the borders personally during that exact window.

No enemy nation will be tempted to invade during that time.

Every man is away worshipping when this danger would normally be highest.

Obedience to this calendar becomes safe because God Himself stands guard.

🛡️ God personally guards the land during travel

🚶 Every man leaves to worship three times yearly

🚫 No enemy is tempted to invade then

📖 Obedience becomes safe under God's protection

## 🩸 Thou Shalt Not Offer The Blood Of My Sacrifice With Leaven

"Leaven" is a substance like yeast that makes bread rise and puff up.

Leaven often pictured sin or corruption spreading quietly through something pure.

Mixing it into a blood sacrifice would corrupt an offering meant to stay pure.

This same rule already appeared earlier for the Passover sacrifice in chapter twelve.

🩸 This is a blood sacrifice rule

🍞 Leaven pictures corruption spreading quietly

🚫 Leaven could not touch this offering

📖 The same rule covers Passover in chapter twelve

## 🌙 Neither Shall The Sacrifice Of The Feast Of The Passover Be Left Unto The Morning

The Passover sacrifice had to be eaten and finished the very same night.

Leaving meat overnight risked it spoiling or decaying before it could be used.

This rule also protected the offering from being treated carelessly the next day.

Freshness and respect for the sacrifice mattered as much as the ritual itself.

🌙 The sacrifice had to be finished that night

🍖 Leftover meat risked spoiling by morning

🙏 The rule protected the offering from carelessness

📖 Freshness mattered as much as ritual

## 🌱 The First Of The Firstfruits Of Thy Land

"Firstfruits" means the very first crops gathered from a harvest.

Bringing the first and best portion to God came before anyone kept the rest for themselves.

This act placed trust in God for the harvest still to come.

Giving first, not last, is the whole point of a firstfruits offering.

🌱 Firstfruits means the very first crops

🎁 The best portion went to God first

🙏 This showed trust in the harvest ahead

📖 Giving first is the whole point

## 🐐 Thou Shalt Not Seethe A Kid In His Mother's Milk

"Seethe" is an old word meaning to boil or cook in liquid.

A "kid" here means a young goat, not a child.

This law likely rejected a specific pagan fertility ritual practiced by Canaan's neighbors.

The chapter closes this list with one more clear line drawn against pagan custom.

🐐 Kid here means a young goat

🍲 Seethe means to boil in liquid

🚫 This likely rejected a pagan fertility ritual

📖 It draws one more line against pagan custom

# Exodus 34:27-28
# ✍️ Moses Writes For Forty Days
---
## 📝 Write Thou These Words

This time God commands Moses himself to do the writing.

The first tablets were written directly by God's own finger back in chapter thirty one.

Moses now becomes the human scribe carrying God's covenant forward.

The words are still fully God's, even though the hand doing the writing has changed.

📝 Moses himself is told to write this time

✍️ The first tablets were written by God's finger

📜 Moses becomes the covenant's human scribe

📖 The words remain fully God's own

## 📖 After The Tenor Of These Words

"Tenor" is an old word meaning the substance or general sense of what was said.

The covenant is based on the whole meaning of God's words, not just the exact letters.

This phrase ties the covenant directly to everything just spoken in this chapter.

Nothing here is a brand new agreement starting from scratch.

📖 Tenor means the substance of what was said

📜 The covenant follows the full meaning spoken

🔗 It ties directly to this chapter's words

➡️ This renews the covenant, not replaces it

## 🍽️ Neither Eat Bread, Nor Drink Water

Moses fasts completely for a second forty day stretch on this mountain.

The first forty days already happened back across chapters twenty four through thirty one.

No bread and no water for this entire time is a severe physical fast.

God sustains Moses through this stretch in a way food and water normally would.

🍽️ Moses fasts completely for forty days again

📜 The first fast already happened earlier

💪 No food and no water the entire time

📖 God sustains Moses beyond normal human limits

## 🔟 He Wrote Upon The Tables The Words Of The Covenant, The Ten Commandments

"The ten commandments" is literally "the ten words" in the original Hebrew.

These are the same core laws given the first time, back in chapter twenty.

Now they get written a second time onto these new, replacement stones.

The covenant's content never actually changed, only the stones carrying it did.

🔟 Ten commandments literally means ten words

📜 These are the same laws from chapter twenty

🪨 They are written onto new replacement stones

📖 The covenant's content never actually changed

# Exodus 34:29-35
# ✨ Moses' Shining Face
---
## 😮 Moses Wist Not That The Skin Of His Face Shone

"Wist not" comes from the old verb "wit," meaning to know.

Moses genuinely did not realize his own face had begun to glow.

Time spent close to God's presence left a visible mark on him.

The change was obvious to everyone except Moses himself.

😮 Wist not means did not know

✨ Moses had no idea his face glowed

⛰️ Closeness with God left a visible mark

📖 Everyone but Moses could see the change

## 📜 The Two Tables Of Testimony In Moses' Hand

"Testimony" here means a formal witness document, like a signed legal agreement.

These stone tablets serve as physical proof of the covenant God just renewed.

Moses carries this proof down the mountain along with his glowing face.

Both the tablets and his face now testify to what happened up there.

📜 Testimony means a formal witness document

🪨 The tablets are physical proof of the covenant

⬇️ Moses carries them down the mountain

📖 His face and the tablets both testify

## 😨 They Were Afraid To Come Nigh Him

"Nigh" is an old word meaning near.

The same people who kept their distance back in chapter thirty three now fear their own leader.

A glowing face becomes physical proof of real closeness to God.

Fear here comes from awe, not from any danger Moses poses.

😨 Nigh means near

✨ A glowing face proves closeness to God

🙅 The fear comes from awe, not danger

📖 This echoes chapter thirty three's distance

## 📢 Moses Called Unto Them

Moses takes the first step instead of waiting for the fear to pass.

He calls Aaron and the leaders of the community back toward him.

Someone has to close the distance the people are too afraid to cross.

Moses chooses to be that someone himself.

📢 Moses takes the first step himself

🗣️ He calls Aaron and the leaders back

🚶 Someone had to close the distance

📖 Moses chooses to be that someone

## 📜 He Gave Them In Commandment All That The LORD Had Spoken

Once the leaders return, Moses delivers everything he just received on the mountain.

Nothing from this long, dense chapter gets left out or softened.

The people finally receive the covenant, the laws, and the warnings all at once.

Moses' shining face becomes the visible proof behind every word he now speaks.

📜 Moses delivers everything from the mountain

🚫 Nothing gets left out or softened

👂 The people finally hear it all

📖 His glowing face backs up every word

## 🧕 He Put A Vail On His Face

"Vail" is the old spelling of veil, a cloth covering for the face.

Moses covers his face only after he finishes speaking to the people.

This detail matters, since the order is about to reverse in the next verse.

A veil worn at the wrong moment would mean something completely different.

🧕 Vail is the old spelling of veil

⏱️ Moses veils his face after speaking, not before

🔄 The order here is about to reverse

📖 Timing changes what the veil means

## 🔓 When Moses Went In Before The LORD, He Took The Vail Off

The pattern here reverses ordinary expectation completely.

Moses uncovers his face to speak with God, not to speak with people.

He only veils himself again once he steps back out to the camp.

The apostle Paul later reflects at length on this exact veil in Second Corinthians chapter three.

🔓 Moses uncovers his face before God

🙈 He veils it again for the people

🔄 This reverses what most would expect

📖 Paul reflects on this veil in Second Corinthians

## 🔁 Moses Put The Vail Upon His Face Again

This closing verse locks in a rhythm that repeats for the rest of Moses' ministry.

Unveiled before God, veiled before the people, every single time he returns.

The pattern becomes so routine that it needs no more explanation after this.

Moses' new normal is shaped entirely by what happened on this mountain.

🔁 This rhythm repeats for Moses' whole ministry

👐 Unveiled before God, veiled before the people

🔂 The pattern becomes Moses' new routine

📖 One mountain visit reshapes his whole life
`.trim();

export const EXODUS_THIRTY_FOUR_PERSONAL_SECTIONS = parseExodusThirtyFourRawNotes(EXODUS_THIRTY_FOUR_RAW_NOTES);
