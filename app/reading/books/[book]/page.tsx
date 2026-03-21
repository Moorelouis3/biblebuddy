"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { LouisAvatar } from "../../../../components/LouisAvatar";
import { getBookCurrentStep, isChapterCompleted, getCompletedChapters, getBookTotalChapters } from "../../../../lib/readingProgress";
import { supabase } from "../../../../lib/supabaseClient";

const CHAPTERS_PER_PAGE = 12;

// Book descriptions (short subtitle under the title)
const BOOK_DESCRIPTIONS: Record<string, string> = {
  // Old Testament
  genesis: "The beginning of everything — creation, humanity, and God's covenant.",
  exodus: "God rescues His people from slavery and gives them the Law.",
  leviticus: "Instructions for worship and holy living in God's presence.",
  numbers: "Israel's forty-year journey through the wilderness.",
  deuteronomy: "Moses retells God's law before Israel enters the Promised Land.",
  joshua: "God fulfills His promise as Israel conquers the Promised Land.",
  judges: "A cycle of sin, suffering, and rescue in early Israel.",
  ruth: "A beautiful story of loyalty, love, and redemption.",
  "1 samuel": "Israel gets its first kings — Saul and then David.",
  "2 samuel": "David's reign as king — his victories and his failures.",
  "1 kings": "Solomon's glory and the tragic split of Israel's kingdom.",
  "2 kings": "The slow decline and fall of both kingdoms.",
  "1 chronicles": "A retelling of Israel's history with a focus on worship.",
  "2 chronicles": "The story of Israel's kings through the lens of faithfulness.",
  ezra: "God's people return from exile and rebuild the temple.",
  nehemiah: "Nehemiah leads the rebuilding of Jerusalem's walls.",
  esther: "A Jewish queen saves her people from a deadly plot.",
  job: "A righteous man faces unimaginable suffering and meets God.",
  psalms: "150 songs and prayers covering every emotion of the human heart.",
  proverbs: "Wisdom for everyday life — work, relationships, and character.",
  ecclesiastes: "A king searches for meaning in everything life has to offer.",
  "song of solomon": "A poetic celebration of love and commitment.",
  isaiah: "The prophet of hope — warning of judgment and promising a Savior.",
  jeremiah: "A heartbroken prophet warns Jerusalem before its fall.",
  lamentations: "Jeremiah's grief over the destruction of Jerusalem.",
  ezekiel: "Dramatic visions of God's glory, judgment, and restoration.",
  daniel: "A young man stays faithful to God in a foreign empire.",
  hosea: "God's unfailing love for an unfaithful people.",
  joel: "A plague points to the coming Day of the Lord.",
  amos: "A shepherd prophet confronts injustice in Israel.",
  obadiah: "A short but sharp word of judgment against Edom.",
  jonah: "A reluctant prophet, a big fish, and a merciful God.",
  micah: "Justice, mercy, and the promise of a ruler from Bethlehem.",
  nahum: "The fall of Nineveh — God's justice against oppression.",
  habakkuk: "A prophet wrestles with God's silence and finds faith.",
  zephaniah: "Warning of judgment, followed by a promise of joy.",
  haggai: "A call to rebuild the temple and trust God's priorities.",
  zechariah: "Visions of hope and a detailed look at the coming Messiah.",
  malachi: "God's final Old Testament call to return to Him.",
  // New Testament
  matthew: "Proving that Jesus was the true Messiah.",
  mark: "The action-packed Gospel showing Jesus as the Servant.",
  luke: "A detailed account of Jesus's life and ministry.",
  john: "The spiritual Gospel emphasizing Jesus as God.",
  acts: "The birth and growth of the early church.",
  romans: "Paul's letter explaining the gospel of grace.",
  "1 corinthians": "Paul corrects a divided and struggling young church.",
  "2 corinthians": "Paul defends his ministry and speaks from his heart.",
  galatians: "Freedom in Christ — we are saved by faith, not the law.",
  ephesians: "The riches of life in Christ and the power of the church.",
  philippians: "A joyful letter written from prison — choose joy.",
  colossians: "Christ is supreme over everything in heaven and earth.",
  "1 thessalonians": "Encouragement for a young church waiting for Jesus's return.",
  "2 thessalonians": "Clearing up confusion about the end times.",
  "1 timothy": "Paul's guidance to a young pastor named Timothy.",
  "2 timothy": "Paul's final letter — a charge to stay faithful to the end.",
  titus: "How to lead a healthy church with godly character.",
  philemon: "A personal plea for forgiveness and reconciliation.",
  hebrews: "Jesus is greater than anything the Old Testament pointed to.",
  james: "Real faith shows up in how you live every day.",
  "1 peter": "Hope and courage for believers going through hard times.",
  "2 peter": "A warning against false teaching and a call to grow.",
  "1 john": "Assurance of salvation and the call to love one another.",
  "2 john": "A short letter about truth, love, and watching for deception.",
  "3 john": "A note about hospitality, leadership, and doing what is right.",
  jude: "Contend for the faith against those who twist the truth.",
  revelation: "The final vision — Jesus wins, evil is defeated, all things made new.",
};

