import WidgetKit
import SwiftUI
import UIKit

/**
 Bible Buddy's home-screen and lock-screen widgets (Louis, 2026-11-18: "can we
 do both? the user can pick which widget or have all of them? and the study
 guide ... and a bible lock widget where it counts down").

 Four widgets in one extension. iOS lists them all in the widget gallery and
 the person adds whichever they want, as many as they want:

   Verse of the Day   today's verse. Fetched by the widget itself each
                      morning from /api/widgets/verse, so it stays current even
                      on a day the app is not opened.
   Streak             the day streak, small or on the lock screen.
   My Study           the study guide they are in: cover, title, Day N of M.
   Bible Lock         locked, or unlocked with a live countdown to when the
                      apps lock again at midnight.

 Where the data comes from. A widget is a separate process: it cannot see the
 web view, the sign-in or the database. So:

   - The app writes a small snapshot (streak, current study, today's verse)
     into the App Group whenever Home loads - lib/nativeWidgets.ts calls the
     BibleLock plugin's setWidgetSnapshot, which also tells iOS to redraw.
   - Bible Lock's state is already in the App Group, written by the plugin and
     by the BibleLockMonitor extension. This file only reads it.

 Nothing here can change anything. Every tap opens the app at the right page,
 through the same link handling as an email link (components/NativeDeepLinks).

 Deployment target is iOS 16, so iOS 17-only modifiers sit behind #available.
 */

// MARK: - Shared

let widgetsAppGroup = "group.net.mybiblebuddy.app"
let widgetsSnapshotKey = "net.mybiblebuddy.app.widgets.snapshot"
let widgetsVerseCacheKey = "net.mybiblebuddy.app.widgets.verse"
let widgetsCoverCacheKey = "net.mybiblebuddy.app.widgets.cover"
// The same two keys BibleLockShared.swift writes. If those change, change these.
let widgetsLockStateKey = "net.mybiblebuddy.app.biblelock.state"
let widgetsLockSelectionKey = "net.mybiblebuddy.app.biblelock.selection"

let siteOrigin = "https://www.mybiblebuddy.net"
let brandBlue = Color(red: 0 / 255, green: 86 / 255, blue: 253 / 255)
let inkColor = Color(red: 14 / 255, green: 26 / 255, blue: 58 / 255)

struct StudySnapshot: Codable {
    var title: String
    var day: Int? = nil
    var totalDays: Int
    var completedDays: Int? = nil
    var cover: String? = nil
    var href: String? = nil
}

struct VerseSnapshot: Codable {
    var reference: String
    var text: String
    var translation: String? = nil
    var date: String? = nil
}

struct WidgetSnapshot: Codable {
    var streak: Int? = nil
    var study: StudySnapshot? = nil
    var verse: VerseSnapshot? = nil
}

enum Shared {
    static var defaults: UserDefaults? { UserDefaults(suiteName: widgetsAppGroup) }

    static func snapshot() -> WidgetSnapshot {
        guard let raw = defaults?.string(forKey: widgetsSnapshotKey),
              let data = raw.data(using: .utf8),
              let decoded = try? JSONDecoder().decode(WidgetSnapshot.self, from: data)
        else { return WidgetSnapshot() }
        return decoded
    }
}

/// The local day as the web app and Bible Lock both write it: yyyy-MM-dd.
func localDayKey(_ date: Date = Date()) -> String {
    let formatter = DateFormatter()
    formatter.calendar = Calendar.current
    formatter.timeZone = TimeZone.current
    formatter.locale = Locale(identifier: "en_US_POSIX")
    formatter.dateFormat = "yyyy-MM-dd"
    return formatter.string(from: date)
}

func nextMidnight(after date: Date = Date()) -> Date {
    let start = Calendar.current.startOfDay(for: date)
    return Calendar.current.date(byAdding: .day, value: 1, to: start) ?? date.addingTimeInterval(86_400)
}

