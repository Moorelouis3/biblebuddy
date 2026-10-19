export type RevelationTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationTwentyRawNotes(rawText: string): RevelationTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 20:${startVerse}` : `Revelation 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Revelation 20 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_TWENTY_RAW_NOTES = `# Revelation 20:1-3
# ⛓️ Satan Bound For A Thousand Years
---
## 👼 An Angel Come Down From Heaven

This angel is not named here.

The chain and key he carries show real authority.

Earlier in Revelation, another angel held this same key, back in chapter nine.

Coming down from heaven means this authority is not Satan's to resist.

The chapter opens with heaven already in control of what happens next.

👼 An angel carries real authority here
🔑 The same pit appeared in Revelation nine
⬇️ Coming down from heaven means God sent him
📖 Heaven controls what happens next

---
## 🔑 The Key Of The Bottomless Pit

A key means the power to open or shut something completely.

The bottomless pit already appeared in Revelation nine, pictured as a prison for evil spirits.

Holding the key here means Satan can be locked away just as easily as he was once let loose.

Nothing about this prison is beyond God's control.

🔑 A key means power to open or shut
🕳️ The bottomless pit already appeared in Revelation nine
🔒 Satan can be locked away just as easily
📖 This prison stays under God's control

---
## ⛓️ A Great Chain In His Hand

A chain pictures complete restraint, not a temporary slowing down.

No earthly chain could ever hold a being like Satan.

This chain works because it carries heaven's authority, not physical strength.

The size of the chain matches the size of the threat being restrained.

⛓️ A chain pictures complete restraint
💪 No earthly chain could hold Satan
👑 It works through heaven's authority, not strength
📖 A huge chain matches a huge threat

---
## 🐍 That Old Serpent, Which Is The Devil, And Satan

This verse stacks four names onto one single being.

"That old serpent" points back to the snake in the garden of Eden.

"The Devil" means accuser, and "Satan" means adversary, or enemy.

Revelation twelve already used this exact same string of titles for him.

🐍 Four names, one single being
🌳 Old serpent points back to Eden
⚔️ Devil means accuser, Satan means enemy
📖 Revelation twelve already named him this way

---
## 🔒 Bound Him A Thousand Years

Bound means his freedom to act is taken away completely.

A thousand years is a long, fixed span, not a vague long time.

Many scholars believe it was likely a literal period.

Others believe it symbolizes a complete, finished age.

Either way, the number marks a real limit God has set.

🔒 Bound means his freedom is taken away
🔢 A thousand years is a fixed span
🤔 Scholars disagree on literal or symbolic
📖 Either way, God set a real limit

---
## 🚪 Shut Him Up, And Set A Seal Upon Him

Shutting him up means locking the pit, not just chaining him inside it.

Setting a seal adds a second layer, a mark that nobody is allowed to break.

The den of lions in Daniel's story used this same kind of seal centuries earlier.

Two separate safeguards show this restraint is meant to hold completely.

🚪 Shutting up means locking the pit itself
🖋️ A seal marks it as forbidden to break
🦁 Daniel's story used this same kind of seal
📖 Two safeguards show total restraint

---
## 🎭 That He Should Deceive The Nations No More

This names the exact purpose behind the binding.

Deceiving the nations has been Satan's main weapon throughout this whole book.

Revelation has already shown him deceiving through the beast and the false prophet.

Taking that weapon away, even temporarily, changes everything on earth during this time.

🎭 This names the purpose of the binding
🐉 Deception has been his main weapon
🦁 He used the beast and false prophet
📖 Removing that weapon changes life on earth

---
## ⏳ He Must Be Loosed A Little Season

"Must" signals this is already part of God's fixed plan, not a risk or a loophole.

A little season means a short period, especially compared to a thousand years.

The text does not yet say why God allows this, only that He does.

Closing on "a little season" tells the reader not to be afraid.

This moment will not last.

📝 Must means this is already planned
⏳ A little season is short, not long
❓ The text does not explain why yet
📖 This moment will not last

# Revelation 20:4-6
# 👑 The First Resurrection
---
## 🪑 I Saw Thrones, And They Sat Upon Them, And Judgment Was Given Unto Them

The text does not say exactly who these people are.

Context fills in the answer.

They match the souls of martyrs the chapter describes one sentence later.

Sitting on thrones pictures sharing in rule, not simply watching from the sidelines.

Judgment given to them means they are trusted with real authority, not punishment.

🪑 The text does not name them directly
🩸 Context points to the martyrs described next
👑 Sitting on thrones means sharing in rule
📖 They are trusted with authority, not punishment

---
## ⚔️ The Souls Of Them That Were Beheaded For The Witness Of Jesus

Beheaded names a real, violent method of execution used under Rome.

These are martyrs who died specifically because they testified about Jesus.

Revelation already mentioned these same martyrs waiting under the altar back in chapter six.

Their deaths were never forgotten or wasted.

⚔️ Beheaded names a real method of execution
✝️ They died for testifying about Jesus
📜 Chapter six already mentioned these same martyrs
📖 Their deaths were never forgotten

---
## 🙅 Which Had Not Worshipped The Beast, Neither His Image

This links these martyrs directly to the choice described earlier in Revelation thirteen.

Refusing to worship the beast or his image often cost people their lives.

Refusing to take his mark meant losing access to buying and selling completely.

Loyalty to God here came at the highest possible price.

🙅 This links back to Revelation thirteen's choice
🐉 Refusing worship often cost people their lives
🏷️ Refusing the mark meant losing daily trade
📖 Loyalty to God cost everything for them

---
## ❤️ They Lived And Reigned With Christ A Thousand Years

Living here means more than simply being alive again.

Reigning means they share directly in Christ's rule during this period.

This reverses everything they lost by refusing the beast's system.

What looked like a losing choice ends in a shared throne.

❤️ Living means more than being alive
👑 Reigning means sharing in Christ's rule
🔄 This reverses what they lost before
📖 A losing choice ends in a shared throne

---
## 💀 The Rest Of The Dead Lived Not Again Until The Thousand Years Were Finished

"The rest of the dead" means everyone else who died, not included in this first group.

They do not come back to life during this thousand year period at all.

This verse draws a clear line between two separate groups of the dead.

Not everyone experiences resurrection at the same moment in this chapter.

💀 This names everyone outside the first group
⏳ They stay dead through the thousand years
➗ A clear line separates two groups
📖 Resurrection does not happen all at once

---
## 🥇 This Is The First Resurrection

"First" means there is a second resurrection still coming later.

This resurrection belongs only to the martyrs and faithful just described.

Naming it this plainly tells the reader resurrection itself happens in stages here.

The text gives a label before explaining everything the label covers.

🥇 First means a second one is still coming
🩸 This one belongs to the faithful described above
📊 Resurrection happens in stages in this chapter
📖 A label given before the full picture

---
## 🙌 Blessed And Holy Is He That Hath Part In The First Resurrection

Blessed means genuinely fortunate, favored by God himself.

Holy means set apart for God, not simply morally good.

Having "part in" something means sharing in it, not standing outside it watching.

This sentence pronounces a verdict, not a wish or a hope.

🙌 Blessed means genuinely favored by God
✨ Holy means set apart for Him
🤝 Having part in it means truly sharing it
📖 This is a verdict, not a wish

---
## ☠️ On Such The Second Death Hath No Power

"The second death" is a new term this chapter will define fully later.

For now, know that it names a death worse than the one everyone already faces.

Having no power over someone means that threat simply cannot touch them.

This promise answers the fear every martyr in this group once faced.

🆕 Second death is a new term here
☠️ It names a worse death than the first
🛡️ No power means it cannot touch them
📖 This answers what martyrs once feared

---
## 🙏 They Shall Be Priests Of God And Of Christ

A priest's job was to represent people before God, and God to the people.

This promise already appeared earlier in Revelation for all of God's people, not only these martyrs.

Reigning and serving as priests happen together here, not as separate rewards.

Rule in this kingdom never means lording power over others.

🙏 A priest represents people before God
📜 Revelation promised this to all believers earlier
👑 Reigning and serving as priests go together
📖 Rule here never means lording over others

# Revelation 20:7-10
# 🔥 Satan's Final Defeat
---
## ⏰ When The Thousand Years Are Expired, Satan Shall Be Loosed Out Of His Prison

Expired simply means the fixed period has run out completely.

This moment was already promised back in verse three, with no surprise involved.

Loosed means his full freedom to deceive returns immediately.

God allows this release on His own timing, not because Satan broke free.

⏰ Expired means the fixed period ran out
📜 This was already promised back in verse three
🔓 Loosed means his freedom returns immediately
📖 God allows this on His own timing

---
## 🌍 Gog And Magog

These two names come from an ancient prophecy in Ezekiel, written centuries earlier.

There, Gog and Magog named a specific enemy nation gathered against God's people.

Here the names work more like a symbol for every enemy of God gathered at once.

One old prophecy becomes a pattern for a much larger final battle.

📜 These names come from Ezekiel's prophecy
⚔️ There they named one specific enemy nation
🌍 Here they symbolize every enemy gathered at once
📖 An old prophecy becomes a final pattern

---
## 🏖️ The Number Of Whom Is As The Sand Of The Sea

This is an old idiom for a number too large to count.

The same phrase once described Abraham's promised descendants, back in Genesis.

Here it shows how enormous this final deception still is.

A world that already watched Babylon fall still gathers this easily.

🏖️ This idiom means too many to count
📜 The same phrase once named Abraham's descendants
🎭 It shows how enormous this deception is
📖 Babylon fell, yet people still gather this easily

---
## ⛺ Compassed The Camp Of The Saints About, And The Beloved City

Compassed means surrounded completely, on every side at once.

The camp of the saints pictures God's people gathered together as one community.

The beloved city points to Jerusalem, long pictured as the place God specially loves.

This army expects a real siege.

That is the same mistake the beast's armies already made in chapter nineteen.

🔄 Compassed means surrounded on every side
⛺ The camp pictures God's people together
🏙️ The beloved city points to Jerusalem
📖 This repeats chapter nineteen's same mistake

---
## 🔥 Fire Came Down From God Out Of Heaven, And Devoured Them

This judgment comes directly from God, with no battle described at all.

Fire falling from heaven destroyed enemies this exact way back in Elijah's day.

Devoured means completely consumed, leaving nothing of this army behind.

Just like chapter nineteen, the buildup here is massive.

The ending still comes instantly.

🔥 This judgment comes directly from God
📜 Fire from heaven also fell in Elijah's day
💨 Devoured means completely consumed
📖 Massive buildup, instant ending, again

---
## 👥 Cast Into The Lake Of Fire And Brimstone, Where The Beast And The False Prophet Are

This verse finally reunites the whole unholy trio in one place.

The beast and false prophet were already cast here back in chapter nineteen.

Satan joins them now, completing the defeat of everyone behind the deception.

Nothing that opposed God through this entire book escapes this same ending.

👥 This reunites the whole unholy trio
📜 The beast and prophet arrived in chapter nineteen
🐍 Satan joins them, completing their defeat
📖 Nothing opposing God escapes this ending

---
## ♾️ Tormented Day And Night For Ever And Ever

"Day and night" pictures a judgment with no pause or relief, ever.

"For ever and ever" removes any limit of time at all.

This is the same destination already promised for the beast and false prophet in chapter nineteen.

The chapter does not soften this ending or explain it away.

🌓 Day and night means no pause at all
♾️ For ever and ever removes any time limit
📜 This matches chapter nineteen's same ending
📖 The chapter never softens this

# Revelation 20:11-15
# 📖 The Great White Throne
---
## ⚪ A Great White Throne

White pictures total purity, with nothing hidden and nothing stained.

This is a different throne scene than the ones already pictured earlier in Revelation.

Great signals that everyone, without exception, will eventually stand before it.

The color alone tells the reader what kind of judgment is coming.

⚪ White pictures total purity
🪑 This differs from earlier throne scenes
🌍 Great means everyone stands before it
📖 The color signals the judgment ahead

---
## 🏃 From Whose Face The Earth And The Heaven Fled Away

Fled away pictures the created world unable to stand in this presence.

This is not the heaven and earth being destroyed by an outside force.

It pictures them retreating, the way darkness simply cannot stay once light appears.

Nothing physical can hold up next to this kind of holiness.

🏃 Fled away pictures creation retreating
💥 Not destroyed by an outside force
🌑 Like darkness that cannot stay with light
📖 Nothing holds up next to this holiness

---
## 📏 The Dead, Small And Great, Stand Before God

Small and great removes every excuse based on status or rank.

This includes every person who has ever died, with no exceptions named.

Standing before God pictures a trial, not a casual meeting.

Everyone already mentioned throughout this entire book eventually arrives here.

📏 Small and great removes every excuse of rank
🌍 This includes every person who has died
⚖️ Standing before Him pictures a trial
📖 Everyone in this book arrives here eventually

---
## 📚 The Books Were Opened

Books here picture a complete, accurate record, not a vague memory.

Opening them means every detail recorded becomes visible at this moment.

"According to their works" at the end of this passage ties directly back to these same books.

Nothing done gets lost or forgotten by the time this moment arrives.

📚 Books picture a complete accurate record
👁️ Opening them makes every detail visible
🔗 This ties to according to their works later
📖 Nothing done is ever forgotten

---
## 📘 Another Book Was Opened, Which Is The Book Of Life

This book is named separately from the other books just mentioned.

It does not record deeds.

It records names, the people who belong to God.

Being written in this book is what Revelation calls being saved, not a reward for good behavior.

Two different kinds of record exist here, deeds and belonging.

📘 This book is named separately
✍️ It records names, not deeds
🙏 Being written in it means belonging to God
➡️ Two different kinds of record exist here

---
## 📋 According To Their Works

Works here means everything a person actually did, not what they merely believed.

This standard applies to everyone whose name is not already found in the book of life.

Scripture elsewhere makes clear no one can earn salvation through works alone.

Works still matter here, as the evidence this judgment weighs.

📋 Works means what a person actually did
⚖️ This applies outside the book of life
🙏 Salvation itself still comes by grace
📖 Works remain the evidence judgment weighs

---
## 🌊 The Sea Gave Up The Dead Which Were In It

Ancient readers often feared the sea as a place with no proper burial at all.

Someone lost at sea seemed, to many, beyond any hope of resurrection.

This verse closes that gap directly.

The sea cannot hide anyone from this judgment.

No kind of death, however forgotten, escapes this moment.

🌊 Ancient readers feared burial at sea
😨 It seemed beyond any hope of resurrection
🚫 This verse closes that gap directly
📖 No death escapes this moment

---
## 🐴 Death And Hell Delivered Up The Dead Which Were In Them

Death and Hell already appeared earlier in Revelation, back in chapter six.

There they were pictured as a rider and the one riding behind him.

Delivered up means they are forced to release everyone they hold.

Even death itself answers to God's authority at this moment.

What once seemed final now proves temporary.

🐴 Death and Hell appeared in chapter six
🔓 Delivered up means forced release
👑 Even death answers to God's authority
📖 What seemed final proves temporary

---
## 💀 Death And Hell Were Cast Into The Lake Of Fire

Death and Hell themselves are finally destroyed, not just emptied out.

"The second death" was already introduced earlier in this chapter, in verse six.

It names a permanent separation from God, a final kind of death.

Death does not get the final word in this story.

It gets thrown away instead.

💀 Death and Hell are finally destroyed
🔁 Second death was already named in verse six
🚫 It names permanent separation from God
📖 Death does not get the final word

---
## ❓ Whosoever Was Not Found Written In The Book Of Life Was Cast Into The Lake Of Fire

This verse closes the chapter on the single question that decided everything.

Not every detail of a person's life appears to matter here, only this one record.

Being written in the book of life is the difference this entire judgment turns on.

The chapter ends with a warning, and an open invitation hiding inside it.

❓ One single question decided everything here
📘 Not every detail mattered here, only this
✍️ Being written in it made the difference
➡️ A warning, and an invitation hiding inside
`.trim();

export const REVELATION_TWENTY_PERSONAL_SECTIONS = parseRevelationTwentyRawNotes(REVELATION_TWENTY_RAW_NOTES);
