export type PsalmsTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsTenRawNotes(rawText: string): PsalmsTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 10:${startVerse}` : `Psalms 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Psalms 10 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_TEN_RAW_NOTES = `# Psalms 10:1-2
# 😔 Where Is God In My Trouble
---
## 😔 Why Standest Thou Afar Off, O LORD

This does not mean David thinks God moved to a new place.

Afar off describes how God's help feels, not where God stands.

David is not questioning whether God exists.

He is naming real pain during a season when help has not come.

Honest questions like this show up again and again in the Psalms.

😔 Afar off describes a feeling, not a location
❓ David is not questioning God's existence
😢 He names the pain of delayed help
📖 The Psalms are full of honest questions

---

## 🙈 Why Hidest Thou Thyself In Times Of Trouble

Hidest here does not mean God is literally out of sight.

It describes the feeling that God has pulled back His comforting presence.

Times of trouble means any season of hardship, not one single crisis.

David has likely faced this feeling more than once in his life.

The rest of the psalm answers this very question David is asking now.

🙈 Hidest means felt distance, not literal hiding
🌧️ Times of trouble covers any hard season
🔁 This is not David's first hard season
📖 The rest of the psalm answers this

---

## 👑 The Wicked In His Pride Doth Persecute The Poor

Pride here means a puffed up sense of power over others.

Persecute means actively hunting someone down, not simply disliking them.

The poor describes people with no money, land, or protection of their own.

This is not one insult but an ongoing campaign against the defenseless.

The whole psalm keeps returning to this same imbalance of power.

👑 Pride means a puffed up sense of power
🏹 Persecute means actively hunting someone down
🤲 The poor means the defenseless and powerless
📖 This power imbalance runs through the psalm

---

## 🧠 Let Them Be Taken In The Devices That They Have Imagined

Devices is an old word for schemes or traps someone plans out.

Imagined here means carefully plotted, not simply daydreamed about.

David is praying that the wicked get caught in their own plan.

This same trap image returns later in the psalm.

Justice here means the trap turning back on the one who built it.

🧠 Devices means schemes or traps
📝 Imagined means carefully plotted, not dreamed
🔄 David prays their own plan catches them
📖 Justice means the trap turns on its maker

# Psalms 10:3-4
# 👑 Pride That Forgets God
---
## 🗣️ The Wicked Boasteth Of His Heart's Desire

Boasteth means bragging openly, not simply feeling proud in private.

Heart's desire here points to whatever the wicked man wants for himself.

He is not ashamed of his greed.

He announces it, almost as if daring anyone to stop him.

This open pride sets up the deeper problem named in the next line.

🗣️ Boasteth means bragging openly
🎯 Heart's desire means his own selfish wants
😤 He feels no shame in his greed
📖 His open pride leads to the next problem

---

## 🤑 Blesseth The Covetous, Whom The LORD Abhorreth

Covetous describes someone who always wants more than they have.

To bless the covetous means praising greed instead of condemning it.

Abhorreth is a strong word meaning to hate with disgust.

The wicked man praises exactly what God cannot stand.

This verse shows values completely turned upside down.

🤑 Covetous means always wanting more
👏 Blessing greed means praising it, not fighting it
🤢 Abhorreth means hating with disgust
📖 The wicked praise what God despises

---

## 😏 Through The Pride Of His Countenance

Countenance is an old word for someone's face or expression.

Pride of his countenance means his arrogance shows on his face.

This is not a hidden attitude kept quietly inside.

Anyone looking at this man could see his contempt for others.

His whole posture broadcasts the pride his heart already holds.

😏 Countenance means the face or expression
👑 His pride shows on his face
👀 This is not a hidden attitude
📖 His posture broadcasts his pride

---

## 🚫 God Is Not In All His Thoughts

This does not mean the wicked man denies that God exists.

It means God simply never factors into his daily decisions.

He plans and acts as if God is irrelevant.

This unbelief shows up in how he lives, not in what he says.

A person can claim to believe in God and still live exactly like this.

🚫 Not denial, just daily irrelevance
🗓️ God never factors into his plans
🎭 Unbelief shown in life, not words
📖 Belief can be claimed but not lived

# Psalms 10:5-6
# 🏔️ False Confidence Before The Fall
---
## ⚠️ His Ways Are Always Grievous

Grievous is an old word for harmful and destructive.

This is not describing someone who is simply annoying.

His entire pattern of life causes real damage to others.

The word always shows this is not an occasional lapse.

Harm is simply how this man consistently operates.

⚠️ Grievous means harmful, not annoying
🔁 Always shows a constant pattern
💥 His life causes real damage
📖 Harm is how he operates

---

## 👁️ Thy Judgments Are Far Above Out Of His Sight

This does not mean God's judgment does not exist.

It means the wicked man refuses to think about it.

He keeps God's coming judgment far from his mind on purpose.

Willful blindness lets him keep sinning without feeling any weight.

Ignoring judgment is not the same as escaping it.

👁️ Judgment exists, he just ignores it
🙈 He keeps it far from his mind
🪶 Ignoring guilt lets him sin freely
📖 Ignoring judgment does not escape it

---

## 😤 He Puffeth At His Enemies

Puffeth means to scoff or blow air out in contempt.

Picture someone rolling their eyes and snorting at a threat.

His enemies are not people he fears at all.

He treats every warning and every rival as beneath him.

This same overconfidence sets up his fall later in the psalm.

😤 Puffeth means scoffing in contempt
🙄 Pictures someone sneering at a threat
😎 He fears no one around him
📖 This overconfidence leads to his fall

---

## 🏔️ I Shall Not Be Moved, For I Shall Never Be In Adversity

Moved here means shaken, toppled, or brought down.

Adversity is an old word for hardship or serious trouble.

The wicked man has convinced himself trouble will never touch him.

He has said this in his heart, meaning it shapes how he actually lives.

This false confidence is about to be answered directly by God's own words.

🏔️ Moved means shaken or toppled
🌪️ Adversity means serious hardship
😌 He believes trouble will never come
📖 God will answer this false confidence

# Psalms 10:7-8
# 🗯️ A Mouth Full Of Deceit
---
## 🗯️ His Mouth Is Full Of Cursing And Deceit And Fraud

Cursing here means calling harm down on other people.

Deceit means lying in a way meant to trap someone.

Fraud means cheating people out of what belongs to them.

These three sins work together, not separately.

Everything that comes out of his mouth serves to hurt someone else.

🗯️ Cursing means calling down harm
🎭 Deceit means calculated lying
💰 Fraud means cheating others
📖 His speech exists to hurt people

---

## 👅 Under His Tongue Is Mischief And Vanity

Under his tongue pictures what a person really means to say.

Mischief here means real harm being planned, not a harmless prank.

Vanity means emptiness, something worthless dressed up to sound fine.

His public words hide a private plan to hurt someone.

What sits under the tongue always comes out eventually.

👅 Under the tongue means hidden intent
⚠️ Mischief means real planned harm
🎈 Vanity means empty, worthless words
📖 Hidden intent always comes out eventually

---

## 🕵️ He Sitteth In The Lurking Places Of The Villages

Lurking places were hidden spots where someone waited to attack.

Villages in this culture were often small and unwalled.

Unwalled villages left ordinary people with little protection from robbers.

This man chooses easy, defenseless targets on purpose.

He hunts the weak instead of fighting anyone his equal.

🕵️ Lurking places were hidden ambush spots
🏘️ Villages had little wall protection
🎯 He chooses easy, defenseless targets
📖 He hunts the weak, not equals

---

## 🤫 His Eyes Are Privily Set Against The Poor

Privily is an old word for secretly or in a hidden way.

His eyes are set means he is deliberately watching and choosing a target.

This is not a random crime committed in a moment of anger.

He studies the poor ahead of time, planning exactly who to hurt.

Calculated cruelty is its own kind of evil.

🤫 Privily means secretly, in hiding
👀 His eyes are set means deliberate targeting
🗓️ This crime is planned, not random
📖 Calculated cruelty is its own evil

# Psalms 10:9-10
# 🦁 Hunting The Poor Like Prey
---
## 🦁 He Lieth In Wait Secretly As A Lion In His Den

Lieth in wait means waiting patiently to attack without warning.

Lions in this region hunted by hiding near water or a trail.

The lion does not chase its prey across open ground.

It waits until the prey walks close enough to catch easily.

This wicked man hunts people the exact same patient way.

🦁 Lions hunted by hiding, not chasing
💧 They waited near water or a trail
⏳ Patience made the ambush work
📖 This man hunts people the same way

---

## 🕸️ He Doth Catch The Poor, When He Draweth Him Into His Net

A net here is a hunting tool spread to snare an animal.

This verse repeats the idea of catching the poor two times in a row.

Hebrew poetry often repeats an idea to make it land harder.

Draweth into his net pictures someone slowly pulled toward a trap.

The victim often does not realize danger until it is too late.

🕸️ A net was a hunting trap
🔁 Repetition here adds weight to the idea
🪤 Draweth into means slowly pulled toward danger
📖 The victim often sees it too late

---

## 🐆 He Croucheth, And Humbleth Himself

This humbling is not real humility at all.

Croucheth pictures a predator lowering its body before it strikes.

Humbleth himself here means crouching low and appearing harmless on purpose.

It is a disguise, not a change of heart.

This wicked man plays weak so his victims stay off guard.

🐆 Croucheth pictures a predator crouching low
🎭 Humbleth himself here means a disguise
🚫 This is not real humility
📖 He plays weak to catch his victims

---

## 💪 That The Poor May Fall By His Strong Ones

Strong ones does not mean this man's own muscles.

It likely points to the power or people he commands.

Fall here means the poor are overwhelmed and defeated.

This is not a fair, equal confrontation.

Power imbalance is the whole engine behind this attack.

💪 Strong ones means his power or allies
⚖️ Fall means being overwhelmed, not tricked
🚫 Not a fair, equal confrontation
📖 Power imbalance drives this whole attack

# Psalms 10:11-12
# 🙏 Arise, O Lord
---
## 🗣️ God Hath Forgotten, He Hideth His Face

This is what the wicked man tells himself, not a true fact about God.

He assumes silence from God means God stopped watching completely.

Hideth his face pictures a judge turned away from a case.

This is the very same complaint David raised back in verse one.

The wicked man and David ask the same question for very different reasons.

🗣️ This is the wicked man's own lie
🙈 He assumes silence means God stopped watching
⚖️ Hideth his face pictures a turned away judge
📖 This echoes David's own question in verse one

---

## 🔑 He Will Never See It

This is the belief that fuels every crime in this psalm.

The wicked man is not simply careless.

He is confident that cruelty carries no cost.

That confidence is exactly what the rest of the psalm answers.

A lie this comfortable is about to meet reality.

🔑 This belief fuels his whole pattern
😌 He is confident, not careless
🚫 He believes cruelty has no cost
📖 The psalm now answers this belief

---

## ⚔️ Arise, O LORD, O God, Lift Up Thine Hand

Arise was a common battle cry calling a warrior to stand and act.

David uses it here as a direct summons for God to step in.

Lift up thine hand pictures a raised hand ready to strike or judge.

Both phrases are urgent requests, not polite suggestions.

David wants action now, not a promise for later.

⚔️ Arise was a call to act now
📣 David summons God directly
✋ Lift up thine hand pictures readiness to judge
📖 This is urgent, not a gentle request

---

## 🔁 Forget Not The Humble

Forget not directly answers the wicked man's claim in verse eleven.

The wicked man said God hath forgotten.

David turns that exact lie into his own prayer.

The humble here means the same poor and oppressed named earlier.

David is asking God to prove the wicked man wrong.

🔁 This directly answers verse eleven's lie
🗣️ The wicked claimed God had forgotten
🙏 David turns the lie into a prayer
📖 He asks God to prove the lie wrong

# Psalms 10:13-14
# ⚖️ God Has Seen It
---
## 😠 Wherefore Doth The Wicked Contemn God

Contemn is a strong word for treating someone with open contempt.

This is more than simple doubt.

It is active disrespect aimed at God himself.

Wherefore here simply means why or for what reason.

The question itself is really a plea for God to respond.

😠 Contemn means open, active contempt
❓ More than doubt, real disrespect
🗣️ Wherefore means why or for what reason
📖 The question is really a plea

---

## ⚖️ Thou Wilt Not Require It

Require here is a legal word meaning to demand an answer for something.

The wicked man believes he will never be called to account.

This is the same confidence named back in verse six.

He treats God's patience as proof God will not act.

Patience and permission are not the same thing.

⚖️ Require means to demand an answer
📜 A legal word for accountability
😌 He mistakes patience for permission
📖 Patience is not the same as permission

---

## 👁️ Thou Hast Seen It, For Thou Beholdest Mischief And Spite

This verse directly answers the wicked man's claim from two verses earlier.

He said God would never see it.

David states plainly that God already has.

Beholdest means watching closely, not glancing by accident.

Spite here names the cruel intent behind the mischief already described.

👁️ Directly answers the wicked man's claim
🗣️ He said God would never see
✅ David says God already has
📖 Beholdest means watching closely on purpose

---

## 🤲 The Poor Committeth Himself Unto Thee, Thou Art The Helper Of The Fatherless

Committeth means placing full trust into someone else's hands.

The poor person has no other real protector to turn to.

Fatherless in this culture named a whole class of the most vulnerable.

Without a father, a person often lost land, protection, and legal standing.

God is named here as the protector that culture could not always provide.

🤲 Committeth means placing full trust
🛡️ The poor has no other protector
👶 Fatherless meant utterly vulnerable in this culture
📖 God is the protector culture could not give

# Psalms 10:15-16
# 🏰 The King Who Never Falls
---
## 💪 Break Thou The Arm Of The Wicked

Arm in this culture was a common picture for strength and power.

Breaking someone's arm meant ending their ability to cause harm.

This is not a request for random violence.

David is asking God to remove the wicked man's power to hurt others.

Stopping the harm matters more here than punishing the person.

💪 Arm pictures strength and power
🚫 Breaking it means removing his power to harm
🎯 Not random violence, a specific request
📖 Stopping harm matters most here

---

## 🔍 Seek Out His Wickedness Till Thou Find None

This prayer asks for complete justice, not a partial fix.

Seek out pictures a thorough search, leaving nothing missed.

David wants every trace of this wickedness gone.

This is a bold request, but it matches everything just described.

A partial ending would leave the poor exposed all over again.

🔍 Seek out means a thorough search
🧹 David wants wickedness completely gone
💪 A bold but fitting request
📖 A partial fix would not be enough

---

## 👑 The LORD Is King For Ever And Ever

This verse answers the psalm's opening question with confidence.

David asked why God stood far off.

Here he declares that God's rule never actually stopped.

For ever and ever means a kingship with no end and no rival.

This confidence stands in direct contrast to the wicked man's temporary power.

👑 God's kingship never actually stopped
❓ This answers the psalm's opening question
♾️ For ever and ever means no end
📖 Contrasts God's rule with the wicked man's power

---

## 🌍 The Heathen Are Perished Out Of His Land

Heathen described nations that lived outside God's covenant people.

His land points to the land God had promised and claimed as his own.

Perished here means these nations are removed from that land completely.

This is more than a military outcome.

It is a statement about who truly owns the land.

🌍 Heathen meant nations outside the covenant
🗺️ His land is the land God claimed
🚫 Perished means completely removed
📖 The land belongs to God, not conquerors

# Psalms 10:17-18
# 📢 Justice For The Fatherless
---
## 👂 Thou Hast Heard The Desire Of The Humble

This verse directly answers the prayer David prayed back in verse twelve.

Heard here means more than simply hearing sound.

It means God actually responded to what was asked.

The humble are the same poor and oppressed named throughout the psalm.

The plea from the opening verses has finally been answered.

👂 Heard means an answered prayer, not just sound
🔁 This answers David's plea in verse twelve
🤲 The humble means the poor and oppressed
📖 The opening plea is finally answered

---

## 🛠️ Thou Wilt Prepare Their Heart

Prepare here does not mean simply making plans.

It means steadying and strengthening a heart that has been afraid.

David trusts God to settle fear before real relief even arrives.

This is comfort that starts on the inside first.

A steady heart can wait even while the danger is not yet gone.

🛠️ Prepare means steadying, not planning
❤️ God settles fear before relief arrives
🏠 Comfort starts on the inside first
📖 A steady heart can wait for the rest

---

## 👶 To Judge The Fatherless And The Oppressed

This directly returns to the fatherless named earlier in the psalm.

Judge here means actively ruling in their favor.

The oppressed describes anyone crushed under someone else's power.

This is the same group the wicked man hunted throughout the psalm.

God's justice reaches exactly the people who needed it most.

👶 Returns to the fatherless from earlier
⚖️ Judge means ruling in their favor
😣 The oppressed means the crushed and powerless
📖 God's justice reaches those who needed it

---

## 🧍 That The Man Of The Earth May No More Oppress

Man of the earth is a plain way of naming an ordinary mortal.

This title stands in sharp contrast to the LORD, King for ever and ever.

No matter how much power a person gains, they remain simply a man.

The psalm closes with human cruelty finally brought to an end.

What began with a painful question ends with settled confidence in God.

🧍 Man of the earth means a mere mortal
👑 Contrasts human power with God's eternal rule
🛑 Human cruelty is finally stopped
📖 The psalm ends where it began, with confidence
`.trim();

export const PSALMS_TEN_PERSONAL_SECTIONS = parsePsalmsTenRawNotes(PSALMS_TEN_RAW_NOTES);
