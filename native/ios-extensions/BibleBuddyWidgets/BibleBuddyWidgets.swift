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
 The look is in WidgetDesign.swift and the views in WidgetViews.swift, built to
 the approved designs in docs/widgets (v2, 2026-11-18).
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
            reference: "Psalm 23:1",
            text: "The LORD is my shepherd; I shall not want."
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
            study: StudySnapshot(title: "The Obedience of Abraham", day: 8, totalDays: 30, completedDays: 7),
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
