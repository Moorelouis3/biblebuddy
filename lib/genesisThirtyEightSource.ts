export type GenesisThirtyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisThirtyEightRawNotes(rawText: string): GenesisThirtyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisThirtyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+38:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 38 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+38:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+38:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 38 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 38,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 38:${startVerse}` : `Genesis 38:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Genesis 38 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_THIRTY_EIGHT_RAW_NOTES = `# Genesis 38:1-5
# 🏚️ Judah Leaves His Brothers
---
## 🚶 Judah Went Down From His Brethren

The word "went down" means more than changing address.

Judah was leaving the hill country where Jacob's family lived.

He moved toward the lower land near Adullam.

He had just helped sell his brother Joseph into slavery.

Staying close to his grieving father had become unbearable.

Judah ran from his guilt instead of facing it.

🧭 Went down means leaving for lower ground
💔 Judah had just helped sell Joseph
😔 Guilt pushed him away from home
📖 Sin often makes people want to run

## 🏘️ Turned In To A Certain Adullamite, Whose Name Was Hirah

An Adullamite was someone from Adullam.

Adullam was a Canaanite town in the lowlands southwest of Bethlehem.

The phrase "turned in to" means Judah went to stay with him.

He did not simply pass through the town.

He attached himself to a man named Hirah.

That friendship pulled Judah further from his covenant family.

📍 Adullam was a Canaanite town
🤝 Judah turned in means he stayed
👤 Hirah became his close companion
📖 New friendships pulled Judah from his family

## 👀 Saw There A Daughter Of A Certain Canaanite

Once Judah settled in Adullam he saw a Canaanite woman.

He wanted her for his wife.

This should stand out immediately.

Abraham made his servant swear never to choose a Canaanite wife for Isaac.

Isaac and Rebekah gave Jacob that same instruction.

The issue was never about ethnicity.

It was about the false gods the Canaanites worshiped.

Judah knew the family pattern and ignored it.

⚠️ Judah chose a Canaanite woman
📜 Abraham and Isaac warned against this
🙏 The real issue was false worship
📖 Judah ignored the pattern his family set

## 💍 Whose Name Was Shuah, And He Took Her

The text names her father, Shuah, but never gives her own name.

This shows how deeply this marriage tied Judah to Canaanite culture.

The phrase "he took her" means Judah married her.

To take a wife in this culture meant far more than a wedding day.

It meant bringing her fully into his household and life.

👨 Shuah was the woman's father
📖 The Bible never names her directly
💍 Took her means Judah married her
➡️ Judah built his household around this marriage

## 👶 She Conceived, And Bare A Son, And He Called His Name Er

Judah's wife gave birth to their first son.

Judah named him Er.

Er was the firstborn, so he would normally receive the family's leading inheritance.

This detail matters because Er will not keep that place for long.

👶 Er was Judah's firstborn son
👑 Firstborn meant the leading inheritance
⚠️ That place would not last
📖 The story is about to turn

## 👶 She Conceived Again, And Bare A Son, And She Called His Name Onan

This time the mother is the one who names the child, not Judah.

The second son was named Onan.

Onan will later be asked to fulfill a serious family duty.

That duty comes after his older brother dies.

👶 Onan was the second son
🗣️ His mother named him this time
⏳ A hard duty waits ahead for him
📖 His choice will define this chapter

## 👶 She Yet Again Conceived, And Bare A Son, And Called His Name Shelah

A third son was born and named Shelah.

Judah now had three sons, Er, Onan, and Shelah.

All three will become connected to the same woman, Tamar.

Their names carry the whole story of this chapter.

👶 Shelah was the third son
👨‍👦‍👦 Judah now had three sons
🔗 All three connect to Tamar
📖 Their names carry this whole chapter

## 📍 He Was At Chezib When She Bare Him

Chezib was a small town in the lowlands of Canaan.

Many scholars believe it was later known as Achzib.

This location detail shows how far Judah's life had shifted.

He had left his father's household and built a new life among Canaanites.

📍 Chezib sat in the Canaanite lowlands
🗺️ It may be the later Achzib
🏠 Judah's whole life had moved here
📖 This was no longer a temporary stay

# Genesis 38:6-12
# 💔 Er And Onan Die
---
## 💍 Judah Took A Wife For Er His Firstborn, Whose Name Was Tamar

Judah arranged a wife for his oldest son Er.

Her name was Tamar.

The text never tells us her family background.

Since Judah lived among Canaanites, Tamar was most likely Canaanite herself.

Judah was building his family even deeper into that culture.

👰 Tamar became Er's wife
❓ Her background is never explained
🌍 She was likely Canaanite herself
📖 Judah kept building deeper into Canaan

## 👁️ Er, Judah's Firstborn, Was Wicked In The Sight Of The Lord

The word "wicked" means morally evil, not simply flawed or careless.

Something about how Er lived was seriously sinful before God.

The phrase "in the sight of the Lord" means nothing was hidden from Him.

Other people may never have known what Er was doing.

God still saw it clearly.

⚠️ Wicked means deeply evil
👁️ God sees what people hide
🙈 Others may have missed his sin
📖 Nothing is hidden from the Lord

## 💀 And The Lord Slew Him

The word "slew" means killed.

God brought direct judgment on Er's life.

This was not a random or accidental death.

The verse ties Er's death straight to his own wickedness.

Judah's firstborn died without ever leaving an heir.

💀 Slew means God took his life
⚖️ This judgment was not random
👑 Er left no heir behind
📖 Sin carries a real cost

## 👨‍👦 Go In Unto Thy Brother's Wife, And Raise Up Seed To Thy Brother

Judah told his second son Onan to marry Tamar.

This custom is called levirate marriage.

If a married man died with no son, his brother married the widow.

The first son born from that marriage legally continued the dead brother's name.

This custom later became part of the Law in Deuteronomy twenty five.

👨‍👦 Onan was told to marry Tamar
📜 This was called levirate marriage
👶 Her first son would carry Er's name
📖 God later wrote this into the Law

## 🌱 Onan Knew That The Seed Should Not Be His

Onan understood exactly what this custom required.

Any son born to Tamar would legally belong to Er, not to him.

As the oldest surviving son, Onan stood to gain a bigger inheritance if Er stayed childless.

He fully understood the custom.

He simply chose his own gain over his duty.

🌱 Onan knew the custom fully
💰 A childless Er meant more for him
⚖️ He chose gain over duty
📖 Understanding sin does not excuse it

## 🚫 He Spilled It On The Ground, Lest He Should Give Seed To His Brother

This verse is often misread.

Onan's sin was not the private act itself.

His sin was refusing his brother's widow the child she was owed by law.

He wanted the benefits of marriage without the responsibility that came with it.

He used Tamar while denying her the security a son would bring.

🚫 Onan refused Tamar her rightful child
⚖️ His real sin was broken duty
💔 He used her without responsibility
📖 Selfishness hid behind a private act

## ⚖️ The Thing Which He Did Displeased The Lord

God saw more than Onan's outward action.

He saw the greed and deception behind it.

Onan broke a family duty and dishonored his dead brother on purpose.

God judges the heart behind a choice, not only the choice itself.

👁️ God saw Onan's true motive
💔 Greed and deception drove his choice
⚖️ Motives matter as much as actions
📖 God judges the heart, not just deeds

## ☠️ Wherefore He Slew Him Also

The word "wherefore" means because of this.

God judged Onan the same way He had judged Er.

Judah had now lost two sons to his own household's wickedness.

Whatever family Judah was building among the Canaanites was falling apart fast.

☠️ Wherefore means because of this
👨‍👦 Judah lost a second son
🏚️ His new family was falling apart
📖 God judges truly, even in Judah's house

## 🏠 Remain A Widow At Thy Father's House, Till Shelah My Son Be Grown

Judah sent Tamar back to her own father's house.

Widows in this culture had little protection unless a family cared for them.

By law, Judah still owed Tamar his youngest son Shelah as a husband.

This arrangement was only meant to last until Shelah grew older.

🏠 Tamar returned to her father's house
🛡️ Widows depended on family for safety
⏳ Shelah was still too young to marry
📖 Judah still owed her this promise

## 😟 For He Said, Lest Peradventure He Die Also, As His Brethren Did

"Peradventure" is an old word for perhaps or maybe.

Judah feared losing his last living son the way he lost the first two.

He wrongly blamed Tamar for deaths that were really caused by his sons own sin.

Grief had clouded Judah's judgment about where the real danger came from.

😟 Peradventure means perhaps or maybe
💭 Judah feared losing his last son
❌ He blamed the wrong person
📖 Grief can point fear the wrong way

## 💔 The Daughter Of Shuah, Judah's Wife, Died

Time passed and Judah's own wife died.

This left Judah a widower, just as Tamar remained a widow.

Judah still had not kept his promise about Shelah.

His grief did not push him to make things right for Tamar.

💔 Judah's wife died after some years
👤 Both Judah and Tamar were now alone
⏳ Shelah was still not given to her
📖 Judah's promise remained unfulfilled

## 🐑 Judah Went Up Unto His Sheepshearers To Timnath

Sheep shearing marked one of the biggest events of the year.

Shepherds gathered to shear their flocks and sell wool.

It was a season of feasting and celebration.

Judah traveled there with his friend Hirah.

Tamar was about to notice her chance.

🐑 Sheep shearing was a yearly celebration
🍷 It came with feasting and joy
🤝 Judah brought his friend Hirah
📖 Tamar was watching for this moment

# Genesis 38:13-19
# 🎭 Tamar's Disguise
---
## 🐑 It Was Told Tamar, Thy Father In Law Goeth Up To Timnath

Someone told Tamar that Judah was heading to the sheep shearing festival.

Judah would be relaxed and away from his usual watchful family.

Tamar had waited years for Judah to give her Shelah as promised.

Shelah was now fully grown.

Still nothing had happened.

Tamar realized Judah never planned to keep his word.

🐑 Sheep shearing meant Judah would celebrate
👀 Tamar saw her chance arrive
⏳ Shelah had grown with no wedding
📖 Judah had broken his promise

## 👗 She Put Her Widow's Garments Off From Her

For years Tamar had dressed as a widow in mourning.

That clothing publicly showed she was still waiting for Shelah.

Taking it off was a deliberate choice, not a random act.

Tamar decided that waiting any longer would accomplish nothing.

👗 Widow's garments marked her waiting
✋ Removing them was a deliberate choice
⏳ She stopped waiting for Judah's promise
📖 Broken promises pushed her to act

## 🧕 Covered Her With A Vail, And Wrapped Herself

Tamar covered her face so no one could recognize her.

"Wrapped herself" means she completely disguised her appearance.

Women who sat veiled like this near roads were often assumed to be prostitutes.

Judah would see only a hidden stranger, not his daughter in law.

🧕 Tamar hid her face completely
🎭 A veil suggested a prostitute
👀 Judah saw only a stranger
📖 Her disguise was carefully planned

## 🚪 Sat In An Open Place By The Way To Timnath

Tamar chose a spot right beside the road leading to Timnath.

This was likely a well known public place near the town's entrance.

She knew Judah had to pass this exact road to reach the festival.

Every part of her plan had already been thought through.

🚪 The open place sat beside the road
🧭 Judah had to pass this way
🎯 Tamar chose the spot on purpose
📖 Her whole plan was carefully timed

## ⏳ For She Saw That Shelah Was Grown, And She Was Not Given Unto Him To Wife

This verse explains exactly why Tamar acted now.

Shelah had reached full adulthood.

Judah had promised Tamar that Shelah would become her husband.

Instead Judah simply let the years pass.

Tamar finally accepted that the promise was never coming.

⏳ Shelah had reached marrying age
🤝 Judah's promise was never kept
💔 Tamar realized she had been wronged
📖 Justice delayed became justice denied for her

## 💃 When Judah Saw Her, He Thought Her To Be An Harlot

A harlot was a woman paid for sexual relations.

Judah reached that conclusion the moment he saw her covered face.

He did not pause to ask who she was.

His desire moved faster than his judgment.

💃 Harlot means a paid prostitute
👀 Judah assumed this instantly
🏃 He never paused to ask questions
📖 Desire moved faster than judgment

## 😶 Because She Had Covered Her Face

The disguise worked because Tamar's face stayed completely hidden.

Judah never imagined this woman was his own daughter in law.

His desire kept him from looking closely at who she really was.

The veil became the very thing that let her plan succeed.

🎭 Her identity stayed fully hidden
👀 Judah never recognized his own family
🙈 Lust kept him from looking closely
📖 The veil became her greatest tool

## 👉 Let Me Come In Unto Thee

This phrase is a polite Bible way of asking for sexual relations.

Judah believed he was speaking to a prostitute for hire.

He had left his father's household and now sought this without hesitation.

His judgment had been overtaken by his own desire.

👉 The phrase means a request for relations
💰 Judah believed he was hiring her
⚠️ He acted without any hesitation
📖 Lust had taken over his judgment

## 🎭 For He Knew Not That She Was His Daughter In Law

Judah had no idea he was speaking to Tamar.

His own daughter in law stood right in front of him.

The veil had completely hidden her identity from him.

Sin often blinds people to what should be obvious.

🎭 Judah never recognized Tamar
👤 She stood right in front of him
🙈 Sin blinded him to the obvious
📖 Desire clouds what should be plain

## 🐐 What Wilt Thou Give Me, That Thou Mayest Come In Unto Me

Tamar spoke exactly as a hired woman would.

Prostitutes in this culture expected payment before any encounter.

Judah offered a kid, a young goat, from his flock.

A young goat was valuable and a common form of payment.

Judah expected her to simply trust his promise to send it.

💬 Tamar spoke like a hired woman
🐐 A kid means a young goat
💰 Livestock often served as payment
📖 Judah trusted his word would be enough

## 🤝 Wilt Thou Give Me A Pledge, Till Thou Send It

A pledge means collateral left behind as a guarantee.

Tamar knew Judah could simply walk away and never return.

She asked for something valuable to hold until the goat arrived.

Judah agreed and asked exactly what she wanted him to leave.

🤝 A pledge means collateral for a promise
🚶 Tamar feared Judah might not return
📝 She wanted real proof, not just words
📖 Judah agreed without hesitation

## 💍 Thy Signet, And Thy Bracelets, And Thy Staff That Is In Thine Hand

Tamar asked for three very specific items.

The signet was Judah's personal seal, used like a signature.

The bracelets were the cord that held that seal around his neck.

The staff was his walking stick, often carved to mark its owner.

Together these three items could only belong to Judah alone.

💍 The signet was Judah's personal seal
🪢 The cord held the seal in place
🦯 The staff marked his identity too
📖 These items pointed straight back to Judah

## 🤰 He Gave It Her, And Came In Unto Her, And She Conceived By Him

Judah handed over the very items that identified him.

He then had sexual relations with the woman he believed was a stranger.

Unlike Onan earlier in this chapter, Judah made no attempt to prevent a pregnancy.

Tamar conceived.

What began as one sinful choice would carry lasting consequences.

💍 Judah gave up his own identity
🔥 He never suspected who she was
🤰 Tamar conceived that very day
📖 One sinful choice carried lasting weight

## 🚶 She Arose, And Went Away

Once everything was finished, Tamar quietly left the scene.

Judah still had no idea who she really was.

He believed the encounter was already behind him.

Tamar knew this moment had only just begun.

🚶 Tamar left quietly afterward
😶 Judah remained completely unaware
⏳ He thought it was finished
📖 Tamar knew the truth was still coming

## 🧕 Put On The Garments Of Her Widowhood

Tamar removed her veil and dressed again as a widow.

To anyone watching, nothing about her appeared to have changed.

She looked exactly like the patient widow waiting on Judah's promise.

No one around her suspected what had actually taken place.

🧕 Tamar returned to her widow's clothes
👀 Outwardly nothing seemed different
🎭 Her disguise had served its purpose
📖 The truth stayed hidden for now

# Genesis 38:20-23
# 🔍 Hirah Searches For Tamar
---
## 🐐 Judah Sent The Kid By The Hand Of His Friend The Adullamite

Judah kept his promise and sent the young goat through Hirah.

About twenty years had passed since Judah first left his father's household.

Hirah was still one of Judah's closest companions after all that time.

Judah likely avoided going himself to escape the embarrassment of returning there.

🐐 Judah kept his promise to send payment
🤝 Hirah remained his longtime friend
😳 Judah avoided going back himself
📖 Shame shaped how he handled it

## 🔍 To Receive His Pledge From The Woman's Hand, But He Found Her Not

Hirah searched for the woman who held Judah's signet, cord, and staff.

She was simply gone, exactly as Tamar had planned.

Everything about her appearance that day had been temporary.

The evidence of Judah's sin was already out of reach.

🔍 Hirah searched for the woman
🚫 She had already disappeared
🎭 Her presence there was never permanent
📖 Judah's own proof was now gone too

## ❓ Where Is The Harlot, That Was Openly By The Way Side

Hirah asked the local men where this woman could be found.

The word used here points to a shrine prostitute connected with pagan worship.

That is a different word than the one Judah used privately.

Hirah may have used the more respectable term to protect Judah's name.

The men answered that no such woman had ever been there.

❓ Hirah searched openly for her
🛕 This word meant a shrine prostitute
🤐 A softer word may have covered shame
📖 No one there had ever seen her

## 📢 I Cannot Find Her, And Also The Men Of The Place Said There Was No Harlot

Hirah returned to Judah completely empty handed.

The local men insisted no such woman had ever been there.

Judah's signet, cord, and staff were still missing.

Neither man realized the woman they searched for was Judah's own daughter in law.

📢 Hirah came back with nothing
🚫 The town denied any such woman
💍 Judah's belongings were still gone
📖 Neither man knew the real truth

## 😳 Let Her Take It To Her, Lest We Be Shamed

Judah decided to stop searching altogether.

"Lest we be shamed" reveals what actually worried him most.

He feared public embarrassment far more than the sin itself.

Many people fear being caught more than they fear doing wrong.

😳 Judah gave up the search
👀 Shame worried him more than sin
🙈 He wanted to avoid public talk
📖 Exposure fear is not repentance

## 🐐 Behold, I Sent This Kid, And Thou Hast Not Found Her

Judah pointed out that he had done his part.

He had sent the payment as promised.

Hirah had searched faithfully and found nothing.

As far as Judah knew, the matter was now closed.

🐐 Judah sent the promised payment
🔍 Hirah searched but found nothing
✅ Judah considered the matter finished
📖 The truth was only hidden, not gone

# Genesis 38:24-26
# 🔥 Judah's Hypocrisy Exposed
---
## ⏳ About Three Months After

About three months had passed since Judah met the veiled woman.

By now Tamar's pregnancy would have clearly begun to show.

Judah likely believed the whole incident was long behind him.

God was about to bring a hidden sin into the open.

⏳ Three months had already passed
🤰 Tamar's pregnancy had become visible
😌 Judah thought the matter was over
📖 Hidden sin rarely stays hidden

## 🗣️ Tamar Thy Daughter In Law Hath Played The Harlot

Someone brought Judah a report about Tamar's condition.

"Played the harlot" means she was accused of sexual sin outside marriage.

Tamar was still publicly known as Judah's widowed daughter in law.

Everyone assumed she alone had broken that trust.

🗣️ A report reached Judah about Tamar
⚖️ She was accused of sexual sin
👗 She was still counted as his family
📖 No one suspected Judah's own part in it

## 🤰 She Is With Child By Whoredom

The word "whoredom" means sexual sin outside of marriage.

Tamar's pregnancy seemed to confirm the accusation completely.

No one in the crowd knew the true father of the child.

Only Tamar and God knew where the real guilt actually belonged.

📛 Whoredom means sexual sin outside marriage
🤰 Her pregnancy seemed to confirm it
❓ No one knew the real father
📖 Only Tamar and God knew the truth

## 🔥 Bring Her Forth, And Let Her Be Burnt

Judah's response was immediate and severe.

He demanded the harshest possible punishment without asking a single question.

The irony here is impossible to miss.

Judah was ready to condemn Tamar for the very sin he himself had committed.

🔥 Judah demanded a harsh punishment
❓ He never asked any questions
🪞 He condemned the sin he shared
📖 It is easier to judge others than us

## 💍 By The Man, Whose These Are, Am I With Child

As Tamar was being brought out, she did not accuse Judah out loud.

She quietly sent his own belongings back to him instead.

Her message let the evidence speak before any words were needed.

This was Judah's own signet, cord, and staff coming back to confront him.

💍 Tamar sent back the evidence quietly
🤐 She let the objects speak first
🎯 She avoided a public accusation
📖 The proof pointed straight at Judah

## 👀 Discern, I Pray Thee, Whose Are These

"Discern" means to recognize or identify something clearly.

Tamar simply asked Judah to name the owner of these items.

There was no shouting and no long explanation from her.

The evidence alone was about to expose the truth.

👀 Discern means to recognize clearly
🤫 Tamar let the objects do the talking
💍 The signet and staff were unmistakable
📖 Truth needed no extra words here

## 🙏 She Hath Been More Righteous Than I

For the first time in this chapter, Judah stopped blaming someone else.

He openly admitted the items were his own.

Judah was not saying Tamar was without any sin at all.

He was admitting that, in this one matter, she had acted more justly than he had.

🙏 Judah finally admitted his own guilt
⚖️ Tamar had been treated unfairly
🌱 This began Judah's real change
📖 Honest confession starts with owning the truth

## 👨‍👦 Because I Gave Her Not To Shelah My Son

Judah explained exactly why Tamar had acted the way she did.

He admitted he had broken his own promise to her.

Shelah was fully grown.

Judah still never gave him to Tamar as promised.

His broken word had placed Tamar in an impossible position.

👨‍👦 Judah broke his promise about Shelah
📖 Tamar had been treated unfairly
✅ Judah finally accepted responsibility
➡️ Confession begins with owning the truth

## 🤝 He Knew Her Again No More

This phrase means Judah never had sexual relations with Tamar again.

The Bible records this to show the sin was never repeated.

Many believe Judah still took responsibility for Tamar and her children afterward.

The text never states this directly.

This chapter marks the beginning of Judah's real transformation.

🤝 Judah never returned to that sin
👶 Many believe he cared for the children
📜 Scripture does not confirm that detail
📖 This chapter starts Judah's true change

# Genesis 38:27-30
# 👶 Twins Named Pharez And Zarah
---
## 🤰 In The Time Of Her Travail

"Travail" means the painful labor of childbirth.

About six months had passed since Tamar's encounter with Judah.

What began as a hidden sin was becoming part of God's larger plan.

The day had finally come for Tamar to give birth.

🤰 Travail means the pain of labor
⏳ Months had passed since that day
🙏 God was working through a messy start
📖 Birth day had finally arrived

## 👶 Behold, Twins Were In Her Womb

Everyone discovered that Tamar was carrying twins.

Twins were uncommon in the ancient world and were seen as remarkable.

The last twins in Scripture were Jacob and Esau back in Genesis twenty five.

God was again working through an unexpected set of twin sons.

👶 Tamar was carrying twins
📖 The last twins were Jacob and Esau
🌟 Twins were seen as remarkable then
➡️ God was working through them again

## ✋ The One Put Out His Hand

As the first baby began to arrive, something unusual happened.

Instead of the head, a small hand reached out first.

This immediately drew the midwife's attention during the delivery.

It appeared certain that this child would be born first.

✋ A tiny hand appeared first
👶 This was an unusual delivery
👀 The midwife noticed right away
📖 Birth order was about to matter

## 🧵 The Midwife Bound Upon His Hand A Scarlet Thread

The midwife quickly tied a scarlet thread around the tiny wrist.

This marked which twin had appeared first during labor.

In this culture, the firstborn son normally received the family birthright.

The thread was meant to settle any confusion about which son was first.

🧵 A scarlet thread marked the hand
👑 Birth order affected the birthright
❓ Confusion needed a clear answer
📖 The thread was meant to prove it

## ↩️ As He Drew Back His Hand

Something completely unexpected happened next.

The baby whose hand appeared first suddenly pulled it back inside.

No birth was actually completed at that moment.

God was once again overturning what everyone expected.

↩️ The hand was pulled back inside
😲 No birth had actually happened yet
🔄 The expected order was already changing
📖 God works through surprising reversals

## 👶 Behold, His Brother Came Out

The other twin was born first instead.

The baby without the scarlet thread arrived before his brother.

This reversal echoes a pattern seen again and again in Genesis.

Isaac was chosen ahead of Ishmael.

Jacob was chosen ahead of Esau.

Now Pharez arrives ahead of Zarah.

👶 The second twin was born first
🔁 Genesis repeats this reversal pattern
👑 God often favors the unexpected son
📖 Pharez followed that same pattern

## 💥 How Hast Thou Broken Forth? This Breach Be Upon Thee

The midwife reacted with real surprise at what just happened.

"Breach" means a sudden breaking through or bursting out.

This child had unexpectedly pushed past his brother to be born first.

His dramatic entrance became the very reason for his name.

💥 Breach means a sudden breaking through
👶 He pushed past his brother to be first
🏷️ This moment gave him his name
📖 A strange birth carried real meaning

## 📖 His Name Was Called Pharez

The name Pharez means breach, or breaking through.

This baby would become far more important than anyone there could imagine.

He becomes an ancestor of Boaz, King David, and eventually Jesus Christ.

What looked like a strange birth became part of God's redemption plan.

📛 Pharez means breach or breaking through
👑 He becomes King David's ancestor
✝️ His line leads to Jesus Christ
➡️ God works redemption through strange beginnings

## 🔴 Afterward Came Out His Brother That Had The Scarlet Thread

The second twin was finally born after his brother.

The scarlet thread still marked exactly where the midwife had tied it.

That thread proved which child had first reached out during labor.

It gave a clear, physical record of what had actually happened.

🔴 The second twin was born after
🧵 The thread proved his identity
📜 It settled who reached out first
📖 Evidence remained even after the surprise

## 📖 His Name Was Called Zarah

Judah's second son was named Zarah.

The name is connected to Hebrew words for dawn or brightness.

That meaning fits the bright scarlet thread tied around his hand.

His hand appeared first, but Pharez was still born first.

Both twins became founders of family lines within Judah's tribe.

It was through Pharez that the promised line continued toward Boaz, David, and Jesus.

Judah's darkest chapter closes with the unexpected start of that very family line.

📛 Zarah means dawn or brightness
🧵 The thread matched his name's meaning
👑 Pharez carried the promised royal line
➡️ God brought redemption out of Judah's failure`.trim();

export const GENESIS_THIRTY_EIGHT_PERSONAL_SECTIONS = parseGenesisThirtyEightRawNotes(GENESIS_THIRTY_EIGHT_RAW_NOTES);
