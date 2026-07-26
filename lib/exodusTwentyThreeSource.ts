export type ExodusTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentyThreeRawNotes(rawText: string): ExodusTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 23:${startVerse}` : `Exodus 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Exodus 23 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_THREE_RAW_NOTES = `# Exodus 23:1-3

# ⚖️ Honest Testimony In Court

---

## 🗣️ Thou Shalt Not Raise A False Report: Put Not Thine Hand With The Wicked To Be An Unrighteous Witness

Lying in court, or even quietly helping someone else's lie by staying silent, both counted as taking part in injustice. Truth in testimony was treated as a personal responsibility, not just the judge's job.

🗣️ Even silently going along with someone else's lie counted as taking part in injustice

---

## 👥 Thou Shalt Not Follow A Multitude To Do Evil ... To Decline After Many To Wrest Judgment

Wrest means to twist or distort. Peer pressure was never a valid excuse for bending the truth in court, even if everyone else in the crowd was leaning the same wrong direction.

👥 Wrest means to twist the truth, and "everyone else was doing it" was never an excuse

---

## 😢 Neither Shalt Thou Countenance A Poor Man In His Cause

Countenance means to favor or show partiality toward. This balances the command against bribing judges to favor the rich, real justice could not bend toward the poor out of pity either. Both directions of bias were forbidden equally.

😢 Countenance means to show favoritism, and this law forbade bias toward the poor, not just the rich

# Exodus 23:4-5

# 🐴 Kindness To An Enemy's Animal

---

## 🐴 If Thou Meet Thine Enemy's Ox Or His Ass Going Astray, Thou Shalt Surely Bring It Back To Him Again

Even a personal enemy's lost animal had to be returned. Basic decency toward another person's property was not allowed to depend on whether you actually liked that person.

🐴 Basic decency toward someone's property could not depend on whether you liked them

---

## 🫏 If Thou See The Ass Of Him That Hateth Thee Lying Under His Burden ... Thou Shalt Surely Help With Him

This goes even further than returning a lost animal, it requires actively stopping to help an enemy's suffering animal get back up, a direct, practical test of loving your enemy long before that phrase appears in the New Testament.

🫏 Stopping to help an enemy's struggling animal was a direct, practical test of real character

# Exodus 23:6-9

# 🙅 Justice For The Poor And The Stranger

---

## ⚖️ Thou Shalt Not Wrest The Judgment Of Thy Poor In His Cause

This flips the earlier warning around, a poor person's case could not be dismissed or twisted unfairly either, just because they had less power or influence to push back against an unjust ruling.

⚖️ A poor person's case could not be dismissed unfairly just because they lacked power

---

## 💰 Thou Shalt Take No Gift: For The Gift Blindeth The Wise, And Perverteth The Words Of The Righteous

A gift here means a bribe. Even a genuinely wise, good judge could be corrupted by a bribe, this law assumed no one was above that temptation and removed the opportunity entirely rather than trusting willpower alone.

💰 A gift means a bribe, and this law assumed even good judges could be corrupted by one

---

## 🧳 Thou Shalt Not Oppress A Stranger: For Ye Know The Heart Of A Stranger, Seeing Ye Were Strangers In The Land Of Egypt

God appeals directly to Israel's own memory again, they knew firsthand what it felt like to be a powerless outsider, so they had no excuse to treat foreigners among them the same painful way.

🧳 Israel's own memory of being outsiders in Egypt removed any excuse to mistreat foreigners

# Exodus 23:10-13

# 🌾 The Sabbath Year And Sabbath Day

---

## 🌱 The Seventh Year Thou Shalt Let It Rest ... That The Poor Of Thy People May Eat

Every seventh year, farmland was left completely unplanted. Whatever grew wild on its own was left for the poor and even wild animals to eat freely, building a regular, built-in system of care for the vulnerable directly into the land itself.

🌱 Leaving the land unplanted every seventh year built care for the poor into farming itself

---

## 😌 Six Days Thou Shalt Do Thy Work, And On The Seventh Day Thou Shalt Rest ... That Thine Ox And Thine Ass May Rest, And The Son Of Thy Handmaid, And The Stranger, May Be Refreshed

The weekly Sabbath rest was not just for the family in charge, it specifically covered servants, hired workers, foreigners, and even work animals. Nobody in the household was left out of the rest.

😌 Weekly Sabbath rest specifically covered servants, foreigners, and animals, not just the family in charge

---

## 🚫 Make No Mention Of The Name Of Other Gods, Neither Let It Be Heard Out Of Thy Mouth

This law is strict enough to forbid even casually saying another god's name out loud, treating exclusive loyalty to the Lord as something that shaped ordinary daily speech, not just formal worship.

🚫 This forbade even casually speaking another god's name, shaping everyday speech, not just worship

# Exodus 23:14-17

# 🎉 Three Annual Feasts

---

## 🍞 Thou Shalt Keep The Feast Of Unleavened Bread ... For In It Thou Camest Out From Egypt: And None Shall Appear Before Me Empty

This feast permanently marked the anniversary of the Exodus. Appearing before God empty-handed meant showing up without any offering, gratitude for being rescued was meant to be expressed concretely, not just felt privately.

🍞 Appearing "empty" meant no offering; gratitude for being rescued had to be shown concretely

---

## 🌾 The Feast Of Harvest ... And The Feast Of Ingathering, Which Is In The End Of The Year

These two remaining feasts marked the grain harvest in early summer and the full harvest at the very end of the farming year, building regular thanksgiving for provision directly into Israel's yearly calendar.

🌾 These two feasts built regular thanksgiving for the harvest into the yearly calendar itself

# Exodus 23:18-19

# 🩸 Offering Regulations

---

## 🍞 Thou Shalt Not Offer The Blood Of My Sacrifice With Leavened Bread

Leaven, a yeast-like substance that makes bread rise, often symbolized corruption or sin spreading through something pure. Keeping it away from sacrificial blood kept the offering's meaning of purity intact.

🍞 Leaven often symbolized corruption spreading through something pure, so it stayed away from sacrifices

---

## 🐐 Thou Shalt Not Seethe A Kid In His Mother's Milk

Seethe means to boil or cook. A young goat cooked in its own mother's milk twisted something meant to nourish life into an instrument connected to that same animal's death, and pagan neighbors reportedly used this practice in fertility rituals Israel was told to avoid entirely.

🐐 Seethe means to boil, and this avoided a practice tied to neighboring pagan fertility rituals

# Exodus 23:20-23

# 👼 The Angel Sent Ahead

---

## 👼 Behold, I Send An Angel Before Thee, To Keep Thee In The Way

God promises a guiding presence to protect Israel and lead them accurately toward the promised land, a direct, ongoing assurance that they were not making this dangerous journey alone or unguided.

👼 This promised guiding presence meant Israel was not making this dangerous journey unguided

---

## ⚠️ Beware Of Him, And Obey His Voice, Provoke Him Not; For He Will Not Pardon Your Transgressions: For My Name Is In Him

This Angel carries God's own authority and name, meaning disobeying him was treated as seriously as disobeying God directly, not a lesser messenger whose instructions could safely be ignored.

⚠️ This Angel carried God's own name and authority, so ignoring him meant ignoring God directly

# Exodus 23:24-26

# 🔨 Destroying False Gods And Receiving Blessing

---

## 🙅 Thou Shalt Not Bow Down To Their Gods ... But Thou Shalt Utterly Overthrow Them, And Quite Break Down Their Images

Entering the promised land required actively destroying the existing pagan worship sites, not just personally avoiding them, since leftover idols and altars would constantly tempt Israel back toward compromise later.

🙅 Leftover pagan altars left standing would have constantly tempted Israel back toward compromise

---

## 🍞 He Shall Bless Thy Bread, And Thy Water; And I Will Take Sickness Away From The Midst Of Thee

Faithful worship comes with real, practical promises attached, reliable food, water, and health, showing obedience was never meant to be an abstract religious idea disconnected from everyday physical life.

🍞 These promises tied faithful worship to real, everyday physical needs like food and health

# Exodus 23:27-30

# 🐝 Conquest By Little And Little

---

## 🐝 I Will Send Hornets Before Thee, Which Shall Drive Out The Hivite, The Canaanite, And The Hittite

God promises direct, supernatural help clearing the way ahead of Israel, not leaving the difficult work of conquest entirely to human military strength alone.

🐝 This promised direct, supernatural help clearing the way, not conquest by human strength alone

---

## 🐺 I Will Not Drive Them Out From Before Thee In One Year; Lest The Land Become Desolate, And The Beast Of The Field Multiply Against Thee

God explains a surprisingly practical reason for a gradual conquest, driving everyone out at once would leave the land empty and unmanaged long enough for wild animals to become a serious danger of their own.

🐺 A gradual conquest prevented the land from sitting empty long enough for wild animals to multiply

---

## 🐢 By Little And Little I Will Drive Them Out ... Until Thou Be Increased, And Inherit The Land

The pace of conquest was matched deliberately to Israel's own growth, they would take full possession only as they had enough people to actually settle and manage the land responsibly.

🐢 The conquest's pace matched Israel's own growth, so they could actually settle the land they took

# Exodus 23:31-33

# 🗺️ Borders And No Covenant With Pagan Nations

---

## 🗺️ I Will Set Thy Bounds From The Red Sea Even Unto The Sea Of The Philistines, And From The Desert Unto The River

God defines the promised land's actual borders concretely here, stretching from the Red Sea to the Mediterranean coast and from the desert to the Euphrates river, a real, specific territory, not a vague future promise.

🗺️ This defined the promised land's real, specific borders, not just a vague future promise

---

## 🤝 Thou Shalt Make No Covenant With Them, Nor With Their Gods ... For If Thou Serve Their Gods, It Will Surely Be A Snare Unto Thee

A snare is a trap used to catch an animal. Even a friendly political alliance with pagan nations risked slowly pulling Israel into worshiping their gods too, a trap that starts small and closes gradually.

🤝 A snare is a trap, and this warned that friendly alliances could gradually pull Israel into idolatry too`;

export const EXODUS_TWENTY_THREE_PERSONAL_SECTIONS = parseExodusTwentyThreeRawNotes(EXODUS_TWENTY_THREE_RAW_NOTES);
