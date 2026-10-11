export type ActsTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseActsTwoRawNotes(rawText: string): ActsTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ActsTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Acts\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Acts 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Acts\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Acts\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Acts 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Acts 2:${startVerse}` : `Acts 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Acts 2 sections, received " + sections.length);
  }

  return sections;
}

const ACTS_TWO_RAW_NOTES = `# Acts 2:1-4
# 🔥 The Spirit Poured Out
---
## 📅 The Day Of Pentecost Was Fully Come

"Pentecost" means fiftieth, counted fifty days after Passover.

It was also called the Feast of Weeks, one of the required pilgrimage feasts.

Jewish families traveled from everywhere to be in Jerusalem for it.

That is why the next few verses list so many different nations.

"Fully come" means the exact day had arrived, not early, not late.

God chose this crowded feast day on purpose.

📅 Pentecost means the fiftieth day
🌾 It was the Feast of Weeks
🧳 Pilgrims filled Jerusalem for it
📖 God timed this for the biggest crowd

## 👥 They Were All With One Accord In One Place

"They" points back to the same group gathered in chapter one.

That group numbered about one hundred twenty believers, not just the eleven apostles.

"One accord" means united, praying and waiting with a single shared purpose.

They were still together in the same place, likely the same upper room.

Whatever happens next happens to a waiting, united community, not to scattered people.

👥 They means the whole waiting group
🔢 About one hundred twenty people
🙏 One accord means united purpose
📖 God moves on a united people

## 💨 A Sound From Heaven As Of A Rushing Mighty Wind

The Hebrew and Greek words for Spirit also mean wind or breath.

This sound is not actual wind moving branches outside.

It is a sound like wind, loud and sudden.

It fills the whole house at once.

The same word pictures God breathing life into Adam in Genesis.

Here that same breath fills a whole room of people together.

💨 Spirit and wind share one word
🏠 The sound filled the whole house
🫁 It echoes God's breath in Genesis
📖 God breathes life into them again

## ✂️ Cloven Tongues Like As Of Fire

"Cloven" means split or divided into separate parts.

This was not one single flame but many small tongues of fire.

Fire in scripture often marks God's own presence, like the burning bush or Sinai.

Here that same fire does not burn the people.

It rests on them instead.

✂️ Cloven means split apart
🔥 Fire marks God's own presence
🕊️ The fire did not burn them
📖 Every person received a visible share

## 👤 It Sat Upon Each Of Them

This was not one general glow hovering over the whole crowd.

"Each of them" means every single person received their own flame.

God's presence here is personal, not just shared across the group.

The same Spirit that filled the group also filled every person inside it.

No one in the room was left out of this moment.

👤 Each one received a personal flame
🙅 This was not a shared glow
🧍 God's presence reached every person
📖 No one in the room was left out

## 🕊️ They Were All Filled With The Holy Ghost

"Holy Ghost" is an older English way of saying Holy Spirit.

John had baptized with water, a sign of turning from sin.

Jesus promised back in chapter one that something greater was coming soon.

This filling means the Spirit now lives inside each believer.

The Spirit no longer stays just near them.

🕊️ Holy Ghost means Holy Spirit
💧 John's baptism was only water
🔥 This filling is greater than water
📖 Chapter one's promise is fulfilled here

## 🗣️ Began To Speak With Other Tongues, As The Spirit Gave Them Utterance

"Other tongues" means real human languages, not a private, made up speech.

"Utterance" means the specific words themselves, given to them in that moment.

The next verses prove this, since foreign visitors recognize their own native languages.

The Spirit supplies both the ability to speak and the actual words spoken.

This miracle lets the gospel reach people in the language they know best.

🗣️ Tongues means real languages
📝 Utterance means the words given
👂 Visitors recognize their own language
📖 The gospel reaches people in their own tongue

# Acts 2:5-9
# 🗣️ Every Man In His Own Tongue
---
## 🙏 Dwelling At Jerusalem Jews, Devout Men

"Devout" means sincerely committed to worshipping God.

These were Jews who had settled permanently in Jerusalem, not just visiting pilgrims.

Many had come from distant lands generations earlier to live near the temple.

Their sincerity is named here on purpose, before the miracle even happens.

God's sign is first seen by people who already wanted to know him.

🙏 Devout means sincerely committed
🏙️ These Jews lived in Jerusalem
🌍 Many came from distant lands
📖 God reaches sincere hearts first

## 🌐 Out Of Every Nation Under Heaven

This phrase is not a literal list of every nation on earth.

It means a very wide and remarkable range of places, far more than usual.

The list in the next few verses shows how wide that range really was.

Jerusalem at Pentecost gathered Jews from across the whole known world.

That wide gathering is exactly why this miracle could be seen so broadly.

🌐 Not literally every nation
🗺️ It means a remarkable range
🧳 Jews gathered from the whole known world
📖 A wide crowd means wide witnesses

## 📣 Noised Abroad, The Multitude Came Together

"Noised abroad" means word spread quickly through the city.

Something this loud and strange could not stay quiet for long.

A crowd gathered fast, drawn by the sound alone.

Understanding came only once they arrived and listened closely.

Curiosity brought them first.

📣 Noised abroad means word spread fast
👥 A crowd gathered quickly
❓ Curiosity brought them first
📖 Understanding came only after they came close

## 😵 Confounded, Because Every Man Heard Them Speak In His Own Language

"Confounded" means thrown into confusion, unable to make sense of what is happening.

Each visitor heard the message in their own native language at the same moment.

A group of Galilean fishermen had no natural way to know these many languages.

That is exactly what made the moment so clearly supernatural.

😵 Confounded means thrown into confusion
👂 Each heard their own language
🎣 Galilean fishermen knew no such languages
📖 Only God could explain this moment

## 🌾 Are Not All These Which Speak Galilaeans

Galilee carried a reputation as a plain, unpolished region, far from Jerusalem's culture.

A Galilean accent was easy to recognize and easy to look down on.

The crowd is stunned that people from that overlooked region can speak so many languages.

God again chooses ordinary, unimpressive people to carry an extraordinary message.

🌾 Galilee had a plain reputation
🗣️ Their accent was easy to spot
😲 The crowd is stunned by them
📖 God uses overlooked people for great things

## 🏠 Every Man In Our Own Tongue, Wherein We Were Born

"Wherein we were born" means the language learned first, as a child, at home.

This was not a shared trade language like the Greek used across the empire.

Each person heard their deepest, most familiar language.

That detail makes the miracle personal, not just impressive.

🏠 Born language means the first one learned
🌍 Not just a shared trade language
❤️ Each heard their most familiar tongue
📖 The miracle reached them personally

## 🗺️ Parthians, And Medes, And Elamites, And The Dwellers In Mesopotamia

This list begins a roll call of nations, starting east of Israel.

Parthia, Media, and Elam sat in the region of modern Iran.

Mesopotamia lay further west, the land between the Tigris and Euphrates rivers.

Luke is tracing a map, moving region by region across the known world.

A Jewish community had scattered into every one of these distant places long before.

🗺️ Luke traces the map eastward first
📍 Parthia, Media, Elam sit near Iran
🏞️ Mesopotamia lay between two rivers
📖 Jews had scattered into all these lands

## 🏡 In Judaea, And Cappadocia, In Pontus, And Asia

Judaea was home territory, right around Jerusalem itself.

Cappadocia, Pontus, and Asia were regions in what is now Turkey.

Luke's map keeps moving, sweeping north and west from Israel.

These were real Roman provinces, familiar names to anyone trading in that world.

🏡 Judaea was the home region
🗺️ Cappadocia, Pontus, Asia sit in Turkey
🧭 The map sweeps north and west
📖 These were real, known Roman provinces

# Acts 2:10-13
# ❓ What Meaneth This
---
## 🏺 Phrygia, And Pamphylia, In Egypt, And In The Parts Of Libya About Cyrene

Phrygia and Pamphylia were also regions of Asia Minor, modern Turkey.

Egypt held one of the largest Jewish populations outside the land of Israel.

Cyrene sat along the coast of modern Libya, in North Africa.

Luke's list now reaches all the way into Africa.

🗺️ Phrygia and Pamphylia sit in Turkey
🏺 Egypt held a huge Jewish population
🌍 Cyrene sat in North Africa
📖 The list now spans into Africa

## 🏛️ Strangers Of Rome, Jews And Proselytes

"Strangers of Rome" means Jewish visitors who had traveled from the city of Rome itself.

"Proselytes" means Gentiles who had fully converted to the Jewish faith.

This is the most surprising name on the whole list.

Even non Jewish converts to Judaism are standing in this crowd, hearing this message.

The circle of people included is already wider than anyone expected.

🏛️ Strangers of Rome traveled from Italy
🔄 Proselytes were Gentile converts
😲 Even converts stand in this crowd
📖 The circle is wider than expected

## 🏝️ Cretes And Arabians, We Do Hear Them Speak In Our Tongues The Wonderful Works Of God

Crete was an island in the Mediterranean, and Arabia lay south and east of Israel.

The list finally closes, having circled through most of the known world.

Notice what they actually heard, the wonderful works of God, not random noise.

The miracle was not just language.

It was worship, spoken in every tongue at once.

🏝️ Crete and Arabia close the list
🌐 The list circles the known world
🙌 They heard the wonderful works of God
📖 Worship broke out in every language

## ❓ Amazed, And Were In Doubt, Saying, What Meaneth This

"What meaneth this" is the honest question sitting underneath the whole scene.

The crowd cannot deny what they are hearing.

They cannot explain it either.

Amazement and doubt sit side by side in the very same people.

Peter's sermon, starting in the next verses, answers this exact question directly.

❓ What meaneth this is the real question
😲 Amazement and doubt sit together
🙋 The crowd cannot explain it
📖 Peter's sermon answers this question next

## 🍷 Others Mocking Said, These Men Are Full Of New Wine

"New wine" means freshly made wine, sweet and strong, often blamed for drunken behavior.

Some in the crowd choose mockery instead of honest wonder.

Blaming wine was an easy way to dismiss something they did not want to believe.

Peter answers this specific accusation first, before he says anything else.

🍷 New wine means freshly made wine
😏 Mockery dismissed the miracle
🙅 It was an easy excuse
📖 Peter answers this accusation first

# Acts 2:14-21
# 📜 Peter Quotes The Prophet Joel
---
## 🗣️ Peter, Standing Up With The Eleven

Peter steps forward as the group's spokesman, with the other eleven apostles beside him.

This is the same Peter who had denied knowing Jesus just weeks earlier.

That failure has not disqualified him from leading now.

Jesus had restored him personally after the resurrection, and this moment proves it.

A forgiven failure can still become a bold voice later.

🗣️ Peter speaks for the group
😔 He had denied Jesus before
✝️ Jesus had already restored him
📖 Forgiveness can lead to boldness later

## 🕘 These Are Not Drunken, As Ye Suppose, Seeing It Is But The Third Hour Of The Day

"The third hour" means about nine in the morning, counted from sunrise.

That was far too early in the day for the drunkenness being suggested.

Peter answers the mockery from verse thirteen with a simple fact, not an insult.

A clear head, not wine, explains everything the crowd is seeing.

🕘 Third hour means about nine in the morning
🍷 Too early for real drunkenness
🧠 Peter answers with a simple fact
📖 A clear mind explains this moment

## 📜 This Is That Which Was Spoken By The Prophet Joel

Peter does not claim something brand new is happening out of nowhere.

He points straight back to a prophecy written centuries earlier by Joel.

This moment fulfills an old promise rather than replacing it.

Peter will use this same method, scripture first, again later in this sermon.

📜 Peter quotes the prophet Joel
⏳ Joel wrote centuries earlier
🔗 This fulfills an old promise
📖 Scripture explains the moment first

## ⏳ In The Last Days, Saith God, I Will Pour Out Of My Spirit Upon All Flesh

"The last days" means the whole period beginning with the Messiah's coming.

That is not some far off future.

That long age had just begun, right there in that room.

"All flesh" means every kind of person, breaking past narrow boundaries.

God's Spirit would no longer be reserved for a small, chosen few.

⏳ Last days began with the Messiah
🌍 All flesh means every kind of person
🚪 The Spirit was no longer limited
📖 God opens access to everyone

## 👩 Your Sons And Your Daughters Shall Prophesy

In that culture, prophecy was usually expected only from a few select men.

Joel's prophecy includes daughters right alongside sons, without distinction.

Women receiving the Spirit this openly was a striking change for that world.

God's new work treats men and women as equally able to speak for him.

👩 Daughters are included, not just sons
📢 Prophecy was usually a male role
🆕 This was a striking change
📖 God gives both equal voice

## 👦 Your Young Men Shall See Visions, Your Old Men Shall Dream Dreams

Joel's words now cross the line of age as well as the line of gender.

Both the young and the old receive the same Spirit, in different forms.

Visions often came as waking pictures.

Dreams came during sleep.

No stage of life is left outside of what God is doing.

👦 Young men see visions
👴 Old men dream dreams
🔄 Both receive the same Spirit
📖 No age is left outside this work

## ⛓️ On My Servants And On My Handmaidens I Will Pour Out In Those Days Of My Spirit

"Servants" and "handmaidens" refer to bondservants, people owned by someone else in that culture.

Even people at the very bottom of the social order receive this same Spirit.

Status, wealth, and freedom make no difference to this promise.

Joel's words reach every layer of society Peter's listeners could imagine.

⛓️ Servants means bondservants
🚫 Status made no difference here
🙌 Even the lowest receive the Spirit
📖 Every layer of society is included

## ⚡ I Will Shew Wonders In Heaven Above, And Signs In The Earth Beneath

This kind of language appears often in the Old Testament prophets.

It describes dramatic events meant to announce that God is acting.

"Blood, and fire, and vapour of smoke" paints a scene like a city under siege.

The images were meant to feel urgent to the people hearing them.

They were never meant as a weather report.

⚡ This is prophetic, dramatic language
🩸 Blood and fire signal judgment
🏙️ It reads like a city under siege
📖 The urgency is the point

## 🌑 The Sun Shall Be Turned Into Darkness, And The Moon Into Blood

This is not a weather forecast for that exact afternoon.

Prophets regularly used darkened skies to picture a dramatic shift in history.

The same kind of language appears in Isaiah and in the book of Revelation.

It marks a hinge point, the turning from one age into another.

🌑 Darkened skies are prophetic imagery
📜 Isaiah uses the same picture
🔄 It signals a hinge in history
📖 A new age is turning here

## 🚪 Whosoever Shall Call On The Name Of The Lord Shall Be Saved

"Whosoever" throws the door wide open, with no exceptions named.

Anyone, from any nation on the earlier list, qualifies simply by calling on the Lord.

This single line becomes the hinge of Peter's entire sermon.

Everything Peter says next builds toward this same invitation.

🚪 Whosoever means no exceptions
🌍 Anyone from any nation qualifies
🔑 This is the sermon's hinge
📖 Everything ahead leads back to this verse

# Acts 2:22-28
# ✝️ This Jesus, Whom Ye Crucified
---
## 🪙 Jesus Of Nazareth, A Man Approved Of God Among You

"Approved" means tested and certified as genuine, like a coin checked for its true value.

Peter is not asking the crowd to take this on blind faith.

He says plainly, "among you," reminding them they had seen this themselves.

Jesus's identity was proven publicly, not claimed in private.

🪙 Approved means tested as genuine
👀 Among you means they had seen it
🙅 This was not blind faith
📖 Jesus was proven in public

## 💪 By Miracles And Wonders And Signs, Which God Did By Him In The Midst Of You

"Miracles" points to acts of real power beyond normal human ability.

"Wonders" points to the awe those acts produced in the people who saw them.

"Signs" points to the deeper meaning behind each act, pointing toward God himself.

Together the three words describe one reality seen from three different angles.

💪 Miracles means acts of power
😲 Wonders means the awe they caused
👉 Signs means what they pointed to
📖 One reality, seen three ways

## 📝 Delivered By The Determinate Counsel And Foreknowledge Of God

"Determinate counsel" means a plan God decided on ahead of time.

"Foreknowledge" means God already knew exactly how events would unfold.

Jesus's death was not an accident that caught God by surprise.

The people involved still made real choices of their own.

Both truths stand together.

📝 Determinate counsel means a decided plan
🔮 Foreknowledge means God already knew
🙅 This was no accident
📖 God's plan and human choice both stood

## 👉 Ye Have Taken, And By Wicked Hands Have Crucified And Slain

Peter speaks directly to the very crowd standing in front of him.

He does not soften the charge or spread the blame thin.

"Ye" names the people listening as the ones responsible for this act.

This directness is bold, spoken in the same city where it happened weeks earlier.

👉 Ye names the listening crowd directly
🚫 Peter does not soften the charge
🏙️ This happened in this same city
📖 Peter speaks with real boldness

## 🤰 Whom God Hath Raised Up, Having Loosed The Pains Of Death

"Pains of death" pictures death gripping a person the way labor pains grip a mother.

"Loosed" means that grip was broken and released.

Death could not hold Jesus the way it holds every other person.

This turn, from accusation to resurrection, is the heart of Peter's message.

🤰 Pains of death pictures a grip
🔓 Loosed means that grip broke
⚰️ Death could not hold Jesus
📖 Resurrection is the heart of the message

## 📖 For David Speaketh Concerning Him

Peter now turns to a second piece of evidence, the writings of David.

He quotes directly from Psalm sixteen, a psalm David wrote himself.

Peter claims this psalm was never only about David's own life.

It was written, in part, to describe someone still to come.

📖 Peter quotes Psalm sixteen
✍️ David wrote the psalm himself
🔮 It points beyond David's own life
➡️ It describes someone still to come

## 🤝 I Foresaw The Lord Always Before My Face, For He Is On My Right Hand

"The right hand" was the position of a trusted helper, close and ready.

David pictures God constantly near him, steady through every danger.

Peter reads this as Jesus speaking through David's own words, by the Spirit.

A psalm about trust in God becomes a window into the Messiah's own confidence.

🤝 Right hand means a trusted helper
👁️ David pictures God always near
✝️ Peter hears Jesus in these words
📖 Trust becomes a window into the Messiah

## ⚰️ My Flesh Shall Rest In Hope

"Rest in hope" means the body would not simply end in decay and nothing more.

David is describing a confidence that death is not the final word.

Applied to Jesus, this points directly toward the resurrection still to come.

Hope here is not a wish.

It is a settled expectation.

⚰️ Rest in hope means more than decay
🔮 Death is not the final word
✝️ It points toward resurrection
📖 Hope here is a settled expectation

## 🙅 Neither Wilt Thou Suffer Thine Holy One To See Corruption

"Corruption" means the physical decay a dead body normally undergoes.

David's own body did decay, since he died and was buried.

Peter will say so plainly in the next verses.

So this promise could not have been fully about David himself.

Peter is building toward that exact point, verse by verse.

🙅 Corruption means physical decay
✍️ David's own body did decay
🚫 This was not about David alone
📖 Peter builds toward that very point

# Acts 2:29-36
# 👑 Both Lord And Christ
---
## 👴 Men And Brethren, Let Me Freely Speak Unto You Of The Patriarch David

"Patriarch" means a revered father figure, a founding ancestor of great honor.

Peter shows real respect before he says anything that might sound bold.

Calling David a patriarch reminds everyone how much authority his words carried.

What Peter says next will still correct a common assumption about this honored man.

👴 Patriarch means an honored ancestor
🙏 Peter shows respect first
👑 David's words carried real authority
📖 Even honored words get a correction here

## 🪦 He Is Both Dead And Buried, And His Sepulchre Is With Us Unto This Day

"Sepulchre" means tomb, the place where a body is laid to rest.

David's tomb could still be visited in Jerusalem when Peter spoke.

That fact alone proves Psalm sixteen could not describe David's own body.

If it were about David, his own tomb would stand as proof against it.

🪦 Sepulchre means tomb
📍 David's tomb still stood in Jerusalem
🙅 The psalm cannot be about his body
📖 The tomb itself proves the point

## 📜 Being A Prophet, And Knowing That God Had Sworn With An Oath To Him

This oath points back to God's promise to David in the book of second Samuel.

God had promised that David's own descendant would sit on his throne forever.

David wrote Psalm sixteen already trusting that exact promise.

Peter is tying two separate scriptures together into one single argument.

📜 This oath comes from second Samuel
👑 A descendant would rule forever
✍️ David trusted that promise already
📖 Peter ties two scriptures together

## 🌱 Of The Fruit Of His Loins, According To The Flesh, He Would Raise Up Christ To Sit On His Throne

"Fruit of his loins" is an old way of saying a direct bloodline descendant.

"Christ" is not a last name, it means the Anointed One, God's chosen king.

The promise named a future descendant who would sit on David's own throne.

Peter is identifying that descendant as Jesus, right in front of this crowd.

🌱 Fruit of his loins means a descendant
👑 Christ means the Anointed One
🪑 He would sit on David's throne
📖 Peter names Jesus as that one

## 🔮 He Seeing This Before Spake Of The Resurrection Of Christ

David wrote centuries before anyone could witness Jesus's resurrection.

"Seeing this before" means he glimpsed it ahead of time, as a prophet.

The words about an undecayed body could never describe David's own grave.

They point instead to the resurrection of Christ.

The psalm was always pointing past David toward someone greater.

🔮 David foresaw what was still to come
✍️ He wrote as a prophet, not a witness
✝️ The words describe Christ, not David
📖 The psalm pointed past David all along

## 👁️ This Jesus Hath God Raised Up, Whereof We All Are Witnesses

"Whereof we all are witnesses" means Peter and the other apostles personally saw the risen Jesus.

This is not secondhand rumor passed along through other people.

The apostles' whole message rests on their own eyes and their own hands.

Peter stakes his credibility, and soon his life, on this exact claim.

👁️ Witnesses means they saw it themselves
🙅 This was not secondhand rumor
✋ Their own eyes and hands confirm it
📖 Peter stakes everything on this claim

## 🔗 Having Received Of The Father The Promise Of The Holy Ghost, He Hath Shed Forth This

Peter now ties the whole sermon back to what the crowd is watching right then.

Jesus, now exalted beside the Father, is the one who sent the Spirit down.

"Shed forth" means poured out generously, not given in a small amount.

The strange scene from the start of the chapter is explained at last.

🔗 Peter ties this back to Pentecost
✝️ Jesus himself sent the Spirit
💧 Shed forth means poured out generously
📖 The strange scene is explained at last

## 🪦 For David Is Not Ascended Into The Heavens

Peter returns to David one more time, closing out his argument.

David's own body stayed on earth, buried in the tomb mentioned earlier.

That rules out David as the subject of the next verse Peter quotes.

Peter is building a careful, step by step case.

🪦 David's body stayed on earth
🙅 He never ascended to heaven
🔎 This rules David out again
📖 Peter builds his case carefully

## 👆 The Lord Said Unto My Lord, Sit Thou On My Right Hand, Until I Make Thy Foes Thy Footstool

This verse quotes Psalm one hundred ten, and it uses "Lord" twice with two meanings.

The first "LORD" is God the Father.

The second "Lord" is someone David calls his own master, greater than himself.

David would never call his own descendant his master in that culture.

Peter argues this proves the Messiah is more than simply David's human heir.

👆 This quotes Psalm one hundred ten
👇 The first Lord is God the Father
🤴 The second Lord is someone greater
📖 The Messiah is more than David's heir

## 🏆 Therefore Let All The House Of Israel Know Assuredly, That God Hath Made That Same Jesus Both Lord And Christ

"Assuredly" means with full certainty, leaving no room for doubt.

"Lord" names Jesus as the master David himself spoke of.

"Christ" names him as the promised, anointed king from David's own line.

Peter's entire sermon has been building toward this one sentence.

The same Jesus the crowd once mocked now holds both titles at once.

✅ Assuredly means full certainty
👑 Lord and Christ are two titles
🏆 This is the sermon's climax
📖 The mocked Jesus now holds both titles

# Acts 2:37-41
# 💧 Repent And Be Baptized
---
## 📌 When They Heard This, They Were Pricked In Their Heart

"Pricked" pictures a sharp, sudden pain, like a needle piercing skin.

This is not a gentle, comfortable feeling.

Peter's sermon cuts straight through the mockery from earlier in the chapter.

Conviction, not mere curiosity, is what finally moves this crowd.

📌 Pricked means sharp, sudden pain
😣 This is real conviction
🙅 It is not comfortable
📖 Conviction moves the crowd to act

## 🔄 Men And Brethren, What Shall We Do

Earlier in the chapter, some in this same crowd were mocking.

Now those same people are asking Peter what they should do next.

The question is honest and urgent, not a trap or a test.

A hard sermon has turned mockery into a real search for an answer.

🔄 Mockers now ask an honest question
❓ What shall we do is urgent
🙏 They are searching, not testing
📖 A hard sermon turned hearts

## 🔄 Repent, And Be Baptized Every One Of You

"Repent" means to turn around completely, not just feel sorry for a moment.

It means walking in a new direction, away from the old one.

Baptism here is the outward, public step that follows that inward turn.

Peter calls for an answer that is personal, not just something done as a crowd.

🔄 Repent means to turn around
🚫 It is more than feeling sorry
💧 Baptism follows that inward turn
📖 Every one means a personal response

## 📝 In The Name Of Jesus Christ For The Remission Of Sins

"Remission" means having a debt completely cancelled, not just reduced.

Baptism "in the name of Jesus Christ" ties this forgiveness directly to him.

This is the same forgiveness Peter has spent his whole sermon pointing toward.

The sermon's teaching lands here in one concrete, personal step.

📝 Remission means a cancelled debt
✝️ Forgiveness is tied to Jesus himself
🎯 The sermon's teaching lands here
📖 Theology becomes one concrete step

## 🎁 Ye Shall Receive The Gift Of The Holy Ghost

This is the exact same Spirit the apostles received earlier in this chapter.

What happened to one hundred twenty people in an upper room is now offered to everyone listening.

The gift is not limited to the apostles or to this one historic morning.

Joel's prophecy, quoted earlier, promised the Spirit poured out on all flesh.

🎁 The same Spirit is offered here
🔗 This connects back to verse four
🌍 It is not limited to the apostles
📖 Joel's promise reaches this crowd too

## 👶 The Promise Is Unto You, And To Your Children, And To All That Are Afar Off

"Your children" extends this promise forward into future generations.

"All that are afar off" extends it outward to people and nations not yet reached.

Peter may not fully grasp it yet, but this includes Gentiles far beyond Israel.

The circle keeps widening, verse after verse, further than anyone in the room expects.

👶 Your children reaches future generations
🌍 Afar off reaches distant nations
🚪 Gentiles are quietly included here
📖 The circle keeps widening

## 🌀 Save Yourselves From This Untoward Generation

"Untoward" means crooked, stubborn, resistant to what is right.

Peter is describing the spiritual condition of his own generation, plainly and without flattery.

"Save yourselves" is urgent language, pressing for a decision now, not later.

The invitation and the warning arrive together in the very same breath.

🌀 Untoward means crooked and stubborn
⏰ Save yourselves presses for urgency
🙅 Peter does not flatter his generation
📖 Invitation and warning arrive together

## ➕ The Same Day There Were Added Unto Them About Three Thousand Souls

"Added" becomes a key word used again and again throughout the book of Acts.

Three thousand people responding in a single day is a massive, sudden harvest.

This church did not grow slowly through years of careful planning.

It began with a single sermon and an honest, repentant crowd.

➕ Added is a key word in Acts
🔢 Three thousand responded in one day
⚡ The growth was sudden, not slow
📖 One sermon started this whole harvest

# Acts 2:42-47
# 🍞 The Church Devoted Together
---
## 🧱 They Continued Stedfastly In The Apostles' Doctrine And Fellowship

"Stedfastly" is an old spelling of steadfastly, meaning firm and unwavering over time.

"Doctrine" here means the apostles' actual teaching about Jesus, passed on directly from them.

"Fellowship" means shared life together, not just a list of beliefs held separately.

This new church builds itself on both solid teaching and real relationship.

🧱 Stedfastly means firm over time
📖 Doctrine means the apostles' own teaching
🤝 Fellowship means shared life together
➡️ Teaching and relationship grow side by side

## 🍞 And In Breaking Of Bread, And In Prayers

"Breaking of bread" likely points to both ordinary shared meals and the Lord's supper.

In that culture, eating together was a deep sign of belonging to one family.

"Prayers" names regular, shared times of prayer, not just private moments alone.

Four simple habits, teaching, fellowship, bread, and prayer, shaped this early church.

🍞 Breaking bread meant shared meals
🕊️ It likely included the Lord's supper
👨‍👩‍👧 Shared meals signaled belonging
📖 Four habits shaped the whole church

## 😮 Fear Came Upon Every Soul

"Fear" here does not mean terror or dread.

It means a deep, reverent awe at what God was clearly doing among them.

That awe touched every single person, not just the leaders.

A healthy church begins with genuine wonder at God, not casual comfort.

😮 Fear here means reverent awe
🙅 Not terror or dread
👥 It touched every soul present
📖 Wonder at God came before comfort

## ✨ Many Wonders And Signs Were Done By The Apostles

These are the same kind of miracles Jesus himself performed throughout the Gospels.

The apostles now carry that same work forward in his name.

This continues what Peter already preached earlier about Jesus's own miracles.

The ministry of Jesus did not end when he ascended into heaven.

✨ The same miracles Jesus did
👥 Now carried on by the apostles
🔗 This echoes Peter's earlier sermon
📖 Jesus's ministry continued through them

## 🤲 All That Believed Were Together, And Had All Things Common

"Had all things common" means believers shared their possessions freely with one another.

This was not a forced system imposed by any ruler or law.

It grew naturally out of real love and real need inside this new community.

Generosity became one of the clearest marks of this new kind of family.

🤲 Common means freely shared
🙅 Not a forced system
❤️ It grew out of real love
📖 Generosity marked this new family

## 💰 Sold Their Possessions And Goods, And Parted Them To All Men, As Every Man Had Need

This giving was not divided equally into identical shares for everyone.

"As every man had need" means the gift matched each person's actual situation.

Some sold land or houses specifically to meet a need right in front of them.

The goal was care for real people, not a flat, mechanical rule.

💰 Giving matched actual need
🙅 Not an equal split for everyone
🏡 Some sold land or houses
📖 Real care, not a flat rule

## 🏛️ Continuing Daily With One Accord In The Temple

This brand new church still worshipped daily inside the Jewish temple.

They had not yet separated from their own Jewish roots and community.

"One accord" echoes the same unity seen back in verse one of this chapter.

Something genuinely new was growing up quietly inside something very old and familiar.

🏛️ They still worshipped at the temple
🌱 They had not yet separated from Judaism
🔗 One accord echoes verse one
📖 Something new grew inside something old

## 🏠 Breaking Bread From House To House, Did Eat Their Meat With Gladness And Singleness Of Heart

"House to house" shows this community met in homes, not only in the temple courts.

"Singleness of heart" means sincerity, with no hidden motives or pretending.

"Gladness" names the genuine joy running through these shared, ordinary meals.

Big public worship and small shared meals both mattered to this early church.

🏠 House to house means home gatherings
💗 Singleness of heart means sincerity
😊 Gladness marked their shared meals
📖 Both public worship and home life mattered

## 🙌 The Lord Added To The Church Daily Such As Should Be Saved

This verse echoes the three thousand added back in verse forty one.

Growth here is credited to the Lord, not to any clever human strategy.

"Daily" shows this was not a one time surge that quickly faded away.

The chapter that opened with wind and fire closes with a steady, growing church.

🔗 This echoes verse forty one
🙌 The Lord gets credit for growth
📅 Daily shows it did not fade
📖 Fire and wind become a steady church
`.trim();

export const ACTS_TWO_PERSONAL_SECTIONS = parseActsTwoRawNotes(ACTS_TWO_RAW_NOTES);
