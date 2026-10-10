export type JohnFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJohnFourRawNotes(rawText: string): JohnFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JohnFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*John\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing John 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+John\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+John\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing John 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `John 4:${startVerse}` : `John 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 John 4 sections, received " + sections.length);
  }

  return sections;
}

const JOHN_FOUR_RAW_NOTES = `# John 4:1-6
# 🚶 Wearied At Jacob's Well
---

## 📈 Jesus Made And Baptized More Disciples Than John

This does not mean Jesus personally baptized every new follower.

His disciples carried out the actual baptisms.

The Pharisees were tracking how fast his following grew.

John the Baptist's own ministry was already shrinking by comparison.

Jesus moves on before that tension can boil over.

👥 Disciples carried out the actual baptisms
👀 Pharisees tracked his growing following
📉 John's ministry was already shrinking
➡️ Jesus moves on before tension grows

## 🛤️ He Must Needs Go Through Samaria

This does not mean Samaria was the only route to Galilee.

Most Jews avoided this shorter path on purpose.

They crossed the Jordan River to go around it instead.

Jews and Samaritans shared one ancestry long ago.

That shared history had split apart centuries earlier.

Jesus chooses the harder road instead of the usual detour.

🛤️ Most Jews avoided this shorter path
🌊 They crossed the Jordan instead
⚔️ Shared ancestry had split apart
➡️ Jesus chooses the harder road

## 🗺️ The Parcel Of Ground That Jacob Gave

This plot of land goes back generations before this chapter.

Jacob originally bought this ground.

He later gave it to his son Joseph.

Genesis forty eight records that very gift.

Sychar sat right beside that inherited land.

A quiet patch of family history becomes the backdrop here.

🗺️ This land traces back to Jacob
👨‍👦 Jacob gave it to Joseph
📜 Genesis forty eight records that gift
📖 Old family history sets this scene

## 😓 Wearied With His Journey

Jesus grows genuinely tired, just like anyone else would.

His full humanity is on display here, not only his power.

He sits down at the well instead of pushing further.

The sixth hour in Jewish time reckoning lands near noon.

The hottest part of the day is exactly when this happens.

😓 Jesus grows genuinely tired
🙋 His humanity shows plainly here
🪑 He sits down to rest
📖 Noon sets the scene

## 🕛 About The Sixth Hour

The sixth hour counts hours forward from the start of the day.

Many scholars believe this means around noon, under full sun.

Most women drew water in the cool morning or evening.

Coming alone at this hour hints she wanted to avoid the crowd.

Her isolation becomes a quiet clue long before the reason is explained.

🕛 Sixth hour likely means noon
☀️ That was the hottest hour
🚺 Most women drew water earlier
➡️ Her timing hints at isolation

# John 4:7-9
# 💧 Ask Me For A Drink
---

## 🚺 There Cometh A Woman Of Samaria To Draw Water

She comes to the well completely alone.

She comes in the heat of the day.

That timing matches the unusual hour, away from the other women.

A solitary trip like this often meant avoiding questions.

John lets this detail sit quietly before her story unfolds later.

🚺 She comes to the well alone
🕛 Her timing was unusual
🙈 Solitude often meant avoiding people
➡️ Her full story unfolds soon

## 🥤 Give Me To Drink

A Jewish rabbi speaking to a woman alone was already unusual.

Speaking to a Samaritan woman crossed an even bigger line.

Jesus asks her for a simple favor instead of a lecture.

That small, human request opens the door to a much bigger conversation.

🗣️ A rabbi rarely spoke to women alone
⚔️ She was also a Samaritan
🥤 Jesus simply asks for water
➡️ A small request opens a big conversation

## 📜 The Jews Have No Dealings With The Samaritans

This rivalry went back hundreds of years before this conversation.

Samaritans descended from intermarriage after Israel's exile centuries earlier.

They worshipped God on Mount Gerizim instead of Jerusalem's temple.

Jews generally viewed them as impure in both religion and ancestry.

The woman is stunned that Jesus would even speak to her.

📜 The rivalry stretched back centuries
🧬 Samaritans came from intermarriage
⛰️ They worshipped on Mount Gerizim instead
📖 Jesus crosses that old divide anyway

# John 4:10-15
# 💧 Living Water Offered
---

## 🎁 If Thou Knewest The Gift Of God

Gift here means something freely offered, never something earned.

Jesus hints that she has no idea who is really sitting beside her.

