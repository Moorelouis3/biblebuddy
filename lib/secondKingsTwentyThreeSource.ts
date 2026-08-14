export type SecondKingsTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsTwentyThreeRawNotes(rawText: string): SecondKingsTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsTwentyThree\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsTwentyThree\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsTwentyThree\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 23:${startVerse}` : `2 Kings 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 2 Kings 23 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_TWENTY_THREE_RAW_NOTES = `# SecondKingsTwentyThree 23:1-3
# 📜 Renewing The Covenant
---
## 👴 Gathered Unto Him All The Elders Of Judah

Elders were the respected leaders of the tribes and cities, not just older residents.

Josiah gathers them first because reform needed public leadership standing behind it.

This mirrors earlier moments in Israel where elders stood as covenant witnesses.

The king begins with the people who could carry reform to the whole nation.

👴 Elders means respected community leaders

📢 Josiah needed leadership behind this reform

🔁 Echoes earlier covenant moments in Israel

📖 Reform starts with those who can spread it

## 👂 He Read In Their Ears All The Words Of The Book

Reading in their ears means reading the book aloud so everyone present could hear it.

This was not a private reading like the one Shaphan gave Josiah back in chapter twenty two.

The whole assembly hears the same law at the same time.

A private discovery becomes a shared public moment.

👂 In their ears means read aloud

🔁 Different from the private reading before

👥 Everyone present hears it together

📖 A private find becomes public knowledge

## 🤝 Made A Covenant Before The LORD

A covenant here is a solemn agreement sealed by a formal public promise.

Josiah stands by a pillar, the traditional spot where kings were crowned and proclaimed.

Standing there links his kingship directly to his promise to obey.

The king does not simply hear the law.

He binds himself to it as well.

🤝 Covenant means a solemn sealed promise

🪨 The pillar was the coronation spot

👑 Kingship and covenant are linked here

📖 Josiah binds himself, not just listens

## 🙋 All The People Stood To The Covenant

Standing to the covenant meant the people publicly agreed to keep it too.

This was not Josiah's private vow alone.

The entire nation joined him in this commitment.

Judah had not united behind one promise like this in a long time.

🙋 Standing meant publicly agreeing to obey

👥 The whole nation joined Josiah here

❤️ A king can call for real choice

📖 Judah had not united like this before

## 📜 The Book Of The Covenant Which Was Found

This is the same scroll Hilkiah discovered in the temple back in chapter twenty two.

Calling it the book of the covenant highlights its binding legal weight.

It likely contained part or all of the book of Deuteronomy.

The rediscovered law now becomes the foundation for national reform.

📜 Same scroll found in chapter twenty two

⚖️ Book of the covenant means binding law

📖 Likely part of Deuteronomy's text

➡️ It becomes the foundation for reform

# SecondKingsTwentyThree 23:4-7
# 🔥 Purging Baal And Asherah Worship
---
## 🛐 Vessels That Were Made For Baal

These vessels were temple objects crafted specifically for worshiping the Canaanite god Baal.

Manasseh, Josiah's grandfather, had filled the temple of the LORD with these very objects.

Removing them from the temple undoes decades of idol worship in one sweeping act.

Burning them outside the city treats them as garbage, not sacred items.

🛐 Vessels were objects made for Baal worship

👴 Manasseh had filled the temple with them

🔥 Josiah removes decades of idols at once

📖 Sacred objects to Baal become trash here

## 🛐 Priests Of The Second Order, And The Keepers Of The Door

Priests of the second order were assistant priests ranked just below the high priest.

The keepers of the door guarded the temple entrances and controlled who came inside.

Both groups had direct access to everything happening inside the temple grounds.

Josiah involves the temple's own staff in tearing out its idols.

🛐 Second order priests ranked below the high priest

🚪 Door keepers guarded the temple entrances

👀 Both had access to the whole temple

📖 Temple staff help remove its own idols

## 🐄 Carried The Ashes Of Them Unto Bethel

Bethel was the site of Jeroboam's golden calf, set up generations earlier to rival Jerusalem's temple.

Dumping Baal's ashes there defiles the very place built for false worship.

This is not a random destination.

It is a direct insult to Bethel's idols.

The ashes of one false god pollute the shrine of another.

🐄 Bethel held Jeroboam's golden calf shrine

🔥 Dumping ashes there was a direct insult

😏 One false god's ashes defile another's shrine

📖 Josiah turns idol worship against itself

## 🛐 He Put Down The Idolatrous Priests

These priests, called Chemarim in Hebrew, had been officially appointed by earlier kings of Judah.

They burned incense at high places scattered throughout the towns surrounding Jerusalem.

Putting them down means removing them from office entirely, not just correcting them.

An entire officially sanctioned system of false worship gets dismantled here.

🛐 Chemarim was the Hebrew word for these priests

👑 Earlier kings had officially appointed them

🚫 Josiah removes them from office completely

📖 An official system of idolatry ends here

## ☀️ To The Sun, And To The Moon, And To The Planets

Worshiping heavenly bodies was common across the ancient Near East, not unique to Judah.

The planets here likely refers to constellations or the visible zodiac signs.

Israel's law specifically forbid worshiping anything in the sky as a god.

Judah had adopted the exact practice its own scripture warned against.

☀️ Sun and moon worship was common regionally

🌌 Planets likely meant constellations or the zodiac

📜 The law forbid worshiping the sky itself

📖 Judah broke its own warning against this

## 🔨 Stamped It Small To Powder

Stamping something to powder means crushing it completely until nothing recognizable remains.

This happened to the wooden Asherah pole taken from the temple itself.

Scattering the powder on public graves makes the destruction permanent and irreversible.

No one could ever rebuild an idol ground down this completely.

🔨 Stamped to powder means crushed completely

🌳 This was the Asherah pole from the temple

⚰️ The powder was scattered on public graves

📖 Total destruction made rebuilding impossible

## 🏚️ The Houses Of The Sodomites

This phrase describes shrine areas connected to ritual practices tied to Canaanite worship.

Sodomites here does not describe the men of Sodom from Genesis nineteen.

The word instead refers to male shrine attendants who took part in these rites.

Even this practice, hidden right beside the temple itself, is finally torn down.

🏚️ Shrine areas tied to Canaanite ritual practices

😞 Refers to male shrine attendants at worship

🔨 Even hidden idolatry beside the temple falls

📖 Nothing was too close for Josiah to remove

# SecondKingsTwentyThree 23:8-10
# 🚪 Defiling The High Places
---
## 🗺️ From Geba To Beersheba

Geba marked the northern edge of the kingdom of Judah.

Beersheba marked its southern edge.

This phrase names the whole territory at once, like saying border to border.

Every high place in the entire kingdom, not just Jerusalem, is defiled here.

Reform reaches every town, not only the capital city.

🗺️ Geba and Beersheba mark north and south

📏 Together they describe the whole kingdom

🔥 Every town's high place is defiled here

📖 Reform reaches far beyond the capital

## 🚪 The High Places Of The Gates

These shrines sat right at the city gate, the busiest public spot in any town.

Joshua the governor gave his name to one specific gate in Jerusalem.

Placing idol worship exactly where merchants and travelers gathered made it impossible to miss.

Josiah tears down idolatry even from the most public places in the city.

🚪 Shrines sat right at the city gate

🏛️ Joshua the governor names one specific gate

👥 The busiest public spot held idol worship

📖 Even the most visible idols are removed

## 🚫 Nevertheless The Priests Of The High Places Came Not Up

These priests were allowed to live but never permitted to serve at the temple altar.

Serving the LORD's altar required a level of purity their past service could not provide.

They still received food from the unleavened bread shared among the other priests.

Mercy and consequence sit side by side in this one decision.

🚫 Barred from serving at the temple altar

🍞 Still allowed to eat with other priests

⚖️ Mercy and consequence appear together here

📖 Removal from office was not total exile

## 🗺️ He Defiled Topheth

Topheth was a site in the valley of Hinnom just outside Jerusalem's walls.

Defiling it meant making it ceremonially unclean and unusable for worship of any kind.

This location came to symbolize horror so completely that its name became a word for hell.

No future king could ever restore worship at Topheth after this.

🗺️ Topheth sat in the valley of Hinnom

🚫 Defiling it made it unusable for worship

😨 Its name later became a word for hell

📖 Josiah closes it permanently

## 🔥 To Pass Through The Fire To Molech

Molech was a god worshiped through child sacrifice, one of the most horrifying practices in the ancient world.

Passing children through the fire describes this exact ritual killing.

This was already strictly forbidden under Israel's own law long before Josiah's reign.

Ending it at Topheth protects the most vulnerable people in the entire nation.

🔥 Molech worship involved child sacrifice

📜 Israel's law already forbid this practice

😢 Passing through the fire meant ritual killing

📖 Josiah protects the most vulnerable in Judah

# SecondKingsTwentyThree 23:11-14
# ☀️ Removing Sun Worship And Solomon's High Places
---
## 🐎 The Horses That The Kings Of Judah Had Given To The Sun

Live horses were kept at the temple entrance as part of a ritual honoring the sun.

This practice likely began under Manasseh or an even earlier king of Judah.

Removing living animals used for false worship goes further than removing statues alone.

Even the daily routine of temple life had been shaped around idolatry.

🐎 Live horses honored the sun at the temple

👑 The practice began under an earlier king

🔥 Removing animals went further than removing statues

📖 Daily temple life had been shaped by idolatry

## 👤 Nathanmelech The Chamberlain

A chamberlain managed the king's household and often held real influence at court.

Naming him personally shows exactly how close idol worship had crept to the throne.

His chamber sat right at the temple gate, an oddly public place for a personal room.

Idolatry was not distant background noise.

It lived inside the palace itself.

👤 A chamberlain managed the royal household

🏛️ His chamber sat right at the temple gate

😨 Idolatry had crept close to the throne

📖 False worship lived inside the palace itself

## 🔥 Burned The Chariots Of The Sun With Fire

These chariots likely carried ceremonial images or symbols used in sun worship processions.

Burning them completely removed any chance they could be repaired and reused later.

Fire had already destroyed the Asherah pole earlier in this same chapter.

The same method of total destruction repeats again and again through Josiah's reform.

🔥 Chariots were used in sun worship processions

🚫 Burning prevented any future repair or reuse

🔁 The same method of destruction repeats here

📖 Total removal was the pattern of this reform

## 👑 The Altars That Were On The Top Of The Upper Chamber Of Ahaz

Ahaz was Josiah's great grandfather, a king already known for embracing foreign worship.

He built these altars on his own palace roof, in plain view of the whole city.

Manasseh added even more altars later, right inside the temple's own courts.

Two generations of kings had built idolatry into the most visible and sacred spaces.

👑 Ahaz was Josiah's great grandfather

🏠 He built altars on the palace roof

😈 Manasseh added more inside the temple courts

📖 Idolatry had spread into sacred spaces

## 🗺️ The Mount Of Corruption

This ridge sits just east of Jerusalem, across from the Mount of Olives.

The name corruption is a deliberate insult added later because of what stood there.

Solomon had originally built these high places centuries earlier in this exact location.

A mountain associated with a wise king becomes a byword for spiritual decay.

🗺️ The ridge sits east of Jerusalem

😏 Corruption was a deliberate insulting name

👑 Solomon built the original high places there

📖 Solomon's choice caused centuries of decay

## 🗿 Ashtoreth, Chemosh, And Milcom

Ashtoreth was worshiped by the Zidonians, a fertility and war goddess from the region of Sidon.

Chemosh belonged to the Moabites.

Milcom belonged to the Ammonites.

Solomon built shrines for all three gods to please his many foreign wives.

Three false gods from three different nations all had to be defiled at once.

🗿 Ashtoreth was Sidon's fertility goddess

⚔️ Chemosh belonged to Moab's worship

👑 Milcom belonged to Ammon's worship

📖 Three foreign gods removed at once

## ⚰️ Filled Their Places With The Bones Of Men

Scattering human bones over a worship site made it permanently unclean under Israel's law.

No priest or worshiper could ever use a place defiled this way again.

This was the strongest possible statement that these sites were finished forever.

Josiah makes sure idolatry cannot simply return once he is gone.

⚰️ Human bones made a site permanently unclean

🚫 No one could ever worship there again

🔒 This ensured the sites stayed closed forever

📖 Josiah worked to make reform permanent

# SecondKingsTwentyThree 23:15-18
# 🔥 Bethel And The Spared Bones
---
## 👑 Jeroboam The Son Of Nebat, Who Made Israel To Sin

Jeroboam was the first king of the northern kingdom of Israel, centuries before Josiah.

He built this altar at Bethel to keep his people from worshiping in Jerusalem.

This exact phrase, made Israel to sin, follows Jeroboam's name throughout the whole book of Kings.

Josiah destroys the very altar that launched centuries of divided worship.

👑 Jeroboam ruled the northern kingdom first

🗿 He built Bethel to rival Jerusalem's worship

🏷️ This phrase always follows Jeroboam's name

📖 Josiah destroys the source of centuries of division

## ⚰️ He Spied The Sepulchres That Were There In The Mount

A sepulchre is an ancient tomb, usually a small cave or chamber cut into rock.

Josiah notices these graves while he is busy destroying the altar nearby.

Nothing about this discovery seems planned.

It happens almost by accident.

What looks accidental is about to fulfill a prophecy spoken centuries earlier.

⚰️ A sepulchre is an ancient rock tomb

👀 Josiah notices the graves while working nearby

🎲 The discovery looks accidental at first

📖 It fulfills a prophecy from centuries earlier

## 🔥 Burned Them Upon The Altar, And Polluted It

Burning human bones on an altar made that altar ceremonially unclean forever.

This action alone destroys any future use of Bethel's altar for worship.

Using bones this way was considered one of the ultimate acts of desecration.

The very altar that started false worship becomes permanently unusable for it.

🔥 Burning bones made the altar unclean

🚫 Bethel's altar could never be used again

😨 This was an extreme act of desecration

📖 The source of false worship ends here

## 📜 According To The Word Of The LORD Which The Man Of God Proclaimed

This event was actually predicted about three hundred years earlier in the book of First Kings.

An unnamed prophet, called the man of God, spoke directly against this altar.

He even named the future king who would do this, Josiah, by name.

A prophecy spoken centuries before comes true in exact detail here.

📜 Predicted three hundred years earlier in First Kings

🗣️ An unnamed man of God gave the warning

🏷️ Josiah's name was spoken centuries in advance

📖 An old prophecy comes true in exact detail

## 🪦 What Title Is That That I See

Title here refers to the inscribed marker or monument standing over a grave.

Josiah asks a simple, curious question about one specific tomb among many.

The men of the city already know exactly whose grave this is.

A small question is about to reveal a very old story.

🪦 Title means the marker over a grave

❓ Josiah asks about one specific tomb

👥 The city's men already know the answer

📖 A small question uncovers an old story

## 🪦 Let No Man Move His Bones

Josiah orders this one tomb left completely undisturbed, unlike every other grave nearby.

This is the same prophet whose words are being fulfilled at this very moment.

Respecting his bones honors the accuracy of what he predicted long ago.

One grave is spared in the middle of total destruction all around it.

🪦 One tomb is left untouched on purpose

🗣️ This prophet's words are being fulfilled now

🙏 Respecting his bones honors his true prophecy

📖 Mercy survives in the middle of judgment

## 👴 The Bones Of The Prophet That Came Out Of Samaria

This refers to an older prophet from First Kings who had lied to the man of God.

That lie led directly to the man of God's death, recorded generations earlier.

Even though their story together ended in tragedy, both graves are spared here.

Josiah's respect covers a complicated story he likely never knew the full details of.

👴 An older prophet from First Kings lied

💔 That lie led to the other prophet's death

🪦 Both graves are spared despite the tragedy

📖 Old graves earned respect either way

# SecondKingsTwentyThree 23:19-20
# ⚖️ Judgment On Samaria's Priests
---
## 🗺️ All The Houses Also Of The High Places That Were In The Cities Of Samaria

Samaria was the former capital of the northern kingdom, conquered by Assyria long before this.

Josiah's reform reaches beyond his own kingdom of Judah into this fallen territory.

No king had authority to rule there, yet Josiah acts anyway.

He treats the whole land as belonging to the LORD, not just his own borders.

🗺️ Samaria was the former northern capital

🚶 Josiah's reform reaches beyond Judah's own borders

👑 He had no formal authority there

📖 He treats the whole land as the LORD's

## 🔁 According To All The Acts That He Had Done In Bethel

This phrase ties everything happening in Samaria directly back to the destruction at Bethel.

The same method of burning, crushing, and defiling repeats in this new territory.

One consistent standard applies everywhere, not a softer version for distant towns.

Reform does not change shape depending on how far it travels.

🔁 The same method as Bethel repeats here

🔥 Burning and defiling apply again in Samaria

⚖️ One standard applies to every territory

📖 True reform does not soften with distance

## ⚔️ He Slew All The Priests Of The High Places

Killing these priests went further than anything done earlier in Judah's own cities.

Judah's high place priests were removed from office but allowed to live.

Samaria's priests receive the full penalty the law commanded for leading idolatry.

This difference in Josiah's own kingdom compared to Samaria stands out sharply.

⚔️ Samaria's priests received the death penalty

🚫 Judah's priests were only removed from office

⚖️ The punishment was harsher outside his own kingdom

📖 The law's full penalty finally lands here

## 🚶 And Returned To Jerusalem

This short line marks the end of Josiah's traveling campaign against idolatry.

He has now covered both the cities of Judah and the ruins of Samaria.

Returning to Jerusalem sets up the very next event, the celebration of the passover.

The purge is finished.

The worship it protects can now begin.

🚶 This ends Josiah's traveling campaign

🗺️ He covered both Judah and Samaria

🎉 It sets up the passover that follows

📖 Purging comes before true worship begins

# SecondKingsTwentyThree 23:21-23
# 🍞 The Passover Like No Other
---
## 🍞 Keep The Passover Unto The LORD Your God

Passover remembered the night God freed Israel from slavery in Egypt centuries earlier.

Every family was meant to keep this feast every single year without fail.

Judah had let this central celebration lapse for generations under corrupt kings.

Restoring it becomes the natural next step after cleaning out idolatry.

🍞 Passover remembered freedom from slavery in Egypt

📅 Families were meant to keep it yearly

😞 Judah had let this feast lapse

📖 Worship reform naturally leads to worship restored

## 📜 As It Is Written In The Book Of This Covenant

This ties the passover command directly back to the scroll found in the temple.

The rediscovered law was not just about removing sin.

It also restored right worship.

Josiah does not invent a new tradition.

He simply obeys what the book already said.

📜 Ties directly back to the rediscovered scroll

⚖️ The law covered both sin and worship

📖 Josiah obeys rather than invents anything new

➡️ Old scripture reshapes the whole nation's life

## ⚖️ From The Days Of The Judges That Judged Israel

The judges ruled Israel long before any king, during the book of Judges itself.

That period was already remembered as chaotic and full of scattered obedience.

Even then, scripture says, no passover this complete had ever been held.

This passover reaches back further than any king's reign for comparison.

⚖️ Judges ruled Israel before any king existed

😬 That era was remembered as chaotic

🏆 No passover that complete had happened since

📖 Josiah's passover reaches back further than any king

## 👑 Nor In All The Days Of The Kings Of Israel, Nor Of The Kings Of Judah

This includes every king from both the divided northern and southern kingdoms.

Not one of them, going back for centuries, managed a passover this complete.

The claim covers hundreds of years and dozens of rulers at once.

Josiah's short reign accomplishes something an entire royal history had missed.

👑 Covers every king from both kingdoms

📆 Hundreds of years and dozens of rulers

🏆 None of them matched this passover

📖 A short reign outdoes centuries of kings

## 🔢 In The Eighteenth Year Of King Josiah

Josiah is about twenty six years old when this passover finally happens.

This same eighteenth year already appeared earlier in the chapter, when the book was found.

The discovery of the law and the greatest passover in centuries happen in the very same year.

One remarkable year changes the entire spiritual direction of the nation.

🔢 Josiah was about twenty six years old

📖 The same year the book was found

🍞 Discovery and passover both land this year

➡️ One year redirects the whole nation

# SecondKingsTwentyThree 23:24-25
# 👑 No King Like Josiah
---
## 👻 Workers With Familiar Spirits, And The Wizards

A familiar spirit describes a person believed to communicate with the dead or with spirits.

Wizards practiced similar occult arts, claiming secret knowledge outside of God's word.

Israel's law banned both practices completely, back in the earliest books of the Bible.

Josiah removes an entire underground industry of counterfeit spiritual guidance.

👻 A familiar spirit claimed contact with the dead

🔮 Wizards practiced similar occult arts

📜 Both were already banned under Israel's law

📖 An entire counterfeit spiritual industry is removed

## 📜 That He Might Perform The Words Of The Law

Every single action across this whole chapter traces back to one rediscovered book.

Josiah is not improvising reform based on his own personal preferences.

He is simply carrying out commands that were already written down centuries earlier.

The measure of his reign becomes obedience to a text, not personal opinion.

📜 Every action traces back to one book

🚫 Josiah is not improvising his own rules

📖 He obeys commands already written centuries ago

➡️ His reign is measured by obedience, not opinion

## 🏆 Like Unto Him Was There No King Before Him

This is one of the strongest compliments given to any king in the entire Bible.

Even celebrated kings like Hezekiah and David are not measured with this same language.

The comparison covers every king of Judah stretching back for centuries.

Total heart, soul, and strength devotion sets Josiah apart from everyone before him.

🏆 One of the strongest compliments in the Bible

👑 Not even Hezekiah or David compare

❤️ Total heart, soul, and strength devotion stands out

📖 No earlier king matched this level of obedience

## 🔮 Neither After Him Arose There Any Like Him

This half of the verse looks forward instead of backward, into the future.

Judah still has four kings left to reign before Jerusalem finally falls.

None of them, the text already promises here, will equal Josiah's example.

Even the very best reform could not undo what earlier generations had broken.

🔮 This half of the verse looks forward

👑 Four more kings remain before Jerusalem falls

🚫 None of them will equal Josiah

📖 One king could not undo it all

# SecondKingsTwentyThree 23:26-27
# 🔥 Wrath Not Turned Away
---
## 😔 The LORD Turned Not From The Fierceness Of His Great Wrath

Josiah's reform is real and complete, yet it does not cancel coming judgment.

This is one of the most sobering lines in the entire books of Kings.

Personal obedience can change one man's fate without changing a whole nation's future.

Reform delays disaster here.

It does not erase it entirely.

😔 Reform does not cancel coming judgment

🙏 Personal obedience changed only Josiah's own fate

⏳ National judgment is delayed, not erased

📖 One of the most sobering lines in Kings

## 👴 The Provocations That Manasseh Had Provoked Him Withal

Manasseh, Josiah's own grandfather, reigned longer than any other king of Judah.

His decades of idolatry and even child sacrifice are described earlier in this very book.

Josiah's short righteous reign cannot outweigh Manasseh's much longer reign of sin.

The wrath in this verse points directly back to one specific king's legacy.

👴 Manasseh reigned longer than any king of Judah

😈 His idolatry included even child sacrifice

⚖️ Josiah's short reform cannot outweigh Manasseh's longer sin

📖 This wrath traces back to one king's legacy

## 🔗 I Will Remove Judah Also Out Of My Sight

The word also links Judah's coming fate directly to what already happened to Israel.

Israel, the northern kingdom, had already fallen to Assyria generations before this moment.

Judah watched that entire collapse happen and still did not fully turn back.

The same ending God once used for Israel is now spoken over Judah too.

🔗 Also links Judah's fate to Israel's

🗺️ Israel had already fallen to Assyria

👀 Judah watched and still did not turn

📖 The same ending now awaits Judah too

## 🏙️ This City Jerusalem Which I Have Chosen

God had chosen Jerusalem specifically for His name to dwell there permanently.

That promise appears all the way back in the reign of King Solomon.

Even a chosen city is not automatically protected from the consequences of persistent sin.

Being chosen was always meant to come with obedience, not immunity from judgment.

🏙️ God had chosen Jerusalem for His name

👑 The promise dates back to Solomon

⚠️ Chosen status did not guarantee protection

📖 Being chosen required obedience, not immunity

# SecondKingsTwentyThree 23:28-30
# ⚔️ Josiah's Death At Megiddo
---
## 📚 The Book Of The Chronicles Of The Kings Of Judah

This was an official royal record, separate from the books of Kings and Chronicles we read today.

Many events of each king's reign were kept there but never included in scripture.

Referencing it reminds the reader that scripture always chooses what actually matters most.

Not every detail of history needed to be preserved to teach the lesson God intended.

📚 An official royal record outside our Bible

📝 Not every detail made it into scripture

🎯 Scripture chooses what actually matters most

📖 Preserved history always serves a purpose

## 👑 Pharaohnechoh King Of Egypt Went Up Against The King Of Assyria

Pharaohnechoh, also spelled Necho, ruled Egypt during Josiah's final years as king.

Assyria's empire was collapsing fast.

Egypt wanted a share of the territory it left behind.

Egypt was marching north to help Assyria, not to attack Judah at all.

Josiah's death comes from stepping into a war that was never really his to fight.

👑 Necho ruled Egypt in Josiah's final years

🏛️ Assyria's empire was rapidly collapsing

🤝 Egypt marched to help Assyria, not attack Judah

📖 Josiah steps into a war not his own

## ❓ Josiah Went Against Him

Nothing in the text explains exactly why Josiah chose to intercept Necho's army.

Second Chronicles adds that Necho actually warned Josiah to stay out of this fight.

Josiah may have wanted to protect Assyria's collapse from being reversed by Egypt.

A king famous for obedience makes one final, unexplained, and costly decision.

❓ The text never explains his exact reason

📜 Chronicles says Necho warned him first

⚔️ He may have wanted Assyria to stay weak

📖 His most obedient reign ends with one mystery

## 🗺️ Slew Him At Megiddo

Megiddo sat along a major trade and military route through the region.

This same location hosts several other major battles throughout the Bible's history.

Josiah dies in battle despite God's earlier promise that he would die in peace.

That peace, given by Huldah in chapter twenty two, meant sparing him from Jerusalem's fall.

It did not mean he would be spared from death.

🗺️ Megiddo sat on a major trade route

⚔️ Several major battles happened at this site

😢 Josiah dies despite God's promise of peace

📖 Peace meant missing Jerusalem's fall, not avoiding death

## 🚚 Brought Him To Jerusalem, And Buried Him In His Own Sepulchre

Josiah's servants carry his body home despite the danger of an active war zone nearby.

Being buried in his own family tomb preserved his honor even in sudden death.

The whole nation mourns a king whose reform work was cut tragically short.

His burial closes one of the most remarkable stories in the whole book of Kings.

🚚 Servants carried his body home from war

🪦 Buried in his own family tomb

😢 The whole nation mourns his sudden death

📖 A remarkable story closes here

## 👥 The People Of The Land Took Jehoahaz

The people of the land refers to the ordinary citizens and local leaders of Judah, not the royal court.

Jehoahaz was actually Josiah's younger son, not his oldest son by birth order.

The people chose him over his older brother, likely because of his political leanings.

The next chapter of Judah's story begins with the people's own choice, not a normal royal succession.

👥 People of the land means ordinary citizens

👶 Jehoahaz was younger, not the oldest son

🗳️ The people chose him over his brother

📖 The people, not tradition, picked this king

# SecondKingsTwentyThree 23:31-33
# 👑 Jehoahaz Deposed
---
## 🔢 Twenty And Three Years Old When He Began To Reign

Jehoahaz was actually two years older than his brother Jehoiakim, mentioned later in the chapter.

Being older did not guarantee the throne, since the people chose him instead by preference.

His age tells the reader he was already a grown man, not a young boy like Josiah once was.

This detail sets up an adult ruler making his own choices from the very start.

🔢 Twenty three years old at the start

👶 Actually older than his brother Jehoiakim

🗳️ Age did not guarantee him the throne

📖 An adult ruler, not a child like Josiah

## 📆 Reigned Three Months In Jerusalem

Three months is the shortest reign of any king recorded so far in this book.

His reform minded father ruled for over three decades before him.

Egypt's intervention, described in the next verses, cuts his reign short almost immediately.

A promising royal line stumbles hard in this very first transition.

📆 Three months, the shortest reign so far

👑 His father Josiah reigned over three decades

🇪🇬 Egypt cuts his reign short almost immediately

📖 The royal line stumbles right at the start

## 👤 Hamutal, The Daughter Of Jeremiah Of Libnah

This Jeremiah is a different person from the famous prophet who shares his name.

Libnah was a town in the lowlands of Judah, similar to Josiah's own mother's hometown.

Hamutal will also become the mother of another king named later in this same book.

Naming the queen mother again confirms how much influence she held at court.

👤 A different Jeremiah than the famous prophet

🗺️ Libnah was a lowland town in Judah

👑 She becomes mother to another king later

📖 Naming her shows her real influence

## 🗺️ Put Him In Bands At Riblah

Riblah sat far north in the land of Hamath, well outside Judah's own territory.

Bands here means chains or shackles used to hold a prisoner securely.

Necho summons Jehoahaz there and simply never lets him return home again.

A king who reigned only three months ends his story as a captive far from Jerusalem.

🗺️ Riblah sat far north in Hamath

⛓️ Bands means chains used on a prisoner

🚫 Necho never lets him return home

📖 A three month king becomes a captive

## ⚖️ A Tribute Of An Hundred Talents Of Silver, And A Talent Of Gold

A talent was an ancient unit of weight, close to seventy five pounds for a talent of silver.

A hundred talents of silver alone would weigh well over three tons.

This tribute became a heavy tax burden placed directly on the ordinary people of Judah.

Egypt does not just remove a king, it drains the nation's wealth as well.

⚖️ A talent weighed about seventy five pounds

💰 A hundred talents weighed well over three tons

😣 The tax burden fell on ordinary people

📖 Egypt drained wealth, not just a king

# SecondKingsTwentyThree 23:34-37
# 👑 Jehoiakim's Reign Begins
---
## 👨‍👦 Made Eliakim The Son Of Josiah King

Eliakim was Jehoahaz's older brother, passed over earlier when the people chose Jehoahaz instead.

Necho reverses the people's original choice and installs his own preferred king instead.

This is the first time in this chapter that a foreign power picks Judah's king directly.

Judah's independence to choose its own ruler quietly ends with this decision.

👨‍👦 Eliakim was Jehoahaz's older brother

🔄 Necho reverses the people's original choice

🇪🇬 The first king chosen by a foreign power

📖 Judah's independence quietly ends here

## ✍️ Turned His Name To Jehoiakim

Changing a king's name was a common way for a stronger power to display control.

Eliakim means God will establish, while Jehoiakim means the LORD will establish.

Egypt forces the change anyway, even though the two names carry a similar meaning.

Even something this small becomes a public reminder of exactly who holds real power now.

✍️ Renaming a king showed a stronger power's control

🇪🇬 Egypt forces the change despite the similar meaning

👑 A small act reminds Judah who rules now

📖 Even names now answer to Egypt

## 🇪🇬 He Came To Egypt, And Died There

Jehoahaz becomes the first king of Judah ever exiled outside the promised land.

The prophet Jeremiah later mourns him specifically, warning the people not to weep for Josiah instead.

Dying in a foreign land was considered a particularly harsh and shameful end for a king.

His three month reign ends not in Jerusalem but far from everything he knew.

🇪🇬 First king of Judah exiled abroad

😢 Jeremiah later mourns him by name

💔 Dying abroad was a shameful end

📖 His short reign ends far from home

## 💰 He Taxed The Land To Give The Money

Jehoiakim does not pay Egypt's tribute from the royal treasury alone.

He spreads the cost across the entire population through direct taxation.

Ordinary farmers and workers now personally feel the price of Josiah's failed war.

A king's political decision becomes every citizen's financial burden.

💰 Tribute was not paid from the treasury alone

👥 The cost was spread across the population

🌾 Ordinary farmers felt the tax directly

📖 One king's decision became everyone's burden

## ⚖️ According To His Taxation

Each person paid an amount based on their own personal wealth or land holdings.

This was not a flat tax charged equally to every single household.

Wealthier landowners paid more, while poorer families still had to contribute something.

Even a fair sounding system still meant real hardship spread across the whole nation.

⚖️ Payment was based on personal wealth

🏠 Not a flat tax for every household

💸 Wealthier landowners paid the largest share

📖 Fair on paper still meant real hardship

## 📆 Twenty And Five Years Old, Reigned Eleven Years

Jehoiakim ruled far longer than his younger brother's three month reign.

His mother Zebudah came from Rumah, a town whose exact location is now uncertain.

Second Kings will soon describe his reign as marked by violence and injustice.

A longer reign here does not mean a better king than the one before him.

📆 Eleven years, far longer than his brother

🗺️ His mother Zebudah came from Rumah

⚔️ His reign brings violence and injustice

📖 A longer reign is not a better one`.trim();

export const SECOND_KINGS_TWENTY_THREE_PERSONAL_SECTIONS = parseSecondKingsTwentyThreeRawNotes(SECOND_KINGS_TWENTY_THREE_RAW_NOTES);
