
// Script to seed "The Disciples of Jesus" devotional with all 21 days
// Run with: npx tsx scripts/seed-disciples-of-jesus.ts
console.log("🔍 Executing: scripts/seed-disciples-of-jesus.ts");

// Load environment variables from .env or .env.local file
import dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({ path: resolve(process.cwd(), '.env') });
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Missing environment variables!");
  console.error("");
  console.error("Required variables:");
  console.error("  SUPABASE_URL=https://your-project-id.supabase.co");
  console.error("  SUPABASE_SERVICE_ROLE_KEY=your-service-role-key");
  console.error("");
  console.error("Create a .env file in the project root (or add to .env.local)");
  console.error("Get these values from: Supabase Dashboard → Project Settings → API");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

function parseBibleReading(reference: string): { book: string; chapter: number } {
  const match = reference.match(/^(\d+\s+)?([A-Za-z]+)\s+(\d+):/);
  if (match) {
    const book = match[1] ? `${match[1].trim()} ${match[2]}` : match[2];
    const chapter = parseInt(match[3], 10);
    return { book: book.trim(), chapter };
  }
  return { book: "Matthew", chapter: 4 };
}

interface DevotionalDay {
  day_number: number;
  day_title: string;
  devotional_text: string;
  bible_reading_reference: string;
  reflection_question: string | null;
}

