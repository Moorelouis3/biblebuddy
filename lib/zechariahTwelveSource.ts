export type ZechariahTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseZechariahTwelveRawNotes(rawText: string): ZechariahTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ZechariahTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Zechariah\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Zechariah 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Zechariah\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Zechariah\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Zechariah 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Zechariah 12:${startVerse}` : `Zechariah 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Zechariah 12 sections, received " + sections.length);
  }

  return sections;
}

const ZECHARIAH_TWELVE_RAW_NOTES = `# Zechariah 12:1-3
# 🪨 Jerusalem Becomes A Burden
---
## 📜 The Burden Of The Word Of The LORD For Israel

A "burden" in prophetic books does not mean a heavy object to carry.

It means a weighty message, almost always announcing coming judgment.

Zechariah opens this chapter with that word on purpose.

The reader is being warned that something serious is coming.

📜 Burden means a weighty prophetic message

⚠️ It usually announces coming judgment

🔔 Zechariah opens with this word on purpose

📖 A serious warning is coming

## 🌌 Which Stretcheth Forth The Heavens, And Layeth The Foundation Of The Earth

Before saying a single word of warning, God names Himself as the one who made everything.

Stretching out the heavens and laying the earth's foundation describes the first act of creation.

Naming that power first gives weight to everything God says next.

The same God who built the world has full authority to judge it.

🌌 God names Himself as creator first

🏗️ Stretching heavens describes the act of creation

💪 Creation power backs this warning

📖 The maker has authority to judge

## 🍷 A Cup Of Trembling Unto All The People

A cup here does not mean a drink shared at a table.

In this kind of prophecy, a cup pictures a forced punishment someone must swallow.

Jerusalem becomes that cup for the nations surrounding it.

Whoever lifts this cup against Jerusalem will find it brings trembling instead of victory.

🍷 Cup pictures a forced punishment

😨 Trembling means shaking with fear

🌍 Jerusalem becomes that cup for nations

📖 Attacking Jerusalem brings trembling, not victory

## 🪨 A Burdensome Stone For All People

This pictures Jerusalem as a stone far too heavy for anyone to lift.

Anyone who tries to move it against its will only injures themselves.

The phrase cut in pieces pictures nations harming themselves by attacking the city God protects.

The warning is aimed at every nation that gathers against Jerusalem, not just one.

🪨 Jerusalem becomes an impossibly heavy stone

💪 Lifting it only injures the lifter

⚔️ Nations harm themselves attacking this city

📖 The warning reaches every nation, not one

# Zechariah 12:4-6
# 🔥 The LORD Arms Judah For Battle
---
## 🐎 I Will Smite Every Horse With Astonishment, And His Rider With Madness

Horses and riders were the strongest weapon an ancient army could bring to battle.

Astonishment here means a sudden, confusing panic that spreads through an army.

God strikes the enemy's greatest strength first, not their weakest point.

An army that cannot see straight or think straight cannot fight at all.

🐎 Horses were an ancient army's strongest weapon

😵 Astonishment means sudden battle panic

🎯 God strikes their greatest strength first

📖 A confused army cannot fight

## 👁️ I Will Open Mine Eyes Upon The House Of Judah

Enemy horses go blind in this same verse.

God's own eyes stay wide open over Judah at the same time.

This is a direct contrast between judgment on one side and watchful care on the other.

God does not simply win the battle for Judah.

He personally watches over them through the entire fight.

👁️ God's eyes stay open over Judah

⚖️ Judgment and care appear side by side

🛡️ God does more than win the battle

📖 He watches over them personally

## 👑 The Governors Of Judah Shall Say In Their Heart

Governors here means the local leaders in charge of Judah's towns and districts.

Earlier in this chapter, Jerusalem looked weak and surrounded.

Now even its regional leaders speak with new confidence.

Their strength comes from the LORD of hosts, not from their own army.

👑 Governors means local district leaders

😨 Jerusalem had looked weak and surrounded

💪 Leaders now speak with new confidence

📖 Their strength comes from the LORD

## 🔥 Like An Hearth Of Fire Among The Wood, And Like A Torch Of Fire In A Sheaf

A hearth is a small fire pit for burning wood.

A sheaf is a tied bundle of cut grain.

Both pictures describe something small catching fire and spreading fast.

Judah's leaders become exactly that kind of spark among the nations around them.

A force that looked small suddenly consumes everything in its path.

🔥 A hearth is a small contained fire

🌾 A sheaf is a bundle of grain

⚡ Both pictures spread fire fast

📖 A small force consumes everything nearby

## 🏙️ Jerusalem Shall Be Inhabited Again In Her Own Place

This promise looks past the coming battle to the city's future.

Jerusalem will not just survive the attack described in this chapter.

It will be lived in again, settled and secure in its own location.

The battle ends in restoration, not permanent ruin.

🏙️ This promise looks past the battle

🛡️ Jerusalem survives the attack

🏠 The city gets lived in again

📖 Restoration follows the battle, not ruin

# Zechariah 12:7-9
# 🛡️ The LORD Defends Jerusalem
---
## ⛺ The LORD Also Shall Save The Tents Of Judah First

Tents here means the ordinary towns and countryside of Judah, not the royal city.

Jerusalem was the capital, where the king and the Temple both stood.

God chooses to rescue the humble countryside before the famous capital.

Honor here does not follow the usual order of importance.

⛺ Tents means Judah's ordinary countryside

🏛️ Jerusalem was the famous royal capital

🥇 God saves the humble countryside first

📖 Honor skips the usual order

## 📏 Do Not Magnify Themselves Against Judah

Magnify themselves here means to boast or claim superiority over someone else.

The royal family and the capital held the most honor in the land.

Without this order, pride between the city and the countryside was a real risk.

God protects unity between the capital and the countryside on purpose.

📏 Magnify means to boast or claim superiority

👑 The capital and royal family held top honor

⚠️ Pride between city and country was a risk

📖 God protects their unity on purpose

## 🤕 He That Is Feeble Among Them At That Day Shall Be As David

Feeble here means weak, unable to fight, the opposite of a trained soldier.

David was remembered as Israel's greatest warrior king.

On this day, even the weakest person in Judah fights with David's own strength.

God does not just protect the strong, He transforms the weak.

🤕 Feeble means weak and unable to fight

⚔️ David was remembered as the greatest warrior

💪 Even the weakest fights with David's strength

📖 God transforms the weak, not just the strong

## 👑 The House Of David Shall Be As God, As The Angel Of The LORD Before Them

This is deliberately overwhelming language, not a literal claim that David's family becomes divine.

The angel of the LORD elsewhere in scripture often carries God's own authority and presence.

Comparing the royal house to that angel pictures power far beyond anything human leadership normally has.

The point is the scale of the coming victory, not a change in who God is.

👑 This is deliberately overwhelming language

😇 The angel of the LORD carries God's authority

💪 The comparison pictures overwhelming power

📖 The point is the victory's scale

## 🌍 I Will Seek To Destroy All The Nations That Come Against Jerusalem

This widens the promise from one battle to every future attack.

Earlier verses in this chapter described surrounding armies gathering against the city.

God commits here to ending that threat completely, not just once.

Every nation that tries this is included in the same promise.

🌍 This widens the promise to every attack

⚔️ Armies had gathered against the city earlier

🛑 God ends this threat completely

📖 Every future nation is included here

# Zechariah 12:10-14
# 😢 Mourning For The One They Pierced
---
## 🌊 The Spirit Of Grace And Of Supplications

Pouring out a spirit pictures something given suddenly and in large amount, not held back.

Grace here means undeserved kindness offered freely.

Supplications means humble, urgent prayers asking for help.

God promises to fill the royal family and the city with both at once.

🌊 Pouring out pictures a sudden abundance

🎁 Grace means undeserved kindness

🙏 Supplications means humble, urgent prayers

📖 Both arrive together, by God's own gift

## ❓ They Shall Look Upon Me Whom They Have Pierced

This is one of the most debated verses in the whole book.

The LORD is speaking here, yet the LORD is also the one who was pierced.

The New Testament later connects this verse directly to the crucifixion of Jesus in John nineteen.

The verse holds a paradox, God speaking and God wounded.

❓ This is one of Zechariah's most debated verses

🗣️ Speaker and pierced one are the same

✝️ John nineteen connects this to the crucifixion

📖 God speaking and wounded meet here

## 👶 They Shall Mourn For Him, As One Mourneth For His Only Son

Mourning for an only son was considered the deepest grief a parent could feel.

There was no other child to soften that loss.

The whole nation's mourning here is compared to that specific, total kind of grief.

This is personal sorrow, not polite or distant sadness.

👶 Only son grief was the deepest loss

💔 No other child could soften it

🌍 The whole nation mourns this deeply

📖 This is personal grief, not polite sadness

## 🗺️ As The Mourning Of Hadadrimmon In The Valley Of Megiddon

Hadadrimmon was a place in the valley of Megiddon, a site already linked to deep national grief.

Many scholars connect this to the mourning for King Josiah, who died in battle near Megiddo.

Second Chronicles records that his death caused sorrow across the entire nation.

Zechariah uses that well known grief as the measuring stick for this future mourning.

🗺️ Hadadrimmon sits in the valley of Megiddon

👑 Many scholars link this to King Josiah's death

📜 Second Chronicles records nationwide sorrow over him

📖 That grief becomes the measuring stick here

## 👑 Every Family Apart

The mourning here is not one big combined crowd.

Each family group mourns on its own, separate from the others.

The house of David represents the royal line.

The house of Nathan represents a prophetic family connected to David's son.

The house of Levi and the house of Shimei both represent priestly families.

Royalty, prophets, and priests all grieve together.

Yet each family stays separate in its own sorrow.

👑 House of David is the royal line

📜 House of Nathan is a prophetic family

⚖️ Levi and Shimei represent priestly families

📖 Every group mourns together, yet stays separate
`.trim();

export const ZECHARIAH_TWELVE_PERSONAL_SECTIONS = parseZechariahTwelveRawNotes(ZECHARIAH_TWELVE_RAW_NOTES);
