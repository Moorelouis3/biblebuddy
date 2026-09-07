export type PsalmsFiftyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFiftyOneRawNotes(rawText: string): PsalmsFiftyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFiftyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+51:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 51 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+51:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+51:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 51 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 51,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 51:${startVerse}` : `Psalms 51:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 51 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FIFTY_ONE_RAW_NOTES = `# Psalms 51:1-4
# 😔 David Confesses His Sin
---
## 🙏 Have Mercy Upon Me, O God

David did not write this psalm from a place of comfort.

The prophet Nathan had just confronted him after he took another man's wife and had that man killed.

This psalm is David's answer once his sin was exposed.

"Mercy" here means undeserved kindness toward someone who deserves punishment.

David is not asking for fairness.

He is asking for something he has no right to demand.

😔 David wrote this after Nathan's confrontation

🗡️ His sin involved Bathsheba and her husband

🙏 Mercy means kindness he does not deserve

📖 David asks for what he cannot demand

## 💞 According To Thy Lovingkindness

"Lovingkindness" translates the Hebrew word hesed.

Hesed describes the loyal love God promised inside His covenant with Israel.

David is not appealing to a stranger's mood.

He is appealing to a love God already bound Himself to give.

That distinction is the only reason David dares to ask at all.

💞 Lovingkindness translates the Hebrew hesed

🤝 Hesed means covenant loyal love

🔒 God already bound Himself to this love

📖 David appeals to a promise, not a mood

## 📜 Blot Out My Transgressions

"Transgressions" means deliberate rebellion.

It is not an accident or a small mistake.

"Blot out" was a term for erasing a written record.

Ancient officials kept written lists of debts and offenses.

David pictures his sin as a debt only God can erase.

⚔️ Transgressions means deliberate rebellion

🚫 This is not an innocent mistake

📜 Blot out pictures erasing a written record

📖 Only God can erase this kind of debt

## 🧼 Wash Me Throughly From Mine Iniquity

"Throughly" is an old spelling of thoroughly.

It means completely, with nothing left out.

"Iniquity" describes a crooked, twisted condition inside a person.

David does not ask for a light rinse.

He pictures a stain so deep that only a complete washing will work.

🧼 Throughly means completely, nothing left out

🌀 Iniquity means a twisted inward condition

💧 David does not want a light rinse

📖 He needs a complete washing, not partial

## 🎯 Cleanse Me From My Sin

This psalm stacks three different Hebrew words for wrongdoing in its opening lines.

"Transgression" means rebellion against a ruler.

"Iniquity" means a twisted inward condition.

"Sin" means missing the mark, like an arrow falling short of its target.

David piles up all three words on purpose.

He wants God to know he understands the full weight of what he did.

🎯 Sin means missing the mark

🔤 Three different Hebrew words appear here

📚 Each word names a different angle on guilt

📖 David names the full weight of his failure

## 🙋 I Acknowledge My Transgressions

"Acknowledge" means more than simply noticing a fact.

It means owning something as true about yourself, out loud.

David is not describing his sin the way a bystander would.

He is confessing it as his own.

🙋 Acknowledge means owning it, not just noting it

🗣️ David confesses out loud, not silently

👤 This sin belongs to him, not someone else

📖 Real confession takes ownership

## 🧠 My Sin Is Ever Before Me

David just asked God to blot his sin out of the record.

Here he admits he cannot blot it out of his own mind.

The memory replays whether he wants it to or not.

Being forgiven does not erase the weight of what happened.

🧠 David cannot forget what he did

🔁 The memory replays without being invited

⚖️ Forgiveness does not erase memory

📖 Guilt can linger even after mercy is granted

## ❌ Against Thee, Thee Only, Have I Sinned

This does not mean David believes he did nothing wrong to Bathsheba or her husband.

Both were genuinely wronged by what he did.

"Thee only" means every sin is ultimately an offense against the God who set the standard.

David is naming the deepest layer of his guilt.

He is not denying the human damage he caused.

❌ This does not excuse the harm to others

👥 Bathsheba and her husband were truly wronged

⚖️ Every sin is ultimately against God's standard

📖 David names the deepest layer of his guilt

## ⚖️ That Thou Mightest Be Justified When Thou Speakest

"Justified" is a courtroom word meaning proven right.

David says that even God's harshest verdict against him would be completely fair.

He is not negotiating for a lighter sentence.

He is agreeing in advance that God's judgment is correct.

⚖️ Justified means proven right in court

✅ David agrees God's verdict is fair

🙅 He is not asking for a lighter sentence

📖 True confession agrees with the verdict

# Psalms 51:5-9
# 🌊 Purged And Made Clean
---
## 🌱 I Was Shapen In Iniquity

This does not mean David's mother sinned by conceiving him.

It means human sinfulness runs deeper than any single choice a person makes.

The next phrase, "in sin did my mother conceive me," says the same thing again in different words.

Hebrew poetry often repeats one idea twice for emphasis.

David is tracing his guilt all the way back to the beginning of his own life.

❌ This is not an accusation against his mother

🌱 Sinfulness runs deeper than any single choice

🔁 The next phrase repeats the same idea

📖 David traces guilt to his very beginning

## 👁️ Thou Desirest Truth In The Inward Parts

"Inward parts" means a person's private thoughts and motives.

These are the parts no one else can see.

God is not satisfied by a correct performance on the outside.

He wants honesty in the places only He can observe.

David had hidden the truth from everyone around him for months.

👁️ Inward parts means private thoughts and motives

🎭 Outward performance is not what God wants

🔍 God sees what nobody else can

📖 David had hidden the truth for months

## 🧠 In The Hidden Part Thou Shalt Make Me To Know Wisdom

The "hidden part" repeats the same idea as "inward parts."

This is another example of Hebrew parallelism, one idea said twice.

David asks God to plant real wisdom in that same private space.

This is not knowledge learned from a book.

It is an honest self understanding that only God can give.

🔁 Hidden part repeats inward parts again

🧠 David asks for wisdom in that same place

📚 This is not book knowledge

📖 It is honest self understanding from God

## 🌿 Purge Me With Hyssop

"Hyssop" was a small leafy plant used in Israel's cleansing ceremonies.

Priests dipped hyssop branches in blood or water to declare someone clean again.

It appears at the first Passover and in the rites for skin disease.

David borrows this priestly picture for his own soul instead of his skin.

🌿 Hyssop was a small plant used in rituals

🩸 Priests used it to sprinkle blood or water

🐑 It appears at the first Passover

📖 David asks the same, for his soul

## ❄️ I Shall Be Whiter Than Snow

White was already the ancient picture of complete purity.

David does not ask to be improved.

He asks to be made new, as if the stain never happened.

This is a bigger request than simply feeling better.

❄️ White pictured complete purity

🚫 David does not ask to be merely improved

✨ He asks to be made new

📖 This is bigger than just feeling better

## 🦴 That The Bones Which Thou Hast Broken May Rejoice

David is not describing an actual physical injury.

Ancient Hebrew often described deep emotional pain using physical body language.

Crushing guilt can feel as real and disabling as a broken bone.

David asks for joy strong enough to reach even that deep.

🦴 This is not a literal physical injury

💔 Hebrew often described pain in body language

⚖️ Guilt can feel as heavy as a fracture

📖 David asks for joy that reaches that deep

## 🙈 Hide Thy Face From My Sins

"Hide thy face" usually describes God turning away from someone in judgment.

Here David flips the idiom around.

He asks God to turn away from something specific, his list of sins.

He wants God to stop viewing the evidence against him.

🙈 Hide thy face usually means God turning away

🔄 Here David flips the idiom around

📋 He wants God to stop viewing the evidence

➡️ This repeats the blot out request differently

## 🔁 Blot Out All Mine Iniquities

This phrase deliberately echoes "blot out my transgressions" from verse one.

David returns to his opening request once more.

Repeating it here forms a bookend around his entire confession.

The request that opened the psalm is the same request that closes this section.

🔁 This echoes the opening line of the psalm

🎯 Same request, same urgency, repeated again

📚 The confession section is now bookended

➡️ The next section moves toward restoration

# Psalms 51:10-15
# 🔄 A New Heart And A New Song
---
## 🎨 Create In Me A Clean Heart, O God

"Create" translates the Hebrew word bara.

This exact word is used only for something God does, never for human effort.

It is the same word used for God making the world out of nothing in Genesis.

David is not asking for self improvement.

He is asking God to make something entirely new that did not exist before.

🎨 Create translates the Hebrew word bara

🌍 The same word describes Genesis creation

🚫 This is not self improvement

📖 David asks for something entirely new

## 🔧 Renew A Right Spirit Within Me

"Renew" means to restore something back to its original working order.

A "right spirit" describes steady loyalty and a settled direction toward God.

David's own choices had already proven his old direction was broken.

He asks God to reset that direction from the inside out.

🔧 Renew means restoring proper working order

🧭 Right spirit means steady loyalty toward God

💥 David's own choices had proven this was broken

📖 He asks God to reset the direction

## 👑 Cast Me Not Away From Thy Presence

David had personally watched what happened to Saul, Israel's first king.

Saul disobeyed God, and God's Spirit eventually left him for good.

David is not asking a vague, general question here.

He is asking not to end up like the king he once served.

👑 David had watched King Saul's story unfold

💨 God's Spirit had left Saul for good

😨 David fears repeating that same ending

📖 This request has a real person behind it

## 📜 Take Not Thy Holy Spirit From Me

In the Old Testament, God's Spirit came upon specific people for specific tasks.

That presence was not automatically permanent the way it is described later in the New Testament.

David had seen it removed from Saul within his own lifetime.

His fear here was real, not just poetic language.

📜 The Spirit came for specific tasks then

⏳ It was not automatically permanent back then

👁️ David had watched it leave Saul directly

📖 This fear was real, not just poetic

## 🙅 Restore Unto Me The Joy Of Thy Salvation

David is not asking God for salvation itself here.

He already had that as part of his covenant relationship with God.

What he lost was the "joy" of it, the felt experience of that relationship.

Guilt had drained the feeling even though the relationship itself was not broken.

🙅 This is not a request for salvation itself

🤝 David already had that covenant relationship

😔 What he lost was the joy of it

📖 Guilt had drained the feeling, not the relationship

## 🔓 Uphold Me With Thy Free Spirit

"Free" here does not mean freedom in the modern sense.

It describes a spirit that is willing and generous, not forced.

David asks to be upheld by that same willing spirit inside himself.

He wants obedience that flows freely again, not obedience dragged out of him.

🔓 Free here does not mean modern freedom

🎁 It means a willing, generous spirit

🏗️ David asks to be upheld by that spirit

📖 He wants obedience that flows freely again

## 🎓 Then Will I Teach Transgressors Thy Ways

David does not plan to hide what happened to him.

He plans to use it to teach other guilty people how to come back to God.

This turns his worst failure into something useful for someone else.

"Transgressors" is the same Hebrew word David used for his own sin back in verse one.

🙊 David does not plan to hide his failure

🎓 He plans to teach other guilty people

♻️ His worst failure becomes useful to someone else

📖 Transgressors echoes his own confession in verse one

## 🩸 Deliver Me From Bloodguiltiness

"Bloodguiltiness" means the specific guilt of having caused someone's death.

David arranged for Uriah, Bathsheba's husband, to be killed in battle to cover up his sin.

This is not a vague, general request for forgiveness.

It names the one part of his sin that cannot simply be undone.

🩸 Bloodguiltiness means guilt for causing death

⚔️ David arranged Uriah's death in battle

🙅 This request is specific, not vague

📖 Some parts of sin cannot be undone

## 🎤 My Tongue Shall Sing Aloud Of Thy Righteousness

David promises a response, not just a request.

Once forgiven, his own mouth will publicly praise the fairness of God's judgment against him.

That is a striking promise from someone whose sin was just publicly exposed.

Real forgiveness, in David's mind, leads to open praise instead of quiet relief.

🎤 David promises a response, not just a request

📢 His mouth will publicly praise God's fairness

😳 This is striking given his public exposure

📖 Real forgiveness leads to open praise

## 🗣️ O Lord, Open Thou My Lips

David has not lost the physical ability to speak.

Guilt and shame had silenced any honest worship coming from him.

He asks God to reopen a kind of speech that sin had shut down.

Only after that reopening can real praise begin.

🗣️ David has not lost his ability to speak

🤐 Guilt had silenced his honest worship

🔓 He asks God to reopen honest speech

📖 Real praise can only follow this reopening

# Psalms 51:16-19
# 🙏 True Sacrifice Repairs What Ritual Cannot
---
## 🚫 Thou Desirest Not Sacrifice

This does not mean God rejects animal sacrifice as a system.

David killed a man to hide his sin, a crime no animal offering could legally cover.

Psalm 50 already made a similar point, that God never needed sacrifices to be fed.

Here the problem is sharper, since David's specific sin sat outside what any ritual could fix.

🚫 This does not reject sacrifice as a system

⚔️ David's sin involved murder, not just ritual failure

🔁 Psalm 50 already made a similar point

📖 No ritual could legally cover this specific sin

## 🧱 The Sacrifices Of God Are A Broken Spirit

A "broken spirit" describes a will that has stopped resisting God.

It is not depression or self hatred.

It means the stubborn pride that led to David's sin has finally given way.

That inward posture is the only offering that actually fits his situation.

🧱 Broken spirit means a will that stops resisting

🚫 This is not depression or self hatred

👑 It means stubborn pride has given way

📖 This is the only offering that fits here

## 💔 A Broken And A Contrite Heart

"Contrite" means crushed by genuine sorrow over real wrong.

It is not the same as embarrassment at simply being caught.

"Despise" means to reject with contempt.

David promises that this kind of honest heart is something God will never turn away.

That promise still holds for anyone who comes to God the same way David did here.

💔 Contrite means crushed by genuine sorrow

🙅 Despise means to reject with contempt

🚪 God never turns away a heart like this

📖 This promise still holds for anyone today

## 🏙️ Build Thou The Walls Of Jerusalem

This line shifts from David's personal guilt to the wellbeing of the whole nation.

As king, David's sin had put the nation he led at risk, not only himself.

"Build thou the walls of Jerusalem" prays for the city's protection and future strength.

A leader's private failure and a nation's public welfare were never fully separate.

🏙️ The focus shifts from personal to national

👑 A king's sin puts the nation at risk

🧱 This prays for the city's future strength

📖 Private failure and public welfare are linked

## 🔄 Then Shall They Offer Bullocks Upon Thine Altar

The psalm opened by saying God did not want an animal sacrifice.

It closes by describing a future where those same sacrifices are welcomed again.

The difference is not the ritual itself.

It is the heart the ritual now comes from.

Psalm 51 follows the same pattern from beginning to end.

🐂 Bullocks were young bulls used in sacrifice

🔄 The psalm circles back to sacrifice again

❤️ The difference now is the heart behind it

📖 Inward change always comes before true worship

## 📈 Whole Burnt Offering

A regular burnt offering already burned the entire animal on the altar.

A "whole burnt offering" describes an even larger version of that same sacrifice.

Naming this bigger offering fits the future scene David imagines in the verse before.

The wall rebuilt, and a whole nation worshipping together at full strength.

🔥 Burnt offerings already burned the whole animal

📈 Whole burnt offering describes an even bigger version

🏙️ This fits the national scale just named

📖 A rebuilt nation worships together at full strength
`.trim();

export const PSALMS_FIFTY_ONE_PERSONAL_SECTIONS = parsePsalmsFiftyOneRawNotes(PSALMS_FIFTY_ONE_RAW_NOTES);
