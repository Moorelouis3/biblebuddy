export type ExodusTwentyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusTwentyTwoRawNotes(rawText: string): ExodusTwentyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusTwentyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+22:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 22 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+22:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+22:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 22 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 22,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 22:${startVerse}` : `Exodus 22:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Exodus 22 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_TWENTY_TWO_RAW_NOTES = `# Exodus 22:1-4

# 🐂 Restitution For Theft

---

## 🐂 If A Man Shall Steal An Ox, Or A Sheep ... He Shall Restore Five Oxen For An Ox, And Four Sheep For A Sheep

A stolen ox was worth more to steal than a stolen sheep, since it did the heavy work of plowing and pulling. That is why killing or selling a stolen ox cost five times as much to pay back, while a sheep only cost four.

🐂 Paying back five oxen for one shows how valuable a working animal was to a farm

---

## 🌙 If A Thief Be Found Breaking Up, And Be Smitten That He Die, There Shall No Blood Be Shed For Him

Breaking up here means breaking into a house at night. A homeowner who killed a nighttime intruder in the dark, without knowing if he was armed or how many there were, was not guilty of murder.

🌙 A homeowner was not guilty for killing an intruder at night, when the danger was unclear

---

## 🌞 If The Sun Be Risen Upon Him, There Shall Be Blood Shed For Him

Once it was daylight, the homeowner could see the thief clearly and judge whether real danger existed. Killing him at that point counted as murder, since a safer response like calling for help was now possible.

🌞 Daylight removed the excuse of not being able to see the danger clearly

---

## 💰 If The Theft Be Certainly Found In His Hand Alive ... He Shall Restore Double

If the stolen animal was caught alive and unharmed before it could be sold or killed, the penalty was lighter, just double instead of four or five times, since less permanent harm had been done.

💰 A lighter penalty applied when the stolen animal was recovered alive and unharmed

# Exodus 22:5-6

# 🔥 Damage To Fields And Fire

---

## 🌾 If A Man Shall Cause A Field Or Vineyard To Be Eaten ... Of The Best Of His Own Field ... Shall He Make Restitution

If someone's animal wandered into a neighbor's field and ate the crops, the owner had to repay with his own best produce, not his leftover or lowest-quality crops. Careless damage still had a real cost.

🌾 Repaying with your best crops, not your worst, made carelessness genuinely costly

---

## 🔥 If Fire Break Out, And Catch In Thorns ... He That Kindled The Fire Shall Surely Make Restitution

Even an accidental fire that spread further than intended still made the person who started it responsible for the damage. Starting a fire came with a duty to control where it went.

🔥 Starting a fire meant owning responsibility for wherever it accidentally spread

# Exodus 22:7-9

# ⚖️ Disputes Over Property Left In Trust

---

## 💵 If A Man Shall Deliver Unto His Neighbour Money Or Stuff To Keep, And It Be Stolen ... If The Thief Be Found, Let Him Pay Double

If you left valuables with a neighbor for safekeeping and they were stolen, finding the actual thief settled the matter cleanly, the thief paid double, and the neighbor who was holding the items was not blamed.

💵 Finding the real thief cleared the neighbor who was simply holding the goods

---

## 👨‍⚖️ If The Thief Be Not Found, Then The Master Of The House Shall Be Brought Unto The Judges

If no thief was ever found, suspicion naturally fell on the person who had been trusted with the goods. Judges had to determine whether that person had secretly taken the property himself.

👨‍⚖️ An unsolved theft meant the trusted keeper had to prove his own innocence before judges

---

## ⚖️ Whom The Judges Shall Condemn, He Shall Pay Double Unto His Neighbour

This same double-payment rule covered any kind of disputed lost property, not just money. Whichever side the judges ruled against after hearing both stories had to pay back twice the value.

⚖️ The same double-payment penalty applied to any kind of disputed lost property

# Exodus 22:10-13

# 🐑 Liability For Animals Left In Care

---

## 🙏 Then Shall An Oath Of The Lord Be Between Them Both ... And The Owner Of It Shall Accept Thereof

If an animal left in someone's care died or was hurt with no witnesses around, the caretaker could swear an oath before God that he had not stolen it, and the owner had to accept that oath as settling the matter.

🙏 A sworn oath before God settled disputes when there were no witnesses to what happened

---

## 🐺 If It Be Torn In Pieces, Then Let Him Bring It For Witness, And He Shall Not Make Good That Which Was Torn

If a wild animal killed the livestock, the caretaker could bring back the torn remains as proof of what really happened, and he was not held responsible for a genuine, unpreventable attack.

🐺 Bringing back the torn remains proved the loss was a real attack, not carelessness or theft

# Exodus 22:14-15

# 🤝 Liability For Borrowed Property

---

## 🔨 If A Man Borrow Ought Of His Neighbour, And It Be Hurt, Or Die, The Owner Thereof Being Not With It, He Shall Surely Make It Good

If you borrowed something and it broke or died while the owner was not present to help take care of it, you were fully responsible for replacing it, since you alone had control over how it was used.

🔨 Full responsibility for borrowed property fell on whoever had sole control over it

---

## 💰 But If The Owner Thereof Be With It, He Shall Not Make It Good: If It Be An Hired Thing, It Came For His Hire

If the owner was present the whole time, the borrower was not responsible for damage, since the owner shared control. If the item was rented rather than borrowed for free, the rental fee itself already covered the risk.

💰 A rental fee already covered the risk, so a paying renter owed nothing extra for damage

# Exodus 22:16-17

# 👰 Seduction Of An Unbetrothed Woman

---

## 💍 If A Man Entice A Maid That Is Not Betrothed, And Lie With Her, He Shall Surely Endow Her To Be His Wife

Entice means to persuade or talk someone into something. A man who talked an unmarried woman into sleeping with him was required to marry her and pay the customary bride price, taking real responsibility instead of walking away.

💍 Entice means to talk someone into something, and this law forced real responsibility, not abandonment

---

## 🚫 If Her Father Utterly Refuse To Give Her Unto Him, He Shall Pay Money According To The Dowry Of Virgins

The woman's father still had the final say and could refuse the marriage entirely to protect his daughter. Even then, the man still had to pay the bride price, so refusing to marry her cost him nothing less.

🚫 The father could block the marriage, but the man still had to pay the full price either way

# Exodus 22:18-20

# ⚔️ Capital Offenses: Witchcraft, Bestiality, And Idolatry

---

## 🧙 Thou Shalt Not Suffer A Witch To Live

Witchcraft here meant practicing occult magic to manipulate spiritual power outside of God, something Israel's neighboring nations commonly did. This command drew a hard line against those practices entering Israelite life.

🧙 This drew a hard line against the occult magic practiced by neighboring nations

---

## 🐴 Whosoever Lieth With A Beast Shall Surely Be Put To Death

This law names a specific, serious perversion practiced in surrounding cultures and treats it as a capital offense, showing how completely it violated the created order God intended for human relationships.

🐴 This treated a serious perversion from surrounding cultures as a capital offense

---

## 🛐 He That Sacrificeth Unto Any God, Save Unto The Lord Only, He Shall Be Utterly Destroyed

Worshiping any other god besides the Lord was not treated as a private, personal choice. It was punished as seriously as murder or witchcraft, since Israel's entire covenant relationship depended on exclusive loyalty to God alone.

🛐 Worshiping other gods was punished as seriously as murder, since exclusive loyalty was the whole covenant

# Exodus 22:21-24

# 🫂 Protecting Strangers, Widows, And Orphans

---

## 🧳 Thou Shalt Neither Vex A Stranger, Nor Oppress Him: For Ye Were Strangers In The Land Of Egypt

Vex means to harass or mistreat. God grounds this command in Israel's own memory, they knew exactly what it felt like to be powerless foreigners in Egypt, so they had no excuse to treat outsiders the same way.

🧳 Vex means to harass, and Israel's own memory of being foreigners in Egypt removed any excuse

---

## 😢 Ye Shall Not Afflict Any Widow, Or Fatherless Child ... I Will Surely Hear Their Cry

Widows and orphans had no husband or father to legally defend them in that society, making them the most vulnerable people in the community. God says directly that he personally listens when they cry out for help.

😢 Widows and orphans had no legal protector, so God says he personally hears their cries

---

## 🔥 My Wrath Shall Wax Hot ... Your Wives Shall Be Widows, And Your Children Fatherless

Wax hot means to grow or increase. The punishment for mistreating the vulnerable fits the crime exactly, whoever creates widows and orphans through cruelty will end up creating them in his own family too.

🔥 Wax hot means to grow, and the punishment mirrors the exact harm that was caused

# Exodus 22:25-27

# 💰 Lending To The Poor Without Usury

---

## 🚫 If Thou Lend Money To Any Of My People That Is Poor By Thee, Thou Shalt Not Be To Him As An Usurer, Neither Shalt Thou Lay Upon Him Usury

Usury means charging interest on a loan. Lending to a struggling neighbor was meant to be an act of genuine help, not a way to profit off someone else's hardship by charging them extra to pay it back.

🚫 Usury means charging interest, and profiting off a poor neighbor's hardship was forbidden

---

## 🧥 If Thou At All Take Thy Neighbour's Raiment To Pledge, Thou Shalt Deliver It Unto Him By That The Sun Goeth Down

A pledge was collateral held until a debt was repaid. If someone's only cloak was taken as collateral, it had to be returned every evening, since for a poor person that cloak likely doubled as their only blanket at night.

🧥 A pledge was collateral, and a poor person's only cloak had to be returned each night to sleep in

# Exodus 22:28-31

# 🙏 Firstfruits, Firstborn, And Holiness

---

## 🚫 Thou Shalt Not Revile The Gods, Nor Curse The Ruler Of Thy People

Revile means to insult harshly. This command protected both religious and civil authority from open contempt, treating respect for legitimate leadership as something God himself cared about, not just a matter of good manners.

🚫 Revile means to insult harshly, and this protected respect for legitimate leadership

---

## 🌾 Thou Shalt Not Delay To Offer The First Of Thy Ripe Fruits ... The Firstborn Of Thy Sons Shalt Thou Give Unto Me

Giving God the very first and best of the harvest, before anyone knew how the rest of the season would turn out, was an act of trust. It said God came first, ahead of the family's own security.

🌾 Offering the first, best portion before knowing the rest of the harvest was an act of trust

---

## 🐑 Seven Days It Shall Be With His Dam; On The Eighth Day Thou Shalt Give It Me

Dam means the mother animal. A newborn animal needed a full week nursing with its mother before it could be offered, a practical, humane requirement built directly into this command about giving God the firstborn.

🐑 Dam means the mother animal, and this built basic animal care into the command itself

---

## 🐺 Neither Shall Ye Eat Any Flesh That Is Torn Of Beasts In The Field; Ye Shall Cast It To The Dogs

Meat from an animal already killed and torn by a wild predator was considered unclean and unfit to eat, both for basic health reasons and as a marker of the holiness God expected from his people.

🐺 Avoiding torn, unclean meat was both a health practice and a marker of holiness`;

export const EXODUS_TWENTY_TWO_PERSONAL_SECTIONS = parseExodusTwentyTwoRawNotes(EXODUS_TWENTY_TWO_RAW_NOTES);
