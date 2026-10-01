export type JeremiahFiftyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahFiftyOneRawNotes(rawText: string): JeremiahFiftyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahFiftyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+51:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 51 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+51:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+51:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 51 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 51,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 51:${startVerse}` : `Jeremiah 51:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 17) {
    throw new Error("Expected 17 Jeremiah 51 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_FIFTY_ONE_RAW_NOTES = `# Jeremiah 51:1-4
# 🌬️ A Destroying Wind
---
## 🌬️ A Destroying Wind

A destroying wind is not normal weather.

It pictures an invading army that nothing can stop.

No one argues with the wind or slows it down.

God names himself as the one sending it.

Babylon crushed Jerusalem with armies just like this one.

Now that same kind of force turns back on Babylon itself.

🌬️ Destroying wind pictures an unstoppable army

👑 God sends this attacker himself

⚔️ Babylon once used this same kind of force

📖 The destroyer now faces its own destruction

---
## 🌾 Fanners That Shall Fan Her

Fanners were workers who tossed grain into the wind.

The wind blew away the light chaff and left the heavy grain behind.

God compares Babylon to a pile of grain about to be sifted.

Everything worthless about her will blow away.

What is left of her will be nothing but empty land.

🌾 Fanners means workers who winnow grain

💨 Wind blows away the light chaff

🏚️ Babylon is pictured as grain to be sifted

📖 Ordinary farm work becomes a picture of judgment

---
## ⚔️ Destroy Ye Utterly All Her Host

This command allows no mercy and no exceptions.

Even her young men, usually spared in ancient warfare, are not spared here.

A brigandine was a coat of small metal plates worn into battle.

No armor and no age will protect Babylon's soldiers.

The judgment covers her entire army, not just her leaders.

⚔️ No mercy is shown to anyone

🛡️ Brigandine means armor worn into battle

👦 Even young men are not spared

📖 Total judgment answers Babylon's total cruelty

---
## 🗺️ Slain Shall Fall In The Land Of The Chaldeans

Chaldeans is another name for the Babylonians themselves.

The judgment does not happen somewhere else, far away.

It happens inside Babylon's own streets and in her own land.

The very people who conquered other nations are the ones falling now.

🗺️ Chaldeans means the Babylonians themselves

🏙️ The judgment happens in Babylon's own streets

⚔️ The conquerors become the conquered

📖 Babylon's own land becomes the battlefield

---
# Jeremiah 51:5-7
# ⚖️ Israel Not Forsaken
---
## ⚖️ Israel Hath Not Been Forsaken

Exile might look like God abandoned his people completely.

This verse corrects that assumption directly.

Israel and Judah still belong to the LORD of hosts.

Their land was filled with real sin and real guilt.

Being punished is not the same as being forsaken forever.

🙅 Exile does not mean God abandoned them

⚖️ Their sin was real and serious

🤝 Israel still belongs to the LORD

📖 Judgment on Babylon proves God still cares

---
## 🏃 Flee Out Of The Midst Of Babylon

God warns his own people living inside Babylon to leave.

Staying any longer risks being swept up in Babylon's punishment.

Vengeance here means God settling accounts rightly, not losing his temper.

He will render, or pay back, exactly what Babylon has earned.

🏃 God warns his people to leave now

⚠️ Staying risks Babylon's coming punishment

⚖️ Vengeance means God settling accounts rightly

📖 Leaving in time is an act of trust

---
## 🏆 Babylon Hath Been A Golden Cup

A golden cup looks valuable and impressive on the outside.

Babylon's wealth and power worked the same way on the nations around her.

Every nation that drank from that cup got pulled into her sin.

Made all the earth drunken pictures nations losing their senses under her influence.

Think of a beautiful cup secretly filled with something poisonous.

🏆 A golden cup looks valuable and impressive

🍷 Nations drank in her sin like wine

🤪 Drunken pictures nations losing their senses

📖 Babylon's beauty hid real corruption

---
# Jeremiah 51:8-10
# 💔 Babylon Falls, Healing Refused
---
## 🧴 Take Balm For Her Pain

Balm was a well known healing ointment from the region of Gilead.

Offering it to Babylon pictures one last attempt to save her.

If so be she may be healed admits the attempt might fail.

Some judgments are too far gone to reverse.

🧴 Balm was a known healing ointment

🏥 It pictures one last rescue attempt

❓ The healing may not even work

📖 Some judgments cannot be undone

---
## 🙅 Forsake Her, And Let Us Go Every One Into His Own Country

The nations allied with Babylon finally give up on her.

Her judgment has grown too large to fix or hide.

Reacheth unto heaven means her guilt has piled up past any limit.

Even her own allies abandon the cause once the truth is obvious.

🙅 Her allies finally give up on her

📏 Her guilt piled up past any limit

🚢 Even partners abandon a sinking cause

📖 Visible sin loses its defenders

---
## 🗣️ The LORD Hath Brought Forth Our Righteousness

This is Israel speaking, not Babylon.

God's people recognize that their rescue proves God was right all along.

Declare in Zion means telling the story publicly, back in Jerusalem.

Their suffering was not the end of the story God was writing.

🗣️ Israel speaks, not Babylon, here

✅ Their rescue proves God was right

🏙️ Zion means Jerusalem, their home

📖 They get to announce how it ends

---
# Jeremiah 51:11-14
# 🏹 The Medes Rise Up
---
## 🗺️ The LORD Hath Raised Up The Spirit Of The Kings Of The Medes

The Medes were an empire east of Babylon, later joined with Persia.

God is naming the actual nation he will use to bring judgment.

This was not a random invasion.

God himself stirred up their will to attack.

Vengeance of his temple ties this judgment to Babylon destroying God's house in Jerusalem.

🗺️ Medes were an empire east of Babylon

👑 God stirred their will to attack

🔥 This avenges Babylon burning God's temple

📖 A specific debt is finally collected

---
## 🚩 Prepare The Ambushes

These are urgent defensive orders shouted at Babylon's own watchmen.

Raise the battle flag, strengthen the guard, set ambushes in place.

The orders sound confident, but they come too late.

God had already decided the outcome before these commands were even given.

🚩 A standard was a raised battle flag

👀 Watchmen and ambushes are urgent defenses

⏰ These orders come too late

📖 No defense undoes a settled judgment

---
## 🌊 Thou That Dwellest Upon Many Waters

Babylon sat along the Euphrates River with a huge network of canals.

Many waters pictures her wealth, trade, and seemingly endless resources.

Abundant in treasures names exactly what made her feel untouchable.

None of that water or wealth could hold back her end.

🌊 Many waters means her rivers and canals

💰 Abundant treasures describe her vast wealth

🛡️ These resources felt like protection

📖 Wealth could not hold back her end

---
## 🦗 Fill Thee With Men, As With Caterpillers

Caterpillers here is an old spelling for a swarm of locusts.

Locusts move in such huge numbers they strip a field bare in hours.

God promises to fill Babylon with attacking soldiers in exactly that kind of swarm.

There will be far too many soldiers to fight off or hide from.

🦗 Caterpillers is an old word for locusts

🌾 Locusts strip a field bare fast

⚔️ Soldiers will swarm Babylon the same way

📖 The threat becomes the one overwhelmed

---
# Jeremiah 51:15-19
# 🌍 The Maker Versus The Made
---
## 🌍 He Hath Established The World By His Wisdom

This describes God as the one who built creation itself.

Power, wisdom, and understanding are named as three separate qualities behind that work.

No idol anywhere can claim any one of these three things.

The contrast with Babylon's gods is about to get very direct.

🌍 God built creation itself

🧠 Power, wisdom, and understanding are all his

🚫 No idol can claim any of this

📖 The judge of Babylon also made the world

---
## ⛈️ He Maketh Lightnings With Rain

This verse keeps piling up evidence of God's total control over nature.

Clouds, rain, lightning, and wind all answer to his voice.

Treasures pictures the wind as something God keeps stored and releases on purpose.

Nothing about weather is random or outside his command.

⛈️ Clouds, rain, and wind obey his voice

🏛️ Treasures pictures wind as stored on purpose

🎯 Nothing in nature is random

📖 This same control decides Babylon's judgment

---
## 🔨 Every Founder Is Confounded By The Graven Image

A founder was a metalworker who melted and cast metal into shape.

A graven image was an idol carved or formed by human hands.

Even the skilled craftsman ends up ashamed of what he just built.

No breath in them means the idol cannot think, speak, or live.

🔨 Founder means a metalworker

🗿 Graven image means a handmade idol

💨 No breath means it cannot live

📖 A handmade god can never truly help

---
## 📅 In The Time Of Their Visitation They Shall Perish

Visitation here does not mean a friendly visit.

It means the specific moment God steps in to judge.

Idols are called pure vanity, something empty with no real power at all.

Their emptiness stays hidden until that moment of visitation finally exposes it.

📅 Visitation means the moment of judgment

🫙 Vanity means something empty and worthless

🎭 Emptiness hides until judgment arrives

📖 Judgment reveals what idols really are

---
## ⚖️ The Portion Of Jacob Is Not Like Them

Them refers back to the lifeless idols just described.

Israel's God is not something anyone built or shaped.

He is the former of all things, the one who shaped everything else instead.

Israel is called the rod of his inheritance, his own chosen possession.

⚖️ Them refers to the lifeless idols

🛠️ God formed all things, nothing formed him

👑 Israel is called his own inheritance

📖 Israel worships the maker, not the made

---
# Jeremiah 51:20-23
# 🔨 My Battle Axe
---
## 🔨 Thou Art My Battle Axe And Weapons Of War

A battle axe is a weapon good for one purpose, breaking things apart.

God calls this unnamed nation his own tool for judgment.

Many scholars believe this points to the Medes and Persians rising against Babylon.

Being a tool for judgment is not the same as being innocent.

🔨 A battle axe exists to break things

🪖 Many scholars see the Medes and Persians here

⚖️ A tool for judgment is not innocent

📖 God can use nations without approving them

---
## 🔁 With Thee Will I Break In Pieces The Horse And His Rider

This exact phrase repeats several times across these two verses.

Horses, riders, chariots, soldiers, the old, and the young are all named one by one.

The repetition itself is the message, judgment reaches absolutely everyone.

No age, rank, or role offers any kind of exemption.

🔁 The phrase repeats again and again here

🐎 Horses, riders, and chariots are all named

👶 The young and the old are included too

📖 No one is left out of this list

---
## 🐑 With Thee Will I Break In Pieces The Shepherd And His Flock

The list moves from soldiers to ordinary working people here.

Shepherds, farmers, captains, and rulers all appear side by side.

Everyday workers and powerful leaders face the exact same judgment.

🐑 Shepherds and farmers appear in this list

👑 Captains and rulers appear right beside them

⚖️ Everyday workers and leaders face the same judgment

📖 Importance does not change the outcome

---
# Jeremiah 51:24-26
# ⛰️ A Burnt Mountain
---
## ⚖️ I Will Render Unto Babylon All Their Evil

God promises to pay Babylon back for specific crimes.

In Zion points directly to what Babylon did in Jerusalem itself.

This is not vague anger, it is a direct response to a direct wrong.

Every nation watching will see the connection.

⚖️ God repays Babylon for specific crimes

🏙️ Zion means what happened in Jerusalem

🎯 This is direct payback, not vague anger

📖 Her own crime becomes her own sentence

---
## ⛰️ O Destroying Mountain

Babylon is pictured here as a massive mountain, towering and seemingly permanent.

Mountains are usually the most unmovable thing a person can picture.

God says he will roll even this mountain down from the rocks.

Burnt mountain pictures a volcano that has already blown itself apart.

⛰️ Babylon is pictured as a huge mountain

🪨 Mountains seem the most unmovable thing

🌋 Burnt mountain pictures a spent volcano

📖 Nothing is too massive for God

---
## 🧱 Thou Shalt Be Desolate For Ever

Builders normally reused good stone from ruined cities.

God says not even a single stone from Babylon will be reused this time.

No cornerstone, no foundation stone, nothing salvageable at all.

This is not a temporary setback, it is a permanent end.

🧱 Builders usually reused stone from ruins

🚫 Not one stone will be reused here

🏚️ The destruction is total and permanent

📖 Babylon will not even be useful rubble

---
# Jeremiah 51:27-29
# 🚩 Nations Gathered Against Her
---
## 🗺️ Call Together Against Her The Kingdoms Of Ararat, Minni, And Ashchenaz

Ararat, Minni, and Ashchenaz were kingdoms in the mountains north of Babylon, near modern Armenia.

God names specific nations joining this attack, not a vague coalition.

Rough caterpillers again pictures locusts, an overwhelming swarm of soldiers.

Babylon will face enemies from multiple directions at once.

🗺️ Ararat, Minni, Ashchenaz sat north of Babylon

👑 These are named nations, not a vague group

🦗 Caterpillers again pictures a locust swarm

📖 One judgment, carried out by many nations

---
## 🔁 Prepare Against Her The Nations With The Kings Of The Medes

This repeats and expands on the Medes already named back in verse eleven.

Captains, rulers, and the whole territory under their control are called up.

The attack is organized at every level of command, not improvised.

🔁 This expands on the Medes from verse eleven

🪖 Captains and rulers are all called up

📋 The attack is organized at every level

📖 God assembles a real, led army

---
## 🏜️ To Make The Land Of Babylon A Desolation Without An Inhabitant

Desolation means a place left completely empty, with no one living there.

The whole earth shaking here is a poetic way to show the scale of this event.

Every purpose God spoke against Babylon will actually happen.

Nothing about this judgment will be left unfinished.

🏜️ Desolation means a place left completely empty

🌍 The trembling earth shows the scale

✅ Every spoken purpose will actually happen

📖 God never leaves his word unfinished

---
# Jeremiah 51:30-32
# 🏳️ The Mighty Men Give Up
---
## ⚔️ They Became As Women

In this culture, this phrase was a harsh insult about losing courage in battle.

It does not describe women as weak, it describes trained soldiers suddenly paralyzed by fear.

Babylon's famous warriors simply stop fighting and hide instead.

Bars are broken means the city gates no longer hold the enemy out.

⚔️ This insult means soldiers lost their courage

🏰 Trained warriors simply stop fighting

🚪 Bars broken means the gates failed

📖 Strength collapsed before the attack even finished

---
## 🏃 One Post Shall Run To Meet Another

Post here means a running messenger carrying urgent news.

Messengers are shown colliding with each other, all racing the same bad report.

The king learns his city has already fallen at one end before he can respond.

Chaos spreads faster than any single leader can manage it.

🏃 Post means an urgent running messenger

📨 Messengers race each other with bad news

👑 The king learns too late to respond

📖 The outcome is decided before news arrives

---
## 🌊 The Men Of War Are Affrighted

The river crossings and marshland reeds that once protected the city are burned.

Those natural defenses are now gone entirely.

Even Babylon's trained soldiers are described as genuinely terrified.

Fear has replaced the confidence this empire was known for.

🌊 River crossings and reeds once gave protection

🔥 Those natural defenses are now burned

😨 Affrighted means genuinely terrified

📖 Confidence turns into real fear

---
# Jeremiah 51:33-35
# 🌾 The Threshingfloor
---
## 🌾 The Daughter Of Babylon Is Like A Threshingfloor

A threshingfloor was a hard, flat surface used to separate grain from its husk.

Workers would beat or trample the grain there until it broke apart completely.

Babylon is compared to grain finally ready for that same treatment.

Harvest pictures judgment as something that ripens over time, then arrives all at once.

🌾 A threshingfloor separated grain from husk

🦶 Grain was trampled until it broke apart

⏳ Harvest pictures judgment ripening over time

📖 Pride that grows slowly still comes due

---
## 🐉 He Hath Swallowed Me Up Like A Dragon

This is Zion, Jerusalem, speaking about what Babylon did to her.

Dragon here pictures a huge, devouring sea creature swallowing something whole.

Nebuchadrezzar is the Babylonian king who destroyed Jerusalem and took its wealth.

Made an empty vessel means being emptied out completely, left with nothing.

🗣️ Zion speaks here about her own loss

🐉 Dragon pictures a huge devouring creature

👑 Nebuchadrezzar led Babylon's destruction of Jerusalem

📖 Naming the loss comes before naming justice

---
## ⚖️ My Blood Upon The Inhabitants Of Chaldea

Jerusalem is formally charging Babylon with the violence done against her.

This is the language of a legal accusation, not just an emotional complaint.

My blood means the lives lost belong on Babylon's account, not forgotten.

⚖️ This is a formal accusation of violence

🩸 My blood means lives lost are counted

📜 It is legal language, not just emotion

📖 Judgment answers a rightful accusation

---
# Jeremiah 51:36-40
# 🦁 A Perpetual Sleep
---
## 🌊 I Will Dry Up Her Sea, And Make Her Springs Dry

Babylon's sea refers to the Euphrates and its wide network of canals.

That water supply fed the farms, defenses, and daily life of the whole city.

God promises to cut off the very thing that made Babylon livable.

🌊 Her sea means the Euphrates and canals

🌾 This water fed farms and daily life

🚱 God cuts off what made her livable

📖 Justice removes what she depended on most

---
## 🐺 A Dwellingplace For Dragons

Dragons here is an old word for jackals, wild animals of ruined places.

Hissing means Babylon becomes something people mock when they pass by.

A city once full of people becomes a place where only wild animals live.

🐺 Dragons here means wild jackals

😒 Hissing means becoming an object of scorn

🏚️ A full city becomes an empty ruin

📖 The loudest empire ends in silence

---
## 🦁 They Shall Roar Together Like Lions

Babylon's own people are pictured here as lions and young lion cubs.

It is not a compliment.

It describes loud, aggressive confidence right before sudden danger arrives.

Pride often sounds the loudest right before it falls.

🦁 Babylon is pictured as roaring lions

😤 It shows loud, aggressive confidence

⚠️ This comes right before sudden danger

📖 Pride often roars loudest before it falls

---
## 🍷 Sleep A Perpetual Sleep, And Not Wake

God promises to make Babylon's leaders drunk at the height of their celebration.

Perpetual sleep is a gentle sounding phrase for permanent death.

The judgment arrives disguised as a party, not a battle.

🍷 Leaders are made drunk at their own celebration

😴 Perpetual sleep is a gentle word for death

🎉 Judgment arrives disguised as a party

📖 The celebration itself becomes the trap

---
## 🦁 I Will Bring Them Down Like Lambs To The Slaughter

The lions from verse thirty eight suddenly become lambs here instead.

Lambs cannot fight back or resist what is coming.

The same empire that once terrified others now has no power to resist at all.

🦁 Verse thirty eight called them lions

🐑 Here they become helpless lambs instead

🚫 They cannot resist what is coming

📖 The devourer is finally led away powerless

---
# Jeremiah 51:41-44
# 🌊 Sheshach Is Taken
---
## 🔤 How Is Sheshach Taken

Sheshach is a coded name for Babylon, built by swapping letters in a simple Hebrew cipher.

Jeremiah likely used it to speak carefully about a dangerous empire.

Calling the most feared city on earth by a secret name makes its fall feel even more stunning.

🔤 Sheshach is a coded name for Babylon

🤫 Jeremiah used it to speak carefully

😲 Her fall shocks the watching nations

📖 No disguise could hide her from judgment

---
## 🌊 The Sea Is Come Up Upon Babylon

Babylon sits far from any true ocean.

This sea pictures the invading army as an overwhelming flood of waves.

No wall or army could hold back water pictured on this scale.

🏜️ Babylon sat far from any real ocean

🌊 Sea pictures an overwhelming flood of soldiers

🚫 No wall could hold back water like this

📖 The unstoppable force finally arrives

---
## 🏙️ A Land Wherein No Man Dwelleth

This verse pictures Babylon's cities completely emptied of people.

Nobody travels through, nobody settles there again.

A wilderness takes over land that once held one of the greatest cities on earth.

🏙️ Babylon's cities are pictured completely empty

🚶 No one travels through anymore

🌵 Wilderness replaces a once great city

📖 Pride built this, and emptiness ends it

---
## 🗿 I Will Punish Bel In Babylon

Bel was the chief god worshiped in Babylon, another name connected to Marduk.

Bring forth out of his mouth pictures God forcing a false god to return everything it claimed to conquer.

Nations will no longer gather to worship at Bel's temple.

🗿 Bel was Babylon's chief worshiped god

🤮 God forces the idol to return its plunder

🚫 Nations stop gathering to worship there

📖 A powerless god loses its worshipers

---
# Jeremiah 51:45-48
# 🚪 My People, Go Out
---
## 🔁 My People, Go Ye Out Of The Midst Of Her

This command repeats the warning already given back in verse six.

God's people living inside Babylon are told again to leave before judgment falls.

Deliver every man his soul means saving their own lives is the priority now.

🔁 This repeats the warning from verse six

🏃 God's people are told to leave now

❤️ Saving their lives is the priority

📖 A clear warning leaves no excuse

---
## 😰 Lest Your Heart Faint, And Ye Fear For The Rumour

God warns his people not to panic over every frightening report.

Rumors of violence will keep coming, year after year, before the real end arrives.

Ruler against ruler pictures ongoing political chaos in the region.

Fear of rumors should not stop them from leaving when the real moment comes.

😰 Rumors of violence will keep coming

📆 This repeats year after year

👑 Ruler against ruler pictures political chaos

📖 Fear should not cause them to freeze

---
## 🔁 Judgment Upon The Graven Images Of Babylon

The same idols already mocked back in verse seventeen are judged directly here.

Babylon's whole land will be thrown into confusion when this happens.

The destruction of these idols is not incidental, it is a stated purpose.

🔁 This recalls the idols from verse seventeen

🌀 The whole land falls into confusion

🎯 Destroying the idols is the stated purpose

📖 Judgment names the false gods directly

---
## 🎶 Then The Heaven And The Earth Shall Sing For Babylon

This singing is not sadness over Babylon's fall.

It pictures all of creation celebrating that evil like this is finally over.

Spoilers coming from the north names the general direction Babylon's own enemies have always come from.

🎶 This is celebration, not sadness

🌍 All creation responds to this judgment

🧭 North names the direction of her enemies

📖 Creation celebrates when justice finally comes

---
# Jeremiah 51:49-52
# ⚔️ The Measure Returned
---
## ⚖️ As Babylon Hath Caused The Slain Of Israel To Fall

This verse states the exact measure being used for judgment.

Whatever Babylon did to Israel will now happen to people from every nation because of Babylon.

It is not random cruelty being repaid with random cruelty.

⚖️ This states the exact measure of judgment

🌍 Babylon's cruelty now returns from every nation

🎯 It is not random, it is matched

📖 The measure used becomes the measure received

---
## 🏃 Remember The LORD Afar Off, And Let Jerusalem Come Into Your Mind

The exiles who survive Babylon's fall are told to keep moving, not linger.

Even far from home, they are told to keep remembering God and Jerusalem.

Distance should not weaken their memory or their faith.

🏃 Survivors are told to keep moving

🙏 Remembering God matters even from far away

🏙️ Jerusalem should stay in their minds

📖 Distance should not weaken their memory

---
## 😔 Strangers Are Come Into The Sanctuaries Of The LORD's House

This names the exact shame Israel still carries, foreign soldiers entering God's own temple.

Confounded means left ashamed and disoriented by what happened.

That memory of violation is part of why this judgment on Babylon matters so much.

😔 Confounded means ashamed and disoriented

🛕 Strangers entered God's own temple

💔 This shame is named plainly here

📖 This judgment finally answers that violation

---
## 🔁 The Wounded Shall Groan

This verse repeats the promise against Babylon's idols from verse forty seven almost word for word.

Repetition in this chapter is not careless, it hammers home certainty.

The wounded shall groan pictures the real human cost behind this judgment.

🔁 This repeats the promise from verse forty seven

🔨 Repetition here signals certainty, not carelessness

😩 Wounded groaning shows the real human cost

📖 God repeats what he fully intends to keep

---
# Jeremiah 51:53-55
# 🏔️ Mount Up To Heaven
---
## 🏗️ Though Babylon Should Mount Up To Heaven

This is not a claim that Babylon could literally reach heaven.

It pictures her defenses and pride built as high as anyone could possibly build them.

No height of fortification can put a nation out of God's reach.

🏗️ This pictures extreme pride and defense

🚫 Not a literal claim about reaching heaven

🛡️ No fortification is out of God's reach

📖 No wall is tall enough to escape judgment

---
## 📢 A Sound Of A Cry Cometh From Babylon

This verse shifts suddenly from warning to the sound of it actually happening.

The cry pictures the real panic inside a falling city.

Great destruction names the scale plainly, not in symbols this time.

📢 The warning becomes a sound happening now

😱 It pictures real panic inside the city

📏 Great destruction names the scale plainly

📖 The promise is now shown unfolding

---
## 🌊 Her Waves Do Roar Like Great Waters

The flood imagery from verse forty two returns here one more time.

Her waves pictures the invading army as a roar too loud to ignore.

God is named as the one spoiling, or ruining, Babylon's great voice.

The empire that once silenced others is finally silenced itself.

🌊 This repeats the flood image again

📢 Waves pictures an unmissable roar of invasion

🤐 God silences Babylon's own great voice

📖 The loudest voice finally goes quiet

---
# Jeremiah 51:56-58
# 🏰 The Broad Walls Broken
---
## ⚖️ The LORD God Of Recompences Shall Surely Requite

Recompences means payments owed, settling accounts rightly.

Requite means to pay back exactly what is deserved.

Broken bows picture Babylon's famous army stripped of its ability to fight at all.

⚖️ Recompences means payments rightly owed

💰 Requite means paying back what is deserved

🏹 Broken bows mean her army cannot fight

📖 God always settles the account

---
## 👑 I Will Make Drunk Her Princes

This phrase about sleep repeats almost exactly from verse thirty nine.

This time it names Babylon's entire leadership by title, princes, captains, and rulers.

Every level of power in the empire falls together, not just a single ruler.

🔁 This repeats the phrase from verse thirty nine

👑 Every level of leadership is named here

🏛️ The whole government falls together

📖 No rank escapes this judgment

---
## 🧱 The People Shall Labour In Vain

Broad walls were Babylon's famous, massive city defenses, wide enough for chariots to turn on top of them.

Even those legendary walls will be torn down completely.

Any effort to rebuild or resist afterward is called labor that accomplishes nothing.

🧱 Broad walls were Babylon's famous massive defenses

🔥 Even those legendary walls are torn down

😩 Labour in vain means wasted effort

📖 No achievement outlasts God's judgment

---
# Jeremiah 51:59-64
# 📜 The Scroll Sinks Like A Stone
---
## 👤 This Seraiah Was A Quiet Prince

Seraiah was a trusted official traveling with King Zedekiah into Babylon.

A quiet prince likely describes his role, something like a chief chamberlain managing royal travel quietly and reliably.

Jeremiah trusts him with a dangerous, secret assignment.

👤 Seraiah traveled with King Zedekiah

🤫 Quiet prince likely names a trusted royal role

📜 Jeremiah trusts him with a risky task

📖 A calm, reliable man carries this message

---
## ✍️ Jeremiah Wrote In A Book All The Evil

Jeremiah personally writes down every judgment spoken against Babylon in this whole chapter.

Putting it in writing makes the prophecy permanent and specific.

This was not a vague warning spoken once and forgotten.

✍️ Jeremiah writes down every judgment himself

📖 Writing makes the prophecy permanent

🚫 This was not a vague, forgettable warning

➡️ A written record could not be denied later

---
## 🗣️ When Thou Comest To Babylon, Shalt Read All These Words

Seraiah is told to read this entire scroll of judgment out loud once he arrives.

Reading it inside Babylon itself makes the act bold, almost dangerous.

The words are meant to be spoken, not just carried silently.

🗣️ Seraiah must read the scroll aloud

🏙️ He reads it inside Babylon itself

⚠️ This act carries real personal risk

📖 Judgment is announced even in enemy territory

---
## 🙏 That None Shall Remain In It, Neither Man Nor Beast

Seraiah's prayer repeats the totality of this judgment one final time.

No person and no animal will be left alive there.

Desolate forever removes any hope of Babylon quietly recovering later.

🙏 Seraiah prays the judgment back to God

🚫 No person or animal remains

⏳ Desolate forever removes any later hope

📖 Certainty is repeated, now as prayer

---
## 🪨 Bind A Stone To It, And Cast It Into The Midst Of Euphrates

This is a symbolic action, not just a way to dispose of a scroll.

Tying a stone to something and throwing it into deep water meant it could never resurface.

The Euphrates was the very river running directly through Babylon itself.

🪨 A stone ensured the scroll could not resurface

🌊 The Euphrates ran directly through Babylon

🎭 This was a symbolic action, not disposal

📖 Her own river becomes the burial site

---
## ⬇️ Thus Shall Babylon Sink, And Shall Not Rise

The sinking scroll becomes a living picture of Babylon's own future.

Just as the stone drags it down for good, Babylon will never rise again either.

Thus far are the words of Jeremiah marks the formal end of this long section of prophecy.

🪨 The sinking scroll pictures Babylon's own fate

⬇️ Babylon will never rise again either

📜 This marks the formal end of the section

📖 One small act carries the whole message
`.trim();

export const JEREMIAH_FIFTY_ONE_PERSONAL_SECTIONS = parseJeremiahFiftyOneRawNotes(JEREMIAH_FIFTY_ONE_RAW_NOTES);