The whole exchange is about to flip completely.

She came expecting to give him water.

She is about to receive something far greater instead.

🎁 Gift means freely given
❓ She does not know who he is
🔄 The exchange is about to flip
📖 She will receive more than she gives

## 🌊 Living Water

Living water meant fresh, flowing water, like a spring or stream.

Stored well water sat still and eventually grew stale.

Jesus uses that everyday difference to point toward something spiritual.

The picture itself is ordinary.

The meaning underneath it is not.

🌊 Living water means fresh, flowing water
🪣 Well water sat still and stale
💭 Jesus points to something spiritual
📖 An ordinary picture holds a deep meaning

## 👴 Art Thou Greater Than Our Father Jacob

She still hears this only as talk about well water.

Jacob was a shared ancestor, honored by both Jews and Samaritans.

Her question carries real pride in her own family history.

She has no idea yet who she is really facing.

Jesus will soon answer her question more directly than she expects.

🤔 She still thinks only of well water
👴 Jacob was honored by both peoples
🏺 Her pride in this well is real
➡️ She does not know who she faces

## 🚱 Shall Never Thirst

Jesus is not promising she will stop needing actual water.

He means a thirst for meaning that nothing else can satisfy.

People chase many things trying to fill that same deep need.

Only what Jesus gives actually reaches it.

🚱 Not a promise about physical water
❤️‍🔥 It means a deeper thirst
🔍 People search many places for it
📖 Only Jesus truly satisfies it

## ⛲ A Well Of Water Springing Up Into Everlasting Life

A spring that bubbles up never needs to be refilled.

Jesus describes a source planted inside a believer.

Think of water rising up from underground instead of a bucket hauled from above.

Something given to you once differs from something alive inside you.

This is the life Jesus offers that never runs dry.

⛲ A spring needs no refilling
🌱 Life is planted inside the believer
🪣 Not a bucket carried from outside
📖 This life never runs dry

## 💧 Sir, Give Me This Water

She still wants this only to skip her daily trip to the well.

Her request is sincere but entirely practical right now.

She has not yet grasped that Jesus means something spiritual.

Jesus is about to shift the conversation somewhere she does not expect.

🥤 She wants an easier chore
🧠 Her request stays practical
❓ She misses the spiritual offer
➡️ Jesus shifts the conversation next

# John 4:16-19
# 👫 Five Husbands
---

## 🔀 Go, Call Thy Husband

Jesus suddenly changes the subject from water to her personal life.

This shift is not random.

He already knows exactly who she is.

The request tests whether she will answer honestly.

Her next words reveal she is only partly ready to.

🔀 The subject suddenly shifts
👁️ Jesus already knows her story
🧪 This is a test of honesty
➡️ Her answer is only partly true

## 🤏 I Have No Husband

This answer is technically true but leaves out the full story.

Jesus does not call her a liar.

He affirms what she said.

Then he adds what she left out.

His gentleness and his honesty show up in the very same sentence.

🤏 Her answer leaves out the truth
🚫 Jesus does not call her a liar
➕ He adds what she left out
📖 Gentleness and honesty meet in one sentence

## 💍 Thou Hast Had Five Husbands

Five marriages ending was rare and would have marked her publicly.

The text never says whether this came from death or divorce.

It does not call her an adulteress outright.

Her current situation without marriage added another layer of shame.

Jesus states hard facts without a single word of condemnation.

💍 Five marriages marked her publicly
❓ The text does not say why
🚫 Jesus never calls her an adulteress
📖 He states facts without condemning her

## 😮 I Perceive That Thou Art A Prophet

She shifts from surprise to genuine respect in a single sentence.

No ordinary stranger could know a hidden history like hers.

Prophet was the closest category she had for a man like this.

Her next question will test what kind of prophet he really is.

😮 Her surprise turns to respect
🔍 A stranger could not know this
🏷️ Prophet was her best category for him
➡️ Her next question tests that further

# John 4:20-24
# ⛰️ True Worship
---

## ⛰️ Our Fathers Worshipped In This Mountain

This mountain refers to Mount Gerizim, the Samaritan center of worship.

Samaritans built their own temple there after splitting from Jerusalem.

She raises this old debate instead of answering his last question.

Changing the subject to religion was a common way to dodge something personal.

⛰️ This mountain means Gerizim
🏛️ Samaritans built a rival temple there
🔀 She changes the subject on purpose
➡️ Religion becomes a way to dodge him

