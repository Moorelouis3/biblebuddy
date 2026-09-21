export type SongOfSolomonFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSongOfSolomonFourRawNotes(rawText: string): SongOfSolomonFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SongOfSolomonFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SongOfSolomon\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Song of Solomon 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SongOfSolomon\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+SongOfSolomon\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Song of Solomon 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Song of Solomon 4:${startVerse}` : `Song of Solomon 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Song of Solomon 4 sections, received " + sections.length);
  }

  return sections;
}

const SONG_OF_SOLOMON_FOUR_RAW_NOTES = `# SongOfSolomon 4:1-3
# 🐐 Praise Begins At Her Face
---
## 🕊️ Thou Hast Doves' Eyes Within Thy Locks

Doves' eyes does not mean her eyes literally look like a bird's eyes.

Ancient love poetry used doves to picture eyes that are gentle, clear, and full of devotion.

This exact praise already appeared once before, in chapter one.

Repeating it here shows this poem returns to its favorite images again and again.

🕊️ Doves picture gentle, devoted eyes
👁️ Not a literal comparison to a bird
🔁 This praise already appeared in chapter 1
📖 The poem returns to favorite images

## 🐐 Thy Hair Is As A Flock Of Goats

This comparison sounds strange to modern ears.

The picture is not about texture, but about movement.

Mount Gilead's hillsides were covered with dark goats moving together down the slope.

Her dark hair, flowing and moving as she turned her head, created the same picture.

🐐 Goats pictured movement, not texture
⛰️ Mount Gilead's hillsides were covered in goats
🌊 Her hair moved the same flowing way
📖 The comparison praises motion, not looks alone

## ✂️ Thy Teeth Are Like A Flock Of Sheep That Are Even Shorn

Shorn means the sheep have just had their wool cut off.

Freshly shorn sheep look clean, pale, and perfectly matched together.

Every one bear twins pictures each tooth paired evenly with another.

None is barren means not a single tooth is missing from the set.

✂️ Shorn means freshly sheared
🐑 Shorn sheep look clean and matched
🦷 Every tooth is paired like twins
📖 Not a single tooth is missing

## 🧵 Thy Lips Are Like A Thread Of Scarlet, And Thy Speech Is Comely

Thread of scarlet describes a thin, richly dyed strand of red.

Scarlet dye was expensive and reserved for something valued.

Comely means pleasant and fitting, not merely acceptable.

Her words are being praised here, not only the shape of her lips.

🧵 Thread of scarlet means a thin red strand
💰 Scarlet dye was costly and valued
🗣️ Comely means pleasant and fitting
📖 Her words are praised, not just her lips

## 🍎 Thy Temples Are Like A Piece Of A Pomegranate Within Thy Locks

Temples names the sides of the forehead near the hairline.

A cut pomegranate reveals bright red seeds packed tightly inside.

Her temples showing that same rosy color peeking through her hair.

The image praises her healthy, blushing color, not a shape.

🍎 Temples means the forehead near the hairline
🌰 A cut pomegranate shows bright red seeds
😊 Her skin shows that same rosy color
📖 The image praises her healthy color

# SongOfSolomon 4:4-5
# 🗼 Strength And Grace
---
## 🗼 Thy Neck Is Like The Tower Of David Builded For An Armoury

An armoury is a building built to store weapons.

The tower of David was a tall, fortified structure in Jerusalem.

Comparing her neck to it pictures strength, height, and dignity.

A long, straight, adorned neck was considered a mark of great beauty.

🏰 Armoury means a weapon storehouse
🗼 The tower of David stood tall in Jerusalem
💪 The image pictures strength and dignity
📖 A tall, adorned neck marked beauty

## 🛡️ Whereon There Hang A Thousand Bucklers, All Shields Of Mighty Men

A buckler is a small, round shield carried by a soldier.

Ancient towers sometimes displayed captured shields hung along their walls.

The picture likely describes layers of jewelry hanging around her neck.

Just as shields marked a tower's strength, her jewelry marks her adornment.

🛡️ A buckler is a small round shield
🏰 Towers displayed shields along their walls
💍 The image likely pictures layered jewelry
📖 Her adornment is compared to a tower's strength

## 🦌 Thy Two Breasts Are Like Two Young Roes That Are Twins, Which Feed Among The Lilies

Roes names young gazelles or deer, known for being graceful and gentle.

Twins pictures two that match each other perfectly.

Feeding among lilies places them in a soft, fragrant setting.

The whole picture praises gentleness and grace, not only shape.

🦌 Roes means young, graceful deer
👯 Twins pictures a matching pair
🌸 Lilies picture a soft, fragrant setting
📖 The image praises gentleness and grace

# SongOfSolomon 4:6-7
# ⛰️ Until The Day Break
---
## 🌿 I Will Get Me To The Mountain Of Myrrh, And To The Hill Of Frankincense

This same line already appeared earlier, in chapter two, with slightly different wording.

Myrrh and frankincense were costly spices burned for their rich scent.

Many scholars believe the mountain pictures the woman herself.

Repeating this line marks another return to one of the poem's central images.

🔁 This line echoes chapter 2 closely
🌿 Myrrh and frankincense were costly spices
👤 The mountain likely pictures the woman herself
📖 The poem returns to a central image

## 💯 Thou Art All Fair, My Love, There Is No Spot In Thee

This line closes the long list of praise that began in verse one.

All fair means completely and entirely beautiful, not partly.

No spot means without blemish or flaw.

The description ends in total praise before the poem moves toward an invitation.

🏁 This line closes the list of praise
💯 All fair means completely beautiful
✨ No spot means without blemish
📖 Total praise leads into an invitation

# SongOfSolomon 4:8
# 🏔️ Come Away From Danger
---
## 💍 Come With Me From Lebanon, My Spouse, With Me From Lebanon

Spouse is the first time this word appears in the whole book.

It marks a shift toward language of marriage and full commitment.

Lebanon here names the mountain range to the north, not a specific city.

Repeating with me from Lebanon underlines how strongly he wants her to come.

💍 Spouse appears here for the first time
📜 The word marks language of marriage
🏔️ Lebanon names the northern mountain range
📖 Repetition underlines his strong invitation

## 👀 Look From The Top Of Amana, From The Top Of Shenir And Hermon

Amana, Shenir, and Hermon name specific peaks in the same mountain range.

Hermon was the tallest peak in that whole region, often snow capped.

Naming three separate peaks pictures her surveying the whole horizon.

The height also frames how far away she currently is from him.

⛰️ Amana, Shenir, and Hermon are named peaks
❄️ Hermon was the tallest, often snow capped
👀 Naming three peaks pictures a wide view
📖 The height frames the distance between them

## 🦁 From The Lions' Dens, From The Mountains Of The Leopards

Lions and leopards were real, dangerous animals living in that region.

The mountains named here were remote, wild, and genuinely unsafe.

He is not describing her present home, but calling her away from danger.

The invitation pictures leaving isolation for life together.

🦁 Lions and leopards were real dangers
⛰️ These mountains were wild and remote
🚪 He calls her away from danger
📖 The invitation pictures leaving isolation

# SongOfSolomon 4:9-11
# 💓 Ravished By Her Love
---
## 💘 Thou Hast Ravished My Heart, My Sister, My Spouse

Ravished in this older English means captured or overwhelmed, not harmed.

Calling her sister does not mean she was literally his sibling.

Near Eastern love poetry used sister as a term of deep closeness.

Both titles together stack affection, closeness, and full commitment.

💘 Ravished means captured or overwhelmed
👭 Sister here is not a literal sibling
🤝 It was a term for deep closeness
📖 Both titles stack layers of affection

## 🍷 How Much Better Is Thy Love Than Wine

This exact comparison already appeared once before, spoken by her about him.

Wine was one of the most valued pleasures in that culture.

Saying love is better than wine ranks it above a prized comfort.

The poem now has both voices praising love the very same way.

🔁 The same comparison appeared earlier
🍷 Wine was a highly valued pleasure
👑 Love outranks even a prized comfort
📖 Both voices now praise love the same way

## 🍯 Thy Lips, O My Spouse, Drop As The Honeycomb

Drop as the honeycomb pictures words as sweet as fresh honey.

Honey and milk under thy tongue describes the same sweetness a second way.

Milk and honey were also the exact words used for the promised land.

Her words are praised as rich and abundant, not just pleasant.

🍯 Honeycomb pictures speech as sweet
🥛 Honey and milk repeat the same idea
🗺️ The same words describe the promised land
📖 Her words are praised as rich and abundant

# SongOfSolomon 4:12-15
# 🌷 A Garden Enclosed
---
## 🧱 A Garden Inclosed Is My Sister, My Spouse

Inclosed means walled in or fenced off from outside access.

Gardens in that culture were often surrounded by a wall for protection.

Calling her an inclosed garden pictures something valuable and kept private.

The image praises her purity as something guarded, not something missing.

🧱 Inclosed means walled in
🌳 Gardens were fenced for protection
💎 The image pictures something valuable
📖 Her purity is guarded, not missing

## 💧 A Spring Shut Up, A Fountain Sealed

A spring shut up names a water source that has been closed off.

A fountain sealed pictures the same water source marked and protected.

Hebrew poetry often restates one idea twice using different pictures.

Both images repeat the same point already made by the enclosed garden.

💧 A spring shut up means closed off
🔒 A sealed fountain repeats the same idea
📚 Hebrew poetry often restates one point
📖 Both images repeat the enclosed garden

## 🌳 Thy Plants Are An Orchard Of Pomegranates, With Pleasant Fruits

Orchard here means a whole enclosed grove of fruit trees, not one tree.

Pomegranates were a prized fruit across the ancient Near East.

Pleasant fruits widens the picture beyond just pomegranates alone.

The garden from verse twelve is now shown bursting with abundance.

🌳 Orchard means a whole grove of trees
🍎 Pomegranates were a prized fruit
🍇 Pleasant fruits widens the picture
📖 The garden is shown bursting with abundance

## 🌿 Spikenard And Saffron, Calamus And Cinnamon, With All Trees Of Frankincense, Myrrh And Aloes, With All The Chief Spices

This verse names eight different spices in a single breath.

Spikenard, saffron, calamus, and cinnamon were all imported from distant lands.

Frankincense, myrrh, and aloes traveled the same costly trade routes.

Naming this many at once pictures value beyond anything one spice alone could show.

🌿 Eight different spices are named here
🐫 Most were imported from distant lands
💰 Each one traveled costly trade routes
📖 Together they picture extravagant value

## 💧 A Fountain Of Gardens, A Well Of Living Waters, And Streams From Lebanon

Living waters means flowing, fresh water, not water sitting still.

Stagnant water was linked with sickness in the ancient world.

Streams from Lebanon points to clean water flowing down from its mountains.

The garden imagery now peaks with a picture of pure, flowing abundance.

💧 Living waters means flowing, fresh water
🚫 Stagnant water was linked with sickness
🏔️ Streams from Lebanon pictures pure mountain water
📖 The garden peaks in pure abundance

# SongOfSolomon 4:16
# 🌬️ The Garden Answers
---
## 🌬️ Awake, O North Wind, And Come, Thou South

The voice speaking shifts here, and many scholars read this as her words.

North and south name two completely opposite winds.

Calling both at once means she wants every wind to blow at the same time.

She now actively invites what he only described as far away.

🗣️ The speaker shifts, likely to her
🧭 North and south are opposite winds
🌬️ Calling both means every wind at once
📖 She now invites what he described

## 🌷 Let My Beloved Come Into His Garden, And Eat His Pleasant Fruits

The garden was called hers throughout this whole chapter, until now.

Calling it his garden here is a clear change in language.

She is answering the invitation he gave back in verse eight.

The chapter ends with her fully inviting what he had longed for.

🌷 The garden was hers throughout the chapter
🔄 Calling it his marks a clear change
✅ She answers his invitation from verse 8
📖 The chapter ends in full invitation
`.trim();

export const SONG_OF_SOLOMON_FOUR_PERSONAL_SECTIONS = parseSongOfSolomonFourRawNotes(SONG_OF_SOLOMON_FOUR_RAW_NOTES);
