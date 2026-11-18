# Bible Buddy widget design spec (v2, 2026-11-18)

Text of Bible-Buddy-Widget-Designs-v2.pdf, the approved widget designs. The 12 MB PDF is not in the repo; widget-preview.png shows the result. Implemented in native/ios-extensions/BibleBuddyWidgets.

```
pages 6

=== page 1
B I B L E   B U D D Y   /   W I D G E T   D E S I G N
Verse of the Day
Home Screen · Small + Medium
L I G H T H O M E S C R E E N   D A R K H O M E S C R E E N
Top row shows short and long verses at 170 × 170. The two cards below show the same verses at 364 × 170. The
medium widget gives the Bible artwork its own space.
Mockups use substitute render fonts. The build uses SF Pro and New York. The Abraham cover is from the supplied Day Complete art.
The transparent illustrations are included in the ZIP.
Lavender waves, the open Bible, and gold rays echo the Day Complete
pop-up. The verse gets the full reading column.
Color tokens
Mode   Start   End   Primary   Secondary   Accent   Wave
Light   #FAF5FF   #EDDCFF   #151532   #4C4067   #6515B4   #D7B9FA
Dark   #3B235D   #231936   #FFF6FF   #DFCCF7   #E7BBFF   #6A419B
Type and layout
Label pill   SF Pro Heavy 8.4 / 12, +0.65 tracking, Accent. Top 12, height 18, radius 9,
horizontal inset 8. Accent fill at 13% light or 18% dark.
Small · short   New York Regular 20 / 23, tracking −0.45. Primary. Top 48, x 13, width
144.
Small · long   New York Regular 12 / 12.5, tracking −0.11. Top 37, x 13, width 144.
Medium · short   New York Regular 23 / 27, tracking −0.40. Top 47, x 20, width 230.
Medium · long   New York Regular 15.3 / 16.8, tracking −0.13. Top 38, x 20, width 233.
Reference   SF Pro Bold 11 / 15, Accent. Top 143, x 13 small / 20 medium. Label pill
uses the same x.
Bible artwork   book.png , aspect fit. Small (120, 3), 43 × 29. Medium (254, 39), 100 × 96.
Shared art and surfaces
Art is included as PNGs with alpha. For the card curves, use the scalable path guide in the
ZIP. Light sheen is #FFFFFF at 40% in the center and fades to clear. Dark sheen uses Wave
at 14% and fades to clear. Light edge #FFFFFF at 88%, dark edge Accent at 24%. Edge is 1.3
pt, inset 0.65.
Content and tap
Start at the short tier and select the long tier when the copy exceeds the reading column.
Reserve y 143 onward for the reference. Use 11.5 / 12 small or 14 / 16 medium if needed,
then a word-boundary excerpt. Tap opens the daily verse and explanation. Refresh at the
app’s morning verse rollover.
Measurements are in pt from the top left. Type uses size / line height. Use the native WidgetKit
family mask (24 pt radius in previews). Main fill uses 132° CSS-style gradient. Insets include
system margins. Cloud artwork is #FFFFFF at 78% in light and Wave at 52% in dark.
Apple widget dimensions · Rendering modes · Live dates · KJV samples   01 / 06

=== page 2
B I B L E   B U D D Y   /   W I D G E T   D E S I G N
Streak
Home Screen · Small
L I G H T H O M E S C R E E N   D A R K H O M E S C R E E N
Both appearances show 3 and 314 with the same number slot and glossy gold flame.
Mockups use substitute render fonts. The build uses SF Pro and New York. The Abraham cover is from the supplied Day Complete art.
The transparent illustrations are included in the ZIP.
Warm cream, a glossy golden flame and a big, bold count carry the
celebratory feel of the Day Complete pop-up.
Color tokens
Mode   Start   End   Primary   Secondary   Accent   Wave
Light   #FFF8EB   #FFE0BE   #321A44   #67434D   #8C3F0E   #FFC485
Dark   #4E2B4F   #342440   #FFEFDB   #F8D4BC   #FFD394   #8C4C50
Type and layout
Label pill   SF Pro Heavy 8.4 / 12, +0.65 tracking, Accent. Top 12, height 18, radius 9,
horizontal inset 8. Accent fill at 13% light or 18% dark.
Counter   SF Pro Heavy 65 / 68, tracking −3.7, tabular digits. Primary. (13, 42). Use
an adaptive fit above 999.
Day streak   SF Pro Heavy 17 / 21, tracking −0.4, Primary. (16, 106).
Daily nudge   SF Pro Semibold 11 / 15, Secondary. (16, 140).
Flame artwork   flame.png , aspect fit at (105, 10), 56 × 57. The warm spark accents are
part of the image.
Shared art and surfaces
Art is included as PNGs with alpha. For the card curves, use the scalable path guide in the
ZIP. Light sheen is #FFFFFF at 40% in the center and fades to clear. Dark sheen uses Wave
at 14% and fades to clear. Light edge #FFFFFF at 88%, dark edge Accent at 24%. Edge is 1.3
pt, inset 0.65.
Content and tap
Use the current Bible Buddy streak. Read the count and “day streak” together in VoiceOver.
The whole widget opens Bible Buddy.
Measurements are in pt from the top left. Type uses size / line height. Use the native WidgetKit
family mask (24 pt radius in previews). Main fill uses 132° CSS-style gradient. Insets include
system margins. Cloud artwork is #FFFFFF at 78% in light and Wave at 52% in dark.
Apple widget dimensions · Rendering modes · Live dates   02 / 06

=== page 3
B I B L E   B U D D Y   /   W I D G E T   D E S I G N
My Study
Home Screen · Small + Medium
L I G H T H O M E S C R E E N   D A R K H O M E S C R E E N
Both active examples use the Abraham cover from the supplied Day Complete pop-up. The empty widget uses a glossy
stack of books.
Mockups use substitute render fonts. The build uses SF Pro and New York. The Abraham cover is from the supplied Day Complete art.
The transparent illustrations are included in the ZIP.
The cover from the Day Complete pop-up leads the active study. The
brass-and-violet artwork carries into the empty state.
Color tokens
Mode   Start   End   Primary   Secondary   Accent   Wave
Light   #FDF7FF   #E9D8FB   #171431   #4E3C66   #6515B4   #CFAFF0
Dark   #372050   #281B45   #FFF4FF   #E3CEF8   #E7B9FF   #6C47A0
Active study · small / medium
Label pill   Shared label pill style, x 13 / 108.
Cover   (13, 44), 47 × 70.5, r 4 / (20, 22), 76 × 114, r 5. #160C38 shadow at 44%, y
+4, Gaussian σ 3.
Title   SF Pro Heavy 12.4 / 15, −0.15 at (68, 43), width 91, max 3 lines / 23 / 26,
−0.38 at (108, 40), width 238, max 2 lines. Primary.
Day   SF Pro Bold 10 / 13 at (68, 94) / 12 / 15 at (108, 95). Secondary.
Progress   (13, 125), width 144 / (108, 116), width 233. Height 5, radius 2.5; Wave
track, Accent fill. Sample 8/30.
Continue   SF Pro Heavy 12 / 16 at (13, 139) / (108, 136). Accent.   arrow.right   12, gap
5. Medium rays #FFD252.
Empty study · small / medium
Label & title   Shared pill x 13 / 20. SF Pro Heavy 21 / 24 at (13, 80) / 27 / 31 at (20, 57),
tracking −0.55, Primary. Width 144 / 226.
Illustration &
arrow
books.png   aspect fit at (88, 20), 72 × 67 / (239, 30), 109 × 118. Accent
arrow 16 at (13, 138) / (20, 122).
Content and tap
Use the current study’s portrait cover and day count. Active tap opens today’s lesson.
Empty tap opens the study picker.
Shared surface
Uses the same gradient, sheen, wave paths and edge as Verse of the Day. Apply the My
Study color tokens above.
Measurements are in pt from the top left. Type uses size / line height. Use the native WidgetKit
family mask (24 pt radius in previews). Main fill uses 132° CSS-style gradient. Insets include
system margins. Cloud artwork is #FFFFFF at 78% in light and Wave at 52% in dark.
Apple widget dimensions · Rendering modes · Live dates   03 / 06

=== page 4
B I B L E   B U D D Y   /   W I D G E T   D E S I G N
Bible Lock
Home Screen · Small
L I G H T H O M E S C R E E N   D A R K H O M E S C R E E N
Top left shows apps locked. Top right shows the unlocked countdown. The second row shows setup. Each state has its
own illustrated lock.
Mockups use substitute render fonts. The build uses SF Pro and New York. The Abraham cover is from the supplied Day Complete art.
The transparent illustrations are included in the ZIP.
The locked state borrows the sky-blue games card. Unlocking brings in mint,
gold sparks and Bible Buddy blue. Setup uses the lavender palette.
Color tokens
Mode   Start   End   Primary   Secondary   Accent   Wave
Locked / L   #F0FAFF   #D2EBFF   #111938   #345376   #164AB2   #A4D7FF
Locked / D   #19365F   #192447   #F3F8FF   #C7DFFA   #A9D4FF   #35669C
Unlocked / L   #EEFBFF   #D2F5F2   #11223E   #304E68   #1453CB   #9FDFE6
Unlocked / D   #16415D   #182857   #F2FBFF   #CCEAF3   #B0F5F1   #3E7F9F
Setup / L   #F8F0FF   #E9D8FF   #191536   #4B3F67   #661DB3   #D4B5FF
Setup / D   #3D265B   #261B44   #FFF5FF   #E7D1F8   #E6BCFF   #6D4C9E
Type and layout
Label pill   SF Pro Heavy 8.4 / 12, +0.65 tracking, Accent. Top 12, height 18, radius 9,
horizontal inset 8. Accent fill at 13% light or 18% dark.
Status artwork   closed.png ,   open.png   or   setup.png , aspect fit. (97, 12), 62 × 59.
State title   SF Pro Heavy 19 / 24, Setup 17 / 24, tracking −0.40. Primary. (13, 74),
single line, width 144.
Hint   Locked / setup SF Pro Semibold 12 / 16 at (13, 114), width 144.
Countdown label SF Pro Bold 11 / 14 at (13, 107). Secondary.
Countdown chip   112 × 31 at (13, 125), r 15.5. Gradient 165° #0056FD light or #0063EE dark
to #173AB9. White #FFFFFF. SF Pro Heavy 21 / 26, −0.3, tabular digits,
centered.
Shared art and surfaces
Art is included as PNGs with alpha. For the card curves, use the scalable path guide in the
ZIP. Light sheen is #FFFFFF at 40% in the center and fades to clear. Dark sheen uses Wave
at 14% and fades to clear. Light edge #FFFFFF at 88%, dark edge Accent at 24%. Edge is 1.3
pt, inset 0.65.
Countdown and tap
Use   Text(timerInterval: entryDate...nextLocalMidnight, countsDown: true, showsHours:
true)   in the fixed timer slot. Supply a midnight timeline entry and reload after reading or
setup changes. Configured states open today’s reading. Setup opens Bible Lock
onboarding.
Measurements are in pt from the top left. Type uses size / line height. Use the native WidgetKit
family mask (24 pt radius in previews). Main fill uses 132° CSS-style gradient. Insets include
system margins. Cloud artwork is #FFFFFF at 78% in light and Wave at 52% in dark.
Apple widget dimensions · Rendering modes · Live dates   04 / 06

=== page 5
B I B L E   B U D D Y   /   W I D G E T   D E S I G N
Streak on the Lock Screen
Lock Screen · Rectangular + Circular
L I G H T L O C K S C R E E N   D A R K L O C K S C R E E N
The rectangular and circular widgets sit below the clock. Both 3 and 314 appear in the circular slots. The rectangular
slot shows 3 on the left phone and 314 on the right.
Lock Screen appearances illustrate system tint against light and dark wallpapers.
A monochrome flame identifies the streak in both accessory families. The
rectangular family can carry a short nudge under the count.
Rectangular · 172 × 76
Container   Transparent, radius 0. Horizontal inset 5, vertical inset 8. Center the row
vertically, with icon first and an 8 pt gap.
Flame   flame.fill   at 22, primary.
Title   “3 day streak” or “314 day streak” in SF Pro Bold 15 / 19, tracking −0.15,
primary.
Nudge   “Keep it going today” in SF Pro Medium 11 / 15, secondary, 1 pt below
title.
Circular · 76 × 76
Container   Center a vertical stack inside   AccessoryWidgetBackground() . Preview
circle radius 38. Icon-to-count gap 2.
Flame   flame.fill   at 17, primary.
Count   SF Pro Bold 23 / 26, tracking −0.6, tabular digits, primary. Live count is
available to VoiceOver with “day streak.”
System tint and tap
The preview uses #FFFFFF, #FFFFFF at 82% for secondary text, and #FFFFFF at 12.5% for the
circle. On device, use primary/secondary hierarchy and let WidgetKit’s vibrant mode supply
the visible tint. A single tap opens Bible Buddy.
Home Screen pairing
Lock Screen artwork uses SF Symbols and iOS’s monochrome treatment. The colored book,
flame and padlock PNGs are for Home Screen widgets.
Accessory dimensions and type sizes refer to the same 430 × 932 pt device. The system chooses
layout, tint and margins for the actual device.
Apple widget dimensions · Rendering modes · Live dates   05 / 06

=== page 6
B I B L E   B U D D Y   /   W I D G E T   D E S I G N
Bible Lock on the Lock Screen
Lock Screen · Rectangular
L I G H T L O C K S C R E E N   D A R K L O C K S C R E E N
Locked at left and unlocked at right in context. The state strip shows all three accessory layouts. The screenshot set
includes each state on both wallpapers.
Lock Screen appearances illustrate system tint against light and dark wallpapers.
The icon and the wording identify the state in a single glance, even with the
system’s monochrome tint.
Rectangular · 172 × 76
Container   Transparent, radius 0. Horizontal inset 5, vertical inset 8. Center the row
vertically, icon first, gap 8.
State symbol   lock.fill ,   lock.open.fill   or   lock.badge.plus   at 21, primary.
Title   SF Pro Bold 15 / 19, tracking −0.15, primary. “Apps locked”, “Apps
unlocked” or “Set up Bible Lock”.
Secondary row   SF Pro Medium 11 / 15, secondary, 1 pt below title. “Read today to
unlock”, “Locks in” + timer, or “Read before distractions”.
Timer   SF Pro Bold 11 / 15, tabular digits, secondary. Reserve enough space for
23:59:59. Use the same live interval as the small widget.
State previews
System tint and tap
The preview uses #FFFFFF and #FFFFFF at 82% for foreground and secondary text. The icon
cutout follows the background on device. Use WidgetKit’s vibrant rendering and system
tint. Configured states open today’s reading. Setup opens Bible Lock onboarding.
Home Screen pairing
Lock Screen artwork uses SF Symbols and iOS’s monochrome treatment. The colored book,
flame and padlock PNGs are for Home Screen widgets.
Accessory dimensions and type sizes refer to the same 430 × 932 pt device. The system chooses
layout, tint and margins for the actual device.
Apple widget dimensions · Rendering modes · Live dates   06 / 06
```
