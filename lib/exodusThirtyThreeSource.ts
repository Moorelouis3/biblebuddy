export type ExodusThirtyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusThirtyThreeRawNotes(rawText: string): ExodusThirtyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusThirtyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+33:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 33 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+33:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+33:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 33 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 33,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 33:${startVerse}` : `Exodus 33:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Exodus 33 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_THIRTY_THREE_RAW_NOTES = `# Exodus 33:1-3

# 🚶 God Tells Israel To Depart Without Him

---

## 🗺️ Depart, And Go Up Hence... Unto The Land Which I Sware Unto Abraham, To Isaac, And To Jacob

Even after the golden calf disaster, God does not cancel His covenant with the patriarchs. He still promises to send "an angel" ahead of them to drive out the nations already named earlier in this book (Exodus 23:23) — the promise stands, even though the relationship is now clearly strained.

🗺️ God's promise to the patriarchs survives the golden calf crisis intact

👼 An angel is still sent ahead, just as already described in chapter 23

➡️ The land itself is described in familiar terms

---

## 🍯 Unto A Land Flowing With Milk And Honey

This description of Canaan's abundance repeats language already used all the way back at the burning bush in chapter 3:8 — the same promise, unchanged, still waiting at the end of the journey.

🍯 "Flowing with milk and honey" first appeared back in chapter 3:8

🔁 The destination hasn't changed even though the journey has been disrupted

➡️ Then comes a devastating condition

---

## 🚫 For I Will Not Go Up In The Midst Of Thee; For Thou Art A Stiffnecked People: Lest I Consume Thee In The Way

Here is the real blow: God will keep His promise of the land, but withdraws His own manifest presence from traveling among them directly. **"Stiffnecked"** repeats the exact word God used to describe Israel back in chapter 32:9. Nearness to a holy God is described here as genuinely dangerous for a people this prone to rebellion — the withdrawal is framed as protection, not simply punishment.

🚫 God offers the land but withdraws His own traveling presence

🐂 "Stiffnecked" repeats the same description used in chapter 32:9

⚠️ Closeness to God is treated as dangerous for a people this rebellious

➡️ The news lands hard on the people

# Exodus 33:4-6

# 😢 The People Mourn And Strip Their Ornaments

---

## 😭 When The People Heard These Evil Tidings, They Mourned: And No Man Did Put On Him His Ornaments

For the first time in this whole crisis, the people show real grief over the consequence, not just fear of punishment in the moment. This is a meaningful shift after two chapters of denial, excuses, and half-hearted admissions.

😭 The people show genuine mourning, not just fear, for the first time here

📈 This marks a real shift after chapters of denial and excuse-making

➡️ God repeats His warning a third time

---

## ⚠️ Ye Are A Stiffnecked People: I Will Come Up Into The Midst Of Thee In A Moment, And Consume Thee: Therefore Now Put Off Thy Ornaments

God restates the same warning again, having already said it twice in this short chapter (verses 3 and 5), underlining exactly how serious the danger is. Removing ornaments functions as a visible act of humility and mourning, similar to how sackcloth functions later in Scripture.

⚠️ This is the third time this same warning is repeated in one short chapter

💍 Removing ornaments is a visible act of humility, like sackcloth later in Scripture

➡️ The people respond immediately

---

## 🪨 The Children Of Israel Stripped Themselves Of Their Ornaments By The Mount Horeb

Obedience follows right away. **"Horeb"** is simply another name for Mount Sinai, used elsewhere in this same book (chapter 3:1 and chapter 17:6) — this is not a different mountain, just a second name for the one they're already camped at.

🪨 "Horeb" is another name for Mount Sinai, not a separate location

✅ The people obey the command immediately, without delay

➡️ Moses sets up a new meeting place outside the camp

# Exodus 33:7-11

# ⛺ The Tent Of Meeting Moves Outside The Camp

---

## 🏕️ Moses Took The Tabernacle, And Pitched It Without The Camp, Afar Off From The Camp, And Called It The Tabernacle Of The Congregation

This is not yet the tabernacle described in chapters 25-31 — that structure has not been built yet and will not be finished until Exodus 40. This is a temporary tent Moses personally pitches as a stand-in meeting place while trust between God and the camp is being rebuilt. Its location, **"without the camp"** — outside it — visibly reflects the broken closeness from the previous chapter.

🏕️ This temporary tent is not the same as the tabernacle built in chapters 25-31

📍 Being pitched "without the camp" pictures the relationship's current distance

➡️ The whole camp watches when Moses goes to it

---

## 👥 All The People Rose Up, And Stood Every Man At His Tent Door, And Looked After Moses... The Cloudy Pillar Descended, And Stood At The Door Of The Tabernacle, And The Lord Talked With Moses

The cloud pillar, already introduced back in chapter 13 to guide Israel's travels, now marks this meeting tent specifically — visible confirmation to the entire camp that God is really speaking with Moses there.

👥 The whole camp watches Moses approach the tent every time

☁️ The cloud pillar from chapter 13 now marks this specific meeting place

➡️ The people respond from a distance

---

## 🙇 All The People Saw The Cloudy Pillar Stand At The Tabernacle Door: And All The People Rose Up And Worshipped, Every Man In His Tent Door

The people worship, but each man stays at his own tent door — near enough to see, not yet able or invited to approach directly themselves. Distance and worship happen together here.

🙇 The people worship, but only from their own tent doors

📏 None of them approach the tent directly themselves

➡️ Moses himself has a relationship unlike anyone else's

---

## 🗣️ The LORD Spake Unto Moses Face To Face, As A Man Speaketh Unto His Friend... His Servant Joshua, The Son Of Nun, A Young Man, Departed Not Out Of The Tabernacle

This "face to face" description of intimacy with God is unique to Moses among all the prophets — Deuteronomy 34:10 later confirms directly that no prophet like Moses ever arose again, one "whom the LORD knew face to face." Joshua's choice to stay behind in the tent quietly sets him up as Moses' eventual successor, already showing unusual devotion.

🗣️ "Face to face" describes an intimacy unique to Moses among the prophets

📖 Deuteronomy 34:10 later confirms no prophet like this arose again

🔮 Joshua's lingering in the tent quietly foreshadows his future leadership

➡️ Moses uses this closeness to press for something more

# Exodus 33:12-17

# 🙏 Moses Pleads For God's Presence

---

## ❓ Thou Hast Not Let Me Know Whom Thou Wilt Send With Me... Shew Me Now Thy Way, That I May Know Thee

Moses presses for more than the angel escort already offered earlier (chapter 32:34 and chapter 33:2). An angel guide isn't enough for him; he wants to actually know God's own character and ways, not just receive directions toward a destination.

❓ Moses wants more than the angelic escort already promised

🧭 He asks to know God's own character, not just a guide toward the land

➡️ God's answer reverses the chapter's opening warning

---

## 🌟 My Presence Shall Go With Thee, And I Will Give Thee Rest

This directly reverses God's own warning back in verse 3, where He said He would not go up in the midst of them at all. Mercy overturns God's previously stated plan in direct response to Moses' plea — the same pattern of intercession changing the outcome already seen in chapter 32.

🌟 This directly reverses the warning God gave earlier in verse 3

🔁 The same pattern from chapter 32 repeats: intercession genuinely changes the outcome

➡️ Moses is not satisfied until this is made absolutely explicit

---

## 🤝 If Thy Presence Go Not With Me, Carry Us Not Up Hence... So Shall We Be Separated, I And Thy People, From All The People That Are Upon The Face Of The Earth

Moses insists that God's presence, not merely reaching the land itself, is what actually makes Israel distinct among the nations. Without it, arriving in Canaan would mean nothing unique at all — just another nation in another territory.

🤝 Moses insists on God's presence, not just the land itself, as the real goal

🌍 Without God's presence, Israel would be no different from any other nation

➡️ God grants the request outright

---

## ✅ I Will Do This Thing Also That Thou Hast Spoken: For Thou Hast Found Grace In My Sight, And I Know Thee By Name

God agrees, grounding the decision in His relationship with Moses personally — "I know thee by name" — rather than in anything Israel itself has earned or deserved.

✅ God grants the request Moses just pressed for

👤 The reason given is Moses' own relationship with God, not Israel's merit

➡️ Moses immediately reaches for an even bigger request

# Exodus 33:18-23

# ✨ Moses Asks To See God's Glory

---

## 🙏 I Beseech Thee, Shew Me Thy Glory

**"Beseech"** means to earnestly plead, the same word already used of Moses' pleading back in chapter 32:11. Having just secured God's presence and favor, Moses now asks for something even more extraordinary: direct sight of God's own glory.

🙏 "Beseech" means to plead earnestly, echoing chapter 32:11

⬆️ Moses escalates from presence and favor to asking for glory itself

➡️ God's answer redirects what Moses will actually receive

---

## 📛 I Will Make All My Goodness Pass Before Thee, And I Will Proclaim The Name Of The LORD Before Thee; And Will Be Gracious To Whom I Will Be Gracious, And Will Shew Mercy On Whom I Will Shew Mercy

Rather than a raw visual spectacle, God promises to reveal His "goodness" and proclaim His own "name" — fulfilled directly in the next chapter's declaration in Exodus 34:6-7. Mercy is described here as God's own sovereign choice, not something owed to anyone, language the apostle Paul later quotes directly in Romans 9:15.

📛 God offers His goodness and name instead of a raw visual display

📖 This promise is fulfilled directly in Exodus 34:6-7's proclamation

✝️ Romans 9:15 later quotes this exact description of God's mercy

➡️ A hard limit comes with this promise

---

## 🚫 Thou Canst Not See My Face: For There Shall No Man See Me, And Live

A firm boundary is set: no human being can survive a full, direct sight of God's face. This limitation shapes how later Scripture consistently treats seeing God as something requiring mediation, protection, or transformation (John 1:18; 1 Timothy 6:16).

🚫 No human being can survive seeing God's face directly

📖 John 1:18 and 1 Timothy 6:16 echo this same limitation later

➡️ God still provides a way to grant Moses something real

---

## 🪨 There Is A Place By Me, And Thou Shalt Stand Upon A Rock... I Will Put Thee In A Clift Of The Rock, And Will Cover Thee With My Hand While I Pass By

**"Clift"** is an old spelling of cleft, a crack or crevice in the rock. God provides real physical shelter and protection for Moses even while granting him an experience no one else in this story receives.

🪨 "Clift" is an old spelling of cleft, meaning a crack in the rock

🤲 God personally shields Moses even while granting this extraordinary moment

➡️ The chapter ends with what Moses is actually allowed to see

## 👁️ I Will Take Away Mine Hand, And Thou Shalt See My Back Parts: But My Face Shall Not Be Seen

Moses receives real but limited access — not the fullness of God's face, but a genuine, unprecedented glimpse of His glory as it passes by. The chapter closes on the edge of an encounter unlike any other person receives in this way across the rest of Scripture.

👁️ Moses receives a real but limited vision, not the full sight of God's face

🌟 This remains one of the most unique encounters granted to anyone in Scripture

🔒 Even this closeness has a boundary God does not remove`;

export const EXODUS_THIRTY_THREE_PERSONAL_SECTIONS = parseExodusThirtyThreeRawNotes(EXODUS_THIRTY_THREE_RAW_NOTES);
