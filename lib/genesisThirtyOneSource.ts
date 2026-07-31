export type GenesisThirtyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtyOneRawNotes(rawText: string): GenesisThirtyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+31:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 31 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+31:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+31:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 31 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 31,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 31:${startVerse}` : `Genesis 31:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 Genesis 31 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_ONE_RAW_NOTES = `# Genesis 31:1-3
# 👂 Overhearing The Resentment
---
## 😠 All That Was Our Father's

Laban's sons say Jacob has taken everything that used to belong to their father.

That sounds like a charge of theft.

Genesis thirty already showed how Jacob's flocks multiplied through God's own plan, not through stealing.

Envy often turns a blessing into an accusation.

These sons are not reporting a crime.

They are venting resentment they cannot explain any other way.

😠 The sons speak out of envy

📜 Chapter thirty already explains the wealth

💰 Jacob's growth came from God, not theft

📖 Envy reframes blessing as a crime

## 🙂 The Countenance Of Laban

"Countenance" means the look on someone's face, especially the mood that look reveals.

Jacob does not need Laban to say a word.

He can read the change on his face alone.

A warm welcome had turned cold.

This is the kind of quiet warning most people recognize before an argument ever starts.

🙂 Countenance means the look on a face

❄️ Laban's warmth had turned cold

👀 Jacob reads the danger silently

➡️ Faces often warn before words do

## 🏠 I Will Be With Thee

God speaks directly into a tense, unsafe moment.

The command is simple, go home.

The promise attached to it is just as simple, I will be with thee.

Jacob had heard almost this same promise years earlier at Bethel, when he was running away from home with nothing.

Now God repeats it as Jacob prepares to run back.

The same voice that sent him out now calls him home.

🏠 God commands a return home

🤝 The promise matches Bethel's earlier one

🔁 God sent him out, now calls him back

📖 God's presence covers the whole journey

# Genesis 31:4-9
# 🐑 Jacob Makes His Case
---
## 🐑 Called Rachel And Leah To The Field

Jacob calls a private meeting far from Laban's house.

The flock, out in the open field, was the one place Laban was unlikely to overhear.

Everything Jacob is about to say could get him thrown out with nothing if Laban heard it first.

This meeting is a plan, not a casual chat.

🐑 The field was Jacob's safe location

🤫 Laban could not overhear them there

📋 Jacob is building a careful plan

➡️ Privacy protected the whole family's safety

## 👀 I See Your Father's Countenance

Jacob repeats the same word already explained in verse two, "countenance."

He tells his own wives what he has already noticed himself.

Before asking them to leave everything they know, he explains exactly why.

He is not hiding the risk from them.

👀 Jacob repeats the countenance warning

🗣️ He tells his wives the truth

🚪 He is honest before asking them to leave

📖 Honesty comes before the big decision

## 💪 With All My Power I Have Served Your Father

Jacob is not exaggerating.

Genesis twenty nine and thirty already showed fourteen years of labor for his wives and six more for his flocks.

He served with everything he had, and Laban still changed the deal on him.

Loyalty did not earn him fair treatment.

💪 Jacob served with full effort

📚 Fourteen years plus six years already shown

⚖️ Full effort still met unfair treatment

📖 Jacob's honesty contrasts with Laban's schemes

## 🔟 Changed My Wages Ten Times

"Ten times" is not a rough guess.

It is Jacob's way of saying Laban broke the agreement again and again, not just once.

Every time Jacob's flocks started to prosper under one arrangement, Laban would shift the terms.

God kept protecting Jacob anyway, arrangement after arrangement.

🔟 Ten times means repeated broken deals

🔁 Laban kept shifting the terms

🛡️ God protected Jacob through every change

📖 Repeated unfairness could not stop God's plan

## 🐐 Then All The Cattle Bare Speckled

This recalls the exact wage deal from Genesis thirty.

Whatever animal type Laban assigned as Jacob's payment, the flocks would suddenly start producing exactly that pattern.

That was not luck or a clever breeding trick.

Jacob is naming it plainly here as God controlling the outcome every single time.

🐐 Recalls the wage deal from chapter thirty

🎯 Flocks matched whatever Laban assigned

🚫 Not luck or a clever trick

📖 God controlled the outcome each time

## 🙌 God Hath Taken Away The Cattle

Jacob gives credit to God, not to his own skill.

He could have claimed he outsmarted Laban.

Instead he says plainly that God moved the wealth from Laban's flocks into his own.

That is the whole point Jacob wants his wives to understand before they leave.

🙌 Jacob credits God, not himself

🚫 He does not claim clever skill

💰 Wealth moved by God's hand

➡️ This truth matters before they leave

# Genesis 31:10-13
# 🐏 The Dream Of The Ringstraked Rams
---
## 💤 I Saw In A Dream

Jacob is not just retelling a memory now.

He is revealing that God had already shown him the outcome before it happened.

The speckled and ringstraked pattern in verse eight was not something Jacob figured out on his own.

God had shown it to him first in a dream.

💤 God revealed the pattern in a dream

⏳ This came before it actually happened

🐑 Matches the wage deal from verse eight

📖 Jacob's plan really began with God

## 📛 Here Am I

Being called by name in scripture usually signals an important moment.

Jacob's answer, here am I, is short and ready.

Abraham gave that same response when God tested him in Genesis twenty two.

It is a phrase that means full attention and full willingness to listen.

📛 Being called by name marks importance

🗣️ Here am I means full attention

🔁 Abraham used this same phrase

➡️ Jacob answers with ready obedience

## 👁️ I Have Seen All That Laban Doeth Unto Thee

God is not only revealing the future to Jacob.

He is also confirming that He already saw every unfair thing Laban had done.

Nothing about the ten wage changes went unnoticed.

Jacob was never alone in that unfairness, even when it felt that way.

👁️ God saw every unfair change

🚫 Nothing went unnoticed by God

🤝 Jacob was never truly alone

📖 God notices what people endure quietly

## 🪜 I Am The God Of Bethel

Bethel was the place in Genesis twenty eight where Jacob first fled from Esau.

He arrived with nothing and saw a ladder reaching to heaven there.

By naming that place now, God reminds Jacob exactly who is speaking and what was already promised there.

The same God who met a frightened runaway years ago is now the one commanding a confident return.

🪜 Bethel recalls Jacob's flight in Genesis twenty eight

🔁 Same God, same promise, years apart

🧭 The command now is to leave for home

📖 God's past promises anchor this new command

# Genesis 31:14-16
# 👩 Rachel And Leah Answer
---
## 👧 Any Portion Or Inheritance For Us

Daughters in this culture normally expected some inheritance from their father alongside any sons.

Rachel and Leah answer with a question that already contains its own sad answer, no.

They know there is nothing left for them at home.

👧 Daughters expected some family inheritance

❓ Their question already means no

🏠 Nothing remains for them at home

➡️ Their answer settles the decision quickly

## 🚪 Counted Of Him Strangers

"Strangers" here does not mean unfamiliar people.

It means Laban has started treating his own daughters like outsiders with no real claim on the family wealth.

They believe he used the bride price paid for them as his own money.

Nothing was ever set aside for them instead.

🚪 Strangers means treated like outsiders

💸 Laban kept their bride price himself

👎 Their own father shut them out

📖 Family loyalty had already been broken

## 🤝 Whatsoever God Hath Said Unto Thee, Do

Rachel and Leah do not need to be convinced twice.

They agree completely with Jacob and give him their full support to leave.

Their answer is short and direct, whatever God said, do it.

For once, the whole family agrees without argument.

🤝 Rachel and Leah fully agree

✅ Their answer is short and direct

👪 The whole family is united here

➡️ Support from home makes the plan possible

# Genesis 31:17-21
# 🐫 The Flight Toward Gilead
---
## 🐫 Set His Sons And His Wives Upon Camels

This single sentence covers Jacob quietly organizing an entire household for a long journey.

Wives, children, servants, and animals all had to move together at once.

Nothing about this trip could be undone once it began.

🐫 The whole household moves together

👨‍👩‍👧‍👦 Wives, children, and servants all included

🚶 This journey could not be undone

➡️ A big decision, acted on fully

## 🗺️ Which He Had Gotten In Padanaram

"Padanaram" is the region around Laban's home in upper Mesopotamia, where Jacob had lived and worked for twenty years.

Every animal and every possession Jacob owned had been earned there, under Laban's roof.

He is not sneaking away with things that were never his.

He is simply taking what is legitimately his own.

🗺️ Padanaram is Laban's home region

📆 Twenty years of earned belongings

🚫 Not stolen goods, but rightful pay

📖 Leaving with what he actually earned

## 🗿 Rachel Had Stolen The Images

These "images" were small household idols, often called teraphim.

They were sometimes kept as family gods or as proof of who headed a household.

Rachel takes them without telling Jacob.

This detail creates a real problem later in the chapter.

Jacob has no idea his own household now holds stolen property.

🗿 Images means small household idols

🤫 Rachel acted without telling Jacob

⚠️ This creates trouble later in the chapter

📖 A secret Jacob does not even know about

## 🤐 He Told Him Not That He Fled

Jacob leaves without warning Laban at all.

Given the state of their relationship, an open goodbye likely would have turned into a fight or worse.

Silence here was a survival choice, not simple rudeness.

🤐 No warning given to Laban

⚔️ An open goodbye risked real danger

🛡️ Silence protected the whole family

➡️ Sometimes leaving quietly is the safer path

## 🧭 Set His Face Toward The Mount Gilead

"The river" here means the Euphrates, a major crossing point separating Padanaram from the land toward Canaan.

"Set his face toward" is an old way of saying Jacob committed fully to that direction, without looking back.

Gilead marks the edge of the promised land, the place this whole flight has aimed for since verse three.

🌊 The river means the Euphrates

🧭 Set his face means full commitment

🗺️ Gilead sits at Canaan's edge

📖 Every step aims back toward the promise

# Genesis 31:22-25
# 🐎 Laban's Pursuit
---
## 📆 Told Laban On The Third Day

A three day head start sounds generous, but Laban's home was far from Gilead.

Jacob's whole household, moving slowly with flocks and children, still could not outrun a man traveling light with fresh riders.

The gap was closing fast no matter how far ahead Jacob had gotten.

📆 Three days before Laban even learns

🐫 Jacob's group moves slowly with flocks

🐎 Laban's pursuers travel much faster

➡️ Distance alone could not guarantee safety

## 👥 Pursued After Him Seven Days' Journey

Laban does not travel alone.

He brings enough men with him to make this look like a serious confrontation, not a family visit.

Seven days of hard travel shows exactly how far Laban was willing to go to get answers.

👥 Laban brings armed relatives along

⚔️ This looks like a real confrontation

📆 Seven days shows real determination

➡️ Laban meant this as a serious threat

## 🗣️ Speak Not To Jacob Either Good Or Bad

This phrase means Laban is told not to say anything at all.

Not a blessing, not a curse, not kindness, not a threat.

God intervenes directly to protect Jacob before Laban even arrives.

Laban worships other gods throughout this chapter, yet even he receives a clear warning from the true God.

🗣️ Good or bad means say nothing at all

🛡️ God protects Jacob before the meeting

🌙 The warning comes through a dream

📖 God can restrain anyone, even Laban

## ⛰️ Pitched In The Mount Of Gilead

Both camps now sit on the very same mountain.

The chase is finally over, but the tension is only beginning.

Whatever happens next will happen face to face, not from a distance.

⛰️ Both camps now share Gilead

🏁 The chase itself has ended

😬 Real tension is only starting

➡️ The next scene happens face to face

# Genesis 31:26-30
# 😡 Laban's Accusation
---
## ⚔️ Captives Taken With The Sword

Laban compares Jacob's quiet departure to a violent kidnapping.

That comparison is not accurate, since Rachel and Leah agreed to leave willingly back in verse sixteen.

Laban is using dramatic language here to make himself look wronged.

⚔️ Laban compares this to a kidnapping

🙅 Rachel and Leah actually agreed to go

🎭 Laban exaggerates to seem wronged

➡️ Strong words do not always match the truth

## 🥁 With Mirth, And With Songs, With Tabret, And With Harp

A "tabret" is a small hand drum, paired here with a harp to describe a joyful farewell celebration.

Laban claims he would have thrown a proper going away party.

Given how he had already changed Jacob's wages ten times, that claim is hard to believe.

🥁 A tabret is a small hand drum

🎶 Laban claims he wanted a celebration

🤨 His past actions make that doubtful

📖 Words can claim more than actions showed

## 🙄 Thou Hast Now Done Foolishly

Laban frames Jacob's quiet exit as a foolish mistake rather than a necessary escape.

From Jacob's side, staying any longer under an unfair employer was the real risk.

Two very different versions of the same story sit side by side here.

🙄 Laban calls the exit foolish

🏃 Jacob saw staying as the real risk

⚖️ Two opposite versions of one story

➡️ Perspective shapes how blame gets assigned

## 🌙 God Spake Unto Me Yesternight

Laban admits out loud that God warned him personally, the same warning already described back in verse twenty four.

Even in anger, Laban knows he cannot act on his threat.

His own words confirm that God is actively restraining him right now.

🌙 Laban repeats God's own warning

😤 His anger is real but restrained

🛑 He admits he cannot act on it

📖 God's warning controls this whole scene

## 🗿 Wherefore Hast Thou Stolen My Gods

This is the real accusation Laban has been building toward.

He calls his household idols "my gods," revealing exactly what he actually worships.

Jacob has no idea Rachel took them, which sets up genuine danger in the verses that follow.

🗿 My gods reveals Laban's true worship

❓ This is Laban's real accusation

😨 Jacob has no idea Rachel is guilty

➡️ An innocent answer is about to get risky

# Genesis 31:31-35
# 🔍 The Search For The Stolen Gods
---
## 😨 Because I Was Afraid

"Peradventure" is an old word meaning "perhaps" or "what if."

Jacob explains that fear, not disrespect, drove his silent exit.

He genuinely believed Laban might have used force to keep his daughters from leaving.

😨 Peradventure means perhaps or what if

🏃 Fear explains the silent departure

⚔️ Jacob feared Laban might use force

➡️ Fear can explain choices that look strange

## ⚖️ Let Him Not Live

Jacob makes this promise with total confidence, since he has no idea anyone in his camp actually took anything.

He is putting a death sentence on the table without realizing his own wife is guilty.

This is one of the most dangerous accidental vows in all of Genesis.

⚖️ Jacob makes a death vow confidently

😳 He does not know Rachel is guilty

⚠️ A dangerous vow made by accident

📖 Confidence without knowledge can be risky

## 🏕️ Entered Into Rachel's Tent

Laban searches every tent in order, moving closer to where the idols actually are the whole time.

The tension in this scene builds with every tent that comes up empty.

Only one tent is left to search.

🏕️ Laban searches tent by tent

🔎 Each empty tent raises the tension

🎯 Rachel's tent is searched last

➡️ The danger keeps getting closer

## 🐫 Put Them In The Camel's Furniture

"Camel's furniture" means the saddle or seat used for riding, a hollow enough space to hide small objects underneath.

Rachel hides the stolen idols there and simply sits on top of them.

It is a clever, calm hiding spot in the middle of a very tense search.

🐫 Camel's furniture means the riding saddle

🙈 Rachel hides the idols underneath it

😌 She stays calm through the search

📖 A clever hiding place under real pressure

## 🩸 The Custom Of Women Is Upon Me

Rachel uses her monthly cycle as an excuse to stay seated.

Standing up in this culture would have exposed the hidden idols.

Laban, out of respect for that custom, does not ask her to move.

Her plan works completely.

Jacob has no idea how close that death vow came to being carried out.

🩸 Custom of women means her monthly cycle

🙅 That excuse keeps her from standing

🎭 Laban respects the custom without question

➡️ The whole plan succeeds by a narrow margin

# Genesis 31:36-42
# 🔥 Jacob's Furious Defense
---
## 🔥 Jacob Was Wroth, And Chode With Laban

"Wroth" is an old word for deep, burning anger.

"Chode" means he argued sharply, not just complained quietly.

Twenty years of unfair treatment finally reach a breaking point in this moment.

🔥 Wroth means deep burning anger

🗣️ Chode means a sharp argument

📆 Twenty years led to this moment

➡️ Patience has a limit for anyone

## ❓ What Is My Trespass

Jacob turns the accusation back around with a direct question.

He has been chased for seven days like a criminal, yet nothing stolen has actually turned up in the search.

His question demands real proof instead of vague suspicion.

❓ Jacob demands real proof

🏃 He was chased like a criminal

🔍 Nothing stolen was actually found

📖 Suspicion is not the same as guilt

## 👥 That They May Judge Betwixt Us Both

Jacob calls for a public hearing instead of a private argument.

He wants both families to serve as witnesses.

A decision made in front of everyone carries real weight.

Nobody could dismiss it later as one side's word against the other.

👥 Jacob calls for public witnesses

⚖️ He wants a fair, open judgment

🚫 No hiding behind private accusations

➡️ Public witnesses protect the truth

## 🐑 Thy Ewes And Thy She Goats Have Not Cast Their Young

A hired shepherd could normally use a stillborn or attacked animal for food.

Losses like that were often expected as part of the job.

Jacob says his flocks never lost a single lamb.

He never once took an animal from Laban's flock for himself.

He held himself to a far higher standard than his job required.

🐑 Losses were normally expected in this job

🚫 Jacob's flocks never lost a lamb

🚷 He never ate from Laban's flock

📖 He worked far beyond what was required

## 💰 I Bare The Loss Of It

Normal shepherding contracts allowed a shepherd to bring back remains as proof.

A predator kill shown as proof cleared him of blame for the loss.

Jacob instead personally covered every single loss himself.

That held true whether an animal went missing by day or by night.

🐺 Predator losses were normally excused

💰 Jacob personally covered every loss

🌓 This held true day and night

➡️ He absorbed risk that was not his

## ☀️ The Drought Consumed Me, And The Frost By Night

Jacob describes brutal working conditions, scorching heat all day and freezing cold all night.

"My sleep departed" means he stayed awake watching the flocks through the night.

He did this himself instead of trusting the job to hired help.

This is the physical cost behind twenty years of loyal, exhausting labor.

☀️ Drought means brutal daytime heat

🌙 Frost describes freezing night cold

😴 Sleep departed means no real rest

📖 Loyalty here came at a real cost

## 🔢 Fourteen Years For Thy Two Daughters, And Six Years For Thy Cattle

Jacob adds up the whole bill out loud.

Fourteen years were paid for Rachel and Leah.

Six more years were paid for the flocks.

Laban kept shifting the payment terms the entire time.

Saying the exact numbers out loud makes the unfairness impossible to dismiss.

🔢 Fourteen years plus six years total

👰 Fourteen years paid for his wives

🐑 Six years paid for the flocks

📖 Exact numbers make unfairness undeniable

## 🙌 Surely Thou Hadst Sent Me Away Now Empty

Jacob names God three ways here.

The God of his father, the God of Abraham, and the fear of Isaac.

Three generations of family faith stand behind that one claim.

He says plainly that without that God's protection, he would be walking away right now with nothing.

God is the true reason Jacob survived twenty years under Laban, not his own cleverness.

📜 Three names stack three generations of faith

🛡️ Without God, Jacob would have nothing

🙌 God gets the real credit here

📖 Survival came from God, not cleverness

# Genesis 31:43-45
# 🪨 A Covenant Between Them
---
## 👨‍👧 These Daughters Are My Daughters

Laban still claims everything as his own, even after Jacob's whole defense.

He never actually admits any wrongdoing.

Still, his tone has clearly shifted from threat to resignation.

👨‍👧 Laban still claims everything as his

🚫 No real apology is given

😔 His tone shifts toward resignation

➡️ Pride can outlast an argument someone loses

## 🤝 Let Us Make A Covenant

Instead of continuing the fight, Laban proposes a formal agreement.

A "covenant" here is a binding promise sealed in front of witnesses.

It was meant to prevent either side from causing harm later.

Both men choose peace over an ongoing feud.

🤝 A covenant means a binding promise

👀 Witnesses make it enforceable

🕊️ Both men choose peace here

📖 A formal deal replaces open conflict

## 🪨 Set It Up For A Pillar

A single upright stone served as a simple, lasting marker in the ancient world.

It was easy to point to for generations afterward.

Jacob had already done this once before at Bethel, back when he fled Esau with nothing.

This is now the second major pillar he sets up in his life.

🪨 A pillar was a lasting stone marker

🔁 Jacob set one up before at Bethel

📍 This marks a second major moment

➡️ Stones outlast the memory of any conversation

# Genesis 31:46-50
# 🍽️ The Heap Of Witness
---
## 🍽️ They Did Eat There Upon The Heap

Building a heap of stones together sealed this agreement.

Sharing a meal on top of it sealed it further.

That worked the way a signature seals a contract today.

Eating together after a serious conflict showed real trust on both sides.

🪨 A stone heap sealed the agreement

🍽️ Sharing a meal confirmed the trust

📜 This worked like signing a contract

➡️ Shared meals ended shared conflict

## 🗣️ Jegarsahadutha... But Jacob Called It Galeed

Laban names the heap in Aramaic, his own language, while Jacob names it in Hebrew.

Both names actually mean the exact same thing, "heap of witness."

Two men from two backgrounds still land on the identical meaning for this one moment.

🗣️ Two different languages, same heap

📖 Both names mean heap of witness

🌍 Laban spoke Aramaic, Jacob spoke Hebrew

➡️ Shared meaning crossed a language divide

## 📍 This Heap Is A Witness

"Galeed" becomes the lasting name for this place.

It is later remembered as part of the region called Gilead.

The stones themselves cannot speak.

Everyone who sees them afterward will remember exactly what was promised here.

📍 Galeed becomes this place's lasting name

🗺️ It connects to the region Gilead

🪨 Silent stones still carry real memory

📖 A place can preserve a promise

## 🗼 The LORD Watch Between Me And Thee

"Mizpah" means "watchtower," and this verse is where the popular phrase "the Mizpah blessing" actually comes from.

Many people today use it to mean a warm goodbye between friends.

In its original setting, it is closer to a warning.

God is watching both of us even after we walk away from each other.

🗼 Mizpah means watchtower

❤️ Often misused today as a warm blessing

👁️ Originally meant God watches both sides

📖 Distance never removes God's attention

## 🛡️ If Thou Shalt Afflict My Daughters

Laban adds specific conditions to the covenant.

Rachel and Leah are protected from mistreatment.

Jacob is barred from marrying any wives beyond them.

Even a flawed, self serving father still protects his daughters.

🛡️ Laban protects his daughters by name

🚫 No mistreatment allowed going forward

👰 No additional wives beside them

➡️ Flawed people can still protect those they love

# Genesis 31:51-55
# 🕊️ Parting In Peace
---
## 🪨 Behold This Heap, And Behold This Pillar

Laban points to both markers together.

One is the heap of stones from verse forty six.

The other is the pillar Jacob raised in verse forty five.

Together they form one visible boundary neither man may cross with harm.

🪨 Two markers combine into one boundary

📍 The heap and the pillar together

🚧 Neither side may cross with harm

➡️ A visible line backs up a spoken promise

## 🗺️ This Heap And This Pillar Unto Me, For Harm

This works like the ancient version of drawing a border between two nations.

Laban represents the people east of this line.

Jacob's family represents the people west of it.

This boundary keeps both sides at peace going forward.

🗺️ This functions like a national border

🧭 Laban's people stay east of the line

🏕️ Jacob's family stays west of it

📖 A border can protect peace, not just land

## 👴 The God Of Abraham, And The God Of Nahor

Laban calls on the God of Abraham and the God of Nahor together.

Nahor's family had drifted toward worshiping other gods over the generations.

Jacob swears only by "the fear of his father Isaac."

That title is used nowhere else in Genesis.

It points to the deep reverence Isaac held for the one true God.

👴 Abraham and Nahor share one grandfather

🌍 Nahor's line had drifted toward other gods

🙏 Jacob swears only by Isaac's God

📖 One family, two very different paths of faith

## 🔥 Offered Sacrifice Upon The Mount

A shared sacrifice closes out the covenant.

A shared meal follows it, the same way it did back in verse forty six.

Two men nearly had a violent confrontation on this exact mountain.

Now they sit down and eat together instead.

🔥 A sacrifice formally closes the covenant

🍞 A shared meal follows the sacrifice

🤝 Former rivals now eat together

➡️ A meal ends what a chase almost started

## 👋 Laban Departed, And Returned Unto His Place

This is the last time Laban ever appears in the whole Bible.

He leaves with a kiss and a blessing instead of the anger he arrived with only days earlier.

Twenty years of a complicated, often unfair relationship end here quietly, with peace instead of a final fight.

👋 Laban's final appearance in scripture

💋 He leaves with a kiss and blessing

📆 Twenty years end without one last fight

📖 Complicated relationships can still end in peace
`.trim();

export const GENESIS_THIRTY_ONE_PERSONAL_SECTIONS = parseGenesisThirtyOneRawNotes(GENESIS_THIRTY_ONE_RAW_NOTES);
