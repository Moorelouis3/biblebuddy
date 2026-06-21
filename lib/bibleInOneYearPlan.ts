// lib/bibleInOneYearPlan.ts
// Generates the custom 365-day Bible reading plan used by Bible Buddy.

export type ChapterAssignment = {
  book: string;
  chapter: number;
};

export type DayReading = {
  dayNumber: number;
  title?: string;
  reference?: string;
  chapters: ChapterAssignment[];
};

export type WeekReading = {
  weekNumber: number;
  days: DayReading[];
};

export type BibleInOneYearPlan = {
  weeks: WeekReading[];
  totalDays: number;
  totalChapters: number;
};

export type GenesisBibleYearReading = {
  book: string;
  chapter: number;
  studyTitle: string;
  studyDayNumber: number;
};

export type GenesisBibleYearDay = {
  dayNumber: number;
  title: string;
  reference: string;
  estimatedTime: string;
  summary: string;
  coverImage?: string;
  readings: GenesisBibleYearReading[];
};

export const BIBLE_YEAR_FALLBACK_COVER_IMAGE = "/genericcoverforBIOY.png";

export function getBibleYearDayCoverImage(day: Pick<GenesisBibleYearDay, "coverImage"> | null | undefined) {
  const coverImage = typeof day?.coverImage === "string" ? day.coverImage.trim() : "";
  return coverImage || BIBLE_YEAR_FALLBACK_COVER_IMAGE;
}

function buildGenesisReadings(studyTitle: string, startChapter: number, endChapter: number, studyStartDay: number): GenesisBibleYearReading[] {
  return Array.from({ length: endChapter - startChapter + 1 }, (_, index) => ({
    book: "Genesis",
    chapter: startChapter + index,
    studyTitle,
    studyDayNumber: studyStartDay + index,
  }));
}

function buildReadingsFromReference(studyTitle: string, reference: string): GenesisBibleYearReading[] {
  const readings: GenesisBibleYearReading[] = [];
  for (const part of reference.split(";").map((item) => item.trim()).filter(Boolean)) {
    const match = part.match(/^(.+?)\s+(\d+)(?:-(\d+))?$/);
    if (!match) continue;
    const book = match[1]?.trim() || "";
    const start = Number(match[2]);
    const end = Number(match[3] || match[2]);
    for (let chapter = start; chapter <= end; chapter += 1) {
      readings.push({
        book,
        chapter,
        studyTitle,
        studyDayNumber: readings.length + 1,
      });
    }
  }
  return readings;
}

type BibleYearScheduleEntry = {
  dayNumber: number;
  reference: string;
  title: string;
};

