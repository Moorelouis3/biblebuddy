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

Miriam's name comes first in this sentence.

Aaron was older and already served as high priest.

Naming Miriam first suggests she started this complaint.

This is the first time either sibling criticizes Moses openly.

Miriam led Israel's singing after the Red Sea in Exodus 15.

Aaron held real priestly authority since Exodus 28.

This complaint comes from inside Moses' own family.

Two people with real standing challenge their own brother.

🗣️ Miriam is named first

👑 Both siblings held real authority

👪 The challenge comes from Moses' own family

📖 Real standing did not excuse this complaint

## 🌍 The Ethiopian Woman Whom He Had Married

"Ethiopian" translates the Hebrew word "Cushite."

Cush sat south of Egypt, in what is now Sudan.

The verse repeats this detail twice in one sentence.

Repetition like this signals something worth noticing.

Scholars are not fully certain who this woman was.

She may be a new wife, or another name for Zipporah.

Either way, the marriage is only the surface complaint.

The real complaint comes out in the very next verse.

🌍 Cushite means from the region of Cush

🔁 The detail repeats twice on purpose

❓ She may be Zipporah under another name

➡️ The real complaint follows in verse two

## ❓ Hath The Lord Spoken Only By Moses

This question is not really about a marriage at all.

Miriam and Aaron are asking about status, not about Moses' wife.

They want to know if Moses has access to God that they lack.

The question sounds fair on its surface.

Both of them really had heard from God before.

But hearing from God sometimes is not the same as Moses' unique place.

The rest of the chapter draws that difference out clearly.

❓ The marriage is a cover story

👑 The real question is about status

🤔 Both had heard from God before

📖 Hearing is not leading

## 🙋 Hath He Not Spoken Also By Us

This second question makes the real claim plain.

Miriam and Aaron believe they deserve Moses' exact standing.

Not just a share in hearing from God, but full equality.

Their claim is not invented from nothing.

Miriam is called a prophetess in Exodus 15.

Aaron regularly spoke for Moses as God directed in Exodus 4.

Still, hearing from God does not make someone equal to Moses.

That is the wrong turn this whole chapter corrects.

🙋 Their real claim is equal standing

📖 Miriam was a true prophetess

🗣️ Aaron regularly spoke for Moses too

➡️ Hearing from God does not equal Moses' place

## 👂 And The Lord Heard It

This exact phrase already appeared in Numbers eleven.

There the people complained about hardship near Taberah.

Fire broke out immediately after that complaint.

The same phrase returning here is a warning sign.

This book uses this phrase right before judgment lands.

A careful reader should feel the tension building right here.

👂 The same phrase used in Numbers eleven

🔥 That earlier complaint ended in fire

⚠️ This phrase signals judgment is coming

📖 God hears complaints before He answers them

## 🕊️ The Man Moses Was Very Meek

"Meek" does not mean weak or timid.

It means someone with real power who chooses not to fight for his own honor.

This verse is a side note from the narrator.

Moses did not say this about himself.

It matters because Moses never defends himself anywhere in this chapter.

God defends him instead.

That is what real meekness looks like in practice.

🕊️ Meek means strength under control

📖 A narrator's note, not Moses' own claim

🛡️ God defends Moses instead of Moses defending himself

➡️ Real meekness lets someone else respond

# Numbers 12:4-9
# ☁️ God Defends His Servant Moses
---
## ⚡ The Lord Spake Suddenly

Most of the time, Moses goes to God with a question.

Here, God interrupts on His own.

Nobody asked Him to step in.

The word "suddenly" shows how seriously God takes this complaint.

This is not a routine check in.

It is an urgent response to what Miriam and Aaron just said.

⚡ Normally Moses approaches God, not the reverse

🚨 Suddenly signals real urgency

🗣️ God answers an unasked complaint

📖 God moves fast to defend His servant

## ⛺ Come Out Ye Three Unto The Tabernacle

All three siblings are called out together.

This is the same public meeting place named one chapter earlier.

Numbers eleven used it for commissioning seventy elders.

Calling everyone out where the camp can see makes this public.

This is not a private family conversation.

Whatever God says next, the whole nation will witness it.

⛺ The same place used for the elders

👀 God makes this a public matter

🙅 Not a private family talk

📖 The whole camp will witness what happens next

## ☁️ The Lord Came Down In The Pillar Of The Cloud

This is the same visible form of God's presence seen before.

It appeared at Sinai in Exodus nineteen and twenty four.

It filled the tabernacle in Exodus forty.

It just appeared again with the seventy elders one chapter earlier.

The same God who gave the law now corrects Miriam and Aaron.

☁️ The same cloud seen at Sinai

🏠 Also filled the tabernacle in Exodus forty

🔁 Just appeared again with the seventy elders

📖 The lawgiver is the one giving this rebuke

## 🚪 Called Aaron And Miriam

God stands in the doorway of the tabernacle.

That spot sits at the border between the holy space and the people outside.

Only Aaron and Miriam are called forward here.

Moses is not called forward at all.

