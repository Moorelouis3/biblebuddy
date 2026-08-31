export type JobSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobSixRawNotes(rawText: string): JobSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Job 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Job\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 6:${startVerse}` : `Job 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Job 6 sections, received " + sections.length);
  }

  return sections;
}

const JOB_SIX_RAW_NOTES = `# Job 6:1-7
# 🍽️ Job's Grief Outweighs The Sand
---
## 😔 But Job Answered And Said

Job now takes his turn to reply to Eliphaz.

The book follows a pattern of speeches.

A friend speaks, then Job answers, again and again.

This cycle repeats for many chapters before God finally speaks.

Job's answer here will defend his right to complain.

😔 Job now replies to Eliphaz
🔁 The book follows a speech cycle
⏳ This pattern repeats for many chapters
📖 God will only speak much later

## ⚖️ Oh That My Grief Were Throughly Weighed

"Throughly" is an old spelling of thoroughly.

Job wishes his grief could be placed on an actual scale.

"Balances" were the merchant's scale used for weighing goods and precious metal.

Job wants an honest, objective measure of his suffering.

He feels Eliphaz has not taken the true weight of his pain seriously.

⚖️ Throughly means thoroughly, fully
🏋️ Balances were a merchant's weighing scale
📏 Job wants his pain measured honestly
📖 He feels Eliphaz missed its true weight

## 🌊 Heavier Than The Sand Of The Sea

"Sand of the sea" was a common picture for something impossible to count.

Job says his grief would outweigh that impossible number.

This is deliberate exaggeration to make a point, not a literal claim.

"My words are swallowed up" means he cannot even find language big enough for it.

🌊 Sand of the sea means uncountable
📊 Job's grief outweighs that huge number
🗣️ The exaggeration makes his point land
📖 Words fail to hold his grief

## 🏹 The Arrows Of The Almighty Are Within Me

Job pictures himself struck by God's own arrows.

"Poison" describes venom coated on ancient arrowheads.

Job feels his very spirit has been poisoned, not just his body.

Notice Job blames God directly here, not any hidden sin of his own.

🏹 Job pictures himself struck by arrows
☠️ Poison describes venom coated arrowheads
💔 His spirit feels poisoned, not just his flesh
📖 Job points to God, not hidden sin

## ⚔️ The Terrors Of God Do Set Themselves In Array

"In array" is military language for soldiers lined up for battle.

Job feels surrounded, as if terror itself has formed ranks against him.

This is not a quiet sadness.

It is an experience Job compares to facing an entire army alone.

⚔️ In array means lined up for battle
😨 Job feels surrounded by terror
🪖 He compares it to facing an army
📖 This is far beyond quiet sadness

## 🐴 Doth The Wild Ass Bray When He Hath Grass

Job shifts to two animal examples to defend his complaining.

A wild donkey only cries out when something is wrong, never when it is fed.

An ox only groans over empty feed, not a full trough.

Job's point is that his own complaints are not random either.

🐴 A wild donkey brays only when needy
🐂 An ox groans only over empty feed
🗣️ Animals cry out for real reasons
📖 Job says his own complaint is reasonable

## 🥚 Is There Any Taste In The White Of An Egg

Job compares Eliphaz's comfort to bland, flavorless food.

Egg white on its own was known as a tasteless food.

"Unsavoury" means lacking any flavor or salt.

Job is saying Eliphaz's advice has offered him nothing that actually satisfies.

🥚 Egg white was known as tasteless
🧂 Unsavoury means lacking flavor or salt
🍽️ Job compares this to Eliphaz's advice
📖 The comfort offered has no real substance

## 🚫 The Things That My Soul Refused To Touch

"My sorrowful meat" pictures Job's suffering as food forced on him against his will.

He never chose this diet of grief.

Just as a person refuses spoiled food, Job's whole being rejects what he is living through.

The food imagery that opened this section closes here on the same note.

🚫 Sorrowful meat pictures forced suffering
🍽️ Job never chose this diet of grief
😖 His whole being rejects it
📖 The chapter's food imagery closes the thought

# Job 6:8-13
# 💀 A Longing For Death
---
## 🙏 That God Would Grant Me The Thing That I Long For

Job states his one request plainly before naming it.

The reader does not yet know what he is asking for.

That suspense makes the next verse land harder.

Job has reached a point of total exhaustion, not calm resignation.

🙏 Job states one plain request
❓ The reader does not yet know it
😩 He speaks from total exhaustion
📖 The next verse reveals the request

## 💔 Oh That It Would Please God To Destroy Me

Job's actual request is his own death.

He wants God, not himself, to end his suffering.

This distinction matters, Job never considers taking his own life.

He directs the request to God alone, in prayer.

💔 Job's request is for death
🙏 He asks God, not himself, to act
🚫 Job never considers ending his own life
📖 The request stays inside prayer, not action

## ✋ That He Would Let Loose His Hand And Cut Me Off

"Let loose his hand" pictures God releasing a restrained blow.

Job believes God has been holding back until now.

"Cut me off" means to end a life completely.

Job would rather face a quick end than this slow, grinding pain.

✋ Let loose his hand pictures a restrained blow
🤲 Job believes God has been holding back
✂️ Cut me off means to end a life
📖 A quick end feels better than slow pain

## 🕊️ Then Should I Yet Have Comfort

Job says death itself would be a relief, even a comfort.

"Harden myself in sorrow" means he would face the pain without flinching.

"Let him not spare" means Job is asking God not to hold back.

This is raw honesty about despair, not a plan Job intends to carry out himself.

🕊️ Death would feel like relief to Job
😤 Harden myself means facing pain without flinching
🙏 Job asks God not to hold back
📖 This is honest despair, not a plan

## 📜 I Have Not Concealed The Words Of The Holy One

"Concealed" means to hide something on purpose.

Job insists he has never hidden or rejected what God has spoken.

This claim directly answers Eliphaz's hidden assumption that Job is guilty of secret sin.

Job wants his integrity on record even as he asks to die.

📜 Concealed means hidden on purpose
🙌 Job says he never hid God's words
⚖️ This answers Eliphaz's hidden assumption
📖 Job wants his integrity on record

## 💪 What Is My Strength That I Should Hope

Job asks a blunt physical question.

He no longer has the strength left to keep hoping for recovery.

"Prolong my life" means to stretch out his days further.

Job cannot see a reason to keep enduring.

💪 Job questions his remaining strength
⏳ Prolong my life means stretching out his days
😔 He cannot see a reason to endure
📖 Hope itself feels physically used up

## 🪨 Is My Strength The Strength Of Stones

Job uses two images of extreme durability, stone and bronze.

"Brass" in the King James Version usually means bronze.

Job is saying he is not built from unbreakable material.

Ordinary human bodies wear down, and his has worn down completely.

🪨 Stone and bronze picture extreme durability
🔩 Brass here usually means bronze
🧍 Job says he is not unbreakable
📖 His ordinary body has worn down completely

## 🕳️ Is Not My Help In Me

Job admits he has nothing left inside himself to draw on.

"Wisdom driven from me" means his own inner resources are gone too.

This is Job's lowest point so far in the chapter.

He has no strength, no hidden reserve, and feels no help coming from anywhere.

🕳️ Job has nothing left inside himself
🧠 His own inner resources are gone
📉 This marks his lowest point so far
📖 No help seems to be coming

# Job 6:14-20
# 🏜️ Friends Like A Dry Streambed
---
## 🤝 Pity Should Be Shewed From His Friend

"Shewed" is the old spelling of showed.

Job states what he believes friendship owes a suffering person, simple compassion.

"Forsaketh the fear of the Almighty" means turning away from reverence for God.

Job is setting up an accusation, his friends have not met this basic standard.

🤝 Shewed means showed, an old spelling
💗 Job names compassion as friendship's basic duty
🚶 Forsaketh means turning away
📖 Job says his friends fell short of it

## 🏞️ My Brethren Have Dealt Deceitfully As A Brook

Job compares his friends to a wadi, a seasonal desert streambed.

A wadi can look like a real, reliable water source part of the year.

"Dealt deceitfully" means the brook promised water it could not actually deliver.

This single image will drive the rest of the section.

🏞️ A wadi is a seasonal desert streambed
💧 It can look reliable part time
🎭 Dealt deceitfully means a broken promise
📖 This image drives the rest of the section

## ❄️ Blackish By Reason Of The Ice

In winter, a wadi can swell dark and full from melting snow and ice.

"Blackish" describes muddy, ice cold floodwater rushing through the streambed.

At this point the brook looks strong and dependable.

That appearance is exactly what makes its later failure so painful.

❄️ Winter floodwater made the wadi swell dark
🧊 Blackish describes muddy, ice cold water
💪 The brook looks strong at this stage
📖 That strength makes its failure worse later

## ☀️ When It Is Hot, They Are Consumed Out Of Their Place

Once summer heat arrives, the same wadi dries up completely.

"Consumed out of their place" means the water vanishes from the very ground it once filled.

The brook disappears exactly when travelers need it most.

Job's friends showed up strong in words but vanished when real support was needed.

☀️ Summer heat dries the wadi completely
💨 The water vanishes from its own ground
🥵 It fails exactly when most needed
📖 Job's friends vanished the same way

## 🧭 The Paths Of Their Way Are Turned Aside

Desert travelers would follow known routes toward a wadi expecting water.

"Turned aside" pictures them leaving the main road to search for it.

"They go to nothing" means their detour ends in complete disappointment.

Job pictures real people risking a route change and finding nothing there.

🧭 Travelers followed known routes toward water
↩️ Turned aside means leaving the main road
😞 The detour ends in disappointment
📖 Real people risked the trip for nothing

## 🐫 The Troops Of Tema Looked, The Companies Of Sheba Waited

Tema and Sheba were trading regions in the Arabian desert.

"Troops" and "companies" here describe caravans, groups of merchants traveling together.

These caravans depended on wadis like this one to survive desert crossings.

Naming real trade routes makes Job's picture concrete, not just poetic.

🐫 Tema and Sheba were Arabian trade regions
🚶 Troops and companies here mean caravans
🗺️ Caravans depended on wadis to survive
📖 Naming real routes makes the picture concrete

## 😳 They Were Confounded Because They Had Hoped

"Confounded" means left ashamed and bewildered.

The caravans trusted the wadi and arrived expecting water.

Their hope is exactly what made the disappointment so sharp.

Job says this is precisely how his friends have treated him.

😳 Confounded means ashamed and bewildered
🐫 The caravans arrived trusting the wadi
💔 Their hope made the letdown sharper
📖 Job says his friends did the same

# Job 6:21-23
# 🙅 Job Never Asked For Money
---
## 😔 For Now Ye Are Nothing

Job now applies the dried up wadi directly to his friends.

"Ye are nothing" is a blunt, direct accusation, not a passing complaint.

Job has been building toward this exact line since verse fifteen.

The comfort he expected has completely failed to arrive.

😔 Job applies the wadi image directly
🗣️ Ye are nothing is a blunt accusation
🏗️ He has built toward this line for verses
📖 The expected comfort never arrived

## 😨 Ye See My Casting Down, And Are Afraid

"Casting down" means Job's total collapse and ruin.

Job suggests his friends are not simply calm observers.

Watching his disaster frightens them, because it threatens their own tidy view of the world.

If bad things can happen to a good man, no one is truly safe.

😨 Casting down means total collapse and ruin
👀 The friends are not calm observers
😬 Job's disaster threatens their tidy worldview
📖 No one is safe if this happens

## 💰 Did I Say, Bring Unto Me

Job now defends what he actually wanted from his friends.

He never once asked them for money or material help.

"Reward" and "substance" both refer to wealth or property.

Job wants this record set straight before he goes any further.

💰 Job never asked for money
🎁 Reward and substance both mean wealth
📋 He sets the record straight here
📖 This clears the ground for his real point

## 🛡️ Deliver Me From The Enemy's Hand

Job says he never asked to be rescued from a human enemy either.

"The mighty" refers to a powerful oppressor, not God.

Job wanted neither cash nor a rescue mission from his friends.

All he actually wanted was honest presence and understanding.

🛡️ Job never asked for rescue either
👑 The mighty means a powerful oppressor
🙅 He wanted no cash and no rescue
📖 He only wanted honest presence

# Job 6:24-30
# ⚖️ Job Demands Honest Correction
---
## 👂 Teach Me, And I Will Hold My Tongue

Job now genuinely invites correction, if his friends can actually offer it.

"Hold my tongue" is an idiom meaning to stay completely silent.

"Wherein I have erred" means show him specifically where he has sinned.

Job is not refusing to listen, he is asking for real evidence instead of assumption.

👂 Job genuinely invites real correction
🤐 Hold my tongue means to stay silent
🔍 Wherein I have erred means show him proof
📖 He wants evidence, not assumption

## 💪 How Forcible Are Right Words

"Forcible" means powerful and persuasive.

Job admits that true correction, rightly given, really does carry weight.

This softens his tone for a moment before his next sharp line.

Job is not against being corrected, only against being corrected unfairly.

💪 Forcible means powerful and persuasive
🙌 Job admits true correction carries weight
⏸️ This briefly softens his tone
📖 Job opposes unfair correction, not correction itself

## ❓ What Doth Your Arguing Reprove

"Reprove" means to correct or prove someone wrong.

Job asks what their arguments have actually proven so far.

His answer is implied, nothing concrete, only assumption piled on assumption.

Job wants proof, not repeated theories about hidden sin.

❓ Reprove means to correct or prove wrong
🗣️ Job asks what their words have proven
🧱 The implied answer is nothing concrete
📖 He wants proof, not repeated theory

## 🌬️ The Speeches Of One That Is Desperate

Job refers back to his own outburst of despair in chapter three.

"Which are as wind" means his friends treat those words as empty and meaningless.

Job feels they are picking apart his grief instead of hearing his pain.

Desperate words spoken in agony deserve compassion, not cold analysis.

🌬️ As wind means treated as empty talk
😢 Job means his own despair in chapter three
🔬 His friends pick apart his grief instead
📖 Pain deserves compassion, not cold analysis

## 👶 Ye Overwhelm The Fatherless

"Fatherless" meant a child who had lost the family's protector and provider.

In the ancient world, such a child had almost no legal standing.

Job compares his friends' treatment of him to exploiting someone utterly defenseless.

This is one of the harshest accusations Job makes in the whole speech.

👶 Fatherless meant a child without a protector
⚖️ Such a child had almost no legal standing
😔 Job compares himself to that vulnerable person
📖 This is one of Job's harshest lines

## 🕳️ Ye Dig A Pit For Your Friend

"Dig a pit" was a common idiom for setting a hidden trap.

Job accuses his friends of betrayal, not honest disagreement.

A pit trap was meant to catch someone unaware, not to help them.

Job feels ambushed by people he trusted to stand with him.

🕳️ Dig a pit means setting a hidden trap
🎭 Job accuses betrayal, not honest disagreement
🦌 A trap catches someone unaware, not helps them
📖 Job feels ambushed by trusted friends

## 👁️ It Is Evident Unto You If I Lie

Job invites his friends to look him in the eye directly.

"Evident" means plainly visible, not hidden or unclear.

Job is confident that honest scrutiny will not find him lying.

He is not afraid of being examined closely.

👁️ Job invites direct, honest scrutiny
🔎 Evident means plainly visible
🙌 Job is confident he is not lying
📖 He does not fear close examination

## 🔄 Return, I Pray You, Let It Not Be Iniquity

"Return" here means to reconsider or turn back from a wrong conclusion.

"Iniquity" means deliberate wrongdoing, and Job says continuing to accuse him would be exactly that.

"My righteousness is in it" means his very integrity is what is being argued over.

Job is asking them to change course before this goes any further.

🔄 Return means to reconsider a conclusion
😔 Iniquity means deliberate wrongdoing
⚖️ Job's own integrity is what is at stake
📖 He asks them to change course now

## 👅 Is There Iniquity In My Tongue

Job closes the chapter by returning to the taste imagery that opened it.

"My taste discern perverse things" pictures judgment like tasting food for what is spoiled.

Job insists he can tell right from wrong just as clearly as he can taste.

The chapter ends with Job's integrity fully intact, still waiting to be heard.

👅 Job returns to the chapter's taste imagery
🍽️ Discern perverse things means tasting for wrong
✅ Job insists he can tell right from wrong
📖 His integrity stands, still waiting to be heard
`.trim();

export const JOB_SIX_PERSONAL_SECTIONS = parseJobSixRawNotes(JOB_SIX_RAW_NOTES);
