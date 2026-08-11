export type SecondSamuelNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelNineRawNotes(rawText: string): SecondSamuelNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 9:${startVerse}` : `2 Samuel 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 2 Samuel 9 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_NINE_RAW_NOTES = `
# SecondSamuel 9:1-5
# 🔍 David Searches For Saul's House
---
## 👑 Is There Yet Any That Is Left Of The House Of Saul

Ancient kings usually killed off the leftover family of a rival house.

That kept old rivals from ever rising up to reclaim the throne.

David does the exact opposite here.

He is searching for a survivor, not hunting one down.

This question reveals what kind of king David actually wants to be.

👑 Kings normally erased a rival house
🔍 David searches instead of hunts
🕊️ He wants a survivor found
📖 David rules unlike the kings around him

## 🤝 That I May Shew Him Kindness For Jonathan's Sake

"Kindness" here translates the Hebrew word chesed.

Chesed means loyal love that keeps a promise even after the other person is gone.

David and Jonathan swore this kind of loyalty to each other back in First Samuel twenty.

Jonathan asked David to protect his family long after either of them died.

David is honoring an oath now, not just being generous on a whim.

🤝 Kindness translates the Hebrew chesed
📜 Chesed means loyalty that outlasts death
🙏 Sworn together back in First Samuel twenty
📖 David is keeping an old promise

## 🧍 A Servant Whose Name Was Ziba

Ziba once worked directly for Saul's household before Saul died.

He would have known exactly which relatives were still alive.

David calls him in because he holds information nobody else has.

A servant's memory becomes the key to finding Jonathan's family.

🧍 Ziba served in Saul's household
🗝️ He knew who was still alive
📞 David calls on his knowledge
📖 A servant holds the missing key

## 🗣️ Art Thou Ziba? And He Said, Thy Servant Is He

David confirms he has the right man before saying anything else.

Calling himself thy servant was the normal polite way to answer a king.

It showed respect without yet revealing why he had been summoned.

Ziba has no idea yet what David actually wants from him.

🗣️ David confirms he found the right man
🙇 Thy servant was a polite royal reply
❓ Ziba does not yet know why
📖 Respect came before any explanation

## 🙏 The Kindness Of God

This phrase uses stronger language than kindness for Jonathan's sake back in verse one.

Kindness of God was a phrase used for the highest, most sacred kind of loyalty.

David is not just fulfilling a personal favor between old friends.

He treats this promise as something owed before God himself.

🙏 Stronger language than verse one
✨ This marks the highest kind of loyalty
⚖️ More than a personal favor
📖 David treats the oath as sacred

## 🦵 Jonathan Hath Yet A Son, Which Is Lame On His Feet

This is the first time Mephibosheth is mentioned in the whole Bible.

He is introduced only by his condition, not yet by his name.

Second Samuel four already explained how he became lame.

His nurse fled in a panic when news came that Saul and Jonathan had died.

She dropped him during that flight, and he never walked right again.

That old accident is about to change this frightened child's whole future.

🦵 Mephibosheth's first mention in scripture
👶 He was five when injured
🏃 A nurse dropped him while fleeing
📖 An old accident shapes his future

## 🏚️ In The House Of Machir, The Son Of Ammiel, In Lodebar

Lodebar was a small town east of the Jordan River, far from Jerusalem.

The name likely means no pasture, a place with little to offer.

Machir was a wealthy man who took in Jonathan's helpless son.

This same Machir later helps David again during Absalom's revolt in chapter seventeen.

One quiet act of shelter here becomes a debt David remembers years later.

🏚️ Lodebar sat far east of Jordan
🌾 The name likely means no pasture
🏠 Machir sheltered Jonathan's helpless son
📖 Machir helps David again in chapter seventeen

## 📨 Then King David Sent, And Fetched Him Out Of The House Of Machir

David does not wait for Mephibosheth to come to him.

The king sends his own men to go and get him.

Lodebar was a fair distance away, not a quick errand.

David is treating this search as urgent, not optional.

📨 David sends his own men
🚶 He does not wait passively
🗺️ Lodebar was a real distance away
📖 David treats this search as urgent

# SecondSamuel 9:6-8
# 🤝 David Restores Mephibosheth
---
## 🙇 He Fell On His Face, And Did Reverence

Falling on the face was the deepest form of bowing in this culture.

Mephibosheth had every reason to expect danger, not kindness, from this king.

New kings often executed every possible rival to the throne.

As Saul's grandson, Mephibosheth was exactly that kind of threat.

🙇 Falling on the face was deep respect
😨 He likely expected danger, not kindness
👑 New kings often killed rival heirs
📖 Mephibosheth fit that dangerous description

## 📛 David Said, Mephibosheth

David speaks his name gently instead of a title or accusation.

Using someone's own name was a simple way to calm real fear.

This is the exact moment Mephibosheth stops being just Saul's grandson.

Here he becomes a person David actually wants to know.

📛 David speaks his name gently
😌 A name can calm real fear
🔁 He stops being only Saul's heir
📖 David sees him as a person

## 🛡️ Fear Not

This exact phrase appears throughout scripture whenever someone faces real danger.

Angels say it to Mary and to the shepherds in the Gospel of Luke.

God says it to Abraham and to Joshua in their own moments of fear.

Here a king says it to a frightened cripple instead of an army.

🛡️ Fear not appears often in scripture
👼 Angels use this same phrase later
🙏 God said this to Abraham and Joshua
📖 A king now says it to one man

## 🤝 I Will Surely Shew Thee Kindness For Jonathan Thy Father's Sake

David repeats the exact promise he already named back in verse one.

This is not a new decision made in the moment.

It is an old vow from First Samuel twenty finally being kept.

David names Jonathan directly so Mephibosheth understands exactly why he is safe.

🤝 David repeats his earlier promise
📜 This vow goes back to First Samuel twenty
🗣️ Jonathan's name explains the whole reason
📖 An old vow is finally being kept

## 🏞️ Restore Thee All The Land Of Saul Thy Father

Land in this culture meant more than simple property.

It also meant status and steady income.

Saul's royal estate had likely been sitting unclaimed since his death.

David hands the entire inheritance back instead of keeping it for the crown.

This one gift restores Mephibosheth from a hidden nobody into a landed heir.

🏞️ Land meant status, not just property
👑 Saul's estate had sat unclaimed
🎁 David gives the whole inheritance back
📖 A hidden nobody becomes a landed heir

## 🍞 Thou Shalt Eat Bread At My Table Continually

Eating at the king's table was a huge public honor in this culture.

It also meant living permanently inside the royal court, under close watch.

A rival heir who lives at the palace cannot secretly gather an army elsewhere.

David's kindness and David's caution both live inside this one invitation.

🍞 Eating with the king was a high honor
👀 It also meant living under watch
🚫 A guarded heir cannot raise a hidden army
📖 Kindness and caution share this one invitation

## 🐕 Such A Dead Dog As I Am

Dogs in the ancient Near East were not beloved pets like they often are today.

They were seen as low, unclean scavengers that roamed outside the city.

Calling himself a dead dog was the strongest possible way to say worthless.

Mephibosheth cannot yet believe a king would show him this much honor.

🐕 Dogs were seen as unclean scavengers
📉 Dead dog meant the lowest worth possible
😳 Mephibosheth cannot believe this honor
📖 Deep humility meets sudden royal kindness

# SecondSamuel 9:9-11
# 📜 Ziba's New Assignment
---
## 📦 I Have Given Unto Thy Master's Son All That Pertained To Saul

David speaks directly to Ziba, not to Mephibosheth this time.

Master's son here means Mephibosheth, since Ziba once served Saul's whole house.

Everything Saul once owned now legally belongs to his grandson again.

David is making the transfer official in front of a witness.

📦 David now speaks directly to Ziba
👑 Master's son refers to Mephibosheth
🏛️ Saul's property now belongs to him
📖 The transfer is made official here

## 🌾 Thou Therefore, And Thy Sons, And Thy Servants, Shall Till The Land For Him

Till the land means to farm it, plant it, and bring in a harvest.

Ziba and his whole household become the working farmers of this land.

Ownership belongs to Mephibosheth, but the daily labor still belongs to Ziba.

This arrangement was common in the ancient world for a noble who could not farm himself.

🌾 Till the land means to farm it
👨‍👩‍👧‍👦 Ziba's whole household does the work
👑 Ownership stays with Mephibosheth alone
📖 Labor and ownership are kept separate

## 👨‍👩‍👧‍👦 Ziba Had Fifteen Sons And Twenty Servants

This number is not just a background detail.

It shows Ziba was already a wealthy man.

Fifteen sons and twenty servants filled his household.

That was already a large, capable staff.

Ziba has more than enough hands to farm Mephibosheth's land easily.

This same wealthy Ziba reappears later, working against Mephibosheth during Absalom's revolt.

👨‍👩‍👧‍👦 Ziba was already a wealthy man
🌾 His household could easily farm the land
⚠️ Ziba reappears later in the story
📖 A helper here becomes a rival later

## ✅ According To All That My Lord The King Hath Commanded

Ziba answers with total, immediate obedience.

He does not argue or ask for anything in return.

This same Ziba later accuses Mephibosheth falsely in chapter sixteen.

His calm agreement here reads very differently once that later betrayal is known.

✅ Ziba obeys without any argument
🤐 He asks for nothing in return
⚠️ Ziba later accuses Mephibosheth falsely
📖 This scene reads differently in hindsight

## 👑 He Shall Eat At My Table, As One Of The King's Sons

David repeats the table invitation from verse seven a second time.

This time he adds a clear comparison, equal to the king's own sons.

Mephibosheth is not a servant living off charity in this arrangement.

He now holds a place of family, not just a place of pity.

👑 David repeats the table invitation
👨‍👦 Equal to the king's own sons
🚫 Not charity, but real family status
📖 Pity becomes a place at the family table

# SecondSamuel 9:12-13
# 🏡 Mephibosheth's New Life
---
## 👶 Mephibosheth Had A Young Son, Whose Name Was Micha

This tells the reader Jonathan's family line continues beyond Mephibosheth himself.

Micha carries the family forward into the next generation.

First Chronicles nine later lists more of Micha's own descendants by name.

Saul's line was nearly wiped out, yet it did not disappear.

👶 Jonathan's family line continues through Micha
📜 Chronicles later names his descendants
🌳 Saul's line was almost erased
📖 A nearly wiped out family survives

## 🔄 All That Dwelt In The House Of Ziba Were Servants Unto Mephibosheth

This is a complete reversal from where the chapter started.

Ziba once served Saul's fallen house with no master left to serve.

Now Ziba's entire household answers to Saul's grandson instead.

One royal decision reorganizes an entire family's daily life.

🔄 A complete reversal from the start
🏚️ Ziba once served a fallen house
👑 Now his household answers to Mephibosheth
📖 One decision reorganizes an entire family

## 🏙️ Mephibosheth Dwelt In Jerusalem

Lodebar was a small, forgotten town far from any center of power.

Jerusalem was David's own capital city.

It was the center of the whole kingdom.

Moving Mephibosheth there was not just generous.

It was also a way to keep him close.

The forgotten grandson of Saul now lives inside the new king's own city.

🏙️ Jerusalem was the center of power
🚶 Mephibosheth moved from Lodebar to the capital
👀 Kindness and close watch traveled together
📖 A forgotten heir lives in the king's city

## 🦵 Was Lame On Both His Feet

The chapter opened by asking if anyone was left of Saul's house.

It closes by returning to the one physical detail that started this whole search.

Mephibosheth's lameness never changes throughout the chapter.

His whole life around it changes completely.

A king's kindness reached a man his condition could not improve on its own.

🦵 The chapter opened with this same detail
🔁 It closes by returning to it
🤝 His condition never changed, his life did
📖 Kindness reached what his condition could not fix
`.trim();

export const SECOND_SAMUEL_NINE_PERSONAL_SECTIONS = parseSecondSamuelNineRawNotes(SECOND_SAMUEL_NINE_RAW_NOTES);