const ADDITIONAL_BIBLE_YEAR_SCHEDULE_RAW = `
22 | Exodus 1-4 | God Hears Israel's Cry
23 | Exodus 5-8 | Pharaoh Resists God's Word
24 | Exodus 9-12 | Passover and Deliverance
25 | Exodus 13-16 | Through the Sea and Into the Wilderness
26 | Exodus 17-20 | Water, Battle, and the Ten Commandments
27 | Exodus 21-24 | Covenant Law and Covenant Blood
28 | Exodus 25-28 | The Tabernacle and Priesthood Begin
29 | Exodus 29-32 | Consecration and the Golden Calf
30 | Exodus 33-36 | God's Presence and Renewed Obedience
31 | Exodus 37-40 | The Tabernacle Is Finished
32 | Leviticus 1-4 | Offerings and Atonement
33 | Leviticus 5-8 | Guilt, Consecration, and Priests
34 | Leviticus 9-12 | Worship, Holiness, and Clean Living
35 | Leviticus 13-16 | Cleansing and the Day of Atonement
36 | Leviticus 17-20 | Holy Living Before a Holy God
37 | Leviticus 21-24 | Priests, Feasts, and Sacred Order
38 | Leviticus 25-27; Numbers 1 | Jubilee, Covenant, and Israel Counted
39 | Numbers 2-5 | Camp Order and Purity
40 | Numbers 6-9 | Blessing, Dedication, and Passover
41 | Numbers 10-13 | Journey, Complaints, and Spies
42 | Numbers 14-17 | Rebellion and God's Chosen Priesthood
43 | Numbers 18-21 | Provision, Judgment, and the Bronze Serpent
44 | Numbers 22-25 | Balaam, Blessing, and Compromise
45 | Numbers 26-29 | A New Generation Counted
46 | Numbers 30-33 | Vows, Victory, and the Journey Reviewed
47 | Numbers 34-36; Deuteronomy 1 | Land Boundaries and Moses Looks Back
48 | Deuteronomy 2-5 | Remembering the Journey and the Covenant
49 | Deuteronomy 6-9 | Love God and Remember Grace
50 | Deuteronomy 10-13 | Covenant Loyalty From the Heart
51 | Deuteronomy 14-17 | Worship, Justice, and Leadership
52 | Deuteronomy 18-21 | Prophets, Cities, and Justice
53 | Deuteronomy 22-25 | Everyday Faithfulness
54 | Deuteronomy 26-29 | Blessing, Curse, and Covenant Renewal
55 | Deuteronomy 30-33 | Choose Life and Receive Moses' Blessing
56 | Deuteronomy 34; Joshua 1-3 | Moses Dies and Joshua Leads
57 | Joshua 4-7 | Memorial Stones, Jericho, and Achan
58 | Joshua 8-11 | Conquest and Covenant Obedience
59 | Joshua 12-15 | The Land Is Distributed
60 | Joshua 16-19 | Inheritance for the Tribes
61 | Joshua 20-23 | Refuge, Rest, and Joshua's Warning
62 | Joshua 24; Judges 1-3 | Covenant Choice and Israel's Drift
63 | Judges 4-7 | Deborah, Gideon, and Deliverance
64 | Judges 8-11 | Gideon's Failure and Jephthah's Vow
65 | Judges 12-15 | Samson Begins His Troubled Calling
66 | Judges 16-19 | Samson Falls and Israel Unravels
67 | Judges 20-21; Ruth 1-2 | Civil War and Ruth's Loyal Love
68 | Ruth 3-4; 1 Samuel 1-2 | Redemption and Samuel's Birth
69 | 1 Samuel 3-6 | Samuel Hears God and the Ark Is Taken
70 | 1 Samuel 7-10 | Israel Asks for a King
71 | 1 Samuel 11-14 | Saul's Rise and Early Failure
72 | 1 Samuel 15-18 | Saul Is Rejected and David Appears
73 | 1 Samuel 19-22 | David Flees From Saul
74 | 1 Samuel 23-26 | David Spares Saul
75 | 1 Samuel 27-30 | David in Exile
76 | 1 Samuel 31; 2 Samuel 1-3 | Saul Falls and David's Kingdom Begins
77 | 2 Samuel 4-7 | David's Throne and God's Promise
78 | 2 Samuel 8-11 | David's Victories and David's Sin
79 | 2 Samuel 12-15 | Consequences in David's House
80 | 2 Samuel 16-19 | Absalom's Rebellion and David's Grief
81 | 2 Samuel 20-23 | David's Later Reign and Mighty Men
82 | 2 Samuel 24; 1 Kings 1-3 | David's Census and Solomon's Wisdom
83 | 1 Kings 4-7 | Solomon's Wisdom and Temple Preparations
84 | 1 Kings 8-11 | Temple Glory and Solomon's Fall
85 | 1 Kings 12-15 | The Kingdom Divides
86 | 1 Kings 16-19 | Elijah Confronts Idolatry
87 | 1 Kings 20-22; 2 Kings 1 | Ahab's Fall and Elijah's Final Warnings
88 | 2 Kings 2-5 | Elisha's Ministry Begins
89 | 2 Kings 6-9 | Rescue, Siege, and Jehu's Judgment
90 | 2 Kings 10-13 | Jehu's Reform and Israel's Decline
91 | 2 Kings 14-17 | Israel Falls to Assyria
92 | 2 Kings 18-21 | Hezekiah's Faith and Manasseh's Evil
93 | 2 Kings 22-25 | Josiah's Reform and Judah's Fall
94 | 1 Chronicles 1-4 | The Family Line of God's People
95 | 1 Chronicles 5-8 | Tribes, Genealogies, and Identity
96 | 1 Chronicles 9-12 | Return, Saul, and David's Supporters
97 | 1 Chronicles 13-16 | The Ark Comes to Jerusalem
98 | 1 Chronicles 17-20 | David's Covenant and Victories
99 | 1 Chronicles 21-24 | The Temple Site and Priestly Order
100 | 1 Chronicles 25-28 | Worship Teams and Temple Plans
101 | 1 Chronicles 29; 2 Chronicles 1-3 | David's Offering and Solomon's Temple
102 | 2 Chronicles 4-7 | Temple Dedication and God's Glory
103 | 2 Chronicles 8-11 | Solomon's Reign and the Divided Kingdom
104 | 2 Chronicles 12-15 | Kings, Reform, and Returning to God
105 | 2 Chronicles 16-19 | Asa, Jehoshaphat, and Trust
106 | 2 Chronicles 20-23 | Worship in Battle and Joash Preserved
107 | 2 Chronicles 24-27 | Faithfulness and Forgetting God
108 | 2 Chronicles 28-31 | Ahaz's Failure and Hezekiah's Reform
109 | 2 Chronicles 32-35 | Hezekiah, Manasseh, and Josiah
110 | 2 Chronicles 36; Ezra 1-3 | Exile Ends and Worship Returns
111 | Ezra 4-7 | Opposition and Renewed Teaching
112 | Ezra 8-10; Nehemiah 1 | Return, Repentance, and Nehemiah's Burden
113 | Nehemiah 2-5 | Rebuilding the Wall
114 | Nehemiah 6-9 | Completion, Scripture, and Confession
115 | Nehemiah 10-13 | Covenant Renewal and Reform
116 | Esther 1-4 | Esther Rises for Such a Time
117 | Esther 5-8 | Reversal and Deliverance
118 | Esther 9-10; Job 1-2 | Purim and Job's Testing Begins
119 | Job 3-6 | Job Laments His Suffering
120 | Job 7-10 | Job Pleads With God
121 | Job 11-14 | Human Frailty and Hope
122 | Job 15-18 | Friends Accuse, Job Suffers
123 | Job 19-22 | Job's Redeemer and Continued Accusation
124 | Job 23-26 | Job Searches for God
125 | Job 27-30 | Wisdom and Deep Distress
126 | Job 31-34 | Job's Integrity and Elihu Speaks
127 | Job 35-38 | God Answers From the Storm
128 | Job 39-42 | God Restores Job
129 | Psalms 1-3 | The Blessed Way and Trust in Trouble
130 | Psalms 4-6 | Prayer in Distress
131 | Psalms 7-9 | God Judges Righteously
132 | Psalms 10-12 | When Evil Seems Strong
133 | Psalms 13-15 | Lament, Trust, and Integrity
134 | Psalms 16-18 | Refuge, Resurrection Hope, and Deliverance
135 | Psalms 19-21 | Creation, Scripture, and the King
136 | Psalms 22-24 | Suffering, Shepherd, and Glory
137 | Psalms 25-27 | Guidance, Forgiveness, and Courage
138 | Psalms 28-30 | Help, Strength, and Joy
139 | Psalms 31-33 | Trust, Confession, and Praise
140 | Psalms 34-36 | Taste and See God's Goodness
141 | Psalms 37-39 | Waiting, Wisdom, and Frailty
142 | Psalms 40-42 | Rescue, Obedience, and Thirst for God
143 | Psalms 43-45 | Hope, Victory, and the King
144 | Psalms 46-48 | God Is Our Refuge
145 | Psalms 49-51 | Wealth, Judgment, and Repentance
146 | Psalms 52-54 | God Sustains the Faithful
147 | Psalms 55-57 | Betrayal, Fear, and Mercy
148 | Psalms 58-60 | Justice and Restoration
149 | Psalms 61-63 | Longing for God's Presence
150 | Psalms 64-66 | Protection and Praise
151 | Psalms 67-69 | Blessing for the Nations and Suffering
152 | Psalms 70-72 | Help, Aging, and the Righteous King
153 | Psalms 73-75 | Worship When Life Feels Unfair
154 | Psalms 76-78 | God's Power and Israel's Memory
155 | Psalms 79-81 | Judgment, Restoration, and Listening
156 | Psalms 82-84 | Justice and Longing for God's House
157 | Psalms 85-87 | Revival and Zion's Hope
158 | Psalms 88-90 | Darkness, Covenant, and Numbering Days
159 | Psalms 91-93 | Refuge and the Lord Reigns
160 | Psalms 94-96 | Justice and Worship
161 | Psalms 97-99 | The Holy King Reigns
162 | Psalms 100-102 | Thanksgiving and Mercy
163 | Psalms 103-105 | Bless the Lord and Remember His Works
164 | Psalms 106-108 | Mercy Despite Failure
165 | Psalms 109-111 | Justice, Messiah, and Wisdom
166 | Psalms 112-114 | Fear of the Lord and Exodus Praise
167 | Psalms 115-117 | The Lord Alone Is Worthy
168 | Psalms 118-120 | Steadfast Love and Pilgrim Songs
169 | Psalms 121-123 | Help From the Lord
170 | Psalms 124-126 | Rescue and Restoration
171 | Psalms 127-129 | Home, Labor, and Perseverance
172 | Psalms 130-132 | Waiting, Forgiveness, and David's Promise
173 | Psalms 133-135 | Unity and Praise
174 | Psalms 136-138 | His Steadfast Love Endures Forever
175 | Psalms 139-141 | Known by God and Kept From Evil
176 | Psalms 142-144 | Refuge, Mercy, and Battle
177 | Psalms 145-147 | Great Is the Lord
178 | Psalms 148-150 | Let Everything Praise the Lord
179 | Proverbs 1-3 | Wisdom Begins With the Fear of the Lord
180 | Proverbs 4-6 | Guard Your Heart
181 | Proverbs 7-9 | Wisdom Calls, Folly Tempts
182 | Proverbs 10-12 | Words, Work, and Righteousness
183 | Proverbs 13-15 | Discipline, Speech, and the Heart
184 | Proverbs 16-18 | Plans, Pride, and Wise Words
185 | Proverbs 19-21 | Justice, Wealth, and Humility
186 | Proverbs 22-24 | Wisdom for Daily Life
187 | Proverbs 25-27 | Self-Control and Friendship
188 | Proverbs 28-30 | Justice, Confession, and Wonder
189 | Proverbs 31; Ecclesiastes 1-2 | Noble Wisdom and Life's Vapor
190 | Ecclesiastes 3-5 | Time, Work, and Worship
191 | Ecclesiastes 6-8 | Limits of Human Wisdom
192 | Ecclesiastes 9-11 | Live Wisely Under the Sun
193 | Ecclesiastes 12; Song of Solomon 1-2 | Remember Your Creator and Covenant Love
194 | Song of Solomon 3-5 | Love, Desire, and Commitment
195 | Song of Solomon 6-8 | Love Strong as Death
196 | Isaiah 1-3 | Rebellion, Judgment, and Hope
197 | Isaiah 4-6 | Holiness and Isaiah's Call
198 | Isaiah 7-9 | Immanuel and the Coming King
199 | Isaiah 10-12 | Judgment, Remnant, and Salvation
200 | Isaiah 13-15 | Nations Under God's Judgment
201 | Isaiah 16-18 | Pride, Refuge, and the Nations
202 | Isaiah 19-21 | Egypt, Babylon, and Trust
203 | Isaiah 22-24 | Jerusalem, Leaders, and World Judgment
204 | Isaiah 25-27 | Feast, Resurrection, and Restoration
205 | Isaiah 28-30 | False Security and True Rest
206 | Isaiah 31-33 | Woe, Rescue, and the Coming King
207 | Isaiah 34-36 | Judgment and Assyria's Threat
208 | Isaiah 37-39 | Hezekiah's Prayer and Warning
209 | Isaiah 40-42 | Comfort and the Servant
210 | Isaiah 43-45 | God Redeems and Names Cyrus
211 | Isaiah 46-48 | Idols Fall, God Carries
212 | Isaiah 49-51 | The Servant Restores Zion
213 | Isaiah 52-54 | The Suffering Servant
214 | Isaiah 55-57 | Invitation, Mercy, and Peace
215 | Isaiah 58-60 | True Worship and Future Glory
216 | Isaiah 61-63 | Good News and the Day of Vengeance
217 | Isaiah 64-66 | New Creation and Final Worship
218 | Jeremiah 1-3 | Jeremiah's Call and Israel's Unfaithfulness
219 | Jeremiah 4-6 | Coming Judgment
220 | Jeremiah 7-9 | Temple Trust and Tears
221 | Jeremiah 10-12 | Idols, Covenant, and Complaint
222 | Jeremiah 13-15 | Pride, Drought, and Intercession
223 | Jeremiah 16-18 | Signs, Sin, and the Potter
224 | Jeremiah 19-21 | Broken Jar and Jerusalem Warned
225 | Jeremiah 22-24 | Kings, Exile, and Good Figs
226 | Jeremiah 25-27 | Seventy Years and the Yoke
227 | Jeremiah 28-30 | False Hope and Promised Restoration
228 | Jeremiah 31-33 | New Covenant and Future Hope
229 | Jeremiah 34-36 | Broken Promises and God's Written Word
230 | Jeremiah 37-39 | Jerusalem Falls
231 | Jeremiah 40-42 | The Remnant After the Fall
232 | Jeremiah 43-45 | Egypt, Warning, and Baruch
233 | Jeremiah 46-48 | Judgment on the Nations
234 | Jeremiah 49-51 | Babylon Will Fall
235 | Jeremiah 52; Lamentations 1-2 | Jerusalem's Ruin and Grief
236 | Lamentations 3-5 | Mercy in the Middle of Lament
237 | Ezekiel 1-3 | Ezekiel Sees God's Glory
238 | Ezekiel 4-6 | Signs of Jerusalem's Judgment
239 | Ezekiel 7-9 | The End Comes
240 | Ezekiel 10-12 | Glory Departs and Exile Is Confirmed
241 | Ezekiel 13-15 | False Prophets and Fruitless Vines
242 | Ezekiel 16-18 | Sin, Responsibility, and Life
243 | Ezekiel 19-21 | Lament and Sword
244 | Ezekiel 22-24 | Corruption and the Siege Sign
245 | Ezekiel 25-27 | Nations and Tyre Judged
246 | Ezekiel 28-30 | Pride Falls and Egypt Judged
247 | Ezekiel 31-33 | Watchman, Judgment, and Accountability
248 | Ezekiel 34-36 | Shepherds, New Heart, and Restoration
249 | Ezekiel 37-39 | Dry Bones and Final Deliverance
250 | Ezekiel 40-42 | Vision of a Restored Temple
251 | Ezekiel 43-45 | Glory Returns and Worship Is Ordered
252 | Ezekiel 46-48 | Living Water and Restored Inheritance
253 | Daniel 1-3 | Faithfulness in Babylon
254 | Daniel 4-6 | Proud Kings and the Lions' Den
255 | Daniel 7-9 | Kingdoms, Son of Man, and Prayer
256 | Daniel 10-12 | Spiritual Conflict and Final Hope
257 | Hosea 1-3 | Love for the Unfaithful
258 | Hosea 4-6 | Covenant Betrayal and Mercy
259 | Hosea 7-9 | Israel's Wandering Heart
260 | Hosea 10-12 | Sowing Sin and Remembering Jacob
261 | Hosea 13-14; Joel 1 | Return to the Lord
262 | Joel 2-3; Amos 1 | The Day of the Lord Begins
263 | Amos 2-4 | Justice and Accountability
264 | Amos 5-7 | Seek the Lord and Live
265 | Amos 8-9; Obadiah 1 | Famine of the Word and Edom's Fall
266 | Jonah 1-3 | Running, Mercy, and Repentance
267 | Jonah 4; Micah 1-2 | God's Compassion and Israel's Sin
268 | Micah 3-5 | Corrupt Leaders and Bethlehem's Ruler
269 | Micah 6-7; Nahum 1 | What the Lord Requires
270 | Nahum 2-3; Habakkuk 1 | Nineveh Falls and Habakkuk Questions
271 | Habakkuk 2-3; Zephaniah 1 | The Righteous Live by Faith
272 | Zephaniah 2-3; Haggai 1 | Seek the Lord and Rebuild
273 | Haggai 2; Zechariah 1-2 | Future Glory and Jerusalem's Hope
274 | Zechariah 3-5 | Cleansing, Spirit, and Wickedness Removed
275 | Zechariah 6-8 | Branch, Temple, and Restoration
276 | Zechariah 9-11 | The Coming King and Rejected Shepherd
277 | Zechariah 12-14 | Pierced One and the Lord's Reign
278 | Malachi 1-3 | Covenant Worship and Refining Fire
279 | Malachi 4; Matthew 1-2 | Promise Fulfilled in Jesus' Birth
280 | Matthew 3-5 | Baptism, Temptation, and Kingdom Teaching
281 | Matthew 6-8 | Kingdom Prayer and Kingdom Power
282 | Matthew 9-11 | Compassion, Mission, and Invitation
283 | Matthew 12-14 | Opposition, Parables, and Provision
284 | Matthew 15-17 | Clean Hearts, Confession, and Glory
285 | Matthew 18-20 | Humility, Forgiveness, and Servant Greatness
286 | Matthew 21-23 | The King Enters and Confronts Hypocrisy
287 | Matthew 24-26 | Watchfulness, Supper, and Betrayal
288 | Matthew 27-28; Mark 1 | Cross, Resurrection, and the Gospel Begins
289 | Mark 2-4 | Authority, Conflict, and Parables
290 | Mark 5-7 | Deliverance, Healing, and True Cleanliness
291 | Mark 8-10 | The Way of the Cross
292 | Mark 11-13 | Temple Judgment and Watchfulness
293 | Mark 14-16 | Jesus' Death and Resurrection
294 | Luke 1-3 | Births, Promise, and Preparation
295 | Luke 4-6 | Jesus' Mission and Kingdom Ethics
296 | Luke 7-9 | Mercy, Miracles, and Discipleship
297 | Luke 10-12 | Neighbor Love, Prayer, and Watchfulness
298 | Luke 13-15 | Repentance, Lost Things, and Grace
299 | Luke 16-18 | Wealth, Faith, and Humility
300 | Luke 19-21 | Jerusalem, Temple, and Coming Judgment
301 | Luke 22-24 | Cross, Resurrection, and Opened Eyes
302 | John 1-3 | The Word Became Flesh
303 | John 4-6 | Living Water and Bread of Life
304 | John 7-9 | Living Water, Light, and Sight
305 | John 10-12 | Good Shepherd and the Hour Arrives
306 | John 13-15 | Love, Service, and Abiding
307 | John 16-18 | Spirit, Prayer, and Arrest
308 | John 19-21 | Finished Work and Restored Disciples
309 | Acts 1-3 | Spirit, Witness, and the Church Begins
310 | Acts 4-6 | Bold Witness and Shared Life
311 | Acts 7-9 | Stephen, Saul, and Conversion
312 | Acts 10-12 | Gospel to Gentiles
313 | Acts 13-15 | Mission and the Jerusalem Council
314 | Acts 16-18 | Gospel Across the Cities
315 | Acts 19-21 | Ephesus, Farewell, and Jerusalem
316 | Acts 22-24 | Paul's Defense and Witness
317 | Acts 25-27 | Paul Appeals and Sails Through Storm
318 | Acts 28; Romans 1-2 | Rome and the Gospel's Need
319 | Romans 3-5 | Justification by Faith
320 | Romans 6-8 | New Life in the Spirit
321 | Romans 9-11 | Israel, Mercy, and God's Plan
322 | Romans 12-14 | Living Sacrifices and Love
323 | Romans 15-16; 1 Corinthians 1 | Unity, Mission, and the Cross
324 | 1 Corinthians 2-4 | Wisdom, Spirit, and Servants
325 | 1 Corinthians 5-7 | Holiness, Body, and Marriage
326 | 1 Corinthians 8-10 | Freedom, Love, and Warning
327 | 1 Corinthians 11-13 | Worship, Gifts, and Love
328 | 1 Corinthians 14-16 | Order, Resurrection, and Hope
329 | 2 Corinthians 1-3 | Comfort and New Covenant Ministry
330 | 2 Corinthians 4-6 | Treasure in Jars of Clay
331 | 2 Corinthians 7-9 | Repentance and Generosity
332 | 2 Corinthians 10-12 | Weakness and True Apostleship
333 | 2 Corinthians 13; Galatians 1-2 | Gospel Grace Defended
334 | Galatians 3-5 | Promise, Freedom, and the Spirit
335 | Galatians 6; Ephesians 1-2 | New Creation and Grace
336 | Ephesians 3-5 | Mystery, Unity, and New Life
337 | Ephesians 6; Philippians 1-2 | Armor, Joy, and Christlike Humility
338 | Philippians 3-4; Colossians 1 | Knowing Christ and His Supremacy
339 | Colossians 2-4 | Fullness in Christ
340 | 1 Thessalonians 1-3 | Faith, Love, and Encouragement
341 | 1 Thessalonians 4-5; 2 Thessalonians 1 | Holiness and the Lord's Return
342 | 2 Thessalonians 2-3; 1 Timothy 1 | Stand Firm and Guard the Gospel
343 | 1 Timothy 2-4 | Church Order and Godliness
344 | 1 Timothy 5-6; 2 Timothy 1 | Care, Contentment, and Courage
345 | 2 Timothy 2-4 | Endurance and Finishing Faithfully
346 | Titus 1-3 | Gospel-Shaped Leadership and Good Works
347 | Philemon 1; Hebrews 1-2 | Reconciliation and the Son's Supremacy
348 | Hebrews 3-5 | Jesus Greater Than Moses and Priesthood
349 | Hebrews 6-8 | Better Hope and Better Covenant
350 | Hebrews 9-11 | Once-for-All Sacrifice and Faith
351 | Hebrews 12-13; James 1 | Endurance and Living Faith
352 | James 2-4 | Faith Works Through Humility
353 | James 5; 1 Peter 1-2 | Patient Faith and Living Hope
354 | 1 Peter 3-5 | Suffering, Shepherding, and Glory
355 | 2 Peter 1-3 | Remember Truth and Await the Day
356 | 1 John 1-3 | Walking in Light and Love
357 | 1 John 4-5; 2 John 1 | Love, Truth, and Assurance
358 | 3 John 1; Jude 1; Revelation 1 | Truth, Contending, and the Risen Christ
359 | Revelation 2-4 | Churches Warned and Heaven Opened
360 | Revelation 5-7 | The Lamb, the Scroll, and the Redeemed
361 | Revelation 8-10 | Trumpets and the Little Scroll
362 | Revelation 11-13 | Witness, Beast, and Faithful Endurance
363 | Revelation 14-16 | Harvest, Bowls, and Judgment
364 | Revelation 17-19 | Babylon Falls and the King Returns
365 | Revelation 20-22 | Final Judgment and New Creation
`;

