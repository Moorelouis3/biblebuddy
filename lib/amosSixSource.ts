export type AmosSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseAmosSixRawNotes(rawText: string): AmosSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: AmosSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Amos\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Amos 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Amos\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Amos\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Amos 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Amos 6:${startVerse}` : `Amos 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Amos 6 sections, received " + sections.length);
  }

  return sections;
}

const AMOS_SIX_RAW_NOTES = `# Amos 6:1-3
# 😴 Woe To Those At Ease
---
## 😴 Woe To Them That Are At Ease In Zion

Woe is a funeral cry, not a simple warning.

Amos opens this chapter the same way he closed the last one.

At ease means feeling safe with nothing left to fear.

Zion was Jerusalem, the capital of the southern kingdom of Judah.

Amos widens this warning beyond the north and into the south too.

Comfort itself has become the danger he names.

😴 Woe is a funeral cry, not a warning
🏙️ Zion names Jerusalem in the south
🛋️ At ease means feeling falsely safe
📖 Comfort itself becomes the danger

## ⛰️ Trust In The Mountain Of Samaria

This does not mean Samaria's hill offered real military safety.

Samaria sat on a high, well defended hill.

It was the capital of the northern kingdom of Israel.

Trusting the mountain meant trusting walls and height instead of God.

A high wall can still fall if God decides to hand it over.

⛰️ Samaria's hill was the northern capital
🛡️ Height felt like real protection
❌ That protection left God out
📖 Walls fall when God allows it

## 👑 Named Chief Of The Nations

This phrase is not God praising Israel's greatness.

It states how Israel's own leaders already saw themselves.

They believed their kingdom outranked every nation around them.

Amos repeats their own claim only to test it.

The next two verses ask them to prove it is true.

👑 Chief of the nations was self praise
🗣️ Leaders believed this about themselves
🎯 Amos repeats it to test it
📖 Pride is about to be tested

## 🗺️ Pass Ye Unto Calneh, And See

Amos sends Israel's leaders on an imaginary tour.

Calneh was a city in northern Mesopotamia.

It had already been conquered by Assyria.

Each stop on this tour is a city that once felt secure.

Samaria is about to join that same list.

🗺️ Calneh was a real conquered city
💥 It once felt just as secure
🧭 Amos sends them on a tour
📖 Samaria is about to join that list

## 🏛️ Go Ye To Hamath The Great

Hamath was a major city on the Orontes River.

It sat in what is modern day Syria.

It had once been a powerful, independent kingdom.

By Amos' time, it too had already fallen under foreign control.

Its size and history had not been enough to save it.

🏛️ Hamath was a major Syrian city
👑 It was once a powerful kingdom
💥 It had already fallen too
📖 Size did not save it either

## 🏙️ Then Go Down To Gath Of The Philistines

Gath was one of the five major Philistine cities.

It had a long history of conflict with Israel.

Goliath himself was said to come from Gath.

By this time, Gath too had already been crushed.

Even a city with that much history offered no lasting safety.

🏙️ Gath was a major Philistine city
⚔️ Goliath himself came from Gath
💥 It too had already been crushed
📖 History offered no lasting safety

## ⚖️ Be They Better Than These Kingdoms?

This question expects one answer, no.

Calneh, Hamath, and Gath were not weaker or smaller than Samaria.

If strength did not save those cities, it will not save this one.

Amos lets the comparison make his point instead of stating it outright.

⚖️ The expected answer here is no
💪 Those cities were not weaker
🔁 The same outcome awaits Samaria
📖 The comparison makes the point

## ⏳ Put Far Away The Evil Day

Putting far away the evil day means refusing to believe judgment is close.

Israel's leaders treated disaster as a problem for some distant future.

Amos has already named that future as very near.

Denial does not change how soon it is actually coming.

⏳ They pushed judgment into the future
🙈 They treated it as far away
⚠️ Amos says it was already near
📖 Denial does not delay the truth

## 🔥 Cause The Seat Of Violence To Come Near

Seat of violence pictures injustice sitting in a place of real power.

While leaders denied the coming judgment, their own violence kept spreading.

They pushed one danger away while pulling another one closer.

Denial and wrongdoing were growing side by side in the same nation.

🔥 Seat of violence means injustice in power
📈 Violence kept spreading through the nation
🙅 They denied one danger and caused another
📖 Denial and sin grew together

# Amos 6:4-7
# 🛋️ Beds Of Ivory And Banquets Removed
---
## 🛋️ That Lie Upon Beds Of Ivory

Beds of ivory means furniture decorated with carved ivory inlay.

This was a luxury only the wealthy could afford.

Archaeologists have actually found ivory carved furniture in the ruins of Samaria.

Stretching out on couches pictures long, relaxed banquets.

This verse is not condemning rest itself.

It is condemning comfort that ignored everyone suffering outside the room.

🛋️ Ivory beds meant rare, costly luxury
🏺 Archaeologists found ivory pieces in Samaria
🍽️ Couches pictured long, relaxed banquets
📖 The sin was comfort that ignored others

## 🐑 Eat The Lambs Out Of The Flock

Lambs out of the flock were young, tender, and costly to raise.

Calves out of the stall were fattened and kept for special meals.

Most ordinary families ate meat only on rare occasions.

These leaders ate this way as a regular habit.

That everyday luxury came directly from wealth built on the poor.

🐑 Lambs and calves were premium meat
🍖 Most families ate meat rarely
🔁 These leaders ate this way daily
📖 Luxury was funded by the poor's loss

## 🎶 Invent To Themselves Instruments Of Musick, Like David

This is not a compliment comparing these leaders to King David.

David wrote music to praise the LORD with real devotion.

These leaders invented new instruments only to entertain themselves at banquets.

Copying David's skill without copying his heart turns worship into noise.

🎶 David's music praised God with devotion
🥂 These leaders used music to entertain
🎻 New instruments served pleasure, not worship
📖 Skill without devotion becomes noise

## 🍷 Drink Wine In Bowls

Drinking wine in bowls, rather than ordinary cups, meant drinking in excess.

A bowl held far more than a single cup was ever meant to.

This detail pictures careless, heavy drinking, not a polite toast.

Comfort like this filled their days without a second thought.

🍷 Bowls instead of cups meant excess
🥣 A bowl held far more than a cup
🍻 This pictures careless, heavy drinking
📖 Excess, not celebration, is the point

## 💰 Anoint Themselves With The Chief Ointments

Chief ointments were the most expensive perfumed oils available at the time.

Anointing was normally saved for special occasions, like a coronation.

Here it had become just another everyday indulgence.

Even the most sacred gestures lost their meaning through overuse.

💰 Chief ointments were the costliest oils
👑 Anointing was once reserved for honor
🔁 Here it became everyday indulgence
📖 Overuse drained a sacred gesture of meaning

## 💔 Not Grieved For The Affliction Of Joseph

Joseph here again stands for the whole northern kingdom of Israel.

Affliction refers to real suffering already spreading through the poor.

These leaders feasted in banquet halls built on top of that suffering.

Not grieved means they felt nothing at all for people right under them.

💔 Joseph again names the northern kingdom
😢 Affliction names real, spreading suffering
🍽️ Leaders feasted above that suffering
📖 They felt nothing for it at all

## ⛓️ Therefore Now Shall They Go Captive With The First

Therefore ties this sentence directly to the luxury just described.

These were the same leaders who lived with the most comfort in the nation.

Going captive with the first means they are judged before anyone else.

Privilege did not protect them, it marked them for judgment first.

⛓️ Therefore connects judgment to luxury
👑 These leaders had the most comfort
🥇 They go captive before anyone else
📖 Privilege marked them for judgment first

## 🍽️ The Banquet Of Them That Stretched Themselves Shall Be Removed

Stretched themselves recalls the same picture of relaxed luxury from verse four.

Removed means this entire way of life simply ends.

The couches, the music, and the wine all disappear together.

Nothing about this comfortable life was permanent after all.

🍽️ Stretched themselves recalls verse four's luxury
🚫 Removed means this whole life ends
🎻 Couches, music, and wine vanish together
📖 Comfort here was never permanent

# Amos 6:8-11
# ⚔️ The Lord Hath Sworn Judgment
---
## ⚔️ The Lord God Hath Sworn By Himself

Swearing by himself means God had no higher authority to swear by.

A normal oath calls on something greater than the person making it.

Nothing exists greater than God.

So he swears by his own name instead.

This makes the coming judgment certain, not just likely.

⚔️ Swearing by himself means no higher authority
🤝 A normal oath calls on something greater
👑 Nothing is greater than God himself
📖 This judgment is certain, not likely

## 💔 I Abhor The Excellency Of Jacob

Abhor is a stronger word than simple dislike, closer to disgust.

Excellency of Jacob refers to Israel's pride in its own wealth and status.

Palaces here stand for the same luxury already described earlier in this chapter.

God rejects both the pride and the comfort it built.

💔 Abhor means disgust, not mere dislike
👑 Excellency of Jacob means national pride
🏛️ Palaces picture the luxury from before
📖 God rejects both pride and comfort

## 💀 If There Remain Ten Men In One House

Ten men in one house pictures an entire extended family living together.

This is not describing a battlefield death toll.

It pictures death reaching into ordinary homes during peacetime.

No family, however large, is pictured as safe here.

💀 Ten men pictures a whole family
🏠 This death reaches ordinary homes
⚔️ It is not a battlefield picture
📖 No family size is safe here

## 🤐 Hold Thy Tongue, For We May Not Make Mention Of The Name Of The Lord

This is not calm, respectful silence before God.

The scene pictures survivors searching a house full of the dead.

Someone warns the others not to even say the LORD's name aloud.

Fear this deep treats God's own name as too dangerous to speak.

🤐 This silence is not calm reverence
💀 The scene is a house full of dead
😨 Fear keeps them from naming God
📖 Terror made his name feel dangerous

## 🏚️ He Will Smite The Great House With Breaches, And The Little House With Clefts

Breaches and clefts both describe walls being broken apart and split open.

Great house likely means the wealthy, powerful households in Samaria.

Little house likely means ordinary homes with far less to their name.

Judgment reaches every size of house, not only the richest ones.

🏚️ Breaches and clefts mean broken walls
🏛️ Great house names the wealthy households
🏠 Little house names ordinary homes
📖 Judgment reaches every size of house

# Amos 6:12-13
# 🪨 Judgment Turned To Gall
---
## 🪨 Shall Horses Run Upon The Rock?

Both questions in this verse expect the same answer, no.

Horses cannot run safely on bare rock.

Oxen cannot plow bare rock either.

Amos uses two impossible pictures from everyday farm life.

Israel had made something just as impossible seem normal.

🪨 Both questions expect the answer no
🐴 Horses cannot safely run on rock
🐂 Oxen cannot plow bare rock either
📖 Israel normalized the truly impossible

## 🌿 Ye Have Turned Judgment Into Gall

Gall and hemlock were both known for a bitter, even poisonous taste.

Judgment was meant to taste like protection and fairness.

Instead Israel's courts had turned it bitter and harmful.

Righteousness was supposed to bear good fruit, not poison.

🌿 Gall and hemlock both tasted bitter
⚖️ Judgment should taste like fairness
☠️ Courts turned it bitter and harmful
📖 Righteousness was never meant to poison

## 🎈 Ye Which Rejoice In A Thing Of Nought

A thing of nought means something empty, with no real substance behind it.

This likely points back to Israel's recent, short lived military victories.

Those victories felt like real strength at the time.

Amos says the celebration was built on nothing lasting.

🎈 A thing of nought means empty substance
⚔️ This likely points to recent victories
🏆 Those wins felt like real strength
📖 The celebration had no lasting ground

## 💪 Have We Not Taken To Us Horns By Our Own Strength?

Horns in scripture often picture strength.

Think of an animal lowering its horns before a fight.

This question is Israel boasting about its own military power.

Our own strength leaves God completely out of the sentence.

Amos lets their own words expose the pride underneath them.

💪 Horns picture strength, an animal's weapon
🗣️ This question is Israel boasting aloud
🙅 Their own strength left God out
📖 Their words exposed their own pride

# Amos 6:14
# 🗡️ A Nation Raised Up Against You
---
## 🗡️ I Will Raise Up Against You A Nation

Amos does not name this nation directly here.

Later history shows this was Assyria, the empire that conquered Israel.

Raise up means God himself sets this invading nation in motion.

The very enemy Israel feared would become God's own instrument.

🗡️ The unnamed nation was later Assyria
🧭 God himself sets this nation in motion
⚠️ Israel's feared enemy becomes God's tool
📖 Judgment arrives through real history

## 🗺️ From The Entering In Of Hemath Unto The River Of The Wilderness

These two landmarks mark the full northern and southern borders of Israel's kingdom.

The entering in of Hemath lay far to the north.

The river of the wilderness lay far to the south.

This same border is named in 2 Kings describing Israel's greatest extent.

The nation that once stretched this wide would be afflicted across all of it.

🗺️ These landmarks mark Israel's full borders
🧭 Hemath lay to the north
🏜️ The river of the wilderness lay south
📖 Judgment covers the whole kingdom

## 👑 Saith The Lord The God Of Hosts

God of hosts is a title for the commander over heaven's armies.

Amos closes this chapter with the same title that closed chapters four and five.

Three chapters in a row end on the same unmatched authority.

The reader is meant to feel that repetition, not skip past it.

👑 God of hosts means commander of armies
🔁 This title also closed chapters four and five
🔂 Three straight chapters end this way
📖 The repetition is meant to be felt
`.trim();

export const AMOS_SIX_PERSONAL_SECTIONS = parseAmosSixRawNotes(AMOS_SIX_RAW_NOTES);
