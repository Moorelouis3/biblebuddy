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
# ⚖️ Judge Not That Ye Be Not Judged
---
## ⚖️ Judge Not That Ye Be Not Judged

Judge here means condemning someone harshly, not simple discernment.

This verse does not forbid every kind of evaluation.

Later in this same chapter Jesus says to beware of false prophets.

Spotting a false prophet actually requires judgment of some kind.

What Jesus forbids is a harsh, superior kind of condemning.

⚖️ Judge means harsh condemning here

🔎 Some discernment is still required

🐺 Spotting false prophets needs judgment later

📖 The warning targets the spirit behind it

---

## 📏 With What Measure Ye Mete It Shall Be Measured To You Again

Mete is an old word meaning to measure something out.

Mete out judgment and that same standard gets turned back on you.

A harsh judge of others will face an equally harsh judgment.

A gentle, patient judge sets a gentler standard for themselves too.

This is not a bargain with God but a plain result.

The measure you use becomes the measure used on you.

📏 Mete means to measure out

⚖️ Your standard gets turned back on you

😤 Harsh judging invites harsh judgment

📖 The measure you use returns to you

---

## 🌾 The Mote That Is In Thy Brother's Eye

A mote is a tiny speck, like a bit of sawdust.

It is small enough to barely bother anyone at all.

Jesus pictures someone obsessing over this tiny speck in another person's eye.

Brother here points to a fellow believer, not just any person.

The flaw being noticed is real, but it is minor.

🌾 Mote means a tiny speck

👁️ It barely bothers anyone

🧍 Brother points to a fellow believer

📖 The flaw noticed here is minor

---

## 🪵 The Beam That Is In Thine Own Eye

A beam is a large wooden plank, like a roof support.

Jesus grew up around carpentry in Joseph's household.

Picture trying to walk around with a plank stuck in your eye.

The image is meant to sound ridiculous on purpose.

It describes a flaw far bigger than the one spotted in someone else.

The humor makes the hypocrisy impossible to miss.

🪵 Beam means a large wooden plank

🔨 Jesus draws on carpentry imagery

😂 The picture is meant to sound absurd

📖 It exposes a much bigger flaw

---

## 🙈 How Wilt Thou Say To Thy Brother Let Me Pull Out The Mote

This pictures someone offering to help while unable to see clearly.

A plank blocks their vision completely in this picture.

They cannot actually see the tiny speck well enough to remove it safely.

Offering this kind of help only makes things worse.

Jesus is not condemning the desire to help another person grow.

He is condemning trying to help while blind to your own problem.

🙈 The helper cannot see clearly here

🪵 A plank blocks their own vision

🤕 Blind help can cause real harm

📖 Fix your own blindness before helping

---

## 🎭 Thou Hypocrite

A hypocrite was originally a stage actor playing a part.

Jesus already used this exact word back in chapter six.

Here it describes someone performing concern for a flaw while hiding a bigger one.

The label is blunt and direct on purpose.

Jesus wants this kind of posturing named plainly, not softened.

🎭 Hypocrite originally meant a stage actor

🔁 Jesus used this word in chapter six

🪵 It names a bigger hidden flaw

📖 Jesus names it plainly on purpose

---

## 🥇 First Cast Out The Beam Out Of Thine Own Eye

First sets a clear order that cannot be skipped.

Self examination has to come before correcting someone else.

This is not a call to never address another person's fault.

It is a call to deal with your own fault first.

The order matters as much as the action itself.

🥇 First sets a required order

🪞 Self examination comes before correction

🙅 This is not a ban on correcting others

📖 Order matters as much as action

---

## 👀 Then Shalt Thou See Clearly

Clear sight only comes after the bigger flaw is removed.

A person freed from their own blindness can actually help now.

The goal was never to stop helping a brother at all.

The goal was becoming able to help without hurting them.

Clear vision and genuine humility work together.

👀 Clear sight follows self correction first

🤝 A freed person can truly help

🎯 Helping well was the goal all along

📖 Humility and clear vision work together

