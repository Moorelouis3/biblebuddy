"use client";

const painPoints = [
  "I do not know where to start in the Bible.",
  "I struggle to stay consistent.",
  "I read, but I do not understand what I am reading.",
];

const dailyFlow = [
  {
    title: "Start with the guided Bible Study card",
    body: "This is the anchor. Instead of opening the app and wondering what to do, BibleBuddy gives you a clear next chapter inside a larger study journey.",
  },
  {
    title: "Read the short study intro",
    body: "Before you jump into the chapter, you get context. You know what is happening, why it matters, and what to watch for as you read.",
  },
  {
    title: "Read the Bible chapter",
    body: "The chapter stays central. BibleBuddy is not trying to replace Scripture. It is trying to help you stay with it long enough to understand it.",
  },
  {
    title: "Open the chapter notes",
    body: "When the passage feels confusing, the notes slow it down. People, places, themes, repeated ideas, and hard moments become easier to follow.",
  },
  {
    title: "Review with Trivia and Scrambled",
    body: "Games are not filler. They help you remember what you just read by turning review into something active instead of passive.",
  },
  {
    title: "Finish with reflection",
    body: "The goal is not just information. Reflection helps you answer: What did I learn, what stood out, and how should I respond?",
  },
];

const xpExamples = [
  "Finishing chapter steps",
  "Completing Bible study tasks",
  "Answering games and review questions",
  "Posting or encouraging others in Community",
  "Showing up consistently over time",
];

const navItems = [
  {
    title: "Dashboard",
    body: "Your daily starting place. This is where your current Bible Study, daily tasks, Bible Buddy, progress, rewards, and next step come together.",
  },
  {
    title: "Community",
    body: "A Bible-centered place to post, ask questions, share notes, encourage others, and grow with people who are also trying to stay consistent.",
  },
  {
    title: "Bible TV",
    body: "Video learning for when you want to see, hear, and understand Bible topics visually alongside your reading.",
  },
  {
    title: "Games",
    body: "Trivia and word games that reinforce memory, attention, and retention after you read.",
  },
  {
    title: "Profile",
    body: "Your progress home. See your level, streaks, activity, rewards, customization, and the story your consistency is building.",
  },
];

const ecosystem = [
  {
    title: "Bible Studies",
    label: "Where to start",
    body: "Guided journeys replace random wandering. You can begin at Creation and move through Scripture one chapter at a time.",
  },
  {
    title: "Daily Tasks",
    label: "What to do today",
    body: "Your study is broken into clear steps so you never have to guess what counts as a good Bible study session.",
  },
  {
    title: "XP and Levels",
    label: "Why keep going",
    body: "Progress gives your consistency a visible shape. XP is not the point of Bible study, but it helps you see that showing up matters.",
  },
  {
    title: "Diamonds and Store",
    label: "What you unlock",
    body: "Diamonds reward consistency and let you personalize the app with themes, frames, Bible Buddies, and future unlockables.",
  },
  {
    title: "Bible Buddies",
    label: "Who encourages you",
    body: "Your Buddy gives the app personality, encouragement, and accountability. Different Buddies can feel like different study companions.",
  },
  {
    title: "Community",
    label: "Who grows with you",
    body: "Study becomes stronger when people encourage each other, share what they are learning, and keep the conversation centered on Scripture.",
  },
];

function SectionHeader({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2f7fe8]">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black leading-tight text-gray-950 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base font-semibold leading-7 text-gray-600">{body}</p>
    </div>
  );
}

function NumberCard({
  index,
  title,
  body,
}: {
  index: number;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-[24px] border border-[#dbe7f4] bg-white p-5 shadow-sm">
      <div className="grid h-10 w-10 place-items-center rounded-full bg-[#eaf5ff] text-sm font-black text-[#2f7fe8]">
        {index}
      </div>
      <h3 className="mt-4 text-lg font-black text-gray-950">{title}</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">{body}</p>
    </div>
  );
}

function MiniCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-[22px] border border-gray-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-black text-gray-950">{title}</h3>
      <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">{body}</p>
    </div>
  );
}

