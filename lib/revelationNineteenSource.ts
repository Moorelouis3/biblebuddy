export type RevelationNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationNineteenRawNotes(rawText: string): RevelationNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 19:${startVerse}` : `Revelation 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Revelation 19 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_NINETEEN_RAW_NOTES = `# Revelation 19:1-5
# 🙌 Heaven Shouts Alleluia Over Babylon's Fall
---
## 🙌 A Great Voice Of Much People In Heaven

This voice is not one person speaking alone.

It is a massive crowd in heaven speaking together as one.

Revelation eighteen just finished showing Babylon's total collapse.

Heaven responds to that collapse immediately, with full agreement.

🙌 A massive heavenly crowd, not one voice
🏙️ Comes right after Babylon's fall
🎉 Heaven reacts to that fall at once
📖 Heaven agrees fully with God's judgment

---
## 🔤 Alleluia

Alleluia comes from two Hebrew words joined together.

"Hallelu" means praise, and "Yah" is a short form of God's name.

Together the word means praise the LORD.

This chapter is the only place the word appears anywhere in the New Testament.

🙌 Alleluia means praise the LORD
🔤 Hallelu and Yah are two Hebrew words
📜 Only used here in the whole New Testament
📖 One word, carrying centuries of worship

---
## 🙏 Salvation, And Glory, And Honour, And Power

Heaven names four things it credits entirely to God here.

Salvation names the rescue of His people.

Glory and honour both describe the weight of who God is.

Power names the strength that carried out this whole judgment.

🙏 Four things named, all credited to God
🛟 Salvation means God rescued His people
👑 Glory and honour describe His weight
📖 Power names the strength behind judgment

---
## ⚖️ True And Righteous Are His Judgments

Heaven is not just celebrating a God who recently defeated the enemy.

It is affirming the character behind the decision itself.

True means the judgment matches what actually happened.

Righteous means the judgment matches what is actually right.

⚖️ Heaven affirms God's character, not only His win
✅ True means it matches what happened
👍 Righteous means it matches what is right
📖 God's judgments are never random

---
## 👩 The Great Whore, Which Did Corrupt The Earth

This title names the same figure introduced back in Revelation seventeen.

"Whore" pictures a system built on broken loyalty, not one woman's private choices.

She is called great because of how far her influence reached.

Revelation eighteen already showed nations, kings, and merchants all pulled into her corruption.

👩 This is the same figure from Revelation seventeen
💔 Whore pictures broken loyalty, not one person
🌍 Great describes how far her influence spread
📖 Her corruption touched nations, kings, and merchants

---
## ⚖️ Hath Avenged The Blood Of His Servants At Her Hand

Avenged means justice has finally answered a real wrong.

Revelation eighteen already named the blood of prophets and saints found in her.

This verse confirms that detail was never forgotten.

God settles accounts for people who were killed for their faith.

⚖️ Avenged means justice answers a real wrong
🩸 Blood points back to Revelation eighteen
🙏 Nothing about their deaths was forgotten
📖 God settles accounts for the faithful

---
## 💨 Her Smoke Rose Up For Ever And Ever

Revelation eighteen already described Babylon burning completely with fire.

This verse adds one detail, the smoke from that fire never stops rising.

Rising smoke pictures a destruction that stays visible, not forgotten over time.

Her judgment is not a one time event that fades from memory.

🔥 Revelation eighteen already described her burning
💨 Smoke that never stops rising
👀 The destruction stays visible, not forgotten
📖 This judgment does not fade with time

---
## 👴 The Four And Twenty Elders And The Four Beasts

These two groups have appeared together many times already in Revelation.

The twenty four elders likely picture the redeemed people of God in heaven.

The four beasts are heavenly creatures surrounding God's throne, first described in Revelation four.

Both groups show up here to do the exact same thing, worship.

👴 These groups appear often in Revelation
👑 Twenty four elders picture the redeemed
🦁 Four beasts are heavenly throne creatures
📖 Both groups unite in worship here

---
## 🙇 Fell Down And Worshipped God That Sat On The Throne

Falling down pictures complete humility, not just a bow of respect.

This is the same posture already used earlier in Revelation before this same throne.

Worship here follows directly after hearing about God's justice, not before it.

Right belief about God naturally leads to this kind of response.

🙇 Falling down means complete humility
🔁 The same posture used earlier in Revelation
⚖️ Worship follows right after justice is named
📖 True belief leads to real worship

---
## 🗣️ A Voice Came Out Of The Throne

This voice is not necessarily God speaking about Himself in the third person.

Many scholars believe it was likely an angel or a heavenly representative speaking for God.

The command that follows carries full divine authority either way.

🗣️ This voice speaks from near God's throne
🤔 It was likely an angel speaking for Him
👑 The command still carries full authority
📖 Authority does not depend on who speaks

---
## 🙏 All Ye His Servants, And Ye That Fear Him

This call to praise names two separate groups.

Servants describes anyone who belongs to God and serves Him.

Those that fear Him describes anyone who takes Him seriously, with reverence.

The call reaches far beyond one small, elite group in heaven.

🙏 Two separate groups are named here
🛡️ Servants means belonging to God
😨 Fearing Him means taking Him seriously
📖 This call reaches far beyond an elite few

---
## 📏 Both Small And Great

This phrase removes any limit based on size or status.

It will repeat again later in this very chapter.

Everyone who belongs to God is included in this call to praise, no matter their rank.

📏 No limit based on size or status
🔁 This phrase repeats again later in the chapter
👥 Everyone who belongs to God is included
📖 Rank never excludes anyone from worship

# Revelation 19:6-8
# 👰 The Marriage Of The Lamb
---
## 🌊 As It Were The Voice Of A Great Multitude

John stacks three comparisons together to describe one overwhelming sound.

A great multitude pictures a crowd too large to count.

Many waters pictures the roar of a massive waterfall or ocean.

Mighty thunderings pictures a storm loud enough to shake the ground.

🌊 Three comparisons describe one massive sound
👥 A multitude too large to count
💦 Many waters pictures a roaring waterfall
📖 This sound overwhelms every sense at once

---
## 💪 The Lord God Omnipotent Reigneth

"Omnipotent" means having unlimited power over absolutely everything.

Reigneth means actively ruling right now, not merely holding a title.

This declaration answers every doubt raised by Babylon's brief, false power.

Real power never actually belonged to the system that just fell.

💪 Omnipotent means having unlimited power
👑 Reigneth means ruling right now
🏙️ This answers Babylon's brief, false power
📖 Real power belonged to God all along

---
## 🐑 The Marriage Of The Lamb Is Come

The Lamb is the title Revelation uses for Jesus throughout the whole book.

Marriage here pictures a permanent, committed relationship, not a single ceremony.

This moment has been building since Jesus died as that same Lamb.

What looked like a loss at the cross ends in a wedding.

🐑 The Lamb is Revelation's title for Jesus
💍 Marriage pictures a permanent committed relationship
✝️ This moment has been building the whole book
📖 The cross ends in a wedding

---
## 👰 His Wife Hath Made Herself Ready

The wife here is best understood as all of God's redeemed people together.

This is the opposite picture of Babylon, the corrupt woman from earlier chapters.

Babylon was stripped of everything she had.

This bride is dressed and ready instead.

👰 The wife pictures God's redeemed people
🏙️ This contrasts directly with Babylon
🧹 Babylon was stripped, this bride is ready
📖 One system falls, one bride rises

---
## 👗 Arrayed In Fine Linen, Clean And White

Fine linen was an expensive, high quality fabric in the ancient world.

Babylon wore this same fabric back in Revelation eighteen, but it got stripped away in her fall.

This bride is given her fine linen instead of losing it.

"Granted" means it is a gift, not something she earned herself.

👗 Fine linen was costly, high quality fabric
🏙️ Babylon wore this same fabric and lost it
🎁 This bride receives it as a gift
📖 Granted means given, never self earned

---
## 🔑 The Fine Linen Is The Righteousness Of Saints

Righteousness here is received, never something built up by the saints themselves.

Saints simply means people who belong to God through faith.

The wedding garment pictures a status received, not a reward earned.

🔑 Righteousness here is a received gift
🎁 Not earned by the saints themselves
🙏 Saints means belonging to God through faith
📖 A status received, not a reward earned

# Revelation 19:9-10
# 📜 Blessed Are They Which Are Called
---
## ✍️ Write, Blessed Are They Which Are Called

John is told directly to put this promise into permanent writing.

Being called here means being invited, the same way guests are invited to a wedding feast.

This invitation echoes the wedding parables Jesus already told.

The marriage supper of the Lamb pictures the full joy of belonging to Him forever.

✍️ John is told to write this down
💌 Called means invited, like a wedding guest
📜 This echoes Jesus own wedding parables
📖 The supper pictures forever joy with Him

---
## ✅ These Are The True Sayings Of God

This short sentence stops the vision to confirm something important.

Everything just promised about the wedding supper is completely reliable.

God does not promise a joy He will not actually deliver.

✅ This line confirms something important
💯 The promise is completely reliable
🙏 God delivers what He promises
📖 This joy is not a maybe

---
## 🙇 I Fell At His Feet To Worship Him

John responds to this angel the way he would respond to God Himself.

This is an honest mistake, not an act of rebellion.

Heavenly messengers can look impressive enough to blur that line by accident.

🙇 John worships the angel by mistake
😇 This is honest, not rebellious
✨ Heavenly messengers can look impressive
📖 Even good intentions need correcting sometimes

---
## 🛑 I Am Thy Fellowservant

The angel immediately corrects John and refuses the worship.

Fellowservant means an equal in service, not someone above John.

Angels throughout the Bible consistently refuse this kind of worship.

Only God Himself ever has the right to receive it.

🛑 The angel refuses the worship at once
🤝 Fellowservant means an equal, not someone above him
📚 Angels consistently refuse worship elsewhere too
📖 Only God has the right to be worshipped

---
## 🔑 The Testimony Of Jesus Is The Spirit Of Prophecy

This phrase defines what true prophecy is actually about.

Testimony of Jesus means the message that points to who He is and what He did.

Real prophecy always centers on Jesus, not on predicting random future events.

Anything claiming to be prophecy but ignoring Jesus misses the point entirely.

🔑 This defines what true prophecy is
✝️ It centers on who Jesus is
🚫 Not just predicting random future events
📖 Prophecy without Jesus misses the point

# Revelation 19:11-16
# 🐎 The Rider Called Faithful And True
---
## 🐎 Heaven Opened, And Behold A White Horse

A white horse already appeared once before, back in Revelation six.

That earlier rider brought conquest without real justice behind it.

This rider is not that same figure, despite the matching color.

Context, not just the color of the horse, identifies who is riding.

🐎 A white horse appeared before, in Revelation six
⚔️ That earlier rider brought conquest without justice
🙅 This rider is not that same figure
📖 Context identifies the rider, not just the color

---
## 🤝 Called Faithful And True

This exact title was already given to Jesus earlier in Revelation three.

Faithful means He always keeps His word.

True means He is exactly who He claims to be.

Every earlier promise in this book now comes due through this rider.

🤝 Faithful means He always keeps His word
✅ True means He is exactly who He claims
📜 This title already appeared in Revelation three
📖 Every earlier promise now comes due

---
## ⚖️ In Righteousness He Doth Judge And Make War

This war is not driven by anger that gets out of control.

Righteousness means the fighting itself answers to a perfectly fair standard.

Human wars are usually driven by greed, fear, or pride.

This war is driven only by what is actually right.

⚖️ Not driven by uncontrolled anger
✅ Righteousness means a perfectly fair standard
💰 Human wars are driven by greed or fear
📖 Only what is right drives this one

---
## 👁️ His Eyes Were As A Flame Of Fire

This same description already appeared for Jesus in Revelation chapter one.

Flame of fire pictures eyes that see straight through anything hidden.

Nothing about the beast or Babylon can hide from this gaze.

👁️ This matches the description in Revelation one
🔥 Flame of fire pictures total vision
🙈 Nothing hidden escapes this gaze
📖 He sees straight through everything

---
## 👑 On His Head Were Many Crowns

"Crowns" here means diadems, the kind worn by an actual ruling king.

Earlier in Revelation, the beast and the dragon also wore crowns.

Those crowns were stolen or self claimed authority.

This rider wears many crowns because His authority is real and total.

👑 Crowns here means a king's diadems
🐉 The beast and dragon also wore crowns
🚫 Their authority was stolen or self claimed
📖 His authority is real, not borrowed

---
## 📛 A Name Written, That No Man Knew, But He Himself

Names in the ancient world often captured a person's full character.

This hidden name means something about Him cannot be fully captured in words.

No human description can completely contain who Jesus actually is.

📛 Names captured a person's full character
🔒 This name stays hidden from everyone else
🚫 No human words fully capture Him
📖 Some things about God stay beyond us

---
## 👗 Clothed With A Vesture Dipped In Blood

Vesture simply means a robe or outer garment.

This image borrows directly from Isaiah, picturing someone who has just trampled a winepress of judgment.

The blood pictures the result of judgment already carried out, not a wound He suffered.

👗 Vesture means an outer robe
🍷 This image borrows from Isaiah's winepress
⚖️ Blood here pictures judgment, not injury
📖 The robe shows what He has already done

---
## 🔙 His Name Is Called The Word Of God

John already used this exact title for Jesus at the start of his Gospel.

The Word means God's own message and character made completely visible.

This title ties the beginning of John's writing to the very end of the Bible.

🔙 John already used this title before
🗣️ The Word means God made visible
🔗 This ties John's Gospel to Revelation
➡️ One title spans the whole story

---
## 👥 The Armies Which Were In Heaven Followed Him

This army is best understood as the redeemed people of God, not angels alone.

They wear the same fine linen already given to the Lamb's wife back in verse eight.

Clean, white clothing here pictures people made right, not people trained for battle.

This is a victory march, not a fighting force preparing to strike.

👥 This army pictures God's redeemed people
👗 They wear the same linen as the bride
✨ Clean clothing pictures righteousness, not combat gear
📖 This is a victory march, not a battle

---
## ⚔️ Out Of His Mouth Goeth A Sharp Sword

This sword is not a literal blade carried into physical combat.

It pictures the absolute power of His spoken word and command.

This same image already appeared earlier in Revelation describing Jesus.

⚔️ Not a literal blade for combat
🗣️ It pictures the power of His word
🔁 This image already appeared earlier in Revelation
📖 His word alone carries total authority

---
## 📜 He Shall Rule Them With A Rod Of Iron

This exact phrase comes from an ancient prophecy in Psalm two.

A rod of iron pictures total, unbreakable authority over every nation.

No rebellion against this rule will ever succeed.

📜 This phrase comes from Psalm two
🔨 A rod of iron means unbreakable rule
🚫 No rebellion against it will succeed
📖 His authority finally covers every nation

---
## 🍇 Treadeth The Winepress Of The Fierceness And Wrath

A winepress crushed grapes underfoot to release their juice.

This same picture already explained the blood on His robe back in verse thirteen.

Fierceness and wrath name the full force of God's judgment against evil.

Nothing about this judgment is held back or incomplete.

🍇 A winepress crushed grapes underfoot
🩸 This explains the blood from verse thirteen
🔥 Fierceness and wrath name full judgment
📖 Nothing here is held back

---
## 👑 KING OF KINGS, AND LORD OF LORDS

This title appears in capital letters in most English Bibles for emphasis.

It means His rule stands above every other king or ruler who has ever existed.

Writing it on His robe and thigh makes the claim impossible to miss.

Every earthly crown already named in this chapter now answers to this one.

👑 Capital letters mark this title's weight
🌍 His rule stands above every other ruler
📍 Written where it cannot be missed
📖 Every crown here answers to Him

# Revelation 19:17-18
# 🦅 The Supper Of The Great God
---
## ☀️ An Angel Standing In The Sun

Standing in the sun means this angel is visible from everywhere on earth.

No one anywhere could miss this announcement once it began.

The scale of the message matches the scale of what is about to happen.

☀️ Standing in the sun means total visibility
🌍 No one on earth could miss this
📢 A message this big needed a big stage
📖 The scale matches what is coming

---
## 🔁 The Supper Of The Great God

This phrase deliberately echoes the marriage supper of the Lamb from verse nine.

That earlier supper celebrated joy and belonging.

This supper is a grim opposite, a battlefield feast for scavenger birds.

Two suppers in one chapter picture two completely different endings.

🔁 This echoes the supper from verse nine
🎉 That earlier supper celebrated joy
💀 This supper is a battlefield feast instead
📖 Two suppers, two completely different endings

---
## 👑 The Flesh Of Kings, And The Flesh Of Captains

This list names the defeated army by rank, from the top down.

Kings and captains were the leaders who commanded these armies.

No rank, however high, protects anyone from this outcome.

Earthly titles meant nothing once this battle actually began.

👑 Kings and captains were the top leaders
📉 The list runs from highest rank down
🚫 No rank offers protection here
📖 Titles meant nothing once the battle began

---
## 🔁 Both Free And Bond, Both Small And Great

This phrase repeats the exact wording already used back in verse five.

There, it described everyone included in praising God.

Here, it describes everyone included in this defeat.

The same totality that includes people in worship also applies to judgment.

🔁 This phrase repeats from verse five
🙏 There it described worship
⚔️ Here it describes defeat
📖 Totality applies to judgment, not only worship

# Revelation 19:19-21
# ⚔️ The Beast And False Prophet Are Defeated
---
## 🐉 The Beast, And The Kings Of The Earth, Gathered Together To Make War

The beast here is the same figure introduced earlier in Revelation thirteen.

This army gathers with real confidence, expecting an actual fight.

No battle description actually follows this verse.

Their confidence was badly misplaced from the very start.

🐉 The same beast from chapter thirteen
💪 This army gathers with real confidence
🚫 No battle description ever actually follows
📖 Their confidence was badly misplaced

---
## ⚡ The Beast Was Taken

This defeat happens instantly, with no drawn out battle described at all.

All that buildup in verse nineteen ends in a single, quiet sentence.

Real power settles this conflict before it can even properly begin.

⚡ The defeat happens instantly
📉 All that buildup ends in one sentence
🛡️ Real power settles this before it begins
📖 This was never a fair fight

---
## 🎭 The False Prophet That Wrought Miracles Before Him

This false prophet is the second beast already introduced in Revelation thirteen.

His miracles were real enough to deceive people, not simple tricks.

Those signs convinced people to accept the mark of the beast.

A miracle happening does not automatically prove it comes from God.

🎭 This is the second beast from chapter thirteen
✨ His miracles were real, not simple tricks
🏷️ They convinced people to take the mark
📖 A miracle is not automatic proof of God

---
## 🔥 Cast Alive Into A Lake Of Fire Burning With Brimstone

Brimstone is an old word for sulfur, known for its sharp smell when burned.

"Alive" here matters, this is conscious judgment, not simple destruction.

A lake of fire pictures ongoing judgment, not a quick ending.

🔥 Brimstone is an old word for sulfur
😨 Alive means conscious, not simple destruction
⏳ This pictures ongoing judgment, not a quick end
📖 This judgment does not simply erase them

---
## 🔁 Which Sword Proceeded Out Of His Mouth

This verse circles directly back to the sword already described in verse fifteen.

That sword was never a literal blade swung in close combat.

His spoken word alone was enough to settle this entire battle.

🔁 This circles back to verse fifteen
⚔️ Never a literal blade in close combat
🗣️ His spoken word alone settled this
📖 One word ended an entire war

---
## 🦅 All The Fowls Were Filled With Their Flesh

This verse closes the invitation given back in verse seventeen.

The supper of the great God is now fully, grimly complete.

Every warning in this chapter has now actually come true.

🦅 This closes the invitation from verse seventeen
🍽️ The grim supper is now complete
✅ Every warning in this chapter came true
📖 Nothing announced here was ever empty talk
`.trim();

export const REVELATION_NINETEEN_PERSONAL_SECTIONS = parseRevelationNineteenRawNotes(REVELATION_NINETEEN_RAW_NOTES);
