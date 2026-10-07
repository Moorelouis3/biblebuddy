export type ZechariahElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseZechariahElevenRawNotes(rawText: string): ZechariahElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ZechariahElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Zechariah\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Zechariah 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Zechariah\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Zechariah\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Zechariah 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Zechariah 11:${startVerse}` : `Zechariah 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Zechariah 11 sections, received " + sections.length);
  }

  return sections;
}

const ZECHARIAH_ELEVEN_RAW_NOTES = `# Zechariah 11:1-3
# 🔥 Fire Comes For The Forests
---
## 🌲 Open Thy Doors, O Lebanon

Lebanon was famous across the ancient world for its cedar trees.

Those cedars were considered the finest building timber anywhere.

Solomon chose that same wood to build the first Temple.

Opening the doors here is not a literal request.

It pictures judgment walking in like fire through a gate nobody can shut.

🌲 Lebanon means the finest cedar timber

🏛️ Solomon used it to build the Temple

🚪 Open doors pictures judgment walking in

📖 No tree is safe from this fire

## 🥀 The Cedar Is Fallen

The cedar was the mightiest tree in the forest.

When it falls, smaller trees around it lose their shelter.

The mighty are spoiled means the most powerful rulers have already been struck down.

If the strongest cannot survive this judgment, nothing smaller stands a chance either.

🥀 Cedar means the mightiest ruler falls

💔 Mighty are spoiled means rulers fall

🏚️ Smaller trees lose their shelter too

➡️ If the strong fall, the weak follow

## 🌳 Howl, O Ye Oaks Of Bashan

Bashan was a region east of the Jordan river, known for rich pasture and thick oak forests.

Its oaks were already a symbol of real strength elsewhere in the Old Testament.

The forest of the vintage pictures one of the thickest, most protected forests anywhere falling flat.

If even Bashan's oaks cannot stand, no hiding place is left standing anywhere.

🌳 Bashan means rich pasture and oak forests

💪 Oaks there symbolized real strength

🪓 Even the thickest forest falls here

📖 No hiding place survives this judgment

## 🦁 The Pride Of Jordan Is Spoiled

The word pride here does not mean arrogance.

It names the thick, lush plant growth that once lined the Jordan river's banks.

That growth once gave lions a natural place to hide and hunt.

Jeremiah uses this same phrase elsewhere to describe this exact kind of destruction.

A voice of shepherds howling and lions roaring pictures that shelter being destroyed completely.

🌾 Pride of Jordan means thick river growth

🦁 Lions once hid inside that growth

😱 Shepherds and lions lose their shelter

📖 Jeremiah repeats this same picture

# Zechariah 11:4-6
# 😢 The Flock Doomed To Slaughter
---
## 🐑 Feed The Flock Of The Slaughter

God tells Zechariah to act out being a shepherd.

He is not just describing a vision, he is told to live out this role himself.

The flock of the slaughter means sheep raised and sold only to be killed.

This flock pictures the people of Israel and Judah under coming judgment.

Zechariah becomes a living picture of God's own care for a doomed people.

🐑 Zechariah acts out being a shepherd

🔪 Slaughter flock means sheep raised to die

🌍 This flock pictures Israel under judgment

📖 God cares even for a doomed people

## 👑 Whose Possessors Slay Them, And Hold Themselves Not Guilty

Possessors means the people who own and control the flock.

These owners kill the sheep without feeling any guilt at all.

This pictures Israel's own leaders profiting from the people instead of protecting them.

A shepherd is supposed to guard the flock, not profit from its death.

👑 Possessors means the flock's own owners

🔪 They kill without any guilt

💰 Leaders profit instead of protecting

📖 True shepherds guard, they do not destroy

## 💰 Blessed Be The LORD, For I Am Rich

The sellers here use God's own name to celebrate their profit.

They are not thanking God out of genuine faith.

They are using religious words to dress up pure greed.

Exploiting others is never truly blessed, no matter what words get said over it.

💰 Sellers celebrate getting rich

🙏 They misuse God's name for greed

🎭 Worship language covers real corruption

➡️ Exploiting others is never truly blessed

## 💔 Their Own Shepherds Pity Them Not

Compassion is what makes a shepherd trustworthy in the first place.

These shepherds have none left for the flock entrusted to them.

Because of that failure, God says He will no longer hold back judgment either.

I will deliver the men every one into his neighbour's hand means God stops shielding the nation.

When leaders stop caring, people lose protection from every direction.

💔 Shepherds show the flock no pity

🛑 God withdraws His own protection

⚔️ The nation is handed to enemies

📖 Failed leaders leave people exposed

# Zechariah 11:7-9
# 🪵 Two Staves Named Beauty And Bands
---
## 🙏 O Poor Of The Flock

Zechariah now steps fully into the shepherd role God assigned him.

The poor of the flock means the humble, faithful remnant hidden inside a nation under judgment.

Even while judgment falls on the whole flock, this smaller group still gets real care.

God's attention to the faithful few continues even inside national judgment.

🐑 Zechariah takes up the shepherd role

🙏 Poor of the flock means faithful remnant

👀 God still watches this smaller group

📖 Judgment does not erase God's care

## 🦯 The One I Called Beauty, And The Other I Called Bands

A shepherd's staff was the basic tool used to guide, count, and protect a flock.

Zechariah carries two staves here, and each one gets its own name.

Beauty pictures God's gracious, favorable rule over His people.

Bands pictures the unity holding the divided nation of Judah and Israel together.

Both staves matter again later in this same chapter.

God's gracious rule and the people's unity were both about to be broken in public.

🦯 A staff was a shepherd's basic tool

✨ Beauty pictures God's gracious rule

🔗 Bands pictures the nation's unity

➡️ Both staves return later in the chapter

## 👑 Three Shepherds Also I Cut Off In One Month

Exactly who these three shepherds were is not stated plainly in the text.

Many scholars believe they were a line of corrupt leaders removed quickly.

What matters most is the speed, three leaders gone within a single month.

God was actively clearing away failed leadership, not letting it continue unchecked.

❓ The three shepherds are not named

👑 Many scholars see corrupt leaders removed

⏱️ Three removed within one single month

📖 God actively ends failed leadership

## 🤢 My Soul Lothed Them, And Their Soul Also Abhorred Me

Lothed is an old spelling of loathed, meaning a deep hatred or disgust.

This rejection goes in both directions at once.

The shepherd grows disgusted with the flock's behavior.

The flock, in turn, grows to hate the shepherd sent to care for them.

A relationship this broken cannot continue the way it was.

🤢 Lothed means a deep disgust

↔️ The rejection goes both directions

💔 Shepherd and flock both grow to hate

➡️ A relationship this broken cannot last

## 🛑 That That Dieth, Let It Die

This is the shepherd formally refusing to keep caring for a flock that already rejected him.

That that dieth, let it die means he will no longer step in to save the dying.

Let the rest eat every one the flesh of another pictures total chaos among the flock.

Removing a true shepherd does not just leave a gap, it leaves the flock devouring itself.

🛑 The shepherd stops stepping in

💀 Let it die means no rescue

😱 Flesh of another pictures total chaos

📖 No shepherd means the flock turns on itself

# Zechariah 11:10-11
# ⚖️ Breaking The Covenant
---
## 🦯 I Took My Staff, Even Beauty, And Cut It Asunder

Breaking a shepherd's staff was never a small or accidental act.

It was a visible, deliberate sign meant to be seen by everyone watching.

Cutting the staff named Beauty pictures God ending the gracious protection He had kept over His people.

God Himself chose to end this protection, not fate or circumstance.

🦯 Breaking a staff was a deliberate sign

✨ Beauty's breaking ends gracious protection

👀 Done visibly for everyone to see

📖 God chose to end this Himself

## 🛡️ Break My Covenant Which I Had Made With All The People

This covenant is not the law given at Sinai.

It pictures the quiet protection God had kept over His people among the nations around them.

Breaking it removes a shield that had been standing the whole time without most people noticing it.

The safety they always assumed was there now comes to an end.

🛡️ This covenant means God's quiet protection

🌍 It shielded them from surrounding nations

🚫 That shield is now removed

➡️ Assumed safety was never truly guaranteed

## 👁️ The Poor Of The Flock That Waited Upon Me Knew

Most people watching this would have seen only a broken stick.

Only the faithful remnant already named back in verse seven understood what they were really watching.

They recognized this moment as God's own word acted out, not a random event.

Spiritual discernment let a small group see what the whole crowd missed.

🪵 Most people saw only a broken stick

🙏 The faithful remnant understood its meaning

👁️ They saw God's word, not an accident

📖 Discernment sees what crowds miss

# Zechariah 11:12-14
# 🪙 Thirty Pieces Of Silver
---
## 💰 If Ye Think Good, Give Me My Price

Forbear is an old word meaning hold back or refrain.

The shepherd asks to be paid a true wage for his service.

This also tests how much the flock actually values him.

He leaves the choice genuinely open, pay what seems right or do not pay at all.

Their answer, whatever it turns out to be, reveals exactly how they see him.

🗣️ Forbear means hold back or refrain

💰 The shepherd asks for fair payment

🧪 This also tests how they value him

➡️ Their answer reveals their true opinion

## 🪙 They Weighed For My Price Thirty Pieces Of Silver

Thirty pieces of silver was not a generous wage.

The law in Exodus set that exact price as payment for a slave accidentally killed by an ox.

Valuing God's own shepherd at a slave's death price was a deliberate insult.

Centuries later, the same exact sum gets paid to betray Jesus in Matthew twenty seven.

🪙 Thirty silver pieces equals a slave's price

📜 Exodus set that price for a dead slave

💔 This was a deliberate insult

📖 Matthew twenty seven repeats this sum

## 😏 Cast It Unto The Potter, A Goodly Price That I Was Prised At Of Them

Prised is an old way of saying appraised or valued.

God repeats the price back with obvious irony, calling a slave's price a goodly price.

Throwing the money to a potter, a common tradesman, treats the payment as worthless.

The insult is answered with matching contempt, not quiet acceptance.

💰 Prised means appraised or valued

😏 God repeats the price with irony

🏺 The potter receives a worthless toss

📖 Contempt is met with contempt

## 🏛️ I Took The Thirty Pieces Of Silver, And Cast Them To The Potter In The House Of The LORD

This exchange does not happen in a back alley or a marketplace.

It happens inside the Temple itself, in the house of the LORD.

That location made the insult both public and formal, not a private transaction.

Matthew twenty seven points back to this same scene when Judas throws down his own silver.

That silver also ends up buying a potter's field, tying both moments together across centuries.

🏛️ The exchange happens inside the Temple

📢 This made the insult public and formal

🪙 Judas later repeats this same sum

📖 One prophecy spans hundreds of years

## 🔗 Then I Cut Asunder Mine Other Staff, Even Bands

The first staff, Beauty, was already broken back in verse ten.

Now the second staff, Bands, gets broken too.

Bands pictured the unity holding Judah and Israel together as one people.

Breaking it acts out a real, visible division between brothers meant to stand as one nation.

🦯 The second staff was named Bands

🔗 Bands pictured the nation's unity

💔 Breaking it acts out real division

➡️ Brothers meant for unity are split apart

# Zechariah 11:15-17
# 👺 The Foolish And Idol Shepherd
---
## 🎭 Take Unto Thee Yet The Instruments Of A Foolish Shepherd

Zechariah receives a brand new acting assignment here.

Earlier he played a true shepherd caring for the flock despite rejection.

Now he is told to act out the opposite role, a foolish shepherd who does not care at all.

This second performance pictures a future leader who will fail the flock on purpose.

🎭 Zechariah gets a second acting role

🙏 The first role pictured true care

👺 This new role pictures total neglect

📖 It points to a future failed leader

## 🐑 Neither Shall Seek The Young One, Nor Heal That That Is Broken

A true shepherd checks on sheep that wander off and get cut off from the group.

A true shepherd searches for the young ones who cannot keep up.

A true shepherd heals the ones who are hurt or broken.

This foolish shepherd refuses every single one of those basic duties.

🐑 True shepherds check on the lost

🐣 True shepherds search for the young

🩹 True shepherds heal the broken

📖 He refuses every single duty

## 🍖 He Shall Eat The Flesh Of The Fat, And Tear Their Claws In Pieces

A true shepherd feeds the flock.

This shepherd instead feeds on the flock, eating the best animals for himself.

Tearing their claws, or hooves, in pieces pictures total exploitation, taking everything down to the last scrap.

Leadership meant to serve the people turns into leadership that devours them instead.

🍖 This shepherd feeds on the flock

💰 He takes the best for himself

🦴 Exploitation strips away everything

📖 Service turns into devouring

## 🗿 Woe To The Idol Shepherd That Leaveth The Flock

Idol here means worthless or empty, the same way an idol is a lifeless statue.

This shepherd does not just act unkind, he eventually abandons the flock completely.

Woe is a formal pronouncement of coming disaster, not a casual complaint.

A shepherd who abandons the flock he was trusted with cannot escape judgment either.

🗿 Idol here means worthless and empty

🚶 This shepherd abandons the flock

⚠️ Woe announces coming disaster

📖 Abandoning the flock brings judgment

## 💪 The Sword Shall Be Upon His Arm, And Upon His Right Eye

In this kind of imagery, the arm pictures a person's strength and power to act.

The eye pictures their ability to see and guide others well.

This shepherd misused both, so judgment strikes both at once.

His arm withers and his eye goes dark, leaving him with neither power nor vision left.

💪 The arm pictures strength to act

👁️ The eye pictures vision to guide

⚔️ Judgment strikes down both at once

📖 The punishment matches the failure
`.trim();

export const ZECHARIAH_ELEVEN_PERSONAL_SECTIONS = parseZechariahElevenRawNotes(ZECHARIAH_ELEVEN_RAW_NOTES);
