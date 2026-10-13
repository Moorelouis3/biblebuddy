export type FirstCorinthiansThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstCorinthiansThirteenRawNotes(rawText: string): FirstCorinthiansThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstCorinthiansThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstCorinthians\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing First Corinthians 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstCorinthians\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstCorinthians\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing First Corinthians 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Corinthians 13:${startVerse}` : `1 Corinthians 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 First Corinthians 13 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CORINTHIANS_THIRTEEN_RAW_NOTES = `# FirstCorinthians 13:1-3
# 📢 Nothing Without Love
---
## 🗣️ Tongues Of Men And Of Angels

"Tongues" means speaking in real languages by the power of the Holy Spirit.

Chapter twelve just ranked this gift as one of the showier ones in Corinth.

"Of angels" pushes the picture even further, speech beyond anything humanly possible.

Paul begins with the most dazzling gift on purpose.

Even that gift is worthless without love.

🗣️ Tongues means real spoken languages

🏆 Chapter twelve ranked this gift high

😇 Angels pushes the picture further

📖 Even dazzling gifts need love

## 🔔 Sounding Brass, Or A Tinkling Cymbal

Brass gongs and cymbals were common in pagan temple worship near Corinth.

Worshipers used loud metal instruments to work themselves into a frenzy.

A cymbal makes noise but carries no melody of its own.

Paul compares tongues without love to that same empty noise.

It sounds impressive for a moment and means nothing after.

🔔 Brass and cymbals filled pagan worship

😤 Instruments stirred worshipers into frenzy

🔕 A cymbal makes noise, not melody

➡️ Impressive sound can still mean nothing

## ❤️ Have Not Charity

"Charity" in this chapter means love, not giving money to the poor.

The Greek word behind it is agape, a love that chooses to act for someone else's good.

Every gift Paul names in this chapter means nothing without that kind of love behind it.

This one word sets up the whole rest of the chapter.

❤️ Charity means agape love here

🎯 Love chooses to act for others

🔑 This word defines the whole chapter

📖 No gift matters without it

## 🔐 Gift Of Prophecy, And Understand All Mysteries, And All Knowledge

Prophecy meant speaking a message straight from God to the church.

"Mysteries" meant truths about God's plan that stayed hidden until God chose to reveal them.

Paul uses that word elsewhere for God's plan to save Gentiles alongside Jews.

Prophecy, mysteries, and all knowledge together name the most impressive gifts a Corinthian could claim.

Even every gift combined is not enough on its own.

🗣️ Prophecy means a message from God

🔐 Mysteries means truth hidden until revealed

📚 Paul uses mysteries for God's larger plan

📖 Even every gift combined is not enough

## ⛰️ Faith, So That I Could Remove Mountains

Jesus himself once told His disciples that faith could move a mountain into the sea.

Paul is picking up that same picture here on purpose.

Having faith that powerful would put someone among the greatest believers who ever lived.

Paul still ranks that kind of faith below love.

⛰️ Jesus first used this mountain picture

🔁 Paul borrows that same image

🌟 This describes extraordinary faith

📖 Even that ranks below love

## 🎁 Bestow All My Goods To Feed The Poor

"Bestow" means to give away completely, not just share a portion.

Paul pictures someone giving away every single possession they own.

Feeding the poor was already considered one of the most generous acts a person could do.

Even total generosity like that still needs love behind it to count for anything.

🎁 Bestow means give away completely

💰 Paul pictures total generosity

🍞 Feeding the poor was already admired

📖 Generosity still needs love behind it

## 🔥 Give My Body To Be Burned

This pictures the most extreme kind of self sacrifice.

A believer dying by fire for their faith.

Some early manuscripts of this verse read "boast" instead of "burned."

Scholars remain divided on which word Paul actually wrote.

Either way, Paul names the ultimate act a person could offer.

Even giving up life itself still profits nothing without love.

🔥 Burned pictures dying for the faith

📜 Some manuscripts read boast instead

🤔 Scholars are divided on the wording

📖 Even dying for faith needs love

# FirstCorinthians 13:4-7
# 📜 What Love Does
---
## ⏳ Charity Suffereth Long, And Is Kind

"Suffereth long" means staying patient through repeated frustration, not just surviving one hard moment.

Paul puts patience and kindness first on purpose, as the foundation for everything else on this list.

Corinth was a church full of grudges, lawsuits, and petty rivalries.

Paul starts love's description with the two qualities that church needed most.

⏳ Suffereth long means lasting patience

🤝 Kindness and patience come first

⚖️ Corinth was full of grudges

📖 Love starts where Corinth was weakest

## 👀 Charity Envieth Not

Envy means resenting what someone else has instead of being glad for them.

Corinth had already split into rival groups bragging about which teacher they followed.

Chapter twelve also just described believers envying each other's spiritual gifts.

Love refuses to compete for attention that way.

👀 Envy means resenting another's blessing

🏛️ Corinth split into rival groups

🎁 Chapter twelve named envy over gifts

➡️ Love does not compete for attention

## 📢 Vaunteth Not Itself, Is Not Puffed Up

"Vaunteth" means bragging openly about yourself.

"Puffed up" pictures someone swollen with pride.

They look bigger outside than they really are inside.

Paul already used this same phrase earlier in this letter for Corinth's pride problem.

Love never needs to inflate itself to look impressive.

📢 Vaunteth means bragging openly

🎈 Puffed up means swollen with pride

🔁 Paul already used this phrase before

➡️ Love never needs to look bigger

## 🙅 Doth Not Behave Itself Unseemly

"Unseemly" means acting in a way that is rude or out of place.

Corinth's worship gatherings had already turned chaotic and disorderly.

Head coverings, the Lord's supper, and spiritual gifts all became occasions for that disorder.

Love behaves appropriately even when it has the freedom to do otherwise.

🙅 Unseemly means rude or out of place

🏛️ Corinth's worship had turned chaotic

📋 Head coverings and the supper both suffered

➡️ Love behaves well even when free not to

## 🙋 Seeketh Not Her Own

This means love does not grab for its own advantage first.

Paul already told the Corinthians directly to stop seeking their own good and seek their neighbor's instead.

That same instruction now gets folded into the definition of love itself.

Love measures itself by what it gives, not what it gets.

🙋 Seeketh not her own means no grabbing

🔁 Paul already gave this instruction before

🤝 Now it becomes part of love's definition

📖 Love gives more than it gets

## 😡 Is Not Easily Provoked, Thinketh No Evil

"Provoked" means quick to anger.

Love does not stay on a hair trigger, ready to explode at every offense.

"Thinketh no evil" means love does not keep score, tallying up other people's wrongs.

Both qualities protect a relationship from slowly poisoning itself.

😡 Provoked means quick to anger

🧮 Thinketh no evil means no scorekeeping

💧 Both guard against slow poison

➡️ Love refuses to keep a grudge list

## ⚖️ Rejoiceth Not In Iniquity, But Rejoiceth In The Truth

"Iniquity" means wrongdoing or sin.

Love never celebrates when something wrong happens, even to someone love dislikes.

Instead, love is glad whenever truth wins out, whatever that truth turns out to be.

This rules out the kind of gossip that enjoys hearing bad news about someone else.

⚖️ Iniquity means wrongdoing or sin

🚫 Love never celebrates wrongdoing

🗣️ This rules out gleeful gossip

📖 Love is glad when truth wins

## 🔁 Beareth All Things, Believeth All Things, Hopeth All Things, Endureth All Things

Paul repeats "all things" four times in a row on purpose.

"Beareth" means covering for someone instead of exposing them.

"Believeth" and "hopeth" mean giving someone the benefit of the doubt instead of assuming the worst.

"Endureth" means staying present through hardship instead of walking away.

Four different angles on the same stubborn commitment.

🔁 Four things repeated for emphasis

🛡️ Beareth means covering, not exposing

🤲 Believeth and hopeth assume the best

📖 Endureth means staying through hardship

# FirstCorinthians 13:8-10
# ⏳ The Incomplete And The Complete
---
## ⏳ Charity Never Faileth

"Faileth" means to run out or come to an end.

Every spiritual gift Paul has discussed in this letter has a shelf life.

Love does not.

This single line flips the whole conversation from gifts that are temporary to love that is permanent.

⏳ Faileth means comes to an end

🎁 Every gift so far has a limit

♾️ Love alone does not run out

📖 This flips gifts into permanent love

## 📜 Whether There Be Prophecies, They Shall Fail

"Fail" here means that this gift will eventually stop being needed.

Prophecy delivered God's message directly when the church had no completed Bible to read.

Paul is not saying prophecy was fake or unimportant.

He is saying it was always meant to be temporary.

📜 Fail means stop being needed

📖 Prophecy filled a gap before scripture was complete

🙅 Not fake, just temporary

➡️ Some gifts were built to expire

## 🗣️ Whether There Be Tongues, They Shall Cease

Tongues, the gift Paul opened this chapter with, gets named again here.

"Cease" means to stop completely, not just fade for a while.

This verse is part of a long running debate over whether tongues continue today.

Whatever side of that debate someone lands on, Paul's main point stands either way.

Even the showiest gift in chapter twelve was never meant to be permanent.

🗣️ Tongues gets named again here

🛑 Cease means stop completely

⚔️ This verse fuels a long debate

📖 The showiest gift was never permanent

## 🔍 Whether There Be Knowledge, It Shall Vanish Away

"Vanish away" means this kind of knowledge will not last forever in its current form.

Paul is not saying knowledge is worthless.

He is saying it is incomplete, like a letter with half the words missing.

Something more complete is coming to replace it.

🔍 Vanish away means it will not last forever

📬 Knowledge here is incomplete, not worthless

✉️ Picture a letter missing half its words

📖 Something more complete replaces it later

## 🧩 We Know In Part, And We Prophesy In Part

"In part" means partial, like a puzzle with most of the pieces still missing.

Paul includes himself in this limitation, even though he wrote much of the New Testament.

Nobody in Corinth, however gifted, had the complete picture yet.

Admitting that honestly was itself a form of humility Corinth badly needed.

🧩 In part means pieces still missing

✍️ Paul includes himself in this limit

🏛️ Nobody in Corinth had the full picture

📖 Admitting limits is a form of humility

## 💯 When That Which Is Perfect Is Come

"Perfect" here means complete or whole, not flawless in the modern sense.

Some readers assume this means the completed Bible, but Paul never says that anywhere in this passage.

The context before and after this verse points toward seeing God fully, not finishing a book.

The incomplete fading away describes this present life giving way to that fuller reality.

💯 Perfect means complete, not flawless

📖 Not a reference to a finished Bible

👁️ The context points toward seeing God fully

➡️ The incomplete gives way to the full

# FirstCorinthians 13:11-13
# 🪞 Face To Face
---
## 👶 When I Was A Child, I Spake As A Child

Paul switches from spiritual gifts to a simple picture from ordinary life.

A child's speech, understanding, and thinking are all limited, not wrong, just immature.

That immaturity is not something to be ashamed of at the time.

It is only a problem if someone refuses to outgrow it.

👶 Paul switches to an ordinary picture

🗣️ A child's speech is simply limited

🙅 Immaturity itself is not shameful

➡️ The problem is refusing to grow

## 🌱 When I Became A Man, I Put Away Childish Things

Growing up means setting aside ways of thinking that once made sense but no longer fit.

Paul already called the Corinthians spiritually immature earlier in this letter.

He compared them to infants fed only milk, not solid food.

This verse quietly answers that earlier criticism with a picture of real growth.

Spiritual maturity means being willing to put old patterns away.

🌱 Growing up means outgrowing old patterns

🍼 Paul once called them spiritual infants

🥛 Milk instead of solid food, back then

📖 This verse pictures what real growth looks like

## 🪞 We See Through A Glass, Darkly

"Glass" here does not mean a clear window pane.

Ancient mirrors were made of polished metal, usually bronze or copper.

They gave back a dim, slightly warped reflection, nothing like a modern mirror.

"Darkly" describes that same dimness, not literal darkness.

Every bit of understanding believers have now is like that blurry reflection, real but incomplete.

🪞 Glass means an ancient metal mirror

🥉 Mirrors were bronze or copper, not glass

🌫️ Darkly means dim, not literally dark

📖 Present understanding is real but blurry

## 👤 Then Face To Face

This phrase pictures a direct meeting with no mirror in between at all.

It describes seeing God fully, not through any dim reflection anymore.

The contrast with the blurry mirror in the first half of this verse could not be sharper.

Full clarity is coming, just not yet.

👤 Face to face means no mirror between

👁️ It pictures seeing God directly

🔀 This contrasts with the blurry mirror

➡️ Full clarity is coming, just not yet

## 🧩 Now I Know In Part, But Then Shall I Know Even As Also I Am Known

Right now, every believer's knowledge of God is partial.

Paul adds a second half to this thought that is easy to miss, being fully known.

It is not only about finally understanding God completely.

It is also about being completely known by God, with nothing hidden anymore.

That second half is the more comforting one.

🧩 Knowing God now is still partial

🔍 Paul adds being fully known too

🙈 Nothing will stay hidden anymore

📖 Being fully known is the comfort here

## ♾️ Now Abideth Faith, Hope, Charity, These Three

"Abideth" means remains or continues.

That is the opposite of the gifts just described as fading out.

Faith, hope, and love form a different list than the gifts from chapter twelve.

All three survive into whatever comes after this life.

Paul is naming what actually lasts.

♾️ Abideth means remains or continues

🔄 The opposite of fading spiritual gifts

📋 A different list than chapter twelve's gifts

📖 Paul names what actually lasts

## 👁️ The Greatest Of These Is Charity

Faith will one day become sight, no longer needed the same way.

Hope will one day become reality, once it finally arrives.

Love never changes into something else.

It stays exactly what it always was, which is why it ranks above the other two.

This line closes the whole chapter by answering its opening question.

👁️ Faith becomes sight one day

🎯 Hope becomes reality one day

❤️ Love alone never changes

📖 This closes the whole chapter's argument
`.trim();

export const FIRST_CORINTHIANS_THIRTEEN_PERSONAL_SECTIONS = parseFirstCorinthiansThirteenRawNotes(FIRST_CORINTHIANS_THIRTEEN_RAW_NOTES);
