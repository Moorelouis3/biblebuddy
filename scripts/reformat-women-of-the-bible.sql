-- Women of the Bible: Reformat all 21 days
-- Run this entire script in the Supabase SQL Editor

DO $main$
DECLARE
  v_id UUID;
BEGIN
  SELECT id INTO v_id FROM devotionals WHERE title = 'Women of the Bible';

  UPDATE devotional_days SET devotional_text = $w1$Before we begin this journey, we need to do something important.

We need to look at what we're actually looking at.

Because when most people read the Bible, they read it through a certain lens — a lens shaped by centuries of tradition, by the cultural assumptions of whoever taught them the faith, by what got emphasized and what got passed over in Sunday school. And when it comes to women in the Bible, a lot has been passed over.

That ends here.

Over the next 21 days, we're going to meet women who shaped the course of history. Women who carried promises, made impossible choices, showed radical faith, survived devastating betrayal, and stood at the most pivotal moments in the entire biblical narrative. We're going to meet them not as background characters, not as footnotes, but as the central figures in God's story that they actually were.

And the first thing we need to establish is this: women were never on the margins of what God was doing.

That's not a modern interpretation. That's not reading something into the text that isn't there. It's what the text actually says, when you slow down and look at it.

Go back to Genesis 1. God creates. He creates light and dark, sea and land, plants and animals. And then — the crown of creation. Not man alone. "Let us make mankind in our image, in our likeness." And from one act of creation, He makes two people: male and female. Both made in the image of God. Both given dominion over the earth. Both entrusted with the garden.

Notice something important. The word used for woman in Genesis 2 is ezer — usually translated "helper," which in English sounds subordinate and domestic. But in Hebrew, ezer is a word used elsewhere in Scripture almost exclusively for God Himself. "I lift my eyes to the mountains — where does my help come from? My help comes from the Lord." The same root. Ezer. Powerful help. Rescuing strength.

That detail matters.

The woman was not an afterthought. She was not a secondary creation. She was the completion of creation — and the word used to describe her is the same word used to describe God's own action toward Israel in their greatest moments of need.

Then the story moves.

The thread that runs through the entire Old Testament is one of promise: God is going to send someone who will fix what went wrong. The Messiah. The one who will crush the head of the serpent. And look at how that promise travels through history — it travels almost entirely through women. Sarah, who had the child of promise when she was ninety years old. Rebekah, who received prophecy about her sons before they were born. Rachel, whose line produced Joseph, who saved the whole known world from famine. Tamar, who preserved the line of Judah through a story so scandalous it's barely preached. Rahab, a prostitute in Jericho who sheltered the spies and found herself in the genealogy of the Son of God. Ruth, a foreign widow whose loyalty and love became the bridge to King David. Bathsheba, who raised the son who would build God's temple. Hannah, whose prayer for a son produced the prophet who anointed the greatest king in Israel's history.

Every single one of those women had to be there for the story to work.

It's not coincidence. It's pattern. God has always worked through women — through their bodies, their faith, their courage, their choices, their voices.

And then we arrive at the New Testament, and the pattern intensifies. A teenage girl in Galilee says yes, and God enters the world through her. Women follow Jesus from Galilee to Jerusalem, funding His ministry. Women are present at His crucifixion when the male disciples have fled. Women go first to the tomb. Women are the first to see the risen Jesus. Women are the first sent with the resurrection message.

If the resurrection announcement had a face, it was a woman's face.

This is where it shifts from interesting to staggering.

In a first-century world where a woman's testimony was not considered legally valid — where she could not testify in court, where she was considered the property of her father and then her husband, where her voice carried no weight in public life — Jesus chose women to be the first witnesses to the most important event in human history.

He didn't choose Peter. He didn't choose John. He chose Mary Magdalene.

That is not an accident. That is a statement.

Over the next three weeks, we're going to let these women speak. We're going to slow down inside their stories, understand the world they lived in, feel the weight of what they risked and endured and believed. We're going to see how their lives connect to each other and to us — how the same God who met them in their darkest moments is the same God who meets us in ours.

This is not a study about women for women. It's a study about God — and the way He has always moved through the people the world most overlooked.

Pay attention. Every day of this matters.$w1$
  WHERE devotional_id = v_id AND day_number = 1;

  UPDATE devotional_days SET devotional_text = $w2$To understand what Jesus did for women, you need to understand what the world looked like before He did it.

Not the comfortable Sunday school version. The real version.

In the ancient Near East — and this includes Israel — a woman was legally property. That's not harsh language. That's the technical reality. Under most ancient legal codes, a woman passed from her father's legal ownership to her husband's legal ownership on the day she was married. She could not own property in her own name. She could not initiate a divorce. She could not testify in a legal proceeding. She had no public voice, no civic standing, no independent identity before the law.

Her value was primarily reproductive. Her purpose, in the eyes of the culture, was to produce sons for her husband's household. Barrenness was not just a personal tragedy — it was grounds for dismissal. A husband could take additional wives or concubines if his wife didn't produce children. And the shame of being barren fell entirely on the woman, never on the man.

In ancient Rome, which was the world the New Testament was written into, a woman was under the legal authority of a male guardian — first her father, then her husband, then her husband's nearest male relative if her husband died. The concept of a woman making her own legal decisions was foreign to Roman law, though some upper-class Roman women did gain increasing freedoms in the late Republic and early Empire.

But for most women, in most places, in the world of the Bible — daily life looked like this: you worked in the domestic sphere. You managed the household, ground the grain, fetched the water, raised the children, prepared the food. You did not go to the synagogue and sit with the men during Torah study. You were not called to study Scripture. The Rabbi's table was not for you. Your presence in public spaces was limited and supervised. Your interaction with men who were not your husband or family was socially regulated.

Notice something important. When the religious teachers of Jesus' day debated Torah, when the Pharisees and Sadducees argued theology, when the synagogue leaders conducted the life of the community — women were not part of those conversations. They were in a separate section. Behind a partition. Or not there at all.

The Talmud contains a famous prayer in which a Jewish man thanks God that he was not made a Gentile, a slave, or a woman — ranking those three categories as the three statuses from which a man should be grateful to be exempt.

This was the world.

And this is what makes the stories of the women in the Old Testament so remarkable. Because again and again, God broke into that world and did something with women that the culture said couldn't happen. He spoke to Hagar when no one else would. He named Deborah a prophet and judge while men were supposed to hold those offices. He had the prophet Joel declare that "your daughters will prophesy." He chose barren women — Sarah, Rachel, Hannah, Elizabeth — to carry His most pivotal promises forward, as if He was deliberately making the point that life comes from places the world has already written off.

That detail matters. Every time.

But the legal and social reality still pressed down hard. The story of Tamar in Genesis 38 is the story of a woman trapped by an unjust system who had to take a drastic, dangerous action just to survive — because the men in her life who were obligated to protect her failed her completely. The story of Jephthah's daughter in Judges 11 is a tragedy with no redemption arc — a girl sacrificed because of her father's foolish vow, and the text doesn't even tell us her name.

The Old Testament doesn't sanitize the damage done to women by a fallen world. It records it honestly.

And then Jesus comes.

But we'll get to that tomorrow. For now, it's worth sitting in the reality of what life actually looked like for most women in the ancient world. Not to be angry at history. Not to read the Bible through a modern political lens. But to understand the weight of what is happening every time God steps into one of these women's stories.

When God sees Hagar alone in the wilderness, He is doing something the culture around her had no category for.

When God honors Hannah's prayer and gives her a son, He is answering a woman the religious establishment had written off as drunk.

When God calls Deborah to lead a nation, He is handing authority to someone the world said couldn't hold it.

Every single one of those moments is a crack of light in a very dark room.

The women in this devotional didn't just survive a hard world. They shaped history inside it. And the God who met them is still the same God — the one who goes looking for people the world has discarded and finds them worth everything.$w2$
  WHERE devotional_id = v_id AND day_number = 2;

  UPDATE devotional_days SET devotional_text = $w3$There is a case to be made — and I think it's a strong one — that Jesus of Nazareth was the most countercultural figure in human history when it came to how He treated women.

Not countercultural in the vague, feel-good sense. Countercultural in a specific, measurable, culturally scandalous sense. He broke the social codes of His world toward women so consistently, so publicly, and so deliberately that the only explanation is that He was making a point.

Let's walk through it.

John 4. Jesus is traveling through Samaria — already a loaded detail, because faithful Jews avoided Samaria whenever possible. He stops at a well at noon. A woman comes to draw water at noon, which is notable because women typically drew water in the cooler morning hours in groups. Noon meant she was alone. Noon meant she was probably avoiding the other women of her town.

Jesus speaks to her first.

A Jewish rabbi initiating a conversation with an unknown woman in public. That alone would have raised eyebrows. But she's also a Samaritan — a member of an ethnic and religious group that Jews considered corrupted, inferior, spiritually unacceptable. And as the conversation unfolds, we learn she has had five husbands and is currently living with a man who is not her husband.

So: a woman, alone, Samaritan, with a history that marked her as a social outcast.

And Jesus speaks to her first. And He speaks to her about theology. He tells her about living water. He reveals to her that He knows her entire story — five husbands — and He doesn't condemn her. He offers her the deepest spiritual revelation He has given anyone up to that point in John's gospel: "God is spirit, and his worshipers must worship in the Spirit and in truth."

And then He tells her plainly who He is. "I, the one speaking to you — I am he." The Messiah. He tells this Samaritan woman at a well, with her complicated history, before He tells most of the religious establishment of Israel.

She becomes the first missionary in John's gospel. She runs back to her town and says "Come, see a man who told me everything I ever did. Could this be the Messiah?" And many believed because of her testimony.

Notice something important. Jesus entrusted the first recorded Messianic announcement to a woman the world had discarded. Not a Pharisee. Not a scribe. A five-times-married Samaritan woman.

Now go to John 8. The religious leaders bring a woman caught in adultery and throw her in front of Jesus in the temple courts. They use her as a trap — if He says stone her, He'll lose His reputation as merciful; if He says release her, He violates the law of Moses.

Notice what the trap reveals: they only brought the woman. Where is the man? Adultery requires two people. But in that world, only the woman's life was at stake. She was property to be discarded when inconvenient. She was a chess piece in a theological argument.

Jesus doesn't play the game. He bends down and writes in the dirt — what He wrote, we don't know — and then stands and says: "Let any one of you who is without sin be the first to throw a stone at her."

One by one, they leave. Until it's just the woman and Jesus.

"Woman, where are they? Has no one condemned you?"

"No one, sir."

"Then neither do I condemn you. Go now and leave your life of sin."

He didn't erase her responsibility. "Leave your life of sin" is a real instruction. But He also refused to let her be used. He refused to let her be treated as a thing rather than a person. He protected her in a moment when the whole religious establishment had gathered to crush her.

Now go to Luke 10. Mary and Martha. Jesus comes to their home. Martha is doing what women were supposed to do — managing the household, preparing food, being busy with the domestic duties that were her designated role. Mary sits at Jesus' feet and listens to His teaching.

Sitting at a rabbi's feet was not something women did. It was a position reserved for male disciples. You sat at a rabbi's feet to learn, to be shaped, to be prepared for ministry. Women were not supposed to be in that position.

Martha, frustrated, says to Jesus: tell her to come help me.

Jesus says: "Mary has chosen what is better, and it will not be taken from her."

He validates her right to sit at His feet and learn. He says the thing that was not culturally permitted for her to do — study at the feet of a teacher — is the right choice. He is publicly declaring that women are welcome at His teaching. That their spiritual formation matters. That they are not limited to domestic roles when it comes to engaging with God's word.

