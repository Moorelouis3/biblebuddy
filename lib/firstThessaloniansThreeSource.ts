export type FirstThessaloniansThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstThessaloniansThreeRawNotes(rawText: string): FirstThessaloniansThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstThessaloniansThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*1\s+Thessalonians\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Thessalonians 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+1\s+Thessalonians\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+1\s+Thessalonians\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Thessalonians 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Thessalonians 3:${startVerse}` : `1 Thessalonians 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 1 Thessalonians 3 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_THESSALONIANS_THREE_RAW_NOTES = `# 1 Thessalonians 3:1-5
# 📨 Sent To Comfort In Affliction
---
## ⏳ When We Could No Longer Forbear

"Forbear" means to hold back or wait patiently.

Paul had been waiting for news from Thessalonica for some time.

That waiting finally became too hard to bear.

So he decided he had to act.

He sent Timotheus instead of waiting any longer.

⏳ Forbear means to wait no longer

✉️ Paul had waited for real news

💭 The wait became too hard

📖 So he sent Timotheus instead

## 🏛️ To Be Left At Athens Alone

"Athens" was a major Greek city, known for philosophy and idols.

Silas and Timotheus had stayed behind in Berea.

Paul went on to Athens by himself.

He was genuinely alone there, without his usual team.

That isolation makes what happens next even more remarkable.

🏛️ Athens means a major Greek city

👥 Silas and Timotheus stayed in Berea

🚶 Paul traveled there alone

📖 Being alone makes this moment stand out

## 🤝 Minister Of God, And Our Fellowlabourer In The Gospel Of Christ

Paul gives Timotheus three titles in this one verse.

"Minister" means someone who serves in God's work directly.

"Fellowlabourer" means a partner who works the same hard job alongside you.

Timotheus was not a lesser assistant running errands.

He stood as a full partner in the work.

🤝 Minister means someone who serves

💪 Fellowlabourer means a true partner

🙅 Not just an assistant running errands

📖 Timotheus was a full partner

## 🛡️ To Establish You, And To Comfort You Concerning Your Faith

Paul sent Timotheus with two clear jobs.

"Establish" means to make something firm and steady.

"Comfort" means to strengthen someone who feels weak or afraid.

Faith can wobble under real pressure.

Timotheus arrived to firm it back up.

🛡️ Establish means to make firm

🫂 Comfort means to strengthen someone

📉 Faith can wobble under pressure

📖 Timotheus came to firm it up

## 🌊 That No Man Should Be Moved By These Afflictions

"Moved" here does not mean a change of location.

It means shaken loose from a settled position.

Paul worried real suffering might knock their faith off balance.

He sent Timotheus to keep that from happening.

🌊 Moved means shaken loose

⚖️ Not about changing location

💔 Suffering can knock faith off balance

📖 Timotheus went to prevent that

## 📋 We Are Appointed Thereunto

Suffering was never a sign that God had failed them.

"Appointed" means assigned ahead of time, not an accident.

Paul says affliction itself was part of the plan all along.

That truth was meant to steady them, not alarm them.

📋 Appointed means assigned in advance

🚫 Not a sign God had failed

🎯 Suffering was part of the plan

📖 That truth was meant to steady them

## 🔁 We Told You Before That We Should Suffer Tribulation

This tribulation was never a surprise to this church.

Paul had already warned them before it ever began.

"Tribulation" means serious, ongoing hardship, not a single bad day.

Hearing it happen should have confirmed Paul's word, not shaken it.

🔁 Not a surprise message

🗣️ Paul warned them in advance

⚡ Tribulation means ongoing hardship

📖 This should have confirmed his word

## 👹 Lest By Some Means The Tempter Have Tempted You, And Our Labour Be In Vain

"The tempter" is a direct name for Satan, not a vague force.

His goal was using suffering to pull them away from the faith.

"Vain" means wasted, leaving nothing real behind.

Paul feared losing all that earlier labour to one moment of doubt.

👹 The tempter means Satan himself

🎯 His goal was pulling them away

🌬️ Vain means wasted effort

📖 Paul feared losing that labour

# 1 Thessalonians 3:6-10
# 🙌 Good News Carries Him Through
---
## 📨 Timotheus Came From You Unto Us, And Brought Us Good Tidings

This verse marks the turning point of the whole chapter.

Timotheus had finally returned from Thessalonica with real news.

"Good tidings" means welcome news, not a mixed report.

Paul's anxious waiting from the start of the chapter was finally over.

📨 Timotheus returned with real news

😌 The long wait was finally over

✅ Good tidings means welcome news

📖 This is the chapter's turning point

## ❤️ Good Tidings Of Your Faith And Charity

"Charity" here is an old word for selfless love.

It is not simply writing a check to someone in need.

Timotheus confirmed both their faith and their love were still alive.

Both were still healthy, even after real pressure.

❤️ Charity means selfless love

💰 Not just giving money

✅ Faith and love were confirmed alive

📖 Both survived real pressure

## 💭 Ye Have Good Remembrance Of Us Always

This church had not forgotten Paul the moment he left.

They kept thinking of him with real warmth and affection.

The letter says they also longed to see Paul again.

That desire ran in both directions at once.

💭 They never forgot Paul

❤️ Warm memory, not a cold one

🙋 They longed to see him too

📖 That longing went both ways

## 🫂 We Were Comforted Over You In All Our Affliction And Distress By Your Faith

Paul was not writing from an easy, comfortable season.

"Affliction and distress" describes real hardship happening to Paul himself.

Good news about this church's faith reached him in the middle of it.

That one report was enough to lift him.

🫂 Comforted means genuinely relieved

⚡ Paul faced real hardship too

📨 Good news arrived in the middle of it

📖 Their faith lifted him in his own trial

## 💓 For Now We Live, If Ye Stand Fast In The Lord

"Live" here is not about simple physical survival.

Paul means his own spirit feels fully alive again.

Their steady faith is what makes him feel that way.

His wellbeing was tied to their faithfulness, not his own circumstances.

💓 Live means more than survival

🙌 Their faith revived his spirit

🔗 His joy was tied to theirs

📖 Their faithfulness became his own life

## 🙏 What Thanks Can We Render To God Again For You

Paul asks this almost as a real, open question.

"Render" means to give something back that is owed.

No thanks he could offer felt like enough.

The joy they gave him felt bigger than any thanks could match.

🙏 Render means to give back

❓ Paul asks this as a real question

📈 No thanks felt like enough

📖 Their joy outgrew his gratitude

## 🌙 Night And Day Praying Exceedingly

This habit already appeared back in chapter one.

"Exceedingly" means far beyond a normal amount.

Paul was not praying occasionally when he happened to remember.

This church stayed on his mind constantly.

🌙 Echoes chapter one's pattern

📈 Exceedingly means far beyond normal

🚫 Not an occasional habit

📖 This church stayed on his mind

## 🧩 That We Might See Your Face, And Might Perfect That Which Is Lacking In Your Faith

Paul names two separate goals in one breath here.

The first is simple, a real visit, face to face.

"Perfect" here means complete, not flawless performance.

He wanted to help finish what good news had already started.

🧩 Perfect means complete, not flawless

🚶 He wanted a real visit too

🏗️ Faith was growing but not finished

📖 He wanted to help finish it

# 1 Thessalonians 3:11-13
# 🙏 A Prayer For Love And Holiness
---
## 🧭 God Himself And Our Father, And Our Lord Jesus Christ, Direct Our Way Unto You

Paul prays to the Father and the Son together as one request.

"Direct our way" means guide the actual travel plans back to this church.

Paul could not simply choose his own schedule and go.

He trusted God to decide when that visit would happen.

🧭 Direct our way means guide travel

🙏 One prayer to Father and Son

📅 Not Paul's own schedule to pick

📖 God would decide the timing

## 🌊 Make You To Increase And Abound In Love One Toward Another

"Abound" means to overflow, far more than just enough.

Paul is not asking for love that barely gets by.

He wants a love that keeps growing without running out.

This growth starts inside the church, among its own members.

🌊 Abound means to overflow

📈 More than just enough

🔄 Love that keeps growing

📖 It starts inside the church

## 🌍 And Toward All Men, Even As We Do Toward You

This love was never meant to stop at the church doors.

"All men" means every person, not only fellow believers.

Paul points to his own love for them as the measuring stick.

Real love reaches outward, not only inward.

🌍 All men means every person

🚪 Love does not stop at the doors

📏 Paul's own love is the measure

📖 Real love reaches outward

## ⚖️ Stablish Your Hearts Unblameable In Holiness Before God

"Stablish" means to make firm and settled, the same idea from verse two.

"Unblameable" means no one could rightly point to a real fault.

"Holiness" means being set apart, devoted fully to God.

Paul prays for character, not just correct behavior in public.

⚖️ Stablish means made firm

🙅 Unblameable means no real fault

🙏 Holiness means devoted to God

📖 This is character, not performance

## ✝️ At The Coming Of Our Lord Jesus Christ With All His Saints

"His coming" points forward to Christ's promised return.

"His saints" refers to all believers who belong to God.

Paul ties present holiness directly to a future moment.

How they live now will be measured on that day.

✝️ His coming means Christ's return

👥 His saints means all believers

🔗 Present life ties to that day

📖 Holiness now is measured then`.trim();

export const FIRST_THESSALONIANS_THREE_PERSONAL_SECTIONS = parseFirstThessaloniansThreeRawNotes(
  FIRST_THESSALONIANS_THREE_RAW_NOTES
);
