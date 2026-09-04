export type PsalmsSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSixteenRawNotes(rawText: string): PsalmsSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 16:${startVerse}` : `Psalms 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 16 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SIXTEEN_RAW_NOTES = `# Psalms 16:1-2
# 🛡️ Trust And Total Devotion
---
## 🙏 Preserve Me, O God

"Preserve" means keep safe, guarded from harm.

David is not asking for a single rescue.

He is asking God to keep him safe over time.

The next words explain why he can ask this at all.

He has already put his full trust in God.

🛡️ Preserve means keep safe over time

🙏 Not a single rescue but ongoing care

🤲 David asks God for lasting protection

📖 His trust is the reason he can ask

## 🫂 For In Thee Do I Put My Trust

Trust here means resting all his safety on God alone.

David is not spreading his hope across many options.

He places everything on one relationship instead.

That kind of trust only makes sense if God is reliable.

The rest of the psalm explains why God can be trusted completely.

🤝 Trust means resting safety on God alone

🎯 Not spread across many options

⚖️ Everything placed on one relationship

📖 The psalm explains why God is reliable

## 💬 O My Soul, Thou Hast Said Unto The LORD

David speaks directly to his own soul here.

This is not a quiet inward thought.

He speaks it as a settled decision.

Talking to his own soul was David's way of preaching truth to himself.

He needed the reminder before making the claims that follow.

🗣️ David speaks directly to his own soul

📣 Not a quiet private thought

✅ He states a settled decision

📖 He preaches truth to himself first

## 👑 Thou Art My Lord

"LORD" in capital letters translates God's personal covenant name.

"Lord" here is a different word, meaning master or owner.

David uses both together in the same verse on purpose.

He is naming God as covenant God first, then as his own master.

Both truths sit side by side in this one line.

👑 LORD in capitals is God's covenant name

🫡 Lord here means master or owner

🔗 David uses both together on purpose

📖 Covenant God and personal master, both true

## 🚫 My Goodness Extendeth Not To Thee

This does not mean David has nothing good to offer.

It means his goodness adds nothing that God actually needs.

God does not depend on human goodness to be complete.

David's devotion benefits people around him, not God himself.

The next verse names exactly who does benefit from it.

🙅 Not a claim of having no goodness

♾️ Means God needs nothing from him

🏔️ God is complete without human goodness

📖 David's goodness will benefit others instead

# Psalms 16:3-4
# ⛪ Saints And Strange Gods
---
## ⛪ The Saints That Are In The Earth

"Saints" means people set apart as holy to God.

It does not mean people who are already perfect.

These are ordinary believers living faithfully in the world.

David turns his devotion toward God's people on earth.

His delight in God overflows into delight in God's people.

⛪ Saints means people set apart to God

🙅 Not people who are already perfect

🌍 Ordinary believers living faithfully on earth

📖 Delight in God overflows to God's people

## 🌟 And To The Excellent, In Whom Is All My Delight

"Excellent" here means noble or honorable in character.

David is not describing wealth or status.

He is describing people whose lives reflect God well.

His deepest delight rests in people who love God.

Not in worldly success or comfort.

That is where he chooses to place his affection.

🌟 Excellent means noble in character

💎 Not about wealth or status

❤️ Delight rests in people who love God

📖 That is where he places his affection

## 💧 Their Sorrows Shall Be Multiplied

Turning to other gods leads to more pain, not less.

"Multiplied" means their sorrows keep piling up over time.

Idolatry promises relief but delivers the opposite.

David is warning, not simply describing.

This sets up why he refuses to follow that path.

💧 Sorrows pile up, not fade away

📈 Multiplied means constantly increasing

🎭 Idolatry promises relief, delivers pain

📖 This warning explains David's refusal

## 🏃 That Hasten After Another God

"Hasten" means running eagerly toward something, not walking slowly.

These worshippers eagerly chase after other gods.

The nations surrounding Israel worshipped many different gods.

David refuses to join that eager pursuit.

His trust stays fixed on the one true God.

🏃 Hasten means running eagerly, not walking

🗺️ Neighboring nations worshipped many gods

🚫 David refuses to join that pursuit

📖 His trust stays fixed on one God

## 🩸 Their Drink Offerings Of Blood

Some ancient religions poured out blood as an offering to their gods.

Israel's law forbade offering blood in worship this way.

Blood represented life itself, set apart for God alone.

David will not take part in this pagan ritual.

His worship stays clean of practices God rejected.

🩸 Blood was poured out as pagan worship

🚫 Israel's law forbade this practice

🕊️ Blood represented life, reserved for God

📖 David keeps his worship clean of this

## 👄 Nor Take Up Their Names Into My Lips

This does not mean David simply avoids gossip.

He refuses to even speak the names of other gods.

Saying a false god's name could be treated as honoring it.

David guards his mouth from giving them any recognition.

Even his words stay loyal to the one true God.

👄 Not just about avoiding gossip

🤐 Refuses to speak other gods' names

🚫 Naming them could honor them

📖 Even his words stay loyal to God

# Psalms 16:5-6
# 🏞️ The LORD Is My Portion
---
## 🍽️ The Portion Of Mine Inheritance

"Portion" was the share of land or property a person received.

The Levites received no land when Israel divided the territory.

God himself was named as their inheritance instead.

David borrows that same picture for his own life.

God is enough, even without land or property.

🍽️ Portion means a person's allotted share

🏕️ Levites received no land in Israel

🙏 God himself was their inheritance

📖 God is enough without land or property

## 🍷 And Of My Cup

A cup here pictures the portion of food and drink given to a guest.

Ancient hosts filled a guest's cup according to their honor.

David pictures God filling his own cup generously.

This is provision pictured as a shared meal, not just land.

God supplies what David actually needs, not merely what he owns.

🍷 Cup pictures a guest's given portion

🤲 Hosts filled cups according to honor

🍞 God fills David's cup generously

📖 God supplies what David needs

## 📏 Thou Maintainest My Lot

A "lot" was the specific piece of land assigned to a family.

Israel divided the promised land by casting lots.

"Maintainest" means God actively protects and keeps that assigned share safe.

This is not a gift God gave once and forgot.

God stays actively involved in guarding what he gave.

📏 Lot means an assigned piece of land

🎲 Land was divided by casting lots

🛡️ Maintainest means God actively protects it

📖 God stays involved in guarding his gift

## 📐 The Lines Are Fallen Unto Me In Pleasant Places

"Lines" were measuring cords used to mark out property boundaries.

Where the lines fell decided which land a family received.

David says his measured share landed in a pleasant place.

He is describing satisfaction with what God assigned him.

Not every allotment felt this good, but his did.

📐 Lines were cords marking land boundaries

🎯 Where lines fell decided the land received

😊 David's measured share landed pleasantly

📖 He is satisfied with what God assigned

## 🎁 I Have A Goodly Heritage

"Heritage" is what gets passed down within a family.

David is not talking about money or land alone.

His heritage is his relationship with God himself.

That is a "goodly," meaning excellent, inheritance no one can take.

Verse five and six together describe complete contentment.

🎁 Heritage means what is passed down

💰 Not about money or land alone

🤝 His heritage is his relationship with God

📖 A goodly inheritance no one can take

# Psalms 16:7-8
# 🌙 Counsel And Confidence
---
## 🧠 Who Hath Given Me Counsel

David credits God directly for his wisdom and guidance.

"Counsel" here means practical direction for how to live.

This wisdom did not come from David figuring it out alone.

He names its source before praising anything else.

Gratitude for guidance opens this section of the psalm.

🧠 Counsel means practical guidance for living

🙌 David credits God as the source

🚫 Not wisdom David figured out alone

📖 Gratitude for guidance opens this section

## 🌃 My Reins Also Instruct Me

"Reins" is the KJV word for the kidneys.

Ancient writers treated the kidneys as the seat of deep emotion and conscience.

David describes his own inner conscience teaching him.

This wisdom comes from deep inside, not just from outward advice.

God shapes David even at the level no one else can see.

🌃 Reins is the old word for kidneys

💭 Ancient writers saw them as conscience

🗣️ David's inner conscience teaches him

📖 God shapes David where no one sees

## 🌙 In The Night Seasons

Nighttime was quiet, without the noise of daily work.

David's conscience was most active in that stillness.

Many people only notice their conscience when things go quiet.

God used David's quiet hours to keep shaping him.

The instruction never really stopped, not even during sleep.

🌙 Night was quiet, free from daily noise

🤫 His conscience was loudest in stillness

👂 Quiet moments reveal what conscience says

📖 God kept teaching him during sleep

## 👁️ I Have Set The LORD Always Before Me

David deliberately keeps God in his sight at all times.

This is not accidental awareness that comes and goes.

He makes a continual choice to remember God is present.

That steady focus becomes the reason for what he says next.

Confidence follows directly from where he keeps his attention.

👁️ David deliberately keeps God in view

🔁 Not occasional but continual awareness

🎯 A steady choice to remember God

📖 Confidence follows from where attention rests

## 🤝 Because He Is At My Right Hand

The right hand position was reserved for a trusted defender.

Ancient courts placed a witness or helper at someone's right side.

David pictures God standing there for him.

This is a legal and protective image, not just physical closeness.

God stands in the place of the strongest possible defense.

🤝 Right hand was the defender's position

⚖️ Courts placed helpers at that side

🛡️ God stands there for David

📖 God takes the strongest defensive position

## 🪨 I Shall Not Be Moved

"Moved" here means shaken loose or knocked off balance.

David is not claiming a trouble free life.

He is claiming stability that outside pressure cannot break.

That confidence comes directly from God standing at his side.

Verse eight ends on steadiness, not on ease.

🪨 Moved means knocked off balance

🌊 Not a promise of a trouble free life

🏔️ Stability that pressure cannot break

📖 The verse ends on steadiness, not ease

# Psalms 16:9-11
# ✝️ Beyond The Grave
---
## 😊 My Heart Is Glad, And My Glory Rejoiceth

"Glory" in this line is a poetic word for David's inner self.

It does not mean fame or honor from other people.

David's whole being responds with joy, heart and soul together.

This gladness flows directly from everything said in the verses before.

Confidence in God produces real, whole person joy.

😊 Glory here means David's inner self

🚫 Not fame or honor from others

❤️ Heart and soul respond together

📖 Trust in God produces whole person joy

## 🕊️ My Flesh Also Shall Rest In Hope

"Flesh" simply means David's physical body.

Even his body, not only his soul, rests secure.

This hope reaches past emotion into physical confidence about the future.

The next verse explains exactly what that hope is about.

Body and soul together trust the same promise.

🕊️ Flesh means David's physical body

😌 His body rests secure, not just his soul

🔮 Hope reaches into physical confidence

📖 The next verse names that hope directly

## ⚰️ Thou Wilt Not Leave My Soul In Hell

This "hell" translates the Hebrew word Sheol, the realm of the dead.

It does not mean the fiery place of eternal punishment.

Sheol simply described where every person went after death.

David is saying God will not abandon him there permanently.

This line points toward resurrection, not simply survival.

⚰️ Hell here translates Sheol, realm of the dead

🔥 Not the fiery place of eternal punishment

🌍 Sheol was where everyone went after death

📖 This points toward resurrection, not survival

## ✝️ Thine Holy One To See Corruption

"Corruption" here means the body decaying after death.

David says God's Holy One will not decay in the grave.

David himself did die and his body did decay over time.

The New Testament quotes this verse about Jesus, not David, in Acts chapter two.

This line points forward to the resurrection of Christ.

✝️ Corruption means the body decaying

⚰️ David's own body did decay

📜 Acts quotes this verse about Jesus

📖 It points forward to Christ's resurrection

## 🛤️ Thou Wilt Shew Me The Path Of Life

"Shew" is the old spelling of the word "show."

God promises to reveal the way that leads to real life.

This life reaches beyond the grave that verse ten just described.

David moves from surviving death to actually living beyond it.

The path itself is a relationship, not a set of directions.

🛤️ Shew is the old spelling of show

🗺️ God reveals the way to real life

⚰️ This life reaches beyond the grave

📖 The path is a relationship, not directions

## 😄 In Thy Presence Is Fulness Of Joy

"Fulness" means complete, overflowing, with nothing missing.

This joy is not partial or occasional happiness.

David locates this complete joy specifically in God's presence.

Nowhere else supplies joy at this level.

Presence with God, not circumstances, is the actual source.

😄 Fulness means complete, overflowing joy

🚫 Not partial or occasional happiness

🙏 Joy is found in God's presence

📖 Presence with God is the true source

## ♾️ At Thy Right Hand There Are Pleasures For Evermore

The right hand again marks the place of highest honor.

"Evermore" means these pleasures never run out or fade.

Earthly pleasures are real but they do not last forever.

David ends the psalm looking past death toward pleasure that never ends.

The psalm that opened asking for safety ends in everlasting joy.

♾️ Evermore means pleasures that never fade

👑 Right hand marks the place of honor

⏳ Earthly pleasures do not last forever

📖 The psalm ends in everlasting joy
`.trim();

export const PSALMS_SIXTEEN_PERSONAL_SECTIONS = parsePsalmsSixteenRawNotes(PSALMS_SIXTEEN_RAW_NOTES);
