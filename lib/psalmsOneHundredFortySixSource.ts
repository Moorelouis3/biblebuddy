export type PsalmsOneHundredFortySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredFortySixRawNotes(rawText: string): PsalmsOneHundredFortySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredFortySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+146:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 146 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+146:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+146:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 146 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 146,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 146:${startVerse}` : `Psalms 146:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 146 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_FORTY_SIX_RAW_NOTES = `# Psalms 146:1-2
# 🎤 A Lifelong Vow To Praise
---
## 🎉 Praise Ye The LORD

"Praise ye the LORD" translates a single Hebrew word, hallelujah.

Hallelujah simply means praise the LORD or praise Yah.

This phrase opens the psalm and will close it again in verse ten.

Psalms 146 through 150 all begin and end with this same word.

Together they form the final five praise songs closing out the whole book of Psalms.

🎉 Hallelujah means praise the LORD
🔁 It opens and closes this psalm
📚 Psalms 146 through 150 share this pattern
📖 They close out the entire Psalter

## 🗣️ Praise The LORD, O My Soul

This is not David or another writer speaking to someone else.

"O my soul" means the psalmist is speaking directly to himself.

He commands his own inner self to join in worship.

Psalm 103 opens with this exact same phrase, "Bless the LORD, O my soul."

Real praise sometimes has to start as a command given to yourself.

🗣️ The psalmist speaks to himself here
🪞 O my soul means his inner self
🔁 Psalm 103 opens the very same way
📖 Praise can start as a command to yourself

## ⏳ While I Live Will I Praise The LORD

This is not a promise for one good day of worship.

The psalmist commits to praise for the entire length of his life.

Verse four will soon describe how short and fragile that life actually is.

Even knowing life ends, he still chooses praise as a lifelong pattern.

⏳ Praise is promised for a whole life
💨 Verse four will show life is short
💪 He commits anyway, knowing this
📖 This is a lifelong pattern, not one moment

## 🎶 I Will Sing Praises Unto My God While I Have Any Being

This line repeats the same idea as "while I live" from the sentence before it.

Hebrew poetry often says one idea twice using two different words.

"Being" here points to existence itself, not just breath or good health.

As long as he exists at all, singing stays part of that existence.

🎶 Being means existence itself
🔁 This line repeats the one before it
📜 Hebrew poetry often restates one idea
📖 Existing and praising become the same thing

# Psalms 146:3-4
# ⚰️ Every Mortal Ruler Will Fail
---
## 👑 Put Not Your Trust In Princes

This is not a claim that leaders and rulers are always evil.

It is a warning about where final trust and hope get placed.

In the ancient world, a king's power could feel like the only real security.

The psalmist warns that even the strongest ruler cannot offer help that never fails.

👑 Princes here means rulers and kings
🚫 Not a claim that leaders are evil
🛡️ The warning is about final trust
📖 No ruler offers help that never fails

## 🧍 Nor In The Son Of Man, In Whom There Is No Help

"Son of man" here simply means any human being.

It is not a title for one specific person or a future king.

The phrase widens the warning from kings to every ordinary person.

No human being, however powerful, can offer help with no limit.

🧍 Son of man means any human
🌍 The warning widens beyond kings alone
🚫 No person's help is without limit
📖 Every human help runs out eventually

## 💨 His Breath Goeth Forth, He Returneth To His Earth

"His breath goeth forth" describes the exact moment a person dies.

"He returneth to his earth" echoes God's own words to Adam in Genesis.

Genesis says a person came from dust and returns to dust.

Even the most powerful ruler shares this same ending as everyone else.

💨 Breath goeth forth means death
🌱 It echoes Genesis and the words to Adam
⚰️ Dust returns to dust for everyone
📖 Power changes nothing about this ending

## 🧠 In That Very Day His Thoughts Perish

"Thoughts" here does not mean simple ideas or opinions.

It points to a ruler's plans, projects, and purposes.

On the day he dies, every unfinished plan dies right alongside him.

This is the real reason his help was never something to fully lean on.

🧠 Thoughts here means plans and purposes
⚱️ Death ends every unfinished plan
🏗️ Even a king's projects stop cold
📖 This is why his help had limits

# Psalms 146:5-6
# 🌍 Happy Is He Whose Hope Is The LORD
---
## 😊 Happy Is He That Hath The God Of Jacob For His Help

"Happy" here means genuinely blessed, not simply cheerful for a moment.

"The God of Jacob" points back to the covenant God made with Israel's ancestors.

Calling on this specific name ties the reader to that whole covenant history.

This happiness comes from who is helping, not from easy circumstances.

😊 Happy means truly blessed
🤝 God of Jacob recalls the covenant
📜 It ties the reader to that history
📖 The source of help is what matters

## 🙏 Whose Hope Is In The LORD His God

Verse three already warned against trusting in princes and mortal help.

This verse now names the one place hope actually belongs.

The two ideas sit right next to each other on purpose.

Mortal help fails, but hope placed in the LORD does not fail.

🙏 This verse contrasts with verse three
👑 Princes fail, the LORD does not
🎯 The contrast is placed here on purpose
📖 Hope in the LORD does not fail

## 🌊 Which Made Heaven, And Earth, And The Sea

This line names God as the maker of literally everything that exists.

Heaven, earth, and sea covered the entire known world to an ancient reader.

A ruler can only govern one small piece of that whole creation.

The God being trusted here is not limited the way any prince is.

🌌 This names God as maker of all
🗺️ Heaven, earth, and sea covered the whole world
👑 A ruler only governs a small piece
📖 This God is not limited like a prince

## 🤝 Which Keepeth Truth For Ever

"Keepeth truth" means He stays faithful to His own promises.

Verse four just said a mortal man's thoughts perish the very day he dies.

God's faithfulness carries no such expiration date.

What He promises stays true forever, not just for one lifetime.

🤝 Keepeth truth means stays faithful
⏳ Human plans perish, this never does
♾️ God's faithfulness has no end date
📖 His promises outlast any lifetime

# Psalms 146:7-8
# ⚖️ Justice, Freedom, And Sight For The Weak
---
## ⚖️ Which Executeth Judgment For The Oppressed

"Executeth judgment" means actively making sure justice actually happens.

It is not simply feeling sympathy from a safe distance.

"Oppressed" describes people crushed by unfair treatment or abuse of power.

God is described here as personally acting on their behalf.

⚖️ Executeth judgment means enforcing justice
💔 Oppressed means crushed by unfair treatment
🙅 Not sympathy from a safe distance
📖 God acts personally for the oppressed

## 🍞 Which Giveth Food To The Hungry

This line moves from courtroom justice to a basic physical need.

Hunger was a constant threat in the ancient world, not a rare event.

Feeding the hungry sits right next to enforcing justice in this same verse.

Physical care and moral justice are treated here as one connected concern.

🍞 Feeding the hungry follows justice directly
🌾 Hunger was a constant ancient threat
🔗 Justice and physical care are linked
📖 Both matter equally to God

## ⛓️ The LORD Looseth The Prisoners

"Looseth" means to set free or release from bondage.

This could describe literal prisoners held unjustly in captivity.

It may also picture Israel's own release from exile in a foreign land.

Either way, the LORD is pictured as the one who opens locked doors.

⛓️ Looseth means sets free
🔓 It may mean literal prisoners
🏝️ It may also picture return from exile
📖 God opens doors that stay locked

## 👁️ The LORD Openeth The Eyes Of The Blind

This line can describe an actual physical healing of blindness.

It can also describe helping someone finally understand a spiritual truth.

Both meanings fit the pattern already set by this verse.

God is shown reaching into needs the person could never fix alone.

👁️ This may mean literal healing
💡 It may also mean spiritual understanding
🙌 Both meanings fit this verse
📖 God reaches needs no one can fix alone

## 😔 The LORD Raiseth Them That Are Bowed Down

"Bowed down" pictures someone weighed low by grief or hardship.

Psalm 145 used this same exact picture just one chapter earlier.

Being raised up means God actively lifts that person back to standing.

This is not a one time image but a repeated pattern across the Psalms.

😔 Bowed down means weighed down by hardship
🔁 Psalm 145 used this same picture
⬆️ Raised up means lifted back to standing
📖 This pattern repeats across the Psalms

## ❤️ The LORD Loveth The Righteous

This line shifts from need and rescue to relationship and love.

"Righteous" means those who genuinely try to live in right standing with God.

The list so far has focused on physical and social needs.

Here the focus becomes personal affection, not only practical rescue.

❤️ This line shifts to relationship
⚖️ Righteous means living rightly before God
🔀 Earlier lines focused on physical needs
📖 Now the focus becomes personal love

# Psalms 146:9
# 🤲 Protecting The Stranger, The Widow, And The Fatherless
---
## 🌍 The LORD Preserveth The Strangers

"Strangers" here means foreigners living among the people of Israel.

They had no family land, no tribe, and no built in protection.

Old Testament law repeatedly commanded Israel to treat them justly.

Here the LORD Himself is shown as their personal protector.

🌍 Strangers means foreigners living among Israel
🏚️ They had no land or tribe
📜 The law commanded fair treatment of them
📖 God protects them personally

## 👪 He Relieveth The Fatherless And Widow

The fatherless and the widow were two of the most vulnerable people in this culture.

Without a husband or father, a woman or child had little legal standing.

Strangers, fatherless children, and widows appear together often across scripture.

This exact trio becomes a repeated measure of a truly just society.

👪 Fatherless and widow lacked legal standing
🤝 This trio appears often together in scripture
📏 It measures a truly just society
📖 God relieves those with the least standing

## 🔄 But The Way Of The Wicked He Turneth Upside Down

Every action before this line describes lifting someone up or protecting them.

This final line turns to what happens to those who oppress others.

"Turneth upside down" means their plans and schemes get overturned completely.

The same God who protects the weak actively opposes those who prey on them.

🔄 This line turns from rescue to reversal
😈 Wicked here means those who prey on others
🌀 Upside down means their plans get overturned
📖 Protecting the weak means opposing the wicked

# Psalms 146:10
# 👑 A King Who Never Dies
---
## 👑 The LORD Shall Reign For Ever

Verse four already said a mortal ruler's thoughts perish the day he dies.

This verse names the one King whose reign never ends that way.

Every earthly kingdom in history has eventually come to an end.

The LORD's reign is the single exception to that entire pattern.

👑 This contrasts with the ruler of verse four
⏳ Earthly kingdoms all eventually end
♾️ The LORD's reign never ends
📖 He is the exception to the pattern

## 🏙️ Even Thy God, O Zion

"Zion" is another name for Jerusalem, the city where God's temple stood.

Calling God "thy God" makes this a direct, personal address to His people.

The whole psalm now speaks straight to the community gathered to worship.

This is no longer a general statement but words spoken to a specific people.

🏙️ Zion refers to Jerusalem and the temple
🗣️ Thy God makes this a direct address
👥 The psalm speaks to God's people
📖 A general truth becomes personal address

## 🔁 Unto All Generations

This phrase answers the mortality described earlier in the psalm.

A single human generation lives, dies, and passes the story to the next.

God's reign does not pass down the way a crown does.

The psalm now closes with the very same words it opened with.

🔁 This answers the mortality theme earlier
👴 Human generations rise and pass away
👑 God's reign does not pass down
📖 The psalm ends exactly how it opened
`.trim();

export const PSALMS_ONE_HUNDRED_FORTY_SIX_PERSONAL_SECTIONS = parsePsalmsOneHundredFortySixRawNotes(
  PSALMS_ONE_HUNDRED_FORTY_SIX_RAW_NOTES,
);
