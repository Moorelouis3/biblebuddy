import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 316, written to the Day 1 standard.
 *
 * Acts 22-24: Paul's defense in Hebrew to the mob that just tried to kill
 * him, a night vision promising he will testify in Rome, a plot to murder
 * him uncovered by his own nephew, a night ride to Caesarea under armed
 * guard, and two years sitting bound in front of a governor who wanted a
 * bribe more than the truth. Seven blocks, matching Day 315.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Acts ${chapter}:${startVerse}-${endVerse}`,
  book: "acts",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 316,
  title: "Paul's Defense and Witness",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 316. Paul is standing on the barracks stairs, hand raised, facing the same crowd that just tried to kill him.", 800],
    ["He starts speaking in Hebrew, and tells them his whole story — the persecutor, the light on the Damascus road, the voice.", 800],
    ["It goes fine right up until one word sets them off again.", 800],
    ["Then comes a council meeting that turns into a shouting match, a plot to murder him hatched by more than forty men, and a night ride out of Jerusalem under armed guard.", 850],
    ["We are in Acts 22, 23, and 24. A defense, a conspiracy, and two years stuck in front of a governor angling for a bribe.", 850],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(22, 1, 16, [
      "Paul addresses the crowd in Hebrew, and the moment they hear their own language they go quiet. He tells them plainly who he is — a Jew, trained at the feet of Gamaliel, zealous for God exactly as they are that day.",
      "Then he owns the worst of it without softening it. He persecuted this way to the death, binding and delivering both men and women into prisons, with the high priest and elders as his witnesses.",
      "He walks them through Damascus — the sudden light at noon, falling to the ground, the voice asking why he was persecuting him. He answered a question he did not yet understand: who art thou, Lord?",
      "Ananias comes to a blinded Saul and calls him brother before anything else. The God of our fathers has chosen you to know his will, see the Just One, and be his witness to all men of what you have seen and heard. Then arise, be baptized, wash away your sins, calling on the name of the Lord.",
    ]),
    g(22, 17, 30, [
      "Paul adds a detail he never told them before — back in Jerusalem, praying in the temple, he fell into a trance and the Lord told him to get out fast, because this city would not receive his testimony about him.",
      "Paul argued back. Lord, they know I imprisoned and beat believers in every synagogue, and stood consenting when Stephen's blood was shed. If anyone's testimony should land here, surely mine would.",
      "The answer settles it. Depart, for I will send thee far hence unto the Gentiles. That single word — Gentiles — is what the crowd cannot absorb. They have followed every other word calmly.",
      "They erupt, tear their clothes, throw dust in the air, and shout that he should not be allowed to live. The chief captain orders him examined by scourging, until Paul asks the centurion one quiet question — is it lawful to scourge a Roman citizen, uncondemned? The whole room changes. The captain who bound him is suddenly afraid of what he almost did.",
    ]),
    g(23, 1, 11, [
      "Before the council, Paul opens with a claim that would sound arrogant from anyone else: I have lived in all good conscience before God until this day. Ananias the high priest has him struck on the mouth for saying it.",
      "Paul fires back hard — God shall smite thee, thou whited wall. Sittest thou to judge me by the law, and command me struck against the law? When told he has just insulted God's high priest, he says he did not know it, and quotes the law back at them anyway: thou shalt not speak evil of a ruler of thy people.",
      "Then Paul reads the room and throws one sentence into it — I am a Pharisee, the son of a Pharisee. Of the hope and resurrection of the dead I am called in question. The council splits instantly, Pharisees against Sadducees, because the Sadducees deny any resurrection at all.",
      "The dissension turns violent enough that the chief captain has to pull Paul out by force before the two factions tear him apart. That night the Lord stands by him: be of good cheer, Paul. As thou hast testified of me in Jerusalem, so must thou bear witness also at Rome. The promise comes on the worst night so far, not the best one.",
    ]),
    g(23, 12, 22, [
      "More than forty men bind themselves under a curse — no food, no water, until Paul is dead. They bring the chief priests and elders in on the plan: ask the captain to bring Paul down again for questioning, and we will kill him before he arrives.",
      "Paul's own nephew hears about the ambush and gets into the castle to warn him. Paul does not argue or panic. He simply sends the young man straight to the chief captain to tell him directly.",
      "The captain takes the boy aside privately, hears the whole plot, and tells him to tell no one he came. No speeches, no confrontation with the conspirators. Just quiet action on good information.",
      "That night two hundred soldiers, seventy horsemen, and two hundred spearmen move Paul out of Jerusalem under cover of darkness, all to protect one prisoner from forty men who swore off eating until he was dead.",
    ]),
    g(23, 23, 35, [
      "The chief captain, Claudius Lysias, writes to Felix the governor, and the letter tells the story with one convenient edit. He says he rescued Paul because he had learned he was a Roman — leaving out that he only found that out after he had already ordered him bound for scourging.",
      "What the letter gets right matters more: he found nothing in Paul worthy of death or imprisonment, only questions of Jewish law. A Roman officer, with no reason to protect a Jewish prisoner, states plainly that Paul has done nothing deserving punishment.",
      "The soldiers march him through the night to Antipatris, then the infantry turns back and the horsemen finish the trip to Caesarea, handing Paul and the letter over to Felix.",
      "Felix reads it, asks what province Paul is from, and once he hears Cilicia, simply says he will hear him when his accusers arrive, and keeps him under guard in Herod's judgment hall. Custody, not condemnation — for now.",
    ]),
    g(24, 1, 16, [
      "Five days later Ananias the high priest comes down with elders and a hired orator named Tertullus, who opens with flattery about the great peace Felix has supposedly brought — before laying out the actual charge: Paul is a pest, a mover of sedition among Jews everywhere, a ringleader of the sect of the Nazarenes, and a man who tried to profane the temple.",
      "Paul answers without flattery and without fear. Only twelve days have passed since he came to Jerusalem to worship. No one found him disputing in the temple, stirring up crowds in synagogues, or causing trouble in the city. They cannot prove a single charge they have made.",
      "What he does confess is this: after the way they call heresy, he worships the God of his fathers, believing everything written in the law and the prophets, holding the same hope in the resurrection of the dead that his accusers themselves hold.",
      "And in it all he keeps one aim in view — to have always a conscience void of offense toward God and toward men. Not a legal strategy. A description of how he has actually tried to live.",
    ]),
    g(24, 17, 27, [
      "Paul explains why he was even in the temple — he came after several years away to bring alms to his nation and offerings, and was found there purified, with no crowd and no disturbance. The men who actually raised the accusation in the temple are not even present to make their case.",
      "Felix, who already knows more about the Way than he lets on, defers the case, saying he will decide when Lysias the chief captain comes down. He keeps Paul in custody but gives him real liberty — his friends can come and go and care for him freely.",
      "Later Felix sends for Paul with his wife Drusilla, a Jewess, to hear him on faith in Christ. Paul does not soften the message for a governor. He reasons of righteousness, self-control, and the judgment to come — and Felix trembles and sends him away, promising a more convenient season that never comes.",
      "Felix keeps sending for Paul after that, hoping money will change hands so he will let him go. It never does. Two years pass this way, until Porcius Festus replaces Felix, who leaves Paul in prison as one last favor to the Jews he was trying to please.",
    ]),
  ],
  closing: [
    ["So that is Day 316.", 700],
    ["Paul told his own worst story to a hostile crowd without editing out the part where he was the villain.", 750],
    ["One word — Gentiles — turned a listening crowd back into a mob. The gospel going to outsiders is still the line that some people cannot forgive.", 800],
    ["On the same night the council nearly tore him apart, the Lord stood by Paul and told him he would testify in Rome. The promise came in the middle of the worst hour, not after it.", 850],
    ["Forty men swore off food until Paul was dead, and it took a teenage nephew and two hundred soldiers in the dark to get him out alive.", 800],
    ["Then two governors in a row kept him waiting — one hoping for a bribe, both more interested in keeping the peace with Paul's accusers than in ruling on the truth in front of them.", 850],
    ["Tomorrow, Acts 25 through 27. Paul appeals to Caesar, stands in front of a king, and sails straight into a storm that nearly kills everyone on board.", 850],
    ["For now, carry the line Paul lived by.", 750],
    ["A conscience void of offense toward God, and toward men.", 800],
    ["That was the whole aim.", 1200],
  ],
};
