import { writeFileSync } from "fs";
import type { PersonalLeviticusPhraseSectionInput } from "../lib/leviticusOneToTenPersonalNotes";
import {
  FIRST_CHRONICLES_1_8_PERSONAL_SECTIONS,
  FIRST_KINGS_16_22_PERSONAL_SECTIONS,
  SECOND_KINGS_1_25_PERSONAL_SECTIONS,
} from "../lib/kingdomDeclinePersonalNotes";

type KingdomDeclinePhraseSectionInput = PersonalLeviticusPhraseSectionInput & {
  book: "1 Kings" | "2 Kings" | "1 Chronicles";
};

const emojiPattern = /^\p{Extended_Pictographic}(?:\uFE0F)?\s+/u;

const sectionIcons = [
  "🌪️",
  "🧥",
  "💧",
  "👑",
  "📜",
  "🛡️",
  "🙏",
  "🔥",
  "🏙️",
  "⚠️",
  "🕍",
  "💛",
  "🗡️",
  "📍",
  "🧠",
  "😢",
  "✨",
  "📦",
  "🚶",
  "👀",
  "🏠",
  "📅",
  "⚖️",
  "🔎",
  "🧹",
  "💬",
  "🕊️",
  "⛰️",
  "🌿",
  "🧱",
  "🪔",
  "📖",
  "🎺",
];

const phraseIcons = [
  "✨",
  "📜",
  "👑",
  "🙏",
  "🛡️",
  "🔥",
  "⚠️",
  "💧",
  "🏙️",
  "🧥",
  "👀",
  "💛",
  "📍",
  "🗡️",
  "🧠",
  "😢",
  "🔑",
  "🏠",
  "📅",
  "⚖️",
];

function stripIcon(value: string) {
  return value.replace(emojiPattern, "").replace(/\s+\d+$/g, "").trim();
}

