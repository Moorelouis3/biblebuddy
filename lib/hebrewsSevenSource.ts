export type HebrewsSevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHebrewsSevenRawNotes(rawText: string): HebrewsSevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HebrewsSevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hebrews\s+7:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hebrews 7 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hebrews\s+7:/i.test(lines[index].trim())) {
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
        !/^#\s+Hebrews\s+7:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hebrews 7 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 7,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hebrews 7:${startVerse}` : `Hebrews 7:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Hebrews 7 sections, received " + sections.length);
  }

  return sections;
}

const HEBREWS_SEVEN_RAW_NOTES = `# Hebrews 7:1-3
# 🗝️ Melchisedec Priest And King
---
## 🏙️ Melchisedec King Of Salem

"Salem" means Jerusalem, under one of its oldest names.

Melchisedec ruled that city generations before King David ever lived there.

He also served as a priest, which was unusual for any king at that time.

Genesis fourteen already introduced him, meeting Abraham after a battle.

🏙️ Salem is an early name for Jerusalem

👑 Melchisedec ruled there as king

🙏 He also served there as priest

📖 Genesis fourteen already introduced this meeting

---
## ⚔️ Returning From The Slaughter Of The Kings

This points back to Genesis fourteen, a real battle Abraham fought.

Four eastern kings had attacked and captured Abraham's nephew Lot.

Abraham gathered his own men and rescued Lot by defeating those kings.

Melchisedec met Abraham on his way home from that victory.

⚔️ Points back to the battle in Genesis fourteen

👨 Four kings had captured Abraham's nephew Lot

🛡️ Abraham defeated them and rescued Lot

📖 Melchisedec met him on the way home

---
## 🙏 Abraham Gave Him A Tenth Part Of All

"Tenth part" means a tithe, a tenth portion given willingly.

Abraham gave this tithe from the spoils of that same battle.

This happened centuries before the law ever commanded any tithe.

It shows Abraham recognized Melchisedec's authority as a true priest of God.

🙏 Tenth part means a tithe

⚔️ Taken from the battle spoils

⏳ This came centuries before the law

📖 Abraham recognized Melchisedec's real authority

---
## 👑 King Of Righteousness And King Of Peace

"Melchisedec" means king of righteousness, built right into his own name.

"Salem" also means peace, so King of Salem means king of peace.

Both titles describe exactly what kind of ruler and priest he was.

Jesus later fulfills both titles perfectly as the true king of peace.

👑 Melchisedec means king of righteousness

🕊️ Salem also means peace

📜 Both titles describe his character

📖 Jesus fulfills both titles completely

---
## 🌳 Without Father Without Mother Without Descent

This does not mean Melchisedec had no actual parents.

Genesis simply never records his birth, his family, or his death.

Levitical priests had to prove their exact family line to serve.

Melchisedec's priesthood stands completely apart from that whole system.

🌳 Not a claim he had no parents

📜 Genesis never records his family line

📋 Levitical priests needed proven lineage

📖 His priesthood stands outside that system

---
## ♾️ Abideth A Priest Continually

Melchisedec's priesthood in the story never shows an ending.

No death is ever mentioned for him anywhere in Genesis.

That silence becomes a picture pointing toward an eternal priesthood.

Jesus is the one who truly abides a priest forever.

♾️ His priesthood in Genesis never ends

🚫 No death is recorded for him

🔮 This pictures an eternal priesthood

📖 Jesus truly is a priest forever

# Hebrews 7:4-10
# 📜 Levi Paid Tithes Through Abraham
---
## 🏔️ Consider How Great This Man Was

The writer stops here to make sure the reader feels the weight of this.

Abraham was the father of the whole nation of Israel.

Even Abraham gave a tenth of everything he had taken in battle.

That single act shows just how much honor Melchisedec deserved.

🏔️ The writer pauses to highlight Melchisedec

👴 Abraham was the father of Israel

🙏 Even Abraham gave him a tithe

📖 This reveals real honor for Melchisedec

---
## 💰 The Patriarch Gave The Tenth Of The Spoils

"Patriarch" means a founding family father whose descendants became a whole nation.

"Spoils" means the goods and wealth captured after a battle victory.

Abraham gave a tenth of that captured wealth to Melchisedec.

Giving away battle spoils voluntarily was a mark of real respect.

👴 Patriarch means a founding family father

⚔️ Spoils means wealth captured after battle

🙏 Abraham gave a tenth of it

📖 This showed real respect for Melchisedec

---
## 📋 A Commandment To Take Tithes Of The People

The sons of Levi became priests under the law of Moses.

God's law commanded them to collect a tenth from their own people.

"Brethren" here means fellow Israelites, people of their own nation.

This system came centuries after Melchisedec had already received a tithe from Abraham.

📋 Levites were priests under the law

💰 The law commanded them to collect tithes

👥 Brethren means their fellow Israelites

📖 This came long after Melchisedec's tithe

---
## 🩸 Out Of The Loins Of Abraham

"Loins" here is an old way of describing physical descent from someone.

"Out of the loins of Abraham" simply means born as his physical descendants.

Levi himself was one of those later descendants, generations down the line.

The whole Levitical priesthood traces back to this one ancestor.

🩸 Loins describes physical descent

👶 It means born as Abraham's descendants

📜 Levi was one of those descendants

📖 The priesthood traces back to Abraham

---
## 👤 His Descent Is Not Counted From Them

"Them" refers to the sons of Levi and their priestly line.

Melchisedec's ancestry is never traced through Levi's family at all.

He received tithes from Abraham long before Levi's line even existed.

His authority came from somewhere entirely outside that whole system.

👤 Them means the sons of Levi

🚫 Melchisedec is not from that line

⏳ He received tithes before Levi existed

📖 His authority came from outside that system

---
## 🙌 Blessed Him That Had The Promises

Abraham already carried God's promises of a nation and a blessing.

Melchisedec still blesses Abraham, even though Abraham held those promises.

Blessing someone usually comes from a position above them, not below.

This small detail quietly reveals Melchisedec's real seniority over Abraham.

📜 Abraham already held God's promises

🙌 Melchisedec still blessed Abraham anyway

⬆️ Blessing comes from a higher position

📖 This reveals Melchisedec's seniority

---
## ⚖️ The Less Is Blessed Of The Better

This states a simple rule everyone in that culture understood.

The person giving a blessing always ranks above the person receiving it.

Abraham receives the blessing here, which makes him the lesser one.

That makes Melchisedec clearly the greater figure in this meeting.

⚖️ A simple, widely understood rule

⬆️ The blesser ranks above the blessed

👴 Abraham is the one blessed here

📖 This marks Melchisedec as greater

---
## ⚰️ Men That Die Receive Tithes

Every Levitical priest who ever collected a tithe eventually died.

Death was simply a normal part of that entire priesthood.

Nothing about their role lasted beyond their own lifetime.

That mortality becomes the exact contrast the next line makes.

⚰️ Every Levitical priest eventually died

⏳ Death limited their whole priesthood

🔁 A new priest replaced each one

📖 This sets up the coming contrast

---
## 👁️ Of Whom It Is Witnessed That He Liveth

This does not claim Melchisedec never actually died as a person.

Genesis simply never records any death for him at all.

That silence in the text gets treated here as meaningful testimony.

It pictures a priesthood that never has to be passed on.

👁️ Not a claim he never died

📜 Genesis records no death for him

🔮 That silence becomes meaningful here

📖 It pictures a priesthood without end

---
## 🤲 Levi Also Payed Tithes In Abraham

Levi was not even born yet when Abraham met Melchisedec.

"In Abraham" treats Levi as present inside his ancestor at that moment.

Ancient thinking often saw a whole family as already present in its head.

So when Abraham paid the tithe, Levi is counted as paying it too.

👶 Levi was not yet born

🤲 In Abraham means present through his ancestor

👪 A family was seen as one unit

📖 Levi paid tithes through Abraham

# Hebrews 7:11-14
# ⚖️ A Priesthood That Had To Change
---
## ⚖️ If Perfection Were By The Levitical Priesthood

"Perfection" here means reaching the complete goal God intended all along.

The Levitical priesthood could offer sacrifices, but it could never finish that goal.

If it truly could have, no second priesthood would ever be needed.

The fact that one came later proves the first could not finish the job.

⚖️ Perfection means reaching God's full goal

📋 Levitical priests could not finish that goal

🔁 Otherwise no second priesthood was needed

📖 A later priesthood proves the first fell short

---
## 📜 For Under It The People Received The Law

The Levitical priesthood and the law of Moses were tied together completely.

You could not have one system without the other alongside it.

This matters because changing the priesthood later also changes the law itself.

That connection sets up the whole argument running through this chapter.

📜 Priesthood and law were tied together

🔗 Neither system worked without the other

🔁 Changing one changes the other too

📖 This sets up the chapter's whole argument

---
## 🧭 After The Order Of Melchisedec And Not Aaron

"The order of Aaron" means the normal Levitical priestly line, Aaron's descendants.

"The order of Melchisedec" points instead to that older, different kind of priest.

Psalm one hundred ten had already predicted a priest in that older order.

Naming a different order at all signals something in the system needed to change.

🧭 Aaron's order means the normal Levitical line

🗝️ Melchisedec's order is older and different

🔁 A different order signals real change

📖 Psalm one hundred ten predicted this priest

---
## 🔄 The Priesthood Being Changed

Priesthood and law stood together as one connected system, as verse eleven already showed.

Changing something as central as the priesthood could not happen alone.

The law that governed the old priesthood had to shift along with it.

This change prepares the reader for a whole new kind of covenant.

🔄 Priesthood and law were one system

⚖️ Changing one required changing the other

📜 The old law had to shift too

📖 This prepares for a new covenant

---
## 🌿 Pertaineth To Another Tribe

"Pertaineth" means belongs to, in this older style of English.

This new priest comes from a completely different tribe of Israel.

No man from that tribe had ever served at the altar before.

That single fact already breaks the old priestly pattern completely.

🌿 Pertaineth means belongs to

🧬 This priest comes from a different tribe

🚫 No one from that tribe served

📖 This breaks the old pattern completely

---
## 👑 Our Lord Sprang Out Of Juda

"Juda" is another spelling of Judah, the tribe Jesus actually came from.

Judah was known for kings, not for priests, under the old law.

Moses never once connected that royal tribe to priestly service.

Jesus arriving from Judah already breaks the expected priestly line.

👑 Juda is Judah, Jesus's own tribe

🏰 Judah was known for kings, not priests

📜 Moses never linked Judah to the priesthood

📖 Jesus already breaks the expected pattern

# Hebrews 7:15-19
# 🌱 A Priest By The Power Of Endless Life
---
## 🌱 After The Similitude Of Melchisedec

"Similitude" means likeness or resemblance, not an exact identical copy.

This new priest resembles Melchisedec's pattern more than Aaron's pattern.

That resemblance was the whole point made back in verse eleven.

A priest like Melchisedec was always the real plan.

🌱 Similitude means likeness, not identical copy

🗝️ This priest resembles Melchisedec's pattern

🧭 Not Aaron's pattern at all

📖 A priest like Melchisedec was the plan

---
## 🧬 Not After The Law Of A Carnal Commandment

"Carnal" here means physical or bodily, tied to bloodline and birth.

The old priesthood depended entirely on being born into the right family.

This new priesthood does not depend on physical descent at all.

Something deeper qualifies this priest instead of bloodline.

🧬 Carnal means physical, tied to bloodline

👪 The old priesthood required the right birth

🚫 This priesthood does not depend on that

📖 Something deeper qualifies this priest

---
## ♾️ After The Power Of An Endless Life

This priest qualifies through a life that simply never ends.

No family tree could ever grant that kind of qualification.

Only God himself could give someone an endless life like this.

That life, not a birth certificate, makes this priesthood valid.

♾️ Endless life is the real qualification

🚫 No family tree could grant this

🙌 Only God could give a life like this

📖 Life itself makes this priesthood valid

---
## 📜 Thou Art A Priest For Ever After The Order Of Melchisedec

This exact line quotes Psalm one hundred ten again, word for word.

God himself speaks this declaration directly over this priest.

Repeating it here confirms the promise is being fulfilled, not just repeated.

This is the verse the whole chapter has been building toward.

📜 This quotes Psalm one hundred ten

🗣️ God himself speaks this declaration

✅ It confirms the promise being fulfilled

📖 The whole chapter builds toward this verse

---
## 🔚 A Disannulling Of The Commandment Going Before

"Disannulling" means setting aside or canceling something that was once in force.

"The commandment going before" points back to the whole Levitical system.

"Weakness and unprofitableness" means that old system could not finish the job it started.

Setting it aside was not a mistake, it was always part of the plan.

🔚 Disannulling means canceling, setting aside

📜 This points to the old Levitical system

⚠️ It could never finish its own job

📖 Setting it aside was always the plan

---
## 🌉 The Law Made Nothing Perfect

The entire system of law and sacrifice could never fully complete its goal.

It could point toward forgiveness but never fully provide it.

This was true the whole time, by God's own design.

The law was always meant to prepare the way for something better.

🌉 The law could not finish its goal

👉 It pointed toward forgiveness, not provided it

📐 This was true by God's own design

📖 The law prepared the way for something better

---
## 🙏 The Bringing In Of A Better Hope

"A better hope" means the hope now found through Jesus as priest.

This new hope actually accomplishes what the old system only pointed toward.

Through this hope, people can now draw near to God directly.

That closeness was never fully possible under the old priesthood.

🙏 A better hope points to Jesus

✅ It accomplishes what the old system pointed to

🚪 People can now draw near to God

📖 Closeness was never possible before

# Hebrews 7:20-22
# 🤝 Made Priest With An Oath
---
## ⚖️ Not Without An Oath He Was Made Priest

This points out something that marks this priesthood as different and special.

God did not just appoint this priest, he swore an oath over it.

No Levitical priest in Israel's history was ever appointed with an oath.

That single difference carries huge weight for the rest of the argument.

⚖️ This priesthood came with an oath

🙌 God swore over this appointment

🚫 No Levitical priest had this oath

📖 This difference carries real weight

---
## 🗣️ The Lord Sware And Will Not Repent

"Repent" here means change his mind or take back what he said.

God is quoted swearing this oath directly, in his own words.

"Will not repent" means this decision will never be reversed or undone.

God's own permanence backs up this priest's permanence.

🗣️ Repent here means change his mind

🙌 God swears this in his own words

🔒 He will never reverse this decision

📖 God's permanence backs this priesthood

---
## 📝 Jesus Made A Surety Of A Better Testament

"Surety" means a guarantee, like someone who personally backs up a loan.

"Testament" here means covenant, a binding agreement between God and his people.

Jesus himself personally guarantees this new and better covenant works.

Nothing about this agreement depends on human performance to hold up.

📝 Surety means a personal guarantee

🤝 Testament means a binding covenant

🙌 Jesus personally guarantees this covenant

📖 Its strength does not depend on us

# Hebrews 7:23-25
# ♾️ A Priesthood That Never Ends
---
## ⚰️ They Truly Were Many Priests

Count every single high priest who ever served under the old system.

The number was large because each one eventually died in office.

Death kept forcing a new priest to replace the last one.

That constant turnover becomes the direct contrast in the next verse.

⚰️ Many priests served under the old system

📈 The number was large because of death

🔁 Death kept forcing new replacements

📖 This sets up the coming contrast

---
## ♾️ Because He Continueth Ever

Jesus never needs to be replaced the way every past priest did.

His life simply does not end the way a normal life does.

"Unchangeable" here means this priesthood cannot be passed to anyone else.

Only Jesus holds this particular priesthood, forever.

♾️ Jesus never needs to be replaced

🔒 Unchangeable means it cannot pass to another

🙌 Only Jesus holds this priesthood

📖 His priesthood lasts forever

---
## 🙏 Able Also To Save Them To The Uttermost

"To the uttermost" means completely, leaving nothing left undone or unfinished.

This is not a partial or limited kind of salvation.

Jesus can save someone all the way, start to finish.

Nothing about a person's need is too much for this priest.

🙏 Uttermost means completely, nothing left out

✅ This salvation is not partial

🔒 Jesus saves all the way through

📖 No need is too much for him

---
## 🙌 Ever Liveth To Make Intercession For Them

"Intercession" means stepping in to speak or act on someone else's behalf.

Jesus is not pictured here as distant or inactive in heaven.

He is continually, actively praying and speaking for his people right now.

That ongoing work never stops, because his life never stops either.

🙌 Intercession means speaking on someone's behalf

👀 Jesus is not distant or inactive

🗣️ He actively prays for his people now

📖 This ongoing work never stops

# Hebrews 7:26-28
# ✨ Such A High Priest
---
## ✨ Holy Harmless Undefiled Separate From Sinners

"Harmless" here means never once causing any real harm to anyone.

"Undefiled" means never stained or corrupted by sin at all.

These four words describe a priest with a flawless moral character.

No earthly high priest could ever honestly claim all four at once.

✨ Harmless means never causing harm

🧼 Undefiled means never stained by sin

📋 Four words describe flawless character

📖 No earthly priest could claim all four

---
## ⬆️ Made Higher Than The Heavens

This describes Jesus's current position, exalted above everything created.

No location on earth could ever hold a priest this high.

That high position matches the permanence already described earlier in the chapter.

This priest is not just different in kind, but in rank.

⬆️ Jesus is exalted above everything

🌌 No earthly place could hold him

🔒 This matches his permanence already shown

📖 He differs in both kind and rank

---
## 🔁 Needeth Not Daily To Offer Up Sacrifice

This does not describe a priest repeating sacrifices over and over.

Old high priests had to sacrifice for their own sins first.

Only after that could they even offer anything for the people.

That constant repetition exposed how incomplete each sacrifice really was.

🔁 Old priests repeated sacrifices often

🙏 They first had to cover their own sin

👥 Only then could they help the people

📖 Repetition showed each sacrifice fell short

---
## ✝️ This He Did Once When He Offered Up Himself

Jesus needed no sacrifice for his own sin, since he had none.

He offered himself, not an animal, as the one true sacrifice.

That sacrifice happened a single time, never to be repeated.

One perfect offering finished what endless repeated offerings never could.

✝️ Jesus had no sin of his own

🙏 He offered himself, not an animal

✅ This happened only once

📖 One offering finished what many could not

---
## 📋 The Law Maketh Men High Priests Which Have Infirmity

"Infirmity" means weakness, both moral weakness and simple human limitation.

Every priest appointed under the old law shared that same weakness.

That weakness was never fixed, only worked around, generation after generation.

It was simply the best the old system could offer.

📋 Infirmity means weakness and limitation

👥 Every old priest shared that weakness

🔁 It was worked around, not fixed

📖 This was the old system's best

---
## 🙌 The Son Who Is Consecrated For Evermore

"Consecrated" means set apart, made holy for a specific, lasting purpose.

"The word of the oath" points back to the oath from verse twenty one.

That oath came after the law, specifically to appoint a better priest.

This closing line sums up the entire chapter in one sentence.

🙌 Consecrated means set apart for a purpose

📜 This points back to the earlier oath

⏳ The oath came after the law

📖 This line sums up the whole chapter
`.trim();

export const HEBREWS_SEVEN_PERSONAL_SECTIONS = parseHebrewsSevenRawNotes(HEBREWS_SEVEN_RAW_NOTES);