This is where it shifts. Jesus didn't just treat women with dignity in moments of crisis. He invited them into discipleship.

And finally — the resurrection. Matthew 28. Mark 16. Luke 24. John 20. All four gospels agree: the first witnesses to the empty tomb and the risen Jesus were women. In a legal culture where a woman's testimony was inadmissible in court — where she literally could not serve as a witness in a legal proceeding — Jesus chose women as the first witnesses to the most legally and theologically consequential event in history.

Mary Magdalene. Mary the mother of James. Salome. Joanna. The women who had followed Him from Galilee, who had stood at the cross when the male disciples fled, who came first to the tomb to care for His body.

Jesus appeared to Mary Magdalene first, before He appeared to Peter. Before He appeared to John. Before He appeared to the eleven. He appeared first to Mary — and He sent her to tell the others.

His words to her: "Go and tell my brothers."

She is the apostle to the apostles. The first person entrusted with the resurrection message. A woman. A woman who had formerly been described as one from whom seven demons had been cast out. Delivered. Restored. And then sent with the most important message in the history of the world.

You cannot read these stories carefully and arrive at the conclusion that Jesus considered women to be marginal. The evidence is too consistent, too deliberate, too pattern-forming.

He treated women as full human beings. As people with minds worth engaging, with voices worth hearing, with stories that mattered, with faith that was noticed and honored.

In the first century, that was revolutionary.

In any century, it is the shape of the kingdom.$w3$
  WHERE devotional_id = v_id AND day_number = 3;

  UPDATE devotional_days SET devotional_text = $w4$She has no mother. No childhood. No memory of being young.

She opens her eyes and the world is already perfect.

That's the situation Eve is born into, and we need to actually sit with that for a moment before we get to the part everyone knows. Genesis 1 and 2 describe a world that is completely and entirely good. God looks at everything He has made and calls it very good. The garden of Eden is not just a pretty location — it's a picture of complete shalom, the Hebrew word for peace and wholeness and flourishing. Everything is in right relationship. The animals, the land, the humans, God Himself — everything is as it was designed to be.

And Eve is there. Made from the man's own side — not from his feet, to be beneath him, and not from his head, to be above him, but from his side, to be beside him. Equal in dignity. Different in design. Together they bear the image of God in a way that neither alone fully expresses.

Genesis 2:25 tells us something that's easy to read past: "Adam and his wife were both naked, and they felt no shame." That's not primarily a statement about clothing. It's a statement about intimacy. There was nothing hidden between them, nothing to protect, nothing they needed to perform. They existed in a state of total openness with each other and with God, and there was no fear.

Then comes Genesis 3.

The serpent approaches Eve — not Adam — and begins with a question: "Did God really say...?" This is worth noticing. The attack doesn't begin with a lie. It begins with a question designed to create doubt. Did God really say that? Are you sure about what He actually meant? Is He really as good as you think He is?

The serpent's strategy has never changed. It's still the same strategy today.

Eve engages the question. She answers it — and in her answer, she slightly misquotes what God said. God had said you may not eat from the tree of the knowledge of good and evil. Eve says you may not eat it or touch it. That addition — or touch it — isn't in the original command. Somewhere between receiving the command and this moment, something has shifted in how she holds it.

The serpent presses in. "You will not certainly die. God knows that when you eat from it your eyes will be opened, and you will be like God, knowing good and evil."

She looks at the fruit. It is good for food, pleasant to the eyes, desirable for gaining wisdom.

She takes it. She eats. She gives some to Adam, who is with her.

And everything falls.

Notice something important about what the text does not say. It does not say Eve was uniquely naive or easily fooled. The New Testament places primary responsibility for the fall on Adam in Romans 5: "Sin entered the world through one man." In 1 Corinthians 15, Paul writes that "in Adam all die." Eve was deceived, yes — but Adam was right there with her and said nothing. He took the fruit without resistance. The text records no protest from him, no hesitation, no attempt to intervene.

Both bear responsibility. Both chose.

And then they hear God walking in the garden in the cool of the day — and for the first time, they hide.

That moment is devastating. The God who had walked with them in full openness, with whom there had been nothing to protect and nowhere to hide — now they hide. Now they're afraid. The relationship has been ruptured. The shalom is broken.

God calls out: "Where are you?"

He knows the answer. He's asking because He wants them to speak. He's inviting confession even in the moment of failure.

Adam says: the woman you put here gave it to me.

Notice the structure of that sentence. He blames Eve. He blames God — "the woman you put here," as if God's gift is the problem. He does not take responsibility for his own choice.

Eve says: the serpent deceived me.

She is more honest than Adam, actually. She describes what happened. She was deceived. That's true.

Consequences follow. Pain in childbirth. Toil in work. The harmony of Eden replaced by struggle.

And then — this is the part most devotionals rush past — God says something to the serpent in Genesis 3:15 that is quietly the most important sentence in the entire Old Testament:

"And I will put enmity between you and the woman, and between your offspring and hers; he will crush your head, and you will strike his heel."

This is the protoevangelium — the first gospel. The first announcement of what God intends to do about what just happened.

He says: the woman's offspring will crush the serpent's head.

Not the man's offspring. The woman's. Her seed. Her line. Something is coming through her that will fix this.

This promise is spoken in the darkest moment, immediately after the worst thing that has happened so far in human history. The world has just broken. Sin has entered. And God, before He explains any of the consequences, makes a promise: something is coming through the woman that will undo this.

That promise took thousands of years to fulfill. But when it did, it came exactly the way God said: through a woman. A young girl in Nazareth who said yes to an angel and carried the Son of God.

The same woman whose act introduced death into the world became the channel through which life returned to it.

Eve is not just the first sinner. She is the first person over whom the gospel was proclaimed. She is the first person to whom God made the promise of redemption, standing in the wreckage of a world that had just fallen apart.

God did not abandon her. He named her consequence, and He named her hope, in the same breath.

That is still His way.$w4$
  WHERE devotional_id = v_id AND day_number = 4;

  UPDATE devotional_days SET devotional_text = $w5$Sarah is ninety years old when the most important thing in her life happens.

Let's sit with that.

She has been waiting for seventy-five years. She married Abram — later renamed Abraham — as a young woman and she has been following him ever since. She followed him out of Ur of the Chaldeans, the sophisticated city where she grew up, into a life of nomadic wandering in a land that God had promised but that didn't look like much yet. She followed him into Egypt when famine hit, where Abraham, afraid for his own life, told the Egyptians she was his sister rather than his wife — and Pharaoh took her into his household. She was returned when God sent plagues on Pharaoh's house, but Abraham had let it happen once and he would do it again later with King Abimelech.

Twice. Twice Abraham chose his own safety over his wife's.

We need to acknowledge that, because Sarah's story includes real suffering that comes from the people closest to her. She is not protected by her husband in the ways she should be. She is passed off, twice, into the households of powerful men. And through it all, God protects her — specifically, actively. He sends plagues on Pharaoh. He warns Abimelech in a dream. He intervenes because Abraham won't.

But the deepest wound isn't those moments.

The deepest wound is her womb.

Year after year, decade after decade, Sarah does not conceive. In her world, this is not just personal heartbreak — it is a specific kind of public shame. A woman's primary social value was her capacity to produce heirs. Sarah has not done that. She has failed, in the eyes of her culture, at the one thing that most defined female worth.

And here is where her story takes a turn that shows us something true and complicated about faith.

In Genesis 16, after a long wait with no results, Sarah makes a decision that seems logical but comes from a place of pain and despair: she gives her servant Hagar to Abraham as a secondary wife, so that he can have children through her. This was a culturally accepted practice — in ancient Near Eastern legal codes, a barren wife could provide a servant as a surrogate to produce heirs for the household.

It seems like a solution. It isn't.

Once Hagar conceives, the dynamic in the household becomes unbearable. The text says Hagar "began to despise her mistress." Sarah is bitter. She blames Abraham. She treats Hagar so harshly that Hagar runs away into the wilderness.

There are no heroes in this particular chapter. Sarah is desperate and cruel. Abraham is passive and complicit. The result is suffering for everyone involved — including Hagar, who had no choice in any of this.

And yet God is not finished with Sarah.

Genesis 18. Three visitors come to Abraham and Sarah's camp. Abraham runs to meet them, prepares a meal, sets it before them. One of the visitors is God Himself — either a theophany, a pre-incarnate appearance of Christ, or the LORD appearing in a form Abraham can receive. And God asks: "Where is your wife Sarah?"

"There, in the tent," Abraham says.

Then God says: "I will surely return to you about this time next year, and Sarah your wife will have a son."

Sarah is behind the tent flap, listening. She is ninety years old. The text says she is past the age of childbearing. So she does what any reasonable person would do when told that something impossible is about to happen.

She laughs.

Not a laugh of joy. A quiet, private laugh of disbelief. "After I am worn out and my lord is old, will I now have this pleasure?"

God hears it. "Why did Sarah laugh? Is anything too hard for the LORD?"

And Sarah, frightened now, denies it. "I did not laugh."

He says: "Yes, you did."

That exchange is remarkable. God doesn't rebuke her sharply. He doesn't revoke the promise. He asks a question — "Is anything too hard for the LORD?" — and then leaves it there. The promise stands unchanged. What she believes about it doesn't alter what He has already decided to do.

A year later, Sarah holds a baby.

His name is Isaac. Which means laughter.

God took the private moment of doubt that Sarah thought was her secret — that little laugh behind the tent flap — and He named her son after it. Not as a punishment. As a permanent record of what happens when God does what no one believed He could.

Every time someone said "Isaac," they were saying: remember when Sarah laughed? And God did it anyway.

That is the shape of this whole story. Sarah is not a woman of unwavering, spotless faith. She is a woman who waited too long, who took matters into her own hands in ways that caused damage, who laughed when she should have believed, who lied when she was caught.

And God worked through her anyway. God kept the promise anyway. God gave her the son she had stopped expecting.

The New Testament looks back at Sarah and calls her a woman of faith — Hebrews 11 includes her: "By faith Sarah herself received power to conceive, even when she was past the age, since she considered him faithful who had promised." Not because her faith was flawless. Because it was real enough to hold onto — even when she was laughing.

Here is what Sarah's life teaches: God's faithfulness to His promises does not depend on the steadiness of your faith. He asked her to believe for something genuinely impossible, and she believed imperfectly, and He did it anyway.

That is grace. It is not permission to be faithless. But it is the deep, settled truth that God is not deterred by the complexity of your actual, human, behind-the-tent-flap response to what He has said.

He hears the laugh. He keeps the promise. He names your child after the moment you doubted.

Because He wants you to remember forever that He is the God who does the impossible.$w5$
  WHERE devotional_id = v_id AND day_number = 5;

  UPDATE devotional_days SET devotional_text = $w6$Nobody chose Hagar's life for her.

That's the first thing to understand. She is an Egyptian woman who is a servant in an Israelite household. She did not choose to be a servant. She did not choose to be given to Abraham as a wife. She did not choose to get pregnant. She did not choose to be caught in the middle of the bitter, painful dynamic between Abraham and Sarah that her pregnancy created.

Everything that happens to Hagar, until the moment she meets God, happens to her without her consent.

This is a woman at the bottom of every social structure that existed in her world. She is a woman — low status. She is a servant — lower still. She is a foreigner — no community of her own. She has no family to protect her, no legal standing to argue her case, no advocate.

And yet she is the first person in the entire Bible to name God.

Let that land.

Genesis 16. Sarah has given Hagar to Abraham and Hagar has conceived. But now the dynamic between the two women has curdled into something ugly. Hagar, pregnant, looks at her barren mistress differently now — the text says she "began to despise" Sarah. Sarah, stung, treats Hagar harshly. Abraham refuses to intervene, telling Sarah to do with Hagar whatever she thinks best.

