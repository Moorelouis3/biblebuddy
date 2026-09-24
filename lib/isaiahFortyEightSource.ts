export type IsaiahFortyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFortyEightRawNotes(rawText: string): IsaiahFortyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFortyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+48:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 48 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+48:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+48:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 48 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 48,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 48:${startVerse}` : `Isaiah 48:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Isaiah 48 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FORTY_EIGHT_RAW_NOTES = `# Isaiah 48:1-2
# 🗣️ Called By Name, But Not In Truth
---
## 🤼 Called By The Name Of Israel

Israel was not Jacob's original name.

God changed it after Jacob wrestled with Him one night at a river.

That new name marked him as father of an entire covenant nation.

This chapter opens by reminding them exactly who they claim to be.

🤼 God changed Jacob's name after wrestling him
📜 The new name marked a covenant nation
👪 Israel becomes shorthand for God's whole people
📖 This chapter reminds them who they are

## 💧 Come Forth Out Of The Waters Of Judah

Waters here is an old way of describing where a child comes from at birth.

The phrase pictures the entire nation flowing out of one family line.

Judah was one of Jacob's twelve sons and the ancestor of a whole tribe.

By New Testament times, Judah's tribe carried the family line that led to Jesus.

💧 Waters is an old picture of birth
👪 The whole nation flows from one family
🌿 Judah was one of Jacob's twelve sons
📖 That line later leads to Jesus

## 🗣️ Swear By The Name Of The LORD

Swearing by someone's name meant calling on them to witness a promise.

To swear by the LORD's name was to invoke Him as the highest possible witness.

Breaking that kind of oath was not treated as a simple lie.

It was treated as an offense against God himself.

Israel used this exact language even while their hearts were far from Him.

🗣️ Swearing called God to witness a promise
⚖️ Breaking it was treated as a real offense
💔 Israel used this language with a far heart
📖 Words alone never proved a faithful heart

## 🎭 But Not In Truth, Nor In Righteousness

This phrase is the turn that exposes everything said before it.

Israel used the right words, the right name, and the right customs.

None of it was backed by truth or right living.

Religious language without a changed heart is empty performance.

God is naming the gap between what they said and how they actually lived.

🎭 Israel had the words but not the truth
📜 Right customs did not equal a right heart
💔 Religion without truth becomes empty performance
📖 God names the gap between words and life

## 🏙️ They Call Themselves Of The Holy City

The holy city refers to Jerusalem, where God's temple stood.

Calling themselves this claimed belonging to the city devoted to God.

A name alone does not guarantee a right relationship with God.

This claim sets up the same contrast running through the whole chapter.

🏙️ The holy city means Jerusalem, God's city
🛕 It was the city where the temple stood
🏷️ A name alone does not guarantee closeness
📖 This sets up the chapter's whole contrast

## 🧍 Stay Themselves Upon The God Of Israel

Stay here is an old word for lean or rely on for support.

The picture is someone putting their full weight on something solid.

Israel claimed to be leaning on God for support.

The picture is like a person leaning their full weight on a strong wall.

Whether that leaning was real is exactly what this chapter tests.

🧍 Stay means lean on for support
🧱 The picture is full weight on something solid
🙏 Israel claimed to lean on God this way
📖 This chapter tests if that leaning was real

## ⚔️ The LORD Of Hosts Is His Name

Hosts is an old word for armies, both on earth and in heaven.

LORD of hosts pictures God as commander over every army that exists.

This title appears throughout Isaiah whenever God's power needs emphasis.

The very people leaning on this powerful name were not living up to it.

⚔️ Hosts is an old word for armies
👑 LORD of hosts means commander over every army
🔁 This title repeats often through Isaiah
📖 They did not live up to this name

# Isaiah 48:3-5
# 📜 I Declared It Before It Happened
---
## 📜 I Have Declared The Former Things From The Beginning

Former things means past events God predicted long before they ever happened.

God is pointing back at a long track record of accurate prediction.

He announced outcomes before they ever occurred.

Then He watched them come true exactly as He said.

This track record is the evidence God offers before making His next claim.

📜 Former things means events predicted long ago
🎯 God announced outcomes before they happened
✅ Those predictions came true exactly as said
📖 This track record backs God's next claim

## ⚡ I Did Them Suddenly, And They Came To Pass

Suddenly here stresses how quickly God's word turned into reality.

There was no long gap between His announcement and the actual event.

A human plan can take years and still fail along the way.

God's word does not work that way.

It simply happens.

⚡ Suddenly means very little time passed
🎯 God's word became reality almost right away
🕰️ Human plans can drag on for years
📖 God's word simply happens when He speaks

## 🦴 Thy Neck Is An Iron Sinew, And Thy Brow Brass

A sinew is the tough cord that connects muscle to bone.

Calling it iron pictures a neck too stiff and hard to bend.

A stiff neck was the Bible's picture for stubborn refusal to change.

Brass for a forehead pictures a face that will not show shame.

God names this stubbornness honestly before explaining why He warned them anyway.

🦴 A sinew connects muscle to bone
🗿 An iron neck pictures stubborn refusal to bend
😐 A brass brow pictures a face without shame
📖 God names their stubbornness before He explains

## 🎯 Lest Thou Shouldest Say, Mine Idol Hath Done Them

God explains His own motive for announcing things ahead of time.

If Israel did not know it was coming, they might credit a false god instead.

Idols were carved or cast objects that people in this culture worshipped as gods.

By naming events first, God made sure no idol could steal credit for what He alone did.

🎯 God explains His own motive here
🗿 Idols were carved objects worshipped as gods
🚫 Israel might have credited a false god
📖 Naming it first kept the credit with God

# Isaiah 48:6-8
# 🙉 New Things You Never Knew
---
## 🔄 New Things From This Time, Even Hidden Things

Until now God had been reviewing things He predicted long ago.

Here He shifts to something different, information Israel has never heard before.

Hidden things means knowledge that was kept back until exactly the right moment.

God is about to reveal what comes next, not just recall what already happened.

🔄 God shifts from old news to new
🙈 Hidden things means kept back until now
⏰ God reveals things at the right moment
📖 God is about to say what comes next

## 🆕 Created Now, And Not From The Beginning

These new events were not part of God's earlier announcements.

They are freshly determined, decided and declared here for the first time.

This removes any excuse that Israel somehow already knew.

God is closing off every possible way to dodge the point.

🆕 These events are freshly declared now
🚫 They were never part of the old announcements
🙅 Israel cannot claim they already knew
📖 God closes off every excuse to dodge

## ⚖️ Thou Wast Called A Transgressor From The Womb

Transgressor means someone who breaks a clear command on purpose.

From the womb is a way of saying this pattern goes back to the very start.

God is not describing one bad decision here.

He is describing a lifelong pattern of rebellion.

Israel's rebellion was not a passing phase.

It went back to the very beginning.

⚖️ Transgressor means someone who breaks a command
👶 From the womb points to the very start
🔁 This describes a lifelong pattern, not one choice
📖 Israel's rebellion started from the very first day

## 👂 Thine Ear Was Not Opened

Ear not opened does not mean Israel was physically deaf.

It means they heard the words but refused to actually listen.

The Bible often uses opened ears as a picture of real understanding.

Israel had the sound without the understanding for a very long time.

👂 Ear not opened does not mean deaf
🙉 It means hearing without truly listening
💡 Opened ears picture real understanding in the Bible
📖 Israel had sound without understanding for years

# Isaiah 48:9-11
# 🏷️ For My Name's Sake
---
## ⏸️ For My Name's Sake Will I Defer Mine Anger

Defer means to hold something off and delay it.

God is choosing to hold back anger Israel had actually earned.

The reason given is not Israel's goodness.

It is God's own name and reputation among the nations.

Mercy here flows from who God is, not from what Israel deserved.

⏸️ Defer means to hold something off
😠 God is holding back anger Israel earned
🏷️ The reason is God's name, not Israel's goodness
📖 Mercy flows from who God is

## 🔥 I Have Refined Thee, But Not With Silver

Refining is the process of heating metal until impurities rise and burn away.

Normally that process is used on silver to make it pure and valuable.

God says Israel was refined a different way.

The furnace here was suffering, not literal fire on metal.

Affliction became the process that purified the nation.

🔥 Refining burns away impurities in metal
🥈 That process is normally used on silver
😔 Israel was refined through suffering instead
📖 Affliction became the process of purifying

## 😳 How Should My Name Be Polluted

Polluted here means dishonored or made to look unclean.

If God abandoned Israel completely, other nations would notice.

It would look like He could not keep His own promise.

God's actions are tied to His reputation among every watching nation.

😳 Polluted means dishonored or made unclean
👀 Other nations were watching how this played out
🤝 Abandoning Israel would look like a broken promise
📖 God's actions protect His name before every nation

## ✨ I Will Not Give My Glory Unto Another

Glory here means the honor and praise that belong to God alone.

This line closes the same point raised earlier about idols stealing credit.

No carved image and no other god will ever share this honor.

What God does, God alone gets credit for.

✨ Glory means the honor that belongs to God
🔁 This echoes the idol warning from verse five
🗿 No other god will share this credit
📖 God alone gets credit for what He does

# Isaiah 48:12-13
# 🌅 I Am The First, I Am The Last
---
## 📣 O Jacob And Israel, My Called

Called here means chosen and summoned, not the modern idea of a phone call.

Both names appear together, Jacob for the man and Israel for the covenant nation.

My called marks them as a people God Himself set apart and named.

This is a relationship word, not just a title.

📣 Called means chosen and summoned by God
👪 Jacob and Israel name the same people
🏷️ My called marks them as set apart
📖 This is a relationship, not just a title

## 🌅 I Am The First, I Also Am The Last

First and last describe God existing before anything else began.

They also describe Him remaining after everything else comes to an end.

No empire, no idol, and no rival existed before Him or will outlast Him.

This claim leaves no room for any other god to share the title.

🌅 First means existing before anything else
🌇 Last means remaining after everything ends
🚫 No idol or empire can claim this title
📖 This leaves no room for another god

## 🏗️ Mine Hand Also Hath Laid The Foundation Of The Earth

A foundation is the base a builder lays before anything else goes up.

Saying God's hand laid it pictures personal involvement.

It is not describing some distant, impersonal force.

The same God who built creation is the one speaking in this chapter.

🏗️ A foundation is a builder's first step
✋ God's hand pictures personal involvement
🌍 This is not a distant, impersonal force
📖 The builder of creation is speaking now

## 🌌 When I Call Unto Them, They Stand Up Together

This pictures the heavens obeying the instant God speaks.

Stars and skies do not argue or delay when God calls them.

That instant obedience stands in sharp contrast to Israel in this chapter.

The creation listens better than the people God actually chose.

🌌 The heavens obey the instant God speaks
⭐ Stars do not argue or delay
⚖️ This contrasts with Israel's slow ears
📖 Creation listens better than God's own people

# Isaiah 48:14-16
# ❓ Which Among Them Declared This?
---
## ❓ Which Among Them Hath Declared These Things

This question challenges every idol and false god named earlier in Isaiah.

None of them ever predicted anything that actually came true.

Only the LORD can point to a real track record of fulfilled words.

The question expects silence, because there is no other answer.

❓ This challenges every false god named earlier
🗿 None of them ever predicted anything true
✅ Only the LORD has a real track record
📖 The question expects total silence in reply

## 👑 He Will Do His Pleasure On Babylon

He refers to a specific ruler God would raise up to judge Babylon.

Isaiah names this same ruler directly a few chapters earlier as Cyrus.

Pleasure here means God's chosen purpose, not casual enjoyment.

A pagan king becomes the tool God uses to judge a pagan empire.

👑 He points to a ruler God raises up
📛 Isaiah names this ruler directly as Cyrus
🎯 Pleasure means purpose, not casual enjoyment
📖 A pagan king judges a pagan empire

## 🔁 I, Even I, Have Spoken

Repeating I twice is a way of underlining a claim in Hebrew poetry.

God is making sure no one credits this plan to chance or another source.

The repetition matches a pattern already used earlier in this same chapter.

This plan has exactly one author.

🔁 Repeating I twice underlines a claim in Hebrew
🎯 God rules out chance or another source
📜 This repetition already appeared earlier in the chapter
📖 This plan has exactly one author

## 🗣️ The Lord GOD, And His Spirit, Hath Sent Me

The speaker suddenly changes from God to someone God has sent.

Many readers connect this to the prophet delivering God's message here.

Others see it reaching further forward to a greater sent one still to come.

The Lord, His Spirit, and the one sent all appear together in a single line.

🗣️ The speaker shifts to one God sent
📜 Many connect this to Isaiah the prophet
🔮 Others see it pointing further forward
📖 Lord, Spirit, and sent one all appear here

# Isaiah 48:17-19
# 🏞️ O That Thou Hadst Hearkened
---
## 👨‍👩‍👧 Thy Redeemer, The Holy One Of Israel

A redeemer in this culture was often a family member who bought back what was lost.

A redeemer could free a relative sold into slavery or debt.

God applies that same family word to Himself here.

Holy One of Israel is a title Isaiah uses for God again and again.

👨‍👩‍👧 A redeemer was often a family member
⛓️ Redeemers freed relatives from slavery or debt
🤝 God applies that family word to Himself
📖 Holy One of Israel repeats often in Isaiah

## 💰 Teacheth Thee To Profit

Profit here does not mean piling up money.

It means real benefit, the kind of life that actually goes well.

God pictures Himself as a teacher aiming Israel toward what truly helps them.

His instructions were never meant to hold them back.

💰 Profit here is not about money
🌱 It means genuine benefit and a good life
👨‍🏫 God pictures Himself as a teacher
📖 His instructions aim toward what helps them

## 😔 O That Thou Hadst Hearkened To My Commandments

O that is an old way of expressing deep regret or longing.

This is not a future offer.

It is a look back at a road not taken.

God is naming exactly what obedience would have produced.

😔 O that expresses deep regret or longing
⏪ This looks back, it does not look forward
🛤️ It names a road that was not taken
📖 God names what obedience would have produced

## 🏞️ Thy Peace Been As A River, And Thy Righteousness As The Waves Of The Sea

A river in this region flowed steadily, unlike streams that dried up in summer.

Peace like a river pictures calm that never runs out.

Waves of the sea picture righteousness arriving again and again without end.

Both images describe abundance Israel gave up by refusing to listen.

🏞️ A steady river never runs dry
🕊️ Peace like a river pictures constant calm
🌊 Waves picture righteousness arriving again and again
📖 Israel gave up this abundance by not listening

## 👪 Thy Seed Also Had Been As The Sand

This promise echoes what God told Abraham generations earlier.

Seed means descendants, the children and grandchildren who would carry the family forward.

Sand and gravel both picture a number too large to count.

That same ancient promise was still available, if only they had listened.

👪 Seed means descendants carrying the family forward
🏖️ Sand pictures a number too large to count
🪨 Gravel repeats the same picture a second way
📖 The old promise to Abraham was still available

# Isaiah 48:20-22
# 🏃 Go Ye Forth Of Babylon
---
## 🏃 Go Ye Forth Of Babylon, Flee Ye From The Chaldeans

This command looks ahead to a release that had not happened yet.

Israel was still in Babylon when Isaiah wrote this down.

The city just judged in the chapter before this one is the same city they are told to leave.

God is already planning the exit before the exile even fully begins.

🏃 This command looks toward a future release
🏙️ Israel was still living in Babylon
⚖️ This is the same city judged earlier
📖 God plans the exit before exile even begins

## 🎤 With A Voice Of Singing Declare Ye

This release is announced with singing, not a quiet whisper.

A voice of singing pictures loud, public celebration.

The news is meant to travel, not stay hidden.

Freedom this large deserves to be shouted, not just felt privately.

🎤 The release is announced with singing
📢 A voice of singing means loud celebration
🌍 The news is meant to travel far
📖 Freedom this large deserves to be shouted

## 💰 The LORD Hath Redeemed His Servant Jacob

Redeemed means bought back or rescued at a cost.

This is the same redeemer title introduced earlier in this chapter.

Servant Jacob names the whole nation by its ancestor.

This is the same naming pattern used at the very start of the chapter.

💰 Redeemed means bought back at a cost
🔁 This repeats the redeemer title from verse 17
👪 Servant Jacob names the whole nation again
📖 The chapter ends by fulfilling its own promise

## 🏜️ They Thirsted Not When He Led Them Through The Deserts

This line looks back at Israel's first exodus out of Egypt.

God provided water from a rock in that wilderness journey.

This new release is pictured as a second exodus with the same kind of care.

The same God who provided then promises to provide again.

🏜️ This recalls Israel's first exodus from Egypt
💧 God once provided water from a rock
🔁 This release is pictured as a second exodus
📖 The same God promises to provide again

## 🪨 He Clave The Rock Also, And The Waters Gushed Out

Clave is an old word meaning split or struck open.

This recalls the moment Moses struck a rock and water poured out for the people.

That miracle happened during the original wilderness journey after Egypt.

God is promising that same kind of unexpected provision again.

🪨 Clave means split or struck open
🖐️ This recalls Moses striking the rock
🏜️ That miracle happened in the wilderness after Egypt
📖 God promises that same provision again

## 🔚 There Is No Peace, Saith The LORD, Unto The Wicked

This is the closing line of the entire chapter.

It directly contrasts the peace like a river promised back in verse eighteen.

That peace was available, but it was never guaranteed to everyone.

The wicked forfeit the very peace God offered them the whole time.

🔚 This closes the entire chapter
🌊 It contrasts the peace from verse 18
🚫 That peace was never guaranteed to everyone
📖 The wicked forfeit the peace God offered`.trim();

export const ISAIAH_FORTY_EIGHT_PERSONAL_SECTIONS = parseIsaiahFortyEightRawNotes(ISAIAH_FORTY_EIGHT_RAW_NOTES);
