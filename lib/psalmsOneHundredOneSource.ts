export type PsalmsOneHundredOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredOneRawNotes(rawText: string): PsalmsOneHundredOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+101:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 101 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+101:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+101:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 101 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 101,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 101:${startVerse}` : `Psalms 101:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 101 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_ONE_RAW_NOTES = `# Psalms 101:1-3
# 🎵 A King's Vow Of Integrity
---
## 💞 I Will Sing Of Mercy And Judgment

"Mercy" and "judgment" name two different sides of God's character.

"Mercy" means steady, loyal love that keeps every promise.

"Judgment" means fair and right ruling, even when it is hard.

David promises to praise both together, not just the parts he prefers.

A king who only wants mercy without justice is not really praising God.

He is praising the parts of God that are convenient for him.

💞 Mercy means loyal, steady love

⚖️ Judgment means fair ruling

🎤 David sings about both together

📖 True praise never splits mercy from justice

## 🧭 Behave Myself Wisely In A Perfect Way

"Perfect way" does not mean living without ever making a mistake.

It means whole, complete integrity, the same character in public and in private.

"Wisely" adds skill to that integrity, not just good intentions.

David is not promising perfection here.

He is promising consistency.

A wise, whole life matters more to God than a flawless one.

🧭 Perfect way means whole integrity, not sinless perfection

🎯 Wisely adds skill to that integrity

🔁 Same character in public and private

📖 Consistency matters more than perfection

## 🙏 O When Wilt Thou Come Unto Me

This is not a command telling God what to do.

It is a heartfelt question, David longing for God to draw near.

The verse suddenly shifts from David's promises to a personal cry.

He wants more than good behavior.

He wants God's own presence in his life and his house.

A vow to live rightly is not the same as having God near.

David wants both.

🙏 A heartfelt plea, not a command

🔀 The verse shifts from vow to longing

🏠 David wants God near his own house

📖 Right living alone is not enough

## 🏠 Walk Within My House With A Perfect Heart

This is not about David's public actions as king.

It is about how he acts at home, where no one else is watching.

A "perfect heart" here means the same integrity indoors as outdoors.

Many people behave one way in public and another way at home.

David refuses to have two different versions of himself.

🏠 This is about private, at home behavior

👀 Integrity when no one else is watching

🎭 Not one face in public, another at home

📖 David refuses a divided character

## 👁️ I Will Set No Wicked Thing Before Mine Eyes

"Before mine eyes" describes what a person chooses to look at and dwell on.

In this culture, the eyes were seen as a gateway that could lead the heart toward sin.

David is not just avoiding wicked actions.

He is refusing to even let his eyes linger on wicked things.

That pattern of watching slowly shapes the heart.

👁️ Eyes were seen as a gateway to sin

🚫 David refuses to even look at wickedness

🧠 The eyes can lead the heart astray

📖 What you watch shapes what you become

## 🛤️ I Hate The Work Of Them That Turn Aside

"Turn aside" describes people who quietly drift away from the right path.

It does not always mean open, obvious rebellion.

It can mean a slow, gradual wandering off course.

David says he hates that pattern, not just isolated wicked acts.

That slow drift often goes unnoticed until it is too late.

🛤️ Turn aside means drifting off the right path

🤫 Not always loud, obvious rebellion

📉 Often a slow, gradual wandering

📖 Quiet drifting can be just as dangerous

# Psalms 101:4-5
# 🚫 Keeping Wickedness At A Distance
---
## 🌀 A Froward Heart Shall Depart From Me

"Froward" is an old word for stubborn, twisted, and hard to correct.

A froward heart resists guidance and pushes back against correction.

David says that kind of heart has no place near him.

This is not about disliking people who disagree with him.

David decides who gets to stay close to him.

🌀 Froward means stubborn and twisted

🙅 Resists guidance and correction

🚪 David keeps this kind of heart away

📖 He refuses to keep stubborn wickedness close

## 🤝 I Will Not Know A Wicked Person

"Know" here means close, personal fellowship, not simple awareness.

David obviously notices wicked people around him.

He refuses to let any of them into his inner circle.

This is a promise about closeness, not about ignoring reality.

Some people belong at a distance, not at your table.

🤝 Know here means close fellowship

👀 David still notices wicked people

🚪 He keeps them out of his inner circle

📖 Closeness is a choice, not an accident

## 🤫 Whoso Privily Slandereth His Neighbour

"Privily" means secretly or behind someone's back.

"Slandereth" means spreading false or damaging talk about another person.

This describes someone attacking a neighbour's reputation where the target cannot even respond.

David says he will cut this person off completely.

David protects people who cannot defend their own reputation.

🤫 Privily means done in secret

🗣️ Slandereth means spreading false, damaging talk

🎯 The victim cannot even respond

📖 Secret gossip harms as much as open attack

## 👀 An High Look And A Proud Heart

"An high look" describes a literal posture, chin lifted, eyes looking down on others.

It is body language before it is even a spoken word.

"Proud heart" names the attitude driving that posture from the inside.

David refuses to tolerate this kind of arrogance near him.

Pride rarely stays hidden for long.

👀 High look means a lifted, superior posture

💔 Proud heart names the arrogance inside

🚫 David will not tolerate this near him

📖 Pride shows on the outside first

# Psalms 101:6-8
# 🏛️ Choosing Who Serves In The King's House
---
## 👁️ Mine Eyes Shall Be Upon The Faithful Of The Land

David already promised to keep wicked things away from his eyes.

Now he promises the opposite, watching for faithful people on purpose.

"Faithful of the land" means those who stay loyal and trustworthy.

A king needs people he can actually trust close to him.

That choice slowly determines who ends up surrounding a person.

👁️ David watches for faithful people on purpose

🤝 Faithful means loyal and trustworthy

👑 A king needs trustworthy people close

📖 Where you look shapes who surrounds you

## 🔁 He That Walketh In A Perfect Way, He Shall Serve Me

This repeats the same "perfect way" already explained back in verse two.

David is not just describing his own integrity anymore.

He is choosing his staff and officials by that same standard.

Only people of real character get a place serving in his house.

That standard becomes policy, not just personal conviction.

🔁 Perfect way repeats the promise from verse two

👥 Now applied to David's staff and officials

🏛️ Character decides who serves in his house

📖 Leaders shape their circle by who they choose

## 🎭 He That Worketh Deceit Shall Not Dwell Within My House

"Worketh deceit" means someone who actively practices lying and manipulation.

This is not one slip of the tongue.

It describes a pattern, a person who makes deception their habit.

David bars that kind of person from his own household completely.

Deception at home undermines everything else David is building.

🎭 Worketh deceit means habitual lying

🚫 Not one slip, but a pattern

🏠 Barred from David's own household

📖 Trust cannot survive a habitual liar inside

## ⏳ He That Telleth Lies Shall Not Tarry In My Sight

"Tarry" means to stay or linger in a place.

David says a known liar will not even be allowed to linger near him.

This goes further than firing someone after the fact.

It describes keeping dishonest people from getting close in the first place.

Prevention mattered more to David than damage control.

⏳ Tarry means to stay or linger

🚪 Liars are not even allowed to linger

🛡️ Prevention, not just punishment after the fact

📖 Keeping dishonest people out before harm starts

## 🌅 I Will Early Destroy All The Wicked Of The Land

"Early" means morning, not simply soon.

Ancient kings often held court each morning to judge cases.

David pictures himself doing that same daily work of justice.

This was not a one time purge.

It was a steady, repeated commitment.

David wanted justice to be normal, not rare.

🌅 Early means morning, not simply soon

⚖️ Ancient kings judged cases each morning

🔁 This was a repeated, daily commitment

📖 Justice was a habit, not a single purge

## 🏙️ Cut Off All Wicked Doers From The City Of The LORD

"The city of the LORD" refers to Jerusalem, the city where God's presence and David's throne both resided.

A city carrying God's own name needed to reflect his character.

David closes the psalm by committing to actually clean house, not just talk about it.

This is not one private vow anymore.

It becomes a plan for how an entire kingdom will be run.

🏙️ City of the LORD means Jerusalem

🏛️ A city bearing God's name reflects his character

🧹 David commits to actually cleaning house

📖 A personal vow becomes a national plan
`.trim();

export const PSALMS_ONE_HUNDRED_ONE_PERSONAL_SECTIONS = parsePsalmsOneHundredOneRawNotes(PSALMS_ONE_HUNDRED_ONE_RAW_NOTES);
