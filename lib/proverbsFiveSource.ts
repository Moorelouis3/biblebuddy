export type ProverbsFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsFiveRawNotes(rawText: string): ProverbsFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 5:${startVerse}` : `Proverbs 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Proverbs 5 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_FIVE_RAW_NOTES = `# Proverbs 5:1-2
# 👂 A Father Calls For Careful Attention
---
## 👂 My Son Attend Unto My Wisdom

Attend means much more than simply hearing the sound of words.

It means turning full attention toward what is being taught.

Solomon used this same opening in the chapters before this one.

He is calling his son back to careful listening one more time.

👂 Attend means full careful attention

🔁 Solomon repeats this same opening again

📚 More than simply hearing sound

📖 Careful listening comes before every warning

---

## 🧍 Bow Thine Ear To My Understanding

Bowing the ear pictures leaning the whole body toward a speaker.

It is a physical picture for total inward focus.

A person can hear words without ever truly bowing toward them.

Solomon wants his son leaning in, not standing at a distance.

👂 Bowing the ear means leaning in

🧍 A picture of the whole body listening

🙅 Hearing sound is not the same as this

📖 Solomon wants nearness, not distance

---

## 🧠 That Thou Mayest Regard Discretion

Discretion means the ability to tell a wise choice from a harmful one.

This chapter will spend its entire length testing exactly that kind of choice.

Regarding discretion means valuing it enough to actually use it.

Solomon is preparing his son before temptation ever appears.

🧠 Discretion means telling wise from harmful

📏 This whole chapter tests that skill

💎 Regarding it means valuing it enough

📖 Solomon prepares his son before temptation

---

## 💋 Thy Lips May Keep Knowledge

Keeping knowledge here means guarding it the way a treasure is guarded.

The lips are where inward knowledge becomes outward speech.

Wise knowledge kept inside should shape what a person actually says.

This verse links right thinking directly to right speaking.

💋 Lips means what a person says

🔒 Keep means guarding like a treasure

🗣️ Inward knowledge becomes outward speech

📖 Right thinking should shape right speech

# Proverbs 5:3-6
# 🍯 The Sweet Talk That Leads To Death
---
## 🚫 The Lips Of A Strange Woman

A strange woman in this context means a woman outside marriage who tempts a man to sin.

She is called strange because she stands outside the bond God designed for marriage.

Solomon is not describing a stranger in the modern sense of someone unknown.

He is warning about an affair, not a random encounter.

🚫 Strange woman means one outside marriage

💍 She stands outside God's design for marriage

🙅 Not a stranger in the modern sense

📖 Solomon warns against a forbidden affair

---

## 🍯 Her Lips Drop As An Honeycomb

Honeycomb was one of the sweetest things a person in this culture ever tasted.

Comparing her words to honey pictures speech that feels irresistible in the moment.

The sweetness describes how the temptation sounds, not how it will end.

Solomon wants his son to notice the taste before he notices the trap.

🍯 Honeycomb was the sweetest taste known

👄 Her words are pictured as that sweet

👂 Describes how the temptation sounds

📖 Notice the taste before the trap

---

## 🫒 Her Mouth Is Smoother Than Oil

Oil in this culture was used to soften skin and help things slide easily.

Calling her mouth smoother than oil pictures speech with no friction or resistance.

Nothing about what she says catches or warns the listener.

Smooth talk is dangerous exactly because it never sounds dangerous.

🫒 Oil was used to soften and smooth

👄 Her speech has no friction at all

⚠️ Nothing in it warns the listener

📖 Smooth talk hides its own danger

---

## 🌿 Her End Is Bitter As Wormwood

Wormwood was a real plant known across the ancient world for its intensely bitter taste.

The sweetness in her mouth and the bitterness at her end stand in sharp contrast.

Solomon is showing that the beginning of sin never matches its outcome.

What tastes sweet at first can still end in real bitterness.

🌿 Wormwood was a plant known for bitterness

🔀 Sweet mouth, bitter end, contrast on purpose

🎭 The start of sin hides its outcome

📖 Sweet beginnings can still end bitter

---

## ⚔️ Sharp As A Two Edged Sword

A two edged sword cuts on both the way in and the way out.

There is no safe direction to approach a blade built like that.

The picture shifts suddenly from taste to a weapon that wounds.

Whatever comfort her words offered has just turned into real danger.

⚔️ Cuts both going in and out

🙅 No safe direction to approach it

🔀 Shifts suddenly from taste to weapon

📖 Comfort has turned into real danger

---

## 🦶 Her Feet Go Down To Death

Feet in Proverbs regularly picture the direction a person's whole life is heading.

Going down pictures a steady decline, not a single sudden fall.

This is not a threat about being killed by someone else.

Her own path is described as leading toward death itself.

🦶 Feet picture the direction of a life

📉 Going down means a steady decline

🙅 Not a threat from another person

📖 Her own path leads toward death

---

## ⚰️ Her Steps Take Hold On Hell

Hell here translates a Hebrew word for the realm of the dead, not fiery punishment alone.

Taking hold pictures something gripping tightly and refusing to let go.

Her steps are not just heading toward death, they are gripped by it.

The picture grows more urgent with each phrase in this verse.

⚰️ Hell means the realm of the dead

🤝 Taking hold means gripping tightly

🔗 Her steps are gripped, not just heading

📖 The danger grows more urgent here

---

## 🛑 Lest Thou Shouldest Ponder The Path Of Life

Ponder means to stop and weigh something out carefully before acting.

She deliberately keeps her victim from stopping to think clearly.

The path of life is the steady, wise road Solomon has praised throughout this book.

Confusion is her strategy, not an accident of her character.

🛑 Ponder means stopping to think carefully

🚫 She keeps her victim from thinking

🛤️ Path of life is the wise road

📖 Confusion is her strategy on purpose

---

## 🌀 Her Ways Are Moveable That Thou Canst Not Know Them

Moveable here means unstable and impossible to pin down or predict.

A person cannot plan around a path that keeps shifting under them.

This is the opposite of the firm, established way praised in chapter four.

Her instability is part of what makes her so dangerous to follow.

🌀 Moveable means unstable, hard to predict

🧭 A shifting path cannot be planned around

🔀 The opposite of chapter four's firm way

📖 Instability itself is part of the danger

# Proverbs 5:7-11
# 🚪 Stay Away From Her Door
---
## 👂 Hear Me Now Therefore O Ye Children

Solomon shifts here from a private father and son talk to a wider audience.

Children in this verse likely means more than one listener at a time.

The address broadens right at the most urgent part of the warning.

This warning was meant to reach far more than just one son.

👂 Solomon widens his audience here

👨‍👩‍👧‍👦 Children means more than one listener

⏰ The shift happens at the urgent part

📖 The warning was meant for many

---

## 🚶 Depart Not From The Words Of My Mouth

Departing pictures a slow drifting away, not one dramatic decision to leave.

Solomon is not only worried about open rebellion against his teaching.

He is also warning against quietly forgetting it over time.

Staying close to these words takes ongoing effort, not one moment of agreement.

🚶 Depart means a slow drifting away

🙅 Not just open, dramatic rebellion

😴 Quiet forgetting counts as departing too

📖 Staying close takes ongoing effort

---

## 🔀 Remove Thy Way Far From Her

Remove pictures a decisive, physical change of direction, not a small adjustment.

Far describes real distance, not staying close but being careful.

Solomon is not offering advice about caution around danger.

He is commanding total avoidance from the very start.

🔀 Remove means a decisive change of direction

📏 Far means real distance, not carefulness

🙅 This is not advice about caution

📖 The command is total avoidance

---

## 🚪 Come Not Nigh The Door Of Her House

Nigh is an old word simply meaning near or close.

The door marks the last safe boundary before real danger begins.

Solomon is not warning against friendship with her directly here.

He is warning against even approaching the edge of that boundary.

🚪 Nigh is an old word for near

🛑 The door marks the last safe line

🙅 Not a warning about friendship alone

📖 Even approaching the edge is the danger

---

## 🏛️ Lest Thou Give Thine Honour Unto Others

Honour here likely means a person's reputation and standing in the community.

An affair in this culture could cost a man his public respect.

The loss described is social and public, not only private and personal.

Solomon lists consequences that reach far beyond the moment of temptation.

🏛️ Honour means reputation and standing

👥 An affair could cost public respect

📢 The loss is social, not just private

📖 Consequences reach beyond the moment

---

## ⚔️ Thy Years Unto The Cruel

The cruel here likely refers to a jealous husband or an avenging family member.

In this culture, a wronged family could pursue harsh, lasting punishment.

Years pictures a cost paid slowly over a long stretch of time.

Solomon is warning that this danger does not end quickly.

⚔️ The cruel likely means an avenging family

⏳ Years pictures a long, slow cost

👨‍👩‍👦 A wronged family could pursue harsh justice

📖 This danger does not end quickly

---

## 💰 Lest Strangers Be Filled With Thy Wealth

Strangers here means people outside the man's own household and family line.

Wealth built over a lifetime could end up in someone else's hands entirely.

This pictures the practical, financial wreckage an affair could leave behind.

Sin here does not just wound a soul, it can empty a house.

💰 Strangers means people outside the family

🏚️ Wealth could pass to someone else

📉 Pictures real financial wreckage

📖 Sin can empty a house too

---

## 💼 Thy Labours Be In The House Of A Stranger

Labours means the hard work and earnings built up over many years.

Once again the cost lands in someone else's household, not his own.

The repetition in this verse drives home how total the loss could be.

A whole life's work could end up serving a family that is not his.

💼 Labours means years of hard work

🔁 The cost repeats, lands with a stranger

😔 Total loss is the point being made

📖 A life's work could serve someone else

---

## 😢 Thou Mourn At The Last

Mourning here pictures deep regret felt only after the damage is already done.

At the last means the warning was not heeded in time.

Solomon paints the picture of realizing the cost too late to undo it.

This regret is the direct result of ignoring every warning given so far.

😢 Mourning pictures regret after the damage

⏰ At the last means too late

💔 The cost becomes clear only afterward

📖 This regret follows ignored warnings

---

## 🔥 When Thy Flesh And Thy Body Are Consumed

Consumed pictures something being worn down and used up completely over time.

This likely points to physical decline brought on by a reckless, sinful life.

Many scholars connect this to disease or the toll of living without wisdom.

The warning ends this section with the most physical picture yet.

🔥 Consumed means worn down completely

🩺 Likely points to real physical decline

📚 Many scholars connect this to disease

📖 The warning ends on this physical toll

# Proverbs 5:12-14
# 😔 The Regret Of A Wasted Warning
---
## 🗣️ How Have I Hated Instruction

Solomon now imagines his son speaking these words after the damage is already done.

Hated is a strong word, describing outright rejection, not mild disinterest.

This is not a man who simply forgot to listen.

He actively pushed away the very teaching meant to protect him.

🗣️ Solomon imagines his son's future regret

💔 Hated means outright rejection, not disinterest

🙅 Not simple forgetting but active pushing away

📖 He rejected the teaching meant to protect him

---

## ⚖️ My Heart Despised Reproof

Reproof means correction, the kind of pushback that points out a wrong path.

Despising it means treating something valuable as if it were worthless.

The heart, the center of a person's will, is what did the despising.

This was not an outward slip, it was an inward decision.

⚖️ Reproof means correction pointing out wrong

🙄 Despising treats something valuable as worthless

❤️ The heart, the will, made this choice

📖 An inward decision, not an outward slip

---

## 👨‍🏫 Have Not Obeyed The Voice Of My Teachers

Teachers here likely includes parents, elders, and others who taught wisdom in that culture.

Obeying a voice means actually following it, not just hearing it spoken.

This regret admits a total failure to act on good instruction.

Many voices tried to help before this failure ever happened.

👨‍🏫 Teachers likely includes parents and elders

👂 Obeying means following, not just hearing

❌ Admits a total failure to act

📖 Many voices tried to help beforehand

---

## 👂 Nor Inclined Mine Ear To Them That Instructed Me

Inclining the ear again pictures leaning in to listen closely, as in chapter four.

This regret describes the opposite, a refusal to lean in at all.

The same picture used earlier for wisdom now returns as a confession of failure.

Solomon closes the loop between his teaching and this imagined regret.

👂 Inclining the ear means leaning in

🙅 This regret describes the opposite

🔁 The same picture returns as a failure

📖 Solomon closes the loop with regret

---

## 😨 I Was Almost In All Evil

Almost here is the most chilling word in this whole confession.

It describes someone standing right at the edge of total ruin.

Nothing stopped the fall except how close it actually came.

Solomon lets his son feel just how narrow that escape could be.

😨 Almost is the most chilling word here

🕳️ Describes standing at the edge of ruin

⚠️ The fall almost happened completely

📖 The escape is shown as barely happening

---

## 🏛️ In The Midst Of The Congregation And Assembly

Congregation and assembly both describe the public gathering of the whole community.

This ruin was not hidden, it happened in full public view.

Private sin in this picture becomes a public disgrace for everyone to see.

The confession ends with the worst possible setting for such a fall.

🏛️ Both words describe the public community

👀 The ruin happened in full public view

😳 Private sin became public disgrace

📖 The worst possible setting for this fall

# Proverbs 5:15-19
# 💧 Stay Faithful To The Wife Of Your Youth
---
## 💧 Drink Waters Out Of Thine Own Cistern

A cistern was a dug out pit used to store rainwater for a household.

Solomon pictures marriage here as water drawn from a person's own private source.

Drinking from your own cistern means finding satisfaction inside your own marriage.

The image shifts from warning about danger to painting a better picture.

💧 Cistern was a pit storing rainwater

🏠 Marriage pictured as a private water source

💍 Satisfaction is found inside one's own marriage

📖 The tone shifts to something better

---

## ⛲ Running Waters Out Of Thine Own Well

A well tapped into a fresh, flowing underground spring, unlike a still cistern.

Pairing cistern and well pictures a marriage as a source that never runs dry.

Running water was considered fresher and more valuable than standing water.

Solomon pictures marital love as this kind of living, ongoing source.

⛲ A well taps a fresh flowing spring

🔀 Cistern and well together mean it never dries

✨ Running water was more valued than still

📖 Marital love pictured as a living source

---

## ⛲ Let Thy Fountains Be Dispersed Abroad

Fountains here pictures the overflow and blessing that a faithful marriage produces.

Dispersed abroad means spreading outward, likely referring to children and family.

Many scholars connect this image to the blessing of a growing household.

Faithfulness is pictured as something that multiplies, not something that simply stays safe.

⛲ Fountains pictures a marriage's overflow

👨‍👩‍👧 Dispersed abroad likely means children and family

📚 Many scholars connect this to a household

📖 Faithfulness is pictured as something that multiplies

---

## 🌊 Rivers Of Waters In The Streets

This repeats the picture of overflow using an even bigger image than before.

Hebrew poetry often builds one picture bigger with each repeated line.

A river reaching the streets pictures blessing that becomes impossible to hide.

The size of the image grows to match the size of the blessing.

🌊 Repeats the overflow with a bigger image

📢 Hebrew poetry often builds an image bigger

🏘️ Blessing pictured as impossible to hide

📖 The image grows to match the blessing

---

## 🔒 Let Them Be Only Thine Own

This verse turns from picturing blessing to guarding it directly.

Only thine own means the overflow described belongs inside marriage alone.

Solomon is not against the blessing spreading, only against it being shared wrongly.

The picture of water now carries a clear boundary along with it.

🔒 The verse shifts from blessing to guarding

💍 Only thine own means inside marriage alone

🙅 Not against blessing, against sharing it wrongly

📖 A clear boundary comes with the picture

---

## 🚫 Not Strangers With Thee

Strangers here again means anyone outside the marriage bond itself.

The warning against the strange woman from earlier in the chapter returns here.

Solomon draws a straight line between guarding water and guarding marriage.

The whole picture has been building toward this one clear boundary.

🚫 Strangers means anyone outside the marriage

🔁 The earlier warning about her returns here

🔗 Guarding water and guarding marriage are linked

📖 The picture builds toward this boundary

---

## 🙏 Let Thy Fountain Be Blessed

Blessed here means favored and full, not simply free of trouble.

Solomon prays this directly over his son's future marriage.

The fountain image now becomes a spoken blessing instead of just a warning.

This is the turning point where instruction becomes a genuine wish for good.

🙏 Blessed means favored and full

⛲ Solomon prays this over his son's marriage

🔀 The image turns from warning to blessing

📖 Instruction becomes a wish for good here

---

## 👰 Rejoice With The Wife Of Thy Youth

The wife of thy youth means the woman a man married early in life.

Rejoice is a command, not just a hope or a suggestion.

Solomon calls for active, ongoing joy inside marriage, not passive tolerance.

This command answers directly against the smooth talk described earlier in the chapter.

👰 Wife of thy youth means an early marriage

🎉 Rejoice is a command, not a hope

💞 Calls for active joy, not passive tolerance

📖 This directly answers the smooth talk from before

---

## 🦌 As The Loving Hind And Pleasant Roe

A hind and a roe are both graceful, gentle deer known for their beauty.

Comparing a wife to these animals was a common picture of loveliness in that culture.

The image is tender and admiring, not simply about physical appearance alone.

Solomon paints marriage with genuine warmth here, not just duty.

🦌 Hind and roe were graceful, gentle deer

💕 A common picture of loveliness in that culture

🙅 Tender admiration, not appearance alone

📖 Marriage is painted with real warmth here

---

## 💞 Let Her Breasts Satisfy Thee At All Times

This verse speaks openly about the physical closeness meant to exist within marriage.

Satisfy pictures a need genuinely met, not merely tolerated or endured.

At all times shows this is meant to last across an entire lifetime.

Scripture treats this part of marriage as good, not something to be ashamed of.

💞 Speaks openly about closeness within marriage

✅ Satisfy means a need genuinely met

⏳ At all times means across a lifetime

📖 Scripture treats this part of marriage as good

---

## 😍 Be Thou Ravished Always With Her Love

Ravished here means completely captivated, carried away by delight.

The same word describes the danger of the strange woman back in verse twenty.

Solomon is not condemning strong desire, he is redirecting it toward marriage.

The chapter's whole warning finally lands on this positive command.

😍 Ravished means completely captivated by delight

🔁 The same word appears again in verse twenty

🔀 Redirects strong desire toward marriage

📖 The chapter's warning lands on this command

# Proverbs 5:20-23
# ⚖️ The Lord Sees Every Step
---
## ❓ Why Wilt Thou My Son Be Ravished With A Strange Woman

Solomon asks this as a direct, pointed question, not a gentle suggestion.

The same word ravished from the last verse now describes the wrong target instead.

Desire itself was never the problem Solomon warned against in this chapter.

Misplaced desire, aimed outside marriage, was the danger all along.

❓ Solomon asks this as a direct question

🔁 Ravished repeats, aimed at the wrong target

🙅 Desire itself was never the real problem

📖 Misplaced desire was the danger all along

---

## 🤗 Embrace The Bosom Of A Stranger

Bosom pictures the closest kind of physical intimacy a person can share.

Stranger again points back to the woman warned about since the start of the chapter.

This closing question forces a direct choice between two very different embraces.

Solomon wants his son to see exactly what is being traded away.

🤗 Bosom pictures the closest intimacy

🔁 Stranger points back to the earlier warning

⚖️ Forces a choice between two embraces

📖 Shows exactly what would be traded away

---

## 👁️ The Ways Of Man Are Before The Eyes Of The LORD

Ways again pictures the road a person's daily choices are walking.

Before the eyes of the LORD means nothing is hidden from him, ever.

Every warning in this chapter has assumed a private, unseen affair.

This verse removes that assumption completely and permanently.

👁️ Ways means the road daily choices walk

🙅 Nothing is hidden from the LORD

🤫 Every warning assumed a private affair

📖 That assumption is removed here

---

## ⚖️ He Pondereth All His Goings

Pondereth means weighing something carefully, the same word used earlier for wise thinking.

Here it describes God carefully examining every step a person takes.

Goings simply means the actual paths and actions of daily life.

God's careful attention answers the secrecy the strange woman offered earlier.

⚖️ Pondereth means weighing something carefully

👀 God examines every step a person takes

🚶 Goings means the paths of daily life

📖 God's attention answers the secrecy offered before

---

## 🎯 His Own Iniquities Shall Take The Wicked Himself

Iniquities means sinful choices, and here they are pictured as a hunter.

Take pictures being caught, the way an animal is caught in a trap.

The wicked person is not simply punished from outside, he is caught by his own choices.

Sin here is shown circling back on the very person who committed it.

🎯 Iniquities are pictured as a hunter here

🪤 Take pictures being caught like an animal

🔁 He is caught by his own choices

📖 Sin circles back on the wicked

---

## 🔒 He Shall Be Holden With The Cords Of His Sins

Holden is an old word meaning held fast or firmly restrained.

Cords pictures ropes, the same kind used to bind a prisoner.

His own sins become the very ropes that trap him.

This is not an outside punishment, it is the natural weight of sin itself.

🔒 Holden means held fast or restrained

🪢 Cords pictures ropes that bind a prisoner

🔗 His own sins become those ropes

📖 This is sin's own natural weight

---

## 💀 He Shall Die Without Instruction

Dying without instruction pictures a life that never let real wisdom in.

This is not only about a final moment, it describes an entire wasted pattern.

The whole chapter has offered exactly the instruction being rejected here.

Every warning given earlier was meant to prevent this very ending.

💀 Pictures a life without real wisdom

🔁 Describes a wasted pattern, not one moment

📚 The chapter offered the instruction rejected here

📖 Every warning aimed to prevent this ending

---

## 🃏 In The Greatness Of His Folly He Shall Go Astray

Folly in Proverbs means far more than a simple mistake.

It means a whole foolish way of life.

Greatness here shows how far this folly is allowed to grow unchecked.

Go astray pictures wandering completely off the path Solomon described back in chapter four.

The chapter that began with a father's careful warning ends in a wasted life.

🃏 Folly means a foolish way of life

📈 Greatness shows how far it grows unchecked

🛤️ Go astray means wandering off the path

📖 A father's warning ends in a wasted life
`.trim();

export const PROVERBS_FIVE_PERSONAL_SECTIONS = parseProverbsFiveRawNotes(PROVERBS_FIVE_RAW_NOTES);
