export type EstherOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEstherOneRawNotes(rawText: string): EstherOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EstherOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Esther\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Esther 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Esther\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Esther\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Esther 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Esther 1:${startVerse}` : `Esther 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Esther 1 sections, received " + sections.length);
  }

  return sections;
}

const ESTHER_ONE_RAW_NOTES = `# Esther 1:1-4
# 👑 King Ahasuerus Shows Off His Empire
---
## 🗺️ This Is Ahasuerus Which Reigned From India Even Unto Ethiopia

Ahasuerus is a Hebrew name for a Persian king.

Many scholars believe he was the ruler known in history as Xerxes the First.

His territory stretched from India in the east to Ethiopia in the south.

That made his empire the largest in the world at that time.

Esther's story begins inside the most powerful court on earth.

🗺️ Ahasuerus was a Persian king

👑 Likely known as Xerxes the First

🌍 His empire stretched from India to Ethiopia

📖 Esther begins inside history's mightiest court

## 🔢 An Hundred And Seven And Twenty Provinces

"An hundred and seven and twenty" is an old way of saying one hundred twenty seven.

Ahasuerus ruled one hundred twenty seven separate provinces.

Each province had its own local governor.

Every governor answered directly up to the king.

Esther's whole story takes place inside this vast, many layered empire.

🔢 One hundred twenty seven means the province count

🗺️ Each province had its own governor

👑 All of them answered to one king

📖 Esther's story unfolds inside this vast empire

## 🏯 Shushan The Palace

Shushan, also spelled Susa, was one of Persia's great capital cities.

Persian kings moved between several capitals depending on the season.

Shushan sat in what is now southwest Iran.

This one city becomes the entire setting for the whole book of Esther.

🏯 Shushan is also called Susa

👑 One of Persia's royal capitals

🗺️ Located in modern day southwest Iran

📖 The setting for the whole book

## 🍷 He Made A Feast Unto All His Princes And His Servants

This feast was not a casual party.

Ancient kings used feasts like this to display wealth and win loyalty.

Every noble and official from across the empire needed to see this display in person.

A feast this large was itself a political tool.

🍷 Feasts displayed a king's wealth

🤝 Loyalty was built through display

👑 Nobles attended from across the empire

📖 The feast was a political tool

## 💰 He Shewed The Riches Of His Glorious Kingdom

"Shewed" is an old spelling of showed.

Ahasuerus put his entire treasury and glory on public display.

This was not private wealth kept hidden away.

Kings in this era proved their right to rule partly through visible splendor.

💰 Shewed means showed

👑 Wealth was displayed, not hidden

✨ Splendor helped prove a king's right to rule

📖 Power and appearance were tied together

## 📅 An Hundred And Fourscore Days

"Fourscore" is an old word for eighty.

One hundred plus eighty means this display lasted one hundred eighty days.

That is about six months of continuous display.

Many scholars believe this gathering doubled as a planning council for a coming war against Greece.

No ordinary celebration needs half a year to finish.

📅 Fourscore means eighty

🗓️ One hundred eighty days total

⏳ About six months of display

📖 Many scholars link this to war planning

# Esther 1:5-9
# 🍇 A Second Feast For Everyone In Shushan
---
## 👥 Both Unto Great And Small

This second feast welcomed every person in the city, not just nobles.

Rank did not decide who could attend.

That was unusual generosity from an ancient king.

It matched the same scale as the great feast that came before it.

👥 Everyone was invited, high and low

👑 Rank did not decide entry

🎉 An unusually generous gesture

📖 It matched the first feast's scale

## 🌳 In The Court Of The Garden Of The King's Palace

This feast moved outdoors into the palace's own garden courtyard.

A royal garden this size was itself a display of wealth.

Persian gardens like this one later gave the world the word paradise.

One courtyard held every guest this second feast welcomed.

🌳 The feast moved into a garden courtyard

👑 Royal gardens displayed wealth and control

🌍 Persian gardens inspired the word paradise

📖 One courtyard held every guest

## 🎨 White, Green, And Blue Hangings

"Hangings" were decorative fabric panels used to dress up the space.

White, green, and blue all used dyes that were expensive in this era.

Ordinary people could never afford fabric colored this way.

Every visible detail here was calculated to impress a guest before they said a word.

🎨 Hangings means decorative fabric panels

💎 The colors used costly dyes

🚫 Ordinary people could not afford them

📖 Every detail was built to impress

## 💜 Fastened With Cords Of Fine Linen And Purple

Purple dye in the ancient world came from crushed sea snails.

It often cost more than gold by weight.

Only royalty and the extremely wealthy could afford anything dyed purple.

Even the plain cords holding up the curtains were this expensive color.

💜 Purple dye cost more than gold

👑 Only royalty could afford it

🧵 Even the curtain cords were purple

📖 Nothing in the room was ordinary

## 🛋️ The Beds Were Of Gold And Silver

"Beds" here does not mean beds for sleeping.

It means couches guests reclined on during a banquet.

Guests at this kind of feast ate lying down, not sitting at a table.

Couches plated in gold and silver were one more display of the king's wealth.

🛋️ Beds means reclining couches

🍽️ Guests ate lying down, not seated

💰 Gold and silver plating was common

📖 Even the furniture displayed wealth

## 🏺 Vessels Of Gold, The Vessels Being Diverse One From Another

Every drinking vessel at this feast was made of gold.

No two of them matched each other.

A guest could hold a completely unique cup and never see its twin at the table.

That level of extravagance was rare even among wealthy households of the time.

🏺 Every gold cup was unique

💰 Rare even among the wealthy

🍷 No two cups matched

📖 Every object told the same story

## 🚫 None Did Compel

Some ancient banquets forced guests to keep drinking round after round.

This feast worked differently.

Each guest could drink as much or as little as they wanted.

The king himself had ordered his officers to honor every guest's own choice.

🚫 No guest was forced to drink

🍷 Each person chose their own amount

📜 The king ordered this rule himself

📖 Guests kept their own choice

## 👑 Vashti The Queen Made A Feast For The Women

Vashti was the reigning queen, married to Ahasuerus.

Royal feasts in this culture often separated men and women into different gatherings.

Vashti hosted her own banquet for the women inside the same palace.

This detail quietly sets up the confrontation that follows just a few verses later.

👑 Vashti was the reigning queen

🚻 Men and women feasted separately

🏯 Her feast happened inside the palace

📖 This sets up the coming conflict

# Esther 1:10-12
# 😡 Vashti Refuses The King
---
## 🍷 When The Heart Of The King Was Merry With Wine

"Merry with wine" is a polite, old way of saying the king was drunk.

Seven straight days of feasting had left him deep into the wine by this point.

His decision making from this point forward has to be read with that in mind.

A king who could rule an empire could not fully rule himself in this moment.

🍷 Merry with wine means drunk

📅 Seven days deep into the feast

🧠 His judgment was not clear

📖 Power could not control his own choices

## 👤 The Seven Chamberlains

Chamberlains were eunuchs who served inside the king's private quarters.

Their job included carrying the king's personal messages and commands.

Sending seven of them for one queen shows how much this request mattered to him.

A request this large needed a large show of force behind it.

👤 Chamberlains were royal eunuch servants

📜 They carried the king's commands

🔢 Seven were sent for one request

📖 The number shows how much this mattered

## 👀 To Shew The People And The Princes Her Beauty

The king wanted to parade Vashti in front of a room full of drunk men.

She was being treated the same way as the gold cups and marble floors already shown off.

The text says plainly that her beauty was the whole reason for the request.

Vashti was being asked to become one more piece of the king's collection.

👀 Vashti was meant to be displayed

🏺 Treated like another royal possession

💎 Her beauty was the stated reason

📖 She was being added to the collection

## 🚫 The Queen Vashti Refused To Come

Scripture never explains exactly why Vashti refused.

Many readers assume simple defiance, but the text does not say that directly.

She may have been protecting her own dignity from a room full of drunk men.

Whatever her reason, refusing a direct royal command in public was a serious risk.

🚫 Her exact reason is never given

🤔 The text does not explain it

🛡️ She may have been protecting herself

📖 Refusing the king in public was risky

## 🔥 Was The King Very Wroth, And His Anger Burned In Him

"Wroth" is an old word that means furious, far past simple annoyance.

Being publicly refused in front of every noble in the empire humiliated him.

His anger was not only personal, it was also about looking weak before his own court.

A private embarrassment was about to become a public political problem.

🔥 Wroth means furious

😳 He was humiliated in public

👑 Looking weak mattered to a king

📖 A private problem was about to go public

# Esther 1:13-15
# ⚖️ The King Turns To His Legal Advisers
---
## 🧙 The Wise Men, Which Knew The Times

"Knew the times" describes advisers trained to read events and judge the right timing for a decision.

Persian kings relied on formal experts before making major decisions.

This was not casual advice from friends.

Even a furious king still followed a formal process.

🧙 Knew the times means trained advisers

📜 They interpreted events and timing

👑 Kings consulted them for major choices

📖 Even fury still followed a process

## 📜 So Was The King's Manner Toward All That Knew Law And Judgment

This line tells us Ahasuerus always handled decisions this way.

This was not a special exception made for just this one case.

Personal anger still had to pass through official legal channels.

The system existed to keep even the king's choices inside a structure.

📜 This was his normal practice

⚖️ Anger still passed through legal channels

🏛️ Structure limited even the king's power

📖 No decision skipped the process

## 👑 Which Saw The King's Face

"Saw the king's face" was an idiom for the small circle allowed direct, personal access to the ruler.

Most people in the empire would never stand this close to Ahasuerus.

These seven princes sat at the very top of Persian government.

This is the same group already named as the wise men in the verse before.

👑 Seeing his face meant direct access

🚪 Most people never got this close

🏛️ These men sat at the very top

📖 Access itself was a form of power

## ⚖️ According To Law

This was not simply the king venting his frustration to friends.

He was formally asking what the law required in this exact situation.

Vashti's refusal was being treated as a legal case, not just a personal insult.

That framing gave the coming decision the full weight of Persian law.

⚖️ Vashti's case was treated legally

📜 The king asked what law required

🚫 This was not casual venting

📖 A personal insult became a legal matter

# Esther 1:16-18
# 📢 Memucan Makes It Everyone's Problem
---
## 🗣️ Vashti The Queen Hath Not Done Wrong To The King Only

Memucan was one of the seven princes with direct access to the king.

He argued that Vashti's refusal was not just an offense against her husband.

He claimed it threatened every noble and every household across the whole empire.

One woman's private choice was reframed as a danger to every man's authority.

🗣️ Memucan was one of the seven princes

👑 He reframed the offense

🏠 He claimed it threatened every household

📖 A private choice became a public danger

## 📰 This Deed Of The Queen Shall Come Abroad Unto All Women

"Come abroad" means the story will spread and become widely known.

Memucan feared that once this story traveled, other wives would follow Vashti's example.

News in the ancient world spread slowly, but Memucan argued as if it would spread anyway.

His claim jumped from one queen's choice to every woman in the empire almost instantly.

📰 Come abroad means spreads widely

🗣️ Memucan feared copycat behavior

👥 He assumed the story would travel

📖 Fear drove more of this than fact

## 💔 They Shall Despise Their Husbands In Their Eyes

Memucan is not describing something that has actually happened yet.

He is predicting a future he fears, not reporting a real event.

His entire argument rests on that fear, not on any actual proof.

An imagined future was about to reshape real law.

💔 This was a fear, not a fact

🔮 Memucan predicted, he did not report

⚖️ No proof backed the claim

📖 Fear was about to shape real law

## 😠 Too Much Contempt And Wrath

Memucan warns that women across the empire will grow angry at their own husbands.

He presents this as a threat to order in every home, everywhere.

The scale of his warning matches the scale of the empire itself.

Fear this large is hard for a king to ignore, even a false fear.

😠 Contempt means open disrespect

🏠 Framed as a threat to every home

🌍 Matched the scale of the empire

📖 A local problem was made universal

# Esther 1:19-22
# 📜 A Decree That Cannot Be Undone
---
## 📜 Written Among The Laws Of The Persians And The Medes, That It Be Not Altered

Persian law had a unique feature among ancient legal systems.

Once the king signed a decree into law, it could never be changed.

Not even the king himself had the power to undo it later.

The book of Daniel later shows this exact same rule trapping a different king.

Whatever Ahasuerus signed here would be permanent, no matter what he later felt.

📜 Persian law could not be reversed

👑 Not even the king could undo it

📖 Daniel shows this same rule elsewhere

➡️ Whatever he signed would be permanent

## 👑 Let The King Give Her Royal Estate Unto Another That Is Better Than She

Memucan's proposal did not stop at removing Vashti from the king's presence.

He recommended stripping her of the title of queen entirely.

Someone new would take her exact place in the palace.

This detail quietly sets up exactly how Esther will later enter the story.

👑 Vashti would lose her title completely

📜 This went beyond mere separation

➡️ It opens the door for a new queen

📖 This sets up Esther's entrance

## 🏠 All The Wives Shall Give To Their Husbands Honour

This was not really a law about marriage or love.

It was a political message meant to calm anxious noblemen across the empire.

No law can force real respect to exist inside a real marriage.

The decree solved a fear, not the actual problem underneath it.

🏠 Framed as a marriage law

😨 Really aimed at calming noblemen

❤️ Real respect cannot be forced by law

📖 It solved a fear, not the real issue

## ✍️ The King Did According To The Word Of Memucan

The same king who could not control his own household followed one adviser's suggestion without hesitation.

That irony sits quietly underneath this entire chapter.

Ahasuerus looks powerful, yet he is repeatedly pushed by the people around him.

This same pattern shows up again later in the book.

✍️ The king followed Memucan's advice quickly

🙃 He could not rule his own house

👑 He looked powerful but was easily led

📖 This pattern continues later in the book

## 🏠 That Every Man Should Bear Rule In His Own House

This decree tried to legislate something no government can actually enforce.

Authority inside a real home cannot be created by an empire wide letter.

The irony is that a law like this could never really be checked or carried out.

A king desperate for control ended up passing a law that controlled nothing.

🏠 Home authority cannot be legislated

📜 The decree could never be enforced

🙃 It solved nothing in practice

📖 Control on paper is not real control

## 🌍 According To The Language Of Every People

The empire stretched across dozens of languages and cultures.

Every province received this decree translated into its own local language.

That same method of empire wide communication returns later in the book.

Later, a very different decree will use this same system to save lives instead of controlling wives.

🌍 The empire held many different languages

📬 Every province got its own translation

🔁 The same method returns later

📖 Later, a decree like this will save lives
`.trim();

export const ESTHER_ONE_PERSONAL_SECTIONS = parseEstherOneRawNotes(ESTHER_ONE_RAW_NOTES);
