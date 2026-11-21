import WidgetKit
import SwiftUI
import UIKit

/**
 The four widgets, drawn to the approved designs (docs/widgets, v2,
 2026-11-18). Every number below is the spec's: points from the top left of
 the 170-tall design canvas (WidgetDesign.swift), type as size / line height.
 SF Pro is .system, New York is .system(design: .serif).
 */

// MARK: - Verse of the Day

struct VerseView: View {
    let entry: VerseEntry
    @Environment(\.widgetFamily) private var family
    @Environment(\.colorScheme) private var scheme

    private var dark: Bool { scheme == .dark }
    private var medium: Bool { family == .systemMedium }
    private var palette: Palette { Palettes.verse(dark) }

    /// Short tier while the verse fits the big type, then the long tier,
    /// then a slightly smaller long tier that truncates at the end.
    private enum Tier { case short, long, longest }
    private var tier: Tier {
        let count = entry.text.count
        if medium { return count <= 60 ? .short : (count <= 200 ? .long : .longest) }
        return count <= 48 ? .short : (count <= 190 ? .long : .longest)
    }

    private var clouds: [CloudPlacement] {
        if medium { return [CloudPlacement(x: 278, y: 33, scale: 1.38), CloudPlacement(x: 311, y: 119, scale: 1.23)] }
        if tier == .short { return [CloudPlacement(x: 117, y: 108, scale: 1.09), CloudPlacement(x: 96, y: 124, scale: 0.63)] }
        return []
    }

    var body: some View {
        DesignCanvas { _ in
            ZStack(alignment: .topLeading) {
                LabelPill(text: "Verse of the Day", palette: palette, dark: dark).at(medium ? 20 : 13, 12)
                if medium {
                    ArtImage(name: "widget-book", width: 100, height: 96).at(254, 39)
                } else {
                    ArtImage(name: "widget-book", width: 43, height: 29).at(120, 3)
                }
                verse
                Text(entry.reference)
                    .font(.system(size: 11, weight: .bold))
                    .foregroundColor(palette.accent)
                    .lineLimit(1)
                    .at(medium ? 20 : 13, 143)
            }
        }
        .widgetBackground { CardSurface(palette: palette, dark: dark, clouds: clouds) }
        .widgetURL(siteURL("/dashboard"))
    }

    private var verse: some View {
        let x: CGFloat = medium ? 20 : 13
        let size: CGFloat
        let lineHeight: CGFloat
        let tracking: CGFloat
        let top: CGFloat
        let width: CGFloat
        switch (medium, tier) {
        case (false, .short): size = 20; lineHeight = 23; tracking = -0.45; top = 48; width = 144
        case (false, .long): size = 12; lineHeight = 12.5; tracking = -0.11; top = 37; width = 144
        case (false, .longest): size = 11.5; lineHeight = 12; tracking = -0.11; top = 37; width = 144
        case (true, .short): size = 23; lineHeight = 27; tracking = -0.40; top = 47; width = 230
        case (true, .long): size = 15.3; lineHeight = 16.8; tracking = -0.13; top = 38; width = 233
        case (true, .longest): size = 14; lineHeight = 16; tracking = -0.13; top = 38; width = 233
        }
        // Everything above y 143 is the reading column; the reference owns the rest.
        return Text(entry.text)
            .font(.system(size: size, weight: .regular, design: .serif))
            .tracking(tracking)
            .lineSpacing(lineGap(size: size, lineHeight: lineHeight))
            .foregroundColor(palette.primary)
            .minimumScaleFactor(0.85)
            .truncationMode(.tail)
            .frame(width: width, height: 139 - top, alignment: .topLeading)
            .at(x, top)
    }
}

struct VerseWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "BibleBuddyVerseWidget", provider: VerseProvider()) { entry in
            VerseView(entry: entry)
        }
        .configurationDisplayName("Verse of the Day")
        .description("Today's verse from Bible Buddy.")
        .supportedFamilies([.systemSmall, .systemMedium])
        .designMargins()
    }
}

// MARK: - Streak

struct StreakView: View {
    let entry: StreakEntry
    @Environment(\.widgetFamily) private var family
    @Environment(\.colorScheme) private var scheme

    private var count: Int { entry.streak ?? 0 }

    var body: some View {
        switch family {
        case .accessoryCircular: circular
        case .accessoryRectangular: rectangular
        default: small
        }
    }

