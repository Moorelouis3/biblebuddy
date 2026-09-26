export type JeremiahFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahFifteenRawNotes(rawText: string): JeremiahFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 15:${startVerse}` : `Jeremiah 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Jeremiah 15 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_FIFTEEN_RAW_NOTES = `# Jeremiah 15:1-4
# 🛑 Though Moses And Samuel Stood Before Me
---
## 🛑 Though Moses And Samuel Stood Before Me

Moses and Samuel were Israel's two greatest prayer warriors.

Moses turned away God's anger after the golden calf.

Samuel prayed for Israel and God answered him personally.

God says even those two could not change His mind now.

This is not a small comparison.

It says the point of no return has already been passed.

🙏 Moses and Samuel were legendary intercessors
✋ Moses once turned away God's anger
👂 Samuel prayed and God answered him
📖 Even they could not stop this

## ☠️ Such As Are For Death, To Death

God gives Jeremiah a script for the people's question.

They will ask where they should even go.

The answer is not one path but four.

Death, sword, famine, and captivity all wait for someone.

No direction offers an escape from all four.

The choice is no longer whether judgment comes.

It is only which form it takes for each person.

☠️ Four fates are named for the people
⚔️ Death sword famine and captivity divide them
🧭 No direction leads to safety here
📖 The question is only which fate

## 🐺 I Will Appoint Over Them Four Kinds

God names four separate destroyers for this judgment.

The sword represents war and violent death.

Dogs were scavengers that tore at the bodies left behind.

Birds and wild beasts finished what the dogs began.

Every image pictures a body left completely unprotected.

Nothing about this judgment is described as quick or clean.

⚔️ Sword means death by war
🐕 Dogs scavenged the bodies left behind
🦅 Birds and beasts finished the destruction
📖 Every image pictures total exposure

## 👑 Because Of Manasseh The Son Of Hezekiah

Manasseh ruled Judah for over fifty years, longer than any other king.

He filled Jerusalem with idols and forbidden worship.

Second Kings says he also shed a great amount of innocent blood.

His grandson Josiah later tried to undo the damage.

By Jeremiah's time Manasseh had already been dead for decades.

Even so, God says this specific sin still shapes the coming judgment.

👑 Manasseh ruled Judah for decades
🛐 He filled the land with idols
🩸 He shed much innocent blood
📖 That old sin still echoes here

# Jeremiah 15:5-9
# 😢 Who Shall Have Pity Upon Thee
---
## 😢 Who Shall Have Pity Upon Thee

Jerusalem has run out of anyone willing to grieve for her.

No neighbor will stop to ask how she is doing.

No one will mourn what is about to happen to her.

The city that once drew pilgrims now stands utterly alone.

Even simple sympathy has disappeared along with everything else.

😢 No one is left to grieve
🚶 No neighbor stops to ask her state
🏙️ Jerusalem stands completely alone now
📖 Even basic sympathy has run out

## 😩 I Am Weary With Repenting

This does not mean God sinned and needed to turn back to Him.

In the Old Testament repenting can describe God changing His action.

God held back judgment again and again out of mercy.

Now He says He is tired of holding it back.

His patience is not gone.

Its limit has finally arrived.

😩 Repenting here does not mean God sinned
🔁 God held back judgment again and again
⏳ His mercy is now at its limit
📖 The patience was real but has ended

## 🌾 I Will Fan Them With A Fan

A fan here was a farming tool, not something for cooling air.

Farmers used it to toss grain into the wind after harvest.

The wind carried away the light husks called chaff.

Only the heavy, useful grain fell back to the ground.

God pictures scattering His people the same way through exile.

Bereave means to be robbed of children through death or loss.

🌾 A fan was a farming tool here
💨 Wind carried the light chaff away
🌰 Only heavy grain remained behind
📖 Exile scatters the people that same way

## ⚔️ A Spoiler At Noonday

Widows are described as more numerous than the sand of the sea.

That is an exaggeration meant to show massive loss of life.

A spoiler was an attacker who raided and destroyed a town.

Raiders usually struck at night to catch people by surprise.

This one attacked boldly at noon, in open daylight.

That boldness shows total confidence that no one could stop him.

🏖️ Widows outnumber the sand of the sea
⚔️ A spoiler was a raiding attacker
☀️ He struck boldly at noon
📖 Nothing could stop this attack

## 🌅 She That Hath Borne Seven Languisheth

Having seven sons was seen as a full and complete blessing.

This mother loses every one of them before her own life ends.

Languisheth is an old word meaning to grow faint and weak.

Her sun went down in the middle of the day.

This pictures a death that arrived far too early.

👶 Seven sons pictured a complete blessing
💔 She loses every one of them
😮 Languisheth means to grow faint and weak
📖 Her sun set before its time

# Jeremiah 15:10-14
# 😔 Woe Is Me, My Mother
---
## 😔 Woe Is Me, My Mother

Jeremiah suddenly turns from prophecy to raw personal pain.

He wishes out loud that he had never been born.

His calling has made him a man of conflict to everyone around him.

This is not weakness.

It is honesty about how heavy the calling truly is.

😔 Jeremiah wishes he had never been born
⚔️ His calling made him a man of conflict
😮 This is honest pain, not weakness
📖 Even faithful prophets grew this tired

## 💰 I Have Neither Lent On Usury

Usury means charging interest on a loan.

In this culture, lending or borrowing at interest often caused deep resentment between neighbors.

Jeremiah says he has done neither one.

He has not caused that kind of resentment toward anyone.

Yet the whole land still turns against him anyway.

His suffering is not earned by anything he has done.

💰 Usury means charging interest on a loan
🤝 Lending at interest often bred resentment
🙅 Jeremiah is guilty of neither
📖 His suffering was never earned

## 🙏 It Shall Be Well With Thy Remnant

God interrupts Jeremiah's despair with a direct personal promise.

A remnant is the surviving portion left after judgment falls.

God promises Jeremiah himself will be kept safe within it.

He even promises Jeremiah's enemies will one day treat him well.

This comes in the middle of Jeremiah's worst moment of pain.

🙏 God answers with a direct promise
🌱 A remnant is a surviving portion
🛡️ Jeremiah himself is promised safety
📖 Comfort arrives in his worst moment

## ⚙️ Shall Iron Break The Northern Iron And The Steel

This is a rhetorical question, and the answer is no.

Ordinary iron cannot break a stronger iron or steel.

Many scholars believe the northern iron pictures Babylon's invading army.

Babylon's forces approached Judah from the north.

Judah has no strength capable of standing against that kind of power.

❓ The question expects the answer no
🔩 Ordinary iron cannot break stronger iron
🧭 Northern iron likely pictures Babylon's army
📖 Judah has no power to resist it

## 💸 Give To The Spoil Without Price

Without price means given away for free, not sold for anything.

This is not a fair trade or a payment of any kind.

It is a complete loss with nothing received in return.

Every treasure Judah built up will be handed to enemies at no cost.

The line covers every kind of sin across the whole nation.

💸 Without price means given away free
🏚️ Nothing is received in return
🔥 Every treasure is simply lost
📖 The loss covers the whole nation

## 🔥 A Land Which Thou Knowest Not

God says the people will be forced into a foreign, unfamiliar land.

That land is Babylon, though it is not named directly in this verse.

Being marched into exile among strangers was a fresh kind of loss.

A fire kindled in anger pictures judgment that cannot be put out.

That fire is described as burning specifically upon them.

🌍 They are forced into an unknown land
🔗 Exile meant leaving home for strangers
🔥 God's anger is pictured as fire
📖 That fire is aimed straight at them

# Jeremiah 15:15-18
# 🙏 Revenge Me Of My Persecutors
---
## 🙏 Revenge Me Of My Persecutors

Jeremiah prays boldly and asks God to remember him personally.

He asks God to act in justice against those persecuting him.

This is an appeal to God as judge.

It is not personal revenge carried out by Jeremiah himself.

Honest prayer like this is allowed even when it sounds harsh.

🙏 Jeremiah asks God to remember him
⚖️ He appeals to God as judge
🚫 This is not personal revenge
📖 Honest, hard prayer is still welcome

## ⏳ Take Me Not Away In Thy Longsuffering

Longsuffering describes God's patience that holds back deserved punishment.

Jeremiah fears being swept away along with the people God is still being patient toward.

He has been faithful, yet judgment does not always separate the faithful from the guilty.

He asks God specifically to remember his loyalty.

This is a plea to not be lost in collective judgment.

⏳ Longsuffering means God's patience toward sin
😟 Jeremiah fears being swept away too
🎗️ He has stayed faithful the whole time
📖 He asks not to be lost with them

## 📜 Thy Words Were Found And I Did Eat Them

Eating God's words is a picture, not something Jeremiah did literally.

It means he took God's message in completely and let it become part of him.

This image appears again later when Ezekiel is told to eat a scroll.

God's word became Jeremiah's joy even while his calling brought him constant pain.

He is called by God's own name, which gave his hard life real meaning.

📜 Eating the word means fully receiving it
📚 Ezekiel later uses this same picture
😊 God's word brought Jeremiah real joy
➡️ His identity rests in God's name

## 😞 I Sat Not In The Assembly Of The Mockers

Jeremiah could not join in normal social life or celebration.

His calling kept him apart, described here as God's own hand upon him.

Indignation means a strong, righteous anger, not a small annoyance.

He carried that anger because of the sin he had to preach against.

His isolation was not a personal failure.

It was simply part of the cost of his calling.

😞 Jeremiah could not join normal life
✋ His calling set him apart from others
🔥 Indignation means strong righteous anger
📖 His isolation was the cost of his calling

## 💧 As Waters That Fail

Jeremiah asks God directly whether His promises can be trusted.

This is a bold, honest complaint, not a polite prayer.

A wadi was a streambed that ran with water only part of the year.

Travelers who counted on a wadi sometimes found it completely dry.

Jeremiah fears God's help will disappear the same way, right when he needs it most.

😠 Jeremiah questions God directly here
🏜️ A wadi could run completely dry
😟 He fears God's help failing too
📖 This is raw honesty, not disrespect

# Jeremiah 15:19-21
# ⚖️ If Thou Take Forth The Precious From The Vile
---
## ⚖️ If Thou Take Forth The Precious From The Vile

God answers Jeremiah's raw complaint with both correction and comfort.

Taking the precious from the vile is a refining picture.

It means separating what is valuable from what is worthless.

God calls Jeremiah to keep speaking truth instead of matching the people's complaints.

If he does, God promises to restore him fully as His spokesman.

⚖️ God answers with correction and comfort
💎 Precious and vile pictures refining metal
🗣️ Jeremiah must keep speaking truth
📖 God promises to restore his role

## 🛡️ A Fenced Brasen Wall

Brasen is an old word for bronze, one of the strongest metals available then.

A fenced wall means a wall that is fully fortified and hard to break through.

God promises Jeremiah this same kind of unbreakable defense against his enemies.

This echoes the promise God gave Jeremiah back when he was first called in chapter one.

People will fight against him, but they will not be able to defeat him.

🥉 Brasen means bronze, a strong metal
🛡️ A fenced wall pictures total defense
⚔️ Enemies fight him but never win
📖 This echoes his call in chapter one

## 🕊️ I Will Redeem Thee Out Of The Hand Of The Terrible

Redeem means to buy back or rescue someone at a cost.

Terrible here is an old word for violent men who inspire terror.

It does not simply mean unpleasant or mildly annoying.

God repeats His promise of rescue one final time.

The chapter that began with no escape ends with a renewed promise of safety.

💰 Redeem means to rescue at a cost
😨 Terrible here means violent, not just unpleasant
🔁 God repeats His promise of rescue
📖 Despair opens the chapter, promise closes it
`.trim();

export const JEREMIAH_FIFTEEN_PERSONAL_SECTIONS = parseJeremiahFifteenRawNotes(JEREMIAH_FIFTEEN_RAW_NOTES);
