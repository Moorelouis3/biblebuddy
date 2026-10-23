import Foundation
import DeviceActivity
import FamilyControls
import ManagedSettings

/**
 The handful of names and the one store that the app and this extension both
 need to agree on.

 Deliberately duplicated from the plugin rather than shared through a framework:
 the app half is a Swift package and this half is an Xcode extension target, and
 a framework between them would be a third thing to sign, embed and keep in
 step for about forty lines of code. They are separate modules, so the names
 cannot collide - but if one side changes, change the other.
 */

extension ManagedSettingsStore.Name {
    static let bibleLock = Self("net.mybiblebuddy.app.biblelock")
}

extension DeviceActivityName {
    static let bibleLockDaily = Self("net.mybiblebuddy.app.biblelock.daily")
}

/// The App Group. UserDefaults.standard is per-process, so this suite is the
/// only place the app and the extension can both see the chosen apps.
let bibleLockAppGroup = "group.net.mybiblebuddy.app"
let bibleLockSelectionKey = "net.mybiblebuddy.app.biblelock.selection"

enum BibleLockSharedSelection {
    static func load() -> FamilyActivitySelection {
        guard let defaults = UserDefaults(suiteName: bibleLockAppGroup),
              let data = defaults.data(forKey: bibleLockSelectionKey),
              let decoded = try? JSONDecoder().decode(FamilyActivitySelection.self, from: data)
        else {
            return FamilyActivitySelection()
        }
        return decoded
    }

    static func save(_ selection: FamilyActivitySelection) {
        guard let defaults = UserDefaults(suiteName: bibleLockAppGroup),
              let data = try? JSONEncoder().encode(selection)
        else { return }
        defaults.set(data, forKey: bibleLockSelectionKey)
    }
}

/**
 Which lock period the shield belongs to, and when it went on.

 Problem this exists to solve (Louis, 2026-10-23): "at the beginning of a new
 day the apps are shielded, I open Bible Buddy and it says congratulations
 you're unlocked without me doing anything."

 The web half decided whether the day's reading was done by looking at a
 timestamp in localStorage that only *it* wrote. The daily re-lock is done out
 here by the extension while the app is closed, so that timestamp was often
 days old, yesterday's chapter fell inside the window, and the app unlocked on
 launch.

 So the device records when the shield went on and which local day that was,
 and the app asks the device rather than its own memory. Both halves write
 here; the App Group is the only thing they can both see.
 */
let bibleLockStateKey = "net.mybiblebuddy.app.biblelock.state"

struct BibleLockState: Codable {
    /// When the shield was last applied, for this period.
    var lockedAt: Date?
    /// The local day the shield was applied on - the period's identity.
    var lockedPeriod: String?
    /// When the shield was last cleared.
    var unlockedAt: Date?
    /// The local day it was cleared on. Equal to the current period means the
    /// reading is done and the app must not put the lock back today.
    var unlockedPeriod: String?
}

enum BibleLockSharedState {
    /// The local calendar day, which is what one lock period is.
    static func periodKey(for date: Date = Date()) -> String {
        let formatter = DateFormatter()
        formatter.calendar = Calendar.current
        formatter.timeZone = TimeZone.current
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.string(from: date)
    }

    static func load() -> BibleLockState {
        guard let defaults = UserDefaults(suiteName: bibleLockAppGroup),
              let data = defaults.data(forKey: bibleLockStateKey),
              let decoded = try? JSONDecoder().decode(BibleLockState.self, from: data)
        else {
            return BibleLockState()
        }
        return decoded
    }

    static func save(_ state: BibleLockState) {
        guard let defaults = UserDefaults(suiteName: bibleLockAppGroup),
              let data = try? JSONEncoder().encode(state)
        else { return }
        defaults.set(data, forKey: bibleLockStateKey)
    }

    /**
     Record that the shield is on.

     `force` is the difference between a person tapping Lock and the schedule
     coming round. A tap moves the boundary to now - what you read an hour ago
     does not buy back the apps you just locked. The schedule must NOT move it,
     because iOS delivers both intervalDidEnd (23:59) and intervalDidStart
     (00:00) and a second call would push the start of the period forward past
     a reading that had already happened inside it.
     */
    static func markLocked(at date: Date = Date(), force: Bool) {
        var state = load()
        let period = periodKey(for: date)
        if force || state.lockedAt == nil || state.lockedPeriod != period {
            state.lockedAt = date
            state.lockedPeriod = period
        }
        // A new period starts owing nothing to the last one.
        if state.unlockedPeriod != period {
            state.unlockedAt = nil
            state.unlockedPeriod = nil
        }
        save(state)
    }

    /// Record that the apps have been given back, and for which period.
    static func markUnlocked(at date: Date = Date()) {
        var state = load()
        state.unlockedAt = date
        state.unlockedPeriod = periodKey(for: date)
        save(state)
    }
}