    private var small: some View {
        let dark = scheme == .dark
        let palette = Palettes.streak(dark)
        return DesignCanvas { _ in
            ZStack(alignment: .topLeading) {
                LabelPill(text: "Streak", palette: palette, dark: dark).at(13, 12)
                ArtImage(name: "widget-flame", width: 56, height: 57).at(105, 10)
                Text("\(count)")
                    .font(.system(size: 65, weight: .heavy))
                    .monospacedDigit()
                    .tracking(-3.7)
                    .foregroundColor(palette.primary)
                    .lineLimit(1)
                    .minimumScaleFactor(0.5)
                    .frame(width: 150, height: 68, alignment: .leading)
                    .at(13, 42)
                Text("day streak")
                    .font(.system(size: 17, weight: .heavy))
                    .tracking(-0.4)
                    .foregroundColor(palette.primary)
                    .at(16, 106)
                Text("Keep it going today")
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundColor(palette.secondary)
                    .at(16, 140)
            }
            .accessibilityElement(children: .ignore)
            .accessibilityLabel("\(count) day streak")
        }
        .widgetBackground { CardSurface(palette: palette, dark: dark, clouds: [CloudPlacement(x: 115, y: 106, scale: 1.02)]) }
        .widgetURL(siteURL("/dashboard"))
    }

    private var circular: some View {
        ZStack {
            AccessoryWidgetBackground()
            VStack(spacing: 2) {
                Image(systemName: "flame.fill").font(.system(size: 17))
                Text("\(count)")
                    .font(.system(size: 23, weight: .bold))
                    .monospacedDigit()
                    .tracking(-0.6)
                    .minimumScaleFactor(0.6)
                    .lineLimit(1)
            }
        }
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("\(count) day streak")
        .widgetBackground { Color.clear }
        .widgetURL(siteURL("/dashboard"))
    }

    private var rectangular: some View {
        HStack(spacing: 8) {
            Image(systemName: "flame.fill").font(.system(size: 22))
            VStack(alignment: .leading, spacing: 1) {
                Text("\(count) day streak")
                    .font(.system(size: 15, weight: .bold))
                    .tracking(-0.15)
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
                Text("Keep it going today")
                    .font(.system(size: 11, weight: .medium))
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
            }
        }
        .padding(.horizontal, 5)
        .padding(.vertical, 8)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
        .widgetBackground { Color.clear }
        .widgetURL(siteURL("/dashboard"))
    }
}

struct StreakWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "BibleBuddyStreakWidget", provider: StreakProvider()) { entry in
            StreakView(entry: entry)
        }
        .configurationDisplayName("Streak")
        .description("Your Bible Buddy day streak.")
        .supportedFamilies([.systemSmall, .accessoryCircular, .accessoryRectangular])
        .designMargins()
    }
}

// MARK: - My Study

struct StudyView: View {
    let entry: StudyEntry
    @Environment(\.widgetFamily) private var family
    @Environment(\.colorScheme) private var scheme

    private var dark: Bool { scheme == .dark }
    private var medium: Bool { family == .systemMedium }
    private var palette: Palette { Palettes.study(dark) }

    var body: some View {
        Group {
            if let study = entry.study {
                active(study)
            } else {
                empty
            }
        }
        .widgetBackground {
            if entry.study != nil {
                CardSurface(palette: palette, dark: dark, rays: medium ? CGPoint(x: 333, y: 37) : nil)
            } else {
                EmptyStudySurface(palette: palette, dark: dark)
            }
        }
        .widgetURL(siteURL(entry.study?.href ?? "/library"))
    }

    private func active(_ study: StudySnapshot) -> some View {
        let done = Double(study.completedDays ?? max(0, (study.day ?? 1) - 1))
        let fraction = study.totalDays > 0 ? min(1, done / Double(study.totalDays)) : 0
        let dayLine = study.day.map { "Day \($0) of \(study.totalDays)" } ?? "\(study.totalDays) days"
        return DesignCanvas { _ in
            ZStack(alignment: .topLeading) {
                LabelPill(text: "My Study", palette: palette, dark: dark).at(medium ? 108 : 13, 12)
                cover.at(medium ? 20 : 13, medium ? 22 : 44)
                Text(study.title)
                    .font(.system(size: medium ? 23 : 12.4, weight: .heavy))
                    .tracking(medium ? -0.38 : -0.15)
                    .lineSpacing(lineGap(size: medium ? 23 : 12.4, lineHeight: medium ? 26 : 15))
                    .foregroundColor(palette.primary)
                    .lineLimit(medium ? 2 : 3)
                    .minimumScaleFactor(0.8)
                    .frame(width: medium ? 238 : 91, alignment: .topLeading)
                    .at(medium ? 108 : 68, medium ? 40 : 43)
                Text(dayLine)
                    .font(.system(size: medium ? 12 : 10, weight: .bold))
                    .foregroundColor(palette.secondary)
                    .at(medium ? 108 : 68, medium ? 95 : 94)
                progress(fraction).at(medium ? 108 : 13, medium ? 116 : 125)
                HStack(spacing: 5) {
                    Text("Continue").font(.system(size: 12, weight: .heavy))
                    Image(systemName: "arrow.right").font(.system(size: 12, weight: .heavy))
                }
                .foregroundColor(palette.accent)
                .at(medium ? 108 : 13, medium ? 136 : 139)
            }
        }
    }

