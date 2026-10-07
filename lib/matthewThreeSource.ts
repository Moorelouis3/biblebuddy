export type MatthewThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewThreeRawNotes(rawText: string): MatthewThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 3:${startVerse}` : `Matthew 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Matthew 3 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_THREE_RAW_NOTES = `# Matthew 3:1-2
# 🏜️ John Begins His Ministry
---
## 👶 In Those Days Came John The Baptist

Those days means about thirty years after the last chapter ended.

Matthew jumps straight from the infant Jesus to a grown John.

John was a cousin of Jesus, born about six months earlier.

His father Zacharias served as a priest in the temple.

Luke's Gospel tells that fuller backstory in detail.

Matthew moves straight into John's public ministry instead.

⏳ Those days means about thirty years later

👪 Matthew skips over John's whole childhood

🔗 John was Jesus's cousin by birth

📖 Luke tells that fuller backstory

---

## 🏜️ Preaching In The Wilderness Of Judaea

The wilderness of Judaea was a dry, rocky desert region.

It sat near the Dead Sea, far from cities and crowds.

Prophets often withdrew to the wilderness to hear from God.

Elijah and Moses both spent time in similar desert places.

John begins his ministry inside that same old prophetic pattern.

🏜️ Wilderness means a dry desert region

🗺️ It sat near the Dead Sea

📜 Prophets often withdrew to the desert

📖 John stands inside that same pattern

---

## 👑 Repent Ye: For The Kingdom Of Heaven Is At Hand

"Repent" means far more than simply feeling sorry.

It means turning around and changing your direction in life.

The "kingdom of heaven" means God's reign breaking into the world.

"At hand" means it is near, not centuries away.

John announces that God's long awaited rule is finally arriving.

🔄 Repent means turning your whole life around

👑 Kingdom of heaven means God's reign arriving

⏰ At hand means near, not distant

📖 God's long awaited rule is arriving

# Matthew 3:3-4
# 🐫 The Forerunner's Appearance
---
## 📜 This Is He That Was Spoken Of By The Prophet Esaias

Esaias is the Greek form of the name Isaiah.

Isaiah wrote this prophecy about seven hundred years before John was born.

Matthew often points back to an Old Testament prophet being fulfilled.

Here he shows that John himself was promised long in advance.

Nothing about John's arrival caught God by surprise.

📜 Esaias is the Greek name for Isaiah

⏳ Isaiah wrote this centuries before John

🔗 Matthew often links events to prophecy

📖 John's arrival was promised in advance

---

## 📢 The Voice Of One Crying In The Wilderness

Isaiah pictured a herald shouting out ahead of a king.

That herald's whole job was to announce someone greater coming.

John fills that exact role for Jesus centuries later.

He is the voice, not the king the voice announces.

His entire ministry points away from himself and toward Christ.

📢 A herald shouted ahead of a king

🎙️ John fills that same herald role

👑 He announces someone greater than himself

➡️ His ministry points toward Christ

---

## 🛣️ Prepare Ye The Way Of The Lord, Make His Paths Straight

Ancient kings sent workers ahead to smooth out rough roads.

Workers cleared stones and filled holes before the king arrived.

Isaiah used that custom as a picture of readiness.

John calls people to prepare their hearts the same way.

Repentance is the inner road being made straight for God.

🛣️ Kings sent workers to smooth roads

🪨 Workers cleared stones before the king came

❤️ Repentance prepares the heart the same way

📖 Straight paths picture readiness for God

---

## 🐫 His Raiment Of Camel's Hair, And A Leathern Girdle About His Loins

John's clothing was rough, not comfortable or refined.

"Raiment" means clothing, an old word for what someone wears.

Camel's hair cloth was coarse and scratchy against the skin.

A "leathern girdle" was a plain leather belt worn at the waist.

This exact outfit was once worn by the prophet Elijah.

John's clothing silently announced that an old prophet had returned.

👕 Raiment means clothing in old English

🐫 Camel's hair cloth was coarse and scratchy

🪢 A leathern girdle is a leather belt

📖 This echoes the prophet Elijah's clothing

---

## 🍯 His Meat Was Locusts And Wild Honey

Meat here does not mean animal flesh.

It is an old word that simply means food in general.

Locusts were a type of large insect allowed under Jewish law.

Wild honey came from bees nesting out in the open desert.

Both foods could be found without planting or farming anything.

John's diet matched his simple, separated way of living.

🍽️ Meat here is an old word for food

🦗 Locusts were insects allowed under Jewish law

🍯 Wild honey came from desert bees

📖 His diet matched his simple lifestyle

# Matthew 3:5-6
# 🌊 Crowds Come To The Jordan
---
## 🏙️ Then Went Out To Him Jerusalem, And All Judaea

"Jerusalem" and "Judaea" stand in for the people who lived there.

Matthew is describing large crowds, not entire cities walking out.

This kind of overstatement was a normal way of speaking.

It shows how widely John's message was spreading.

People traveled real distances just to hear him preach.

🏙️ Jerusalem stands for its people

📣 This describes large crowds, not cities

🗣️ Overstatement was normal in that culture

📖 John's message was spreading widely

---

## 🌊 All The Region Round About Jordan

The Jordan River runs south through the land of Israel.

It was the main water source for much of that region.

John set up his ministry right along its banks.

Crowds from nearby towns could easily reach the river.

The location made baptizing large crowds possible.

🌊 The Jordan River runs through Israel

💧 It was the region's main water source

📍 John ministered right along its banks

📖 Location made large baptisms possible

---

## 💧 And Were Baptized Of Him In Jordan, Confessing Their Sins

Jewish people already used water washing for ritual cleansing.

John's baptism added something new, a public act of repentance.

"Confessing" means openly admitting wrongdoing instead of hiding it.

People spoke their sins out loud before entering the water.

This baptism prepared people for the kingdom John announced.

💧 Ritual washing was already familiar

🆕 John added public repentance to it

🗣️ Confessing means admitting sin openly

📖 It prepared people for the kingdom

# Matthew 3:7-10
# 🐍 A Warning To The Religious
---
## 📚 He Saw Many Of The Pharisees And Sadducees Come To His Baptism

Pharisees were religious teachers who stressed strict obedience to the law.

Sadducees were a wealthier, priestly group with different beliefs.

These two groups usually disagreed sharply with each other.

Here they show up together to see John's unusual movement.

John's reputation had reached the top of Jewish religious life.

📚 Pharisees stressed strict obedience to the law

🏛️ Sadducees were a wealthier priestly group

⚔️ The two groups usually disagreed

📖 John's fame reached Jewish leaders

---

## 🐍 O Generation Of Vipers

A viper is a venomous, dangerous snake.

John is not greeting these leaders kindly.

He is naming them as dangerous and deceptive.

Snakes were already a common symbol for hidden evil.

John confronts their outward religion without hesitation.

🐍 A viper is a dangerous snake

⚠️ John calls them dangerous and deceptive

🎭 Snakes symbolized hidden evil

📖 John confronts empty religion directly

---

## ⚖️ Who Hath Warned You To Flee From The Wrath To Come

"The wrath to come" means a future day of God's judgment.

John questions why they showed up at all.

Coming to the river without real change meant nothing.

God's coming judgment cannot be escaped by a ritual alone.

John demands something deeper than simply showing up.

⚖️ Wrath to come means future judgment

❓ John questions their real motive

🚫 Ritual alone cannot escape judgment

📖 John demands real, inward change

---

## 🍎 Bring Forth Therefore Fruits Meet For Repentance

Real repentance has to show up somewhere visible.

"Meet" is an old word meaning fitting or suitable.

Fruit here pictures the visible result of a changed life.

Words alone are not the proof John is asking for.

A good tree is known by what it actually produces.

✅ Meet means fitting or suitable

🍎 Fruit pictures a changed life

🗣️ Words alone are not enough

📖 A tree is known by its fruit

---

## 🌳 We Have Abraham To Our Father

These leaders assumed their bloodline guaranteed God's favor.

Being Abraham's descendant felt like a permanent safety net to them.

John directly challenges that comfortable assumption.

Ancestry alone was never the real basis of the covenant.

Trusting your family line instead of your own heart is a trap.

🌳 They trusted their bloodline from Abraham

🛑 John challenges that assumption directly

📜 Ancestry alone was never the point

📖 Trusting family instead of faith is a trap

---

## 🪨 God Is Able Of These Stones To Raise Up Children Unto Abraham

John points down at ordinary stones lying on the ground.

He says God could make children of Abraham out of rocks if needed.

The point is that God's family was never limited to one bloodline.

Being physically descended from Abraham was never the guarantee they assumed.

God can include whoever He chooses, by His own power.

🪨 John points to ordinary stones

👨‍👩‍👧 God's family was never one bloodline only

🚫 Physical descent was never the guarantee

📖 God includes whoever He chooses

---

## 🪓 The Axe Is Laid Unto The Root Of The Trees

A woodcutter lays the axe at the base before cutting.

This image pictures judgment as already close, not distant.

"The root" means the very foundation of a person's life.

God's coming judgment reaches deeper than outward religious performance.

Time to simply talk about repentance was running out.

🪓 The axe means judgment is close

🌳 Root means the foundation of a life

⏳ Time to merely talk was running out

📖 Judgment reaches past outward performance

---

## 🔥 Every Tree Which Bringeth Not Forth Good Fruit Is Hewn Down, And Cast Into The Fire

"Hewn down" means cut down completely, not trimmed back.

A tree is judged by the fruit it actually produces.

A fruitless tree in this picture faces total destruction.

Fire here pictures final judgment, not a small loss.

The warning closes with the clearest possible consequence.

🪓 Hewn down means cut down completely

🍎 Trees are judged by their fruit

🔥 Fire pictures final judgment here

📖 The consequence could not be clearer

# Matthew 3:11-12
# 🔥 One Mightier Is Coming
---
## 🔰 Baptize You With Water Unto Repentance

John openly admits that his own baptism is limited.

Water baptism marks a person's choice to turn from sin.

It is real, but it is only the beginning.

John wants his listeners looking past him already.

Everything he does points forward to someone greater.

💧 John's baptism marks a choice to repent

🔰 It is real but only a beginning

👀 John wants them looking past himself

📖 Everything points to someone greater

---

## 👞 He That Cometh After Me Is Mightier Than I, Whose Shoes I Am Not Worthy To Bear

Carrying someone's shoes was a task given to the lowest servant.

John says he is not even fit for that small job.

This is a shocking statement from a famous, respected preacher.

He is pointing directly at Jesus without naming him yet.

True greatness here means stepping back, not stepping forward.

👞 Carrying shoes was the lowest servant's task

🙇 John feels unfit for that task

⬆️ He points to someone far greater

📖 Greatness here means stepping back

---

## ✨ He Shall Baptize You With The Holy Ghost, And With Fire

John's baptism only used water, a physical sign of repentance.

Jesus brings an inward baptism no human leader could ever give.

The Holy Ghost is God's own Spirit coming to live within a person.

Fire here pictures both purifying and judging power.

This baptism reaches somewhere water never could.

💧 John's baptism used water only

🕊️ The Holy Ghost is God's Spirit within

🔥 Fire pictures purifying and judging power

📖 This baptism reaches deeper than water

---

## 🌬️ Whose Fan Is In His Hand, And He Will Throughly Purge His Floor

Jesus holds a farming tool most readers have never seen.

A "fan" here is used for winnowing grain, not cooling air.

"Throughly" is an old spelling of thoroughly, meaning completely.

The "floor" is a threshing floor, where grain was separated from its husk.

Jesus is pictured holding that tool, ready to separate completely.

This image sets up the two different outcomes in the next line.

🌬️ A fan was a tool for winnowing

🧹 Throughly means completely, not partly

🌾 The floor separated grain from husk

📖 Jesus is shown ready to separate

---

## 🌾 Gather His Wheat Into The Garner

Wheat here pictures those who genuinely repented and believed.

A "garner" is an old storehouse where grain was kept safe.

Grain was gathered there to be protected, not scattered or lost.

This pictures the safety kept for God's own people.

Being gathered means being welcomed in, not left outside.

🌾 Wheat pictures those who truly believed

🏚️ A garner is an old word for storehouse

🔒 Grain was gathered there to be kept

📖 Being gathered means being welcomed in

---

## 💨 Burn Up The Chaff With Unquenchable Fire

"Chaff" is the dry, worthless husk thrown off during winnowing.

Wind simply carried the light chaff away from the good grain.

Here it pictures those who rejected real repentance.

"Unquenchable" means a fire that cannot be put out.

The image closes John's warning with total, lasting judgment.

🌬️ Chaff is the worthless husk from grain

💨 Wind carried the light chaff away

🚫 It pictures rejecting real repentance

📖 Unquenchable means judgment that lasts

# Matthew 3:13-15
# 🕊️ Jesus Comes To Be Baptized
---
## 🚶 Then Cometh Jesus From Galilee To Jordan Unto John, To Be Baptized Of Him

Galilee sat a good distance north of where John was baptizing.

Jesus traveled that whole distance with one specific purpose.

He came seeking baptism, the same act he just heard John preach about.

This moment connects Jesus directly to everything in this chapter already.

Jesus steps into the story John has been preparing for.

🗺️ Galilee sat far north of the Jordan

🚶 Jesus traveled there for one purpose

💧 He came seeking baptism himself

📖 Jesus steps into what John prepared for

---

## 🛑 But John Forbad Him

John does not simply hesitate here.

He actively tries to stop what is about to happen.

"Forbad" is an old form of the word forbade.

John already recognizes that Jesus does not need what he offers.

This reaction shows John understood exactly who stood in front of him.

A servant does not usually tell his master to stop.

🛑 Forbad is an old form of forbade

✋ John tries to stop Jesus

👀 John recognizes exactly who Jesus is

📖 A servant does not stop his master

---

## 🔄 I Have Need To Be Baptized Of Thee, And Comest Thou To Me?

John says their roles should be reversed.

He believes Jesus should baptize him, not the other way around.

This question captures John's whole sense of unworthiness.

It matches his earlier words about not being fit to carry Jesus's shoes.

John's humility stays consistent from his preaching to this private moment.

🔄 John says the roles should reverse

🙇 He feels unworthy to baptize Jesus

🔗 This matches his earlier words

📖 John's humility stays consistent throughout

---

## ✅ Suffer It To Be So Now: For Thus It Becometh Us To Fulfil All Righteousness

Suffer here does not mean to endure pain.

It is an old word meaning allow or permit.

Jesus is not confessing sin like everyone else at the river.

He is choosing to identify fully with the people he came to save.

"Fulfil all righteousness" means completing everything God required, on their behalf.

Jesus steps into the water as one of us before he ever teaches a word.

✅ Suffer here means allow or permit

🤝 Jesus identifies fully with sinful people

📜 Fulfil all righteousness means completing God's requirement

📖 Jesus stands with us before he teaches

# Matthew 3:16-17
# ☁️ Heaven Opens Over The Jordan
---
## ⚡ Jesus, When He Was Baptized, Went Up Straightway Out Of The Water

Jesus does not linger in the water once he is baptized.

"Straightway" is an old word meaning immediately.

What happens next follows right on the heels of his obedience.

The timing itself connects his baptism to what heaven does next.

Obedience here opens the door to what comes right after.

⚡ Straightway means immediately

💧 Jesus did not linger in the water

🔗 His baptism connects straight to what follows

📖 Obedience opens the door to heaven's response

---

## ☁️ And, Lo, The Heavens Were Opened Unto Him

Heaven opening is a rare, dramatic image in scripture.

"Lo" is an old word used to grab the reader's attention.

It signals that something directly from God is about to happen.

This is not a quiet or ordinary moment for anyone watching.

God himself is about to respond to his Son.

👀 Lo signals something important is coming

☁️ Heaven opening is rare in scripture

⚡ It signals God is about to act

📖 God responds directly to his Son

---

## 🕊️ He Saw The Spirit Of God Descending Like A Dove

The Holy Spirit takes a visible form at this exact moment.

A dove was a familiar image of gentleness and peace.

This is not the Spirit becoming a literal bird.

It is a visible sign the people present could actually see.

God confirms Jesus publicly at the very start of his ministry.

🕊️ A dove pictured gentleness and peace

👁️ This sign was visible to onlookers

🚫 The Spirit did not become a bird

📖 God confirms Jesus at his ministry's start

---

## 🗣️ And Lo A Voice From Heaven, Saying, This Is My Beloved Son

God the Father speaks directly and audibly from heaven.

"Beloved Son" names Jesus's unique, close relationship with the Father.

This moment reveals Father, Son, and Spirit together in one scene.

Nothing like this happened at anyone else's baptism in scripture.

Heaven itself testifies to who Jesus is before his ministry even begins.

🗣️ God the Father speaks audibly here

👨‍👦 Beloved Son names their unique relationship

🕊️ Father, Son, and Spirit appear together

📖 Heaven testifies to Jesus before he begins

---

## ❤️ In Whom I Am Well Pleased

This approval comes before Jesus performs a single miracle.

It is not earned by any ministry work done yet.

God's pleasure rests on who Jesus is, not what he has done.

This same kind of approval echoes forward through the rest of the Gospel.

The chapter closes with heaven's approval resting fully on Jesus.

❤️ Approval comes before any miracle

🙌 It rests on who Jesus is

🔁 This approval echoes through the Gospel

📖 Heaven's approval rests fully on Jesus
`.trim();

export const MATTHEW_THREE_PERSONAL_SECTIONS = parseMatthewThreeRawNotes(MATTHEW_THREE_RAW_NOTES);
