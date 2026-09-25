export type IsaiahSixtySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahSixtySixRawNotes(rawText: string): IsaiahSixtySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahSixtySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+66:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 66 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+66:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+66:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 66 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 66,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 66:${startVerse}` : `Isaiah 66:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Isaiah 66 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_SIXTY_SIX_RAW_NOTES = `# Isaiah 66:1-2
# 👑 The Heaven Is My Throne
---
## 👑 The Heaven Is My Throne, And The Earth Is My Footstool

God says His rule reaches beyond anything human hands could build.

A throne is where a king sits to rule.

A footstool sits under a king's feet, always beneath him.

Heaven and earth are both under God's authority in this picture.

No temple, however grand, could ever contain a God this large.

Solomon said something close to this when he dedicated the temple centuries earlier.

God was already too big for any house before Isaiah wrote this down.

👑 Heaven pictured as God's throne
🦶 Earth pictured as His footstool
📏 Both are under His rule
📖 No temple could contain Him

---
## 🏛️ Where Is The House That Ye Build Unto Me

This sounds like a real question, but it is not looking for an answer.

God is challenging the whole idea that a building could hold Him.

People built temples across the ancient world to house their gods locally.

Israel's own temple was never meant to work that way.

The temple was a meeting place, not a container for God's presence.

This question exposes a wrong assumption before it can take root.

🏛️ Not a real request for information
🌍 Ancient peoples built houses for local gods
⛪ Israel's temple was a meeting place only
📖 The question corrects a wrong assumption

---
## 🌍 For All Those Things Hath Mine Hand Made

This reminds the reader that God made heaven and earth already.

Nothing exists that God did not first bring into being.

Building Him a house would be like offering a gift He already owns.

The whole created world already belongs to Him completely.

No offering could add anything to a God who made everything first.

🌍 Reminds the reader God made everything
🎁 A house would already be His own gift
🙌 The whole world already belongs to Him
📖 Nothing can be added to the Maker

---
## 💔 But To This Man Will I Look, Even To Him That Is Poor And Of A Contrite Spirit

"Contrite" means broken and sorry for sin, not stubborn or proud.

God says here exactly who gets His attention.

It is not the person with the biggest building project.

It is the person who comes to Him humble and low.

"Trembleth at my word" adds someone who takes God's word seriously.

A humble heart matters more to God than any structure ever could.

💔 Contrite means broken and sorry
👀 Names exactly who God looks toward
🙇 Humility matters more than buildings
📖 A serious heart, not a grand house

# Isaiah 66:3-4
# 🐖 Chosen Their Own Abominations
---
## 🐂 He That Killeth An Ox Is As If He Slew A Man

This does not mean killing an ox for sacrifice was wrong by itself.

Ox sacrifice was a normal, God approved practice under the law.

The problem was who was doing the killing and why.

People offering right sacrifices were living wicked lives everywhere else.

The ritual looked correct on the outside while the heart stayed corrupt.

🐂 Ox sacrifice itself was not the problem
✅ It was a normal, approved practice
💔 The worshippers' hearts stayed corrupt
📖 A right ritual with a wrong heart

---
## 🐕 He That Sacrificeth A Lamb, As If He Cut Off A Dog's Neck

Dogs were considered unclean scavengers in this culture, not pets.

Breaking a dog's neck instead of a clean kill was a brutal, unclean act.

Comparing a lamb offering to this makes the sacrifice sound disgusting.

God is saying the offering has become just as repulsive to Him.

Worship offered by a corrupt heart disgusts God as much as this ugly image.

🐕 Dogs were unclean scavengers, not pets
💢 A broken neck was a brutal, unclean act
🐑 The lamb offering is compared to this
📖 Corrupt worship disgusts God this much

---
## 🌾 He That Offereth An Oblation, As If He Offered Swine's Blood

"Oblation" means a grain or food offering given to God.

Swine, or pigs, were forbidden as unclean under the law of Moses.

Their blood would have been one of the most unclean substances imaginable.

Pairing a proper grain offering with this shows how far the worship had fallen.

What should honor God had become as offensive as its most unclean opposite.

🌾 Oblation means a grain or food offering
🐖 Swine's blood was forbidden and unclean
⚖️ The pairing shows how far worship fell
📖 Honor turned into offense

---
## 🛤️ Yea, They Have Chosen Their Own Ways, And Their Soul Delighteth In Their Abominations

This verse sums up the four comparisons just given.

"Chosen their own ways" means they picked their own path over God's instructions.

"Abominations" means things God considers deeply detestable.

The people were not confused about this, they delighted in it on purpose.

This was not weakness or mistake, it was a choice made with real pleasure.

🛤️ Chosen their own ways means their own path
🚫 Abominations means deeply detestable things
😈 The choice was made on purpose
📖 They delighted in it, not just drifted

---
## 🌀 I Also Will Choose Their Delusions, And Will Bring Their Fears Upon Them

"Delusions" here means the false things they trusted turning against them.

God responds to their choice with a matching choice of His own.

Whatever they feared would now actually happen to them.

This is a form of judgment that fits the crime exactly.

God lets people reap exactly what they chose to plant.

🌀 Delusions means the false things they trusted
🔁 God matches their choice with His own
😨 Their fears will now come true
📖 Judgment fits the crime exactly

---
## 📢 Because When I Called, None Did Answer, When I Spake, They Did Not Hear

This explains why judgment falls the way it does here.

God had reached out to them repeatedly before this point.

"None did answer" and "they did not hear" both point to the same refusal.

The judgment did not come without warning or without cause.

God's patience had already been tested and ignored many times before this.

📢 God had reached out repeatedly
🙉 None did answer means total refusal
⏳ Judgment did not come without warning
📖 Patience tested and ignored before this

# Isaiah 66:5-6
# 😨 Hear The Word Of The LORD
---
## 👂 Hear The Word Of The LORD, Ye That Tremble At His Word

This verse speaks directly to the humble group named back in verse two.

"Tremble at his word" describes people who take God's word with real seriousness.

God now turns to comfort exactly this group after describing judgment on others.

The chapter keeps splitting into two audiences, the rebellious and the humble.

Comfort always follows judgment for the ones who actually feared God.

👂 Speaks directly to the humble group
😨 Tremble means taking God's word seriously
⚖️ Two audiences run through this chapter
📖 Comfort follows judgment for the humble

---
## 👪 Your Brethren That Hated You, That Cast You Out For My Name's Sake

"Your brethren" describes fellow Israelites, not outsiders or enemies.

This pictures believers being rejected by their own people for staying faithful.

Being cast out for God's name means the rejection was about loyalty to Him.

This kind of division inside God's own people runs through the whole book.

Faithfulness sometimes costs the most inside a person's own family or community.

👪 Brethren means fellow Israelites, not outsiders
🚪 Cast out describes real rejection
🏷️ The rejection was about loyalty to God
📖 Faithfulness can cost the most at home

---
## 🗣️ Said, Let The LORD Be Glorified, But He Shall Appear To Your Joy

This describes people mocking the faithful with hollow religious words.

"Let the LORD be glorified" was said sarcastically by those who cast them out.

God promises to answer that mockery by actually showing up for the humble group.

The mockers will end up ashamed instead of the people they mocked.

God settles this argument Himself, and He settles it in the open.

🗣️ A sarcastic, hollow religious phrase
😏 Said by the ones doing the rejecting
🎉 God shows up for the humble instead
📖 The mockers end up ashamed

---
## 🔊 A Voice Of Noise From The City, A Voice From The Temple

This pictures a sudden commotion breaking out in Jerusalem.

The noise begins in the temple itself, the center of worship.

This signals God is about to act, not just speak.

Something is starting that the whole city will notice.

God's response arrives as an event, not just words on a page.

🔊 A sudden commotion breaks out
⛪ It begins right at the temple
👀 The whole city will notice
📖 God's response becomes a real event

---
## ⚖️ A Voice Of The LORD That Rendereth Recompence To His Enemies

"Recompence" means paying back exactly what is deserved.

This voice belongs to God Himself, not a human king or army.

His enemies here are the rebellious group described earlier in the chapter.

The judgment promised earlier finally becomes action in this moment.

Every threat made earlier in the chapter comes due here.

⚖️ Recompence means paying back what is owed
🗣️ The voice belongs to God Himself
😠 His enemies are the rebels from earlier
📖 Earlier threats become action here

# Isaiah 66:7-9
# 🤰 Before She Travailed
---
## 🤰 Before She Travailed, She Brought Forth

"Travailed" means went through the pain of labor before childbirth.

Normally labor pains come first, then the baby is born after.

This verse describes birth happening before the pain even starts.

The order of nature is reversed on purpose in this picture.

Something is about to happen faster and easier than anyone would expect.

🤰 Travailed means labor pain before birth
🔄 Normally pain comes first, then birth
⚡ Here the order is reversed
📖 Something happens faster than expected

---
## 👶 Before Her Pain Came, She Was Delivered Of A Man Child

This repeats the same idea from the line before with new words.

Hebrew poetry often says one thing twice in slightly different language.

"A man child" simply means a son was born.

The repetition makes the reversal impossible to miss.

This unusually easy, sudden birth is the image the next verses explain.

🔁 Repeats the previous line's idea
📜 Hebrew poetry often doubles a thought
👶 A man child means a son
📖 Sets up the explanation that follows

---
## ❓ Who Hath Heard Such A Thing, Who Hath Seen Such Things

These questions expect the answer no one, this has never happened before.

The writer is building up how strange and unprecedented this image is.

This kind of birth pattern does not happen in the ordinary world.

The strangeness is the whole point, it signals something supernatural.

God is describing something only He could bring about.

❓ Expects the answer no one, ever
🌍 Nothing like this happens naturally
✨ The strangeness signals something supernatural
📖 Only God could bring this about

---
## 🐢 Shall The Earth Be Made To Bring Forth In One Day

This shifts the image from one baby to an entire nation.

Normally a nation forms slowly, over many generations.

This pictures a whole nation appearing suddenly, all at once.

The question sets up what actually happened with Zion, described next.

God is preparing the reader for a birth on a national scale.

🌍 Shifts from one baby to a nation
🐢 Nations normally form slowly
⚡ This pictures instant, sudden formation
📖 Sets up what happens with Zion

---
## 🏙️ For As Soon As Zion Travailed, She Brought Forth Her Children

"Zion" is another name for Jerusalem, standing for God's people as a whole.

This answers the questions just asked with a real example.

Zion's labor and birth happened together, without the normal long delay.

This pictures a restored, thriving community appearing suddenly after judgment.

What seemed impossible in the earlier questions becomes real here.

🏙️ Zion stands for Jerusalem and God's people
✅ This answers the questions just asked
⚡ Birth happened without the normal delay
📖 The impossible becomes real for Zion

---
## 🤝 Shall I Bring To The Birth, And Not Cause To Bring Forth

God now asks if He would ever start something and leave it unfinished.

The obvious answer expected here is no, never.

God is defending His own reliability using this birth image.

Whatever God starts, He also brings to completion.

God finishes what He starts, every single time.

❓ Would God leave something unfinished
🚫 The expected answer is no, never
🤝 God defends His own reliability here
📖 God finishes what He starts

---
## 🚪 Shall I Cause To Bring Forth, And Shut The Womb

This repeats the same promise from the line before in different words.

"Shut the womb" pictures stopping a birth halfway through, before it finishes.

God rules that idea out completely for Himself.

The double question makes the promise even more certain.

The restoration promised in this chapter will not be cut short.

🔁 Repeats the same promise again
🚪 Shut the womb means stopping halfway
🚫 God rules this out completely
📖 The restoration will not be cut short

# Isaiah 66:10-11
# 🤱 Rejoice Ye With Jerusalem
---
## 🎉 Rejoice Ye With Jerusalem, And Be Glad With Her, All Ye That Love Her

This is a direct invitation to celebrate, not just observe from a distance.

The call goes out to everyone who loves Jerusalem, not a small group.

This picks up the birth image from the verses just before it.

A birth calls for shared celebration, not private joy alone.

God invites the whole community into this joy together.

🎉 A direct invitation to celebrate
👥 Open to everyone who loves Jerusalem
👶 Picks up the birth image from before
📖 Joy meant to be shared, not private

---
## 😢 Rejoice For Joy With Her, All Ye That Mourn For Her

This specifically names people who had been grieving over Jerusalem.

Jerusalem had been destroyed and mourned earlier in the book of Isaiah.

Their mourning is about to turn into real, shared celebration instead.

The same people who wept now get invited to rejoice.

God turns the very people who grieved into the ones who celebrate.

😢 Names people who had been grieving
🏙️ Jerusalem was destroyed and mourned earlier
🔄 Mourning turns into celebration here
📖 Grievers become the celebrators

---
## 🍼 That Ye May Suck, And Be Satisfied With The Breasts Of Her Consolations

This continues the birth picture with an image of a nursing infant.

"Consolations" means comfort, pictured here as nourishment a baby receives.

Jerusalem is imagined like a mother providing comfort to her people.

Being satisfied means the comfort offered is enough, not partial.

The comfort described here fully feeds the people who receive it.

🍼 Continues the birth and nursing picture
🤗 Consolations means comfort, pictured as nourishment
👩 Jerusalem pictured as a comforting mother
📖 The comfort is full, not partial

---
## 🥛 That Ye May Milk Out, And Be Delighted With The Abundance Of Her Glory

"Milk out" pictures drawing out something rich and satisfying in full measure.

"Abundance" means more than enough, a generous overflow.

This pairs Jerusalem's future glory with the same nursing image from before.

The picture moves from simple comfort to overflowing delight.

God promises not just enough comfort, but comfort that overflows.

🥛 Milk out pictures drawing out in full
🌊 Abundance means a generous overflow
✨ Moves from comfort to overflowing delight
📖 More than enough is promised here

# Isaiah 66:12-14
# 🌊 I Will Extend Peace To Her Like A River
---
## 🌊 I Will Extend Peace To Her Like A River, And The Glory Of The Gentiles Like A Flowing Stream

A river in this dry region was a constant, reliable source of life.

Comparing peace to a river pictures something steady, not occasional.

"The glory of the Gentiles" means wealth and honor flowing in from other nations.

Both peace and outside wealth are pictured as flowing in without stopping.

This peace was never meant to be a brief calm between troubles.

🌊 A river pictures steady, constant peace
💧 Not occasional calm, but ongoing supply
🌍 Glory of the Gentiles means outside wealth
📖 Peace pictured as never running dry

---
## 🤱 Ye Shall Be Borne Upon Her Sides, And Be Dandled Upon Her Knees

"Borne upon her sides" pictures a small child being carried on a hip.

"Dandled upon her knees" pictures a parent playfully bouncing a child.

Both images describe tender, affectionate care for someone small and dependent.

Jerusalem continues to be pictured as a caring mother in this verse.

God's care here is not distant or formal, it is warm and physical.

🤱 Borne on her sides means carried close
👶 Dandled on knees means playful bouncing
❤️ Both picture warm, tender care
📖 God's care is physical, not distant

---
## 🤗 As One Whom His Mother Comforteth, So Will I Comfort You

God directly compares His own comfort to a mother comforting her child.

This is one of the clearest maternal images used for God in the whole Bible.

The comparison is not decoration, it describes the kind of comfort intended.

"Ye shall be comforted in Jerusalem" grounds this promise in a real place.

God is willing to be described in the most tender terms available.

🤱 God compares Himself to a comforting mother
❤️ Describes the kind of comfort intended
🏙️ The comfort happens in Jerusalem itself
📖 One of the Bible's clearest maternal images

---
## 🦴 Your Bones Shall Flourish Like An Herb

Bones in Hebrew thinking often stood for a person's inner strength.

"Flourish like an herb" pictures fresh, green growth after a dry season.

This promises physical and emotional renewal together, not just feelings.

The image contrasts sharply with grief, which was described earlier as withering.

Comfort here reaches all the way down into the body itself.

🦴 Bones often pictured inner strength
🌿 Flourish like an herb means fresh growth
💪 Promises renewal, not just feelings
📖 Comfort reaches into the body itself

---
## ✋ The Hand Of The LORD Shall Be Known Toward His Servants, And His Indignation Toward His Enemies

This verse closes the section by naming two different outcomes at once.

"The hand of the LORD" toward His servants means visible blessing and help.

"Indignation" toward His enemies means visible anger and judgment.

The same event reveals mercy to one group and judgment to another.

God's actions will make it unmistakably clear who stands where with Him.

✋ God's hand pictures visible blessing
😠 Indignation means visible anger and judgment
⚖️ One event, two different outcomes
📖 God's actions make loyalty unmistakable

# Isaiah 66:15-17
# 🔥 The LORD Will Come With Fire
---
## 🔥 The LORD Will Come With Fire, And With His Chariots Like A Whirlwind

Fire and whirlwind were common ancient pictures of overwhelming divine power.

Chariots pictured a king or army arriving with unstoppable force.

Comparing the chariots to a whirlwind adds speed and terror to the image.

This is not a quiet, gentle arrival, it is a dramatic display of power.

God's arrival here matches the seriousness of the judgment being announced.

🔥 Fire pictures overwhelming divine power
🌪️ Whirlwind adds speed and terror
🛡️ Chariots picture unstoppable force
📖 A dramatic, not gentle, arrival

---
## 📦 To Render His Anger With Fury, And His Rebuke With Flames Of Fire

"Render" means to deliver or carry out in full.

"Fury" describes intense, full strength anger, not a passing irritation.

Pairing fire with rebuke shows the seriousness of what is being corrected.

This judgment matches the corrupt worship described earlier in the chapter.

The punishment described here fits the scale of the offense committed.

📦 Render means delivered in full
🔥 Fury means intense, full strength anger
⚖️ Judgment matches earlier corrupt worship
📖 The punishment fits the offense

---
## ⚖️ By Fire And By His Sword Will The LORD Plead With All Flesh

"Plead" here does not mean begging, it means arguing a legal case.

God is pictured settling a dispute using fire and sword as His evidence.

"All flesh" broadens this judgment beyond just Israel to every nation.

The scale of this judgment is described as worldwide, not local.

This is a courtroom scene where God Himself brings the final verdict.

⚖️ Plead means arguing a legal case
🔥 Fire and sword serve as evidence
🌍 All flesh means every nation, not just Israel
📖 God brings the final verdict Himself

---
## 🌿 They That Sanctify Themselves In The Gardens Behind One Tree In The Midst

This describes people going through fake purification rituals for pagan worship.

"Sanctify" and "purify" are true worship words being misused here.

The garden setting connects back to the pagan shrines named earlier in the chapter.

"One tree in the midst" likely points to a specific sacred tree used in these rituals.

Using holy language for an unholy ritual makes the offense even worse.

🌿 Fake purification for pagan worship
🌳 Connects to earlier pagan garden shrines
😠 Holy language for an unholy ritual
📖 True worship words misused here

---
## 🐖 Eating Swine's Flesh, And The Abomination, And The Mouse, Shall Be Consumed Together

Pork and mice were both forbidden as unclean food under the law of Moses.

Eating them here was likely part of a pagan ritual meal, not ordinary hunger.

"Consumed together" means judged and destroyed as one single group.

This closes the section by returning to the same charges raised back in verse three.

The chapter comes full circle, judging the exact sins it opened with.

🐖 Pork and mice were forbidden foods
🍽️ Eaten as part of a pagan ritual meal
💥 Consumed together means judged as one group
📖 The chapter returns to its opening charge

# Isaiah 66:18-21
# 🌍 I Will Gather All Nations And Tongues
---
## 👁️ For I Know Their Works And Their Thoughts

This verse shifts from judgment to a much wider promise about the nations.

God says He already knows every hidden thought behind these people's actions.

Nothing about human motive is hidden from Him, good or bad.

This full knowledge sets up the sweeping promise that follows.

God does not act on guesswork, He acts on what He fully sees.

👁️ God knows every hidden thought
🙈 Nothing is hidden from Him
🔀 Shifts from judgment to a wider promise
📖 God acts on what He fully sees

---
## 🗣️ It Shall Come, That I Will Gather All Nations And Tongues

"Tongues" here means different languages, not a strange or supernatural act.

This promises people from every nation and language being gathered together.

This reaches far beyond Israel to include the whole world.

"They shall come, and see my glory" follows directly after this promise.

God's plan was always bigger than one nation alone.

🗣️ Tongues means different languages
🌍 Gathers people from every nation
📏 Reaches far beyond Israel alone
📖 God's plan was always this big

---
## 📍 I Will Send Those That Escape Of Them Unto The Nations, To Tarshish, Pul, And Lud

These are real place names, not symbolic or made up locations.

Tarshish was likely a distant trading city, possibly in modern day Spain.

Pul and Lud were regions in Africa, known partly for skilled archers.

Naming real, far off places emphasizes just how wide this mission reaches.

God's messengers are sent to the edges of the known world, not just nearby lands.

📍 Tarshish, Pul, and Lud are real places
⛵ Tarshish was a distant trading city
🏹 Pul and Lud were known for archers
📖 The mission reaches the edges of the world

---
## 🗺️ To Tubal, And Javan, To The Isles Afar Off, That Have Not Heard My Fame

Tubal and Javan were regions to the north, with Javan linked to early Greece.

"Isles afar off" describes distant coastlands, likely across the Mediterranean Sea.

These are places that had never even heard about Israel's God before.

The mission specifically targets people with zero prior knowledge of Him.

God's glory was always meant to reach people who had never even heard of Him.

🗺️ Tubal and Javan lay to the north
🌊 Isles afar off means distant coastlands
❓ These people had never heard of God
📖 His glory was meant to reach everyone

---
## 📢 They Shall Declare My Glory Among The Gentiles

This names the purpose behind sending survivors to these distant lands.

The scattered people become messengers instead of just refugees.

"Declare" means to openly announce, not to quietly mention.

This looks forward to the New Testament mission to all nations.

What looked like scattering becomes the start of a worldwide announcement.

📢 Declare means to openly announce
🧳 Scattered people become messengers
🌍 Points forward to the mission to all nations
📖 Scattering becomes a worldwide announcement

---
## 🎁 They Shall Bring All Your Brethren For An Offering Unto The LORD Out Of All Nations

This describes Jewish people scattered across the nations being brought home.

Bringing them back is described as bringing an offering to God.

People, not just animals or grain, are pictured as a gift given to God.

This reverses the exile and scattering described elsewhere in Isaiah.

Being gathered home becomes an act of worship in itself.

👪 Describes scattered Jewish people returning
🎁 They are pictured as an offering to God
👤 People, not animals, are the gift here
📖 Being gathered home becomes worship

---
## 🐎 Upon Horses, And In Chariots, And In Litters, And Upon Mules, And Upon Swift Beasts

This list names every common form of ancient transportation available.

A litter was a covered seat carried by people or animals for important travelers.

Listing so many methods emphasizes how thorough and organized this return will be.

No one is left behind because of how they are able to travel.

Every possible means gets used to bring God's people all the way home.

🐎 Names every common ancient transport
🛖 A litter was a carried covered seat
📋 Emphasizes a thorough, organized return
📖 No one is left behind from this trip

---
## 🏺 As The Children Of Israel Bring An Offering In A Clean Vessel Into The House Of The LORD

A "clean vessel" was a ritually pure container used to carry offerings.

Using a clean vessel showed proper respect for something being given to God.

The returning people are compared to an offering carried this same careful way.

This comparison shows how valuable and honored these returning people are.

God treats the people being gathered home as something precious and worth protecting.

🏺 A clean vessel was a ritually pure container
🙏 It showed respect for the offering
👤 Returning people are compared to this offering
📖 God treats them as precious and honored

---
## 👨‍👦 I Will Also Take Of Them For Priests And For Levites

Priests and Levites were normally chosen only by family line, from one tribe.

This promises God selecting priests from a much wider group than before.

This is a striking expansion beyond the usual, strict priestly requirements.

This points toward a future where worship access opens far beyond Israel's old boundaries.

Even the priesthood itself gets reshaped by how wide this promise reaches.

👨‍👦 Priests were normally chosen by family line only
📏 This promise expands far past that rule
🚪 Worship access opens beyond old boundaries
📖 Even the priesthood gets reshaped here

# Isaiah 66:22-24
# 🌌 As The New Heavens And The New Earth
---
## 🌌 As The New Heavens And The New Earth, Which I Will Make, Shall Remain Before Me

This echoes the promise of new heavens and a new earth from earlier in the chapter.

"Shall remain" means this new creation will last, not fade away again.

God's own permanence guarantees how lasting this new creation will be.

This sets up a comparison with something else God promises will also last.

What God makes new, He also makes permanent.

🌌 Echoes the earlier new creation promise
♾️ Remain means it will not fade away
🙌 God's permanence guarantees its lasting
📖 What God makes new, He makes lasting

---
## 🌱 So Shall Your Seed And Your Name Remain

"Seed" here means descendants, a family line carried forward through time.

"Your name" means a lasting identity and reputation that continues on.

This promise is tied directly to the lasting new creation just described.

The permanence of the new heavens and earth guarantees this promise too.

God's people are promised the same lasting future as creation itself.

🌱 Seed means descendants carried forward
🏷️ Your name means a lasting identity
🔗 Tied directly to the new creation
📖 God's people share creation's own permanence

---
## 🌙 From One New Moon To Another, And From One Sabbath To Another, Shall All Flesh Come To Worship

A "new moon" marked the start of each month in the ancient Hebrew calendar.

The Sabbath was the regular weekly day of rest and worship.

Together they picture worship happening on a steady, repeating rhythm.

"All flesh" again extends this worship beyond Israel to every people.

Worship in this new creation becomes constant, not occasional.

🌙 New moon marked each month's start
📅 Sabbath was the weekly day of worship
🔁 Together they picture a steady rhythm
📖 Worship becomes constant, not occasional

---
## 😨 They Shall Go Forth, And Look Upon The Carcases Of The Men That Have Transgressed Against Me

This sudden, harsh image sits right next to the picture of joyful worship.

"Transgressed" means broken God's law through open, defiant rebellion.

Worshippers are pictured seeing the result of judgment as they leave true worship.

This is not meant as entertainment, it is a sober reminder of what rebellion costs.

The chapter refuses to separate real worship from the seriousness of judgment.

😨 A harsh image beside joyful worship
⚔️ Transgressed means open, defiant rebellion
👀 Worshippers see the cost of judgment
📖 Worship and judgment are not separated

---
## 🪱 Their Worm Shall Not Die, Neither Shall Their Fire Be Quenched

This pictures ongoing decay and burning that never fully finishes.

"Quenched" means put out or extinguished completely.

Both worm and fire describe a judgment with no natural end point.

Jesus later quotes this exact verse when warning about lasting judgment.

This image describes a judgment meant to be understood as final and complete.

🪱 Pictures decay that never fully ends
🔥 Quenched means put out completely
⏳ A judgment with no natural end
📖 Jesus later quotes this exact verse

---
## 😱 They Shall Be An Abhorring Unto All Flesh

"Abhorring" means something people look at with horror and disgust.

This is the very last line of the entire book of Isaiah.

The book ends on this sober warning rather than a soft, gentle note.

Placed beside the joy of worship, it forces the reader to remember both realities.

Isaiah closes by holding worship and warning together, right to the final line.

😱 Abhorring means horror and disgust
📕 The very last line of Isaiah
⚠️ Ends on warning, not a soft note
📖 Worship and warning held together`.trim();

export const ISAIAH_SIXTY_SIX_PERSONAL_SECTIONS = parseIsaiahSixtySixRawNotes(ISAIAH_SIXTY_SIX_RAW_NOTES);
