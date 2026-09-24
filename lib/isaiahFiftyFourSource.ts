export type IsaiahFiftyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFiftyFourRawNotes(rawText: string): IsaiahFiftyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFiftyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+54:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 54 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+54:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+54:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 54 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 54,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 54:${startVerse}` : `Isaiah 54:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Isaiah 54 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FIFTY_FOUR_RAW_NOTES = `# Isaiah 54:1-3
# 🎉 Sing, O Barren
---
## 👩 Sing, O Barren, Thou That Didst Not Bear

The word barren describes a woman who could not have children.

Here it stands for Jerusalem after the exile, empty and without people.

A barren woman would not normally sing, she would grieve.

God commands singing before the change has even happened.

👩 Barren means unable to have children

🏙️ Here it pictures empty, exiled Jerusalem

😢 Barren women normally grieve, not sing

📖 God commands joy before the change arrives

## 👰 The Children Of The Desolate

Desolate describes the one who looked abandoned and childless.

Married wife pictures the one who looked settled and secure.

Here those two roles trade places completely.

The abandoned one ends up with more children than the settled one.

Isaiah pictures a family bigger than exile ever allowed.

👰 Desolate means abandoned and childless

🏠 Married wife means settled and secure

🔄 The two roles trade places here

📖 Exile could not limit this family

## ⛺ Enlarge The Place Of Thy Tent

A tent was the movable home most families in this culture actually used.

Enlarge means stretch the tent wider to hold more people.

The command assumes growth that has not happened yet.

Preparing space first is itself an act of faith.

⛺ Tent means the family's movable home

📏 Enlarge means stretch it wider

👨‍👩‍👧‍👦 The command assumes growth is coming

📖 Preparing space first is an act of faith

## 🪢 Lengthen Thy Cords, And Strengthen Thy Stakes

Cords were the ropes that held a tent's walls in place.

Stakes were the wooden pegs driven into the ground to anchor those ropes.

A bigger tent needed longer cords and stronger stakes to stay standing.

The instruction is as practical as it is hopeful.

🪢 Cords are the ropes holding up the tent

🔨 Stakes are the pegs anchoring those ropes

📐 A bigger tent needs stronger anchors

➡️ Hope here comes with practical planning

## 🌱 Thy Seed Shall Inherit The Gentiles

Seed here means descendants, the same word used throughout the promises to Abraham.

Inherit the Gentiles means those descendants will spread out among the nations.

This looks past Israel's own borders toward the whole world.

The promise made to one family was always meant to reach further.

🌱 Seed means descendants, not literal seed

🌍 Inherit the Gentiles means spreading among nations

📜 This echoes the promise to Abraham

📖 One family's promise reaches the whole world

## 🏚️ Make The Desolate Cities To Be Inhabited

Many cities across Judah sat empty after the Babylonian conquest.

This promise pictures people moving back into those same ruined streets.

Rebuilding a city takes more than new walls.

It takes families willing to live there again.

🏚️ Cities sat empty after the conquest

🏘️ This pictures people moving back in

🧱 Rebuilding needs more than new walls

📖 It takes families willing to return

# Isaiah 54:4-10
# 💍 Thy Maker Is Thine Husband
---
## 🚫 Fear Not, For Thou Shalt Not Be Ashamed

Fear not opens many promises across the book of Isaiah.

Ashamed here does not mean simple embarrassment.

It means the public disgrace of a hope that never came true.

God promises this specific hope will not fail.

🚫 Fear not opens many promises in Isaiah

😳 Ashamed means public disgrace, not embarrassment

🙅 This hope will not fail publicly

📖 God names the fear before removing it

## 😵 Neither Be Thou Confounded

Confounded means thrown into confusion, unsure which way to turn.

It describes the disoriented feeling after a plan completely falls apart.

God promises Jerusalem will not end up in that state.

Clarity, not confusion, is the future being promised.

😵 Confounded means thrown into confusion

🧭 It describes not knowing which way to turn

🙅 Jerusalem will not end up this way

📖 Clarity replaces confusion in this promise

## 👶 Thou Shalt Forget The Shame Of Thy Youth

Youth here points back to Israel's earliest history as a nation.

That includes the years of slavery in Egypt.

Forget does not mean the history disappears.

It means that old shame no longer defines how Israel feels about herself.

👶 Youth points to Israel's earliest history

⛓️ That includes the slavery years in Egypt

🧠 Forget does not erase the history

📖 Old shame stops defining her identity

## 💔 The Reproach Of Thy Widowhood

A widow in this culture had lost her protector and provider.

Widowhood here pictures Jerusalem during the exile, when the temple lay in ruins.

It felt like losing the very presence of God.

That grief is the reproach being named here.

👰 Widow means having lost a protector

🏛️ Widowhood pictures Jerusalem during exile

💔 It felt like losing God's presence

📖 That grief is named here directly

## 💍 Thy Maker Is Thine Husband

This verse switches the picture from widow back to wife.

The same God who made Israel now claims her as a husband claims a wife.

Marriage in this culture meant lifelong protection and provision.

The relationship was never actually broken beyond repair.

🔄 The picture switches from widow to wife

💍 God now claims her as husband

🛡️ Marriage meant lifelong protection here

📖 The relationship was never truly broken

## ⚔️ The LORD Of Hosts Is His Name

Hosts here means armies, specifically the armies of heaven.

The title pictures God commanding every angelic force that exists.

This is not a quiet, distant title.

It names raw, unmatched power standing behind the marriage promise.

⚔️ Hosts means armies, specifically heaven's armies

👑 The title pictures God commanding them all

💪 This is a title of raw power

📖 That power backs the marriage promise

## 👨‍👩‍👧 Thy Redeemer The Holy One Of Israel

A redeemer in this culture was a close relative with a legal duty to help.

That relative could buy back land or free a family member.

Calling God a redeemer means He takes on that same family duty.

He is not a distant judge but a close relative acting on Israel's behalf.

👨‍👩‍👧 Redeemer was a relative with a legal duty

🏡 That duty included buying back land

🤝 God takes on that same family role

📖 He acts like family, not a distant judge

## 🚪 A Woman Forsaken And Grieved In Spirit

Forsaken means left behind.

Grieved in spirit means the pain went deep inside.

This is naming exactly how Jerusalem felt during the exile years.

God speaks the feeling out loud before He answers it.

🚪 Forsaken means being left behind

💔 Grieved in spirit means pain that ran deep

🗣️ God names the feeling first

📖 Naming pain comes before healing it

## 📆 For A Small Moment Have I Forsaken Thee

The exile lasted decades, yet God calls it a small moment.

Compared to His everlasting mercy, that span was brief.

Great mercies describes what replaces that short season of judgment.

The size of God's kindness outweighs the size of the punishment.

📆 Exile lasted decades, called a small moment

⚖️ Small compares it to God's endless mercy

🙏 Great mercies replaces the judgment

📖 Kindness outweighs punishment in this promise

## 🙈 In A Little Wrath I Hid My Face

Hiding one's face was an old way of describing withdrawn favor.

It meant God allowed hardship rather than actively rescuing.

Little wrath again names the punishment as limited, not endless.

Everlasting kindness stands in direct contrast to that brief wrath.

🙈 Hid my face means withdrawn favor

⚡ It allowed hardship instead of rescue

⏳ Little wrath means a limited punishment

📖 Everlasting kindness stands opposite to it

## 🌊 As The Waters Of Noah Unto Me

This calls back to God's promise after the flood in the days of Noah.

God swore then that a flood would never destroy the earth again.

That same kind of unbreakable oath now covers Israel's future.

If the flood promise still holds, so does this one.

🌊 This recalls God's promise after Noah's flood

🌈 God swore no flood would return

🤝 The same kind of oath covers Israel now

📖 One unbreakable promise backs up the other

## 📜 The Covenant Of My Peace Shall Not Be Removed

A covenant was a binding, formal promise, not a passing feeling.

Peace here means far more than the absence of conflict.

It means complete wholeness restored between God and His people.

Mountains and hills could vanish before this specific promise would.

📜 Covenant means a binding formal promise

🕊️ Peace here means full wholeness restored

⛰️ Mountains could vanish before this promise breaks

📖 This covenant outlasts creation itself

# Isaiah 54:11-14
# 💎 Thy Foundations With Sapphires
---
## 😣 O Thou Afflicted, Tossed With Tempest

Afflicted means worn down by real, ongoing suffering.

Tossed with tempest pictures a ship thrown around by a violent storm.

Both words describe exactly what the exile years felt like.

God names the pain honestly before describing the rebuilding.

😣 Afflicted means worn down by suffering

🌊 Tossed with tempest pictures a storm tossed ship

📆 Both describe the exile years honestly

📖 God names pain before promising rebuilding

## 🎨 I Will Lay Thy Stones With Fair Colours

Fair colours describes a bright, decorative mortar used to set stones in place.

Builders used it to make a wall look polished, not just functional.

God pictures Himself as the builder here, not a hired worker.

The city being rebuilt will look cared for, not merely repaired.

🎨 Fair colours means bright decorative mortar

🧱 It made a wall look polished

👷 God pictures Himself as the builder

📖 The city will look cared for

## 💎 Lay Thy Foundations With Sapphires

A sapphire is a deep blue precious stone.

It was one of the most valuable stones of that time.

Foundations are the hidden base that holds up everything built on top.

Even the part no one sees gets the finest material here.

God's rebuilding does not cut corners where it would not be noticed.

💎 Sapphire is a deep blue precious stone

🏗️ Foundations are the hidden base of a building

👀 Even the unseen part gets fine material

📖 God does not cut corners here

## 🪨 Thy Windows Of Agates, And Thy Gates Of Carbuncles

An agate is a banded, colorful stone often used for decoration.

A carbuncle is an old word for a deep red gem, close to a garnet.

Ordinary building materials get replaced with precious stones throughout this description.

The whole city is pictured as a treasure, not just a shelter.

🪨 Agate is a banded, colorful stone

🔴 Carbuncle is an old word for red gems

🏙️ Ordinary walls become precious stones

📖 The city is pictured as a treasure

## 🧑‍🏫 All Thy Children Shall Be Taught Of The LORD

This promises direct instruction from God Himself, not secondhand teaching.

Every child gets included in that promise, not a select few.

Centuries later, Jesus quotes this exact verse in the Gospel of John.

He points to it as proof that God draws people to Himself.

🧑‍🏫 God promises direct teaching here

👶 Every child is included, not a select few

✝️ Jesus later quotes this exact verse

📖 It proves God draws people to Himself

## 🔄 Great Shall Be The Peace Of Thy Children

This peace flows directly out of the teaching promised in the line before.

Knowing God well produces a settled, secure life.

That security was exactly what exile had stripped away.

The promise restores what the punishment removed.

🔄 This peace follows the promised teaching

🧠 Knowing God produces a settled life

🏚️ Exile had stripped that security away

📖 The promise restores what was lost

## 🏛️ In Righteousness Shalt Thou Be Established

Established means built to last, not shaky or temporary.

Righteousness here means a right, restored relationship with God.

That relationship is the actual foundation holding everything else up.

Nothing external can be stable if this part is missing.

🏛️ Established means built to last

🙏 Righteousness means a restored relationship with God

🧱 That relationship is the real foundation

📖 Nothing else stands without this part

## ⚖️ Thou Shalt Be Far From Oppression

Oppression describes being crushed under someone else's unfair power.

Terror describes the constant fear that comes with living that way.

Both were daily realities during the years under foreign rule.

This promise removes both, not just softens them.

⚖️ Oppression means being crushed by unfair power

😨 Terror means living in constant fear

📆 Both were daily realities under foreign rule

📖 This promise removes both completely

# Isaiah 54:15-17
# 🛡️ No Weapon Formed Against Thee
---
## ⚔️ They Shall Surely Gather Together, But Not By Me

This pictures future enemies forming alliances against Jerusalem.

But not by me makes something clear right away.

Any such alliance forms without God's permission or support.

An attack without God's backing has already lost its real power.

⚔️ This pictures future enemy alliances

🚫 God gives them no permission or support

📉 An unbacked attack has already lost power

📖 Permission from God is what actually matters

## 📉 Whosoever Shall Gather Together Against Thee Shall Fall For Thy Sake

Fall for thy sake means the failure happens specifically because of Jerusalem.

God ties His own reputation to her protection.

An attack on her becomes an attack God will personally answer.

The outcome is not left up to chance.

📉 Fall for thy sake ties failure to her

🤝 God ties His reputation to her protection

⚔️ Attacking her means answering to God

📖 The outcome is not left to chance

## 🔨 I Have Created The Smith That Bloweth The Coals

A smith was a craftsman who forged metal tools and weapons over hot coals.

This verse credits God with creating that craftsman in the first place.

Even the maker of weapons exists under God's authority.

Nothing threatening can appear without God already knowing about it.

🔨 Smith means a craftsman who forges metal

🔥 He works over hot coals to shape it

👑 God created even the weapon maker

📖 Nothing threatening escapes God's authority

## 💥 I Have Created The Waster To Destroy

Waster here means a destroyer, a person or nation bent on causing ruin.

This is a hard line to sit with.

It credits God with creating even this one.

The point is not that God enjoys destruction.

It is that no destructive power operates outside His control.

💥 Waster means a destroyer bent on ruin

😳 This line credits God with creating even this

🚫 It does not mean God enjoys destruction

📖 No destructive power escapes His control

## 🛡️ No Weapon That Is Formed Against Thee Shall Prosper

Formed connects back to the smith from two verses earlier.

Someone can build a weapon, but it will not succeed here.

This is one of the most quoted promises in the whole book of Isaiah.

The promise is not that no weapon appears, but that none wins.

🔨 Formed connects back to the smith

⚔️ A weapon can be built, not won

🛡️ One of Isaiah's most quoted promises

📖 This promises protection, not calm

## ⚖️ Every Tongue That Shall Rise Against Thee In Judgment

This pictures a courtroom, with tongue meaning an accusing witness.

Rise against thee in judgment means someone bringing formal charges.

Israel is promised the opposite outcome most defendants would expect.

She condemns the accusation instead of losing the case.

⚖️ This pictures a courtroom scene

🗣️ Tongue means an accusing witness

📜 Rise in judgment means formal charges

📖 Israel wins this case instead of losing

## 🎁 This Is The Heritage Of The Servants Of The LORD

Heritage means an inheritance passed down, owned by right and not earned fresh.

Servants of the LORD echoes the suffering servant described back in chapter fifty three.

That chapter's suffering leads directly into this chapter's inheritance.

Suffering came first, and this promise follows it.

🎁 Heritage means an inheritance passed down

👤 Servants of the LORD echoes chapter fifty three

🔗 That suffering leads into this promise

📖 Suffering came before this inheritance

## 🙏 Their Righteousness Is Of Me, Saith The LORD

Righteousness here is not something the servants earned themselves.

It comes from God, the same source behind this whole chapter.

The chapter opened with a barren woman who had nothing to offer.

It closes on that same truth.

Every good thing here comes from God, not from her.

🙏 Righteousness comes from God, not self

🔄 This echoes the chapter's opening picture

👩 The barren woman had nothing to offer

📖 Everything good here traces back to God
`.trim();

export const ISAIAH_FIFTY_FOUR_PERSONAL_SECTIONS = parseIsaiahFiftyFourRawNotes(ISAIAH_FIFTY_FOUR_RAW_NOTES);
