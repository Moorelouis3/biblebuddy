export type EzekielFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielFiveRawNotes(rawText: string): EzekielFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 5:${startVerse}` : `Ezekiel 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Ezekiel 5 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_FIVE_RAW_NOTES = `# Ezekiel 5:1-4
# ✂️ The Prophet Becomes The Sign
---
## 🔪 Take Thee A Sharp Knife, Take Thee A Barber's Razor

A razor here means a real blade used for shaving, not a figure of speech.

God does not ask Ezekiel to imagine this sign.

He tells him to pick up an actual tool and use it on his own body.

A prophet's message usually comes through words alone.

This time the message comes through Ezekiel's own appearance.

🔪 Razor means a real shaving blade

✂️ Ezekiel must use it on himself

🗣️ Most prophecy comes through words

📖 This message comes through his appearance

---

## ✂️ Cause It To Pass Upon Thine Head And Upon Thy Beard

Ezekiel was a priest before he became a prophet.

Priests were forbidden to shave their heads or cut their beards.

That rule was meant to separate them from common mourning customs.

God now commands Ezekiel to break it himself, on purpose.

Anyone who knew Ezekiel's background would have found this shocking to watch.

✂️ Priests could not shave for mourning

📜 That rule came from the law

🤯 God has him break it himself

➡️ Even the act alone was shocking

---

## ⚖️ Take Thee Balances To Weigh, And Divide The Hair

Balances means an ordinary set of weighing scales, the kind used daily in the marketplace.

Ezekiel uses that same tool on his own hair instead of grain or silver.

Nothing about this judgment happens by guesswork.

Every portion gets measured out on purpose, down to the exact weight.

⚖️ Balances means ordinary weighing scales

🌾 Merchants used them for daily trade

✂️ Ezekiel measures his own hair

📖 This judgment is precise, not random

---

## 🔥 Burn With Fire A Third Part In The Midst Of The City

The city here refers to the small model of Jerusalem Ezekiel built back in chapter four.

A third of his hair gets burned right inside that model.

Fire inside a besieged city usually meant food and fuel had already run out.

This piece of the sign pictures people who would die inside Jerusalem during the siege itself.

🏙️ The city means the model from chapter four

🔥 A third of the hair burns there

🧱 Fire fits a city under siege

📖 This pictures death inside the city

---

## 🗡️ Smite About It With A Knife

This second third does not simply fall to the ground.

It stands for people struck down at the very edges of the besieged city.

Some in that group die trying to escape as the city falls.

Others die defending it until the very end.

🗡️ A knife strikes hair near the city

🏃 Some died trying to escape

🛡️ Others died defending the city

➡️ Violence reached people on every side

---

## 💨 Scatter In The Wind

Scattering here means losing any way back to each other.

The last third of the hair gets thrown into open wind, carried in every direction.

This pictures people who survive the city's fall ending up spread among many nations.

They do not escape together as one group.

💨 The last third scatters on the wind

🌍 It spreads in every direction

🧑‍🤝‍🧑 This pictures survivors spread among nations

📖 Scattering separates them from each other

---

## ⚔️ I Will Draw Out A Sword After Them

Being scattered does not mean being safe.

God promises to send a sword chasing that scattered third wherever it goes.

Distance from Jerusalem would not guarantee distance from judgment.

Danger follows some of the exiles even into other lands.

⚔️ A sword chases the scattered group

🏃 Distance did not guarantee safety

🌍 Danger followed them into exile

➡️ Judgment can travel farther than people do

---

## 👘 Take Thereof A Few In Number, And Bind Them In Thy Skirts

Skirts means the fold of Ezekiel's outer robe, used here like a pocket.

Before scattering the hair, God has him set aside a small number of strands first.

That small group pictures a remnant kept apart from the three thirds already judged.

Being set apart here does not yet mean being fully safe.

👘 Skirts means the fold of a robe

🤏 A few strands are tucked inside it

🌱 This pictures a remnant set apart

➡️ Being set apart is not full safety

---

## 🔥 Cast Them Into The Midst Of The Fire

Even the hair kept safe in Ezekiel's robe does not stay protected for long.

God has him take part of that remnant and throw it into fire as well.

The fire that starts with this small handful is said to spread into all the house of Israel.

No part of the nation stays fully untouched by this judgment.

🔥 Even the safe hair reaches fire

🌍 Fire spreads to all Israel

🚫 No part stays fully untouched

📖 Even a remnant carries a warning

# Ezekiel 5:5-9
# 🏙️ This Is Jerusalem
---
## 🏙️ This Is Jerusalem

Up to this point the sign has stayed a riddle.

A razor, hair, fire, and a sword, all without one named target.

Here God finally says plainly what the whole sign has meant.

The tile city and the divided hair both stand for one real place.

Jerusalem is the true subject behind everything acted out so far.

🏙️ Jerusalem is finally named outright

✂️ The hair stood for her

🧱 The tile city stood for her too

📖 The riddle becomes a real place

---

## 🗺️ Set It In The Midst Of The Nations And Countries

Jerusalem sat at the center of the nations and countries surrounding her.

That position was not just an accident of geography.

Israel was meant to live differently than its neighbors, in plain view of all of them.

A place set in the middle is a place everyone can watch.

🗺️ Jerusalem sat among many nations

👀 Her life stayed visible to all of them

🌍 Israel was meant to live differently

➡️ A visible place carries a visible witness

---

## 📜 Changed My Judgments Into Wickedness

Judgments means God's specific rulings for how his people should live.

Jerusalem did not simply forget these rulings over time.

The text says she changed them into wickedness, turning the standard itself upside down.

What God gave as a guide became a source of sin instead.

📜 Judgments means God's specific rulings

🔄 Jerusalem turned them into wickedness

⬇️ A guide was flipped upside down

📖 The standard itself became corrupted

---

## ⚖️ More Than The Nations That Are Round About Her

God does not only say that Jerusalem sinned.

He says she sinned more than the nations around her.

Those surrounding nations never received God's law directly in the first place.

Jerusalem had far more revealed to her, and still fell further than people who had less.

⚖️ Jerusalem is compared to the nations

📉 She fell further than they did

📜 She had more of God's law

📖 More revealed meant more responsibility

---

## 📚 Refused My Judgments And My Statutes

Statutes means the broader body of law God gave, beyond single rulings.

The verse says Jerusalem refused both, not simply drifted away by accident.

Refused means an active choice, made on purpose.

Walked in them means putting a law into daily practice.

That practice never happened here at all.

📚 Statutes means God's broader body of law

🙅 Refused means an active choice

🚫 Walked in them means daily practice

➡️ This was rejection, not forgetting

---

## 📈 Because Ye Multiplied More Than The Nations

Multiplied points to Israel's growth in numbers and blessing under God's own care.

More blessing should have produced more faithfulness in return.

Instead the growth went the opposite direction, toward more sin than the nations around them.

A greater gift met a greater failure.

📈 Multiplied means growth under God's blessing

🙏 More blessing should have meant more faithfulness

📉 Instead it produced more sin

📖 A greater gift met a greater failure

---

## 🌍 Neither Have Done According To The Judgments Of The Nations

This line does not call the surrounding nations righteous.

Those nations still kept their own basic customs, even without knowing the true God.

Jerusalem is accused of failing to meet even that lower, pagan standard.

She had the greater revelation of God's law and still landed below her neighbors.

🌍 Pagan nations kept their own basic customs

📉 Jerusalem fell below even that bar

📜 She had the greater revelation

📖 More light did not produce more good

---

## 🔁 Behold, I, Even I, Am Against Thee

God repeats the word I twice in a row on purpose.

This is not a vague disaster or random bad luck striking Jerusalem.

God names his own direct involvement in what is about to happen.

The judgment is personal, not accidental.

🔁 I, even I, repeats for emphasis

🎯 God names his own direct role

🚫 This is not random bad luck

📖 The judgment is personal, not accidental

---

## ⚠️ That Which I Have Not Done, And Whereunto I Will Not Do Any More The Like

This judgment is described as unlike anything done before it.

This also means God will never repeat it the same way again.

That marks the coming fall of Jerusalem as a singular event in Israel's history.

The reason given is thine abominations, the detestable practices Jerusalem had adopted over time.

⚠️ This judgment has no earlier equal

🚫 It will not repeat the same way

🏛️ The fall of Jerusalem is singular

📖 Abominations caused the severity

# Ezekiel 5:10-12
# 💀 Judgment In Thirds
---
## 😨 The Fathers Shall Eat The Sons

Hunger this extreme points to a famine severe enough to break every normal bond.

Parents inside the besieged city are driven to eat their own children.

Moses had already warned centuries earlier that this exact horror would follow if Israel broke the covenant.

What Ezekiel describes here is an old warning finally coming true.

😨 Famine drives parents to this horror

📜 Moses warned of this long before

⚠️ This was a named covenant curse

📖 An old warning comes true here

---

## 🧑‍🤝‍🧑 The Whole Remnant Of Thee Will I Scatter Into All The Winds

Remnant here means whoever survives the famine and the violence inside the city.

This repeats the exact picture already acted out with Ezekiel's own hair.

Even survivors do not get to stay together in one place.

They end up scattered in every direction, just like the third of hair thrown into the wind earlier.

🧑‍🤝‍🧑 Remnant means those who survive

🌬️ This repeats the earlier hair sign

🌍 Even survivors are scattered apart

📖 The sign and the judgment match

---

## 🏛️ Defiled My Sanctuary With All Thy Detestable Things

Sanctuary means the temple in Jerusalem, the one place set apart to worship God alone.

Detestable things likely points to idols and pagan objects brought inside that same sacred space.

This sin did not happen somewhere distant from God.

It happened inside his own house, the one place meant to stay pure.

🏛️ Sanctuary means the Jerusalem temple

🗿 Detestable things means idols brought inside

🚫 The sin happened in God's own house

📖 The purest place became defiled

---

## 👁️ Neither Shall Mine Eye Spare, Neither Will I Have Any Pity

Mine eye spare means holding back out of mercy.

Any pity means feeling compassion strong enough to change the outcome.

God states plainly that neither one will stop what is coming this time.

Some warnings, after being ignored long enough, finally run out.

👁️ Eye spare means holding back in mercy

💔 Pity means compassion that changes outcome

🚫 Neither one will stop this judgment

➡️ Some warnings finally run out

---

## 🤒 A Third Part Of Thee Shall Die With The Pestilence

Pestilence means a severe, fast moving disease.

Long sieges often produced outbreaks like this, as crowded, hungry conditions took over a city.

This third dies from hunger and disease together, without ever facing an enemy soldier.

Not every death in this judgment comes by a weapon.

🤒 Pestilence means a severe disease

🏚️ Sieges often caused outbreaks like this

🍞 Famine and disease worked together

📖 Not every death came by a weapon

---

## 🗡️ A Third Part Shall Fall By The Sword Round About Thee

This matches the second third of hair, struck with a knife around the model city.

What was acted out ahead of time in a sign becomes the literal outcome here.

Round about thee points to fighting at the very edges and walls of Jerusalem.

The battle reaches the city itself, not just its outskirts.

🗡️ This matches the earlier hair sign

🧱 Fighting happens at Jerusalem's own walls

⚔️ The battle reaches the city directly

📖 The sign becomes the literal event

---

## 💨 I Will Scatter A Third Part Into All The Winds, And I Will Draw Out A Sword After Them

This is the third and final piece of the hair sign coming true.

This group scatters outward among other nations, just as the wind once carried the hair away.

Even scattered that far, a sword still follows them.

Exile alone was never going to be the end of this judgment.

💨 The last third scatters like the hair

🌍 They scatter among other nations

⚔️ A sword still follows them there

📖 Exile was not the end of judgment

# Ezekiel 5:13-15
# 😤 God's Fury Accomplished
---
## 🔥 Thus Shall Mine Anger Be Accomplished

Accomplished here means fully carried out, reaching its complete end.

This is not God celebrating an achievement.

It means anger that has built up for a long time will finally run its full course.

Nothing about this judgment stops halfway.

🔥 Accomplished means fully carried out

🚫 This is not a proud achievement

⏳ Long building anger reaches its end

📖 Judgment does not stop halfway

---

## 😤 I Will Cause My Fury To Rest Upon Them, And I Will Be Comforted

Comforted here does not mean God enjoys the suffering of his people.

Fury resting upon them means the anger finally lands and settles instead of building further.

Once that anger is spent fully, nothing is left unresolved between God and Jerusalem.

That settled ending is the only thing being called comfort here.

😤 Fury resting means anger finally lands

🚫 This does not mean cruel pleasure

⚖️ A settled ending resolves the conflict

📖 Comfort here means closure, not joy

---

## 📛 I The LORD Have Spoken It In My Zeal

Zeal means intense, protective devotion, not a quick temper.

God is not reacting out of a passing mood here.

His zeal guards his own name and holiness, treated carelessly by his own people for too long.

They shall know ties this judgment to a lesson meant to be remembered.

🔥 Zeal means intense protective devotion

📛 It defends God's own name

🚫 Not a sudden or petty mood

📖 This lesson is meant to be remembered

---

## 🏚️ I Will Make Thee Waste, And A Reproach Among The Nations

Waste means an empty ruin, a once living city left in rubble.

Reproach means public disgrace, the kind of shame other people point at and talk about.

Other nations would not simply hear a rumor of Jerusalem's fall.

They would watch it happen and remember the sight.

🏚️ Waste means an empty ruin

😳 Reproach means public disgrace

👀 Other nations would watch it happen

📖 The fall becomes a lasting memory

---

## 😳 A Reproach And A Taunt, An Instruction And An Astonishment

Four words describe how the surrounding nations would react to Jerusalem's fall.

A taunt means mocking, cruel words aimed at someone already down.

An instruction means other nations learning a lesson simply by watching.

An astonishment means pure shock at how far the fall actually went.

Reproach was already explained in the verse just before this one.

😳 Four words describe the reaction

🗣️ Taunt means mocking, cruel words

📚 Instruction means a lesson for others

📖 Nothing about this stayed quiet

---

## 🔥 In Anger And In Fury And In Furious Rebukes

Anger, fury, and furious rebukes name the same feeling three separate ways.

Stacking these words together is not careless repetition.

It makes sure no reader mistakes this for a mild or passing judgment.

The pileup of words matches the real weight of what is coming.

🔥 Three words name the same anger

📚 Stacking words is not careless repeat

⚠️ This is not a mild judgment

📖 Word pileup matches real weight

# Ezekiel 5:16-17
# 🏹 Famine, Beasts, And Sword
---
## 🏹 The Evil Arrows Of Famine

This does not describe literal arrows raining down on the city.

Famine itself is pictured here as a weapon, striking people the way an arrow strikes its target.

Calling it evil marks this famine as judgment, not simply a bad harvest.

Hunger becomes one more tool God uses to carry out this sentence.

🏹 Arrows here means famine as a weapon

🎯 Famine strikes like an arrow hits

🌾 This is judgment, not bad luck

📖 Hunger becomes a tool of judgment

---

## 🥖 Break Your Staff Of Bread

Staff of bread is an old way of describing bread as life's basic support.

A staff holds a tired traveler upright on a long walk.

Bread held up daily life in that same steady way.

Breaking that staff means removing the one thing people leaned on just to survive each day.

🥖 Staff of bread means bread as support

🚶 A staff holds a traveler upright

🍞 Bread held up daily survival

➡️ Removing it removes basic survival itself

---

## 🐺 Famine And Evil Beasts

Evil beasts points to dangerous wild animals, likely lions or wolves.

Once farmland empties out from war and famine, those animals move in closer to people.

This exact pairing, famine alongside dangerous animals, already appears as a named curse back in Leviticus.

This judgment was not a brand new idea invented on the spot.

🐺 Evil beasts means dangerous wild animals

🌾 Empty farmland draws animals closer

📜 This curse already appears in Leviticus

📖 This judgment was warned long before

---

## 🤒 Pestilence And Blood Shall Pass Through Thee

Pestilence already means severe disease, explained earlier in this same chapter.

Blood here stands for violent death moving through the city.

Both words picture something spreading from person to person, almost traveling through the streets itself.

Disease and violence together would touch nearly everyone left inside.

🤒 Pestilence means severe disease again

🩸 Blood stands for violent death

🏙️ Both spread through the whole city

📖 Few would remain fully untouched

---

## ✍️ I The LORD Have Spoken It

This exact phrase closes multiple sections throughout this chapter.

It works like a signature at the bottom of a legal document.

Repeating it again and again removes any doubt about where this warning came from.

Nothing in this chapter is left as a guess or a rumor.

✍️ This phrase works like a signature

🔁 It repeats throughout the whole chapter

🚫 No doubt is left about its source

📖 The warning is fully guaranteed
`.trim();

export const EZEKIEL_FIVE_PERSONAL_SECTIONS = parseEzekielFiveRawNotes(EZEKIEL_FIVE_RAW_NOTES);
