"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { ACTION_TYPE } from "@/lib/actionTypes";
import { logActionToMasterActions } from "@/lib/actionRecorder";

interface Question {
  id: string;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  verse: string;
  verseText?: string;
  explanation: string;
}

// Helper function to fetch verse text from Bible API
async function fetchVerseText(reference: string): Promise<string> {
  try {
        const primaryRef = reference.split(/[;,]/)[0]?.trim() ?? reference.trim();
    const normalizedRef = encodeURIComponent(primaryRef);
    const response = await fetch(`https://bible-api.com/${normalizedRef}`);
    if (!response.ok) throw new Error("Failed to fetch verse");
    const data = await response.json();
    return data.text || "";
  } catch (error) {
    console.error("Error fetching verse:", error);
    return "";
  }
}

const ALL_QUESTIONS: Question[] = [
  { id: "philemon1", question: "Who wrote the book of Philemon?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Paul" }, { label: "C", text: "John" }, { label: "D", text: "Luke" }], correctAnswer: "B", verse: "Philemon 1", explanation: "Paul identifies himself as the author." },
  { id: "philemon2", question: "To whom is Philemon addressed?", options: [{ label: "A", text: "Timothy" }, { label: "B", text: "Philemon" }, { label: "C", text: "Onesimus" }, { label: "D", text: "Tychicus" }], correctAnswer: "B", verse: "Philemon 1", explanation: "The letter is written directly to Philemon." },
  { id: "philemon3", question: "Paul describes himself as a prisoner of?", options: [{ label: "A", text: "Rome" }, { label: "B", text: "Christ Jesus" }, { label: "C", text: "The gospel" }, { label: "D", text: "Caesar" }], correctAnswer: "B", verse: "Philemon 1", explanation: "Paul frames his imprisonment spiritually." },
  { id: "philemon4", question: "Who is mentioned alongside Paul in the greeting?", options: [{ label: "A", text: "Barnabas" }, { label: "B", text: "Silas" }, { label: "C", text: "Timothy" }, { label: "D", text: "Titus" }], correctAnswer: "C", verse: "Philemon 1", explanation: "Timothy is included as a co-worker." },
  { id: "philemon5", question: "Philemon is described as Paul's?", options: [{ label: "A", text: "Brother" }, { label: "B", text: "Partner" }, { label: "C", text: "Student" }, { label: "D", text: "Servant" }], correctAnswer: "B", verse: "Philemon 1", explanation: "Paul calls Philemon a fellow worker." },
  { id: "philemon6", question: "Who else is greeted in the letter?", options: [{ label: "A", text: "Apphia" }, { label: "B", text: "Lydia" }, { label: "C", text: "Priscilla" }, { label: "D", text: "Phoebe" }], correctAnswer: "A", verse: "Philemon 2", explanation: "Apphia is mentioned in the greeting." },
  { id: "philemon7", question: "Archippus is described as a fellow?", options: [{ label: "A", text: "Teacher" }, { label: "B", text: "Believer" }, { label: "C", text: "Soldier" }, { label: "D", text: "Servant" }], correctAnswer: "C", verse: "Philemon 2", explanation: "Military imagery for spiritual service." },
  { id: "philemon8", question: "Where did the church associated with Philemon meet?", options: [{ label: "A", text: "Temple" }, { label: "B", text: "Synagogue" }, { label: "C", text: "His house" }, { label: "D", text: "Public square" }], correctAnswer: "C", verse: "Philemon 2", explanation: "House churches were common." },
  { id: "philemon9", question: "Paul thanks God for Philemon's?", options: [{ label: "A", text: "Generosity" }, { label: "B", text: "Faith and love" }, { label: "C", text: "Leadership" }, { label: "D", text: "Obedience" }], correctAnswer: "B", verse: "Philemon 5", explanation: "Faith expressed through love." },
  { id: "philemon10", question: "Philemon's love has refreshed the hearts of the?", options: [{ label: "A", text: "Believers" }, { label: "B", text: "Saints" }, { label: "C", text: "Poor" }, { label: "D", text: "Church leaders" }], correctAnswer: "B", verse: "Philemon 7", explanation: "Encouraging the saints." },
  { id: "philemon11", question: "Paul says he could command Philemon to do what is?", options: [{ label: "A", text: "Right" }, { label: "B", text: "Lawful" }, { label: "C", text: "Necessary" }, { label: "D", text: "Faithful" }], correctAnswer: "A", verse: "Philemon 8", explanation: "Paul appeals rather than commands." },
  { id: "philemon12", question: "Instead of commanding, Paul appeals on the basis of?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "Love" }, { label: "C", text: "Truth" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Philemon 9", explanation: "Love-driven appeal." },
  { id: "philemon13", question: "Paul refers to himself as an old man and now also a?", options: [{ label: "A", text: "Teacher" }, { label: "B", text: "Leader" }, { label: "C", text: "Prisoner" }, { label: "D", text: "Servant" }], correctAnswer: "C", verse: "Philemon 9", explanation: "Paul highlights his imprisonment." },
  { id: "philemon14", question: "Who is the main subject of Paul's request?", options: [{ label: "A", text: "Archippus" }, { label: "B", text: "Onesimus" }, { label: "C", text: "Apphia" }, { label: "D", text: "Timothy" }], correctAnswer: "B", verse: "Philemon 10", explanation: "Onesimus is central to the letter." },
  { id: "philemon15", question: "Paul calls Onesimus his?", options: [{ label: "A", text: "Brother" }, { label: "B", text: "Friend" }, { label: "C", text: "Son" }, { label: "D", text: "Partner" }], correctAnswer: "C", verse: "Philemon 10", explanation: "Spiritual fatherhood." },
  { id: "philemon16", question: "Onesimus became Paul's son while Paul was?", options: [{ label: "A", text: "Traveling" }, { label: "B", text: "Teaching" }, { label: "C", text: "Imprisoned" }, { label: "D", text: "Writing letters" }], correctAnswer: "C", verse: "Philemon 10", explanation: "Conversion during imprisonment." },
  { id: "philemon17", question: "Onesimus' name means?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Useful" }, { label: "C", text: "Beloved" }, { label: "D", text: "Servant" }], correctAnswer: "B", verse: "Philemon 11", explanation: "Wordplay in the letter." },
  { id: "philemon18", question: "Paul says Onesimus was formerly?", options: [{ label: "A", text: "Unknown" }, { label: "B", text: "Unfaithful" }, { label: "C", text: "Useless" }, { label: "D", text: "Disobedient" }], correctAnswer: "C", verse: "Philemon 11", explanation: "Before his transformation." },
  { id: "philemon19", question: "Now Onesimus is useful to both Paul and?", options: [{ label: "A", text: "The church" }, { label: "B", text: "Philemon" }, { label: "C", text: "Timothy" }, { label: "D", text: "Archippus" }], correctAnswer: "B", verse: "Philemon 11", explanation: "Restored usefulness." },
  { id: "philemon20", question: "Paul says sending Onesimus back is like sending his very?", options: [{ label: "A", text: "Heart" }, { label: "B", text: "Soul" }, { label: "C", text: "Life" }, { label: "D", text: "Hope" }], correctAnswer: "A", verse: "Philemon 12", explanation: "Deep affection." },
  { id: "philemon21", question: "Paul would have liked to keep Onesimus to help him while he was in chains for the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Gospel" }, { label: "C", text: "Truth" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Philemon 13", explanation: "Service to the gospel." },
  { id: "philemon22", question: "Paul did not want to do anything without Philemon's?", options: [{ label: "A", text: "Permission" }, { label: "B", text: "Knowledge" }, { label: "C", text: "Blessing" }, { label: "D", text: "Approval" }], correctAnswer: "A", verse: "Philemon 14", explanation: "Voluntary obedience." },
  { id: "philemon23", question: "Paul wanted Philemon's kindness to be not forced but?", options: [{ label: "A", text: "Sincere" }, { label: "B", text: "Genuine" }, { label: "C", text: "Voluntary" }, { label: "D", text: "Faithful" }], correctAnswer: "C", verse: "Philemon 14", explanation: "Free choice." },
  { id: "philemon24", question: "Paul suggests Onesimus was separated for a little while so Philemon might have him back?", options: [{ label: "A", text: "Restored" }, { label: "B", text: "Forever" }, { label: "C", text: "Changed" }, { label: "D", text: "Redeemed" }], correctAnswer: "B", verse: "Philemon 15", explanation: "Eternal perspective." },
  { id: "philemon25", question: "Paul urges Philemon to receive Onesimus no longer as a slave but as a?", options: [{ label: "A", text: "Friend" }, { label: "B", text: "Brother" }, { label: "C", text: "Servant" }, { label: "D", text: "Partner" }], correctAnswer: "B", verse: "Philemon 16", explanation: "Spiritual equality." },
  { id: "philemon26", question: "Paul describes Onesimus as a dear brother especially to?", options: [{ label: "A", text: "Paul" }, { label: "B", text: "The church" }, { label: "C", text: "Philemon" }, { label: "D", text: "Timothy" }], correctAnswer: "C", verse: "Philemon 16", explanation: "Personal relationship." },
  { id: "philemon27", question: "Paul asks Philemon to welcome Onesimus as he would welcome?", options: [{ label: "A", text: "Timothy" }, { label: "B", text: "A brother" }, { label: "C", text: "Paul himself" }, { label: "D", text: "A servant" }], correctAnswer: "C", verse: "Philemon 17", explanation: "Radical reconciliation." },
  { id: "philemon28", question: "If Onesimus has wronged Philemon or owes anything, Paul says to?", options: [{ label: "A", text: "Forgive it" }, { label: "B", text: "Charge it to me" }, { label: "C", text: "Forget it" }, { label: "D", text: "Collect it later" }], correctAnswer: "B", verse: "Philemon 18", explanation: "Substitutionary appeal." },
  { id: "philemon29", question: "Paul writes the repayment promise with his own?", options: [{ label: "A", text: "Signature" }, { label: "B", text: "Hand" }, { label: "C", text: "Seal" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "Philemon 19", explanation: "Personal guarantee." },
  { id: "philemon30", question: "Paul reminds Philemon that Philemon owes Paul even his?", options: [{ label: "A", text: "Freedom" }, { label: "B", text: "Faith" }, { label: "C", text: "Life" }, { label: "D", text: "Salvation" }], correctAnswer: "C", verse: "Philemon 19", explanation: "Spiritual debt." },
  { id: "philemon31", question: "Paul asks Philemon to grant him this benefit in the Lord and refresh his?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Mind" }, { label: "C", text: "Heart" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "Philemon 20", explanation: "Language of encouragement." },
  { id: "philemon32", question: "Paul expresses confidence in Philemon's?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Obedience" }, { label: "C", text: "Love" }, { label: "D", text: "Character" }], correctAnswer: "B", verse: "Philemon 21", explanation: "Trust in obedience." },
  { id: "philemon33", question: "Paul believes Philemon will do even more than he?", options: [{ label: "A", text: "Requests" }, { label: "B", text: "Commands" }, { label: "C", text: "Expects" }, { label: "D", text: "Asks" }], correctAnswer: "D", verse: "Philemon 21", explanation: "Generous obedience." },
  { id: "philemon34", question: "Paul asks Philemon to prepare a guest room because he hopes to be?", options: [{ label: "A", text: "Released" }, { label: "B", text: "Healed" }, { label: "C", text: "Visited" }, { label: "D", text: "Sent" }], correctAnswer: "A", verse: "Philemon 22", explanation: "Hope of freedom." },
  { id: "philemon35", question: "Paul expects to be restored to Philemon through the prayers of the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Saints" }, { label: "C", text: "Believers" }, { label: "D", text: "Faithful" }], correctAnswer: "A", verse: "Philemon 22", explanation: "Power of prayer." },
  { id: "philemon36", question: "Who is mentioned as Paul's fellow prisoner?", options: [{ label: "A", text: "Barnabas" }, { label: "B", text: "Epaphras" }, { label: "C", text: "Silas" }, { label: "D", text: "Luke" }], correctAnswer: "B", verse: "Philemon 23", explanation: "Shared imprisonment." },
  { id: "philemon37", question: "Which of these is listed as a fellow worker?", options: [{ label: "A", text: "Mark" }, { label: "B", text: "Titus" }, { label: "C", text: "Onesimus" }, { label: "D", text: "Timothy" }], correctAnswer: "A", verse: "Philemon 24", explanation: "John Mark." },
  { id: "philemon38", question: "Who else is named among Paul's fellow workers?", options: [{ label: "A", text: "Luke" }, { label: "B", text: "Barnabas" }, { label: "C", text: "Apollos" }, { label: "D", text: "Silas" }], correctAnswer: "A", verse: "Philemon 24", explanation: "Luke the physician." },
  { id: "philemon39", question: "Demas is mentioned as a?", options: [{ label: "A", text: "Fellow worker" }, { label: "B", text: "Teacher" }, { label: "C", text: "Leader" }, { label: "D", text: "Messenger" }], correctAnswer: "A", verse: "Philemon 24", explanation: "At this time Demas was faithful." },
  { id: "philemon40", question: "The letter closes with a blessing of?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Grace" }, { label: "C", text: "Love" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Philemon 25", explanation: "Grace-centered ending." },
  { id: "philemon41", question: "The book of Philemon primarily deals with the theme of?", options: [{ label: "A", text: "Forgiveness" }, { label: "B", text: "Leadership" }, { label: "C", text: "Doctrine" }, { label: "D", text: "Suffering" }], correctAnswer: "A", verse: "Philemon 8-18", explanation: "Forgiveness and reconciliation." },
  { id: "philemon42", question: "Philemon shows how the gospel impacts social relationships like?", options: [{ label: "A", text: "Friendship" }, { label: "B", text: "Family" }, { label: "C", text: "Slavery" }, { label: "D", text: "Community" }], correctAnswer: "C", verse: "Philemon 16", explanation: "Gospel transformation." },
  { id: "philemon43", question: "Paul models conflict resolution through?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "Love and appeal" }, { label: "C", text: "Discipline" }, { label: "D", text: "Command" }], correctAnswer: "B", verse: "Philemon 8-9", explanation: "Appeal over command." },
  { id: "philemon44", question: "The letter emphasizes voluntary obedience rather than?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Fear" }, { label: "C", text: "Coercion" }, { label: "D", text: "Rules" }], correctAnswer: "C", verse: "Philemon 14", explanation: "Free choice obedience." },
  { id: "philemon45", question: "Paul's willingness to pay Onesimus' debt reflects?", options: [{ label: "A", text: "Justice" }, { label: "B", text: "Sacrifice" }, { label: "C", text: "Substitution" }, { label: "D", text: "Kindness" }], correctAnswer: "C", verse: "Philemon 18-19", explanation: "Substitutionary principle." },
  { id: "philemon46", question: "The letter demonstrates how faith works through?", options: [{ label: "A", text: "Words" }, { label: "B", text: "Authority" }, { label: "C", text: "Love" }, { label: "D", text: "Law" }], correctAnswer: "C", verse: "Philemon 5-7", explanation: "Faith expressed in love." },
  { id: "philemon47", question: "Philemon is one of the shortest books in the?", options: [{ label: "A", text: "Bible" }, { label: "B", text: "New Testament" }, { label: "C", text: "Epistles" }, { label: "D", text: "Letters" }], correctAnswer: "B", verse: "Philemon 1", explanation: "Single-chapter letter." },
  { id: "philemon48", question: "Despite its length, Philemon addresses deep issues of?", options: [{ label: "A", text: "Doctrine" }, { label: "B", text: "Justice and grace" }, { label: "C", text: "Leadership" }, { label: "D", text: "Tradition" }], correctAnswer: "B", verse: "Philemon 16-18", explanation: "Grace reshapes justice." },
  { id: "philemon49", question: "The transformation of Onesimus shows the power of the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Gospel" }, { label: "C", text: "Church" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Philemon 10-11", explanation: "Gospel change." },
  { id: "philemon50", question: "Philemon demonstrates that Christian fellowship crosses social?", options: [{ label: "A", text: "Levels" }, { label: "B", text: "Barriers" }, { label: "C", text: "Roles" }, { label: "D", text: "Classes" }], correctAnswer: "B", verse: "Philemon 16", explanation: "Unity in Christ." },
  { id: "philemon51", question: "Paul's tone throughout Philemon is best described as?", options: [{ label: "A", text: "Authoritative" }, { label: "B", text: "Demanding" }, { label: "C", text: "Pastoral" }, { label: "D", text: "Formal" }], correctAnswer: "C", verse: "Philemon 8-21", explanation: "Shepherd-like appeal." },
  { id: "philemon52", question: "The relationship between Paul and Philemon shows mutual?", options: [{ label: "A", text: "Respect" }, { label: "B", text: "Authority" }, { label: "C", text: "Dependence" }, { label: "D", text: "Obligation" }], correctAnswer: "A", verse: "Philemon 1-7", explanation: "Partnership in faith." },
  { id: "philemon53", question: "Paul's appeal highlights Christian responsibility to forgive as we have been?", options: [{ label: "A", text: "Loved" }, { label: "B", text: "Accepted" }, { label: "C", text: "Forgiven" }, { label: "D", text: "Saved" }], correctAnswer: "C", verse: "Philemon 18-21", explanation: "Forgiveness mirrored." },
  { id: "philemon54", question: "The letter assumes that Philemon has the freedom to choose?", options: [{ label: "A", text: "Obedience" }, { label: "B", text: "Forgiveness" }, { label: "C", text: "Mercy" }, { label: "D", text: "Kindness" }], correctAnswer: "B", verse: "Philemon 14", explanation: "Free will response." },
  { id: "philemon55", question: "Paul's confidence in Philemon suggests spiritual maturity shown through?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Love" }, { label: "C", text: "Obedience" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Philemon 5-7, 21", explanation: "Mature Christian life." },
  { id: "philemon56", question: "Philemon teaches that reconciliation is a reflection of the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Law" }, { label: "C", text: "Gospel" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "Philemon 16-18", explanation: "Gospel reconciliation." },
  { id: "philemon57", question: "Paul's offer to repay debt mirrors Christ's work of?", options: [{ label: "A", text: "Atonement" }, { label: "B", text: "Redemption" }, { label: "C", text: "Substitution" }, { label: "D", text: "Salvation" }], correctAnswer: "C", verse: "Philemon 18-19", explanation: "Christlike substitution." },
  { id: "philemon58", question: "The letter reflects early Christian views on community rooted in?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Grace" }, { label: "C", text: "Tradition" }, { label: "D", text: "Authority" }], correctAnswer: "B", verse: "Philemon 8-21", explanation: "Grace-shaped community." },
  { id: "philemon59", question: "Philemon emphasizes spiritual relationships over social?", options: [{ label: "A", text: "Status" }, { label: "B", text: "Position" }, { label: "C", text: "Power" }, { label: "D", text: "Rights" }], correctAnswer: "A", verse: "Philemon 16", explanation: "New identity in Christ." },
  { id: "philemon60", question: "The central appeal of Philemon is rooted in Christian?", options: [{ label: "A", text: "Love" }, { label: "B", text: "Faith" }, { label: "C", text: "Duty" }, { label: "D", text: "Law" }], correctAnswer: "A", verse: "Philemon 9", explanation: "Love-driven action." },
  { id: "philemon61", question: "Philemon illustrates that Christian authority should be exercised with?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Wisdom" }, { label: "C", text: "Love" }, { label: "D", text: "Strength" }], correctAnswer: "C", verse: "Philemon 8-9", explanation: "Authority shaped by love." },
  { id: "philemon62", question: "Paul's confidence in prayer shows his trust in God's?", options: [{ label: "A", text: "Timing" }, { label: "B", text: "Provision" }, { label: "C", text: "Will" }, { label: "D", text: "Power" }], correctAnswer: "C", verse: "Philemon 22", explanation: "Trust in God's will." },
  { id: "philemon63", question: "The restoration of Onesimus shows the gospel brings?", options: [{ label: "A", text: "Equality" }, { label: "B", text: "Unity" }, { label: "C", text: "Reconciliation" }, { label: "D", text: "Peace" }], correctAnswer: "C", verse: "Philemon 16", explanation: "Reconciled relationships." },
  { id: "philemon64", question: "Paul's language toward Onesimus emphasizes his new identity in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ" }, { label: "C", text: "Love" }, { label: "D", text: "Freedom" }], correctAnswer: "B", verse: "Philemon 16", explanation: "Identity in Christ." },
  { id: "philemon65", question: "Philemon encourages believers to see people through a?", options: [{ label: "A", text: "Spiritual lens" }, { label: "B", text: "Cultural lens" }, { label: "C", text: "Social lens" }, { label: "D", text: "Legal lens" }], correctAnswer: "A", verse: "Philemon 16", explanation: "Spiritual perspective." },
  { id: "philemon66", question: "The letter highlights the importance of personal responsibility within?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Community" }, { label: "C", text: "Leadership" }, { label: "D", text: "Doctrine" }], correctAnswer: "B", verse: "Philemon 14-15", explanation: "Responsible community." },
  { id: "philemon67", question: "Paul's willingness to be accountable for Onesimus reflects Christlike?", options: [{ label: "A", text: "Humility" }, { label: "B", text: "Sacrifice" }, { label: "C", text: "Service" }, { label: "D", text: "Leadership" }], correctAnswer: "B", verse: "Philemon 18-19", explanation: "Sacrificial love." },
  { id: "philemon68", question: "The short length of Philemon shows that biblical authority is not based on?", options: [{ label: "A", text: "Size" }, { label: "B", text: "Length" }, { label: "C", text: "Complexity" }, { label: "D", text: "Tradition" }], correctAnswer: "B", verse: "Philemon 1", explanation: "Authority from inspiration." },
  { id: "philemon69", question: "Paul's request models respectful communication even when addressing?", options: [{ label: "A", text: "Sin" }, { label: "B", text: "Conflict" }, { label: "C", text: "Authority" }, { label: "D", text: "Disobedience" }], correctAnswer: "B", verse: "Philemon 8-10", explanation: "Gentle correction." },
  { id: "philemon70", question: "The gospel in Philemon reshapes how believers understand?", options: [{ label: "A", text: "Freedom" }, { label: "B", text: "Power" }, { label: "C", text: "Relationships" }, { label: "D", text: "Justice" }], correctAnswer: "C", verse: "Philemon 16", explanation: "Relational transformation." },
  { id: "philemon71", question: "Philemon highlights that forgiveness often involves personal?", options: [{ label: "A", text: "Cost" }, { label: "B", text: "Loss" }, { label: "C", text: "Effort" }, { label: "D", text: "Sacrifice" }], correctAnswer: "D", verse: "Philemon 18-19", explanation: "Costly forgiveness." },
  { id: "philemon72", question: "Paul's approach encourages believers to act from conviction rather than?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Pressure" }, { label: "C", text: "Law" }, { label: "D", text: "Custom" }], correctAnswer: "B", verse: "Philemon 14", explanation: "Free obedience." },
  { id: "philemon73", question: "The letter implies that Christian maturity is shown through how believers handle?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "Conflict" }, { label: "C", text: "Teaching" }, { label: "D", text: "Tradition" }], correctAnswer: "B", verse: "Philemon 8-21", explanation: "Conflict handled in love." },
  { id: "philemon74", question: "Paul's closing greetings reinforce the importance of?", options: [{ label: "A", text: "Doctrine" }, { label: "B", text: "Community" }, { label: "C", text: "Leadership" }, { label: "D", text: "Mission" }], correctAnswer: "B", verse: "Philemon 23-24", explanation: "Shared fellowship." },
  { id: "philemon75", question: "Philemon demonstrates that reconciliation strengthens the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Faith" }, { label: "C", text: "Community" }, { label: "D", text: "Gospel witness" }], correctAnswer: "D", verse: "Philemon 16", explanation: "Witness to the gospel." },
  { id: "philemon76", question: "Paul's request reflects humility despite his apostolic?", options: [{ label: "A", text: "Calling" }, { label: "B", text: "Authority" }, { label: "C", text: "Position" }, { label: "D", text: "Office" }], correctAnswer: "B", verse: "Philemon 8-9", explanation: "Humble authority." },
  { id: "philemon77", question: "The letter teaches that spiritual equality does not immediately erase social?", options: [{ label: "A", text: "Differences" }, { label: "B", text: "Roles" }, { label: "C", text: "Systems" }, { label: "D", text: "Orders" }], correctAnswer: "C", verse: "Philemon 16", explanation: "Transformation within systems." },
  { id: "philemon78", question: "Philemon encourages believers to treat others based on their identity in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Love" }, { label: "C", text: "Christ" }, { label: "D", text: "Grace" }], correctAnswer: "C", verse: "Philemon 16", explanation: "Identity in Christ." },
  { id: "philemon79", question: "Paul's trust in Philemon suggests the power of?", options: [{ label: "A", text: "Example" }, { label: "B", text: "Encouragement" }, { label: "C", text: "Affirmation" }, { label: "D", text: "Appeal" }], correctAnswer: "C", verse: "Philemon 21", explanation: "Affirming obedience." },
  { id: "philemon80", question: "The letter of Philemon is a practical example of applying the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Gospel" }, { label: "C", text: "Faith" }, { label: "D", text: "Doctrine" }], correctAnswer: "B", verse: "Philemon 8-21", explanation: "Gospel lived out." },
  { id: "philemon81", question: "Paul's request assumes that Christian love goes beyond?", options: [{ label: "A", text: "Justice" }, { label: "B", text: "Fairness" }, { label: "C", text: "Rights" }, { label: "D", text: "Obligation" }], correctAnswer: "C", verse: "Philemon 16-18", explanation: "Love over rights." },
  { id: "philemon82", question: "The transformation of Onesimus serves as evidence of?", options: [{ label: "A", text: "Repentance" }, { label: "B", text: "Conversion" }, { label: "C", text: "Forgiveness" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "Philemon 10-11", explanation: "New life in Christ." },
  { id: "philemon83", question: "Philemon reflects the early church's emphasis on relational?", options: [{ label: "A", text: "Unity" }, { label: "B", text: "Equality" }, { label: "C", text: "Restoration" }, { label: "D", text: "Harmony" }], correctAnswer: "C", verse: "Philemon 15-16", explanation: "Restored relationships." },
  { id: "philemon84", question: "Paul's approach shows that leadership often involves?", options: [{ label: "A", text: "Commanding" }, { label: "B", text: "Persuading" }, { label: "C", text: "Directing" }, { label: "D", text: "Controlling" }], correctAnswer: "B", verse: "Philemon 8-10", explanation: "Persuasion over force." },
  { id: "philemon85", question: "Philemon teaches that faith should be expressed through?", options: [{ label: "A", text: "Words" }, { label: "B", text: "Belief" }, { label: "C", text: "Actions" }, { label: "D", text: "Doctrine" }], correctAnswer: "C", verse: "Philemon 5-7", explanation: "Faith in action." },
  { id: "philemon86", question: "The letter underscores the value of reconciliation within the?", options: [{ label: "A", text: "Family" }, { label: "B", text: "Church" }, { label: "C", text: "Community" }, { label: "D", text: "Body of Christ" }], correctAnswer: "D", verse: "Philemon 16", explanation: "One body in Christ." },
  { id: "philemon87", question: "Paul's appeal shows sensitivity to Philemon's?", options: [{ label: "A", text: "Authority" }, { label: "B", text: "Feelings" }, { label: "C", text: "Conscience" }, { label: "D", text: "Position" }], correctAnswer: "C", verse: "Philemon 14", explanation: "Respecting conscience." },
  { id: "philemon88", question: "The letter of Philemon is often used to illustrate Christian ethics in?", options: [{ label: "A", text: "Leadership" }, { label: "B", text: "Society" }, { label: "C", text: "Relationships" }, { label: "D", text: "Doctrine" }], correctAnswer: "C", verse: "Philemon 16-18", explanation: "Ethical relationships." },
  { id: "philemon89", question: "Paul's hope for release reflects trust in God's?", options: [{ label: "A", text: "Justice" }, { label: "B", text: "Timing" }, { label: "C", text: "Plan" }, { label: "D", text: "Will" }], correctAnswer: "B", verse: "Philemon 22", explanation: "Trusting God's timing." },
  { id: "philemon90", question: "Philemon teaches believers to prioritize reconciliation over?", options: [{ label: "A", text: "Comfort" }, { label: "B", text: "Rights" }, { label: "C", text: "Status" }, { label: "D", text: "Convenience" }], correctAnswer: "B", verse: "Philemon 16-18", explanation: "Rights surrendered for love." },
  { id: "philemon91", question: "The letter shows that true Christian freedom leads to?", options: [{ label: "A", text: "Independence" }, { label: "B", text: "Service" }, { label: "C", text: "Authority" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "Philemon 13-14", explanation: "Freedom to serve." },
  { id: "philemon92", question: "Paul's closing blessing emphasizes grace as the source of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Peace" }, { label: "C", text: "Strength" }, { label: "D", text: "Life" }], correctAnswer: "C", verse: "Philemon 25", explanation: "Grace empowers." },
  { id: "philemon93", question: "Philemon encourages believers to see conflicts as opportunities for?", options: [{ label: "A", text: "Growth" }, { label: "B", text: "Change" }, { label: "C", text: "Witness" }, { label: "D", text: "Restoration" }], correctAnswer: "D", verse: "Philemon 15-16", explanation: "Restorative purpose." },
  { id: "philemon94", question: "Paul's mediation role mirrors Christ's role as?", options: [{ label: "A", text: "Judge" }, { label: "B", text: "Mediator" }, { label: "C", text: "Teacher" }, { label: "D", text: "King" }], correctAnswer: "B", verse: "Philemon 18-19", explanation: "Christlike mediation." },
  { id: "philemon95", question: "The book of Philemon demonstrates that the gospel affects both personal and?", options: [{ label: "A", text: "Social life" }, { label: "B", text: "Spiritual life" }, { label: "C", text: "Public life" }, { label: "D", text: "Private life" }], correctAnswer: "A", verse: "Philemon 16", explanation: "Gospel in society." },
  { id: "philemon96", question: "Philemon reinforces that Christian love is demonstrated through?", options: [{ label: "A", text: "Words" }, { label: "B", text: "Actions" }, { label: "C", text: "Belief" }, { label: "D", text: "Doctrine" }], correctAnswer: "B", verse: "Philemon 7, 21", explanation: "Love in action." },
  { id: "philemon97", question: "The transformation theme in Philemon highlights the power of?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Faith" }, { label: "C", text: "Forgiveness" }, { label: "D", text: "Love" }], correctAnswer: "A", verse: "Philemon 10-16", explanation: "Grace transforms." },
  { id: "philemon98", question: "Paul's trust in Philemon reflects confidence in the work of the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Gospel" }, { label: "C", text: "Spirit" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "Philemon 21", explanation: "Spirit-led obedience." },
  { id: "philemon99", question: "The message of Philemon shows that reconciliation is central to the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Church" }, { label: "C", text: "Gospel" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "Philemon 15-18", explanation: "Gospel-centered reconciliation." },
  { id: "philemon100", question: "The lasting takeaway from Philemon is that Christian love transforms relationships, restores broken bonds, and reflects the heart of?", options: [{ label: "A", text: "The church" }, { label: "B", text: "Faith" }, { label: "C", text: "Christ" }, { label: "D", text: "Grace" }], correctAnswer: "C", verse: "Philemon 8-21", explanation: "Christlike love." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function PhilemonTriviaPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [loadingVerseText, setLoadingVerseText] = useState(false);

  useEffect(() => {
    async function loadUserAndQuestions() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const creditResponse = await fetch("/api/consume-credit", {           method: "POST",           headers: {             "Content-Type": "application/json",           },           body: JSON.stringify({             actionType: ACTION_TYPE.trivia_started,           }),         });                  if (!creditResponse.ok) {           return;         } const creditResult = (await creditResponse.json()) as {           ok: boolean;           reason?: string;         };                  if (!creditResult.ok) {           return;         } setUserId(user.id);

        // Fetch user's progress for philemon questions
        const { data: progressData, error } = await supabase
          .from("trivia_question_progress")
          .select("question_id, is_correct")
          .eq("user_id", user.id)
          .eq("book", "philemon");

        if (error) {
          console.error("Error fetching trivia progress:", error);
        }

        // Filter out correctly answered questions
        const answeredCorrectly = new Set(
          (progressData || [])
            .filter((p) => p.is_correct)
            .map((p) => p.question_id)
        );

        const availableQuestions = ALL_QUESTIONS.filter(
          (q) => !answeredCorrectly.has(q.id)
        );

        // If no questions left, show all questions (allow review)
        const questionsToUse =
          availableQuestions.length > 0 ? availableQuestions : ALL_QUESTIONS;

        const shuffled = shuffleArray(questionsToUse);
        setQuestions(shuffled.slice(0, 10));
      } else {
        // No user logged in, show random questions
        const shuffled = shuffleArray(ALL_QUESTIONS);
        setQuestions(shuffled.slice(0, 10));
      }
    }
    loadUserAndQuestions();
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;

  const handleAnswerSelect = async (answer: string) => {
    if (selectedAnswer) return;

    const isCorrect = answer === currentQuestion.correctAnswer;
    setSelectedAnswer(answer);
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    if (userId) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        let username = "User";
        if (user) {
const meta: any = user.user_metadata || {};
          username =
            meta.firstName ||
            meta.first_name ||
            (user.email ? user.email.split("@")[0] : null) ||
            "User";
        }

        console.log("Making API call to record trivia answer:", {
          userId,
          questionId: currentQuestion.id,
          username,
          isCorrect,
          book: "philemon",
        });
        const response = await fetch("/api/trivia-answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            questionId: currentQuestion.id,
            username,
            isCorrect,
            book: "philemon",
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Failed to record trivia answer:", response.status, errorText);
        } else {
          console.log("Successfully recorded trivia answer");
        }

        const { data: currentStats } = await supabase
          .from("profile_stats")
          .select("trivia_questions_answered")
          .eq("user_id", userId)
          .single();

        if (currentStats) {
          await supabase
            .from("profile_stats")
            .update({
              trivia_questions_answered: (currentStats.trivia_questions_answered || 0) + 1,
            })
            .eq("user_id", userId);
        }
      } catch (error) {
        console.error("Error tracking trivia question:", error);
      }
    }

    if (!currentQuestion.verseText) {
      setLoadingVerseText(true);
      try {
        const verseText = await fetchVerseText(currentQuestion.verse);
        setQuestions((prev) => {
          const updated = [...prev];
          updated[currentQuestionIndex] = {
            ...updated[currentQuestionIndex],
            verseText,
          };
          return updated;
        });
      } catch (error) {
        console.error("Error fetching verse text:", error);
      } finally {
        setLoadingVerseText(false);
      }
    }

    setIsFlipped(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsFlipped(false);
    } else {
      setShowResults(true);
    }
  };

  const getEncouragementMessage = (score: number) => {
    if (score === 10) return "Perfect! You're a Philemon expert!";
    if (score >= 8) return "Excellent! You know Philemon well!";
    if (score >= 6) return "Good job! Keep studying Philemon!";
    if (score >= 4) return "Nice try! Philemon has much to explore!";
    return "Keep learning! Every question helps you grow!";
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <p className="text-gray-600">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-4">Quiz Complete!</h2>
          <div className="mb-6">
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {correctCount} / 10
            </p>
            <p className="text-gray-600">Correct Answers</p>
          </div>
          <p className="text-lg text-gray-700 mb-8">
            {getEncouragementMessage(correctCount)}
          </p>
          <div className="space-y-3">
            <Link
              href="/bible-trivia/philemon"
              className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Play Again
            </Link>
            <Link
              href="/bible-trivia"
              className="block w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition"
            >
              Back to Decks
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/bible-trivia"
            className="text-gray-600 hover:text-gray-800 transition"
          >
            ← Back
          </Link>
          <div className="text-sm text-gray-600 flex gap-8">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span className="font-semibold">Score: {correctCount}</span>
          </div>
        </div>

        <div className="relative mb-8" style={{ perspective: "1000px" }}>
          <div
            className="relative w-full transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg)",
              }}
            >
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {currentQuestion.question}
              </h2>
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleAnswerSelect(option.label)}
                    disabled={!!selectedAnswer}
                    className="w-full text-left p-4 border-2 border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="font-semibold text-gray-700">
                      {option.label}. {option.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8 absolute top-0 left-0"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <div className="mb-6">
                <div
                  className={`inline-block px-4 py-2 rounded-lg font-semibold mb-4 ${
                    isCorrect
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                </div>
                <h2 className="text-2xl font-bold mb-4 text-gray-800">
                  {currentQuestion.question}
                </h2>
                <div className="space-y-2 mb-4">
                  {currentQuestion.options.map((option) => (
                    <div
                      key={option.label}
                      className={`p-3 rounded-lg ${
                        option.label === currentQuestion.correctAnswer
                          ? "bg-green-100 border-2 border-green-400"
                          : option.label === selectedAnswer && !isCorrect
                          ? "bg-red-100 border-2 border-red-400"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <span className="font-semibold text-gray-700">
                        {option.label}. {option.text}
                        {option.label === currentQuestion.correctAnswer && (
                          <span className="ml-2 text-green-700">✓</span>
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-blue-900 mb-2">
                    {currentQuestion.verse}
                  </p>
                  {loadingVerseText ? (
                    <p className="text-gray-500 text-sm italic mb-3">Loading verse...</p>
                  ) : currentQuestion.verseText ? (
                    <p className="text-gray-800 text-sm leading-relaxed mb-3 italic">
                      "{currentQuestion.verseText}"
                    </p>
                  ) : null}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
              <button
                onClick={handleNext}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                {currentQuestionIndex < questions.length - 1
                  ? "Next Question"
                  : "See Results"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}






