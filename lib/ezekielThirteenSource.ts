export type EzekielThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielThirteenRawNotes(rawText: string): EzekielThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 13:${startVerse}` : `Ezekiel 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 13 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_THIRTEEN_RAW_NOTES = `# Ezekiel 13:1-3
# 🗣️ Prophets Who Follow Their Own Spirit
---
## 🎯 Prophesy Against The Prophets Of Israel That Prophesy

God turns Ezekiel toward a new and surprising target.

Not Babylon, not Egypt, but Israel's own prophets.

These men claimed to speak for God just like Ezekiel did.

Many of them kept promising Jerusalem would never fall.

The real danger to the exiles sat inside their own camp.

🎯 Target shifts to Israel's own prophets
⚠️ They claimed to speak for God
🏚️ They kept promising Jerusalem would stand
📖 Not every voice speaks for God

## 💭 That Prophesy Out Of Their Own Hearts

This phrase names exactly where these messages really came from.

Not from God, but from their own imagination.

They said whatever they personally wanted to be true.

Confidence is not proof that a message came from God.

💭 Own hearts means private imagination
🚫 Not relayed from God at all
🗣️ They said what they wanted
📖 Confidence does not prove truth

## 🧠 Woe Unto The Foolish Prophets, That Follow Their Own Spirit

"Foolish" here does not mean unintelligent or uneducated.

In the Bible it usually means someone who ignores God on purpose.

These prophets follow their own spirit instead of listening to God's.

Trusting yourself over God is exactly what gets called foolish here.

🧠 Foolish means morally reckless not dumb
🎯 They follow their own spirit
🙉 Not listening to God's spirit
📖 Trusting yourself over God is foolish

## 👁️ And Have Seen Nothing

Real prophets received actual visions or words directly from God.

These men received nothing at all from Him.

Yet they still stood up and spoke as if they had.

An empty message dressed up as a word from God is the lie being exposed here.

👁️ Real prophets received visions from God
🚫 These men received nothing at all
🎭 They spoke anyway, pretending otherwise
📖 An empty message is still a lie

# Ezekiel 13:4-7
# 🦊 Like Foxes In The Deserts
---
## 🦊 O Israel, Thy Prophets Are Like The Foxes In The Deserts

Foxes dig into loose ground but never actually repair anything.

A fox hole can even weaken a wall or a bank.

These prophets are compared to foxes, not shepherds or builders.

They take from the nation without ever strengthening it.

🦊 Foxes dig but never repair
🕳️ A fox hole weakens ground
👤 Prophets compared to foxes, not builders
📖 They take without strengthening the nation

## 🧱 Neither Made Up The Hedge For The House Of Israel To Stand In The Battle

A hedge here means a defensive wall built to protect a city under attack.

Standing in the gap meant warning the people and calling them back to God.

That was the prophet's actual job during a national crisis.

These men did none of that defending work.

🧱 Hedge means a defensive wall
🛡️ Standing in the gap means warning people
💼 That was a prophet's real job
📖 These men never did that work

## 👀 Ye Have Not Gone Up Into The Gaps

A gap is a broken section of a city wall where enemies could break through.

A faithful watchman would rush to that exact spot during an attack.

These prophets stayed silent and safe instead.

Jerusalem's spiritual walls were falling and nobody was guarding the break.

👀 A gap means a broken wall
🏃 A watchman rushes to that spot
😶 These prophets stayed silent instead
📖 Nobody guarded the real break

## 🔮 They Have Seen Vanity And Lying Divination

"Vanity" here means an empty, worthless claim with nothing real behind it.

"Divination" means trying to predict the future through omens and signs.

Israel's law forbade divination because it replaced trusting God with magic tricks.

These men dressed up guesswork as a message straight from heaven.

🔮 Vanity means an empty claim
🎲 Divination means predicting by omens
🚫 Israel's law forbade this practice
📖 Guesswork was dressed up as God's word

## 🗯️ The LORD Saith, And The LORD Hath Not Sent Them

This is the exact charge God brings against them.

They used His name on words He never spoke.

Claiming God said something He did not is treated as deadly serious here.

It is not a small exaggeration in God's eyes.

🗯️ They quoted the LORD falsely
🚫 God never sent that message
⚖️ This charge is treated as serious
📖 Misusing God's name is not small

## ❓ Albeit I Have Not Spoken

God closes the point with a flat, personal denial.

He did not whisper it, hint it, or imply it in any way.

Every single claim these prophets made was simply invented.

The silence of God is still real information if people would listen for it.

❓ God gives a flat denial
🤐 He said none of it
✍️ The whole claim was invented
📖 God's silence is information too
# Ezekiel 13:8-9
# ⚖️ I Am Against You
---
## ⚖️ Therefore Thus Saith The Lord GOD, Because Ye Have Spoken Vanity And Seen Lies

God repeats the exact two charges He just named in the verses before this.

Empty words and false visions are not treated as harmless mistakes.

Naming the charge twice shows how seriously God takes it.

Judgment never arrives without a clearly stated reason first.

⚖️ God repeats both charges plainly
🚫 Empty words are not harmless
🔁 Repetition shows how serious this is
📖 Judgment always comes with a reason

## ✋ Mine Hand Shall Be Upon The Prophets That See Vanity

God's hand being against someone pictures direct, personal judgment, not a distant penalty.

This is the same hand that once formed and guided Israel.

Now it turns to oppose the very men claiming to speak for God.

Pretending to speak for God carries real consequences, not just embarrassment.

✋ God's hand means direct judgment
🤲 The same hand once guided Israel
🔄 Now that hand turns against them
📖 False claims carry real consequences

## 📜 They Shall Not Be Written In The Writing Of The House Of Israel

Israel kept a kind of official register listing who belonged to the covenant community.

Being blotted out of that record meant losing your place among God's people.

This was a far heavier penalty than simple embarrassment or public shame.

These prophets lose the very identity they claimed to speak for.

📜 Israel kept an official register
🚫 Being erased meant losing your place
💔 This was a heavy penalty
📖 They lose the identity they claimed

## 🏡 Neither Shall They Enter Into The Land Of Israel

The promised land was the center of Israel's whole covenant life with God.

Being kept out of it meant being cut off from that promise entirely.

Many exiles still hoped these prophets would lead them safely home.

Instead the false prophets themselves never arrive there.

🏡 The land was the covenant's center
🚫 Exclusion meant losing the promise
🙅 These men never arrive there
📖 The guides themselves are shut out

# Ezekiel 13:10-16
# 🧱 Daubing The Wall With Untempered Morter
---
## 🧱 Because They Have Seduced My People, Saying, Peace, And There Was No Peace

"Seduced" here means lured people into a false sense of safety.

The false prophets kept promising peace while Babylon's army was already gathering.

This exact phrase, peace when there is no peace, becomes a theme across the whole book.

A comforting lie is still a lie, no matter how good it feels to hear.

🧱 Seduced means lured into false safety
🕊️ They promised peace falsely
🔁 This phrase repeats through the book
📖 A comforting lie is still a lie

## 🧪 One Built Up A Wall, And, Lo, Others Daubed It With Untempered Morter

Untempered mortar was cheap plaster applied without straw or binding material mixed in.

It looked smooth and solid on the surface for a little while.

Underneath, the wall had no real strength to survive a storm or an attack.

The false prophets are the ones smearing on that flimsy plaster coat.

🧪 Untempered mortar lacked real binding
🎨 It looked fine on the surface
💥 It had no strength underneath
📖 False prophets smear on that coating

## 🌊 There Shall Be An Overflowing Shower, And Ye, O Great Hailstones, Shall Fall

God describes a violent storm that pictures Babylon's coming invasion.

Heavy rain and hailstones were genuine ancient dangers to a plastered wall.

The very weather itself becomes a tool of God's judgment here.

No disguise survives contact with a real storm.

🌊 The storm pictures Babylon's invasion
🧊 Hail and rain damaged plaster walls
⛈️ Weather itself becomes God's tool
📖 No disguise survives a real storm

## 💨 And A Stormy Wind Shall Rend It

"Rend" means to tear something apart violently, not simply crack it.

Wind finishes what the rain and hail already started.

Three separate forces of nature combine against this one fake wall.

God is not using a small or gentle correction here.

💨 Rend means tearing violently
🌬️ Wind finishes what rain started
🧩 Three forces combine against the wall
📖 This is not a gentle correction

## ❓ Lo, When The Wall Is Fallen, Shall It Not Be Said Unto You, Where Is The Daubing

God asks a pointed, almost mocking question after the collapse.

Everyone will see exactly where the empty promises came from.

The plaster cannot be found because it never had any real substance.

A false reassurance disappears the moment real trouble actually arrives.

❓ God asks a mocking question
👀 Everyone will see the source
🫥 The plaster has no real substance
📖 False comfort vanishes under real trouble

## 🔚 Thus Will I Accomplish My Wrath Upon The Wall, And Upon Them That Have Daubed It

God's anger lands on both the fake wall and the people who built it.

Builders of a lie are judged along with the lie itself.

Responsibility here falls on the ones who hid the real danger from everyone else.

🔚 Wrath lands on the wall and builders
👷 Builders share the blame too
🙈 They hid the real danger
📖 Responsibility follows the lie's source

## 🕊️ Which Prophesy Concerning Jerusalem, And Which See Visions Of Peace For Her, And There Is No Peace

This section closes exactly the way it opened, with the same accusation repeated.

The false message always centers on Jerusalem surviving safely.

Repeating this phrase twice in one chapter shows how central this one lie was.

Jerusalem's real danger never matched the peaceful picture these men kept painting.

🕊️ The same accusation closes the section
🏙️ The lie always centered on Jerusalem
🔁 Twice repeated shows its importance
📖 Real danger never matched their picture
# Ezekiel 13:17-21
# 🪡 Women Who Hunt Souls
---
## 🪡 Set Thy Face Against The Daughters Of Thy People, Which Prophesy Out Of Their Own Heart

God now turns from male prophets to women practicing the same false prophecy.

Both groups are judged by the exact same standard.

False prophecy was never only a problem among one gender in Israel.

Nobody got a pass simply because of who they were.

🪡 God turns to the women now
⚖️ Both genders judged the same way
🚫 Nobody got an automatic pass
📖 The same standard applies to all

## 🧵 Woe To The Women That Sew Pillows To All Armholes

These pillows were likely small cloth charms sewn to fit snugly around the wrist or arm.

Many scholars believe they functioned as magic amulets used in fortune telling.

Wearing one supposedly offered protection or a favorable fate.

This was sorcery dressed up as spiritual comfort.

🧵 Pillows were likely small arm charms
🔮 Scholars see these as amulets
🛡️ They claimed to offer protection
📖 Sorcery dressed up as comfort

## 🧕 And Make Kerchiefs Upon The Head Of Every Stature To Hunt Souls

Kerchiefs here were head coverings worn as part of the same magical practice.

"Every stature" means the charms were made to fit people of every height and age.

"Hunt souls" means using these objects to manipulate or control other people's lives.

This was not harmless superstition, it targeted real people for profit and power.

🧕 Kerchiefs were magical head coverings
📏 Made to fit every person
🎯 Hunt souls means controlling lives
📖 Real people were targeted for profit

## 🌾 Will Ye Hunt The Souls Of My People, And Will Ye Save The Souls Alive That Come Unto You

God frames this as a direct personal offense against Himself.

These women claimed power over who would live or die.

Only God actually holds that kind of authority over a person's life.

Claiming His role for personal gain is treated as a serious crime here.

🌾 God takes this personally
⚰️ They claimed power over life
👑 Only God holds that authority
📖 Claiming God's role is a crime

## 🍞 For Handfuls Of Barley And For Pieces Of Bread

Barley and bread were cheap, everyday payment, not valuable treasure.

These women were selling false spiritual power for almost nothing.

The small price makes the betrayal feel even worse, not better.

People's lives and hope were treated as worth less than a loaf of bread.

🍞 Barley and bread were cheap payment
💰 Selling false power for almost nothing
💔 The small price deepens the betrayal
📖 Lives were valued less than bread

## 🙌 I Will Tear Them From Your Arms, And Will Let The Souls Go

God promises to personally strip away the fake magical charms.

Tearing them off pictures a forceful, public end to the entire practice.

The people trapped by these charms are finally set free.

God ends the manipulation Himself instead of simply warning against it.

🙌 God tears away the fake charms
💥 The end comes forcefully and publicly
🕊️ Trapped people are finally freed
📖 God ends it rather than just warns

# Ezekiel 13:22-23
# 🔁 Ye Shall Know That I Am The LORD
---
## 💔 Ye Have Made The Heart Of The Righteous Sad, Whom I Have Not Made Sad

These false prophets caused real pain to people who were actually following God.

That sadness never came from God in the first place.

Spreading fear or guilt in God's name when He never sent it is treated as its own serious sin.

Hurting a faithful person with a lie is not a small or minor offense.

💔 They caused pain to the faithful
🚫 That sadness never came from God
⚠️ False fear in God's name is sin
📖 Hurting the faithful is a real offense

## 💪 And Strengthened The Hands Of The Wicked, That He Should Not Return From His Wicked Way

"Strengthened the hands" is an idiom meaning to encourage or embolden someone.

By promising false peace, these prophets made wicked people feel safe continuing in sin.

A comforting lie removed any reason for the wicked to actually change direction.

False comfort can keep a person trapped exactly where they already are.

💪 Strengthened hands means encouraged someone
🕊️ False peace made sin feel safe
🚧 It removed any reason to change
📖 False comfort can trap a person

## 🔮 Ye Shall See No More Vanity, Nor Divine Divinations

This promise closes the loop opened back at the start of the chapter.

The exact word vanity returns here from verse six.

God promises an actual end to this specific practice, not just a warning against it.

The chapter's opening accusation gets a real and final resolution.

🔮 This closes the chapter's opening loop
🔁 Vanity repeats the word from verse six
🛑 God promises a real end
📖 The accusation gets a final resolution

## 🙏 For I Will Deliver My People Out Of Your Hand, And Ye Shall Know That I Am The LORD

God names Himself as the one who actually rescues His people, not the false prophets.

"Out of your hand" means out of the false prophets' influence and control.

The chapter's closing line, knowing the LORD, answers every empty promise made earlier.

Real rescue was always going to come from God, never from borrowed comfort.

🙏 God rescues His people Himself
✋ Out of your hand means their control
🔁 Knowing the LORD closes the chapter
📖 Real rescue never came from them`.trim();

export const EZEKIEL_THIRTEEN_PERSONAL_SECTIONS = parseEzekielThirteenRawNotes(EZEKIEL_THIRTEEN_RAW_NOTES);
