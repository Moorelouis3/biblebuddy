export type RevelationThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseRevelationThirteenRawNotes(rawText: string): RevelationThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: RevelationThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Revelation\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Revelation 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Revelation\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+Revelation\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Revelation 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Revelation 13:${startVerse}` : `Revelation 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Revelation 13 sections, received " + sections.length);
  }

  return sections;
}

const REVELATION_THIRTEEN_RAW_NOTES = `# Revelation 13:1-4
# 🐆 A Beast Rises From The Sea
---
## 🌊 A Beast Rise Up Out Of The Sea

The sea pictures chaos and the restless nations in this kind of writing.

A beast rising from the sea pictures a kingdom built on raw human power.

Daniel already saw this same picture in a vision years earlier.

There four beasts rose out of the sea to picture four world empires.

John now sees one beast that gathers up all of their worst features.

This beast pictures every government that sets itself directly against God.

🌊 The sea pictures chaotic nations

🐲 A beast pictures a world empire

📜 Daniel already pictured four empires

➡️ This beast opposes God directly

---

## 👑 Seven Heads And Ten Horns

This beast borrows its appearance directly from the dragon in the previous chapter.

Seven heads in Revelation often picture complete and total power.

Ten horns picture great strength spread across many smaller kings.

The ten crowns add a claim to rule over others.

This beast is not a brand new threat invented from nothing.

It is Satan's own power now wearing an earthly face.

👑 Seven heads picture total power

💪 Ten horns picture great strength

🗡️ Crowns claim a right to rule

➡️ Satan wears an earthly face here

---

## 🗣️ Upon His Heads The Name Of Blasphemy

Blasphemy means speaking or claiming something that belongs to God alone.

This beast does not oppose God quietly from a distance.

It openly claims titles and honor that only God deserves.

Ancient Roman emperors sometimes demanded worship and divine titles for themselves.

This beast repeats that same old claim on a far larger scale.

Naming blasphemy on its head reveals who this power really is from the start.

🗣️ Blasphemy means claiming what is God's

👑 The beast claims divine titles

🏛️ Roman emperors once claimed this too

📖 The name reveals this beast's true nature

---

## 🦁 Like Unto A Leopard, And His Feet Were As The Feet Of A Bear, And His Mouth As The Mouth Of A Lion

Daniel's vision centuries earlier pictured four separate empires as four different beasts.

One beast was like a lion.

Another was like a bear.

A third was like a leopard.

Those three pictured Babylon, Medo Persia, and Greece in that order.

John's beast fuses all three animals into one single creature.

This pictures one final empire inheriting every trait of the empires before it.

🦁 Lion once pictured Babylon's empire

🐻 Bear once pictured Medo Persia

🐆 Leopard once pictured Greece's empire

➡️ This beast inherits every trait before it

---

## 🐉 The Dragon Gave Him His Power, And His Seat, And Great Authority

The dragon here is Satan, already named plainly in chapter twelve.

A seat here means a throne of real ruling authority.

Satan cannot create real power of his own from nothing.

He can only hand over authority he has already taken for himself.

This beast's entire kingdom is borrowed power.

It was never earned power.

Every empire that opposes God ultimately answers to the same source behind it.

🐉 The dragon is Satan from chapter twelve

🪑 Seat means a ruling throne

🎭 Satan only hands over stolen power

➡️ One source stands behind every opposing empire

---

## 💀 Wounded To Death, And His Deadly Wound Was Healed

This wound and its healing copy something real that already happened in the story.

Jesus himself was wounded to death.

He then rose again to life.

This beast copies that same shape as a counterfeit resurrection.

Many scholars believe this pictures an empire that looked finished, then rose again in a new form.

Satan cannot create real resurrection life.

He can only imitate the shape of it to deceive the world.

💀 This wound mimics Christ's own death

🔁 The healing mimics a resurrection

🎭 It is a counterfeit, not the real thing

➡️ Satan can imitate life but not create it

---

## 😲 All The World Wondered After The Beast

Wondered here means being amazed into following.

It is not simple curiosity.

The world does not just notice this beast and move on.

It becomes genuinely impressed and begins to follow after him.

A convincing counterfeit resurrection is enough to draw real worship.

People do not always need truth to be won over.

A good enough performance of power can win a crowd on its own.

😲 Wondered means amazed into following

🌍 The whole world follows the beast

🎭 A convincing counterfeit still deceives

➡️ Performance alone can win real worship

---

## 🎶 Who Is Like Unto The Beast? Who Is Able To Make War With Him?

This question copies the shape of real praise songs written for God alone.

Exodus once asked, "who is like unto thee, O LORD," in worship of God's power.

Here the same kind of question gets aimed at the beast instead.

The world does not only obey this beast out of fear.

It genuinely admires him, almost like worship.

Imitation praise is still a counterfeit, even when it feels sincere.

🎶 This mimics a real praise song

📜 Exodus asked this question about God first

😲 The world now asks it about the beast

➡️ Counterfeit praise still mimics real worship

# Revelation 13:5-10
# 🗣️ The Beast's Reign Of Blasphemy
---
## 🗣️ A Mouth Speaking Great Things And Blasphemies

A mouth here pictures speech and public claims, not a literal detail about size.

"Great things" means boastful, grand claims about his own greatness.

Blasphemy again means claiming honor and worship that belongs only to God.

This beast does not stay quiet about his ambitions.

He speaks constantly, shaping how people think about who deserves worship.

Loud, confident claims are often how deception spreads fastest.

🗣️ A mouth pictures public speech

😤 Great things means boastful claims

👑 Blasphemy claims honor only God deserves

➡️ Loud claims spread deception quickly

---

## ⏳ Power Was Given Him To Continue Forty And Two Months

Forty two months equals three and a half years.

This same length of time already appeared in chapter twelve as twelve hundred and sixty days.

John keeps returning to this exact span throughout the book.

The number pictures a limited, appointed season, not an endless reign.

This beast's power looks enormous.

It was never permanent.

God had already placed a ceiling on it before it even began.

🔢 Forty two months equals 3.5 years

🔁 This matches chapter twelve's timing

⏳ The number pictures a limited reign

➡️ God set this ceiling in advance

---

## ⛺ To Blaspheme His Name, And His Tabernacle, And Them That Dwell In Heaven

God's name stands for his whole character and reputation.

The tabernacle was Israel's ancient tent of worship, where God's presence dwelled among his people.

Here it pictures God's dwelling place among his people more broadly.

Them that dwell in heaven points to the angels and the saints already gathered there.

This beast attacks every direction God's presence can be found at once.

His target is not one person.

It is God himself, his people, and his whole household.

🏷️ God's name means his whole character

⛺ Tabernacle was God's dwelling among his people

👼 Heaven's dwellers are angels and saints

➡️ The beast attacks God's presence everywhere

---

## ⚔️ Power Was Given Unto Him To Make War With The Saints, And To Overcome Them

Saints here means ordinary believers, not an elite or specially holy class.

War means real persecution here, not a spiritual metaphor only.

Overcome means this beast wins actual battles against believers on earth.

This is a hard truth the book does not soften.

Faithful believers can lose their earthly lives to this beast's power.

Losing that fight on earth is not the same as losing in the end.

🙏 Saints means ordinary believers

⚔️ War means real persecution

💀 Overcome means real earthly loss

➡️ Earthly loss is not the final word

---

## 🌍 Power Was Given Him Over All Kindreds, And Tongues, And Nations

Kindreds means family and ethnic groups, people grouped by ancestry.

Tongues means languages, grouping people by what they speak.

Nations means political and territorial groups, countries and kingdoms.

Together these three cover every possible way people are divided.

This beast's authority was permitted to reach every corner of the world.

No group is naturally safe from his reach just because of who they are.

👪 Kindreds means ethnic family groups

🗣️ Tongues means different languages

🌍 Nations means political kingdoms

➡️ His reach covers every kind of division

---

## 📖 All That Dwell Upon The Earth Shall Worship Him, Whose Names Are Not Written In The Book Of Life

The book of life lists everyone who truly belongs to God.

Not everyone who worships this beast set out to reject God on purpose.

Many simply follow whatever the majority around them is doing.

This verse separates two groups by one test, whose name is written in that book.

Worship of the beast reveals a missing name.

It does not cause the name to be missing.

The Lamb was described as slain from the foundation of the world, planned before sin ever happened.

📖 The book of life lists God's own

😶 Not everyone rejects God on purpose

🐑 The Lamb was planned before creation

➡️ Worship reveals a missing name

---

## 👂 If Any Man Have An Ear, Let Him Hear

This exact phrase echoes something Jesus said often in the Gospels.

It signals that a careful listener needs to pay close attention right now.

Having physical ears was never really the point.

The real question is whether a person is actually willing to listen and respond.

John pauses the vision here on purpose, like a tap on the reader's shoulder.

This moment asks for real attention before the chapter turns to judgment.

👂 This phrase echoes Jesus's own words

🎯 It calls for careful attention

🤔 Physical ears were never the real point

➡️ It calls for real listening and response

---

## ⚖️ He That Killeth With The Sword Must Be Killed With The Sword. Here Is The Patience And The Faith Of The Saints

This line promises that violence used against believers will eventually be repaid.

It is not a command for believers to fight back themselves.

It is a promise about how God will ultimately judge the persecutors.

Patience here means enduring hardship without giving up hope.

Faith here means trusting God's promise even as the suffering is still happening.

Saints can endure now because the ending has already been decided.

⚖️ Violence will be repaid by God

🚫 This is not a call to fight back

⏳ Patience means enduring without giving up

📖 Faith trusts an ending already decided

# Revelation 13:11-15
# 🐑 A Second Beast From The Earth
---
## 🌍 Another Beast Coming Up Out Of The Earth

This second beast comes from the earth, not the sea like the first one.

Many scholars connect the sea beast to political power.

They connect this earth beast to religious or persuading power.

Together the two beasts work as a team, not as rivals.

One beast rules by force.

The other rules by persuasion.

Opposition to God rarely works alone.

🌍 This beast rises from the earth

🤝 The two beasts work together

💪 One rules through force

➡️ The other rules through persuasion

---

## 🐑 Two Horns Like A Lamb, And He Spake As A Dragon

Horns like a lamb picture something that looks gentle and harmless at first glance.

The lamb image deliberately imitates the real Lamb, Jesus himself.

Speaking as a dragon reveals what is actually underneath that gentle appearance.

This beast's danger is not how it looks.

Its danger is the voice guiding it from behind the scenes.

A gentle appearance can hide the same old rebellion against God.

🐑 Lamb horns mimic Jesus's gentle image

🐉 Dragon speech reveals its true source

🎭 Appearance and reality do not match

➡️ Gentle looks can hide real rebellion

---

## 📢 Causeth The Earth And Them Which Dwell Therein To Worship The First Beast

This second beast does not build its own following.

Its entire purpose is pointing attention back to the first beast.

It works like a promoter, not a ruler in its own right.

The healed wound from earlier gets repeated here as the main selling point.

A convincing story, repeated often enough, can move entire populations.

This beast's power is persuasion aimed at one single goal, worship of someone else.

📢 This beast promotes the first beast

🎯 Its goal is someone else's worship

🔁 It repeats the healed wound story

➡️ Repeated stories can move whole populations

---

## 🔥 He Doeth Great Wonders, So That He Maketh Fire Come Down From Heaven In The Sight Of Men

Fire from heaven already happened once before, through the prophet Elijah.

There it proved the true God was real in front of a watching crowd.

This beast counterfeits that same kind of sign to prove the opposite.

A miracle alone was never meant to be the final test of truth.

Satan is permitted to work real signs, not only tricks.

The source behind a miracle matters more than the miracle itself.

🔥 Fire from heaven recalls Elijah's miracle

🎭 This beast counterfeits a true sign

⚡ Satan can work real wonders

➡️ A sign's source matters most

---

## 🗿 Make An Image To The Beast, Which Had The Wound By A Sword, And Did Live

An image here means a statue or idol built to represent the beast.

Building images for emperors to worship was a real practice in the ancient Roman world.

This image specifically commemorates the beast's fake resurrection.

Worship gets anchored to a physical object people can see and bow toward.

A visible symbol makes an invisible claim feel believable.

The lie becomes something people can touch.

🗿 An image means a worship statue

🏛️ Rome really built images for emperors

🎭 This image honors a fake resurrection

➡️ A visible symbol makes a lie believable

---

## 🗣️ Power To Give Life Unto The Image Of The Beast, That The Image Should Both Speak

This image is not simply decorative.

It is described as speaking, something a normal statue cannot do.

Many scholars read this as either a dramatic sign or as a picture of how convincing the system feels.

Either way, the point is the same.

People experience something that feels alive and worth answering to.

A counterfeit convincing enough can demand the same response as the real thing.

🗣️ The image is described as speaking

🤔 Scholars read this a few ways

🎭 It feels alive to those watching

➡️ A convincing counterfeit still demands a response

---

## 🚫 As Many As Would Not Worship The Image Of The Beast Should Be Killed

Refusing to worship this image was treated as a crime worth dying for.

This describes real persecution under systems that demanded emperor worship.

Christians who would not bow faced execution for that refusal alone.

The cost of staying faithful here is named plainly, not hidden.

Scripture does not pretend following God will always be safe.

It tells the truth so believers are not blindsided by the cost.

🚫 Refusing worship was treated as a crime

⚔️ Real Christians faced execution for this

💯 The cost is named plainly here

📖 Scripture never hides the true cost

# Revelation 13:16-18
# 🔢 The Mark Of The Beast
---
## ✋ To Receive A Mark In Their Right Hand, Or In Their Foreheads

A mark here functions like a required stamp of ownership or allegiance.

The hand pictures a person's actions and daily work.

The forehead pictures a person's mind and beliefs.

Together they picture total loyalty, what someone does and what someone believes.

This counterfeits being sealed as God's own, described earlier in the book.

Every person eventually belongs to one side or the other.

✋ The hand pictures a person's actions

🧠 The forehead pictures a person's beliefs

🔏 Together they picture total loyalty

➡️ This counterfeits being sealed as God's own

---

## 🛒 That No Man Might Buy Or Sell, Save He That Had The Mark

This mark controls access to ordinary daily life, not only worship.

Buying and selling covers food, trade, and basic survival.

Refusing the mark could mean real economic hardship, not just social pressure.

This beast's system is built to make loyalty costly to refuse.

Faithfulness here would have required trusting God over simple survival.

The same pressure, in different forms, still tests believers today.

🛒 The mark controls buying and selling

🍞 Refusal could cost basic survival

💰 Loyalty is made costly to refuse

➡️ The same pressure still tests believers today

---

## 🧮 Let Him That Hath Understanding Count The Number Of The Beast

John signals that this detail needs careful thought, not a quick guess.

Ancient Hebrew and Greek letters doubled as numbers.

That let names be added up into a total.

This practice, called gematria, was common in the ancient world.

The original readers likely had enough context to work out who this pointed to.

Modern readers have debated this number for centuries without full agreement.

Wisdom here means patient discernment, not a magic formula.

🧮 Letters once doubled as numbers

🔍 This method is called gematria

🤔 Original readers had more context

➡️ Wisdom means patient discernment here

---

## 6️⃣ His Number Is Six Hundred Threescore And Six

Threescore is an old word for sixty.

Six hundred threescore and six means six hundred sixty six.

Many scholars connect this number to Nero, a Roman emperor who persecuted Christians fiercely.

His name and title, written out in Hebrew letters, add up to this same total.

Seven is often used in this book to picture completeness tied to God.

Six falls short of seven in that same pattern.

This number marks a real, limited human power pretending to be more than it is.

🔢 Threescore is an old word for sixty

👑 Many scholars connect it to Nero

🌟 Seven pictures completeness tied to God

➡️ Six marks power that falls short
`.trim();

export const REVELATION_THIRTEEN_PERSONAL_SECTIONS = parseRevelationThirteenRawNotes(REVELATION_THIRTEEN_RAW_NOTES);