# Matthew 7:6
# 🐷 Pearls Before Swine
---
## 🐕 Give Not That Which Is Holy Unto The Dogs

In this culture, dogs were not kept as beloved pets.

They ran wild in packs and were considered unclean, scavenging animals.

Holy here points to something sacred, set apart for God.

Giving something sacred to a dog pictures total disregard for its value.

The image is deliberately jarring, not literal advice about animals.

🐕 Dogs here were wild and unclean

✨ Holy means set apart for God

🚫 The image pictures total disregard

📖 It is not literal animal advice

---

## 💎 Cast Ye Your Pearls Before Swine

Swine means pigs, considered unclean animals under Jewish law.

Pearls were among the most valuable items in the ancient world.

A pig cannot tell a pearl apart from an ordinary pebble.

Something precious is wasted completely on a creature that cannot value it.

The warning is about offering sacred truth to those set on rejecting it.

🐖 Swine means unclean pigs

💎 Pearls were extremely valuable items

🪨 A pig cannot tell pearl from stone

📖 Sacred truth can be wasted on rejection

---

## 🦷 Trample Them Under Their Feet And Turn Again And Rend You

A hungry pig expecting food reacts badly to a mouthful of pearls.

Once it realizes the pearls are not food, it may turn aggressive.

Rend means to tear or attack violently.

The picture ends with the giver getting hurt by their own gift.

Wisdom includes recognizing when a gift will only provoke harm.

🐖 A hungry pig expects real food

😠 It turns aggressive once deceived

🦷 Rend means to tear violently

📖 Wisdom knows when a gift provokes harm

# Matthew 7:7-11
# 🚪 Ask Seek Knock
---
## 🙏 Ask And It Shall Be Given You

The wording behind ask suggests a continual request, not one try.

This is an invitation to keep bringing requests to God.

It follows right after a hard warning about misjudging others.

Grace toward others flows out of confidence that God hears you.

Asking assumes a Father who is actually listening.

🔁 Ask suggests continual asking, not one try

🙏 This invites ongoing requests to God

👂 It assumes a listening Father

📖 Confidence in God shapes grace toward others

---

## 🔍 Seek And Ye Shall Find

Seek pictures active searching, not passive waiting around.

It carries more effort than simply asking once and stopping.

Finding is promised to the person who keeps looking.

This is not a guarantee of instant answers to every want.

It describes a relationship built on genuine pursuit of God.

🔍 Seek pictures active searching

💪 It takes more effort than asking alone

🎯 Finding is promised to real pursuit

📖 This describes pursuing a relationship with God

---

## 🚪 Knock And It Shall Be Opened Unto You

Doors in this culture were usually shut and often guarded at night.

Knocking meant standing at a closed door, waiting to be let in.

It pictures patience alongside persistence.

The door does not open itself without someone asking.

Jesus pictures God as willing to open the door himself.

🚪 Doors were normally shut in this culture

✊ Knocking meant waiting at a closed door

⏳ It pictures patience with persistence

📖 God is willing to open the door

---

## 👥 For Every One That Asketh Receiveth

This line states the promise in its most direct, unqualified form.

Every one makes the invitation personal, not limited to a few.

The promise is not that every specific wish gets granted exactly as asked.

It is that sincere seeking of God never ends empty handed.

The emphasis falls on God's willingness, not on technique.

👥 Every one makes this a personal promise

🎯 Not every specific wish is granted exactly

🤝 Sincere seeking never ends empty handed

📖 The emphasis is God's willingness to give

---

## 🍞 If His Son Ask Bread Will He Give Him A Stone

Round loaves of bread baked in this region often looked like flat stones.

A cruel father could trick a hungry child by handing over a rock.

Jesus pictures a trick no loving father would ever actually play.

The comparison exposes how foolish that behavior would be.

Human fathers already know better than that.

🍞 Bread loaves resembled flat stones here

🪨 A cruel trick swaps bread for rock

🙅 No loving father would play that trick

📖 Human fathers already know better

---

## 🐟 If He Ask A Fish Will He Give Him A Serpent

Some fish common in that region had a long, smooth shape.

