export type JeremiahEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahEighteenRawNotes(rawText: string): JeremiahEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 18:${startVerse}` : `Jeremiah 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Jeremiah 18 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_EIGHTEEN_RAW_NOTES = `# Jeremiah 18:1-4
# 🏺 Down To The Potter's House
---
## 🏺 Arise, And Go Down To The Potter's House

A potter was a common ancient craftsman who shaped wet clay into jars and bowls.

His workshop likely sat in a valley just outside Jerusalem's walls.

God tells Jeremiah to go watch this ordinary craftsman at work.

The lesson is coming from something anyone in the city could see.

🏺 Potter means a craftsman who shapes clay

🏞️ His workshop sat in a valley near Jerusalem

👀 Jeremiah is sent to go watch him

📖 God teaches through something anyone could see

## 🔨 He Wrought A Work On The Wheels

Wrought is an old word that simply means made or worked.

The wheels were two flat stone disks stacked on a spinning axle.

The potter kicked the bottom wheel to spin the top one.

His hands shaped the wet clay as it spun.

This was slow, careful work, not something rushed.

🔨 Wrought means made or worked

⚙️ Wheels were two spinning stone disks

🦶 The potter kicked the wheel to spin it

📖 Shaping clay took patience and skill

## 💥 Was Marred In The Hand Of The Potter

Marred means spoiled or ruined.

Wet clay on a spinning wheel can wobble or collapse without warning.

This flaw was not a punishment for the clay.

It happens sometimes during the shaping itself.

💥 Marred means spoiled or ruined

🌀 Wet clay can wobble or collapse

🚫 The flaw was not a punishment

📖 Flaws can happen during the shaping

## ♻️ So He Made It Again Another Vessel

The potter did not throw the ruined clay away.

He pressed it back together and shaped something new.

The same clay became a different vessel than first planned.

This picture sets up exactly what God says next.

♻️ The potter reused the same clay

🆕 He shaped it into something new

🔄 Nothing about the clay was wasted

📖 This picture sets up God's next words

# Jeremiah 18:5-10
# 🖐️ As The Clay Is In The Potter's Hand
---
## 🖐️ As The Clay Is In The Potter's Hand, So Are Ye In Mine Hand

God now explains what the potter's house was showing Jeremiah.

Israel is the clay, and God himself is the potter.

This does not mean people have no choices of their own.

It means God has full authority to shape the nation's future.

🖐️ God compares himself to the potter

🏺 Israel is compared to the clay

🚫 People still have choices of their own

📖 God has authority over the nation's future

## 🌱 To Pluck Up, And To Pull Down, And To Destroy It

These words picture uprooting a nation completely.

Think of a farmer tearing a plant out by its roots.

God is describing a warning he has announced against a kingdom.

The warning comes before anything actually happens.

There is still time for the outcome to change.

🌱 Pluck up pictures tearing out by the roots

⚠️ This describes a warning, not a final act

⏳ The warning comes before judgment happens

📖 There is still time to change course

## 🔄 I Will Repent Of The Evil

Repent here does not mean God did something wrong.

It means God changes his planned response when people truly change.

A nation that turns from evil can see its warning called back.

God's threats of judgment were never meant to be locked in.

🔄 Repent here means God changes his response

🙅 It does not mean God did wrong

↩️ A real change in people changes the outcome

📖 Warnings were never locked in no matter what

## 🏗️ To Build And To Plant It

This is the exact opposite picture from pluck up and destroy.

Build and plant describe God establishing and growing a nation.

The same God who threatens judgment also promises blessing.

Both promises depend on how people actually respond.

🏗️ Build and plant means establishing a nation

↔️ This mirrors pluck up and destroy

🎁 God also promises blessing, not only judgment

📖 Both promises depend on the people's response

## 🎁 I Will Repent Of The Good

Even a promised blessing is not a blank check.

If a blessed nation turns to disobedience, God can withhold the good he intended.

Judgment can be reversed through repentance.

Blessing can be lost through disobedience.

Neither outcome for Judah is decided yet.

🎁 Even blessing is not a blank check

⚖️ Disobedience can cost a promised blessing

🪞 Judgment and blessing work as mirror images

📖 Judah's outcome is not decided yet

# Jeremiah 18:11-12
# 🚫 There Is No Hope
---
## 🛠️ I Frame Evil Against You, And Devise A Device Against You

Frame and devise both mean planning something on purpose.

God uses the same kind of word used for a potter shaping clay.

This warning is not random anger.

God still calls Judah to turn back before it happens.

🛠️ Frame and devise both mean planning

🖐️ The wording echoes the potter shaping clay

🎯 This warning is deliberate, not random

📖 God still calls Judah back before it happens

## 😤 There Is No Hope: But We Will Walk After Our Own Devices

This is the people's own answer, not something God said about them.

There is no hope sounds like despair, but it actually means defiance.

They are not asking for mercy here.

They are announcing that they intend to keep their own plans.

🗣️ This is the people's own answer

😤 It sounds like despair but means defiance

🚫 They are not asking for mercy

📖 They openly choose to keep their own plans

# Jeremiah 18:13-17
# 🌬️ Forsaking The Ancient Paths
---
## 🌍 Ask Ye Now Among The Heathen

Heathen here simply means the surrounding nations who did not worship the LORD.

God tells Judah to go compare notes with those very nations.

Even those nations stayed loyal to their own false gods.

Judah abandoned the true God, something even pagan nations would find strange.

🌍 Heathen means the surrounding nations

🗣️ God tells Judah to compare notes

🙏 Those nations stayed loyal to their gods

📖 Judah's unfaithfulness is stranger than paganism

## 👰 The Virgin Of Israel Hath Done A Very Horrible Thing

Virgin of Israel pictures the nation as a pure, protected bride.

The title makes Judah's unfaithfulness feel even more shocking.

A very horrible thing is not exaggeration here.

It names real spiritual betrayal in the strongest language available.

👰 Virgin of Israel pictures Judah as a bride

💔 The image makes the betrayal feel sharper

⚠️ This is not exaggerated language

📖 It names a real spiritual betrayal

## 🏔️ Will A Man Leave The Snow Of Lebanon?

Mount Lebanon's snowmelt fed cold, reliable streams that rarely ran dry.

No sane person abandons a steady water source for no reason.

That is the picture God gives of what Judah has done.

They gave up their one reliable source of life.

🏔️ Lebanon's snowmelt fed reliable streams

🚶 No one abandons steady water for nothing

🔀 Judah has done exactly that

📖 They traded reliability for something unsteady

## 💧 Shall The Cold Flowing Waters That Come From Another Place Be Forsaken?

This second question mirrors the first one about Lebanon's snow.

Cold, flowing spring water was rare and highly valued in that region.

No one walks away from a good spring to drink something worse.

Judah did precisely that by turning to lifeless idols instead of the living God.

💧 This second question mirrors the first

⛲ Flowing springs were rare and valued

🚶 No one leaves good water for worse

📖 Judah traded the living God for idols

## 🛤️ Caused Them To Stumble In Their Ways From The Ancient Paths

Ancient paths pictures the tried and tested way God had marked out.

Judah left that road for one not cast up.

Not cast up means a path that was never actually built or leveled.

Idolatry led the people onto unstable, untested ground.

The old way was not outdated, it was simply abandoned.

🛤️ Ancient paths means God's tried and tested way

🚧 Not cast up means a path never built

😵 Idolatry led them onto unstable ground

📖 The old way was abandoned, not outdated

## 🌬️ I Will Scatter Them As With An East Wind

An east wind blowing across Judah came from the desert.

It was hot and destructive to crops.

Scattering Judah this way carries no gentleness in it.

Shew them the back pictures someone turning away, not helping.

It is the posture of an enemy, not a friend.

🌬️ East wind pictures a hot, destructive wind

😣 Scattering like that has no gentleness

🙈 Shew the back means turning away

📖 It is the posture of an enemy

# Jeremiah 18:18-23
# 🗡️ Let Us Smite Him With The Tongue
---
## 🎯 Let Us Devise Devices Against Jeremiah

This plot comes from Jeremiah's own countrymen.

It likely includes priests, elders, and false prophets.

They use the same word devise that God used back in verse eleven.

Their plotting proves Jeremiah's warning right.

🎯 This plot comes from Jeremiah's own countrymen

🔁 They echo the word devise from verse eleven

😬 Their plotting proves the warning right

📖 The irony here is sharp and intentional

## 📜 The Law Shall Not Perish From The Priest, Nor Counsel From The Wise, Nor The Word From The Prophet

This lists the three sources of official guidance in Judah.

Priests taught the law, wise men gave counsel, and prophets spoke God's word.

Jeremiah's enemies claim these voices will always be there instead of him.

They are wrong about that.

All three roles are about to fail Judah at the worst moment.

📜 Priests, wise men, and prophets guided Judah

🗣️ The plotters claim they will always have this

❌ They are wrong about that

📖 All three will fail at the worst time

## 👅 Let Us Smite Him With The Tongue

Smite with the tongue means attacking someone with words, not weapons.

This could mean slander, false accusations, or organized mockery.

Jeremiah faces a coordinated campaign to discredit him.

Words can wound as deeply as any sword.

👅 Smite with the tongue means attacking with words

🗣️ This could mean slander or false accusation

👥 It was a coordinated campaign, not one insult

📖 Words can wound as deeply as weapons

## 💰 Shall Evil Be Recompensed For Good?

Recompensed means paid back or repaid.

Jeremiah reminds God that he pleaded on Judah's behalf.

He once tried to turn away God's own anger from them.

Now those same people repay him with a plot against his life.

💰 Recompensed means paid back

🙏 Jeremiah had pleaded for Judah's sake

🗡️ They repay him with a deadly plot

📖 Faithful service was met with betrayal

## 🕳️ They Have Digged A Pit For My Soul

Digging a hidden pit was an old method for trapping animals or enemies.

Someone would dig it, cover it, and wait for a victim to fall in.

Jeremiah uses this picture for a hidden, deliberate plot against his life.

The danger to him is hidden, not out in the open.

🕳️ Digging a pit was a hidden trapping method

🫥 It was covered so a victim fell in

⚠️ Jeremiah describes a hidden plot against him

📖 The danger is hidden, not open

## 🙏 Deliver Up Their Children To The Famine

This is a formal prayer for justice, not casual bitterness.

The same kind of raw honesty fills the Psalms.

Jeremiah asks God to bring the disaster he already warned about.

This does not mean Jeremiah is acting on personal revenge himself.

He is placing his anger and pain in God's hands instead.

🙏 This is a formal prayer, not bitterness

⚖️ Jeremiah asks for the justice he warned of

🚫 He is not acting on personal revenge

📖 He hands his pain and anger to God

## 🧹 Forgive Not Their Iniquity, Neither Blot Out Their Sin

Iniquity means guilt or wrongdoing.

Blot out means to erase completely, the same picture used for forgiveness.

Jeremiah asks God not to forgive people plotting to kill him right now.

This prayer only makes sense next to their refusal to repent in verse twelve.

Jeremiah is not asking God to be unjust.

He is asking God to treat unrepented sin honestly.

🧹 Iniquity means guilt, blot out means erase

🔁 This connects to their refusal in verse twelve

⚖️ He is not asking God to be unjust

📖 He asks God to treat unrepented sin honestly
`.trim();

export const JEREMIAH_EIGHTEEN_PERSONAL_SECTIONS = parseJeremiahEighteenRawNotes(JEREMIAH_EIGHTEEN_RAW_NOTES);
