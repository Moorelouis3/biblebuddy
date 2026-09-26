export type JeremiahTwentyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahTwentyOneRawNotes(rawText: string): JeremiahTwentyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahTwentyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+21:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 21 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+21:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+21:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 21 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 21,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 21:${startVerse}` : `Jeremiah 21:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Jeremiah 21 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_TWENTY_ONE_RAW_NOTES = `# Jeremiah 21:1-3
# 📜 Zedekiah Seeks A Word From The LORD
---
## 👑 King Zedekiah Sent Unto Him

Zedekiah was the last king of Judah before Jerusalem fell.

Babylon placed him on the throne after exiling the previous king, Jehoiachin.

He ruled only because Babylon allowed it, not through his own strength.

By this chapter, Babylon's army is already surrounding his city.

A king who owes his throne to Babylon is now begging God to save him from Babylon.

👑 Zedekiah was Judah's last king

⛓️ Babylon placed him on the throne

🏙️ Babylon's army now surrounds his city

📖 His throne depended on the enemy he fears

## 👤 Pashur The Son Of Melchiah

This Pashur is not the same man who put Jeremiah in the stocks.

That earlier Pashur was the son of Immer, from chapter twenty.

This Pashur is the son of Melchiah, a different person entirely.

Two different men named Pashur both show up in Jeremiah's story.

The name was common among priestly families in Jerusalem.

👤 This Pashur is not chapter twenty's Pashur

🔁 That earlier Pashur was Immer's son

👥 Two different men share one name

📖 The name was common among priests

## ⛪ Zephaniah The Son Of Maaseiah The Priest

This Zephaniah is not the prophet who wrote the Book of Zephaniah.

He was a priest serving in the temple during Zedekiah's reign.

Zedekiah sends him along with Pashur as a two man delegation.

Sending two officials instead of one showed how urgent the request was.

⛪ This Zephaniah served as a temple priest

📚 He is not the prophet Zephaniah

🤝 Two officials carried the king's request

📖 Two messengers showed how urgent this was

## 🙏 Enquire, I Pray Thee, Of The LORD For Us

To enquire of the LORD meant asking a prophet to seek God's answer.

Kings often sent messengers to a prophet during war or crisis.

The prophet was expected to hear directly from God and report back.

Zedekiah is not confessing sin here, only hoping for a rescue.

He wants a word from God without changing anything about his own choices.

🙏 Enquire means asking God for an answer

👑 Kings sought prophets during a crisis

📢 The prophet reported God's actual reply

📖 Zedekiah wanted rescue without repentance

## 👑 Nebuchadrezzar King Of Babylon Maketh War Against Us

Nebuchadrezzar is simply another spelling of Nebuchadnezzar, the same king.

Jeremiah's book uses both spellings for the same Babylonian ruler.

By this point Babylon's army has surrounded Jerusalem for the final time.

This is the siege that will end with the city's destruction.

👑 Nebuchadrezzar and Nebuchadnezzar are the same king

🏙️ Babylon's army already surrounds Jerusalem

⚔️ This siege ends in the city's fall

📖 Judah's final crisis has now arrived

## 🛡️ According To All His Wondrous Works

Zedekiah is hoping God repeats a famous rescue from the past.

Years earlier, an Assyrian army surrounded Jerusalem the same way.

God sent an angel that destroyed the Assyrian camp overnight.

That miracle happened during the reign of King Hezekiah.

Zedekiah wants that exact rescue to happen again for him.

He is asking for a repeat, not offering any real change of heart.

🙏 Zedekiah hopes for a past miracle

🛡️ Hezekiah once saw Assyria destroyed overnight

🔁 He wants that same rescue repeated

📖 He seeks a miracle, not repentance

## 🚶 That He May Go Up From Us

To go up from us means to retreat and leave the land.

The Bible often describes travel toward the hill country as going up.

Zedekiah simply wants the siege lifted and the enemy gone.

He is not asking for victory, only for the danger to end.

🚶 Go up from us means retreat

⛰️ Hill country travel was called going up

🙏 Zedekiah just wants the siege lifted

📖 He wants danger to end, not victory

# Jeremiah 21:4-7
# ⚔️ I Myself Will Fight Against You
---
## 🗡️ I Will Turn Back The Weapons Of War

This does not mean God will help Judah defeat Babylon's weapons.

The weapons in Judah's own hands are the ones being turned back.

God will make Judah's defense fail and work against the defenders instead.

The very swords meant to protect the city will not save it.

🗡️ Judah's own weapons will fail

🛡️ Their defense will not protect them

⚡ God works against His own people here

📖 Protection turns useless in God's hands

## 🏴 The Chaldeans, Which Besiege You Without The Walls

Chaldeans is another name for the Babylonians, the same enemy army.

To besiege means to surround a city and cut off its supplies.

Without the walls simply means the army was camped outside Jerusalem.

Starving a city out was a common and effective ancient war tactic.

🏴 Chaldeans means the Babylonians

🚫 Besiege means surrounding to cut off supplies

🧱 The army camped just outside the walls

📖 Starvation was a common war tactic

## 🏙️ I Will Assemble Them Into The Midst Of This City

The enemy currently surrounds Jerusalem from the outside.

God says He will bring them into the very center of the city.

What stayed outside the walls will soon stand inside them.

The siege will not just threaten the city.

It will completely overtake it.

🏙️ The enemy moves from outside to inside

🚧 The walls will no longer hold them

⚔️ The siege becomes a full takeover

📖 Nothing can stop this advance now

## ✋ With An Outstretched Hand And With A Strong Arm

This exact phrase usually describes God rescuing Israel out of Egypt.

An outstretched hand and a strong arm normally mean deliverance, not destruction.

Here the same powerful hand works against Judah instead of for it.

The very strength that once saved them will now bring them down.

✋ This phrase usually means deliverance

🇪🇬 It once described the exodus from Egypt

🔄 Here that same power turns against Judah

📖 God's strength now works against them

## 😡 Even In Anger, And In Fury, And In Great Wrath

Anger, fury, and wrath are three separate words for the same intense emotion.

Piling up three words like this shows how total this judgment is.

This is not a passing moment of frustration from God.

The repetition itself is meant to be felt, not just read.

😡 Three words all mean intense anger

📚 Piling up words shows total judgment

⏳ This is not a passing frustration

📖 The repetition itself is meant to be felt

## 🦠 They Shall Die Of A Great Pestilence

Pestilence means widespread disease, the kind that spreads fast in a crowded siege.

Both man and beast means even farm animals will not be spared.

Sieges often killed more people through hunger and disease than through battle.

This threat targets the whole city, not just soldiers on the wall.

🦠 Pestilence means widespread disease

🐐 Even farm animals were not spared

⚔️ Sieges often killed through disease, not battle

📖 The whole city faces this danger

## 🚫 He Shall Not Spare Them, Neither Have Pity, Nor Have Mercy

Three phrases in a row, all saying the same hard thing.

No mercy here breaks the pattern readers expect from God's covenant love.

This is judgment for persistent, unrepented sin, not a change in God's character.

The warning is severe because the sin it answers has gone on for so long.

🚫 Three phrases repeat one harsh point

💔 This breaks the usual promise of mercy

⚖️ Judgment answers sin that went on too long

📖 Severity matches how long the sin continued

## 👑 I Will Deliver Zedekiah King Of Judah, And His Servants

This is a direct, personal prophecy naming Zedekiah by name.

God is not judging the city in only general terms anymore.

The king, his servants, and the people all end up in Babylon's hand.

History records that this happened exactly as Jeremiah said.

Jerusalem fell to Babylon a short time later.

👑 Zedekiah is named directly here

🎯 Judgment is now personal, not just general

⛓️ King, servants, and people all fall together

📖 This prophecy came true exactly as spoken

# Jeremiah 21:8-10
# 🚪 The Way Of Life And The Way Of Death
---
## 📜 I Set Before You The Way Of Life, And The Way Of Death

Moses once set the same two choices before Israel in Deuteronomy.

Normally the way of life meant obeying God and the way of death meant sin.

Here the terms flip because of the specific crisis of the siege.

Staying in the city out of loyalty will now lead to death.

Leaving the city, which looks like surrender, will now lead to life.

📜 This echoes Moses in Deuteronomy

🔁 The usual meaning is flipped here

🏙️ Staying loyal in the city now means death

📖 Surrender becomes the surprising path to life

## 🏙️ He That Abideth In This City Shall Die

Abideth is an old word that simply means to stay or remain.

Anyone who stays inside Jerusalem faces the sword, famine, and disease of the siege.

Loyalty to the city no longer offers any real safety.

🏙️ Abideth means to stay or remain

⚔️ Staying means facing sword, famine, and disease

🚫 Loyalty offers no safety here

📖 The city itself is no longer safe

## 🏳️ He That Goeth Out, And Falleth To The Chaldeans

Falleth to means surrendering or defecting to the enemy camp.

This would have felt like treason to anyone loyal to the king.

Yet Jeremiah says defecting is exactly what will save a person's life.

The prophet's advice puts him at odds with the city's official leadership.

🏳️ Falleth to means surrendering to the enemy

⚔️ Surrender would have looked like treason

🙏 Jeremiah says surrender saves lives here

📖 This advice put him against the king

## 🎯 His Life Shall Be Unto Him For A Prey

This phrase does not mean the person becomes prey to be hunted.

It means the person escapes with their life as if it were a prize.

Everything else may be lost, but survival itself counts as a win.

Jeremiah uses this same unusual phrase again later in the book.

🎯 For a prey means life as a prize

🏃 Survival itself counts as a win

💔 Everything but life may still be lost

📖 Jeremiah repeats this same phrase later

## 😐 I Have Set My Face Against This City For Evil

To set one's face against something means fixed, deliberate resolve.

This is not a passing threat or an emotional overreaction.

God states plainly that His purpose here is for evil, not for good.

The next words in the verse remove any doubt about what that means.

😐 Set my face means fixed, firm resolve

🎯 This is deliberate, not emotional

⚖️ God states His purpose is for evil

📖 No doubt is left about the outcome

## 🔥 He Shall Burn It With Fire

This is a direct prophecy that Jerusalem will be destroyed by fire.

The temple, the palace, and the city walls all fall under this threat.

Second Kings records that Babylon's army did exactly this.

Jeremiah names this ending years before it happens.

🔥 A direct prophecy of the city burning

🏛️ Temple, palace, and walls are all included

📚 Second Kings records this actually happening

📖 Jeremiah named the ending years in advance

# Jeremiah 21:11-12
# 👑 Execute Judgment In The Morning
---
## 📜 Touching The House Of The King Of Judah

Touching here is an old word meaning concerning or regarding.

The house of the king means the royal family and its officials.

This message shifts from the city as a whole to its rulers specifically.

Leaders get their own direct word, separate from the general population.

📜 Touching means concerning or regarding

👑 House of the king means the royal court

🔀 The message now targets leaders specifically

📖 Leaders receive their own direct warning

## 👑 O House Of David

House of David means the royal line descending from King David.

God had promised David that his family would always rule Judah.

Zedekiah belongs to that same royal line, even under Babylon's control.

This title reminds the king what he is failing to live up to.

👑 House of David means David's royal line

🤝 God had promised this family the throne

⛓️ Zedekiah rules that line under Babylon

📖 The title recalls a promise he is failing

## ⚖️ Execute Judgment In The Morning

Ancient courts often held official hearings early in the day.

Execute judgment in the morning means handle justice promptly, without delay.

Waiting or dragging out fair rulings was the real problem being addressed.

God is calling the king to act quickly, not to think it over.

⚖️ Courts often met early in the day

⏰ This means act promptly, without delay

🐌 Slow justice was the real problem

📖 God calls for quick action, not delay

## 💰 Deliver Him That Is Spoiled Out Of The Hand Of The Oppressor

Spoiled here means robbed or taken advantage of, not ruined.

The oppressor is anyone using power to exploit someone weaker.

This command asks the king to actively rescue victims, not only pass judgment.

Justice in this verse means action on behalf of the powerless.

💰 Spoiled means robbed or exploited

👊 The oppressor abuses power over others

🤝 The king must actively rescue victims

📖 Justice here means action, not just words

## ⚠️ Lest My Fury Go Out Like Fire, And Burn That None Can Quench It

Lest means unless, warning of a real and specific consequence.

Fire that cannot be quenched pictures judgment with no way to stop it.

The warning connects directly back to the coming fire in verse ten.

Ignoring justice now will bring that same coming fire.

⚠️ Lest means unless, a real warning

🔥 Unquenchable fire means unstoppable judgment

🔁 This connects back to verse ten's fire

📖 Injustice invites that same coming fire

# Jeremiah 21:13-14
# 🔥 I Am Against Thee
---
## 🏔️ O Inhabitant Of The Valley, And Rock Of The Plain

Jerusalem sat on a raised, rocky plateau above the surrounding valleys.

This gave the city a natural defensive advantage that felt permanent.

The phrase pictures the city looking down confidently from its high ground.

That confidence is exactly what God is about to challenge.

🏔️ Jerusalem sat high above the valleys

🛡️ The high ground felt naturally defensible

😌 The people felt permanently secure there

📖 God is about to challenge that confidence

## 🗣️ Who Shall Come Down Against Us?

This question was not sincere curiosity, it was confident boasting.

The people believed their high, rocky position made them untouchable.

Jerusalem's own geography had quietly become a substitute for trusting God.

God answers this exact boast directly in the next verse.

🗣️ This was boasting, not a real question

🏔️ Geography made them feel untouchable

🚫 Their high ground replaced trust in God

📖 God answers this exact boast directly

## 🍎 I Will Punish You According To The Fruit Of Your Doings

Fruit of your doings means the natural result that actions produce.

A tree's fruit reveals what kind of tree it actually is.

Judah's actions here are the sin and false confidence just described.

The coming punishment fits the behavior, it does not come from nowhere.

🍎 Fruit of doings means the result actions produce

🌳 A tree's fruit reveals what it is

⚖️ The punishment matches actual behavior

📖 Judgment fits the sin, not random cruelty

## 🌲 I Will Kindle A Fire In The Forest Thereof

Forest here likely points to Jerusalem's grand cedar buildings, not woodland trees.

Solomon once built a palace hall known as the House of the Forest of Lebanon.

Its many cedar pillars looked like a forest growing indoors.

Fire aimed at this forest means fire aimed at the seat of royal power.

🌲 Forest likely means grand cedar buildings

🏛️ Solomon's palace hall used this same image

🪵 Cedar pillars looked like an indoor forest

📖 The fire targets the seat of royal power

## 💥 It Shall Devour All Things Round About It

Devour means completely consumed, leaving nothing standing afterward.

Round about it means the destruction spreads beyond just one building.

The chapter that began with a king's desperate question ends in total fire.

Zedekiah asked for rescue, and instead received a detailed sentence.

🔥 Devour means completely consumed

💥 The destruction spreads beyond one building

👑 A king's question ends in total fire

📖 Zedekiah asked for rescue, received judgment instead
`.trim();

export const JEREMIAH_TWENTY_ONE_PERSONAL_SECTIONS = parseJeremiahTwentyOneRawNotes(JEREMIAH_TWENTY_ONE_RAW_NOTES);
