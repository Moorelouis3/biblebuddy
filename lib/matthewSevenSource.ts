export type MatthewSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewSevenRawNotes(rawText: string): MatthewSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 7:${startVerse}` : `Matthew 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Matthew 7 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_SEVEN_RAW_NOTES = `# Matthew 7:1-5
# 🪵 Judging By The Beam And The Mote
---
## ⚖️ Judge Not, That Ye Be Not Judged

This does not mean a person can never tell right from wrong.

Jesus is warning against a harsh, condemning spirit toward others.

The judgment in view here is the kind that tears someone down.

A right concern about sin can exist without that kind of judging.

⚖️ Not a ban on knowing right from wrong

💔 Jesus warns against a condemning spirit

🙅 This targets condemning, not simple discernment

📖 Concern for sin can still stay humble

---

## 🔄 With What Judgment Ye Judge, Ye Shall Be Judged

Judging others sets a standard that comes back to you.

The harshness you use toward someone else tends to return to you later.

This is not mainly about a future courtroom scene.

It describes a pattern that plays out in daily relationships now.

🔄 Your judging standard comes back to you

🪞 Harshness given tends to return later

🤝 This plays out in daily relationships

📖 Harsh judges often get judged harshly

---

## 📏 With What Measure Ye Mete, It Shall Be Measured To You Again

"Mete" means to measure something out, like grain or flour.

This verse pictures judgment as something poured out by the cupful.

Whatever size cup you use on someone else gets used on you.

A generous measure given to others tends to come back generous too.

📏 Mete means to measure something out

🥣 Judgment is pictured like grain poured out

🔁 The same size cup returns to you

📖 Generosity given tends to come back generous

---

## 🪨 The Mote That Is In Thy Brother's Eye

A "mote" is a tiny speck, like a bit of dust or chaff.

Jesus pictures a small, almost harmless fault in someone else's life.

It is real, but it is small next to what comes next.

The picture sets up a sharp contrast still to come.

🪨 Mote means a tiny speck or chaff

👁️ It pictures a small fault in someone else

⚖️ It sets up a coming contrast

📖 A small fault is still being named

---

## 🪵 The Beam That Is In Thine Own Eye

A "beam" is a large wooden plank, the kind used to build a roof.

Jesus exaggerates on purpose to make the image impossible to miss.

No one could literally have a roof plank stuck in their eye.

The absurd size makes the self blindness obvious to everyone listening.

🪵 Beam means a large wooden plank

🎭 Jesus exaggerates the image on purpose

😳 A plank could never literally fit

📖 The absurd size exposes self blindness

---

## 🙋 Let Me Pull Out The Mote Out Of Thine Eye

This is an offer to fix someone else's small, visible fault.

It sounds helpful and even sounds humble on the surface.

Jesus is about to expose what is actually wrong with the offer.

The person making it cannot see past the beam in their own eye.

🙋 This offers to fix someone else's fault

😇 It sounds humble on the surface

🚧 Jesus is about to expose the problem

📖 A hidden beam blocks clear sight

---

## 🎭 Thou Hypocrite

A "hypocrite" was originally an actor who played a part on a stage.

Jesus uses that word to name exactly what is happening here.

The person correcting a small fault is performing concern, not real care.

Their own much larger problem is still sitting unaddressed.

🎭 Hypocrite originally meant a stage actor

🎪 The correction here is a performance

💔 Real concern is missing underneath it

📖 Their own larger problem stays unaddressed

---

## 🔁 First Cast Out The Beam Out Of Thine Own Eye

Jesus gives the actual fix, not just the diagnosis.

Self examination has to come before correcting anyone else.

The order matters as much as the correction itself.

Skipping this order is exactly what makes the hypocrisy work.

🔁 Self examination comes before correcting others

🥇 Order matters as much as content

🚫 Skipping the order creates the hypocrisy

📖 Fix yourself first, then help others

---

## 👓 Then Shalt Thou See Clearly

Clear sight is the reward for doing the harder work first.

Jesus never says to stop caring about a brother's fault.

He says to deal with your own eye so you can truly help.

The goal was always genuine help, not permanent silence.

👓 Clear sight follows the harder work

❤️ Jesus does not forbid caring about faults

🤝 The goal is to truly help

📖 Genuine help needs honest self sight

# Matthew 7:6
# 🐷 Holy Things And Pearls
---
## 🐕 Give Not That Which Is Holy Unto The Dogs

"Holy" means sacred, something set apart only for God.

In this culture, dogs were not pets, mostly wild scavengers in the street.

Giving something sacred to an animal that cannot value it wastes the gift.

Judging is warned against here, but discernment is never forbidden.

🐕 Dogs here were wild street scavengers

✨ Holy means sacred, set apart for God

🗑️ A sacred gift can be wasted

📖 Discernment still matters after judging

---

## 🐷 Neither Cast Ye Your Pearls Before Swine

"Swine" means pigs, considered unclean animals under Jewish law.

Pearls were extremely valuable, among the most prized items in this world.

A pig cannot tell a pearl from an ordinary piece of gravel.

Offering something precious to someone who will not value it invites trouble.

🐷 Swine means pigs, unclean under Jewish law

💎 Pearls were among the most valuable items

🪨 A pig cannot tell a pearl from gravel

📖 Precious things need the right place

---

## ⚠️ Lest They Trample Them Under Their Feet, And Turn Again And Rend You

This pictures the pigs crushing the pearls into the mud underfoot.

"Rend" means to tear or attack violently.

The animals do not just waste the gift, they turn on the giver.

Sacred things offered to the wrong audience can bring real harm back.

⚠️ Trample pictures pearls crushed into mud

🩹 Rend means to tear or attack

🔄 The animals turn on the giver too

📖 Wrong audiences can turn a gift into harm

# Matthew 7:7-11
# 🚪 Ask, Seek, Knock
---
## 🙏 Ask, And It Shall Be Given You

This is the first of three parallel commands in a row.

Asking pictures a direct, simple request made to God.

Jesus states a plain promise attached to that simple request.

The promise assumes an ongoing, continual asking, not one single try.

🙏 This is the first of three commands

💬 Asking pictures a simple, direct request

🎁 A plain promise is attached to it

📖 The asking is meant to continue

---

## 🔍 Seek, And Ye Shall Find

"Seek" pictures active searching, not passive waiting around.

This moves one step further than simply asking once.

Seeking takes effort, attention, and time spent looking.

God promises that this kind of searching leads somewhere real.

🔍 Seek means active searching, not waiting

👣 This goes further than one simple ask

⏳ Seeking takes real time and effort

📖 Real searching leads somewhere real

---

## 🚪 Knock, And It Shall Be Opened Unto You

Knocking pictures standing at a closed door, asking to be let in.

This is the boldest picture of the three, a repeated action.

A closed door is not the end of the request in this picture.

Jesus promises persistence like this will be answered.

🚪 Knocking pictures standing at a closed door

🔁 This is the boldest of the three pictures

🔓 A closed door is not the final answer

📖 Doors open for those who keep knocking

---

## ✅ For Every One That Asketh Receiveth

Jesus now restates the same three promises from the verse before.

Repeating a promise three times in two verses signals real emphasis.

This is not a magic formula that forces an automatic result.

It is a confident statement about God's character toward those who come to him.

✅ Jesus restates the same three promises

🔁 Repetition here signals strong emphasis

🚫 This is not a magic formula

📖 It states confidence in God's character

---

## 🍞 Ask Him For Bread, Will He Give Him A Stone

Bread was the basic daily food in this culture, round and flat.

A stone was worthless and even similar in shape to a loaf.

Jesus uses an everyday father and son to make his point land.

No decent father would trick a hungry child with something useless.

🍞 Bread was the basic daily food

🪨 A stone looked similar but was worthless

👨‍👦 Jesus uses an everyday father and son

📖 No decent father tricks a hungry child

---

## 🐟 If He Ask A Fish, Will He Give Him A Serpent

Fish was common food near the Sea of Galilee, where Jesus often taught.

Certain local eels or serpents could resemble a fish at a glance.

The comparison repeats the same point with a second everyday example.

A good father gives what is actually needed, not something dangerous.

🐟 Fish was common food near Galilee

🐍 A serpent could resemble a fish nearby

🔁 This repeats the point a second time

📖 Good fathers give what is needed

---

## 👤 If Ye Then, Being Evil

"Evil" here does not mean monstrous or extremely wicked.

It simply means flawed and imperfect, the normal state of every person.

Jesus starts from a modest, honest view of human parents.

Even flawed people usually know how to care for their own children.

👤 Evil here just means flawed, imperfect

🙋 This describes ordinary human parents

❤️ Even flawed people care for their children

📖 The argument starts from something small

---

## 👨‍👧‍👦 How Much More Shall Your Father Which Is In Heaven

This is the argument's turning point, moving from small to large.

If flawed people can give good gifts, God can give far better ones.

"How much more" is a common pattern in Jewish teaching of this time.

It argues from something lesser to something far greater.

👨‍👧‍👦 This moves from small to large

⬆️ Flawed people give good, God gives better

📜 How much more was a common teaching pattern

📖 The argument moves from lesser to greater

---

## 🎁 Give Good Things To Them That Ask Him

This closes the whole section with one confident promise.

God is not stingy, reluctant, or hard to reach.

The things promised are called good, not simply anything requested.

Prayer here is pictured as approaching a generous, willing Father.

🎁 This closes the section with one promise

🙅 God is not stingy or reluctant

✨ The promise is for good things

📖 Prayer approaches a generous, willing Father

# Matthew 7:12
# ⚖️ The Golden Rule
---
## 🔗 Therefore

This small word ties verse twelve directly back to everything just said.

The whole argument about a generous Father now turns into instruction.

If God gives good things freely, his people should treat others that way too.

This single word carries the weight of the whole connection.

🔗 Therefore ties back to the whole argument

🎁 God's generosity now becomes an instruction

🤝 Treat others the way God treats you

📖 One small word carries a large connection

---

## ⚖️ All Things Whatsoever Ye Would That Men Should Do To You, Do Ye Even So To Them

This line is often called the Golden Rule in later tradition.

It asks a person to imagine how they want to be treated first.

Then it asks them to act that way toward others, before being asked.

Other ancient teachers stated a similar rule only in the negative form.

Jesus states it as a positive command to act first, not only to avoid harm.

⚖️ This is later called the Golden Rule

🔄 Imagine how you want to be treated

🎯 Then act that way toward others first

📖 This command is positive, not only a limit

---

## 📜 This Is The Law And The Prophets

"The law and the prophets" was a common way to mean the entire Old Testament.

Jesus claims this one simple rule summarizes that whole body of teaching.

He is not replacing the law, he is naming its real center.

Loving others well was always the point underneath all the detailed commands.

📜 Law and prophets meant the whole Old Testament

🎯 Jesus claims this rule as its summary

🙅 He is not replacing the law here

📖 Loving others was always the law's real point

# Matthew 7:13-14
# 🚧 The Strait Gate
---
## 🚪 Enter Ye In At The Strait Gate

"Strait" here means narrow or tight, not straight like a ruler.

It is a different, older spelling than the word meaning not crooked.

Entering through a narrow gate takes a deliberate, specific choice.

Jesus commands this entry, he does not just describe it.

🚪 Strait means narrow, not straight like a line

📏 This is an older spelling of narrow

🎯 Entering takes a deliberate, specific choice

📖 Jesus commands this entry directly

---

## 🌊 Wide Is The Gate, And Broad Is The Way, That Leadeth To Destruction

A wide gate and a broad road need no careful choosing at all.

Most people naturally drift toward the path that takes the least effort.

"Destruction" names a real, final outcome, not simply a bad day.

The easy path and the dangerous path turn out to be the very same road.

🌊 A wide gate needs no careful choosing

🏃 People naturally drift toward the easy path

⚠️ Destruction names a real, final outcome

📖 The easy road and the dangerous road match

---

## 👥 Many There Be Which Go In Thereat

Jesus names the uncomfortable truth that most people take this road.

Following the crowd here is not evidence of being on the right path.

Popularity and large numbers are never the test of truth in this verse.

The majority choice can still be the wrong choice.

👥 Most people take this easier road

🚫 Crowd size is not proof of truth

📈 Popularity is never the real test here

📖 The majority can still choose wrong

---

## 🛤️ Strait Is The Gate, And Narrow Is The Way, Which Leadeth Unto Life

This narrow path takes real intention and real effort to walk.

"Life" here means the full, lasting life God offers, not just survival.

The narrow way is harder to find and harder to keep walking.

Jesus never hides that this is the harder road to choose.

🛤️ This narrow path takes real effort

✨ Life means lasting life, not just survival

🧗 The narrow way is harder to walk

📖 Jesus never hides that this is hard

---

## 🔍 Few There Be That Find It

This closes the comparison on a sobering, honest note.

Finding the narrow way is not automatic or easy for anyone.

Jesus does not soften this warning to make it more comfortable.

A true, lasting path can still be a less traveled one.

🔍 Finding this way is not automatic

⚠️ Jesus does not soften this warning

🧭 Truth does not depend on popularity

📖 The right path can be less traveled

# Matthew 7:15-20
# 🐺 Wolves In Sheep's Clothing
---
## ⚠️ Beware Of False Prophets

"Beware" means stay alert, watch out carefully for danger.

A "false prophet" claims to speak for God but does not.

This warning shifts the chapter from ethics toward spiritual danger.

Not every voice claiming to speak for God can be trusted blindly.

⚠️ Beware means stay alert to danger

🗣️ False prophets claim to speak for God

🔀 This shifts toward a new, spiritual danger

📖 Not every claimed voice can be trusted

---

## 🐑 Which Come To You In Sheep's Clothing

Sheep's clothing pictures something that looks harmless and familiar on the outside.

Shepherds and flocks were a common, trusted sight in this culture.

A false prophet works by first blending into that trusted picture.

The danger is never obvious at first glance by design.

🐑 Sheep's clothing looks harmless outside

👩‍🌾 Shepherds and flocks were a trusted sight

🎭 False prophets blend in on purpose

📖 Danger here is never obvious at first

---

## 🐺 But Inwardly They Are Ravening Wolves

"Ravening" means hungry and violent, ready to attack and devour.

A wolf among sheep is one of the most dangerous pictures in this culture.

The outside look and the inside reality are now shown as complete opposites.

Jesus warns that appearance alone can never be the test of truth.

🐺 Ravening means hungry and violent

🐑 A wolf among sheep is a dangerous picture

🔀 Outside and inside are shown as opposites

📖 Appearance alone is never the test

---

## 🍇 Ye Shall Know Them By Their Fruits

Jesus gives the actual test for telling a false prophet from a true one.

"Fruits" means the real, visible results a person's life and teaching produce.

This test takes time, since fruit needs a season to grow and show.

Words and claims alone are never enough proof by themselves.

🍇 Fruits means the real, visible results

⏳ This test takes time to show

🗣️ Words alone are never enough proof

📖 Jesus gives a real test here

---

## 🌵 Do Men Gather Grapes Of Thorns

Thorn bushes and grapevines can look alike from a distance.

No farmer in this culture would expect sweet grapes from a thorn bush.

The question expects an obvious answer that everyone listening already knows.

A plant simply cannot produce fruit it was never made to produce.

🌵 Thorn bushes and grapevines can look alike

🍇 No one expects grapes from a thorn bush

❓ The question expects an obvious answer

📖 A plant cannot produce fruit it lacks

---

## 🌿 Or Figs Of Thistles

Thistles are spiky, useless weeds that produce no real food at all.

Figs were a common, valued fruit tree across this entire region.

This second image repeats the same point with a different, familiar plant.

Repetition here drives home just how obvious the answer really is.

🌿 Thistles are spiky, useless weeds

🌰 Figs were a common, valued fruit

🔁 This repeats the point differently

📖 The obvious answer gets driven home

---

## 🌳 Every Good Tree Bringeth Forth Good Fruit

Jesus now states the principle plainly, without needing a question this time.

A tree's nature determines what kind of fruit it is able to produce.

"Good" fruit here points to a genuine, healthy spiritual life underneath.

The fruit is simply the natural, visible evidence of that nature.

🌳 A tree's nature decides its fruit

✨ Good fruit points to a healthy life

🔍 Fruit is just visible evidence underneath

📖 Nature always shows itself eventually

---

## 🥀 But A Corrupt Tree Bringeth Forth Evil Fruit

"Corrupt" means rotten or damaged at the root, not simply unlucky.

A damaged tree cannot hide its condition forever, the fruit gives it away.

This is the direct, negative mirror of the line just before it.

False teaching eventually produces results that expose what it really is.

🥀 Corrupt means rotten at the root

🔍 A damaged tree cannot hide its fruit

🔁 This mirrors the line just before it

📖 False teaching eventually exposes itself

---

## 🔒 A Good Tree Cannot Bring Forth Evil Fruit

Jesus states this twice now, once for each type of tree.

This is not a suggestion, it is described as a plain impossibility.

A tree's nature sets a hard limit on what it can produce.

The same hard limit applies in both directions, good and corrupt.

🔒 This is stated as a hard impossibility

🌳 Nature sets a limit either direction

🔁 Jesus repeats this for both tree types

📖 A tree cannot fight its own nature

---

## 🪓 Every Tree That Bringeth Not Forth Good Fruit Is Hewn Down, And Cast Into The Fire

"Hewn down" means chopped down at the base with an axe.

A tree that never bears good fruit was likely being wasted anyway.

Fire here pictures a final, decisive end, not a gentle correction.

This is a serious warning aimed directly at the false prophets of verse fifteen.

🪓 Hewn down means chopped at the base

🌳 A fruitless tree was being wasted anyway

🔥 Fire pictures a final, decisive end

📖 This warning returns to the false prophets

---

## 🔁 Wherefore By Their Fruits Ye Shall Know Them

This closing line repeats verse sixteen almost word for word on purpose.

The repetition frames the whole fruit illustration like bookends on a shelf.

Everything between these two matching lines explains what fruit actually looks like.

The test given at the start is the same test given at the end.

🔁 This repeats verse sixteen almost exactly

📚 The repetition frames the whole illustration

🌳 Everything between explains what fruit looks like

📖 The same test opens and closes this section

# Matthew 7:21-23
# 🚫 Lord, Lord
---
## 🗣️ Not Every One That Saith Unto Me, Lord, Lord

Calling Jesus "Lord" twice here pictures urgent, confident, repeated address.

Jesus warns that saying the right words is not the same as belonging to him.

Many people can speak confidently about Jesus without truly following him.

Words alone were never going to be the real test.

🗣️ Lord, Lord pictures urgent, confident address

🚫 Right words are not the same as belonging

🎭 Confident talk does not guarantee real following

📖 Words alone were never the real test

---

## 👑 Shall Enter Into The Kingdom Of Heaven

The "kingdom of heaven" names God's rule, already introduced earlier in this chapter.

Entering it means genuinely belonging to that rule, not just talking about it.

This connects directly back to the narrow gate from verses thirteen and fourteen.

Not everyone who approaches the gate actually walks all the way through it.

👑 Kingdom of heaven means God's rule

🚪 This links back to the narrow gate

🚶 Approaching is not the same as entering

📖 Belonging is more than talking about it

---

## ✅ But He That Doeth The Will Of My Father

"Doeth" is an old form of the word "does."

Jesus names the actual test here, doing the Father's will.

This echoes the wise and foolish builders coming later in this same chapter.

A real relationship with God always shows up in a person's actions.

✅ Doeth is an old form of does

🎯 Doing the Father's will is the real test

🏗️ This echoes the builders later in the chapter

📖 Real relationship shows up in action

---

## 📅 Many Will Say To Me In That Day

"That day" points to a future day of final judgment.

Jesus pictures a specific courtroom like scene still to come.

"Many" signals this will not be a rare or unusual case.

This surprising scene is meant to be taken seriously now, not later.

📅 That day points to final judgment

⚖️ Jesus pictures a courtroom like scene

📊 Many signals this will not be rare

📖 This warning matters now, not only later

---

## 💪 Have We Not Prophesied, Cast Out Devils, And Done Many Wonderful Works

These three claims list impressive, visible, spiritual sounding activity.

Prophesying, casting out evil spirits, and miracles all sound deeply convincing.

Jesus does not deny that these things actually happened for these people.

Impressive spiritual activity, by itself, still was not the same as real obedience.

💪 Three claims list impressive spiritual activity

👀 Prophecy, exorcism, and miracles all sound convincing

✅ Jesus does not deny these things happened

📖 Impressive activity is not the same as obedience

---

## 🚪 I Never Knew You: Depart From Me

"Knew" here means a real, personal relationship, not simple awareness.

Jesus is not claiming ignorance about who these people were.

He is stating that no genuine relationship ever actually existed.

This is the most sobering line found anywhere in the whole chapter.

🚪 Knew means real relationship, not awareness

🙅 Jesus is not claiming simple ignorance

💔 No genuine relationship ever existed here

📖 This is the chapter's most sobering line

---

## ⚠️ Ye That Work Iniquity

"Iniquity" means sin or wrongdoing, often with a sense of injustice.

This label is surprising, given everything these people just claimed about themselves.

Jesus judges the underlying heart, not the impressive, visible activity performed.

Real obedience, not visible performance, is what he was always looking for.

⚠️ Iniquity means sin or wrongdoing

😳 This label surprises given their claims

❤️ Jesus judges the heart, not performance

📖 Real obedience was always the point

# Matthew 7:24-27
# 🏠 Two Builders
---
## 👂 Whosoever Heareth These Sayings Of Mine, And Doeth Them

Jesus points back to everything just taught across this entire chapter.

Hearing alone is named first, then doing is named right beside it.

The sermon was never meant to end as information only.

Real response was always the expected next step after hearing.

👂 This points back to the whole chapter

➕ Hearing and doing are named together

📚 The sermon was never meant to stay information

📖 Real response was always expected next

---

## 🧠 I Will Liken Him Unto A Wise Man

Jesus moves from direct teaching into a final, memorable illustration.

"Liken" means to compare one thing to another to make a point clear.

Wisdom here is defined very specifically, by action, not simply by knowledge.

The wise man in this story is anyone who hears and obeys.

🧠 Liken means to compare for clarity

🎯 Wisdom here is defined by action

👤 The wise man is anyone who obeys

📖 This begins the chapter's final illustration

---

## 🪨 Which Built His House Upon A Rock

Solid rock foundations in this region often required real effort to reach.

Builders sometimes had to dig down deep before striking firm stone.

A rock foundation pictures a life built on something that does not shift.

Jesus and his teaching are that unshifting foundation in this picture.

🪨 Rock foundations took real effort to reach

⛏️ Builders sometimes dug deep to find it

🏗️ Rock pictures something that does not shift

📖 Jesus is the unshifting foundation here

---

## ⛈️ The Rain Descended, And The Floods Came, And The Winds Blew

This pictures a sudden, violent storm hitting both houses equally.

Rain, flood, and wind name three separate, serious kinds of pressure.

The storm in this picture stands for real hardship and testing in life.

Both builders faced the exact same storm, with no difference at all.

⛈️ This pictures a sudden, violent storm

🌊 Rain, flood, and wind name three pressures

🧪 The storm stands for real life testing

📖 Both builders faced the same storm

---

## ✅ And It Fell Not: For It Was Founded Upon A Rock

The house built on rock survives the exact same storm fully intact.

"Founded" means the foundation itself, the part no one usually sees.

What held the house up was decided long before the storm ever arrived.

A life built on obedience holds up the same way under real pressure.

✅ The house on rock survives fully

🫥 Founded means the unseen foundation itself

⏳ What holds up was decided early

📖 Obedience holds up under real pressure

---

## 🙃 Every One That Heareth These Sayings Of Mine, And Doeth Them Not, A Foolish Man

This verse repeats the same setup, now with one key word changed.

"Foolish" here does not mean lacking intelligence or being simple minded.

It means knowing the right thing to do and still refusing to do it.

Hearing without doing is the only difference between the wise man and this one.

🙃 Foolish means refusing to act, not low intelligence

🔁 The same setup repeats with one change

👂 Hearing without doing is the only difference

📖 Knowing the right thing is not enough

---

## 🏖️ Which Built His House Upon The Sand

Sand looks like solid, buildable ground on the surface.

It takes far less effort and time to build on than rock does.

Sand gives none of the real support that a serious storm requires.

The ease of building this way hides the real danger underneath.

🏖️ Sand looks solid on the surface

⏱️ Building on sand took far less effort

🚫 Sand gives no real support underneath

📖 Ease here hides real danger

---

## 💥 And It Fell: And Great Was The Fall Of It

The exact same storm from before now brings total collapse.

Nothing about the storm itself was different the second time.

The only difference the whole time was the foundation underneath each house.

Jesus ends his entire sermon on this one deciding image.

💥 The same storm now brings total collapse

🔁 The storm itself never changed at all

🪨 The foundation was the only real difference

📖 Jesus ends his sermon on this image

# Matthew 7:28-29
# 😲 Astonished At His Doctrine
---
## 📜 And It Came To Pass, When Jesus Had Ended These Sayings

This phrase is a common narrator's marker, signaling a scene has closed.

It marks the formal end of everything taught since chapter five began.

This whole block of teaching is often called the Sermon on the Mount.

The narrator now steps back to show how the crowd actually reacted.

📜 This marks a scene coming to a close

📏 It closes the teaching begun in chapter five

⛰️ This is called the Sermon on the Mount

📖 The narrator now shows the crowd's reaction

---

## 😲 The People Were Astonished At His Doctrine

"Doctrine" here means teaching, the actual content of what Jesus said.

"Astonished" describes genuine shock, not simply polite appreciation or interest.

The content itself, not just the delivery, is what struck this crowd.

Everything from the beatitudes to the two builders had built toward this reaction.

😲 Astonished means genuine shock, not mild interest

📘 Doctrine means teaching, the actual content

🎯 The content itself struck this crowd

📖 Everything taught built toward this reaction

---

## 👑 He Taught Them As One Having Authority

Authority here means speaking with inherent, personal weight, not borrowed weight.

Jesus taught as the source of truth, not merely a reporter of it.

This authority runs through everything already said across this entire chapter.

It explains why a crowd without power or title still felt commanded.

👑 Authority means inherent, personal weight

🎯 Jesus taught as the source, not a reporter

🔗 This authority runs through the whole chapter

📖 It explains why the crowd felt commanded

---

## 📚 And Not As The Scribes

Scribes normally taught by quoting a long chain of respected past teachers.

Their authority was borrowed, built on others who had taught before them.

Jesus taught with no chain of quotations standing behind his words.

The whole Sermon on the Mount closes on exactly that stark contrast.

📚 Scribes taught by quoting past teachers

🔗 Their authority was borrowed from others

🙅 Jesus quoted no chain of past teachers

📖 The sermon closes on that stark contrast
`.trim();

export const MATTHEW_SEVEN_PERSONAL_SECTIONS = parseMatthewSevenRawNotes(MATTHEW_SEVEN_RAW_NOTES);
