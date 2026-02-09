"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

interface Question {
  id: string;
  question: string;
  options: { label: string; text: string }[];
  correctAnswer: string;
  verse: string;
  verseText?: string;
  explanation: string;
}

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
  { id: "2thessalonians1", question: "Who wrote the book of 2 Thessalonians?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Paul" }, { label: "C", text: "John" }, { label: "D", text: "James" }], correctAnswer: "B", verse: "2 Thessalonians 1:1", explanation: "Paul identifies himself as the author." },
  { id: "2thessalonians2", question: "Who are named with Paul in the greeting?", options: [{ label: "A", text: "Barnabas and Mark" }, { label: "B", text: "Silas and Timothy" }, { label: "C", text: "Luke and Titus" }, { label: "D", text: "Apollos and Priscilla" }], correctAnswer: "B", verse: "2 Thessalonians 1:1", explanation: "Paul writes with Silas and Timothy." },
  { id: "2thessalonians3", question: "The letter is addressed to the church in?", options: [{ label: "A", text: "Corinth" }, { label: "B", text: "Thessalonica" }, { label: "C", text: "Philippi" }, { label: "D", text: "Ephesus" }], correctAnswer: "B", verse: "2 Thessalonians 1:1", explanation: "Written to Thessalonian believers." },
  { id: "2thessalonians4", question: "Paul thanks God for their growing?", options: [{ label: "A", text: "Hope" }, { label: "B", text: "Faith" }, { label: "C", text: "Love" }, { label: "D", text: "Joy" }], correctAnswer: "B", verse: "2 Thessalonians 1:3", explanation: "Their faith was increasing." },
  { id: "2thessalonians5", question: "Paul boasts about their perseverance and faith amid?", options: [{ label: "A", text: "Suffering" }, { label: "B", text: "Opposition" }, { label: "C", text: "Trials" }, { label: "D", text: "Persecutions" }], correctAnswer: "D", verse: "2 Thessalonians 1:4", explanation: "Endurance under persecution." },
  { id: "2thessalonians6", question: "God is just and will repay trouble to those who?", options: [{ label: "A", text: "Hate believers" }, { label: "B", text: "Persecute believers" }, { label: "C", text: "Oppress believers" }, { label: "D", text: "Reject believers" }], correctAnswer: "B", verse: "2 Thessalonians 1:6", explanation: "Divine justice." },
  { id: "2thessalonians7", question: "Relief will come when the Lord Jesus is revealed from heaven with blazing fire and His?", options: [{ label: "A", text: "Saints" }, { label: "B", text: "Angels" }, { label: "C", text: "Servants" }, { label: "D", text: "People" }], correctAnswer: "B", verse: "2 Thessalonians 1:7", explanation: "Christ's return." },
  { id: "2thessalonians8", question: "Jesus will punish those who do not know God and do not obey the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Truth" }, { label: "C", text: "Gospel" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "2 Thessalonians 1:8", explanation: "Accountability to the gospel." },
  { id: "2thessalonians9", question: "They will be punished with everlasting destruction and shut out from the presence of the?", options: [{ label: "A", text: "Lord" }, { label: "B", text: "Kingdom" }, { label: "C", text: "Light" }, { label: "D", text: "Truth" }], correctAnswer: "A", verse: "2 Thessalonians 1:9", explanation: "Separation from God." },
  { id: "2thessalonians10", question: "Christ will be glorified in His?", options: [{ label: "A", text: "People" }, { label: "B", text: "Church" }, { label: "C", text: "Holy people" }, { label: "D", text: "Believers" }], correctAnswer: "C", verse: "2 Thessalonians 1:10", explanation: "Glory revealed in believers." },
  { id: "2thessalonians11", question: "Paul prays God may count them worthy of their?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Calling" }, { label: "C", text: "Hope" }, { label: "D", text: "Salvation" }], correctAnswer: "B", verse: "2 Thessalonians 1:11", explanation: "Living out the calling." },
  { id: "2thessalonians12", question: "Paul prays God fulfill every good purpose of?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Faith" }, { label: "C", text: "Hope" }, { label: "D", text: "Love" }], correctAnswer: "B", verse: "2 Thessalonians 1:11", explanation: "Faith in action." },
  { id: "2thessalonians13", question: "The name of Jesus will be glorified in believers, and believers in?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Christ" }, { label: "C", text: "Him" }, { label: "D", text: "Grace" }], correctAnswer: "C", verse: "2 Thessalonians 1:12", explanation: "Mutual glory." },
  { id: "2thessalonians14", question: "Paul warns not to become easily unsettled or alarmed by claims that the day of the Lord has?", options: [{ label: "A", text: "Arrived" }, { label: "B", text: "Passed" }, { label: "C", text: "Started" }, { label: "D", text: "Come suddenly" }], correctAnswer: "A", verse: "2 Thessalonians 2:2", explanation: "False teaching corrected." },
  { id: "2thessalonians15", question: "Before the day of the Lord comes, there will be a?", options: [{ label: "A", text: "War" }, { label: "B", text: "Rebellion" }, { label: "C", text: "Judgment" }, { label: "D", text: "Famine" }], correctAnswer: "B", verse: "2 Thessalonians 2:3", explanation: "Apostasy foretold." },
  { id: "2thessalonians16", question: "The man of lawlessness is also called the man doomed to?", options: [{ label: "A", text: "Punishment" }, { label: "B", text: "Death" }, { label: "C", text: "Destruction" }, { label: "D", text: "Judgment" }], correctAnswer: "C", verse: "2 Thessalonians 2:3", explanation: "Certain doom." },
  { id: "2thessalonians17", question: "The man of lawlessness opposes and exalts himself over everything that is called?", options: [{ label: "A", text: "Holy" }, { label: "B", text: "God" }, { label: "C", text: "Faith" }, { label: "D", text: "Sacred" }], correctAnswer: "B", verse: "2 Thessalonians 2:4", explanation: "Self-exaltation." },
  { id: "2thessalonians18", question: "He sets himself up in God's temple proclaiming himself to be?", options: [{ label: "A", text: "Messiah" }, { label: "B", text: "Holy" }, { label: "C", text: "God" }, { label: "D", text: "Powerful" }], correctAnswer: "C", verse: "2 Thessalonians 2:4", explanation: "Ultimate deception." },
  { id: "2thessalonians19", question: "Paul says something is currently holding back the man of lawlessness until the proper?", options: [{ label: "A", text: "Time" }, { label: "B", text: "Season" }, { label: "C", text: "Hour" }, { label: "D", text: "Moment" }], correctAnswer: "A", verse: "2 Thessalonians 2:6", explanation: "God's timing." },
  { id: "2thessalonians20", question: "The secret power of lawlessness is already?", options: [{ label: "A", text: "Working" }, { label: "B", text: "Active" }, { label: "C", text: "Present" }, { label: "D", text: "Spreading" }], correctAnswer: "A", verse: "2 Thessalonians 2:7", explanation: "Ongoing influence." },
  { id: "2thessalonians21", question: "The lawless one will be revealed and overthrown by the breath of the Lord's?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Mouth" }, { label: "C", text: "Spirit" }, { label: "D", text: "Word" }], correctAnswer: "B", verse: "2 Thessalonians 2:8", explanation: "Christ's authority." },
  { id: "2thessalonians22", question: "The lawless one will be destroyed by the splendor of Christ's?", options: [{ label: "A", text: "Coming" }, { label: "B", text: "Glory" }, { label: "C", text: "Power" }, { label: "D", text: "Presence" }], correctAnswer: "A", verse: "2 Thessalonians 2:8", explanation: "Victory at Christ's return." },
  { id: "2thessalonians23", question: "The coming of the lawless one will be in accordance with the work of?", options: [{ label: "A", text: "Evil" }, { label: "B", text: "Deception" }, { label: "C", text: "Satan" }, { label: "D", text: "Darkness" }], correctAnswer: "C", verse: "2 Thessalonians 2:9", explanation: "Satanic influence." },
  { id: "2thessalonians24", question: "The lawless one will use all sorts of displays of power through signs and?", options: [{ label: "A", text: "Miracles" }, { label: "B", text: "Wonders" }, { label: "C", text: "Deceptions" }, { label: "D", text: "Acts" }], correctAnswer: "B", verse: "2 Thessalonians 2:9", explanation: "False wonders." },
  { id: "2thessalonians25", question: "People perish because they refuse to love the?", options: [{ label: "A", text: "Gospel" }, { label: "B", text: "Truth" }, { label: "C", text: "Faith" }, { label: "D", text: "Light" }], correctAnswer: "B", verse: "2 Thessalonians 2:10", explanation: "Rejection of truth." },
  { id: "2thessalonians26", question: "God sends them a powerful delusion so they will believe the?", options: [{ label: "A", text: "Lie" }, { label: "B", text: "Falsehood" }, { label: "C", text: "Deception" }, { label: "D", text: "Illusion" }], correctAnswer: "A", verse: "2 Thessalonians 2:11", explanation: "Judicial judgment." },
  { id: "2thessalonians27", question: "This happens so that all who have not believed the truth but delighted in wickedness will be?", options: [{ label: "A", text: "Condemned" }, { label: "B", text: "Judged" }, { label: "C", text: "Punished" }, { label: "D", text: "Destroyed" }], correctAnswer: "A", verse: "2 Thessalonians 2:12", explanation: "Final judgment." },
  { id: "2thessalonians28", question: "Believers are chosen for salvation through sanctifying work of the Spirit and belief in the?", options: [{ label: "A", text: "Word" }, { label: "B", text: "Truth" }, { label: "C", text: "Gospel" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "2 Thessalonians 2:13", explanation: "Salvation process." },
  { id: "2thessalonians29", question: "God called believers to share in the glory of our Lord?", options: [{ label: "A", text: "Jesus Christ" }, { label: "B", text: "Jesus" }, { label: "C", text: "Christ" }, { label: "D", text: "The Lord" }], correctAnswer: "A", verse: "2 Thessalonians 2:14", explanation: "Shared glory." },
  { id: "2thessalonians30", question: "Believers are instructed to stand firm and hold fast to the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Teachings" }, { label: "C", text: "Gospel" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "2 Thessalonians 2:15", explanation: "Doctrinal stability." },
  { id: "2thessalonians31", question: "Paul asks believers to pray that the message of the Lord may spread rapidly and be?", options: [{ label: "A", text: "Honored" }, { label: "B", text: "Received" }, { label: "C", text: "Accepted" }, { label: "D", text: "Proclaimed" }], correctAnswer: "A", verse: "2 Thessalonians 3:1", explanation: "Gospel advance." },
  { id: "2thessalonians32", question: "Paul asks prayer to be delivered from wicked and evil?", options: [{ label: "A", text: "People" }, { label: "B", text: "Men" }, { label: "C", text: "Forces" }, { label: "D", text: "Opponents" }], correctAnswer: "B", verse: "2 Thessalonians 3:2", explanation: "Opposition faced." },
  { id: "2thessalonians33", question: "Paul says not everyone has?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Truth" }, { label: "C", text: "Hope" }, { label: "D", text: "Love" }], correctAnswer: "A", verse: "2 Thessalonians 3:2", explanation: "Reality of unbelief." },
  { id: "2thessalonians34", question: "The Lord is faithful and will strengthen and protect believers from the?", options: [{ label: "A", text: "Enemy" }, { label: "B", text: "Evil one" }, { label: "C", text: "Devil" }, { label: "D", text: "World" }], correctAnswer: "B", verse: "2 Thessalonians 3:3", explanation: "Divine protection." },
  { id: "2thessalonians35", question: "Paul has confidence the believers are doing and will continue to do the things they are?", options: [{ label: "A", text: "Commanded" }, { label: "B", text: "Taught" }, { label: "C", text: "Instructed" }, { label: "D", text: "Shown" }], correctAnswer: "A", verse: "2 Thessalonians 3:4", explanation: "Obedient faith." },
  { id: "2thessalonians36", question: "Paul prays the Lord direct their hearts into God's love and Christ's?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Endurance" }, { label: "C", text: "Grace" }, { label: "D", text: "Faithfulness" }], correctAnswer: "B", verse: "2 Thessalonians 3:5", explanation: "Patient endurance." },
  { id: "2thessalonians37", question: "Believers are commanded to keep away from those who are idle and disruptive and do not live according to the teaching they?", options: [{ label: "A", text: "Received" }, { label: "B", text: "Heard" }, { label: "C", text: "Learned" }, { label: "D", text: "Followed" }], correctAnswer: "A", verse: "2 Thessalonians 3:6", explanation: "Church discipline." },
  { id: "2thessalonians38", question: "Paul did not eat anyone's food without paying for it but worked night and?", options: [{ label: "A", text: "Day" }, { label: "B", text: "Morning" }, { label: "C", text: "Evening" }, { label: "D", text: "Dawn" }], correctAnswer: "A", verse: "2 Thessalonians 3:8", explanation: "Self-support." },
  { id: "2thessalonians39", question: "Paul set an example to imitate in terms of?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Work" }, { label: "C", text: "Service" }, { label: "D", text: "Leadership" }], correctAnswer: "B", verse: "2 Thessalonians 3:9", explanation: "Work ethic." },
  { id: "2thessalonians40", question: "If anyone is not willing to work, they should not?", options: [{ label: "A", text: "Serve" }, { label: "B", text: "Eat" }, { label: "C", text: "Receive" }, { label: "D", text: "Participate" }], correctAnswer: "B", verse: "2 Thessalonians 3:10", explanation: "Responsibility principle." },
  { id: "2thessalonians41", question: "Some believers were busybodies instead of being?", options: [{ label: "A", text: "Faithful" }, { label: "B", text: "Busy" }, { label: "C", text: "Idle" }, { label: "D", text: "Helpful" }], correctAnswer: "B", verse: "2 Thessalonians 3:11", explanation: "Misplaced activity." },
  { id: "2thessalonians42", question: "Paul commands such people to settle down and earn the food they?", options: [{ label: "A", text: "Receive" }, { label: "B", text: "Eat" }, { label: "C", text: "Need" }, { label: "D", text: "Want" }], correctAnswer: "B", verse: "2 Thessalonians 3:12", explanation: "Responsible living." },
  { id: "2thessalonians43", question: "Believers are encouraged never to tire of doing?", options: [{ label: "A", text: "Right" }, { label: "B", text: "Good" }, { label: "C", text: "Faith" }, { label: "D", text: "Service" }], correctAnswer: "B", verse: "2 Thessalonians 3:13", explanation: "Persevering goodness." },
  { id: "2thessalonians44", question: "If someone does not obey instructions, they should be noted and have nothing to do with them so they may feel?", options: [{ label: "A", text: "Convicted" }, { label: "B", text: "Ashamed" }, { label: "C", text: "Corrected" }, { label: "D", text: "Warned" }], correctAnswer: "B", verse: "2 Thessalonians 3:14", explanation: "Corrective discipline." },
  { id: "2thessalonians45", question: "Such a person should not be regarded as an enemy but?", options: [{ label: "A", text: "Corrected" }, { label: "B", text: "Rebuked" }, { label: "C", text: "Warned as a brother" }, { label: "D", text: "Excluded" }], correctAnswer: "C", verse: "2 Thessalonians 3:15", explanation: "Redemptive discipline." },
  { id: "2thessalonians46", question: "Paul prays the Lord of peace Himself give believers peace at?", options: [{ label: "A", text: "All times" }, { label: "B", text: "Every opportunity" }, { label: "C", text: "All circumstances" }, { label: "D", text: "Every moment" }], correctAnswer: "C", verse: "2 Thessalonians 3:16", explanation: "Comprehensive peace." },
  { id: "2thessalonians47", question: "Paul adds his own greeting as a distinguishing mark in every?", options: [{ label: "A", text: "Letter" }, { label: "B", text: "Teaching" }, { label: "C", text: "Message" }, { label: "D", text: "Instruction" }], correctAnswer: "A", verse: "2 Thessalonians 3:17", explanation: "Authenticity marker." },
  { id: "2thessalonians48", question: "The letter closes with a blessing of?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Grace" }, { label: "C", text: "Faith" }, { label: "D", text: "Love" }], correctAnswer: "B", verse: "2 Thessalonians 3:18", explanation: "Grace-filled ending." },
  { id: "2thessalonians49", question: "A major theme of 2 Thessalonians is correction regarding?", options: [{ label: "A", text: "Salvation" }, { label: "B", text: "The day of the Lord" }, { label: "C", text: "Faith" }, { label: "D", text: "Works" }], correctAnswer: "B", verse: "2 Thessalonians 2", explanation: "Eschatological clarity." },
  { id: "2thessalonians50", question: "The letter emphasizes perseverance amid?", options: [{ label: "A", text: "Confusion" }, { label: "B", text: "Persecution" }, { label: "C", text: "Weakness" }, { label: "D", text: "Doubt" }], correctAnswer: "B", verse: "2 Thessalonians 1", explanation: "Faithful endurance." },
  { id: "2thessalonians51", question: "The return of Christ brings relief to believers and justice to?", options: [{ label: "A", text: "Unbelievers" }, { label: "B", text: "Oppressors" }, { label: "C", text: "Enemies" }, { label: "D", text: "Sinners" }], correctAnswer: "B", verse: "2 Thessalonians 1:6-7", explanation: "God's justice." },
  { id: "2thessalonians52", question: "The man of lawlessness is revealed only when the restraining influence is?", options: [{ label: "A", text: "Gone" }, { label: "B", text: "Removed" }, { label: "C", text: "Taken away" }, { label: "D", text: "Lifted" }], correctAnswer: "C", verse: "2 Thessalonians 2:7", explanation: "God-controlled timing." },
  { id: "2thessalonians53", question: "Believers are chosen for salvation through sanctification by the Spirit and belief in the?", options: [{ label: "A", text: "Gospel" }, { label: "B", text: "Truth" }, { label: "C", text: "Faith" }, { label: "D", text: "Word" }], correctAnswer: "B", verse: "2 Thessalonians 2:13", explanation: "Salvation process." },
  { id: "2thessalonians54", question: "Standing firm includes holding to teachings passed on whether by word or by?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Example" }, { label: "C", text: "Letter" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "2 Thessalonians 2:15", explanation: "Apostolic teaching." },
  { id: "2thessalonians55", question: "Paul prays Jesus and God encourage hearts and strengthen believers in every good deed and?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Word" }, { label: "C", text: "Work" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "2 Thessalonians 2:17", explanation: "Strengthened speech." },
  { id: "2thessalonians56", question: "Believers are warned against idleness and encouraged toward?", options: [{ label: "A", text: "Service" }, { label: "B", text: "Faithfulness" }, { label: "C", text: "Work" }, { label: "D", text: "Discipline" }], correctAnswer: "C", verse: "2 Thessalonians 3", explanation: "Responsible living." },
  { id: "2thessalonians57", question: "Church discipline is intended to restore not to?", options: [{ label: "A", text: "Punish" }, { label: "B", text: "Condemn" }, { label: "C", text: "Destroy" }, { label: "D", text: "Shame permanently" }], correctAnswer: "A", verse: "2 Thessalonians 3:14-15", explanation: "Redemptive correction." },
  { id: "2thessalonians58", question: "Peace in the letter is described as coming from the?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Lord" }, { label: "C", text: "Faith" }, { label: "D", text: "Church" }], correctAnswer: "B", verse: "2 Thessalonians 3:16", explanation: "Source of peace." },
  { id: "2thessalonians59", question: "Paul signs the letter to authenticate his?", options: [{ label: "A", text: "Message" }, { label: "B", text: "Teaching" }, { label: "C", text: "Authorship" }, { label: "D", text: "Authority" }], correctAnswer: "C", verse: "2 Thessalonians 3:17", explanation: "Proof of authorship." },
  { id: "2thessalonians60", question: "2 Thessalonians closes emphasizing grace as central to the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Gospel" }, { label: "C", text: "Christian life" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "2 Thessalonians 3:18", explanation: "Grace-centered life." },
  { id: "2thessalonians61", question: "The justice of God is shown through repaying those who?", options: [{ label: "A", text: "Reject Him" }, { label: "B", text: "Persecute believers" }, { label: "C", text: "Oppose truth" }, { label: "D", text: "Deny Christ" }], correctAnswer: "B", verse: "2 Thessalonians 1:6", explanation: "God's righteous judgment." },
  { id: "2thessalonians62", question: "The return of Christ includes punishment for those who do not obey the?", options: [{ label: "A", text: "Law" }, { label: "B", text: "Truth" }, { label: "C", text: "Gospel" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "2 Thessalonians 1:8", explanation: "Gospel accountability." },
  { id: "2thessalonians63", question: "Everlasting destruction involves exclusion from the presence of the?", options: [{ label: "A", text: "Kingdom" }, { label: "B", text: "Lord" }, { label: "C", text: "Light" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "2 Thessalonians 1:9", explanation: "Separation from God." },
  { id: "2thessalonians64", question: "Believers' endurance under persecution is evidence of God's?", options: [{ label: "A", text: "Grace" }, { label: "B", text: "Power" }, { label: "C", text: "Judgment" }, { label: "D", text: "Justice" }], correctAnswer: "D", verse: "2 Thessalonians 1:5", explanation: "Righteous judgment." },
  { id: "2thessalonians65", question: "The day of the Lord will not come until the rebellion occurs and the man of lawlessness is?", options: [{ label: "A", text: "Revealed" }, { label: "B", text: "Destroyed" }, { label: "C", text: "Exposed" }, { label: "D", text: "Judged" }], correctAnswer: "A", verse: "2 Thessalonians 2:3", explanation: "End-time order." },
  { id: "2thessalonians66", question: "The man of lawlessness exalts himself above everything that is called?", options: [{ label: "A", text: "Sacred" }, { label: "B", text: "Holy" }, { label: "C", text: "God" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "2 Thessalonians 2:4", explanation: "Blasphemous pride." },
  { id: "2thessalonians67", question: "The restrainer will continue until he is taken out of the?", options: [{ label: "A", text: "Way" }, { label: "B", text: "World" }, { label: "C", text: "Picture" }, { label: "D", text: "Scene" }], correctAnswer: "A", verse: "2 Thessalonians 2:7", explanation: "Divine restraint." },
  { id: "2thessalonians68", question: "The lawless one's power includes counterfeit miracles, signs, and?", options: [{ label: "A", text: "Wonders" }, { label: "B", text: "Acts" }, { label: "C", text: "Deeds" }, { label: "D", text: "Displays" }], correctAnswer: "A", verse: "2 Thessalonians 2:9", explanation: "False miracles." },
  { id: "2thessalonians69", question: "People perish because they refuse to love the?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Gospel" }, { label: "C", text: "Truth" }, { label: "D", text: "Light" }], correctAnswer: "C", verse: "2 Thessalonians 2:10", explanation: "Truth rejected." },
  { id: "2thessalonians70", question: "God's judgment includes allowing delusion for those who delight in?", options: [{ label: "A", text: "Wickedness" }, { label: "B", text: "Evil" }, { label: "C", text: "Sin" }, { label: "D", text: "Darkness" }], correctAnswer: "A", verse: "2 Thessalonians 2:12", explanation: "Judicial hardening." },
  { id: "2thessalonians71", question: "Believers are saved through sanctification by the Spirit and belief in the?", options: [{ label: "A", text: "Gospel" }, { label: "B", text: "Truth" }, { label: "C", text: "Word" }, { label: "D", text: "Faith" }], correctAnswer: "B", verse: "2 Thessalonians 2:13", explanation: "Salvation process." },
  { id: "2thessalonians72", question: "Holding to apostolic teaching protects believers from?", options: [{ label: "A", text: "Fear" }, { label: "B", text: "Error" }, { label: "C", text: "Persecution" }, { label: "D", text: "Suffering" }], correctAnswer: "B", verse: "2 Thessalonians 2:15", explanation: "Doctrinal stability." },
  { id: "2thessalonians73", question: "Encouragement in the letter comes from God's eternal encouragement and?", options: [{ label: "A", text: "Peace" }, { label: "B", text: "Grace" }, { label: "C", text: "Hope" }, { label: "D", text: "Love" }], correctAnswer: "C", verse: "2 Thessalonians 2:16", explanation: "Hope in Christ." },
  { id: "2thessalonians74", question: "Believers are strengthened in every good deed and?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Word" }, { label: "C", text: "Work" }, { label: "D", text: "Truth" }], correctAnswer: "B", verse: "2 Thessalonians 2:17", explanation: "Speech and action." },
  { id: "2thessalonians75", question: "Paul emphasizes prayer as essential for gospel?", options: [{ label: "A", text: "Success" }, { label: "B", text: "Spread" }, { label: "C", text: "Acceptance" }, { label: "D", text: "Power" }], correctAnswer: "B", verse: "2 Thessalonians 3:1", explanation: "Mission advance." },
  { id: "2thessalonians76", question: "Faithfulness of the Lord provides protection from the?", options: [{ label: "A", text: "Enemy" }, { label: "B", text: "World" }, { label: "C", text: "Evil one" }, { label: "D", text: "Devil" }], correctAnswer: "C", verse: "2 Thessalonians 3:3", explanation: "Divine guarding." },
  { id: "2thessalonians77", question: "Believers are called to obedience even when correction is?", options: [{ label: "A", text: "Hard" }, { label: "B", text: "Unpopular" }, { label: "C", text: "Difficult" }, { label: "D", text: "Required" }], correctAnswer: "D", verse: "2 Thessalonians 3:6", explanation: "Discipline obedience." },
  { id: "2thessalonians78", question: "Paul's work ethic serves as a model of Christian?", options: [{ label: "A", text: "Service" }, { label: "B", text: "Responsibility" }, { label: "C", text: "Faith" }, { label: "D", text: "Leadership" }], correctAnswer: "B", verse: "2 Thessalonians 3:9", explanation: "Responsible living." },
  { id: "2thessalonians79", question: "Idleness disrupts the church by creating?", options: [{ label: "A", text: "Conflict" }, { label: "B", text: "Busybodies" }, { label: "C", text: "Division" }, { label: "D", text: "Weakness" }], correctAnswer: "B", verse: "2 Thessalonians 3:11", explanation: "Misguided behavior." },
  { id: "2thessalonians80", question: "Correction aims to restore fellowship rather than cause?", options: [{ label: "A", text: "Punishment" }, { label: "B", text: "Isolation" }, { label: "C", text: "Shame" }, { label: "D", text: "Separation" }], correctAnswer: "C", verse: "2 Thessalonians 3:14-15", explanation: "Redemptive purpose." },
  { id: "2thessalonians81", question: "Peace is described as being available at all times and in every?", options: [{ label: "A", text: "Moment" }, { label: "B", text: "Way" }, { label: "C", text: "Situation" }, { label: "D", text: "Circumstance" }], correctAnswer: "D", verse: "2 Thessalonians 3:16", explanation: "Comprehensive peace." },
  { id: "2thessalonians82", question: "Authenticity of Paul's letters is marked by his?", options: [{ label: "A", text: "Greeting" }, { label: "B", text: "Signature" }, { label: "C", text: "Teaching" }, { label: "D", text: "Blessing" }], correctAnswer: "B", verse: "2 Thessalonians 3:17", explanation: "Signature proof." },
  { id: "2thessalonians83", question: "Grace in the closing highlights God's sustaining?", options: [{ label: "A", text: "Power" }, { label: "B", text: "Faithfulness" }, { label: "C", text: "Favor" }, { label: "D", text: "Presence" }], correctAnswer: "C", verse: "2 Thessalonians 3:18", explanation: "Unmerited favor." },
  { id: "2thessalonians84", question: "A key contrast in the letter is between truth and?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Error" }, { label: "C", text: "Darkness" }, { label: "D", text: "Sin" }], correctAnswer: "B", verse: "2 Thessalonians 2", explanation: "Truth vs deception." },
  { id: "2thessalonians85", question: "Endurance is encouraged by focusing on God's?", options: [{ label: "A", text: "Justice" }, { label: "B", text: "Timing" }, { label: "C", text: "Promises" }, { label: "D", text: "Faithfulness" }], correctAnswer: "D", verse: "2 Thessalonians 1:11", explanation: "Faithful God." },
  { id: "2thessalonians86", question: "Believers are warned not to be deceived by false claims about the?", options: [{ label: "A", text: "Gospel" }, { label: "B", text: "Spirit" }, { label: "C", text: "Day of the Lord" }, { label: "D", text: "Judgment" }], correctAnswer: "C", verse: "2 Thessalonians 2:2", explanation: "Eschatological clarity." },
  { id: "2thessalonians87", question: "The ultimate victory over lawlessness comes through the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Spirit" }, { label: "C", text: "Coming of Christ" }, { label: "D", text: "Judgment" }], correctAnswer: "C", verse: "2 Thessalonians 2:8", explanation: "Christ's triumph." },
  { id: "2thessalonians88", question: "Believers are encouraged to hold fast to teaching received by?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Tradition" }, { label: "C", text: "Apostles" }, { label: "D", text: "Scripture" }], correctAnswer: "B", verse: "2 Thessalonians 2:15", explanation: "Apostolic tradition." },
  { id: "2thessalonians89", question: "The letter balances warning with?", options: [{ label: "A", text: "Correction" }, { label: "B", text: "Encouragement" }, { label: "C", text: "Discipline" }, { label: "D", text: "Instruction" }], correctAnswer: "B", verse: "2 Thessalonians 1-3", explanation: "Pastoral balance." },
  { id: "2thessalonians90", question: "Christian discipline is aimed at restoring believers to?", options: [{ label: "A", text: "Faithfulness" }, { label: "B", text: "Obedience" }, { label: "C", text: "Community" }, { label: "D", text: "Truth" }], correctAnswer: "C", verse: "2 Thessalonians 3:14-15", explanation: "Community restoration." },
  { id: "2thessalonians91", question: "The letter encourages steadfastness until Christ's?", options: [{ label: "A", text: "Judgment" }, { label: "B", text: "Return" }, { label: "C", text: "Kingdom" }, { label: "D", text: "Glory" }], correctAnswer: "B", verse: "2 Thessalonians 2", explanation: "Hopeful waiting." },
  { id: "2thessalonians92", question: "Paul models prayer as central to spiritual?", options: [{ label: "A", text: "Growth" }, { label: "B", text: "Strength" }, { label: "C", text: "Stability" }, { label: "D", text: "Life" }], correctAnswer: "C", verse: "2 Thessalonians 3:1-5", explanation: "Prayer stability." },
  { id: "2thessalonians93", question: "The faithfulness of God assures believers He will?", options: [{ label: "A", text: "Guide them" }, { label: "B", text: "Protect them" }, { label: "C", text: "Strengthen them" }, { label: "D", text: "Save them" }], correctAnswer: "D", verse: "2 Thessalonians 3:3", explanation: "Divine assurance." },
  { id: "2thessalonians94", question: "Believers are instructed to avoid idleness to maintain a credible?", options: [{ label: "A", text: "Faith" }, { label: "B", text: "Witness" }, { label: "C", text: "Life" }, { label: "D", text: "Calling" }], correctAnswer: "B", verse: "2 Thessalonians 3:11-12", explanation: "Public witness." },
  { id: "2thessalonians95", question: "End-time deception thrives where truth is?", options: [{ label: "A", text: "Rejected" }, { label: "B", text: "Ignored" }, { label: "C", text: "Distorted" }, { label: "D", text: "Hidden" }], correctAnswer: "A", verse: "2 Thessalonians 2:10-12", explanation: "Truth refusal." },
  { id: "2thessalonians96", question: "Believers' confidence is grounded in God's eternal?", options: [{ label: "A", text: "Love" }, { label: "B", text: "Purpose" }, { label: "C", text: "Plan" }, { label: "D", text: "Grace" }], correctAnswer: "D", verse: "2 Thessalonians 2:16", explanation: "Grace foundation." },
  { id: "2thessalonians97", question: "The letter calls believers to balance readiness with?", options: [{ label: "A", text: "Patience" }, { label: "B", text: "Work" }, { label: "C", text: "Faith" }, { label: "D", text: "Hope" }], correctAnswer: "B", verse: "2 Thessalonians 3", explanation: "Active waiting." },
  { id: "2thessalonians98", question: "Paul's final prayer emphasizes peace as a gift from the?", options: [{ label: "A", text: "Spirit" }, { label: "B", text: "Lord" }, { label: "C", text: "Father" }, { label: "D", text: "Church" }], correctAnswer: "B", verse: "2 Thessalonians 3:16", explanation: "Peace source." },
  { id: "2thessalonians99", question: "2 Thessalonians reinforces hope by pointing to Christ's ultimate?", options: [{ label: "A", text: "Victory" }, { label: "B", text: "Judgment" }, { label: "C", text: "Return" }, { label: "D", text: "Reign" }], correctAnswer: "A", verse: "2 Thessalonians 2:8", explanation: "Final triumph." },
  { id: "2thessalonians100", question: "The closing emphasis of 2 Thessalonians centers on grace sustaining the?", options: [{ label: "A", text: "Church" }, { label: "B", text: "Believer" }, { label: "C", text: "Christian life" }, { label: "D", text: "Faith" }], correctAnswer: "C", verse: "2 Thessalonians 3:18", explanation: "Grace-centered living." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function SecondThessaloniansTriviaPage() {
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
        setUserId(user.id);

        const { data: progressData, error } = await supabase
          .from("trivia_question_progress")
          .select("question_id, is_correct")
          .eq("user_id", user.id)
          .eq("book", "2thessalonians");

        if (error) {
          console.error("Error fetching trivia progress:", error);
        }

        const answeredCorrectly = new Set(
          (progressData || [])
            .filter((p) => p.is_correct)
            .map((p) => p.question_id)
        );

        const availableQuestions = ALL_QUESTIONS.filter(
          (q) => !answeredCorrectly.has(q.id)
        );

        const questionsToUse =
          availableQuestions.length > 0 ? availableQuestions : ALL_QUESTIONS;

        const shuffled = shuffleArray(questionsToUse);
        setQuestions(shuffled.slice(0, 10));
      } else {
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

    const correct = answer === currentQuestion.correctAnswer;
    setSelectedAnswer(answer);
    if (correct) {
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
          isCorrect: correct,
          book: "2thessalonians",
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
            isCorrect: correct,
            book: "2thessalonians",
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
    if (score === 10) return "Perfect! You're a 2 Thessalonians expert!";
    if (score >= 8) return "Excellent! You know 2 Thessalonians well!";
    if (score >= 6) return "Good job! Keep studying 2 Thessalonians!";
    if (score >= 4) return "Nice try! 2 Thessalonians has much to explore!";
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
              href="/bible-trivia/2-thessalonians"
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

