export type RomansTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRomansTwelveRawNotes(rawText: string): RomansTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RomansTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Romans\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Romans 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Romans\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Romans\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Romans 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Romans 12:${startVerse}` : `Romans 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Romans 12 sections, received " + sections.length);
  }

  return sections;
}

const ROMANS_TWELVE_RAW_NOTES = `# Romans 12:1-2
# 🙏 A Living Sacrifice
---
## I Beseech You Therefore, Brethren

"Beseech" means a strong personal plea, not a cold command.

Paul chooses pleading over ordering, even though he carries real authority.

"Therefore" points back to everything he has argued since chapter one.

The mercies of God are the reason for what comes next.

Grace already given is what makes the request possible at all.

🙏 Beseech means a strong plea, not an order
🔗 Therefore looks back at chapters one through eleven
🎁 Mercy comes first, obedience follows after
📖 Grace already given makes the request possible

## Present Your Bodies A Living Sacrifice

In the Old Testament, a sacrifice was an animal killed on an altar.

Paul pictures something different, a sacrifice that stays alive.

The body itself, not a ritual object, becomes the offering.

A living sacrifice gives itself again every day, not only once.

Worship moves from a single event into an ongoing way of living.

🐑 Old Testament sacrifices were animals that died
💓 Paul pictures a sacrifice that stays alive
🙌 The body itself becomes the offering
📖 Worship becomes an ongoing way of living

## Holy, Acceptable Unto God

"Holy" means set apart for God's own use, not ordinary use.

"Acceptable" means pleasing, the kind of gift that gets welcomed.

Old Testament priests checked sacrifices for blemishes before they could be offered.

Paul says a life devoted to God meets that same standard.

No animal inspection is needed now, the test is a surrendered life.

🎯 Holy means set apart for God alone
✅ Acceptable means pleasing, not rejected
🔍 Priests once checked sacrifices for blemishes
📖 A surrendered life meets that same standard

## Which Is Your Reasonable Service

"Reasonable" does not mean simple, it means rational, fitting the facts.

"Service" here echoes the word used for priestly worship.

Mercy came first in Paul's argument, so this offering answers it.

Giving God a whole life is not extreme once the mercy is seen.

The offering fits the size of the gift it answers.

🧠 Reasonable means rational, not extreme
⛪ Service here echoes priestly worship
🔄 Mercy came first, response follows after
📖 The offering fits the gift it answers

## Be Not Conformed To This World

"Conformed" pictures being pressed into an outside mold.

"This world" means the present age with its own pressures and values.

Paul warns against quietly taking the shape of whatever culture presses in.

The pressure is often slow and constant, not loud or sudden.

Noticing the mold is the first step toward resisting it.

🧱 Conformed means pressed into an outside mold
🌍 This world means the present age's values
🤫 The pressure is usually slow, not loud
📖 Noticing the mold is the first step

## Be Ye Transformed By The Renewing Of Your Mind

"Transformed" comes from a word that pictures change from the inside out.

It shares a root with the word for a caterpillar becoming something new.

This change starts in the mind, not with outward behavior first.

"Renewing" describes an ongoing process, not a single fix.

Paul sets it directly against being pressed into the world's mold.

🦋 Transformed pictures change from the inside out
🧠 The change starts in the mind first
🔁 Renewing is ongoing, not a single fix
📖 Inner change replaces outward pressure

## That Ye May Prove What Is That Good, And Acceptable, And Perfect, Will Of God

"Prove" means to test something and find by experience that it holds.

A renewed mind does not just agree with God's will, it tests and confirms it.

"Good," "acceptable," and "perfect" describe one will from three angles, not three wills.

Knowing God's will becomes something lived, not only studied.

A mind renewed this far can finally recognize what is true.

🔬 Prove means test and confirm by experience
✅ A renewed mind tests God's will directly
🔺 Good, acceptable, and perfect describe one will
📖 Knowing God's will becomes something lived

# Romans 12:3-8
# 🧩 Many Members, One Body
---
## Not To Think Of Himself More Highly Than He Ought To Think

Paul is not giving a general command to feel bad about yourself.

He is addressing pride tied to spiritual gifts, named a few lines later.

"More highly than he ought" means rating your own gift above its real size.

The warning sits right before Paul lists several different gifts.

Clear thinking about yourself starts with an honest view of what you were given.

🚫 Not a general command to feel small
🎁 Paul is addressing pride about gifts here
⚖️ More highly means overrating your own gift
📖 No gift outranks another by nature

## According As God Hath Dealt To Every Man The Measure Of Faith

"Soberly" means clear headed, not drunk on pride or false modesty.

"Measure" pictures a portion, like a jar filled to a specific line.

God gives each person a measure of faith fitted to their role.

An honest measurement needs a standard outside yourself to check against.

God's own assignment becomes that standard here.

🧊 Soberly means clear headed self assessment
📏 Measure pictures a portion filled to a line
🎯 Each person gets a fitted amount
📖 God's assignment is the real standard

## For As We Have Many Members In One Body

Paul borrows a picture everyone already understands, a body with many parts.

An eye and a hand do completely different jobs, yet both belong to one person.

He is about to apply that same picture to a church full of gifted people.

No single part can do everything the body needs alone.

Difference inside one body is normal, not a problem to fix.

🫀 Paul borrows a familiar body picture
👁️ Different parts do different jobs
🤝 No one part does everything alone
📖 Difference inside one body is normal

## Gifts Differing According To The Grace That Is Given To Us

"Gifts" here means abilities handed out by grace, not earned talents.

"Differing" shows the variety is on purpose, not a flaw.

Grace decides who gets which gift, the same grace running through this letter.

A gift received by grace leaves no grounds for pride over someone else.

The list that follows names a few examples, not a full catalog.

🎁 Gifts are given by grace, not earned
🌈 Differing variety is on purpose, not a flaw
🙏 Grace decides who receives which gift
📖 A given gift leaves no room for pride

## He That Ruleth, With Diligence

"Ruleth" describes someone in a position of leading or managing others.

This could describe leadership inside a church or inside a household.

"Diligence" means steady, careful effort, not loud or showy leadership.

Paul matches each gift to the attitude that gift needs most.

A leader without diligence drifts, even while holding real authority.

🧭 Ruleth describes someone who leads or manages
🏠 This could mean church or household leadership
⏳ Diligence means steady, careful effort
📖 Leadership without diligence drifts

## He That Sheweth Mercy, With Cheerfulness

Showing mercy usually means caring for people in need, the sick or the poor.

"Cheerfulness" rules out doing this out of guilt or duty.

Mercy given with a sour attitude still helps, but it teaches something false about God.

Paul wants the attitude to match the gift, not only the action.

Cheerful mercy reflects the God who gives mercy freely himself.

🤲 Mercy means caring for people in need
😊 Cheerfulness rules out grudging charity
🎭 Attitude should match the action
📖 Cheerful mercy reflects God's own mercy

# Romans 12:9-13
# ❤️ Love Without Pretending
---
## Let Love Be Without Dissimulation

"Dissimulation" means pretending to feel something you do not actually feel.

It pictures wearing a mask of love while something else sits underneath.

Paul demands the mask come off entirely.

Real love costs more than performed love, because performed love cannot last.

This one line sets the standard for everything listed after it.

🎭 Dissimulation means pretending, wearing a mask
🚫 Paul demands the mask come off
💯 Performed love cannot be kept up for long
📖 This line sets the standard for the list

## Abhor That Which Is Evil, Cleave To That Which Is Good

"Abhor" is a strong word, closer to disgust than mild dislike.

"Cleave" pictures something stuck fast, like two surfaces glued together.

Paul does not ask for a lukewarm reaction to either evil or good.

Genuine love includes a real response to both, not neutrality.

Comfort with evil means love has already drifted from what Paul describes.

🤢 Abhor means strong disgust, not mild dislike
🧲 Cleave pictures something stuck fast together
🚫 Paul rejects a lukewarm middle ground
📖 Comfort with evil means love has drifted

## In Honour Preferring One Another

"Preferring" here means ranking someone else's honor ahead of your own.

This is not empty flattery or forced compliments.

It describes a habit of noticing and valuing other people first.

The line sits right after the earlier warning against overrating your own gift.

Honoring others becomes the practical opposite of that same pride.

🏅 Preferring means ranking others' honor first
🚫 Not flattery, a real habit of noticing others
🔁 It connects back to the pride warning
📖 Honoring others is pride's practical opposite

## Fervent In Spirit, Serving The Lord

"Fervent" pictures something boiling, heated to its highest point.

Paul is not describing emotional excitement for its own sake.

The heat has a direction here, serving the Lord, not just feeling intense.

Spiritual energy without a target burns out or goes nowhere useful.

Feeling and purpose are tied together in one short phrase.

🔥 Fervent pictures something boiling hot
🎯 The heat is aimed at serving the Lord
⚠️ Energy without direction burns out
📖 Feeling and purpose are tied together

## Given To Hospitality

Hospitality in the ancient world usually meant housing a traveling stranger.

Inns were unreliable and sometimes dangerous, so a welcoming home mattered.

Opening a home carried real cost and sometimes real risk.

"Given to" suggests pursuing the chance, not only agreeing when asked.

This instruction asks for an open door, not a passive willingness.

🏡 Hospitality meant housing traveling strangers
⚠️ Inns were unreliable, sometimes dangerous
💸 Opening a home carried real cost
📖 Given to means pursuing it, not just agreeing

# Romans 12:14-16
# 🕊️ Bless Those Who Persecute You
---
## Bless Them Which Persecute You, Bless And Curse Not

"Persecute" describes active harm, not just disagreement or mild criticism.

"Bless" means speaking well of someone, even asking God's good for them.

Paul repeats "bless" and adds "curse not" for emphasis.

This goes directly against the normal instinct to return harm for harm.

The command targets people causing real suffering, not minor annoyance.

⚔️ Persecute means active harm, not disagreement
🙏 Bless means speaking well, asking God's good
🔁 Paul repeats bless twice for emphasis
📖 This reverses the normal instinct for payback

## Rejoice With Them That Do Rejoice, And Weep With Them That Weep

This describes matching someone else's emotional moment, not reacting from outside.

Rejoicing with a happy person can be harder than it sounds if envy gets in the way.

Weeping with a grieving person means sitting in the sadness, not rushing to fix it.

Both halves require setting your own mood aside to meet someone else's.

Paul treats shared emotion as part of real community.

😊 Rejoicing with others means setting envy aside
😢 Weeping with others means sitting in sadness
🤝 Both require setting your own mood aside
📖 Shared emotion is part of real community

## Condescend To Men Of Low Estate

"Condescend" sounds insulting today, but it meant something good here.

It described willingly lowering your own position to meet someone of lower standing.

"Low estate" meant people without wealth, status, or influence.

Paul asks for a deliberate step down, not a polite distance kept.

Being of one mind means refusing to rank people by social status.

📉 Condescend meant lowering yourself willingly
💰 Low estate meant no wealth or status
🚶 Paul asks for a real step down
📖 This means refusing to rank people

## Be Not Wise In Your Own Conceits

"Conceits" means a private, inflated opinion of your own wisdom.

It describes someone who trusts their own judgment so much they stop checking it.

Paul already warned against overrating spiritual gifts earlier in this chapter.

This line widens that same warning to cover a person's whole outlook.

A mind convinced it already knows best stops being able to learn.

🪞 Conceits means an inflated self opinion
🚫 It means never checking your own judgment
🔁 This widens the earlier gift warning
📖 A mind sure it knows best stops learning

# Romans 12:17-21
# 🛡️ Overcome Evil With Good
---
## Recompense To No Man Evil For Evil

"Recompense" means to pay back, to return the same treatment received.

Paul forbids repaying harm with more harm, with no exceptions listed.

This applies to every person, not only fellow believers.

The command assumes retaliation feels justified, and still rules it out.

Refusing to repay evil is a deliberate choice against instinct, not weakness.

⚖️ Recompense means paying back the same treatment
🚫 Paul forbids repaying harm with harm
🌍 This applies to everyone, not only believers
📖 Refusing payback is a deliberate choice

## Provide Things Honest In The Sight Of All Men

"Honest" here means honorable and respectable, wider than simply telling the truth.

"In the sight of all men" points to conduct other people can see.

Paul cares about a reputation that holds up in public, not only private intentions.

This protects the reputation of the gospel, not only the believer's own name.

A clean life removes easy excuses for outsiders to dismiss the message.

🎖️ Honest here means honorable, not just truthful
👀 Sight of all men means public conduct
📣 This protects the gospel's reputation too
📖 A clean life removes easy excuses

## Avenge Not Yourselves, But Rather Give Place Unto Wrath

"Avenge" means taking justice into your own hands.

"Give place unto wrath" means stepping back and leaving room for someone else to act.

That someone else, as the next line shows, is God himself.

Stepping back is not the same as pretending the wrong never happened.

It simply hands the response to the one with the right to give it.

✊ Avenge means taking justice yourself
🚪 Give place means stepping back, making room
⚡ The wrath belongs to God, not you
📖 Stepping back is not pretending nothing happened

## Vengeance Is Mine, I Will Repay, Saith The Lord

Paul quotes this line directly from Moses in Deuteronomy.

"Vengeance is mine" means final justice belongs to God alone.

"I will repay" promises that nothing gets forgotten or left unresolved.

Paul is not offering personal advice here, he is quoting God's own words.

Trusting this promise is what makes stepping back from revenge possible at all.

📜 Paul quotes Moses from Deuteronomy
⚖️ Vengeance belongs to God alone
🔁 I will repay means nothing stays unresolved
📖 Trusting this promise makes stepping back possible

## Heap Coals Of Fire On His Head

This instruction quotes the book of Proverbs almost word for word.

"Heap coals of fire on his head" sounds like punishment, but it describes something else.

Many scholars believe it pictures shame strong enough to lead to repentance.

Kindness toward an enemy can produce a change no argument could force.

The goal is a changed heart, not humiliation for its own sake.

📜 This quotes Proverbs almost word for word
🔥 Coals of fire is a figure, not harm
😳 Many read it as shame leading to repentance
📖 Kindness can change a heart arguments cannot

## Be Not Overcome Of Evil, But Overcome Evil With Good

"Overcome" here means being defeated, pulled down to the same level.

Responding to evil with evil means evil has already won that exchange.

Paul flips the picture, good becomes the weapon that wins instead.

This one line sums up everything the chapter has been building toward.

The chapter opens with a living sacrifice and closes with a living battle plan.

⚔️ Overcome means being defeated, pulled down
🔁 Evil for evil means evil already won
🛡️ Good becomes the real weapon here
📖 The chapter opens with sacrifice, closes with battle
`.trim();

export const ROMANS_TWELVE_PERSONAL_SECTIONS = parseRomansTwelveRawNotes(ROMANS_TWELVE_RAW_NOTES);