## 🗺️ Neither In This Mountain, Nor Yet At Jerusalem

Jesus does not settle the old argument between the two mountains.

He says the whole argument is about to become irrelevant.

True worship is about to move away from one physical location.

A new era is coming where place stops being the point.

🗺️ Jesus skips the mountain debate
⏳ The argument is about to end
🌍 Worship is leaving one location
📖 A new era is coming

## 📜 Salvation Is Of The Jews

Jesus affirms that Israel carried God's true revelation.

Samaritans had kept only part of the Hebrew scriptures.

The Messiah was always promised to come through the Jewish line.

That promise is standing in front of her at this very moment.

📜 Israel carried God's full revelation
📖 Samaritans kept only part of scripture
👑 The Messiah comes through the Jews
➡️ That promise stands before her now

## ❤️ Worship The Father In Spirit And In Truth

Spirit means worship that comes from the heart, not a building.

Truth means worship that lines up with who God actually is.

Location stops mattering once both of those are present.

God is not hunting for a mountain.

He is hunting for hearts like this one.

❤️ Spirit means worship from the heart
✅ Truth means worship that matches God
📍 Location no longer matters
📖 God seeks hearts, not mountains

## 👻 God Is A Spirit

Spirit here means God has no physical body to visit one place.

That is exactly why no single mountain could ever contain him.

A being like that can be worshipped anywhere, by anyone.

This truth breaks open the whole argument she started.

👻 Spirit means no physical body
🚫 No mountain could contain him
🌍 He can be worshipped anywhere
📖 This truth breaks her whole argument

# John 4:25-26
# ✝️ I Am He
---

## 📿 I Know That Messias Cometh

Samaritans expected a coming Messiah too, often called the Taheb.

They pictured him mainly as a teacher like Moses, not a king.

She retreats to a safe, future hope instead of facing this moment.

She keeps her answer comfortably far away.

📿 Samaritans expected their own Messiah
📚 They pictured a teacher like Moses
🔭 She pushes the hope into the future
➡️ She keeps the moment at a distance

## 🎯 I That Speak Unto Thee Am He

Jesus answers her safe, distant hope with a direct claim.

He rarely states his identity this plainly anywhere else in the gospels.

He chooses to reveal it here, to a Samaritan woman with a complicated past.

The Messiah she pushed into the future is standing in front of her right now.

🎯 Jesus answers with a direct claim
🗣️ He rarely states this so plainly
🚺 He reveals it to her, of all people
📖 The future hope stands before her now

# John 4:27-30
# 🏃 Running Back To Town
---

## 😮 Marvelled That He Talked With The Woman

A rabbi was not expected to speak alone with any woman in public.

Talking with a Samaritan woman doubled their surprise.

Even so, none of the disciples dares to ask Jesus why.

Their silence shows how much respect, or fear, he commanded.

😮 A rabbi rarely spoke to women alone
⚔️ She was also a Samaritan
🤐 None of them questions him
📖 Their silence shows his authority

## 🏺 Left Her Waterpot

She came to the well for one simple reason, to fill this jar.

She leaves without it, forgetting the very thing she came for.

A changed priority shows up in a small, physical detail.

What she just heard mattered more to her than finishing her chore.

🏺 She came only for water
🏃 She leaves the jar behind
🔄 Her priorities just changed
📖 This news mattered more than her chore

## 🏘️ Come, See A Man

She runs straight back into the town she likely avoided at midday.

Her own reputation is the very thing she risks by speaking up now.

She invites the whole town to come judge for themselves.

Her testimony starts a chain reaction before Jesus says another word.

🏘️ She returns to the town she avoided
⚠️ Her own reputation is at risk
👥 She invites everyone to come see
➡️ Her words start a chain reaction

## ❓ Is Not This The Christ

Her question is not full certainty yet.

It still carries a hopeful, searching tone.

A woman the town may have avoided becomes its first messenger.

God often uses the last person anyone would expect.

❓ Her question is still searching
🌱 Hope is beginning to grow
🚺 An unlikely woman becomes the messenger
📖 God often chooses the unexpected

# John 4:31-38
# 🌾 A Ready Harvest
---

## 🍞 Master, Eat

The disciples return carrying food.

They worry that Jesus has not eaten all day.

Their concern is practical and genuinely caring.

They have no idea what just happened at this well.

