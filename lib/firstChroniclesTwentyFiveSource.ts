export type FirstChroniclesTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesTwentyFiveRawNotes(rawText: string): FirstChroniclesTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 25:${startVerse}` : `1 Chronicles 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Chronicles 25 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_TWENTY_FIVE_RAW_NOTES = `# FirstChronicles 25:1-3
# 🎶 David Organizes The Temple Musicians
---
## 🎖️ David And The Captains Of The Host Separated

"Captains of the host" normally means the commanders who lead Israel's army.

Here those same military leaders help organize temple worship instead of war.

David placed this task under national leadership, not a side project.

Worship for God's house received the same serious planning as battle.

🎖️ Captains of the host normally led armies
🎶 Here they organize worship instead
👑 David gave this project national importance
📖 Worship was planned as seriously as war

---

## 🎵 Prophesy With Harps, With Psalteries, And With Cymbals

"Prophesy" here does not mean predicting the future.

It means worship delivered through music instead of only speech.

A "psaltery" was a stringed instrument similar to a small harp.

Cymbals kept the rhythm and marked the sections of a song.

These musicians were not entertainment.

They were leading Israel toward God through sound.

🎵 Prophesy here means Spirit led worship
🎻 A psaltery is a small stringed harp
🥁 Cymbals kept the rhythm and structure
📖 Music itself led people toward God

---

## 🎼 Under The Hands Of Asaph

"Under the hands of" means under his direct leadership and training.

Asaph was one of David's three chief musicians, already appointed in earlier chapters.

His own sons continued that same family calling here.

A father's assignment became a whole family's ongoing service.

🎼 Under the hands means under his direction
🎶 Asaph was one of David's three chief musicians
👪 His sons carried on the family calling
📖 One man's assignment became lasting family service

---

## 📜 Prophesied According To The Order Of The King

Even Spirit led worship still followed royal organization.

David did not leave temple music to chance or personal preference.

Every musician served inside a structure someone had planned.

Order and inspiration were never treated as opposites in this chapter.

📜 The king set a real structure
🎶 Inspired worship still followed a plan
🚫 Order and passion were not opposites
➡️ Structure served worship instead of limiting it

---

## 🙏 To Give Thanks And To Praise The LORD

Jeduthun was the third of David's three chief musicians, alongside Asaph and Heman.

His family's specific assignment was thanksgiving and praise.

That gave every family a distinct musical purpose, not just a rotation.

Worship had different tones, and each family carried one of them.

🙏 Jeduthun was David's third chief musician
🎶 His family's role was thanks and praise
🎯 Each family carried a distinct purpose
📖 Worship needed more than one kind of song

---

## 🔢 Gedaliah, And Zeri, And Jeshaiah, Hashabiah, And Mattithiah, Six

This verse names only five sons, yet the text says six.

Many scholars believe a sixth name dropped out during copying long ago.

The ancient Greek Old Testament preserves an extra name here, Shimei.

The count still mattered enough that someone noticed it was short.

🔢 The verse counts six but names five
📜 A name was likely lost in copying
🗺️ An old Greek translation adds Shimei here
📖 Even a missing name did not escape notice

# FirstChronicles 25:4-7
# 🎺 Heman's Sons And The Full Count
---
## 👨‍👦 The Sons Of Heman

Heman was the third of David's chief musicians, alongside Asaph and Jeduthun.

Fourteen sons are named here, more than either of the other two families.

Earlier chapters already introduced Heman as a Levite descended from Kohath.

A large family meant a large share of the coming music courses.

👨‍👦 Heman was David's third chief musician
🔢 Fourteen sons are named here
📜 Earlier chapters introduced his family line
📖 Family size shaped the coming assignments

---

## 🕊️ Hananiah, Hanani, Eliathah, Giddalti, And Romamtiezer

Many scholars believe these last nine names of Heman's sons form more than a list.

Read together in Hebrew, they sound like a short prayer.

It begins, have mercy upon me, LORD, have mercy.

It continues on to speak of help in hardship and visions given in abundance.

A father may have prayed once through the very names of his own children.

🕊️ Nine names may form a hidden prayer
🙏 It opens, have mercy upon me Lord
👶 A father's prayer spoken through his children's names
📖 Even a name could carry real devotion

---

## 👁️ Heman The King's Seer In The Words Of God

A "seer" is an old title for a prophet, someone who received visions from God.

Heman did not just play music.

He also brought messages from God.

Asaph and Jeduthun are already called prophets earlier in this chapter.

All three musical families combined worship with real prophetic gifting.

👁️ Seer is an old word for prophet
🎶 Heman did more than play instruments
🗣️ He delivered messages from God
📖 Music and prophecy overlapped in this family

---

## 💪 To Lift Up The Horn

A horn on an animal was its main weapon and its sign of strength.

"To lift up the horn" is an old way of saying to give strength or victory.

This same phrase appears often in the Psalms about God's people.

Heman's gift was not decoration.

It gave real strength to Israel's worship.

💪 A horn symbolized strength or victory
📖 This phrase appears often in the Psalms
🎶 Heman's gift added real strength to worship
➡️ Worship itself could carry real power

---

## 👨‍👩‍👧‍👦 Fourteen Sons And Three Daughters

Daughters are named as part of Heman's family count here.

Only sons appear later in the twenty four musical courses though.

The daughters mattered enough to be counted, even without a course of their own.

Being named in scripture did not always require holding a formal role.

👨‍👩‍👧‍👦 Three daughters are counted in this verse
🎶 Only the sons received a musical course
📝 The daughters were still worth recording
📖 A name does not always need a title

---

## 🎓 Instructed In The Songs Of The LORD, Even All That Were Cunning

"Cunning" here is an old word for highly skilled, not deceitful.

These musicians trained seriously before ever taking their turn in the temple.

Skill mattered as much as calling in this family's service.

Worship was not left to whoever happened to be available.

🎓 Cunning here means highly skilled
🎼 These musicians trained for their role
🎯 Skill mattered as much as calling
📖 God's worship deserved real preparation

---

## 🔢 Two Hundred Fourscore And Eight

"Fourscore" is an old word for eighty.

Two hundred fourscore and eight means two hundred eighty eight in total.

That number splits evenly into twenty four groups of twelve.

The next verses explain exactly how those groups were chosen.

🔢 Fourscore is an old word for eighty
➕ The total comes to two hundred eighty eight
🎯 That splits evenly into groups of twelve
📖 The next verses explain how groups were chosen

# FirstChronicles 25:8
# 🎲 Cast By Lot, Small And Great Alike
---
## 🎲 They Cast Lots, Ward Against Ward

A "ward" here means an assigned turn of duty, not a guarded room or a prisoner.

Casting lots let chance decide the order, not personal favor.

An earlier chapter already used this same fair method for the priests.

The same fairness now reached the musicians as well.

🎲 Ward means an assigned turn of duty
🪨 Lots let chance decide, not favoritism
📜 An earlier chapter used this same method
📖 Fairness reached worship, not only the priesthood

---

## ⚖️ As Well The Small As The Great, The Teacher As The Scholar

This line is the whole verse's real point.

A master musician and a brand new student drew from the very same lot.

No amount of skill or seniority bought a better position.

God's house measured worth differently than a career or a reputation would.

⚖️ Master and student used the same lot
🚫 Skill did not buy a better spot
🎓 Seniority gave no special advantage
📖 God's house measured worth differently

# FirstChronicles 25:9-15
# 🎯 The First Lots Drawn
---
## 🥇 The First Lot Came Forth For Asaph To Joseph

Coming first in this drawing did not make Joseph's family more important.

It only decided the order out of twenty four equal turns.

Asaph's own family received this first position by chance, not by rank.

The very first name on the list still had to wait its turn like everyone else.

🥇 First only meant first in order
🚫 It did not mean higher importance
🎲 Chance chose Asaph's family for turn one
📖 Every family still waited for its turn

---

## 🔟 The Third To Zaccur, He, His Sons, And His Brethren, Were Twelve

This exact phrase, he his sons and his brethren were twelve, repeats through nearly every remaining verse.

Each of the twenty four courses had exactly twelve men.

Two hundred eighty eight divided by twelve gives that same number, twenty four.

The math from verse seven lines up exactly with every name on this list.

🔟 Every course held exactly twelve men
➗ Splits evenly into groups of twelve
🔁 This phrase repeats through nearly every verse
📖 The numbers match perfectly across the chapter

---

## 🔤 The Fourth To Izri

This name looks new, but it is not a new person.

Verse three already named this same son of Jeduthun as Zeri.

Ancient Hebrew letters for those two spellings looked very similar when copied by hand.

Small spelling shifts like this happened often across these old family lists.

🔤 Izri and Zeri name the same man
📜 Verse three already introduced him as Zeri
✍️ Similar letters likely caused the spelling shift
📖 Spelling drift did not create a new person

---

## 🔤 The Seventh To Jesharelah

This is the same pattern as Izri and Zeri from a few verses earlier.

Verse two already named this son of Asaph as Asarelah.

Jesharelah and Asarelah are simply two spellings of one name.

A careful reader learns to expect this kind of variation in these lists.

🔤 Jesharelah and Asarelah are the same name
📜 Verse two used the earlier spelling
🔁 This matches the Izri and Zeri pattern
📖 These lists often carry small spelling shifts

# FirstChronicles 25:16-23
# 🔄 The Lots Continue Around The Circle
---
## 👤 The Tenth To Shimei

This is not the same Shimei who cursed David back in second Samuel.

Shimei was an extremely common name among the Levites.

This particular Shimei is simply one of Heman's own sons.

A repeated name in scripture almost never points to the same man.

👤 A different Shimei from second Samuel
🎶 This one is a son of Heman
🔁 Shimei was a very common Levite name
📖 Repeated names rarely mean the same person

---

## 👤 The Thirteenth To Shubael

This is also a different man from the Shubael named earlier in this book.

That earlier Shubael descended from Moses and served as a scribe.

This Shubael is one of Heman's own musical sons instead.

Two men, two completely different roles, sharing one family name.

👤 A different Shubael from an earlier chapter
✍️ That earlier Shubael was a scribe
🎶 This one is a musician, Heman's son
📖 Two different callings shared one name

---

## 🙏 The Sixteenth To Hananiah

"Hananiah" means the LORD has been gracious.

That same name later belongs to one of Daniel's three friends in Babylon, also called Shadrach.

The two men never met and lived generations apart.

Israelite parents often named children after the same truth about God, generation after generation.

🙏 Hananiah means the LORD has been gracious
🔥 Daniel's friend Shadrach shared this name later
📆 The two men lived generations apart
📖 Families kept naming children after God's grace

# FirstChronicles 25:24-31
# 🏁 The Last Lots, Complete At Twenty Four
---
## 🕊️ The Eighteenth To Hanani

Hanani is one of the nine names that formed the prayer like phrase back in verse four.

There, the name was part of a poetic sentence about Heman's family.

Here, the very same name belongs to one real man drawing one real lot.

The mysterious sentence in verse four was built from actual people, not just poetry.

🕊️ Hanani appeared inside the poetic phrase
👤 Here he is one real man
🎯 He receives the eighteenth lot
📖 The poetic names were real people too

---

## 🔁 The Twentieth To Eliathah, He, His Sons, And His Brethren, Were Twelve

This same closing phrase repeats almost word for word, over and over across the chapter.

That kind of repetition could read as boring on the page.

Instead it is making a quiet point, every course was worth exactly the same.

No family's entry got extra length or extra praise.

🔁 The same closing phrase repeats constantly
📏 Every course received identical treatment
🚫 No family got extra length or praise
📖 Repetition itself was a form of fairness

---

## 🔍 The One And Twentieth To Hothir

Unlike several of the priestly names from an earlier chapter, Hothir is never mentioned again anywhere else in the Bible.

No later book of the Bible ever brings his name back.

God's record still preserved him permanently, right here.

Being remembered by God never required being famous afterward.

🔍 Hothir never appears again in scripture
📜 Not every name became famous later
✍️ God's record still kept him permanently
📖 Being remembered by God does not require fame

---

## 🏁 The Four And Twentieth To Romamtiezer

Romamtiezer completes the full count of twenty four courses.

He is also Heman's own son, one of the very names from that prayer like phrase in verse four.

The list that opened with captains organizing an army closes with one family's own son.

Worship in God's house received the same careful order David gave his army.

That order was never really about music alone.

🏁 Romamtiezer completes all twenty four courses
👶 He is one of Heman's own sons
🎖️ The chapter opened and closed with real order
📖 Worship deserved the same care as war
`.trim();

export const FIRST_CHRONICLES_TWENTY_FIVE_PERSONAL_SECTIONS = parseFirstChroniclesTwentyFiveRawNotes(
  FIRST_CHRONICLES_TWENTY_FIVE_RAW_NOTES
);
