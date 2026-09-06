export type PsalmsThirtyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsThirtyNineRawNotes(rawText: string): PsalmsThirtyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsThirtyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+39:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 39 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+39:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+39:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 39 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 39,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 39:${startVerse}` : `Psalms 39:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 39 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_THIRTY_NINE_RAW_NOTES = `# Psalms 39:1-3
# 🐴 A Vow Of Silence Under Pressure
---
## 🎯 I Will Take Heed To My Ways

"Heed" means careful, deliberate watchfulness, not passing attention.

David names a resolve here, not a passing feeling.

He made this decision before trouble tested it.

The rest of the psalm shows that resolve straining under pressure.

🎯 Heed means careful watchfulness
📋 This is a firm resolve
⏳ Made before trouble arrived
📖 The psalm tests this resolve

## 👄 That I Sin Not With My Tongue

David names the specific danger he wants to avoid.

Sin here is not vague wrongdoing in general.

It is the sin of speech, careless or angry words.

Watching his ways in verse one narrows down to this one danger.

👄 The danger named is careless speech
🎯 Not sin in general
🗣️ Speech is the specific target
📖 One vow narrows to one danger

## 🐴 I Will Keep My Mouth With A Bridle

A "bridle" is the strap and bit used to steer a horse.

David compares his own mouth to an animal that needs control.

Left alone, his tongue could say something he would regret.

This is deliberate restraint, not silence that happens by accident.

He adds one more detail here.

The vow holds even while the wicked stand before him.

🐴 A bridle steers a horse
👄 His mouth is compared to it
💪 This restraint takes real effort
📖 The hardest test comes from provocation

## 🤐 I Was Dumb With Silence, I Held My Peace, Even From Good

"Dumb" here is an old word for silent, not a slur.

David is not only holding back complaints or anger.

He says he stayed quiet even from speaking anything good.

Total silence, even good words, shows how far he pushed his vow.

🤐 Dumb means silent here
🛑 Not just holding back anger
✅ Even good words were held back
📖 Total silence shows how far he pushed

## 🌊 My Sorrow Was Stirred

Silence did not calm David down.

Instead, holding everything in made his pain grow worse.

"Stirred" pictures something churning, like water disturbed at the bottom.

His grief was not resolved, only pressurized by staying quiet.

🌊 Stirred pictures churning water
📈 His pain grew worse, not calmer
🤐 Silence did not resolve the grief
📖 It pressurized it instead

## 🔥 My Heart Was Hot Within Me

The vow of silence could not last forever.

"Hot" describes an inner heat building toward a breaking point.

David's feelings, kept back for so long, finally reached their limit.

This heat is the direct result of everything held in from verse two.

🔥 Hot pictures inner heat building
⏳ The vow could not last
💥 His feelings reached a limit
📖 This comes from what he held back

## 🗣️ Then Spake I With My Tongue

David breaks the very vow he made in verse one.

He does not hide this failure or explain it away.

The rest of the psalm is what actually gets spoken.

Honest prayer sometimes begins right where self control runs out.

🗣️ David breaks his own vow
🙈 He does not hide this
📜 The rest of the psalm is spoken
➡️ Honest prayer can start where control ends

# Psalms 39:4-6
# ⏳ The Brevity Of Every Life
---
## ⏳ LORD, Make Me To Know Mine End

David does not ask this out of curiosity about the future.

He wants a clear view of how short his life actually is.

He also asks to know the measure of his days, not just their ending.

Knowing an ending changes how a person lives before it arrives.

This request grows directly out of the outburst in verse three.

⏳ Not idle curiosity about the future
👀 He wants a clear view of life's shortness
🔄 An ending changes how someone lives
📖 This grows from verse three's outburst

## 🍂 That I May Know How Frail I Am

"Frail" means fragile, easily broken or worn away.

David wants this knowledge for a reason, not simply as information.

Seeing his own fragility clearly is meant to reshape his perspective.

A life understood as short is lived differently than one assumed to be endless.

🍂 Frail means easily broken
🎯 Not information for its own sake
👁️ Seeing fragility reshapes perspective
📖 A short life is lived differently

## ✋ Thou Hast Made My Days As An Handbreadth

A "handbreadth" is the width of a hand.

It was one of the smallest measurements used in that culture.

David is not exaggerating for effect here.

He means his whole life, measured against eternity, is barely a sliver.

The image makes the years feel physically small enough to hold.

✋ Handbreadth means the width of a hand
📏 One of the smallest measures used
♾️ Life is a sliver next to eternity
📖 The years feel physically small here

## 💨 Every Man At His Best State Is Altogether Vanity

"Vanity" here means empty, fleeting, without lasting weight.

David is not only talking about weak or foolish people.

He includes every person, even at their strongest and most successful.

No human life, however impressive, escapes this same fleeting nature.

💨 Vanity means empty and fleeting
💪 Even the strongest are included
🚫 No one escapes this nature
📖 Success does not add lasting weight

## 🎭 Every Man Walketh In A Vain Shew

A "shew" is an old spelling of show, an appearance or display.

David pictures people walking through life like actors on a stage.

He adds that people also live disquieted, restless without lasting purpose.

The outward performance of busy, important living hides how brief it really is.

Underneath the show, every walk still ends the same way.

🎭 Shew means an outward display
🚶 Life is pictured like a performance
🎪 The busy show hides its shortness
📖 Every walk still ends the same way

## 📦 He Heapeth Up Riches, And Knoweth Not Who Shall Gather Them

"Heapeth" pictures someone piling up wealth higher and higher.

David names a real problem with that effort, not the wealth itself.

The person spends a lifetime gathering what he cannot keep or control afterward.

Someone else entirely will end up holding what he worked so hard to build.

📦 Heapeth means piling up wealth
🎯 The problem is not wealth itself
🔓 He cannot control who inherits it
📖 Someone else holds what he built

# Psalms 39:7-9
# 🙏 Hope Placed In Silence
---
## ❓ Now, Lord, What Wait I For? My Hope Is In Thee

This question is not really confusion about what to do next.

David is walking himself toward the only answer that actually holds up.

Riches fail, life is short, and other people cannot be trusted with lasting hope.

Only God is left standing as something worth waiting on.

❓ The question is not real confusion
🔀 It walks toward one answer
💨 Riches and life both fail to hold hope
📖 Only God is left to wait on

## ⚖️ Deliver Me From All My Transgressions

"Transgressions" means specific acts of wrongdoing, not a vague general feeling.

David moves from big questions about life straight into personal confession.

He is not asking to understand suffering in the abstract anymore.

He is asking to be freed from actual sins he has committed.

⚖️ Transgressions means specific wrongs
🔄 He shifts from big questions to confession
🙅 Not abstract suffering anymore
📖 He asks to be freed from real sins

## 😳 Make Me Not The Reproach Of The Foolish

A "reproach" is a public source of shame or mockery.

"The foolish" here refers to people who live as if God does not matter.

David does not want his suffering to become their punchline.

He is asking God to protect his testimony, not just his comfort.

😳 Reproach means public shame
🙄 The foolish live as if God is absent
🚫 David refuses to be their punchline
📖 His witness matters, not just comfort

## 🔁 I Was Dumb, I Opened Not My Mouth

This phrase repeats the silence from verse two, on purpose.

David has come full circle from the vow that broke down earlier.

This time the silence is not a strained personal vow.

It is quiet acceptance that God is the one behind his suffering.

🔁 This repeats verse two on purpose
🔄 David comes full circle
🙏 The silence is now acceptance
📖 God is the one behind the suffering

# Psalms 39:10-11
# 🦋 Discipline That Wastes Away Like A Moth
---
## 🎯 Remove Thy Stroke Away From Me

A "stroke" here means a blow or a painful act of discipline.

David is not questioning that the discipline was deserved.

He is simply asking for the pain itself to end.

Accepting correction and asking for relief are not opposites in this prayer.

🎯 Stroke means a disciplinary blow
✅ David does not deny it was deserved
🙏 He asks only for the pain to end
📖 Accepting correction and asking relief can coexist

## 🔥 I Am Consumed By The Blow Of Thine Hand

"Consumed" means used up or worn down completely.

David describes discipline as something that has cost him everything he had left.

This is not a minor complaint about mild discomfort.

He is describing a person nearly finished by what he has endured.

🔥 Consumed means worn down completely
💯 Not a minor complaint
😩 He is nearly finished by this
📖 Discipline has cost him everything left

## 🦋 Thou Makest His Beauty To Consume Away Like A Moth

A moth slowly eats through cloth until nothing solid remains.

"Beauty" here stands for strength, health, and outward vitality.

This happens when God corrects someone for sin through direct rebukes.

God's correction works the same slow, wasting way on a person's body.

Nothing about this destruction happens quickly or all at once.

🦋 A moth destroys cloth slowly
💪 Beauty here means strength and vitality
⏳ Correction wastes a person just as slowly
📖 Nothing here happens all at once

## 🔁 Surely Every Man Is Vanity

This line repeats the conclusion from verse five almost word for word.

David is not simply restating an idea for style.

Watching his own body waste away has proven the truth of it firsthand.

What began as an idea has now become a felt experience.

🔁 This repeats verse five's conclusion
🙅 Not restated for style alone
🩹 His own body proves it now
📖 An idea has become an experience

# Psalms 39:12-13
# 😢 A Stranger's Final Plea
---
## 🤐 Hold Not Thy Peace At My Tears

David asks God not to do the very thing he himself did earlier in the psalm.

He stayed silent through most of this prayer.

Now he wants God to respond instead of staying quiet in return.

This same verse also opens with a request to be heard and have his cry received.

His tears carry a request words alone could not fully hold.

🤐 David asks God not to stay silent
🔄 He himself stayed quiet earlier
🗣️ Now he asks for a response
📖 His tears carry what words cannot

## 🧳 I Am A Stranger With Thee, And A Sojourner

A "stranger" and a "sojourner" both describe someone living in a land that is not permanently theirs.

David is not talking about being a foreigner in a nation.

He means every human life is temporary, staying with God only for a season.

He adds that his own ancestors lived the exact same way before him.

🧳 Stranger and sojourner mean a temporary resident
🌍 Not about a foreign nation
⏳ Every life is a temporary stay
📖 His ancestors lived the same way

## 🙏 O Spare Me, That I May Recover Strength

"Spare" means to hold back a deserved punishment.

David is not asking to avoid death forever.

He is asking for a little more time and strength before it comes.

This is a modest request, shaped by everything the psalm has already admitted about life's shortness.

🙏 Spare means holding back punishment
⏳ Not asking to avoid death forever
💪 He wants a little more strength first
📖 A modest ask, shaped by the whole psalm

## 🚪 Before I Go Hence, And Be No More

"Hence" is an old word for away from here, meaning David's own death.

This is the same shortness of life named all the way back in verse four.

The psalm ends exactly where it started, staring honestly at how little time remains.

David never resolves that shortness, he simply learns to bring it honestly to God.

🚪 Hence means departing through death
🔁 This echoes verse four's request
⏳ The psalm ends staring at the same shortness
📖 He brings it honestly to God
`.trim();

export const PSALMS_THIRTY_NINE_PERSONAL_SECTIONS = parsePsalmsThirtyNineRawNotes(PSALMS_THIRTY_NINE_RAW_NOTES);