And Sarah "mistreated her." The same Hebrew word used in Exodus 1 when Pharaoh "oppressed" the Israelites in Egypt. It's a word for cruelty, for affliction, for making someone's life unbearable.

So Hagar runs.

Pregnant, alone, without resources, without a plan — she flees into the wilderness toward Egypt, the country of her birth. She stops at a spring of water in the desert on the road to Shur.

And then the Angel of the LORD finds her.

Not her mistress. Not Abraham. Not a human helper. The Angel of the LORD — in many Old Testament appearances, understood to be a pre-incarnate manifestation of God Himself — finds a runaway Egyptian servant girl in the wilderness and speaks to her.

"Hagar, servant of Sarah, where have you come from, and where are you going?"

He knows her name. He knows who she serves. He asks not because He doesn't know, but because He wants her to speak. To be seen. To tell her story.

She answers honestly: "I'm running away from my mistress Sarah."

And He speaks to her. He gives her instructions — go back, submit to Sarah — but He also gives her a promise. Her son will be the father of more descendants than can be counted. He tells her the child's name before he is born: Ishmael. Which means God hears.

In the middle of a story where nobody has listened to Hagar, God names her child God hears.

And then Hagar does something that no human being has done in the text of Scripture up to this point: she gives God a name.

"She gave this name to the LORD who spoke to her: 'You are the God who sees me,' for she said, 'I have now seen the One who sees me.'"

El Roi. The God who sees.

No patriarch has named God. No religious leader. No prophet. A runaway Egyptian servant woman in the wilderness, with no status and no one on her side, becomes the first person in Scripture to give God a name — and the name she gives Him is about being seen.

You see me.

The world said Hagar was invisible. The world said she had no voice, no standing, no story worth telling. And God said: I see you. I know your name. I hear your child's name before he is born. You matter to me.

She returns. She has Ishmael. Years pass. Then Isaac is born, and the dynamic shifts again. When Isaac is weaned and Abraham throws a celebration, Sarah sees Ishmael mocking — and she demands that Abraham send Hagar and Ishmael away.

This time, permanently.

Abraham gives them some food and a skin of water and sends them out into the desert. The water runs out. Hagar puts the boy under a bush because she cannot watch him die, and she sits down a distance away and weeps.

And the Angel of God calls to Hagar from heaven.

"What is the matter, Hagar? Do not be afraid; God has heard the boy crying as he lies there. Lift the boy up and take him by the hand, for I will make him into a great nation."

Then God opens her eyes and she sees a well of water.

There it is again. God hears. God sees. The names He had already given this story come back around in the worst moment: He hears Ishmael's cry. He opens Hagar's eyes.

Hagar is the most forgotten figure in Genesis, tucked between the stories of the patriarchs, and yet she holds something extraordinary: she is the recipient of two divine encounters, two promises, two times when God breaks into her suffering and says I see you.

Not because of her status. Not because of her heritage. Not because she earned it or prayed it into existence.

Simply because God is the God who sees.

Here is what Hagar's story says to anyone who has ever felt invisible: your pain has not gone unnoticed. The situations that were not your choice, the treatment you did not deserve, the moments where the people who should have protected you failed — none of it is outside God's sight.

He goes looking for Hagar in the wilderness. He doesn't wait for her to clean herself up and present herself at the right altar with the right credentials.

He finds her where she is. Calls her by name. Tells her she matters. And makes a way forward out of a place that looked like a dead end.

El Roi. The God who sees.

He still is.$w6$
  WHERE devotional_id = v_id AND day_number = 6;

  UPDATE devotional_days SET devotional_text = $w7$She is asked one question, and everything depends on her answer.

To understand what that question costs, you need to understand the world it was asked in.

Abraham is old. His son Isaac needs a wife — but not from among the Canaanites, the people of the land where they are living. Abraham is clear on this: his son must marry from his own people, from the family he left behind in Mesopotamia. So Abraham sends his chief servant — tradition names him Eliezer — on a journey of several hundred miles to find a wife for Isaac among Abraham's relatives.

The servant takes ten camels and carries gifts from his master's considerable wealth. He travels to the city of Nahor in northwest Mesopotamia. He stops at the well outside the city in the evening, when the women come out to draw water.

And he prays one of the most specific, faith-filled prayers in the Old Testament: "LORD, God of my master Abraham, make me successful today, and show kindness to my master Abraham. See, I am standing beside this spring, and the daughters of the townspeople are coming out to draw water. May it be that when I say to a young woman, 'Please let down your jar that I may have a drink,' and she says, 'Drink, and I'll water your camels too' — let her be the one you have chosen for your servant Isaac."

Before he even finishes praying, Rebekah arrives.

She is beautiful. She is a virgin. And she is the granddaughter of Abraham's brother — she is from exactly the right family.

The servant asks for a drink. And she says exactly what he prayed for. Drink, and I'll water your camels too. She draws water, fills the trough, goes back and forth to the well until all ten camels are watered.

Watering ten camels is not a small task. A camel can drink up to thirty gallons of water at a time. Ten camels, after a long journey, would need hundreds of gallons. This young woman works hard, quickly, without being asked. She doesn't wait to see if anyone will compensate her. She just does it.

The servant is watching her carefully, trying to understand whether the LORD has made his journey successful. And when the camels are done, he gives her gold — a nose ring and two bracelets — and asks who her father is, and whether there would be room in her family's house to stay the night.

She tells him she is Bethuel's daughter. She is Abraham's relative. There is room.

The servant bows and worships God right there: "Praise be to the LORD, the God of my master Abraham, who has not abandoned his kindness and faithfulness to my master. As for me, the LORD has led me on the journey to the house of my master's relatives."

He goes to the house. He tells the whole story — Abraham's blessing, his mission, his prayer at the well, Rebekah's perfect answer before he finished praying. He tells them why he has come and what he is asking: he wants to take Rebekah back to be Isaac's wife.

Laban and Bethuel hear the story and say: this is from the LORD. We can say nothing one way or the other.

And then the servant asks to leave the next morning with Rebekah. Her mother and brother say: let her stay ten more days. Give us more time.

The servant says: do not delay me.

And then they do something remarkable for the ancient world.

They ask Rebekah.

"Let's call the young woman and ask her about it."

That detail matters. She is the one being given in marriage, transported hundreds of miles away from her family, her home, her people, her entire world — and they ask her if she wants to go.

"Will you go with this man?"

And Rebekah says one word: I will.

She packs up everything. She and her attendants load up on camels and follow this servant she has just met to a man she has never seen. She leaves behind everyone and everything she knows on the basis of one conversation, one set of gifts, and one servant's account of a prayer answered at a well.

She is riding toward a stranger who is to be her husband.

Genesis 24 describes the first meeting: Isaac is out walking in the field in the evening when he sees the camels approaching. Rebekah sees him and gets down from her camel and asks the servant: who is that man? When he tells her it is his master, she covers her face with a veil — the customary act of modesty when meeting a prospective husband.

And Isaac takes her into his tent. He loves her. And the text says she is a comfort to him after his mother's death.

Rebekah's story doesn't end there. In Genesis 25 she is told by God that she is carrying twin boys who represent two nations, and that the older will serve the younger — a reversal of the expected birth-right order. She holds that prophecy for years while her sons grow up.

And when the moment comes — when Isaac is old and preparing to give his blessing to Esau, the firstborn — Rebekah acts on the prophecy she received. She engineers the deception in which Jacob receives the firstborn blessing instead. It's not a clean story. Jacob lies to his blind father. Rebekah is the architect of the scheme.

But she is acting on what God told her. The older will serve the younger. She takes a risk that could have destroyed her relationship with her husband and her son. She bears the weight of the scheme. When Jacob worries about the consequences, she says: let the curse fall on me.

She acts. She chooses. She bears the cost.

You can debate the ethics of the method. But Rebekah is not a passive figure in the story of the covenant. She is someone who hears from God, holds it for years, and then moves when the moment arrives.

She is also the woman who said yes.

One camel ride into the unknown. One moment where someone asked her what she wanted and she answered clearly. The whole trajectory of the covenant people runs through that moment of choice. If she says no, Isaac doesn't have a wife, Jacob and Esau aren't born, the twelve tribes don't exist, the whole story doesn't continue as it does.

She says I will.

That's enough.$w7$
  WHERE devotional_id = v_id AND day_number = 7;

  UPDATE devotional_days SET devotional_text = $w8$This story is painful to read if you're paying attention. It should be.

Jacob arrives in his uncle Laban's territory after fleeing his brother Esau, whose birthright he has stolen. He meets Rachel at a well — the same motif as his mother Rebekah, which is not accidental — and the text says he kisses her and weeps aloud. He meets Laban and agrees to work seven years for the right to marry Rachel.

Seven years. For love of one woman.

And Genesis 29:20 contains one of the most beautiful sentences in the entire Bible: "So Jacob served seven years to get Rachel, but they seemed like only a few days to him because of his love for her."

Then the wedding night comes.

And Laban brings Leah into the tent instead of Rachel.

Jacob wakes up in the morning and discovers the deception. The man who deceived his own father is now himself deceived by a father. The irony is not subtle. And Jacob is angry — understandably — and Laban's explanation is cultural: "It is not our custom here to give the younger daughter in marriage before the older one."

Jacob works another seven years for Rachel. Laban gives him Rachel after the wedding week with Leah is complete, and Jacob also marries Rachel. But the text is clear about the result: Jacob loved Rachel more than Leah.

Now there are two sisters. Both married to the same man. One loved deeply. One not loved in the same way.

The Bible is about to describe one of the most painful domestic situations in the Old Testament, and it will not sanitize it.

God sees that Leah is not loved. So He opens her womb. And Rachel, who is loved, is barren.

That's the arrangement. And you can feel the particular cruelty of it — the woman who already has the one thing she most wants, her husband's love, cannot give him children. The woman who has given up hope of having her husband's love discovers she can give him sons.

Leah names her first son Reuben, which means "the LORD has seen my misery." Her naming reveals her heart. She believes that because she has given Jacob a son, now surely my husband will love me.

She has Simeon next. Because the LORD heard that I am not loved. She has Levi. She has Judah — and at Judah's birth, the name changes: "This time I will praise the LORD." Leah has stopped naming her sons after her hope for Jacob's affection. She's praising God.

That is a quiet, profound moment. Leah has shifted from wanting to be loved to worshipping the One who already loves her.

Meanwhile, Rachel is desperate. She says to Jacob: "Give me children, or I'll die!" Jacob answers, not without some justice: "Am I in the place of God, who has kept you from having children?" And she gives him her servant Bilhah as a secondary wife. And Bilhah has sons. The rivalry intensifies.

This is not comfortable reading. This is two women in a heartbreaking situation, both trying to secure something through childbearing — one trying to secure her husband's love, one trying to secure her place in the household. Neither of them chose this situation. Both were given to Jacob by a scheming father. Both are doing what they know to do in a world with very few other options.

And God is present in both of their stories.

He sees Leah's pain. He opens her womb. He gives her sons. He watches the shift in her heart from "will Jacob love me now" to simply praising Him.

And He does not forget Rachel. Genesis 30:22: "Then God remembered Rachel; he listened to her and enabled her to conceive." She has Joseph, and later Benjamin — and dies giving birth to Benjamin, her last act the bringing of one more life into the world.

The story of Rachel and Leah is the story of two women caught in an impossible situation created by the men around them — a deceptive father, a man who chose one and couldn't love the other the same way. And it's the story of how God saw both of them, met both of them, and worked through both of them.