// Book intros (3-4 sentences shown in the Louis speech bubble)
const BOOK_INTROS: Record<string, string> = {
  // Old Testament
  genesis: "Genesis means 'beginning,' and that is exactly what this is — the beginning of everything. Written by Moses, it covers creation, the fall of humanity, Noah's flood, and the lives of the patriarchs Abraham, Isaac, Jacob, and Joseph. It sets up every major theme in the Bible: God's holiness, human failure, and His unstoppable plan to redeem the world. This is where the story starts.",
  exodus: "Exodus was written by Moses and tells one of the most dramatic stories ever — God rescuing millions of enslaved people from the most powerful empire on earth. You will see the ten plagues, the crossing of the Red Sea, and Moses meeting God on Mount Sinai. It is also where God gives the Ten Commandments and instructions for building the Tabernacle. This book shows who God is: powerful, holy, and deeply committed to His people.",
  leviticus: "Leviticus is Moses writing down God's detailed instructions for worship, sacrifice, and holy living given at Mount Sinai. It can feel repetitive, but every rule points to the same truth — God is holy, and approaching Him requires reverence and sacrifice. These laws also foreshadow Jesus, who would become the ultimate sacrifice and our great High Priest. Reading it slowly helps you see just how seriously God takes the problem of sin.",
  numbers: "Numbers picks up where Exodus left off, following Israel through forty years of wilderness wandering. Written by Moses, it opens with a census (which gives the book its name) and then honestly records Israel's repeated failure to trust God. Despite their complaining and rebellion, God keeps providing — manna, water, leadership, and victories in battle. It is a sobering reminder that doubt has real consequences, but God's faithfulness outlasts all of it.",
  deuteronomy: "Deuteronomy means 'second law' and is Moses's farewell speech to a new generation of Israelites standing at the edge of the Promised Land. He retells the history, repeats the Ten Commandments, and urges the people to love God with everything they have. The famous verse 'love the Lord your God with all your heart, soul, and strength' comes from this book. It ends with Moses's death and the passing of leadership to Joshua.",
  joshua: "Joshua was written by Joshua himself and is the story of God keeping His promise. After forty years in the desert, Israel finally crosses into Canaan and begins taking possession of the land God had promised since Abraham. You will see famous battles like Jericho, divine miracles, moments of courage, and moments of failure. The book ends with Joshua's powerful challenge: 'choose today who you will serve.'",
  judges: "Judges covers one of the darkest periods in Israel's history, a cycle that repeats over and over: the people abandon God, fall under oppression, cry out for help, and God raises a leader to rescue them — then they repeat it all again. Written anonymously, it features famous figures like Deborah, Gideon, and Samson. The book honestly shows human weakness and the tragedy of living without God's direction. Its final line sums it up: 'everyone did what was right in their own eyes.'",
  ruth: "Ruth is a short, beautiful story set during the time of the Judges, written by an unknown author. It follows a Moabite woman who chooses to stay with her Israelite mother-in-law Naomi after both of their husbands die. Ruth's loyalty leads her to Boaz, a kind and godly man who becomes her 'kinsman-redeemer.' Beyond the love story, Ruth is in the direct lineage of King David — and Jesus.",
  "1 samuel": "First Samuel was written by the prophet Samuel and covers a major turning point in Israel's history: the shift from a loosely organized tribal society to a monarchy. You will meet Samuel — the last judge and a great prophet — Saul, who becomes Israel's first king and tragically falls from God's favor, and young David, who rises as the man after God's own heart. It is a story about leadership, pride, and the kind of heart God is really looking for.",
  "2 samuel": "Second Samuel continues directly from First Samuel and follows David's reign as king over a united Israel. His military victories, his covenant with God, and his deep faith make this a high point in the Old Testament. But the book does not hide David's failures — his adultery with Bathsheba and the devastating consequences that follow are told with brutal honesty. It shows that even the greatest leaders are broken people in need of God's grace.",
  "1 kings": "First Kings covers about 120 years of Israel's history, opening with Solomon's spectacular reign — the building of the temple, his legendary wisdom, and Israel at the peak of its power. Then it all unravels. Solomon's foreign wives lead him into idolatry, and after his death the kingdom splits into two: Israel in the north and Judah in the south. The rest of the book tracks the kings of both nations and introduces the prophet Elijah, one of the most dramatic figures in the Bible.",
  "2 kings": "Second Kings picks up with Elijah and introduces his successor Elisha, both of whom perform remarkable miracles. But the main story is a slow, heartbreaking decline — king after king leading the people away from God. Eventually, the northern kingdom of Israel is conquered by Assyria, and the southern kingdom of Judah is taken into exile by Babylon. It is a sobering picture of what happens when a nation turns its back on God generation after generation.",
  "1 chronicles": "First Chronicles covers much of the same history as Samuel and Kings, but written after the exile with a different focus. It opens with long genealogies tracing Israel's roots back to Adam, then zeros in on David's reign with a special emphasis on worship and the preparations for building the temple. It was written to help a returned community reconnect with their identity as God's people. The message is: your story matters, and God has not forgotten you.",
  "2 chronicles": "Second Chronicles continues from First Chronicles, covering the reigns of Solomon and the kings of Judah. It gives special attention to the times when kings humbled themselves before God and led the nation back to genuine worship. The book ends with Judah's exile and then a surprising hopeful note — the decree of Cyrus the Great allowing the Jewish people to return home. It is a call to remember that faithfulness to God always leads somewhere good.",
  ezra: "Ezra covers the return of the Jewish people from Babylonian exile, led first by Zerubbabel and then by Ezra the priest. Written by Ezra himself, it documents the rebuilding of the temple and the struggle to restore proper worship in Jerusalem. Ezra was deeply grieved when he found out the returning exiles had intermarried with pagan nations, and his heartbroken prayer of confession is one of the most powerful in the Bible. It is a story of restoration, repentance, and starting over.",
  nehemiah: "Nehemiah was a Jewish official serving the Persian king Artaxerxes when he received devastating news — Jerusalem's walls were still in ruins. He prayed, got permission to return, and led the rebuilding of the city's walls in just 52 days despite intense opposition. Written by Nehemiah himself, this book is full of practical leadership lessons, bold prayer, and the courage to tackle what seems impossible. It ends with the people recommitting themselves to God's covenant.",
  esther: "Esther is set in the Persian empire around 480 BC and follows a young Jewish woman who becomes queen through extraordinary circumstances. When a royal official named Haman plots to destroy all the Jewish people, Esther risks her life to stand in the gap. Written anonymously, it is one of only two books in the Bible that never mentions God by name — yet His hand is visible in every scene. It is a story about courage, timing, and the truth that you may have been placed exactly where you are 'for such a time as this.'",
  job: "Job is one of the oldest books in the Bible and tackles a question every person asks: why do good people suffer? Written anonymously, it follows a blameless man named Job who loses everything — his children, his wealth, and his health — through no fault of his own. His friends give long speeches trying to explain it, but they are wrong. The book builds to a breathtaking encounter where God Himself speaks out of a whirlwind — and the answer He gives is not what anyone expected.",
  psalms: "Psalms is the songbook and prayer book of the Bible, a collection of 150 poems and songs written over several centuries by David, Asaph, Moses, Solomon, and others. It covers every emotion imaginable — joy, grief, fear, anger, wonder, and deep trust. No matter what you are going through, there is a Psalm that speaks to it. Reading one a day is one of the most powerful habits you can build in your faith.",
  proverbs: "Proverbs is a collection of wisdom sayings mostly written by Solomon, the wisest man who ever lived. It is practical and direct, covering topics like hard work, honesty, friendship, money, marriage, parenting, and the use of your words. The book opens by saying that 'the fear of the Lord is the beginning of wisdom' — everything else builds on that foundation. It is the kind of book you can dip into anywhere and walk away with something real.",
  ecclesiastes: "Ecclesiastes is Solomon reflecting on his long search for meaning outside of God. He tried wisdom, pleasure, wealth, work, and entertainment — and concluded that all of it was 'vanity,' like chasing the wind. Written in his later years, it is honest and sometimes bleak, but deeply wise. The conclusion: fear God and keep His commandments, because that is what matters when everything else fades.",
  "song of solomon": "The Song of Solomon, also called Song of Songs, is a poetic book celebrating romantic love and marriage. Written by Solomon, it uses rich, poetic imagery to describe the love between a man and a woman. Many scholars also read it as a picture of the love between God and His people. It is a reminder that love, beauty, and deep human connection are gifts from God — not things to be ashamed of.",
  isaiah: "Isaiah is often called 'the fifth Gospel' because no other Old Testament prophet spoke more clearly about Jesus. Written by Isaiah over 60 years in Jerusalem, the book starts with severe warnings of judgment against Judah and the surrounding nations, then shifts to breathtaking promises of hope and restoration. The famous 'Servant Songs' in chapters 40-55 describe someone who would suffer and die for the sins of others — written 700 years before the cross. It is one of the richest and most rewarding books in the entire Bible.",
  jeremiah: "Jeremiah was called by God as a teenager and spent his entire life delivering a message nobody wanted to hear — that Jerusalem would fall if the people did not repent. Written by Jeremiah himself (with help from his secretary Baruch), this is the longest book in the Bible and one of the most emotionally raw. Jeremiah wept, complained, and doubted, but he never quit. He also contains the stunning promise of a 'new covenant' that God would one day write on people's hearts.",
  lamentations: "Lamentations is a collection of five poems written by Jeremiah as he sat in the ashes of Jerusalem after it was destroyed by Babylon. Every line is grief — over the loss of the city, the temple, the people. Yet right in the middle of the book comes one of the most famous verses of hope in the entire Bible: 'His mercies are new every morning; great is your faithfulness.' It is proof that honest grief and deep faith can coexist.",
  ezekiel: "Ezekiel was a priest taken into Babylonian captivity who received some of the most extraordinary visions in the Bible. The book opens with a jaw-dropping description of God's glory appearing in an impossible chariot of fire. Then come hard words of judgment, but also some of the greatest promises of hope — the famous 'valley of dry bones' vision where God breathes life into dead things. Ezekiel shows that God's glory had not left His people, and that restoration was coming.",
  daniel: "Daniel is set in the courts of Babylon and Persia and follows a young man who refused to compromise his faith even when his life was on the line. The first half of the book tells dramatic stories — the fiery furnace, the writing on the wall, the lions' den. The second half contains apocalyptic visions about world empires and the end of time. Daniel is a book about staying faithful when the world pressures you to blend in.",
  hosea: "Hosea was commanded by God to do something shocking: marry a woman named Gomer who would be unfaithful to him. This painful marriage was a living picture of Israel's unfaithfulness to God. Written by Hosea himself, the book is tender and heartbroken, but also full of hope — God keeps calling His people back with love instead of giving up on them. It shows that God's commitment to His people is not based on their performance but on His own relentless love.",
  joel: "Joel is a short but powerful book written by the prophet Joel in response to a devastating locust plague that had stripped the land bare. He uses this disaster as a picture of the coming 'Day of the Lord' — a day of judgment — but also calls the people to genuine repentance with the promise that God will restore everything. The famous verse about God pouring out His Spirit on all people comes from this book, and Peter quotes it on the day of Pentecost in Acts.",
  amos: "Amos was a shepherd from the southern kingdom who was sent by God to preach in the prosperous but corrupt northern kingdom of Israel. His message was sharp: God hates religious performances from people who exploit the poor and ignore justice. Written by Amos himself, the book thunders against inequality and fake religion, but ends with a beautiful promise of restoration. Amos is a reminder that how you treat people is deeply connected to how you worship God.",
  obadiah: "Obadiah is the shortest book in the Old Testament — just 21 verses — written by the prophet Obadiah. It is a judgment against Edom, the nation descended from Esau (Jacob's brother), for gloating over Jerusalem's destruction and refusing to help. The message is simple: you do not get to stand on the sidelines and cheer when God's people are suffering. Obadiah ends with the assurance that God's kingdom will ultimately prevail.",
  jonah: "Jonah is one of the most famous stories in the Bible — a prophet swallowed by a great fish after running away from God's call to preach to the city of Nineveh. What makes the story remarkable is the ending: Nineveh actually repents, God shows mercy to a foreign nation, and Jonah gets angry about it. Written about Jonah's own experience, this short book is really about the width of God's compassion and the narrowness of human hearts.",
  micah: "Micah was a prophet from a small village who delivered God's message to both the northern and southern kingdoms. He pronounced judgment on corrupt leaders, false prophets, and the wealthy who ground down the poor. But he also carried some of the most beautiful promises in the Bible — including the prophecy that the Messiah would be born in Bethlehem, the town Jesus was born in 700 years later. One of his most quoted lines: 'do justice, love mercy, and walk humbly with your God.'",
  nahum: "Nahum is a book of judgment against Nineveh, the capital of the Assyrian empire that had brutally conquered much of the ancient world including Israel. About a hundred years after Jonah's mission to Nineveh, the city had returned to its violence, and God's patience ran out. Nahum describes the coming destruction in vivid, poetic language and reassures a suffering Israel that God sees the violence done to them. It is a powerful reminder that God's justice always catches up to evil eventually.",
  habakkuk: "Habakkuk is unlike most prophetic books because it is mostly a conversation between the prophet and God. Habakkuk opens by asking God why He is letting injustice go unchecked in Judah. God answers — but His answer only raises more questions. The book builds to one of the most profound statements of faith in the Bible: 'even if everything falls apart, I will rejoice in the Lord.' It is the book for anyone who has ever wrestled honestly with God.",
  zephaniah: "Zephaniah was a prophet during the reign of good King Josiah and was descended from King Hezekiah. His message opens with sweeping warnings of judgment on Judah, Jerusalem, and the surrounding nations. But the book closes with one of the most tender and joyful passages in all of Scripture — God singing over His people with joy. Zephaniah is a book of dramatic contrast: the weight of judgment giving way to the lightness of being loved.",
  haggai: "Haggai was a prophet who spoke to the returning exiles in Jerusalem who had stopped rebuilding the temple. They were busy building their own comfortable homes while God's house lay in ruins. His message was simple and direct: get your priorities right, put God first, and watch what happens. All four of Haggai's messages were delivered in a single four-month period, and the people responded immediately — they got back to work.",
  zechariah: "Zechariah was a priest and prophet who encouraged the same returning exiles as Haggai, but his book goes much deeper. It contains eight dramatic night visions, messages of hope and restoration, and detailed prophecies about the coming Messiah — including riding into Jerusalem on a donkey, being sold for thirty pieces of silver, and being pierced. More prophecies about Jesus are found in Zechariah than in almost any other Old Testament book. It is a book of big vision for a discouraged people.",
  malachi: "Malachi is the last book of the Old Testament and was written to a community that had grown cynical and careless in their faith. The people were offering God second-rate sacrifices, cheating on their spouses, and robbing God by withholding their tithes. God's tone is tender but firm — like a father confronting a child who has stopped caring. The book ends with a promise that one day Elijah would return to prepare the way for the coming of the Lord. Then there are 400 years of silence before Matthew opens.",
  // New Testament
  matthew: "Matthew was written by the tax collector turned disciple Matthew and is the first of the four Gospels. His audience was primarily Jewish, so he constantly shows how Jesus fulfilled hundreds of Old Testament prophecies — making Jesus clearly the Messiah God had promised. It includes the Sermon on the Mount, the parables of the Kingdom, and the Great Commission at the end. This is a great place to start if you want to understand who Jesus is.",
  mark: "Mark is the shortest Gospel and was written by John Mark, a companion of the apostle Peter. It moves fast — the word 'immediately' appears over 40 times — and shows Jesus as a man of powerful action and purpose. There is very little teaching and a lot of miracles, healings, and confrontations. It is believed to be Peter's eyewitness account written down by Mark, making it one of the most vivid and gripping accounts of Jesus's life.",
  luke: "Luke was written by a Greek doctor and historian who interviewed eyewitnesses to write the most detailed and carefully researched account of Jesus's life. Luke pays special attention to women, the poor, and outsiders — people society overlooked — showing how Jesus welcomed everyone. It includes some of the most beloved parables: the Prodigal Son, the Good Samaritan, and the Lost Sheep. Luke also wrote the book of Acts as a second volume, making them a two-part history of Jesus and the early church.",
  john: "John's Gospel is unlike the other three — it has no genealogy, no birth story, no temptation, and no parables. Instead it opens with 'In the beginning was the Word,' making the bold claim from page one that Jesus is God. Written by the apostle John late in his life, it goes deep into the spiritual meaning of everything Jesus said and did. It contains the seven famous 'I am' statements of Jesus and was written so that 'you may believe that Jesus is the Christ, the Son of God.'",
  acts: "Acts was written by Luke as the sequel to his Gospel and follows the earliest Christians from Jerusalem to Rome. It opens with the Holy Spirit arriving on the Day of Pentecost and the church exploding to life, then tracks the spread of the gospel through the ministry of Peter and then Paul. It is full of miracles, persecution, dramatic escapes, shipwrecks, and extraordinary courage. Acts shows that the same Spirit that raised Jesus is alive and working through ordinary people.",
  romans: "Romans is Paul's greatest theological letter, written to the church in Rome before he had ever visited them. In it, he lays out the complete logic of the gospel: all people are sinners, the penalty is death, Jesus paid that penalty, and those who trust in Him are declared righteous by faith. Chapters 1-11 are the most complete explanation of salvation in the Bible, and chapters 12-16 show what a saved life looks like in practice. This letter changed Martin Luther's life and launched the Protestant Reformation.",
  "1 corinthians": "First Corinthians was written by Paul to a young, gifted, but deeply divided church in one of the most morally corrupt cities in the Roman world. The church was splitting over favorite preachers, tolerating sexual immorality, getting drunk at communion, and misusing spiritual gifts. Paul addresses every issue with patience, wisdom, and straight talk. It includes the most famous passage on love ever written — chapter 13 — and a full chapter on the resurrection.",
  "2 corinthians": "Second Corinthians is Paul's most personal letter, written after a painful break and partial reconciliation with the Corinthian church. He defends his ministry against false apostles who called him weak and unimpressive, and he does it by describing his suffering, not his success. It contains the famous line: 'My grace is sufficient for you, for my power is made perfect in weakness.' It is the most emotionally raw of all Paul's letters and a profound look at what real ministry costs.",
  galatians: "Galatians is Paul's most urgent letter, written in a white-hot tone to churches in the region of Galatia who were being told they needed to be circumcised and follow the Jewish law to be truly saved. Paul calls this 'a different gospel' and pushes back with everything he has. The book is a passionate defense of the truth that we are saved by faith in Jesus alone, not by any religious performance. Martin Luther called it 'his Katie' — the letter he loved more than any other.",
  ephesians: "Ephesians was written by Paul while he was in prison in Rome and sent to the church in Ephesus. The first three chapters are an overwhelming description of every spiritual blessing believers have in Christ — chosen, adopted, redeemed, sealed, and raised up together with Him. The last three chapters show how those truths should shape every relationship: husbands and wives, parents and children, employers and employees. It ends with the famous passage about putting on the full armor of God.",
  philippians: "Philippians was written by Paul from prison and is the most joy-filled letter in the New Testament — the word 'joy' or 'rejoice' appears 16 times in just four chapters. Paul writes to a church he dearly loves and encourages them to think like Jesus, pursue unity, and choose contentment no matter their circumstances. It contains some of the most quoted verses in the Bible, including 'I can do all things through Christ who strengthens me.' It is a short book that punches far above its weight.",
  colossians: "Colossians was written by Paul to a church he had never visited, to correct a creeping false teaching that was adding requirements — special diets, festivals, angel worship — on top of Jesus. Paul's answer is to paint the most sweeping picture of who Jesus is anywhere in Scripture: He created everything, holds everything together, and is fully God in human form. Nothing needs to be added to Jesus. He is enough.",
  "1 thessalonians": "First Thessalonians was written by Paul to one of the first churches he planted in Europe, a group of new believers in the Greek city of Thessalonica who were being persecuted. He had to leave suddenly and was worried about them, so this letter is full of encouragement, pastoral care, and thanksgiving. It also addresses confusion about what happens to believers who die before Jesus returns, and it contains the famous passage about Jesus coming back in the clouds.",
  "2 thessalonians": "Second Thessalonians was written shortly after the first letter to address a crisis: some people in the church believed Jesus had already returned and stopped working because they thought the end was here. Paul corrects this confusion, gives them more detail about events that must happen before Jesus comes back, and firmly tells the idle members to get back to work. It is a short, practical letter about staying grounded when things feel uncertain.",
  "1 timothy": "First Timothy was written by Paul to his young protégé Timothy, who was leading the church in Ephesus. It is a practical handbook for church leadership — how to choose elders and deacons, how to deal with false teaching, how to care for widows, and how to conduct public worship. Paul also writes one of the most tender lines in all his letters when he tells Timothy 'do not let anyone look down on you because you are young.' It is a letter from a mentor to someone he deeply believed in.",
  "2 timothy": "Second Timothy was Paul's last letter, written from a Roman prison cell shortly before his execution. It is a farewell from an old soldier to a younger one — urging Timothy to preach the Word boldly, endure hardship, guard the truth, and not be ashamed. Paul ends by saying he has 'fought the good fight, finished the race, kept the faith.' It is one of the most moving letters ever written and a powerful picture of how to finish well.",
  titus: "Titus was written by Paul to another young church leader, this time overseeing the churches on the island of Crete. It is short and practical: appoint godly leaders, teach sound doctrine, and live in a way that adorns the gospel. Paul is very direct about the importance of character — especially for anyone in leadership. It contains the beautiful summary that Jesus 'gave Himself for us to redeem us and purify for Himself a people who are His very own.'",
  philemon: "Philemon is the shortest of Paul's letters — just 25 verses — written to a wealthy Christian man whose slave Onesimus had run away. Onesimus had somehow met Paul in prison and become a Christian. Now Paul is sending him back, but asking Philemon to receive him not as a slave but as a brother. It is a masterclass in gracious, persuasive communication and a picture of how the gospel changes the way we see every person.",
  hebrews: "Hebrews was written to Jewish Christians who were tempted to go back to their old religion to avoid persecution. The author (whose identity is unknown) argues with brilliant logic that Jesus is better than everything the Old Testament system offered: better than angels, better than Moses, better than the priests, better than the sacrifices. He is the High Priest who offered the one perfect sacrifice — Himself. Chapter 11, the famous 'Hall of Faith,' is one of the most inspiring chapters in the Bible.",
  james: "James was written by Jesus's own brother, who went from skeptic to leader of the Jerusalem church after the resurrection. It is one of the most practical books in the New Testament — very little theology, a lot of real talk about how faith works in daily life: controlling your tongue, caring for the poor, praying in faith, and not playing favorites. James's famous line — 'faith without works is dead' — is not in conflict with Paul; it just shows that real faith always moves.",
  "1 peter": "First Peter was written by the apostle Peter to Christians scattered across modern-day Turkey who were facing increasing hostility and social rejection. His message is: you are chosen, you are God's own people, and your suffering is not meaningless. He calls them to live such honorable lives that even their accusers will eventually give glory to God. It is a letter full of encouragement, dignity, and hope for anyone going through a hard season.",
  "2 peter": "Second Peter was written by Peter near the end of his life as a warning against false teachers who had infiltrated the churches. He urges believers to keep growing in godly character, to test everything against Scripture, and to not be thrown off by people who mock the idea of Jesus's return. He ends by pointing readers back to Paul's letters, which he calls Scripture. It is a short book with a serious and urgent tone.",
  "1 john": "First John was written by the apostle John in his old age to reassure believers who were shaken by false teachers claiming Jesus was not really human. John gives his readers clear tests to know they truly belong to God: Do you believe in Jesus? Do you love other believers? Do you obey God's commands? He says the letter was written so that 'you may know that you have eternal life.' It is full of warmth and the word 'love' appears dozens of times.",
  "2 john": "Second John is a short letter of just 13 verses written by the apostle John to 'the chosen lady and her children' — likely a reference to a local church. He commends them for walking in truth, urges them to keep the commandment to love one another, and warns them not to offer hospitality to false teachers who deny that Jesus came in the flesh. It packs a complete message about love and discernment into one brief but important letter.",
  "3 john": "Third John is another short letter from the apostle John, this time to an individual named Gaius who had been kind and generous to traveling Christian missionaries. John commends Gaius, warns against a domineering church leader named Diotrephes, and commends a faithful man named Demetrius. At just 15 verses, it is a window into the real and sometimes messy dynamics of the early church.",
  jude: "Jude was written by Jude, another brother of Jesus, and is a passionate call to defend the Christian faith against people who had snuck into the churches and were twisting grace into a license to sin. He uses dramatic examples from the Old Testament and even non-biblical Jewish writings to warn about the seriousness of apostasy. The letter closes with one of the most beautiful benedictions in the New Testament, celebrating a God who is able to keep you from falling.",
  revelation: "Revelation was written by the apostle John while he was exiled on the island of Patmos, and it is the most symbolic and visionary book in the Bible. Jesus appears to John in blazing glory and gives him messages for seven churches, then pulls back the curtain on what is happening in heaven and what is coming to earth. It is a book about the ultimate victory of Jesus over Satan, sin, death, and evil — and the creation of a brand-new heaven and earth. It is meant to be read as hope, not fear.",
};

