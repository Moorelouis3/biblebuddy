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
    .map(rewriteDay78SecondSamuelSection),
];
export const FIRST_KINGS_1_15_PERSONAL_SECTIONS = sections.filter((section) => section.book === "1 Kings");
