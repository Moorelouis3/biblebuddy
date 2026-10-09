export type LukeTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseLukeTwoRawNotes(rawText: string): LukeTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: LukeTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Luke\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Luke 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Luke\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Luke\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Luke 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Luke 2:${startVerse}` : `Luke 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Luke 2 sections, received " + sections.length);
  }

  return sections;
}

const LUKE_TWO_RAW_NOTES = `# Luke 2:1-7
# 📜 Caesar's Decree Reaches Bethlehem
---
## 📜 There Went Out A Decree From Caesar Augustus

Caesar Augustus ruled the entire Roman Empire from the city of Rome.

A decree from him carried the weight of law everywhere Rome held power.

This particular decree ordered a census, a count of every person for tax records.

Luke roots the birth of Jesus inside verifiable Roman history.

The most powerful man in the world never knew he was serving God's plan.

👑 Augustus ruled the entire Roman Empire

📜 A decree carried the force of law

🧾 This decree ordered a census count

📖 Rome's power served God's larger plan

---
## 🧾 That All The World Should Be Taxed

Taxed here does not mean money taken directly from every pocket.

It means every person had to be counted and registered by the government.

All the world means the Roman Empire, not the whole planet.

Rome ran these counts to track population and plan future taxes.

🧾 Taxed means counted and registered

🌍 All the world means the Roman Empire

📋 Rome tracked people for future taxes

📖 God used an earthly count for His plan

---
## 🏛️ This Taxing Was First Made When Cyrenius Was Governor Of Syria

Cyrenius, also known as Quirinius, governed the Roman province of Syria.

Luke includes this detail so readers could check the date for themselves.

Ancient history outside the Bible confirms a governor by this name ruled Syria in this era.

Luke writes like a careful historian, not like someone telling a vague legend.

🏛️ Cyrenius governed the Roman province of Syria

📅 Luke gives a real, checkable date

📚 Outside history confirms this governor's name

📖 Luke writes real history, not legend

---
## 🚶 Every One Into His Own City

This does not mean everyone traveled to one single city together.

Each person had to return to their own ancestral hometown to register.

Rome did not normally require this, since most census counts just used a current address.

This unusual ancestral rule is exactly why Joseph had to leave Nazareth.

🚶 Each person returned to their own hometown

🏠 This was not Rome's normal practice

🧭 Ancestral registration explains Joseph's trip

📖 An unusual rule placed Jesus in Bethlehem

---
## 🏙️ Unto The City Of David, Which Is Called Bethlehem

The city of David means Bethlehem, the hometown of King David centuries earlier.

Joseph's family line traced back to David, so Bethlehem was his ancestral city.

The prophet Micah had already named Bethlehem as the birthplace of the coming ruler.

A Roman tax rule unknowingly placed Jesus exactly where prophecy said he would be born.

🏙️ City of David means Bethlehem

👑 David's hometown centuries before Jesus

📜 Micah had already named this town

📖 Prophecy and Roman law lined up

---
## 🤰 To Be Taxed With Mary His Espoused Wife, Being Great With Child

Espoused means legally married but not yet fully living together as husband and wife.

Great with child is an old way of saying very far along in pregnancy.

Mary made this long trip from Nazareth to Bethlehem while close to giving birth.

The journey covered close to ninety miles of rough, hilly terrain.

🤝 Espoused means legally married already

🤰 Great with child means very pregnant

🚶 The trip was long and difficult

📖 Mary traveled already far into pregnancy

---
## 🐣 Wrapped Him In Swaddling Clothes, And Laid Him In A Manger

Swaddling clothes were long strips of cloth wrapped snugly around a newborn baby.

This was normal, loving care, not a sign of poverty by itself.

A manger was a feeding trough built for farm animals to eat from.

Laying a newborn king there shows how humble this birth truly was.

🐣 Swaddling clothes were a normal newborn custom

🍼 This showed care, not poverty

🐴 A manger was an animal feeding trough

📖 The King of kings began in total humility

---
## 🚪 Because There Was No Room For Them In The Inn

This probably was not a commercial hotel like a modern traveler might picture.

The word likely points to a crowded guest room inside a relative's house.

So many family members had returned for the census that every guest space was full.

Jesus was born in the most practical space left, a lower level where animals stayed.

🚪 Likely a crowded guest room, not a hotel

👪 Relatives filled every normal guest space

🏠 The census crowded the whole town

📖 Jesus still found room among the overlooked

# Luke 2:8-14
# 👼 The Angels Announce The Savior
---
## 🐑 Shepherds Abiding In The Field, Keeping Watch Over Their Flock By Night

Shepherds in this culture were often looked down on as rough and unclean.

Watching flocks through the night was hard, lonely, and sometimes dangerous work.

These are not important people by any human standard of status.

God chose to send the biggest announcement in history to exactly these men first.

🐑 Shepherds held low social status then

🌙 Night watching was hard, lonely work

👷 These were ordinary working men

📖 God chose the overlooked to hear first

---
## ✨ The Angel Of The Lord Came Upon Them, And The Glory Of The Lord Shone Round About Them

The glory of the Lord describes a visible brightness that reveals God's own presence.

This same kind of light appeared earlier in the Old Testament, often called the Shekinah.

It was not a soft, gentle light but something overwhelming to stand near.

An ordinary night watch suddenly became the most frightening moment of these men's lives.

✨ Glory of the Lord means visible brightness

📜 This light appeared earlier in scripture

😳 The brightness was overwhelming, not gentle

📖 Heaven broke into an ordinary night

---
## 😨 They Were Sore Afraid

Sore here means greatly or severely, not physical pain.

This was not a mild surprise but a response of real terror.

Throughout scripture, people who encounter God's glory directly often react this exact way.

Fear is the normal human reaction to something truly holy.

😨 Sore means greatly or severely

😳 This was real terror, not surprise

📜 Scripture repeats this reaction often

📖 Holiness naturally provokes human fear

---
## 🕊️ Fear Not: For, Behold, I Bring You Good Tidings Of Great Joy

Good tidings is an old way of saying good news.

This exact phrase is where the word gospel gets its meaning.

The angel calms their fear before saying anything else.

Comfort comes first, because the news itself is meant to bring joy, not more fear.

🕊️ Fear not comes before the news

📰 Good tidings means good news

✝️ This is where gospel gets its name

📖 Joy, not fear, is the point

---
## 🌍 Which Shall Be To All People

This good news was never meant for one nation alone.

Many in Israel expected their Messiah to belong only to them.

Luke, writing largely for non Jewish readers, highlights this detail on purpose.

Yet all people already hints that this Savior belongs to the entire world.

🌍 Not meant for one nation only

🙏 Israel expected an exclusive Messiah

✍️ Luke highlights this for Gentile readers

📖 This Savior belongs to the whole world

---
## 👑 Born This Day In The City Of David A Saviour, Which Is Christ The Lord

Christ is not Jesus's last name.

It is a title meaning anointed one, the promised rescuer kings and prophets pointed toward.

Lord was a title normally reserved for God himself.

In one sentence the angel names Jesus as rescuer, king, and God together.

👑 Christ means anointed, promised rescuer

🏷️ Not a last name, a title

🙏 Lord was a title for God

📖 One verse names Jesus rescuer and God

---
## 🚩 This Shall Be A Sign Unto You

A sign in scripture usually confirms something is true.

This sign was not a blazing light or a miracle in the sky.

It was a plain baby, wrapped in cloth, lying in a feeding trough.

That ordinary detail is exactly what would prove the shepherds found the right child.

🚩 A sign confirms without needing to dazzle

🐣 The sign was a plain, wrapped baby

🐴 He lay in a feeding trough

📖 Humble details confirmed the true Savior

---
## 👼 Suddenly There Was With The Angel A Multitude Of The Heavenly Host

Heavenly host is an old military term for a vast army of angels.

One angel had already delivered the message to the shepherds.

Now an entire army of angels appears to confirm it with worship.

Heaven itself erupts in celebration over this one birth.

👼 Heavenly host means an army of angels

🗣️ One angel delivered the message

🎺 A whole army confirms it with praise

📖 Heaven celebrates this single birth

---
## 🎶 Glory To God In The Highest, And On Earth Peace, Good Will Toward Men

This short song has been sung and prayed by the church for centuries.

The first half points all credit upward, to God alone.

The second half points down, toward the peace this birth brings to earth.

Heaven and earth are joined together in this one announcement.

🎶 Sung by the church for centuries

⬆️ The first line credits God alone

⬇️ The second line brings peace to earth

📖 Heaven and earth meet in this moment

# Luke 2:15-20
# 🐑 The Shepherds Go And Tell
---
## 🏃 Let Us Now Go Even Unto Bethlehem

The shepherds do not debate or delay after the angels leave.

They decide immediately to go see the child for themselves.

Their quick obedience stands out against how often people in scripture hesitate.

Belief here shows itself through action, not just words.

🏃 The shepherds act immediately

🙅 No debate, no delay

⚡ Quick obedience stands out here

📖 Real belief moves into action

---
## 📜 This Thing Which Is Come To Pass, Which The Lord Hath Made Known Unto Us

This thing points directly back to everything the angels just announced.

The shepherds credit the Lord, not luck or coincidence, for what they just witnessed.

They treat the angels' message as something they are now responsible to check out.

Hearing good news is meant to lead somewhere, not just be admired.

📜 This thing means the angels' announcement

🙏 They credit the Lord, not luck

🚶 Hearing the news demanded a response

📖 Real news leads to real action

---
## ⚡ They Came With Haste

Haste means they hurried, they did not casually stroll over.

Nothing in their message said this child was in danger.

Their hurry came from excitement and urgency, not fear.

Good news this big could not wait for morning.

⚡ Haste means they hurried

😃 Excitement drove their speed, not fear

🌙 They would not wait for morning

📖 Great news demands quick response

---
## 📢 They Made Known Abroad The Saying Which Was Told Them Concerning This Child

Shepherds were not considered trustworthy witnesses in Jewish courts of this time.

Yet these exact men become the first people to spread the news of Jesus.

God often chooses unlikely messengers to carry His most important news.

The gospel began in a field, not in a palace or a temple.

📢 Shepherds spread the news first

⚖️ Courts did not trust their word then

👑 God used unlikely messengers anyway

📖 The gospel began in a field

---
## 😮 All They That Heard It Wondered At Those Things Which Were Told Them

Everyone who hears the shepherds' story reacts with real amazement.

Wonder here is the first, honest response, not yet full understanding.

Luke often records this kind of reaction throughout his Gospel.

Amazement is often the first step toward real faith.

😮 Hearers react with real wonder

🤔 Wonder is not yet full understanding

📜 Luke repeats this reaction often

📖 Amazement often begins real faith

---
## 💭 Mary Kept All These Things, And Pondered Them In Her Heart

Pondered means she turned these events over slowly in her mind.

Mary does not rush to explain or announce what she is feeling.

She quietly holds onto details other people might have already forgotten.

This same description of Mary returns again later in this very chapter.

💭 Pondered means turning things over slowly

🤐 Mary stays quiet, not rushing to explain

🧠 She holds onto details carefully

📖 This same picture of Mary returns later

---
## 🙌 The Shepherds Returned, Glorifying And Praising God For All That They Had Heard And Seen

These same shepherds go back to work, but they are not unchanged.

They leave praising God out loud for everything they witnessed.

An ordinary night shift became the greatest night of their lives.

Encountering Jesus changes how ordinary people live out their ordinary days.

🙌 They return changed, not the same

🎶 They praise God out loud

🌙 An ordinary shift became unforgettable

📖 Meeting Jesus changes ordinary days

# Luke 2:21-24
# 🕊️ Circumcised And Presented In The Temple
---
## ✂️ When Eight Days Were Accomplished For The Circumcising Of The Child

Jewish law commanded circumcision for every baby boy on the eighth day of life.

This act marked a child as belonging to God's covenant people.

Jesus, though fully God, still entered human life under this same Jewish law.

His obedience to the law begins before he can even speak.

✂️ The eighth day was commanded by law

🤝 Circumcision marked covenant belonging

👶 Jesus entered life under Jewish law

📖 His obedience began before he could speak

---
## 📛 His Name Was Called JESUS

Jesus is the Greek form of the Hebrew name Joshua.

The name itself means the Lord saves.

An angel had already given Mary and Joseph this exact name before the child was born.

His very name announces his whole mission before he does anything at all.

📛 Jesus means the Lord saves

👼 An angel chose this name in advance

📜 Same name as Joshua, in Hebrew

📖 His name announces his mission

---
## 🕯️ The Days Of Her Purification According To The Law Of Moses Were Accomplished

The law of Moses required a waiting and purification period after childbirth.

This custom is found back in the book of Leviticus.

Mary, though the mother of God's own son, still followed this ordinary law fully.

Her obedience shows humility, not a shortcut around normal religious duty.

🕯️ Leviticus required this waiting period

👶 It followed every normal childbirth

🙏 Mary followed the law fully

📖 Humility, not shortcuts, marked her obedience

---
## 🐦 A Pair Of Turtledoves, Or Two Young Pigeons

The law allowed a lamb for this offering, except for families who could not afford one.

In that case, two birds were accepted instead.

Mary and Joseph bring the offering reserved for the poor.

The King of the universe was born into an ordinary, working family with little money.

🐦 Birds were the offering for the poor

💰 A lamb was the normal, costlier choice

👪 Mary and Joseph could not afford one

📖 The King was born into real poverty

# Luke 2:25-32
# 👴 Simeon And The Promised Consolation
---
## 🙏 Waiting For The Consolation Of Israel

The consolation of Israel was a common way of describing the hope for the coming Messiah.

Simeon was not waiting for comfort in a vague, general sense.

He was waiting specifically for God to finally rescue and comfort his people.

Many faithful Jews shared this exact same hope across generations.

🙏 Consolation of Israel means messianic hope

🎯 Simeon waited for something specific

📜 Many generations shared this same hope

📖 Hope kept Simeon watching faithfully

---
## 🕊️ The Holy Ghost Was Upon Him

Holy Ghost is an older way of saying Holy Spirit.

The Spirit resting on specific people happens often in the Old Testament.

It usually marked someone chosen for a special task or message.

Simeon's role here was simply to recognize and confirm who this child truly was.

🕊️ Holy Ghost means Holy Spirit

📜 The Spirit marked people for special tasks

👀 Simeon was chosen to recognize Jesus

📖 His role was to confirm the truth

---
## ⏳ It Was Revealed Unto Him That He Should Not See Death Before He Had Seen The Lord's Christ

God gave Simeon a personal promise about his own life and death.

He would not die until he had seen the Messiah with his own eyes.

This means Simeon had likely been waiting and watching for many years.

God kept this quiet, personal promise exactly as he said he would.

⏳ Simeon received a personal promise

👀 He would see the Messiah first

📆 He likely waited many years for this

📖 God kept his quiet promise

---
## 🚶 He Came By The Spirit Into The Temple

This was not a random, ordinary visit to the temple that day.

The Holy Spirit specifically guided Simeon there at that exact moment.

Mary and Joseph arrived at the very same time, without planning any of it.

God arranged this meeting long before either side even walked through the door.

🚶 Not a random, ordinary visit

🕊️ The Spirit guided his timing

⏰ Both families arrived at once

📖 God arranged the meeting in advance

---
## 🙌 Then Took He Him Up In His Arms, And Blessed God

Simeon physically holds the child he has waited his entire life to see.

His first response is not to Mary or Joseph but straight to God.

He blesses God before he says a single word to the parents.

Worship comes first, before anything else gets said.

🙌 Simeon finally holds the child

🙏 He blesses God immediately

🗣️ Worship comes before any conversation

📖 God gets the first response

---
## 🕊️ Lord, Now Lettest Thou Thy Servant Depart In Peace

The phrase lettest depart was common language for releasing a servant from duty.

Simeon speaks like someone finally allowed to rest after a long assignment.

Seeing Jesus was the one thing holding him here.

He can now leave this life in genuine peace, not fear.

🕊️ Lettest depart means release from duty

⏳ Seeing Jesus completed his assignment

😌 Simeon can finally rest

📖 He faces death with real peace

---
## 👁️ For Mine Eyes Have Seen Thy Salvation

Simeon does not say he has seen a sign of salvation.

He says he has seen salvation itself, in person.

For Simeon, salvation was not an idea but a baby in his arms.

What God promises, he eventually delivers in a real, physical way.

👁️ Simeon saw salvation, not just a sign

👶 Salvation was a real baby

🤲 He held the promise in his arms

📖 God delivers promises in real, physical ways

---
## 🌍 A Light To Lighten The Gentiles, And The Glory Of Thy People Israel

Simeon's prayer splits into two clear halves.

The first half includes the Gentiles, people outside the Jewish nation entirely.

The second half still honors Israel as God's own chosen people.

This early prophecy already points toward a Savior meant for every nation on earth.

🌍 The prayer has two clear halves

🕯️ Light for Gentiles means outsiders included

👑 Glory for Israel still stands

📖 One Savior, meant for every nation

# Luke 2:33-35
# ⚔️ Simeon Blesses Mary And Joseph
---
## 😮 Joseph And His Mother Marvelled At Those Things Which Were Spoken Of Him

Mary and Joseph are not bored or used to hearing about their son yet.

Each new confirmation from someone like Simeon still genuinely amazes them.

They already knew Jesus was special from the angels before his birth.

Yet hearing it confirmed again by a stranger still lands with real weight.

😮 They are genuinely amazed again

👼 They already knew from the angels

🗣️ Simeon confirms it as an outsider

📖 Confirmation still carries real weight

---
## ⚖️ This Child Is Set For The Fall And Rising Again Of Many In Israel

Jesus would become the reason some people fall and others rise.

Those who reject him stumble over the very person meant to save them.

Those who accept him are lifted up into real life with God.

One single person divides every response into exactly one of these two outcomes.

⚖️ Jesus divides fall and rising

🚫 Rejecting him means stumbling

⬆️ Accepting him means being lifted

📖 Every response lands in one category

---
## 💔 A Sword Shall Pierce Through Thy Own Soul Also

Simeon's blessing includes a painful warning meant only for Mary.

A sword here is a word picture for deep, personal grief.

This points forward to the moment Mary watches her own son die on a cross.

Even Mary's role in God's plan would come with real suffering.

💔 A sword pictures deep grief

✝️ This points toward the cross

👩 Only Mary receives this warning

📖 Her role included real suffering

---
## 💭 That The Thoughts Of Many Hearts May Be Revealed

Jesus would not just save people quietly in the background.

How people respond to him would expose what they truly believe.

Hidden pride, hidden faith, and hidden doubt all surface because of him.

Jesus reveals the real condition of every heart he meets.

💭 Responses to Jesus expose the heart

🙈 Hidden beliefs get revealed

⚖️ No one stays neutral around him

📖 Jesus shows what is truly inside

# Luke 2:36-40
# 👵 Anna The Prophetess And The Child Grows
---
## 👵 There Was One Anna, A Prophetess, Of The Tribe Of Aser

Aser is another name for Asher, one of the original twelve tribes of Israel.

Most of Asher's tribe had been scattered centuries earlier.

Anna's family had somehow kept its identity and faith across all those generations.

A nearly forgotten tribe is still remembered and honored by God here.

👵 Aser means the tribe of Asher

🌍 Most of that tribe had scattered

🕯️ Anna's family kept its faith anyway

📖 God remembers even forgotten tribes

---
## 📆 A Widow Of About Fourscore And Four Years

Fourscore and four is an old way of saying eighty four.

Anna had likely been a widow for most of those long years.

This kind of age and devotion was rare and deeply respected in her culture.

She had spent a long lifetime waiting faithfully for this one moment.

📆 Fourscore and four means eighty four

🖤 She had been a widow for decades

🙏 Long devotion was rare and respected

📖 A lifetime of waiting led to this day

---
## ⛪ Departed Not From The Temple, But Served God With Fastings And Prayers Night And Day

Anna made the temple her permanent home.

Fasting meant going without food as an act of devotion and prayer.

She devoted herself to worship constantly, not just on special occasions.

Decades of quiet faithfulness placed her in this room at exactly the right moment.

⛪ The temple became her home

🍽️ Fasting meant skipping food to pray

🙏 She worshiped constantly, not occasionally

📖 Faithfulness placed her in this moment

---
## 🗣️ Spake Of Him To All Them That Looked For Redemption In Jerusalem

Redemption here means being rescued and set free, not just forgiven quietly.

A whole group of people in Jerusalem were actively hoping for this rescue.

Anna immediately becomes a witness, just like Simeon did moments earlier.

Both an old man and an old woman confirm this same child on the very same day.

🗣️ Redemption means being rescued and freed

🙏 A group was actively hoping for this

👴 Simeon and Anna both witness

📖 Two faithful elders confirm one child

---
## 🏡 Performed All Things According To The Law, They Returned Into Galilee, To Nazareth

Mary and Joseph finish every required step of the Jewish law.

Only then do they finally head back home to Nazareth.

Luke moves straight to this return, without mentioning any trip to Egypt.

Matthew's Gospel fills in that part of the story that Luke leaves out here.

🏡 Every legal requirement was completed first

🚶 Then they returned home to Nazareth

📜 Luke skips the trip to Egypt

📖 Matthew fills in that part later

---
## 🌱 The Child Grew, And Waxed Strong In Spirit, Filled With Wisdom

Waxed is an old word meaning grew or increased.

Jesus did not simply appear fully grown or skip a real childhood.

He grew physically, mentally, and spiritually like any other child.

God becoming human included every normal stage of human growth.

🌱 Waxed means grew or increased

👶 Jesus had a real, normal childhood

🧠 He grew in body, mind, and spirit

📖 God fully entered human growth

# Luke 2:41-45
# 🧒 Lost In Jerusalem
---
## 🐑 His Parents Went To Jerusalem Every Year At The Feast Of The Passover

Passover celebrated God rescuing Israel out of slavery in Egypt.

Jewish law required able adults to travel to Jerusalem for this feast.

Joseph and Mary kept this yearly trip faithfully, year after year.

Jesus grew up inside a family that took God's commands seriously.

🐑 Passover celebrated the escape from Egypt

📜 Law required this yearly trip

🚶 Joseph and Mary kept it faithfully

📖 Jesus grew up in faithful obedience

---
## 🎂 When He Was Twelve Years Old

Twelve was an important age for a Jewish boy in this culture.

It marked the approach of taking on full responsibility for keeping the law.

This trip may have been Jesus's first time old enough to fully take part.

A major step toward adulthood was beginning right here.

🎂 Twelve marked approaching adult responsibility

📜 Full duty to the law was near

🧒 Likely his first full participation

📖 A step toward adulthood had begun

---
## 🚶 The Child Jesus Tarried Behind In Jerusalem, And Joseph And His Mother Knew Not Of It

Tarried means he stayed behind instead of leaving with the group.

Large families traveled together in big, crowded caravans for these festivals.

It was common and normal for children to walk among relatives, not only parents.

That normal custom is exactly why nobody noticed he was missing right away.

🚶 Tarried means he stayed behind

👪 Families traveled in large, crowded groups

🧒 Children often walked among relatives

📖 A normal custom delayed the alarm

---
## 🚶 Supposing Him To Have Been In The Company, They Went A Day's Journey

The company means the wider group of relatives and neighbors traveling together.

Joseph and Mary each assumed Jesus was simply with the other parent or friends.

An entire day passed before either of them realized their mistake.

Real trust in a community still allowed a real mistake.

🚶 The company means the wider travel group

👪 Each parent assumed he was with the other

⏳ A full day passed unnoticed

📖 Trust in community still allowed a mistake

---
## 😟 They Turned Back Again To Jerusalem, Seeking Him

Panic sets in once Joseph and Mary realize Jesus is truly missing.

They retrace an entire day's journey, now moving with real urgency.

Losing a child, even briefly, is one of a parent's worst fears.

Their search shows how seriously they took the responsibility God had given them.

😟 Real panic follows the realization

🔙 They retrace a full day's travel

😨 Losing a child is a parent's worst fear

📖 Their search shows real responsibility

# Luke 2:46-52
# 📖 Found In The Temple
---
## 📆 After Three Days They Found Him In The Temple

One day was lost before they even began searching Jerusalem itself.

Searching a crowded festival city for one missing child took real time.

Three full days of fear finally ended in the most obvious place, the temple.

The place devoted to God was exactly where they should have looked first.

📆 Three days covers the lost search time

🏙️ Jerusalem was crowded with festival crowds

⛪ The temple was the obvious answer

📖 God's house held the missing child

---
## 🧑‍🏫 Sitting In The Midst Of The Doctors, Both Hearing Them, And Asking Them Questions

Doctors here means respected teachers of the Jewish law, not medical doctors.

Jesus sits among them as a student, not as a lecturer correcting them.

He listens carefully and asks real, thoughtful questions.

This is not a twelve year old showing off in front of experts.

🧑‍🏫 Doctors means teachers of the law

👂 Jesus listens, he does not lecture

❓ He asks real, thoughtful questions

📖 A humble student, not a show off

---
## 😲 All That Heard Him Were Astonished At His Understanding And Answers

Trained religious scholars are the ones left amazed here, not ordinary people.

A twelve year old is matching wisdom with men who studied the law for decades.

Luke does not say Jesus claimed any special authority over them yet.

His understanding alone is enough to astonish everyone listening.

😲 Trained scholars are the ones amazed

🧠 A boy matches decades of study

🙅 No claim of authority is made yet

📖 Understanding alone astonished the room

---
## 😟 Thy Father And I Have Sought Thee Sorrowing

Mary calls Joseph thy father here in the normal, everyday sense.

This does not contradict Jesus being conceived by the Holy Spirit.

Joseph was his legal and adoptive father in every practical way.

Sorrowing shows real grief, not simple annoyance at an inconvenience.

😟 Father here means Joseph legally

🙏 This does not deny the virgin birth

👨 Joseph was his real, legal father

📖 Sorrowing reveals real parental grief

---
## ❓ Wist Ye Not That I Must Be About My Father's Business

Wist is an old word for knew.

These are the very first words of Jesus recorded anywhere in scripture.

My Father's business points to God, not to Joseph at all.

At twelve years old, Jesus already understood his unique relationship with God.

❓ Wist means knew

🗣️ His first recorded words in scripture

🙏 Father here means God, not Joseph

📖 He already knew his true identity

---
## 🤷 They Understood Not The Saying Which He Spake Unto Them

Even Mary and Joseph do not fully grasp what Jesus just said.

Understanding who Jesus truly is would take them more time to develop.

Scripture is honest here instead of pretending they understood everything already.

Faith can hold real mystery without having every answer figured out yet.

🤷 Even his parents did not fully understand

⏳ Understanding him would take more time

📜 Scripture admits this honestly

📖 Faith can hold real mystery

---
## 🏡 He Went Down With Them, And Was Subject Unto Them

Subject means obedient, willingly placed under someone else's authority.

Jesus, though fully God, chooses to obey his human parents at home.

Eighteen quiet, unrecorded years follow this one verse in Jesus's life.

Real greatness here looks like ordinary obedience, not public power.

🏡 Subject means willingly obedient

🙏 God the Son obeys human parents

⏳ Eighteen quiet years follow this verse

📖 Greatness looked like quiet obedience

---
## 💭 His Mother Kept All These Sayings In Her Heart

This exact description of Mary already appeared once before, in verse nineteen.

She continues holding onto details that confuse her instead of forgetting them.

Many scholars believe Mary herself was a direct source for Luke's careful account.

Her quiet memory likely helped preserve this whole story for later generations.

💭 This repeats Mary's pattern from verse nineteen

🧠 She holds onto what confuses her

📝 Mary may be Luke's own source

📖 Her memory helped preserve this story

---
## 🌱 Jesus Increased In Wisdom And Stature, And In Favour With God And Man

This one verse covers eighteen hidden years in Jesus's life.

Wisdom points to his mind, stature points to his body growing up.

Favour with God and favour with man cover his spiritual and social growth.

Jesus grew in every real way a normal human being grows.

🌱 Wisdom and stature mean mind and body

🙏 Favour with God means spiritual growth

🤝 Favour with man means social growth

📖 Jesus grew in every human way
`.trim();

export const LUKE_TWO_PERSONAL_SECTIONS = parseLukeTwoRawNotes(LUKE_TWO_RAW_NOTES);
