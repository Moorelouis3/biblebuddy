import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 313, written to the Day 1 standard.
 *
 * Acts 13-15: the Antioch church sends out Barnabas and Saul, the sermon and
 * fallout at Pisidian Antioch, the healing and stoning at Lystra, the return
 * trip strengthening every church, and the Jerusalem council settling what
 * the gospel requires of a Gentile. Seven blocks, matching Day 312.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Acts ${chapter}:${startVerse}-${endVerse}`,
  book: "acts",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 313,
  title: "Mission and the Jerusalem Council",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 313. The church that used to just survive persecution starts sending people out on purpose.", 800],
    ["The Holy Spirit picks two names out of a prayer meeting in Antioch, and the whole shape of what comes next changes.", 800],
    ["By the end of today there's also a real fight — not really about doctrine, but about whether a Gentile has to become a Jew first to follow Jesus.", 850],
    ["And two of the closest partners in this whole mission split apart over a young man who quit on them once.", 850],
    ["We are in Acts 13, 14, and 15. A commissioning, a stoning, a council, and a falling out.", 850],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(13, 1, 12, [
      "In the church at Antioch there are prophets and teachers — Barnabas, Simeon called Niger, Lucius of Cyrene, Manaen who grew up with Herod the tetrarch, and Saul. While they minister to the Lord and fast, the Holy Ghost speaks. Separate me Barnabas and Saul for the work I have called them to.",
      "So the church fasts, prays, lays hands on them, and sends them off. Not a promotion these two arranged for themselves. An assignment the Spirit gave out loud.",
      "They sail to Cyprus and work their way to Paphos, where they run into a Jewish sorcerer named Bar-jesus, also called Elymas, attached to the Roman governor Sergius Paulus. Elymas tries to talk the governor out of the faith.",
      "Paul — Luke starts calling him that here — sets his eyes on him. O full of all subtlety and all mischief, thou child of the devil, thou enemy of all righteousness, wilt thou not cease to pervert the right ways of the Lord? The hand of the Lord is upon thee, and thou shalt be blind. Mist and darkness fall on him at once, and the governor, watching it happen, believes.",
    ]),
    g(13, 13, 41, [
      "They sail on to Antioch in Pisidia, and on the sabbath go into the synagogue and sit down. The rulers invite them to speak if they have any word of comfort for the people. Paul stands up.",
      "He walks through Israel's whole story — chosen in Egypt, led out with a mighty arm, given the land by lot, judges for about four hundred fifty years, then a king. Saul first, then David, a man after God's own heart.",
      "And from David's line, Paul says, God has raised up exactly what he promised — a Savior, Jesus. John the Baptist came first preaching repentance, but he said plainly he wasn't the one. There cometh one after me, whose shoes of his feet I am not worthy to loose.",
      "Then Paul gets specific. The rulers in Jerusalem did not recognize him, and in condemning him they fulfilled the very prophets they read every sabbath. They found no cause of death in him and still asked Pilate to kill him. But God raised him from the dead, and he was seen many days by the men now witnessing to you. Through this man is preached unto you the forgiveness of sins, and by him all that believe are justified from all things, from which ye could not be justified by the law of Moses.",
    ]),
    g(13, 42, 52, [
      "As they leave, the Gentiles beg to hear the same words the next sabbath, and many Jews and devout converts follow Paul and Barnabas, who persuade them to keep holding onto the grace of God.",
      "The next week almost the whole city shows up. That's what turns some of the Jewish leaders — not disagreement, envy. Seeing the multitudes, they are filled with envy, and speak against the things spoken by Paul, contradicting and blaspheming.",
      "Paul and Barnabas answer without flinching. It was necessary that the word of God should first have been spoken to you. But seeing ye put it from you, and judge yourselves unworthy of everlasting life, lo, we turn to the Gentiles. So hath the Lord commanded us — I have set thee to be a light of the Gentiles, that thou shouldest be for salvation unto the ends of the earth.",
      "The Gentiles are glad and glorify the word of the Lord, and as many as were ordained to eternal life believe. But the Jewish leaders stir up devout and honourable women and the chief men of the city, and Paul and Barnabas get driven out. They shake off the dust of their feet against the place and go on to Iconium — leaving disciples behind who are filled with joy and the Holy Ghost, not fear.",
    ]),
    g(14, 1, 20, [
      "In Iconium the same pattern repeats. They speak so that a great multitude of both Jews and Greeks believe, and the unbelieving Jews turn the rest of the city against them. They stay a long time anyway, and the Lord backs their preaching, granting signs and wonders to be done by their hands. The city is divided over them.",
      "When word comes of a plot to stone them, they flee to Lystra and keep preaching. There a man crippled from birth, who has never once walked, sits listening to Paul. Paul looks straight at him, perceives he has faith to be healed, and says with a loud voice, stand upright on thy feet. The man leaps up and walks.",
      "The crowd loses its mind, shouting in their own language that the gods have come down in the likeness of men. They call Barnabas Jupiter and Paul Mercurius, because he was the chief speaker. The priest of Jupiter shows up with oxen and garlands, ready to sacrifice to them.",
      "Paul and Barnabas tear their clothes and run into the crowd. Sirs, why do ye these things? We also are men of like passions with you, and preach that you should turn from these vanities to the living God, which made heaven and earth and the sea and all things therein. They can barely stop the sacrifice. Then Jews arrive from Antioch and Iconium, turn the same crowd against Paul, and stone him, dragging him out of the city supposing him dead. He rises up, walks back into the city, and leaves for Derbe the next day.",
    ]),
    g(14, 21, 28, [
      "After preaching in Derbe, they turn around and go straight back through Lystra, Iconium, and Antioch — the very cities that just tried to kill them — confirming the souls of the disciples and telling them plainly, we must through much tribulation enter into the kingdom of God.",
      "They ordain elders in every church, pray, fast, and commend each one to the Lord. No church gets left to figure it out alone.",
      "They preach their way back through Pisidia and Pamphylia, sail from Attalia to Antioch in Syria, where this whole trip started.",
      "Back home, they gather the church and rehearse all that God had done with them — especially how he had opened the door of faith unto the Gentiles. They stay there a long while with the disciples.",
    ]),
    g(15, 1, 21, [
      "Then men come down from Judea teaching, except ye be circumcised after the manner of Moses, ye cannot be saved. Paul and Barnabas push back hard, and the church sends them up to Jerusalem to settle it with the apostles and elders.",
      "There, some believers who were Pharisees insist that Gentiles must be circumcised and keep the law of Moses. After much disputing, Peter stands up and reminds everyone that God already chose him to preach to the Gentiles, and gave them the Holy Ghost exactly as he gave it to the Jews, putting no difference between them, purifying their hearts by faith. Why tempt ye God, Peter asks, to put a yoke upon the neck of the disciples which neither our fathers nor we were able to bear? We believe that through the grace of the Lord Jesus Christ we shall be saved, even as they.",
      "The whole assembly goes quiet and listens to Barnabas and Paul declare what miracles and wonders God had done among the Gentiles through them.",
      "Then James speaks, quotes the prophets — that God said he would build again the fallen tabernacle of David so that the residue of men, including the Gentiles, might seek the Lord — and gives his judgment. My sentence is that we trouble not them which from among the Gentiles are turned to God. Just ask them to abstain from pollutions of idols, from fornication, from things strangled, and from blood.",
    ]),
    g(15, 22, 41, [
      "The apostles and elders and the whole church agree to send Judas called Barsabas and Silas to Antioch with Paul and Barnabas, carrying a letter. It says plainly that the men who troubled them were not sent by the Jerusalem church, and it seemed good to the Holy Ghost, and to us, to lay upon you no greater burden than these necessary things.",
      "When the letter is read in Antioch, the church rejoices for the consolation. Judas and Silas, prophets themselves, stay and exhort the brethren with many words before returning to Jerusalem, though Silas chooses to remain. Paul and Barnabas keep teaching and preaching there with many others.",
      "After a while Paul says to Barnabas, let us go again and visit our brethren in every city where we have preached the word of the Lord. Barnabas wants to bring John Mark again. Paul thinks it not good — Mark had departed from them from Pamphylia, and went not with them to the work.",
      "The contention grows so sharp between them that they depart asunder, one from the other. Barnabas takes Mark and sails for Cyprus. Paul chooses Silas and goes out through Syria and Cilicia, confirming the churches. Even two men this committed to the same mission could not agree on everything — and the mission kept moving anyway, just on two roads instead of one.",
    ]),
  ],
  closing: [
    ["So that is Day 313.", 700],
    ["A commissioning in Antioch, a synagogue sermon that turns into a fight, a healing mistaken for a miracle from Jupiter, and a council that decides what the gospel actually costs a Gentile.", 850],
    ["Paul got stoned in Lystra and walked back into that same city the next day. Whatever this cost him, it wasn't going to stop him.", 850],
    ["Peter's answer at the council is the whole chapter in one line. God put no difference between us and them, purifying their hearts by faith the same way.", 850],
    ["And then two good men, Paul and Barnabas, couldn't agree about one younger man who had let them down before. Scripture doesn't clean that up or pick a side. It just tells you it happened.", 850],
    ["The gospel didn't need them to agree. It just needed them to keep going, even on separate roads.", 850],
    ["Tomorrow, Acts 16 through 18. Paul picks up a new companion, a vision calls him to Macedonia, and the gospel crosses into Europe for the first time.", 850],
    ["For now, carry the line Peter used to settle the argument.", 750],
    ["God put no difference between us and them.", 1200],
  ],
};
