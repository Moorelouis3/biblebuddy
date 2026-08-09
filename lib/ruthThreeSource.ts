export type RuthThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRuthThreeRawNotes(rawText: string): RuthThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RuthThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ruth\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ruth 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ruth\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Ruth\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ruth 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ruth 3:${startVerse}` : `Ruth 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Ruth 3 sections, received " + sections.length);
  }

  return sections;
}

const RUTH_THREE_RAW_NOTES = `# Ruth 3:1-5
# 🛌 Naomi's Bold Plan
---
## 🛌 Shall I Not Seek Rest For Thee

Rest here does not mean a short nap or a break from chores.

It means a permanent home, a husband, and lasting security.

Naomi wants Ruth settled for the rest of her life.

This is the first time Naomi plans a real future for Ruth.

🛌 Rest means a permanent home

🏠 Naomi wants Ruth truly settled

📆 This looks past mere survival

📖 Naomi begins planning Ruth's future

## 👪 Is Not Boaz Of Our Kindred

Kindred means Boaz belongs to Elimelech's extended family line.

Naomi already introduced this connection back in chapter two.

That family tie gives Boaz a real duty toward Ruth.

Naomi is about to call on that very duty.

👪 Kindred means Boaz's family line

🔁 This connection appeared in chapter two

⚖️ Family ties carried real legal duty

📖 Naomi is calling on that duty

## 🌬️ He Winnoweth Barley Tonight In The Threshingfloor

To winnow means tossing cut grain into the air.

The wind carries off the light husks and leaves the heavier grain behind.

The threshingfloor was a flat, open area outside town used for this work.

Farmers often slept there overnight to guard the grain from thieves.

Naomi knows exactly where Boaz will be tonight because of this custom.

🌬️ Winnow means separating grain from husks

🌾 The threshingfloor was an open outdoor site

😴 Farmers guarded grain there overnight

📖 Naomi knows exactly where to find Boaz

## 🧴 Wash Thyself, And Anoint Thee, And Put Thy Raiment Upon Thee

Anoint here means rubbing on scented oil, much like modern perfume.

Raiment simply means her best clothes, not a disguise.

She had likely worn the plain clothing of a widow in mourning since chapter one.

Naomi tells her to step out of mourning now.

This moment marks a real turning point after so much loss.

🧴 Anoint means rubbing on scented oil

👗 Raiment means her best clothing

🖤 She had dressed as a mourning widow

📖 Ruth steps out of grief and forward

## 🤫 Make Not Thyself Known Unto The Man

Naomi tells Ruth to stay hidden until Boaz finishes eating.

This is not about tricking him in the dark.

Waiting until he was relaxed was simply the right moment.

Approaching too early could have caused a scene in front of the other workers.

🤫 Ruth waits to stay unnoticed

🍽️ She waits until his meal ends

⏳ Timing mattered for this approach

📖 Patience protected the moment's dignity

## 👀 Thou Shalt Mark The Place Where He Shall Lie

Naomi tells Ruth to quietly note where Boaz lies down.

Workers often slept in different spots along the grain pile.

Ruth needed to find him precisely, in the dark, without waking anyone.

Every detail of this plan depended on her close attention.

👀 Ruth must note his exact spot

🌌 Workers slept scattered near the grain

🤐 She must move without waking others

📖 The plan required careful attention

## 🦶 Uncover His Feet, And Lay Thee Down

This does not describe anything indecent or shameful.

Uncovering someone's feet and lying nearby was a customary request for protection.

It was Ruth's way of formally asking Boaz to act as her kinsman redeemer.

Naomi is coaching Ruth through a real legal custom of that culture.

🦶 Uncovering feet was a customary request

🛡️ It asked Boaz for protection

⚖️ It called on his kinsman duty

📖 This act had a real legal meaning

## 🤝 All That Thou Sayest Unto Me I Will Do

Ruth answers with total trust, no questions asked.

This is the same complete loyalty she showed leaving Moab for Naomi.

She trusts this plan completely.

It still risks her own reputation.

That steady faithfulness has carried Ruth through this whole book.

🤝 Ruth trusts the plan completely

🔁 This echoes her loyalty from chapter one

⚠️ She risks her own reputation here

📖 Faithfulness has carried her whole story

# Ruth 3:6-9
# 🌙 Ruth At The Threshing Floor
---
## ✅ Did According To All That Her Mother In Law Bade Her

Ruth follows Naomi's plan exactly, step by step.

She does not change or soften what she was told.

That same obedience defined her choice to follow Naomi out of Moab.

Her trust in Naomi has never wavered through this whole book.

✅ Ruth follows the plan exactly

🔁 This matches her loyalty from chapter one

💪 Her obedience never wavers here

📖 Trust in Naomi has stayed constant

## 😊 His Heart Was Merry

Merry here means content and relaxed, not drunk or out of control.

Finishing a good harvest and a good meal put Boaz at ease.

This detail explains why he fell soundly asleep.

It also explains why he never noticed Ruth approach.

😊 Merry means calm and content

🌾 A good harvest put him at ease

😴 He fell into a deep sleep

📖 That calm let Ruth approach unseen

## 🌾 He Went To Lie Down At The End Of The Heap Of Corn

Landowners and workers often slept beside the threshed grain overnight.

That grain represented an entire season of hard work.

Sleeping next to it kept thieves from stealing the harvest in the dark.

Boaz was simply doing his normal duty that night.

🌾 Grain piles needed overnight guarding

💰 It represented months of food

🌙 Boaz slept there as normal duty

📖 Ruth approached during an ordinary night

## 🤫 She Came Softly, And Uncovered His Feet, And Laid Her Down

Ruth carries out Naomi's exact instructions from earlier.

Softly means quietly, careful not to wake anyone nearby.

Every step of this moment required real courage.

She was placing her whole future in one honest man's hands.

🤫 Ruth moves quietly and carefully

📋 She follows Naomi's plan precisely

💪 The moment required real courage

📖 Her future rested on this act

## 🌙 The Man Was Afraid, And Turned Himself

Midnight was the middle of the night, the darkest hour.

Boaz wakes suddenly to find someone lying at his feet.

His fear is a natural reaction, not suspicion of wrongdoing.

He has no idea yet who this person even is.

🌙 Midnight means the darkest hour

😨 Boaz wakes to a surprise

❓ He does not yet know who

📖 His fear is simply natural

## 👘 Spread Therefore Thy Skirt Over Thine Handmaid

Skirt here means the edge of a garment, not clothing worn only by women.

Spreading a skirt over someone was an old way of asking for marriage.

Boaz used almost this same picture back in chapter two.

There he described Ruth taking refuge under God's wings.

Ruth is now asking Boaz to become that shelter himself.

👘 Skirt means the edge of a garment

💍 Spreading it was a marriage request

🐦 It echoes Boaz's wing language earlier

📖 Ruth asks Boaz to be that shelter

## ⚖️ For Thou Art A Near Kinsman

Ruth names Boaz's legal role directly instead of hinting.

A near kinsman could redeem land and marry a widow.

This role protected a family's name and property.

This is a bold, direct request from a woman with almost nothing.

⚖️ Near kinsman names his legal role

🛡️ That role could protect a widow

💪 Ruth asks boldly and directly

📖 Her courage matches the request

# Ruth 3:10-13
# 🙏 Boaz's Response
---
## 🙏 Blessed Be Thou Of The LORD, My Daughter

Boaz responds with a blessing instead of any suspicion.

My daughter reflects real respect, not romantic language.

It likely points to an age gap between them.

He treats Ruth's bold request with honor.

He does not answer with surprise or judgment.

His response sets the tone for the rest of this scene.

🙏 Boaz answers with a blessing

👴 My daughter suggests an age gap

🤝 He treats her request with honor

📖 His tone shapes the rest of the scene

## 📢 Thou Hast Shewed More Kindness In The Latter End Than At The Beginning

Shewed is an old spelling of showed.

Boaz compares Ruth's loyalty now to her loyalty when she first followed Naomi.

He says this second act of loyalty matters even more than the first.

Ruth had every reason to move on with her own life by now.

She did not take that easier path.

📢 Shewed means showed

🔁 Boaz compares her loyalty over time

💛 Her second act of loyalty stands out

📖 She still chose family over herself

## 👀 Thou Followedst Not Young Men, Whether Poor Or Rich

This does not mean Ruth had no other chances to remarry.

Boaz says she could have chosen a younger husband for herself.

She could have picked someone rich or poor.

Instead she came here tonight asking Boaz to help Naomi's family.

Her choice puts family loyalty ahead of her own comfort.

👀 Ruth had other options available

💍 She could have chosen a younger man

👪 She chose family duty instead

📖 Loyalty outweighed her own comfort

## 👑 All The City Of My People Doth Know That Thou Art A Virtuous Woman

Virtuous here means honorable, capable, and trustworthy.

It means far more than simply being polite.

Boaz says her reputation is already known all through Bethlehem.

That reputation was built through hard work and loyal care for Naomi.

A small town like Bethlehem noticed exactly who Ruth really was.

👑 Virtuous means honorable and trustworthy

🏘️ Her reputation was known citywide

💪 Hard work built that reputation

📖 A small town saw her true character

## 📜 There Is A Kinsman Nearer Than I

Israelite law gave the closest living relative the first right to redeem.

Boaz admits someone else in the family has that closer claim.

This complication was unknown to Ruth or Naomi until now.

It sets up the legal drama that fills the next chapter.

📜 Closest relatives held first legal right

👨‍👩‍👦 Boaz names a nearer kinsman

❓ Ruth did not know this before

📖 This sets up chapter four's drama

## ⚖️ Let Him Do The Kinsman's Part

Boaz lays out a clear and fair legal process.

He does not simply claim Ruth for himself.

The nearer kinsman gets the first real opportunity to redeem the land.

Boaz respects the legal order first.

He still clearly wants to help Ruth.

His integrity shows just as much here as his kindness did in chapter two.

⚖️ Boaz follows the correct legal order

👥 The nearer kinsman gets first choice

🙏 He respects the law over his wishes

📖 His integrity matches his kindness

## 🙏 As The LORD Liveth

This phrase was a solemn oath, calling on God as a witness.

It was not tossed around in ordinary conversation.

Boaz promises that one way or another, Ruth will be provided for.

He backs that promise with the most serious vow of that culture.

🙏 The phrase was a solemn oath

👁️ God witnesses this kind of promise

🤝 Boaz vows to provide for her

📖 He backs his word with full seriousness

# Ruth 3:14-15
# 🌅 Before Sunrise
---
## 🌄 She Rose Up Before One Could Know Another

This phrase describes the hour just before dawn.

Faces were still too hard to recognize clearly.

Ruth leaves the threshingfloor before sunrise.

It is still dark enough to keep her unseen.

That timing kept anyone passing by from recognizing her.

Both Ruth and Boaz protect her reputation together.

🌄 The phrase means just before dawn

🌫️ Faces were still hard to recognize

🙈 That timing protected her identity

📖 Both of them guard her reputation

## 🤫 Let It Not Be Known That A Woman Came Into The Floor

Boaz gives a direct order to protect Ruth's name in town.

A rumor about a night visit could ruin her reputation instantly.

Nothing improper actually happened between them.

He still cares deeply about how gossip could twist this moment.

His concern for her honor matches everything he has already shown her.

🤫 Boaz protects her reputation directly

🗣️ Gossip could easily twist this moment

🛡️ Nothing improper actually took place

📖 His care matches his past kindness

## 🧣 Bring The Vail That Thou Hast Upon Thee

A vail was a large outer cloak or shawl.

Boaz asks Ruth to hold it open like a wide sack.

This simple piece of clothing becomes a way to carry a heavy gift home.

Even the smallest detail in this scene serves a real purpose.

🧣 A vail was an outer cloak

👐 Ruth holds it open like a sack

🎁 It becomes a way to carry grain

📖 Small details here all serve a purpose

## 📏 He Measured Six Measures Of Barley

Six measures likely refers to six omers of grain.

That was enough to be a serious and generous gift.

This amount was far more than a simple parting gesture.

Boaz sends Ruth home with visible proof of a night that ended well.

That grain speaks for him before he even explains anything.

📏 Six measures was a serious amount

🎁 It was far more than a small gift

✅ It proved the night ended well

📖 The grain speaks before words do

# Ruth 3:16-18
# 🏠 Naomi's Confidence
---
## ❓ Who Art Thou, My Daughter?

Naomi already knows this is Ruth standing before her.

The question is not really about identity in the dark.

She is really asking how the night went.

Sometimes a question carries a deeper meaning than its plain words.

❓ Naomi already knows who Ruth is

🌙 The real question is about the outcome

🗣️ Words can carry a deeper meaning

📖 Naomi wants the whole story

## 🔁 Go Not Empty Unto Thy Mother In Law

Empty is the exact word Naomi used about herself back in chapter one.

There she told the women of Bethlehem to call her Mara.

That name meant bitter, because the LORD had brought her home empty.

Now Boaz uses that very same word.

This time Ruth goes home full of grain instead.

The story quietly answers Naomi's earlier grief with real provision.

🔁 Empty repeats Naomi's word from chapter one

😢 She once called herself Mara over that loss

🌾 Boaz sends Ruth home full instead

📖 Provision answers Naomi's earlier grief

## 🪑 Sit Still, My Daughter

This phrase does not literally mean to remain seated.

It means to wait patiently and stop worrying.

Naomi has full confidence that Boaz will act quickly.

Her instructions shift from active planning to simply trusting the process.

🪑 Sit still means wait patiently

😌 It does not mean stay seated literally

🤝 Naomi trusts Boaz to act

📖 Trust replaces planning here

## ⏳ The Man Will Not Be In Rest, Until He Have Finished The Thing This Day

Naomi is certain Boaz will resolve this before the day ends.

She has read his character correctly through this entire book.

Boaz has shown himself to be a man who keeps his word.

The next chapter proves Naomi's confidence was not misplaced.

⏳ Naomi expects quick resolution

👀 She reads Boaz's character accurately

🤝 He keeps his promises without delay

📖 Chapter four proves her right
`.trim();

export const RUTH_THREE_PERSONAL_SECTIONS = parseRuthThreeRawNotes(RUTH_THREE_RAW_NOTES);
