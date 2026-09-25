export type IsaiahSixtyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahSixtyFourRawNotes(rawText: string): IsaiahSixtyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahSixtyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+64:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 64 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+64:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+64:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 64 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 64,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 64:${startVerse}` : `Isaiah 64:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Isaiah 64 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_SIXTY_FOUR_RAW_NOTES = `# Isaiah 64:1-3
# 🔥 A Prayer For God To Come Down
---
## 🌤️ Oh That Thou Wouldest Rend The Heavens

"Rend" means to tear apart violently, not open gently.

The prayer pictures the sky torn open like fabric ripped in two.

It is a desperate plea for God to break into human history visibly.

Nothing quiet or ordinary would satisfy this request.

The prophet wants an unmistakable, dramatic arrival.

🌤️ Rend means tear apart violently
📜 The prayer pictures the sky torn open
🙏 A desperate plea for a visible arrival
📖 Nothing quiet would satisfy this request

## ⛰️ That The Mountains Might Flow Down At Thy Presence

This does not mean literal mountains sliding downhill.

It pictures solid rock melting like wax before a fire.

Mount Sinai trembled and smoked when God came down there in Exodus.

This prayer asks for that same shattering power now.

Nothing in creation could stay unmoved if God showed up this way.

⛰️ Mountains flowing pictures solid rock melting
🔥 It echoes Mount Sinai in Exodus
🙏 The prayer asks for that same power
📖 Nothing could stay unmoved

## 🔥 The Fire Causeth The Waters To Boil

This lists two forces nothing can resist, fire and boiling water.

Fire melts even the hardest rock.

Boiling water shows heat so intense it changes water completely.

Both pictures describe power no created thing can withstand.

The prophet borrows the most extreme images available to him.

🔥 Fire melts even the hardest rock
💧 Boiling water shows overwhelming heat
💪 Both picture power nothing can resist
📖 The prophet uses the most extreme images

## 🏷️ To Make Thy Name Known To Thine Adversaries

"Thy name" means God's reputation and character, not just a label.

"Adversaries" means the enemies of God's people.

The prayer wants God's power displayed publicly, not hidden.

That display would force even enemies to recognize who God is.

🏷️ Thy name means God's reputation
⚔️ Adversaries means enemies of God's people
📢 The prayer wants a public display
📖 It forces even enemies to notice

## 😨 Terrible Things Which We Looked Not For

"Terrible" here means awe inspiring and dreadful, not merely bad.

"Which we looked not for" means these acts came as a surprise.

The prophet is remembering a past moment God acted suddenly and dramatically.

This likely points back to the Exodus and other decisive rescues.

The prayer above asks for that same kind of surprise now.

😨 Terrible means awe inspiring, not simply bad
❓ Looked not for means unexpected
📜 This recalls past dramatic rescues, like the Exodus
📖 The prayer asks for that surprise again

## 🔁 Thou Camest Down, The Mountains Flowed Down At Thy Presence

This repeats almost word for word the request from verse one.

The prophet moves from asking to remembering, this already happened before.

Turning a request into a memory strengthens the case being made.

God has done this before, so the prayer is not asking for something impossible.

🔁 This repeats the request from verse one
🧠 The prophet shifts from asking to remembering
✅ God has done this before
📖 The prayer is not asking the impossible

# Isaiah 64:4-6
# 👂 What No Eye Has Seen
---
## 🌍 Since The Beginning Of The World Men Have Not Heard

This claims something never heard or seen by anyone, in all of human history.

It is a sweeping statement about God's uniqueness.

No other nation's god receives this kind of claim anywhere nearby in scripture.

Paul later quotes a version of this verse in his first letter to the Corinthians.

There Paul applies it to what God has prepared for those who love him.

🌍 A claim spanning all of human history
👑 It marks God as truly unique
📜 Paul later quotes this idea directly
📖 It points to what God prepares

## 👁️ Neither Hath The Eye Seen, O God, Beside Thee

This phrase insists no other god compares to the LORD.

"Beside thee" means there is no rival worth mentioning.

The claim is not modesty, it is a flat statement of fact.

Isaiah repeats this kind of exclusive claim often in the chapters around this one.

👁️ No eye has seen anything like this
🚫 Beside thee means no rival exists
📢 This is a flat claim, not modesty
📖 Isaiah repeats this exclusive claim often

## 🤝 Thou Meetest Him That Rejoiceth And Worketh Righteousness

This describes God coming toward people who do what is right.

God is not pictured here as distant or hard to reach.

"Worketh righteousness" means actually living it out, not merely believing it.

This sets up a sharp contrast with the confession that follows.

🤝 God meets those who do right
🚫 Not pictured as distant or unreachable
💪 Worketh righteousness means living it out
📖 Sets up the confession that follows

## 😠 Behold, Thou Art Wroth, For We Have Sinned

"Wroth" means intensely angry.

This is a sudden confession right in the middle of praising God.

The prophet admits the anger is deserved, not unfair.

Sin is named as the direct cause of God's anger, not a mystery.

😠 Wroth means intensely angry
🙋 A sudden, honest confession
✅ The anger is admitted as deserved
📖 Sin is named as the direct cause

## 👔 All Our Righteousnesses Are As Filthy Rags

"Righteousnesses" here means the good deeds people are proud of.

"Filthy rags" describes cloth stained by uncleanness, not simply old clothing.

Even the best human effort looks that unclean next to God's holiness.

This is one of the most severe self assessments anywhere in Isaiah.

👔 Righteousnesses means proud good deeds
🧻 Filthy rags means stained, unclean cloth
😔 Even the best effort looks unclean here
📖 One of Isaiah's harshest self assessments

## 🍂 We All Do Fade As A Leaf

This compares human life to a leaf that dries up and falls.

A leaf looks alive one season and dead the next.

"Iniquities, like the wind, have taken us away" extends that same picture.

Sin here is described as a wind that carries people away from God.

🍂 Fade as a leaf pictures a short life
🌬️ Iniquities like the wind adds motion
💨 Sin carries people away like wind
📖 Life and sin both point to fragility

# Isaiah 64:7-9
# 🏺 The Potter And The Clay
---
## 📛 None That Calleth Upon Thy Name

This admits a complete breakdown in Israel's devotion.

"Calleth upon thy name" means genuine, earnest prayer.

"Stirreth up himself to take hold of thee" pictures someone actively reaching for God.

The confession says no one is doing either one anymore.

📛 Calleth upon thy name means real prayer
✋ Stirreth up pictures reaching for God
🚫 The confession says no one does this
📖 A complete breakdown in devotion

## 🙈 Thou Hast Hid Thy Face From Us

God's face hidden is a common Old Testament picture for withdrawn favor.

It does not mean God stopped existing or watching.

It means the closeness people once felt is gone.

The prophet blames Israel's own sin for that distance, not God's unfairness.

🙈 Hidden face means withdrawn favor
👀 God still exists and watches
💔 Closeness is what disappeared
📖 Sin, not God, caused the distance

## 🏺 We Are The Clay, And Thou Our Potter

A potter fully controls the shape of the clay on the wheel.

Clay has no say in what it becomes.

This image shifts the tone from accusation toward trust.

Calling God "father" right before this makes the image personal, not just powerful.

🏺 A potter fully shapes the clay
🙊 Clay has no say in its shape
❤️ Father makes the image personal
📖 Trust replaces accusation here

## 🙌 We All Are The Work Of Thy Hand

This claims every person here as something God personally made.

It is not a vague statement about humanity in general.

The prophet uses it to appeal directly to God's own investment in his people.

A craftsman who made something stays invested in it.

🙌 Every person is God's own work
🎯 Not a vague general statement
🔨 It appeals to God's own investment
📖 A craftsman cares about what he made

## 📏 Be Not Wroth Very Sore, O LORD

"Sore" here means severely, not physically painful.

The prayer does not deny the anger from verse five is fair.

It simply asks that anger not go on without limit.

This is a direct plea for mercy, not an argument against justice.

📏 Sore means severely, not painfully
✅ The prayer admits the anger is fair
🙏 It asks that anger not last forever
📖 A plea for mercy, not an argument

## 🧠 Neither Remember Iniquity For Ever

This does not ask God to forget sin happened.

It asks God not to hold it against them permanently.

"Behold, see, we beseech thee" piles up three separate begging words in one line.

That repetition shows how desperate this plea has become.

🧠 Remember here means hold against permanently
🙏 Not asking God to forget it happened
📣 Three begging words stack in one line
📖 The repetition shows real desperation

# Isaiah 64:10-12
# 🏚️ A Burned Temple And A Final Question
---
## 🏙️ Thy Holy Cities Are A Wilderness

This describes cities once full of people now standing empty.

"Wilderness" pictures a place stripped of everything that made it livable.

This likely reflects the aftermath of Babylon's destruction of Jerusalem.

The devastation covers the whole land, not just one building.

🏙️ Cities once full now stand empty
🏜️ Wilderness means stripped and unlivable
📜 Likely refers to Babylon's destruction
📖 The devastation covers the whole land

## 🏔️ Zion Is A Wilderness, Jerusalem A Desolation

"Zion" and "Jerusalem" name the same city from two angles.

Zion points to it as God's chosen dwelling place.

Jerusalem names it as the nation's capital city.

Naming it twice, two different ways, doubles the weight of the loss.

🏔️ Zion names God's chosen dwelling
🏛️ Jerusalem names the nation's capital
🔁 Naming both doubles the loss
📖 One city, two names, one grief

## 🏛️ Our Holy And Our Beautiful House, Where Our Fathers Praised Thee

"Our holy and our beautiful house" means the temple in Jerusalem.

"Where our fathers praised thee" adds generations of memory to the loss.

This was not simply a building.

It was the place a whole family history of worship had happened.

🏛️ The house means the Jerusalem temple
👪 Fathers praised thee adds generational memory
💔 Not simply a building lost
📖 A whole family history of worship

## 🔥 Is Burned Up With Fire

This states plainly that the temple was destroyed by fire.

Second Kings and Second Chronicles record this same destruction under Babylon.

"All our pleasant things are laid waste" widens the loss beyond the temple itself.

Everything the people once valued lies in ruins together.

🔥 The temple was destroyed by fire
📜 Kings and Chronicles record this event
🏚️ Pleasant things widens the loss further
📖 Everything valued lies in ruins

## ✋ Wilt Thou Refrain Thyself For These Things

"Refrain thyself" means hold back from acting.

This is the chapter's final question, aimed straight at God.

It asks whether God will simply stay silent after everything just described.

The whole chapter has been building toward this one direct challenge.

✋ Refrain thyself means hold back
❓ The chapter's final direct question
🤐 It asks if God will stay silent
📖 The whole chapter builds to this challenge

## 🤐 Wilt Thou Hold Thy Peace, And Afflict Us Very Sore

"Hold thy peace" means stay silent, much like refrain in the line before it.

The chapter ends without God answering the question.

That open ending mirrors the whole book's larger structure.

Isaiah keeps pointing forward to a resolution still being waited for.

🤐 Hold thy peace means stay silent
❓ The chapter ends with no answer given
📖 That silence mirrors Isaiah's larger structure
➡️ Resolution is still being waited for`.trim();

export const ISAIAH_SIXTY_FOUR_PERSONAL_SECTIONS = parseIsaiahSixtyFourRawNotes(ISAIAH_SIXTY_FOUR_RAW_NOTES);
