export type ActsOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsOneRawNotes(rawText: string): ActsOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+1:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 1 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+1:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+1:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 1 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 1,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 1:${startVerse}` : `Acts 1:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Acts 1 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_ONE_RAW_NOTES = `# Acts 1:1-3
# 📜 The Former Treatise

---

## 📜 The Former Treatise Have I Made

"Treatise" means a written account, a careful record set down in order.

Luke is the author, and the former treatise is his Gospel.

Acts picks up the same story right where that first book ended.

One author wrote both books as two parts of a single account.

📜 Treatise means a written record

🔗 Acts continues that same story

✍️ One author, two connected books

📖 The former treatise is Luke's Gospel

## 🤝 O Theophilus

Theophilus was likely a real person, probably a Roman official.

His name means lover of God or friend of God.

Luke addressed his Gospel to this same man by name.

A patron like this often helped pay for a book to be written and copied.

🤝 Theophilus means friend of God

👤 Probably a real Roman official

💰 Patrons often funded a book's writing

📖 Luke's Gospel was also addressed to him

## 🌱 All That JESUS Began Both To Do And Teach

The word began is doing careful work in this sentence.

Luke's Gospel told what Jesus started, not a finished, closed story.

Acts shows that same work continuing through the apostles and the Spirit.

Jesus is still active here, no longer walking the earth in a body but still at work.

🌱 Began signals an unfinished story

📘 The Gospel told what Jesus started

🔥 Acts shows the work continuing

📖 Jesus still works through his apostles

## 🕊️ Had Given Commandments Unto The Apostles

"Holy Ghost" is an older English way of saying Holy Spirit.

Jesus gave his final instructions to the apostles through the Spirit's own guidance.

This links Father, Son, and Spirit together in a single act of teaching.

The risen Jesus is still shown directing his own followers before he leaves.

🕊️ Holy Ghost means Holy Spirit

👥 Jesus still instructs his apostles

🔺 Father, Son, and Spirit act together

📖 The risen Jesus still leads his own

## ✅ Shewed Himself Alive By Many Infallible Proofs

"Shewed" is an old spelling of showed.

"Infallible proofs" was a term used in Greek courts for solid, conclusive evidence.

Luke is building a legal style case, not just telling a nice story.

The resurrection rests on evidence that could stand up under real scrutiny.

✅ Shewed is an old word for showed

⚖️ Infallible proofs was a legal term

🏛️ Luke argues this like a court case

📖 The resurrection rests on real evidence

## ⏳ Being Seen Of Them Forty Days

Forty days is a number that shows up again and again in scripture.

The flood, Moses on the mountain, and Jesus in the wilderness all last forty days.

These are usually seasons of testing, preparation, or a major transition.

This forty days prepares the apostles for the mission about to begin.

⏳ Forty days repeats through scripture

🌊 The flood and the wilderness both qualify

🧭 It usually marks testing or preparation

📖 This season prepares them for the mission ahead

# Acts 1:4-8
# 🕊️ Wait For The Promise

---

## 🏙️ Commanded Them That They Should Not Depart From Jerusalem

Jerusalem was the center of Jewish worship and the site of the temple.

Jesus tells the apostles to stay there instead of scattering to their home towns.

Something important was about to happen, and they needed to be together for it.

Waiting in the right place mattered as much as waiting at all.

🏙️ Jerusalem was the center of worship

🚫 The apostles are told to stay put

👥 They needed to stay together

📖 The right place mattered as much as waiting

## 🎁 Wait For The Promise Of The Father

"The promise" points back to something God had already said he would do.

Prophets like Joel and Ezekiel spoke of God's Spirit poured out on his people.

Jesus had also promised a Comforter to his disciples before his death.

This single phrase ties together generations of hope into one coming moment.

🎁 The promise points to an old hope

📜 Joel and Ezekiel both spoke of it

🕊️ Jesus promised a Comforter earlier too

📖 Generations of hope meet in one moment

## 💧 John Truly Baptized With Water

John the Baptist's baptism was a public sign of turning away from sin.

People stepped into the water as an outward picture of an inward change.

It prepared the way for someone greater, but it could not fill a person with God's own Spirit.

That next step belonged to Jesus alone.

💧 John's baptism showed repentance

🌊 It was an outward sign only

🧭 It prepared the way for someone greater

📖 Only Jesus could give the Spirit itself

## 🔥 Ye Shall Be Baptized With The Holy Ghost

This baptism is not about water at all.

It means being completely filled and empowered by God's own Spirit.

Jesus promises this will happen soon, though he does not yet say exactly how.

The apostles will see this promise fulfilled just a few verses into the next chapter.

🔥 This baptism means Spirit filling

💪 It brings power, not just water

⏱️ Jesus says it is coming soon

📖 Chapter two shows it actually happening

## 👑 Wilt Thou At This Time Restore Again The Kingdom To Israel

The apostles are still thinking in political terms.

They expect Jesus to throw off Roman rule and set up an earthly throne right away.

That expectation was common among Jews living under foreign occupation.

Jesus does not correct the hope itself, only its timing and its shape.

👑 The apostles expect a political kingdom

⚔️ They hoped for freedom from Rome

🗣️ This hope was common at the time

📖 Jesus corrects the timing, not the hope

## ⏱️ It Is Not For You To Know The Times Or The Seasons

The Greek language used two different words here.

"Times" points to length and duration.

"Seasons" points to a specific appointed moment instead.

Jesus says plainly that neither one is the apostles' business to know.

This still answers every attempt to calculate a precise date for his return.

⏱️ Times means length or duration

📅 Seasons means an appointed moment

🤐 Jesus says this is not their business

📖 It still answers date setting today

## 🗺️ Witnesses Unto Me In Jerusalem, Judaea, Samaria, And The Uttermost Part Of The Earth

This single verse lays out the whole shape of the book of Acts.

Jerusalem, then Judaea, then despised Samaria, then the whole world, in that exact order.

Samaria was home to a mixed people that many Jews looked down on.

Jesus sends his witnesses to the people they would least expect to include.

🗺️ This verse maps the whole book

📍 It moves outward in stages

👥 Samaria was a despised, mixed region

📖 The mission reaches people least expected

# Acts 1:9-11
# ☁️ Taken Up Into Heaven

---

## 👁️ While They Beheld, He Was Taken Up

The ascension happens in plain daylight, in front of many witnesses.

This is not a private vision or a dream someone later reported.

Luke is careful to record this as something the apostles actually watched happen.

A visible departure sets up the promise of an equally visible return.

👁️ The apostles actually watch this happen

🌞 It happens in broad daylight

✍️ Luke records it as real history

📖 A visible leaving points to a visible return

## ☁️ A Cloud Received Him Out Of Their Sight

Clouds carry a specific meaning throughout the Bible.

A cloud covered Mount Sinai and later filled the tabernacle with God's presence.

The same bright cloud appeared over Jesus at the Transfiguration.

This cloud is not weather, it is a sign that God himself is present and receiving him.

☁️ Clouds often mark God's presence

🏔️ A cloud covered Mount Sinai

✨ A cloud also appeared at the Transfiguration

📖 This cloud signals God receiving Jesus

## 👔 Two Men Stood By Them In White Apparel

These two men are angels, described the same way elsewhere in scripture.

Angels wore similar white clothing at the empty tomb just weeks earlier.

Luke calls them men because that is exactly how they appeared to human eyes.

The same kind of messenger explained the resurrection and now explains the ascension.

👔 White apparel marks them as angels

🪦 The tomb had angels dressed the same way

👤 They appeared fully as men

📖 The same kind of messenger explains both events

## 🗣️ Ye Men Of Galilee

The angels address the apostles by their home region.

Galilee sat far from Jerusalem and carried a reputation as plain and unpolished.

These ordinary men from an overlooked region are about to carry the gospel worldwide.

God's choice of messengers rarely matches human ideas of importance.

🗣️ Galilee was their home region

🌾 It had a plain, overlooked reputation

🌍 These ordinary men reach the whole world

📖 God's choices rarely match human expectations

## 🔁 This Same Jesus Shall So Come In Like Manner As Ye Have Seen Him Go

The promise here is specific, not vague or merely spiritual.

The same Jesus, in the same kind of visible way, will return one day.

He did not vanish into some invisible, bodiless state.

The apostles are sent out to work, not to stand around waiting for that day.

🔁 The same Jesus will return

👁️ His return will be visible, like his leaving

🧍 He remains a real, bodily person

📖 Their calling is work, not waiting

# Acts 1:12-14
# 🏠 The Upper Room

---

## ⛰️ The Mount Called Olivet

Olivet is another name for the Mount of Olives, just east of Jerusalem.

Jesus prayed there often, including the night before his arrest.

The prophet Zechariah had spoken of the Lord returning to this very mountain.

The ascension and the promised return are tied to the same familiar hillside.

⛰️ Olivet is the Mount of Olives

🙏 Jesus often prayed there

📜 Zechariah connects it to the Lord's return

📖 One hillside ties both events together

## 🚶 A Sabbath Day's Journey

Jewish teachers had set a limit on how far someone could walk on the Sabbath.

A sabbath day's journey worked out to a little over half a mile.

Luke uses this detail simply to describe how close Olivet sat to the city.

Small details like this help a reader picture the real geography of the story.

🚶 A set Sabbath walking limit existed

📏 It measured a little over half a mile

🏙️ It shows how close Olivet was to Jerusalem

📖 Small details ground the story in real geography

## 🏠 They Went Up Into An Upper Room

Homes in this culture often had a flat roofed upper level used for guests or gatherings.

Many believe this is the very room where the Last Supper had taken place.

The text does not say so directly, but the setting fits that earlier meal closely.

A room built for a meal with Jesus now becomes a room built for waiting on him.

🏠 Upper rooms were used for gatherings

🍞 Many link it to the Last Supper

❓ The text does not confirm this directly

📖 A room of fellowship now holds a wait

## 👥 Peter, And James, And John, And Andrew

This is the list of the Eleven, with one name now permanently missing.

Judas Iscariot is gone, and his absence hangs quietly over the whole list.

"Simon Zelotes" likely marks him as a former member of a Jewish nationalist movement.

"Judas The Brother Of James" is a careful note so no one confuses him with Judas Iscariot.

👥 This is the list of the Eleven

❌ Judas Iscariot is now missing

⚔️ Zelotes points to a nationalist background

📖 A careful note avoids confusing two Judas figures

## 👩 With The Women, And Mary The Mother Of Jesus

Jesus's mother Mary appears here for the final time in the New Testament story.

"His brethren" refers to Jesus's own half brothers, children of Mary and Joseph.

Those same brothers had once doubted Jesus and refused to believe in him.

A family that once doubted him is now praying together in the same room.

👩 Mary appears for the last time in Acts

👨‍👩‍👧 His brethren were Jesus's own half brothers

😕 They once doubted Jesus openly

📖 Former doubters now pray together with the rest

## 🙏 Continued With One Accord In Prayer And Supplication

"One accord" means they were united, acting and praying with a single shared purpose.

"Supplication" means a specific, earnest request, not a vague or general prayer.

This small, united group is the entire church at this exact moment in the story.

Everything that follows in the book of Acts grows out of this one room of prayer.

🙏 One accord means united purpose

📣 Supplication means a specific request

⛪ This room held the entire church

📖 The whole book of Acts starts here

# Acts 1:15-20
# 💰 The Field Of Blood

---

## 🔢 The Number Of Names Together Were About An Hundred And Twenty

A hundred and twenty gives a real sense of the size of the early church.

That is the whole believing community at this point, not just the Eleven.

Men and women together made up this count, including the ones named just before.

A movement that would soon reach the whole world starts from this small, specific number.

🔢 About a hundred and twenty believers

👥 This counts the whole community, not just apostles

👩‍👦 Men and women are both included

📖 A worldwide movement starts from a small number

## 📜 This Scripture Must Needs Have Been Fulfilled, Which The Holy Ghost By The Mouth Of David Spake

Peter treats the Psalms as words the Holy Spirit spoke through David long ago.

David wrote about being betrayed by someone close to him in Psalm forty one.

Peter applies that ancient pain directly to what Judas had just done to Jesus.

A personal psalm about betrayal becomes prophecy about a far greater betrayal.

📜 Peter treats the Psalms as Spirit speech

😢 David wrote about betrayal by a friend

🔗 Peter applies it to Judas directly

📖 A personal psalm becomes real prophecy

## 🚶 Guide To Them That Took Jesus

"Guide" here is a quiet, almost clinical word for what Judas actually did.

He personally led the armed group to the place where Jesus could be arrested.

Judas knew exactly where Jesus would be because he had walked with him for years.

Closeness to Jesus did not protect Judas from choosing to betray him.

🚶 Guide means Judas led the arrest party

🌙 He knew where to find Jesus

👣 Years of closeness did not stop him

📖 Nearness to Jesus is not loyalty

## 💰 Purchased A Field With The Reward Of Iniquity

"The reward of iniquity" is the thirty pieces of silver Judas received for his betrayal.

The Gospel of Matthew records that the chief priests actually bought the field.

They used the very money Judas had thrown back at them in his guilt.

Because it was his money, Luke can rightly say the field is still tied to Judas.

💰 The reward of iniquity was thirty coins

⛪ The chief priests technically bought the field

🪙 They used the money Judas returned

📖 The money still ties the field to Judas

## 😔 Falling Headlong, He Burst Asunder In The Midst

Matthew's Gospel says Judas hanged himself after his betrayal.

This verse adds a harder, more physical detail to that same event.

Many understand this as the rope or branch giving way after death.

That would explain the fall described here.

Together the two accounts paint one grim, complete picture.

They are not two different stories.

😔 Judas had already hanged himself

🌳 A rope or branch likely gave way

📚 Luke adds detail Matthew does not include

📖 Both accounts combine into one event

## 🩸 Aceldama, That Is To Say, The Field Of Blood

Aceldama is an Aramaic name, the everyday language spoken in Jerusalem at the time.

It literally means the field of blood, a grim and permanent label.

The name stuck because of both the blood money that bought it and the death connected to it.

A patch of ground now carried Judas's story forward for everyone who heard its name.

🩸 Aceldama means field of blood

🗣️ Aramaic was the common language in Jerusalem

🪙 The name recalls the money and death

📖 A place name carried the story forward

# Acts 1:21-26
# 🎲 Choosing Matthias

---

## 👣 Companied With Us All The Time That The Lord Jesus Went In And Out Among Us

Peter sets out the first requirement for filling Judas's empty place.

The replacement had to be someone who had personally traveled with Jesus throughout his ministry.

Secondhand knowledge or a brief encounter would not be enough for this role.

Being an apostle required years of shared, ordinary, everyday life with Jesus.

👣 The candidate had to have traveled with Jesus

📏 Secondhand knowledge was not enough

📆 Years of shared life were required

📖 Apostleship rested on firsthand experience

## 🌊 Beginning From The Baptism Of John, Unto That Same Day That He Was Taken Up

Peter marks out the exact span of time that mattered for this role.

It runs from Jesus's baptism all the way to his ascension into heaven.

That span covers the entire public ministry, start to finish, with nothing left out.

The qualification is deliberately whole, not partial.

🌊 The span starts at Jesus's baptism

☁️ It ends at the ascension

📏 It covers the whole public ministry

📖 The requirement is complete, not partial

## ✅ A Witness With Us Of His Resurrection

This is the single most important qualification of all.

An apostle's core job was to testify personally that Jesus had truly risen from the dead.

Everything else about the apostolic office supports this one central task.

The church's whole message stands or falls on reliable eyewitnesses to this event.

✅ Resurrection witness is the key qualification

🎯 It is the center of the apostolic role

🏛️ Every other duty supports this one task

📖 The church's message rests on real eyewitnesses

## 🏷️ Joseph Called Barsabas, Who Was Surnamed Justus

"Barsabas" is a surname, likely meaning something close to son of the Sabbath.

This Joseph is a completely different man from Barabbas, the prisoner released instead of Jesus.

The similar sounding names have caused real confusion for careless readers over the centuries.

"Justus" was simply a second, more common name this man also used.

🏷️ Barsabas likely means son of the Sabbath

🙅 He is not the same man as Barabbas

😕 Similar names have confused careless readers

📖 Justus was his other, common name

## 🙏 Shew Whether Of These Two Thou Hast Chosen

The group prays before casting lots, trusting God to guide the outcome.

Casting lots was an old, accepted practice for seeking God's will in Israel.

The priests once used sacred objects called the Urim and Thummim in a similar way.

This is not treated as random chance but as a method for hearing from God.

🙏 Prayer comes before the lots are cast

🎲 Casting lots was an old, accepted practice

⚖️ The Urim and Thummim worked similarly

📖 They trusted the method, not raw chance

## 🎯 The Lot Fell Upon Matthias, And He Was Numbered With The Eleven Apostles

The number twelve mattered deeply, echoing the twelve tribes of Israel.

Matthias is added so the apostolic circle is made whole again.

This is also the last time scripture records anyone casting lots for guidance.

After Pentecost in the next chapter, the Holy Spirit leads God's people far more directly.

🎯 Twelve echoes the twelve tribes

➕ Matthias completes the apostolic circle

🎲 This is the last recorded use of lots

📖 The Spirit soon takes over from lots
`.trim();

export const ACTS_ONE_PERSONAL_SECTIONS = parseActsOneRawNotes(ACTS_ONE_RAW_NOTES);