function titleCase(value: string) {
  const small = new Set(["a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into", "of", "on", "or", "the", "to", "unto", "with"]);
  return value
    .replace(/[.,;:!?]+$/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (word === "LORD") return "LORD";
      if (index > 0 && small.has(lower)) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

function phraseKey(value: string) {
  return stripIcon(value).toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function isWeakPhrase(title: string) {
  const clean = stripIcon(title);
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length < 3) return true;
  if (/^(of|to|and|or|but|that|which|who|for|with)\b/i.test(clean)) return true;
  if (/\b(and|of|to|with|that|which|who|for|the|between)$/i.test(clean)) return true;
  if (/\bking of$/i.test(clean)) return true;
  if (/^(son|daughter|mother|father) of [A-Z][a-z]+$/i.test(clean)) return true;
  return false;
}

function phraseIcon(title: string, usedIcons: Set<string>, index: number) {
  const t = title.toLowerCase();
  const preferred =
    t.includes("lord") || t.includes("god")
      ? "🙏"
      : t.includes("king") || t.includes("reign") || t.includes("throne")
        ? "👑"
        : t.includes("prophet") || t.includes("word") || t.includes("letter")
          ? "📜"
          : t.includes("fire") || t.includes("heaven") || t.includes("burn")
            ? "🔥"
            : t.includes("water") || t.includes("jordan") || t.includes("river")
              ? "💧"
              : t.includes("sin") || t.includes("evil") || t.includes("idol") || t.includes("baal")
                ? "⚠️"
                : t.includes("war") || t.includes("sword") || t.includes("smote") || t.includes("host")
                  ? "🗡️"
                  : t.includes("heart") || t.includes("trusted") || t.includes("cleave")
                    ? "💛"
                    : t.includes("house") || t.includes("city") || t.includes("samaria") || t.includes("jerusalem")
                      ? "🏙️"
                      : phraseIcons[index % phraseIcons.length];

  if (!usedIcons.has(preferred)) return preferred;
  return phraseIcons.find((candidate) => !usedIcons.has(candidate)) || preferred;
}

function explain(title: string) {
  const t = title.toLowerCase();

  if (t.includes("besieged")) {
    return [
      `${title} means the city was surrounded by enemy forces.`,
      "A siege trapped people inside the city. Food, water, safety, and hope would slowly run out.",
      "",
      "🏙️ A city surrounded",
      "⚠️ Pressure closing in",
      "😢 Judgment becoming visible",
      "",
      "The phrase helps the reader understand the fear and suffering behind the fall of Jerusalem.",
    ].join("\n\n");
  }

  if (t.includes("walked in all the way of david")) {
    return [
      `${title} means Josiah followed David's faithful pattern.`,
      "The phrase is not talking about a road. It is describing a way of life shaped by loyalty to the LORD.",
      "",
      "🚶 A faithful path",
      "👑 David's example",
      "🙏 Obedience from the heart",
      "",
      "The phrase helps the reader see Josiah as a king who turned toward the LORD instead of copying wicked kings.",
    ].join("\n\n");
  }

  if (t.includes("no reckoning") || t.includes("dealt faithfully") || t.includes("money")) {
    return [
      `${title} is stewardship language.`,
      "The money for the temple repair was handled by people who could be trusted.",
      "",
      "💰 Money handled rightly",
      "🛠️ Temple repair",
      "✅ Faithful workers",
      "",
      "The phrase helps the reader see that worship also includes honest work and trustworthy handling of resources.",
    ].join("\n\n");
  }

  if (t.includes("hilkiah") || t.includes("priest")) {
    return [
      `${title} brings priestly leadership into view.`,
      "The priest served around the temple and helped guide the people back toward God's word and worship.",
      "",
      "🕍 Temple service",
      "📜 God's word recovered",
      "🙏 Worship being restored",
      "",
      "The phrase helps the reader understand why the discovery in the temple matters so much.",
    ].join("\n\n");
  }

  if (t.includes("all the men of judah") || t.includes("inhabitants of jerusalem") || t.includes("for the people")) {
    return [
      `${title} shows the covenant moment becoming public.`,
      "Josiah's reform is not kept private. Leaders, people, and Jerusalem are being brought under the hearing of God's word.",
      "",
      "👥 The people gathered",
      "📜 God's word read",
      "🙏 Covenant renewed",
      "",
      "The phrase helps the reader see that repentance in this chapter is meant to shape the whole community.",
    ].join("\n\n");
  }

  if (t.includes("brake in pieces") || t.includes("images") || t.includes("bones upon") || t.includes("groves")) {
    return [
      `${title} describes false worship being torn down.`,
      "Josiah is not only speaking against idols. He is removing the objects and places that led people away from the LORD.",
      "",
      "⚠️ Idols destroyed",
      "🧹 Worship cleaned out",
      "🙏 Loyalty to the LORD",
      "",
      "The phrase helps the reader see repentance as action, not only emotion.",
    ].join("\n\n");
  }

  if (t.includes("anger was kindled")) {
    return [
      `${title} describes the LORD's anger burning against sin.`,
      "God's anger is not random temper. It is His holy response to covenant rebellion and false worship.",
      "",
      "⚠️ Sin judged",
      "🔥 Holy anger",
      "📜 Covenant warnings fulfilled",
      "",
      "The phrase helps the reader understand why Judah's long rebellion could not be treated lightly.",
    ].join("\n\n");
  }

  if (t.includes("fathers had done") || t.includes("jehoiakim had done")) {
    return [
      `${title} points to repeated sin across generations.`,
      "The Bible is showing that the next king is walking in the same wrong pattern instead of breaking from it.",
      "",
      "🏠 Family pattern",
      "⚠️ Sin repeated",
      "👑 Leadership failing again",
      "",
      "The phrase helps the reader see how rebellion can become a pattern when nobody turns back to God.",
    ].join("\n\n");
  }

  if (t.includes("bands of the syrians") || t.includes("bands of")) {
    return [
      `${title} describes enemy groups sent against Judah.`,
      "These bands are part of the pressure falling on the kingdom as judgment closes in.",
      "",
      "🗡️ Enemy raids",
      "⚠️ Judgment pressure",
      "🏙️ Judah weakening",
      "",
      "The phrase helps the reader see that the fall of Judah happens step by step, not all at once.",
    ].join("\n\n");
  }

  if (t.includes("carried away all jerusalem") || t.includes("all the princes") || t.includes("cast them out from his presence")) {
    return [
      `${title} is exile language.`,
      "The people are being removed from the land, the city, and the place where they had worshiped the LORD.",
      "",
      "😢 People taken away",
      "🏙️ Jerusalem emptied",
      "⚠️ Covenant judgment",
      "",
      "The phrase helps the reader feel the tragedy of exile instead of reading it like a simple relocation.",
    ].join("\n\n");
  }

  if (t.includes("vessels of brass") || t.includes("ministered") || t.includes("took they away")) {
    return [
      `${title} describes sacred temple items being taken.`,
      "These were not ordinary objects. They belonged to the worship life of the temple.",
      "",
      "🕍 Temple objects",
      "😢 Worship loss",
      "⚠️ Judgment reaches the holy place",
      "",
      "The phrase helps the reader see how deep Jerusalem's fall has become.",
    ].join("\n\n");
  }

  if (t.includes("captain of the guard")) {
    return [
      `${title} identifies a Babylonian officer carrying out judgment.`,
      "The phrase shows that Jerusalem's fall is now being enforced by foreign power.",
      "",
      "🛡️ Babylon's officer",
      "🏙️ Jerusalem conquered",
      "⚠️ Judgment carried out",
      "",
      "The phrase helps the reader understand who is acting in the final destruction of the city.",
    ].join("\n\n");
  }

  if (t.includes("put out the eyes")) {
    return [
      `${title} describes a cruel act against Zedekiah.`,
      "The king who would not listen to God's warnings now suffers humiliation and loss at the hands of Babylon.",
      "",
      "😢 Humiliation",
      "👑 A fallen king",
      "⚠️ Consequence of rebellion",
      "",
      "The phrase helps the reader feel the seriousness of rejecting the LORD's word.",
    ].join("\n\n");
  }

  if (t.includes("all the people") || t.includes("both small and great")) {
    return [
      `${title} shows that the crisis touches everyone.`,
      "The phrase includes ordinary people and important people together. No level of society is untouched.",
      "",
      "👥 Everyone affected",
      "🏙️ A whole community shaken",
      "⚠️ Judgment reaches widely",
      "",
      "The phrase helps the reader see that national sin brings public consequences.",
    ].join("\n\n");
  }

  if (t.includes("month") || t.includes("year of his reign") || t.includes("came to pass") || /\byear\b/i.test(title)) {
    return [
      `${title} is timing language.`,
      "The Bible gives the date so the reader can follow the history carefully. This is not a vague tragedy; it happens in real time.",
      "",
      "📅 Time counted",
      "📜 History remembered",
      "⚠️ Judgment arriving step by step",
      "",
      "The phrase helps the reader feel that God's warnings and Jerusalem's fall are part of a real historical timeline.",
    ].join("\n\n");
  }

  if (t.includes("slew") || t.includes("slain") || t.includes("put out the eyes")) {
    return [
      `${title} names the cruelty and loss in Jerusalem's fall.`,
      "The phrase is not a small detail. It shows how severe the judgment and humiliation became when Babylon conquered Judah.",
      "",
      "😢 Loss",
      "👑 A fallen royal house",
      "⚠️ Judgment carried out",
      "",
      "The phrase helps the reader feel the human cost of refusing the LORD's warnings.",
    ].join("\n\n");
  }

  if (t.includes("begat") || t.includes("firstborn") || t.includes("sons of") || t.includes("son of") || t.includes(",") || t.includes("shem") || t.includes("japheth")) {
    return [
      `${title} is genealogy language.`,
      "The Bible traces families because God's story moves through real people, real generations, and remembered names.",
      "",
      "📜 Names preserved",
      "🏠 Families connected",
      "🔑 Covenant history remembered",
      "",
      "The phrase helps the reader see that these names are purposeful. They show how God keeps track of people across time.",
    ].join("\n\n");
  }

  if (t.includes("i pray thee")) {
    return [
      `${title} is polite request language.`,
      "In older Bible wording, I pray thee often means please or I ask you.",
      "",
      "🙏 A request",
      "💬 Respectful speech",
      "🔑 A choice being placed before someone",
      "",
      "The phrase helps the reader hear the tone of the conversation instead of reading it like a command.",
    ].join("\n\n");
  }

  if (t.includes("pray thee")) {
    return [
      `${title} is request language.`,
      "In older Bible wording, pray thee often means please or I ask you.",
      "",
      "🙏 A request",
      "💬 Respectful speech",
      "🔑 Someone asking for response",
      "",
      "The phrase helps the reader hear the tone of the words instead of reading them like a harsh command.",
    ].join("\n\n");
  }

  if (t.includes("take up elijah into heaven by a whirlwind")) {
    return [
      `${title} means Elijah's departure will be God's doing.`,
      "Elijah is not simply dying in an ordinary way. The LORD is taking His prophet up in a powerful and unusual moment.",
      "",
      "🙏 God is acting",
      "🔥 Heaven is involved",
      "🌪️ Elijah's ministry is closing",
      "",
      "The phrase prepares the reader for the holy transition from Elijah to Elisha.",
    ].join("\n\n");
  }

  if (t.includes("stood to view afar off")) {
    return [
      `${title} means the men are watching from a distance.`,
      "They are close enough to witness what happens, but they are not standing beside Elijah and Elisha.",
      "",
      "👀 Witnesses watching",
      "📍 Distance from the moment",
      "🙏 A holy transition",
      "",
      "The phrase helps the reader feel that something serious is happening, and others are watching it unfold.",
    ].join("\n\n");
  }

  if (t.includes("mantle")) {
    return [
      `${title} points to Elijah's prophetic calling.`,
      "A mantle was a cloak, but in this story it also becomes connected with Elijah's ministry and authority.",
      "",
      "🧥 Prophet's cloak",
      "🙏 Ministry passed on",
      "💧 Jordan divided",
      "",
      "The phrase helps the reader see that Elisha is stepping into the work Elijah had been given.",
    ].join("\n\n");
  }

  if (t.includes("sons of the prophets")) {
    return [
      `${title} refers to a group connected to prophetic ministry.`,
      "These men were not Elijah's physical sons. They were part of a prophetic community learning, serving, and watching God's word at work.",
      "",
      "📜 Prophetic community",
      "👀 Witnesses",
      "🙏 God's word among the people",
      "",
      "The phrase helps the reader understand that Elijah and Elisha were not isolated figures.",
    ].join("\n\n");
  }

  if (t.includes("seventy sons")) {
    return [
      `${title} shows the size of Ahab's royal house.`,
      "Seventy sons means Ahab's dynasty still looks strong, protected, and full of possible heirs.",
      "",
      "👑 Royal family",
      "🏙️ Samaria's power",
      "⚠️ Judgment approaching",
      "",
      "The phrase matters because Jehu's judgment will reach the whole house of Ahab, not only one ruler.",
    ].join("\n\n");
  }

  if (t.includes("wrote letters") || t.includes("letter cometh")) {
    return [
      `${title} shows authority being sent in written form.`,
      "Jehu is not only fighting with weapons. He is using letters to pressure leaders and force a decision.",
      "",
      "📜 Written command",
      "👑 Political pressure",
      "⚠️ A dangerous choice",
      "",
      "The phrase helps the reader see that the struggle for the kingdom is happening through messages as well as battles.",
    ].join("\n\n");
  }

  if (t.includes("your master's sons are with you") || (t.includes("master") && t.includes("sons are with you"))) {
    return [
      `${title} points to the heirs of Ahab who are still under protection.`,
      "Jehu is reminding the leaders that they have the royal sons, the chariots, the city, and the weapons.",
      "",
      "👑 Possible kings",
      "🛡️ Military strength",
      "⚠️ Loyalty being tested",
      "",
      "The phrase helps the reader understand why Jehu's letter is a challenge, not just information.",
    ].join("\n\n");
  }

  if (t.includes("prospered whithersoever")) {
    return [
      `${title} means the king found success wherever he went.`,
      "The wording points to more than luck. It connects Hezekiah's success with the LORD being with him.",
      "",
      "🙏 God's help",
      "👑 Faithful leadership",
      "📍 Success wherever he went",
      "",
      "The phrase helps the reader see that Hezekiah's strength came from trusting the LORD, not copying the nations.",
    ].join("\n\n");
  }

  if (t.includes("trusted in the lord")) {
    return [
      `${title} means Hezekiah leaned on the LORD with confidence.`,
      "Trust is more than believing God exists. It means depending on Him when pressure, fear, and enemy threats are real.",
      "",
      "🙏 Dependence on God",
      "🛡️ Courage under pressure",
      "👑 A different kind of king",
      "",
      "The phrase helps the reader understand why Hezekiah stands out from many kings before and after him.",
    ].join("\n\n");
  }

  if (t.includes("removed the high places") || t.includes("brake the images") || t.includes("cut down the groves")) {
    return [
      `${title} describes removing false worship.`,
      "These places and objects were connected to worship that pulled Israel away from the LORD.",
      "",
      "⚠️ False worship confronted",
      "🧹 Idols removed",
      "🙏 Loyalty to the LORD",
      "",
      "The phrase helps the reader see that reform is not only about words. It also removes what leads hearts away from God.",
    ].join("\n\n");
  }

  if (t.includes("cleave to the lord")) {
    return [
      `${title} means holding tightly to the LORD.`,
      "It is loyalty language. Hezekiah is not treating God as one option among many.",
      "",
      "🙏 Close loyalty",
      "🛡️ Refusing idols",
      "📜 Holding to God's commands",
      "",
      "The phrase helps the reader see faith as steady attachment to God, not a passing emotion.",
    ].join("\n\n");
  }

  if (t.includes("departed not from following him")) {
    return [
      `${title} means Hezekiah did not turn away from the LORD's path.`,
      "The phrase describes steady obedience, not a perfect life without pressure.",
      "",
      "🚶 Continuing with God",
      "📜 Keeping His commands",
      "🙏 Faithfulness over time",
      "",
      "The phrase helps the reader see that trust in God should keep walking when leadership becomes difficult.",
    ].join("\n\n");
  }

  if (t.includes("new cruse") || t.includes("put salt") || t.includes("salt therein")) {
    return [
      `${title} names the simple objects used in Elisha's sign.`,
      "A cruse was a small container, and salt was an ordinary material. The power is not in the container or the salt itself.",
      "",
      "🧂 Salt",
      "🏺 A small vessel",
      "🙏 God's healing power",
      "",
      "The phrase helps the reader see that God can use ordinary things while He is the One who truly heals.",
    ].join("\n\n");
  }

  if (t.includes("bank of jordan") || t.includes("jordan")) {
    return [
      `${title} places the scene beside the Jordan River.`,
      "The Jordan often marks a place of crossing, transition, and God's power at work in Israel's story.",
      "",
      "💧 River setting",
      "📍 Place of transition",
      "🙏 God at work in the crossing",
      "",
      "The phrase helps the reader connect this moment with the larger Bible pattern of God meeting His people near the Jordan.",
    ].join("\n\n");
  }

  if (t.includes("wrapped it together")) {
    return [
      `${title} describes Elijah preparing the mantle for action.`,
      "He is not using a weapon or a tool of human power. He is using the prophet's cloak connected with his calling.",
      "",
      "🧥 The mantle",
      "💧 The water before them",
      "🙏 God's power shown through His prophet",
      "",
      "The phrase helps the reader see the mantle as more than clothing in this scene.",
    ].join("\n\n");
  }

  if (t.includes("what have i to do with thee")) {
    return [
      `${title} is a strong way of saying, Why are you coming to me?`,
      "Elisha is pushing back because the kings have not been seeking the LORD faithfully.",
      "",
      "💬 A sharp question",
      "⚠️ Spiritual tension",
      "🙏 The prophet speaks for God",
      "",
      "The phrase helps the reader hear that Elisha is not impressed by royal power when the heart is far from God.",
    ].join("\n\n");
  }

  if (t.includes("before whom i stand")) {
    return [
      `${title} means Elisha serves in the presence of the living God.`,
      "He is not mainly standing before kings. His first loyalty is to the LORD.",
      "",
      "🙏 God's presence",
      "📜 Prophetic authority",
      "👑 Kings put in their place",
      "",
      "The phrase helps the reader understand why Elisha can speak boldly to rulers.",
    ].join("\n\n");
  }

  if (t.includes("meat offering")) {
    return [
      `${title} connects the timing of the miracle with worship.`,
      "The meat offering was an offering brought before the LORD. The detail quietly links God's help with the rhythms of worship.",
      "",
      "🕍 Worship timing",
      "🙏 Dependence on God",
      "💧 Help arrives",
      "",
      "The phrase helps the reader see that deliverance is not separated from worship.",
    ].join("\n\n");
  }

  if (t.includes("fenced city") || t.includes("choice city") || t.includes("beat down the cities")) {
    return [
      `${title} describes fortified places being brought low.`,
      "A fenced city was protected by walls. A choice city was valuable and important.",
      "",
      "🏙️ Strong cities",
      "🛡️ Human security",
      "⚔️ Judgment through battle",
      "",
      "The phrase helps the reader see that war reaches what people thought was safe and strong.",
    ].join("\n\n");
  }

  if (t.includes("cast every man his stone") || t.includes("good piece of land")) {
    return [
      `${title} describes the land being ruined during judgment.`,
      "The soldiers are not only fighting people. They are damaging the fields that would feed and sustain life.",
      "",
      "🌿 Good land",
      "🪨 Stones thrown over it",
      "⚠️ Judgment touching daily life",
      "",
      "The phrase helps the reader understand that war in the Bible affects homes, food, land, and future survival.",
    ].join("\n\n");
  }

  if (t.includes("thy servant my husband is dead") || t.includes("child was dead") || t.includes("dead")) {
    return [
      `${title} names grief plainly.`,
      "The Bible does not hide the pain in the story. Death has entered the home, and the need is real.",
      "",
      "😢 Loss",
      "🏠 A hurting household",
      "🙏 Need for God's mercy",
      "",
      "The phrase helps the reader feel why the next act of God matters so deeply.",
    ].join("\n\n");
  }

  if (t.includes("what shall i do for thee") || t.includes("what then is to be done for her")) {
    return [
      `${title} is a question of care.`,
      "Elisha is asking what help is needed instead of assuming the answer too quickly.",
      "",
      "💬 A careful question",
      "🏠 A real need",
      "🙏 Mercy becoming personal",
      "",
      "The phrase helps the reader see that God's care often meets people in the exact place where they are burdened.",
    ].join("\n\n");
  }

  if (t.includes("sell the oil") || t.includes("oil")) {
    return [
      `${title} shows provision becoming practical help.`,
      "The oil is not just a miracle to admire. It becomes the way the widow can pay debt and live.",
      "",
      "🫒 Oil provided",
      "💰 Debt answered",
      "🏠 Life sustained",
      "",
      "The phrase helps the reader see that God's mercy reaches ordinary needs like money, debt, and food.",
    ].join("\n\n");
  }

  if (t.includes("no child") || t.includes("hath no child")) {
    return [
      `${title} names the woman's sorrow and emptiness.`,
      "In the ancient world, having no child could mean deep grief, vulnerability, and fear for the family's future.",
      "",
      "😢 Sorrow named",
      "🏠 Family future",
      "🙏 God sees hidden need",
      "",
      "The phrase helps the reader understand why the promised son is such a tender gift.",
    ].join("\n\n");
  }

  if (t.includes("staff") || t.includes("face of the child")) {
    return [
      `${title} shows an attempted act connected with Elisha's prophetic ministry.`,
      "The staff is connected to the prophet, but the story will make clear that life comes from the LORD, not from an object by itself.",
      "",
      "📜 Prophet's staff",
      "😢 A dead child",
      "🙏 Life belongs to God",
      "",
      "The phrase helps the reader avoid treating holy objects like magic.",
    ].join("\n\n");
  }

  if (t.includes("mount carmel") || t.includes("samaria") || t.includes("shunem") || t.includes("gaza") || t.includes("wilderness of edom")) {
    return [
      `${title} gives the reader the location of the movement.`,
      "Bible places are not random labels. They help us follow where God's prophet, Israel's kings, or enemy powers are moving.",
      "",
      "📍 Real place",
      "🚶 Movement in the story",
      "🧭 The map of Scripture",
      "",
      "The phrase helps the reader remember that these events happen in real places, not in a vague story world.",
    ].join("\n\n");
  }

  if (t.includes("went") || t.includes("came") || t.includes("returned") || t.includes("passed") || t.includes("brought")) {
    return [
      `${title} is movement language.`,
      "The phrase shows a person entering, leaving, returning, or being brought into the next moment of the story.",
      "",
      "🚶 Movement",
      "📍 A changing scene",
      "🔑 The next step",
      "",
      "The phrase helps the reader follow the action instead of losing track of who is where.",
    ].join("\n\n");
  }

  if (t.includes("send") || t.includes("gather") || t.includes("bring me") || t.includes("say now") || t.includes("choose") || t.includes("smite")) {
    return [
      `${title} is command language.`,
      "Someone is being told to act. The phrase moves the story from information into response.",
      "",
      "📜 A command",
      "🚶 Action required",
      "⚠️ A decision point",
      "",
      "The phrase helps the reader notice when the story turns because someone must obey, refuse, or respond.",
    ].join("\n\n");
  }

  if (t.includes("let us go") || t.includes("take it up") || t.includes("go and spy") || t.includes("set it before")) {
    return [
      `${title} asks someone to move from words into action.`,
      "The phrase is not only giving information. It is pushing the story toward a response.",
      "",
      "🚶 Action begins",
      "💬 Words become movement",
      "🔑 The scene changes",
      "",
      "The phrase helps the reader follow the moment where someone must do something next.",
    ].join("\n\n");
  }

  if (t.includes("twenty") || t.includes("years old") || t.includes("began to reign") || t.includes("reigned ")) {
    return [
      `${title} gives the reader the shape of a king's rule.`,
      "The Bible records details like age, length of reign, and place of rule so the reader can follow the history carefully.",
      "",
      "👑 A king begins",
      "📅 Time is counted",
      "⚖️ His rule will be judged by God",
      "",
      "The phrase reminds the reader that leadership in Kings is never just power. It is responsibility before the LORD.",
    ].join("\n\n");
  }

  if (t.includes("son of") || t.includes("daughter of") || t.includes("mother's name")) {
    return [
      `${title} identifies family connection.`,
      "In Kings, family lines matter because the choices of one generation often shape the next generation.",
      "",
      "🏠 Family line",
      "👑 Royal connection",
      "📜 History being traced",
      "",
      "The phrase helps the reader follow who belongs to which royal house and how the story moves through generations.",
    ].join("\n\n");
  }

  if (t.includes("lord") || t.includes("god")) {
    return [
      `${title} brings God's authority into the phrase.`,
      "The wording reminds the reader that the LORD is not a background idea. He is the living God who sees, speaks, judges, rescues, and keeps His word.",
      "",
      "🙏 God's authority",
      "📜 God's word",
      "🔑 God's purpose",
      "",
      "The phrase helps the reader understand the passage by asking what God is doing, not only what people are doing.",
    ].join("\n\n");
  }

  if (t.includes("prophet") || t.includes("word") || t.includes("saith")) {
    return [
      `${title} points to a message that comes with authority.`,
      "A prophet is not giving a private opinion. He is speaking because God has sent His word into the situation.",
      "",
      "📜 God's message",
      "🙏 A messenger sent",
      "⚠️ A warning to hear",
      "",
      "The phrase helps the reader understand that ignoring the prophet means ignoring the LORD who sent him.",
    ].join("\n\n");
  }

  if (t.includes("sin") || t.includes("evil") || t.includes("wicked") || t.includes("idol") || t.includes("baal") || t.includes("high places")) {
    return [
      `${title} names rebellion clearly.`,
      "The Bible is not treating evil as a small mistake or a private weakness. It is showing sin as something serious before God.",
      "",
      "⚠️ Sin named",
      "💛 A heart turned away",
      "🙏 God sees it",
      "",
      "The phrase helps the reader see why judgment comes and why false worship damages the whole nation.",
    ].join("\n\n");
  }

  if (t.includes("king") || t.includes("reign") || t.includes("kingdom") || t.includes("throne")) {
    return [
      `${title} is about leadership under God.`,
      "Kings in the Bible are not measured only by strength, money, or military success. They are measured by whether they honor the LORD.",
      "",
      "👑 Authority",
      "🏠 A royal house",
      "⚖️ Accountability before God",
      "",
      "The phrase helps the reader see that every reign is part of a larger question: will this leader follow God or turn away?",
    ].join("\n\n");
  }

  if (t.includes("war") || t.includes("battle") || t.includes("sword") || t.includes("smote") || t.includes("host")) {
    return [
      `${title} brings conflict into view.`,
      "This is not just action in the story. War shows fear, pride, danger, and the cost of broken leadership.",
      "",
      "⚔️ Conflict",
      "🛡️ Danger",
      "⚠️ Real consequences",
      "",
      "The phrase helps the reader feel that sin and power struggles spill into real lives.",
    ].join("\n\n");
  }

  if (t.includes("house")) {
    return [
      `${title} can mean more than a building.`,
      "In Kings, a house can also mean a family line or royal dynasty carrying responsibility before God.",
      "",
      "🏠 Family line",
      "👑 Royal future",
      "📜 Consequences carried forward",
      "",
      "The phrase helps the reader see that leadership choices can affect an entire household after the leader is gone.",
    ].join("\n\n");
  }

  if (t.includes("fire") || t.includes("heaven")) {
    return [
      `${title} shows God's power breaking into the scene.`,
      "Fire from heaven is not normal human strength. It shows that the LORD is answering, judging, or defending His word.",
      "",
      "🔥 Power from God",
      "🙏 Holy authority",
      "⚠️ Judgment is serious",
      "",
      "The phrase helps the reader see that God's word is backed by the God who rules heaven and earth.",
    ].join("\n\n");
  }

  if (t.includes("said") || t.includes("spake") || t.includes("answered")) {
    return [
      `${title} marks spoken words entering the scene.`,
      "In Kings, words reveal fear, pride, faith, rebellion, or wisdom. What someone says often shows what is happening in the heart.",
      "",
      "📜 Words spoken",
      "💛 Motives revealed",
      "🔑 The scene turns",
      "",
      "The phrase teaches the reader to listen carefully when pressure makes people speak.",
    ].join("\n\n");
  }

  if (t.includes("came to pass") || t.includes("after") || t.includes("year")) {
    return [
      `${title} tells the reader when the next part of the story begins.`,
      "The Bible uses timing phrases to connect events. They help us see that one moment leads into another.",
      "",
      "📅 Time marker",
      "📜 Connected events",
      "🔑 A new part of the story",
      "",
      "The phrase helps the reader follow the order of the history instead of treating the stories as random pieces.",
    ].join("\n\n");
  }

  if (t.includes("heart") || t.includes("humbled") || t.includes("heavy") || t.includes("displeased")) {
    return [
      `${title} points to what is happening inside a person.`,
      "The Bible is showing more than outward action. It is showing desire, sorrow, fear, pride, or repentance.",
      "",
      "💛 Inner life",
      "🔑 Direction of the heart",
      "⚠️ Choices taking shape",
      "",
      "The phrase helps the reader watch the heart before the next action appears.",
    ].join("\n\n");
  }

  if (t.includes("died") || t.includes("death") || t.includes("slain") || t.includes("sick") || t.includes("fell") || t.includes("mourn")) {
    return [
      `${title} is grief or consequence language.`,
      "The passage is naming pain directly. The Bible does not pretend sin, war, and rebellion have no cost.",
      "",
      "😢 Loss",
      "⚠️ Consequence",
      "📜 Sorrow named honestly",
      "",
      "The phrase helps the reader feel the seriousness of what has happened in the story.",
    ].join("\n\n");
  }

  return [
    `${title} carries one specific piece of the passage.`,
    "The words name an action, object, place, relationship, or response that helps the reader follow the text.",
    "",
    "📖 The Bible's wording",
    "🔎 One part of the scene",
    "🧠 Clearer understanding",
    "",
    "The phrase keeps the reader close to the Bible's own wording while the story moves forward.",
  ].join("\n\n");
}

function repairSection(section: KingdomDeclinePhraseSectionInput, sectionIconIndex: number): KingdomDeclinePhraseSectionInput {
  const usedIcons = new Set<string>();
  const usedTitles = new Set<string>();
  const phrases = section.phrases.map((phrase, index) => {
    const rawTitle = stripIcon(phrase[0]);
    const cleanRawTitle = titleCase(rawTitle);
    const sectionTitle = titleCase(section.title);
    const title = isWeakPhrase(cleanRawTitle) || usedTitles.has(phraseKey(cleanRawTitle)) ? sectionTitle : cleanRawTitle;
    const dedupedTitle = usedTitles.has(phraseKey(title)) ? cleanRawTitle : title;
    const icon = phraseIcon(dedupedTitle, usedIcons, index);
    usedIcons.add(icon);
    usedTitles.add(phraseKey(dedupedTitle));
    return [`${icon} ${dedupedTitle}`, explain(dedupedTitle)] as [string, string];
  });

  return {
    ...section,
    icon: sectionIcons[sectionIconIndex % sectionIcons.length],
    phrases,
  };
}

function dayForSecondKingsChapter(chapter: number) {
  if (chapter >= 2 && chapter <= 5) return 88;
  if (chapter >= 6 && chapter <= 9) return 89;
  if (chapter >= 10 && chapter <= 13) return 90;
  if (chapter >= 14 && chapter <= 17) return 91;
  if (chapter >= 18 && chapter <= 21) return 92;
  if (chapter >= 22 && chapter <= 25) return 93;
  return null;
}

function dayForFirstChroniclesChapter(chapter: number) {
  if (chapter >= 1 && chapter <= 4) return 94;
  if (chapter >= 5 && chapter <= 8) return 95;
  return null;
}

const sectionIconIndexes = new Map<number, number>();

const sections = [
  ...FIRST_KINGS_16_22_PERSONAL_SECTIONS,
  ...SECOND_KINGS_1_25_PERSONAL_SECTIONS.map((section) => {
    const day = dayForSecondKingsChapter(section.chapter);
    if (!day) return section;
    const index = sectionIconIndexes.get(day) ?? 0;
    sectionIconIndexes.set(day, index + 1);
    return repairSection(section, index);
  }),
  ...FIRST_CHRONICLES_1_8_PERSONAL_SECTIONS.map((section) => {
    const day = dayForFirstChroniclesChapter(section.chapter);
    if (!day) return section;
    const index = sectionIconIndexes.get(day) ?? 0;
    sectionIconIndexes.set(day, index + 1);
    return repairSection(section, index);
  }),
] as const satisfies readonly KingdomDeclinePhraseSectionInput[];

const file = `import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";

type KingdomDeclinePhraseSectionInput = PersonalLeviticusPhraseSectionInput & { book: "1 Kings" | "2 Kings" | "1 Chronicles" };

const sections = ${JSON.stringify(sections, null, 2).replace(/"([^"]+)":/g, "$1:")} as const satisfies readonly KingdomDeclinePhraseSectionInput[];

export const FIRST_KINGS_16_22_PERSONAL_SECTIONS = sections.filter((section) => section.book === "1 Kings");
export const SECOND_KINGS_1_25_PERSONAL_SECTIONS = sections.filter((section) => section.book === "2 Kings");
export const FIRST_CHRONICLES_1_8_PERSONAL_SECTIONS = sections.filter((section) => section.book === "1 Chronicles");
`;

writeFileSync("lib/kingdomDeclinePersonalNotes.ts", file);
