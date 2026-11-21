# Church groups as Level 2: report

21 November 2026. Sources: an audit of this repo, our own database, and web
research on competitors, church budgets and outreach rules read the same day.
Figures marked (unverified) could not be confirmed on a primary page.

## Verdict

The direction is right: keep Bible Buddy free for the believer and charge the
church. Nobody resents that, and it fits why the app is free.

The plan as stated (build church groups, cold-write churches, $50 a month) is
the wrong order. Build **free groups anyone can start** first, find the
churches that show up on their own, pilot with a handful, and only then
charge. Cold outreach to churches is the weakest way in and, from Germany,
the riskiest.

## Why not sell first

**The headline feature is free elsewhere.** YouVersion gives churches a page,
sermon notes and announcements, and group reading plans for up to 150 people
at no cost. "The pastor's notes before Sunday" will not carry a paid plan on
its own.

**Someone already sells this exact thing at this exact price.** Arbor Faith:
group chat, announcements, study plans, leader dashboard, $49.99 a month per
church, $7.99 per leader. It has 5 App Store ratings. The idea alone does not
sell.

**Most churches are small and spend little on software.**

| US churches | Figure |
|---|---|
| Median weekly attendance | 65 to 70 |
| Share with 100 or fewer | 69% |
| Median income under 100 attenders | $87,000 a year |
| Share of budget on software and tech | about 2%, so roughly $1,700 a year |
| Groups in an average Protestant church | 7, about 10 people each |
| Group ministries still on paper | 64% |

$600 a year would be a third of a small church's whole software budget. The
churches with real discretionary money are the 10% over 250 people, and they
already pay for Planning Center, Subsplash or RightNow Media.

**We have no church signal yet.** 707 people were active in the last 30 days.
Not one account says it came through a church.

## Where Bible Buddy can actually win

The market splits in two and nothing sits in the middle:

- Admin tools (Planning Center, Subsplash, Tithe.ly) manage groups but have
  no study content.
- Content tools (RightNow Media at $155 to $1,510 a month, Logos) have
  content but are expensive, heavy or passive video.

Bible Buddy has the study guides, the notes, the discussion threads, the
games and a free app the members would actually open. A group home with the
study built in, for free or close to it, is the open space.

The biggest complaint in church forums is not price or features. It is
getting members to install another app. A free app people already like is
the real advantage, and it only exists if groups start free.

## What exists in the code and what does not

| Already there | Would have to be built |
|---|---|
| Group tables with leader, moderator and member roles | Screens to create and manage a group (none ever existed) |
| Posts, threaded replies, likes, pins | Real privacy: today any signed-in user can read every group |
| Multi-week series and schedule tables | Invite links and join codes (a column exists, nothing uses it) |
| Shared-study machinery: countdown, daily unlock, daily discussion | A group picking its own study and start date (events are hard-coded, on Berlin time) |
| Feed, notifications, push, email, DMs | A church account that owns several groups |
| Stripe checkout code, kept from before | Billing that handles renewals and cancellations |
| | A screen for a leader to write notes (content is loaded by scripts today) |
| | Any video call |

So this is a real build, not switching the old group back on. The old group
was one room everybody was put in. This is the opposite: many small private
rooms that people make themselves.

## Zoom

Do not build video. Give each group meeting a "meeting link" field and let
the leader paste their Zoom or Google Meet link. That is what most community
tools did for years; Skool only added its own calls in late 2025. Embedding
real video would cost roughly $400 a month at 50 active groups and is weeks
of work for something churches already have.

## Pricing

- **Groups: free.** Anyone can start one, invite people, pick a study. Every
  leader brings about ten people, which is growth and retention at once.
- **Church plan: about $49 a month, later.** Several groups under one church
  page, announcements to everyone, sermon notes, a leader dashboard showing
  who is keeping up. $49 is the normal small-church price point (Gloo+ $49,
  Arbor $49.99, Logos for Church from $50).
- **Done for you: not at $50.** Agencies that run things for churches charge
  $300 to $1,700 a month. If we set it up and post for them every week it
  should be $249 or more, or it will eat all the time there is.

Sell the church plan on the website, to the church, by invoice or Stripe. If
it is sold inside the iPhone app Apple takes 15 to 30%. Selling to an
organisation outside the app is the usual way round that, but confirm it
against Apple's current rules before the first sale.

## Outreach

Writing to churches cold is the plan's weakest part.

- The one person found who has sold to churches for years says cold outreach
  does not work and pastor referrals do. The only number found is one
  vendor's 4.28% reply rate.
- Cold email is legal in the US with a postal address and an unsubscribe
  link. It is conditional in Canada and Australia and risky for UK churches.
  Because the business is in Germany, EU rules apply to every pastor's named
  address, and German law generally wants consent first. This needs a
  lawyer's yes before any volume.
- Repeating the same promotional comment or DM across church accounts is
  exactly what Meta's spam rules target. The account at risk is the one that
  brings in the sign-ups.
- Cold email must never go from the domain that sends the welcome emails.

What works instead: the people already in the app go to churches. Ask them.

## The order to do it in

1. **Build free groups.** Private group, invite link, pick a study guide and
   a start date, daily discussion, a meeting-link field. Reuse the
   shared-study machinery.
2. **Find the churches inside.** Ask at group creation: "Is this for a
   church?" Watch for groups of eight or more.
3. **Pilot with five to ten churches for free**, one study each, in exchange
   for honest feedback and a quote. January is the natural start: new-year
   studies, and budgets are approved in November and December.
4. **Charge when churches ask for more than one group.** That request is the
   church plan.
5. **A discovery page of public groups, Skool-style, comes last.** It needs
   dozens of active groups to look alive. Skool only lists groups that meet
   an activity minimum for the same reason.

## What it could be worth

100 churches at $49 is about $4,900 a month. Reaching 100 by cold email at a
4% reply rate means many thousands of emails. Reaching it through groups that
already run in the app means each one is a warm conversation with a leader
who already uses it.

## Not verified

Skool's size, Subsplash and Pushpay prices (quote only), who signs off a $50
purchase in a church and how long it takes, Meta's exact DM limits, church
counts outside the US, UK and Australia, and Apple's current wording on
selling to organisations.
