export type JeremiahSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahSevenRawNotes(rawText: string): JeremiahSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 7:${startVerse}` : `Jeremiah 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Jeremiah 7 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_SEVEN_RAW_NOTES = `# Jeremiah 7:1-7
# 🚪 Standing At The Temple Gate
---
## 🚪 Stand In The Gate Of The LORD's House

The temple gate was not a side door.

It was the busiest entrance in Jerusalem during a feast.

Every worshiper heading in to sacrifice had to pass this spot.

Jeremiah chose the one place he could not be ignored.

This warning was meant for the whole nation, not a private audience.

🚪 The gate was Jerusalem's busiest entrance

📢 Jeremiah could not be ignored there

👥 Every worshiper heard this warning

📖 The message targeted the whole nation

## 🔧 Amend Your Ways And Your Doings

"Amend" means to actually change something, not simply feel sorry about it.

God is not asking for an apology.

He is asking for different daily choices from this point forward.

Ways and doings covers everything, private habits and public actions alike.

Talk without changed behavior was already the exact problem God names in this chapter.

🔧 Amend means actually change something

🙏 Not just feeling sorry

📆 New behavior starting today

📖 Doings means every daily choice

## 🏛️ The Temple Of The LORD, The Temple Of The LORD, The Temple Of The LORD

This phrase is repeated three times on purpose.

The people believed the building itself made them safe no matter how they lived.

They treated God's presence in the temple like a magic charm.

Jeremiah quotes their own chant back at them to expose the lie inside it.

A building was never the source of their safety.

Obedience was.

🏛️ The phrase repeats three times

🍀 They treated the temple as magic

🎭 Jeremiah exposes their own chant

📖 Obedience protected them, not the building

## ⚖️ Throughly Execute Judgment Between A Man And His Neighbour

"Execute judgment" means actually carrying out a fair ruling, not just knowing the law.

Ancient Israelite courts sat at the city gate, deciding disputes between neighbors.

A judge could easily favor whoever paid the biggest bribe.

God demands fairness delivered in real cases, not just written on scrolls.

⚖️ Execute judgment means actually ruling fair

🚪 Courts met right at the city gate

💰 Bribery could tilt the outcome

📖 Fairness had to reach real cases

## 🧳 Oppress Not The Stranger, The Fatherless, And The Widow

These three groups show up again and again across the Law as society's most vulnerable people.

A stranger had no family network in Israel to protect him.

A fatherless child and a widow had lost their main legal protector.

Naming all three together makes it impossible to claim ignorance about who needed protection.

🧳 Strangers lacked any family network

🧒 The fatherless lost their protector

👵 Widows lost theirs too

📖 God repeatedly named the vulnerable

## 🏡 Then Will I Cause You To Dwell In This Place

This promise is conditional, not automatic.

God ties continued life in the land directly to how the people treat each other.

The land itself was always a gift tied to the covenant given through Moses.

Verses three through seven form one connected if then statement.

Change how you live, and the land stays yours.

🏡 The promise depends on obedience

📜 The land was tied to the covenant

🔗 Verses three through seven connect

📖 Changed lives secure the land

# Jeremiah 7:8-11
# 🕵️ A House Turned Den Of Robbers
---
## 🚫 Ye Trust In Lying Words That Cannot Profit

"Profit" here means anything that actually helps or benefits a person.

The people trusted a false idea, that the temple building itself guaranteed their safety.

That false trust could not deliver anything real when trouble actually came.

A belief that feels comforting is not the same as a belief that is true.

🚫 Profit means real, lasting benefit

🏛️ Their trust was in the building

❌ False comfort could not deliver

📖 Comfort and truth are not the same

## 🗡️ Will Ye Steal, Murder, And Commit Adultery, And Swear Falsely

God rattles off a list of very specific sins.

Stealing from a neighbor.

Murder.

Adultery.

A false oath sworn in court.

Each one breaks a command given directly at Sinai.

🗡️ Sins named one by one

📜 Each breaks a Sinai command

🎯 Specific, not vague accusations

📖 Naming sin removes every excuse

## 🛡️ We Are Delivered To Do All These Abominations

"Delivered" here does not mean rescued from guilt.

The people believed the temple building was a safe zone where sin carried no consequence.

They walked in after breaking every command just named, then expected total safety inside.

That is not what deliverance from God ever means anywhere else in scripture.

🛡️ Delivered here means falsely safe

🏛️ They treated the temple as a shield

🔁 Sin outside, safety claimed inside

📖 True deliverance was never a free pass

## 🏚️ Become A Den Of Robbers In Your Eyes

"Den of robbers" does not mean the robbery itself happens inside the den.

A den is where robbers run to hide after they steal somewhere else.

The temple had become a hiding place for sin committed all over the city.

Centuries later, Jesus quotes this exact verse while clearing out the temple courts.

🏚️ A den is a hiding place

💰 The robbery happened elsewhere

🛕 The temple hid the guilt

📖 Jesus later quoted this same verse

# Jeremiah 7:12-15
# 🏚️ Remember What Happened To Shiloh
---
## ⛺ Go Ye Now Unto My Place Which Was In Shiloh

Shiloh was the town where the tabernacle stood for generations before Jerusalem's temple existed.

It was Israel's first real worship center, back in the days of Joshua and the judges.

God allowed it to be destroyed after the priests there, Eli's sons, disgraced it with open sin.

Jeremiah tells the people to go look at the ruins with their own eyes.

⛺ Shiloh held the tabernacle first

👨‍👦 Eli's sons disgraced that place

💥 God allowed its destruction

📖 The ruins were still visible

## 🌅 Rising Up Early And Speaking, But Ye Heard Not

"Rising up early" is a Hebrew way of describing steady, deliberate effort.

It pictures someone who gets up before dawn on purpose to make sure a task gets done.

God is describing decades of persistent warning through prophet after prophet.

The people simply refused to listen every single time.

🌅 Rising early means deliberate effort

📢 God warned again and again

🙉 The people refused every time

📖 Patience does not mean approval

## 🏛️ As I Have Done To Shiloh

The threat is not vague.

Jerusalem's temple will suffer the exact same fate as Shiloh's tabernacle.

A sacred building is never automatically safe just because it is sacred.

God's presence had already left one place before, and it could leave this one too.

🏛️ Jerusalem faces Shiloh's exact fate

🚫 Sacred buildings are not automatically safe

👋 God's presence can leave a place

📖 History was about to repeat itself

## 🗺️ The Whole Seed Of Ephraim

"Ephraim" here stands in for the whole northern kingdom of Israel.

That kingdom had already been conquered and scattered by Assyria more than a century earlier.

Judah is being warned that being God's chosen people never made exile impossible.

The north's fate is the clearest possible warning available to the south.

🗺️ Ephraim means the northern kingdom

⚔️ Assyria already conquered them

👑 Chosen status did not prevent exile

📖 The north's fate warns the south

# Jeremiah 7:16-20
# 🕯️ Cakes For The Queen Of Heaven
---
## 🙏 Pray Not Thou For This People

God tells his own prophet to stop interceding for the nation.

Jeremiah's role up to now had always included pleading with God on Israel's behalf.

This command marks a real turning point where judgment can no longer be delayed by prayer.

It shows how serious this specific moment in the nation's history had become.

🙏 Jeremiah is told to stop praying

🔄 Intercession had been his normal role

⏳ Judgment could no longer be delayed

📖 This marks a real turning point

## 👑 To Make Cakes To The Queen Of Heaven

"Queen of heaven" was a pagan goddess, likely Ishtar or Astarte.

This was not one person sneaking off to sin alone.

Children gathered the wood for the fire.

Fathers lit it.

Mothers shaped the cakes for her worship.

Idolatry had become a normal family activity, passed through the whole household.

👑 Queen of heaven was a pagan goddess

👨‍👩‍👧 Whole families joined the ritual

🍰 Cakes were shaped for her worship

📖 Idolatry had become a family habit

## 😠 Do They Provoke Me To Anger

It looks at first like the people are simply making God angry.

God corrects that reading directly in the same verse.

The real damage lands on the people themselves, in their own shame and ruin.

Sin never actually wounds God the way it wounds the person doing it.

😠 It looks like God is the target

🔄 God corrects that idea himself

💔 The real damage falls on them

📖 Sin wounds the sinner most

## 🔥 Mine Anger And My Fury Shall Be Poured Out Upon This Place

This judgment does not stop at people.

It reaches the animals, the trees, and the ground itself.

An entire landscape absorbs the consequence of human sin in this picture.

"Poured out" pictures something total, not a partial or gentle correction.

🔥 Judgment reaches beyond just people

🌳 Animals, trees, and ground are named

💧 Poured out means total, not partial

📖 Sin's damage spreads beyond the sinner

# Jeremiah 7:21-26
# 🐑 Obedience Over Sacrifice
---
## 🔥 Put Your Burnt Offerings Unto Your Sacrifices, And Eat Flesh

This line is sarcastic, not literal instruction.

Burnt offerings were normally supposed to be entirely burned up for God, none kept for food.

God tells them to go ahead and eat the meat instead, since the ritual had lost its meaning.

Going through empty motions was worse than not performing the ritual at all.

🔥 Burnt offerings were meant fully for God

😏 This line drips with sarcasm

🍖 Eating it shows the ritual was empty

📖 Empty ritual is worse than none

## 📜 I Spake Not Unto Your Fathers

This does not mean God never commanded sacrifices at all.

The sacrificial system was given later, once the covenant relationship at Sinai was already established.

God's first and central word to Israel out of Egypt was always about obedience.

Sacrifice was designed to support that relationship, never to replace it.

📜 Sacrifice was not the first word

🤝 Relationship came before the ritual

🔧 Sacrifice was meant to support it

📖 Obedience was always the point

## 🤝 Obey My Voice, And I Will Be Your God, And Ye Shall Be My People

This is the center of the entire covenant, stated as simply as possible.

Obedience was never a side requirement added on top of the relationship.

It was the relationship itself, lived out in daily choices.

Every law and every ritual in the Old Testament flows out from this one sentence.

🤝 This sentence is the covenant's center

📆 Obedience is lived daily, not occasional

🌱 Every law flows from this line

📖 Relationship and obedience were never separate

## 🧠 Walked In The Counsels And In The Imagination Of Their Evil Heart

"Imagination of their evil heart" describes stubborn plans a person builds up on their own.

It is not an accidental slip.

It describes a heart that deliberately invents its own direction instead of asking what God wants.

"Went backward, and not forward" pictures a nation moving away from God instead of toward him.

🧠 Imagination means self made plans

🚫 Not an accidental slip

🔄 A heart chasing its own direction

📖 They moved backward, not forward

## 📜 Since The Day That Your Fathers Came Forth Out Of The Land Of Egypt

God has been sending prophets for centuries, not just through Jeremiah alone.

"Rising up early" appears again here, the same picture of deliberate, repeated effort.

This covers hundreds of years of warnings stretching all the way back to the exodus.

No single generation could claim they never had a chance to hear.

📜 Prophets were sent for centuries

🌅 Rising early means steady persistence

⏳ Warnings stretch back to Egypt

📖 No generation lacked a warning

## 📉 They Did Worse Than Their Fathers

Each generation did not simply repeat the sin of the one before it.

The pattern actually got worse over time, generation after generation.

"Hardened their neck" describes a stubborn refusal to bend, like an ox resisting the yoke.

Sin left unchecked tends to grow rather than stay the same size.

📉 Each generation sank lower

🐂 Hardened neck means stubborn resistance

🔁 Sin grows when left unchecked

📖 Unchecked sin does not stay still

# Jeremiah 7:27-29
# ✂️ Cut Off Thine Hair
---
## 🔮 Thou Shalt Speak All These Words Unto Them

God warns Jeremiah in advance that his preaching will fail to change anyone.

This is not a lack of skill or clarity on Jeremiah's part.

God is preparing him emotionally before he ever opens his mouth to this crowd.

A prophet's job was to speak faithfully, not to guarantee results.

🔮 God warns Jeremiah ahead of time

🗣️ The failure is not about skill

💪 God prepares him emotionally first

📖 Faithfulness mattered more than results

## 💀 Truth Is Perished, And Is Cut Off From Their Mouth

"Perished" here means truth had died out completely, not just weakened a little.

It is not that people occasionally lied.

Honest speech itself had disappeared from ordinary conversation in the nation.

When truth cannot be found in speech, every relationship built on trust starts to break down.

💀 Perished means truth had died out

🗣️ Not occasional lies, total loss

🤝 Trust cannot survive without truth

📖 A nation cannot function without honesty

## ✂️ Cut Off Thine Hair, O Jerusalem, And Cast It Away

Cutting off hair and throwing it away was a visible act of mourning in this culture.

It signaled grief so deep that a person no longer cared about their own appearance.

"Take up a lamentation on high places" means climb somewhere visible and mourn out loud.

This was public grief, not private sorrow kept behind closed doors.

✂️ Cutting hair signaled deep mourning

👀 Appearance no longer mattered

⛰️ High places made grief visible

📖 This mourning was public, not private

# Jeremiah 7:30-34
# 🔥 The Valley Of Slaughter
---
## 🛕 Set Their Abominations In The House Which Is Called By My Name

This repeats the exact accusation from verses ten and eleven, the temple itself defiled.

Placing idols inside God's own house was not a minor detail.

It was a direct insult delivered right at the center of Israel's worship.

The pattern across this whole chapter keeps circling back to this one violation.

🛕 Idols entered God's own house

🔁 This echoes verses ten and eleven

😠 A direct insult at the center

📖 This chapter circles back to it

## 🔥 To Burn Their Sons And Their Daughters In The Fire

"Tophet" was a site in the valley of the son of Hinnom, just outside Jerusalem's walls.

Child sacrifice was offered there to the god Molech, something God says he never commanded.

This valley's name later became the Greek word Gehenna, one of the New Testament's words for hell.

A place built for the worst possible sin became a lasting picture of judgment itself.

🏚️ Tophet sat in the Hinnom valley

🔥 Children were sacrificed to Molech

😨 God never commanded this act

📖 This valley's name became Gehenna

## 🏷️ The Valley Of Slaughter

The very place built for false worship gets renamed for the judgment that follows.

"Valley of slaughter" replaces a name once tied to twisted religious pride.

Bodies would be buried there until there was no more room left.

The place made for sin becomes the place that absorbs its consequence.

🏷️ Tophet gets renamed in judgment

⚰️ Slaughter replaces false worship

📦 Burials fill it until no room remains

📖 The sin site absorbs its own consequence

## 🐦 None Shall Fray Them Away

"Fray" is an old word meaning to scare something off or drive it away.

Normally someone would chase birds and animals away from a body out of basic respect.

Here nobody is left to bother, since the destruction is so complete.

Leaving bodies exposed was considered one of the deepest possible dishonors in this culture.

🐦 Fray means to scare something away

🚫 No one is left to do it

😨 Exposure was a deep dishonor

📖 Total destruction removes even basic care

## 🎉 The Voice Of The Bridegroom, And The Voice Of The Bride

Weddings in this culture were loud, days long celebrations filled with music and joy.

God says that sound will disappear completely from these streets.

Losing weddings means losing the ordinary future itself, since no new families would start there.

A city that once celebrated life is left with nothing left to celebrate.

🎉 Weddings were loud, joyful, and long

🔇 That sound disappears completely

👶 No new families means no future

📖 A city loses its ordinary future
`.trim();

export const JEREMIAH_SEVEN_PERSONAL_SECTIONS = parseJeremiahSevenRawNotes(JEREMIAH_SEVEN_RAW_NOTES);
