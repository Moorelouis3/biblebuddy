export type RomansTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRomansTenRawNotes(rawText: string): RomansTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RomansTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Romans\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Romans 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Romans\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Romans\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Romans 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Romans 10:${startVerse}` : `Romans 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Romans 10 sections, received " + sections.length);
  }

  return sections;
}

const ROMANS_TEN_RAW_NOTES = `# Romans 10:1-4
# 🙏 A Prayer For Israel's Salvation
---
## My Heart's Desire And Prayer To God For Israel

Paul is still grieving over Israel from the previous chapter.

A heart's desire means something a person wants more than almost anything else.

Paul does not want revenge on the Jews who rejected the gospel.

He wants them saved, even after everything he just said about God's sovereign choice.

His sorrow turns straight into a prayer instead of an argument.

💔 Paul still grieves for Israel
🙏 A heart's desire means a deep want
🤲 Paul prays for salvation, not revenge
📖 Sorrow turns straight into prayer

## A Zeal Of God, But Not According To Knowledge

Zeal means intense enthusiasm and effort for a cause.

Paul says Israel has real zeal for God.

That zeal is not the problem.

Their effort is sincere but their understanding is wrong.

Good intentions do not replace accurate knowledge of God.

🔥 Zeal means intense effort and passion
✅ Israel's zeal is sincere and real
❌ Their understanding of God is wrong
📖 Sincerity does not replace true knowledge

## Being Ignorant Of God's Righteousness

Ignorant here does not mean they had never heard about it.

It means they did not grasp what God's righteousness actually required.

They had the law and the prophets in front of them the whole time.

Having information is not the same as understanding it.

A person can read scripture every week and still miss its point.

📚 Ignorant means not grasping, not never hearing
👀 They had the law in front of them
🧠 Information is not the same as understanding
📖 Reading scripture does not guarantee understanding it

## Going About To Establish Their Own Righteousness

Going about means actively working at something, not sitting still.

Israel was trying hard to build their own righteousness.

That effort was aimed at the wrong target entirely.

No amount of personal effort earns the righteousness God requires.

They refused to simply receive what God already offered.

🏗️ Going about means actively working hard
🎯 Their effort aimed at the wrong target
🚫 Personal effort cannot earn God's righteousness
📖 They refused to receive what God offered

## Christ Is The End Of The Law For Righteousness

End here does not mean the law simply stopped existing.

It means Christ is the law's goal, the point it was aiming toward.

The law was always meant to point toward a Savior, not replace one.

Anyone who believes reaches the righteousness the law could only describe.

Christ finishes what the law could only point to.

🏁 End means goal, not termination
🧭 The law always pointed toward a Savior
🙌 Believers reach what the law described
📖 Christ finishes what the law pointed to

# Romans 10:5-8
# 📜 The Righteousness Of Faith Speaks
---
## Moses Describeth The Righteousness Which Is Of The Law

Moses wrote the law that Israel lived under for centuries.

Righteousness of the law means being made right with God through keeping it.

This is a real system Moses laid out, not a strawman Paul invented.

It demands action, not just belief.

The law is real but its standard is extremely high.

📜 Moses gave Israel the law
⚖️ Law righteousness means earning it by keeping it
🛠️ It demands action, not just belief
📖 Its standard is extremely high

## The Man Which Doeth Those Things Shall Live By Them

This line comes straight from Leviticus, written by Moses himself.

Live by them means a person's life depends on perfect obedience.

Doeth means does, as in actually performing every command.

Partial obedience does not count under this standard.

This is exactly why no one is saved by the law alone.

📖 Quoted straight from Leviticus
🏃 Doeth means actually performing every command
🚫 Partial obedience does not count
➡️ No one is saved by the law alone

## Say Not In Thine Heart, Who Shall Ascend Into Heaven

Paul borrows this phrase from Moses in Deuteronomy.

The question pictures someone trying to go get Christ down themselves.

Ascend into heaven here means attempting an impossible spiritual climb.

Paul explains that this would mean bringing Christ down from above.

Christ already came down at His birth, so no one needs to go get Him.

📏 Paul quotes Moses from Deuteronomy
🪜 Ascend into heaven means an impossible climb
👶 Bringing Christ down already happened at His birth
➡️ No one needs to go get Christ

## Who Shall Descend Into The Deep

The deep here pictures the realm of the dead, not the ocean.

This second question asks who would go get Christ back from death.

Paul says that would mean bringing Christ up from the grave.

Christ already rose from the dead on His own power.

No one needs to attempt that rescue either.

⚰️ The deep pictures the realm of the dead
🪦 The question asks who would raise Christ
💪 Christ already rose by His own power
➡️ No one needs to attempt that rescue

## The Word Is Nigh Thee, Even In Thy Mouth, And In Thy Heart

Nigh means near, close enough to reach without effort.

Salvation is not hidden in heaven or buried in the grave.

It is already as near as a person's own mouth and heart.

Paul calls this nearby message the word of faith.

The very thing people searched the sky and the grave for was already within reach.

📍 Nigh means near, within reach
🙅 Salvation is not hidden far away
👄 It is as near as mouth and heart
📖 The word of faith was already within reach

# Romans 10:9-13
# 📣 Whosoever Calls Will Be Saved
---
## Confess With Thy Mouth The Lord Jesus

Confess means to openly agree with and declare something as true.

This is not a private feeling kept inside someone's own mind.

Calling Jesus Lord in public was a bold and risky claim.

Rome already had an emperor people were expected to call lord.

Confessing Jesus as Lord put a person's loyalty on public display.

🗣️ Confess means openly declaring something true
🙈 Not a private, hidden feeling
👑 Rome expected loyalty to its own lord
📖 Confessing Jesus as Lord was a public risk

## Believe In Thine Heart That God Hath Raised Him From The Dead

Heart here means the whole inner person, not just emotion.

Believing in the heart means full trust, not simple head knowledge.

The resurrection is the one fact this verse singles out.

If Christ did not rise, there is nothing left to trust.

Genuine belief rests on an event that actually happened in history.

❤️ Heart means the whole inner person
🧠 Belief is trust, not head knowledge
⚰️ The resurrection is the fact singled out
📖 Belief rests on a real historical event

## With The Heart Man Believeth Unto Righteousness

Paul restates the same idea in reverse order.

Belief in the heart comes first and leads to righteousness.

Confession with the mouth follows and leads to salvation.

The order matters, inward trust always comes before outward declaration.

A person cannot fake belief by only saying the right words.

🔄 Paul restates the idea, reordered
❤️ Inward belief comes before outward confession
👄 Mouth confession follows, leading to salvation
📖 Words alone cannot fake real belief

## Whosoever Believeth On Him Shall Not Be Ashamed

This line is a direct quote from the prophet Isaiah.

Ashamed here means being let down or proven wrong in the end.

Trusting in Christ will never end in that kind of disappointment.

Whosoever is the key word, it includes absolutely anyone.

No background or nationality is excluded from this promise.

📖 Quoted directly from the prophet Isaiah
😔 Ashamed means disappointed or proven wrong
🙋 Whosoever includes absolutely anyone
➡️ No nationality is excluded from this promise

## No Difference Between The Jew And The Greek

Greek here does not mean only people from Greece.

It stands for every non Jewish nation, every Gentile.

Paul already argued this point back in Romans chapter three.

The same Lord rules over Jew and Gentile alike.

His riches are not divided smaller by being shared with more people.

🇬🇷 Greek stands for every Gentile nation
🤝 The same Lord rules over everyone
💰 His riches are not divided by sharing
📖 Paul already made this point in Romans three

## Whosoever Shall Call Upon The Name Of The Lord Shall Be Saved

Calling upon the name means appealing to someone for rescue.

This exact promise comes from the prophet Joel.

It is not a magic phrase, it is a genuine cry for help.

The verse ends the whole argument on one word, whosoever.

That word closes the door on every excuse to feel excluded.

🆘 Calling on His name means crying for rescue
📜 This promise comes from the prophet Joel
🚫 Not a magic phrase, a real appeal
➡️ Whosoever closes the door on exclusion

# Romans 10:14-15
# 👣 Sent To Preach The Good News
---
## How Then Shall They Call On Him In Whom They Have Not Believed

Paul builds a chain of four questions in these two verses.

Each step depends completely on the step before it.

No one calls on someone they have not come to trust.

Paul is explaining why preaching the gospel is not optional.

Salvation reaching anyone depends on this whole chain holding together.

🔗 Paul builds a chain of four questions
🙏 Calling depends on trusting first
📢 Preaching the gospel is not optional
📖 The whole chain must hold together

## How Shall They Hear Without A Preacher

A preacher here means someone who proclaims a message aloud.

In the ancient world, news traveled by a human voice, not print.

Without someone speaking the message, no one else can hear it.

Faith cannot start from silence.

God's plan for spreading the gospel always runs through people.

📢 Preacher means someone who proclaims a message
🗣️ News traveled by voice, not print
🤐 Faith cannot start from silence
📖 God's plan runs through people

## How Shall They Preach, Except They Be Sent

Sent means commissioned and authorized, not self appointed.

A messenger carries weight because someone trustworthy stands behind him.

Paul himself was sent on the road to Damascus.

Preaching the gospel was never meant to be a solo decision.

Being sent connects every preacher back to God's own authority.

✅ Sent means commissioned, not self appointed
🛡️ A sender's trust backs the messenger
🛣️ Paul himself was sent on the Damascus road
📖 Being sent ties back to God's authority

## How Beautiful Are The Feet Of Them That Preach The Gospel Of Peace

Feet here is a figure of speech, not a literal compliment.

It pictures the long, dusty journey a messenger walked to deliver news.

Isaiah first used this image for a runner announcing a battle had been won.

Paul applies that same picture to anyone who carries the gospel to others.

Good news always needs feet willing to carry it somewhere.

🏃 Feet pictures a messenger's long journey
⚔️ Isaiah used it for news of victory
✨ Paul applies it to gospel messengers
📖 Good news needs feet willing to carry it

# Romans 10:16-18
# 👂 Faith Comes By Hearing
---
## They Have Not All Obeyed The Gospel

Paul shifts from the chain of logic to a sad reality.

Hearing the gospel does not guarantee believing it.

Many in Israel heard the same message Paul is defending.

Some still turned away from it anyway.

Rejection does not mean the message failed to reach them.

🔄 Paul shifts from logic to reality
👂 Hearing does not guarantee believing
🚶 Many in Israel heard and still turned away
📖 Rejection does not mean the message failed

## Esaias Saith, Lord, Who Hath Believed Our Report

Esaias is the prophet Isaiah's name in Greek.

Paul quotes him directly as proof this unbelief was predicted.

The question sounds almost like a complaint, who actually believed us.

Isaiah had already faced this same unbelief centuries earlier.

Israel's response to Paul's gospel was nothing new.

📜 Esaias is the prophet Isaiah's Greek name
❓ The question sounds like a complaint
⏳ Isaiah faced the same unbelief centuries earlier
📖 Israel's unbelief now was already predicted

## Faith Cometh By Hearing, And Hearing By The Word Of God

Cometh simply means comes, an old way of saying it arrives.

Faith is not something a person manufactures alone.

It arrives through hearing an actual message.

That message has to be God's own word, not just any words.

This is why preaching has mattered since the start of this chapter.

➡️ Cometh simply means comes
🙂 Faith is not self manufactured
👂 Faith arrives through hearing a message
📖 The message must be God's own word

## Their Sound Went Into All The Earth

This line is actually borrowed from a Psalm about creation itself.

In that Psalm, the sun and stars silently declare God's glory everywhere.

Paul takes that same picture and applies it to the gospel's reach.

His point answers the question straight, yes, people really have heard.

The message was never kept quiet or hidden in a corner.

⭐ Borrowed from a Psalm about creation
🌍 Paul applies it to the gospel's reach
✅ The answer is yes, people have heard
📖 The message was never hidden away

# Romans 10:19-21
# 🤲 God Still Reaches Toward Israel
---
## Did Not Israel Know

Paul asks this question to rule out one excuse completely.

Israel's unbelief was not caused by never being told.

Moses himself warned them about this centuries before Paul wrote.

Not knowing was never a real option for Israel.

Their rejection came from choice, not ignorance.

❓ Paul rules out one possible excuse
📜 Moses warned Israel centuries earlier
🚫 Ignorance was never the real issue
📖 Israel's rejection came from choice

## I Will Provoke You To Jealousy By Them That Are No People

This comes from the song Moses sang long ago in Deuteronomy.

No people means a nation outside God's covenant with Israel, the Gentiles.

God planned to bless outsiders in a way Israel would notice.

Watching outsiders receive blessing was meant to stir up jealousy.

Jealousy here was meant to wake Israel up, not just hurt them.

📜 From the song Moses sang in Deuteronomy
🌍 No people means the Gentile nations
👀 Israel was meant to notice and react
📖 Jealousy was meant to wake Israel up

## I Was Found Of Them That Sought Me Not

Esaias speaks this next line even more directly than before.

God says He was found by people who were not even looking.

Made manifest means made clearly known, openly shown.

This describes Gentiles discovering God without ever searching for Him first.

Grace reaching people who never asked for it is the whole point.

📜 Esaias speaks even more boldly here
🙋 God was found by people not looking
💡 Made manifest means made clearly known
📖 Grace reaches people who never asked

## A Disobedient And Gainsaying People

Gainsaying means arguing back, talking against what is being offered.

God describes stretching out His hands all day long toward Israel.

That picture is a parent reaching out while a child keeps refusing.

The refusal was not silence, it was active resistance.

Even here, the posture is reaching out, not giving up.

🗣️ Gainsaying means arguing back against God
🤲 God pictured reaching out all day long
👶 Like a parent reaching toward a resistant child
📖 Even now, God's posture is still reaching out
`.trim();

export const ROMANS_TEN_PERSONAL_SECTIONS = parseRomansTenRawNotes(ROMANS_TEN_RAW_NOTES);
