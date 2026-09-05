export type PsalmsTwentyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsTwentyFiveRawNotes(rawText: string): PsalmsTwentyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsTwentyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+25:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 25 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+25:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+25:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 25 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 25,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 25:${startVerse}` : `Psalms 25:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 25 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_TWENTY_FIVE_RAW_NOTES = `# Psalms 25:1-3
# 🙏 Lifting My Soul In Trust
---
## 🙌 Unto Thee, O LORD, Do I Lift Up My Soul

"Lifting up the soul" means placing your whole trust and hope onto someone else.

David is not making a physical gesture with his soul.

He is choosing, right at the start of this prayer, where his hope will rest.

This psalm is built as a Hebrew acrostic, one letter starting each verse.

That structure explains why this psalm feels like a string of connected prayers.

It does not move like one single flowing scene.

Before asking for anything else, David first hands over his trust.

🙌 Lifting the soul means giving your trust
🔤 Psalm 25 is a Hebrew acrostic
🧵 It reads as connected prayers, not one scene
📖 Trust comes before every request

## 🤝 O My God, I Trust In Thee

"Trust" here means relying completely, not just hoping things work out.

Calling him "my God" makes this personal, not just formal religious language.

David is not talking about God in general terms.

He is speaking to the God he already belongs to.

That kind of trust does not happen all at once.

It grows through a real relationship over time.

🤝 Trust means relying completely, not hoping
🗣️ My God makes this deeply personal
🌱 Trust grows through relationship over time
📖 David speaks to a God he knows

## 😳 Let Not Mine Enemies Triumph Over Me

Being "ashamed" in this culture meant public humiliation, not private embarrassment.

If David's enemies defeated him, it would look like his God had failed him.

"Triumph" pictures a loud victory celebration, the kind held after winning a battle.

David is not only asking for his own safety.

He is also asking God to protect His own name.

😳 Ashamed meant public humiliation back then
🎉 Triumph pictures a loud victory celebration
🛡️ David asks for real protection
📖 God's reputation rides on David's rescue

## ⏳ Let None That Wait On Thee Be Ashamed

"Wait" here does not mean standing around doing nothing.

It means hoping in someone with real patience and confidence.

David widens his request from himself to everyone who trusts God this way.

He is asking for a general rule, not just a personal favor.

⏳ Wait means hoping with real patience
👥 David widens this to everyone who trusts
🙏 He asks for a general rule
📖 Faithful waiting should never end in shame

## 🚫 Which Transgress Without Cause

"Transgress" means crossing a line that was never supposed to be crossed.

"Without cause" means these people turned on David for no real reason.

This was not a fair conflict between equals.

David is describing enemies who chose betrayal on purpose.

The contrast is sharp between patient trust and needless betrayal.

🚫 Transgress means crossing a forbidden line
❓ Without cause means there was no real reason
😔 These enemies chose betrayal on purpose
📖 Patient trust stands against needless betrayal

# Psalms 25:4-7
# 🧭 Teach Me Thy Paths
---
## 🧭 Shew Me Thy Ways, O LORD, Teach Me Thy Paths

"Ways" and "paths" both picture life as a road being walked.

Saying the same idea twice in different words is common in Hebrew poetry.

David is not asking for a single answer to one problem.

He is asking God to shape the whole direction of his life.

🧭 Ways and paths both picture a road
🔁 Hebrew poetry often repeats one idea twice
🛤️ David wants his whole direction shaped
📖 This is bigger than one single answer

## 📖 Lead Me In Thy Truth, And Teach Me

"Truth" here means guidance that can actually be trusted, not just facts.

David wants more than information, he wants to be led somewhere.

"Teach me" adds an ongoing process on top of that leading.

He is asking to be shaped, not simply informed.

📖 Truth means guidance worth trusting completely
🧑‍🏫 Teach adds an ongoing process
🚶 David wants to be led, not just informed
➡️ He asks to be shaped by God

## 🛟 Thou Art The God Of My Salvation

"Salvation" here means rescue, not a distant religious idea.

David calls God the source of his own personal rescue.

This title gives a reason for the request just made.

God can lead and teach because God is the one who saves.

🛟 Salvation means real rescue, not an idea
🙋 David calls this rescue personal
🔗 This title explains the request before it
📖 God can teach because God saves

## ⏳ On Thee Do I Wait All The Day

"All the day" means constantly, not only in a single moment of crisis.

David is describing an ongoing posture, not a one time prayer.

Waiting on God becomes something he practices continually.

Hope like this is a daily habit, not an emergency response.

⏳ All the day means constantly, not once
🔁 This waiting becomes a daily habit
🚨 Not just an emergency response
📖 Hope becomes a practiced posture

## 💗 Remember, O LORD, Thy Tender Mercies And Thy Lovingkindnesses

"Tender mercies" pictures deep compassion, the kind felt toward someone weak or hurting.

"Lovingkindness" describes a loyal love that keeps a promise, not just a feeling.

David asks God to remember mercy that already has a long history.

"Ever of old" means this kind of mercy is not new or occasional.

It has always been part of who God is.

💗 Tender mercies pictures deep compassion
🤝 Lovingkindness means loyal, promise keeping love
📜 Ever of old means this is not new
📖 God's mercy has always been His nature

## 🧒 Remember Not The Sins Of My Youth, Nor My Transgressions

David is not only confessing recent mistakes.

He is naming failures that go all the way back to his youth.

This is an honest look at an entire lifetime, not one incident.

Owning old sins takes more honesty than owning a recent one.

🧒 Sins of my youth means old failures
📆 This covers a whole lifetime
🪞 Honest confession, not one small mistake
📖 Old sins still need real honesty

## 🌟 According To Thy Mercy Remember Thou Me For Thy Goodness' Sake

David flips the request from before.

Now he asks God to remember him instead of his sins.

He does not base this on his own good behavior.

He bases it on God's own goodness.

That is the safest possible reason to ask for mercy.

🔄 David flips forgetting into remembering
🙋 He asks God to remember him
🎁 Not based on David's own goodness
📖 Mercy rests on God's character, not ours

# Psalms 25:8-10
# ✨ Good And Upright Is The LORD
---
## ✨ Good And Upright Is The LORD

"Good" and "upright" describe God's character before any action is mentioned.

Upright pictures something straight and honest, with nothing crooked about it.

David states this as settled fact, not as a question.

Everything else in this section flows out of this one claim.

✨ Good and upright describe God's character
📏 Upright pictures something straight, not crooked
✅ David states this as settled fact
📖 Everything else flows from this claim

## 🧑‍🏫 Therefore Will He Teach Sinners In The Way

"Therefore" ties this directly to the goodness just named.

Because God is good, he teaches instead of simply punishing.

"Sinners" here are not written off as hopeless.

God's goodness reaches toward the very people who need correction most.

🔗 Therefore ties this to God's goodness
🧑‍🏫 God teaches instead of only punishing
🙌 Sinners are not written off
📖 God's goodness reaches those who need it

## 🐑 The Meek Will He Guide In Judgment

"Meek" does not mean weak.

It means humble and teachable.

"Guide in judgment" means God leads meek people toward good decisions.

A humble person stays willing to be led somewhere new.

Pride usually blocks someone from being guided at all.

🐑 Meek means humble, not weak
🧭 Guide in judgment means good decisions
🙇 Humility keeps a person teachable
📖 Pride blocks guidance, humility invites it

## 🔁 The Meek Will He Teach His Way

This line repeats the idea just given in slightly different words.

Hebrew poetry often says the same truth twice for emphasis.

"His way" points to God's own way of living, not a random path.

Being taught God's way is a promise repeated on purpose here.

🔁 This repeats the idea for emphasis
🛤️ His way means God's own way
🔊 Repetition here adds emphasis, not new facts
📖 God's way is worth learning twice

## 🌊 All The Paths Of The LORD Are Mercy And Truth

"Mercy" and "truth" appear together often in this psalm as a matched pair.

Mercy means compassion that is not deserved.

Truth means faithfulness that never changes or lies.

Every path God walks combines both of these at once.

🤝 Mercy and truth appear as a pair
💗 Mercy means undeserved compassion
🪨 Truth means unchanging faithfulness
📖 Every one of God's paths holds both

## 📜 Unto Such As Keep His Covenant And His Testimonies

A "covenant" is a binding agreement, sealed with real commitment on both sides.

"Testimonies" here means the specific terms and instructions written into that agreement.

This promise is not automatic for every single person.

It belongs to those who actually keep their side of the covenant.

📜 Covenant means a binding agreement
📋 Testimonies means its written terms
🤝 This promise depends on keeping it
📖 God's mercy meets a kept covenant

# Psalms 25:11-14
# 🕊️ For Thy Name's Sake
---
## 🕊️ For Thy Name's Sake, O LORD, Pardon Mine Iniquity

"For thy name's sake" means David is asking God to act for His own reputation.

This is not David arguing that he deserves forgiveness.

"Pardon" means to fully cancel a debt, not just excuse it quietly.

David is asking God to act because of who God is, not who David is.

🕊️ Name's sake means for God's own reputation
🙅 David is not claiming he deserves it
💳 Pardon means fully canceling a debt
📖 God acts from His character, not David's

## ⚖️ For It Is Great

David does not downplay or soften what he has done.

"Great" admits his guilt is serious, not a small slip.

Facing the real size of a sin takes more courage than hiding it.

This honesty makes the request for pardon land with more weight.

⚖️ Great admits real, serious guilt
🙈 David does not hide or soften it
💪 Honesty about sin takes courage
📖 Bigger guilt makes forgiveness matter more

## ❓ What Man Is He That Feareth The LORD?

"Fear" here does not mean being afraid of punishment.

It means deep respect for God, taken seriously in daily life.

David asks this as a real question, then answers it in the rest of the verse.

Not every person qualifies for the promise that follows.

❓ David asks a real question here
🙏 Fear means deep respect, not terror
🎯 Not everyone qualifies for what follows
📖 The next line gives the answer

## 🧑‍🏫 Him Shall He Teach In The Way That He Shall Choose

This answers the question just asked in the verse before.

The person who fears the LORD gets personal instruction, not a general rule.

"The way that he shall choose" means God picks the direction for that person.

This is guidance built around one individual, not a one size fits all answer.

🧑‍🏫 This answers the question just asked
🙋 The guidance here is personal
🧭 God chooses the specific direction
📖 One size does not fit every person

## 😌 His Soul Shall Dwell At Ease

"Dwell at ease" pictures a settled, secure life instead of constant worry.

This is the opposite of the shame and anxiety named earlier in the psalm.

The person who fears the LORD finds real rest, not just relief.

Security here comes from the relationship, not from circumstances changing.

😌 Dwell at ease means settled security
🔄 This reverses the earlier shame and worry
🛌 Real rest, not just temporary relief
📖 Security comes from the relationship itself

## 🌾 His Seed Shall Inherit The Earth

"Seed" here means descendants, the children and future generations of this family.

"Inherit the earth" echoes the same promise God gave much earlier to Abraham.

This turns a personal blessing into a promise that outlasts one lifetime.

Fearing the LORD carries benefits that reach beyond the person who does it.

🌾 Seed means descendants, future generations
📜 This echoes God's promise to Abraham
⏳ The blessing outlasts one lifetime
📖 Fearing God benefits an entire family line

## 🤫 The Secret Of The LORD Is With Them That Fear Him

"Secret" here does not mean hidden information kept from everyone else.

It pictures close friendship, the kind where someone shares their real thoughts with you.

This closeness belongs to those who fear the LORD, not to everyone automatically.

God is offering relationship, not just facts about Himself.

🤫 Secret pictures close friendship, not hidden facts
🫂 This closeness is not automatic for everyone
💬 God shares Himself with those who fear Him
📖 Relationship matters more than information

## 📖 He Will Shew Them His Covenant

"Shew" is an older word that simply means to reveal or make known.

"His covenant" points back to the binding promise named earlier in this psalm.

Friendship with God includes being let in on what He has promised.

Knowing God's covenant is a gift given inside real closeness with Him.

📜 Shew means to reveal or make known
🔗 Covenant points back to God's binding promise
🎁 Knowing it is a gift of closeness
📖 Friendship with God includes His promises

# Psalms 25:15-18
# 😢 Mine Eyes Are Ever Toward The LORD
---
## 👀 Mine Eyes Are Ever Toward The LORD

"Eyes ever toward" pictures constant attention, like a servant watching a master's hand.

David is not glancing at God once in a while.

His focus stays fixed on God through this entire struggle.

This kind of watching expects an answer, not just comfort.

👀 Eyes ever toward means constant attention
🙋 Like a servant watching a master's hand
🎯 David's focus stays fixed through his struggle
📖 This watching expects a real answer

## 🕸️ For He Shall Pluck My Feet Out Of The Net

A "net" here pictures a hunter's trap, hidden and hard to escape alone.

David feels caught by something he cannot free himself from.

"Pluck out" pictures a quick, decisive rescue, not a slow process.

He is trusting God to do what he cannot do for himself.

🕸️ Net pictures a hidden hunter's trap
😣 David feels caught, unable to escape alone
⚡ Pluck out pictures a quick rescue
📖 He trusts God for what he cannot do

## 🙏 Turn Thee Unto Me, And Have Mercy Upon Me

"Turn thee unto me" pictures David asking God to face him directly.

This shifts the psalm from praising God's character back to an urgent request.

David is not accusing God of ignoring him.

He is asking for God's full attention right now.

🙏 Turn thee unto me asks for direct attention
🔄 This shifts back into urgent request
🚫 Not an accusation of being ignored
📖 David wants God's full focus now

## 😔 For I Am Desolate And Afflicted

"Desolate" means feeling completely alone, cut off from help or comfort.

"Afflicted" means under real, ongoing pressure or suffering.

David gives the honest reason behind the request he just made.

Naming pain this plainly is part of real prayer, not a weakness.

😔 Desolate means feeling completely alone
😣 Afflicted means real, ongoing suffering
🗣️ David names the reason plainly
📖 Honest pain belongs in real prayer

## 💭 The Troubles Of My Heart Are Enlarged

"Enlarged" here means growing bigger, not shrinking with time.

David's inner troubles are multiplying instead of easing on their own.

This names an emotional weight, not only outward circumstances.

Prayer becomes the place where this growing burden gets spoken out loud.

💭 Enlarged means growing bigger, not shrinking
📈 David's inner troubles keep multiplying
❤️ This names emotional weight, not just events
📖 Prayer becomes the place to speak it

## 🚪 O Bring Thou Me Out Of My Distresses

"Distresses" pictures a tight, narrow, cramped place with no room to move.

That is the opposite picture of the "enlarged" troubles named just before.

David feels his problems growing while he himself feels squeezed smaller.

He asks God to bring him out into open space again.

🚪 Distresses pictures a tight, cramped place
🔄 The opposite of the enlarged troubles before
📦 David feels squeezed as his troubles grow
📖 He asks to be brought into open space

## 👁️ Look Upon Mine Affliction And My Pain

"Look upon" asks for close, personal attention, not a passing glance.

"Affliction" points to outward hardship.

"Pain" points to what David feels on the inside.

David wants both his circumstances and his emotions truly seen.

👁️ Look upon asks for close attention
🌪️ Affliction means outward hardship
💔 Pain means inward hurt
📖 Being seen matters as much as rescue

## 🙏 And Forgive All My Sins

David connects his suffering directly to a request for forgiveness in the very same verse.

He does not treat his pain and his sin as two separate topics.

"All" leaves nothing out, not just the easy sins to admit.

This full honesty comes right before the psalm turns to his enemies.

🔗 Suffering and sin sit side by side here
🙏 Forgive all leaves nothing out
🪞 Full honesty, not partial confession
📖 Honesty comes before facing his enemies

# Psalms 25:19-22
# ⚔️ Redeem Israel, O God
---
## 👀 Consider Mine Enemies, For They Are Many

"Consider" asks God to look closely and take real notice, not glance quickly.

"Many" means David is outnumbered, facing more than one threat at a time.

This is not a small disagreement with one or two people.

David wants God to see the full size of the danger.

👀 Consider means look closely, take notice
🔢 Many means David is outnumbered
⚠️ This is not one small disagreement
📖 David wants the full danger seen

## 💔 They Hate Me With Cruel Hatred

Repeating "hate" alongside "cruel hatred" makes the intensity impossible to miss.

This is not ordinary conflict or simple disagreement.

"Cruel" points to hatred that wants real harm done, not just distance.

David names the danger honestly instead of downplaying it.

🔁 Repeating hatred makes the intensity clear
⚔️ This goes beyond ordinary conflict
💔 Cruel hatred wants real harm done
📖 David names the danger honestly

## 🛡️ O Keep My Soul, And Deliver Me

"Keep" pictures guarding something valuable and protecting it closely.

"Deliver" pictures an active rescue out of real danger.

Together they ask for both protection now and rescue from danger.

David wants more than survival.

He wants God fully involved in both.

🛡️ Keep pictures close, careful protection
🚁 Deliver pictures an active rescue
🙏 David asks for both together
📖 He wants more than mere survival

## 😳 Let Me Not Be Ashamed, For I Put My Trust In Thee

This repeats the exact request David made back in verse two.

Bringing back the same words on purpose ties the whole psalm together.

His trust has not changed, even after naming all this pain.

The prayer ends where it began, still resting on trust.

🔁 This repeats David's request from verse two
🧵 Repeating it ties the psalm together
🤝 His trust has not changed
📖 The prayer ends still resting on trust

## 🪞 Let Integrity And Uprightness Preserve Me

"Integrity" means being the same honest person in private as in public.

"Uprightness" means living straight and honest, without hidden crookedness.

David asks these qualities themselves to act like a shield around him.

His own honesty becomes part of what keeps him safe.

🪞 Integrity means the same in private and public
📏 Uprightness means honest, without hidden crookedness
🛡️ David asks these to protect him
📖 His own honesty becomes his shield

## ⏳ For I Wait On Thee

This short line repeats the same patient waiting named earlier in the psalm.

David keeps returning to this one posture again and again.

Waiting is not a single moment, it becomes a whole way of praying.

The psalm keeps circling back to trust as its true center.

⏳ This repeats the psalm's waiting theme
🔁 David returns to this posture often
🙏 Waiting becomes a whole way of praying
📖 Trust stays the true center of this psalm

## 🇮🇱 Redeem Israel, O God, Out Of All His Troubles

This final verse shifts suddenly from "me" to the whole nation of Israel.

Many scholars believe this line was added onto the psalm for public worship.

It does not fit the Hebrew acrostic pattern the rest of the psalm follows.

That way, the whole nation could also pray this deeply personal psalm together.

"Redeem" means to rescue by paying a real price, not just to help.

One person's honest prayer becomes a prayer the entire nation can share.

🇮🇱 This verse shifts from me to Israel
📜 Many scholars see this as a later addition
🧩 It breaks the psalm's acrostic pattern
📖 One man's prayer becomes the nation's prayer
`.trim();

export const PSALMS_TWENTY_FIVE_PERSONAL_SECTIONS = parsePsalmsTwentyFiveRawNotes(PSALMS_TWENTY_FIVE_RAW_NOTES);
