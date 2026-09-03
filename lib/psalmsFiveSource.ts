export type PsalmsFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFiveRawNotes(rawText: string): PsalmsFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 5:${startVerse}` : `Psalms 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 5 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FIVE_RAW_NOTES = `# Psalms 5:1-3
# 🌅 Morning Prayer To The King
---
## 👂 Give Ear To My Words, O LORD

"Give ear" means listen closely.

It is more than just hearing in passing.

David pictures someone leaning in to catch every word.

He is not asking for a quick glance at his prayer.

He is asking for God's full attention.

👂 Give ear means listen closely

🎯 More than hearing in passing

🙇 David pictures someone leaning in

➡️ He wants God's full attention

---

## 💭 Consider My Meditation

"Meditation" here does not mean quiet, silent thinking.

The Hebrew word behind it pictures a low murmur or a sigh.

David is voicing his prayer under his breath, not just thinking it.

Ancient prayer was often spoken aloud, even alone.

This is a whispered, aching sound turned toward God.

🗣️ Meditation is not silent thinking

💨 The Hebrew word pictures a sigh

🙏 David speaks his prayer aloud

➡️ A whispered ache turned to God

---

## 👑 My King, And My God

David was Israel's own king.

Yet here he still calls another one his King.

This title points straight to God as the true ruler over David's life.

Kings normally answer to no one on earth.

David chooses to answer to someone greater than his own throne.

👑 David was Israel's own king

🙌 He still calls God his King

📉 Kings normally answer to no one

➡️ It makes the prayer personal

---

## 🪵 In The Morning Will I Direct My Prayer

"Direct" here comes from a word often used for arranging wood on an altar.

Priests arranged the morning sacrifice piece by piece, in careful order.

David pictures his prayer the same way, laid out with the same care.

"In the morning" is repeated twice in this one verse.

That repeats on purpose, marking a fixed, daily habit.

🪵 Direct echoes arranging wood on an altar

🙏 Prayer laid out with care

🔁 Morning is repeated twice

📖 A daily habit, not just once

---

## 👀 And Will Look Up

This does not just mean glancing up at the sky.

It pictures someone watching closely for a response.

Think of a servant watching a master's hand for the next signal.

David is not just praying and walking away.

He keeps watching, expecting God to actually answer.

👀 Not just glancing at the sky

🖐️ Like a servant watching for a signal

🙏 David keeps watching after he prays

➡️ He expects God to answer

# Psalms 5:4-6
# 😠 A God Who Hates Evil
---
## 🚫 Not A God That Hath Pleasure In Wickedness

God takes no delight in wickedness of any kind.

This is not a small detail about God's personality.

It is the reason David can trust how God judges.

A judge who enjoyed evil could never be trusted to oppose it.

God's own nature guarantees he stands against it.

🚫 God takes no delight in wickedness

⚖️ This shapes how he judges

🙅 A dishonest judge could not be trusted

➡️ His nature guarantees he opposes evil

---

## 🏠 Neither Shall Evil Dwell With Thee

"Dwell" means to live with someone as a permanent guest.

Evil is not pictured as a passing visitor here.

It is pictured as something that could never move in with God.

God's presence and evil cannot share the same house.

This sets up the contrast with David in the next verse.

🏠 Dwell means live with as a guest

🚷 Evil is never let in

💡 God's presence and evil cannot share a house

➡️ It sets up a contrast to come

---

## 🧠 The Foolish Shall Not Stand In Thy Sight

"Foolish" in the Psalms rarely means unintelligent.

It means someone who lives as if God does not matter.

"Stand in thy sight" pictures appearing before a king's throne.

That kind of fool cannot remain standing before God's court.

The word describes a moral choice, not a lack of smarts.

🧠 Foolish means living as if God is unreal

🏛️ Stand in thy sight pictures a king's court

🚫 That fool cannot remain standing there

➡️ It describes a choice, not low intelligence

---

## 🔧 Thou Hatest All Workers Of Iniquity

"Iniquity" means sin that is twisted out of shape.

"Workers of iniquity" points to people who practice it, not people who slip once.

God's hatred here is not sudden anger.

It is a settled, permanent opposition to persistent sin.

This is the same holiness named back in verse four.

🔧 Iniquity means sin twisted out of shape

🔁 Workers means people who practice it

🔥 Hatred here is settled, not sudden

📖 Same holiness named in verse four

---

## 📜 Thou Shalt Destroy Them That Speak Leasing

"Leasing" is an old English word for lies.

It has nothing to do with renting property.

The Bible often links lying with deep rebellion against God.

Truth is part of who God is.

Anyone who deals in lies stands against his very character.

📜 Leasing is an old word for lies

🚫 Not related to renting anything

🔥 Lying opposes God's own character

➡️ Truth is part of who God is

---

## 🤢 The LORD Will Abhor The Bloody And Deceitful Man

"Abhor" is stronger than dislike.

It pictures a physical recoiling, like pulling back from something rotten.

"The bloody man" points to someone guilty of violence.

"The deceitful man" points to someone guilty of lies.

Violence and deceit are grouped together as two faces of one evil.

🤢 Abhor means recoiling, not just disliking

🩸 Bloody points to violence

🎭 Deceitful points to lies

➡️ Violence and lies are two faces of evil

# Psalms 5:7-8
# 🙏 Coming In Mercy And Fear
---
## 🔄 But As For Me

This phrase marks a hard turn in the psalm.

David has just described people God opposes.

Now he turns to describe his own approach to God instead.

The contrast is deliberate and sharp.

He does not want to be confused with the wicked he just named.

🔄 Marks a hard turn in the psalm

👥 Shifts from the wicked to David

⚖️ The contrast is deliberate

➡️ David separates himself from them

---

## ⛺ I Will Come Into Thy House In The Multitude Of Thy Mercy

"Thy house" points to the tabernacle, the tent where God's presence dwelt.

Solomon had not yet built the temple in David's own lifetime.

This prayer comes from years before that temple ever stood.

David does not claim he deserves to enter on his own merit.

"Multitude" means a large, overflowing amount, not a small measure.

⛺ Thy house means the tabernacle

🏗️ The temple was not built yet

🙏 David enters through mercy, not merit

📖 Multitude means abundant, not small

---

## 😌 In Thy Fear Will I Worship Toward Thy Holy Temple

"Fear" here does not mean being scared and wanting to run.

It means deep reverence toward someone far greater than yourself.

"Toward thy holy temple" describes the direction David faced to pray.

Worshipers often faced the place where God's presence was believed to dwell.

Reverence and direction are joined together in this one act of worship.

😨 Fear here means reverence, not terror

🙇 Awe toward someone far greater

🧭 Toward describes the direction he faced

📖 Reverence and direction combined in worship

---

## 🧭 Lead Me, O LORD, In Thy Righteousness

David is not asking God to make him righteous through his own effort.

He is asking to be led along the path God's righteousness marks out.

This is a request for guidance, not a claim of self reliance.

The request comes right after David describes his enemies.

He wants direction that will not lead him into their trap.

🧭 Lead me is a request for guidance

⚖️ Righteousness marks the path he wants

🚫 Not a claim of self reliance

➡️ He wants to avoid his enemies' trap

---

## 🛣️ Make Thy Way Straight Before My Face

"Make thy way straight" pictures clearing a road of obstacles.

Ancient roads were often uneven and winding.

David asks God to remove anything that could trip him up.

"Before my face" means directly ahead, in plain view.

He wants a path he can actually see and follow.

🛣️ Straight pictures a cleared road

🪨 Ancient roads had many obstacles

👣 David wants a path he can see

➡️ A road God clears ahead of him

# Psalms 5:9-10
# 🐍 Flattering Tongues, Guilty Hearts
---
## 🗣️ There Is No Faithfulness In Their Mouth

"Faithfulness" here means words that can actually be trusted.

David's enemies cannot be trusted the moment they open their mouths.

This is not one lie here and there.

It describes a pattern with no reliability at all.

Their words carry no real weight, because nothing behind them is true.

🗣️ Faithfulness means words you can trust

🚫 Nothing they say can be trusted

🔁 This is a pattern, not one lie

➡️ Their words carry no real weight

---

## ❤️ Their Inward Part Is Very Wickedness

"Inward part" points to the heart, the hidden center of a person.

This is not describing bad behavior on the surface only.

The wickedness goes all the way down, to what a person really is.

What comes out of their mouth simply matches what is already inside.

The problem was never just their actions.

❤️ Inward part means the hidden heart

🕳️ Wickedness goes all the way down

🗣️ Their words match what is inside

➡️ The problem was never only actions

---

## ⚰️ Their Throat Is An Open Sepulchre

A "sepulchre" is a tomb, a place for the dead.

An open tomb in the ancient world gave off a foul smell.

David pictures their throat, the source of their words, working the same way.

Every word that comes out spreads decay instead of life.

It is one of the most vivid images in the whole psalm.

⚰️ Sepulchre means a tomb for the dead

👃 An open tomb smelled of decay

🗣️ Their throat works the same way

➡️ Their words spread decay, not life

---

## 🐍 They Flatter With Their Tongue

"Flatter" means smoothing someone over with false, pleasant words.

The Hebrew word pictures a tongue made smooth and slippery.

Flattery feels good to hear, which is exactly what makes it dangerous.

It hides the rot described in the line just before it.

Kind sounding words were being used to disguise real harm.

🐍 Flatter means smoothing over with false words

💧 The Hebrew pictures a slippery tongue

😊 It feels good, which makes it dangerous

➡️ Kind words hid real harm

---

## ⚖️ Destroy Thou Them, O God

This is one of the Psalms' prayers that directly asks for judgment.

David is not acting out personal revenge here.

He is asking the rightful judge to do what only God can do.

Prayers like this hand the problem to God instead of human hands.

It is honest anger, brought openly into prayer instead of hidden.

⚖️ A prayer that asks for judgment

🙅 Not personal revenge

🙏 He hands the problem to God

➡️ Honest anger brought into prayer

---

## 🧠 Let Them Fall By Their Own Counsels

"Counsels" means their own plans and schemes.

David asks that their own plans be the very thing that trips them up.

This is not asking God to invent a punishment from nothing.

It is asking their own scheming to backfire on them.

The request fits the crime instead of going beyond it.

🧠 Counsels means their own plans

🪤 He asks their plans to trip them up

🔁 A punishment that fits, not one invented

➡️ Their scheming turns back on them

---

## 🚧 Cast Them Out In The Multitude Of Their Transgressions

"Transgressions" means acts that cross a clear line God has set.

"Multitude" again means a large, overflowing amount.

The same word described God's abundant mercy back in verse seven.

Now it describes their abundant sin instead.

That echo sharpens the contrast between the wicked and the one who trusts God.

🚧 Transgressions means crossing a clear line

📈 Multitude means abundant, not small

🔁 The same word described mercy in verse seven

➡️ The echo sharpens the contrast

---

## 👑 For They Have Rebelled Against Thee

This closing line names the real charge underneath everything else.

Lying, flattery, and scheming are all just symptoms.

The root problem is rebellion against God himself.

Every specific sin traces back to that one refusal.

The psalm treats the wicked as guilty of something bigger than bad behavior.

🎯 Names the real charge underneath

🩹 Lying and flattery are symptoms

👑 The root is rebellion against God

➡️ Something bigger than bad behavior

# Psalms 5:11-12
# 🎉 Joy For Those Who Trust
---
## 🔄 Let All Those That Put Their Trust In Thee Rejoice

The psalm shifts one final time, from judgment to joy.

"Trust" here is the same confidence in God named back in the earlier verses.

Rejoicing is not commanded here as an obligation.

It naturally follows from real trust in a God who can be trusted.

The whole psalm has been building toward this turn.

🔄 The psalm shifts from judgment to joy

🙏 Trust echoes the earlier verses

😊 Joy follows trust naturally

➡️ The psalm has built toward this turn

---

## 📣 Let Them Ever Shout For Joy

"Shout" here pictures a loud, ringing cry, not a quiet smile.

This is the same kind of shout used for victory celebrations.

"Ever" means continually, not just for a single moment.

David pictures ongoing, audible joy, not private, silent contentment.

The wicked spoke lies with their mouths, the righteous shout for joy with theirs.

📣 Shout pictures a loud, ringing cry

🏆 The same word used for victory

🔁 Ever means continually

➡️ Contrasts the lying mouths named earlier

---

## 🛡️ Because Thou Defendest Them

"Defendest" pictures God as a shield placed over someone in danger.

This is not a vague, general kind of protection.

It is active, personal defense against real threats.

The joy in this verse is not blind optimism.

It is a direct response to protection already proven earlier in the psalm.

🛡️ Defendest pictures active protection

🎯 It is personal, not vague

😊 Joy responds to real protection

📖 Already proven earlier in the psalm

---

## 📛 Let Them Also That Love Thy Name Be Joyful In Thee

"Thy name" in the Psalms means God's whole character, not just a word.

To love God's name is to love who God actually is.

This joy is placed "in thee," inside a relationship, not outside circumstances.

The danger from David's enemies has not disappeared.

The joy described here does not depend on that danger going away.

📛 Thy name means God's whole character

❤️ Loving the name means loving who God is

🙏 Joy is placed in God, not circumstances

➡️ It does not depend on danger disappearing

---

## 🙌 For Thou, LORD, Wilt Bless The Righteous

"Bless" here means to actively favor and provide for someone.

"The righteous" are simply the ones who trust and follow God, named earlier.

This is a settled promise, stated as fact.

It answers the fear and danger that opened the whole psalm.

The psalm that began with a desperate cry ends with a confident blessing.

🙌 Bless means active favor and provision

✅ The righteous are those who trust God

📖 A settled promise, stated as fact

➡️ A desperate cry ends in blessing

---

## 🛡️ With Favour Wilt Thou Compass Him As With A Shield

"Compass" means to surround completely, on every side.

"Favour" pictures God's kindness wrapped fully around a person.

A shield in ancient warfare covered a soldier's whole body, not one spot.

David closes the psalm with a picture of total, surrounding protection.

The prayer that began in distress ends in complete security.

🔄 Compass means surround completely

❤️ Favour pictures God's kindness

🛡️ A shield covered a soldier's whole body

📖 The psalm ends in complete security
`.trim();

export const PSALMS_FIVE_PERSONAL_SECTIONS = parsePsalmsFiveRawNotes(PSALMS_FIVE_RAW_NOTES);
