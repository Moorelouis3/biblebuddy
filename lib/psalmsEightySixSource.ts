export type PsalmsEightySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsEightySixRawNotes(rawText: string): PsalmsEightySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsEightySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+86:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 86 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+86:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+86:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 86 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 86,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 86:${startVerse}` : `Psalms 86:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 86 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_EIGHTY_SIX_RAW_NOTES = `# Psalms 86:1-4
# 🙏 A Prayer From The Poor And Needy
---
## 👂 Bow Down Thine Ear, O LORD

"Bow down thine ear" pictures God leaning in close to listen.

It does not describe God's actual body bending downward.

The image asks for full, careful attention, not a distracted glance.

David wants to know God is truly listening, not just present.

👂 Bow down pictures close listening

🚫 Not a literal bending of God's ear

🎯 David wants full attention not distance

📖 The prayer opens by asking to be heard

## 💰 For I Am Poor And Needy

"Poor and needy" does not only mean lacking money.

It names someone with no power of their own to fix their situation.

David was a king, yet he still calls himself needy before God.

The title admits total dependence before he asks for anything else.

💰 Poor and needy is not only about money

🙅 It means having no power to help yourself

👑 Even a king can call himself needy

📖 The prayer starts by admitting dependence

## ✝️ Preserve My Soul, For I Am Holy

"Holy" here does not mean sinless or morally perfect.

It means devoted, set apart for God, loyal to him alone.

David is not claiming to be flawless in this line.

He is saying his loyalty belongs to God and nowhere else.

✝️ Holy here means devoted, not sinless

🎯 David is not claiming to be perfect

🤝 He is claiming loyalty to God alone

📖 The plea rests on devotion, not merit

## 👤 Save Thy Servant That Trusteth In Thee

"Servant" describes someone who belongs to a master and obeys him.

David calls himself God's servant before asking to be saved.

"Trusteth in thee" gives the reason God should act.

The request is grounded in relationship, not in David's own record.

👤 Servant means one who belongs to a master

🙋 David names himself God's servant first

🤲 Trust in God is the stated reason

📖 The appeal rests on relationship not merit

## 📅 Be Merciful Unto Me, O Lord: For I Cry Unto Thee Daily

This is not a single, one time cry for help.

"Daily" shows this prayer is David's regular habit, not a last resort.

He builds his case on ongoing, faithful asking, not a single crisis.

Consistent prayer becomes its own kind of evidence before God.

📅 Daily shows this is a regular habit

🚨 Not a one time emergency prayer

🧱 Consistent asking builds David's case

📖 Ongoing prayer becomes its own evidence

## 😊 Rejoice The Soul Of Thy Servant

David is not just asking to survive, he is asking for joy.

"Lift up my soul" pictures handing his whole inner life over to God.

The image is someone physically raising something up to offer it.

David offers his very self, not just a list of requests.

😊 David asks for joy not just survival

🙌 Lift up my soul pictures full surrender

🎁 He offers his whole self to God

📖 The section ends on surrender

# Psalms 86:5-7
# 😊 The LORD Is Good And Ready To Forgive
---
## ⚡ Ready To Forgive

"Ready to forgive" describes God's forgiveness as quick and willing.

It is not something God has to be talked into or convinced of.

Forgiveness is described here as part of God's basic nature.

David appeals to that nature before he even names his sin.

⚡ Ready to forgive means quick, not reluctant

🚫 God does not need to be convinced

🧬 Forgiveness is part of God's nature

📖 David appeals to that nature first

## 🌊 Plenteous In Mercy Unto All Them That Call Upon Thee

"Plenteous" means overflowing, more than enough to go around.

This mercy is not rationed out to a favored few people.

It reaches everyone who actually calls out to God.

The condition is calling on him, not earning a place in line.

🌊 Plenteous means overflowing, more than enough

🚫 Mercy is not rationed to a favored few

📣 It reaches anyone who calls on God

📖 Calling on him is the only condition

## 👂 Attend To The Voice Of My Supplications

"Attend" means to pay close, active attention, not just hear noise.

"Supplications" means humble, urgent requests, not casual comments.

David is not asking for a passing glance at his prayer.

He wants God actively engaged with every request he brings.

👂 Attend means active, close attention

🙏 Supplications means humble, urgent requests

🚫 Not a request for a passing glance

📖 David wants God engaged with each request

## 📆 In The Day Of My Trouble I Will Call Upon Thee

David names a specific plan for whenever hard days come.

The plan is simple, call on God the moment trouble starts.

This is not a promise made only after the trouble has passed.

David commits to the habit before he even knows the next crisis.

📆 David plans ahead for hard days

🔔 The plan begins the moment trouble starts

🚫 This is not hindsight after the fact

📖 He commits to the habit in advance

## ✅ For Thou Wilt Answer Me

David does not merely hope God might respond someday.

He states it as something he already knows will happen.

This confidence comes from David's own history with God, not guesswork.

Calling on God and expecting an answer go together in this psalm.

✅ David states this as a certainty

🚫 Not a hopeful guess about the future

📜 His own history with God backs the claim

📖 Calling and answering belong together here

# Psalms 86:8-10
# 👑 None Like Thee Among The Gods
---
## 🚫 Among The Gods There Is None Like Unto Thee

This line does not claim other gods are real and simply weaker.

Ancient poetry often compares God to the false gods nations worshipped.

The point is total superiority, not shared status in one category.

Scripture elsewhere states plainly that these other gods are not real.

🚫 Not a claim other gods are real

📜 Ancient poetry used this comparison often

👑 The point is total, unmatched superiority

📖 Other scripture confirms those gods are not real

## 🔁 Neither Are There Any Works Like Unto Thy Works

This second line restates the first idea in a new way.

Hebrew poetry often says one thing twice using different words.

Here the focus shifts from who God is to what God does.

No other so called god has ever done what the LORD has done.

🔁 This line restates the idea before it

✍️ Hebrew poetry repeats ideas in new words

🛠️ The focus shifts to what God does

📖 No other god has done what he has

## 🌍 All Nations Whom Thou Hast Made Shall Come And Worship

"All nations" reaches far beyond Israel, the one covenant nation.

David is describing every people group on earth, not just his own.

This is a bold promise for a psalm written early in Israel's story.

It looks forward to a day when every nation turns to the true God.

🌍 All nations means every people group

🚫 Not only David's own nation, Israel

🔮 This promise looks far into the future

📖 Every nation will one day turn to God

## 🏷️ Shall Glorify Thy Name

To "glorify" God's name means to treat it as weighty and honored.

A name in this culture carried a person's whole reputation and character.

Glorifying God's name means recognizing who he actually is.

This is worship's goal, not a side effect of it.

🏷️ A name carried someone's whole reputation

⚖️ Glorify means treating that name as weighty

🎯 It means recognizing who God really is

📖 This is the goal of worship

## 🎯 Thou Art God Alone

This line ends the section with the plainest possible claim.

There is no rival power sharing the title of God with him.

Everything said before this line points toward this one conclusion.

The section builds from comparison to this flat declaration.

🎯 This is the plainest claim in the section

🚫 No rival shares the title of God

🧱 Every earlier line builds toward this one

📖 Comparison ends in flat declaration

# Psalms 86:11-13
# 🛤️ Teach Me Thy Way, O LORD
---
## 🛤️ Teach Me Thy Way, O LORD

"Thy way" means God's whole pattern for how to live, not directions.

David is not lost on a road and asking which turn to take.

He is asking to learn how God wants him to live daily.

This shifts the prayer from crisis relief toward lasting character.

🛤️ Thy way means a pattern for living

🚫 Not directions for a physical road

📚 David wants to learn how to live

📖 The prayer shifts toward lasting character

## 🚶 I Will Walk In Thy Truth

"Walk" in scripture usually pictures a whole way of living, not a stroll.

"Thy truth" means God's own faithfulness and reliable character.

David commits to shaping his daily life around that faithfulness.

Learning God's way in the line before leads straight into living it.

🚶 Walk pictures an entire way of living

🗝️ Thy truth means God's faithful character

🔗 David commits to living by that truth

📖 Learning leads straight into living it out

## 🧩 Unite My Heart To Fear Thy Name

"Unite my heart" asks for a single, undivided devotion to God.

A divided heart chases God and other things at the same time.

"Fear thy name" means holding God in deep reverence, not terror.

David asks for focus, not just information about how to live.

🧩 Unite my heart asks for undivided devotion

🚫 A divided heart chases too many things

😌 Fear here means deep reverence, not terror

📖 David asks for focus, not just facts

## 🔁 Glorify Thy Name For Evermore

This echoes the exact same request made back in verse nine.

There, all nations were pictured glorifying God's name together.

Here David commits to doing that same thing personally, forever.

One person's lasting worship joins the promise made for every nation.

🔁 This echoes the request back in verse nine

🌍 There, all nations glorified God together

🙋 Here David commits to it personally

📖 One life joins a promise made for all

## ⚰️ Delivered My Soul From The Lowest Hell

"The lowest hell" does not describe the fiery hell of later teaching.

It translates Sheol, the Hebrew word for the realm of the dead.

David is describing rescue from death itself, not eternal punishment.

Great mercy is the reason given for such a total rescue.

⚰️ Lowest hell translates Sheol, the realm of death

🚫 Not the later idea of fiery punishment

🆘 David describes rescue from death itself

📖 Great mercy is the reason for this rescue

# Psalms 86:14-17
# 🛡️ A God Full Of Compassion Answers The Proud
---
## ⚔️ The Proud Are Risen Against Me

This is not a vague complaint about difficult people in general.

David names a real, organized threat rising up against his life.

"Assemblies of violent men" describes a group acting together, not one enemy.

The danger here is both proud in attitude and violent in action.

⚔️ David names a real, organized threat

👥 Assemblies means a group acting together

💔 The danger is proud and violent

📖 This is a specific crisis, not a mood

## 🎯 Have Not Set Thee Before Them

This line names the actual root problem with David's enemies.

Their violence flows from leaving God out of their thinking entirely.

God is not merely absent from their plans, he is dismissed.

The deepest danger in this psalm is godlessness, not just cruelty.

🎯 This names the real root problem

🚫 God is left out of their thinking

🙈 God is dismissed, not just forgotten

📖 Godlessness is the deeper danger here

## 📜 A God Full Of Compassion, And Gracious, Long Suffering

This list of qualities echoes God's own words to Moses in Exodus.

"Long suffering" means being patient through repeated wrongs, not weak.

David is quoting a description Israel already trusted about God.

He builds his appeal on God's own stated character, not a guess.

📜 This echoes God's own words to Moses

⏳ Long suffering means patient through repeated wrongs

🧾 David quotes a trusted description of God

📖 The appeal rests on God's own words

## 🔁 Give Thy Strength Unto Thy Servant

David returns to calling himself God's servant, as he did at the start.

He is not asking to win by his own skill or effort.

The strength he needs has to come from outside himself entirely.

The whole psalm circles back to this same posture of dependence.

🔁 David returns to the servant language from earlier

🚫 He is not relying on his own skill

💪 The strength must come from outside him

📖 The psalm circles back to dependence

## 🏠 Save The Son Of Thine Handmaid

"Handmaid" was a female servant, often born into a household.

Calling himself her son claims a lifelong place inside God's household.

This is not a title David just picked up recently.

He is saying his loyalty to God goes back to his very birth.

🏠 Handmaid was a servant in the household

👶 Her son belongs to that household by birth

🕰️ David's loyalty goes back to his beginning

📖 This is not a recent or casual claim

## 👀 Shew Me A Token For Good

"Shew" is an old spelling of "show," meaning to display openly.

A "token" is a visible sign that something is actually true.

David wants proof his enemies can actually see, not just feel better himself.

He wants God's help to be obvious to everyone watching.

👀 Shew is an old word for show

🔖 A token is a visible, provable sign

😳 David wants proof his enemies can see

📖 He wants God's help to be obvious

## 📜 Thou, LORD, Hast Holpen Me, And Comforted Me

"Holpen" is an old form of the word "helped."

The psalm closes the same way it began, naming real, personal need.

This time the need is already being met, not just requested.

The prayer moves from asking for help to thanking God for giving it.

📜 Holpen is an old form of helped

🔁 The psalm closes the way it opened

✅ This time the need is already met

📖 The prayer ends in thanks, not just asking
`.trim();

export const PSALMS_EIGHTY_SIX_PERSONAL_SECTIONS = parsePsalmsEightySixRawNotes(PSALMS_EIGHTY_SIX_RAW_NOTES);