/// A page on the site, which the app opens in place.
func siteURL(_ path: String?) -> URL {
    let fallback = URL(string: siteOrigin + "/dashboard")!
    guard let path = path, !path.isEmpty else { return fallback }
    if path.hasPrefix("http") { return URL(string: path) ?? fallback }
    return URL(string: siteOrigin + (path.hasPrefix("/") ? path : "/" + path)) ?? fallback
}

extension View {
    /// iOS 17 wants the background declared this way; iOS 16 has no such API.
    @ViewBuilder
    func widgetBackground(_ color: Color) -> some View {
        if #available(iOS 17.0, *) {
            self.containerBackground(for: .widget) { color }
        } else {
            self.background(color)
        }
    }
}

// MARK: - Verse of the Day

struct VerseEntry: TimelineEntry {
    let date: Date
    let reference: String
    let text: String
}

struct VerseProvider: TimelineProvider {
    func placeholder(in context: Context) -> VerseEntry {
        VerseEntry(
            date: Date(),
            reference: "Psalm 119:105",
            text: "Thy word is a lamp unto my feet, and a light unto my path."
        )
    }

    func getSnapshot(in context: Context, completion: @escaping (VerseEntry) -> Void) {
        completion(cached() ?? placeholder(in: context))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<VerseEntry>) -> Void) {
        fetchToday { fetched in
            let entry = fetched ?? cached() ?? placeholder(in: context)
            // A failed fetch tries again in an hour; a good one waits for tomorrow.
            let next = fetched == nil ? Date().addingTimeInterval(3_600) : nextMidnight()
            completion(Timeline(entries: [entry], policy: .after(next)))
        }
    }

    /// Today's verse as last seen: fetched by this widget, or handed over by the app.
    private func cached() -> VerseEntry? {
        let today = localDayKey()
        if let data = Shared.defaults?.data(forKey: widgetsVerseCacheKey),
           let verse = try? JSONDecoder().decode(VerseSnapshot.self, from: data),
           verse.date == today {
            return VerseEntry(date: Date(), reference: verse.reference, text: verse.text)
        }
        if let verse = Shared.snapshot().verse {
            return VerseEntry(date: Date(), reference: verse.reference, text: verse.text)
        }
        return nil
    }

    private func fetchToday(completion: @escaping (VerseEntry?) -> Void) {
        let today = localDayKey()
        guard let url = URL(string: "\(siteOrigin)/api/widgets/verse?date=\(today)") else {
            completion(nil)
            return
        }
        var request = URLRequest(url: url)
        request.timeoutInterval = 12
        URLSession.shared.dataTask(with: request) { data, response, _ in
            guard let data = data,
                  (response as? HTTPURLResponse)?.statusCode == 200,
                  var verse = try? JSONDecoder().decode(VerseSnapshot.self, from: data),
                  !verse.text.isEmpty
            else {
                completion(nil)
                return
            }
            verse.date = today
            if let encoded = try? JSONEncoder().encode(verse) {
                Shared.defaults?.set(encoded, forKey: widgetsVerseCacheKey)
            }
            completion(VerseEntry(date: Date(), reference: verse.reference, text: verse.text))
        }.resume()
    }
}

struct VerseView: View {
    let entry: VerseEntry
    @Environment(\.widgetFamily) private var family

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("VERSE OF THE DAY")
                .font(.system(size: 10, weight: .heavy))
                .foregroundColor(Color(red: 1, green: 0.78, blue: 0.35))
            Text(entry.text)
                .font(.system(size: family == .systemSmall ? 13 : 15, weight: .semibold, design: .serif))
                .foregroundColor(.white)
                .lineLimit(family == .systemSmall ? 6 : 5)
                .minimumScaleFactor(0.7)
            Spacer(minLength: 0)
            Text(entry.reference)
                .font(.system(size: 11, weight: .bold))
                .foregroundColor(.white.opacity(0.8))
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        .widgetBackground(inkColor)
        .widgetURL(siteURL("/dashboard"))
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
    }
}

// MARK: - Streak

struct StreakEntry: TimelineEntry {
    let date: Date
    let streak: Int?
}

struct StreakProvider: TimelineProvider {
    func placeholder(in context: Context) -> StreakEntry { StreakEntry(date: Date(), streak: 7) }

