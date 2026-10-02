export type EzekielNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielNineteenRawNotes(rawText: string): EzekielNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 19:${startVerse}` : `Ezekiel 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 19 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_NINETEEN_RAW_NOTES = `# Ezekiel 19:1-2
# 🦁 A Lamentation For The Princes
---
## 🦁 Take Thou Up A Lamentation For The Princes Of Israel

A lamentation is a formal funeral song sung over the dead.

God tells Ezekiel to sing one now, while the kings of Judah are still alive.

Singing it early is itself a warning.

Their end is already as certain as a death that already happened.

🎵 lamentation means a formal funeral song
⚠️ God has Ezekiel sing it early
👑 princes refers to the kings of Judah
📖 their downfall is already certain

## 🦁 What Is Thy Mother? A Lioness

Judah itself is pictured here as a lioness.

A mother lion is fierce enough to defend her cubs against anything.

The nation that raised these kings had real strength of its own.

That strength makes what happens next even more tragic.

🦁 the mother lioness pictures Judah itself
💪 a lioness defends her cubs fiercely
👑 Judah had real strength of its own
📖 that strength makes the fall tragic

## 🌍 She Lay Down Among Lions

This does not mean Judah literally lived among wild animals.

Lions here stand for strong, dangerous nations surrounding Judah.

Egypt and Babylon were the two biggest lions in that region.

Judah grew up small, pinned between two much larger powers.

🙅 lions here are not literal animals
🌍 lions picture strong, dangerous nations
⚔️ Egypt and Babylon were the biggest
📖 Judah grew up between two powers

## 🍼 She Nourished Her Whelps Among Young Lions

To nourish means to raise and feed something until it grows strong.

A whelp is a young, not yet grown cub.

Judah is pictured raising her own kings the same way a lioness raises cubs.

Young lions nearby means these cubs grew up surrounded by other rising powers.

🍼 nourish means to raise and feed
🦁 a whelp is a young cub
👑 Judah raised her kings this way
📖 these cubs grew up among rivals

# Ezekiel 19:3-4
# 🦁 The First Lion Cub
---
## 👑 It Became A Young Lion

This whelp refers to one particular son who rose to the throne.

Many scholars believe this is Jehoahaz, who ruled Judah only three months.

Becoming a young lion pictures him growing into real royal power.

Growing strong did not mean growing wise or faithful to God.

👑 this whelp is a named son of Judah
📜 many scholars believe this is Jehoahaz
🦁 becoming a lion means gaining power
📖 strength did not mean faithfulness

## 🎯 It Learned To Catch The Prey

Catching prey here means ruling by force instead of by justice.

A lion does not negotiate with what it hunts.

Learning to catch prey pictures this king learning to rule the same way.

Power was something he practiced, not something he was simply given.

🎯 catching prey means ruling by force
🦁 a lion never negotiates with prey
👑 this king practiced ruling this way
📖 power was practiced, not simply given

## 🦁 It Devoured Men

Devouring men means this king turned his power against actual people.

A hunting lion is dangerous in the wild.

A king who rules like a hunting lion is dangerous to his own nation.

This line turns the proud metaphor of verse two into a warning.

🦁 devouring men means harming real people
🌍 a lion is dangerous in the wild
👑 a king like this harms his nation
📖 the proud picture becomes a warning

## 🕳️ He Was Taken In Their Pit

Hunters in the ancient world often trapped lions by digging a hidden pit.

The lion would fall through a covering of branches into the hole below.

This king fell the same way, caught by a trap he could not see coming.

His own strength and pride never protected him once stronger powers moved against him.

🕳️ hunters trapped lions using hidden pits
🦁 the lion fell through a hidden covering
👑 the king was caught the same way
📖 pride could not protect him from capture

## 🏺 Brought Him With Chains Unto The Land Of Egypt

Judah's kings answered to Egypt during this part of its history.

Many scholars believe this king is Jehoahaz, son of Josiah.

Pharaoh Necho removed him from the throne and carried him away in chains.

Jehoahaz died in Egypt and never saw his own land again.

🏺 Egypt controlled Judah during this period
📜 many scholars believe this is Jehoahaz
⛓️ Pharaoh Necho carried him away in chains
📖 he died in Egypt, never to return

# Ezekiel 19:5-6
# 🦁 The Second Lion Cub Rises
---
## ⌛ Her Hope Was Lost

Judah had been waiting for her first son to come back from Egypt.

That hope is described here as completely gone.

Losing hope in one son pushed her to raise up another in his place.

The pattern of relying on human kings was about to repeat itself.

⌛ Judah waited for her first son
🙅 that hope is now completely gone
👑 she raised up a second son instead
📖 the same pattern was about to repeat

## 👑 She Took Another Of Her Whelps

This second whelp is another of Judah's own royal sons.

Many scholars connect this king to either Jehoiakim or his son Jehoiachin.

Both of them ruled only a short time after the first lion was gone.

Judah kept turning to the same royal line even as it kept failing her.

👑 this whelp is another royal son
📜 many connect this to Jehoiakim or Jehoiachin
⏳ both ruled only a short time after
📖 Judah kept trusting the same royal line

## 🦁 He Went Up And Down Among The Lions

This king moved among the same powerful nations as the first lion cub.

The wording almost repeats word for word from the earlier verses.

Repeating it on purpose shows the same pattern playing out again.

A new king did not mean a new direction for Judah.

🦁 this king moved among the same nations
🔁 the wording repeats from the earlier verses
📏 the same pattern plays out again
📖 a new king brought no new direction

## 🔁 Learned To Catch The Prey, And Devoured Men

This exact description already happened once in this same chapter.

Repeating the same violent pattern twice proves it was never an accident.

Each king who rises this way ends up ruling by force instead of justice.

The second lion cub becomes just as dangerous as the first.

🔁 this pattern already happened once before
🦁 repeating it proves it was no accident
⚔️ ruling by force replaces ruling by justice
📖 the second cub turns just as dangerous

# Ezekiel 19:7-9
# ⛓️ The Second Lion Cub Falls
---
## 🏛️ He Knew Their Desolate Palaces, And He Laid Waste Their Cities

Desolate here means abandoned and left in ruins.

This king's own rule left palaces empty and cities damaged.

A lion does not build, it only takes and destroys.

The same was true of a king who ruled only by force.

🏛️ desolate means abandoned and left in ruins
💥 this king's rule left real damage behind
🦁 a lion only takes, it never builds
📖 force without justice only destroys

## 🔊 By The Noise Of His Roaring

A lion's roar is loud enough to be heard and feared from far away.

Roaring here pictures this king's power on public display.

The land itself is described as desolate because of that display of power.

Fear spread through the land before any actual battle began.

🔊 a lion's roar carries far and wide
👑 roaring pictures this king's power on display
🌍 the land suffered under that display
📖 fear spread before any battle began

## 🌍 The Nations Set Against Him On Every Side

Surrounding nations eventually banded together against this king.

Coming from every side meant he had no safe direction left to turn.

A lion used to being feared suddenly became the one being hunted.

Power built on force rarely keeps enough friends to survive a real threat.

🌍 nearby nations banded together against him
🧭 no safe direction was left to turn
🦁 the hunter suddenly became the hunted
📖 force rarely keeps friends in a crisis

## 🕸️ Spread Their Net Over Him

Hunters used nets along with pits to trap a lion from every angle.

This phrase pictures a coordinated trap, not a lucky capture.

The first lion cub was taken in a pit the same way back in verse four.

Repeating the same language on purpose shows the same pattern striking twice.

🕸️ hunters used nets along with pits
🎯 this was a planned trap, not luck
🔁 the first cub fell the same way
📖 the same downfall pattern strikes twice

## ⛓️ Brought Him To The King Of Babylon

This king was put under armed guard and bound before being taken away.

Many scholars connect this capture to Jehoiakim or his son Jehoiachin.

Babylon, not Egypt, was now the power controlling Judah's throne.

The same royal line that once answered to Egypt now answered to Babylon instead.

⛓️ he was guarded and bound before leaving
📜 many connect this to Jehoiakim or Jehoiachin
🏛️ Babylon now controlled Judah's throne
📖 the throne answered to a new empire

## 🔇 His Voice Should No More Be Heard Upon The Mountains Of Israel

A lion's roar carried across the hills and warned everyone nearby.

Silencing that roar for good meant this king would never rule from Israel again.

The exile was not a pause in his reign, it was the end of it.

The loudest voice in the land had finally gone completely quiet.

🔇 the roar is silenced for good
🏔️ he would never rule from Israel again
⚰️ exile ended his reign for good
📖 the loudest voice finally went quiet

# Ezekiel 19:10-11
# 🍇 A Vine Planted By The Waters
---
## 🍇 Thy Mother Is Like A Vine In Thy Blood

The picture suddenly changes from a lioness to a grapevine.

Judah is still the mother being described, just in a new image.

A vine pictures steady growth instead of a lion's raw strength.

Both pictures describe the same nation from two different angles.

🍇 the metaphor changes from lion to vine
🌱 Judah is still the same mother
🌿 a vine pictures steady growth, not force
📖 two pictures describe one nation

## 🌊 Planted By The Waters

Rivers in the ancient world meant steady water for crops all year long.

A vine planted by water grows thick and produces fruit reliably.

This pictures Judah's kingdom in a season of real strength and stability.

Fruitfulness here points to the size and success of the royal family.

🌊 rivers gave steady water for crops
🍇 a vine by water grows thick and fruitful
👑 this was Judah's season of real strength
📖 fruitfulness pictures the royal family's success

## 🌿 Strong Rods For The Sceptres Of Them That Bare Rule

A rod here means a strong branch of the vine.

A sceptre is a rod a king holds to show royal authority.

These branches picture the line of kings who came from this nation.

The vine was not just surviving, it was producing royalty.

🌿 a rod means a strong branch
👑 a sceptre is a king's symbol of rule
🍇 the branches picture Judah's line of kings
📖 the vine produced real royalty

## 📏 Her Stature Was Exalted Among The Thick Branches

Stature here means height and visible greatness.

Exalted means lifted up high above everything around it.

This vine was not hidden, it stood out above every other plant nearby.

Judah's kingdom, at this point, looked unstoppable from the outside.

📏 stature means height and visible greatness
⬆️ exalted means lifted up high
🌿 the vine stood out above everything else
📖 the kingdom looked unstoppable from outside

# Ezekiel 19:12-14
# 🔥 The Vine Is Uprooted And Burned
---
## 🌿 She Was Plucked Up In Fury

Plucked up means torn out of the ground by the roots.

Fury here describes real judgment, not a careless accident.

A vine this strong does not fall over on its own.

Something far more powerful than the vine itself tore it out.

🌿 plucked up means torn out by the roots
🔥 fury describes real judgment, not an accident
💪 a vine this strong does not fall alone
📖 a greater power tore it out

## 🏜️ The East Wind Dried Up Her Fruit

In the ancient Near East, the east wind usually blew in hot and dry from the desert.

Farmers feared it because it could ruin crops within a single day.

Many scholars believe the east wind here pictures the power of Babylon.

Babylon sat generally east of Judah, so the image fit its enemy exactly.

🏜️ the east wind blew hot and dry
🌾 farmers feared it could ruin crops fast
🔥 many believe it pictures Babylon's power
📖 Babylon's location matched the image exactly

## 🥀 Her Strong Rods Were Broken And Withered

These are the same strong rods used for royal sceptres back in verse eleven.

Breaking them means the royal line itself was being destroyed.

Withered means dried out and dead, with no strength left at all.

The very thing that once proved Judah's greatness was now gone.

🌿 these are the same rods from verse eleven
💔 breaking them means ending the royal line
🥀 withered means dried out, with no strength left
📖 Judah's proof of greatness was now gone

## 🏜️ Planted In The Wilderness, In A Dry And Thirsty Ground

The wilderness is the opposite of the fruitful riverbank from verse ten.

Dry and thirsty ground cannot grow or sustain anything planted in it.

This pictures Judah's exile, cut off from the life it once had.

A vine cannot thrive in a place built for nothing to grow.

🏜️ the wilderness opposes the riverbank from before
🌾 dry ground cannot sustain anything planted
🔗 this pictures Judah's exile from home
📖 nothing can grow in a place like this

## 🔥 Fire Is Gone Out Of A Rod Of Her Branches

This fire does not come from an outside enemy this time.

It comes from one of the vine's own branches instead.

Many scholars believe this pictures Judah's own last king bringing on its final ruin.

The vine's own royal line helped finish what Babylon started.

🔥 this fire comes from within the vine
🌿 one of its own branches starts it
👑 many link this to Judah's last king
📖 the royal line helped finish its own ruin

## 👑 No Strong Rod To Be A Sceptre To Rule

A sceptre needs a strong rod, and none was left standing.

This line marks the actual end of Judah's royal line of kings.

The image that opened the vine's story in verse ten is now gone completely.

Where there was once fruit and royalty, nothing usable remained.

👑 no strong rod was left standing
🌿 the royal line had reached its end
🍇 the fruitful picture from verse ten is gone
📖 nothing usable remained of the vine

## 🎵 This Is A Lamentation, And Shall Be For A Lamentation

The chapter ends exactly the way it began, naming itself as a lamentation.

Saying it twice makes clear this is a formal funeral song, not just a sad story.

The lion cubs and the vine were two pictures of the very same loss.

Judah's royal line was being mourned before it had even fully ended.

🎵 the chapter ends as it began
🔁 saying it twice confirms the funeral song
🦁 lions and vine both picture one loss
📖 the royal line is mourned before its end`.trim();

export const EZEKIEL_NINETEEN_PERSONAL_SECTIONS = parseEzekielNineteenRawNotes(EZEKIEL_NINETEEN_RAW_NOTES);
