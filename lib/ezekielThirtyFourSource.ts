export type EzekielThirtyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielThirtyFourRawNotes(rawText: string): EzekielThirtyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielThirtyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+34:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 34 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+34:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+34:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 34 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 34,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 34:${startVerse}` : `Ezekiel 34:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Ezekiel 34 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_THIRTY_FOUR_RAW_NOTES = `# Ezekiel 34:1-4
# 👨‍🌾 Shepherds Who Feed Themselves
---
## 👑 Shepherds Of Israel

"Shepherds" does not mean real sheepherders here.

It means the kings and leaders who ran Israel.

Leading people was often pictured as tending a flock.

A true shepherd protects and feeds the sheep.

Everything that follows measures these leaders against that picture.

👑 Shepherds means Israel's kings and leaders
🐑 Leading people was pictured as tending sheep
🔄 A true shepherd protects and feeds
📖 Everything below measures them against that picture

## ❓ Should Not The Shepherds Feed The Flocks

This question answers itself.

Of course shepherds exist to feed the flock.

Verse two already named the problem before asking it.

These shepherds fed themselves instead of the sheep.

❓ The question answers itself plainly
🐑 Shepherds exist to feed the flock
🍽️ Feeding themselves was the opposite job
➡️ The failure is named before it is asked

## 🍖 Ye Eat The Fat, And Ye Clothe You With The Wool

Eating the fat and wearing the wool means living off the flock entirely.

Fat was the richest part of the meat.

Wool was valuable clothing material taken right from the sheep.

A real shepherd would eat and dress using his own resources.

These leaders took everything the sheep had instead.

🍖 Fat means the richest part of meat
🧶 Wool was valuable clothing material
🐑 Taken directly from the flock itself
📖 They lived off the sheep entirely

## 🔪 Ye Kill Them That Are Fed

"Them that are fed" means sheep fattened up for slaughter.

These leaders kept the best animals only to eat them.

They never actually tended the rest of the flock.

Feeding the flock and feeding on the flock are not the same thing.

That difference is the whole indictment of this chapter.

🍽️ Fed means animals fattened to eat
🔪 Leaders ate the best, skipped the rest
⚖️ Feeding the flock differs from feeding on it
📖 That difference drives this whole chapter

## 🩹 The Diseased Have Ye Not Strengthened

Verse four lists five specific failures in a row.

Strengthening the sick, healing the hurt, binding up the broken.

Bringing back the strayed, and seeking the lost.

None of these shepherds did a single one of those jobs.

Every basic duty of a real shepherd was ignored.

📋 Five failures named in a row
🩹 Every real shepherd duty is named
🚫 Not one job was actually done
📖 Neglect here is total, not partial

## ⚔️ With Force And With Cruelty Have Ye Ruled Them

Ruling here does not mean fair leadership.

Force and cruelty describe how these shepherds controlled the flock.

A real shepherd leads gently, the way the sheep need.

These leaders used fear and pain to keep control instead.

⚔️ Force and cruelty describe their rule
🐑 Gentle leading was never their method
😨 Fear and pain kept the flock controlled
📖 Power without care turns into abuse

# Ezekiel 34:5-10
# 🐺 Scattered And Unprotected
---
## 🍖 They Became Meat To All The Beasts Of The Field

Meat here means food, not a modern butcher's cut.

Scattered sheep with no shepherd became easy prey for wild animals.

This is the direct result of leaders who would not protect them.

🍖 Meat here simply means food or prey
🐺 Scattered sheep became easy targets
📉 Neglect at the top caused real danger
📖 No shepherd meant no protection at all

## 🗻 None Did Search Or Seek After Them

My sheep wandered across every mountain and hill.

That is a whole countryside, not one small patch.

Nobody in charge went looking for them.

Being lost did not even register as a problem worth noticing.

🗻 Lost across a whole countryside
🔍 Nobody in charge went looking
😶 Being lost registered as no problem
📖 Losing the flock did not even bother them

## 🔁 Hear The Word Of The LORD

This command repeats twice in just three verses.

Verse seven says it once, verse nine repeats it again.

Repetition in Hebrew speech usually signals urgency or weight.

God is demanding full attention before announcing judgment.

🔁 The command repeats twice quickly
📢 Hebrew repetition signals urgency
⚖️ Judgment is about to be announced
📖 God demands attention before speaking it

## 🙏 As I Live, Saith The Lord GOD

This phrase is a solemn oath formula God uses often in Ezekiel.

It means God is swearing by His own eternal life.

There is no higher authority for God to swear by.

What follows this phrase always carries complete certainty.

🙏 This phrase is a solemn oath
♾️ God swears by His own life
🔒 No higher authority exists for Him
📖 What follows is completely certain

## ⚖️ I Will Require My Flock At Their Hand

To require something at someone's hand means to hold them accountable for it.

This exact phrase was already explained back in chapter thirty three.

There God used it for a watchman's silence.

Here God uses it for a shepherd's neglect.

⚖️ Require at their hand means hold accountable
🔁 Chapter thirty three used this same phrase
👁️ There it was about a watchman's silence
📖 Here it is about a shepherd's neglect

## 🦷 I Will Deliver My Flock From Their Mouth

Mouth here pictures the shepherds devouring the flock like predators.

God promises to physically remove the sheep from that danger.

These leaders will no longer get to feed on their own people.

🦷 Mouth pictures the shepherds as predators
🛑 God removes the sheep from that danger
🚫 They will no longer feed on the people
📖 Rescue comes from the shepherds themselves

# Ezekiel 34:11-16
# 🧑‍🌾 I Myself Will Search My Sheep
---
## 🙋 Behold, I, Even I, Will Both Search My Sheep

God repeats "I" twice in a row here.

That repetition makes the contrast with the failed shepherds sharp.

They would not search for the flock.

God Himself steps in to do exactly that.

🙋 I, even I, repeats for emphasis
🔄 This contrasts with the failed shepherds
🔍 They refused to search for the flock
📖 God steps in to do it Himself

## ⛈️ In The Cloudy And Dark Day

A cloudy and dark day is an old way of describing disaster.

It pictures a storm blotting out the light.

This is the day the flock was scattered into exile.

God promises rescue during the worst of that storm, not after it quietly passes.

⛈️ Cloudy and dark day means disaster
🌑 It pictures light blotted out
🏃 This was the day of scattering
📖 Rescue comes during the storm itself

## 🌍 I Will Bring Them Out From The People

The people and the countries refer to the nations holding Israel in exile.

God promises to physically gather them out from among those nations.

This points forward to a real return to their own land.

The mountains of Israel were their homeland, not just any place.

🌍 The people means the nations of exile
🏠 God promises a real return home
🗺️ Mountains of Israel means their actual homeland
📖 This points to a literal return

## 🏡 Upon The High Mountains Of Israel Shall Their Fold Be

A fold is a fenced enclosure where a flock rests safely at night.

God promises a good fold on the best, highest ground.

A fat pasture means rich, plentiful grazing land.

This reverses every hardship named earlier in the chapter.

🏡 Fold means a safe fenced enclosure
⛰️ The best, highest ground is promised
🌾 Fat pasture means rich grazing land
📖 This reverses the earlier hardship

## 🐑 I Will Feed My Flock, And I Will Cause Them To Lie Down

God now uses the exact verb the failed shepherds ignored, feed.

Lying down safely only happens when nothing threatens the flock.

This single verse answers the whole indictment from the start of the chapter.

God is not sending a new shepherd yet here, He is acting directly Himself.

🐑 Feed is the exact verb they ignored
😌 Lying down means nothing threatens them
⚖️ This answers the chapter's opening complaint
📖 God acts directly, not through another yet

## 🚫 I Will Destroy The Fat And The Strong

This does not mean every healthy sheep gets punished.

Fat and strong here points toward verses seventeen through twenty two.

There, strong sheep are shown pushing weaker ones out of the best pasture.

God cares for the weak and disciplines the ones who take advantage.

🚫 Not every healthy sheep is meant
➡️ This points toward verses seventeen to twenty two
💪 Strong sheep push out the weak there
📖 God disciplines those who take advantage

# Ezekiel 34:17-19
# 🐐 Judgment Between Sheep And Sheep
---
## 🔄 I Judge Between Cattle And Cattle

The target of God's judgment shifts here from the shepherds to the flock.

Rams and he goats were the strongest, most dominant animals in a herd.

God is now addressing bullying within the flock itself, not just bad leadership.

Even victims of bad leadership can still mistreat each other.

🔄 Judgment shifts from leaders to the flock
🐏 Rams and goats were the dominant animals
😤 This targets bullying inside the flock
📖 Victims can still mistreat each other

## ❓ Seemeth It A Small Thing Unto You

This phrase means, is this not already bad enough.

The strong sheep ate the best pasture first.

Then they trampled what was left.

Nobody else could use it after that.

Taking enough was one thing.

Ruining what remained was worse.

❓ Seemeth small means is this not enough
🌾 They ate the best pasture first
👣 Then they trampled what remained
📖 Greed was not satisfied, it spread

## 💧 They Eat That Which Ye Have Trodden

The weak sheep get stuck eating and drinking the leftovers.

Trampled grass and muddied water are worse than nothing good.

The strong were never punished directly for this before now.

Here God finally names the damage done to the ones left behind.

🐑 Weak sheep get only the leftovers
👣 Trampled grass is worse than none
💧 Muddied water was all that remained
📖 God names the damage to the weak

# Ezekiel 34:20-24
# 👑 One Shepherd, My Servant David
---
## 🐏 Thrust With Side And With Shoulder

Thrusting with side and shoulder pictures bigger animals shoving weaker ones aside.

Pushing with horns adds a direct, violent edge to that picture.

This is bullying described in plain physical terms, not a vague complaint.

The weakest and sickest animals were driven completely out of the flock.

🐏 Side and shoulder means physical shoving
🤕 Horns add real violence to the picture
😤 This describes bullying in plain terms
📖 The weakest were driven out completely

## 🔁 They Shall No More Be A Prey

Prey was the exact word used back in verse eight for outside danger.

Now the danger being removed comes from inside the flock itself.

God promises protection from both kinds of threat.

Safety was never going to come from the flock managing itself.

🔁 Prey repeats the word from verse eight
🐑 Now the threat comes from inside
🛡️ God protects against both kinds of danger
📖 The flock could not fix itself

## 👑 I Will Set Up One Shepherd Over Them

David had already died long before Ezekiel wrote this.

This points forward to a future ruler from David's family line.

The New Testament identifies Jesus as this promised shepherd king.

One faithful shepherd finally replaces the many failed ones named earlier.

👑 David here means a future ruler
🌳 He comes from David's own family line
✝️ The New Testament names Jesus this way
📖 One faithful shepherd replaces the failed many

## 🔂 He Shall Feed Them, And He Shall Be Their Shepherd

Feeding and shepherding repeat together twice in one short verse.

That repetition finally answers the complaint from the very first verse of the chapter.

This shepherd will not feed himself at the flock's expense.

He will do the job the first shepherds completely refused to do.

🔂 Feed and shepherd repeat together twice
⚖️ This answers the chapter's opening complaint
🚫 He will not feed himself instead
📖 He does the job the others refused

## 🤝 My Servant David A Prince Among Them

Prince here is a careful word choice, not king.

God remains the true King over His people in this picture.

David's descendant rules under God, not in God's place.

That order protects the promise from ever becoming idol worship of a ruler.

👑 Prince is used, not king, on purpose
🙏 God remains the true King here
🤝 David's line rules under God
📖 This protects the promise from idolatry

# Ezekiel 34:25-27
# 🕊️ A Covenant Of Peace
---
## 🤝 A Covenant Of Peace

A covenant of peace is a binding promise of safety, not a passing feeling.

Evil beasts ceasing means real physical danger will actually stop.

Sleeping safely in the woods pictures total, relaxed security.

This is the opposite of the scattered, hunted life described earlier in the chapter.

🤝 A covenant is a binding promise
🐺 Evil beasts ceasing means real danger stops
😌 Sleeping in the woods pictures full security
📖 This reverses the scattered, hunted life

## 🌧️ Showers Of Blessing

Rain in its proper season decided whether a whole year's crops survived.

Calling rain a shower of blessing ties ordinary weather to God's favor directly.

This was not poetic decoration to the original audience.

Their next meal genuinely depended on this exact promise.

🌧️ Rain in season decided the harvest
🙏 This ties weather to God's own favor
🍞 Their next meal depended on this
📖 An everyday promise, not poetic decoration

## 🪵 I Have Broken The Bands Of Their Yoke

A yoke was a heavy wooden frame forcing an animal to pull a load.

Using it for people pictures forced labor under a harsh master.

Breaking its bands means that forced labor is finally over.

Verse twenty seven ties this freedom directly to finally knowing God as LORD.

🪵 A yoke was a frame for forced work
⛓️ Bands means what held the yoke on
🔓 Breaking it means the labor ends
📖 Freedom here leads to knowing God

# Ezekiel 34:28-31
# 🌿 My Flock, My People
---
## 🚫 None Shall Make Them Afraid

This closes out every fear named across the whole chapter.

No more prey to outside nations.

No more danger from wild beasts.

No more bullying from inside the flock itself.

Total safety finally replaces every threat named earlier.

🚫 Outside nations can no longer prey on them
🐺 Wild animals no longer threaten them
🐑 Inside bullying is also finished
📖 Total safety replaces every earlier threat

## 🌱 A Plant Of Renown

A plant of renown means a planting that becomes famous for how well it grows.

It is a picture of restored, abundant land, not an actual single plant.

Hunger and shame get named together here on purpose.

Being conquered brought both physical hunger and public humiliation among the nations.

🌱 A famous, thriving planting is pictured
🍞 It pictures restored, abundant land
😔 Hunger and shame are named together
📖 Both are reversed by this one promise

## 🔁 Then Shall They Know That I The LORD Their God Am With Them

This exact phrase has repeated many times across the whole book of Ezekiel.

Knowing God here means far more than believing a fact about Him.

It means experiencing His presence and protection firsthand.

Restoration, not just punishment, finally teaches that lesson completely.

🔁 This phrase repeats often in Ezekiel
🧠 Knowing God means more than believing a fact
🤝 It means experiencing His presence firsthand
📖 Restoration teaches this as much as judgment

## 👥 Ye My Flock, The Flock Of My Pasture, Are Men

This does not mean Israel is literally a herd of animals.

The whole chapter is a sustained picture explaining something about real people.

Calling them men here breaks that picture open on purpose.

The sheep language was always about how God cares for His actual people.

🐑 The flock imagery was always a picture
👥 Men confirms these are real people
💡 The picture breaks open on purpose
📖 It always described how God cares for them
`.trim();

export const EZEKIEL_THIRTY_FOUR_PERSONAL_SECTIONS = parseEzekielThirtyFourRawNotes(EZEKIEL_THIRTY_FOUR_RAW_NOTES);