A deep spiritual moment and an ordinary meal collide in the same verse.

🍞 Disciples bring food back
💛 Their concern is caring
❓ They missed what just happened
📖 The spiritual and ordinary collide here

## 🍽️ I Have Meat To Eat That Ye Know Not Of

Meat here means nourishment in general, not meat the way we use the word.

Jesus is not speaking about physical food at all.

He is describing something that fed him even more than bread would.

The disciples are about to take this literally, just like the woman did earlier.

🍽️ Meat here just means food
🚫 Jesus means something other than bread
💪 Something else fed him more
➡️ The disciples will take this literally

## 🎯 To Finish His Work

Jesus describes his true food as doing God's will to completion.

Finishing a task mattered more to him than finishing a meal.

His sense of purpose outweighed his physical hunger in this moment.

That same purpose carried him through his entire ministry.

🎯 True food means doing God's will
✅ Finishing mattered more than a meal
💪 Purpose outweighed his hunger
📖 This purpose carried his whole ministry

## 🌱 Four Months, And Then Cometh Harvest

This was a common farming saying about the wait before harvest.

Jesus quotes it only to immediately overturn it.

He says the spiritual harvest will not wait four months.

It is ready right now, in the people walking toward him.

🌱 This was a common farming saying
⏳ Jesus quotes it to overturn it
🚫 The spiritual harvest will not wait
📖 It is ready right now

## 🌾 White Already To Harvest

White fields meant grain ripe and ready for immediate cutting.

Jesus points toward Samaritans already walking out from the city.

The harvest he means is people, not crops.

Her testimony already set this harvest in motion.

🌾 White fields mean grain ready now
🚶 Samaritans are already approaching
👥 The harvest here means people
📖 Her testimony already started this harvest

## 🔁 One Soweth, And Another Reapeth

Sowing means the slow work of planting a seed of truth.

Reaping means gathering the result once it finally grows.

Different people often do each part of that same work.

No single worker gets to claim the whole harvest alone.

🌱 Sowing means planting the seed
🌾 Reaping means gathering the result
🔁 Different people often do each part
📖 No one worker owns the whole harvest

## 📜 Other Men Laboured

This likely points to the prophets and John the Baptist before Jesus.

They planted seeds of expectation long before this day at the well.

The disciples are walking straight into work they did not start.

Every harvest stands on labor someone else already put in.

📜 This points to earlier prophets
🌱 They planted expectation long before
🚶 Disciples enter work already begun
📖 Every harvest rests on earlier labor

# John 4:39-42
# 🌍 Many Samaritans Believe
---

## 🗣️ Believed On Him For The Saying Of The Woman

Her testimony alone was enough to start real faith in many Samaritans.

This is the same woman the town may have quietly judged before.

God used her imperfect past as the very doorway to belief.

Her story becomes the opening line of their own faith.

🗣️ Her testimony started real faith
⚠️ She was the same judged woman
🚪 Her past became a doorway
📖 Her story opens their faith

## 🏘️ He Abode There Two Days

This does not look like a short, polite visit from Jesus.

Staying two days in a Samaritan town broke a serious social barrier again.

Jesus accepts their invitation instead of hurrying on toward Galilee.

His actions keep matching his words about reaching beyond Israel alone.

🏘️ He stays two full days
🚧 This broke a serious social barrier
🙌 Jesus accepts their invitation
📖 His actions match his words

## 👂 Now We Believe, Not Because Of Thy Saying

This is not an insult to the woman's original testimony.

Her words were simply the first step, not the final one.

Firsthand experience now carries them further than her report alone.

Secondhand belief grew into something fully their own.

🙅 This is not an insult to her
👣 Her words were only the first step
👂 Firsthand hearing carries them further
📖 Secondhand belief became their own

## 🌍 The Saviour Of The World

This title reaches far beyond Israel alone.

Samaritans were considered outsiders by most Jews of this time.

These very outsiders are the ones who say it first.

The chapter that opened with rejection ends with worldwide hope.

🌍 This title reaches beyond Israel
🚫 Samaritans were seen as outsiders
🗣️ Outsiders say this title first
📖 Rejection turns into worldwide hope

# John 4:43-45
# 🏡 Home In Galilee
---

## 📜 A Prophet Hath No Honour In His Own Country

This was a well known saying in Jesus's day.

People who watch someone grow up often struggle to see them differently.

Familiarity can breed doubt instead of honor.

