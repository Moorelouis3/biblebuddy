export type EzekielTwentyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielTwentyNineRawNotes(rawText: string): EzekielTwentyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielTwentyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+29:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 29 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+29:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+29:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 29 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 29,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 29:${startVerse}` : `Ezekiel 29:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 29 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_TWENTY_NINE_RAW_NOTES = `# Ezekiel 29:1-3
# 🐉 Pharaoh Claims The Nile As His Own
---
## 🧭 Set Thy Face Against Pharaoh King Of Egypt

Set thy face against is an old way of saying commit fully to a hard message.

Son of man is God's regular name for Ezekiel, a reminder that he is only human carrying this message.

Pharaoh was the royal title for Egypt's king, not a personal name.

This king was almost certainly Hophra, who ruled Egypt during Jerusalem's final years.

Egypt had promised military help against Babylon, then failed to deliver it.

🧭 Set thy face means full commitment
👤 Son of man names Ezekiel as human
👑 Pharaoh was a royal title, not a name
📖 Egypt failed Judah when it mattered most

## 🌍 Prophesy Against Him, And Against All Egypt

This judgment was never aimed at one man alone.

A king's pride and policy choices never stay contained to himself.

Egypt as a whole nation shared in the fallout from this one ruler's boast.

Scripture repeats this pattern often, where a leader's sin reaches an entire people.

👑 Judgment targets Pharaoh and the whole nation
🌍 A king's pride never stays contained
🔁 Scripture repeats this pattern often
📖 A leader's sin can touch an entire people

## 🐊 The Great Dragon That Lieth In The Midst Of His Rivers

Dragon here pictures a crocodile, the fearsome creature that ruled Egypt's rivers.

Egyptians actually worshipped the crocodile as a god named Sobek.

Calling Pharaoh a dragon in his own rivers turns his favorite symbol of power into a target.

The image was instantly recognizable to anyone who knew Egypt.

God is about to hunt the very creature Egypt worshipped as unstoppable.

🐊 Dragon pictures a crocodile, Egypt's fierce symbol
🐍 Egyptians worshipped the crocodile as a god
👑 This makes Pharaoh's own symbol the target
➡️ God hunts what Egypt thought was unstoppable

## 🌊 My River Is Mine Own, And I Have Made It For Myself

The river is the Nile, the single reason Egypt could survive in the desert.

Pharaoh claims credit for the Nile's floods and the crops they grew.

In reality Egypt depended completely on a river it never made.

This boast echoes the same root sin named against Tyre's king one chapter earlier.

Pride takes credit for gifts it never created.

🌊 The river means the Nile, Egypt's lifeline
👑 Pharaoh claims credit for what he never made
🔁 This echoes Tyre's king from the chapter before
📖 Pride claims credit for gifts it never made

# Ezekiel 29:4-6
# 🪝 Hooks In The Jaws Of The Dragon
---
## 🪝 I Will Put Hooks In Thy Jaws

Egyptian hunters really used hooks and ropes to drag a crocodile out of the water.

God describes Pharaoh's downfall using the exact method used to catch the creature he was just compared to.

A crocodile is fearsome in the river but helpless once hooked and dragged onto land.

Egypt's power only looked unstoppable inside its own territory.

🪝 Hooks picture a real crocodile hunting method
🐊 Pharaoh is caught like his own symbol
🌊 Egypt's strength depended on its own waters
➡️ Power that looks unstoppable can still fall

## 🐟 The Fish Of Thy Rivers Shall Stick Unto Thy Scales

This pictures Pharaoh dragged out of the river with every fish still clinging to him.

The fish stand for Egypt's people and allies, pulled down together with their king.

No one around Pharaoh escapes the consequences of his own pride.

A nation's leader can drag an entire people into his own judgment.

🐟 Fish picture Egypt's people and allies
🐊 They are pulled down together with Pharaoh
💔 No one near him escapes the fall
📖 A leader's pride can drag down a nation

## ⚰️ I Will Leave Thee Thrown Into The Wilderness

Normal Egyptian burial involved careful preservation of the body, most famously mummification.

Being left unburied in the open was one of the worst fates imaginable in this culture.

Scavenging birds and animals eating a king's body reversed every bit of royal honor.

This punishment targets the exact thing Egypt prided itself on protecting.

⚰️ Egypt prized careful burial, even mummification
🦅 This king gets no burial at all
💔 Scavengers eating him reverses all royal honor
➡️ Judgment targets what Egypt valued most

## 🌾 Staff Of Reed To The House Of Israel

A staff of reed means a walking stick cut from a weak, hollow river plant.

Judah had leaned on Egypt for military support against Babylon.

A reed snaps the instant real weight is placed on it.

Egypt's promised help was never going to hold Judah up at all.

🌾 Staff of reed means a weak, hollow support
🤝 Judah leaned on Egypt for help
💔 A reed snaps under real weight
📖 Egypt's promised help could never hold up Judah

# Ezekiel 29:7-9
# 🦯 A Broken Reed, A Desolate Land
---
## 🦯 Thou Didst Break, And Rend All Their Shoulder

This pictures Judah leaning on Egypt like a man leaning on a cane.

The cane snaps and the sharp broken edge tears into the shoulder instead of holding him up.

Trusting a weak support does not just fail, it can actively injure the one who leaned on it.

Egypt did not just disappoint Judah, it wounded it in the process.

🦯 Judah leaned on Egypt like a cane
💔 The cane broke and tore the shoulder
⚠️ A weak support can injure, not just fail
📖 Egypt wounded Judah instead of helping it

## 🦵 Madest All Their Loins To Be At A Stand

Loins at a stand is an old way of describing legs giving out, unable to hold up the body.

This is the same picture repeated twice in one verse, a hand that breaks and legs that fail.

Egypt's help did not disappoint once, it failed Judah in two separate ways.

Something that fails this many times was never real support to begin with.

🦵 Loins at a stand means legs giving out
🔁 This repeats the same picture twice
💔 Egypt failed Judah in two different ways
➡️ Something that fails twice was never real support

## ⚔️ I Will Bring A Sword Upon Thee

Sword here means judgment carried out through military conquest.

This judgment targets both man and beast, the whole of Egypt's life.

Nothing about Egypt's daily life is left untouched by this coming war.

God's judgment can reach further than a single battle or a single ruler.

⚔️ Sword means judgment through war
🐫 Man and beast means all of Egypt's life
🌍 Nothing is left untouched by this judgment
➡️ Judgment can reach further than one battle

## 🔁 They Shall Know That I Am The LORD

This exact phrase repeats constantly throughout the book of Ezekiel.

It is less a threat and more a promise that God's actions will make His identity unmistakable.

Egypt's own false boast about the river is quoted back here as the reason for its judgment.

A lie repeated back to its source becomes proof that the judgment is just.

🔁 This phrase repeats throughout Ezekiel
👀 It promises God will be known
💬 Egypt's own boast is quoted back to it
📖 A lie repeated back proves judgment is just

# Ezekiel 29:10-12
# 🏜️ Forty Years Of Desolation
---
## 🗺️ From The Tower Of Syene Even Unto The Border Of Ethiopia

Syene was a city at Egypt's southern edge, known today as Aswan.

Ethiopia here means the kingdom south of Egypt called Cush, not the modern nation by that name.

Naming both ends of the land means the judgment covers the entire country.

Nothing about Egypt escapes this from top to bottom.

🗺️ Syene marked Egypt's southern border, modern Aswan
🌍 Ethiopia here means ancient Cush, not today's nation
📏 Naming both ends covers the whole country
➡️ Nothing in Egypt escapes this judgment

## 🔢 Neither Shall It Be Inhabited Forty Years

Forty years is a number that shows up again and again at major turning points in scripture.

Israel wandered the wilderness for forty years.

Several judges and kings later reigned for periods measured in forties too.

The number signals a complete, measured season of consequence, not a random span of time.

Egypt's emptiness was not permanent, but it was not short either.

🔢 Forty years marks a complete, measured season
🚶 Israel's wilderness years used the same number
⏳ This signals real consequence, not randomness
📖 Egypt's emptiness had a set beginning and end

## 🌍 Desolate In The Midst Of The Countries That Are Desolate

Ezekiel had already pronounced this same kind of judgment against several nearby nations in earlier chapters.

Egypt's ruin sits inside a long list of other ruined countries, not standing alone.

This connects Egypt's fall to a wider pattern running through much of the book.

No single nation gets a free pass just because it is powerful.

🌍 Egypt joins a list of already judged nations
📜 This pattern runs through much of the book
⚖️ No nation gets a free pass from judgment
➡️ Power alone never buys an exception

## 🧺 I Will Scatter The Egyptians Among The Nations

Scattering a population was a common ancient punishment, already used against Israel itself.

It strips a nation of its identity by breaking up the people who shared it.

Egypt had used the fear of exile against Israel for generations.

Now Egypt faces the very scattering it had long threatened against others.

🧺 Scattering breaks up a people's shared identity
⚖️ This was a common ancient punishment
🔁 Egypt faces what it once threatened others with
📖 No nation is exempt from God's justice

# Ezekiel 29:13-16
# 🔁 Egypt Restored, But Never Great Again
---
## ⏳ At The End Of Forty Years Will I Gather The Egyptians

Judgment in Ezekiel is almost never God's last word.

Even a harsh forty year sentence ends with a real promise of return.

Egypt gets a future, something many other judged nations in this book never receive.

Mercy can follow discipline without erasing what the discipline accomplished.

⏳ Forty years ends with a real promise
🔁 Egypt is gathered back after judgment
🌍 Egypt gets a future other nations do not
📖 Mercy can follow discipline without canceling it

## 🏡 Return Into The Land Of Pathros, Into The Land Of Their Habitation

Pathros refers to Upper Egypt, the southern region along the Nile.

This was traditionally considered the original homeland of the Egyptian people.

Habitation points to a true homecoming, not just any resettlement.

Egypt gets to return to where its own story actually began.

🗺️ Pathros means Upper Egypt, the southern Nile
🏡 This was Egypt's traditional original homeland
🔁 Habitation points to a true homecoming
📖 Egypt returns to where its story began

## 📉 It Shall Be The Basest Of The Kingdoms

Basest means lowest in rank, no longer a power other nations fear.

Egypt had been one of the ancient world's great empires for centuries before this.

This promise of restoration still comes with a permanent demotion attached.

Egypt survives, but it never regains the dominance it once had.

📉 Basest means lowest in rank
👑 Egypt had been a great ancient empire
🔁 Restoration still came with permanent demotion
➡️ Survival did not mean regaining old power

## 🤝 No More The Confidence Of The House Of Israel

Confidence here means something Israel leaned on instead of trusting God.

Israel had repeatedly turned to Egypt for military help instead of relying on the LORD.

Watching Egypt's own weakness exposed was meant to finally break that habit.

A political alliance does not heal a lack of trust in God.

🤝 Confidence means something leaned on instead of God
🪢 Israel repeatedly turned to Egypt for help
👀 Egypt's weakness was meant to break that habit
📖 No alliance replaces trust in God

# Ezekiel 29:17-21
# 💰 Egypt Given To Babylon As Wages
---
## 📅 In The Seven And Twentieth Year, In The First Month

This date places the prophecy about sixteen years after the one earlier in this chapter.

Ezekiel's prophecies are not always arranged in the order he received them.

This later dated message sits here because it continues the same subject, Egypt's fate.

The book groups prophecies by topic as often as by timeline.

📅 This date is sixteen years later than before
🔀 Ezekiel's messages are not always in time order
🔁 It was placed here because the topic matches
📖 The book groups by subject, not just time

## 💪 Every Head Was Made Bald, And Every Shoulder Was Peeled

This describes soldiers physically worn down by years of hard labor.

Nebuchadnezzar's army besieged Tyre for about thirteen years before this chapter was written.

Bald heads came from digging siege works without rest.

Peeled shoulders came from hauling heavy materials against the city walls.

Despite all that effort, the army still walked away without the rich plunder a siege like this usually brought.

⚔️ This pictures soldiers worn out from siege work
🏙️ Babylon besieged Tyre for about thirteen years
💪 Siege work wore down their bodies
➡️ All that effort still brought no real plunder

## 👑 I Will Give The Land Of Egypt Unto Nebuchadrezzar

God hands Egypt to Babylon's king as a kind of consolation prize.

Nebuchadnezzar's long campaign against Tyre had cost enormously and paid back very little.

Egypt becomes the payment Tyre never provided.

Even a pagan king's military campaigns fall under God's larger plan.

👑 Egypt becomes Nebuchadnezzar's consolation prize
🏙️ Tyre's long siege had cost him dearly
💰 Egypt pays the debt Tyre never did
📖 God's plan rules even pagan campaigns

## 💪 I Have Given Him The Land Of Egypt For His Labour

Labour here means the exhausting, costly work of the siege against Tyre.

Nebuchadnezzar never set out to serve God's purposes on purpose.

Wrought for me means his actions still ended up accomplishing exactly what God intended.

A ruler does not have to know God's plan to end up fulfilling part of it.

💪 Labour means the costly siege against Tyre
🙈 Nebuchadnezzar never meant to serve God's plan
🔁 Wrought for me means it worked out anyway
📖 God can use intentions that are not His

## 🐂 I Will Cause The Horn Of The House Of Israel To Bud Forth

A horn is a common Old Testament picture of strength and renewed power.

This promise points forward to real restoration still ahead for Israel.

Opening the mouth means Ezekiel will finally be free to speak plainly again.

Earlier in his ministry Ezekiel had been struck silent for long stretches by God himself.

Egypt's judgment and Israel's hope close out this chapter side by side.

🐂 A horn pictures strength and renewed power
🌱 This points forward to Israel's real restoration
🗣️ Opening his mouth means Ezekiel can finally speak
📖 Egypt's fall and Israel's hope end together`.trim();

export const EZEKIEL_TWENTY_NINE_PERSONAL_SECTIONS = parseEzekielTwentyNineRawNotes(EZEKIEL_TWENTY_NINE_RAW_NOTES);