    func getSnapshot(in context: Context, completion: @escaping (StreakEntry) -> Void) {
        completion(StreakEntry(date: Date(), streak: Shared.snapshot().streak ?? 7))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<StreakEntry>) -> Void) {
        // The app redraws this the moment it writes a new number; midnight is
        // the backstop.
        let entry = StreakEntry(date: Date(), streak: Shared.snapshot().streak)
        completion(Timeline(entries: [entry], policy: .after(nextMidnight())))
    }
}

struct StreakView: View {
    let entry: StreakEntry
    @Environment(\.widgetFamily) private var family

    private var number: String { entry.streak.map(String.init) ?? "–" }

    var body: some View {
        switch family {
        case .accessoryCircular:
            ZStack {
                AccessoryWidgetBackground()
                VStack(spacing: 0) {
                    Text("🔥").font(.system(size: 14))
                    Text(number).font(.system(size: 18, weight: .heavy))
                }
            }
            .widgetURL(siteURL("/dashboard"))
        case .accessoryRectangular:
            VStack(alignment: .leading, spacing: 2) {
                Text("🔥 \(number) day streak").font(.system(size: 15, weight: .heavy))
                Text("Keep it going today").font(.system(size: 12))
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .widgetURL(siteURL("/dashboard"))
        default:
            VStack(spacing: 4) {
                Text("🔥").font(.system(size: 34))
                Text(number)
                    .font(.system(size: 40, weight: .heavy))
                    .foregroundColor(inkColor)
                    .minimumScaleFactor(0.5)
                    .lineLimit(1)
                Text(entry.streak == 1 ? "DAY STREAK" : "DAY STREAK")
                    .font(.system(size: 11, weight: .heavy))
                    .foregroundColor(Color(red: 0.54, green: 0.36, blue: 0.25))
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity)
            .widgetBackground(Color(red: 1, green: 0.95, blue: 0.9))
            .widgetURL(siteURL("/dashboard"))
        }
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
    }
}

// MARK: - My Study

struct StudyEntry: TimelineEntry {
    let date: Date
    let study: StudySnapshot?
    let cover: UIImage?
}

struct StudyProvider: TimelineProvider {
    func placeholder(in context: Context) -> StudyEntry {
        StudyEntry(
            date: Date(),
            study: StudySnapshot(title: "The Beginning of Everything", day: 8, totalDays: 21, completedDays: 7),
            cover: nil
        )
    }

    func getSnapshot(in context: Context, completion: @escaping (StudyEntry) -> Void) {
        let study = Shared.snapshot().study
        completion(study == nil ? placeholder(in: context) : StudyEntry(date: Date(), study: study, cover: cachedCover(for: study)))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<StudyEntry>) -> Void) {
        let study = Shared.snapshot().study
        let finish: (UIImage?) -> Void = { cover in
            completion(Timeline(entries: [StudyEntry(date: Date(), study: study, cover: cover)], policy: .after(nextMidnight())))
        }
        if let cover = cachedCover(for: study) {
            finish(cover)
            return
        }
        guard let coverPath = study?.cover, let url = URL(string: coverPath.hasPrefix("http") ? coverPath : siteOrigin + coverPath) else {
            finish(nil)
            return
        }
        var request = URLRequest(url: url)
        request.timeoutInterval = 12
        URLSession.shared.dataTask(with: request) { data, _, _ in
            guard let data = data, let image = UIImage(data: data) else {
                finish(nil)
                return
            }
            // Shrunk before keeping: a widget has very little memory, and the
            // covers are print-size PNGs.
            let small = resized(image, width: 240)
            if let jpeg = small.jpegData(compressionQuality: 0.85) {
                Shared.defaults?.set(["url": coverPath, "data": jpeg], forKey: widgetsCoverCacheKey)
            }
            finish(small)
        }.resume()
    }

    private func cachedCover(for study: StudySnapshot?) -> UIImage? {
        guard let path = study?.cover,
              let stored = Shared.defaults?.dictionary(forKey: widgetsCoverCacheKey),
              stored["url"] as? String == path,
              let data = stored["data"] as? Data
        else { return nil }
        return UIImage(data: data)
    }
}