export default function UpdatesPage() {
  return (
    <main className="min-h-screen bg-[#f7fafc] text-gray-950">
      <section className="border-b border-[#dbe7f4] bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2f7fe8]">Welcome to the new BibleBuddy</p>
            <h1 className="mt-4 text-4xl font-black leading-[1.05] text-gray-950 sm:text-6xl">
              You finally have a place to start.
            </h1>
            <p className="mt-5 max-w-2xl text-lg font-semibold leading-8 text-gray-600">
              BibleBuddy has been redesigned into a guided Bible study system built for one simple purpose: helping you understand Scripture and stay consistent without feeling overwhelmed.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="/dashboard" className="rounded-full bg-[#2f7fe8] px-6 py-3 text-sm font-black text-white shadow-sm transition hover:bg-[#256fd1]">
                Start on Dashboard
              </a>
              <a href="/bible-studies" className="rounded-full border border-[#b9dcf4] bg-[#eaf5ff] px-6 py-3 text-sm font-black text-[#2f7fe8] transition hover:bg-white">
                View Bible Studies
              </a>
            </div>
          </div>

          <div className="rounded-[32px] border border-[#dbe7f4] bg-[#f8fbff] p-5 shadow-[0_18px_50px_rgba(38,63,99,0.10)]">
            <p className="text-sm font-black uppercase tracking-[0.16em] text-gray-500">The problems we are solving</p>
            <div className="mt-5 space-y-3">
              {painPoints.map((point) => (
                <div key={point} className="rounded-2xl bg-white px-4 py-4 text-sm font-black leading-6 text-gray-800 shadow-sm">
                  {point}
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-[#2f7fe8] px-5 py-5 text-white">
              <p className="text-sm font-black uppercase tracking-[0.16em] text-white/75">The new answer</p>
              <p className="mt-2 text-2xl font-black leading-tight">Guided structure, daily rhythm, deeper understanding.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="The big change"
          title="BibleBuddy is not just another Bible app."
          body="A normal Bible app gives you access. BibleBuddy gives you a path. Access is helpful, but a path is what you need when you are tired, busy, new to Scripture, or unsure where to begin."
        />

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
          <MiniCard
            title="A guided study system"
            body="The Bible Studies section organizes Scripture into clear journeys so you can move chapter by chapter instead of bouncing around randomly."
          />
          <MiniCard
            title="A habit-building platform"
            body="Daily tasks, streaks, check-ins, XP, and rewards are designed to help you keep showing up even when motivation is low."
          />
          <MiniCard
            title="A structured daily experience"
            body="Dashboard tells you what to do next, why it matters, and how today connects to the bigger story."
          />
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Your daily rhythm"
          title="What to do every day"
          body="You do not need to figure out a complicated routine. The new flow breaks Bible study into small, repeatable steps that build understanding over time."
        />

        <div className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dailyFlow.map((item, index) => (
            <NumberCard key={item.title} index={index + 1} title={item.title} body={item.body} />
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-4xl rounded-[28px] border border-[#dbe7f4] bg-[#f8fbff] p-6 text-center">
          <p className="text-2xl font-black text-gray-950">Consistency matters more than speed.</p>
          <p className="mt-3 text-sm font-semibold leading-6 text-gray-600">
            The goal is not to rush through the Bible. The goal is to keep returning to Scripture, one focused session at a time, until understanding starts to grow.
          </p>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="How it all connects"
          title="The BibleBuddy ecosystem"
          body="Each system has a job. Together, they help you start, understand, remember, stay motivated, and keep going."
        />

        <div className="mx-auto mt-10 grid max-w-6xl gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ecosystem.map((item) => (
            <div key={item.title} className="rounded-[24px] border border-[#dbe7f4] bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2f7fe8]">{item.label}</p>
              <h3 className="mt-3 text-xl font-black text-gray-950">{item.title}</h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[32px] border border-[#dbe7f4] bg-[#f8fbff] p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#2f7fe8]">Progress systems</p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-gray-950">XP exists to make consistency visible.</h2>
            <p className="mt-4 text-sm font-semibold leading-6 text-gray-600">
              XP is not the reason we study the Bible. Scripture is the reason. But when you are building a habit, it helps to see proof that small faithful actions are adding up.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <MiniCard title="Levels" body="Levels give long-term shape to your growth. They remind you that daily study is not wasted, even when progress feels slow." />
            <MiniCard title="Streaks" body="Streaks help you protect the habit. They are not about perfection. They are about returning daily and building rhythm." />
            <MiniCard title="Daily check-ins" body="Check-ins keep the app personal. They help BibleBuddy respond to where you are and nudge you back toward Scripture." />
            <MiniCard title="Rewards" body="Rewards make consistency feel alive. XP, diamonds, unlocks, and celebrations give your effort a visible trail." />
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-5xl rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-black uppercase tracking-[0.16em] text-gray-500">You can earn XP by</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {xpExamples.map((item) => (
              <div key={item} className="rounded-2xl bg-[#eaf5ff] px-4 py-4 text-sm font-black leading-5 text-[#2f6685]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Diamonds and customization"
          title="Rewards should make the app feel like yours."
          body="Diamonds are BibleBuddy's customization currency. As you build consistency, you can unlock visual pieces that make your study space feel more personal."
        />

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          <MiniCard title="Themes and frames" body="Change the look and feel of your BibleBuddy space so the app feels warm, personal, and motivating." />
          <MiniCard title="Bible Buddy customization" body="Unlock and switch Buddies so your study encouragement can match the kind of tone that helps you most." />
          <MiniCard title="Future unlockables" body="The store can keep growing with new customization, rewards, and collectibles tied to consistent Bible study." />
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Bible Buddies"
            title="You were not meant to study with a silent app."
            body="Bible Buddies bring personality, encouragement, and accountability into the experience. They help the app feel less like a checklist and more like a companion walking with you through Scripture."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <MiniCard title="Encouragement" body="A Buddy can cheer you on when you finish, guide you back when you drift, and help the next step feel less heavy." />
            <MiniCard title="Teaching personality" body="Different Buddies can carry different styles, tones, and study personalities so users can connect with the kind of guidance they enjoy." />
            <MiniCard title="Accountability" body="Your Buddy helps reinforce the daily rhythm: open the app, start the next study step, and keep going." />
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Community, TV, and games"
          title="Learning sticks when it becomes active."
          body="BibleBuddy gives you more than reading. You can talk about what you learned, watch Bible content, and review through interactive games."
        />

        <div className="mx-auto mt-10 grid max-w-6xl gap-4 lg:grid-cols-3">
          <div className="rounded-[28px] border border-[#dbe7f4] bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-black text-gray-950">Community</h3>
            <p className="mt-3 text-sm font-semibold leading-6 text-gray-600">
              Post notes, ask questions, share testimonies, encourage others, and build a positive Bible-centered space. Interaction can earn XP, but the deeper reward is growing together.
            </p>
          </div>
          <div className="rounded-[28px] border border-[#dbe7f4] bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-black text-gray-950">BibleBuddy TV</h3>
            <p className="mt-3 text-sm font-semibold leading-6 text-gray-600">
              Some people learn best when they can see and hear. BibleBuddy TV adds visual Bible learning alongside the reading flow.
            </p>
          </div>
          <div className="rounded-[28px] border border-[#dbe7f4] bg-white p-6 shadow-sm">
            <h3 className="text-2xl font-black text-gray-950">Bible Games</h3>
            <p className="mt-3 text-sm font-semibold leading-6 text-gray-600">
              Trivia and Scrambled help reinforce memory. They turn review into practice so the chapter does not disappear the moment you close it.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6">
        <SectionHeader
          eyebrow="Bottom navigation"
          title="Where everything lives"
          body="The app is organized so the most important habits are always close. Here is how to think about the main navigation."
        />

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
          {navItems.map((item) => (
            <MiniCard key={item.title} title={item.title} body={item.body} />
          ))}
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-[36px] bg-gray-950 px-6 py-10 text-center text-white shadow-[0_24px_70px_rgba(15,23,42,0.25)] sm:px-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#8cc8ff]">Start here</p>
          <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">Open Dashboard. Pick up the current Bible Study. Do the next step.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-7 text-gray-300">
            That is the heart of the new BibleBuddy. You do not need to be perfect. You do not need to move fast. You just need a clear place to start and a reason to come back tomorrow.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="/dashboard" className="rounded-full bg-white px-6 py-3 text-sm font-black text-gray-950 transition hover:bg-[#eaf5ff]">
              Go to Dashboard
            </a>
            <a href="/bible-studies" className="rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10">
              Browse Bible Studies
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
