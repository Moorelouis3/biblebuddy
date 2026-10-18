export type JamesFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJamesFourRawNotes(rawText: string): JamesFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JamesFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*James\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing James 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+James\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+James\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing James 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `James 4:${startVerse}` : `James 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 James 4 sections, received " + sections.length);
  }

  return sections;
}

const JAMES_FOUR_RAW_NOTES = `# James 4:1-3
# ⚔️ Where Wars Begin
---
## Wars And Fightings Among You

"Wars" and "fightings" describe conflict breaking out inside the church itself.

James is not asking about enemy armies outside the community.

The fighting he means happens between believers who should be on the same side.

That makes the question much more uncomfortable to answer.

⚔️ Wars and fightings means conflict inside the church

🙅 Not a question about outside armies

🤝 Believers were fighting their own brothers

📖 That makes the question uncomfortable to answer

## Lusts That War In Your Members

"Lusts" here means strong, selfish desires, not only sexual temptation.

"Members" means the parts of a person, body and mind together.

James traces the outside fighting back to desires fighting inside each person first.

The real battlefield was never the church building.

It was the human heart.

💭 Lusts means strong selfish desires

🧍 Members means the parts of a person

🔥 Outside fighting starts with inside desire

📖 The real battlefield is the human heart

## Ye Kill, And Desire To Have, And Cannot Obtain

"Kill" here is not describing actual murder in the church.

James uses it the same way Jesus does, to show how deep hidden hatred really runs.

Wanting something badly enough can turn into bitter hostility toward whoever has it.

That hostility is the real sin James is naming.

🗡️ Kill here is not literal murder

💔 Hidden hatred can run just as deep

😠 Wanting badly can turn into hostility

📖 That hostility is the real sin named

## Ye Ask Amiss, That Ye May Consume It Upon Your Lusts

"Amiss" means with the wrong motive, not simply the wrong words.

These prayers were not wrong because they asked for something.

They were wrong because every request was aimed at feeding selfish desire.

Prayer was being used as a tool for lust instead of a request to God.

🎯 Amiss means the wrong motive

🙏 The problem was not the words

🔥 Every request fed selfish desire

📖 Prayer became a tool for lust

# James 4:4-6
# 💔 Friendship With The World
---
## Ye Adulterers And Adulteresses

This word pictures the church as a bride who should stay faithful to God alone.

Calling them "adulterers" means they had let their hearts wander toward another love.

The Old Testament often describes Israel's unfaithfulness to God the same way.

James is using that same sharp picture on purpose.

💍 Adulterers pictures the church as a bride

💔 Their hearts wandered toward another love

📜 The Old Testament uses this picture too

📖 James uses it here on purpose

## The Friendship Of The World Is Enmity With God

"Friendship" here means a loyalty, not just being friendly with people.

"Enmity" means open hostility, the opposite of friendship.

Loving the world's values the way it loves them puts a person at war with God.

A person cannot hold both loyalties at the same time.

🤝 Friendship here means loyalty not manners

⚔️ Enmity means open hostility

🌍 Loving the world's values opposes God

📖 No one can hold both loyalties

## The Spirit That Dwelleth In Us Lusteth To Envy

This verse is famously hard to translate, and scholars read it two different ways.

Some believe it describes the human spirit, which naturally leans toward envy.

Others believe it describes God's own Spirit, who jealously longs for undivided love.

Either reading points to the same warning against divided loyalty.

❓ This verse is famously hard to translate

🧍 It may describe the human spirit

🕊️ It may describe God's own Spirit

📖 Either way it warns against divided loyalty

## God Resisteth The Proud, But Giveth Grace Unto The Humble

James is quoting a line that already existed in the Old Testament book of Proverbs.

"Resisteth" means God actively works against a certain kind of person.

The proud person trusts their own strength and does not think they need God.

The humble person admits their need, and finds grace waiting for them instead.

📜 James quotes a line from Proverbs

🚫 Resisteth means God works against someone

💪 Pride trusts in its own strength

📖 Humility finds grace waiting instead

# James 4:7-10
# 🙏 Draw Nigh To God
---
## Submit Yourselves Therefore To God

"Submit" means placing yourself willingly under someone else's authority.

This is the first step James gives after naming the problem of pride.

Submitting to God is not a one time decision.

It is a daily choice to put His will above personal desire.

🙇 Submit means placing yourself under authority

🥇 This is the first step James gives

🗓️ Submitting to God happens daily

📖 It puts God's will above desire

## Resist The Devil, And He Will Flee From You

"Resist" means actively pushing back, not just hoping temptation goes away.

"Flee" means the devil runs rather than fights when he meets real resistance.

This is a promise, not just advice.

Standing firm actually works.

🛡️ Resist means actively pushing back

🏃 Flee means the devil runs away

🤝 Standing firm against him actually works

📖 This verse is a real promise

## Cleanse Your Hands, Ye Sinners, And Purify Your Hearts, Ye Double Minded

"Hands" here stands for actions, the things a person actually does.

"Hearts" stands for the hidden motives behind those actions.

"Double minded" means pulled between two loyalties instead of giving God a whole heart.

James calls for change on the outside and the inside together.

🤲 Hands stands for a person's actions

❤️ Hearts stands for hidden motives

🔀 Double minded means pulled between loyalties

📖 James calls for change in both

## Be Afflicted, And Mourn, And Weep

These three words all describe real, visible grief over sin.

James is not asking for a quiet, private feeling.

