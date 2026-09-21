export type EcclesiastesThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEcclesiastesThreeRawNotes(rawText: string): EcclesiastesThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EcclesiastesThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ecclesiastes\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ecclesiastes 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ecclesiastes\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Ecclesiastes\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ecclesiastes 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ecclesiastes 3:${startVerse}` : `Ecclesiastes 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Ecclesiastes 3 sections, received " + sections.length);
  }

  return sections;
}

const ECCLESIASTES_THREE_RAW_NOTES = `# Ecclesiastes 3:1-4
# ⏳ A Season For Everything
---
## ⏳ To Every Thing There Is A Season

"Season" here means an appointed time, not the weather.

The Preacher says every human activity has its own proper moment.

This sets up a poem built entirely on that idea.

Fourteen pairs of opposites follow, covering nearly all of life.

⏳ Season means an appointed time
📜 Every activity has its own moment
🔁 A poem of opposites follows
📖 Fourteen pairs will cover most of life

## 👶 A Time To Be Born, And A Time To Die

Birth and death open this list because they bracket every human life.

Neither one is something a person controls or chooses for himself.

The poem starts at the two ends of life on purpose.

Everything else on the list happens somewhere in between these two.

👶 Birth opens the whole poem
⚰️ Death closes every human life
🚫 Neither moment is within our control
📖 Everything else falls between these two

## ⚔️ A Time To Kill, And A Time To Heal

This is not a command to break the sixth commandment.

The Preacher has situations like war or justice in mind.

Healing sits right beside it as the exact opposite action.

Even hard, violent seasons fit inside God's larger timing.

⚔️ Not a command to murder
🏛️ War or justice fits this picture
🩹 Healing sits right beside it
📖 Even hard seasons fit God's timing

## 🧱 A Time To Break Down, And A Time To Build Up

Breaking down here can mean tearing apart an old building or a broken plan.

Building up describes starting something new in its place.

Both actions take real skill, not carelessness.

Destruction and construction both have their own moment.

🧱 Breaking down clears an old structure
🏗️ Building up starts something new
🛠️ Both actions take real skill
📖 Destruction and construction both have their moment

## 😢 A Time To Weep, And A Time To Laugh

Weeping and laughing sit at opposite ends of human emotion.

The Preacher does not rank one feeling above the other.

Both are treated as normal, expected parts of life.

A person who never weeps has not really lived through everything life brings.

😢 Weeping and laughing are opposites
⚖️ Neither feeling ranks above the other
🙂 Both are normal parts of life
📖 A full life includes both

## 💔 A Time To Mourn, And A Time To Dance

Mourning and dancing are placed side by side on purpose.

Grief and celebration both belong somewhere in a normal life.

Ancient mourning often included loud public weeping, not quiet tears alone.

Dancing was the natural, physical expression of real joy.

💔 Mourning and dancing sit side by side
😭 Ancient mourning was loud and public
💃 Dancing expressed real joy physically
📖 Grief and joy both belong in life

# Ecclesiastes 3:5-8
# 🪨 The List Continues
---
## 🪨 A Time To Cast Away Stones, And A Time To Gather Stones Together

Clearing a field of stones made the ground ready for planting.

Gathering stones back together could mean building a wall or a house.

Many scholars believe this pairing pictures both destroying and building with the same material.

The same stones can either block a farmer or become a home.

🪨 Clearing stones prepared land for planting
🧱 Gathering stones could build a wall
🏠 The same material serves both purposes
📖 Destruction and building use the same stones

## 🤗 A Time To Embrace, And A Time To Refrain From Embracing

"Refrain" means to hold back on purpose.

Physical closeness has its own right timing.

Sometimes affection is welcome.

Other times distance is healthier.

Even something as simple as a hug fits inside God's order.

🤗 Refrain means to hold back
❤️ Closeness has its own timing
🚫 Sometimes distance is healthier
📖 Even affection fits God's order

## 🎁 A Time To Keep, And A Time To Cast Away

Keeping something means holding onto it because it still has value.

Casting it away means letting it go once it no longer serves a purpose.

Knowing when to release something takes real wisdom.

Holding on too long can be just as harmful as giving up too soon.

🎁 Keeping means holding onto value
🗑️ Casting away means letting go
🧠 Knowing when to release takes wisdom
📖 Holding too long can also harm

## ✂️ A Time To Rend, And A Time To Sew

"Rend" means to tear something on purpose, usually a garment.

Tearing your clothes was a common way to show grief in the Bible.

Sewing repairs what tearing once broke apart.

Grief has its own season.

Repair has its own season too.

✂️ Rend means to tear on purpose
😭 Torn clothes showed grief or shock
🧵 Sewing repairs what was torn
📖 Grief and repair each have a season

## 🤐 A Time To Keep Silence, And A Time To Speak

"Keep silence" means to hold your words back on purpose.

There are moments when saying nothing is the wiser choice.

There are other moments when staying quiet becomes its own kind of wrong.

Knowing which moment you are in takes discernment, not just courage.

🤐 Keep silence means holding words back
🤫 Sometimes silence is the wiser choice
📢 Sometimes staying quiet becomes wrong
📖 Knowing the difference takes real discernment

## 🕊️ A Time Of War, And A Time Of Peace

The list ends with the two biggest opposites of all, war and peace.

Fighting and peace both take their turn somewhere in human history.

This final pair matches the very first pair, birth and death.

Even the biggest events in the world follow God's timing.

⚔️ War and peace are the biggest opposites
📜 Both take their turn in history
🔁 This pair echoes birth and death
📖 Even the biggest events follow God's timing

# Ecclesiastes 3:9-11
# 🤔 A Question And An Answer
---
## ❓ What Profit Hath He That Worketh

This is the same core question that opened the whole book.

The Preacher just spent eight verses proving that every moment has its own time.

Now he circles back to ask if any of it truly pays off.

The question refuses to go away no matter how the poem answers it.

❓ Same core question from chapter one
🔁 Comes right after the time poem
💰 Does any of it truly pay off
📖 The question will not go away

## 😩 I Have Seen The Travail Which God Hath Given

"Travail" means hard, often painful labor.

The Preacher says God himself assigned this labor to every person.

Work is not an accident or a punishment invented by people.

It comes from God as part of being human.

😩 Travail means hard, painful labor
🎁 God assigned this labor himself
🚫 Not an accident or invented punishment
📖 Work comes from God, not chance

## 🌸 He Hath Made Every Thing Beautiful In His Time

Nothing here is called beautiful by accident.

God fits every event into a time that makes sense inside his plan.

A funeral and a wedding can both be beautiful in their own proper moment.

Beauty depends on timing as much as it depends on the thing itself.

🌸 Nothing is beautiful by accident
🧩 God fits events into his plan
⏰ Beauty depends on proper timing
📖 Timing matters as much as the thing itself

## ♾️ Also He Hath Set The World In Their Heart

The Hebrew word behind "the world" can also mean eternity.

Many scholars believe God placed an awareness of eternity inside every human heart.

That explains why people often sense there is more to life than they can see.

Yet the same verse says no one can fully grasp God's whole plan.

♾️ The Hebrew word can also mean eternity
🫀 God placed eternity inside human hearts
👀 People sense there is more to life
📖 No one grasps God's whole plan

## 🔍 No Man Can Find Out The Work That God Maketh

Human wisdom hits a hard limit right here.

People can sense that time and eternity are connected.

They still cannot see the whole picture the way God sees it.

The chapter keeps this honest instead of pretending to explain everything.

🔍 Human wisdom hits a real limit
👀 People sense the connection to eternity
🧩 The whole picture stays hidden
📖 The chapter stays honest about the limit

# Ecclesiastes 3:12-13
# 🍽️ Eat, Drink, And Enjoy
---
## 🚫 I Know That There Is No Good In Them

"Them" refers back to all the labor and striving just described.

None of that striving, by itself, delivers lasting good to a person.

The Preacher is not condemning work itself here.

He is pointing out that work alone cannot be the whole answer.

🚫 Them means the labor just described
⚖️ Striving alone brings no lasting good
🙅 Not a condemnation of work itself
📖 Work alone cannot be the whole answer

## 😊 For A Man To Rejoice, And To Do Good In His Life

The only real good the Preacher finds so far is simple.

A person can choose to be glad and to live rightly.

That is a small answer compared to the size of the question asked.

It is still a real, workable answer, not nothing.

😊 The answer found so far is simple
🙂 Choosing gladness and right living
📏 A small answer to a big question
📖 Still a real, workable answer

## 🍽️ Every Man Should Eat And Drink, And Enjoy The Good Of All His Labour

This repeats almost the exact same conclusion from the end of chapter two.

Ordinary meals and honest work show up again as real, lasting goods.

The Preacher is not offering something new here on purpose.

He wants the reader to notice how often this answer keeps returning.

🍽️ Repeats the ending of chapter two
🥂 Ordinary meals count as real goods
🔁 The same answer keeps returning
📖 That repetition is the point

## 🎁 It Is The Gift Of God

Enjoying food and work is not something a person earns.

The Preacher calls it a gift, something handed over freely.

That means even simple pleasures come from outside ourselves.

Gratitude fits this moment better than pride ever could.

🎁 Enjoyment is not something earned
🤲 A gift is handed over freely
🌍 Simple pleasures come from outside us
📖 Gratitude fits better than pride

# Ecclesiastes 3:14-15
# ♾️ What God Does Lasts
---
## ♾️ Whatsoever God Doeth, It Shall Be For Ever

Human projects rise and fall.

This verse describes something different.

Anything God actually does stays exactly as he intended.

Nothing wears out the way human achievements do.

That is a sharp contrast to everything Solomon tried in chapter two.

♾️ God's work never fades
🏗️ Unlike human projects that rise and fall
🎯 It stays exactly as intended
📖 A sharp contrast to chapter two

## ⚖️ Nothing Can Be Put To It, Nor Any Thing Taken From It

God's work needs no additions and allows no subtractions.

A person cannot improve on it or shrink it down.

This is very different from every human plan in the book so far.

Every human project in Ecclesiastes eventually gets undone by someone else.

⚖️ No additions, no subtractions allowed
🚫 A person cannot improve or shrink it
🔁 Different from every human plan so far
📖 Human projects eventually get undone

## 🙏 That Men Should Fear Before Him

"Fear" here does not mean cowering in terror.

It means deep reverence and honest respect for who God is.

God's permanence is designed to produce this kind of awe in people.

Something unchangeable deserves a very different response than something temporary.

🙏 Fear means reverence, not terror
👑 Respect fits who God is
♾️ His permanence produces real awe
📖 Unchangeable things deserve a different response

## 🔄 God Requireth That Which Is Past

"Requireth" means to seek out or call back.

God is described here as the one who calls the past to account.

Nothing that already happened simply disappears from his view.

Time moves forward for people.

God holds all of it at once.

🔄 Requireth means to seek out
👁️ God calls the past to account
🚫 Nothing disappears from his view
📖 God holds all of time at once

# Ecclesiastes 3:16-19
# ⚖️ Wickedness In The Place Of Judgment
---
## ⚖️ The Place Of Judgment, That Wickedness Was There

Courts were supposed to be where justice actually happened.

The Preacher looks at real courts and finds corruption sitting there instead.

This is an honest, uncomfortable observation, not a theory.

Systems built for fairness can still fail the people who need them.

⚖️ Courts should deliver real justice
👀 The Preacher finds corruption there instead
😔 An honest, uncomfortable observation
📖 Fair systems can still fail people

## 👑 God Shall Judge The Righteous And The Wicked

Human courts fail.

The Preacher does not stop there.

He points past broken human systems to a higher, certain judgment.

God will eventually sort out what unfair courts got wrong.

This belief steadies him as he names the injustice plainly.

👑 Human courts fail
⚖️ God's judgment comes after
✅ God sorts out what courts got wrong
📖 This steadies him amid real injustice

## 🐴 That They Themselves Are Beasts

This is a hard test God allows people to go through.

Watching how people act under pressure reveals what they really are.

The word "beasts" here means creatures bound by mortality just like animals.

It is a humbling reminder, not an insult aimed at any one person.

🐴 Beasts means bound by mortality
🪞 Testing reveals what people really are
😳 A humbling reminder, not an insult
📖 No one person is singled out here

## 💀 That Which Befalleth The Sons Of Men Befalleth Beasts

"Befalleth" is an old word for happens to.

The exact same fate meets both people and animals in the end.

Both die.

Both return to dust in the same way.

This is a hard truth.

The Preacher refuses to soften it.

💀 Befalleth means happens to
⚰️ The same fate meets people and animals
🪦 Both die and return to dust
📖 The Preacher refuses to soften this truth

# Ecclesiastes 3:20-22
# 💀 Dust To Dust
---
## 🌍 All Go Unto One Place, All Are Of The Dust

This echoes the exact language God used in Genesis about Adam.

Every human body came from the ground and returns to the ground.

Wealth, wisdom, and status make no difference to this final fact.

Every single person shares this same ending place.

🌍 Echoes Genesis and Adam's creation
🌱 Every body came from the ground
👑 Wealth and wisdom make no difference
📖 Every person shares this same ending

## ⬆️ The Spirit Of Man That Goeth Upward

The Preacher asks who really knows this for certain.

He is not denying that people have a spirit that outlasts the body.

He is honestly admitting the limits of what can be proven by observation alone.

This kind of honesty runs through the whole book.

⬆️ He asks who really knows this
🤷 Not denying the spirit exists
🔍 Admitting the limits of what can be proven
📖 Honesty runs through the whole book

## 😊 Nothing Better Than That A Man Should Rejoice In His Own Works

The chapter lands on the same practical answer as before.

Finding real joy in your own work is the best available option.

This is not settling for less than a bigger meaning.

It is the one solid, provable good the Preacher can point to.

😊 The same practical answer returns
🔨 Joy in your own work is best
🎯 Not settling for a lesser answer
📖 One solid, provable good to point to

## 🔮 Who Shall Bring Him To See What Shall Be After Him

No one can show a person exactly what happens after they die.

That uncertainty is part of why the present moment matters so much.

The chapter closes by pointing the reader back to today, not tomorrow.

What happens later stays in God's hands, not ours.

🔮 No one can show what comes after
⏳ That uncertainty makes today matter more
👀 The chapter points back to the present
📖 The future stays in God's hands
`.trim();

export const ECCLESIASTES_THREE_PERSONAL_SECTIONS = parseEcclesiastesThreeRawNotes(ECCLESIASTES_THREE_RAW_NOTES);
