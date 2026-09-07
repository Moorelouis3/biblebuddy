export type PsalmsFortyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFortyRawNotes(rawText: string): PsalmsFortyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFortyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+40:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 40 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+40:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+40:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 40 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 40,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 40:${startVerse}` : `Psalms 40:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 40 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FORTY_RAW_NOTES = `# Psalms 40:1-3
# 🪨 Lifted Out Of The Pit
---
## 🎣 I Waited Patiently For The LORD

The Hebrew behind this line repeats the same word for wait twice in a row.

That doubling is how Hebrew poetry shows real intensity.

David is not describing a short pause.

He is describing a long season of waiting on God to act.

🎣 The Hebrew repeats "wait" twice
⏳ That doubling shows real intensity
🕰️ This was a long season
📖 Patience here is not passive

## 🕳️ Brought Me Up Also Out Of An Horrible Pit

A pit in the Psalms often pictures the grave or a place of total hopelessness.

Horrible here carries the sense of a roaring, crashing depth.

David is not describing a small hole he tripped into.

He is describing a place he could not climb out of on his own.

🕳️ Pit pictures the grave or hopelessness
📢 Horrible suggests a roaring, frightening depth
🚫 Not a small hole he tripped into
📖 He could not escape it alone

## 🥾 Out Of The Miry Clay

Miry clay means thick, sucking mud.

This kind of mud traps feet with every step.

Mud like this does not just block movement.

It slowly pulls a person further down.

🥾 Miry clay means thick, sucking mud
🐾 It traps feet with every step
⬇️ It slowly pulls a person down
📖 Pit and mud together mean total entrapment

## 🪨 Set My Feet Upon A Rock

A rock stands in direct contrast to the mud named just before it.

Mud gives way underfoot, but a rock holds firm no matter what pushes against it.

God did not just pull David out.

He gave him solid ground to stand on afterward.

🪨 A rock contrasts with the mud
🌬️ A rock does not move under pressure
🦶 God gave him solid ground after
📖 Rescue includes a new place to stand

## 🚶 Established My Goings

Goings here means his steps through life.

Established means made steady and secure.

David is not only describing where he stands now.

He is describing how he moves forward from here.

🚶 Goings means his steps through life
🛡️ Established means made steady and secure
🦶 Not just standing, but moving forward
📖 God secures the whole path ahead

## 🎶 He Hath Put A New Song In My Mouth

A new song in the Psalms usually marks a fresh act of God worth a fresh way of praising him.

David is not simply relieved.

He has something worth singing about that did not exist before this rescue.

The song did not come from nowhere.

It came directly out of the pit and off the rock.

🎶 A new song marks a fresh rescue
😊 More than simple relief
🎵 The song did not exist before
📖 It comes directly from the rescue

## 👀 Many Shall See It, And Fear, And Shall Trust In The LORD

David's rescue was never meant to stay private.

Other people watching what God did for him would learn to fear him rightly.

Fear here means reverence and awe, not terror.

One person's rescue becomes a public lesson about who God is.

👀 The rescue was never private
😮 Fear means reverence, not terror
🙌 Others learn to trust from watching
📖 One rescue teaches many people

# Psalms 40:4-5
# 🙌 The Trust That Brings Blessing
---
## 🙌 Blessed Is That Man That Maketh The LORD His Trust

Blessed means truly happy in the deepest sense.

David just finished describing his own rescue in the verses before this one.

Now he turns that personal story into a truth for anyone who trusts God the same way.

The blessing is tied to where a person places their trust.

🙌 Blessed means deep, real happiness
🔄 David turns his story into a truth
🎯 The blessing follows a specific trust
📖 Trust in God is the deciding factor

## 🚫 Respecteth Not The Proud, Nor Such As Turn Aside To Lies

Respecteth here means to turn toward something for help or approval.

The proud are people who trust their own strength instead of God.

Turn aside to lies describes people who chase false gods or false hopes for security.

A person who trusts God stops looking to either of these for rescue.

🚫 Respecteth means turning toward for help
💪 The proud trust their own strength
🎭 Lies means false gods or false hopes
📖 Trusting God replaces both of these

## 🌌 Thy Wonderful Works Which Thou Hast Done

David shifts from talking about people to speaking directly to God.

Wonderful works points to specific, real actions God has already taken.

David's own rescue from the pit is one example among many others he has in mind.

The word many signals this list is long before he has even started naming things.

🌌 Wonderful works means real, specific actions
🗣️ David now speaks directly to God
🕳️ His own rescue is one example
📖 Many signals a long list already

## 🔢 They Are More Than Can Be Numbered

David tries to list God's works and thoughts.

He gives up partway through.

This is not a failure of memory or effort.

The point is that God's care for him is too large to count.

🔢 David tries to count and stops
🙅 Not a failure of memory
♾️ God's care is too large to count
📖 Some praise is better left immeasurable

# Psalms 40:6-8
# ❤️ Obedience Instead Of Sacrifice
---
## 🐑 Sacrifice And Offering Thou Didst Not Desire

David is not saying God hates the sacrifice system he commanded in the law.

He is saying God cares more about the heart behind an offering than the offering itself.

Burnt offerings and sin offerings were the two main categories of animal sacrifice under the law.

Obedience from the heart was always the real target behind those rituals.

🐑 God is not rejecting sacrifice itself
❤️ He cares more about the heart behind it
🔥 Burnt and sin offerings were the main categories
📖 Obedience was always the real target

## 👂 Mine Ears Hast Thou Opened

This phrase pictures ears that were unstopped, made able to truly hear and obey.

Many scholars connect it to an old custom of marking a servant for lifelong service through the ear.

Either way, the meaning centers on a will made ready to listen.

This opened ear replaces the sacrifices named just before it.

👂 Opened ears means made able to obey
🔨 Many scholars link this to a servant custom
🙉 The meaning centers on willing obedience
📖 A ready will replaces empty ritual

## 📜 In The Volume Of The Book It Is Written Of Me

The volume of the book means a scroll, most likely the law given through Moses.

David believed his own calling was already anchored in what God had revealed there.

The New Testament book of Hebrews later applies this exact verse to Jesus and his mission.

One private prayer becomes, generations later, a description of someone far greater than David.

📜 The volume of the book means a scroll
📚 It likely points to the law of Moses
🙏 David saw his life anchored there
📖 Hebrews later applies this verse to Jesus

## ❤️ I Delight To Do Thy Will

Delight means real pleasure and joy, not grim duty forced from the outside.

David is describing obedience that comes from wanting to obey.

This is the fulfillment of the opened ears named two verses earlier.

Willing joy, not pressure, is what God was always after.

❤️ Delight means real joy, not grim duty
🙋 Obedience here is wanted, not forced
👂 This fulfills the opened ears from before
📖 Willing joy was always the goal

## 📖 Thy Law Is Within My Heart

Having God's law within the heart means it has moved from an outside rule to an inside desire.

This is different from simply knowing the law or obeying out of fear.

David describes the law as something he carries, not something he only consults.

An internalized law shapes a person's choices even when no one else is watching.

📚 Within the heart means fully internalized
😨 Different from obeying out of fear
🎒 David carries the law, not just consults it
📖 It shapes choices even unseen

# Psalms 40:9-10
# 📣 Righteousness Preached Openly
---
## 📣 I Have Preached Righteousness In The Great Congregation

The great congregation refers to Israel gathered together for public worship.

David is not describing a private devotional moment kept to himself.

He publicly declared what God had done and who God is.

Faith proven true in private became a message shared in public.

📣 The great congregation means public worship
🤫 Not a private, hidden devotion
🗣️ He declared God publicly, out loud
📖 Private faith became a public message

## 🔓 I Have Not Refrained My Lips

Refrained means held back or restrained.

David insists he did not stay quiet when he had the chance to speak up for God.

This directly answers back to the silence he wrestled with in Psalm thirty nine.

Here, speaking up is treated as faithfulness, not failure.

🔓 Refrained means held back
🗣️ David did not stay quiet
🔁 This answers the silence in Psalm thirty nine
📖 Speaking up here is faithfulness

## 🔐 I Have Not Hid Thy Righteousness Within My Heart

David lists three things he refused to hide: righteousness, faithfulness, and salvation.

Hiding these things would have meant keeping God's goodness to himself.

Instead, he treated what God had done as something meant to be shared.

Truth withheld helps no one but the person holding it.

🔐 David refused to hide three things
🎁 Hiding them would keep God's goodness private
📢 He shared it instead of storing it
📖 Withheld truth helps no one

## 💞 Thy Lovingkindness And Thy Truth

Lovingkindness translates a rich Hebrew word for loyal, covenant love that does not quit.

Truth ties God's faithfulness to his honesty.

David lists these right alongside righteousness, faithfulness, and salvation from the same verse.

Together they describe the full character of the God David refuses to stay quiet about.

💞 Lovingkindness means loyal, covenant love
✅ Truth means God keeps his word
📋 These are listed with the other virtues
📖 Together they describe God's full character

# Psalms 40:11-13
# 🏃 An Urgent Plea For Help
---
## 🙏 Withhold Not Thou Thy Tender Mercies From Me

The psalm turns here, moving from praise into an urgent request.

David asks God not to hold back the same lovingkindness and truth he just finished praising.

Tender mercies pictures compassion the way a parent feels toward a helpless child.

Praise and need are not opposites in this prayer.

🙏 The psalm turns from praise to request
🔄 He asks for what he just praised
👶 Tender mercies pictures parental compassion
📖 Praise and need can coexist

## 🌊 Innumerable Evils Have Compassed Me About

Compassed means surrounded on every side.

Innumerable means too many to count, echoing the same word used for God's works back in verse five.

David is describing being overwhelmed from every direction at once.

Trouble here matches the same scale David once used to describe God's goodness.

🌊 Compassed means surrounded completely
🔢 Innumerable means too many to count
🔁 This echoes verse five's wording
📖 Trouble here matches goodness in scale

## 💇 More Than The Hairs Of Mine Head

This comparison names something genuinely uncountable in everyday experience.

David uses it to describe how many specific sins are weighing on him right now.

So that I am not able to look up describes shame heavy enough to bend the body downward.

Guilt here is not abstract.

💇 Hairs of the head means truly uncountable
⚖️ It measures his sins, not just troubles
⬇️ Shame bends his body downward
📖 Guilt here feels physically crushing

## 🏃 Make Haste To Help Me

David repeats O LORD twice in one short verse.

His request grows shorter as the danger feels closer.

Make haste is not polite patience, it is an urgent plea for God to move now.

The long list of praise and confession all narrows down to this one direct ask.

🏃 Make haste means urgent, not eventual
🔁 O LORD repeats twice in one verse
🎯 Everything narrows to one direct ask
📖 Desperate prayer can be this simple

# Psalms 40:14-17
# 🙇 Enemies Shamed, God Magnified
---
## 😳 Let Them Be Ashamed And Confounded Together

David names real enemies, people actively trying to destroy his life.

Confounded means thrown into confusion, not just embarrassed.

This is a request for God to reverse the danger David is actually in.

Naming an enemy honestly to God is different from taking justice into his own hands.

😳 Confounded means thrown into confusion
⚔️ These are real enemies, not rivals
🔄 David asks God to reverse the danger
📖 Honest naming differs from taking revenge

## 🔙 Driven Backward And Put To Shame

Driven backward pictures an army in retreat.

David wants those planning his harm to fail completely and visibly.

Public shame here works the way public praise did earlier.

What is hidden in a scheme, he wants exposed in failure.

🔙 Driven backward pictures a retreating army
🎯 He wants their plans to fail completely
👀 Shame here is meant to be public
📖 Hidden plans exposed by public failure

## 😏 Aha, Aha

This phrase mimics mocking laughter.

It is the exact sound of an enemy gloating over someone's downfall.

David quotes their taunt directly instead of just describing it.

He wants God to silence the very sound of that mockery.

😏 Aha, aha mimics mocking laughter
🗣️ David quotes the taunt directly
👂 The direct quote makes it feel immediate
📖 He wants that mockery silenced

## 🙌 Let All Those That Seek Thee Rejoice

The tone shifts sharply from enemies to a very different group of people.

Seek thee describes people whose whole pursuit is God himself, not just his help.

David wants their reaction to be joy, not fear.

The LORD be magnified means people speaking about God in a way that shows how great he is.

🙌 The tone shifts to a new group
🔍 Seek thee means pursuing God himself
😊 Their expected reaction is joy
📖 Magnified means God is shown as great

## 🙇 But I Am Poor And Needy

Poor and needy describes total dependence, not necessarily a lack of money.

David returns to plain honesty about his own condition.

He does not present himself as strong or self sufficient at any point in this closing.

Honest weakness, not performed strength, is where this psalm chooses to land.

🙇 Poor and needy means total dependence
🔁 David returns to plain honesty
💪 He never claims to be self sufficient
📖 Honest weakness is where he lands

## ⏰ Make No Tarrying, O My God

Tarrying means delaying or lingering longer than needed.

This closing line echoes the urgency of make haste back in verse thirteen.

David ends the psalm exactly where it started, waiting on God.

The psalm that opened with patient waiting closes with an urgent plea not to wait any longer.

⏰ Tarrying means delaying too long
🔁 This echoes make haste from verse thirteen
🔄 The psalm ends where it started, waiting
📖 Patient waiting becomes urgent pleading
`.trim();

export const PSALMS_FORTY_PERSONAL_SECTIONS = parsePsalmsFortyRawNotes(PSALMS_FORTY_RAW_NOTES);