Leah's son Judah becomes the ancestor of King David. And of Jesus. The woman who was not loved — whose name means "weary" — is the direct maternal ancestor of the Messiah.

Rachel's son Joseph saves the world from famine. The woman who wept over her empty womb carries the man who feeds Egypt and Israel through the worst crisis of the ancient world.

Loved and unloved. Fertile and barren. Rivals and sisters. And through both of them, the plan of God moved forward without interruption.

Here is what this story refuses to let us say: that God only works through people in ideal circumstances. The family of Israel — the twelve tribes — was born out of jealousy and rivalry and pain and two women who were both, in different ways, struggling to be enough.

God didn't wait for a perfect family. He worked through the broken one.

He always does.$w8$
  WHERE devotional_id = v_id AND day_number = 8;

  UPDATE devotional_days SET devotional_text = $w9$Miriam is on the scene before Moses is even named.

Exodus 2. A Hebrew baby has been hidden for three months in defiance of Pharaoh's decree that all Hebrew baby boys be killed. The mother can hide him no longer, so she makes a papyrus basket, waterproofs it with tar and pitch, places the baby inside, and sets it among the reeds of the Nile. Then she walks away.

She walks away because she cannot watch.

And Miriam — identified later as the baby's sister — stands at a distance to see what will happen.

She watches Pharaoh's daughter come down to the river to bathe. She watches the daughter notice the basket. She watches the daughter open it and see the crying baby and feel compassion for him.

And Miriam moves.

She walks up to the daughter of Pharaoh — a servant girl approaching royalty, with no standing, no protection, and a plan that could go very badly — and says: "Shall I go and get one of the Hebrew women to nurse the baby for you?"

The daughter says yes.

And Miriam goes and gets their own mother.

This child will be nursed by his own mother, in his own household, paid by Pharaoh's treasury, under the protection of Pharaoh's daughter. And it happens because a young girl watched carefully and moved at exactly the right moment.

That's Miriam. Alert. Bold. Quick-thinking. Willing to walk up to someone powerful with a plan.

Decades later, after the Exodus, after the Red Sea crossing, after Pharaoh's army is drowned in the water — it is Miriam who leads the celebration. Exodus 15:20-21: "Then Miriam the prophet, Aaron's sister, took a timbrel in her hand, and all the women followed her, with timbrels and dancing."

Miriam the prophet. That is her title in the text. Not just Aaron's sister. Not just Moses' sister. The prophet.

She leads the women of Israel in a song of victory — "Sing to the LORD, for he is highly exalted. Both horse and driver he has hurled into the sea." She is worship leader, prophet, and community guide. She is one of three people God specifically names as leaders of the Exodus in Micah 6:4: "I sent Moses to lead you, also Aaron and Miriam."

Three names. Moses, Aaron, and Miriam.

God names her as a leader of Israel.

And then comes Numbers 12.

This is the part that doesn't make it into most of the songs about Miriam. And it's important.

Miriam and Aaron begin to speak against Moses. The stated issue is that Moses has married a Cushite woman — a marriage they apparently disapprove of. But the real issue surfaces in the next verse: "Has the LORD spoken only through Moses? Hasn't he also spoken through us?"

This is a pride problem. A jockeying-for-position problem. They are questioning Moses' unique authority, perhaps resenting the special way God communicates with him — face to face, plainly, not in riddles or dreams like the other prophets.

God is angry. He calls all three of them to the tent of meeting. He speaks to Aaron and Miriam in a cloud: "When there is a prophet among you, I, the LORD, reveal myself to them in visions, I speak to them in dreams. But this is not true of my servant Moses; he is faithful in all my house. With him I speak face to face, clearly and not in riddles; he sees the form of the LORD. Why then were you not afraid to speak against my servant Moses?"

When the cloud lifts, Miriam is covered with a skin disease described as white — a condition rendering her ceremonially unclean, cut off from the community.

Aaron immediately confesses and pleads with Moses. Moses immediately cries out to God: "Please, God, heal her!" His prayer for the sister who had protected him as a baby is immediate and tender.

God answers: she will be restored after seven days of being shut outside the camp.

This is the full picture of Miriam. Not just the triumph at the Red Sea, but also the moment of pride that cost her a week of isolation. She is named as a prophet and leader, and she fails in exactly the way leaders often fail — by starting to compare her gifting to someone else's and letting that comparison turn into challenge.

The people waited for her. The cloud did not move during those seven days. Israel did not continue the march until Miriam was brought back in.

That detail matters. The whole nation waited.

She was that significant to the community. Even in her discipline, her restoration was worth the delay.

Miriam teaches us that God uses people with real gifts and real flaws — and that the same person who leads worship after a miraculous deliverance can, a few chapters later, let pride lead them somewhere damaging. That's not a disqualifying combination. It's a human one.

She is the prophet sister. She is also the woman who was humbled. She is both. God holds both.

And the people waited for her to come back.$w9$
  WHERE devotional_id = v_id AND day_number = 9;

  UPDATE devotional_days SET devotional_text = $w10$Rahab lives in a house built into the city wall of Jericho.

She is a prostitute. That is what the text says, plainly, in Joshua 2:1. There is no softening it, no translating around it, no alternative interpretation that sticks. She is a professional sex worker in a Canaanite city.

And her name appears in the genealogy of Jesus Christ.

Matthew 1:5 — the genealogy that opens the New Testament, the list of names through which the Messiah's lineage is traced: "Salmon the father of Boaz, whose mother was Rahab."

Rahab is the great-great-grandmother of King David. She is an ancestor of Jesus.

Let's understand what she does to get there.

Joshua has sent two spies into Jericho to scout the land. They go to Rahab's house — possibly because a visitor to a prostitute's house would not attract unusual attention. She hides them. And then the king of Jericho sends word: there are Israelite spies in your house. Bring them out.

Rahab has a choice.

She hides the men under stalks of flax on her roof and then speaks to the king's messengers. She says the men were here, but they left at dusk, before the gate closed. She doesn't know where they went — but if you hurry, you might catch them.

She has lied to the king. Protected foreigners. Defied authority. This is a hanging offense.

Why does she do it?

She tells the spies before they leave: "I know that the LORD has given this land to you and that a great fear of you has fallen on us, so that everyone in this land is melting in fear because of you. We have heard how the LORD dried up the water of the Red Sea for you when you came out of Egypt, and what you did to Sihon and Og, the two kings of the Amorites east of the Jordan, whom you completely destroyed."

She has heard the stories. The Red Sea. The victories in battle. And she has drawn a theological conclusion that the king of Jericho and all the military establishment of Canaan have not managed to draw: "For the LORD your God is God in heaven above and on the earth below."

She says that. A Canaanite prostitute says what the Pharisee won't say. What the religious establishment won't say. She looks at the evidence and concludes: this God is real. This God is the God. This God is going to win.

And so she makes a deal. She has shown kindness to the spies — give me a sure sign that you will show kindness to my family. She asks for her father, mother, brothers, sisters, and all who belong to them to be spared when Israel takes the city.

The spies agree. The sign: a scarlet cord tied in the window. The same window through which she lets them down by a rope to escape. Bring your household inside when the attack begins. If anyone goes outside, their blood is on their own head. But anyone inside is safe.

Scarlet cord in the window. Scarlet blood of the covenant. The connection is not subtle.

She ties the cord immediately. She doesn't wait to see if the deal will hold. She acts on their word.

When the walls come down — and they come down in one of the strangest military operations in history, seven days of marching, seven priests with seven trumpets, and on the seventh day the walls collapse — Rahab's house on the wall is still standing. She and her household are brought out.

Then this: Joshua 6:25 — "Joshua spared Rahab the prostitute, with her family and all who belonged to her, because she hid the men Joshua had sent as spies to Jericho. And she lives among the Israelites to this day."

She lives among the Israelites.

She is brought inside the covenant community. The outsider becomes an insider. The Canaanite becomes part of Israel. And she marries an Israelite named Salmon and has a son named Boaz — who will feature in the next story we study, Ruth — and through Boaz the line goes to David, and from David to Jesus.

Rahab appears twice in the New Testament apart from the genealogy. Hebrews 11 — the hall of faith — lists her: "By faith the prostitute Rahab, because she welcomed the spies, was not killed with those who were disobedient." James 2:25: "In the same way, was not even Rahab the prostitute considered righteous for what she did when she gave lodging to the spies and sent them off in a different direction?"

She is in the hall of faith. She is called righteous.

Not because she had a clean past. Not because she was from the right people. Not because she had earned it.

Because she believed. She heard the stories, she drew the right conclusion, she took the risk, and she tied the scarlet cord in the window.

Faith acted on, with everything at stake.

Rahab teaches us something critical about how God chooses His people: He is not looking for people who have already lived well. He is looking for people who will believe Him now, with what they know now, and act on that belief.

She was the last person anyone would have expected to find in the genealogy of the Son of God.

She is exactly the person Jesus came for.$w10$
  WHERE devotional_id = v_id AND day_number = 10;

  UPDATE devotional_days SET devotional_text = $w11$Judges is a difficult book.

It covers a period of Israel's history characterized by a recurring cycle: the people abandon God, God lets them experience the consequences of that abandonment, they cry out for help, God raises up a deliverer called a judge, things get better, the deliverer dies, the people abandon God again. Repeat.

The judges are a mixed collection of people. Some of them are straightforward military heroes. Some are morally compromised. Samson, one of the most famous, is brilliant and powerful and almost entirely self-destructive. Jephthah makes a foolish vow that destroys his daughter. Gideon starts well and ends up making an idol.

Into this context steps Deborah.

Judges 4:4 introduces her with an efficiency that barely pauses for breath: "Now Deborah, a prophet, the wife of Lappidoth, was leading Israel at that time."

Prophet. Leading Israel. That's it. No explanation of how she got there, no extended narrative about her calling, no apologetic for the fact that she is a woman holding this role. She is a prophet and she is judging Israel. The text states it as simply as it states anything.

She held court under the Palm of Deborah between Ramah and Bethel in the hill country of Ephraim, and the Israelites came to her to have their disputes decided.

She is functioning as chief justice, military commander, and prophetic voice all at once.

The situation: Israel has been oppressed for twenty years under Jabin, king of Canaan, and his military commander Sisera. Sisera has nine hundred iron chariots — state-of-the-art military technology in the ancient world. Nine hundred chariots against a largely agrarian, tribal nation with no standing army and no equivalent weaponry.

Deborah summons Barak, a military commander. She delivers a direct word from the LORD: take ten thousand men from the tribes of Naphtali and Zebulun to Mount Tabor. I will deliver Sisera and his chariots and army into your hands.

Barak's response is telling: "If you go with me, I will go; but if you don't go with me, I won't go."

This is the military commander of Israel. He will go into battle against nine hundred iron chariots only if the woman prophet comes with him.

Deborah agrees to go. But she tells him: because of the way you have done this, the honor of this victory will not be yours. The LORD will deliver Sisera into the hands of a woman.

She doesn't say that as a rebuke to women. She says it as a word about Barak — he has let fear or hesitancy lead him to hide behind a woman's leadership when he should have taken the field himself, and as a result, the glory of the decisive moment won't belong to him.

The battle is joined. Sisera's nine hundred chariots are routed. The LORD throws the Canaanite army into confusion. They are cut down. Every last one.

Except Sisera. He flees on foot.

He comes to the tent of Jael, wife of Heber the Kenite — a family at peace with Jabin's Canaanite kingdom. Jael welcomes him in. Covers him with a blanket. Gives him milk when he asks for water. He tells her to stand at the door and say there's no one here if anyone asks.

He falls asleep.

And Jael takes a tent peg and a hammer and drives it through his temple.

