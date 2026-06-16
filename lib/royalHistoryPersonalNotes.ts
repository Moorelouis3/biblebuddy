import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";
import {
  DAY_61_80_FIRST_SAMUEL_31_SUPPLEMENTAL_SECTIONS,
} from "./daySixtyOneToEightySupplementalPersonalNotes";

type RoyalPhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "1 Samuel" | "2 Samuel" | "1 Kings" };

const DAY_76_ROYAL_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "1 Samuel 31:1-6": [
    ["Now the Philistines Fought Against Israel", "The Philistines are fighting Israel in Saul's final battle. The phrase opens the collapse of Saul's reign on the battlefield.\n\n⚔️ Final battle\n\n👑 Saul's reign is ending\n\n😢 Israel is in danger\n\nThe phrase begins the last battle scene of Saul's story."],
    ["The Men of Israel Fled from Before the Philistines", "This means Israel's soldiers are running away from the Philistines in defeat. The army can no longer stand its ground.\n\n🏃 Israel flees\n\n⚔️ The battle is lost\n\n😢 Defeat has come\n\nThe phrase shows the battle turning into open collapse."],
    ["The Philistines Followed Hard Upon Saul", "Followed hard upon Saul means the Philistines pressed closely after him without letting up. Saul is no longer leading the battle; he is being hunted in it.\n\n👑 Saul is pursued\n\n⚔️ The enemy presses in\n\n⚠️ Danger is immediate\n\nThe phrase shows the king himself coming under direct attack."],
    ["Upon His Sons", "This means the attack fell on Saul's sons as well as on Saul himself. The royal family is being struck down in the same battle.\n\n👑 Saul's sons targeted\n\n⚔️ The royal house suffers\n\n😢 Family loss in war\n\nThe phrase shows the disaster reaching Saul's household too."],
  ],
  "1 Samuel 31:7-12": [
    ["Other Side of the Valley", "The men on the far side of the valley see that Israel's army has fled and that Saul is dead. Their position lets them witness the collapse from across the battlefield.\n\n👀 They see the defeat\n\n🏞️ Across the valley\n\n😢 Saul is known to be dead\n\nThe phrase explains how the news spreads beyond the battle line."],
    ["Other Side Jordan", "This refers to Israelites living on the other side of the Jordan River. They also hear the outcome and abandon their cities in fear.\n\n🌊 Across the Jordan\n\n🏃 People flee\n\n⚠️ Fear spreads outward\n\nThe phrase shows the defeat affecting regions beyond the battlefield itself."],
    ["It Came to Pass on the Morrow", "On the next day, the Philistines return to the battlefield after the fighting has ended. The phrase moves the story from battle into aftermath and humiliation.\n\n🌅 The next day\n\n⚔️ The battle is over\n\n⚠️ The aftermath begins\n\nThe phrase opens the scene after the fighting has stopped."],
    ["Strip the Slain", "To strip the slain means to remove armor, weapons, and valuables from the dead bodies. The Philistines are plundering the fallen after victory.\n\n🪖 Bodies are plundered\n\n⚔️ Victory is exploited\n\n😢 The dead are dishonored\n\nThe phrase makes the battlefield aftermath feel brutal and real."],
  ],
  "1 Samuel 31:13": [
    ["They Took Their Bones", "The men of Jabesh-gilead gather the remains of Saul and his sons after their bodies were burned. The bones are what they carry back for burial.\n\n🦴 Remains gathered\n\n🤝 A loyal act of honor\n\n😢 Respect after death\n\nThe phrase shows care being given to Saul's house after disgrace."],
    ["Buried Them Under a Tree at Jabesh", "The bones are buried at Jabesh, the city Saul once rescued. The burial place matters because Jabesh remembers Saul's earlier kindness.\n\n🌳 Burial at Jabesh\n\n🤝 Old loyalty remembered\n\n😢 Honor after death\n\nThe phrase links Saul's final burial to one of his early victories."],
    ["Took Their Bones, and Buried Them Under a", "This means the men did not leave Saul's remains exposed. They carried them away and gave them a proper burial.\n\n🦴 Remains removed\n\n🌳 Burial given\n\n🤝 Respect shown\n\nThe phrase highlights their act of loyalty and care."],
    ["Their Bones, and Buried Them Under a Tree", "The burial under a tree at Jabesh becomes a quiet act of honor after a public defeat. The king who died in shame is still mourned by grateful people.\n\n🌳 Burial place\n\n😢 Mourning continues\n\n🤝 Gratitude remains\n\nThe phrase closes Saul's story with one last act of honor."],
  ],
  "2 Samuel 1:1-6": [
    ["After the Death of Saul", "This phrase tells the reader Saul has already died before the chapter opens. The story is now turning from Saul's end to David's response.\n\n👑 Saul is dead\n\n📜 A new stage begins\n\n💛 Attention turns to David\n\nThe phrase shifts the story from Saul's fall to David's next chapter."],
    ["Returned from the Slaughter of the Amalekites", "David has come back from defeating the Amalekite raiders. He returns from victory only to receive news of Saul's death.\n\n⚔️ David has returned\n\n🏕️ Ziklag is behind him\n\n😢 Hard news is coming\n\nThe phrase sets David's recent victory beside the kingdom's loss."],
    ["Third Day", "On the third day after David's return, a messenger arrives from Saul's camp. The timing shows the news reaches David shortly after the battle.\n\n📅 Third day\n\n🏃 A messenger arrives\n\n📜 News reaches David quickly\n\nThe phrase helps the reader place the report in time."],
    ["Clothes Rent", "Clothes rent means his garments are torn, a sign of grief, shock, or mourning. The messenger appears already marked by the disaster he is reporting.\n\n👕 Torn clothes\n\n😢 Mourning sign\n\n⚠️ Bad news is coming\n\nThe phrase shows sorrow before the message is even spoken."],
  ],
  "2 Samuel 1:7-12": [
    ["When He Looked Behind Him", "The Amalekite says Saul looked behind him while wounded in battle. The detail places the report in the chaos of Saul's last moments.\n\n👀 Saul looks back\n\n⚔️ Battle confusion\n\n😢 Final moments described\n\nThe phrase sets the scene for the messenger's story."],
    ["He Saw Me", "The man says Saul noticed him on the battlefield. This is the moment he claims Saul called him close.\n\n👀 Saul sees him\n\n⚔️ They meet in battle\n\n📜 The report becomes personal\n\nThe phrase moves the story from general battle to direct encounter."],
    ["He Said unto Me", "The messenger is now repeating Saul's words as part of his report to David. The phrase introduces the claimed conversation with the dying king.\n\n🗣️ Saul's words reported\n\n📜 A direct account begins\n\n⚠️ The message grows serious\n\nThe phrase shifts from scene-setting to spoken testimony."],
    ["Who Art Thou", "Saul asks the stranger to identify himself. The question shows that even in weakness Saul wants to know who is standing before him.\n\n❓ Saul asks for identity\n\n⚔️ A wounded king speaks\n\n📜 The encounter is personal\n\nThe phrase shows Saul still trying to understand who is near him."],
  ],
  "2 Samuel 1:13-18": [
    ["Young Man That Told Him", "David is speaking to the messenger who brought the report of Saul's death. He questions the man directly instead of accepting the story without thought.\n\n👑 David questions him\n\n📜 The report is examined\n\n⚠️ Words have consequences\n\nThe phrase shows David testing the messenger's account."],
    ["Whence Art Thou", "Whence means from where. David asks where the man comes from, pressing him to identify himself clearly.\n\n❓ Where are you from?\n\n👤 Identity matters\n\n📜 David probes the report\n\nThe phrase shows David moving carefully before judging the matter."],
    ["David Said unto Him", "David now answers the messenger after hearing his claim. His words turn the scene from report to judgment.\n\n👑 David responds\n\n📜 The scene shifts\n\n⚖️ Judgment is coming\n\nThe phrase marks the moment David speaks with royal authority."],
    ["Destroy the Lord’s Anointed", "The LORD's anointed means the king whom God had set apart for rule. David treats striking Saul as a serious offense against God's appointment.\n\n👑 Saul was anointed king\n\n🙏 God's choice mattered\n\n⚖️ Killing him is grave sin\n\nThe phrase explains why David is horrified by the man's claim."],
  ],
  "2 Samuel 1:19-24": [
    ["Beauty of Israel", "The beauty of Israel here means the glory or pride of Israel represented especially in Saul and Jonathan. David is speaking of a national loss, not outward prettiness.\n\n✨ Israel's glory\n\n😢 A national loss\n\n👑 Saul and Jonathan in view\n\nThe phrase opens David's lament with grief over what Israel has lost."],
    ["How Are the Mighty Fallen", "This repeated line means the strong and honored warriors have been brought down. It is David's cry of grief over a shocking fall.\n\n😢 The strong have fallen\n\n⚔️ Great warriors are gone\n\n📜 Lament repeats the sorrow\n\nThe phrase becomes the heartbeat of David's mourning song."],
    ["Tell It Not in Gath", "David does not want Israel's enemy cities hearing the news with triumph. Gath was a Philistine city, so the phrase means 'do not let the enemy rejoice over this.'\n\n🚫 Do not spread it there\n\n🏙️ Philistine city named\n\n😢 Grief should not become enemy celebration\n\nThe phrase shows David's pain at the thought of Philistine joy."],
    ["Streets of Askelon", "Askelon was another Philistine city. David does not want the daughters there celebrating Israel's defeat.\n\n🏙️ Philistine city\n\n🚫 No victory celebration wanted\n\n😢 The loss is too bitter\n\nThe phrase extends David's grief across the enemy's cities."],
  ],
  "2 Samuel 1:25-27": [
    ["Midst of the Battle", "Jonathan fell in the middle of the battle itself. The phrase keeps his death tied to courage and warfare, not to retreat or shame.\n\n⚔️ In the thick of battle\n\n👑 Jonathan died fighting\n\n😢 A brave death mourned\n\nThe phrase honors Jonathan's fall as a warrior."],
    ["Thou Wast Slain in Thine High Places", "High places here means the heights or battle slopes where Jonathan died. David is mourning the place where his friend fell.\n\n🏔️ Elevated battlefield\n\n😢 Jonathan was slain there\n\n📜 The place of loss is remembered\n\nThe phrase makes the lament specific and personal."],
    ["I Am Distressed for Thee", "David is saying he is deeply grieved over Jonathan. Distressed here means inwardly pained and heartbroken.\n\n😢 Deep grief\n\n💛 Personal sorrow\n\n🤝 Friendship remembered\n\nThe phrase shows how personal this loss is for David."],
    ["My Brother Jonathan", "David calls Jonathan 'my brother' to speak of deep covenant love, not literal blood relation. Jonathan had become like a brother to him.\n\n🤝 Covenant friendship\n\n💛 Brother-like love\n\n😢 The bond is mourned\n\nThe phrase explains the closeness David felt toward Jonathan."],
  ],
  "2 Samuel 2:1-6": [
    ["It Came to Pass After This", "This phrase moves the story on from mourning Saul to David's next step. The kingdom story is advancing again.\n\n📜 Another stage begins\n\n👑 David must act\n\n🔁 The story turns forward\n\nThe phrase opens the next movement after the lament."],
    ["David Enquired of the LORD", "David asks the LORD for guidance before moving. Enquired means he seeks God's direction instead of acting on his own judgment alone.\n\n🙏 David asks God\n\n❓ Guidance is sought\n\n👑 Leadership begins with inquiry\n\nThe phrase shows David starting with dependence on God."],
    ["So David Went Up Thither", "David goes up to the place God directed, which is Hebron. The movement matters because he is obeying the LORD's answer.\n\n🏙️ David moves to Hebron\n\n🙏 He follows God's answer\n\n👑 A new stage of rule begins\n\nThe phrase shows action flowing from God's direction."],
    ["His Two Wives Also", "David does not move alone; his household goes with him. The phrase shows the transfer of his family life into this next chapter in Hebron.\n\n🏠 Household moves too\n\n💛 Family included\n\n🏙️ Life is being relocated\n\nThe phrase reminds the reader that David's rise affects more than just David himself."],
  ],
  "2 Samuel 2:7-12": [
    ["Let Your Hands Be Strengthened", "David tells the men of Jabesh-gilead to be strengthened, meaning to take courage and remain steady. He is encouraging them after Saul's death.\n\n💪 Take courage\n\n😢 Saul is dead\n\n🤝 David speaks kindly\n\nThe phrase is a call to strength after loss."],
    ["Be Ye Valiant", "Valiant means brave and strong. David urges them not to collapse in fear after the kingdom's change.\n\n🛡️ Be brave\n\n💪 Stand firm\n\n👑 Leadership is shifting\n\nThe phrase is simple encouragement in a shaken moment."],
    ["Abner the Son of Ner", "Abner is Saul's military commander and a major power figure after Saul's death. Mentioning him signals that Saul's house still has leadership around it.\n\n🪖 Saul's commander\n\n👑 A powerful figure remains\n\n⚠️ Rival leadership is forming\n\nThe phrase introduces the man who will uphold Saul's line."],
    ["Captain of Saul’s Host", "This means Abner commanded Saul's army. Host here means the military force, not a dinner host.\n\n🪖 Army commander\n\n👑 Saul's military man\n\n⚔️ Power remains with Abner\n\nThe phrase explains why Abner matters so much in the next conflict."],
  ],
  "2 Samuel 2:13-18": [
    ["Joab the Son of Zeruiah", "Joab is David's commander and the son of Zeruiah, David's sister. He will act as David's military leader in the conflict ahead.\n\n🪖 David's commander\n\n🏠 David's family connection\n\n⚔️ A key leader enters\n\nThe phrase introduces David's main war captain."],
    ["Servants of David", "The servants of David here are his men and fighters, not house servants. They are the forces loyal to David in the coming clash.\n\n👥 David's men\n\n⚔️ Loyal fighters\n\n👑 They serve David's cause\n\nThe phrase identifies the side fighting for David."],
    ["Abner Said to Joab", "Abner proposes the next step to Joab. His words lead to a deadly contest between the two sides.\n\n🗣️ Abner speaks first\n\n⚔️ The conflict is negotiated into action\n\n⚠️ Words will lead to bloodshed\n\nThe phrase introduces the exchange that sparks the fight."],
    ["Let the Young Men Now Arise", "Abner is calling for selected young warriors to rise and fight before the two groups. The phrase begins what looks like a small contest but becomes a larger battle.\n\n⚔️ Chosen fighters step forward\n\n👥 A contest begins\n\n⚠️ Small challenge, larger cost\n\nThe phrase sets the duel-like fight in motion."],
  ],
  "2 Samuel 2:19-24": [
    ["Asahel Pursued After Abner", "Asahel chases Abner directly during the battle. Pursued after means he is determined to catch him, not just follow at a distance.\n\n🏃 Asahel chases Abner\n\n⚔️ Battle pursuit\n\n⚠️ A dangerous chase begins\n\nThe phrase starts the personal conflict between these two men."],
    ["Turned Not to the Right Hand Nor to the Left", "This means Asahel would not break off the chase in any direction. He is completely fixed on catching Abner.\n\n🎯 No turning aside\n\n🏃 Total focus in pursuit\n\n⚠️ Determination becomes danger\n\nThe phrase shows how single-minded Asahel is."],
    ["Abner Looked Behind Him", "Abner turns to see who is pursuing him so fiercely. The phrase brings the chase into direct personal recognition.\n\n👀 Abner looks back\n\n🏃 He identifies the pursuer\n\n⚔️ The moment turns personal\n\nThe phrase moves the pursuit toward confrontation."],
    ["Art Thou Asahel", "Abner asks whether the pursuer is Asahel. He wants to know exactly who is behind him before responding further.\n\n❓ Is it Asahel?\n\n👀 Recognition matters\n\n⚠️ A fatal moment is near\n\nThe phrase shows Abner identifying the man chasing him."],
  ],
  "2 Samuel 2:25-30": [
    ["Children of Benjamin Gathered Themselves Together After Abner", "The Benjamites rally around Abner after the fighting has scattered people. They regroup to hold their position together.\n\n👥 Benjamin regroups\n\n🪖 Abner gathers support\n\n⚔️ The battle has not fully cooled\n\nThe phrase shows Abner no longer alone."],
    ["Became One Troop", "This means the men gathered into one united fighting group. Instead of being scattered, they form a single force.\n\n👥 One unit formed\n\n🪖 Strength in regrouping\n\n⚔️ Order returns to them\n\nThe phrase shows scattered men becoming organized again."],
    ["Abner Called to Joab", "Abner speaks across the conflict to Joab, trying to halt the bloodshed. The phrase marks the shift from fighting to negotiation.\n\n🗣️ Abner calls out\n\n⚔️ Battle pauses\n\n😢 Bloodshed is questioned\n\nThe phrase opens the appeal to stop the fight."],
    ["Shall the Sword Devour for Ever", "Abner is asking whether the killing must go on without end. Devour means keep consuming lives like something that never stops eating.\n\n⚔️ Must killing continue?\n\n😢 Lives are being consumed\n\n🗣️ A plea to stop\n\nThe phrase is a question against endless bloodshed."],
  ],
  "2 Samuel 2:31-32": [
    ["Servants of David Had Smitten of Benjamin", "David's men had struck down many from Benjamin in the fighting. The phrase records the heavy loss suffered on Abner's side.\n\n⚔️ Benjamin suffers losses\n\n👥 David's men prevail\n\n😢 The cost is counted\n\nThe phrase makes the battle's human toll explicit."],
    ["Of Abner’s Men", "This refers to the men serving under Abner who were also killed. The battle has taken real lives from his side, not just forced retreat.\n\n👥 Abner's men included\n\n⚔️ Real casualties named\n\n😢 The loss is personal to Abner's camp\n\nThe phrase widens the count of the dead."],
    ["They Took Up Asahel", "Asahel's body is carried away by his own side after he is killed. The phrase shifts from battle to burial duty.\n\n🫂 Asahel's body carried\n\n😢 A fallen brother honored\n\n⚔️ The chase has ended in death\n\nThe phrase shows grief entering the story after the pursuit."],
    ["Buried Him in the Sepulchre of His Father", "Asahel is buried in his father's tomb, meaning he is laid to rest with family honor. The battle ends with funeral care for the dead.\n\n🪦 Family burial\n\n🏠 Honor in death\n\n😢 Mourning follows war\n\nThe phrase closes the scene with burial instead of combat."],
  ],
  "2 Samuel 3:1-6": [
    ["Long War Between the House of Saul", "The conflict between Saul's house and David's house lasts a long time. House here means their family lines and royal claims, not only buildings.\n\n🏠 Two houses in conflict\n\n⚔️ The war lasts long\n\n👑 Rival claims continue\n\nThe phrase shows the kingdom not settling quickly."],
    ["House of David", "The house of David means David's family line and growing royal side. The phrase is about a dynasty beginning to strengthen.\n\n🏠 David's family line\n\n👑 His side grows stronger\n\n⚔️ A rival house to Saul's\n\nThe phrase points to David's rising royal future."],
    ["Sons Born in Hebron", "These are sons born to David while he is reigning in Hebron. The phrase shows David's household and dynasty growing during the conflict.\n\n👶 Sons are born\n\n🏙️ In Hebron\n\n👑 The royal line expands\n\nThe phrase shows David's family increasing as his rule strengthens."],
    ["His Firstborn Was Amnon", "Firstborn means the eldest son. The verse is listing David's children in order, beginning with Amnon.\n\n👶 Eldest son named\n\n🏠 Family line traced\n\n👑 Succession matters\n\nThe phrase helps the reader follow David's growing household."],
  ],
  "2 Samuel 3:7-12": [
    ["Saul Had a Concubine", "A concubine was a secondary wife in the household. Mentioning Saul's concubine matters because taking or being accused over such a woman could signal a claim to royal power.\n\n🏠 Royal household woman\n\n👑 Power implications\n\n⚠️ The accusation is political\n\nThe phrase explains why the issue becomes so explosive."],
    ["Whose Name Was Rizpah", "Rizpah is the woman named in the accusation against Abner. Naming her makes the charge specific and serious.\n\n👤 Rizpah identified\n\n🏠 Saul's household in view\n\n⚠️ The accusation sharpens\n\nThe phrase introduces the woman at the center of the dispute."],
    ["Abner Very Wroth", "Wroth means deeply angry. Abner reacts strongly because he sees Ish-bosheth's accusation as a major insult.\n\n😠 Deep anger\n\n👑 Authority challenged\n\n⚠️ The relationship breaks down\n\nThe phrase shows Abner's fury at being questioned this way."],
    ["Am I a Dog’s Head", "Abner is saying, 'Do you think I am some contemptible, worthless man?' Dog's head is a strong insult about being low and disgraceful.\n\n❓ Do you take me for a nobody?\n\n😠 Insult felt deeply\n\n👑 Abner defends his honor\n\nThe phrase reveals how humiliating the accusation sounded to him."],
  ],
  "2 Samuel 3:13-18": [
    ["I Will Make a League with Thee", "A league is an agreement or covenant between two sides. Abner is offering to work with David instead of against him.\n\n🤝 An agreement offered\n\n👑 Abner changes sides\n\n📜 A political shift begins\n\nThe phrase marks the start of a new alliance."],
    ["One Thing I Require of Thee", "Abner says he has one condition that must be met. The phrase introduces the specific demand before the alliance proceeds.\n\n❗ One condition\n\n🗣️ Terms are being set\n\n🤝 Agreement has a requirement\n\nThe phrase narrows the negotiation to one clear point."],
    ["David Sent Messengers", "David sends official representatives to carry his demand. The matter is being handled through formal royal communication.\n\n📨 Messengers sent\n\n👑 Royal business\n\n📜 The request is formal\n\nThe phrase shows David acting through recognized channels."],
    ["Deliver Me My Wife Michal", "David asks for Michal, Saul's daughter, to be returned to him. Her return matters personally and politically because she links David to Saul's house.\n\n💛 Wife requested\n\n🏠 Saul's daughter involved\n\n👑 Political and family meaning\n\nThe phrase explains why David demands her return."],
  ],
  "2 Samuel 3:19-24": [
    ["Spake in the Ears of Benjamin", "This means Abner spoke directly and persuasively to the Benjamites. In the ears of means he brought the matter personally to them.\n\n🗣️ Personal persuasion\n\n👥 Benjamin addressed\n\n🤝 Support is being built\n\nThe phrase shows Abner gathering agreement carefully."],
    ["Speak in the Ears of David in Hebron", "Abner goes to David in Hebron to report what seems good to Israel and Benjamin. The phrase shows him carrying the plan all the way to David.\n\n🏙️ Hebron visit\n\n🗣️ Agreement reported\n\n👑 David is informed directly\n\nThe phrase marks the final step in Abner's peace effort."],
    ["Abner Came to David to Hebron", "Abner arrives personally at David's city, showing that the negotiations are serious. He is no longer acting from a distance.\n\n🏙️ Abner arrives\n\n👑 He comes to David himself\n\n🤝 Peace seems near\n\nThe phrase brings the two leaders into direct contact."],
    ["Twenty Men with Him", "Abner comes with a small group of men, not with an invading army. The number fits a diplomatic visit rather than a battle line.\n\n👥 Small escort\n\n🤝 Peaceful approach\n\n⚠️ Trust is still delicate\n\nThe phrase helps the reader see the visit as negotiation, not attack."],
  ],
  "2 Samuel 3:25-30": [
    ["Thou Knowest Abner the Son of Ner", "Joab reminds David who Abner is, framing him as a dangerous enemy rather than a trustworthy ally. The phrase begins Joab's attempt to turn David against Abner.\n\n🗣️ Joab presses David\n\n👑 Abner's identity invoked\n\n⚠️ Suspicion is stirred\n\nThe phrase opens Joab's warning speech."],
    ["He Came to Deceive Thee", "Joab claims Abner came to trick David rather than make peace. Deceive means mislead with a hidden plan.\n\n⚠️ Treachery alleged\n\n🗣️ Joab sows suspicion\n\n👑 David is warned\n\nThe phrase shows Joab accusing Abner of false motives."],
    ["Joab Was Come Out from David", "Joab leaves David's presence and then acts on his own. The phrase marks the move from speech to secret action.\n\n🚶 Joab departs\n\n⚠️ He is about to act privately\n\n📜 The scene shifts toward betrayal\n\nThe phrase shows Joab moving beyond words."],
    ["He Sent Messengers After Abner", "Joab sends men to bring Abner back after he had left in peace. The phrase begins the trap that leads to Abner's death.\n\n📨 Men sent after Abner\n\n⚠️ A trap is forming\n\n🤝 Peace is being broken\n\nThe phrase marks the start of Joab's betrayal."],
  ],
  "2 Samuel 3:31-36": [
    ["David Said to Joab", "David speaks directly to Joab after Abner is murdered. His words make clear that David wants public mourning, not quiet approval.\n\n👑 David answers Joab\n\n😢 Mourning is commanded\n\n⚖️ The king rejects the murder\n\nThe phrase shows David taking a public stand."],
    ["People That Were with Him", "David includes all the people with him in the mourning for Abner. The grief is not private to the palace but shared publicly.\n\n👥 All the people included\n\n😢 Public mourning\n\n👑 David leads the grief\n\nThe phrase shows the whole court drawn into lament."],
    ["Buried Abner in Hebron", "Abner is buried in Hebron, David's city. The burial gives honor to a man who had just come seeking peace.\n\n🪦 Burial in Hebron\n\n😢 Honor in death\n\n🏙️ David's city becomes the burial place\n\nThe phrase shows Abner receiving a public burial, not secret disposal."],
    ["King Lifted Up His Voice", "David begins to weep aloud over Abner. Lifting up his voice means his grief is public and unmistakable.\n\n😢 Loud weeping\n\n👑 The king mourns openly\n\n📜 Public sorrow is seen\n\nThe phrase shows that David's grief is meant to be heard."],
  ],
  "2 Samuel 3:37-39": [
    ["For All the People", "All the people and all Israel understand what happened. The phrase emphasizes that David's innocence in Abner's death became publicly clear.\n\n👥 The people see it\n\n👑 Public understanding matters\n\n📜 The message spreads widely\n\nThe phrase shows that this is no private conclusion."],
    ["Not of the King to Slay Abner", "This means Abner's murder did not come from David's command or desire. The people recognize the killing was not the king's doing.\n\n👑 David did not order it\n\n⚖️ His innocence is seen\n\n📜 The public understands the truth\n\nThe phrase clears David of the murder in the people's eyes."],
    ["The King Said unto His Servants", "David speaks to his servants after Abner's death to explain the weight of the loss. The phrase introduces his judgment on what has happened.\n\n👑 David addresses his servants\n\n📜 He interprets the event\n\n😢 The loss is named\n\nThe phrase marks David's spoken response after the mourning."],
    ["There Is a Prince", "David says a prince and a great man has fallen, meaning Abner was an important leader in Israel. Prince here means a powerful ruler-like figure, not a child king.\n\n👑 A great leader has fallen\n\n😢 The loss is serious\n\n📜 David honors Abner's rank\n\nThe phrase explains the stature David is mourning."],
  ],
};

function rewriteDay76RoyalSection(section: RoyalPhraseSectionInput): RoyalPhraseSectionInput {
  const overrides = DAY_76_ROYAL_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const DAY_77_SECOND_SAMUEL_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "2 Samuel 4:1-6": [
    ["When Saul’s Son Heard That Abner Was Dead in Hebron", "Saul's son Ish-bosheth hears that Abner has died in Hebron, the city where David rules. Abner had been the strong military support behind Saul's house, so his death leaves Ish-bosheth exposed and afraid.\n\n😟 Support is gone\n\n🏙 Hebron is David's city\n\n👑 Saul's house grows weaker\n\nThe news makes clear that Ish-bosheth is losing the strength that held his kingdom together."],
    ["His Hands Were Feeble", "Feeble hands means he loses courage and strength. He is not being described as physically tired only, but as shaken and unable to act with confidence.\n\n😟 Courage fails\n\n💪 Strength seems gone\n\n⚠️ Fear spreads quickly\n\nThe phrase shows a king growing weak inside before anything else happens outside."],
    ["Saul’s Son Had Two Men That Were Captains of Bands", "Captains of bands were leaders of raiding or military groups. Ish-bosheth has two such commanders near him, which matters because armed men close to a weak king can become dangerous.\n\n🪖 Military captains\n\n👑 Serving Saul's son\n\n⚠️ Danger is nearby\n\nThe phrase introduces the men who will use their position for violence."],
    ["The Name of the One Was Baanah", "The verse slows down to name Baanah and his brother Rechab. When Scripture names men like this, it is preparing the reader to remember their personal guilt, not just a nameless crime.\n\n👤 The attackers are named\n\n🧠 Responsibility is personal\n\n📖 The story is getting specific\n\nThe phrase makes sure the coming murder is tied to real men with real accountability."],
  ],
  "2 Samuel 4:7-12": [
    ["For When They Came into the House", "The house here is Ish-bosheth's home, the place where he should have been safe. The phrase makes the crime worse because the attack happens inside a private room, not in open battle.\n\n🏠 Violence enters a home\n\n⚠️ Safety is broken\n\n🩸 Murder replaces honor\n\nThe phrase shows how treacherous this killing is."],
    ["He Lay on His Bed in His Bedchamber", "Ish-bosheth is lying on his bed in his inner room, resting and unguarded. Bedchamber means a private sleeping room, so the phrase highlights how defenseless he is.\n\n🛏 He is resting\n\n🚪 It is a private room\n\n⚠️ He is unprotected\n\nThe phrase shows that this is assassination, not combat."],
    ["They Brought the Head of Ish-bosheth unto David to Hebron", "The murderers carry Ish-bosheth's head to David at Hebron as if it were a gift. They think removing Saul's son will earn them favor with the king.\n\n🩸 A brutal trophy\n\n🏙 Brought to Hebron\n\n👑 They expect reward\n\nThe phrase shows how badly they misunderstand David's heart and justice."],
    ["Said to the King", "They speak to David as king, trying to present their crime as service to him. The phrase matters because they are using royal language to cover murder.\n\n👑 David is king\n\n🗣 They make their case\n\n⚖️ Evil is being dressed as loyalty\n\nThe phrase shows sinners trying to justify themselves before authority."],
  ],
  "2 Samuel 5:1-6": [
    ["Then Came All the Tribes of Israel to David unto Hebron", "All the tribes come to David at Hebron to recognize him as king over the whole nation. Hebron has been David's base, and now Israel gathers there to unite under him.\n\n👥 All Israel gathers\n\n🏙 Hebron is the meeting place\n\n👑 The kingdom is being united\n\nThe phrase marks the moment David's rule becomes national, not only tribal."],
    ["We Are Thy Bone", "We are thy bone means 'we are your own people, your own flesh and family.' It is a way of saying David and the tribes belong to one another by kinship.\n\n🧬 Shared family line\n\n🤝 Nearness, not distance\n\n👥 Israel claims David as its own\n\nThe phrase shows the tribes appealing to unity, not merely politics."],
    ["Also in Time Past", "This means they are looking back to earlier days, not speaking only about the present moment. The tribes are reminding David of what he had already been doing before he became king over all Israel.\n\n📜 They look back\n\n🕰 Past service matters\n\n👑 David was already leading\n\nThe phrase connects David's new crown to his earlier faithfulness."],
    ["When Saul Was King Over Us", "The tribes remember that even while Saul was officially king, David was the one who led Israel out and brought them in. They are saying David had already acted like a shepherd of the people.\n\n👑 Saul was the former king\n\n🚶 David led the people\n\n📖 Leadership was already visible\n\nThe phrase explains why the tribes trust David to rule now."],
  ],
  "2 Samuel 5:7-12": [
    ["Nevertheless David Took the Strong Hold of Zion", "A strong hold is a fortified place, and Zion is the hill fortress David captures. The phrase means David successfully takes the defended city that had seemed hard to conquer.\n\n🏰 A fortress is taken\n\n🏙 Zion is captured\n\n👑 David gains a capital city\n\nThe phrase marks the beginning of Jerusalem as David's royal center."],
    ["The Same Is the City of David", "After David captures Zion, it becomes known as the City of David. The phrase explains the new name and ties the city closely to David's reign.\n\n🏙 Zion gets a royal name\n\n👑 David's rule is stamped on it\n\n📖 Jerusalem becomes central\n\nThe phrase tells the reader why this city matters so much later in the Bible."],
    ["David Said on That Day", "This phrase introduces David's words during the capture of the city. It signals that what follows is part of the battle plan or challenge connected to taking Zion.\n\n🗣 David gives words\n\n⚔️ The city is under attack\n\n📜 The moment is being recorded carefully\n\nThe phrase prepares the reader to listen to the king's instruction in a crucial moment."],
    ["Whosoever Getteth Up to the Gutter", "The gutter here likely means a water shaft or narrow passage used to reach the fortress. The phrase is talking about the difficult route a fighter would take to break into the stronghold.\n\n🪜 A hard entry path\n\n🏰 The fortress has an opening\n\n⚔️ Courage and effort are required\n\nThe phrase helps the reader picture how the city could be reached."],
  ],
  "2 Samuel 5:13-18": [
    ["David Took Him More Concubines", "Concubines were women taken into a secondary wife-like household position. The phrase means David expands his royal household, showing both growing power and the complications that come with it.\n\n👑 Royal power increases\n\n🏠 The household grows\n\n⚠️ More power brings more complexity\n\nThe phrase shows David living more and more like an eastern king."],
    ["Wives Out of Jerusalem", "David takes more wives after coming to Jerusalem. The phrase ties the growth of his family directly to his new royal city.\n\n🏙 Jerusalem is now his center\n\n🏠 The royal family expands\n\n👑 His kingship is becoming established\n\nThe phrase shows David's household growing alongside his throne."],
    ["These Be the Names of Those That Were Born unto Him in Jerusalem", "The verse begins listing the sons born to David in Jerusalem. The names matter because they trace the royal family that will shape the kingdom's future.\n\n👶 Sons are being counted\n\n🏙 Born in Jerusalem\n\n👑 The royal line is growing\n\nThe phrase turns attention to the family that will carry later blessings and troubles."],
    ["The Names of Those That", "The list of names is not filler. In Scripture, names preserve family lines, inheritance, and the unfolding story of the kingdom.\n\n📜 Names are remembered\n\n🧬 Family line matters\n\n📖 Future stories grow from this list\n\nThe phrase reminds the reader that these children will matter later."],
  ],
  "2 Samuel 5:19-24": [
    ["David Enquired of the LORD", "David stops to ask the LORD what to do before fighting the Philistines. Enquired means he seeks God's direction instead of assuming victory on his own.\n\n🙏 David asks first\n\n⚔️ Battle is ahead\n\n👂 Guidance matters\n\nThe phrase shows a king depending on God before acting."],
    ["Shall I Go Up to the Philistines", "David is asking whether he should attack at this time. Go up is battle language for going out against the enemy, so he is not asking about travel but about war.\n\n❓ He asks for permission to fight\n\n⚔️ The Philistines are the target\n\n🙏 He will not rush ahead blindly\n\nThe phrase shows David seeking God's timing, not just God's help."],
    ["David Came to Baal-perazim", "Baal-perazim is the place where David meets the Philistines and wins. The name becomes important because David will connect it with the LORD breaking through his enemies.\n\n🏙 A battle place is named\n\n⚔️ Victory happens there\n\n📖 The location will carry meaning\n\nThe phrase anchors the victory in a real place with a remembered name."],
    ["David Smote Them There", "Smote means struck down or defeated. The phrase tells us David wins the battle at that place instead of merely pushing the enemy back.\n\n⚔️ The enemy is defeated\n\n👑 David prevails\n\n📍 The victory happens there\n\nThe phrase shows the LORD answering David's inquiry with real success."],
  ],
  "2 Samuel 5:25": [
    ["David Did So", "David follows through exactly instead of changing the plan. The phrase is simple obedience put into action.\n\n✅ He obeys\n\n👑 The king acts\n\n📖 Guidance becomes practice\n\nThe phrase shows that asking God matters only if David then does what God said."],
    ["As the LORD Had Commanded Him", "David acts according to the LORD's command, not according to his own instinct. Commanded makes this more than advice; it is direction from God.\n\n🙏 God gives the order\n\n✅ David follows it\n\n⚔️ Victory is tied to obedience\n\nThe phrase shows why David's action succeeds."],
    ["David Did So, as the LORD Had", "This shortened wording still means David carried out the instruction he had received from God. The focus is on obedience, not creativity.\n\n✅ The instruction is kept\n\n🙏 God's word leads\n\n👑 David responds rightly\n\nThe phrase keeps the reader's eye on faithful action after faithful listening."],
    ["Did So, as the LORD Had Commanded Him;", "The repeated line underlines that David's success comes through doing what he was told. Scripture slows down here to make obedience unmistakable.\n\n📜 The point is repeated\n\n✅ Obedience is emphasized\n\n⚔️ The battle is won God's way\n\nThe phrase reinforces that David did not invent the strategy for himself."],
  ],
  "2 Samuel 6:1-6": [
    ["David Gathered Together All the Chosen Men of Israel", "Chosen men are selected fighting men, not the entire population. David gathers an honored group from Israel for the important task of bringing up the ark.\n\n👥 Selected men gather\n\n👑 David leads the effort\n\n📦 The ark journey matters greatly\n\nThe phrase shows this is a major national and worship event."],
    ["Again, David Gathered Together All", "Again means David is assembling the people once more for a new step. The repetition signals a deliberate, organized effort rather than a casual visit.\n\n🔁 A second gathering\n\n👥 People are assembled on purpose\n\n📖 The event has weight\n\nThe phrase shows David carefully preparing for the ark's movement."],
    ["Together All the Chosen Men", "The words stress that the chosen men are brought together as one company. This is a united action by Israel's leadership, not a private act by David alone.\n\n👥 One assembled group\n\n🤝 National unity is visible\n\n📦 A sacred task is underway\n\nThe phrase highlights the shared nature of the mission."],
    ["Chosen Men of Israel, Thirty", "Thirty thousand shows a very large official gathering. The size tells the reader this is a public national event centered on the ark.\n\n🔢 A large number is named\n\n👥 Israel is involved publicly\n\n📦 The ark is treated as important\n\nThe phrase shows how large and serious this moment is."],
  ],
  "2 Samuel 6:7-12": [
    ["The Anger of the LORD Was Kindled Against Uzzah", "Kindled anger means God's anger flared up against Uzzah. The phrase tells the reader this is not a random accident but a holy judgment.\n\n🔥 God's anger burns\n\n⚠️ Holiness is being violated\n\n📦 The ark must be handled rightly\n\nThe phrase shows that God's presence cannot be treated carelessly."],
    ["God Smote Him There for His Error", "Smote means struck, and his error is the wrong act Uzzah commits when he touches the ark. The phrase explains that his death is God's response to a serious breach of holiness.\n\n⚖️ Judgment falls immediately\n\n✋ Wrong handling brings consequence\n\n📦 The ark is holy\n\nThe phrase teaches that good intentions do not erase disobedience."],
    ["David Was Displeased", "David is upset and shaken by what has happened. Displeased here carries grief and disturbance, not just mild annoyance.\n\n😟 David is troubled\n\n💔 The celebration is interrupted\n\n❓ He must reckon with God's holiness\n\nThe phrase shows David struggling to understand what just happened."],
    ["Because the LORD Had Made a Breach Upon Uzzah", "A breach is a sudden breaking out in judgment. The phrase means the LORD struck Uzzah decisively, creating a fearful interruption in the procession.\n\n⚡ A sudden act of judgment\n\n😨 The moment becomes fearful\n\n📖 God's holiness breaks into the scene\n\nThe phrase explains why David names the place after this event."],
  ],
  "2 Samuel 6:13-18": [
    ["It Was So", "These words mark the next stage after the earlier failure with the ark. The story is now showing a different, more careful approach.\n\n📜 The account moves forward\n\n🔁 A new attempt begins\n\n📦 The ark is still central\n\nThe phrase quietly opens the successful procession."],
    ["That When They That Bare the Ark of the LORD Had Gone Six Paces", "Bare means carried. After only six paces, they stop and sacrifice, showing great care and reverence while carrying the ark properly.\n\n📦 The ark is carried by men\n\n👣 Only six steps pass\n\n🕊 Worship interrupts the journey\n\nThe phrase shows how carefully God's presence is now being honored."],
    ["David Danced Before the LORD with All His Might", "David dances with full strength before the LORD in open joy and worship. The phrase means his celebration is directed to God, not to impress the crowd.\n\n🙌 Joy before God\n\n💪 Full-hearted worship\n\n👑 The king humbles himself in praise\n\nThe phrase shows worship that is strong, public, and God-centered."],
    ["David Was Girded with a Linen Ephod", "Girded means dressed or wrapped, and a linen ephod is a simple priestly-style garment. The phrase shows David appearing in humble worship clothing rather than royal armor.\n\n👕 A worship garment\n\n👑 Royal display is lowered\n\n🙏 The focus is on praise\n\nThe phrase helps the reader see David celebrating as a worshiper, not posing as a warrior."],
  ],
  "2 Samuel 6:19-23": [
    ["He Dealt Among All the People", "Dealt among the people means David distributed gifts or portions to them. He is not keeping the celebration to himself but sharing its blessing with the nation.\n\n🍞 Gifts are distributed\n\n👥 The people all receive\n\n🎉 Worship reaches the crowd\n\nThe phrase shows royal generosity flowing out from public praise."],
    ["Even Among the Whole Multitude of Israel", "The whole multitude means the full assembled crowd from Israel. The phrase stresses that the blessing is broad and public, not reserved for a small elite group.\n\n👥 Everyone gathered is included\n\n🎉 The celebration is national\n\n🤝 The blessing is widely shared\n\nThe phrase shows David treating the people as participants, not spectators only."],
    ["Then David Returned to Bless His Household", "After blessing the people, David goes home to bless his own household as well. Household here means his family and those under his roof.\n\n🏠 David goes home\n\n🙏 He wants blessing there too\n\n👨‍👩‍👧 Public worship touches private life\n\nThe phrase shows David carrying worship from the nation back into his home."],
    ["Michal the Daughter of Saul Came Out to Meet David", "Michal comes out to meet David, but the moment turns into criticism rather than shared joy. Calling her Saul's daughter also reminds the reader of the older house and its values.\n\n🚪 Michal comes out\n\n👑 Saul's house is still in view\n\n⚠️ Conflict is about to surface\n\nThe phrase prepares the reader for the clash between David's worship and Michal's contempt."],
  ],
  "2 Samuel 7:1-6": [
    ["It Came to Pass", "This is a simple time marker that moves the story into a new moment after David's victories and the ark's arrival. It tells the reader the next important scene is beginning.\n\n🕰 A new moment opens\n\n📜 The story moves on\n\n👑 David remains central\n\nThe phrase quietly starts the covenant conversation that follows."],
    ["When the King Sat in His House", "The king sitting in his house means David is settled in his royal palace. He is at rest in a permanent place, which makes him notice that the ark is still in a tent.\n\n👑 David is established\n\n🏠 He sits in his palace\n\n📦 The ark's contrast becomes obvious\n\nThe phrase sets up David's concern about where God is worshiped."],
    ["That the King Said unto Nathan the Prophet", "Nathan is the prophet who speaks God's word to David. The phrase introduces a conversation between royal authority and prophetic authority.\n\n🗣 David speaks\n\n👑 A king addresses a prophet\n\n📖 God's word will soon answer\n\nThe phrase matters because this is not an ordinary court conversation."],
    ["I Dwell in an House of Cedar", "A house of cedar is a strong, expensive palace built with fine wood. David is saying he lives in comfort and permanence while the ark remains in a tent.\n\n🏠 A costly palace\n\n🌲 Cedar suggests royal splendor\n\n📦 David notices the contrast\n\nThe phrase explains why David begins thinking about a house for the ark."],
  ],
  "2 Samuel 7:7-12": [
    ["In All the Places Wherein I Have Walked with All the Children of Israel Spake I a Word with Any of the Tribes of Israel", "The LORD is saying that through all Israel's journey He never asked the tribes to build Him a cedar house. Walked with Israel means He had been present with His people throughout their history.\n\n🚶 God has been with Israel\n\n🏕 His presence was mobile\n\n❓ He never demanded a palace\n\nThe phrase reminds David that God had already chosen how to dwell among His people."],
    ["Whom I Commanded to Feed My People Israel", "To feed My people means to shepherd and lead them, not merely give them food. God is speaking of the rulers He appointed to care for Israel.\n\n🐑 Leadership is shepherding\n\n👥 Israel is God's people\n\n📖 Rulers answer to Him\n\nThe phrase explains what kind of care God expected from Israel's leaders."],
    ["Now Therefore So Shalt Thou Say unto My Servant David", "God tells Nathan exactly what to say to David. Calling David 'My servant' reminds the reader that even the king stands under God's authority.\n\n🗣 God sends a message\n\n👑 David is still God's servant\n\n📖 The king must listen\n\nThe phrase shifts the scene from David's plan to God's answer."],
    ["Thus Saith the LORD of Hosts", "LORD of hosts means the LORD who rules over heavenly and earthly armies. The phrase gives full weight to the message because it comes from the sovereign God.\n\n👑 God commands all hosts\n\n📜 This is His official word\n\n⚔️ Supreme authority speaks\n\nThe phrase tells the reader to hear the promise as God's own decree."],
  ],
  "2 Samuel 7:13-18": [
    ["He Shall Build an House for My Name", "This means David's son, not David, will build the temple. A house for God's name is a place set apart for worship and for honoring God's revealed presence.\n\n🏛 A temple will be built\n\n👦 David's son will do it\n\n🙏 Worship is the purpose\n\nThe phrase explains that David's desire will be fulfilled, but through the next generation."],
    ["I Will Stablish the Throne of His Kingdom for Ever", "To stablish the throne means to make the rule firm and enduring. The phrase is a promise that David's royal line will have a lasting place in God's plan.\n\n👑 The throne is made firm\n\n📜 A lasting promise is given\n\n🧬 David's line will continue\n\nThe phrase reaches beyond one king to an enduring kingdom promise."],
    ["I Will Be His Father", "God is promising a fatherly relationship to the king from David's line. The words speak of care, authority, and covenant relationship, not that the king becomes divine.\n\n❤️ Fatherly care promised\n\n📖 Covenant closeness\n\n👑 The king answers to God\n\nThe phrase shows the royal son ruling under a personal relationship with God."],
    ["He Shall Be My Son", "To be God's son here means the king stands in a special covenant relationship as God's chosen royal representative. It is about adoption and role, not physical birth from God.\n\n👑 A chosen royal son\n\n📖 Special covenant status\n\n🙏 Rule is tied to God\n\nThe phrase explains the king's place under God's fatherly authority."],
  ],
  "2 Samuel 7:19-24": [
    ["This Was Yet a Small Thing in Thy Sight", "David says that even the blessings already given to him seemed small in God's sight compared with the greater promises still to come. He is amazed that God has gone beyond present mercy into future promise.\n\n😮 David is amazed\n\n🎁 Past gifts were not the end\n\n📜 Greater promise follows\n\nThe phrase shows David overwhelmed by how much more God intends to do."],
    ["O Lord God", "David addresses God with deep reverence. Lord God joins God's authority and His covenant nearness in one prayerful title.\n\n🙏 A reverent address\n\n👑 God rules over David\n\n💬 Prayer grows personal\n\nThe phrase shows David speaking with awe, not casual familiarity."],
    ["What Can David Say More unto Thee", "David feels there is little left to say because God's grace is greater than his words. The sentence is humble amazement, not confusion.\n\n😶 Words feel too small\n\n❤️ Gratitude is overflowing\n\n🙏 David is humbled by grace\n\nThe phrase shows a king running out of language before God's kindness."],
    ["Knowest Thy Servant", "Knowest means 'you know.' David is saying God fully knows him, his weakness, and his place as servant, yet still speaks such promises to him.\n\n👀 God knows David fully\n\n🙏 David calls himself servant\n\n❤️ Grace is given knowingly\n\nThe phrase makes the promise feel even more personal."],
  ],
  "2 Samuel 7:25-29": [
    ["O LORD God", "David opens this prayer by calling on the covenant LORD with reverence and trust. He is not making demands; he is appealing to the God who has spoken.\n\n🙏 David prays to the LORD\n\n📖 He answers God's promise with prayer\n\n👑 Trust and reverence are joined\n\nThe phrase sets the tone for a humble request grounded in God's word."],
    ["The Word That Thou Hast Spoken Concerning Thy Servant", "David is referring to the promise God has just spoken about him and his house. He asks God to confirm that word, not because God is unreliable, but because faith turns promise into prayer.\n\n📜 God's promise is in view\n\n🙏 David prays from that promise\n\n🏠 His house is included\n\nThe phrase shows David building his prayer on what God said."],
    ["Let Thy Name Be Magnified for Ever", "To magnify God's name is to honor Him publicly as great. David wants the promise to his house to result in greater glory for God, not merely greater status for himself.\n\n🙌 God's greatness displayed\n\n📖 His reputation honored\n\n👑 God's glory matters most\n\nThe phrase shows the right goal behind David's prayer."],
    ["The LORD of Hosts Is the God Over Israel", "LORD of hosts means God rules every army and power, and God over Israel means Israel belongs under His authority. David is confessing who truly reigns above the kingdom.\n\n👑 God rules all powers\n\n👥 Israel belongs to Him\n\n📖 David's throne stays under God's throne\n\nThe phrase anchors the whole promise in God's supreme rule."],
  ],
};

function rewriteDay77SecondSamuelSection(section: RoyalPhraseSectionInput): RoyalPhraseSectionInput {
  const overrides = DAY_77_SECOND_SAMUEL_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const DAY_79_SECOND_SAMUEL_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "2 Samuel 12:1-6": [
    ["The LORD Sent Nathan unto David", "God sends Nathan the prophet to confront David about his sin. Nathan is not coming with military orders, but with God's word and judgment.\n\n🙏 God takes the first step\n\n🗣 Nathan speaks for the LORD\n\n⚖️ David will be confronted\n\nThe phrase shows that even a king is answerable to God."],
    ["He Came unto Him", "Nathan comes directly to David instead of speaking from a distance. The phrase makes the rebuke personal, face to face, and impossible to ignore.\n\n🚶 Nathan approaches David\n\n👑 The king is addressed directly\n\n⚠️ The moment is personal\n\nThe phrase shows that God brings His word straight to the guilty person."],
    ["The Rich Man Had Exceeding Many Flocks", "Nathan's story begins with a rich man who already has more than enough sheep and cattle. Exceeding many means a great abundance.\n\n🐑 The man has plenty\n\n💰 He lacks nothing\n\n⚖️ His greed will look worse\n\nThe phrase sets up a contrast between abundance and selfish taking."],
    ["Had Exceeding Many Flocks and", "The repeated detail keeps stressing how much the rich man owned already. Nathan wants David to feel how unnecessary and unjust the coming theft is.\n\n🐑 Large possessions\n\n📜 The point is repeated\n\n⚠️ Greed has no excuse\n\nThe phrase underlines that the rich man was not taking because of need."],
  ],
  "2 Samuel 12:7-12": [
    ["Nathan Said to David", "Nathan now stops telling the parable and speaks directly to David. The phrase marks the moment the story turns into open rebuke.\n\n🗣 Nathan speaks plainly\n\n📜 The parable gives way to truth\n\n⚖️ Judgment is now direct\n\nThe phrase shows the confrontation becoming unmistakable."],
    ["Thou Art the Man", "Nathan means that David is the guilty man from the story. The sentence strips away all distance and places the sin on David himself.\n\n👉 David is identified\n\n⚖️ The blame is personal\n\n💥 The parable lands\n\nThe phrase is the sharp moment when hidden sin is exposed."],
    ["I Gave Thee Thy Master’s House", "God reminds David that He had already given him Saul's kingdom and royal place. Master here refers to Saul, whose throne David received from the LORD.\n\n👑 God gave David the kingdom\n\n🏠 Royal rule was a gift\n\n🙏 David had already received much\n\nThe phrase shows that David sinned despite great kindness from God."],
    ["Thy Master’s Wives into Thy Bosom", "Into thy bosom means into your care or possession. God is describing the royal household blessings that came with the kingdom David received.\n\n🏠 Royal household transferred\n\n📖 Bosom means close possession\n\n⚖️ God had already provided\n\nThe phrase deepens the charge that David took what God had not given him."],
  ],
  "2 Samuel 12:13-18": [
    ["David Said unto Nathan", "David answers Nathan after hearing the rebuke. The phrase matters because his first response is confession, not denial.\n\n🗣 David responds\n\n⚖️ The guilty man speaks\n\n🙏 Confession is beginning\n\nThe phrase opens David's first honest reply."],
    ["I Have Sinned Against the LORD", "David is admitting that his sin was ultimately against God, not only against people. The words are short, but they are a real confession of guilt.\n\n🙏 Sin is admitted\n\n⚖️ God is the offended One\n\n🧎 David stops excusing himself\n\nThe phrase shows repentance beginning with honest ownership."],
    ["Because by This Deed Thou Hast Given Great Occasion to the Enemies of the LORD to Blaspheme", "David's public sin has given God's enemies a reason to mock the LORD and speak evil of His name. Blaspheme here means to dishonor God with contemptuous speech.\n\n🗣 God's enemies will mock\n\n⚠️ A leader's sin spreads outward\n\n🙏 God's name is dragged into it\n\nThe phrase shows that private sin can create public dishonor for God."],
    ["The Child Also That Is Born unto Thee Shall Surely Die", "Nathan announces that David's child will die as part of the judgment. Surely die means the sentence is certain, not merely possible.\n\n👶 The child is under judgment\n\n⚖️ Consequence will come\n\n💔 The word is certain\n\nThe phrase shows how severe the aftermath of David's sin will be."],
  ],
  "2 Samuel 12:19-24": [
    ["But When David Saw That His Servants Whispered", "David notices his servants whispering because they are afraid to tell him the child has died. Their quiet behavior makes him understand the news before anyone speaks it.\n\n👀 David watches them\n\n🤫 The servants whisper\n\n💔 The room is full of dread\n\nThe phrase shows grief being sensed before it is spoken."],
    ["David Perceived That the Child Was Dead", "Perceived means understood or realized. David reads the situation correctly and knows that the child has died.\n\n🧠 David understands\n\n👶 The child is gone\n\n💔 The feared outcome is real\n\nThe phrase shows David grasping the truth from the servants' behavior."],
    ["Then David Arose from the Earth", "David had been lying on the ground in grief and fasting. Rising from the earth means he gets up from his mourning posture after the child dies.\n\n🧎 Grief on the ground ends\n\n🚶 David rises\n\n📜 A new response begins\n\nThe phrase marks the shift from pleading to accepting God's decision."],
    ["Changed His Apparel", "Apparel means clothing. David washes, changes clothes, and goes to worship, showing that his season of desperate mourning has ended.\n\n👕 Fresh clothes\n\n🕊 Mourning posture changes\n\n🙏 Worship follows grief\n\nThe phrase shows outward actions reflecting an inward turning toward God."],
  ],
  "2 Samuel 12:25-30": [
    ["He Sent by the Hand of Nathan the Prophet", "God sends a message through Nathan about the new child. By the hand of Nathan means Nathan is the messenger carrying God's word.\n\n🗣 Nathan carries the message\n\n🙏 God speaks again\n\n👶 The child is in view\n\nThe phrase shows the LORD addressing David's house once more through His prophet."],
    ["He Called His Name Jedidiah", "Jedidiah is a special name meaning beloved of the LORD. The name explains how God regards this child even after the dark events that came before.\n\n👶 A new name is given\n\n❤️ The LORD loves this child\n\n📖 The name carries meaning\n\nThe phrase shows mercy and favor entering the story again."],
    ["Joab Fought Against Rabbah of the Children of Ammon", "Joab is still fighting at Rabbah, the Ammonite capital city. The phrase returns the story to the war David had earlier left to others.\n\n⚔️ The battle continues\n\n🏙 Rabbah is the target\n\n🪖 Joab is leading it\n\nThe phrase brings the narrative back to the unfinished war."],
    ["Took the Royal City", "The royal city is the main fortified part of Rabbah where the king's power is centered. Taking it means the city is effectively conquered.\n\n🏙 The capital stronghold falls\n\n👑 Royal power is broken\n\n⚔️ Victory is near complete\n\nThe phrase shows the enemy city losing its center of rule."],
  ],
  "2 Samuel 12:31": [
    ["He Brought Forth the People That Were Therein", "David brings out the people who were inside the conquered city. The phrase means the captured population is taken from within Rabbah after the victory.\n\n🚪 The people are brought out\n\n🏙 They come from the city\n\n⚔️ The conquest is finished\n\nThe phrase marks what happens to the defeated people after the fall."],
    ["Put Them Under Saws", "This is harsh judgment language describing forced labor or severe punishment with cutting tools. The verse is meant to sound grim, not gentle.\n\n🪚 Cutting tools are named\n\n⚖️ The treatment is severe\n\n⚠️ War leaves brutal aftermath\n\nThe phrase shows the hard judgment placed on the conquered people."],
    ["Brought Forth the People That Were Therein, and", "The repeated wording slows the reader down on what David does with the city's people after victory. Scripture is emphasizing the aftermath, not just the triumph.\n\n📜 The action is restated\n\n👥 The captives stay in view\n\n⚠️ The aftermath matters too\n\nThe phrase keeps the reader from skipping past the severity of the scene."],
    ["Forth the People That Were Therein, and Put", "This shortened line still focuses on the captured people being removed and assigned to harsh treatment. The verse is describing what was done to them after the city fell.\n\n👥 The captives are handled\n\n⚖️ Punishment follows capture\n\n📖 The verse stays concrete\n\nThe phrase keeps the grim consequences in front of the reader."],
  ],
  "2 Samuel 13:1-6": [
    ["It Came to Pass After This", "The phrase moves the story forward after David's earlier troubles. What follows is another consequence unfolding inside his own house.\n\n🕰 The story moves on\n\n🏠 Trouble is now inside the family\n\n⚠️ A dark chapter begins\n\nThe phrase opens the next painful stage in David's house."],
    ["That Absalom the Son of David Had a Fair Sister", "Fair here means beautiful. The phrase introduces Tamar as Absalom's sister and highlights her beauty because it becomes part of the coming tragedy.\n\n👧 Tamar is introduced\n\n👨‍👧 She is Absalom's sister\n\n✨ Fair means beautiful\n\nThe phrase names the family relationship that makes the coming sin so grievous."],
    ["Amnon Was So Vexed", "Vexed means distressed, agitated, or tormented. Amnon is inwardly troubled by sinful desire, not by righteous love.\n\n🧠 His mind is disturbed\n\n🔥 Desire is controlling him\n\n⚠️ Trouble is growing inside\n\nThe phrase shows sinful craving already twisting him."],
    ["That He Fell Sick for His Sister Tamar", "He became physically worn down or acted sick because of his obsession with Tamar. The line shows how consuming and disordered his desire had become.\n\n🤒 He is overcome by desire\n\n👧 Tamar is the focus\n\n⚠️ Sin is affecting body and mind\n\nThe phrase shows lust becoming an inward sickness."],
  ],
  "2 Samuel 13:7-12": [
    ["Then David Sent Home to Tamar", "David sends Tamar from the palace to Amnon's house because he does not know the trap being set. The phrase is painful because a father's instruction unknowingly places her in danger.\n\n👑 David gives the order\n\n🏠 Tamar is sent away\n\n⚠️ The danger is hidden\n\nThe phrase shows how innocence can be moved into harm without seeing it."],
    ["Go Now to Thy Brother Amnon’s House", "David tells Tamar to go to Amnon's house and prepare food for him. The house here is Amnon's private residence, the setting where he will isolate her.\n\n🏠 Amnon's home is the destination\n\n🍞 Tamar is sent to serve\n\n⚠️ Privacy becomes danger\n\nThe phrase sets the trap's location clearly before the reader."],
    ["So Tamar Went to Her Brother Amnon’s House", "Tamar obeys and goes to her brother's house without suspicion. The phrase shows her innocence and trust in the family instruction she was given.\n\n🚶 Tamar goes obediently\n\n👧 She is unsuspecting\n\n🏠 The danger closes in\n\nThe phrase makes the coming betrayal even sadder."],
    ["He Was Laid Down", "Amnon is lying down pretending to be sick. Laid down here points to his staged weakness, not to genuine helplessness.\n\n🛏 He is in bed\n\n🎭 The sickness is part of the plan\n\n⚠️ Deception shapes the scene\n\nThe phrase shows his false condition preparing the trap."],
  ],
  "2 Samuel 13:13-18": [
    ["Whither Shall I Cause My Shame to Go", "Whither means where. Tamar is asking where her disgrace could go if Amnon forces her, because such shame would cling to her publicly.\n\n❓ Where could her shame go?\n\n💔 Honor would be ruined\n\n👧 Tamar speaks from fear and grief\n\nThe phrase shows how devastating this act would be for her life."],
    ["As for Thee", "Tamar now turns from speaking about herself to warning Amnon about his own disgrace. She is saying he too will be counted foolish and wicked in Israel.\n\n👉 She addresses Amnon directly\n\n⚖️ His own shame is named\n\n🗣 She pleads with reason\n\nThe phrase shifts the warning from her loss to his guilt."],
    ["Howbeit He Would Not Hearken unto Her Voice", "Hearken means listen or obey. Amnon refuses to listen to Tamar's plea even after she speaks clearly and wisely.\n\n👂 He will not listen\n\n🗣 Her words are rejected\n\n⚠️ Sin hardens him\n\nThe phrase shows refusal before the violence happens."],
    ["Being Stronger Than She", "This means Amnon overpowers Tamar physically. The phrase is plain about force: he uses strength against someone weaker.\n\n💪 Unequal strength is used violently\n\n👧 Tamar is overpowered\n\n⚠️ This is force, not love\n\nThe phrase makes the violence unmistakable."],
  ],
  "2 Samuel 13:19-24": [
    ["Tamar Put Ashes on Her Head", "Ashes on the head were a public sign of grief, ruin, and deep sorrow. Tamar's actions show that she understands the terrible wrong that has been done to her.\n\n灰 Ashes mark mourning\n\n💔 Public sorrow is visible\n\n👧 Tamar's grief is open\n\nThe phrase shows grief expressed in a visible biblical way."],
    ["Rent Her Garment of Divers Colours That Was on Her", "Rent means tore. A garment of divers colours was a special robe associated with a king's virgin daughter, so tearing it shows her ruined condition and grief.\n\n👗 A royal daughter's robe is torn\n\n💔 Honor has been shattered\n\n📖 The garment had special meaning\n\nThe phrase makes her loss visible through what she tears."],
    ["Absalom Her Brother Said unto Her", "Absalom now speaks to Tamar after the attack. His words show that he quickly understands what has happened and begins to carry silent anger.\n\n🗣 Absalom responds\n\n👨‍👧 A brother enters the pain\n\n⚠️ Another reaction is forming\n\nThe phrase brings Tamar's brother into the aftermath."],
    ["Hath Amnon Thy Brother Been with Thee", "Absalom is asking whether Amnon has violated her. Been with thee here is a guarded way of referring to the sexual wrong that has occurred.\n\n❓ Absalom understands the hint\n\n🗣 The question is indirect but clear\n\n💔 The abuse is being named carefully\n\nThe phrase shows how people sometimes speak indirectly about deep shame."],
  ],
  "2 Samuel 13:25-30": [
    ["The King Said to Absalom", "David answers Absalom's invitation to the feast. The phrase matters because Absalom is already planning revenge while speaking politely to the king.\n\n👑 David responds\n\n🎭 Absalom hides his true plan\n\n⚠️ Courtesy covers danger\n\nThe phrase shows outward respect hiding inward violence."],
    ["Let Us Not All Now Go", "David declines to have the whole royal household attend the feast. He is trying not to burden Absalom and does not suspect what is being prepared.\n\n🚫 David refuses the large trip\n\n👨‍👩‍👦 The full family will not go\n\n⚠️ He does not see the plot\n\nThe phrase shows normal caution in a situation that is not normal."],
    ["Then Said Absalom", "Absalom speaks again after David refuses. The phrase marks the next careful move in his plan to get Amnon there without the whole court.\n\n🗣 Absalom presses further\n\n🎯 He narrows the request\n\n⚠️ The plan continues quietly\n\nThe phrase shows strategy hiding inside polite speech."],
    ["I Pray Thee", "I pray thee means 'please' or 'I ask you.' Absalom sounds respectful, but he is using courteous language to help carry out revenge.\n\n🙏 A polite request\n\n🎭 Respectful words hide intent\n\n👑 David hears only the surface\n\nThe phrase shows how dangerous plans can sound gentle."],
  ],
  "2 Samuel 13:31-36": [
    ["Then the King Arose", "David rises in shock when he hears the first report that all his sons are dead. The phrase captures the sudden physical reaction of grief and alarm.\n\n👑 David springs up\n\n😨 Terrible news strikes him\n\n💔 The house is shaken\n\nThe phrase shows a father reacting before the full truth is known."],
    ["Tare His Garments", "Tare means tore. Tearing garments was a visible sign of anguish, horror, and mourning.\n\n👕 Clothes are torn\n\n💔 Grief is public\n\n📖 The body shows the sorrow\n\nThe phrase shows David expressing intense distress in a biblical mourning gesture."],
    ["The Son of Shimeah David’s Brother", "This identifies Jonadab by his family connection to David. He is David's nephew, which explains why he is present and speaks with some familiarity in the royal house.\n\n👤 Jonadab is identified\n\n👨‍👩‍👦 Family ties matter\n\n🏠 He belongs inside the court world\n\nThe phrase explains who this speaker is in relation to David."],
    ["Let Not My Lord Suppose That They Have Slain All the Young Men the King’s Sons", "Jonadab tells David not to believe the first exaggerated report. Suppose here means think or assume.\n\n🗣 Jonadab corrects the report\n\n👑 He addresses David respectfully\n\n⚠️ The first news was too broad\n\nThe phrase shows the difference between rumor and the actual tragedy."],
  ],
  "2 Samuel 13:37-39": [
    ["But Absalom Fled", "Absalom runs away after Amnon is killed. Fled means he escapes to avoid the consequences of his act.\n\n🏃 Absalom escapes\n\n⚖️ He does not stay to answer\n\n⚠️ The family fracture widens\n\nThe phrase shows revenge leading to exile."],
    ["Went to Talmai", "Talmai is the king of Geshur and also connected to Absalom by family ties. Absalom is not fleeing randomly; he is going to a place where he has protection.\n\n👑 A foreign king is named\n\n🛡 Absalom has refuge\n\n📖 Family connections matter\n\nThe phrase explains why this particular destination is important."],
    ["So Absalom Fled", "The repeated line keeps the reader's attention on Absalom's exile. Scripture is stressing that he is now absent from David's house because of what he has done.\n\n📜 The flight is repeated\n\n🏃 Exile is emphasized\n\n🏠 The son is gone\n\nThe phrase underlines the lasting break in the family."],
    ["Went to Geshur", "Geshur is a small kingdom outside Israel where Absalom stays for safety. Mentioning it helps the reader picture his separation from David and Jerusalem.\n\n🌍 He leaves Israel's center\n\n🛡 Geshur becomes refuge\n\n💔 Distance replaces family closeness\n\nThe phrase shows how far the breach has spread."],
  ],
  "2 Samuel 14:1-6": [
    ["Now Joab the Son of Zeruiah Perceived That the King’s Heart Was Toward Absalom", "Joab realizes David still has inward affection for Absalom. The king's heart being toward Absalom means David longs for his son even after the crime and exile.\n\n🧠 Joab understands David's feelings\n\n❤️ The king still longs for Absalom\n\n⚠️ Emotion and justice are tangled\n\nThe phrase shows Joab reading the king's inner struggle."],
    ["Son of Zeruiah Perceived That", "The line keeps attention on Joab's ability to read the situation around David. Perceived means he noticed and understood what was happening beneath the surface.\n\n🧠 Joab notices more than words\n\n👀 He reads the court carefully\n\n📖 Hidden feelings are becoming clear\n\nThe phrase shows Joab acting from shrewd observation."],
    ["Perceived That the King’s Heart", "The king's heart refers to David's inner desire and affection, not merely his thoughts. Joab sees that David's feelings are already leaning toward reconciliation.\n\n❤️ Heart means inner affection\n\n👑 David is emotionally drawn\n\n⚠️ The issue is not settled inside him\n\nThe phrase explains what Joab notices about David's inner life."],
    ["Joab Sent to Tekoah", "Joab sends for a woman from Tekoah, a town known here through the wise woman he recruits. He is preparing a plan rather than speaking to David openly at first.\n\n📨 Joab sends for help\n\n🏙 Tekoah is the source\n\n🎭 A plan is forming\n\nThe phrase introduces the staged appeal Joab is about to arrange."],
  ],
  "2 Samuel 14:7-12": [
    ["The Whole Family Is Risen Against Thine Handmaid", "The wise woman says her clan has risen against her. Handmaid means female servant and is a humble way for her to refer to herself before the king.\n\n👪 The family is demanding action\n\n🙇 Handmaid is humble speech\n\n⚖️ Pressure is closing in\n\nThe phrase sets up the crisis she wants David to judge."],
    ["Deliver Him That Smote His Brother", "The family wants the surviving son handed over for execution because he killed his brother. Deliver him means surrender him into their power for judgment.\n\n⚖️ A son is demanded for justice\n\n🩸 A brother has been killed\n\n👪 The family wants blood payment\n\nThe phrase states the core issue of the woman's story."],
    ["The King Said unto the Woman", "David now answers the woman personally. The phrase matters because he is stepping into the role of judge over the case she presents.\n\n👑 David responds as judge\n\n🗣 The woman is heard\n\n⚖️ A ruling is beginning\n\nThe phrase marks the king's judicial involvement."],
    ["Go to Thine House", "David tells her to return home and promises to deal with the matter. The instruction means she can leave the court with assurance that he will speak for her.\n\n🏠 She may go home\n\n👑 The king takes up the case\n\n🕊 Some relief is given\n\nThe phrase shows David extending protection through his authority."],
  ],
  "2 Samuel 14:13-18": [
    ["The Woman Said", "The woman continues speaking after David's initial ruling. Her next words turn the story so that David must consider his own unresolved situation with Absalom.\n\n🗣 She keeps speaking\n\n🎯 The appeal is turning inward\n\n⚠️ David will be implicated\n\nThe phrase introduces the sharper point of her argument."],
    ["Wherefore Then Hast Thou Thought Such a Thing Against the People of God", "Wherefore means why. She asks why David has acted in a way that leaves one of God's people, namely Absalom, still driven away.\n\n❓ She presses David with a question\n\n👥 The people of God are invoked\n\n⚖️ His own case is now in view\n\nThe phrase turns a courtroom story into a mirror for the king."],
    ["For We Must Needs Die", "Must needs die means we all surely must die. The woman is reminding David that life is fragile and that lost opportunities for mercy cannot simply be recovered later.\n\n💀 Death comes to all\n\n⏳ Time is limited\n\n🙏 Mercy should not be delayed forever\n\nThe phrase gives urgency to her appeal."],
    ["Are as Water Spilt on the Ground", "Water spilled on the ground cannot be gathered up again. The image means some losses, especially death, cannot be reversed once they happen.\n\n💧 Spilled water cannot be recovered\n\n📖 A vivid image explains finality\n\n⏳ Some moments cannot be undone\n\nThe phrase strengthens her plea for timely mercy."],
  ],
  "2 Samuel 14:19-24": [
    ["The King Said", "David now questions the woman directly because he senses Joab's hand in the story. The phrase marks the moment he moves from being persuaded to uncovering the setup.\n\n👑 David questions her\n\n🧠 He has discerned the plan\n\n⚠️ The hidden arranger is about to be named\n\nThe phrase shows the king seeing through the performance."],
    ["Is Not the Hand of Joab with Thee in All This", "The hand of Joab means Joab's involvement or control over the whole matter. David is asking whether Joab is the one directing this appeal.\n\n🖐 Hand means active involvement\n\n🪖 Joab is suspected\n\n🗣 David sees the plan behind the speech\n\nThe phrase shows David tracing the story back to its real source."],
    ["To Fetch About This Form of Speech Hath Thy Servant Joab Done This Thing", "Fetch about means to turn the matter around indirectly. Joab has arranged this form of speech so David will judge his own situation through a parable-like case.\n\n🔄 The issue is approached indirectly\n\n🗣 The speech is crafted on purpose\n\n🪖 Joab planned the strategy\n\nThe phrase explains the clever method Joab used."],
    ["My Lord Is Wise", "The woman flatters David by saying he is wise enough to understand everything before him. My lord is a respectful title for the king.\n\n👑 Respectful royal address\n\n🧠 David's discernment is praised\n\n🗣 She acknowledges he understood\n\nThe phrase closes her defense by affirming David's insight."],
  ],
  "2 Samuel 14:25-30": [
    ["But in All Israel There Was None to Be So Much Praised as Absalom for His Beauty", "Absalom is being described as the most admired man in Israel for physical beauty. Praised here means publicly admired and spoken of with approval.\n\n✨ Absalom is widely admired\n\n👥 All Israel notices him\n\n⚠️ Outer beauty adds to his influence\n\nThe phrase shows the powerful appeal of Absalom's appearance."],
    ["From the Sole of His Foot Even to the Crown of His Head There Was No Blemish in Him", "From the sole of his foot to the crown of his head means from bottom to top. No blemish means no visible defect, so the verse stresses his complete physical attractiveness.\n\n👣 From foot to head\n\n✨ No visible flaw is noted\n\n📖 The description is total\n\nThe phrase explains why Absalom stood out so strongly to people."],
    ["When He Polled His Head", "Polled means cut or trimmed his hair. The phrase is not about voting; it is about Absalom cutting his heavy hair.\n\n✂️ Polled means cut\n\n💇 Hair is the focus\n\n📖 An old word is being explained\n\nThe phrase helps a new reader understand the action clearly."],
    ["For It Was at Every Year’s End That He Polled It", "Absalom cut his hair yearly because it became heavy. The verse is giving a regular pattern, not a one-time detail.\n\n📅 It happened every year\n\n💇 The hair kept growing heavy\n\n📖 The detail is repeated to emphasize it\n\nThe phrase shows how notable this feature was in Absalom's life."],
  ],
  "2 Samuel 14:31-33": [
    ["Then Joab Arose", "Joab finally gets up and goes to Absalom after Absalom forces the issue by burning his field. The phrase marks Joab's reluctant response.\n\n🚶 Joab goes at last\n\n🔥 Pressure has worked\n\n⚠️ The tension now moves into conversation\n\nThe phrase shows Joab responding after being forced to act."],
    ["Came to Absalom unto His House", "Joab comes to Absalom's house, meaning he goes to his residence to face him directly. The setting is personal and confrontational.\n\n🏠 The meeting is at Absalom's house\n\n🗣 They will speak face to face\n\n⚠️ Personal tension is high\n\nThe phrase places the confrontation in Absalom's own space."],
    ["Absalom Answered Joab", "Absalom now explains why he acted so aggressively. The phrase opens his defense of sending for Joab and then burning the field.\n\n🗣 Absalom gives his reason\n\n🔥 His earlier action is addressed\n\n⚠️ He is pressing for resolution\n\nThe phrase introduces Absalom's justification."],
    ["I Sent unto Thee", "Absalom reminds Joab that he had already sent messages asking him to come. He is saying the destructive act happened after being ignored.\n\n📨 Messages had been sent first\n\n⚠️ Being ignored led to escalation\n\n🗣 Absalom makes his case\n\nThe phrase explains the complaint behind his anger."],
  ],
  "2 Samuel 15:1-6": [
    ["It Came to Pass After This", "The phrase opens the next stage of trouble after Absalom's return. What follows is not healing in David's house, but a slow rebellion.\n\n🕰 A new stage begins\n\n🏠 Family trouble deepens\n\n⚠️ Rebellion is forming\n\nThe phrase introduces the rise of Absalom's campaign."],
    ["That Absalom Prepared Him Chariots", "Absalom obtains chariots, horses, and runners to create a royal public image. He is making himself look like a king before he openly claims the throne.\n\n👑 A kingly image is staged\n\n🐎 Power is displayed\n\n🎭 Appearance is part of the strategy\n\nThe phrase shows Absalom building influence through spectacle."],
    ["Absalom Rose Up Early", "Absalom gets up early so he can meet people before the day's business is settled. The phrase shows deliberate effort, not accidental popularity.\n\n🌅 He starts early on purpose\n\n🎯 He is working for influence\n\n👥 He wants first access to the people\n\nThe phrase shows how intentional his campaign is."],
    ["Stood Beside the Way of the Gate", "The city gate was the place where people brought legal matters and public business. By standing there, Absalom places himself where he can intercept those seeking justice.\n\n🚪 The gate is a public court place\n\n👥 People pass there with cases\n\n🎯 Absalom positions himself strategically\n\nThe phrase shows him putting himself where influence can be gained."],
  ],
  "2 Samuel 15:7-12": [
    ["It Came to Pass After Forty Years", "The verse marks a long interval before Absalom asks to go to Hebron. The phrase serves as the story's time marker for the beginning of his open move.\n\n📅 Time has passed\n\n🎯 A decisive move is starting\n\n📜 The narrative is shifting again\n\nThe phrase opens the next phase of Absalom's plan."],
    ["That Absalom Said unto the King", "Absalom asks David for permission as though his purpose were innocent. He is still speaking with outward respect while hiding rebellion.\n\n🗣 Absalom addresses David\n\n🎭 Respectful speech hides treachery\n\n👑 The king is being deceived\n\nThe phrase shows rebellion beginning under a polite request."],
    ["For Thy Servant Vowed a Vow While I Abode at Geshur in Syria", "Absalom claims he made a vow while living in Geshur during exile. A vow is a solemn promise made before God, and he uses this religious reason to cover his political plan.\n\n🙏 A vow is claimed\n\n🌍 Geshur recalls his exile\n\n🎭 Religion is being used as cover\n\nThe phrase shows deceit wrapped in worship language."],
    ["If the LORD Shall Bring Me Again Indeed to Jerusalem", "Absalom says that if the LORD brought him back, he would serve the LORD. The words sound pious, but in context they are part of the disguise for his conspiracy.\n\n🙏 The LORD is named\n\n🏙 Jerusalem is the place of return\n\n🎭 Devout words hide another purpose\n\nThe phrase shows holy language being used to conceal ambition."],
  ],
  "2 Samuel 15:13-18": [
    ["There Came a Messenger to David", "A messenger brings David the news that the nation is turning toward Absalom. The phrase marks the moment the rebellion becomes undeniable.\n\n🏃 News arrives quickly\n\n👑 David is informed\n\n⚠️ The crisis is now open\n\nThe phrase opens the urgent response to the uprising."],
    ["The Hearts of the Men of Israel Are After Absalom", "Their hearts being after Absalom means their loyalty and affection have shifted toward him. Heart here includes will, desire, and allegiance.\n\n❤️ Loyalty has moved\n\n👥 The people are turning\n\n⚠️ The kingdom is slipping away\n\nThe phrase explains that Absalom has won inner allegiance, not just outward attention."],
    ["David Said unto All His Servants That Were with Him at Jerusalem", "David speaks to the servants who are still with him in Jerusalem, the capital city he must now leave. The phrase gathers his loyal household for a crisis decision.\n\n👑 David addresses his loyal servants\n\n🏙 Jerusalem is in danger\n\n⚠️ A decision must be made quickly\n\nThe phrase shows the king gathering those who remain faithful."],
    ["Let Us Flee", "David decides they must run rather than fight inside Jerusalem. Flee means escape quickly to avoid destruction and to keep the city from becoming a battlefield.\n\n🏃 Escape is chosen\n\n🏙 Jerusalem is spared immediate war\n\n⚠️ The king is in retreat\n\nThe phrase shows David choosing flight over ruining the city."],
  ],
  "2 Samuel 15:19-24": [
    ["Then Said the King to Ittai the Gittite", "David speaks to Ittai, a foreigner from Gath who has attached himself to David. The phrase matters because it sets up a striking display of loyalty from an outsider.\n\n👑 David addresses Ittai\n\n🌍 Ittai is a foreigner\n\n🤝 Loyalty will be tested\n\nThe phrase opens a scene where faithfulness comes from an unexpected place."],
    ["Wherefore Goest Thou Also with Us", "Wherefore means why. David is asking why Ittai should share the hardship and uncertainty of exile with him.\n\n❓ David asks why\n\n🏃 Exile is in view\n\n🤝 Ittai's loyalty is being examined\n\nThe phrase shows David giving him a chance to leave."],
    ["Whereas Thou Camest but Yesterday", "David reminds Ittai that he is a recent arrival and has not been bound to David for long. The words stress how little obligation Ittai would seem to have.\n\n🕰 Ittai is new among them\n\n🌍 He has only recently arrived\n\n🕊 He could leave without shame\n\nThe phrase highlights how voluntary his loyalty would be."],
    ["Should I This Day Make Thee Go Up", "David does not want to drag Ittai into a wandering exile against his will. Go up here means go along with the king on this difficult flight.\n\n🏃 The road ahead is uncertain\n\n🤝 David does not force loyalty\n\n🕊 Freedom to stay or leave is offered\n\nThe phrase shows David's fairness toward a foreign follower."],
  ],
  "2 Samuel 15:25-30": [
    ["The King Said unto Zadok", "David now speaks to Zadok the priest about the ark. The phrase matters because David's crisis is forcing him to think about God's presence and God's will.\n\n👑 David addresses the priest\n\n📦 The ark is in view\n\n🙏 Kingship is being humbled\n\nThe phrase opens one of David's most submissive responses in the chapter."],
    ["Carry Back the Ark of God into the City", "David tells Zadok to return the ark to Jerusalem. He will not use the ark like a lucky object to guarantee his own success.\n\n📦 The ark goes back\n\n🏙 Jerusalem keeps it\n\n🙏 God's presence is not a tool for David\n\nThe phrase shows reverence instead of superstition."],
    ["But If He Thus Say", "David is imagining the possibility that God may reject him. Thus say means 'speak in this way' or declare this verdict.\n\n❓ David considers a hard outcome\n\n🙏 God has the right to decide\n\n⚠️ The king is submitting to God's verdict\n\nThe phrase shows David preparing his heart for either answer."],
    ["I Have No Delight in Thee", "Delight means favor or pleasure. David is saying that if God no longer takes pleasure in him, he must accept that judgment.\n\n💔 Loss of divine favor is possible\n\n🙏 David yields to God's choice\n\n⚖️ The king submits himself\n\nThe phrase shows humble surrender under God's authority."],
  ],
  "2 Samuel 15:31-36": [
    ["One Told David", "Someone brings David another piece of urgent news during the flight. The message matters because it names a dangerous ally now standing with Absalom.\n\n🏃 News reaches David\n\n👑 The king must react quickly\n\n⚠️ The rebellion grows more serious\n\nThe phrase introduces a report that changes the danger level."],
    ["Ahithophel Is Among the Conspirators with Absalom", "Ahithophel is not just another follower; he is a valued counselor. The phrase means Absalom has gained the support of a man whose advice carries great weight.\n\n🧠 A powerful counselor has switched sides\n\n🤝 Absalom gains strategic help\n\n⚠️ The rebellion becomes more dangerous\n\nThe phrase shows why this report alarms David so much."],
    ["It Came to Pass", "The words mark the next step as David reaches the top of the mount. The story keeps moving through the crisis moment by moment.\n\n🕰 Another moment arrives\n\n🏃 David is still in flight\n\n📜 The crisis continues unfolding\n\nThe phrase moves the scene to David's next response."],
    ["That When David Was Come to the Top of the Mount", "David reaches the top of the mount where worship had been offered. The location matters because his grief and his prayer meet there.\n\n⛰ David reaches the height\n\n🙏 Worship is associated with the place\n\n💔 Sorrow and prayer come together\n\nThe phrase places David at a meaningful stopping point in the escape."],
  ],
  "2 Samuel 15:37": [
    ["So Hushai David’s Friend Came into the City", "Hushai, called David's friend, enters Jerusalem as part of the plan to counter Absalom's counsel. Friend here points to loyal court support, not casual companionship.\n\n🤝 Hushai is a loyal ally\n\n🏙 He goes into the city intentionally\n\n🎯 A counter-plan is underway\n\nThe phrase shows loyalty taking a strategic form."],
    ["Absalom Came into Jerusalem", "Absalom enters Jerusalem, the royal city, showing that the rebellion has reached the center of the kingdom. He is no longer plotting from a distance.\n\n🏙 Absalom takes the city center\n\n👑 The capital is now in rebel hands\n\n⚠️ The threat has fully arrived\n\nThe phrase marks the rebellion's occupation of Jerusalem."],
    ["Hushai David’s Friend Came into the City, and", "The repeated wording keeps Hushai's mission in front of the reader. He is entering the city at the same moment Absalom is, which sets up the conflict of counsel ahead.\n\n📜 Hushai's arrival is emphasized\n\n🤝 He goes in as David's loyal man\n\n⚔️ Two sides are converging in one city\n\nThe phrase highlights the timing of Hushai's entry."],
    ["David’s Friend Came into the City, and Absalom", "The line places David's loyal friend and the rebel son inside the same city at the same time. Jerusalem is becoming the place where hidden strategy and open rebellion will collide.\n\n🏙 Both men are now in Jerusalem\n\n🤝 One serves David\n\n⚔️ The contest is moving inside the city\n\nThe phrase sets up the struggle that will unfold through counsel and loyalty."],
  ],
};

function rewriteDay79SecondSamuelSection(section: RoyalPhraseSectionInput): RoyalPhraseSectionInput {
  const overrides = DAY_79_SECOND_SAMUEL_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const DAY_80_SECOND_SAMUEL_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "2 Samuel 16:1-6": [
    ["When David Was a Little Past the Top of the Hill", "David has only gone a little beyond the hilltop when this meeting happens. The phrase places the scene early in his flight, while he is still leaving Jerusalem under pressure.\n\n⛰ David is still near the top\n\n🏃 The escape is fresh\n\n⚠️ Trouble keeps meeting him on the road\n\nThe phrase helps the reader picture how quickly new encounters come during David's exile."],
    ["Ziba the Servant of Mephibosheth Met Him", "Ziba is Mephibosheth's servant, and he comes out to meet David with supplies. The phrase matters because this meeting will shape how David thinks about Mephibosheth.\n\n👤 Ziba is identified\n\n🤝 He meets David on the road\n\n⚠️ His words will influence the king\n\nThe phrase introduces a servant whose report will affect royal judgment."],
    ["The King Said unto Ziba", "David asks Ziba about the animals and provisions he has brought. The phrase opens the conversation that explains why Ziba has come.\n\n👑 David speaks first\n\n❓ The supplies need explaining\n\n🗣 The king is seeking clarity\n\nThe phrase marks the start of David's questioning."],
    ["What Meanest Thou by These", "David is asking what these donkeys, bread, and other supplies are for. Meanest means 'what do you intend by this' or 'what is the purpose of these things.'\n\n❓ What are these for?\n\n📦 The gifts need interpretation\n\n🧠 David wants the reason behind them\n\nThe phrase shows David trying to understand the meaning of the gesture."],
  ],
  "2 Samuel 16:7-12": [
    ["Thus Said Shimei When He Cursed", "Shimei is hurling insults and curses at David as he passes. Cursed here means he is calling down evil and speaking hateful accusations against the king.\n\n🗣 Shimei is insulting David\n\n⚠️ The words are hostile\n\n👑 The king is publicly shamed\n\nThe phrase shows the bitterness being poured out against David."],
    ["Thou Bloody Man", "Shimei calls David a bloody man, meaning a man marked by bloodshed and guilt. He is accusing David of being responsible for violence and judgment.\n\n🩸 Blood guilt is being charged\n\n🗣 The insult is severe\n\n⚖️ David is being accused publicly\n\nThe phrase shows how Shimei interprets David's fall."],
    ["The LORD Hath Returned Upon Thee All the Blood of the House of Saul", "Shimei claims that God is paying David back for bloodshed connected with Saul's house. Returned upon thee means the guilt has come back on David as punishment.\n\n🙏 God is said to be repaying David\n\n🩸 Saul's house is invoked\n\n⚠️ Shimei sees judgment in David's suffering\n\nThe phrase shows the accusation that David's troubles are divine payback."],
    ["In Whose Stead Thou Hast Reigned", "Shimei is saying David reigns in Saul's place on the throne. Stead means place, so the phrase points to royal succession.\n\n👑 David rules in Saul's place\n\n🏠 The old royal house is still in view\n\n🗣 The accusation is political as well as moral\n\nThe phrase explains how Shimei frames David's kingship."],
  ],
  "2 Samuel 16:13-18": [
    ["His Men Went by the Way", "David's men keep moving along the road while Shimei curses from the hillside. The phrase shows the king's party pressing forward instead of stopping for revenge.\n\n🚶 The group keeps moving\n\n⛰ The journey continues under insult\n\n🕊 Restraint is being practiced\n\nThe phrase shows David choosing progress over retaliation."],
    ["Shimei Went Along on the Hill’s Side Over Against Him", "Shimei walks along the hillside opposite David, keeping pace so he can continue cursing and throwing stones. Over against him means on the side facing him.\n\n⛰ Shimei stays opposite David\n\n🗣 The abuse continues step by step\n\n🪨 The hostility is persistent\n\nThe phrase helps the reader picture the scene unfolding alongside the road."],
    ["All the People That Were with Him", "This refers to the whole group traveling with David, not just a few leaders. The strain of exile and insult is being felt by everyone with him.\n\n👥 The whole company is involved\n\n🏃 They share the hardship\n\n⚠️ The king's fall affects many people\n\nThe phrase widens the scene from David alone to all who accompany him."],
    ["Refreshed Themselves There", "To refresh themselves means they stopped to rest and recover strength after the exhausting journey. The phrase gives a brief pause in a hard flight.\n\n💧 They recover strength\n\n🏕 A pause is taken\n\n😮 The journey has been draining\n\nThe phrase shows the human need for rest in the middle of crisis."],
  ],
  "2 Samuel 16:19-23": [
    ["Whom Should I Serve", "Hushai is answering Absalom carefully, asking who he should serve if not the king's chosen successor. The phrase is clever because his words can sound loyal to Absalom while still being ambiguous.\n\n❓ Hushai answers with a question\n\n🧠 His speech is careful\n\n🎭 The wording hides deeper loyalty\n\nThe phrase shows Hushai speaking in a way that protects his mission."],
    ["Should I Not Serve in the Presence of His Son", "Hushai says he will serve before the son of the king just as he served before the father. In Absalom's ears it sounds like loyalty, but the sentence is crafted very carefully.\n\n👑 The king's son is acknowledged\n\n🗣 The words sound submissive\n\n🎭 Hushai is speaking with deliberate double meaning\n\nThe phrase shows how diplomacy can work through guarded language."],
    ["Then Said Absalom to Ahithophel", "Absalom now turns to Ahithophel for advice. The phrase matters because Ahithophel's counsel is treated as weighty and politically dangerous.\n\n👑 Absalom asks for counsel\n\n🧠 Ahithophel is the strategist\n\n⚠️ The next move will shape the rebellion\n\nThe phrase opens a key advisory moment in the revolt."],
    ["Give Counsel Among You What We Shall Do", "Absalom is asking his advisers what course of action they recommend. Give counsel means offer strategic advice, not merely casual opinion.\n\n🗣 Advice is being requested\n\n🧠 Strategy is needed\n\n👥 The leadership circle must decide\n\nThe phrase shows the rebellion moving from emotion to planning."],
  ],
  "2 Samuel 17:1-6": [
    ["Moreover Ahithophel Said unto Absalom", "Ahithophel continues speaking and offers Absalom a concrete military plan. The phrase marks the move from general advice into a specific strategy.\n\n🗣 Ahithophel keeps speaking\n\n🧠 The plan becomes practical\n\n⚔️ Military action is being proposed\n\nThe phrase opens one of the most dangerous counsels David will face."],
    ["Let Me Now Choose Out Twelve Thousand Men", "Ahithophel wants permission to select a strike force of twelve thousand men. The number shows a strong but focused attack, not the gathering of the whole nation.\n\n👥 A chosen force is requested\n\n🔢 Twelve thousand is a major strike group\n\n🎯 The plan is swift attack\n\nThe phrase shows Ahithophel aiming for speed and precision."],
    ["I Will Come Upon Him While He Is Weary", "Ahithophel wants to attack David when he is tired and weakened from fleeing. The strategy depends on striking at the moment of exhaustion.\n\n🏃 David is weary in flight\n\n⚔️ Timing is part of the plan\n\n🎯 Weakness is being targeted\n\nThe phrase shows the ruthless logic behind the counsel."],
    ["Will Make Him Afraid", "Ahithophel expects David to panic under sudden attack. Make him afraid means throw him into fear so his followers scatter.\n\n😨 Fear is the tactic\n\n👥 Panic could break the group\n\n⚔️ The goal is collapse, not just battle\n\nThe phrase shows that terror is part of the planned victory."],
  ],
  "2 Samuel 17:7-12": [
    ["Hushai Said unto Absalom", "Hushai now answers Absalom and begins working against Ahithophel's plan. The phrase matters because David's friend is using counsel as a weapon.\n\n🗣 Hushai replies\n\n🤝 He is secretly serving David\n\n🧠 The battle is now partly verbal\n\nThe phrase opens Hushai's attempt to turn the rebellion's strategy."],
    ["The Counsel That Ahithophel Hath Given Is Not Good at This Time", "Hushai does not say Ahithophel is always wrong, but that this advice is not good right now. At this time means the present situation makes the plan unsuitable.\n\n🧠 The advice is challenged\n\n⏰ Timing is the issue\n\n⚠️ A better-sounding option is being prepared\n\nThe phrase shows Hushai weakening trust in the first plan."],
    ["Thou Knowest Thy Father", "Hushai reminds Absalom that David is experienced and dangerous. The phrase appeals to what Absalom already knows about his father's strength.\n\n👑 David's character is invoked\n\n🧠 Absalom is urged to remember reality\n\n⚔️ David is no easy target\n\nThe phrase uses David's reputation to discourage a quick attack."],
    ["That They Be Mighty Men", "Hushai says David's men are mighty men, meaning strong, proven warriors. He wants Absalom to fear facing them carelessly.\n\n💪 They are battle-tested warriors\n\n⚔️ David's side is dangerous\n\n😨 Hushai is increasing caution\n\nThe phrase explains why Absalom should not expect an easy victory."],
  ],
  "2 Samuel 17:13-18": [
    ["If He Be Gotten into a City", "Hushai imagines the case where David takes refuge inside a city. Gotten into a city means he has withdrawn into a defended place.\n\n🏙 A fortified refuge is imagined\n\n🏃 David could take shelter there\n\n🧠 Hushai is building a dramatic scenario\n\nThe phrase helps his alternative plan sound thorough and overwhelming."],
    ["Then Shall All Israel Bring Ropes to That City", "Hushai paints a huge exaggerated picture of all Israel dragging the city down with ropes. The image is meant to make Absalom feel the power of gathering the whole nation.\n\n🪢 Ropes create a dramatic image\n\n👥 All Israel is invoked\n\n🎭 The picture is persuasive rhetoric\n\nThe phrase shows Hushai using vivid language to sell his counsel."],
    ["All the Men of Israel Said", "The leaders or gathered men of Israel respond together in favor of Hushai's plan. The phrase shows a collective decision, not one private opinion.\n\n👥 The group gives its judgment\n\n🗣 A public decision is forming\n\n⚖️ Counsel is being weighed and chosen\n\nThe phrase marks the moment the advice is officially received."],
    ["The Counsel of Hushai the Archite Is Better Than the Counsel of Ahithophel", "They judge Hushai's advice to be better than Ahithophel's. Better here means more persuasive or preferable, even though Ahithophel's plan was actually sharper militarily.\n\n⚖️ Hushai's plan wins\n\n🧠 The wiser-seeming speech prevails\n\n🙏 God is working through the decision\n\nThe phrase marks the turning point where David gains hidden help."],
  ],
  "2 Samuel 17:19-24": [
    ["The Woman Took", "A woman acts quickly to hide the messengers. The phrase matters because unnamed helpers now become crucial to David's survival.\n\n👩 A woman takes action\n\n⚠️ Secrecy is urgent\n\n🤝 Small acts are saving larger lives\n\nThe phrase introduces a quiet but decisive intervention."],
    ["Spread a Covering Over the Well’s Mouth", "She covers the opening of the well so the men hidden inside cannot be seen. The phrase describes the practical trick used to conceal them.\n\n🕳 The well is hidden\n\n🧺 A covering disguises it\n\n🕵️ The concealment is intentional\n\nThe phrase shows how the escape depends on clever hiding."],
    ["When Absalom’s Servants Came to the Woman to the House", "Absalom's men arrive at the woman's house searching for the messengers. The phrase raises the tension because the hiding place is about to be tested.\n\n🏠 The search comes to the house\n\n⚠️ The danger is immediate\n\n🕵️ The pursuers are close\n\nThe phrase brings the threat right to the door."],
    ["Where Is Ahimaaz", "The servants ask for Ahimaaz by name, showing they know exactly whom they are hunting. The question makes the search direct and focused.\n\n❓ A named search begins\n\n👤 Ahimaaz is the target\n\n⚠️ Discovery seems near\n\nThe phrase shows how specific the pursuit has become."],
  ],
  "2 Samuel 17:25-29": [
    ["Absalom Made Amasa Captain of the Host Instead of Joab", "Absalom appoints Amasa as commander of the army in Joab's place. Captain of the host means head of the military force.\n\n🪖 A new army commander is appointed\n\n👑 Absalom is acting like king\n\n⚔️ Leadership of the war shifts\n\nThe phrase shows the rebellion setting up its own military structure."],
    ["Which Amasa Was a Man’s Son", "The verse pauses to identify Amasa's family line. These details matter because family ties explain how people are connected within the civil conflict.\n\n👤 Amasa's background is given\n\n🧬 Family lines matter in the story\n\n📖 Identity helps explain loyalties\n\nThe phrase introduces the man with proper family context."],
    ["Absalom Pitched in the Land of Gilead", "Pitched means set up camp. Absalom is encamped in Gilead, positioning his forces for the coming battle.\n\n🏕 The army camps in Gilead\n\n⚔️ War is approaching\n\n🌍 The conflict has moved eastward\n\nThe phrase places the rebellion's army on the map."],
    ["So Israel and Absalom Pitched", "Israel here means the forces following Absalom. The phrase shows that Absalom's cause has drawn a national army into camp with him.\n\n👥 The rebel forces are assembled\n\n🏕 They camp together\n\n⚠️ The nation is split in arms\n\nThe phrase shows how broad the rebellion has become."],
  ],
  "2 Samuel 18:1-6": [
    ["David Numbered the People That Were with Him", "David counts the people who remain with him so he can organize them for battle. Numbered means mustered and arranged, not just casually counted.\n\n👥 The loyal force is assessed\n\n⚔️ Battle preparation begins\n\n👑 David is organizing resistance\n\nThe phrase shows the king turning from flight to military order."],
    ["Set Captains of Thousands", "David appoints commanders over large military groups. Captains of thousands are leaders responsible for major divisions of the army.\n\n🪖 Officers are appointed\n\n🔢 The troops are divided into units\n\n⚔️ Order replaces panic\n\nThe phrase shows structured leadership being established."],
    ["David Sent Forth a Third Part of the People Under the Hand of Joab", "David divides the army and sends one third under Joab's command. Under the hand of Joab means under his leadership and control.\n\n👥 One division goes with Joab\n\n🪖 Joab commands it\n\n⚔️ The army is carefully split\n\nThe phrase shows David arranging the battle through trusted commanders."],
    ["A Third Part Under the Hand of Abishai the Son of Zeruiah", "Another third is placed under Abishai, Joab's brother. The phrase shows more than one trusted military leader sharing command.\n\n👥 Another division is assigned\n\n🪖 Abishai leads it\n\n🏠 Family ties are part of David's command structure\n\nThe phrase continues the picture of ordered military deployment."],
  ],
  "2 Samuel 18:7-12": [
    ["Where the People of Israel Were Slain Before the Servants of David", "David's forces defeat the Israelite rebels in battle. Slain before means they were struck down by David's men in open conflict.\n\n⚔️ The rebels are defeated\n\n👥 David's servants prevail\n\n💔 Israelites are falling against Israelites\n\nThe phrase shows the tragedy of civil war within the nation."],
    ["There Was There a Great Slaughter That Day of Twenty Thousand Men", "A great slaughter means a very large number were killed, and the verse gives the count as twenty thousand. The phrase stresses how devastating the battle was.\n\n🔢 Twenty thousand die\n\n⚔️ The defeat is enormous\n\n💔 The war is terribly costly\n\nThe phrase makes the scale of the bloodshed unmistakable."],
    ["For the Battle Was There Scattered Over the Face of All the Country", "The fight spread across a wide area instead of staying in one tight line. Scattered over the face of all the country means the battle was dispersed throughout the terrain.\n\n🌍 The fighting spreads wide\n\n⚔️ The field is broken and uneven\n\n🧭 The land shapes the battle\n\nThe phrase helps the reader picture a chaotic, sprawling conflict."],
    ["The Wood Devoured More People That Day Than the Sword Devoured", "The forest caused more deaths than direct fighting did, likely through pits, confusion, and rough terrain. Devoured is vivid language meaning the wood swallowed up lives through the environment itself.\n\n🌲 The forest becomes deadly\n\n⚔️ Nature kills more than blades\n\n📖 Devoured is strong picture language\n\nThe phrase shows the battlefield itself turning against the rebels."],
  ],
  "2 Samuel 18:13-18": [
    ["Otherwise I Should Have Wrought Falsehood Against Mine Own Life", "The soldier means he would have acted deceitfully and dangerously against himself if he had killed Absalom. Falsehood against mine own life means bringing guilt and ruin on himself.\n\n⚖️ Killing Absalom would endanger him too\n\n🧠 He knows the king's wishes\n\n🚫 He refuses to take that risk\n\nThe phrase shows why the soldier held back despite the reward."],
    ["For There Is No Matter Hid from the King", "The soldier says nothing stays hidden from David for long. Matter here means event or action, so the phrase means the king would certainly find out.\n\n👑 The king would learn the truth\n\n🧠 Secrets do not stay secret\n\n⚠️ The soldier expects accountability\n\nThe phrase explains why he fears acting against David's order."],
    ["Then Said Joab", "Joab responds impatiently after hearing the soldier's explanation. The phrase opens the moment where Joab takes matters into his own hands.\n\n🗣 Joab answers sharply\n\n⚠️ He will not wait longer\n\n🪖 Command frustration is showing\n\nThe phrase marks the shift from report to brutal action."],
    ["I May Not Tarry Thus with Thee", "Joab means he cannot stand there wasting time talking. Tarry means stay or delay.\n\n⏳ Joab refuses delay\n\n🗣 Conversation is over for him\n\n⚔️ He is about to act himself\n\nThe phrase shows Joab's impatient determination."],
  ],
  "2 Samuel 18:19-24": [
    ["Then Said Ahimaaz the Son of Zadok", "Ahimaaz wants permission to run with the news to David. The phrase introduces the eager messenger who wants to carry tidings to the king.\n\n🏃 Ahimaaz steps forward\n\n🗣 He wants to bear the news\n\n👑 The message is for David\n\nThe phrase opens the question of who should report the battle."],
    ["Let Me Now Run", "Ahimaaz is asking to go quickly as the messenger. The request shows urgency and a personal desire to be the one who tells the king.\n\n🏃 He wants to run at once\n\n📨 The message feels urgent\n\n🧠 He wants the responsibility himself\n\nThe phrase shows eagerness to carry the news."],
    ["Joab Said unto Him", "Joab answers Ahimaaz and restrains him. The phrase matters because Joab knows the news includes Absalom's death and will not be received as simple victory.\n\n🗣 Joab replies\n\n⚠️ He is controlling the report\n\n👑 The king's reaction is in view\n\nThe phrase opens Joab's judgment about the messenger."],
    ["Thou Shalt Not Bear Tidings This Day", "Bear tidings means deliver the news. Joab tells Ahimaaz he will not be the messenger today because the content of the report is too painful.\n\n📨 He may not carry the news\n\n💔 The message is dangerous to deliver\n\n⚠️ This is not an ordinary victory report\n\nThe phrase shows Joab shielding him from the hardest announcement."],
  ],
  "2 Samuel 18:25-30": [
    ["The Watchman Cried", "The watchman calls out when he sees a runner approaching the city. His job is to observe from a distance and announce what he sees.\n\n👀 A lookout spots movement\n\n🗣 He calls down the news\n\n🏙 The city waits for word\n\nThe phrase brings the suspense of approaching messengers into the scene."],
    ["Told the King", "The watchman reports what he sees directly to David. The phrase keeps the king at the center of the waiting and uncertainty.\n\n👑 David receives updates\n\n👀 The news comes piece by piece\n\n⏳ The suspense continues\n\nThe phrase shows the king hearing events from afar before the messenger arrives."],
    ["The Watchman Saw Another Man Running", "A second runner appears behind the first. The phrase suggests the message is important and coming through more than one messenger.\n\n🏃 A second runner is seen\n\n👀 The report grows more complex\n\n📨 More news is coming\n\nThe phrase increases the tension before the message is spoken."],
    ["The Watchman Called unto the Porter", "The watchman tells the gatekeeper what he sees so the arrival can be announced properly. Porter means the one responsible for the gate.\n\n🚪 The gatekeeper is notified\n\n🗣 The chain of reporting continues\n\n🏙 The city prepares for the messengers\n\nThe phrase shows how news travels through ordered roles."],
  ],
  "2 Samuel 18:31-33": [
    ["My Lord the King", "This is a respectful way for the messenger to address David. It recognizes David's royal authority even while bringing painful news.\n\n👑 Royal honor is acknowledged\n\n🗣 The messenger speaks carefully\n\n⚠️ Hard news is being delivered respectfully\n\nThe phrase sets the tone for a tense report."],
    ["For the LORD Hath Avenged Thee This Day of All Them That Rose Up Against Thee", "The messenger says God has given David justice against those who rebelled against him. Avenged thee means God has acted against David's enemies on his behalf.\n\n🙏 God is credited with the outcome\n\n⚔️ The rebels are defeated\n\n👑 David is said to be vindicated\n\nThe phrase frames the victory as divine justice."],
    ["The King Said unto Cushi", "David asks the Cushite messenger the question that matters most to him. The phrase shows that the king's heart is fixed on Absalom, not on military success.\n\n👑 David questions the messenger\n\n💔 His concern is personal\n\n⚔️ Victory is not his first thought\n\nThe phrase redirects the scene from triumph to fatherly fear."],
    ["Is the Young Man Absalom Safe", "David is asking whether his son Absalom is alive and unharmed. Calling him the young man shows tender fatherly concern even though Absalom is the rebel leader.\n\n💔 David asks as a father\n\n👦 Absalom is still his son to him\n\n❓ Safety matters more than victory\n\nThe phrase reveals David's heart in the middle of political disaster."],
  ],
  "2 Samuel 19:1-6": [
    ["It Was Told Joab", "Joab receives word that David is weeping instead of rejoicing after the battle. The phrase opens the tension between the king's personal grief and the army's public victory.\n\n🗣 Joab is informed\n\n💔 David's grief is central\n\n⚔️ Victory is being overshadowed\n\nThe phrase begins the conflict between sorrow and public duty."],
    ["The King Weepeth", "David is crying openly for Absalom. Weepeth means he is actively mourning, not quietly saddened.\n\n😢 David is openly grieving\n\n👑 The king is overwhelmed as a father\n\n💔 Absalom's death dominates the moment\n\nThe phrase makes the king's sorrow unmistakable."],
    ["The Victory That Day Was Turned into Mourning unto All the People", "Instead of celebrating, the people feel the day turn into grief because they see the king mourning. The mood of the whole army changes because of David's sorrow.\n\n⚔️ Victory loses its joy\n\n😢 Mourning spreads through the people\n\n👑 The king's grief shapes the nation\n\nThe phrase shows public triumph being swallowed by private loss."],
    ["For the People Heard Say That Day How the King Was Grieved for His Son", "The soldiers hear repeated reports that David is grieving over Absalom. Grieved for his son means the king's heart is fixed on his lost child.\n\n👂 The army hears of David's grief\n\n💔 The sorrow is specifically for Absalom\n\n⚠️ Their return now feels uneasy\n\nThe phrase explains why the people feel ashamed instead of honored."],
  ],
  "2 Samuel 19:7-12": [
    ["Now Therefore Arise", "Joab urges David to get up and act instead of remaining hidden in grief. Arise here is a call to step back into public kingship.\n\n🚶 David must get up\n\n👑 Public duty is calling\n\n⚠️ Joab sees a crisis in delay\n\nThe phrase is a blunt summons back to leadership."],
    ["Speak Comfortably unto Thy Servants", "Speak comfortably means speak kindly and reassuringly. Joab wants David to encourage the men who risked their lives for him.\n\n🗣 Kind words are needed\n\n👥 The servants need reassurance\n\n🤝 Loyalty must be honored\n\nThe phrase shows what Joab thinks the king owes his followers."],
    ["Then the King Arose", "David responds by getting up and taking his public place again. The phrase shows grief yielding, at least outwardly, to royal responsibility.\n\n🚶 David gets up\n\n👑 The king returns to duty\n\n⚖️ Public action resumes\n\nThe phrase marks the first outward recovery of kingship."],
    ["Sat in the Gate", "The gate is the public place of rule, judgment, and visible leadership. By sitting there, David shows himself again as king before the people.\n\n🚪 The public seat of rule is occupied\n\n👑 David appears before the people\n\n📖 Leadership becomes visible again\n\nThe phrase shows David returning to his royal position."],
  ],
  "2 Samuel 19:13-18": [
    ["Say Ye to Amasa", "David sends a message to Amasa, Absalom's commander. The phrase matters because David is trying to heal division by winning over a former enemy leader.\n\n📨 Amasa receives a message\n\n🤝 Reconciliation is being attempted\n\n👑 David is acting politically and personally\n\nThe phrase opens a move to unite the kingdom after war."],
    ["Art Thou Not of My Bone", "This means 'are you not my own flesh and kin?' David is appealing to family connection with Amasa.\n\n🧬 Family bond is invoked\n\n🤝 Nearness is emphasized\n\n👑 David is drawing him back through kinship\n\nThe phrase shows David using shared blood to invite loyalty."],
    ["He Bowed the Heart of All the Men of Judah", "To bow the heart means to bend or win over their inner loyalty. The men of Judah become united in support of David.\n\n❤️ Their loyalty is turned back\n\n👥 Judah becomes one in response\n\n🤝 Hearts are won, not forced\n\nThe phrase shows inner allegiance being brought back to the king."],
    ["Even as the Heart of One Man", "This means the people respond with remarkable unity, as though they shared one heart. The phrase stresses collective agreement.\n\n👥 Strong unity is formed\n\n❤️ Many hearts act like one\n\n👑 David's return is welcomed together\n\nThe phrase shows how fully Judah rallies around him."],
  ],
  "2 Samuel 19:19-24": [
    ["Said unto the King", "Shimei now speaks directly to David after earlier cursing him. The phrase opens his plea for mercy in the king's presence.\n\n👑 Shimei addresses David directly\n\n🗣 The offender must now answer\n\n⚖️ Mercy is being sought\n\nThe phrase marks the beginning of a humble appeal."],
    ["Let Not My Lord Impute Iniquity unto Me", "Impute iniquity means count guilt against me. Shimei is begging David not to hold his wrongdoing to his account.\n\n🙏 He asks for pardon\n\n⚖️ Guilt is being acknowledged\n\n👑 David has power to punish or spare\n\nThe phrase shows a sinner asking not to have his sin charged against him."],
    ["For Thy Servant Doth Know That I Have Sinned", "Shimei admits he knows he has sinned. The phrase is a direct confession rather than an excuse.\n\n🙏 Sin is confessed\n\n🧠 He knows what he did was wrong\n\n⚖️ Mercy is sought through honesty\n\nThe phrase shows open acknowledgment of guilt."],
    ["I Am Come the First This Day of All the House of Joseph to Go Down to Meet My Lord the King", "Shimei arrives early from the northern tribes, called the house of Joseph here, to meet David. He wants his quick appearance to count in his favor.\n\n🏃 He comes first to meet the king\n\n👥 The northern tribes are represented\n\n🧠 He is trying to show urgency and submission\n\nThe phrase shows Shimei making haste to seek mercy."],
  ],
  "2 Samuel 19:25-30": [
    ["It Came to Pass", "The phrase moves the story to Mephibosheth's meeting with David after the king's return. Another unresolved relationship is now being addressed.\n\n🕰 The story moves to a new meeting\n\n👑 David is back\n\n⚖️ Earlier claims will be tested\n\nThe phrase opens the scene of explanation and judgment."],
    ["When He Was Come to Jerusalem to Meet the King", "Mephibosheth comes to Jerusalem to meet David after his return. The phrase places the encounter in the restored royal city.\n\n🏙 Jerusalem is the setting\n\n🤝 Mephibosheth comes to meet David\n\n⚖️ A personal case will be heard\n\nThe phrase situates the meeting at the center of the restored kingdom."],
    ["My Servant Deceived Me", "Mephibosheth says Ziba tricked him and misrepresented the situation. Deceived me means the servant acted dishonestly against his master.\n\n🎭 Ziba is accused of trickery\n\n👤 Mephibosheth claims betrayal\n\n⚖️ The earlier report is now challenged\n\nThe phrase shows the dispute over what really happened."],
    ["For Thy Servant Said", "Mephibosheth begins explaining what he had actually intended. The phrase opens his side of the story about why he did not go with David.\n\n🗣 He gives his own account\n\n⚖️ The matter is being clarified\n\n👑 David must now judge between reports\n\nThe phrase shows explanation following accusation."],
  ],
  "2 Samuel 19:31-36": [
    ["Barzillai the Gileadite Came Down from Rogelim", "Barzillai, an older supporter from Gilead, comes down from his town Rogelim to accompany David. The phrase introduces a faithful helper returning with the king.\n\n👤 Barzillai is named\n\n🌍 Rogelim is his home\n\n🤝 He comes in loyalty to David\n\nThe phrase introduces an honorable ally in David's restoration."],
    ["Went Over Jordan with the King", "Barzillai crosses the Jordan River alongside David. The act shows public loyalty at the moment of the king's return.\n\n🌊 The Jordan is crossed\n\n👑 He accompanies David personally\n\n🤝 Loyalty is visible in action\n\nThe phrase shows support expressed through presence and movement."],
    ["Now Barzillai Was a Very Aged Man", "The verse emphasizes Barzillai's advanced age. This detail matters because it explains his humility about what he can still do.\n\n👴 He is very old\n\n📖 Age shapes his response\n\n🧠 He knows his limits\n\nThe phrase prepares the reader for his modest request."],
    ["Even Fourscore Years Old", "Fourscore means eighty. The phrase gives Barzillai's exact age in older Bible wording.\n\n🔢 Fourscore means eighty\n\n👴 His old age is specific\n\n📖 The KJV number is being defined\n\nThe phrase helps a new reader understand the age being stated."],
  ],
  "2 Samuel 19:37-42": [
    ["Let Thy Servant", "Barzillai calls himself David's servant in humble speech. He is asking permission respectfully rather than demanding anything.\n\n🙇 Humble language is used\n\n👑 David is honored as king\n\n🗣 The request is gentle\n\nThe phrase sets the tone of Barzillai's modest appeal."],
    ["I Pray Thee", "I pray thee means 'please' or 'I ask you.' It is polite request language, not a prayer to God.\n\n🙏 It means 'please'\n\n🗣 The request is respectful\n\n📖 An old expression is being clarified\n\nThe phrase helps modern readers hear the tone correctly."],
    ["The King Answered", "David responds graciously to Barzillai's request. The phrase matters because it shows the king honoring faithful service with kindness.\n\n👑 David answers\n\n🤝 The faithful servant is heard\n\n🕊 The exchange is gracious\n\nThe phrase opens the king's favorable reply."],
    ["Chimham Shall Go Over with Me", "David says Chimham, likely Barzillai's son or younger relative, will cross over with him and receive the king's favor. Go over with me means join the royal return.\n\n👤 Chimham is chosen to go\n\n🌊 He will cross with David\n\n👑 Royal favor will pass to the younger man\n\nThe phrase shows honor being extended through the family."],
  ],
  "2 Samuel 19:43": [
    ["The Men of Israel Answered the Men of Judah", "The northern tribes answer Judah in a sharp dispute about the king's return. The phrase marks a growing division within the restored kingdom.\n\n👥 Two groups are arguing\n\n👑 The issue is access to the king\n\n⚠️ Unity is already fraying again\n\nThe phrase shows political tension surfacing after reconciliation."],
    ["We Have Ten Parts in the King", "The men of Israel mean they represent the larger number of tribes and therefore claim a greater share in the king. Parts here means portions or claims of participation.\n\n🔟 Ten tribes claim a larger share\n\n👥 Representation becomes the argument\n\n👑 The king is treated like a political possession\n\nThe phrase shows tribal rivalry speaking in numerical terms."],
    ["Men of Israel Answered the Men of Judah", "The repeated wording keeps the quarrel in view. Scripture is stressing the back-and-forth argument, not letting the tension pass quickly.\n\n📜 The dispute is repeated\n\n🗣 The answer grows sharper\n\n⚠️ Conflict among the tribes is intensifying\n\nThe phrase emphasizes the seriousness of the exchange."],
    ["Of Israel Answered the Men of Judah, and", "This shortened repeated line continues the same tribal argument. The wording keeps the reader's eye on the fracture that remains inside the kingdom.\n\n👥 Israel and Judah are still divided\n\n📜 The argument continues\n\n⚠️ Restoration is incomplete\n\nThe phrase shows that the kingdom's wounds are not fully healed."],
  ],
};

function rewriteDay80SecondSamuelSection(section: RoyalPhraseSectionInput): RoyalPhraseSectionInput {
  const overrides = DAY_80_SECOND_SAMUEL_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const DAY_81_SECOND_SAMUEL_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "2 Samuel 20:1-6": [
    ["There Happened to Be There a Man of Belial", "A man of Belial means a worthless, rebellious man. The phrase introduces Sheba as someone who will stir up division rather than peace.\n\n⚠️ A rebel is introduced\n\n🧠 Belial means wicked or worthless\n\n👥 Trouble is about to spread\n\nThe phrase warns the reader that this man will lead people away from the king."],
    ["Whose Name Was Sheba", "The rebel is named Sheba so the coming revolt is tied to a specific man. Scripture is identifying the one who becomes the center of the uprising.\n\n👤 The rebel is named\n\n📖 Responsibility is personal\n\n⚠️ The revolt now has a leader\n\nThe phrase makes sure the rebellion is attached to a real person, not a vague crowd."],
    ["So Every Man of Israel Went Up from After David", "The men of Israel stop following David and pull away from him. Went up from after David means they break their support and turn elsewhere.\n\n👥 People leave David\n\n🔁 Loyalty shifts away\n\n⚠️ The kingdom is splitting again\n\nThe phrase shows how quickly public allegiance can change."],
    ["Followed Sheba the Son of Bichri", "Instead of staying with David, they follow Sheba's leadership. The phrase marks the transfer of loyalty from the rightful king to a rebel.\n\n🏃 They go after Sheba\n\n👑 David is abandoned by many\n\n⚠️ A new revolt is underway\n\nThe phrase shows rebellion taking visible shape through followers."],
  ],
  "2 Samuel 20:7-12": [
    ["There Went Out After Him Joab’s Men", "Joab's soldiers go out to pursue Sheba and stop the rebellion. The phrase shows the king's side moving from alarm to military response.\n\n🪖 Joab's men march out\n\n🏃 The rebel is being pursued\n\n⚔️ The response becomes active\n\nThe phrase opens the chase against Sheba."],
    ["All the Mighty Men", "These are David's seasoned warriors, not just any soldiers. Mighty men means proven fighters of unusual courage and ability.\n\n💪 Elite warriors are included\n\n🪖 They are battle-tested men\n\n⚔️ The mission is serious\n\nThe phrase shows that strong fighters are involved in suppressing the revolt."],
    ["When They Were at the Great Stone Which Is in Gibeon", "The great stone at Gibeon is the place where the next turning point happens. Mentioning it anchors the scene in a real location on the road.\n\n🪨 A landmark marks the scene\n\n🏙 Gibeon is the setting\n\n📖 The confrontation is located clearly\n\nThe phrase helps the reader picture where the army pauses and events turn."],
    ["Amasa Went Before Them", "Amasa is moving in front of the troops as their appointed leader. The phrase matters because Joab is about to confront the man who replaced him.\n\n👤 Amasa is leading publicly\n\n🪖 He is in front of the army\n\n⚠️ Joab's rivalry is near the surface\n\nThe phrase sets up the dangerous meeting between the two commanders."],
  ],
  "2 Samuel 20:13-18": [
    ["When He Was Removed Out of the Highway", "Once Amasa's body is moved from the road, the army can continue forward. The phrase shows how the pursuit had been blocked by the shocking scene.\n\n🛣 The road is cleared\n\n⚠️ The death had stopped the troops\n\n🏃 The pursuit resumes\n\nThe phrase marks the grim moment when movement begins again."],
    ["All the People Went on After Joab", "The troops now rally behind Joab instead of Amasa. The phrase shows leadership shifting by force after Joab's violent act.\n\n👥 The army follows Joab\n\n🪖 Command has shifted\n\n⚠️ Joab retakes control\n\nThe phrase shows how power passes through action, not formal process."],
    ["He Went Through All the Tribes of Israel unto Abel", "Sheba moves through Israel until he reaches Abel, the city where he tries to hold out. The phrase tracks the rebel's path across the land.\n\n🌍 The revolt travels through Israel\n\n🏙 Abel becomes the refuge city\n\n🏃 Sheba keeps moving to survive\n\nThe phrase follows the rebellion to its final stronghold."],
    ["All the Berites", "The Berites are the people associated with Sheba's clan or region who gather with him. The phrase shows that he still has a group rallying around him.\n\n👥 Supporters gather with Sheba\n\n🧬 Clan ties still matter\n\n⚠️ The rebellion has local backing\n\nThe phrase explains that Sheba is not hiding alone."],
  ],
  "2 Samuel 20:19-24": [
    ["I Am One of Them That Are Peaceable", "The wise woman says her city is known for peace, not rebellion. Peaceable means inclined toward peace and order.\n\n🕊 Peace is their reputation\n\n🏙 The city is not claiming rebellion\n\n🗣 She speaks for the community\n\nThe phrase shows her trying to separate the city from Sheba's guilt."],
    ["Faithful in Israel", "Faithful in Israel means loyal and dependable within the covenant people. The woman is saying the city has long been a trustworthy part of Israel.\n\n🤝 Loyal history is claimed\n\n👥 The city belongs inside Israel faithfully\n\n⚖️ Their character is being defended\n\nThe phrase argues that Joab should not destroy a community with a good record."],
    ["Far Be It", "Far be it is a strong way of saying 'may it never be' or 'I would never do that.' Joab is denying that he wants to destroy the city for its own sake.\n\n🚫 Strong denial\n\n🗣 Joab rejects the accusation\n\n⚠️ He says the target is not the whole city\n\nThe phrase helps the reader hear Joab's emphatic refusal."],
    ["Far Be It from Me", "Joab repeats that destruction of the whole city is not his goal. The repetition makes his denial stronger and more personal.\n\n🚫 Joab denies it personally\n\n📜 The point is repeated for emphasis\n\n🎯 He claims to want only the rebel\n\nThe phrase narrows Joab's stated purpose to Sheba alone."],
  ],
  "2 Samuel 20:25-26": [
    ["Sheva Was Scribe", "A scribe was an official responsible for writing and records. The phrase lists Sheva as part of David's restored government structure.\n\n📜 A government writer is named\n\n🏛 The administration is being listed\n\n👑 David's rule is organized again\n\nThe phrase shows the offices that support the king's reign."],
    ["Abiathar Were the Priests", "Abiathar and the other named priest served in the priestly office before the LORD. The phrase records who held sacred leadership around the kingdom.\n\n🙏 Priests are identified\n\n🏛 Worship leadership is part of the kingdom order\n\n📖 Sacred offices are being named\n\nThe phrase shows religious leadership alongside royal administration."],
    ["Ira Also the Jairite Was a Chief Ruler About David", "Ira is named as a chief ruler or high official closely associated with David. About David means connected to his court and service.\n\n👤 Another official is named\n\n👑 He serves near David\n\n🏛 The court structure is expanding\n\nThe phrase adds one more key servant to the list of David's officers."],
    ["The Jairite Was a Chief", "The repeated line stresses Ira's important rank. Chief here means a leading official, not a minor helper.\n\n📜 His rank is emphasized\n\n👑 He holds real authority\n\n🏛 Court order is still being defined\n\nThe phrase keeps the reader's attention on his significance in David's rule."],
  ],
  "2 Samuel 21:1-6": [
    ["Then There Was a Famine in the Days of David Three Years", "A famine is a severe food shortage, and it lasts for three years here. The phrase signals a serious covenant problem affecting the whole land.\n\n🌾 Food is lacking badly\n\n📅 The crisis lasts three years\n\n⚠️ The land is under pressure\n\nThe phrase shows a prolonged national suffering that demands explanation."],
    ["Year After Year", "The famine does not lift quickly but continues over repeated seasons. The phrase underlines how persistent and unresolved the hardship is.\n\n🔁 The suffering keeps repeating\n\n🌾 Crops are not recovering\n\n⚠️ The problem is not temporary\n\nThe phrase emphasizes the duration of the judgment."],
    ["The King Called the Gibeonites", "David summons the Gibeonites to ask how the wrong against them can be addressed. The phrase shows him seeking justice from those who were harmed.\n\n👑 David calls for them\n\n⚖️ He seeks the offended party\n\n🗣 A wrong must be addressed directly\n\nThe phrase shows the king pursuing reconciliation through inquiry."],
    ["Said unto Them", "David speaks to the Gibeonites face to face instead of deciding alone. The phrase opens the conversation about what justice would require.\n\n🗣 David addresses them directly\n\n⚖️ Their answer matters\n\n👥 The harmed group is heard\n\nThe phrase shows justice beginning with listening."],
  ],
  "2 Samuel 21:7-12": [
    ["But the King Spared Mephibosheth", "David does not hand over Mephibosheth because of his oath to Jonathan. Spared means he was protected from the judgment demanded in this case.\n\n🕊 Mephibosheth is protected\n\n🤝 David remembers his oath\n\n⚖️ Covenant loyalty affects judgment\n\nThe phrase shows mercy shaped by a prior promise."],
    ["The Son of Jonathan the Son of Saul", "This identifies Mephibosheth by his family line, reminding the reader why David had sworn kindness to him. The phrase ties mercy to Jonathan's covenant friendship.\n\n🧬 Jonathan's line is named\n\n🤝 Covenant history matters\n\n👑 Saul's family is still in view\n\nThe phrase explains why David treats him differently."],
    ["But the King Took the Two Sons of Rizpah the Daughter of Aiah", "Instead of Mephibosheth, David takes two sons born to Rizpah and others from Saul's line for the demanded judgment. The phrase is grim because it names the people chosen for the settlement.\n\n👑 David selects Saul's descendants\n\n💔 Rizpah's sons are included\n\n⚖️ The judgment is severe\n\nThe phrase shows the heavy cost of making peace after Saul's wrong."],
    ["Whom She Bare unto Saul", "This means Rizpah had borne these sons to Saul. Bare here means gave birth to.\n\n👶 Rizpah is their mother\n\n📖 Bare means gave birth\n\n🧬 Family identity is made explicit\n\nThe phrase makes clear whose sons these men are."],
  ],
  "2 Samuel 21:13-18": [
    ["He Brought Up from Thence the Bones of Saul", "David gathers Saul's bones from where they had been kept and brings them for proper burial. The phrase is about restoring honor to the dead.\n\n🦴 Saul's bones are retrieved\n\n🤝 Burial honor is being restored\n\n📖 The past is being dealt with carefully\n\nThe phrase shows David giving dignity after long disgrace."],
    ["The Bones of Jonathan His Son", "Jonathan's bones are gathered alongside Saul's. The phrase keeps the father and son connected in burial as they had been in life and death.\n\n🦴 Jonathan is included\n\n👨‍👦 Father and son are buried together\n\n🤝 Honor reaches both\n\nThe phrase shows equal care being given to Jonathan."],
    ["The Bones of Saul", "The repetition keeps Saul's remains in view. Scripture is emphasizing that the former king is being handled with burial respect, not forgotten.\n\n📜 Saul is named again\n\n🦴 His remains matter\n\n🤝 Honor is deliberate\n\nThe phrase reinforces the care being shown to Saul's body."],
    ["Jonathan His Son Buried They in the Country of Benjamin in Zelah", "Saul and Jonathan are buried in Benjamin at Zelah, in Saul's tribal region. The phrase gives the final resting place and ties it back to family land.\n\n🪦 Burial is completed\n\n🏙 Zelah is the location\n\n🧬 Benjamin is their tribal home\n\nThe phrase closes the burial scene with a proper place of rest."],
  ],
  "2 Samuel 21:19-22": [
    ["There Was Again a Battle in Gob with the Philistines", "Another battle breaks out with the Philistines at Gob. The phrase shows that Israel's conflicts with this old enemy continue even late in David's reign.\n\n⚔️ Another battle begins\n\n🏙 Gob is the location\n\n👥 The Philistine threat continues\n\nThe phrase shows repeated warfare rather than a single final victory."],
    ["Where Elhanan the Son of Jaare-oregim", "The verse names Elhanan so the reader knows which warrior won the fight. Naming him preserves the honor of the man who struck down the enemy.\n\n👤 A specific warrior is identified\n\n📖 Honor is attached to a name\n\n⚔️ The deed will be remembered\n\nThe phrase keeps the victory connected to the man who did it."],
    ["There Was Yet a Battle in Gath", "Yet another battle happens, this time in Gath, another Philistine setting. The phrase continues the pattern of repeated giant-related conflicts.\n\n⚔️ Another battle follows\n\n🏙 Gath is the setting\n\n🔁 The conflict keeps recurring\n\nThe phrase shows that the danger was not over after one victory."],
    ["Where Was a Man of Great Stature", "A man of great stature means a very large, intimidating warrior. The phrase prepares the reader for another giant-like opponent.\n\n📏 An unusually large man appears\n\n😨 His size is meant to impress or frighten\n\n⚔️ Another formidable enemy is present\n\nThe phrase helps the reader picture the scale of the threat."],
  ],
  "2 Samuel 22:1-6": [
    ["David Spake unto the LORD the Words of This Song in the Day That the LORD Had Delivered Him Out of the Hand of All His Enemies", "David sings these words to the LORD after God rescues him from all his enemies. The hand of his enemies means their power and control over him.\n\n🎵 This is a song of praise\n\n🙏 David speaks to the LORD directly\n\n🛡 Rescue from enemy power is being celebrated\n\nThe phrase introduces the whole chapter as David's thankful worship after deliverance."],
    ["Out of the Hand of Saul", "Being delivered out of Saul's hand means being rescued from Saul's power to capture or kill him. Hand here means control, not a physical hand only.\n\n🖐 Hand means power or control\n\n👑 Saul had once pursued David\n\n🛡 God rescued him from that danger\n\nThe phrase recalls David's long years under Saul's threat."],
    ["The LORD Is My Rock", "Calling the LORD a rock means God is David's firm protection and stable refuge. It is picture language for safety, strength, and permanence.\n\n🪨 A rock stands firm\n\n🛡 God is David's secure refuge\n\n🙏 The image is about stability and protection\n\nThe phrase gives one of David's strongest pictures of trust in God."],
    ["The God of My Rock", "This means the God who is like David's rock or the God on whom his safety rests. David is piling image upon image to say his security is in God alone.\n\n🙏 God is the source of safety\n\n🪨 The rock image is repeated\n\n🧠 David's confidence is deeply rooted in God\n\nThe phrase keeps the focus on God as David's foundation."],
  ],
  "2 Samuel 22:7-12": [
    ["In My Distress I Called Upon the LORD", "Distress means deep trouble or pressure. David is saying that when he was overwhelmed, he cried out to God for help.\n\n😣 Distress means severe trouble\n\n🙏 David calls to the LORD\n\n🛡 Help is sought from God, not merely from men\n\nThe phrase shows prayer rising out of desperation."],
    ["Cried to My God", "David's cry is urgent, not casual. Calling God 'my God' also makes the prayer personal and relational.\n\n🗣 The prayer is intense\n\n🙏 God is addressed personally\n\n💔 Need is pressing\n\nThe phrase shows both desperation and closeness in David's prayer."],
    ["Then the Earth Shook", "This is poetic language describing God's powerful response as if creation itself trembled. David is using earthquake imagery to show divine intervention.\n\n🌍 The earth is pictured as shaking\n\n⚡ God's response is powerful\n\n📖 The language is poetic and dramatic\n\nThe phrase shows God's help as overwhelming and world-shaking."],
    ["The Foundations of Heaven Moved", "The phrase imagines even the deepest supports of the sky trembling before God. It means God's coming is so mighty that the whole created order seems disturbed.\n\n🌌 Heaven itself seems shaken\n\n⚡ Divine power reaches everything\n\n📖 The image magnifies God's majesty\n\nThe phrase stretches the picture to cosmic scale."],
  ],
  "2 Samuel 22:13-18": [
    ["Through the Brightness Before Him Were Coals of Fire Kindled", "David describes God's appearing with brightness and burning coals, using storm and fire imagery. The picture is of holy, blazing power.\n\n🔥 Coals of fire suggest fierce power\n\n✨ Brightness surrounds God's coming\n\n📖 The language is poetic holiness imagery\n\nThe phrase shows God's presence as radiant and dangerous."],
    ["Before Him Were Coals of", "The shortened line keeps the fire image in view. David is continuing the same picture of God arriving with burning force.\n\n🔥 Fire stays central to the image\n\n📜 The picture is being repeated\n\n⚡ God's approach is intense\n\nThe phrase keeps the reader inside the storm-like vision of God's power."],
    ["Coals of Fire Kindled.", "Kindled means ignited or burning. The phrase underlines that the fire of God's appearing is alive and active, not cold or symbolic only.\n\n🔥 The fire is burning\n\n🧠 Kindled means set ablaze\n\n⚡ Divine power is active\n\nThe phrase strengthens the sense of God's blazing intervention."],
    ["The LORD Thundered from Heaven", "David pictures God speaking or acting like thunder from the sky. Thundered means God's power is heard like a storm voice from above.\n\n🌩 God is like thunder from heaven\n\n🗣 His power is loud and undeniable\n\n🙏 Heaven is the source of the action\n\nThe phrase gives sound to the vision of God's intervention."],
  ],
  "2 Samuel 22:19-24": [
    ["They Prevented Me in the Day of My Calamity", "Prevented here means came upon or confronted, not stopped in advance the modern way. David means his enemies met him in his day of disaster.\n\n⚠️ Old wording is being clarified\n\n👥 Enemies came against him\n\n💔 Calamity means disaster or ruin\n\nThe phrase shows David under attack at his weakest moment."],
    ["But the LORD Was My Stay", "A stay is a support or something that holds a person up. David is saying God was the one who kept him from collapsing.\n\n🛡 God held him up\n\n💪 A stay means support\n\n🙏 David's stability came from the LORD\n\nThe phrase shows God as sustaining strength in crisis."],
    ["He Brought Me Forth Also into a Large Place", "A large place means open room, freedom, and safety instead of being trapped. David says God brought him out from pressure into relief.\n\n🌿 Space replaces confinement\n\n🛡 Rescue leads to freedom\n\n🙏 God opens what trouble had narrowed\n\nThe phrase pictures deliverance as being brought into breathing room."],
    ["He Delivered Me", "Delivered means rescued or pulled free from danger. The short phrase states the core truth behind all the imagery: God saved David.\n\n🛡 Rescue is the point\n\n🙏 God is the deliverer\n\n📖 The poetry resolves into plain meaning\n\nThe phrase states the heart of David's testimony simply."],
  ],
  "2 Samuel 22:25-30": [
    ["Therefore the LORD Hath Recompensed Me According to My Righteousness", "Recompensed means repaid or responded to. David is saying God dealt with him according to his integrity in this matter, not claiming he had never sinned in any sense.\n\n⚖️ God responds according to integrity\n\n🧠 Recompensed means repaid\n\n📖 David is speaking covenantally, not claiming sinless perfection\n\nThe phrase shows David viewing God's rescue as consistent with a life turned toward Him."],
    ["According to My Cleanness in His Eye Sight", "Cleanness in God's sight means moral integrity as God sees it, not just outward appearances. David is appealing to what God truly knows about him.\n\n👀 God sees inwardly\n\n🧼 Cleanness means moral purity or integrity\n\n⚖️ The standard is God's sight, not man's praise\n\nThe phrase stresses God's evaluation over human judgment."],
    ["With the Merciful Thou Wilt Shew Thyself Merciful", "David is saying God responds to the merciful with mercy. Shew means show.\n\n🙏 God deals mercifully with the merciful\n\n🧠 Shew means show\n\n⚖️ This is about God's fitting response\n\nThe phrase expresses a pattern of how God deals with people."],
    ["With the Upright Man Thou Wilt Shew Thyself Upright", "Upright means straight, honest, and morally sound. David says God shows Himself true and upright toward those who walk uprightly.\n\n📏 Upright means morally straight\n\n🙏 God is true toward the true-hearted\n\n⚖️ Integrity meets fitting divine response\n\nThe phrase continues David's reflection on God's just dealings."],
  ],
  "2 Samuel 22:31-36": [
    ["As for God", "David pauses to speak directly about God Himself. The phrase marks a shift into clear praise of God's character.\n\n🙏 Attention turns fully to God\n\n📜 The song becomes a confession of who God is\n\n🧠 David is drawing conclusions from experience\n\nThe phrase introduces a concentrated statement about God's nature."],
    ["His Way Is Perfect", "God's way means His manner of acting and leading, and perfect means complete, blameless, and without defect.\n\n🛤 God's way is His path and action\n\n✨ Perfect means complete and flawless\n\n🙏 David trusts God's methods fully\n\nThe phrase praises the faultlessness of God's dealings."],
    ["For Who Is God", "David asks a rhetorical question to say that no one else compares with the LORD. The expected answer is that there is no other true God like Him.\n\n❓ A rhetorical question is asked\n\n🙏 No rival compares to the LORD\n\n📖 The point is uniqueness, not uncertainty\n\nThe phrase magnifies God's incomparability."],
    ["Save the LORD", "Save here means except. David is saying there is no God except the LORD.\n\n🧠 Save means except\n\n🙏 The LORD alone is truly God\n\n🚫 No rival shares His place\n\nThe phrase makes the exclusiveness of Israel's God very plain."],
  ],
  "2 Samuel 22:37-42": [
    ["Thou Hast Enlarged My Steps Under Me", "God made David's footing broad and secure so he would not stumble. Enlarged my steps means gave room and steadiness to walk safely.\n\n👣 Steps are made secure\n\n🌿 Space is given underfoot\n\n🛡 God keeps him from falling\n\nThe phrase pictures God making David's path stable."],
    ["So That My Feet Did Not Slip", "David means God kept him from losing footing and falling in danger. Slip here is a picture of failure or collapse.\n\n👣 His footing is preserved\n\n🛡 God prevents collapse\n\n📖 The image is about stability in danger\n\nThe phrase explains the result of God enlarging his steps."],
    ["I Have Pursued Mine Enemies", "David chased his enemies instead of being chased by them. The phrase speaks of active victory after God strengthened him.\n\n🏃 David pursues rather than flees\n\n⚔️ Strength turns defense into victory\n\n🙏 God's help changes the battle\n\nThe phrase shows deliverance becoming triumph."],
    ["Turned Not Again Until I Had Consumed Them", "David says he did not turn back until the enemy was fully overcome. Consumed them means defeated and brought their resistance to an end.\n\n🚫 He does not retreat\n\n⚔️ The victory is carried through fully\n\n📖 Consumed means thoroughly defeated\n\nThe phrase stresses complete persistence in battle."],
  ],
  "2 Samuel 22:43-48": [
    ["Then Did I Beat Them as Small as the Dust of the Earth", "David uses picture language to say his enemies were crushed completely. Dust of the earth suggests being broken down into something small and powerless.\n\n🌫 Dust pictures total humiliation\n\n⚔️ The enemies are crushed\n\n📖 The language is vivid victory imagery\n\nThe phrase expresses overwhelming defeat of the enemy."],
    ["I Did Stamp Them as the Mire of the Street", "Mire is mud or filth in the street. David is saying the enemies were trampled down and treated as utterly overpowered.\n\n🟫 Mire means street mud\n\n👣 The enemies are pictured as trampled down\n\n⚔️ The image is one of total defeat\n\nThe phrase intensifies the picture of conquest."],
    ["Thou Also Hast Delivered Me from the Strivings of My People", "God rescued David not only from foreign enemies but from disputes and rebellions among his own people. Strivings means internal conflicts and contentions.\n\n👥 Conflict also came from within Israel\n\n🛡 God rescued David from civil struggle\n\n📖 Strivings means quarrels and rebellion\n\nThe phrase widens deliverance beyond battlefield enemies."],
    ["Thou Hast Kept Me to Be Head of the Heathen", "Heathen here means nations outside Israel. David says God preserved him so he would rule over other peoples as well.\n\n🌍 Heathen means foreign nations\n\n👑 God preserved David for wider rule\n\n🙏 His kingship is sustained by God\n\nThe phrase shows international dominance as part of God's gift."],
  ],
  "2 Samuel 22:49-51": [
    ["That Bringeth Me Forth from Mine Enemies", "God is the one who brings David out from among enemies into safety. Bringeth me forth means leads me out and rescues me.\n\n🛡 God leads him out of danger\n\n👥 Enemies surround, but do not keep him\n\n🙏 Deliverance is personal and active\n\nThe phrase shows God as the rescuer who escorts David to safety."],
    ["Thou Also Hast Lifted Me Up on High Above Them That Rose Up Against Me", "God exalts David above those who attack him. Lifted me up on high means raised him to safety and superiority over his enemies.\n\n⬆️ God raises David above attackers\n\n🛡 Safety and honor are both implied\n\n⚔️ Enemies do not have the final position\n\nThe phrase shows God overturning the balance of power."],
    ["Therefore I Will Give Thanks unto Thee", "Because God has delivered him, David responds with gratitude. The phrase turns victory into worship.\n\n🙏 Thanksgiving follows rescue\n\n🎵 Praise is David's answer\n\n📖 Deliverance leads to doxology\n\nThe phrase shows the proper response to God's help."],
    ["Among the Heathen", "Among the heathen means among the surrounding nations. David's praise to God will be heard beyond Israel.\n\n🌍 The nations are in view\n\n🙏 God's praise reaches beyond Israel\n\n📖 Heathen means foreign peoples\n\nThe phrase broadens the audience of David's thanksgiving."],
  ],
  "2 Samuel 23:1-6": [
    ["Now These Be the Last Words of David", "These are presented as David's final formal words or final prophetic saying, not necessarily the last syllables he ever spoke. The phrase gives them special weight.\n\n📜 Final words carry importance\n\n👑 David's closing testimony is being introduced\n\n🧠 The statement is solemn and weighty\n\nThe phrase tells the reader to listen carefully to David's concluding message."],
    ["David the Son of Jesse Said", "David is identified from his family beginning, reminding the reader of his humble origin. The phrase ties the great king back to where he started.\n\n👤 David is named plainly\n\n🏠 Jesse's son is still in view\n\n👑 Greatness grew from humble roots\n\nThe phrase grounds the king in his ordinary family origin."],
    ["The Spirit of the LORD Spake by Me", "David says the Holy Spirit spoke through him. The phrase claims divine inspiration for what follows.\n\n🙏 The LORD's Spirit is the source\n\n🗣 David speaks as God's instrument\n\n📖 The words carry prophetic authority\n\nThe phrase explains why David's speech should be received as more than personal opinion."],
    ["His Word Was in My Tongue", "David means the very words he spoke were given by God. The tongue is the instrument of speech, so the phrase is about inspired utterance.\n\n🗣 God's word shaped David's speech\n\n👅 Tongue stands for spoken words\n\n🙏 David's message is not merely self-generated\n\nThe phrase describes divine truth being put into his mouth."],
  ],
  "2 Samuel 23:7-12": [
    ["But the Man That Shall Touch Them Must Be Fenced with Iron", "The wicked are compared to thorns that cannot be handled safely by bare hands. Fenced with iron means armed or protected with tools.\n\n🌵 The image is of dangerous thorns\n\n🛡 Iron tools are needed for contact\n\n⚠️ Evil is not safe to handle casually\n\nThe phrase explains the warning image in David's saying."],
    ["The Staff of a Spear", "A spear shaft is the kind of tool used to deal with harmful thorns from a distance. The phrase continues the picture of guarded handling.\n\n🪓 Distance and protection are needed\n\n⚔️ A spear is used like a tool here\n\n📖 The thorn image continues\n\nThe phrase deepens the idea that wickedness must be dealt with carefully and decisively."],
    ["These Be the Names of the Mighty Men Whom David Had", "The text now turns to the list of David's mighty warriors. Naming them preserves honor and remembers their deeds.\n\n📜 A heroic list begins\n\n👥 Specific warriors will be remembered\n\n👑 Their service belonged to David's reign\n\nThe phrase introduces the honor roll of David's fighters."],
    ["The Tachmonite That Sat in the Seat", "This identifies the first mighty man by title or place of honor. The phrase marks him as a leading figure among David's warriors.\n\n👤 A chief warrior is identified\n\n🏅 His position is distinguished\n\n📖 The list begins with prominence\n\nThe phrase shows this man held a notable rank among the mighty men."],
  ],
  "2 Samuel 23:13-18": [
    ["Three of the Thirty Chief Went Down", "Three leading warriors from among the Thirty go down to David. The phrase identifies them as part of an elite group within the larger company.\n\n👥 Three elite men are singled out\n\n🏅 They belong to the Thirty\n\n📖 Their courage will be highlighted\n\nThe phrase introduces a smaller band of especially honored warriors."],
    ["Came to David in the Harvest Time unto the Cave of Adullam", "They come to David at the cave of Adullam during harvest time. The phrase places the story in David's earlier fugitive years.\n\n🏞 Adullam is the setting\n\n🌾 Harvest time is named\n\n📖 The story looks back to David's hardship years\n\nThe phrase locates the famous water episode in a real season and place."],
    ["David Was Then in an Hold", "A hold is a stronghold or defensive refuge. David is living in a fortified hiding place rather than ruling openly.\n\n🏰 A hold means stronghold\n\n👑 David is not yet secure as king\n\n⚠️ He is still in a place of danger\n\nThe phrase explains David's vulnerable setting."],
    ["The Garrison of the Philistines Was Then in Bethlehem", "Bethlehem, David's hometown, is occupied by a Philistine military post. Garrison means a stationed force holding the place.\n\n🏙 Bethlehem is occupied\n\n🪖 A garrison means stationed troops\n\n💔 David's own town is under enemy control\n\nThe phrase explains why the water longed for is hard to reach."],
  ],
  "2 Samuel 23:19-24": [
    ["Was He Not Most Honourable of Three", "The question means this warrior held great honor among the three. Honourable here refers to rank and esteem.\n\n🏅 He is highly esteemed\n\n👥 His standing among the three is notable\n\n📖 The question expects 'yes'\n\nThe phrase highlights his exceptional honor."],
    ["Therefore He Was Their Captain", "Because of his honor and deeds, he became their captain or leader. The phrase explains the result of his proven valor.\n\n👑 Leadership follows distinction\n\n🏅 Honor leads to rank\n\n🪖 He becomes captain of the group\n\nThe phrase links reputation to authority."],
    ["Benaiah the Son of Jehoiada", "Benaiah is now introduced by name and family line as another mighty warrior. Naming him prepares the reader for his remarkable deeds.\n\n👤 A new warrior is introduced\n\n🧬 Family line is given\n\n📖 His deeds are worth remembering\n\nThe phrase identifies the man whose exploits follow."],
    ["The Son of a Valiant Man", "Valiant means brave, strong, and accomplished in battle. The phrase describes Benaiah's family background as one marked by courage.\n\n💪 Valiant means brave and strong\n\n🏠 Courage runs in the family line\n\n📖 His heritage adds to his profile\n\nThe phrase gives Benaiah an honorable background."],
  ],
  "2 Samuel 23:25-30": [
    ["Shammah the Harodite", "This is one of the named mighty men in David's list. The phrase preserves the identity of a warrior whose service mattered.\n\n👤 A warrior is named\n\n📜 The list records individuals carefully\n\n🏅 Honor is attached to remembered names\n\nThe phrase helps make the mighty men more than anonymous soldiers."],
    ["Elika the Harodite", "Another warrior is listed by name and origin. The repeated naming shows that many men shared in the kingdom's battles and loyalty.\n\n👤 Another man is remembered\n\n🏙 His origin is noted\n\n👥 The company of the mighty men is broad\n\nThe phrase continues the honor roll by naming him specifically."],
    ["Helez the Paltite", "Helez is recorded as one of David's mighty men. The phrase keeps adding real people to the roster of honor.\n\n📜 The roster continues\n\n👤 Helez is remembered by name\n\n🏅 Service is preserved in writing\n\nThe phrase shows how Scripture honors faithful warriors individually."],
    ["Ira the Son of Ikkesh the Tekoite", "Ira is identified by both his father and hometown. These details distinguish him clearly from others and anchor him in real history.\n\n👤 Ira is fully identified\n\n🧬 Family and town are both named\n\n📖 The record is historically concrete\n\nThe phrase shows careful remembrance, not vague legend."],
  ],
  "2 Samuel 23:31-36": [
    ["Abi-albon the Arbathite", "Abi-albon is another of David's mighty men, named with his regional title. The phrase continues the memorial list of loyal fighters.\n\n👤 Another warrior is named\n\n🏙 His region is attached to him\n\n🏅 The honor list continues\n\nThe phrase shows the breadth of men who served David."],
    ["Azmaveth the Barhumite", "Azmaveth is listed by name and origin just like the others. The phrase emphasizes individual remembrance within a larger group.\n\n👤 Azmaveth is remembered\n\n🏙 His place is noted\n\n📜 The roster stays personal and specific\n\nThe phrase keeps the list concrete and human."],
    ["Eliahba the Shaalbonite", "Eliahba's name and origin are preserved as part of David's mighty men. The record gives dignity to service by not letting names disappear.\n\n👤 Eliahba is named\n\n🏅 Honor is preserved in the record\n\n📖 Service is remembered specifically\n\nThe phrase shows the value of naming the faithful."],
    ["Of the Sons of Jashen", "This refers to men associated with Jashen's family line. The phrase likely groups certain warriors by family connection.\n\n🧬 A family line is in view\n\n👥 More than one man may be connected here\n\n📖 Genealogical identity helps organize the list\n\nThe phrase shows how family ties appear even inside military records."],
  ],
  "2 Samuel 23:37-39": [
    ["Zelek the Ammonite", "Zelek is named as an Ammonite, meaning he came from a people outside Israel yet served among David's mighty men. The phrase shows the reach of David's following.\n\n🌍 He is from outside Israel\n\n👤 Zelek is honored by name\n\n👥 David's mighty men included foreigners\n\nThe phrase shows loyalty to David extending beyond ethnic Israel."],
    ["Nahari the Beerothite", "Nahari is another named warrior in the final part of the list. His origin helps distinguish him from others in the company.\n\n👤 Nahari is remembered\n\n🏙 His background is specified\n\n📜 The list continues carefully\n\nThe phrase preserves his identity within the larger roll of honor."],
    ["Ira an Ithrite", "Ira is named as one of the mighty men with his people-group or family designation. The short line still serves to preserve his place in the record.\n\n👤 Ira is named\n\n🧬 His designation marks his identity\n\n🏅 Even brief mentions carry honor\n\nThe phrase shows how the list preserves men one by one."],
    ["Gareb an Ithrite", "Gareb is also listed with his designation as an Ithrite. The phrase continues the simple but honorable remembrance of David's warriors.\n\n👤 Gareb is remembered\n\n🧬 His group identity is noted\n\n📖 The record closes by naming the faithful individually\n\nThe phrase shows the dignity of being remembered among the mighty men."],
  ],
};

function rewriteDay81SecondSamuelSection(section: RoyalPhraseSectionInput): RoyalPhraseSectionInput {
  const overrides = DAY_81_SECOND_SAMUEL_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const DAY_82_ROYAL_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "2 Samuel 24:1-6": [
    ["Again the Anger of the LORD Was Kindled Against Israel", "Kindled anger means God's anger burned against Israel again. The phrase tells the reader that the chapter opens under divine displeasure, not ordinary politics.\n\n🔥 God's anger is active\n\n👥 Israel is under judgment\n\n⚠️ The chapter begins with moral seriousness\n\nThe phrase explains why the events that follow are not spiritually neutral."],
    ["He Moved David Against Them to Say", "The verse says David is stirred to order the census, and the wording shows God's judgment working through the situation. The phrase is about David being prompted into an action that will expose sin and bring discipline.\n\n👑 David is stirred to act\n\n⚖️ Judgment is working through the event\n\n📖 The census will reveal a deeper problem\n\nThe phrase shows that the command to number the people is part of a larger divine dealing."],
    ["For the King Said to Joab the Captain of the Host", "David gives the order to Joab, who commands the army. Captain of the host means the military leader over Israel's forces.\n\n👑 David gives the command\n\n🪖 Joab leads the army\n\n📖 The order becomes official action\n\nThe phrase shows the king moving the census from thought into execution."],
    ["Which Was with Him", "This refers to the military leadership standing with Joab during the command. The phrase reminds the reader that David's order involves the structure of the whole kingdom.\n\n👥 Others are present too\n\n🪖 The command reaches the leadership circle\n\n⚠️ The decision spreads beyond David alone\n\nThe phrase shows the census becoming a public act of government."],
  ],
  "2 Samuel 24:7-12": [
    ["Came to the Strong Hold of Tyre", "A strong hold is a fortified place, and Tyre was a major strong city. The phrase tracks the route of the census through important locations.\n\n🏰 A fortified city is named\n\n🗺 The census route is being traced\n\n📖 Real geography matters here\n\nThe phrase helps the reader follow the long sweep of the counting."],
    ["To All the Cities of the Hivites", "The count reaches the cities of the Hivites, showing how widely the census moved across the land. The phrase emphasizes the breadth of the survey.\n\n🏙 Many cities are included\n\n👥 Different peoples and regions are counted\n\n📖 The census is extensive\n\nThe phrase shows that this was not a quick local count."],
    ["So When They Had Gone Through All the Land", "The officers finish traveling through the whole land to carry out David's order. The phrase underlines how complete the census became.\n\n🌍 The whole land is covered\n\n⏳ The process took time and effort\n\n📖 The order was fully carried out\n\nThe phrase shows the scale of what David set in motion."],
    ["They Came to Jerusalem at the End of Nine Months", "The census team returns to Jerusalem after nine months and twenty days. The long time span shows how major the undertaking was.\n\n🏙 They return to Jerusalem\n\n📅 The work lasted many months\n\n⚠️ The consequences will now come home\n\nThe phrase marks the end of the counting and the start of reckoning."],
  ],
  "2 Samuel 24:13-18": [
    ["So Gad Came to David", "Gad the prophet comes to David with God's message after the census. The phrase marks the shift from completed action to divine response.\n\n👤 Gad is God's messenger here\n\n👑 David must now hear God's word\n\n⚖️ Judgment is arriving\n\nThe phrase shows that the prophet comes with an answer from the LORD."],
    ["Said unto Him", "Gad speaks directly to David instead of leaving the matter vague. The phrase opens the message that forces David to face the consequences of his choice.\n\n🗣 The prophet addresses David plainly\n\n⚖️ The matter becomes personal\n\n📖 The king must answer to God's word\n\nThe phrase marks the direct delivery of judgment."],
    ["David Said unto Gad", "David replies after hearing the three possible judgments. The phrase matters because his answer shows distress and surrender rather than self-defense.\n\n👑 David responds\n\n😣 He must choose under pressure\n\n🙏 His heart turns toward God's mercy\n\nThe phrase opens David's humbled answer."],
    ["I Am in a Great Strait", "A great strait means a place of severe distress and pressure. David feels trapped by the weight of the options before him.\n\n😣 He feels pressed on every side\n\n🧠 Strait means deep distress\n\n⚖️ The choice is agonizing\n\nThe phrase shows how heavy God's judgment feels to David."],
  ],
  "2 Samuel 24:19-24": [
    ["According to the Saying of Gad", "David acts exactly in line with the prophet's word. The phrase shows obedience to the instruction God gave through Gad.\n\n📜 David follows the prophetic word\n\n👑 The king obeys\n\n🙏 The response is guided by revelation\n\nThe phrase shows David moving under God's instruction, not his own idea."],
    ["Went Up as the LORD Commanded", "David goes up to the threshingfloor because the LORD commanded it. The phrase stresses obedience at the place where mercy will meet judgment.\n\n⬆️ David goes where God told him\n\n🙏 The command comes from the LORD\n\n📖 Obedience leads toward atonement\n\nThe phrase shows the king moving toward the appointed place of sacrifice."],
    ["Saw the King", "Araunah sees David approaching with his servants. The phrase marks the moment the owner of the threshingfloor realizes the king is coming to his place.\n\n👀 Araunah sees David coming\n\n👑 The king is approaching personally\n\n⚠️ A significant meeting is beginning\n\nThe phrase opens the exchange over the future altar site."],
    ["His Servants Coming on Toward Him", "Araunah sees not only David but the royal company with him. The phrase gives the approach public weight and signals that something serious is happening.\n\n👥 The king's servants come too\n\n🏃 They are moving toward Araunah\n\n📖 The visit is formal and weighty\n\nThe phrase helps the reader feel the significance of the arrival."],
  ],
  "2 Samuel 24:25": [
    ["David Built There an Altar unto the LORD", "An altar is a place for offering sacrifice to God. David builds one there because that spot becomes the place where judgment is met with worship and atonement.\n\n🪨 An altar is built\n\n🙏 The place is set apart for sacrifice\n\n⚖️ Judgment meets mercy there\n\nThe phrase explains why this location matters so much."],
    ["Offered Burnt Offerings", "Burnt offerings were sacrifices wholly given to God, and peace offerings expressed restored fellowship. The phrase shows David turning to sacrificial worship for mercy.\n\n🔥 Sacrifices are offered\n\n🙏 Worship is the response\n\n🕊 Peace with God is being sought\n\nThe phrase shows sacrifice at the center of the chapter's resolution."],
    ["Built There an Altar unto the Lord, and", "The repeated wording keeps attention on the exact act of building and worshiping at that place. Scripture slows down to emphasize what David did there.\n\n📜 The act is restated\n\n🪨 The altar remains central\n\n🙏 The place is marked by worship\n\nThe phrase reinforces the importance of that altar."],
    ["There an Altar unto the Lord, and Offered", "This shortened repeated line still points to the altar and the sacrifices together. The main point is that David did not leave the place untouched but worshiped there.\n\n🪨 Altar and offering belong together\n\n🙏 David acts, not merely speaks\n\n📖 The chapter closes on worship\n\nThe phrase keeps sacrifice and obedience in view."],
  ],
  "1 Kings 1:1-6": [
    ["Now King David Was Old", "David is now in old age, and the phrase announces that his final years have begun. The weakness of the aging king sets the stage for the struggle over succession.\n\n👑 David is at the end of life\n\n⏳ His age now matters politically\n\n⚠️ A transition of power is near\n\nThe phrase opens the succession crisis by showing David's frailty."],
    ["Stricken in Years", "Stricken in years means very advanced in age. It is old Bible wording for someone worn by many years.\n\n🧠 Old wording is being defined\n\n👴 David is very aged\n\n📖 His physical decline is real\n\nThe phrase explains that David's age is no small detail."],
    ["Wherefore His Servants Said unto Him", "David's servants respond to his weakness by proposing a practical solution. The phrase opens their attempt to care for the failing king.\n\n👥 The servants take initiative\n\n👑 They are addressing the king's weakness\n\n📖 A plan is being proposed\n\nThe phrase marks the court's response to David's condition."],
    ["Let There Be Sought for My Lord the King a Young Virgin", "The servants suggest finding a young woman to attend and warm David. The phrase is about royal bedside care, not a new marriage plan at this point.\n\n👩 A caregiver is sought\n\n🔥 Warmth is the immediate concern\n\n👑 The proposal is for the king's care\n\nThe phrase explains what the servants think David needs physically."],
  ],
  "1 Kings 1:7-12": [
    ["He Conferred with Joab the Son of Zeruiah", "Adonijah consults with Joab to gather support for his claim. Conferred means they spoke together to plan and align themselves.\n\n🗣 Private planning is happening\n\n🪖 Joab joins the move\n\n⚠️ The succession struggle is becoming organized\n\nThe phrase shows Adonijah building a coalition."],
    ["With Abiathar the Priest", "Abiathar the priest also sides with Adonijah. The phrase shows that the attempted takeover gains both military and priestly support.\n\n🙏 A priest joins Adonijah\n\n🤝 Religious influence is added to political ambition\n\n⚠️ The movement gains weight\n\nThe phrase shows how broad Adonijah's support becomes."],
    ["But Zadok the Priest", "Zadok stands on the other side of the conflict and does not follow Adonijah. The phrase begins listing those who remain loyal to David's intended line.\n\n🙏 Zadok is distinguished from Abiathar\n\n👑 Loyalty is dividing the court\n\n📖 Not everyone joins the conspiracy\n\nThe phrase marks the start of the faithful counter-group."],
    ["Benaiah the Son of Jehoiada", "Benaiah is named among those who do not support Adonijah. His presence matters because he is a powerful and loyal military figure.\n\n🪖 Benaiah is loyal elsewhere\n\n👑 Strong support remains for David's side\n\n📖 The court is not united behind Adonijah\n\nThe phrase shows that important men still stand against the plot."],
  ],
  "1 Kings 1:13-18": [
    ["Get Thee in unto King David", "Nathan tells Bathsheba to go into David's presence at once. The phrase is urgent because the succession question cannot be left alone.\n\n🏃 Bathsheba must act quickly\n\n👑 The matter must reach David directly\n\n⚠️ Delay could cost Solomon the throne\n\nThe phrase opens the urgent appeal to the king."],
    ["Say unto Him", "Nathan instructs Bathsheba on the words she should say. The phrase shows that this approach is deliberate and carefully planned.\n\n🗣 Specific words are prepared\n\n🧠 Strategy is shaping the approach\n\n👑 The king must hear the right message\n\nThe phrase marks the planned form of the appeal."],
    ["While Thou Yet Talkest There with the King", "Nathan explains that he will come in while Bathsheba is still speaking. The timing is meant to strengthen and confirm her report.\n\n⏰ The plan depends on timing\n\n🗣 Bathsheba will not stand alone\n\n📖 Her words will be reinforced quickly\n\nThe phrase shows coordination in the effort to protect Solomon's claim."],
    ["I Also Will Come in After Thee", "Nathan will enter after Bathsheba to back up what she says. The phrase shows a deliberate two-witness strategy before the king.\n\n👤 Nathan will follow her in\n\n🤝 Her message will be confirmed\n\n⚖️ The appeal gains added weight\n\nThe phrase shows how carefully David's loyalists handle the crisis."],
  ],
  "1 Kings 1:19-24": [
    ["He Hath Slain Oxen", "Adonijah has prepared a feast with slaughtered animals to celebrate and gather supporters. The phrase points to a royal-style banquet tied to his self-exaltation.\n\n🍖 A public feast is underway\n\n👑 Adonijah is acting like a king\n\n⚠️ The meal is political, not merely festive\n\nThe phrase shows how the rebellion is being staged publicly."],
    ["Sheep in Abundance", "There are many sacrificial animals at the feast, which shows how large and impressive Adonijah's gathering is. In abundance means in great quantity.\n\n🔢 The feast is lavish\n\n🍖 Many animals are provided\n\n👥 The event is meant to impress people\n\nThe phrase shows the scale of Adonijah's display."],
    ["The Eyes of All Israel Are Upon Thee", "Bathsheba means the nation is looking to David to settle who will reign next. The eyes of all Israel is picture language for public expectation.\n\n👀 The nation is watching\n\n👑 David's decision still matters\n\n⚠️ Silence will create danger\n\nThe phrase shows the weight of national attention on the king."],
    ["That Thou Shouldest Tell Them Who Shall Sit on the Throne of My Lord the King After Him", "Bathsheba is asking David to name the rightful successor. To sit on the throne means to reign as king.\n\n👑 A successor must be declared\n\n🪑 The throne means active kingship\n\n📖 The issue is who rules after David\n\nThe phrase spells out the exact question before the king."],
  ],
  "1 Kings 1:25-30": [
    ["For He Is Gone Down This Day", "Nathan reports that Adonijah has gone down to the feast that very day to gather supporters. The phrase gives the conspiracy immediacy.\n\n📅 The event is happening now\n\n🏃 Adonijah is already acting\n\n⚠️ The crisis is not distant\n\nThe phrase shows how urgent the situation has become."],
    ["Hath Slain Oxen", "Again the feast is described through the slaughtered animals, showing that Adonijah's claim is being celebrated with royal abundance.\n\n🍖 The feast is emphasized again\n\n👑 Adonijah is making a public statement\n\n📜 The act is repeated to stress its seriousness\n\nThe phrase reinforces the scale of the attempted coronation."],
    ["Even Me Thy Servant", "Nathan points out that he himself was not invited, showing the event is selective and political. Thy servant is a respectful way he refers to himself before the king.\n\n🙇 Nathan speaks humbly\n\n⚠️ The exclusions reveal the plot\n\n👑 The event is not neutral or open\n\nThe phrase shows that loyal servants were deliberately left out."],
    ["Zadok the Priest", "Zadok is named among those excluded from Adonijah's feast. His absence matters because the conspiracy avoids key loyal figures.\n\n🙏 Zadok is missing from the feast\n\n⚠️ Important loyal men are excluded\n\n📖 The guest list exposes the agenda\n\nThe phrase helps prove that Adonijah's gathering is partisan and calculated."],
  ],
  "1 Kings 1:31-36": [
    ["Then Bath-sheba Bowed with Her Face to the Earth", "Bathsheba bows low before David in reverence and humility. The gesture shows respect for the king even while asking for decisive action.\n\n🙇 She bows deeply\n\n👑 David is honored as king\n\n🙏 Her request remains reverent\n\nThe phrase shows humble honor in the middle of political urgency."],
    ["Did Reverence to the King", "Did reverence means showed deep respect. Bathsheba's body posture matches the seriousness of the moment.\n\n🙇 Respect is openly shown\n\n👑 The king's authority is acknowledged\n\n📖 Her approach remains humble\n\nThe phrase clarifies the respectful meaning of her action."],
    ["King David Said", "David finally speaks decisively after hearing the reports. The phrase marks the turn from uncertainty to royal command.\n\n👑 David responds as king\n\n🗣 His words will settle the matter\n\n⚖️ Authority is about to act\n\nThe phrase signals the decisive answer everyone has been waiting for."],
    ["Call Me Zadok the Priest", "David orders that Zadok be summoned to carry out the public anointing. The phrase shows David moving from private decision to formal succession action.\n\n🙏 Zadok is called in\n\n👑 The next step is official\n\n📖 The succession will be enacted publicly\n\nThe phrase opens the concrete steps that make Solomon king."],
  ],
  "1 Kings 1:37-42": [
    ["As the LORD Hath Been with My Lord the King", "Benaiah is praying that God will be with Solomon just as He was with David. The phrase links Solomon's future to the same divine presence David knew.\n\n🙏 God was with David\n\n👑 That same help is desired for Solomon\n\n📖 Succession is framed spiritually, not only politically\n\nThe phrase shows hope for continuity under God's favor."],
    ["Even So Be He with Solomon", "Benaiah asks that the LORD's presence continue with Solomon in the same way. The phrase is both blessing and prayer for the new king.\n\n🙏 A blessing is spoken over Solomon\n\n👑 His reign must depend on God too\n\n📖 David's pattern is the model\n\nThe phrase shows the new king being placed under the same divine care."],
    ["So Zadok the Priest", "Zadok now goes to carry out David's order. The phrase marks the start of the public act that will confirm Solomon's kingship.\n\n🙏 Zadok acts on the command\n\n👑 The anointing process begins\n\n📖 The private decision becomes public action\n\nThe phrase moves the story from order to fulfillment."],
    ["Nathan the Prophet", "Nathan's presence gives prophetic confirmation to Solomon's anointing. The phrase shows that priest, prophet, and royal command are aligned together.\n\n👤 Nathan stands with the act\n\n🙏 Prophetic approval is present\n\n👑 The succession is strongly confirmed\n\nThe phrase adds divine-weighted witness to Solomon's rise."],
  ],
  "1 Kings 1:43-48": [
    ["Said to Adonijah", "Jonathan speaks directly to Adonijah with the news that changes everything. The phrase marks the collapse of Adonijah's celebration.\n\n🗣 News is brought straight to Adonijah\n\n⚠️ His feast is about to be overturned\n\n👑 Another king has been declared\n\nThe phrase opens the moment his hopes begin to fail."],
    ["Verily Our Lord King David Hath Made Solomon King", "Jonathan announces that David has officially made Solomon king. Verily means truly or certainly.\n\n👑 Solomon has been confirmed king\n\n🧠 Verily means certainly\n\n⚖️ David's decision is final\n\nThe phrase states plainly that the succession question has been settled."],
    ["The King Hath Sent with Him Zadok the Priest", "David has sent Solomon with trusted royal and priestly support. The phrase shows that Solomon's rise is not private rumor but authorized action.\n\n🙏 Zadok goes with Solomon\n\n👑 The king backs the act\n\n📖 The coronation has real authority behind it\n\nThe phrase demonstrates public legitimacy."],
    ["Nathan the Prophet", "Nathan is included again as part of the official company supporting Solomon. His presence strengthens the certainty of the news.\n\n👤 Nathan is part of the royal procession\n\n📖 Prophetic witness confirms the event\n\n⚠️ This is no uncertain report\n\nThe phrase adds another layer of legitimacy to Solomon's kingship."],
  ],
  "1 Kings 1:49-53": [
    ["All the Guests That Were with Adonijah Were Afraid", "Adonijah's guests become afraid because their side has failed and they may now face judgment. The feast turns from celebration to panic.\n\n😨 Fear replaces confidence\n\n🍽 The party collapses\n\n⚠️ Supporting the wrong claimant now looks dangerous\n\nThe phrase shows how quickly political joy can turn into terror."],
    ["Went Every Man His Way", "The guests scatter and leave Adonijah alone. The phrase shows that his support was shallow once danger appeared.\n\n🏃 Everyone disperses\n\n🤝 False unity disappears\n\n⚠️ Adonijah is abandoned quickly\n\nThe phrase reveals how fragile his coalition really was."],
    ["Adonijah Feared Because of Solomon", "Adonijah now fears Solomon's response as the recognized king. The phrase shows that his concern is no longer gaining the throne but saving his life.\n\n😨 Adonijah is now afraid\n\n👑 Solomon holds the power\n\n⚖️ The rebel becomes the vulnerable one\n\nThe phrase shows the complete reversal in his position."],
    ["Caught Hold on the Horns of the Altar", "The horns of the altar were its projecting corners, and grasping them was a plea for mercy or asylum. Adonijah is physically clinging to the altar for protection.\n\n🪨 The altar becomes his refuge\n\n🙏 He is asking for mercy by action\n\n⚠️ He knows he is in danger\n\nThe phrase explains the desperate gesture he makes."],
  ],
  "1 Kings 2:1-6": [
    ["Now the Days of David Drew Nigh That He Should Die", "David's death is now near, and the phrase tells the reader his final instructions are about to begin. Drew nigh means came close.\n\n⏳ David's death is approaching\n\n🧠 Drew nigh means came near\n\n📖 Final counsel is beginning\n\nThe phrase opens David's last charge with solemnity."],
    ["He Charged Solomon His Son", "David gives Solomon a formal charge or command for how he must rule. The phrase is about fatherly instruction with royal weight.\n\n👑 David instructs Solomon formally\n\n📜 A charge means a serious command\n\n🏛 The future kingdom is in view\n\nThe phrase shows a father handing over more than a throne."],
    ["I Go the Way of All the Earth", "David means he is going the common way of all humans, namely death. The phrase is poetic and humble about mortality.\n\n⚰ David is speaking of death\n\n🌍 Everyone goes this way\n\n🧠 The wording is poetic but plain in meaning\n\nThe phrase shows David facing mortality without illusion."],
    ["Be Thou Strong Therefore", "David calls Solomon to courage and firmness as he becomes king. The strength in view is moral and kingly steadiness, not muscle alone.\n\n💪 Courage is required\n\n👑 Solomon must stand firm as king\n\n📖 Strength includes character and resolve\n\nThe phrase is a fatherly summons to strong rule."],
  ],
  "1 Kings 2:7-12": [
    ["But Shew Kindness unto the Sons of Barzillai the Gileadite", "Shew means show. David tells Solomon to continue covenant kindness to Barzillai's family because Barzillai helped him in distress.\n\n🙏 Shew means show\n\n🤝 Kindness must be remembered\n\n👨‍👦 Loyalty to the father blesses the sons\n\nThe phrase shows gratitude becoming policy in the next reign."],
    ["Let Them Be of Those That Eat at Thy Table", "To eat at the king's table means live under royal provision and favor. David wants Barzillai's sons treated as honored dependents of the court.\n\n🍽 The king's table means ongoing favor\n\n👑 Provision and honor are included\n\n🤝 Loyalty is rewarded generously\n\nThe phrase explains the practical form of royal kindness."],
    ["Thou Hast with Thee Shimei the Son of Gera", "David reminds Solomon that Shimei is still in the kingdom. The phrase brings unfinished justice from David's reign into Solomon's responsibility.\n\n👤 Shimei is still present\n\n⚖️ Past wrongs are not forgotten\n\n👑 Solomon must deal wisely with him\n\nThe phrase brings an unresolved figure back into view."],
    ["A Benjamite of Bahurim", "Shimei is identified by tribe and town, tying him to the region from which he cursed David. The phrase keeps his identity historically specific.\n\n🏙 Bahurim is named\n\n🧬 His tribal identity is given\n\n📖 The man is clearly identified\n\nThe phrase helps the reader remember exactly who Shimei is."],
  ],
  "1 Kings 2:13-18": [
    ["Adonijah the Son of Haggith Came to Bath-sheba the Mother of Solomon", "Adonijah approaches Bathsheba because he hopes to reach Solomon through her. The phrase shows him using the queen mother as an avenue back into influence.\n\n👤 Adonijah makes his move carefully\n\n👑 Bathsheba holds access to the king\n\n⚠️ His ambition is not entirely gone\n\nThe phrase opens a politically loaded conversation."],
    ["Comest Thou Peaceably", "Bathsheba asks whether Adonijah comes in peace, showing suspicion about his purpose. Peaceably means with peaceful intent, not hidden danger.\n\n❓ She questions his intent\n\n🧠 Peaceably means in peace\n\n⚠️ Trust is not automatic\n\nThe phrase shows that Adonijah's visit is uneasy from the start."],
    ["He Said Moreover", "Adonijah keeps speaking and presses deeper into his request. The phrase marks the point where he reveals more than his opening words.\n\n🗣 He continues the conversation\n\n📖 More is about to be disclosed\n\n⚠️ The request is unfolding step by step\n\nThe phrase moves the speech toward its real aim."],
    ["I Have Somewhat to Say unto Thee", "Somewhat means something. Adonijah is asking for space to make a request he knows may be delicate.\n\n🧠 Somewhat means something\n\n🗣 He asks to state his case\n\n⚠️ The request is sensitive\n\nThe phrase shows him approaching the matter indirectly."],
  ],
  "1 Kings 2:19-24": [
    ["Bath-sheba Therefore Went unto King Solomon", "Bathsheba goes to Solomon to deliver Adonijah's request. The phrase shows her acting as intercessor between the two men.\n\n👑 She goes before the king\n\n🗣 She carries another person's request\n\n📖 The queen mother becomes the messenger\n\nThe phrase opens the transfer of the petition to Solomon."],
    ["To Speak unto Him for Adonijah", "Bathsheba is speaking on Adonijah's behalf, not her own. The phrase shows the request coming through mediation.\n\n🗣 She intercedes for Adonijah\n\n👤 His request needs another voice\n\n⚠️ The matter is politically delicate\n\nThe phrase makes clear whose cause she is presenting."],
    ["Then She Said", "Bathsheba now states the petition directly. The phrase marks the moment indirect approach becomes explicit request.\n\n🗣 The request is finally spoken\n\n📖 The issue is now on the table\n\n👑 Solomon must answer it directly\n\nThe phrase opens the decisive petition."],
    ["I Desire One Small Petition of Thee", "Bathsheba frames the request as a small petition, though it is politically serious. Petition means an appeal or formal request.\n\n🙏 A request is being made\n\n🧠 Petition means appeal\n\n⚠️ 'Small' does not mean harmless here\n\nThe phrase shows how a great issue can be introduced in soft language."],
  ],
  "1 Kings 2:25-30": [
    ["King Solomon Sent by the Hand of Benaiah the Son of Jehoiada", "Solomon sends Benaiah to carry out judgment on Adonijah. By the hand of Benaiah means through Benaiah as the agent.\n\n👑 Solomon orders the execution\n\n🪖 Benaiah acts as his instrument\n\n⚖️ Royal judgment is now active\n\nThe phrase shows Solomon using delegated authority to enforce the throne."],
    ["He Fell Upon Him That He Died", "Benaiah strikes Adonijah down, and Adonijah dies. Fell upon him is battle-style wording for a killing blow.\n\n⚔️ Judgment is carried out\n\n💀 Adonijah dies\n\n📖 The sentence is executed, not merely announced\n\nThe phrase shows the rebellion ending in death."],
    ["Unto Abiathar the Priest Said the King", "Solomon next turns to Abiathar with a different judgment. The phrase opens a separate sentence for another man involved in Adonijah's cause.\n\n👑 Solomon speaks to Abiathar directly\n\n⚖️ Another case is being addressed\n\n🙏 Priesthood and politics now meet\n\nThe phrase marks the start of Abiathar's judgment."],
    ["Get Thee to Anathoth", "Solomon orders Abiathar to go to Anathoth, his own fields, effectively removing him from priestly power at court. The phrase is exile from influence rather than immediate execution.\n\n🏙 Anathoth becomes his place of removal\n\n🚪 He is sent away from the court\n\n⚖️ Judgment comes with restraint\n\nThe phrase shows Solomon cutting off Abiathar's power."],
  ],
  "1 Kings 2:31-36": [
    ["The King Said unto Him", "Solomon now gives Benaiah direct instructions about Joab. The phrase marks another decisive royal judgment.\n\n👑 Solomon commands again\n\n⚖️ Another case is moving to sentence\n\n🪖 Benaiah remains the executor\n\nThe phrase opens the order concerning Joab."],
    ["Do as He Hath Said", "Solomon tells Benaiah to do what Joab himself has asked in taking hold of the altar rather than being moved elsewhere. The phrase means proceed with the judgment there.\n\n⚖️ The sentence will not be delayed\n\n📖 Solomon accepts Joab's stated terms\n\n👑 The king remains resolute\n\nThe phrase shows royal firmness in carrying out justice."],
    ["The LORD Shall Return His Blood Upon His Own Head", "Solomon says Joab's bloodguilt will come back on him for the murders he committed. Return his blood on his own head means the guilt and penalty rightly fall back on him.\n\n🩸 Bloodguilt returns to the guilty person\n\n⚖️ Joab bears the blame himself\n\n🙏 Solomon frames the judgment under God's justice\n\nThe phrase explains the moral logic behind Joab's execution."],
    ["Who Fell Upon Two Men More Righteous", "Solomon refers to the killing of Abner and Amasa, whom he calls more righteous than Joab. Fell upon means attacked and killed.\n\n⚔️ Two unjust killings are recalled\n\n📖 More righteous means less guilty than Joab\n\n⚖️ Past murders are the basis of judgment\n\nThe phrase identifies the wrongs that now return upon Joab."],
  ],
  "1 Kings 2:37-42": [
    ["For It Shall Be", "Solomon begins setting the clear condition under which Shimei will live or die. The phrase introduces a binding warning.\n\n📜 A condition is being laid down\n\n⚖️ The terms of mercy are specific\n\n👑 Solomon speaks with legal clarity\n\nThe phrase opens the rule Shimei must obey."],
    ["That on the Day Thou Goest Out", "Shimei is warned that the day he leaves the assigned boundary, judgment will follow. The phrase makes the condition precise and concrete.\n\n🚪 Leaving the boundary triggers judgment\n\n📅 The warning is tied to a specific act\n\n⚠️ Mercy comes with limits\n\nThe phrase shows how exact Solomon's terms are."],
    ["Shimei Said unto the King", "Shimei responds to Solomon's condition by agreeing to it. The phrase shows him accepting the terms under which he may live.\n\n🗣 Shimei answers the king\n\n⚖️ He agrees to the condition\n\n🙏 Mercy is received on stated terms\n\nThe phrase marks his acceptance of Solomon's ruling."],
    ["The Saying Is Good", "Shimei says Solomon's word is acceptable and just. The phrase means he agrees the condition is fair.\n\n👍 He accepts the ruling\n\n🧠 Good means fitting or acceptable here\n\n⚖️ The terms are acknowledged as fair\n\nThe phrase shows Shimei consenting to live under the king's command."],
  ],
  "1 Kings 2:43-46": [
    ["Why Then Hast Thou Not Kept the Oath of the LORD", "Solomon asks why Shimei broke the sworn promise made before God. The oath of the LORD means an oath taken under God's name and authority.\n\n❓ Solomon confronts broken promise\n\n🙏 The oath was before God\n\n⚖️ This is not only disobedience to a king but also to a sworn word\n\nThe phrase shows the seriousness of Shimei's breach."],
    ["The Commandment That I Have Charged Thee with", "Solomon reminds Shimei of the command he had personally laid upon him. Charged thee with means solemnly commanded you.\n\n📜 The king's order is recalled\n\n🧠 Charged means solemnly commanded\n\n⚖️ The case is clear and documented\n\nThe phrase reinforces that Shimei knew the command well."],
    ["The King Said Moreover to Shimei", "Solomon continues speaking and presses the moral case further. The phrase shows that the sentence is not rash but reasoned and deliberate.\n\n👑 Solomon says more before judgment\n\n📖 The reasoning is being expanded\n\n⚖️ The king explains as well as condemns\n\nThe phrase opens Solomon's fuller indictment."],
    ["Thou Knowest All the Wickedness Which Thine Heart Is Privy to", "Solomon says Shimei himself knows the evil in his own heart and actions. Privy to means inwardly aware of.\n\n🧠 Shimei knows his own guilt\n\n❤️ The heart is not hidden from the self or from God\n\n⚖️ Inner knowledge supports outer judgment\n\nThe phrase shows that this is a verdict against known wickedness, not mere accident."],
  ],
  "1 Kings 3:1-6": [
    ["Solomon Made Affinity with Pharaoh King of Egypt", "Made affinity means formed an alliance by marriage. Solomon is entering a political marriage with Pharaoh's house.\n\n🤝 Affinity means marriage alliance\n\n👑 Politics and family are being joined\n\n🌍 Solomon is acting on an international scale\n\nThe phrase explains that this marriage is also a state alliance."],
    ["Took Pharaoh’s Daughter", "Solomon marries Pharaoh's daughter as part of that alliance. The phrase keeps the political marriage concrete and personal.\n\n👰 Pharaoh's daughter becomes Solomon's wife\n\n🤝 The alliance is sealed by marriage\n\n👑 Royal policy enters the household\n\nThe phrase shows how diplomacy becomes family reality."],
    ["Only the People Sacrificed in High Places", "High places were local worship sites on hills or raised areas. The phrase means worship was still happening at scattered altars because the temple had not yet been built.\n\n⛰ High places were local worship sites\n\n🙏 Sacrifice was still decentralized\n\n⚠️ This was a temporary and imperfect situation\n\nThe phrase explains the worship pattern before the temple existed."],
    ["Because There Was No House Built unto the Name of the LORD", "A house for the name of the LORD means the temple, the set place for His worship. It had not yet been built, which explains the continued use of high places.\n\n🏛 The temple does not yet exist\n\n🙏 The LORD's name points to His worship and presence\n\n📖 This explains the worship setting of the chapter\n\nThe phrase answers why the people were still sacrificing elsewhere."],
  ],
  "1 Kings 3:7-12": [
    ["O LORD My God", "Solomon begins his prayer with reverence and dependence. The phrase is personal, humble, and worshipful.\n\n🙏 Solomon prays directly to God\n\n👑 The king begins in dependence\n\n📖 The tone is humble before it is royal\n\nThe phrase shows wisdom beginning with reverent prayer."],
    ["Thou Hast Made Thy Servant King Instead of David My Father", "Solomon acknowledges that God placed him on the throne after David. Calling himself God's servant shows he sees the kingship as received, not self-created.\n\n👑 God made him king\n\n🙇 Solomon still calls himself servant\n\n📖 Kingship is received from God\n\nThe phrase shows humility about his position."],
    ["Thy Servant Is in the Midst of Thy People Which Thou Hast Chosen", "Solomon says he stands among God's chosen people, not merely his own subjects. The phrase reminds us that Israel belongs first to God.\n\n👥 Israel is God's chosen people\n\n👑 Solomon rules among them as servant king\n\n🙏 The nation is God's before it is Solomon's\n\nThe phrase shows why ruling them requires more than human skill."],
    ["A Great People", "Great people here means numerous and significant, too many to govern lightly. Solomon is describing the size and weight of his responsibility.\n\n🔢 The people are many\n\n👑 The task of ruling is large\n\n🧠 Solomon feels the scale of the burden\n\nThe phrase explains why he asks for wisdom rather than riches."],
  ],
  "1 Kings 3:13-18": [
    ["I Have Also Given Thee That Which Thou Hast Not Asked", "God gives Solomon more than wisdom by adding gifts he did not request. The phrase shows divine generosity beyond the prayer itself.\n\n🎁 God gives more than requested\n\n🙏 Wisdom does not cancel further blessing\n\n👑 The king receives unexpected gifts too\n\nThe phrase shows grace exceeding the exact petition."],
    ["So That There Shall Not Be Any Among the Kings Like unto Thee All Thy Days", "God promises that no king of Solomon's time will match him in glory and favor. The phrase is about exceptional royal greatness.\n\n👑 Solomon will be unmatched among his contemporaries\n\n✨ The promise is unusually high\n\n📖 God Himself is the source of that greatness\n\nThe phrase explains the scale of what God is giving him."],
    ["If Thou Wilt Walk in My Ways", "This is a condition of obedient living before God. To walk in God's ways means to live according to His commands and pattern.\n\n🚶 Walk means live or conduct yourself\n\n🙏 Obedience is still required\n\n⚖️ Blessing does not remove covenant responsibility\n\nThe phrase shows that Solomon's future still depends on faithful living."],
    ["To Keep My Statutes", "Statutes are God's fixed commands and established laws. Keeping them means obeying what God has set down.\n\n📜 Statutes are God's set commands\n\n🙏 Obedience must be concrete\n\n👑 A king also lives under law\n\nThe phrase shows that wisdom and blessing must be joined to obedience."],
  ],
  "1 Kings 3:19-24": [
    ["This Woman’s Child Died in the Night", "The first woman says the other woman's baby died during the night. The phrase opens the disputed case around the two mothers and the living child.\n\n👶 One baby has died\n\n🌙 The event happened at night\n\n⚖️ The case begins with tragedy and conflict\n\nThe phrase introduces the central fact being argued over."],
    ["Because She Overlaid It", "Overlaid it means she accidentally lay on the baby while sleeping and smothered it. The old wording needs explanation for a modern reader.\n\n🛏 The baby was smothered in sleep\n\n🧠 Overlaid means lay on accidentally\n\n💔 The death is described as tragic negligence\n\nThe phrase explains how the child died in the accuser's telling."],
    ["She Arose at Midnight", "The woman says the other mother got up in the middle of the night after the death. The phrase moves the story into the alleged exchange of babies.\n\n🌙 It happens at midnight\n\n🚶 She gets up secretly\n\n⚠️ The turning point happens while others sleep\n\nThe phrase marks the moment the deception is said to begin."],
    ["Took My Son from Beside Me", "The claim is that the living baby was taken away from beside the true mother while she slept. The phrase is the heart of the dispute over identity.\n\n👶 The living child was taken\n\n😴 The mother was sleeping\n\n⚖️ The case turns on this accusation\n\nThe phrase states the theft that Solomon must judge."],
  ],
  "1 Kings 3:25-28": [
    ["The King Said", "Solomon now gives the shocking command that will reveal the true mother. The phrase marks the moment his wisdom becomes active judgment.\n\n👑 Solomon speaks as judge\n\n⚖️ The decisive test is coming\n\n🧠 Wisdom will now be shown in action\n\nThe phrase opens the ruling that exposes the truth."],
    ["Divide the Living Child in Two", "Solomon's command is a test, not a real desire to destroy the child. He orders division to force the women's hearts into the open.\n\n⚠️ The command is meant to reveal truth\n\n👶 The living child is at the center\n\n🧠 Wisdom is using a severe test\n\nThe phrase shows the strategy behind Solomon's shocking words."],
    ["Then Spake the Woman Whose the Living Child Was unto the King", "The true mother speaks up to save the child rather than claim him at all costs. The phrase identifies her by the compassion that follows.\n\n👩 The true mother finally reveals herself\n\n🗣 Her words are driven by love, not possession\n\n👶 The child matters more than her claim\n\nThe phrase prepares the reader to see truth through mercy."],
    ["For Her Bowels Yearned Upon Her Son", "Bowels yearned is old Bible language for deep inward compassion. It means her whole inner being was moved with motherly love for her child.\n\n❤️ Deep compassion fills her\n\n🧠 Old wording for inward mercy is being defined\n\n👶 Her love exposes the truth\n\nThe phrase explains the emotion that proves she is the real mother."],
  ],
};

function rewriteDay82RoyalSection(section: RoyalPhraseSectionInput): RoyalPhraseSectionInput {
  const overrides = DAY_82_ROYAL_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const DAY_83_ROYAL_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "1 Kings 4:1-6": [
    ["So King Solomon Was King Over All Israel", "This means Solomon is now established as ruler over the whole nation, not just a contested claimant. The phrase announces settled kingship after the succession struggle.\n\n👑 Solomon is firmly reigning\n\n👥 All Israel is under him\n\n📖 The transition of power is complete\n\nThe phrase opens the chapter with stability after earlier uncertainty."],
    ["Was King Over All Israel.", "The repeated wording stresses the breadth of Solomon's rule. Scripture wants the reader to feel that the whole kingdom is now gathered under one king.\n\n📜 The point is repeated\n\n👑 Solomon's rule is national\n\n🤝 The kingdom is unified under him\n\nThe phrase reinforces the completeness of his reign."],
    ["These Were the Princes Which He Had", "Princes here means high officials or chief administrators serving under Solomon. The phrase begins listing the men who help govern the kingdom.\n\n🏛 Leading officials are being listed\n\n👑 Solomon rules through organized administration\n\n📖 The kingdom needs structure, not just a throne\n\nThe phrase introduces Solomon's governing team."],
    ["Azariah the Son of Zadok the Priest", "Azariah is identified by both name and family line, linking him to Zadok the priest. The phrase helps the reader see priestly and royal service working closely together.\n\n👤 Azariah is named clearly\n\n🙏 He comes from Zadok's line\n\n🏛 Family background matters in royal service\n\nThe phrase shows how key offices were tied to known households."],
  ],
  "1 Kings 4:7-12": [
    ["Solomon Had Twelve Officers Over All Israel", "These twelve officers oversaw provisions and administration across the kingdom. The number helps organize the nation into districts for supporting the royal house.\n\n👥 Twelve officers are appointed\n\n🏛 The kingdom is being administratively divided\n\n👑 Royal support is carefully organized\n\nThe phrase shows Solomon governing through a planned system."],
    ["Which Provided Victuals for the King", "Victuals means food and supplies. These officers were responsible for making sure the king's household had what it needed.\n\n🍞 Victuals means provisions\n\n👑 The royal court had to be supplied regularly\n\n🏛 Administration included daily material support\n\nThe phrase explains one of the officers' main duties."],
    ["These Are Their Names", "The verse now starts listing the officials one by one. Naming them makes the system concrete rather than vague.\n\n📜 The officials are named specifically\n\n👤 Real people hold these roles\n\n🏛 The government is structured and recorded\n\nThe phrase introduces the detailed roster."],
    ["The Son of Hur", "This official is identified through his father rather than by a personal name here. The phrase reflects an older way of identifying people by family line.\n\n🧬 Family identification is being used\n\n📖 A father can serve as the key marker of identity\n\n🏛 The list stays rooted in known households\n\nThe phrase shows how official records often worked through lineage."],
  ],
  "1 Kings 4:13-18": [
    ["The Son of Geber", "This official is again identified by his father rather than by a personal name in the text. The phrase continues the administrative list through family-based identification.\n\n🧬 Identity is tied to family line\n\n🏛 He holds an official district role\n\n📜 The roster continues in formal style\n\nThe phrase keeps the administrative record moving."],
    ["To Him Pertained the Towns of Jair the Son of Manasseh", "Pertained means belonged or were assigned to his jurisdiction. The phrase tells which territory this officer oversaw.\n\n🗺 Territory is being assigned\n\n🏙 Towns fall under his care\n\n🏛 The kingdom is divided into manageable regions\n\nThe phrase explains the district connected to this officer."],
    ["Ahinadab the Son of Iddo Had Mahanaim", "This means Ahinadab was responsible for the district of Mahanaim. The phrase ties a named official to a known region.\n\n👤 The officer is named\n\n🏙 Mahanaim is his district\n\n📖 Each region has a responsible leader\n\nThe phrase keeps linking administrators to places."],
    ["Of Iddo Had Mahanaim:", "The shortened repeated wording still points to Ahinadab's connection with Mahanaim. Scripture is preserving the official mapping of person to place.\n\n📜 The link between man and district is repeated\n\n🏙 Mahanaim stays in focus\n\n🏛 Administrative geography matters here\n\nThe phrase reinforces the regional assignment."],
  ],
  "1 Kings 4:19-24": [
    ["Geber the Son of Uri Was in the Country of Gilead", "Geber served over the region of Gilead, east of the Jordan. The phrase continues the listing of Solomon's district officers and their territories.\n\n👤 Another officer is identified\n\n🌍 Gilead is his region\n\n🏛 Solomon's rule stretches across distant areas\n\nThe phrase keeps building the picture of kingdom-wide administration."],
    ["In the Country of Sihon King of the Amorites", "This identifies the area by its earlier rulers, helping the reader locate it historically. The phrase connects present Israelite administration to older conquered lands.\n\n📖 Old regional history is recalled\n\n🌍 The territory once belonged to former kings\n\n🏛 Solomon now governs what earlier enemies once ruled\n\nThe phrase gives historical depth to the district."],
    ["Israel Were Many", "The phrase means the people of Israel had become very numerous. It echoes old promises about the growth of Abraham's descendants.\n\n👥 Israel is numerous\n\n📖 Population growth fulfills old promises\n\n👑 Solomon rules a large people\n\nThe phrase stresses abundance in the kingdom."],
    ["As the Sand Which Is by the Sea in Multitude", "This simile compares Israel's numbers to countless grains of sand by the sea. It is a picture of very great multiplication.\n\n🏖 Sand by the sea means immense number\n\n📖 The wording echoes covenant promise language\n\n👥 The people are too many to count easily\n\nThe phrase uses a familiar biblical image for abundance."],
  ],
  "1 Kings 4:25-30": [
    ["Israel Dwelt Safely", "This means the people lived in security without constant fear of invasion or unrest. The phrase presents Solomon's reign as a time of peace.\n\n🕊 The land is at peace\n\n👥 People feel secure\n\n👑 Solomon's rule brings stability\n\nThe phrase sums up the safety of the kingdom."],
    ["Every Man Under His Vine", "To sit under one's vine is picture language for peaceful settled life at home. It means people can enjoy their property without fear.\n\n🍇 Vine stands for home prosperity\n\n🕊 The image is one of settled peace\n\n🏠 People enjoy safety on their own land\n\nThe phrase gives a vivid picture of secure everyday life."],
    ["Solomon Had Forty Thousand Stalls of Horses for His Chariots", "A stall is a place where horses are kept. The phrase shows Solomon's large military and royal resources.\n\n🐎 Many horses are maintained\n\n🏛 Large infrastructure supports the kingdom\n\n👑 Solomon's wealth and power are substantial\n\nThe phrase reveals the scale of royal provision."],
    ["Twelve Thousand Horsemen", "Horsemen are mounted troops or cavalrymen. The phrase adds to the picture of military strength under Solomon.\n\n🐎 Mounted forces are numerous\n\n⚔️ The kingdom is strongly equipped\n\n👑 Royal power includes organized defense\n\nThe phrase shows another measure of Solomon's resources."],
  ],
  "1 Kings 4:31-34": [
    ["For He Was Wiser Than All Men", "The phrase means Solomon's wisdom surpassed that of all the famous wise men around him. It is an exceptional statement about understanding, not just cleverness.\n\n🧠 Solomon's wisdom is unmatched\n\n📖 His reputation reaches beyond Israel\n\n👑 Wisdom is central to his reign\n\nThe phrase states the extraordinary level of his insight."],
    ["Than Ethan the Ezrahite", "Ethan is named as one of the known wise men whom Solomon surpassed. The phrase helps the reader compare Solomon to respected wisdom figures of the time.\n\n👤 Ethan was a recognized wise man\n\n🧠 Solomon is measured against real famous men\n\n📖 The comparison makes the claim concrete\n\nThe phrase shows that Solomon's wisdom excelled acknowledged standards."],
    ["He Spake Three Thousand Proverbs", "A proverb is a short wise saying, and the phrase tells us Solomon produced many of them. It highlights the breadth of his teaching.\n\n📜 Proverbs are wise sayings\n\n🔢 Three thousand suggests great abundance\n\n🧠 Solomon's wisdom became spoken teaching\n\nThe phrase shows how widely his wisdom expressed itself."],
    ["His Songs Were a Thousand", "This means Solomon also composed many songs, not only wise sayings. The phrase shows that his gifts included poetry and music as well as judgment.\n\n🎵 Solomon wrote songs too\n\n🧠 His wisdom reached into art and poetry\n\n🔢 The number shows abundance again\n\nThe phrase broadens the picture of his giftedness."],
  ],
  "1 Kings 5:1-6": [
    ["Hiram King of Tyre Sent His Servants unto Solomon", "Hiram, the ruler of Tyre, sends messengers to Solomon after hearing of his kingship. The phrase opens a diplomatic relationship between two kingdoms.\n\n👑 A foreign king reaches out\n\n🤝 Diplomacy begins\n\n🌍 Solomon's reign is recognized beyond Israel\n\nThe phrase starts the alliance that will help build the temple."],
    ["For He Had Heard That They Had Anointed Him King in the Room of His Father", "In the room of his father means in his father's place. Hiram hears Solomon has succeeded David on the throne.\n\n👂 Hiram learns of the succession\n\n👑 Solomon is king in David's place\n\n📖 The kingship is publicly known\n\nThe phrase explains why Hiram contacts him."],
    ["Solomon Sent to Hiram", "Solomon answers by sending a message back to Hiram. The phrase begins his formal request for partnership.\n\n🗣 Solomon responds diplomatically\n\n🤝 A negotiated project is beginning\n\n👑 The new king acts with initiative\n\nThe phrase opens Solomon's side of the exchange."],
    ["To Hiram, Saying", "The verse introduces the content of Solomon's message. Saying marks the start of the king's request in direct terms.\n\n📜 The message is about to be stated\n\n👑 Solomon's words matter for the project ahead\n\n🤝 The relationship becomes practical here\n\nThe phrase prepares the reader for the specific proposal."],
  ],
  "1 Kings 5:7-12": [
    ["It Came to Pass", "This is a simple story marker that moves the account into Hiram's response. It helps the reader follow the sequence of the agreement.\n\n🕰 The narrative moves forward\n\n📖 Another step in the arrangement begins\n\n🤝 The reply is coming\n\nThe phrase marks the turn to Hiram's answer."],
    ["When Hiram Heard the Words of Solomon", "Hiram listens to Solomon's request and understands what is being asked. The phrase highlights the hearing that leads to his glad response.\n\n👂 Hiram hears carefully\n\n📜 Solomon's proposal is received\n\n🤝 The alliance depends on this hearing\n\nThe phrase opens Hiram's reaction to the request."],
    ["Hiram Sent to Solomon", "Hiram sends his answer back to Solomon. The phrase keeps the diplomatic exchange balanced between the two kings.\n\n🗣 Hiram responds formally\n\n🤝 The partnership is negotiated through messages\n\n👑 Two kingdoms are cooperating\n\nThe phrase marks the answering message."],
    ["I Have Considered the Things Which Thou Sentest to Me for", "Considered means understood and taken thought about. Hiram is saying he has carefully weighed Solomon's request.\n\n🧠 Hiram has thought it through\n\n📜 The request has been understood\n\n🤝 He is ready to answer with intention\n\nThe phrase shows thoughtful agreement rather than casual approval."],
  ],
  "1 Kings 5:13-18": [
    ["King Solomon Raised a Levy Out of All Israel", "A levy is a forced labor draft or required work service. Solomon gathers men from Israel for the large building project.\n\n👥 Workers are drafted\n\n🏛 The project requires national labor\n\n🧠 Levy means required service\n\nThe phrase explains how Solomon secured manpower."],
    ["The Levy Was Thirty Thousand Men", "The phrase gives the number of men assigned to this labor force. It shows the scale of the workforce behind the temple project.\n\n🔢 Thirty thousand men are counted\n\n🏛 The project is very large\n\n👥 National resources are heavily involved\n\nThe phrase shows how extensive the labor demand was."],
    ["He Sent Them to Lebanon Ten Thousand a Month by Courses", "The workers were sent in rotating groups to Lebanon, ten thousand at a time. By courses means by scheduled shifts.\n\n🌲 Lebanon is where the timber work happens\n\n🔁 The labor is rotated in shifts\n\n🧠 Courses means orderly turns\n\nThe phrase shows how Solomon organized the workforce."],
    ["A Month They Were in Lebanon", "Each labor group spent a month working in Lebanon before rotating home. The phrase explains the rhythm of the service.\n\n📅 One month at a time is assigned\n\n🔁 Work and return are structured\n\n🏛 The labor system is carefully managed\n\nThe phrase clarifies the schedule of the levy."],
  ],
  "1 Kings 6:1-6": [
    ["It Came to Pass in the Four Hundred", "The verse anchors the temple's beginning in Israel's long history after the Exodus. The phrase signals that this building moment is part of a bigger covenant timeline.\n\n📅 A major historical marker is given\n\n📖 The temple is tied to the Exodus story\n\n🏛 This moment fulfills a long movement in Israel's life\n\nThe phrase places the temple within redemptive history."],
    ["Eightieth Year After the Children of Israel Were Come Out of the Land of Egypt", "The temple is dated from the Exodus, which means the house of the LORD is being built in continuity with God's deliverance of Israel from Egypt.\n\n🌊 Egypt is still the great rescue reference point\n\n📅 The timeline reaches back to redemption\n\n🏛 Temple worship grows out of delivered peoplehood\n\nThe phrase explains why the date is measured from the Exodus."],
    ["The House Which King Solomon Built for the LORD", "The house here means the temple, the permanent worship building for the LORD. It is not Solomon's private residence but God's house.\n\n🏛 The house means the temple\n\n🙏 It is built for the LORD\n\n👑 Solomon is the builder, but not the owner\n\nThe phrase defines what this great building is for."],
    ["The Length Thereof Was Threescore Cubits", "Threescore means sixty, and cubits are ancient units of measurement roughly based on the forearm. The phrase begins describing the temple's dimensions.\n\n🧠 Threescore means sixty\n\n📏 A cubit is an ancient measure\n\n🏛 The temple is being described carefully\n\nThe phrase helps the reader understand the building's size."],
  ],
  "1 Kings 6:7-12": [
    ["When It Was in Building", "The phrase refers to the temple while it was being built. It opens a detail about the unusual quietness and preparation of the construction process.\n\n🏛 The temple is under construction\n\n📖 The building process itself matters\n\n🧠 The verse is about how it was built, not just that it was built\n\nThe phrase introduces the method of construction."],
    ["Was Built of Stone Made Ready Before It Was Brought Thither", "The stones were finished and shaped before arriving at the temple site. This meant the building area stayed quiet from heavy cutting work.\n\n🪨 Stones were prepared in advance\n\n🔇 The site itself remained quiet\n\n🏛 Care and reverence shaped the process\n\nThe phrase explains the unusual construction method."],
    ["The Door for the Middle Chamber Was in the Right Side of the House", "The middle chamber was one level of side rooms attached to the temple, and its entrance was on the right side. The phrase describes the building's layout.\n\n🚪 A side entrance is being described\n\n🏛 The temple had attached chambers\n\n📏 The layout is carefully planned\n\nThe phrase helps the reader picture the structure."],
    ["They Went Up with Winding Stairs into the Middle Chamber", "Winding stairs are spiral or turning stairs that lead upward through the side chambers. The phrase explains how the upper parts were reached.\n\n🌀 The stairs turn upward\n\n⬆️ Access between levels is built in\n\n🏛 The temple had multiple levels around it\n\nThe phrase gives a practical detail of movement within the structure."],
  ],
  "1 Kings 6:13-18": [
    ["I Will Dwell Among the Children of Israel", "God promises His presence among His people in connection with the temple. Dwell among means live in their midst in covenant nearness.\n\n🙏 God's presence is the heart of the temple\n\n👥 Israel is meant to live near Him\n\n🏛 The building exists for covenant presence\n\nThe phrase explains the deepest purpose of the house."],
    ["Will Not Forsake My People Israel", "Forsake means abandon or leave behind. God promises not to desert Israel if they remain under His covenant ways.\n\n🤝 God promises faithful presence\n\n🧠 Forsake means abandon\n\n👥 Israel is not meant to be left alone\n\nThe phrase shows the covenant comfort attached to God's dwelling."],
    ["So Solomon Built the House", "The phrase resumes the building work after God's promise. It shows Solomon continuing the project under the assurance of divine purpose.\n\n🏛 Solomon keeps building\n\n🙏 The work continues under God's word\n\n📖 Promise and action stay connected\n\nThe phrase ties construction to obedience and purpose."],
    ["The House, and Finished It.", "Solomon completes the building of the temple. Finished it means the structure was brought to completion, not left half done.\n\n✅ The project is completed\n\n🏛 The temple stands finished\n\n👑 Solomon fulfills the building task\n\nThe phrase marks the accomplishment of the central structure."],
  ],
  "1 Kings 6:19-24": [
    ["The Oracle He Prepared in the House Within", "The oracle is the inner sanctuary, the Most Holy Place, deep inside the temple. The phrase names the holiest room in the house.\n\n🏛 The oracle means the inner holy room\n\n📖 It is the innermost sanctuary\n\n🙏 This is the most sacred space in the temple\n\nThe phrase defines a key temple word a new reader would not know."],
    ["To Set There the Ark of the Covenant of the LORD", "The inner sanctuary was prepared to hold the ark, the sacred chest representing God's covenant presence with Israel.\n\n📦 The ark belongs in the innermost room\n\n🙏 Covenant presence is central there\n\n🏛 The room is prepared for God's holy symbol\n\nThe phrase explains what the oracle was for."],
    ["The Oracle in the Forepart Was Twenty Cubits in Length", "The verse gives the dimensions of the inner sanctuary. Forepart here refers to the front measure of that room.\n\n📏 The inner room is being measured\n\n🧠 Cubits are temple measurements\n\n🏛 The holy place is defined with precision\n\nThe phrase helps the reader follow the structure's proportions."],
    ["Twenty Cubits in Breadth", "Breadth means width. The phrase continues the room's measurements so the reader can picture its shape.\n\n📏 Breadth means width\n\n🏛 The room's proportions are carefully stated\n\n📖 Measurement shows ordered design\n\nThe phrase explains another part of the inner sanctuary's dimensions."],
  ],
  "1 Kings 6:25-30": [
    ["The Other Cherub Was Ten Cubits", "The second cherub matched the first in size. A cherub here is a great carved angelic figure placed in the Most Holy Place.\n\n👼 Cherubs are large symbolic figures\n\n📏 This one matches the first in size\n\n🏛 The room is filled with balanced holy imagery\n\nThe phrase shows the symmetry of the inner sanctuary."],
    ["Both the Cherubims Were of One Measure", "This means both cherubim had the same measurements. One measure means equal size and proportion.\n\n📏 The two figures are equal\n\n🏛 Symmetry matters in the design\n\n📖 Holy artistry is precise\n\nThe phrase emphasizes deliberate matching in the sanctuary."],
    ["The Height of the One Cherub Was Ten Cubits", "The figure stood ten cubits high, showing the immense scale of the carved cherubim. The phrase gives a vertical sense of the room's sacred grandeur.\n\n⬆️ The cherub is very tall\n\n📏 The height is specified\n\n🏛 The room contains towering sacred forms\n\nThe phrase helps the reader feel the size of the holy furnishings."],
    ["So Was It of the Other Cherub", "The second cherub had the same height and dimensions. The repeated statement reinforces exact correspondence.\n\n📜 The equality is repeated\n\n📏 Both figures match completely\n\n🏛 Design unity is stressed\n\nThe phrase reinforces the careful balance of the room."],
  ],
  "1 Kings 6:31-36": [
    ["For the Entering of the Oracle He Made Doors of Olive Tree", "Olive tree wood was used to make the doors leading into the inner sanctuary. The phrase describes the entrance to the holiest part of the temple.\n\n🚪 Special doors guard the holy room\n\n🌿 Olive wood is used\n\n🏛 The inner sanctuary is separated and marked off\n\nThe phrase explains how access to the oracle was framed."],
    ["Side Posts Were a Fifth Part of the Wall", "The posts around the doorway took up a fifth of the wall space. The phrase gives a technical architectural detail about the opening.\n\n📏 The doorway proportions are described\n\n🏛 The entrance is carefully measured\n\n📖 Even small details are ordered\n\nThe phrase helps the reader track the temple's design."],
    ["The Two Doors Also Were of Olive Tree", "The actual doors were made of olive wood as well. The phrase continues describing the materials used in this sacred entrance.\n\n🚪 The doors match the holy setting\n\n🌿 Olive wood remains the material\n\n🏛 Materials carry dignity and beauty\n\nThe phrase adds another concrete detail of the sanctuary entrance."],
    ["He Carved Upon Them Carvings of Cherubims", "The doors were decorated with carved cherubim and other sacred designs. The phrase shows that even the entrance itself carried symbolic worship imagery.\n\n👼 Cherubim appear in the carvings\n\n🪵 The doors are richly worked\n\n🙏 Sacred art covers the temple entrance\n\nThe phrase explains the meaning-filled decoration of the doors."],
  ],
  "1 Kings 6:37-38": [
    ["In the Fourth Year Was the Foundation of the House of the LORD Laid", "The foundation was laid in the fourth year of Solomon's reign. The phrase marks the official beginning of temple construction.\n\n🏛 The building starts with the foundation\n\n📅 A precise regnal year is given\n\n📖 The work is historically anchored\n\nThe phrase shows when the project truly began."],
    ["In the Month Zif", "Zif is the old Hebrew name for the second month. The phrase gives the calendar setting for the beginning of the work.\n\n🗓 Zif is a calendar month name\n\n🧠 An older month term is being defined\n\n📖 The start date is precise\n\nThe phrase helps the reader understand the ancient dating."],
    ["In the Eleventh Year", "This marks the reign-year when the temple was completed. The phrase shows the project lasted several years.\n\n📅 The completion year is given\n\n🏛 The work took time\n\n📖 The temple was not rushed\n\nThe phrase marks the far end of the building timeline."],
    ["In the Month Bul", "Bul is the old Hebrew name for the eighth month. The phrase gives the exact calendar placement for the completion of the temple.\n\n🗓 Bul is another ancient month name\n\n🧠 The completion date is specific\n\n🏛 The project ends in a marked season\n\nThe phrase helps place the temple's finishing in time."],
  ],
  "1 Kings 7:1-6": [
    ["But Solomon Was Building His Own House Thirteen Years", "Solomon also built his own palace complex, and it took thirteen years. The phrase shows that his royal building work extended far beyond the temple.\n\n🏠 Solomon's own house is a major project\n\n📅 It took thirteen years\n\n👑 The king's palace work was extensive\n\nThe phrase introduces the royal buildings alongside the temple."],
    ["He Finished All His House", "This means Solomon completed the whole palace complex. The phrase marks the end of a long royal construction project.\n\n✅ The palace work is finished\n\n🏠 Multiple buildings are included in 'his house'\n\n📖 The royal complex is now complete\n\nThe phrase closes the palace-building effort."],
    ["He Built Also the House of the Forest of Lebanon", "This was a large hall or palace building named for its cedar timber, not a literal forest. The phrase introduces one of Solomon's grand royal structures.\n\n🌲 The name comes from cedar, not from location in a forest\n\n🏠 It is a royal building\n\n👑 Solomon's court architecture is elaborate\n\nThe phrase explains a title that could confuse a new reader."],
    ["The Length Thereof Was an Hundred Cubits", "The building's dimensions are now being described, starting with its length. An hundred cubits means one hundred ancient cubits.\n\n📏 The size is being measured\n\n🧠 Cubits are ancient units\n\n🏠 The building is very large\n\nThe phrase begins the description of its scale."],
  ],
  "1 Kings 7:7-12": [
    ["Then He Made a Porch for the Throne Where He Might Judge", "This was a hall where Solomon sat to give judgments. A porch for the throne means a formal place of royal justice.\n\n👑 The throne room includes judgment\n\n⚖️ Solomon rules by hearing cases there\n\n🏛 Architecture supports kingship and justice\n\nThe phrase explains the purpose of this royal porch."],
    ["Even the Porch of Judgment", "The phrase names the same hall by its function. It was the place where Solomon rendered decisions.\n\n⚖️ Judgment is its defining purpose\n\n🏛 The hall is officially tied to justice\n\n👑 Kingship includes legal responsibility\n\nThe phrase gives a functional title to the building."],
    ["His House Where He Dwelt Had Another Court Within the Porch", "Solomon's personal residence included another inner court beyond the public area. The phrase distinguishes private royal living space from official halls.\n\n🏠 Private residence is separate from public halls\n\n🚪 Another inner court exists\n\n👑 Palace life has layers of access\n\nThe phrase helps the reader picture the palace layout."],
    ["Which Was of the Like Work", "This means the construction style matched the earlier work. The phrase shows consistency in design across Solomon's buildings.\n\n🪵 The workmanship matches\n\n🏛 Design remains consistent\n\n📖 The buildings belong to one coherent complex\n\nThe phrase notes continuity of craftsmanship."],
  ],
  "1 Kings 7:13-18": [
    ["King Solomon Sent", "Solomon sends for a skilled craftsman to help with the temple furnishings. The phrase opens the account of Hiram the artisan.\n\n👑 Solomon takes initiative\n\n🏛 Specialist help is needed\n\n📖 The building now moves into detailed furnishing work\n\nThe phrase marks the next phase of temple construction."],
    ["Fetched Hiram Out of Tyre", "This Hiram is the craftsman from Tyre, not the king. Fetched means brought or summoned for skilled work.\n\n👤 An artisan named Hiram is brought in\n\n🏙 He comes from Tyre\n\n🛠 Foreign skill is enlisted for sacred work\n\nThe phrase explains who this Hiram is and why he is here."],
    ["He Was a Widow’s Son of the Tribe of Naphtali", "Hiram's mother was from the tribe of Naphtali and his father was Tyrian. The phrase gives his mixed background and social identity.\n\n👩 His mother was an Israelite widow\n\n🧬 He has tribal and Tyrian ties\n\n📖 His background explains his fit for the work\n\nThe phrase identifies the craftsman's family situation clearly."],
    ["His Father Was a Man of Tyre", "Hiram's father came from Tyre and likely passed on metalworking skill. The phrase completes the picture of his heritage.\n\n🏙 His father was Tyrian\n\n🛠 Skill may be tied to that heritage\n\n🧬 Both sides of his background matter\n\nThe phrase fills out the artisan's identity."],
  ],
  "1 Kings 7:19-24": [
    ["The Chapiters That Were Upon the Top of the Pillars Were of Lily Work in the Porch", "Chapiters are capitals, the decorated tops of pillars. Lily work means the carving resembled lily flowers.\n\n🏛 Chapiters means pillar tops\n\n🌸 Lily work describes floral decoration\n\n🪵 The temple furnishings are richly ornamented\n\nThe phrase explains two old architectural terms at once."],
    ["That Were Upon the Top", "This shortened line still refers to the decorated tops of the pillars. The phrase keeps the reader's attention on the upper ornamental part.\n\n⬆️ The top portion is in view\n\n🏛 The decoration sits above the shaft\n\n📖 The description stays architectural\n\nThe phrase narrows attention to the upper section."],
    ["The Top of the Pillars", "This is another way of speaking of the capitals or chapiters. The verse is carefully describing the parts of the great bronze pillars.\n\n🏛 Pillar tops are being described\n\n🧠 This is the same feature in simpler wording\n\n📏 The temple furniture is described piece by piece\n\nThe phrase clarifies what part is being measured and decorated."],
    ["The Chapiters Upon the Two Pillars Had Pomegranates Also Above", "The capitals were decorated not only with lilies but also with pomegranate designs. Pomegranates often symbolized fruitfulness and beauty.\n\n🍎 Pomegranate designs are added\n\n🌸 The decoration is layered and rich\n\n🏛 Sacred beauty is carefully crafted\n\nThe phrase shows that the pillar tops carried multiple symbolic ornaments."],
  ],
  "1 Kings 7:25-30": [
    ["It Stood Upon Twelve Oxen", "The great bronze sea rested on twelve oxen figures beneath it. The phrase describes the support structure of the large basin.\n\n🐂 Twelve oxen support it\n\n🏛 The basin stands on sculpted figures\n\n📖 The design is both functional and symbolic\n\nThe phrase explains what held up the great sea."],
    ["Three Looking Toward the North", "The oxen were arranged in groups facing the four directions. This phrase names one directional set.\n\n🧭 The figures face outward by direction\n\n🐂 The arrangement is orderly\n\n🏛 The design is symmetrical\n\nThe phrase helps the reader picture how the oxen were positioned."],
    ["It Was an Hand Breadth Thick", "A hand breadth is a small unit about the width of a hand. The phrase gives the thickness of the bronze basin's rim or wall.\n\n✋ A hand breadth is a measurement\n\n📏 The basin is thick and substantial\n\n🏛 The object is massive and durable\n\nThe phrase explains the sturdiness of the sea."],
    ["The Brim Thereof Was Wrought Like the Brim of a Cup", "The brim or rim was shaped like the flared edge of a cup. Wrought means crafted or made.\n\n🧠 Wrought means crafted\n\n🥣 The rim curves outward like a cup\n\n🏛 The object combines strength with artistry\n\nThe phrase helps the reader imagine the basin's shape."],
  ],
  "1 Kings 7:31-36": [
    ["The Mouth of It Within the Chapiter", "The mouth means the opening at the top of the laver stand structure. The phrase describes how the upper opening fit into the decorated top section.\n\n🕳 The opening is being described\n\n🏛 The structure has distinct upper parts\n\n📏 Technical detail matters in the design\n\nThe phrase helps decode a difficult architectural line."],
    ["Above Was a Cubit", "A cubit is an ancient length unit, and the phrase gives the height of the opening or upper section. The text is carefully measuring the piece.\n\n📏 A cubit is a set measure\n\n⬆️ Height is being specified\n\n🏛 The object is described precisely\n\nThe phrase explains a compact but important measurement."],
    ["Under the Borders Were Four Wheels", "The stands had wheels beneath their framed sides, showing they were movable structures. Borders here refers to the side panels or frames.\n\n🛞 The base is mobile\n\n🧠 Borders means framed sides here\n\n🏛 Temple furnishings could be moved as needed\n\nThe phrase explains the practical design of the stands."],
    ["The Axletrees of the Wheels Were Joined to the Base", "Axletrees are axles. The phrase means the wheels were firmly attached to the stand's base.\n\n🛞 Axletrees means axles\n\n🔩 The wheels are structurally connected\n\n🏛 The stand is engineered, not decorative only\n\nThe phrase explains how the moving parts were fixed in place."],
  ],
  "1 Kings 7:37-42": [
    ["After This Manner He Made the Ten Bases", "After this manner means in this same pattern or design. All ten bases were made to the same specification.\n\n🔁 One design is repeated\n\n🏛 The ten bases match each other\n\n📖 Consistency is part of the craftsmanship\n\nThe phrase shows patterned workmanship across the set."],
    ["All of Them Had One Casting", "One casting means they were all made from the same mold or according to the same cast form. The phrase stresses uniform production.\n\n🧠 Casting refers to metal forming\n\n🔁 All ten are uniform\n\n🏛 Precision and repetition matter here\n\nThe phrase explains why the bases matched so exactly."],
    ["Then Made He Ten Lavers of Brass", "Lavers are large basins for washing, and brass here means bronze. The phrase introduces the set of wash basins made for temple use.\n\n🛁 Lavers are wash basins\n\n🥉 Brass means bronze here\n\n🏛 More temple equipment is being listed\n\nThe phrase identifies another key item of temple furnishing."],
    ["One Laver Contained Forty Baths", "A bath is an ancient liquid measure. The phrase tells how much one laver could hold.\n\n📏 A bath is a capacity measure\n\n💧 Each laver held a large amount of water\n\n🏛 The size is being quantified clearly\n\nThe phrase explains the volume of these washing basins."],
  ],
  "1 Kings 7:43-48": [
    ["The Ten Bases", "The verse summarizes the major groups of furnishings that Hiram made. The phrase points back to the ten supporting stands already described.\n\n🏛 The equipment list is being gathered up\n\n🔟 Ten bases are part of the completed set\n\n📖 The furnishings are being reviewed as a whole\n\nThe phrase begins a summary inventory."],
    ["Ten Lavers on the Bases", "Each base supported a laver, so the phrase describes how the pieces were arranged together. The bases and basins belonged as working units.\n\n🛁 Each stand held a basin\n\n🏛 The pieces work together as a set\n\n📖 The arrangement is practical, not random\n\nThe phrase explains how the furnishings were paired."],
    ["Twelve Oxen Under the Sea", "The great sea rested on twelve oxen, as earlier described. The phrase restates the support beneath the large basin.\n\n🐂 The oxen support the basin\n\n🔁 The arrangement is recalled in summary form\n\n🏛 The sea remains a central object in the inventory\n\nThe phrase keeps the sea's structure clear in the recap."],
    ["All These Vessels", "Vessels means the various temple objects and utensils Hiram made. The phrase gathers them into one completed group.\n\n🏺 Vessels means sacred objects and implements\n\n🏛 The furnishing work is being summarized\n\n📖 The temple is being equipped comprehensively\n\nThe phrase wraps the listed items into one whole collection."],
  ],
  "1 Kings 7:49-51": [
    ["The Candlesticks of Pure Gold", "These are lampstands made of pure gold for the temple interior. Candlesticks here refers to temple lampstands, not modern candleholders.\n\n🕯 Temple lampstands are meant\n\n🥇 Pure gold shows holiness and beauty\n\n🏛 Interior worship furnishings are in view\n\nThe phrase explains what these golden items were."],
    ["Five on the Right Side", "The lampstands were arranged symmetrically, five on one side and five on the other. The phrase gives one side of that ordered layout.\n\n↔ The layout is balanced\n\n🔢 Five are placed on one side\n\n🏛 Temple design values symmetry\n\nThe phrase helps the reader picture the arrangement."],
    ["The Censers of Pure Gold", "Censers were vessels used with incense or coals in worship. The phrase identifies another set of costly sacred utensils.\n\n🔥 Censers belong to worship practice\n\n🥇 Pure gold marks their sacred dignity\n\n🏛 Temple service used many specialized objects\n\nThe phrase explains one more kind of holy vessel."],
    ["The Hinges of Gold", "Even the hinges on the inner doors were made of gold, showing the extraordinary richness of the temple. The phrase highlights lavish detail in the sacred house.\n\n🚪 Even small parts are precious\n\n🥇 Gold reaches down to the hardware\n\n🏛 The temple's holiness is expressed through costly detail\n\nThe phrase shows the richness extending to the smallest fittings."],
  ],
};

function rewriteDay83RoyalSection(section: RoyalPhraseSectionInput): RoyalPhraseSectionInput {
  const overrides = DAY_83_ROYAL_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const DAY_84_ROYAL_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "1 Kings 8:1-6": [
    ["Then Solomon Assembled the Elders of Israel", "Solomon gathers Israel's elders to bring the ark into the new temple. The phrase shows this is not a private event but a national act led by the king.\n\n👥 National leaders are gathered\n\n👑 Solomon leads the assembly\n\n📦 The ark's transfer is the reason for the gathering\n\nThe phrase opens the dedication scene with public seriousness."],
    ["All the Heads of the Tribes", "These are the chief leaders representing Israel's tribes. The phrase shows the whole nation being represented through its recognized heads.\n\n👥 Tribal leaders are present\n\n🏛 Representation is national\n\n📖 The moment includes all Israel through its chiefs\n\nThe phrase explains why this gathering carries covenant weight."],
    ["All the Men of Israel Assembled Themselves unto King Solomon at the Feast in the Month Ethanim", "The people gather during a feast season in the month Ethanim, an older month name. The phrase ties the temple event to a sacred calendar moment.\n\n🗓 Ethanim is an ancient month name\n\n🎉 The event happens during a feast\n\n👥 Israel gathers around the king for worship\n\nThe phrase places the dedication in a holy season of assembly."],
    ["Which Is the Seventh Month", "The text explains Ethanim by its place in the calendar. The seventh month was a major sacred season in Israel's year.\n\n🧠 The month is being clarified\n\n🗓 The seventh month carried special religious importance\n\n📖 The timing is deliberate, not random\n\nThe phrase helps a new reader understand the calendar note."],
  ],
  "1 Kings 8:7-12": [
    ["For the Cherubims Spread Forth Their Two Wings Over the Place of the Ark", "The cherubim figures inside the temple stretch their wings over the ark's place. The phrase pictures the ark under a sign of holy covering and protection.\n\n👼 Cherubim are large sacred figures\n\n📦 Their wings overshadow the ark\n\n🙏 The holiest object is placed under symbolic covering\n\nThe phrase helps the reader picture the Most Holy Place."],
    ["The Cherubims Covered the Ark", "This means the wings of the cherubim extended above the ark. Covered here is not hiding it completely but overshadowing it from above.\n\n👼 The cherubim overshadow the ark\n\n📦 The ark remains central beneath them\n\n🏛 The room is arranged around holy symbolism\n\nThe phrase explains the relationship between the figures and the ark."],
    ["They Drew Out the Staves", "The staves are the carrying poles used for the ark. Drawing them out means they were extended so their ends could be seen from the holy place.\n\n🪵 Staves means carrying poles\n\n📦 The ark was designed to be carried this way\n\n👀 The poles remain partly visible\n\nThe phrase explains a practical temple detail that would otherwise feel obscure."],
    ["That the Ends of the Staves Were Seen Out in the Holy Place Before the Oracle", "The poles could be seen from the holy place but not from outside it. The oracle is the inner sanctuary, so the phrase describes how the ark sat within the temple rooms.\n\n👀 The poles are visible only from inside the sanctuary area\n\n🏛 The oracle is the innermost holy room\n\n📖 The verse is describing the ark's position carefully\n\nThe phrase helps the reader picture where the ark rested."],
  ],
  "1 Kings 8:13-18": [
    ["I Have Surely Built Thee an House to Dwell in", "Solomon is addressing the LORD and saying he has built a house for God's dwelling. The house means the temple, the set place for worship.\n\n🏛 The house means the temple\n\n🙏 Solomon speaks directly to God\n\n📖 The building is dedicated as God's dwelling place\n\nThe phrase explains Solomon's opening words at the dedication."],
    ["A Settled Place for Thee to Abide in for Ever", "A settled place means a fixed dwelling rather than a movable tent. Solomon is contrasting the temple with the earlier tabernacle arrangements.\n\n🏛 The temple is a permanent worship site\n\n⛺ It is different from a traveling tent sanctuary\n\n🙏 The language stresses settled divine presence\n\nThe phrase shows why the temple feels like a major covenant development."],
    ["The King Turned His Face About", "Solomon turns from addressing the sanctuary to addressing the gathered people. The phrase marks a shift in who he is speaking to.\n\n👑 Solomon changes his direction\n\n👥 His attention turns to the congregation\n\n📖 The speech moves from Godward words to public blessing\n\nThe phrase helps the reader follow the scene's movement."],
    ["Blessed All the Congregation of Israel", "Solomon speaks a formal blessing over the assembled people. Blessed here means he pronounces good words over them before the LORD.\n\n🙏 A public blessing is spoken\n\n👥 The whole congregation is included\n\n👑 The king acts in a worshipful role before the people\n\nThe phrase shows royal speech being used to bless the nation."],
  ],
  "1 Kings 8:19-24": [
    ["Nevertheless Thou Shalt Not Build the House", "God had told David that he would not be the one to build the temple. The phrase explains the limit placed on David's role.\n\n🚫 David was not chosen to build it\n\n🏛 The temple was still promised, but through another\n\n📖 God's promise included both denial and future fulfillment\n\nThe phrase clarifies why Solomon, not David, became the builder."],
    ["But Thy Son That Shall Come Forth Out of Thy Loins", "This means David's own physical son would build the house. Out of thy loins is old Bible wording for direct offspring.\n\n👦 The builder would be David's own son\n\n🧠 The old wording means direct descendant\n\n🏛 The promise stays within David's line\n\nThe phrase explains the family line built into God's word."],
    ["The LORD Hath Performed His Word That He Spake", "Solomon says God has now done what He promised. Performed His word means fulfilled His spoken promise.\n\n🙏 God keeps His promises\n\n📖 The temple is evidence of fulfillment\n\n👑 Solomon sees his reign inside God's larger word\n\nThe phrase shows the dedication as an answered promise, not only a building event."],
    ["I Am Risen Up in the Room of David My Father", "In the room of David means in David's place on the throne. Solomon is acknowledging succession, not competition.\n\n👑 Solomon reigns in David's place\n\n🧠 The old wording means succession\n\n📖 The throne has passed according to promise\n\nThe phrase explains how Solomon sees his own kingship."],
  ],
  "1 Kings 8:25-30": [
    ["LORD God of Israel", "Solomon addresses God by covenant name and national relationship. The phrase is reverent and reminds the reader that this prayer is rooted in Israel's history with the LORD.\n\n🙏 The prayer is covenantal\n\n👥 God is being addressed as Israel's God\n\n📖 The title carries history and relationship\n\nThe phrase sets the tone for Solomon's temple prayer."],
    ["Keep with Thy Servant David My Father That Thou Promisedst Him", "Solomon asks God to continue keeping the promise made to David. Keep with means carry through or fulfill what was pledged.\n\n📜 David's promise is still in view\n\n🙏 Solomon asks God to continue fulfilling it\n\n👑 The future of the throne depends on God's faithfulness\n\nThe phrase shows the prayer leaning on earlier promise."],
    ["O God of Israel", "The repeated address deepens the prayer's covenant focus. Solomon is not speaking to an unknown deity but to the God who bound Himself to Israel.\n\n🙏 The covenant relationship stays central\n\n👥 Israel remains in view throughout the prayer\n\n📖 Repetition adds reverence and focus\n\nThe phrase keeps the prayer rooted in God's known identity."],
    ["Let Thy Word", "Solomon is asking God to let His spoken promise stand firm and come true. The phrase is a short appeal for God's word to be confirmed.\n\n📖 God's word is the thing being appealed to\n\n🙏 Solomon prays from promise, not from invention\n\n⚖️ The prayer seeks confirmation of what God already said\n\nThe phrase shows faith asking for fulfillment."],
  ],
  "1 Kings 8:31-36": [
    ["If Any Man Trespass Against His Neighbour", "Trespass means commit a wrong or offense against another person. The phrase begins one of Solomon's case-prayers about justice.\n\n⚖️ A real wrong between neighbors is imagined\n\n🧠 Trespass means offend or do wrong\n\n🙏 The temple prayer includes everyday justice matters\n\nThe phrase shows that worship and moral accountability belong together."],
    ["An Oath Be Laid Upon Him to Cause Him to Swear", "This describes a formal oath being required when truth is disputed. The phrase is about using a sworn statement in the presence of God to seek justice.\n\n📜 A solemn oath is required\n\n🙏 God's presence is invoked in judgment\n\n⚖️ The legal case is brought under sacred accountability\n\nThe phrase explains the courtroom setting of this request."],
    ["Then Hear Thou in Heaven", "Solomon asks God to listen from heaven and act in response. The phrase shows that the temple points prayer upward but does not confine God there.\n\n🙏 Solomon asks God to hear\n\n🌌 Heaven is named as God's true dwelling\n\n🏛 The temple is a prayer site, not a prison for God\n\nThe phrase explains how temple prayer still reaches heaven."],
    ["Judge Thy Servants", "Solomon asks God to act as the true judge in disputed cases. The phrase recognizes that human courts need divine justice behind them.\n\n⚖️ God is the final judge\n\n👥 The people remain God's servants even in legal conflict\n\n🙏 Temple prayer includes appeal for righteous verdicts\n\nThe phrase shows dependence on God's justice."],
  ],
  "1 Kings 8:37-42": [
    ["If There Be in the Land Famine", "A famine is severe food shortage, and Solomon includes it as one of the disasters for which people may cry out to God. The phrase shows the prayer covering national crisis.\n\n🌾 Famine means severe scarcity of food\n\n👥 The whole land can suffer together\n\n🙏 Solomon is building prayer language for future calamity\n\nThe phrase shows the temple prayer addressing collective distress."],
    ["If There Be Pestilence", "Pestilence means plague, deadly disease, or widespread sickness. Solomon is asking that even such disaster become a cause for prayer and mercy.\n\n🦠 Pestilence means epidemic disease\n\n⚠️ The list includes severe national suffering\n\n🙏 Prayer is needed in bodily as well as political crisis\n\nThe phrase expands the range of troubles brought before God."],
    ["Supplication Soever Be Made by Any Man", "Supplication means earnest pleading or humble request. Solomon includes individual prayer as well as national prayer.\n\n🙏 Supplication means earnest prayer\n\n👤 One person's cry matters too\n\n📖 The temple prayer is personal as well as collective\n\nThe phrase shows that individuals are not lost inside the crowd."],
    ["Or by All Thy People Israel", "Solomon also includes the whole nation praying together. The phrase balances the previous line about any one person.\n\n👥 The whole people may cry together\n\n🙏 National repentance and prayer are envisioned\n\n📖 Individual and collective prayer both matter\n\nThe phrase broadens the prayer from one voice to many."],
  ],
  "1 Kings 8:43-48": [
    ["Hear Thou in Heaven Thy Dwelling Place", "Solomon again asks God to hear from heaven, which he calls God's dwelling place. The phrase reminds the reader that God's true home is not limited to the temple.\n\n🌌 Heaven is God's dwelling place\n\n🙏 The temple directs prayer upward to Him\n\n🏛 The building serves worship without containing God\n\nThe phrase keeps Solomon's theology of God's transcendence clear."],
    ["Do According to All That the Stranger Calleth to Thee for", "The stranger is a foreigner from outside Israel. Solomon asks God to hear even outsiders who come seeking Him.\n\n🌍 Foreigners are included in the prayer\n\n🙏 God's name is meant to draw the nations\n\n📖 The temple has outward-facing significance\n\nThe phrase shows that Israel's worship has a witness beyond Israel."],
    ["If Thy People Go Out to Battle Against Their Enemy", "Solomon includes wartime prayer in the dedication. The phrase imagines Israel going to battle under God's sending and seeking His help.\n\n⚔️ Battle is one of the future crises in view\n\n👥 The people may need God in warfare too\n\n🙏 Victory is not assumed apart from prayer\n\nThe phrase shows national dependence in conflict."],
    ["Whithersoever Thou Shalt Send Them", "Solomon recognizes that God may send His people into battle or other hard paths. The phrase places even military movement under divine sovereignty.\n\n🙏 God is acknowledged as sovereign over their path\n\n⚔️ The battle location is under His sending\n\n📖 Obedience and warfare are being linked\n\nThe phrase shows that Israel's movement should be understood under God's authority."],
  ],
  "1 Kings 8:49-54": [
    ["Then Hear Thou Their Prayer", "Solomon asks God to hear His people's prayer when they repent in exile or distress. The phrase is a plea for divine attention to returning sinners.\n\n🙏 God is asked to hear repentant prayer\n\n👥 The people may cry from far away\n\n📖 Hope remains open even after sin and judgment\n\nThe phrase shows temple theology reaching into future exile."],
    ["Their Supplication in Heaven Thy Dwelling Place", "Supplication means humble pleading, and heaven remains God's dwelling place. The phrase combines earnest prayer with the reminder of God's true throne.\n\n🙏 Humble pleading is in view\n\n🌌 Heaven is still God's dwelling place\n\n📖 Distance does not block prayer from reaching Him\n\nThe phrase explains how exiled prayer still rises to God."],
    ["Forgive Thy People That Have Sinned Against Thee", "Solomon openly asks for forgiveness for a sinful people. The phrase makes clear that Israel's deepest need is not only rescue but pardon.\n\n🙏 Forgiveness is central\n\n⚖️ Sin against God is the real problem\n\n👥 The whole people may need mercy\n\nThe phrase shows pardon at the heart of Solomon's prayer."],
    ["All Their Transgressions Wherein They Have Transgressed Against Thee", "Transgressions are acts of crossing God's commands. Solomon is asking for full forgiveness across the whole range of their rebellion.\n\n🧠 Transgress means crossing God's boundary\n\n📜 The prayer includes many kinds of sin\n\n🙏 Mercy is asked for comprehensively\n\nThe phrase stresses the breadth of forgiveness needed."],
  ],
  "1 Kings 8:55-60": [
    ["Blessed All the Congregation of Israel with a Loud Voice", "Solomon speaks blessing publicly so the whole assembly can hear. A loud voice shows that this is formal national blessing, not private devotion.\n\n🗣 The blessing is public and audible\n\n👥 The whole congregation is addressed\n\n👑 Solomon acts before the assembled nation\n\nThe phrase marks a formal public conclusion to the prayer."],
    ["Blessed Be the LORD", "This is praise to God for His faithfulness. Blessed be the LORD is worship language that honors God for what He has done.\n\n🙏 Praise is directed to God\n\n📖 The dedication ends in worship, not self-congratulation\n\n👑 Solomon centers the LORD, not himself\n\nThe phrase turns the people's attention upward in gratitude."],
    ["That Hath Given Rest unto His People Israel", "Rest here means peace, settledness, and relief from enemies. Solomon sees the kingdom's peace as a gift from God.\n\n🕊 Rest means peace and settled security\n\n👥 Israel's stability is from the LORD\n\n📖 The kingdom's quietness is interpreted spiritually\n\nThe phrase explains what Solomon is thanking God for."],
    ["The LORD Our God Be with Us", "Solomon asks for God's continued presence, not only past gifts. The phrase turns praise into ongoing dependence.\n\n🙏 Past faithfulness leads to fresh dependence\n\n👥 The people still need God's presence now\n\n📖 Rest without God would not be enough\n\nThe phrase shows the prayer moving from thanks to request."],
  ],
  "1 Kings 8:61-66": [
    ["Let Your Heart Therefore Be Perfect with the LORD Our God", "A perfect heart here means whole-hearted, fully devoted, not sinless in the absolute sense. Solomon is calling for undivided loyalty to God.\n\n❤️ Perfect means fully devoted here\n\n🙏 Solomon calls for whole-hearted covenant loyalty\n\n📖 The issue is not flawlessness but undivided allegiance\n\nThe phrase explains the kind of heart Solomon wants in the people."],
    ["To Walk in His Statutes", "To walk in God's statutes means to live according to His commands. Walk is a common Bible word for daily conduct.\n\n🚶 Walk means live or conduct yourself\n\n📜 Statutes are God's fixed commands\n\n🙏 Devotion must show up in daily obedience\n\nThe phrase turns heart language into life practice."],
    ["All Israel with Him", "This refers to the whole gathered nation taking part in the dedication and feast with Solomon. The phrase shows the collective nature of the celebration.\n\n👥 The whole nation is involved\n\n🎉 Worship and feasting are shared nationally\n\n👑 King and people stand together here\n\nThe phrase keeps the dedication communal rather than private."],
    ["Offered Sacrifice Before the LORD", "The people and king offer sacrifices in worship before God. The phrase shows public devotion expressed through temple offering.\n\n🔥 Sacrifice is central to the dedication\n\n🙏 Worship is acted out, not only spoken\n\n🏛 The temple is immediately used for its purpose\n\nThe phrase shows worship embodied in offerings."],
  ],
  "1 Kings 9:1-6": [
    ["It Came to Pass", "This is a simple time marker introducing the next scene after the temple and palace were completed. The phrase moves from dedication into divine response.\n\n🕰 The story advances\n\n📖 A new stage begins after completion\n\n🙏 God is about to answer Solomon again\n\nThe phrase opens the next divine encounter."],
    ["When Solomon Had Finished the Building of the House of the LORD", "The temple is now fully completed, which sets the stage for God's response to Solomon. The phrase marks the work as done, not still in progress.\n\n🏛 The temple is finished\n\n✅ The main building task is complete\n\n🙏 God's response comes after completion\n\nThe phrase explains why this is a turning point."],
    ["That the LORD Appeared to Solomon the Second Time", "God appears to Solomon again, just as at Gibeon. The phrase means this is a second major divine encounter in his reign.\n\n🙏 God speaks to Solomon again\n\n📖 This is another defining moment\n\n👑 Solomon's reign continues under direct divine word\n\nThe phrase marks the importance of this repeated appearance."],
    ["As He Had Appeared unto Him at Gibeon", "Gibeon recalls the earlier appearance where Solomon asked for wisdom. The phrase connects this new message to that earlier encounter.\n\n🏙 Gibeon is the earlier meeting place\n\n🧠 The reader is meant to remember the first appearance\n\n🙏 God's dealings with Solomon are continuous\n\nThe phrase links the present warning and promise to the start of Solomon's reign."],
  ],
  "1 Kings 9:7-12": [
    ["Then Will I Cut Off Israel Out of the Land Which I Have Given Them", "God warns that if Israel turns away, He can remove them from the land. Cut off out of the land means expel them from the covenant inheritance.\n\n⚖️ The warning is severe\n\n🌍 The land itself can be lost\n\n🙏 Covenant blessing is conditional on faithfulness\n\nThe phrase explains the exile warning built into the covenant."],
    ["Which I Have Hallowed for My Name", "Hallowed means set apart as holy. God says the temple has been consecrated for His name, that is, for His worship and honor.\n\n🙏 Hallowed means made holy\n\n🏛 The temple is set apart for God\n\n📖 His name means His revealed honor and presence\n\nThe phrase explains why the house is sacred."],
    ["At This House", "God is speaking about this very temple Solomon built. The phrase keeps the warning tied to the visible sacred building before them.\n\n🏛 The temple itself is in view\n\n⚖️ Even a holy building is not a guarantee against judgment\n\n📖 Sacred places do not cancel covenant responsibility\n\nThe phrase makes the warning concrete."],
    ["Which Is High", "This can mean exalted, prominent, or once highly honored. God warns that a house now held high can become an object of astonishment if judgment falls.\n\n🏛 The temple is presently honored and elevated\n\n⚠️ Its prominence makes judgment more shocking\n\n📖 What is highly regarded can become a warning sign\n\nThe phrase helps explain the contrast in the warning."],
  ],
  "1 Kings 9:13-18": [
    ["What Cities Are These Which Thou Hast Given Me", "Hiram questions the value of the towns Solomon gave him. The phrase shows disappointment in the exchange.\n\n❓ Hiram is not pleased with the gift\n\n🏙 The towns seem unsatisfactory to him\n\n🤝 International alliance includes practical tensions\n\nThe phrase opens his complaint about the cities."],
    ["He Called Them the Land of Cabul unto This Day", "Cabul is likely a disparaging name suggesting worthlessness or displeasing land. The phrase records the negative label Hiram gave the region.\n\n🧠 Cabul is a negative place-name here\n\n🏙 The name reflects dissatisfaction\n\n📖 The label endured afterward\n\nThe phrase explains why the towns became known by this name."],
    ["Hiram Sent to the King Sixscore Talents of Gold", "Sixscore means one hundred twenty, and talents are large weights of precious metal. The phrase shows the scale of wealth moving between the kings.\n\n🥇 Sixscore means one hundred twenty\n\n⚖️ Talents are heavy units of value\n\n👑 The alliance involved major material exchange\n\nThe phrase explains the size of Hiram's contribution."],
    ["To the King Sixscore Talents", "The shortened repeated line keeps the amount of gold in focus. Scripture is stressing the size of the gift or payment.\n\n📜 The amount is repeated for emphasis\n\n🥇 A large sum is still in view\n\n🤝 The alliance had serious economic weight\n\nThe phrase reinforces the scale of the transfer."],
  ],
  "1 Kings 9:19-24": [
    ["All the Cities of Store That Solomon Had", "Store cities were centers for supplies, storage, and royal resources. The phrase shows Solomon building infrastructure as well as palaces and temples.\n\n🏙 Store cities hold supplies and resources\n\n👑 Solomon's kingdom is highly organized\n\n🏛 Building includes administration and logistics too\n\nThe phrase explains the purpose of these cities."],
    ["Cities for His Chariots", "These were cities connected to Solomon's chariot forces and military system. The phrase points to organized royal strength.\n\n🐎 Military support cities are in view\n\n⚔️ Chariot power required infrastructure\n\n👑 Solomon's reign includes organized defense and display\n\nThe phrase explains another kind of city in his building program."],
    ["All the People That Were Left of the Amorites", "This refers to non-Israelite populations still remaining in the land from earlier peoples. The phrase identifies the labor source for some of Solomon's building work.\n\n👥 Remaining non-Israelite peoples are named\n\n📖 Older inhabitants were still present in the land\n\n🏛 Their status shaped the labor system\n\nThe phrase explains who these workers were."],
    ["Which Were Not of the Children of Israel", "The text distinguishes these peoples from Israelites. The phrase matters because it explains why their labor obligations were treated differently.\n\n👥 They are explicitly not Israelites\n\n⚖️ Their legal status differs in the kingdom\n\n🏛 This distinction affects how Solomon uses labor\n\nThe phrase clarifies the social boundary in the passage."],
  ],
  "1 Kings 9:25-28": [
    ["Three Times in a Year Did Solomon Offer Burnt Offerings", "Solomon led major worship observances at the appointed feast times. The phrase refers to repeated annual worship, not random sacrifice.\n\n🗓 Three yearly occasions are in view\n\n🔥 Burnt offerings mark formal worship\n\n👑 The king participates in covenant worship rhythms\n\nThe phrase shows Solomon's regular public worship pattern."],
    ["Peace Offerings Upon the Altar Which He Built unto the LORD", "Peace offerings expressed fellowship and thanksgiving before God. The phrase shows Solomon offering not only whole burnt offerings but also offerings of communion and gratitude.\n\n🕊 Peace offerings express fellowship with God\n\n🙏 Worship includes thanksgiving and shared peace\n\n🏛 The altar is used for living covenant worship\n\nThe phrase explains a different kind of sacrifice in the temple life."],
    ["King Solomon Made a Navy of Ships in Ezion-geber", "A navy of ships means a fleet, and Ezion-geber was a port location. The phrase shows Solomon extending his reach into trade and seafaring wealth.\n\n🚢 A fleet is being built\n\n🏙 Ezion-geber is a port site\n\n👑 Solomon's kingdom extends into maritime trade\n\nThe phrase explains this expansion of royal activity."],
    ["Which Is Beside Eloth", "This locates Ezion-geber near Eloth on the Red Sea region. The phrase helps orient the reader geographically.\n\n🗺 The port is being located precisely\n\n🏙 Eloth helps identify the area\n\n📖 Trade routes and geography matter here\n\nThe phrase gives practical setting to Solomon's fleet."],
  ],
  "1 Kings 10:1-6": [
    ["When the Queen of Sheba Heard of the Fame of Solomon Concerning the Name of the LORD", "The queen hears of Solomon's fame in connection with the LORD's name, meaning his wisdom and glory are tied to Israel's God. The phrase links Solomon's reputation to divine blessing.\n\n👑 Solomon's fame has spread far\n\n🙏 The LORD's name is part of that fame\n\n🌍 Other nations are hearing about Israel's God through him\n\nThe phrase shows that Solomon's reputation has a spiritual dimension."],
    ["She Came to Prove Him with Hard Questions", "To prove him means to test him. Hard questions are difficult riddles or deep problems meant to examine the reality of his wisdom.\n\n❓ She comes to test, not flatter\n\n🧠 Hard questions probe real wisdom\n\n👑 Solomon's reputation will be examined personally\n\nThe phrase explains why the queen made the journey."],
    ["She Came to Jerusalem with a Very Great Train", "A great train means a large caravan or retinue of attendants and goods. The phrase shows the queen arrived with major wealth and ceremony.\n\n🐪 A large royal caravan is in view\n\n🌍 The visit is important and international\n\n✨ The arrival is impressive and costly\n\nThe phrase explains the scale of her visit."],
    ["With Camels That Bare Spices", "Bare means carried. The camels were transporting spices, gold, and other valuable gifts.\n\n🐪 The camels carry trade goods\n\n🧠 Bare means carried\n\n🎁 The visit includes costly gifts\n\nThe phrase explains what the caravan was bringing."],
  ],
  "1 Kings 10:7-12": [
    ["Howbeit I Believed Not the Words", "Howbeit means however. The queen says she did not believe the reports until she saw Solomon's wisdom and wealth herself.\n\n🧠 Howbeit means however\n\n👂 She had heard the reports but doubted them\n\n👀 Personal sight changed her judgment\n\nThe phrase shows firsthand experience surpassing rumor."],
    ["Until I Came", "The queen means she had to come personally before she could believe it. The phrase highlights the difference between hearsay and direct witness.\n\n🚶 She needed to see for herself\n\n👀 Personal encounter brings conviction\n\n📖 The visit confirms the reports\n\nThe phrase shows experience replacing uncertainty."],
    ["Happy Are Thy Men", "Happy here means blessed or fortunate. The queen says Solomon's servants are privileged to live near such wisdom.\n\n😊 Happy means blessed in this setting\n\n👥 Those around Solomon benefit from his wisdom\n\n👑 The queen sees blessing extending to his household\n\nThe phrase shows admiration reaching beyond the king himself."],
    ["Happy Are These Thy Servants", "She repeats the same thought more specifically about the servants who stand before Solomon. The repetition deepens her amazement.\n\n📜 The blessing is repeated\n\n👥 The servants' position is envied\n\n🧠 Solomon's wisdom blesses those near him\n\nThe phrase reinforces the queen's admiration."],
  ],
  "1 Kings 10:13-18": [
    ["King Solomon Gave unto the Queen of Sheba All Her Desire", "Solomon gives the queen what she requested, beyond the gifts of ordinary royal exchange. The phrase shows generosity matching his wealth and wisdom.\n\n🎁 Solomon gives freely\n\n👑 Royal generosity answers royal admiration\n\n🤝 The visit ends in mutual honor\n\nThe phrase shows abundance flowing outward from the king."],
    ["Whatsoever She Asked", "This means Solomon granted her requests broadly, not grudgingly or narrowly. The phrase underscores how full his response was.\n\n🗣 Her requests are honored\n\n🎁 The giving is extensive\n\n👑 Solomon's abundance appears in action\n\nThe phrase stresses the completeness of his generosity."],
    ["Now the Weight of Gold That Came to Solomon in One Year Was Six Hundred Threescore", "Six hundred threescore means six hundred sixty. The phrase records the enormous amount of gold flowing into Solomon's kingdom yearly.\n\n🥇 Threescore means sixty\n\n⚖️ The amount of gold is immense\n\n👑 Solomon's wealth is being measured concretely\n\nThe phrase shows the scale of annual royal income."],
    ["Six Talents of Gold", "This finishes the count at six hundred sixty-six talents. A talent is a very large unit of weight and value.\n\n🧠 A talent is a large weight unit\n\n🥇 The total is extraordinary\n\n📖 The kingdom's wealth is not abstract but counted\n\nThe phrase keeps the reader focused on the magnitude of the gold."],
  ],
  "1 Kings 10:19-24": [
    ["The Throne Had Six Steps", "Solomon's throne was raised on six steps, emphasizing grandeur and elevation. The phrase begins the description of one of the most impressive royal objects in the chapter.\n\n👑 The throne is elevated and majestic\n\n📏 Even the steps are counted\n\n✨ Royal splendor is being carefully described\n\nThe phrase opens the picture of Solomon's extraordinary throne."],
    ["The Top of the Throne Was Round Behind", "This describes the shape of the throne's upper back or rear part. The phrase gives a design detail to help the reader imagine the structure.\n\n🪑 The throne has a shaped back\n\n📖 The description is visual and architectural\n\n👑 The object is crafted, not plain\n\nThe phrase helps form a mental picture of the throne."],
    ["Twelve Lions Stood There on the One Side", "Lions stood on the steps or around the throne as symbols of royalty and power. The phrase adds to the throne's impressive imagery.\n\n🦁 Lions symbolize royal strength\n\n👑 The throne is visually majestic\n\n📖 The number adds to the ordered design\n\nThe phrase shows how power was expressed in royal symbolism."],
    ["On the Other Upon the Six Steps", "The lions were balanced on both sides along the steps. The phrase completes the symmetrical picture of the throne approach.\n\n↔ The throne design is balanced\n\n🦁 The lions are arranged in order\n\n👑 The whole ascent to the throne is majestic\n\nThe phrase completes the visual layout of the steps."],
  ],
  "1 Kings 10:25-29": [
    ["They Brought Every Man His Present", "Foreign visitors and subjects brought gifts to Solomon year by year. Present here means tribute or gift offered before the king.\n\n🎁 A present means a gift or tribute\n\n🌍 Many people bring offerings to Solomon\n\n👑 His court draws wealth from many directions\n\nThe phrase shows how widely his honor was recognized."],
    ["Vessels of Silver", "These were silver objects brought as part of the yearly gifts. The phrase names one category of valuable tribute.\n\n🥈 Silver vessels are part of the tribute\n\n🎁 Wealth comes in many forms\n\n👑 Solomon's court is richly supplied\n\nThe phrase gives a concrete example of the gifts brought."],
    ["Solomon Gathered Together Chariots", "Solomon amassed military vehicles and horses on a large scale. Gathered together means deliberately accumulated.\n\n🐎 Chariot power is being stockpiled\n\n👑 Royal strength is expanding materially\n\n⚔️ Military resources are being concentrated\n\nThe phrase shows intentional buildup of royal might."],
    ["He Had a Thousand", "The verse is counting Solomon's chariots or related resources to show the size of his force. The phrase keeps the numerical scale in view.\n\n🔢 The number is large and deliberate\n\n⚔️ Power is being measured concretely\n\n👑 Solomon's military wealth is substantial\n\nThe phrase emphasizes numerical scale in his resources."],
  ],
  "1 Kings 11:1-6": [
    ["But King Solomon Loved Many Strange Women", "Strange women here means foreign women from nations God had warned Israel about, not merely unusual women. The phrase introduces Solomon's disobedient marriages.\n\n👩 Strange means foreign in this context\n\n⚠️ The problem is covenant danger, not ethnicity alone\n\n👑 Solomon's heart is beginning to turn wrongly\n\nThe phrase explains the kind of relationships that become his downfall."],
    ["Together with the Daughter of Pharaoh", "The daughter of Pharaoh is included among Solomon's foreign marriages. The phrase reminds the reader that even politically impressive unions can carry spiritual danger.\n\n👰 Pharaoh's daughter is part of the pattern\n\n🤝 Diplomacy and desire mix together\n\n⚠️ What looked powerful also carried risk\n\nThe phrase connects earlier royal alliances to the larger problem."],
    ["Of the Nations Concerning Which the LORD Said unto the Children of Israel", "These nations are the ones God had explicitly warned Israel about. The phrase grounds the issue in prior command, not in Solomon's personal preference alone.\n\n📜 God had already spoken about these nations\n\n⚖️ The marriages break known command\n\n🙏 The problem is disobedience to revealed word\n\nThe phrase explains why the issue is spiritually serious."],
    ["Ye Shall Not Go in to Them", "Go in to them means enter into marriage relations with them. The phrase is old covenant language forbidding these unions.\n\n💍 The warning is about marriage union\n\n🧠 The old wording needs explanation\n\n⚠️ Solomon crosses a clearly stated line\n\nThe phrase makes the prohibition plain for a new reader."],
  ],
  "1 Kings 11:7-12": [
    ["Then Did Solomon Build an High Place for Chemosh", "A high place was a worship site, often on elevated ground, and Chemosh was a false god of Moab. The phrase shows Solomon building idolatrous worship space.\n\n⛰ A high place is an idol worship site\n\n📦 Chemosh is a false god of Moab\n\n⚠️ Solomon is actively enabling idolatry\n\nThe phrase shows the depth of his spiritual decline."],
    ["The Abomination of Moab", "Abomination means something detestable before God. The phrase labels Chemosh from God's moral perspective, not from human admiration.\n\n⚠️ Abomination means detestable to God\n\n📦 Moab's god is being morally judged here\n\n🙏 The language exposes idolatry as offensive, not neutral\n\nThe phrase explains why this worship is so serious."],
    ["Likewise Did He for All His Strange Wives", "Solomon repeated this pattern for many of his foreign wives by providing places for their worship. The phrase shows the sin spreading broadly across his household.\n\n🔁 The idolatry is repeated again and again\n\n👩 His marriages multiply the problem\n\n⚠️ The compromise becomes systematic\n\nThe phrase shows how wide Solomon's disobedience became."],
    ["Which Burnt Incense", "Burning incense was an act of worship, not just fragrance. The phrase means these wives were actively honoring their gods through ritual practice.\n\n🔥 Incense is part of worship\n\n🙏 The issue is actual religious practice\n\n⚠️ False worship is taking public form\n\nThe phrase explains the nature of what they were doing."],
  ],
  "1 Kings 11:13-18": [
    ["Howbeit I Will Not Rend Away All the Kingdom", "Howbeit means however, and rend away means tear away. God says He will not remove the whole kingdom at once.\n\n🧠 Old wording is being defined\n\n👑 Judgment will come, but not in full immediately\n\n🙏 Mercy still operates inside discipline\n\nThe phrase explains the partial restraint in God's judgment."],
    ["But Will Give One Tribe to Thy Son for David My Servant’s Sake", "God will leave a remnant of the kingdom to Solomon's son because of His covenant with David. The phrase shows mercy rooted in promise, not in Solomon's merit.\n\n👑 One tribe remains as a remnant\n\n🤝 David's covenant matters here\n\n🙏 Mercy survives in the middle of judgment\n\nThe phrase explains why the kingdom is not totally removed."],
    ["The LORD Stirred Up an Adversary unto Solomon", "An adversary is an opponent or enemy. The phrase means God raised up people to trouble Solomon as part of discipline.\n\n⚔️ God raises opposition against Solomon\n\n🧠 Adversary means enemy or opponent\n\n⚖️ Trouble becomes part of divine judgment\n\nThe phrase shows that Solomon's peace is beginning to crack."],
    ["Hadad the Edomite", "Hadad is named as one of the adversaries, and Edomite identifies him with Edom, a neighboring people. The phrase introduces a specific enemy God uses.\n\n👤 Hadad is the adversary's name\n\n🌍 Edom is his national background\n\n⚠️ The threat is now personal and political\n\nThe phrase makes the opposition concrete."],
  ],
  "1 Kings 11:19-24": [
    ["Hadad Found Great Favour in the Sight of Pharaoh", "Hadad was received kindly and honored in Pharaoh's court. Found favor means he gained approval and support there.\n\n🤝 Hadad wins royal favor in Egypt\n\n👑 Pharaoh becomes his protector\n\n📖 Political refuge is shaping future conflict\n\nThe phrase explains how Hadad gained strength in exile."],
    ["So That He Gave Him to Wife the Sister of His Own Wife", "Pharaoh gave Hadad a woman from his own extended household in marriage, showing unusual favor. The phrase means Hadad was welcomed deeply into the Egyptian court.\n\n💍 Marriage seals Pharaoh's favor\n\n👑 Hadad is drawn close to the royal family\n\n📖 This is more than temporary shelter\n\nThe phrase shows how established Hadad became in Egypt."],
    ["The Sister of Tahpenes Bare Him Genubath His Son", "Bare means gave birth to. The phrase introduces Hadad's son Genubath through this Egyptian marriage.\n\n👶 A son is born to Hadad\n\n🧠 Bare means gave birth\n\n🏠 His life in Egypt becomes rooted and established\n\nThe phrase shows exile turning into family continuity."],
    ["Whom Tahpenes Weaned in Pharaoh’s House", "Weaned means brought the child through infancy to independence from nursing. The phrase shows Genubath being raised within Pharaoh's household.\n\n👶 Weaned means raised past nursing\n\n👑 The child grows up in the royal environment\n\n📖 Hadad's ties to Egypt are deep and lasting\n\nThe phrase shows how closely connected he became to Pharaoh's court."],
  ],
  "1 Kings 11:25-30": [
    ["He Was an Adversary to Israel All the Days of Solomon", "This means ongoing opposition troubled Solomon throughout his reign. The phrase shows that unrest became persistent, not momentary.\n\n⚔️ The hostility continues for years\n\n👑 Solomon's reign is no longer untroubled\n\n⚖️ Judgment takes the form of prolonged pressure\n\nThe phrase shows the lasting nature of the opposition."],
    ["Beside the Mischief That Hadad Did", "Mischief here means harm or trouble, not playful behavior. The phrase adds Hadad's hostility to the wider pattern of adversity.\n\n🧠 Mischief means harmful trouble\n\n⚔️ Hadad contributes real damage\n\n📖 Multiple lines of opposition are building\n\nThe phrase clarifies the seriousness of the term."],
    ["Jeroboam the Son of Nebat", "Jeroboam is now introduced by name as another key figure in the story. The phrase begins the rise of the man who will later receive most of the kingdom.\n\n👤 Jeroboam is introduced\n\n📖 A major future figure enters the story\n\n⚠️ Internal division is taking shape through a person\n\nThe phrase marks the start of a decisive new line in the narrative."],
    ["An Ephrathite of Zereda", "This identifies Jeroboam by his region and hometown. The phrase keeps his identity rooted in real place and people.\n\n🌍 Jeroboam's origin is specified\n\n👤 He is not a vague rebel but a known man from a known place\n\n📖 The future division begins in ordinary geography\n\nThe phrase grounds the coming split in history."],
  ],
  "1 Kings 11:31-36": [
    ["He Said to Jeroboam", "Ahijah now speaks directly to Jeroboam with a prophetic word. The phrase opens the personal announcement of kingdom division.\n\n🗣 A direct prophetic message begins\n\n👤 Jeroboam is personally addressed\n\n⚖️ The future is being declared to him plainly\n\nThe phrase marks the start of revelation about the torn kingdom."],
    ["Take Thee Ten Pieces", "Ahijah tells Jeroboam to take ten pieces of the torn garment as a sign. The action symbolizes Jeroboam receiving ten tribes.\n\n👕 The torn garment is symbolic\n\n🔟 Ten pieces represent ten tribes\n\n📖 The prophecy is acted out visually\n\nThe phrase explains the sign's meaning."],
    ["But He Shall Have One Tribe for My Servant David’s Sake", "God says David's line will still keep a remnant of the kingdom. The one tribe remains because of the covenant with David.\n\n👑 David's house will not lose everything\n\n🤝 Covenant promise limits the judgment\n\n🙏 Mercy remains tied to David's sake\n\nThe phrase explains why complete removal does not happen."],
    ["For Jerusalem’s Sake", "Jerusalem is the city God chose for His name and for David's line. The phrase shows that the chosen city also shapes how judgment is limited.\n\n🏙 Jerusalem remains specially chosen\n\n🙏 God's name and David's line are tied there\n\n⚖️ The city's election affects the outcome\n\nThe phrase explains another reason the kingdom is not wholly taken away."],
  ],
  "1 Kings 11:37-42": [
    ["I Will Take Thee", "God is saying He will appoint and raise Jeroboam into rule. The phrase is about divine selection, not self-promotion.\n\n🙏 God is the one appointing him\n\n👤 Jeroboam's rise is under divine word\n\n📖 His future kingship is granted, not seized in this sentence\n\nThe phrase explains the source of Jeroboam's promised rise."],
    ["Thou Shalt Reign According to All That Thy Soul Desireth", "God says Jeroboam will reign broadly over the kingdom he receives. The phrase describes the extent of rule he will be given.\n\n👑 Jeroboam is promised real kingship\n\n🌍 His rule will reach as far as the granted kingdom\n\n📖 The promise is large and serious\n\nThe phrase shows the scale of what is being offered."],
    ["It Shall Be", "This short phrase introduces a conditional promise that will follow. It signals that what comes next depends on Jeroboam's response.\n\n📜 A condition is being introduced\n\n⚖️ The promise is not unconditional in every respect\n\n🙏 Future blessing still depends on obedience\n\nThe phrase prepares the reader for the covenant terms."],
    ["If Thou Wilt Hearken unto All That I Command Thee", "Hearken means listen and obey. Jeroboam's future stability depends on responding to God's commands faithfully.\n\n🧠 Hearken means listen with obedience\n\n📜 Command is joined to promise\n\n⚖️ Kingship still lives under God's law\n\nThe phrase shows that divine gift does not remove moral responsibility."],
  ],
  "1 Kings 11:43": [
    ["Solomon Slept with His Fathers", "Slept with his fathers is a biblical way of saying Solomon died and joined the generations before him. It is a respectful idiom for death.\n\n⚰ This means Solomon died\n\n🧠 The wording is an idiom, not literal sleep\n\n📖 He is being joined to the line before him\n\nThe phrase explains a common Bible expression for death."],
    ["Was Buried in the City of David His Father", "Solomon is buried in Jerusalem, the royal city associated with David. The phrase gives his resting place and dynastic connection.\n\n🪦 Burial is in David's city\n\n🏙 Jerusalem remains the royal burial place\n\n👑 The dynasty continues through place as well as people\n\nThe phrase locates Solomon's burial within David's legacy."],
    ["Slept with His Fathers, and Was Buried in", "The repeated wording keeps the standard death formula in view. Scripture is closing Solomon's story with the familiar royal pattern.\n\n📜 The royal death formula is repeated\n\n⚰ Death and burial complete the account\n\n👑 The story of one reign is closing\n\nThe phrase reinforces the formal ending of Solomon's life."],
    ["With His Fathers, and Was Buried in the", "This shortened repetition continues the same burial formula. The point is still Solomon's death and placement within the royal line.\n\n⚰ Death is being recorded formally\n\n🪦 Burial confirms the end of his reign\n\n📖 The dynasty frame stays central\n\nThe phrase completes the standard closing formula."],
  ],
};

function rewriteDay84RoyalSection(section: RoyalPhraseSectionInput): RoyalPhraseSectionInput {
  const overrides = DAY_84_ROYAL_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const DAY_85_ROYAL_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "1 Kings 12:1-6": [
    ["Rehoboam Went to Shechem", "Rehoboam goes to Shechem because that is where the tribes gather to confirm him as king. The phrase places the succession meeting in a public national setting.\n\n🏙 Shechem is the political meeting place\n\n👑 Rehoboam is seeking formal recognition\n\n👥 The nation is involved in the moment\n\nThe phrase opens the kingdom crisis in a real place with public weight."],
    ["For All Israel Were Come to Shechem to Make Him King", "The tribes come to make Rehoboam king, meaning to recognize and confirm his rule. The phrase shows that kingship is being publicly established, not assumed in private.\n\n👥 The tribes assemble together\n\n👑 Kingship still needs public confirmation\n\n⚖️ The moment is full of expectation and leverage\n\nThe phrase explains why this gathering matters so much."],
    ["It Came to Pass", "This simple story marker moves the scene into the next development, especially Jeroboam's return. It helps the reader follow the sequence of the political turning point.\n\n🕰 The narrative moves forward\n\n📖 A major shift is beginning\n\n⚠️ The calm moment is about to become contested\n\nThe phrase marks the story's turn into tension."],
    ["When Jeroboam the Son of Nebat", "Jeroboam re-enters the story at exactly the moment Rehoboam is being made king. The phrase introduces the rival figure who will become central to the split.\n\n👤 Jeroboam returns to the scene\n\n📖 A previously marked rival is back\n\n⚠️ Division is about to take a clearer shape\n\nThe phrase shows the challenger arriving at a critical moment."],
  ],
  "1 Kings 12:7-12": [
    ["They Spake unto Him", "The older counselors speak directly to Rehoboam with advice about how to answer the people. The phrase opens the wise counsel he is given.\n\n🗣 Counsel is being offered\n\n👑 The new king must decide how to rule\n\n📖 Words at this moment will shape the kingdom\n\nThe phrase marks the beginning of a crucial advisory exchange."],
    ["If Thou Wilt Be a Servant unto This People This Day", "The counselors mean that if Rehoboam humbles himself to serve the people now, they will become loyal to him. Servant here means a king who leads by wise care, not weakness.\n\n👑 Good rule begins with service\n\n🤝 Humility can win lasting loyalty\n\n🧠 Servant here means caring leadership\n\nThe phrase explains the heart of the older men's wisdom."],
    ["But He Forsook the Counsel of the Old Men", "Forsook means rejected or abandoned. Rehoboam turns away from the seasoned advice that could have kept the kingdom together.\n\n🚫 He rejects wise counsel\n\n👴 Experience is ignored\n\n⚠️ A dangerous decision is being made\n\nThe phrase shows the beginning of his failure as a ruler."],
    ["Which They Had Given Him", "This refers back to the thoughtful advice the older men offered. The phrase keeps attention on the fact that Rehoboam had received good guidance and chose against it.\n\n📜 Good counsel had been clearly given\n\n🧠 The problem is not lack of advice but refusal of it\n\n⚠️ Responsibility stays with Rehoboam\n\nThe phrase sharpens the king's accountability."],
  ],
  "1 Kings 12:13-18": [
    ["The King Answered the People Roughly", "Rehoboam speaks harshly and without gentleness. Roughly means with severity rather than wisdom or compassion.\n\n🗣 His answer is harsh\n\n👥 The people are treated roughly\n\n⚠️ The response will drive them away\n\nThe phrase shows the tone that pushes the kingdom toward rupture."],
    ["Forsook the Old Men’s Counsel That They Gave Him", "The verse repeats that Rehoboam left behind the better advice. The repetition shows that his harsh answer was not accidental but chosen against wisdom.\n\n📜 The rejected counsel is emphasized again\n\n🧠 The failure is deliberate\n\n⚠️ He cannot blame ignorance\n\nThe phrase reinforces that the crisis grows out of chosen folly."],
    ["Spake to Them After the Counsel of the Young Men", "Rehoboam follows the harsh strategy suggested by the younger men. The phrase ties his words directly to the counsel he preferred.\n\n👦 He adopts immature counsel\n\n🗣 His answer reflects that influence\n\n⚠️ Leadership is being shaped by pride instead of wisdom\n\nThe phrase explains the source of his harsh speech."],
    ["My Father Made Your Yoke Heavy", "A yoke is a wooden bar for laboring animals, and here it pictures burdens placed on the people through taxes and forced service. Rehoboam is speaking about national pressure.\n\n🧠 Yoke means burden or heavy rule\n\n👥 The people feel weighed down\n\n👑 Kingship is being described in terms of pressure\n\nThe phrase explains the complaint at the center of the crisis."],
  ],
  "1 Kings 12:19-24": [
    ["So Israel Rebelled Against the House of David unto This Day", "The northern tribes break away from David's royal line and remain separated afterward. The house of David means David's dynasty, not only a building.\n\n👥 The kingdom splits\n\n👑 The dynasty of David loses most of the tribes\n\n📖 The division becomes long-lasting\n\nThe phrase states the historic break in the kingdom."],
    ["Against the House of David", "This means against David's royal family line and its rule in Judah. The phrase defines the target of the rebellion.\n\n👑 The revolt is against David's dynasty\n\n🏠 House means royal line here\n\n⚠️ The issue is kingship and covenant rule\n\nThe phrase explains what 'house' means in this setting."],
    ["Of David unto This Day.", "This phrase emphasizes that the separation endured long after the first revolt. Unto this day means it remained true when the record was written.\n\n📜 The division lasted\n\n🕰 The consequences stretched forward in time\n\n⚠️ This was not a short dispute\n\nThe phrase shows the lasting result of Rehoboam's failure."],
    ["It Came to Pass", "The story now moves into God's command that the split must not be fought over by civil war. The phrase marks the next development after the break.\n\n🕰 The narrative advances again\n\n⚔️ The response to the split is now in view\n\n🙏 God is about to speak into the crisis\n\nThe phrase helps the reader follow the movement from revolt to divine intervention."],
  ],
  "1 Kings 12:25-30": [
    ["Then Jeroboam Built Shechem in Mount Ephraim", "Jeroboam strengthens Shechem as an important city in his new kingdom. Built here can mean fortified or established as a center of rule.\n\n🏙 Shechem becomes a royal center\n\n👑 Jeroboam is organizing his new kingdom\n\n📖 The northern rule now takes visible shape\n\nThe phrase shows him consolidating power geographically."],
    ["Went Out from Thence", "Jeroboam moves on from one place to another as he establishes control. The phrase keeps tracking his practical actions as king.\n\n🚶 Jeroboam keeps moving through his territory\n\n🏛 He is actively setting up the kingdom\n\n📖 The narrative follows his political steps\n\nThe phrase marks continued kingdom-building activity."],
    ["Jeroboam Said in His Heart", "This means Jeroboam is reasoning inwardly to himself. The phrase opens the fear-driven calculation that leads to his false worship system.\n\n🧠 He is thinking inwardly\n\n⚠️ Fear is shaping policy\n\n👑 Internal insecurity is about to become public sin\n\nThe phrase shows the kingdom's corruption starting in the heart."],
    ["Now Shall the Kingdom Return to the House of David", "Jeroboam fears that if the people keep worshiping in Jerusalem, their loyalty will go back to David's line. The phrase explains the political fear behind his religious changes.\n\n👥 He fears losing the people's loyalty\n\n🏠 House of David means David's dynasty\n\n⚠️ Political insecurity is driving false worship\n\nThe phrase reveals the motive behind Jeroboam's next acts."],
  ],
  "1 Kings 12:31-33": [
    ["He Made an House of High Places", "A house of high places means a shrine or worship structure tied to unauthorized local worship sites. Jeroboam is creating an alternative worship system outside God's appointed pattern.\n\n⛰ High places are unauthorized worship sites\n\n🏠 He builds a religious system around them\n\n⚠️ This is organized false worship, not accidental drift\n\nThe phrase shows Jeroboam institutionalizing sin."],
    ["Made Priests of the Lowest of the People", "Jeroboam appoints priests from people who were not set apart by God's law for that role. Lowest here means ordinary common people from outside the proper priestly line.\n\n🙏 Priesthood is being remade unlawfully\n\n👥 Ordinary people are appointed without God's pattern\n\n⚠️ Worship order is being corrupted\n\nThe phrase explains another break from God's commands."],
    ["Jeroboam Ordained a Feast in the Eighth Month", "Jeroboam creates his own religious festival at a different time from the LORD's appointed feast calendar. Ordained means established or set up.\n\n🗓 He invents a festival time\n\n🧠 Ordained means established\n\n⚠️ He is copying and altering true worship\n\nThe phrase shows counterfeit religion taking formal shape."],
    ["On the Fifteenth Day of the Month", "Jeroboam sets the feast on a date that resembles the timing of the true feast in Judah. The phrase shows how his false system imitates God's pattern while twisting it.\n\n📅 The date is chosen carefully\n\n🎭 The false feast imitates true worship form\n\n⚠️ Counterfeit religion often copies before it corrupts\n\nThe phrase explains why the exact date matters."],
  ],
  "1 Kings 13:1-6": [
    ["There Came a Man of God Out of Judah by the Word of the LORD unto Bethel", "A man of God is a prophetic messenger sent by the LORD. The phrase shows he does not come on his own initiative but because God sent him to confront false worship at Bethel.\n\n👤 A prophetic messenger arrives\n\n🙏 He comes by God's word, not personal choice\n\n⚠️ Bethel's altar is about to be confronted\n\nThe phrase explains who this man is and why he comes."],
    ["Jeroboam Stood by the Altar to Burn Incense", "Jeroboam is personally participating in the false worship system he created. Burning incense is an act of worship, not just ceremony.\n\n🔥 Incense is part of worship\n\n👑 Jeroboam is personally involved in the sin\n\n⚠️ The king is leading corruption, not merely allowing it\n\nThe phrase shows his hands-on role in idolatrous practice."],
    ["He Cried Against the Altar in the Word of the LORD", "The man of God speaks against the altar itself because it represents the false worship system. In the word of the LORD means he is declaring God's judgment, not his own anger.\n\n🗣 The altar is denounced prophetically\n\n🙏 God's word drives the message\n\n⚠️ The object of false worship is placed under judgment\n\nThe phrase explains why the altar is addressed so directly."],
    ["Thus Saith the LORD", "This formula means the message comes from God with prophetic authority. It signals that what follows is divine speech, not mere religious opinion.\n\n📜 The words are God's message\n\n🙏 Prophetic authority is explicit\n\n⚖️ The coming judgment is not negotiable human advice\n\nThe phrase marks the seriousness of the oracle."],
  ],
  "1 Kings 13:7-12": [
    ["The King Said unto the Man of God", "Jeroboam now speaks to the prophet after the sign on the altar. The phrase marks the king's shift from hostility toward attempted hospitality and influence.\n\n👑 Jeroboam addresses the prophet directly\n\n🗣 The conversation changes tone\n\n⚠️ The king is trying to draw him in\n\nThe phrase opens the test of the prophet's obedience."],
    ["Come Home with Me", "Jeroboam invites the prophet to his house for refreshment and reward. The phrase is a temptation to compromise after delivering God's word.\n\n🏠 The prophet is invited into royal hospitality\n\n🎁 Reward is implied\n\n⚠️ Obedience is about to be tested by comfort and favor\n\nThe phrase shows the king trying to draw the prophet close."],
    ["The Man of God Said unto the King", "The prophet answers Jeroboam directly and firmly. The phrase matters because he refuses royal favor for the sake of obedience.\n\n👤 The prophet answers without fear\n\n👑 He speaks to the king plainly\n\n🙏 His loyalty is to God's command first\n\nThe phrase opens a model answer of obedience."],
    ["If Thou Wilt Give Me Half Thine House", "The prophet means that even a very great gift would not make him disobey God's command. Half thine house means immense wealth, not literally dividing the building.\n\n💰 A huge reward is being imagined\n\n🧠 House here means wealth and property\n\n🙏 Obedience is worth more than royal gifts\n\nThe phrase shows how firmly he rejects bribery and compromise."],
  ],
  "1 Kings 13:13-18": [
    ["He Said unto His Sons", "The old prophet begins instructing his sons after hearing about the man of God's visit. The phrase opens his pursuit of the visiting prophet.\n\n👨 A father directs his sons\n\n📖 The story shifts to another prophet figure\n\n⚠️ A new test is beginning\n\nThe phrase marks the start of the second encounter."],
    ["Saddle Me the Ass", "He tells his sons to prepare the donkey for travel. The phrase shows urgency in going after the man of God.\n\n🐴 The donkey is made ready\n\n🏃 He intends to pursue quickly\n\n📖 The action is immediate and deliberate\n\nThe phrase shows prompt movement into the next scene."],
    ["Went After the Man of God", "The old prophet follows the man of God down the road. The phrase shows intentional pursuit, not accidental meeting.\n\n🚶 He goes in search of him\n\n🎯 The meeting is deliberate\n\n⚠️ The prophet is being drawn into another encounter\n\nThe phrase shows the pursuit that leads to deception."],
    ["Found Him Sitting Under an Oak", "The man of God is found resting under a tree. The phrase places him in a vulnerable, paused moment between obedience and danger.\n\n🌳 He is resting under an oak\n\n😮 The journey has paused\n\n⚠️ A quiet moment becomes the place of testing\n\nThe phrase helps the reader picture the setting of the deception."],
  ],
  "1 Kings 13:19-24": [
    ["So He Went Back with Him", "The man of God returns with the old prophet instead of keeping God's command. The phrase marks the moment of disobedience.\n\n↩ He turns back\n\n⚠️ Obedience gives way to compromise\n\n🙏 A prophet can fail after speaking truth\n\nThe phrase shows the crucial wrong step in the story."],
    ["Did Eat Bread in His House", "Eating bread there means he accepted the hospitality God had forbidden him to take in that place. The phrase makes the disobedience concrete.\n\n🍞 He eats where he was told not to\n\n🏠 The violation happens in the house\n\n⚠️ The command is broken in a simple but real act\n\nThe phrase shows how disobedience can look ordinary while being serious."],
    ["It Came to Pass", "This marker moves the story into the moment when God's judgment is announced at the table. It signals that the consequences are now arriving.\n\n🕰 The next stage begins\n\n⚖️ Consequence is about to be spoken\n\n📖 The quiet meal turns into a judgment scene\n\nThe phrase marks the turning point."],
    ["As They Sat at the Table", "The word of judgment comes while they are sitting together in the middle of the meal. The phrase highlights the irony of judgment arriving in the setting of forbidden hospitality.\n\n🍽 They are seated at the meal\n\n⚠️ The place of compromise becomes the place of judgment\n\n📖 The scene is morally sharp and memorable\n\nThe phrase shows where the prophetic word strikes."],
  ],
  "1 Kings 13:25-30": [
    ["Men Passed by", "Travelers come upon the strange judgment scene on the road. The phrase introduces outside witnesses to what happened.\n\n🚶 Travelers witness the aftermath\n\n👀 The event becomes publicly visible\n\n📖 Others now confirm the judgment\n\nThe phrase broadens the story beyond the two prophets."],
    ["Saw the Carcase Cast in the Way", "Carcase means dead body. The travelers see the body lying on the road where the lion struck him.\n\n💀 Carcase means dead body\n\n🛣 The body lies in the road\n\n⚠️ The judgment is visible and sobering\n\nThe phrase states the reality of the death plainly."],
    ["When the Prophet That Brought Him Back from the Way Heard Thereof", "The old prophet hears the report and realizes what has happened. The phrase connects the news to the man whose deception led to the disobedience.\n\n👂 He hears the report\n\n⚠️ The one who drew him back must now face the result\n\n📖 The chain of cause and consequence comes into focus\n\nThe phrase brings the old prophet into the aftermath."],
    ["It Is the Man of God", "The old prophet recognizes that the dead man is the true prophet from Judah. The phrase shows that the judgment confirms God's word about him.\n\n👤 The identity is recognized\n\n🙏 He is still acknowledged as the man of God\n\n⚖️ The judgment has prophetic meaning, not random violence\n\nThe phrase names the dead prophet with solemn recognition."],
  ],
  "1 Kings 13:31-34": [
    ["It Came to Pass", "This marker introduces the old prophet's burial instructions and Jeroboam's continued sin. The phrase moves the story from judgment scene into lingering consequences.\n\n🕰 The story shifts again\n\n📖 Burial and reflection follow the death\n\n⚠️ But the larger national sin remains unchanged\n\nThe phrase opens the final movement of the chapter."],
    ["After He Had Buried Him", "The old prophet buries the man of God and then speaks about his message. The phrase shows respect being given after disobedience and judgment.\n\n🪦 Burial is completed\n\n🙏 Honor is still shown to the dead prophet\n\n📖 His word continues to matter after his death\n\nThe phrase marks the transition from burial to testimony."],
    ["For the Saying Which He Cried by the Word of the LORD Against the Altar in Bethel", "The old prophet affirms that the message spoken against Bethel's altar will surely happen. The saying is the prophetic word previously announced.\n\n📜 The prophecy is being reaffirmed\n\n🙏 It came by the LORD's word\n\n⚖️ The altar at Bethel remains under judgment\n\nThe phrase shows that the prophet's message stands even though the prophet fell."],
    ["Against All the Houses of the High Places Which Are in the Cities of Samaria", "This extends the judgment beyond one altar to the whole false worship system in the northern kingdom. Houses of the high places means shrine structures tied to unauthorized worship.\n\n⛰ High-place shrines are all included\n\n🏙 The false system spreads through the northern cities\n\n⚠️ God's judgment reaches the wider network, not only one site\n\nThe phrase broadens the scope of the warning."],
  ],
  "1 Kings 14:1-6": [
    ["At That Time Abijah the Son of Jeroboam Fell Sick", "Jeroboam's son becomes ill at a moment loaded with spiritual meaning for the house. The phrase opens a crisis inside Jeroboam's own family.\n\n👶 Jeroboam's son is sick\n\n⚠️ The royal house is under distress\n\n📖 Personal suffering enters the story of public sin\n\nThe phrase begins a family crisis tied to a sinful dynasty."],
    ["Abijah the Son of Jeroboam", "The boy is identified as Jeroboam's son, which matters because the prophecy will concern his father's whole house. The phrase ties the sick child to the ruling line.\n\n👦 The child belongs to the royal house\n\n🧬 Family identity matters for the coming message\n\n📖 The crisis is dynastic as well as personal\n\nThe phrase keeps the reader aware of whose son is suffering."],
    ["Of Jeroboam Fell Sick.", "The repeated wording keeps the illness and Jeroboam's connection to it in view. Scripture is pressing the family dimension of the event.\n\n📜 The illness is emphasized again\n\n👑 Jeroboam cannot keep his house untouched by his sin\n\n⚠️ The problem is now close and personal\n\nThe phrase reinforces the weight of the sickness."],
    ["Jeroboam Said to His Wife", "Jeroboam turns to his wife with a plan to seek prophetic information. The phrase opens his attempt to get an answer while hiding his identity.\n\n🗣 Jeroboam gives instructions\n\n👩 His wife becomes part of the plan\n\n⚠️ Fear drives him toward secrecy rather than repentance\n\nThe phrase marks the start of his concealed inquiry."],
  ],
  "1 Kings 14:7-12": [
    ["Thus Saith the LORD God of Israel", "This prophetic formula means the message comes from Israel's covenant God with full authority. It marks the speech as divine judgment.\n\n📜 The message is from the LORD\n\n🙏 Covenant authority stands behind it\n\n⚖️ Jeroboam is hearing God's own verdict\n\nThe phrase announces the seriousness of the oracle."],
    ["Forasmuch as I Exalted Thee from Among the People", "God reminds Jeroboam that his rise came from divine gift, not self-made greatness. Exalted thee means lifted you up to rulership.\n\n👑 Jeroboam's kingship was given by God\n\n🙏 His rise began in divine mercy\n\n⚖️ Judgment is harsher because privilege was real\n\nThe phrase explains the goodness Jeroboam sinned against."],
    ["Rent the Kingdom Away from the House of David", "Rent means tore. God tore most of the kingdom away from David's house and gave it to Jeroboam.\n\n🧠 Rent means tore away\n\n👑 The kingdom division was God's act of judgment\n\n⚠️ Jeroboam received a torn kingdom as a gift, not an entitlement\n\nThe phrase explains what God had done for him."],
    ["Gave It Thee", "The kingdom was given to Jeroboam by God. The phrase keeps stressing divine gift as the backdrop to Jeroboam's unfaithfulness.\n\n🎁 The rule was granted, not seized by right\n\n🙏 God's generosity is being recalled\n\n⚖️ Jeroboam sinned against a received gift\n\nThe phrase shows the personal nature of God's charge against him."],
  ],
  "1 Kings 14:13-18": [
    ["All Israel Shall Mourn for Him", "The child will be mourned by all Israel, which is unusual in Jeroboam's house. The phrase shows that this boy's death will be marked by grief and honor.\n\n😢 The nation will mourn him\n\n👦 The child is viewed differently from the rest of the house\n\n📖 His death carries a distinct meaning\n\nThe phrase shows that this son stands apart within a guilty dynasty."],
    ["For He Only of Jeroboam Shall Come to the Grave", "This means he alone from Jeroboam's house will receive a proper burial. The phrase highlights mercy toward one member of a judged family.\n\n🪦 He alone receives honorable burial\n\n⚖️ The rest of the house faces harsher judgment\n\n🙏 One life is marked off differently by God\n\nThe phrase explains his unique treatment."],
    ["Moreover the LORD Shall Raise Him Up a King Over Israel", "God promises to raise up another king who will cut off Jeroboam's house. Raise him up means appoint and bring forth.\n\n👑 Another ruler will arise by God's hand\n\n⚖️ Jeroboam's line will not last\n\n🙏 God remains sovereign over succession\n\nThe phrase announces a future instrument of judgment."],
    ["Who Shall Cut Off the House of Jeroboam That Day", "Cut off means destroy or bring an end to the dynasty. The house of Jeroboam means his royal line and family power.\n\n🏠 His dynasty will be ended\n\n⚖️ Judgment reaches the whole house\n\n📖 House means family line here\n\nThe phrase shows that the verdict is dynastic, not just personal."],
  ],
  "1 Kings 14:19-24": [
    ["The Rest of the Acts of Jeroboam", "This phrase points to the remaining record of Jeroboam's reign beyond what is told here. It is part of the standard royal summary formula.\n\n📜 The reign has a fuller record\n\n👑 This chapter gives selected highlights, not every detail\n\n📖 The writer now begins closing Jeroboam's account\n\nThe phrase marks the transition into summary."],
    ["How He Warred", "This refers to Jeroboam's military conflicts during his reign. The phrase reminds the reader that his kingdom was shaped by ongoing struggle.\n\n⚔️ Jeroboam fought wars\n\n👑 His reign was not peaceful stability\n\n📖 The summary includes political and military action\n\nThe phrase shows another dimension of his kingship."],
    ["The Days Which Jeroboam Reigned Were Two", "The verse is counting the length of his reign, which totals twenty-two years. The phrase begins the formal dating of his kingship.\n\n📅 The reign length is being counted\n\n👑 Royal summaries often include this detail\n\n📖 The king's years are measured and limited\n\nThe phrase opens the official close of his reign."],
    ["He Slept with His Fathers", "This is the standard biblical way of saying Jeroboam died. It is an idiom for death and joining the generations before him.\n\n⚰ It means he died\n\n🧠 The wording is a death formula, not literal sleep\n\n📖 His reign has reached its end\n\nThe phrase explains the familiar royal closing formula."],
  ],
  "1 Kings 14:25-30": [
    ["It Came to Pass in the Fifth Year of King Rehoboam", "This gives the timing for Shishak's invasion of Jerusalem. The phrase roots the event in a precise year of Rehoboam's reign.\n\n📅 The date is specific\n\n👑 Rehoboam's reign is now under external threat\n\n📖 The event is historically placed, not vaguely remembered\n\nThe phrase marks when the invasion happened."],
    ["That Shishak King of Egypt Came Up Against Jerusalem", "Shishak marches up against Jerusalem in attack. Came up against means advanced militarily against the city.\n\n⚔️ Egypt becomes the aggressor\n\n🏙 Jerusalem is the target\n\n👑 Rehoboam's kingdom is being humbled externally\n\nThe phrase states the invasion plainly."],
    ["He Took Away the Treasures of the House of the LORD", "Shishak strips wealth from the temple. The phrase shows sacred riches being lost because of Judah's unfaithfulness.\n\n🏛 Temple wealth is taken away\n\n⚠️ Judgment reaches the holy house materially\n\n📖 Sacred glory is diminished visibly\n\nThe phrase explains the humiliation of the temple."],
    ["The Treasures of the King’s House", "Shishak also takes the wealth of the palace, not just the temple. The phrase shows both worship center and royal center being stripped.\n\n🏠 Palace wealth is also lost\n\n👑 Royal splendor is reduced\n\n⚖️ Judgment touches both sacred and royal glory\n\nThe phrase broadens the scope of the loss."],
  ],
  "1 Kings 14:31": [
    ["Rehoboam Slept with His Fathers", "This is the standard formula meaning Rehoboam died. The phrase closes his reign with the normal royal death wording.\n\n⚰ Rehoboam died\n\n🧠 The phrase is an idiom for death\n\n📖 His reign has ended\n\nThe phrase explains the formal close of his story."],
    ["Was Buried with His Fathers in the City of David", "Rehoboam is buried in Jerusalem among the Davidic kings. The phrase locates his burial within the royal line.\n\n🪦 He is buried in David's city\n\n👑 The dynasty's burial place remains Jerusalem\n\n📖 His story ends within the line of David\n\nThe phrase gives his resting place and dynastic setting."],
    ["Slept with His Fathers, and Was Buried with", "The repeated wording continues the standard royal closing formula. Scripture is formally ending his reign through death and burial language.\n\n📜 The formula is being repeated\n\n⚰ Death and burial close the reign\n\n👑 This is the official end of a king's account\n\nThe phrase reinforces the formal summary style."],
    ["With His Fathers, and Was Buried with His", "This shortened repetition still points to death and burial among his forefathers. The formula keeps the dynastic frame in view.\n\n⚰ The king joins earlier generations in death\n\n🪦 Burial ties him to the royal line\n\n📖 The narrative closes in a formal pattern\n\nThe phrase completes the standard ending."],
  ],
  "1 Kings 15:1-6": [
    ["Now in the Eighteenth Year of King Jeroboam the Son of Nebat Reigned Abijam Over Judah", "The verse dates Abijam's reign by Jeroboam's year, showing how the two kingdoms are tracked together. It also identifies Abijam as Judah's king.\n\n📅 Reigns are dated against each other\n\n👑 Abijam now rules Judah\n\n📖 The divided kingdoms are being narrated side by side\n\nThe phrase explains the chronological style of the book."],
    ["Eighteenth Year of King Jeroboam", "This is the regnal year marker used to place Abijam's accession in time. The phrase helps synchronize Judah's story with Israel's.\n\n📅 A precise year is being given\n\n👑 The other kingdom's calendar helps date this reign\n\n📖 The history is carefully synchronized\n\nThe phrase explains why another king's year is mentioned."],
    ["King Jeroboam the Son of", "The line repeats Jeroboam's identification as the northern king whose reign anchors the dating. The phrase keeps the divided-kingdom framework clear.\n\n👤 Jeroboam remains the reference point\n\n📖 The split kingdom setting stays in view\n\n📅 Dating and identity are tied together\n\nThe phrase reinforces the historical frame."],
    ["Three Years Reigned He in Jerusalem", "Abijam's reign lasted three years, and Jerusalem remained the capital of Judah. The phrase gives both duration and location.\n\n📅 His reign was short\n\n🏙 Jerusalem remains Judah's royal city\n\n👑 His kingship is measured and limited\n\nThe phrase summarizes the length and center of his rule."],
  ],
  "1 Kings 15:7-12": [
    ["Now the Rest of the Acts of Abijam", "This begins the standard summary of the king's remaining deeds. The phrase signals that the writer is moving toward closure on Abijam.\n\n📜 A summary formula begins\n\n👑 The account is narrowing toward its close\n\n📖 Not every action is retold in detail\n\nThe phrase marks the shift from narrative to royal summary."],
    ["All That He Did", "This refers to the broader record of Abijam's reign outside the selected details given here. The phrase reminds the reader that the book is selective.\n\n📖 The account is selective, not exhaustive\n\n👑 His reign included more than is written here\n\n📜 Another fuller record is assumed\n\nThe phrase explains the summary style."],
    ["Abijam Slept with His Fathers", "This is the standard way of saying Abijam died. The phrase closes his reign in the familiar royal pattern.\n\n⚰ It means Abijam died\n\n🧠 The wording is a royal death idiom\n\n👑 His rule has ended\n\nThe phrase explains the formula plainly."],
    ["They Buried Him in the City of David", "Abijam is buried in Jerusalem among the Davidic kings. The phrase locates his burial within Judah's royal line.\n\n🪦 He is buried in the royal city\n\n🏙 The city of David remains the dynastic burial place\n\n📖 His kingship ends within David's line\n\nThe phrase gives his burial setting."],
  ],
  "1 Kings 15:13-18": [
    ["Also Maachah His Mother", "Maachah is identified as a leading woman in Asa's royal family, likely in the role of queen mother. The phrase introduces the family reform Asa will make.\n\n👩 Maachah is a prominent royal woman\n\n🏠 The reform reaches into the king's own household\n\n⚠️ Family ties will not shield idolatry\n\nThe phrase opens a difficult but important act of reform."],
    ["Even Her He Removed from Being Queen", "Asa removes Maachah from her position because of her idolatry. The phrase shows that reform can require action even against close family members.\n\n🚫 She is removed from royal status\n\n⚖️ Idolatry is not excused by relationship\n\n👑 Asa acts against family for the sake of covenant faithfulness\n\nThe phrase shows costly reform."],
    ["But the High Places Were Not Removed", "Although Asa did real reform, he did not remove every unauthorized worship site. The phrase shows his obedience was genuine but incomplete.\n\n⛰ High places remained\n\n⚖️ Reform was real but not total\n\n📖 The king is evaluated honestly, with strengths and limits\n\nThe phrase explains the mixed assessment of Asa."],
    ["Nevertheless Asa’s Heart Was Perfect with the LORD All His Days", "Perfect here means wholly devoted, not absolutely sinless. The phrase says Asa's overall loyalty belonged to God.\n\n❤️ Perfect means fully devoted here\n\n🙏 Asa's basic allegiance was true\n\n⚖️ Scripture can note flaws without denying overall faithfulness\n\nThe phrase explains the positive verdict on his heart."],
  ],
  "1 Kings 15:19-24": [
    ["There Is a League Between Me", "A league is an alliance or treaty. Asa is proposing a political agreement with Ben-hadad.\n\n🤝 A league means an alliance\n\n👑 Kings use diplomacy as well as warfare\n\n📖 The verse is about treaty-making\n\nThe phrase explains the kind of relationship Asa is offering."],
    ["Between My Father", "Asa refers to an earlier relationship between their fathers to strengthen his proposal. The phrase appeals to inherited diplomatic ties.\n\n🧬 Past family diplomacy is invoked\n\n🤝 Old relationships are used to support new alliances\n\n📖 The argument reaches backward for leverage\n\nThe phrase explains why he mentions his father."],
    ["So Ben-hadad Hearkened unto King Asa", "Hearkened means listened and responded. Ben-hadad accepts Asa's proposal and acts on it.\n\n👂 Hearkened means listened with action\n\n🤝 The alliance request succeeds\n\n⚔️ Diplomacy now turns into military pressure on Israel\n\nThe phrase shows the treaty producing results."],
    ["Sent the Captains of the Hosts Which He Had Against the Cities of Israel", "Ben-hadad sends his military commanders against northern Israelite cities. Hosts means armies.\n\n🪖 Captains of the hosts means army commanders\n\n⚔️ The alliance results in military attack\n\n🏙 Cities of Israel become the target\n\nThe phrase explains the concrete outcome of Asa's diplomacy."],
  ],
  "1 Kings 15:25-30": [
    ["Nadab the Son of Jeroboam Began to Reign Over Israel in the Second Year of Asa King of Judah", "Nadab succeeds Jeroboam in the northern kingdom, and his reign is dated by Asa's rule in Judah. The phrase keeps the two-kingdom timeline synchronized.\n\n📅 The divided kingdoms are dated together\n\n👑 Nadab now rules Israel\n\n📖 Succession continues in the northern line\n\nThe phrase introduces the next king of Israel clearly."],
    ["Reigned Over Israel Two Years", "Nadab's reign was short, lasting only two years. The phrase emphasizes how brief and unstable the northern dynasty was becoming.\n\n📅 His reign is brief\n\n⚠️ Northern kingship is unstable\n\n👑 The throne does not rest long in this house\n\nThe phrase summarizes the short duration of his rule."],
    ["He Did Evil in the Sight of the LORD", "This means God judged Nadab's conduct as evil, not merely politically weak. The phrase is a moral evaluation from God's perspective.\n\n⚖️ God evaluates the king morally\n\n👑 Kings are judged by covenant faithfulness, not only success\n\n📖 Evil is defined from the LORD's sight\n\nThe phrase explains the spiritual verdict on his reign."],
    ["Walked in the Way of His Father", "To walk in his father's way means to continue the same sinful pattern Jeroboam established. The phrase is about imitation in conduct.\n\n🚶 Walk means live in the same pattern\n\n👨 Nadab copies Jeroboam's sin\n\n⚠️ The corruption is inherited and continued\n\nThe phrase shows that the dynasty keeps reproducing the same evil."],
  ],
  "1 Kings 15:31-34": [
    ["Now the Rest of the Acts of Nadab", "This begins the formal summary of Nadab's reign. The phrase signals the narrative is closing on him quickly.\n\n📜 A standard royal summary begins\n\n👑 Nadab's account is ending\n\n📖 The book remains selective in what it tells\n\nThe phrase marks the move into closure."],
    ["All That He Did", "This refers to the broader record of his reign outside what is written here. The phrase reminds the reader that the author is not telling everything.\n\n📖 Not every act is recorded here\n\n👑 The reign had a fuller history than the summary gives\n\n📜 The formula points beyond the current narrative\n\nThe phrase explains the summary style again."],
    ["There Was War Between Asa", "This means there was ongoing conflict between Asa of Judah and Baasha of Israel. The phrase highlights persistent division between the kingdoms.\n\n⚔️ War continues between north and south\n\n👑 The divided kingdoms remain hostile\n\n📖 The split is political and military, not only religious\n\nThe phrase shows the ongoing cost of the division."],
    ["Baasha King of Israel All Their Days", "The warfare continued throughout the overlap of their reigns. All their days means as long as both kings lived in office.\n\n🕰 The conflict was long-lasting\n\n⚔️ Peace did not return between them\n\n👑 The divided monarchy stays tense and violent\n\nThe phrase explains the duration of the struggle."],
  ],
};

function rewriteDay85RoyalSection(section: RoyalPhraseSectionInput): RoyalPhraseSectionInput {
  const overrides = DAY_85_ROYAL_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const DAY_78_SECOND_SAMUEL_OVERRIDES: Record<string, Array<[fragment: string, body: string]>> = {
  "2 Samuel 8:1-6": [
    ["After This It Came to Pass", "After this it came to pass is a simple time marker that moves the story forward into David's next victories.\n\n📜 A new stage\n\n👑 David's reign continues\n\n⚔️ More battles follow\n\nThe phrase tells the reader the kingdom story is moving into another campaign."],
    ["That David Smote the Philistines", "Smote means struck down in battle. David defeats the Philistines, the old enemy that had long threatened Israel.\n\n⚔️ Philistine defeat\n\n🛡️ Israel gains relief\n\n👑 David acts as king\n\nThe phrase shows David bringing military victory over a familiar enemy."],
    ["He Smote Moab", "This means David also defeats Moab in war. The verse is recording how far David's rule is reaching beyond Israel's borders.\n\n⚔️ Moab defeated\n\n🌍 Kingdom influence spreads\n\n👑 David's power grows\n\nThe phrase marks another nation coming under David's strength."],
    ["Measured Them with a Line", "Measured them with a line describes a severe way of counting out captives for judgment or survival. The line is being used to divide who will live and who will die.\n\n📏 A measured judgment\n\n⚖️ Lives are being decided\n\n⚠️ A hard war scene\n\nThe phrase is grim because it shows conquest turning into exact judgment."],
  ],
  "2 Samuel 8:7-12": [
    ["Shields of Gold", "These shields of gold are royal battle gear taken from Hadadezer's servants. Taking them shows David has defeated a wealthy and powerful enemy.\n\n🛡️ Royal armor taken\n\n💰 Enemy wealth captured\n\n👑 David's victory confirmed\n\nThe phrase shows that David's triumph includes the enemy's treasures."],
    ["Brought Them to Jerusalem", "The captured goods are carried to Jerusalem, David's capital city. The victory is being gathered into the center of the kingdom.\n\n🏙️ Jerusalem\n\n📦 Spoil brought home\n\n👑 The capital is strengthened\n\nThe phrase shows the fruit of victory being brought to the king's city."],
    ["Cities of Hadadezer", "These are the towns that belonged to Hadadezer's domain. Mentioning his cities helps the reader see that David is defeating a real regional power, not a small local threat.\n\n🏘️ Enemy towns\n\n🌍 A larger kingdom involved\n\n⚔️ Real political reach\n\nThe phrase widens the scale of the conflict."],
    ["Exceeding Much Brass", "Brass here means a large quantity of bronze metal. David is taking valuable materials that can later be used for royal or temple purposes.\n\n🥉 Valuable metal\n\n📦 War spoil\n\n🏛️ Future use in worship and rule\n\nThe phrase shows the victory producing resources, not only headlines."],
  ],
  "2 Samuel 8:13-18": [
    ["David Gat Him a Name", "Got him a name means David gained fame or renown through this victory. His reputation as a successful king is spreading.\n\n📣 A name is made\n\n👑 David's fame grows\n\n⚔️ Victory shapes reputation\n\nThe phrase is about public honor earned through conquest."],
    ["Being Eighteen Thousand Men", "This number tells how many enemy soldiers were struck down. The large count shows the scale of the battle in the Valley of Salt.\n\n🔢 A large defeat\n\n⚔️ The battle was major\n\n📍 Valley of Salt remembered\n\nThe phrase makes the victory feel concrete and costly."],
    ["He Put Garrisons in Edom", "Garrisons are military posts placed in conquered territory to hold control. David is not only winning the battle; he is securing the land afterward.\n\n🪖 Garrisons placed\n\n🌍 Edom controlled\n\n👑 Rule is enforced\n\nThe phrase shows conquest turning into ongoing control."],
    ["Throughout All Edom Put He Garrisons", "This means David's military posts were spread all through Edom, not just in one place. The whole region is being brought under his authority.\n\n🪖 Posts throughout Edom\n\n🌍 Regional control\n\n👑 David's rule extends fully\n\nThe phrase emphasizes how complete the takeover became."],
  ],
  "2 Samuel 9:1-6": [
    ["House of Saul", "The house of Saul means Saul's family line or royal household. David is asking whether anyone from Saul's family is still alive.\n\n🏠 Saul's family line\n\n👑 The former royal house\n\n❓ A search begins\n\nThe phrase opens a mercy story inside an old rival family."],
    ["Shew Him Kindness", "Shew means show. David wants to show covenant kindness for Jonathan's sake, meaning loyal love because of his promise to Jonathan.\n\n💛 Covenant kindness\n\n🤝 Jonathan remembered\n\n👑 David keeps his word\n\nThe phrase shows mercy growing out of an earlier covenant."],
    ["Whose Name Was Ziba", "Ziba is introduced as a servant from Saul's household who can identify who remains. He becomes the link between David and Saul's surviving family.\n\n👤 Ziba introduced\n\n🏠 Connected to Saul's house\n\n📜 He knows the family situation\n\nThe phrase brings in the witness who can move the story forward."],
    ["Called Him unto David", "Someone from Saul's house is summoned into David's presence. The call to the king matters because it could mean danger or mercy.\n\n👑 Called before David\n\n⚠️ Tension in the scene\n\n💛 Mercy is about to appear\n\nThe phrase sets up a meeting that could have gone very differently."],
  ],
  "2 Samuel 9:7-12": [
    ["David Said unto Him", "David now speaks directly to Mephibosheth, and his words immediately steer the scene toward safety instead of fear.\n\n👑 The king speaks\n\n💛 Mercy, not danger\n\n📜 A fearful meeting turns\n\nThe phrase matters because David's words reshape the whole encounter."],
    ["Shew Thee Kindness", "David promises to show Mephibosheth covenant kindness because of Jonathan, Mephibosheth's father. The mercy is rooted in David's earlier oath.\n\n💛 Covenant mercy\n\n🤝 Jonathan remembered\n\n👑 David keeps promise\n\nThe phrase explains why Saul's grandson is being spared and honored."],
    ["He Bowed Himself", "Mephibosheth bows low before David in humility and fear. He comes like a dependent servant before a king who has power over his life.\n\n🙇 Deep humility\n\n👑 Before the king\n\n⚠️ Fear in the moment\n\nThe phrase shows how vulnerable Mephibosheth feels."],
    ["What Is Thy Servant", "Mephibosheth is asking who he is that David should notice him at all. He sees himself as low and unworthy, not as someone who expects favor.\n\n❓ Why notice me?\n\n😢 Unworthiness felt\n\n💛 Mercy seems surprising\n\nThe phrase reveals how astonishing David's kindness feels to him."],
  ],
  "2 Samuel 9:13": [
    ["So Mephibosheth Dwelt in Jerusalem", "Mephibosheth now lives in Jerusalem under David's protection. He is no longer a hidden survivor on the edge, but a cared-for member near the king.\n\n🏙️ Jerusalem home\n\n💛 Protected life\n\n👑 Near David's court\n\nThe phrase shows his new place inside the kingdom."],
    ["King's Table", "To eat continually at the king's table means Mephibosheth receives ongoing welcome, provision, and honor from David.\n\n🍽️ Constant provision\n\n👑 Royal welcome\n\n💛 Lasting favor\n\nThe phrase shows mercy becoming a steady way of life, not a one-time gift."],
    ["Mephibosheth Dwelt in Jerusalem: for He Did Eat", "Mephibosheth's dwelling in Jerusalem is tied to his place at David's table. His home and his welcome now belong together.\n\n🏙️ He remains in the city\n\n🍽️ He remains at the table\n\n💛 Mercy stays in place\n\nThe phrase connects belonging with daily provision."],
    ["Dwelt in Jerusalem: for He Did Eat Continually", "Continually means regularly and without interruption. Mephibosheth's life under David is marked by ongoing care, not temporary shelter.\n\n⏳ Continual care\n\n🍽️ Daily welcome\n\n💛 Mercy that lasts\n\nThe phrase underscores how constant David's kindness became."],
  ],
  "2 Samuel 10:1-6": [
    ["It Came to Pass After This", "This time marker moves the story into David's dealings with Ammon after the mercy shown to Mephibosheth.\n\n📜 Another event begins\n\n👑 David's reign continues\n\n🔁 The story turns again\n\nThe phrase simply opens the next movement in the kingdom story."],
    ["King of the Children of Ammon Died", "The Ammonite king's death creates a change in leadership. His son Hanun now takes the throne, and David responds to that transition.\n\n👑 A king dies\n\n🏠 A son succeeds him\n\n📜 Leadership changes\n\nThe phrase explains why David sends comforters at all."],
    ["Then Said David", "David decides to act kindly toward Hanun after his father's death. The phrase introduces David's intention before the misunderstanding begins.\n\n👑 David decides\n\n💛 A kind intention\n\n📜 The next action starts here\n\nThe phrase shows the king initiating mercy, not aggression."],
    ["Shew Kindness unto Hanun", "David wants to show kindness to Hanun because Hanun's father had shown kindness to him. The move is meant as goodwill between kings.\n\n💛 Kindness repaid\n\n🤝 Political goodwill\n\n👑 David honors a past favor\n\nThe phrase shows diplomacy beginning with remembered kindness."],
  ],
  "2 Samuel 10:7-12": [
    ["When David Heard of It", "David hears that Ammon has turned the moment into war by hiring Syrian help. He must now respond to insult and military threat.\n\n👂 News reaches David\n\n⚔️ A crisis forms\n\n👑 The king must answer\n\nThe phrase marks the shift from diplomacy to battle."],
    ["He Sent Joab", "David sends Joab, his commander, to lead the army. Joab goes as David's military hand in the conflict.\n\n🪖 Joab sent out\n\n👑 David commands\n\n⚔️ War response begins\n\nThe phrase shows David acting through his general."],
    ["Children of Ammon Came Out", "The Ammonites come out to meet the battle instead of waiting behind their walls. They are taking the field with their allies nearby.\n\n⚔️ Ammon takes position\n\n🚪 They come out to fight\n\n🤝 Allied forces involved\n\nThe phrase shows the enemy stepping fully into the conflict."],
    ["Battle in Array at the Entering in of the Gate", "To put the battle in array means arrange troops for combat. The Ammonites line up near the city gate while their allies are set elsewhere.\n\n🪖 Troops arranged\n\n🚪 Near the city gate\n\n⚔️ The battle is carefully set\n\nThe phrase helps the reader picture the battlefield layout."],
  ],
  "2 Samuel 10:13-18": [
    ["Joab Drew Nigh", "Drew nigh means moved forward to engage. Joab advances into battle rather than waiting passively.\n\n⚔️ Joab advances\n\n🪖 The fight begins\n\n👑 David's commander acts\n\nThe phrase marks the actual clash of armies."],
    ["People That Were with Him", "This refers to the soldiers serving under Joab. The line reminds the reader that commanders do not fight alone but lead real men into danger.\n\n👥 Joab's men\n\n🪖 An army under command\n\n⚔️ Shared risk\n\nThe phrase keeps the human side of battle visible."],
    ["Children of Ammon Saw That the Syrians Were Fled", "The Ammonites see their Syrian allies running away. Once they lose allied support, their own courage collapses.\n\n👀 They see the allies flee\n\n🤝 Support is gone\n\n⚠️ Panic spreads\n\nThe phrase shows one defeat triggering another."],
    ["Then Fled They Also Before Abishai", "The Ammonites run before Abishai after seeing the Syrians break. Their retreat shows the battle has turned decisively against them.\n\n🏃 They flee\n\n🪖 Abishai presses them\n\n⚔️ The enemy line breaks\n\nThe phrase records the collapse of Ammon's side of the battle."],
  ],
  "2 Samuel 10:19": [
    ["Servants to Hadarezer Saw", "These kings had been subject to Hadarezer, but now they see his forces beaten before Israel. The loss changes their political loyalties.\n\n👑 Dependent kings watch\n\n⚔️ Hadarezer is beaten\n\n🔁 Power shifts\n\nThe phrase shows smaller rulers rethinking where strength now lies."],
    ["They Made Peace with Israel", "The defeated kings make peace with Israel instead of continuing resistance. They would rather submit than keep fighting David's strength.\n\n🤝 Peace made\n\n🛑 Fighting stops\n\n👑 Israel's power recognized\n\nThe phrase shows victory ending in political submission."],
    ["All the Kings That Were Servants to Hadarezer", "These are the rulers who had served under Hadarezer's larger power. Mentioning them shows that David's victory is affecting a network of nations, not one city only.\n\n👑 Many rulers involved\n\n🌍 A wider political map\n\n⚔️ One defeat affects many\n\nThe phrase broadens the scale of the victory."],
    ["The Kings That Were Servants to Hadarezer Saw", "Saw means they understood the military outcome clearly enough to change sides. Their sight leads directly to surrender and peace.\n\n👀 They see the result\n\n🧠 They understand the danger\n\n🤝 They choose peace\n\nThe phrase links what they witnessed to the decision they made."],
  ],
  "2 Samuel 11:1-6": [
    ["It Came to Pass", "This phrase opens the next event in the story, but what follows is not another victory scene. The new movement will expose David's sin.\n\n📜 A new event opens\n\n👑 David remains central\n\n⚠️ The story turns dark\n\nThe phrase quietly introduces a tragic shift."],
    ["After the Year Was Expired", "This means the season for kings to go out to war had come around again. The timing matters because David should have been leading in battle.\n\n🗓️ War season returns\n\n👑 Kings usually go out\n\n⚠️ David's absence matters\n\nThe phrase prepares the reader to notice that David is not where he ought to be."],
    ["David Arose from Off His Bed", "David gets up late in the day from his bed in Jerusalem. The detail presents a king at ease while his army is away at war.\n\n🛏️ David at ease\n\n🏙️ Still in Jerusalem\n\n⚠️ A dangerous setting\n\nThe phrase begins the chain of choices that follow."],
    ["Enquired After the Woman", "David asks for information about the woman he has seen. The inquiry matters because he already learns enough to know she belongs to another man.\n\n❓ David asks further\n\n👁️ Desire turns into action\n\n⚠️ Knowledge does not stop him\n\nThe phrase marks the moment temptation becomes pursuit."],
  ],
  "2 Samuel 11:7-12": [
    ["When Uriah Was Come unto Him", "Uriah is brought in from the battlefield into David's presence. The scene feels ordinary on the surface, but David is using it to hide his sin.\n\n👑 Uriah before David\n\n⚔️ Brought from battle\n\n⚠️ A cover-up begins\n\nThe phrase opens David's attempt to manipulate events."],
    ["David Demanded of Him How Joab Did", "David asks about Joab and the war as if this were a normal military conversation. The questions create a surface of routine over a hidden agenda.\n\n❓ Questions about the war\n\n🎭 Normal words on the surface\n\n⚠️ Hidden motive underneath\n\nThe phrase shows David masking his purpose."],
    ["David Said to Uriah", "David now tells Uriah what to do next. His words are aimed at sending Uriah home so David's sin can be concealed.\n\n👑 David directs Uriah\n\n🏠 Home is the target\n\n⚠️ The cover-up deepens\n\nThe phrase introduces deliberate manipulation through royal speech."],
    ["Go Down to Thy House", "David wants Uriah to go home, rest, and be with his wife. The command is part of David's effort to make the pregnancy appear to be Uriah's.\n\n🏠 Go home\n\n🎭 A cover story is being built\n\n⚠️ David uses his power wrongly\n\nThe phrase sounds kind, but its purpose is corrupt."],
  ],
  "2 Samuel 11:13-18": [
    ["When David Had Called Him", "David brings Uriah in again after the first plan fails. The repeated call shows David persisting in a sinful scheme.\n\n👑 Uriah summoned again\n\n🔁 The plan continues\n\n⚠️ David will not stop\n\nThe phrase shows the cover-up deepening after failure."],
    ["He Did Eat", "Uriah eats and drinks at David's table, even to the point of drunkenness. David is now trying to weaken Uriah's judgment to get the result he wants.\n\n🍷 Uriah made drunk\n\n👑 David controls the setting\n\n⚠️ Manipulation increases\n\nThe phrase shows David using hospitality as a tool of deceit."],
    ["It Came to Pass in the Morning", "Morning comes, but David does not repent overnight. Instead, he moves to a still darker plan.\n\n🌅 A new day begins\n\n⚠️ Sin is not stopping\n\n📜 The story worsens\n\nThe phrase marks the transition from failed deception to plotted death."],
    ["David Wrote a Letter to Joab", "David writes orders to Joab for Uriah's death and sends the letter by Uriah himself. The horror is that Uriah carries his own death order.\n\n✉️ A deadly letter\n\n🪖 Joab is drawn in\n\n⚠️ Uriah carries his own sentence\n\nThe phrase shows how far David's sin has progressed."],
  ],
  "2 Samuel 11:19-24": [
    ["Charged the Messenger", "Joab instructs the messenger exactly how to report the battle to David. The message has to be managed because the deaths came from a dangerous and questionable attack.\n\n📨 A report is prepared\n\n🪖 Joab controls the wording\n\n⚠️ Bad news must be handled carefully\n\nThe phrase shows how the cover-up now involves communication and damage control."],
    ["Matters of the War unto the King", "These are the details of the battle that must be told to David. The phrase reminds the reader that David is hearing war news as king while secretly causing one death in particular.\n\n👑 A king's battle report\n\n⚔️ Public war, private guilt\n\n📜 The story splits in two layers\n\nThe phrase holds together David's public role and hidden sin."],
    ["King's Wrath Arise", "Joab expects David to be angry about the reckless approach to the wall. Wrath arise means the king's anger flares up at the military failure.\n\n😠 Expected royal anger\n\n🏹 A risky attack\n\n⚠️ The deaths need explaining\n\nThe phrase prepares the messenger for David's reaction."],
    ["He Say unto Thee", "The messenger is told what David may say and how to answer him. The moment is scripted because everyone involved knows the report is politically dangerous.\n\n🗣️ Expected response\n\n📨 A coached answer\n\n⚠️ Control of the story matters\n\nThe phrase shows how carefully this bad news is being managed."],
  ],
  "2 Samuel 11:25-27": [
    ["Then David Said unto the Messenger", "David responds to the report in controlled, royal language. He speaks as if this were ordinary wartime loss, not the outcome he had arranged.\n\n👑 David answers calmly\n\n🎭 Public composure\n\n⚠️ Hidden guilt remains\n\nThe phrase shows David speaking as king while concealing his sin."],
    ["Thus Shalt Thou Say unto Joab", "David sends a message back to Joab telling him not to let the matter trouble him. He is smoothing over a death that he himself engineered.\n\n📨 Message back to Joab\n\n⚔️ The death is normalized\n\n⚠️ David hardens himself\n\nThe phrase shows how sin can teach a person to speak coldly about evil."],
    ["Wife of Uriah Heard", "Bathsheba hears that Uriah her husband is dead. The line makes the loss personal again after all the military talk.\n\n😢 Bathsheba hears the news\n\n💔 Uriah is named as her husband\n\n📜 The human grief returns\n\nThe phrase pulls the story back to the wounded household."],
    ["She Mourned for Her Husband", "Bathsheba grieves Uriah as her husband. The mourning is real, even though David's next action will quickly turn the situation toward his own household.\n\n😢 Real mourning\n\n💔 A husband is lost\n\n⚠️ David's sin leaves grief behind\n\nThe phrase makes sure the death is felt as a true personal loss."],
  ],
};

function rewriteDay78SecondSamuelSection(section: RoyalPhraseSectionInput): RoyalPhraseSectionInput {
  const overrides = DAY_78_SECOND_SAMUEL_OVERRIDES[section.reference];
  if (!overrides) return section;

  return {
    ...section,
    phrases: section.phrases.map(([title, body]) => {
      const match = overrides.find(([fragment]) => title.includes(fragment));
      return [title, match ? match[1] : body];
    }),
  };
}

const sections = [
  {
    book: "1 Samuel",
    chapter: 31,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Samuel 31:1-6",
    title: "Now the Philistines Fought Against Israel",
    icon: "🛡️",
    phrases: [
      [
        "📜 Now the Philistines Fought Against Israel",
        "Now the Philistines Fought Against Israel is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "🧠 The Men of Israel Fled from Before the Philistines",
        "The Men of Israel Fled from Before the Philistines is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ],
      [
        "🏙️ The Philistines Followed Hard Upon Saul",
        "The Philistines Followed Hard Upon Saul keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🏠 Upon His Sons",
        "Upon His Sons is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Samuel",
    chapter: 31,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Samuel 31:7-12",
    title: "When the Men of Israel Were on the Other",
    icon: "🏛️",
    phrases: [
      [
        "🗡️ When the Men of Israel That Were on the Other Side of the Valley",
        "When the Men of Israel That Were on the Other Side of the Valley focuses on the people, not only the king. The nation is being pulled by the choices of its leaders.\n\nWhen tribes and people groups are named, the reader should notice how public the consequences have become.\n\n\n\n🏙️ The people\n\n👑 Public leadership\n\n⚠️ Shared consequences\n\n\n\nThe phrase helps the reader see the kingdom story as both personal and national."
      ],
      [
        "😢 They That Were on the Other Side Jordan",
        "They That Were on the Other Side Jordan names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "🔥 It Came to Pass on the Morrow",
        "It Came to Pass on the Morrow is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "🏙️ When the Philistines Came to Strip the Slain",
        "When the Philistines Came to Strip the Slain is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ]
    ]
  },
  {
    book: "1 Samuel",
    chapter: 31,
    startVerse: 13,
    endVerse: 13,
    reference: "1 Samuel 31:13",
    title: "They Took Their Bones",
    icon: "🧠",
    phrases: [
      [
        "⚠️ They Took Their Bones",
        "They Took Their Bones is burial language. It shows honor being given after shame, defeat, or death.\n\nBurial mattered because bodies were not treated as trash. Even in judgment, the story pauses over dignity and grief.\n\n\n\n😢 Death honored\n\n🏠 Community memory\n\n📜 Sorrow handled with care\n\n\n\nThe phrase helps the reader see respect and grief in a chapter full of collapse."
      ],
      [
        "📦 Buried Them Under a Tree at Jabesh",
        "Buried Them Under a Tree at Jabesh names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "🕍 Took Their Bones, and Buried Them Under a",
        "Took Their Bones, and Buried Them Under a is burial language. It shows honor being given after shame, defeat, or death.\n\nBurial mattered because bodies were not treated as trash. Even in judgment, the story pauses over dignity and grief.\n\n\n\n😢 Death honored\n\n🏠 Community memory\n\n📜 Sorrow handled with care\n\n\n\nThe phrase helps the reader see respect and grief in a chapter full of collapse."
      ],
      [
        "🏙️ Their Bones, and Buried Them Under a Tree",
        "Their Bones, and Buried Them Under a Tree is burial language. It shows honor being given after shame, defeat, or death.\n\nBurial mattered because bodies were not treated as trash. Even in judgment, the story pauses over dignity and grief.\n\n\n\n😢 Death honored\n\n🏠 Community memory\n\n📜 Sorrow handled with care\n\n\n\nThe phrase helps the reader see respect and grief in a chapter full of collapse."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 1,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 1:1-6",
    title: "Now It Came to Pass After the Death",
    icon: "🗡️",
    phrases: [
      [
        "🙏 Now It Came to Pass After the Death of Saul",
        "Now It Came to Pass After the Death of Saul is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ],
      [
        "👑 When David Was Returned from the Slaughter of the Amalekites",
        "When David Was Returned from the Slaughter of the Amalekites keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "📦 It Came Even to Pass on the Third Day",
        "It Came Even to Pass on the Third Day is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "💛 A Man Came Out of the Camp from Saul with His Clothes Rent",
        "A Man Came Out of the Camp from Saul with His Clothes Rent keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 1,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 1:7-12",
    title: "When He Looked Behind Him",
    icon: "📜",
    phrases: [
      [
        "😢 When He Looked Behind Him",
        "When He Looked Behind Him is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ He Saw Me",
        "He Saw Me is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 He Said unto Me",
        "He Said unto Me marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🏙️ Who Art Thou",
        "Who Art Thou is question language. It shows someone trying to uncover identity, motive, guilt, or meaning.\n\nQuestions in these chapters often expose what is hidden in a person's heart or in the political situation.\n\n\n\n🔑 Identity being tested\n\n📜 Words under pressure\n\n💛 Motives coming out\n\n\n\nThe question helps the reader listen carefully before judging the scene too quickly."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 1,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 1:13-18",
    title: "David Said unto the Young Man That Told Him",
    icon: "🏠",
    phrases: [
      [
        "📜 David Said unto the Young Man That Told Him",
        "David Said unto the Young Man That Told Him marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "😢 Whence Art Thou",
        "Whence Art Thou is question language. It shows someone trying to uncover identity, motive, guilt, or meaning.\n\nQuestions in these chapters often expose what is hidden in a person's heart or in the political situation.\n\n\n\n🔑 Identity being tested\n\n📜 Words under pressure\n\n💛 Motives coming out\n\n\n\nThe question helps the reader listen carefully before judging the scene too quickly."
      ],
      [
        "🔥 David Said unto Him",
        "David Said unto Him marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🙏 How Wast Thou Not Afraid to Stretch Forth Thine Hand to Destroy the Lord’s Anointed",
        "How Wast Thou Not Afraid to Stretch Forth Thine Hand to Destroy the Lord’s Anointed is question language. It shows someone trying to uncover identity, motive, guilt, or meaning.\n\nQuestions in these chapters often expose what is hidden in a person's heart or in the political situation.\n\n\n\n🔑 Identity being tested\n\n📜 Words under pressure\n\n💛 Motives coming out\n\n\n\nThe question helps the reader listen carefully before judging the scene too quickly."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 1,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Samuel 1:19-24",
    title: "The Beauty of Israel Is Slain Upon Thy High",
    icon: "🙏",
    phrases: [
      [
        "😢 The Beauty of Israel Is Slain Upon Thy High Places",
        "The Beauty of Israel Is Slain Upon Thy High Places is idolatry warning language. It shows Solomon's heart being pulled away from full loyalty to the LORD.\n\nThe tragedy is not only political. It is spiritual: divided love becomes divided worship.\n\n\n\n⚠️ Heart pulled away\n\n💛 Divided loyalty\n\n🙏 False worship\n\n\n\nThe phrase helps the reader understand why Solomon's fall is so serious after such a glorious beginning."
      ],
      [
        "💛 How Are the Mighty Fallen",
        "How Are the Mighty Fallen is question language. It shows someone trying to uncover identity, motive, guilt, or meaning.\n\nQuestions in these chapters often expose what is hidden in a person's heart or in the political situation.\n\n\n\n🔑 Identity being tested\n\n📜 Words under pressure\n\n💛 Motives coming out\n\n\n\nThe question helps the reader listen carefully before judging the scene too quickly."
      ],
      [
        "🙏 Tell It Not in Gath",
        "Tell It Not in Gath names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "🕍 Publish It Not in the Streets of Askelon",
        "Publish It Not in the Streets of Askelon names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 1,
    startVerse: 25,
    endVerse: 27,
    reference: "2 Samuel 1:25-27",
    title: "How Are the Mighty Fallen in the Midst",
    icon: "🔥",
    phrases: [
      [
        "🗡️ How Are the Mighty Fallen in the Midst of the Battle",
        "How Are the Mighty Fallen in the Midst of the Battle is question language. It shows someone trying to uncover identity, motive, guilt, or meaning.\n\nQuestions in these chapters often expose what is hidden in a person's heart or in the political situation.\n\n\n\n🔑 Identity being tested\n\n📜 Words under pressure\n\n💛 Motives coming out\n\n\n\nThe question helps the reader listen carefully before judging the scene too quickly."
      ],
      [
        "😢 Thou Wast Slain in Thine High Places",
        "Thou Wast Slain in Thine High Places is idolatry warning language. It shows Solomon's heart being pulled away from full loyalty to the LORD.\n\nThe tragedy is not only political. It is spiritual: divided love becomes divided worship.\n\n\n\n⚠️ Heart pulled away\n\n💛 Divided loyalty\n\n🙏 False worship\n\n\n\nThe phrase helps the reader understand why Solomon's fall is so serious after such a glorious beginning."
      ],
      [
        "🙏 I Am Distressed for Thee",
        "I Am Distressed for Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🧠 My Brother Jonathan",
        "My Brother Jonathan keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 2,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 2:1-6",
    title: "It Came to Pass After This",
    icon: "📜",
    phrases: [
      [
        "📜 It Came to Pass After This",
        "It Came to Pass After This is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "🙏 That David Enquired of the LORD",
        "That David Enquired of the LORD puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🧠 So David Went Up Thither",
        "So David Went Up Thither keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "💛 His Two Wives Also",
        "His Two Wives Also is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 2,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 2:7-12",
    title: "Therefore Now Let Your Hands Be Strengthened",
    icon: "🏠",
    phrases: [
      [
        "🔥 Therefore Now Let Your Hands Be Strengthened",
        "Therefore Now Let Your Hands Be Strengthened is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "⚠️ Be Ye Valiant",
        "Be Ye Valiant is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 But Abner the Son of Ner",
        "But Abner the Son of Ner keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🗡️ Captain of Saul’s Host",
        "Captain of Saul’s Host is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 2,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 2:13-18",
    title: "Joab the Son of Zeruiah",
    icon: "🙏",
    phrases: [
      [
        "✨ Joab the Son of Zeruiah",
        "Joab the Son of Zeruiah keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🔑 The Servants of David",
        "The Servants of David keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "📜 Abner Said to Joab",
        "Abner Said to Joab marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "😢 Let the Young Men Now Arise",
        "Let the Young Men Now Arise is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 2,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Samuel 2:19-24",
    title: "Asahel Pursued After Abner",
    icon: "🔥",
    phrases: [
      [
        "👑 Asahel Pursued After Abner",
        "Asahel Pursued After Abner keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "📜 In Going He Turned Not to the Right Hand Nor to the Left from Following Abner",
        "In Going He Turned Not to the Right Hand Nor to the Left from Following Abner keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🕍 Then Abner Looked Behind Him",
        "Then Abner Looked Behind Him keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🏙️ Art Thou Asahel",
        "Art Thou Asahel is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 2,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Samuel 2:25-30",
    title: "The Children of Benjamin Gathered Themselves Together After Abner",
    icon: "🏙️",
    phrases: [
      [
        "🧠 The Children of Benjamin Gathered Themselves Together After Abner",
        "The Children of Benjamin Gathered Themselves Together After Abner focuses on the people, not only the king. The nation is being pulled by the choices of its leaders.\n\nWhen tribes and people groups are named, the reader should notice how public the consequences have become.\n\n\n\n🏙️ The people\n\n👑 Public leadership\n\n⚠️ Shared consequences\n\n\n\nThe phrase helps the reader see the kingdom story as both personal and national."
      ],
      [
        "📜 Became One Troop",
        "Became One Troop is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ Then Abner Called to Joab",
        "Then Abner Called to Joab marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🏙️ Shall the Sword Devour for Ever",
        "Shall the Sword Devour for Ever is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 2,
    startVerse: 31,
    endVerse: 32,
    reference: "2 Samuel 2:31-32",
    title: "The Servants of David Had Smitten of Benjamin",
    icon: "🛡️",
    phrases: [
      [
        "💛 But the Servants of David Had Smitten of Benjamin",
        "But the Servants of David Had Smitten of Benjamin focuses on the people, not only the king. The nation is being pulled by the choices of its leaders.\n\nWhen tribes and people groups are named, the reader should notice how public the consequences have become.\n\n\n\n🏙️ The people\n\n👑 Public leadership\n\n⚠️ Shared consequences\n\n\n\nThe phrase helps the reader see the kingdom story as both personal and national."
      ],
      [
        "📜 Of Abner’s Men",
        "Of Abner’s Men keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "👑 They Took Up Asahel",
        "They Took Up Asahel is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ Buried Him in the Sepulchre of His Father",
        "Buried Him in the Sepulchre of His Father is burial language. It shows honor being given after shame, defeat, or death.\n\nBurial mattered because bodies were not treated as trash. Even in judgment, the story pauses over dignity and grief.\n\n\n\n😢 Death honored\n\n🏠 Community memory\n\n📜 Sorrow handled with care\n\n\n\nThe phrase helps the reader see respect and grief in a chapter full of collapse."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 3,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 3:1-6",
    title: "Now There Was Long War Between the House",
    icon: "🏠",
    phrases: [
      [
        "🗡️ Now There Was Long War Between the House of Saul",
        "Now There Was Long War Between the House of Saul can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "🏠 The House of David",
        "The House of David can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "🏙️ Unto David Were Sons Born in Hebron",
        "Unto David Were Sons Born in Hebron names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "🙏 His Firstborn Was Amnon",
        "His Firstborn Was Amnon is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 3,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 3:7-12",
    title: "Saul Had a Concubine",
    icon: "🙏",
    phrases: [
      [
        "🛡️ Saul Had a Concubine",
        "Saul Had a Concubine keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "✨ Whose Name Was Rizpah",
        "Whose Name Was Rizpah is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 Then Was Abner Very Wroth for the Words of Ish-bosheth",
        "Then Was Abner Very Wroth for the Words of Ish-bosheth keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "👑 Am I a Dog’s Head",
        "Am I a Dog’s Head is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 3,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 3:13-18",
    title: "I Will Make a League with Thee",
    icon: "🔥",
    phrases: [
      [
        "💛 I Will Make a League with Thee",
        "I Will Make a League with Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "✨ But One Thing I Require of Thee",
        "But One Thing I Require of Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔑 David Sent Messengers to Ish-bosheth Saul’s Son",
        "David Sent Messengers to Ish-bosheth Saul’s Son keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "👑 Deliver Me My Wife Michal",
        "Deliver Me My Wife Michal is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 3,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Samuel 3:19-24",
    title: "Abner Also Spake in the Ears of Benjamin",
    icon: "🏙️",
    phrases: [
      [
        "😢 Abner Also Spake in the Ears of Benjamin",
        "Abner Also Spake in the Ears of Benjamin focuses on the people, not only the king. The nation is being pulled by the choices of its leaders.\n\nWhen tribes and people groups are named, the reader should notice how public the consequences have become.\n\n\n\n🏙️ The people\n\n👑 Public leadership\n\n⚠️ Shared consequences\n\n\n\nThe phrase helps the reader see the kingdom story as both personal and national."
      ],
      [
        "🏙️ Abner Went Also to Speak in the Ears of David in Hebron All That Seemed Good to Israel",
        "Abner Went Also to Speak in the Ears of David in Hebron All That Seemed Good to Israel names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "📜 So Abner Came to David to Hebron",
        "So Abner Came to David to Hebron names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "🔥 Twenty Men with Him",
        "Twenty Men with Him is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 3,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Samuel 3:25-30",
    title: "Thou Knowest Abner the Son of Ner",
    icon: "🛡️",
    phrases: [
      [
        "✨ Thou Knowest Abner the Son of Ner",
        "Thou Knowest Abner the Son of Ner keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "👑 That He Came to Deceive Thee",
        "That He Came to Deceive Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 When Joab Was Come Out from David",
        "When Joab Was Come Out from David keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "😢 He Sent Messengers After Abner",
        "He Sent Messengers After Abner keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 3,
    startVerse: 31,
    endVerse: 36,
    reference: "2 Samuel 3:31-36",
    title: "David Said to Joab",
    icon: "🏛️",
    phrases: [
      [
        "📜 David Said to Joab",
        "David Said to Joab marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🙏 To All the People That Were with Him",
        "To All the People That Were with Him is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏙️ They Buried Abner in Hebron",
        "They Buried Abner in Hebron names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "👑 The King Lifted Up His Voice",
        "The King Lifted Up His Voice is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 3,
    startVerse: 37,
    endVerse: 39,
    reference: "2 Samuel 3:37-39",
    title: "For All the People",
    icon: "🧠",
    phrases: [
      [
        "👑 For All the People",
        "For All the People is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔑 All Israel Understood That Day That It Was Not of the King to Slay Abner the Son of Ner",
        "All Israel Understood That Day That It Was Not of the King to Slay Abner the Son of Ner is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "✨ The King Said unto His Servants",
        "The King Said unto His Servants is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🏠 Know Ye Not That There Is a Prince",
        "Know Ye Not That There Is a Prince is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 4,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 4:1-6",
    title: "When Saul’s Son Heard That Abner Was Dead",
    icon: "🙏",
    phrases: [
      [
        "🏙️ When Saul’s Son Heard That Abner Was Dead in Hebron",
        "When Saul’s Son Heard That Abner Was Dead in Hebron is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ],
      [
        "🔑 His Hands Were Feeble",
        "His Hands Were Feeble is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📦 Saul’s Son Had Two Men That Were Captains of Bands",
        "Saul’s Son Had Two Men That Were Captains of Bands keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🙏 The Name of the One Was Baanah",
        "The Name of the One Was Baanah is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 4,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 4:7-12",
    title: "For When They Came into the House",
    icon: "🔥",
    phrases: [
      [
        "🏠 For When They Came into the House",
        "For When They Came into the House can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "💛 He Lay on His Bed in His Bedchamber",
        "He Lay on His Bed in His Bedchamber is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏙️ They Brought the Head of Ish-bosheth unto David to Hebron",
        "They Brought the Head of Ish-bosheth unto David to Hebron names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "👑 Said to the King",
        "Said to the King is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 5,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 5:1-6",
    title: "Then Came All the Tribes of Israel to David",
    icon: "🔥",
    phrases: [
      [
        "🏙️ Then Came All the Tribes of Israel to David unto Hebron",
        "Then Came All the Tribes of Israel to David unto Hebron names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "🧠 We Are Thy Bone",
        "We Are Thy Bone is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🛡️ Also in Time Past",
        "Also in Time Past is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 When Saul Was King Over Us",
        "When Saul Was King Over Us is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 5,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 5:7-12",
    title: "Nevertheless David Took the Strong Hold of Zion",
    icon: "🏙️",
    phrases: [
      [
        "🏠 Nevertheless David Took the Strong Hold of Zion",
        "Nevertheless David Took the Strong Hold of Zion names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "🏙️ The Same Is the City of David",
        "The Same Is the City of David keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "📜 David Said on That Day",
        "David Said on That Day marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "💛 Whosoever Getteth Up to the Gutter",
        "Whosoever Getteth Up to the Gutter is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 5,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 5:13-18",
    title: "David Took Him More Concubines",
    icon: "🛡️",
    phrases: [
      [
        "😢 David Took Him More Concubines",
        "David Took Him More Concubines keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🏙️ Wives Out of Jerusalem",
        "Wives Out of Jerusalem names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "🗡️ These Be the Names of Those That Were Born unto Him in Jerusalem",
        "These Be the Names of Those That Were Born unto Him in Jerusalem names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "🔥 The Names of Those That",
        "The Names of Those That is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 5,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Samuel 5:19-24",
    title: "David Enquired of the LORD",
    icon: "🏛️",
    phrases: [
      [
        "🙏 David Enquired of the LORD",
        "David Enquired of the LORD puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "💛 Shall I Go Up to the Philistines",
        "Shall I Go Up to the Philistines is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📦 David Came to Baal-perazim",
        "David Came to Baal-perazim keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🗡️ David Smote Them There",
        "David Smote Them There is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 5,
    startVerse: 25,
    endVerse: 25,
    reference: "2 Samuel 5:25",
    title: "David Did So",
    icon: "🧠",
    phrases: [
      [
        "🏙️ David Did So",
        "David Did So keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🙏 As the LORD Had Commanded Him",
        "As the LORD Had Commanded Him puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "📜 David Did So, as the LORD Had",
        "David Did So, as the LORD Had puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🔑 Did So, as the LORD Had Commanded Him;",
        "Did So, as the LORD Had Commanded Him; puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 6,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 6:1-6",
    title: "David Gathered Together All the Chosen Men of Israel",
    icon: "🏙️",
    phrases: [
      [
        "😢 David Gathered Together All the Chosen Men of Israel",
        "David Gathered Together All the Chosen Men of Israel focuses on the people, not only the king. The nation is being pulled by the choices of its leaders.\n\nWhen tribes and people groups are named, the reader should notice how public the consequences have become.\n\n\n\n🏙️ The people\n\n👑 Public leadership\n\n⚠️ Shared consequences\n\n\n\nThe phrase helps the reader see the kingdom story as both personal and national."
      ],
      [
        "📜 Again, David Gathered Together All",
        "Again, David Gathered Together All names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "🔥 Together All the Chosen Men",
        "Together All the Chosen Men is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "💛 Chosen Men of Israel, Thirty",
        "Chosen Men of Israel, Thirty focuses on the people, not only the king. The nation is being pulled by the choices of its leaders.\n\nWhen tribes and people groups are named, the reader should notice how public the consequences have become.\n\n\n\n🏙️ The people\n\n👑 Public leadership\n\n⚠️ Shared consequences\n\n\n\nThe phrase helps the reader see the kingdom story as both personal and national."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 6,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 6:7-12",
    title: "The Anger of the LORD Was Kindled Against Uzzah",
    icon: "🛡️",
    phrases: [
      [
        "🙏 The Anger of the LORD Was Kindled Against Uzzah",
        "The Anger of the LORD Was Kindled Against Uzzah puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "💛 God Smote Him There for His Error",
        "God Smote Him There for His Error puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🕍 David Was Displeased",
        "David Was Displeased keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🛡️ Because the LORD Had Made a Breach Upon Uzzah",
        "Because the LORD Had Made a Breach Upon Uzzah puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 6,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 6:13-18",
    title: "It Was So",
    icon: "🏛️",
    phrases: [
      [
        "⚠️ It Was So",
        "It Was So is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 That When They That Bare the Ark of the LORD Had Gone Six Paces",
        "That When They That Bare the Ark of the LORD Had Gone Six Paces puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🕍 David Danced Before the LORD with All His Might",
        "David Danced Before the LORD with All His Might puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🧠 David Was Girded with a Linen Ephod",
        "David Was Girded with a Linen Ephod keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 6,
    startVerse: 19,
    endVerse: 23,
    reference: "2 Samuel 6:19-23",
    title: "He Dealt Among All the People",
    icon: "🧠",
    phrases: [
      [
        "🔥 He Dealt Among All the People",
        "He Dealt Among All the People is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ Even Among the Whole Multitude of Israel",
        "Even Among the Whole Multitude of Israel is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 Then David Returned to Bless His Household",
        "Then David Returned to Bless His Household can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "😢 Michal the Daughter of Saul Came Out to Meet David",
        "Michal the Daughter of Saul Came Out to Meet David keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 7,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 7:1-6",
    title: "It Came to Pass",
    icon: "🛡️",
    phrases: [
      [
        "📜 It Came to Pass",
        "It Came to Pass is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "👑 When the King Sat in His House",
        "When the King Sat in His House is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "✨ That the King Said unto Nathan the Prophet",
        "That the King Said unto Nathan the Prophet is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🏠 I Dwell in an House of Cedar",
        "I Dwell in an House of Cedar can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 7,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 7:7-12",
    title: "In All the Places Wherein I Have Walked",
    icon: "🏛️",
    phrases: [
      [
        "📜 In All the Places Wherein I Have Walked with All the Children of Israel Spake I a Word with Any of the Tribes of Israel",
        "In All the Places Wherein I Have Walked with All the Children of Israel Spake I a Word with Any of the Tribes of Israel focuses on the people, not only the king. The nation is being pulled by the choices of its leaders.\n\nWhen tribes and people groups are named, the reader should notice how public the consequences have become.\n\n\n\n🏙️ The people\n\n👑 Public leadership\n\n⚠️ Shared consequences\n\n\n\nThe phrase helps the reader see the kingdom story as both personal and national."
      ],
      [
        "🏙️ Whom I Commanded to Feed My People Israel",
        "Whom I Commanded to Feed My People Israel is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "⚠️ Now Therefore So Shalt Thou Say unto My Servant David",
        "Now Therefore So Shalt Thou Say unto My Servant David keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🙏 Thus Saith the LORD of Hosts",
        "Thus Saith the LORD of Hosts puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 7,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 7:13-18",
    title: "He Shall Build an House for My Name",
    icon: "🧠",
    phrases: [
      [
        "🏠 He Shall Build an House for My Name",
        "He Shall Build an House for My Name is name language. In the Bible, God's name represents His character, authority, reputation, and presence.\n\nTo hallow God's name means to treat Him as holy, honored, and set apart from every false god.\n\n\n\n🙏 God's character\n\n🏛️ Holy worship\n\n🔑 His reputation\n\n\n\nThe phrase teaches the reader that worship is about honoring who the LORD truly is."
      ],
      [
        "👑 I Will Stablish the Throne of His Kingdom for Ever",
        "I Will Stablish the Throne of His Kingdom for Ever is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "✨ I Will Be His Father",
        "I Will Be His Father is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 He Shall Be My Son",
        "He Shall Be My Son is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 7,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Samuel 7:19-24",
    title: "This Was Yet a Small Thing in Thy Sight",
    icon: "⚠️",
    phrases: [
      [
        "🗡️ This Was Yet a Small Thing in Thy Sight",
        "This Was Yet a Small Thing in Thy Sight is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 O Lord God",
        "O Lord God puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🛡️ What Can David Say More unto Thee",
        "What Can David Say More unto Thee keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "📜 Knowest Thy Servant",
        "Knowest Thy Servant is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 7,
    startVerse: 25,
    endVerse: 29,
    reference: "2 Samuel 7:25-29",
    title: "O LORD God",
    icon: "💛",
    phrases: [
      [
        "🙏 O LORD God",
        "O LORD God puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "📜 The Word That Thou Hast Spoken Concerning Thy Servant",
        "The Word That Thou Hast Spoken Concerning Thy Servant is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🧠 Let Thy Name Be Magnified for Ever",
        "Let Thy Name Be Magnified for Ever is name language. In the Bible, God's name represents His character, authority, reputation, and presence.\n\nTo hallow God's name means to treat Him as holy, honored, and set apart from every false god.\n\n\n\n🙏 God's character\n\n🏛️ Holy worship\n\n🔑 His reputation\n\n\n\nThe phrase teaches the reader that worship is about honoring who the LORD truly is."
      ],
      [
        "💛 The LORD of Hosts Is the God Over Israel",
        "The LORD of Hosts Is the God Over Israel puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 8,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 8:1-6",
    title: "After This It Came to Pass",
    icon: "🏛️",
    phrases: [
      [
        "🛡️ After This It Came to Pass",
        "After This It Came to Pass is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "🗡️ That David Smote the Philistines",
        "That David Smote the Philistines is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "📜 He Smote Moab",
        "He Smote Moab is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "👑 Measured Them with a Line",
        "Measured Them with a Line is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 8,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 8:7-12",
    title: "David Took the Shields of Gold Were",
    icon: "🧠",
    phrases: [
      [
        "👑 David Took the Shields of Gold That Were on the Servants of Hadadezer",
        "David Took the Shields of Gold That Were on the Servants of Hadadezer is wealth and power language. It shows the size, reach, and resources of Solomon's kingdom.\n\nThese details can show blessing, but they also prepare the reader to watch Solomon's heart carefully.\n\n\n\n👑 Royal wealth\n\n🏙️ Kingdom reach\n\n⚠️ Power can tempt\n\n\n\nThe phrase helps the reader notice both the glory and the danger of Solomon's success."
      ],
      [
        "🏙️ Brought Them to Jerusalem",
        "Brought Them to Jerusalem names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "📦 Cities of Hadadezer",
        "Cities of Hadadezer is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 King David Took Exceeding Much Brass",
        "King David Took Exceeding Much Brass is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 8,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 8:13-18",
    title: "David Gat Him a Name When He Returned",
    icon: "⚠️",
    phrases: [
      [
        "📦 David Gat Him a Name When He Returned from Smiting of the Syrians in the Valley of Salt",
        "David Gat Him a Name When He Returned from Smiting of the Syrians in the Valley of Salt keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "👑 Being Eighteen Thousand Men",
        "Being Eighteen Thousand Men is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 He Put Garrisons in Edom",
        "He Put Garrisons in Edom is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "😢 Throughout All Edom Put He Garrisons",
        "Throughout All Edom Put He Garrisons is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 9,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 9:1-6",
    title: "Is There Yet Any That Is Left",
    icon: "🧠",
    phrases: [
      [
        "🏠 Is There Yet Any That Is Left of the House of Saul",
        "Is There Yet Any That Is Left of the House of Saul can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "😢 That I May Shew Him Kindness for Jonathan’s Sake",
        "That I May Shew Him Kindness for Jonathan’s Sake keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🙏 There Was of the House of Saul a Servant Whose Name Was Ziba",
        "There Was of the House of Saul a Servant Whose Name Was Ziba can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "⚠️ When They Had Called Him unto David",
        "When They Had Called Him unto David marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 9,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 9:7-12",
    title: "David Said unto Him",
    icon: "⚠️",
    phrases: [
      [
        "📜 David Said unto Him",
        "David Said unto Him marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "😢 For I Will Surely Shew Thee Kindness for Jonathan Thy Father’s Sake",
        "For I Will Surely Shew Thee Kindness for Jonathan Thy Father’s Sake keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "📦 He Bowed Himself",
        "He Bowed Himself is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔥 What Is Thy Servant",
        "What Is Thy Servant is question language. It shows someone trying to uncover identity, motive, guilt, or meaning.\n\nQuestions in these chapters often expose what is hidden in a person's heart or in the political situation.\n\n\n\n🔑 Identity being tested\n\n📜 Words under pressure\n\n💛 Motives coming out\n\n\n\nThe question helps the reader listen carefully before judging the scene too quickly."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 9,
    startVerse: 13,
    endVerse: 13,
    reference: "2 Samuel 9:13",
    title: "So Mephibosheth Dwelt in Jerusalem",
    icon: "💛",
    phrases: [
      [
        "🏠 So Mephibosheth Dwelt in Jerusalem",
        "So Mephibosheth Dwelt in Jerusalem names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "👑 For He Did Eat Continually at the King’s Table",
        "For He Did Eat Continually at the King’s Table is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "💛 Mephibosheth Dwelt in Jerusalem: for He Did Eat",
        "Mephibosheth Dwelt in Jerusalem: for He Did Eat names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "😢 Dwelt in Jerusalem: for He Did Eat Continually",
        "Dwelt in Jerusalem: for He Did Eat Continually names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 10,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 10:1-6",
    title: "It Came to Pass After This",
    icon: "⚠️",
    phrases: [
      [
        "📜 It Came to Pass After This",
        "It Came to Pass After This is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "👑 That the King of the Children of Ammon Died",
        "That the King of the Children of Ammon Died is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🗡️ Then Said David",
        "Then Said David marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🛡️ I Will Shew Kindness unto Hanun the Son of Nahash",
        "I Will Shew Kindness unto Hanun the Son of Nahash is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 10,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 10:7-12",
    title: "When David Heard of It",
    icon: "💛",
    phrases: [
      [
        "⚠️ When David Heard of It",
        "When David Heard of It keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "😢 He Sent Joab",
        "He Sent Joab keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🔥 The Children of Ammon Came Out",
        "The Children of Ammon Came Out is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ Put the Battle in Array at the Entering in of the Gate",
        "Put the Battle in Array at the Entering in of the Gate is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 10,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 10:13-18",
    title: "Joab Drew Nigh",
    icon: "👑",
    phrases: [
      [
        "🗡️ Joab Drew Nigh",
        "Joab Drew Nigh keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🔑 The People That Were with Him",
        "The People That Were with Him is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏙️ When the Children of Ammon Saw That the Syrians Were Fled",
        "When the Children of Ammon Saw That the Syrians Were Fled is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ],
      [
        "🧠 Then Fled They Also Before Abishai",
        "Then Fled They Also Before Abishai is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 10,
    startVerse: 19,
    endVerse: 19,
    reference: "2 Samuel 10:19",
    title: "When All the Kings Were Servants to Hadarezer Saw",
    icon: "🗡️",
    phrases: [
      [
        "👑 When All the Kings That Were Servants to Hadarezer Saw That They Were Smitten Before Israel",
        "When All the Kings That Were Servants to Hadarezer Saw That They Were Smitten Before Israel is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🏠 They Made Peace with Israel",
        "They Made Peace with Israel is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "✨ All the Kings That Were Servants to Hadarezer",
        "All the Kings That Were Servants to Hadarezer is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "⚠️ The Kings That Were Servants to Hadarezer Saw",
        "The Kings That Were Servants to Hadarezer Saw is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 11,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 11:1-6",
    title: "It Came to Pass",
    icon: "💛",
    phrases: [
      [
        "📜 It Came to Pass",
        "It Came to Pass is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "📦 After the Year Was Expired",
        "After the Year Was Expired is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ That David Arose from Off His Bed",
        "That David Arose from Off His Bed keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "👑 Enquired After the Woman",
        "Enquired After the Woman is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 11,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 11:7-12",
    title: "When Uriah Was Come unto Him",
    icon: "👑",
    phrases: [
      [
        "🗡️ When Uriah Was Come unto Him",
        "When Uriah Was Come unto Him is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "⚠️ David Demanded of Him How Joab Did",
        "David Demanded of Him How Joab Did is question language. It shows someone trying to uncover identity, motive, guilt, or meaning.\n\nQuestions in these chapters often expose what is hidden in a person's heart or in the political situation.\n\n\n\n🔑 Identity being tested\n\n📜 Words under pressure\n\n💛 Motives coming out\n\n\n\nThe question helps the reader listen carefully before judging the scene too quickly."
      ],
      [
        "📜 David Said to Uriah",
        "David Said to Uriah marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🏠 Go Down to Thy House",
        "Go Down to Thy House can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 11,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 11:13-18",
    title: "When David Had Called Him",
    icon: "🗡️",
    phrases: [
      [
        "✨ When David Had Called Him",
        "When David Had Called Him marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "👑 He Did Eat",
        "He Did Eat is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏙️ It Came to Pass in the Morning",
        "It Came to Pass in the Morning is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "📜 That David Wrote a Letter to Joab",
        "That David Wrote a Letter to Joab keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 11,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Samuel 11:19-24",
    title: "Charged the Messenger",
    icon: "📜",
    phrases: [
      [
        "👑 Charged the Messenger",
        "Charged the Messenger is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 When Thou Hast Made an End of Telling the Matters of the War unto the King",
        "When Thou Hast Made an End of Telling the Matters of the War unto the King is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🗡️ If So Be That the King’s Wrath Arise",
        "If So Be That the King’s Wrath Arise is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "⚠️ He Say unto Thee",
        "He Say unto Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 11,
    startVerse: 25,
    endVerse: 27,
    reference: "2 Samuel 11:25-27",
    title: "Then David Said unto the Messenger",
    icon: "🏠",
    phrases: [
      [
        "📜 Then David Said unto the Messenger",
        "Then David Said unto the Messenger marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🗡️ Thus Shalt Thou Say unto Joab",
        "Thus Shalt Thou Say unto Joab keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "😢 When the Wife of Uriah Heard That Uriah Her Husband Was Dead",
        "When the Wife of Uriah Heard That Uriah Her Husband Was Dead is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ],
      [
        "⚠️ She Mourned for Her Husband",
        "She Mourned for Her Husband is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 12,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 12:1-6",
    title: "The LORD Sent Nathan unto David",
    icon: "👑",
    phrases: [
      [
        "🙏 The LORD Sent Nathan unto David",
        "The LORD Sent Nathan unto David puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "💛 He Came unto Him",
        "He Came unto Him is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 The Rich Man Had Exceeding Many Flocks",
        "The Rich Man Had Exceeding Many Flocks is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🛡️ Had Exceeding Many Flocks and",
        "Had Exceeding Many Flocks and is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 12,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 12:7-12",
    title: "Nathan Said to David",
    icon: "🗡️",
    phrases: [
      [
        "📜 Nathan Said to David",
        "Nathan Said to David marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "⚠️ Thou Art the Man",
        "Thou Art the Man is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 I Gave Thee Thy Master’s House",
        "I Gave Thee Thy Master’s House can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "✨ Thy Master’s Wives into Thy Bosom",
        "Thy Master’s Wives into Thy Bosom is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 12,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 12:13-18",
    title: "David Said unto Nathan",
    icon: "📜",
    phrases: [
      [
        "📜 David Said unto Nathan",
        "David Said unto Nathan marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🙏 I Have Sinned Against the LORD",
        "I Have Sinned Against the LORD is forgiveness language. It names sin honestly and asks God to show mercy to guilty people.\n\nSolomon does not pretend Israel will obey perfectly. He builds repentance and mercy into his prayer.\n\n\n\n⚠️ Sin named\n\n🙏 Mercy requested\n\n📜 Covenant hope\n\n\n\nThe phrase matters because God's people need more than a temple; they need forgiveness from the LORD."
      ],
      [
        "✨ Because by This Deed Thou Hast Given Great Occasion to the Enemies of the LORD to Blaspheme",
        "Because by This Deed Thou Hast Given Great Occasion to the Enemies of the LORD to Blaspheme puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🔑 The Child Also That Is Born unto Thee Shall Surely Die",
        "The Child Also That Is Born unto Thee Shall Surely Die is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 12,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Samuel 12:19-24",
    title: "When David Saw That His Servants Whispered",
    icon: "🏠",
    phrases: [
      [
        "✨ But When David Saw That His Servants Whispered",
        "But When David Saw That His Servants Whispered keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🙏 David Perceived That the Child Was Dead",
        "David Perceived That the Child Was Dead is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ],
      [
        "👑 Then David Arose from the Earth",
        "Then David Arose from the Earth keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🕍 Changed His Apparel",
        "Changed His Apparel is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 12,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Samuel 12:25-30",
    title: "He Sent by the Hand of Nathan the Prophet",
    icon: "🙏",
    phrases: [
      [
        "👑 He Sent by the Hand of Nathan the Prophet",
        "He Sent by the Hand of Nathan the Prophet is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🛡️ He Called His Name Jedidiah",
        "He Called His Name Jedidiah marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🔥 Joab Fought Against Rabbah of the Children of Ammon",
        "Joab Fought Against Rabbah of the Children of Ammon is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "🏙️ Took the Royal City",
        "Took the Royal City is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 12,
    startVerse: 31,
    endVerse: 31,
    reference: "2 Samuel 12:31",
    title: "He Brought Forth the People Were Therein",
    icon: "🔥",
    phrases: [
      [
        "🔑 He Brought Forth the People That Were Therein",
        "He Brought Forth the People That Were Therein is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 Put Them Under Saws",
        "Put Them Under Saws is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔥 Brought Forth the People That Were Therein, and",
        "Brought Forth the People That Were Therein, and is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📦 Forth the People That Were Therein, and Put",
        "Forth the People That Were Therein, and Put is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 13,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 13:1-6",
    title: "It Came to Pass After This",
    icon: "🗡️",
    phrases: [
      [
        "📜 It Came to Pass After This",
        "It Came to Pass After This is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "🗡️ That Absalom the Son of David Had a Fair Sister",
        "That Absalom the Son of David Had a Fair Sister keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🔑 Amnon Was So Vexed",
        "Amnon Was So Vexed is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 That He Fell Sick for His Sister Tamar",
        "That He Fell Sick for His Sister Tamar is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 13,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 13:7-12",
    title: "Then David Sent Home to Tamar",
    icon: "📜",
    phrases: [
      [
        "👑 Then David Sent Home to Tamar",
        "Then David Sent Home to Tamar keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🏠 Go Now to Thy Brother Amnon’s House",
        "Go Now to Thy Brother Amnon’s House can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "🙏 So Tamar Went to Her Brother Amnon’s House",
        "So Tamar Went to Her Brother Amnon’s House can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "⚠️ He Was Laid Down",
        "He Was Laid Down is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 13,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 13:13-18",
    title: "Whither Shall I Cause My Shame to Go",
    icon: "🏠",
    phrases: [
      [
        "🙏 Whither Shall I Cause My Shame to Go",
        "Whither Shall I Cause My Shame to Go is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏙️ As for Thee",
        "As for Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📦 Howbeit He Would Not Hearken unto Her Voice",
        "Howbeit He Would Not Hearken unto Her Voice points to God's covenant presence and promise among His people.\n\nThe ark and covenant language remind the reader that Israel's hope is deeper than military strength.\n\n\n\n📦 Covenant sign\n\n🙏 Holy presence\n\n📜 Promises remembered\n\n\n\nThe phrase keeps worship and God's presence at the center of the kingdom story."
      ],
      [
        "🔥 Being Stronger Than She",
        "Being Stronger Than She is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 13,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Samuel 13:19-24",
    title: "Tamar Put Ashes on Her Head",
    icon: "🙏",
    phrases: [
      [
        "✨ Tamar Put Ashes on Her Head",
        "Tamar Put Ashes on Her Head is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🧠 Rent Her Garment of Divers Colours That Was on Her",
        "Rent Her Garment of Divers Colours That Was on Her is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 Absalom Her Brother Said unto Her",
        "Absalom Her Brother Said unto Her marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "💛 Hath Amnon Thy Brother Been with Thee",
        "Hath Amnon Thy Brother Been with Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 13,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Samuel 13:25-30",
    title: "The King Said to Absalom",
    icon: "🔥",
    phrases: [
      [
        "👑 The King Said to Absalom",
        "The King Said to Absalom is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "😢 Let Us Not All Now Go",
        "Let Us Not All Now Go is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 Then Said Absalom",
        "Then Said Absalom marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🛡️ I Pray Thee",
        "I Pray Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 13,
    startVerse: 31,
    endVerse: 36,
    reference: "2 Samuel 13:31-36",
    title: "Then the King Arose",
    icon: "🏙️",
    phrases: [
      [
        "👑 Then the King Arose",
        "Then the King Arose is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "😢 Tare His Garments",
        "Tare His Garments is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 The Son of Shimeah David’s Brother",
        "The Son of Shimeah David’s Brother keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🙏 Let Not My Lord Suppose That They Have Slain All the Young Men the King’s Sons",
        "Let Not My Lord Suppose That They Have Slain All the Young Men the King’s Sons puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 13,
    startVerse: 37,
    endVerse: 39,
    reference: "2 Samuel 13:37-39",
    title: "Absalom Fled",
    icon: "🛡️",
    phrases: [
      [
        "🏙️ But Absalom Fled",
        "But Absalom Fled is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ],
      [
        "🕍 Went to Talmai",
        "Went to Talmai is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📦 So Absalom Fled",
        "So Absalom Fled is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ],
      [
        "🔑 Went to Geshur",
        "Went to Geshur is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 14,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 14:1-6",
    title: "Now Joab the Son of Zeruiah Perceived",
    icon: "📜",
    phrases: [
      [
        "👑 Now Joab the Son of Zeruiah Perceived That the King’s Heart Was Toward Absalom",
        "Now Joab the Son of Zeruiah Perceived That the King’s Heart Was Toward Absalom is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🏠 Son of Zeruiah Perceived That",
        "Son of Zeruiah Perceived That is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "😢 Perceived That the King’s Heart",
        "Perceived That the King’s Heart is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🛡️ Joab Sent to Tekoah",
        "Joab Sent to Tekoah keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 14,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 14:7-12",
    title: "The Whole Family Is Risen Against Thine Handmaid",
    icon: "🏠",
    phrases: [
      [
        "📦 The Whole Family Is Risen Against Thine Handmaid",
        "The Whole Family Is Risen Against Thine Handmaid is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ Deliver Him That Smote His Brother",
        "Deliver Him That Smote His Brother is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "👑 The King Said unto the Woman",
        "The King Said unto the Woman is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🏠 Go to Thine House",
        "Go to Thine House can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 14,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 14:13-18",
    title: "The Woman Said",
    icon: "🙏",
    phrases: [
      [
        "📜 The Woman Said",
        "The Woman Said marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🙏 Wherefore Then Hast Thou Thought Such a Thing Against the People of God",
        "Wherefore Then Hast Thou Thought Such a Thing Against the People of God is question language. It shows someone trying to uncover identity, motive, guilt, or meaning.\n\nQuestions in these chapters often expose what is hidden in a person's heart or in the political situation.\n\n\n\n🔑 Identity being tested\n\n📜 Words under pressure\n\n💛 Motives coming out\n\n\n\nThe question helps the reader listen carefully before judging the scene too quickly."
      ],
      [
        "🗡️ For We Must Needs Die",
        "For We Must Needs Die is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "✨ Are as Water Spilt on the Ground",
        "Are as Water Spilt on the Ground is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 14,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Samuel 14:19-24",
    title: "The King Said",
    icon: "🔥",
    phrases: [
      [
        "👑 The King Said",
        "The King Said is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🙏 Is Not the Hand of Joab with Thee in All This",
        "Is Not the Hand of Joab with Thee in All This keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "✨ To Fetch About This Form of Speech Hath Thy Servant Joab Done This Thing",
        "To Fetch About This Form of Speech Hath Thy Servant Joab Done This Thing keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🏠 My Lord Is Wise",
        "My Lord Is Wise is wisdom language. It is about seeing clearly, judging rightly, and leading with understanding.\n\nSolomon's wisdom is not meant to make him impressive only; it is meant to help him govern God's people well.\n\n\n\n🧠 Discernment\n\n👑 Leadership\n\n📜 Right judgment\n\n\n\nThe phrase helps the reader see why wisdom matters for a king."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 14,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Samuel 14:25-30",
    title: "In All Israel There Was None to Be So",
    icon: "🏙️",
    phrases: [
      [
        "🏠 But in All Israel There Was None to Be So Much Praised as Absalom for His Beauty",
        "But in All Israel There Was None to Be So Much Praised as Absalom for His Beauty keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "👑 From the Sole of His Foot Even to the Crown of His Head There Was No Blemish in Him",
        "From the Sole of His Foot Even to the Crown of His Head There Was No Blemish in Him is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🛡️ When He Polled His Head",
        "When He Polled His Head is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ For It Was at Every Year’s End That He Polled It",
        "For It Was at Every Year’s End That He Polled It is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 14,
    startVerse: 31,
    endVerse: 33,
    reference: "2 Samuel 14:31-33",
    title: "Then Joab Arose",
    icon: "🛡️",
    phrases: [
      [
        "🏙️ Then Joab Arose",
        "Then Joab Arose keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🏠 Came to Absalom unto His House",
        "Came to Absalom unto His House can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "👑 Absalom Answered Joab",
        "Absalom Answered Joab marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🕍 I Sent unto Thee",
        "I Sent unto Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 15,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 15:1-6",
    title: "It Came to Pass After This",
    icon: "🏠",
    phrases: [
      [
        "📜 It Came to Pass After This",
        "It Came to Pass After This is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "👑 That Absalom Prepared Him Chariots",
        "That Absalom Prepared Him Chariots is wealth and power language. It shows the size, reach, and resources of Solomon's kingdom.\n\nThese details can show blessing, but they also prepare the reader to watch Solomon's heart carefully.\n\n\n\n👑 Royal wealth\n\n🏙️ Kingdom reach\n\n⚠️ Power can tempt\n\n\n\nThe phrase helps the reader notice both the glory and the danger of Solomon's success."
      ],
      [
        "🔑 Absalom Rose Up Early",
        "Absalom Rose Up Early keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "😢 Stood Beside the Way of the Gate",
        "Stood Beside the Way of the Gate is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 15,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 15:7-12",
    title: "It Came to Pass After Forty Years",
    icon: "🙏",
    phrases: [
      [
        "📜 It Came to Pass After Forty Years",
        "It Came to Pass After Forty Years is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "👑 That Absalom Said unto the King",
        "That Absalom Said unto the King is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "⚠️ For Thy Servant Vowed a Vow While I Abode at Geshur in Syria",
        "For Thy Servant Vowed a Vow While I Abode at Geshur in Syria is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 If the LORD Shall Bring Me Again Indeed to Jerusalem",
        "If the LORD Shall Bring Me Again Indeed to Jerusalem puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 15,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 15:13-18",
    title: "There Came a Messenger to David",
    icon: "🔥",
    phrases: [
      [
        "🏙️ There Came a Messenger to David",
        "There Came a Messenger to David keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "💛 The Hearts of the Men of Israel Are After Absalom",
        "The Hearts of the Men of Israel Are After Absalom points to the inner person. In the Bible, the heart includes desire, loyalty, thought, and choice.\n\nThe story is showing more than outward actions; it is showing what people love, fear, and pursue.\n\n\n\n💛 Desire\n\n🔑 Loyalty\n\n⚠️ Direction of life\n\n\n\nThe phrase reminds the reader that the kingdom is shaped by hidden desires before public actions appear."
      ],
      [
        "👑 David Said unto All His Servants That Were with Him at Jerusalem",
        "David Said unto All His Servants That Were with Him at Jerusalem names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "🛡️ Let Us Flee",
        "Let Us Flee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 15,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Samuel 15:19-24",
    title: "Then Said the King to Ittai the Gittite",
    icon: "🏙️",
    phrases: [
      [
        "👑 Then Said the King to Ittai the Gittite",
        "Then Said the King to Ittai the Gittite is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🙏 Wherefore Goest Thou Also with Us",
        "Wherefore Goest Thou Also with Us is question language. It shows someone trying to uncover identity, motive, guilt, or meaning.\n\nQuestions in these chapters often expose what is hidden in a person's heart or in the political situation.\n\n\n\n🔑 Identity being tested\n\n📜 Words under pressure\n\n💛 Motives coming out\n\n\n\nThe question helps the reader listen carefully before judging the scene too quickly."
      ],
      [
        "🏙️ Whereas Thou Camest but Yesterday",
        "Whereas Thou Camest but Yesterday is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "💛 Should I This Day Make Thee Go Up",
        "Should I This Day Make Thee Go Up is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 15,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Samuel 15:25-30",
    title: "The King Said unto Zadok",
    icon: "🛡️",
    phrases: [
      [
        "👑 The King Said unto Zadok",
        "The King Said unto Zadok is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🙏 Carry Back the Ark of God into the City",
        "Carry Back the Ark of God into the City puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🔥 But If He Thus Say",
        "But If He Thus Say is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "💛 I Have No Delight in Thee",
        "I Have No Delight in Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 15,
    startVerse: 31,
    endVerse: 36,
    reference: "2 Samuel 15:31-36",
    title: "One Told David",
    icon: "🏛️",
    phrases: [
      [
        "📜 One Told David",
        "One Told David keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "😢 Ahithophel Is Among the Conspirators with Absalom",
        "Ahithophel Is Among the Conspirators with Absalom keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🗡️ It Came to Pass",
        "It Came to Pass is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "👑 That When David Was Come to the Top of the Mount",
        "That When David Was Come to the Top of the Mount keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 15,
    startVerse: 37,
    endVerse: 37,
    reference: "2 Samuel 15:37",
    title: "So Hushai David’s Friend Came into the City",
    icon: "🧠",
    phrases: [
      [
        "🏙️ So Hushai David’s Friend Came into the City",
        "So Hushai David’s Friend Came into the City keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "📦 Absalom Came into Jerusalem",
        "Absalom Came into Jerusalem names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "🔑 Hushai David’s Friend Came into the City, and",
        "Hushai David’s Friend Came into the City, and keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🕍 David’s Friend Came into the City, and Absalom",
        "David’s Friend Came into the City, and Absalom keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 16,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 16:1-6",
    title: "When David Was a Little Past the Top",
    icon: "🙏",
    phrases: [
      [
        "🛡️ When David Was a Little Past the Top of the Hill",
        "When David Was a Little Past the Top of the Hill keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🕍 Ziba the Servant of Mephibosheth Met Him",
        "Ziba the Servant of Mephibosheth Met Him keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "👑 The King Said unto Ziba",
        "The King Said unto Ziba is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🏠 What Meanest Thou by These",
        "What Meanest Thou by These is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 16,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 16:7-12",
    title: "Thus Said Shimei When He Cursed",
    icon: "🔥",
    phrases: [
      [
        "📜 Thus Said Shimei When He Cursed",
        "Thus Said Shimei When He Cursed marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🕍 Thou Bloody Man",
        "Thou Bloody Man is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 The LORD Hath Returned Upon Thee All the Blood of the House of Saul",
        "The LORD Hath Returned Upon Thee All the Blood of the House of Saul puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "👑 In Whose Stead Thou Hast Reigned",
        "In Whose Stead Thou Hast Reigned is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 16,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 16:13-18",
    title: "His Men Went by the Way",
    icon: "🏙️",
    phrases: [
      [
        "😢 His Men Went by the Way",
        "His Men Went by the Way is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏙️ Shimei Went Along on the Hill’s Side Over Against Him",
        "Shimei Went Along on the Hill’s Side Over Against Him is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔥 All the People That Were with Him",
        "All the People That Were with Him is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "✨ Refreshed Themselves There",
        "Refreshed Themselves There is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 16,
    startVerse: 19,
    endVerse: 23,
    reference: "2 Samuel 16:19-23",
    title: "Whom Should I Serve",
    icon: "🛡️",
    phrases: [
      [
        "🔥 Whom Should I Serve",
        "Whom Should I Serve is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "⚠️ Should I Not Serve in the Presence of His Son",
        "Should I Not Serve in the Presence of His Son is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 Then Said Absalom to Ahithophel",
        "Then Said Absalom to Ahithophel marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "👑 Give Counsel Among You What We Shall Do",
        "Give Counsel Among You What We Shall Do is about guidance, judgment, and knowing what should be done next.\n\nCounsel can save a kingdom or damage it, depending on whether it is wise, humble, and true.\n\n\n\n🧠 Discernment\n\n📜 Words that guide\n\n👑 Leadership decisions\n\n\n\nThe phrase teaches the reader that advice is never neutral when a kingdom is under pressure."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 17,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 17:1-6",
    title: "Moreover Ahithophel Said unto Absalom",
    icon: "🔥",
    phrases: [
      [
        "📜 Moreover Ahithophel Said unto Absalom",
        "Moreover Ahithophel Said unto Absalom marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🧠 Let Me Now Choose Out Twelve Thousand Men",
        "Let Me Now Choose Out Twelve Thousand Men is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🛡️ I Will Come Upon Him While He Is Weary",
        "I Will Come Upon Him While He Is Weary is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "💛 Will Make Him Afraid",
        "Will Make Him Afraid is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 17,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 17:7-12",
    title: "Hushai Said unto Absalom",
    icon: "🏙️",
    phrases: [
      [
        "📜 Hushai Said unto Absalom",
        "Hushai Said unto Absalom marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🕍 The Counsel That Ahithophel Hath Given Is Not Good at This Time",
        "The Counsel That Ahithophel Hath Given Is Not Good at This Time is about guidance, judgment, and knowing what should be done next.\n\nCounsel can save a kingdom or damage it, depending on whether it is wise, humble, and true.\n\n\n\n🧠 Discernment\n\n📜 Words that guide\n\n👑 Leadership decisions\n\n\n\nThe phrase teaches the reader that advice is never neutral when a kingdom is under pressure."
      ],
      [
        "🗡️ Thou Knowest Thy Father",
        "Thou Knowest Thy Father is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 That They Be Mighty Men",
        "That They Be Mighty Men is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 17,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 17:13-18",
    title: "If He Be Gotten into a City",
    icon: "🛡️",
    phrases: [
      [
        "🏙️ If He Be Gotten into a City",
        "If He Be Gotten into a City is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "💛 Then Shall All Israel Bring Ropes to That City",
        "Then Shall All Israel Bring Ropes to That City is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 All the Men of Israel Said",
        "All the Men of Israel Said focuses on the people, not only the king. The nation is being pulled by the choices of its leaders.\n\nWhen tribes and people groups are named, the reader should notice how public the consequences have become.\n\n\n\n🏙️ The people\n\n👑 Public leadership\n\n⚠️ Shared consequences\n\n\n\nThe phrase helps the reader see the kingdom story as both personal and national."
      ],
      [
        "👑 The Counsel of Hushai the Archite Is Better Than the Counsel of Ahithophel",
        "The Counsel of Hushai the Archite Is Better Than the Counsel of Ahithophel is about guidance, judgment, and knowing what should be done next.\n\nCounsel can save a kingdom or damage it, depending on whether it is wise, humble, and true.\n\n\n\n🧠 Discernment\n\n📜 Words that guide\n\n👑 Leadership decisions\n\n\n\nThe phrase teaches the reader that advice is never neutral when a kingdom is under pressure."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 17,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Samuel 17:19-24",
    title: "The Woman Took",
    icon: "🏛️",
    phrases: [
      [
        "👑 The Woman Took",
        "The Woman Took is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 Spread a Covering Over the Well’s Mouth",
        "Spread a Covering Over the Well’s Mouth is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 When Absalom’s Servants Came to the Woman to the House",
        "When Absalom’s Servants Came to the Woman to the House can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "🗡️ Where Is Ahimaaz",
        "Where Is Ahimaaz is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 17,
    startVerse: 25,
    endVerse: 29,
    reference: "2 Samuel 17:25-29",
    title: "Absalom Made Amasa Captain of the Host Instead",
    icon: "🧠",
    phrases: [
      [
        "🗡️ Absalom Made Amasa Captain of the Host Instead of Joab",
        "Absalom Made Amasa Captain of the Host Instead of Joab is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "✨ Which Amasa Was a Man’s Son",
        "Which Amasa Was a Man’s Son is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 Absalom Pitched in the Land of Gilead",
        "Absalom Pitched in the Land of Gilead keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🏠 So Israel and Absalom Pitched",
        "So Israel and Absalom Pitched keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 18,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 18:1-6",
    title: "David Numbered the People Were with Him",
    icon: "🏙️",
    phrases: [
      [
        "📦 David Numbered the People That Were with Him",
        "David Numbered the People That Were with Him keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🕍 Set Captains of Thousands",
        "Set Captains of Thousands is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 David Sent Forth a Third Part of the People Under the Hand of Joab",
        "David Sent Forth a Third Part of the People Under the Hand of Joab keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🏠 A Third Part Under the Hand of Abishai the Son of Zeruiah",
        "A Third Part Under the Hand of Abishai the Son of Zeruiah is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 18,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 18:7-12",
    title: "Where the People of Israel Were Slain Before",
    icon: "🛡️",
    phrases: [
      [
        "😢 Where the People of Israel Were Slain Before the Servants of David",
        "Where the People of Israel Were Slain Before the Servants of David is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ],
      [
        "🏙️ There Was There a Great Slaughter That Day of Twenty Thousand Men",
        "There Was There a Great Slaughter That Day of Twenty Thousand Men is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ For the Battle Was There Scattered Over the Face of All the Country",
        "For the Battle Was There Scattered Over the Face of All the Country is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "💛 The Wood Devoured More People That Day Than the Sword Devoured",
        "The Wood Devoured More People That Day Than the Sword Devoured is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 18,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 18:13-18",
    title: "Otherwise I Should Have Wrought Falsehood Against Mine Own",
    icon: "🏛️",
    phrases: [
      [
        "💛 Otherwise I Should Have Wrought Falsehood Against Mine Own Life",
        "Otherwise I Should Have Wrought Falsehood Against Mine Own Life is wisdom language. It is about seeing clearly, judging rightly, and leading with understanding.\n\nSolomon's wisdom is not meant to make him impressive only; it is meant to help him govern God's people well.\n\n\n\n🧠 Discernment\n\n👑 Leadership\n\n📜 Right judgment\n\n\n\nThe phrase helps the reader see why wisdom matters for a king."
      ],
      [
        "👑 For There Is No Matter Hid from the King",
        "For There Is No Matter Hid from the King is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "📜 Then Said Joab",
        "Then Said Joab marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🛡️ I May Not Tarry Thus with Thee",
        "I May Not Tarry Thus with Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 18,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Samuel 18:19-24",
    title: "Then Said Ahimaaz the Son of Zadok",
    icon: "🧠",
    phrases: [
      [
        "📜 Then Said Ahimaaz the Son of Zadok",
        "Then Said Ahimaaz the Son of Zadok marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "📦 Let Me Now Run",
        "Let Me Now Run is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🕍 Joab Said unto Him",
        "Joab Said unto Him marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "💛 Thou Shalt Not Bear Tidings This Day",
        "Thou Shalt Not Bear Tidings This Day is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 18,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Samuel 18:25-30",
    title: "The Watchman Cried",
    icon: "⚠️",
    phrases: [
      [
        "🛡️ The Watchman Cried",
        "The Watchman Cried is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 Told the King",
        "Told the King is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🕍 The Watchman Saw Another Man Running",
        "The Watchman Saw Another Man Running is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔥 The Watchman Called unto the Porter",
        "The Watchman Called unto the Porter marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 18,
    startVerse: 31,
    endVerse: 33,
    reference: "2 Samuel 18:31-33",
    title: "My Lord the King",
    icon: "💛",
    phrases: [
      [
        "🙏 My Lord the King",
        "My Lord the King puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🏠 For the LORD Hath Avenged Thee This Day of All Them That Rose Up Against Thee",
        "For the LORD Hath Avenged Thee This Day of All Them That Rose Up Against Thee puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "👑 The King Said unto Cushi",
        "The King Said unto Cushi is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "💛 Is the Young Man Absalom Safe",
        "Is the Young Man Absalom Safe keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 19,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 19:1-6",
    title: "It Was Told Joab",
    icon: "🛡️",
    phrases: [
      [
        "💛 It Was Told Joab",
        "It Was Told Joab keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "👑 The King Weepeth",
        "The King Weepeth is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "😢 The Victory That Day Was Turned into Mourning unto All the People",
        "The Victory That Day Was Turned into Mourning unto All the People is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ],
      [
        "📦 For the People Heard Say That Day How the King Was Grieved for His Son",
        "For the People Heard Say That Day How the King Was Grieved for His Son is question language. It shows someone trying to uncover identity, motive, guilt, or meaning.\n\nQuestions in these chapters often expose what is hidden in a person's heart or in the political situation.\n\n\n\n🔑 Identity being tested\n\n📜 Words under pressure\n\n💛 Motives coming out\n\n\n\nThe question helps the reader listen carefully before judging the scene too quickly."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 19,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 19:7-12",
    title: "Now Therefore Arise",
    icon: "🏛️",
    phrases: [
      [
        "✨ Now Therefore Arise",
        "Now Therefore Arise is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 Speak Comfortably unto Thy Servants",
        "Speak Comfortably unto Thy Servants is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 Then the King Arose",
        "Then the King Arose is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "😢 Sat in the Gate",
        "Sat in the Gate is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 19,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 19:13-18",
    title: "Say Ye to Amasa",
    icon: "🧠",
    phrases: [
      [
        "🧠 Say Ye to Amasa",
        "Say Ye to Amasa is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 Art Thou Not of My Bone",
        "Art Thou Not of My Bone is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "💛 He Bowed the Heart of All the Men of Judah",
        "He Bowed the Heart of All the Men of Judah points to the inner person. In the Bible, the heart includes desire, loyalty, thought, and choice.\n\nThe story is showing more than outward actions; it is showing what people love, fear, and pursue.\n\n\n\n💛 Desire\n\n🔑 Loyalty\n\n⚠️ Direction of life\n\n\n\nThe phrase reminds the reader that the kingdom is shaped by hidden desires before public actions appear."
      ],
      [
        "🏙️ Even as the Heart of One Man",
        "Even as the Heart of One Man points to the inner person. In the Bible, the heart includes desire, loyalty, thought, and choice.\n\nThe story is showing more than outward actions; it is showing what people love, fear, and pursue.\n\n\n\n💛 Desire\n\n🔑 Loyalty\n\n⚠️ Direction of life\n\n\n\nThe phrase reminds the reader that the kingdom is shaped by hidden desires before public actions appear."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 19,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Samuel 19:19-24",
    title: "Said unto the King",
    icon: "⚠️",
    phrases: [
      [
        "👑 Said unto the King",
        "Said unto the King is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🙏 Let Not My Lord Impute Iniquity unto Me",
        "Let Not My Lord Impute Iniquity unto Me puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🗡️ For Thy Servant Doth Know That I Have Sinned",
        "For Thy Servant Doth Know That I Have Sinned is forgiveness language. It names sin honestly and asks God to show mercy to guilty people.\n\nSolomon does not pretend Israel will obey perfectly. He builds repentance and mercy into his prayer.\n\n\n\n⚠️ Sin named\n\n🙏 Mercy requested\n\n📜 Covenant hope\n\n\n\nThe phrase matters because God's people need more than a temple; they need forgiveness from the LORD."
      ],
      [
        "💛 I Am Come the First This Day of All the House of Joseph to Go Down to Meet My Lord the King",
        "I Am Come the First This Day of All the House of Joseph to Go Down to Meet My Lord the King puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 19,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Samuel 19:25-30",
    title: "It Came to Pass",
    icon: "💛",
    phrases: [
      [
        "📜 It Came to Pass",
        "It Came to Pass is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "👑 When He Was Come to Jerusalem to Meet the King",
        "When He Was Come to Jerusalem to Meet the King is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🙏 My Servant Deceived Me",
        "My Servant Deceived Me is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "😢 For Thy Servant Said",
        "For Thy Servant Said marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 19,
    startVerse: 31,
    endVerse: 36,
    reference: "2 Samuel 19:31-36",
    title: "Barzillai the Gileadite Came Down from Rogelim",
    icon: "👑",
    phrases: [
      [
        "🔥 Barzillai the Gileadite Came Down from Rogelim",
        "Barzillai the Gileadite Came Down from Rogelim is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 Went Over Jordan with the King",
        "Went Over Jordan with the King is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🛡️ Now Barzillai Was a Very Aged Man",
        "Now Barzillai Was a Very Aged Man is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 Even Fourscore Years Old",
        "Even Fourscore Years Old is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 19,
    startVerse: 37,
    endVerse: 42,
    reference: "2 Samuel 19:37-42",
    title: "Let Thy Servant",
    icon: "🗡️",
    phrases: [
      [
        "📜 Let Thy Servant",
        "Let Thy Servant is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🛡️ I Pray Thee",
        "I Pray Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 The King Answered",
        "The King Answered is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🏠 Chimham Shall Go Over with Me",
        "Chimham Shall Go Over with Me is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 19,
    startVerse: 43,
    endVerse: 43,
    reference: "2 Samuel 19:43",
    title: "The Men of Israel Answered the Men of Judah",
    icon: "📜",
    phrases: [
      [
        "🛡️ The Men of Israel Answered the Men of Judah",
        "The Men of Israel Answered the Men of Judah focuses on the people, not only the king. The nation is being pulled by the choices of its leaders.\n\nWhen tribes and people groups are named, the reader should notice how public the consequences have become.\n\n\n\n🏙️ The people\n\n👑 Public leadership\n\n⚠️ Shared consequences\n\n\n\nThe phrase helps the reader see the kingdom story as both personal and national."
      ],
      [
        "👑 We Have Ten Parts in the King",
        "We Have Ten Parts in the King is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🗡️ Men of Israel Answered the Men of Judah",
        "Men of Israel Answered the Men of Judah focuses on the people, not only the king. The nation is being pulled by the choices of its leaders.\n\nWhen tribes and people groups are named, the reader should notice how public the consequences have become.\n\n\n\n🏙️ The people\n\n👑 Public leadership\n\n⚠️ Shared consequences\n\n\n\nThe phrase helps the reader see the kingdom story as both personal and national."
      ],
      [
        "💛 Of Israel Answered the Men of Judah, and",
        "Of Israel Answered the Men of Judah, and focuses on the people, not only the king. The nation is being pulled by the choices of its leaders.\n\nWhen tribes and people groups are named, the reader should notice how public the consequences have become.\n\n\n\n🏙️ The people\n\n👑 Public leadership\n\n⚠️ Shared consequences\n\n\n\nThe phrase helps the reader see the kingdom story as both personal and national."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 20,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 20:1-6",
    title: "There Happened to Be There a Man of Belial",
    icon: "🏛️",
    phrases: [
      [
        "⚠️ There Happened to Be There a Man of Belial",
        "There Happened to Be There a Man of Belial is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🛡️ Whose Name Was Sheba",
        "Whose Name Was Sheba is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏙️ So Every Man of Israel Went Up from After David",
        "So Every Man of Israel Went Up from After David keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "📦 Followed Sheba the Son of Bichri",
        "Followed Sheba the Son of Bichri is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 20,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 20:7-12",
    title: "There Went Out After Him Joab’s Men",
    icon: "🧠",
    phrases: [
      [
        "✨ There Went Out After Him Joab’s Men",
        "There Went Out After Him Joab’s Men keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🙏 All the Mighty Men",
        "All the Mighty Men is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏙️ When They Were at the Great Stone Which Is in Gibeon",
        "When They Were at the Great Stone Which Is in Gibeon is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📦 Amasa Went Before Them",
        "Amasa Went Before Them is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 20,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 20:13-18",
    title: "When He Was Removed Out of the Highway",
    icon: "⚠️",
    phrases: [
      [
        "😢 When He Was Removed Out of the Highway",
        "When He Was Removed Out of the Highway is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ All the People Went on After Joab",
        "All the People Went on After Joab keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "👑 He Went Through All the Tribes of Israel unto Abel",
        "He Went Through All the Tribes of Israel unto Abel is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔑 All the Berites",
        "All the Berites is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 20,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Samuel 20:19-24",
    title: "I Am One of Them That Are Peaceable",
    icon: "💛",
    phrases: [
      [
        "🏠 I Am One of Them That Are Peaceable",
        "I Am One of Them That Are Peaceable is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 Faithful in Israel",
        "Faithful in Israel is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🕍 Far Be It",
        "Far Be It is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🧠 Far Be It from Me",
        "Far Be It from Me is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 20,
    startVerse: 25,
    endVerse: 26,
    reference: "2 Samuel 20:25-26",
    title: "Sheva Was Scribe",
    icon: "👑",
    phrases: [
      [
        "🙏 Sheva Was Scribe",
        "Sheva Was Scribe is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "⚠️ Abiathar Were the Priests",
        "Abiathar Were the Priests is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "✨ Ira Also the Jairite Was a Chief Ruler About David",
        "Ira Also the Jairite Was a Chief Ruler About David keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🔑 The Jairite Was a Chief",
        "The Jairite Was a Chief is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 21,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 21:1-6",
    title: "Then There Was a Famine in the Days",
    icon: "🧠",
    phrases: [
      [
        "😢 Then There Was a Famine in the Days of David Three Years",
        "Then There Was a Famine in the Days of David Three Years keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "👑 Year After Year",
        "Year After Year is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 The King Called the Gibeonites",
        "The King Called the Gibeonites is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "📜 Said unto Them",
        "Said unto Them marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 21,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 21:7-12",
    title: "The King Spared Mephibosheth",
    icon: "⚠️",
    phrases: [
      [
        "👑 But the King Spared Mephibosheth",
        "But the King Spared Mephibosheth is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🙏 The Son of Jonathan the Son of Saul",
        "The Son of Jonathan the Son of Saul keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "📜 But the King Took the Two Sons of Rizpah the Daughter of Aiah",
        "But the King Took the Two Sons of Rizpah the Daughter of Aiah is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🏠 Whom She Bare unto Saul",
        "Whom She Bare unto Saul keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 21,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 21:13-18",
    title: "He Brought Up from Thence the Bones of Saul",
    icon: "💛",
    phrases: [
      [
        "👑 He Brought Up from Thence the Bones of Saul",
        "He Brought Up from Thence the Bones of Saul is burial language. It shows honor being given after shame, defeat, or death.\n\nBurial mattered because bodies were not treated as trash. Even in judgment, the story pauses over dignity and grief.\n\n\n\n😢 Death honored\n\n🏠 Community memory\n\n📜 Sorrow handled with care\n\n\n\nThe phrase helps the reader see respect and grief in a chapter full of collapse."
      ],
      [
        "🙏 The Bones of Jonathan His Son",
        "The Bones of Jonathan His Son is burial language. It shows honor being given after shame, defeat, or death.\n\nBurial mattered because bodies were not treated as trash. Even in judgment, the story pauses over dignity and grief.\n\n\n\n😢 Death honored\n\n🏠 Community memory\n\n📜 Sorrow handled with care\n\n\n\nThe phrase helps the reader see respect and grief in a chapter full of collapse."
      ],
      [
        "📦 The Bones of Saul",
        "The Bones of Saul is burial language. It shows honor being given after shame, defeat, or death.\n\nBurial mattered because bodies were not treated as trash. Even in judgment, the story pauses over dignity and grief.\n\n\n\n😢 Death honored\n\n🏠 Community memory\n\n📜 Sorrow handled with care\n\n\n\nThe phrase helps the reader see respect and grief in a chapter full of collapse."
      ],
      [
        "🏠 Jonathan His Son Buried They in the Country of Benjamin in Zelah",
        "Jonathan His Son Buried They in the Country of Benjamin in Zelah focuses on the people, not only the king. The nation is being pulled by the choices of its leaders.\n\nWhen tribes and people groups are named, the reader should notice how public the consequences have become.\n\n\n\n🏙️ The people\n\n👑 Public leadership\n\n⚠️ Shared consequences\n\n\n\nThe phrase helps the reader see the kingdom story as both personal and national."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 21,
    startVerse: 19,
    endVerse: 22,
    reference: "2 Samuel 21:19-22",
    title: "There Was Again a Battle in Gob",
    icon: "👑",
    phrases: [
      [
        "🗡️ There Was Again a Battle in Gob with the Philistines",
        "There Was Again a Battle in Gob with the Philistines is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "💛 Where Elhanan the Son of Jaare-oregim",
        "Where Elhanan the Son of Jaare-oregim is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔥 There Was Yet a Battle in Gath",
        "There Was Yet a Battle in Gath is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "🧠 Where Was a Man of Great Stature",
        "Where Was a Man of Great Stature is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 22,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 22:1-6",
    title: "David Spake unto the LORD the Words of This",
    icon: "⚠️",
    phrases: [
      [
        "🙏 David Spake unto the LORD the Words of This Song in the Day That the LORD Had Delivered Him Out of the Hand of All His Enemies",
        "David Spake unto the LORD the Words of This Song in the Day That the LORD Had Delivered Him Out of the Hand of All His Enemies puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🛡️ Out of the Hand of Saul",
        "Out of the Hand of Saul keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "✨ The LORD Is My Rock",
        "The LORD Is My Rock puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "👑 The God of My Rock",
        "The God of My Rock puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 22,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 22:7-12",
    title: "In My Distress I Called Upon the LORD",
    icon: "💛",
    phrases: [
      [
        "🙏 In My Distress I Called Upon the LORD",
        "In My Distress I Called Upon the LORD puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "💛 Cried to My God",
        "Cried to My God puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "📦 Then the Earth Shook",
        "Then the Earth Shook is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "⚠️ The Foundations of Heaven Moved",
        "The Foundations of Heaven Moved is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 22,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 22:13-18",
    title: "Through the Brightness Before Him Were Coals of Fire",
    icon: "👑",
    phrases: [
      [
        "🛡️ Through the Brightness Before Him Were Coals of Fire Kindled",
        "Through the Brightness Before Him Were Coals of Fire Kindled is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 Before Him Were Coals of",
        "Before Him Were Coals of is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔥 Coals of Fire Kindled.",
        "Coals of Fire Kindled. is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 The LORD Thundered from Heaven",
        "The LORD Thundered from Heaven puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 22,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Samuel 22:19-24",
    title: "They Prevented Me in the Day of My Calamity",
    icon: "🗡️",
    phrases: [
      [
        "🙏 They Prevented Me in the Day of My Calamity",
        "They Prevented Me in the Day of My Calamity is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔑 But the LORD Was My Stay",
        "But the LORD Was My Stay puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "💛 He Brought Me Forth Also into a Large Place",
        "He Brought Me Forth Also into a Large Place is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "⚠️ He Delivered Me",
        "He Delivered Me is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 22,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Samuel 22:25-30",
    title: "Therefore the LORD Hath Recompensed Me According to My",
    icon: "📜",
    phrases: [
      [
        "🙏 Therefore the LORD Hath Recompensed Me According to My Righteousness",
        "Therefore the LORD Hath Recompensed Me According to My Righteousness puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🗡️ According to My Cleanness in His Eye Sight",
        "According to My Cleanness in His Eye Sight is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "😢 With the Merciful Thou Wilt Shew Thyself Merciful",
        "With the Merciful Thou Wilt Shew Thyself Merciful is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "💛 With the Upright Man Thou Wilt Shew Thyself Upright",
        "With the Upright Man Thou Wilt Shew Thyself Upright is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 22,
    startVerse: 31,
    endVerse: 36,
    reference: "2 Samuel 22:31-36",
    title: "As for God",
    icon: "🏠",
    phrases: [
      [
        "🙏 As for God",
        "As for God puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "💛 His Way Is Perfect",
        "His Way Is Perfect is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "✨ For Who Is God",
        "For Who Is God puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "⚠️ Save the LORD",
        "Save the LORD puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 22,
    startVerse: 37,
    endVerse: 42,
    reference: "2 Samuel 22:37-42",
    title: "Thou Hast Enlarged My Steps Under Me",
    icon: "🙏",
    phrases: [
      [
        "🕍 Thou Hast Enlarged My Steps Under Me",
        "Thou Hast Enlarged My Steps Under Me is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 So That My Feet Did Not Slip",
        "So That My Feet Did Not Slip is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔥 I Have Pursued Mine Enemies",
        "I Have Pursued Mine Enemies is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 Turned Not Again Until I Had Consumed Them",
        "Turned Not Again Until I Had Consumed Them is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 22,
    startVerse: 43,
    endVerse: 48,
    reference: "2 Samuel 22:43-48",
    title: "Then Did I Beat Them as Small",
    icon: "🔥",
    phrases: [
      [
        "🏠 Then Did I Beat Them as Small as the Dust of the Earth",
        "Then Did I Beat Them as Small as the Dust of the Earth is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "⚠️ I Did Stamp Them as the Mire of the Street",
        "I Did Stamp Them as the Mire of the Street is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "💛 Thou Also Hast Delivered Me from the Strivings of My People",
        "Thou Also Hast Delivered Me from the Strivings of My People is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "😢 Thou Hast Kept Me to Be Head of the Heathen",
        "Thou Hast Kept Me to Be Head of the Heathen is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 22,
    startVerse: 49,
    endVerse: 51,
    reference: "2 Samuel 22:49-51",
    title: "That Bringeth Me Forth from Mine Enemies",
    icon: "🏙️",
    phrases: [
      [
        "👑 That Bringeth Me Forth from Mine Enemies",
        "That Bringeth Me Forth from Mine Enemies is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "✨ Thou Also Hast Lifted Me Up on High Above Them That Rose Up Against Me",
        "Thou Also Hast Lifted Me Up on High Above Them That Rose Up Against Me is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 Therefore I Will Give Thanks unto Thee",
        "Therefore I Will Give Thanks unto Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📦 Among the Heathen",
        "Among the Heathen is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 23,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 23:1-6",
    title: "Now These Be the Last Words of David",
    icon: "💛",
    phrases: [
      [
        "📜 Now These Be the Last Words of David",
        "Now These Be the Last Words of David keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "✨ David the Son of Jesse Said",
        "David the Son of Jesse Said marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🙏 The Spirit of the LORD Spake by Me",
        "The Spirit of the LORD Spake by Me puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🧠 His Word Was in My Tongue",
        "His Word Was in My Tongue is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 23,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 23:7-12",
    title: "The Man That Shall Touch Them Must Be Fenced",
    icon: "👑",
    phrases: [
      [
        "🏠 But the Man That Shall Touch Them Must Be Fenced with Iron",
        "But the Man That Shall Touch Them Must Be Fenced with Iron is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "✨ The Staff of a Spear",
        "The Staff of a Spear is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 These Be the Names of the Mighty Men Whom David Had",
        "These Be the Names of the Mighty Men Whom David Had keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🧠 The Tachmonite That Sat in the Seat",
        "The Tachmonite That Sat in the Seat is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 23,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 23:13-18",
    title: "Three of the Thirty Chief Went Down",
    icon: "🗡️",
    phrases: [
      [
        "😢 Three of the Thirty Chief Went Down",
        "Three of the Thirty Chief Went Down is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 Came to David in the Harvest Time unto the Cave of Adullam",
        "Came to David in the Harvest Time unto the Cave of Adullam keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "💛 David Was Then in an Hold",
        "David Was Then in an Hold keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🏙️ The Garrison of the Philistines Was Then in Bethlehem",
        "The Garrison of the Philistines Was Then in Bethlehem is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 23,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Samuel 23:19-24",
    title: "Was He Not Most Honourable of Three",
    icon: "📜",
    phrases: [
      [
        "🗡️ Was He Not Most Honourable of Three",
        "Was He Not Most Honourable of Three is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 Therefore He Was Their Captain",
        "Therefore He Was Their Captain is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🧠 Benaiah the Son of Jehoiada",
        "Benaiah the Son of Jehoiada is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📦 The Son of a Valiant Man",
        "The Son of a Valiant Man is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 23,
    startVerse: 25,
    endVerse: 30,
    reference: "2 Samuel 23:25-30",
    title: "Shammah the Harodite",
    icon: "🏠",
    phrases: [
      [
        "⚠️ Shammah the Harodite",
        "Shammah the Harodite is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🛡️ Elika the Harodite",
        "Elika the Harodite is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 Helez the Paltite",
        "Helez the Paltite is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "😢 Ira the Son of Ikkesh the Tekoite",
        "Ira the Son of Ikkesh the Tekoite is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 23,
    startVerse: 31,
    endVerse: 36,
    reference: "2 Samuel 23:31-36",
    title: "Abi-albon the Arbathite",
    icon: "🙏",
    phrases: [
      [
        "⚠️ Abi-albon the Arbathite",
        "Abi-albon the Arbathite is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📦 Azmaveth the Barhumite",
        "Azmaveth the Barhumite is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏙️ Eliahba the Shaalbonite",
        "Eliahba the Shaalbonite is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "💛 Of the Sons of Jashen",
        "Of the Sons of Jashen is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 23,
    startVerse: 37,
    endVerse: 39,
    reference: "2 Samuel 23:37-39",
    title: "Zelek the Ammonite",
    icon: "🔥",
    phrases: [
      [
        "🗡️ Zelek the Ammonite",
        "Zelek the Ammonite is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🛡️ Nahari the Beerothite",
        "Nahari the Beerothite is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔑 Ira an Ithrite",
        "Ira an Ithrite is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🧠 Gareb an Ithrite",
        "Gareb an Ithrite is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 24,
    startVerse: 1,
    endVerse: 6,
    reference: "2 Samuel 24:1-6",
    title: "Again the Anger of the LORD Was Kindled Against",
    icon: "👑",
    phrases: [
      [
        "🙏 Again the Anger of the LORD Was Kindled Against Israel",
        "Again the Anger of the LORD Was Kindled Against Israel puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🕍 He Moved David Against Them to Say",
        "He Moved David Against Them to Say keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "👑 For the King Said to Joab the Captain of the Host",
        "For the King Said to Joab the Captain of the Host is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🔥 Which Was with Him",
        "Which Was with Him is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 24,
    startVerse: 7,
    endVerse: 12,
    reference: "2 Samuel 24:7-12",
    title: "Came to the Strong Hold of Tyre",
    icon: "🗡️",
    phrases: [
      [
        "🕍 Came to the Strong Hold of Tyre",
        "Came to the Strong Hold of Tyre is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔑 To All the Cities of the Hivites",
        "To All the Cities of the Hivites is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "😢 So When They Had Gone Through All the Land",
        "So When They Had Gone Through All the Land is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏙️ They Came to Jerusalem at the End of Nine Months",
        "They Came to Jerusalem at the End of Nine Months names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 24,
    startVerse: 13,
    endVerse: 18,
    reference: "2 Samuel 24:13-18",
    title: "So Gad Came to David",
    icon: "📜",
    phrases: [
      [
        "🕍 So Gad Came to David",
        "So Gad Came to David keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "📜 Said unto Him",
        "Said unto Him marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🔑 David Said unto Gad",
        "David Said unto Gad marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "😢 I Am in a Great Strait",
        "I Am in a Great Strait is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 24,
    startVerse: 19,
    endVerse: 24,
    reference: "2 Samuel 24:19-24",
    title: "According to the Saying of Gad",
    icon: "🏠",
    phrases: [
      [
        "👑 According to the Saying of Gad",
        "According to the Saying of Gad is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 Went Up as the LORD Commanded",
        "Went Up as the LORD Commanded puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "📦 Saw the King",
        "Saw the King is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🗡️ His Servants Coming on Toward Him",
        "His Servants Coming on Toward Him is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ]
    ]
  },
  {
    book: "2 Samuel",
    chapter: 24,
    startVerse: 25,
    endVerse: 25,
    reference: "2 Samuel 24:25",
    title: "David Built There an Altar unto the LORD",
    icon: "🙏",
    phrases: [
      [
        "🙏 David Built There an Altar unto the LORD",
        "David Built There an Altar unto the LORD is worship language. It points to offerings brought before the LORD as part of Israel's worship.\n\nSacrifices taught Israel that worship involved gratitude, surrender, fellowship, and dealing seriously with sin.\n\n\n\n🕍 Altar worship\n\n🔥 Offering given\n\n🙏 Drawing near to God\n\n\n\nThe phrase keeps the reader focused on worship, not just royal ceremony."
      ],
      [
        "🕍 Offered Burnt Offerings",
        "Offered Burnt Offerings is worship language. It points to offerings brought before the LORD as part of Israel's worship.\n\nSacrifices taught Israel that worship involved gratitude, surrender, fellowship, and dealing seriously with sin.\n\n\n\n🕍 Altar worship\n\n🔥 Offering given\n\n🙏 Drawing near to God\n\n\n\nThe phrase keeps the reader focused on worship, not just royal ceremony."
      ],
      [
        "✨ Built There an Altar unto the Lord, and",
        "Built There an Altar unto the Lord, and is worship language. It points to offerings brought before the LORD as part of Israel's worship.\n\nSacrifices taught Israel that worship involved gratitude, surrender, fellowship, and dealing seriously with sin.\n\n\n\n🕍 Altar worship\n\n🔥 Offering given\n\n🙏 Drawing near to God\n\n\n\nThe phrase keeps the reader focused on worship, not just royal ceremony."
      ],
      [
        "🔥 There an Altar unto the Lord, and Offered",
        "There an Altar unto the Lord, and Offered is worship language. It points to offerings brought before the LORD as part of Israel's worship.\n\nSacrifices taught Israel that worship involved gratitude, surrender, fellowship, and dealing seriously with sin.\n\n\n\n🕍 Altar worship\n\n🔥 Offering given\n\n🙏 Drawing near to God\n\n\n\nThe phrase keeps the reader focused on worship, not just royal ceremony."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 1,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 1:1-6",
    title: "Now King David Was Old",
    icon: "🗡️",
    phrases: [
      [
        "👑 Now King David Was Old",
        "Now King David Was Old is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🗡️ Stricken in Years",
        "Stricken in Years is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 Wherefore His Servants Said unto Him",
        "Wherefore His Servants Said unto Him is question language. It shows someone trying to uncover identity, motive, guilt, or meaning.\n\nQuestions in these chapters often expose what is hidden in a person's heart or in the political situation.\n\n\n\n🔑 Identity being tested\n\n📜 Words under pressure\n\n💛 Motives coming out\n\n\n\nThe question helps the reader listen carefully before judging the scene too quickly."
      ],
      [
        "🙏 Let There Be Sought for My Lord the King a Young Virgin",
        "Let There Be Sought for My Lord the King a Young Virgin puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 1,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 1:7-12",
    title: "He Conferred with Joab the Son of Zeruiah",
    icon: "📜",
    phrases: [
      [
        "🏙️ He Conferred with Joab the Son of Zeruiah",
        "He Conferred with Joab the Son of Zeruiah keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🙏 With Abiathar the Priest",
        "With Abiathar the Priest is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 But Zadok the Priest",
        "But Zadok the Priest is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🧠 Benaiah the Son of Jehoiada",
        "Benaiah the Son of Jehoiada is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 1,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 1:13-18",
    title: "Get Thee in unto King David",
    icon: "🏠",
    phrases: [
      [
        "👑 Get Thee in unto King David",
        "Get Thee in unto King David is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🏠 Say unto Him",
        "Say unto Him is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "✨ While Thou Yet Talkest There with the King",
        "While Thou Yet Talkest There with the King is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🛡️ I Also Will Come in After Thee",
        "I Also Will Come in After Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 1,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 1:19-24",
    title: "He Hath Slain Oxen",
    icon: "🙏",
    phrases: [
      [
        "😢 He Hath Slain Oxen",
        "He Hath Slain Oxen is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ],
      [
        "🛡️ Sheep in Abundance",
        "Sheep in Abundance is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "💛 The Eyes of All Israel Are Upon Thee",
        "The Eyes of All Israel Are Upon Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 That Thou Shouldest Tell Them Who Shall Sit on the Throne of My Lord the King After Him",
        "That Thou Shouldest Tell Them Who Shall Sit on the Throne of My Lord the King After Him puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 1,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Kings 1:25-30",
    title: "For He Is Gone Down This Day",
    icon: "🔥",
    phrases: [
      [
        "📜 For He Is Gone Down This Day",
        "For He Is Gone Down This Day is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "😢 Hath Slain Oxen",
        "Hath Slain Oxen is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ],
      [
        "👑 Even Me Thy Servant",
        "Even Me Thy Servant is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 Zadok the Priest",
        "Zadok the Priest is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 1,
    startVerse: 31,
    endVerse: 36,
    reference: "1 Kings 1:31-36",
    title: "Then Bath-sheba Bowed with Her Face to the Earth",
    icon: "🏙️",
    phrases: [
      [
        "🛡️ Then Bath-sheba Bowed with Her Face to the Earth",
        "Then Bath-sheba Bowed with Her Face to the Earth is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 Did Reverence to the King",
        "Did Reverence to the King is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🕍 King David Said",
        "King David Said is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "😢 Call Me Zadok the Priest",
        "Call Me Zadok the Priest is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 1,
    startVerse: 37,
    endVerse: 42,
    reference: "1 Kings 1:37-42",
    title: "As the LORD Hath Been with My Lord",
    icon: "🛡️",
    phrases: [
      [
        "🙏 As the LORD Hath Been with My Lord the King",
        "As the LORD Hath Been with My Lord the King puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "💛 Even So Be He with Solomon",
        "Even So Be He with Solomon keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🏙️ So Zadok the Priest",
        "So Zadok the Priest is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔑 Nathan the Prophet",
        "Nathan the Prophet is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 1,
    startVerse: 43,
    endVerse: 48,
    reference: "1 Kings 1:43-48",
    title: "Said to Adonijah",
    icon: "🏛️",
    phrases: [
      [
        "📜 Said to Adonijah",
        "Said to Adonijah marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🙏 Verily Our Lord King David Hath Made Solomon King",
        "Verily Our Lord King David Hath Made Solomon King puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "👑 The King Hath Sent with Him Zadok the Priest",
        "The King Hath Sent with Him Zadok the Priest is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🏙️ Nathan the Prophet",
        "Nathan the Prophet is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 1,
    startVerse: 49,
    endVerse: 53,
    reference: "1 Kings 1:49-53",
    title: "All the Guests Were with Adonijah Were Afraid",
    icon: "🧠",
    phrases: [
      [
        "🏠 All the Guests That Were with Adonijah Were Afraid",
        "All the Guests That Were with Adonijah Were Afraid is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔑 Went Every Man His Way",
        "Went Every Man His Way is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏙️ Adonijah Feared Because of Solomon",
        "Adonijah Feared Because of Solomon keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🕍 Caught Hold on the Horns of the Altar",
        "Caught Hold on the Horns of the Altar is worship language. It points to offerings brought before the LORD as part of Israel's worship.\n\nSacrifices taught Israel that worship involved gratitude, surrender, fellowship, and dealing seriously with sin.\n\n\n\n🕍 Altar worship\n\n🔥 Offering given\n\n🙏 Drawing near to God\n\n\n\nThe phrase keeps the reader focused on worship, not just royal ceremony."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 2,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 2:1-6",
    title: "Now the Days of David Drew Nigh That He",
    icon: "📜",
    phrases: [
      [
        "🙏 Now the Days of David Drew Nigh That He Should Die",
        "Now the Days of David Drew Nigh That He Should Die keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "📦 He Charged Solomon His Son",
        "He Charged Solomon His Son keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "👑 I Go the Way of All the Earth",
        "I Go the Way of All the Earth is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "✨ Be Thou Strong Therefore",
        "Be Thou Strong Therefore is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 2,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 2:7-12",
    title: "Shew Kindness unto the Sons of Barzillai the Gileadite",
    icon: "🏠",
    phrases: [
      [
        "🧠 But Shew Kindness unto the Sons of Barzillai the Gileadite",
        "But Shew Kindness unto the Sons of Barzillai the Gileadite is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏙️ Let Them Be of Those That Eat at Thy Table",
        "Let Them Be of Those That Eat at Thy Table is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "⚠️ Thou Hast with Thee Shimei the Son of Gera",
        "Thou Hast with Thee Shimei the Son of Gera is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 A Benjamite of Bahurim",
        "A Benjamite of Bahurim is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 2,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 2:13-18",
    title: "Adonijah the Son of Haggith Came to Bath-sheba",
    icon: "🙏",
    phrases: [
      [
        "👑 Adonijah the Son of Haggith Came to Bath-sheba the Mother of Solomon",
        "Adonijah the Son of Haggith Came to Bath-sheba the Mother of Solomon keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "📜 Comest Thou Peaceably",
        "Comest Thou Peaceably is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📦 He Said Moreover",
        "He Said Moreover marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🧠 I Have Somewhat to Say unto Thee",
        "I Have Somewhat to Say unto Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 2,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 2:19-24",
    title: "Bath-sheba Therefore Went unto King Solomon",
    icon: "🔥",
    phrases: [
      [
        "👑 Bath-sheba Therefore Went unto King Solomon",
        "Bath-sheba Therefore Went unto King Solomon is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "📦 To Speak unto Him for Adonijah",
        "To Speak unto Him for Adonijah is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 Then She Said",
        "Then She Said marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🧠 I Desire One Small Petition of Thee",
        "I Desire One Small Petition of Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 2,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Kings 2:25-30",
    title: "King Solomon Sent by the Hand of Benaiah",
    icon: "🏙️",
    phrases: [
      [
        "👑 King Solomon Sent by the Hand of Benaiah the Son of Jehoiada",
        "King Solomon Sent by the Hand of Benaiah the Son of Jehoiada is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "😢 He Fell Upon Him That He Died",
        "He Fell Upon Him That He Died is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ],
      [
        "🗡️ Unto Abiathar the Priest Said the King",
        "Unto Abiathar the Priest Said the King is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "📦 Get Thee to Anathoth",
        "Get Thee to Anathoth is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 2,
    startVerse: 31,
    endVerse: 36,
    reference: "1 Kings 2:31-36",
    title: "The King Said unto Him",
    icon: "🛡️",
    phrases: [
      [
        "👑 The King Said unto Him",
        "The King Said unto Him is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "📜 Do as He Hath Said",
        "Do as He Hath Said marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🙏 The LORD Shall Return His Blood Upon His Own Head",
        "The LORD Shall Return His Blood Upon His Own Head puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "📦 Who Fell Upon Two Men More Righteous",
        "Who Fell Upon Two Men More Righteous is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 2,
    startVerse: 37,
    endVerse: 42,
    reference: "1 Kings 2:37-42",
    title: "For It Shall Be",
    icon: "🏛️",
    phrases: [
      [
        "🏠 For It Shall Be",
        "For It Shall Be is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 That on the Day Thou Goest Out",
        "That on the Day Thou Goest Out is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 Shimei Said unto the King",
        "Shimei Said unto the King is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🏙️ The Saying Is Good",
        "The Saying Is Good is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 2,
    startVerse: 43,
    endVerse: 46,
    reference: "1 Kings 2:43-46",
    title: "Why Then Hast Thou Not Kept the Oath",
    icon: "🧠",
    phrases: [
      [
        "🙏 Why Then Hast Thou Not Kept the Oath of the LORD",
        "Why Then Hast Thou Not Kept the Oath of the LORD is question language. It shows someone trying to uncover identity, motive, guilt, or meaning.\n\nQuestions in these chapters often expose what is hidden in a person's heart or in the political situation.\n\n\n\n🔑 Identity being tested\n\n📜 Words under pressure\n\n💛 Motives coming out\n\n\n\nThe question helps the reader listen carefully before judging the scene too quickly."
      ],
      [
        "📜 The Commandment That I Have Charged Thee with",
        "The Commandment That I Have Charged Thee with is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 The King Said Moreover to Shimei",
        "The King Said Moreover to Shimei is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "💛 Thou Knowest All the Wickedness Which Thine Heart Is Privy to",
        "Thou Knowest All the Wickedness Which Thine Heart Is Privy to points to the inner person. In the Bible, the heart includes desire, loyalty, thought, and choice.\n\nThe story is showing more than outward actions; it is showing what people love, fear, and pursue.\n\n\n\n💛 Desire\n\n🔑 Loyalty\n\n⚠️ Direction of life\n\n\n\nThe phrase reminds the reader that the kingdom is shaped by hidden desires before public actions appear."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 3,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 3:1-6",
    title: "Solomon Made Affinity with Pharaoh King of Egypt",
    icon: "🏠",
    phrases: [
      [
        "👑 Solomon Made Affinity with Pharaoh King of Egypt",
        "Solomon Made Affinity with Pharaoh King of Egypt is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🙏 Took Pharaoh’s Daughter",
        "Took Pharaoh’s Daughter is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🕍 Only the People Sacrificed in High Places",
        "Only the People Sacrificed in High Places is worship language. It points to offerings brought before the LORD as part of Israel's worship.\n\nSacrifices taught Israel that worship involved gratitude, surrender, fellowship, and dealing seriously with sin.\n\n\n\n🕍 Altar worship\n\n🔥 Offering given\n\n🙏 Drawing near to God\n\n\n\nThe phrase keeps the reader focused on worship, not just royal ceremony."
      ],
      [
        "✨ Because There Was No House Built unto the Name of the LORD",
        "Because There Was No House Built unto the Name of the LORD puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 3,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 3:7-12",
    title: "O LORD My God",
    icon: "🙏",
    phrases: [
      [
        "🙏 O LORD My God",
        "O LORD My God puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "👑 Thou Hast Made Thy Servant King Instead of David My Father",
        "Thou Hast Made Thy Servant King Instead of David My Father is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "💛 Thy Servant Is in the Midst of Thy People Which Thou Hast Chosen",
        "Thy Servant Is in the Midst of Thy People Which Thou Hast Chosen is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 A Great People",
        "A Great People is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 3,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 3:13-18",
    title: "I Have Also Given Thee That Which Thou Hast",
    icon: "🔥",
    phrases: [
      [
        "✨ I Have Also Given Thee That Which Thou Hast Not Asked",
        "I Have Also Given Thee That Which Thou Hast Not Asked is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 So That There Shall Not Be Any Among the Kings Like unto Thee All Thy Days",
        "So That There Shall Not Be Any Among the Kings Like unto Thee All Thy Days is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "📜 If Thou Wilt Walk in My Ways",
        "If Thou Wilt Walk in My Ways is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🕍 To Keep My Statutes",
        "To Keep My Statutes is obedience language. To walk in God's statutes means to live according to His commands.\n\nThe word walk pictures a daily pattern, not a one-time religious moment.\n\n\n\n📜 God's commands\n\n💛 Whole-heart loyalty\n\n🔑 Daily direction\n\n\n\nThe phrase helps the reader see that temple worship was meant to lead to faithful living."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 3,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 3:19-24",
    title: "This Woman’s Child Died in the Night",
    icon: "🏙️",
    phrases: [
      [
        "😢 This Woman’s Child Died in the Night",
        "This Woman’s Child Died in the Night is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ],
      [
        "🧠 Because She Overlaid It",
        "Because She Overlaid It is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📦 She Arose at Midnight",
        "She Arose at Midnight is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 Took My Son from Beside Me",
        "Took My Son from Beside Me is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 3,
    startVerse: 25,
    endVerse: 28,
    reference: "1 Kings 3:25-28",
    title: "The King Said",
    icon: "🛡️",
    phrases: [
      [
        "👑 The King Said",
        "The King Said is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🙏 Divide the Living Child in Two",
        "Divide the Living Child in Two is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ Then Spake the Woman Whose the Living Child Was unto the King",
        "Then Spake the Woman Whose the Living Child Was unto the King is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🧠 For Her Bowels Yearned Upon Her Son",
        "For Her Bowels Yearned Upon Her Son is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 4,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 4:1-6",
    title: "So King Solomon Was King Over All Israel",
    icon: "🙏",
    phrases: [
      [
        "👑 So King Solomon Was King Over All Israel",
        "So King Solomon Was King Over All Israel is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🙏 Was King Over All Israel.",
        "Was King Over All Israel. is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🗡️ These Were the Princes Which He Had",
        "These Were the Princes Which He Had is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "💛 Azariah the Son of Zadok the Priest",
        "Azariah the Son of Zadok the Priest is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 4,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 4:7-12",
    title: "Solomon Had Twelve Officers Over All Israel",
    icon: "🔥",
    phrases: [
      [
        "💛 Solomon Had Twelve Officers Over All Israel",
        "Solomon Had Twelve Officers Over All Israel keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "👑 Which Provided Victuals for the King",
        "Which Provided Victuals for the King is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🏙️ These Are Their Names",
        "These Are Their Names is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔑 The Son of Hur",
        "The Son of Hur is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 4,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 4:13-18",
    title: "The Son of Geber",
    icon: "🏙️",
    phrases: [
      [
        "🏠 The Son of Geber",
        "The Son of Geber is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 To Him Pertained the Towns of Jair the Son of Manasseh",
        "To Him Pertained the Towns of Jair the Son of Manasseh is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "💛 Ahinadab the Son of Iddo Had Mahanaim",
        "Ahinadab the Son of Iddo Had Mahanaim is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "✨ Of Iddo Had Mahanaim:",
        "Of Iddo Had Mahanaim: is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 4,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 4:19-24",
    title: "Geber the Son of Uri Was in the Country",
    icon: "🛡️",
    phrases: [
      [
        "😢 Geber the Son of Uri Was in the Country of Gilead",
        "Geber the Son of Uri Was in the Country of Gilead is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 In the Country of Sihon King of the Amorites",
        "In the Country of Sihon King of the Amorites is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "📦 Israel Were Many",
        "Israel Were Many is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 As the Sand Which Is by the Sea in Multitude",
        "As the Sand Which Is by the Sea in Multitude is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 4,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Kings 4:25-30",
    title: "Israel Dwelt Safely",
    icon: "🏛️",
    phrases: [
      [
        "🏠 Israel Dwelt Safely",
        "Israel Dwelt Safely is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "😢 Every Man Under His Vine",
        "Every Man Under His Vine is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 Solomon Had Forty Thousand Stalls of Horses for His Chariots",
        "Solomon Had Forty Thousand Stalls of Horses for His Chariots is wealth and power language. It shows the size, reach, and resources of Solomon's kingdom.\n\nThese details can show blessing, but they also prepare the reader to watch Solomon's heart carefully.\n\n\n\n👑 Royal wealth\n\n🏙️ Kingdom reach\n\n⚠️ Power can tempt\n\n\n\nThe phrase helps the reader notice both the glory and the danger of Solomon's success."
      ],
      [
        "👑 Twelve Thousand Horsemen",
        "Twelve Thousand Horsemen is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 4,
    startVerse: 31,
    endVerse: 34,
    reference: "1 Kings 4:31-34",
    title: "For He Was Wiser Than All Men",
    icon: "🧠",
    phrases: [
      [
        "🧠 For He Was Wiser Than All Men",
        "For He Was Wiser Than All Men is wisdom language. It is about seeing clearly, judging rightly, and leading with understanding.\n\nSolomon's wisdom is not meant to make him impressive only; it is meant to help him govern God's people well.\n\n\n\n🧠 Discernment\n\n👑 Leadership\n\n📜 Right judgment\n\n\n\nThe phrase helps the reader see why wisdom matters for a king."
      ],
      [
        "📦 Than Ethan the Ezrahite",
        "Than Ethan the Ezrahite is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ He Spake Three Thousand Proverbs",
        "He Spake Three Thousand Proverbs marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🔥 His Songs Were a Thousand",
        "His Songs Were a Thousand is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 5,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 5:1-6",
    title: "Hiram King of Tyre Sent His Servants unto Solomon",
    icon: "🔥",
    phrases: [
      [
        "👑 Hiram King of Tyre Sent His Servants unto Solomon",
        "Hiram King of Tyre Sent His Servants unto Solomon is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🏙️ For He Had Heard That They Had Anointed Him King in the Room of His Father",
        "For He Had Heard That They Had Anointed Him King in the Room of His Father means Saul had been set apart for kingship by the LORD, even though Saul had failed badly.\n\nDavid still treats that calling seriously because royal authority is not something to grab by violence.\n\n\n\n👑 Set apart as king\n\n⚠️ Not for revenge\n\n🙏 Answerable to God\n\n\n\nThe phrase explains why David refuses to celebrate Saul's death as a shortcut to the throne."
      ],
      [
        "🧠 Solomon Sent to Hiram",
        "Solomon Sent to Hiram keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🛡️ To Hiram, Saying",
        "To Hiram, Saying is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 5,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 5:7-12",
    title: "It Came to Pass",
    icon: "🏙️",
    phrases: [
      [
        "📜 It Came to Pass",
        "It Came to Pass is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "📦 When Hiram Heard the Words of Solomon",
        "When Hiram Heard the Words of Solomon keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🧠 Hiram Sent to Solomon",
        "Hiram Sent to Solomon keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🙏 I Have Considered the Things Which Thou Sentest to Me for",
        "I Have Considered the Things Which Thou Sentest to Me for is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 5,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 5:13-18",
    title: "King Solomon Raised a Levy Out of All Israel",
    icon: "🛡️",
    phrases: [
      [
        "👑 King Solomon Raised a Levy Out of All Israel",
        "King Solomon Raised a Levy Out of All Israel is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🙏 The Levy Was Thirty Thousand Men",
        "The Levy Was Thirty Thousand Men is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔥 He Sent Them to Lebanon Ten Thousand a Month by Courses",
        "He Sent Them to Lebanon Ten Thousand a Month by Courses is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "✨ A Month They Were in Lebanon",
        "A Month They Were in Lebanon is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 6,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 6:1-6",
    title: "It Came to Pass in the Four Hundred",
    icon: "🏙️",
    phrases: [
      [
        "🕍 It Came to Pass in the Four Hundred",
        "It Came to Pass in the Four Hundred is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "📜 Eightieth Year After the Children of Israel Were Come Out of the Land of Egypt",
        "Eightieth Year After the Children of Israel Were Come Out of the Land of Egypt focuses on the people, not only the king. The nation is being pulled by the choices of its leaders.\n\nWhen tribes and people groups are named, the reader should notice how public the consequences have become.\n\n\n\n🏙️ The people\n\n👑 Public leadership\n\n⚠️ Shared consequences\n\n\n\nThe phrase helps the reader see the kingdom story as both personal and national."
      ],
      [
        "🙏 The House Which King Solomon Built for the LORD",
        "The House Which King Solomon Built for the LORD puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🧠 The Length Thereof Was Threescore Cubits",
        "The Length Thereof Was Threescore Cubits is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 6,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 6:7-12",
    title: "When It Was in Building",
    icon: "🛡️",
    phrases: [
      [
        "🏠 When It Was in Building",
        "When It Was in Building is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "😢 Was Built of Stone Made Ready Before It Was Brought Thither",
        "Was Built of Stone Made Ready Before It Was Brought Thither is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🕍 The Door for the Middle Chamber Was in the Right Side of the House",
        "The Door for the Middle Chamber Was in the Right Side of the House can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "🔥 They Went Up with Winding Stairs into the Middle Chamber",
        "They Went Up with Winding Stairs into the Middle Chamber is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 6,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 6:13-18",
    title: "I Will Dwell Among the Children of Israel",
    icon: "🏛️",
    phrases: [
      [
        "✨ I Will Dwell Among the Children of Israel",
        "I Will Dwell Among the Children of Israel focuses on the people, not only the king. The nation is being pulled by the choices of its leaders.\n\nWhen tribes and people groups are named, the reader should notice how public the consequences have become.\n\n\n\n🏙️ The people\n\n👑 Public leadership\n\n⚠️ Shared consequences\n\n\n\nThe phrase helps the reader see the kingdom story as both personal and national."
      ],
      [
        "💛 Will Not Forsake My People Israel",
        "Will Not Forsake My People Israel is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 So Solomon Built the House",
        "So Solomon Built the House can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "👑 The House, and Finished It.",
        "The House, and Finished It. can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 6,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 6:19-24",
    title: "The Oracle He Prepared in the House Within",
    icon: "🧠",
    phrases: [
      [
        "🏠 The Oracle He Prepared in the House Within",
        "The Oracle He Prepared in the House Within can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "🙏 To Set There the Ark of the Covenant of the LORD",
        "To Set There the Ark of the Covenant of the LORD puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "💛 The Oracle in the Forepart Was Twenty Cubits in Length",
        "The Oracle in the Forepart Was Twenty Cubits in Length is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔑 Twenty Cubits in Breadth",
        "Twenty Cubits in Breadth is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 6,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Kings 6:25-30",
    title: "The Other Cherub Was Ten Cubits",
    icon: "⚠️",
    phrases: [
      [
        "👑 The Other Cherub Was Ten Cubits",
        "The Other Cherub Was Ten Cubits is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔥 Both the Cherubims Were of One Measure",
        "Both the Cherubims Were of One Measure is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "😢 The Height of the One Cherub Was Ten Cubits",
        "The Height of the One Cherub Was Ten Cubits is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🧠 So Was It of the Other Cherub",
        "So Was It of the Other Cherub is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 6,
    startVerse: 31,
    endVerse: 36,
    reference: "1 Kings 6:31-36",
    title: "For the Entering of the Oracle He Made Doors",
    icon: "💛",
    phrases: [
      [
        "🕍 For the Entering of the Oracle He Made Doors of Olive Tree",
        "For the Entering of the Oracle He Made Doors of Olive Tree is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 Side Posts Were a Fifth Part of the Wall",
        "Side Posts Were a Fifth Part of the Wall is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "⚠️ The Two Doors Also Were of Olive Tree",
        "The Two Doors Also Were of Olive Tree is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔑 He Carved Upon Them Carvings of Cherubims",
        "He Carved Upon Them Carvings of Cherubims is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 6,
    startVerse: 37,
    endVerse: 38,
    reference: "1 Kings 6:37-38",
    title: "In the Fourth Year Was the Foundation",
    icon: "👑",
    phrases: [
      [
        "🙏 In the Fourth Year Was the Foundation of the House of the LORD Laid",
        "In the Fourth Year Was the Foundation of the House of the LORD Laid puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🧠 In the Month Zif",
        "In the Month Zif is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📦 In the Eleventh Year",
        "In the Eleventh Year is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🕍 In the Month Bul",
        "In the Month Bul is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 7,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 7:1-6",
    title: "Solomon Was Building His Own House Thirteen Years",
    icon: "🛡️",
    phrases: [
      [
        "🏠 But Solomon Was Building His Own House Thirteen Years",
        "But Solomon Was Building His Own House Thirteen Years can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "🏙️ He Finished All His House",
        "He Finished All His House can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "😢 He Built Also the House of the Forest of Lebanon",
        "He Built Also the House of the Forest of Lebanon can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "🙏 The Length Thereof Was an Hundred Cubits",
        "The Length Thereof Was an Hundred Cubits is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 7,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 7:7-12",
    title: "Then He Made a Porch for the Throne Where",
    icon: "🏛️",
    phrases: [
      [
        "👑 Then He Made a Porch for the Throne Where He Might Judge",
        "Then He Made a Porch for the Throne Where He Might Judge is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "⚠️ Even the Porch of Judgment",
        "Even the Porch of Judgment is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 His House Where He Dwelt Had Another Court Within the Porch",
        "His House Where He Dwelt Had Another Court Within the Porch can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "🔥 Which Was of the Like Work",
        "Which Was of the Like Work is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 7,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 7:13-18",
    title: "King Solomon Sent",
    icon: "🧠",
    phrases: [
      [
        "👑 King Solomon Sent",
        "King Solomon Sent is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🏠 Fetched Hiram Out of Tyre",
        "Fetched Hiram Out of Tyre is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "💛 He Was a Widow’s Son of the Tribe of Naphtali",
        "He Was a Widow’s Son of the Tribe of Naphtali is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🕍 His Father Was a Man of Tyre",
        "His Father Was a Man of Tyre is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 7,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 7:19-24",
    title: "The Chapiters Were Upon the Top of the Pillars",
    icon: "⚠️",
    phrases: [
      [
        "📦 The Chapiters That Were Upon the Top of the Pillars Were of Lily Work in the Porch",
        "The Chapiters That Were Upon the Top of the Pillars Were of Lily Work in the Porch is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 That Were Upon the Top",
        "That Were Upon the Top is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "😢 The Top of the Pillars",
        "The Top of the Pillars is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "💛 The Chapiters Upon the Two Pillars Had Pomegranates Also Above",
        "The Chapiters Upon the Two Pillars Had Pomegranates Also Above is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 7,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Kings 7:25-30",
    title: "It Stood Upon Twelve Oxen",
    icon: "💛",
    phrases: [
      [
        "🏠 It Stood Upon Twelve Oxen",
        "It Stood Upon Twelve Oxen is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 Three Looking Toward the North",
        "Three Looking Toward the North is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🕍 It Was an Hand Breadth Thick",
        "It Was an Hand Breadth Thick is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 The Brim Thereof Was Wrought Like the Brim of a Cup",
        "The Brim Thereof Was Wrought Like the Brim of a Cup is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 7,
    startVerse: 31,
    endVerse: 36,
    reference: "1 Kings 7:31-36",
    title: "The Mouth of It Within the Chapiter",
    icon: "👑",
    phrases: [
      [
        "🔥 The Mouth of It Within the Chapiter",
        "The Mouth of It Within the Chapiter is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ Above Was a Cubit",
        "Above Was a Cubit is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🛡️ Under the Borders Were Four Wheels",
        "Under the Borders Were Four Wheels is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 The Axletrees of the Wheels Were Joined to the Base",
        "The Axletrees of the Wheels Were Joined to the Base is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 7,
    startVerse: 37,
    endVerse: 42,
    reference: "1 Kings 7:37-42",
    title: "After This Manner He Made the Ten Bases",
    icon: "🗡️",
    phrases: [
      [
        "💛 After This Manner He Made the Ten Bases",
        "After This Manner He Made the Ten Bases is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "🔑 All of Them Had One Casting",
        "All of Them Had One Casting is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 Then Made He Ten Lavers of Brass",
        "Then Made He Ten Lavers of Brass is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 One Laver Contained Forty Baths",
        "One Laver Contained Forty Baths is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 7,
    startVerse: 43,
    endVerse: 48,
    reference: "1 Kings 7:43-48",
    title: "The Ten Bases",
    icon: "📜",
    phrases: [
      [
        "✨ The Ten Bases",
        "The Ten Bases is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔑 Ten Lavers on the Bases",
        "Ten Lavers on the Bases is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 Twelve Oxen Under the Sea",
        "Twelve Oxen Under the Sea is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ All These Vessels",
        "All These Vessels is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 7,
    startVerse: 49,
    endVerse: 51,
    reference: "1 Kings 7:49-51",
    title: "The Candlesticks of Pure Gold",
    icon: "🏠",
    phrases: [
      [
        "✨ The Candlesticks of Pure Gold",
        "The Candlesticks of Pure Gold is wealth and power language. It shows the size, reach, and resources of Solomon's kingdom.\n\nThese details can show blessing, but they also prepare the reader to watch Solomon's heart carefully.\n\n\n\n👑 Royal wealth\n\n🏙️ Kingdom reach\n\n⚠️ Power can tempt\n\n\n\nThe phrase helps the reader notice both the glory and the danger of Solomon's success."
      ],
      [
        "🧠 Five on the Right Side",
        "Five on the Right Side is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🕍 The Censers of Pure Gold",
        "The Censers of Pure Gold is wealth and power language. It shows the size, reach, and resources of Solomon's kingdom.\n\nThese details can show blessing, but they also prepare the reader to watch Solomon's heart carefully.\n\n\n\n👑 Royal wealth\n\n🏙️ Kingdom reach\n\n⚠️ Power can tempt\n\n\n\nThe phrase helps the reader notice both the glory and the danger of Solomon's success."
      ],
      [
        "📜 The Hinges of Gold",
        "The Hinges of Gold is wealth and power language. It shows the size, reach, and resources of Solomon's kingdom.\n\nThese details can show blessing, but they also prepare the reader to watch Solomon's heart carefully.\n\n\n\n👑 Royal wealth\n\n🏙️ Kingdom reach\n\n⚠️ Power can tempt\n\n\n\nThe phrase helps the reader notice both the glory and the danger of Solomon's success."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 8,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 8:1-6",
    title: "Then Solomon Assembled the Elders of Israel",
    icon: "🏛️",
    phrases: [
      [
        "🏠 Then Solomon Assembled the Elders of Israel",
        "Then Solomon Assembled the Elders of Israel keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🗡️ All the Heads of the Tribes",
        "All the Heads of the Tribes is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 All the Men of Israel Assembled Themselves unto King Solomon at the Feast in the Month Ethanim",
        "All the Men of Israel Assembled Themselves unto King Solomon at the Feast in the Month Ethanim is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🕍 Which Is the Seventh Month",
        "Which Is the Seventh Month is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 8,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 8:7-12",
    title: "For the Cherubims Spread Forth Their Two Wings Over",
    icon: "🧠",
    phrases: [
      [
        "📦 For the Cherubims Spread Forth Their Two Wings Over the Place of the Ark",
        "For the Cherubims Spread Forth Their Two Wings Over the Place of the Ark points to God's covenant presence and promise among His people.\n\nThe ark and covenant language remind the reader that Israel's hope is deeper than military strength.\n\n\n\n📦 Covenant sign\n\n🙏 Holy presence\n\n📜 Promises remembered\n\n\n\nThe phrase keeps worship and God's presence at the center of the kingdom story."
      ],
      [
        "🛡️ The Cherubims Covered the Ark",
        "The Cherubims Covered the Ark points to God's covenant presence and promise among His people.\n\nThe ark and covenant language remind the reader that Israel's hope is deeper than military strength.\n\n\n\n📦 Covenant sign\n\n🙏 Holy presence\n\n📜 Promises remembered\n\n\n\nThe phrase keeps worship and God's presence at the center of the kingdom story."
      ],
      [
        "🧠 They Drew Out the Staves",
        "They Drew Out the Staves is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "💛 That the Ends of the Staves Were Seen Out in the Holy Place Before the Oracle",
        "That the Ends of the Staves Were Seen Out in the Holy Place Before the Oracle is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 8,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 8:13-18",
    title: "I Have Surely Built Thee an House to Dwell",
    icon: "⚠️",
    phrases: [
      [
        "🏠 I Have Surely Built Thee an House to Dwell in",
        "I Have Surely Built Thee an House to Dwell in can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "🔑 A Settled Place for Thee to Abide in for Ever",
        "A Settled Place for Thee to Abide in for Ever is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 The King Turned His Face About",
        "The King Turned His Face About is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🛡️ Blessed All the Congregation of Israel",
        "Blessed All the Congregation of Israel is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 8,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 8:19-24",
    title: "Nevertheless Thou Shalt Not Build the House",
    icon: "💛",
    phrases: [
      [
        "🏠 Nevertheless Thou Shalt Not Build the House",
        "Nevertheless Thou Shalt Not Build the House can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "🛡️ But Thy Son That Shall Come Forth Out of Thy Loins",
        "But Thy Son That Shall Come Forth Out of Thy Loins is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 The LORD Hath Performed His Word That He Spake",
        "The LORD Hath Performed His Word That He Spake puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "👑 I Am Risen Up in the Room of David My Father",
        "I Am Risen Up in the Room of David My Father keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 8,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Kings 8:25-30",
    title: "LORD God of Israel",
    icon: "👑",
    phrases: [
      [
        "🙏 LORD God of Israel",
        "LORD God of Israel puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "⚠️ Keep with Thy Servant David My Father That Thou Promisedst Him",
        "Keep with Thy Servant David My Father That Thou Promisedst Him keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🏠 O God of Israel",
        "O God of Israel puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "📜 Let Thy Word",
        "Let Thy Word is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 8,
    startVerse: 31,
    endVerse: 36,
    reference: "1 Kings 8:31-36",
    title: "If Any Man Trespass Against His Neighbour",
    icon: "🗡️",
    phrases: [
      [
        "🔑 If Any Man Trespass Against His Neighbour",
        "If Any Man Trespass Against His Neighbour is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🧠 An Oath Be Laid Upon Him to Cause Him to Swear",
        "An Oath Be Laid Upon Him to Cause Him to Swear is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🕍 Then Hear Thou in Heaven",
        "Then Hear Thou in Heaven is prayer language. It means Solomon is asking God to listen from heaven and respond with mercy.\n\nThe temple is important, but Solomon knows God is not trapped inside a building.\n\n\n\n🙏 God hears\n\n🏛️ Temple worship\n\n💛 Mercy needed\n\n\n\nThe phrase helps the reader understand that the temple is a place of prayer because the LORD is a God who hears."
      ],
      [
        "🙏 Judge Thy Servants",
        "Judge Thy Servants is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 8,
    startVerse: 37,
    endVerse: 42,
    reference: "1 Kings 8:37-42",
    title: "If There Be in the Land Famine",
    icon: "📜",
    phrases: [
      [
        "💛 If There Be in the Land Famine",
        "If There Be in the Land Famine is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ If There Be Pestilence",
        "If There Be Pestilence is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🛡️ Supplication Soever Be Made by Any Man",
        "Supplication Soever Be Made by Any Man is prayer language. It means Solomon is asking God to listen from heaven and respond with mercy.\n\nThe temple is important, but Solomon knows God is not trapped inside a building.\n\n\n\n🙏 God hears\n\n🏛️ Temple worship\n\n💛 Mercy needed\n\n\n\nThe phrase helps the reader understand that the temple is a place of prayer because the LORD is a God who hears."
      ],
      [
        "😢 Or by All Thy People Israel",
        "Or by All Thy People Israel is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 8,
    startVerse: 43,
    endVerse: 48,
    reference: "1 Kings 8:43-48",
    title: "Hear Thou in Heaven Thy Dwelling Place",
    icon: "🏠",
    phrases: [
      [
        "✨ Hear Thou in Heaven Thy Dwelling Place",
        "Hear Thou in Heaven Thy Dwelling Place is prayer language. It means Solomon is asking God to listen from heaven and respond with mercy.\n\nThe temple is important, but Solomon knows God is not trapped inside a building.\n\n\n\n🙏 God hears\n\n🏛️ Temple worship\n\n💛 Mercy needed\n\n\n\nThe phrase helps the reader understand that the temple is a place of prayer because the LORD is a God who hears."
      ],
      [
        "🔑 Do According to All That the Stranger Calleth to Thee for",
        "Do According to All That the Stranger Calleth to Thee for points beyond Israel. A stranger is someone from outside the covenant nation who comes seeking the LORD.\n\nSolomon's prayer looks outward so other nations can know God's name and fear Him.\n\n\n\n🏙️ Nations included\n\n🙏 Prayer welcomed\n\n📜 God's name known\n\n\n\nThe phrase helps the reader see that God's temple was meant to display His glory beyond one nation."
      ],
      [
        "🗡️ If Thy People Go Out to Battle Against Their Enemy",
        "If Thy People Go Out to Battle Against Their Enemy is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "🕍 Whithersoever Thou Shalt Send Them",
        "Whithersoever Thou Shalt Send Them is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 8,
    startVerse: 49,
    endVerse: 54,
    reference: "1 Kings 8:49-54",
    title: "Then Hear Thou Their Prayer",
    icon: "🙏",
    phrases: [
      [
        "👑 Then Hear Thou Their Prayer",
        "Then Hear Thou Their Prayer is prayer language. It means Solomon is asking God to listen from heaven and respond with mercy.\n\nThe temple is important, but Solomon knows God is not trapped inside a building.\n\n\n\n🙏 God hears\n\n🏛️ Temple worship\n\n💛 Mercy needed\n\n\n\nThe phrase helps the reader understand that the temple is a place of prayer because the LORD is a God who hears."
      ],
      [
        "🏠 Their Supplication in Heaven Thy Dwelling Place",
        "Their Supplication in Heaven Thy Dwelling Place is prayer language. It means Solomon is asking God to listen from heaven and respond with mercy.\n\nThe temple is important, but Solomon knows God is not trapped inside a building.\n\n\n\n🙏 God hears\n\n🏛️ Temple worship\n\n💛 Mercy needed\n\n\n\nThe phrase helps the reader understand that the temple is a place of prayer because the LORD is a God who hears."
      ],
      [
        "🕍 Forgive Thy People That Have Sinned Against Thee",
        "Forgive Thy People That Have Sinned Against Thee is forgiveness language. It names sin honestly and asks God to show mercy to guilty people.\n\nSolomon does not pretend Israel will obey perfectly. He builds repentance and mercy into his prayer.\n\n\n\n⚠️ Sin named\n\n🙏 Mercy requested\n\n📜 Covenant hope\n\n\n\nThe phrase matters because God's people need more than a temple; they need forgiveness from the LORD."
      ],
      [
        "✨ All Their Transgressions Wherein They Have Transgressed Against Thee",
        "All Their Transgressions Wherein They Have Transgressed Against Thee is forgiveness language. It names sin honestly and asks God to show mercy to guilty people.\n\nSolomon does not pretend Israel will obey perfectly. He builds repentance and mercy into his prayer.\n\n\n\n⚠️ Sin named\n\n🙏 Mercy requested\n\n📜 Covenant hope\n\n\n\nThe phrase matters because God's people need more than a temple; they need forgiveness from the LORD."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 8,
    startVerse: 55,
    endVerse: 60,
    reference: "1 Kings 8:55-60",
    title: "Blessed All the Congregation of Israel with a Loud",
    icon: "🔥",
    phrases: [
      [
        "✨ Blessed All the Congregation of Israel with a Loud Voice",
        "Blessed All the Congregation of Israel with a Loud Voice is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 Blessed Be the LORD",
        "Blessed Be the LORD puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "💛 That Hath Given Rest unto His People Israel",
        "That Hath Given Rest unto His People Israel means God has brought His people into a settled place after danger, wandering, and conflict.\n\nRest is more than taking a break. It is peace and stability that come from God's promise being kept.\n\n\n\n🏠 Settled people\n\n🙏 Promise kept\n\n💛 Peace after conflict\n\n\n\nThe phrase helps the reader see temple dedication as a moment of gratitude for God's faithfulness."
      ],
      [
        "📜 The LORD Our God Be with Us",
        "The LORD Our God Be with Us puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 8,
    startVerse: 61,
    endVerse: 66,
    reference: "1 Kings 8:61-66",
    title: "Let Your Heart Therefore Be Perfect with the LORD",
    icon: "🏙️",
    phrases: [
      [
        "🙏 Let Your Heart Therefore Be Perfect with the LORD Our God",
        "Let Your Heart Therefore Be Perfect with the LORD Our God is obedience language. To walk in God's statutes means to live according to His commands.\n\nThe word walk pictures a daily pattern, not a one-time religious moment.\n\n\n\n📜 God's commands\n\n💛 Whole-heart loyalty\n\n🔑 Daily direction\n\n\n\nThe phrase helps the reader see that temple worship was meant to lead to faithful living."
      ],
      [
        "⚠️ To Walk in His Statutes",
        "To Walk in His Statutes is obedience language. To walk in God's statutes means to live according to His commands.\n\nThe word walk pictures a daily pattern, not a one-time religious moment.\n\n\n\n📜 God's commands\n\n💛 Whole-heart loyalty\n\n🔑 Daily direction\n\n\n\nThe phrase helps the reader see that temple worship was meant to lead to faithful living."
      ],
      [
        "🛡️ All Israel with Him",
        "All Israel with Him is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ Offered Sacrifice Before the LORD",
        "Offered Sacrifice Before the LORD is worship language. It points to offerings brought before the LORD as part of Israel's worship.\n\nSacrifices taught Israel that worship involved gratitude, surrender, fellowship, and dealing seriously with sin.\n\n\n\n🕍 Altar worship\n\n🔥 Offering given\n\n🙏 Drawing near to God\n\n\n\nThe phrase keeps the reader focused on worship, not just royal ceremony."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 9,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 9:1-6",
    title: "It Came to Pass",
    icon: "🧠",
    phrases: [
      [
        "📜 It Came to Pass",
        "It Came to Pass is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "🙏 When Solomon Had Finished the Building of the House of the LORD",
        "When Solomon Had Finished the Building of the House of the LORD puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🔥 That the LORD Appeared to Solomon the Second Time",
        "That the LORD Appeared to Solomon the Second Time puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🛡️ As He Had Appeared unto Him at Gibeon",
        "As He Had Appeared unto Him at Gibeon is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 9,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 9:7-12",
    title: "Then Will I Cut Off Israel Out",
    icon: "⚠️",
    phrases: [
      [
        "🕍 Then Will I Cut Off Israel Out of the Land Which I Have Given Them",
        "Then Will I Cut Off Israel Out of the Land Which I Have Given Them is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 Which I Have Hallowed for My Name",
        "Which I Have Hallowed for My Name is name language. In the Bible, God's name represents His character, authority, reputation, and presence.\n\nTo hallow God's name means to treat Him as holy, honored, and set apart from every false god.\n\n\n\n🙏 God's character\n\n🏛️ Holy worship\n\n🔑 His reputation\n\n\n\nThe phrase teaches the reader that worship is about honoring who the LORD truly is."
      ],
      [
        "🏠 At This House",
        "At This House can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "💛 Which Is High",
        "Which Is High is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 9,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 9:13-18",
    title: "What Cities Are These Which Thou Hast Given Me",
    icon: "💛",
    phrases: [
      [
        "🗡️ What Cities Are These Which Thou Hast Given Me",
        "What Cities Are These Which Thou Hast Given Me is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔑 He Called Them the Land of Cabul unto This Day",
        "He Called Them the Land of Cabul unto This Day marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "👑 Hiram Sent to the King Sixscore Talents of Gold",
        "Hiram Sent to the King Sixscore Talents of Gold is wealth and power language. It shows the size, reach, and resources of Solomon's kingdom.\n\nThese details can show blessing, but they also prepare the reader to watch Solomon's heart carefully.\n\n\n\n👑 Royal wealth\n\n🏙️ Kingdom reach\n\n⚠️ Power can tempt\n\n\n\nThe phrase helps the reader notice both the glory and the danger of Solomon's success."
      ],
      [
        "🧠 To the King Sixscore Talents",
        "To the King Sixscore Talents is wealth and power language. It shows the size, reach, and resources of Solomon's kingdom.\n\nThese details can show blessing, but they also prepare the reader to watch Solomon's heart carefully.\n\n\n\n👑 Royal wealth\n\n🏙️ Kingdom reach\n\n⚠️ Power can tempt\n\n\n\nThe phrase helps the reader notice both the glory and the danger of Solomon's success."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 9,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 9:19-24",
    title: "All the Cities of Store That Solomon Had",
    icon: "👑",
    phrases: [
      [
        "📦 All the Cities of Store That Solomon Had",
        "All the Cities of Store That Solomon Had keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "💛 Cities for His Chariots",
        "Cities for His Chariots is wealth and power language. It shows the size, reach, and resources of Solomon's kingdom.\n\nThese details can show blessing, but they also prepare the reader to watch Solomon's heart carefully.\n\n\n\n👑 Royal wealth\n\n🏙️ Kingdom reach\n\n⚠️ Power can tempt\n\n\n\nThe phrase helps the reader notice both the glory and the danger of Solomon's success."
      ],
      [
        "✨ All the People That Were Left of the Amorites",
        "All the People That Were Left of the Amorites is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "⚠️ Which Were Not of the Children of Israel",
        "Which Were Not of the Children of Israel focuses on the people, not only the king. The nation is being pulled by the choices of its leaders.\n\nWhen tribes and people groups are named, the reader should notice how public the consequences have become.\n\n\n\n🏙️ The people\n\n👑 Public leadership\n\n⚠️ Shared consequences\n\n\n\nThe phrase helps the reader see the kingdom story as both personal and national."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 9,
    startVerse: 25,
    endVerse: 28,
    reference: "1 Kings 9:25-28",
    title: "Three Times in a Year Did Solomon Offer Burnt",
    icon: "🗡️",
    phrases: [
      [
        "🏠 Three Times in a Year Did Solomon Offer Burnt Offerings",
        "Three Times in a Year Did Solomon Offer Burnt Offerings is worship language. It points to offerings brought before the LORD as part of Israel's worship.\n\nSacrifices taught Israel that worship involved gratitude, surrender, fellowship, and dealing seriously with sin.\n\n\n\n🕍 Altar worship\n\n🔥 Offering given\n\n🙏 Drawing near to God\n\n\n\nThe phrase keeps the reader focused on worship, not just royal ceremony."
      ],
      [
        "🙏 Peace Offerings Upon the Altar Which He Built unto the LORD",
        "Peace Offerings Upon the Altar Which He Built unto the LORD is worship language. It points to offerings brought before the LORD as part of Israel's worship.\n\nSacrifices taught Israel that worship involved gratitude, surrender, fellowship, and dealing seriously with sin.\n\n\n\n🕍 Altar worship\n\n🔥 Offering given\n\n🙏 Drawing near to God\n\n\n\nThe phrase keeps the reader focused on worship, not just royal ceremony."
      ],
      [
        "👑 King Solomon Made a Navy of Ships in Ezion-geber",
        "King Solomon Made a Navy of Ships in Ezion-geber is wealth and power language. It shows the size, reach, and resources of Solomon's kingdom.\n\nThese details can show blessing, but they also prepare the reader to watch Solomon's heart carefully.\n\n\n\n👑 Royal wealth\n\n🏙️ Kingdom reach\n\n⚠️ Power can tempt\n\n\n\nThe phrase helps the reader notice both the glory and the danger of Solomon's success."
      ],
      [
        "🏙️ Which Is Beside Eloth",
        "Which Is Beside Eloth is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 10,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 10:1-6",
    title: "When the Queen of Sheba Heard of the Fame",
    icon: "⚠️",
    phrases: [
      [
        "🙏 When the Queen of Sheba Heard of the Fame of Solomon Concerning the Name of the LORD",
        "When the Queen of Sheba Heard of the Fame of Solomon Concerning the Name of the LORD puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🕍 She Came to Prove Him with Hard Questions",
        "She Came to Prove Him with Hard Questions is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏙️ She Came to Jerusalem with a Very Great Train",
        "She Came to Jerusalem with a Very Great Train names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ],
      [
        "🛡️ With Camels That Bare Spices",
        "With Camels That Bare Spices is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 10,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 10:7-12",
    title: "Howbeit I Believed Not the Words",
    icon: "💛",
    phrases: [
      [
        "📜 Howbeit I Believed Not the Words",
        "Howbeit I Believed Not the Words is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🕍 Until I Came",
        "Until I Came is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "✨ Happy Are Thy Men",
        "Happy Are Thy Men is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 Happy Are These Thy Servants",
        "Happy Are These Thy Servants is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 10,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 10:13-18",
    title: "King Solomon Gave unto the Queen of Sheba All",
    icon: "👑",
    phrases: [
      [
        "👑 King Solomon Gave unto the Queen of Sheba All Her Desire",
        "King Solomon Gave unto the Queen of Sheba All Her Desire is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🙏 Whatsoever She Asked",
        "Whatsoever She Asked is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔑 Now the Weight of Gold That Came to Solomon in One Year Was Six Hundred Threescore",
        "Now the Weight of Gold That Came to Solomon in One Year Was Six Hundred Threescore is wealth and power language. It shows the size, reach, and resources of Solomon's kingdom.\n\nThese details can show blessing, but they also prepare the reader to watch Solomon's heart carefully.\n\n\n\n👑 Royal wealth\n\n🏙️ Kingdom reach\n\n⚠️ Power can tempt\n\n\n\nThe phrase helps the reader notice both the glory and the danger of Solomon's success."
      ],
      [
        "🗡️ Six Talents of Gold",
        "Six Talents of Gold is wealth and power language. It shows the size, reach, and resources of Solomon's kingdom.\n\nThese details can show blessing, but they also prepare the reader to watch Solomon's heart carefully.\n\n\n\n👑 Royal wealth\n\n🏙️ Kingdom reach\n\n⚠️ Power can tempt\n\n\n\nThe phrase helps the reader notice both the glory and the danger of Solomon's success."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 10,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 10:19-24",
    title: "The Throne Had Six Steps",
    icon: "🗡️",
    phrases: [
      [
        "👑 The Throne Had Six Steps",
        "The Throne Had Six Steps is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "📦 The Top of the Throne Was Round Behind",
        "The Top of the Throne Was Round Behind is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "⚠️ Twelve Lions Stood There on the One Side",
        "Twelve Lions Stood There on the One Side is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 On the Other Upon the Six Steps",
        "On the Other Upon the Six Steps is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 10,
    startVerse: 25,
    endVerse: 29,
    reference: "1 Kings 10:25-29",
    title: "They Brought Every Man His Present",
    icon: "📜",
    phrases: [
      [
        "💛 They Brought Every Man His Present",
        "They Brought Every Man His Present is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🛡️ Vessels of Silver",
        "Vessels of Silver is wealth and power language. It shows the size, reach, and resources of Solomon's kingdom.\n\nThese details can show blessing, but they also prepare the reader to watch Solomon's heart carefully.\n\n\n\n👑 Royal wealth\n\n🏙️ Kingdom reach\n\n⚠️ Power can tempt\n\n\n\nThe phrase helps the reader notice both the glory and the danger of Solomon's success."
      ],
      [
        "📦 Solomon Gathered Together Chariots",
        "Solomon Gathered Together Chariots is wealth and power language. It shows the size, reach, and resources of Solomon's kingdom.\n\nThese details can show blessing, but they also prepare the reader to watch Solomon's heart carefully.\n\n\n\n👑 Royal wealth\n\n🏙️ Kingdom reach\n\n⚠️ Power can tempt\n\n\n\nThe phrase helps the reader notice both the glory and the danger of Solomon's success."
      ],
      [
        "🏠 He Had a Thousand",
        "He Had a Thousand is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 11,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 11:1-6",
    title: "King Solomon Loved Many Strange Women",
    icon: "💛",
    phrases: [
      [
        "👑 But King Solomon Loved Many Strange Women",
        "But King Solomon Loved Many Strange Women is idolatry warning language. It shows Solomon's heart being pulled away from full loyalty to the LORD.\n\nThe tragedy is not only political. It is spiritual: divided love becomes divided worship.\n\n\n\n⚠️ Heart pulled away\n\n💛 Divided loyalty\n\n🙏 False worship\n\n\n\nThe phrase helps the reader understand why Solomon's fall is so serious after such a glorious beginning."
      ],
      [
        "🧠 Together with the Daughter of Pharaoh",
        "Together with the Daughter of Pharaoh is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 Of the Nations Concerning Which the LORD Said unto the Children of Israel",
        "Of the Nations Concerning Which the LORD Said unto the Children of Israel points beyond Israel. A stranger is someone from outside the covenant nation who comes seeking the LORD.\n\nSolomon's prayer looks outward so other nations can know God's name and fear Him.\n\n\n\n🏙️ Nations included\n\n🙏 Prayer welcomed\n\n📜 God's name known\n\n\n\nThe phrase helps the reader see that God's temple was meant to display His glory beyond one nation."
      ],
      [
        "🏙️ Ye Shall Not Go in to Them",
        "Ye Shall Not Go in to Them is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 11,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 11:7-12",
    title: "Then Did Solomon Build an High Place for Chemosh",
    icon: "👑",
    phrases: [
      [
        "🏠 Then Did Solomon Build an High Place for Chemosh",
        "Then Did Solomon Build an High Place for Chemosh is idolatry warning language. It shows Solomon's heart being pulled away from full loyalty to the LORD.\n\nThe tragedy is not only political. It is spiritual: divided love becomes divided worship.\n\n\n\n⚠️ Heart pulled away\n\n💛 Divided loyalty\n\n🙏 False worship\n\n\n\nThe phrase helps the reader understand why Solomon's fall is so serious after such a glorious beginning."
      ],
      [
        "📦 The Abomination of Moab",
        "The Abomination of Moab is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🧠 Likewise Did He for All His Strange Wives",
        "Likewise Did He for All His Strange Wives is wisdom language. It is about seeing clearly, judging rightly, and leading with understanding.\n\nSolomon's wisdom is not meant to make him impressive only; it is meant to help him govern God's people well.\n\n\n\n🧠 Discernment\n\n👑 Leadership\n\n📜 Right judgment\n\n\n\nThe phrase helps the reader see why wisdom matters for a king."
      ],
      [
        "😢 Which Burnt Incense",
        "Which Burnt Incense is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 11,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 11:13-18",
    title: "Howbeit I Will Not Rend Away All the Kingdom",
    icon: "🗡️",
    phrases: [
      [
        "👑 Howbeit I Will Not Rend Away All the Kingdom",
        "Howbeit I Will Not Rend Away All the Kingdom is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🔥 But Will Give One Tribe to Thy Son for David My Servant’s Sake",
        "But Will Give One Tribe to Thy Son for David My Servant’s Sake keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🙏 The LORD Stirred Up an Adversary unto Solomon",
        "The LORD Stirred Up an Adversary unto Solomon puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🧠 Hadad the Edomite",
        "Hadad the Edomite is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 11,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 11:19-24",
    title: "Hadad Found Great Favour in the Sight of Pharaoh",
    icon: "📜",
    phrases: [
      [
        "🏙️ Hadad Found Great Favour in the Sight of Pharaoh",
        "Hadad Found Great Favour in the Sight of Pharaoh is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔥 So That He Gave Him to Wife the Sister of His Own Wife",
        "So That He Gave Him to Wife the Sister of His Own Wife is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 The Sister of Tahpenes Bare Him Genubath His Son",
        "The Sister of Tahpenes Bare Him Genubath His Son is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 Whom Tahpenes Weaned in Pharaoh’s House",
        "Whom Tahpenes Weaned in Pharaoh’s House can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 11,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Kings 11:25-30",
    title: "He Was an Adversary to Israel All the Days",
    icon: "🏠",
    phrases: [
      [
        "✨ He Was an Adversary to Israel All the Days of Solomon",
        "He Was an Adversary to Israel All the Days of Solomon keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "📜 Beside the Mischief That Hadad Did",
        "Beside the Mischief That Hadad Did is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ Jeroboam the Son of Nebat",
        "Jeroboam the Son of Nebat is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🛡️ An Ephrathite of Zereda",
        "An Ephrathite of Zereda is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 11,
    startVerse: 31,
    endVerse: 36,
    reference: "1 Kings 11:31-36",
    title: "He Said to Jeroboam",
    icon: "🙏",
    phrases: [
      [
        "📜 He Said to Jeroboam",
        "He Said to Jeroboam marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "😢 Take Thee Ten Pieces",
        "Take Thee Ten Pieces is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔑 But He Shall Have One Tribe for My Servant David’s Sake",
        "But He Shall Have One Tribe for My Servant David’s Sake keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🏙️ For Jerusalem’s Sake",
        "For Jerusalem’s Sake names a real place where the story turns. Bible places often carry memory, danger, grief, or kingdom meaning.\n\nThe location helps the reader follow where the conflict, mourning, or promise is moving.\n\n\n\n🏙️ A real location\n\n🔑 A story marker\n\n📜 Memory attached to place\n\n\n\nThe phrase keeps the Bible from feeling vague; these events happen in real places to real people."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 11,
    startVerse: 37,
    endVerse: 42,
    reference: "1 Kings 11:37-42",
    title: "I Will Take Thee",
    icon: "🔥",
    phrases: [
      [
        "🙏 I Will Take Thee",
        "I Will Take Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 Thou Shalt Reign According to All That Thy Soul Desireth",
        "Thou Shalt Reign According to All That Thy Soul Desireth is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🔥 It Shall Be",
        "It Shall Be is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📦 If Thou Wilt Hearken unto All That I Command Thee",
        "If Thou Wilt Hearken unto All That I Command Thee points to God's covenant presence and promise among His people.\n\nThe ark and covenant language remind the reader that Israel's hope is deeper than military strength.\n\n\n\n📦 Covenant sign\n\n🙏 Holy presence\n\n📜 Promises remembered\n\n\n\nThe phrase keeps worship and God's presence at the center of the kingdom story."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 11,
    startVerse: 43,
    endVerse: 43,
    reference: "1 Kings 11:43",
    title: "Solomon Slept with His Fathers",
    icon: "🏙️",
    phrases: [
      [
        "🗡️ Solomon Slept with His Fathers",
        "Solomon Slept with His Fathers keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "🏙️ Was Buried in the City of David His Father",
        "Was Buried in the City of David His Father is burial language. It shows honor being given after shame, defeat, or death.\n\nBurial mattered because bodies were not treated as trash. Even in judgment, the story pauses over dignity and grief.\n\n\n\n😢 Death honored\n\n🏠 Community memory\n\n📜 Sorrow handled with care\n\n\n\nThe phrase helps the reader see respect and grief in a chapter full of collapse."
      ],
      [
        "🔑 Slept with His Fathers, and Was Buried in",
        "Slept with His Fathers, and Was Buried in is burial language. It shows honor being given after shame, defeat, or death.\n\nBurial mattered because bodies were not treated as trash. Even in judgment, the story pauses over dignity and grief.\n\n\n\n😢 Death honored\n\n🏠 Community memory\n\n📜 Sorrow handled with care\n\n\n\nThe phrase helps the reader see respect and grief in a chapter full of collapse."
      ],
      [
        "😢 With His Fathers, and Was Buried in the",
        "With His Fathers, and Was Buried in the is burial language. It shows honor being given after shame, defeat, or death.\n\nBurial mattered because bodies were not treated as trash. Even in judgment, the story pauses over dignity and grief.\n\n\n\n😢 Death honored\n\n🏠 Community memory\n\n📜 Sorrow handled with care\n\n\n\nThe phrase helps the reader see respect and grief in a chapter full of collapse."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 12,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 12:1-6",
    title: "Rehoboam Went to Shechem",
    icon: "👑",
    phrases: [
      [
        "🏙️ Rehoboam Went to Shechem",
        "Rehoboam Went to Shechem is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 For All Israel Were Come to Shechem to Make Him King",
        "For All Israel Were Come to Shechem to Make Him King is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "📜 It Came to Pass",
        "It Came to Pass is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "😢 When Jeroboam the Son of Nebat",
        "When Jeroboam the Son of Nebat is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 12,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 12:7-12",
    title: "They Spake unto Him",
    icon: "🗡️",
    phrases: [
      [
        "🔑 They Spake unto Him",
        "They Spake unto Him marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🧠 If Thou Wilt Be a Servant unto This People This Day",
        "If Thou Wilt Be a Servant unto This People This Day is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ But He Forsook the Counsel of the Old Men",
        "But He Forsook the Counsel of the Old Men is about guidance, judgment, and knowing what should be done next.\n\nCounsel can save a kingdom or damage it, depending on whether it is wise, humble, and true.\n\n\n\n🧠 Discernment\n\n📜 Words that guide\n\n👑 Leadership decisions\n\n\n\nThe phrase teaches the reader that advice is never neutral when a kingdom is under pressure."
      ],
      [
        "🕍 Which They Had Given Him",
        "Which They Had Given Him is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🕍 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 12,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 12:13-18",
    title: "The King Answered the People Roughly",
    icon: "📜",
    phrases: [
      [
        "👑 The King Answered the People Roughly",
        "The King Answered the People Roughly is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🙏 Forsook the Old Men’s Counsel That They Gave Him",
        "Forsook the Old Men’s Counsel That They Gave Him is about guidance, judgment, and knowing what should be done next.\n\nCounsel can save a kingdom or damage it, depending on whether it is wise, humble, and true.\n\n\n\n🧠 Discernment\n\n📜 Words that guide\n\n👑 Leadership decisions\n\n\n\nThe phrase teaches the reader that advice is never neutral when a kingdom is under pressure."
      ],
      [
        "🏠 Spake to Them After the Counsel of the Young Men",
        "Spake to Them After the Counsel of the Young Men is about guidance, judgment, and knowing what should be done next.\n\nCounsel can save a kingdom or damage it, depending on whether it is wise, humble, and true.\n\n\n\n🧠 Discernment\n\n📜 Words that guide\n\n👑 Leadership decisions\n\n\n\nThe phrase teaches the reader that advice is never neutral when a kingdom is under pressure."
      ],
      [
        "🏙️ My Father Made Your Yoke Heavy",
        "My Father Made Your Yoke Heavy is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 12,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 12:19-24",
    title: "So Israel Rebelled Against the House of David",
    icon: "🏠",
    phrases: [
      [
        "🏠 So Israel Rebelled Against the House of David unto This Day",
        "So Israel Rebelled Against the House of David unto This Day can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "🔑 Against the House of David",
        "Against the House of David can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "🧠 Of David unto This Day.",
        "Of David unto This Day. keeps attention on a person whose choices affect more than himself.\n\nIn the kingdom story, names are not just labels. They show responsibility, loyalty, weakness, courage, or consequence.\n\n\n\n👑 Leadership\n\n💛 Character revealed\n\n⚠️ Choices spread outward\n\n\n\nThe phrase helps the reader watch how one person's actions can bless or wound many others."
      ],
      [
        "📜 It Came to Pass",
        "It Came to Pass is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 12,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Kings 12:25-30",
    title: "Then Jeroboam Built Shechem in Mount Ephraim",
    icon: "🙏",
    phrases: [
      [
        "🏙️ Then Jeroboam Built Shechem in Mount Ephraim",
        "Then Jeroboam Built Shechem in Mount Ephraim is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏙️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "💛 Went Out from Thence",
        "Went Out from Thence is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n💛 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 Jeroboam Said in His Heart",
        "Jeroboam Said in His Heart points to the inner person. In the Bible, the heart includes desire, loyalty, thought, and choice.\n\nThe story is showing more than outward actions; it is showing what people love, fear, and pursue.\n\n\n\n💛 Desire\n\n🔑 Loyalty\n\n⚠️ Direction of life\n\n\n\nThe phrase reminds the reader that the kingdom is shaped by hidden desires before public actions appear."
      ],
      [
        "👑 Now Shall the Kingdom Return to the House of David",
        "Now Shall the Kingdom Return to the House of David is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 12,
    startVerse: 31,
    endVerse: 33,
    reference: "1 Kings 12:31-33",
    title: "He Made an House of High Places",
    icon: "🔥",
    phrases: [
      [
        "🏠 He Made an House of High Places",
        "He Made an House of High Places is idolatry warning language. It shows Solomon's heart being pulled away from full loyalty to the LORD.\n\nThe tragedy is not only political. It is spiritual: divided love becomes divided worship.\n\n\n\n⚠️ Heart pulled away\n\n💛 Divided loyalty\n\n🙏 False worship\n\n\n\nThe phrase helps the reader understand why Solomon's fall is so serious after such a glorious beginning."
      ],
      [
        "🔑 Made Priests of the Lowest of the People",
        "Made Priests of the Lowest of the People is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "😢 Jeroboam Ordained a Feast in the Eighth Month",
        "Jeroboam Ordained a Feast in the Eighth Month is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔥 On the Fifteenth Day of the Month",
        "On the Fifteenth Day of the Month is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 13,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 13:1-6",
    title: "There Came a Man of God Out of Judah",
    icon: "🗡️",
    phrases: [
      [
        "🙏 There Came a Man of God Out of Judah by the Word of the LORD unto Bethel",
        "There Came a Man of God Out of Judah by the Word of the LORD unto Bethel puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🕍 Jeroboam Stood by the Altar to Burn Incense",
        "Jeroboam Stood by the Altar to Burn Incense is worship language. It points to offerings brought before the LORD as part of Israel's worship.\n\nSacrifices taught Israel that worship involved gratitude, surrender, fellowship, and dealing seriously with sin.\n\n\n\n🕍 Altar worship\n\n🔥 Offering given\n\n🙏 Drawing near to God\n\n\n\nThe phrase keeps the reader focused on worship, not just royal ceremony."
      ],
      [
        "👑 He Cried Against the Altar in the Word of the LORD",
        "He Cried Against the Altar in the Word of the LORD is worship language. It points to offerings brought before the LORD as part of Israel's worship.\n\nSacrifices taught Israel that worship involved gratitude, surrender, fellowship, and dealing seriously with sin.\n\n\n\n🕍 Altar worship\n\n🔥 Offering given\n\n🙏 Drawing near to God\n\n\n\nThe phrase keeps the reader focused on worship, not just royal ceremony."
      ],
      [
        "🏠 Thus Saith the LORD",
        "Thus Saith the LORD puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 13,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 13:7-12",
    title: "The King Said unto the Man of God",
    icon: "📜",
    phrases: [
      [
        "🙏 The King Said unto the Man of God",
        "The King Said unto the Man of God puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🧠 Come Home with Me",
        "Come Home with Me is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 The Man of God Said unto the King",
        "The Man of God Said unto the King puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🏠 If Thou Wilt Give Me Half Thine House",
        "If Thou Wilt Give Me Half Thine House can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 13,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 13:13-18",
    title: "He Said unto His Sons",
    icon: "🏠",
    phrases: [
      [
        "📜 He Said unto His Sons",
        "He Said unto His Sons marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ],
      [
        "🛡️ Saddle Me the Ass",
        "Saddle Me the Ass is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 Went After the Man of God",
        "Went After the Man of God puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "👑 Found Him Sitting Under an Oak",
        "Found Him Sitting Under an Oak is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 13,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 13:19-24",
    title: "So He Went Back with Him",
    icon: "🙏",
    phrases: [
      [
        "📦 So He Went Back with Him",
        "So He Went Back with Him is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📦 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 Did Eat Bread in His House",
        "Did Eat Bread in His House can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ],
      [
        "📜 It Came to Pass",
        "It Came to Pass is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "🙏 As They Sat at the Table",
        "As They Sat at the Table is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 13,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Kings 13:25-30",
    title: "Men Passed by",
    icon: "🔥",
    phrases: [
      [
        "🧠 Men Passed by",
        "Men Passed by is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 Saw the Carcase Cast in the Way",
        "Saw the Carcase Cast in the Way is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 When the Prophet That Brought Him Back from the Way Heard Thereof",
        "When the Prophet That Brought Him Back from the Way Heard Thereof is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 It Is the Man of God",
        "It Is the Man of God puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 13,
    startVerse: 31,
    endVerse: 34,
    reference: "1 Kings 13:31-34",
    title: "It Came to Pass",
    icon: "🏙️",
    phrases: [
      [
        "📜 It Came to Pass",
        "It Came to Pass is timing language. It helps the reader know when the story has shifted to a new moment.\n\nThese small time markers keep the movement clear so the reader can follow cause, consequence, and response.\n\n\n\n🔑 A new moment\n\n📜 Story movement\n\n⚠️ Consequences unfolding\n\n\n\nThe phrase reminds the reader that the Bible often teaches through sequence, not only through speeches."
      ],
      [
        "🏙️ After He Had Buried Him",
        "After He Had Buried Him is burial language. It shows honor being given after shame, defeat, or death.\n\nBurial mattered because bodies were not treated as trash. Even in judgment, the story pauses over dignity and grief.\n\n\n\n😢 Death honored\n\n🏠 Community memory\n\n📜 Sorrow handled with care\n\n\n\nThe phrase helps the reader see respect and grief in a chapter full of collapse."
      ],
      [
        "🙏 For the Saying Which He Cried by the Word of the LORD Against the Altar in Bethel",
        "For the Saying Which He Cried by the Word of the LORD Against the Altar in Bethel is worship language. It points to offerings brought before the LORD as part of Israel's worship.\n\nSacrifices taught Israel that worship involved gratitude, surrender, fellowship, and dealing seriously with sin.\n\n\n\n🕍 Altar worship\n\n🔥 Offering given\n\n🙏 Drawing near to God\n\n\n\nThe phrase keeps the reader focused on worship, not just royal ceremony."
      ],
      [
        "🏠 Against All the Houses of the High Places Which Are in the Cities of Samaria",
        "Against All the Houses of the High Places Which Are in the Cities of Samaria is idolatry warning language. It shows Solomon's heart being pulled away from full loyalty to the LORD.\n\nThe tragedy is not only political. It is spiritual: divided love becomes divided worship.\n\n\n\n⚠️ Heart pulled away\n\n💛 Divided loyalty\n\n🙏 False worship\n\n\n\nThe phrase helps the reader understand why Solomon's fall is so serious after such a glorious beginning."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 14,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 14:1-6",
    title: "At That Time Abijah the Son of Jeroboam Fell",
    icon: "📜",
    phrases: [
      [
        "🔥 At That Time Abijah the Son of Jeroboam Fell Sick",
        "At That Time Abijah the Son of Jeroboam Fell Sick is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ],
      [
        "🙏 Abijah the Son of Jeroboam",
        "Abijah the Son of Jeroboam is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 Of Jeroboam Fell Sick.",
        "Of Jeroboam Fell Sick. is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ],
      [
        "📜 Jeroboam Said to His Wife",
        "Jeroboam Said to His Wife marks spoken words entering the scene. In these chapters, speech often reveals loyalty, fear, wisdom, or rebellion.\n\nThe reader should pay attention because a sentence can expose the direction of a heart or a kingdom.\n\n\n\n📜 Words spoken\n\n💛 Motives revealed\n\n🔑 The scene turns\n\n\n\nThe phrase teaches the reader to listen closely to what people say when pressure rises."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 14,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 14:7-12",
    title: "Thus Saith the LORD God of Israel",
    icon: "🏠",
    phrases: [
      [
        "🙏 Thus Saith the LORD God of Israel",
        "Thus Saith the LORD God of Israel puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "👑 Forasmuch as I Exalted Thee from Among the People",
        "Forasmuch as I Exalted Thee from Among the People is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n👑 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🔑 Rent the Kingdom Away from the House of David",
        "Rent the Kingdom Away from the House of David is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🗡️ Gave It Thee",
        "Gave It Thee is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 14,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 14:13-18",
    title: "All Israel Shall Mourn for Him",
    icon: "🙏",
    phrases: [
      [
        "😢 All Israel Shall Mourn for Him",
        "All Israel Shall Mourn for Him is grief or defeat language. It tells the reader that the story has reached a painful result.\n\nThe Bible does not rush past sorrow. It lets the reader see loss, shame, and consequence clearly.\n\n\n\n😢 Loss\n\n⚠️ Consequence\n\n📜 Sorrow named honestly\n\n\n\nThe phrase matters because God's story does not pretend broken leadership has no cost."
      ],
      [
        "🔥 For He Only of Jeroboam Shall Come to the Grave",
        "For He Only of Jeroboam Shall Come to the Grave is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n😢 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 Moreover the LORD Shall Raise Him Up a King Over Israel",
        "Moreover the LORD Shall Raise Him Up a King Over Israel puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🏠 Who Shall Cut Off the House of Jeroboam That Day",
        "Who Shall Cut Off the House of Jeroboam That Day can mean a home, a family line, or a royal household, depending on the sentence.\n\nThat matters because Samuel often shows whole households rising, falling, grieving, and carrying consequences together.\n\n\n\n🏠 Family line\n\n👑 Royal future\n\n📜 Consequences carried forward\n\n\n\nThe phrase helps the reader see that leadership problems do not stay private."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 14,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 14:19-24",
    title: "The Rest of the Acts of Jeroboam",
    icon: "🔥",
    phrases: [
      [
        "🙏 The Rest of the Acts of Jeroboam",
        "The Rest of the Acts of Jeroboam is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ How He Warred",
        "How He Warred is question language. It shows someone trying to uncover identity, motive, guilt, or meaning.\n\nQuestions in these chapters often expose what is hidden in a person's heart or in the political situation.\n\n\n\n🔑 Identity being tested\n\n📜 Words under pressure\n\n💛 Motives coming out\n\n\n\nThe question helps the reader listen carefully before judging the scene too quickly."
      ],
      [
        "👑 The Days Which Jeroboam Reigned Were Two",
        "The Days Which Jeroboam Reigned Were Two is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🛡️ He Slept with His Fathers",
        "He Slept with His Fathers is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🗡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 14,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Kings 14:25-30",
    title: "It Came to Pass in the Fifth Year",
    icon: "🏙️",
    phrases: [
      [
        "👑 It Came to Pass in the Fifth Year of King Rehoboam",
        "It Came to Pass in the Fifth Year of King Rehoboam is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🏠 That Shishak King of Egypt Came Up Against Jerusalem",
        "That Shishak King of Egypt Came Up Against Jerusalem is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🙏 He Took Away the Treasures of the House of the LORD",
        "He Took Away the Treasures of the House of the LORD puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "🕍 The Treasures of the King’s House",
        "The Treasures of the King’s House is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 14,
    startVerse: 31,
    endVerse: 31,
    reference: "1 Kings 14:31",
    title: "Rehoboam Slept with His Fathers",
    icon: "🛡️",
    phrases: [
      [
        "🔥 Rehoboam Slept with His Fathers",
        "Rehoboam Slept with His Fathers is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🔥 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏙️ Was Buried with His Fathers in the City of David",
        "Was Buried with His Fathers in the City of David is burial language. It shows honor being given after shame, defeat, or death.\n\nBurial mattered because bodies were not treated as trash. Even in judgment, the story pauses over dignity and grief.\n\n\n\n😢 Death honored\n\n🏠 Community memory\n\n📜 Sorrow handled with care\n\n\n\nThe phrase helps the reader see respect and grief in a chapter full of collapse."
      ],
      [
        "🔑 Slept with His Fathers, and Was Buried with",
        "Slept with His Fathers, and Was Buried with is burial language. It shows honor being given after shame, defeat, or death.\n\nBurial mattered because bodies were not treated as trash. Even in judgment, the story pauses over dignity and grief.\n\n\n\n😢 Death honored\n\n🏠 Community memory\n\n📜 Sorrow handled with care\n\n\n\nThe phrase helps the reader see respect and grief in a chapter full of collapse."
      ],
      [
        "🧠 With His Fathers, and Was Buried with His",
        "With His Fathers, and Was Buried with His is burial language. It shows honor being given after shame, defeat, or death.\n\nBurial mattered because bodies were not treated as trash. Even in judgment, the story pauses over dignity and grief.\n\n\n\n😢 Death honored\n\n🏠 Community memory\n\n📜 Sorrow handled with care\n\n\n\nThe phrase helps the reader see respect and grief in a chapter full of collapse."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 15,
    startVerse: 1,
    endVerse: 6,
    reference: "1 Kings 15:1-6",
    title: "Now in the Eighteenth Year of King Jeroboam",
    icon: "🏠",
    phrases: [
      [
        "👑 Now in the Eighteenth Year of King Jeroboam the Son of Nebat Reigned Abijam Over Judah",
        "Now in the Eighteenth Year of King Jeroboam the Son of Nebat Reigned Abijam Over Judah is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "⚠️ Eighteenth Year of King Jeroboam",
        "Eighteenth Year of King Jeroboam is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "😢 King Jeroboam the Son of",
        "King Jeroboam the Son of is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "📜 Three Years Reigned He in Jerusalem",
        "Three Years Reigned He in Jerusalem is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 15,
    startVerse: 7,
    endVerse: 12,
    reference: "1 Kings 15:7-12",
    title: "Now the Rest of the Acts of Abijam",
    icon: "🙏",
    phrases: [
      [
        "🧠 Now the Rest of the Acts of Abijam",
        "Now the Rest of the Acts of Abijam is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🧠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 All That He Did",
        "All That He Did is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "📜 Abijam Slept with His Fathers",
        "Abijam Slept with His Fathers is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏙️ They Buried Him in the City of David",
        "They Buried Him in the City of David is burial language. It shows honor being given after shame, defeat, or death.\n\nBurial mattered because bodies were not treated as trash. Even in judgment, the story pauses over dignity and grief.\n\n\n\n😢 Death honored\n\n🏠 Community memory\n\n📜 Sorrow handled with care\n\n\n\nThe phrase helps the reader see respect and grief in a chapter full of collapse."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 15,
    startVerse: 13,
    endVerse: 18,
    reference: "1 Kings 15:13-18",
    title: "Also Maachah His Mother",
    icon: "🔥",
    phrases: [
      [
        "📜 Also Maachah His Mother",
        "Also Maachah His Mother is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n📜 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏠 Even Her He Removed from Being Queen",
        "Even Her He Removed from Being Queen is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🏠 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "⚠️ But the High Places Were Not Removed",
        "But the High Places Were Not Removed is idolatry warning language. It shows Solomon's heart being pulled away from full loyalty to the LORD.\n\nThe tragedy is not only political. It is spiritual: divided love becomes divided worship.\n\n\n\n⚠️ Heart pulled away\n\n💛 Divided loyalty\n\n🙏 False worship\n\n\n\nThe phrase helps the reader understand why Solomon's fall is so serious after such a glorious beginning."
      ],
      [
        "🙏 Nevertheless Asa’s Heart Was Perfect with the LORD All His Days",
        "Nevertheless Asa’s Heart Was Perfect with the LORD All His Days is obedience language. To walk in God's statutes means to live according to His commands.\n\nThe word walk pictures a daily pattern, not a one-time religious moment.\n\n\n\n📜 God's commands\n\n💛 Whole-heart loyalty\n\n🔑 Daily direction\n\n\n\nThe phrase helps the reader see that temple worship was meant to lead to faithful living."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 15,
    startVerse: 19,
    endVerse: 24,
    reference: "1 Kings 15:19-24",
    title: "There Is a League Between Me",
    icon: "🏙️",
    phrases: [
      [
        "⚠️ There Is a League Between Me",
        "There Is a League Between Me is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🏙️ Between My Father",
        "Between My Father is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n⚠️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "👑 So Ben-hadad Hearkened unto King Asa",
        "So Ben-hadad Hearkened unto King Asa is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🗡️ Sent the Captains of the Hosts Which He Had Against the Cities of Israel",
        "Sent the Captains of the Hosts Which He Had Against the Cities of Israel is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 15,
    startVerse: 25,
    endVerse: 30,
    reference: "1 Kings 15:25-30",
    title: "Nadab the Son of Jeroboam Began to Reign Over",
    icon: "🛡️",
    phrases: [
      [
        "👑 Nadab the Son of Jeroboam Began to Reign Over Israel in the Second Year of Asa King of Judah",
        "Nadab the Son of Jeroboam Began to Reign Over Israel in the Second Year of Asa King of Judah is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "😢 Reigned Over Israel Two Years",
        "Reigned Over Israel Two Years is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ],
      [
        "🙏 He Did Evil in the Sight of the LORD",
        "He Did Evil in the Sight of the LORD puts the LORD at the center of the phrase. The story is not only about armies, kings, or family conflict.\n\nGod's name reminds the reader that human power is always under divine authority.\n\n\n\n🙏 God's authority\n\n📜 God's word\n\n🔑 God's purpose\n\n\n\nThe phrase teaches the reader to look for what God is doing beneath the visible drama."
      ],
      [
        "✨ Walked in the Way of His Father",
        "Walked in the Way of His Father is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n✨ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ]
    ]
  },
  {
    book: "1 Kings",
    chapter: 15,
    startVerse: 31,
    endVerse: 34,
    reference: "1 Kings 15:31-34",
    title: "Now the Rest of the Acts of Nadab",
    icon: "🏛️",
    phrases: [
      [
        "🛡️ Now the Rest of the Acts of Nadab",
        "Now the Rest of the Acts of Nadab is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🛡️ Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🙏 All That He Did",
        "All That He Did is action language. It tells the reader what is being done, moved, received, or decided in the scene.\n\nThe phrase matters because the Bible often teaches the story through concrete actions, not abstract summaries.\n\n\n\n📖 Exact action\n\n🔑 Story movement\n\n🙏 Detail with meaning\n\n\n\nThis helps the reader follow the passage by watching what actually happens, step by step."
      ],
      [
        "🗡️ There Was War Between Asa",
        "There Was War Between Asa is battle language. It shows conflict becoming physical, public, and costly.\n\nWar in these chapters is never just action. It reveals broken leadership, rivalry, fear, and judgment.\n\n\n\n🗡️ Conflict\n\n🛡️ Danger\n\n⚠️ Real consequences\n\n\n\nThe phrase helps the reader feel that sin and power struggles spill into real lives."
      ],
      [
        "👑 Baasha King of Israel All Their Days",
        "Baasha King of Israel All Their Days is kingdom language. It deals with rule, authority, and who is recognized as leader over God's people.\n\nIn these chapters, the throne is never just a chair. It represents responsibility, danger, and covenant pressure.\n\n\n\n👑 Authority\n\n🏠 A royal house\n\n⚠️ Leadership under God\n\n\n\nThe phrase helps the reader ask whether power is being received faithfully or seized selfishly."
      ]
    ]
  }
] as const satisfies readonly RoyalPhraseSectionInput[];

export const FIRST_SAMUEL_31_PERSONAL_SECTIONS = [
  ...sections.filter((section) => section.book === "1 Samuel").map(rewriteDay76RoyalSection),
  ...DAY_61_80_FIRST_SAMUEL_31_SUPPLEMENTAL_SECTIONS.filter((section) => section.chapter !== 31),
];
export const SECOND_SAMUEL_1_24_PERSONAL_SECTIONS = [
  ...sections
    .filter((section) => section.book === "2 Samuel")
    .map(rewriteDay76RoyalSection)
    .map(rewriteDay77SecondSamuelSection)
    .map(rewriteDay79SecondSamuelSection)
    .map(rewriteDay80SecondSamuelSection)
    .map(rewriteDay81SecondSamuelSection)
    .map(rewriteDay82RoyalSection)
    .map(rewriteDay78SecondSamuelSection),
];
export const FIRST_KINGS_1_15_PERSONAL_SECTIONS = sections
  .filter((section) => section.book === "1 Kings")
  .map(rewriteDay82RoyalSection)
  .map(rewriteDay83RoyalSection)
  .map(rewriteDay84RoyalSection)
  .map(rewriteDay85RoyalSection);
