export type IsaiahFiftyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFiftyOneRawNotes(rawText: string): IsaiahFiftyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFiftyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+51:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 51 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+51:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+51:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 51 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 51,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 51:${startVerse}` : `Isaiah 51:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Isaiah 51 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FIFTY_ONE_RAW_NOTES = `# Isaiah 51:1-3
# 🪨 Look Unto The Rock Whence Ye Are Hewn
---
## 👂 Hearken To Me, Ye That Follow After Righteousness

Hearken means listen closely, more than simply hearing a sound.

This word demands full attention, not a passing glance.

The people addressed here are chasing after righteousness, pursuing right standing with God.

They are also described as those who seek the LORD, actively searching Him out.

God speaks directly to people already moving in the right direction.

👂 Hearken means listen closely and carefully
🏃 Follow after righteousness means actively pursuing it
🔍 Seek the LORD means searching Him out
📖 God speaks to people already seeking Him

## ⛏️ Look Unto The Rock Whence Ye Are Hewn

Hewn means cut or carved out of solid stone.

Digged means dug out of the ground, the word used in the matching phrase right after this one.

Both words describe a quarry, where large blocks are cut and removed from one source.

Hebrew poetry often repeats one idea using two different pictures.

The source they were cut from is named directly in the next verse, Abraham himself.

⛏️ Hewn means cut from solid stone
🕳️ Digged means dug from the ground
🔁 Two pictures repeat one idea on purpose
📖 The source is Abraham, named next

## 👴 Look Unto Abraham Your Father, And Unto Sarah That Bare You

Bare is an old word meaning gave birth to.

Abraham and Sarah were the first couple God built a whole nation from.

This verse tells Israel to remember its real ancestors, not just an idea.

Abraham and Sarah are the rock the chapter opened with.

Israel is the stone cut from that one couple.

👶 Bare means gave birth to
👴 Abraham and Sarah founded the nation
🪨 They are the rock from verse one
📖 Israel came from just this one couple

## 🌱 For I Called Him Alone, And Blessed Him, And Increased Him

Called alone means Abraham started out as one single man with no nation behind him.

God's blessing did not stay small.

That one man grew into a whole nation through blessing and increase.

This proves the same thing can happen again for a scattered, discouraged people.

👤 Called alone means he started as one man
🌱 Blessing turned one man into a nation
📈 Increase means growth beyond human effort
📖 A nation can grow again from nothing

## 🏙️ The LORD Shall Comfort Zion, He Will Comfort All Her Waste Places

Zion is another name for Jerusalem, standing in for the whole nation.

Waste places means the ruined, abandoned sections left after judgment or war.

God promises comfort is coming, not more punishment.

This comfort is not vague.

It reaches every wasted, forgotten corner of the city.

🏙️ Zion stands for Jerusalem and the nation
🏚️ Waste places means ruined, abandoned sections
🤗 God promises comfort, not more punishment
📖 The comfort reaches every forgotten corner

## 🌳 He Will Make Her Wilderness Like Eden, And Her Desert Like The Garden Of The LORD

Eden was the first garden, the place of closeness with God.

This promise pictures Zion's ruined land turning back into something like that first garden.

Wilderness and desert both describe empty, lifeless ground.

God is promising the opposite, fruitfulness where nothing survived before.

🌳 Eden was the first garden with God
🏜️ Wilderness and desert mean empty, lifeless ground
🌱 God promises fruitfulness where nothing grew
📖 This is full restoration, not a small fix

## 🎵 Joy And Gladness Shall Be Found Therein, Thanksgiving, And The Voice Of Melody

This verse stacks up four different words for celebration on purpose.

Joy and gladness describe the feeling inside a restored city.

Thanksgiving is the response of gratitude toward God for doing it.

The voice of melody pictures actual singing filling the streets again.

😊 Joy and gladness describe restored feeling
🙏 Thanksgiving is gratitude toward God
🎵 Voice of melody pictures real singing
📖 A silent ruin turns loud with praise

# Isaiah 51:4-6
# ⚖️ My Righteousness Is Near
---
## 👂 Hearken Unto Me, My People, Give Ear Unto Me, O My Nation

Hearken and give ear both mean the same thing, listen closely.

God repeats the command using two different phrases on purpose.

This is the third time this exact call to listen opens a section in this chapter.

The repetition itself signals something important is about to be said.

👂 Hearken and give ear both mean listen
🔁 God repeats the command on purpose
🔔 The third such opening in this chapter
📖 Repetition signals something important is coming

## 📜 A Law Shall Proceed From Me, And I Will Make My Judgment To Rest For A Light Of The People

Law here means instruction or teaching, not only a list of rules.

Proceed means to go out from its source, like light spreading from a lamp.

God pictures His own teaching going out and lighting the way for people.

Light in scripture usually pictures guidance and truth against confusion.

📜 Law means teaching, not just rules
💡 Proceed means going out from its source
🕯️ Light pictures guidance against confusion
📖 God's own teaching lights the way

## ⚖️ My Righteousness Is Near, My Salvation Is Gone Forth

Near means close, already on its way rather than distant.

Righteousness here describes God's own right and just character in action.

Salvation gone forth pictures rescue already released, moving toward the people.

These two lines promise the wait is nearly over.

⏱️ Near means close, already on the way
⚖️ Righteousness describes God acting rightly
🏃 Gone forth pictures rescue already moving
📖 The long wait is nearly over

## 🏝️ The Isles Shall Wait Upon Me, And On Mine Arm Shall They Trust

Isles here means the distant coastlands and islands, far beyond Israel's own borders.

This includes nations who do not yet know God at all.

Arm is a common picture for God's power and strength to act.

Even far off nations are pictured looking to God's power with hope.

🏝️ Isles means distant coastlands and nations
🌍 This includes people far beyond Israel
💪 Arm pictures God's power to act
📖 Even distant nations look to God

## 💨 The Heavens Shall Vanish Away Like Smoke, And The Earth Shall Wax Old Like A Garment

Vanish like smoke pictures something disappearing quickly and completely.

Wax old like a garment means wearing out slowly, the way old clothing frays.

God is saying even the sky and the earth itself will not last forever.

This makes the next promise even more striking by contrast.

💨 Vanish like smoke means disappearing completely
👕 Wax old like a garment means wearing out
🌍 Even the sky and earth will not last
📖 This makes the next promise stand out

## 🚫 My Salvation Shall Be For Ever, And My Righteousness Shall Not Be Abolished

Abolished means completely ended or done away with.

Everything else in creation is pictured wearing out or vanishing.

God's salvation and righteousness are set apart from that entire pattern.

What God does for His people outlasts the sky itself.

🚫 Abolished means completely ended
🌌 Creation itself is pictured wearing out
♾️ God's salvation is set apart from that
📖 What God does outlasts the sky itself

# Isaiah 51:7-8
# 🦋 Fear Not The Reproach Of Men
---
## ❤️ The People In Whose Heart Is My Law

This describes people who have taken God's teaching inside themselves, not just heard it once.

Heart in scripture usually means the center of a person's will and thinking, not only emotion.

Knowing righteousness and carrying God's law in the heart go together in this verse.

This is a lasting, internal kind of faith, not a surface habit.

❤️ Heart means the center of will and thinking
📜 God's law is carried inside, not just heard
🔗 Knowing righteousness and this go together
📖 This is lasting faith, not a surface habit

## 😤 Fear Ye Not The Reproach Of Men, Neither Be Ye Afraid Of Their Revilings

Reproach means public shame or insult aimed at someone.

Revilings means harsh, mocking words meant to tear someone down.

God's people are told not to let other people's opinions control their fear.

The command assumes real mockery is coming, not just a hypothetical.

😤 Reproach means public shame or insult
🗣️ Revilings means harsh, mocking words
🚫 This means not letting opinions control you
📖 Real mockery is expected, not imagined

## 🦋 The Moth Shall Eat Them Up Like A Garment

A moth slowly destroys cloth from the inside, unnoticed until the damage is done.

This pictures the people mocking God's people fading away slowly over time.

The worm eating wool repeats the same idea with a second picture.

Mockers who feel powerful now are compared to something that quietly falls apart.

🦋 A moth slowly destroys cloth unseen
🪱 The worm eating wool repeats the picture
📉 Mockers fade away slowly over time
📖 What feels powerful now quietly falls apart

## 🔁 My Righteousness Shall Be For Ever, And My Salvation From Generation To Generation

This line repeats the ending of the section right before it, almost word for word.

The repeated promise across two sections is intentional, not careless writing.

Generation to generation means this promise was never meant for only one group of people.

Mockery fades quickly.

This promise does not.

🔁 This repeats the earlier promise on purpose
👨‍👩‍👧‍👦 Generation to generation means every future group
⏳ Mockery fades quickly over time
📖 God's promise outlasts every mocking voice

# Isaiah 51:9-11
# 💪 Awake, Awake, O Arm Of The LORD
---
## 🙏 Awake, Awake, Put On Strength, O Arm Of The LORD

This is a prayer, the people crying out and asking God to act.

Awake does not mean God was actually sleeping or unaware.

It is a cry for God to visibly show up and act with power.

Arm of the LORD is repeated language for God's strength stepping into action.

🙏 This is a prayer asking God to act
😴 Awake does not mean God was sleeping
💪 It asks God to visibly show power
📖 Arm of the LORD pictures God acting

## 📜 As In The Ancient Days, In The Generations Of Old

This calls back to a specific earlier moment in Israel's history.

The people are asking God to act the same way He acted long ago.

That earlier moment is named directly in the very next line.

Looking backward here builds confidence for what is being asked now.

📜 This calls back to Israel's earlier history
🔁 They ask God to repeat that action
👇 The moment is named in the next line
📖 Remembering the past builds present confidence

## 🐉 Art Thou Not It That Hath Cut Rahab, And Wounded The Dragon?

Rahab here is not the woman from Jericho.

This Rahab is a poetic name for Egypt, sometimes pictured as a sea monster.

Dragon is another name for that same monster picture.

Cutting and wounding this creature is poetic language for God defeating Egypt at the exodus.

This same victory gets described more plainly in the next verse.

🐉 Rahab here is a poetic name for Egypt
🐍 Dragon repeats the same monster picture
⚔️ Cutting and wounding means defeating Egypt
📖 This recalls God's victory at the exodus

## 🌊 Art Thou Not It Which Hath Dried The Sea

This asks the same question a second time using a plainer picture.

Instead of a monster, this line names the actual historical event directly.

Dried the sea and the great deep both point to the Red Sea crossing in Exodus.

Ransomed means the people God bought back and set free from slavery in Egypt.

❓ This repeats the question more plainly
🌊 Dried the sea points to the Red Sea
⛓️ Ransomed means bought back and set free
📖 God made a way through the water

## ⛓️ The Redeemed Of The LORD Shall Return, And Come With Singing Unto Zion

Redeemed means people who were bought back out of captivity.

This promises actual return, a real journey home for exiles.

Singing marks the mood of that return, not silence or fear.

Everlasting joy upon their head pictures joy resting on someone like a crown.

⛓️ Redeemed means bought back from captivity
🚶 This promises a real journey home
🎵 Singing marks the mood of return
📖 Joy is pictured resting like a crown

## 🏃 Sorrow And Mourning Shall Flee Away

Flee away pictures sorrow and mourning running off like something chased out.

This departure is sudden, not a slow fade.

Gladness and joy take the place sorrow used to hold.

This chapter keeps circling back to the same promise of real comfort.

🏃 Flee away means running off suddenly
⚡ This is sudden, not a slow fade
😊 Gladness and joy take sorrow's place
📖 Real comfort is the promise repeated here

# Isaiah 51:12-16
# 🤲 I, Even I, Am He That Comforteth You
---
## 🗣️ I, Even I, Am He That Comforteth You

The repeated I, even I places all the emphasis on who is speaking.

God is naming Himself directly as the source of comfort, not a messenger or a lesser power.

This kind of doubled pronoun is a Hebrew way of adding weight to a claim.

Nothing about the following questions makes sense without this claim standing first.

🗣️ I, even I emphasizes who is speaking
🤗 God names Himself as the source of comfort
🔂 Doubling the pronoun adds weight in Hebrew
📖 Everything after this rests on this claim

## ❓ Who Art Thou, That Thou Shouldest Be Afraid Of A Man That Shall Die

This is a pointed question, not a request for information.

It asks why anyone would fear a human being over the God who just spoke.

A man that shall die reminds the reader that any human threat is temporary.

Made as grass pictures something that grows fast and withers just as fast.

❓ This question is not really a question
😨 It asks why fear a mere human
⏳ A man that dies is a temporary threat
📖 Made as grass means fast to wither

## 🧠 Forgettest The LORD Thy Maker, That Hath Stretched Forth The Heavens

Forgettest means forgetting, here forgetting who actually made and holds everything together.

Maker names God directly as the one who created the world, not just cares for it.

Stretched forth the heavens pictures God spreading out the sky the way someone unrolls a tent.

Fearing a human oppressor next to this Maker makes no sense.

It gets the size of the real problem completely backward.

🧠 Forgettest means forgetting who truly made you
🛠️ Maker names God as the actual creator
⛺ Stretched forth pictures a sky like a tent
📖 Fearing a man over this Maker is backward

## 📅 Feared Continually Every Day Because Of The Fury Of The Oppressor

Continually every day describes constant, exhausting fear, not a single scary moment.

Oppressor names whoever was threatening or ruling over the exiled people harshly.

This kind of fear wears a person down slowly over time.

The next line asks where that same oppressor's fury has actually gone.

📅 Continually every day means constant fear
👊 Oppressor names the one threatening them
😩 This fear wears a person down slowly
📖 The next line questions where it went

## ❓ Where Is The Fury Of The Oppressor?

This question expects an answer of nowhere, gone, disappeared.

An oppressor who once seemed unstoppable is pictured as already fading from view.

The fear felt real at the time.

The threat itself was never actually permanent.

This sets up the promise of freedom described in the very next verse.

❓ This expects the answer nowhere
👻 A once feared oppressor is fading away
⏳ The threat was never actually permanent
📖 This sets up the next verse's promise

## 🏃 The Captive Exile Hasteneth That He May Be Loosed

Hasteneth is an old word meaning to hurry or move quickly.

This pictures a prisoner eager for release, moving fast toward freedom.

Loosed means set free from chains or captivity.

The captive is not passive here.

Freedom is already close enough to hurry toward.

🏃 Hasteneth means to hurry quickly
⛓️ This pictures a prisoner eager for release
🔓 Loosed means set free from captivity
📖 Freedom is close enough to hurry toward

## 🕳️ That He Should Not Die In The Pit, Nor That His Bread Should Fail

Pit here pictures a prison or a place of death, not a literal hole for digging.

Bread failing means running out of food, a real fear during captivity.

Both lines promise basic survival, staying alive and staying fed.

This is not only a promise of eventual freedom.

It is also a promise of survival until that day comes.

🕳️ Pit here pictures prison or death
🍞 Bread failing means running out of food
🛡️ Both lines promise basic survival
📖 Survival is promised until freedom comes

## 🌊 I Am The LORD Thy God, That Divided The Sea, Whose Waves Roared

This calls back again to the Red Sea crossing at the exodus.

Divided the sea names the exact miracle, water splitting apart on command.

Waves roared pictures the sea as loud and violent, not calm or small.

God is not a distant idea in this verse.

He is named here by a specific, remembered act.

🌊 This recalls the Red Sea crossing
✂️ Divided the sea names the exact miracle
📢 Waves roared pictures a loud, violent sea
📖 God is known by a specific remembered act

## ⚔️ The LORD Of Hosts Is His Name

Hosts means armies, often pictured as the armies of heaven itself.

This title pictures God commanding endless heavenly forces, not standing alone.

A name in scripture often reveals character, not just an identifier.

This name says God has more than enough power to keep every promise in this chapter.

⚔️ Hosts means armies, including heaven's own
👑 This title pictures God commanding vast forces
🏷️ A name here reveals character
📖 God has more than enough power

## 🖐️ I Have Covered Thee In The Shadow Of Mine Hand

Shadow of a hand pictures shade and protection, like a covering held overhead.

This is close, protective language, not distant or formal.

The same hand that stretches out the heavens is pictured sheltering one small nation.

Thou art my people closes the section with a simple, direct claim of belonging.

🖐️ Shadow of a hand pictures shelter and shade
🤗 This is close, protective language
🌌 The same hand also made the heavens
📖 Thou art my people claims belonging

# Isaiah 51:17-20
# 🍷 Awake, Awake, Stand Up, O Jerusalem
---
## 🔁 Awake, Awake, Stand Up, O Jerusalem

This is the same awake, awake call from earlier in the chapter.

Now it is aimed at Jerusalem instead of God's arm.

There the people asked God to wake up and act.

Here God calls Jerusalem herself to wake up and rise.

The roles have flipped.

🔁 This repeats the earlier awake, awake call
🙏 Before, the people asked God to act
🏙️ Now God calls Jerusalem to rise
📖 The roles in this chapter have flipped

## 🍷 Which Hast Drunk At The Hand Of The LORD The Cup Of His Fury

The cup of fury is a common Old Testament picture for God's judgment.

Drinking from it means fully experiencing the punishment that judgment brings.

This cup came from God's own hand, not from chance or enemy cruelty alone.

Jerusalem is pictured as having fully swallowed the consequence of the nation's sin.

🍷 The cup of fury pictures God's judgment
🥤 Drinking it means fully experiencing punishment
🖐️ This cup came from God's own hand
📖 Jerusalem fully swallowed the consequence of sin

## 🍷 Thou Hast Drunken The Dregs Of The Cup Of Trembling, And Wrung Them Out

Dregs means the thick, bitter leftovers that settle at the bottom of a cup.

Drinking to the dregs means taking in every last drop, holding nothing back.

Wrung them out pictures shaking the cup to get out even the final bitter drops.

This describes judgment experienced completely, not partly.

🍷 Dregs means the bitter leftovers at the bottom
🥤 Drinking to the dregs means holding nothing back
🤲 Wrung out means shaking out the last drop
📖 This judgment was felt completely, not partly

## 🧭 There Is None To Guide Her Among All The Sons Whom She Hath Brought Forth

Guide here means someone able to lead her safely through this disaster.

Jerusalem had many sons, her own people born and raised within her.

None of them, despite their numbers, could lead her out of this collapse.

A population without help is pictured as helpless no matter how many people remain.

🧭 Guide means someone able to lead safely
👨‍👩‍👧‍👦 Jerusalem had many of her own sons
🤷 None of them could lead her out
📖 Numbers do not equal real help

## 🔢 These Two Things Are Come Unto Thee

This introduces two specific disasters about to be named directly.

The phrase two things sets up a count, making the reader expect a short list.

That list follows immediately after, naming exactly what struck Jerusalem.

Naming disasters specifically, instead of speaking only in general terms, makes the description feel real.

🔢 Two things sets up a specific count
📋 A short list follows immediately after
🎯 The disasters are named specifically, not vaguely
📖 Naming things directly makes suffering feel real

## 🔢 Desolation, And Destruction, And The Famine, And The Sword

This verse stacks four words together, repeating and for emphasis.

Desolation and destruction describe the physical ruin of the land and city.

Famine names starvation.

The sword names violent war and conquest.

🔢 Four disasters are named back to back
🏚️ Desolation and destruction mean physical ruin
🍽️ Famine names starvation, the sword names war
📖 Naming four disasters shows complete devastation

## ❓ By Whom Shall I Comfort Thee?

This question is asked by God Himself, not by an outside observer.

It admits that no ordinary human source of comfort fits a disaster this size.

The size of the question sets up the size of the answer still to come.

Only God can match the scale of what Jerusalem just went through.

❓ God Himself asks this question
🤷 No ordinary comfort fits this disaster
📏 The question matches the size of the loss
📖 Only God can match this scale

## 😵 Thy Sons Have Fainted, They Lie At The Head Of All The Streets

Fainted here means collapsing from exhaustion, hunger, or grief in public.

Lying at the head of the streets pictures people collapsed in the most visible, public places in the city.

This is a picture of total public collapse, not a private struggle hidden away.

The suffering described here was impossible for anyone in the city to miss.

😵 Fainted means collapsing from exhaustion or grief
🛣️ This happened in the most visible places
👀 This was public, not a hidden struggle
📖 No one in the city could miss it

## 🐂 As A Wild Bull In A Net

A wild bull caught in a net thrashes and struggles.

It cannot free itself no matter how hard it fights.

This pictures strong, desperate struggle that ends in exhaustion, not escape.

Rebuke of thy God names the source of this suffering plainly.

Even in judgment, the text refuses to hide who allowed this to happen.

🐂 A wild bull in a net thrashes helplessly
💪 This pictures desperate struggle without escape
📢 Rebuke of thy God names the source
📖 The text does not hide who allowed this

# Isaiah 51:21-23
# 🔄 The Cup Passes To Your Tormentors
---
## 😖 Thou Afflicted, And Drunken, But Not With Wine

Afflicted describes someone suffering under real hardship, not exaggerating.

Drunken but not with wine means Jerusalem is staggering and disoriented from judgment, not alcohol.

This picture describes the confusion and stumbling that came with the cup of fury from before.

The suffering felt exactly like drunkenness, without any actual drinking involved.

😖 Afflicted means suffering under real hardship
🍷 Drunken here means staggering from judgment, not wine
😵‍💫 This describes confusion, not actual drinking
📖 The cup of fury caused this stagger

## ⚖️ Thy God That Pleadeth The Cause Of His People

Pleadeth is a courtroom word meaning to argue a case on someone's behalf.

This pictures God acting as a legal defender, not a distant judge only.

The same God who allowed judgment is now pictured fighting for His people's cause.

Both roles, the one who judged and the one who defends, belong to the same God.

⚖️ Pleadeth means arguing a case for someone
🛡️ This pictures God as a legal defender
🔁 The same God who judged now defends
📖 Judgment and defense both belong to Him

## 🍷 I Have Taken Out Of Thine Hand The Cup Of Trembling

This directly answers the cup described earlier in the chapter.

Taken out of thine hand means the cup of judgment is being physically removed.

Trembling here describes the shaking fear that came with drinking from that cup.

The removal is stated plainly, not hinted at or left uncertain.

🍷 This answers the cup from earlier
✋ Taken out means the cup is removed
😰 Trembling describes the shaking fear it caused
📖 The removal is stated plainly

## 🚫 Thou Shalt No More Drink It Again

This promise is stated twice in one short phrase for emphasis, no more and again.

The judgment described throughout this chapter is declared finished, not paused.

A promise this direct leaves no room for the punishment returning later.

This is the turning point the whole chapter has been building toward.

🚫 No more and again both stress finality
🏁 The judgment is declared finished, not paused
🔒 No room is left for it returning
📖 This is the chapter's turning point

## 🔄 I Will Put It Into The Hand Of Them That Afflict Thee

The same cup of fury now moves to a new set of hands.

Afflict thee names the very people who tormented Jerusalem during her judgment.

This is a direct reversal, the cup passes from victim to oppressor.

What Jerusalem drank, her tormentors are now told they will drink instead.

🍷 The same cup moves to new hands
👊 Afflict thee names Jerusalem's tormentors
🔄 This is a direct reversal of roles
📖 What she drank, they will drink instead

## 😔 Bow Down, That We May Go Over

This records the exact command Jerusalem's tormentors spoke over her.

Bow down meant lying flat, low enough for someone else to walk across.

Go over pictures a conqueror physically walking over the defeated body.

Recording their exact words preserves how personal and public this cruelty was.

😔 Bow down meant lying flat on the ground
🥾 Go over pictures walking over someone
🗣️ These are the tormentors' exact recorded words
📖 The cruelty was personal and public

## 🛣️ Thou Hast Laid Thy Body As The Ground, And As The Street

This describes Jerusalem's body treated as ground to be walked on, not a person.

As the street repeats the same idea with a second picture, a public road everyone crosses.

This humiliation is named plainly so the promised reversal feels earned.

The chapter closes with that reversal already declared two lines earlier.

🛣️ Her body was treated like the ground
🚶 As the street repeats the same picture
😔 This humiliation is named plainly
📖 The reversal was already declared moments earlier`.trim();

export const ISAIAH_FIFTY_ONE_PERSONAL_SECTIONS = parseIsaiahFiftyOneRawNotes(ISAIAH_FIFTY_ONE_RAW_NOTES);
