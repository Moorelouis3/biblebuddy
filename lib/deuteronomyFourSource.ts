export type DeuteronomyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDeuteronomyFourRawNotes(rawText: string): DeuteronomyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DeuteronomyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Deuteronomy\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Deuteronomy 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Deuteronomy\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Deuteronomy\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Deuteronomy 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Deuteronomy 4:${startVerse}` : `Deuteronomy 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Deuteronomy 4 sections, received " + sections.length);
  }

  return sections;
}

const DEUTERONOMY_FOUR_RAW_NOTES = `# Deuteronomy 4:1-8
# 📜 Statutes That Make Israel Wise In The Eyes Of Nations
---
## 👂 Hearken, O Israel, Unto The Statutes And Unto The Judgments

Hearken means listen and obey, not just hear the words.

Statutes were the fixed rules God set for Israel to follow.

Judgments were rulings that came from applying those rules to real cases.

Moses is not offering advice here, he is relaying a command.

👂 Hearken means listen and obey

📏 Statutes were God's fixed rules

⚖️ Judgments applied rules to real cases

📖 Moses relays God's command directly

## 🌿 That Ye May Live, And Go In And Possess The Land

This verse ties obedience to two clear outcomes.

Live means to enjoy a full life under God's blessing.

Possess means take real ownership of the promised land.

That land was already promised to Abraham generations earlier.

Obedience did not earn the promise.

Obedience was how Israel would live inside it.

🌿 Live means a full blessed life

🗺️ Possess means real ownership of the land

📜 The land was promised to Abraham long ago

📖 Israel would enjoy what God already gave

## ➕ Ye Shall Not Add Unto The Word, Neither Shall Ye Diminish Ought From It

Add means putting something extra into God's law that He did not give.

Diminish means quietly cutting something out of it.

This command protects the law from being reshaped by human preference.

Ought is an old word meaning anything at all.

This same warning returns near the very end of the Bible.

Revelation 22 repeats it almost word for word.

➕ Add means putting something extra in

➖ Diminish means quietly cutting something out

🔒 This command protects the law from change

📖 Revelation 22 repeats this same warning

## 👹 Your Eyes Have Seen What The LORD Did Because Of Baalpeor

Baalpeor was a Moabite god worshiped through ritual feasts and sexual immorality.

Numbers twenty five records Israel joining themselves to this worship at Shittim.

A plague killed thousands before Phinehas stopped it by his own bold action.

Moses is not describing a story from long ago.

This exact crowd personally lived through that plague.

👹 Baalpeor was a Moabite god

📜 Numbers twenty five records this event

☠️ A plague killed thousands at Shittim

📖 This crowd personally lived through it

## 🤝 But Ye That Did Cleave Unto The LORD Your God Are Alive Every One Of You This Day

Cleave means to hold tightly and refuse to let go.

Everyone who stayed loyal during Baalpeor is still alive today.

That survival is not a coincidence.

It is the very point Moses wants Israel to see.

Loyalty was the difference between the dead at Shittim and the living here.

🤝 Cleave means hold on tightly

✅ Loyal ones survived the Baalpeor crisis

🎯 Their survival was the whole point

📖 Loyalty separated the dead from the living

## 👁️ This Is Your Wisdom And Your Understanding In The Sight Of The Nations

Israel's obedience to this law was meant to be visible to outside nations.

Wisdom and understanding here describe a reputation, not just private knowledge.

Watching nations were expected to notice something different about how Israel lived.

Israel's holiness was never meant to be a private matter.

👁️ Israel's law was meant to be visible

🧠 Wisdom and understanding describe reputation here

🌍 Outside nations were expected to notice

📖 Holiness was never meant to stay private

## 🗣️ Surely This Great Nation Is A Wise And Understanding People

This is the reaction Moses expects from other nations.

He is quoting the exact words he expects them to say.

A former slave nation was meant to earn this kind of respect.

Respect would come through the law alone, not through armies or wealth.

🗣️ Moses quotes their expected reaction

👑 A former slave nation gains respect

⚖️ The law itself earns that respect

📖 Not armies or wealth, the law alone

## 📏 What Nation Is There So Great, Who Hath God So Nigh Unto Them

Nigh is an old word meaning near or close by.

Many other ancient nations believed their gods lived far away in the sky.

Israel's God spoke to them directly.

He even traveled with them inside a cloud.

That kind of nearness had no equal among the nations.

📏 Nigh means near or close by

☁️ Other gods were believed distant

🗣️ Israel's God spoke directly to them

📖 No other nation had access like this

## ⚖️ Statutes And Judgments So Righteous As All This Law

Righteous means fair and just.

The law was good for the people it governed.

Other ancient law codes existed.

None of them claimed this same divine origin.

Moses is comparing Israel's whole legal system to every other nation's law.

He is not just praising Israel here.

⚖️ Righteous means fair and just

👥 The law served the people it governed

📜 Other law codes existed elsewhere

📖 None claimed this same divine origin

# Deuteronomy 4:9-14
# 🔥 The Day At Horeb
---
## 👀 Take Heed To Thyself, And Keep Thy Soul Diligently

Take heed means pay close attention and stay alert.

Diligently means with ongoing careful effort, not just once.

Moses is warning against a slow, quiet kind of forgetting.

Memory of God's power fades fast once daily life resumes.

👀 Take heed means pay close attention

🔁 Diligently means ongoing careful effort

🧠 Moses warns against slow forgetting

📖 Memory fades fast once life resumes

## 👁️ Lest Thou Forget The Things Which Thine Eyes Have Seen

The things Moses means are the plagues, the Red Sea, and the fire at Horeb.

Forgetting was a real danger for a whole generation, not just a few people.

The warning targets the eyes that personally witnessed these events.

Later generations would only hear about them secondhand.

👁️ These eyes saw plagues and the Red Sea

⚠️ Forgetting threatened the whole generation

🗣️ This generation witnessed it firsthand

📖 Later generations would only hear the story

## 👨‍👦 But Teach Them Thy Sons, And Thy Sons' Sons

God's plan for memory was never a private experience alone.

Each generation was responsible for teaching the next one directly.

Sons' sons means grandchildren, three generations named in one line.

A story stops living the moment nobody bothers to retell it.

👨‍👦 Teaching passed to sons and grandsons

🔗 Three generations named in one line

📚 Memory was every parent's job

📖 A story dies when nobody retells it

## ⛰️ The Day That Thou Stoodest Before The LORD Thy God In Horeb

Horeb is another name for Mount Sinai, used often in Deuteronomy.

This single day became the reference point Moses returns to again and again.

Standing before the LORD here means witnessing His presence directly.

It was not a quiet, private prayer.

⛰️ Horeb is another name for Sinai

📅 This day becomes Moses' key reference point

👣 Standing before God means direct witness

📖 It was not a private moment

## 🔥 Gather Me The People Together, And I Will Make Them Hear My Words

This records God's original instruction to Moses back at the burning bush season.

The goal was for the people to hear God's own words directly, not only through Moses.

That they may learn to fear me connects hearing directly to lasting reverence.

Fear here means deep respect and awe, not being afraid to approach God.

🔥 This recalls God's original instruction to Moses

👂 The people would hear God directly

🙏 Fear here means deep reverence

📖 Direct hearing was meant to last

## 🔥 The Mountain Burned With Fire Unto The Midst Of Heaven, With Darkness, Clouds, And Thick Darkness

This describes an overwhelming scene at the mountain.

Fire reached up toward the sky while thick darkness covered it at the same moment.

Fire and darkness together were not a contradiction in this culture.

Both were signs of God's holy and dangerous presence.

🔥 Fire reached toward the sky

🌑 Thick darkness covered the mountain too

⚡ Fire and darkness together signaled danger

📖 Both marked God's holy presence

## 📖 Ye Heard The Voice Of The Words, But Saw No Similitude

Similitude is an old word meaning a shape or form.

Israel heard God speak with real words they could understand.

They never saw a face, a body, or any physical form at all.

This detail becomes the whole argument against idol worship later in this chapter.

📜 Similitude means a shape or form

👂 Israel heard real words at Horeb

🚫 No face or body was seen

➡️ This detail argues against idols later

## ✍️ He Wrote Them Upon Two Tables Of Stone

The ten commandments were written personally by God, not dictated to Moses to write down.

Two tables likely means two copies, matching the treaty format of that era.

Ancient treaties commonly kept one copy for each party involved.

Stone made the commandments permanent, unlike words that could be forgotten or changed.

✍️ God wrote the commandments Himself

📜 Two tables likely means two copies

🤝 That matched treaty customs of the time

📖 Stone made the words permanent

# Deuteronomy 4:15-20
# 🚫 No Graven Image
---
## 🔁 Take Ye Therefore Good Heed Unto Yourselves

Moses repeats take heed a second time in this short chapter.

Repetition in Hebrew writing was a way to mark real urgency.

The reason follows immediately, no similitude was seen at Horeb.

That missing shape becomes the reason no image should ever be made.

🔁 Take heed repeats a second time

📢 Repetition marked real urgency

👁️ No shape was seen at Horeb

📖 That absence becomes the reason for the ban

## 💔 Lest Ye Corrupt Yourselves, And Make You A Graven Image

Corrupt here means to twist worship into something broken and false.

A graven image is an idol carved or shaped by human hands.

Israel had just watched Egypt worship exactly this kind of object.

Making one would trade the God who spoke to them for a lifeless copy.

💔 Corrupt means twisted false worship

🪓 Graven image means a carved idol

🇪🇬 Egypt worshiped objects like this

📖 A carved copy would replace a living God

## 🧍 The Likeness Of Male Or Female

This bans any image shaped like a human being, man or woman.

Many ancient religions pictured their gods with human bodies and human faces.

Israel's God refused that kind of representation entirely.

He revealed His words, never His shape.

🧍 This bans any human shaped image

🏛️ Other religions used human shaped gods

🚫 Israel's God refused this entirely

📖 Words were given, never a shape

## 🐄 The Likeness Of Any Beast, The Likeness Of Any Winged Fowl That Flieth In The Air

Beast means any land animal, wild or tame.

Winged fowl means any bird able to fly.

Egypt worshiped gods pictured with animal heads, like a falcon or a jackal.

This command rules out that entire category of worship at once.

🐄 Beast means any land animal

🦅 Winged fowl means any flying bird

🇪🇬 Egypt pictured gods with animal heads

📖 This ruled out that whole category

## 🦎 Any Thing That Creepeth On The Ground, The Likeness Of Any Fish

Creepeth describes small animals that move low along the ground.

Fish covers anything living underwater.

Together these verses cover land, sky, ground, and sea.

Every direction a person could look is covered.

🦎 Creepeth means small ground animals

🐟 Fish covers anything underwater

🧭 Every direction gets covered here

📖 Nothing in creation was safe to worship

## ☀️ Lest Thou Lift Up Thine Eyes Unto Heaven, Shouldest Be Driven To Worship Them

This moves from carved images to the sun, moon, and stars themselves.

Many surrounding nations worshiped these exact objects as gods.

Driven suggests a real pull, not a casual choice made on a whim.

Israel is warned that even beautiful, natural things can quietly replace God.

☀️ This warns against worshiping sun and stars

🌙 Neighboring nations worshiped these objects

🧲 Driven suggests a real pull toward it

📖 Beautiful things can still replace God

## ❓ Which The LORD Thy God Hath Divided Unto All Nations Under The Whole Heaven

This line is easy to misread.

It can sound like God assigning nations to worship the stars.

It more likely describes something simpler.

Sun, moon, and stars were given to everyone as light and season markers.

Israel alone was chosen to worship the maker, not the things He made.

❓ This line is easy to misread

🌞 Stars were given as light and season markers

👥 They were given to every nation

📖 Israel worships the maker, not the lights

## 🔥 The LORD Hath Taken You, And Brought You Forth Out Of The Iron Furnace, Even Out Of Egypt

Iron furnace is a picture for Egypt's brutal slave labor.

Furnaces reached extreme heat and were used to smelt and purify metal.

Egypt is described the same way, a place of harsh refining suffering.

God did not just rescue Israel, He pulled them out of that heat completely.

🔥 Iron furnace pictures Egypt's slavery

⚒️ Furnaces reached extreme refining heat

🇪🇬 Egypt is described the same way

📖 God pulled Israel completely out

## 💎 To Be Unto Him A People Of Inheritance, As Ye Are This Day

Inheritance describes something valuable that is kept and passed down.

Israel is not just rescued property, they are called God's own treasured possession.

As ye are this day reminds the listeners that this identity is already true for them.

The rescue from Egypt was the beginning of that relationship, not the end of it.

💎 Inheritance means something valuable kept

🏡 Israel became God's own treasured people

📅 This identity was already true for them

📖 Egypt's rescue began the relationship

# Deuteronomy 4:21-24
# ⛔ Moses Barred, A Consuming Fire
---
## 🔁 The LORD Was Angry With Me For Your Sakes

This repeats an event first mentioned back in chapter three.

For your sakes ties Moses' punishment to Israel's earlier rebellion.

That rebellion happened at the water of Meribah in Numbers twenty.

Moses carries a consequence tangled up with the people around him.

🔁 This repeats chapter three's account

💧 The rebellion happened at Meribah's water

📜 Numbers twenty records that event

📖 Moses' punishment was tangled with Israel's sin

## 🤝 That I Should Not Go Over Jordan, Which The LORD Thy God Giveth Thee For An Inheritance

God sware here means God made a binding, unchangeable oath.

Moses would lead Israel to the border but never actually cross it.

The land itself is still called Israel's inheritance, a gift already promised.

Moses' exclusion does not cancel Israel's own promise at all.

🤝 Sware means a binding unchangeable oath

🚧 Moses would lead but never cross

🎁 The land stayed Israel's promised inheritance

📖 Moses' loss did not cancel Israel's gift

## 😔 I Must Die In This Land, I Must Not Go Over Jordan

Moses states his own coming death plainly, without self pity.

He repeats the same restriction twice in one sentence for emphasis.

This land refers to the plains of Moab, east of the Jordan River.

Moses will lead Israel to the edge of the promise and stop there.

😔 Moses states his death plainly

🔁 The restriction repeats twice for emphasis

🗺️ This land means the plains of Moab

📖 Moses leads Israel right to the edge

## ⚖️ But Ye Shall Go Over, And Possess That Good Land

The contrast lands hard right after Moses' own restriction.

Moses' loss and Israel's gain sit side by side.

This is not bitterness.

It reads like a father's blessing despite his own disappointment.

⚖️ The contrast lands right after Moses' loss

👨‍👧 Loss and gain sit side by side

❤️ This reads like a blessing not bitterness

📖 A father blesses past his own disappointment

## 🔁 Take Heed Unto Yourselves, Lest Ye Forget The Covenant Of The LORD Your God

Take heed appears for a third time in this one chapter.

Covenant means the binding agreement made at Horeb.

Forgetting it was treated as a real ongoing danger.

This was not a small mistake to overlook.

🔁 Take heed appears a third time

🤝 Covenant means the agreement made at Horeb

⚠️ Forgetting was treated as a real danger

📖 This was never a small mistake

## 🔥 For The LORD Thy God Is A Consuming Fire, Even A Jealous God

Consuming fire pictures a fire that burns completely.

This same image already appeared earlier at Horeb.

Jealous here does not mean petty or insecure.

It means God refuses to share worship with anything else.

A faithful spouse will not share a marriage either.

🔥 Consuming fire burns completely

⛰️ This image already appeared at Horeb

💍 Jealous here means faithful, not petty

📖 God refuses to share worship with anything

# Deuteronomy 4:25-31
# 🌍 Scattered, Then Found Again
---
## 👶 When Thou Shalt Beget Children, And Children's Children

Moses looks generations ahead, past this crowd entirely.

Beget means to father or bring children into the world.

This warning is not about the current generation's temptation alone.

It targets a comfort that only builds up after settling for a long time.

👶 Beget means to father children

⏳ Moses looks many generations ahead

🏡 The danger grows after long settling

📖 Comfort over time breeds forgetfulness

## 🏘️ Shall Have Remained Long In The Land, And Shall Corrupt Yourselves

Long comfortable settling is named as the real danger here, not sudden crisis.

Corrupt repeats the same word already used back in verse sixteen.

The warning circles back to the exact idol making sin already forbidden.

Time and comfort make old warnings easy to forget.

🏘️ Long settling is named as the danger

🔁 Corrupt repeats the word from verse sixteen

🪓 The warning circles back to idol making

📖 Comfort makes old warnings easy to forget

## ⚖️ I Call Heaven And Earth To Witness Against You This Day

Calling heaven and earth as witnesses was a legal formula used in ancient covenant treaties.

Unlike human witnesses, heaven and earth would outlast everyone standing there that day.

This phrase makes the warning function like a signed legal document, not just a speech.

⚖️ This was a legal witness formula

🌍 Heaven and earth outlast every generation

📜 It works like a signed legal document

📖 The warning was made to last

## 💀 Ye Shall Soon Utterly Perish From Off The Land

Utterly perish is a strong total phrase.

This is the harshest warning given so far in the book.

Whereunto ye go over Jordan points to the land still ahead.

This warning applies before Israel has even crossed in.

💀 Utterly perish means total loss

📢 This is the harshest warning yet

🗺️ It points to land not yet reached

📖 The warning comes before the crossing

## 🌪️ The LORD Shall Scatter You Among The Nations

Scatter means forcing a people out of their own land into exile.

This warning comes true centuries later in both the Assyrian and Babylonian exiles.

Being left few in number reverses the growth promised back in Genesis.

The very blessing of multiplying could be undone by disobedience.

🌪️ Scatter means forced exile

📜 Assyria and Babylon later fulfill this

📉 Few in number reverses Genesis' promise

📖 Blessing can be undone by disobedience

## 🪵 There Ye Shall Serve Gods, The Work Of Men's Hands, Wood And Stone

This describes exile's cruelest irony, worshiping gods that people carve out of dead material.

Wood and stone cannot move, decide, or act on their own.

Verse twenty eight lists exactly what these gods cannot do, see, hear, eat, or smell.

The freed slaves would end up serving handmade objects instead of the living God.

🪵 Wood and stone made these gods

🚫 These gods cannot see or hear

😢 Freed slaves would serve dead objects

📖 That is exile's cruelest irony

## 📍 If From Thence Thou Shalt Seek The LORD Thy God, Thou Shalt Find Him

Thence means from that place, even from inside exile itself.

The promise of finding God survives even after total judgment.

Seeking with all thy heart and all thy soul rules out a half hearted search.

This is not a new god being offered.

It is the same one who never actually left.

📍 Thence means from that very place

🔎 Seeking must be whole hearted

🌟 God can still be found in exile

📖 It is the same God still there

## 😣 When Thou Art In Tribulation, In The Latter Days

Tribulation means deep painful trouble.

Latter days points to a future time, not the end of the world.

Turning back to God stays possible even after exile.

Obedient here means actually returning, not simply feeling sorry.

😣 Tribulation means deep painful trouble

🔮 Latter days points to a future time

🔄 Turning back stays possible after exile

📖 Return means action, not just feeling sorry

## ❤️ For The LORD Thy God Is A Merciful God, He Will Not Forsake Thee

Merciful here means God stays committed even after being betrayed.

Forsake means to abandon completely.

This verse promises God will not do that, no matter how badly Israel has failed.

The covenant made with Abraham, Isaac, and Jacob still holds even generations later.

❤️ Merciful means committed despite betrayal

🚫 Forsake means to abandon completely

🤝 God will not abandon Israel

📖 The old covenant still holds later

# Deuteronomy 4:32-40
# 🌌 Ask Now Of The Days That Are Past
---
## 🔍 Ask Now Of The Days That Are Past, Which Were Before Thee

Moses invites Israel to search all of human history for a comparison.

This is not a rhetorical shrug, it is a real historical challenge.

Since the day that God created man sets the search back to the very beginning.

No limit is placed on how far back Israel is allowed to look.

🔍 Moses invites a real historical search

📅 The search starts at creation itself

❓ This is a genuine challenge, not a shrug

📖 No time limit is placed on it

## 🌍 Ask From The One Side Of Heaven Unto The Other

This phrase means the search should stretch to the whole earth, not just nearby nations.

One side of heaven to the other is an ancient way of saying everywhere under the sky.

The challenge covers every era and every place at once.

🌍 This means searching the whole earth

🗺️ Heaven to heaven means everywhere under the sky

⏳ The challenge spans every era too

📖 Nothing anywhere compares to this

## 🔥 Did Ever People Hear The Voice Of God Speaking Out Of The Midst Of The Fire

This asks whether any other nation has heard God speak and survived it.

Ancient people commonly believed seeing or hearing a god directly would kill a person.

Israel did exactly that at Horeb and lived to tell the story.

That survival alone makes Israel's experience unmatched anywhere else.

🔥 This asks who else heard God speak

☠️ Ancient people expected that to be fatal

✅ Israel heard God and survived it

📖 That survival makes the story unmatched

## 📜 Hath God Assayed To Go And Take Him A Nation From The Midst Of Another Nation

Assayed means attempted or tried.

This describes the whole exodus event in one legal sounding question.

No other god had ever reached into a nation like this.

None had ever pulled a whole people out from inside it.

📜 Assayed means attempted or tried

⚖️ This describes the exodus as a legal question

🚫 No other god had ever done this

➡️ Israel's rescue stands entirely alone

## 📝 By Temptations, By Signs, And By Wonders, And By War

This lists the exact methods God used to bring Israel out of Egypt.

Temptations here means tests, not enticements to sin.

Signs and wonders describe the ten plagues and the miracles at the Red Sea.

War refers to Egypt's defeated army at the Red Sea crossing.

📝 This lists God's exact methods

🧪 Temptations here means tests not enticements

⚡ Signs and wonders means the plagues

📖 Every method proved God's power

## 💪 By A Mighty Hand, And By A Stretched Out Arm, And By Great Terrors

Mighty hand and stretched out arm are common phrases for God's raw power in the Old Testament.

Great terrors likely points to the plagues themselves as national scale disasters.

These phrases will repeat again and again throughout the rest of Deuteronomy.

They function almost like a title for the whole exodus story.

💪 Mighty hand pictures raw divine power

😱 Great terrors points to the plagues

🔁 These phrases repeat throughout Deuteronomy

📖 They work like a title for the exodus

## 📜 Unto Thee It Was Shewed, That Thou Mightest Know That The LORD He Is God

Shewed is an old spelling of showed.

Everything Israel witnessed had one clear purpose, teaching them who God really is.

There is none else beside him rules out every other god as a real option.

This is the clearest single statement of monotheism in the whole chapter.

📜 Shewed is an old spelling of showed

🎯 Everything witnessed had one clear purpose

🚫 No other god was ever real

📖 This is the clearest statement of monotheism yet

## 🎯 There Is None Else Beside Him

This four word phrase closes the chapter's central argument.

None else means no other real god exists anywhere.

Every idol described earlier in the chapter gets ruled out by this one line.

The whole exodus story becomes proof for this single claim.

🎯 This phrase closes the whole argument

🚫 None else means no other god exists

🪓 Every idol gets ruled out here

📖 The exodus becomes proof for this claim

## ☁️ Out Of Heaven He Made Thee To Hear His Voice

This verse pairs two senses of revelation, heaven above and earth below.

God's voice came down from heaven while fire burned visibly on the ground.

Together they describe a single event experienced with both sound and sight.

Nothing about this revelation stayed hidden or symbolic only.

☁️ Heaven and earth both revealed God

🔊 His voice came down from above

🔥 His fire burned visibly on the ground

📖 Nothing about it stayed hidden

## ❤️ Because He Loved Thy Fathers, Therefore He Chose Their Seed After Them

This verse names love as the actual reason behind Israel's election.

Thy fathers means Abraham, Isaac, and Jacob specifically.

Seed after them means their descendants, the very crowd hearing this speech.

The exodus was not random.

It flowed directly out of a promise made to those three men.

❤️ Love is named as the real reason

👨‍👨‍👦 Fathers means Abraham Isaac and Jacob

👶 Seed after them means their descendants

📖 The exodus flowed from an old promise

## ⚔️ To Drive Out Nations From Before Thee Greater And Mightier Than Thou Art

This names the next task waiting on the other side of the Jordan.

Greater and mightier admits plainly that Israel is not the stronger army.

The conquest was never going to depend on Israel's own military strength.

It depended on the same power already shown back in Egypt.

⚔️ This names the coming conquest task

📏 Israel admits it is not the stronger army

💪 Victory would not depend on Israel's strength

📖 It depended on the same power from Egypt

## 🧠 Know Therefore This Day, And Consider It In Thine Heart, That The LORD He Is God

Know and consider describe two different actions, one mental and one deliberate.

This is the third time this chapter states there is none else.

Repetition this many times signals the single most important idea in the whole speech.

Heaven above and earth beneath again covers all of creation at once.

🧠 Know and consider are two different actions

🔁 This is the third time stated

📢 Repetition marks the speech's most important idea

📖 Heaven and earth again cover everything

## ⚖️ Thou Shalt Keep Therefore His Statutes, And His Commandments

This verse ties the whole chapter's argument back to a practical command, keep the law.

Go well with thee describes a real, lived blessing, not just a spiritual feeling.

With thy children after thee extends that same blessing forward another generation.

The chapter that began with hearken ends by asking for the same obedience again.

⚖️ This ties the chapter to a command

🌿 Go well describes a real lived blessing

👨‍👦 The blessing extends to the next generation

📖 The chapter ends where it began, obedience

# Deuteronomy 4:41-43
# 🏙️ Three Cities Of Refuge
---
## 🏙️ Then Moses Severed Three Cities On This Side Jordan

Severed here means set apart for a specific, protected purpose.

This side Jordan means the eastern side, the land already conquered.

These three cities exist purely to save a certain kind of person's life.

The full system of six cities is not finished until Israel crosses into Canaan.

🏙️ Severed means set apart for a purpose

🗺️ This side Jordan means the eastern land

🛡️ These cities protected a certain person's life

📖 Three more cities come later in Canaan

## 🔪 That The Slayer Might Flee Thither, Which Should Kill His Neighbour Unawares

Slayer means someone who has killed another person.

Unawares means without meaning to, a true accident.

These cities protected accidental killers from immediate revenge by the victim's family.

The word thither is an old way of saying to that place.

🔪 Slayer means someone who killed another

❓ Unawares means without meaning to

🏃 These cities protected accidental killers

📖 Thither is an old word for there

## ⚖️ And Hated Him Not In Times Past

This phrase draws a clear legal line between accident and old grudge.

A killer with no prior hatred toward the victim could flee here safely.

Someone with a known history of hatred would not qualify for this protection.

The law was already sorting motive carefully, long before modern courts existed.

⚖️ This draws a line between accident and hatred

✅ No prior hatred meant safety here

🚫 Known hatred disqualified someone from refuge

📖 Motive mattered to this ancient law

## 🏜️ Namely, Bezer In The Wilderness, Ramoth In Gilead, And Golan In Bashan

Bezer sat in the wilderness, on the flat plain given to Reuben's tribe.

Ramoth sat in Gilead, the hill country given to Gad's tribe.

Golan sat in Bashan, the northern land given to half of Manasseh's tribe.

Each city sat inside the territory of the tribe responsible for its protection.

🏜️ Bezer sat in Reuben's flat plain

⛰️ Ramoth sat in Gad's hill country

🌾 Golan sat in Manasseh's northern land

📖 Each tribe guarded its own city

# Deuteronomy 4:44-49
# 📍 Where Moses Stood To Say All This
---
## 📋 This Is The Law Which Moses Set Before The Children Of Israel

This line works like a heading, marking a new major section of the book.

Everything from chapter five onward falls under this one label, the law.

Set before means formally presented, the way a document gets laid out for signing.

Deuteronomy means second law, starting here.

📋 This line works like a heading

📜 Chapters five onward fall under this label

🖋️ Set before means formally presented

📖 Deuteronomy means second law, starting here

## 🔤 These Are The Testimonies, And The Statutes, And The Judgments

Three words describe three layers of the same law.

Testimonies means the terms of the covenant relationship.

Statutes means fixed rules that do not change.

Judgments means rulings applied to specific real situations.

🔤 Three words three layers of one law

🤝 Testimonies means the covenant's terms

📏 Statutes means fixed unchanging rules

📖 Judgments means rulings for real situations

## 📍 After They Came Forth Out Of Egypt

This short phrase anchors the speech to one moment.

Moses assumes a shared recent memory of leaving Egypt.

The exodus was not distant history for this crowd.

It happened within their own lifetime.

📍 This anchors the speech to one moment

🧠 Moses assumes shared recent memory

⏳ The exodus was recent, not distant

📖 It happened in this crowd's own lifetime

## 📍 In The Valley Over Against Bethpeor, In The Land Of Sihon King Of The Amorites

Bethpeor names the exact location where Israel is camped for this entire speech.

This same valley was the scene of the Baalpeor crisis back in Numbers twenty five.

Sihon's land was the first kingdom Israel defeated, described back in chapter two.

Moses is speaking from ground already soaked in both failure and victory.

📍 Bethpeor names the exact camp location

📜 This valley saw the Baalpeor crisis too

👑 Sihon's land was Israel's first victory

📖 This ground holds both failure and victory

## 🏰 Who Dwelt At Heshbon, Whom Moses And The Children Of Israel Smote

Heshbon was Sihon's capital city, already described in detail back in chapter two.

Smote means struck down and defeated in battle.

This verse briefly recaps a victory the audience already heard about in full.

Moses builds his case on real, recent history, not vague promises.

🏰 Heshbon was Sihon's capital city

⚔️ Smote means struck down in battle

🔁 This recaps chapter two's victory

📖 Moses builds his case on real history

## 📜 They Possessed His Land, And The Land Of Og King Of Bashan, Two Kings Of The Amorites

This verse summarizes both victories from chapters two and three in a single line.

Two kings falling within one campaign covered the entire east side of the Jordan.

Sihon and Og together become the proof behind everything Moses has argued in this chapter.

📜 This summarizes chapters two and three

🗺️ Two kings covered the whole east side

👑 Sihon and Og became living proof

📖 Their defeat backs everything Moses argued

## 📍 From Aroer, Even Unto Mount Sion, Which Is Hermon

Aroer marked the southern edge, on the river Arnon.

Mount Sion here is another name for Mount Hermon.

It is not the Jerusalem hill sharing the same name.

Chapter three already gave two other names for this same mountain.

The borders run from a southern river to a northern mountain.

📍 Aroer marked the southern border

🏔️ Sion here means Hermon not Jerusalem

🔁 Chapter three already named this mountain twice

📖 The land ran from river to mountain

## 🗺️ All The Plain On This Side Jordan Eastward, Under The Springs Of Pisgah

This verse finishes marking the eastern borders.

Pisgah is the same ridge Moses will soon climb.

The chapter opened with a command to obey.

It closes on the very ground that obedience already won.

Chapter five now begins repeating and expanding everything taught so far.

🗺️ This finishes marking the eastern borders

⛰️ Pisgah is the ridge Moses climbs next

🔁 The chapter opened with obedience, closes with land

📖 Chapter five expands everything taught here
`.trim();

export const DEUTERONOMY_FOUR_PERSONAL_SECTIONS = parseDeuteronomyFourRawNotes(DEUTERONOMY_FOUR_RAW_NOTES);
