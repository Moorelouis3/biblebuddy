export type IsaiahFiftyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFiftyRawNotes(rawText: string): IsaiahFiftyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFiftyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+50:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 50 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+50:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+50:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 50 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 50,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 50:${startVerse}` : `Isaiah 50:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Isaiah 50 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FIFTY_RAW_NOTES = `# Isaiah 50:1-3
# 📜 No Fault But Their Own
---
## 📜 Where Is The Bill Of Your Mother's Divorcement

A bill of divorcement was a legal certificate required to end a marriage.

The law demanded written proof, not just a private decision.

God asks Israel to produce that proof for their own exile.

No such certificate exists because God never divorced His people.

📜 A bill of divorcement was a legal certificate
⚖️ The law required real proof to end marriage
🔍 God challenges them to produce that proof
📖 No certificate exists because God never left

## 💰 Which Of My Creditors Is It To Whom I Have Sold You

In hard times, a father could sell his children to pay off a debt.

That practice was called selling into slavery for money owed.

God asks which creditor forced Him to sell Israel away.

He had no debt, so exile was never forced upon Him.

💰 Selling children paid off unpaid debts back then
⛓️ That practice was a real ancient custom
❓ God asks which creditor forced His hand
📖 God owed no debt that forced this exile

## ⚖️ For Your Iniquities Have Ye Sold Yourselves

Iniquity means sin, a choice that breaks trust with God.

This verse states the cause without softening it.

Israel was not a victim of God's carelessness or weakness.

Their own sin caused the exile, not any failure on God's part.

⚖️ Iniquity means sin that breaks trust
🎯 This states the cause plainly, no softening
🚫 Israel was not a victim of God
📖 Their own sin caused this exile

## 🖐️ Is My Hand Shortened At All, That It Cannot Redeem?

A shortened hand was an old way to picture weakened power.

This question denies that God's strength has grown weak.

Redeem means to rescue or buy back someone from trouble.

God's power to save His people was never in question.

🖐️ A shortened hand pictures weakened power
💪 God denies His strength has grown weak
🛟 Redeem means to rescue or buy back
📖 God's power to save was never in question

## 🌊 I Dry Up The Sea, I Make The Rivers A Wilderness

This recalls God drying up the Red Sea during the exodus from Egypt.

The same power that split the sea once can still act today.

Fish dying for lack of water pictures total, visible devastation.

God points back to a real historical miracle as proof of present power.

🌊 This recalls God drying up the Red Sea
💪 The same power still works today
🐟 Dying fish picture total devastation
📖 A past miracle proves present power

## 🌑 I Clothe The Heavens With Blackness

Sackcloth was a rough, dark garment worn during mourning.

Here the whole sky is pictured wearing that mourning garment.

This is poetic language for a dramatic display of God's power over creation.

Even nature itself can be dressed to show judgment or grief.

🌑 Sackcloth was a rough garment worn in mourning
🌌 The sky is pictured wearing mourning clothes
💥 This pictures a dramatic display of power
📖 Even nature can show judgment or grief

# Isaiah 50:4-7
# 👂 The Servant's Obedient Ear
---
## 📚 The Lord GOD Hath Given Me The Tongue Of The Learned

The learned here means someone trained like a disciple under a teacher.

This voice has been taught how to speak, not just given random words.

The gift is a trained tongue, shaped by careful instruction.

Every word this servant speaks comes from real preparation.

📚 The learned means someone trained like a disciple
🗣️ This voice was taught how to speak
🎓 The gift is a trained, prepared tongue
📖 Every word comes from real preparation

## 🎯 To Speak A Word In Season To Him That Is Weary

In season means timed exactly right, not early or late.

Weary describes someone tired, worn down, or discouraged.

This gift exists to comfort people at the exact moment they need it.

A well timed word can matter more than a long speech.

🎯 In season means timed exactly right
😔 Weary describes someone worn down or discouraged
🤲 This gift comforts people at the right moment
📖 A well timed word matters most

## ⏰ He Wakeneth Morning By Morning, He Wakeneth Mine Ear

Wakeneth is an old word meaning to wake up or stir into action.

This pictures a daily habit of listening before speaking.

Morning by morning shows this was not a one time event.

Good listening came first, every single day, before any word was spoken.

⏰ Wakeneth means to wake up or stir
👂 This pictures a daily habit of listening
🔁 Morning by morning shows a repeated pattern
📖 Listening came first, every day, before speaking

## 🙅 I Was Not Rebellious, Neither Turned Away Back

Rebellious means refusing to follow instruction or resisting on purpose.

This servant is described as fully obedient, without resistance.

Israel as a nation is often pictured as rebellious in scripture.

Here the servant stands in sharp contrast to that pattern.

🙅 Rebellious means refusing to follow instruction
✅ This servant is described as fully obedient
🇮🇱 Israel is often pictured as rebellious elsewhere
📖 The servant stands apart from that pattern

## 💢 I Gave My Back To The Smiters

Smiters means people who strike or beat someone physically.

This servant willingly accepted physical punishment rather than resisting it.

The willingness itself is the point, not just the suffering.

This kind of undeserved suffering later describes Jesus during His trial.

💢 Smiters means people who strike or beat
🙌 This punishment was willingly accepted, not forced
🎯 The willingness is the real point here
📖 This suffering later describes Jesus at His trial

## 😖 My Cheeks To Them That Plucked Off The Hair

Plucking out a beard or hair was a known ancient insult.

It caused public shame more than physical pain.

This act publicly marked someone as humiliated and dishonored.

The servant accepted this disgrace without pulling away.

😖 Plucking hair was a known ancient insult
👥 It caused public shame more than pain
🚫 It marked someone as humiliated and dishonored
📖 The servant accepted this disgrace freely

## 🤢 I Hid Not My Face From Shame And Spitting

Spitting on someone was a serious act of contempt in this culture.

Numbers chapter twelve describes spitting as a sign of open disgrace.

Hiding the face was the normal reaction to escape shame.

This servant faced the shame directly instead of hiding from it.

🤢 Spitting showed serious contempt in this culture
📜 Numbers twelve names spitting as open disgrace
🙈 Hiding the face was the normal reaction
📖 The servant faced shame directly instead

## 🪨 I Have Set My Face Like A Flint

Flint is an extremely hard stone that will not crack easily.

Setting the face like flint pictures firm, unshakable determination.

Confounded means humiliated or put to shame in front of others.

This confidence comes from God's help, not from personal strength alone.

🪨 Flint is an extremely hard, unbreakable stone
😤 This pictures firm, unshakable determination
😳 Confounded means humiliated in front of others
📖 This confidence comes from God's help

# Isaiah 50:8-9
# ⚖️ No One Can Condemn Me
---
## ⚖️ He Is Near That Justifieth Me

Justifieth is a courtroom word meaning to declare someone innocent.

This pictures God standing close by as a legal defender.

The servant is not facing accusation alone.

Having a defender nearby changes everything about facing an accusation.

⚖️ Justifieth means to declare someone innocent
🛡️ God is pictured as a legal defender
🤝 The servant does not face accusation alone
📖 A defender nearby changes everything

## 🗣️ Who Will Contend With Me? Let Us Stand Together

Contend is a legal word meaning to argue a case in court.

This is an open challenge to anyone who wants to accuse the servant.

Standing together pictures both sides meeting face to face in court.

Confidence like this only makes sense if the servant expects to win.

🗣️ Contend means to argue a case in court
📢 This is an open challenge to any accuser
⚔️ Standing together pictures a face to face case
📖 This confidence expects to win

## ❓ Who Is He That Shall Condemn Me?

Condemn is the opposite of justify, meaning to declare guilty.

The question expects a clear answer of no one.

Since God is the servant's helper, no accusation can succeed.

The outcome of the case was never really in doubt.

❓ Condemn means to declare someone guilty
🚫 The expected answer here is no one
🙌 God's help means no accusation can succeed
📖 The outcome was never really in doubt

## 👕 They All Shall Wax Old As A Garment

Wax old means growing old and wearing out over time.

A moth eaten garment looks fine until it suddenly falls apart.

This pictures the servant's accusers fading away and losing all their power.

What looks threatening now will not last.

👕 Wax old means growing old and wearing out
🦋 A moth eaten garment falls apart suddenly
📉 This pictures accusers losing all their power
📖 What looks threatening now will not last

# Isaiah 50:10-11
# 🔥 Trust God, Not Your Own Fire
---
## 🙏 That Feareth The LORD, That Obeyeth The Voice Of His Servant

Fearing the LORD means deep reverence and awe, not being scared of Him.

Obeying the servant's voice connects directly back to the servant described earlier.

Listening to this servant's message is treated the same as honoring God.

The two ideas are joined together on purpose in this verse.

🙏 Fearing the LORD means deep reverence, not terror
👂 Obeying the servant links back to earlier verses
🔗 Listening to the servant honors God directly
📖 These two ideas are joined on purpose

## 🌑 That Walketh In Darkness, And Hath No Light

This describes a real believer, not someone who has abandoned God.

Darkness here means confusion or hardship, not necessarily sin.

Even faithful people can walk through seasons with no clear answers.

The Bible does not pretend faith removes every hard season.

🌑 This describes a real believer, not an outsider
😕 Darkness means confusion or hardship here
🚶 Even faithful people face seasons with no answers
📖 Faith does not remove every hard season

## 🤲 Let Him Trust In The Name Of The LORD, And Stay Upon His God

Stay upon is an old phrase meaning to lean on for support.

The answer to walking in darkness is trust, not having every answer.

Trusting God's name means relying on His character, not just His actions.

This verse offers comfort before the chapter's closing warning.

🤲 Stay upon means to lean on for support
🕯️ Trust, not full understanding, is the answer
❤️ Trusting God's name means relying on His character
📖 This comforts before the closing warning

## 🔥 That Kindle A Fire, That Compass Yourselves About With Sparks

Compass here is an old word meaning to surround or gather around.

This pictures people making their own light instead of trusting God's.

Sparks and self made fires stand for human schemes and shortcuts.

The chapter now warns against the opposite of the trust just described.

🔥 Compass means to surround or gather around
💡 This pictures people making their own light
🛠️ Sparks stand for human schemes and shortcuts
📖 This warns against the opposite of trust

## 😢 Ye Shall Lie Down In Sorrow

Sorrow is the outcome of choosing a self made fire over God.

A homemade light cannot protect anyone from real trouble.

The chapter ends by placing two paths side by side.

One path leads through trust, even in darkness.

😢 Trusting a self made fire leads to sorrow
⚖️ The chapter places two paths side by side
🕯️ One path trusts God even in darkness
📖 The other trusts a spark that goes out`.trim();

export const ISAIAH_FIFTY_PERSONAL_SECTIONS = parseIsaiahFiftyRawNotes(ISAIAH_FIFTY_RAW_NOTES);
