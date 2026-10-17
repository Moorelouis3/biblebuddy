export type TitusThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseTitusThreeRawNotes(rawText: string): TitusThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: TitusThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Titus\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Titus 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Titus\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Titus\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Titus 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Titus 3:${startVerse}` : `Titus 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Titus 3 sections, received " + sections.length);
  }

  return sections;
}

const TITUS_THREE_RAW_NOTES = `# Titus 3:1-7
# 🕊️ Living At Peace, Saved By Mercy
---
## 🏛️ Put Them In Mind To Be Subject To Principalities And Powers

"Principalities and powers" sounds like it must mean unseen spiritual forces.

Paul does use that same phrase elsewhere for exactly that.

Here the setting is plainly human government and public order.

Titus is told to remind believers in Crete to respect it.

🏛️ Principalities and powers means human rulers here
👻 Paul uses the same words for spirits elsewhere
🏘️ The setting here is government and order
📖 Titus must remind believers to respect it

---
## ⚖️ To Obey Magistrates, To Be Ready To Every Good Work

"Magistrates" means local officials who actually held legal power.

Crete answered to Rome, but local magistrates ran daily affairs.

Obedience here meant ordinary civic life, not blind loyalty.

Being ready for good work was obedience's natural partner.

⚖️ Magistrates means local officials with real power
🏺 Crete answered to Rome through local rulers
🧭 Obedience meant ordinary civic life
📖 Good works paired naturally with obedience

---
## 🗣️ To Speak Evil Of No Man, To Be No Brawlers

"Speak evil" means slander, attacking someone's name behind their back.

"Brawlers" means people quick to pick a fight.

Both habits were common ways new believers clashed with neighbors.

Paul wants a different reputation inside that same city.

🗣️ Speak evil means slander, not honest criticism
🥊 Brawlers means people quick to fight
🏙️ Both habits caused clashes with neighbors
📖 Paul wants a different reputation instead

---
## 💪 But Gentle, Shewing All Meekness Unto All Men

"Meekness" does not mean weakness or having no backbone.

It means real strength that chooses to stay gentle.

"All men" includes people who are not believers at all.

Even unbelieving neighbors in Crete were owed this gentleness.

💪 Meekness means controlled strength, not weakness
🎯 It is a choice, not weakness
🌍 All men includes people outside the church
📖 Even unbelieving neighbors were owed gentleness

---
## 🕰️ For We Ourselves Also Were Sometimes Foolish, Disobedient, Deceived

"Sometimes" here is old English for formerly, not occasionally.

Paul reminds Titus that believers once lived this same way.

"Deceived" means led astray, not simply mistaken about facts.

That shared history explains the call to gentleness toward outsiders.

🕰️ Sometimes means formerly, not occasionally
🪞 Believers once lived this same way
🌀 Deceived means led astray, not mistaken
📖 Shared history explains the call to gentleness

---
## 😤 Serving Divers Lusts And Pleasures, Living In Malice And Envy, Hateful, And Hating One Another

"Divers" is old English for various or many different kinds.

This one verse packs several old habits into a single list.

Chasing pleasure, harboring malice, and feeling envy are three of them.

Hating other people in return rounds out the list.

That whole way of living sat behind them now.

😤 Divers means various, not occasional
💢 Chasing pleasure and harboring malice were two habits
👀 Envy was a third habit named here
📖 That old way of living was behind them

---
## ✨ But After That The Kindness And Love Of God Our Saviour Toward Man Appeared

"Appeared" describes something showing up in real history, not a feeling.

This moment points straight to Jesus Christ's arrival on earth.

Kindness and love are named together as God's visible rescue.

The next few verses explain exactly what that appearing did.

✨ Appeared means a real event in history
✝️ This points to Jesus Christ's arrival
❤️ Kindness and love describe God's rescue
📖 The next verses explain what it did

---
## 🙅 Not By Works Of Righteousness Which We Have Done, But According To His Mercy He Saved Us

This verse draws a hard line between two ways of being saved.

"Works of righteousness" means good deeds done to earn favor.

"Mercy" means kindness given to someone who did not earn it.

Paul rules out the first path completely.

He names mercy as the one that actually saves.

🙅 Works of righteousness means deeds earning favor
💗 Mercy means kindness that was not earned
⚖️ The verse rules out one path firmly
📖 Mercy alone is named as the real path

---
## 🚿 By The Washing Of Regeneration, And Renewing Of The Holy Ghost

"Regeneration" means a brand new spiritual birth, not a small improvement.

"Washing" pictures that new birth the way baptism later would.

"Renewing" describes the Holy Ghost actively remaking a person from within.

Two different pictures describe one single, total change.

🚿 Regeneration means a brand new spiritual birth
🛁 Washing pictures that new birth like baptism
🔥 Renewing means the Holy Ghost remaking a person
📖 Both pictures describe one total change

---
## 🩸 Which He Shed On Us Abundantly Through Jesus Christ Our Saviour

"Shed" usually describes blood being poured out in sacrifice.

Here it describes the Holy Ghost being poured out instead.

"Abundantly" means generously, far more than the bare minimum.

Jesus Christ is named as the one who made this pouring possible.

🩸 Shed usually describes blood poured out
🌊 Here it describes the Holy Ghost poured out
💧 Abundantly means generously, not barely enough
📖 Jesus Christ made this pouring possible

---
## 👑 That Being Justified By His Grace, We Should Be Made Heirs According To The Hope Of Eternal Life

"Justified" means declared not guilty, like a court clearing a name.

"Heirs" means people who legally receive an inheritance that was promised.

That inheritance here is eternal life itself, not land or money.

The long sentence that started back in verse four finally lands here.

👑 Justified means declared not guilty
🏦 Heirs means people who receive a promised inheritance
♾️ The inheritance here is eternal life itself
📖 The long sentence from verse four lands here

# Titus 3:8-11
# ⚠️ Maintain Good Works, Avoid Foolish Fights
---
## 📣 This Is A Faithful Saying

"Faithful saying" is a phrase Paul repeats several times in his letters.

It marks a short statement meant to be treated as a core truth.

This same phrase already appeared twice in Paul's letters to Timothy.

Paul flags this line as worth remembering, not skipping past.

📣 Faithful saying marks a core truth
🔁 The same phrase appeared in Timothy too
🎯 It flags a line worth remembering
📖 Paul wants this line kept, not skipped

---
## 🛠️ That They Which Have Believed In God Might Be Careful To Maintain Good Works

"Careful" here does not mean anxious or worried.

It means paying close, steady attention to something on purpose.

"Maintain" means keeping something going, not just starting it once.

Good works were meant to be an ongoing habit, not a single burst.

🛠️ Careful means steady attention, not worry
🔁 Maintain means keeping something going
🏃 Good works were meant to be ongoing
📖 A habit matters more than one burst

---
## 👍 These Things Are Good And Profitable Unto Men

"Profitable" means genuinely useful, like something worth real value.

Paul is not just praising good works in theory here.

He is saying they actually help the people around them.

Belief was always meant to produce something visibly useful to others.

👍 Profitable means genuinely useful
🙌 Paul is not just praising works in theory
🤝 Good works actually help other people
📖 Belief was meant to produce something useful

---
## ❓ But Avoid Foolish Questions, And Genealogies, And Contentions, And Strivings About The Law

Paul names four separate time wasters in this one verse.

"Foolish questions" means pointless debates that go nowhere useful.

"Genealogies" here likely means arguing over ancestry instead of the gospel.

"Contentions" and "strivings about the law" both describe constant legal arguing.

Titus is told to simply walk away from all four.

❓ Foolish questions means pointless, going nowhere debates
📜 Genealogies here means arguing over ancestry
⚔️ Contentions and strivings mean constant legal arguing
📖 Titus is told to walk away from these

---
## 🌀 For They Are Unprofitable And Vain

"Unprofitable" means producing no real benefit for anyone.

"Vain" means empty, leading nowhere no matter how long the debate runs.

Paul is not saying truth does not matter.

He is saying these specific fights were never really about truth.

🌀 Unprofitable means no real benefit
🕳️ Vain means empty, leading nowhere
🎯 Truth itself still matters to Paul
📖 These specific fights were never really about truth

---
## 🚫 A Man That Is An Heretick After The First And Second Admonition Reject

"Heretick" means someone pushing false teaching that splits the church.

"Admonition" means a direct, personal warning, given face to face.

Two warnings were the limit before action had to be taken.

"Reject" here means stepping back from fellowship with that person.

🚫 Heretick means someone pushing false teaching
⚠️ Admonition means a direct, personal warning
✌️ Two warnings were the limit allowed
📖 Reject means stepping back from fellowship

---
## ⚖️ Knowing That He That Is Such Is Subverted, And Sinneth, Being Condemned Of Himself

"Subverted" means turned upside down, twisted away from the truth.

This was not an accident that happened to the person.

"Condemned of himself" means his own choices proved his guilt.

No one else needed to force that conclusion on him.

⚖️ Subverted means twisted away from the truth
🙅 This was not an accident
🪞 Condemned of himself means his choices proved it
📖 No one else needed to force the point

# Titus 3:12-15
# ✉️ Final Instructions And A Closing Blessing
---
## 📨 When I Shall Send Artemas Unto Thee, Or Tychicus

Artemas and Tychicus were two of Paul's trusted traveling coworkers.

Paul names two possible messengers, not just one backup plan.

Tychicus already appears carrying letters in several other Pauline books.

Whichever one arrived, he was meant to free Titus for travel.

📨 Artemas and Tychicus were trusted coworkers
🔁 Tychicus carried letters in other books too
🧳 Either one could arrive as the messenger
📖 His arrival freed Titus to travel

---
## 🏃 Be Diligent To Come Unto Me To Nicopolis

"Diligent" means moving with real urgency, not whenever convenient.

Nicopolis was a real Roman city on the coast of Greece.

Paul names an actual place, not a vague future meeting.

Titus is given a clear destination and a sense of urgency.

🏃 Diligent means real urgency, not convenience
📍 Nicopolis was a real Roman coastal city
🗺️ Paul names an actual destination
📖 Titus received a clear, urgent instruction

---
## ❄️ For I Have Determined There To Winter

Sea travel across the Mediterranean nearly stopped during winter storms.

"Winter" here is a verb, meaning to stay through the cold season.

Paul had already decided where he would be stuck for months.

That decision explains why Titus needed to leave and meet him there.

❄️ Winter here is a verb, meaning to stay
🌊 Sea travel nearly stopped in winter storms
🗓️ Paul had already planned his months there
📖 That plan is why Titus needed to travel

---
## 🧭 Bring Zenas The Lawyer And Apollos On Their Journey Diligently

Zenas is called "the lawyer," likely trained in Jewish or Roman law.

Apollos was a well known teacher mentioned earlier in Acts and Corinthians.

"Diligently" again means with real effort, not a casual favor.

Titus is asked to actively help two named travelers, not just greet them.

🧭 Zenas was called the lawyer
🎓 Apollos was a well known teacher
🏃 Diligently means real effort, not a casual favor
📖 Titus was asked to actively help them

---
## 🎁 That Nothing Be Wanting Unto Them

"Wanting" here means lacking, not desiring something.

Paul wants Titus to make sure the travelers have everything they need.

That could mean food, money, or safe lodging along the road.

Hospitality to traveling believers was a real, practical duty.

It was not just a kind thought.

🎁 Wanting means lacking, not desiring
🍞 Food, money, and lodging were likely needs
🚪 Hospitality to travelers was a practical duty
📖 Titus was told to meet real needs

---
## 🌱 And Let Ours Also Learn To Maintain Good Works For Necessary Uses

"Ours" here means the believers under Titus's own care in Crete.

"Learn" means this did not come naturally and had to be taught.

"Necessary uses" means real, practical needs, not vague good intentions.

Good works were meant to meet actual needs other people had.

🌱 Ours means the believers under Titus's care
🎓 Learn means this had to be taught
🧰 Necessary uses means real, practical needs
📖 Good works were meant to meet real needs

---
## 🍂 That They Be Not Unfruitful

"Unfruitful" means producing nothing of lasting value.

A tree that never bears fruit fails at its one real job.

Paul uses that same picture for a life of faith with no works.

Belief without any visible good work was never treated as neutral.

🍂 Unfruitful means producing nothing lasting
🌳 A tree with no fruit fails its job
⚖️ Paul applies that picture to faith itself
📖 Belief without works was never treated as neutral

---
## 👋 All That Are With Me Salute Thee. Greet Them That Love Us In The Faith

"Salute" is old English for a warm, personal greeting.

Paul is passing along greetings from the believers currently with him.

"Them that love us in the faith" means fellow believers in Crete.

Even in a short closing line, Paul keeps naming real relationships.

👋 Salute means a warm, personal greeting
🧑‍🤝‍🧑 Paul passes along greetings from his group
🏝️ Them that love us means fellow believers
📖 Even the closing names real relationships

---
## 🙏 Grace Be With You All. Amen

"Grace" closes the letter the same way it opened the whole chapter.

"You all" widens the blessing beyond Titus alone to the whole church.

"Amen" means let it be so, a final seal on the words.

The letter that began with grace in chapter one ends on grace too.

🙏 Grace closes the letter as it opened
🌍 You all widens the blessing to the church
✅ Amen means let it be so
📖 Grace opened and closed this whole letter
`.trim();

export const TITUS_THREE_PERSONAL_SECTIONS = parseTitusThreeRawNotes(TITUS_THREE_RAW_NOTES);
