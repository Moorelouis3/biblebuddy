export type PsalmsFortySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFortySevenRawNotes(rawText: string): PsalmsFortySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFortySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+47:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 47 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+47:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+47:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 47 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 47,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 47:${startVerse}` : `Psalms 47:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 47 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FORTY_SEVEN_RAW_NOTES = `# Psalms 47:1-4
# 👏 A Call To Shout And Clap
---
## 👏 O Clap Your Hands, All Ye People

Clapping here does not mean casual applause.

In the ancient Near East, clapping hands was a public gesture of paying homage to a king.

The psalm opens by inviting the whole crowd to treat God exactly like their reigning monarch.

Every listener, not just priests or musicians, gets called into this act of respect.

👏 Clapping was not casual applause here
👑 Clapping showed homage to a king
🌍 Every listener joins the tribute
📖 God is treated as reigning monarch

## 📯 Shout Unto God With The Voice Of Triumph

"Triumph" here means the loud shout after winning a battle.

In ancient Israel, that same shout also opened royal coronations, not only military victories.

This single cry ties two big ancient moments together, a king crowned and a war finally won.

The psalm asks worshipers to greet God with that same explosive joy.

📯 Triumph means a victorious battle shout
👑 The same shout crowned new kings
⚔️ It links coronation and victory together
📖 Worshipers greet God with that joy

## 😨 The LORD Most High Is Terrible

"Terrible" here does not mean scary in a bad way.

It means someone who inspires deep awe and reverent fear.

"Most High" is a title naming God as supreme over every other power.

Ancient kings were feared for their armies, but this fear points to something far greater.

😨 Terrible means inspiring deep awe
👑 Most High names God as supreme
⚔️ Kings were feared for armies alone
📖 God's fear points to something greater

## 🌍 A Great King Over All The Earth

This does not mean God only rules over Israel.

"All the earth" means every nation, including people who do not worship Him by name.

Israel already praised God as King in earlier psalms.

This verse pushes that claim to cover the whole world, centuries before it was fully understood.

🌍 Not a claim only about Israel
👑 All the earth means every nation
📜 Israel already praised God as King
📖 The claim covers the whole world

## ⚔️ He Shall Subdue The People Under Us

"Subdue" means to defeat and bring under control.

This recalls real military victories God gave Israel over surrounding nations.

The psalm credits God directly for those wins, not Israel's own army.

Every conquest in Israel's history traces back to this same claim.

⚔️ Subdue means defeat and control
🏹 Real past victories stand behind this
🙌 God gets credit, not the army
📖 Every conquest traces back to God

## 👣 The Nations Under Our Feet

"Under our feet" describes total control over a defeated enemy.

In the ancient world, placing a real foot on someone was a public sign of their defeat.

Joshua once told his commanders to literally put their feet on the necks of defeated kings.

This verse borrows that same picture to describe what God has done for Israel.

👣 Under our feet means total control
📜 Joshua used that exact picture once
🏆 The verse borrows that old image
📖 Total control, not just a win

## 🗺️ He Shall Choose Our Inheritance For Us

"Inheritance" here means the promised land given to Israel.

Israel did not earn this land through conquest alone.

God is the one who chose and assigned it to them.

That land was a gift tied to a promise made generations earlier to Abraham.

🗺️ Inheritance means the promised land
🎁 Israel received it as a gift
🙏 God chose and assigned the land
📖 It fulfilled a promise to Abraham

## 💎 The Excellency Of Jacob Whom He Loved Selah

"Excellency" here means something of great beauty or worth.

"Jacob" stands in for the whole nation of Israel, named after their ancestor.

The land itself is being called beautiful because God loved the people He gave it to.

"Selah" likely marked a pause, inviting the singers to reflect before moving on.

💎 Excellency means great beauty or worth
👤 Jacob represents the whole nation
❤️ The land reflects God's love
📖 Selah invites a pause here

# Psalms 47:5-7
# 🎺 God Ascends Amid Shouting And Song
---
## 📯 God Is Gone Up With A Shout

"Gone up" pictures God ascending like a king entering his throne room.

Many scholars believe this recalls the ark of the covenant being carried up to Jerusalem.

The ark represented God's presence among His people in a very physical way.

This verse pictures a coronation moment for the true King of Israel.

📯 Gone up pictures a king enthroned
📦 It may recall the ark's journey
🏙️ The ark carried God's presence
📖 This verse pictures God's coronation

## 🎺 The Sound Of A Trumpet

The trumpet here was a ram's horn called a shofar.

Ancient Israel blew this horn for war signals, festivals, and crowning new kings.

Hearing it in this psalm ties directly back to the coronation picture just described.

The same instrument that called armies to battle also announced a king's reign.

🎺 The trumpet was a ram's horn
⚔️ It signaled war and festivals
👑 It also announced new kings
📖 One instrument, many important moments

## 🎶 Sing Praises To God, Sing Praises

This exact phrase is repeated four times in a single verse.

Hebrew poetry often repeats a line on purpose instead of varying the words.

"Praises" here carries the idea of singing while playing an instrument, not just speaking words.

The repetition itself is meant to build energy as the song is sung out loud.

🔁 The phrase repeats four times
📜 Hebrew poetry repeats for emphasis
🎵 Praises includes singing with instruments
📖 Repetition builds energy in the song

## 🤝 Sing Praises Unto Our King

Verse two already called God King over the whole earth.

This line adds something personal to that same truth.

"Our King" means Israel gets to claim this ruler as their own.

A king who rules everyone still belongs specifically to the people who sing this song.

🌍 Verse two named God as world King
🤝 Our King adds a personal claim
👪 Israel claims this ruler as theirs
📖 A world ruler who is also theirs

## 🌍 God Is The King Of All The Earth

This exact claim already appeared back in verse two.

Repeating it here is not an accident or careless copying.

The psalm wants this truth stated more than once so it cannot be missed.

By verse seven, the whole song has circled back to its central point.

🔁 This claim already appeared in verse two
🎯 Repeating it is intentional, not careless
📢 The truth gets stated more than once
📖 The song circles back to its point

## 🧠 Sing Ye Praises With Understanding

"With understanding" does not mean simply knowing the words to a song.

It means singing with real thought and insight into what is actually being said.

Some Psalm titles use a related Hebrew word for a song meant to teach, not just perform.

This verse calls for worship that engages the mind, not only the voice.

🧠 Understanding means real thought, not noise
🎼 It echoes psalm titles about teaching songs
🗣️ This is worship with the mind engaged
📖 True praise involves the mind too

# Psalms 47:8-9
# 👑 God Reigns Over Every Nation
---
## 🌍 God Reigneth Over The Heathen

"Heathen" is an old word for nations who did not worship the true God.

The psalm has already claimed God as King of all the earth.

Here it goes further, saying He actually reigns even over nations who reject Him.

Their disbelief does not remove His actual rule over them.

🌍 Heathen means nations without true worship
👑 God reigns even over unbelieving nations
🚫 Disbelief does not cancel His rule
📖 His kingship covers every nation

## ✨ The Throne Of His Holiness

Most ancient thrones were symbols of raw military power.

This throne is described a different way entirely.

"Holiness" means being set apart, pure, and completely unlike anything ordinary.

God's rule rests on His own perfect character, not on armies or conquest.

⚔️ Most thrones symbolized military power
✨ Holiness means set apart and pure
👑 This throne rests on God's character
📖 Perfect character, not conquest, is the base

## 🤝 The Princes Of The People Are Gathered Together

"Princes" here means the rulers and nobles of other nations, not only Israel's own leaders.

This verse pictures foreign leaders gathering together to worship the true God.

These are the very same heathen nations named just one verse earlier.

The psalm imagines outsiders finally joining Israel's worship.

👑 Princes means rulers of other nations
🌍 Foreign leaders are pictured worshiping here
🔄 These are the same heathen from before
📖 Outsiders finally join Israel's worship

## 📜 The People Of The God Of Abraham

This phrase explains exactly who those gathered princes have become.

They are no longer treated as outsiders once they join this worship.

God had promised Abraham that all nations would eventually be blessed through his family.

This verse pictures that ancient promise beginning to come true.

📜 This names them as Abraham's people
🚫 They are no longer outsiders here
🤝 Abraham was promised blessing for all nations
📖 This pictures that promise coming true

## 🛡️ The Shields Of The Earth Belong Unto God

A "shield" in this kind of poetry often stands for a ruler or protector, not the actual object.

Kings were sometimes called shields because their job was to protect their people.

This verse says every ruler on earth, no matter how powerful, ultimately belongs to God.

Even the protectors of nations answer to a higher King.

🛡️ Shield here means a ruler or protector
👑 Kings were sometimes called shields
🌍 Every ruler ultimately belongs to God
📖 Even protectors answer to a higher King

## 🙌 He Is Greatly Exalted

"Exalted" means lifted up high above everyone and everything else.

The psalm has moved from a loud opening shout to this final quiet declaration.

Every nation, every king, and every shield named in this psalm sits beneath this one claim.

The whole song ends exactly where it began, with God above all.

🙌 Exalted means lifted far above
🎶 The psalm moves from shout to declaration
👑 Every ruler sits beneath this claim
📖 The song ends where it began
`.trim();

export const PSALMS_FORTY_SEVEN_PERSONAL_SECTIONS = parsePsalmsFortySevenRawNotes(PSALMS_FORTY_SEVEN_RAW_NOTES);