const devotionalDays: DevotionalDay[] = [
  // ─────────────────────────────────────────────
  // PART 1 — FOUNDATIONS
  // ─────────────────────────────────────────────
  {
    day_number: 1,
    day_title: "What Is a Disciple?",
    devotional_text: `Before we can talk about twelve specific men, we need to understand what they were.

Not just what they did. Not just who they followed.

We need to understand what kind of person a disciple actually is. Because this word gets thrown around constantly in church, in Christian books, in conversations about faith — and most people have never stopped to ask what it actually means.

So let's start there.

The word disciple in the New Testament comes from the Greek word mathetes. It simply means a learner. A student. Someone who follows a teacher not just to gather information, but to be shaped by them — to become like them.

That detail matters.

In the ancient world, discipleship wasn't about attending a class. It wasn't about taking notes and going home unchanged. When a student attached themselves to a rabbi, to a teacher, they were committing to something total. They left their old life. They followed him everywhere. They watched how he prayed, how he handled conflict, how he read the Scriptures. They ate with him, traveled with him, stayed up late with him.

The goal wasn't just to know what the teacher knew. The goal was to become who the teacher was.

Rabbi Jesus operated the same way. Only He did it differently from every other rabbi of His time.

Notice something important. In Jewish culture, students chose their rabbis. You applied to follow a teacher. If the rabbi thought you were worthy, he might accept you. If not, you went back to your trade — fishing, tax collecting, farming — whatever your family did. Most young men never made the cut.

But Jesus reversed everything.

He didn't wait for people to come to Him with their credentials. He went to them. He walked up to fishermen casting nets and tax collectors counting coins and said two words: "Follow me."

That's it.

No interview. No test. No checklist of qualifications.

He picked people the religious establishment had already passed over. Ordinary people. People who'd already accepted that they weren't going to make it as a rabbi's student. And He looked at them and said — you're who I want.

That's staggering. It should stop you cold.

Jesus didn't build His movement on the most polished, most educated, most theologically trained people He could find. He built it on ordinary people who were willing to follow Him.

But following Him meant something. It wasn't passive. It wasn't just believing certain things while your life stayed exactly the same.

Matthew 4:20 records that when Jesus called Simon and Andrew, they "immediately left their nets and followed him." Immediately. Not after thinking it over for a week. Not after sorting out their finances. They left their livelihood on the spot.

That kind of following required total trust.

A disciple wasn't someone who admired Jesus from a safe distance. A disciple was someone whose whole life got reorganized around Jesus — around His priorities, His values, His mission, His way of seeing the world.

Here's where it connects to you.

Jesus still says the same two words today. Follow me. Not believe me from a distance. Not add me to your life like an app on a phone. Follow. Which means moving in the same direction. Which means being shaped. Which means your life starts to look different.

This is the question underneath everything we're going to study for the next 21 days:

Are you a fan of Jesus, or are you a disciple?

Fans cheer from the stands. Disciples are on the field.

Fans like the idea of Jesus. Disciples let His ideas change how they actually live.

Over the coming days, we're going to meet twelve specific men who answered His call. Some answered well. Some stumbled badly. One betrayed Him.

But all twelve were chosen. All twelve were changed. And their story has something to say about yours.`,
    bible_reading_reference: "Matthew 4:18-22",
    reflection_question: "In your own honest assessment, are you more of a fan of Jesus or a disciple? What's one area of your life that hasn't yet been reorganized around Him?",
  },
  {
    day_number: 2,
    day_title: "Why Jesus Chose Disciples",
    devotional_text: `Yesterday we talked about what a disciple is — a learner who follows so closely they begin to look like the one they're following.

Today we need to ask the next question: why did Jesus choose disciples at all?

Think about it. Jesus is God in the flesh. He could have done anything. He could have written the gospel in the sky. He could have spoken to every person on earth simultaneously. He could have established His kingdom through miracles alone, going from town to town, healing thousands, and leaving people in awe.

But He didn't build His movement that way.

He chose twelve people. Invested three years into them. And then sent them out.

That was the plan.

Now, there's a moment in Mark 3 that gives us a window into exactly why Jesus did this. The chapter opens with crowds pressing in on Him from everywhere. News about His healing was spreading fast. People were coming from Galilee, Judea, Jerusalem, the region across the Jordan — thousands of people, all pressing toward Him, all wanting something.

And in the middle of all that chaos, Jesus does something deliberate.

Mark 3:13 says, "Jesus went up on a mountainside and called to him those he wanted, and they came to him."

He went up. Away from the crowd. He called specific people.

Then look at what He does: "He appointed twelve that they might be with him and that he might send them out to preach and to have authority to drive out demons."

That sentence holds everything.

With him. And then sent out.

First with. Then sent.

Jesus didn't just want workers for a task. He wanted people who had been with Him. Who had learned how He thought. Who had watched how He treated people — the sick, the outcast, the children, the sinners, the religious leaders who despised Him.

The being with came before the being sent.

This is a pattern that goes back through the entire Bible. Moses was trained in the wilderness for forty years before he stood in front of Pharaoh. David tended sheep alone for years before he wore a crown. The disciples spent three years in daily proximity to Jesus before they went out to preach to thousands.

God always prepares before He sends.

But notice something else. Jesus gave them authority. He didn't just send them with a message — He sent them with power. They were extensions of His ministry. His mission was multiplying through them.

That's the strategy. One man couldn't be everywhere. But twelve men, shaped by Him, sent by Him, could carry what He started to every corner of the world.

And they did. This handful of ordinary people from a backwater province of the Roman Empire turned the world upside down. The book of Acts opens with 120 believers. By the end, the gospel had reached Rome, the capital of the empire. Within three centuries, Christianity would be the official religion of that same empire.

All from twelve.

Here's what that means for you.

Jesus is still building His movement the same way — not through spectacular divine interventions from the sky, but through people who have been with Him and are then sent out. Through people who pray, read, serve, love, give, and live in ways that show the world who He is.

You are part of that strategy. Your ordinary, imperfect, complicated life is not too small for His purposes.

He's still going up on that mountainside. He's still calling to him those He wants.

The question is whether you're listening.`,
    bible_reading_reference: "Mark 3:13-19",
    reflection_question: "What would it look like in your life to spend more time being with Jesus before you try to do things for Jesus? What's one practical way you could create that space?",
  },
  {
    day_number: 3,
    day_title: "Following Jesus vs. Just Believing",
    devotional_text: `There is a difference between believing in Jesus and following Jesus.

This sounds controversial. But stick with it.

The New Testament makes a distinction that modern Christianity often blurs. And it's not a small difference. It's the difference between a faith that changes you and a faith that only comforts you.

James 2:19 says, "You believe that there is one God. Good! Even the demons believe that — and shudder."

That verse should hit hard. The demons believe. They have correct theology about who Jesus is. They knew Him by name — you can see it in the Gospels when they cried out, "What do you want with us, Jesus of Nazareth?" They didn't argue about His identity. They knew.

But they weren't following Him. They were still aligned with darkness. Belief alone hadn't changed anything for them.

Now look at what Jesus said in Luke 9:23: "Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me."

Deny yourself. Take up your cross. Follow.

Those are active, daily, costly words.

Denying yourself means letting Jesus define your agenda instead of you. It means when what you want and what He wants are in conflict — His way wins. That doesn't happen automatically. That's a choice made over and over again.

Taking up your cross is even sharper. In the first century, people who carried crosses were on their way to die. When Jesus said take up your cross, every person in that crowd understood exactly what that image meant. He wasn't talking about your difficult coworker or your bad knee. He was talking about total surrender. Dying to the self-centered life so that something new could live.

And then follow. Present tense. Ongoing. Not a one-time decision at an altar but a direction your life moves every day.

This is why the very first followers of Jesus weren't called Christians. They were called people of "the Way." That's a movement word. A direction word. You're going somewhere. You're becoming something.

Here's why this matters so much for our study of the disciples.

The twelve men we're about to spend time with didn't just believe a list of things about Jesus. They left things behind. They followed Him into difficult places. They listened when He taught things they didn't understand. They watched when He did things they couldn't explain. They argued with each other about who was greatest. They fell asleep when they should have been praying. They ran away when He was arrested.

And then, after the resurrection, they were so transformed that most of them died rather than stop talking about Him.

That's what following produces. Not perfection. Not smooth, unbothered lives. But transformation. Growth. A life that keeps moving in the direction of Jesus even when it's hard.

The disciples were not extraordinary people who did extraordinary things for an extraordinary God. They were ordinary people who followed closely enough that His extraordinary life started working through their ordinary ones.

That's still the invitation.

Not: believe these things and you're set.

But: follow Me, and watch what happens to you.`,
    bible_reading_reference: "Luke 9:23-26",
    reflection_question: "What's one thing you currently believe about Jesus that hasn't yet changed the way you live? What would it look like to close that gap?",
  },
  {
    day_number: 4,
    day_title: "After Jesus Died and Rose Again",
    devotional_text: `Friday was the worst day in the disciples' lives.

Everything they had given up — their boats, their tax tables, their futures — it had all been for Him. Three years of watching miracles. Three years of hearing teachings that nobody else taught like that. Three years of believing, in their bones, that this was the man who would restore Israel, overthrow Roman oppression, and establish God's kingdom.

And now He was dead. Killed by the people they thought He had come to defeat.

Luke 24 opens in the dark. "On the first day of the week, very early in the morning, the women took the spices they had prepared and went to the tomb."

They were going to finish the burial properly. They were going to do the last thing they could do for a man they'd thought would change everything. The spices were a kindness. They were also a goodbye.

But the stone was rolled away. The tomb was empty.

And two men in shining clothes appeared and said words that cracked the world open:

"Why do you look for the living among the dead? He is not here; he has risen!"

He is not here. He has risen.

This is the hinge of everything. The resurrection is not a theological postscript. It is the entire point. Without the resurrection, the disciples have a dead hero. Without the resurrection, Christianity is just a philosophy. Without the resurrection, nothing that follows makes any sense — not the growth of the early church, not the willingness of these men to die for what they'd witnessed, not the transformation of someone like Paul who went from executing Christians to being executed for being one.

Notice something important. The disciples didn't immediately get it.

When the women came back and told the eleven what they'd seen, Luke records: "They did not believe the women, because their words seemed to them like nonsense."

Like nonsense.

These were men who had watched Jesus raise Lazarus from the dead. Who had seen blind eyes opened and lepers cleansed. And still, when confronted with His own resurrection, their first reaction was — that's crazy. That can't be real.

The resurrection was so far beyond their framework that even eyewitness testimony from people they trusted couldn't break through at first.

That matters because it tells you the resurrection wasn't wishful thinking. These men weren't predisposed to believe it. They didn't invent it out of grief. They were as hard to convince as any skeptic you'll ever meet.

But then Jesus appeared. To Mary Magdalene in the garden. To two disciples on the road to Emmaus, who didn't recognize Him until He broke bread with them and then vanished from their sight. To Peter alone. To the eleven together in a locked room where He showed them His hands and feet and said "Touch me. I am not a ghost."

He appeared for forty days. Teaching. Explaining. Opening their minds to understand the Scriptures. Showing them that everything Moses had written, everything the prophets had spoken, everything the Psalms had described — it had all been pointing to Him.

This is where the disciples are remade.

The men who had run away on Thursday night, who had denied knowing Him, who had hidden behind locked doors — those same men walked out of the upper room fifty days later and preached to thousands with a boldness nothing could stop.

The resurrection didn't just confirm Jesus. It transformed them.

It can still do that. Not as a historical fact to believe. But as a living reality to build your life on.

He is not here. He has risen.

That's not the end of the story. It's the beginning of ours.`,
    bible_reading_reference: "Luke 24:1-12",
    reflection_question: "How does the resurrection practically change the way you live right now — not just what you believe, but how you make decisions, face fear, and treat others?",
  },
  {
    day_number: 5,
    day_title: "The Great Commission",
    devotional_text: `Before He ascended, Jesus gave His disciples one last instruction.

This is the moment that defines everything that follows — for them, and for every follower of Jesus since.

Matthew 28:16 sets the scene: "Then the eleven disciples went to Galilee, to the mountain where Jesus had told them to go."

Eleven. Not twelve. Judas was gone. This small, damaged, still-confused group of men climbed a mountain in Galilee to meet the risen Jesus one final time.

And Matthew records something that we usually skip past: "When they saw him, they worshiped him; but some doubted."

Some doubted. Right there, at the moment of the Great Commission. Right there, in the presence of the resurrected Christ, some of them still had questions. Some still wrestled with whether this was real.

That detail matters.

Jesus didn't wait until every single one of them had perfect faith before He gave them the mission. He met them in their doubt and commissioned them anyway. The Great Commission was not handed to people who had it all figured out.

It was handed to people who were still learning, still processing, still unsure — but who had shown up.

Then Jesus said these words:

"All authority in heaven and on earth has been given to me. Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you."

Every word in that sentence carries weight.

All authority. Jesus wasn't speaking as one rabbi among many. He wasn't making a suggestion. He was speaking as the one who held all authority in every dimension of reality. Heaven and earth both belong to Him. That's the foundation for everything He's about to say.

Therefore go. Because of His authority — not their own credentials, not their own power, not their cleverness — they could go anywhere and do this. The authority wasn't theirs. It was His, working through them.

Make disciples. Not converts. Not church members. Not people who say a prayer and then go back to their lives unchanged. Disciples. People being shaped. People learning to obey. People being transformed from the inside out.

Of all nations. This is enormous. The disciples were Jewish men. Their whole world had been Israel. Now Jesus was saying — everyone. Every ethnicity, every language, every culture, every nation. The walls that divided people were coming down. The gospel wasn't for one people group. It was for every person alive.

Baptizing them. Baptism was the public, visible declaration of belonging to Jesus — of crossing from one kind of life to another.

Teaching them to obey. Not just teaching them information. Teaching them obedience. Following Jesus means actually doing what He said.

And then the last words of Matthew's gospel: "And surely I am with you always, to the very end of the age."

I am with you always.

Not "I was with you." Not "I will be with you someday." Always. Present tense. Ongoing.

The commission He gave them was impossible by human standards. Twelve ordinary people, go change the entire world? But the commission came with a promise: you won't be doing this alone.

This is still your mission.

If you follow Jesus, the Great Commission isn't something that applied to the original twelve and then expired. It applies to you. You are a link in the chain that started on that mountain in Galilee.

You were made a disciple so that you could help make disciples.

That's what the next two weeks of this study is building toward. We're going to look at each of the twelve men, see who they were, what they did, where they went. And in Part 3, we'll see what happened after Jesus left — and what it all means for you today.`,
    bible_reading_reference: "Matthew 28:16-20",
    reflection_question: "The Great Commission is still active. In your everyday life — your relationships, your workplace, your neighborhood — how are you currently participating in it? Where could you do more?",
  },

  // ─────────────────────────────────────────────
  // PART 2 — THE DISCIPLES
  // ─────────────────────────────────────────────
  {
    day_number: 6,
    day_title: "Peter — The Rock Who Cracked",
    devotional_text: `If you had to pick the most famous disciple, most people would pick Peter.

And honestly, that makes sense. He's everywhere in the Gospels. He's the loudest. The most impulsive. The most dramatic. He's the one who always seems to be doing something — right or wrong.

Peter's real name was Simon. Jesus gave him the nickname Peter, which comes from the Greek word petros — rock. In Aramaic, the language Jesus likely spoke, the equivalent was Cephas.

Rock. That's what Jesus called him.

That name is either the most ironic or the most hopeful thing in the New Testament, depending on how you look at it.

Because Peter is many things throughout the Gospels. But rock-solid? Not exactly. Not yet.

He was a fisherman from Bethsaida, working a boat on the Sea of Galilee with his brother Andrew. When Jesus called him, Peter left immediately. He didn't hesitate.

And from the start, Peter was the one who leaned in the hardest.

When Jesus walked on water, it was Peter who jumped out of the boat to walk toward Him. Nobody else did that. The other eleven stayed in the boat and watched. But Peter, impulsive, all-or-nothing Peter, climbed over the side and stepped onto the waves.

He walked on water. That actually happened.

Then he looked at the storm around him, and he sank.

That is Peter in one scene.

The boldness is real. The faith is real. And the fear comes crashing in right behind it.

Matthew 16 is the peak of Peter's confidence. Jesus asks the disciples who people say He is. They give various answers — John the Baptist, Elijah, one of the prophets. Then Jesus makes it personal: "But what about you? Who do you say I am?"

Peter answers without hesitation: "You are the Messiah, the Son of the living God."

That's the greatest confession in the Gospel of Matthew.

Jesus says, "Blessed are you, Simon son of Jonah, for this was not revealed to you by flesh and blood, but by my Father in heaven. And I tell you that you are Peter, and on this rock I will build my church."

On this rock. You. Peter. You are the foundation of what I'm building.

Six verses later, Jesus predicts His coming death, and Peter — the same Peter who just made the great confession — grabs Jesus by the arm and says, "Never, Lord! This shall never happen to you!"

And Jesus says to him: "Get behind me, Satan!"

That fast. From greatest confession to acting as a mouthpiece for the enemy. In the same paragraph.

That is Peter.

But the worst moment comes in the courtyard on the night Jesus was arrested.

Earlier that same night, Peter had declared: "Even if all fall away on account of you, I never will." And then: "Even if I have to die with you, I will never disown you."

By morning, he had denied knowing Jesus three times. The third time, a rooster crowed, and Luke 22:61 says that Jesus turned and looked straight at Peter.

He looked straight at him.

And Peter went outside and wept bitterly.

That moment would have destroyed most people.

But look what happens after the resurrection. Jesus appears to the disciples on the shore of the Sea of Galilee — the same sea where He had first called Peter. He makes breakfast. And then He asks Peter the same question three times: "Do you love me?"

Three times. Once for each denial.

And three times Peter says yes. And three times Jesus says the same thing: feed my sheep. Take care of my lambs. Tend my flock.

The man who had cracked was being restored. The rock that had shattered was being set back in place.

Peter goes on to preach the sermon at Pentecost where three thousand people come to faith in a single day. He heals a lame man at the temple gate. He plants churches. He writes two of the letters in the New Testament. Church tradition says he was eventually crucified upside down in Rome — because he didn't feel worthy to die in the same way as Jesus.

The cracked rock became the foundation.

That's what Jesus does with broken people.`,
    bible_reading_reference: "Matthew 16:13-23",
    reflection_question: "Peter's greatest failure happened right after his greatest declaration. Where in your life are you most vulnerable to pride right before a fall? How can you stay humble and watchful?",
  },
  {
    day_number: 7,
    day_title: "Andrew — The First and the Forgotten",
    devotional_text: `Andrew doesn't get nearly as much ink as his brother Peter. That much is obvious.

If you're reading through the Gospels, Peter is everywhere. James and John have their own dramatic moments. Even Judas gets significant attention. But Andrew?

Andrew is mostly mentioned in lists.

And that might be the most important thing about him.

Andrew was the first disciple Jesus called. He has that distinction. John 1 tells us that Andrew was originally a follower of John the Baptist. He'd already been seeking, already pursuing God, already committed enough to leave his fishing life and follow a prophet into the wilderness to hear his teaching.

One day John the Baptist pointed at Jesus walking by and said: "Look, the Lamb of God."

Andrew left John and started following Jesus. He spent the day with Him — we don't know exactly what was said in those hours — and then he went straight to his brother Simon and said: "We have found the Messiah."

First words of witness in the New Testament. Andrew didn't hoard the news. He ran to share it with the most important person in his life.

That's Andrew's defining move throughout the Gospels. He finds people and brings them to Jesus.

In John 6, when Jesus feeds the five thousand, it's Andrew who finds the boy with the five loaves and two fish. Everyone else is looking at the size of the problem — five thousand people, no food. Andrew is looking for solutions. He finds the boy. He brings him to Jesus.

He doesn't know it will be enough. He even says, "how far will they go among so many?" He had doubts too. But he brought what he found to Jesus and let Jesus work with it.

In John 12, some Greek visitors come to Philip wanting to see Jesus. Philip isn't sure what to do — these are Gentiles, outsiders. So he goes to Andrew. And Andrew brings them to Jesus.

Again. Always bringing people to Jesus.

Notice the pattern. Andrew never performs a recorded miracle. He never gives a famous speech that gets thousands of words in the Gospel accounts. He's never named as the spokesman. He never gets the moment on top of the mountain with Jesus.

But every single time he appears, he's connecting someone to Jesus.

The boy with the loaves. His own brother Peter. The Greeks who wanted access.

If you want to understand Andrew's legacy, understand this: Peter's preaching at Pentecost — the sermon that brought three thousand people to faith — would never have happened if Andrew hadn't introduced Peter to Jesus first.

The person who introduces the person who changes thousands isn't usually remembered. But their fingerprints are all over the fruit.

Andrew was a connector. A bridge builder. A person who understood that his job wasn't to be the most prominent — it was to get people in the room with Jesus.

Church tradition says Andrew eventually went to Greece and the region around modern-day Turkey, preaching the gospel. He was reportedly martyred on an X-shaped cross in the Greek city of Patras — a cross shape now known as St. Andrew's Cross, which is still on the flag of Scotland, where he is the patron saint.

The first disciple. Not the most famous. But faithful all the way to the end.

Here's what Andrew teaches us: you don't have to be prominent to be powerful. You don't have to be the most visible person in the room to have the most lasting impact.

Sometimes the most important thing you can do is introduce the right person to Jesus — and then get out of the way.

Who in your life are you still waiting to bring to Jesus?`,
    bible_reading_reference: "John 1:35-42",
    reflection_question: "Andrew's whole ministry was built on connection — bringing people to Jesus. Who in your life has not yet met Jesus, and what's one step you could take this week to change that?",
  },
  {
    day_number: 8,
    day_title: "James — The First to Die",
    devotional_text: `James is one of a pair.

Throughout the Gospels, he's almost always mentioned alongside his brother John. The two of them were fishing partners in their father Zebedee's business on the Sea of Galilee when Jesus called them. Like Peter and Andrew, they left immediately. Mark 1:20 says they left their father — with the hired workers, still in the boat — and followed Jesus.

That's a significant thing to leave behind. Not just a job. Their father. Their family enterprise. Their future.

But they left.

Jesus gave James and John a nickname early on: Boanerges. Sons of Thunder.

That nickname wasn't accidental. It described their personality exactly.

In Luke 9, Jesus and the disciples are traveling through Samaria. A Samaritan village refuses to welcome them — the Jews and Samaritans had a long, bitter history of hostility, and the village had no interest in hosting a Jewish rabbi heading toward Jerusalem.

James and John's response?

"Lord, do you want us to call fire down from heaven to destroy them?"

Fire from heaven. That was their first instinct. Not — let's talk to them. Not — let's pray for them. Destroy them.

Jesus rebuked them. He rebuked them for this more than once, actually. In Luke 9:55, He simply turns and says: you don't know what spirit you are of.

That's a sharp word. You don't know what's actually driving your reaction here.

Then in Mark 10, James and John come to Jesus with a request. They ask to sit at His right hand and left hand in His glory — the two most powerful positions of honor in His coming kingdom.

The other disciples hear about it and get angry at them. Not because it was wrong to want honor — they all wanted honor. They were angry because James and John had tried to get ahead of them.

Jesus gathers them all and says something that reorders everything: "Whoever wants to become great among you must be your servant, and whoever wants to be first must be slave of all. For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many."

James heard that. He heard it clearly.

Because something changed in him.

Acts 12:1-2 records the death of James in two sentences: "It was about this time that King Herod arrested some who belonged to the church, intending to persecute them. He had James, the brother of John, put to death with the sword."

Two sentences. The first of the twelve apostles to be martyred. Gone before Acts 12 finishes.

The man who wanted fire from heaven — the man who asked to sit at Jesus' right hand — ended up dying for the name of Jesus. He became exactly what Jesus described: the servant of all, the slave of all, the one who gave his life.

There's a tradition from Clement of Alexandria that when James was led to his execution, the man who had arrested him watched him walk to his death with such peace and courage that the man converted on the spot. He turned to James and said, "Peace to you." James said, "Peace to you also." And they were both killed together.

We don't know if that story is accurate. But it fits the trajectory of a man who spent years being shaped by Jesus — who went from calling down fire to walking into death with peace.

The Sons of Thunder didn't need to be eliminated. They needed to be redirected.

The boldness was always there. The passion was always there. The fire was real.

Jesus didn't put it out. He aimed it.`,
    bible_reading_reference: "Mark 10:35-45",
    reflection_question: "James had boldness and passion that needed to be redirected, not removed. Is there something fierce in you that God might be trying to aim rather than eliminate?",
  },
  {
    day_number: 9,
    day_title: "John — The One Jesus Loved",
    devotional_text: `John is one of the most fascinating people in the New Testament.

He was the Brother of James, one of the Sons of Thunder — which tells you he had fire in him, passion, a willingness to go to extremes. But somewhere in his years with Jesus, something settled in John that doesn't settle in most people.

He became the apostle of love.

John is the one who writes in his gospel: "A new command I give you: Love one another. As I have loved you, so you must love one another. By this everyone will know that you are my disciples, if you love one another."

He writes 1 John — one of the most intimate, tender letters in the entire New Testament — where he returns again and again to the same theme: beloved, let us love one another, for love is of God.

He writes Revelation, the most sweeping, cosmic, apocalyptic vision in Scripture — and even that is framed as a letter from the risen Jesus full of personal, specific love for His churches.

But look at how John describes himself throughout his own gospel. He never uses his own name. He refers to himself as "the disciple whom Jesus loved."

That's not arrogance. It's identity.

John didn't define himself by what he did for Jesus. He defined himself by what Jesus felt for him.

He was at the last supper, leaning against Jesus. He was at the cross — the only male disciple recorded as being there — standing with the women while all the others had fled. From the cross, Jesus looked down at John and entrusted His mother Mary to him: "Here is your mother." And from that hour, John took her into his own home.

That tells you something profound. In the moment of maximum pain, Jesus made a family arrangement. He chose the disciple who had stayed.

After the resurrection, John was one of the first to the tomb. He saw the burial cloths lying there, saw that the stone was rolled away, and John 20:8 says simply: "he saw and believed."

That's it. No fanfare. He saw it, and something clicked in him.

John goes on to be a central leader in the Jerusalem church. He and Peter work together through much of Acts. Paul mentions him in Galatians as one of the "pillars" of the church.

But here's one of the most remarkable things about John: he is the only one of the twelve apostles who tradition says did not die as a martyr. In a generation where nearly every other disciple was executed for their faith, John lived to old age.

The Roman emperor Domitian reportedly tried to execute him — the story goes that John was thrown into boiling oil and emerged unharmed. He was then exiled to the island of Patmos, where he received the visions that became the book of Revelation.

Eventually he returned to Ephesus, where tradition says he lived well into his nineties. His friends and students would carry the aged John into church gatherings where he could barely walk anymore. And when he was too weak to preach, he would simply repeat the same phrase over and over:

"Little children, love one another."

Someone once asked him why he kept saying it.

He reportedly said: "Because it is the command of the Lord, and if it alone is kept, it is enough."

The Son of Thunder, now an old man, repeating the simplest command.

Love one another.

If it alone is kept, it is enough.

John shows us that a long life with Jesus eventually simplifies everything. All the theology, all the miracles, all the journeys — they distill down to the one thing Jesus said would prove everything:

Love.`,
    bible_reading_reference: "John 13:31-35",
    reflection_question: "John defined himself not by what he did but by how Jesus felt about him — 'the disciple whom Jesus loved.' Do you primarily see yourself through that lens? How would it change you if you did?",
  },
  {
    day_number: 10,
    day_title: "Philip — Just Show Us the Father",
    devotional_text: `Philip comes from Bethsaida — the same town as Peter and Andrew.

John 1:43 records that Jesus found Philip and simply said "Follow me." That's it. No long conversation. No set of conditions. Jesus found him and said two words, and Philip followed.

But here's what Philip does next. He goes straight to Nathanael — also called Bartholomew — and says: "We have found the one Moses wrote about in the Law, and about whom the prophets also wrote — Jesus of Nazareth, the son of Joseph."

Philip is thinking in terms of Scripture. He's connecting what he's seeing to what he already knows. Moses wrote about a coming prophet. The prophets described a coming Messiah. Philip has spent time in those texts, and when he sees Jesus, something clicks: this is the fulfillment.

That's Philip's mind. Thoughtful. Making connections. Grounded in the text.

Nathanael pushes back: "Can anything good come from Nazareth?"

And Philip doesn't argue. He doesn't make a theological case. He just says: "Come and see."

That's a beautiful response. Philip didn't have all the answers. But he had enough to say — come and see for yourself.

In John 6, when the crowd of five thousand is hungry and Jesus asks Philip where they should buy bread, John notes that Jesus already knew what He was going to do — He was testing Philip to see what Philip would say.

Philip calculates. "It would take more than half a year's wages to buy enough bread for each one to have a bite."

Philip thinks in terms of resources. In terms of what's humanly possible. His first move is to add up the numbers and tell you why it can't be done.

That's not a character flaw. That's a certain kind of thinking — the kind that looks at reality honestly, that doesn't pretend problems are smaller than they are. But it also misses what Jesus is about to do, because Jesus isn't bound by what the numbers allow.

Then comes the moment that defines Philip most sharply.

It's the last supper. Jesus has just said, "I am the way and the truth and the life. No one comes to the Father except through me. If you really know me, you will know my Father as well."

And Philip says: "Lord, show us the Father and that will be enough for us."

Notice something important. That's actually a profound request. It's not wrong. Philip wants to see God. Philip wants the ultimate revelation. He's been following Jesus for three years, and his heart's deepest hunger is: show me the Father.

Jesus looks at him and says: "Don't you know me, Philip, even after I have been with you such a long time? Anyone who has seen me has seen the Father."

The answer to Philip's three-year search had been standing in front of him the whole time.

Philip had been looking past Jesus for a glimpse of the Father — and Jesus was the glimpse. Jesus was the face of the Father made visible in human form.

That moment had to be staggering for Philip to sit with.

Church tradition says Philip eventually went to Phrygia, in what is now modern Turkey, preaching the gospel. He is believed to have been martyred there — accounts vary on the manner, but all traditions agree he died for his faith.

The man who said "come and see" became someone others came to see — to see Jesus in him.

Philip teaches us that intellectual searching and sincere faith are not enemies. God isn't afraid of the person who needs to think things through, who calculates, who asks hard questions.

He just asks that you keep looking — because what you're searching for is closer than you think.`,
    bible_reading_reference: "John 14:1-11",
    reflection_question: "Philip spent three years with Jesus without fully grasping that Jesus was the face of the Father. What have you been searching for in God that might already be present in the person of Jesus — if you looked closely enough?",
  },
  {
    day_number: 11,
    day_title: "Bartholomew — The Israelite Without Deceit",
    devotional_text: `Bartholomew is one of the most mysterious figures in the Twelve.

The name Bartholomew is actually a patronymic — Bar-Tolomai, which means "son of Tolomai" or "son of Tolmai." It's a family name, not a given name. This leads most scholars to believe that Bartholomew is the same person as Nathanael, who appears in the Gospel of John while Bartholomew appears in the other three Gospels and in Acts.

In John 1, Nathanael is introduced immediately after Philip. Philip tells him about Jesus of Nazareth and Nathanael responds with that famous skepticism: "Can anything good come from Nazareth?"

But then he comes to see.

And what happens when Jesus sees Nathanael approaching is one of the most striking moments in the calling of the disciples.

Jesus says: "Here truly is an Israelite in whom there is no deceit."

That is a remarkable statement. Here is a man without pretense, without a false front, without the performance most people put on when they're around religious leaders. Nathanael is real. He says what he thinks — including his doubts about Nazareth.

And Jesus loves that about him.

Nathanael is confused. "How do you know me?"

Jesus says: "I saw you while you were still under the fig tree before Philip called you."

Now we have to understand what this meant. In Jewish culture, sitting under a fig tree was associated with prayer, with contemplation, with studying the Torah. When Jesus says He saw Nathanael under the fig tree, He wasn't just demonstrating supernatural knowledge of his physical location.

He was saying: I saw you when you were alone with God. I saw what you were doing when nobody was watching. I know who you are in private.

Nathanael's response is immediate and total: "Rabbi, you are the Son of God; you are the king of Israel."

He goes from skeptic to full confession faster than almost anyone else in the Gospels.

This is what happens when you meet someone who truly knows you.

Jesus said He had no deceit. Nathanael is the kind of person who says what he means and means what he says. His doubt is honest doubt — not cynicism, not hardness, but the kind of blunt thinking that also responds to truth directly when it shows up.

There's something in Nathanael's story for every person who has ever thought their honest questions about faith disqualified them.

Jesus didn't rebuke Nathanael's "Can anything good come from Nazareth?" He called him over and showed him.

He didn't punish the doubt. He answered it.

Then He said something breathtaking: "You will see greater things than these... you will see heaven open, and the angels of God ascending and descending on the Son of Man."

That's a reference to Jacob's dream in Genesis 28 — the vision of a ladder connecting heaven and earth with angels moving between them. God had spoken to Jacob in that dream and said, "I am with you and will watch over you."

Jesus was telling Nathanael: I am the connection point between heaven and earth. I am the ladder. I am where heaven and the human story meet.

Church tradition places Bartholomew-Nathanael in various regions — Armenia, India, Mesopotamia. He is considered the patron saint of Armenia, where tradition says he was martyred. The manner of his death varies in different traditions, but some accounts describe him being flayed alive.

The man without deceit faced his death with the same directness with which he had faced his doubts.

Honest all the way to the end.`,
    bible_reading_reference: "John 1:43-51",
    reflection_question: "Jesus honored Nathanael's honest skepticism rather than demanding polished faith. How has your own honest doubt — when you've brought it to Jesus rather than away from Him — actually deepened your faith?",
  },
  {
    day_number: 12,
    day_title: "Matthew — The One Nobody Expected",
    devotional_text: `Of all the people Jesus could have chosen, Matthew might be the most surprising.

Not because of his background in general — Jesus was already known for hanging around with sinners and outsiders. But because of what tax collectors specifically were in first-century Jewish society.

Tax collectors in Roman-occupied Israel were not just government employees. They were traitors. They were Jews who had collaborated with the Roman occupying force, taking a cut of what they collected above whatever Rome required. They were getting rich off their own people. They were considered ritually unclean. The Pharisees, when they wanted to describe the lowest category of people, said "tax collectors and sinners" as if the two were basically the same thing.

Nobody invited tax collectors to their dinner parties. Nobody wanted their children to play with a tax collector's children. Nobody thought a tax collector was going to be a leader in the coming kingdom of God.

And then Jesus walked up to Matthew's tax booth.

Matthew 9:9 is one of the shortest calling stories in the Gospels: "As Jesus went on from there, he saw a man named Matthew sitting at the tax collector's booth. 'Follow me,' he told him, and Matthew got up and followed him."

Got up. Left the money on the table. Walked away.

But here's what Matthew does next. He throws a party.

Luke 5:29: "Then Levi — Matthew's other name — held a great banquet for Jesus at his house, and a large crowd of tax collectors and sinners were eating with them."

This is worth sitting with. Matthew's first instinct when he met Jesus was to introduce all his friends — the only friends he had — to Jesus. Tax collectors. Sinners. The people no self-respecting rabbi would share a meal with.

And Jesus ate with them. He sat at their table. He passed the bread. He talked with them.

The Pharisees saw this and complained to the disciples: "Why does your teacher eat with tax collectors and sinners?"

Jesus heard them and answered: "It is not the healthy who need a doctor, but the sick. But go and learn what this means: 'I desire mercy, not sacrifice.' For I have not come to call the righteous, but sinners."

That quote — "I desire mercy, not sacrifice" — is from Hosea 6:6. Jesus pulled the Old Testament prophets right into the dining room. Ritual purity meant nothing if it came at the cost of mercy for actual people.

Matthew then goes on to write the Gospel of Matthew — the most Jewish of the four gospels, the one most concerned with showing how Jesus fulfilled every thread of the Old Testament story. The one that quotes the Hebrew Scriptures more than any other gospel. The one written by a man who understood the weight of covenant and the meaning of exile and return.

The tax collector became the theologian.

Not in spite of who he was, but perhaps because of it. Matthew knew what it felt like to be considered outside the covenant. He knew what it meant to be the person people pointed at. And when he encountered the God who crossed the room to sit with him — he had something urgent to say.

Tradition says Matthew preached the gospel in Judea and then traveled further — to Ethiopia, Persia, possibly other regions. Most traditions say he died as a martyr, though the exact manner and location are uncertain.

Matthew's story is a reminder that the people we least expect to carry the gospel are sometimes the ones God chose before we even noticed them.

He didn't choose the qualified. He qualified the chosen.`,
    bible_reading_reference: "Matthew 9:9-13",
    reflection_question: "Matthew had the most unlikely background imaginable for an apostle — and Jesus picked him anyway. What in your past do you think disqualifies you from being used by God? What does Matthew's story say to that belief?",
  },
  {
    day_number: 13,
    day_title: "Thomas — The Man Who Needed Proof",
    devotional_text: `Thomas has been defined for two thousand years by one moment.

One moment of doubt. One moment of needing evidence. And the phrase "Doubting Thomas" has stuck to him like a label ever since.

That's not fair. And it's not the whole story.

Thomas — his name in Aramaic literally means "twin" — appears in all four Gospels and in Acts, but only John records him speaking in any detail. And what John records should completely change how we see him.

The first time Thomas speaks in John's gospel is in chapter 11. Jesus has just heard that His friend Lazarus is sick and has died. Jesus tells His disciples He's going back to Judea to raise Lazarus.

The disciples are alarmed. Going back to Judea means going back near Jerusalem — where the religious leaders had just tried to stone Jesus. It's dangerous. Going back there could get them all killed.

Thomas looks at the situation, calculates the odds, and says: "Let us also go, that we may die with him."

Let us also go that we may die with him.

That's not doubt. That's courage. That's loyalty.

Thomas was willing to walk into what he believed was death so he could stand with Jesus.

The second time Thomas speaks is at the last supper. Jesus says, "You know the way to the place where I am going." Thomas says honestly: "Lord, we don't know where you are going, so how can we know the way?"

That's a fair question. A real question. Thomas isn't pretending he understands something he doesn't.

Jesus answers: "I am the way and the truth and the life."

That declaration — one of the most famous in all of Scripture — came because Thomas was honest enough to admit what he didn't know.

Then comes the famous moment. Jesus has risen and appeared to the disciples in the locked room. Thomas wasn't there. When the others tell him they've seen the Lord, Thomas says he won't believe it unless he can see the nail marks in Jesus' hands and put his hand into His side.

That's the moment that earned him the nickname.

But notice what happens next. A week later, Jesus appears again. This time Thomas is there. And Jesus walks directly to Thomas and says: "Put your finger here; see my hands. Reach out your hand and put it into my side. Stop doubting and believe."

Jesus knew exactly what Thomas had said. He had heard Thomas's conditions.

And He showed up to meet them.

Thomas looks at the risen Jesus and says: "My Lord and my God."

My Lord and my God. That is the highest confession of Jesus' identity in the entire Gospel of John. More explicit than anything Peter or any other disciple had said. The man who needed proof, when he got it, went further than anyone else.

Then Jesus says something that is easy to miss: "Because you have seen me, you have believed; blessed are those who have not seen and yet have believed."

That is a word for us. We are those people. We have not seen. We believe on the testimony of Thomas and the others.

Thomas's doubt, his demand for evidence, his honest refusal to pretend — it produced the most penetrating confession of the gospel. And it has been a gift to every believer who has ever struggled to believe things they cannot see.

Tradition is remarkably consistent that Thomas traveled further east than any other apostle — all the way to India. The ancient Thomas Christians of Kerala, India trace their origin directly to his ministry there. He is believed to have been martyred near modern-day Chennai around AD 72.

The man who went furthest in doubt went furthest in mission.`,
    bible_reading_reference: "John 20:24-29",
    reflection_question: "Thomas's honest doubt led to the deepest confession in the Gospel of John. Are you being honest with God about your doubts right now — or are you performing a faith you don't fully feel? What would it look like to bring your real questions to Jesus?",
  },
  {
    day_number: 14,
    day_title: "James Son of Alphaeus — The Other James",
    devotional_text: `There are two men named James among the twelve disciples.

James the son of Zebedee — who we met on Day 8, the first to die, the Son of Thunder. And this James — James the son of Alphaeus — who is sometimes called James the Less, or James the Younger.

That designation — James the Less or James the Younger — likely referred to his height or his age compared to the other James. Small in stature, or the younger of the two. Not a commentary on his importance.

But it is a little ironic, isn't it?

James the son of Zebedee: first to die as a martyr, given the thunder nickname, bold and dramatic. James the son of Alphaeus: we know almost nothing about him beyond his name in the four lists of the apostles.

He's there. Chosen. Sent. Part of the twelve.

And the Bible gives us almost no individual details about him.

This is worth sitting with, because we live in a culture obsessed with visibility. With platforms and profiles and metrics and who has the biggest reach. We celebrate the Peters and the Johns and the Thomases. We write books about them. We name churches after them.

But who names anything after James the son of Alphaeus?

Yet Jesus chose him. He was there. He walked with Jesus for three years. He saw the miracles. He heard the teaching in person. He was sent out with the others to preach and heal. He received the Holy Spirit at Pentecost. He was part of what turned the world upside down.

He was not invisible to the one who mattered.

There's a possibility, worth noting, that James the son of Alphaeus was related to Matthew the tax collector — Mark 2:14 refers to a "Levi son of Alphaeus" when calling Matthew, and some scholars believe Alphaeus was the father of both. If so, they were brothers — and another pair of brothers in the twelve alongside Peter and Andrew, and James and John.

But we can't be certain of that. What we can be certain of is that James was there. Chosen. Part of the inner circle of Jesus' earthly ministry. Trusted enough to be sent.

Church tradition places James the Less in various locations for his post-resurrection ministry — some traditions send him to Persia, others to Egypt, some to minister in Palestine itself. Many traditions mark him as a martyr, though the specific accounts vary.

But here's what matters most about James the son of Alphaeus:

He reminds you that the kingdom of God has always been built by faithful, ordinary people whose names you will never know.

The person who faithfully teaches Sunday school for thirty years and nobody writes a biography about them. The person who prays for their neighborhood every morning before the city wakes up. The person who works quietly behind the scenes and never once takes credit.

These people are not less important to Jesus.

They may be — in ways invisible to human eyes — the very foundation of what He is building.

James the Less. The other James. One of the twelve.

Chosen, set apart, different. Not because of what he accomplished that we can measure. But because Jesus called his name.`,
    bible_reading_reference: "Acts 1:12-14",
    reflection_question: "James son of Alphaeus was chosen by Jesus but left almost no personal record in Scripture. How do you relate to faithfulness in obscurity? Are you able to do significant things for God without needing recognition for them?",
  },
  {
    day_number: 15,
    day_title: "Thaddaeus — The One Who Asked the Question Nobody Else Asked",
    devotional_text: `Thaddaeus — also called Judas son of James, or Lebbaeus, depending on which gospel list you're reading — is another disciple who exists mostly as a name on a list.

Except for one moment.

One question at the last supper that gives us a real glimpse into who he was and what he was trying to understand.

John 14 is taking place during the final hours before Jesus is arrested. Jesus is giving His disciples some of the deepest teaching He has ever shared — about His departure, about the Holy Spirit who is coming, about the nature of His relationship with the Father.

He says: "Whoever has my commands and keeps them is the one who loves me. The one who loves me will be loved by my Father, and I too will love them and show myself to them."

And then — in John 14:22 — Thaddaeus asks a question that nobody else thought to ask:

"But, Lord, why do you intend to show yourself to us and not to the world?"

That is a genuinely good question.

If Jesus is the Messiah — the King of Israel, the hope of the nations — why would He appear to just this small group of followers and not to everyone? Why not a public, undeniable demonstration? Why not show up in the temple court or in the Roman forum? Why reveal yourself to twelve ordinary people instead of to Caesar and the Sanhedrin?

This is the question of hiddenness. Why does God operate this way — personally, quietly, through relationship, rather than with power that eliminates all doubt?

Jesus' answer is profound: "Anyone who loves me will obey my teaching. My Father will love them, and we will come to them and make our home with them."

The world doesn't receive this revelation because the world doesn't love or obey. God doesn't impose Himself through force on people who have rejected Him. He makes His home with those who have opened the door.

The intimacy of God is reserved for relationship. Not performance. Not power displays. Relationship.

Thaddaeus asked the right question. He wanted to understand the logic of God. Why this way? Why so personal, so relational, so hidden from the powerful?

The answer is still the answer: because God is after your heart, not your compliance.

He could compel everyone to believe. He could overwhelm every objection with undeniable proof. But compelled belief isn't love. Overwhelmed objection isn't trust.

He wants you to come to Him willingly. To open the door. To make room for Him.

That's why He revealed Himself to twelve disciples instead of Caesar. Because twelve people who genuinely loved Him and obeyed Him would reshape the world more permanently than a power demonstration that forced everyone to their knees.

Church tradition takes Thaddaeus to Persia, to Armenia, to Mesopotamia. Many traditions say he ministered alongside Simon the Zealot. He is believed to have died as a martyr, though accounts of how and where vary.

One question. One profound answer. And a man who carried it to the ends of the earth.

Never underestimate the person in the room who asks the quiet, penetrating question nobody else thought to ask. Sometimes they're the ones who understand most deeply.`,
    bible_reading_reference: "John 14:21-24",
    reflection_question: "Thaddaeus asked why God works through intimate relationship rather than public power. Does the hiddenness of God ever frustrate you — and what does Jesus' answer say to that frustration?",
  },
  {
    day_number: 16,
    day_title: "Simon the Zealot — The Unlikely Companion",
    devotional_text: `Of all the twelve disciples, Simon the Zealot might be the one whose calling is most personally striking — because of what sits right next to his name on the list.

Matthew.

Simon was a Zealot. In first-century Jewish Palestine, Zealots were a revolutionary movement — people who believed the only way to restore Israel was through violent resistance against Rome. They didn't just oppose Roman occupation politically. They opposed it with daggers. The Zealots were known for targeted killings of Roman soldiers and their Jewish collaborators.

Collaborators.

Like tax collectors.

Simon the Zealot would have had reasons — ideological, political, and perhaps personal reasons — to view Matthew the tax collector as a traitor. An enemy. Someone who had sold out Israel to the occupying empire.

And yet both of them are in the twelve.

Both of them ate at the same table with Jesus. Both of them walked the same dusty roads. Both of them heard the same Sermon on the Mount, watched the same miracles, stayed in the same homes.

The same Jesus called both of them. And the same Jesus expected them to be brothers.

That is astonishing when you think about it.

Notice something important here. Jesus didn't build His movement by finding people who were already easy to be around. He brought together people who had every reason to despise each other — and He made them family.

This isn't a small thing. This is the nature of the kingdom.

In Galatians 3:28, Paul writes: "There is neither Jew nor Gentile, neither slave nor free, nor is there male and female, for you are all one in Christ Jesus."

The reconciliation that Jesus accomplishes isn't just between people and God. It's between people and people. The walls come down. The categories that organize human hostility — racial, political, economic — lose their ultimate power inside the community that Jesus builds.

Simon had to look at Matthew every single day and choose not to see him as a traitor. Matthew had to look at Simon every single day and choose not to see him as a terrorist.

They both had to see something more important than their differences: they were both loved by the same Jesus. They were both equally chosen. They were both equally unworthy.

That is the only ground that makes peace possible between people who have real reasons for hostility.

Simon was probably known as the Zealot to distinguish him from the better-known Simon Peter. His party affiliation had become part of his name.

But his story shows something crucial: Jesus redeems your zeal. He doesn't strip you of your passion. He redirects it.

Simon had fire in him. Conviction about justice, about liberation, about the nation of God's people. That fire didn't go out. It just got aimed at something larger and more permanent than Rome — at the proclamation of the kingdom that no empire could stop.

Church tradition, largely consistent on this point, pairs Simon with Thaddaeus in his missionary travels — to Persia, to Armenia, to the regions around the Caspian Sea. Both are traditionally considered martyrs.

The Zealot who once may have killed for his nation died for the name of the One who made his nation and every nation.`,
    bible_reading_reference: "Luke 6:12-16",
    reflection_question: "Simon the Zealot and Matthew the tax collector were brought together by Jesus despite having every reason for hostility. Is there someone in your life whose background, politics, or choices make them hard to sit with? What would it look like to see them the way Jesus sees them?",
  },
  {
    day_number: 17,
    day_title: "Judas Iscariot — The Betrayer",
    devotional_text: `Every list of the twelve disciples ends the same way.

Judas Iscariot. Who betrayed him.

That's how Matthew, Mark, and Luke all close the list. Not "Judas Iscariot, who struggled with faith." Not "Judas Iscariot, who later repented." Who betrayed him.

That's his identity in history. That's what he's remembered for.

But the story of Judas is more unsettling than a simple story of a villain.

Because Judas was chosen by Jesus.

He wasn't an infiltrator. He wasn't a spy who embedded himself in the group undetected. Jesus knew him. Jesus looked at him and said "follow me" just like He said it to the others. Jesus sent him out with the other eleven to preach and heal. Jesus gave him authority over unclean spirits.

And Jesus entrusted him with the common purse — the money that supported the group.

Jesus knew what Judas would do. John 6:64 makes this explicit: "For Jesus had known from the beginning which of them did not believe and who would betray him." And in John 13:27, at the last supper, after Judas takes the bread Jesus has given him, John writes: "As soon as Judas took the bread, Satan entered into him."

Jesus said to him: "What you are about to do, do quickly."

He let it happen.

This is one of the deepest tensions in the Gospel accounts. Jesus knew. And He let it proceed.

Judas went to the chief priests and agreed to betray Jesus for thirty pieces of silver — the price of a slave under Mosaic law, a detail that carries its own dark weight. He had been watching for an opportunity to hand Jesus over quietly, away from the crowds.

The opportunity came in the Garden of Gethsemane. Judas had arranged a signal: whoever he kissed was the one to arrest.

He walked up to Jesus in the dark garden while soldiers waited behind him, said "Greetings, Rabbi," and kissed Him.

Jesus said to him: "Do what you came for, friend."

Friend.

In some translations: "Judas, are you betraying the Son of Man with a kiss?"

In the end, Judas felt the weight of what he had done. Matthew 27:3 records that when he saw Jesus had been condemned, he was "seized with remorse" — he went back to the chief priests, threw the thirty silver coins down in the temple, and said: "I have sinned, for I have betrayed innocent blood."

The chief priests shrugged: "What is that to us? That's your responsibility."

And Judas went out and hanged himself.

There is tremendous sadness in this story. Not just the betrayal. The fact that Judas's remorse was real but didn't lead him to Jesus.

Peter also betrayed Jesus that same night — denying him three times to people in a courtyard. And Peter's remorse was real too. But Peter ran back to Jesus. Judas ran away from Him.

The difference wasn't the weight of the sin. The difference was the direction of the running.

We cannot know everything about Judas. We don't fully understand the layers of his motivation — whether it was greed, political disillusionment, a desperate attempt to force Jesus to act in some way. History has debated it.

What we know is this: he was chosen and he chose. God's sovereignty and human will were both at work in that dark garden.

What we also know is that Jesus called him friend.

Even then. Even there.

The story of Judas is not told to make us comfortable. It's told to make us honest. It's a warning. It's a mirror. It asks: is the proximity to Jesus the same as surrender to Jesus?

You can be in the room and still be far away.`,
    bible_reading_reference: "Matthew 26:14-16, 47-50",
    reflection_question: "Judas was close to Jesus for three years and still betrayed Him. What does his story say about the difference between proximity to Jesus and genuine surrender to Him? Is there any area of your life where you are near Jesus outwardly but far from Him inwardly?",
  },

  // ─────────────────────────────────────────────
  // PART 3 — AFTER JESUS
  // ─────────────────────────────────────────────
  {
    day_number: 18,
    day_title: "Matthias — Filling the Gap",
    devotional_text: `After the ascension, after Jesus had risen and had been taken up into heaven, the disciples returned to Jerusalem.

There were one hundred and twenty of them gathered in an upper room — the core community of those who had followed Jesus. And they waited.

Jesus had told them not to leave Jerusalem but to wait for the promise of the Father. The Holy Spirit was coming.

But before the Spirit arrived, something else had to happen.

Peter stood up among the group and addressed them.

He opened with the Psalms. He quoted David: "May his place be deserted; let there be no one to dwell in it" — and then — "May another take his place of leadership." Two separate Psalms, Psalm 69 and Psalm 109, both pointing to the same gap: there was a vacancy in the twelve.

Judas was gone.

And Peter's argument was that this vacancy needed to be filled — not because the number twelve was magical, but because the twelve represented something. They were the witnesses. They had been there from the beginning, from John's baptism all the way through the resurrection. They had seen it all firsthand. And someone needed to stand in that witness alongside the others.

Notice something important. They weren't scrambling to replace Judas out of anxiety. They were responding to Scripture. They believed the Psalms had anticipated this moment and had pointed toward this solution.

So they set out two candidates.

Joseph called Barsabbas, also known as Justus. And Matthias.

Both men had been with the disciples throughout the entire ministry of Jesus — from the baptism of John to the ascension. Both met the qualifications Peter had described. Both were trusted, known, part of the inner circle of Jesus followers.

Then the disciples did something that strikes modern readers as odd: they prayed and cast lots.

"Lord, you know everyone's heart. Show us which of these two you have chosen to take over this apostolic ministry, which Judas left to go where he belongs."

Casting lots was a biblical practice — used throughout the Old Testament for decision-making in situations where the community wanted to discern God's choice rather than rely on human preference. It showed up in the selection of Saul as king, in the decisions of the priests, in the allocation of the Promised Land to the tribes of Israel.

The lot fell to Matthias. And he was added to the eleven apostles.

That's almost everything the Bible records about Matthias. He's mentioned once in Acts 1 and then he disappears from the text.

But he was there.

He was present on the day of Pentecost when the Spirit fell. He was among the twelve who stood up and bore witness. He was in that core group of eyewitnesses from whom the gospel's credibility flowed.

Church tradition varies on Matthias's later ministry — some say he preached in Judea, others say he went to Ethiopia, others to the Caucasus region. Most traditions mark him as a martyr.

One promise. Still not fulfilled. Until Matthias.

What Matthias teaches us isn't glamorous. It doesn't make for dramatic sermons.

But it's essential.

The community of faith requires people willing to step into gaps. People willing to take on roles nobody talks about. People willing to say yes when the task is unglamorous and the recognition is minimal.

The church has always been built as much by the Matthiases as by the Peters.

Chosen not by popularity. Not by their own ambition. By prayer, discernment, and the community's listening for God's voice.

Sometimes the most important calling you'll ever receive is the one you didn't seek — the one where someone simply says: "We need you here. Will you step in?"`,
    bible_reading_reference: "Acts 1:15-26",
    reflection_question: "Matthias stepped into a gap that needed filling, not a role that brought fame. Is there a gap in your church, family, or community that you've noticed but have been waiting for someone else to fill? What would it look like for you to step in?",
  },
  {
    day_number: 19,
    day_title: "Paul — Apostle to the Gentiles",
    devotional_text: `Paul was not one of the original twelve.

He never met Jesus in person during His earthly ministry. He never sat by the Sea of Galilee listening to the Sermon on the Mount. He was not in the upper room on the night of the last supper.

In fact, when Jesus was alive and the disciples were following Him through Galilee and Judea, Saul of Tarsus — the man who would become Paul — was doing the opposite. He was a Pharisee. A rising star in the Jewish religious establishment. He was trained under Gamaliel, one of the most respected Torah teachers of his generation. He knew the law deeply, lived it strictly, and believed with total conviction that this new movement called "the Way" was a blasphemous corruption of everything Israel held sacred.

He didn't just disagree with the Christians. He hunted them.

Acts 8:3: "Saul began to destroy the church. Going from house to house, he dragged off both men and women and put them in prison."

He was present and consenting at the stoning of Stephen — the first Christian martyr — holding the coats of the men throwing stones, watching a man die for believing in Jesus.

And then on the road to Damascus, everything shattered.

Acts 9: a light from heaven flashed around him, and Saul fell to the ground. And he heard a voice: "Saul, Saul, why do you persecute me?"

Saul said: "Who are you, Lord?"

"I am Jesus, whom you are persecuting."

The man who had been executing the church for worshipping Jesus was now lying in the dust, blinded, hearing the voice of the One he'd been trying to erase.

He was blind for three days. No food. No water. Just sitting in the dark with the wreckage of his entire theological worldview.

On the third day, a disciple named Ananias — a man who had every reason to be afraid of Saul — came to him, laid his hands on him, and said: "Brother Saul."

Brother.

His sight returned. He was baptized. He ate and was strengthened.

What followed is one of the most remarkable lives in human history.

Paul traveled further, wrote more, planted more churches, suffered more, and articulated the gospel more systematically than any other figure in the New Testament. Thirteen letters in the New Testament carry his name. He traveled through what is now Turkey, Greece, Macedonia, and eventually Rome. He was beaten with rods three times, stoned once and left for dead, shipwrecked three times, spent a night and a day in the open sea, was in danger from rivers, robbers, his own countrymen, Gentiles, false brothers.

And he considered it all worth it.

Philippians 3:7-8: "But whatever were gains to me I now consider loss for the sake of Christ. What is more, I consider everything a loss because of the surpassing worth of knowing Christ Jesus my Lord."

Paul is the great theologian of the grace that he himself had experienced. He knew what it meant to be a sinner saved by something he hadn't earned. He had been on the wrong side of everything — and Jesus had crossed the road and stopped him cold.

That experience never left his theology. Everything he wrote about justification by faith, about the grace of God, about the power of the resurrection — it all flowed from a man who had been on his face in the dust on the road to Damascus.

Paul was not one of the twelve.

But he may be the clearest demonstration of what Jesus was trying to prove by choosing the twelve in the first place:

God uses broken, unlikely, even hostile people to build His kingdom.

The only qualification is surrender.`,
    bible_reading_reference: "Acts 9:1-19",
    reflection_question: "Paul's conversion was so total that it cost him everything he had previously built his identity on. Is there something you're holding onto — a reputation, a worldview, a way of seeing yourself — that Jesus might be asking you to let fall to the ground?",
  },
  {
    day_number: 20,
    day_title: "How the Disciples Spread the Gospel",
    devotional_text: `The Book of Acts opens with one hundred and twenty frightened people in a locked room.

It ends with the gospel in Rome — the capital of the empire.

That's the arc of the story. From a locked room in Jerusalem to the corridors of the empire. From scared disciples who didn't know what to do next to a movement that Roman emperors would spend two centuries trying to suppress and eventually couldn't.

How did that happen?

It started on the day of Pentecost. Fifty days after the resurrection, the disciples were gathered together when something that sounded like a violent rushing wind filled the house. Tongues of fire appeared above each of them. And they began to speak in languages they had never learned.

Jewish pilgrims from all over the Mediterranean world who were in Jerusalem for the festival heard the sound and gathered. Each person heard the disciples speaking in their own native language — Parthians, Medes, Elamites, people from Mesopotamia, Cappadocia, Egypt, Libya, Rome. The entire known world was represented in that crowd.

Some were amazed. Some made fun of them and said they were drunk.

And Peter stood up and preached.

This is the same Peter who, weeks earlier, had denied knowing Jesus three times. The same Peter who had been hiding behind locked doors. He stood up in the street in front of a crowd that had just watched Jesus be crucified — some of them possibly participants in that crowd — and declared: "God has raised this Jesus to life, and we are all witnesses of it."

Three thousand people believed and were baptized that day.

That was the beginning.

From Jerusalem, the gospel moved outward in every direction. Stephen's martyrdom scattered believers into Judea and Samaria, and everywhere they went they talked about Jesus. Philip went to Samaria and then encountered an Ethiopian official on a desert road and baptized him — the gospel crossing into Africa through one conversation.

Peter went to Caesarea, to the house of a Roman centurion named Cornelius — a Gentile — and witnessed the Holy Spirit fall on non-Jewish people for the first time. The walls that had divided Jew and Gentile for centuries began to crack.

Paul and Barnabas traveled through Asia Minor planting churches in city after city. Paul then crossed into Macedonia — into Europe — and eventually reached Corinth and Athens and Ephesus.

The other apostles went further.

Thomas, as we noted, went to India. Bartholomew to Armenia. Andrew to Greece. Matthew, by many accounts, to Ethiopia. Philip to the region of Phrygia in Asia Minor. James son of Alphaeus and Simon the Zealot, to Persia and the far east.

These were not comfortable journeys. They were shipwrecks and stonings and beatings and prison and execution. Every single one of these men faced the choice that their faith would eventually require: your life or your testimony?

Almost all of them chose the testimony.

Why? What made ordinary fishermen and tax collectors willing to die rather than say the resurrection hadn't happened?

People do not willingly die for something they made up. People do not submit to torture to protect a lie. The simplest explanation for the behavior of the early disciples — for the explosive growth of the church, for the willingness to die, for the way the movement spread against every earthly obstacle — is the one they kept insisting on themselves:

They had seen the risen Jesus. It was real. And if it was real, nothing else mattered by comparison.

The great commission was not a suggestion. It was the organizing principle of their lives.

And through them, the world was never the same.`,
    bible_reading_reference: "Acts 2:1-41",
    reflection_question: "The disciples' willingness to spread the gospel cost most of them their lives. What is it costing you to share your faith? Is there a gap between what they were willing to risk and what you are currently willing to risk?",
  },
  {
    day_number: 21,
    day_title: "What Discipleship Means Today",
    devotional_text: `Twenty days ago, we started with a simple question: what is a disciple?

A learner. A follower. Someone who is being shaped into the image of the one they follow.

We've come a long way since then.

We've met twelve ordinary men from an occupied backwater province. Fishermen. A tax collector. A revolutionary. A skeptic. A doubter. A betrayer. Men who argued about who was greatest and fell asleep when they should have been praying and ran away when things got dangerous.

And we've seen what happened when those same men gave their lives — literally, most of them — to what they had witnessed.

Now we have to answer the question that this whole journey has been building toward:

What does discipleship mean for you, today, in the world you actually live in?

Here's what it doesn't mean: having a perfect quiet time every morning. Posting Christian content. Knowing all the right answers. Going to church every week without letting it change anything.

Here's what it does mean.

First: it means you are following a specific person. Not an ideology. Not a religion. Not a set of principles. A person — Jesus — who is alive, who speaks, who leads, who is present with you by the Holy Spirit. Discipleship is relational. It is personal. It is ongoing. You don't get to follow Jesus in the past tense and call it done.

Second: it means you are being changed. Not performing change. Actually being changed. Your appetites, your habits, your reflexes, your priorities — they are supposed to be moving in a direction. Not perfectly. Not without failure. But moving.

Peter was impulsive and fearful and made catastrophic mistakes. But he was moving in a direction. By the end of Acts, he was someone you could barely recognize from the man who had denied Jesus in a courtyard.

That trajectory matters more than your current position.

Third: it means you are part of a community. You cannot be a disciple alone. The twelve weren't twelve individuals living twelve separate spiritual lives. They traveled together, ate together, argued together, prayed together, held each other accountable, watched each other fail and get back up.

The church — the actual, imperfect, complicated, not-always-doing-it-right community of people following Jesus — is not optional for discipleship. It's the environment in which discipleship happens.

Fourth: it means you are sent. Every disciple is also an apostle — sent one. Not all of us travel to India like Thomas or plant churches across three continents like Paul. But every single follower of Jesus has been given the same commission: go make disciples. In your home. In your workplace. In your neighborhood. Through the specific relationships and opportunities that are uniquely yours.

You are not just a recipient of the gospel. You are a carrier of it.

And fifth: it costs something.

Discipleship has never been free. Not for Peter, who was crucified upside down. Not for Stephen, who was stoned. Not for Paul, who listed his sufferings like a resume. Not for Thomas, who walked all the way to India to tell people about a risen Savior.

Following Jesus will eventually ask you for something you are reluctant to give. Your comfort. Your time. Your reputation. Your money. Your certainty. Your relationships. Your plans.

Not because suffering is the point. But because surrender is.

The disciples didn't set out to be heroes. They set out to follow Jesus. And the following took them to places they never expected, at costs they didn't fully understand when they agreed, and it produced fruit that is still growing two thousand years later.

You are here because of them.

Now someone is waiting for you to show up.

Chosen. Set apart. Different. Not because of who you are. Because of whose you are.

Follow Him.`,
    bible_reading_reference: "John 21:15-22",
    reflection_question: "Looking back over these 21 days — which disciple's story resonated most with your own? What is the one thing you are going to do differently as a result of this study?",
  },
];