This is the woman into whose hands the LORD delivered Sisera — not Deborah herself, but the fulfillment of Deborah's prophecy through yet another woman.

Notice something important about this whole story. At the moment when Israel needed military leadership, Barak wavered. God provided Deborah. At the moment when a fleeing enemy needed to be stopped, Jael acted. Two women, at two critical junctures, do what the men in the story fail to do or don't think to do.

The text doesn't editorialize about gender. It simply records what happened.

Judges 5 contains the Song of Deborah, one of the oldest pieces of poetry in the entire Bible. It is a long, triumphant account of the battle, filled with historical detail and theological reflection. And the first line is: "When the princes in Israel take the lead, when the people willingly offer themselves — praise the LORD!"

Deborah led. But she understood that the victory belonged to God. She is not a figure who steps into power for her own sake. She is a figure who steps into a gap because God calls her there and nobody else is willing to fill it.

This is a pattern worth noticing through the whole Bible. God doesn't call Deborah to leadership because the men had all failed or to make a statement about gender politics. He calls her because she is the person available, willing, faithful, and capable — and because the story He is writing needed someone like her at exactly this moment.

She led a nation through one of its darkest periods and brought it peace.

"The land had peace forty years."

Forty years. An entire generation of peace, secured through a woman sitting under a palm tree, listening to God, and then going to war.$w11$
  WHERE devotional_id = v_id AND day_number = 11;

  UPDATE devotional_days SET devotional_text = $w12$The book of Ruth is only four chapters long. You can read it in twenty minutes.

Don't let the length fool you. It is one of the most perfectly constructed narratives in the entire Bible, and it contains more theology per word than most books ten times its length.

The setup: a famine in Israel. A man named Elimelech takes his wife Naomi and their two sons to the foreign country of Moab to survive. The sons marry Moabite women — Ruth and Orpah. Then Elimelech dies. Then both sons die.

Three widows in the ancient world. No male provider, no legal standing, no source of income. This is as desperate as a situation gets.

Naomi hears the famine in Israel has ended. She decides to return home to Bethlehem. She tells her daughters-in-law to go back to their own families, their own people, where they might find new husbands and some kind of future. In Moab, they are young women with options. Following Naomi back to Israel, they are foreign widows with none.

Orpah weeps and leaves. The text doesn't condemn her. It's the logical choice.

Ruth refuses.

Ruth 1:16-17. These are some of the most quoted words in the whole Bible: "Where you go I will go, and where you stay I will stay. Your people will be my people and your God will be my God. Where you die I will die, and there I will be buried. May the LORD deal with me, be it ever so severely, if even death separates us."

This is not just loyalty to Naomi. This is a covenant declaration. Ruth is making the same kind of unilateral, unconditional commitment that God makes to His people. She is binding herself to Naomi with the language of covenant — "may the LORD deal with me" is an oath formula. She is calling on the God of Israel as her own God and invoking His judgment on any breach of her word.

She has just converted. Without a temple, without a priest, without a formal ceremony — standing on a road in Moab, she has declared: your God is my God. I'm in.

They arrive in Bethlehem at the beginning of the barley harvest. Ruth asks to go glean in the fields — the biblical provision for the poor, which allowed those without land to pick up what the harvesters left behind. It's exhausting, humble work. But Ruth does it without complaint.

She happens to end up in the field of Boaz.

The text says "as it turned out." That's Hebrew understatement for the hand of God.

Boaz notices her. He finds out who she is. He tells his workers to leave extra grain for her deliberately — more than the law requires. He invites her to eat with his workers and drink from their water. He tells his men to make sure she is not harassed.

He explains why: "I've been told all about what you have done for your mother-in-law since the death of your husband — how you left your father and mother and your homeland and came to live with a people you did not know before."

The whole town knows Ruth's story. And Boaz sees it the way God sees it: as faith. As loyalty. As covenant fidelity.

He says: "May the LORD repay you for what you have done. May you be richly rewarded by the LORD, the God of Israel, under whose wings you have come to take refuge."

Under whose wings. Ruth has come under the wings of the God of Israel. The same imagery used in the Psalms for God's shelter and protection — the mother bird spreading her wings over her young.

As the story develops, Naomi realizes that Boaz is a kinsman-redeemer — a relative of her deceased husband who has the legal right and responsibility to redeem the family's land and marry the widow to continue the family line. She instructs Ruth to go to Boaz at the threshing floor at night and "uncover his feet" — a gesture with both legal and personal significance, a vulnerable act of appeal.

Ruth does exactly what Naomi says. She asks Boaz to spread his cloak over her — the same gesture of covenant protection that Boaz prayed God would extend to Ruth. She is asking him to be the answer to his own prayer for her.

Boaz is moved. He confirms that he will redeem her. But there is a closer relative who has the right of first refusal — that man must be consulted first.

In the city gate the next morning, Boaz handles the legal transaction publicly, in front of witnesses. The closer kinsman declines his right of redemption — he can't afford the complication it would bring to his estate. Boaz takes up the right of redemption. He buys the land. He takes Ruth as his wife.

Ruth 4:13: "So Boaz took Ruth and she became his wife. When he made love to her, the LORD enabled her to conceive, and she gave birth to a son."

The son's name is Obed. The women of the town say to Naomi: "Praise be to the LORD, who this day has not left you without a guardian-redeemer... He will renew your life and sustain you in your old age. For your daughter-in-law, who loves you and who is better to you than seven sons, has given him birth."

Better than seven sons. In a culture that measured a woman's worth by her sons, the women of Bethlehem say this foreign daughter-in-law is worth more.

Obed is the father of Jesse. Jesse is the father of David.

Ruth the Moabite, who chose a foreign God and a foreign people and followed an old woman to a strange land — her faithfulness runs directly into the bloodline of Jesus.

The book of Ruth is about hesed. That's the Hebrew word for covenant loyalty, lovingkindness, steadfast love. It's the word used in the Psalms for the love of God that never fails. And the whole book of Ruth is about human beings practicing hesed toward each other — and about God practicing it back.

Ruth shows hesed to Naomi. Boaz shows hesed to Ruth. God shows hesed to all of them by arranging an encounter at a harvest field and opening a barren womb.

The story that begins with three women on a road and famine and death ends with a harvest and a wedding and a baby and a genealogy that leads to the King of Kings.

That is the shape of God's redemption.$w12$
  WHERE devotional_id = v_id AND day_number = 12;

  UPDATE devotional_days SET devotional_text = $w13$Hannah is in pain every single year.

The annual pilgrimage to Shiloh, where Israel went to worship and offer sacrifices, should be a time of joy. For Hannah, it is agony.

Her husband Elkanah loves her. The text makes that clear. He gives her a double portion at the sacrifice because he loves her and because the LORD has closed her womb. But he has another wife — Peninnah — who has children, and Peninnah uses that advantage with precision.

1 Samuel 1:6: "Because the LORD had closed Hannah's womb, her rival kept provoking her in order to irritate her. This went on year after year. Whenever Hannah went up to the house of the LORD, her rival provoked her till she wept and would not eat."

Peninnah is described as a rival — a word with a particular edge in Hebrew, used specifically for a co-wife in a polygamous marriage. She knows exactly where the wound is, and she keeps pressing on it. Year after year. The House of God, the place of worship, becomes the place of Hannah's annual humiliation.

Elkanah, who means well but doesn't quite understand, says: "Hannah, why are you weeping? Why don't you eat? Why are you downhearted? Don't I mean more to you than ten sons?"

He is asking a sincere question and offering himself as compensation. But you cannot substitute one kind of love for another. A husband who loves you deeply does not fill the specific ache of an empty womb. Elkanah's love is real and insufficient at the same time, and Hannah knows the difference.

So she does the only thing she has left. She goes to the temple.

1 Samuel 1:10: "In her deep anguish Hannah prayed to the LORD, weeping bitterly."

Deep anguish. Weeping bitterly. This is not polite religious distress. This is a woman at the end of herself, bringing everything she has to God and holding nothing back.

She makes a vow: "LORD Almighty, if you will only look on your servant's misery and remember me, and not forget your servant but give her a son, then I will give him to the LORD for all the days of his life."

She is praying with her lips but no sound is coming out. Her lips are moving; her voice is silent. She is so raw, so deep in her prayer, that it's coming out of a place beneath words.

And Eli the priest sees her.

And he thinks she's drunk.

"How long are you going to stay drunk? Put away your wine."

That is the moment. The woman in the deepest possible prayer, in the temple of God, is accused of public drunkenness by the man whose job it is to shepherd her to God. Eli represents the religious establishment failing the person most in need of God.

Hannah does not collapse or leave. She corrects him with remarkable composure: "Not so, my lord. I am a woman who is deeply troubled. I have not been drinking wine or beer; I was pouring out my soul to the LORD. Do not take your servant for a wicked woman; I have been praying here out of my great anguish and grief."

Eli, to his credit, believes her and blesses her: "Go in peace, and may the God of Israel grant you what you have asked of him."

And then: "She went her way and ate something, and her face was no longer downcast."

Before anything has happened. Before the prayer is answered. She eats. Her face changes. She has transferred the weight of it to God, and something in her has been lightened even before the answer comes.

The LORD remembers her. She conceives. She has a son. And she names him Samuel — a name connected to the phrase "I asked the LORD for him."

And then she does what she vowed she would do.

When Samuel is weaned — around three years old in that culture — she brings him to Eli at the temple and gives him back. She says: "I prayed for this child, and the LORD has granted me what I asked of him. So now I give him to the LORD. For his whole life he will be given over to the LORD."

This is the part of Hannah's story that stops people cold.

She asked for a son. She received a son. And she gave him away.

Not abandoned him — she continued to visit him annually, bringing him a little robe she had made each year. She had more children after Samuel. But Samuel lived at the temple. Samuel was given to God, as she promised.

And Samuel became the last and greatest of Israel's judges, the prophet who anointed both Saul and David as king, the man who shaped the entire transition from tribal confederation to monarchy. The fate of Israel's monarchy runs through Samuel, and Samuel exists because Hannah prayed in the temple while Eli thought she was drunk.

Hannah's prayer of praise after giving Samuel to God is recorded in 1 Samuel 2 and is almost word-for-word the template that Mary uses in the Magnificat in Luke 1. Both women — separated by a thousand years — praise God in the same language because they experienced the same God.

The God who sees the lowly. Who lifts the poor from the dust. Who brings down the mighty and exalts the humble. Who opens barren wombs.

Hannah poured out her soul to God, was misread by the religious establishment, trusted God with the answer before it came, received what she asked for, and gave it back.

That is the shape of faith that moves the world.$w13$
  WHERE devotional_id = v_id AND day_number = 13;

  UPDATE devotional_days SET devotional_text = $w14$The story of Bathsheba is almost always told as a story about David.

That is the first problem.

When you tell it as a story about David — his lust, his sin, his cover-up, his repentance — Bathsheba becomes a supporting character in someone else's moral drama. She is the temptation he failed to resist, the sin he has to deal with, the woman in the way of his relationship with God.

But Bathsheba is a person. And her experience of this story is nothing like David's.

2 Samuel 11. It is spring, the time when kings go to war. But David has stayed in Jerusalem while his army is in the field. He gets up from his afternoon rest and walks on the roof of the palace, and he sees a woman bathing. She is very beautiful.

He sends someone to find out who she is. The answer he gets should have stopped him: "She is Bathsheba, the daughter of Eliam and the wife of Uriah the Hittite."

The wife. The wife of one of his own soldiers, one of his Mighty Men. The information is a wall of prohibition clearly placed in his path.

He sends messengers to get her. She comes to him. He sleeps with her.

