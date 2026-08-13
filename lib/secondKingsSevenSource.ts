export type SecondKingsSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsSevenRawNotes(rawText: string): SecondKingsSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsSeven\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsSeven\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsSeven\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 7:${startVerse}` : `2 Kings 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 2 Kings 7 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_SEVEN_RAW_NOTES = `# SecondKingsSeven 7:1-2
# 🥖 Tomorrow The Famine Ends
---
## 🗓️ To Morrow About This Time

Elisha names the exact day the famine will end.

To morrow means the very next day, not someday soon.

Most prophecies stay vague enough to never be tested.

This one gives Samaria a deadline it can check.

If the price does not fall by then, Elisha is proven wrong.

He risks everything on one specific day.

🗓️ Tomorrow means the next day
🎯 A specific day was named
⚠️ The prophecy could be tested
📖 Elisha staked his word on it

---

## 🥖 A Measure Of Fine Flour Be Sold For A Shekel

A measure was likely a seah, about seven quarts of grain.

A shekel was a small weight of silver used as payment.

Just one chapter earlier, this same city paid eighty pieces of silver for a donkey's head.

Fine flour selling for a single shekel would end the famine overnight.

Elisha promises abundance so sudden it seems impossible.

📏 A measure was about seven quarts
🥖 Fine flour is the good kind
💰 A shekel was a small payment
📖 The famine's worst price would vanish

---

## 🌾 Two Measures Of Barley For A Shekel

Barley was a cheaper, rougher grain than wheat flour.

It often fed animals, but poor families ate it too when money was tight.

Two full measures for one shekel meant even the cheapest grain would be plentiful again.

Elisha's promise covered rich and poor alike.

🌾 Barley was the cheaper grain
🐴 It also fed livestock
💵 Two measures for one shekel is very cheap
📖 The relief covered rich and poor

---

## 👑 A Lord On Whose Hand The King Leaned

This officer was a top royal aide, not a random bystander.

Kings in this era were sometimes physically supported by a trusted assistant.

This same man appears earlier, at the end of chapter six, right beside the king.

His closeness to power makes his doubt about Elisha's word especially costly later.

👑 He was a top royal officer
🤝 He literally supported the king's arm
🔗 He appears earlier beside the king
📖 His high position makes his doubt costly

---

## 🌧️ If The LORD Would Make Windows In Heaven

This officer mocks Elisha's promise as physically impossible.

Windows in heaven is an image borrowed from the Genesis flood.

In that story, the sky itself split open and poured out rain.

He asks whether God could really make bread fall from an open sky.

His question is not curious.

It is meant to mock.

🌧️ Windows in heaven recalls the flood
😏 He mocks Elisha's promise
🌌 He doubts bread can fall from the sky
📖 His question was meant to mock

---

## 👀 Thou Shalt See It With Thine Eyes But Shalt Not Eat Thereof

Elisha answers the mockery with a personal prophecy.

The officer will see the miracle happen exactly as promised.

He will never taste the relief he doubted.

This is not a random threat.

It grows directly out of his own scorn.

The rest of the chapter will show exactly how this happens.

👀 He will see the miracle happen
🚫 He will never eat from it
⚖️ His fate matches his own doubt
📖 The chapter will fulfill this exactly

# SecondKingsSeven 7:3-5
# 🚪 Four Men At The Gate Decide To Risk It
---
## 🩹 Four Leprous Men At The Entering In Of The Gate

Leprosy in the Bible covered a range of skin diseases, not only modern leprosy.

The law in Leviticus required lepers to live outside the main camp or city.

The entering in of the gate was the edge where the city met the outside world.

These four men were already living on the margin of Samaria's famine.

Their location put them close enough to see the empty Syrian camp later.

🩹 Leprosy meant skin disease broadly
🚧 Lepers lived outside the city
🚪 The gate marked that edge
📖 Their spot let them see the camp later

---

## 💀 Why Sit We Here Until We Die

These men are already excluded from the city because of their disease.

Even during the famine, lepers likely received the least food of anyone.

Staying where they were meant certain death by starvation.

Their question is not only despair.

It becomes the start of a plan.

🩹 They were already excluded from the city
🍽️ They likely got the least food
💀 Staying meant certain death
📖 Their question becomes a plan

---

## 🏳️ Let Us Fall Unto The Host Of The Syrians

The lepers weigh three possible endings, not two.

Entering the starving city means death.

Staying at the gate means death.

Only surrendering to the Syrian army offers any chance at all.

Fall unto here means to go over to, almost like surrendering.

If the Syrians kill them, they lose nothing they were not already losing.

⚖️ Three choices, two lead to death
🏳️ Fall unto means to surrender
🎲 Only one option offered any hope
📖 They had nothing left to lose

---

## 🌆 They Rose Up In The Twilight

Twilight gave the men some cover as they crossed toward the enemy camp.

Approaching in broad daylight would have made them easy targets for either side.

The uttermost part of the camp means its outer edge, closest to the city.

This was the spot where they expected to run into armed guards first.

🌆 Twilight offered some cover
🚶 They crossed toward the enemy camp
🏕️ The outer edge was the closest part
📖 They expected guards there first

---

## 👀 Behold, There Was No Man There

The men expected resistance and found nothing at all.

An entire military camp sat completely empty and undefended.

This silence was the first clue that something unusual had happened.

The reason for the empty camp is explained in the very next verse.

👀 They expected resistance
🏕️ The camp was fully empty
❓ The silence was the first clue
📖 The reason comes in the next verse

# SecondKingsSeven 7:6-7
# 👂 The LORD Makes Syria Hear An Army
---
## 🔊 The LORD Had Made The Host Of The Syrians To Hear A Noise

This was not a real approaching army.

God caused the sound alone, without any actual soldiers present.

The Syrians experienced a hallucination they had no way to question in the moment.

Fear can be created by sound just as easily as by sight.

🔊 God created the sound alone
🎭 No real army was coming
😨 The Syrians had no way to check
📖 Fear came through hearing, not sight

---

## 🐎 A Noise Of Chariots, And A Noise Of Horses

Chariots and horses were the loudest, most intimidating parts of an ancient army.

Large armies could be heard from far away before they were ever seen.

The noise sounded exactly like a great host, meaning an enormous army.

This is why the Syrians reacted with total panic instead of caution.

🐎 Chariots and horses meant real power
📢 Large armies could be heard far away
🎺 It sounded like a great host
📖 Total panic followed instantly

---

## 🏛️ The Kings Of The Hittites, And The Kings Of The Egyptians

The Hittites and Egyptians were two of the most powerful nations in the ancient world.

Syria itself was only a regional power by comparison.

The Syrians assumed Israel had hired outside superpowers to crush them.

This was the worst rumor they could imagine.

That is exactly why they believed it so fast.

🏛️ Hittites and Egypt were superpowers
🌍 Syria was smaller by comparison
😱 They imagined outside armies hired against them
📖 The worst rumor felt believable fast

---

## 🌆 They Arose And Fled In The Twilight

The Syrians fled at nearly the same moment the four lepers were approaching.

Their two movements crossed without either side planning it.

Fleeing at twilight gave the Syrians some cover from the darkness too.

This timing is why the lepers found the camp already empty.

⏰ Both movements happened at the same time
🌆 Twilight covered their flight too
🔀 Neither side planned to cross paths
📖 This explains the empty camp

---

## 🐴 Left Their Tents, And Their Horses, And Their Asses, Even The Camp As It Was

A fleeing army normally saves its most valuable possessions first.

Horses and pack animals were expensive and essential for war.

Leaving them behind shows the panic was total, not measured.

Everything the Syrians owned in camp became free plunder in an instant.

🐴 Horses and donkeys were valuable
🏕️ They left everything behind
😱 Their panic was total
📖 Free plunder sat waiting

---

## 🏃 Fled For Their Life

This phrase repeats to emphasize how serious their fear was.

Fled for their life means they ran to survive, not to regroup or fight.

No rearguard stayed behind to protect the retreat.

Total abandonment of the camp is confirmed one final time.

🏃 They ran purely to survive
🚫 No one stayed to fight
🔁 The verse repeats the panic for emphasis
📖 The abandonment was total

# SecondKingsSeven 7:8
# 💰 Silver And Gold In The Tents
---
## 🍞 They Went Into One Tent, And Did Eat And Drink

After years of famine, these men found a tent full of food and drink.

They ate and drank before doing anything else.

Maybe their first real meal in years.

Basic survival came before any plan or announcement.

🍞 They found food in the tent
🥤 They ate and drank first
⏳ Maybe their first real meal in years
📖 Survival came before any plan

---

## 💰 Carried Thence Silver, And Gold, And Raiment, And Went And Hid It

Once basic hunger was satisfied, the men turned to the treasure in the tent.

Raiment means clothing, especially fine or costly clothing.

They hid what they took instead of announcing what they had found.

Four men who owned almost nothing suddenly had access to real wealth.

💰 Silver and gold were real treasure
👘 Raiment means fine clothing
🤫 They hid it instead of telling anyone
📖 Men with nothing found sudden wealth

---

## 🏕️ Entered Into Another Tent, And Carried Thence Also

The men did not stop after one tent.

They moved to a second tent and repeated the same pattern.

Their instinct was still to take and hide, not yet to share the news.

This repetition sets up the change of heart in the very next verse.

🏕️ They moved to a second tent
🔁 The same pattern repeated
🤫 They still kept it secret
📖 A change of heart comes next

# SecondKingsSeven 7:9-11
# 📢 We Do Not Well To Keep Silent
---
## 😔 We Do Not Well

The men suddenly recognize their own selfishness.

They realize hoarding good news from a starving city is wrong.

Their conscience catches up with their actions.

This moment marks a real turn from taking to giving.

😔 Their conscience catches up
🙅 Hoarding the news felt wrong
🔁 They turn from taking to giving
📖 Conscience corrects their first instinct

---

## 📰 This Day Is A Day Of Good Tidings

Good tidings means news worth celebrating, not ordinary information.

An entire starving city stands to benefit from what these four men found.

Keeping silent would waste news that could save many lives.

Their words show they finally understand the size of what they found.

📰 Good tidings means news worth celebrating
🏙️ The whole city could benefit
🤐 Silence would waste it
📖 They finally grasp what they found

---

## ⏳ If We Tarry Till The Morning Light, Some Mischief Will Come Upon Us

Their motive is not purely noble.

They fear punishment if the truth comes out on its own.

Tarry means to delay or wait.

Mischief here means real trouble or harm, not a small nuisance.

Fear of consequences pushes them forward as much as conscience does.

⏳ Tarry means to delay
⚠️ Mischief means real trouble here
😨 Fear of punishment also drives them
📖 Conscience and fear worked together

---

## 🚪 Called Unto The Porter Of The City

A porter guarded the city gate and controlled who entered.

Lepers were not allowed to simply walk back inside.

They had to call from outside and pass their message through the gate.

This detail shows their exclusion had not changed, even with urgent news.

🚪 A porter guarded the gate
🚫 Lepers could not simply enter
📣 They had to call from outside
📖 Their exclusion had not changed

---

## 🐴 Horses Tied, And Asses Tied, And The Tents As They Were

The lepers describe exactly what they saw, without exaggeration.

Tied animals left behind is a strange, specific detail.

An army in genuine control would never leave its animals tied and abandoned.

This small detail helps convince the porter that something unusual truly happened.

🐴 Animals were left tied up
🏕️ Tents stood untouched
🧐 A strange and specific detail
📖 It helped prove the story was real

# SecondKingsSeven 7:12-15
# 🔍 The King Suspects A Trap
---
## 🌙 The King Arose In The Night

The king reacts immediately, even though it is the middle of the night.

His quick response shows how desperate the siege had made everyone.

He does not simply celebrate the good news.

His first instinct is suspicion, not relief.

🌙 He acted in the middle of the night
😨 The siege had made everyone desperate
🤔 His first reaction was suspicion
📖 Relief had to wait for proof

---

## 🪤 To Hide Themselves In The Field

The king suspects a trap rather than a miracle.

He believes the Syrians are hiding nearby, not truly gone.

His plan imagines Israel chasing false hope straight into an ambush.

This caution actually made good military sense after two chapters of war with Syria.

🪤 The king suspects a trap
🙈 He thinks Syria is only hiding
🎣 He fears a trap dressed as hope
📖 His caution made real military sense

---

## 🐎 Five Of The Horses That Remain, Which Are Left In The City

So few horses remained alive that the servant has to specify which ones are left.

Long sieges often forced starving cities to eat their own horses.

Sending only a handful of scouts protects most of what little strength the city has.

This small detail quietly shows how bad the famine still was.

🐎 Very few horses were left alive
🍖 Sieges often forced eating horses
🔎 Only a few scouts were sent
📖 The famine's damage still showed

---

## 🌊 They Went After Them Unto Jordan

Jordan sat a real distance from Samaria, not just outside the gate.

Reaching that far proved the Syrians were truly gone, not hiding close by.

The scouts had to travel far enough to be certain.

Their journey turned the king's suspicion into confirmed fact.

🌊 Jordan was far from Samaria
🚶 Reaching it proved a true flight
🔎 Distance confirmed there was no trick
📖 Suspicion became confirmed fact

---

## 👕 All The Way Was Full Of Garments And Vessels, Which The Syrians Had Cast Away In Their Haste

The scouts find physical proof scattered across the entire road.

Garments and vessels means clothing and equipment, valuable items in normal times.

Soldiers in genuine panic dropped what they carried instead of protecting it.

The scattered trail matches the noise driven flight described back in verse six.

👕 Garments and vessels means valuable gear
🛣️ The trail stretched the whole way
😱 Panic made them drop everything
📖 The evidence matched the noise in verse six

# SecondKingsSeven 7:16
# 📉 The Word Of The LORD Comes True
---
## 🏕️ The People Went Out, And Spoiled The Tents Of The Syrians

Spoiled here means plundered, not ruined.

The entire city, not just four lepers, now shares in the abandoned supplies.

What began as one man's suspicion ends with a whole city's relief.

The famine that opened the chapter is already breaking.

🏕️ Spoiled means plundered here
🏙️ The whole city shared the plunder
🔁 One report changed an entire city
📖 The famine was already breaking

---

## 🥖 A Measure Of Fine Flour Was Sold For A Shekel

This is the exact price Elisha named back in verse one.

Nothing about the prophecy needed adjusting or softening.

The famine that made a donkey's head cost eighty pieces of silver is completely over.

Prices this low were unthinkable the day before.

🥖 The price matched Elisha's word exactly
🫏 Compare it to the donkey head price earlier
⏳ Total reversal in a single day
📖 Nothing needed adjusting or softening

---

## ✅ According To The Word Of The LORD

This phrase confirms the prophecy came true in every detail.

The narrator pauses the story just to state the fulfillment plainly.

Elisha only spoke the words.

The outcome was never really in his own hands.

The mocking officer from verse two is about to learn this lesson personally.

✅ The prophecy came true exactly
✍️ The narrator states it plainly
🗣️ Elisha only spoke the words
📖 The mocking officer learns this next

# SecondKingsSeven 7:17-20
# ⚖️ Trodden Down In The Gate
---
## 👑 The King Appointed The Lord On Whose Hand He Leaned To Have The Charge Of The Gate

The king places his own top officer in charge of the gate.

This assignment was likely meant as an honor, not a punishment.

No one plans for the prophecy to be fulfilled at that exact spot.

It happens anyway.

👑 The king placed him at the gate
🎖️ It was likely meant as an honor
🎯 No one planned the outcome
📖 It happened anyway

---

## 👣 The People Trode Upon Him In The Gate, And He Died

Trode means trampled or trodden underfoot.

Starving crowds rushing toward food at the gate crushed the man controlling access to it.

The very crowd he was assigned to manage became the cause of his death.

His position of honor turned into the exact place of his death.

👣 Trode means trampled
🏃 Crowds rushed toward the food
💥 The crowd he managed killed him
📖 Honor turned into his death

---

## 🔗 As The Man Of God Had Said, Who Spake When The King Came Down To Him

The narrator explicitly ties this death back to Elisha's earlier words.

Man of God is another title used for a true prophet.

This link makes clear the death was not random or coincidental.

The story wants the reader to see the prophecy land exactly.

🔗 The narrator ties this back to Elisha
🙏 Man of God means a true prophet
🎯 The death was not random
📖 The prophecy landed exactly

---

## 🔁 It Came To Pass As The Man Of God Had Spoken

Verses eighteen and nineteen repeat the prophecy from the start of the chapter almost word for word.

Ancient writers often used repetition like this to prove a point beyond doubt.

Repeating both the price prophecy and the officer's punishment leaves no room for coincidence.

The Bible wants the reader to notice this repetition is deliberate.

🔁 The prophecy repeats almost word for word
📜 Ancient writers used repetition to prove a point
🎯 No coincidence is left possible
📖 The repetition is deliberate

---

## ✅ And So It Fell Out Unto Him

This closing line confirms the outcome matched Elisha's prophecy exactly.

The doubting officer saw the miracle with his own eyes.

He still never tasted the relief himself.

His mocking question and his death are now permanently linked.

✅ The prophecy matched exactly
👀 He saw the miracle happen
🚫 He never tasted the relief
📖 His mockery and his death are linked
`.trim();

export const SECOND_KINGS_SEVEN_PERSONAL_SECTIONS = parseSecondKingsSevenRawNotes(SECOND_KINGS_SEVEN_RAW_NOTES);
