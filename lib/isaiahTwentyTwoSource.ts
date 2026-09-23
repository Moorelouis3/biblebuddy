export type IsaiahTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahTwentyTwoRawNotes(rawText: string): IsaiahTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 22:${startVerse}` : `Isaiah 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Isaiah 22 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_TWENTY_TWO_RAW_NOTES = `# Isaiah 22:1-2
# 🏙️ What Aileth Thee That Thou Art Wholly Gone Up To The Housetops
---
## 📜 The Burden Of The Valley Of Vision

"Burden" means a message of judgment, a word used to open other chapters near this one.

"Valley of vision" is an unusual name for Jerusalem.

Jerusalem sat high on hills, not down in a valley.

Many scholars believe the name points to Jerusalem as the place where God's prophets received their visions.

This time the vision is not about a distant enemy nation.

It is about Jerusalem itself.

📜 Burden means a message of judgment
🏙️ Valley of vision is a name for Jerusalem
⛰️ Jerusalem actually sat high on hills
📖 This judgment now targets God's own city

---
## 🏠 Wholly Gone Up To The Housetops

Houses in Jerusalem had flat roofs, not sloped ones like most modern homes.

People used the roof as an extra room for sleeping, working, and gathering.

Here the whole city has rushed up onto their roofs at once.

They are not doing chores up there.

They are craning to see danger, or celebrating that it seems to have passed.

Either way, the entire city is in an uproar.

🏠 Roofs were used as an extra room
🏙️ The whole city crowded onto them
👀 They are watching for danger or celebrating
📖 Jerusalem is in total uproar

---
## ⚔️ Thy Slain Men Are Not Slain With The Sword

This sounds confusing at first.

If they are slain, why were they not killed by the sword?

The point is that many people did not die fighting bravely in battle.

They died from panic, hunger, disease, or the chaos of a city under siege.

That kind of death carries no honor.

It is simply loss, made worse by fear.

⚔️ These deaths did not happen in battle
😨 Panic and siege conditions killed many instead
💔 That kind of death carries no honor
📖 Fear made the loss even worse

# Isaiah 22:3-4
# 🏃 All Thy Rulers Are Fled Together
---
## 🏃 All Thy Rulers Are Fled Together

Jerusalem's own leaders ran rather than stay and defend the city.

That detail alone reveals how bad the danger really was.

Leaders were expected to be the last to run, not the first.

Their flight left the people without the protection they should have had.

🏃 Jerusalem's leaders fled instead of defending it
👑 Leaders were expected to stay, not run
🛡️ The people were left unprotected
📖 Their flight shows how severe the danger was

---
## 🏹 Bound By The Archers

Fleeing did not save these rulers.

They were captured anyway, without even the honor of dying in a fight.

Archers were long range fighters, able to catch fleeing men from a distance.

Running from danger could not undo the shame of a leader who left his post.

🏹 Archers could capture men who fled
🔗 The rulers were caught despite running
🚫 They never even fought back
📖 Running did not erase the shame

---
## 😭 I Will Weep Bitterly

Isaiah steps out of describing the vision and speaks in his own voice.

He begs to be left alone instead of comforted.

"The daughter of my people" is a tender name Isaiah uses for Judah, like calling a nation his own child.

This is not distant prophecy for Isaiah.

It is personal grief over people he loves.

😭 Isaiah asks to be left alone
💬 Daughter of my people is a tender name
❤️ Isaiah speaks of Judah like his own child
📖 This grief is personal, not distant

# Isaiah 22:5-7
# ⚔️ A Day Of Trouble In The Valley Of Vision
---
## 😵 A Day Of Trouble And Of Treading Down

"Treading down" pictures something trampled underfoot by an invading army.

"Perplexity" means total confusion, not knowing which way to turn.

Several heavy words are stacked together here on purpose.

Hebrew poetry often piles up similar words to make a moment feel heavier.

This is not an ordinary bad day.

It is chaos on every side at once.

😵 Treading down means being trampled
🌀 Perplexity means total confusion
🔁 Stacked words show the weight of the moment
📖 This is chaos on every side

---
## ⛰️ Breaking Down The Walls And Of Crying To The Mountains

Jerusalem's walls were its main protection against an attacking army.

Here those same walls are being broken down instead of defended.

"Crying to the mountains" pictures people shouting in desperation, with nowhere else to turn.

The very hills that once felt safe now only echo their cries back.

⛰️ Walls meant to protect are being broken
📢 Crying to the mountains shows desperation
🔇 The hills only echo their cries
📖 There is nowhere left to turn

---
## 🐪 Elam Bare The Quiver And Kir Uncovered The Shield

Elam and Kir were both real nations, tied to the empire now attacking Judah.

Elam was known across the ancient world for skilled archers, the same nation named back in Isaiah 21.

Kir is later named in 2 Kings as a place Israelites were exiled to by Assyria.

Both nations are shown here fully armed and ready for war.

🏹 Elam was famous for skilled archers
🛡️ Kir also appears connected to Assyria
🌍 Both nations arrive armed for war
📖 Elam already threatened Babylon back in Isaiah 21

---
## 🐎 Thy Choicest Valleys Shall Be Full Of Chariots

"Choicest valleys" were the best farmland surrounding Jerusalem, the most fertile ground.

Instead of crops, those valleys are about to be packed with war chariots.

The very land that fed the city becomes the staging ground for its enemies.

Even the main gate will be surrounded by horsemen.

🌾 Choicest valleys were Jerusalem's best farmland
🐎 Chariots fill that fertile ground instead
🚪 Horsemen gather even at the main gate
📖 The land that fed them now threatens them

# Isaiah 22:8-11
# 🛡️ They Looked To Weapons Instead Of The Maker
---
## 🛡️ He Discovered The Covering Of Judah

"Discovered" here is an old word meaning uncovered or exposed, not found something new.

Judah's last layer of protection has been stripped away.

Every defense the people once relied on now stands exposed to the enemy.

There is nothing left hidden or held in reserve.

🛡️ Discovered means uncovered or exposed
🚨 Judah's last protection is stripped away
👀 Every defense now stands exposed
📖 Nothing is left in reserve

---
## 🏹 The Armour Of The House Of The Forest

"The house of the forest" was a real building in Jerusalem built by Solomon.

It was named for its rows of cedar pillars.

It functioned as a royal armory, storing weapons and shields for the kingdom.

In this crisis, the people rush there to arm themselves for battle.

Even Solomon's grand building has been reduced to a weapons store in an emergency.

🌲 The house of the forest was Solomon's building
🪵 It was named for its cedar pillars
🏹 It stored weapons as a royal armory
📖 Even a grand building becomes a weapons store

---
## 💧 Ye Gathered Together The Waters Of The Lower Pool

A city under siege could not survive without a secure water supply.

The lower pool was an existing reservoir inside or near Jerusalem's walls.

The people worked to gather and secure that water before the attack came.

This detail matches the real defensive projects carried out under King Hezekiah.

💧 A secure water supply was critical
🏊 The lower pool was an existing reservoir
🔧 The people rushed to secure it
📖 This matches Hezekiah's real defensive projects

---
## 🙏 Ye Have Not Looked Unto The Maker Thereof

After all that frantic building and engineering, this line lands the real point.

The people poured their energy into walls, weapons, and water systems.

They never once turned to God, the one who actually designed Jerusalem long ago.

Human skill and effort are not condemned here.

Trusting only in human skill while ignoring God is the real failure.

🔧 The people trusted their own engineering
🙏 They never turned to God in the crisis
🏙️ God is the true maker of Jerusalem
📖 Skill without trust in God falls short

# Isaiah 22:12-14
# 😢 Called To Weeping But Found Feasting
---
## 🪒 Call To Weeping And To Baldness And To Girding With Sackcloth

God, not just Isaiah, is the one calling the city to respond this way.

Baldness here means shaving the head, an old sign of mourning and grief.

Sackcloth was a rough, uncomfortable cloth worn instead of normal clothing during mourning.

Together these customs formed the ancient equivalent of a full, public season of repentance.

🪒 Baldness meant shaving the head in grief
🧵 Sackcloth was rough mourning clothing
😢 God himself calls for this response
📖 This was meant to be public repentance

---
## 🍷 Let Us Eat And Drink For Tomorrow We Shall Die

Instead of mourning, the people threw a feast.

This line captures a reckless, fatalistic mood, deciding that pleasure now is all that matters.

The apostle Paul later quotes this same line in 1 Corinthians, describing a life with no hope beyond this world.

Jerusalem chose a party over turning back to God.

🍷 The people feasted instead of mourning
🎉 The attitude was reckless and fatalistic
📜 Paul later quotes this same line
📖 They chose a party over repentance

---
## ⚖️ This Iniquity Shall Not Be Purged

"Iniquity" means guilt, the weight of wrongdoing that needs to be dealt with.

"Purged" means cleansed or removed.

God had opened a door for the people to repent, and they threw a party instead.

Because that chance was refused, this specific guilt would not be forgiven before they died.

This is one of the more severe judgments in the whole book.

⚖️ Iniquity means the guilt of wrongdoing
🧼 Purged means cleansed or removed
🚪 God's door for repentance was ignored
📖 This is a uniquely severe judgment

# Isaiah 22:15-19
# ⚰️ The Burden Against Shebna
---
## 💰 Go Get Thee Unto This Treasurer Even Unto Shebna

Shebna was a real official in King Hezekiah's court, treasurer over the palace.

A treasurer in this role managed the king's household, finances, and staff.

This was one of the highest positions a person outside the royal family could hold.

God now sends Isaiah to confront this powerful man directly by name.

💰 Shebna managed the king's household as treasurer
👑 This was one of the highest court roles
🎯 God confronts him directly, by name
📖 Even top officials are not beyond judgment

---
## ⛏️ Hewed Thee Out A Sepulchre Here

A sepulchre is a tomb, often carved directly into solid rock.

Wealthy and powerful people in this culture built elaborate tombs, sometimes cut high on a hillside for everyone to see.

Shebna was building himself this kind of visible, expensive monument.

The prophecy questions why a royal servant would spend himself on his own glory this way.

⛏️ A sepulchre is a rock cut tomb
👀 The wealthy built tombs meant to be seen
💔 Shebna was building his own monument
📖 God questions this self made glory

---
## 🏐 Toss Thee Like A Ball Into A Large Country

This pictures Shebna thrown away carelessly, the way someone might toss a ball with no thought where it lands.

He will not die peacefully in the tomb he built for himself.

Instead he will be carried off into a distant land, far from the grave he prepared.

The very glory he tried to secure becomes the shame of his household.

🏐 Shebna is tossed away like a ball
🌍 He is carried into a distant land
⚰️ He never reaches the tomb he built
📖 His planned glory becomes his shame

---
## 🚪 I Will Drive Thee From Thy Station

"Station" here means his official position, his place of authority in the palace.

God directly removes Shebna from the powerful role he had held.

No human office is permanent once God decides to end it.

The very position Shebna used to build his own name is taken away.

🚪 Station means his official position
✋ God directly removes him from power
⏳ No office is permanent before God
📖 The role he used for himself is taken

# Isaiah 22:20-23
# 🔑 Eliakim And The Key Of The House Of David
---
## 📣 I Will Call My Servant Eliakim

Eliakim is introduced by name as the man who will replace Shebna.

He is called "my servant," a title of honor used elsewhere for people God trusts with real responsibility.

His father Hilkiah is also named, grounding him as a real, specific person.

God is already preparing the replacement before Shebna is even removed.

📣 Eliakim will replace Shebna
🏅 My servant is a title of honor
👨 His father Hilkiah is named too
📖 God prepares the replacement in advance

---
## 👘 Clothe Him With Thy Robe And Strengthen Him With Thy Girdle

Putting on the robe and girdle was a formal ceremony, not just getting dressed.

The girdle was a wide sash worn at the waist, often holding tools or a weapon.

Together these actions installed Eliakim into Shebna's former office in public view.

Shebna's own clothing of office is literally transferred onto Eliakim.

👘 The robe and girdle marked a formal ceremony
🎗️ The girdle was a wide waist sash
🎭 Eliakim is publicly installed into the role
📖 Shebna's own office passes to Eliakim

---
## 🔑 The Key Of The House Of David

Keys in this culture were often large and carried over the shoulder, not hidden in a pocket.

Whoever held the key controlled access, deciding who could enter and who could not.

This key represents complete administrative authority over the king's house.

Revelation later reuses this exact image for Jesus, calling him the one who holds the key of David.

🔑 Keys were large and carried on the shoulder
🚪 The key holder controlled all access
👑 It represents total administrative authority
📖 Revelation later applies this image to Jesus

---
## 📌 A Nail In A Sure Place

A nail here means a strong peg fixed firmly into a wall, not a small metal fastener.

Households hung baskets, tools, and other items on a peg like this.

Calling Eliakim a nail in a sure place means he is now a dependable point of support.

People and responsibilities can safely be hung on someone this secure.

📌 A nail here means a strong wall peg
🧺 Households hung items on pegs like this
🏛️ Eliakim becomes a fixed point of support
📖 People can now safely depend on him

# Isaiah 22:24-25
# ⚖️ The Nail That Bore Too Much Weight
---
## 🏺 All The Glory Of His Father's House Shall Hang Upon Him

Once Eliakim is established as a secure peg, everyone begins hanging their hopes on him.

"His father's house" means his whole extended family, not just his immediate household.

Every relative and every responsibility connected to that family now depends on his position.

One person is being asked to carry an enormous amount of weight.

🏺 Everyone hangs their hopes on Eliakim
👨‍👩‍👧 His father's house means his whole family
⚖️ All of it now depends on him
📖 One man carries an enormous load

---
## 🍶 Vessels Of Small Quantity Even To The Vessels Of Flagons

This line pictures a peg loaded with everything from tiny cups to flagons, a much bigger jar used for wine.

Nothing was left off the peg, from the smallest item to the largest.

The image shows just how much was eventually expected of Eliakim, down to the smallest detail.

Even a strong peg has a limit to what it can hold.

🍶 Flagons were large jars, unlike small cups
🪝 Every size of item hung on the peg
📈 Expectations grew from small to large
📖 Even a strong peg has a limit

---
## 💥 The Nail Shall Be Removed And Be Cut Down And Fall

Eventually, even this secure peg gives way under everything hung on it.

"Cut down" and "fall" describe a complete, sudden collapse, not a slow loosening.

Everything that depended on that one peg falls down with it.

The chapter closes with a warning that no human support can bear unlimited weight forever.

Only God is a support that never fails.

💥 Even a secure peg eventually gives way
📉 The fall is sudden, not gradual
🏺 Everything hung on it falls too
📖 Only God never fails as a support
`.trim();

export const ISAIAH_TWENTY_TWO_PERSONAL_SECTIONS = parseIsaiahTwentyTwoRawNotes(ISAIAH_TWENTY_TWO_RAW_NOTES);
