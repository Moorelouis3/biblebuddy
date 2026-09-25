export type IsaiahSixtyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahSixtyOneRawNotes(rawText: string): IsaiahSixtyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahSixtyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+61:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 61 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+61:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+61:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 61 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 61,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 61:${startVerse}` : `Isaiah 61:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Isaiah 61 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_SIXTY_ONE_RAW_NOTES = `# Isaiah 61:1-3
# 🕊️ Good Tidings To The Meek
---
## 🕊️ The Spirit Of The Lord GOD Is Upon Me

The word me here names one specific messenger, not just any prophet speaking in general.

This is the same kind of claim earlier servant passages in Isaiah make about a promised deliverer.

Centuries later, Jesus reads this exact verse aloud in a synagogue and says it is now fulfilled in himself.

That single moment in Luke four ties this whole chapter directly to him.

🕊️ The Spirit rests on this speaker

📜 Matches earlier servant passages in Isaiah

✝️ Jesus reads this verse about himself

📖 Luke four connects this chapter to Christ

## 👑 Hath Anointed Me

"Anointed" means specially chosen and set apart, usually pictured as oil poured on someone's head.

Kings, priests, and prophets were all anointed for their specific role in Israel.

The word "Messiah" and the word "Christ" both come from words meaning "anointed one."

This phrase is quietly naming who the speaker really is.

👑 Anointed means chosen and set apart

🛢️ Oil poured on the head pictured it

✝️ Messiah and Christ both mean anointed one

📖 This names who the speaker is

## 😢 Bind Up The Brokenhearted

"Bind up" is medical language, the way a wound gets wrapped so it can heal.

A broken heart is treated here like a real injury, not something to just get over.

The mission is not only to comfort with words but to actually tend the wound.

😢 Bind up means wrap a wound

💔 A broken heart is treated as real

🩹 The mission includes real healing

➡️ Grief is met with active care

## ⛓️ Liberty To The Captives

"Liberty" means real freedom, not just a passing feeling of relief.

It points first to real prisoners and captives, people physically held against their will.

It also carries a wider meaning, freedom for anyone trapped by guilt, fear, or sin.

The same word for "liberty" shows up in Leviticus twenty five for the Year of Jubilee.

That was the year debts were canceled and slaves went free.

⛓️ Liberty means real freedom for captives

🗓️ It echoes the Jubilee release in Leviticus

💛 It also covers freedom from guilt and sin

📖 Physical and spiritual freedom overlap here

## 🌹 Beauty For Ashes

Mourners in this culture sat in ashes as a visible sign of grief.

"Beauty" here likely means a headdress or turban, the opposite of a mourner's ashes on the head.

The trade God offers is not a small upgrade but a full reversal, grief replaced with celebration.

The next two phrases in the verse repeat the same pattern twice more.

🌹 Beauty replaces the ashes of mourning

😭 Ashes marked public grief in this culture

🔄 God offers a full reversal

📖 Grief is traded for celebration

## 🌳 Trees Of Righteousness

Calling people "trees" pictures something planted, rooted, and built to last, not a quick fix.

"The planting of the Lord" makes clear whose work this actually is, not human effort.

A tree does not grow overnight, and neither does the kind of change this verse describes.

🌳 Trees means something rooted and lasting

🌱 The planting of the Lord names the source

⏳ Real change grows slowly, like a tree

➡️ This is God's work, not self improvement

# Isaiah 61:4-7
# 🏗️ Rebuilding And Reversal
---
## 🏚️ They Shall Build The Old Wastes

"Wastes" and "desolations" describe cities left in ruins, likely from war or exile.

The promise is not just survival but full restoration of what was destroyed.

"Many generations" shows how long some of this ruin had lasted before the rebuilding came.

🏚️ Wastes means cities left in ruins

🔨 The promise includes full restoration

📆 Many generations shows the ruin was old

📖 God rebuilds what was long broken

## 🐑 Strangers Shall Stand And Feed Your Flocks

"Strangers" here means foreigners, people from outside Israel.

Normally the people of Israel did their own farming and herding.

This verse pictures outsiders doing that labor instead, freeing Israel for a different role described next.

🐑 Strangers means foreigners, not enemies

🌾 Outsiders take over the farming and herding

🔄 This frees Israel for a new role

➡️ A reversal of who serves whom

## ⛪ The Priests Of The LORD

Under the old law, only men from the tribe of Levi could serve as priests.

This verse pictures the whole nation given that priestly title, not just one tribe.

That is a massive expansion, ordinary people treated with the honor once reserved for a small group.

⛪ Only Levites were priests under the law

🌍 Here the whole nation gets that title

📈 A huge expansion of honor and role

📖 Everyone shares what once belonged to few

## 💰 Ye Shall Eat The Riches Of The Gentiles

"Riches of the Gentiles" pictures wealth flowing toward Israel instead of Israel serving other nations.

This continues the reversal already started with the strangers doing the labor in the verses just before.

"Boast yourselves" does not mean arrogance here, it means genuine pride in what God has provided.

💰 Wealth now flows toward Israel

🔄 The old pattern of service is reversed

😊 Boast here means honest pride, not arrogance

📖 Provision replaces years of service to others

## 🎭 For Your Shame Ye Shall Have Double

Israel's exile brought real public shame, defeat, and humiliation among other nations.

"Double" does not mean double the shame, it means double the honor as full compensation for it.

"Everlasting joy" makes clear this reversal is not temporary relief but a lasting new condition.

🎭 Shame refers to the humiliation of exile

✖️ Double here means double honor, not double shame

⏳ Everlasting joy means this reversal lasts

📖 God repays shame with lasting honor

# Isaiah 61:8-9
# ⚖️ A God Who Loves Justice
---
## ⚖️ I The LORD Love Judgment

"Judgment" here means justice, doing right by people rather than a courtroom verdict.

God states plainly what he values, fairness and right dealing, not power for its own sake.

This verse explains why the reversals of the earlier verses happen at all.

⚖️ Judgment here means justice, not a verdict

❤️ God states what he actually values

🔗 This explains the earlier reversals

📖 Justice is the reason behind the promises

## 🔥 I Hate Robbery For Burnt Offering

A "burnt offering" was a sacrifice fully consumed on the altar as a gift to God.

Offering something stolen as a gift to God insults the very point of giving.

God rejects worship built on injustice, no matter how religious it looks on the surface.

🔥 A burnt offering was a full sacrifice

🚫 Stolen goods make a worthless offering

😠 God rejects worship built on injustice

➡️ Right worship requires right dealing first

## 📜 An Everlasting Covenant With Them

A "covenant" is a binding promise, the same kind of agreement God made earlier with Abraham and with David.

"Everlasting" means this promise does not expire or need renewing.

Justice and covenant faithfulness are tied together here as one package, not two separate ideas.

📜 Covenant means a binding, lasting promise

🔁 It echoes earlier promises to Abraham and David

⏳ Everlasting means it never expires

📖 Justice and covenant faithfulness go together

## 🌍 Their Seed Shall Be Known Among The Gentiles

"Seed" here means descendants, the generations that come after.

The promise is that other nations will actually recognize and notice this blessed lineage.

"The seed which the Lord hath blessed" ties this straight back to Abraham's ancient promise.

His family was always meant to become a blessing seen by the whole world.

🌍 Seed means descendants, future generations

👀 Other nations will recognize this blessing

📜 This echoes the promise made to Abraham

📖 A private promise becomes publicly visible

# Isaiah 61:10-11
# 💍 Robed In Righteousness
---
## 🎉 I Will Greatly Rejoice In The LORD

The speaker shifts here from describing a mission to expressing pure personal joy.

This kind of joy is not based on circumstances staying easy, it is rooted in what God has already done.

The whole tone of the chapter turns from promise to celebration in this final section.

🎉 The tone shifts to personal joy

❤️ This joy is rooted in God, not circumstances

🔄 The chapter turns from promise to celebration

➡️ Celebration follows fulfilled promise

## 👗 Clothed Me With The Garments Of Salvation

Clothing in scripture often pictures someone's identity or status, not just their outfit.

"Garments of salvation" and "the robe of righteousness" both describe being covered and made right.

None of it came from anything the speaker earned.

Being clothed by someone else, rather than dressing yourself, pictures a gift received rather than a status achieved.

👗 Clothing here pictures identity and status

🎁 Salvation and righteousness are given, not earned

🙌 Being clothed by another pictures a gift

📖 Right standing comes from God, not effort

## 💒 As A Bridegroom Decketh Himself, And As A Bride

Weddings in this culture involved elaborate preparation, the groom in fine ornaments and the bride in her own jewels.

Both images describe someone dressed at their absolute best for the happiest day of their life.

Using this comparison twice, for both bridegroom and bride, doubles the picture of joy and celebration.

💒 Wedding dress pictures someone's best day

💎 Ornaments and jewels show careful preparation

😊 Both images double the sense of joy

📖 Salvation is pictured as a wedding day

## 🌱 As The Earth Bringeth Forth Her Bud

This closing image compares God's work to something as steady and certain as a garden growing.

A gardener plants seeds and then the ground itself does the quiet work of bringing them to life.

The chapter ends by naming who watches this happen, "before all the nations."

The growth is not hidden, it is seen by everyone.

🌱 Growth here pictures certainty, not chance

🌾 The ground does its quiet, steady work

👀 Nations are said to watch this growth happen

📖 God's righteousness grows in plain sight
`.trim();

export const ISAIAH_SIXTY_ONE_PERSONAL_SECTIONS = parseIsaiahSixtyOneRawNotes(ISAIAH_SIXTY_ONE_RAW_NOTES);