    private var cover: some View {
        let width: CGFloat = medium ? 76 : 47
        let height: CGFloat = medium ? 114 : 70.5
        let radius: CGFloat = medium ? 5 : 4
        return Group {
            if let image = entry.cover {
                Image(uiImage: image).resizable().aspectRatio(contentMode: .fill)
            } else {
                palette.wave
            }
        }
        .frame(width: width, height: height)
        .clipShape(RoundedRectangle(cornerRadius: radius, style: .continuous))
        .shadow(color: hexColor(0x160C38).opacity(0.44), radius: 3, x: 0, y: 4)
    }

    private func progress(_ fraction: Double) -> some View {
        let width: CGFloat = medium ? 233 : 144
        return ZStack(alignment: .leading) {
            Capsule().fill(palette.wave)
            Capsule().fill(palette.accent).frame(width: max(5, width * CGFloat(fraction)))
        }
        .frame(width: width, height: 5)
    }

    private var empty: some View {
        DesignCanvas { width in
            ZStack(alignment: .topLeading) {
                LabelPill(text: "My Study", palette: palette, dark: dark).at(medium ? 20 : 13, 12)
                if medium {
                    ArtImage(name: "widget-books", width: 109, height: 118).at(239, 30)
                } else {
                    ArtImage(name: "widget-books", width: 72, height: 67).at(88, 20)
                }
                Text("Start a Bible study")
                    .font(.system(size: medium ? 27 : 21, weight: .heavy))
                    .tracking(-0.55)
                    .lineSpacing(lineGap(size: medium ? 27 : 21, lineHeight: medium ? 31 : 24))
                    .foregroundColor(palette.primary)
                    .frame(width: medium ? 226 : 144, alignment: .topLeading)
                    .at(medium ? 20 : 13, medium ? 57 : 80)
                Image(systemName: "arrow.right")
                    .font(.system(size: 16, weight: .bold))
                    .foregroundColor(palette.accent)
                    .at(medium ? 20 : 13, medium ? 122 : 138)
            }
        }
    }
}

/// The empty study's surface carries its cloud at W - 52, which needs the width.
struct EmptyStudySurface: View {
    let palette: Palette
    let dark: Bool

    var body: some View {
        GeometryReader { geo in
            let width = geo.size.width / max(geo.size.height / designHeight, 0.01)
            CardSurface(palette: palette, dark: dark, clouds: [CloudPlacement(x: width - 52, y: 113, scale: 1.18)])
        }
    }
}

struct StudyWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "BibleBuddyStudyWidget", provider: StudyProvider()) { entry in
            StudyView(entry: entry)
        }
        .configurationDisplayName("My Study")
        .description("The Bible study you're in, and the day you're on.")
        .supportedFamilies([.systemSmall, .systemMedium])
        .designMargins()
    }
}

// MARK: - Bible Lock

struct LockView: View {
    let entry: LockEntry
    @Environment(\.widgetFamily) private var family
    @Environment(\.colorScheme) private var scheme

    var body: some View {
        switch family {
        case .accessoryRectangular: accessory
        default: small
        }
    }

    /// Configured states open today's reading; setup opens Bible Lock.
    private var destination: String {
        switch entry.status {
        // The lock's own page, setup included. 1.17 opened /settings, where it
        // sits at the bottom; the website maps that to /bible-lock meanwhile.
        case .notSetUp: return "/bible-lock"
        default: return Shared.snapshot().study?.href ?? "/dashboard"
        }
    }