Many scholars believe this fish could resemble a small snake.

Serpents were associated with danger, not food, in this culture.

A loving father gives what was actually asked for and needed.

The image again highlights the gap between cruelty and real love.

🐟 Some local fish looked snake shaped

🐍 Serpents meant danger, never food

❤️ A loving father gives what is needed

📖 The gap between cruelty and love is clear

---

## 👤 If Ye Then Being Evil Know How To Give Good Gifts

Being evil admits that every human parent is flawed in some way.

Even flawed parents still manage to give their children good things.

This argument moves from something lesser and known to something greater.

Jewish teachers of this era used this same kind of reasoning often.

It argues from a smaller, certain truth to a larger, greater one.

👤 Being evil admits human flaws honestly

🎁 Flawed parents still give good things

📐 This argues from lesser to greater

📖 Jewish teachers used this reasoning often

---

## 👨‍👧 How Much More Shall Your Father Give Good Things

If flawed human fathers can give good gifts, God gives even better ones.

God's goodness has no flaw limiting it the way a human parent's does.

Good things are not promised to look like every specific request.

They are promised to be genuinely good for the one asking.

This entire passage rests on trusting God's character more than the outcome.

👨‍👧 Human fathers set the lesser example

✨ God's goodness has no limiting flaw

🎁 Good things means genuinely good, not exact

📖 Trust rests on God's character, not outcomes

# Matthew 7:12
# 🤝 The Golden Rule
---
## 🔄 All Things Whatsoever Ye Would That Men Should Do To You

This line asks a person to imagine being on the receiving end first.

It turns personal preference into the actual standard for treating others.

Versions of this idea existed in other ancient teachings before this moment.

Jesus states it here as a positive command to actively do good.

Most older versions only warned against doing harm to others.

🔄 This flips the viewpoint to the receiver

📏 Personal preference becomes the standard

📜 Similar ideas existed in older teachings

📖 Jesus makes it a command to act

---

## 📚 This Is The Law And The Prophets

The Law and the Prophets was a common way to name the whole Old Testament.

Jesus claims this one line sums up that entire body of teaching.

It does not replace every individual command found there.

It names the heart that those commands were always meant to produce.

Treating others well was never a side issue in that older teaching.

📚 Law and Prophets named the whole Old Testament

🧩 This line sums up that whole teaching

❤️ It names the heart behind the commands

📖 Treating others well was never a side issue

# Matthew 7:13-14
# 🚧 The Strait Gate And The Narrow Way
---
## 🚪 Enter Ye In At The Strait Gate

Strait is an old word meaning narrow, not the word straight.

It describes a gate too tight for a crowd to rush through.

Entering requires a deliberate, personal choice.

A narrow gate also tends to be less noticed and less popular.

Jesus pictures following him as a specific, intentional entry point.

📏 Strait means narrow, not straight

🚪 It describes a tight entry point

🙋 Entering takes a deliberate choice

📖 Following Jesus is a specific entry point

---

## 🚶 Wide Is The Gate And Broad Is The Way That Leadeth To Destruction

A wide gate allows a whole crowd to walk through at once.

A broad road is easy to travel without much thought.

Both pictures describe a path most people naturally drift toward.

Destruction names a real and serious end, not just a scare word.

Popularity is never proof that a path is the right one.

🚶 A wide gate fits a whole crowd

🛣️ A broad road takes little thought

⚠️ Destruction names a serious real end

📖 Popularity never proves a path is right

---

## 🧭 Strait Is The Gate And Narrow Is The Way Which Leadeth Unto Life

This narrow way is harder to find and easier to walk past.

Fewer people choose it, but it leads somewhere far better.

Life here points to real relationship with God, not mere survival.

The difficulty of the road is never a sign it is wrong.

Jesus already calls himself the gate elsewhere in the Gospels.

🧭 This narrow way is easy to miss

👥 Fewer people choose this road

🌱 Life here means relationship with God

📖 A hard road is not a wrong one

---

## ⚠️ Few There Be That Find It

This line is sobering rather than comforting on the surface.

