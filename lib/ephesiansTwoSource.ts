export type EphesiansTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEphesiansTwoRawNotes(rawText: string): EphesiansTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EphesiansTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ephesians\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ephesians 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ephesians\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Ephesians\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ephesians 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ephesians 2:${startVerse}` : `Ephesians 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ephesians 2 sections, received " + sections.length);
  }

  return sections;
}

const EPHESIANS_TWO_RAW_NOTES = `# Ephesians 2:1-3
# 💀 Dead In Trespasses, Now Made Alive
---
## 🌱 You Hath He Quickened

Quickened means made alive, not simply forgiven.

Paul pictures a body that was dead now breathing again.

Before Christ, a person's spirit was lifeless toward God.

Everything else about them still worked and moved.

This new life does not come from effort.

God alone does the quickening.

🌱 Quickened means made alive
💀 Pictures a dead body breathing again
🚫 New life does not come from effort
📖 God alone does the quickening

## ⚰️ Dead In Trespasses And Sins

Trespasses means specific wrong steps.

It pictures crossing a line that was clearly marked.

Sins means falling short of what God required.

Paul names both words together on purpose.

Being dead in them means spiritually lifeless, not merely guilty.

That condition described everyone before Christ.

⚰️ Trespasses means a specific wrong step
📏 Sins means falling short of God's standard
🌍 Together they cover every kind of wrong
📖 This condition described everyone before Christ

## 🌪️ The Course Of This World

Course means the normal pattern a culture follows.

It is not one bad decision.

It is an entire direction, repeated every day.

Paul says the Ephesians used to walk by that pattern.

They followed it without even noticing.

Every culture still has its own version of this pull.

🌪️ Course means the normal pattern of a culture
🚶 Not one choice, an entire direction
😴 People follow it without noticing
📖 Every culture has its own version today

## 👹 The Prince Of The Power Of The Air

This title belongs to Satan.

Paul names him here as a real ruler, not a symbol.

Ancient people pictured the air as an unseen realm around daily life.

Paul says this spirit actively worked inside people who did not know God.

Naming an enemy this clearly removes any confusion about the source.

👹 This title names Satan directly
🌬️ Air pictured the unseen realm around life
🧠 This spirit worked inside disobedient people
📖 Naming the enemy removes the confusion

## 😈 The Children Of Disobedience

Children of disobedience is an old Hebrew pattern of speech.

It names a whole character, not one bad act.

The same pattern appears again as children of wrath, one verse later.

This phrase describes exactly who the Ephesians used to be.

😈 Children of X is a Hebrew pattern
🏷️ It names a whole character trait
🔁 The pattern repeats as children of wrath
📖 This described the Ephesians before Christ

## 🗣️ Our Conversation In Times Past

Conversation here does not mean talking.

In this older English, it means a person's entire way of life.

Paul says that old way of life was ruled by the lusts of the flesh.

It included wrong desires and wrong thinking together.

Old English can hide a very different meaning behind a familiar word.

🗣️ Conversation here means way of life
🚫 Not simply talking
🧠 It covered both body and mind
📖 Old English can hide a different meaning

## 😡 By Nature The Children Of Wrath

By nature means this was true from birth.

Children of wrath repeats the same Hebrew pattern already seen in this chapter.

Paul says every person inherited this condition, Jew and Gentile alike.

Even as others makes clear nobody got an exception.

😡 By nature means true from birth
🔁 Repeats the children of X pattern
🌍 Jew and Gentile shared this condition
📖 Even as others means no exceptions

# Ephesians 2:4-7
# ✨ Raised Up Together With Christ
---
## 🙌 But God, Who Is Rich In Mercy

But God marks one of the biggest turns in the whole Bible.

Verses one through three described people who were spiritually dead.

Two small words completely change the direction of the sentence.

Rich in mercy means God's mercy was never in short supply.

🙌 But God marks the turning point
💀 Verses one through three described death
🔄 Two words change the whole direction
📖 God's mercy was never in short supply

## 🌱 Quickened Us Together With Christ

Quickened repeats the exact word from verse one.

Together with Christ means this new life is not separate from his.

Believers share directly in the same resurrection life Christ already has.

This shared life is the reason spiritual death does not get the final word.

🌱 Quickened repeats the word from verse one
✝️ Believers share Christ's own resurrection life
🤝 This life is a shared union
📖 Death does not get the final word

## 🎁 By Grace Ye Are Saved

Paul interrupts his own sentence to say this clearly.

Grace means favor given freely, not earned.

He returns to this exact phrase and expands it fully in verse eight.

Stating it early shows how central this truth is to the whole chapter.

🎁 Grace means favor given freely
⏸️ Paul interrupts his sentence to say this
🔁 He expands on it in verse eight
📖 This truth is central to the chapter

## 👑 Made Us Sit Together In Heavenly Places

Sitting pictures rest after work is finished, not more labor.

Heavenly places was already named in chapter one.

It describes the realm where Christ now rules.

Being seated there means believers already share in that position.

Paul describes this as already true, not only a future hope.

👑 Sitting pictures rest, not more labor
🌌 Heavenly places repeats the term from chapter one
🤝 Believers already share Christ's own position
📖 This is already true, not only future

## ⏳ In The Ages To Come

This phrase looks forward to time that has not happened yet.

God's kindness toward believers keeps being shown long after this life ends.

Grace was never meant to run out after one lifetime.

God's grace continues being displayed across eternity.

⏳ Points forward to time not yet here
🎁 God's kindness keeps being shown
🚫 Grace was never meant to run out
📖 God's grace continues across eternity

## 💰 The Exceeding Riches Of His Grace

Exceeding means going past any normal limit.

Riches pictures grace as something vast and overflowing.

Paul stacks both words together on purpose.

Doing that stresses just how much grace this actually is.

Kindness toward us ties this abundance to how God treats people personally.

💰 Exceeding means past any normal limit
🏔️ Riches pictures grace as something vast
🧩 Both words are stacked on purpose
📖 God's kindness is personal, not just theory

# Ephesians 2:8-10
# 🎁 Saved By Grace, Not By Works
---
## 🎁 By Grace Are Ye Saved Through Faith

Grace is the gift being offered.

Faith is simply how a person receives it.

Faith does not earn salvation.

It only reaches out and takes hold of a gift.

Paul already said this once in verse five.

Here he finally explains it in full.

🎁 Grace is the gift being offered
🤲 Faith is how a person receives it
🔁 Paul expands on verse five here
📖 God is the source, not human effort

## 🙅 Not Of Yourselves

Paul rules out every other possible source of salvation.

A person cannot point to their own decision as the reason.

They cannot point to their own effort either.

This clears away any room for partial credit.

Salvation stays entirely a gift from start to finish.

🙅 Rules out every other possible source
🚫 Not decision, effort, or goodness
🙌 No room for partial credit
📖 Salvation is a gift start to finish

## 🎀 It Is The Gift Of God

Gift means something given freely.

Nothing is expected in return.

A gift that had to be earned would not really be a gift.

Paul uses the plainest word possible here.

Nobody should confuse salvation with a reward for good behavior.

🎀 Gift means given freely, nothing owed back
🚫 An earned gift is not really a gift
🏆 Salvation is not a reward for behavior
📖 This states plainly where salvation comes from

## 🙅 Not Of Works, Lest Any Man Should Boast

Works means a person's own good deeds and effort.

If works could save someone, that person could brag about it.

Paul removes that possibility completely.

Praise stays pointed only at God.

This verse sits right next to grace on purpose.

🙅 Works means a person's own effort
🗣️ Earned salvation would give a reason to boast
🙌 Praise stays pointed only at God
📖 Grace and works cannot both be the reason

## 🛠️ His Workmanship

Workmanship describes something carefully made by a skilled hand.

It is not something that happened by accident.

Paul switches the picture here.

Believers are not just rescued, they are also crafted.

This new identity comes from God's own design.

🛠️ Workmanship means carefully made, not accidental
🎨 Believers are crafted, not only rescued
✝️ This identity comes from God's design
📖 Good craftsmanship reflects its maker

## 🧭 Before Ordained That We Should Walk In Them

Ordained means planned out ahead of time.

The good works here were not left to chance.

God had already decided their shape before any believer did one.

Walk in them pictures a daily path.

It is not one single grand act.

🧭 Ordained means planned out ahead of time
🚫 Not left to chance or guesswork
🚶 Walk pictures a daily path
📖 God planned these works in advance

# Ephesians 2:11-13
# 🚪 Once Far Off, Now Brought Near
---
## 🌍 Gentiles In The Flesh

Gentile meant anyone not born Jewish.

In the flesh points to birth and family line.

That is something a person has no control over.

Paul reminds this mostly Gentile church where they started.

Being born outside Israel once meant being born outside God's covenant promises.

🌍 Gentile meant not born Jewish
🧬 In the flesh points to birth and family
🚪 This marked where they started
📖 It once meant being outside the covenant

## ✂️ The Circumcision In The Flesh Made By Hands

Circumcision was the physical sign God gave Israel.

It marked them as his covenant people.

Made by hands stresses that this sign was only an outward act.

Jewish people sometimes used Uncircumcision as an insult for outsiders.

Paul names that old insult directly before he removes it.

✂️ Circumcision marked Israel as God's covenant people
✋ Made by hands means only an outward act
🏷️ Uncircumcision was once used as an insult
📖 Paul names the old insult before removing it

## 🏛️ Aliens From The Commonwealth Of Israel

Alien meant someone with no legal standing in a nation.

Commonwealth of Israel describes the whole community God formed through covenant.

Gentiles stood completely outside that community.

They had no claim on its promises.

This was a real legal status, not just a feeling of distance.

🏛️ Alien means no legal standing in a nation
🇮🇱 Commonwealth of Israel names God's covenant community
🚪 Gentiles stood completely outside it
📖 This was a real status, not a feeling

## 📜 Strangers From The Covenants Of Promise

Covenants of promise names God's agreements with Abraham, Isaac, and Jacob.

Those promises included land, descendants, and future blessing.

A stranger had no legal share in any of it.

Paul lists this as a second, related loss.

📜 Covenants of promise names God's agreements with Israel
🗺️ They included land, descendants, and blessing
🙅 Strangers had no legal share in them
📖 This loss stands apart from the first

## 😔 Having No Hope, And Without God In The World

This is the lowest point of the whole description.

No hope means no confident expectation of anything better ahead.

Without God means no real relationship with the true God.

Many other gods still surrounded them every day.

The turn comes in the very next verse.

😔 The lowest point in this description
🚫 No hope means no confident expectation ahead
🙅 Without God despite being surrounded by gods
📖 The turn comes in the very next verse

## 🩸 Made Nigh By The Blood Of Christ

Nigh is an old word for near.

Far off and made nigh describe the same distance from verse twelve.

Christ's blood is the price that closed that distance.

Paul says the distance is now fully gone, not partly closed.

🩸 Nigh means near or close
📏 Far off and nigh describe the same distance
✝️ Christ's blood closed that distance
📖 The distance is fully gone, not partial

# Ephesians 2:14-18
# 🕊️ Christ Breaks Down The Wall
---
## 🕊️ He Is Our Peace

Peace here means far more than a calm feeling.

It means real hostility between two groups has actually ended.

Paul is not describing a truce that could break again.

Christ himself is that peace.

This peace holds both Jewish and Gentile believers together.

🕊️ Peace means real hostility has ended
🚫 Not a truce that could break again
🤝 Christ himself is that peace
📖 It holds both Jew and Gentile together

## 🧱 The Middle Wall Of Partition

Many scholars believe this pictures a real wall in the Jerusalem temple.

That wall kept Gentiles out of the inner courts.

A sign there warned Gentiles not to cross that line.

Paul uses that physical wall as a picture of a deeper division.

Christ broke down both kinds of wall.

🧱 Likely pictures the temple's dividing wall
⚠️ Gentiles faced danger for crossing that line
🖼️ It pictures a deeper division too
📖 Christ broke down both kinds of wall

## 📜 The Law Of Commandments Contained In Ordinances

This phrase points to Israel's detailed Old Testament rules.

Those rules marked Israel as separate from every other nation.

Many of them covered food, festivals, and ritual practice.

Abolished does not mean God's moral standards disappeared.

It means these separating rules no longer divide Jew from Gentile.

📜 Points to Israel's separating Old Testament rules
🍽️ Covered food, festivals, and ritual practice
🙅 God's moral standards did not disappear
📖 These rules no longer divide Jew from Gentile

## 🧑‍🤝‍🧑 Of Twain One New Man

Twain is an old word for two.

Paul is not saying Gentiles simply joined an existing group.

Something genuinely new was created here.

It is a single new people made out of two very different groups.

Both belong equally, with neither one absorbing the other.

🧑‍🤝‍🧑 Twain means two
🆕 Something genuinely new was created
⚖️ Neither group absorbs the other
📖 Both belong equally to this new identity

## ✝️ Reconcile Both Unto God In One Body

Reconcile means restoring a broken relationship back to peace.

This reconciliation moves in two directions at once.

People are brought back to God.

People are also brought together with each other.

One body names the church as a single unified group.

The cross is where both of these actually happened.

✝️ Reconcile means restoring a broken relationship
🔀 Two directions at once, God and each other
👥 One body means a single unified group
📖 The cross is where this happened

## 🚶 Which Were Afar Off, And To Them That Were Nigh

Afar off and nigh repeat language already used earlier in this chapter.

Afar off pictures the Gentiles.

Nigh pictures the Jewish people who already had the covenant.

Paul says the same peace was preached to both groups.

Neither group received a separate message.

🚶 Repeats language used earlier in the chapter
🌍 Afar off pictures the Gentiles
🇮🇱 Nigh pictures the Jewish people
📖 Both groups received the same message

## 🙏 Access By One Spirit Unto The Father

Access means the right to approach and be welcomed.

It is not merely permission to look from a distance.

One Spirit means both Jewish and Gentile believers come to God the same way.

Unto the Father names where that access leads, a real relationship.

Nobody in Christ holds a lesser kind of access.

🙏 Access means the right to approach
🕊️ One Spirit leads both groups the same way
👨‍👧 It leads to the Father, a relationship
📖 Nobody holds a lesser kind of access

# Ephesians 2:19-22
# 🏛️ Built Into One Holy Temple
---
## 🙅 No More Strangers And Foreigners

Strangers and foreigners repeats the legal language used earlier in this chapter.

Paul now flips that same language into its opposite.

No legal standing once described these Gentile believers.

That no longer describes them at all.

The change is complete, not partial.

🙅 Repeats the earlier legal language
🔄 Paul flips it into its opposite
🚪 No belonging has become full belonging
📖 This change is complete, not partial

## 🏙️ Fellowcitizens With The Saints

Fellowcitizens pictures shared legal standing inside one nation.

Gentile believers now hold the exact same standing as Jewish believers.

Household of God adds an even closer picture.

It pictures family, not just a shared nation.

Both pictures stack together to describe one complete belonging.

🏙️ Fellowcitizens pictures shared national standing
🤝 Gentile and Jewish believers now stand equal
👪 Household of God pictures family, not citizenship
📖 Both pictures describe one complete belonging

## 🪨 The Foundation Of The Apostles And Prophets

A foundation is the part of a building nobody sees once construction finishes.

Everything else depends on it staying solid.

Apostles and prophets were the first eyewitnesses who carried the gospel.

Paul says the church rests entirely on what they taught.

Remove the foundation, and the whole structure loses its support.

🪨 A foundation supports everything above it
🗣️ Apostles and prophets carried God's revealed word
🏗️ The church rests on what they taught
📖 Remove it, and the structure falls

## 🗿 The Chief Corner Stone

A chief corner stone was the first stone set in an ancient building.

It was the most important one.

Every other stone had to line up with it.

Jesus Christ holds that exact position for the church.

Nothing about this building stands straight without him.

🗿 The first, most important stone set down
📐 Every other stone lined up with it
✝️ Jesus holds that position for the church
📖 Nothing stands straight without him

## 🏗️ Fitly Framed Together

Fitly framed pictures stones cut to fit precisely into place.

There are no gaps left between them.

A building like that grows stronger as pieces are added.

Groweth describes the church as something still being built.

It is not already finished.

🏗️ Fitly framed means pieces cut to fit precisely
💪 More pieces added makes it stronger
🌱 Groweth means still being built, not finished
📖 It is built for God's own presence

## 🏠 An Habitation Of God Through The Spirit

Habitation means a dwelling place, somewhere someone actually lives.

The Old Testament temple was one building where God's presence specially dwelled.

Paul says believers together now form that same kind of dwelling.

The Holy Spirit lives in them the way God once dwelled in that building.

This chapter began with people who were spiritually dead.

It ends with God himself choosing to live among them.

🏠 Habitation means a dwelling place
🏛️ The temple once held that one role
🕊️ Believers now form that dwelling through the Spirit
📖 It ends with God living among them
`.trim();

export const EPHESIANS_TWO_PERSONAL_SECTIONS = parseEphesiansTwoRawNotes(EPHESIANS_TWO_RAW_NOTES);
