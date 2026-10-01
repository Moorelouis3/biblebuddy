export type JeremiahThirtyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahThirtyTwoRawNotes(rawText: string): JeremiahThirtyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahThirtyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+32:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 32 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+32:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+32:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 32 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 32,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 32:${startVerse}` : `Jeremiah 32:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Jeremiah 32 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_THIRTY_TWO_RAW_NOTES = `# Jeremiah 32:1-5
# ⛓️ Jeremiah Imprisoned During The Siege
---
## 📅 The Tenth Year Of Zedekiah King Of Judah

This verse marks the exact year with two different calendars.

Zedekiah was the king of Judah at this time.

Babylon had placed him on that throne years earlier.

His tenth year matches Nebuchadrezzar's eighteenth year as king of Babylon.

Jeremiah is writing from deep inside a losing war.

📅 Two calendars mark one year
👑 Zedekiah was Babylon's chosen king
⚔️ His reign ends in open war
📖 Jeremiah writes from inside the siege

## 🏰 The King Of Babylon's Army Besieged Jerusalem

To besiege a city means surrounding it completely and cutting off supplies.

Nebuchadrezzar's army camped outside Jerusalem's walls for a long stretch of time.

No food or help could get in or out during that time.

Starvation inside the walls became its own slow weapon.

🏰 Besieged means surrounded and cut off
🚫 No food or help could enter
⏳ The siege dragged on for months
📖 Starvation became its own weapon

## 🏛️ Shut Up In The Court Of The Prison

Jeremiah was not thrown into a dark dungeon cell.

The court of the prison was a guarded courtyard inside the king's own palace complex.

He could still receive visitors and even make a legal purchase from there.

His imprisonment was closer to house arrest than to a true dungeon.

🏛️ Not a dark dungeon cell
🚶 Visitors could still reach him
📜 He could still conduct business
➡️ This was closer to house arrest

## 🗣️ Speak With Him Mouth To Mouth

This idiom simply means a face to face meeting with no one in between.

Zedekiah would stand directly in front of Nebuchadrezzar himself.

Second Kings records what actually happened at that meeting.

Zedekiah's sons were killed before his own eyes, and then his eyes were put out.

He never saw Babylon with his own sight again, even though he was led there.

🗣️ Mouth to mouth means face to face
👁️ Zedekiah would stand before the king
💔 His sons were killed before him
📖 He was blinded right after that sight

## 🏷️ Though Ye Fight With The Chaldeans Ye Shall Not Prosper

Chaldeans is another name for the Babylonians in this book.

Zedekiah's soldiers were still fighting even as Jeremiah spoke.

God states plainly that resistance will not change the outcome.

The city's fall was already decided before the final battle ended.

🏷️ Chaldeans means the Babylonians
⚔️ Judah's soldiers kept fighting anyway
🔒 The outcome was already fixed
➡️ Resistance could not change what God decided

# Jeremiah 32:6-8
# 👴 Hanameel's Offer
---
## 👴 Hanameel The Son Of Shallum Thine Uncle

Hanameel was Jeremiah's first cousin, not a stranger off the street.

Shallum, Hanameel's father, was Jeremiah's own uncle.

God had already told Jeremiah this exact visit was coming before it happened.

A real family member walks straight into the fulfillment of a real prophecy.

👴 Hanameel was Jeremiah's first cousin
👨‍👦 Shallum was Jeremiah's own uncle
🔮 God predicted this visit in advance
📖 Family and prophecy meet in one moment

## ⚖️ The Right Of Redemption Is Thine To Buy It

Redemption here is a legal term, not just a religious one.

Israel's law let land be bought back inside the extended family whenever it was sold.

This kept property from permanently leaving a family's hands.

As the nearest relative with that right, Jeremiah was first in line to buy it.

Buying the field was simply following the law of the land, not a strange act.

⚖️ Redemption means a legal buyback right
🏡 Land was meant to stay in families
👪 Jeremiah was the nearest eligible relative
📖 This purchase followed ordinary Israelite law

## ✅ Then I Knew That This Was The Word Of The LORD

A true prophet's words were tested by whether they actually came to pass.

Jeremiah had already heard about this field days or weeks before Hanameel ever arrived.

When his cousin's exact words matched what God had already said, doubt disappeared.

Confirmation came through an ordinary family visit, not through a dramatic sign.

✅ True prophecy is tested by fulfillment
⏳ The word came before the visit
👴 Hanameel's words matched it exactly
📖 Confirmation came through an ordinary moment

# Jeremiah 32:9-12
# ⚖️ Jeremiah Buys The Field
---
## ⚖️ Weighed Him The Money, Even Seventeen Shekels Of Silver

A shekel was a unit of weight, not yet a minted coin.

Silver was weighed out on a balance scale like produce at a market.

Seventeen shekels was a modest price, fitting a small plot of family land.

This was a real cash transaction, not a symbolic gesture.

⚖️ A shekel was a unit of weight
💰 Silver was weighed, not counted as coins
🏡 Seventeen shekels fit a small plot
📖 This was a real cash sale

## ✍️ Subscribed The Evidence, And Sealed It

To subscribe here means to sign the document, confirming its contents.

Sealing meant pressing a signet into soft clay or wax to mark it as official.

Witnesses stood by to confirm the sale was done honestly and openly.

This process worked much like signing papers at a courthouse today.

✍️ Subscribed means signed the document
🔏 Sealing marked it as official
👀 Witnesses confirmed a fair sale
📖 This matched a modern closing

## 📜 That Which Was Sealed According To The Law And Custom

Legal purchases in this culture often used two copies of the same deed.

One copy was sealed shut, protected from damage or tampering over time.

Jeremiah mentions a second copy as well, left open for easy reference.

Keeping both versions protected the sale from being challenged later.

📜 One deed was sealed shut
🔓 A second copy stayed open
🛡️ Both guarded against future disputes
📖 Careful records protected the sale

## ✍️ Baruch The Son Of Neriah

Baruch was Jeremiah's personal scribe and close companion.

He appears again later in this book, writing down Jeremiah's spoken prophecies by hand.

Entrusting him with this legal deed shows how much Jeremiah relied on him.

Baruch's own faithfulness helped preserve Jeremiah's words for every reader since.

✍️ Baruch was Jeremiah's trusted scribe
📖 He later wrote down Jeremiah's prophecies
🤝 Jeremiah relied on him completely
➡️ His faithfulness preserved these words for us

# Jeremiah 32:13-15
# 🏺 Sealed For Many Days
---
## 👑 The LORD Of Hosts, The God Of Israel

LORD of hosts pictures God as the commander of heaven's armies.

This title is repeated twice in only two verses here.

The repetition adds weight to a command that otherwise sounds strange.

Buying land in a city about to fall only makes sense under full divine authority.

👑 LORD of hosts means heaven's commander
🔁 The title repeats twice here
💪 Repetition adds weight to the command
📖 Full authority backs a strange order

## 🏺 Put Them In An Earthen Vessel, That They May Continue Many Days

An earthen vessel was simply a sealed clay jar.

Clay jars kept documents safe from moisture, insects, and decay for a very long time.

Centuries later, the Dead Sea Scrolls were found preserved the exact same way.

God is planning for these deeds to outlast the coming exile itself.

🏺 Earthen vessel means a clay jar
🛡️ Clay protected documents for centuries
📜 Scrolls were preserved the same way
📖 God planned past the coming exile

## 🏡 Houses And Fields And Vineyards Shall Be Possessed Again In This Land

This promise looks past the coming disaster to ordinary life on the other side.

Normal buying and selling of land will matter again someday.

Jeremiah's own small purchase becomes proof that the promise is real.

Hope here is not vague, it is tied to one actual field with a real deed.

🏡 Houses and fields return someday
🍇 Vineyards picture ordinary daily life
📜 One small deed proves the promise
➡️ Hope is tied to something real

# Jeremiah 32:16-19
# 🙏 Jeremiah's Prayer Begins
---
## 💪 There Is Nothing Too Hard For Thee

Jeremiah begins his prayer by naming God's limitless power first.

He has just bought a field in a city about to fall to Babylon.

Stating this truth out loud is how Jeremiah works through his own confusion.

God will later echo this exact phrase back to him as a direct answer.

💪 God's power opens the prayer
🏚️ The city is about to fall
🙏 Prayer helps work through confusion
📖 God later echoes this phrase back

## ❤️ Thou Shewest Lovingkindness Unto Thousands

Lovingkindness describes loyal, covenant love that keeps a promise over time.

It is far stronger than simple affection or a passing feeling.

This love reaches down through generation after generation of a family.

Jeremiah's own cousin showing up to sell him a field is a small example of that same loyalty.

❤️ Lovingkindness means loyal covenant love
⏳ It lasts far beyond one lifetime
👪 It reaches many generations at once
📖 Even Hanameel's visit reflects that loyalty

## 🚫 Recompensest The Iniquity Of The Fathers Into The Bosom Of Their Children

This does not mean God punishes a child for a parent's specific private sin.

Other scripture states plainly that each person answers for their own guilt.

What this line describes is how sin's damage spreads into a family's whole future.

Idol worship, broken homes, and national disaster all land on the children too.

The children inherit the consequences, even when they did not choose the sin.

🚫 Not punishment for someone else's guilt
🌊 Sin's damage spreads into a family
💔 Children inherit real consequences
📖 Consequences outlast the sin itself

## 👁️ Thine Eyes Are Open Upon All The Ways Of The Sons Of Men

Nothing any person does ever happens outside of God's attention.

This includes Zedekiah's rebellion, Judah's idolatry, and Jeremiah's own quiet obedience.

God judges each person by what they actually did, not by assumption.

Full awareness and fair judgment go together in this verse.

👁️ Nothing escapes God's attention
⚖️ Each person is judged honestly
🌍 This covers every human action
📖 Awareness and justice go together

# Jeremiah 32:20-25
# 😕 A Confusing Command
---
## 🐸 Signs And Wonders In The Land Of Egypt

This phrase points back to the ten plagues before the exodus.

Water turning to blood, frogs, locusts, and darkness all displayed God's raw power.

Jeremiah brings up ancient history to remind God, and himself, of a proven track record.

The God who did that in Egypt has not grown weaker since then.

🐸 Signs and wonders means the plagues
💧 Water, frogs, and locusts showed power
📜 Jeremiah recalls a proven track record
📖 That same power has not faded

## 🐑 A Land Flowing With Milk And Honey

This is a figure of speech, not a literal river of either substance.

Milk pictures healthy herds and plenty of grazing land.

Honey pictures a land rich and fertile enough to support wild bees naturally.

Together the phrase simply means abundant, livable, fertile land.

🐑 Milk pictures healthy herds
🍯 Honey pictures natural fertility
🌾 Together they mean real abundance
📖 This describes a livable, fertile land

## 🔄 They Obeyed Not Thy Voice

This is the hinge of the whole prayer, the turn from gift to disaster.

God gave the land freely, but the people refused to follow His instructions.

Jeremiah does not blame bad luck or an unfair God for what came next.

He names simple disobedience as the real reason for everything happening now.

🔄 This is the prayer's turning point
🎁 God gave the land freely
🚫 The people refused to obey
📖 Disobedience caused what followed

## ⛰️ Behold The Mounts, They Are Come Unto The City To Take It

Mounts here means siege ramps, mounds of packed earth built against a city wall.

Babylonian soldiers piled dirt higher and higher until it reached the top of the wall.

Attackers could then walk straight over the wall instead of breaking through a gate.

Jeremiah could likely see this very construction from where he sat imprisoned.

⛰️ Mounts means packed earth siege ramps
🧱 Ramps let soldiers climb the wall
👀 Jeremiah may have watched it rise
📖 The threat was visibly, physically close

## ❓ Buy Thee The Field For Money, And Take Witnesses

Jeremiah repeats God's own strange instruction back to Him almost in disbelief.

He has just finished describing a city already surrounded and about to fall.

Buying land under those conditions looks like throwing money away.

Jeremiah is not rejecting the command, he is simply confessing how little sense it makes to him.

❓ Jeremiah questions his own instructions
💸 The purchase looks like wasted money
🏚️ The city is already surrounded
➡️ Confusion does not stop his obedience

# Jeremiah 32:26-29
# 💥 God Answers The Question
---
## 🌍 The God Of All Flesh

This title stretches far beyond Israel alone.

God claims authority over every nation, including Babylon itself.

The same God directing Judah's punishment also controls Babylon's every move.

No empire acts outside His reach, however powerful it looks.

🌍 All flesh means every nation
👑 Babylon is under this same authority
⚖️ One God directs every outcome
📖 No empire escapes His reach

## 🔁 Is There Any Thing Too Hard For Me

God repeats Jeremiah's own words from verse seventeen back to him almost exactly.

Jeremiah had opened his prayer by stating that nothing is too hard for God.

Now God turns that same confession into the direct answer to Jeremiah's confusion.

Buying the field was never irrational, it was simply ahead of what Jeremiah could yet see.

🔁 God repeats Jeremiah's own words
🙏 Jeremiah said this first in prayer
💡 God turns it into the answer
📖 The purchase was ahead of its time

## 🏠 Upon Whose Roofs They Have Offered Incense Unto Baal

Flat rooftops in this culture were common gathering spaces, not just storage.

Some households set up small shrines there to burn incense to Baal.

Baal was a Canaanite storm and fertility god, a constant rival to the LORD.

The coming fire would destroy the very rooftops used for that worship.

🏠 Flat roofs served as gathering space
🔥 Some held shrines to Baal
⛈️ Baal was a rival storm god
📖 Fire would end that worship too

# Jeremiah 32:30-35
# 📋 The Charge Sheet
---
## 👶 Have Only Done Evil Before Me From Their Youth

Youth here points back to Israel's earliest days as a young nation.

Even fresh out of slavery in Egypt, the pattern of rebellion had already started.

This was never a single bad generation or one unlucky king.

The whole history, from the very beginning, carried this same thread.

👶 Youth means the nation's earliest days
🐫 Rebellion began right after Egypt
📜 This spans the whole history
📖 One long thread, not one bad king

## 🙂 Turned Unto Me The Back, And Not The Face

In this culture, facing someone showed respect and attention.

Turning your back on someone showed rejection and contempt.

Judah is pictured here walking away from God entirely, not just disagreeing.

Posture itself becomes the image of a broken relationship.

🙂 Facing someone showed respect
🙁 Turning away showed rejection
🚶 Judah walked away from God
📖 Posture pictures a broken relationship

## 🏛️ Set Their Abominations In The House, Which Is Called By My Name

The house here is the Jerusalem temple, God's own dwelling place among His people.

Abominations means detestable idols, placed inside that same sacred building.

This was not quiet unfaithfulness out in the countryside.

It was open defiance carried straight into God's own house.

🏛️ The house means the temple itself
🗿 Abominations means detestable idols
😱 Idols sat inside God's own house
📖 This was open, public defiance

## 🔥 To Cause Their Sons And Their Daughters To Pass Through The Fire Unto Molech

Molech was a pagan god worshiped by child sacrifice.

Parents burned their own children alive as an offering to this idol.

This horror happened in the valley of Hinnom, just outside Jerusalem's walls.

That same valley later became pictured as a place of fire and ruin.

🔥 Molech worship meant child sacrifice
👶 Parents sacrificed their own children
🏞️ This happened in the valley of Hinnom
📖 A real valley became a lasting warning

## 🚫 Which I Commanded Them Not, Neither Came It Into My Mind

This line protects against a terrible misunderstanding.

God never ordered, suggested, or inspired child sacrifice in any form.

The people invented this horror entirely on their own.

God's anger here comes from how far they drifted, not from any idea of His own.

🚫 God never commanded this practice
💭 It was never His idea at all
😡 The horror was entirely invented
➡️ Drifting this far provoked real anger

# Jeremiah 32:36-41
# 🕊️ The Everlasting Covenant
---
## 🌍 I Will Gather Them Out Of All Countries

The exile was about to scatter Judah's people across many foreign lands.

This promise looks past that scattering to a future regathering.

God names Himself as the one who drove them out in anger.

He also names Himself as the one who will bring them back.

🌍 Scattering was about to begin
🔙 God promises a future regathering
😡 He drove them out in anger
📖 The same God brings them home

## ⚔️ I Will Cause Them To Dwell Safely

Right now, the opposite of safety surrounds Jeremiah on every side.

Famine, siege, and fire fill the chapter up to this point.

This promise speaks directly into that exact fear.

A future of real safety is set against a present full of danger.

⚔️ Danger fills the present moment
🔥 Famine and fire surround the city
🏡 Safety is promised for later
📖 Hope answers a very real fear

## 💔 I Will Give Them One Heart, And One Way

Judah's worship had splintered into many gods and many shrines.

One heart pictures a single, undivided devotion to the LORD alone.

One way pictures a shared direction instead of scattered private paths.

This directly reverses the Baal worship and child sacrifice just described.

💔 Worship had splintered badly
❤️ One heart means undivided devotion
🧭 One way means a shared direction
📖 This reverses the earlier idolatry

## 🤝 I Will Make An Everlasting Covenant With Them

A covenant is a binding promise between two parties.

The earlier covenant at Sinai had been broken again and again.

Jeremiah already described this same new, lasting covenant one chapter earlier.

This one is called everlasting because God Himself guarantees it will hold.

🤝 A covenant is a binding promise
💔 The old covenant kept breaking
📜 Chapter thirty one named this covenant first
📖 God Himself guarantees this one holds

## 😊 I Will Rejoice Over Them To Do Them Good

This line arrives right after pages of judgment and anger.

God is not describing grim duty here, He is describing real joy.

Whole heart and whole soul means total, undivided feeling, not a partial gesture.

The same God who judged sin fully also loves fully.

😊 God describes real joy here
📖 This follows pages of judgment
❤️ Whole heart and soul means total feeling
➡️ Judgment and love both belong to Him

# Jeremiah 32:42-44
# 🌾 Fields Will Be Bought Again
---
## ⚖️ So Will I Bring Upon Them All The Good That I Have Promised Them

God draws a direct balance between the evil already sent and the good still coming.

The same certainty that brought judgment also guarantees this future blessing.

Nothing about this promise is vague or merely hopeful wishing.

It carries the same weight as the destruction Jeremiah has already witnessed firsthand.

⚖️ God balances past evil with future good
🔒 Both promises carry equal certainty
🚫 This is not vague wishing
📖 Blessing is as sure as judgment was

## 🏚️ It Is Desolate Without Man Or Beast

This describes Judah's land exactly as it would look very soon.

No people and no animals left to work or graze it.

Silence and emptiness would replace farms, flocks, and villages.

God names this exact devastation before promising to reverse it.

🏚️ Desolate means empty and lifeless
🐑 No people or animals remain
🤫 Silence replaces farms and villages
📖 God names the ruin before reversing it

## 📜 Subscribe Evidences, And Seal Them, And Take Witnesses

This repeats the exact steps Jeremiah followed earlier in this very chapter.

His one small purchase becomes the pattern for an entire nation's future.

Ordinary legal transactions becoming common again is itself a sign of restored peace.

What felt like a strange, lonely act becomes the first of countless normal ones.

📜 This repeats Jeremiah's own steps
🏡 One purchase becomes a national pattern
🤝 Ordinary deals signal restored peace
📖 A lonely act becomes the first of many

## ⛓️ I Will Cause Their Captivity To Return

Captivity returning means the exile itself will one day end.

The people driven out to Babylon will eventually be brought back home.

This closing promise answers everything the chapter has described.

Jeremiah's field in Anathoth becomes proof that this ending is already certain.

⛓️ Captivity means the coming exile
🏠 The exile will eventually end
🔑 Jeremiah's field proves the ending is certain
📖 Chapter thirty two closes on real hope
`.trim();

export const JEREMIAH_THIRTY_TWO_PERSONAL_SECTIONS = parseJeremiahThirtyTwoRawNotes(JEREMIAH_THIRTY_TWO_RAW_NOTES);