It does not mean God is stingy with his invitation.

It means most people settle for the easier, crowded path instead.

Finding the narrow way takes real searching, as verse seven already described.

This verse is not meant to discourage searching but to make it urgent.

⚠️ This line is sobering, not comforting

🚫 God is not stingy with the invitation

😴 Most people settle for the easier path

📖 This verse makes real searching urgent

# Matthew 7:15-20
# 🐺 Wolves In Sheep's Clothing
---
## 🗣️ Beware Of False Prophets

A false prophet claims to speak for God without truly being sent by him.

Beware is a strong warning to stay alert, not just curious.

This instruction assumes false prophets will actually show up among genuine believers.

Jesus does not promise they will always be obvious.

Real discernment is expected here, the very thing verse one was not banning.

🗣️ A false prophet falsely claims God's voice

⚠️ Beware means stay alert, not curious

🙈 False prophets will not always be obvious

📖 Real discernment is expected here

---

## 🐑 Which Come To You In Sheep's Clothing

Shepherds in this region commonly wore rough garments made from sheep's wool.

A predator disguised in that same wool could slip unnoticed into a flock.

The disguise works because it looks completely harmless and familiar.

False teaching often sounds reasonable and uses familiar religious language.

The danger is rarely announced plainly in advance.

🐑 Shepherds wore wool garments like sheep

🐺 A disguise could slip into a flock

😇 The disguise looks harmless and familiar

📖 False teaching rarely announces itself

---

## 🐺 Inwardly They Are Ravening Wolves

Ravening means fiercely hungry and eager to seize prey.

The outward wool hides a predator that intends real harm.

Inwardly points to a hidden true nature beneath a convincing appearance.

This is not about one bad decision but a hidden identity.

Appearance and true character can genuinely be opposites.

🐺 Ravening means fiercely hungry to seize prey

🧥 The wool hides a real predator

🎭 Inwardly points to a hidden true nature

📖 Appearance and character can be opposites

---

## 🍎 Ye Shall Know Them By Their Fruits

Fruits here means the visible results a person's life actually produces.

Words and claims are easy to fake over a short time.

A consistent pattern of behavior is far harder to fake for long.

This gives a practical, visible test instead of guesswork.

Patient observation matters more than a first impression.

🍎 Fruits means the visible results of a life

🗣️ Words are easy to fake briefly

⏳ A long pattern is hard to fake

📖 Patient observation beats a first impression

---

## 🌿 Do Men Gather Grapes Of Thorns Or Figs Of Thistles

Thorn bushes and thistles are wild plants common across Israel's hillsides.

Neither plant has ever produced grapes or figs, no matter how it is tended.

The question expects an obvious answer that everyone listening already knew.

A plant's nature decides in advance what it can and cannot produce.

This sets up the direct comparison coming in the next verse.

🌿 Thorns and thistles were common wild plants

🍇 Neither ever produces grapes or figs

❓ The answer here is obvious to everyone

📖 A plant's nature decides its fruit

---

## 🌳 Every Good Tree Bringeth Forth Good Fruit

A tree's fruit simply reflects what kind of tree it already is.

Good fruit is not forced out through extra effort or performance.

It flows naturally out of a healthy root and nature.

The same principle applies directly to a person's character and actions.

What flows out reveals what is already true underneath.

🌳 Fruit reflects the kind of tree

🌱 Good fruit flows from a healthy root

🙋 This applies to character and action

📖 What flows out reveals what is true

---

## 🪓 A Corrupt Tree Cannot Bring Forth Good Fruit

Corrupt here means diseased or rotten at the root.

This is a statement of impossibility, not just unlikelihood.

No amount of effort lets a corrupt tree fake good fruit for long.

The problem has to be addressed at the root, not the surface.

Genuine change starts far deeper than outward behavior alone.

🪓 Corrupt means diseased at the root

🚫 This describes impossibility, not unlikelihood

🌳 A rotten root cannot be faked for long

📖 Real change starts deeper than behavior

---

## 🔥 Every Tree That Bringeth Not Forth Good Fruit Is Hewn Down