Moses is the subject of this conversation, not the one being corrected.

He is the one being defended.

🚪 God stands at the boundary, facing the people

🗣️ Only Aaron and Miriam step forward

🙅 Moses is not summoned

📖 Moses is being defended, not corrected

## 💭 If There Be A Prophet...In A Vision...In A Dream

A vision or a dream was the normal way God spoke to a prophet.

It came indirectly, through pictures seen while awake or asleep.

Those images usually needed someone to interpret them.

God is about to contrast this normal method with something used only for Moses.

💭 The usual, indirect way God spoke to prophets

🖼️ Pictures that needed interpreting

🔀 Set up to contrast with Moses

📖 Moses will get something completely different

## 👑 My Servant Moses Is Not So

"Servant" is a title of honor in the Old Testament.

Abraham and David carry this same title elsewhere in scripture.

It never means someone lowly or unimportant.

Moses does not receive revelation the normal, indirect way.

He gets something far more direct, described in the next verse.

👑 Servant is a title of honor

📖 Abraham and David share this title

🚫 Not a term for someone lowly

➡️ Moses gets something more direct next

## 🏠 Faithful In All Mine House

"House" here does not mean a building.

It means God's whole household, all of Israel.

Moses is the trusted manager over that entire household.

Hebrews three later builds directly on this exact description.

That New Testament passage explains Moses' unique role in Israel's story.

🏠 House means all of Israel

🔑 Moses manages God's whole household

📖 Hebrews three builds on this verse

➡️ Moses' role points forward in scripture

## 🗣️ Mouth To Mouth, Even Apparently, And Not In Dark Speeches

This is the direct opposite of the vision and dream method.

God speaks to Moses plainly, like two friends talking face to face.

"Dark speeches" means riddles or hidden, symbolic language.

Moses never has to interpret puzzling images the way other prophets did.

God simply tells him what He means.

🗣️ Direct speech, not visions or dreams

🧩 Dark speeches means riddles

👥 Like two friends talking plainly

📖 No other prophet received this clarity

## 👁️ The Similitude Of The Lord Shall He Behold

"Similitude" means a visible form or likeness.

Moses is given a rare privilege here.

He sees some visible form of God, not only His voice.

This connects back to Exodus thirty three.

There God already spoke to Moses face to face, like a friend.

This verse confirms that earlier description was literal.

👁️ Similitude means a visible likeness

🤝 Connects to Exodus thirty three

✅ Confirms that language was literal

📖 Moses saw more than any other prophet

## ❓ Wherefore Then Were Ye Not Afraid To Speak Against My Servant Moses

This is phrased as a question, but it is really a rebuke.

"Afraid" here means reverence, not literal fear.

Miriam and Aaron should have shown Moses that respect.

They did not.

Speaking against Moses was not just rude between siblings.

It was aimed at God's own arrangement for leading Israel.

❓ A rebuke dressed as a question

🙇 Afraid means reverence here

👪 More than sibling rudeness

📖 Their real target was God's arrangement

## 🔥 The Anger Of The Lord Was Kindled Against Them

This same phrase for God's anger already appeared twice in Numbers eleven.

A reader who caught that pattern should expect consequences now.

Anger here does not mean an emotional outburst.

It means a settled response to real wrongdoing.

🔥 The same phrase used twice already

⚠️ A signal that consequences are near

⚖️ Not an outburst, but a just response

📖 God's anger follows real wrongdoing

## ☁️ He Departed

The visible cloud lifts and leaves.

God's presence pulling back is itself a warning.

This happens right before Miriam's leprosy appears in the very next verse.

Presence and judgment are tied together throughout this chapter.

☁️ The cloud lifts and leaves

⚠️ God's absence is itself a warning

🤍 Miriam's leprosy follows immediately

📖 Presence and judgment move together here

# Numbers 12:10-13
# 🤍 Miriam Struck With Leprosy
---
## ☁️ The Cloud Departed From Off The Tabernacle

This connects directly to God's departure named in the verse before.

As soon as His visible presence lifts, the consequence appears.

The text places these two events back to back on purpose.

The reader is meant to see cause and effect happening in real time.

☁️ Directly follows God's departure in verse nine

⏱️ Cause and effect shown together

🎯 Placed back to back on purpose

📖 The reader sees judgment unfold in real time

## 🤍 Miriam Became Leprous, White As Snow

Biblical leprosy covers a range of skin conditions.

It is not only the disease called leprosy today.

Leviticus thirteen treats this condition as making a person ritually unclean.

That uncleanness required separation from the rest of the camp.

Only Miriam is struck.

Aaron also spoke against Moses, but he is spared.

She is named first back in verse one and likely led the complaint.

🤍 Leprosy covered many skin conditions

🚫 It made a person ritually unclean

👪 Only Miriam is struck, not Aaron

📖 She likely led the complaint in verse one

## 😨 Aaron Looked Upon Miriam

This small detail captures Aaron's horror in real time.

He turns and sees his own sister suddenly covered in judgment.

