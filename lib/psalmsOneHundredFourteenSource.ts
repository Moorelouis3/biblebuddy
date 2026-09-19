export type PsalmsOneHundredFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredFourteenRawNotes(rawText: string): PsalmsOneHundredFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+114:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 114 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+114:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+114:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 114 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 114,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 114:${startVerse}` : `Psalms 114:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 114 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_FOURTEEN_RAW_NOTES = `# Psalms 114:1-2
# 🇪🇬 When Israel Went Out Of Egypt
---
## 🇪🇬 When Israel Went Out Of Egypt

This line names the exact moment Israel became a free nation.

For four hundred years Israel had lived under harsh slavery in Egypt.

The Exodus was not just an escape from hard work.

It was the birth of Israel as God's own people.

This psalm opens by remembering that single defining event.

🇪🇬 Names Israel's escape from Egypt

⛓️ Ended four hundred years of slavery

👶 Marked Israel's birth as a nation

📖 The psalm opens by remembering it

## 👪 The House Of Jacob From A People Of Strange Language

"House of Jacob" means the same people as Israel, all of Jacob's descendants.

Jacob was renamed Israel after wrestling with God through the night.

Both names point to the exact same family.

"A people of strange language" refers to the Egyptians, whose language Israel did not share.

Living for centuries inside a different language and culture made Egypt feel foreign.

This line pictures the same family surrounded by a home that never felt like home.

👪 House of Jacob means Israel's family

🔄 Jacob was renamed Israel

🗣️ Strange language points to Egyptian speech

📖 Egypt never truly felt like home

## 🏛️ Judah Was His Sanctuary

"Sanctuary" means a place set apart as holy, where God is present in a special way.

The tribe of Judah marched first among the twelve tribes through the wilderness.

Judah later became the tribe of Israel's kings, including David.

Jerusalem and its temple, the true sanctuary, both stood inside Judah's territory.

Naming one tribe as God's sanctuary points ahead to the temple God would later choose.

🏛️ Sanctuary means a holy set apart place

🚶 Judah marched first through the wilderness

👑 Judah became the tribe of kings

📖 Jerusalem's temple stood in Judah's land

## 👑 And Israel His Dominion

"Dominion" means the territory or kingdom that a ruler governs.

Here Israel is called God's own dominion, the people He rules directly.

An earthly king rules land he inherited or conquered by force.

God ruling Israel as His dominion means Israel never belonged to itself.

The whole nation existed under God's own kingship from the very beginning.

👑 Dominion means the land a ruler governs

🗺️ Israel is called God's own territory

🚫 Israel never belonged to itself

📖 God ruled Israel from the beginning

# Psalms 114:3-4
# 🌊 The Sea Saw It And Fled
---
## 🌊 The Sea Saw It And Fled

The sea here means the Red Sea, the water Israel crossed after leaving Egypt.

"It" refers to God himself, present with Israel as they left.

The psalm pictures the sea as if it were alive, watching God approach.

Real water cannot see or feel fear, so this is a poetic picture, not a literal claim.

The image makes God's power over creation feel immediate and personal.

🌊 The sea points to the Red Sea

👀 It refers to God's own presence

🎭 Pictures the sea as alive with fear

📖 Shows God's power over creation

## 🏞️ Jordan Was Driven Back

The Jordan River was the second body of water Israel crossed, forty years after the Red Sea.

Joshua led Israel through the Jordan on the way into the promised land.

Pairing the sea and the Jordan together links two separate miracles into one pattern.

Both times, water that should have blocked Israel instead stepped out of the way.

God repeated the same kind of miracle at the start and the end of the wilderness years.

🏞️ Jordan was crossed entering Canaan

🕰️ Happened forty years after the Red Sea

🔗 Links two separate miracles together

📖 God repeated the same kind of miracle

## 🐏 The Mountains Skipped Like Rams

"Skipped" pictures a sudden, energetic leap, not a slow shifting.

A ram is a full grown male sheep, strong and physically powerful.

This likely recalls Mount Sinai, which shook violently when God came down on it.

Solid, unmoving mountains are pictured jumping like frightened animals.

Nothing in creation stays still when God draws near.

🐏 Rams are strong grown male sheep

⛰️ Mountains pictured leaping suddenly

🔥 Likely recalls Mount Sinai shaking

📖 Nothing stays still near God

## 🐑 And The Little Hills Like Lambs

A lamb is a young sheep, smaller and more playful than a full grown ram.

Pairing mountains with rams and hills with lambs matches size to size in the picture.

This kind of matching is called parallelism, a common pattern in Hebrew poetry.

Saying the same idea twice with different pictures makes the point land harder.

Even the smallest hills react the same way as the largest mountains.

🐑 Lambs are young playful sheep

⚖️ Hills matched to lambs by size

📜 This pattern is called parallelism

📖 Even small hills react like mountains

# Psalms 114:5-6
# ❓ What Ailed Thee, O Thou Sea, That Thou Fleddest
---
## 😟 What Ailed Thee O Thou Sea That Thou Fleddest

"Ailed" is an old word that means to be troubled or in some kind of distress.

The psalm suddenly turns and speaks straight to the sea as if it could answer.

Speaking directly to something that cannot talk is called personification.

The question sounds almost like teasing, as if the psalm already knows the real answer.

This kind of direct address builds suspense before the true reason is revealed.

😟 Ailed means troubled or distressed

🗣️ The psalm speaks directly to the sea

🎭 This device is called personification

📖 Builds suspense before the real answer

## 🔁 Thou Jordan That Thou Wast Driven Back

The same question now repeats, aimed at the Jordan River instead of the sea.

Repeating the exact question for a second subject is a common feature of Hebrew poetry.

It forces the reader to hold both miracles, the sea and the river, together in mind.

Neither miracle is treated as more important than the other.

The pause created by asking instead of just telling makes the answer feel earned.

🔁 Repeats the question for the Jordan

📜 Common feature of Hebrew poetry

⚖️ Treats both miracles as equally important

📖 The pause makes the answer feel earned

## 📢 Ye Mountains That Ye Skipped Like Rams

Verses three and four stated plainly that the mountains skipped like rams.

This verse turns that same statement into a direct question aimed at the mountains themselves.

Turning a description into a question is called an apostrophe, speaking to something that cannot answer.

The shift from statement to question raises the tension right before the psalm gives its answer.

Even something as massive and lifeless as a mountain gets addressed like a person.

📢 Verses three and four stated this plainly

❓ This verse turns it into a question

🎭 Speaking to mountains is called apostrophe

📖 Raises tension before the answer comes

## 🐑 And Ye Little Hills Like Lambs

Mountains and hills complete the exact same pair the psalm used earlier as a statement.

Four full lines have now been spent asking why creation reacted this way.

No answer has been given yet, on purpose.

The very next verse finally answers every question this whole section has raised.

Hebrew poetry often builds this kind of tension before landing on its point.

🐑 Completes the mountains and hills pair

❓ Four lines built up the question

⏳ No answer given yet, on purpose

📖 The next verse finally answers it

# Psalms 114:7-8
# 🌍 Tremble, Thou Earth, At The Presence Of The Lord
---
## 🌍 Tremble Thou Earth At The Presence Of The Lord

"Tremble" means to shake, usually from fear or overwhelming power.

This line finally answers the question raised through the whole section before it.

The sea, the Jordan, and every hill reacted for one shared reason.

"Presence" means God was truly and actively there, not just remembered.

Creation itself cannot stay calm once its maker draws near.

🌍 Tremble means to shake with fear

❓ Finally answers the earlier questions

👑 God's presence caused every reaction

📖 Creation cannot stay calm near God

## 👪 At The Presence Of The God Of Jacob

"The God of Jacob" ties this whole psalm back to its opening line about the house of Jacob.

Naming God this way ties him to one specific family, not an unknown distant power.

Jacob himself once wrestled with God through a whole night and would not let go.

The same God who wrestled with one man now shakes the whole earth.

Repeating "at the presence of" twice in one verse adds weight through repetition, a common feature of Hebrew poetry.

👪 Ties back to the house of Jacob

🤼 Jacob once wrestled with God directly

🌍 Same God now shakes the earth

📖 Repetition adds weight in Hebrew poetry

## 🪨 Which Turned The Rock Into A Standing Water

This recalls a real event from the wilderness years, not a brand new miracle.

At two different points, God brought water out of solid rock for Israel to drink.

"Standing water" pictures a pool sitting still, freshly formed where there had only been stone.

The same God who parted seas could also turn dry stone into a water source.

Nothing in creation, moving or solid, stays fixed once God acts on it.

🪨 Recalls God bringing water from rock

💧 Happened at two points in the wilderness

🏞️ Standing water means a fresh still pool

📖 Nothing stays fixed once God acts

## ⛲ The Flint Into A Fountain Of Waters

"Flint" is an extremely hard type of stone, even harder than ordinary rock.

A "fountain" pictures water actively flowing out, not just sitting still like a pool.

Naming flint instead of an easier stone makes the miracle even more striking.

This whole psalm moves from Egypt, to the sea, to the mountains, and now to a rock in the desert.

Every obstacle in Israel's story bent to God's presence, water, mountains, and stone alike.

🪨 Flint is an extremely hard stone

⛲ Fountain pictures water flowing out

💪 Naming flint makes it more striking

📖 Every obstacle bent to God's presence
`.trim();

export const PSALMS_ONE_HUNDRED_FOURTEEN_PERSONAL_SECTIONS = parsePsalmsOneHundredFourteenRawNotes(
  PSALMS_ONE_HUNDRED_FOURTEEN_RAW_NOTES
);