Hewn down means cut down with an axe or similar tool.

A fruitless tree took up space and resources without producing anything useful.

Farmers in this era regularly cleared out such trees for firewood.

The image pictures a real and practical result, not an abstract threat.

This same image already appeared earlier through John the Baptist's preaching.

🪓 Hewn down means cut with an axe

🌳 A fruitless tree wasted space and resources

🔥 Farmers cleared such trees for firewood

📖 John the Baptist used this same image

---

## 🔁 Wherefore By Their Fruits Ye Shall Know Them

This exact phrase already opened this whole warning back in verse sixteen.

Repeating it here closes the teaching the way it began.

This kind of matching bookend is a deliberate teaching tool, not an accident.

Everything between the two matching lines explains how fruit actually works.

The repetition makes the lesson impossible to walk away from and forget.

🔁 This exact line opened the teaching too

📦 Matching lines bookend the whole passage

🎯 This repetition is deliberate, not accidental

📖 It makes the lesson hard to forget

# Matthew 7:21-23
# 🗣️ Lord Lord
---
## 🗣️ Not Every One That Saith Unto Me Lord Lord

Calling Jesus Lord twice here pictures urgent, even desperate address.

This is not casual speech but an intense personal appeal.

Even so, the appeal by itself is not what Jesus is looking for.

Sincere sounding words can still come from a life never actually surrendered.

Intensity of speech is never proof of a real relationship.

🗣️ Repeating Lord pictures urgent address

❗ This is intense, not casual speech

🙏 Words alone are not what Jesus wants

📖 Intense speech does not prove relationship

---

## ✅ He That Doeth The Will Of My Father Which Is In Heaven

This is the actual test Jesus names, placed right after the warning.

Doeth points to ongoing action, not a single moment of belief.

The will of the Father is the standard, not personal preference.

This connects directly back to the wise builder coming later in this chapter.

Genuine relationship with Jesus shows up in a life's direction, not just words.

✅ Doeth means ongoing action, not one moment

📏 The Father's will sets the standard

🏠 This connects to the builder passage ahead

📖 Relationship shows in a life's direction

---

## 📋 Have We Not Prophesied In Thy Name

Prophesied here means speaking messages claimed to come directly from God.

This defense lists an impressive spiritual resume as proof of belonging.

The claim assumes visible spiritual activity automatically proves a real relationship.

Jesus is about to show that assumption is mistaken.

Gifted ministry and genuine obedience are not automatically the same thing.

🗣️ Prophesied means speaking in God's name

📋 This lists an impressive spiritual resume

❌ Activity does not automatically prove relationship

📖 Gifted ministry and obedience can differ

---

## 👹 In Thy Name Have Cast Out Devils

This adds a second impressive claim to the growing list of proofs.

Casting out evil spirits was treated as unmistakable evidence of real power.

Even genuine spiritual power can operate without personal obedience behind it.

Jesus never denies that these things actually happened.

He denies that they were ever proof of a real relationship with him.

👹 Cast out devils meant unmistakable power

⚡ Power can operate without real obedience

✅ Jesus never denies these events happened

📖 Power and intimacy are not the same

---

## ❤️ I Never Knew You Depart From Me

Knew here means a deep, personal, covenant kind of relationship.

It is the same word used elsewhere for intimate relationship, not simple facts.

Jesus is not claiming ignorance of who these people were.

He is denying that any real relationship with him ever existed.

Work iniquity names real moral evil, not harmless mistakes.

This is the most sobering line in the entire passage.

❤️ Knew means deep covenant relationship

🙅 Jesus denies any real relationship existed

⚖️ Iniquity names real moral evil

📖 This is the passage's most sobering line

# Matthew 7:24-27
# 🏠 Two Builders
---
## 🧠 I Will Liken Him Unto A Wise Man Which Built His House Upon A Rock

This parable arrives right after the warning about empty words.

Liken means compared to, setting up a clear picture to learn from.

The wise man is defined by action, hearing and then actually doing.

Building on solid rock in this region meant digging down to real bedrock.

