export type JeremiahThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahThirteenRawNotes(rawText: string): JeremiahThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 13:${startVerse}` : `Jeremiah 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Jeremiah 13 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_THIRTEEN_RAW_NOTES = `# Jeremiah 13:1-7
# 🪢 Go And Get Thee A Linen Girdle
---
## 🪢 Go And Get Thee A Linen Girdle

A girdle here means a long strip of cloth worn snug against the skin.

It sat closer to the body than any outer robe or coat.

God gives Jeremiah a strange, physical assignment instead of only words to speak.

The whole chapter grows out of this one small object.

🪢 Girdle means a snug inner waistband
👕 Worn closer than any outer robe
📦 God assigns an object, not just words
📖 One small object drives the whole chapter

## 🚿 Put It Not In Water

Washing a linen garment in water was completely normal and expected.

Here God tells Jeremiah to skip that step entirely.

The girdle would stay exactly as it was, unwashed and untouched.

This detail matters later when the girdle turns up ruined.

An ordinary chore left undone becomes part of a prophetic sign.

🚿 Washing a girdle was the normal step
🚫 God tells him to skip it
🪢 It stayed unwashed and untouched
📖 An undone chore becomes a sign

## 🌊 Go To Euphrates, And Hide It There

Many readers picture the actual Euphrates River, far to the east.

That river sat nearly seven hundred miles from Jeremiah's home.

Many scholars believe the word here points to a much closer spring instead.

That spring sat near Anathoth, Jeremiah's own hometown.

Either way, God sends Jeremiah on a strange, repeated errand.

🌊 Euphrates was far to the east
📏 The real river sat far away
💧 Many scholars believe a nearer spring is meant
➡️ God sends him on a strange errand

## 💔 The Girdle Was Marred

After many days, God tells Jeremiah to go dig the girdle back up.

It had been buried in a damp hole in a rock the whole time.

The girdle came out marred, rotted, and completely ruined.

"Profitable for nothing" means it was no longer good for any use at all.

A garment once worn close to the body was now fit only to be thrown away.

⏳ Many days passed before he returned
🕳️ The girdle sat buried the whole time
💔 It came out ruined and useless
📖 Something once close to him is now worthless

# Jeremiah 13:8-11
# 💔 The Pride Of Judah
---
## 💔 The Pride Of Judah

This whole action was never really about Jeremiah's own clothing.

God explains that the ruined girdle pictures the pride of Judah and Jerusalem.

Pride here means a stubborn confidence that ignored God's warnings for years.

A ruined, unwashed garment now stands for a ruined, unrepentant nation.

🪢 The girdle was never just clothing
💔 It pictures Judah's stubborn pride
⚠️ That pride ignored years of warnings
📖 A ruined garment pictures a ruined nation

## 🙈 Walk After Other Gods, To Serve Them

"This evil people" refers to the same nation the girdle now represents.

They are described as walking in the imagination of their own heart.

That phrase means following whatever felt right instead of following God's actual word.

Serving other gods was the direct result of trusting their own feelings over God.

The girdle's ruin becomes their own picture, good for nothing.

🙈 This evil people means the whole nation
💭 Imagination of their heart means their own feelings
🙏 They served other gods instead of the Lord
📖 Trusting feelings over God led to ruin

## 🤝 As The Girdle Cleaveth To The Loins Of A Man

"Cleaveth" is an old word that means to stick or cling tightly.

A girdle worn this way pressed directly against a person's skin.

God says he caused Israel and Judah to cling to him that same way.

Closeness, not distance, was always what God wanted with his people.

🤝 Cleaveth means to cling tightly
🪢 The girdle pressed close to the skin
💗 God wanted Israel and Judah just as close
📖 Closeness was always God's design

## 🏅 For A Name, And For A Praise, And For A Glory

God names three things he wanted his people to be to him.

A name means a reputation others would recognize.

A praise means public honor brought to God himself.

A glory means visible splendor on display before the world.

Despite that clear purpose, they still refused to listen.

🏅 A name means a known reputation
📣 A praise means public honor for God
✨ A glory means visible splendor
➡️ They still refused this clear purpose

# Jeremiah 13:12-14
# 🍷 Every Bottle Shall Be Filled With Wine
---
## 🍷 Every Bottle Shall Be Filled With Wine

A "bottle" in this culture was a bag made of animal skin, not glass.

Filling every bottle with wine was a common saying for abundance and plenty.

The people already believed this saying and repeated it back to Jeremiah proudly.

They thought it described nothing but good news.

🍷 Bottle here means a skin bag
🎉 The saying pictured plenty and abundance
🗣️ The people repeated it proudly
➡️ They expected only good news from it

## 🥴 I Will Fill All The Inhabitants Of This Land

God takes the people's own proud saying and turns it into judgment.

Every group gets named specifically, kings, priests, prophets, and everyone else in Jerusalem.

"With drunkenness" does not mean a party here.

It pictures confusion, staggering, and total helplessness during coming disaster.

🥴 God turns their saying into judgment
👑 Kings, priests, and prophets are all named
😵 Drunkenness pictures confusion, not celebration
📖 No one is left out of this

## 💥 I Will Dash Them One Against Another

"Dash" pictures smashing something hard enough to break it completely.

This continues the picture of clay bottles being knocked together and shattered.

God says he will do this to the people themselves, not just their pottery.

💥 Dash means smash to pieces
🏺 It matches the broken bottle picture
⚔️ God turns it on the people themselves
➡️ The judgment is total, not partial

## 👨‍👦 The Fathers And The Sons Together

This phrase makes sure no generation gets left out of the coming disaster.

Fathers and sons normally stood on opposite ends of a family's timeline.

Here both are struck down in the very same moment.

God shows he will not pity, spare, or show mercy in this judgment.

👨‍👦 No generation is left out
⏳ Fathers and sons usually differ in age
💥 Both fall in the same moment
📖 No pity or mercy is promised here

# Jeremiah 13:15-17
# 👂 Be Not Proud
---
## 👂 Be Not Proud

Jeremiah has already called this same nation prideful twice in this chapter.

Hearing and truly listening still remain the one thing God asks for.

Pride was the sin behind the ruined girdle and the shattered bottles alike.

A humble ear could have changed everything at this late moment.

👂 Hearing is still the one request
💔 Pride ruined the girdle and the bottles
⏰ This moment is described as late
➡️ A humble ear could change everything

## 🌒 Give Glory To The Lord Your God

Giving glory here means publicly admitting who is really in control.

God offers one final chance to turn back before disaster falls.

"Before he cause darkness" pictures the sun setting on a chance to repent.

Once that light is gone, the same warning cannot be given again.

🌒 Giving glory means admitting God is in control
⏳ One final chance is offered here
🌇 Darkness pictures a closing window
📖 The warning cannot repeat once it closes

## 🏔️ Your Feet Stumble Upon The Dark Mountains

Mountain paths in this region turned dangerous once daylight disappeared.

A traveler caught after dark could not see a cliff edge or loose rock.

The people still hoped for light even as the danger closed in.

God warns that the light they expected will turn into deep darkness instead.

🏔️ Mountain paths grew dangerous after dark
👣 A misstep could mean a fall
🌗 They still hoped for light
📖 Expected light turns into deep darkness

## 😢 The Lord's Flock Is Carried Away Captive

Jeremiah's grief here is not staged for effect.

He says his own soul will weep in secret over what is coming.

"The Lord's flock" pictures the people as sheep who belonged to God himself.

This line quietly predicts the exile that is still ahead in the book.

😢 Jeremiah's grief here is genuine
🐑 The flock pictures God's own people
🔮 This line predicts the coming exile
📖 Grief and warning arrive together

# Jeremiah 13:18-19
# 👑 Say Unto The King And To The Queen
---
## 👑 Say Unto The King And To The Queen

"The queen" here likely means the queen mother, not a king's wife.

In Judah, the king's mother held a real, official position of power.

This message was likely aimed at young King Jehoiachin and his mother Nehushta.

Even the most powerful people in the land are not above this warning.

👑 The queen means the king's mother
🏛️ She held a real position of power
🧒 This likely targets Jehoiachin and Nehushta
📖 No one stands above this warning

## 🪑 Humble Yourselves, Sit Down

Sitting down here is not a casual invitation to rest.

It pictures stepping down from a throne into mourning and humility.

A king normally sat above his people, not among them on the ground.

This command asks Judah's rulers to accept the coming fall now, not later.

🪑 Sitting down pictures leaving the throne
👑 Kings normally sat above their people
😔 This posture pictures mourning, not rest
➡️ Accepting the fall now was the point

## 🏜️ The Cities Of The South Shall Be Shut Up

"The south" refers to the Negev, the dry region on Judah's southern edge.

"Shut up" means these cities would be surrounded and cut off from help.

Invading armies could block roads and trap a city long before ever attacking it.

Even the far edges of the land would not escape this coming siege.

🏜️ The south means the Negev region
🚧 Shut up means surrounded and cut off
🛣️ Blocked roads could trap a city
📖 No region escapes the coming siege

## 🚶 Judah Shall Be Carried Away Captive All Of It

This line removes any hope of a partial or limited disaster.

Earlier warnings in Jeremiah could still sound like they applied to someone else.

Here the whole nation, not just a portion, is named as going into exile.

The repeated phrase "all of it" makes the totality impossible to miss.

🚶 No partial disaster is described here
🌍 The whole nation goes, not part of it
🔁 The repeated phrase drives home the point
➡️ This exile leaves nothing behind

# Jeremiah 13:20-21
# 🐑 Thy Beautiful Flock
---
## 🌅 Them That Come From The North

Babylon actually sat east of Judah, not directly north.

Armies from Babylon still had to travel north first to avoid the open desert.

That longer northern route became the direction every invasion actually came from.

"The north" became shorthand for danger throughout the book of Jeremiah.

🌅 Babylon sat east, not north
🏜️ Desert travel forced a northern route
⚔️ Invasions always arrived from that direction
📖 The north became shorthand for danger

## 🐑 Thy Beautiful Flock

This flock is the same picture used back in verse seventeen.

It pictures the people that Judah's kings were supposed to protect and shepherd.

Calling it "beautiful" makes the coming loss even harder to hear.

Something valuable and cared for is about to be taken away.

🐑 The flock repeats verse seventeen's picture
👑 Judah's kings were meant to shepherd it
😢 Calling it beautiful sharpens the loss
➡️ Something valuable is about to be taken

## 👨‍✈️ Taught Them To Be Captains

Judah had made political deals with these same northern powers for years.

Those alliances trained foreign officers and armies how Judah's own defenses worked.

The very nations Judah once tried to use for protection became its rulers instead.

This is the irony behind the coming disaster, not just bad luck.

👨‍✈️ Judah once allied with these nations
🤝 Those deals trained them well
🔄 Allies became rulers instead of protectors
📖 Irony, not luck, explains this outcome

## 🤰 As A Woman In Travail

"Travail" is an old word for the pain of childbirth.

That pain arrives suddenly and cannot be stopped once it begins.

God compares Judah's coming punishment to that same sudden, unavoidable pain.

No warning beforehand will make the moment itself any easier to bear.

🤰 Travail means the pain of childbirth
⏱️ That pain begins suddenly, without delay
⚖️ Judah's punishment is compared to it
➡️ No warning removes the pain itself

# Jeremiah 13:22-27
# 🐆 Can The Ethiopian Change His Skin
---
## 😳 Thy Skirts Discovered, And Thy Heels Made Bare

Publicly lifting a woman's skirts was a real shame punishment in the ancient world.

It exposed someone accused of unfaithfulness in front of the whole community.

God says Judah's own guilt is what earns this same public exposure.

This is not random cruelty, it is a punishment that fit the specific sin.

😳 Lifted skirts were an ancient shame punishment
👥 It exposed accused unfaithfulness publicly
⚖️ Judah's own guilt earns this exposure
📖 The punishment matches the specific sin

## 🐆 Can The Ethiopian Change His Skin, Or The Leopard His Spots

"Ethiopian" here means a Cushite, someone from the region south of Egypt.

The comparison is not an insult about anyone's skin color.

It points to something fixed, just like a leopard's spots never change.

People "accustomed to do evil" find change just as difficult as that.

🐆 Ethiopian means a Cushite person
🚫 This is not an insult about skin color
🔒 Both examples picture something fixed and permanent
📖 Long habits of evil are hard to break

## 💨 Scatter Them As The Stubble

Stubble means the dry, leftover stalks in a field after a harvest.

Wind can carry that light, worthless material away without any effort.

God says Judah will scatter that same way, with no resistance at all.

Nothing about this scattering will look organized or dignified.

💨 Stubble means dry leftover stalks
🌬️ Wind carries it away easily
🍂 Judah will scatter just as easily
➡️ The scattering will not look dignified

## 🐴 Thy Neighings, The Lewdness Of Thy Whoredom

"Neighing" describes the loud, urgent sound a horse makes in heat.

The prophets use that same picture for uncontrolled, eager idol worship.

"Whoredom" throughout Jeremiah means chasing after other gods instead of the Lord.

The chapter ends with God still asking if Jerusalem will ever get clean.

🐴 Neighing pictures an animal in heat
🙈 It describes uncontrolled idol worship
💔 Whoredom means chasing after other gods
📖 God still asks if she will get clean
`.trim();

export const JEREMIAH_THIRTEEN_PERSONAL_SECTIONS = parseJeremiahThirteenRawNotes(JEREMIAH_THIRTEEN_RAW_NOTES);
