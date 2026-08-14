export type SecondKingsTwentyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsTwentyRawNotes(rawText: string): SecondKingsTwentyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsTwentyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsTwenty\s+20:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 20 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsTwenty\s+20:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsTwenty\s+20:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 20 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 20,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 20:${startVerse}` : `2 Kings 20:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 2 Kings 20 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_TWENTY_RAW_NOTES = `# SecondKingsTwenty 20:1-3
# 😢 Hezekiah's Illness And Desperate Prayer
---
## 🤒 Sick Unto Death

Sick unto death means the sickness was expected to end in death.

Ancient writers reserved that exact phrase for only the most serious illnesses.

Verse seven later describes a boil, which many scholars connect to this same sickness.

Hezekiah is a middle aged king with no son yet named to take his throne.

This was not a passing fever people simply waited out.

Everyone around Hezekiah expected this illness to kill him soon.

🤒 Sick unto death means expected to die

📜 Writers reserved this phrase for real danger

🩹 A boil later may be the cause

➡️ No heir was named for Judah yet

## 📋 Set Thine House In Order

This does not mean tidy up his belongings before a trip.

Set thine house in order was ancient language for making final arrangements before death.

It meant settling debts, naming an heir, and preparing the kingdom for a change of king.

Isaiah delivers this as a direct command from God, not personal advice.

No physician makes an announcement like this one.

A prophet does.

📋 It means preparing to die, not tidying

👑 It meant naming an heir and settling debts

🗣️ Isaiah delivers this as God's own word

➡️ Hezekiah now knows how serious this is

## ⚰️ Thou Shalt Die, And Not Live

God gives Hezekiah no room for hope in this first message.

Thou shalt die, and not live repeats the same idea twice for emphasis.

This blunt certainty makes what happens next even more striking.

Prayer is about to change what seemed completely fixed.

⚰️ Die and not live repeats for emphasis

📢 The first message leaves no room for hope

🙏 Prayer is about to change everything

📖 What seemed fixed was not truly fixed

## 🧱 He Turned His Face To The Wall

Turning toward the wall was a private way to pray in this culture.

It shut out the room, the servants, and everyone else present.

Hezekiah does not gather advisors or make a public appeal.

His first response to death is a quiet conversation with God alone.

🧱 Turning to the wall shut out the room

🙏 It signaled a private, personal prayer

👥 No advisors or crowd are called in

➡️ His first move was talking to God

## ❤️ I Have Walked Before Thee In Truth And With A Perfect Heart

Walked before thee is an old way of describing a whole life lived faithfully.

A perfect heart does not mean sinless.

It means wholly devoted, undivided in loyalty.

Hezekiah tore down idols earlier in his reign, one of Judah's most faithful kings.

He is not boasting here.

He is reminding God of a real, lived pattern of devotion.

🚶 Walked before thee means a whole life lived

❤️ A perfect heart means wholly devoted, not sinless

🛠️ Hezekiah tore down idols earlier in his reign

📖 He reminds God of a lived pattern

## 😢 Hezekiah Wept Sore

Sore here is an old word meaning intensely, not physically sore.

This is not a quiet, composed prayer.

Hezekiah cries with real, visible grief in front of Isaiah.

Even a strong, faithful king breaks down completely when facing death.

😢 Sore means intensely, not physically sore

🙇 This was not a quiet prayer

👀 Isaiah witnesses real, visible grief

➡️ Even faithful kings break down facing death

# SecondKingsTwenty 20:4-7
# 🩹 God Grants Healing And Fifteen More Years
---
## ⏳ Afore Isaiah Was Gone Out Into The Middle Court

Afore is an old word simply meaning before.

Isaiah had already left Hezekiah's presence when God stopped him mid step.

The word of the LORD reaches Isaiah again almost instantly.

No long gap separates the first hard message from this second, better one.

⏳ Afore means before

🚶 Isaiah had already begun walking away

⚡ God stops him almost immediately

➡️ No long gap separates the two messages

## 👂 I Have Heard Thy Prayer, I Have Seen Thy Tears

God directly answers both what Hezekiah said and what Hezekiah felt.

Hearing addresses the words of his prayer from the last section.

Seeing addresses the tears he wept right after.

Nothing about Hezekiah's desperate response went unnoticed.

👂 God answers the words Hezekiah spoke

👀 God answers the tears Hezekiah wept

🙏 Both the prayer and the grief mattered

📖 Nothing about his desperation went unnoticed

## 🏛️ On The Third Day Thou Shalt Go Up Unto The House Of The LORD

God gives Hezekiah an exact timeline, not a vague future promise.

Three days is specific enough that Hezekiah can count toward it.

Going up to the house of the LORD means Hezekiah will worship there himself.

His own healed body becomes the proof he brings into the temple.

📅 The timeline is exact, not vague

🔢 Three days is something he can count

🏛️ Going up means worshipping at the temple

➡️ His healed body becomes living proof

## 🔢 I Will Add Unto Thy Days Fifteen Years

God names an exact number of extra years, not just more time in general.

Fifteen years matters later, since Hezekiah's son Manasseh begins reigning at only twelve.

That means Manasseh was born sometime during these fifteen added years.

This healing quietly sets up the next king of Judah.

🔢 God names an exact fifteen years

👶 Manasseh begins reigning at only twelve

🧮 Manasseh was born during these added years

📖 This healing sets up Judah's next king

## 👑 For Mine Own Sake, And For My Servant David's Sake

God gives two separate reasons for saving both Hezekiah and the city.

His own sake means His reputation and honor are part of the reason.

David's sake points back to God's old covenant promise to David's family.

Hezekiah is helped because of who God is, not because he earned it alone.

👑 Two separate reasons are given here

✨ God's own reputation is one reason

📖 David's old covenant promise is the other

➡️ Help comes from God's character, not merit

## 🍯 Take A Lump Of Figs

Figs were a common ancient remedy, softened and applied directly to wounds.

The boil is likely the same sickness that made Hezekiah sick unto death.

God heals Hezekiah, but still uses an ordinary, everyday treatment to do it.

A miracle and a physical remedy work together in the very same verse.

🍯 Figs were a common ancient remedy

🩹 The boil is likely his sickness

🙏 God still uses an ordinary treatment

📖 A miracle and medicine work together

# SecondKingsTwenty 20:8-11
# ☀️ The Sign Of The Sundial
---
## ❓ What Shall Be The Sign

Asking for a sign here is not doubt.

It is a normal, honest request.

Hezekiah already believes Isaiah's promise from the last section.

He simply wants a way to know for certain that the healing is real.

Scripture allows this kind of honest request in more than one place.

❓ Asking for a sign is not doubt

🙏 Hezekiah already believes the promise given

✅ He wants certain proof, not proof to believe

📖 Scripture allows this kind of honest request

## ☀️ Shall The Shadow Go Forward Ten Degrees, Or Go Back Ten Degrees

Isaiah offers Hezekiah an actual choice between two possible miracles.

Degrees here refer to marked lines on a sundial that tracked time by shadow.

Moving forward would simply speed up the normal passing of the day.

Moving the shadow backward would reverse something that had already happened.

☀️ Isaiah offers a real choice

📏 Degrees mean marked lines on a sundial

⏩ Forward would only speed up the day

➡️ Backward would reverse what already happened

## 🪶 It Is A Light Thing For The Shadow To Go Down Ten Degrees

Light thing here is an old way of saying something easy or unremarkable.

Hezekiah calls the simpler forward option too easy to prove anything.

He wants a sign difficult enough that no one could question it later.

His request pushes for something unmistakably miraculous, not merely convenient.

🪶 Light thing means easy, unremarkable

👎 Hezekiah rejects the easier option

🎯 He wants an unmistakable miracle

➡️ Convenience was not what he wanted

## ⏪ Let The Shadow Return Backward Ten Degrees

Hezekiah deliberately picks the harder of the two possible signs.

Reversing a shadow that already moved is far stranger than simply speeding it along.

Time itself would have to visibly run backward.

His faith is confirmed with the more impossible option, not the easier one.

🎯 Hezekiah picks the harder sign

⏪ Reversing time is stranger than speeding it

🕰️ Time visibly runs backward for a spell

📖 His faith gets the harder proof

## 🙏 Isaiah The Prophet Cried Unto The LORD

The miracle does not happen automatically the moment it is spoken.

Isaiah still has to pray, actively asking God to act.

Cried here means calling out with real urgency, not a quiet request.

Even a confirmed promise still moves forward through real, active prayer.

🙏 The miracle needed active prayer first

🗣️ Isaiah still had to ask God

📢 Cried means calling out urgently

➡️ Promises still move through real prayer

## 🕰️ The Dial Of Ahaz

This was likely a stairway or platform built to cast a shadow that tracked the hours.

Ahaz was Hezekiah's own father, an earlier and far less faithful king of Judah.

The device may have been part of something Ahaz built for his own purposes.

God uses one of Ahaz's own structures to prove His word to Ahaz's son.

🕰️ Likely a stairway that tracked shadow time

👑 Ahaz was Hezekiah's own father

🏗️ Ahaz may have built the device

📖 God uses Ahaz's structure for his son

# SecondKingsTwenty 20:12-15
# 👑 Envoys Arrive From Babylon
---
## 👑 Berodachbaladan, The Son Of Baladan, King Of Babylon

This king is also known outside the Bible as Merodach baladan, a real historical ruler.

He ruled Babylon during a period when Assyria was the region's dominant power.

Babylon was not yet the empire it would later become under Nebuchadnezzar.

Sending envoys to Judah was part of a wider effort to find allies against Assyria.

👑 Also known as Merodach baladan

🌍 He ruled Babylon under Assyria's shadow

🤝 Babylon looked for allies against Assyria

📖 This visit fits that larger strategy

## 🎁 Sent Letters And A Present Unto Hezekiah

A present here was a formal diplomatic gift between two royal courts.

On the surface, this looks like a kind gesture wishing Hezekiah well.

Underneath, Babylon likely wanted to see Judah as a future ally.

Judah's recent survival against Assyria in the last chapters made it worth noticing.

🎁 A present meant a formal royal gift

🤝 It looked like simple kindness

🎯 Babylon likely wanted a future ally

📖 Judah's survival made it worth noticing

## 👂 Hezekiah Hearkened Unto Them

Hearkened is an old word meaning listened to and welcomed.

Hezekiah receives these foreign messengers warmly, without any caution.

Nothing in the text says he asked God before responding to them.

That missing detail becomes important once Isaiah arrives at the end of the story.

👂 Hearkened means listened to and welcomed

🤗 Hezekiah welcomed them warmly

❓ He did not consult God first

➡️ That missing step matters later

## 👁️ Shewed Them All The House Of His Precious Things

Shewed is simply an old spelling of showed.

Hezekiah gives these foreign visitors a full tour of his royal treasury.

Silver, gold, spices, and fine ointments were signs of a kingdom's real wealth.

This tour reveals pride creeping in right after God rescued and healed him.

👁️ Shewed is an old spelling of showed

🏛️ Hezekiah gives a full treasury tour

💰 Silver and gold showed real wealth

📖 Pride follows right after his rescue

## 🔓 There Was Nothing In His House That Hezekiah Shewed Them Not

This repeats the same idea twice for extra emphasis.

Nothing at all is held back this time.

Hezekiah shows visiting foreigners every weapon, every treasure, every resource Judah owns.

A king normally keeps some of this hidden from a nation he barely knows.

This complete openness is about to become a serious mistake.

🔓 Nothing was held back at all

🗺️ Every weapon and treasure was shown

🤔 Kings normally keep some things hidden

➡️ This openness becomes a serious mistake

## ❓ What Said These Men, And From Whence Came They Unto Thee

Isaiah arrives asking pointed questions, not making small talk.

He wants to know exactly what was said and exactly who these visitors were.

A prophet's job includes noticing danger a king walked past without thinking twice.

Isaiah's questions are about to expose a problem Hezekiah never considered.

❓ Isaiah asks pointed, direct questions

🕵️ He wants to know who and what

👀 Prophets notice danger kings can miss

➡️ These questions expose a real problem

## 🗣️ They Are Come From A Far Country, Even From Babylon

Hezekiah answers honestly, but without any sense of alarm in his voice.

Far country makes Babylon sound distant and harmless.

The real Babylon was already a rising power.

He does not yet see these visitors as anything more than well wishers.

His own answer is about to be turned back on him in the next verses.

🗣️ Hezekiah answers honestly, without alarm

🌍 Far country makes Babylon sound harmless

🙈 He does not see them as a threat

📖 His own words get turned back on him

# SecondKingsTwenty 20:16-19
# 😔 Isaiah's Prophecy Of Exile
---
## 📢 Hear The Word Of The LORD

This phrase was the standard way a prophet opened an official message from God.

Isaiah is signaling that what comes next is not his own personal opinion.

The warm, personal tone of the last conversation shifts immediately here.

Hezekiah is about to hear a hard truth stated as plain fact.

📢 A standard phrase opening prophetic messages

🗣️ This is God's word, not Isaiah's opinion

🔄 The tone shifts sharply here

➡️ A hard truth is coming next

## 🔮 Shall Be Carried Into Babylon

This judgment directly answers what just happened in the last section.

Everything Hezekiah proudly displayed to Babylon's messengers will one day belong to Babylon itself.

The very nation he welcomed as a guest becomes the nation that takes it all.

This fulfillment happens generations later, but the prophecy is stated here first.

🔮 This judgment answers the treasury tour

🏛️ What Hezekiah showed will belong to Babylon

🔄 The guest becomes the future conqueror

📖 The prophecy is spoken here first

## 🚫 Nothing Shall Be Left, Saith The LORD

This is a complete, total statement, not a partial warning.

Every treasure Hezekiah showed off will eventually be gone.

Saith the LORD marks this as God's own certain word, not a guess.

The completeness of the loss matches the completeness of what Hezekiah showed.

🚫 Nothing means a complete, total loss

💰 Every treasure will eventually be gone

✅ Saith the LORD means this is certain

📖 The loss matches what was shown

## 👶 Thy Sons That Shall Issue From Thee

Issue from thee is an old way of saying sons not yet born.

This judgment reaches past Hezekiah into a future generation he has not met yet.

The sons taken here are Hezekiah's own future descendants, born of the added years.

God's warning stretches far beyond Hezekiah's own lifetime.

👶 Issue from thee means sons not yet born

🔮 The judgment reaches a future generation

⏳ These are sons of the added years

➡️ The warning outlives Hezekiah's own life

## ⚔️ They Shall Be Eunuchs In The Palace Of The King Of Babylon

A eunuch was a castrated male servant, often given trusted roles in a royal court.

Ancient kings used eunuchs because they could not found rival dynasties of their own.

Daniel and his three friends serve in a very similar role generations later in Babylon.

This one line quietly points forward all the way to the book of Daniel.

⚔️ A eunuch was a castrated royal servant

👑 Kings used them to avoid rival dynasties

📚 Daniel later serves in a similar role

📖 This line points forward to Daniel

## 🙏 Good Is The Word Of The LORD Which Thou Hast Spoken

Hezekiah does not argue, deny, or beg for a different outcome here.

He accepts a genuinely hard prophecy as still coming from a good and trustworthy God.

The news itself is still painful to hear.

Accepting God's word does not require liking every part of it.

🙏 Hezekiah does not argue or deny it

✅ He calls a hard word good

😔 The news is still painful to hear

➡️ Accepting truth does not require liking it

## 😌 Is It Not Good, If Peace And Truth Be In My Days

Hezekiah's full response can sound self focused at first reading.

He is relieved the coming disaster will not strike during his own lifetime.

Many readers over the centuries have judged this reaction as a little selfish.

Others read it as simple, honest relief instead.

His own family gets to stay safe for a few more decades.

😌 Hezekiah is relieved for his own days

🤔 Readers have long debated this reaction

👨‍👩‍👧 Others read it as simple honest relief

📖 The text lets readers decide for themselves

# SecondKingsTwenty 20:20-21
# 📜 Hezekiah's Legacy And Death
---
## 🏗️ How He Made A Pool, And A Conduit, And Brought Water Into The City

This pool and conduit are widely identified today with Hezekiah's Tunnel in Jerusalem.

The tunnel carried water underground into the city, protecting it during a siege.

Archaeologists actually discovered an ancient inscription inside this very tunnel describing its digging.

A brief summary line here points to a real engineering project people can still visit.

🏗️ Likely Hezekiah's Tunnel in Jerusalem

💧 It carried water safely into the city

🪨 An ancient inscription describes its digging

📖 This project can still be visited today

## 📚 The Book Of The Chronicles Of The Kings Of Judah

This was a real royal record book, but it has not survived to today.

Kings mentions this same source book more than thirty times across its chapters.

It was likely an official court history, separate from the biblical books of Chronicles.

The Bible openly points readers to sources beyond its own text.

📚 A real record book, now lost

🔁 Kings cites this source repeatedly

🏛️ Likely an official court history

➡️ The Bible points beyond its own text

## 😴 Hezekiah Slept With His Fathers

This is a common Old Testament idiom for dying peacefully.

It pictures death as simply joining ancestors who died before him.

Hezekiah does not die in battle or under judgment like some other kings.

His fifteen added years, granted back in this very chapter, run their full course.

😴 An idiom meaning died peacefully

👪 It pictures joining earlier ancestors

🕊️ He did not die in battle

📖 His fifteen added years ran their course

## 👑 Manasseh His Son Reigned In His Stead

Manasseh becomes one of Judah's most wicked kings in the very next chapter.

He is likely one of the sons born during Hezekiah's fifteen added years.

The father who tore down idols is followed immediately by a son who rebuilds them.

This closing line quietly sets up one of the darkest chapters still to come.

👑 Manasseh becomes a very wicked king

👶 Likely born during the added years

🔄 A faithful father, an unfaithful son

➡️ This sets up a dark chapter ahead`.trim();

export const SECOND_KINGS_TWENTY_PERSONAL_SECTIONS = parseSecondKingsTwentyRawNotes(SECOND_KINGS_TWENTY_RAW_NOTES);
