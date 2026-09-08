export type PsalmsFiftySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFiftySixRawNotes(rawText: string): PsalmsFiftySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFiftySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+56:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 56 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+56:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+56:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 56 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 56,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 56:${startVerse}` : `Psalms 56:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 56 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FIFTY_SIX_RAW_NOTES = `# Psalms 56:1-4
# 🛡️ Trust Under Attack
---
## 🙏 Be Merciful Unto Me, O God

"Man" here does not mean people in general.

It points to specific enemies closing in on David.

David wrote this psalm after fleeing to Gath, a Philistine city.

First Samuel chapter 21 records David escaping there from King Saul.

Gath was the hometown of Goliath, the giant David had killed.

The king's men recognized David and brought him before their ruler.

This prayer begins in the middle of real, immediate danger.

🙏 David prays for mercy from God

⚔️ Man means specific real enemies

🏙️ David had fled to Gath

📖 This danger was real, not vague

## 😤 He Fighting Daily Oppresseth Me

"Oppresseth" means to crush someone down with constant pressure.

This is not a single attack David is describing.

It is relentless pressure that returns again every day.

David feels squeezed on every side without any relief.

Fear like this wears a person down slowly over time.

That kind of exhaustion is why he opens with a plea for mercy.

😤 Oppresseth means constant crushing pressure

🔁 The attack repeats every single day

😩 David feels squeezed without relief

📖 Constant pressure explains his plea for mercy

## ⚔️ For They Be Many That Fight Against Me

David is not describing one lone attacker.

"They be many" means a whole group is working against him.

This may point to Philistine soldiers surrounding him in Gath.

Facing a crowd of enemies is far more frightening than facing one.

Yet David brings this exact fear straight to God in prayer.

Naming the size of the threat makes the prayer feel more honest.

👥 They be many means a group

🏹 Possibly Philistine soldiers surrounding him

😨 A crowd is scarier than one foe

📖 David brings this fear honestly to God

## 👑 O Thou Most High

"Most High" translates a Hebrew title for God, Elyon.

It means God stands above every earthly king and power.

David says this while standing before an actual Philistine king.

He is quietly reminding himself who truly holds authority.

No human ruler outranks the God David serves.

That truth steadies him even while surrounded by danger.

👑 Most High translates the name Elyon

🌍 God stands above every earthly power

🤴 David stood before a Philistine king

📖 No ruler outranks the God he serves

## 😨 What Time I Am Afraid, I Will Trust In Thee

Fear and trust are not opposites in this verse.

David admits he is genuinely afraid, without pretending otherwise.

"What time" is an old way of saying whenever fear comes.

He is not promising he will never feel fear again.

He is choosing where to place his trust each time fear arrives.

Real faith can hold fear and trust in the same breath.

😨 David admits real, honest fear

⏰ What time means whenever fear comes

🤝 Trust is a choice, not a feeling

📖 Fear and trust can coexist

## 📜 In God I Will Praise His Word

"His word" means God's spoken promise, not a written page.

David is not praising God for something vague or general.

He is praising God specifically for a promise God has made him.

This kind of praise stands on something solid, not on a feeling.

The rest of the psalm will lean hard on that same promise.

📜 His word means God's spoken promise

🎯 David praises a specific promise

🪨 This praise stands on something solid

📖 The whole psalm leans on that promise

## 💪 I Will Not Fear What Flesh Can Do Unto Me

"Flesh" here simply means mortal human beings.

David is putting mere people up against Almighty God.

Compared to God's power, human threats shrink down to size.

This is not David denying that people can hurt him.

It means their power has a limit that God's power does not.

That comparison is what actually calms his fear.

💪 Flesh here means mortal humans

⚖️ David compares people to Almighty God

📉 Human power shrinks next to God's

📖 That comparison is what calms him

# Psalms 56:5-9
# 😢 Every Tear In His Book
---
## 🌀 Every Day They Wrest My Words

"Wrest" means to twist something until it says what you want.

David's enemies are not simply disagreeing with him.

They are deliberately distorting his words to make him look guilty.

This happens constantly, not just once in an argument.

Twisting someone's words is a quiet, ongoing form of attack.

🌀 Wrest means twisting words on purpose

🎭 Enemies distort what David actually says

🔁 This twisting happens again and again

📖 Word twisting is a quiet attack

## 😈 All Their Thoughts Are Against Me For Evil

This is not one bad thought or one angry moment.

David describes an entire pattern of thinking aimed against him.

Every plan his enemies make is bent toward harming him.

There is no hidden goodwill underneath their actions.

Naming this plainly helps David see the danger clearly.

😈 Every thought aims to harm him

🎯 This is a pattern, not one moment

🚫 No hidden goodwill exists underneath

📖 Naming the danger helps David see clearly

## 🕵️ They Gather Themselves Together, They Hide Themselves

This describes a group secretly planning together against David.

"Hide themselves" pictures men waiting in ambush, out of sight.

This is not open conflict on a battlefield.

It is quiet plotting meant to catch David off guard.

Hidden threats are often more frightening than open ones.

🕵️ Enemies gather and plot in secret

🙈 Hide themselves pictures a hidden ambush

⚔️ This is plotting, not open battle

📖 Hidden threats frighten more than open ones

## 👣 They Mark My Steps, When They Wait For My Soul

"Mark my steps" means they are watching everywhere David goes.

"Soul" here means David's very life, not just his feelings.

His enemies are not after an argument or an apology.

They are waiting for the chance to take his life.

Knowing the true stakes explains why David prays so urgently.

👣 Mark my steps means constant watching

❤️ Soul here means David's actual life

🗡️ Enemies want his life, not an apology

📖 Real stakes explain his urgent prayer

## ⚖️ Shall They Escape By Iniquity

This is a question, not a statement of defeat.

David is asking God whether evil will simply go unanswered.

He already expects the answer to be no.

"Iniquity" means deliberate wrongdoing, not an honest mistake.

Asking this question is really an appeal for justice.

❓ This is a question, not defeat

⚖️ David asks if evil goes unanswered

🎯 Iniquity means deliberate wrongdoing

📖 The question is really an appeal

## 🔥 In Thine Anger Cast Down The People

David is not asking God to punish innocent bystanders.

"The people" refers to the specific enemies plotting against him.

He is asking God to act as a righteous judge.

This prayer trusts God's anger more than David's own revenge.

Leaving justice to God is different from seeking it himself.

🔥 God's anger means righteous judgment

🎯 The people means his actual enemies

⚖️ David seeks justice, not revenge

📖 He leaves judgment in God's hands

## 📓 Thou Tellest My Wanderings

"Wanderings" points to David's years running from place to place.

"Tellest" means God has counted and recorded every one of them.

Nothing about David's exile has gone unnoticed by God.

Every hiding place and every narrow escape has been seen.

That kind of attention comforts someone who feels forgotten.

📓 Wanderings means David's years on the run

🔢 Tellest means God has counted them all

👀 Nothing about his exile went unseen

📖 God's attention comforts the forgotten

## 🍶 Put Thou My Tears Into Thy Bottle

This is a picture, not a claim about an actual bottle.

Many scholars believe it pictures God treasuring every tear like a keepsake.

"Are they not in thy book" adds a second matching picture.

A book was where important records were kept and remembered.

Together, the bottle and the book both say the same thing.

Not one tear David has cried has gone unnoticed by God.

🍶 The bottle pictures tears kept safe

📔 The book pictures tears remembered

💧 Neither tears nor sorrow go unnoticed

📖 God treasures grief instead of ignoring it

## 🙌 When I Cry Unto Thee

This line marks the moment David turns from complaint to prayer.

Crying out is not a last resort for David.

It is the exact reason his enemies eventually pull back.

David is not claiming that his own strength defeats them.

God's response to his cry is what changes the outcome.

🙌 David turns from complaint to prayer

🔄 Enemies retreat because of God's answer

💪 Not David's strength, but God's response

📖 Prayer changes the outcome, not force

## ✅ This I Know For God Is For Me

David does not say he hopes this is true.

He says plainly that he knows it.

This confidence is not based on how the battle looks right now.

It is based on who God has already proven Himself to be.

Certainty like this comes from trust built over time.

✅ David states this as certain knowledge

🙏 His confidence is not just a feeling

📚 It rests on who God has proven

📖 Real trust is built, not sudden

# Psalms 56:10-13
# 🌅 Walking In The Light Of The Living
---
## 🔁 In God Will I Praise His Word

This line repeats what David already said back in verse four.

"God" and "the LORD" name the same God in two different ways.

"God" points to His power over all things.

"LORD" translates His personal covenant name, Yahweh.

Repeating the refrain marks a fresh return to confidence.

The psalm is built around this same promise, said twice.

🔁 This refrain repeats verse four

👑 God highlights His power over all

🤝 LORD is His personal covenant name

📖 The psalm turns twice on this promise

## 🛡️ In God Have I Put My Trust

David already said this same thing earlier in the psalm.

Repeating it is not empty repetition.

It shows his trust has held steady through the whole prayer.

Fear rose and fell across these verses.

This trust did not move.

Saying it twice makes the claim stronger, not weaker.

🛡️ David repeats this trust on purpose

📈 Fear rose, but trust stayed steady

🔂 Repetition makes the claim stronger

📖 Steady trust survives the whole prayer

## 🧍 I Will Not Be Afraid What Man Can Do Unto Me

Earlier David said flesh cannot ultimately harm him.

Now he says the same thing using the word man.

Both words point to the same limited, mortal enemy.

Whatever people do to him cannot outlast this life.

That limit is exactly what lets David rest instead of panic.

🧍 Man here matches flesh from before

⏳ Human power is limited, not endless

😌 That limit lets David rest instead of panic

📖 God's power outlasts every human threat

## 📿 Thy Vows Are Upon Me, O God

A vow was a serious promise made to God, often during trouble.

People often vowed to bring an offering if God delivered them.

"Upon me" means David now owes God this promise.

He is not treating the vow lightly or as optional.

Deliverance and duty are tied together in this verse.

🙏 A vow was a serious promise

📦 Often promised in exchange for deliverance

✅ Upon me means the debt is owed

📖 Deliverance and duty are tied together

## 🎶 I Will Render Praises Unto Thee

"Render" means to give back something that is owed.

David is not offering praise as an extra, optional gift.

He sees it as paying back exactly what he promised.

This turns his worship into a form of keeping his word.

Praise here is both worship and honesty combined.

🎶 Render means giving back what is owed

🤝 Praise here fulfills his earlier vow

📜 Worship becomes a form of honesty

📖 David keeps his word through praise

## 🕯️ Thou Hast Delivered My Soul From Death

David speaks of this rescue as something already finished.

"Soul" again means his actual life, not just his feelings.

He is not asking for a future deliverance here.

He is thanking God for a rescue that already happened.

That confidence shapes the tone of the whole closing section.

🕯️ Delivered means already rescued, not hoped for

❤️ Soul means his actual life

🙌 David thanks God, not merely asks

📖 Confidence shapes the whole closing section

## 🦶 Wilt Not Thou Deliver My Feet From Falling

"Feet from falling" is a picture of staying steady in daily life.

David has already thanked God for saving his life.

Now he asks for something smaller.

This time, it is steady footing for daily life.

Big rescues and small steadiness both matter to David.

He trusts God with the huge danger and the daily walk alike.

🦶 Feet from falling means daily steadiness

🙏 David asks for ongoing, not just past, help

🪨 Big rescue and small steadiness both matter

📖 God is trusted with both

## 🌅 That I May Walk Before God In The Light Of The Living

"Walk before God" means living openly in His presence.

"The light of the living" simply means life itself, not death.

David began this psalm certain his enemies might kill him.

He ends it certain he will keep on living in God's presence.

The psalm that opened in fear closes in confident, ongoing life.

🌅 Walk before God means living in His presence

💡 Light of the living simply means life

🔄 The psalm turns from fear to confidence

📖 It ends in ongoing life, not death
`.trim();

export const PSALMS_FIFTY_SIX_PERSONAL_SECTIONS = parsePsalmsFiftySixRawNotes(PSALMS_FIFTY_SIX_RAW_NOTES);