    private var small: some View {
        let dark = scheme == .dark
        let palette: Palette
        let art: String
        let title: String
        switch entry.status {
        case .locked: palette = Palettes.locked(dark); art = "widget-closed"; title = "Apps locked"
        case .unlocked: palette = Palettes.unlocked(dark); art = "widget-open"; title = "Apps unlocked"
        case .notSetUp: palette = Palettes.setup(dark); art = "widget-setup"; title = "Set up Bible Lock"
        }
        return DesignCanvas { _ in
            ZStack(alignment: .topLeading) {
                LabelPill(text: "Bible Lock", palette: palette, dark: dark).at(13, 12)
                ArtImage(name: art, width: 62, height: 59).at(97, 12)
                Text(title)
                    .font(.system(size: isSetup ? 17 : 19, weight: .heavy))
                    .tracking(-0.40)
                    .foregroundColor(palette.primary)
                    .lineLimit(1)
                    .minimumScaleFactor(0.75)
                    .frame(width: 144, height: 24, alignment: .leading)
                    .at(13, 74)
                detail(palette: palette, dark: dark)
            }
        }
        .widgetBackground { CardSurface(palette: palette, dark: dark, clouds: [CloudPlacement(x: 123, y: 105, scale: 1.03)]) }
        .widgetURL(siteURL(destination))
    }

    private var isSetup: Bool {
        if case .notSetUp = entry.status { return true }
        return false
    }

    @ViewBuilder
    private func detail(palette: Palette, dark: Bool) -> some View {
        switch entry.status {
        case .locked:
            hint("Finish today's reading to unlock your apps.", palette: palette)
        case .notSetUp:
            hint("Lock distracting apps until you've read today.", palette: palette)
        case .unlocked(let relocksAt):
            Text("Locks again in")
                .font(.system(size: 11, weight: .bold))
                .foregroundColor(palette.secondary)
                .at(13, 107)
            Text(timerInterval: min(entry.date, relocksAt)...relocksAt, countsDown: true, showsHours: true)
                .font(.system(size: 21, weight: .heavy))
                .tracking(-0.3)
                .monospacedDigit()
                .foregroundColor(.white)
                .multilineTextAlignment(.center)
                .lineLimit(1)
                .minimumScaleFactor(0.7)
                .frame(width: 112, height: 31)
                .background(
                    Capsule().fill(
                        LinearGradient(
                            colors: [hexColor(dark ? 0x0063EE : 0x0056FD), hexColor(0x173AB9)],
                            startPoint: UnitPoint(x: 0.37, y: 0),
                            endPoint: UnitPoint(x: 0.63, y: 1)
                        )
                    )
                )
                .at(13, 125)
        }
    }

    private func hint(_ text: String, palette: Palette) -> some View {
        Text(text)
            .font(.system(size: 12, weight: .semibold))
            .lineSpacing(lineGap(size: 12, lineHeight: 16))
            .foregroundColor(palette.secondary)
            .frame(width: 144, alignment: .topLeading)
            .at(13, 114)
    }

    private var accessory: some View {
        HStack(spacing: 8) {
            Image(systemName: symbol).font(.system(size: 21))
            VStack(alignment: .leading, spacing: 1) {
                Text(accessoryTitle)
                    .font(.system(size: 15, weight: .bold))
                    .tracking(-0.15)
                    .lineLimit(1)
                    .minimumScaleFactor(0.8)
                accessorySecondary
                    .font(.system(size: 11, weight: .medium))
                    .foregroundStyle(.secondary)
                    .lineLimit(1)
            }
        }
        .padding(.horizontal, 5)
        .padding(.vertical, 8)
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .leading)
        .widgetBackground { Color.clear }
        .widgetURL(siteURL(destination))
    }

    private var symbol: String {
        switch entry.status {
        case .locked: return "lock.fill"
        case .unlocked: return "lock.open.fill"
        case .notSetUp:
            // lock.badge.plus is the spec's symbol; fall back if this iOS lacks it.
            return UIImage(systemName: "lock.badge.plus") != nil ? "lock.badge.plus" : "lock"
        }
    }

    private var accessoryTitle: String {
        switch entry.status {
        case .locked: return "Apps locked"
        case .unlocked: return "Apps unlocked"
        case .notSetUp: return "Set up Bible Lock"
        }
    }

    @ViewBuilder
    private var accessorySecondary: some View {
        switch entry.status {
        case .locked:
            Text("Read today to unlock")
        case .notSetUp:
            Text("Read before distractions")
        case .unlocked(let relocksAt):
            HStack(spacing: 3) {
                Text("Locks in")
                Text(timerInterval: min(entry.date, relocksAt)...relocksAt, countsDown: true, showsHours: true)
                    .font(.system(size: 11, weight: .bold))
                    .monospacedDigit()
            }
        }
    }
}

struct BibleLockWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "BibleBuddyLockWidget", provider: LockProvider()) { entry in
            LockView(entry: entry)
        }
        .configurationDisplayName("Bible Lock")
        .description("Whether your apps are locked, and a countdown to when they lock again.")
        .supportedFamilies([.systemSmall, .accessoryRectangular])
        .designMargins()
    }
}
