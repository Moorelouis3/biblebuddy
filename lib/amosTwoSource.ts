export type AmosTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseAmosTwoRawNotes(rawText: string): AmosTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: AmosTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Amos\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Amos 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Amos\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Amos\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Amos 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Amos 2:${startVerse}` : `Amos 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Amos 2 sections, received " + sections.length);
  }

  return sections;
}

const AMOS_TWO_RAW_NOTES = `# Amos 2:1-3
# 🔥 For Three Transgressions Of Moab, And For Four
---
## 🔥 For Three Transgressions Of Moab, And For Four

This phrase is a counting formula, not an exact number of sins.

Hebrew poetry often names one number, then raises it by one.

The pattern means the list of offenses is full, not literally three or four.

Moab is about to be judged for something done long after a battle ended.

The victim was not even alive to defend himself.

God's justice reaches a crime committed against someone already dead.

🔢 Three and four means a full count

📈 The pattern signals years of buildup

💀 The victim here was already dead

📖 God judges crimes against the dead too

## 🪦 Burned The Bones Of The King Of Edom Into Lime

Burning a dead king's bones was not an ordinary act of war.

Lime was made by burning bones or limestone at an extremely high heat.

Turning a rival king's bones into lime erased any trace of his body.

Ancient peoples believed a proper burial mattered for the dead and their families.

Moab denied Edom's king even that basic dignity.

This was cruelty aimed at a man who could no longer feel it.

🪦 Burning bones destroyed a proper burial

🔥 Lime making required extreme heat

👑 The victim was a rival king

📖 Moab dishonored a man already dead

## 🏛️ Devour The Palaces Of Kirioth

Kirioth was one of Moab's major fortified cities.

A palace there was more than just a home.

It stood as a symbol of royal power and wealth.

Fire sent against palaces targeted the seat of Moab's own strength.

The judgment was not scattered across the countryside at random.

It struck exactly where Moab's rulers felt safest.

No stronghold protects a nation once God decides to act.

🏛️ Kirioth was a major Moabite city

👑 Palaces symbolized royal power and wealth

🎯 Fire struck the seat of strength

📖 No stronghold protects against God's judgment

## 📯 Moab Shall Die With Tumult, With Shouting, And With The Sound Of The Trumpet

Tumult means loud chaos and confusion, not a quiet ending.

A trumpet in ancient warfare sounded the alarm for battle or retreat.

Moab's death is pictured as a noisy military collapse, not a peaceful fall.

Shouting fills the scene along with the trumpet blast.

This is the sound of a losing army breaking apart.

God's judgment often matches the violence a nation chose to live by.

📯 A trumpet signaled alarm in battle

😱 Tumult means loud chaos and confusion

⚔️ Moab falls in noisy military collapse

📖 Judgment matches the violence Moab chose

## ⚖️ Cut Off The Judge From The Midst Thereof

A judge here means the ruler who led and governed the nation.

Cutting him off meant removing Moab's leadership entirely.

Thereof simply points back to Moab, the nation just named.

A nation without a ruler cannot organize a defense or a future.

God is not just punishing people.

He is ending Moab's ability to rule itself.

⚖️ Judge meant Moab's ruling leader

✂️ His removal ended Moab's leadership

🗺️ Thereof simply means Moab itself

📖 Judgment reaches the very top

## 🗡️ Slay All The Princes Thereof With Him

Princes here were Moab's nobles, the ruling class beneath the king.

This judgment does not stop with one man at the top.

Every noble who shared in that power falls at the very same time.

Moab's entire ruling structure collapses together, not one office at a time.

No noble escapes by standing behind someone else's title.

When a nation's leadership is built on cruelty, the whole structure falls.

🗡️ Princes were Moab's ruling nobles

🏛️ The judgment reaches more than one man

💥 Moab's whole leadership falls together

📖 A cruel structure falls as one

# Amos 2:4-5
# 📜 For Three Transgressions Of Judah, And For Four
---
## 📜 For Three Transgressions Of Judah, And For Four

Judah is not a foreign nation like the ones named before it.

Judah carried God's own written law and knew exactly what it required.

The same counting formula returns, a full and overflowing measure of guilt.

This time the LORD is judging His own covenant people.

Knowing the law does not excuse breaking it.

Knowledge of the law makes the breaking worse.

📜 Judah is God's own covenant nation

⚖️ The same full measure of guilt applies

🧠 Knowing the law makes guilt heavier

➡️ God judges His own people too

## 🚫 Despised The Law Of The LORD

Despised means treated with contempt.

It is not the same as simply forgetting by accident.

Judah looked at what God commanded and chose to reject it.

This was a decision.

It was not a simple lapse in memory.

Contempt for God's law always comes before contempt for His commandments.

🚫 Despised means treated with contempt

🎯 Judah rejected the law on purpose

🧭 This was a decision, not an accident

📖 Contempt for the law precedes other sin

## 📉 Their Lies Caused Them To Err, After The Which Their Fathers Have Walked

Lies here does not mean ordinary dishonesty.

The word points to false gods and the empty promises they offered.

Judah's ancestors worshiped those same false gods generations earlier.

Each generation walked the same path instead of turning away from it.

A family habit of idolatry became an inherited pattern.

Judah inherited a lie and then lived inside it.

📉 Lies here means false gods

🙏 Ancestors worshiped those same false gods

🔁 Each generation repeated the same pattern

📖 Judah inherited and then lived a lie

## 🏛️ Devour The Palaces Of Jerusalem

Jerusalem was not just any city.

It was the home of God's own temple.

Fire against its palaces meant judgment reaching the capital itself.

No city is shielded simply because it carries God's name.

The same fire that struck pagan cities now reaches Judah's own seat of power.

Holiness of place never substitutes for holiness of life.

🏛️ Jerusalem held God's own temple

🔥 Fire reached the capital itself

🚫 No city is shielded by its name

📖 Holy ground never excuses an unholy life

# Amos 2:6-8
# ⚖️ For Three Transgressions Of Israel, And For Four
---
## ⚖️ For Three Transgressions Of Israel, And For Four

Israel receives the same formula already used against six other nations.

This time the list of crimes is far longer than any before it.

Israel was the LORD's own chosen people, not a stranger to His ways.

The nation that received the most from God is charged with the most.

A greater calling always carries a greater accountability.

⚖️ Israel gets the same full formula

📏 Israel's list of crimes is the longest

👑 Israel was God's own chosen people

📖 Greater calling brings greater accountability

## 💰 Sold The Righteous For Silver, And The Poor For A Pair Of Shoes

This does not describe open slave trading like the nations judged before it.

Judges in Israel were taking bribes to rule against innocent people.

Silver was the price for a false ruling.

A pair of shoes shows how small that price could be.

Justice itself was for sale to anyone willing to pay.

The poor lost their case before they ever walked into court.

💰 Judges took bribes against the innocent

👟 A pair of shoes shows the tiny price

⚖️ Justice itself was for sale

📖 The poor lost before they arrived

## 👣 Pant After The Dust Of The Earth On The Head Of The Poor

This is a violent picture, not a gentle one.

Panting after dust describes eager, predatory trampling.

The poor are pictured as ground underfoot, not as people.

Those with power treated the weakest like something to be crushed.

God sees exactly how the powerless are treated by the powerful.

👣 Panting pictures eager, predatory trampling

💔 The poor were treated as dirt underfoot

⚖️ Power was used to crush the weak

📖 God sees how the powerless are treated

## 🚷 Turn Aside The Way Of The Meek

Meek here means those without power to defend themselves in court.

Turning aside their way means blocking them from receiving justice.

A case could be redirected or buried before it was ever heard at all.

The legal system that should have protected the weak was used against them instead.

Justice denied to the meek is justice denied to the people God watches closest.

🚷 Meek means the powerless in court

🧭 Their cases were turned aside on purpose

⚖️ The system protected the powerful instead

📖 God watches how the powerless are judged

## 🛏️ A Man And His Father Will Go In Unto The Same Maid

This describes a father and son both having relations with the same woman.

Many scholars believe this maid served at a pagan shrine.

Such practices were tied to fertility worship in Canaanite religion.

Basic decency and the law both forbid this kind of relationship.

Father and son shared in the same sin instead of guarding each other from it.

🛏️ Father and son shared the same woman

🏛️ Many scholars tie this to pagan worship

🚫 The law forbade this relationship

📖 A family failed to guard each other

## 😤 To Profane My Holy Name

To profane means to treat something sacred as if it were common.

God's name was tied to everything Israel did in His name, including worship.

Using His name while living like the pagans around them was a direct insult.

Worship without obedience does not honor God.

It mocks Him instead.

😤 Profane means treating the sacred as common

🙏 God's name was tied to Israel's worship

🚫 Worship without obedience is not honor

📖 Hollow worship mocks the God it claims

## 🧥 Clothes Laid To Pledge By Every Altar

A pledge was a poor man's garment taken as security for a debt.

The law required that garment be returned to him before nightfall.

Israel kept those garments instead and used them for comfort at pagan altars.

The very cloth meant to protect a poor man at night became a cushion for idol worship.

Mercy meant for the poor was stolen to serve false gods.

🧥 A pledge was a poor man's coat

🌙 The law required its return by night

⛔ Israel kept it to serve idols

📖 Mercy for the poor funded false worship

## 🍷 Drink The Wine Of The Condemned In The House Of Their God

This wine came from fines taken off people judges had condemned.

Instead of returning it, Israel drank it during idol worship.

The very wrongs committed against the poor paid for a party in a false god's house.

Injustice and idolatry were no longer two separate sins.

Here they fed each other in the very same room.

🍷 Wine came from fines on the condemned

🎉 Israel used it to feast on idols

🔗 Injustice and idolatry fed each other

📖 Two sins met in one room

# Amos 2:9-12
# 🌲 Destroyed I The Amorite Before Them
---
## 🌲 Destroyed I The Amorite Before Them

The LORD now shifts from listing crimes to recalling His own kindness.

The Amorites were the powerful people already living in the land before Israel arrived.

God cleared that enemy out of the way Himself.

Israel did not win that land by its own strength.

Every blessing Israel now has started with something God did first.

🌲 The LORD shifts from charges to kindness

👑 The Amorites held the land first

💪 God cleared the way Himself

📖 Every blessing started with God's action

## 🌳 Whose Height Was Like The Height Of The Cedars, And He Was Strong As The Oaks

Cedars from Lebanon were famous as the tallest, strongest trees anyone knew.

Comparing the Amorites to cedars and oaks pictures an enemy of enormous size and strength.

This was not a small or ordinary rival to defeat.

Israel could never have beaten a force this size on its own.

God's victory over the Amorites makes Israel's debt to Him even larger.

🌳 Cedars were the tallest known trees

💪 The Amorites were pictured as enormous

⚔️ This enemy was far from ordinary

📖 Israel owed this victory entirely to God

## 🍂 Destroyed His Fruit From Above, And His Roots From Beneath

This verse keeps the tree picture going from the line before it.

Fruit from above and roots from beneath cover the whole tree, top to bottom.

Nothing was left standing, not the visible part and not the hidden part.

A destroyed root means no future growth, not just a bad season.

God did not just weaken the Amorites.

He erased their future entirely.

🍂 Fruit and roots cover the whole tree

🚫 Nothing visible or hidden was left

🌱 A destroyed root ends future growth

📖 God erased the Amorites' whole future

## 🗺️ Brought You Up From The Land Of Egypt

This line returns to the one event that defines Israel's whole identity.

The exodus from Egypt was not a distant legend to the first readers.

It was the reason Israel existed as a free nation at all.

God is reminding Israel exactly who rescued them in the first place.

Every law and every judgment in this book rests on that one rescue.

🗺️ The exodus defined Israel's identity

⛓️ Egypt was slavery before this rescue

🙌 God rescued Israel from nothing

📖 This book rests on that one rescue

## 🏜️ Led You Forty Years Through The Wilderness

Forty years was long enough to be an entire generation's lifetime.

God did not rescue Israel and then abandon them in the desert.

He led them through that whole span, year after year.

The goal of all that time was a promised land waiting on the other side.

Patience and provision marked every one of those forty years.

🏜️ Forty years spanned a full generation

🧭 God led them the entire time

🎯 The destination was the promised land

📖 Patience marked every one of those years

## 🙏 Raised Up Of Your Sons For Prophets, And Of Your Young Men For Nazarites

A prophet carried God's own words directly to the people.

A Nazarite took a special vow to be set apart for God.

That vow meant no wine, no cutting the hair, and strict separation from certain things.

Both roles came from God as a gift raised up within Israel itself.

Israel was never left without someone calling the nation back to God.

🙏 Prophets carried God's own words

🕊️ Nazarites took a vow of separation

🎁 Both roles were gifts from God

📖 Israel was never left without a voice

## 🍷 Gave The Nazarites Wine To Drink

This was not someone accidentally offering a drink to a stranger.

Israel knew exactly what a Nazarite's vow required.

Giving that wine was a direct push to break a promise made to God.

Instead of protecting the vow, Israel helped destroy it.

A gift God raised up was corrupted by the very people who received it.

🍷 Wine broke a Nazarite's sacred vow

🎯 Israel knew exactly what it was doing

💔 A vow to God was pushed aside

📖 Israel corrupted a gift God gave

## 🤐 Commanded The Prophets, Saying, Prophesy Not

Israel did not simply ignore the prophets God sent.

They gave a direct order for the prophets to stop speaking altogether.

Silencing a messenger is different from merely disagreeing with him.

Israel tried to shut down the warning instead of listening to it.

Refusing to hear a warning never stops the thing it warns about.

🤐 Israel ordered the prophets to stop

🚫 This was silencing, not disagreement

📢 They shut down the warning itself

📖 Ignoring a warning does not stop it

# Amos 2:13-16
# 🛒 I Am Pressed Under You, As A Cart Is Pressed That Is Full Of Sheaves
---
## 🛒 I Am Pressed Under You, As A Cart Is Pressed That Is Full Of Sheaves

Picture a wagon piled so high with grain that its wheels start to buckle.

Sheaves were bundled stalks of grain loaded onto a cart after harvest.

God pictures Himself as that overloaded cart, weighed down by Israel's sin.

This is not God losing patience in a single moment.

It is the picture of a breaking point finally reached after years of weight.

🛒 A cart overloaded with grain buckles

🌾 Sheaves were bundled stalks after harvest

⚖️ God pictures sin as crushing weight

📖 Years of sin reached a breaking point

## 🏃 The Flight Shall Perish From The Swift

The swift here means the fastest runners in Israel's army.

Normally speed is exactly what saves a soldier in defeat.

This judgment removes even that last option.

Running will no longer be a way out.

When the fastest cannot escape, no one is counting on their own ability to survive.

🏃 The swift were the fastest runners

🚫 Speed will no longer save anyone

🏳️ Running stops being an option

📖 No ability of their own will save them

## 💪 The Strong Shall Not Strengthen His Force

Strength here means raw military power and numbers.

Normally a strong army can simply push through a weaker enemy.

That advantage disappears completely in this judgment.

Being powerful offers no better outcome than being weak.

God is removing every normal reason for confidence at once.

💪 Strength here means military power

🛡️ Strong armies usually push through enemies

🚫 That advantage disappears completely here

📖 Every reason for confidence is removed

## 🏹 He That Handleth The Bow

Handling the bow describes a trained archer, a skilled soldier in battle.

An archer's whole value was hitting a target from a safe distance.

This judgment reaches a soldier even when he never gets close to danger.

Skill with a weapon does not guarantee safety from God.

No trained hand escapes what untrained hands could not escape either.

🏹 A bow belonged to a trained soldier

🎯 Skill usually meant safety at a distance

🚫 Skill alone cannot guarantee safety here

📖 Trained hands fail just like untrained ones

## 👣 He That Is Swift Of Foot Shall Not Deliver Himself

This is the second time speed is named in just a few lines.

Repeating the same point is a Hebrew way of hammering it home.

No reader could miss that running will not work this time.

The repetition itself is part of the message.

Total judgment leaves no quiet exit for anyone trying to slip away.

👣 Speed is mentioned a second time

🔁 Repetition hammers the point home

🚪 No quiet exit is left open

📖 Total judgment leaves no one slipping away

## 🐴 He That Rideth The Horse Deliver Himself

A horse was the fastest and most powerful way to travel in this era.

Riding one usually meant outrunning almost any threat on foot.

Even that advantage fails completely in this judgment.

The best transportation available offers no escape at all.

Every tool anyone trusted for survival is taken off the table at once.

🐴 A horse was the fastest transport known

🏃 Riding usually outran threats on foot

🚫 Even that advantage fails here

📖 Every trusted tool for survival is gone

## 😨 He That Is Courageous Among The Mighty Shall Flee Away Naked In That Day

Naked here means stripped down, having thrown off armor and weapons to run faster.

Even the bravest warrior among Israel's mightiest men is pictured fleeing in panic.

Courage and strength offered no shelter once this judgment arrived.

The soldier everyone once counted on becomes the clearest picture of defeat.

That day closes the whole chapter the way it began.

The LORD's word stands unanswered from Damascus to Israel itself.

😨 Naked means stripped down while fleeing

🛡️ Even the bravest warrior panics here

🏆 Courage offered no shelter at all

📖 The LORD's word stands unanswered for all
`.trim();

export const AMOS_TWO_PERSONAL_SECTIONS = parseAmosTwoRawNotes(AMOS_TWO_RAW_NOTES);