export default function BookPage() {
  const params = useParams();
  const bookParam = decodeURIComponent(String(params.book));
  const bookKey = bookParam.toLowerCase();
  
  // Get book display name (capitalize first letter of each word)
  const bookDisplayName = bookParam
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const totalChapters = getBookTotalChapters(bookDisplayName);

  // currentChapter is now loaded from database
  const [currentChapter, setCurrentChapter] = useState(1);
  const [chapterPage, setChapterPage] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // collapsed or open Louis bubble
  const [summaryCollapsed, setSummaryCollapsed] = useState(false);

  // Get user ID and email
  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        setUserEmail(user.email || null);
      } else {
        setLoading(false);
      }
    }
    getUser();
  }, []);

  // load current step and completed chapters from database
  useEffect(() => {
    async function loadProgress() {
      if (!userId) return;

      try {
        setLoading(true);

        const step = await getBookCurrentStep(userId, bookKey, totalChapters);
        setCurrentChapter(step === 0 ? 1 : step);

        const completed = await getCompletedChapters(userId, bookKey);
        setCompletedChapters(completed);
      } catch (err) {
        console.error("Error loading progress:", err);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      loadProgress();
    }
  }, [userId, bookKey, totalChapters]);

  // Calculate finished chapters and progress
  // All chapters from 1 to (currentChapter - 1) are finished, plus any explicitly completed
  const finishedChapters = completedChapters.length;
  const progressPercent = Math.min(100, (finishedChapters / totalChapters) * 100);

  // chapter pagination - only show chapters 1-totalChapters
  const chapterStartIndex = chapterPage * CHAPTERS_PER_PAGE;
  const visibleChapterCount = Math.min(
    CHAPTERS_PER_PAGE,
    totalChapters - chapterStartIndex
  );
  const visibleChapters = Array.from(
    { length: visibleChapterCount },
    (_, i) => chapterStartIndex + i + 1 // Start from chapter 1, not 0
  );
  const hasPrevChapterPage = chapterPage > 0;
  const hasNextChapterPage =
    chapterStartIndex + CHAPTERS_PER_PAGE < totalChapters;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* PAGE HEADER */}
        <h1 className="text-3xl font-bold mb-1">The {bookDisplayName}</h1>
        <p className="text-gray-700 mb-4">
          {BOOK_DESCRIPTIONS[bookKey] || "Walk through this book chapter by chapter."}
        </p>

        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 relative overflow-hidden">
          {/* LOUIS SUMMARY BUBBLE */}
          <div className="mt-1 mb-4 flex items-start gap-3">
            <LouisAvatar mood="bible" size={48} />
            <div className="relative bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-sm text-sm text-gray-800 w-full">
              {/* speech bubble tail */}
              <div className="absolute -left-2 top-5 w-3 h-3 bg-white border-l border-b border-gray-200 rotate-45" />

              {/* content */}
              {summaryCollapsed ? (
                <p className="text-sm">{bookDisplayName} overview</p>
              ) : (
                <div className="space-y-3">
                  <p>
                    {BOOK_INTROS[bookKey] || `Let's walk through ${bookDisplayName} together, one chapter at a time.`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Progress in {bookDisplayName}</span>
              <span>
                {progressPercent.toFixed(0)}% ({finishedChapters} /{" "}
                {totalChapters} chapters finished)
              </span>
            </div>
            <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* CHAPTER GRID */}
          <div className="space-y-4 mt-1">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              {visibleChapters.map((chapter) => {
                // All chapters are always unlocked - no locking behavior
                const done = completedChapters.includes(chapter);

                // Chapter card styling: grey = not completed, green = completed
                let stateClasses = "bg-gray-100 border-gray-300 text-gray-400 cursor-pointer";
                if (done) {
                  stateClasses = "bg-green-100 border-green-300 text-green-800 cursor-pointer";
                }

                // label and description
                const title = `${bookDisplayName} ${chapter}`;
                const description = done
                  ? "Finished."
                  : "Click to read this chapter.";

                const content = (
                  <>
                    <p className="font-semibold">{title}</p>
                    <p className="text-[11px] mt-1">{description}</p>
                  </>
                );

                // All chapters use dynamic route - all are clickable
                const href = `/Bible/${encodeURIComponent(bookKey)}/${chapter}`;

                return (
                  <Link
                    key={chapter}
                    href={href}
                    className={`relative rounded-xl border px-3 py-3 text-left shadow-sm transition text-sm block ${stateClasses}`}
                  >
                    {content}
                  </Link>
                );
              })}
            </div>

            {/* chapter pagination and bottom nav */}
            <div className="mt-2 flex items-center justify-between text-xs sm:text-sm text-blue-600">
              <button
                type="button"
                onClick={() =>
                  hasPrevChapterPage && setChapterPage((p) => p - 1)
                }
                disabled={!hasPrevChapterPage}
                className={`hover:underline ${
                  !hasPrevChapterPage ? "text-gray-300 cursor-default" : ""
                }`}
              >
                Previous chapters
              </button>

              <Link href="/dashboard" className="hover:underline">
                Home
              </Link>

              <button
                type="button"
                onClick={() =>
                  hasNextChapterPage && setChapterPage((p) => p + 1)
                }
                disabled={!hasNextChapterPage}
                className={`hover:underline ${
                  !hasNextChapterPage ? "text-gray-300 cursor-default" : ""
                }`}
              >
                Next chapters
              </button>
            </div>

            <Link
              href="/reading"
              className="text-xs sm:text-sm text-blue-600 hover:underline mt-1 inline-block"
            >
              Change book
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