The moment is brief but vivid.

It sets up his urgent appeal to Moses in the very next verse.

😨 Captures Aaron's real time horror

👀 He sees his sister's sudden judgment

📝 A brief but vivid narrative detail

➡️ It leads straight into his appeal

## 🙏 Alas, My Lord

Aaron now calls Moses "my lord."

This chapter opened with Aaron questioning Moses' special standing.

Now Aaron addresses him with total respect instead.

That is a striking reversal in only a few verses.

🙏 Aaron now calls Moses my lord

🔄 A striking reversal from verse two

👑 Aaron now openly honors Moses

📖 Respect replaces the earlier challenge

## 🙇 Lay Not The Sin Upon Us

Aaron begs Moses not to hold this sin against them.

"Beseech" means to plead urgently, not to simply ask.

Aaron is not demanding fairness anymore.

He is asking for mercy he knows he does not deserve.

🙇 Aaron pleads, not demands

🗣️ Beseech means to plead urgently

🙏 He asks for mercy, not fairness

📖 Guilt now speaks instead of pride

## ✅ We Have Done Foolishly, And...Have Sinned

This is a full confession with no excuses attached.

Aaron admits the complaint itself was wrong.

He does not blame the timing or the circumstances.

He names it plainly as sin, not just a mistake.

✅ A full confession, no excuses

🚫 Not blamed on timing or circumstance

⚖️ Named plainly as sin

📖 Honesty follows quickly after judgment

## ⚰️ Let Her Not Be As One Dead

Aaron compares Miriam's condition to a stillborn baby.

That image describes decaying, ruined flesh.

He is showing just how severe Miriam's leprosy looks.

This desperate plea reveals real family love breaking through his own guilt.

⚰️ Compared to a stillborn baby

🤍 Shows how severe her condition looks

😢 A desperate, graphic plea

📖 Family love breaks through the guilt

## 🙏 Heal Her Now, O God, I Beseech Thee

In Hebrew, this prayer is only five words long.

It is one of the shortest prayers in the whole Bible.

Moses prays immediately for the sister who just attacked his authority.

There is no hint of revenge in his response.

This is the meekness named back in verse three, shown in action.

🙏 One of the shortest prayers in scripture

🕊️ No revenge in Moses' response

❤️ He prays for the sister who wronged him

📖 Meekness from verse three, shown in action

# Numbers 12:14-16
# ⛺ Seven Days Outside The Camp
---
## 😳 If Her Father Had But Spit In Her Face

Spitting in someone's face was a public act of shame in this culture.

The same image appears again later in Deuteronomy twenty five.

Even an earthly father's spit brought real, lasting shame.

That shame lasted a full seven days.

😳 A real public shame custom

📜 The same image appears in Deuteronomy twenty five

⏳ Shame lasted seven full days

📖 Even a father's spit carried weight

## ⚖️ Should She Not Be Ashamed Seven Days

God makes a how much more argument here.

A father's spit brings seven days of shame.

A rebuke coming directly from God deserves at least that much.

This is a common pattern in scripture, arguing from the lesser case to the greater one.

⚖️ A how much more argument

😳 A father's spit brings real shame

👑 God's rebuke deserves even more

📖 Scripture often argues small to great

## 🚫 Shut Out From The Camp Seven Days

This matches the same seven day quarantine already required for skin disease.

Leviticus thirteen and fourteen set out that same law for anyone else.

Even Moses' own sister receives no special exception.

The law applies evenly, even to the family of Israel's own leader.

🚫 Matches the quarantine law in Leviticus

⚖️ No special exception for Miriam

👪 Applies evenly to the leader's own family

📖 God's law does not play favorites

## ⏳ The People Journeyed Not Till Miriam Was Brought In Again

Well over a million people wait in place for seven full days.

They wait because of the judgment on one single woman.

Miriam is still honored, even with her sin.

The camp does not leave her behind or move on without her.

⏳ A whole nation waits seven days

👤 All because of one person's judgment

❤️ Miriam is still valued, despite her sin

📖 The camp will not move on without her

## 🐪 Removed From Hazeroth

Hazeroth was the camp where this whole conflict took place.

The people now leave that place behind completely.

This short travel note marks the end of one chapter of conflict.

It sets up the very next stage of Israel's journey.

🐪 Hazeroth was the site of this conflict

🚶 The camp moves on from here

📍 One chapter of conflict ends

➡️ The next stage of the journey begins

## 🗺️ Pitched In The Wilderness Of Paran

Paran is exactly where the next major test begins.

Numbers thirteen sends twelve spies into Canaan from this very spot.

A family conflict over authority resolves here.

The story immediately moves forward into a much bigger test for the whole nation.

🗺️ Paran hosts the next major event

🕵️ Numbers thirteen sends spies from here

🏁 One family conflict comes to an end

📖 A bigger test for Israel begins next
`.trim();

export const NUMBERS_TWELVE_PERSONAL_SECTIONS = parseNumbersTwelveRawNotes(NUMBERS_TWELVE_RAW_NOTES);
