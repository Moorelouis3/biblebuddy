export type LamentationsOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLamentationsOneRawNotes(rawText: string): LamentationsOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LamentationsOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Lamentations\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Lamentations 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Lamentations\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Lamentations\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Lamentations 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Lamentations 1:${startVerse}` : `Lamentations 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Lamentations 1 sections, received " + sections.length);
  }

  return sections;
}

const LAMENTATIONS_ONE_RAW_NOTES = `# Lamentations 1:1-3
# 😢 How Doth The City Sit Solitary
---
## 😢 How Doth The City Sit Solitary

"Solitary" means completely alone, not simply quiet.

Jerusalem is pictured here as a person sitting in grief.

This poem gives the fallen city a human voice and a face.

The Hebrew poem behind this chapter runs through the alphabet, one line for each letter.

Each of the twenty two verses begins with the next letter in order.

A careful poem builds this lament.

This is not random weeping.

🏙️ Solitary means utterly alone

📜 The city is given a human voice

🔤 Each verse follows the Hebrew alphabet in order

📖 Careful poetry carries this grief, not randomness

---
## 👑 She That Was Great Among The Nations

Jerusalem once held real standing among the surrounding nations.

Her temple, her kings, and her wealth earned genuine respect.

"Princess among the provinces" names a ruler, not merely a resident.

That same city now owes tribute instead of receiving it.

Tribute meant forced payments sent to a conquering empire.

The fall is worth grieving because the height was real.

👑 Jerusalem once held real standing

🏛️ Her temple and kings earned respect

💰 Tributary means forced to pay a conqueror

📖 A real height makes the fall worth grieving

---
## 💧 She Weepeth Sore In The Night

"Sore" here means severe, not simply uncomfortable.

Weeping in the night pictures grief with no one watching.

Day brings distraction, but night leaves a person alone with pain.

The poem keeps returning to tears throughout this chapter.

Grief this size does not stay quiet during daylight hours alone.

💧 Sore means severe, not mild

🌙 Night leaves grief with no witness

😢 Tears return again and again in this poem

📖 Real grief does not stay confined to daylight

---
## 🤝 All Her Lovers Hath None To Comfort Her

"Lovers" here names the nations Judah trusted instead of God.

Judah made alliances with Egypt and other powers for protection.

None of those allies came to help when Babylon attacked.

Trusted friends became enemies the moment they were needed.

Misplaced trust leaves a person more alone, not less.

🤝 Lovers means allied nations Judah trusted

🏺 Egypt was one such ally

🚫 None of them helped when Babylon attacked

📖 Misplaced trust leaves a person more alone

---
## ⛓️ Judah Is Gone Into Captivity Because Of Affliction

Captivity means the people were forced out of their own land.

"Affliction" and "servitude" together describe both suffering and forced labor.

This was not a short raid but a full removal of a nation.

Judah now lives among foreign nations with no rest found anywhere.

⛓️ Captivity means forced removal from the land

💔 Affliction and servitude name real suffering

🌍 This was a full removal, not a raid

📖 No rest was found among foreign nations

---
## 🏔️ Her Persecutors Overtook Her Between The Straits

"Straits" names narrow mountain passes with no room to run.

An army fleeing through a strait could be trapped easily.

Judah's people were caught in the very places meant to offer escape.

Even the land itself offered no safe way out.

🏔️ Straits means narrow mountain passes

🏃 Narrow passes trap people trying to flee

🎯 Judah was caught in places meant for escape

📖 Even the land offered no way out

---
# Lamentations 1:4-6
# 🛣️ The Ways Of Zion Do Mourn
---
## 🛣️ The Ways Of Zion Do Mourn

"Ways" here means the roads leading up to Jerusalem.

Those roads once filled with pilgrims traveling to worship at the temple.

"Solemn feasts" names Israel's appointed festivals like Passover and Tabernacles.

With no pilgrims left, even the roads themselves seem to grieve.

An empty road can show loss as clearly as an empty house.

🛣️ Ways means the roads to Jerusalem

🎉 Solemn feasts were Israel's appointed festivals

🚶 Pilgrims once filled those same roads

📖 An empty road shows real loss

---
## 🚪 All Her Gates Are Desolate

City gates were where business, trials, and daily life happened.

A desolate gate means no one gathers there anymore.

Gates measured a city's life by how busy they stayed.

Silence at the gate was a visible sign the city had died inside.

🚪 Gates were centers of daily city life

📉 Desolate means completely empty and unused

🔇 A busy gate once marked a living city

📖 Silence showed the city had died

---
## 🙏 Her Priests Sigh, Her Virgins Are Afflicted

Priests led worship at the temple every single day.

With no temple standing, their entire role had disappeared.

Young unmarried women, grouped here with the priests, also shared in the loss.

Every part of ordinary life, old and young, carried this grief together.

🙏 Priests led temple worship daily

🏛️ Their role disappeared with the temple

👧 Virgins named here are young unmarried women

📖 Grief here touched every generation together

---
## 👑 Her Adversaries Are The Chief, Her Enemies Prosper

"Chief" here means the enemies now hold the position of power.

Judah once ruled her own land under her own king.

Now outsiders control what Judah used to control herself.

A full reversal like this is worse than simple defeat.

👑 Chief means the enemies now hold power

🔄 Judah once ruled her own land

🌍 Outsiders now control what Judah lost

📖 A full reversal cuts deeper than defeat

---
## ⚖️ The LORD Hath Afflicted Her For The Multitude Of Her Transgressions

This line names the real cause behind the disaster.

Babylon's army was the visible force, but sin was the deeper reason.

"Multitude" means the sheer number of transgressions had piled up over time.

Lamentations never lets the reader blame this only on bad luck.

⚖️ This line names the real cause

🪖 Babylon was visible, sin ran deeper

📚 Multitude means sins had piled up over time

📖 This disaster was never simple bad luck

---
## 🦌 Her Princes Are Become Like Harts That Find No Pasture

A hart is a deer, an animal built for speed, not fighting.

A hart with no pasture is weak from hunger with nowhere safe to graze.

Judah's leaders are compared to that same starving, defenseless animal.

Strong men who once led armies now simply run for their lives.

🦌 A hart is a deer, not a fighter

🌾 No pasture means weak from hunger

👑 Judah's leaders are compared to this animal

📖 Leaders now run instead of leading

---
# Lamentations 1:7-9
# 💔 Jerusalem Remembered Her Pleasant Things
---
## 💔 All Her Pleasant Things That She Had In The Days Of Old

Memory here makes the pain sharper instead of softer.

Jerusalem now recalls the wealth and comfort she once had.

Comparing the present ruin to the remembered past deepens the grief.

A person who never had much does not grieve this same way.

🧠 Memory here sharpens pain, not softens it

💎 Pleasant things names wealth Jerusalem once had

📉 Comparing past comfort deepens present grief

📖 Those who had much feel loss most

---
## 😏 The Adversaries Saw Her, And Did Mock At Her Sabbaths

The Sabbath was Judah's weekly day set apart for rest and worship.

Enemies mocking that day means they ridiculed Judah's entire faith, not just her defeat.

Losing a battle is one kind of pain.

Being laughed at for the beliefs you still hold is another kind entirely.

🗓️ Sabbath was Judah's weekly day of rest

😏 Mocking the Sabbath ridiculed Judah's faith itself

⚔️ Losing a battle is one kind of pain

📖 Being mocked for belief is a deeper wound

---
## ⚖️ Jerusalem Hath Grievously Sinned, Therefore She Is Removed

This line states cause and effect without softening either one.

"Grievously" means seriously, not a small or minor offense.

"Removed" here points to exile, being physically taken from the land.

The text refuses to separate the sin from the punishment that followed.

⚖️ This line names cause and effect plainly

📏 Grievously means seriously, not minor

🚶 Removed here means exile from the land

📖 Scripture connects this sin to this punishment

---
## 👁️ They Have Seen Her Nakedness

In this culture, nakedness pictured total shame and exposure, not only clothing.

A city's nakedness meant every weakness was now visible to outsiders.

What was once private and protected became public and humiliating.

This image explains why even old friends now turn away.

👁️ Nakedness pictures total shame here

🏙️ A city's weakness was now fully visible

🔓 Private protection had become public exposure

📖 This shame explains why friends turned away

---
## 👗 Her Filthiness Is In Her Skirts

"Skirts" refers to the hem or edge of a garment.

Filthiness on the skirts pictures uncleanness that could not be hidden.

The image describes sin that stains a person's everyday life, not one single act.

Something worn every day had become something shameful to wear.

👗 Skirts means the edge of a garment

🧼 Filthiness pictures uncleanness that cannot hide

📆 This stain touched everyday life, not one act

📖 Something worn daily became something shameful

---
## 🗣️ O LORD, Behold My Affliction

The voice shifts here from someone describing Jerusalem to Jerusalem speaking herself.

"Behold" is a direct request for God to pay attention.

This sudden first person cry makes the suffering feel immediate, not distant.

The chapter lets the city speak for herself instead of only being described.

🗣️ The voice shifts to Jerusalem speaking herself

👀 Behold asks God to pay attention

⏱️ This cry feels immediate, not distant

📖 The city is finally given her own voice

---
# Lamentations 1:10-12
# ⛩️ The Heathen Entered Her Sanctuary
---
## ⛩️ The Heathen Entered Into Her Sanctuary

"Sanctuary" names the temple, the most sacred space in Jerusalem.

Mosaic law restricted who could even approach that holy space.

Outsiders entering it was not simple trespassing, it broke a direct command from God.

Losing that boundary was its own kind of devastation, beyond the building itself.

⛩️ Sanctuary means the temple itself

📜 Mosaic law restricted who could approach

🚫 Outsiders entering broke a direct command

📖 This boundary mattered as much as the building

---
## 🍞 They Have Given Their Pleasant Things For Meat

Starving people traded their valuables simply to get food.

"Meat" here means food in general, not only animal flesh.

What they once treasured no longer mattered next to basic hunger.

Famine strips away comfort long before it threatens life itself.

🍞 Meat here means food in general

💍 Valuables were traded away for food

🥀 Treasures stopped mattering next to hunger

📖 Famine strips comfort before it threatens life

---
## 💔 I Am Become Vile

"Vile" names a deep, public sense of shame.

Jerusalem speaks of herself the way others now see her.

This is confession, not only complaint about suffering.

Naming shame honestly is different from hiding it or denying it.

💔 Vile names deep public shame

🗣️ Jerusalem describes herself as others see her

🙏 This line confesses, it does not just complain

📖 Naming shame honestly differs from hiding it

---
## 🚶 Is It Nothing To You, All Ye That Pass By

This question is aimed at travelers walking past the ruined city.

It asks whether anyone outside this suffering even notices it.

Indifference from onlookers can hurt as much as the disaster itself.

The question still challenges any reader who passes by suffering without stopping.

🚶 This question is aimed at passing travelers

👀 It asks whether anyone even notices

💔 Indifference can hurt as much as disaster

📖 The question still challenges readers today

---
## 🔥 The LORD Hath Afflicted Me In The Day Of His Fierce Anger

"Fierce anger" names real, intense judgment, not a mild correction.

This chapter keeps crediting the disaster to God, not chance.

A day of judgment was something Israel's prophets had warned about for years.

Naming God directly here is an act of honesty, not blame placed wrongly.

🔥 Fierce anger means real, intense judgment

🎯 This disaster is credited to God

📢 Prophets had warned of this day for years

📖 Naming God here is honesty, not blame

---
# Lamentations 1:13-15
# 🔥 Fire Sent Into My Bones
---
## 🔥 He Hath Sent Fire Into My Bones

Fire in the bones pictures pain reaching the deepest part of a person.

This is not a surface wound that heals quickly.

Bones sit underneath everything else, so pain there leaves nothing untouched.

The image makes inner suffering as real as any physical injury.

🔥 Fire in the bones means deep pain

🦴 Bones sit beneath everything else in the body

🩹 This is not a quick, surface wound

📖 Inner suffering is pictured as fully real

---
## 🕸️ He Hath Spread A Net For My Feet

A net for the feet pictures being trapped while trying to walk forward.

Hunters used nets like this to catch animals that could not see the danger.

Jerusalem is pictured here as caught, not simply struggling.

Every attempt to move forward only tightened the trap further.

🕸️ A net traps feet while walking forward

🏹 Hunters used nets to catch unaware prey

🙇 Jerusalem is pictured as caught, not struggling

📖 Every movement tightened the trap further

---
## 🐂 The Yoke Of My Transgressions Is Bound By His Hand

A yoke was a wooden frame laid across an ox to force its labor.

Here, sin itself becomes that same heavy, binding weight.

"Wreathed" means twisted together like a rope wound tightly around the neck.

Sin is pictured as something that builds up and finally presses down hard.

🐂 A yoke forced an ox into labor

⛓️ Sin itself becomes that heavy weight

🪢 Wreathed means twisted tightly like rope

📖 Sin builds up before it presses down

---
## 🍇 The LORD Hath Trodden The Virgin, The Daughter Of Judah, As In A Winepress

A winepress crushed grapes underfoot to force out their juice.

"Daughter of Judah" is another name for the city, pictured as a young woman.

Comparing her to crushed grapes pictures total, forceful judgment.

This stands among the harshest images in the entire chapter.

🍇 A winepress crushed grapes by foot

👑 Daughter of Judah names the city itself

💥 Crushed grapes pictures total judgment

📖 This stands among the chapter's harshest images

---
## 📯 He Hath Called An Assembly Against Me To Crush My Young Men

"Assembly" usually named Israel gathering for worship, not war.

Here, an assembly gathers instead to destroy Judah's own young soldiers.

A word normally tied to worship is turned into a word for judgment.

Even familiar, friendly language can carry an unexpected weight in this poem.

📯 Assembly usually meant gathering for worship

⚔️ Here it gathers instead for judgment

🔄 A worship word is turned toward judgment

📖 Familiar words carry new weight in this poem

---
# Lamentations 1:16-18
# 🙌 Zion Spreadeth Forth Her Hands
---
## 🔁 Mine Eye, Mine Eye Runneth Down With Water

Repeating "mine eye" twice is a feature of Hebrew poetry, not a mistake.

Saying a thing twice in a row gave it extra weight and emotion.

"Runneth down with water" simply means tears are flowing steadily.

The repetition makes the grief feel heavier than a single plain sentence could.

🔁 Repeating a phrase added weight in Hebrew poetry

💧 Runneth down with water means steady tears

📜 This is a real poetic feature

📖 Repetition makes grief feel heavier here

---
## 🤲 The Comforter That Should Relieve My Soul Is Far From Me

A comforter here means someone who offers real relief, not just kind words.

Jerusalem looked for allies and friends to fill that role.

None of them were willing or able to help in the end.

Distance here describes absent help, not only physical miles.

🤲 Comforter means someone who offers real relief

🤝 Jerusalem looked to allies for that role

🚫 None of them helped in the end

📖 Far away here means absent help

---
## 🙌 Zion Spreadeth Forth Her Hands, And There Is None To Comfort Her

Spreading out the hands was a visible, physical gesture of pleading.

It pictured someone reaching out and finding nothing to hold onto.

This same gesture appears elsewhere in scripture as a plea toward God.

Here, the gesture is made and still answered with silence.

🙌 Spread hands was a visible gesture of pleading

🫙 It pictured reaching out and finding nothing

📜 This same gesture appears elsewhere in scripture

➡️ Here the gesture meets only silence

---
## 🚪 Jerusalem Is As A Menstruous Woman Among Them

Mosaic law set rules of ritual uncleanness, including during this monthly cycle.

Those rules required a temporary period of separation, not shame on the person.

This comparison pictures Jerusalem as excluded and avoided by everyone around her.

The image is about total social rejection, not a judgment on women.

📜 Mosaic law set rules of ritual uncleanness

⏳ Those rules required temporary separation, not shame

🚪 The image pictures Jerusalem as excluded

📖 This pictures rejection, not judgment on women

---
## 🙏 The LORD Is Righteous, For I Have Rebelled Against His Commandment

This line is a direct confession, not an accusation against God.

"Righteous" here means God acted with justice, even in this harsh judgment.

Jerusalem admits the rebellion came first, before the punishment ever did.

Confession like this takes real honesty in the middle of real suffering.

⚖️ Righteous means God acted with justice

🙏 This line confesses, it does not accuse

📜 The rebellion came before the punishment

📖 Honest confession can happen inside real suffering

---
# Lamentations 1:19-20
# ⚔️ Abroad The Sword, At Home As Death
---
## 🤝 I Called For My Lovers, But They Deceived Me

These lovers are the same foreign allies mentioned earlier in the chapter.

Judah called on them for rescue when Babylon attacked.

Deceived here means they promised help and then failed to deliver it.

Trusting the wrong source for help made the betrayal even more painful.

🤝 Lovers again names Judah's foreign allies

📣 Judah called on them for rescue

🎭 Deceived means they promised help, then failed

📖 Trusting the wrong source made betrayal worse

---
## 💀 My Priests And Mine Elders Gave Up The Ghost

"Gave up the ghost" is an old way of saying someone died.

Priests led worship, and elders led the community's daily decisions.

Losing both leadership groups left the city without guidance of any kind.

Even the people meant to guide others could not survive the famine.

💀 Gave up the ghost means died

🙏 Priests led worship in the city

⚖️ Elders led the community's daily decisions

📖 Even leaders could not survive this famine

---
## 🫀 My Bowels Are Troubled, Mine Heart Is Turned Within Me

Ancient Hebrew often located deep emotion in the body's core, not only the heart.

"Bowels troubled" and "heart turned" both describe overwhelming inner anguish.

This is not a literal medical complaint about digestion.

The language simply gives physical, bodily weight to emotional pain.

🫀 Hebrew often located emotion in the body

😣 Both phrases describe overwhelming inner anguish

🚫 This is not a literal medical complaint

📖 Physical language gives weight to emotional pain

---
## ⚔️ Abroad The Sword Bereaveth, At Home There Is As Death

"Abroad" means outside the city, where the sword brought death in battle.

"At home" means inside the walls, where famine brought death just as surely.

There was no direction left that offered any kind of safety.

Danger outside and danger inside closed in from every side at once.

⚔️ Abroad means outside, where the sword killed

🏠 At home means inside, where famine killed

🚫 No direction offered any real safety

📖 Danger closed in from every side

---
# Lamentations 1:21-22
# ⚖️ Let All Their Wickedness Come Before Thee
---
## 😈 They Are Glad That Thou Hast Done It

Judah's enemies are not just unmoved, they are celebrating her downfall.

That reaction makes the suffering feel even more isolating.

The text does not hide or soften how cruel that joy really was.

Naming cruelty honestly is different from excusing it.

😈 Enemies celebrated Judah's downfall openly

💔 That reaction deepened the isolation

📜 The text does not soften this cruelty

📖 Naming cruelty honestly is not excusing it

---
## 📅 Thou Wilt Bring The Day That Thou Hast Called, And They Shall Be Like Unto Me

This is a prayer asking God to eventually judge these enemies too.

"The day" points to a future moment of reckoning, not just a feeling.

Asking for fairness toward an enemy is different from asking for cruelty.

Many psalms of lament include this same honest request for justice.

🙏 This is a prayer for future justice

📅 The day points to a coming reckoning

⚖️ Asking for fairness differs from asking for cruelty

📖 Lament psalms often include this same request

---
## ⚖️ Let All Their Wickedness Come Before Thee

This final verse asks God to judge the enemy's own sin honestly.

It does not ask for anything worse than what Judah herself received.

The request matches the same standard already used against Jerusalem.

Fair judgment, not revenge alone, is what the prayer is asking for.

⚖️ This verse asks God to judge justly

🔄 It asks for the same standard

🙏 The prayer seeks fairness, not pure revenge

📖 The chapter ends asking for God's justice

---
## 😔 My Sighs Are Many, And My Heart Is Faint

The chapter that opened with weeping closes the very same way.

"Faint" here means weak and worn out, not simply sad.

No tidy resolution arrives by the final line of this poem.

Honest grief is allowed to end still unresolved, without a forced ending.

🔁 The chapter closes the way it opened

😔 Faint means weak and worn out

🚫 No tidy resolution closes this poem

📖 Honest grief can stay unresolved at the end
`.trim();

export const LAMENTATIONS_ONE_PERSONAL_SECTIONS = parseLamentationsOneRawNotes(LAMENTATIONS_ONE_RAW_NOTES);
