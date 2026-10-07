export type MatthewNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMatthewNineRawNotes(rawText: string): MatthewNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MatthewNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Matthew\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Matthew 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Matthew\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Matthew\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Matthew 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Matthew 9:${startVerse}` : `Matthew 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Matthew 9 sections, received " + sections.length);
  }

  return sections;
}

const MATTHEW_NINE_RAW_NOTES = `# Matthew 9:1-8
# 🛏️ Thy Sins Be Forgiven Thee
---
## 🏠 Came Into His Own City

His own city means Capernaum, the town Jesus used as a home base.

Capernaum sat on the north shore of the Sea of Galilee.

Chapter eight just showed Jesus crossing into Gentile territory and calming a storm.

Now he returns to familiar ground among people who already know him.

Familiar ground does not mean an easy welcome, as this chapter will show.

🏠 His own city means Capernaum
🌊 Capernaum sat by the Sea of Galilee
🔁 Jesus returns from Gentile territory
📖 Familiar ground will not mean an easy welcome

---

## 🛏️ Sick Of The Palsy, Lying On A Bed

Palsy names a condition that caused paralysis or uncontrollable shaking.

This man could not walk or carry himself anywhere on his own.

Being carried on a bed meant other people had to bring him to Jesus.

His own body gave him no way to reach Jesus by himself.

Every detail here points to a man with no strength left of his own.

🩺 Palsy means paralysis or uncontrollable shaking
🛏️ He could not walk on his own
🤝 Others carried him to Jesus
📖 He had no strength of his own

---

## 👥 Jesus Seeing Their Faith

The word their does not point only to the sick man himself.

Mark and Luke both describe friends carrying this man to Jesus.

Their faith includes the effort of the men who carried him there.

Faith here is not only a private feeling inside one person.

Sometimes one person is healed because other people believed first.

👥 Their refers to more than one man
🛏️ Friends carried him to Jesus
🤝 Faith can act on another's behalf
📖 One healing, several people's faith

---

## 🙂 Son, Be Of Good Cheer

The man came expecting his legs to be healed, not his sins addressed.

Jesus answers a problem deeper than the one anyone mentioned out loud.

Be of good cheer means do not be afraid, there is good news coming.

Forgiveness arrives before the healing even happens.

Jesus treats sin as the deeper sickness in this man's life.

🩺 He came expecting only healing
❤️ Jesus addresses a deeper need
🙂 Be of good cheer means do not fear
📖 Sin is treated as the deeper sickness

---

## ⚠️ This Man Blasphemeth

Blasphemeth means claiming a right or power that belongs to God alone.

In this culture, only God had the authority to forgive sin.

The scribes understand exactly what Jesus just claimed about himself.

Their accusation is theologically correct about what forgiving sin means.

Their mistake is not in the logic, it is in who they think Jesus is.

⚠️ Blasphemeth means claiming God's own right
🙏 Only God could forgive sin
🧠 The scribes understand the claim correctly
📖 Their error is about who Jesus is

---

## 🤫 Wherefore Think Ye Evil In Your Hearts

The scribes never said a word about their accusation out loud.

They assumed their silent judgment was safe inside their own minds.

Jesus answers thoughts nobody spoke, proving he can see what they hide.

Nothing about this exchange was ever truly private.

Jesus exposes the hidden accusation before dealing with the visible sickness.

🤫 The scribes judged him silently
🧠 Jesus answers their unspoken thoughts
👁️ Nothing was hidden from him
📖 Hidden judgment gets exposed first

---

## 🗣️ To Say, Arise, And Walk

Saying sins are forgiven cannot be proven or disproven by anyone watching.

Saying arise and walk will be proven true or false immediately.

Jesus picks the harder, visible claim to prove the easier, invisible one.

A miracle anyone can see becomes proof for a claim no one can see.

The visible healing is about to vouch for the invisible forgiveness.

🗣️ Forgiving sin cannot be visibly proven
🦵 Arise and walk can be proven instantly
🔗 The visible proves the invisible
📖 A miracle backs up an unseen claim

---

## 👑 Power On Earth To Forgive Sins

Jesus claims an authority that belongs to God, exercised here on earth.

He proves that claim immediately by healing the man's body.

Arise, take up thy bed, and go unto thine house, he says next.

The command to carry his own bed proves full strength returned.

The healed body becomes the evidence for the forgiven soul.

👑 Power on earth means God's own authority
🛏️ Carrying his bed proved full strength
⚡ The command works instantly
📖 Healed body proves forgiven soul

---

## 🚶 He Arose, And Departed To His House

Nothing about this obedience looks slow or hesitant.

The man does not wait around to celebrate or prove a point.

He simply does exactly what Jesus told him to do.

His quiet departure is itself quiet proof that the healing was complete.

A man carried in on a bed now carries the bed out himself.

🚶 He obeys without delay
🛏️ He now carries the bed himself
🤐 No celebration, just simple obedience
📖 His walking home proves the healing

---

## 😲 They Marvelled, And Glorified God

The crowd's response moves from shock straight into worship.

They glorify God, not Jesus directly, naming where the power truly came from.

Such power unto men shows they grasp something bigger happened here.

This whole scene began with an accusation and ends with worship.

What started as blasphemy to the scribes ends as glory to God for the crowd.

😲 The crowd moves from shock to worship
🙌 They glorify God, not just Jesus
👑 They sense power given to men
📖 Accusation turns into worship by the end

# Matthew 9:9-13
# 🍽️ I Will Have Mercy, And Not Sacrifice
---
## 💰 Sitting At The Receipt Of Custom

Receipt of custom means a tax collection booth beside a main road.

Matthew worked there collecting taxes for Rome, likely on goods passing through.

Tax collectors were widely hated for overcharging and working for Roman occupiers.

Matthew sat in a job most people in this town despised.

Jesus chooses a man nobody else in town wanted to call friend.

💰 Custom means a tax collection booth
🏛️ Matthew collected taxes for Rome
👎 Tax collectors were widely hated
📖 Jesus chooses the one nobody wanted

---

## 🚪 He Arose, And Followed Him

Follow me is the same call given to the fishermen back in chapter four.

Matthew does not ask questions or negotiate the terms first.

He simply gets up and leaves his booth behind completely.

Walking away from this job meant walking away from steady income for good.

His answer is as fast and complete as the centurion's faith was in chapter eight.

🗣️ Follow me repeats the earlier call
🚪 Matthew leaves his booth at once
💸 He gives up steady income
📖 His obedience is instant and complete

---

## 🍽️ Many Publicans And Sinners Came And Sat Down With Him

Publicans were tax collectors, grouped here with sinners as outcasts from religious life.

Sharing a meal in this culture meant far more than simply eating nearby.

Sitting down together signaled friendship, acceptance, and equal standing.

Jesus eats with exactly the people religious leaders avoided on purpose.

A shared table becomes a visible sign of who Jesus welcomes.

💰 Publicans means tax collectors again
🍽️ Shared meals signaled real friendship
🤝 Jesus accepts people others avoided
📖 The table shows who Jesus welcomes

---

## ❓ Why Eateth Your Master With Publicans And Sinners

The Pharisees assume sharing a table means approving of someone's sin.

In their view, a righteous teacher should stay separate from unclean company.

Jesus never agrees to that assumption anywhere in this chapter.

He treats closeness to sinners as his actual mission, not a mistake.

Their question reveals how they think holiness works, kept at a safe distance.

❓ Pharisees assume guilt by association
🚧 They expect separation from sinners
🎯 Jesus treats closeness as his mission
📖 Holiness here moves toward people, not away

---

## 🩺 They That Be Whole Need Not A Physician

Jesus compares himself to a physician, someone sick people seek out on purpose.

A doctor does not avoid sick patients to stay clean himself.

Healthy people have no real reason to visit a doctor at all.

Jesus places himself exactly where the need is greatest.

This answers the Pharisees by changing the whole picture of what holiness is for.

🩺 Jesus compares himself to a physician
🤒 Doctors go toward the sick
🙅 Healthy people need no doctor
📖 Jesus goes where the need is

---

## 📜 I Will Have Mercy, And Not Sacrifice

This line quotes the prophet Hosea from centuries earlier in Israel's history.

Sacrifice means the temple offerings religious people performed to look righteous.

Mercy means active compassion extended toward people who are struggling.

Jesus tells the Pharisees to go learn what their own scriptures already taught.

Correct ritual was never meant to replace real compassion for people.

📜 This quotes the prophet Hosea
🕊️ Sacrifice means religious ritual and offerings
❤️ Mercy means active compassion for people
📖 Ritual was never meant to replace compassion

---

## 🎯 Not Come To Call The Righteous, But Sinners To Repentance

Jesus names his own mission here in the plainest terms in the chapter.

He is not here to recruit people who already consider themselves righteous.

Repentance means turning away from sin and back toward God.

Matthew's own story, told two verses earlier, is proof this mission is real.

The tax collector who just got up from his booth is the whole point being made.

🎯 Jesus states his mission plainly
🙅 Not for the already righteous
🔄 Repentance means turning back to God
📖 Matthew's own story proves the point

# Matthew 9:14-17
# 🍶 New Wine Into New Bottles
---
## 🙏 Why Do We And The Pharisees Fast Oft

Fasting meant going without food for a set time as an act of devotion.

John's disciples and the Pharisees both practiced fasting as a regular discipline.

Jesus's own disciples are not following that same regular pattern.

John's followers notice the difference and ask Jesus to explain it.

A simple question about food habits is about to reveal something much bigger.

🍽️ Fasting means going without food
🙏 It was practiced as devotion
❓ Jesus's disciples do not fast the same way
📖 The question points to something bigger

---

## 🎉 Can The Children Of The Bridechamber Mourn

Children of the bridechamber means the wedding guests celebrating with the groom.

A wedding celebration is the wrong time for guests to mourn or fast.

Jesus quietly compares himself to the bridegroom in this picture.

His presence makes this a season for celebration, not mourning.

Fasting fits grief, and right now grief is not what this moment calls for.

🎉 Children of the bridechamber means wedding guests
🤵 The bridegroom pictures Jesus himself
🎊 His presence calls for celebration
📖 Grief does not fit this moment

---

## ⏳ The Bridegroom Shall Be Taken From Them

Jesus quietly tells his own disciples that he will not stay forever.

Taken from them points ahead to his coming death.

Fasting will have its proper place again after he is gone.

This is one of the earliest hints in Matthew of what is coming.

Even in a joyful scene, Jesus already names the grief still ahead.

⏳ Taken from them points to his death
🔮 An early hint of what is coming
🍽️ Fasting returns after he leaves
📖 Joy now, grief named ahead

---

## 🧵 A Piece Of New Cloth Unto An Old Garment

A patch of new, unshrunk cloth will later shrink when it is washed.

Sewn onto an old garment, that shrinking tears the fabric worse than before.

Jesus is not describing a sewing tip for his listeners.

He is describing what happens when something brand new gets forced into an old shape.

What he brings does not simply patch the old system, it replaces it.

🧵 New cloth shrinks later and tears
👕 It damages the old garment
🆕 Jesus describes something truly new
📖 New things cannot just patch old ones

---

## 🐐 New Wine Into Old Bottles

Bottles here means wineskins made from animal hide, not glass containers.

Old wineskins had already stretched and dried out from earlier use.

New wine still expands as it ferments inside its container.

An old, brittle skin cannot handle that pressure and simply splits open.

The old skin was never built to hold what the new wine would become.

🐐 Bottles means wineskins made from hide
🍷 New wine expands as it ferments
💥 Old skins split under that pressure
📖 Old forms cannot hold something new

---

## 🍷 Both Are Preserved

New wine poured into new wineskins stretches safely as it ferments.

Nothing tears, nothing spills, nothing is lost in that pairing.

Jesus is describing himself as something that needs a new container entirely.

Old religious habits alone cannot simply absorb what Jesus is bringing.

What Jesus offers calls for a whole new way of holding it.

🍷 New wine needs new skins
✅ Nothing tears or spills that way
🆕 Jesus needs a new container
📖 Old habits cannot simply absorb him

# Matthew 9:18-22
# 🩸 Thy Faith Hath Made Thee Whole
---
## 🙇 There Came A Certain Ruler, And Worshipped Him

Matthew calls him only a certain ruler, without naming him.

Mark and Luke both identify this man by name, Jairus.

He likely led worship or oversaw affairs at the local synagogue.

A respected community leader kneels publicly before Jesus without hesitation.

A man with real status in town still comes low, not proud.

👤 Matthew leaves this ruler unnamed
🏛️ He likely led the local synagogue
🙇 Status did not stop his humility
📖 Mark and Luke call him Jairus

---

## 💀 My Daughter Is Even Now Dead

This father speaks as though the worst has already happened.

Mark's fuller account shows her still alive when he first leaves home.

By the time he reaches Jesus, he may believe she has already died.

His request still assumes Jesus holds power even over death itself.

Even in grief this desperate, he keeps walking straight toward Jesus.

💀 He speaks as if she already died
🏃 He still comes looking for Jesus
🙏 He believes Jesus can reach even death
📖 Desperation does not stop his faith

---

## 🩸 An Issue Of Blood Twelve Years

This woman suffered a chronic bleeding condition for twelve long years.

Under Jewish law, that condition made her continually ritually unclean.

Being unclean meant she could not fully take part in worship or normal contact.

Twelve years of this would have cost her health, money, and standing in her community.

She approaches from behind, likely because she is not supposed to touch anyone at all.

🩸 She bled for twelve long years
🚫 This made her ritually unclean
💸 It cost her health and standing
📖 She approaches carefully, from behind

---

## 🙏 If I May But Touch His Garment, I Shall Be Whole

This is not a magic charm she believes will work on its own.

She trusts that any contact at all with Jesus carries real power.

Her plan is quiet and private, not a public request like the ruler's.

She hopes to receive healing without ever being noticed in the crowd.

Her faith is real even though she never expects to be seen.

🙏 She trusts contact with Jesus itself
🤫 Her plan is quiet, not public
👤 She hopes to go unnoticed
📖 Real faith does not need to be seen

---

## 👧 Daughter, Be Of Good Comfort

Jesus stops and names what just happened instead of letting her slip away unseen.

Calling her daughter gives her a place and a welcome in public.

Her own faith, not the touch alone, gets the credit for the healing.

This answers her condition and her years of isolation together.

She came expecting to disappear into a crowd and leaves publicly honored instead.

👧 Jesus calls her daughter publicly
🙏 Her own faith gets the credit
🩸 Her bleeding and isolation both end
📖 She leaves honored, not hidden

---

## ⏱️ The Woman Was Made Whole From That Hour

Her healing happens at that exact moment, with no delay afterward.

This matches the centurion's servant, healed in the selfsame hour in chapter eight.

Jesus is already on his way to another emergency when this happens.

One miracle does not slow down or interrupt the next one waiting.

Jesus can meet one urgent need without losing focus on another.

⏱️ Healed immediately, with no delay
🔁 This matches chapter eight's pattern
🚶 Jesus was still heading elsewhere
📖 One miracle does not delay the next

# Matthew 9:23-26
# ⚰️ The Maid Is Not Dead, But Sleepeth
---
## 🎶 Saw The Minstrels And The People Making A Noise

Minstrels were musicians hired specifically to play music for mourning.

Loud wailing and music were a normal, expected part of a Jewish funeral.

This noise confirms that everyone in the house already believed the girl had died.

The mourning ritual had already begun before Jesus even arrived.

Jesus is about to interrupt a funeral that has already started.

🎶 Minstrels were hired mourning musicians
😭 Loud noise was a normal funeral custom
💀 It confirms the household believed she died
📖 Jesus interrupts a funeral already underway

---

## 😴 Not Dead, But Sleepeth

Jesus is not claiming she was never actually dead.

He is using sleep as a picture of death that he is about to reverse.

From his perspective, her death is about to become as temporary as a nap.

This same picture is used elsewhere in scripture for death that will not last.

Calling it sleep only makes sense because Jesus is about to wake her.

😴 Sleep pictures death he will reverse
💀 He is not denying she died
⏳ Her death is about to be temporary
📖 Sleep only fits because he wakes her

---

## 😂 They Laughed Him To Scorn

The mourners in the house are completely certain she is dead.

Laughing at Jesus shows how impossible his words sound to them.

Nobody in that room expects anything but a funeral to happen next.

Their confidence will be overturned within moments.

Certainty about death is about to meet someone with authority over it.

😂 They mock what sounds impossible
💀 They are certain she is dead
😲 Their confidence is about to break
📖 Certainty meets authority over death

---

## 🤲 Took Her By The Hand, And The Maid Arose

Jesus uses the same simple touch already seen throughout this chapter.

No long ritual or dramatic display accompanies this moment either.

Taking her by the hand is the same gesture used to help someone merely stand up.

Death responds to Jesus exactly the way sickness already has.

The chapter's pattern holds even here, one touch is enough.

🤲 The same simple touch as before
🧍 It looks like helping someone stand
💀 Death responds just like sickness did
📖 One touch is enough, even here

---

## 📢 The Fame Hereof Went Abroad Into All That Land

News of this moment spreads far beyond the house where it happened.

This is now the second time in this chapter Jesus overturns certain death.

The crowd's amazement keeps building with each new miracle in this chapter.

By now, nothing seems beyond what Jesus is able to do.

A girl's quiet healing becomes news an entire region cannot stop talking about.

📢 News spreads across the whole region
💀 This is the second death reversed
📈 Amazement keeps building through the chapter
📖 Nothing now seems beyond Jesus

# Matthew 9:27-34
# 👁️ According To Your Faith Be It Unto You
---
## 👑 Thou Son Of David, Have Mercy On Us

Son of David was a title pointing to the promised king from David's family line.

Two blind men use a title that carries real messianic weight.

They cannot see Jesus with their eyes, yet they recognize who he is.

Their cry shows spiritual sight that many people with working eyes still lack.

Being physically blind never stopped them from seeing Jesus clearly.

👑 Son of David points to the promised king
👁️ They cannot see him with their eyes
🧠 They recognize who he truly is
📖 Spiritual sight did not need physical sight

---

## ❓ Believe Ye That I Am Able To Do This

Jesus does not heal them immediately after their first cry for mercy.

He waits until they follow him all the way into a house first.

He asks them to state their faith out loud in plain words.

Their answer, Yea, Lord, is short, direct, and fully confident.

Jesus wants their faith spoken, not just assumed.

🏠 Jesus waits until they reach the house
❓ He asks them to state their faith
🗣️ Their answer is short and confident
📖 Faith here is spoken, not assumed

---

## 🔁 According To Your Faith

This exact pattern already appeared with the centurion and the bleeding woman.

The outcome lines up with what each person actually believed Jesus could do.

This is not a magic formula that works regardless of belief.

Faith here is the channel the healing flows through, not the cause itself.

Chapter nine keeps returning to this one truth about faith.

🔁 This matches the centurion and the woman
📏 The outcome matches their belief
🚫 Not a magic formula on its own
📖 Faith is the channel, not the cause

---

## 🤫 See That No Man Know It

Jesus gives these two men the exact same instruction given to the leper earlier.

He still is not ready for the kind of attention a miracle like this draws.

A crowd chasing miracles is not the same as a crowd following in faith.

Jesus keeps trying to slow down his own growing fame throughout this chapter.

Even now, Jesus controls the pace of his own story.

🤫 Same instruction given to the leper
🛑 He is not ready for that attention
👥 Miracle seekers differ from true followers
📖 Jesus controls the pace of his story

---

## 🚫 Spread Abroad His Fame In All That Country

These two men do the exact opposite of what Jesus just told them.

Their excitement clearly overwhelms the instruction they were just given.

This is not framed in the text as something admirable.

Good intentions here still worked directly against what Jesus asked for.

Even grateful excitement can quietly disobey a clear instruction.

🚫 They ignore what Jesus told them
😄 Excitement overwhelms the instruction
⚠️ This is not shown as admirable
📖 Good intentions still disobeyed him

---

## 🤐 A Dumb Man Possessed With A Devil

Dumb here means unable to speak, not a judgment on intelligence.

This time, a spirit's possession is the direct cause named for his silence.

Earlier illnesses in this chapter came from sickness, not spiritual attack.

This case shows Jesus dealing with a different source of suffering entirely.

Not every affliction in this chapter has the same root cause.

🤐 Dumb means unable to speak
👻 Possession is the named cause here
🩺 Earlier cases were simple sickness
📖 Suffering in this chapter has different roots

---

## 🤯 It Was Never So Seen In Israel

The multitude's amazement reaches a new high point in this verse.

They are comparing this moment against their whole nation's long history.

Nothing in Israel's long memory matched what they had just witnessed.

Their wonder keeps climbing with every healing added through this chapter.

By now, the crowd has run out of comparisons for what they are seeing.

📈 Amazement reaches a new high point
🇮🇱 They compare it to Israel's history
🤯 Nothing in memory matched this
📖 The crowd runs out of comparisons

---

## 👿 He Casteth Out Devils Through The Prince Of The Devils

The prince of the devils means Satan, the ruler over evil spirits.

The Pharisees accuse Jesus of using evil power to perform this miracle.

This is a deliberate alternative explanation, not simple confusion about what happened.

Belief and hostility have now both responded to the exact same miracle.

The very same evidence leads one crowd to wonder and another to reject.

👿 Prince of the devils means Satan
🗣️ Pharisees offer a hostile explanation
🎯 This is deliberate, not confusion
📖 Identical evidence split two responses

# Matthew 9:35-38
# 🌾 The Harvest Truly Is Plenteous
---
## 📢 Preaching The Gospel Of The Kingdom

These three activities summarize everything Jesus has done since chapter five.

Teaching points back to the Sermon on the Mount in chapters five through seven.

Preaching the gospel means announcing that God's kingdom has arrived.

Healing every sickness covers the many miracles filling chapters eight and nine.

One short verse gathers up everything this whole section has shown.

📖 Teaching recalls chapters five through seven
📢 Preaching means announcing the kingdom
🩺 Healing covers chapters eight and nine
➡️ One verse gathers the whole section

---

## ❤️ He Was Moved With Compassion On Them

Compassion here describes a gut level reaction, not a distant feeling of pity.

The original word pictures something stirring deep inside a person's body.

Jesus is not simply observing the crowd's need from a safe distance.

What he feels moves him immediately toward action on their behalf.

This feeling is the hinge between everything Jesus has done and what comes next.

❤️ Compassion means a gut level reaction
👀 Not distant pity from far away
🏃 It moves him toward action
📖 This feeling leads to what comes next

---

## 🐑 As Sheep Having No Shepherd

Sheep without a shepherd have no protection, no direction, and no one feeding them.

This image appears throughout the Old Testament to describe Israel's failed leaders.

The crowds are described as fainted and scattered, exhausted and without guidance.

Religious leaders existed, yet the people still felt abandoned and lost.

Having leaders is not the same as having a shepherd.

🐑 Sheep need protection and direction
📜 This image describes Israel's failed leaders
😩 The crowds are exhausted and lost
📖 Leaders existed, but no shepherd did

---

## 🌾 The Harvest Truly Is Plenteous, But The Labourers Are Few

Harvest here pictures people ready to respond to the message Jesus brings.

Labourers pictures the workers needed to bring in that harvest.

Plenty of ready people exist, but not enough workers are available yet.

This shortage sets up exactly what happens in the very next chapter.

The need is already bigger than the number of people meeting it.

🌾 Harvest pictures people ready to respond
👷 Labourers pictures the workers needed
📊 Plenty of harvest, too few workers
📖 This sets up the next chapter

---

## 🙏 Pray Ye Therefore The Lord Of The Harvest

Jesus tells his disciples to pray before he tells them to go.

The Lord of the harvest means God, who owns the mission and sends the workers.

Prayer here is the first step, not a replacement for actual sending.

Chapter ten opens with Jesus answering this very prayer himself.

Compassion led to prayer, and prayer is about to lead straight into action.

🙏 Prayer comes before being sent
👑 Lord of the harvest means God
➡️ Prayer leads to real sending
📖 Compassion, prayer, and action connect here
`.trim();

export const MATTHEW_NINE_PERSONAL_SECTIONS = parseMatthewNineRawNotes(MATTHEW_NINE_RAW_NOTES);