The Hebrew is brief and blunt. He sent. She came. He lay with her. None of the text describes desire on her side, a choice on her side, a seduction on her side. The entire sequence of verbs belongs to David. He is the king. She is a subject summoned to the palace. In the power structure of the ancient world, this is not a seduction. This is a king exercising power over a subject.

When she finds out she is pregnant, she sends word to David. That's all. She doesn't threaten. She doesn't demand. She informs him.

And David begins a cover-up. He tries to get Uriah to come home from the battlefield and sleep with his wife, so that the child will appear to be Uriah's. Uriah refuses — he will not enjoy the comforts of home while his fellow soldiers are in the field. David tries again. Uriah still refuses.

So David sends a letter back to his military commander by the hand of Uriah himself — Uriah carries his own death warrant — and the order is to put Uriah in the front of the heaviest fighting and withdraw so that he is killed.

Uriah is killed.

Bathsheba mourns her husband.

Then David brings her to his house and she becomes his wife and bears him a son. The text says simply: "But the thing David had done displeased the LORD."

The prophet Nathan comes to David with the famous story of the rich man who takes the poor man's one beloved lamb. David is furious at the injustice. Nathan says: "You are the man." The consequences unfold — the child dies. David and Bathsheba grieve together.

This is where most retellings of the story end. But Bathsheba's story has a second act.

God gives them another son. His name is Solomon. And the LORD loves Solomon — the text says God sends a message through Nathan to name him Jedidiah, "loved by the LORD."

Bathsheba raises Solomon. She watches him grow. She watches the court politics of David's aging years, the jockeying for succession. When David is old and his son Adonijah positions himself to seize the throne — going around what David had apparently promised, which was that Solomon would succeed him — Bathsheba acts.

1 Kings 1. Nathan the prophet comes to Bathsheba and says: do you know Adonijah has become king? Your life and Solomon's life are at stake. Go in to David and ask for the throne for Solomon.

And Bathsheba does it. She goes to the aging king and bows before him, and she lays out the situation clearly and asks him to fulfill his oath that Solomon would reign.

Notice what she has become. She is not a passive victim anymore. She is a skilled court advocate, presenting her case to the king, asking for the fulfillment of a promise. She acts with intelligence and courage at a moment when her son's life and her own are genuinely at stake.

David gives the order: Solomon will be king. He is anointed that day.

When Solomon begins his reign, Bathsheba goes to him in 1 Kings 2 with a request. Solomon brings a throne for her and seats her at his right hand — the position of honor. He says: "Ask it, mother; I will not refuse you."

The woman David summoned from her bath, whose husband David murdered, whose first child died — this woman now sits at the right hand of the king of Israel, and her son will not refuse her.

From the worst thing that happened to her, God built a throne.

That is not a comfortable theological point. It doesn't erase the suffering or validate the violence that was done to her. The Bible doesn't ask us to be grateful for evil done to us as if it were a gift.

But it does insist on this: God is not limited by the damage people cause. He can work through the aftermath of the worst things that happen to the most vulnerable people, and bring something real and lasting out of the wreckage — not erasing the wound, but building something true from what's left.

Bathsheba's son built the temple of God in Jerusalem.

The woman the world used becomes the mother of the builder.$w14$
  WHERE devotional_id = v_id AND day_number = 14;

  UPDATE devotional_days SET devotional_text = $w15$The book of Esther never mentions God.

Not once. His name does not appear anywhere in the text. For a book in the Bible, that is unusual enough to stop you in your tracks.

But read it carefully, and you see God in every verse — not named, but present. Organizing. Arranging. Opening doors. Timing moments. Working through ordinary people making difficult choices.

That is its own kind of theology.

The setup: Persia under King Ahasuerus, also known as Xerxes. A young Jewish woman named Esther — Hebrew name Hadassah — has been raised by her older cousin Mordecai after her parents died. She is beautiful. She is also, by Mordecai's instruction, keeping her Jewish identity secret.

How she ends up in the king's household is a whole story in itself. Queen Vashti refuses to be displayed before the king's guests when he is drunk, and the king removes her. He then assembles the beautiful young women of the kingdom for a kind of beauty contest from which he will choose a new queen.

Esther is brought to the palace.

This is, by modern standards, an appalling situation — young women being gathered into a king's harem for his selection. The text doesn't editorialize. It records. And in this situation Esther has no more choice than the other women brought in from across the empire.

But she wins the favor of every person she encounters — the keeper of the harem, the other women, and eventually the king himself. She becomes queen of Persia.

Mordecai has been sitting at the king's gate, watching over her as best he can. He refuses to bow to Haman, the king's chief minister — because a Jew does not bow to any man the way Haman demands. Haman is furious. And in his fury he makes a decision of staggering proportions: he will not just punish Mordecai. He will destroy all the Jews in the empire.

He goes to the king and paints the Jews as a troublesome foreign population that doesn't follow the king's laws. He offers to fund the destruction himself. The king signs off on it — an edict that goes out to every province of the empire: on a certain day, all Jews, men and women and children, are to be killed and their goods seized.

Mordecai tears his clothes and mourns publicly. Esther's servants report back to her that he is in distress. She sends him clothes. He refuses them and sends back word of what has happened — the edict, the decree, the plan. He asks her to go to the king and beg for mercy for her people.

This is where Esther pulls back. She explains the situation to Mordecai: anyone who approaches the inner court of the king without being summoned is put to death — the only exception being if the king holds out his golden scepter. And the king has not summoned her in thirty days.

Then Mordecai says what may be the most famous words in the book: "Do not think that because you are in the king's house you alone of all the Jews will escape. For if you remain silent at this time, relief and deliverance for the Jews will arise from another place, but you and your father's family will perish. And who knows but that you have come to your royal position for such a time as this?"

For such a time as this.

Mordecai's argument is not that Esther must act or all will be lost. He tells her plainly: deliverance will come. But maybe — who knows? — she is the person God has positioned for this moment. Maybe the whole improbable arc of her life — orphaned, raised in exile, chosen from among all the women of the empire — maybe all of it has been preparation for this one decision.

Esther takes three days to fast. She asks Mordecai to gather all the Jews in Susa to fast with her. Then she says: "When this is done, I will go to the king, even though it is against the law. And if I perish, I perish."

If I perish, I perish. That's the whole thing. She knows the risk is real. She has no guarantee the king will receive her. She goes anyway.

The king holds out his scepter. She is received.

She doesn't ask immediately. She invites him to a banquet. He comes. She invites him to a second banquet. At the second banquet, she finally speaks: she reveals her identity as a Jew, reveals the edict, reveals Haman as the man who purchased her people's destruction.

The king is furious at Haman. Haman is executed on the very gallows he had built for Mordecai. A counter-edict is issued allowing the Jews to defend themselves. They are saved.

The book of Esther is a story about a woman who used every tool she had — her relationship, her timing, her intelligence, her patience — to save her people. She didn't rush. She didn't act impulsively. She prepared, fasted, moved carefully, and acted at exactly the right moment.

And she acted in spite of fear.

This is crucial: there is nothing in the text that suggests Esther was unafraid. She tells Mordecai plainly that going to the king without being summoned is potentially fatal. "If I perish, I perish" is not the declaration of a fearless person. It is the declaration of a person who is afraid and going anyway.

Courage is not the absence of fear. It is the decision to act in spite of it.

Esther is celebrated still, every year at Purim, by Jewish communities around the world. She stands as the person who understood that her position was not for her own comfort or safety, but for something much larger.

For such a time as this.

Whatever position you hold — whatever relationships, whatever access, whatever season of life — the question Mordecai asked Esther is the question worth carrying:

Who knows but that you have come to where you are for such a time as this?$w15$
  WHERE devotional_id = v_id AND day_number = 15;

  UPDATE devotional_days SET devotional_text = $w16$She is probably about fourteen years old.

That's the historical reality. Jewish girls in first-century Palestine were typically betrothed in their early teenage years, in accordance with the customs of their time and culture. Betrothal was a legally binding commitment — more serious than modern engagement, less than full marriage. She was betrothed to Joseph, a carpenter.

She was nobody important. Nazareth was nobody's important city. It was a small town in Galilee, away from the centers of power and religious life. Not Jerusalem. Not Jericho. Nazareth — a place so unremarkable that when Philip told Nathanael about Jesus, his response was: "Can anything good come from Nazareth?"

Into this ordinary, even obscure existence, an angel appears.

Luke 1:28: "The angel went to her and said, 'Greetings, you who are highly favored! The Lord is with you.'"

Luke records Mary's response: "She was greatly troubled at his words and wondered what kind of greeting this might be."

She doesn't fall apart. She doesn't faint. She is troubled and she wonders. That's a careful, thoughtful response. She is trying to understand what she is hearing.

The angel tells her: don't be afraid. You have found favor with God. You will conceive and give birth to a son. You will name him Jesus. He will be great. He will be called the Son of the Most High. His kingdom will never end.

And Mary asks a practical question: "How will this be, since I am a virgin?"

It's a reasonable question. She's not doubting — she's asking for information. Zechariah, when he was told Elizabeth would have a son, asked "How can I be sure of this?" and was struck mute for his doubt. Mary asks the same kind of how question and is given an answer.

Notice the difference between them. Zechariah was a priest in the temple, in the place of highest religious authority, and he doubted. Mary was a teenage girl in a small town, and she asked a question and listened.

The angel explains: the Holy Spirit will come on you. The power of the Most High will overshadow you. The holy one to be born will be called the Son of God.

And Mary says: "I am the Lord's servant. May your word to me be fulfilled."

That's it. That's the yes that changes everything. No conditions. No negotiating. No asking for more details about how this will work, what Joseph will say, what her parents will think, what will happen to her reputation.

The Lord's servant. May it be.

Now let's talk about what that yes actually meant for her life.

She would have known, immediately, that a pregnancy before marriage would be impossible to explain. Betrothed women who were found to be pregnant could be divorced — publicly, legally, humiliatingly. Under older interpretations of Mosaic law, a betrothed virgin who was found with another man could be stoned. These were not abstract threats. They were the social and legal reality she was saying yes into.

She goes immediately to visit her relative Elizabeth, who is herself miraculously pregnant with the child who will be John the Baptist. Elizabeth greets her: "Blessed are you among women, and blessed is the child you will bear! But why am I so favored, that the mother of my Lord should come to me?"

And Mary sings. Luke 1:46-55, the Magnificat. "My soul glorifies the Lord and my spirit rejoices in God my Savior." She praises God for seeing her humble state, for doing great things, for filling the hungry and sending the rich away empty.

Then she goes home. She faces Joseph. Joseph finds out she is pregnant and plans to divorce her quietly — he is a good man who doesn't want to expose her to public disgrace. An angel appears to him in a dream and tells him the truth, and Joseph takes her as his wife.

Then the census. The journey to Bethlehem. No room. A stable. A manger.

She wraps the Son of God in strips of cloth and lays him in a feeding trough.

And then the years of raising Him. Watching Him grow. The day He stays behind in Jerusalem at twelve and she finds Him in the temple — "Didn't you know I had to be in my Father's house?" The years of His ministry that must have been bewildering and extraordinary all at once. His arrest. His crucifixion.

Mary is at the cross. John 19:25: "Near the cross of Jesus stood his mother." She watched.

She watched her son die.

And then she is in the upper room after the resurrection. Acts 1:14: "They all joined together constantly in prayer, along with the women and Mary the mother of Jesus."

She is there when the Holy Spirit comes at Pentecost.

Mary's life, from that moment in Nazareth to the upper room in Jerusalem, is a life entirely rearranged by one question, one answer, and one yes.

She said yes to something that would bring her joy beyond imagining and suffering beyond description. She said yes to carrying God, raising God, losing God to a cross, and being there when God defeated death.

