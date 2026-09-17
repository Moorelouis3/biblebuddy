export type PsalmsSeventyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSeventyThreeRawNotes(rawText: string): PsalmsSeventyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSeventyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+73:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 73 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+73:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+73:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 73 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 73,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 73:${startVerse}` : `Psalms 73:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Psalms 73 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SEVENTY_THREE_RAW_NOTES = `# Psalms 73:1-3
# 😟 A Confession That Almost Slipped
---
## 🙏 Truly God Is Good To Israel

Truly signals a settled conclusion, not an opening assumption.

The psalmist reaches this statement only after wrestling through the whole chapter.

Israel here means the covenant people as a whole, not just individuals.

Reading verse one first hides that his struggle came before this certainty.

✅ Truly marks a settled conclusion

🔄 This comes after wrestling, not before

🤝 Israel means the whole covenant people

📖 The struggle is hidden by verse order

## ❤️ Even To Such As Are Of A Clean Heart

Clean heart means integrity on the inside, not simply following outward rules.

A person could keep every visible rule and still fail this test.

This verse quietly limits who the promise covers, not everyone in Israel automatically qualifies.

The rest of the psalm will test whether the psalmist's own heart stayed clean.

❤️ Clean heart means inward integrity

🚫 Outward rule keeping alone does not qualify

🎯 The promise carries a real condition

📖 The psalm tests his own heart

## 🦶 My Feet Were Almost Gone

Feet almost gone is a common Hebrew picture for losing spiritual footing.

It does not describe an actual fall, only how close he came to one.

The psalmist admits a real crisis of faith here, not a minor doubt.

This confession sets up the entire problem the rest of the psalm will work through.

🦶 Feet almost gone pictures losing footing

🚫 He did not actually fall

⚠️ This was a real crisis of faith

📖 It sets up the whole psalm

## 📉 My Steps Had Well Nigh Slipped

This line repeats the feet almost gone image, in different words.

Hebrew poetry often says one thing twice using two matching pictures.

Slipped adds the sense of losing control suddenly, not gradually.

Together both lines stress how close he came to abandoning his trust in God.

🔁 This repeats the feet almost gone

📉 Slipped adds a sense of sudden loss

⚠️ Both lines stress how close he came

📖 He nearly abandoned his trust in God

## 😳 I Was Envious At The Foolish

Foolish in the Bible's wisdom language usually means morally wrong, not simply unintelligent.

The foolish here are people who live as if God does not matter.

Envious admits something uncomfortable, he wanted what these people had.

This honesty is unusual, most prayers do not confess jealousy of the wicked.

🧠 Foolish means morally wrong, not unintelligent

🙄 They live as if God does not matter

😳 Envious admits an uncomfortable desire

📖 This honesty is rare in prayer

# Psalms 73:4-9
# 💪 The Wicked Look Untouchable
---
## ⛓️ There Are No Bands In Their Death

Bands here means pains or pangs, the kind of suffering that often comes before death.

The wicked in this psalm seem to skip that suffering entirely.

Their death looks easy and painless, unlike the psalmist's own trouble.

This is the first piece of evidence building his case of envy.

⛓️ Bands means pains before death

💤 Their death looks easy, not painful

⚖️ This does not match his own trouble

📖 It builds his case of envy

## 💪 Their Strength Is Firm

Firm here means their bodies stay strong right up to the end.

There is no long decline, no visible weakness before death arrives.

To a struggling reader like the psalmist, this looks deeply unfair.

The wicked seem to receive the health he might expect for the faithful.

💪 Firm means strong until the very end

📉 There is no visible decline

⚖️ This looks deeply unfair to him

📖 Health seems reserved for the wrong people

## 👥 They Are Not In Trouble As Other Men

Other men here means ordinary people, including the psalmist himself.

The wicked appear exempt from the everyday hardships everyone else faces.

Neither plagued like other men repeats the same complaint a second time.

This repetition shows how deep the psalmist's frustration had grown.

👥 Other men means ordinary people like him

🚫 The wicked seem exempt from hardship

🔁 The complaint repeats a second time

📖 Repetition shows his deep frustration

## 🔗 Pride Compasseth Them About As A Chain

Compasseth means surrounds completely, like something worn around the whole body.

In this culture, a chain was often a visible piece of jewelry, not a restraint.

Comparing pride to a chain pictures it as something worn proudly and openly.

These people are not hiding their arrogance, they display it like an ornament.

🔗 Compasseth means surrounds completely

💍 A chain here means visible jewelry

😤 Pride is worn openly, not hidden

📖 Arrogance becomes their ornament

## 👕 Violence Covereth Them As A Garment

Garment here means the clothing someone wears every single day.

Comparing violence to a garment pictures it as their normal, everyday covering.

This is not one violent act, it is a whole way of living.

Pride and violence together become the outfit these people wear in public.

👕 Garment means their everyday clothing

🔁 Violence is a daily way of life

😈 Pride and violence become their outfit

📖 They wear cruelty like clothing

## 😳 Their Eyes Stand Out With Fatness

Fatness here pictures wealth and rich living, not a comment on body size.

Eyes standing out describes a face swollen and satisfied from excess.

This is a vivid ancient way of picturing someone who has never lacked anything.

The image makes their prosperity visible on their own bodies.

💰 Fatness pictures wealth, not body size

😳 Eyes standing out shows swollen excess

🍽️ It pictures someone who never lacked

📖 Prosperity shows on their own faces

## 🎁 More Than Heart Could Wish

This means their wealth has gone beyond anything they could even imagine wanting.

There is no unmet desire left for them to chase.

This detail sharpens the psalmist's envy, they have everything and more.

Their satisfaction stands in stark contrast to his own struggle.

🎁 They have more than they could imagine

🚫 No unmet desire is left

😳 This sharpens the psalmist's envy

📖 Their ease contrasts his struggle

## 😈 They Speak Wickedly Concerning Oppression

Speaking wickedly here means talking about hurting others without any shame.

Oppression means using power to take advantage of people who cannot fight back.

These people do not hide their cruelty, they openly discuss it.

Loftily, later in the same verse, adds that they say this with pride.

😈 Speaking wickedly means shameless cruelty

⚖️ Oppression means abusing the powerless

🗣️ They discuss cruelty openly

📖 They say it all with pride

## 🗯️ They Set Their Mouth Against The Heavens

This pictures the wicked speaking arrogantly, even against God himself.

Mouth against the heavens is a bold image of open blasphemy.

They are not just cruel to people, they show contempt for God directly.

This detail escalates the description from social cruelty to open irreverence.

🗯️ This pictures open blasphemy

☁️ Heavens represents God himself

😤 Contempt now targets God directly

📖 Cruelty escalates into irreverence

## 👅 Their Tongue Walketh Through The Earth

Tongue here stands for their words and reputation, not a literal body part.

Walketh through the earth pictures their slander spreading everywhere unchecked.

No place seems safe from their influence or their gossip.

This closes the section by showing how far their arrogance reaches.

👅 Tongue stands for their words

🌍 Their slander spreads everywhere unchecked

🚫 No place is safe from them

📖 Their arrogance reaches every corner

# Psalms 73:10-12
# 🤔 Even His People Are Drawn In
---
## ❓ His People Return Hither

This verse is one of the hardest in the whole psalm to translate clearly.

Many scholars believe hither points back to the wicked's arrogant claims just described.

The picture seems to be everyday people getting pulled toward the wicked's example.

Even faithful people can start looking to worldly success as the model to follow.

❓ This verse is genuinely hard to translate

🧲 People seem pulled toward the wicked's example

👥 Even faithful people can be drawn in

📖 Worldly success can become a false model

## 🥤 Waters Of A Full Cup Are Wrung Out To Them

A full cup pictures abundance, more than a person could normally hold.

Wrung out suggests this abundance is squeezed out and eagerly consumed.

The image pictures onlookers greedily drinking in whatever the wicked seem to offer.

This closes the difficult verse with a picture of people chasing that same success.

🥤 A full cup pictures abundance

💧 Wrung out means eagerly consumed

👀 Onlookers chase that same success

📖 People drink in the wicked's example

## ❓ How Doth God Know

This is the wicked speaking, not the psalmist, questioning whether God even pays attention.

The question assumes God is either unaware or too distant to notice.

This kind of thinking often grows out of watching wrongdoing go unpunished for years.

The question hangs in the air, unanswered, until later in the psalm.

❓ This is the wicked speaking, not him

👀 They assume God is unaware or distant

⏳ Unpunished wrong feeds this thinking

📖 The question stays unanswered for now

## 👑 Is There Knowledge In The Most High

This repeats the same doubt as the line just before it, in different words.

Most High is one of God's titles, emphasizing his position over all things.

Questioning whether even the Most High knows is a bold doubt for scripture to record.

This doubled question shows exactly how convincing the wicked's prosperity had become.

🔁 This repeats the same doubt again

👑 Most High emphasizes God's supreme position

😲 This is a bold doubt to voice

📖 It shows how convincing prosperity looked

## 🙅 These Are The Ungodly, Who Prosper In The World

Ungodly here means people who live with no real regard for God.

The verse states plainly what the whole section has been describing all along.

Prosper in the world means their success is visible to everyone watching.

Increase in riches closes the description with one final, plain fact, they keep getting richer.

🙅 Ungodly means no regard for God

👀 Their success is visible to everyone

📈 Increase in riches states a plain fact

📖 The description ends where it began

# Psalms 73:13-15
# 😣 Was It All For Nothing
---
## 🚫 I Have Cleansed My Heart In Vain

In vain means for no purpose, all the effort producing nothing worthwhile.

The psalmist voices his own private doubt here, not a fact about God.

Watching the wicked prosper made his own effort at godliness feel pointless.

This is the low point of his honest struggle, not the psalm's final answer.

🚫 In vain means for no purpose

😔 This is his doubt, not a fact

📉 Their prosperity made his effort feel pointless

📖 This is the low point, not the end

## 🤲 Washed My Hands In Innocency

Washing hands was a symbolic act, showing someone was innocent of wrongdoing.

This same picture appears later when Pilate washes his hands at Jesus's trial.

The psalmist is saying he tried to live with a clear conscience.

Right now, that effort feels like it earned him nothing at all.

🤲 Washing hands symbolized innocence

📜 The same image appears at Jesus's trial

✅ He tried to live with a clear conscience

📖 It currently feels worthless to him

## 😩 All The Day Long Have I Been Plagued

Plagued here means suffering some ongoing trouble, not a literal disease.

All the day long stresses that this trouble never seems to let up.

Chastened every morning adds that even each new day starts with more difficulty.

His hardship stays constant, while the wicked he described seem to have none.

😩 Plagued means ongoing trouble, not disease

⏰ All the day long means no relief

🌅 Even mornings bring more difficulty

📖 His hardship contrasts their ease

## 🗣️ I Should Offend Against The Generation Of Thy Children

This does not mean the psalmist almost sinned by doing something wrong himself.

Offend here means his words could have led other believers astray.

Thy children means the community of people who trust God, not literal offspring.

He held back from speaking his doubts aloud to protect their faith.

🚫 This is not about his own sin

🗣️ Offend means leading others astray

🤝 Thy children means the community of believers

📖 He held back to protect their faith

# Psalms 73:16-20
# ⛪ The Turning Point In The Sanctuary
---
## 😖 When I Thought To Know This, It Was Too Painful For Me

This describes the psalmist trying to reason his way through the problem alone.

Too painful means the effort caused him real mental and emotional distress.

Logic and private reflection alone could not resolve what troubled him.

This sets up the very next line as the actual turning point of the psalm.

🧠 He tried reasoning through it alone

😖 Too painful means real mental distress

🚫 Logic alone could not resolve it

📖 The next line becomes the turning point

## ⛪ Until I Went Into The Sanctuary Of God

The sanctuary was the place of worship, where God's presence was met directly.

Until marks a clear before and after in the psalmist's thinking.

Worship, not private thinking, finally gave him a new perspective.

This is the hinge the entire psalm turns on.

⛪ Sanctuary was where worship met God

🔄 Until marks a clear before and after

🙏 Worship gave the new perspective, not logic

📖 This is the psalm's hinge point

## 🏁 Then Understood I Their End

Their end means the wicked's final outcome, not their current success.

He had been staring only at their present prosperity, never their future.

Once he considered where their path actually led, the whole problem looked different.

Perspective, not new information, is what shifted everything for him.

🏁 Their end means their final outcome

👀 He had only seen their present success

🔀 Their future path changed his view

📖 Perspective shifted everything, not new facts

## 🧊 Thou Didst Set Them In Slippery Places

Slippery places pictures ground that looks solid but gives way without warning.

Their prosperity, which looked so stable, was never actually secure.

Set them shows God, not chance, put them exactly there.

This reverses the earlier picture of the wicked's firm and stable strength.

🧊 Slippery places pictures unstable footing

🏚️ Their prosperity was never secure

👆 God placed them there, not chance

📖 This reverses their earlier stability

## 💥 How Are They Brought Into Desolation, As In A Moment

Desolation means total ruin, everything they built completely stripped away.

As in a moment stresses how suddenly this collapse happens.

This is the opposite of the slow, painless death described earlier in the psalm.

Their downfall matches how quickly it was decided, not how slowly it feels.

💥 Desolation means total ruin

⚡ As in a moment stresses suddenness

🔁 This contrasts their earlier painless death

📖 Their downfall comes fast, not slow

## 💤 As A Dream When One Awaketh

A dream feels completely real while it lasts, but vanishes the moment someone wakes up.

The wicked's prosperity is compared to that same kind of unreality.

When thou awakest pictures God finally acting, ending the illusion for good.

Their success only looked solid because no one had woken up yet.

💤 A dream feels real until waking

🌫️ Their prosperity is pictured the same way

👁️ God awaking means he finally acts

📖 Their success was only ever an illusion

# Psalms 73:21-24
# 🐴 Foolish Yet Held By The Hand
---
## 💔 My Heart Was Grieved

Grieved here means deeply hurt, describing his emotional reaction to what he now understood.

Looking back at his earlier envy leaves him with real regret, not pride.

This admission shows how seriously he now takes his former doubt.

The turning point in the sanctuary changed more than his opinion, it changed his conscience.

💔 Grieved means deeply hurt

😔 He now feels regret, not pride

🔍 This shows he takes his doubt seriously

📖 The turning point changed his conscience

## 📍 I Was Pricked In My Reins

Reins in this culture referred to the kidneys, believed to be the seat of deep emotion.

Pricked pictures a sharp, physical sensation of guilt or conviction.

Modern readers might say this feeling in the gut instead.

The psalmist felt his earlier doubt in his body, not just in his thoughts.

🫘 Reins meant the kidneys in this culture

📍 Pricked pictures sharp guilt or conviction

💭 Modern readers might say gut feeling

📖 He felt this doubt physically

## 🔁 So Foolish Was I, And Ignorant

Foolish here means the same moral failure he used earlier to describe the wicked.

He now applies that same harsh word to himself, not just to others.

Ignorant adds that he simply did not understand what was really happening.

This is a striking reversal from where the psalm started.

🔁 Foolish is the same word for the wicked

👤 He now applies it to himself

🤷 Ignorant means he misunderstood the situation

📖 This is a striking reversal

## 🐴 I Was As A Beast Before Thee

Beast pictures an animal, something that reacts without real understanding or reflection.

Before thee means this comparison is made directly in God's presence, not privately.

He admits his earlier reasoning was closer to instinct than wisdom.

This blunt self description prepares the way for the grace named in the next verse.

🐴 Beast pictures reacting without understanding

👁️ Before thee means said to God directly

🧠 His reasoning was closer to instinct

📖 This prepares the way for grace

## 🔄 Nevertheless I Am Continually With Thee

Nevertheless marks a sharp turn, despite everything just confessed, this remains true.

Continually means this closeness never actually stopped, even during his doubt.

His foolishness did not cancel God's presence with him.

This is the grace that follows his honest confession.

🔄 Nevertheless marks a sharp turn

⏳ Continually means it never stopped

🤝 His foolishness did not cancel God's presence

📖 This is grace after honest confession

## ✋ Thou Hast Holden Me By My Right Hand

Holden means held firmly, the way someone steadies a person about to fall.

The right hand often pictures strength and support in this culture.

This directly answers his earlier confession that his feet were almost gone.

He did not hold on by his own strength, God held on to him instead.

✋ Holden means held firmly

💪 Right hand pictures strength and support

🔁 This answers his earlier near fall

📖 God held on, not his own strength

## 🧭 Thou Shalt Guide Me With Thy Counsel

Counsel here means wise direction, the same word used for advice from a trusted guide.

Guide pictures ongoing help, not a single rescue followed by silence.

This promise looks forward, past the crisis he has just described.

His future, not just his past confusion, is now covered by this trust.

🧭 Counsel means wise direction

🚶 Guide pictures ongoing help

🔮 The promise looks toward the future

📖 His future is now covered by trust

## ✨ Afterward Receive Me To Glory

Many scholars believe this line hints at something beyond this earthly life.

Receive me to glory reads like more than simply avoiding disaster now.

The Old Testament rarely states hope beyond death this plainly.

This verse gives Israel's later hope in resurrection real roots to stand on.

❓ Scholars debate the full meaning here

✨ It hints at hope beyond this life

📜 The Old Testament rarely says this plainly

📖 It roots later resurrection hope

# Psalms 73:25-26
# ❤️ God Is Enough
---
## ❓ Whom Have I In Heaven But Thee

This question assumes only one honest answer, there is no one else to compare.

Heaven represents every possible source of hope beyond this life.

The psalmist is not exaggerating, he means this as a settled fact.

This mirrors his earlier confession that God alone held him steady.

❓ The question assumes only one answer

☁️ Heaven represents every hope beyond life

✅ This is a settled fact, not exaggeration

📖 It mirrors God holding him steady

## 🌍 There Is None Upon Earth That I Desire Beside Thee

This repeats the heaven line just before it, now applied to earth instead.

Together the two lines cover every possible place a person could look for satisfaction.

Desire here means what he actually wants most, not merely what he needs.

Nothing on earth, including the wealth he once envied, competes with this.

🔁 This repeats the heaven line, now on earth

🌍 Together they cover every possible place

❤️ Desire means what he wants most

📖 Nothing competes, not even the wealth he envied

## 🫀 My Flesh And My Heart Faileth

Flesh and heart together picture the whole person, body and inner life combined.

Faileth means growing weak or giving out completely, not a minor complaint.

He honestly admits his own strength has real limits.

This honesty makes the next line's claim even more striking.

🫀 Flesh and heart picture the whole person

📉 Faileth means giving out completely

🙋 He admits his own real limits

📖 This makes the next claim striking

## 🔋 God Is The Strength Of My Heart

This directly answers the weakness just confessed in the line before it.

Strength here does not come from within him, it comes from an outside source.

The wicked drew strength from wealth, the psalmist now draws it from God alone.

This is the clearest answer yet to the envy that opened the whole psalm.

🔄 This answers the weakness just confessed

🔋 Strength comes from an outside source

⚖️ This contrasts the wicked's source of strength

📖 It answers the psalm's opening envy

## 🗺️ My Portion For Ever

Portion was the word used for a person's assigned share of the promised land.

The tribe of Levi received no land, God himself was named as their portion instead.

Calling God his portion means he no longer needs an inheritance like everyone else.

For ever adds that this share never runs out, unlike land or wealth.

🗺️ Portion meant an assigned share of land

👤 Levi's portion was God himself

🎁 He no longer needs an inheritance

📖 This share never runs out

# Psalms 73:27-28
# 🙏 Drawing Near Is The Real Good
---
## 🚶 They That Are Far From Thee Shall Perish

Far from thee describes a chosen distance, not simply living somewhere else.

Perish means complete ruin, matching the desolation pictured earlier in the psalm.

This states plainly what the earlier picture of slippery places already showed.

Distance from God, not lack of success, actually decides the outcome.

🚶 Far from thee means chosen distance

💀 Perish means complete ruin

🔁 This confirms the earlier slippery places image

📖 Distance from God decides the outcome

## 💔 Thou Hast Destroyed All Them That Go A Whoring From Thee

Whoring here is a common Old Testament picture for unfaithfulness to God, not literal adultery.

It usually describes worshiping other gods or trusting something other than God for security.

The word is deliberately harsh, treating idolatry as a betrayal of a real relationship.

This names exactly what the wicked's whole way of life amounted to.

💔 Whoring pictures unfaithfulness to God

🙅 It usually means trusting false security

⚠️ The word treats idolatry as betrayal

📖 This names the wicked's true failure

## 🚶 It Is Good For Me To Draw Near To God

Draw near means approaching God in worship, the same act that changed everything at the sanctuary.

Good here answers the psalm's opening question about who God is truly good to.

He no longer envies the wicked's nearness to wealth, he wants nearness to God instead.

This line quietly resolves the entire struggle that opened the psalm.

🚶 Draw near means approaching God in worship

✅ Good answers the psalm's opening question

🔄 He now wants nearness to God, not wealth

📖 This resolves the psalm's whole struggle

## 🔤 I Have Put My Trust In The Lord GOD

Lord GOD combines God's personal covenant name with his title as sovereign ruler.

Trust here is a settled decision, not just a passing feeling of confidence.

This trust was hard won, built through real doubt, not easy certainty.

The psalmist ends in a very different place than where his confession began.

🔤 Lord GOD combines his name and rulership

✅ Trust is a settled decision, not a feeling

⚒️ This trust was hard won through doubt

📖 He ends far from where he began

## 📢 That I May Declare All Thy Works

Declare means telling others publicly, not simply believing something in private.

All thy works points back to everything God has done, including this rescue from doubt.

The psalmist plans to turn his private struggle into public testimony.

This entire psalm is itself that declaration, written for others to read.

📢 Declare means telling others publicly

🔁 All thy works includes this very rescue

🗣️ He turns private struggle into testimony

📖 This psalm itself is that declaration`.trim();

export const PSALMS_SEVENTY_THREE_PERSONAL_SECTIONS = parsePsalmsSeventyThreeRawNotes(PSALMS_SEVENTY_THREE_RAW_NOTES);
