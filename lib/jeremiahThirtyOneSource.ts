export type JeremiahThirtyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahThirtyOneRawNotes(rawText: string): JeremiahThirtyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahThirtyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+31:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 31 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+31:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+31:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 31 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 31,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 31:${startVerse}` : `Jeremiah 31:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 13) {
    throw new Error("Expected 13 Jeremiah 31 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_THIRTY_ONE_RAW_NOTES = `# Jeremiah 31:1-3
# 👪 The God Of All The Families
---
## 🔗 At The Same Time

This phrase ties straight back to the promise just made in chapter thirty.

Nothing new is starting here.

God is still unfolding the same restoration he already announced.

🔗 Same promise, same moment
🕊️ God is still speaking the same word
➡️ One long promise, not a new one
📖 Chapter thirty continues directly here

## 👪 All The Families Of Israel

This widens the promise past Judah alone.

The northern kingdom, called Israel, had already fallen to Assyria over a century earlier.

God includes those long lost tribes in this promise too.

👪 Families means every tribe, not just one
🏚️ Israel was the fallen northern kingdom
🌍 The promise is wider than Judah
📖 No tribe is left out of this promise

## 🏜️ Found Grace In The Wilderness

"Grace" here means favor the people did not earn.

This line looks back to the exodus, when God cared for Israel through the wilderness after Egypt.

That old rescue becomes the pattern for a new one.

🏜️ The wilderness recalls the exodus journey
🎁 Grace means favor that was not earned
🔁 An old rescue becomes the model
📖 God's past care sets the pattern

## ❤️ Loved Thee With An Everlasting Love

"Everlasting" means this love never had a starting point and will never run out.

It was not earned by good behavior.

It does not depend on how well Israel performed.

❤️ Everlasting means without beginning or end
🚫 Not earned by good behavior
🔒 Not threatened by failure either
📖 God's love was the constant, not Israel's record

## 🪢 With Lovingkindness Have I Drawn Thee

"Lovingkindness" describes loyal, committed love, the kind tied to a promise, not just a feeling.

"Drawn thee" pictures a gentle pull, the way a shepherd leads an animal rather than drags it.

Hosea uses almost this same picture, cords of love pulling someone along.

🪢 Drawn thee pictures a gentle pull
🤝 Lovingkindness means loyal, promised love
🐑 Like a shepherd leading, not dragging
📖 God pulls his people instead of forcing them

# Jeremiah 31:4-6
# 💃 Build Thee, O Virgin Of Israel
---
## 👰 O Virgin Of Israel

"Virgin" is a title, not a literal description of the whole nation.

It pictures Israel restored to purity and dignity, like a bride being made new again.

The same title appears again later in this very chapter.

👰 Virgin is a title, not a fact
💎 It pictures restored purity and honor
🔁 The title returns again later
📖 Israel is pictured as a renewed bride

## 🥁 Adorned With Thy Tabrets

A "tabret" is a small hand drum, carried and played while dancing.

Being "adorned" with one pictures joyful celebration returning to daily life.

Grief had silenced these instruments during the years of judgment.

🥁 Tabret means a small hand drum
💃 Adorned pictures joyful celebration
🤫 Grief had silenced this kind of music
📖 Celebration itself is part of the promise

## 🍇 Plant Vines Upon The Mountains Of Samaria

Samaria was the capital city of the former northern kingdom.

After Assyria conquered it, foreign settlers took over much of that land.

This promises Israelites will return and plant their own vineyards there again.

🍇 Samaria was the northern kingdom's capital
🏚️ Foreigners had taken over after the conquest
🌱 Israelites are promised their land back
📖 Ownership itself is being restored, not just presence

## 🍴 Eat Them As Common Things

Old law treated the fruit of a new vineyard as set apart, not to be eaten freely for several years.

"Common things" means ordinary food, eaten without any special restriction.

That only happens once a vineyard has been settled and productive long enough to be treated as normal.

🍴 Common means ordinary, unrestricted food
📜 New vineyards once had eating restrictions
⏳ This marks long term, settled living
📖 Normal life is the sign of real restoration

## 🗼 Watchmen...Shall Cry, Arise Ye

Watchmen stood on hilltops to look out and send signals across the land.

Mount Ephraim sat in the heart of the former northern kingdom.

This time their cry is not a warning of danger, it is an invitation to worship.

🗼 Watchmen signaled from hilltop lookouts
🏔️ Mount Ephraim was in the north
🚫 Not a danger warning this time
📖 Their shout calls people toward worship

# Jeremiah 31:7-9
# 🎤 Sing With Gladness For Jacob
---
## 📣 Shout Among The Chief Of The Nations

God tells his people to announce this news loudly and publicly.

"Chief of the nations" means the leading world powers of that day.

This is not a quiet, private comfort meant to stay hidden.

📣 The news is meant to be loud
🌍 Chief of the nations means world powers
🚫 Not a quiet, private comfort
📖 God's rescue is announced publicly

## 🌱 The Remnant Of Israel

A "remnant" is the surviving portion left after a larger group has been lost or judged.

It is not the whole original nation.

It is whoever is left, carrying the promise forward.

🌱 Remnant means those who survived
📉 It is a smaller, surviving group
🧭 They still carry the promise forward
📖 A remnant is enough for God to use

## 🗺️ From The North Country...Coasts Of The Earth

Babylon sat to the north of Israel by the routes people actually traveled.

"Coasts of the earth" stretches the promise further, to the farthest places known at the time.

This is not a return from one city, it is a gathering from everywhere.

🗺️ North country points toward Babylon
🌐 Coasts of the earth means everywhere
🚫 Not a return from one place only
📖 God gathers from the whole earth

## 🤰 The Blind And The Lame...With Child

These are the people normally left behind on a hard, fast journey.

Naming them specifically shows this return is not only for the strong.

Everyone is included, even those who could barely travel alone.

🤰 These were the weakest travelers
🚶 Normally left behind on hard journeys
🤝 This return leaves no one out
📖 Strength was never the requirement

## 😢 They Shall Come With Weeping, And With Supplications

This weeping is not grief, it is overwhelmed relief after a long, hard wait.

"Supplications" means humble, earnest prayers, not formal requests.

The journey home is marked by emotion, not just logistics.

😢 Weeping here means overwhelmed relief
🙏 Supplications means humble, earnest prayer
🚶 The journey is emotional, not just practical
📖 Joy and tears can arrive together

## 👶 Ephraim Is My Firstborn

Ephraim was the largest tribe of the former northern kingdom, often used to represent the whole nation.

"Firstborn" was the position of highest honor and inheritance in this culture.

Giving that title to the very tribe that was judged first shows the honor was never actually withdrawn.

👶 Ephraim stands for the whole north
👑 Firstborn meant highest honor and inheritance
🔁 The judged tribe keeps its honored title
📖 Discipline did not cancel the relationship

# Jeremiah 31:10-12
# 🐑 He That Scattered Israel Will Gather Him
---
## 🏝️ Isles Afar Off

"Isles afar off" was an old way of naming the most distant coastlands people knew of.

The message is meant to travel as far as language could carry it.

No place is considered too far to hear this news.

🏝️ Isles afar off means the farthest coastlands
📢 The message travels to the whole world
🚫 No place is too distant to hear it
📖 This promise is not kept local

## 🐑 As A Shepherd Doth His Flock

The same God who allowed Israel to be scattered now personally gathers them back.

A shepherd knows each animal and goes looking for the ones that wander.

This is a picture of patient, personal care, not distant management.

🐑 The shepherd image means personal care
🔁 The one who scattered now gathers
👀 Each one is known, not just counted
📖 God leads his people himself

## ⛓️ Redeemed Jacob, And Ransomed Him

"Redeemed" and "ransomed" both describe paying a price to set someone free from captivity.

These were everyday legal words for freeing a slave or a prisoner of war.

"Him that was stronger than he" names Babylon plainly, without flattering it.

⛓️ Redeemed means freed at a cost
💰 Ransomed is the same idea, paying to free
🏛️ Him that was stronger means Babylon
📖 Freedom here was purchased, not just granted

## ⛰️ Height Of Zion

Zion refers to the temple mount in Jerusalem, the center of worship.

"Height" pictures the highest point of joy and praise, not just elevation.

Singing there means worship itself has been restored, not only the buildings.

⛰️ Zion is the temple mount
🙌 Height pictures peak joy and praise
🏛️ Worship itself is being restored
📖 The singing matters as much as the place

## 🌿 Their Soul Shall Be As A Watered Garden

A garden with steady water in a dry land means full, reliable life.

This replaces the dried up despair of exile with real security.

Nothing about this picture depends on luck, it depends on a dependable water source.

🌿 A watered garden means full security
🏜️ It replaces exile's dried up despair
💧 The water supply is dependable, not lucky
📖 Real security is the point of the image

# Jeremiah 31:13-14
# 💃 I Will Turn Their Mourning Into Joy
---
## 👫 Young Men And Old Together

This celebration crosses every generation at once.

It is not one age group's relief while others sit it out.

The whole community shares equally in the joy.

👫 Every generation celebrates together
🚫 Not one group's joy alone
🤝 The whole community shares it
📖 Restoration reaches everyone, old and young

## 🔄 Turn Their Mourning Into Joy

Mourning here means the formal grief rituals people practiced during exile, not just sad feelings.

This is a full reversal, not simply comfort added on top of grief.

The sorrow itself gets replaced, not just softened.

🔄 Mourning means formal grief rituals
🔁 This is a full reversal, not a patch
🚫 Not comfort layered over sorrow
📖 The grief itself is replaced

## 🍖 Satiate The Soul Of The Priests With Fatness

"Satiate" means filled completely, with nothing left to want.

"Fatness" was the richest portion of an offering, the priests' assigned share under the old law.

Full temple worship, with full provision, is pictured as fully restored here.

🍖 Satiate means completely filled
🎁 Fatness was the priests' richest portion
🏛️ Pictures temple worship fully restored
📖 Provision itself becomes a sign of blessing

## 😊 My People Shall Be Satisfied With My Goodness

This closes the promise by widening it past the priests to everyone.

Satisfaction here is not about wealth, it is about having enough and knowing it.

The whole chapter keeps returning to this same idea of completeness.

😊 Satisfied means having enough, and knowing it
👪 This includes everyone, not just priests
🔁 Completeness is a running theme here
📖 Goodness here means real sufficiency

# Jeremiah 31:15-17
# 😢 Lamentation And Bitter Weeping
---
## 📍 A Voice Was Heard In Ramah

Ramah was a town near Jerusalem, on the road exiles traveled north out of the land.

It was also the gathering point where captives were assembled before being marched to Babylon.

The cry rises from the very place the exile began.

📍 Ramah sat on the road north
🚶 Captives were gathered there before exile
😭 The grief starts at the exile's starting point
📖 This cry comes from the wound itself

## 😭 Rahel Weeping For Her Children

"Rahel" is the same name usually spelled Rachel, Jacob's beloved wife.

She had died generations earlier and was buried near Bethlehem, close to Ramah.

She is pictured here as the symbolic mother of Israel, grieving from the grave for her scattered descendants.

The gospel of Matthew later borrows this exact image for a different tragedy near the same place.

😭 Rahel is the same name as Rachel
⚰️ She was buried near this exact area
👪 She stands for Israel's grieving mother figure
📖 Matthew later reuses this same picture

## 🚫 Refused To Be Comforted...Because They Were Not

"Because they were not" is an old way of saying they were gone, not simply absent for a while.

This is grief with no easy words available to soften it.

The text does not rush past the pain to get to the promise.

🚫 Because they were not means they are gone
💔 This grief has no quick fix
🛑 The text does not rush past it
📖 Real promises can follow real grief

## 🎁 Thy Work Shall Be Rewarded

God answers the grief directly instead of ignoring it.

"Thy work" points to the labor of raising children now lost to exile.

The promise is that this labor was not wasted, it will be repaid.

🎁 Reward means the labor was not wasted
👶 Thy work points to raising those children
💰 It will be repaid, not forgotten
📖 God answers grief with a direct promise

## 🧭 Come Again To Their Own Border

"Hope in thine end" means there is a real future on the other side of this sorrow.

That hope lands on something specific, children returning to their own territory.

This is not a vague comfort, it names an actual destination.

🧭 Hope in thine end means a real future
🗺️ The promise names an actual territory
🚫 Not vague comfort, a specific place
📖 Grief ends at a real homecoming

# Jeremiah 31:18-20
# 💔 Is Ephraim My Dear Son
---
## 🗣️ Ephraim Bemoaning Himself

For the first time in this chapter, the people speak instead of only God.

"Bemoaning" means expressing grief and regret out loud, not keeping it private.

Ephraim again stands for the whole northern kingdom.

🗣️ The people speak for the first time here
😢 Bemoaning means grief spoken aloud
👪 Ephraim stands for the whole north
📖 Confession becomes part of the promise

## 🐂 As A Bullock Unaccustomed To The Yoke

A yoke is a wooden frame joining an animal to a plow or cart.

It is how a working animal gets trained.

A young, untrained bull naturally resists that control at first.

Ephraim compares its own resistance to discipline to that same stubborn struggle.

🐂 Yoke means the frame used to train oxen
💪 An untrained animal naturally resists it
🔁 Ephraim compares itself to that resistance
📖 Honest confession names the struggle plainly

## 🔄 Turn Thou Me, And I Shall Be Turned

This admits that real repentance needs God's help, not willpower alone.

The same word, turn, is used for both God's action and Ephraim's response.

Neither side of that turning happens without the other.

🔄 Repentance needs God's help, not willpower alone
🤝 The same word covers both sides
🔁 Neither turning happens without the other
📖 Honest repentance asks for help, not just effort

## ✋ I Smote Upon My Thigh

Striking one's own thigh was an old gesture of shock, grief, or self reproach.

It was an outward, physical sign of inward shame.

"The reproach of my youth" points back to Israel's long history of turning toward other gods.

✋ Smote upon my thigh was a grief gesture
😳 It showed shame outwardly, not just inward
📜 Reproach of my youth recalls old failures
📖 Shame here is honest, not performed

## ❤️ Is Ephraim My Dear Son

God asks this question and then answers it himself with tenderness.

It reads like someone thinking out loud about a child they cannot stop loving.

The question is rhetorical, the answer was never actually in doubt.

❤️ God asks and answers his own question
🤔 It reads like someone thinking aloud
✅ The answer was never really in doubt
📖 Tenderness carries this whole verse

## 💔 My Bowels Are Troubled For Him

"Bowels" in this culture was the seat of deep emotion, similar to how we might say heart or gut today.

This is not about a physical organ.

It describes overwhelming compassion that will not let go.

💔 Bowels meant the seat of deep emotion
🚫 Not a literal physical description
🌊 It describes overwhelming compassion
📖 God's compassion will not let go

# Jeremiah 31:21-22
# 🧭 Set Thee Up Waymarks
---
## 🧭 Set Thee Up Waymarks

Waymarks and high heaps were stone markers built along roads to help travelers find their way.

This takes a practical travel instruction and turns it into a spiritual call to return.

The path home is one Israel has already walked once before, going the other direction.

🧭 Waymarks were stone travel markers
🛣️ A travel instruction becomes a spiritual call
🔁 This is the same road, reversed
📖 Returning means retracing familiar ground

## 👰 Turn Again, O Virgin Of Israel

This repeats the same title used back in verse four.

Repeating it ties the whole chapter's promise together around one image.

The call to return and the promise of restored purity arrive together.

👰 Same title used earlier in the chapter
🔁 Repetition ties the promise together
💎 Return and restored purity arrive together
📖 This is the same bride being called home

## ↩️ O Thou Backsliding Daughter

"Backsliding" describes a pattern of repeatedly turning away and needing to be called back.

It is not describing a single mistake.

It names a habit, which makes this call to return even more significant.

↩️ Backsliding means a repeated pattern
🔁 Not a single mistake, a habit
📣 The call to return answers that pattern
📖 Grace meets a repeated failure, not just one

## ❓ A Woman Shall Compass A Man

This is one of the most debated lines in the whole book.

"Compass" means to surround or encircle something.

Many scholars believe it pictures a dramatic reversal, the weaker party now surrounding and protecting instead of needing protection.

The text calls it a new thing precisely because nobody expected it.

❓ Compass means to surround or encircle
🔄 Many scholars see a reversal of roles
🤷 The exact meaning is genuinely debated
📖 God calls it new because it surprises everyone

# Jeremiah 31:23-26
# 🏔️ O Habitation Of Justice, And Mountain Of Holiness
---
## ⚔️ LORD Of Hosts

"LORD of hosts" is a title meaning commander of heaven's armies.

It appears here to back this promise with real power, not just kindness.

A promise this large needed a title this strong attached to it.

⚔️ Lord of hosts means commander of armies
💪 It backs the promise with real power
🚫 Not only kindness, strength too
📖 Power and kindness arrive together here

## 🏔️ O Habitation Of Justice, And Mountain Of Holiness

"Habitation" simply means a dwelling place.

This renames Jerusalem by its restored character instead of its ruined state.

Justice and holiness replace the corruption that had caused the exile in the first place.

🏔️ Habitation means a dwelling place
🔁 Renamed by its future, not its ruin
⚖️ Justice and holiness replace old corruption
📖 A new name reflects a new character

## 🌾 Husbandmen, And They That Go Forth With Flocks

"Husbandmen" means farmers, people who work the soil for a living.

Ordinary working life fully returns here, not just priests and officials.

Fields and flocks both come back to life, not only the temple.

🌾 Husbandmen means farmers
🐑 Fields and flocks both return
👥 Ordinary daily life is included
📖 Restoration reaches more than religious life

## 💧 Satiated The Weary Soul...Replenished Every Sorrowful Soul

"Satiated" and "replenished" both mean completely filled, nothing left missing.

This directly answers the exhaustion and grief voiced since verse fifteen.

The promise closes the same gap it opened by naming it.

💧 Both words mean completely filled
🔁 This answers the grief from verse fifteen
🧩 The promise closes the gap it named
📖 God fills exactly what was emptied

## 😴 My Sleep Was Sweet Unto Me

Jeremiah reveals this whole message came to him as a dream or vision.

Waking up to find the comfort still felt real mirrors the message itself.

What God promises holds up even after the dreaming stops.

😴 This whole oracle came through a dream
🌅 Jeremiah wakes and the comfort still feels true
🔁 The message mirrors Jeremiah's own experience
📖 God's promises hold up after waking to reality

# Jeremiah 31:27-30
# 🌱 I Will Build, And I Will Plant
---
## 🌱 Sow...With The Seed Of Man, And With The Seed Of Beast

"Sow" means plant seed expecting growth to follow.

This promises both people and livestock will multiply again after the emptiness of judgment.

Land left desolate by war and exile is pictured becoming full again.

🌱 Sow means planting seed for growth
👪 People and livestock both multiply again
🏜️ Desolate land becomes full again
📖 Emptiness is reversed, not just managed

## 🏗️ To Pluck Up...To Build, And To Plant

These exact verbs appeared at the very start of Jeremiah's calling, back in chapter one.

There, God gave Jeremiah both lists together, the tearing down and the building up.

Now the destructive half of that calling turns fully toward the constructive half.

🏗️ These verbs match Jeremiah's original calling
📜 Chapter one listed both halves together
🔁 The destructive half now turns constructive
📖 The calling now builds, not tears down

## 🍇 The Fathers Have Eaten A Sour Grape

This was a popular proverb of the day.

It meant a child suffers consequences for a parent's sin, almost like inherited blame.

People used this saying to explain away their own suffering as someone else's fault.

🍇 This was a common saying of the time
👪 It blamed children for a parent's sin
🙅 People used it to deflect responsibility
📖 A proverb can hide the real blame

## ⚖️ Every One Shall Die For His Own Iniquity

This directly overturns the sour grape proverb.

Each person now answers for their own choices, not someone else's failure.

Ezekiel states this same idea almost word for word elsewhere in scripture.

⚖️ This reverses the sour grape proverb
🙋 Each person answers for their own choices
📚 Ezekiel repeats this same idea elsewhere
📖 Inherited blame gives way to personal responsibility

# Jeremiah 31:31-34
# 📜 I Will Make A New Covenant
---
## 📜 I Will Make A New Covenant

A covenant is a binding, formal agreement.

Genesis used this same word for Jacob and Laban's agreement.

This is the only place in the entire Old Testament where the exact phrase new covenant appears.

Jesus later picks up this same phrase directly at the Last Supper.

📜 Covenant means a binding formal agreement
🆕 This exact phrase appears only here
🍷 Jesus later uses this same phrase
📖 One verse hinges the whole Bible together

## 🏺 Not According To The Covenant...Out Of The Land Of Egypt

This points back to the covenant made at Mount Sinai right after the exodus from Egypt.

That covenant included the ten commandments and the law given through Moses.

This new one is announced as something different, not a repeat of that same agreement.

🏺 Points back to the Sinai covenant
📜 That covenant included the law of Moses
🆕 This one is announced as genuinely different
📖 Genuinely new, not a repeat

## 💔 Which My Covenant They Brake, Although I Was An Husband Unto Them

This pictures the old covenant as a marriage.

"Brake" means broke, through Israel's repeated turning toward other gods.

Calling God a husband here makes the broken covenant personal, not just legal.

💔 The old covenant is pictured as a marriage
💍 Brake means broken through unfaithfulness
🙋 Husband makes this personal, not just legal
📖 A broken promise, not just a broken rule

## ❤️ I Will Put My Law In Their Inward Parts, And Write It In Their Hearts

The old covenant's law was written on stone tablets, something external to obey.

This new one places the law inside the person instead.

It becomes part of who someone is, not only a rule they are told to follow.

❤️ The old law was written on stone
🫀 This law is written inside the person
🔁 It becomes identity, not just instruction
📖 Obedience moves from outside in to inside out

## 🙌 I Will Be Their God, And They Shall Be My People

This repeats almost word for word the very first line of this whole chapter.

Everything between verse one and here explains how that opening promise actually gets fulfilled.

The chapter closes the loop it opened.

🙌 This repeats the chapter's opening promise
🔁 Everything between explains how it happens
🧩 The chapter closes its own loop
📖 One promise frames the whole chapter

## 🧑‍🏫 They Shall Teach No More Every Man His Neighbour...Know The LORD

Under the old system, knowledge of God depended on priests and teachers passing it down to others.

Under this new one, each person knows God directly and personally.

Nobody needs another person standing between them and that relationship anymore.

🧑‍🏫 Old system relied on teachers passing it down
🙋 New system means direct, personal knowledge
🚪 No one stands between the person and God
📖 Relationship with God becomes direct for everyone

## 🕊️ I Will Forgive Their Iniquity, And I Will Remember Their Sin No More

"Remember their sin no more" does not mean God's memory fails or forgets details.

It means God chooses not to hold that sin against his people anymore.

This is a legal and relational pardon, not a claim about memory loss.

🕊️ This describes a choice, not forgetfulness
⚖️ It is a legal and relational pardon
🚫 God's memory is not actually failing
📖 Forgiveness here means the debt is closed

# Jeremiah 31:35-37
# ☀️ The Ordinances Of Heaven
---
## 🌙 The Ordinances Of The Moon And Of The Stars

"Ordinances" means fixed, dependable laws or set patterns.

This describes the sun, moon, and stars following the same reliable cycle every day and night.

Every ancient reader could watch this pattern with their own eyes and confirm it.

🌙 Ordinances means fixed, dependable patterns
☀️ The sun and stars follow daily cycles
👀 Anyone could watch and confirm this
📖 Tied to something visible and proven

## 🌊 Which Divideth The Sea When The Waves Thereof Roar

God is described here as the one who controls even the open sea.

The sea was the most unpredictable, violent force people of that time knew.

If God can control that, the promise attached to it carries real weight.

🌊 The sea was the most unpredictable force known
💪 God is shown controlling even that
⚖️ This backs the promise with real power
📖 The wildest force still answers to God

## 🔒 If Those Ordinances Depart...Cease From Being A Nation

God ties Israel's survival as a people to something as fixed as the sun rising each morning.

This is meant as the strongest possible guarantee available.

It is not a real threat that the sun might actually fail.

🔒 Israel's future is tied to the sun's reliability
💯 This is the strongest guarantee available
🚫 Not a real threat that it could fail
📖 An impossible condition protects the promise

## 📏 If Heaven Above Can Be Measured

This adds a second, even larger impossible standard.

No one in this world could measure the sky or dig to the bottom of the earth.

Israel's rejection is placed on that same impossible footing, meaning it will not happen.

📏 No one can measure the sky
⛏️ No one can reach earth's foundations
🚫 Israel's rejection is just as impossible
📖 Impossible conditions guarantee the promise stands

# Jeremiah 31:38-40
# 🏙️ The City Shall Be Built To The LORD
---
## 🏙️ From The Tower Of Hananeel Unto The Gate Of The Corner

These were two real, known points on Jerusalem's actual city wall.

Naming them makes this promise specific and measurable, not vague poetry.

A resident of the city would have recognized both landmarks instantly.

🏙️ These were real landmarks on the wall
📍 The promise is specific, not vague
👀 A resident would recognize both instantly
📖 Real geography backs this promise

## 📏 The Measuring Line Shall Yet Go Forth

A measuring line was the standard tool ancient builders used to mark out new construction.

This pictures workers physically staking out a rebuilt city.

The destruction described earlier in Jeremiah now has a construction project answering it.

📏 A measuring line was a builder's tool
🏗️ It pictures real construction beginning
🔁 Destruction now has a rebuilding answer
📖 The promise becomes a real building project

## ⚰️ The Whole Valley Of The Dead Bodies, And Of The Ashes

This valley outside the city had become a place for war dead and burned waste.

It was associated with death, shame, and uncleanness in the eyes of the people.

Naming it directly shows this restoration does not skip past the ugliest ground.

⚰️ This valley held death and burned waste
💔 It carried shame and uncleanness
🚫 Restoration does not skip the ugly ground
📖 Even the worst ground gets named here

## ⛪ Shall Be Holy Unto The LORD...Not Be Plucked Up...Any More For Ever

Even the city's most unclean, shame filled ground is reclaimed as holy.

The chapter ends with the strongest possible promise of permanence.

This directly answers the destructive verbs used back in verse twenty eight.

⛪ The most unclean ground becomes holy
🔒 The promise ends on permanence
🔁 It answers the destruction from verse twenty eight
📖 Nothing here gets uprooted again
`.trim();

export const JEREMIAH_THIRTY_ONE_PERSONAL_SECTIONS = parseJeremiahThirtyOneRawNotes(JEREMIAH_THIRTY_ONE_RAW_NOTES);
