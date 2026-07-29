export type NumbersTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersTwelveRawNotes(rawText: string): NumbersTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 12:${startVerse}` : `Numbers 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Numbers 12 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_TWELVE_RAW_NOTES = `# Numbers 12:1-3
# 🗣️ Miriam And Aaron Challenge Moses
---
## 🗣️ Miriam And Aaron Spake Against Moses
Miriam's name comes first in this sentence, even though Aaron was older and already served as high priest. That small detail suggests she was the one who started this complaint, with Aaron following her lead.
This is the first time in the Bible either of them openly criticizes Moses. Miriam led Israel's worship after the Red Sea crossing (Exodus 15:20-21), and Aaron had shared real authority as high priest since Exodus 28, so this isn't an ordinary Israelite grumbling. It's a challenge from inside Moses' own family, from two people who already had real standing.
🗣️ Miriam is named first, hinting she led this complaint
👑 Both siblings already held real, established authority
🔑 The first open criticism of Moses from his own family
---
## 🌍 The Ethiopian Woman Whom He Had Married
"Ethiopian" translates the Hebrew word "Cushite," a reference to the region of Cush, roughly modern-day Sudan, south of Egypt. The detail is mentioned twice in a single verse, which is the text's way of making sure the reader notices it.
It isn't fully clear whether this is a new wife or another way of describing Zipporah, the Midianite woman Moses already married back in Exodus 2:21. Either way, the marriage itself turns out to be the surface complaint, while verse 2 reveals what's really bothering Miriam and Aaron.
🌍 "Ethiopian" means Cushite, from the region south of Egypt
❓ Possibly a new wife, or another name for Zipporah
🔑 Repeated twice in one verse, so it's meant to stand out
---
## ❓ Hath The Lord Indeed Spoken Only By Moses?
This is the real issue behind the complaint. Miriam and Aaron aren't actually upset about a marriage — they're questioning whether Moses has some special access to God that they don't share.
The question sounds reasonable at first, since both of them really had received God's word before. But the rest of the chapter draws out a real difference between hearing from God sometimes and the unique relationship Moses has.
❓ The marriage is a pretext — this is really about status
🤔 Sounds reasonable, since both had heard from God before
🔑 Sets up the contrast God draws out in verses 6-8
---
## 🙋 Hath He Not Spoken Also By Us?
This second question makes the claim explicit: Miriam and Aaron believe they deserve the very same standing as Moses, not just a share in hearing from God sometimes.
Their claim isn't invented. Miriam is called a prophetess back in Exodus 15:20, and Aaron regularly relayed God's words as Moses' spokesman (Exodus 4:15-16). But it's still a wrong jump — from "we've heard from God too" to "we should be treated exactly the same as Moses."
🙋 Makes the claim explicit: equal standing with Moses
📖 Miriam was a real prophetess, named in Exodus 15:20
🔑 A wrong jump from "we've heard God too" to "we're equal"
---
## 👂 And The Lord Heard It
This is the exact same phrase used back in Numbers 11:1, right before the fire broke out at Taberah over Israel's complaining about hardship.
Repeating this phrase is a warning sign for an alert reader. Every time this book says the LORD "heard" a complaint, real consequences follow soon after.
👂 The identical phrase already used for the complaint in 11:1
🔥 That earlier complaint was followed immediately by judgment
🔑 A quiet warning sign for what's about to happen here too
---
## 🕊️ The Man Moses Was Very Meek
"Meek" doesn't mean weak or timid. It means someone with real power and standing who chooses not to fight for his own honor.
This verse is a side note from the narrator, not something Moses says about himself. It matters because Moses never once defends himself in this chapter — God defends him instead, which is exactly what meekness looks like in practice, not just in theory.
🕊️ "Meek" means humble strength, not weakness
📖 A narrator's side note, not Moses' own claim about himself
🔑 Explains why Moses never argues back — God does it for him

# Numbers 12:4-9
# ☁️ God Defends His Servant Moses
---
## ⚡ The Lord Spake Suddenly
Most of the time in these books, Moses is the one who goes to God with a question or a problem. Here, God interrupts on His own, without being asked by anyone.
The suddenness signals how seriously God takes this complaint. This isn't a routine check-in — it's an urgent, unscheduled response to what Miriam and Aaron just said about Moses.
⚡ Unusual — normally Moses approaches God, not the reverse
🚨 Signals real urgency, not a routine conversation
🔑 God is responding immediately to what was just said
---
## ⛺ Come Out Ye Three Unto The Tabernacle
All three siblings are called out together, to the very same public meeting place where the seventy elders were just commissioned one chapter earlier, in Numbers 11:24.
Calling everyone out where the camp can see makes this a public matter, not a private family conversation. Whatever God says next, the whole nation will witness it.
⛺ The same public location as the elders' ceremony one chapter earlier
👀 Makes this a public matter, not a private family talk
🔑 The whole camp will witness whatever happens next
---
## ☁️ The Lord Came Down In The Pillar Of The Cloud
This is the same visible form of God's presence already seen at Sinai (Exodus 19, 24) and at the tabernacle's dedication (Exodus 40), and again just one chapter earlier with the seventy elders.
Seeing this same cloud appear again reminds the reader that the God correcting Miriam and Aaron here is the same God who gave the law and who just filled the tabernacle with His glory.
☁️ The same visible presence seen at Sinai and in Exodus 40
🔁 Also just appeared with the seventy elders in Numbers 11
🔑 Ties this rebuke back to God's established, recognizable presence
---
## 🚪 Stood In The Door Of The Tabernacle, And Called Aaron And Miriam
Standing in the doorway puts God at the boundary between the holy space inside and the people gathered outside — present and addressing them directly, not distant or abstract.
Only Aaron and Miriam are specifically called forward here, not Moses. Moses is the subject of the conversation, but he isn't the one being summoned for correction.
🚪 A position at the boundary, directly facing the people
🗣️ Only Aaron and Miriam are called forward, not Moses
🔑 Moses is being defended here, not corrected
---
## 💭 If There Be A Prophet...In A Vision...In A Dream
This describes the normal way God spoke to prophets in the Old Testament — indirectly, through pictures and scenes seen while awake or asleep, images that usually needed interpreting.
God is about to draw a sharp contrast between this normal, indirect method and something far more direct that He uses only with Moses.
💭 The normal, indirect way God usually spoke to prophets
🖼️ Through pictures and scenes that need interpreting
🔑 Sets up a deliberate contrast with Moses' own experience
---
## 🏠 Faithful In All Mine House
"House" here means God's whole household — all of Israel — not a building. Moses is described as the trusted manager over that entire household.
"Servant" is a title of honor in the Old Testament, used for major figures like Abraham and David, not a term for someone lowly. The New Testament book of Hebrews (3:2-5) later builds directly on this exact description to explain Moses' unique role.
🏠 "House" means God's whole household, all of Israel
👑 "Servant" is a title of honor, not a lowly position
🔑 Hebrews 3:2-5 later builds directly on this description
---
## 🗣️ Mouth To Mouth, Even Apparently, And Not In Dark Speeches
This is the direct contrast with the vision-and-dream method just described. Instead of indirect pictures, God speaks to Moses plainly and clearly, like two people talking face to face.
"Dark speeches" means riddles or obscure, symbolic language. Moses doesn't have to interpret puzzling images the way other prophets did — God simply tells him what He means.
🗣️ Direct, plain speech, not visions or dreams
🧩 "Dark speeches" means riddles or obscure symbols
🔑 Moses gets a clarity no other prophet received
---
## 👁️ The Similitude Of The Lord Shall He Behold
"Similitude" means a form or likeness. Moses is given a unique privilege here — seeing some visible form of God, not only hearing His voice like other prophets.
This connects back to Exodus 33:11, which already described God speaking to Moses "face to face, as a man speaketh unto his friend." This verse confirms that earlier description was literal, not exaggeration.
👁️ "Similitude" means a visible form or likeness
🤝 Connects back to the "face to face" language in Exodus 33:11
🔑 Confirms that earlier description was literal, not exaggerated
---
## ❓ Wherefore Then Were Ye Not Afraid To Speak Against My Servant Moses?
This is a rebuke phrased as a question, not a real request for an answer. "Afraid" here means the reverence and respect Miriam and Aaron should have shown but didn't.
Given everything God just said about Moses' unique relationship with Him, speaking against Moses wasn't just rude between siblings — it was aimed at God's own chosen arrangement for leading Israel.
❓ A rebuke phrased as a question, not a real question
🙇 "Afraid" means reverence and respect, not literal fear
🔑 Their real target was God's arrangement, not just Moses
---
## 🔥 The Anger Of The Lord Was Kindled Against Them; And He Departed
This exact phrase for God's anger already appeared twice in Numbers 11 (verses 1 and 10). By now, a reader should recognize it as a signal that consequences are coming.
"He departed" means the visible cloud lifted and left. God's presence pulling back is itself an ominous sign, right before Miriam's leprosy is revealed in the very next verse.
🔥 The same phrase for God's anger already used twice in Numbers 11
☁️ "He departed" — the cloud lifting is itself an ominous sign
🔑 Sets up the judgment revealed in the next verse

# Numbers 12:10-13
# 🤍 Miriam Struck With Leprosy
---
## ☁️ The Cloud Departed From Off The Tabernacle
This connects directly to God's departure named in verse 9. As soon as His visible presence lifts, the consequence becomes visible too.
The timing isn't a coincidence. The text places these two events back to back on purpose, so the reader sees cause and effect happening in real time.
☁️ Directly follows God's departure named in verse 9
⏱️ Cause and effect shown happening in real time
🔑 Placed back to back on purpose, not by accident
---
## 🤍 Miriam Became Leprous, White As Snow
Biblical "leprosy" (Hebrew tzaraath) covers a range of skin conditions, not only the disease called leprosy today. Leviticus 13 treats it as making a person ritually unclean, requiring separation from the rest of the camp.
Only Miriam is struck, even though both she and Aaron spoke against Moses. One likely reason is that she's named first back in verse 1 and seems to have led the complaint; Aaron's ongoing high priestly duties may also be part of why he's spared this particular visible judgment.
🤍 Biblical leprosy covers various skin conditions, not just one disease
🚫 Made a person ritually unclean under Leviticus 13's law
🔑 Only Miriam is struck — likely because she led the complaint
---
## 😨 Aaron Looked Upon Miriam
This small detail captures Aaron's horror in real time — turning to see his own sister suddenly covered in a visible, unmistakable judgment.
His reaction sets up exactly what he does next: an immediate, urgent appeal to Moses on Miriam's behalf.
😨 Captures Aaron's real-time horror at what he sees
🏃 Sets up his urgent appeal to Moses in the very next verse
🔑 A brief but vivid narrative detail
---
## 🙏 Alas, My Lord
Aaron now calls Moses "my lord" — a striking reversal from a chapter that opened with him questioning whether Moses deserved any special standing at all.
"We have done foolishly, and...sinned" is a full, direct confession with no excuses attached. Aaron admits the complaint itself was wrong, not just badly timed.
🙏 A striking reversal from verse 2's challenge to Moses' status
✅ A full confession, with no excuses attached
🔑 Aaron now openly acknowledges Moses' authority
---
## ⚰️ Let Her Not Be As One Dead
This is a graphic, desperate image comparing Miriam's condition to a stillborn baby with decaying flesh. Aaron is describing just how severe and shocking her leprosy looks.
The intensity of this plea shows real family love breaking through, right after Aaron's own confession of guilt a moment earlier.
⚰️ A graphic comparison to a stillborn baby's decayed flesh
😢 Shows how severe and shocking Miriam's condition looks
🔑 Real family love breaking through after Aaron's confession
---
## 🙏 Moses Cried Unto The Lord, Saying, Heal Her Now
In Hebrew, Moses' prayer here is just five words — one of the shortest prayers in the entire Bible, but it says everything necessary.
Moses immediately intercedes for the very sister who just attacked his authority, without a hint of revenge. This is the meekness named back in verse 3, shown in action instead of just described.
🙏 One of the shortest prayers in the entire Bible
🕊️ No revenge — Moses prays for the sister who wronged him
🔑 Meekness from verse 3 shown in action, not just described

# Numbers 12:14-16
# ⛺ Seven Days Outside The Camp
---
## 😳 If Her Father Had But Spit In Her Face
Spitting in someone's face was a recognized act of public shaming in this culture — the same image shows up again later in Deuteronomy 25:9. Even an earthly father doing this would require seven days of shame afterward.
God's point is a "how much more" comparison: if a father's spit brings seven days of shame, then a rebuke coming directly from God certainly deserves at least that much.
😳 A recognized act of public shaming in this culture
📜 The same image appears again later in Deuteronomy 25:9
🔑 A "how much more" comparison — God's rebuke is far greater
---
## 🚫 Shut Out From The Camp Seven Days
This matches the same seven-day quarantine period already required for skin diseases under Leviticus 13-14's law. Even Moses' own sister isn't given a special exception.
The punishment follows the exact same pattern anyone else with this condition would face, showing the law applies evenly, even to the family of Israel's own leader.
🚫 Matches the same seven-day quarantine law from Leviticus 13-14
⚖️ No special exception, even for Moses' own sister
🔑 Shows the law applying evenly, without favoritism
---
## ⏳ The People Journeyed Not Till Miriam Was Brought In Again
This is a striking detail: the entire nation, well over a million people, waits in place for seven full days because of one woman's punishment.
It shows that even after her sin, Miriam is still honored and valued. The camp doesn't leave her behind or move on without her.
⏳ The whole nation waits seven days for just one person
❤️ Shows Miriam is still valued, despite her sin
🔑 The camp doesn't move on without her
---
## 🗺️ Removed From Hazeroth, And Pitched In The Wilderness Of Paran
This short travel note closes the chapter and sets up what comes next. The wilderness of Paran is exactly where the twelve spies are sent into Canaan in Numbers 13.
A family conflict over authority resolves, and the story immediately moves forward into the next major test facing Israel.
🗺️ Paran is where the spy mission begins in Numbers 13
➡️ The story moves straight into the next major test
🔑 A short travel note doing real narrative work
`;

export const NUMBERS_TWELVE_PERSONAL_SECTIONS = parseNumbersTwelveRawNotes(NUMBERS_TWELVE_RAW_NOTES);
