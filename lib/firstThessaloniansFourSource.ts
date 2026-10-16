export type FirstThessaloniansFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstThessaloniansFourRawNotes(rawText: string): FirstThessaloniansFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstThessaloniansFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*1\s+Thessalonians\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Thessalonians 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+1\s+Thessalonians\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+1\s+Thessalonians\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Thessalonians 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Thessalonians 4:${startVerse}` : `1 Thessalonians 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 1 Thessalonians 4 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_THESSALONIANS_FOUR_RAW_NOTES = `# 1 Thessalonians 4:1-3
# 🙏 A Life That Pleases God
---
## 🗣️ Beseech You, Brethren, And Exhort You By The Lord Jesus

"Beseech" means to ask with real urgency, almost begging.

"Exhort" means to strongly encourage someone toward action.

Paul is not giving a casual suggestion here.

He speaks with the authority of the Lord Jesus behind him.

This command carries real weight because of who stands behind it.

🗣️ Beseech means urgent asking

📣 Exhort means strong encouragement

👑 Backed by the Lord Jesus

📖 This is not a casual suggestion

## 🚶 As Ye Have Received Of Us How Ye Ought To Walk

"Walk" here does not mean literal footsteps.

It means the whole pattern of someone's daily life.

Paul had already taught them what that pattern looks like.

Now he calls them to keep living it out.

🚶 Walk means a way of life

📏 Paul already taught this pattern

🔁 He calls them to keep living it

📖 Pleasing God is an ongoing direction

## 📈 So Ye Would Abound More And More

"Abound" means to overflow far past the minimum.

Paul already prayed this same word over them in the last letter.

Pleasing God is never a box to check once.

There is always more room to grow in it.

📈 Abound means to overflow

🔁 Paul used this word before

✅ Pleasing God is not a checkbox

📖 Growth in it never really stops

## 🙏 This Is The Will Of God, Even Your Sanctification

"Sanctification" means being made holy and set apart.

Paul names it directly as God's will for them.

This is not one command hidden among many others.

It is the whole aim behind everything he is about to say.

🙏 Sanctification means being made holy

🎯 This is named as God's will

🧭 It is the chapter's whole aim

📖 Everything after this flows from it

## 🚫 Abstain From Fornication

"Fornication" means sexual activity outside of marriage.

"Abstain" means to deliberately hold back from something.

In the wider Roman world, this kind of activity was common and rarely questioned.

Many scholars believe some temples even built it into their worship.

The Christian call to hold back from it was a real break from that culture.

🚫 Fornication means sex outside marriage

🛑 Abstain means to hold back

🏛️ Common and rarely questioned in Rome

📖 Christians broke sharply from that norm

# 1 Thessalonians 4:4-8
# 🛐 Holiness Over Lust And Fraud
---
## 🏺 Know How To Possess His Vessel In Sanctification And Honour

"Vessel" is a word Paul could mean two ways here.

Many scholars believe it points to a man's own body.

Others believe it points to his wife.

Either reading lands on the same call to self control and respect.

This was not permission to treat oneself or another person carelessly.

🏺 Vessel likely means body or spouse

🤔 Scholars read this verse both ways

🛡️ Either way the call is self control

📖 No one gets treated carelessly here

## 🔥 Not In The Lust Of Concupiscence

"Concupiscence" means a strong and sinful desire that takes over a person.

This is more than a passing temptation.

Paul describes something that controls someone instead of being controlled.

A believer's desires were meant to be ruled, not the other way around.

🔥 Concupiscence means a controlling desire

⚠️ More than a passing temptation

🎛️ It controls instead of being controlled

📖 Desire was meant to be ruled

## 🌍 Even As The Gentiles Which Know Not God

"Gentiles" here means people outside the people of Israel.

It is not a slur Paul invented on the spot.

He is naming a real difference in starting point.

Without knowing the true God, this kind of self control had no foundation.

Knowing God is what makes a different kind of life possible.

🌍 Gentiles means nations outside Israel

🙅 Not an insult, a real contrast

🧱 They had no foundation for this

📖 Knowing God makes a new life possible

## ⚖️ That No Man Go Beyond And Defraud His Brother

"Defraud" means to cheat someone out of what is rightfully theirs.

Here that cheating happens through sexual sin against another person's marriage.

"Brother" widens this beyond strangers to fellow believers in the same church.

This was never framed as a private matter with no victim.

⚖️ Defraud means to cheat someone

💍 Here through sin against a marriage

🤝 Brother means a fellow believer

📖 This sin always has a victim

## 👁️ The Lord Is The Avenger Of All Such

"Avenger" means the one who settles the account in the end.

Paul is not telling the wronged person to get even.

God himself takes on that responsibility instead.

This verse removes revenge from human hands entirely.

👁️ Avenger means God settles accounts

🙅 Not permission for personal revenge

🙏 God takes that responsibility himself

📖 Revenge is removed from human hands

## 📢 We Also Have Forewarned You And Testified

"Forewarned" means Paul already taught this before now.

"Testified" means he stated it as something he had personally witnessed to be true.

None of this is a brand new rule invented for this letter.

Paul is reminding them of ground they already stood on.

📢 Forewarned means taught before now

🗣️ Testified means stated as true

🔁 Not a brand new rule

📖 Paul reminds them of old ground

## 🚫 God Hath Not Called Us Unto Uncleanness, But Unto Holiness

"Uncleanness" means a life marked by moral impurity.

"Holiness" means being set apart for God's own purposes.

Paul draws a hard line between the two.

God's call was never aimed at the first option.

Every believer was called toward the second one instead.

🚫 Uncleanness means moral impurity

✨ Holiness means set apart for God

➖ Paul draws a hard line

📖 Believers are called toward holiness

## 🕊️ Given Unto Us His Holy Spirit

This holiness is not something a person builds alone.

God himself gives his own Spirit to live inside the believer.

The Spirit becomes the source of this new kind of life.

Holy living starts as a gift before it becomes a habit.

🕊️ The Spirit lives inside believers

🎁 Holiness starts as a gift

🚫 Not something built alone

📖 The gift becomes a habit

# 1 Thessalonians 4:9-12
# 🤝 Love, Quiet Work, A Good Witness
---
## 📚 Ye Yourselves Are Taught Of God To Love One Another

Paul uses an unusual phrase here, "taught of God."

It means God himself places this love inside a believer directly.

This is not a lesson learned only from a classroom or a letter.

Loving other believers becomes something closer to instinct than homework.

📚 Taught of God means God himself teaches

💞 Not just classroom instruction

❤️ Love becomes closer to instinct

📖 This love grows from the inside

## 🗺️ Ye Do It Toward All The Brethren Which Are In All Macedonia

"Macedonia" was the Roman region that included Thessalonica and nearby cities.

This love was not staying inside one local church building.

Other believers across the whole region had already noticed it.

A real reputation for love had quietly spread beyond their own walls.

🗺️ Macedonia means the wider region

🏘️ Love was not staying local

👀 Other churches had noticed it

📖 Their reputation had spread outward

## 🤫 That Ye Study To Be Quiet, And To Do Your Own Business

"Study" here does not mean reading books.

It means to make something your constant personal aim.

"Quiet" describes a settled life, not a loud or stirred up one.

Paul wants them chasing a calm life on purpose, not by accident.

🤫 Study means to make it your aim

🧘 Quiet means settled, not stirred up

🎯 This is on purpose, not accidental

📖 A calm life takes real effort

## 🔨 Work With Your Own Hands, As We Commanded You

Manual labor was looked down on by some in that world.

Paul had already modeled this himself while he was with them.

He is not suggesting this as optional advice.

He calls it a command he had already given.

🔨 Manual labor was looked down on

🧑‍🏭 Paul modeled this work himself

📏 This was a command, not advice

📖 Already given once before

## 👀 Walk Honestly Toward Them That Are Without

"Them that are without" means people outside the church.

"Honestly" here means living in a way others can respect.

How this church behaved in public reflected on the whole message they carried.

A believer's daily conduct was its own kind of testimony.

👀 Without means outsiders

🤝 Honestly means in a respectable way

📣 Their conduct reflected their message

📖 Daily life became its own testimony

## 🙌 That Ye May Have Lack Of Nothing

Working with their own hands kept them from needing outside help.

This protected the church's reputation with people who were watching.

It also kept them from leaning on others unnecessarily.

A self sufficient church could give instead of only receiving.

🙌 Working kept them self sufficient

🛡️ It protected the church's reputation

🚫 No unneeded leaning on others

📖 They could give, not only receive

## ✅ Ye Need Not That I Write Unto You

Paul is not introducing love as a brand new idea here.

He is affirming something they were already living out well.

This whole section reads more like encouragement than correction.

Even strong believers benefit from being reminded of what they already know.

✅ Not a brand new idea

💪 Affirms what they already lived

🙌 Encouragement, not correction

📖 Even strong believers need reminders

# 1 Thessalonians 4:13-15
# ⚰️ Hope For Those Who Sleep In Jesus
---
## 😴 Concerning Them Which Are Asleep

"Asleep" here is not a literal nap.

It is Paul's gentle word for believers who have died.

Sleep always carries the expectation of waking up again.

Calling death "sleep" already hints at the hope coming later in this passage.

😴 Asleep means believers who have died

⏰ Sleep implies a waking later

🌅 The word itself carries hope

📖 This sets up what comes next

## 😢 That Ye Sorrow Not, Even As Others Which Have No Hope

Paul does not tell them not to grieve at all.

He tells them not to grieve the way people without hope grieve.

In the wider ancient world, many believed death was simply the end.

Grief without any hope of reunion could feel completely final.

Christian grief was always allowed to carry real hope inside it.

😢 Grief itself is not forbidden

🚫 Grief without hope is being corrected

🏺 Many in that world saw death as final

📖 Christian grief still carries real hope

## ✝️ If We Believe That Jesus Died And Rose Again

This hope is not built on wishful thinking.

It stands on one specific historical event, the resurrection of Jesus.

If that event is true, everything else in this passage follows from it.

Paul anchors the whole argument to something that either happened or did not.

✝️ The hope rests on Christ's resurrection

🏛️ One historical event, not a feeling

🔗 Everything else follows from this

📖 It either happened or it did not

## 🤝 Them Also Which Sleep In Jesus Will God Bring With Him

"Sleep in Jesus" means death did not break their bond with Christ.

That union with Jesus continues on the other side of death.

When the Lord returns, God brings these believers back with him.

No believer who has already died gets left behind in that return.

🤝 Sleep in Jesus means death in Christ

🔗 The union does not end

🚶 God brings them with him

📖 No believer is left behind

## 📜 This We Say Unto You By The Word Of The Lord

Paul is not offering his own private guess here.

"The word of the Lord" marks this as direct, authoritative teaching.

He wants them to trust it the same way they would trust Christ's own words.

This phrase raises the weight of everything that follows in the next few verses.

📜 Not Paul's own private guess

👑 Marked as the Lord's own word

🤲 Trust it like Christ's own words

📖 It raises the weight of what follows

## ⏳ Shall Not Prevent Them Which Are Asleep

"Prevent" is an old word that does not mean stop or block.

Here it means to go ahead of, or arrive first.

Some believers worried the dead had somehow missed out on the Lord's return.

Paul corrects that fear directly in the very next verse.

⏳ Prevent means to go before

🙅 Not the modern meaning, stop

😟 Some feared the dead missed out

📖 Paul corrects that fear next

# 1 Thessalonians 4:16-18
# 📯 The Lord Himself Shall Descend
---
## 👑 The Lord Himself Shall Descend From Heaven With A Shout

"Himself" matters here.

This is not a messenger sent in his place.

Christ comes in person, not through a representative.

A "shout" here pictures a command, the kind a general gives in battle.

This is not a quiet or secret event.

👑 Himself means Christ, not a messenger

📣 Shout pictures a commanding call

🙅 No representative sent in his place

📖 This event will not be secret

## 📯 With The Voice Of The Archangel

"Archangel" means an angel holding the highest rank among angels.

This is not just any heavenly messenger speaking.

A voice at this rank matches the size of the moment.

Every detail in this scene points toward something unmistakably real and public.

📯 Archangel means a top ranking angel

🔊 Not just any heavenly voice

📏 The rank matches the moment

📖 Every detail points to something public

## 🎺 And With The Trump Of God

Trumpets in that world were far louder than music.

They could summon armies or announce a king's arrival.

Many scholars connect this image to Israel's Feast of Trumpets.

A trumpet this size was never a private signal.

It announces an event everyone will know is happening.

🎺 Trumpets summoned armies and kings

🙏 Linked to Israel's Feast of Trumpets

🙅 Never a private signal

📖 Everyone will know this is happening

## ☝️ The Dead In Christ Shall Rise First

Some believers feared that those who already died had somehow missed out.

Paul flips the expected order on its head here.

The dead are not last in line.

They go first.

Loved ones who already died are never left behind.

☝️ Some feared missing out

🔄 Paul flips the expected order

🥇 The dead actually rise first

📖 Loved ones are never left behind

## ☁️ We Which Are Alive And Remain Shall Be Caught Up Together With Them In The Clouds

"Caught up" means suddenly and powerfully taken up into the air.

This is the verse the word "rapture" eventually came from.

"Together" matters just as much as "caught up" does.

Living believers and those raised from death rise up as one group.

No one in Christ experiences this moment alone.

☁️ Caught up means suddenly lifted

📜 Source of the word rapture

🤝 Together means everyone rises as one

📖 No believer faces this alone

## 🤝 To Meet The Lord In The Air

Meeting the Lord in the air points to a specific ancient custom.

When an important ruler visited a city, its people went out to greet him.

They would then walk back into the city together.

Believers go out to greet their returning King, then return with him.

🤝 Pictures greeting a returning king

🚶 People went out to meet him

🏠 Then returned together with him

📖 Believers welcome Christ the same way

## 💫 So Shall We Ever Be With The Lord

All the drama of the previous two verses leads to this one simple line.

The shout, the trumpet, and the clouds are not really the point.

Being with the Lord forever is the actual point.

This is the destination the whole hope has been aiming at.

💫 Being with the Lord is the point

🎯 Not the shout or the trumpet

🏁 This is the hope's destination

📖 Everything in this passage aims here

## 🫂 Comfort One Another With These Words

This whole passage was never meant to be a timeline to decode.

It was written to comfort people grieving real losses.

Paul tells them to use these very words on each other.

Hope was meant to be shared out loud, not kept private.

🫂 Written to comfort grieving people

🙅 Not a timeline to decode

🗣️ Meant to be spoken aloud

📖 Hope is meant to be shared`.trim();

export const FIRST_THESSALONIANS_FOUR_PERSONAL_SECTIONS = parseFirstThessaloniansFourRawNotes(
  FIRST_THESSALONIANS_FOUR_RAW_NOTES
);
