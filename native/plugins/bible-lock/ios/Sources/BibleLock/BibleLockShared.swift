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
