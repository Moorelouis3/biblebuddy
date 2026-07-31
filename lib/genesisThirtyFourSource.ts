export type GenesisThirtyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtyFourRawNotes(rawText: string): GenesisThirtyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+34:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 34 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+34:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+34:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 34 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 34,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 34:${startVerse}` : `Genesis 34:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Genesis 34 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_FOUR_RAW_NOTES = `# Genesis 34:1-3
# 👧 Dinah Is Defiled
---
## 👧 Went Out To See The Daughters Of The Land

Dinah was the daughter of Jacob and Leah.

The daughters of the land means the young women living in Canaan.

They were not part of Jacob's own family.

Dinah walks out to spend time with them.

The Bible does not say she did anything wrong.

It only tells us where she went before trouble found her.

👧 Dinah is Jacob and Leah's daughter

🏙️ Daughters of the land means Canaanite women

🚶 Dinah visits the women nearby

➡️ Shechem sees her next

## 👑 Prince Of The Country

Hamor ruled over the city of Shechem.

The Bible calls him prince of the country, meaning he was the chief ruler over that whole region.

The city and his son shared the same name, Shechem.

Cities in the ancient world were often named after an important founder or ruler.

That naming pattern still shapes place names today.

👑 Hamor ruled the region

🏙️ The city is also named Shechem

📜 Cities were often named after rulers

📖 A name can outlive its ruler

## ⚠️ He Took Her, And Lay With Her, And Defiled Her

Shechem forces himself on Dinah without her consent.

The word defiled means she was violated and dishonored by what he did.

This was not a private mistake.

In that culture it brought shame on the woman and on her whole family.

⚠️ Shechem sexually assaults Dinah

💔 Defiled means violated and dishonored

😔 This brought shame on her family

📖 Genesis records this plainly without excusing it

## ❤️ His Soul Clave Unto Dinah

Clave means clung or held tightly.

After assaulting Dinah, Shechem becomes deeply attached to her.

The Bible also says he loved her and spoke kindly to her.

This happened right after the assault, not years later.

Real affection afterward does not erase real harm done before it.

❤️ Clave means clung tightly

🗣️ Shechem speaks kindly to Dinah

⚠️ His feelings came after his sin

📖 Affection later cannot undo harm already done

# Genesis 34:4-7
# 😡 The Family Reacts
---
## 💍 Get Me This Damsel To Wife

Shechem asks his father to arrange the marriage.

In this culture, fathers typically negotiated marriages for their sons.

Shechem does not go to Jacob directly.

He works through Hamor instead, following the custom of the time.

His request shows he wants Dinah as his wife after what happened.

💍 Shechem asks Hamor to arrange it

👨 Fathers usually negotiated marriages

📜 Shechem follows the custom of the time

➡️ Jacob hears what happened next

## 😔 Jacob Held His Peace

Jacob learns that Dinah has been defiled.

His sons are away in the field with the cattle when the news arrives.

Held his peace means he stayed silent for the moment.

He waits until his whole family is together before responding.

His silence is patience, not indifference.

😔 Jacob hears the news alone

🐑 His sons are still in the field

🤐 Held his peace means he stayed silent

📖 He waits for his whole family first

## 🤝 Went Out Unto Jacob To Commune With Him

Hamor comes to speak with Jacob directly.

Commune means to talk something over, not just a casual greeting.

He is trying to work out a peaceful arrangement after his son's sin.

Dinah has not yet come home.

She is still in Shechem's house while these talks happen.

🤝 Hamor comes to talk with Jacob

🗣️ Commune means to talk something over

🏠 Dinah is still in Shechem's house

➡️ Jacob's sons arrive and hear everything

## 😡 The Men Were Grieved, And They Were Very Wroth

Jacob's sons rush home once they hear what happened.

Grieved means they were deeply hurt.

Wroth means they were furious, not just annoyed.

Both feelings hit them at the same time.

Their sister's pain and their family's honor are both at stake.

😔 Grieved means deeply hurt

😡 Wroth means furious

👨‍👩‍👧 Both feelings strike the brothers together

📖 Family honor and Dinah's pain both matter

## ⚠️ Wrought Folly In Israel

Wrought folly means Shechem committed a shameful, sinful act.

Which thing ought not to be done makes the point even sharper.

This was not just bad manners.

It broke God's standard for how a man treats a woman.

Jacob's sons see the assault as an attack on the whole family's name.

⚠️ Wrought folly means a shameful sin

📖 The text calls it forbidden outright

👨‍👩‍👧 The whole family's honor was attacked

➡️ Hamor now makes his offer

# Genesis 34:8-12
# 🤝 Hamor And Shechem Make Their Case
---
## ❤️ The Soul Of My Son Shechem Longeth For Your Daughter

Longeth means to want something badly, with deep desire.

Hamor speaks on his son's behalf, asking Jacob's family for Dinah's hand in marriage.

He does not deny what Shechem did.

He simply asks for what his son wants now.

❤️ Longeth means wanting something badly

🗣️ Hamor speaks for his son

🙏 He asks for Dinah in marriage

➡️ He follows with a bigger proposal

## 🤝 Make Ye Marriages With Us

Hamor proposes that the two families intermarry going forward.

His people would marry into Jacob's family, and Jacob's family would marry into his.

This is bigger than one wedding.

He is proposing that two whole communities become one.

🤝 Hamor proposes ongoing intermarriage

👨‍👩‍👧 Both families would marry into each other

🏡 Two communities would become one

📖 Hamor's offer reaches far past Dinah

## 🏡 Dwell And Trade Ye Therein

Hamor also offers Jacob's family the right to settle in the land permanently.

They could trade, buy property, and build a life there.

Jacob's family had already been camping nearby.

This offer would make that arrangement official and legal.

🏡 Hamor offers permanent settlement

💰 Trade and property rights included

🏕️ Jacob's family had only been camping

📖 The offer makes their stay official

## 🙏 Let Me Find Grace In Your Eyes

Shechem now speaks for himself, not through his father.

Find grace in your eyes means he is asking for their favor and approval.

He offers to pay whatever price they ask.

His words sound humble, but the harm is already done.

🗣️ Shechem speaks for himself now

🙏 Find grace means he seeks their favor

💰 He offers to pay any price

➡️ His offer cannot undo the harm

## 💰 Ask Me Never So Much Dowry And Gift

A dowry was a payment given to the bride's family before a wedding.

It is also called a bride price.

Shechem says he will pay whatever amount they name.

His offer shows how determined he is to marry Dinah.

No amount of money could undo what already happened to her.

💰 Dowry means a bride price payment

🤲 Shechem offers to pay any amount

❤️ His determination is real

📖 Money cannot undo what happened

# Genesis 34:13-17
# 🎭 The Brothers Answer With A Trap
---
## 🎭 Answered Shechem And Hamor His Father Deceitfully

Deceitfully means Jacob's sons intentionally lied.

Their words sound like they are agreeing to the marriage.

Their hearts are already planning revenge for what happened to Dinah.

Peaceful words are about to hide a violent plan.

🎭 Deceitfully means intentionally lying

🗣️ Their words sound like agreement

⚔️ Their hearts are planning revenge

➡️ They set a condition first

## ✂️ To One That Is Uncircumcised

Circumcision was the sign of God's covenant with Abraham's family.

Uncircumcised means a man who did not carry that sign.

Reproach means shame or disgrace.

The brothers say marrying outside the covenant would shame their family.

That claim is true.

They use it to hide their real plan.

✂️ Circumcision marked God's covenant people

😔 Reproach means shame or disgrace

⚠️ Their claim about shame was true

📖 They twist a true reason into a trap

## 🤝 If Ye Will Be As We Be

The brothers set one condition for the marriage.

Every male in the city must be circumcised, just like Jacob's own family.

They frame it as an invitation into God's covenant people.

In reality, it is the first step of their trap.

🤝 One condition is set

✂️ Every male must be circumcised

🎭 It sounds like a real invitation

➡️ It secretly begins their trap

## 👨‍👩‍👧 We Will Become One People

If the men agree, the brothers promise full intermarriage between the two families.

Shechem's people and Jacob's people would join into a single community over time.

This matches exactly what Hamor already proposed.

The brothers are simply repeating Hamor's own offer back to him.

👨‍👩‍👧 Full intermarriage is promised

🏡 Two peoples would become one

🔁 This matches Hamor's earlier offer

➡️ One condition still stands

## 🚶 Then Will We Take Our Daughter, And We Will Be Gone

The brothers give Hamor a clear ultimatum.

If the men refuse circumcision, Dinah leaves and there is no deal at all.

No marriage, no alliance, no relationship between the two families.

The brothers sound firm, but their real plan does not depend on this answer either way.

🚶 The brothers give an ultimatum

🙅 No circumcision means no deal

📜 No marriage or alliance either way

➡️ Their trap works regardless of the answer

# Genesis 34:18-24
# ✂️ The City Agrees
---
## 😊 Their Words Pleased Hamor

Hamor and Shechem accept the brothers' proposal gladly.

They believe the offer is sincere.

Neither of them realizes it is actually a trap.

They think peace, not violence, is about to follow.

😊 Hamor believes the offer

🤝 He expects real peace

⚠️ He cannot see the trap

➡️ Shechem agrees immediately

## 💍 The Young Man Deferred Not To Do The Thing

Deferred not means Shechem did not delay or hesitate.

He agrees to be circumcised right away.

The Bible says he delighted in Jacob's daughter, meaning he truly wanted to marry her.

It also calls him more honourable than his father's whole house, meaning the city respected him highly.

That respect did not make his earlier sin any less real.

⏱️ Deferred not means he did not delay

💍 Shechem agrees at once

👑 The city respected him highly

📖 Respect does not erase his sin

## 🚪 Came Unto The Gate Of Their City

The city gate was the ancient world's public meeting place.

Leaders gathered there to settle business and make announcements.

Hamor brings this proposal before the whole city, not just his own household.

A decision this large needed public agreement.

🚪 The gate was the public meeting place

⚖️ Leaders settled business there

🗣️ Hamor presents the offer publicly

➡️ He makes his case to the men

## 🤝 These Men Are Peaceable With Us

Hamor tells the city that Jacob's family means no harm.

He points out that the land is large enough for everyone.

He encourages the men to let Jacob's family settle, trade, and prosper there.

His speech is meant to make the deal sound like an easy win for the whole city.

🤝 Hamor calls Jacob's family peaceful

🗺️ He says the land is large enough

💰 He promises trade and prosperity

➡️ He adds one more reason

## 🐑 Shall Not Their Cattle And Their Substance Be Ours

Hamor gives the city one more reason to agree.

Jacob's family was wealthy, with large flocks and many possessions.

Hamor tells the men that all of it will eventually belong to everyone in the city.

His speech reveals that greed, not just peace, is winning the argument.

🐑 Jacob's family was wealthy

💰 Hamor promises shared riches

😏 Greed helps seal the deal

📖 Self interest can disguise itself as friendship

## ✂️ Every Male Was Circumcised

All that went out of the gate of his city means every man who belonged to that city.

Every one of them agrees, without knowing what is coming.

None of them realize Jacob's sons are setting a trap.

Their agreement is about to cost them everything.

🚪 The phrase means every man of the city

✂️ All of them are circumcised

⚠️ None of them know the trap ahead

➡️ Simeon and Levi act next

# Genesis 34:25-29
# ⚔️ Simeon And Levi Take Revenge
---
## 🩹 On The Third Day, When They Were Sore

The third day after circumcision was one of the most painful days of healing.

Sore means the men's wounds were still fresh and tender.

Walking, let alone fighting, would have been difficult for nearly all of them.

Jacob's sons wait for the exact moment the men are weakest.

🩹 The men are still healing

😖 Sore means painful and tender

🏃 Fighting back would be hard

📖 The brothers choose their moment carefully

## ⚔️ Took Each Man His Sword

Simeon and Levi are named here specifically.

They are Dinah's full brothers, sons of the same mother, Leah.

Each man carries his own sword into the city.

Boldly means they walked in with confidence, knowing the men could not resist.

They kill every male in the city.

⚔️ Simeon and Levi lead the attack

🗡️ Each brother carries his own sword

💪 Boldly means confident, unafraid

➡️ Every male in the city dies

## 🏠 Took Dinah Out Of Shechem's House

Hamor and Shechem are both killed in the attack.

This answers a question left open earlier in the chapter.

Dinah had stayed in Shechem's house the whole time these talks were happening.

Only after Shechem's death do her brothers finally bring her home.

⚖️ Hamor and Shechem are killed

🏠 Dinah had stayed in Shechem's house

❤️ Her brothers finally bring her home

➡️ The rest of the brothers arrive

## 💰 Spoiled The City

The text shifts from naming only Simeon and Levi to naming the sons of Jacob.

That shift shows the rest of the brothers join in once the fighting ends.

Spoiled means they stripped the city of everything valuable.

They believed the whole city shared the blame for what happened to Dinah.

👨‍👦 The other brothers join afterward

💰 Spoiled means stripped of valuables

🏙️ They loot the whole city

📖 They treat the city as fully guilty

## 👩 Their Wives Took They Captive

The little ones means the children of the men who were just killed.

Their wives are taken captive instead of killed.

The text does not say how many people this included.

Jacob's camp grows suddenly much larger, filled with people who did not choose to be there.

👶 Little ones means the children

👩 The wives are taken captive

🏕️ Jacob's camp grows overnight

➡️ These captives never chose this

# Genesis 34:30-31
# 😟 Jacob's Fear And His Sons' Answer
---
## 👃 Ye Have Troubled Me To Make Me To Stink

Jacob is not talking about a physical smell.

To make me to stink means to ruin someone's reputation completely.

Jacob is telling Simeon and Levi that their violence has made the whole family look dangerous.

The neighboring nations will now see them as people to fear and attack, not trust.

👃 To stink means to ruin a reputation

😡 Jacob fears his sons' violence

🌍 Neighbors will now see them as dangerous

📖 A reputation can shatter fast

## 👨‍👩‍👦 I Being Few In Number

Jacob's household was still small compared to the surrounding cities and tribes.

The Canaanites and the Perizzites were the peoples living closest to them.

Jacob fears they could unite and attack his family in revenge.

If that happened, he believes his whole household could be wiped out.

👨‍👩‍👦 Jacob's family was small

🌍 The Canaanites and Perizzites lived nearby

⚔️ Jacob fears a united attack

📖 He believes his whole house is at risk

## 💔 Should He Deal With Our Sister As With An Harlot

Harlot means a prostitute.

Simeon and Levi answer their father with a sharp question, not an apology.

They believe Shechem treated Dinah as if she had no honor worth protecting.

Their anger over Dinah is understandable, but their violence went far beyond what God ever commanded.

The chapter ends here, with the conflict still unresolved.

💔 Harlot means a prostitute

😠 The brothers refuse to apologize

⚖️ Their anger was fair, their violence was not

➡️ The chapter closes without resolving the conflict
`.trim();

export const GENESIS_THIRTY_FOUR_PERSONAL_SECTIONS = parseGenesisThirtyFourRawNotes(GENESIS_THIRTY_FOUR_RAW_NOTES);
