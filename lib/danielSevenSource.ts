export type DanielSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDanielSevenRawNotes(rawText: string): DanielSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DanielSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Daniel\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Daniel 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Daniel\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Daniel\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Daniel 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Daniel 7:${startVerse}` : `Daniel 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Daniel 7 sections, received " + sections.length);
  }

  return sections;
}

const DANIEL_SEVEN_RAW_NOTES = `# Daniel 7:1-3
# 😴 A Dream Of Four Beasts
---
## 👑 In The First Year Of Belshazzar King Of Babylon

Belshazzar was one of the last kings to rule Babylon.

He reigned years after Nebuchadnezzar had already died.

This vision actually happens earlier in Daniel's life than the feast in chapter five.

Daniel is not arranged in strict time order.

Events jump backward and forward to group similar ideas together instead.

👑 Belshazzar ruled Babylon near its end

📆 He reigned after Nebuchadnezzar died

🔀 Daniel jumps around in time

📖 This vision predates chapter five's feast

## ✍️ Then He Wrote The Dream

Daniel does not just remember this dream.

He writes it down himself, word for word.

Starting here, the book shifts from stories about Daniel to Daniel speaking in his own voice.

That shift signals this vision matters enough to preserve exactly as it happened.

✍️ Daniel personally wrote the dream

🔄 The book shifts to his own words

📜 This marks a turning point in Daniel

➡️ The vision needed exact preservation

## 💨 The Four Winds Of The Heaven Strove

Winds in this kind of vision usually stand for something bigger than weather.

Four winds covering every direction pictures a disturbance touching the whole world.

Strove means they clashed violently against each other.

This chaos sets the stage before any beast even appears.

💨 Four winds means every direction

🌍 The disturbance covers the whole world

⚔️ Strove means violent clashing

➡️ Chaos comes before the beasts appear

## 🌊 Upon The Great Sea

The sea here does not mean an actual body of water.

In this kind of vision, the sea pictures the restless and chaotic world of nations.

The four winds just stirred that sea into violent motion.

Whatever comes up next is about to rise out of that chaos.

🌊 The sea pictures the nations

🌀 It stands for chaos, not water

💨 The winds stirred it violently

➡️ Something is about to rise from it

## 🐾 Four Great Beasts Came Up From The Sea, Diverse One From Another

Each beast in this vision stands for a whole kingdom, not a single animal.

Four beasts rising means four kingdoms rising, one after another.

Diverse one from another means each kingdom looks and acts completely differently.

No two empires in this vision share the same character.

🐾 A beast here means a kingdom

🔢 Four beasts means four kingdoms

🎭 Each kingdom looks totally different

📖 No two empires share one character

# Daniel 7:4-6
# 🐾 Three Strange Beasts Rise
---
## 🦁 Like A Lion, And Had Eagle's Wings

A lion with wings was a familiar image in ancient Babylon.

Winged lion statues guarded the gates and palaces there.

Many scholars believe this first beast pictures Babylon itself.

A lion stands for raw strength, and wings add incredible speed.

🦁 Lion pictures raw royal strength

🦅 Wings add incredible speed

🏛️ Winged lions guarded Babylon's gates

📖 Many scholars link this to Babylon

## ✂️ I Beheld Till The Wings Thereof Were Plucked

Plucked wings means the beast suddenly loses its speed and power.

Daniel already watched this exact kind of fall happen to a king.

In chapter four, Nebuchadnezzar lost his mind and lived like an animal for a season.

This picture may be replaying that same humiliation.

✂️ Plucked wings means lost power

👑 This echoes Nebuchadnezzar's fall

🐂 Chapter four already showed this

📖 Great power can be stripped suddenly

## 🧍 Made Stand Upon The Feet As A Man, And A Man's Heart Was Given To It

The beast is lifted up and set standing like a human being.

A man's heart being given to it means it receives human understanding, not animal instinct.

Nebuchadnezzar's story in chapter four ends the exact same way, his mind restored to him.

Even the proudest king can have his understanding returned by God.

🧍 Standing like a man means restored dignity

🧠 A man's heart means human understanding

🔁 This matches Nebuchadnezzar's own restoration

➡️ God can restore what pride destroyed

## 🐻 Like To A Bear, And It Raised Up Itself On One Side

A bear pictures a slower but far more crushing kind of power than a lion.

Many scholars connect this second beast to the Medo Persian empire.

Raised up on one side may picture Persia holding more power than Media within that empire.

Together the two peoples ruled as one combined kingdom.

🐻 A bear pictures crushing strength

🤝 Medo and Persia ruled together

⚖️ Persia likely held the greater power

📖 Many link this bear to that empire

## 🦴 Three Ribs In The Mouth Of It Between The Teeth

Ribs in the beast's mouth means it has already devoured something and still holds the remains.

Many scholars connect the three ribs to three regions that empire conquered.

The exact three are not named in the text itself.

The picture itself is clear even without pinning down every detail.

🦴 Ribs show past conquests still held

🌍 Possibly three conquered regions

❓ The text does not name them

➡️ The picture of conquest stays clear

## 🗣️ Arise, Devour Much Flesh

This command pushes the bear to keep conquering instead of resting.

Devour much flesh pictures continued, aggressive expansion.

The bear does not choose this path on its own, it is told to take it.

Even a brutal empire's rise unfolds under a larger plan it cannot see.

🗣️ A command pushes it to conquer

🍖 Devour flesh means more conquest

🎯 The bear does not choose this alone

📖 Empires rise within a larger plan

## 🐆 Like A Leopard, Which Had Upon The Back Of It Four Wings Of A Fowl

A leopard already moves with remarkable speed on its own.

Four wings on its back make this beast faster still.

Many scholars connect this third kingdom to Greece under Alexander the Great.

Alexander's conquests moved across huge distances in a strikingly short time.

🐆 A leopard already moves fast

🪽 Four wings make it faster still

⚔️ Many link this to Alexander's Greece

📖 Its conquests moved at shocking speed

## 👥 The Beast Had Also Four Heads

Four heads on one beast pictures one kingdom splitting into four separate pieces.

After Alexander the Great died, his generals divided his empire exactly that way.

Four heads ruling instead of one often means a kingdom weakening even while it keeps on existing.

The empire survives, but it no longer moves as a single unified power.

👥 Four heads means four rulers

⚰️ Alexander's death split his empire

🧩 Division often weakens a kingdom

➡️ It survives but no longer unified

## 👑 Dominion Was Given To It

Dominion was given, not dominion was seized.

That small detail matters more than it looks.

Every beast in this vision rules only because permission was granted from above.

No empire in this chapter holds real power on its own terms.

👑 Given means permitted, not seized

🙏 Power comes from a higher authority

🚫 No empire rules on its own terms

📖 God permits every kingdom's rise

# Daniel 7:7-8
# 😱 The Dreadful Fourth Beast
---
## 😨 Dreadful And Terrible, And Strong Exceedingly

Three separate words pile up here on purpose.

Dreadful, terrible, and strong exceedingly push past anything said about the first three beasts.

This fourth kingdom is not simply another empire in the same category.

It is something worse than anything that came before it.

😨 Three words stack up its horror

📈 It exceeds every beast before it

🆕 It is not simply another empire

➡️ Something worse has now arrived

## 🦾 It Had Great Iron Teeth

Iron pictures a harsher, more crushing power than the lion, bear, or leopard showed.

This same metal already appeared in Daniel's very first vision, the statue made of different materials in chapter two.

Iron there also stood for a uniquely strong and crushing kingdom.

Two different visions in Daniel point toward this same kind of brutal strength.

🦾 Iron means crushing, brutal strength

🗿 Chapter two's statue also used iron

🔁 Two visions point to the same kingdom

📖 Iron always pictures crushing power here

## 🆚 Diverse From All The Beasts That Were Before It

This beast does not get compared to a familiar animal at all.

Lion, bear, and leopard were each recognizable creatures.

This fourth beast has no clean animal comparison, because its character goes beyond any of them.

Some kinds of power are simply too destructive to picture with an ordinary animal.

🆚 No animal comparison fits this one

🦁 The first three had clear animal pictures

💥 Its power goes beyond ordinary categories

📖 Some evil defies an easy comparison

## 🔟 It Had Ten Horns

A horn in this kind of vision pictures a ruler or a king, not an animal part.

Ten horns means ten separate rulers connected to this one kingdom.

These rulers do not all appear at the same moment in history.

They rise out of this same kingdom over time, one after another.

🔟 Ten horns means ten rulers

👑 A horn pictures a king here

⏳ These rulers rise over time

➡️ One kingdom, many rulers to come

## 🔍 There Came Up Among Them Another Little Horn

This little horn is not one of the original ten rulers.

It rises up afterward, among them, and starts out smaller than the rest.

Small beginnings do not stay small for long in this vision.

This single ruler becomes the main focus of the rest of the chapter.

🔍 A new ruler rises among the ten

🌱 It starts out small

📈 It grows far beyond its start

➡️ This ruler becomes the chapter's focus

## 🌳 Before Whom There Were Three Of The First Horns Plucked Up By The Roots

Plucked up by the roots means completely removed, not simply pushed aside.

This little horn forcibly takes down three of the original ten rulers.

That is how it grows from small to powerful so quickly.

Its rise comes at the cost of other rulers' complete downfall.

🌳 Plucked by roots means fully removed

⚔️ Three rulers are forcibly taken down

📈 This is how it grows powerful

📖 Its rise costs others everything

## 👁️ In This Horn Were Eyes Like The Eyes Of Man, And A Mouth Speaking Great Things

Eyes like a man's picture sharp intelligence and constant watching.

This ruler is calculating, not simply brutal.

A mouth speaking great things pictures loud, boastful claims about itself.

Both details return later in the chapter, when this same ruler turns its words directly against God.

👁️ Eyes picture sharp, watchful intelligence

🗣️ A boastful mouth makes great claims

🧠 This ruler is calculating, not simple

➡️ Both details return later in the chapter

# Daniel 7:9-10
# 👴 The Ancient Of Days
---
## 🪑 I Beheld Till The Thrones Were Cast Down

The scene suddenly shifts away from the beasts entirely.

Thrones cast down pictures earthly power being removed to make room for something higher.

Every kingdom pictured so far has been operating underneath this larger reality.

A heavenly courtroom is about to open.

🪑 Earthly thrones get removed here

🔀 The scene shifts away from the beasts

⬆️ A higher reality is revealed

➡️ A heavenly courtroom is opening

## 👴 The Ancient Of Days Did Sit

Ancient of days is a title for God, emphasizing that he has always existed.

Every beast in this vision rose recently and will fall just as quickly.

This title stands in direct contrast to all of that passing power.

God was never one more kingdom rising out of the sea.

👴 Ancient of days means eternally existing

⏳ Every beast rose and will fall

🆚 This title contrasts with all of them

📖 God was never another passing kingdom

## ❄️ Whose Garment Was White As Snow, And The Hair Of His Head Like The Pure Wool

White clothing and white hair both picture complete purity in this kind of vision.

Nothing here is stained or mixed with corruption.

White hair can also picture deep wisdom and great age.

Both pictures describe the same throne from two different angles.

❄️ White pictures complete purity

🧓 White hair pictures deep wisdom

🚫 Nothing here is stained or mixed

📖 Purity and wisdom describe one throne

## 🔥 His Throne Was Like The Fiery Flame, And His Wheels As Burning Fire

A throne with wheels pictures a seat that is not stuck in one place.

Fire pictures overwhelming power and holy judgment.

A prophet named Ezekiel saw a very similar throne on wheels in his own vision.

God's presence in these visions is never confined to a single fixed location.

🔥 Fire pictures power and judgment

🛞 Wheels mean the throne can move

📖 Ezekiel saw a similar throne

➡️ God's presence is never confined

## 🌊 A Fiery Stream Issued And Came Forth From Before Him

A river of fire flowing from the throne pictures judgment actively moving outward.

This is not a static scene.

Power and judgment pour out from God's presence in real motion.

The throne itself seems to be in constant action.

🌊 Fire flows outward from the throne

⚡ Judgment moves, it does not sit still

🔥 Power pours out in motion

➡️ This throne is constantly active

## 👼 Thousand Thousands Ministered Unto Him, And Ten Thousand Times Ten Thousand Stood Before Him

These numbers describe a crowd too large to actually count.

Thousand thousands alone would already mean a million beings.

Ten thousand times ten thousand adds an even larger number standing ready.

No earthly kingdom pictured earlier in this chapter commands anything close to that size.

👼 These numbers describe a vast crowd

🔢 A million or more beings serve

📈 Even larger numbers stand ready

📖 No earthly kingdom compares to this

## 📚 The Judgment Was Set, And The Books Were Opened

This phrase pictures a formal courtroom opening for business.

Books here represent records, the kind kept to settle accounts honestly.

Every kingdom pictured so far is about to be weighed against those records.

Nothing that happened among the beasts was ever happening unseen.

📚 Books picture official records

⚖️ Judgment set means court is opening

👀 Nothing happened unseen

📖 Every kingdom faces this record

# Daniel 7:11-12
# 🔥 The Beast Is Destroyed
---
## 👂 I Beheld Then Because Of The Voice Of The Great Words Which The Horn Spake

Daniel's attention snaps back toward the little horn's boasting.

The heavenly courtroom scene was not disconnected from the beasts after all.

That arrogant voice is exactly what draws the court's attention too.

Boastful words do not go unnoticed in this vision.

👂 Daniel's focus returns to the horn

🗣️ Its boasting draws attention

⚖️ The court responds to that voice

➡️ Arrogant words do not go unnoticed

## 🔥 The Beast Was Slain, And His Body Destroyed, And Given To The Burning Flame

This fourth beast does not simply lose power like the others will.

It is killed outright and its body is destroyed completely.

Fire finishes what judgment already decided.

This is total defeat, not a gradual decline.

🔥 The beast is killed outright

💀 Its body is fully destroyed

⚡ Fire carries out the judgment

📖 This is total defeat, not decline

## ⏳ As Concerning The Rest Of The Beasts, They Had Their Dominion Taken Away: Yet Their Lives Were Prolonged For A Season And Time

The first three beasts do not get destroyed the same way the fourth one does.

They lose their power, but they are not killed outright.

Their lives get prolonged for a season and a time instead.

Power often fades slowly, long before an empire fully disappears.

⏳ Earlier beasts are not killed outright

📉 They lose power gradually instead

🔁 Their decline takes a season of time

📖 Empires often fade before they vanish

# Daniel 7:13-14
# 👤 One Like The Son Of Man
---
## 👤 One Like The Son Of Man Came With The Clouds Of Heaven

Son of man simply means a human being in most places it is used.

Here it describes a figure who looks human but arrives riding on the clouds.

Clouds in scripture usually mark God's own arrival, not a human one.

Jesus later takes this exact title for himself in the Gospels.

He uses it specifically to claim the authority this vision describes.

👤 Son of man usually means a human

☁️ Clouds here mark divine arrival

🙌 Jesus later claims this title himself

📖 He claims the authority shown here

## 🚶 Came To The Ancient Of Days, And They Brought Him Near Before Him

This figure is not judged and destroyed like the beasts were.

He is brought near, welcomed directly into God's own presence.

That single difference separates him from every beast in this entire vision.

He approaches the throne instead of standing against it.

🚶 He is brought near, not judged

🆚 This separates him from the beasts

🤝 He approaches instead of opposing

➡️ Welcome, not judgment, meets him here

## 👑 There Was Given Him Dominion, And Glory, And A Kingdom

Dominion was given to the leopard too, back in verse six.

That dominion was limited and eventually taken away.

This dominion comes with glory and a kingdom added to it.

Nothing in this vision ever takes it back.

👑 Dominion was also given to the leopard

⏳ That earlier dominion did not last

✨ Glory and a kingdom are added here

📖 This dominion is never taken back

## 🌍 That All People, Nations, And Languages, Should Serve Him

This exact phrase already described earthly kings earlier in Daniel.

Nebuchadnezzar demanded this same kind of universal service back in chapter three.

Now the identical phrase describes service owed to this heavenly figure instead.

True universal worship belongs to him, not to any earthly throne.

🌍 This phrase describes universal service

👑 Nebuchadnezzar once demanded the same thing

🔁 The same words now point higher

📖 True worship belongs to him alone

## ♾️ His Dominion Is An Everlasting Dominion, Which Shall Not Pass Away

Every beast kingdom pictured earlier eventually passed away.

This dominion is described with the opposite word on purpose.

Everlasting means it never ends, never fades, and never gets replaced.

That is the one kingdom in this whole vision that actually lasts.

♾️ Everlasting means it never ends

⏳ Every beast kingdom eventually passed

🆚 This dominion is the opposite

📖 Only this kingdom truly lasts

# Daniel 7:15-18
# ❓ Daniel Asks For The Meaning
---
## 😟 I Daniel Was Grieved In My Spirit In The Midst Of My Body, And The Visions Of My Head Troubled Me

Daniel does not react to this vision with calm curiosity.

Grieved in my spirit describes real, heavy distress.

Seeing heaven's power is reassuring on its own.

The beasts and the little horn are still deeply disturbing.

Even a faithful prophet can feel shaken by what God shows him.

😟 Daniel reacts with real distress

💭 The vision troubles him deeply

⚖️ Reassurance and fear sit together here

📖 Even prophets can feel shaken

## 👼 I Came Near Unto One Of Them That Stood By, And Asked Him

Them that stood by refers to the attendants Daniel just saw serving in the heavenly court.

Daniel does not guess at the meaning on his own.

He goes straight to someone who can actually explain it.

Asking for understanding is treated as the right response here, not a failure of faith.

👼 These are the court's own attendants

🙋 Daniel asks instead of guessing

✅ Asking is the right response

➡️ He seeks real understanding, not silence

## 🔑 These Great Beasts, Which Are Four, Are Four Kings

The attendant gives Daniel the key to the entire vision in one short sentence.

Beasts stands for kings, meaning kingdoms and their rulers together.

Arise out of the earth connects back to the sea these beasts rose from in verse three.

Every strange detail in this vision now has a clear starting point.

🔑 This sentence unlocks the whole vision

🐾 Beasts means kings or kingdoms

🌍 The earth echoes the earlier sea

📖 Every detail now has a starting point

## 🙌 The Saints Of The Most High Shall Take The Kingdom, And Possess The Kingdom For Ever

Saints here means God's own faithful people, not a small, specially honored group.

This is the first time this chapter mentions them directly.

Every kingdom so far has belonged to beasts or to God alone.

Now God's own people are named as the ones who receive it permanently.

🙌 Saints means God's faithful people

🆕 This is their first mention here

👑 They receive what no beast kept

📖 This kingdom is given permanently

# Daniel 7:19-22
# 🔎 The Truth About The Fourth Beast
---
## 🎯 Then I Would Know The Truth Of The Fourth Beast

Daniel already received a general explanation in verse seventeen.

That answer does not satisfy him.

He wants specific detail about the single most frightening beast in the vision.

Sometimes the general answer is not enough, and asking again is not a lack of faith.

🎯 Daniel wants more specific detail

📋 A general answer was not enough

🦾 The fourth beast concerns him most

➡️ Asking again is not a lack of faith

## 🦾 Whose Teeth Were Of Iron, And His Nails Of Brass

Nails of brass is a brand new detail not mentioned the first time this beast appeared.

Brass adds a second harsh metal to the iron teeth already described.

Both metals picture a crushing, grinding kind of destruction.

This beast tears apart everything in its path, with nothing soft about it.

🦾 Brass adds a second harsh metal

🔩 Nails of brass is new detail

💥 Both metals picture crushing destruction

📖 Nothing about this beast is soft

## 🔟 Of The Ten Horns That Were In His Head, And Of The Other Which Came Up

Daniel focuses his question specifically on the ten horns and the little horn among them.

He already knows horns mean rulers from the interpretation just given.

What he wants now is the fuller story behind this one particular ruler.

The rest of this section answers exactly that request.

🔟 Daniel asks about the ten horns

🔍 He wants the fuller story

👑 One ruler concerns him most

➡️ The rest of the vision answers him

## 💪 Whose Look Was More Stout Than His Fellows

Stout here is an old word for bold and imposing, not a comment on size.

This ruler visibly stands out from the other nine horns around him.

His appearance alone already signals that he has become the dominant one.

Power often shows itself on the outside before it is ever proven in action.

💪 Stout means bold and imposing

👑 He visibly outranks the other horns

👀 His appearance signals dominance

📖 Power often shows before it acts

## ⚔️ The Same Horn Made War With The Saints, And Prevailed Against Them

This detail was not mentioned the first time the little horn appeared.

Now Daniel learns this ruler actively attacks God's own people.

Prevailed against them means the attack actually succeeds, at least for a time.

This explains exactly why this vision troubled Daniel so deeply.

⚔️ This horn attacks God's people

📈 The attack actually succeeds for a time

🆕 This detail is new information here

📖 This explains Daniel's deep distress

## ⏳ Until The Ancient Of Days Came, And Judgment Was Given To The Saints Of The Most High

The horn's victory over the saints is never described as final.

Until marks a clear turning point coming later.

The same heavenly court already pictured earlier in the chapter steps in and reverses it.

Judgment given to the saints means they end up on the winning side after all.

⏳ Until marks a clear turning point

⚖️ The heavenly court steps in

🔄 The outcome gets reversed

📖 The saints end up on the winning side

# Daniel 7:23-25
# 😈 The Little Horn's War On The Saints
---
## 🆚 The Fourth Beast Shall Be The Fourth Kingdom Upon Earth, Which Shall Be Diverse From All Kingdoms

The attendant now confirms directly what the symbol meant all along.

The fourth beast is a real kingdom, not only a frightening picture.

Diverse from all kingdoms repeats the same point made back in verse seven.

Its destructive scale sets it apart from every empire before it.

🆚 This beast equals a real kingdom

🔁 This repeats the point from verse seven

💥 Its scale sets it apart

📖 No earlier kingdom matched its reach

## 🔟 The Ten Horns Out Of This Kingdom Are Ten Kings That Shall Arise

The interpretation confirms what Daniel likely already suspected.

Horns mean kings, and these ten rise up out of this one kingdom specifically.

They do not come from outside it.

This kingdom eventually produces its own long line of rulers.

🔟 Ten horns equal ten future kings

🏰 They rise from within this kingdom

🚫 They do not come from outside

➡️ One kingdom produces many rulers

## 👑 He Shall Be Diverse From The First, And He Shall Subdue Three Kings

This repeats and confirms the detail already pictured back in verse eight.

Diverse from the first means this ruler stands apart from the other nine.

Subdue three kings confirms he forcibly takes down three of the original rulers.

Two different parts of this chapter agree on the exact same details.

👑 This ruler stands apart from the rest

⚔️ He forcibly subdues three kings

🔁 This confirms the picture from verse eight

📖 Two parts of the vision agree exactly

## 🗣️ He Shall Speak Great Words Against The Most High

This ruler's boastful mouth from verse eight now has an actual target.

His great words are not just arrogance in general.

They are spoken directly against God himself.

This is open blasphemy, not simply pride.

🗣️ His boasting now has a target

🆙 The target is God himself

💔 This is open blasphemy

➡️ Pride turns into direct rebellion

## 😓 And Shall Wear Out The Saints Of The Most High

Wear out pictures ongoing, grinding pressure rather than one single attack.

This persecution drags on over time instead of ending quickly.

Exhaustion itself becomes part of the weapon used against God's people.

Faith under this kind of pressure is tested by endurance, not just by a single moment.

😓 Wear out means grinding pressure

⏳ This persecution drags on over time

💪 Endurance becomes the real test

📖 Faith is tested over time, not once

## 📅 Think To Change Times And Laws

This ruler attempts to rewrite the sacred calendar and religious law itself.

That kind of control reaches into the most personal, deeply held parts of faith.

Controlling worship and holy days is not a small political move.

It is an attempt to take God's own place as the authority over sacred time.

📅 He tries to rewrite sacred time

📜 He attempts to rewrite holy law

🎯 This targets deeply held faith

📖 He claims authority that belongs to God

## ⏱️ A Time And Times And The Dividing Of Time

This strange phrase adds up to one, plus two, plus a half.

Many scholars read that total as three and a half years.

The exact same odd phrase shows up again much later, in Revelation.

The precise meaning stays debated, but the phrase marks a limited, set period, not forever.

⏱️ One plus two plus a half adds up

📆 Many read this as three and a half

🔁 The same phrase returns in Revelation

📖 This marks a limited, not endless, period

# Daniel 7:26-28
# 👑 The Kingdom Given Forever
---
## ⚖️ The Judgment Shall Sit, And They Shall Take Away His Dominion

No matter how powerful this ruler becomes, his reign still comes to a complete end.

The same heavenly court pictured earlier in the chapter makes the final call.

Consume and destroy unto the end means nothing of his power survives this judgment.

The most frightening ruler in the whole vision does not get the last word.

⚖️ Heaven's court makes the final call

🛑 His dominion is completely removed

💥 Nothing of his power survives

📖 He does not get the last word

## 🎁 The Kingdom And Dominion, And The Greatness Of The Kingdom Under The Whole Heaven, Shall Be Given To The People Of The Saints Of The Most High

This echoes the everlasting kingdom already given to the son of man back in verse fourteen.

Now that same kingdom is described as given to God's saints as well.

The ruler and his people appear to share in the exact same reward.

The whole vision now connects into one single, unified ending.

🎁 This echoes verse fourteen's kingdom

🤝 The saints share in that reward

🔗 Two parts of the vision now connect

📖 One unified ending ties it all together

## ♾️ Whose Kingdom Is An Everlasting Kingdom, And All Dominions Shall Serve And Obey Him

This repeats the exact wording already used for the son of man back in verse fourteen.

Every beast kingdom in this chapter eventually passed away.

This kingdom is described with the opposite word on purpose, one last time.

The chapter ends exactly where it was always heading, toward a kingdom that never ends.

♾️ This repeats verse fourteen's wording

⏳ Every beast kingdom already passed away

🔁 The opposite word is used one final time

📖 The chapter ends on an endless kingdom

## 😶 My Cogitations Much Troubled Me, And My Countenance Changed In Me: But I Kept The Matter In My Heart

Cogitations is an old word for troubled, repeated thoughts.

Receiving the interpretation does not erase everything Daniel just felt.

His countenance changed means his face itself showed the strain.

He keeps the vision privately instead of telling everyone right away.

Understanding a hard truth does not always bring instant peace.

😶 Cogitations means troubled, repeated thoughts

😨 His face showed the strain

🤐 He kept the vision private for now

📖 Understanding does not always bring instant peace
`.trim();

export const DANIEL_SEVEN_PERSONAL_SECTIONS = parseDanielSevenRawNotes(DANIEL_SEVEN_RAW_NOTES);