function parseBibleYearSchedule(raw: string): BibleYearScheduleEntry[] {
  return raw
    .trim()
    .split(/\r?\n/)
    .map((line) => {
      const [day, reference, title] = line.split("|").map((piece) => piece.trim());
      return {
        dayNumber: Number(day),
        reference: reference || "",
        title: title || "",
      };
    })
    .filter((entry) => entry.dayNumber && entry.reference && entry.title);
}

const ADDITIONAL_BIBLE_YEAR_SCHEDULE = parseBibleYearSchedule(ADDITIONAL_BIBLE_YEAR_SCHEDULE_RAW);

const RAW_GENESIS_BIBLE_IN_ONE_YEAR_SERIES: GenesisBibleYearDay[] = [
  {
    dayNumber: 1,
    title: "Creation of the World",
    reference: "Genesis 1-2",
    estimatedTime: "18 min",
    summary: "Start with creation, Eden, image of God, purpose, rest, and relationship.",
    coverImage: "/Day1cover.png",
    readings: buildGenesisReadings("The Creation of the World", 1, 2, 1),
  },
  {
    dayNumber: 2,
    title: "Fall of Man",
    reference: "Genesis 3-4",
    estimatedTime: "about 15 min",
    summary: "Follow temptation, shame, Cain and Abel, exile, violence, and the first hints of hope.",
    coverImage: "/day2cover.png",
    readings: buildGenesisReadings("The Fall of Man", 3, 4, 1),
  },
  {
    dayNumber: 3,
    title: "Noah Builds an Ark",
    reference: "Genesis 5-7",
    estimatedTime: "about 15 min",
    summary: "Learn about the generations of Noah, the corruption of the earth, God's warning, Noah's obedience, and the ark.",
    coverImage: "/day3cover.png",
    readings: buildGenesisReadings("The Flood of Noah", 5, 7, 1),
  },
  {
    dayNumber: 4,
    title: "Life After the Flood",
    reference: "Genesis 8-10",
    estimatedTime: "about 16 min",
    summary: "Move through the flood waters receding, Noah's altar, God's covenant, the rainbow, human weakness, and the nations.",
    coverImage: "/day4cover.png",
    readings: buildGenesisReadings("The Flood of Noah", 8, 10, 4),
  },
  {
    dayNumber: 5,
    title: "Obedience of Abraham",
    reference: "Genesis 11-13",
    estimatedTime: "about 16 min",
    summary: "Begin Abraham's story with Babel, Abram's family line, God's call, Egypt, and Abram learning not to grasp.",
    coverImage: "/day5cover.png",
    readings: buildGenesisReadings("The Obedience of Abraham", 11, 13, 1),
  },
  {
    dayNumber: 6,
    title: "The Rescue of Lot",
    reference: "Genesis 14-15",
    estimatedTime: "about 16 min",
    summary: "Follow Abram rescuing Lot, meeting Melchizedek, refusing Sodom's reward, and receiving God's covenant promise.",
    coverImage: "/day6cover.png",
    readings: buildGenesisReadings("The Obedience of Abraham", 14, 15, 4),
  },
  {
    dayNumber: 7,
    title: "The Covenant Promise",
    reference: "Genesis 16-17",
    estimatedTime: "about 14 min",
    summary: "Study Hagar, waiting, human shortcuts, the God who sees, new names, circumcision, Isaac, and covenant promise.",
    coverImage: "/day7cover.png",
    readings: buildGenesisReadings("The Obedience of Abraham", 16, 17, 6),
  },
  {
    dayNumber: 8,
    title: "Sodom and Gomorrah",
    reference: "Genesis 18-20",
    estimatedTime: "about 20 min",
    summary: "Move through Abraham welcoming the visitors, Sarah hearing the promise, Abraham interceding, Sodom and Gomorrah's judgment, Lot's rescue, and God protecting Sarah in Gerar.",
    coverImage: "/day8cover.png",
    readings: buildGenesisReadings("The Obedience of Abraham", 18, 20, 8),
  },
  {
    dayNumber: 9,
    title: "Abraham's Legacy",
    reference: "Genesis 21-24",
    estimatedTime: "about 16 min",
    summary: "Close Abraham's main journey with Isaac's birth, Hagar and Ishmael, the test on Mount Moriah, Sarah's burial, and Isaac receiving Rebekah.",
    coverImage: "/day9cover.png",
    readings: buildGenesisReadings("The Obedience of Abraham", 21, 24, 11),
  },
  {
    dayNumber: 10,
    title: "Covenant Through Isaac",
    reference: "Genesis 25-27",
    estimatedTime: "about 35 min",
    summary: "Study Abraham's final years, Jacob and Esau's beginning, Isaac, wells, family tension, deception, and the blessing moving through weakness.",
    coverImage: "/day10cover.png",
    readings: buildGenesisReadings("The Promise Through Isaac", 25, 27, 1),
  },
  {
    dayNumber: 11,
    title: "Jacob Meets God at Bethel",
    reference: "Genesis 28-29",
    estimatedTime: "about 35 min",
    summary: "Begin Jacob's journey with Bethel, God's promise, exile, love, labor, and family complexity.",
    coverImage: "/day11cover.png",
    readings: buildGenesisReadings("The Wrestling of Jacob", 28, 29, 1),
  },
  {
    dayNumber: 12,
    title: "Jacob Leaves Laban",
    reference: "Genesis 30-31",
    estimatedTime: "about 40 min",
    summary: "Follow household tension, growth, conflict with Laban, and Jacob learning to leave by faith.",
    coverImage: "/day12cover.png",
    readings: buildGenesisReadings("The Wrestling of Jacob", 30, 31, 3),
  },
  {
    dayNumber: 13,
    title: "Jacob Wrestles With God",
    reference: "Genesis 32-33",
    estimatedTime: "30-35 min",
    summary: "Study fear, prayer, wrestling with God, a changed name, and reconciliation with Esau.",
    readings: buildGenesisReadings("The Wrestling of Jacob", 32, 33, 5),
  },
  {
    dayNumber: 14,
    title: "Jacob's Family and Esau's Line",
    reference: "Genesis 34-36",
    estimatedTime: "40-45 min",
    summary: "Close Jacob's section with grief, violence, renewal at Bethel, loss, and the Edomite line.",
    readings: buildGenesisReadings("The Wrestling of Jacob", 34, 36, 7),
  },
  {
    dayNumber: 15,
    title: "Joseph Is Betrayed",
    reference: "Genesis 37-38",
    estimatedTime: "30-35 min",
    summary: "Begin Joseph's story with dreams, betrayal, the pit, Judah, Tamar, and God working in messy places.",
    readings: buildGenesisReadings("The Testing of Joseph", 37, 38, 1),
  },
  {
    dayNumber: 16,
    title: "Joseph in Egypt",
    reference: "Genesis 39-40",
    estimatedTime: "30-35 min",
    summary: "Follow Joseph through integrity, false accusation, prison, forgotten service, and hidden preparation.",
    readings: buildGenesisReadings("The Testing of Joseph", 39, 40, 3),
  },
  {
    dayNumber: 17,
    title: "Joseph Rises to Power",
    reference: "Genesis 41-42",
    estimatedTime: "30-35 min",
    summary: "Watch Joseph rise with wisdom, famine begin, and his brothers unknowingly face the one they betrayed.",
    readings: buildGenesisReadings("The Testing of Joseph", 41, 42, 5),
  },
  {
    dayNumber: 18,
    title: "Judah Stands in the Gap",
    reference: "Genesis 43-44",
    estimatedTime: "30-35 min",
    summary: "Study testing, fear, mercy, Judah's transformation, and the family reaching a breaking point.",
    readings: buildGenesisReadings("The Testing of Joseph", 43, 44, 7),
  },
  {
    dayNumber: 19,
    title: "Joseph Reveals Himself",
    reference: "Genesis 45-46",
    estimatedTime: "30-35 min",
    summary: "Move into revelation, forgiveness, reunion, and Jacob's family going down into Egypt.",
    readings: buildGenesisReadings("The Testing of Joseph", 45, 46, 9),
  },
  {
    dayNumber: 20,
    title: "Jacob Blesses Joseph's Sons",
    reference: "Genesis 47-48",
    estimatedTime: "30-35 min",
    summary: "Study provision in Egypt, Jacob's final years, blessing, adoption, and covenant hope.",
    readings: buildGenesisReadings("The Testing of Joseph", 47, 48, 11),
  },
  {
    dayNumber: 21,
    title: "Genesis Ends With Hope",
    reference: "Genesis 49-50",
    estimatedTime: "30-35 min",
    summary: "Finish Genesis with Jacob's blessings, burial, Joseph's forgiveness, and hope beyond Egypt.",
    readings: buildGenesisReadings("The Testing of Joseph", 49, 50, 13),
  },
  ...ADDITIONAL_BIBLE_YEAR_SCHEDULE.map((entry) => ({
    dayNumber: entry.dayNumber,
    title: entry.title,
    reference: entry.reference,
    estimatedTime: "30-35 min",
    summary: `Read ${entry.reference}: ${entry.title}.`,
    readings: buildReadingsFromReference(entry.title, entry.reference),
  })),
];

