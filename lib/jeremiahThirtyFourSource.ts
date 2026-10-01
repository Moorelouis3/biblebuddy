export type JeremiahThirtyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahThirtyFourRawNotes(rawText: string): JeremiahThirtyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahThirtyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+34:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 34 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+34:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+34:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 34 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 34,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 34:${startVerse}` : `Jeremiah 34:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Jeremiah 34 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_THIRTY_FOUR_RAW_NOTES = `# Jeremiah 34:1-3
# ⚔️ A Message Before The Siege
---
## 🌍 All The Kingdoms Of The Earth Of His Dominion

Nebuchadnezzar did not march against Jerusalem alone.

He brought soldiers from every nation his empire controlled.

This phrase is not describing the entire planet.

It describes the full reach of Babylon's power at that moment.

🌍 Dominion means every land Babylon ruled
⚔️ Allied armies joined the siege
🏰 Jerusalem faced a massive coalition
📖 Babylon's full power stood against the city

## 🔥 He Shall Burn It With Fire

God states the ending of this siege before it even finishes.

Fire was the normal way ancient armies destroyed a captured city.

This would come true a few years later in Jeremiah's own lifetime.

The prophecy removes any doubt about how this war ends.

🔥 Fire was standard siege destruction
⏳ This happened later in Jeremiah's lifetime
😔 The outcome is already settled
📖 God names the ending in advance

## 👁️ Thine Eyes Shall Behold The Eyes Of The King Of Babylon

This idiom means Zedekiah would meet Nebuchadnezzar in person.

Kings usually fought through generals, never face to face.

This capture would be direct and personal, not distant.

Second Kings records a harsh twist on this exact meeting.

👁️ Beholding eyes means meeting face to face
👑 Kings rarely met enemies personally
⚠️ This capture would be direct and personal
📖 Second Kings records what happened next

## 🗣️ He Shall Speak With Thee Mouth To Mouth

Mouth to mouth means speaking in person, not through messengers.

Most communication between enemy kings happened through officials.

This meeting between Zedekiah and Nebuchadnezzar skips all of that.

The directness shows just how fully Zedekiah had lost control.

🗣️ Mouth to mouth means direct speech
📜 Messengers usually carried royal words
👑 This meeting skipped all of that
➡️ Zedekiah's control was completely gone

# Jeremiah 34:4-7
# 🕊️ A Promise Of A Peaceful Death
---
## 🕊️ Thou Shalt Not Die By The Sword

This is a real mercy tucked inside hard news.

Zedekiah will lose his throne and his freedom.

He will not die a violent death in battle.

God separates punishment from total destruction here.

🕊️ A real mercy inside hard news
👑 Zedekiah loses his throne, not his life
⚔️ No violent death in battle
📖 God separates punishment from destruction

## 🔥 The Burnings Of Thy Fathers

Burnings here does not mean the king's body was cremated.

It refers to spices and incense burned in his honor at the funeral.

Earlier kings of Judah received this same royal farewell.

God promises Zedekiah this same honor despite everything that is coming.

🔥 Burnings means spices burned in honor
👑 This was a royal funeral custom
📜 Earlier kings received the same honor
📖 Zedekiah is promised this despite judgment

## 😢 They Will Lament Thee, Saying, Ah Lord!

Ah lord was a set phrase used at royal funerals.

Mourners cried this exact phrase to honor a dying king.

Chapter twenty two already used this same funeral cry for a different king.

Zedekiah is promised the same public mourning here.

😢 Ah lord was a funeral cry
👑 It honored a dying king
📜 Chapter twenty two used this cry too
📖 Zedekiah is promised this same mourning

## 🏰 Against Lachish, And Against Azekah

These were two of the last fortified cities still standing in Judah.

Most of the countryside had already fallen to Babylon by this point.

Letters found by archaeologists near Lachish describe this exact desperate moment.

Time was running out fast when Jeremiah delivered this message.

🏰 Lachish and Azekah were the last cities
🗺️ Most of Judah had already fallen
📜 Archaeologists found letters from this siege
➡️ Time was running out fast

# Jeremiah 34:8-11
# 🔓 A Covenant To Set Them Free
---
## 📜 To Proclaim Liberty Unto Them

Zedekiah and the people made a public promise during the siege.

Proclaiming liberty meant legally freeing enslaved workers all at once.

This was not a new idea invented during the crisis.

It was an old command from the law of Moses, long ignored.

📜 Liberty meant legally freeing workers
🏛️ The whole city agreed together
⏳ The law had existed for centuries
📖 Zedekiah revived an old command

## 👥 An Hebrew Or An Hebrewess

This law applied only to fellow Israelites, not foreign slaves.

Hebrewess simply means a Hebrew woman, the female form of the word.

The law protected a brother or sister from permanent servitude.

Foreign slaves owned by Israelites were not covered by this specific command.

👥 Hebrew or Hebrewess means a fellow Israelite
♀️ Hebrewess is the female form
🚫 Foreign slaves were not included
📖 This law protected a brother or sister

## ✅ Then They Obeyed, And Let Them Go

For one brief moment, the whole city actually did the right thing.

Masters across Jerusalem released their Hebrew servants as promised.

This obedience happened in the middle of a terrifying siege.

It would not last very long.

✅ The whole city obeyed at first
🏙️ Servants were released across Jerusalem
⚔️ This happened during the siege
➡️ The obedience would not last

## ⛓️ Brought Them Into Subjection For Servants And For Handmaids

The people reversed their own promise almost as fast as they made it.

Freed servants were dragged back into slavery again.

Something must have changed to make owners want their workers back.

The next verses explain exactly how seriously God takes this reversal.

🔁 The promise was reversed quickly
⛓️ Freed servants were enslaved again
😔 Something shifted their decision
📖 God takes this reversal seriously

# Jeremiah 34:12-16
# 📜 The Covenant From Sinai Recalled
---
## 🇪🇬 Out Of The Land Of Egypt, Out Of The House Of Bondmen

God reminds Judah where their own story as a free people began.

Bondmen means slaves, exactly what their ancestors once were in Egypt.

A nation once enslaved themselves had just put their own people back in chains.

God's reminder makes the betrayal even harder to excuse.

⛓️ Bondmen means slaves
🇪🇬 Israel was once enslaved in Egypt
😔 They repeated that same injustice
📖 Their own history condemns this choice

## 🔢 At The End Of Seven Years Let Ye Go

This was an old law requiring Hebrew slaves to be freed every seven years.

A servant worked six years and went free in the seventh.

This command already existed long before Zedekiah's covenant in this chapter.

Earlier generations of Judah had simply ignored it for years.

🔢 Seven years was the cycle
🗓️ Six years served, then freedom
📜 This law predates Zedekiah's covenant
📖 Earlier generations had ignored it

## 🏛️ In The House Which Is Called By My Name

This covenant was not made in a palace or a courtroom.

It was made inside the temple itself, in God's own house.

Making a promise there meant calling God personally as a witness.

Breaking it was not just a broken deal between people.

🏛️ The covenant was made in the temple
👁️ God was called as a witness
📜 This was not an ordinary deal
➡️ Breaking it meant breaking faith with God

## 🚫 Ye Turned And Polluted My Name

Polluted here means dishonored or treated as cheap and worthless.

God's own name had been directly attached to this promise.

Breaking the covenant made God look unreliable in front of everyone.

Their choice damaged something bigger than their own reputation.

🚫 Polluted means treated as worthless
🏷️ God's name was tied to this vow
😔 Breaking it misrepresented God
📖 Their choice damaged more than a reputation

# Jeremiah 34:17-20
# 🐂 A Broken Oath, A Terrible Curse
---
## 🔁 To The Sword, To The Pestilence, And To The Famine

God turns their own word back on them with bitter irony.

They refused to give real liberty to their servants.

So God proclaims a liberty of his own for them instead.

This liberty only leads to war, disease, and starvation.

🔁 God repeats their own word back
🚫 They withheld true liberty from others
⚔️ Their liberty becomes war and disease
📖 Mercy refused becomes judgment received

## 🐂 When They Cut The Calf In Twain, And Passed Between The Parts Thereof

This describes an ancient covenant ceremony, not a sacrifice for food.

An animal was cut in half, with the two halves laid apart.

Both sides of a covenant then walked together between the pieces.

The ritual meant, let me become like this animal if I break this oath.

🐂 The calf was cut into two halves
🚶 Both sides walked between the pieces
⚠️ The walk meant a death oath
📖 Breaking this vow invited that same fate

## 👑 The Eunuchs, And The Priests

Eunuchs in a royal court were trusted officials, not only servants.

They often held real positions of power close to the king.

Priests were responsible for teaching and guarding God's law.

Both of these respected groups had broken this same covenant.

👑 Eunuchs were trusted court officials
⚖️ They held real positions of power
🙏 Priests were responsible for God's law
📖 Even respected leaders broke this vow

## ⚰️ Dead Bodies Shall Be For Meat Unto The Fowls Of The Heaven

A proper burial mattered deeply in this culture.

Being left unburied for birds and animals to eat was a horrifying curse.

This image was a common ancient way to describe total disgrace in defeat.

It signals the covenant breakers would die with no dignity at all.

⚰️ Proper burial mattered deeply then
🦅 Fowls eating a body meant disgrace
😨 This curse described utter defeat
📖 No dignity would remain for them

# Jeremiah 34:21-22
# 🔥 The Siege Returns
---
## ⏸️ The King Of Babylon's Army, Which Are Gone Up From You

Babylon's army had actually pulled back from Jerusalem for a short time.

An approaching Egyptian army had forced a brief pause in the siege.

That pause is likely what made freeing the servants feel safe enough to undo.

God warns that this relief is only temporary.

⏸️ The siege had briefly paused
🇪🇬 Egypt's army caused the pause
😌 False safety led to broken promises
➡️ This relief would not last

## 📯 Cause Them To Return To This City

God announces that he personally controls Babylon's next move.

The army that left would be sent straight back by God's own command.

Zedekiah's brief sense of relief was never going to hold.

The siege was only paused, never actually finished.

📯 God commands Babylon's return
🔁 The same army comes back
😔 Relief was never permanent
📖 God controls even enemy armies

## 🔥 They Shall Fight Against It, And Take It, And Burn It With Fire

This repeats almost word for word what God said back in verse two.

The outcome of this siege was never actually in question.

Breaking the covenant did not cause this judgment, it only confirmed it.

What was promised at the start of the chapter is sealed at the end.

🔁 This repeats the warning from verse two
🔥 The city's fall was always certain
📜 The broken covenant did not cause this
📖 The chapter ends exactly where it began

## 🏚️ A Desolation Without An Inhabitant

Desolation here means complete and total ruin, not light damage.

Without an inhabitant means no one would be left living there at all.

This devastating future for Judah actually happened a few years later.

The whole chapter closes on total loss, with no comfort attached.

🏚️ Desolation means total ruin
🚫 No one would remain living there
⏳ This happened a few years later
📖 The chapter ends without comfort
`.trim();

export const JEREMIAH_THIRTY_FOUR_PERSONAL_SECTIONS = parseJeremiahThirtyFourRawNotes(JEREMIAH_THIRTY_FOUR_RAW_NOTES);
