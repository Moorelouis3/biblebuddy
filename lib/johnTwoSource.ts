export type JohnTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnTwoRawNotes(rawText: string): JohnTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 2:${startVerse}` : `John 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 John 2 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_TWO_RAW_NOTES = `# John 2:1-5
# 🍷 No Wine At The Wedding
---
## 📅 The Third Day

"The third day" counts forward from the days John already named in chapter one.

Those earlier days described John the Baptist, Andrew, and Peter all meeting Jesus.

Adding them together lands on about a week before this wedding.

Many readers believe John shaped his opening on purpose as a kind of new creation week.

Genesis opens with seven days building up to completion.

John opens with a careful set of days building up to this first sign.

📅 The third day counts from chapter one

🗓️ The days add up to about a week

🌍 Many see this as echoing creation's seven days

📖 John shapes his opening with careful timing

## 🌸 A Marriage In Cana Of Galilee

Cana was a small village in Galilee, likely not far from Nazareth.

Weddings there often lasted several days of feasting.

The whole village usually took part, not just close family.

Jesus and his new disciples are invited guests at this one.

His mother is also present at this wedding.

John never once gives her an actual name in his gospel.

He calls her only "the mother of Jesus" throughout.

🌸 Cana was a small Galilean village

🎉 Weddings often lasted several days

👨‍👩‍👧 Jesus and his disciples are guests

➡️ John never gives Mary a name here

## 🍷 They Wanted Wine

"Wanted" here is an old way of saying the wine ran out.

It does not mean someone simply desired more wine.

A wedding without wine was a real social embarrassment for the family.

Hosting a feast like this was expensive.

This family apparently could not keep up with the cost.

Mary notices the problem before it becomes a public disaster.

🍷 Wanted means the wine ran out

😳 Running dry would shame the family

💰 Weddings were costly to host

➡️ Mary takes the problem straight to Jesus

## 🙋 What Have I To Do With Thee

This phrase sounds sharp in modern English, but it was a common idiom in that culture.

It usually signals some distance between two people, not open hostility.

Jesus is gently reminding his mother that this decision is not fully in her hands.

He still calls her "Woman," a respectful title, not a cold one.

The tone is firm, but it is not rude.

🙋 This was a common idiom then

🧭 It signals distance, not hostility

👩 Woman was a respectful title

➡️ Jesus gently sets his own timing

## ⏳ Mine Hour Is Not Yet Come

"Hour" is one of John's favorite words for Jesus's appointed time.

That hour points forward to the cross and the resurrection, not to this wedding.

Jesus is saying his biggest moment has not arrived yet.

John keeps returning to this same word all through the gospel.

Each time, the hour gets closer until it finally comes.

⏳ Hour means Jesus's appointed time

✝️ It points toward the cross

🔁 John repeats this word often

📖 The hour keeps approaching through the gospel

## 🤝 Whatsoever He Saith Unto You, Do It

Mary does not know what Jesus will do about the wine.

She still tells the servants to obey him completely.

That is a real step of trust, not a guess.

Her instruction becomes the last thing Mary says in John's gospel until the cross.

She trusts Jesus fully even without knowing the plan.

🤝 Mary trusts Jesus without knowing the plan

🗣️ She tells the servants to simply obey

📜 This is her last line until the cross

➡️ Trust does not require knowing the outcome first

# John 2:6-11
# 💧 Water Becomes Wine
---
## 🏺 Six Waterpots Of Stone

These were large stone jars, not the clay jars typically used for everyday water.

Many scholars note that stone jars could not become ritually unclean like clay could.

Jewish households kept jars like these for washing hands and dishes before meals.

Six of them sitting ready shows how seriously this family kept that custom.

Jesus will use these same ordinary purity jars for an extraordinary purpose.

🏺 Stone jars resisted ritual uncleanness

💧 They were used for washing before meals

🕍 This family kept the purity custom closely

➡️ Jesus uses ordinary jars for something new

## 📏 Two Or Three Firkins Apiece

A firkin was an old English measure, about nine gallons each.

Two or three firkins per jar means each one held close to twenty gallons.

Six jars like that could hold well over one hundred gallons of wine.

That is a staggering amount of wine for one small village wedding.

The miracle is not a small, quiet gesture.

📏 A firkin was about nine gallons

🏺 Each jar held close to twenty gallons

🍷 Six jars totaled well over a hundred gallons

📖 Jesus provides in overwhelming abundance

## 💧 Filled Them Up To The Brim

The servants do exactly what Mary told them, filling every jar completely full.

Nothing is left half done or held back.

At this point, the jars still only hold plain water.

The miracle has not visibly happened yet.

Obedience comes first, before any sign of a result.

💧 Servants fill every jar completely

🚫 Nothing is left half finished

⏳ The miracle has not shown yet

➡️ Obedience came before any visible result

## 🍽️ The Governor Of The Feast

"The governor of the feast" was something like a head waiter or master of ceremonies.

His job was to manage the food and wine during the feast.

He has no idea anything unusual just happened in those jars.

He only knows what lands in his own cup.

His honest reaction becomes an outside witness to the miracle.

🍽️ The governor managed the feast's food and wine

🤷 He has no idea what just happened

🏆 His honest reaction becomes real evidence

📖 Even outsiders notice what God has done

## 👀 The Servants Which Drew The Water Knew

The servants watched the whole thing happen with their own hands.

They are the only people at the wedding who understand what really took place.

John includes this detail so the miracle has real witnesses, not just a rumor.

Their quiet knowledge backs up the governor's surprised comment a moment later.

👀 Servants witnessed the miracle firsthand

🤐 They understood what the guests did not

📜 Their testimony backs up the story

➡️ Real witnesses stood behind this sign

## 🏆 Thou Hast Kept The Good Wine Until Now

The normal custom was to serve the best wine first.

Guests could still taste the difference early in the celebration.

Weaker wine came out later, once the guests had drunk enough not to notice.

This wedding runs in the opposite direction.

The best wine arrives last instead of first.

The governor has no idea Jesus is the real reason behind it.

🏆 Custom served the best wine first

🔄 This wedding reverses that custom

🤔 The governor credits the bridegroom instead

📖 Jesus is the true source of the gift

## ✨ This Beginning Of Miracles

John calls this the first of Jesus's signs, not just his first miracle.

A sign in John's gospel always points past itself to something deeper about Jesus.

This one points to his glory, the truth of who he really is.

Because of it, the disciples who already followed him now actually believe.

Belief in John's gospel usually grows this way, one sign at a time.

✨ This was Jesus's first sign in John

👑 Signs point to who Jesus really is

🙌 The disciples believed because of it

📖 Belief grows sign by sign in John

# John 2:12-17
# 🐂 Zeal For The Father's House
---
## ⬇️ He Went Down To Capernaum

Cana sits up in the hill country of Galilee.

Capernaum sits lower, right on the shore of the Sea of Galilee.

That elevation is why the text says Jesus went "down" to get there.

Capernaum later becomes the home base for much of his ministry.

This short visit simply moves the story toward the next feast.

⬇️ Capernaum sits lower than Cana

🌊 It sits on the Sea of Galilee's shore

🏠 It becomes Jesus's ministry home base

➡️ This visit leads into the next feast

## 🕍 The Jews' Passover Was At Hand

Passover was one of three feasts that required faithful Jews to travel to Jerusalem.

It celebrated God rescuing Israel out of slavery in Egypt.

Jerusalem sits up on a mountain ridge, so travelers always spoke of going up to it.

This is the first of several Passovers John mentions across his gospel.

Each one marks another step toward the cross.

🕍 Passover required travel to Jerusalem

🐑 It remembered the rescue from Egypt

⛰️ Jerusalem sits high, so travelers went up

📖 Each Passover in John moves toward the cross

## 🐂 Those That Sold Oxen And Sheep And Doves

Worshipers needed animals to offer as sacrifices once they reached the temple.

Carrying a live ox or sheep on a long journey was not practical for most families.

Sellers set up inside the temple courts so pilgrims could simply buy what they needed there.

Doves were the animal poorer families could afford when a lamb was out of reach.

What started as a convenience had turned the sacred courts into a marketplace.

🐂 Animals were needed for sacrifice

🚶 Buying on site replaced a long journey

🕊️ Doves were the offering for the poor

📖 Convenience had become a marketplace

## 💰 The Changers Of Money Sitting

Every Jewish man owed a small temple tax, paid only in approved Jewish coinage.

Roman and Greek coins carried images of rulers.

That made them unfit for the temple treasury.

Money changers sat ready to trade those foreign coins for approved ones.

They charged a fee for that exchange.

That fee could add up fast for ordinary pilgrims.

This system was legal, but it still turned worship into a business.

💰 Temple tax needed approved coinage

🚫 Roman coins carried forbidden images

🔁 Changers traded coins for a fee

📖 A legal system still became a business

## 🧵 A Scourge Of Small Cords

Jesus makes this whip himself out of small cords, not a weapon he brought with him.

He uses it to drive out the animals, not to strike the people selling them.

This is a deliberate, controlled action, not a loss of temper.

Overturning the tables and pouring out the coins makes the same point without a word.

Jesus is cleaning his Father's house with real authority.

🧵 Jesus makes the whip himself

🐂 It drives out the animals

🪙 Tables and coins are overturned too

➡️ The action is controlled, not reckless

## 👨‍👦 My Father's House An House Of Merchandise

This is the first time in John's gospel that Jesus publicly calls God "my Father."

That claim alone was a bold statement about who he is.

"Merchandise" means the temple had become a place for buying and selling instead of worship.

The business itself was not wrong everywhere, only inside the house built for prayer.

Jesus is defending his Father's honor, not just tidying up a courtyard.

👨‍👦 Jesus first calls God his Father here

🏛️ The temple existed for worship, not trade

🙏 Buying and selling did not belong there

📖 Jesus defends his Father's honor directly

## 🔥 The Zeal Of Thine House Hath Eaten Me Up

This line comes from Psalm sixty nine, written centuries before Jesus was born.

"Zeal" here means a burning, consuming devotion, not simple enthusiasm.

The disciples only remember and understand this connection after the fact.

John often shows the disciples catching up to scripture's meaning later, not in the moment.

Jesus is living out a psalm his own disciples had not yet connected to him.

🔥 Zeal means burning, consuming devotion

📜 The line comes from Psalm sixty nine

🧠 Disciples understood it only afterward

📖 Jesus fulfills scripture before it is recognized

# John 2:18-22
# 🏛️ A Temple Raised In Three Days
---
## ❓ What Sign Shewest Thou Unto Us

The Jewish leaders are not asking what Jesus did, they already saw that clearly.

They are demanding proof that he has the authority to do it.

In this culture, a bold public action like this required some kind of credential.

Asking for a sign was their way of asking who gave him the right.

Jesus will answer in words they cannot possibly understand yet.

❓ Leaders demand proof of authority

👀 They already saw what he did

🪪 A sign would show who sent him

➡️ Jesus answers in words they cannot grasp yet

## 🏛️ Destroy This Temple, And In Three Days I Will Raise It Up

On the surface, this sounds like a wild claim about the building standing in front of them.

Jesus is actually speaking about his own body.

John explains that two verses later.

"Destroy" points to his death.

"Raise it up" points to his resurrection.

Three days becomes the exact timeline the gospels later describe between his death and resurrection.

Nobody listening catches the real meaning in this moment.

🏛️ The leaders hear a building

🙏 Jesus means his own body

✝️ Destroy points to his death

📖 Raise up points to his resurrection

## 📆 Forty And Six Years Was This Temple In Building

Herod the Great began a massive expansion of the Jerusalem temple decades before this conversation.

By this point, the project had already been underway for about forty six years.

Workers were in fact still actively building parts of it.

The Jewish leaders are thinking entirely in terms of stone, labor, and time.

They cannot imagine Jesus could mean anything else by "temple."

📆 Herod's temple project spanned decades

🧱 Construction was still ongoing at this time

🤔 Leaders think only in literal stone

➡️ They miss the deeper meaning entirely

## 🙏 He Spake Of The Temple Of His Body

John steps in here to explain exactly what Jesus actually meant.

Jesus was comparing his own body to the temple.

The temple was the place where God's presence dwelled.

Destroying that body would happen through his death.

Raising it up would happen through his resurrection three days later.

John wants no reader left confused the way the Jewish leaders were.

🙏 Jesus compares his body to the temple

🏛️ God's presence dwelled in both

✝️ His body would be destroyed in death

📖 John clears up the confusion directly

## 📜 They Believed The Scripture, And The Word Which Jesus Had Said

This understanding only comes after the resurrection actually happens.

Before that, the disciples heard this saying and simply did not grasp it.

Once Jesus rises, the memory suddenly makes complete sense to them.

Their faith grows looking backward, connecting his words to what scripture had already said.

John shows this pattern more than once, faith arriving after the fact, not before it.

📜 Understanding comes only after the resurrection

🧠 The disciples did not grasp it earlier

🔁 Memory and scripture finally connect

📖 Faith often follows understanding in John

# John 2:23-25
# 👁️ What Jesus Already Knew
---
## 👀 Many Believed In His Name

Crowds in Jerusalem start believing because they personally watch Jesus perform miracles.

This kind of belief starts in the eyes, not necessarily in the heart.

John does not call this belief false, but he does not call it complete either.

It is the kind of faith that still needs to be tested over time.

The next verse shows exactly why Jesus treats it carefully.

👀 Crowds believe after seeing miracles

🌱 This faith starts but is not yet tested

⚖️ John leaves the quality of it open

➡️ Jesus treats this belief with caution

## 🚪 Jesus Did Not Commit Himself Unto Them

"Commit himself" means Jesus did not give the crowd his full trust.

He does not treat their excitement the same way he treats his close disciples.

Jesus is careful about who he opens his full confidence to.

Popularity based on miracles alone was never something he chased.

He stays in control of the relationship instead of being swept along by it.

🚪 Jesus withholds his full trust here

🎭 Crowd excitement is not the same as devotion

🙅 He never chases popularity for its own sake

➡️ Jesus stays in control of the relationship

## 🧠 He Knew All Men

This is a direct claim about Jesus's own knowledge, not a guess about people's character.

He does not need to watch someone for years to understand what drives them.

That kind of knowledge belongs to God alone.

John is quietly pointing back to who Jesus really is.

The claim connects directly back to the very first verse of this gospel.

🧠 Jesus knows people completely

⏳ He needs no time to learn someone

👑 This kind of knowledge belongs to God

📖 It echoes John's opening claim about Jesus

## 🔍 He Knew What Was In Man

Nobody needed to tell Jesus what another person was really thinking or planning.

He already saw straight through to the heart, not just the outward behavior.

This explains why he kept a careful distance from shallow, miracle only believers.

It also explains why he was never caught off guard by anyone who later betrayed him.

Jesus sees people exactly as they are, not as they appear.

🔍 Jesus saw straight to the heart

🚫 Nobody could surprise him with hidden motives

🛡️ This explains his careful distance from crowds

📖 He sees people as they truly are
`.trim();

export const JOHN_TWO_PERSONAL_SECTIONS = parseJohnTwoRawNotes(JOHN_TWO_RAW_NOTES);