She didn't know all of that when she said yes.

She said yes with what she knew.

That is all God ever asks.$w16$
  WHERE devotional_id = v_id AND day_number = 16;

  UPDATE devotional_days SET devotional_text = $w17$She has been described as a reformed prostitute for most of church history.

That is not what the Bible says.

The idea comes from a sermon Pope Gregory I preached in 591 AD in which he conflated Mary Magdalene with the sinful woman who anointed Jesus' feet in Luke 7 and with Mary of Bethany. The conflation stuck for a thousand years and shaped how she was portrayed in art, literature, and church tradition.

The Bible says she is a woman from whom Jesus cast out seven demons. That's it. That's the only information Luke gives us about her past in Luke 8:2, when he introduces her as one of the women who traveled with Jesus and funded His ministry out of their own resources.

Seven demons. That's not a minor thing. Whatever that means — whether it was a physical illness, a mental torment, a spiritual bondage that expressed itself in observable ways — it had defined her existence before Jesus freed her. And after He freed her, she followed Him.

From that moment, she is a constant presence in the narrative.

She is in the group of women who fund Jesus' ministry. Luke 8:1-3 tells us that Jesus traveled through towns and villages preaching, and that the twelve were with Him, and also some women who had been cured of evil spirits and diseases — Mary Magdalene, Joanna the wife of Chuza, Susanna, and many others. These women were helping to support Him out of their own means.

This is striking. Women in first-century Palestine, providing financial support for a traveling rabbi's ministry out of their own resources. They are not silent, passive figures in the background. They are active participants.

Mary is named first in every list of the women who followed Jesus. First among the women traveling with Him. First named at the cross. First named at the empty tomb. First to see the risen Jesus.

She is at the cross when He is crucified. John 19:25: "Near the cross of Jesus stood his mother, his mother's sister, Mary the wife of Clopas, and Mary Magdalene." The male disciples have largely fled. The women are there.

She is present at the burial. Mark 15:47: "Mary Magdalene and Mary the mother of Joseph saw where he was laid."

She comes to the tomb before sunrise on Sunday morning, when the Sabbath has ended and she can come without violating the law. She comes to finish the burial preparations — to anoint His body with spices, the last act of care she can offer.

She finds the tomb open. She runs back to Peter and John and tells them: "They have taken the Lord out of the tomb, and we don't know where they have put him!" They run to the tomb, they see the empty grave clothes, they go home bewildered.

But Mary stays.

She stands outside the tomb weeping. She bends down to look inside and sees two angels — and John 20:13 gives us her words: "They have taken my Lord away, and I don't know where they have put him."

She turns around. There is a man standing there. She assumes it is the gardener. "Sir, if you have carried him away, tell me where you have put him, and I will get him."

I will get him.

She is going to carry the body of the Son of God by herself if that's what it takes. She will not leave. She will not stop looking.

And then He speaks her name.

"Mary."

That's all. One word. Her name. And she knows.

She turns and says to him in Aramaic, "Rabboni!" — which means teacher.

Jesus says: "Do not hold on to me, for I have not yet ascended to the Father. Go instead to my brothers and tell them: 'I am ascending to my Father and your Father, to my God and your God.'"

Go and tell.

She is the first person sent with the resurrection message. The apostle to the apostles, as early church fathers called her. In a legal world where a woman's testimony was inadmissible, Jesus chose a woman as the first proclaimer of the most important truth in history.

Mary Magdalene goes to the disciples with the news: "I have seen the Lord!" And she tells them what He said.

She had been defined by what had been cast out of her — seven demons, a past that marked her. And Jesus redefined her entirely. Not by her past. By her faithfulness. By her refusal to leave. By the fact that she stayed at the tomb while everyone else went home.

The person who would not stop looking was the first person to find what she was looking for.

Her name means "from Magdala" — a fishing town on the western shore of the Sea of Galilee. She was a specific woman from a specific place, with a specific story, who followed Jesus from Galilee to the grave to the garden.

And in the garden, He called her by name.

He still calls people by name. Not by their history. Not by what was cast out of them. By their name — the name He gave them when He knew them before they knew Him.

Yours is one of them.$w17$
  WHERE devotional_id = v_id AND day_number = 17;

  UPDATE devotional_days SET devotional_text = $w18$Jesus doesn't end up at this well by accident.

John 4:4 says "he had to go through Samaria." In Greek, the word is edei — it was necessary, it was required. Most Jewish travelers from Galilee to Judea took the long way around through the Jordan Valley to avoid Samaria, because the hostility between Jews and Samaritans ran deep. But Jesus takes the Samaritan route, and John signals it as a necessity, not a detour.

He has to be at this well. At this hour. To meet this specific woman.

The background: Samaria was the territory of the northern kingdom of Israel after the Assyrian conquest in 722 BC. The Assyrians resettled the region with foreign peoples who intermarried with the remaining Israelites, and over generations a mixed religion and mixed culture developed. Jews considered Samaritans to be racially and religiously impure — half-breeds who had corrupted the faith. The Samaritans had their own version of the Torah, their own temple on Mount Gerizim, their own history.

The hostility was mutual and ancient. "Jews do not associate with Samaritans," John notes almost as an aside in verse 9.

Jesus arrives at Jacob's well at noon. He is tired. He sits down. A woman comes to draw water.

Alone. At midday. We've already noted what that likely means — she is avoiding the other women. Whatever her story is, it has made her an outcast even among the Samaritans, who are themselves already outsiders.

Jesus says: "Will you give me a drink?"

She is stunned that He speaks to her at all. "You are a Jew and I am a Samaritan woman. How can you ask me for a drink?"

He responds with a statement she doesn't immediately understand: "If you knew the gift of God and who it is that asks you for a drink, you would have asked him and he would have given you living water."

She's practical about it. You don't have a bucket. The well is deep. Where do you get this living water? Are you greater than our father Jacob, who gave us this well?

Jesus says: "Everyone who drinks this water will be thirsty again, but whoever drinks the water I give them will never thirst. Indeed, the water I give them will become in them a spring of water welling up to eternal life."

She says — and you can hear the exhaustion in it — "Sir, give me this water so that I won't get thirsty and have to keep coming here to draw water."

She is tired. Tired of the walk in the heat, tired of coming alone, tired of her life as it is. Give me whatever means I don't have to do this anymore.

Jesus says: "Go, call your husband and come back."

"I have no husband," she says.

Jesus says: "You are right when you say you have no husband. The fact is, you have had five husbands, and the man you now have is not your husband. What you have just said is quite true."

He knows her story. All of it. Five marriages — which in the ancient world almost certainly means five divorces, since women could not initiate divorce; she has been let go five times, which means five times someone decided she was dispensable. And now she is living with someone who isn't her husband — either because marriage isn't an option anymore, or because she can't face the risk of another marriage that might end in the same way.

Five times someone left her.

Jesus knows all of it. And He doesn't condemn her. He tells her the truth of her own life — which is different from condemnation. He sees her. He names what is real.

And she, remarkably, shifts to theology. "Sir, I can see that you are a prophet. Our ancestors worshiped on this mountain, but you Jews claim that the place where we must worship is in Jerusalem."

She's asking a real question. Not deflecting. Not playing games. She has encountered someone who sees her, and she wants to understand the God they're talking about. Where does one actually worship Him?

Jesus gives her the answer that shatters every geographic and ethnic limitation: "A time is coming and has now come when the true worshipers will worship the Father in the Spirit and in truth, for they are the kind of worshipers the Father seeks."

Not on this mountain. Not in Jerusalem. In Spirit and truth. Anywhere. Anyone.

She says: "I know that Messiah is coming. When he comes, he will explain everything to us."

And Jesus says: "I, the one speaking to you — I am he."

This is the clearest, most explicit statement of Messianic identity Jesus makes in the Gospel of John, up to this point. Not to the Pharisees in the temple. Not to the crowds by the Sea of Galilee. To a five-times-divorced Samaritan woman drawing water alone at noon.

She leaves her water jar — she came for water and leaves having forgotten why she came — and runs back to town. "Come, see a man who told me everything I ever did. Could this be the Messiah?"

Her testimony is: he told me everything I ever did. This is a woman whose entire past might be her greatest source of shame, and she runs into the town square and announces it. Come hear about the man who knows everything about me.

Because having been truly known — not judged, not dismissed, but truly known — and offered living water anyway, she has nothing to protect anymore.

Many of the Samaritans in that town believed because of her testimony. They came to Jesus and asked Him to stay, and He stayed two more days. And many more believed — and they said: "We no longer believe just because of what you said; now we have heard for ourselves, and we know that this man really is the Savior of the world."

The first evangelist to the Samaritans. A woman with five divorces and a living arrangement the town whispered about.

Jesus went out of His way to meet her.

He still does.$w18$
  WHERE devotional_id = v_id AND day_number = 18;

  UPDATE devotional_days SET devotional_text = $w19$Twelve years.

Twelve years of bleeding. Twelve years of being considered ceremonially unclean under Mosaic law — which meant no one was supposed to touch her, nothing she touched was supposed to be touched by others, she was cut off from the worship life of her community, unable to enter the synagogue, unable to participate in the ordinary social and religious fabric of Jewish life.

Under Leviticus 15, a woman's menstrual bleeding made her unclean for seven days. But this woman had been bleeding for twelve years without stopping. Under the law, she would have been considered continuously, permanently unclean. Anyone she touched became unclean. Anyone who touched her furniture, her bed, her chair became unclean. She was, in a real social and religious sense, untouchable.

She had spent everything she had on doctors. Mark 5:26 gives us the medical situation bluntly: "She had suffered a great deal under the care of many doctors and had spent all she had, yet instead of getting better she grew worse."

Everything she had. The illness had taken her health, her money, her social standing, her religious participation, her twelve years.

And then she hears about Jesus.

She comes through the crowd — which in itself is an act of violation. A crowd means contact. Touching people, being touched. She is ceremonially unclean; moving through a crowd means making everyone she brushes against unclean. In the social code she has lived under for twelve years, what she is doing is wrong.

She doesn't care anymore. Twelve years will do that to you.

She says to herself: "If I just touch his clothes, I will be healed."

Not if He touches me. If I touch His clothes. She is not asking for a formal encounter. She is not approaching publicly, announcing herself, requesting a healing. She is trying to slip in anonymously, touch the hem of His garment, and slip back out.

She reaches through the crowd, touches the edge of his cloak.

Mark 5:29: "Immediately her bleeding stopped and she felt in her body that she was freed from her suffering."

Immediately. Twelve years, and one touch, and it's over.

And then Jesus stops.

"Who touched me?"

His disciples are slightly exasperated. "You see the people crowding against you, and yet you can ask, 'Who touched me?'" There are people everywhere. They're all touching him.

But Jesus says: "Someone touched me; I know that power has gone out from me."

He knows something has happened. He knows it was intentional, that someone reached out in faith. He stops the whole movement of the crowd to find out who.

Now the woman is afraid. She thought she could be anonymous. She thought she could receive the healing and disappear back into the crowd without anyone knowing she had done something the law technically forbade — touching a holy man while unclean. She thought the healing was enough.

She falls down before Him and tells Him the whole truth. All of it. The twelve years, the doctors, the money, what she did, what happened when she touched His cloak.

And Jesus says: "Daughter, your faith has healed you. Go in peace and be freed from your suffering."

Daughter.

He doesn't call anyone else daughter in the Gospel of Mark. This is the only place. The woman who spent twelve years as an untouchable, cut off from community, cut off from religious participation, cut off from ordinary human contact — Jesus calls her daughter.