export const GENESIS_BIBLE_IN_ONE_YEAR_SERIES: GenesisBibleYearDay[] = RAW_GENESIS_BIBLE_IN_ONE_YEAR_SERIES.map((day) => ({
  ...day,
  coverImage: getBibleYearDayCoverImage(day),
}));

/**
 * Generate a 365-day Bible reading plan
 * Distributes all chapters evenly across the year
 */
export function generateBibleInOneYearPlan(): BibleInOneYearPlan {
  const days: DayReading[] = GENESIS_BIBLE_IN_ONE_YEAR_SERIES.map((day) => ({
    dayNumber: day.dayNumber,
    title: day.title,
    reference: day.reference,
    chapters: day.readings.map((reading) => ({
      book: reading.book,
      chapter: reading.chapter,
    })),
  }));

  const totalChapters = days.reduce((total, day) => total + day.chapters.length, 0);
  const totalDays = days.length;
  
  // Group days into weeks, including the final one-day week for Day 365.
  const weeks: WeekReading[] = [];
  const totalWeeks = Math.ceil(days.length / 7);
  for (let week = 1; week <= totalWeeks; week++) {
    const weekStartDay = (week - 1) * 7 + 1;
    const weekDays = days.slice(weekStartDay - 1, weekStartDay + 6).filter(d => d !== undefined);
    
    if (weekDays.length > 0) {
      weeks.push({
        weekNumber: week,
        days: weekDays,
      });
    }
  }
  
  return {
    weeks,
    totalDays,
    totalChapters,
  };
}

/**
 * Get the current day number based on start date (defaults to Jan 1)
 * Can be customized to start from a specific date
 */
export function getCurrentDayNumber(startDate?: Date): number {
  const start = startDate || new Date(new Date().getFullYear(), 0, 1); // Jan 1 of current year
  const now = new Date();
  const diffTime = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  // Return day number (1-365), wrapping around if needed
  const dayNumber = (diffDays % 365) + 1;
  return Math.max(1, Math.min(365, dayNumber));
}

/**
 * Get week number for a given day number
 */
export function getWeekNumber(dayNumber: number): number {
  return Math.ceil(dayNumber / 7);
}

/**
 * Get day number within week (1-7) for a given day number
 */
export function getDayInWeek(dayNumber: number): number {
  const dayInWeek = ((dayNumber - 1) % 7) + 1;
  return dayInWeek;
}

