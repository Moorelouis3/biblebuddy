export type NahumOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNahumOneRawNotes(rawText: string): NahumOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NahumOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Nahum\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Nahum 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Nahum\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Nahum\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Nahum 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Nahum 1:${startVerse}` : `Nahum 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Nahum 1 sections, received " + sections.length);
  }

  return sections;
}

const NAHUM_ONE_RAW_NOTES = `# Nahum 1:1-3
# 🔥 God Is Jealous And The LORD Revengeth
---
## 📜 The Burden Of Nineveh

This does not mean a heavy box or sack Nineveh had to carry.

In prophetic books a burden means a weighty message of coming judgment.

Nineveh was the capital city of the mighty Assyrian empire.

Assyria had already crushed the northern kingdom of Israel years earlier.

This title warns that Nineveh's own turn for judgment has arrived.

📜 Burden means a weighty judgment message

🏛️ Nineveh was Assyria's capital city

⚔️ Assyria had already crushed Israel

📖 Nineveh's own judgment has arrived
---
## 🗺️ Nahum The Elkoshite

Elkoshite tells the reader where Nahum the prophet was from.

Many scholars are honestly unsure exactly where Elkosh was located.

Prophets are sometimes introduced by a hometown instead of a family line.

Nahum's own name is the one certain detail given here.

This short introduction lets the LORD's own words take center stage.

🗺️ Elkoshite names Nahum's hometown

❓ Elkosh's exact location is unknown

👤 A hometown can replace a family line

📖 The focus shifts straight to God's words
---
## ⚖️ The LORD Revengeth

Revengeth means God personally repays wrong with real justice.

This is not an angry outburst or a loss of control.

It describes God defending his own holiness and keeping his word.

Furious here carries that same settled, righteous intensity.

God's anger in this verse is controlled, not reckless.

⚖️ Revengeth means repaying wrong with justice

🙅 This is not reckless anger

🛡️ God defends his own holiness

📖 His anger here is controlled, not wild
---
## 🗄️ He Reserveth Wrath For His Enemies

Reserveth means God is keeping something in store, not forgetting it.

This is not God losing his temper suddenly.

It pictures wrath held back on purpose until the right moment.

Enemies here means those who have set themselves against God himself.

Delayed judgment is not the same as cancelled judgment.

🗄️ Reserveth means kept in store on purpose

⏳ Wrath is held back until the right time

😤 Enemies means those opposed to God

📖 Delayed judgment is not cancelled judgment
---
## 🐢 Slow To Anger

This looks like a contradiction right after the verses about fury.

Slow to anger means genuinely patient toward people.

It does not mean indifferent or uninterested.

God held back from judging Nineveh for generations.

Patience finally reached its appointed end.

🐢 Slow to anger means genuinely patient

🙅 Patient does not mean indifferent

⏳ God waited generations over Nineveh

📖 Patience finally reached its end
---
## 🌪️ His Way In The Whirlwind And In The Storm

The whirlwind and storm picture overwhelming, uncontrollable force.

No army could outrun or outlast a storm like this.

God is not caught inside the chaos, he controls it completely.

Nature itself becomes a messenger carrying out his will.

Nothing about his power depends on favorable conditions.

🌪️ Whirlwind and storm picture overwhelming force

🏃 No army can outlast a storm

🎯 God controls the storm completely

📖 Nature itself obeys God's will
---
## 👣 The Clouds Are The Dust Of His Feet

This pictures God as impossibly large, with storm clouds trailing behind him.

Dust kicked up by ordinary footsteps is small and light.

Comparing entire clouds to that dust shows a truly massive scale.

The image is poetic, not a literal description of God's actual size.

It places Nineveh's coming judgment on a cosmic scale.

👣 Clouds pictured as dust from his stride

📏 Ordinary dust is small and light

🌩️ The comparison shows massive, overwhelming scale

📖 Judgment here is pictured on a cosmic scale
# Nahum 1:4-6
# 🌍 The Earth Is Burned At His Presence
---
## 🌊 He Rebuketh The Sea

This recalls God drying up the sea for Israel at the exodus.

Rebuketh means he speaks and the sea itself obeys instantly.

The same power once used to save Israel now threatens Nineveh.

No force of nature stands outside his command.

This is the same God, acting in two very different directions.

🌊 Rebuketh means the sea obeys instantly

🚶 This recalls the exodus sea crossing

⚔️ The same power now threatens Nineveh

📖 One God, two very different directions
---
## 🌿 The Flower Of Lebanon Languisheth

Bashan, Carmel, and Lebanon were three of the most fertile regions.

Carmel's own name was used to describe lush, abundant land.

Languisheth means these rich places wither and lose their life.

If the richest regions can dry up, no place is safe from this.

God's power reaches the best land, not only the weakest.

🌿 Bashan, Carmel, Lebanon were fertile regions

🏔️ Carmel's name meant lush abundant land

🥀 Languisheth means withering and losing life

📖 Even the richest land cannot escape
---
## 🏔️ The Mountains Quake At Him

Mountains and hills were the most permanent things ancient people knew.

Quake and melt describe that permanence failing in God's presence.

Earth burned at his presence pictures scorching, total devastation.

The phrase widens this devastation to the whole world.

Nothing solid in creation is sturdy enough to resist him.

🏔️ Mountains were the most permanent things known

🔥 Quake and melt show total devastation

🌍 This widens to the whole world

📖 Nothing in creation can resist him
---
## ❓ Who Can Stand Before His Indignation

This question is not really asking for an answer.

It is a rhetorical way of saying the honest answer is no one.

Indignation and fierceness both describe the same righteous anger from verse two.

Fury poured out like fire pictures judgment with no limit.

Rocks thrown down shows even solid stone cannot hold against it.

❓ This question expects the answer no one

🔥 Fury like fire pictures limitless judgment

🪨 Rocks thrown down shows nothing holds

📖 Indignation here echoes verse two's anger
---
## 💨 His Fury Is Poured Out Like Fire

Poured out pictures a flood of fire, not a single spark.

Fire spreads and consumes everything in its path quickly.

This image intensifies the mountain and hill pictures already given.

Judgment here is active, moving, and impossible to contain.

Nineveh has still not been named directly here.

💨 Poured out pictures a flood of fire

🔥 Fire spreads and consumes quickly

📈 This intensifies the mountain images already given

📖 Judgment here cannot be contained
# Nahum 1:7-8
# 🏰 A Strong Hold In The Day Of Trouble
---
## 🌤️ The LORD Is Good

This sentence shifts the chapter's tone for the very first time.

God's goodness is not in tension with the judgment just described.

A strong hold means a safe fortress people run to in danger.

Goodness and judgment both describe the same God from two sides.

Which side a person experiences depends on their relationship with him.

🌤️ This is the chapter's first tone shift

🏰 A strong hold means a safe fortress

⚖️ Goodness and judgment are two sides of God

📖 Which side depends on trusting him
---
## 👁️ He Knoweth Them That Trust In Him

Knoweth here means far more than simple awareness of someone existing.

It describes a close, personal, caring relationship.

God already knows the names of everyone who trusts him.

This same God is about to bring devastating judgment on Nineveh.

Knowing him personally decides which side of this chapter a person is on.

👁️ Knoweth means personal, caring relationship

🙋 More than just being aware someone exists

🛡️ This decides which side a person is on

📖 Trusting him matters more than ever here
---
## 🌊 An Overrunning Flood

Ancient historians record that Nineveh's walls finally fell during a flood.

A sudden flood breached the city's defenses from the Tigris River.

This verse pictures that exact future event centuries ahead of time.

Utter end means complete destruction, with nothing left to rebuild.

Prophecy and history line up here in a striking way.

🌊 An actual flood later breached Nineveh's walls

🏛️ The Tigris River fed that historic flood

💥 Utter end means complete destruction

📖 Prophecy and history line up here
---
## 🌑 Darkness Shall Pursue His Enemies

This darkness is not simply the sun going down for the night.

Pursue pictures judgment actively chasing enemies down, not waiting passively.

There would be no safe place to outrun this kind of darkness.

The overrunning flood already destroyed the city itself.

This darkness closes in on anyone who manages to escape it.

🌑 This darkness is not simple nightfall

🏃 Pursue means judgment actively chasing enemies

🚫 No safe place to outrun it

📖 Even escapees cannot outrun this darkness
# Nahum 1:9-11
# 🌾 They Shall Be Devoured As Stubble Fully Dry
---
## 🎯 What Do Ye Imagine Against The LORD

Ye here refers to Nineveh and its leaders plotting against God's people.

Imagine means actively scheming, not simply wondering or daydreaming.

The question exposes how pointless that scheming really is.

No plan against the LORD has ever actually succeeded.

This sets up the certain outcome named in the rest of the verse.

🎯 Ye refers to Nineveh's own leaders

🧠 Imagine means actively scheming, not wondering

🚫 No plan against God has ever worked

📖 This sets up the verse's certain outcome
---
## 🔁 Affliction Shall Not Rise Up The Second Time

This likely promises that Assyria's threat will not return a second time.

Judah had already survived one terrifying siege from Assyria before this book.

Hezekiah's siege in 2 Kings 19 describes that earlier threat.

This time the destruction would be final and complete.

One ending here replaces the fear of repeated danger.

🔁 This promises no second round of trouble

🏰 Judah already survived Assyria's earlier siege

📜 2 Kings 19 records that earlier threat

📖 This destruction would be final, not repeated
---
## 🌿 Folden Together As Thorns

Folden together pictures thorns tangled into one thick, dangerous looking mass.

Despite that tangled strength, thorns burn away almost instantly in fire.

Drunken here pictures Nineveh's leaders as careless and overconfident.

Stubble fully dry means dead plant stalks that catch fire instantly.

Looking strong and tangled does not make something fireproof.

🌿 Folden together pictures tangled, thick thorns

🔥 Tangled thorns still burn away instantly

🍷 Drunken pictures careless overconfidence

📖 Looking strong does not make it fireproof
---
## 😈 A Wicked Counsellor

One come out of thee points to a specific leader from Nineveh.

Many scholars believe this names an Assyrian king like Sennacherib.

Counsellor here does not mean a wise, trusted advisor.

It describes someone who deliberately plans evil against God's people.

His own plans are about to collapse on him.

👤 This points to one specific Assyrian leader

📜 Many scholars connect this to Sennacherib

😈 Counsellor here means a planner of evil

📖 His own plans are about to collapse
# Nahum 1:12-13
# ⏳ When He Shall Pass Through
---
## 🏛️ Yet Thus Shall They Be Cut Down

They here refers back to Nineveh and its seemingly unstoppable army.

Quiet and many describe a nation feeling calm, secure, and strong.

None of that calm or size will matter when judgment arrives.

Pass through describes God moving through to execute this sentence himself.

Feeling safe is not the same as actually being safe.

🏛️ They refers to Nineveh's army

😌 Quiet and many describe false security

🚶 Pass through means God executing judgment

📖 Feeling safe is not being safe
---
## 🔄 I Will Afflict Thee No More

Thee suddenly shifts from Nineveh to Judah, God's own people.

This same chapter has judged one nation and now comforts another.

Afflicted here points back to real suffering Judah had already endured.

No more promises an end date to that specific suffering.

God's judgment on Nineveh and his comfort for Judah come from the same act.

🔄 Thee shifts from Nineveh to Judah

😣 Afflicted recalls suffering Judah endured

⏳ No more promises it will end

📖 Judgment and comfort come from one act
---
## 🐂 I Will Break His Yoke From Off Thee

A yoke was a heavy wooden frame placed on an ox's neck.

It forced the animal to work under someone else's control.

Judah had lived under Assyria's yoke of forced tribute and fear.

Breaking that yoke pictures real freedom, not a small improvement.

His here refers to the wicked counsellor named just before.

🐂 A yoke forced an ox to work

⛓️ Judah lived under Assyria's forced control

💔 Breaking it pictures real freedom

📖 His points back to the wicked counsellor
---
## ✂️ Will Burst Thy Bonds In Sunder

In sunder means split completely apart, not loosened slightly.

Bonds here pictures the ropes or chains of a captive nation.

This image pairs with the yoke from earlier in the same verse.

Both pictures describe total, not partial, liberation.

Nineveh's grip on Judah is about to end for good.

✂️ In sunder means split completely apart

⛓️ Bonds pictures a captive nation's chains

🤝 This pairs with the yoke image

📖 This liberation is total, not partial
# Nahum 1:14-15
# 👣 Behold Upon The Mountains
---
## 🌱 That No More Of Thy Name Be Sown

Thee here shifts back to Nineveh, now addressed directly again.

Sown pictures a family name planted like seed to grow future generations.

No more of thy name sown means this royal line ends completely.

Nineveh's own dynasty would not continue past this judgment.

The empire that outlived Israel's kings would not outlive this sentence.

🔄 Thee shifts back to Nineveh here

🌱 Sown pictures a family name planted forward

👑 This ends Nineveh's royal line completely

📖 This empire would not outlive this verdict
---
## 🪵 The Graven Image And The Molten Image

A graven image is an idol carved out of wood or stone.

A molten image is an idol cast from melted metal instead.

Assyria worshipped many gods through idols exactly like these.

God promises to personally destroy the very objects Nineveh trusted.

Even their own gods could not protect them from this.

🪵 Graven means carved from wood or stone

🔥 Molten means cast from melted metal

🏛️ Assyria worshipped many gods like these

📖 Their own gods could not protect them
---
## 🤢 For Thou Art Vile

Vile here means worthless and morally corrupt, not simply unpleasant.

Making a grave pictures total, final defeat, not ongoing rule.

This closes the direct judgment section addressed to Nineveh.

Everything built on that corruption would be buried with it.

The chapter now turns completely toward hope for Judah instead.

🤢 Vile means worthless and corrupt

⚰️ A grave pictures total, final defeat

🔚 This closes Nineveh's judgment section

📖 The chapter now turns toward Judah's hope
---
## 🏃 The Feet Of Him That Bringeth Good Tidings

Messengers in the ancient world ran ahead on foot with news.

Seeing feet on the mountains meant a messenger was finally visible.

Good tidings means welcome news, specifically that Nineveh's threat had ended.

Isaiah and Paul in Romans later reuse this exact picture for the gospel.

The same image fits both a political relief and a spiritual one.

🏃 Messengers ran ahead with battle news

👣 Feet on the mountains meant news was near

🕊️ Good tidings means Nineveh's threat had ended

📖 Isaiah and Romans reuse this same picture
---
## 📅 Keep Thy Solemn Feasts

Solemn feasts were Judah's regular, scheduled worship festivals.

The ongoing threat from Assyria had likely disrupted that normal worship.

Vows here means promises made to God, often during real danger.

With the threat finally gone, Judah could return to normal worship fully.

Relief from danger and renewed worship arrive in the same verse.

📅 Solemn feasts were scheduled worship festivals

⚠️ Assyria's threat had disrupted that worship

🙏 Vows means promises made during danger

📖 Relief and renewed worship arrive together
---
## 🔚 He Is Utterly Cut Off

This final line names Nineveh's ending with complete certainty.

Utterly cut off leaves no room for a partial recovery.

The wicked counsellor named back in verse eleven meets his end here.

Chapter one moves from announcing judgment to guaranteeing its completion.

The rest of the book will describe exactly how this happens.

🔚 This line names Nineveh's certain ending

🚫 Utterly cut off allows no partial recovery

👤 The wicked counsellor's end arrives here

📖 The rest of the book shows how
`.trim();

export const NAHUM_ONE_PERSONAL_SECTIONS = parseNahumOneRawNotes(NAHUM_ONE_RAW_NOTES);
