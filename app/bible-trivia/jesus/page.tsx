"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
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
    const normalizedRef = reference.toLowerCase().replace(/\s+/g, '+');
    const response = await fetch(`https://bible-api.com/${normalizedRef}`);
    if (!response.ok) throw new Error('Failed to fetch verse');
    const data = await response.json();
    return data.text || '';
  } catch (error) {
    console.error('Error fetching verse:', error);
    return '';
  }
}

const ALL_QUESTIONS: Question[] = [
  { id: "jesus01", question: "What is Jesus' most common title in the Gospels?", options: [{ label: "A", text: "Son of God" }, { label: "B", text: "Son of Man" }, { label: "C", text: "Son of David" }, { label: "D", text: "King of Kings" }], correctAnswer: "B", verse: "Matthew 16:13", explanation: "Jesus most frequently called Himself 'Son of Man'. This title emphasizes His humanity and echoes Daniel's prophecy. It shows Jesus' identification with mankind. The title appears 81 times in the Gospels." },
  { id: "jesus02", question: "Where was Jesus born?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Nazareth" }, { label: "C", text: "Bethlehem" }, { label: "D", text: "Capernaum" }], correctAnswer: "C", verse: "Matthew 2:1", explanation: "Jesus was born in Bethlehem of Judea. This fulfilled Micah's prophecy about the ruler from Bethlehem. The birth in a manger shows His humble beginnings. Bethlehem means 'House of Bread' - Jesus is the Bread of Life." },
  { id: "jesus03", question: "Who was Jesus' earthly father?", options: [{ label: "A", text: "Joseph" }, { label: "B", text: "Zechariah" }, { label: "C", text: "Heli" }, { label: "D", text: "Jacob" }], correctAnswer: "A", verse: "Matthew 1:16", explanation: "Joseph was Jesus' legal father and Mary's husband. He was a carpenter from Nazareth. Joseph was a righteous man who obeyed God's direction. He protected Mary and Jesus from Herod's wrath." },
  { id: "jesus04", question: "What was Jesus' first miracle?", options: [{ label: "A", text: "Healing a blind man" }, { label: "B", text: "Walking on water" }, { label: "C", text: "Turning water to wine" }, { label: "D", text: "Raising Lazarus" }], correctAnswer: "C", verse: "John 2:11", explanation: "Jesus turned water into wine at a wedding in Cana. This showed His divine power and care for celebration. Mary prompted this miracle. It revealed Jesus' glory and led to belief." },
  { id: "jesus05", question: "What did Jesus say was the greatest commandment?", options: [{ label: "A", text: "Love your neighbor" }, { label: "B", text: "Love God with all your heart" }, { label: "C", text: "Honor your parents" }, { label: "D", text: "Do not steal" }], correctAnswer: "B", verse: "Matthew 22:37-38", explanation: "Love the Lord your God with all your heart, soul, and mind. This is the greatest commandment. All other commands flow from this. Jesus summarized the entire Law in love." },
  { id: "jesus06", question: "How many disciples did Jesus choose?", options: [{ label: "A", text: "10" }, { label: "B", text: "12" }, { label: "C", text: "14" }, { label: "D", text: "16" }], correctAnswer: "B", verse: "Luke 6:13", explanation: "Jesus chose 12 apostles to be with Him and send out to preach. The number 12 represents the tribes of Israel. These men would establish the church. They were ordinary men chosen for extraordinary purpose." },
  { id: "jesus07", question: "What did Jesus teach about prayer?", options: [{ label: "A", text: "Pray in private" }, { label: "B", text: "Use many words" }, { label: "C", text: "Pray for show" }, { label: "D", text: "Pray to be seen" }], correctAnswer: "A", verse: "Matthew 6:6", explanation: "Pray to your Father in private, not for show. Prayer is intimate communication with God. Jesus warned against hypocritical prayer. Genuine prayer flows from the heart." },
  { id: "jesus08", question: "Who betrayed Jesus?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "John" }, { label: "C", text: "Judas" }, { label: "D", text: "Thomas" }], correctAnswer: "C", verse: "Matthew 26:14-16", explanation: "Judas Iscariot betrayed Jesus for 30 pieces of silver. He was the treasurer of the disciples. Judas' betrayal fulfilled Scripture. Money motivated his terrible choice." },
  { id: "jesus09", question: "What did Jesus say about the poor?", options: [{ label: "A", text: "They will always be with you" }, { label: "B", text: "Ignore them" }, { label: "C", text: "They are cursed" }, { label: "D", text: "Help them always" }], correctAnswer: "A", verse: "Mark 14:7", explanation: "The poor you will always have with you. Jesus acknowledged ongoing human need. This doesn't mean ignore poverty but prioritize eternal matters. Care for the poor reflects God's heart." },
  { id: "jesus10", question: "How did Jesus enter Jerusalem on Palm Sunday?", options: [{ label: "A", text: "On a white horse" }, { label: "B", text: "On a donkey" }, { label: "C", text: "Walking" }, { label: "D", text: "In a chariot" }], correctAnswer: "B", verse: "Matthew 21:5", explanation: "Jesus rode into Jerusalem on a donkey. This fulfilled Zechariah's prophecy. The humble entry showed Jesus as the Prince of Peace. Crowds welcomed Him as king." },
  { id: "jesus11", question: "What did Jesus do in the Garden of Gethsemane?", options: [{ label: "A", text: "Slept" }, { label: "B", text: "Prayed in agony" }, { label: "C", text: "Ate with disciples" }, { label: "D", text: "Healed people" }], correctAnswer: "B", verse: "Matthew 26:39", explanation: "Jesus prayed 'My Father, if it is possible, may this cup be taken from me.' He sweat drops of blood in anguish. Jesus faced the cross willingly. His prayer showed perfect submission." },
  { id: "jesus12", question: "Who denied Jesus three times?", options: [{ label: "A", text: "John" }, { label: "B", text: "Peter" }, { label: "C", text: "James" }, { label: "D", text: "Andrew" }], correctAnswer: "B", verse: "Matthew 26:34", explanation: "Peter denied knowing Jesus three times before the rooster crowed. Jesus predicted this denial. Peter's failure shows human weakness. Jesus restored Peter after resurrection." },
  { id: "jesus13", question: "What was Jesus' last prayer on the cross?", options: [{ label: "A", text: "Father, forgive them" }, { label: "B", text: "My God, my God, why?" }, { label: "C", text: "Father, into your hands" }, { label: "D", text: "It is finished" }], correctAnswer: "C", verse: "Luke 23:46", explanation: "Jesus said 'Father, into your hands I commit my spirit.' This was His final prayer. It showed complete trust in God. Jesus' death was voluntary and triumphant." },
  { id: "jesus14", question: "What did the centurion say at Jesus' death?", options: [{ label: "A", text: "He was a criminal" }, { label: "B", text: "He was the Son of God" }, { label: "C", text: "He deserved this" }, { label: "D", text: "He was a prophet" }], correctAnswer: "B", verse: "Matthew 27:54", explanation: "The centurion declared 'Surely he was the Son of God!' The earthquake and darkness convinced him. A Gentile recognized Jesus' divinity. This fulfilled Psalm 22." },
  { id: "jesus15", question: "Who was the first to see the resurrected Jesus?", options: [{ label: "A", text: "Peter" }, { label: "B", text: "Mary Magdalene" }, { label: "C", text: "John" }, { label: "D", text: "The disciples" }], correctAnswer: "B", verse: "John 20:16", explanation: "Mary Magdalene saw Jesus at the tomb. She mistook Him for the gardener. Jesus appeared first to women. Mary announced the resurrection to the disciples." },
  { id: "jesus16", question: "How many days after His death did Jesus rise?", options: [{ label: "A", text: "1" }, { label: "B", text: "2" }, { label: "C", text: "3" }, { label: "D", text: "7" }], correctAnswer: "C", verse: "1 Corinthians 15:4", explanation: "Jesus was raised on the third day according to Scripture. This fulfilled His own predictions. The resurrection proves Jesus' victory over death. It is the foundation of Christian faith." },
  { id: "jesus17", question: "What did Jesus say to Thomas after resurrection?", options: [{ label: "A", text: "Blessed are those who believe" }, { label: "B", text: "Touch my wounds" }, { label: "C", text: "Go and tell others" }, { label: "D", text: "Peace be with you" }], correctAnswer: "A", verse: "John 20:29", explanation: "Jesus said 'Blessed are those who have not seen and yet have believed.' Thomas doubted but then believed. Jesus commended faith without sight. This blessing extends to all believers." },
  { id: "jesus18", question: "Where did Jesus ascend to heaven?", options: [{ label: "A", text: "Jerusalem" }, { label: "B", text: "Mount of Olives" }, { label: "C", text: "Galilee" }, { label: "D", text: "Nazareth" }], correctAnswer: "B", verse: "Acts 1:12", explanation: "Jesus ascended from the Mount of Olives. Angels promised His return. The ascension completed Jesus' earthly ministry. He now reigns at God's right hand." },
  { id: "jesus19", question: "What is Jesus' role in heaven now?", options: [{ label: "A", text: "Resting" }, { label: "B", text: "Interceding" }, { label: "C", text: "Sleeping" }, { label: "D", text: "Waiting" }], correctAnswer: "B", verse: "Hebrews 7:25", explanation: "Jesus always lives to intercede for us. He is our High Priest in heaven. Jesus advocates for believers. His intercession guarantees salvation." },
  { id: "jesus20", question: "What did Jesus teach about worry?", options: [{ label: "A", text: "Worry about tomorrow" }, { label: "B", text: "Don't worry about anything" }, { label: "C", text: "Worry shows faith" }, { label: "D", text: "Worry is helpful" }], correctAnswer: "B", verse: "Matthew 6:25", explanation: "Jesus said 'Do not worry about your life.' God cares for birds and flowers. Worry demonstrates lack of trust. God's provision frees us from anxiety." },
  { id: "jesus21", question: "What parable did Jesus tell about forgiveness?", options: [{ label: "A", text: "The Prodigal Son" }, { label: "B", text: "The Unforgiving Servant" }, { label: "C", text: "The Good Samaritan" }, { label: "D", text: "The Mustard Seed" }], correctAnswer: "B", verse: "Matthew 18:23-35", explanation: "The parable of the unforgiving servant shows God's forgiveness. We must forgive others as God forgave us. Unforgiveness leads to judgment. Forgiveness reflects God's mercy." },
  { id: "jesus22", question: "What did Jesus say about children?", options: [{ label: "A", text: "Send them away" }, { label: "B", text: "Let them come to me" }, { label: "C", text: "They are a burden" }, { label: "D", text: "Ignore them" }], correctAnswer: "B", verse: "Matthew 19:14", explanation: "Jesus said 'Let the little children come to me.' The kingdom belongs to such as these. Children model faith and humility. Jesus welcomed and blessed children." },
  { id: "jesus23", question: "What miracle did Jesus perform on the Sabbath?", options: [{ label: "A", text: "Fed 5000" }, { label: "B", text: "Healed a man with withered hand" }, { label: "C", text: "Walked on water" }, { label: "D", text: "Raised Lazarus" }], correctAnswer: "B", verse: "Matthew 12:10-13", explanation: "Jesus healed a man with a withered hand on the Sabbath. The Pharisees were angry. Jesus said 'It is lawful to do good on the Sabbath.' Mercy takes precedence over ritual." },
  { id: "jesus24", question: "What did Jesus teach about wealth?", options: [{ label: "A", text: "Money is evil" }, { label: "B", text: "You cannot serve God and money" }, { label: "C", text: "Rich people are blessed" }, { label: "D", text: "Poverty is holy" }], correctAnswer: "B", verse: "Matthew 6:24", explanation: "No one can serve two masters - God and money. Wealth can become an idol. Jesus warned against greed. True riches are spiritual." },
  { id: "jesus25", question: "Who did Jesus say was His mother and brothers?", options: [{ label: "A", text: "His physical family" }, { label: "B", text: "Those who do God's will" }, { label: "C", text: "The disciples" }, { label: "D", text: "The Pharisees" }], correctAnswer: "B", verse: "Matthew 12:50", explanation: "Whoever does the will of my Father is my mother and brother. Spiritual relationships transcend physical ones. Obedience creates family bonds. Jesus redefined family." },
  { id: "jesus26", question: "What did Jesus say about judging others?", options: [{ label: "A", text: "Judge quickly" }, { label: "B", text: "Do not judge" }, { label: "C", text: "Judge harshly" }, { label: "D", text: "Judge by appearance" }], correctAnswer: "B", verse: "Matthew 7:1", explanation: "Do not judge, or you will be judged. Jesus warned against hypocritical judgment. We see splinters in others' eyes but logs in our own. Mercy should guide our assessment." },
  { id: "jesus27", question: "What did Jesus teach about the narrow gate?", options: [{ label: "A", text: "The wide gate leads to life" }, { label: "B", text: "The narrow gate leads to life" }, { label: "C", text: "Both gates lead to life" }, { label: "D", text: "Neither gate matters" }], correctAnswer: "B", verse: "Matthew 7:13", explanation: "Enter through the narrow gate for the way is hard that leads to life. The wide gate leads to destruction. Salvation requires commitment. Many choose the easy way." },
  { id: "jesus28", question: "What did Jesus say about building on rock?", options: [{ label: "A", text: "Rock foundation is foolish" }, { label: "B", text: "Wise people build on rock" }, { label: "C", text: "Sand is better" }, { label: "D", text: "Foundations don't matter" }], correctAnswer: "B", verse: "Matthew 7:24", explanation: "Everyone who hears and does my words builds on rock. Storms come but the house stands. Obedience provides stability. Jesus' words are the foundation." },
  { id: "jesus29", question: "What authority did Jesus claim?", options: [{ label: "A", text: "Authority over weather" }, { label: "B", text: "Authority over disease" }, { label: "C", text: "All authority in heaven and earth" }, { label: "D", text: "Authority over demons" }], correctAnswer: "C", verse: "Matthew 28:18", explanation: "All authority in heaven and on earth has been given to me. Jesus claimed universal authority. This authority comes from the Father. Jesus delegates authority to His followers." },
  { id: "jesus30", question: "What did Jesus say about the greatest in the kingdom?", options: [{ label: "A", text: "The wealthy" }, { label: "B", text: "The powerful" }, { label: "C", text: "The childlike" }, { label: "D", text: "The religious" }], correctAnswer: "C", verse: "Matthew 18:4", explanation: "Whoever humbles himself like this child is the greatest. Kingdom values differ from world's values. Humility marks true greatness. Children model trust and dependence." },
  { id: "jesus31", question: "What did Jesus say about salt?", options: [{ label: "A", text: "Salt is worthless" }, { label: "B", text: "Salt preserves and flavors" }, { label: "C", text: "Salt causes thirst" }, { label: "D", text: "Salt is dangerous" }], correctAnswer: "B", verse: "Matthew 5:13", explanation: "You are the salt of the earth. Salt preserves and adds flavor. Believers should influence society positively. Losing saltiness makes one worthless." },
  { id: "jesus32", question: "What did Jesus say about light?", options: [{ label: "A", text: "Hide your light" }, { label: "B", text: "Let your light shine" }, { label: "C", text: "Light is dangerous" }, { label: "D", text: "Light blinds people" }], correctAnswer: "B", verse: "Matthew 5:16", explanation: "Let your light shine before others that they may see your good deeds. Christians should be visible examples. Good works glorify the Father. Light exposes darkness." },
  { id: "jesus33", question: "What did Jesus teach about anger?", options: [{ label: "A", text: "Anger is always wrong" }, { label: "B", text: "Anger leads to murder" }, { label: "C", text: "Control your anger" }, { label: "D", text: "Express anger freely" }], correctAnswer: "B", verse: "Matthew 5:22", explanation: "Anyone who is angry with his brother will be subject to judgment. Uncontrolled anger leads to murder. Jesus addressed heart attitudes. Reconciliation prevents escalation." },
  { id: "jesus34", question: "What did Jesus say about adultery?", options: [{ label: "A", text: "Adultery is acceptable" }, { label: "B", text: "Looking with lust is adultery" }, { label: "C", text: "Adultery is only physical" }, { label: "D", text: "Ignore adultery" }], correctAnswer: "B", verse: "Matthew 5:28", explanation: "Anyone who looks at a woman lustfully has committed adultery. Jesus addressed internal sin. Purity begins in the heart. Self-control prevents sin." },
  { id: "jesus35", question: "What did Jesus teach about oaths?", options: [{ label: "A", text: "Swear by heaven" }, { label: "B", text: "Let your yes be yes" }, { label: "C", text: "Oaths are necessary" }, { label: "D", text: "Swear frequently" }], correctAnswer: "B", verse: "Matthew 5:37", explanation: "Let your yes be yes and no be no. Truthful speech needs no oaths. Integrity eliminates need for swearing. Christians should be trustworthy." },
  { id: "jesus36", question: "What did Jesus say about retaliation?", options: [{ label: "A", text: "Retaliate immediately" }, { label: "B", text: "Turn the other cheek" }, { label: "C", text: "Seek revenge" }, { label: "D", text: "Fight back" }], correctAnswer: "B", verse: "Matthew 5:39", explanation: "If someone slaps you, turn the other cheek. Jesus taught non-retaliation. Love overcomes evil. This reflects God's character." },
  { id: "jesus37", question: "What did Jesus say about loving enemies?", options: [{ label: "A", text: "Hate your enemies" }, { label: "B", text: "Love your enemies" }, { label: "C", text: "Ignore your enemies" }, { label: "D", text: "Pray against enemies" }], correctAnswer: "B", verse: "Matthew 5:44", explanation: "Love your enemies and pray for those who persecute you. This shows divine love. God's love extends to all. Loving enemies reflects God's character." },
  { id: "jesus38", question: "What did Jesus teach about giving?", options: [{ label: "A", text: "Give to be seen" }, { label: "B", text: "Give in secret" }, { label: "C", text: "Don't give at all" }, { label: "D", text: "Give publicly" }], correctAnswer: "B", verse: "Matthew 6:3", explanation: "When you give, don't let your left hand know what your right is doing. Giving should be sincere. God sees secret generosity. Motives matter in giving." },
  { id: "jesus39", question: "What did Jesus say about treasures?", options: [{ label: "A", text: "Store up earthly treasures" }, { label: "B", text: "Store up heavenly treasures" }, { label: "C", text: "Treasures don't matter" }, { label: "D", text: "Give away all treasures" }], correctAnswer: "B", verse: "Matthew 6:20", explanation: "Store up treasures in heaven where moths don't destroy. Earthly treasures are temporary. Eternal investments last. Focus on what matters eternally." },
  { id: "jesus40", question: "What did Jesus say about serving two masters?", options: [{ label: "A", text: "It's possible" }, { label: "B", text: "It's impossible" }, { label: "C", text: "It's recommended" }, { label: "D", text: "It's optional" }], correctAnswer: "B", verse: "Matthew 6:24", explanation: "No one can serve two masters. You will hate one and love the other. Divided loyalty causes conflict. Choose God as supreme master." },
  { id: "jesus41", question: "What did Jesus say about seeking first?", options: [{ label: "A", text: "Wealth" }, { label: "B", text: "God's kingdom" }, { label: "C", text: "Pleasure" }, { label: "D", text: "Success" }], correctAnswer: "B", verse: "Matthew 6:33", explanation: "Seek first God's kingdom and righteousness. God will provide needs. Priorities determine provision. Kingdom focus brings blessing." },
  { id: "jesus42", question: "What did Jesus say about judging?", options: [{ label: "A", text: "Judge by appearance" }, { label: "B", text: "Don't judge hypocritically" }, { label: "C", text: "Judge everyone" }, { label: "D", text: "Never judge" }], correctAnswer: "B", verse: "Matthew 7:5", explanation: "First take the plank out of your own eye. Self-examination precedes judging others. Hypocrisy blinds judgment. Righteous judgment is possible." },
  { id: "jesus43", question: "What did Jesus say about asking?", options: [{ label: "A", text: "Ask and you will receive" }, { label: "B", text: "Don't ask" }, { label: "C", text: "Ask selfishly" }, { label: "D", text: "Ask once" }], correctAnswer: "A", verse: "Matthew 7:7", explanation: "Ask and it will be given to you; seek and you will find. Persistent prayer brings results. God delights to answer prayers. Faith motivates asking." },
  { id: "jesus44", question: "What did Jesus say about the golden rule?", options: [{ label: "A", text: "Do unto others as they do to you" }, { label: "B", text: "Do unto others as you would have them do to you" }, { label: "C", text: "Ignore others" }, { label: "D", text: "Harm others first" }], correctAnswer: "B", verse: "Matthew 7:12", explanation: "Do to others what you would have them do to you. This summarizes the Law and Prophets. Love guides all relationships. The golden rule promotes harmony." },
  { id: "jesus45", question: "What did Jesus say about false prophets?", options: [{ label: "A", text: "Follow them" }, { label: "B", text: "Recognize them by their fruit" }, { label: "C", text: "Ignore them" }, { label: "D", text: "Support them" }], correctAnswer: "B", verse: "Matthew 7:16", explanation: "You will recognize them by their fruits. Good trees bear good fruit. Character reveals authenticity. Test teaching by results." },
  { id: "jesus46", question: "What did Jesus say about entering the kingdom?", options: [{ label: "A", text: "By works" }, { label: "B", text: "By birth" }, { label: "C", text: "By doing God's will" }, { label: "D", text: "By money" }], correctAnswer: "C", verse: "Matthew 7:21", explanation: "Not everyone who says 'Lord, Lord' will enter, but he who does the will of my Father. Obedience demonstrates true faith. Words alone are insufficient." },
  { id: "jesus47", question: "What did Jesus say about building houses?", options: [{ label: "A", text: "Build on sand" }, { label: "B", text: "Build without foundation" }, { label: "C", text: "Build on rock" }, { label: "D", text: "Don't build" }], correctAnswer: "C", verse: "Matthew 7:24", explanation: "Build your house on the rock. Hearing and doing Jesus' words provides stability. Obedience withstands storms. Jesus' teaching is the foundation." },
  { id: "jesus48", question: "What amazed the people about Jesus' teaching?", options: [{ label: "A", text: "His volume" }, { label: "B", text: "His authority" }, { label: "C", text: "His length" }, { label: "D", text: "His jokes" }], correctAnswer: "B", verse: "Matthew 7:29", explanation: "He taught as one who had authority, not like the teachers of the law. Jesus spoke with divine authority. His teaching carried weight. People recognized God's voice." },
  { id: "jesus49", question: "What did Jesus do for the leper?", options: [{ label: "A", text: "Ignored him" }, { label: "B", text: "Touched and healed him" }, { label: "C", text: "Sent him away" }, { label: "D", text: "Prayed from afar" }], correctAnswer: "B", verse: "Matthew 8:3", explanation: "Jesus touched the man and healed him. Touching lepers was forbidden but Jesus showed compassion. Healing demonstrated Jesus' power and love. Jesus broke social barriers." },
  { id: "jesus50", question: "What did Jesus say to the centurion?", options: [{ label: "A", text: "I must come" }, { label: "B", text: "Go, let it be done" }, { label: "C", text: "Wait here" }, { label: "D", text: "Come back later" }], correctAnswer: "B", verse: "Matthew 8:13", explanation: "Jesus marveled at the centurion's faith and healed from afar. The centurion understood authority. Faith accesses Jesus' power. Distance doesn't limit Jesus." },
  { id: "jesus51", question: "What did Jesus say about following Him?", options: [{ label: "A", text: "It's easy" }, { label: "B", text: "Foxes have holes, birds have nests, but Son of Man has nowhere" }, { label: "C", text: "It's comfortable" }, { label: "D", text: "It's prestigious" }], correctAnswer: "B", verse: "Matthew 8:20", explanation: "Jesus warned that following Him means sacrifice. Discipleship costs everything. Jesus had no earthly home. True following requires commitment." },
  { id: "jesus52", question: "What did Jesus do in the storm?", options: [{ label: "A", text: "Slept" }, { label: "B", text: "Panicked" }, { label: "C", text: "Rebuked the wind and waves" }, { label: "D", text: "Prayed silently" }], correctAnswer: "C", verse: "Matthew 8:26", explanation: "Jesus rebuked the winds and waves, and there was great calm. Nature obeys Jesus' command. Jesus has authority over creation. Peace follows Jesus' word." },
  { id: "jesus53", question: "What did Jesus allow the demons to do?", options: [{ label: "A", text: "Possess the pigs" }, { label: "B", text: "Stay in the man" }, { label: "C", text: "Go into the abyss" }, { label: "D", text: "Return to the man" }], correctAnswer: "A", verse: "Matthew 8:32", explanation: "Jesus allowed the demons to enter the pigs. The pigs rushed into the sea. Jesus has authority over demons. Deliverance brings freedom." },
  { id: "jesus54", question: "What did Jesus say about the paralytic?", options: [{ label: "A", text: "Your sins are forgiven" }, { label: "B", text: "Stand up and walk" }, { label: "C", text: "Go home" }, { label: "D", text: "Rest here" }], correctAnswer: "A", verse: "Matthew 9:2", explanation: "Jesus first forgave the man's sins, then healed his body. Forgiveness addresses the root cause. Spiritual healing precedes physical. Jesus claimed divine authority." },
  { id: "jesus55", question: "What did Jesus say about fasting?", options: [{ label: "A", text: "Fast always" }, { label: "B", text: "The bridegroom is here" }, { label: "C", text: "Never fast" }, { label: "D", text: "Fast in secret" }], correctAnswer: "B", verse: "Matthew 9:15", explanation: "Can the wedding guests mourn while the bridegroom is with them? Jesus brought joy, not mourning. Fasting follows Jesus' departure. Celebration marks Jesus' presence." },
  { id: "jesus56", question: "What did Jesus say about the harvest?", options: [{ label: "A", text: "The harvest is past" }, { label: "B", text: "The harvest is plentiful but workers are few" }, { label: "C", text: "Harvest doesn't matter" }, { label: "D", text: "Workers are plentiful" }], correctAnswer: "B", verse: "Matthew 9:37", explanation: "The harvest is plentiful but the workers are few. Jesus called for prayer for workers. Evangelism requires laborers. The need is urgent." },
  { id: "jesus57", question: "What did Jesus give the Twelve?", options: [{ label: "A", text: "Money" }, { label: "B", text: "Authority over unclean spirits" }, { label: "C", text: "Houses" }, { label: "D", text: "Weapons" }], correctAnswer: "B", verse: "Matthew 10:1", explanation: "Jesus gave them authority to drive out evil spirits and heal diseases. Authority comes from Jesus. Disciples participate in Jesus' ministry. Power accompanies the message." },
  { id: "jesus58", question: "What did Jesus say about fear?", options: [{ label: "A", text: "Fear everyone" }, { label: "B", text: "Fear God alone" }, { label: "C", text: "Fear nothing" }, { label: "D", text: "Fear authorities" }], correctAnswer: "B", verse: "Matthew 10:28", explanation: "Fear Him who can destroy both soul and body in hell. God alone is to be feared. Reverence for God eliminates lesser fears. God's authority surpasses all." },
  { id: "jesus59", question: "What did Jesus say about acknowledging Him?", options: [{ label: "A", text: "Deny Him" }, { label: "B", text: "Whoever acknowledges me before men" }, { label: "C", text: "Hide your faith" }, { label: "D", text: "Be ashamed" }], correctAnswer: "B", verse: "Matthew 10:32", explanation: "Whoever acknowledges me before men, I will acknowledge before my Father. Public confession matters. Jesus demands loyalty. Eternal consequences follow acknowledgment." },
  { id: "jesus60", question: "What did Jesus say about peace?", options: [{ label: "A", text: "I bring peace" }, { label: "B", text: "I did not come to bring peace but a sword" }, { label: "C", text: "Peace at any cost" }, { label: "D", text: "Avoid conflict" }], correctAnswer: "B", verse: "Matthew 10:34", explanation: "I did not come to bring peace, but a sword. Jesus brings division for truth. Following Jesus costs relationships. Kingdom allegiance supersedes family." },
  { id: "jesus61", question: "What did Jesus say about worth?", options: [{ label: "A", text: "Even sparrows are worth more than money" }, { label: "B", text: "You are worth more than many sparrows" }, { label: "C", text: "Sparrows have no value" }, { label: "D", text: "Money is worthless" }], correctAnswer: "B", verse: "Matthew 10:31", explanation: "You are worth more than many sparrows. God values individual people. Nothing happens without God's knowledge. Human worth exceeds creation's value." },
  { id: "jesus62", question: "What did Jesus say about John the Baptist?", options: [{ label: "A", text: "He is Elijah" }, { label: "B", text: "He is a prophet" }, { label: "C", text: "He is the greatest born of women" }, { label: "D", text: "All of the above" }], correctAnswer: "D", verse: "Matthew 11:9-14", explanation: "John is a prophet, more than a prophet, the greatest born of women. John fulfilled Malachi's prophecy. John's ministry bridged old and new covenants. Jesus honored John's role." },
  { id: "jesus63", question: "What did Jesus say about wisdom?", options: [{ label: "A", text: "Wisdom is justified by her children" }, { label: "B", text: "Wisdom is foolish" }, { label: "C", text: "Ignore wisdom" }, { label: "D", text: "Wisdom is hidden" }], correctAnswer: "A", verse: "Matthew 11:19", explanation: "Wisdom is proved right by her deeds. Jesus' ministry vindicated God's wisdom. Results validate truth. Jesus' life proved divine wisdom." },
  { id: "jesus64", question: "What did Jesus offer the weary?", options: [{ label: "A", text: "More work" }, { label: "B", text: "Rest" }, { label: "C", text: "Burden" }, { label: "D", text: "Struggle" }], correctAnswer: "B", verse: "Matthew 11:28", explanation: "Come to me, all you who are weary and burdened, and I will give you rest. Jesus provides soul rest. His yoke is easy, burden light. Salvation brings peace." },
  { id: "jesus65", question: "What did Jesus say about the Pharisees?", options: [{ label: "A", text: "They are blessed" }, { label: "B", text: "Woe to you, teachers of the law and Pharisees" }, { label: "C", text: "Follow their example" }, { label: "D", text: "They are perfect" }], correctAnswer: "B", verse: "Matthew 23:13", explanation: "Jesus pronounced seven woes on the Pharisees. They shut the kingdom from people. Hypocrisy angered Jesus. Religious leaders faced judgment." },
  { id: "jesus66", question: "What did Jesus say about the greatest commandment?", options: [{ label: "A", text: "Love God completely" }, { label: "B", text: "Love neighbor as self" }, { label: "C", text: "Both A and B" }, { label: "D", text: "Neither" }], correctAnswer: "C", verse: "Matthew 22:37-39", explanation: "Love God with all your heart, and love your neighbor as yourself. These summarize all the Law. Love fulfills God's requirements. Jesus simplified complex rules." },
  { id: "jesus67", question: "What did Jesus say about the resurrection?", options: [{ label: "A", text: "There is no resurrection" }, { label: "B", text: "God is the God of the living" }, { label: "C", text: "Death is final" }, { label: "D", text: "Resurrection is impossible" }], correctAnswer: "B", verse: "Matthew 22:32", explanation: "God is not the God of the dead but of the living. Abraham, Isaac, and Jacob live. Resurrection proves life after death. God keeps His promises." },
  { id: "jesus68", question: "What did Jesus say about Caesar?", options: [{ label: "A", text: "Give to Caesar what is Caesar's" }, { label: "B", text: "Refuse Caesar's tax" }, { label: "C", text: "Caesar is God" }, { label: "D", text: "Ignore Caesar" }], correctAnswer: "A", verse: "Matthew 22:21", explanation: "Give to Caesar what is Caesar's and to God what is God's. Jesus distinguished spheres of authority. Christians have dual citizenship. Obedience to God takes precedence." },
  { id: "jesus69", question: "What did Jesus say about the widow's offering?", options: [{ label: "A", text: "It was too little" }, { label: "B", text: "She gave more than all the others" }, { label: "C", text: "It was wasted" }, { label: "D", text: "She should have given more" }], correctAnswer: "B", verse: "Mark 12:43", explanation: "This poor widow has given more than all the others. She gave out of poverty. God measures the heart, not the amount. Sacrificial giving pleases God." },
  { id: "jesus70", question: "What did Jesus predict about the temple?", options: [{ label: "A", text: "It will stand forever" }, { label: "B", text: "Not one stone will be left on another" }, { label: "C", text: "It will be enlarged" }, { label: "D", text: "It will be moved" }], correctAnswer: "B", verse: "Matthew 24:2", explanation: "Not one stone here will be left on another. Jesus predicted the temple's destruction. This happened in AD 70. Jesus' words proved true." },
  { id: "jesus71", question: "What did Jesus say about the end times?", options: [{ label: "A", text: "No one knows the day or hour" }, { label: "B", text: "I know exactly when" }, { label: "C", text: "It will be tomorrow" }, { label: "D", text: "It already happened" }], correctAnswer: "A", verse: "Matthew 24:36", explanation: "No one knows about that day or hour, not even the angels or the Son. Only the Father knows. Watchfulness is required. Jesus emphasized preparedness." },
  { id: "jesus72", question: "What parable did Jesus tell about readiness?", options: [{ label: "A", text: "The Ten Virgins" }, { label: "B", text: "The Talents" }, { label: "C", text: "The Prodigal Son" }, { label: "D", text: "The Mustard Seed" }], correctAnswer: "A", verse: "Matthew 25:1-13", explanation: "Five virgins were wise and five foolish. The wise had oil for their lamps. Spiritual preparedness matters. Jesus will return unexpectedly. Be ready for His coming." },
  { id: "jesus73", question: "What did Jesus say about the sheep and goats?", options: [{ label: "A", text: "All are sheep" }, { label: "B", text: "All are goats" }, { label: "C", text: "Sheep inherit the kingdom, goats do not" }, { label: "D", text: "It doesn't matter" }], correctAnswer: "C", verse: "Matthew 25:32-33", explanation: "He will separate the people one from another as a shepherd separates sheep from goats. Service to others shows true faith. Judgment is based on love in action." },
  { id: "jesus74", question: "What did Jesus say about the greatest?", options: [{ label: "A", text: "The greatest is the servant" }, { label: "B", text: "The greatest is the ruler" }, { label: "C", text: "The greatest is the wealthy" }, { label: "D", text: "The greatest is the teacher" }], correctAnswer: "A", verse: "Matthew 23:11", explanation: "The greatest among you will be your servant. Jesus inverted worldly values. Leadership means service. True greatness serves others." },
  { id: "jesus75", question: "What did Jesus do at the Last Supper?", options: [{ label: "A", text: "Ate alone" }, { label: "B", text: "Washed the disciples' feet" }, { label: "C", text: "Argued with disciples" }, { label: "D", text: "Slept" }], correctAnswer: "B", verse: "John 13:5", explanation: "Jesus washed His disciples' feet. He showed servant leadership. Peter objected but Jesus insisted. Love serves even in humble tasks." },
  { id: "jesus76", question: "What new commandment did Jesus give?", options: [{ label: "A", text: "Love one another as I have loved you" }, { label: "B", text: "Obey all rules" }, { label: "C", text: "Sacrifice everything" }, { label: "D", text: "Pray constantly" }], correctAnswer: "A", verse: "John 13:34", explanation: "Love one another as I have loved you. This identifies disciples. Sacrificial love marks Christians. Jesus' love becomes the standard." },
  { id: "jesus77", question: "What did Jesus say about His departure?", options: [{ label: "A", text: "I will be back soon" }, { label: "B", text: "It is better for you that I go away" }, { label: "C", text: "Stay with me" }, { label: "D", text: "Don't leave" }], correctAnswer: "B", verse: "John 16:7", explanation: "It is for your good that I am going away. The Spirit would come. Jesus' physical absence enables spiritual presence. The Spirit continues Jesus' work." },
  { id: "jesus78", question: "What did Jesus pray for in John 17?", options: [{ label: "A", text: "His own glory" }, { label: "B", text: "The disciples' unity" }, { label: "C", text: "The world's judgment" }, { label: "D", text: "His comfort" }], correctAnswer: "B", verse: "John 17:21", explanation: "That all of them may be one. Jesus prayed for unity. Unity displays God's glory. Division hinders the mission." },
  { id: "jesus79", question: "What did Jesus say about the Spirit?", options: [{ label: "A", text: "He will glorify me" }, { label: "B", text: "He will glorify Himself" }, { label: "C", text: "He will confuse you" }, { label: "D", text: "He will leave you" }], correctAnswer: "A", verse: "John 16:14", explanation: "He will glorify me because it is from me that he will receive what he will make known to you. The Spirit testifies of Jesus. Jesus remains central. The Spirit serves Christ's purposes." },
  { id: "jesus80", question: "What did Jesus say about eternal life?", options: [{ label: "A", text: "Knowing God and Jesus" }, { label: "B", text: "Following rules" }, { label: "C", text: "Being wealthy" }, { label: "D", text: "Being religious" }], correctAnswer: "A", verse: "John 17:3", explanation: "This is eternal life: that they know you, the only true God, and Jesus Christ. Eternal life is relationship. Knowledge of God defines salvation. Jesus reveals the Father." },
  { id: "jesus81", question: "What did Jesus say about the world?", options: [{ label: "A", text: "Love the world" }, { label: "B", text: "The world hates you" }, { label: "C", text: "Join the world" }, { label: "D", text: "Ignore the world" }], correctAnswer: "B", verse: "John 15:18", explanation: "If the world hates you, keep in mind that it hated me first. Persecution is expected. Christians are not of the world. Jesus prepared disciples for opposition." },
  { id: "jesus82", question: "What did Jesus say about abiding?", options: [{ label: "A", text: "Abide in my love" }, { label: "B", text: "Leave my love" }, { label: "C", text: "Abide in the world" }, { label: "D", text: "Abide in rules" }], correctAnswer: "A", verse: "John 15:9", explanation: "Abide in my love. If you keep my commands, you will abide in my love. Obedience maintains relationship. Love motivates obedience. Abiding produces fruit." },
  { id: "jesus83", question: "What did Jesus say about joy?", options: [{ label: "A", text: "Your joy may be complete" }, { label: "B", text: "Joy is impossible" }, { label: "C", text: "Joy comes from wealth" }, { label: "D", text: "Avoid joy" }], correctAnswer: "A", verse: "John 15:11", explanation: "I have told you this so that my joy may be in you and that your joy may be complete. Jesus gives full joy. Obedience brings joy. Joy is Jesus' gift." },
  { id: "jesus84", question: "What did Jesus say about friendship?", options: [{ label: "A", text: "You are my friends if you do what I command" }, { label: "B", text: "Friends obey rules" }, { label: "C", text: "Friends are equals" }, { label: "D", text: "Friends don't obey" }], correctAnswer: "A", verse: "John 15:14", explanation: "You are my friends if you do what I command. Obedience defines friendship with Jesus. Jesus chose disciples as friends. Friendship involves loyalty." },
  { id: "jesus85", question: "What did Jesus say about persecution?", options: [{ label: "A", text: "It will never happen" }, { label: "B", text: "They will persecute you" }, { label: "C", text: "Run from persecution" }, { label: "D", text: "Fight back" }], correctAnswer: "B", verse: "John 15:20", explanation: "If they persecuted me, they will persecute you also. Suffering is inevitable. Jesus warned of trials. Persecution proves discipleship." },
  { id: "jesus86", question: "What did Jesus say about the Spirit's work?", options: [{ label: "A", text: "He will convict the world of sin" }, { label: "B", text: "He will make you wealthy" }, { label: "C", text: "He will give you power" }, { label: "D", text: "He will make you famous" }], correctAnswer: "A", verse: "John 16:8", explanation: "When he comes, he will convict the world of guilt in regard to sin and righteousness and judgment. The Spirit convicts hearts. Conviction leads to repentance. The Spirit draws people to Christ." },
  { id: "jesus87", question: "What did Jesus say about asking in His name?", options: [{ label: "A", text: "Ask and you will receive" }, { label: "B", text: "Don't ask" }, { label: "C", text: "Ask selfishly" }, { label: "D", text: "Ask once" }], correctAnswer: "A", verse: "John 16:24", explanation: "Until now you have not asked for anything in my name. Ask and you will receive. Prayer in Jesus' name brings results. Jesus authorizes prayer. Faith accesses heaven's resources." },
  { id: "jesus88", question: "What did Jesus say about overcoming?", options: [{ label: "A", text: "You will overcome the world" }, { label: "B", text: "The world overcomes you" }, { label: "C", text: "Avoid the world" }, { label: "D", text: "Join the world" }], correctAnswer: "A", verse: "John 16:33", explanation: "In this world you will have trouble. But take heart! I have overcome the world. Jesus' victory is ours. Faith conquers circumstances. Hope sustains believers." },
  { id: "jesus89", question: "What did Jesus say about His words?", options: [{ label: "A", text: "They are temporary" }, { label: "B", text: "They are spirit and life" }, { label: "C", text: "They are confusing" }, { label: "D", text: "They are optional" }], correctAnswer: "B", verse: "John 6:63", explanation: "The Spirit gives life; the flesh counts for nothing. My words are spirit and life. Jesus' teaching is life-giving. Scripture nourishes the soul." },
  { id: "jesus90", question: "What did Jesus say about the good shepherd?", options: [{ label: "A", text: "He abandons the sheep" }, { label: "B", text: "He lays down his life for the sheep" }, { label: "C", text: "He sells the sheep" }, { label: "D", text: "He ignores the sheep" }], correctAnswer: "B", verse: "John 10:11", explanation: "The good shepherd lays down his life for the sheep. Jesus is the model shepherd. Sacrifice defines love. Jesus protects His own." },
  { id: "jesus91", question: "What did Jesus say about the vine and branches?", options: [{ label: "A", text: "Branches can live without the vine" }, { label: "B", text: "Abide in me and bear fruit" }, { label: "C", text: "Cut off all branches" }, { label: "D", text: "The vine is optional" }], correctAnswer: "B", verse: "John 15:5", explanation: "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit. Connection produces fruitfulness. Jesus is the source of life." },
  { id: "jesus92", question: "What did Jesus say about His sheep?", options: [{ label: "A", text: "They hear my voice" }, { label: "B", text: "They ignore my voice" }, { label: "C", text: "They run away" }, { label: "D", text: "They attack me" }], correctAnswer: "A", verse: "John 10:27", explanation: "My sheep listen to my voice; I know them, and they follow me. Relationship involves hearing. Jesus knows His own. Disciples recognize Jesus' voice." },
  { id: "jesus93", question: "What did Jesus say about the truth?", options: [{ label: "A", text: "I am the way, the truth, and the life" }, { label: "B", text: "Truth is relative" }, { label: "C", text: "There are many truths" }, { label: "D", text: "Truth doesn't matter" }], correctAnswer: "A", verse: "John 14:6", explanation: "I am the way and the truth and the life. Jesus is exclusive truth. Salvation comes through Jesus alone. Jesus is the ultimate reality." },
  { id: "jesus94", question: "What did Jesus say about His Father's house?", options: [{ label: "A", text: "There are many rooms" }, { label: "B", text: "There is only one room" }, { label: "C", text: "No one can enter" }, { label: "D", text: "It's empty" }], correctAnswer: "A", verse: "John 14:2", explanation: "In my Father's house are many rooms. Jesus prepares places for believers. Heaven has room for all. Jesus ensures eternal dwelling." },
  { id: "jesus95", question: "What did Jesus say about love?", options: [{ label: "A", text: "Greater love has no one than this: to lay down one's life for one's friends" }, { label: "B", text: "Love is optional" }, { label: "C", text: "Love is weak" }, { label: "D", text: "Love is temporary" }], correctAnswer: "A", verse: "John 15:13", explanation: "Greater love has no one than this: to lay down one's life for one's friends. Jesus demonstrated ultimate love. Sacrifice defines true love. Jesus' death shows perfect love." },
  { id: "jesus96", question: "What did Jesus say about the Comforter?", options: [{ label: "A", text: "I will ask the Father, and he will give you another advocate" }, { label: "B", text: "You don't need comfort" }, { label: "C", text: "Comfort is temporary" }, { label: "D", text: "Avoid comfort" }], correctAnswer: "A", verse: "John 14:16", explanation: "I will ask the Father, and he will give you another advocate to help you and be with you forever. The Spirit comforts believers. Jesus provides ongoing help. The Spirit continues Jesus' presence." },
  { id: "jesus97", question: "What did Jesus say about peace?", options: [{ label: "A", text: "Peace I leave with you; my peace I give you" }, { label: "B", text: "Peace is impossible" }, { label: "C", text: "Peace comes from wealth" }, { label: "D", text: "Avoid peace" }], correctAnswer: "A", verse: "John 14:27", explanation: "Peace I leave with you; my peace I give you. Not as the world gives. Jesus gives supernatural peace. Peace guards hearts and minds. Jesus' peace transcends circumstances." },
  { id: "jesus98", question: "What did Jesus say about the Father's love?", options: [{ label: "A", text: "The Father loves you because you have loved me" }, { label: "B", text: "The Father hates you" }, { label: "C", text: "The Father is indifferent" }, { label: "D", text: "Love is one-way" }], correctAnswer: "A", verse: "John 16:27", explanation: "The Father himself loves you because you have loved me. God's love responds to faith in Jesus. Relationship with Jesus brings Father's love. Love flows through Christ." },
  { id: "jesus99", question: "What did Jesus say about His words abiding?", options: [{ label: "A", text: "If you abide in me and my words abide in you" }, { label: "B", text: "Words don't matter" }, { label: "C", text: "Words are temporary" }, { label: "D", text: "Forget my words" }], correctAnswer: "A", verse: "John 15:7", explanation: "If you remain in me and my words remain in you, ask whatever you wish, and it will be done for you. Jesus' words empower prayer. Scripture transforms life. Abiding brings fruitfulness." },
  { id: "jesus100", question: "What is Jesus' ultimate purpose?", options: [{ label: "A", text: "To bring division" }, { label: "B", text: "To save the world" }, { label: "C", text: "To judge the world" }, { label: "D", text: "To destroy the world" }], correctAnswer: "B", verse: "John 3:17", explanation: "God did not send his Son into the world to condemn the world, but to save the world through him. Salvation defines Jesus' mission. Jesus came to rescue humanity. Love motivated the incarnation." }
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function JesusTriviaPage() {
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
        
        // Fetch user's progress for jesus questions
        const { data: progressData, error } = await supabase
          .from('trivia_question_progress')
          .select('question_id, is_correct')
          .eq('user_id', user.id)
          .eq('book', 'jesus');

        if (error) {
          console.error('Error fetching trivia progress:', error);
        }

        // Filter out correctly answered questions
        const answeredCorrectly = new Set(
          (progressData || [])
            .filter(p => p.is_correct)
            .map(p => p.question_id)
        );

        const availableQuestions = ALL_QUESTIONS.filter(q => !answeredCorrectly.has(q.id));
        
        // If no questions left, show all questions (allow review)
        const questionsToUse = availableQuestions.length > 0 ? availableQuestions : ALL_QUESTIONS;
        
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
      setCorrectCount(prev => prev + 1);
    }

    if (userId) {
      try {
        // Get username
        const { data: { user } } = await supabase.auth.getUser();
        let username = "User";
        if (user) {
          const meta: any = user.user_metadata || {};
          username = meta.firstName || meta.first_name || (user.email ? user.email.split("@")[0] : null) || "User";
        }

        // Insert into master_actions via server-side API (uses service role)
        console.log('Making API call to record trivia answer:', { userId, questionId: currentQuestion.id, username, isCorrect, book: 'jesus' });
        const response = await fetch('/api/trivia-answer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            questionId: currentQuestion.id,
            username,
            isCorrect,
            book: 'jesus'
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Failed to record trivia answer:', response.status, errorText);
        } else {
          console.log('Successfully recorded trivia answer');
        }

        // Increment profile_stats.trivia_questions_answered
        const { data: currentStats } = await supabase
          .from('profile_stats')
          .select('trivia_questions_answered')
          .eq('user_id', userId)
          .single();
        
        if (currentStats) {
          await supabase
            .from('profile_stats')
            .update({
              trivia_questions_answered: (currentStats.trivia_questions_answered || 0) + 1
            })
            .eq('user_id', userId);
        }
      } catch (error) {
        console.error("Error tracking trivia question:", error);
      }
    }

    if (!currentQuestion.verseText) {
      setLoadingVerseText(true);
      try {
        const verseText = await fetchVerseText(currentQuestion.verse);
        setQuestions(prev => {
          const updated = [...prev];
          updated[currentQuestionIndex] = { ...updated[currentQuestionIndex], verseText };
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
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsFlipped(false);
    } else {
      setShowResults(true);
    }
  };

  const getEncouragementMessage = (score: number) => {
    if (score === 10) return "Perfect! You're a Jesus expert!";
    if (score >= 8) return "Excellent! You know Jesus well!";
    if (score >= 6) return "Good job! Keep studying Jesus!";
    if (score >= 4) return "Nice try! Jesus has much to reveal!";
    return "Keep learning! Every question brings you closer to Jesus!";
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-6xl mb-4">✝️</div>
        <p className="text-gray-600">Loading questions...</p>
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
              href="/bible-trivia/jesus"
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
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
            }}
          >
            <div
              className="w-full bg-white rounded-2xl shadow-lg p-8"
              style={{
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(0deg)"
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
                transform: "rotateY(180deg)"
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