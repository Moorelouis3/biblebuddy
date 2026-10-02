export type EzekielSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielSeventeenRawNotes(rawText: string): EzekielSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 17:${startVerse}` : `Ezekiel 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 17 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_SEVENTEEN_RAW_NOTES = `# Ezekiel 17:1-6
# 🦅 The First Eagle Takes The Top
---
## 🧩 Put Forth A Riddle, And Speak A Parable

A riddle hides a meaning inside a puzzle the listener has to work out.

A parable teaches a deeper lesson through a short story.

God tells Ezekiel to wrap this hard message inside both at once.

The people will have to think before they understand what God means.

🧩 A riddle hides a meaning inside a puzzle
📘 A parable teaches through a short story
🤔 The people must think before they understand
➡️ The meaning comes only after the thinking

## 🦅 A Great Eagle With Great Wings, Longwinged, Full Of Feathers

An eagle this large was a well known symbol for a mighty king in the ancient world.

Great wings and long wings both point to the same idea, a kingdom that can reach very far.

Full of feathers pictures a king fully equipped with resources and strength.

This eagle stands for the king of Babylon, strong enough to reach all the way to Jerusalem.

🦅 An eagle pictures a mighty king
🪽 Great wings and long wings mean wide reach
💪 Full of feathers means fully equipped
📖 This eagle stands for the king of Babylon

## 🌈 Which Had Divers Colours

"Divers" is an old word that simply means various or many different kinds.

This eagle displays many colors, a picture of royal wealth and splendor.

Babylon ruled over many conquered peoples and gathered riches from all of them.

The colors picture a whole empire built from many different nations.

🌈 Divers means many different kinds
👑 Many colors picture royal wealth
💰 Babylon gathered riches from conquered lands
➡️ The colors picture a whole empire

## 🌲 Came Unto Lebanon

Lebanon was a region famous for its tall cedar trees.

Those cedars were prized wood, strong and sweet smelling, often used to build palaces and temples.

Prophets sometimes used Lebanon as a stand in for Jerusalem and its temple.

The eagle arriving at Lebanon pictures Babylon arriving at Jerusalem itself.

🌲 Lebanon was famous for its cedar trees
🏛️ Cedar built palaces and temples
🗺️ Lebanon often stood for Jerusalem
📖 The eagle arrives at Jerusalem itself

## 🌳 Took The Highest Branch Of The Cedar

The cedar tree pictures the royal family of David ruling in Jerusalem.

The highest branch is the one currently sitting on the throne.

Taking that branch means removing the reigning king from power.

This points to King Jehoiachin, carried off to Babylon in a real historical event.

🌳 The cedar pictures David's royal family
👑 The highest branch is the reigning king
✂️ Taking the branch means removing the king
📖 This points to King Jehoiachin's exile

## 🌿 He Cropped Off The Top Of His Young Twigs

Young twigs picture the younger members of the royal household.

Cropping them off means Babylon took them away along with the king.

A whole generation of royal family left the land at once.

The family tree of David was suddenly missing several branches.

🌿 Young twigs mean younger royal family members
✂️ Babylon took them along with the king
👪 A whole generation left the land
📖 David's family tree lost several branches

## 💱 Carried It Into A Land Of Traffick, He Set It In A City Of Merchants

"Traffick" is an old word for trade and business.

Babylon was famous across the ancient world as a center of trade.

The exiled royal family did not go to some forgotten backwater.

They went to one of the richest, busiest cities on earth.

💱 Traffick means trade and business
🏙️ Babylon was a famous trading center
🚫 This was not a forgotten backwater
➡️ They went to one of earth's richest cities

## 🌱 Took Also Of The Seed Of The Land

"Seed" here means another descendant left behind from the royal line.

This second branch is a different person than the king already taken away.

Historically, this is Zedekiah, placed on the throne after Jehoiachin was exiled.

God still had a plan running through this one remaining branch.

🌱 Seed means a remaining royal descendant
👤 This is a different person than the king
📜 Historically, this is Zedekiah
📖 God still worked through this branch

## 🌾 Planted It In A Fruitful Field, By Great Waters

A fruitful field by great waters describes ideal growing conditions.

Zedekiah's kingdom was not thrown into chaos or poverty right away.

Babylon actually set him up with real resources to succeed as a loyal vassal.

The arrangement only worked if that loyalty held.

🌾 Fruitful field means ideal growing conditions
💧 Great waters means real resources available
🤝 Babylon set him up to succeed
➡️ Success depended on staying loyal

## 🌳 Set It As A Willow Tree

A willow grows fast but never grows as tall or strong as a cedar.

Planting the royal line as a willow instead of a cedar was deliberate.

Babylon wanted a kingdom that could grow some, but never grow powerful again.

Jerusalem was meant to stay small on purpose.

🌳 A willow never grows like a cedar
📏 This was a deliberate, smaller planting
🚫 Babylon did not want Jerusalem powerful
📖 Jerusalem was meant to stay small

## 📉 Became A Spreading Vine Of Low Stature, Whose Branches Turned Toward Him

"Low stature" means small and unable to rise high.

A vine like this cannot stand on its own.

It depends on something else for support.

The branches turning toward Babylon picture forced loyalty.

Roots sitting under Babylon's control show how little freedom this kingdom had.

📉 Low stature means small, unable to rise
🧎 A vine cannot stand on its own
🔗 Branches toward Babylon picture forced loyalty
📖 This kingdom had very little freedom

# Ezekiel 17:7-10
# 🦅 The Second Eagle And A Question
---
## 🦅 Another Great Eagle With Great Wings And Many Feathers

A second powerful eagle enters the story, representing another great empire.

Historically, this eagle stands for Egypt and its Pharaoh.

Judah's leaders hoped Egypt could rescue them from Babylon's grip.

The riddle is building toward a warning about trusting the wrong power.

🦅 A second eagle pictures another empire
🏺 This eagle stands for Egypt
🙏 Judah hoped Egypt could rescue them
➡️ The riddle warns against trusting it

## 🌿 This Vine Did Bend Her Roots Toward Him

The vine, Zedekiah's kingdom, was already planted and cared for by Babylon.

Bending its roots toward the new eagle pictures turning away from that loyalty.

This matches the real history of Zedekiah secretly seeking Egypt's help.

A plant cannot serve two different sources of water at once.

🌿 The vine was already planted by Babylon
🔄 Bending roots pictures turning away from loyalty
🤫 Zedekiah secretly sought Egypt's help
📖 A plant cannot serve two sources at once

## 💧 That He Might Water It By The Furrows Of Her Plantation

"Furrows" are the small trenches cut into a field to carry water to crops.

The vine is reaching for a different water supply than the one that already fed it.

This pictures Zedekiah reaching for Egypt's army instead of trusting his sworn word to Babylon.

Reaching for help from a new source does not erase an old promise.

💧 Furrows are trenches that carry water
🔀 The vine reaches for a new supply
⚔️ This pictures reaching for Egypt's army
📖 A new ally does not erase a promise

## 🌾 It Was Planted In A Good Soil By Great Waters

This line reminds the reader that the vine already had everything it needed.

Good soil and great waters describe conditions set up for real success.

Zedekiah was not trapped in a hopeless or starving position before he rebelled.

He was comfortable under Babylon and chose to risk that comfort anyway.

🌾 The vine already had everything it needed
💧 Good soil and water meant real success
😌 Zedekiah was not trapped or starving
➡️ He risked comfort he already had

## ❓ Shall It Prosper?

This question is not really a question, it already carries its own answer.

God uses this same rhetorical style throughout Ezekiel to make a point land harder.

The honest answer the people already know is no.

Asking it out loud forces the listener to admit what they already suspect.

❓ The question already carries its own answer
📣 Ezekiel often uses this style
🙅 The honest answer is no
📖 It forces the listener to admit the truth

## 🌱 It Shall Wither In All The Leaves Of Her Spring

"Spring" here means the fresh new growth a plant puts out in its growing season.

Withering in its own fresh growth means total failure, not just a setback.

The vine will not even get the chance to mature or bear fruit.

Rebellion against the covenant ends the story before it can really begin.

🌱 Spring means fresh new growth
🥀 Withering here means total failure
🚫 It never gets the chance to mature
➡️ Rebellion ends the story early

## 💪 Without Great Power Or Many People To Pluck It Up

Normally, destroying an established vine would take real effort and many hands.

This vine will not need any of that.

It will wither and die on its own, from the inside, because of the broken promise.

The weakness is built into the rebellion itself, not into an outside attack.

💪 Normally destroying a vine takes real effort
🚫 This vine will not need that
🥀 It dies on its own, from within
📖 Weakness is built into the rebellion itself

## 🌬️ When The East Wind Toucheth It

In this region, the east wind blew hot and dry straight off the desert.

Prophets often used the east wind as a picture of God's own judgment arriving.

Even a light touch from that wind finishes off an already weak plant.

God does not need a storm to bring down something already failing.

🌬️ The east wind blew hot and dry
⚖️ Prophets pictured it as God's judgment
🥀 Even a light touch finishes a weak plant
📖 No storm needed to finish what already fails

# Ezekiel 17:11-15
# 👑 What The Riddle Really Means
---
## 🏚️ Say Now To The Rebellious House

God often calls Israel "the rebellious house" throughout the book of Ezekiel.

The title is blunt on purpose, meant to confront rather than soften the message.

Riddles and parables are now set aside for plain, direct speech.

God wants no room left for the people to misunderstand what He means.

🏚️ Rebellious house is Ezekiel's blunt name for Israel
🗣️ The title confronts rather than softens
📣 God now speaks in plain words
➡️ No room is left for confusion

## ❓ Know Ye Not What These Things Mean?

God asks this as a real challenge, not a gentle invitation.

The riddle was never meant to stay a mystery forever.

He is about to explain every piece of it in plain language.

The people have run out of excuses to misunderstand what has been happening.

❓ This is a real challenge, not an invitation
🧩 The riddle was never meant to stay hidden
📜 God explains it fully in plain words
➡️ No more excuses for misunderstanding remain

## 👑 Hath Taken The King Thereof, And The Princes Thereof

This names the real historical event hiding behind the riddle.

King Jehoiachin and the leading men of Jerusalem's royal court were taken captive.

This happened in a real invasion around the year 597 BC.

The eagle picture now has a plain name attached to it.

👑 Jehoiachin and his officials were taken captive
📅 This happened around 597 BC
🏛️ The royal court lost its leaders
📖 The eagle now has a plain name

## 🏙️ Led Them With Him To Babylon

Taking captives back to the conqueror's own capital was common practice in this period.

It displayed the conquering king's power to his own people back home.

It also made rebellion harder, since key leaders were now hostages far from home.

Jerusalem lost its king and its voice of leadership in one single stroke.

🏙️ Captives displayed Babylon's own power
🔒 Key leaders became hostages far from home
🚫 Rebellion became much harder to organize
📖 Jerusalem lost its leadership in one stroke

## 📜 Made A Covenant With Him, And Hath Taken An Oath Of Him

A covenant here is a formal treaty between a greater king and a lesser one.

Babylon allowed Zedekiah to rule as a vassal king instead of destroying Jerusalem completely.

The oath was sworn using God's own name, according to the history in Second Chronicles.

Breaking this treaty later meant breaking a promise made in God's name, not just a political deal.

📜 A covenant is a formal ruler's treaty
👑 Zedekiah ruled as a vassal king
🙏 The oath was sworn in God's name
📖 Breaking it broke more than politics

## 💪 Taken The Mighty Of The Land

Babylon also removed the strongest and most capable people from Jerusalem.

Skilled workers, soldiers, and leaders were taken along with the royal family.

This weakened any chance of Jerusalem organizing real resistance later.

A kingdom without its strongest people struggles to stand on its own.

💪 The strongest people were removed too
🛠️ Skilled workers and leaders were taken
🛡️ This weakened any future resistance
📖 A kingdom needs its strongest people to stand

## 📉 That The Kingdom Might Be Base

"Base" here means low and humble, not wicked.

Babylon wanted Jerusalem weak enough that it could never again threaten its power.

Keeping a conquered kingdom small and dependent was a known political strategy in the ancient world.

Zedekiah's whole reign was designed to go nowhere by someone else's plan.

📉 Base means low and humble here
🎯 Babylon wanted Jerusalem permanently weak
🗺️ Keeping conquered lands small was common strategy
➡️ Zedekiah's reign was designed to stay small

## 🤝 By Keeping Of His Covenant It Might Stand

There was actually one way for this small, weakened kingdom to survive.

Staying loyal to the treaty with Babylon was that one way.

Survival was possible, just not on Jerusalem's own preferred terms.

The whole tragedy of this chapter is that this one condition did not hold.

🤝 One path to survival still existed
📜 Loyalty to the treaty was that path
😔 Survival meant accepting Babylon's terms
📖 The tragedy is that loyalty did not hold

## ✉️ He Rebelled Against Him In Sending His Ambassadors Into Egypt

Zedekiah broke his sworn word by quietly asking Egypt for military help.

Second Kings records this same rebellion as real history, not just a riddle detail.

Sending ambassadors means he pursued this through official channels, not in a sudden outburst.

This was a planned political betrayal, not a moment of panic.

✉️ Zedekiah secretly asked Egypt for help
📚 Second Kings records this same event
🕵️ Ambassadors show this was planned, not sudden
📖 This was a calculated betrayal

## ❓ Shall He Break The Covenant, And Be Delivered?

This question answers itself the same way the earlier one did.

Breaking a sworn oath, especially one sworn in God's name, carries real consequences.

"Delivered" here means rescued or saved from what is coming.

The answer, already clear to the reader, is no.

❓ This question also answers itself
⚖️ Broken oaths carry real consequences
🙅 Delivered means rescued, and the answer is no
📖 God does not ignore a broken promise

# Ezekiel 17:16-18
# ⚰️ A Death Sentence In Babylon
---
## 🙏 As I Live, Saith The Lord GOD

This phrase is one of the strongest oaths God uses in the whole Bible.

God swears by His own eternal life because there is nothing greater to swear by.

When this phrase appears, the point that follows is certain, not a maybe.

Ezekiel uses it repeatedly to mark the most serious warnings in the book.

🙏 God swears by His own life here
⚖️ Nothing greater exists for God to swear by
✅ What follows is certain, not a maybe
📖 Ezekiel saves this phrase for serious warnings

## 🏙️ In The Place Where The King Dwelleth That Made Him King

This points straight to Babylon, where Nebuchadnezzar had placed Zedekiah on the throne.

Zedekiah will die in the very city that gave him his crown in the first place.

History in Second Kings confirms Zedekiah was in fact taken to Babylon after Jerusalem fell.

The place of his promotion became the place of his death.

🏙️ This points straight to Babylon
👑 Babylon had given Zedekiah his crown
📚 Second Kings confirms this really happened
📖 His rise and his death share one city

## 🏺 Neither Shall Pharaoh With His Mighty Army And Great Company Make For Him In The War

Egypt's army looked impressive from a distance, with real soldiers and real numbers.

This verse flatly predicts that impressive army will not actually show up to help.

Zedekiah gambled his whole kingdom on a rescue that was never going to arrive.

Trusting in human power instead of a kept promise cost him everything.

🏺 Egypt's army looked impressive from far away
🚫 This rescue was never going to arrive
🎲 Zedekiah gambled his kingdom on it
📖 Trusting the wrong power cost him everything

## ⛰️ Casting Up Mounts, And Building Forts

A mount here is a large ramp of packed earth built up against a city's wall.

Soldiers used mounts to reach the top of a wall during a siege.

Forts describe the temporary camps and barriers an army builds around a city it is attacking.

These are the real siege tactics Babylon used to finally break into Jerusalem.

⛰️ A mount is a packed earth ramp
🧱 Mounts let soldiers reach the wall's top
🏕️ Forts were siege camps around the city
📖 These describe Babylon's real siege tactics

## 🤝 He Had Given His Hand

Giving one's hand in this culture sealed a formal, binding agreement.

It worked the same way a signature on a contract works today.

Zedekiah had physically sealed this promise to Babylon, not just spoken it in passing.

Breaking a hand sealed oath was considered a serious act of bad faith.

🤝 Giving a hand sealed a binding agreement
✍️ It worked like signing a contract
📜 Zedekiah physically sealed this promise
📖 Breaking it was a serious betrayal

## ⚖️ He Shall Not Escape

This is the final word on the matter, stated without any softening.

Every attempt Zedekiah makes to avoid this outcome will fail.

Egypt will not save him, and the walls of Jerusalem will not hold forever.

The riddle that began this chapter has now become a plain verdict.

⚖️ This is the final, unsoftened word
🚫 Every attempt to escape will fail
🏺 Egypt will not save him
📖 The riddle has become a plain verdict

# Ezekiel 17:19-21
# 🕸️ The Net And The Snare
---
## 🙏 Mine Oath That He Hath Despised, And My Covenant That He Hath Broken

God now claims this broken treaty as His own personal business.

Zedekiah swore his oath to Babylon using God's own name as the guarantee.

That choice made God himself a witness and a party to the promise.

Breaking a political treaty became an act of direct rebellion against God.

🙏 The oath was sworn in God's name
👁️ God became a witness to the promise
⚠️ Breaking it became rebellion against God
📖 Political treaties are not outside God's reach

## 🕸️ I Will Spread My Net Upon Him, And He Shall Be Taken In My Snare

God pictured Babylon as a mighty eagle earlier in this riddle.

Now it is God who traps him, using a hunter's tools instead.

Nets and snares were common ways to catch birds and animals in this period.

God himself takes credit for this capture, not Babylon's army alone.

Historically, Zedekiah was in fact caught trying to flee near Jericho.

🕸️ Nets and snares were hunting tools
🔄 Now God turns the hunter's tools on him
👁️ God claims credit for the capture
📖 Zedekiah was really caught near Jericho

## ⚖️ Will Plead With Him There For His Trespass

"Plead" here is a courtroom word, meaning to argue a legal case.

God is not just punishing Zedekiah quietly, He is putting him formally on trial.

"Trespass" means the specific sin of breaking a sworn covenant.

Babylon becomes the courtroom, but God is the real judge in this case.

⚖️ Plead means arguing a legal case
🏛️ God puts Zedekiah formally on trial
📜 Trespass means breaking the sworn covenant
📖 God is the real judge here

## 🏃 All His Fugitives With All His Bands Shall Fall By The Sword

"Fugitives" means soldiers who try to flee once the battle turns against them.

"Bands" refers to the organized groups of Zedekiah's army.

Neither running away nor fighting as a group will save these men.

The judgment on the king spreads out to the whole army serving under him.

🏃 Fugitives means soldiers who try to flee
⚔️ Bands means his organized army groups
🚫 Neither running nor fighting saves them
📖 Judgment on the king reaches his whole army

## 🌬️ Scattered Toward All Winds

This pictures survivors pushed out in every direction at once.

No safe place is left for anyone to regroup.

Exile broke up families, tribes, and the nation's sense of home.

This same scattering happens elsewhere in the Old Testament after a broken covenant.

It describes real, painful history, not just poetic language.

🌬️ Survivors scatter in every direction
🏚️ No safe place is left to regroup
💔 Families and tribes break apart
📖 This real history followed a broken covenant

## 🔁 Ye Shall Know That I The LORD Have Spoken It

This closing phrase appears constantly throughout the book of Ezekiel.

It is God's way of saying every word of this judgment will actually come true.

The people will recognize God's hand only after the events happen, not before.

Prophecy here is not guesswork, it is a promise with God's own name attached.

🔁 This phrase repeats constantly in Ezekiel
✅ It promises the judgment will come true
👁️ Recognition comes after the events happen
📖 This promise carries God's own name

# Ezekiel 17:22-24
# 🌲 A Tender Twig Planted By God
---
## 🌳 I Will Also Take Of The Highest Branch Of The High Cedar

Earlier in this riddle, a human eagle took the highest branch for its own purposes.

Now God says He will do the exact same action himself.

This is a direct echo of verse three, but with a very different intention behind it.

What Babylon did out of conquest, God will do out of promise.

🌳 This echoes the eagle's action in verse three
🔁 God now does the same action
😈 Babylon acted out of conquest
📖 God acts out of promise instead

## 🌱 A Tender One

A tender twig is young and small, easy to overlook.

God deliberately starts His restoration plan with something that looks weak.

Other prophets later describe this same promised ruler as a small shoot from David's line.

Great things in scripture often start from the smallest, easiest to miss places.

🌱 A tender twig looks small and weak
💪 God starts with something that looks weak
👑 Other prophets link this to David's promised ruler
📖 Great things often start in small places

## 👁️ Plant It Upon An High Mountain And Eminent

"Eminent" means standing out, easily seen by everyone around it.

This new planting gets the exact opposite treatment from the humble willow planted earlier in the chapter.

God is not hiding this restoration, He is putting it somewhere impossible to miss.

The contrast with the earlier low, hidden vine could not be more complete.

👁️ Eminent means easily seen by everyone
🏔️ This planting is placed in plain view
🌿 It is the opposite of the hidden vine
📖 God puts this restoration on full display

## ⛰️ In The Mountain Of The Height Of Israel

Many readers of this prophecy connect this mountain to Mount Zion in Jerusalem.

Zion was the nation's spiritual high point, where the temple once stood.

God is promising to restore the royal line to the very place it was taken from.

The ending of this story returns to where it began.

⛰️ Many connect this to Mount Zion
🏛️ Zion was the nation's spiritual high point
🔄 God restores the line to its own place
📖 The story's ending returns to its beginning

## 🐦 Under It Shall Dwell All Fowl Of Every Wing

A grown cedar provided wide branches where many different birds could rest and nest.

This pictures many different nations finding shelter under this restored kingdom one day.

Jesus later uses this exact same picture for the kingdom of heaven in one of His parables.

A small, humble beginning grows into something that shelters far more than just one nation.

🐦 Birds nesting pictures many nations sheltered
🌳 This kingdom offers shelter to outsiders
✝️ Jesus later reuses this same picture
📖 A small start grows to shelter many

## 🔄 Brought Down The High Tree, Have Exalted The Low Tree

This verse lists four complete reversals in a row.

The proud, high tree gets brought low.

The humble, low tree gets lifted up instead.

The healthy, green tree is dried up.

The dead looking, dry tree is made to flourish.

This same reversal pattern echoes later in Hannah's prayer and Mary's song.

🔄 Four complete reversals appear in a row
⬇️ The proud tree is brought low
⬆️ The humble tree is lifted up
📖 This pattern echoes later in scripture

## 🔒 I The LORD Have Spoken And Have Done It

This closing line locks the whole chapter's promise into certainty.

God does not simply announce plans, He follows through on every one of them.

The riddle that opened this chapter ends as a settled, finished fact.

Nothing in this vision is left as a maybe.

🔒 This line locks in the promise
✅ God follows through on His plans
📖 The riddle ends as a settled fact
➡️ Nothing here is left as a maybe
`.trim();

export const EZEKIEL_SEVENTEEN_PERSONAL_SECTIONS = parseEzekielSeventeenRawNotes(EZEKIEL_SEVENTEEN_RAW_NOTES);
