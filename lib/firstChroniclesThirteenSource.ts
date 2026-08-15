export type FirstChroniclesThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesThirteenRawNotes(rawText: string): FirstChroniclesThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 13:${startVerse}` : `1 Chronicles 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 1 Chronicles 13 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_THIRTEEN_RAW_NOTES = `# FirstChronicles 13:1-4
# 🗣️ David Asks Israel To Act
---
## 🎖️ The Captains Of Thousands And Hundreds

David was not a king who moved alone.

Israel's army was organized into units led by captains over a thousand men and captains over a hundred men.

Before bringing back the ark, David gathers this whole chain of leadership first.

Saul rarely consulted anyone before acting on his own impulse.

David's very first move as a settled king is the opposite.

🎖️ Captains led a thousand or a hundred men
🤝 David gathers leaders before acting
👑 This contrasts sharply with Saul
📖 Consultation marks David's leadership from the start

## 🏘️ In Their Cities And Suburbs

The Levites did not own one connected tribal territory like the other tribes.

They were priests, so they were given forty eight scattered cities instead, spread out across every other tribe's land.

"Suburbs" here means the open pastureland surrounding each of those cities, used for their flocks.

Sending word to them meant reaching priests scattered across the entire country, not one single location.

🏘️ Levites lived in scattered cities, not one territory
🌾 Suburbs means the open pasture around each city
✉️ The message had to travel the whole land
📖 Even the priesthood had to be gathered first

## ❓ If It Seem Good Unto You

David frames this as a request for agreement, not a royal command.

Kings in the ancient world rarely asked permission before a major religious act.

David wants the whole nation behind this decision before he moves the ark.

❓ David asks instead of commands
👑 Most ancient kings simply ordered this
🤝 He wants the nation united first
➡️ Shared decisions carry more weight than orders

## 📦 The Ark Of Our God

The ark of the covenant was a wooden chest covered in gold, holding the stone tablets of the law.

It represented God's own presence living among His people.

It had been missing from Israel's national worship since the days of Eli, decades earlier.

Bringing it back was not just moving furniture.

It meant putting God's presence back at the center of national life.

📦 The ark held the stone tablets
✨ It represented God's presence among Israel
⏳ It had been absent for decades
📖 Its return meant God returning to the center

## 🙈 We Enquired Not At It In The Days Of Saul

The ark was where Israel's priests came to seek God's direction.

Saul's reign largely ignored that practice, leaning instead on his own judgment.

David names this failure plainly as a reason things must change now.

Neglecting the ark was not a small oversight.

It reflected a king who had stopped seeking God at all.

🙈 Saul rarely sought God through the ark
👑 His own judgment replaced real guidance
🔄 David names this as a mistake to correct
📖 Neglecting God's presence was Saul's deeper failure

# FirstChronicles 13:5-8
# 🎶 Bringing Up The Ark
---
## 🗺️ From Shihor Of Egypt Even Unto The Entering Of Hemath

Shihor sat near Egypt's border in the far south.

Hemath, or Hamath, sat far north in Syria.

Naming both edges together was a common way of saying the entire land, from one end to the other.

Every part of Israel had a stake in this moment, not just the region near Jerusalem.

🗺️ Shihor marks the far southern border
🧭 Hemath marks the far northern border
🌍 Together they mean the whole land
➡️ All Israel had a stake in this day

## 📍 Kirjathjearim

Kirjathjearim, also called Baalah, was a town on Judah's border.

The Philistines had returned the ark there in the days of Samuel.

It had rested quietly in that one town for about twenty years since.

For an entire generation, God's presence sat away from the center of worship.

📍 Kirjathjearim also went by the name Baalah
⏳ The ark rested there for decades
🚪 It sat away from public worship
📖 A generation grew up without the ark centered

## 👼 Dwelleth Between The Cherubims

Cherubim were carved angelic figures with outstretched wings, mounted on top of the ark's lid.

Their wings met in the middle, forming what scripture pictures as God's throne on earth.

Calling the ark the place God "dwelleth between the cherubims" makes a claim.

This box was treated as His seat of rule on earth.

👼 Cherubim were carved angelic figures on the lid
👑 Their wings formed a picture of God's throne
🏛️ The ark functioned as God's earthly seat
📖 This explains why the ark demanded such care

## 🏷️ Whose Name Is Called On It

This phrase means the ark carried God's own identity and ownership.

Calling something by a name in scripture often meant claiming it or marking it as belonging to someone.

The ark was not just a container.

It bore God's own reputation with it wherever it went.

🏷️ The phrase means God's ownership was attached
✍️ Naming something marked who it belonged to
📦 The ark carried more than objects inside it
📖 God's own reputation traveled with the ark

## 🐂 They Carried The Ark Of God In A New Cart

God's law required the ark to be carried on poles.

Those poles had to rest on the shoulders of Levites from the family of Kohath, never on a cart.

A new cart sounds like a respectful choice, even a generous one.

It was still the wrong method, borrowed from how the Philistines had once moved the ark.

This mistake sets up everything painful that happens later in the chapter.

🐂 The law required poles on Levite shoulders
🚫 A cart broke that command completely
🏺 This copied the Philistines' method instead
📖 A well meant choice can still be disobedience

## 🏠 Out Of The House Of Abinadab

Abinadab's house in Kirjathjearim had held the ark since it first returned from Philistine territory.

That was about twenty years earlier, back in the days of Samuel.

An entire household had quietly cared for God's presence for a generation.

🏠 Abinadab's house had held the ark for decades
⏳ That care stretched back to Samuel's days
👨‍👩‍👧 One family carried this responsibility for years
➡️ Faithful, quiet service often goes unnoticed

## 🚶 Uzza And Ahio Drave The Cart

Uzza and Ahio were almost certainly Abinadab's own sons.

They were raised in the very house where the ark had rested their whole lives.

"Drave" means they drove or guided the cart pulling the ark.

Familiarity with the ark may explain why they treated this moment more casually than the law allowed.

🚶 Uzza and Ahio were likely Abinadab's sons
🐂 Drave means they drove the cart
🏠 They grew up alongside the ark itself
📖 Familiarity can quietly erode proper reverence

## 🎺 Played Before God With All Their Might

This celebration was loud, physical, and completely sincere.

Singing carried the celebration, backed by harps and psalteries, stringed instruments similar to a small harp.

Timbrels, handheld frame drums, kept the rhythm alongside cymbals and trumpets.

David and all Israel were throwing a full national celebration to welcome God home.

🎺 Singing, harps, and psalteries led the sound
🥁 Timbrels, cymbals, and trumpets kept the rhythm
💃 The whole nation celebrated together
📖 Celebration and reverence can still fail together

# FirstChronicles 13:9-10
# 💀 The Death Of Uzza
---
## 🌾 The Threshingfloor Of Chidon

A threshingfloor was a flat, open space where farmers separated grain from its husks.

It sat out in the open, likely on uneven or rocky ground compared to a smooth road.

That rough surface is almost certainly why the oxen pulling the cart stumbled in the very next line.

🌾 A threshingfloor was an open grain processing space
🪨 Its uneven ground likely caused the stumble
🐂 This detail explains the oxen's misstep
➡️ Small terrain problems triggered a huge moment

## ✋ Uzza Put Forth His Hand To Hold The Ark

Uzza's instinct looks completely understandable on the surface.

The cart lurched, and he reached out to keep the ark from falling.

But the law never permitted anyone to touch the ark directly, not even to protect it.

The ark was supposed to be carried correctly in the first place, which would have made this moment impossible.

✋ Uzza reached out to steady the ark
🚫 The law forbade touching it at all
🐂 The stumble happened only because of the cart
📖 A right method would have prevented this reach

## 🔥 The Anger Of The LORD Was Kindled Against Uzza

This was not punishment for bad intentions.

It was a response to breaking a clear command about how the ark's holiness had to be respected.

God's presence was never meant to be treated casually, even by someone trying to help.

The severity of the moment reveals how seriously God took the instructions He had already given.

🔥 This was not about Uzza's motives
📜 It was about breaking a clear command
✨ God's holiness demanded exact obedience
📖 Good intentions do not replace obedience

## 🕊️ There He Died Before God

Verse eight described David and Israel celebrating "before God" just moments earlier.

Now Uzza dies using that same phrase, in the presence of the very ark he tried to protect.

The contrast is sharp and intentional.

The place of celebration became, in an instant, the place of judgment.

🕊️ The same phrase marks joy and judgment
⚡ Uzza died in the ark's own presence
🔄 Celebration turned to tragedy in a moment
📖 Nearness to God is never casual

# FirstChronicles 13:11-12
# 😨 David's Fear
---
## 😠 David Was Displeased

"Displeased" carries real anger here, not mild disappointment.

David's anger was tangled up with grief and confusion over what had just happened.

He had planned a joyful national celebration, and it ended in a sudden death.

😠 Displeased means genuine anger, not mild upset
😢 Grief and confusion mixed with that anger
🎉 A planned celebration ended in tragedy
➡️ Strong emotion followed a shocking loss

## 🪨 That Place Is Called Perezuzza To This Day

"Perezuzza" means "the breach of Uzza," combining a word for a sudden break with Uzza's own name.

Naming a location after an event was a common way ancient Israel preserved memory before written records were common.

Anyone passing that spot afterward would remember exactly what happened there.

🪨 Perezuzza means the breach of Uzza
📍 Places were named to preserve memory
🗺️ Travelers would recall the event by name alone
📖 The land itself remembered what people might forget

## 😨 David Was Afraid Of God That Day

Just verses earlier David was leading a joyful, confident celebration.

Now that confidence turns into real fear.

This is not casual religious feeling anymore.

David is confronting how seriously God takes His own instructions, and it shakes him.

😨 Confidence gave way to real fear
🎉 This follows directly after the celebration
✨ David now sees God's holiness clearly
📖 True reverence often follows a hard lesson

## ❓ How Shall I Bring The Ark Of God Home To Me

David's plan has completely fallen apart.

He does not yet know the actual answer.

The ark had to be carried by Levites on poles, never on a cart.

That correction only comes later, in chapter fifteen.

For now, David is left with an honest, unresolved question.

❓ David's original plan has collapsed
🤷 He does not yet know the right method
📖 Chapter fifteen later supplies the answer
➡️ Honest uncertainty is better than repeating the mistake

# FirstChronicles 13:13-14
# 🏠 Left With Obededom
---
## 🏙️ To The City Of David

The city of David was Jerusalem's original fortress area, captured earlier in David's reign.

David intended the ark to rest there, at the new political and spiritual center of the kingdom.

That plan is now put on hold after Uzza's death.

🏙️ The city of David was Jerusalem's fortress
👑 Meant to be the ark's new home
⏸️ That plan is delayed after the tragedy
➡️ Fear reshaped the original destination

## 🏡 Obededom The Gittite

"Gittite" most likely points to Gathrimmon, a town assigned to Levite families from Kohath.

That reading fits far better than the Philistine city of Gath.

Later chapters describe Obededom serving among the Levites as a gatekeeper and musician.

David chooses a household already prepared to handle something this holy.

🏡 Gittite likely names a Levite town
🎶 Obededom later serves as a gatekeeper
🙏 His household was suited to host the ark
📖 The right household mattered like the method

## 📆 Remained With The Family Of Obededom In His House Three Months

Three months is a short window in the story, but it changes everything for one household.

David needed time to process what happened and prepare a correct plan for moving the ark again.

That preparation becomes the subject of chapter fifteen.

📆 Three months passed before the next attempt
🧠 David needed time to prepare properly
📖 Chapter fifteen picks up the correction
➡️ A pause is not giving up

## ✨ The LORD Blessed The House Of Obededom

The very same ark that brought sudden death to Uzza brought real blessing to Obededom's entire household.

The danger was never in the object itself.

It was in how people approached it.

Handled according to God's instructions, the ark's presence became a source of blessing instead of judgment.

✨ The same ark brought death and blessing
📦 The danger was never in the object
🙏 It was always about how it was approached
📖 Obedience turns God's presence into a blessing
`.trim();

export const FIRST_CHRONICLES_THIRTEEN_PERSONAL_SECTIONS = parseFirstChroniclesThirteenRawNotes(FIRST_CHRONICLES_THIRTEEN_RAW_NOTES);