Jesus applies this proverb directly to his own experience in Galilee.

📜 This was a common saying
👀 People struggle to see someone grown up differently
😒 Familiarity can breed doubt
📖 Jesus applies it to himself

## 🙌 The Galilaeans Received Him

This does not contradict the proverb Jesus just mentioned.

Their welcome came from the miracles they saw him do at a feast.

That welcome was built on spectacle more than real understanding.

A crowd that gathers around miracles is not the same as a crowd that truly believes.

🙌 Galilee welcomed Jesus warmly
✨ Their welcome followed his miracles
🎪 It rested on spectacle
📖 Crowds and real faith are not the same

# John 4:46-50
# 🙏 A Nobleman's Faith
---

## 🍷 Where He Made The Water Wine

John points back to Jesus's first sign at this very town.

Cana is about to become the site of a second recorded miracle.

The callback invites the reader to compare both moments directly.

This second sign will again prove who Jesus really is.

🍷 Cana was the first sign's location
🔁 It now hosts a second sign
👀 The reader is invited to compare
📖 Both signs prove who Jesus is

## 👑 A Certain Nobleman

This man likely served in Herod's royal court.

His position brought him real wealth.

It brought him real influence too.

None of that could heal his own dying son.

Desperation reaches people no matter how much power they hold.

👑 He likely served Herod's court
💰 His status meant real wealth
🙅 Status could not heal his son
📖 Desperation reaches even powerful people

## 👥 Except Ye See Signs And Wonders, Ye Will Not Believe

Jesus is not speaking only to this one desperate father.

The word ye points at a wider pattern in the crowd around him.

Many wanted a show more than they wanted real faith.

Jesus names that shallow pattern before he does anything else.

👥 Ye points at the wider crowd
🎪 Many wanted a show
❓ Few wanted real faith
📖 Jesus names that pattern first

## 😢 Sir, Come Down Ere My Child Die

The father ignores Jesus's rebuke completely in this moment.

His son is dying, and pride has no room left in him.

He simply repeats his plea with more urgency.

Real desperation does not have time for an argument about faith.

😢 He ignores the rebuke
⏳ His son is dying
🙏 He repeats his plea
📖 Desperation skips the argument

## 🗣️ Go Thy Way, Thy Son Liveth

Jesus never travels to Capernaum at all.

He heals the boy with a single spoken word from a distance.

The father has nothing to hold onto except that word.

He believes immediately, before any proof arrives.

📍 Jesus never travels to the boy
🗣️ One spoken word heals him
🚶 The father leaves with only that word
📖 He believes before any proof

# John 4:51-54
# 🙌 The Second Miracle
---

## 🗣️ Thy Son Liveth

The servants repeat the very same words Jesus already spoke.

Their report confirms what the father already chose to believe.

The healing happened far from Jesus, with no one watching him do it.

His word alone carried all the power this moment needed.

🗣️ Servants repeat Jesus's exact words
✅ Their report confirms his belief
📍 The healing happened far away
📖 His word alone held the power

## 🕐 Yesterday At The Seventh Hour The Fever Left Him

The seventh hour likely means around one in the afternoon.

That matched the exact moment Jesus spoke his healing word.

The father checks the time on purpose to be sure.

The timing removes any doubt that Jesus caused this healing.

🕐 Seventh hour means early afternoon
⏱️ That matched when Jesus spoke
🔍 The father checks on purpose
📖 The timing removes any doubt

## 👨‍👩‍👧‍👦 Himself Believed, And His Whole House

The father's faith does not stop with himself alone.

His entire household comes to believe because of what he tells them.

One man's faith becomes an entire family's faith.

A single healed son changes an entire household's future.

👨‍👩‍👧‍👦 His whole household believes
🗣️ His testimony reaches his family
🔗 One man's faith spreads further
📖 A household's future changes here

## 🔢 This Is Again The Second Miracle

John counts his signs on purpose throughout this gospel.

Both the first and second signs happened in this same town.

Each sign in John builds a growing case for who Jesus is.

This chapter began with a tired traveler.

It ends with a healed son and a believing household.

🔢 John counts his signs on purpose
🍷 Both signs happened in Cana
🧩 Each sign builds the case for Jesus
📖 Weariness ends in a believing household`.trim();

export const JOHN_FOUR_PERSONAL_SECTIONS = parseJohnFourRawNotes(JOHN_FOUR_RAW_NOTES);
