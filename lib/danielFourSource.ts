export type DanielFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDanielFourRawNotes(rawText: string): DanielFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DanielFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Daniel\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Daniel 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Daniel\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Daniel\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Daniel 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Daniel 4:${startVerse}` : `Daniel 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Daniel 4 sections, received " + sections.length);
  }

  return sections;
}

const DANIEL_FOUR_RAW_NOTES = `# Daniel 4:1-3
# 👑 Nebuchadnezzar's Letter To The World
---
## 🌍 Unto All People, Nations, And Languages

Nebuchadnezzar ruled the whole Babylonian empire.

His kingdom stretched across many different peoples and tongues.

This chapter is written as his own personal letter.

He wants everyone in his empire to hear what happened to him.

👑 Nebuchadnezzar ruled many peoples

🌍 His empire spanned many languages

📜 This chapter is his own letter

📖 He wants the whole empire to hear it

## 👋 Peace Be Multiplied Unto You

This was a standard royal greeting in the ancient world.

It worked like a formal opening line, not a casual hello.

Kings often began official letters this exact way.

Nebuchadnezzar is speaking as a ruler addressing his people formally.

👋 A standard royal greeting

📜 Not a casual hello

👑 Kings opened letters this way

➡️ Nebuchadnezzar speaks formally here

## 📝 I Thought It Good To Shew The Signs And Wonders

"Shew" is an old spelling of show.

Nebuchadnezzar is choosing to make this story public himself.

A proud king admitting a personal failure was not common.

This letter is his own public testimony of what God did.

📝 Shew means show

👑 He chooses to go public

😳 Kings rarely admitted failure

📖 This becomes his own testimony

## 🙏 How Great Are His Signs, How Mighty Are His Wonders

Nebuchadnezzar already worshiped many different Babylonian gods.

Here he praises the God of Israel above them all.

This comes from a king who mocked that same God back in chapter three.

His tone has shifted completely from mockery to open praise.

🙏 He praises Israel's God here

🎭 He once mocked this same God

🔄 His tone completely reversed

➡️ Chapter three explains that mockery

## ♾️ His Kingdom Is An Everlasting Kingdom

Nebuchadnezzar just finished describing his own enormous Babylonian empire.

Now he says a greater kingdom exists that never ends.

"Generation to generation" means it will outlast every human ruler.

This whole chapter will prove exactly why he believes that now.

👑 His own empire feels enormous

♾️ God's kingdom never ends

📆 It outlasts every generation

📖 This chapter proves why he believes it

# Daniel 4:4-9
# 😨 The Dream That Troubled The King
---
## 🏰 At Rest In Mine House, And Flourishing In My Palace

Nebuchadnezzar describes his life at its most comfortable point.

He was not at war or in any obvious danger.

"Flourishing" means thriving and doing extremely well.

This peaceful moment is about to be interrupted completely.

🏰 Life felt calm and safe

🌿 Flourishing means thriving well

😌 No danger was in sight

➡️ Peace is about to break

## 😨 A Dream Which Made Me Afraid

Nebuchadnezzar already had one disturbing dream back in chapter two.

That earlier dream also needed Daniel to explain it.

Fear from a dream pushed this powerful king to act immediately.

A king who feared nothing on earth still feared this dream.

😨 A dream frightened the king

🔁 Chapter two had one too

👑 Even a mighty king feared it

📖 Dreams forced him to act

## 📜 Made I A Decree To Bring In All The Wise Men

A decree was a formal, binding royal command.

Nebuchadnezzar summoned every professional dream interpreter in Babylon at once.

This mirrors the exact same crisis from chapter two.

Once again the king needs an answer no normal adviser can give.

📜 Decree means a royal command

🧙 Every interpreter was summoned

🔁 This mirrors chapter two's crisis

➡️ No normal adviser could help

## 🔮 The Magicians, The Astrologers, The Chaldeans, And The Soothsayers

These four groups together made up Babylon's whole class of occult advisers.

Magicians performed secret arts, astrologers studied the stars for meaning.

Chaldeans were a priestly class trained in ancient Babylonian wisdom.

Soothsayers claimed to predict the future through omens.

🔮 Four kinds of occult advisers

⭐ Astrologers read meaning in stars

📚 Chaldeans trained in old wisdom

📖 All four failed this king before

## 🚫 They Did Not Make Known Unto Me The Interpretation

This is the same failure already described back in chapter two.

Babylon's entire professional class of advisers could not explain the dream.

Their repeated failure sets up why Daniel alone succeeds again.

Human wisdom keeps hitting its limit in this book.

🚫 The advisers failed again

🔁 This repeats chapter two exactly

🧠 Human wisdom hit its limit

➡️ Daniel alone will succeed

## 👀 The Spirit Of The Holy Gods

Nebuchadnezzar is a pagan king speaking from his own limited understanding.

He does not yet grasp that only one true God exists.

His own words still point toward something real in Daniel.

Even confused language can describe a genuine truth about God's presence.

👑 A pagan king speaks here

🙏 He does not know the one true God

👀 His words still point at something real

📖 Confused language can still see truth

# Daniel 4:10-12
# 🌳 The Vision Of The Great Tree
---
## 🌳 A Tree In The Midst Of The Earth

Nebuchadnezzar sees one enormous tree standing at the very center of the world.

Ancient dream imagery often used a tree to represent a kingdom or a ruler.

Placing it at the center shows how large this kingdom felt to him.

The tree is about to stand for Nebuchadnezzar himself.

🌳 One huge tree fills the vision

👑 Trees often pictured kingdoms or rulers

🌍 The center shows how large it felt

📖 The tree will represent the king himself

## 📏 The Height Thereof Reached Unto Heaven

This phrase describes a tree that seemed to touch the sky itself.

The same kind of exaggerated height described the tower of Babel long before this.

Great height in these ancient stories often signals human pride.

A tree this tall was never a modest, humble image.

📏 The tree seemed to touch the sky

🗼 Babel's tower used this same image

💔 Great height often signals pride

➡️ This was never a humble picture

## 👀 The Sight Thereof To The End Of All The Earth

Everyone everywhere could see this tree from a great distance.

Nebuchadnezzar's own fame and power reached far beyond Babylon's own borders.

His influence as king genuinely did stretch across the known world.

The image fits a real empire, not just a king's imagination.

👀 Visible from the whole earth

🌍 His fame reached far from Babylon

👑 His real power matched the image

📖 The picture fit a real empire

## 🦌 The Beasts Of The Field Had Shadow Under It

Wild animals rest and find shelter under a large shady tree.

Birds nest safely in a tree's highest branches.

This tree provided shelter and food for every living creature near it.

The image pictures a kingdom that many different peoples depend on.

🦌 Animals sheltered under its shade

🐦 Birds nested in its branches

🍎 It fed every creature nearby

➡️ Many peoples depended on this kingdom

# Daniel 4:13-17
# 📢 The Watcher's Decree
---
## 👁️ A Watcher And An Holy One Came Down From Heaven

A watcher names a type of heavenly being that observes events on earth.

Many scholars believe this described an angel sent with a message.

This figure comes with real authority straight from heaven itself.

The dream is about to shift from a picture into a command.

👁️ Watcher means a heavenly observer

👼 Many scholars see this as an angel

👑 Real authority came with the message

➡️ The dream turns into a command

## 🪓 Hew Down The Tree, And Cut Off His Branches

"Hew" means to chop or cut down with force.

The tree that pictured Nebuchadnezzar's kingdom is ordered destroyed.

Every part of the tree's glory gets stripped away piece by piece.

Leaves, fruit, and branches all vanish in this one command.

🪓 Hew means to chop down

🌳 The king's own picture is destroyed

🍃 Every part of its glory strips away

📖 Nothing of the tree's glory remains

## 🌱 Leave The Stump Of His Roots In The Earth

The roots are not destroyed along with the rest of the tree.

A stump left in the ground can still grow again later.

This detail hints that the judgment coming will not be permanent.

Mercy is already built into the decree before the punishment even starts.

🌱 The roots are left alive

🪵 A stump can regrow later

⏳ The judgment is not permanent

📖 Mercy is built in from the start

## 🧠 Let His Heart Be Changed From Man's

"Heart" here means the mind, not just the emotions.

Nebuchadnezzar's own thinking and reasoning will be taken from him.

A beast's heart replacing it means acting without human understanding.

This is the exact punishment about to strike the king himself.

🧠 Heart means the mind here

🐂 A beast's mind replaces his own

🚫 Human understanding will be removed

➡️ This punishment targets the king directly

## 🔢 Seven Times Pass Over Him

"Seven times" most likely means seven full years of this condition.

Many scholars treat this as a literal length of time.

Seven also often marks completeness throughout the Bible.

A full measure of time was set before any mercy returns.

🔢 Seven times likely means seven years

📏 Many scholars read it as literal

✅ Seven often marks completeness

📖 A full measure was set in advance

## 👑 That The Most High Ruleth In The Kingdom Of Men

This single line states the whole point of everything about to happen.

Nebuchadnezzar believed his own power built his kingdom.

God is about to prove that He appoints every ruler on earth.

Even the basest of men can be lifted up by God's choice.

👑 God rules every human kingdom

🏗️ Nebuchadnezzar credited his own power

✅ God is about to prove otherwise

📖 God can lift up anyone He chooses

# Daniel 4:18-23
# 🗣️ Daniel Hears The Dream
---
## 🙅 Forasmuch As All The Wise Men Of My Kingdom Are Not Able

Nebuchadnezzar openly admits that every other adviser already failed him.

He names Daniel as his last and only remaining hope.

This is a humble admission from a proud and powerful king.

The king's own words set up exactly how Daniel will succeed.

🙅 Every other adviser already failed

🙏 Daniel is named as the last hope

👑 A proud king admits he needs help

➡️ Daniel's success is set up here

## 😮 Daniel Was Astonied For One Hour

"Astonied" means utterly shocked or stunned, an old form of astonished.

Daniel understood the dream's meaning the moment he heard it.

He hesitates because the interpretation means terrible news for the king.

A loyal servant can still dread delivering bad news to his ruler.

😮 Astonied means utterly shocked

🧠 Daniel understood it instantly

😟 The news he had was terrible

➡️ Even loyal servants dread bad news

## 👑 Let Not The Dream Trouble Thee

Nebuchadnezzar notices Daniel's hesitation and tries to comfort him first.

This shows an unexpected moment of gentleness from this powerful king.

The king senses something serious is coming before Daniel even speaks.

Even Nebuchadnezzar can read fear on another person's face.

👑 The king tries to comfort Daniel

🤝 An unexpected moment of gentleness

😨 He senses bad news coming

📖 Even kings can read another's fear

## 💔 The Dream Be To Them That Hate Thee

Daniel wishes the bad news belonged to the king's enemies instead.

This line shows real compassion before Daniel says one hard word.

Daniel is not eager to deliver this message at all.

Kindness comes first, even though the truth will not change.

💔 Daniel wishes this on enemies instead

🙏 Real compassion comes before the truth

😟 Daniel is not eager to speak

➡️ Kindness comes before the hard truth

## 🌳 It Is Thou, O King

Daniel finally names Nebuchadnezzar as the tree from the vision.

There is no softening this part of the interpretation any further.

The king himself is the one about to be judged.

Daniel delivers the hardest line as plainly as possible.

🌳 The king himself is the tree

👑 Nebuchadnezzar is named directly

⚖️ He is the one being judged

📖 Daniel states it as plainly as possible

## 🔁 A Watcher And An Holy One Coming Down From Heaven

Daniel repeats the vision back to the king in his own words.

Repeating it confirms Daniel understood every detail correctly before explaining it.

Nothing about the vision gets softened or changed in the retelling.

The full weight of the judgment is about to be explained.

🔁 Daniel repeats the vision exactly

✅ This confirms he understood it fully

🚫 Nothing is softened in the retelling

➡️ The judgment's weight is about to land

# Daniel 4:24-27
# ⚖️ Daniel's Warning And Counsel
---
## 📜 This Is The Decree Of The Most High

Daniel makes clear this judgment does not come from himself.

The sentence was decided by God, not invented by any human adviser.

Daniel is only the messenger delivering someone else's decision.

This distinction protects Daniel from seeming to judge the king himself.

📜 The decree comes from God

🗣️ Daniel is only the messenger

🚫 This is not Daniel's own judgment

➡️ Daniel delivers someone else's decision

## 🏰 Thy Dwelling Shall Be With The Beasts Of The Field

Nebuchadnezzar will be driven out of his own palace entirely.

Living among wild animals strips away every mark of royal dignity.

"Eat grass as oxen" means living like a grazing farm animal.

The most powerful man in the world will lose all human comfort.

🏰 He loses his own palace

🐂 Eat grass means acting like livestock

🦌 He will live among wild animals

📖 Total power becomes total loss

## 🎯 Till Thou Know That The Most High Ruleth

The punishment has one clear purpose, not endless cruelty.

It lasts exactly until Nebuchadnezzar learns this one lesson.

Once that lesson truly lands, the suffering is designed to end.

God's discipline here aims at correction, not permanent destruction.

🎯 The punishment has one clear goal

📚 It lasts until the lesson lands

⏳ Suffering here is not endless

📖 Discipline aims at correction, not ruin

## 🌱 Thy Kingdom Shall Be Sure Unto Thee

The stump left in the ground back in verse fifteen now matters.

Nebuchadnezzar's throne will still be waiting for him after this ends.

Mercy was built into the sentence from the very beginning.

Judgment and mercy sit side by side in this same decree.

🌱 The stump from verse fifteen returns

👑 His throne will still be waiting

🤝 Mercy was planned from the start

📖 Judgment and mercy sit together here

## 🛑 Break Off Thy Sins By Righteousness

Daniel does not just predict the future, he gives real counsel.

"Break off" means to stop a practice completely and immediately.

Showing mercy to the poor is named as a specific, concrete action.

Daniel offers the king one real chance to avoid what comes next.

🛑 Break off means stop completely

🙏 Righteousness and mercy are named directly

💰 Mercy to the poor is specific

➡️ Daniel offers a real chance to change

## 😌 A Lengthening Of Thy Tranquillity

"Tranquillity" means a calm, settled, undisturbed peace.

Daniel is not promising the judgment can be avoided entirely.

He is only offering a possible delay if the king listens.

Even that smaller mercy would be worth taking seriously.

😌 Tranquillity means calm, settled peace

⏳ Daniel only offers a possible delay

🚫 He never promises full avoidance

📖 Even a delay was worth taking

# Daniel 4:28-33
# 🦅 The Judgment Falls
---
## 📆 At The End Of Twelve Months

A full year passed between Daniel's warning and this exact moment.

Nebuchadnezzar had an entire year to take Daniel's counsel seriously.

Twelve months of normal life may have let the warning fade.

Comfort has a way of making a warning feel distant.

📆 A full year passed quietly

⏳ The king had time to listen

😌 Comfort may have dulled the warning

➡️ The year ends with no change

## 👑 Is Not This Great Babylon That I Have Built

Nebuchadnezzar credits his own power and might for everything he built.

No mention of God appears anywhere in this proud boast.

This single sentence is the exact pride Daniel's counsel warned against.

Pride spoken out loud becomes the final trigger for judgment.

👑 He credits only his own power

🚫 God gets no mention here

💔 This is the pride Daniel warned about

➡️ Pride becomes the final trigger

## 🗣️ While The Word Was In The King's Mouth

Judgment strikes in the exact middle of Nebuchadnezzar's own boast.

He does not even finish the sentence before the voice interrupts.

Timing this precise could not be an accident.

God answers pride at the very moment it is spoken.

🗣️ Judgment strikes mid sentence

⏱️ He never finishes the boast

🎯 This timing was no accident

📖 God answers pride the moment it speaks

## 🗣️ The Kingdom Is Departed From Thee

A voice from heaven announces the sentence has now begun.

This is the exact fulfillment of the dream from years earlier.

Everything Daniel warned about now becomes immediate reality.

The delay granted in verse twenty seven has fully run out.

🗣️ A heavenly voice announces the sentence

🔁 This fulfills the original dream

⏳ The earlier delay has run out

➡️ Warning becomes immediate reality

## ⚡ The Same Hour Was The Thing Fulfilled

There is no gradual decline here, only instant transformation.

Nebuchadnezzar loses his mind and his dignity in one single moment.

The most powerful man on earth becomes like an animal instantly.

Nothing in this chapter moves as fast as this one verse.

⚡ The change happens instantly

👑 The most powerful man falls fastest

🐂 He becomes like an animal at once

📖 Nothing else moves this fast

## 🦅 His Hairs Were Grown Like Eagles' Feathers, And His Nails Like Birds' Claws

Nebuchadnezzar's own body changes to match his new, beastlike condition.

Living outdoors untended for years would naturally produce hair and nails like this.

The description paints a picture of complete, visible neglect.

A king once dressed in royal robes now looks wild and unrecognizable.

🦅 His hair grows long and wild

🦶 His nails grow long like claws

🌳 Years outdoors explain the change

➡️ A king now looks unrecognizable

# Daniel 4:34-37
# 🙌 Nebuchadnezzar's Restoration And Praise
---
## 🔢 At The End Of The Days

Daniel's seven times from the dream have now fully run their course.

The set length of discipline reaches its exact, appointed end.

Nothing about this judgment lasted one moment longer than planned.

The mercy promised back in the stump detail finally arrives.

🔢 Seven times reach their end

📏 Discipline lasted its appointed length

⏳ Not one moment longer than planned

📖 The promised mercy finally arrives

## 🧠 Mine Understanding Returned Unto Me

Nebuchadnezzar's human mind comes back exactly as suddenly as it left.

The restoration matches the sudden judgment from verse thirty three.

His first action with a clear mind is turning toward heaven.

What he does first reveals what the whole ordeal actually taught him.

🧠 His mind returns suddenly

🔁 This matches the sudden judgment

👀 He turns to heaven immediately

➡️ His first act reveals the lesson learned

## 🔁 His Dominion Is An Everlasting Dominion

This is the exact same phrase Nebuchadnezzar used back in verse three.

He opened this letter with this truth and now closes with it proven.

The whole chapter exists to turn one claim into lived experience.

A truth stated in words becomes a truth tested and confirmed.

🔁 This repeats his own opening line

📖 The chapter proves what he first claimed

✅ Words become tested, lived experience

➡️ Belief becomes something fully confirmed

## ✋ None Can Stay His Hand

"Stay" here means to stop or hold back, not remain.

No human power anywhere, not even Nebuchadnezzar's, can resist God's will.

This is the hardest lesson a proud king could ever learn.

Only losing everything first could teach him to say it honestly.

✋ Stay means stop or hold back

🚫 No human power can resist God

👑 This is the hardest lesson for a king

📖 Only loss could teach it honestly

## 👑 My Counsellors And My Lords Sought Unto Me

Nebuchadnezzar does not just recover his mind, he recovers his throne too.

His own advisers and nobles welcome him back as their rightful king.

Nothing about his years long absence cost him his kingdom permanently.

The mercy from the stump promise reaches its full and complete fulfillment.

👑 His throne is fully restored

🤝 His own advisers welcome him back

🌱 The stump promise is fulfilled

📖 Mercy reaches its full completion

## 📉 Those That Walk In Pride He Is Able To Abase

"Abase" means to bring low or humble completely.

Nebuchadnezzar ends his own letter naming the exact lesson God taught him.

Pride was the cause, and humbling was the cure, for this entire chapter.

A king who once boasted now warns others instead.

📉 Abase means to bring low

👑 Pride caused his whole ordeal

💊 Humbling was the actual cure

➡️ A proud king now warns others
`.trim();

export const DANIEL_FOUR_PERSONAL_SECTIONS = parseDanielFourRawNotes(DANIEL_FOUR_RAW_NOTES);
