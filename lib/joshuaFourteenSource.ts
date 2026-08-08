export type JoshuaFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaFourteenRawNotes(rawText: string): JoshuaFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 14:${startVerse}` : `Joshua 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Joshua 14 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_FOURTEEN_RAW_NOTES = `# Joshua 14:1-5
# 🗺️ Dividing The Promised Land
---
## ⚖️ Eleazar The Priest, And Joshua The Son Of Nun

Eleazar was the high priest of Israel at this time.

He took that role after his father Aaron died.

Joshua led the nation and the army.

Eleazar handled anything connected to worship and sacred decisions.

The two leaders divided this land together, not alone.

God wanted both leaders witnessing this moment.

⚖️ Eleazar became high priest after Aaron

🪖 Joshua led Israel's army and nation

🙏 Eleazar handled Israel's sacred decisions

📖 Both leaders witnessed the land division

## 🎲 By Lot Was Their Inheritance

A lot was an ancient tool like a small marked stone.

Casting lots meant throwing it to make a decision.

It looked random to human eyes.

Israel believed God controlled exactly where it landed.

This was not gambling.

It was one way Israel asked God to choose.

🎲 A lot was a small marked stone

👋 Casting it looked random to people

🙏 Israel believed God controlled the result

📖 Lots let Israel ask God to choose

## 🔢 Nine Tribes, And For The Half Tribe

Israel had twelve tribes in total.

Two and a half tribes already received land east of the Jordan River.

That group included Reuben, Gad, and half of Manasseh.

The tribe of Levi received no separate territory at all.

That leaves nine and a half tribes still needing land here in Canaan.

This chapter explains exactly how those tribes divided it.

🔢 Israel had twelve tribes total

🌊 Two and a half tribes settled east

👪 Levi received no separate territory

📖 Nine and a half tribes remain here

## 🌉 Two Tribes And An Half Tribe On The Other Side Jordan

Moses already gave land to Reuben, Gad, and half of Manasseh.

That land sat east of the Jordan River, outside Canaan itself.

Those tribes asked for it because it had good pasture for their livestock.

Numbers chapter thirty two tells that whole story.

Their choice meant crossing the river to help the other tribes fight first.

Only after that could they return home to that land.

🌉 Reuben, Gad, and half Manasseh chose first

🐑 That land had strong pasture for livestock

📜 Numbers thirty two tells the full story

📖 They still had to help conquer Canaan first

## 🕊️ Unto The Levites He Gave None Inheritance

The Levites were the priestly tribe of Israel.

They received no farmland or territory of their own.

God himself was described as their inheritance instead.

Their whole job was serving in worship, not farming.

Later verses explain they still received cities to live in.

Their portion was different, not smaller.

🕊️ Levites received no farmland at all

🙏 God himself was their true inheritance

⛪ Their job was worship, not farming

📖 A different portion, not a lesser one

## 🏘️ Cities To Dwell In, With Their Suburbs

Levites still needed somewhere to actually live.

Other tribes gave them scattered cities inside their own territory.

Suburbs here does not mean neighborhoods like today.

It means open pastureland surrounding each city.

That pasture fed the Levites' own cattle and flocks.

Forty eight of these cities appear later in Joshua chapter twenty one.

🏘️ Levites lived scattered in other tribes' cities

🌾 Suburbs meant pastureland, not neighborhoods

🐄 That land fed their own cattle

📖 Forty eight cities appear in Joshua twenty one

# Joshua 14:6-9
# 🏔️ Caleb Remembers The Promise
---
## 👳 Caleb The Son Of Jephunneh The Kenezite

Caleb was one of the twelve spies Moses sent into Canaan.

Kenezite points to a family line connected to Edom, not Israel by birth.

Caleb was likely joined to Judah's tribe rather than born into it.

Scripture never treats him as any less a part of Israel for that.

His loyalty to God mattered far more than his bloodline.

👳 Caleb was one of the twelve spies

🌍 Kenezite points to roots outside Israel

🤝 Caleb was joined to Judah's tribe

📖 Loyalty mattered more than his bloodline

## 📍 Kadeshbarnea

Kadeshbarnea was the camp on the edge of Canaan.

Moses sent twelve spies out from there to scout the land.

Ten of them came back terrified and spread that fear to the people.

Only Caleb and Joshua trusted God enough to say the land could be taken.

That single choice at Kadeshbarnea shaped both of their futures.

📍 Kadeshbarnea sat on Canaan's border

🕵️ Twelve spies scouted the land from there

😨 Ten spies returned with fear

📖 Caleb and Joshua trusted God instead

## 🕵️ Espy Out The Land

Espy is an old word for scout or spy.

Moses sent Caleb to secretly examine the land before Israel invaded.

Caleb had to study cities, people, and defenses without being caught.

He was forty years old when he took on that dangerous mission.

That same land is finally his to receive here in this chapter.

🕵️ Espy means to scout in secret

🗺️ Caleb studied cities and defenses

⏳ He was forty years old then

📖 That mission finally pays off here

## 💔 Made The Heart Of The People Melt

Melt here is an old idiom for losing all courage.

The ten fearful spies described giants and walled cities to the people.

Their report drained Israel's courage completely.

The whole nation nearly refused to enter the promised land because of it.

Fear can spread faster than facts.

💔 Melt means the people grew terrified

🗣️ The ten spies spread fear with words

😱 Israel almost refused to enter Canaan

📖 Fear spreads faster than facts do

## 🙏 Wholly Followed The LORD My God

Wholly followed describes a whole life, not one brave moment.

This exact phrase appears three times in this chapter alone.

Numbers chapter fourteen first used it about Caleb after the spy mission.

Caleb never drifted from that same trust for the next forty five years.

That consistency is the real reason he stands here today.

🙏 This phrase repeats three times here

🔁 First used back in Numbers fourteen

⏳ Caleb held that trust forty five years

📖 Consistency, not one moment, defines Caleb

## 📜 Moses Sware... Land Whereon Thy Feet Have Trodden

Moses made Caleb a personal promise under oath that day.

Feet have trodden means the exact ground Caleb personally walked while spying.

That land would belong to Caleb and his children forever.

Forty five years passed before that oath finally came true.

God does not forget a promise just because time passes.

📜 Moses swore Caleb a personal oath

👣 Trodden means the ground Caleb walked

⏳ Forty five years passed before fulfillment

📖 God keeps promises even after decades

# Joshua 14:10-12
# 💪 An Old Man's Bold Request
---
## 🔢 Forty And Five Years

Caleb does the math out loud for Joshua.

Israel wandered the wilderness for forty years after the spy mission.

About five more years passed during the conquest of Canaan itself.

Forty five years total is the length of Caleb's long wait.

God kept him alive through every one of those years.

🔢 Forty years in the wilderness

⚔️ Five more years fighting to conquer Canaan

⏳ Forty five years is Caleb's total wait

📖 God kept him alive the whole time

## 👴 Fourscore And Five Years Old

Fourscore is an old word for eighty.

Fourscore and five means Caleb was eighty five years old.

That is remarkably old for anyone in this story.

Most men his age would have quietly asked for a peaceful, easy portion.

Caleb instead asks for the hardest ground still left to conquer.

👴 Fourscore means eighty in old English

🎂 Caleb was eighty five years old

🛋️ Most his age would want ease

📖 Caleb chooses the hardest ground instead

## 💪 My Strength Was Then, Even So Is My Strength Now

Caleb is not claiming he feels physically young.

He is claiming his faith has not weakened with age.

The same trust that led him to believe God at forty still stands.

His body aged, but his conviction never did.

That kind of steady faith is rarer than physical strength.

💪 Caleb claims steady faith, not youth

🕰️ His body aged, his trust did not

🙏 Same conviction from forty years earlier

📖 Steady faith outlasts physical strength

## ⛰️ Give Me This Mountain

Caleb finally names what he wants, a specific mountain.

That mountain will turn out to be Hebron later in this chapter.

It was not empty, easy land.

Powerful enemies still controlled the cities built on it.

Caleb asks for the fight nobody else wanted.

⛰️ Caleb requests a specific mountain

🏙️ That mountain becomes Hebron later

⚔️ Enemies still held that ground

📖 He asks for the hardest fight

## 🗿 How The Anakims Were There

The Anakims were a tall, powerful people living in the hill country.

Ten spies described them as giants back in Numbers chapter thirteen.

That exact report is what made the people's hearts melt with fear.

Caleb saw the same giants and still wanted to fight them.

Cities described as great and fenced meant walled and heavily defended.

🗿 Anakims were a tall, feared people

😱 Ten spies called them giants

🏰 Fenced means walled and defended

📖 Caleb wanted this fight anyway

## 🙏 If So Be The LORD Will Be With Me

If so be is an old way of saying provided that.

Caleb ties his whole request to God's presence going with him.

That same trust carried him through the spy mission decades earlier.

Faith, not youth, is the real reason Caleb expects to win.

He asks boldly, but he still depends completely on God.

🙏 Caleb depends on God, not himself

🔁 Same trust from the spy mission

💪 Faith, not youth, drives this request

📖 Bold requests can still rest on God

# Joshua 14:13-15
# 🏆 Hebron Becomes Caleb's
---
## 🙌 Joshua Blessed Him

Joshua responds to Caleb's request with a formal blessing.

A blessing like this was a spoken, official act, not a passing compliment.

Joshua had fought beside Caleb since Kadeshbarnea decades earlier.

Two of the original twelve spies stand together again in this moment.

Their long friendship is quietly present in this exchange.

🙌 Joshua gives a formal blessing

🗣️ A blessing was official, not casual

🤝 Both men were spies together long ago

📖 Old friendship stands behind this moment

## 🏙️ Hebron For An Inheritance

Hebron was already one of the oldest cities in the region.

Abraham, Isaac, and Jacob all lived near or were buried there.

Giving Caleb this exact city connected him to Israel's earliest ancestors.

It was also a city still guarded by the very giants Caleb feared.

Caleb receives history and danger in the very same gift.

🏙️ Hebron was an ancient, important city

⚰️ Abraham, Isaac, and Jacob connect to it

🗿 Giants still guarded that ground

📖 Caleb receives history and danger together

## 📅 Unto This Day

Unto this day means the writer is speaking from a later point in time.

Caleb's family still held Hebron when Joshua was written down.

Whoever recorded this wanted readers to know the promise truly lasted.

A promise kept for decades still mattered to a much later generation.

It was proof, not just a story.

📅 Unto this day means still true later

✍️ The writer confirms it from afterward

⏳ The promise held for a long time

📖 A kept promise becomes lasting proof

## 🏛️ The Name Of Hebron Before Was Kirjatharba

Kirjatharba means city of Arba in the original language.

Cities in this region were often renamed after the people who founded them.

This detail explains exactly where that older name came from.

Renaming often followed conquest or a change in who controlled a place.

Hebron's story reaches back long before Israel ever arrived.

🏛️ Kirjatharba means city of Arba

👤 Cities were often named after founders

🔁 Renaming often followed conquest

📖 Hebron's history predates Israel's arrival

## 🗿 Arba Was A Great Man Among The Anakims

Arba was likely a leader or founder among the Anakim people.

Great man here points to size, status, or both at once.

This is the same group of giants that terrified the ten spies.

Caleb ends up settling in the very city named for their leader.

The land Caleb feared most as a young man becomes his home.

🗿 Arba likely led the Anakim people

📏 Great man suggests size and status

😱 Same giants the ten spies feared

📖 Caleb's old fear becomes his home

## 🕊️ The Land Had Rest From War

Rest from war here means a pause, not a permanent ending.

Fighting in Canaan continues in the chapters right after this one.

This same phrase appears again later in the book of Joshua.

It closes Caleb's personal story on a note of peace.

One man's long wait finally ends in rest.

🕊️ Rest here means a pause, not the end

⚔️ Fighting continues in later chapters

🔁 This same phrase repeats later in Joshua

📖 Caleb's long wait ends in rest
`.trim();

export const JOSHUA_FOURTEEN_PERSONAL_SECTIONS = parseJoshuaFourteenRawNotes(JOSHUA_FOURTEEN_RAW_NOTES);