He wants a response serious enough to be seen by others.

Turning away from sin is supposed to feel like loss, not a small adjustment.

😢 All three words describe visible grief

👀 This grief was meant to be seen

⚖️ Turning from sin feels like real loss

📖 Repentance is not a small adjustment

## Humble Yourselves In The Sight Of The Lord

"Humble" means lowering yourself on purpose.

That is different from waiting to be humbled by hard circumstances.

James repeats this command because it is so easy to resist.

The promise attached to it is a complete reversal.

Whoever lowers themselves before God is the one God lifts back up.

🙇 Humble means lowering yourself on purpose

🔁 James repeats this command on purpose

⬆️ The promise is a complete reversal

📖 God lifts up whoever lowers themselves

# James 4:11-12
# ⚖️ Only One Judge
---
## Speak Not Evil One Of Another, Brethren

"Speak evil" means tearing someone down with words, whether true or false.

James calls the readers "brethren" even while correcting them sharply.

That word is a reminder that the person being gossiped about is family too.

Harsh words toward a brother break the same bond they claim to value.

🗣️ Speak evil means tearing someone down

👥 Brethren reminds them they are family

💔 The one gossiped about is family too

📖 Harsh words break the bond they value

## Speaketh Evil Of The Law, And Judgeth The Law

Judging someone's character puts you above God's own law.

The law commanded love for one's neighbor, not constant criticism.

Speaking evil of a brother treats that command as optional.

That makes the critic an opponent of the law instead of someone following it.

👑 Judging puts you above God's law

❤️ The law commanded love, not criticism

🚫 Speaking evil treats that command as optional

📖 The critic becomes the law's opponent

## There Is One Lawgiver

"Lawgiver" means the one person with real authority to make and enforce the law.

Only God holds that position, no one else.

Every human judgment is borrowed authority at best.

Forgetting that is where this whole problem started.

👑 Lawgiver means the one who sets law

☝️ Only God holds that position

🤲 Human judgment is only borrowed authority

📖 Forgetting that started this whole problem

## Who Art Thou That Judgest Another

This question is not really asking for an answer.

It is meant to stop the reader in their tracks.

No person has the standing to judge another person's standing with God.

That position was never open to begin with.

❓ This question is not really a question

🛑 It is meant to stop the reader

🙅 No one has standing to judge another

📖 That position was never open to anyone

# James 4:13-17
# ⏳ A Life Like Vapour
---
## Go To Now, Ye That Say

"Go to now" was a common way to grab someone's attention, similar to saying "listen" today.

James is about to call out a specific group of confident planners.

These are people mapping out their future in exact detail.

Their confidence is about to be challenged.

📢 Go to now means listen up

🗺️ James targets confident planners here

📅 They map their future in detail

📖 Their confidence is about to be challenged

## Continue There A Year, And Buy And Sell, And Get Gain

This plan sounds careful, even responsible, on the surface.

It names a city, a timeline, and a clear business goal.

Nothing in the plan makes room for God's will at all.

Careful planning can still be lived as if God does not exist.

🗺️ The plan sounds careful on the surface

📅 It names a city and a timeline

🚫 It leaves no room for God's will

📖 Careful plans can still ignore God

## Ye Know Not What Shall Be On The Morrow

No one, however careful, can actually guarantee tomorrow.

James is not condemning planning itself.

He is condemning planning that forgets how uncertain the future really is.

That uncertainty is true for every person, not only for these planners.

❓ No one can guarantee tomorrow

📝 James is not against planning itself

⚠️ He warns against forgetting how uncertain life is

📖 This uncertainty is true for everyone

## It Is Even A Vapour

"Vapour" means mist or steam, something that shows up and disappears fast.

Picture your own breath on a cold morning.

It is visible for only a second before it is gone completely.

James compares a whole human life to that same brief appearance.

💨 Vapour means mist that disappears fast

🌬️ Picture your breath on a cold morning

⏱️ It vanishes in only a second

📖 James compares a whole life to that

## If The Lord Will, We Shall Live, And Do This, Or That

James is not asking for the exact words "Lord willing" to be repeated like a formula.

He wants a real posture of dependence behind whatever a person plans.

Every plan should hold space for God to change it.

That kind of planning stays humble instead of certain.

🗣️ This is not a magic phrase to repeat

🙏 James wants real dependence on God

🔄 Every plan should allow God to change it

📖 Humble planning replaces certain planning

## All Such Rejoicing Is Evil

"Boastings" means proud bragging about plans as if they are already guaranteed.

Confidence is not the problem James is naming here.

The problem is confidence that leaves God out of the picture entirely.

That kind of pride is what turns ordinary planning into sin.

🗣️ Boastings means proud bragging about plans

✅ Confidence itself is not the problem

🚫 Leaving God out is the real problem

📖 That pride turns planning into sin

## To Him That Knoweth To Do Good, And Doeth It Not, To Him It Is Sin

James closes with a different kind of sin than the chapter has named so far.

This is not about a wrong action.

It is about a right action a person knew to do and skipped anyway.

Knowing the good and still walking past it is its own kind of guilt.

🧠 This sin is about knowing, not doing

🚶 It covers good left undone, not wrong done

⏭️ Knowing the good and skipping it still counts

📖 This closes the chapter on real responsibility
`.trim();

export const JAMES_FOUR_PERSONAL_SECTIONS = parseJamesFourRawNotes(JAMES_FOUR_RAW_NOTES);
