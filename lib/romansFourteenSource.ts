export type RomansFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRomansFourteenRawNotes(rawText: string): RomansFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RomansFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Romans\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Romans 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Romans\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Romans\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Romans 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Romans 14:${startVerse}` : `Romans 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Romans 14 sections, received " + sections.length);
  }

  return sections;
}

const ROMANS_FOURTEEN_RAW_NOTES = `# Romans 14:1-4
# 🤝 Receive Him That Is Weak In The Faith
---
## 🤲 Him That Is Weak In The Faith

"Weak" here does not mean someone lacking real faith in Christ.

It means a Christian with a shaky conviction about secondary matters.

Many of these believers in Rome were cautious about meat or holy days.

Paul tells the rest of the church to welcome them in, not just tolerate them.

"Receive" meant genuinely opening your life to someone, not letting them attend from a distance.

That welcome had to come before the argument ever got settled.

🤲 Weak means shaky conviction, not shaky faith
🍽️ Likely tied to food and holy days
🚪 Receive means welcome in, not tolerate
📖 Welcome comes before the argument is settled

## 🥬 Another, Who Is Weak, Eateth Herbs

Rome's meat market sold animals that were often first offered to pagan gods.

A Jewish believer, or a Gentile convert uneasy about that link, could simply avoid meat.

Eating only herbs was a safe way to stay clear of that question entirely.

Paul does not say the vegetarian believer is right and the meat eater is wrong.

He treats both as genuine positions held before God.

🏛️ Roman meat was often linked to pagan temples
🥬 Herbs avoided that link completely
⚖️ Paul treats both diets as valid
📖 Both positions were held before God

## 😤 Despise Him That Eateth Not

"Despise" means looking down on someone as inferior.

The believer who felt free to eat anything was tempted to see the cautious believer as weak.

That attitude treats Christian liberty as a reason for pride.

Freedom was never meant to make someone feel superior to another believer.

😤 Despise means looking down on someone
💪 The free eater felt tempted toward pride
🚫 Liberty is not a reason for pride
📖 Freedom was never meant to create pride

## ⚖️ Judge Him That Eateth

"Judge" here means condemning someone else's standing before God.

The cautious believer was tempted to view the free eater as careless or unfaithful.

Both sides were making the same mistake from opposite directions.

"For God hath received him" settles the matter before either side gets a vote.

God's acceptance of a person is not up for a second opinion.

⚖️ Judge means condemning someone's standing with God
🔄 Both sides made the same mistake
🙅 Neither side gets the final vote
📖 God already accepted this person

## 🏠 Another Man's Servant

A "servant" here pictures a household worker answerable only to the one who owns the house.

Paul asks a pointed question, who gave you authority over someone else's servant.

Every believer answers to Christ, not to a fellow believer's opinion.

That picture strips away the right to boss another Christian around on these matters.

🏠 Servant pictures a household worker
❓ Paul asks who gave you that authority
🙏 Every believer answers to Christ alone
📖 No believer bosses another on this

## 🙌 He Shall Be Holden Up

"Holden up" is an old way of saying held up or supported.

Paul's confidence is not in the weak believer's own strength.

It rests entirely on God's ability to keep that believer standing.

The right response to someone's uncertain conviction is trust in God, not pressure from us.

🙌 Holden up means held up, supported
💪 Confidence is not in the believer's strength
🙏 It rests on God's ability instead
📖 Trust God rather than applying pressure

# Romans 14:5-9
# 📅 Whether We Live Or Die, We Are The Lord's
---
## 📅 Esteemeth One Day Above Another

"Esteemeth" means judging something as more important than something else.

Many Jewish believers still treated certain days, like the Sabbath, as holier than others.

Gentile believers with no such background often saw every day the same way.

Paul does not settle which view is correct here.

He treats this as a matter of personal conviction, not doctrine to enforce.

📅 Esteemeth means judging something more important
🕎 Likely about the Sabbath and Jewish feast days
🌍 Gentile believers often saw every day alike
📖 Paul treats this as personal conviction

## 🧠 Fully Persuaded In His Own Mind

"Persuaded" means settled, not wavering back and forth.

Paul is not asking for a group vote on these questions.

He wants each believer to reach real conviction before God personally.

A borrowed opinion held without real conviction will not hold up under pressure.

🧠 Persuaded means settled, not wavering
🙅 This is not a group vote
🙏 Conviction must be reached personally
📖 A borrowed opinion will not hold up

## 🙏 Regardeth It Unto The Lord

"Regardeth" means paying attention to or observing something.

The believer who honors a special day can honor the Lord in that choice.

The believer who treats every day alike can honor the Lord too.

The same is true for eating meat and abstaining from meat.

What matters most is the direction an action points, toward God or away from Him.

Giving thanks turns an ordinary meal into an act of worship.

🙏 Regardeth means paying attention to
🔄 Either choice can honor the Lord
🧭 Direction matters more than the detail
📖 Thanksgiving turns a meal into worship

## 🔗 None Of Us Liveth To Himself

"Liveth to himself" pictures a person who answers to no one but their own preferences.

Paul says that picture never describes a true believer.

Every Christian belongs to someone greater than themselves, in life and in death.

That ownership changes how a believer should treat these disputed choices.

🔗 Liveth to himself means answering to no one
🙅 This never describes a true believer
👑 Every believer belongs to someone greater
📖 Ownership shapes how we treat these choices

## ⚖️ Whether We Live Therefore, Or Die

Paul repeats the word "Lord" three times in this one verse on purpose.

"We are the Lord's" uses the language of ownership, like a servant belonging to a master.

Life and death do not change who holds that ownership.

A believer's whole existence, not just the religious parts, belongs to Christ.

🔁 Lord is repeated three times on purpose
🏷️ We are the Lord's means ownership
⚰️ Life and death do not change that
📖 A believer's whole existence belongs to Christ

## ✝️ Lord Both Of The Dead And Living

Christ's death, resurrection, and return to life were not only about paying for sin.

They were also about establishing His authority over every person, living or dead.

"Revived" means Christ came back to life and stayed alive, unlike those raised only at the final resurrection.

Because Christ holds that authority, He alone is qualified to judge these disputed choices.

✝️ Christ's resurrection also established His authority
👑 He rules over the living and the dead
🔄 Revived means He stayed alive afterward
📖 Only Christ is qualified to judge this

# Romans 14:10-13
# 🪑 We Shall All Stand Before The Judgment Seat
---
## 💔 Set At Nought Thy Brother

"Set at nought" means treating someone as worthless or beneath notice.

Paul names two separate sins here, judging the free believer and despising the cautious one.

Both responses tear down a brother instead of honoring him.

Neither side has the standing to treat the other this way.

💔 Set at nought means treated as worthless
🔄 Two separate sins are named here
🧱 Both responses tear a brother down
📖 Neither side has standing to do this

## 🪑 The Judgment Seat Of Christ

The Greek word behind "judgment seat" is bema, a raised platform used for official rulings.

The same word described the platform where Olympic judges handed out victory prizes.

Paul is not describing a courtroom where believers face punishment for sin.

He is describing an evaluation of how each believer actually lived.

That is a sobering reason to stop judging someone else's choices right now.

🪑 Bema was a raised platform for rulings
🏅 The same word described an awards platform
🙅 This is not punishment for sin
📖 It is an evaluation of how we lived

## 🙇 Every Knee Shall Bow To Me

Paul is quoting the prophet Isaiah here, not writing something new.

Bowing the knee and confessing with the tongue were acts of total surrender to a king.

Every single person will eventually make that surrender to God, willingly or not.

That coming reality makes today's small disputes look much smaller.

📜 Paul is quoting the prophet Isaiah
🙇 Bowing pictures total surrender to a king
🌍 Every person will eventually surrender to God
📖 That reality shrinks today's small disputes

## 📋 Give Account Of Himself To God

"Give account" uses the picture of a servant reporting back to a master after a task.

Each believer will explain their own choices directly to God.

No one will be asked to explain someone else's choices on these matters.

That truth removes the pressure to police another believer's conscience.

📋 Give account pictures reporting to a master
🙋 Each believer answers only for themselves
🚫 No one explains another's choices
📖 This removes pressure to police others

## 🧱 A Stumblingblock Or An Occasion To Fall

A "stumblingblock" was literally an object left in a path that could trip someone up.

"Occasion to fall" describes anything that triggers someone into actual sin.

Paul uses two different words for nearly the same danger, on purpose, for emphasis.

The call shifts here from judging a brother to protecting a brother instead.

🧱 Stumblingblock pictures an object left in a path
⚠️ Occasion to fall means a trigger into sin
🔁 Two words repeat the same warning
📖 The focus shifts from judging to protecting

# Romans 14:14-18
# 🍽️ The Kingdom Of God Is Not Meat And Drink
---
## 🍖 Nothing Unclean Of Itself

Paul states this with unusual confidence, "I know, and am persuaded by the Lord Jesus."

Under the old law, certain foods were formally declared unclean for Israel.

Paul says no food carries that kind of built in impurity any longer.

This was a significant shift for Jewish believers who had kept those laws their whole lives.

🍖 No food is unclean by nature
📜 Old law once declared certain foods unclean
🔄 That rule no longer applies this way
📖 This was a major shift for Jewish believers

## 🧠 To Him It Is Unclean

A person's conscience can make something feel forbidden even when it is not objectively wrong.

Paul treats that inward sense as a real boundary, not something to casually override.

Pushing someone past their own conscience does real damage, even if they are factually mistaken.

Conscience deserves respect even when it is not fully informed.

🧠 Conscience can forbid what is not wrong
🚧 Paul treats conscience as a real boundary
⚠️ Overriding it does real damage
📖 Conscience deserves respect either way

## 💔 Destroy Not Him With Thy Meat

"Grieved" describes real spiritual pain, not mild annoyance.

"Walkest not charitably" means acting without love toward that person.

Paul raises the stakes by naming what that meat is being weighed against.

He names the death of Christ for that very person.

A small piece of food should never outweigh what Christ paid for someone's soul.

💔 Grieved means real spiritual pain
🚫 Walkest not charitably means acting without love
⚖️ Food is weighed against Christ's death
📖 Nothing should outweigh what Christ paid

## 🗣️ Your Good Be Evil Spoken Of

"Your good" refers to the real freedom believers have in Christ.

That freedom is genuinely good, Paul is not denying that.

Used carelessly around a sensitive conscience, that same good freedom earns a bad reputation.

A good thing can still cause real harm depending on how it gets used.

🗣️ Your good means a real freedom in Christ
✅ Paul is not denying that freedom
⚠️ Careless use earns it a bad reputation
📖 A good thing can still cause harm

## 👑 The Kingdom Of God Is Not Meat And Drink

Paul names what the kingdom is not before naming what it actually is.

Food and drink rules were never the center of God's kingdom, even under the old law.

Righteousness, peace, and joy describe the real substance of life under God's rule.

Arguing over menu choices misses what the kingdom is actually about.

👑 Kingdom is defined by what it is not
🍽️ Food rules were never its center
🕊️ Righteousness, peace, and joy are its substance
📖 Menu arguments miss the real point

## 🤝 Approved Of Men

"Serveth Christ in these things" points back to righteousness, peace, and joy, not food rules.

A life shaped by those three things pleases God first.

It also tends to earn genuine respect from people watching, even outsiders.

Character built on the right priorities carries its own kind of credibility.

🤝 Serving Christ points to those three qualities
🙏 That life pleases God first
👀 It also earns respect from others
📖 Right priorities carry real credibility

# Romans 14:19-23
# 🕊️ Follow After The Things Which Make For Peace
---
## 🕊️ Follow After The Things Which Make For Peace

"Follow after" pictures an active chase, not a passive hope.

"Edify" means building someone up, like adding another layer to a structure.

Peace and edification take real effort, they do not happen automatically in a divided church.

Paul redirects the energy spent arguing toward building each other up instead.

🕊️ Follow after pictures an active chase
🧱 Edify means building someone up
💪 Peace takes real effort, not luck
📖 Redirect arguing energy into building up

## 🏗️ Destroy Not The Work Of God

"The work of God" refers to what God is actively building in another believer's life.

Paul treats that inner growth as something fragile enough to be genuinely wrecked.

A piece of food is a small thing to risk against something that fragile.

"All things are pure" was never permission to ignore the damage carelessness can cause.

🏗️ Work of God means God's growth in someone
⚠️ That growth can genuinely be wrecked
🍖 Food is a small thing to risk
📖 Purity never excused careless damage

## 🍷 Neither To Eat Flesh, Nor To Drink Wine

Paul is not making a universal rule against meat or wine here.

He is describing his own willingness to personally give up something harmless for someone else's sake.

"Stumbleth," "offended," and "made weak" describe three different ways a careless choice can hurt someone.

Giving up a freedom voluntarily is different from being forced to give it up.

🍷 This is not a universal rule
🤲 Paul describes a personal, voluntary choice
💔 Three separate ways careless choices can hurt
📖 Voluntary giving up differs from being forced

## 🤐 Have It To Thyself Before God

Paul is not telling the confident believer to hide their faith out of shame.

He means that conviction does not need to be broadcast or forced onto someone else.

A private conviction can still be a real and healthy one.

What matters is that it is genuine before God, not that everyone else adopts it.

🤐 This is not about hiding in shame
🙅 Conviction need not be forced on others
✅ A private conviction can still be healthy
📖 What matters is being genuine before God

## 😌 Condemneth Not Himself

"Alloweth" means a choice a person has personally approved for themselves.

Happiness here describes a conscience that is not fighting itself.

Someone can do something technically permitted and still feel inner guilt over it.

A settled conscience, not a technical permission slip, is the real goal.

😌 Alloweth means a choice approved for yourself
🔥 Happiness means a conscience at peace
⚠️ Permission alone does not remove guilt
📖 A settled conscience is the real goal

## ⚠️ He That Doubteth Is Damned If He Eat

"Damned" here means condemned or found guilty, not a final sentence to hell.

Paul is describing a believer acting against their own uncertain conscience.

Doing something while doubting it is right already puts that person at fault.

The problem is the doubt itself, not necessarily the food.

⚠️ Damned here means condemned, not hell
🤔 This describes acting against your own doubt
🚫 Doubt plus action already creates fault
📖 The real problem is the doubt itself

## 📖 Whatsoever Is Not Of Faith Is Sin

This sentence closes the entire argument that began back in verse one.

"Of faith" means done out of genuine trust and conviction before God.

An action can be perfectly fine for someone else and still be sin for you, if you do it doubting.

The real question was never only the food or the day.

It was always whether the choice came from real faith or not.

🔒 This closes the whole argument from verse one
🙏 Of faith means done out of real conviction
🔄 The same act can differ person to person
📖 The real question was always faith, not food
`.trim();

export const ROMANS_FOURTEEN_PERSONAL_SECTIONS = parseRomansFourteenRawNotes(ROMANS_FOURTEEN_RAW_NOTES);