He received her touch. He didn't become unclean through her; she became clean through Him. The direction of the contamination reversed.

And then He names what happened: your faith. Not your worthiness. Not your following of the law. Your faith — the desperate, slightly transgressive, last-resort reach through a crowd to touch the hem of a healer's robe.

That counted as faith.

He called her forward publicly not to shame her but to honor her. He wanted her story told, not whispered. He wanted the community to know that this woman — this woman who had been cut off for twelve years — had been healed. He was restoring her not just physically but socially, religiously, communally. He was saying to the crowd: she is daughter. She is healed. She belongs.

This is immediately followed by the story of Jairus's daughter being raised from the dead — and the two stories bracket each other deliberately. The woman has suffered twelve years; Jairus's daughter is twelve years old. The woman is at the end of her life as she had known it; the girl is at the very beginning. Jesus heals both. He restores both. The age twelve echoes between them.

The woman who touched His robe teaches us something specific about how faith works when you're desperate. It doesn't have to be eloquent. It doesn't have to be well-formed. It doesn't have to follow the rules of propriety.

It just has to reach for Him.

One act of desperate, messy, technically-rule-breaking faith stopped Jesus in His tracks.

It still does.$w19$
  WHERE devotional_id = v_id AND day_number = 19;

  UPDATE devotional_days SET devotional_text = $w20$She is mentioned six times in the New Testament.

In four of those six mentions, her name comes before her husband's.

That detail matters. In the ancient world, household pairs were almost always listed husband-first. "Priscilla and Aquila" — with her name first — is the notable deviation, and it appears often enough that scholars have concluded it reflects her prominence. She was, by the testimony of the text itself, the more notable or recognizable of the two.

Priscilla and Aquila first appear in Acts 18. The Emperor Claudius has expelled all Jews from Rome — the Jewish historian Suetonius records this as happening around 49 AD, likely due to disputes within the Jewish community about someone named "Chrestus," quite possibly arguments about whether Jesus was the Messiah. Priscilla and Aquila have arrived in Corinth as refugees.

Paul arrives in Corinth on his second missionary journey. He finds them, and because they share the same trade — tentmaking, or possibly leatherworking — he moves in with them and works alongside them.

They live together. Work together. Travel together. They are not just hosts; they become partners in Paul's mission. When Paul leaves Corinth, they travel with him. He leaves them in Ephesus while he continues on. And it is in Ephesus that their most notable moment occurs.

Acts 18:24-26. A man named Apollos arrives in Ephesus. The text describes him in remarkable terms: he is a Jew from Alexandria, an educated man, with a thorough knowledge of the Scriptures, fervent in spirit, who spoke with great accuracy about Jesus. He knew the Scriptures. He was gifted as a speaker. He was theologically informed.

But he knew only the baptism of John.

That's the gap. He knew the background, the prophecy, the story leading up to Jesus. But his understanding of the full gospel — of the death and resurrection and what those meant — was incomplete.

Now here is what happens next, and why it matters so much.

"When Priscilla and Aquila heard him, they invited him to their home and explained to him the way of God more adequately."

They explain the gospel to Apollos. A man described as "learned," with "a thorough knowledge of the Scriptures," fervent, accurate, bold in public — this man is taken aside by Priscilla and Aquila and taught the full gospel.

And Priscilla's name comes first.

The early church father John Chrysostom, in the fourth century, commented specifically on this passage and argued that Priscilla was the primary teacher in this encounter. He was uncomfortable with it — a woman teaching a man, a gifted preacher — but he acknowledges it because the text requires it.

Apollos goes on to become one of the most significant figures in the early church. 1 Corinthians 1-3 shows that he became so influential in Corinth that factions formed around him — some said "I follow Paul," others said "I follow Apollos." Paul has to address the division, while acknowledging Apollos's genuine giftedness. In 1 Corinthians 3:6, Paul writes: "I planted the seed, Apollos watered it, but God has been making it grow."

The man who watered the seed of the Corinthian church was discipled by Priscilla.

She also taught in the home church. Romans 16:3-5, which is a letter Paul writes to the church in Rome: "Greet Priscilla and Aquila, my co-workers in Christ Jesus. They risked their lives for me. Not only I but all the churches of the Gentiles are grateful to them. Greet also the church that meets at their house."

Co-workers. The same Greek word used for Timothy, for Titus, for other male apostolic workers. Priscilla is a co-worker, not a passive supporter. She risked her life — whatever that refers to, it was real enough that Paul names it. And the church met in her house, which means she hosted, led, organized, and likely taught the home church community.

She is not a footnote. She is a leader. A teacher. A risk-taker. A woman who, with her husband, shaped the theological understanding of one of the most gifted preachers in the early church.

The letters Paul writes to Corinth — 1 and 2 Corinthians, some of the most theologically rich documents in the New Testament — are written to a church where Apollos had significant influence. And Apollos understood the full gospel because Priscilla explained it to him.

The thread runs all the way through.

Priscilla shows us that the early church was built on the teaching and leadership of women in ways that later church tradition sometimes obscured or erased. She is not an exception or an anomaly. She is a participant — named first, recognized as a co-worker, honored by Paul in multiple letters, operating in the full range of ministry.

The God who spoke through Miriam, through Deborah, through Huldah the prophet — He is still speaking through women in the upper rooms and house churches and Aegean coastline meeting places of the first century.

He has never stopped.$w20$
  WHERE devotional_id = v_id AND day_number = 20;

  UPDATE devotional_days SET devotional_text = $w21$We have been in this story for twenty days.

Let's look at who we met.

We met Eve, who stood in the wreckage of the very first failure and received the very first gospel promise. We met Sarah, who laughed at the impossible from behind a tent flap and had her doubt named into her son's name as a permanent record of what God does anyway. We met Hagar, the runaway Egyptian servant girl who became the first person in all of Scripture to name God — and named Him the God who sees.

We met Rebekah, who said one word — I will — and left everything she knew. We met Rachel and Leah, two sisters caught in a painful tangle of love and rivalry and barrenness and fertility, and watched God work through both of them. We met Miriam, the prophet and worship leader who had a moment of pride that cost her, and was waited for by the whole nation while she was restored.

We met Rahab, who tied a scarlet cord in her window and ended up in the genealogy of Jesus. We met Deborah, who sat under a palm tree listening to God while the nation needed leading, and led it. We met Ruth, who said "your God is my God" on a road in Moab and followed a grieving old woman into an unknown future. We met Hannah, who poured out her soul in the temple while the priest thought she was drunk. We met Bathsheba, who had no say in what happened to her and still became the mother of the builder of God's temple.

We met Esther, who said "if I perish, I perish" and walked through the door anyway. We met Mary of Nazareth, who said "may it be" and carried God into the world. We met Mary Magdalene, who refused to leave the tomb and was the first person to see the risen Jesus. We met the woman at the well, whose five-times-divorced, ostracized existence became the occasion for the most explicit Messianic declaration in John's gospel. We met the woman who touched Jesus' robe after twelve years of being untouchable, and was called daughter. And we met Priscilla, who discipled one of the greatest preachers of the early church in her own home and had her name listed first.

Now step back and look at that list.

What do these women have in common?

Not their backgrounds. They are from different nations, different centuries, different social classes, different moral histories. Some of them were foreigners — Hagar, Rahab, Ruth. Some were insiders — Miriam, Esther, Mary. Some had complicated pasts — Rahab, the woman at the well, Bathsheba. Some had clean records we know of and suffered for reasons entirely outside their control — Hannah, the woman with bleeding. Some were famous in their own time — Deborah, Esther, Mary. Some were essentially anonymous — we don't even know the name of the woman at the well or the woman with the bleeding.

They are not a type. They are not a category. They are not interchangeable.

But here is what they share: they were all used by God in moments that mattered, in ways the world around them often said was impossible or inappropriate or improbable. They were all seen by a God who goes looking for the overlooked. They were all part of a story bigger than themselves that they could not have orchestrated on their own.

And look at how God reached them.

He found Hagar in the wilderness, alone and pregnant and terrified. He opened Sarah's womb at ninety. He remembered Rachel's tears. He heard Hannah's silent prayer. He stopped the whole crowd for the woman who touched His robe anonymously in desperation. He went out of His way — "he had to go through Samaria" — to meet a woman at a well who was avoiding everyone else.

Notice the pattern. God is not waiting for you to become presentable before He works in your life. He is not waiting for you to sort out your complicated history, your unsteady faith, your difficult circumstances, your disqualifying background.

He is the God who sees. El Roi. The one who finds Hagar in the wilderness. The one who asks "where are you?" even when He knows the answer — because He wants you to speak.

He is the God who names Sarah's son after her laughter. Who puts Rahab in the genealogy. Who sends His Son to be born through a teenage girl in an obscure town in Galilee. Who makes the first resurrection witness a woman whose name most of the church forgot for a thousand years because someone preached she was something the Bible never said she was.

He is not limited by what the world says you are, what your history says about you, what your circumstances suggest is possible, what the religious establishment thinks is appropriate.

He never has been.

Here is what I want you to take from these twenty women over twenty days.

First: your gender, your background, your social status, your moral history, and your circumstances have never defined what God can do through you. Every category the world uses to limit access — ethnicity, class, gender, past failure, present difficulty — God has specifically and repeatedly worked through. Not in spite of those things. Through them.

Second: the women who shaped this story were not waiting for permission. Rahab didn't wait for a theologian to approve her theology. She looked at the evidence and concluded "your God is God in heaven above and on the earth below" and tied a scarlet cord in the window. Ruth didn't wait for a formal conversion process. She said "your God is my God" on a road and meant it. The woman at the well didn't ask Jesus to confirm she was the right kind of person to receive living water. She asked for it.

Third: faith looks different on different people. Sarah laughed. Thomas doubted. Hannah wept silently. Ruth walked quietly forward. Esther said "if I perish, I perish." Mary said "may it be." Mary Magdalene simply refused to leave. None of these is the only way to respond to God. There is room in this story for your particular personality, your particular grief, your particular fear.

Fourth: your ordinary life is the location where God's extraordinary work happens. These women were not extraordinary people who lived extraordinary lives in extraordinary places. They were ordinary people — servants, widows, farmers' daughters, fishermen's companions, tentmakers' wives — through whom God did extraordinary things in ordinary moments.

A wedding. A harvest field. A well at noon. A tent in the wilderness. A window in a city wall. A garden early in the morning.

The burning bush was an ordinary bush in an ordinary field until God chose to speak through it. Your life is the same.

And finally: God has always used the people the world has overlooked. Hagar was a runaway slave. Rahab was a prostitute. Ruth was a Moabite widow. The woman at the well was a five-times-divorced social outcast. Mary Magdalene had seven demons cast out of her. Esther was an orphan in exile.

These are the people in Jesus' genealogy. These are the people in His inner circle. These are the people He went out of His way to find.

He has not changed.

If the world has looked at your life and decided you are not significant enough, not clean enough, not educated enough, not the right background, not the right gender, not the right history — you are in excellent company.

Every one of these twenty women stood in that same place at some point.

And every one of them was seen. Named. Sent. Used.

The God who saw Hagar sees you.

The God who heard Hannah's silent prayer hears yours.

The God who called Mary Magdalene by name is calling yours.

You don't have to be perfect. You don't have to be polished. You don't have to have it figured out.

You have to be willing to say — like Rebekah on a road with a stranger: I will.

Like Mary in a small room in Nazareth: may it be.

Like Ruth walking away from everything familiar: your people will be my people, and your God will be my God.

The story isn't finished. It has never stopped needing people willing to play their part in it.

Your part is waiting.$w21$
  WHERE devotional_id = v_id AND day_number = 21;

END;
$main$;
