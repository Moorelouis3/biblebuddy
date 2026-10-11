export type ActsFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsFiveRawNotes(rawText: string): ActsFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 5:${startVerse}` : `Acts 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Acts 5 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_FIVE_RAW_NOTES = `# Acts 5:1-6
# 😱 Ananias Lies And Dies
---
## 🏠 Sold A Possession

Ananias and his wife Sapphira owned a piece of property.

They sold it, the same way other believers in chapter four sold land to help the church.

Giving itself was never the problem here.

What came next made this story different from every other gift mentioned so far.

🏠 A piece of property gets sold

🤝 Giving was common in the early church

💰 Selling land was not the issue

➡️ What happens next changes everything

## 🤫 Kept Back Part Of The Price

Ananias secretly held back some of the money from the sale.

He brought the rest and laid it at the apostles feet as if it were the whole amount.

The sin was not keeping some money for himself.

The sin was pretending he had given everything when he had not.

🤫 Ananias kept back part of the money

🎭 He pretended to give the whole price

🙅 Keeping money was never the real sin

📖 Pretending to give everything was the sin

## ❓ Why Hath Satan Filled Thine Heart

Peter asks a question that is really an accusation.

Filled thine heart describes something taking full control inside a person.

Earlier believers were filled with the Holy Ghost to give and speak boldly.

Ananias let Satan fill that same inner space instead.

Whatever fills a heart first will direct what a person does next.

❓ Peter names what truly happened

💔 Filled thine heart means total control

🙌 Believers were once filled with the Spirit

📖 Whatever fills the heart controls the actions

## 🙅 Thou Hast Not Lied Unto Men But Unto God

Peter corrects a wrong idea before Ananias can even defend himself.

Ananias might have told himself this was only a small deception between neighbors.

The gift was laid at human feet, but the lie was spoken straight to God.

God sees straight through every performance meant only for other people.

🙅 This was never a small deception

👀 Ananias thought he was only fooling people

☝️ The lie actually reached God directly

📖 God sees through every human performance

## 💀 Gave Up The Ghost

Gave up the ghost is an old way of saying someone died.

Ananias falls dead the moment Peter finishes speaking.

This was not a slow illness or an accident.

God judged the lie immediately, in front of the whole church.

💀 Gave up the ghost means died

⚡ Ananias dies the instant Peter speaks

🚫 This was not illness or accident

📖 God judged the lie right away

## 🧵 Wound Him Up

Wound him up describes wrapping a body tightly in cloth for burial.

Burials in this hot climate usually happened within hours of death, not days later.

The young men act fast, with no time for a long funeral.

Great fear, not grief alone, fills the room as this happens.

🧵 Wound him up means wrapped for burial

☀️ Hot climates required very quick burial

🏃 The young men moved fast

📖 Fear filled the room, not just grief

# Acts 5:7-11
# 😱 Sapphira Repeats The Lie
---
## ⏳ About The Space Of Three Hours

Three hours pass between Ananias dying and Sapphira walking in.

She still does not know her husband is dead.

She also has no idea Peter already knows exactly what happened.

She is about to repeat his exact lie without even realizing it.

⏳ Three hours pass before Sapphira arrives

🙈 She does not know Ananias is dead

❓ She does not know Peter already knows

📖 She is about to repeat his lie

## 🧪 Tempt The Spirit Of The Lord

Tempt here means to test or put something to a deliberate trial.

Sapphira and Ananias were not simply tempted by greed.

Together they tested whether God would actually notice their lie.

That is a far more serious thing than an ordinary sin of money.

🧪 Tempt means to test deliberately

💰 Greed alone does not explain this

❓ They tested whether God would notice

📖 Testing God is more serious than greed

## 📍 Fell Down Straightway At His Feet

Sapphira collapses in the very same spot where the stolen money was once laid.

Straightway means immediately, with no delay at all.

Her death mirrors her husband's death in both timing and place.

The scene repeats on purpose, so no one could call the first death an accident.

📍 She falls in the same spot

⚡ Straightway means with no delay

🔁 Her death mirrors her husband's death

📖 The repeat proves this was no accident

## ⛪ Great Fear Came Upon All The Church

This is the first time the word church appears for the whole community of believers.

Fear here is not simply being scared of Peter.

It is the realization that God himself is actively present and watching.

That kind of fear often leads people toward God, not away from him.

⛪ Church first names the whole community

😨 This fear is not fear of Peter

👁️ God himself is clearly present

📖 Real fear can draw people toward God

# Acts 5:12-16
# ✨ Signs Multiply Through The Apostles
---
## 🏛️ Solomon's Porch

Solomon's porch was a long, covered walkway along the edge of the temple courts.

It gave shade and shelter while still being a very public, open space.

The believers already gathered here earlier in Acts, right after Pentecost.

Meeting in the same public spot shows they were not hiding from anyone.

🏛️ Solomon's porch was a covered walkway

☀️ It offered shade in a public space

🔁 Believers already met here earlier in Acts

📖 They were not hiding from anyone

## 😨 Durst No Man Join Himself To Them

Durst is an old word meaning dared.

After Ananias and Sapphira, people clearly feared joining the church for the wrong reasons.

Yet the very next line says the people still praised the believers highly.

Fear kept out fake commitment while real respect kept growing.

😨 Durst means dared

🚫 Fear kept away careless pretenders

👏 The people still praised the believers

📖 Fear and respect grew side by side

## 🌑 The Shadow Of Peter Passing By

People hoped just being near Peter's shadow might bring healing.

The power was never actually inside the shadow itself.

God chose to work generously through Peter during this season.

Think of sunlight passing through a window to light up a room.

The window does not create the light, it simply lets it through.

🌑 People hoped Peter's shadow would heal

❌ The power was not in the shadow

🙌 God worked generously through Peter

📖 Peter was the window, not the light

## 😖 Vexed With Unclean Spirits

Vexed means tormented or troubled, not just mildly annoyed.

Unclean spirits refers to demonic forces afflicting a person.

These are different sicknesses from the physical illnesses mentioned just before.

Every single one who came for help was healed completely.

😖 Vexed means tormented, not just annoyed

👻 Unclean spirits means demonic affliction

🤕 This differs from ordinary physical illness

📖 Every person who came was healed

# Acts 5:17-21
# ⛓️ The Angel Opens The Prison
---
## 😡 Filled With Indignation

Indignation describes anger mixed with wounded pride.

The Sadducees are not simply annoyed, they feel publicly embarrassed.

Chapter four already showed their anger at the apostles preaching resurrection.

That same anger has only grown stronger by this point in the story.

😡 Indignation means anger plus wounded pride

🙄 The leaders feel publicly embarrassed

🔁 Chapter four already showed this anger

📖 Their anger has only grown since then

## 🔒 The Common Prison

The common prison means the regular public jail, not a private holding room.

This was a stronger, more secure place than wherever the apostles were held before.

Putting them here shows the council wanted this arrest taken seriously.

None of that security will matter by the next morning.

🔒 Common prison means the regular public jail

🏛️ It was more secure than before

⚖️ The council wanted this taken seriously

📖 That security will not matter for long

## 👼 The Angel Of The Lord

God sends an angel to physically open the prison doors at night.

No human plan or clever escape is involved here at all.

An angel frees Peter again later in Acts twelve, in a very similar way.

God is still actively protecting the mission he started.

👼 An angel opens the prison at night

🚫 No human escape plan is involved

🔁 The same rescue happens again in Acts twelve

📖 God still protects his mission

## ❤️ All The Words Of This Life

This life points to the eternal life Jesus offers, not just existing day to day.

The angel's instructions echo exactly what the apostles were already preaching.

God does not tell them to hide or go quiet.

He sends them right back to the same risky message.

❤️ This life means eternal life in Jesus

🔁 The message matches what they already preached

🙅 God does not tell them to hide

📖 He sends them back to the same risk

## 🏛️ The Senate

The senate here names the full assembled body of Israel's elders.

This is the same ruling group called the Sanhedrin back in chapter four.

Calling together the entire senate shows how seriously the leaders took this case.

They have no idea the men they are gathering to judge already walked free.

🏛️ Senate means the full body of elders

🔁 This matches the Sanhedrin from chapter four

⚖️ A full senate shows how serious this felt

📖 They do not know the men are free

# Acts 5:22-26
# 🔍 The Empty Prison
---
## 🔐 Shut With All Safety

The officers confirm every lock and door was still completely secure.

The guards were still standing exactly where they should have been.

Nothing about the prison looked tampered with or broken into.

Only a power beyond human strength could explain an empty cell like this.

🔐 Every lock was still fully secure

💂 The guards never left their posts

🚫 Nothing looked broken or tampered with

📖 Only God could explain this escape

## 😕 They Doubted Whereunto This Would Grow

Doubted here means they were confused and uncertain, not simply curious.

Whereunto this would grow means they could not predict where this was heading.

Their plan to control the apostles has now completely fallen apart.

Confusion replaces the confidence they had at the start of this chapter.

😕 Doubted means confused and uncertain

❓ They could not predict what came next

🧩 Their plan to control this had failed

📖 Confidence has turned into confusion

## 🏛️ Standing In The Temple And Teaching The People

The apostles go right back to the exact place and the exact activity that got them arrested.

Threats and a locked prison did not change their plan at all.

This is the clearest possible proof that fear was not controlling them.

Obedience to God, not personal safety, was directing every choice they made.

🏛️ They return to the very same place

🔁 The same teaching that caused their arrest

🚫 Threats did not change their plan

📖 Obedience, not safety, guided their choices

## 🤲 They Feared The People Lest They Should Have Been Stoned

The officers handle the apostles carefully this time, without any roughness.

The leaders are afraid of how the crowd might react to violence.

Public opinion, not real justice, is shaping how this arrest is handled.

The same pattern already showed up once before, back in chapter four.

🤲 The officers act carefully, without roughness

😨 Leaders fear how the crowd might react

⚖️ Public opinion shapes this arrest

📖 The same pattern showed up in chapter four

# Acts 5:27-32
# ⚖️ Peter Answers The Council Again
---
## 📜 Ye Have Filled Jerusalem With Your Doctrine

Doctrine simply means teaching or instruction.

The high priest admits, without meaning to, how far the gospel has already spread.

His complaint is actually proof that the apostles' mission is working.

Opposition here ends up confirming the very success it is trying to stop.

📜 Doctrine simply means teaching

😳 The high priest admits the gospel spread

✅ His complaint proves the mission is working

📖 Opposition here confirms its own failure

## 🔁 We Ought To Obey God Rather Than Men

Peter repeats almost the same line he already gave the council in chapter four.

This was never a one time decision made under pressure.

It had become a settled, repeated rule for how the apostles would live.

Human authority always has a limit when it conflicts with God's authority.

🔁 Peter repeats his answer from chapter four

📏 This was a settled rule, not a mood

⚖️ Human authority has limits

📖 God's authority always comes first

## ✝️ Whom Ye Slew And Hanged On A Tree

Hanged on a tree is an old way of describing death on a cross.

The phrase connects back to an Old Testament description of a cursed death.

Peter does not soften this accusation in front of the men who caused it.

He names their exact role, directly, to their faces.

✝️ Hanged on a tree means crucified

📖 This echoes an Old Testament cursed death

🗣️ Peter does not soften the accusation

➡️ He names their role to their faces

## 👑 A Prince And A Saviour

Prince here means a ruling leader, not simply a king's son.

Jesus holds both roles at once, ruler and rescuer together.

Most leaders in this world can offer one of those things, not both.

Peter says God himself gave Jesus this double role.

👑 Prince means a ruling leader

🛡️ Saviour means a rescuer

🤝 Jesus holds both roles together

📖 God himself gave Jesus this role

## 🔄 Repentance To Israel And Forgiveness Of Sins

Repentance means turning away from sin and turning back toward God.

Forgiveness could not come without that turning happening first.

Peter ties both gifts directly to the same exalted Jesus from the verse before.

Neither gift was ever something people could earn on their own.

🔄 Repentance means turning back to God

🕊️ Forgiveness follows after that turning

🤝 Both gifts come from the same Jesus

📖 Neither gift could be earned alone

## 👀 We Are His Witnesses And So Is Also The Holy Ghost

Peter points to two separate sources backing up this testimony.

Human witnesses saw and experienced these events firsthand.

The Holy Ghost confirms the same truth from inside believers.

Two very different kinds of proof point to the very same conclusion.

👀 Human witnesses saw it firsthand

🕊️ The Holy Ghost confirms it too

🤝 Two different kinds of proof agree

📖 Both point to the same truth

# Acts 5:33-39
# 🧓 Gamaliel's Counsel
---
## 💔 Cut To The Heart

This same phrase describes two very different reactions elsewhere in Acts.

In chapter two, it describes people convicted and turning toward God.

Here it describes the council's anger and wounded pride instead.

The same words can describe conviction or rage, depending on the heart behind them.

💔 Cut to the heart means deeply affected

🙏 In chapter two it led to repentance

😡 Here it leads to anger instead

📖 The same words, two very different hearts

## 🧓 Gamaliel A Doctor Of The Law

Gamaliel was a highly respected Pharisee and teacher of Jewish law.

Doctor of the law means an expert trained to interpret scripture and tradition.

He later became the teacher of a young Pharisee named Saul.

That same Saul becomes the apostle Paul later in this very book.

🧓 Gamaliel was a respected law teacher

📚 Doctor of the law means a trained expert

🎓 He later taught a young man named Saul

📖 Saul becomes the apostle Paul

## 🧍 Theudas Boasting Himself To Be Somebody

Theudas was a failed rebel leader from Jewish history, not someone in this story.

He gathered followers by claiming to be important.

Once he was killed, his whole movement simply fell apart.

Gamaliel uses him as a real historical warning, not a hypothetical example.

🧍 Theudas claimed to be someone important

👥 He gathered a group of followers

💥 His movement collapsed once he died

📖 Gamaliel uses real history as a warning

## 📜 Judas Of Galilee In The Days Of The Taxing

The taxing refers to a Roman census that sparked real anger in Judea.

Judas of Galilee led a revolt connected to that same census.

Like Theudas, his movement also fell apart completely after he died.

Gamaliel is building a clear pattern from two real examples.

📜 The taxing means a Roman census

⚔️ Judas led a revolt against it

💥 His movement also collapsed after his death

📖 Two examples build one clear pattern

## 🧪 If It Be Of God Ye Cannot Overthrow It

Gamaliel offers a simple test instead of an emotional decision.

A movement started only by humans eventually runs out of strength, like the two examples before it.

A movement actually started by God cannot be stopped by any human effort.

Fighting it would really mean fighting God himself.

🧪 Gamaliel offers a simple test

💨 Human only movements eventually run out

🛡️ Movements from God cannot be stopped

📖 Fighting it means fighting God himself

# Acts 5:40-42
# 😊 Rejoicing In Suffering
---
## 🩸 And Beaten Them

Beating here likely followed the normal Jewish practice of thirty nine lashes.

That number came from staying just one short of the forty stripes limit in the law.

This was a real, physical punishment, not just a stern warning.

Paul later lists beatings like this among his own sufferings for the gospel.

🩸 Beating likely meant thirty nine lashes

📏 That stayed just under the legal limit

⚠️ This was real physical punishment

📖 Paul later lists this same suffering

## 😳 Counted Worthy To Suffer Shame For His Name

Being beaten in public was designed to humiliate a person completely.

The apostles took that same shame and treated it as an honor instead.

They are not pretending the pain did not happen.

They are choosing what the pain means to them.

😳 Public beating was meant to humiliate

🏆 The apostles treated it as an honor

💪 They did not pretend away the pain

📖 They chose what the pain would mean

## 📆 Daily In The Temple And In Every House

Daily shows this was not a one time burst of courage.

The temple was the most public possible place to keep teaching.

Private houses added a second, quieter place the message kept spreading.

Public threats could not shrink a mission running on two fronts at once.

📆 Daily means this happened every single day

🏛️ The temple was the public front

🏠 Houses were the private front

📖 Threats could not shrink a two front mission
`.trim();

export const ACTS_FIVE_PERSONAL_SECTIONS = parseActsFiveRawNotes(ACTS_FIVE_RAW_NOTES);
