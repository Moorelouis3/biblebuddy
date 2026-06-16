import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type KingdomDeclinePhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "1 Kings" | "2 Kings" | "1 Chronicles" };

const DAY_86_FIRST_KINGS_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "1 Kings 16:1-6": [
    ["Then the Word of the LORD Came to Jehu the Son of Hanani Against Baasha", "This means God gave Jehu a message of judgment against King Baasha. Jehu is not speaking his own opinion; he is delivering the LORD's verdict.\n\n🙏 God speaks first\n\n📜 A prophet carries the message\n\n⚖️ Baasha is being judged\n\nThe phrase opens a direct word from God against the king."],
    ["Then the Word of the LORD Came to Jehu", "The word of the LORD came means God spoke to Jehu with a message he had to deliver. In Kings, that marks divine instruction, not human advice.\n\n📜 God gives a message\n\n👂 Jehu must receive it\n\n🗣️ The prophet will speak it out\n\nThe phrase tells the reader this warning begins with God."],
    ["Came to Jehu the Son", "This identifies Jehu as the prophet who receives the message. Naming his family line shows he is a real messenger in Israel's history, not a vague voice in the story.\n\n👤 The prophet is identified\n\n📖 The account stays specific\n\n🧭 God uses a real messenger\n\nThe phrase ties the warning to an actual man God sent."],
    ["Forasmuch as I Exalted Thee Out of the Dust", "Forasmuch means because, and exalted out of the dust means God raised Baasha from a low place into royal power. The king did not climb there by merit alone; God had lifted him up.\n\n⬆️ God raised Baasha up\n\n👑 His throne was a gift\n\n⚠️ Privilege brings responsibility\n\nThe phrase reminds Baasha that the position he abused had first been given by God."],
  ],
  "1 Kings 16:7-12": [
    ["Also by the Hand of the Prophet Jehu the Son of Hanani Came the Word of the LORD Against Baasha", "By the hand of the prophet means the LORD sent His message through Jehu. God is using a human messenger to announce that Baasha's house will not escape judgment.\n\n✋ God sends the message through Jehu\n\n📜 The warning is official\n\n⚖️ Baasha's family line is addressed\n\nThe phrase shows judgment coming through prophetic word, not political rumor."],
    ["Against His House", "House here means Baasha's family line and royal dynasty, not just his building. The judgment reaches the whole ruling household that grew from his sin.\n\n🏠 Family line in view\n\n👑 Royal house included\n\n⚠️ Sin affects more than one man\n\nThe phrase shows that the consequences will fall on Baasha's dynasty."],
    ["In the Twenty and Sixth Year of Asa King of Judah Began Elah the Son of Baasha to Reign Over Israel in Tirzah", "This sentence gives the date, the new king, and the capital city. Elah begins ruling Israel while Asa is ruling Judah, showing the two kingdoms are being tracked side by side.\n\n📅 The time is marked\n\n👑 Elah becomes king\n\n🏙️ Tirzah is the royal city\n\nThe phrase places Elah's short reign clearly in Israel's history."],
    ["Also by the Hand of the Prophet Jehu", "This shorter wording still means Jehu is the channel God uses to speak. The prophet's role is to carry the LORD's word into the king's situation.\n\n🗣️ Jehu is God's messenger\n\n📜 The message is from the LORD\n\n⚠️ The king must answer to God\n\nThe phrase explains how God's warning reaches the throne."],
  ],
  "1 Kings 16:13-18": [
    ["For All the Sins of Baasha", "This means Baasha is being judged because of all the sins he committed before God. The Bible is not calling his evil small or accidental; it is counting it as real guilt.\n\n⚠️ Baasha's sins are charged\n\n📚 God remembers the record\n\n⚖️ Judgment has a reason\n\nThe phrase explains why his house is falling."],
    ["The Sins of Elah His Son", "Elah does not escape guilt just because he is Baasha's son. He has his own sins, and he continues the same rebellion instead of turning back to God.\n\n👤 Elah is personally guilty\n\n🔁 Sin continues in the next king\n\n⚠️ Inherited power did not bring repentance\n\nThe phrase shows that Elah shares blame, not just family name."],
    ["Now the Rest of the Acts of Elah", "The rest of the acts means the rest of Elah's deeds or the remaining record of his reign. Scripture is saying more could be told about his life than what is written here.\n\n📖 More of his story existed\n\n👑 His reign had a record\n\n🧾 This is a summary line\n\nThe phrase points to the fuller account of Elah's rule."],
    ["All That He Did", "This means all the deeds Elah performed as king. It refers to the whole pattern of his actions, not to one isolated moment.\n\n📝 His actions are in view\n\n👑 The king is accountable for them\n\n📚 His whole conduct matters\n\nThe phrase gathers Elah's reign into one record of deeds."],
  ],
  "1 Kings 16:19-24": [
    ["For His Sins Which He Sinned in Doing Evil", "This means Zimri is judged for the sins he committed by doing what God calls evil. The wording stacks the idea to make the guilt plain and unmistakable.\n\n⚠️ Evil is named clearly\n\n🧾 His guilt is personal\n\n⚖️ God judges what he does\n\nThe phrase underlines that his downfall is tied to real sin."],
    ["In Walking in the Way of Jeroboam", "Walking in the way of Jeroboam means following Jeroboam's sinful pattern of rule and false worship. It is not about literally walking somewhere, but about living by the same corrupt example.\n\n🚶 Following a pattern\n\n🛐 Jeroboam's false worship continues\n\n👑 One king copies another's sin\n\nThe phrase shows Zimri choosing the same path of rebellion."],
    ["Now the Rest of the Acts of Zimri", "This is a closing record line about the rest of Zimri's deeds. Even though his reign is brief, Scripture still treats it as a recorded chapter of Israel's history.\n\n📖 More deeds could be told\n\n👑 His short reign still counts\n\n🧾 The record continues beyond this scene\n\nThe phrase signals that this summary is not the whole story of his acts."],
    ["His Treason That He Wrought", "Treason means betrayal against the king or throne, and wrought means carried out. The phrase refers to the plot and violent takeover Zimri committed.\n\n🗡️ A betrayal was carried out\n\n👑 The throne was seized violently\n\n⚠️ His rule began in treachery\n\nThe phrase names Zimri's rise to power as outright treason."],
  ],
  "1 Kings 16:25-30": [
    ["Omri Wrought Evil in the Eyes of the LORD", "Wrought evil means Omri practiced what God calls wickedness. In the eyes of the LORD means God's judgment is the standard, not public opinion or political success.\n\n👀 God sees the king clearly\n\n⚠️ Omri's conduct is evil\n\n⚖️ Heaven gives the verdict\n\nThe phrase measures Omri by God's sight, not by human achievement."],
    ["Did Worse Than All That Were Before Him", "This means Omri's evil surpassed the kings before him. He is not merely another bad king; he sets a darker standard.\n\n📉 The kingdom sinks further\n\n👑 Omri outdoes earlier evil\n\n⚠️ Sin is intensifying\n\nThe phrase shows a downward spiral in Israel's leadership."],
    ["Omri Wrought Evil in the Eyes of the LORD", "This repeated line keeps the focus on God's verdict over Omri's reign. Whatever strength or success he had, the LORD still calls it evil.\n\n👑 Omri ruled strongly\n\n👀 God still judged him\n\n⚖️ Success did not excuse sin\n\nThe phrase teaches that royal power cannot hide moral failure from God."],
    ["In His Sin Wherewith He Made Israel to Sin", "This means Omri did not sin alone; his leadership pulled the nation into sin with him. A king's corruption can become a public pattern for the people.\n\n👑 The king leads badly\n\n👥 The people are drawn into it\n\n🛐 National sin spreads from leadership\n\nThe phrase shows how one ruler's evil damages the whole nation."],
  ],
  "1 Kings 16:31-34": [
    ["It Came to Pass", "This is a simple story marker meaning and then it happened. It moves the account forward into the next event in Ahab's reign.\n\n➡️ The story moves on\n\n📅 A new moment begins\n\n📖 The account keeps unfolding\n\nThe phrase is a transition into the next development."],
    ["As If It Had Been a Light Thing for Him to Walk in the Sins of Jeroboam the Son of Nebat", "A light thing means something treated as small or unimportant. The phrase says Ahab did not think Jeroboam's sins were serious enough to stop him; he went further into evil.\n\n⚠️ Sin was treated lightly\n\n🚶 Ahab kept Jeroboam's path\n\n📉 He went even farther down\n\nThe phrase shows Ahab's hard heart toward already-known sin."],
    ["He Reared Up an Altar for Baal in the House of Baal", "Reared up an altar means Ahab built a place of sacrifice for Baal. The house of Baal is Baal's temple, so Ahab is publicly establishing idol worship in Israel.\n\n🏛️ A temple for Baal stands\n\n🛐 An altar is built there\n\n👑 The king sponsors idolatry\n\nThe phrase shows false worship becoming official and visible."],
    ["It Came to Pass", "Here the same time marker quietly introduces another step in the nation's decline. The story is showing that evil kept unfolding event by event.\n\n📖 Another event follows\n\n⏳ The decline continues over time\n\n⚠️ Sin keeps advancing\n\nThe phrase links one act of rebellion to the next."],
  ],
  "1 Kings 17:1-6": [
    ["Elijah the Tishbite", "A Tishbite is a man from Tishbe, so this phrase identifies Elijah by his hometown. It introduces the prophet as a real person from a real place.\n\n👤 Elijah is introduced\n\n🗺️ His home region is named\n\n📖 The story becomes specific\n\nThe phrase marks Elijah's first appearance in the narrative."],
    ["Elijah the Tishbite", "This title tells the reader who is stepping into Ahab's story. Elijah arrives without royal rank, but he speaks with prophetic authority from God.\n\n👤 A prophet enters the scene\n\n👑 He is not a king\n\n🗣️ Yet he will confront kings\n\nThe phrase introduces the man God will use against Ahab."],
    ["The Word of the LORD Came unto Him", "This means God spoke directly to Elijah with guidance and command. Elijah's movements are driven by divine word, not by guesswork.\n\n📜 God gives direction\n\n👂 Elijah must listen\n\n🧭 The next step comes from the LORD\n\nThe phrase explains why Elijah knows what to do next."],
    ["Elijah the Tishbite", "The repeated name keeps Elijah clearly in view as the prophet at the center of the chapter. The story wants the reader to remember this messenger of God.\n\n👤 Elijah stays central\n\n📖 His identity matters\n\n🔥 His role is only beginning\n\nThe phrase keeps attention on the prophet God has raised up."],
  ],
  "1 Kings 17:7-12": [
    ["It Came to Pass After a While", "After a while means some time passed before the brook dried up. The drought did not change overnight; the pressure built over time.\n\n⏳ Time passes\n\n💧 The brook keeps shrinking\n\n🌵 The drought is real\n\nThe phrase shows the famine growing worse with time."],
    ["It Came to Pass After a While", "This repeated wording marks the delay between God's first provision and the next crisis. Elijah must keep trusting while the water runs out.\n\n⏳ Provision lasted for a season\n\n💧 Then the brook failed\n\n🙏 Elijah will need fresh direction\n\nThe phrase moves the story from one stage of provision to another."],
    ["The Word of the LORD Came unto Him", "Again God speaks to Elijah with a new command. The prophet does not solve the problem on his own; he receives fresh instruction from the LORD.\n\n📜 God speaks again\n\n🧭 New direction is given\n\n🙏 Guidance comes at the needed moment\n\nThe phrase shows God leading Elijah step by step."],
    ["It Came to Pass After a While", "The same time marker emphasizes that need can arrive gradually. The brook does not fail on day one; the drought keeps working until the water is gone.\n\n⏰ The crisis ripens slowly\n\n💧 The stream runs dry\n\n⚠️ Drought reaches Elijah too\n\nThe phrase helps the reader feel the slow pressure of famine."],
  ],
  "1 Kings 17:13-18": [
    ["Elijah Said unto Her", "This simply means Elijah speaks directly to the widow. The phrase matters because his words bring God's promise into her fear and poverty.\n\n🗣️ Elijah addresses the widow\n\n😟 She is afraid and needy\n\n📜 God's answer comes through speech\n\nThe phrase opens the prophet's reassurance to her."],
    ["Go and Do as Thou Hast Said", "Elijah first tells her to continue the plan she just described. Thou hast said means what you have said, so he is meeting her exact situation, not ignoring it.\n\n👂 Elijah heard her clearly\n\n🍞 He speaks into her real need\n\n➡️ He answers her actual plan\n\nThe phrase shows Elijah responding to her honest words."],
    ["Elijah Said unto Her", "Here the repeated line keeps the focus on the prophet's instruction. The widow's survival will depend on whether she trusts the word God sends through Elijah.\n\n🗣️ The prophet gives direction\n\n🙏 Faith will be tested\n\n🍞 Obedience and provision meet here\n\nThe phrase marks the turning point of the widow's decision."],
    ["The Barrel of Meal Shall Not Waste", "Meal here means flour, and the barrel is her storage jar. Shall not waste means the flour will not run out even during famine.\n\n🍞 Flour will remain\n\n🏺 The jar will not empty\n\n🙏 God can sustain a poor home\n\nThe phrase promises daily provision from God."],
  ],
  "1 Kings 17:19-24": [
    ["He Said unto Her", "This means Elijah speaks to the widow after her son dies. His words begin a response of compassion and action, not distance.\n\n🗣️ Elijah answers her grief\n\n💔 The crisis is personal\n\n🤲 The prophet steps in\n\nThe phrase opens Elijah's response to a mother's sorrow."],
    ["Give Me Thy Son", "Elijah is asking the grieving mother to place the child in his arms. He is taking the dead boy from her embrace so he can carry him before the LORD.\n\n👦 The child is handed over\n\n🤲 Elijah takes responsibility in the moment\n\n🙏 He will bring the need to God\n\nThe phrase shows Elijah moving toward prayerful action."],
    ["He Cried unto the LORD", "Cried unto the LORD means Elijah prayed urgently and aloud to God. This is not a casual prayer; it is a desperate appeal for mercy.\n\n🙏 Elijah prays intensely\n\n🗣️ He calls out to God\n\n💔 The need is urgent\n\nThe phrase shows the prophet depending on God for life."],
    ["O LORD My God", "This is Elijah's personal way of addressing God in prayer. He is not speaking to an unknown power, but to the covenant LORD he knows and trusts.\n\n🙏 A direct prayer to God\n\n🤝 Personal trust is heard\n\n📜 Elijah knows who he is calling on\n\nThe phrase shows prayer rooted in relationship with the LORD."],
  ],
  "1 Kings 18:1-6": [
    ["It Came to Pass After Many Days", "After many days means a long stretch of time has passed during the drought. The story is returning after a serious period of waiting and judgment.\n\n⏳ A long delay has passed\n\n🌵 The drought has lasted on and on\n\n📖 The next stage now begins\n\nThe phrase makes the wait feel long and weighty."],
    ["It Came to Pass After Many Days", "This repeated marker stresses that Elijah's return does not happen quickly. God's timing includes long seasons before the next command comes.\n\n⏰ God waited many days\n\n🙏 Elijah had to keep waiting too\n\n📜 The next word comes in God's time\n\nThe phrase highlights the long pause before confrontation resumes."],
    ["Elijah Went to Shew Himself unto Ahab", "Shew himself means appear openly before Ahab. Elijah is no longer staying hidden; he is going to stand in front of the king.\n\n👀 Elijah will appear publicly\n\n👑 Ahab must face him\n\n🔥 Confrontation is returning\n\nThe phrase means Elijah is stepping out of hiding."],
    ["There Was a Sore Famine in Samaria", "Sore famine means a severe famine. Samaria, the capital of the northern kingdom, is suffering deeply under the drought.\n\n🌵 The famine is severe\n\n🏙️ The capital feels it too\n\n💧 The land is in distress\n\nThe phrase shows how serious the judgment has become."],
  ],
  "1 Kings 18:7-12": [
    ["As Obadiah Was in the Way", "In the way means on the road or on the journey. Obadiah is out traveling when he unexpectedly meets Elijah.\n\n🛣️ Obadiah is on the road\n\n👀 The meeting is unexpected\n\n📖 The scene shifts outdoors\n\nThe phrase sets up a sudden encounter during travel."],
    ["Elijah Met Him", "This means Elijah came face to face with Obadiah. The hidden prophet suddenly appears in front of the man searching the land.\n\n🤝 They meet directly\n\n👤 Elijah is no longer unseen\n\n⚠️ Obadiah is startled by the encounter\n\nThe phrase marks the moment the two men cross paths."],
    ["He Answered Him", "This means Elijah responds when Obadiah recognizes him. The phrase simply introduces Elijah's reply in their conversation.\n\n🗣️ Elijah answers\n\n👂 A dialogue begins\n\n📜 His response matters next\n\nThe phrase signals the start of Elijah's spoken instruction."],
    ["Tell Thy Lord", "Thy lord here means Obadiah's master, King Ahab. Elijah is telling Obadiah to report to the king that he has appeared.\n\n👑 Ahab is meant\n\n🗣️ Obadiah must carry the message\n\n👀 Elijah wants the king informed\n\nThe phrase means, 'Go tell Ahab.'" ],
  ],
  "1 Kings 18:13-18": [
    ["Was It Not Told My Lord What I Did When Jezebel Slew the Prophets of the LORD", "Obadiah is asking whether Ahab has heard how he acted when Jezebel was killing the LORD's prophets. Slew means killed, so he is reminding Elijah of his past courage and risk.\n\n⚔️ Jezebel had prophets killed\n\n🙈 Obadiah protected some of them\n\n🗣️ He is explaining his fear\n\nThe phrase shows Obadiah appealing to his earlier faithfulness."],
    ["How I Hid an Hundred Men of the Lord’s Prophets by Fifty in a Cave", "This means Obadiah hid one hundred prophets in two caves, fifty men in each cave. He sheltered them secretly so Jezebel could not find and kill them.\n\n🕳️ Prophets were hidden in caves\n\n5️⃣0️⃣ Fifty were placed in each group\n\n🛡️ Obadiah risked himself to protect them\n\nThe phrase explains the careful rescue Obadiah carried out."],
    ["Now Thou Sayest", "Now thou sayest means 'and now you are telling me.' Obadiah is repeating Elijah's command with concern because obeying it could cost him his life.\n\n🗣️ Elijah has given an order\n\n😟 Obadiah feels the danger in it\n\n⚠️ The next step seems risky\n\nThe phrase introduces Obadiah's fearful objection."],
    ["Tell Thy Lord", "Again, thy lord means King Ahab. Obadiah is troubled because going to tell Ahab about Elijah feels dangerous if Elijah disappears again.\n\n👑 Ahab is the one to be told\n\n🏃 Obadiah would have to go to him\n\n😰 The errand feels deadly\n\nThe phrase explains the risky message Obadiah has been asked to carry."],
  ],
  "1 Kings 18:19-24": [
    ["Now Therefore Send", "Now therefore send means Elijah is commanding Ahab to act right away in response to what has been said. The phrase introduces a direct order, not a suggestion.\n\n🗣️ Elijah gives a command\n\n➡️ Ahab must act now\n\n📜 The next step is set\n\nThe phrase opens Elijah's challenge to the king."],
    ["Gather to Me All Israel unto Mount Carmel", "Elijah is calling for the people to assemble at Mount Carmel. He wants the nation to witness the contest and see who the true God is.\n\n👥 Israel must gather\n\n⛰️ Mount Carmel is the meeting place\n\n👀 The people are called to watch\n\nThe phrase summons the nation to a public showdown."],
    ["So Ahab Sent unto All the Children of Israel", "This means Ahab obeyed the order and sent word throughout Israel. The king helps gather the people for the coming confrontation.\n\n👑 Ahab sends the message out\n\n👥 The people are called together\n\n📣 News spreads across Israel\n\nThe phrase shows the assembly being organized."],
    ["Gathered the Prophets Together unto Mount Carmel", "This means the prophets of Baal were brought together at Mount Carmel along with the people. The false worship leaders are being called into a public test.\n\n🛐 Baal's prophets are assembled\n\n⛰️ Carmel becomes the stage\n\n⚖️ A public test is coming\n\nThe phrase gathers the false prophets into the place of decision."],
  ],
  "1 Kings 18:25-30": [
    ["Elijah Said unto the Prophets of Baal", "This means Elijah addresses Baal's prophets directly. He is setting the terms of the test so their god can be publicly shown powerless.\n\n🗣️ Elijah speaks to Baal's prophets\n\n⚖️ The contest is being arranged\n\n👀 Everyone will be watching\n\nThe phrase opens Elijah's instructions to the false prophets."],
    ["Choose You One Bullock for Yourselves", "A bullock is a young bull for sacrifice. Elijah tells Baal's prophets to select one animal for their altar first.\n\n🐂 A sacrificial bull is chosen\n\n🛐 The false prophets prepare first\n\n⚖️ The test begins fairly\n\nThe phrase explains the offering they are told to pick."],
    ["They Took the Bullock Which Was Given Them", "This means the prophets of Baal accepted the animal provided for them and began their part of the test. The phrase records the start of their attempt.\n\n🐂 They receive the bull\n\n🛐 Their ritual is underway\n\n📖 The scene moves into action\n\nThe phrase shows them beginning their sacrifice."],
    ["They Dressed It", "Dressed it means they prepared the bull for sacrifice by cutting and arranging it. It is an old sacrificial term, not about clothing.\n\n🔪 The animal is prepared\n\n🪵 The altar is being readied\n\n🛐 Ritual action is underway\n\nThe phrase explains the practical preparation of the sacrifice."],
  ],
  "1 Kings 18:31-36": [
    ["Elijah Took Twelve Stones", "Elijah takes twelve stones to rebuild the altar. The number matters because it matches the twelve tribes of Israel.\n\n1️⃣2️⃣ Twelve stones are chosen\n\n🪨 An altar is being rebuilt\n\n👥 All Israel is represented\n\nThe phrase ties the altar to the whole covenant people."],
    ["According to the Number of the Tribes of the Sons of Jacob", "This means the stones are counted to match Israel's twelve tribes descended from Jacob. Elijah is reminding the people that the nation still belongs to the LORD as one covenant family.\n\n1️⃣2️⃣ The tribes are counted\n\n🧬 Jacob's family is in view\n\n🤝 The covenant people are one people\n\nThe phrase explains why Elijah uses exactly twelve stones."],
    ["Elijah Took Twelve Stones", "Here the repeated line emphasizes that Elijah is not inventing a new religion. He is rebuilding worship around Israel's original covenant identity.\n\n🪨 The altar is restored\n\n📜 Old covenant identity is remembered\n\n👥 Elijah calls all tribes back to God\n\nThe phrase points back to Israel's shared roots."],
    ["He Made a Trench About the Altar", "A trench is a ditch around the altar. Elijah digs it to hold the water that will later be poured out, making the coming fire even more striking.\n\n🕳️ A ditch surrounds the altar\n\n💧 It will catch the water\n\n🔥 The miracle will be unmistakable\n\nThe phrase describes the careful setup of the altar scene."],
  ],
  "1 Kings 18:37-42": [
    ["That This People May Know That Thou Art", "Elijah is asking God to answer so the people will know who He truly is. The prayer is aimed at revelation, not at Elijah's reputation.\n\n👥 The people need to know\n\n🙏 Elijah asks God to reveal Himself\n\n👀 The moment is about true identity\n\nThe phrase explains the goal of Elijah's prayer."],
    ["That This People May Know That Thou Art", "The repeated line means the miracle should make Israel know that the LORD is the true God. Elijah wants the nation's confusion ended.\n\n🛐 The true God must be recognized\n\n❌ Confusion with Baal must end\n\n👥 Israel is being called back\n\nThe phrase asks for a sign that will teach the nation clearly."],
    ["Then the Fire of the LORD Fell", "This means God answered by sending fire down from heaven. The response is immediate and unmistakable.\n\n🔥 God answers with fire\n\n🙏 The prayer is heard\n\n⚡ Heaven acts openly\n\nThe phrase shows the LORD giving a visible answer."],
    ["Consumed the Burnt Sacrifice", "Consumed means the fire completely burned up the offering. God did not give a partial answer; He fully accepted and overwhelmed the sacrifice.\n\n🔥 The offering is fully burned\n\n🐂 The sacrifice is taken up\n\n⚡ The answer leaves no doubt\n\nThe phrase shows how complete God's response was."],
  ],
  "1 Kings 18:43-46": [
    ["Said to His Servant", "This means Elijah gives instructions to the servant helping him watch for rain. The prophet does not stop praying after the fire; he also waits expectantly for the promised storm.\n\n🗣️ Elijah directs his servant\n\n👀 Someone must watch the sky\n\n🌧️ Rain is now expected\n\nThe phrase begins Elijah's watch for answered prayer."],
    ["Go Up Now", "Elijah is telling the servant to go up and look toward the sea. Go up now is an instruction to climb and watch, not a vague encouragement.\n\n⛰️ The servant must go higher\n\n👀 He is sent to look out\n\n🌊 The sea is the direction to watch\n\nThe phrase is a command to check for signs of rain."],
    ["It Came to Pass at the Seventh Time", "At the seventh time means the servant had already looked several times before anything changed. The answer did not appear on the first trip, but after repeated waiting.\n\n7️⃣ He looks again and again\n\n⏳ The answer takes time\n\n🌧️ A sign finally appears\n\nThe phrase teaches patient persistence before the rain comes."],
    ["Said to His Servant", "The repeated wording keeps Elijah's quiet leadership in view. He keeps sending the servant back because he trusts God's word even before he sees the cloud.\n\n🙏 Elijah keeps expecting God's answer\n\n👂 The servant keeps obeying\n\n🌧️ Faith keeps watching\n\nThe phrase shows steady trust while waiting for rain."],
  ],
  "1 Kings 19:1-6": [
    ["Ahab Told Jezebel All That Elijah Had Done", "This means Ahab reported Elijah's actions to Jezebel after Mount Carmel. The victory is immediately carried into the royal court, where new danger begins.\n\n👑 Ahab carries the report home\n\n🔥 Carmel's events reach Jezebel\n\n⚠️ Trouble is about to rise\n\nThe phrase moves the story from public victory to personal threat."],
    ["Withal How He Had Slain All the Prophets with the Sword", "Withal means also, and slain with the sword means killed in open judgment. The report includes that Elijah had put Baal's prophets to death.\n\n📣 The full report is given\n\n⚔️ Baal's prophets were killed\n\n😡 This will inflame Jezebel\n\nThe phrase explains what part of the news makes the threat so fierce."],
    ["Then Jezebel Sent a Messenger unto Elijah", "This means Jezebel sends a message directly to Elijah instead of meeting him herself. Her response is fast, deliberate, and threatening.\n\n📨 A warning is sent out\n\n👑 Jezebel acts quickly\n\n⚠️ Elijah is now targeted\n\nThe phrase opens the threat against the prophet."],
    ["So Let the Gods Do to Me", "This is an oath formula. Jezebel is calling on her gods to punish her if she does not kill Elijah as he killed Baal's prophets.\n\n🗣️ Jezebel swears an oath\n\n🛐 She invokes false gods\n\n⚔️ The oath is a death threat\n\nThe phrase explains the form of her violent promise."],
  ],
  "1 Kings 19:7-12": [
    ["The Angel of the LORD Came Again the Second Time", "This means the angel returns to Elijah a second time. God does not leave His exhausted prophet after one touch; He comes again with continued care.\n\n🙏 God cares for Elijah again\n\n🔁 Help is repeated\n\n🤲 The prophet is not abandoned\n\nThe phrase shows patient divine care for a weary servant."],
    ["Arise and Eat", "Arise means get up, and eat means take the food God has provided. Elijah is too drained to keep going without receiving strength first.\n\n⬆️ Elijah must get up\n\n🍞 Food is provided for him\n\n💪 Strength is needed before the journey\n\nThe phrase is a call to receive God's sustaining care."],
    ["Did Eat and Drink", "This means Elijah obeyed and took the food and water set before him. The simple act matters because restoration begins with accepting God's provision.\n\n🍞 He receives the food\n\n💧 He takes the water\n\n✅ Elijah responds to God's care\n\nThe phrase shows him taking in the strength he has been given."],
    ["Went in the Strength of That Meat Forty Days and Forty Nights unto Horeb the Mount of God", "Strength of that meat means the food God gave sustained Elijah for the journey. Horeb, the mount of God, is another name for Sinai, the place strongly linked with God's covenant dealings.\n\n🍞 God-given food strengthens him\n\n🚶 The journey is long\n\n⛰️ Horeb is a holy meeting place\n\nThe phrase shows God carrying Elijah toward a significant encounter."],
  ],
  "1 Kings 19:13-18": [
    ["It Was So", "This means it happened just that way when Elijah heard the voice. The phrase confirms the event before the scene moves into Elijah's response.\n\n📖 The event is confirmed\n\n👂 Elijah has heard\n\n➡️ The response now follows\n\nThe phrase quietly turns the scene toward Elijah's action."],
    ["When Elijah Heard It", "This means Elijah heard the gentle voice of the LORD. His reaction matters because the voice, not the wind or fire, draws him out.\n\n👂 Elijah hears God's voice\n\n🌬️ It was not in the storm signs\n\n🚪 He responds by coming out\n\nThe phrase marks the moment God's quiet word reaches him."],
    ["I Have Been Very Jealous for the LORD God of Hosts", "Jealous here means zealous or fiercely devoted, not petty envy. Elijah is saying he has cared deeply for the honor of the LORD God of hosts, the LORD of heavenly armies.\n\n🔥 Elijah speaks of strong zeal\n\n🙏 His devotion is to the LORD\n\n⚔️ God's majesty is in view\n\nThe phrase expresses Elijah's intense loyalty to God."],
    ["Because the Children of Israel Have Forsaken Thy Covenant", "Forsaken thy covenant means Israel has abandoned the agreement and loyalty they owed to God. Elijah is explaining that the nation has turned away from covenant faithfulness.\n\n💔 Israel has broken faith\n\n📜 God's covenant has been neglected\n\n🛐 Rebellion is national, not private\n\nThe phrase names the people's covenant unfaithfulness."],
  ],
  "1 Kings 19:19-21": [
    ["So He Departed Thence", "Departed thence means Elijah left that place and went on from there. After hearing God's instruction, he moves into action.\n\n🚶 Elijah leaves the mountain region\n\n📜 He is obeying what God said\n\n➡️ The mission now continues\n\nThe phrase shows obedience beginning in movement."],
    ["Found Elisha the Son of Shaphat", "This means Elijah located Elisha, the man God had chosen next. Elisha is introduced in ordinary work before his calling becomes public.\n\n👤 Elisha is identified\n\n🔍 Elijah finds him\n\n🌾 The future prophet is met in daily labor\n\nThe phrase introduces Elijah's successor."],
    ["He Left the Oxen", "This means Elisha left behind the team of oxen he had been using to plow. It shows a real break from his old work in order to answer the call.\n\n🐂 Farm work is left behind\n\n↩️ Elisha turns from former labor\n\n📜 A new calling begins\n\nThe phrase shows the cost of immediate response."],
    ["Ran After Elijah", "This means Elisha quickly went after Elijah to speak with him. His response is eager, not reluctant.\n\n🏃 Elisha responds at once\n\n👂 He wants to follow the call\n\n➡️ The invitation is taken seriously\n\nThe phrase shows readiness to follow Elijah."],
  ],
};

function rewriteDay86FirstKingsSection(section: KingdomDeclinePhraseSectionInput): KingdomDeclinePhraseSectionInput {
  const overrides = DAY_86_FIRST_KINGS_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const DAY_87_FIRST_KINGS_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "1 Kings 20:1-6": [
    ["Ben-hadad the King of Syria Gathered All His Host Together", "Ben-hadad gathers his whole army for a full military attack. Host here means fighting force, not a host at a meal.\n\n⚔️ A major army is assembled\n\n👑 Ben-hadad leads it\n\n🏙️ Samaria is under threat\n\nThe phrase opens a large-scale invasion against Israel."],
    ["There Were Thirty and Two Kings with Him", "This means thirty-two allied rulers came with Ben-hadad. He is not attacking alone but with a coalition of kings.\n\n👑 Many kings are involved\n\n🤝 Syria has strong allies\n\n⚠️ The threat looks overwhelming\n\nThe phrase shows how large the enemy alliance is."],
    ["He Sent Messengers to Ahab King of Israel into the City", "Ben-hadad sends official envoys into Samaria to speak to Ahab. Messengers here carry demands from one king to another.\n\n📨 Royal message delivered\n\n🏙️ It reaches the city\n\n👑 Ahab must answer it\n\nThe phrase begins a formal exchange before battle."],
    ["Said unto Him", "This simply introduces the words spoken to Ahab. The phrase matters because the next lines contain the enemy king's demand.\n\n🗣️ A message is spoken\n\n👂 Ahab must hear it\n\n📜 The demand is about to be stated\n\nThe phrase turns the scene from arrival to speech."],
  ],
  "1 Kings 20:7-12": [
    ["Then the King of Israel Called All the Elders of the Land", "Ahab gathers the elders, the leading men of the land, for counsel. He does not answer Ben-hadad alone but consults other leaders.\n\n👥 The elders are summoned\n\n👑 Ahab seeks counsel\n\n⚖️ The matter affects the whole nation\n\nThe phrase shows a crisis meeting in Israel."],
    ["I Pray You", "I pray you is old polite wording that means please or I ask you. Ahab is appealing to the elders for their judgment.\n\n🙏 A respectful appeal\n\n💬 It means please\n\n👂 Advice is being requested\n\nThe phrase helps the reader hear the tone of Ahab's words."],
    ["All the Elders and All the People Said unto Him", "This means the leaders and the people give Ahab a united answer. The response is not divided; they speak with one voice.\n\n👥 Leaders and people agree\n\n🗣️ A public answer is given\n\n🤝 The nation answers together\n\nThe phrase shows broad agreement against Ben-hadad's demand."],
    ["Hearken Not unto Him", "Hearken means listen or obey. They are telling Ahab not to give in to Ben-hadad's command.\n\n👂 Hearken means obey\n\n🚫 They say do not yield\n\n⚔️ Resistance is chosen\n\nThe phrase is a refusal to submit to the enemy king."],
  ],
  "1 Kings 20:13-18": [
    ["There Came a Prophet unto Ahab King of Israel", "A prophet comes directly to Ahab with God's word in the middle of the crisis. The king is not left to military guessing alone.\n\n🙏 God sends a prophet\n\n👑 Ahab is addressed directly\n\n📜 Heaven speaks into war\n\nThe phrase shows God entering the battle scene by His word."],
    ["Thus Saith the LORD", "This means the message comes from God Himself. The prophet is not offering strategy advice from his own mind.\n\n📜 God's own message begins\n\n🗣️ The prophet speaks for Him\n\n⚖️ The words carry divine authority\n\nThe phrase marks the start of the LORD's declaration."],
    ["Even by the Young Men of the Princes of the Provinces", "This means God will give victory through young attendants connected to regional rulers. The surprising point is that the deliverance will come through an unexpected group.\n\n👦 Young men will lead the opening attack\n\n👑 They serve provincial princes\n\n⚠️ God's method is surprising\n\nThe phrase shows victory coming through unlikely fighters."],
    ["Then He Numbered the Young Men of the Princes of the Provinces", "Numbered means counted or organized for battle. Ahab is assembling the exact men the prophet mentioned.\n\n🔢 The men are counted\n\n⚔️ They are being organized\n\n✅ Ahab follows the prophetic instruction\n\nThe phrase shows the battle force being prepared."],
  ],
  "1 Kings 20:19-24": [
    ["So These Young Men of the Princes of the Provinces Came Out of the City", "The young men leave Samaria and move out first against the Syrians. They are the opening wave of Israel's attack.\n\n🚪 They come out of the city\n\n👦 The young men lead\n\n⚔️ The battle begins with them\n\nThe phrase shows the unexpected force stepping into action."],
    ["The Army Which Followed Them", "This means the main Israelite army came out behind the young men. They were not alone; more soldiers followed after them.\n\n👣 The first group is followed\n\n🪖 Israel's army joins in\n\n⚔️ The attack widens\n\nThe phrase explains that the young men were only the front of the force."],
    ["They Slew Every One His Man", "This means each Israelite struck down the opponent in front of him. The line pictures direct hand-to-hand victory in battle.\n\n⚔️ Each man defeats his opponent\n\n🩸 The fighting is personal and close\n\n🏃 The enemy line breaks\n\nThe phrase shows the battle turning in Israel's favor."],
    ["The Syrians Fled", "Fled means they ran away in defeat. The attacking army that looked so strong is now retreating.\n\n🏃 The Syrians run\n\n⚔️ Their attack fails\n\n👑 Israel gains the upper hand\n\nThe phrase marks the enemy's collapse into retreat."],
  ],
  "1 Kings 20:25-30": [
    ["Number Thee an Army", "Number thee an army means count out and rebuild an army for a new campaign. Ben-hadad is being told to raise another force after his loss.\n\n🔢 A new army must be counted\n\n⚔️ The war is not over\n\n🔁 Syria prepares again\n\nThe phrase is advice to rebuild military strength."],
    ["Like the Army That Thou Hast Lost", "This means replace the soldiers and resources that were lost in the earlier defeat. The goal is to restore the same level of military power.\n\n📉 An army was lost before\n\n🔁 It must be rebuilt to match\n\n⚔️ The enemy plans a second attempt\n\nThe phrase calls for a full replacement of the defeated force."],
    ["It Came to Pass at the Return of the Year", "Return of the year means the next campaigning season, when kings normally went out to war again. It marks the arrival of another war year.\n\n📅 A new war season comes\n\n⚔️ Armies move again\n\n🔁 The conflict resumes\n\nThe phrase places the next battle in the following year."],
    ["Number Thee an Army", "Here the repeated wording stresses deliberate military rebuilding. Syria is not acting randomly; it is preparing carefully for revenge.\n\n🔢 The troops are counted again\n\n🪖 The force is rebuilt on purpose\n\n⚠️ Another attack is coming\n\nThe phrase emphasizes planned preparation for war."],
  ],
  "1 Kings 20:31-36": [
    ["His Servants Said unto Him", "Ben-hadad's servants begin advising him after the defeat. The phrase opens the counsel of men trying to save their master's life.\n\n🗣️ Servants give counsel\n\n👑 Ben-hadad must listen\n\n⚠️ Defeat has forced a new plan\n\nThe phrase introduces advice from his attendants."],
    ["We Have Heard That the Kings of the House of Israel Are Merciful Kings", "House of Israel here means the royal line or rulers of Israel. The servants believe Israel's kings may spare a defeated enemy who humbles himself.\n\n👑 Israel's kings have a reputation\n\n🏠 House means ruling line\n\n🙏 Mercy is being sought\n\nThe phrase explains why they think surrender might work."],
    ["So They Girded Sackcloth on Their Loins", "Sackcloth is rough mourning cloth, and girded on their loins means they wrapped it around themselves. It is a sign of humility, grief, and surrender.\n\n🧵 Rough cloth is worn\n\n🙇 They appear humbled\n\n⚠️ They come as defeated men\n\nThe phrase shows outward signs of submission."],
    ["Put Ropes on Their Heads", "Ropes on their heads are signs that they are yielding themselves like prisoners begging for mercy. They come in visible humiliation.\n\n🪢 They present themselves as captives\n\n🙇 Their humiliation is public\n\n🙏 They are pleading for life\n\nThe phrase shows surrender in a dramatic form."],
  ],
  "1 Kings 20:37-42": [
    ["Then He Found Another Man", "The prophet looks for another man after the first refused to strike him. The phrase moves the acted-out lesson to the next participant.\n\n👤 Another man is found\n\n📖 The prophetic sign continues\n\n⚠️ The lesson is not finished\n\nThe phrase keeps the parable moving forward."],
    ["I Pray Thee", "Here I pray thee again means please or I ask you. The prophet is making a direct request in polite older wording.\n\n🙏 A request is being made\n\n💬 It means please\n\n👂 The man is being asked to act\n\nThe phrase explains the tone of the prophet's request."],
    ["So the Prophet Departed", "Departed means the prophet went away and took his place for the next part of the sign. He is setting up a lesson for the king to walk into.\n\n🚶 The prophet moves on\n\n🎭 He prepares the acted sign\n\n👑 The king will soon be confronted\n\nThe phrase shows the prophet moving into position."],
    ["Waited for the King by the Way", "By the way means beside the road. The prophet waits where the king will pass so he can confront him through the parable.\n\n🛣️ He waits by the road\n\n👀 The king is expected there\n\n⚖️ A confrontation is planned\n\nThe phrase sets the meeting place for the prophetic rebuke."],
  ],
  "1 Kings 21:1-6": [
    ["It Came to Pass After These Things", "This time marker means the next event happened after the battle stories that came before. It connects Naboth's vineyard story to what has just happened in Ahab's reign.\n\n➡️ The story moves to a new event\n\n📅 It happens afterward\n\n👑 Ahab remains central\n\nThe phrase links the vineyard episode to the earlier reign narrative."],
    ["It Came to Pass After These Things", "The repeated line again serves as a transition into the next scene. Scripture is moving from war to a private injustice that will matter greatly.\n\n📖 A new scene opens\n\n🏡 The setting shifts from battlefield to vineyard\n\n⚠️ Another sin is coming into view\n\nThe phrase prepares the reader for a different kind of crisis."],
    ["Ahab Spake unto Naboth", "Spake means spoke. Ahab is now personally addressing Naboth about the vineyard he wants.\n\n🗣️ Ahab speaks directly\n\n👤 Naboth is the one addressed\n\n🏡 The dispute begins in words\n\nThe phrase starts the conversation over the vineyard."],
    ["Give Me Thy Vineyard", "Ahab is asking Naboth to hand over his vineyard. In Israel, a vineyard could be family inheritance, so this is not a small casual request.\n\n🍇 The vineyard is desired\n\n🏠 Family property is involved\n\n⚖️ Ownership matters deeply\n\nThe phrase explains why Naboth cannot treat this like ordinary land trade."],
  ],
  "1 Kings 21:7-12": [
    ["Jezebel His Wife Said unto Him", "This introduces Jezebel speaking to Ahab when he is angry and sullen. Her words will push the story from desire into evil action.\n\n🗣️ Jezebel speaks next\n\n👑 She addresses the king\n\n⚠️ Her counsel will be dangerous\n\nThe phrase opens Jezebel's intervention."],
    ["Dost Thou Now Govern the Kingdom of Israel", "Jezebel is asking, 'Are you not the king?' She is pressing Ahab to use royal power to get what he wants.\n\n👑 Kingship is appealed to\n\n💪 Power is being emphasized\n\n⚠️ Authority is being twisted\n\nThe phrase pushes Ahab toward abusive rule."],
    ["So She Wrote Letters in Ahab’s Name", "Jezebel writes official letters as if they came from Ahab himself. She is using the king's name to carry out her plot.\n\n✍️ Letters are written\n\n👑 Ahab's authority is borrowed\n\n🕵️ The plot is disguised as royal action\n\nThe phrase shows deceit using the king's name."],
    ["Sealed Them with His Seal", "The seal is the mark that makes a letter officially royal. By sealing them, the forged plan carries the king's authority.\n\n🔏 The letters are made official\n\n👑 Royal authority is attached\n\n⚠️ Evil is backed by state power\n\nThe phrase shows the plot being turned into official policy."],
  ],
  "1 Kings 21:13-18": [
    ["There Came in Two Men", "Two men are brought in as witnesses against Naboth. The number matters because legal accusations were often established by multiple witnesses.\n\n👥 Two accusers appear\n\n⚖️ A legal-looking case is staged\n\n🕵️ The plot moves into court form\n\nThe phrase begins the false testimony against Naboth."],
    ["Children of Belial", "Children of Belial means worthless or wicked men. It does not mean literal children of a man named Belial, but corrupt men fit for evil work.\n\n⚠️ Wicked men are meant\n\n🗣️ They will lie in court\n\n⚖️ Corruption enters the trial\n\nThe phrase identifies the false witnesses as evil men."],
    ["Then They Sent to Jezebel", "This means the leaders sent word back to Jezebel after Naboth had been killed. She is the one waiting to hear the plot succeeded.\n\n📨 A report is sent back\n\n👑 Jezebel receives the news\n\n🩸 The murder has been completed\n\nThe phrase shows the conspiracy reporting back to its source."],
    ["Naboth Is Stoned", "Stoned means killed by stones thrown as execution. Naboth is not merely punished; he is put to death.\n\n🪨 Execution by stoning\n\n💀 Naboth is killed\n\n⚖️ The law is being abused for murder\n\nThe phrase states the deadly outcome plainly."],
  ],
  "1 Kings 21:19-24": [
    ["Thou Shalt Speak unto Him", "God is commanding Elijah to confront Ahab personally. The prophet must deliver God's accusation straight to the king.\n\n🗣️ Elijah must speak directly\n\n👑 Ahab is the target\n\n📜 The confrontation is commanded by God\n\nThe phrase sends Elijah into direct rebuke."],
    ["Thus Saith the LORD", "These words announce that Elijah's message comes from God, not from personal anger. The king is hearing heaven's verdict.\n\n📜 God's word begins\n\n⚖️ The verdict is divine\n\n👂 Ahab must hear it as judgment\n\nThe phrase marks the authority behind Elijah's rebuke."],
    ["Ahab Said to Elijah", "Ahab now answers Elijah face to face. The phrase turns the scene into direct confrontation between king and prophet.\n\n🗣️ Ahab responds\n\n👀 Prophet and king meet directly\n\n⚠️ The guilt is now exposed\n\nThe phrase brings Ahab's own voice into the accusation scene."],
    ["Hast Thou Found Me", "Ahab means, 'Have you caught me?' The wording carries the feeling that Elijah has come upon him as an enemy exposing his sin.\n\n👀 Ahab feels discovered\n\n⚖️ Sin has been found out\n\n😠 He speaks defensively\n\nThe phrase shows a guilty king reacting to exposure."],
  ],
  "1 Kings 21:25-29": [
    ["There Was None Like unto Ahab", "This means no other king matched Ahab in the particular evil being described here. The line is stressing how extreme his wickedness became.\n\n👑 Ahab stands out for evil\n\n📉 His sin reaches an extreme\n\n⚠️ He becomes a dark example\n\nThe phrase marks Ahab as unusually wicked."],
    ["There Was None Like unto Ahab", "The repeated wording intensifies the judgment on Ahab's character. Scripture is not praising uniqueness here but condemning it.\n\n📜 The judgment is repeated\n\n👑 His evil is singled out\n\n⚖️ This is blame, not honor\n\nThe phrase makes the condemnation unmistakable."],
    ["He Did Very Abominably in Following Idols", "Abominably means in a deeply detestable way. Following idols means Ahab gave himself to false gods and their practices.\n\n🛐 He chased false gods\n\n⚠️ His behavior was detestable to God\n\n👑 The king led in corruption\n\nThe phrase explains the depth of Ahab's idolatry."],
    ["According to All Things as Did the Amorites", "The Amorites were former peoples of the land known for great wickedness. The phrase says Ahab acted like those pagan nations God had judged before.\n\n🏺 Pagan nations are the comparison\n\n⚠️ Ahab copies their evil\n\n📜 Israel's king acts like judged peoples\n\nThe phrase shows how far Ahab has fallen from covenant faithfulness."],
  ],
  "1 Kings 22:1-6": [
    ["They Continued Three Years Without War Between Syria and Israel", "This means a full three-year period passed without fighting between Syria and Israel. The pause in war sets the stage for the next campaign.\n\n📅 Three quiet years pass\n\n⚔️ Syria and Israel are not fighting\n\n➡️ The story is preparing for renewed conflict\n\nThe phrase marks a temporary peace before war returns."],
    ["They Continued Three Years Without War Between Syria", "This shorter wording still stresses the long pause in battle with Syria. The peace is real, but it will not last.\n\n⏳ Time passes without battle\n\n⚔️ Syria remains the old enemy\n\n⚠️ The calm is temporary\n\nThe phrase highlights the stretch of uneasy peace."],
    ["War Between Syria and Israel", "This names the conflict between the two nations directly. It frames the political struggle that drives the chapter.\n\n⚔️ Two nations are at odds\n\n👑 Kings are deciding war matters\n\n📖 The chapter is set in conflict\n\nThe phrase identifies the main military tension."],
    ["It Came to Pass in the Third Year", "This means the next event happened in the third year of that peace period. The phrase places the action at a specific point in time.\n\n📅 A precise year is marked\n\n➡️ The story moves forward\n\n⚔️ A new decision is about to be made\n\nThe phrase locates the next scene historically."],
  ],
  "1 Kings 22:7-12": [
    ["Is There Not Here a Prophet of the LORD Besides", "Jehoshaphat is asking whether there is still a true prophet of the LORD available. Besides means other than the court prophets already speaking.\n\n🙏 A true prophet is requested\n\n👥 The current voices are not enough\n\n📜 Jehoshaphat wants God's word specifically\n\nThe phrase looks for a genuine message from the LORD."],
    ["Is There Not Here a Prophet of the LORD", "This shorter wording still means Jehoshaphat wants counsel from a real prophet of God. He is not content with political optimism alone.\n\n📜 He wants God's word\n\n👑 Kings need more than flattery\n\n🙏 The LORD's prophet is sought\n\nThe phrase shows spiritual caution in the king of Judah."],
    ["The King of Israel Said unto Jehoshaphat", "This introduces Ahab's answer to Jehoshaphat. The king of Israel now reveals his attitude toward the one remaining prophet.\n\n🗣️ Ahab replies\n\n👑 He speaks to Jehoshaphat\n\n⚠️ His bias will become clear\n\nThe phrase turns the scene to Ahab's response."],
    ["There Is Yet One Man", "Ahab admits there is still one prophet left to ask. Yet one man means one remaining option, Micaiah.\n\n👤 One prophet remains\n\n📜 A final voice is available\n\n⚠️ Ahab does not like him\n\nThe phrase identifies the last true messenger in the scene."],
  ],
  "1 Kings 22:13-18": [
    ["The Messenger That Was Gone to Call Micaiah Spake unto Him", "This introduces the messenger's attempt to influence Micaiah before he reaches the kings. The pressure begins before the prophecy is spoken publicly.\n\n🗣️ The messenger speaks first\n\n🚶 Micaiah is still on the way\n\n⚠️ Pressure is being applied early\n\nThe phrase opens the attempt to shape his answer."],
    ["The Words of the Prophets Declare Good unto the King with One Mouth", "With one mouth means all the prophets are saying the same thing together. They are speaking united approval to the king.\n\n👥 Many prophets speak alike\n\n👍 Their message is favorable\n\n🗣️ It sounds unanimous\n\nThe phrase explains the pressure on Micaiah to agree."],
    ["As the LORD Liveth", "This is an oath meaning 'as surely as the LORD lives.' Micaiah is swearing that he will speak truthfully before the living God.\n\n🙏 An oath is made before God\n\n📜 The LORD is living and real\n\n🗣️ Truthful speech is promised\n\nThe phrase marks solemn loyalty to God's truth."],
    ["What the LORD Saith unto Me", "Micaiah means he will say only what God tells him to say. He is refusing to shape his message to please the kings.\n\n📜 God's words set the message\n\n🚫 Micaiah will not flatter\n\n🗣️ He speaks only what he receives\n\nThe phrase defines true prophetic faithfulness."],
  ],
  "1 Kings 22:19-24": [
    ["Hear Thou Therefore the Word of the LORD", "Hear thou means listen carefully. Micaiah is telling the king to hear the actual message from God.\n\n👂 A direct call to listen\n\n📜 The LORD's word is coming\n\n⚖️ The moment is serious\n\nThe phrase demands attention to divine revelation."],
    ["I Saw the LORD Sitting on His Throne", "Micaiah is describing a vision of God as king, seated on His throne. The image shows the LORD ruling above all earthly kings.\n\n👑 God is seen as true king\n\n🪑 He sits on the throne\n\n🌌 Heaven rules over earth\n\nThe phrase lifts the scene from palace politics to heavenly rule."],
    ["The LORD Said", "This introduces God's own speech within the vision. The reader is now hearing heavenly deliberation, not human counsel.\n\n🗣️ God speaks in the vision\n\n📜 Heaven gives the word\n\n⚖️ The decision comes from above\n\nThe phrase moves the vision into divine speech."],
    ["Hear Thou Therefore the Word of the LORD", "The repeated line presses the point that Ahab is being told God's real verdict. Micaiah wants the king to know this is no ordinary opinion.\n\n📜 The word is repeated for emphasis\n\n👂 Ahab must not miss it\n\n⚠️ The warning is official\n\nThe phrase underlines the seriousness of hearing God."],
  ],
  "1 Kings 22:25-30": [
    ["Thou Shalt See in That Day", "Micaiah means the truth of his prophecy will become obvious when that day arrives. The future event itself will prove who spoke rightly.\n\n👀 The outcome will reveal the truth\n\n📅 A specific day is coming\n\n⚖️ Events will test the prophecy\n\nThe phrase points forward to visible proof."],
    ["When Thou Shalt Go into an Inner Chamber to Hide Thyself", "An inner chamber is a private inside room. Micaiah is saying the false prophet will one day hide himself in fear.\n\n🚪 An inner room is meant\n\n🙈 Hiding shows fear and shame\n\n📅 The prediction points to a future collapse\n\nThe phrase warns of panic after false confidence."],
    ["The King of Israel Said", "This introduces Ahab's order after hearing Micaiah. His response is not repentance but control and punishment.\n\n🗣️ Ahab gives a command\n\n👑 Royal authority is used\n\n⚠️ He rejects the warning\n\nThe phrase turns prophecy into a political reaction."],
    ["Carry Him Back unto Amon the Governor of the City", "Amon is the city governor, an official ruler under the king. Ahab orders Micaiah returned to local custody.\n\n🏛️ The governor is a city official\n\n⛓️ Micaiah is sent back under guard\n\n👑 Ahab uses state power against the prophet\n\nThe phrase shows the prophet being imprisoned by command."],
  ],
  "1 Kings 22:31-36": [
    ["The King of Syria Commanded His Thirty and Two", "This means the Syrian king gave orders to his thirty-two captains. The battle plan begins with command from the top.\n\n👑 The Syrian king orders his leaders\n\n3️⃣2️⃣ Captains are addressed\n\n⚔️ A focused battle plan is set\n\nThe phrase opens the enemy's strategy."],
    ["Fight Neither with Small Nor Great", "This means do not waste effort on ordinary soldiers. The Syrian captains are told to focus only on Israel's king.\n\n🚫 Ignore lesser targets\n\n👑 The king is the main target\n\n⚔️ The order is highly focused\n\nThe phrase narrows the battle objective to one man."],
    ["It Came to Pass", "This simple marker moves the narrative into the battle action. What had been planned is now unfolding.\n\n➡️ The action begins\n\n📖 Plans turn into events\n\n⚔️ The battle scene opens\n\nThe phrase transitions from order to action."],
    ["When the Captains of the Chariots Saw Jehoshaphat", "This means the Syrian commanders spotted Jehoshaphat and mistook him for Israel's king. Their attention quickly turns toward him.\n\n👀 Jehoshaphat is seen\n\n⚠️ He is mistaken for Ahab\n\n⚔️ The attack shifts toward him\n\nThe phrase explains why Jehoshaphat suddenly becomes the target."],
  ],
  "1 Kings 22:37-42": [
    ["So the King Died", "This plainly means Ahab died from his battle wound. The prophecy is now fulfilled in the king's death.\n\n💀 Ahab dies\n\n⚔️ The battle ends in judgment\n\n📜 The warning proves true\n\nThe phrase states the final outcome of the king's fall."],
    ["Was Brought to Samaria", "This means Ahab's body was carried back to Samaria, Israel's capital. The dead king returns to his own city.\n\n🏙️ Samaria receives the body\n\n🚚 He is brought back after battle\n\n👑 The capital becomes the burial setting\n\nThe phrase places the aftermath in Israel's royal city."],
    ["One Washed the Chariot in the Pool of Samaria", "This means someone cleaned Ahab's bloodied chariot at Samaria's pool. The detail matters because it becomes part of the prophecy's fulfillment.\n\n🛞 The chariot is washed\n\n💧 The pool is the place named\n\n📜 The scene ties to God's earlier word\n\nThe phrase records the bloody aftermath in a concrete place."],
    ["The Dogs Licked Up His Blood", "This means dogs licked the blood from Ahab's chariot after his death. The grim detail shows Elijah's judgment word being fulfilled exactly.\n\n🐕 Dogs lick the blood\n\n⚖️ God's judgment is fulfilled\n\n😨 The end is shameful\n\nThe phrase makes the prophecy's fulfillment vivid and unsettling."],
  ],
  "1 Kings 22:43-48": [
    ["He Walked in All the Ways of Asa His Father", "Walked in the ways means followed the pattern of life and rule. Jehoshaphat generally ruled like Asa, his father, in faithfulness.\n\n🚶 A life pattern is meant\n\n👑 Jehoshaphat follows Asa's example\n\n✅ His rule is mostly faithful\n\nThe phrase compares his reign to his father's path."],
    ["He Turned Not Aside from It", "Turned not aside means he did not depart from that good path. The phrase praises steadiness rather than perfection.\n\n➡️ He did not veer away\n\n✅ The course stayed largely faithful\n\n👑 Consistency marks his rule\n\nThe phrase commends Jehoshaphat's persistence in a right direction."],
    ["Jehoshaphat Made Peace with the King of Israel", "This means Jehoshaphat entered peaceful relations with the northern king. It is a political alliance or peace between the two kingdoms.\n\n🤝 Peace is made\n\n👑 Judah and Israel are linked politically\n\n⚠️ The relationship carries risk\n\nThe phrase names the peaceful tie between the two kings."],
    ["He Walked in All the Ways of Asa His", "This shortened repeated wording again points to Jehoshaphat following Asa's pattern. The emphasis stays on inherited example in his kingship.\n\n🚶 He follows an earlier pattern\n\n👨 Asa remains the comparison\n\n✅ The repetition reinforces the evaluation\n\nThe phrase repeats the main judgment on his conduct."],
  ],
  "1 Kings 22:49-53": [
    ["Then Said Ahaziah the Son of Ahab unto Jehoshaphat", "This introduces Ahaziah speaking to Jehoshaphat after Jehoshaphat's ships are prepared. The younger king is proposing cooperation.\n\n🗣️ Ahaziah makes a proposal\n\n👑 He speaks to Jehoshaphat\n\n🤝 Another alliance is suggested\n\nThe phrase opens Ahaziah's request."],
    ["Let My Servants Go with Thy Servants in the Ships", "Ahaziah wants his men to join Jehoshaphat's men on the trading ships. The request is for partnership in the voyage.\n\n🚢 Ships are involved\n\n👥 Servants means workers or men\n\n🤝 Ahaziah wants shared participation\n\nThe phrase asks for a joint venture at sea."],
    ["Jehoshaphat Slept with His Fathers", "Slept with his fathers is an old way of saying Jehoshaphat died, like the earlier kings before him. It speaks of death in continuity with his ancestors.\n\n💀 The king dies\n\n👴 He joins his forefathers in death\n\n👑 His reign comes to an end\n\nThe phrase is a customary Bible way of reporting a king's death."],
    ["Was Buried with His Fathers in the City of David His Father", "This means Jehoshaphat was buried in Jerusalem, the city of David, in the burial place of his royal line. It places him with his dynasty.\n\n⚰️ He is buried with his line\n\n🏙️ The city of David is Jerusalem\n\n👑 Royal continuity is preserved\n\nThe phrase records his burial among Judah's kings."],
  ],
};

function rewriteDay87FirstKingsSection(section: KingdomDeclinePhraseSectionInput): KingdomDeclinePhraseSectionInput {
  const overrides = DAY_87_FIRST_KINGS_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const DAY_87_SECOND_KINGS_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "2 Kings 1:1-6": [
    ["Then Moab Rebelled Against Israel After the Death of Ahab", "Rebelled means Moab broke away from Israel's control after Ahab died. His death weakened Israel's hold over subject nations.\n\n⚔️ Moab breaks away\n\n💀 Ahab's death changes politics\n\n👑 Israel's power is shaken\n\nThe phrase shows rebellion rising after the king's death."],
    ["Against Israel After the Death", "This shortened wording points to timing and consequence. The move against Israel happens after Ahab's death, when the kingdom is more vulnerable.\n\n📅 It happens after the king dies\n\n⚠️ Weakness invites opposition\n\n⚔️ Israel faces outside pressure\n\nThe phrase links the rebellion to the moment after Ahab's death."],
    ["The Death of Ahab", "This simply refers to Ahab's death, which becomes a turning point in the story. His reign has ended, and the next troubles follow after it.\n\n💀 Ahab has died\n\n📖 A new chapter begins\n\n⚠️ Consequences follow his death\n\nThe phrase marks the end of one reign and the start of instability."],
    ["Ahaziah Fell Down Through a Lattice in His Upper Chamber That Was in Samaria", "A lattice is a patterned opening or screen, and upper chamber means an upstairs room. Ahaziah falls through it in Samaria and is badly injured.\n\n🏠 The accident happens in an upper room\n\n🪟 A lattice opening gives way\n\n🤕 Ahaziah is injured by the fall\n\nThe phrase describes the king's sudden household accident."],
  ],
  "2 Kings 1:7-12": [
    ["He Said unto Them", "This means Ahaziah speaks to the messengers after they return. The phrase introduces his questions about the man they met.\n\n🗣️ Ahaziah speaks\n\n👂 He wants an explanation\n\n📜 The investigation begins\n\nThe phrase turns the scene to the king's questioning."],
    ["What Manner of Man Was He Which Came Up to Meet You", "What manner of man means what kind of man or what sort of person. Ahaziah wants to know who confronted his messengers.\n\n❓ He asks what sort of man it was\n\n👀 The stranger made a strong impression\n\n📜 Identity now matters\n\nThe phrase is a question about the prophet's appearance and character."],
    ["They Answered Him", "This simply introduces the messengers' reply to Ahaziah. The next words describe Elijah's appearance.\n\n🗣️ The messengers respond\n\n👂 Ahaziah receives the report\n\n📖 Their description follows\n\nThe phrase moves the scene into their answer."],
    ["He Was an Hairy Man", "This means Elijah was recognized by his rough, hairy appearance or garment. The unusual look helps identify him immediately.\n\n👤 Elijah has a striking appearance\n\n🧥 His rough look is memorable\n\n📜 The description reveals who he is\n\nThe phrase gives the identifying mark of the prophet."],
  ],
  "2 Kings 1:13-18": [
    ["He Sent Again a Captain of the Third Fifty with His Fifty", "Ahaziah sends a third military officer with another group of fifty men. He keeps pressing the confrontation after the first two groups were destroyed.\n\n🪖 A third captain is sent\n\n5️⃣0️⃣ Another group of fifty goes\n\n⚠️ The king still resists God's warning\n\nThe phrase shows repeated royal persistence."],
    ["The Third Captain of Fifty Went Up", "This means the third officer went up to Elijah like the others, but he approached differently. His manner will show more humility.\n\n⬆️ The third captain goes up\n\n👀 He approaches Elijah directly\n\n🙏 His response will differ from the others\n\nThe phrase begins the third encounter."],
    ["There Came Fire Down from Heaven", "This means fire came from God above, not from human weapons. It shows divine judgment backing Elijah's prophetic word.\n\n🔥 Fire comes from heaven\n\n🙏 God acts openly\n\n⚖️ Judgment is from the LORD\n\nThe phrase shows heaven itself answering the insult against God's prophet."],
    ["Burnt Up the Two Captains of the Former Fifties with Their Fifties", "This means the earlier two captains and their groups of fifty were completely destroyed by that fire. Former fifties means the first two companies.\n\n🔥 Two earlier groups were consumed\n\n5️⃣0️⃣ Each company of fifty perished\n\n⚖️ The judgment was total\n\nThe phrase recalls the severe fate of the first two missions."],
  ],
};

function rewriteDay87SecondKingsSection(section: KingdomDeclinePhraseSectionInput): KingdomDeclinePhraseSectionInput {
  const overrides = DAY_87_SECOND_KINGS_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const DAY_88_SECOND_KINGS_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "2 Kings 2:1-6": [
    ["It Came to Pass", "This is a simple time marker meaning the next event now happened. It opens the final journey before Elijah is taken away.\n\n📅 A new moment begins\n\n🚶 Elijah is on his last journey\n\n📖 The story moves forward\n\nThe phrase starts the final stage of Elijah's ministry."],
    ["When the LORD Would Take Up Elijah into Heaven by a Whirlwind", "This means God Himself will take Elijah up to heaven in a whirlwind. Elijah is not dying in an ordinary way; the LORD is removing His prophet in a dramatic act.\n\n🙏 God is doing the taking\n\n🌪️ A whirlwind is the means\n\n👤 Elijah's earthly ministry is ending\n\nThe phrase prepares the reader for Elijah's unusual departure."],
    ["Elijah Said unto Elisha", "This simply introduces Elijah speaking to Elisha during their final journey together. The words matter because Elijah is testing and teaching his successor.\n\n🗣️ Elijah speaks\n\n👂 Elisha must answer\n\n🤝 Master and disciple are together\n\nThe phrase opens their crucial conversation."],
    ["I Pray Thee", "I pray thee is old polite wording that means please or I ask you. It helps the reader hear Elijah's request with its proper tone.\n\n🙏 A respectful request\n\n💬 It means please\n\n👂 Tone matters here\n\nThe phrase softens the command into a personal appeal."],
  ],
  "2 Kings 2:7-12": [
    ["Fifty Men of the Sons of the Prophets Went", "The sons of the prophets were groups of prophetic disciples, not literal sons only. Fifty of them go to watch what happens to Elijah and Elisha.\n\n👥 A prophetic group is watching\n\n5️⃣0️⃣ Fifty men are present\n\n👀 They become witnesses\n\nThe phrase introduces the observers of this holy moment."],
    ["Stood to View Afar Off", "Afar off means at a distance. They are watching from far enough away to witness the event without standing beside Elijah and Elisha.\n\n👀 They are watching\n\n📍 But from a distance\n\n🙏 The moment is treated as holy\n\nThe phrase shows reverent distance from the scene."],
    ["Elijah Took His Mantle", "A mantle is a cloak. Elijah takes the cloak that has become linked with his prophetic ministry and uses it in the miracle at the Jordan.\n\n🧥 The prophet's cloak is used\n\n💧 It will touch the river\n\n🙏 The cloak symbolizes his ministry\n\nThe phrase brings Elijah's prophetic sign into action."],
    ["Wrapped It Together", "This means Elijah rolled or folded the mantle together before striking the water. He is preparing the cloak for a deliberate act.\n\n🧥 The mantle is prepared\n\n✋ Elijah acts intentionally\n\n💧 The river is about to be struck\n\nThe phrase describes the setup for the Jordan miracle."],
  ],
  "2 Kings 2:13-18": [
    ["He Took Up Also the Mantle of Elijah That Fell from Him", "This means Elisha picked up Elijah's mantle after Elijah was taken away. Taking the cloak shows Elisha stepping into the prophetic role that had belonged to Elijah.\n\n🧥 Elisha takes the mantle\n\n🔁 The ministry is passing on\n\n🙏 God is continuing His work\n\nThe phrase marks the transfer of prophetic calling."],
    ["Stood by the Bank of Jordan", "The bank of Jordan is the edge of the Jordan River. Elisha stops there because he is about to test whether the God of Elijah is now with him too.\n\n💧 He stands at the river's edge\n\n👀 A test of calling is coming\n\n🙏 Elisha waits on God there\n\nThe phrase places Elisha at the same river crossing point."],
    ["He Took the Mantle of Elijah That Fell from Him", "The repeated line again stresses that Elisha is acting with Elijah's mantle in his hand. The cloak is the visible sign of the ministry he has inherited.\n\n🧥 The mantle is now Elisha's sign\n\n👤 Elijah is gone\n\n🙏 Elisha must now act in faith\n\nThe phrase keeps the transfer of ministry in view."],
    ["Smote the Waters", "Smote means struck. Elisha strikes the Jordan with the mantle, expecting God to act as He had for Elijah.\n\n💧 The river is struck\n\n🙏 Elisha acts in faith\n\n👀 He is testing the prophetic inheritance\n\nThe phrase shows Elisha calling on God through the same sign Elijah used."],
  ],
  "2 Kings 2:19-24": [
    ["The Men of the City Said unto Elisha", "This introduces the townsmen speaking to Elisha about their local problem. They come to the prophet because the city's water is bad.\n\n🗣️ The city men speak\n\n🏙️ A community need is raised\n\n🙏 They seek prophetic help\n\nThe phrase opens a request for healing."],
    ["I Pray Thee", "Again this means please or we ask you. The townsmen are speaking respectfully as they bring their need to Elisha.\n\n🙏 A polite request\n\n💬 It means please\n\n👂 Respect marks the appeal\n\nThe phrase helps the reader hear the tone of their request."],
    ["Bring Me a New Cruse", "A cruse is a small container or bowl. Elisha asks for a new one as part of the sign through which God will heal the water.\n\n🏺 A small vessel is requested\n\n✨ It will be used in a sign\n\n🙏 God will be the true healer\n\nThe phrase names the simple object Elisha asks for."],
    ["Put Salt Therein", "Therein means into it. Elisha wants salt put into the new cruse, not because salt itself has magic power, but because God is using an ordinary sign.\n\n🧂 Salt is added\n\n🏺 It goes into the vessel\n\n🙏 God uses simple means\n\nThe phrase explains the sign Elisha prepares."],
  ],
  "2 Kings 2:25": [
    ["He Went from Thence to Mount Carmel", "From thence means from there. Elisha leaves that place and travels to Mount Carmel.\n\n🚶 Elisha moves on\n\n⛰️ Mount Carmel is the destination\n\n📍 The route is being traced\n\nThe phrase records the prophet's next stop."],
    ["From Thence He Returned to Samaria", "This means Elisha later returned from there to Samaria, the capital city of the northern kingdom.\n\n↩️ Elisha comes back\n\n🏙️ Samaria is the city named\n\n📖 The journey continues\n\nThe phrase shows the next leg of Elisha's travel."],
    ["Went from Thence to Mount Carmel, and from", "This shortened wording still traces Elisha's movement from one place to the next. Scripture is keeping the route visible.\n\n🗺️ The route is being followed\n\n🚶 Elisha keeps moving\n\n📍 Places matter in the story\n\nThe phrase keeps the travel sequence clear."],
    ["From Thence to Mount Carmel, and from Thence", "This repeated fragment again emphasizes movement from place to place. The story wants the reader to track where the prophet goes.\n\n📍 One place leads to another\n\n🚶 Elisha is traveling\n\n🧭 The map of the story matters\n\nThe phrase highlights the travel progression."],
  ],
  "2 Kings 3:1-6": [
    ["Now Jehoram the Son of Ahab Began to Reign Over Israel in Samaria the Eighteenth Year of Jehoshaphat King of Judah", "This sentence gives the new king, the capital city, and the date measured against Judah's king. It places Jehoram's reign precisely in Israel's history.\n\n👑 Jehoram becomes king\n\n🏙️ Samaria is his capital\n\n📅 His reign is dated carefully\n\nThe phrase anchors his rule in the larger timeline of the divided kingdoms."],
    ["Reigned Twelve Years", "This means Jehoram ruled for twelve years. Kings often records the length of a reign so the reader can track history and leadership.\n\n1️⃣2️⃣ Twelve years are counted\n\n👑 His reign has a measured span\n\n📖 History is being tracked\n\nThe phrase gives the length of Jehoram's rule."],
    ["He Wrought Evil in the Sight of the LORD", "Wrought evil means practiced what God calls wicked, and in the sight of the LORD means God is the one judging it. The line gives God's verdict on Jehoram's reign.\n\n⚠️ Jehoram does evil\n\n👀 God sees and judges it\n\n⚖️ Heaven gives the standard\n\nThe phrase measures the king by God's eyes, not human success."],
    ["Now Jehoram the Son of Ahab Began to Reign", "This shorter wording still announces the start of Jehoram's kingship. Mentioning that he is Ahab's son also ties him to a troubled family line.\n\n👑 A new reign begins\n\n👨 He is Ahab's son\n\n📖 Family history still matters\n\nThe phrase opens Jehoram's rule with his lineage attached."],
  ],
  "2 Kings 3:7-12": [
    ["He Went and Sent to Jehoshaphat the King of Judah", "Jehoram goes and sends a message to Jehoshaphat asking for military help. The move is diplomatic and strategic.\n\n📨 A message is sent\n\n👑 Judah's king is asked\n\n⚔️ An alliance is being formed\n\nThe phrase begins Jehoram's appeal for support."],
    ["The King of Moab Hath Rebelled Against Me", "Rebelled means Moab has broken away from Jehoram's control and tribute. The statement explains the reason for the campaign.\n\n⚔️ Moab has broken away\n\n👑 Jehoram feels the loss personally\n\n📉 His rule is being challenged\n\nThe phrase names the political problem behind the war."],
    ["He Went and Sent to Jehoshaphat the King", "This repeated wording again shows Jehoram reaching out for help. He cannot handle the campaign as an isolated king.\n\n📨 He seeks assistance\n\n👑 Another king is involved\n\n🤝 Partnership is needed\n\nThe phrase keeps the alliance-building in view."],
    ["The Way Through the Wilderness of Edom", "This means the kings choose a route through the desert region of Edom. Way here means route or path, not a moral way.\n\n🛣️ A route is chosen\n\n🏜️ It goes through Edom's wilderness\n\n⚔️ Strategy shapes the march\n\nThe phrase explains how the armies plan to travel."],
  ],
  "2 Kings 3:13-18": [
    ["Elisha Said unto the King of Israel", "This introduces Elisha speaking directly to Jehoram. The prophet is not intimidated by the king's position.\n\n🗣️ Elisha speaks to the king\n\n👑 Royal rank does not silence him\n\n🙏 Prophetic authority stands above court power\n\nThe phrase opens a sharp encounter."],
    ["What Have I to Do with Thee", "This is a strong expression meaning, 'Why are you coming to me?' Elisha is distancing himself from Jehoram's idolatrous house.\n\n❓ A sharp question is asked\n\n🚫 Elisha refuses easy closeness\n\n⚠️ Spiritual distance is exposed\n\nThe phrase shows the prophet rebuking the king's approach."],
    ["As the LORD of Hosts Liveth", "This is an oath meaning 'as surely as the LORD of armies lives.' Elisha is swearing by the living God, not by human power.\n\n🙏 An oath is made before the living God\n\n⚔️ The LORD of hosts is sovereign\n\n🗣️ Elisha speaks under divine seriousness\n\nThe phrase gives weight to what Elisha says next."],
    ["Before Whom I Stand", "This means Elisha serves in God's presence and answers to Him first. His true standing is before the LORD, not before kings.\n\n🙏 Elisha serves God first\n\n👑 Earthly kings are secondary\n\n⚖️ His authority comes from God's presence\n\nThe phrase explains why Elisha can speak boldly."],
  ],
  "2 Kings 3:19-24": [
    ["Ye Shall Smite Every Fenced City", "A fenced city is a fortified city with defenses or walls. Elisha is saying the victory will be strong enough to overcome even protected places.\n\n🏙️ Fortified cities are meant\n\n⚔️ Their defenses will fail\n\n📜 The prophecy promises deep victory\n\nThe phrase shows how complete the campaign will be."],
    ["Every Choice City", "Choice city means an important, valuable, or best city. The judgment will not touch only weak places but the prized ones too.\n\n🏙️ Valuable cities are included\n\n⭐ The best places are not spared\n\n⚠️ The ruin reaches what seems strong\n\nThe phrase widens the scope of the coming defeat."],
    ["It Came to Pass in the Morning", "This time marker means the next event happened in the morning. It places the miracle at a specific hour.\n\n🌅 Morning arrives\n\n📅 The timing is marked\n\n📖 The next event begins then\n\nThe phrase places the answer at daybreak."],
    ["When the Meat Offering Was Offered", "The meat offering was a grain offering brought in worship, not meat in the modern sense. The timing connects God's help with the hour of temple offering.\n\n🕍 Worship time is in view\n\n🌾 A grain offering is meant\n\n💧 Help comes at that hour\n\nThe phrase links deliverance with the rhythm of worship."],
  ],
  "2 Kings 3:25-27": [
    ["They Beat Down the Cities", "Beat down means they destroyed or pulled the cities down. The campaign is not just defeating soldiers but wrecking strongholds.\n\n🏙️ Cities are torn down\n\n⚔️ The victory damages infrastructure\n\n📉 The land is being broken\n\nThe phrase describes destructive military success."],
    ["On Every Good Piece of Land Cast Every Man His Stone", "This means the soldiers threw stones onto the good farmland to ruin it. They are damaging the land's future usefulness, not just fighting an army.\n\n🌿 Good land is targeted\n\n🪨 Stones are thrown across it\n\n⚠️ The war destroys future harvests\n\nThe phrase shows war reaching fields and food supply."],
    ["When the King of Moab Saw That the Battle Was Too Sore for Him", "Too sore means too hard or too severe. The Moabite king realizes the battle has become more than he can overcome.\n\n👑 The king sees he is losing\n\n⚔️ The battle is too severe\n\n😟 Desperation rises\n\nThe phrase marks the enemy king's crisis point."],
    ["He Took with Him Seven Hundred Men That Drew Swords", "Drew swords means armed fighting men. The king gathers seven hundred soldiers for a last desperate attempt to break through.\n\n7️⃣0️⃣0️⃣ Seven hundred men go with him\n\n⚔️ They are armed swordsmen\n\n🚪 It is a desperate breakout attempt\n\nThe phrase shows the king's final military effort."],
  ],
  "2 Kings 4:1-6": [
    ["Now There Cried a Certain Woman of the Wives of the Sons of the Prophets unto Elisha", "This is a widow from a prophetic household crying out to Elisha for help. Cried here means appealed urgently, not merely spoke.\n\n😢 A desperate widow appeals\n\n🏠 She comes from a prophetic family\n\n🙏 Elisha is asked for mercy\n\nThe phrase opens a personal crisis brought to God's prophet."],
    ["Thy Servant My Husband Is Dead", "She means her husband, who served faithfully, has died. The line explains why the household is now vulnerable and in debt.\n\n💀 Her husband is gone\n\n🏠 The home has lost its provider\n\n⚠️ Death has led to financial danger\n\nThe phrase states the grief behind the crisis."],
    ["Elisha Said unto Her", "This simply introduces Elisha's response to the widow. The prophet now moves from hearing grief to helping it.\n\n🗣️ Elisha answers her\n\n👂 He has heard the need\n\n🙏 Mercy is about to take shape\n\nThe phrase opens the prophet's practical response."],
    ["What Shall I Do for Thee", "Elisha asks what help is needed. The question shows careful attention to her exact burden rather than a rushed assumption.\n\n❓ He asks what she needs\n\n🏠 The need is personal and specific\n\n🙏 Care starts by listening\n\nThe phrase shows mercy becoming attentive."],
  ],
  "2 Kings 4:7-12": [
    ["Then She Came and Told the Man of God", "This means the widow returned and reported back to Elisha after the oil miracle. The phrase moves the story from miracle to instruction.\n\n🚶 She comes back to Elisha\n\n🗣️ She reports what happened\n\n📖 The next step follows the miracle\n\nThe phrase transitions from provision to guidance."],
    ["Sell the Oil", "Elisha tells her to sell the oil, turning the miracle into money for survival. The point is practical provision, not wonder alone.\n\n🫒 The oil becomes income\n\n💰 Debt can now be paid\n\n🏠 The family can live on what remains\n\nThe phrase shows miracle becoming daily provision."],
    ["It Fell on a Day", "This old phrase means one day it happened. It opens a new scene involving Elisha and the woman of Shunem.\n\n📅 One day a new event begins\n\n📖 The story shifts scenes\n\n👤 New people come into focus\n\nThe phrase starts the Shunammite episode."],
    ["That Elisha Passed to Shunem", "Passed to Shunem means Elisha traveled to the town of Shunem. The phrase gives the setting where the next relationship begins.\n\n🚶 Elisha travels there\n\n🏘️ Shunem is the place named\n\n📍 The new story gets its setting\n\nThe phrase places Elisha in the town of Shunem."],
  ],
  "2 Kings 4:13-18": [
    ["He Said unto Him", "This introduces Elisha speaking to Gehazi, his servant. Elisha is directing the conversation through his assistant.\n\n🗣️ Elisha speaks to Gehazi\n\n👂 The servant must carry words\n\n📖 The scene becomes indirect speech\n\nThe phrase opens Elisha's instruction to his helper."],
    ["Say Now unto Her", "Elisha is telling Gehazi to speak to the woman on his behalf. Say now means speak to her at this time.\n\n🗣️ Gehazi must speak for Elisha\n\n👩 The woman is being addressed\n\n⏰ The moment for the question has come\n\nThe phrase sends Elisha's words through his servant."],
    ["What Then Is to Be Done for Her", "Elisha is asking what kindness can be done for the woman in return for her care. The question searches for a fitting blessing.\n\n❓ A reward is being considered\n\n🤝 Her kindness is remembered\n\n🙏 Gratitude seeks a real response\n\nThe phrase shows Elisha looking for a way to bless her."],
    ["Verily She Hath No Child", "Verily means truly or indeed. Gehazi is explaining that the woman has no son, which is a deep personal lack in her home.\n\n👶 She has no child\n\n💬 Verily means truly\n\n🏠 Her home carries an unspoken sorrow\n\nThe phrase identifies the hidden need behind her generous life."],
  ],
  "2 Kings 4:19-24": [
    ["He Said unto His Father", "This refers to the child speaking to his father when he becomes sick in the field. It is the beginning of the household crisis.\n\n👦 The child speaks first\n\n👨 His father hears him\n\n⚠️ Trouble begins in ordinary work\n\nThe phrase opens the moment the illness is noticed."],
    ["He Said to a Lad", "A lad here means a young servant or helper. The father tells him to carry the boy back to his mother.\n\n👦 A young helper is addressed\n\n🤲 He must carry the child\n\n🏠 The scene moves back home\n\nThe phrase introduces the servant's role in the emergency."],
    ["When He Had Taken Him", "This means after the servant had picked the child up and brought him. The wording moves the story into the next stage of the crisis.\n\n🤲 The child has been carried\n\n🏠 He is now back with his mother\n\n📖 The scene advances at home\n\nThe phrase marks the transition after the child is moved."],
    ["Brought Him to His Mother", "The sick boy is carried back to his mother, where he later dies in her lap. The phrase brings the crisis into the center of the home.\n\n👩 The mother receives him\n\n🏠 The suffering moves indoors\n\n💔 The personal loss deepens\n\nThe phrase places the child back in his mother's care."],
  ],
  "2 Kings 4:25-30": [
    ["So She Went and Came unto the Man of God to Mount Carmel", "The woman travels to Mount Carmel to find Elisha, the man of God. She is moving urgently toward the only help she believes can answer this loss.\n\n🚶 She goes to Elisha\n\n⛰️ Mount Carmel is the destination\n\n🙏 She seeks prophetic help\n\nThe phrase shows determined movement toward God's servant."],
    ["It Came to Pass", "This marker means the next event happened as she approached. The story is shifting from her journey to Elisha noticing her.\n\n📅 Another moment begins\n\n👀 Attention turns to her arrival\n\n📖 The scene moves forward\n\nThe phrase opens the encounter at Carmel."],
    ["I Pray Thee", "Again this means please. Elisha uses respectful request language as he sends Gehazi to ask about her condition.\n\n🙏 A polite request is made\n\n💬 It means please\n\n👂 Concern is being expressed\n\nThe phrase helps the reader hear the tone of the inquiry."],
    ["So She Went and Came unto the Man", "This repeated wording stresses that she truly reached Elisha in person. Her grief drives her all the way to the prophet.\n\n🚶 She completes the journey\n\n👤 She reaches the man of God\n\n💔 Her urgency is real\n\nThe phrase keeps her determined pursuit in view."],
  ],
  "2 Kings 4:31-36": [
    ["Gehazi Passed on Before Them", "Gehazi goes ahead of Elisha and the woman as a messenger sent first. Passed on before them means he arrived earlier.\n\n🏃 Gehazi goes ahead\n\n📖 He arrives before the others\n\n🙏 Elisha's instruction is being tested\n\nThe phrase explains why Gehazi reaches the house first."],
    ["Laid the Staff Upon the Face of the Child", "Gehazi places Elisha's staff on the child's face as instructed. The staff is a prophetic sign, but by itself it does not restore life.\n\n🪄 The staff is applied\n\n👦 The child is still the focus\n\n⚠️ The sign alone gives no life\n\nThe phrase describes the first attempt at intervention."],
    ["When Elisha Was Come into the House", "This means Elisha himself finally arrived at the house. The scene now shifts from Gehazi's failed attempt to Elisha's personal involvement.\n\n🚪 Elisha enters the house\n\n👀 The prophet now sees the child himself\n\n📖 The decisive moment begins\n\nThe phrase marks Elisha's arrival at the bedside."],
    ["The Child Was Dead", "This states the situation plainly: the child had died. The miracle that follows will answer real death, not a minor illness.\n\n💀 The child is truly dead\n\n🏠 The house is a place of mourning\n\n🙏 Only God can reverse this\n\nThe phrase makes the need as serious as possible."],
  ],
  "2 Kings 4:37-42": [
    ["Then She Went in", "After her son is restored, the woman goes in to Elisha. The movement expresses gratitude and reverence.\n\n🚶 She enters\n\n🙏 The miracle has changed everything\n\n💗 Her response follows restoration\n\nThe phrase begins her thankful approach."],
    ["Fell at His Feet", "This means she bowed low before Elisha in deep gratitude and honor. It is a posture of thanks, not worship of Elisha as God.\n\n🙇 She bows low\n\n🙏 Gratitude is overflowing\n\n🤝 Honor is shown to God's servant\n\nThe phrase expresses humble thankfulness."],
    ["Elisha Came Again to Gilgal", "Again means Elisha returned there another time. Gilgal becomes the setting for the next act of provision.\n\n↩️ Elisha returns\n\n🏘️ Gilgal is the place\n\n📖 A new episode begins there\n\nThe phrase resets the story in a familiar location."],
    ["There Was a Dearth in the Land", "Dearth means famine or serious shortage of food. The land is suffering scarcity.\n\n🌾 Food is scarce\n\n⚠️ The land is under famine pressure\n\n🏠 Daily survival is harder\n\nThe phrase names the hunger behind the next miracle."],
  ],
  "2 Kings 4:43-44": [
    ["His Servitor Said", "Servitor means servant or attendant. This line introduces the helper's practical question about feeding so many people.\n\n👤 A servant speaks\n\n❓ He raises a practical concern\n\n📖 The scene turns to the problem of enough food\n\nThe phrase opens the servant's objection."],
    ["Should I Set This Before an Hundred Men", "This means the servant wonders how such a small amount can feed one hundred men. The question is about insufficiency.\n\n🍞 The food looks too small\n\n1️⃣0️⃣0️⃣ A hundred men need to eat\n\n❓ The servant doubts it is enough\n\nThe phrase voices the human calculation of lack."],
    ["So He Set It Before Them", "This means the food was placed in front of the men exactly as Elisha instructed. Obedience happens before the abundance is seen.\n\n🍽️ The food is served\n\n✅ Elisha's word is obeyed\n\n🙏 Action comes before visible provision\n\nThe phrase shows faith acting on the prophet's instruction."],
    ["They Did Eat", "This simply means the men really ate the food set before them. The miracle moved from promise to actual provision.\n\n🍽️ The men are fed\n\n🙏 God's word proves true\n\n📖 Provision becomes visible\n\nThe phrase confirms the reality of the miracle."],
  ],
  "2 Kings 5:1-6": [
    ["Captain of the Host of the King of Syria", "Host here means army. Naaman is the commanding officer of Syria's military forces.\n\n🪖 He leads the Syrian army\n\n👑 He serves the king closely\n\n⚔️ He is a man of power\n\nThe phrase identifies Naaman's high military position."],
    ["Was a Great Man with His Master", "This means Naaman was highly respected by the king he served. Great here means important and honored, not morally perfect.\n\n👑 He holds high favor\n\n⭐ He is important in court\n\n📖 Honor does not remove his need\n\nThe phrase describes Naaman's prestige."],
    ["The Syrians Had Gone Out by Companies", "By companies means in raiding groups or bands. Syrian troops had been making organized raids.\n\n⚔️ Raiding parties went out\n\n👥 They moved in organized groups\n\n📖 The girl's captivity came through war\n\nThe phrase explains how the little maid was taken."],
    ["Had Brought Away Captive Out of the Land of Israel a Little Maid", "This means a young Israelite girl had been captured and carried away from her homeland. She is small, displaced, and now serving in Naaman's house.\n\n👧 A young girl is taken captive\n\n🏠 She is far from home\n\n📖 God will use a very small person in a great story\n\nThe phrase introduces the captive servant girl."],
  ],
  "2 Kings 5:7-12": [
    ["It Came to Pass", "This time marker opens the king of Israel's reaction to Naaman's letter. The story is moving into the tension caused by the request.\n\n📅 A new response begins\n\n👑 The king now reacts\n\n📖 The pressure rises\n\nThe phrase turns the story toward the letter's effect."],
    ["When the King of Israel Had Read the Letter", "This means the king personally read Naaman's request. The message puts him under pressure because he cannot heal leprosy.\n\n📜 The letter is read\n\n👑 The king receives the request directly\n\n⚠️ He feels trapped by it\n\nThe phrase opens the king's anxious reaction."],
    ["It Was So", "This means events happened exactly in that way after Elisha heard the news. The phrase confirms the transition from the king's panic to Elisha's intervention.\n\n📖 The event is confirmed\n\n➡️ The story shifts onward\n\n🙏 Elisha now steps in\n\nThe phrase links one response to the next."],
    ["When Elisha the Man of God Had Heard That the King of Israel Had Rent His Clothes", "Rent his clothes means tore them as a sign of distress. Elisha hears that the king has reacted in panic and grief.\n\n👕 Torn clothes show distress\n\n👑 The king is overwhelmed\n\n🙏 Elisha hears and responds\n\nThe phrase explains what news reaches Elisha."],
  ],
  "2 Kings 5:13-18": [
    ["His Servants Came Near", "Naaman's servants approach him respectfully after he becomes angry. They are trying to calm him and bring him back to obedience.\n\n👥 His servants draw near\n\n🗣️ They will reason with him\n\n🙏 Help comes through humble voices\n\nThe phrase opens the servants' wise appeal."],
    ["Spake unto Him", "This simply introduces the servants speaking to Naaman. Their words will challenge his pride.\n\n🗣️ They speak directly\n\n👂 Naaman must listen\n\n📖 The turning point comes through speech\n\nThe phrase begins their counsel."],
    ["Then Went He Down", "This means Naaman finally went down to the Jordan in obedience. The movement shows his pride bending to the prophet's word.\n\n⬇️ Naaman goes down\n\n✅ He finally obeys\n\n🙏 Humility begins to replace pride\n\nThe phrase marks the moment obedience starts."],
    ["Dipped Himself Seven Times in Jordan", "Naaman immersed himself in the Jordan River seven times exactly as instructed. Seven times shows complete obedience to the command given.\n\n💧 He enters the Jordan\n\n7️⃣ He dips seven times\n\n✅ The command is followed fully\n\nThe phrase describes obedient washing in the river."],
  ],
  "2 Kings 5:19-24": [
    ["He Said unto Him", "This introduces Elisha speaking to Naaman after the healing. The prophet's words now send Naaman away in peace.\n\n🗣️ Elisha speaks\n\n🙏 The healing scene is closing\n\n📖 A blessing is about to be given\n\nThe phrase opens Elisha's final words to Naaman."],
    ["Go in Peace", "This means Naaman may leave in peace and wholeness. Elisha is dismissing him without hostility after his healing and confession.\n\n🕊️ He is sent away peacefully\n\n🙏 The encounter ends with blessing\n\n✅ There is no quarrel between them\n\nThe phrase releases Naaman with peace."],
    ["The Servant of Elisha the Man of God", "This identifies Gehazi by his relationship to Elisha. He is close to the prophet, which makes his coming sin more serious.\n\n👤 Gehazi is Elisha's servant\n\n🙏 He serves a man of God\n\n⚠️ His position increases his responsibility\n\nThe phrase identifies Gehazi before his wrongdoing unfolds."],
    ["My Master Hath Spared Naaman This Syrian", "Gehazi means Elisha let Naaman go without taking gifts. Spared here means refrained from pressing him for payment.\n\n💰 A gift was not taken\n\n👤 Gehazi resents that restraint\n\n⚠️ Greed begins speaking in him\n\nThe phrase reveals Gehazi's selfish complaint."],
  ],
  "2 Kings 5:25-27": [
    ["He Went in", "This means Gehazi went back inside to stand before Elisha after hiding the gifts. The moment brings his secret act into judgment.\n\n🚪 Gehazi comes in\n\n👀 He must face Elisha now\n\n⚠️ Hidden greed is about to be exposed\n\nThe phrase begins the confrontation."],
    ["Stood Before His Master", "Gehazi stands in Elisha's presence as a servant answering to his master. He is now accountable face to face.\n\n👤 Gehazi stands there\n\n👀 Elisha is before him\n\n⚖️ Accountability has arrived\n\nThe phrase places him under direct examination."],
    ["He Said unto Him", "This introduces Elisha's question to Gehazi. The prophet now speaks into the lie and greed that followed Naaman.\n\n🗣️ Elisha speaks next\n\n❓ A probing question is coming\n\n⚖️ Judgment begins with words\n\nThe phrase opens Elisha's confrontation."],
    ["Went Not Mine Heart with Thee", "Elisha means, 'Was I not with you in spirit and awareness?' Heart here speaks of inward knowing, not physical travel.\n\n💗 Heart means inner awareness here\n\n👀 Elisha knew what happened\n\n⚠️ Gehazi's secret was not hidden\n\nThe phrase shows the prophet's God-given awareness of Gehazi's actions."],
  ],
};

function rewriteDay88SecondKingsSection(section: KingdomDeclinePhraseSectionInput): KingdomDeclinePhraseSectionInput {
  const overrides = DAY_88_SECOND_KINGS_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const DAY_90_SECOND_KINGS_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "2 Kings 10:1-6": [
    ["Ahab Had Seventy Sons in Samaria", "This means Ahab's large royal family was living in Samaria, the capital city. Sons here can include royal descendants under the house of Ahab.\n\n👑 Ahab's dynasty is still large\n\n🏙️ Samaria is the setting\n\n⚠️ Jehu's judgment will reach the royal house\n\nThe phrase shows how much of Ahab's line still remained."],
    ["Jehu Wrote Letters", "Jehu sends written messages to the rulers in Samaria. The letters are meant to force a decision about loyalty and survival.\n\n✍️ Jehu writes officially\n\n📨 The city leaders must respond\n\n⚖️ A test of allegiance is coming\n\nThe phrase opens Jehu's political pressure campaign."],
    ["Now as Soon as This Letter Cometh to You", "Cometh means comes. Jehu wants the rulers to act immediately once the letter arrives.\n\n📨 The message arrives\n\n⏰ Action must be quick\n\n⚠️ Delay is not being allowed\n\nThe phrase presses the urgency of Jehu's command."],
    ["Seeing Your Master’s Sons Are with You", "Your master's sons means the royal sons under their care. Jehu is reminding them that they currently hold the heirs of Ahab's house.\n\n👑 The heirs are in their hands\n\n🏠 They are responsible for them\n\n⚖️ Their next move will reveal their loyalty\n\nThe phrase points to the royal children as the center of the crisis."],
  ],
  "2 Kings 10:7-12": [
    ["It Came to Pass", "This is a simple marker meaning the next event now happened. It moves the story from Jehu's letter to the rulers' response.\n\n📅 The next event begins\n\n📖 The plan starts unfolding\n\n⚠️ The judgment moves forward\n\nThe phrase transitions into the result of Jehu's demand."],
    ["When the Letter Came to Them", "This means the rulers and guardians received Jehu's message. Their violent response begins only after reading his instructions.\n\n📨 The letter is received\n\n👥 The leaders now must choose\n\n⚖️ The message triggers action\n\nThe phrase connects the bloodshed directly to the letter."],
    ["There Came a Messenger", "A messenger arrives to report back to Jehu. The phrase introduces the news that his command has been carried out.\n\n🏃 A report is delivered\n\n👂 Jehu is informed\n\n📜 The results are now known\n\nThe phrase opens the message back to Jehu."],
    ["They Have Brought the Heads of the King’s Sons", "This means the severed heads of Ahab's sons have been brought as proof they were killed. The phrase makes the brutality of Jehu's purge unmistakable.\n\n💀 The princes have been killed\n\n📦 Their heads are proof of it\n\n⚠️ Judgment is violent and public\n\nThe phrase states the grim evidence of the massacre."],
  ],
  "2 Kings 10:13-18": [
    ["Jehu Met with the Brethren of Ahaziah King of Judah", "Brethren here means relatives or royal kinsmen of Ahaziah, not only brothers. Jehu encounters men connected to Judah's royal house.\n\n👥 Ahaziah's relatives are meant\n\n👑 They belong to Judah's royal circle\n\n⚠️ Jehu's purge spreads beyond Israel\n\nThe phrase shows Judah's house getting caught in Jehu's violence."],
    ["Jehu Met with the Brethren of Ahaziah King", "This repeated wording keeps the focus on Jehu's encounter with Ahaziah's kin. The meeting is not peaceful; it becomes deadly.\n\n🤝 The meeting happens on the road\n\n👑 Royal relatives are involved\n\n⚠️ Jehu will treat them as targets\n\nThe phrase marks the fateful encounter."],
    ["Take Them Alive", "Jehu commands his men to seize the relatives alive first. Alive here means captured rather than killed immediately.\n\n✋ They are to be captured\n\n🚶 The prisoners are taken in hand\n\n⚠️ Death will still follow\n\nThe phrase gives the order for arrest before execution."],
    ["They Took Them Alive", "This means Jehu's men obeyed and captured them. The prisoners do not escape the order.\n\n✅ Jehu's command is obeyed\n\n👥 The men are seized\n\n⚠️ Their fate is now in Jehu's hands\n\nThe phrase records the successful capture."],
  ],
  "2 Kings 10:19-24": [
    ["Now Therefore Call unto Me All the Prophets of Baal", "Jehu is summoning every prophet of Baal to one gathering. The invitation sounds religious, but it is actually a trap.\n\n📣 All Baal's prophets are called\n\n🛐 The meeting looks devotional\n\n⚠️ Jehu is deceiving them\n\nThe phrase opens the assembly that will become a massacre."],
    ["All His Servants", "This means all the servants or worship leaders who belong to Baal's system. Jehu wants no important follower left out.\n\n👥 Baal's attendants are included\n\n🛐 The whole worship circle is gathered\n\n⚠️ No core supporter is to remain absent\n\nThe phrase broadens the summons beyond prophets alone."],
    ["Proclaim a Solemn Assembly for Baal", "A solemn assembly is an official religious gathering. Jehu orders a formal worship meeting for Baal, though his purpose is false.\n\n🛐 A formal worship meeting is announced\n\n📣 It is proclaimed publicly\n\n⚠️ The holy-sounding event is a trap\n\nThe phrase gives the gathering an official religious shape."],
    ["They Proclaimed It", "This means the assembly was publicly announced just as Jehu ordered. The false event is now in motion.\n\n📣 The announcement goes out\n\n🛐 Baal's followers are summoned\n\n✅ Jehu's deception advances\n\nThe phrase records the proclamation being carried out."],
  ],
  "2 Kings 10:25-30": [
    ["It Came to Pass", "This simple marker moves the story into the moment when Jehu acts. The worship gathering now turns into slaughter.\n\n📅 The decisive moment arrives\n\n📖 The story shifts from setup to action\n\n⚠️ Violence is about to begin\n\nThe phrase opens the execution of Jehu's plan."],
    ["As Soon as He Had Made an End of Offering the Burnt Offering", "This means the offering had just been finished when Jehu gave the signal. He waits until the ritual is complete before ordering the attack.\n\n🔥 The sacrifice has ended\n\n⏱️ Jehu acts immediately after\n\n⚠️ The timing is deliberate\n\nThe phrase shows the exact moment the trap is sprung."],
    ["They Brought Forth the Images Out of the House of Baal", "The images are the idol objects used in Baal worship. Bringing them out is part of destroying the cult completely.\n\n🛐 Idol objects are removed\n\n🏛️ They come out of Baal's temple\n\n🔥 The false worship system is being dismantled\n\nThe phrase describes the idols being exposed for destruction."],
    ["They Brake Down the Image of Baal", "Brake means broke. The idol image of Baal is smashed instead of honored.\n\n🪓 The idol is broken\n\n🛐 Baal's image is destroyed\n\n⚖️ False worship is being attacked physically\n\nThe phrase records the demolition of the idol."],
  ],
  "2 Kings 10:31-36": [
    ["Jehu Took No Heed to Walk in the Law", "Took no heed means paid no careful attention. Jehu destroyed Baal worship but did not give himself fully to obeying God's law.\n\n👂 He did not listen carefully to God's law\n\n👑 Partial reform was not full obedience\n\n⚠️ Zeal in one area did not make him faithful overall\n\nThe phrase gives God's criticism of Jehu's heart."],
    ["For He Departed Not from the Sins of Jeroboam", "Departed not means did not turn away. Jehu kept the sinful worship pattern that Jeroboam had established in Israel.\n\n🚫 He did not stop the old sin pattern\n\n🛐 Jeroboam's false worship remained\n\n👑 Jehu repeated inherited corruption\n\nThe phrase shows the limit of Jehu's reform."],
    ["In Those Days the LORD Began to Cut Israel Short", "Cut Israel short means God began reducing Israel's strength and territory. The nation starts shrinking under judgment.\n\n✂️ Israel is being reduced\n\n⚖️ The LORD is acting in judgment\n\n📉 National weakening has begun\n\nThe phrase describes God starting to trim down Israel's power."],
    ["Hazael Smote Them in All the Coasts of Israel", "Smote means struck down, and coasts here means borders or regions. Hazael attacked Israel across its territory.\n\n⚔️ Hazael strikes Israel\n\n🗺️ The damage spreads through its regions\n\n📉 Israel suffers on many fronts\n\nThe phrase shows the breadth of the military loss."],
  ],
  "2 Kings 11:1-6": [
    ["When Athaliah the Mother of Ahaziah Saw That Her Son Was Dead", "Athaliah realizes her son Ahaziah has died, and she reacts by trying to secure power for herself. The phrase opens a royal crisis after the king's death.\n\n💀 Ahaziah is dead\n\n👑 Athaliah sees the throne is vulnerable\n\n⚠️ Her response will be ruthless\n\nThe phrase begins the power grab after a king's death."],
    ["She Arose and Destroyed All the Seed Royal", "Seed royal means the royal family line or heirs to the throne. Athaliah tries to wipe out the king's descendants so no rival can replace her.\n\n👑 The royal heirs are targeted\n\n⚔️ Athaliah acts violently\n\n🚫 She wants no rival left alive\n\nThe phrase explains her attempt to erase the royal line."],
    ["The Daughter of King Joram", "This identifies Jehosheba by her royal family connection. Her position inside the royal house allows the rescue to happen.\n\n👑 She belongs to the royal family\n\n🏠 She has access inside the palace crisis\n\n🙏 God uses her position for rescue\n\nThe phrase identifies the woman who can intervene."],
    ["Sister of Ahaziah", "This means she is Ahaziah's sister or close royal relative. The family connection explains how she can protect the child Jehoash.\n\n👨‍👩‍👧 A close royal relation is meant\n\n👶 She is tied to the endangered line\n\n🛡️ That connection enables rescue\n\nThe phrase explains her link to the threatened household."],
  ],
  "2 Kings 11:7-12": [
    ["Two Parts of All You That Go Forth on the Sabbath", "This means certain divisions of the guards on Sabbath duty are assigned special roles. The guards are being organized for a careful protection plan.\n\n🪖 The guards are divided by duty\n\n📅 Sabbath service is the timing\n\n🛡️ Security around the king is being arranged\n\nThe phrase starts the guard instructions for the coronation."],
    ["Even They Shall Keep the Watch of the House of the LORD About the King", "Keep the watch means stand guard. The temple guards must protect the king while he is at the LORD's house.\n\n🛡️ Guard duty is assigned\n\n🏛️ The temple is the protected place\n\n👑 The young king must be surrounded safely\n\nThe phrase explains the protective watch around the king."],
    ["Ye Shall Compass the King Round About", "Compass means surround. The guards are to form a protective ring around the king.\n\n⭕ The king is to be surrounded\n\n🛡️ Protection is close and personal\n\n👑 No attacker should reach him\n\nThe phrase commands a guard circle around the king."],
    ["Every Man with His Weapons in His Hand", "This means the guards must stand armed and ready. The protection is not ceremonial only but prepared for real danger.\n\n🗡️ The guards are armed\n\n✋ Weapons are ready in hand\n\n⚠️ An attack is expected as possible\n\nThe phrase emphasizes active readiness."],
  ],
  "2 Kings 11:13-18": [
    ["When Athaliah Heard the Noise of the Guard and of the People", "Athaliah hears the public sounds of the coronation and realizes something major is happening. The noise draws her into the temple.\n\n👂 Athaliah hears the commotion\n\n👥 Guards and people are involved\n\n⚠️ The hidden plan is becoming public\n\nThe phrase brings Athaliah into the unfolding scene."],
    ["She Came to the People into the Temple of the LORD", "This means Athaliah entered the temple area where the people and guards were gathered. She walks straight into the coronation she tried to prevent.\n\n🚶 Athaliah enters the temple scene\n\n🏛️ The LORD's house is the setting\n\n👥 She comes before the assembled crowd\n\nThe phrase places her inside the public turning point."],
    ["When She Looked", "This means Athaliah saw what was happening in front of her. The phrase introduces her shocked recognition of the new king.\n\n👀 She sees the scene clearly\n\n⚠️ The truth is suddenly visible\n\n👑 Her threat to the throne has failed\n\nThe phrase marks the moment of recognition."],
    ["The King Stood by a Pillar", "The pillar is the traditional royal standing place in the ceremony. The boy king is publicly positioned where a rightful king should stand.\n\n👑 The king stands in the official place\n\n🏛️ The setting confirms legitimacy\n\n📖 The ceremony is public and formal\n\nThe phrase shows the king openly installed."],
  ],
  "2 Kings 11:19-21": [
    ["He Took the Rulers Over Hundreds", "Rulers over hundreds are military officers commanding groups of soldiers. Jehoiada gathers the armed leadership to secure the transition.\n\n🪖 Military officers are involved\n\n👥 Organized force supports the change\n\n🛡️ The new reign is being secured\n\nThe phrase names the commanders backing the king."],
    ["All the People of the Land", "This refers to the broader population, not just palace officials. The phrase shows the coronation becoming a national event.\n\n👥 The common people are included\n\n🏛️ The event is public\n\n👑 The kingdom responds together\n\nThe phrase widens the scene beyond the military leaders."],
    ["The City Was in Quiet", "This means the city became calm after Athaliah was removed. Quiet here means political unrest had settled down.\n\n🏙️ The city calms down\n\n⚔️ The immediate danger is over\n\n✅ Order has been restored\n\nThe phrase describes peace after the upheaval."],
    ["Seven Years Old Was Jehoash When He Began to Reign", "This means Jehoash was only seven years old when he became king. His youth explains why guardians and priests play such a large role around him.\n\n7️⃣ The king is only seven\n\n👑 A child is on the throne\n\n🛡️ Others must guide and protect him\n\nThe phrase highlights the king's young age."],
  ],
  "2 Kings 12:1-6": [
    ["In the Seventh Year of Jehu Jehoash Began to Reign", "This gives the date of Jehoash's accession by comparing it to Jehu's reign. Kings often dates one kingdom by the timeline of the other.\n\n📅 The reign is dated carefully\n\n👑 Jehoash becomes king\n\n📖 The two kingdoms' histories are linked\n\nThe phrase anchors Jehoash in the royal timeline."],
    ["Forty Years Reigned He in Jerusalem", "This means Jehoash ruled for forty years in Jerusalem. The line gives both the length and the city of his reign.\n\n4️⃣0️⃣ Forty years are counted\n\n🏙️ Jerusalem is his royal city\n\n👑 His rule had a long span\n\nThe phrase summarizes the scope of his kingship."],
    ["Jehoash Did That Which Was Right in the Sight of the LORD All His Days Wherein Jehoiada the Priest Instructed Him", "This means Jehoash ruled rightly while Jehoiada was guiding him. His faithfulness is tied closely to the priest's instruction.\n\n✅ Jehoash is evaluated positively\n\n👴 Jehoiada's teaching shaped him\n\n⚠️ The wording hints his faithfulness had support behind it\n\nThe phrase explains why his early reign is judged as right."],
    ["In the Seventh Year of Jehu Jehoash Began", "This shortened wording still announces the start of Jehoash's reign. It keeps the reader fixed on the historical timeline.\n\n📅 A starting year is marked\n\n👑 A reign begins\n\n📖 History is being tracked carefully\n\nThe phrase opens the account of Jehoash's kingship."],
  ],
  "2 Kings 12:7-12": [
    ["Then King Jehoash Called for Jehoiada the Priest", "Jehoash summons Jehoiada to address problems with the temple repairs. The king is calling religious leadership to account.\n\n👑 The king takes initiative\n\n🙏 Jehoiada is summoned\n\n🏛️ The temple repair issue is now confronted\n\nThe phrase opens a corrective conversation."],
    ["The Other Priests", "This means the rest of the priests besides Jehoiada. The group as a whole is being addressed about handling the money.\n\n🙏 More priests are included\n\n👥 Responsibility is shared\n\n🏛️ The issue involves the whole priestly system\n\nThe phrase broadens the accountability."],
    ["The Priests Consented to Receive No More Money of the People", "Consented means agreed. The priests stop taking further money under the old repair system.\n\n✅ The priests agree to change\n\n💰 The old money system ends\n\n🏛️ A new repair process is coming\n\nThe phrase records their agreement to reform."],
    ["Neither to Repair the Breaches of the House", "Breaches of the house means damaged areas of the temple building. The line is about structural repair, not personal spiritual breach.\n\n🏛️ The temple has damaged places\n\n🛠️ Repair work is needed\n\n📖 The issue is physical restoration\n\nThe phrase explains what kind of work was being neglected."],
  ],
  "2 Kings 12:13-18": [
    ["Howbeit There Were Not Made for the House of the LORD Bowls of Silver", "Howbeit means however. The repair money was not used to make silver bowls or temple utensils at this stage.\n\n🏛️ The temple money had a limited purpose\n\n🥣 Silver bowls were not the priority\n\n🛠️ Repair came before ornament\n\nThe phrase explains what the funds were not used for."],
    ["Any Vessels of Gold", "This refers to gold containers or utensils for temple use. The line continues explaining that decorative or service vessels were not made from that money.\n\n🥇 Gold vessels are meant\n\n🏛️ Temple utensils are in view\n\n🚫 The funds were not spent there\n\nThe phrase names another category of items not produced."],
    ["Howbeit There Were Not Made for the House", "This repeated fragment still means some items were not manufactured for the temple from the repair funds. The focus stayed on restoration, not accessories.\n\n🏛️ Some temple items were left aside\n\n🛠️ Repair had priority\n\n📖 The budget was directed carefully\n\nThe phrase reinforces the restricted use of the money."],
    ["Repaired Therewith the House of the LORD", "Therewith means with that money. The funds were used to repair the temple building itself.\n\n💰 The money is used for repairs\n\n🏛️ The LORD's house is restored\n\n🛠️ The focus is structural work\n\nThe phrase states the actual purpose of the collected funds."],
  ],
  "2 Kings 12:19-21": [
    ["The Rest of the Acts of Joash", "This means there were more deeds in Joash's reign than this chapter records. It is a summary line pointing to the fuller royal record.\n\n📖 More of his reign existed in the record\n\n👑 His story is being summarized here\n\n🧾 Not every act is retold\n\nThe phrase signals a closing summary."],
    ["All That He Did", "This refers to the full range of Joash's deeds as king, not a single action. It gathers his reign into one body of acts.\n\n📝 His whole conduct is meant\n\n👑 The king is accountable for all of it\n\n📚 The record includes more than this chapter shows\n\nThe phrase points to the total of his actions."],
    ["His Servants Arose", "Arose here means rose up against him. Joash's own servants begin the plot that will kill him.\n\n⚠️ His servants turn against him\n\n🗡️ Rebellion begins inside his own circle\n\n👑 The threat comes from within\n\nThe phrase opens the betrayal against the king."],
    ["Made a Conspiracy", "A conspiracy is a secret plot by several people. The servants do not act randomly but with planned betrayal.\n\n🤫 A secret plot is formed\n\n👥 More than one man is involved\n\n🗡️ The king is targeted deliberately\n\nThe phrase names the assassination as planned treachery."],
  ],
  "2 Kings 13:1-6": [
    ["In the Three and Twentieth Year of Joash the Son of Ahaziah King of Judah Jehoahaz the Son of Jehu Began to Reign Over Israel in Samaria", "This long line gives the year, the new king, his father, and his capital city. It carefully places Jehoahaz in the timeline of both kingdoms.\n\n📅 The reign is dated\n\n👑 Jehoahaz becomes king\n\n🏙️ Samaria is the capital\n\nThe phrase anchors Jehoahaz historically and politically."],
    ["Reigned Seventeen Years", "This means Jehoahaz ruled for seventeen years. Kings often counts the length of a reign so the reader can track the history.\n\n1️⃣7️⃣ Seventeen years are counted\n\n👑 His rule had a measured span\n\n📖 Time remains important in the record\n\nThe phrase gives the duration of Jehoahaz's reign."],
    ["He Did That Which Was Evil in the Sight of the LORD", "This means God judged Jehoahaz's conduct as evil. The verdict comes from the LORD's sight, not from political appearance.\n\n⚠️ The king's conduct is evil\n\n👀 God is the one judging it\n\n⚖️ Spiritual failure defines the reign\n\nThe phrase gives heaven's evaluation of the king."],
    ["Followed the Sins of Jeroboam the Son of Nebat", "This means Jehoahaz continued Jeroboam's false worship pattern. Followed here means copied or stayed in that path.\n\n🚶 He copies Jeroboam's path\n\n🛐 False worship continues\n\n🔁 Old national sin is repeated\n\nThe phrase shows inherited rebellion continuing."],
  ],
  "2 Kings 13:7-12": [
    ["Neither Did He Leave of the People to Jehoahaz but Fifty Horsemen", "This means the enemy reduced Jehoahaz's forces to a tiny remnant. Only a few mounted troops were left.\n\n🐎 Very little cavalry remains\n\n📉 The army has been crushed\n\n⚠️ Israel's weakness is severe\n\nThe phrase shows how reduced the nation became."],
    ["Ten Thousand Footmen", "Footmen are soldiers who fight on foot. The line continues counting the small number of surviving troops.\n\n🪖 Infantry is being counted\n\n🔢 The numbers are limited\n\n📉 The army is only a remnant\n\nThe phrase adds to the picture of military loss."],
    ["Now the Rest of the Acts of Jehoahaz", "This is another closing summary line, meaning more of Jehoahaz's story existed than what is written here.\n\n📖 More acts were recorded elsewhere\n\n👑 This chapter gives only part of his story\n\n🧾 The reign had a fuller record\n\nThe phrase signals a summary close."],
    ["All That He Did", "This means the total of Jehoahaz's deeds as king. It gathers his reign into one larger record.\n\n📝 His complete actions are meant\n\n👑 The king's whole life is accountable\n\n📚 More than this chapter is implied\n\nThe phrase points to the rest of his recorded conduct."],
  ],
  "2 Kings 13:13-18": [
    ["Joash Slept with His Fathers", "Slept with his fathers is the Bible's royal way of saying Joash died and joined the line of earlier kings in death.\n\n💀 Joash has died\n\n👴 He is joined with earlier forefathers in death\n\n👑 One reign has ended\n\nThe phrase reports the king's death in royal language."],
    ["Jeroboam Sat Upon His Throne", "This means Jeroboam took the throne after Joash. Sat upon his throne means he became the reigning king.\n\n👑 A new king succeeds\n\n🪑 The throne passes on\n\n📖 The dynasty continues\n\nThe phrase marks the succession of kingship."],
    ["Now Elisha Was Fallen Sick of His Sickness Whereof He Died", "This means Elisha was suffering the final illness from which he would die. Even a great prophet comes to the end through bodily weakness.\n\n🤒 Elisha is terminally ill\n\n🙏 His ministry is nearing its close\n\n💀 This sickness will end in death\n\nThe phrase states the prophet's final condition."],
    ["Joash the King of Israel Came Down unto Him", "Joash goes down to visit Elisha in his sickness. The king recognizes the prophet's importance even in his last days.\n\n🚶 The king comes to Elisha\n\n👑 Royal attention is given to the prophet\n\n🙏 Elisha still matters deeply to Israel\n\nThe phrase brings king and prophet together at the end."],
  ],
  "2 Kings 13:19-24": [
    ["The Man of God Was Wroth with Him", "Wroth means angry. Elisha becomes angry because Joash's half-hearted striking shows weak expectation of God's promised victory.\n\n😠 The prophet is angry\n\n⚠️ The king's response was too small\n\n🙏 The issue is weak faith and effort\n\nThe phrase explains Elisha's sharp rebuke."],
    ["Thou Shouldest Have Smitten Five or Six Times", "Elisha means Joash should have struck the ground many more times. The repeated striking would have matched a fuller expectation of victory.\n\n🔁 More blows should have been given\n\n⚔️ Greater victory was available\n\n📉 The king settled for too little\n\nThe phrase explains the missed extent of triumph."],
    ["They Buried Him", "This means Elisha died and was buried. The phrase states plainly that the prophet's earthly life ended.\n\n⚰️ Elisha is buried\n\n💀 His earthly ministry has closed\n\n📖 The story moves into aftermath\n\nThe phrase records the prophet's burial."],
    ["The Bands of the Moabites Invaded the Land at the Coming in of the Year", "Bands means raiding groups, and coming in of the year means the new season when campaigns resumed. Moabite raids entered the land at that time.\n\n⚔️ Raiding parties invade\n\n📅 A new campaign season has begun\n\n🏞️ The land is under pressure again\n\nThe phrase ties the invasion to the yearly cycle of conflict."],
  ],
  "2 Kings 13:25": [
    ["Jehoash the Son of Jehoahaz Took Again Out of the Hand of Ben-hadad the Son of Hazael the Cities", "This means Jehoash recovered cities that Ben-hadad had taken from Israel. Took again means won back or regained.\n\n🏙️ Lost cities are recovered\n\n⚔️ Israel wins them back\n\n👑 Jehoash gains real military success\n\nThe phrase describes territorial recovery from Syria."],
    ["Jehoash the Son of Jehoahaz Took Again Out", "This shorter wording still stresses that Jehoash regained what had been lost. The action is recovery, not first-time conquest.\n\n↩️ What was lost is recovered\n\n👑 Jehoash acts successfully\n\n⚔️ The nation pushes back\n\nThe phrase highlights restoration through battle."],
    ["The Son of Jehoahaz Took Again Out of", "Naming him as the son of Jehoahaz ties this victory to the next generation of Israel's kings. The son wins back what the earlier reign had lost.\n\n👨 A son continues the line\n\n⚔️ The next generation fights back\n\n📖 Family succession stays linked to national struggle\n\nThe phrase connects recovery to royal lineage."],
    ["Son of Jehoahaz Took Again Out of the", "This repeated fragment again emphasizes regained territory under Jehoahaz's son. The point is reversal of earlier loss.\n\n↩️ Earlier losses are reversed\n\n👑 The current king achieves recovery\n\n🏙️ Cities are the issue in view\n\nThe phrase reinforces the theme of regaining what had been taken."],
  ],
};

function rewriteDay90SecondKingsSection(section: KingdomDeclinePhraseSectionInput): KingdomDeclinePhraseSectionInput {
  const overrides = DAY_90_SECOND_KINGS_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const DAY_91_SECOND_KINGS_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "2 Kings 14:1-6": [
    ["In the Second Year of Joash Son of Jehoahaz King of Israel Reigned Amaziah the Son of Joash King of Judah", "This sentence gives the year, the new king, his father, and the kingdom he rules. It places Amaziah's reign beside Israel's timeline so the reader can track both kingdoms together.\n\n📅 The reign is dated\n\n👑 Amaziah becomes king of Judah\n\n📖 Israel and Judah are being tracked side by side\n\nThe phrase anchors Amaziah in the divided-kingdom timeline."],
    ["In the Second Year of Joash Son of Jehoahaz", "This shorter wording still marks the exact year when Amaziah's reign begins. Kings often dates one kingdom by the years of the other.\n\n📅 A specific year is marked\n\n👑 A new reign starts then\n\n📖 The two royal timelines connect\n\nThe phrase shows how the history is being counted carefully."],
    ["Son of Jehoahaz King of", "This identifies Joash by his father Jehoahaz and by his kingship. The line keeps the royal family line clear for the reader.\n\n👨 A royal father is named\n\n👑 Kingship stays tied to family line\n\n📖 The history stays specific\n\nThe phrase helps keep the rulers straight in the story."],
    ["He Was Twenty and Five Years Old When He Began to Reign", "This means Amaziah was twenty-five when he became king. Age is recorded because Kings treats reigns as real history, not vague legend.\n\n2️⃣5️⃣ His age is given\n\n👑 He begins ruling then\n\n📖 History is being counted carefully\n\nThe phrase gives the starting age of Amaziah's kingship."],
  ],
  "2 Kings 14:7-12": [
    ["He Slew of Edom in the Valley of Salt Ten Thousand", "This means Amaziah killed ten thousand Edomites in battle at the Valley of Salt. The phrase records a major military victory.\n\n⚔️ Edom is defeated in battle\n\n🔢 Ten thousand are named\n\n🗺️ The Valley of Salt is the place\n\nThe phrase describes Amaziah's victory over Edom."],
    ["Took Selah by War", "Selah was an Edomite stronghold, and by war means Amaziah captured it through battle. The city was not handed over peacefully.\n\n🏙️ A strong city is captured\n\n⚔️ It is taken in battle\n\n👑 Amaziah expands his military success\n\nThe phrase tells how Selah was won."],
    ["Then Amaziah Sent Messengers to Jehoash", "Amaziah sends an official message to Jehoash king of Israel. The phrase begins the challenge that will lead to conflict between the two kingdoms.\n\n📨 A royal message is sent\n\n👑 Another king is addressed\n\n⚠️ Tension is rising\n\nThe phrase opens the exchange before the battle with Israel."],
    ["The Son of Jehoahaz Son of Jehu", "This identifies Jehoash by his father and grandfather. The line keeps the northern royal line clear in a section full of kings with similar names.\n\n👨 His father and grandfather are named\n\n👑 He belongs to Jehu's line\n\n📖 The royal identity is clarified\n\nThe phrase helps the reader know exactly which king is meant."],
  ],
  "2 Kings 14:13-18": [
    ["Jehoash King of Israel Took Amaziah King of Judah", "This means Jehoash captured Amaziah after defeating him. Took here means seized as a defeated rival king.\n\n⚔️ Judah's king is defeated\n\n👑 Amaziah is captured\n\n📉 Israel wins the conflict\n\nThe phrase states the outcome of the battle between the kings."],
    ["The Son of Jehoash the Son of Ahaziah", "This identifies Amaziah through his father and grandfather. The repeated family naming keeps the royal lines from being confused.\n\n👨 His lineage is stated clearly\n\n👑 He belongs to Judah's royal house\n\n📖 The history stays exact\n\nThe phrase identifies which Amaziah is in view."],
    ["He Took All the Gold and Silver", "This means Jehoash carried away the wealth after victory. Gold and silver here are spoils taken from Judah and the temple treasury.\n\n💰 Wealth is seized\n\n⚔️ Victory brings plunder\n\n🏛️ Judah's loss is material as well as military\n\nThe phrase shows the extent of the defeat."],
    ["All the Vessels That Were Found in the House of the LORD", "The vessels are temple utensils used in worship. Taking them means the defeat reaches into the LORD's house itself.\n\n🏛️ Temple items are taken\n\n🥣 Worship vessels are meant\n\n⚠️ The loss touches sacred space\n\nThe phrase shows how humiliating Judah's defeat was."],
  ],
  "2 Kings 14:19-24": [
    ["Now They Made a Conspiracy Against Him in Jerusalem", "A conspiracy is a secret plot by several people. Amaziah faces betrayal inside his own capital city.\n\n🤫 A plot is formed\n\n🏙️ Jerusalem is the setting\n\n⚠️ The threat comes from within Judah\n\nThe phrase opens the rebellion against Amaziah."],
    ["He Fled to Lachish", "This means Amaziah ran away to Lachish to escape the conspiracy. Fled shows fear and loss of control.\n\n🏃 The king runs for safety\n\n🏙️ Lachish becomes his refuge\n\n⚠️ The plot has become deadly\n\nThe phrase shows Amaziah trying to escape his enemies."],
    ["They Brought Him on Horses", "This means Amaziah's body was carried back on horses after he was killed. It is an aftermath phrase about returning the dead king.\n\n🐎 His body is brought back\n\n💀 The king is no longer alive\n\n🏙️ He returns to Jerusalem after death\n\nThe phrase describes the return of the slain king."],
    ["He Was Buried at Jerusalem with His Fathers in the City of David", "This means Amaziah was buried in Jerusalem in the royal burial tradition. With his fathers means with the line of earlier kings.\n\n⚰️ He receives royal burial\n\n🏙️ Jerusalem is the burial place\n\n👑 The dynasty continues in death\n\nThe phrase records his burial among Judah's kings."],
  ],
  "2 Kings 14:25-29": [
    ["He Restored the Coast of Israel from the Entering of Hamath unto the Sea of the Plain", "Restored the coast means Jeroboam recovered Israel's border territory. The phrase describes regained land stretching from one boundary region to another.\n\n🗺️ Territory is recovered\n\n👑 Israel's borders expand again\n\n⚔️ National strength is restored for a time\n\nThe phrase describes Jeroboam's territorial recovery."],
    ["According to the Word of the LORD God of Israel", "This means the restoration happened in line with what God had spoken. The success is tied to God's word, not merely to military skill.\n\n📜 God's word stands behind the event\n\n👑 Victory is not explained by politics alone\n\n🙏 The LORD is still directing history\n\nThe phrase shows that the border recovery fulfilled God's word."],
    ["He Restored the Coast of Israel from the Entering", "This repeated wording keeps the emphasis on regained borders. Israel gets back territory it had lost.\n\n🗺️ Borders are pushed back outward\n\n↩️ Lost ground is regained\n\n👑 The kingdom grows stronger for a season\n\nThe phrase highlights the act of restoration."],
    ["That It Was Very Bitter", "This means Israel's suffering was extremely severe. Bitter here speaks of deep hardship, not taste.\n\n😣 The suffering was harsh\n\n📉 Israel was in a low condition\n\n🙏 God saw the misery clearly\n\nThe phrase explains why the LORD showed mercy in that season."],
  ],
  "2 Kings 15:1-6": [
    ["In the Twenty and Seventh Year of Jeroboam King of Israel Began Azariah Son of Amaziah King of Judah to Reign", "This gives the year and identifies Azariah by his father and kingdom. It places his reign within the larger shared timeline.\n\n📅 The year is fixed\n\n👑 Azariah begins to reign\n\n📖 Judah's history is tied to Israel's calendar\n\nThe phrase opens Azariah's reign with careful dating."],
    ["Seventh Year of Jeroboam", "This fragment keeps the reign connected to Jeroboam's timeline. Kings uses these year markers to tie the two kingdoms together historically.\n\n📅 Another king's year is the marker\n\n👑 Reigns are cross-dated\n\n📖 The history is being synchronized\n\nThe phrase shows how the record keeps both kingdoms aligned."],
    ["In the Twenty and Seventh Year of Jeroboam King", "This repeated dating line again emphasizes exact historical placement. The chapter wants the reader to know when Azariah's rule begins.\n\n📅 The start year matters\n\n👑 A new reign is located in time\n\n📖 The timeline remains precise\n\nThe phrase reinforces the historical setting."],
    ["Sixteen Years Old Was He When He Began to Reign", "This means Azariah was only sixteen when he became king. The line highlights his youth at the start of his rule.\n\n1️⃣6️⃣ He is very young\n\n👑 Yet he begins to reign\n\n📖 The record counts even personal details\n\nThe phrase gives Azariah's age at accession."],
  ],
  "2 Kings 15:7-12": [
    ["So Azariah Slept with His Fathers", "Slept with his fathers is the royal wording for death. Azariah dies and joins the line of earlier kings in death.\n\n💀 Azariah has died\n\n👴 He joins earlier kings in death\n\n👑 One reign has ended\n\nThe phrase reports the king's death in royal language."],
    ["They Buried Him with His Fathers in the City of David", "This means Azariah was buried in Jerusalem with the royal line. The burial honors his place in David's dynasty.\n\n⚰️ Royal burial is given\n\n🏙️ The city of David is Jerusalem\n\n👑 His place in the dynasty is affirmed\n\nThe phrase records his burial among Judah's kings."],
    ["In the Thirty and Eighth Year of Azariah King of Judah Did Zachariah the Son of Jeroboam Reign Over Israel in Samaria Six Months", "This sentence dates Zachariah's reign, names his father, names his capital, and notes how brief his rule was. Six months signals instability.\n\n📅 The reign is dated\n\n👑 Zachariah becomes king in Samaria\n\n⏳ His rule lasts only six months\n\nThe phrase introduces a short and unstable reign."],
    ["Eighth Year of Azariah", "This fragment keeps the northern reign connected to Judah's timeline. It is another cross-reference point in the history.\n\n📅 Judah's timeline is the marker\n\n👑 Another reign is being fixed in time\n\n📖 The shared chronology continues\n\nThe phrase helps place the event historically."],
  ],
  "2 Kings 15:13-18": [
    ["Shallum the Son of Jabesh Began to Reign in the Nine and Thirtieth Year of Uzziah King of Judah", "This sentence dates Shallum's reign and identifies him by his father. It marks another fast-changing transfer of power.\n\n📅 The reign is dated\n\n👑 Shallum takes the throne\n\n⚠️ The kingdom is unstable\n\nThe phrase introduces Shallum's brief kingship."],
    ["He Reigned a Full Month in Samaria", "This means Shallum ruled only one month. Full month sounds complete, but it emphasizes how short his reign really was.\n\n1️⃣ Only one month is counted\n\n🏙️ Samaria is the capital\n\n⚠️ The throne is changing rapidly\n\nThe phrase stresses the brevity of his reign."],
    ["Shallum the Son of Jabesh Began to Reign", "This shorter wording still marks the start of Shallum's kingship. The beginning matters because it will end almost immediately.\n\n👑 A new king begins\n\n📖 His name is entered into the record\n\n⚠️ The start will be brief\n\nThe phrase opens Shallum's short rule."],
    ["Came to Samaria", "This means Menahem came into Samaria, the capital city, to confront Shallum. The move brings the coup into the center of power.\n\n🚶 A rival arrives in the capital\n\n🏙️ Samaria is the place of confrontation\n\n⚔️ Power is about to change hands\n\nThe phrase places the coup in the royal city."],
  ],
  "2 Kings 15:19-24": [
    ["Pul the King of Assyria Came Against the Land", "This means the Assyrian king advanced against Israel's land. Assyria is now pressing into the story as a major outside threat.\n\n👑 Assyria enters the scene\n\n⚔️ The land is threatened from outside\n\n📉 Israel faces imperial pressure\n\nThe phrase introduces Assyrian aggression."],
    ["Menahem Gave Pul a Thousand Talents of Silver", "A talent is a large weight of precious metal, so a thousand talents is an enormous payment. Menahem pays tribute to buy Assyrian support or relief.\n\n💰 A huge tribute is paid\n\n👑 Menahem buys time or favor\n\n⚠️ Israel is bending under pressure\n\nThe phrase shows how costly foreign survival became."],
    ["Menahem Exacted the Money of Israel", "Exacted means forced the people to pay it. Menahem does not produce the tribute from his own wealth alone but squeezes it from the nation.\n\n💰 The money is demanded from the people\n\n👑 The king passes the burden downward\n\n📉 Foreign pressure becomes domestic hardship\n\nThe phrase shows the tribute falling on Israel's people."],
    ["Even of All the Mighty Men of Wealth", "This means the payment was taken from the wealthy and powerful men of the land. Mighty men of wealth are leading men with resources.\n\n💵 The rich are targeted for payment\n\n👥 Influential men bear the burden\n\n📖 The tribute is spread through the elite\n\nThe phrase identifies who had to supply the silver."],
  ],
  "2 Kings 15:25-30": [
    ["Pekah the Son of Remaliah", "This identifies Pekah by his father and names the man who will rise to power. The story slows down to make the new actor unmistakable.\n\n👤 A specific man is introduced\n\n👨 His father is named\n\n👑 He is about to matter greatly\n\nThe phrase identifies Pekah clearly."],
    ["A Captain of His", "Captain means military officer or commander. The phrase shows Pekah begins as an officer serving under the king he will betray.\n\n🪖 He is a military leader\n\n👑 He serves close to the throne\n\n⚠️ Power near the king becomes dangerous\n\nThe phrase explains Pekah's position before the coup."],
    ["The Rest of the Acts of Pekahiah", "This is a summary line meaning more of Pekahiah's reign existed in the record. The chapter gives only the key events.\n\n📖 More of his story was recorded\n\n👑 His reign is being summarized\n\n🧾 This is not the full account\n\nThe phrase signals a closing summary."],
    ["All That He Did", "This refers to the full range of Pekahiah's actions as king. It gathers his reign into one larger record.\n\n📝 His whole conduct is meant\n\n👑 The king is accountable for all of it\n\n📚 A fuller record existed\n\nThe phrase points to the totality of his acts."],
  ],
  "2 Kings 15:31-36": [
    ["The Rest of the Acts of Pekah", "This means more of Pekah's deeds existed than what is written here. It is another closing summary formula.\n\n📖 More of Pekah's reign was recorded\n\n👑 This chapter gives only part of it\n\n🧾 The account is being summarized\n\nThe phrase signals a summary close for Pekah."],
    ["All That He Did", "This means the full range of Pekah's actions as king. The record of his life was broader than this passage alone.\n\n📝 His complete actions are in view\n\n👑 The king's whole reign matters\n\n📚 More was written elsewhere\n\nThe phrase points to the wider royal record."],
    ["In the Second Year of Pekah the Son of Remaliah King of Israel Began Jotham the Son of Uzziah King of Judah to Reign", "This gives the year, the new king, his father, and his kingdom. It positions Jotham within the ongoing timeline of both kingdoms.\n\n📅 The reign is dated\n\n👑 Jotham becomes king of Judah\n\n📖 The two kingdoms remain linked in the record\n\nThe phrase opens Jotham's reign historically."],
    ["Year of Pekah the Son", "This fragment still serves as a dating marker tied to Pekah's reign. It helps place Jotham's rise in time.\n\n📅 Pekah's years are the marker\n\n👑 Another reign is being located\n\n📖 The shared chronology continues\n\nThe phrase helps fix the event in time."],
  ],
  "2 Kings 15:37-38": [
    ["In Those Days the LORD Began to Send Against Judah Rezin the King of Syria", "This means God began allowing hostile pressure to rise against Judah through Rezin of Syria. The threat is presented as part of divine judgment.\n\n⚔️ Syria begins pressing Judah\n\n🙏 The LORD is behind the judgment setting\n\n📉 Trouble is starting to gather\n\nThe phrase shows external attack beginning under God's watch."],
    ["Pekah the Son of Remaliah", "This identifies Pekah as part of the alliance threatening Judah. Naming him connects the northern king to Judah's coming trouble.\n\n👤 Pekah is clearly named\n\n👑 He is part of the threat\n\n📖 The political players are being specified\n\nThe phrase keeps the alliance partners clear."],
    ["Jotham Slept with His Fathers", "This means Jotham died, using the royal phrase for death. His reign comes to a close.\n\n💀 Jotham has died\n\n👴 He joins the fathers in death\n\n👑 His rule is over\n\nThe phrase reports the end of Jotham's reign."],
    ["Was Buried with His Fathers in the City of David His Father", "This means Jotham was buried in Jerusalem with the royal line. The city of David marks the dynasty's burial place.\n\n⚰️ Royal burial is given\n\n🏙️ Jerusalem is the burial city\n\n👑 The Davidic line continues in memory\n\nThe phrase records Jotham's burial among the kings."],
  ],
  "2 Kings 16:1-6": [
    ["In the Seventeenth Year of Pekah the Son of Remaliah Ahaz the Son of Jotham King of Judah Began to Reign", "This gives the year and identifies Ahaz by his father and rival-era king. It carefully places Ahaz's reign in the shared timeline.\n\n📅 The reign is dated\n\n👑 Ahaz begins to reign\n\n📖 Judah's history is tied to Israel's timeline\n\nThe phrase opens Ahaz's reign historically."],
    ["Year of Pekah the Son", "This fragment is a time marker tied to Pekah's reign. It helps locate Ahaz's accession precisely.\n\n📅 Pekah's year is the marker\n\n👑 Ahaz's rise is being dated\n\n📖 The chronology stays connected\n\nThe phrase helps place the event in time."],
    ["The Son of Remaliah Ahaz", "This keeps the two kings' identities distinct by naming Pekah's father and then Ahaz. The wording helps the reader not blur the rival rulers.\n\n👨 Fathers are named for clarity\n\n👑 Rival kings stay distinct\n\n📖 The history remains exact\n\nThe phrase helps separate the two royal identities."],
    ["Twenty Years Old Was Ahaz When He Began to Reign", "This means Ahaz was twenty years old when he became king. His age is part of the formal royal record.\n\n2️⃣0️⃣ His age is stated\n\n👑 He begins his reign then\n\n📖 The record counts personal details carefully\n\nThe phrase gives Ahaz's age at accession."],
  ],
  "2 Kings 16:7-12": [
    ["So Ahaz Sent Messengers to Tiglath-pileser King of Assyria", "Ahaz sends official envoys to the Assyrian king asking for help. The phrase begins Judah's appeal to a foreign empire.\n\n📨 Messengers go to Assyria\n\n👑 Ahaz seeks imperial help\n\n⚠️ Judah turns outward instead of upward\n\nThe phrase opens Ahaz's alliance request."],
    ["I Am Thy Servant and Thy Son", "This means Ahaz speaks in submission to Assyria, calling himself like a servant and dependent son. It is political humility before a stronger king.\n\n🙇 Ahaz lowers himself before Assyria\n\n👑 He speaks as a dependent\n\n⚠️ Judah's king is submitting outwardly\n\nThe phrase expresses political surrender for help."],
    ["Ahaz Took the Silver and Gold That Was Found in the House of the LORD", "This means Ahaz stripped wealth from the temple treasury to pay Assyria. The need for foreign help reaches into sacred resources.\n\n💰 Temple wealth is taken\n\n🏛️ The LORD's house is emptied for politics\n\n⚠️ Foreign pressure costs sacred treasure\n\nThe phrase shows the price of Ahaz's alliance."],
    ["In the Treasures of the King’s House", "This refers to the palace treasury. Ahaz uses both temple and palace wealth to fund his appeal.\n\n🏰 Palace treasure is included\n\n💰 Royal reserves are spent\n\n📉 The alliance drains national wealth\n\nThe phrase widens the cost beyond the temple alone."],
  ],
  "2 Kings 16:13-18": [
    ["He Burnt His Burnt Offering and His Meat Offering", "This means Ahaz presented offerings on the new altar he had made. Meat offering here means grain offering, not meat in the modern sense.\n\n🔥 Ahaz offers sacrifices\n\n🌾 The grain offering is included\n\n🏛️ He is changing worship practice\n\nThe phrase describes Ahaz actively using the altered altar."],
    ["Poured His Drink Offering", "A drink offering was a liquid poured out before God as part of worship. The phrase shows Ahaz carrying out the full ritual sequence on the new altar.\n\n🍷 A liquid offering is poured out\n\n🙏 It belongs to sacrificial worship\n\n⚠️ Ahaz uses the new arrangement fully\n\nThe phrase names another part of the offering ritual."],
    ["He Brought Also the Brasen Altar", "The brasen altar is the bronze altar already associated with temple worship. Ahaz moves it because he is rearranging the worship space.\n\n🟤 The bronze altar is meant\n\n🏛️ It is physically moved\n\n⚠️ Worship order is being changed\n\nThe phrase describes Ahaz relocating the older altar."],
    ["Which Was Before the LORD", "This means the bronze altar had stood in the LORD's appointed place. The line underscores that Ahaz is moving something already set before God.\n\n🙏 The altar had a sacred place\n\n🏛️ It stood before the LORD\n\n⚠️ Ahaz is disturbing an established order\n\nThe phrase stresses the altar's former holy position."],
  ],
  "2 Kings 16:19-20": [
    ["Now the Rest of the Acts of Ahaz Which He Did", "This means more of Ahaz's deeds existed in the official record than what is written here. It is the chapter's summary close.\n\n📖 More of his reign was recorded\n\n👑 This passage gives only part of it\n\n🧾 The account is being wrapped up\n\nThe phrase signals the summary ending for Ahaz."],
    ["Are They Not Written in the Book of the Chronicles of the Kings of Judah", "This means the fuller record could be found in the official royal chronicles of Judah. The Bible is pointing to an existing court history.\n\n📚 An official record existed\n\n👑 Judah kept royal chronicles\n\n📖 The story has a broader historical source\n\nThe phrase points beyond this summary to the fuller record."],
    ["Ahaz Slept with His Fathers", "This means Ahaz died, using the usual royal phrase. His reign comes to its close in death.\n\n💀 Ahaz has died\n\n👴 He joins his fathers in death\n\n👑 His kingship is over\n\nThe phrase reports the end of Ahaz's life."],
    ["Was Buried with His Fathers in the City of David", "This means Ahaz was buried in Jerusalem with the royal line. The city of David is the burial place of the dynasty.\n\n⚰️ He is buried among Judah's kings\n\n🏙️ Jerusalem is the place\n\n👑 The dynasty's burial custom continues\n\nThe phrase records Ahaz's burial."],
  ],
  "2 Kings 17:1-6": [
    ["In the Twelfth Year of Ahaz King of Judah Began Hoshea the Son of Elah to Reign in Samaria Over Israel Nine Years", "This sentence gives the year, the new king, his father, his capital, and the length of his reign. It introduces Hoshea at the very end of Israel's northern kingdom story.\n\n📅 The reign is dated\n\n👑 Hoshea becomes king in Samaria\n\n9️⃣ His rule lasts nine years\n\nThe phrase opens the final reign of the northern kingdom."],
    ["In the Twelfth Year of Ahaz King of Judah", "This shorter wording still dates Hoshea's reign by Judah's timeline. The two kingdoms remain historically linked.\n\n📅 Judah's year is the marker\n\n👑 Hoshea's rise is being fixed in time\n\n📖 The chronology remains connected\n\nThe phrase places the event in a shared timeline."],
    ["King of Judah Began Hoshea", "This fragment continues the dating and accession formula. It keeps the reader focused on the start of Hoshea's rule.\n\n👑 Hoshea begins to reign\n\n📅 The start is being counted carefully\n\n📖 The narrative is entering Israel's final chapter\n\nThe phrase keeps attention on Hoshea's accession."],
    ["He Did That Which Was Evil in the Sight of the LORD", "This means God judged Hoshea's conduct as evil, even if he was not as extreme as some before him. The line gives heaven's verdict on his reign.\n\n⚠️ Hoshea still does evil\n\n👀 God's sight is the measure\n\n⚖️ The reign remains spiritually wrong\n\nThe phrase states God's judgment on Hoshea."],
  ],
  "2 Kings 17:7-12": [
    ["For So It Was", "This means 'this is why it happened.' The phrase begins the explanation for Israel's fall and exile.\n\n📖 An explanation begins\n\n⚖️ Cause is now being named\n\n👀 The reader is told why judgment came\n\nThe phrase introduces the reason behind Israel's collapse."],
    ["That the Children of Israel Had Sinned Against the LORD Their God", "This means Israel's exile happened because the people sinned against the God who had been theirs by covenant and deliverance.\n\n⚠️ Sin is named as the cause\n\n🙏 The sin is against their own covenant God\n\n📖 The exile has a moral reason\n\nThe phrase states the core reason for judgment."],
    ["Walked in the Statutes of the Heathen", "Statutes of the heathen means the customs and practices of pagan nations. Israel copied the ways of peoples who did not know the LORD.\n\n🚶 Israel followed pagan patterns\n\n🌍 Heathen means surrounding non-covenant nations\n\n⚠️ They borrowed forbidden ways\n\nThe phrase describes Israel imitating pagan customs."],
    ["Whom the LORD Cast Out from Before the Children of Israel", "This means God had driven those earlier nations out of the land before Israel entered it. Israel is now copying the very peoples God had judged.\n\n⚖️ God had already judged those nations\n\n🏞️ They were removed from the land\n\n⚠️ Israel is repeating condemned behavior\n\nThe phrase sharpens the irony of Israel's sin."],
  ],
  "2 Kings 17:13-18": [
    ["Yet the LORD Testified Against Israel", "Testified against means the LORD warned and spoke against Israel's sin. He did not judge without first confronting them.\n\n📜 God gave warning testimony\n\n⚖️ He spoke against their sin\n\n🙏 Judgment was preceded by appeal\n\nThe phrase shows the LORD addressing Israel before exile."],
    ["By All the Prophets", "This means God used many prophets, not just one isolated voice. The warnings were repeated and widespread.\n\n🗣️ Many prophetic voices were sent\n\n📜 The warning was repeated often\n\n⚠️ Israel had ample notice\n\nThe phrase shows how persistent God's warnings were."],
    ["Notwithstanding They Would Not Hear", "Notwithstanding means even so, and would not hear means refused to listen or obey. Israel resisted the warnings anyway.\n\n🚫 They still refused\n\n👂 Hearing would have meant obedience\n\n⚠️ Rebellion continued despite warning\n\nThe phrase describes stubborn refusal."],
    ["But Hardened Their Necks", "Hardened their necks is an image from an animal resisting the yoke. It means they became stubborn and refused to bend under God's correction.\n\n🐂 The image is stubborn resistance\n\n⚠️ They refused correction\n\n🚫 Their hearts became unyielding\n\nThe phrase pictures Israel's stubbornness vividly."],
  ],
  "2 Kings 17:19-24": [
    ["Also Judah Kept Not the Commandments of the LORD Their God", "This means Judah was guilty too and did not faithfully obey God's commands. The southern kingdom cannot stand smugly over Israel's fall.\n\n⚠️ Judah also disobeyed\n\n🙏 The sin is against the LORD their God\n\n📖 Both kingdoms are implicated\n\nThe phrase widens the charge beyond Israel alone."],
    ["Also Judah Kept Not the Commandments of the LORD", "This repeated wording presses the same point: Judah was not innocent. The southern kingdom also broke covenant obedience.\n\n⚠️ Judah also failed\n\n📜 The commandments were not kept\n\n👀 God saw guilt in both kingdoms\n\nThe phrase reinforces Judah's shared blame."],
    ["The LORD Rejected All the Seed of Israel", "Seed of Israel means the people descended from Israel as a nation. Rejected here means God cast them off from their privileged place because of persistent sin.\n\n👥 The nation as a whole is in view\n\n⚖️ Rejection follows long rebellion\n\n📉 Covenant privilege is being withdrawn\n\nThe phrase states the seriousness of national judgment."],
    ["Delivered Them into the Hand of Spoilers", "Spoilers are invaders who plunder and destroy. God gave Israel over to hostile powers that stripped them.\n\n⚔️ Invaders are the spoilers\n\n💰 They plunder what they conquer\n\n⚖️ God hands Israel over in judgment\n\nThe phrase describes Israel being given to destructive enemies."],
  ],
  "2 Kings 17:25-30": [
    ["So It Was at the Beginning of Their Dwelling There", "This means when the foreign settlers first began living in Israel's land, a problem arose right away. Dwelling there refers to their new settlement after exile.\n\n🏠 New settlers begin living there\n\n📅 The trouble starts at the beginning\n\n📖 The scene explains what happened next in the land\n\nThe phrase opens the story of foreign settlement in Samaria."],
    ["So It Was at the Beginning of Their Dwelling", "This repeated fragment still points to the early stage of their settlement. The key idea is what happened when they first arrived.\n\n📅 It concerns the beginning period\n\n🏠 Settlement has just started\n\n⚠️ Early problems appear immediately\n\nThe phrase keeps the timeline of settlement clear."],
    ["Wherefore They Spake to the King of Assyria", "Wherefore means therefore. The settlers report their problem back to the Assyrian king because they think they need instruction about the local god.\n\n📨 A report is sent upward\n\n👑 Assyria's king is addressed\n\n❓ They think they need religious guidance\n\nThe phrase explains why they appeal to Assyria."],
    ["The Nations Which Thou Hast Removed", "This refers to the foreign peoples the Assyrian king had relocated into the land. Removed means taken from one region and resettled in another.\n\n🌍 Different nations are being moved around\n\n👑 Assyria controls the resettlement\n\n🏠 New populations now live in Israel's land\n\nThe phrase identifies the transplanted peoples."],
  ],
  "2 Kings 17:31-36": [
    ["The Avites Made Nibhaz and Tartak", "This means the Avites made their own local idols named Nibhaz and Tartak. Each transplanted people kept bringing its own gods.\n\n🛐 The Avites made idols\n\n📛 Nibhaz and Tartak are idol names\n\n🌍 Foreign worship enters the land\n\nThe phrase shows imported idolatry continuing."],
    ["The Sepharvites Burnt Their Children in Fire to Adrammelech and Anammelech", "This means the Sepharvites practiced child sacrifice to their gods Adrammelech and Anammelech. The phrase names one of the darkest forms of pagan worship.\n\n🔥 Children were burned in sacrifice\n\n🛐 The offering was made to false gods\n\n⚠️ The practice is horrific and condemned\n\nThe phrase exposes the depth of pagan evil."],
    ["So They Feared the LORD", "Here feared the LORD means they showed some outward religious regard for Him. But the context shows it was mixed with idolatry, not true exclusive devotion.\n\n🙏 They gave the LORD some outward reverence\n\n⚠️ It was mixed with other worship\n\n🚫 This was not pure covenant faithfulness\n\nThe phrase describes divided religion, not wholehearted obedience."],
    ["Made unto Themselves of the Lowest of Them Priests of the High Places", "Lowest of them means common people chosen without regard for God's law. High places were local worship sites outside the proper pattern God had set.\n\n👥 Improper priests are appointed\n\n⛰️ High places are the worship sites\n\n⚠️ The system ignores God's requirements\n\nThe phrase describes man-made worship leadership."],
  ],
  "2 Kings 17:37-41": [
    ["Which He Wrote for You", "This means the LORD had given written commands to His people. The phrase points to Scripture as fixed instruction, not flexible preference.\n\n📜 God's law was written\n\n🙏 The people had clear instruction\n\n⚖️ They were accountable to what was already given\n\nThe phrase points back to God's written commands."],
    ["Ye Shall Observe to Do for Evermore", "Observe to do means carefully keep and obey. For evermore means this obedience was meant to continue, not expire after one generation.\n\n👂 Careful obedience is required\n\n✅ Doing matters, not hearing only\n\n⏳ The command was ongoing\n\nThe phrase calls for lasting obedience."],
    ["The Covenant That I Have Made with You Ye Shall Not Forget", "This means God's people must remember the covenant relationship and obligations He established with them. Forgetting it would lead to disobedience and judgment.\n\n🤝 The covenant must be remembered\n\n📜 Relationship and obligation go together\n\n⚠️ Forgetfulness leads to unfaithfulness\n\nThe phrase commands covenant memory."],
    ["Neither Shall Ye Fear Other Gods", "Fear other gods means honor, serve, or submit to them as divine powers. The command forbids giving religious allegiance to false gods.\n\n🚫 No allegiance to false gods\n\n🙏 The LORD alone must be feared\n\n🛐 Worship loyalty must stay exclusive\n\nThe phrase bans religious devotion to other gods."],
  ],
};

function rewriteDay91SecondKingsSection(section: KingdomDeclinePhraseSectionInput): KingdomDeclinePhraseSectionInput {
  const overrides = DAY_91_SECOND_KINGS_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const DAY_92_SECOND_KINGS_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "2 Kings 18:1-6": [
    ["Now It Came to Pass in the Third Year of Hoshea Son of Elah King of Israel", "This gives the year for Hezekiah's reign by comparing it to Hoshea king of Israel. It places Judah's story inside the shared timeline of the two kingdoms.\n\n📅 The year is fixed\n\n👑 Hezekiah's reign is being introduced\n\n📖 Israel and Judah are still tracked together\n\nThe phrase anchors Hezekiah historically."],
    ["Now It Came to Pass in the Third Year", "This shorter wording still marks the exact year when the next reign begins. Kings often uses another king's years as the dating system.\n\n📅 A specific year is marked\n\n👑 A new reign is starting\n\n📖 The history stays carefully dated\n\nThe phrase keeps the timeline clear."],
    ["Twenty and Five Years Old Was He When He Began to Reign", "This means Hezekiah was twenty-five years old when he became king. His age is part of the formal royal record.\n\n2️⃣5️⃣ His age is stated\n\n👑 He begins to reign then\n\n📖 Personal details matter in the history\n\nThe phrase gives Hezekiah's age at accession."],
    ["He Reigned Twenty and Nine Years in Jerusalem", "This means Hezekiah ruled for twenty-nine years from Jerusalem. The line gives both the length and the city of his reign.\n\n2️⃣9️⃣ Twenty-nine years are counted\n\n🏙️ Jerusalem is his royal city\n\n👑 His reign had a substantial span\n\nThe phrase summarizes the scope of Hezekiah's kingship."],
  ],
  "2 Kings 18:7-12": [
    ["The LORD Was with Him", "This means God was actively helping and favoring Hezekiah. The phrase explains why his reign stands out from many others.\n\n🙏 God is with Hezekiah\n\n👑 His strength is not merely political\n\n✅ Divine favor marks his reign\n\nThe phrase gives the reason for Hezekiah's success."],
    ["He Prospered Whithersoever He Went Forth", "Whithersoever means wherever. The phrase says Hezekiah succeeded in the undertakings he went out to do.\n\n➡️ Wherever he went\n\n✅ He found success\n\n🙏 The prosperity is linked to God's help\n\nThe phrase describes broad success in Hezekiah's actions."],
    ["He Smote the Philistines", "Smote means struck down or defeated. Hezekiah won military victories over the Philistines.\n\n⚔️ The Philistines are defeated\n\n👑 Hezekiah acts strongly in battle\n\n📉 Old enemies are pushed back\n\nThe phrase records his victory over them."],
    ["Even unto Gaza", "This means the victories reached as far as Gaza, a major Philistine city. It marks the extent of Hezekiah's campaign.\n\n🗺️ Gaza marks the far reach\n\n⚔️ The campaign extended widely\n\n📖 The victory had real geographic scope\n\nThe phrase shows how far the success went."],
  ],
  "2 Kings 18:13-18": [
    ["Now in the Fourteenth Year of King Hezekiah Did Sennacherib King of Assyria Come Up Against All the Fenced Cities of Judah", "This means Assyria invaded Judah in Hezekiah's fourteenth year and attacked its fortified cities. Fenced cities are defended cities with walls.\n\n📅 The invasion is dated\n\n👑 Sennacherib leads Assyria's attack\n\n🏙️ Judah's fortified cities are threatened\n\nThe phrase opens the Assyrian crisis against Judah."],
    ["Hezekiah King of Judah Sent to the King of Assyria to Lachish", "Hezekiah sends a message to Sennacherib while the Assyrian king is at Lachish. The move is an attempt to deal with the crisis diplomatically.\n\n📨 Hezekiah sends word out\n\n🏙️ Lachish is the Assyrian camp location\n\n⚠️ Judah is under heavy pressure\n\nThe phrase begins Hezekiah's appeal to Assyria."],
    ["I Have Offended", "This means Hezekiah is admitting fault or acknowledging submission in hopes of easing the attack. The wording is political humility under pressure.\n\n🙇 Hezekiah lowers himself\n\n🗣️ He admits wrong or guilt\n\n⚠️ The king is trying to stop the invasion\n\nThe phrase expresses humbled appeal before Assyria."],
    ["Hezekiah Gave Him All the Silver That Was Found in the House of the LORD", "This means temple silver was taken and paid over to Assyria. The foreign threat reaches into the treasury of God's house.\n\n💰 Temple silver is surrendered\n\n🏛️ The LORD's house loses treasure\n\n⚠️ Survival becomes very costly\n\nThe phrase shows the price Hezekiah pays under pressure."],
  ],
  "2 Kings 18:19-24": [
    ["Rab-shakeh Said unto Them", "Rab-shakeh is the Assyrian spokesman speaking for the invading power. The phrase introduces his intimidating speech.\n\n🗣️ Assyria's spokesman begins speaking\n\n👂 Judah's officials must hear him\n\n⚠️ Psychological warfare begins\n\nThe phrase opens the enemy's message."],
    ["Speak Ye Now to Hezekiah", "This means Rab-shakeh tells Judah's officials to carry his message directly to Hezekiah. He wants the king personally confronted.\n\n📨 A direct message is ordered\n\n👑 Hezekiah is the target\n\n🗣️ The threat is to be passed on clearly\n\nThe phrase sends Assyria's words straight to the king."],
    ["But They Are but Vain Words", "Vain words means empty words with no real power behind them. Rab-shakeh is mocking Judah's claims to strategy and strength.\n\n💬 The words are called empty\n\n⚠️ Assyria is ridiculing Judah's confidence\n\n👑 Human boasts are being dismissed\n\nThe phrase belittles Judah's supposed strength."],
    ["I Have Counsel and Strength for the War", "Rab-shakeh claims there is real strategy and power for battle on Assyria's side. He is boasting that Assyria has what Judah lacks.\n\n⚔️ Assyria claims real military ability\n\n🧠 Counsel means strategy or planning\n\n💪 Strength means actual power to fight\n\nThe phrase is enemy boasting about war-readiness."],
  ],
  "2 Kings 18:25-30": [
    ["Am I Now Come Up Without the LORD Against This Place to Destroy It", "Rab-shakeh is claiming the LORD Himself sent Assyria against Judah. The statement is propaganda meant to shake Judah's trust.\n\n🗣️ Assyria claims divine approval\n\n⚠️ The claim is meant to unsettle Judah\n\n🙏 God's name is being misused in the threat\n\nThe phrase is a manipulative claim about the LORD's will."],
    ["The LORD Said to Me", "Rab-shakeh claims God told him to attack. The line is not trustworthy prophecy but part of the Assyrian psychological attack.\n\n🗣️ A false claim of divine instruction is made\n\n⚠️ The enemy uses sacred language strategically\n\n👂 Judah is meant to feel confused and afraid\n\nThe phrase shows the invader borrowing God's name for persuasion."],
    ["Then Said Eliakim the Son of Hilkiah", "This introduces Eliakim answering the Assyrian spokesman. The response comes from Judah's officials, not from Hezekiah directly.\n\n🗣️ Judah's official responds\n\n👤 Eliakim is identified clearly\n\n📖 The dialogue continues through the officials\n\nThe phrase turns the scene to Judah's reply."],
    ["I Pray Thee", "I pray thee means please. Eliakim speaks respectfully even while asking the Assyrian spokesman to change languages.\n\n🙏 A polite request is made\n\n💬 It means please\n\n👂 Tone matters in the exchange\n\nThe phrase softens the official appeal."],
  ],
  "2 Kings 18:31-36": [
    ["Hearken Not to Hezekiah", "Hearken means listen or obey. Rab-shakeh tells the people not to trust Hezekiah's leadership.\n\n👂 Hearken means obey\n\n🚫 They are urged not to follow Hezekiah\n\n⚠️ Assyria is trying to break the people's trust\n\nThe phrase is a direct attack on the king's authority."],
    ["For Thus Saith the King of Assyria", "This means the message comes as the official word of Assyria's king. It is a royal proclamation meant to carry weight.\n\n👑 Assyria's king is speaking through his envoy\n\n📜 The message is official\n\n⚠️ Royal authority backs the threat\n\nThe phrase introduces the king's declared terms."],
    ["Until I Come and Take You Away to a Land Like Your Own Land", "This means exile to another land, though Assyria tries to describe it attractively. The promise hides the violence of forced removal.\n\n🚚 The people are threatened with deportation\n\n🗣️ Assyria frames exile as pleasant\n\n⚠️ Forced removal is being disguised\n\nThe phrase describes exile in deceptive language."],
    ["A Land of Corn and Wine", "This is Assyria's sales pitch for the place of exile. Corn and wine mean food and prosperity, but the language is meant to seduce frightened people.\n\n🌾 Food abundance is promised\n\n🍷 Wine suggests prosperity\n\n⚠️ The promise is propaganda, not covenant blessing\n\nThe phrase is part of the enemy's attractive lie."],
  ],
  "2 Kings 18:37": [
    ["Then Came Eliakim the Son of Hilkiah", "This means Eliakim returned to Hezekiah after hearing Rab-shakeh's speech. He comes back carrying disturbing news.\n\n🚶 Eliakim comes back\n\n👑 He returns to Hezekiah\n\n⚠️ He brings the burden of the enemy's words\n\nThe phrase opens the report back to the king."],
    ["Which Was Over the Household", "This means Eliakim was in charge of the royal household, a high palace office. He is not an ordinary messenger but a leading official.\n\n🏠 He managed the royal household\n\n👤 It was a high-ranking role\n\n📖 The report comes through an important official\n\nThe phrase identifies Eliakim's position."],
    ["Came Eliakim the Son of Hilkiah, Which Was", "This repeated fragment still centers on Eliakim's return and identity. The story wants the reader to know exactly who brought the report.\n\n👤 The official is clearly identified\n\n🚶 He returns from the Assyrian meeting\n\n📖 The messenger matters in the narrative\n\nThe phrase reinforces who is reporting back."],
    ["Eliakim the Son of Hilkiah, Which Was Over", "This repeated wording keeps Eliakim's office in view. His position helps explain why he is leading this response.\n\n🏛️ His office gave him responsibility\n\n👑 He served close to the king\n\n📖 Leadership is part of the scene\n\nThe phrase reinforces his official role."],
  ],
  "2 Kings 19:1-6": [
    ["It Came to Pass", "This simple marker moves the story into Hezekiah's reaction. The crisis now becomes a matter of prayer and mourning.\n\n📅 The next event begins\n\n👑 Hezekiah now responds\n\n📖 The narrative shifts from threat to reaction\n\nThe phrase transitions into the king's response."],
    ["When King Hezekiah Heard It", "This means Hezekiah heard the report of Rab-shakeh's speech. What he hears drives him to grief and prayer.\n\n👂 Hezekiah receives the report\n\n⚠️ The threat is now personal and immediate\n\n🙏 His response will be spiritual, not only political\n\nThe phrase starts the king's reaction to the news."],
    ["He Sent Eliakim", "Hezekiah sends Eliakim and others to Isaiah the prophet. The king is seeking God's word through God's servant.\n\n📨 Hezekiah sends trusted officials\n\n🙏 Isaiah is the destination\n\n👑 The king looks for prophetic help\n\nThe phrase begins the appeal to Isaiah."],
    ["Which Was Over the Household", "This again identifies Eliakim's office as chief over the household. The king sends a high official in this desperate moment.\n\n🏠 He is the palace chief\n\n👤 His role gives weight to the mission\n\n📖 The appeal is official and serious\n\nThe phrase reminds the reader who is being sent."],
  ],
  "2 Kings 19:7-12": [
    ["I Will Send a Blast Upon Him", "Blast here means a force or spirit of disturbance from God. The LORD is promising to trouble Sennacherib and turn him back.\n\n🙏 God is the one acting\n\n🌬️ A disturbing force will be sent\n\n↩️ The enemy king will be redirected\n\nThe phrase promises divine interference against Assyria."],
    ["He Shall Hear a Rumour", "Rumour means a report or message that will unsettle Sennacherib. God will use news to move the enemy king.\n\n👂 A report will reach him\n\n⚠️ The news will disturb him\n\n🙏 God can move kings through what they hear\n\nThe phrase shows how God will begin turning Assyria away."],
    ["So Rab-shakeh Returned", "This means the Assyrian spokesman went back to his own king. The public speech ends and the envoy withdraws.\n\n↩️ The envoy goes back\n\n👑 He returns to Assyria's king\n\n📖 The scene shifts away from the wall\n\nThe phrase records the spokesman's return."],
    ["Found the King of Assyria Warring Against Libnah", "This means Sennacherib was now fighting at Libnah. The enemy king is still actively campaigning in the region.\n\n⚔️ Assyria is still at war\n\n🏙️ Libnah is the new battle site\n\n👑 Sennacherib remains dangerous\n\nThe phrase places the king at his next military target."],
  ],
  "2 Kings 19:13-18": [
    ["Where Is the King of Hamath", "This is part of Assyria's taunt asking what happened to other defeated kings. The point is that no nation had escaped Assyria's power.\n\n👑 Other kings are used as examples\n\n⚠️ The question is meant to intimidate\n\n📉 Assyria points to its past victories\n\nThe phrase is a mocking challenge to Judah's hope."],
    ["The King of Arpad", "Arpad was another conquered city-state whose king could not resist Assyria. The name adds to the list of defeated rulers.\n\n🏙️ Arpad is one of the conquered places\n\n👑 Its king was helpless before Assyria\n\n⚠️ The list is meant to frighten Judah\n\nThe phrase adds another example to the enemy boast."],
    ["Hezekiah Received the Letter of the Hand of the Messengers", "This means Hezekiah took the written message delivered by the envoys. Received ... of the hand means it came directly into his possession.\n\n📜 A letter is delivered directly\n\n👑 Hezekiah reads the threat himself\n\n⚠️ The message is now personal and official\n\nThe phrase describes the king receiving the written challenge."],
    ["Hezekiah Went Up into the House of the LORD", "This means Hezekiah went to the temple with the crisis. He carries the threatening letter into God's presence.\n\n🚶 Hezekiah goes to the temple\n\n🏛️ The LORD's house is where he turns\n\n🙏 He brings the crisis before God\n\nThe phrase shows the king taking the threat to prayer."],
  ],
  "2 Kings 19:19-24": [
    ["O LORD Our God", "This is Hezekiah's direct address to God in prayer. Our God expresses covenant relationship and dependence.\n\n🙏 Hezekiah prays directly to God\n\n🤝 'Our God' speaks of belonging and trust\n\n👑 The king turns upward, not merely outward\n\nThe phrase opens intimate royal prayer."],
    ["I Beseech Thee", "Beseech means earnestly beg or plead. Hezekiah is not making a casual request but a desperate appeal.\n\n🙏 A strong plea is being made\n\n💬 Beseech means to beg earnestly\n\n⚠️ The need is urgent\n\nThe phrase gives the prayer emotional weight."],
    ["Then Isaiah the Son of Amoz Sent to Hezekiah", "This means Isaiah sent a message back to Hezekiah in response to the prayer. God answers through His prophet.\n\n📨 Isaiah sends a reply\n\n🙏 The answer comes from God through prophecy\n\n👑 Hezekiah is not left unanswered\n\nThe phrase opens the prophetic response."],
    ["Thus Saith the LORD God of Israel", "This marks the start of God's own answer. Isaiah is not improvising; he is delivering the LORD's message.\n\n📜 God's answer begins\n\n🗣️ Isaiah speaks for the LORD\n\n⚖️ The response carries divine authority\n\nThe phrase introduces the LORD's declaration."],
  ],
  "2 Kings 19:25-30": [
    ["Hast Thou Not Heard Long Ago How I Have Done It", "God is saying that Assyria's rise was not accidental; He had planned it long ago. The empire is powerful only within God's larger purpose.\n\n📜 God's plan reaches far back\n\n👑 Assyria is not ultimate\n\n🙏 History unfolds under God's design\n\nThe phrase reminds the enemy that God stands behind history."],
    ["Hast Thou Not Heard Long Ago How I Have", "This shortened line still points to God's long-established plan. The LORD is exposing Assyria's ignorance of who truly rules events.\n\n📖 The plan was ancient\n\n👂 Assyria should have known better\n\n🙏 The LORD is the deeper actor in history\n\nThe phrase stresses long-range divine purpose."],
    ["Therefore Their Inhabitants Were of Small Power", "This means the peoples Assyria defeated were weak and unable to resist. Their small power explains why Assyria swept over them so easily.\n\n💪 Their strength was limited\n\n📉 They could not stand firm\n\n⚔️ Conquest came because they were weak\n\nThe phrase explains the vulnerability of those nations."],
    ["They Were Dismayed and Confounded", "Dismayed means terrified and confounded means thrown into confusion. The conquered peoples collapsed inwardly before the attack.\n\n😨 Fear took hold of them\n\n🌀 Confusion followed\n\n📉 Their spirit broke under pressure\n\nThe phrase describes emotional and mental collapse."],
  ],
  "2 Kings 19:31-36": [
    ["For Out of Jerusalem Shall Go Forth a Remnant", "A remnant is a surviving group preserved through judgment. God promises that Jerusalem will not be wiped out completely.\n\n👥 A surviving group will remain\n\n🏙️ Jerusalem will not be emptied entirely\n\n🙏 God preserves a people for Himself\n\nThe phrase promises survival out of judgment."],
    ["They That Escape Out of Mount Zion", "This refers to those who survive and come out from Zion, another name for Jerusalem's holy hill. Escape means real deliverance from destruction.\n\n🏔️ Zion is the place of survival\n\n🏃 Some will escape\n\n🙏 God will preserve lives there\n\nThe phrase names the survivors from Jerusalem."],
    ["Therefore Thus Saith the LORD Concerning the King of Assyria", "This means the LORD is now giving a direct verdict about Sennacherib. The enemy king is not beyond God's judgment.\n\n📜 The LORD now addresses Assyria's king\n\n👑 Sennacherib is the subject\n\n⚖️ Heaven gives the final word on him\n\nThe phrase introduces God's ruling against the invader."],
    ["He Shall Not Come into This City", "This means Sennacherib will not enter Jerusalem. God is drawing a line the invader cannot cross.\n\n🚫 He will not enter the city\n\n🏙️ Jerusalem will be protected\n\n🙏 God limits the enemy's reach\n\nThe phrase promises the city's preservation."],
  ],
  "2 Kings 19:37": [
    ["It Came to Pass", "This marks the next event in the story of Sennacherib's end. What God promised is now beginning to happen.\n\n📅 The next moment arrives\n\n📖 The judgment story moves forward\n\n⚖️ God's word begins to be fulfilled\n\nThe phrase opens the final scene of Sennacherib."],
    ["As He Was Worshipping in the House of Nisroch His God", "This means Sennacherib was in the temple of his god Nisroch when he was struck down. The setting highlights the helplessness of the god he served.\n\n🛐 He is worshipping his own god\n\n🏛️ The house of Nisroch is the setting\n\n⚠️ His god cannot protect him there\n\nThe phrase makes the scene of his death deeply ironic."],
    ["Came to Pass, as He Was Worshipping in", "This repeated fragment keeps the focus on the timing of Sennacherib's death during worship. The place of supposed safety becomes the place of judgment.\n\n🛐 Worship is the moment of vulnerability\n\n⚖️ Judgment reaches him there\n\n📖 The timing matters in the story\n\nThe phrase reinforces the irony of the event."],
    ["To Pass, as He Was Worshipping in the", "This repeated wording still centers on Sennacherib's worship setting. The scene shows the emptiness of false gods before the true LORD.\n\n🛐 False worship is the backdrop\n\n🚫 No rescue comes from Nisroch\n\n🙏 The LORD alone rules over kings\n\nThe phrase keeps the worship context in view."],
  ],
  "2 Kings 20:1-6": [
    ["In Those Days Was Hezekiah Sick unto Death", "Sick unto death means Hezekiah's illness was expected to kill him. The king faces a personal crisis, not only a national one.\n\n🤒 Hezekiah is gravely ill\n\n💀 Death appears near\n\n👑 Even a faithful king is fragile\n\nThe phrase opens a life-and-death illness scene."],
    ["The Prophet Isaiah the Son of Amoz Came to Him", "Isaiah comes personally to Hezekiah with God's message. The prophet enters the sickroom as God's messenger.\n\n🚶 Isaiah comes to the king\n\n📜 He brings a word from God\n\n⚖️ The sickroom becomes a place of revelation\n\nThe phrase introduces the prophetic visit."],
    ["Then He Turned His Face to the Wall", "This means Hezekiah turned away from others to pray privately and earnestly. The gesture shows focused personal appeal before God.\n\n🧱 He turns toward the wall\n\n🙏 The posture becomes private and intense\n\n💔 His prayer is deeply personal\n\nThe phrase pictures concentrated prayer."],
    ["Prayed unto the LORD", "This means Hezekiah directly cried out to God. In his sickness, he turns to the LORD rather than to earthly power.\n\n🙏 Hezekiah prays directly\n\n👑 The king depends on God\n\n⚠️ Prayer becomes his response to death\n\nThe phrase states the heart of Hezekiah's reaction."],
  ],
  "2 Kings 20:7-12": [
    ["Take a Lump of Figs", "A lump of figs is a pressed mass of figs used as a treatment. God uses an ordinary remedy within His healing answer.\n\n🍇 Figs are used medicinally\n\n🩹 An ordinary treatment is applied\n\n🙏 God can work through simple means\n\nThe phrase names the remedy Isaiah orders."],
    ["They Took and Laid It on the Boil", "This means the fig poultice was placed directly on Hezekiah's inflamed sore or boil. The action is part of the healing process.\n\n🩹 The remedy is applied\n\n🤒 The boil is the affected place\n\n✅ The instruction is carried out\n\nThe phrase describes the treatment being used."],
    ["Hezekiah Said unto Isaiah", "This introduces Hezekiah asking Isaiah for reassurance. The king wants confirmation that healing will truly come.\n\n🗣️ Hezekiah speaks to Isaiah\n\n❓ He seeks confirmation\n\n🙏 Faith still wants a sign\n\nThe phrase opens the request for assurance."],
    ["What Shall Be the Sign That the LORD Will Heal Me", "Hezekiah asks for a sign, a confirming marker that God will really restore him. The question is about assurance, not disbelief alone.\n\n❓ A sign is requested\n\n🙏 The healing is expected from the LORD\n\n📖 He seeks confirmation of God's promise\n\nThe phrase asks for visible assurance of healing."],
  ],
  "2 Kings 20:13-18": [
    ["Hezekiah Hearkened unto Them", "Hearkened means listened favorably or gave attention. Hezekiah welcomed the Babylonian envoys and their interest.\n\n👂 Hezekiah receives them gladly\n\n🤝 He gives them access and attention\n\n⚠️ His openness will prove unwise\n\nThe phrase shows his willing response to the visitors."],
    ["Shewed Them All the House of His Precious Things", "This means Hezekiah showed the envoys all his treasures and storehouses. Precious things are his valuable possessions and reserves.\n\n💎 Treasures are displayed\n\n🏠 The storehouses are opened\n\n⚠️ Too much is being revealed\n\nThe phrase shows Hezekiah exposing his wealth."],
    ["Then Came Isaiah the Prophet unto King Hezekiah", "Isaiah comes to confront the king after the display to Babylon. The prophet enters to interpret what the king has done.\n\n🚶 Isaiah comes again\n\n👑 He addresses Hezekiah directly\n\n⚖️ Prophetic correction is coming\n\nThe phrase opens Isaiah's confrontation."],
    ["Said unto Him", "This simply introduces Isaiah's words to Hezekiah. The next lines will question and judge the king's actions.\n\n🗣️ The prophet now speaks\n\n👂 Hezekiah must answer\n\n📖 The confrontation moves into dialogue\n\nThe phrase turns the scene to Isaiah's speech."],
  ],
  "2 Kings 20:19-21": [
    ["Then Said Hezekiah unto Isaiah", "This means Hezekiah answers Isaiah after hearing the judgment about future exile. The king now responds to God's hard word.\n\n🗣️ Hezekiah replies\n\n📜 He has heard the judgment\n\n👑 The king must react to prophecy\n\nThe phrase opens his response."],
    ["Good Is the Word of the LORD Which Thou Hast Spoken", "Hezekiah means God's word is right and acceptable even though it is severe. Good here speaks of God's justice and truth, not pleasantness.\n\n✅ Hezekiah accepts God's word as right\n\n📜 The prophecy is acknowledged as just\n\n🙏 He submits to the LORD's verdict\n\nThe phrase shows reverent acceptance of a hard message."],
    ["The Rest of the Acts of Hezekiah", "This is a summary formula meaning more of Hezekiah's reign existed than this passage records. The chapter is drawing his story toward a close.\n\n📖 More of his reign was recorded\n\n👑 This is a summary ending\n\n🧾 The story here is selective\n\nThe phrase signals the closing summary of Hezekiah's acts."],
    ["All His Might", "This means the full extent of Hezekiah's strength and accomplishments. Might here includes his strong acts as king.\n\n💪 His strength and achievements are in view\n\n👑 The reign had notable power and action\n\n📚 More detail existed in the fuller record\n\nThe phrase points to the broader record of his accomplishments."],
  ],
  "2 Kings 21:1-6": [
    ["Manasseh Was Twelve Years Old When He Began to Reign", "This means Manasseh was only twelve when he became king. His youth makes the long evil reign that follows even more striking.\n\n1️⃣2️⃣ He begins very young\n\n👑 A child takes the throne\n\n📖 The age is part of the formal record\n\nThe phrase gives Manasseh's age at accession."],
    ["Reigned Fifty and Five Years in Jerusalem", "This means Manasseh ruled for fifty-five years from Jerusalem. It was a very long reign.\n\n5️⃣5️⃣ The reign is extremely long\n\n🏙️ Jerusalem is his royal city\n\n👑 His influence stretches across many years\n\nThe phrase shows the length of Manasseh's rule."],
    ["He Did That Which Was Evil in the Sight of the LORD", "This means God judged Manasseh's conduct as evil. The phrase gives heaven's verdict on his long reign.\n\n⚠️ Manasseh's conduct is evil\n\n👀 God is the judge of it\n\n📉 His reign is spiritually corrupt\n\nThe phrase states God's evaluation of the king."],
    ["After the Abominations of the Heathen", "Abominations means detestable practices, and heathen means pagan nations. Manasseh copied the horrifying practices of the nations God had condemned.\n\n🛐 Pagan practices are being copied\n\n⚠️ The actions are detestable to God\n\n📖 Judah's king imitates condemned nations\n\nThe phrase describes the kind of evil Manasseh embraced."],
  ],
  "2 Kings 21:7-12": [
    ["He Set a Graven Image of the Grove That He Had Made in the House", "A graven image is a carved idol, and the grove refers to an Asherah image. Manasseh puts this idol inside the temple itself.\n\n🛐 An idol is carved and installed\n\n🏛️ It is placed inside God's house\n\n⚠️ The defilement is direct and shocking\n\nThe phrase shows idolatry invading the temple."],
    ["He Set a Graven Image of the Grove", "This shorter wording still means Manasseh made and placed an idol associated with false worship. The king is not merely tolerating evil but installing it.\n\n🛐 The king sets up an idol\n\n👑 The action is deliberate\n\n⚠️ False worship is being established by the ruler\n\nThe phrase emphasizes the installation of the idol."],
    ["Neither Will I Make the Feet of Israel Move Any More Out of the Land Which I Gave Their Fathers", "God means He had promised stability in the land if His people obeyed. Their feet would not need to be moved away again.\n\n🏞️ The land was a gift from God\n\n👣 'Move the feet' means remove them from it\n\n🤝 Stability was tied to covenant obedience\n\nThe phrase recalls God's earlier promise of settled life in the land."],
    ["Only If They Will Observe to Do According to All That I Have Commanded Them", "Observe to do means carefully keep and obey. God's promise of staying in the land depended on continued obedience.\n\n👂 Careful obedience is required\n\n✅ The condition is active doing\n\n⚖️ Promise and responsibility are linked\n\nThe phrase states the condition attached to the promise."],
  ],
  "2 Kings 21:13-18": [
    ["I Will Stretch Over Jerusalem the Line of Samaria", "The line is a measuring cord used by a builder, here used as an image for judgment. Jerusalem will be measured for the same kind of judgment that fell on Samaria.\n\n📏 A measuring line is the image\n\n🏙️ Jerusalem will be judged by Samaria's standard\n\n⚖️ The city will not escape comparison\n\nThe phrase pictures careful, deliberate judgment."],
    ["The Plummet of the House of Ahab", "A plummet is a weighted tool for checking vertical alignment. Here it means Jerusalem will be tested by the same judgment that exposed Ahab's house.\n\n🪛 A judgment tool is the image\n\n👑 Ahab's house is the comparison\n\n⚖️ The same standard of judgment will apply\n\nThe phrase shows Jerusalem measured by a condemned pattern."],
    ["I Will Forsake the Remnant of Mine Inheritance", "Remnant of mine inheritance means the people of Judah who still remain. Forsake here means God will withdraw protective favor from them in judgment.\n\n👥 Judah is the remaining people in view\n\n🙏 They are still God's inheritance by covenant\n\n⚠️ Yet judgment will remove protection\n\nThe phrase describes God's abandonment in response to sin."],
    ["Deliver Them into the Hand of Their Enemies", "This means God will hand His people over to hostile powers. Their enemies will have control over them.\n\n⚔️ Enemies will gain the upper hand\n\n🙏 God is the one handing them over in judgment\n\n📉 Protection is being removed\n\nThe phrase states the consequence of covenant rebellion."],
  ],
  "2 Kings 21:19-24": [
    ["Amon Was Twenty and Two Years Old When He Began to Reign", "This means Amon was twenty-two when he became king. The formal line gives his age at accession.\n\n2️⃣2️⃣ His age is stated\n\n👑 He begins to reign then\n\n📖 The royal record stays precise\n\nThe phrase gives Amon's age when he took the throne."],
    ["He Reigned Two Years in Jerusalem", "This means Amon ruled only two years from Jerusalem. The line stresses the short length of his reign.\n\n2️⃣ His reign is very short\n\n🏙️ Jerusalem is the capital\n\n👑 His time on the throne is brief\n\nThe phrase summarizes the span of Amon's rule."],
    ["He Did That Which Was Evil in the Sight of the LORD", "This means God judged Amon's conduct as evil, just as with Manasseh. The reign continues the pattern of sin.\n\n⚠️ Amon's conduct is evil\n\n👀 God is the standard of judgment\n\n🔁 The family pattern of wickedness continues\n\nThe phrase gives God's verdict on Amon."],
    ["As His Father Manasseh Did", "This means Amon followed the same sinful pattern that Manasseh had modeled before him. The son repeats the father's evil.\n\n👨 Manasseh is the pattern being copied\n\n🔁 The sin is inherited in practice\n\n⚠️ The family line continues in rebellion\n\nThe phrase shows Amon repeating his father's ways."],
  ],
  "2 Kings 21:25-26": [
    ["Now the Rest of the Acts of Amon Which He Did", "This means more of Amon's acts existed in the official record than this chapter recounts. It is a summary close to his reign.\n\n📖 More of his reign was recorded\n\n👑 This chapter gives only the main outline\n\n🧾 The account is closing\n\nThe phrase signals the summary ending for Amon."],
    ["Are They Not Written in the Book of the Chronicles of the Kings of Judah", "This points to the official court record of Judah's kings. The Bible is referring to a fuller historical source.\n\n📚 An official chronicle existed\n\n👑 Judah's kings were recorded there\n\n📖 The summary points beyond itself\n\nThe phrase directs the reader to the fuller royal record."],
    ["He Was Buried in His Sepulchre in the Garden of Uzza", "This means Amon was buried in his own tomb located in the Garden of Uzza. The burial place is named specifically.\n\n⚰️ Amon is buried\n\n🏞️ The Garden of Uzza is the location\n\n📖 The burial place is part of the historical detail\n\nThe phrase records where he was laid to rest."],
    ["Josiah His Son Reigned in His Stead", "This means Josiah became king after Amon's death. In his stead means in his place.\n\n👑 Josiah succeeds him\n\n🔁 The throne passes to the son\n\n📖 A new reign is about to begin\n\nThe phrase marks the succession to Josiah."],
  ],
};

function rewriteDay92SecondKingsSection(section: KingdomDeclinePhraseSectionInput): KingdomDeclinePhraseSectionInput {
  const overrides = DAY_92_SECOND_KINGS_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const DAY_93_SECOND_KINGS_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "2 Kings 22:1-6": [
    ["Josiah Was Eight Years Old When He Began to Reign", "This means Josiah was only eight years old when he became king. The line highlights how young he was at the start of his reign.\n\n8️⃣ Josiah begins very young\n\n👑 A child takes the throne\n\n📖 The age is part of the formal royal record\n\nThe phrase gives Josiah's age at accession."],
    ["He Reigned Thirty and One Years in Jerusalem", "This means Josiah ruled for thirty-one years from Jerusalem. The line gives both the length and the city of his reign.\n\n3️⃣1️⃣ Thirty-one years are counted\n\n🏙️ Jerusalem is his royal city\n\n👑 His reign had a long span\n\nThe phrase summarizes the scope of Josiah's kingship."],
    ["He Did That Which Was Right in the Sight of the LORD", "This means God judged Josiah's conduct as right. The phrase gives heaven's approval of his rule.\n\n✅ Josiah is evaluated positively\n\n👀 God's sight is the standard\n\n👑 His reign stands out for faithfulness\n\nThe phrase states God's verdict on Josiah."],
    ["Walked in All the Way of David His Father", "Walked in the way means followed the pattern of life and rule. David his father means David his royal ancestor, not his immediate parent.\n\n🚶 He follows David's pattern\n\n👑 David is the model king in view\n\n✅ The comparison honors Josiah's faithfulness\n\nThe phrase says Josiah ruled in David-like obedience."],
  ],
  "2 Kings 22:7-12": [
    ["Howbeit There Was No Reckoning Made with Them of the Money That Was Delivered into Their Hand", "No reckoning means no audit or accounting was demanded from the workers handling the temple money. They were trusted in the repair work.\n\n💰 Money was entrusted to them\n\n🧾 No strict accounting was required\n\n🤝 Trust marked their service\n\nThe phrase explains the honesty assumed in the temple repairs."],
    ["Because They Dealt Faithfully", "This means the workers acted honestly and reliably. Their faithful conduct is the reason they were trusted without close accounting.\n\n🤝 They handled the work honestly\n\n✅ Faithful means dependable here\n\n💰 Trust followed proven character\n\nThe phrase explains why no reckoning was needed."],
    ["Hilkiah the High Priest Said unto Shaphan the Scribe", "This introduces Hilkiah speaking to Shaphan after discovering something important in the temple. The phrase opens the moment the lost law book comes to light.\n\n🗣️ Hilkiah speaks next\n\n🙏 The high priest is involved\n\n📖 The discovery is about to be announced\n\nThe phrase begins the report about the book."],
    ["I Have Found the Book of the Law in the House of the LORD", "This means the law book was discovered in the temple itself. Finding it shows how far Judah had drifted from hearing and keeping God's written word.\n\n📜 The law book is found\n\n🏛️ It is discovered in the temple\n\n⚠️ The rediscovery exposes long neglect\n\nThe phrase announces the recovery of God's written law."],
  ],
  "2 Kings 22:13-18": [
    ["Enquire of the LORD for Me", "Enquire means seek God's answer or ask for His word. Josiah wants someone to go before the LORD about the newly found book.\n\n🙏 A divine answer is being sought\n\n📜 The book has raised urgent questions\n\n👑 Josiah wants God's response, not guesses\n\nThe phrase asks for prophetic inquiry."],
    ["For the People", "Josiah's concern is not only for himself but for the whole nation. The phrase widens the responsibility from king to people.\n\n👥 The nation is included\n\n👑 The king feels corporate responsibility\n\n⚖️ The issue touches everyone\n\nThe phrase shows concern for the whole people."],
    ["So Hilkiah the Priest", "This introduces the delegation that goes to seek prophetic counsel. Hilkiah is one of the leaders carrying out Josiah's command.\n\n🚶 A mission is beginning\n\n🙏 The priest takes part in it\n\n📖 The inquiry is being acted on\n\nThe phrase starts the journey to seek God's answer."],
    ["Went unto Huldah the Prophetess", "This means the delegation went to Huldah, a female prophet who would speak God's answer. Prophetess means a woman through whom God gives His word.\n\n👩 A woman prophet is named\n\n📜 God's answer will come through her\n\n🙏 The delegation seeks divine counsel there\n\nThe phrase identifies Huldah as God's messenger."],
  ],
  "2 Kings 22:19-20": [
    ["Because Thine Heart Was Tender", "A tender heart means a responsive, soft, and humble heart before God. Josiah was not hardened when he heard the law.\n\n💛 His heart stayed soft before God\n\n👂 He responded instead of resisting\n\n✅ Humility marked his hearing\n\nThe phrase explains why Josiah was treated differently."],
    ["Thou Hast Humbled Thyself Before the LORD", "This means Josiah lowered himself before God in repentance and reverence. His response to the law was truly humble.\n\n🙇 Josiah bows low before God\n\n🙏 His humility is real\n\n📜 The law moved him to repentance\n\nThe phrase describes his submissive response."],
    ["I Will Gather Thee unto Thy Fathers", "This is a royal way of saying Josiah will die and join his ancestors. Gather thee unto thy fathers points to death in family continuity.\n\n💀 Death is being described gently\n\n👴 He will join his forefathers\n\n👑 The king's end is being foretold\n\nThe phrase promises his death before later disaster."],
    ["Thou Shalt Be Gathered into Thy Grave in Peace", "This means Josiah will be buried before the coming judgment falls on Judah. In peace does not mean no hardship ever touched him, but that he would not witness the full disaster ahead.\n\n⚰️ Josiah will reach burial before the catastrophe\n\n🕊️ He will not see the coming ruin\n\n🙏 God gives him mercy in timing\n\nThe phrase promises he will be spared from seeing Judah's destruction."],
  ],
  "2 Kings 23:1-6": [
    ["The King Sent", "This means Josiah sent out the call to gather leaders and people. The reform begins with deliberate royal action.\n\n📨 Josiah initiates the gathering\n\n👑 The king acts decisively\n\n📖 A public response is beginning\n\nThe phrase opens Josiah's reform assembly."],
    ["They Gathered unto Him All the Elders of Judah and of Jerusalem", "This means the leading men from Judah and Jerusalem assembled around Josiah. The reform is made public and national.\n\n👥 The elders gather\n\n🏙️ Judah and Jerusalem are both represented\n\n👑 The king leads a national response\n\nThe phrase shows broad leadership assembling."],
    ["The King Went Up into the House of the LORD", "This means Josiah went to the temple as the center of the covenant response. The crisis of the law book is being handled before God.\n\n🚶 Josiah goes to the temple\n\n🏛️ The LORD's house is the setting\n\n🙏 Reform begins in God's presence\n\nThe phrase places the king at the house of the LORD."],
    ["All the Men of Judah and All the Inhabitants of Jerusalem with Him", "This means the gathering included both the broader region and the capital city. The reform is not private; it involves the people publicly.\n\n👥 The people come with him\n\n🏙️ Judah and Jerusalem are involved together\n\n📖 The covenant hearing becomes communal\n\nThe phrase shows the whole community joining the event."],
  ],
  "2 Kings 23:7-12": [
    ["He Brake Down the Houses of the Sodomites", "Brake down means destroyed. The houses of the sodomites were places connected to immoral pagan practices near the temple.\n\n🪓 The buildings are destroyed\n\n⚠️ They were tied to corrupt worship practice\n\n🏛️ The cleansing reaches temple-adjacent evil\n\nThe phrase describes Josiah removing filthy religious corruption."],
    ["That Were by the House of the LORD", "This means those corrupt places stood right next to the temple. The closeness makes the defilement even worse.\n\n🏛️ The evil was near God's house\n\n⚠️ Corruption stood beside holy space\n\n📖 The reform must clear what is close at hand\n\nThe phrase stresses the shocking location of the sin."],
    ["He Brought All the Priests Out of the Cities of Judah", "This means Josiah summoned the priests connected with wrong worship sites across Judah. The reform reaches beyond Jerusalem into the whole land.\n\n👥 Priests are gathered in from the towns\n\n🏙️ The action spreads across Judah\n\n⚖️ Local false worship is being confronted\n\nThe phrase shows a kingdom-wide purge of corrupt priests."],
    ["Defiled the High Places Where the Priests Had Burned Incense", "Defiled means rendered unusable for worship. Josiah makes the high places unfit for further pagan or corrupt sacrifice.\n\n⛰️ The high places are targeted\n\n🔥 Incense had been burned there wrongly\n\n🚫 Josiah makes them unusable\n\nThe phrase describes desecrating false worship sites so they cannot continue."],
  ],
  "2 Kings 23:13-18": [
    ["The High Places That Were Before Jerusalem", "These were worship sites located near Jerusalem itself. The line shows that corrupt worship had surrounded even the holy city.\n\n⛰️ Worship sites stood near Jerusalem\n\n🏙️ The capital itself was surrounded by corruption\n\n⚠️ Reform must reach close to home\n\nThe phrase locates the high places near the city."],
    ["The High Places Were Before Jerusalem", "This repeated wording again stresses their location near Jerusalem. The closeness increases the seriousness of the defilement.\n\n📍 They stood right near the city\n\n⚠️ Evil was not far away but nearby\n\n🏙️ Jerusalem's surroundings needed cleansing\n\nThe phrase reinforces where those high places were."],
    ["He Brake in Pieces the Images", "This means Josiah smashed the idol images into pieces. The reform is physical and decisive, not symbolic only.\n\n🪓 The idols are smashed\n\n🛐 False worship objects are destroyed\n\n✅ The king is acting thoroughly\n\nThe phrase records the breaking of the images."],
    ["Cut Down the Groves", "Groves here refers to Asherah objects or sacred poles tied to false worship. Josiah removes these worship symbols completely.\n\n🪵 Asherah symbols are cut down\n\n🛐 False worship loses its markers\n\n⚠️ The reform reaches visible pagan objects\n\nThe phrase describes removing grove-related idols."],
  ],
  "2 Kings 23:19-24": [
    ["All the Houses Also of the High Places That Were in the Cities of Samaria", "This means Josiah extended his reform into the former northern territory and attacked the high-place shrines there too. Houses of the high places means shrine buildings.\n\n🏛️ Shrine buildings are in view\n\n🗺️ The reform reaches Samaria's cities\n\n👑 Josiah's purge goes beyond Judah\n\nThe phrase shows the reform extending into the north."],
    ["All the Houses Also of the High Places Were", "This repeated wording still points to those shrine buildings in Samaria's region. The line keeps the scope of reform broad.\n\n🏛️ Shrine houses are being targeted\n\n📍 The reform covers many sites\n\n⚠️ Josiah leaves little untouched\n\nThe phrase reinforces the breadth of the purge."],
    ["He Slew All the Priests of the High Places That Were There Upon the Altars", "This means Josiah killed the priests serving those pagan altars, right at the places of their false worship. The act fulfills earlier prophetic judgment.\n\n⚔️ The false priests are executed\n\n🛐 The altars become places of judgment\n\n📜 The purge is severe and final\n\nThe phrase describes a deadly judgment on the corrupt priesthood."],
    ["Burned Men’s Bones Upon Them", "This means human bones were burned on the altars, making them ritually defiled and unusable. It is an act of final desecration against false worship sites.\n\n🔥 Human bones are burned there\n\n🚫 The altars are defiled permanently\n\n⚠️ False worship is being shamed and ended\n\nThe phrase shows the altars being rendered unclean."],
  ],
  "2 Kings 23:25-30": [
    ["Like unto Him Was There No King Before Him", "This means no earlier king matched Josiah in the kind of wholehearted reform being described. The line singles him out as uniquely devoted.\n\n👑 Josiah stands apart from earlier kings\n\n✅ His devotion is exceptional\n\n📖 The record is giving him rare praise\n\nThe phrase marks Josiah as uniquely faithful."],
    ["That Turned to the LORD with All His Heart", "This means Josiah returned to God with complete inward devotion. All his heart stresses sincerity and totality.\n\n💛 His devotion is wholehearted\n\n↩️ He truly turns back to the LORD\n\n🙏 The reform is inward as well as outward\n\nThe phrase explains what made Josiah's response so remarkable."],
    ["Notwithstanding the LORD Turned Not from the Fierceness of His Great Wrath", "Notwithstanding means even so. The phrase says that despite Josiah's reform, God's burning judgment against Judah was not fully canceled.\n\n⚠️ Josiah's faithfulness did not erase all national guilt\n\n🔥 God's wrath remained fierce\n\n📖 Judgment had been deeply provoked already\n\nThe phrase explains that reform came too late to remove all consequences."],
    ["Wherewith His Anger Was Kindled Against Judah", "Kindled means set burning. God's anger against Judah had been ignited by long rebellion and was not a light reaction.\n\n🔥 The anger is pictured as burning\n\n⚖️ Judah had provoked real judgment\n\n📉 The nation's guilt ran deep\n\nThe phrase explains the intensity of God's wrath."],
  ],
  "2 Kings 23:31-36": [
    ["Jehoahaz Was Twenty and Three Years Old When He Began to Reign", "This means Jehoahaz was twenty-three when he became king. The line gives his age at accession.\n\n2️⃣3️⃣ His age is stated\n\n👑 He begins to reign then\n\n📖 The royal record remains precise\n\nThe phrase gives Jehoahaz's starting age."],
    ["He Reigned Three Months in Jerusalem", "This means Jehoahaz ruled only three months. The short length shows instability in the kingdom after Josiah.\n\n3️⃣ Only three months are counted\n\n🏙️ Jerusalem is his capital\n\n⚠️ The reign is very brief\n\nThe phrase stresses how quickly his rule ended."],
    ["He Did That Which Was Evil in the Sight of the LORD", "This means God judged Jehoahaz's conduct as evil. The line shows how quickly Judah returned to bad kingship after Josiah.\n\n⚠️ His conduct is evil\n\n👀 God's sight is the standard\n\n📉 Judah falls back into wrong quickly\n\nThe phrase gives God's verdict on Jehoahaz."],
    ["According to All That His Fathers Had Done", "This means Jehoahaz followed the established pattern of sin in the earlier kings of Judah. Fathers here means forefathers or earlier rulers.\n\n👴 Earlier kings are the pattern\n\n🔁 He repeats inherited evil\n\n⚠️ Josiah's reform is not continued\n\nThe phrase shows him copying former sins."],
  ],
  "2 Kings 23:37": [
    ["He Did That Which Was Evil in the Sight of the LORD", "This means Jehoiakim too was judged by God as evil. The repeated formula shows another king continuing the same problem.\n\n⚠️ Another king is judged evil\n\n👀 God's sight remains the true standard\n\n🔁 The pattern of bad rule continues\n\nThe phrase gives God's verdict on Jehoiakim."],
    ["According to All That His Fathers Had Done", "This means Jehoiakim followed the sinful ways of the earlier kings. He did not break the family pattern of rebellion.\n\n👴 Former kings are the model he copies\n\n🔁 The same sins continue\n\n⚠️ The dynasty does not change course\n\nThe phrase shows continuity in evil."],
    ["Did That Which Was Evil in the Sight", "This repeated fragment still emphasizes God's judgment on the king's conduct. The core point is the same: the reign is morally wrong before God.\n\n⚖️ The divine verdict is central\n\n👀 Evil is measured in God's sight\n\n📖 The formula keeps the judgment clear\n\nThe phrase reinforces the negative evaluation."],
    ["He Did That Which Was Evil in the Sight", "This repeated wording again underlines the same point. The king's reign is not neutral but condemned.\n\n⚠️ The reign is condemned\n\n👀 God is the evaluating witness\n\n🔁 Repetition adds emphasis\n\nThe phrase presses the verdict firmly."],
  ],
  "2 Kings 24:1-6": [
    ["In His Days Nebuchadnezzar King of Babylon Came Up", "This means Babylon's king advanced during Jehoiakim's reign. The phrase introduces Babylon as the rising imperial power now pressing Judah.\n\n👑 Nebuchadnezzar enters the story\n\n⬆️ Came up means marched against or advanced\n\n⚠️ Judah now faces Babylon\n\nThe phrase opens Babylon's involvement in Judah's downfall."],
    ["Jehoiakim Became His Servant Three Years", "This means Jehoiakim submitted to Babylon and served as a vassal for three years. He remained king, but under Babylon's control.\n\n🙇 Jehoiakim becomes subordinate\n\n👑 He serves under Babylon's power\n\n3️⃣ This lasted three years\n\nThe phrase describes political submission to Babylon."],
    ["The LORD Sent Against Him Bands of the Chaldees", "Bands means raiding groups or armed troops. The phrase says God sent hostile forces against Jehoiakim as judgment.\n\n⚔️ Raiding forces are sent\n\n🙏 The LORD is acting through them in judgment\n\n⚠️ Babylonian pressure becomes personal to the king\n\nThe phrase shows judgment arriving through enemy bands."],
    ["Bands of the Syrians", "This means Syrian raiding groups were also part of the hostile forces. Multiple enemy peoples are involved in Judah's trouble.\n\n⚔️ Syrians join the attacks\n\n👥 More than one enemy is involved\n\n📉 Judah is being pressed from several sides\n\nThe phrase adds another group to the judgment forces."],
  ],
  "2 Kings 24:7-12": [
    ["The King of Egypt Came Not Again Any More Out of His Land", "This means Egypt stopped marching out to challenge Babylon in that region. Egypt's power to help Judah is effectively finished.\n\n🚫 Egypt no longer comes out\n\n👑 Its regional influence collapses\n\n⚠️ Judah loses a possible ally\n\nThe phrase marks Egypt's withdrawal from the struggle."],
    ["The King of Egypt Came Not Again Any More", "This repeated wording still stresses Egypt's end as an active power in the region. The political balance has shifted decisively.\n\n👑 Egypt fades from the contest\n\n⚠️ Babylon dominates the scene\n\n📖 The region's power map changes\n\nThe phrase reinforces Egypt's retreat."],
    ["Jehoiachin Was Eighteen Years Old When He Began to Reign", "This means Jehoiachin was eighteen when he became king. His youth stands beside the shortness of his reign.\n\n1️⃣8️⃣ His age is stated\n\n👑 He begins to reign then\n\n📖 The record notes personal detail carefully\n\nThe phrase gives Jehoiachin's age at accession."],
    ["He Reigned in Jerusalem Three Months", "This means Jehoiachin ruled only three months in Jerusalem. The reign is very brief because Babylon quickly takes control.\n\n3️⃣ The reign is brief\n\n🏙️ Jerusalem is the setting\n\n⚠️ Babylon interrupts almost immediately\n\nThe phrase stresses the shortness of his rule."],
  ],
  "2 Kings 24:13-18": [
    ["He Carried Out Thence All the Treasures of the House of the LORD", "This means the Babylonian king took away the temple treasures from Jerusalem. Sacred wealth is removed into exile.\n\n💰 Temple treasures are taken\n\n🏛️ The LORD's house is stripped\n\n⚠️ The loss is both political and sacred\n\nThe phrase describes Babylon plundering the temple."],
    ["The Treasures of the King’s House", "This refers to the palace treasury. Babylon takes royal wealth as well as temple wealth.\n\n🏰 Palace treasure is included\n\n💰 The royal house is emptied too\n\n📉 Judah's strength is being drained\n\nThe phrase widens the plunder beyond the temple."],
    ["He Carried Away All Jerusalem", "This means large numbers of Jerusalem's people were taken into exile. The phrase speaks of deportation, not merely military occupation.\n\n🚚 People are carried away\n\n🏙️ Jerusalem is emptied of many inhabitants\n\n⚠️ Exile has begun in force\n\nThe phrase describes mass deportation from the city."],
    ["All the Princes", "Princes here means leaders, nobles, and high-ranking men. Babylon removes the leadership class along with others.\n\n👑 The upper leadership is taken\n\n📉 The nation's governing strength is weakened\n\n🚚 The exile includes the elite\n\nThe phrase identifies who among the people was deported."],
  ],
  "2 Kings 24:19-20": [
    ["He Did That Which Was Evil in the Sight of the LORD", "This means Zedekiah too was judged by God as evil. Even at the end, Judah's kingship remains spiritually corrupt.\n\n⚠️ The king is judged evil\n\n👀 God's sight remains the standard\n\n📉 The monarchy has not turned back rightly\n\nThe phrase gives God's verdict on Zedekiah."],
    ["According to All That Jehoiakim Had Done", "This means Zedekiah followed the same sinful pattern Jehoiakim had shown. The king repeats earlier rebellion rather than breaking from it.\n\n🔁 He copies Jehoiakim's pattern\n\n👑 Former kings remain the model\n\n⚠️ The sin cycle continues\n\nThe phrase connects Zedekiah to earlier evil."],
    ["He Did That Which Was Evil in the Sight", "This repeated fragment still emphasizes the negative divine evaluation of the king. The reign stands condemned before God.\n\n⚖️ God's verdict is central\n\n👀 The evil is measured before Him\n\n📖 The formula keeps the judgment plain\n\nThe phrase reinforces the condemnation."],
    ["Until He Had Cast Them Out from His Presence", "This means the LORD's patience ended in removal from His presence, especially from the land and city tied to His covenant favor. Cast them out is exile language.\n\n🚚 The people are removed\n\n🙏 It is loss of covenant nearness and place\n\n⚠️ Exile is the final result\n\nThe phrase describes God's judgment as expulsion."],
  ],
  "2 Kings 25:1-6": [
    ["It Came to Pass in the Ninth Year of His Reign", "This dates the beginning of Zedekiah's final siege. The collapse of Jerusalem is tied to a precise year in his reign.\n\n📅 The siege is carefully dated\n\n👑 Zedekiah's reign is the measure\n\n📖 The fall of the city is real history\n\nThe phrase opens the final siege with exact timing."],
    ["In the Tenth Month", "This gives the month when the Babylonian siege began. The Bible slows down to mark the timeline of Jerusalem's fall carefully.\n\n🗓️ The month is specified\n\n📖 The history is being tracked closely\n\n⚠️ The long siege has a clear starting point\n\nThe phrase adds precision to the siege timeline."],
    ["The City Was Besieged unto the Eleventh Year of King Zedekiah", "This means Jerusalem remained under siege until Zedekiah's eleventh year. The phrase shows how long the city was trapped.\n\n🏙️ Jerusalem is under siege\n\n⏳ The suffering lasts years\n\n⚠️ The pressure is prolonged and relentless\n\nThe phrase describes the long duration of the siege."],
    ["Was Besieged unto the Eleventh", "This repeated wording still emphasizes how long the city stayed trapped. The focus is the drawn-out suffering of the siege.\n\n⏳ The siege drags on\n\n🏙️ The city cannot escape it\n\n📉 The crisis deepens over time\n\nThe phrase reinforces the length of the siege."],
  ],
  "2 Kings 25:7-12": [
    ["They Slew the Sons of Zedekiah Before His Eyes", "This means Zedekiah was forced to watch his sons being killed. The cruelty makes the judgment intensely personal.\n\n💀 His sons are killed\n\n👀 Zedekiah is forced to see it\n\n⚠️ The punishment is emotionally devastating\n\nThe phrase describes a brutal scene of judgment."],
    ["Put Out the Eyes of Zedekiah", "This means the Babylonians blinded Zedekiah after killing his sons. His last sight was the death of his heirs.\n\n👁️ Zedekiah is blinded\n\n⚠️ The punishment is severe and symbolic\n\n💔 His final sight remains horrific\n\nThe phrase describes his physical humiliation and ruin."],
    ["In the Fifth Month", "This gives the month when the destruction phase of Jerusalem's fall continued. The line marks another dated step in the collapse.\n\n🗓️ The month is named\n\n📖 The timeline continues carefully\n\n⚠️ Another stage of destruction has arrived\n\nThe phrase places the event in time."],
    ["On the Seventh Day of the Month", "This means the next action occurred on the seventh day of that month. The record continues to date the fall in detail.\n\n7️⃣ A specific day is marked\n\n📅 The destruction is chronologically tracked\n\n📖 The event is treated as real history\n\nThe phrase gives the exact day of the event."],
  ],
  "2 Kings 25:13-18": [
    ["The Pillars of Brass That Were in the House of the LORD", "These were the great bronze pillars associated with Solomon's temple. Their removal shows the stripping of the temple's glory.\n\n🏛️ Major temple structures are in view\n\n🟤 Brass means bronze here\n\n⚠️ The temple is being dismantled\n\nThe phrase points to the loss of its grand features."],
    ["The Brasen Sea That Was in the House of the LORD", "The brasen sea was the large bronze basin used in temple service. Even this major sacred object is taken apart and removed.\n\n🌊 The great bronze basin is meant\n\n🏛️ It belonged to temple worship\n\n⚠️ The sacred furnishings are being stripped away\n\nThe phrase names another major temple object taken."],
    ["All the Vessels of Brass Wherewith They Ministered", "These were the bronze utensils used in temple ministry and service. The Babylonians take even the practical worship tools.\n\n🥣 Ministry vessels are included\n\n🏛️ They were used in temple service\n\n💰 Even functional sacred items are carried off\n\nThe phrase shows worship equipment being removed."],
    ["Took They Away", "This means the Babylonians carried these temple items away from Jerusalem. The phrase completes the picture of plunder.\n\n🚚 The items are removed from the city\n\n🏛️ Temple wealth is taken into exile\n\n⚠️ Jerusalem is left stripped\n\nThe phrase states the act of carrying them off."],
  ],
  "2 Kings 25:19-24": [
    ["Out of the City He Took an Officer That Was Set Over the Men of War", "This means a military officer was taken out of Jerusalem after the city fell. The conquerors are selecting important figures for judgment.\n\n🪖 A war officer is seized\n\n🏙️ He is taken out of the city\n\n⚖️ Babylon targets leaders after victory\n\nThe phrase names one of the captured officials."],
    ["Five Men of Them That Were in the King’s Presence", "This means five court officials close to the king were taken as prisoners. In the king's presence means part of the inner royal circle.\n\n5️⃣ Five royal attendants are taken\n\n👑 They belonged to the king's inner circle\n\n⚠️ Leadership is being removed systematically\n\nThe phrase identifies elite court prisoners."],
    ["Nebuzar-adan Captain of the Guard Took These", "Nebuzar-adan, Babylon's guard commander, is the one who seized these officials. He is carrying out the conqueror's judgment on Judah's leaders.\n\n👤 The Babylonian commander is named\n\n⚔️ He handles the captives directly\n\n📖 The fall is administered by real imperial officers\n\nThe phrase identifies who took the prisoners."],
    ["Brought Them to the King of Babylon to Riblah", "This means the captured leaders were brought to Nebuchadnezzar at Riblah, where royal judgments were made. Riblah becomes the place of sentence.\n\n🚚 The prisoners are transported\n\n👑 Babylon's king will decide their fate\n\n📍 Riblah is the judgment site\n\nThe phrase places the captives before the conqueror."],
  ],
  "2 Kings 25:25-30": [
    ["It Came to Pass in the Seventh Month", "This marks the next event after Jerusalem's fall, dated by the seventh month. Even after the city's destruction, the history continues carefully.\n\n📅 The next event is dated\n\n📖 The narrative moves into aftermath\n\n⚠️ Trouble continues after the fall\n\nThe phrase opens the post-destruction episode."],
    ["That Ishmael the Son of Nethaniah", "This identifies Ishmael by his father as the man at the center of the coming violence. The story wants the culprit named clearly.\n\n👤 Ishmael is identified\n\n👨 His father is named\n\n⚠️ He is about to play a deadly role\n\nThe phrase points to the man behind the attack."],
    ["All the People", "This means the broader group of survivors was involved or affected, not only a few officials. The aftermath reaches the community.\n\n👥 The people as a whole are in view\n\n📖 The event is communal, not private only\n\n⚠️ The shock spreads widely\n\nThe phrase widens the scope beyond leaders."],
    ["Both Small and Great", "This means all social levels, from less important to more important people. No class of survivor is outside the effect of the event.\n\n👥 Everyone is included\n\n📉 Rank does not protect from the crisis\n\n📖 The wording stresses totality\n\nThe phrase means people of every level were involved."],
  ],
};

function rewriteDay93SecondKingsSection(section: KingdomDeclinePhraseSectionInput): KingdomDeclinePhraseSectionInput {
  const overrides = DAY_93_SECOND_KINGS_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const DAY_94_FIRST_CHRONICLES_SPECIAL_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "1 Chronicles 1:19-24": [
    ["The Name of the One Was Peleg", "Peleg is one of Eber's two sons, and his name is being singled out on purpose. The genealogy slows down here to mark him out from the longer list.\n\n👤 One son is singled out\n\n📜 His name matters in the family line\n\n⏸️ The list slows down for him\n\nThe phrase highlights Peleg as a notable branch in the genealogy."],
  ],
  "1 Chronicles 1:25-30": [
    ["The Same Is Abraham", "This means Abram is the same person later known as Abraham. The genealogy is connecting the older name with the name most readers recognize.\n\n👤 Abram and Abraham are the same man\n\n📜 The family line has reached a major figure\n\n🧠 The name link prevents confusion\n\nThe phrase identifies Abram by the name Abraham."],
    ["Abram; the Same Is Abraham", "This means the man first called Abram is the same person later called Abraham. The wording makes the name change clear inside the genealogy.\n\n👤 One man has both names\n\n📖 The genealogy has reached Abraham\n\n🧠 The line keeps the identity clear\n\nThe phrase explains the name connection directly."],
  ],
  "1 Chronicles 2:7-12": [
    ["The Troubler of Israel", "This title refers to Achan, whose sin brought trouble and judgment on Israel. Troubler means someone whose wrongdoing brought disaster on the people.\n\n⚠️ One man's sin harmed the nation\n\n👤 The title points to Achan\n\n📖 The genealogy pauses to name the offense\n\nThe phrase recalls the man who brought trouble on Israel."],
  ],
  "1 Chronicles 2:49-54": [
    ["She Bare Also Shaaph the Father of Madmannah", "Father of Madmannah here likely means ancestor or founder of the people connected with that place, not only a direct parent of one individual. The genealogy links a man to a town or clan line.\n\n👨 Father can mean founder or leading ancestor\n\n🏙️ Madmannah is the place tied to him\n\n📜 The line connects people and settlements\n\nThe phrase links Shaaph to the family or town that came from him."],
    ["Sheva the Father of Machbenah", "Father of Machbenah likely means founding ancestor of the people or settlement connected with Machbenah. Chronicles often ties family names to places this way.\n\n👨 Father can mean founding ancestor\n\n🏙️ Machbenah is the place or clan named\n\n📖 The genealogy joins family and land together\n\nThe phrase links Sheva to the group or place that came from him."],
  ],
  "1 Chronicles 2:55": [
    ["The Families of the Scribes Which Dwelt at Jabez", "This means clans of scribes lived at Jabez. Scribes were men connected with writing, records, and learned work, so the genealogy is naming a community known for that role.\n\n✍️ Scribes worked with writing and records\n\n🏠 Whole families are identified with that work\n\n📍 Jabez is where they lived\n\nThe phrase names a scribal community at Jabez."],
    ["These Are the Kenites That Came of Hemath", "This means these families belonged to the Kenites and traced their line back to Hemath. The genealogy is identifying both their people-group and their ancestor line.\n\n🌍 The Kenites are the people-group\n\n👨 Hemath is the ancestor named\n\n📜 The line explains where these families came from\n\nThe phrase identifies the ancestry of the Kenite scribal families."],
  ],
  "1 Chronicles 3:1-6": [
    ["Now These Were the Sons of David", "This means the list is now naming David's sons. The genealogy has reached the royal house and is tracing David's family line.\n\n👑 David's family line is now in view\n\n👶 His sons are being named\n\n📜 The genealogy has reached the royal household\n\nThe phrase introduces the sons of David."],
    ["Which Were Born unto Him in Hebron", "This means these sons were born to David while he was living and ruling in Hebron. The place matters because it marks an earlier stage of David's kingship.\n\n👶 These sons were born there\n\n🏙️ Hebron is the location\n\n👑 The list is tied to David's early reign\n\nThe phrase links these sons to David's Hebron years."],
    ["Absalom the Son of Maachah the Daughter of Talmai King of Geshur", "This identifies Absalom through both his mother and her royal family. The line shows his connection to another kingly house through Maachah.\n\n👤 Absalom is being identified carefully\n\n👩 His mother is named\n\n👑 Her father was a foreign king\n\nThe phrase traces Absalom's royal family connection through his mother."],
    ["Adonijah the Son of Haggith", "This means Adonijah is identified by his mother Haggith. Chronicles often uses the mother's name to distinguish one royal son from another.\n\n👤 Adonijah is named as one of David's sons\n\n👩 His mother is given for clarity\n\n📖 The royal line is being carefully sorted\n\nThe phrase identifies Adonijah within David's family."],
  ],
  "1 Chronicles 4:31-36": [
    ["These Were Their Cities unto the Reign of David", "This means these towns belonged to that family line until the time of David's reign. The phrase is tracking how long their settlement pattern lasted.\n\n🏙️ Their towns are being listed\n\n📅 David's reign is the time marker\n\n📖 The genealogy is also preserving settlement history\n\nThe phrase explains how long those cities were theirs."],
    ["Their Villages Were", "This means the smaller villages connected to their towns are now being listed. Chronicles is preserving the map of where the family groups lived.\n\n🏡 The smaller villages are in view\n\n📍 The family territory is being mapped\n\n📜 The list preserves settlement details\n\nThe phrase introduces the connected villages."],
    ["These Mentioned by Their Names Were Princes in Their Families", "Princes here means chief men or clan leaders, not fairy-tale princes. The phrase says these named men were leading figures in their family groups.\n\n👥 These men led their family groups\n\n👑 Princes means chiefs or leaders here\n\n📖 Their names are preserved because they mattered\n\nThe phrase identifies them as clan leaders."],
    ["The House of Their Fathers Increased Greatly", "House of their fathers means their clan or extended family line. Increased greatly means that family group grew very large.\n\n🏠 The phrase means their family clan\n\n📈 The clan grew in size\n\n📜 The genealogy records growth as well as names\n\nThe phrase says their family line became much larger."],
  ],
  "1 Chronicles 4:43": [
    ["They Smote the Rest of the Amalekites That Were Escaped", "This means they killed the remaining Amalekites who had survived earlier defeat. Escaped means those who were left alive before this attack.\n\n⚔️ The survivors are struck down\n\n👥 The remaining Amalekites are meant\n\n📖 The action finishes an older conflict\n\nThe phrase describes the defeat of the last escaped Amalekites."],
    ["Dwelt There unto This Day", "This means those families continued living there up to the writer's own time. Unto this day is a way of linking the old event to the time of writing.\n\n🏠 They stayed in that place\n\n📅 The settlement lasted into the writer's day\n\n📖 The phrase connects past history to the present record\n\nThe phrase says they remained there for a long time."],
  ],
  "1 Chronicles 5:1-6": [
    ["For He Was the Firstborn", "This means Reuben really was Jacob's oldest son by birth. The genealogy is acknowledging his birth status before explaining why the leading honor passed elsewhere.\n\n1️⃣ Reuben was born first\n\n👨 Birth order is being recognized\n\n📖 The record is setting up an important exception\n\nThe phrase confirms Reuben's place as the firstborn by birth."],
    ["For Judah Prevailed Above His Brethren", "Prevailed above his brethren means Judah became stronger or more prominent than the other brothers. The line explains why rulership significance came through Judah.\n\n👑 Judah rose above the others in prominence\n\n👥 His brethren means the other tribes or brothers\n\n📖 Leadership importance shifts toward Judah\n\nThe phrase explains Judah's greater place in the family line."],
    ["Of Him Came the Chief Ruler", "This means the leading ruler came from Judah's line. Chronicles is pointing toward the royal line that later comes through Judah.\n\n👑 A ruling line comes from Judah\n\n📜 The phrase looks toward royal leadership\n\n🔁 Genealogy is being tied to kingship\n\nThe phrase says the chief ruler would come from Judah."],
  ],
  "1 Chronicles 5:7-12": [
    ["When the Genealogy of Their Generations Was Reckoned", "Reckoned means counted or officially recorded. The phrase says this family line was entered into the genealogical record by generations.\n\n📜 The family line was officially recorded\n\n🔢 Reckoned means counted or registered\n\n👥 The generations were tracked carefully\n\nThe phrase explains that the genealogy was formally entered by generations."],
  ],
  "1 Chronicles 5:19-24": [
    ["They Made War with the Hagarites", "This means these tribes fought against the Hagarites in battle. The phrase records open conflict with neighboring peoples.\n\n⚔️ A real battle is taking place\n\n👥 The Hagarites are the enemy named\n\n📖 The genealogy pauses to remember warfare too\n\nThe phrase says they fought a war with the Hagarites."],
    ["War with the Hagarites, with", "This repeated fragment still points to the conflict against the Hagarites and their allies. The line is listing the peoples involved in that war.\n\n⚔️ The conflict includes several enemy groups\n\n👥 The Hagarites are central among them\n\n📖 The battle line is being specified\n\nThe phrase expands the list of peoples involved in the war."],
    ["Hagarites, with Jetur, and Nephish", "This means the conflict involved the Hagarites along with Jetur and Nephish. Chronicles is naming the peoples who stood on the opposing side.\n\n👥 Several related groups are named\n\n⚔️ They were all part of the conflict\n\n📜 The record keeps the enemy peoples specific\n\nThe phrase lists the peoples fought in that war."],
    ["They Were Helped Against Them", "This means the tribes received help in battle against their enemies. The context shows that God answered when they cried to Him.\n\n🙏 Help came in battle\n\n⚔️ The victory was not by human strength alone\n\n✅ The enemy was overcome with divine help\n\nThe phrase says they were helped against their foes."],
  ],
  "1 Chronicles 5:25-26": [
    ["They Transgressed Against the God of Their Fathers", "Transgressed means broke God's law or crossed the boundary of obedience. The phrase says these tribes sinned against the God their fathers had known.\n\n⚠️ They broke covenant obedience\n\n🙏 The sin was against their own ancestral God\n\n📖 The exile has a moral cause\n\nThe phrase says they rebelled against the God of their fathers."],
    ["Went a Whoring After the Gods of the People of the Land", "Went a whoring is strong Bible language for spiritual unfaithfulness. It means they chased false gods instead of remaining loyal to the LORD.\n\n🛐 They pursued false gods\n\n💔 The image is one of covenant unfaithfulness\n\n⚠️ Their loyalty to the LORD was broken\n\nThe phrase describes spiritual adultery through idolatry."],
    ["The God of Israel Stirred Up the Spirit of Pul King of Assyria", "Stirred up the spirit means God moved the Assyrian king to act. The exile is not random politics only but part of God's judgment.\n\n🙏 God is the deeper mover in the event\n\n👑 Assyria's king is stirred to action\n\n⚖️ Judgment comes through empire\n\nThe phrase says God moved Pul to carry out judgment."],
    ["The Spirit of Tilgath-pilneser King of Assyria", "This refers to the inward impulse or will of the Assyrian king being stirred to act. Chronicles is explaining that the great empire moved under God's sovereignty.\n\n👑 The Assyrian king's will is involved\n\n🙏 God governs even foreign rulers\n\n📖 The exile is tied to divine rule over nations\n\nThe phrase points to the spirit or will of Assyria's king being stirred."],
  ],
  "1 Chronicles 6:31-36": [
    ["These Are They Whom David Set Over the Service of Song in the House of the LORD", "This means David appointed specific men to lead the music ministry in the LORD's house. Service of song refers to organized worship through singing.\n\n🎵 Worship by song is being organized\n\n👑 David appoints the leaders\n\n🏛️ The service belongs to the LORD's house\n\nThe phrase introduces the men David placed over temple singing."],
    ["After That the Ark Had Rest", "This means after the ark had been brought to a settled place instead of moving from place to place. Rest here means stable placement.\n\n📦 The ark is no longer in motion\n\n🏠 It now has a settled place\n\n🎵 Worship service develops after that stability\n\nThe phrase marks the time after the ark was settled."],
    ["They Ministered Before the Dwelling Place of the Tabernacle of the Congregation with Singing", "Ministered means served in worship. The phrase describes Levites serving before the tabernacle by singing.\n\n🎵 Singing is part of holy service\n\n🙏 The Levites minister before God's dwelling place\n\n🏛️ Worship includes ordered musical service\n\nThe phrase explains that they served at the tabernacle with song."],
    ["Until Solomon Had Built the House of the LORD in Jerusalem", "This means the singing ministry continued until the temple was built by Solomon. The phrase links tabernacle worship to the later temple.\n\n🏛️ Solomon's temple becomes the next stage\n\n🎵 The service continued until then\n\n📖 The line connects two eras of worship\n\nThe phrase marks the transition from tabernacle to temple."],
  ],
  "1 Chronicles 6:49-54": [
    ["Aaron and His Sons Offered Upon the Altar", "This means Aaron's line carried out the sacrificial work at the altar. The phrase highlights the priestly duties that belonged especially to his family.\n\n🔥 Sacrificial service is in view\n\n👨 Aaron's family held this priestly role\n\n🏛️ The altar is the place of offering\n\nThe phrase says Aaron's sons handled altar offerings."],
    ["On the Altar of Incense", "This refers to the special altar where incense was burned before the LORD. It was different from the larger altar used for animal offerings.\n\n🕯️ This altar was for incense\n\n🏛️ It had a distinct role in worship\n\n🙏 The phrase names a specific sacred object\n\nThe phrase points to the incense altar used in temple service."],
    ["These Are the Sons of Aaron", "This means the genealogy is now naming Aaron's priestly family line. The line is important because Aaron's descendants held the priesthood.\n\n👨 Aaron's own line is now in view\n\n🙏 This is the priestly family\n\n📜 The genealogy is narrowing to the priesthood\n\nThe phrase introduces the sons or descendants of Aaron."],
  ],
  "1 Chronicles 6:55-60": [
    ["They Gave Them Hebron in the Land of Judah", "This means the Levites were assigned Hebron in Judah as one of their cities. The phrase records the distribution of priestly towns.\n\n🏙️ Hebron is assigned to them\n\n🙏 Levites receive cities rather than one tribal territory\n\n📖 The land allotment is being recorded\n\nThe phrase says Hebron was given to them in Judah."],
    ["The Suburbs Thereof Round About It", "Suburbs here means the open pasturelands or surrounding lands around the city, not modern suburbs. These lands supported the city and its livestock.\n\n🌿 The lands around the city are meant\n\n🏙️ They belong with the city assignment\n\n🧠 The word does not mean modern suburbs\n\nThe phrase refers to the pasturelands around the city."],
    ["But the Fields of the City", "This means the farmland outside the city itself is being distinguished from the city proper. The phrase separates urban and rural portions of the allotment.\n\n🌾 The farmland is being specified\n\n🏙️ City and field are treated separately\n\n📖 The land record is precise\n\nThe phrase points to the fields belonging to the city area."],
    ["The Villages Thereof", "This means the smaller settlements connected to that city. Chronicles is preserving not just major cities but the surrounding villages too.\n\n🏡 Smaller linked settlements are meant\n\n🏙️ They belong to the larger city area\n\n📜 The land record includes nearby villages\n\nThe phrase refers to the villages connected with the city."],
  ],
  "1 Chronicles 6:67-72": [
    ["They Gave unto Them", "This means certain cities were assigned to the Levites. The phrase introduces the next set of priestly town allotments.\n\n🏙️ Cities are being assigned\n\n🙏 Levite distribution continues\n\n📖 Another portion of the allotment is beginning\n\nThe phrase opens the list of cities given to them."],
    ["Of the Cities of Refuge", "Cities of refuge were special towns where a person accused in a killing case could flee for protection until judgment. The phrase points to those protected legal cities.\n\n🏃 These were protected refuge cities\n\n⚖️ They served a legal and merciful purpose\n\n🏙️ The allotment includes these important towns\n\nThe phrase names the cities of refuge."],
    ["Jokmeam with Her Suburbs", "This means the city Jokmeam and the pasturelands around it were included in the allotment. Her suburbs refers to the lands belonging with the city.\n\n🏙️ Jokmeam is the city named\n\n🌿 The surrounding lands are included\n\n📖 The allotment records both city and outskirts\n\nThe phrase lists Jokmeam with its pasturelands."],
    ["Beth-horon with Her Suburbs", "This means Beth-horon and the lands around it were given as part of the distribution. The phrase keeps the land list specific.\n\n🏙️ Beth-horon is assigned\n\n🌿 Its surrounding lands go with it\n\n📜 The allotment remains detailed\n\nThe phrase names Beth-horon with its pasturelands."],
  ],
  "1 Chronicles 6:73-78": [
    ["Ramoth with Her Suburbs", "This means the city Ramoth and the lands around it were part of the Levite allotment. The wording follows the pattern of city plus pastureland.\n\n🏙️ Ramoth is included\n\n🌿 Its surrounding lands go with it\n\n📖 The town allotment stays precise\n\nThe phrase lists Ramoth with its pasturelands."],
    ["Anem with Her Suburbs", "This means Anem and the lands around it were also given. The phrase continues the list of Levite towns.\n\n🏙️ Anem is another assigned town\n\n🌿 Its outlying lands are included\n\n📜 The distribution continues town by town\n\nThe phrase names Anem with its pasturelands."],
    ["Out of the Tribe of Asher", "This means the towns now being listed came from Asher's tribal territory. The record keeps track of which tribe each city came from.\n\n🗺️ Asher is the tribal source\n\n🏙️ The cities are drawn from that region\n\n📖 The allotment is organized by tribe\n\nThe phrase identifies the tribal territory involved."],
    ["Mashal with Her Suburbs", "This means Mashal and the lands around it were included in the assignment. Again the phrase names both town and surrounding land.\n\n🏙️ Mashal is assigned\n\n🌿 Its pasturelands are included\n\n📜 The list remains detailed and specific\n\nThe phrase names Mashal with its pasturelands."],
  ],
  "1 Chronicles 6:79-81": [
    ["Kedemoth Also with Her Suburbs", "This means Kedemoth and its surrounding lands were part of the town distribution. Also shows it belongs in the ongoing list.\n\n🏙️ Kedemoth is included too\n\n🌿 The surrounding lands are part of the gift\n\n📜 The allotment continues one town at a time\n\nThe phrase lists Kedemoth with its pasturelands."],
    ["Mephaath with Her Suburbs", "This means Mephaath and its surrounding lands were assigned as well. The pattern continues of naming city and outskirts together.\n\n🏙️ Mephaath is assigned\n\n🌿 Its connected lands are included\n\n📖 The distribution remains exact\n\nThe phrase names Mephaath with its pasturelands."],
    ["Out of the Tribe of Gad", "This means the towns now listed came from the tribal territory of Gad. The phrase keeps the geographic source clear.\n\n🗺️ Gad is the tribal region in view\n\n🏙️ The towns come from that territory\n\n📜 The record tracks where each gift came from\n\nThe phrase identifies Gad as the source region."],
    ["Ramoth in Gilead with Her Suburbs", "This means the city Ramoth in the region of Gilead, along with its surrounding lands, was part of the allotment. The region helps distinguish it from other places named Ramoth.\n\n🏙️ Ramoth in Gilead is the city named\n\n🌿 Its surrounding lands are included\n\n🗺️ Gilead identifies the location more clearly\n\nThe phrase lists Ramoth in Gilead with its pasturelands."],
  ],
  "1 Chronicles 8:7-12": [
    ["He Removed Them", "This means the people named were sent away or relocated. The phrase marks a movement of family members from one place to another.\n\n🚚 People are moved away\n\n🏠 Their living place changes\n\n📖 The genealogy is tracking relocation as well as birth\n\nThe phrase says they were removed or sent away."],
    ["Shaharaim Begat Children in the Country of Moab", "This means Shaharaim fathered children while in the land of Moab. The genealogy is tying his family line to a specific foreign location.\n\n👶 Children are born there\n\n🗺️ Moab is the place named\n\n📜 The family line is linked to that location\n\nThe phrase says his descendants were born in Moab."],
    ["After He Had Sent Them Away", "This means the births mentioned happened after Shaharaim had sent certain people away. The phrase gives the timing of the family development.\n\n📅 The action happened afterward\n\n🚚 Earlier removal is the time marker\n\n📖 The genealogy is ordering events carefully\n\nThe phrase explains when this part of the family line developed."],
    ["He Begat of Hodesh His Wife", "This means Shaharaim fathered children by his wife Hodesh. The phrase names the mother linked to that part of the family line.\n\n👨‍👩‍👧 A particular wife is identified\n\n👶 The children come through her\n\n📜 The genealogy stays careful about the family branch\n\nThe phrase ties that branch of children to Hodesh."],
  ],
  "1 Chronicles 8:13-18": [
    ["Who Were Heads of the Fathers of the Inhabitants", "Heads of the fathers means clan chiefs or leading family heads. The phrase identifies these men as leaders among the inhabitants.\n\n👥 These were clan leaders\n\n👑 Heads means chiefs, not literal heads\n\n📜 Their names matter because they led families\n\nThe phrase identifies them as chief fathers among the inhabitants."],
    ["Who Drove Away the Inhabitants of Gath", "This means the men named drove out people living in Gath. The phrase records a forceful displacement or victory over local inhabitants.\n\n⚔️ The inhabitants are driven out\n\n🏙️ Gath is the place involved\n\n📖 The genealogy remembers a military or settlement action\n\nThe phrase says they expelled the inhabitants of Gath."],
  ],
};

function stripChroniclesPhraseTitle(title: string): string {
  return title.replace(/^[^A-Za-z0-9]+/, "").trim();
}

function day94ChroniclesFallbackBody(plain: string): string {
  if (plain.startsWith("These Are the Sons of ")) {
    const name = plain.replace("These Are the Sons of ", "").trim();
    return `This means the genealogy is now listing the descendants or family line that came from ${name}. The phrase marks the start of a new branch in the record.\n\n👥 A family branch is being named\n\n📜 Descendants are now listed\n\n🔁 The genealogy is moving to a new line\n\nThe phrase introduces the descendants connected with ${name}.`;
  }

  if (plain.startsWith("Now These Are the Sons of ")) {
    const name = plain.replace("Now These Are the Sons of ", "").trim();
    return `This means the genealogy is now listing the descendants or family line that came from ${name}. The wording opens a fresh branch in the record.\n\n👥 A family line is being opened\n\n📜 Descendants are about to be named\n\n🔁 The genealogy moves to a new branch\n\nThe phrase introduces the sons or descendants of ${name}.`;
  }

  if (plain.startsWith("The Sons of ")) {
    const name = plain.replace("The Sons of ", "").trim();
    return `The sons of ${name} means the descendants or family line that came from ${name}. In a genealogy like this, sons can mean the branch that grew from that ancestor.\n\n👥 A descendant line is in view\n\n👨 ${name} is the ancestor named\n\n📜 The genealogy follows that branch forward\n\nThe phrase introduces the family line of ${name}.`;
  }

  if (plain.includes(" Begat ")) {
    const [parent, child] = plain.split(" Begat ", 2);
    return `Begat means became the father of. The phrase says ${parent.trim()} is the next father named in the line leading to ${child.trim()}.\n\n👨 A father-to-child link is being marked\n\n📜 The family line moves forward one generation\n\n🔁 The genealogy stays connected step by step\n\nThe phrase records the next father and descendant in the line.`;
  }

  if (plain.includes(" Reigned in His Stead")) {
    const [name] = plain.split(" Reigned in His Stead", 1);
    return `Reigned in his stead means ${name.trim()} became king after the previous ruler died. The phrase marks royal succession from one king to the next.\n\n👑 A new king takes the throne\n\n🔁 One ruler replaces another\n\n📖 The line of kings keeps moving forward\n\nThe phrase records who ruled next.`;
  }

  if (plain.includes(" Was Dead") || plain.startsWith("When ") && plain.includes(" Was Dead")) {
    return `This means the earlier person named had died, and the genealogy or king list is now moving to the next figure. The phrase marks a transition after death.\n\n💀 Death closes one part of the record\n\n🔁 The next person now comes forward\n\n📖 The line continues after loss\n\nThe phrase shows the record moving on after someone's death.`;
  }

  if (plain.includes(" Firstborn")) {
    return `Firstborn means the oldest son, the one first in birth order. The phrase helps the reader understand where this person stands inside the family line.\n\n1️⃣ The oldest son is being identified\n\n👨 Birth order matters in the genealogy\n\n📜 The family structure is being clarified\n\nThe phrase marks the firstborn in the line.`;
  }

  if (plain.includes(" His Son")) {
    return `His son means the person named next is the child or descendant line directly following the earlier name. The phrase keeps the family chain moving one step forward.\n\n👨 A father-and-son link is being shown\n\n📜 The line stays connected clearly\n\n🔁 One generation follows another\n\nThe phrase records the next son in the family line.`;
  }

  if (plain.includes(" the Son of ")) {
    return `The son of means the person is being identified by his father or family connection. Genealogies use this wording to keep names from becoming confusing.\n\n👨 A father is named for clarity\n\n👤 The person's identity is being pinned down\n\n📜 The line remains specific and traceable\n\nThe phrase identifies someone through his father.`;
  }

  if (plain.includes("Were Born Two Sons")) {
    return `This means the man named had two sons. The genealogy pauses to mark that his family line split into two branches.\n\n👶 Two sons are being noted\n\n🔀 The family line branches here\n\n📜 The record is preparing for two directions\n\nThe phrase marks a split in the genealogy.`;
  }

  if (plain.includes("Were Born unto Him in ")) {
    return `This means the people named were born to that father in the place mentioned. The location helps track where that part of the family story unfolded.\n\n👶 Births are tied to one father\n\n📍 The place is part of the record\n\n📖 Family and location are being linked\n\nThe phrase records where those children were born.`;
  }

  if (plain.includes("Families of the Scribes")) {
    return `This means the genealogy is naming whole family groups connected with scribal work. Scribes were people associated with writing and records.\n\n✍️ Scribes worked with writing and records\n\n🏠 Whole family groups are in view\n\n📜 The genealogy preserves their community identity\n\nThe phrase names scribal families in the record.`;
  }

  if (plain.includes("Cities") || plain.includes("Villages")) {
    return `This phrase is naming places where that family line lived. Chronicles is not only preserving people but also the towns and villages connected with them.\n\n🏙️ Settlements are being listed\n\n🏠 Family life is tied to real places\n\n📜 The record preserves the map of the clan\n\nThe phrase explains where that group lived.`;
  }

  if (plain.includes("Dwelt There unto This Day")) {
    return `This means the people or family line still lived there up to the writer's own time. It connects the old genealogy with the later present.\n\n🏠 They remained in that place\n\n📅 The settlement lasted a long time\n\n📖 The phrase links past history to the writer's day\n\nThe phrase says they were still living there then.`;
  }

  if (plain.includes("Were Princes in Their Families")) {
    return `Princes here means chief men or leaders within their family groups. The phrase is identifying the men who held leading roles in the clan.\n\n👑 Princes means leaders here\n\n👥 The family groups had recognized chiefs\n\n📜 Their names are preserved because of that role\n\nThe phrase identifies clan leaders.`;
  }

  if (plain.includes("House of Their Fathers Increased Greatly")) {
    return `House of their fathers means their larger family clan. Increased greatly means that clan grew much larger in number.\n\n🏠 A family clan is meant\n\n📈 It grew in size\n\n📜 The genealogy records growth as well as names\n\nThe phrase says the family group became numerous.`;
  }

  if (plain.includes("Now These Are the Kings That Reigned in the Land of Edom")) {
    return `This means the record is now listing the kings who ruled Edom before Israel had kings of its own. The phrase compares Edom's royal history with Israel's later monarchy.\n\n👑 Edom's kings are being listed\n\n📅 Their rule came before Israel's monarchy\n\n📖 The genealogy now shifts from families to kings\n\nThe phrase introduces the early kings of Edom.`;
  }

  if (/^[A-Z][a-z]+(?:, [A-Z][a-z]+)+(?:,? and [A-Z][a-z]+)?/.test(plain) || plain.includes(", and ")) {
    return `This line is naming people in sequence inside the family record. The genealogy preserves real names so the line can be followed from one generation or branch to the next.\n\n👥 A chain of names is being preserved\n\n📜 The family line is being traced carefully\n\n🔁 The record moves step by step through the branch\n\nThe phrase keeps the genealogy moving forward through named people.`;
  }

  return `This phrase is part of the family record in Chronicles. It is naming a real person, relationship, or branch so the genealogy can be followed clearly.\n\n👤 A real person or branch is being named\n\n📜 The genealogy is preserving the line carefully\n\n🧠 The wording keeps the record understandable\n\nThe phrase helps the reader follow the family line.`;
}

function rewriteDay94FirstChroniclesSection(section: KingdomDeclinePhraseSectionInput): KingdomDeclinePhraseSectionInput {
  if (section.book !== "1 Chronicles" || ![1, 2, 3, 4, 5, 6, 7, 8].includes(section.chapter)) return section;
  const overrides = DAY_94_FIRST_CHRONICLES_SPECIAL_OVERRIDES[section.reference] ?? [];

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const special = overrides.find(([fragment]) => title.includes(fragment));
      if (special) return [title, special[1]];

      const plain = stripChroniclesPhraseTitle(title);
      return [title, day94ChroniclesFallbackBody(plain) || body];
    }),
  };
}

const sections = [
  {
    book: "1 Kings",
    chapter: 16,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 16:1-6",
    title: "Then the Word of the LORD Came to Jehu",
    icon: "⛰️",
    phrases: [
      [
        "🙏 Then the Word of the LORD Came to Jehu the Son of Hanani Against Baasha",
        "Then the Word of the LORD Came to Jehu the Son of Hanani Against Baasha keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "✨ Then the Word of the LORD Came to Jehu",
        "Then the Word of the LORD Came to Jehu keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "🗡️ Came to Jehu the Son",
        "Came to Jehu the Son gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🛡️ Forasmuch as I Exalted Thee Out of the Dust",
        "Forasmuch as I Exalted Thee Out of the Dust gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 16,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 16:7-12",
    title: "Also by the Hand of the Prophet Jehu",
    icon: "🏠",
    phrases: [
      [
        "🙏 Also by the Hand of the Prophet Jehu the Son of Hanani Came the Word of the LORD Against Baasha",
        "Also by the Hand of the Prophet Jehu the Son of Hanani Came the Word of the LORD Against Baasha keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "🏠 Against His House",
        "Against His House can mean more than a building.\n\nIn Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership choices can affect an entire household after the leader is gone."
      ],
      [
        "👑 In the Twenty and Sixth Year of Asa King of Judah Began Elah the Son of Baasha to Reign Over Israel in Tirzah",
        "In the Twenty and Sixth Year of Asa King of Judah Began Elah the Son of Baasha to Reign Over Israel in Tirzah is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ],
      [
        "✨ Also by the Hand of the Prophet Jehu",
        "Also by the Hand of the Prophet Jehu points to a message that comes with authority.\n\nA prophet is not giving a private opinion. He is speaking because God has sent His word into the situation.\n\n\n\n📜 God's message\n\n🙏 A messenger sent\n\n⚠️ A warning to hear\n\n\n\nThe phrase helps the reader understand that ignoring the prophet means ignoring the LORD who sent him."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 16,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 16:13-18",
    title: "For All the Sins of Baasha",
    icon: "😢",
    phrases: [
      [
        "⚠️ For All the Sins of Baasha",
        "For All the Sins of Baasha names rebellion clearly.\n\nThe Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.\n\n\n\n⚠️ Sin named\n\n💛 A heart turned away\n\n🙏 God sees it\n\n\n\nThe phrase helps the reader see why judgment comes and why false worship damages the whole nation."
      ],
      [
        "✨ The Sins of Elah His Son",
        "The Sins of Elah His Son names rebellion clearly.\n\nThe Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.\n\n\n\n⚠️ Sin named\n\n💛 A heart turned away\n\n🙏 God sees it\n\n\n\nThe phrase helps the reader see why judgment comes and why false worship damages the whole nation."
      ],
      [
        "🗡️ Now the Rest of the Acts of Elah",
        "Now the Rest of the Acts of Elah gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🛡️ All That He Did",
        "All That He Did gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 16,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 16:19-24",
    title: "For His Sins Which He Sinned in Doing Evil",
    icon: "⛰️",
    phrases: [
      [
        "⚠️ For His Sins Which He Sinned in Doing Evil",
        "For His Sins Which He Sinned in Doing Evil names rebellion clearly.\n\nThe Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.\n\n\n\n⚠️ Sin named\n\n💛 A heart turned away\n\n🙏 God sees it\n\n\n\nThe phrase helps the reader see why judgment comes and why false worship damages the whole nation."
      ],
      [
        "👑 In Walking in the Way of Jeroboam",
        "In Walking in the Way of Jeroboam is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ],
      [
        "🗡️ Now the Rest of the Acts of Zimri",
        "Now the Rest of the Acts of Zimri gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🛡️ His Treason That He Wrought",
        "His Treason That He Wrought gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 16,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Kings 16:25-30",
    title: "Omri Wrought Evil in the Eyes of the LORD",
    icon: "🏠",
    phrases: [
      [
        "🙏 Omri Wrought Evil in the Eyes of the LORD",
        "Omri Wrought Evil in the Eyes of the LORD keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "📜 Did Worse Than All That Were Before Him",
        "Did Worse Than All That Were Before Him gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "✨ Omri Wrought Evil in the Eyes of the LORD",
        "Omri Wrought Evil in the Eyes of the LORD keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "⚠️ In His Sin Wherewith He Made Israel to Sin",
        "In His Sin Wherewith He Made Israel to Sin names rebellion clearly.\n\nThe Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.\n\n\n\n⚠️ Sin named\n\n💛 A heart turned away\n\n🙏 God sees it\n\n\n\nThe phrase helps the reader see why judgment comes and why false worship damages the whole nation."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 16,
    startVerse: 31,
    endVerse: 34,
    reference: "1 Kings 16:31-34",
    title: "It Came to Pass",
    icon: "😢",
    phrases: [
      [
        "✨ It Came to Pass",
        "It Came to Pass is timing language.\n\nIt tells the reader that the story has moved to a new moment. These markers help us follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "⚠️ As If It Had Been a Light Thing for Him to Walk in the Sins of Jeroboam the Son of Nebat",
        "As If It Had Been a Light Thing for Him to Walk in the Sins of Jeroboam the Son of Nebat names rebellion clearly.\n\nThe Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.\n\n\n\n⚠️ Sin named\n\n💛 A heart turned away\n\n🙏 God sees it\n\n\n\nThe phrase helps the reader see why judgment comes and why false worship damages the whole nation."
      ],
      [
        "📜 He Reared Up an Altar for Baal in the House of Baal",
        "He Reared Up an Altar for Baal in the House of Baal names rebellion clearly.\n\nThe Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.\n\n\n\n⚠️ Sin named\n\n💛 A heart turned away\n\n🙏 God sees it\n\n\n\nThe phrase helps the reader see why judgment comes and why false worship damages the whole nation."
      ],
      [
        "🛡️ It Came to Pass",
        "It Came to Pass is timing language.\n\nIt tells the reader that the story has moved to a new moment. These markers help us follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 17,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 17:1-6",
    title: "Elijah the Tishbite",
    icon: "✨",
    phrases: [
      [
        "✨ Elijah the Tishbite",
        "Elijah the Tishbite gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "📜 Elijah the Tishbite",
        "Elijah the Tishbite gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🙏 The Word of the LORD Came unto Him",
        "The Word of the LORD Came unto Him keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "🛡️ Elijah the Tishbite",
        "Elijah the Tishbite gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 17,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 17:7-12",
    title: "It Came to Pass After a While",
    icon: "🙏",
    phrases: [
      [
        "✨ It Came to Pass After a While",
        "It Came to Pass After a While is timing language.\n\nIt tells the reader that the story has moved to a new moment. These markers help us follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "📜 It Came to Pass After a While",
        "It Came to Pass After a While is timing language.\n\nIt tells the reader that the story has moved to a new moment. These markers help us follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "🙏 The Word of the LORD Came unto Him",
        "The Word of the LORD Came unto Him keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "🛡️ It Came to Pass After a While",
        "It Came to Pass After a While is timing language.\n\nIt tells the reader that the story has moved to a new moment. These markers help us follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 17,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 17:13-18",
    title: "Elijah Said unto Her",
    icon: "🔥",
    phrases: [
      [
        "✨ Elijah Said unto Her",
        "Elijah Said unto Her marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "📜 Go and Do as Thou Hast Said",
        "Go and Do as Thou Hast Said marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "🗡️ Elijah Said unto Her",
        "Elijah Said unto Her marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "🛡️ The Barrel of Meal Shall Not Waste",
        "The Barrel of Meal Shall Not Waste gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 17,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 17:19-24",
    title: "He Said unto Her",
    icon: "✨",
    phrases: [
      [
        "✨ He Said unto Her",
        "He Said unto Her marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "📜 Give Me Thy Son",
        "Give Me Thy Son gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🙏 He Cried unto the LORD",
        "He Cried unto the LORD keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "🗡️ O LORD My God",
        "O LORD My God keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 18,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 18:1-6",
    title: "It Came to Pass After Many Days",
    icon: "📜",
    phrases: [
      [
        "✨ It Came to Pass After Many Days",
        "It Came to Pass After Many Days is timing language.\n\nIt tells the reader that the story has moved to a new moment. These markers help us follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "📜 It Came to Pass After Many Days",
        "It Came to Pass After Many Days is timing language.\n\nIt tells the reader that the story has moved to a new moment. These markers help us follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "🗡️ Elijah Went to Shew Himself unto Ahab",
        "Elijah Went to Shew Himself unto Ahab gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🛡️ There Was a Sore Famine in Samaria",
        "There Was a Sore Famine in Samaria gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 18,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 18:7-12",
    title: "As Obadiah Was in the Way",
    icon: "💛",
    phrases: [
      [
        "✨ As Obadiah Was in the Way",
        "As Obadiah Was in the Way gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "📜 Elijah Met Him",
        "Elijah Met Him gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🗡️ He Answered Him",
        "He Answered Him marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "🙏 Tell Thy Lord",
        "Tell Thy Lord keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 18,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 18:13-18",
    title: "Was It Not Told My Lord What I Did",
    icon: "🧠",
    phrases: [
      [
        "🙏 Was It Not Told My Lord What I Did When Jezebel Slew the Prophets of the LORD",
        "Was It Not Told My Lord What I Did When Jezebel Slew the Prophets of the LORD keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "✨ How I Hid an Hundred Men of the Lord’s Prophets by Fifty in a Cave",
        "How I Hid an Hundred Men of the Lord’s Prophets by Fifty in a Cave keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "🗡️ Now Thou Sayest",
        "Now Thou Sayest gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "📜 Tell Thy Lord",
        "Tell Thy Lord keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 18,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 18:19-24",
    title: "Now Therefore Send",
    icon: "📜",
    phrases: [
      [
        "✨ Now Therefore Send",
        "Now Therefore Send gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "📜 Gather to Me All Israel unto Mount Carmel",
        "Gather to Me All Israel unto Mount Carmel gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🗡️ So Ahab Sent unto All the Children of Israel",
        "So Ahab Sent unto All the Children of Israel gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🙏 Gathered the Prophets Together unto Mount Carmel",
        "Gathered the Prophets Together unto Mount Carmel points to a message that comes with authority.\n\nA prophet is not giving a private opinion. He is speaking because God has sent His word into the situation.\n\n\n\n📜 God's message\n\n🙏 A messenger sent\n\n⚠️ A warning to hear\n\n\n\nThe phrase helps the reader understand that ignoring the prophet means ignoring the LORD who sent him."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 18,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Kings 18:25-30",
    title: "Elijah Said unto the Prophets of Baal",
    icon: "💛",
    phrases: [
      [
        "🙏 Elijah Said unto the Prophets of Baal",
        "Elijah Said unto the Prophets of Baal points to a message that comes with authority.\n\nA prophet is not giving a private opinion. He is speaking because God has sent His word into the situation.\n\n\n\n📜 God's message\n\n🙏 A messenger sent\n\n⚠️ A warning to hear\n\n\n\nThe phrase helps the reader understand that ignoring the prophet means ignoring the LORD who sent him."
      ],
      [
        "📜 Choose You One Bullock for Yourselves",
        "Choose You One Bullock for Yourselves gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🗡️ They Took the Bullock Which Was Given Them",
        "They Took the Bullock Which Was Given Them gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🛡️ They Dressed It",
        "They Dressed It gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 18,
    startVerse: 31,
    endVerse: 36,
    reference: "1 Kings 18:31-36",
    title: "Elijah Took Twelve Stones",
    icon: "🧠",
    phrases: [
      [
        "✨ Elijah Took Twelve Stones",
        "Elijah Took Twelve Stones gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "📜 According to the Number of the Tribes of the Sons of Jacob",
        "According to the Number of the Tribes of the Sons of Jacob gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🗡️ Elijah Took Twelve Stones",
        "Elijah Took Twelve Stones gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🛡️ He Made a Trench About the Altar",
        "He Made a Trench About the Altar gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 18,
    startVerse: 37,
    endVerse: 42,
    reference: "1 Kings 18:37-42",
    title: "That This People May Know That Thou Art",
    icon: "📜",
    phrases: [
      [
        "✨ That This People May Know That Thou Art",
        "That This People May Know That Thou Art gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "📜 That This People May Know That Thou Art",
        "That This People May Know That Thou Art gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🙏 Then the Fire of the LORD Fell",
        "Then the Fire of the LORD Fell keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "🛡️ Consumed the Burnt Sacrifice",
        "Consumed the Burnt Sacrifice gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 18,
    startVerse: 43,
    endVerse: 46,
    reference: "1 Kings 18:43-46",
    title: "Said to His Servant",
    icon: "💛",
    phrases: [
      [
        "✨ Said to His Servant",
        "Said to His Servant marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "📜 Go Up Now",
        "Go Up Now gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🗡️ It Came to Pass at the Seventh Time",
        "It Came to Pass at the Seventh Time is timing language.\n\nIt tells the reader that the story has moved to a new moment. These markers help us follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "🛡️ Said to His Servant",
        "Said to His Servant marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 19,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 19:1-6",
    title: "Ahab Told Jezebel All That Elijah Had Done",
    icon: "🗡️",
    phrases: [
      [
        "✨ Ahab Told Jezebel All That Elijah Had Done",
        "Ahab Told Jezebel All That Elijah Had Done gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🙏 Withal How He Had Slain All the Prophets with the Sword",
        "Withal How He Had Slain All the Prophets with the Sword points to a message that comes with authority.\n\nA prophet is not giving a private opinion. He is speaking because God has sent His word into the situation.\n\n\n\n📜 God's message\n\n🙏 A messenger sent\n\n⚠️ A warning to hear\n\n\n\nThe phrase helps the reader understand that ignoring the prophet means ignoring the LORD who sent him."
      ],
      [
        "🗡️ Then Jezebel Sent a Messenger unto Elijah",
        "Then Jezebel Sent a Messenger unto Elijah gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "📜 So Let the Gods Do to Me",
        "So Let the Gods Do to Me keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 19,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 19:7-12",
    title: "The Angel of the LORD Came Again the Second",
    icon: "⚠️",
    phrases: [
      [
        "🙏 The Angel of the LORD Came Again the Second Time",
        "The Angel of the LORD Came Again the Second Time keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "📜 Arise and Eat",
        "Arise and Eat gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🗡️ Did Eat and Drink",
        "Did Eat and Drink gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "✨ Went in the Strength of That Meat Forty Days and Forty Nights unto Horeb the Mount of God",
        "Went in the Strength of That Meat Forty Days and Forty Nights unto Horeb the Mount of God keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 19,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 19:13-18",
    title: "It Was So",
    icon: "📦",
    phrases: [
      [
        "✨ It Was So",
        "It Was So gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "📜 When Elijah Heard It",
        "When Elijah Heard It gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🙏 I Have Been Very Jealous for the LORD God of Hosts",
        "I Have Been Very Jealous for the LORD God of Hosts keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "🛡️ Because the Children of Israel Have Forsaken Thy Covenant",
        "Because the Children of Israel Have Forsaken Thy Covenant gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 19,
    startVerse: 19,
    endVerse: 21,
    reference: "1 Kings 19:19-21",
    title: "So He Departed Thence",
    icon: "🗡️",
    phrases: [
      [
        "✨ So He Departed Thence",
        "So He Departed Thence gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "📜 Found Elisha the Son of Shaphat",
        "Found Elisha the Son of Shaphat gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🗡️ He Left the Oxen",
        "He Left the Oxen gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🛡️ Ran After Elijah",
        "Ran After Elijah is timing language.\n\nIt tells the reader that the story has moved to a new moment. These markers help us follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 20,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 20:1-6",
    title: "Ben-hadad the King of Syria Gathered All His Host",
    icon: "🛡️",
    phrases: [
      [
        "👑 Ben-hadad the King of Syria Gathered All His Host Together",
        "Ben-hadad the King of Syria Gathered All His Host Together is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ],
      [
        "✨ There Were Thirty and Two Kings with Him",
        "There Were Thirty and Two Kings with Him is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ],
      [
        "📜 He Sent Messengers to Ahab King of Israel into the City",
        "He Sent Messengers to Ahab King of Israel into the City is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ],
      [
        "🛡️ Said unto Him",
        "Said unto Him marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 20,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 20:7-12",
    title: "Then the King of Israel Called All the Elders",
    icon: "🏙️",
    phrases: [
      [
        "👑 Then the King of Israel Called All the Elders of the Land",
        "Then the King of Israel Called All the Elders of the Land is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ],
      [
        "📜 I Pray You",
        "I Pray You gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🗡️ All the Elders and All the People Said unto Him",
        "All the Elders and All the People Said unto Him marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "🛡️ Hearken Not unto Him",
        "Hearken Not unto Him gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 20,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 20:13-18",
    title: "There Came a Prophet unto Ahab King of Israel",
    icon: "🕍",
    phrases: [
      [
        "🙏 There Came a Prophet unto Ahab King of Israel",
        "There Came a Prophet unto Ahab King of Israel points to a message that comes with authority.\n\nA prophet is not giving a private opinion. He is speaking because God has sent His word into the situation.\n\n\n\n📜 God's message\n\n🙏 A messenger sent\n\n⚠️ A warning to hear\n\n\n\nThe phrase helps the reader understand that ignoring the prophet means ignoring the LORD who sent him."
      ],
      [
        "✨ Thus Saith the LORD",
        "Thus Saith the LORD keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "🗡️ Even by the Young Men of the Princes of the Provinces",
        "Even by the Young Men of the Princes of the Provinces gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🛡️ Then He Numbered the Young Men of the Princes of the Provinces",
        "Then He Numbered the Young Men of the Princes of the Provinces gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 20,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 20:19-24",
    title: "So These Young Men of the Princes",
    icon: "🛡️",
    phrases: [
      [
        "✨ So These Young Men of the Princes of the Provinces Came Out of the City",
        "So These Young Men of the Princes of the Provinces Came Out of the City gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "📜 The Army Which Followed Them",
        "The Army Which Followed Them gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🗡️ They Slew Every One His Man",
        "They Slew Every One His Man gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🛡️ The Syrians Fled",
        "The Syrians Fled gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 20,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Kings 20:25-30",
    title: "Number Thee an Army",
    icon: "🏙️",
    phrases: [
      [
        "✨ Number Thee an Army",
        "Number Thee an Army gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "📜 Like the Army That Thou Hast Lost",
        "Like the Army That Thou Hast Lost gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🗡️ It Came to Pass at the Return of the Year",
        "It Came to Pass at the Return of the Year is timing language.\n\nIt tells the reader that the story has moved to a new moment. These markers help us follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "🛡️ Number Thee an Army",
        "Number Thee an Army gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 20,
    startVerse: 31,
    endVerse: 36,
    reference: "1 Kings 20:31-36",
    title: "His Servants Said unto Him",
    icon: "🕍",
    phrases: [
      [
        "✨ His Servants Said unto Him",
        "His Servants Said unto Him marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "👑 We Have Heard That the Kings of the House of Israel Are Merciful Kings",
        "We Have Heard That the Kings of the House of Israel Are Merciful Kings is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ],
      [
        "🗡️ So They Girded Sackcloth on Their Loins",
        "So They Girded Sackcloth on Their Loins gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🛡️ Put Ropes on Their Heads",
        "Put Ropes on Their Heads gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 20,
    startVerse: 37,
    endVerse: 42,
    reference: "1 Kings 20:37-42",
    title: "Then He Found Another Man",
    icon: "🛡️",
    phrases: [
      [
        "✨ Then He Found Another Man",
        "Then He Found Another Man gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "📜 I Pray Thee",
        "I Pray Thee gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🙏 So the Prophet Departed",
        "So the Prophet Departed points to a message that comes with authority.\n\nA prophet is not giving a private opinion. He is speaking because God has sent His word into the situation.\n\n\n\n📜 God's message\n\n🙏 A messenger sent\n\n⚠️ A warning to hear\n\n\n\nThe phrase helps the reader understand that ignoring the prophet means ignoring the LORD who sent him."
      ],
      [
        "👑 Waited for the King by the Way",
        "Waited for the King by the Way is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 20,
    startVerse: 43,
    endVerse: 43,
    reference: "1 Kings 20:43",
    title: "The King of Israel Went to His House Heavy",
    icon: "🏙️",
    phrases: [
      [
        "👑 The King of Israel Went to His House Heavy and Displeased",
        "The King of Israel Went to His House Heavy and Displeased is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ],
      [
        "✨ The King of Israel Went to His House Heavy",
        "The King of Israel Went to His House Heavy is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ],
      [
        "📜 King of Israel Went to His House Heavy",
        "King of Israel Went to His House Heavy is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ],
      [
        "🗡️ The King of Israel Went to His House Heavy",
        "The King of Israel Went to His House Heavy is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 21,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 21:1-6",
    title: "It Came to Pass After These Things",
    icon: "👑",
    phrases: [
      [
        "✨ It Came to Pass After These Things",
        "It Came to Pass After These Things is timing language.\n\nIt tells the reader that the story has moved to a new moment. These markers help us follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "📜 It Came to Pass After These Things",
        "It Came to Pass After These Things is timing language.\n\nIt tells the reader that the story has moved to a new moment. These markers help us follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "🗡️ Ahab Spake unto Naboth",
        "Ahab Spake unto Naboth marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "🏠 Give Me Thy Vineyard",
        "Give Me Thy Vineyard points to land that mattered deeply in Israel.\n\nA vineyard was not just property to trade. It could be family inheritance connected to identity, provision, and covenant life.\n\n\n\n🏠 Family inheritance\n\n💧 Daily provision\n\n⚠️ Power tested by desire\n\n\n\nThe phrase helps the reader understand why taking Naboth's vineyard is more than a business deal. It is injustice."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 21,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 21:7-12",
    title: "Jezebel His Wife Said unto Him",
    icon: "🔑",
    phrases: [
      [
        "✨ Jezebel His Wife Said unto Him",
        "Jezebel His Wife Said unto Him marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "👑 Dost Thou Now Govern the Kingdom of Israel",
        "Dost Thou Now Govern the Kingdom of Israel is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ],
      [
        "🗡️ So She Wrote Letters in Ahab’s Name",
        "So She Wrote Letters in Ahab’s Name gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🛡️ Sealed Them with His Seal",
        "Sealed Them with His Seal gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 21,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 21:13-18",
    title: "There Came in Two Men",
    icon: "💧",
    phrases: [
      [
        "✨ There Came in Two Men",
        "There Came in Two Men gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "📜 Children of Belial",
        "Children of Belial gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🗡️ Then They Sent to Jezebel",
        "Then They Sent to Jezebel gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🛡️ Naboth Is Stoned",
        "Naboth Is Stoned gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 21,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 21:19-24",
    title: "Thou Shalt Speak unto Him",
    icon: "👑",
    phrases: [
      [
        "✨ Thou Shalt Speak unto Him",
        "Thou Shalt Speak unto Him gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🙏 Thus Saith the LORD",
        "Thus Saith the LORD keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "🗡️ Ahab Said to Elijah",
        "Ahab Said to Elijah marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "🛡️ Hast Thou Found Me",
        "Hast Thou Found Me gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 21,
    startVerse: 25,
    endVerse: 29,
    reference: "1 Kings 21:25-29",
    title: "There Was None Like unto Ahab",
    icon: "🔑",
    phrases: [
      [
        "✨ There Was None Like unto Ahab",
        "There Was None Like unto Ahab gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "📜 There Was None Like unto Ahab",
        "There Was None Like unto Ahab gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "⚠️ He Did Very Abominably in Following Idols",
        "He Did Very Abominably in Following Idols names rebellion clearly.\n\nThe Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.\n\n\n\n⚠️ Sin named\n\n💛 A heart turned away\n\n🙏 God sees it\n\n\n\nThe phrase helps the reader see why judgment comes and why false worship damages the whole nation."
      ],
      [
        "🛡️ According to All Things as Did the Amorites",
        "According to All Things as Did the Amorites gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 22,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 22:1-6",
    title: "They Continued Three Years Without War Between Syria",
    icon: "🏠",
    phrases: [
      [
        "🗡️ They Continued Three Years Without War Between Syria and Israel",
        "They Continued Three Years Without War Between Syria and Israel brings conflict into view.\n\nThis is not just action in the story. War shows fear, pride, danger, and the cost of broken leadership.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "✨ They Continued Three Years Without War Between Syria",
        "They Continued Three Years Without War Between Syria brings conflict into view.\n\nThis is not just action in the story. War shows fear, pride, danger, and the cost of broken leadership.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "📜 War Between Syria and Israel",
        "War Between Syria and Israel brings conflict into view.\n\nThis is not just action in the story. War shows fear, pride, danger, and the cost of broken leadership.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "🛡️ It Came to Pass in the Third Year",
        "It Came to Pass in the Third Year is timing language.\n\nIt tells the reader that the story has moved to a new moment. These markers help us follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 22,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 22:7-12",
    title: "Is There Not Here a Prophet of the LORD",
    icon: "😢",
    phrases: [
      [
        "🙏 Is There Not Here a Prophet of the LORD Besides",
        "Is There Not Here a Prophet of the LORD Besides keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "✨ Is There Not Here a Prophet of the LORD",
        "Is There Not Here a Prophet of the LORD keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "👑 The King of Israel Said unto Jehoshaphat",
        "The King of Israel Said unto Jehoshaphat is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ],
      [
        "🛡️ There Is Yet One Man",
        "There Is Yet One Man gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 22,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 22:13-18",
    title: "The Messenger Was Gone to Call Micaiah Spake",
    icon: "⛰️",
    phrases: [
      [
        "✨ The Messenger That Was Gone to Call Micaiah Spake unto Him",
        "The Messenger That Was Gone to Call Micaiah Spake unto Him marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "🙏 The Words of the Prophets Declare Good unto the King with One Mouth",
        "The Words of the Prophets Declare Good unto the King with One Mouth points to a message that comes with authority.\n\nA prophet is not giving a private opinion. He is speaking because God has sent His word into the situation.\n\n\n\n📜 God's message\n\n🙏 A messenger sent\n\n⚠️ A warning to hear\n\n\n\nThe phrase helps the reader understand that ignoring the prophet means ignoring the LORD who sent him."
      ],
      [
        "📜 As the LORD Liveth",
        "As the LORD Liveth keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "🗡️ What the LORD Saith unto Me",
        "What the LORD Saith unto Me keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 22,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 22:19-24",
    title: "Hear Thou Therefore the Word of the LORD",
    icon: "🏠",
    phrases: [
      [
        "🙏 Hear Thou Therefore the Word of the LORD",
        "Hear Thou Therefore the Word of the LORD keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "✨ I Saw the LORD Sitting on His Throne",
        "I Saw the LORD Sitting on His Throne keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "📜 The LORD Said",
        "The LORD Said keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ],
      [
        "🗡️ Hear Thou Therefore the Word of the LORD",
        "Hear Thou Therefore the Word of the LORD keeps the reader focused on the LORD Himself.\n\nThis phrase is not mainly about human power, royal plans, or political pressure.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase reminds the reader that kings can make choices, but the LORD is still the One ruling the story."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 22,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Kings 22:25-30",
    title: "Thou Shalt See in That Day",
    icon: "😢",
    phrases: [
      [
        "✨ Thou Shalt See in That Day",
        "Thou Shalt See in That Day gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "📜 When Thou Shalt Go into an Inner Chamber to Hide Thyself",
        "When Thou Shalt Go into an Inner Chamber to Hide Thyself gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "👑 The King of Israel Said",
        "The King of Israel Said is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ],
      [
        "🛡️ Carry Him Back unto Amon the Governor of the City",
        "Carry Him Back unto Amon the Governor of the City is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 22,
    startVerse: 31,
    endVerse: 36,
    reference: "1 Kings 22:31-36",
    title: "The King of Syria Commanded His Thirty and Two",
    icon: "⛰️",
    phrases: [
      [
        "👑 The King of Syria Commanded His Thirty and Two",
        "The King of Syria Commanded His Thirty and Two is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ],
      [
        "📜 Fight Neither with Small Nor Great",
        "Fight Neither with Small Nor Great gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🗡️ It Came to Pass",
        "It Came to Pass is timing language.\n\nIt tells the reader that the story has moved to a new moment. These markers help us follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "🛡️ When the Captains of the Chariots Saw Jehoshaphat",
        "When the Captains of the Chariots Saw Jehoshaphat gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 22,
    startVerse: 37,
    endVerse: 42,
    reference: "1 Kings 22:37-42",
    title: "So the King Died",
    icon: "🏠",
    phrases: [
      [
        "👑 So the King Died",
        "So the King Died is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ],
      [
        "📜 Was Brought to Samaria",
        "Was Brought to Samaria gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🗡️ One Washed the Chariot in the Pool of Samaria",
        "One Washed the Chariot in the Pool of Samaria gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🛡️ The Dogs Licked Up His Blood",
        "The Dogs Licked Up His Blood gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 22,
    startVerse: 43,
    endVerse: 48,
    reference: "1 Kings 22:43-48",
    title: "He Walked in All the Ways of Asa His",
    icon: "😢",
    phrases: [
      [
        "✨ He Walked in All the Ways of Asa His Father",
        "He Walked in All the Ways of Asa His Father gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "📜 He Turned Not Aside from It",
        "He Turned Not Aside from It gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "👑 Jehoshaphat Made Peace with the King of Israel",
        "Jehoshaphat Made Peace with the King of Israel is kingdom language.\n\nIt is about authority, leadership, and the way power is being used among God's people.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether the king is leading faithfully or using power for himself."
      ],
      [
        "🛡️ He Walked in All the Ways of Asa His",
        "He Walked in All the Ways of Asa His gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 22,
    startVerse: 49,
    endVerse: 53,
    reference: "1 Kings 22:49-53",
    title: "Then Said Ahaziah the Son of Ahab unto Jehoshaphat",
    icon: "⛰️",
    phrases: [
      [
        "✨ Then Said Ahaziah the Son of Ahab unto Jehoshaphat",
        "Then Said Ahaziah the Son of Ahab unto Jehoshaphat marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "📜 Let My Servants Go with Thy Servants in the Ships",
        "Let My Servants Go with Thy Servants in the Ships gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🗡️ Jehoshaphat Slept with His Fathers",
        "Jehoshaphat Slept with His Fathers gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🛡️ Was Buried with His Fathers in the City of David His Father",
        "Was Buried with His Fathers in the City of David His Father gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 1,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 1:1-6",
    title: "Then Moab Rebelled Against Israel After the Death",
    icon: "🗡️",
    phrases: [
      [
        "😢 Then Moab Rebelled Against Israel After the Death of Ahab",
        "Then Moab Rebelled Against Israel After the Death of Ahab is timing language.\n\nIt tells the reader that the story has moved to a new moment. These markers help us follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "✨ Against Israel After the Death",
        "Against Israel After the Death is timing language.\n\nIt tells the reader that the story has moved to a new moment. These markers help us follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "📜 The Death of Ahab",
        "The Death of Ahab is grief or consequence language.\n\nThe passage is naming pain directly. The Bible does not pretend sin, war, and rebellion have no cost.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase helps the reader feel the seriousness of what has happened in the story."
      ],
      [
        "🗡️ Ahaziah Fell Down Through a Lattice in His Upper Chamber That Was in Samaria",
        "Ahaziah Fell Down Through a Lattice in His Upper Chamber That Was in Samaria is grief or consequence language.\n\nThe passage is naming pain directly. The Bible does not pretend sin, war, and rebellion have no cost.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase helps the reader feel the seriousness of what has happened in the story."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 1,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 1:7-12",
    title: "He Said unto Them",
    icon: "⚠️",
    phrases: [
      [
        "✨ He Said unto Them",
        "He Said unto Them marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "📜 What Manner of Man Was He Which Came Up to Meet You",
        "What Manner of Man Was He Which Came Up to Meet You gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🗡️ They Answered Him",
        "They Answered Him marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "🛡️ He Was an Hairy Man",
        "He Was an Hairy Man gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 1,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 1:13-18",
    title: "He Sent Again a Captain of the Third Fifty",
    icon: "📦",
    phrases: [
      [
        "✨ He Sent Again a Captain of the Third Fifty with His Fifty",
        "He Sent Again a Captain of the Third Fifty with His Fifty gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "📜 The Third Captain of Fifty Went Up",
        "The Third Captain of Fifty Went Up gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ],
      [
        "🔥 There Came Fire Down from Heaven",
        "There Came Fire Down from Heaven shows God's power breaking into the scene.\n\nFire from heaven is not normal human strength. It shows that the LORD is answering, judging, or defending His word.\n\n\n\n🔥 Power from God\n\n🙏 Holy authority\n\n⚠️ Judgment is serious\n\n\n\nThe phrase helps the reader see that Elijah's message is backed by the God who rules heaven and earth."
      ],
      [
        "🛡️ Burnt Up the Two Captains of the Former Fifties with Their Fifties",
        "Burnt Up the Two Captains of the Former Fifties with Their Fifties gives the reader a concrete detail to watch.\n\nThe phrase tells what is happening in the passage so the story does not become vague or rushed.\n\n\n\n📖 Exact wording\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThe phrase helps the reader slow down and understand the passage through the Bible's own words."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 2,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 2:1-6",
    title: "It Came to Pass",
    icon: "🌪️",
    phrases: [
      [
        "✨ It Came to Pass",
        "It Came to Pass is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "🙏 When the LORD Would Take Up Elijah into Heaven by a Whirlwind",
        "When the LORD Would Take Up Elijah into Heaven by a Whirlwind means Elijah's departure will be God's doing.\n\nElijah is not simply dying in an ordinary way. The LORD is taking His prophet up in a powerful and unusual moment.\n\n\n\n🙏 God is acting\n\n🔥 Heaven is involved\n\n🌪️ Elijah's ministry is closing\n\n\n\nThe phrase prepares the reader for the holy transition from Elijah to Elisha."
      ],
      [
        "👑 Elijah Said unto Elisha",
        "Elijah Said unto Elisha marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "📜 I Pray Thee",
        "I Pray Thee is polite request language.\n\nIn older Bible wording, I pray thee often means please or I ask you.\n\n\n\n🙏 A request\n\n💬 Respectful speech\n\n🔑 A choice being placed before someone\n\n\n\nThe phrase helps the reader hear the tone of the conversation instead of reading it like a command."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 2,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 2:7-12",
    title: "Fifty Men of the Sons of the Prophets Went",
    icon: "🧥",
    phrases: [
      [
        "📜 Fifty Men of the Sons of the Prophets Went",
        "Fifty Men of the Sons of the Prophets Went is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "✨ Stood to View Afar Off",
        "Stood to View Afar Off means the men are watching from a distance.\n\nThey are close enough to witness what happens, but they are not standing beside Elijah and Elisha.\n\n\n\n👀 Witnesses watching\n\n📍 Distance from the moment\n\n🙏 A holy transition\n\n\n\nThe phrase helps the reader feel that something serious is happening, and others are watching it unfold."
      ],
      [
        "👑 Elijah Took His Mantle",
        "Elijah Took His Mantle points to Elijah's prophetic calling.\n\nA mantle was a cloak, but in this story it also becomes connected with Elijah's ministry and authority.\n\n\n\n🧥 Prophet's cloak\n\n🙏 Ministry passed on\n\n💧 Jordan divided\n\n\n\nThe phrase helps the reader see that Elisha is stepping into the work Elijah had been given."
      ],
      [
        "🙏 Wrapped It Together",
        "Wrapped It Together describes Elijah preparing the mantle for action.\n\nHe is not using a weapon or a tool of human power. He is using the prophet's cloak connected with his calling.\n\n\n\n🧥 The mantle\n\n💧 The water before them\n\n🙏 God's power shown through His prophet\n\n\n\nThe phrase helps the reader see the mantle as more than clothing in this scene."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 2,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 2:13-18",
    title: "He Took Up Also the Mantle of Elijah",
    icon: "💧",
    phrases: [
      [
        "✨ He Took Up Also the Mantle of Elijah That Fell from Him",
        "He Took Up Also the Mantle of Elijah That Fell from Him points to Elijah's prophetic calling.\n\nA mantle was a cloak, but in this story it also becomes connected with Elijah's ministry and authority.\n\n\n\n🧥 Prophet's cloak\n\n🙏 Ministry passed on\n\n💧 Jordan divided\n\n\n\nThe phrase helps the reader see that Elisha is stepping into the work Elijah had been given."
      ],
      [
        "💧 Stood by the Bank of Jordan",
        "Stood by the Bank of Jordan places the scene beside the Jordan River.\n\nThe Jordan often marks a place of crossing, transition, and God's power at work in Israel's story.\n\n\n\n💧 River setting\n\n📍 Place of transition\n\n🙏 God at work in the crossing\n\n\n\nThe phrase helps the reader connect this moment with the larger Bible pattern of God meeting His people near the Jordan."
      ],
      [
        "👑 He Took the Mantle of Elijah That Fell from Him",
        "He Took the Mantle of Elijah That Fell from Him points to Elijah's prophetic calling.\n\nA mantle was a cloak, but in this story it also becomes connected with Elijah's ministry and authority.\n\n\n\n🧥 Prophet's cloak\n\n🙏 Ministry passed on\n\n💧 Jordan divided\n\n\n\nThe phrase helps the reader see that Elisha is stepping into the work Elijah had been given."
      ],
      [
        "📜 Smote the Waters",
        "Smote the Waters brings conflict into view.\n\nThis is not just action in the story. War shows fear, pride, danger, and the cost of broken leadership.\n\n\n\n⚔️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 2,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Kings 2:19-24",
    title: "The Men of the City Said unto Elisha",
    icon: "👑",
    phrases: [
      [
        "🏙️ The Men of the City Said unto Elisha",
        "The Men of the City Said unto Elisha marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "📜 I Pray Thee",
        "I Pray Thee is polite request language.\n\nIn older Bible wording, I pray thee often means please or I ask you.\n\n\n\n🙏 A request\n\n💬 Respectful speech\n\n🔑 A choice being placed before someone\n\n\n\nThe phrase helps the reader hear the tone of the conversation instead of reading it like a command."
      ],
      [
        "👑 Bring Me a New Cruse",
        "Bring Me a New Cruse names the simple objects used in Elisha's sign.\n\nA cruse was a small container, and salt was an ordinary material. The power is not in the container or the salt itself.\n\n\n\n🧂 Salt\n\n🏺 A small vessel\n\n🙏 God's healing power\n\n\n\nThe phrase helps the reader see that God can use ordinary things while He is the One who truly heals."
      ],
      [
        "🙏 Put Salt Therein",
        "Put Salt Therein names the simple objects used in Elisha's sign.\n\nA cruse was a small container, and salt was an ordinary material. The power is not in the container or the salt itself.\n\n\n\n🧂 Salt\n\n🏺 A small vessel\n\n🙏 God's healing power\n\n\n\nThe phrase helps the reader see that God can use ordinary things while He is the One who truly heals."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 2,
    startVerse: 25,
    endVerse: 25,
    reference: "2 Kings 2:25",
    title: "He Went from Thence to Mount Carmel",
    icon: "📜",
    phrases: [
      [
        "✨ He Went from Thence to Mount Carmel",
        "He Went from Thence to Mount Carmel gives the reader the location of the movement.\n\nBible places are not random labels. They help us follow where God's prophet, Israel's kings, or enemy powers are moving.\n\n\n\n📍 Real place\n\n🚶 Movement in the story\n\n🧭 The map of Scripture\n\n\n\nThe phrase helps the reader remember that these events happen in real places, not in a vague story world."
      ],
      [
        "🏙️ From Thence He Returned to Samaria",
        "From Thence He Returned to Samaria gives the reader the location of the movement.\n\nBible places are not random labels. They help us follow where God's prophet, Israel's kings, or enemy powers are moving.\n\n\n\n📍 Real place\n\n🚶 Movement in the story\n\n🧭 The map of Scripture\n\n\n\nThe phrase helps the reader remember that these events happen in real places, not in a vague story world."
      ],
      [
        "👑 Went from Thence to Mount Carmel, and from",
        "Went from Thence to Mount Carmel, and from is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 From Thence to Mount Carmel, and from Thence",
        "From Thence to Mount Carmel, and from Thence is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 3,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 3:1-6",
    title: "Now Jehoram the Son of Ahab Began to Reign",
    icon: "🛡️",
    phrases: [
      [
        "👑 Now Jehoram the Son of Ahab Began to Reign Over Israel in Samaria the Eighteenth Year of Jehoshaphat King of Judah",
        "Now Jehoram the Son of Ahab Began to Reign Over Israel in Samaria the Eighteenth Year of Jehoshaphat King of Judah is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "✨ Reigned Twelve Years",
        "Reigned Twelve Years gives the reader the shape of a king's rule.\n\nThe Bible records details like age, length of reign, and place of rule so the reader can follow the history carefully.\n\n\n\n👑 A king begins\n\n📅 Time is counted\n\n⚖️ His rule will be judged by God\n\n\n\nThe phrase reminds the reader that leadership in Kings is never just power. It is responsibility before the LORD."
      ],
      [
        "🙏 He Wrought Evil in the Sight of the LORD",
        "He Wrought Evil in the Sight of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 Now Jehoram the Son of Ahab Began to Reign",
        "Now Jehoram the Son of Ahab Began to Reign is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 3,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 3:7-12",
    title: "He Went and Sent to Jehoshaphat the King",
    icon: "🙏",
    phrases: [
      [
        "👑 He Went and Sent to Jehoshaphat the King of Judah",
        "He Went and Sent to Jehoshaphat the King of Judah is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "✨ The King of Moab Hath Rebelled Against Me",
        "The King of Moab Hath Rebelled Against Me is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "📜 He Went and Sent to Jehoshaphat the King",
        "He Went and Sent to Jehoshaphat the King is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "🙏 The Way Through the Wilderness of Edom",
        "The Way Through the Wilderness of Edom gives the reader the location of the movement.\n\nBible places are not random labels. They help us follow where God's prophet, Israel's kings, or enemy powers are moving.\n\n\n\n📍 Real place\n\n🚶 Movement in the story\n\n🧭 The map of Scripture\n\n\n\nThe phrase helps the reader remember that these events happen in real places, not in a vague story world."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 3,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 3:13-18",
    title: "Elisha Said unto the King of Israel",
    icon: "🔥",
    phrases: [
      [
        "👑 Elisha Said unto the King of Israel",
        "Elisha Said unto the King of Israel is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "📜 What Have I to Do with Thee",
        "What Have I to Do with Thee is a strong way of saying, Why are you coming to me?\n\nElisha is pushing back because the kings have not been seeking the LORD faithfully.\n\n\n\n💬 A sharp question\n\n⚠️ Spiritual tension\n\n🙏 The prophet speaks for God\n\n\n\nThe phrase helps the reader hear that Elisha is not impressed by royal power when the heart is far from God."
      ],
      [
        "🙏 As the LORD of Hosts Liveth",
        "As the LORD of Hosts Liveth brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "✨ Before Whom I Stand",
        "Before Whom I Stand means Elisha serves in the presence of the living God.\n\nHe is not mainly standing before kings. His first loyalty is to the LORD.\n\n\n\n🙏 God's presence\n\n📜 Prophetic authority\n\n👑 Kings put in their place\n\n\n\nThe phrase helps the reader understand why Elisha can speak boldly to rulers."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 3,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Kings 3:19-24",
    title: "Ye Shall Smite Every Fenced City",
    icon: "🏙️",
    phrases: [
      [
        "🏙️ Ye Shall Smite Every Fenced City",
        "Ye Shall Smite Every Fenced City describes fortified places being brought low.\n\nA fenced city was protected by walls. A choice city was valuable and important.\n\n\n\n🏙️ Strong cities\n\n🛡️ Human security\n\n⚔️ Judgment through battle\n\n\n\nThe phrase helps the reader see that war reaches what people thought was safe and strong."
      ],
      [
        "✨ Every Choice City",
        "Every Choice City describes fortified places being brought low.\n\nA fenced city was protected by walls. A choice city was valuable and important.\n\n\n\n🏙️ Strong cities\n\n🛡️ Human security\n\n⚔️ Judgment through battle\n\n\n\nThe phrase helps the reader see that war reaches what people thought was safe and strong."
      ],
      [
        "👑 It Came to Pass in the Morning",
        "It Came to Pass in the Morning is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "🙏 When the Meat Offering Was Offered",
        "When the Meat Offering Was Offered connects the timing of the miracle with worship.\n\nThe meat offering was an offering brought before the LORD. The detail quietly links God's help with the rhythms of worship.\n\n\n\n🕍 Worship timing\n\n🙏 Dependence on God\n\n💧 Help arrives\n\n\n\nThe phrase helps the reader see that deliverance is not separated from worship."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 3,
    startVerse: 25,
    endVerse: 27,
    reference: "2 Kings 3:25-27",
    title: "They Beat Down the Cities",
    icon: "⚠️",
    phrases: [
      [
        "✨ They Beat Down the Cities",
        "They Beat Down the Cities describes fortified places being brought low.\n\nA fenced city was protected by walls. A choice city was valuable and important.\n\n\n\n🏙️ Strong cities\n\n🛡️ Human security\n\n⚔️ Judgment through battle\n\n\n\nThe phrase helps the reader see that war reaches what people thought was safe and strong."
      ],
      [
        "📜 On Every Good Piece of Land Cast Every Man His Stone",
        "On Every Good Piece of Land Cast Every Man His Stone describes the land being ruined during judgment.\n\nThe soldiers are not only fighting people. They are damaging the fields that would feed and sustain life.\n\n\n\n🌿 Good land\n\n🪨 Stones thrown over it\n\n⚠️ Judgment touching daily life\n\n\n\nThe phrase helps the reader understand that war in the Bible affects homes, food, land, and future survival."
      ],
      [
        "👑 When the King of Moab Saw That the Battle Was Too Sore for Him",
        "When the King of Moab Saw That the Battle Was Too Sore for Him is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "🙏 He Took with Him Seven Hundred Men That Drew Swords",
        "He Took with Him Seven Hundred Men That Drew Swords points to a message that comes with authority.\n\nA prophet is not giving a private opinion. He is speaking because God has sent His word into the situation.\n\n\n\n📜 God's message\n\n🙏 A messenger sent\n\n⚠️ A warning to hear\n\n\n\nThe phrase helps the reader understand that ignoring the prophet means ignoring the LORD who sent him."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 4,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 4:1-6",
    title: "Now There Cried a Certain Woman of the Wives",
    icon: "🕍",
    phrases: [
      [
        "📜 Now There Cried a Certain Woman of the Wives of the Sons of the Prophets unto Elisha",
        "Now There Cried a Certain Woman of the Wives of the Sons of the Prophets unto Elisha is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "✨ Thy Servant My Husband Is Dead",
        "Thy Servant My Husband Is Dead names grief plainly.\n\nThe Bible does not hide the pain in the story. Death has entered the home, and the need is real.\n\n\n\n😢 Loss\n\n🏠 A hurting household\n\n🙏 Need for God's mercy\n\n\n\nThe phrase helps the reader feel why the next act of God matters so deeply."
      ],
      [
        "👑 Elisha Said unto Her",
        "Elisha Said unto Her marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "🙏 What Shall I Do for Thee",
        "What Shall I Do for Thee is a question of care.\n\nElisha is asking what help is needed instead of assuming the answer too quickly.\n\n\n\n💬 A careful question\n\n🏠 A real need\n\n🙏 Mercy becoming personal\n\n\n\nThe phrase helps the reader see that God's care often meets people in the exact place where they are burdened."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 4,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 4:7-12",
    title: "Then She Came and Told the Man of God",
    icon: "💛",
    phrases: [
      [
        "🙏 Then She Came and Told the Man of God",
        "Then She Came and Told the Man of God is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "📜 Sell the Oil",
        "Sell the Oil shows provision becoming practical help.\n\nThe oil is not just a miracle to admire. It becomes the way the widow can pay debt and live.\n\n\n\n🫒 Oil provided\n\n💰 Debt answered\n\n🏠 Life sustained\n\n\n\nThe phrase helps the reader see that God's mercy reaches ordinary needs like money, debt, and food."
      ],
      [
        "👑 It Fell on a Day",
        "It Fell on a Day is grief or consequence language.\n\nThe passage is naming pain directly. The Bible does not pretend sin, war, and rebellion have no cost.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase helps the reader feel the seriousness of what has happened in the story."
      ],
      [
        "✨ That Elisha Passed to Shunem",
        "That Elisha Passed to Shunem gives the reader the location of the movement.\n\nBible places are not random labels. They help us follow where God's prophet, Israel's kings, or enemy powers are moving.\n\n\n\n📍 Real place\n\n🚶 Movement in the story\n\n🧭 The map of Scripture\n\n\n\nThe phrase helps the reader remember that these events happen in real places, not in a vague story world."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 4,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 4:13-18",
    title: "He Said unto Him",
    icon: "🗡️",
    phrases: [
      [
        "✨ He Said unto Him",
        "He Said unto Him marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "📜 Say Now unto Her",
        "Say Now unto Her is command language.\n\nSomeone is being told to act. The phrase moves the story from information into response.\n\n\n\n📜 A command\n\n🚶 Action required\n\n⚠️ A decision point\n\n\n\nThe phrase helps the reader notice when the story turns because someone must obey, refuse, or respond."
      ],
      [
        "👑 What Then Is to Be Done for Her",
        "What Then Is to Be Done for Her is a question of care.\n\nElisha is asking what help is needed instead of assuming the answer too quickly.\n\n\n\n💬 A careful question\n\n🏠 A real need\n\n🙏 Mercy becoming personal\n\n\n\nThe phrase helps the reader see that God's care often meets people in the exact place where they are burdened."
      ],
      [
        "🙏 Verily She Hath No Child",
        "Verily She Hath No Child names the woman's sorrow and emptiness.\n\nIn the ancient world, having no child could mean deep grief, vulnerability, and fear for the family's future.\n\n\n\n😢 Sorrow named\n\n🏠 Family future\n\n🙏 God sees hidden need\n\n\n\nThe phrase helps the reader understand why the promised son is such a tender gift."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 4,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Kings 4:19-24",
    title: "He Said unto His Father",
    icon: "📍",
    phrases: [
      [
        "✨ He Said unto His Father",
        "He Said unto His Father marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "📜 He Said to a Lad",
        "He Said to a Lad marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "👑 When He Had Taken Him",
        "When He Had Taken Him carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Brought Him to His Mother",
        "Brought Him to His Mother is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 4,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Kings 4:25-30",
    title: "So She Went and Came unto the Man",
    icon: "🧠",
    phrases: [
      [
        "🙏 So She Went and Came unto the Man of God to Mount Carmel",
        "So She Went and Came unto the Man of God to Mount Carmel gives the reader the location of the movement.\n\nBible places are not random labels. They help us follow where God's prophet, Israel's kings, or enemy powers are moving.\n\n\n\n📍 Real place\n\n🚶 Movement in the story\n\n🧭 The map of Scripture\n\n\n\nThe phrase helps the reader remember that these events happen in real places, not in a vague story world."
      ],
      [
        "📜 It Came to Pass",
        "It Came to Pass is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "👑 I Pray Thee",
        "I Pray Thee is polite request language.\n\nIn older Bible wording, I pray thee often means please or I ask you.\n\n\n\n🙏 A request\n\n💬 Respectful speech\n\n🔑 A choice being placed before someone\n\n\n\nThe phrase helps the reader hear the tone of the conversation instead of reading it like a command."
      ],
      [
        "✨ So She Went and Came unto the Man",
        "So She Went and Came unto the Man is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 4,
    startVerse: 31,
    endVerse: 36,
    reference: "2 Kings 4:31-36",
    title: "Gehazi Passed on Before Them",
    icon: "😢",
    phrases: [
      [
        "✨ Gehazi Passed on Before Them",
        "Gehazi Passed on Before Them is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "📜 Laid the Staff Upon the Face of the Child",
        "Laid the Staff Upon the Face of the Child shows an attempted act connected with Elisha's prophetic ministry.\n\nThe staff is connected to the prophet, but the story will make clear that life comes from the LORD, not from an object by itself.\n\n\n\n📜 Prophet's staff\n\n😢 A dead child\n\n🙏 Life belongs to God\n\n\n\nThe phrase helps the reader avoid treating holy objects like magic."
      ],
      [
        "🏙️ When Elisha Was Come into the House",
        "When Elisha Was Come into the House can mean more than a building.\n\nIn Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership choices can affect an entire household after the leader is gone."
      ],
      [
        "🙏 The Child Was Dead",
        "The Child Was Dead names grief plainly.\n\nThe Bible does not hide the pain in the story. Death has entered the home, and the need is real.\n\n\n\n😢 Loss\n\n🏠 A hurting household\n\n🙏 Need for God's mercy\n\n\n\nThe phrase helps the reader feel why the next act of God matters so deeply."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 4,
    startVerse: 37,
    endVerse: 42,
    reference: "2 Kings 4:37-42",
    title: "Then She Went",
    icon: "✨",
    phrases: [
      [
        "✨ Then She Went in",
        "Then She Went in is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "📜 Fell at His Feet",
        "Fell at His Feet is grief or consequence language.\n\nThe passage is naming pain directly. The Bible does not pretend sin, war, and rebellion have no cost.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase helps the reader feel the seriousness of what has happened in the story."
      ],
      [
        "👑 Elisha Came Again to Gilgal",
        "Elisha Came Again to Gilgal is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "🙏 There Was a Dearth in the Land",
        "There Was a Dearth in the Land carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 4,
    startVerse: 43,
    endVerse: 44,
    reference: "2 Kings 4:43-44",
    title: "His Servitor Said",
    icon: "📦",
    phrases: [
      [
        "✨ His Servitor Said",
        "His Servitor Said marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "📜 Should I Set This Before an Hundred Men",
        "Should I Set This Before an Hundred Men carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 So He Set It Before Them",
        "So He Set It Before Them asks someone to move from words into action.\n\nThe phrase is not only giving information. It is pushing the story toward a response.\n\n\n\n🚶 Action begins\n\n💬 Words become movement\n\n🔑 The scene changes\n\n\n\nThe phrase helps the reader follow the moment where someone must do something next."
      ],
      [
        "🙏 They Did Eat",
        "They Did Eat carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 5,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 5:1-6",
    title: "Captain of the Host of the King of Syria",
    icon: "🚶",
    phrases: [
      [
        "👑 Captain of the Host of the King of Syria",
        "Captain of the Host of the King of Syria is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "📜 Was a Great Man with His Master",
        "Was a Great Man with His Master carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "✨ The Syrians Had Gone Out by Companies",
        "The Syrians Had Gone Out by Companies carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Had Brought Away Captive Out of the Land of Israel a Little Maid",
        "Had Brought Away Captive Out of the Land of Israel a Little Maid is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 5,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 5:7-12",
    title: "It Came to Pass",
    icon: "👀",
    phrases: [
      [
        "✨ It Came to Pass",
        "It Came to Pass is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "👑 When the King of Israel Had Read the Letter",
        "When the King of Israel Had Read the Letter is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "📜 It Was So",
        "It Was So carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 When Elisha the Man of God Had Heard That the King of Israel Had Rent His Clothes",
        "When Elisha the Man of God Had Heard That the King of Israel Had Rent His Clothes brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 5,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 5:13-18",
    title: "His Servants Came Near",
    icon: "🏠",
    phrases: [
      [
        "✨ His Servants Came Near",
        "His Servants Came Near is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "📜 Spake unto Him",
        "Spake unto Him marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "👑 Then Went He Down",
        "Then Went He Down is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "💧 Dipped Himself Seven Times in Jordan",
        "Dipped Himself Seven Times in Jordan places the scene beside the Jordan River.\n\nThe Jordan often marks a place of crossing, transition, and God's power at work in Israel's story.\n\n\n\n💧 River setting\n\n📍 Place of transition\n\n🙏 God at work in the crossing\n\n\n\nThe phrase helps the reader connect this moment with the larger Bible pattern of God meeting His people near the Jordan."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 5,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Kings 5:19-24",
    title: "He Said unto Him",
    icon: "📅",
    phrases: [
      [
        "✨ He Said unto Him",
        "He Said unto Him marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "📜 Go in Peace",
        "Go in Peace carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 The Servant of Elisha the Man of God",
        "The Servant of Elisha the Man of God brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "👑 My Master Hath Spared Naaman This Syrian",
        "My Master Hath Spared Naaman This Syrian carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 5,
    startVerse: 25,
    endVerse: 27,
    reference: "2 Kings 5:25-27",
    title: "He Went in",
    icon: "⚖️",
    phrases: [
      [
        "✨ He Went in",
        "He Went in is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "📜 Stood Before His Master",
        "Stood Before His Master carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 He Said unto Him",
        "He Said unto Him marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "💛 Went Not Mine Heart with Thee",
        "Went Not Mine Heart with Thee is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 6,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 6:1-6",
    title: "The Sons of the Prophets Said unto Elisha",
    icon: "🌪️",
    phrases: [
      [
        "📜 The Sons of the Prophets Said unto Elisha",
        "The Sons of the Prophets Said unto Elisha is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "✨ The Place Where We Dwell with Thee Is Too Strait for Us",
        "The Place Where We Dwell with Thee Is Too Strait for Us carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Let Us Go",
        "Let Us Go asks someone to move from words into action.\n\nThe phrase is not only giving information. It is pushing the story toward a response.\n\n\n\n🚶 Action begins\n\n💬 Words become movement\n\n🔑 The scene changes\n\n\n\nThe phrase helps the reader follow the moment where someone must do something next."
      ],
      [
        "🙏 We Pray Thee",
        "We Pray Thee is request language.\n\nIn older Bible wording, pray thee often means please or I ask you.\n\n\n\n🙏 A request\n\n💬 Respectful speech\n\n🔑 Someone asking for response\n\n\n\nThe phrase helps the reader hear the tone of the words instead of reading them like a harsh command."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 6,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 6:7-12",
    title: "Therefore Said He",
    icon: "🧥",
    phrases: [
      [
        "✨ Therefore Said He",
        "Therefore Said He marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "📜 Take It Up to Thee",
        "Take It Up to Thee asks someone to move from words into action.\n\nThe phrase is not only giving information. It is pushing the story toward a response.\n\n\n\n🚶 Action begins\n\n💬 Words become movement\n\n🔑 The scene changes\n\n\n\nThe phrase helps the reader follow the moment where someone must do something next."
      ],
      [
        "👑 Then the King of Syria Warred Against Israel",
        "Then the King of Syria Warred Against Israel is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "🙏 Took Counsel with His Servants",
        "Took Counsel with His Servants carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 6,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 6:13-18",
    title: "Go and Spy Where He Is",
    icon: "💧",
    phrases: [
      [
        "✨ Go and Spy Where He Is",
        "Go and Spy Where He Is asks someone to move from words into action.\n\nThe phrase is not only giving information. It is pushing the story toward a response.\n\n\n\n🚶 Action begins\n\n💬 Words become movement\n\n🔑 The scene changes\n\n\n\nThe phrase helps the reader follow the moment where someone must do something next."
      ],
      [
        "📜 That I May Send and Fetch Him",
        "That I May Send and Fetch Him is command language.\n\nSomeone is being told to act. The phrase moves the story from information into response.\n\n\n\n📜 A command\n\n🚶 Action required\n\n⚠️ A decision point\n\n\n\nThe phrase helps the reader notice when the story turns because someone must obey, refuse, or respond."
      ],
      [
        "👑 Therefore Sent He Thither Horses",
        "Therefore Sent He Thither Horses carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🗡️ A Great Host",
        "A Great Host brings conflict into view.\n\nThis is not just action in the story. War shows fear, pride, danger, and the cost of broken leadership.\n\n\n\n⚔️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 6,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Kings 6:19-24",
    title: "Elisha Said unto Them",
    icon: "👑",
    phrases: [
      [
        "✨ Elisha Said unto Them",
        "Elisha Said unto Them marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "📜 This Is Not the Way",
        "This Is Not the Way carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 It Came to Pass",
        "It Came to Pass is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "🏙️ When They Were Come into Samaria",
        "When They Were Come into Samaria gives the reader the location of the movement.\n\nBible places are not random labels. They help us follow where God's prophet, Israel's kings, or enemy powers are moving.\n\n\n\n📍 Real place\n\n🚶 Movement in the story\n\n🧭 The map of Scripture\n\n\n\nThe phrase helps the reader remember that these events happen in real places, not in a vague story world."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 6,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Kings 6:25-30",
    title: "There Was a Great Famine in Samaria",
    icon: "📜",
    phrases: [
      [
        "🏙️ There Was a Great Famine in Samaria",
        "There Was a Great Famine in Samaria gives the reader the location of the movement.\n\nBible places are not random labels. They help us follow where God's prophet, Israel's kings, or enemy powers are moving.\n\n\n\n📍 Real place\n\n🚶 Movement in the story\n\n🧭 The map of Scripture\n\n\n\nThe phrase helps the reader remember that these events happen in real places, not in a vague story world."
      ],
      [
        "📜 They Besieged It",
        "They Besieged It means the city was surrounded by enemy forces.\n\nA siege trapped people inside the city. Food, water, safety, and hope would slowly run out.\n\n\n\n🏙️ A city surrounded\n\n⚠️ Pressure closing in\n\n😢 Judgment becoming visible\n\n\n\nThe phrase helps the reader understand the fear and suffering behind the fall of Jerusalem."
      ],
      [
        "👑 As the King of Israel Was Passing by Upon the Wall",
        "As the King of Israel Was Passing by Upon the Wall names rebellion clearly.\n\nThe Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.\n\n\n\n⚠️ Sin named\n\n💛 A heart turned away\n\n🙏 God sees it\n\n\n\nThe phrase helps the reader see why judgment comes and why false worship damages the whole nation."
      ],
      [
        "🙏 There Cried a Woman unto Him",
        "There Cried a Woman unto Him carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 6,
    startVerse: 31,
    endVerse: 33,
    reference: "2 Kings 6:31-33",
    title: "Then He Said",
    icon: "🛡️",
    phrases: [
      [
        "✨ Then He Said",
        "Then He Said marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "🙏 God Do So and More Also to Me",
        "God Do So and More Also to Me brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "🏙️ But Elisha Sat in His House",
        "But Elisha Sat in His House can mean more than a building.\n\nIn Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership choices can affect an entire household after the leader is gone."
      ],
      [
        "📜 The Elders Sat with Him",
        "The Elders Sat with Him carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 7,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 7:1-6",
    title: "Then Elisha Said",
    icon: "🙏",
    phrases: [
      [
        "✨ Then Elisha Said",
        "Then Elisha Said marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "🙏 Hear Ye the Word of the LORD",
        "Hear Ye the Word of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 Then a Lord on Whose Hand the King Leaned Answered the Man of God",
        "Then a Lord on Whose Hand the King Leaned Answered the Man of God brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "👑 If the LORD Would Make Windows in Heaven",
        "If the LORD Would Make Windows in Heaven brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 7,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 7:7-12",
    title: "Wherefore They Arose and Fled in the Twilight",
    icon: "🔥",
    phrases: [
      [
        "✨ Wherefore They Arose and Fled in the Twilight",
        "Wherefore They Arose and Fled in the Twilight carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Left Their Tents",
        "Left Their Tents carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 When These Lepers Came to the Uttermost Part of the Camp",
        "When These Lepers Came to the Uttermost Part of the Camp is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "🙏 They Went into One Tent",
        "They Went into One Tent is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 7,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 7:13-18",
    title: "One of His Servants Answered and Said",
    icon: "🏙️",
    phrases: [
      [
        "✨ One of His Servants Answered and Said",
        "One of His Servants Answered and Said marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "📜 Let Some Take",
        "Let Some Take carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 They Took Therefore Two Chariot Horses",
        "They Took Therefore Two Chariot Horses carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 The King Sent After the Host of the Syrians",
        "The King Sent After the Host of the Syrians is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 7,
    startVerse: 19,
    endVerse: 20,
    reference: "2 Kings 7:19-20",
    title: "That Lord Answered the Man of God",
    icon: "⚠️",
    phrases: [
      [
        "🙏 That Lord Answered the Man of God",
        "That Lord Answered the Man of God brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "✨ If the LORD Should Make Windows in Heaven",
        "If the LORD Should Make Windows in Heaven brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "👑 So It Fell Out unto Him",
        "So It Fell Out unto Him is grief or consequence language.\n\nThe passage is naming pain directly. The Bible does not pretend sin, war, and rebellion have no cost.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase helps the reader feel the seriousness of what has happened in the story."
      ],
      [
        "📜 For the People Trode Upon Him in the Gate",
        "For the People Trode Upon Him in the Gate shows the covenant moment becoming public.\n\nJosiah's reform is not kept private. Leaders, people, and Jerusalem are being brought under the hearing of God's word.\n\n\n\n👥 The people gathered\n\n📜 God's word read\n\n🙏 Covenant renewed\n\n\n\nThe phrase helps the reader see that repentance in this chapter is meant to shape the whole community."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 8,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 8:1-6",
    title: "Then Spake Elisha unto the Woman",
    icon: "🕍",
    phrases: [
      [
        "✨ Then Spake Elisha unto the Woman",
        "Then Spake Elisha unto the Woman marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "📜 Whose Son He Had Restored to Life",
        "Whose Son He Had Restored to Life carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 The Woman Arose",
        "The Woman Arose carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Did After the Saying of the Man of God",
        "Did After the Saying of the Man of God brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 8,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 8:7-12",
    title: "Elisha Came to Damascus",
    icon: "💛",
    phrases: [
      [
        "✨ Elisha Came to Damascus",
        "Elisha Came to Damascus is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "👑 Ben-hadad the King of Syria Was Sick",
        "Ben-hadad the King of Syria Was Sick is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "📜 The King Said unto Hazael",
        "The King Said unto Hazael is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "🙏 Take a Present in Thine Hand",
        "Take a Present in Thine Hand carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 8,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 8:13-18",
    title: "Is Thy Servant a Dog",
    icon: "🗡️",
    phrases: [
      [
        "✨ Is Thy Servant a Dog",
        "Is Thy Servant a Dog carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 That He Should Do This Great Thing",
        "That He Should Do This Great Thing carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 So He Departed from Elisha",
        "So He Departed from Elisha carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Came to His Master",
        "Came to His Master is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 8,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Kings 8:19-24",
    title: "Yet the LORD Would Not Destroy Judah for David",
    icon: "📍",
    phrases: [
      [
        "🙏 Yet the LORD Would Not Destroy Judah for David His Servant’s Sake",
        "Yet the LORD Would Not Destroy Judah for David His Servant’s Sake brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 As He Promised Him to Give Him Alway a Light",
        "As He Promised Him to Give Him Alway a Light carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 In His Days Edom Revolted from Under the Hand of Judah",
        "In His Days Edom Revolted from Under the Hand of Judah carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "✨ Made a King Over Themselves",
        "Made a King Over Themselves is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 8,
    startVerse: 25,
    endVerse: 29,
    reference: "2 Kings 8:25-29",
    title: "In the Twelfth Year of Joram the Son",
    icon: "🧠",
    phrases: [
      [
        "👑 In the Twelfth Year of Joram the Son of Ahab King of Israel Did Ahaziah the Son of Jehoram King of Judah Begin to Reign",
        "In the Twelfth Year of Joram the Son of Ahab King of Israel Did Ahaziah the Son of Jehoram King of Judah Begin to Reign is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "📜 Year of Joram the Son",
        "Year of Joram the Son is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "✨ The Son of Ahab King",
        "The Son of Ahab King is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Two and Twenty Years Old Was Ahaziah When He Began to Reign",
        "Two and Twenty Years Old Was Ahaziah When He Began to Reign is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 9,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 9:1-6",
    title: "Elisha the Prophet Called One of the Children",
    icon: "😢",
    phrases: [
      [
        "📜 Elisha the Prophet Called One of the Children of the Prophets",
        "Elisha the Prophet Called One of the Children of the Prophets points to a message that comes with authority.\n\nA prophet is not giving a private opinion. He is speaking because God has sent His word into the situation.\n\n\n\n📜 God's message\n\n🙏 A messenger sent\n\n⚠️ A warning to hear\n\n\n\nThe phrase helps the reader understand that ignoring the prophet means ignoring the LORD who sent him."
      ],
      [
        "✨ Said unto Him",
        "Said unto Him marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "👑 When Thou Comest Thither",
        "When Thou Comest Thither carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Look Out There Jehu the Son of Jehoshaphat the Son of Nimshi",
        "Look Out There Jehu the Son of Jehoshaphat the Son of Nimshi is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 9,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 9:7-12",
    title: "Thou Shalt Smite the House of Ahab Thy Master",
    icon: "✨",
    phrases: [
      [
        "🏙️ Thou Shalt Smite the House of Ahab Thy Master",
        "Thou Shalt Smite the House of Ahab Thy Master is command language.\n\nSomeone is being told to act. The phrase moves the story from information into response.\n\n\n\n📜 A command\n\n🚶 Action required\n\n⚠️ A decision point\n\n\n\nThe phrase helps the reader notice when the story turns because someone must obey, refuse, or respond."
      ],
      [
        "📜 That I May Avenge the Blood of My Servants the Prophets",
        "That I May Avenge the Blood of My Servants the Prophets points to a message that comes with authority.\n\nA prophet is not giving a private opinion. He is speaking because God has sent His word into the situation.\n\n\n\n📜 God's message\n\n🙏 A messenger sent\n\n⚠️ A warning to hear\n\n\n\nThe phrase helps the reader understand that ignoring the prophet means ignoring the LORD who sent him."
      ],
      [
        "✨ For the Whole House of Ahab Shall Perish",
        "For the Whole House of Ahab Shall Perish can mean more than a building.\n\nIn Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership choices can affect an entire household after the leader is gone."
      ],
      [
        "🙏 I Will Cut Off from Ahab Him That Pisseth Against the Wall",
        "I Will Cut Off from Ahab Him That Pisseth Against the Wall carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 9,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 9:13-18",
    title: "Then They Hasted",
    icon: "📦",
    phrases: [
      [
        "✨ Then They Hasted",
        "Then They Hasted carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Took Every Man His Garment",
        "Took Every Man His Garment carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 So Jehu the Son of Jehoshaphat the Son of Nimshi Conspired Against Joram",
        "So Jehu the Son of Jehoshaphat the Son of Nimshi Conspired Against Joram is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Now Joram Had Kept Ramoth-gilead",
        "Now Joram Had Kept Ramoth-gilead carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 9,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Kings 9:19-24",
    title: "Then He Sent Out a Second on Horseback",
    icon: "🚶",
    phrases: [
      [
        "✨ Then He Sent Out a Second on Horseback",
        "Then He Sent Out a Second on Horseback carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Which Came to Them",
        "Which Came to Them is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "👑 The Watchman Told",
        "The Watchman Told carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 He Came Even unto Them",
        "He Came Even unto Them is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 9,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Kings 9:25-30",
    title: "Then Said Jehu to Bidkar His Captain",
    icon: "👀",
    phrases: [
      [
        "✨ Then Said Jehu to Bidkar His Captain",
        "Then Said Jehu to Bidkar His Captain marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "📜 Cast Him in the Portion of the Field of Naboth the Jezreelite",
        "Cast Him in the Portion of the Field of Naboth the Jezreelite carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Surely I Have Seen Yesterday the Blood of Naboth",
        "Surely I Have Seen Yesterday the Blood of Naboth carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 The Blood of His Sons",
        "The Blood of His Sons carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 9,
    startVerse: 31,
    endVerse: 36,
    reference: "2 Kings 9:31-36",
    title: "As Jehu Entered in at the Gate",
    icon: "🏠",
    phrases: [
      [
        "✨ As Jehu Entered in at the Gate",
        "As Jehu Entered in at the Gate carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Had Zimri Peace",
        "Had Zimri Peace carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 He Lifted Up His Face to the Window",
        "He Lifted Up His Face to the Window carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Who Is on My Side",
        "Who Is on My Side carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 9,
    startVerse: 37,
    endVerse: 37,
    reference: "2 Kings 9:37",
    title: "The Carcase of Jezebel Shall Be as Dung Upon",
    icon: "📅",
    phrases: [
      [
        "✨ The Carcase of Jezebel Shall Be as Dung Upon the Face of the Field in the Portion of Jezreel",
        "The Carcase of Jezebel Shall Be as Dung Upon the Face of the Field in the Portion of Jezreel carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 So That They Shall Not Say",
        "So That They Shall Not Say carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Carcase of Jezebel Shall Be as Dung Upon",
        "Carcase of Jezebel Shall Be as Dung Upon carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 The Carcase of Jezebel Shall Be as Dung Upon",
        "The Carcase of Jezebel Shall Be as Dung Upon carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 10,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 10:1-6",
    title: "Ahab Had Seventy Sons in Samaria",
    icon: "🌪️",
    phrases: [
      [
        "🏙️ Ahab Had Seventy Sons in Samaria",
        "Ahab Had Seventy Sons in Samaria shows the size of Ahab's royal house.\n\nSeventy sons means Ahab's dynasty still looks strong, protected, and full of possible heirs.\n\n\n\n👑 Royal family\n\n🏙️ Samaria's power\n\n⚠️ Judgment approaching\n\n\n\nThe phrase matters because Jehu's judgment will reach the whole house of Ahab, not only one ruler."
      ],
      [
        "📜 Jehu Wrote Letters",
        "Jehu Wrote Letters shows authority being sent in written form.\n\nJehu is not only fighting with weapons. He is using letters to pressure leaders and force a decision.\n\n\n\n📜 Written command\n\n👑 Political pressure\n\n⚠️ A dangerous choice\n\n\n\nThe phrase helps the reader see that the struggle for the kingdom is happening through messages as well as battles."
      ],
      [
        "✨ Now as Soon as This Letter Cometh to You",
        "Now as Soon as This Letter Cometh to You shows authority being sent in written form.\n\nJehu is not only fighting with weapons. He is using letters to pressure leaders and force a decision.\n\n\n\n📜 Written command\n\n👑 Political pressure\n\n⚠️ A dangerous choice\n\n\n\nThe phrase helps the reader see that the struggle for the kingdom is happening through messages as well as battles."
      ],
      [
        "🙏 Seeing Your Master’s Sons Are with You",
        "Seeing Your Master’s Sons Are with You points to the heirs of Ahab who are still under protection.\n\nJehu is reminding the leaders that they have the royal sons, the chariots, the city, and the weapons.\n\n\n\n👑 Possible kings\n\n🛡️ Military strength\n\n⚠️ Loyalty being tested\n\n\n\nThe phrase helps the reader understand why Jehu's letter is a challenge, not just information."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 10,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 10:7-12",
    title: "It Came to Pass",
    icon: "🧥",
    phrases: [
      [
        "✨ It Came to Pass",
        "It Came to Pass is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "📜 When the Letter Came to Them",
        "When the Letter Came to Them is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "👑 There Came a Messenger",
        "There Came a Messenger is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "🙏 They Have Brought the Heads of the King’s Sons",
        "They Have Brought the Heads of the King’s Sons is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 10,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 10:13-18",
    title: "Jehu Met with the Brethren of Ahaziah King",
    icon: "💧",
    phrases: [
      [
        "👑 Jehu Met with the Brethren of Ahaziah King of Judah",
        "Jehu Met with the Brethren of Ahaziah King of Judah is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "✨ Jehu Met with the Brethren of Ahaziah King",
        "Jehu Met with the Brethren of Ahaziah King is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "📜 Take Them Alive",
        "Take Them Alive carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 They Took Them Alive",
        "They Took Them Alive carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 10,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Kings 10:19-24",
    title: "Now Therefore Call unto Me All the Prophets",
    icon: "👑",
    phrases: [
      [
        "📜 Now Therefore Call unto Me All the Prophets of Baal",
        "Now Therefore Call unto Me All the Prophets of Baal points to a message that comes with authority.\n\nA prophet is not giving a private opinion. He is speaking because God has sent His word into the situation.\n\n\n\n📜 God's message\n\n🙏 A messenger sent\n\n⚠️ A warning to hear\n\n\n\nThe phrase helps the reader understand that ignoring the prophet means ignoring the LORD who sent him."
      ],
      [
        "✨ All His Servants",
        "All His Servants carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "⚠️ Proclaim a Solemn Assembly for Baal",
        "Proclaim a Solemn Assembly for Baal names rebellion clearly.\n\nThe Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.\n\n\n\n⚠️ Sin named\n\n💛 A heart turned away\n\n🙏 God sees it\n\n\n\nThe phrase helps the reader see why judgment comes and why false worship damages the whole nation."
      ],
      [
        "🙏 They Proclaimed It",
        "They Proclaimed It carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 10,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Kings 10:25-30",
    title: "It Came to Pass",
    icon: "📜",
    phrases: [
      [
        "✨ It Came to Pass",
        "It Came to Pass is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "🔥 As Soon as He Had Made an End of Offering the Burnt Offering",
        "As Soon as He Had Made an End of Offering the Burnt Offering carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "⚠️ They Brought Forth the Images Out of the House of Baal",
        "They Brought Forth the Images Out of the House of Baal describes false worship being torn down.\n\nJosiah is not only speaking against idols. He is removing the objects and places that led people away from the LORD.\n\n\n\n⚠️ Idols destroyed\n\n🧹 Worship cleaned out\n\n🙏 Loyalty to the LORD\n\n\n\nThe phrase helps the reader see repentance as action, not only emotion."
      ],
      [
        "📜 They Brake Down the Image of Baal",
        "They Brake Down the Image of Baal names rebellion clearly.\n\nThe Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.\n\n\n\n⚠️ Sin named\n\n💛 A heart turned away\n\n🙏 God sees it\n\n\n\nThe phrase helps the reader see why judgment comes and why false worship damages the whole nation."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 10,
    startVerse: 31,
    endVerse: 36,
    reference: "2 Kings 10:31-36",
    title: "Jehu Took No Heed to Walk in the Law",
    icon: "🛡️",
    phrases: [
      [
        "✨ Jehu Took No Heed to Walk in the Law",
        "Jehu Took No Heed to Walk in the Law carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "⚠️ For He Departed Not from the Sins of Jeroboam",
        "For He Departed Not from the Sins of Jeroboam names rebellion clearly.\n\nThe Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.\n\n\n\n⚠️ Sin named\n\n💛 A heart turned away\n\n🙏 God sees it\n\n\n\nThe phrase helps the reader see why judgment comes and why false worship damages the whole nation."
      ],
      [
        "🙏 In Those Days the LORD Began to Cut Israel Short",
        "In Those Days the LORD Began to Cut Israel Short brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "🗡️ Hazael Smote Them in All the Coasts of Israel",
        "Hazael Smote Them in All the Coasts of Israel brings conflict into view.\n\nThis is not just action in the story. War shows fear, pride, danger, and the cost of broken leadership.\n\n\n\n⚔️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 11,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 11:1-6",
    title: "When Athaliah the Mother of Ahaziah Saw That Her",
    icon: "🙏",
    phrases: [
      [
        "✨ When Athaliah the Mother of Ahaziah Saw That Her Son Was Dead",
        "When Athaliah the Mother of Ahaziah Saw That Her Son Was Dead names grief plainly.\n\nThe Bible does not hide the pain in the story. Death has entered the home, and the need is real.\n\n\n\n😢 Loss\n\n🏠 A hurting household\n\n🙏 Need for God's mercy\n\n\n\nThe phrase helps the reader feel why the next act of God matters so deeply."
      ],
      [
        "📜 She Arose and Destroyed All the Seed Royal",
        "She Arose and Destroyed All the Seed Royal carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 The Daughter of King Joram",
        "The Daughter of King Joram identifies family connection.\n\nIn Kings, family lines matter because the choices of one generation often shape the next generation.\n\n\n\n🏠 Family line\n\n👑 Royal connection\n\n📜 History being traced\n\n\n\nThe phrase helps the reader follow who belongs to which royal house and how the story moves through generations."
      ],
      [
        "🙏 Sister of Ahaziah",
        "Sister of Ahaziah carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 11,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 11:7-12",
    title: "Two Parts of All You That Go Forth",
    icon: "🔥",
    phrases: [
      [
        "✨ Two Parts of All You That Go Forth on the Sabbath",
        "Two Parts of All You That Go Forth on the Sabbath carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Even They Shall Keep the Watch of the House of the LORD About the King",
        "Even They Shall Keep the Watch of the House of the LORD About the King brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "👑 Ye Shall Compass the King Round About",
        "Ye Shall Compass the King Round About is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "📜 Every Man with His Weapons in His Hand",
        "Every Man with His Weapons in His Hand carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 11,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 11:13-18",
    title: "When Athaliah Heard the Noise of the Guard",
    icon: "🏙️",
    phrases: [
      [
        "✨ When Athaliah Heard the Noise of the Guard and of the People",
        "When Athaliah Heard the Noise of the Guard and of the People carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 She Came to the People into the Temple of the LORD",
        "She Came to the People into the Temple of the LORD is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "👑 When She Looked",
        "When She Looked carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 The King Stood by a Pillar",
        "The King Stood by a Pillar is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 11,
    startVerse: 19,
    endVerse: 21,
    reference: "2 Kings 11:19-21",
    title: "He Took the Rulers Over Hundreds",
    icon: "⚠️",
    phrases: [
      [
        "✨ He Took the Rulers Over Hundreds",
        "He Took the Rulers Over Hundreds carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 All the People of the Land",
        "All the People of the Land shows that the crisis touches everyone.\n\nThe phrase includes ordinary people and important people together. No level of society is untouched.\n\n\n\n👥 Everyone affected\n\n🏙️ A whole community shaken\n\n⚠️ Judgment reaches widely\n\n\n\nThe phrase helps the reader see that national sin brings public consequences."
      ],
      [
        "🏙️ The City Was in Quiet",
        "The City Was in Quiet carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Seven Years Old Was Jehoash When He Began to Reign",
        "Seven Years Old Was Jehoash When He Began to Reign gives the reader the shape of a king's rule.\n\nThe Bible records details like age, length of reign, and place of rule so the reader can follow the history carefully.\n\n\n\n👑 A king begins\n\n📅 Time is counted\n\n⚖️ His rule will be judged by God\n\n\n\nThe phrase reminds the reader that leadership in Kings is never just power. It is responsibility before the LORD."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 12,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 12:1-6",
    title: "In the Seventh Year of Jehu Jehoash Began",
    icon: "🕍",
    phrases: [
      [
        "👑 In the Seventh Year of Jehu Jehoash Began to Reign",
        "In the Seventh Year of Jehu Jehoash Began to Reign is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "✨ Forty Years Reigned He in Jerusalem",
        "Forty Years Reigned He in Jerusalem gives the reader the shape of a king's rule.\n\nThe Bible records details like age, length of reign, and place of rule so the reader can follow the history carefully.\n\n\n\n👑 A king begins\n\n📅 Time is counted\n\n⚖️ His rule will be judged by God\n\n\n\nThe phrase reminds the reader that leadership in Kings is never just power. It is responsibility before the LORD."
      ],
      [
        "🙏 Jehoash Did That Which Was Right in the Sight of the LORD All His Days Wherein Jehoiada the Priest Instructed Him",
        "Jehoash Did That Which Was Right in the Sight of the LORD All His Days Wherein Jehoiada the Priest Instructed Him brings priestly leadership into view.\n\nThe priest served around the temple and helped guide the people back toward God's word and worship.\n\n\n\n🕍 Temple service\n\n📜 God's word recovered\n\n🙏 Worship being restored\n\n\n\nThe phrase helps the reader understand why the discovery in the temple matters so much."
      ],
      [
        "📜 In the Seventh Year of Jehu Jehoash Began",
        "In the Seventh Year of Jehu Jehoash Began is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 12,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 12:7-12",
    title: "Then King Jehoash Called for Jehoiada the Priest",
    icon: "💛",
    phrases: [
      [
        "👑 Then King Jehoash Called for Jehoiada the Priest",
        "Then King Jehoash Called for Jehoiada the Priest brings priestly leadership into view.\n\nThe priest served around the temple and helped guide the people back toward God's word and worship.\n\n\n\n🕍 Temple service\n\n📜 God's word recovered\n\n🙏 Worship being restored\n\n\n\nThe phrase helps the reader understand why the discovery in the temple matters so much."
      ],
      [
        "📜 The Other Priests",
        "The Other Priests brings priestly leadership into view.\n\nThe priest served around the temple and helped guide the people back toward God's word and worship.\n\n\n\n🕍 Temple service\n\n📜 God's word recovered\n\n🙏 Worship being restored\n\n\n\nThe phrase helps the reader understand why the discovery in the temple matters so much."
      ],
      [
        "✨ The Priests Consented to Receive No More Money of the People",
        "The Priests Consented to Receive No More Money of the People is stewardship language.\n\nThe money for the temple repair was handled by people who could be trusted.\n\n\n\n💰 Money handled rightly\n\n🛠️ Temple repair\n\n✅ Faithful workers\n\n\n\nThe phrase helps the reader see that worship also includes honest work and trustworthy handling of resources."
      ],
      [
        "🏙️ Neither to Repair the Breaches of the House",
        "Neither to Repair the Breaches of the House can mean more than a building.\n\nIn Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership choices can affect an entire household after the leader is gone."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 12,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 12:13-18",
    title: "Howbeit There Were Not Made for the House",
    icon: "🗡️",
    phrases: [
      [
        "🙏 Howbeit There Were Not Made for the House of the LORD Bowls of Silver",
        "Howbeit There Were Not Made for the House of the LORD Bowls of Silver brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 Any Vessels of Gold",
        "Any Vessels of Gold carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🏙️ Howbeit There Were Not Made for the House",
        "Howbeit There Were Not Made for the House can mean more than a building.\n\nIn Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership choices can affect an entire household after the leader is gone."
      ],
      [
        "✨ Repaired Therewith the House of the LORD",
        "Repaired Therewith the House of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 12,
    startVerse: 19,
    endVerse: 21,
    reference: "2 Kings 12:19-21",
    title: "The Rest of the Acts of Joash",
    icon: "📍",
    phrases: [
      [
        "✨ The Rest of the Acts of Joash",
        "The Rest of the Acts of Joash carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 All That He Did",
        "All That He Did carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 His Servants Arose",
        "His Servants Arose carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Made a Conspiracy",
        "Made a Conspiracy carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 13,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 13:1-6",
    title: "In the Three and Twentieth Year of Joash",
    icon: "🧠",
    phrases: [
      [
        "👑 In the Three and Twentieth Year of Joash the Son of Ahaziah King of Judah Jehoahaz the Son of Jehu Began to Reign Over Israel in Samaria",
        "In the Three and Twentieth Year of Joash the Son of Ahaziah King of Judah Jehoahaz the Son of Jehu Began to Reign Over Israel in Samaria is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "✨ Reigned Seventeen Years",
        "Reigned Seventeen Years gives the reader the shape of a king's rule.\n\nThe Bible records details like age, length of reign, and place of rule so the reader can follow the history carefully.\n\n\n\n👑 A king begins\n\n📅 Time is counted\n\n⚖️ His rule will be judged by God\n\n\n\nThe phrase reminds the reader that leadership in Kings is never just power. It is responsibility before the LORD."
      ],
      [
        "🙏 He Did That Which Was Evil in the Sight of the LORD",
        "He Did That Which Was Evil in the Sight of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "⚠️ Followed the Sins of Jeroboam the Son of Nebat",
        "Followed the Sins of Jeroboam the Son of Nebat is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 13,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 13:7-12",
    title: "Neither Did He Leave of the People to Jehoahaz",
    icon: "😢",
    phrases: [
      [
        "✨ Neither Did He Leave of the People to Jehoahaz but Fifty Horsemen",
        "Neither Did He Leave of the People to Jehoahaz but Fifty Horsemen carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Ten Thousand Footmen",
        "Ten Thousand Footmen carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Now the Rest of the Acts of Jehoahaz",
        "Now the Rest of the Acts of Jehoahaz carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 All That He Did",
        "All That He Did carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 13,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 13:13-18",
    title: "Joash Slept with His Fathers",
    icon: "✨",
    phrases: [
      [
        "✨ Joash Slept with His Fathers",
        "Joash Slept with His Fathers carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Jeroboam Sat Upon His Throne",
        "Jeroboam Sat Upon His Throne is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "📜 Now Elisha Was Fallen Sick of His Sickness Whereof He Died",
        "Now Elisha Was Fallen Sick of His Sickness Whereof He Died is grief or consequence language.\n\nThe passage is naming pain directly. The Bible does not pretend sin, war, and rebellion have no cost.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase helps the reader feel the seriousness of what has happened in the story."
      ],
      [
        "🙏 Joash the King of Israel Came Down unto Him",
        "Joash the King of Israel Came Down unto Him is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 13,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Kings 13:19-24",
    title: "The Man of God Was Wroth with Him",
    icon: "📦",
    phrases: [
      [
        "🙏 The Man of God Was Wroth with Him",
        "The Man of God Was Wroth with Him brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 Thou Shouldest Have Smitten Five or Six Times",
        "Thou Shouldest Have Smitten Five or Six Times carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 They Buried Him",
        "They Buried Him carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "✨ The Bands of the Moabites Invaded the Land at the Coming in of the Year",
        "The Bands of the Moabites Invaded the Land at the Coming in of the Year describes enemy groups sent against Judah.\n\nThese bands are part of the pressure falling on the kingdom as judgment closes in.\n\n\n\n🗡️ Enemy raids\n\n⚠️ Judgment pressure\n\n🏙️ Judah weakening\n\n\n\nThe phrase helps the reader see that the fall of Judah happens step by step, not all at once."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 13,
    startVerse: 25,
    endVerse: 25,
    reference: "2 Kings 13:25",
    title: "Jehoash the Son of Jehoahaz Took Again Out",
    icon: "🚶",
    phrases: [
      [
        "✨ Jehoash the Son of Jehoahaz Took Again Out of the Hand of Ben-hadad the Son of Hazael the Cities",
        "Jehoash the Son of Jehoahaz Took Again Out of the Hand of Ben-hadad the Son of Hazael the Cities is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Jehoash the Son of Jehoahaz Took Again Out",
        "Jehoash the Son of Jehoahaz Took Again Out is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 The Son of Jehoahaz Took Again Out of",
        "The Son of Jehoahaz Took Again Out of is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Son of Jehoahaz Took Again Out of the",
        "Son of Jehoahaz Took Again Out of the is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 14,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 14:1-6",
    title: "In the Second Year of Joash Son of Jehoahaz",
    icon: "🌪️",
    phrases: [
      [
        "👑 In the Second Year of Joash Son of Jehoahaz King of Israel Reigned Amaziah the Son of Joash King of Judah",
        "In the Second Year of Joash Son of Jehoahaz King of Israel Reigned Amaziah the Son of Joash King of Judah is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "📜 In the Second Year of Joash Son of Jehoahaz",
        "In the Second Year of Joash Son of Jehoahaz is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "✨ Son of Jehoahaz King of",
        "Son of Jehoahaz King of is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 He Was Twenty and Five Years Old When He Began to Reign",
        "He Was Twenty and Five Years Old When He Began to Reign is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 14,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 14:7-12",
    title: "He Slew of Edom in the Valley of Salt",
    icon: "🧥",
    phrases: [
      [
        "✨ He Slew of Edom in the Valley of Salt Ten Thousand",
        "He Slew of Edom in the Valley of Salt Ten Thousand names the cruelty and loss in Jerusalem's fall.\n\nThe phrase is not a small detail. It shows how severe the judgment and humiliation became when Babylon conquered Judah.\n\n\n\n😢 Loss\n\n👑 A fallen royal house\n\n⚠️ Judgment carried out\n\n\n\nThe phrase helps the reader feel the human cost of refusing the LORD's warnings."
      ],
      [
        "🗡️ Took Selah by War",
        "Took Selah by War brings conflict into view.\n\nThis is not just action in the story. War shows fear, pride, danger, and the cost of broken leadership.\n\n\n\n⚔️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "👑 Then Amaziah Sent Messengers to Jehoash",
        "Then Amaziah Sent Messengers to Jehoash carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 The Son of Jehoahaz Son of Jehu",
        "The Son of Jehoahaz Son of Jehu is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 14,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 14:13-18",
    title: "Jehoash King of Israel Took Amaziah King of Judah",
    icon: "💧",
    phrases: [
      [
        "👑 Jehoash King of Israel Took Amaziah King of Judah",
        "Jehoash King of Israel Took Amaziah King of Judah is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "📜 The Son of Jehoash the Son of Ahaziah",
        "The Son of Jehoash the Son of Ahaziah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "✨ He Took All the Gold and Silver",
        "He Took All the Gold and Silver carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 All the Vessels That Were Found in the House of the LORD",
        "All the Vessels That Were Found in the House of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 14,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Kings 14:19-24",
    title: "Now They Made a Conspiracy Against Him in Jerusalem",
    icon: "👑",
    phrases: [
      [
        "🏙️ Now They Made a Conspiracy Against Him in Jerusalem",
        "Now They Made a Conspiracy Against Him in Jerusalem carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 He Fled to Lachish",
        "He Fled to Lachish carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 They Brought Him on Horses",
        "They Brought Him on Horses is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "✨ He Was Buried at Jerusalem with His Fathers in the City of David",
        "He Was Buried at Jerusalem with His Fathers in the City of David carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 14,
    startVerse: 25,
    endVerse: 29,
    reference: "2 Kings 14:25-29",
    title: "He Restored the Coast of Israel from the Entering",
    icon: "📜",
    phrases: [
      [
        "✨ He Restored the Coast of Israel from the Entering of Hamath unto the Sea of the Plain",
        "He Restored the Coast of Israel from the Entering of Hamath unto the Sea of the Plain carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 According to the Word of the LORD God of Israel",
        "According to the Word of the LORD God of Israel brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "👑 He Restored the Coast of Israel from the Entering",
        "He Restored the Coast of Israel from the Entering carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 That It Was Very Bitter",
        "That It Was Very Bitter carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 15,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 15:1-6",
    title: "In the Twenty and Seventh Year of Jeroboam King",
    icon: "🛡️",
    phrases: [
      [
        "👑 In the Twenty and Seventh Year of Jeroboam King of Israel Began Azariah Son of Amaziah King of Judah to Reign",
        "In the Twenty and Seventh Year of Jeroboam King of Israel Began Azariah Son of Amaziah King of Judah to Reign is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "📜 Seventh Year of Jeroboam",
        "Seventh Year of Jeroboam is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "✨ In the Twenty and Seventh Year of Jeroboam King",
        "In the Twenty and Seventh Year of Jeroboam King is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "🙏 Sixteen Years Old Was He When He Began to Reign",
        "Sixteen Years Old Was He When He Began to Reign gives the reader the shape of a king's rule.\n\nThe Bible records details like age, length of reign, and place of rule so the reader can follow the history carefully.\n\n\n\n👑 A king begins\n\n📅 Time is counted\n\n⚖️ His rule will be judged by God\n\n\n\nThe phrase reminds the reader that leadership in Kings is never just power. It is responsibility before the LORD."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 15,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 15:7-12",
    title: "So Azariah Slept with His Fathers",
    icon: "🙏",
    phrases: [
      [
        "✨ So Azariah Slept with His Fathers",
        "So Azariah Slept with His Fathers carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🏙️ They Buried Him with His Fathers in the City of David",
        "They Buried Him with His Fathers in the City of David carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 In the Thirty and Eighth Year of Azariah King of Judah Did Zachariah the Son of Jeroboam Reign Over Israel in Samaria Six Months",
        "In the Thirty and Eighth Year of Azariah King of Judah Did Zachariah the Son of Jeroboam Reign Over Israel in Samaria Six Months is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "🙏 Eighth Year of Azariah",
        "Eighth Year of Azariah is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 15,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 15:13-18",
    title: "Shallum the Son of Jabesh Began to Reign",
    icon: "🔥",
    phrases: [
      [
        "👑 Shallum the Son of Jabesh Began to Reign in the Nine and Thirtieth Year of Uzziah King of Judah",
        "Shallum the Son of Jabesh Began to Reign in the Nine and Thirtieth Year of Uzziah King of Judah is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "✨ He Reigned a Full Month in Samaria",
        "He Reigned a Full Month in Samaria is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "📜 Shallum the Son of Jabesh Began to Reign",
        "Shallum the Son of Jabesh Began to Reign is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🏙️ Came to Samaria",
        "Came to Samaria gives the reader the location of the movement.\n\nBible places are not random labels. They help us follow where God's prophet, Israel's kings, or enemy powers are moving.\n\n\n\n📍 Real place\n\n🚶 Movement in the story\n\n🧭 The map of Scripture\n\n\n\nThe phrase helps the reader remember that these events happen in real places, not in a vague story world."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 15,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Kings 15:19-24",
    title: "Pul the King of Assyria Came Against the Land",
    icon: "🏙️",
    phrases: [
      [
        "👑 Pul the King of Assyria Came Against the Land",
        "Pul the King of Assyria Came Against the Land is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "📜 Menahem Gave Pul a Thousand Talents of Silver",
        "Menahem Gave Pul a Thousand Talents of Silver carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "✨ Menahem Exacted the Money of Israel",
        "Menahem Exacted the Money of Israel is stewardship language.\n\nThe money for the temple repair was handled by people who could be trusted.\n\n\n\n💰 Money handled rightly\n\n🛠️ Temple repair\n\n✅ Faithful workers\n\n\n\nThe phrase helps the reader see that worship also includes honest work and trustworthy handling of resources."
      ],
      [
        "🙏 Even of All the Mighty Men of Wealth",
        "Even of All the Mighty Men of Wealth carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 15,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Kings 15:25-30",
    title: "Pekah the Son of Remaliah",
    icon: "⚠️",
    phrases: [
      [
        "✨ Pekah the Son of Remaliah",
        "Pekah the Son of Remaliah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 A Captain of His",
        "A Captain of His carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 The Rest of the Acts of Pekahiah",
        "The Rest of the Acts of Pekahiah carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 All That He Did",
        "All That He Did carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 15,
    startVerse: 31,
    endVerse: 36,
    reference: "2 Kings 15:31-36",
    title: "The Rest of the Acts of Pekah",
    icon: "🕍",
    phrases: [
      [
        "✨ The Rest of the Acts of Pekah",
        "The Rest of the Acts of Pekah carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 All That He Did",
        "All That He Did carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 In the Second Year of Pekah the Son of Remaliah King of Israel Began Jotham the Son of Uzziah King of Judah to Reign",
        "In the Second Year of Pekah the Son of Remaliah King of Israel Began Jotham the Son of Uzziah King of Judah to Reign is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "🙏 Year of Pekah the Son",
        "Year of Pekah the Son is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 15,
    startVerse: 37,
    endVerse: 38,
    reference: "2 Kings 15:37-38",
    title: "In Those Days the LORD Began to Send Against",
    icon: "💛",
    phrases: [
      [
        "🙏 In Those Days the LORD Began to Send Against Judah Rezin the King of Syria",
        "In Those Days the LORD Began to Send Against Judah Rezin the King of Syria is command language.\n\nSomeone is being told to act. The phrase moves the story from information into response.\n\n\n\n📜 A command\n\n🚶 Action required\n\n⚠️ A decision point\n\n\n\nThe phrase helps the reader notice when the story turns because someone must obey, refuse, or respond."
      ],
      [
        "📜 Pekah the Son of Remaliah",
        "Pekah the Son of Remaliah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Jotham Slept with His Fathers",
        "Jotham Slept with His Fathers carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🏙️ Was Buried with His Fathers in the City of David His Father",
        "Was Buried with His Fathers in the City of David His Father carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 16,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 16:1-6",
    title: "In the Seventeenth Year of Pekah the Son",
    icon: "🗡️",
    phrases: [
      [
        "👑 In the Seventeenth Year of Pekah the Son of Remaliah Ahaz the Son of Jotham King of Judah Began to Reign",
        "In the Seventeenth Year of Pekah the Son of Remaliah Ahaz the Son of Jotham King of Judah Began to Reign is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "📜 Year of Pekah the Son",
        "Year of Pekah the Son is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "✨ The Son of Remaliah Ahaz",
        "The Son of Remaliah Ahaz is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Twenty Years Old Was Ahaz When He Began to Reign",
        "Twenty Years Old Was Ahaz When He Began to Reign is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 16,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 16:7-12",
    title: "So Ahaz Sent Messengers to Tiglath-pileser King of Assyria",
    icon: "📍",
    phrases: [
      [
        "👑 So Ahaz Sent Messengers to Tiglath-pileser King of Assyria",
        "So Ahaz Sent Messengers to Tiglath-pileser King of Assyria is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "📜 I Am Thy Servant and Thy Son",
        "I Am Thy Servant and Thy Son carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Ahaz Took the Silver and Gold That Was Found in the House of the LORD",
        "Ahaz Took the Silver and Gold That Was Found in the House of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "✨ In the Treasures of the King’s House",
        "In the Treasures of the King’s House is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 16,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 16:13-18",
    title: "He Burnt His Burnt Offering and His Meat Offering",
    icon: "🧠",
    phrases: [
      [
        "🔥 He Burnt His Burnt Offering and His Meat Offering",
        "He Burnt His Burnt Offering and His Meat Offering connects the timing of the miracle with worship.\n\nThe meat offering was an offering brought before the LORD. The detail quietly links God's help with the rhythms of worship.\n\n\n\n🕍 Worship timing\n\n🙏 Dependence on God\n\n💧 Help arrives\n\n\n\nThe phrase helps the reader see that deliverance is not separated from worship."
      ],
      [
        "📜 Poured His Drink Offering",
        "Poured His Drink Offering carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 He Brought Also the Brasen Altar",
        "He Brought Also the Brasen Altar is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "🙏 Which Was Before the LORD",
        "Which Was Before the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 16,
    startVerse: 19,
    endVerse: 20,
    reference: "2 Kings 16:19-20",
    title: "Now the Rest of the Acts of Ahaz Which",
    icon: "😢",
    phrases: [
      [
        "✨ Now the Rest of the Acts of Ahaz Which He Did",
        "Now the Rest of the Acts of Ahaz Which He Did carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Are They Not Written in the Book of the Chronicles of the Kings of Judah",
        "Are They Not Written in the Book of the Chronicles of the Kings of Judah is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "📜 Ahaz Slept with His Fathers",
        "Ahaz Slept with His Fathers carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🏙️ Was Buried with His Fathers in the City of David",
        "Was Buried with His Fathers in the City of David carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 17,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 17:1-6",
    title: "In the Twelfth Year of Ahaz King of Judah",
    icon: "✨",
    phrases: [
      [
        "👑 In the Twelfth Year of Ahaz King of Judah Began Hoshea the Son of Elah to Reign in Samaria Over Israel Nine Years",
        "In the Twelfth Year of Ahaz King of Judah Began Hoshea the Son of Elah to Reign in Samaria Over Israel Nine Years is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "✨ In the Twelfth Year of Ahaz King of Judah",
        "In the Twelfth Year of Ahaz King of Judah is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "📜 King of Judah Began Hoshea",
        "King of Judah Began Hoshea is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "🙏 He Did That Which Was Evil in the Sight of the LORD",
        "He Did That Which Was Evil in the Sight of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 17,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 17:7-12",
    title: "For So It Was",
    icon: "📦",
    phrases: [
      [
        "✨ For So It Was",
        "For So It Was carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 That the Children of Israel Had Sinned Against the LORD Their God",
        "That the Children of Israel Had Sinned Against the LORD Their God brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "👑 Walked in the Statutes of the Heathen",
        "Walked in the Statutes of the Heathen carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Whom the LORD Cast Out from Before the Children of Israel",
        "Whom the LORD Cast Out from Before the Children of Israel brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 17,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 17:13-18",
    title: "Yet the LORD Testified Against Israel",
    icon: "🚶",
    phrases: [
      [
        "🙏 Yet the LORD Testified Against Israel",
        "Yet the LORD Testified Against Israel brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 By All the Prophets",
        "By All the Prophets points to a message that comes with authority.\n\nA prophet is not giving a private opinion. He is speaking because God has sent His word into the situation.\n\n\n\n📜 God's message\n\n🙏 A messenger sent\n\n⚠️ A warning to hear\n\n\n\nThe phrase helps the reader understand that ignoring the prophet means ignoring the LORD who sent him."
      ],
      [
        "👑 Notwithstanding They Would Not Hear",
        "Notwithstanding They Would Not Hear carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "✨ But Hardened Their Necks",
        "But Hardened Their Necks carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 17,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Kings 17:19-24",
    title: "Also Judah Kept Not the Commandments of the LORD",
    icon: "👀",
    phrases: [
      [
        "🙏 Also Judah Kept Not the Commandments of the LORD Their God",
        "Also Judah Kept Not the Commandments of the LORD Their God brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "✨ Also Judah Kept Not the Commandments of the LORD",
        "Also Judah Kept Not the Commandments of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 The LORD Rejected All the Seed of Israel",
        "The LORD Rejected All the Seed of Israel brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "👑 Delivered Them into the Hand of Spoilers",
        "Delivered Them into the Hand of Spoilers shows provision becoming practical help.\n\nThe oil is not just a miracle to admire. It becomes the way the widow can pay debt and live.\n\n\n\n🫒 Oil provided\n\n💰 Debt answered\n\n🏠 Life sustained\n\n\n\nThe phrase helps the reader see that God's mercy reaches ordinary needs like money, debt, and food."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 17,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Kings 17:25-30",
    title: "So It Was at the Beginning of Their Dwelling",
    icon: "🏠",
    phrases: [
      [
        "✨ So It Was at the Beginning of Their Dwelling There",
        "So It Was at the Beginning of Their Dwelling There carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 So It Was at the Beginning of Their Dwelling",
        "So It Was at the Beginning of Their Dwelling carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Wherefore They Spake to the King of Assyria",
        "Wherefore They Spake to the King of Assyria is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "🙏 The Nations Which Thou Hast Removed",
        "The Nations Which Thou Hast Removed carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 17,
    startVerse: 31,
    endVerse: 36,
    reference: "2 Kings 17:31-36",
    title: "The Avites Made Nibhaz and Tartak",
    icon: "📅",
    phrases: [
      [
        "✨ The Avites Made Nibhaz and Tartak",
        "The Avites Made Nibhaz and Tartak carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🔥 The Sepharvites Burnt Their Children in Fire to Adrammelech and Anammelech",
        "The Sepharvites Burnt Their Children in Fire to Adrammelech and Anammelech shows God's power breaking into the scene.\n\nFire from heaven is not normal human strength. It shows that the LORD is answering, judging, or defending His word.\n\n\n\n🔥 Power from God\n\n🙏 Holy authority\n\n⚠️ Judgment is serious\n\n\n\nThe phrase helps the reader see that God's word is backed by the God who rules heaven and earth."
      ],
      [
        "🙏 So They Feared the LORD",
        "So They Feared the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 Made unto Themselves of the Lowest of Them Priests of the High Places",
        "Made unto Themselves of the Lowest of Them Priests of the High Places brings priestly leadership into view.\n\nThe priest served around the temple and helped guide the people back toward God's word and worship.\n\n\n\n🕍 Temple service\n\n📜 God's word recovered\n\n🙏 Worship being restored\n\n\n\nThe phrase helps the reader understand why the discovery in the temple matters so much."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 17,
    startVerse: 37,
    endVerse: 41,
    reference: "2 Kings 17:37-41",
    title: "Which He Wrote for You",
    icon: "⚖️",
    phrases: [
      [
        "✨ Which He Wrote for You",
        "Which He Wrote for You carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Ye Shall Observe to Do for Evermore",
        "Ye Shall Observe to Do for Evermore carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 The Covenant That I Have Made with You Ye Shall Not Forget",
        "The Covenant That I Have Made with You Ye Shall Not Forget carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Neither Shall Ye Fear Other Gods",
        "Neither Shall Ye Fear Other Gods brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 18,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 18:1-6",
    title: "Now It Came to Pass in the Third Year",
    icon: "🌪️",
    phrases: [
      [
        "👑 Now It Came to Pass in the Third Year of Hoshea Son of Elah King of Israel",
        "Now It Came to Pass in the Third Year of Hoshea Son of Elah King of Israel is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "📜 Now It Came to Pass in the Third Year",
        "Now It Came to Pass in the Third Year is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "✨ Twenty and Five Years Old Was He When He Began to Reign",
        "Twenty and Five Years Old Was He When He Began to Reign is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "🙏 He Reigned Twenty and Nine Years in Jerusalem",
        "He Reigned Twenty and Nine Years in Jerusalem is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 18,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 18:7-12",
    title: "The LORD Was with Him",
    icon: "🧥",
    phrases: [
      [
        "🙏 The LORD Was with Him",
        "The LORD Was with Him brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 He Prospered Whithersoever He Went Forth",
        "He Prospered Whithersoever He Went Forth means the king found success wherever he went.\n\nThe wording points to more than luck. It connects Hezekiah's success with the LORD being with him.\n\n\n\n🙏 God's help\n\n👑 Faithful leadership\n\n📍 Success wherever he went\n\n\n\nThe phrase helps the reader see that Hezekiah's strength came from trusting the LORD, not copying the nations."
      ],
      [
        "🗡️ He Smote the Philistines",
        "He Smote the Philistines brings conflict into view.\n\nThis is not just action in the story. War shows fear, pride, danger, and the cost of broken leadership.\n\n\n\n⚔️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "✨ Even unto Gaza",
        "Even unto Gaza gives the reader the location of the movement.\n\nBible places are not random labels. They help us follow where God's prophet, Israel's kings, or enemy powers are moving.\n\n\n\n📍 Real place\n\n🚶 Movement in the story\n\n🧭 The map of Scripture\n\n\n\nThe phrase helps the reader remember that these events happen in real places, not in a vague story world."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 18,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 18:13-18",
    title: "Now in the Fourteenth Year of King Hezekiah Did",
    icon: "💧",
    phrases: [
      [
        "👑 Now in the Fourteenth Year of King Hezekiah Did Sennacherib King of Assyria Come Up Against All the Fenced Cities of Judah",
        "Now in the Fourteenth Year of King Hezekiah Did Sennacherib King of Assyria Come Up Against All the Fenced Cities of Judah is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "✨ Hezekiah King of Judah Sent to the King of Assyria to Lachish",
        "Hezekiah King of Judah Sent to the King of Assyria to Lachish is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "📜 I Have Offended",
        "I Have Offended carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Hezekiah Gave Him All the Silver That Was Found in the House of the LORD",
        "Hezekiah Gave Him All the Silver That Was Found in the House of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 18,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Kings 18:19-24",
    title: "Rab-shakeh Said unto Them",
    icon: "👑",
    phrases: [
      [
        "✨ Rab-shakeh Said unto Them",
        "Rab-shakeh Said unto Them marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "📜 Speak Ye Now to Hezekiah",
        "Speak Ye Now to Hezekiah carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 But They Are but Vain Words",
        "But They Are but Vain Words points to a message that comes with authority.\n\nA prophet is not giving a private opinion. He is speaking because God has sent His word into the situation.\n\n\n\n📜 God's message\n\n🙏 A messenger sent\n\n⚠️ A warning to hear\n\n\n\nThe phrase helps the reader understand that ignoring the prophet means ignoring the LORD who sent him."
      ],
      [
        "🗡️ I Have Counsel and Strength for the War",
        "I Have Counsel and Strength for the War brings conflict into view.\n\nThis is not just action in the story. War shows fear, pride, danger, and the cost of broken leadership.\n\n\n\n⚔️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 18,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Kings 18:25-30",
    title: "Am I Now Come Up Without the LORD Against",
    icon: "📜",
    phrases: [
      [
        "🙏 Am I Now Come Up Without the LORD Against This Place to Destroy It",
        "Am I Now Come Up Without the LORD Against This Place to Destroy It brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "✨ The LORD Said to Me",
        "The LORD Said to Me brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "👑 Then Said Eliakim the Son of Hilkiah",
        "Then Said Eliakim the Son of Hilkiah brings priestly leadership into view.\n\nThe priest served around the temple and helped guide the people back toward God's word and worship.\n\n\n\n🕍 Temple service\n\n📜 God's word recovered\n\n🙏 Worship being restored\n\n\n\nThe phrase helps the reader understand why the discovery in the temple matters so much."
      ],
      [
        "📜 I Pray Thee",
        "I Pray Thee is polite request language.\n\nIn older Bible wording, I pray thee often means please or I ask you.\n\n\n\n🙏 A request\n\n💬 Respectful speech\n\n🔑 A choice being placed before someone\n\n\n\nThe phrase helps the reader hear the tone of the conversation instead of reading it like a command."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 18,
    startVerse: 31,
    endVerse: 36,
    reference: "2 Kings 18:31-36",
    title: "Hearken Not to Hezekiah",
    icon: "🛡️",
    phrases: [
      [
        "✨ Hearken Not to Hezekiah",
        "Hearken Not to Hezekiah carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 For Thus Saith the King of Assyria",
        "For Thus Saith the King of Assyria points to a message that comes with authority.\n\nA prophet is not giving a private opinion. He is speaking because God has sent His word into the situation.\n\n\n\n📜 God's message\n\n🙏 A messenger sent\n\n⚠️ A warning to hear\n\n\n\nThe phrase helps the reader understand that ignoring the prophet means ignoring the LORD who sent him."
      ],
      [
        "📜 Until I Come and Take You Away to a Land Like Your Own Land",
        "Until I Come and Take You Away to a Land Like Your Own Land carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 A Land of Corn and Wine",
        "A Land of Corn and Wine carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 18,
    startVerse: 37,
    endVerse: 37,
    reference: "2 Kings 18:37",
    title: "Then Came Eliakim the Son of Hilkiah",
    icon: "🙏",
    phrases: [
      [
        "✨ Then Came Eliakim the Son of Hilkiah",
        "Then Came Eliakim the Son of Hilkiah brings priestly leadership into view.\n\nThe priest served around the temple and helped guide the people back toward God's word and worship.\n\n\n\n🕍 Temple service\n\n📜 God's word recovered\n\n🙏 Worship being restored\n\n\n\nThe phrase helps the reader understand why the discovery in the temple matters so much."
      ],
      [
        "🏙️ Which Was Over the Household",
        "Which Was Over the Household can mean more than a building.\n\nIn Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership choices can affect an entire household after the leader is gone."
      ],
      [
        "👑 Came Eliakim the Son of Hilkiah, Which Was",
        "Came Eliakim the Son of Hilkiah, Which Was brings priestly leadership into view.\n\nThe priest served around the temple and helped guide the people back toward God's word and worship.\n\n\n\n🕍 Temple service\n\n📜 God's word recovered\n\n🙏 Worship being restored\n\n\n\nThe phrase helps the reader understand why the discovery in the temple matters so much."
      ],
      [
        "🙏 Eliakim the Son of Hilkiah, Which Was Over",
        "Eliakim the Son of Hilkiah, Which Was Over brings priestly leadership into view.\n\nThe priest served around the temple and helped guide the people back toward God's word and worship.\n\n\n\n🕍 Temple service\n\n📜 God's word recovered\n\n🙏 Worship being restored\n\n\n\nThe phrase helps the reader understand why the discovery in the temple matters so much."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 19,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 19:1-6",
    title: "It Came to Pass",
    icon: "🔥",
    phrases: [
      [
        "✨ It Came to Pass",
        "It Came to Pass is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "👑 When King Hezekiah Heard It",
        "When King Hezekiah Heard It is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "📜 He Sent Eliakim",
        "He Sent Eliakim carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🏙️ Which Was Over the Household",
        "Which Was Over the Household can mean more than a building.\n\nIn Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership choices can affect an entire household after the leader is gone."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 19,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 19:7-12",
    title: "I Will Send a Blast Upon Him",
    icon: "🏙️",
    phrases: [
      [
        "✨ I Will Send a Blast Upon Him",
        "I Will Send a Blast Upon Him is command language.\n\nSomeone is being told to act. The phrase moves the story from information into response.\n\n\n\n📜 A command\n\n🚶 Action required\n\n⚠️ A decision point\n\n\n\nThe phrase helps the reader notice when the story turns because someone must obey, refuse, or respond."
      ],
      [
        "📜 He Shall Hear a Rumour",
        "He Shall Hear a Rumour carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 So Rab-shakeh Returned",
        "So Rab-shakeh Returned is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "🙏 Found the King of Assyria Warring Against Libnah",
        "Found the King of Assyria Warring Against Libnah is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 19,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 19:13-18",
    title: "Where Is the King of Hamath",
    icon: "⚠️",
    phrases: [
      [
        "👑 Where Is the King of Hamath",
        "Where Is the King of Hamath is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "✨ The King of Arpad",
        "The King of Arpad is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "📜 Hezekiah Received the Letter of the Hand of the Messengers",
        "Hezekiah Received the Letter of the Hand of the Messengers carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Hezekiah Went Up into the House of the LORD",
        "Hezekiah Went Up into the House of the LORD is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 19,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Kings 19:19-24",
    title: "O LORD Our God",
    icon: "🕍",
    phrases: [
      [
        "🙏 O LORD Our God",
        "O LORD Our God brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 I Beseech Thee",
        "I Beseech Thee carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Then Isaiah the Son of Amoz Sent to Hezekiah",
        "Then Isaiah the Son of Amoz Sent to Hezekiah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "✨ Thus Saith the LORD God of Israel",
        "Thus Saith the LORD God of Israel brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 19,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Kings 19:25-30",
    title: "Hast Thou Not Heard Long Ago How I Have",
    icon: "💛",
    phrases: [
      [
        "✨ Hast Thou Not Heard Long Ago How I Have Done It",
        "Hast Thou Not Heard Long Ago How I Have Done It carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Hast Thou Not Heard Long Ago How I Have",
        "Hast Thou Not Heard Long Ago How I Have carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Therefore Their Inhabitants Were of Small Power",
        "Therefore Their Inhabitants Were of Small Power carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 They Were Dismayed and Confounded",
        "They Were Dismayed and Confounded carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 19,
    startVerse: 31,
    endVerse: 36,
    reference: "2 Kings 19:31-36",
    title: "For Out of Jerusalem Shall Go Forth a Remnant",
    icon: "🗡️",
    phrases: [
      [
        "🏙️ For Out of Jerusalem Shall Go Forth a Remnant",
        "For Out of Jerusalem Shall Go Forth a Remnant carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 They That Escape Out of Mount Zion",
        "They That Escape Out of Mount Zion carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Therefore Thus Saith the LORD Concerning the King of Assyria",
        "Therefore Thus Saith the LORD Concerning the King of Assyria brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "✨ He Shall Not Come into This City",
        "He Shall Not Come into This City carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 19,
    startVerse: 37,
    endVerse: 37,
    reference: "2 Kings 19:37",
    title: "It Came to Pass",
    icon: "📍",
    phrases: [
      [
        "✨ It Came to Pass",
        "It Came to Pass is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "🙏 As He Was Worshipping in the House of Nisroch His God",
        "As He Was Worshipping in the House of Nisroch His God brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "👑 Came to Pass, as He Was Worshipping in",
        "Came to Pass, as He Was Worshipping in is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "📜 To Pass, as He Was Worshipping in the",
        "To Pass, as He Was Worshipping in the is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 20,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 20:1-6",
    title: "In Those Days Was Hezekiah Sick unto Death",
    icon: "🧠",
    phrases: [
      [
        "✨ In Those Days Was Hezekiah Sick unto Death",
        "In Those Days Was Hezekiah Sick unto Death is grief or consequence language.\n\nThe passage is naming pain directly. The Bible does not pretend sin, war, and rebellion have no cost.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase helps the reader feel the seriousness of what has happened in the story."
      ],
      [
        "📜 The Prophet Isaiah the Son of Amoz Came to Him",
        "The Prophet Isaiah the Son of Amoz Came to Him is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Then He Turned His Face to the Wall",
        "Then He Turned His Face to the Wall carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Prayed unto the LORD",
        "Prayed unto the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 20,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 20:7-12",
    title: "Take a Lump of Figs",
    icon: "😢",
    phrases: [
      [
        "✨ Take a Lump of Figs",
        "Take a Lump of Figs carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 They Took and Laid It on the Boil",
        "They Took and Laid It on the Boil shows provision becoming practical help.\n\nThe oil is not just a miracle to admire. It becomes the way the widow can pay debt and live.\n\n\n\n🫒 Oil provided\n\n💰 Debt answered\n\n🏠 Life sustained\n\n\n\nThe phrase helps the reader see that God's mercy reaches ordinary needs like money, debt, and food."
      ],
      [
        "👑 Hezekiah Said unto Isaiah",
        "Hezekiah Said unto Isaiah marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "🙏 What Shall Be the Sign That the LORD Will Heal Me",
        "What Shall Be the Sign That the LORD Will Heal Me brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 20,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 20:13-18",
    title: "Hezekiah Hearkened unto Them",
    icon: "✨",
    phrases: [
      [
        "✨ Hezekiah Hearkened unto Them",
        "Hezekiah Hearkened unto Them carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🏙️ Shewed Them All the House of His Precious Things",
        "Shewed Them All the House of His Precious Things can mean more than a building.\n\nIn Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership choices can affect an entire household after the leader is gone."
      ],
      [
        "👑 Then Came Isaiah the Prophet unto King Hezekiah",
        "Then Came Isaiah the Prophet unto King Hezekiah is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "🙏 Said unto Him",
        "Said unto Him marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 20,
    startVerse: 19,
    endVerse: 21,
    reference: "2 Kings 20:19-21",
    title: "Then Said Hezekiah unto Isaiah",
    icon: "📦",
    phrases: [
      [
        "✨ Then Said Hezekiah unto Isaiah",
        "Then Said Hezekiah unto Isaiah marks spoken words entering the scene.\n\nIn Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen carefully when pressure makes people speak."
      ],
      [
        "🙏 Good Is the Word of the LORD Which Thou Hast Spoken",
        "Good Is the Word of the LORD Which Thou Hast Spoken brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "👑 The Rest of the Acts of Hezekiah",
        "The Rest of the Acts of Hezekiah carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 All His Might",
        "All His Might carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 21,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 21:1-6",
    title: "Manasseh Was Twelve Years Old When He Began",
    icon: "🚶",
    phrases: [
      [
        "👑 Manasseh Was Twelve Years Old When He Began to Reign",
        "Manasseh Was Twelve Years Old When He Began to Reign gives the reader the shape of a king's rule.\n\nThe Bible records details like age, length of reign, and place of rule so the reader can follow the history carefully.\n\n\n\n👑 A king begins\n\n📅 Time is counted\n\n⚖️ His rule will be judged by God\n\n\n\nThe phrase reminds the reader that leadership in Kings is never just power. It is responsibility before the LORD."
      ],
      [
        "✨ Reigned Fifty and Five Years in Jerusalem",
        "Reigned Fifty and Five Years in Jerusalem gives the reader the shape of a king's rule.\n\nThe Bible records details like age, length of reign, and place of rule so the reader can follow the history carefully.\n\n\n\n👑 A king begins\n\n📅 Time is counted\n\n⚖️ His rule will be judged by God\n\n\n\nThe phrase reminds the reader that leadership in Kings is never just power. It is responsibility before the LORD."
      ],
      [
        "🙏 He Did That Which Was Evil in the Sight of the LORD",
        "He Did That Which Was Evil in the Sight of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 After the Abominations of the Heathen",
        "After the Abominations of the Heathen tells the reader when the next part of the story begins.\n\nThe Bible uses timing phrases to connect events. They help us see that one moment leads into another.\n\n\n\n📅 Time marker\n\n📜 Connected events\n\n🔑 A new part of the story\n\n\n\nThe phrase helps the reader follow the order of the history instead of treating the stories as random pieces."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 21,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 21:7-12",
    title: "He Set a Graven Image of the Grove",
    icon: "👀",
    phrases: [
      [
        "🏙️ He Set a Graven Image of the Grove That He Had Made in the House",
        "He Set a Graven Image of the Grove That He Had Made in the House can mean more than a building.\n\nIn Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership choices can affect an entire household after the leader is gone."
      ],
      [
        "📜 He Set a Graven Image of the Grove",
        "He Set a Graven Image of the Grove carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Neither Will I Make the Feet of Israel Move Any More Out of the Land Which I Gave Their Fathers",
        "Neither Will I Make the Feet of Israel Move Any More Out of the Land Which I Gave Their Fathers carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Only If They Will Observe to Do According to All That I Have Commanded Them",
        "Only If They Will Observe to Do According to All That I Have Commanded Them carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 21,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 21:13-18",
    title: "I Will Stretch Over Jerusalem the Line of Samaria",
    icon: "🏠",
    phrases: [
      [
        "🏙️ I Will Stretch Over Jerusalem the Line of Samaria",
        "I Will Stretch Over Jerusalem the Line of Samaria gives the reader the location of the movement.\n\nBible places are not random labels. They help us follow where God's prophet, Israel's kings, or enemy powers are moving.\n\n\n\n📍 Real place\n\n🚶 Movement in the story\n\n🧭 The map of Scripture\n\n\n\nThe phrase helps the reader remember that these events happen in real places, not in a vague story world."
      ],
      [
        "✨ The Plummet of the House of Ahab",
        "The Plummet of the House of Ahab can mean more than a building.\n\nIn Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership choices can affect an entire household after the leader is gone."
      ],
      [
        "👑 I Will Forsake the Remnant of Mine Inheritance",
        "I Will Forsake the Remnant of Mine Inheritance carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Deliver Them into the Hand of Their Enemies",
        "Deliver Them into the Hand of Their Enemies carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 21,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Kings 21:19-24",
    title: "Amon Was Twenty and Two Years Old When He",
    icon: "📅",
    phrases: [
      [
        "👑 Amon Was Twenty and Two Years Old When He Began to Reign",
        "Amon Was Twenty and Two Years Old When He Began to Reign is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "✨ He Reigned Two Years in Jerusalem",
        "He Reigned Two Years in Jerusalem gives the reader the shape of a king's rule.\n\nThe Bible records details like age, length of reign, and place of rule so the reader can follow the history carefully.\n\n\n\n👑 A king begins\n\n📅 Time is counted\n\n⚖️ His rule will be judged by God\n\n\n\nThe phrase reminds the reader that leadership in Kings is never just power. It is responsibility before the LORD."
      ],
      [
        "🙏 He Did That Which Was Evil in the Sight of the LORD",
        "He Did That Which Was Evil in the Sight of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 As His Father Manasseh Did",
        "As His Father Manasseh Did carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 21,
    startVerse: 25,
    endVerse: 26,
    reference: "2 Kings 21:25-26",
    title: "Now the Rest of the Acts of Amon Which",
    icon: "⚖️",
    phrases: [
      [
        "✨ Now the Rest of the Acts of Amon Which He Did",
        "Now the Rest of the Acts of Amon Which He Did carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Are They Not Written in the Book of the Chronicles of the Kings of Judah",
        "Are They Not Written in the Book of the Chronicles of the Kings of Judah is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "📜 He Was Buried in His Sepulchre in the Garden of Uzza",
        "He Was Buried in His Sepulchre in the Garden of Uzza carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Josiah His Son Reigned in His Stead",
        "Josiah His Son Reigned in His Stead gives the reader the shape of a king's rule.\n\nThe Bible records details like age, length of reign, and place of rule so the reader can follow the history carefully.\n\n\n\n👑 A king begins\n\n📅 Time is counted\n\n⚖️ His rule will be judged by God\n\n\n\nThe phrase reminds the reader that leadership in Kings is never just power. It is responsibility before the LORD."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 22,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 22:1-6",
    title: "Josiah Was Eight Years Old When He Began",
    icon: "🌪️",
    phrases: [
      [
        "👑 Josiah Was Eight Years Old When He Began to Reign",
        "Josiah Was Eight Years Old When He Began to Reign gives the reader the shape of a king's rule.\n\nThe Bible records details like age, length of reign, and place of rule so the reader can follow the history carefully.\n\n\n\n👑 A king begins\n\n📅 Time is counted\n\n⚖️ His rule will be judged by God\n\n\n\nThe phrase reminds the reader that leadership in Kings is never just power. It is responsibility before the LORD."
      ],
      [
        "✨ He Reigned Thirty and One Years in Jerusalem",
        "He Reigned Thirty and One Years in Jerusalem gives the reader the shape of a king's rule.\n\nThe Bible records details like age, length of reign, and place of rule so the reader can follow the history carefully.\n\n\n\n👑 A king begins\n\n📅 Time is counted\n\n⚖️ His rule will be judged by God\n\n\n\nThe phrase reminds the reader that leadership in Kings is never just power. It is responsibility before the LORD."
      ],
      [
        "🙏 He Did That Which Was Right in the Sight of the LORD",
        "He Did That Which Was Right in the Sight of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 Walked in All the Way of David His Father",
        "Walked in All the Way of David His Father means Josiah followed David's faithful pattern.\n\nThe phrase is not talking about a road. It is describing a way of life shaped by loyalty to the LORD.\n\n\n\n🚶 A faithful path\n\n👑 David's example\n\n🙏 Obedience from the heart\n\n\n\nThe phrase helps the reader see Josiah as a king who turned toward the LORD instead of copying wicked kings."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 22,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 22:7-12",
    title: "Howbeit There Was No Reckoning Made with Them",
    icon: "🧥",
    phrases: [
      [
        "✨ Howbeit There Was No Reckoning Made with Them of the Money That Was Delivered into Their Hand",
        "Howbeit There Was No Reckoning Made with Them of the Money That Was Delivered into Their Hand is stewardship language.\n\nThe money for the temple repair was handled by people who could be trusted.\n\n\n\n💰 Money handled rightly\n\n🛠️ Temple repair\n\n✅ Faithful workers\n\n\n\nThe phrase helps the reader see that worship also includes honest work and trustworthy handling of resources."
      ],
      [
        "📜 Because They Dealt Faithfully",
        "Because They Dealt Faithfully is stewardship language.\n\nThe money for the temple repair was handled by people who could be trusted.\n\n\n\n💰 Money handled rightly\n\n🛠️ Temple repair\n\n✅ Faithful workers\n\n\n\nThe phrase helps the reader see that worship also includes honest work and trustworthy handling of resources."
      ],
      [
        "👑 Hilkiah the High Priest Said unto Shaphan the Scribe",
        "Hilkiah the High Priest Said unto Shaphan the Scribe brings priestly leadership into view.\n\nThe priest served around the temple and helped guide the people back toward God's word and worship.\n\n\n\n🕍 Temple service\n\n📜 God's word recovered\n\n🙏 Worship being restored\n\n\n\nThe phrase helps the reader understand why the discovery in the temple matters so much."
      ],
      [
        "🙏 I Have Found the Book of the Law in the House of the LORD",
        "I Have Found the Book of the Law in the House of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 22,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 22:13-18",
    title: "Enquire of the LORD for Me",
    icon: "💧",
    phrases: [
      [
        "🙏 Enquire of the LORD for Me",
        "Enquire of the LORD for Me brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 For the People",
        "For the People shows the covenant moment becoming public.\n\nJosiah's reform is not kept private. Leaders, people, and Jerusalem are being brought under the hearing of God's word.\n\n\n\n👥 The people gathered\n\n📜 God's word read\n\n🙏 Covenant renewed\n\n\n\nThe phrase helps the reader see that repentance in this chapter is meant to shape the whole community."
      ],
      [
        "👑 So Hilkiah the Priest",
        "So Hilkiah the Priest brings priestly leadership into view.\n\nThe priest served around the temple and helped guide the people back toward God's word and worship.\n\n\n\n🕍 Temple service\n\n📜 God's word recovered\n\n🙏 Worship being restored\n\n\n\nThe phrase helps the reader understand why the discovery in the temple matters so much."
      ],
      [
        "✨ Went unto Huldah the Prophetess",
        "Went unto Huldah the Prophetess is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 22,
    startVerse: 19,
    endVerse: 20,
    reference: "2 Kings 22:19-20",
    title: "Because Thine Heart Was Tender",
    icon: "👑",
    phrases: [
      [
        "💛 Because Thine Heart Was Tender",
        "Because Thine Heart Was Tender points to what is happening inside a person.\n\nThe Bible is showing more than outward action. It is showing desire, sorrow, fear, pride, or repentance.\n\n\n\n💛 Inner life\n\n🔑 Direction of the heart\n\n⚠️ Choices taking shape\n\n\n\nThe phrase helps the reader watch the heart before the next action appears."
      ],
      [
        "🙏 Thou Hast Humbled Thyself Before the LORD",
        "Thou Hast Humbled Thyself Before the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "👑 I Will Gather Thee unto Thy Fathers",
        "I Will Gather Thee unto Thy Fathers is command language.\n\nSomeone is being told to act. The phrase moves the story from information into response.\n\n\n\n📜 A command\n\n🚶 Action required\n\n⚠️ A decision point\n\n\n\nThe phrase helps the reader notice when the story turns because someone must obey, refuse, or respond."
      ],
      [
        "✨ Thou Shalt Be Gathered into Thy Grave in Peace",
        "Thou Shalt Be Gathered into Thy Grave in Peace is command language.\n\nSomeone is being told to act. The phrase moves the story from information into response.\n\n\n\n📜 A command\n\n🚶 Action required\n\n⚠️ A decision point\n\n\n\nThe phrase helps the reader notice when the story turns because someone must obey, refuse, or respond."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 23,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 23:1-6",
    title: "The King Sent",
    icon: "📜",
    phrases: [
      [
        "👑 The King Sent",
        "The King Sent is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "🏙️ They Gathered unto Him All the Elders of Judah and of Jerusalem",
        "They Gathered unto Him All the Elders of Judah and of Jerusalem is command language.\n\nSomeone is being told to act. The phrase moves the story from information into response.\n\n\n\n📜 A command\n\n🚶 Action required\n\n⚠️ A decision point\n\n\n\nThe phrase helps the reader notice when the story turns because someone must obey, refuse, or respond."
      ],
      [
        "🙏 The King Went Up into the House of the LORD",
        "The King Went Up into the House of the LORD is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "✨ All the Men of Judah and All the Inhabitants of Jerusalem with Him",
        "All the Men of Judah and All the Inhabitants of Jerusalem with Him shows the covenant moment becoming public.\n\nJosiah's reform is not kept private. Leaders, people, and Jerusalem are being brought under the hearing of God's word.\n\n\n\n👥 The people gathered\n\n📜 God's word read\n\n🙏 Covenant renewed\n\n\n\nThe phrase helps the reader see that repentance in this chapter is meant to shape the whole community."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 23,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 23:7-12",
    title: "He Brake Down the Houses of the Sodomites",
    icon: "🛡️",
    phrases: [
      [
        "🏙️ He Brake Down the Houses of the Sodomites",
        "He Brake Down the Houses of the Sodomites can mean more than a building.\n\nIn Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership choices can affect an entire household after the leader is gone."
      ],
      [
        "🙏 That Were by the House of the LORD",
        "That Were by the House of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "👑 He Brought All the Priests Out of the Cities of Judah",
        "He Brought All the Priests Out of the Cities of Judah brings priestly leadership into view.\n\nThe priest served around the temple and helped guide the people back toward God's word and worship.\n\n\n\n🕍 Temple service\n\n📜 God's word recovered\n\n🙏 Worship being restored\n\n\n\nThe phrase helps the reader understand why the discovery in the temple matters so much."
      ],
      [
        "🔥 Defiled the High Places Where the Priests Had Burned Incense",
        "Defiled the High Places Where the Priests Had Burned Incense brings priestly leadership into view.\n\nThe priest served around the temple and helped guide the people back toward God's word and worship.\n\n\n\n🕍 Temple service\n\n📜 God's word recovered\n\n🙏 Worship being restored\n\n\n\nThe phrase helps the reader understand why the discovery in the temple matters so much."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 23,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 23:13-18",
    title: "The High Places Were Before Jerusalem",
    icon: "🙏",
    phrases: [
      [
        "🏙️ The High Places That Were Before Jerusalem",
        "The High Places That Were Before Jerusalem names rebellion clearly.\n\nThe Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.\n\n\n\n⚠️ Sin named\n\n💛 A heart turned away\n\n🙏 God sees it\n\n\n\nThe phrase helps the reader see why judgment comes and why false worship damages the whole nation."
      ],
      [
        "✨ The High Places Were Before Jerusalem",
        "The High Places Were Before Jerusalem names rebellion clearly.\n\nThe Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.\n\n\n\n⚠️ Sin named\n\n💛 A heart turned away\n\n🙏 God sees it\n\n\n\nThe phrase helps the reader see why judgment comes and why false worship damages the whole nation."
      ],
      [
        "👑 He Brake in Pieces the Images",
        "He Brake in Pieces the Images describes false worship being torn down.\n\nJosiah is not only speaking against idols. He is removing the objects and places that led people away from the LORD.\n\n\n\n⚠️ Idols destroyed\n\n🧹 Worship cleaned out\n\n🙏 Loyalty to the LORD\n\n\n\nThe phrase helps the reader see repentance as action, not only emotion."
      ],
      [
        "🙏 Cut Down the Groves",
        "Cut Down the Groves describes false worship being torn down.\n\nJosiah is not only speaking against idols. He is removing the objects and places that led people away from the LORD.\n\n\n\n⚠️ Idols destroyed\n\n🧹 Worship cleaned out\n\n🙏 Loyalty to the LORD\n\n\n\nThe phrase helps the reader see repentance as action, not only emotion."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 23,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Kings 23:19-24",
    title: "All the Houses Also of the High Places Were",
    icon: "🔥",
    phrases: [
      [
        "🏙️ All the Houses Also of the High Places That Were in the Cities of Samaria",
        "All the Houses Also of the High Places That Were in the Cities of Samaria gives the reader the location of the movement.\n\nBible places are not random labels. They help us follow where God's prophet, Israel's kings, or enemy powers are moving.\n\n\n\n📍 Real place\n\n🚶 Movement in the story\n\n🧭 The map of Scripture\n\n\n\nThe phrase helps the reader remember that these events happen in real places, not in a vague story world."
      ],
      [
        "✨ All the Houses Also of the High Places Were",
        "All the Houses Also of the High Places Were names rebellion clearly.\n\nThe Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.\n\n\n\n⚠️ Sin named\n\n💛 A heart turned away\n\n🙏 God sees it\n\n\n\nThe phrase helps the reader see why judgment comes and why false worship damages the whole nation."
      ],
      [
        "👑 He Slew All the Priests of the High Places That Were There Upon the Altars",
        "He Slew All the Priests of the High Places That Were There Upon the Altars brings priestly leadership into view.\n\nThe priest served around the temple and helped guide the people back toward God's word and worship.\n\n\n\n🕍 Temple service\n\n📜 God's word recovered\n\n🙏 Worship being restored\n\n\n\nThe phrase helps the reader understand why the discovery in the temple matters so much."
      ],
      [
        "🔥 Burned Men’s Bones Upon Them",
        "Burned Men’s Bones Upon Them describes false worship being torn down.\n\nJosiah is not only speaking against idols. He is removing the objects and places that led people away from the LORD.\n\n\n\n⚠️ Idols destroyed\n\n🧹 Worship cleaned out\n\n🙏 Loyalty to the LORD\n\n\n\nThe phrase helps the reader see repentance as action, not only emotion."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 23,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Kings 23:25-30",
    title: "Like unto Him Was There No King Before Him",
    icon: "🏙️",
    phrases: [
      [
        "👑 Like unto Him Was There No King Before Him",
        "Like unto Him Was There No King Before Him is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "🙏 That Turned to the LORD with All His Heart",
        "That Turned to the LORD with All His Heart brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "✨ Notwithstanding the LORD Turned Not from the Fierceness of His Great Wrath",
        "Notwithstanding the LORD Turned Not from the Fierceness of His Great Wrath brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 Wherewith His Anger Was Kindled Against Judah",
        "Wherewith His Anger Was Kindled Against Judah describes the LORD's anger burning against sin.\n\nGod's anger is not random temper. It is His holy response to covenant rebellion and false worship.\n\n\n\n⚠️ Sin judged\n\n🔥 Holy anger\n\n📜 Covenant warnings fulfilled\n\n\n\nThe phrase helps the reader understand why Judah's long rebellion could not be treated lightly."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 23,
    startVerse: 31,
    endVerse: 36,
    reference: "2 Kings 23:31-36",
    title: "Jehoahaz Was Twenty and Three Years Old When He",
    icon: "⚠️",
    phrases: [
      [
        "👑 Jehoahaz Was Twenty and Three Years Old When He Began to Reign",
        "Jehoahaz Was Twenty and Three Years Old When He Began to Reign is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "✨ He Reigned Three Months in Jerusalem",
        "He Reigned Three Months in Jerusalem is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "🙏 He Did That Which Was Evil in the Sight of the LORD",
        "He Did That Which Was Evil in the Sight of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 According to All That His Fathers Had Done",
        "According to All That His Fathers Had Done points to repeated sin across generations.\n\nThe Bible is showing that the next king is walking in the same wrong pattern instead of breaking from it.\n\n\n\n🏠 Family pattern\n\n⚠️ Sin repeated\n\n👑 Leadership failing again\n\n\n\nThe phrase helps the reader see how rebellion can become a pattern when nobody turns back to God."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 23,
    startVerse: 37,
    endVerse: 37,
    reference: "2 Kings 23:37",
    title: "He Did That Which Was Evil in the Sight",
    icon: "🕍",
    phrases: [
      [
        "🙏 He Did That Which Was Evil in the Sight of the LORD",
        "He Did That Which Was Evil in the Sight of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 According to All That His Fathers Had Done",
        "According to All That His Fathers Had Done points to repeated sin across generations.\n\nThe Bible is showing that the next king is walking in the same wrong pattern instead of breaking from it.\n\n\n\n🏠 Family pattern\n\n⚠️ Sin repeated\n\n👑 Leadership failing again\n\n\n\nThe phrase helps the reader see how rebellion can become a pattern when nobody turns back to God."
      ],
      [
        "⚠️ Did That Which Was Evil in the Sight",
        "Did That Which Was Evil in the Sight names rebellion clearly.\n\nThe Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.\n\n\n\n⚠️ Sin named\n\n💛 A heart turned away\n\n🙏 God sees it\n\n\n\nThe phrase helps the reader see why judgment comes and why false worship damages the whole nation."
      ],
      [
        "✨ He Did That Which Was Evil in the Sight",
        "He Did That Which Was Evil in the Sight names rebellion clearly.\n\nThe Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.\n\n\n\n⚠️ Sin named\n\n💛 A heart turned away\n\n🙏 God sees it\n\n\n\nThe phrase helps the reader see why judgment comes and why false worship damages the whole nation."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 24,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 24:1-6",
    title: "In His Days Nebuchadnezzar King of Babylon Came Up",
    icon: "💛",
    phrases: [
      [
        "👑 In His Days Nebuchadnezzar King of Babylon Came Up",
        "In His Days Nebuchadnezzar King of Babylon Came Up is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "📜 Jehoiakim Became His Servant Three Years",
        "Jehoiakim Became His Servant Three Years is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "🙏 The LORD Sent Against Him Bands of the Chaldees",
        "The LORD Sent Against Him Bands of the Chaldees describes enemy groups sent against Judah.\n\nThese bands are part of the pressure falling on the kingdom as judgment closes in.\n\n\n\n🗡️ Enemy raids\n\n⚠️ Judgment pressure\n\n🏙️ Judah weakening\n\n\n\nThe phrase helps the reader see that the fall of Judah happens step by step, not all at once."
      ],
      [
        "✨ Bands of the Syrians",
        "Bands of the Syrians describes enemy groups sent against Judah.\n\nThese bands are part of the pressure falling on the kingdom as judgment closes in.\n\n\n\n🗡️ Enemy raids\n\n⚠️ Judgment pressure\n\n🏙️ Judah weakening\n\n\n\nThe phrase helps the reader see that the fall of Judah happens step by step, not all at once."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 24,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 24:7-12",
    title: "The King of Egypt Came Not Again Any More",
    icon: "🗡️",
    phrases: [
      [
        "👑 The King of Egypt Came Not Again Any More Out of His Land",
        "The King of Egypt Came Not Again Any More Out of His Land is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "✨ The King of Egypt Came Not Again Any More",
        "The King of Egypt Came Not Again Any More is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "📜 Jehoiachin Was Eighteen Years Old When He Began to Reign",
        "Jehoiachin Was Eighteen Years Old When He Began to Reign gives the reader the shape of a king's rule.\n\nThe Bible records details like age, length of reign, and place of rule so the reader can follow the history carefully.\n\n\n\n👑 A king begins\n\n📅 Time is counted\n\n⚖️ His rule will be judged by God\n\n\n\nThe phrase reminds the reader that leadership in Kings is never just power. It is responsibility before the LORD."
      ],
      [
        "🙏 He Reigned in Jerusalem Three Months",
        "He Reigned in Jerusalem Three Months is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 24,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 24:13-18",
    title: "He Carried Out Thence All the Treasures",
    icon: "📍",
    phrases: [
      [
        "🙏 He Carried Out Thence All the Treasures of the House of the LORD",
        "He Carried Out Thence All the Treasures of the House of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "👑 The Treasures of the King’s House",
        "The Treasures of the King’s House is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "🏙️ He Carried Away All Jerusalem",
        "He Carried Away All Jerusalem is exile language.\n\nThe people are being removed from the land, the city, and the place where they had worshiped the LORD.\n\n\n\n😢 People taken away\n\n🏙️ Jerusalem emptied\n\n⚠️ Covenant judgment\n\n\n\nThe phrase helps the reader feel the tragedy of exile instead of reading it like a simple relocation."
      ],
      [
        "✨ All the Princes",
        "All the Princes is exile language.\n\nThe people are being removed from the land, the city, and the place where they had worshiped the LORD.\n\n\n\n😢 People taken away\n\n🏙️ Jerusalem emptied\n\n⚠️ Covenant judgment\n\n\n\nThe phrase helps the reader feel the tragedy of exile instead of reading it like a simple relocation."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 24,
    startVerse: 19,
    endVerse: 20,
    reference: "2 Kings 24:19-20",
    title: "He Did That Which Was Evil in the Sight",
    icon: "🧠",
    phrases: [
      [
        "🙏 He Did That Which Was Evil in the Sight of the LORD",
        "He Did That Which Was Evil in the Sight of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 According to All That Jehoiakim Had Done",
        "According to All That Jehoiakim Had Done points to repeated sin across generations.\n\nThe Bible is showing that the next king is walking in the same wrong pattern instead of breaking from it.\n\n\n\n🏠 Family pattern\n\n⚠️ Sin repeated\n\n👑 Leadership failing again\n\n\n\nThe phrase helps the reader see how rebellion can become a pattern when nobody turns back to God."
      ],
      [
        "⚠️ He Did That Which Was Evil in the Sight",
        "He Did That Which Was Evil in the Sight names rebellion clearly.\n\nThe Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.\n\n\n\n⚠️ Sin named\n\n💛 A heart turned away\n\n🙏 God sees it\n\n\n\nThe phrase helps the reader see why judgment comes and why false worship damages the whole nation."
      ],
      [
        "✨ Until He Had Cast Them Out from His Presence",
        "Until He Had Cast Them Out from His Presence is exile language.\n\nThe people are being removed from the land, the city, and the place where they had worshiped the LORD.\n\n\n\n😢 People taken away\n\n🏙️ Jerusalem emptied\n\n⚠️ Covenant judgment\n\n\n\nThe phrase helps the reader feel the tragedy of exile instead of reading it like a simple relocation."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 25,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Kings 25:1-6",
    title: "It Came to Pass in the Ninth Year",
    icon: "😢",
    phrases: [
      [
        "👑 It Came to Pass in the Ninth Year of His Reign",
        "It Came to Pass in the Ninth Year of His Reign is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "📜 In the Tenth Month",
        "In the Tenth Month is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "✨ The City Was Besieged unto the Eleventh Year of King Zedekiah",
        "The City Was Besieged unto the Eleventh Year of King Zedekiah means the city was surrounded by enemy forces.\n\nA siege trapped people inside the city. Food, water, safety, and hope would slowly run out.\n\n\n\n🏙️ A city surrounded\n\n⚠️ Pressure closing in\n\n😢 Judgment becoming visible\n\n\n\nThe phrase helps the reader understand the fear and suffering behind the fall of Jerusalem."
      ],
      [
        "🙏 Was Besieged unto the Eleventh",
        "Was Besieged unto the Eleventh means the city was surrounded by enemy forces.\n\nA siege trapped people inside the city. Food, water, safety, and hope would slowly run out.\n\n\n\n🏙️ A city surrounded\n\n⚠️ Pressure closing in\n\n😢 Judgment becoming visible\n\n\n\nThe phrase helps the reader understand the fear and suffering behind the fall of Jerusalem."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 25,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Kings 25:7-12",
    title: "They Slew the Sons of Zedekiah Before His Eyes",
    icon: "✨",
    phrases: [
      [
        "✨ They Slew the Sons of Zedekiah Before His Eyes",
        "They Slew the Sons of Zedekiah Before His Eyes names the cruelty and loss in Jerusalem's fall.\n\nThe phrase is not a small detail. It shows how severe the judgment and humiliation became when Babylon conquered Judah.\n\n\n\n😢 Loss\n\n👑 A fallen royal house\n\n⚠️ Judgment carried out\n\n\n\nThe phrase helps the reader feel the human cost of refusing the LORD's warnings."
      ],
      [
        "📜 Put Out the Eyes of Zedekiah",
        "Put Out the Eyes of Zedekiah describes a cruel act against Zedekiah.\n\nThe king who would not listen to God's warnings now suffers humiliation and loss at the hands of Babylon.\n\n\n\n😢 Humiliation\n\n👑 A fallen king\n\n⚠️ Consequence of rebellion\n\n\n\nThe phrase helps the reader feel the seriousness of rejecting the LORD's word."
      ],
      [
        "👑 In the Fifth Month",
        "In the Fifth Month is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "🙏 On the Seventh Day of the Month",
        "On the Seventh Day of the Month is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 25,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Kings 25:13-18",
    title: "The Pillars of Brass Were in the House",
    icon: "📦",
    phrases: [
      [
        "🙏 The Pillars of Brass That Were in the House of the LORD",
        "The Pillars of Brass That Were in the House of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "✨ The Brasen Sea That Was in the House of the LORD",
        "The Brasen Sea That Was in the House of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "👑 All the Vessels of Brass Wherewith They Ministered",
        "All the Vessels of Brass Wherewith They Ministered describes sacred temple items being taken.\n\nThese were not ordinary objects. They belonged to the worship life of the temple.\n\n\n\n🕍 Temple objects\n\n😢 Worship loss\n\n⚠️ Judgment reaches the holy place\n\n\n\nThe phrase helps the reader see how deep Jerusalem's fall has become."
      ],
      [
        "📜 Took They Away",
        "Took They Away describes sacred temple items being taken.\n\nThese were not ordinary objects. They belonged to the worship life of the temple.\n\n\n\n🕍 Temple objects\n\n😢 Worship loss\n\n⚠️ Judgment reaches the holy place\n\n\n\nThe phrase helps the reader see how deep Jerusalem's fall has become."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 25,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Kings 25:19-24",
    title: "Out of the City He Took an Officer Was",
    icon: "🚶",
    phrases: [
      [
        "🗡️ Out of the City He Took an Officer That Was Set Over the Men of War",
        "Out of the City He Took an Officer That Was Set Over the Men of War brings conflict into view.\n\nThis is not just action in the story. War shows fear, pride, danger, and the cost of broken leadership.\n\n\n\n⚔️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "👑 Five Men of Them That Were in the King’s Presence",
        "Five Men of Them That Were in the King’s Presence is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "✨ Nebuzar-adan Captain of the Guard Took These",
        "Nebuzar-adan Captain of the Guard Took These identifies a Babylonian officer carrying out judgment.\n\nThe phrase shows that Jerusalem's fall is now being enforced by foreign power.\n\n\n\n🛡️ Babylon's officer\n\n🏙️ Jerusalem conquered\n\n⚠️ Judgment carried out\n\n\n\nThe phrase helps the reader understand who is acting in the final destruction of the city."
      ],
      [
        "📜 Brought Them to the King of Babylon to Riblah",
        "Brought Them to the King of Babylon to Riblah is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ]
    ]
  },
  {
    book: "2 Kings",
    chapter: 25,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Kings 25:25-30",
    title: "It Came to Pass in the Seventh Month",
    icon: "👀",
    phrases: [
      [
        "✨ It Came to Pass in the Seventh Month",
        "It Came to Pass in the Seventh Month is timing language.\n\nThe Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.\n\n\n\n📅 Time counted\n\n📜 History remembered\n\n⚠️ Judgment arriving step by step\n\n\n\nThe phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline."
      ],
      [
        "📜 That Ishmael the Son of Nethaniah",
        "That Ishmael the Son of Nethaniah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 All the People",
        "All the People shows that the crisis touches everyone.\n\nThe phrase includes ordinary people and important people together. No level of society is untouched.\n\n\n\n👥 Everyone affected\n\n🏙️ A whole community shaken\n\n⚠️ Judgment reaches widely\n\n\n\nThe phrase helps the reader see that national sin brings public consequences."
      ],
      [
        "🙏 Both Small and Great",
        "Both Small and Great shows that the crisis touches everyone.\n\nThe phrase includes ordinary people and important people together. No level of society is untouched.\n\n\n\n👥 Everyone affected\n\n🏙️ A whole community shaken\n\n⚠️ Judgment reaches widely\n\n\n\nThe phrase helps the reader see that national sin brings public consequences."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 1,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Chronicles 1:1-6",
    title: "Adam, Sheth, Enosh",
    icon: "🌪️",
    phrases: [
      [
        "✨ Adam, Sheth, Enosh",
        "Adam, Sheth, Enosh is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Kenan, Mahalaleel, Jered",
        "Kenan, Mahalaleel, Jered is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Henoch, Methuselah, Lamech",
        "Henoch, Methuselah, Lamech is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Noah, Shem, Ham, and Japheth",
        "Noah, Shem, Ham, and Japheth is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 1,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Chronicles 1:7-12",
    title: "The Sons of Javan",
    icon: "🧥",
    phrases: [
      [
        "✨ The Sons of Javan",
        "The Sons of Javan is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Of Javan; Elishah, and Tarshish",
        "Of Javan; Elishah, and Tarshish is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Tarshish, Kittim, and Dodanim",
        "Tarshish, Kittim, and Dodanim is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 The Sons of Ham",
        "The Sons of Ham is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 1,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Chronicles 1:13-18",
    title: "Canaan Begat Zidon His Firstborn",
    icon: "💧",
    phrases: [
      [
        "✨ Canaan Begat Zidon His Firstborn",
        "Canaan Begat Zidon His Firstborn is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Zidon His Firstborn, and Heth",
        "Zidon His Firstborn, and Heth is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 The Jebusite Also",
        "The Jebusite Also carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 The Sons of Shem",
        "The Sons of Shem is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 1,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Chronicles 1:19-24",
    title: "Unto Eber Were Born Two Sons",
    icon: "👑",
    phrases: [
      [
        "✨ Unto Eber Were Born Two Sons",
        "Unto Eber Were Born Two Sons carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 The Name of the One Was Peleg",
        "The Name of the One Was Peleg carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Joktan Begat Almodad",
        "Joktan Begat Almodad is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Almodad, and Sheleph, and Hazarmaveth",
        "Almodad, and Sheleph, and Hazarmaveth is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 1,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Chronicles 1:25-30",
    title: "Eber, Peleg, Reu",
    icon: "📜",
    phrases: [
      [
        "✨ Eber, Peleg, Reu",
        "Eber, Peleg, Reu is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Serug, Nahor, Terah",
        "Serug, Nahor, Terah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 The Same Is Abraham",
        "The Same Is Abraham carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Abram; the Same Is Abraham",
        "Abram; the Same Is Abraham carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 1,
    startVerse: 31,
    endVerse: 36,
    reference: "1 Chronicles 1:31-36",
    title: "These Are the Sons of Ishmael",
    icon: "🛡️",
    phrases: [
      [
        "✨ These Are the Sons of Ishmael",
        "These Are the Sons of Ishmael is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Jetur, Naphish, and Kedemah. These",
        "Jetur, Naphish, and Kedemah. These is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Kedemah. These Are the Sons",
        "Kedemah. These Are the Sons carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 The Sons of Ishmael",
        "The Sons of Ishmael is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 1,
    startVerse: 37,
    endVerse: 42,
    reference: "1 Chronicles 1:37-42",
    title: "The Sons of Reuel",
    icon: "🙏",
    phrases: [
      [
        "✨ The Sons of Reuel",
        "The Sons of Reuel is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Reuel; Nahath, Zerah, Shammah, and",
        "Reuel; Nahath, Zerah, Shammah, and is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Shammah, and Mizzah",
        "Shammah, and Mizzah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 The Sons of Seir",
        "The Sons of Seir is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 1,
    startVerse: 43,
    endVerse: 48,
    reference: "1 Chronicles 1:43-48",
    title: "Now These Are the Kings That Reigned",
    icon: "🔥",
    phrases: [
      [
        "👑 Now These Are the Kings That Reigned in the Land of Edom Before Any King Reigned Over the Children of Israel",
        "Now These Are the Kings That Reigned in the Land of Edom Before Any King Reigned Over the Children of Israel gives the reader the shape of a king's rule.\n\nThe Bible records details like age, length of reign, and place of rule so the reader can follow the history carefully.\n\n\n\n👑 A king begins\n\n📅 Time is counted\n\n⚖️ His rule will be judged by God\n\n\n\nThe phrase reminds the reader that leadership in Kings is never just power. It is responsibility before the LORD."
      ],
      [
        "📜 Bela the Son of Beor",
        "Bela the Son of Beor is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "✨ When Bela Was Dead",
        "When Bela Was Dead names grief plainly.\n\nThe Bible does not hide the pain in the story. Death has entered the home, and the need is real.\n\n\n\n😢 Loss\n\n🏠 A hurting household\n\n🙏 Need for God's mercy\n\n\n\nThe phrase helps the reader feel why the next act of God matters so deeply."
      ],
      [
        "🙏 Jobab the Son of Zerah of Bozrah Reigned in His Stead",
        "Jobab the Son of Zerah of Bozrah Reigned in His Stead is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 1,
    startVerse: 49,
    endVerse: 54,
    reference: "1 Chronicles 1:49-54",
    title: "When Shaul Was Dead",
    icon: "🏙️",
    phrases: [
      [
        "✨ When Shaul Was Dead",
        "When Shaul Was Dead names grief plainly.\n\nThe Bible does not hide the pain in the story. Death has entered the home, and the need is real.\n\n\n\n😢 Loss\n\n🏠 A hurting household\n\n🙏 Need for God's mercy\n\n\n\nThe phrase helps the reader feel why the next act of God matters so deeply."
      ],
      [
        "👑 Baal-hanan the Son of Achbor Reigned in His Stead",
        "Baal-hanan the Son of Achbor Reigned in His Stead is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "⚠️ When Baal-hanan Was Dead",
        "When Baal-hanan Was Dead names grief plainly.\n\nThe Bible does not hide the pain in the story. Death has entered the home, and the need is real.\n\n\n\n😢 Loss\n\n🏠 A hurting household\n\n🙏 Need for God's mercy\n\n\n\nThe phrase helps the reader feel why the next act of God matters so deeply."
      ],
      [
        "📜 Hadad Reigned in His Stead",
        "Hadad Reigned in His Stead gives the reader the shape of a king's rule.\n\nThe Bible records details like age, length of reign, and place of rule so the reader can follow the history carefully.\n\n\n\n👑 A king begins\n\n📅 Time is counted\n\n⚖️ His rule will be judged by God\n\n\n\nThe phrase reminds the reader that leadership in Kings is never just power. It is responsibility before the LORD."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 2,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Chronicles 2:1-6",
    title: "These Are the Sons of Israel",
    icon: "⚠️",
    phrases: [
      [
        "✨ These Are the Sons of Israel",
        "These Are the Sons of Israel is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Sons of Israel; Reuben, Simeon",
        "Sons of Israel; Reuben, Simeon is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Reuben, Simeon, Levi, and Judah",
        "Reuben, Simeon, Levi, and Judah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Dan, Joseph, and Benjamin, Naphtali",
        "Dan, Joseph, and Benjamin, Naphtali is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 2,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Chronicles 2:7-12",
    title: "The Sons of Carmi",
    icon: "🕍",
    phrases: [
      [
        "✨ The Sons of Carmi",
        "The Sons of Carmi is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 The Troubler of Israel",
        "The Troubler of Israel carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 The Sons of Ethan",
        "The Sons of Ethan is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Of Ethan; Azariah",
        "Of Ethan; Azariah carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 2,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Chronicles 2:13-18",
    title: "Jesse Begat His Firstborn Eliab",
    icon: "💛",
    phrases: [
      [
        "✨ Jesse Begat His Firstborn Eliab",
        "Jesse Begat His Firstborn Eliab is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Abinadab the Second",
        "Abinadab the Second carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Nethaneel the Fourth",
        "Nethaneel the Fourth carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Raddai the Fifth",
        "Raddai the Fifth carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 2,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Chronicles 2:19-24",
    title: "When Azubah Was Dead",
    icon: "🗡️",
    phrases: [
      [
        "✨ When Azubah Was Dead",
        "When Azubah Was Dead names grief plainly.\n\nThe Bible does not hide the pain in the story. Death has entered the home, and the need is real.\n\n\n\n😢 Loss\n\n🏠 A hurting household\n\n🙏 Need for God's mercy\n\n\n\nThe phrase helps the reader feel why the next act of God matters so deeply."
      ],
      [
        "📜 Caleb Took unto Him Ephrath",
        "Caleb Took unto Him Ephrath carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Hur Begat Uri",
        "Hur Begat Uri is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Uri Begat Bezaleel",
        "Uri Begat Bezaleel is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 2,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Chronicles 2:25-30",
    title: "The Sons of Jerahmeel the Firstborn of Hezron Were",
    icon: "📍",
    phrases: [
      [
        "✨ The Sons of Jerahmeel the Firstborn of Hezron Were",
        "The Sons of Jerahmeel the Firstborn of Hezron Were is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Ram the Firstborn",
        "Ram the Firstborn is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Jerahmeel Had Also Another Wife",
        "Jerahmeel Had Also Another Wife carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Whose Name Was Atarah",
        "Whose Name Was Atarah carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 2,
    startVerse: 31,
    endVerse: 36,
    reference: "1 Chronicles 2:31-36",
    title: "The Sons of Appaim",
    icon: "🧠",
    phrases: [
      [
        "✨ The Sons of Appaim",
        "The Sons of Appaim is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 The Sons of Ishi",
        "The Sons of Ishi is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 The Sons of Jada the Brother of Shammai",
        "The Sons of Jada the Brother of Shammai is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Jether and Jonathan",
        "Jether and Jonathan carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 2,
    startVerse: 37,
    endVerse: 42,
    reference: "1 Chronicles 2:37-42",
    title: "Zabad Begat Ephlal",
    icon: "😢",
    phrases: [
      [
        "✨ Zabad Begat Ephlal",
        "Zabad Begat Ephlal is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Ephlal Begat Obed",
        "Ephlal Begat Obed is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Obed Begat Jehu",
        "Obed Begat Jehu is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Jehu Begat Azariah",
        "Jehu Begat Azariah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 2,
    startVerse: 43,
    endVerse: 48,
    reference: "1 Chronicles 2:43-48",
    title: "The Sons of Hebron",
    icon: "✨",
    phrases: [
      [
        "✨ The Sons of Hebron",
        "The Sons of Hebron is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Of Hebron; Korah, and Tappuah",
        "Of Hebron; Korah, and Tappuah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Tappuah, and Rekem, and",
        "Tappuah, and Rekem, and is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Shema Begat Raham",
        "Shema Begat Raham is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 2,
    startVerse: 49,
    endVerse: 54,
    reference: "1 Chronicles 2:49-54",
    title: "She Bare Also Shaaph the Father of Madmannah",
    icon: "📦",
    phrases: [
      [
        "✨ She Bare Also Shaaph the Father of Madmannah",
        "She Bare Also Shaaph the Father of Madmannah carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Sheva the Father of Machbenah",
        "Sheva the Father of Machbenah carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 These Were the Sons of Caleb the Son of Hur",
        "These Were the Sons of Caleb the Son of Hur is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 The Firstborn of Ephratah",
        "The Firstborn of Ephratah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 2,
    startVerse: 55,
    endVerse: 55,
    reference: "1 Chronicles 2:55",
    title: "The Families of the Scribes Which Dwelt at Jabez",
    icon: "🚶",
    phrases: [
      [
        "✨ The Families of the Scribes Which Dwelt at Jabez",
        "The Families of the Scribes Which Dwelt at Jabez carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 These Are the Kenites That Came of Hemath",
        "These Are the Kenites That Came of Hemath is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "👑 Families of the Scribes Which Dwelt at Jabez",
        "Families of the Scribes Which Dwelt at Jabez carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Of the Scribes Which Dwelt at Jabez; the",
        "Of the Scribes Which Dwelt at Jabez; the carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 3,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Chronicles 3:1-6",
    title: "Now These Were the Sons of David",
    icon: "👀",
    phrases: [
      [
        "✨ Now These Were the Sons of David",
        "Now These Were the Sons of David is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Which Were Born unto Him in Hebron",
        "Which Were Born unto Him in Hebron carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Absalom the Son of Maachah the Daughter of Talmai King of Geshur",
        "Absalom the Son of Maachah the Daughter of Talmai King of Geshur is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Adonijah the Son of Haggith",
        "Adonijah the Son of Haggith is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 3,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Chronicles 3:7-12",
    title: "Nogah, and Nepheg,",
    icon: "🏠",
    phrases: [
      [
        "✨ Nogah, and Nepheg",
        "Nogah, and Nepheg is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Nepheg, and Japhia",
        "Nepheg, and Japhia is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Elishama, and Eliada, and",
        "Elishama, and Eliada, and is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Eliada, and Eliphelet, Nine",
        "Eliada, and Eliphelet, Nine is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 3,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Chronicles 3:13-18",
    title: "Ahaz His Son",
    icon: "📅",
    phrases: [
      [
        "✨ Ahaz His Son",
        "Ahaz His Son carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Hezekiah His Son",
        "Hezekiah His Son carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Amon His Son",
        "Amon His Son carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Josiah His Son",
        "Josiah His Son carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 3,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Chronicles 3:19-24",
    title: "The Sons of Pedaiah Were",
    icon: "⚖️",
    phrases: [
      [
        "✨ The Sons of Pedaiah Were",
        "The Sons of Pedaiah Were is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 The Sons of Zerubbabel",
        "The Sons of Zerubbabel is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Hashubah, and Ohel, and",
        "Hashubah, and Ohel, and is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Ohel, and Berechiah, and Hasadiah",
        "Ohel, and Berechiah, and Hasadiah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 4,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Chronicles 4:1-6",
    title: "The Sons of Judah",
    icon: "🔎",
    phrases: [
      [
        "✨ The Sons of Judah",
        "The Sons of Judah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Judah; Pharez, Hezron, and Carmi",
        "Judah; Pharez, Hezron, and Carmi is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Carmi, and Hur, and",
        "Carmi, and Hur, and is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Reaiah the Son of Shobal Begat Jahath",
        "Reaiah the Son of Shobal Begat Jahath is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 4,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Chronicles 4:7-12",
    title: "The Sons of Helah Were",
    icon: "🧹",
    phrases: [
      [
        "✨ The Sons of Helah Were",
        "The Sons of Helah Were is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Of Helah Were, Zereth, and",
        "Of Helah Were, Zereth, and is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Zereth, and Jezoar, and Ethnan",
        "Zereth, and Jezoar, and Ethnan is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Coz Begat Anub",
        "Coz Begat Anub is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 4,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Chronicles 4:13-18",
    title: "The Sons of Kenaz",
    icon: "💬",
    phrases: [
      [
        "✨ The Sons of Kenaz",
        "The Sons of Kenaz is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 The Sons of Othniel",
        "The Sons of Othniel is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Meonothai Begat Ophrah",
        "Meonothai Begat Ophrah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Seraiah Begat Joab",
        "Seraiah Begat Joab is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 4,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Chronicles 4:19-24",
    title: "The Sons of His Wife Hodiah the Sister",
    icon: "🕊️",
    phrases: [
      [
        "✨ The Sons of His Wife Hodiah the Sister of Naham",
        "The Sons of His Wife Hodiah the Sister of Naham is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 The Father of Keilah the Garmite",
        "The Father of Keilah the Garmite carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 The Sons of Shimon Were",
        "The Sons of Shimon Were is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 The Sons of Ishi Were",
        "The Sons of Ishi Were is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 4,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Chronicles 4:25-30",
    title: "Shallum His Son",
    icon: "⛰️",
    phrases: [
      [
        "✨ Shallum His Son",
        "Shallum His Son carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Mibsam His Son",
        "Mibsam His Son carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 The Sons of Mishma",
        "The Sons of Mishma is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Hamuel His Son",
        "Hamuel His Son carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 4,
    startVerse: 31,
    endVerse: 36,
    reference: "1 Chronicles 4:31-36",
    title: "These Were Their Cities unto the Reign of David",
    icon: "🌿",
    phrases: [
      [
        "👑 These Were Their Cities unto the Reign of David",
        "These Were Their Cities unto the Reign of David is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ],
      [
        "📜 Their Villages Were",
        "Their Villages Were carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "✨ Were, Etam, and Ain, Rimmon",
        "Were, Etam, and Ain, Rimmon is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Ain, Rimmon, and Tochen, and",
        "Ain, Rimmon, and Tochen, and is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 4,
    startVerse: 37,
    endVerse: 42,
    reference: "1 Chronicles 4:37-42",
    title: "Ziza the Son of Shiphi",
    icon: "🧱",
    phrases: [
      [
        "✨ Ziza the Son of Shiphi",
        "Ziza the Son of Shiphi is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 The Son of Allon",
        "The Son of Allon is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 These Mentioned by Their Names Were Princes in Their Families",
        "These Mentioned by Their Names Were Princes in Their Families carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🏙️ The House of Their Fathers Increased Greatly",
        "The House of Their Fathers Increased Greatly can mean more than a building.\n\nIn Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership choices can affect an entire household after the leader is gone."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 4,
    startVerse: 43,
    endVerse: 43,
    reference: "1 Chronicles 4:43",
    title: "They Smote the Rest of the Amalekites Were Escaped",
    icon: "🪔",
    phrases: [
      [
        "🗡️ They Smote the Rest of the Amalekites That Were Escaped",
        "They Smote the Rest of the Amalekites That Were Escaped brings conflict into view.\n\nThis is not just action in the story. War shows fear, pride, danger, and the cost of broken leadership.\n\n\n\n⚔️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "📜 Dwelt There unto This Day",
        "Dwelt There unto This Day carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "✨ Smote the Rest of the Amalekites That Were",
        "Smote the Rest of the Amalekites That Were brings conflict into view.\n\nThis is not just action in the story. War shows fear, pride, danger, and the cost of broken leadership.\n\n\n\n⚔️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "🙏 The Rest of the Amalekites That Were Escaped",
        "The Rest of the Amalekites That Were Escaped carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 5,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Chronicles 5:1-6",
    title: "Now the Sons of Reuben the Firstborn of Israel",
    icon: "🌪️",
    phrases: [
      [
        "✨ Now the Sons of Reuben the Firstborn of Israel",
        "Now the Sons of Reuben the Firstborn of Israel is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 For He Was the Firstborn",
        "For He Was the Firstborn is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 For Judah Prevailed Above His Brethren",
        "For Judah Prevailed Above His Brethren carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Of Him Came the Chief Ruler",
        "Of Him Came the Chief Ruler is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 5,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Chronicles 5:7-12",
    title: "His Brethren by Their Families",
    icon: "🧥",
    phrases: [
      [
        "✨ His Brethren by Their Families",
        "His Brethren by Their Families carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 When the Genealogy of Their Generations Was Reckoned",
        "When the Genealogy of Their Generations Was Reckoned carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Bela the Son of Azaz",
        "Bela the Son of Azaz is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 The Son of Shema",
        "The Son of Shema is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 5,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Chronicles 5:13-18",
    title: "Their Brethren of the House of Their Fathers Were",
    icon: "💧",
    phrases: [
      [
        "🏙️ Their Brethren of the House of Their Fathers Were",
        "Their Brethren of the House of Their Fathers Were can mean more than a building.\n\nIn Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership choices can affect an entire household after the leader is gone."
      ],
      [
        "✨ Of the House of Their",
        "Of the House of Their can mean more than a building.\n\nIn Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership choices can affect an entire household after the leader is gone."
      ],
      [
        "👑 Of Their Fathers Were, Michael",
        "Of Their Fathers Were, Michael is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 These Are the Children of Abihail the Son of Huri",
        "These Are the Children of Abihail the Son of Huri is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 5,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Chronicles 5:19-24",
    title: "They Made War with the Hagarites",
    icon: "👑",
    phrases: [
      [
        "🗡️ They Made War with the Hagarites",
        "They Made War with the Hagarites brings conflict into view.\n\nThis is not just action in the story. War shows fear, pride, danger, and the cost of broken leadership.\n\n\n\n⚔️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "✨ War with the Hagarites, with",
        "War with the Hagarites, with is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Hagarites, with Jetur, and Nephish",
        "Hagarites, with Jetur, and Nephish is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 They Were Helped Against Them",
        "They Were Helped Against Them carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 5,
    startVerse: 25,
    endVerse: 26,
    reference: "1 Chronicles 5:25-26",
    title: "They Transgressed Against the God of Their Fathers",
    icon: "📜",
    phrases: [
      [
        "🙏 They Transgressed Against the God of Their Fathers",
        "They Transgressed Against the God of Their Fathers brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "✨ Went a Whoring After the Gods of the People of the Land",
        "Went a Whoring After the Gods of the People of the Land is movement language.\n\nThe phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.\n\n\n\n🚶 Movement\n\n📍 A changing scene\n\n🔑 The next step\n\n\n\nThe phrase helps the reader follow the action instead of losing track of who is where."
      ],
      [
        "📜 The God of Israel Stirred Up the Spirit of Pul King of Assyria",
        "The God of Israel Stirred Up the Spirit of Pul King of Assyria brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "👑 The Spirit of Tilgath-pilneser King of Assyria",
        "The Spirit of Tilgath-pilneser King of Assyria is about leadership under God.\n\nKings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚖️ Accountability before God\n\n\n\nThe phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?"
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 6,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Chronicles 6:1-6",
    title: "The Sons of Levi",
    icon: "🛡️",
    phrases: [
      [
        "✨ The Sons of Levi",
        "The Sons of Levi is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Levi; Gershon, Kohath, and Merari",
        "Levi; Gershon, Kohath, and Merari is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 The Sons of Kohath",
        "The Sons of Kohath is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Of Kohath; Amram, Izhar, and",
        "Of Kohath; Amram, Izhar, and is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 6,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Chronicles 6:7-12",
    title: "Meraioth Begat Amariah",
    icon: "🙏",
    phrases: [
      [
        "✨ Meraioth Begat Amariah",
        "Meraioth Begat Amariah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Amariah Begat Ahitub",
        "Amariah Begat Ahitub is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Ahitub Begat Zadok",
        "Ahitub Begat Zadok is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Zadok Begat Ahimaaz",
        "Zadok Begat Ahimaaz is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 6,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Chronicles 6:13-18",
    title: "Shallum Begat Hilkiah",
    icon: "🔥",
    phrases: [
      [
        "✨ Shallum Begat Hilkiah",
        "Shallum Begat Hilkiah brings priestly leadership into view.\n\nThe priest served around the temple and helped guide the people back toward God's word and worship.\n\n\n\n🕍 Temple service\n\n📜 God's word recovered\n\n🙏 Worship being restored\n\n\n\nThe phrase helps the reader understand why the discovery in the temple matters so much."
      ],
      [
        "📜 Hilkiah Begat Azariah",
        "Hilkiah Begat Azariah brings priestly leadership into view.\n\nThe priest served around the temple and helped guide the people back toward God's word and worship.\n\n\n\n🕍 Temple service\n\n📜 God's word recovered\n\n🙏 Worship being restored\n\n\n\nThe phrase helps the reader understand why the discovery in the temple matters so much."
      ],
      [
        "👑 Azariah Begat Seraiah",
        "Azariah Begat Seraiah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Seraiah Begat Jehozadak",
        "Seraiah Begat Jehozadak is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 6,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Chronicles 6:19-24",
    title: "The Sons of Merari",
    icon: "🏙️",
    phrases: [
      [
        "✨ The Sons of Merari",
        "The Sons of Merari is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 These Are the Families of the Levites According to Their Fathers",
        "These Are the Families of the Levites According to Their Fathers carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Libni His Son",
        "Libni His Son carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Jahath His Son",
        "Jahath His Son carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 6,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Chronicles 6:25-30",
    title: "The Sons of Elkanah",
    icon: "⚠️",
    phrases: [
      [
        "✨ The Sons of Elkanah",
        "The Sons of Elkanah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Of Elkanah; Amasai, and Ahimoth",
        "Of Elkanah; Amasai, and Ahimoth is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 As for Elkanah",
        "As for Elkanah carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Eliab His Son",
        "Eliab His Son carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 6,
    startVerse: 31,
    endVerse: 36,
    reference: "1 Chronicles 6:31-36",
    title: "These Are They Whom David Set Over the Service",
    icon: "🕍",
    phrases: [
      [
        "🙏 These Are They Whom David Set Over the Service of Song in the House of the LORD",
        "These Are They Whom David Set Over the Service of Song in the House of the LORD brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ],
      [
        "📜 After That the Ark Had Rest",
        "After That the Ark Had Rest tells the reader when the next part of the story begins.\n\nThe Bible uses timing phrases to connect events. They help us see that one moment leads into another.\n\n\n\n📅 Time marker\n\n📜 Connected events\n\n🔑 A new part of the story\n\n\n\nThe phrase helps the reader follow the order of the history instead of treating the stories as random pieces."
      ],
      [
        "⚠️ They Ministered Before the Dwelling Place of the Tabernacle of the Congregation with Singing",
        "They Ministered Before the Dwelling Place of the Tabernacle of the Congregation with Singing describes sacred temple items being taken.\n\nThese were not ordinary objects. They belonged to the worship life of the temple.\n\n\n\n🕍 Temple objects\n\n😢 Worship loss\n\n⚠️ Judgment reaches the holy place\n\n\n\nThe phrase helps the reader see how deep Jerusalem's fall has become."
      ],
      [
        "✨ Until Solomon Had Built the House of the LORD in Jerusalem",
        "Until Solomon Had Built the House of the LORD in Jerusalem brings God's authority into the phrase.\n\nThe wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase helps the reader understand the passage by asking what God is doing, not only what people are doing."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 6,
    startVerse: 37,
    endVerse: 42,
    reference: "1 Chronicles 6:37-42",
    title: "The Son of Tahath",
    icon: "💛",
    phrases: [
      [
        "✨ The Son of Tahath",
        "The Son of Tahath is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 The Son of Assir",
        "The Son of Assir is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 The Son of Izhar",
        "The Son of Izhar is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 The Son of Kohath",
        "The Son of Kohath is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 6,
    startVerse: 43,
    endVerse: 48,
    reference: "1 Chronicles 6:43-48",
    title: "The Son of Jahath",
    icon: "🗡️",
    phrases: [
      [
        "✨ The Son of Jahath",
        "The Son of Jahath is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 The Son of Gershom",
        "The Son of Gershom is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Their Brethren the Sons of Merari Stood on the Left Hand",
        "Their Brethren the Sons of Merari Stood on the Left Hand is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Ethan the Son of Kishi",
        "Ethan the Son of Kishi is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 6,
    startVerse: 49,
    endVerse: 54,
    reference: "1 Chronicles 6:49-54",
    title: "Aaron and His Sons Offered Upon the Altar",
    icon: "📍",
    phrases: [
      [
        "✨ Aaron and His Sons Offered Upon the Altar",
        "Aaron and His Sons Offered Upon the Altar is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 On the Altar of Incense",
        "On the Altar of Incense carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 These Are the Sons of Aaron",
        "These Are the Sons of Aaron is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Eleazar His Son",
        "Eleazar His Son carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 6,
    startVerse: 55,
    endVerse: 60,
    reference: "1 Chronicles 6:55-60",
    title: "They Gave Them Hebron in the Land of Judah",
    icon: "🧠",
    phrases: [
      [
        "✨ They Gave Them Hebron in the Land of Judah",
        "They Gave Them Hebron in the Land of Judah carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 The Suburbs Thereof Round About It",
        "The Suburbs Thereof Round About It carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🏙️ But the Fields of the City",
        "But the Fields of the City carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 The Villages Thereof",
        "The Villages Thereof carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 6,
    startVerse: 61,
    endVerse: 66,
    reference: "1 Chronicles 6:61-66",
    title: "Unto the Sons of Kohath",
    icon: "😢",
    phrases: [
      [
        "✨ Unto the Sons of Kohath",
        "Unto the Sons of Kohath is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Which Were Left of the Family of That Tribe",
        "Which Were Left of the Family of That Tribe carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 To the Sons of Gershom Throughout Their Families Out of the Tribe of Issachar",
        "To the Sons of Gershom Throughout Their Families Out of the Tribe of Issachar is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Out of the Tribe of Asher",
        "Out of the Tribe of Asher carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 6,
    startVerse: 67,
    endVerse: 72,
    reference: "1 Chronicles 6:67-72",
    title: "They Gave unto Them",
    icon: "✨",
    phrases: [
      [
        "✨ They Gave unto Them",
        "They Gave unto Them carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Of the Cities of Refuge",
        "Of the Cities of Refuge carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Jokmeam with Her Suburbs",
        "Jokmeam with Her Suburbs carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Beth-horon with Her Suburbs",
        "Beth-horon with Her Suburbs carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 6,
    startVerse: 73,
    endVerse: 78,
    reference: "1 Chronicles 6:73-78",
    title: "Ramoth with Her Suburbs",
    icon: "📦",
    phrases: [
      [
        "✨ Ramoth with Her Suburbs",
        "Ramoth with Her Suburbs carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Anem with Her Suburbs",
        "Anem with Her Suburbs carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Out of the Tribe of Asher",
        "Out of the Tribe of Asher carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Mashal with Her Suburbs",
        "Mashal with Her Suburbs carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 6,
    startVerse: 79,
    endVerse: 81,
    reference: "1 Chronicles 6:79-81",
    title: "Kedemoth Also with Her Suburbs",
    icon: "🚶",
    phrases: [
      [
        "✨ Kedemoth Also with Her Suburbs",
        "Kedemoth Also with Her Suburbs carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Mephaath with Her Suburbs",
        "Mephaath with Her Suburbs carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Out of the Tribe of Gad",
        "Out of the Tribe of Gad carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Ramoth in Gilead with Her Suburbs",
        "Ramoth in Gilead with Her Suburbs carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 7,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Chronicles 7:1-6",
    title: "Now the Sons of Issachar Were",
    icon: "👀",
    phrases: [
      [
        "✨ Now the Sons of Issachar Were",
        "Now the Sons of Issachar Were is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Of Issachar Were, Tola, and",
        "Of Issachar Were, Tola, and is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Tola, and Puah, Jashub, and",
        "Tola, and Puah, Jashub, and is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 The Sons of Tola",
        "The Sons of Tola is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 7,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Chronicles 7:7-12",
    title: "The Sons of Bela",
    icon: "🏠",
    phrases: [
      [
        "✨ The Sons of Bela",
        "The Sons of Bela is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🏙️ Heads of the House of Their Fathers",
        "Heads of the House of Their Fathers can mean more than a building.\n\nIn Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership choices can affect an entire household after the leader is gone."
      ],
      [
        "👑 The Sons of Becher",
        "The Sons of Becher is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 All These Are the Sons of Becher",
        "All These Are the Sons of Becher is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 7,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Chronicles 7:13-18",
    title: "The Sons of Naphtali",
    icon: "📅",
    phrases: [
      [
        "✨ The Sons of Naphtali",
        "The Sons of Naphtali is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 The Sons of Bilhah",
        "The Sons of Bilhah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 The Sons of Manasseh",
        "The Sons of Manasseh is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Whom She Bare",
        "Whom She Bare carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 7,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Chronicles 7:19-24",
    title: "The Sons of Shemidah Were",
    icon: "⚖️",
    phrases: [
      [
        "✨ The Sons of Shemidah Were",
        "The Sons of Shemidah Were is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Of Shemidah Were, Ahian, and",
        "Of Shemidah Were, Ahian, and is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Ahian, and Shechem, and Likhi",
        "Ahian, and Shechem, and Likhi is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 The Sons of Ephraim",
        "The Sons of Ephraim is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 7,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Chronicles 7:25-30",
    title: "Rephah Was His Son",
    icon: "🔎",
    phrases: [
      [
        "✨ Rephah Was His Son",
        "Rephah Was His Son carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Telah His Son",
        "Telah His Son carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Laadan His Son",
        "Laadan His Son carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Ammihud His Son",
        "Ammihud His Son carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 7,
    startVerse: 31,
    endVerse: 36,
    reference: "1 Chronicles 7:31-36",
    title: "The Sons of Beriah",
    icon: "🧹",
    phrases: [
      [
        "✨ The Sons of Beriah",
        "The Sons of Beriah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Who Is the Father of Birzavith",
        "Who Is the Father of Birzavith carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Heber Begat Japhlet",
        "Heber Begat Japhlet is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Shua Their Sister",
        "Shua Their Sister carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 7,
    startVerse: 37,
    endVerse: 40,
    reference: "1 Chronicles 7:37-40",
    title: "Shamma and Shilshah",
    icon: "💬",
    phrases: [
      [
        "✨ Shamma and Shilshah",
        "Shamma and Shilshah carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Bezer, and Hod, and Shamma",
        "Bezer, and Hod, and Shamma is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Shilshah, and Ithran, and Beera",
        "Shilshah, and Ithran, and Beera is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 The Sons of Jether",
        "The Sons of Jether is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 8,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Chronicles 8:1-6",
    title: "Now Benjamin Begat Bela His Firstborn",
    icon: "🕊️",
    phrases: [
      [
        "✨ Now Benjamin Begat Bela His Firstborn",
        "Now Benjamin Begat Bela His Firstborn is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Ashbel the Second",
        "Ashbel the Second carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Nohah the Fourth",
        "Nohah the Fourth carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Rapha the Fifth",
        "Rapha the Fifth carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 8,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Chronicles 8:7-12",
    title: "He Removed Them",
    icon: "⛰️",
    phrases: [
      [
        "✨ He Removed Them",
        "He Removed Them carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Shaharaim Begat Children in the Country of Moab",
        "Shaharaim Begat Children in the Country of Moab is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 After He Had Sent Them Away",
        "After He Had Sent Them Away tells the reader when the next part of the story begins.\n\nThe Bible uses timing phrases to connect events. They help us see that one moment leads into another.\n\n\n\n📅 Time marker\n\n📜 Connected events\n\n🔑 A new part of the story\n\n\n\nThe phrase helps the reader follow the order of the history instead of treating the stories as random pieces."
      ],
      [
        "🙏 He Begat of Hodesh His Wife",
        "He Begat of Hodesh His Wife is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 8,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Chronicles 8:13-18",
    title: "Who Were Heads of the Fathers of the Inhabitants",
    icon: "🌿",
    phrases: [
      [
        "✨ Who Were Heads of the Fathers of the Inhabitants",
        "Who Were Heads of the Fathers of the Inhabitants carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "📜 Who Drove Away the Inhabitants of Gath",
        "Who Drove Away the Inhabitants of Gath carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Ahio, Shashak, and Jeremoth",
        "Ahio, Shashak, and Jeremoth is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Zebadiah, and Arad, and",
        "Zebadiah, and Arad, and is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 8,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Chronicles 8:19-24",
    title: "Jakim, and Zichri,",
    icon: "🧱",
    phrases: [
      [
        "✨ Jakim, and Zichri",
        "Jakim, and Zichri is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Zichri, and Zabdi",
        "Zichri, and Zabdi is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Elienai, and Zilthai, and",
        "Elienai, and Zilthai, and is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Zilthai, and Eliel",
        "Zilthai, and Eliel is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 8,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Chronicles 8:25-30",
    title: "The Sons of Shashak",
    icon: "🪔",
    phrases: [
      [
        "✨ The Sons of Shashak",
        "The Sons of Shashak is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Iphedeiah, and Penuel, the",
        "Iphedeiah, and Penuel, the is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Penuel, the Sons of Shashak",
        "Penuel, the Sons of Shashak is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🙏 Shamsherai, and Shehariah, and",
        "Shamsherai, and Shehariah, and is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 8,
    startVerse: 31,
    endVerse: 36,
    reference: "1 Chronicles 8:31-36",
    title: "Gedor, and Ahio,",
    icon: "📖",
    phrases: [
      [
        "✨ Gedor, and Ahio",
        "Gedor, and Ahio is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Ahio, and Zacher",
        "Ahio, and Zacher is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "👑 Mikloth Begat Shimeah",
        "Mikloth Begat Shimeah is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "🏙️ These Also Dwelt with Their Brethren in Jerusalem",
        "These Also Dwelt with Their Brethren in Jerusalem carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  },
  {
    book: "1 Chronicles",
    chapter: 8,
    startVerse: 37,
    endVerse: 40,
    reference: "1 Chronicles 8:37-40",
    title: "Moza Begat Binea",
    icon: "🎺",
    phrases: [
      [
        "✨ Moza Begat Binea",
        "Moza Begat Binea is genealogy language.\n\nThe Bible traces families because God's story moves through real people, real generations, and remembered names.\n\n\n\n📜 Names preserved\n\n🏠 Families connected\n\n🔑 Covenant history remembered\n\n\n\nThe phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time."
      ],
      [
        "📜 Rapha Was His Son",
        "Rapha Was His Son carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "👑 Azel Had Six Sons",
        "Azel Had Six Sons carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ],
      [
        "🙏 Whose Names Are These",
        "Whose Names Are These carries one specific piece of the passage.\n\nThe words name an action, object, place, relationship, or response that helps the reader follow the text.\n\n\n\n📖 The Bible's wording\n\n🔎 One part of the scene\n\n🧠 Clearer understanding\n\n\n\nThe phrase keeps the reader close to the Bible's own wording while the story moves forward."
      ]
    ]
  }
] as const satisfies readonly KingdomDeclinePhraseSectionInput[];

export const FIRST_KINGS_16_22_PERSONAL_SECTIONS = sections
  .filter((section) => section.book === "1 Kings")
  .map(rewriteDay86FirstKingsSection)
  .map(rewriteDay87FirstKingsSection);
export const SECOND_KINGS_1_25_PERSONAL_SECTIONS = sections
  .filter((section) => section.book === "2 Kings")
  .map(rewriteDay87SecondKingsSection)
  .map(rewriteDay88SecondKingsSection)
  .map(rewriteDay90SecondKingsSection)
  .map(rewriteDay91SecondKingsSection)
  .map(rewriteDay92SecondKingsSection)
  .map(rewriteDay93SecondKingsSection);
export const FIRST_CHRONICLES_1_8_PERSONAL_SECTIONS = sections
  .filter((section) => section.book === "1 Chronicles")
  .map(rewriteDay94FirstChroniclesSection);