That extra work was slower and far less convenient at first.

🧠 Wise means hearing and doing together

🪨 Rock meant digging down to real bedrock

🐌 This extra work was slower at first

📖 Wisdom follows the harder, slower path

---

## 🌧️ The Rain Descended And The Floods Came And The Winds Blew

This names three separate kinds of pressure hitting the house at once.

Rain pictures pressure falling down from above.

Floods picture pressure rising up from below.

Wind pictures pressure pushing in sideways.

Together they picture a complete, total testing from every direction.

Trials in life often arrive in more than one form at once.

🌧️ Rain pictures pressure from above

🌊 Floods picture pressure from below

💨 Wind pictures pressure from the side

📖 Trials often hit from every direction

---

## 🏠 It Fell Not For It Was Founded Upon A Rock

The house survives because of its foundation, not its appearance.

Nothing in this verse says the storm skipped this house.

The storm hit both houses in this story with equal force.

Surviving the storm depended entirely on what was unseen underground.

A life built on hearing and doing Jesus's words can withstand real pressure.

🏠 The house survives through its foundation

🌩️ The storm struck both houses equally

🙈 What matters most stayed unseen underground

📖 Obedience builds a life that withstands pressure

---

## 🏖️ Likened Unto A Foolish Man Which Built His House Upon The Sand

Dry riverbeds in this region, called wadis, often looked like solid ground.

Building there was faster, cheaper, and far more convenient at the time.

The danger stayed hidden until the rainy season actually arrived.

The foolish man in this parable hears the same words as the wise man.

The real difference between the two men was never about hearing at all.

🏖️ Dry wadis looked like solid ground

💰 Building there was faster and cheaper

⚠️ The danger stayed hidden until rain came

📖 The real difference was never hearing alone

---

## 💥 Great Was The Fall Of It

The same storm that the first house survived destroys this one completely.

Great emphasizes a total collapse, not minor damage.

Convenience in the moment becomes costly once real pressure finally arrives.

Hearing good teaching without ever doing it eventually meets the exact same test.

Jesus ends the Sermon on the Mount with this sober warning on purpose.

🌊 The same storm destroys this house

💥 Great means total collapse, not minor damage

⏳ Convenience now can turn costly later

📖 Jesus ends his sermon with this warning

# Matthew 7:28-29
# 😲 Astonished At His Doctrine
---
## 😲 The People Were Astonished At His Doctrine

Doctrine here simply means his teaching, not a formal theology system.

Astonished describes genuine shock, more than polite appreciation.

This reaction closes out everything taught across three full chapters.

The crowd clearly sensed something different from their usual religious experience.

Something about how Jesus taught struck them as much as what he taught.

📜 Doctrine here simply means his teaching

😲 Astonished describes genuine shock

📚 This closes three chapters of teaching

➡️ How he taught struck them deeply

---

## 📜 He Taught Them As One Having Authority

Jewish teachers of this era called rabbis typically taught by citing earlier rabbis.

A common teaching pattern sounded like Rabbi so and so says.

Jesus instead spoke directly, often saying I say unto you.

That direct voice claimed a personal authority rabbis did not usually claim.

The crowd noticed this difference immediately, even before weighing the content.

📜 Rabbis usually cited earlier teachers

🗣️ Jesus spoke directly, saying I say unto you

👑 This claimed a personal authority

➡️ The crowd noticed the difference immediately

---

## 📚 And Not As The Scribes

Scribes were the trained religious experts who copied and interpreted the law.

Their authority rested on quoting tradition and past teachers correctly.

Jesus never once needed to quote another teacher to make his point.

His authority came from who he was, not from what he had studied.

This difference closes the entire Sermon on the Mount on the clearest note.

📚 Scribes were trained religious experts

🔗 Their authority rested on quoting tradition

👑 Jesus needed no other teacher to quote

📖 This closes the sermon on that note
`.trim();

export const MATTHEW_SEVEN_PERSONAL_SECTIONS = parseMatthewSevenRawNotes(MATTHEW_SEVEN_RAW_NOTES);
