export type LamentationsThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLamentationsThreeRawNotes(rawText: string): LamentationsThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LamentationsThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Lamentations\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Lamentations 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Lamentations\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Lamentations\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Lamentations 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Lamentations 3:${startVerse}` : `Lamentations 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 22) {
    throw new Error("Expected 22 Lamentations 3 sections, received " + sections.length);
  }

  return sections;
}

const LAMENTATIONS_THREE_RAW_NOTES = `# Lamentations 3:1-3
# 😔 I Am The Man That Hath Seen Affliction
---
## 😔 I Am The Man That Hath Seen Affliction

The first two poems speak about Jerusalem as a whole city.

This one shifts to a single voice, one man describing his own suffering.

Many scholars believe the man is Jeremiah himself, speaking for every sufferer.

Affliction here means deep and lasting hardship, not a passing bad day.

😔 The voice shifts from city to one man
📜 Many scholars believe this man is Jeremiah
⚖️ Affliction means deep and lasting hardship
📖 One man's grief now speaks for everyone's

---
## 🪄 The Rod Of His Wrath

A rod was a stick used for walking, for herding, or for punishment.

Here it pictures God's anger landing as a direct blow.

The man does not blame bad luck or enemy armies alone.

He names the LORD as the one holding the rod.

🪄 A rod could guide, herd, or punish
⚡ Here it pictures God's anger landing directly
👆 The man blames no one but the LORD
📖 He names the source of his suffering honestly

---
## 🌑 He Hath Led Me, And Brought Me Into Darkness, But Not Into Light

Darkness here is not simply nighttime.

It pictures confusion, danger, and the absence of God's comfort.

Light in this poetry usually means safety, truth, or God's presence.

The man says plainly that only darkness has met him so far.

🌑 Darkness pictures confusion and danger here
💡 Light usually means safety or God's presence
🚫 He has met only darkness, not light
📖 Even guidance can feel like being led astray

# Lamentations 3:4-6
# 🦴 My Flesh And My Skin Hath He Made Old
---
## 🦴 My Flesh And My Skin Hath He Made Old

This pictures suffering aging the body far faster than normal years.

Broken bones describe pain so deep it reaches the body's core support.

The man is not speaking only of feelings but of physical collapse.

Grief this heavy was understood to wear down the whole body.

🦴 Suffering aged his body unnaturally fast
💔 Broken bones picture pain reaching his core
🧍 This was physical collapse, not only feeling
📖 Grief this size wears down the whole body

---
## 🧱 He Hath Builded Against Me, And Compassed Me With Gall And Travail

Builded against me pictures a siege wall closing in on purpose.

Gall means something bitter, often a poison or bitter herb.

Travail means hard labor, the kind of pain tied to childbirth.

Together the words picture a trap built deliberately out of bitterness and pain.

🧱 Builded against me pictures a closing siege
🌿 Gall means something bitter, like poison
⚒️ Travail means hard, painful labor
📖 This trap was built on purpose

---
## 🕳️ He Hath Set Me In Dark Places, As They That Be Dead Of Old

Dark places pictures a place cut off from light and life.

As they that be dead of old compares him to the long forgotten dead.

The man feels buried and forgotten while he is still alive.

This is grief heavy enough to feel like a kind of death.

🕳️ Dark places means cut off from life
⚰️ He compares himself to the long dead
😶 He feels forgotten while still living
📖 Some grief feels like a kind of death

# Lamentations 3:7-9
# ⛓️ He Hath Hedged Me About, That I Cannot Get Out
---
## ⛓️ He Hath Hedged Me About, That I Cannot Get Out

A hedge was a wall of thorns or stone meant to block an escape route.

Here the hedge pictures a trap with no way out at all.

Pairing it with a heavy chain doubles the sense of total confinement.

The man is not simply sad, he feels completely shut in.

⛓️ A hedge blocked every escape route
🚧 It pictures a trap with no way out
🔗 A heavy chain doubles that confinement
📖 He feels completely and totally shut in

---
## 🙉 Also When I Cry And Shout, He Shutteth Out My Prayer

This describes the painful feeling that God has stopped listening.

Shutteth out pictures a door closed on purpose, not simply silence.

This does not mean God was actually ignoring him forever.

It describes how prayer can feel in the middle of deep suffering.

🙉 This describes feeling like God stopped listening
🚪 Shutteth out pictures a door closed on purpose
🚫 This was not God actually ignoring him
📖 It describes how prayer can feel in pain

---
## 🧱 He Hath Inclosed My Ways With Hewn Stone, He Hath Made My Paths Crooked

Hewn stone means stone that has been cut and shaped for building.

Inclosed my ways pictures every road forward blocked by a deliberate wall.

Crooked paths pictures a journey twisted so nothing leads anywhere useful.

Every direction the man tries to go ends up going nowhere.

🧱 Hewn stone means stone cut for building
🚧 His ways are blocked by a deliberate wall
🌀 Crooked paths lead nowhere useful
📖 Every direction he tries ends in nothing

# Lamentations 3:10-12
# 🐻 He Was Unto Me As A Bear Lying In Wait, And As A Lion In Secret Places
---
## 🐻 He Was Unto Me As A Bear Lying In Wait, And As A Lion In Secret Places

A bear lying in wait pictures a sudden, violent ambush.

A lion in secret places pictures an unseen predator stalking its prey.

Both animals were genuinely feared hunters in the ancient Near East.

The man describes God's judgment as an attack he never saw coming.

🐻 A bear lying in wait pictures ambush
🦁 A lion in secret places stalks unseen
🏹 Both were genuinely feared hunters at the time
📖 The judgment felt like an attack unseen

---
## 🌪️ He Hath Turned Aside My Ways, And Pulled Me In Pieces, He Hath Made Me Desolate

Turned aside my ways pictures a journey forced off its intended course.

Pulled me in pieces pictures an animal tearing its prey apart.

Desolate means left empty and utterly alone.

The images build from a derailed path to total ruin.

🌪️ His path was forced completely off course
🦷 Pulled in pieces pictures an animal's prey
🏚️ Desolate means left empty and alone
📖 The images build toward total ruin

---
## 🏹 He Hath Bent His Bow, And Set Me As A Mark For The Arrow

A bent bow pictures a deliberate, aimed attack, not a random one.

A mark means a target set up on purpose to be hit.

This is the same bow image used earlier in chapter two against the city.

Now the same precise, intentional judgment is aimed at one man alone.

🏹 A bent bow pictures a deliberate attack
🎯 A mark means a target set on purpose
🔄 Chapter two used this same bow image
📖 Now the aim lands on one man alone

# Lamentations 3:13-15
# 🏹 He Hath Caused The Arrows Of His Quiver To Enter Into My Reins
---
## 🏹 He Hath Caused The Arrows Of His Quiver To Enter Into My Reins

A quiver is the case a warrior carried his arrows in.

Reins in the Bible usually means the kidneys, not horse straps.

Ancient Hebrew thought placed deep emotion in the kidneys, much like the heart today.

The arrow reaching the reins pictures pain striking the deepest part of him.

🏹 A quiver was a warrior's arrow case
🫀 Reins in the Bible means the kidneys
❤️ Hebrew thought placed deep emotion there
📖 This pain struck his deepest inner self

---
## 😂 I Was A Derision To All My People, And Their Song All The Day

Derision means being mocked and laughed at openly.

Song here does not mean a kind tribute, it means a mocking tune.

Being turned into a joke added public shame on top of private pain.

Even his own people joined in the ridicule, not only enemies.

😂 Derision means being mocked openly
🎵 Song here means a mocking tune, not praise
😔 Public shame was added to private pain
📖 Even his own people joined the ridicule

---
## 🌿 He Hath Filled Me With Bitterness, He Hath Made Me Drunken With Wormwood

Wormwood is a plant known for its intensely bitter taste.

Drunken here does not mean alcohol, it means completely overwhelmed.

The image pictures bitterness forced on him until he could not think straight.

This same bitter plant will return again later in the chapter.

🌿 Wormwood was a plant known for bitterness
🥴 Drunken here means completely overwhelmed
🧠 Bitterness overtook his ability to think clearly
📖 This bitter image returns later in the chapter

# Lamentations 3:16-18
# 🦷 He Hath Also Broken My Teeth With Gravel Stones, He Hath Covered Me With Ashes
---
## 🦷 He Hath Also Broken My Teeth With Gravel Stones, He Hath Covered Me With Ashes

Gravel stones in bread or ground grain could genuinely crack a person's teeth.

This pictures suffering showing up in the most basic, daily act of eating.

Ashes were a well known sign of mourning and humiliation in this culture.

Even the simplest parts of daily life now carried pain and shame.

🦷 Gravel in food could genuinely break teeth
🍞 Suffering reached even the basic act of eating
🖤 Ashes were a known sign of mourning
📖 Even ordinary life now carried pain

---
## 🕊️ And Thou Hast Removed My Soul Far Off From Peace: I Forgat Prosperity

Peace here means more than calm, it means wholeness and well being.

Forgat prosperity means the good life now feels almost impossible to remember.

This is grief heavy enough to erase the memory of anything good.

The man admits he can barely picture a time before this pain.

🕊️ Peace here means wholeness, not just calm
🌫️ He can barely remember anything good
🧠 Grief this size erased his memory of ease
📖 He admits he struggles to picture better days

---
## 💔 And I Said, My Strength And My Hope Is Perished From The LORD

Perished means completely gone, not simply weakened or delayed.

This is the lowest point of hope in the entire chapter.

The man says this honestly, without pretending to feel better than he does.

Naming despair out loud is the turning point right before the chapter shifts.

💔 Perished means completely gone, not weakened
⬇️ This is the chapter's lowest point of hope
🗣️ He names his despair honestly, without pretending
📖 This honesty sets up the turn that follows

# Lamentations 3:19-21
# 🌿 Remembering Mine Affliction And My Misery, The Wormwood And The Gall
---
## 🌿 Remembering Mine Affliction And My Misery, The Wormwood And The Gall

This verse repeats the bitter images from earlier in the chapter on purpose.

Naming the pain again shows the man is not avoiding or hiding it.

Wormwood and gall return here as a summary of everything said so far.

Facing the full weight of the pain comes right before the turn toward hope.

🌿 This repeats the chapter's bitter images on purpose
🗣️ Naming the pain shows he is not hiding
📋 Wormwood and gall summarize everything so far
📖 Facing it fully comes right before hope

---
## 🔄 My Soul Hath Them Still In Remembrance, And Is Humbled In Me

Soul here means his whole inner self, not just one feeling.

Humbled means brought low, stripped of pride or false comfort.

The memory of this pain has settled deep inside him, not just passed through.

Being humbled here is painful, but it also clears the way for honesty.

🔄 Soul here means his whole inner self
⬇️ Humbled means brought low, without pretending
🧠 This memory has settled deep inside him
📖 Being humbled clears the way for honesty

---
## 💡 This I Recall To My Mind, Therefore Have I Hope

This is the turning point of the entire chapter, right in the middle.

Recall to my mind means choosing to remember something on purpose.

What he is about to recall is not a new fact but an old truth.

Hope here comes from remembering, not from changed circumstances.

💡 This is the chapter's central turning point
🧠 Recall means choosing to remember on purpose
📜 What follows is an old truth
📖 Hope comes from remembering, not new circumstances

# Lamentations 3:22-24
# ☀️ It Is Of The LORD's Mercies That We Are Not Consumed, Because His Compassions Fail Not
---
## ☀️ It Is Of The LORD's Mercies That We Are Not Consumed, Because His Compassions Fail Not

Consumed means completely destroyed, used up entirely.

The man says survival itself is proof of God's mercy, not bad luck.

Compassions fail not means God's care never runs dry or gives out.

This is the truth he chose to recall to his mind in the verse before.

☀️ Consumed means completely destroyed or used up
🙏 Survival itself is proof of God's mercy
💧 His compassions never run dry or give out
📖 This is the truth he chose to remember

---
## 🌅 Great Is Thy Faithfulness

This is one of the most quoted lines in the whole Bible.

New every morning means God's mercy does not run out and get reused.

Each day brings a fresh supply, not leftovers from yesterday.

Faithfulness means God keeps showing up the same way every single day.

🌅 This is one of the Bible's quoted lines
🔄 Mercy is not reused, it is renewed daily
🌞 Each day brings a fresh supply of mercy
📖 Faithfulness means showing up the same way daily

---
## 🏞️ The LORD Is My Portion, Saith My Soul

Portion was the legal term for a person's assigned share of land.

Israel's priests and Levites received no land, the LORD alone was their portion.

Claiming the LORD as his portion means he has lost everything else but this.

Everything else may be gone, but this one claim gives him real hope.

🏞️ Portion was the legal term for land share
🙏 Priests had no land, only the LORD
💔 He has lost everything else but this claim
📖 This claim alone gives him real hope

# Lamentations 3:25-27
# 🙏 The LORD Is Good Unto Them That Wait For Him, To The Soul That Seeketh Him
---
## 🙏 The LORD Is Good Unto Them That Wait For Him, To The Soul That Seeketh Him

Wait here does not mean doing nothing, it means trusting through delay.

Seeketh means actively pursuing God, not just hoping something will happen.

Both waiting and seeking describe an active, ongoing posture, not passive sitting.

This verse begins a short teaching about how hope actually gets lived out.

🙏 Wait means trusting through delay, not nothing
🔍 Seeketh means actively pursuing, not just hoping
🏃 Both describe an active, ongoing posture
📖 This begins a teaching on how hope lives

---
## 🤫 It Is Good That A Man Should Both Hope And Quietly Wait For The Salvation Of The LORD

Quietly wait pictures patience without complaining or demanding answers.

Salvation here means rescue from the full weight of this suffering.

Pairing hope with quiet waiting describes a settled trust, not a loud one.

This is hope that can hold steady even without an immediate answer.

🤫 Quietly wait pictures patience without complaint
🛟 Salvation here means rescue from suffering
⚖️ This pairs hope with a settled, quiet trust
📖 Hope can hold steady without an immediate answer

---
## 🐂 It Is Good For A Man That He Bear The Yoke In His Youth

A yoke was a wooden bar laid across an animal's neck for hard labor.

Bearing the yoke pictures learning discipline and hardship early in life.

In youth suggests lessons learned early shape a person for the rest of life.

Hardship, faced rightly, is treated here as training rather than only punishment.

🐂 A yoke was a bar for hard labor
💪 Bearing it pictures learning discipline early
🌱 Early lessons shape the rest of a life
📖 Hardship here can be training, not only punishment

# Lamentations 3:28-30
# 🤐 He Sitteth Alone And Keepeth Silence, Because He Hath Borne It Upon Him
---
## 🤐 He Sitteth Alone And Keepeth Silence, Because He Hath Borne It Upon Him

Sitting alone and keeping silence pictures someone processing pain without rushing it.

Borne it upon him means the suffering was in some sense accepted, not fought.

This does not mean suppressing feelings, the whole chapter already named them honestly.

It pictures a quiet endurance that comes after the honest grief already expressed.

🤐 Sitting alone pictures processing pain slowly
🎒 Borne it means the suffering was accepted
🗣️ This is not suppressing feelings, already named honestly
📖 Quiet endurance follows honest grief, not instead

---
## 🪨 He Putteth His Mouth In The Dust

Putting the mouth in the dust was a posture of total submission and humility.

It pictures a person lowering themselves as far down as possible before God.

If so be there may be hope shows this is not giving up but reaching out.

Even in the lowest posture, hope is still the goal, not despair.

🪨 Mouth in the dust pictures total submission
⬇️ He lowers himself as far down as possible
🙏 This reaches toward hope, not giving up
📖 Hope remains the goal even at the lowest

---
## 👋 He Giveth His Cheek To Him That Smiteth Him

Giving the cheek pictures accepting an insult without striking back.

Smiteth means being struck, often as a public act of shame.

Reproach means public insult and disgrace.

This same picture of a struck cheek without retaliation returns later in the New Testament.

👋 Giving the cheek means accepting insult quietly
👊 Smiteth means being struck, often publicly
😔 Reproach means public insult and disgrace
📖 This picture returns later in the New Testament

# Lamentations 3:31-33
# ♾️ For The LORD Will Not Cast Off For Ever
---
## ♾️ For The LORD Will Not Cast Off For Ever

Cast off means rejected completely and permanently.

This verse promises that God's discipline has a limit, even when it feels endless.

For ever is specifically denied here, this pain will not last without end.

This promise is the hinge the rest of this section hangs on.

♾️ Cast off means rejected completely
⏳ God's discipline has a real limit here
🚫 Forever is specifically denied in this verse
📖 This promise anchors everything that follows

---
## 💧 But Though He Cause Grief, Yet Will He Have Compassion According To The Multitude Of His Mercies

This verse holds two things together without softening either one.

God genuinely causes grief, that part is not denied or excused.

Compassion according to the multitude of his mercies means mercy that outweighs the grief.

Grief and mercy are not opposites here, mercy simply has the final word.

💧 This holds grief and compassion together
⚖️ God's causing of grief is not denied
🌊 His mercy is described as outweighing the grief
📖 Mercy gets the final word, not grief

---
## 🚫 For He Doth Not Afflict Willingly Nor Grieve The Children Of Men

Willingly here means with pleasure or as a first choice.

This does not mean God never allows suffering at all.

It means suffering is never the outcome God delights in.

Understanding this protects against picturing God as cruel for its own sake.

🚫 Willingly means with pleasure, by first choice
🤔 This does not deny that suffering happens
💔 Suffering is never God's preferred outcome
📖 This protects against picturing God as cruel

# Lamentations 3:34-36
# ⛓️ To Crush Under His Feet All The Prisoners Of The Earth
---
## ⛓️ To Crush Under His Feet All The Prisoners Of The Earth

This verse begins a short list of specific injustices God does not approve of.

Crushing prisoners under the feet pictures treating the powerless with contempt.

Prisoners here represents anyone without power to defend themselves.

The poem moves from personal grief to a wider concern for justice.

⛓️ This begins a list of real injustices
👣 Crushing under feet pictures treating people with contempt
🔓 Prisoners represents anyone without power to defend themselves
📖 The poem widens from personal grief to justice

---
## ⚖️ To Turn Aside The Right Of A Man Before The Face Of The Most High

Right here means a fair legal judgment, not a feeling or opinion.

Turning it aside pictures a court bending the outcome unfairly.

Before the face of the most High means this happens even though God is watching.

Injustice is treated as an offense against God, not just against the victim.

⚖️ Right here means a fair legal judgment
🙈 Turning it aside pictures a bent court outcome
👁️ This happens even while God is watching
📖 Injustice offends God, not only the victim

---
## 🚫 To Subvert A Man In His Cause, The LORD Approveth Not

Subvert means to twist or undermine something on purpose.

A man's cause means his legal case or his claim to justice.

The LORD approveth not states plainly that God does not sign off on this.

This closes the list by naming God's clear opposition to legal injustice.

🚫 Subvert means to twist something on purpose
⚖️ A man's cause means his legal case
🙅 God clearly does not approve of this
📖 This names God's opposition to injustice plainly

# Lamentations 3:37-39
# 🗣️ Who Is He That Saith, And It Cometh To Pass, When The Lord Commandeth It Not
---
## 🗣️ Who Is He That Saith, And It Cometh To Pass, When The Lord Commandeth It Not

This is a rhetorical question expecting the answer no one.

It means nothing truly happens unless the Lord allows or commands it.

This includes the hard events of this book, not only the good ones.

The claim is uncomfortable, but it keeps God in control even of disaster.

🗣️ This is a rhetorical question, answer no one
✅ Nothing happens unless the Lord allows it
💔 This includes hard events, not only good ones
📖 God stays in control even over disaster

---
## 👄 Out Of The Mouth Of The Most High Proceedeth Not Evil And Good?

This verse asks whether both hardship and blessing come from the same source.

Evil here means hardship or disaster, not moral wickedness.

The verse does not say God does wrong, it says God governs both outcomes.

This widens the point from verse 37 into a general truth about God's rule.

👄 This asks if both outcomes share one source
⚖️ Evil here means hardship, not moral wickedness
👑 God governs both outcomes without doing wrong
📖 This widens into a truth about God's rule

---
## 😤 Wherefore Doth A Living Man Complain, A Man For The Punishment Of His Sins?

This verse turns the teaching toward personal responsibility.

Living man complain asks why someone who is still alive bothers to protest.

Punishment of his sins reminds the reader that consequences often have real causes.

Being alive to complain is itself framed here as a kind of mercy already received.

😤 This turns toward personal responsibility
🗣️ It asks why a living person still protests
⚖️ Consequences often have real, named causes
📖 Being alive to complain is itself a mercy

# Lamentations 3:40-42
# 🔍 Let Us Search And Try Our Ways, And Turn Again To The LORD
---
## 🔍 Let Us Search And Try Our Ways, And Turn Again To The LORD

The voice shifts here from one man to a whole community, "us."

Search and try pictures an honest, careful self examination, not a quick glance.

Turn again to the LORD is the Bible's basic word for repentance.

Honest self examination is presented as the necessary first step toward returning to God.

🔍 Voice shifts from one man to a community
🕵️ Search and try pictures honest self examination
🔄 Turn again is the Bible's word for repentance
📖 Honest reflection is the first step toward return

---
## 🙌 Let Us Lift Up Our Heart With Our Hands Unto God In The Heavens

Lifting the hands was a common physical posture for prayer in this culture.

Pairing it with lifting the heart means the body and the inner self must match.

A prayer could not simply be a gesture, it had to be sincere inside too.

This verse asks for prayer that is both physically and inwardly genuine.

🙌 Lifting hands was a common prayer posture
❤️ The heart must be lifted with the hands
🎭 A gesture alone was never enough
📖 This asks for prayer genuine inside and out

---
## 💔 We Have Transgressed And Have Rebelled: Thou Hast Not Pardoned

Transgressed means crossing a line that was clearly marked.

Rebelled means an active, willful refusal, stronger than a simple mistake.

Thou hast not pardoned is a painfully honest admission that forgiveness has not yet come.

The prayer does not rush to a happy ending, it sits in honest confession first.

💔 Transgressed means crossing a clearly marked line
✊ Rebelled means active, willful refusal
🙏 Pardon has not yet come, stated honestly
📖 The prayer sits in confession before resolution

# Lamentations 3:43-45
# ☁️ Thou Hast Covered With Anger, And Persecuted Us: Thou Hast Slain, Thou Hast Not Pitied
---
## ☁️ Thou Hast Covered With Anger, And Persecuted Us: Thou Hast Slain, Thou Hast Not Pitied

This verse returns to naming God directly as the source of the suffering.

Covered with anger pictures anger surrounding them the way a cloud surrounds a hill.

Not pitied means no mercy was shown in that specific moment.

This brutally honest language is allowed, even inside a prayer of repentance.

☁️ This again names God as the source
🌥️ Covered with anger pictures a surrounding cloud
🚫 Not pitied means no mercy shown then
📖 Honest language like this is allowed in prayer

---
## 🌫️ Thou Hast Covered Thyself With A Cloud, That Our Prayer Should Not Pass Through

A cloud here pictures a barrier blocking communication, not literal weather.

This echoes the cloud of anger from the very start of chapter two.

Prayer should not pass through describes the painful feeling of being unheard.

Naming this feeling honestly is different from saying God has actually abandoned them.

🌫️ A cloud pictures a communication barrier
🔄 This echoes the cloud from chapter two
🙉 It describes the feeling of being unheard
📖 Naming the feeling is not the same

---
## 🗑️ Thou Hast Made Us As The Offscouring And Refuse In The Midst Of The People

Offscouring means the dirt and waste scraped off a surface.

Refuse means garbage, the leftover scraps nobody wants.

Together the words picture total, public worthlessness in the eyes of other nations.

This is the lowest possible self description, named without flinching.

🗑️ Offscouring means dirt scraped off a surface
🚮 Refuse means garbage nobody wants
👀 This pictures worthlessness in other nations' eyes
📖 This is the lowest self description, named honestly

# Lamentations 3:46-48
# 👄 All Our Enemies Have Opened Their Mouths Against Us
---
## 👄 All Our Enemies Have Opened Their Mouths Against Us

Opened their mouths here means mocking and speaking against them openly.

This repeats imagery already used in chapter two about the enemy's cruelty.

Repetition across the book shows the scale of suffering was constant, not a single event.

Public mockery added an extra layer of pain on top of the destruction itself.

👄 Opened mouths means mocking them openly
🔄 This repeats imagery from chapter two
📏 Repetition shows suffering was constant, not brief
📖 Mockery added pain on top of destruction

---
## 🕳️ Fear And A Snare Is Come Upon Us, Desolation And Destruction

A snare was a trap used to catch animals, often hidden.

Fear and a snare together picture constant danger with no safe step to take.

Desolation and destruction stack two words for ruin to make the point stronger.

This verse piles up images on purpose, showing suffering from every angle at once.

🕳️ A snare was a hidden animal trap
⚠️ This pictures danger with no safe step
💥 Two words for ruin stack together here
📖 Images pile up to show total suffering

---
## 😭 Mine Eye Runneth Down With Rivers Of Water For The Destruction Of The Daughter Of My People

Rivers of water is a deliberate exaggeration to show the depth of grief.

Daughter of my people again names Jerusalem and her people as a whole.

The man weeps for the nation now, not only for his personal suffering.

His grief has turned outward, toward everyone who shares in this disaster.

😭 Rivers of water exaggerates the depth of grief
👑 Daughter of my people again names Jerusalem
🫂 He now weeps for the nation, not himself
📖 His grief has turned outward toward everyone

# Lamentations 3:49-51
# 💧 Mine Eye Trickleth Down, And Ceaseth Not, Without Any Intermission
---
## 💧 Mine Eye Trickleth Down, And Ceaseth Not, Without Any Intermission

Trickleth down pictures a slow, steady, unending stream of tears.

Ceaseth not and without intermission both emphasize that this grief has no breaks.

Stacking two phrases that mean the same thing is a common feature of Hebrew poetry.

The repetition itself makes the reader feel how relentless this grief really was.

💧 Trickleth down pictures a slow, steady stream
⏸️ Ceaseth not means this grief takes no breaks
🔁 Hebrew poetry often repeats an idea twice
📖 The repetition makes the grief feel relentless

---
## 👀 Till The LORD Look Down, And Behold From Heaven

This names the one thing that will finally bring relief.

Look down and behold pictures God paying direct, personal attention.

The man is not asking for a reason, he is asking to be seen.

Simply being noticed by God is treated here as enough to hope for.

👀 This names the one thing that brings relief
🙏 Look down pictures God paying personal attention
❓ He only asks to be seen
📖 Being noticed by God is enough

---
## 💔 Mine Eye Affecteth Mine Heart Because Of All The Daughters Of My City

Affecteth mine heart means what he sees with his eyes wounds him inside.

Daughters of my city likely refers to the young women of Jerusalem.

Seeing their suffering firsthand makes the grief personal, not abstract.

Watching suffering happen to others can wound a person as deeply as their own pain.

💔 What he sees wounds him deeply inside
👧 Daughters of my city means young women
👁️ Seeing suffering firsthand made it personal
📖 Watching others suffer can wound just as deeply

# Lamentations 3:52-54
# 🐦 Mine Enemies Chased Me Sore, Like A Bird, Without Cause
---
## 🐦 Mine Enemies Chased Me Sore, Like A Bird, Without Cause

Sore here means severely, not a minor or light pursuit.

Comparing himself to a hunted bird pictures someone small, fast, and defenseless.

Without cause means he had done nothing to deserve this specific personal attack.

This section shifts back to the man's own experience of being personally hunted.

🐦 Sore here means severely, not lightly
🏹 A hunted bird pictures someone small and defenseless
❓ Without cause means he did not deserve this
📖 The focus returns to his personal experience

---
## 🪨 They Have Cut Off My Life In The Dungeon, And Cast A Stone Upon Me

A dungeon here was a deep pit used as a holding cell or prison.

Casting a stone over the opening pictures being sealed in completely.

Many scholars connect this to Jeremiah's own imprisonment described in Jeremiah 38.

If this is Jeremiah speaking, the image is drawn from real personal memory.

🪨 A dungeon was a deep prison pit
🔒 A stone over the top sealed him in
📜 Many scholars connect this to Jeremiah 38
📖 This image may come from real memory

---
## 🌊 Waters Flowed Over Mine Head

Waters flowing over the head pictures drowning, a common image for being overwhelmed.

I am cut off means he believed his life was truly about to end.

This marks the lowest physical danger described anywhere in the chapter.

The next section will show what happened when he called out even from here.

🌊 Waters over the head pictures drowning
⬇️ I am cut off means he expected death
📉 This marks the chapter's lowest point of danger
📖 What happens next will answer this moment

# Lamentations 3:55-57
# 🙏 I Called Upon Thy Name, O LORD, Out Of The Low Dungeon
---
## 🙏 I Called Upon Thy Name, O LORD, Out Of The Low Dungeon

Low dungeon emphasizes just how deep and hopeless this pit truly was.

Called upon thy name means praying specifically and directly, not a vague wish.

Even from what felt like the point of death, prayer was still possible.

This verse answers the drowning image from the verse right before it.

🙏 Low dungeon emphasizes just how deep this was
📛 Called upon thy name means a direct prayer
💫 Prayer was still possible even near death
📖 This directly answers the drowning image before it

---
## 👂 Thou Hast Heard My Voice

Thou hast heard my voice is stated as a settled fact, not a hope.

Hide not thine ear asks God to keep listening, even to wordless sounds.

Breathing here pictures groaning too exhausted to form into full words.

God is shown listening even to sounds too weak to be real sentences.

👂 Thou hast heard states a settled fact
🙉 Hide not thine ear asks God to listen
😮‍💨 Breathing pictures groaning too weak for words
📖 God listens even to sounds, not only words

---
## 🤝 Thou Drewest Near In The Day That I Called Upon Thee: Thou Saidst, Fear Not

Drewest near pictures God moving physically closer, not staying distant.

In the day that I called shows the response came right when he reached out.

Fear not is a phrase used throughout the Bible when God reassures someone directly.

This is the clearest moment of comfort recorded anywhere in this chapter.

🤝 Drewest near pictures God moving closer
📅 The response came right when he called
🗣️ Fear not is God's direct reassurance phrase
📖 This is the chapter's clearest moment of comfort

# Lamentations 3:58-60
# ⚖️ O LORD, Thou Hast Pleaded The Causes Of My Soul
---
## ⚖️ O LORD, Thou Hast Pleaded The Causes Of My Soul

Pleaded the causes pictures God acting like a defense lawyer in a courtroom.

Redeemed was the legal word for buying someone or something back, often a relative.

This is the same kinsman redeemer idea that appears in the book of Ruth.

God is pictured here as both his defender in court and his family rescuer.

⚖️ Pleaded the causes pictures a defense lawyer
💰 Redeemed meant legally buying someone back
📜 This echoes the kinsman redeemer idea from Ruth
📖 God is both his defender and rescuer

---
## 👁️ O LORD, Thou Hast Seen My Wrong

My wrong here means the injustice done against him by his enemies.

Judge thou my cause asks God to issue a fair legal ruling in his favor.

This continues the courtroom picture from the verse right before it.

He is not asking for revenge, he is asking for a fair verdict.

👁️ My wrong means injustice done against him
⚖️ Judge thou my cause asks for fair ruling
🏛️ This continues the courtroom picture from before
📖 He asks for a verdict, not revenge

---
## 💭 Thou Hast Seen All Their Vengeance And All Their Imaginations Against Me

Vengeance here means the harm his enemies actively carried out against him.

Imaginations means their inner plots and intentions, even before they acted.

The man trusts that God sees both the actions and the hidden motives behind them.

Nothing done or even privately planned against him has gone unnoticed by God.

💭 Vengeance means harm actually carried out
🧠 Imaginations means their hidden inner plots
👁️ God sees both actions and hidden motives
📖 Nothing against him goes unnoticed by God

# Lamentations 3:61-63
# 👂 Thou Hast Heard Their Reproach, O LORD, And All Their Imaginations Against Me
---
## 👂 Thou Hast Heard Their Reproach, O LORD, And All Their Imaginations Against Me

Reproach means insults and public shaming, said about him to others.

This repeats the earlier claim that God hears even hidden plots against him.

Repetition here reinforces just how much comfort this specific truth gave him.

Being heard by God mattered to him more than winning the argument himself.

👂 Reproach means insults spoken about him
🔁 This repeats God hearing hidden plots
💪 Repetition shows how much this truth mattered
📖 Being heard mattered more than winning the argument

---
## 💬 The Lips Of Those That Rose Up Against Me, And Their Device Against Me All The Day

Lips here stands in for everything his enemies said about him.

Device means a scheme or plan, something deliberately worked out.

All the day emphasizes this harassment was constant, not occasional.

He felt surrounded by hostility that never seemed to let up.

💬 Lips stands in for everything they said
🧩 Device means a deliberately worked out scheme
⏰ All the day means this was constant
📖 He felt surrounded by nonstop hostility

---
## 🎵 Behold Their Sitting Down, And Their Rising Up

Sitting down and rising up is a Hebrew way of saying all day long.

Musick here does not mean a tribute, it means a mocking song sung about him.

Being turned into a mocking song was a well known form of public humiliation.

This verse returns to the derision and mockery named earlier in the chapter.

🎵 Sitting and rising means all day long
🎭 Musick here means a mocking song, not praise
😔 Being mocked in song was public humiliation
📖 This echoes the earlier derision from the chapter

# Lamentations 3:64-66
# ⚖️ Render Unto Them A Recompence, O LORD, According To The Work Of Their Hands
---
## ⚖️ Render Unto Them A Recompence, O LORD, According To The Work Of Their Hands

Recompence means a fitting repayment, giving back exactly what is deserved.

According to the work of their hands means the punishment should match their actions.

This kind of prayer appears often in Lamentations and the Psalms, called imprecatory prayer.

It hands the matter of justice over to God rather than taking revenge personally.

⚖️ Recompence means a fitting repayment
🤲 Punishment should match their actual actions
📜 This kind of prayer appears often in Psalms
📖 It hands justice to God instead of revenge

---
## 💔 Give Them Sorrow Of Heart, Thy Curse Unto Them

Sorrow of heart asks that his enemies feel the same kind of pain he has felt.

Thy curse unto them asks God to bring consequences, not simply bad luck.

This prayer is honest about wanting justice, not pretending to feel nothing.

The Bible does not hide prayers like this, even though they are hard to read.

💔 Sorrow of heart means feeling the same pain
⚡ Thy curse asks for real consequences
🗣️ This prayer is honest, not pretending to feel
📖 The Bible does not hide hard prayers

---
## 🔥 Persecute And Destroy Them In Anger From Under The Heavens Of The LORD

Persecute and destroy stack two strong words for the same request, justice at last.

From under the heavens of the LORD means this happens under God's full authority.

The chapter that began in personal darkness ends by handing everything over to God.

Even the harshest request in this chapter still trusts God as the one in control.

🔥 Two strong words stack for one final request
👑 This happens under God's full authority
🌓 The chapter moves from personal darkness to trust
📖 Even this hard request still trusts God's control
`.trim();

export const LAMENTATIONS_THREE_PERSONAL_SECTIONS = parseLamentationsThreeRawNotes(LAMENTATIONS_THREE_RAW_NOTES);