async function seedDevotional() {
  console.log("Starting to seed 'The Disciples of Jesus' devotional...\n");

  // Check if devotional already exists
  const { data: existingDevotional } = await supabase
    .from("devotionals")
    .select("id")
    .eq("title", "The Disciples of Jesus: A 21 Day Devotional — A Bible Buddy Study")
    .single();

  let devotionalId: string;

  if (existingDevotional) {
    console.log("Devotional already exists, re-seeding days...");
    devotionalId = existingDevotional.id;

    const { error: deleteError } = await supabase
      .from("devotional_days")
      .delete()
      .eq("devotional_id", devotionalId);

    if (deleteError) {
      console.error("Error deleting existing days:", deleteError);
    } else {
      console.log("Deleted existing days for re-seeding");
    }
  } else {
    // Insert main devotional
    const { data: devotional, error: devotionalError } = await supabase
      .from("devotionals")
      .insert({
        title: "The Disciples of Jesus: A 21 Day Devotional — A Bible Buddy Study",
        subtitle: "A Bible Buddy Study",
        description: `Who were the twelve disciples — really? Not the stained-glass versions. The actual men Jesus chose: a hothead fisherman, a corrupt tax collector, a political revolutionary, a skeptic who needed proof, a betrayer, and nine others history nearly forgot.

This 21-day devotional walks through who they were, what they did, and what their stories mean for the way you follow Jesus today. Part 1 builds the foundation — what discipleship actually is, why Jesus chose disciples at all, and what happened after He rose again. Part 2 spends a day with each of the twelve. Part 3 traces what happened after Jesus left — and lands the question directly on you.

This isn't a biography project. It's a Bible study about what it means to be called, to follow, to fail, to be restored, and to go.`,
        total_days: 21,
        cover_image: "disciplesofjesusdevotional.png",
      })
      .select()
      .single();

    if (devotionalError || !devotional) {
      console.error("Error creating devotional:", devotionalError);
      // Try without cover_image column in case it doesn't exist yet
      const { data: devotional2, error: devotionalError2 } = await supabase
        .from("devotionals")
        .insert({
          title: "The Disciples of Jesus: A 21 Day Devotional — A Bible Buddy Study",
          subtitle: "A Bible Buddy Study",
          description: `Who were the twelve disciples — really? Not the stained-glass versions. The actual men Jesus chose: a hothead fisherman, a corrupt tax collector, a political revolutionary, a skeptic who needed proof, a betrayer, and nine others history nearly forgot.

This 21-day devotional walks through who they were, what they did, and what their stories mean for the way you follow Jesus today. Part 1 builds the foundation — what discipleship actually is, why Jesus chose disciples at all, and what happened after He rose again. Part 2 spends a day with each of the twelve. Part 3 traces what happened after Jesus left — and lands the question directly on you.

This isn't a biography project. It's a Bible study about what it means to be called, to follow, to fail, to be restored, and to go.`,
          total_days: 21,
        })
        .select()
        .single();

      if (devotionalError2 || !devotional2) {
        console.error("Error creating devotional (second attempt):", devotionalError2);
        return;
      }

      console.log("Created devotional:", devotional2.id);
      devotionalId = devotional2.id;
    } else {
      console.log("Created devotional:", devotional.id);
      devotionalId = devotional.id;
    }
  }

  // Insert all days
  console.log(`\nInserting ${devotionalDays.length} days...`);
  let successCount = 0;
  let errorCount = 0;

  for (const dayData of devotionalDays) {
    const { book, chapter } = parseBibleReading(dayData.bible_reading_reference);

    const { error: dayError } = await supabase.from("devotional_days").insert({
      devotional_id: devotionalId,
      day_number: dayData.day_number,
      day_title: dayData.day_title,
      devotional_text: dayData.devotional_text,
      bible_reading_book: book,
      bible_reading_chapter: chapter,
      reflection_question: dayData.reflection_question,
    });

    if (dayError) {
      console.error(`❌ Error inserting day ${dayData.day_number}:`, dayError.message);
      errorCount++;
    } else {
      console.log(`✅ Inserted day ${dayData.day_number}: ${dayData.day_title}`);
      successCount++;
    }
  }

  console.log(`\n✅ Seeding complete!`);
  console.log(`   Success: ${successCount} days`);
  if (errorCount > 0) {
    console.log(`   Errors: ${errorCount} days`);
  }
}

seedDevotional().catch(console.error);