func resized(_ image: UIImage, width: CGFloat) -> UIImage {
    guard image.size.width > width, image.size.width > 0 else { return image }
    let size = CGSize(width: width, height: image.size.height * width / image.size.width)
    let format = UIGraphicsImageRendererFormat()
    format.scale = 2
    return UIGraphicsImageRenderer(size: size, format: format).image { _ in
        image.draw(in: CGRect(origin: .zero, size: size))
    }
}

struct StudyProgressBar: View {
    let fraction: Double

    var body: some View {
        GeometryReader { geometry in
            ZStack(alignment: .leading) {
                Capsule().fill(Color.black.opacity(0.08))
                Capsule().fill(brandBlue).frame(width: max(6, geometry.size.width * CGFloat(min(1, max(0, fraction)))))
            }
        }
        .frame(height: 6)
    }
}

struct StudyView: View {
    let entry: StudyEntry
    @Environment(\.widgetFamily) private var family

    var body: some View {
        Group {
            if let study = entry.study {
                content(study)
            } else {
                VStack(alignment: .leading, spacing: 6) {
                    Text("MY STUDY").font(.system(size: 10, weight: .heavy)).foregroundColor(brandBlue)
                    Text("Start a Bible study").font(.system(size: 16, weight: .heavy)).foregroundColor(inkColor)
                    Text("Pick one in the Library.").font(.system(size: 12)).foregroundColor(.secondary)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
                .widgetURL(siteURL("/library"))
            }
        }
        .widgetBackground(Color.white)
    }

    @ViewBuilder
    private func content(_ study: StudySnapshot) -> some View {
        let done = Double(study.completedDays ?? max(0, (study.day ?? 1) - 1))
        let fraction = study.totalDays > 0 ? done / Double(study.totalDays) : 0
        let dayLine = study.day.map { "Day \($0) of \(study.totalDays)" } ?? "\(study.totalDays) days"

        HStack(alignment: .top, spacing: 12) {
            if family != .systemSmall, let cover = entry.cover {
                Image(uiImage: cover)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .cornerRadius(4)
                    .shadow(radius: 2)
            }
            VStack(alignment: .leading, spacing: 5) {
                Text("MY STUDY").font(.system(size: 10, weight: .heavy)).foregroundColor(brandBlue)
                Text(study.title)
                    .font(.system(size: family == .systemSmall ? 14 : 16, weight: .heavy))
                    .foregroundColor(inkColor)
                    .lineLimit(3)
                    .minimumScaleFactor(0.8)
                Spacer(minLength: 0)
                Text(dayLine).font(.system(size: 12, weight: .bold)).foregroundColor(.secondary)
                StudyProgressBar(fraction: fraction)
                Text("Continue →").font(.system(size: 12, weight: .heavy)).foregroundColor(brandBlue)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        .widgetURL(siteURL(study.href ?? "/library"))
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
    }
}

// MARK: - Bible Lock

/// Same fields and keys as BibleLockState in BibleLockShared.swift. Decoded
/// here without FamilyControls, so this extension needs no Screen Time
/// entitlement just to read a date.
struct WidgetLockState: Codable {
    var lockedAt: Date?
    var lockedPeriod: String?
    var unlockedAt: Date?
    var unlockedPeriod: String?
}

enum LockStatus {
    case notSetUp
    case locked
    case unlocked(relocksAt: Date)
}

func lockStatus(at date: Date) -> LockStatus {
    guard let defaults = Shared.defaults,
          defaults.data(forKey: widgetsLockSelectionKey) != nil,
          let data = defaults.data(forKey: widgetsLockStateKey),
          let state = try? JSONDecoder().decode(WidgetLockState.self, from: data),
          state.lockedAt != nil
    else { return .notSetUp }
    // Unlocked means today's reading is done. The monitor puts the shield back
    // as the day turns over, so tomorrow the same state reads as locked.
    if state.unlockedPeriod == localDayKey(date) {
        return .unlocked(relocksAt: nextMidnight(after: date))
    }
    return .locked
}

struct LockEntry: TimelineEntry {
    let date: Date
    let status: LockStatus
}

struct LockProvider: TimelineProvider {
    func placeholder(in context: Context) -> LockEntry {
        LockEntry(date: Date(), status: .unlocked(relocksAt: nextMidnight()))
    }

    func getSnapshot(in context: Context, completion: @escaping (LockEntry) -> Void) {
        completion(LockEntry(date: Date(), status: lockStatus(at: Date())))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<LockEntry>) -> Void) {
        let now = Date()
        let midnight = nextMidnight(after: now)
        // Two entries: now, and the moment the lock comes back, so the widget
        // flips to Locked at midnight without waiting for the app.
        let entries = [
            LockEntry(date: now, status: lockStatus(at: now)),
            LockEntry(date: midnight, status: lockStatus(at: midnight.addingTimeInterval(1))),
        ]
        completion(Timeline(entries: entries, policy: .after(midnight.addingTimeInterval(60))))
    }
}

struct LockView: View {
    let entry: LockEntry
    @Environment(\.widgetFamily) private var family

    var body: some View {
        switch family {
        case .accessoryRectangular:
            accessory
        default:
            small
        }
    }

    private var accessory: some View {
        VStack(alignment: .leading, spacing: 2) {
            switch entry.status {
            case .locked:
                Text("🔒 Apps locked").font(.system(size: 15, weight: .heavy))
                Text("Read today to unlock").font(.system(size: 12))
            case .unlocked(let relocksAt):
                Text("🔓 Unlocked").font(.system(size: 15, weight: .heavy))
                HStack(spacing: 3) {
                    Text("Locks in").font(.system(size: 12))
                    Text(relocksAt, style: .timer).font(.system(size: 12, weight: .bold)).monospacedDigit()
                }
            case .notSetUp:
                Text("Bible Lock").font(.system(size: 15, weight: .heavy))
                Text("Set it up in Settings").font(.system(size: 12))
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .widgetURL(siteURL(destination))
    }

    private var small: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("BIBLE LOCK").font(.system(size: 10, weight: .heavy)).foregroundColor(.white.opacity(0.75))
            switch entry.status {
            case .locked:
                Text("🔒").font(.system(size: 30))
                Text("Apps locked").font(.system(size: 17, weight: .heavy)).foregroundColor(.white)
                Spacer(minLength: 0)
                Text("Finish today's reading to unlock them.")
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundColor(.white.opacity(0.85))
                    .lineLimit(3)
            case .unlocked(let relocksAt):
                Text("🔓").font(.system(size: 30))
                Text("Unlocked").font(.system(size: 17, weight: .heavy)).foregroundColor(.white)
                Spacer(minLength: 0)
                Text("Locks again in").font(.system(size: 11, weight: .semibold)).foregroundColor(.white.opacity(0.85))
                Text(relocksAt, style: .timer)
                    .font(.system(size: 20, weight: .heavy))
                    .monospacedDigit()
                    .foregroundColor(.white)
            case .notSetUp:
                Text("🔒").font(.system(size: 30))
                Text("Bible Lock").font(.system(size: 17, weight: .heavy)).foregroundColor(.white)
                Spacer(minLength: 0)
                Text("Lock distracting apps until you've read today.")
                    .font(.system(size: 11, weight: .semibold))
                    .foregroundColor(.white.opacity(0.85))
                    .lineLimit(3)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        .widgetBackground(lockColor)
        .widgetURL(siteURL(destination))
    }

    private var lockColor: Color {
        switch entry.status {
        case .locked: return inkColor
        case .unlocked: return brandBlue
        case .notSetUp: return Color(red: 0.25, green: 0.28, blue: 0.36)
        }
    }

    private var destination: String {
        switch entry.status {
        case .notSetUp: return "/settings"
        default: return Shared.snapshot().study?.href ?? "/dashboard"
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
    }
}

// MARK: - The bundle

@main
struct BibleBuddyWidgets: WidgetBundle {
    var body: some Widget {
        VerseWidget()
        StreakWidget()
        StudyWidget()
        BibleLockWidget()
    }
}
