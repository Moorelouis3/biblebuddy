import DeviceActivity
import ManagedSettings
import FamilyControls

/**
 Puts the lock back at the start of each day (Louis, 2026-10-15).

 This runs as a separate app extension, and it has to: iOS wakes it on the
 schedule whether or not Bible Buddy has been opened. Without it the lock works
 exactly once - you read, it clears, and tomorrow your phone is simply
 unlocked, which Louis rightly called the whole point.

 It shares the chosen apps with the app through an App Group. UserDefaults.standard
 is per-process, so the extension would see nothing there; the suite below is
 the only thing both halves can read.

 Deliberately small. An extension gets a few seconds and very little memory,
 and anything clever in here fails silently in a way nobody can debug from a
 phone.
 */
class BibleLockMonitor: DeviceActivityMonitor {
    private let store = ManagedSettingsStore(named: .bibleLock)

    override func intervalDidStart(for activity: DeviceActivityName) {
        super.intervalDidStart(for: activity)
        guard activity == .bibleLockDaily else { return }
        applyShield()
    }

    /// Belt to the braces above: iOS delivers this as the day turns over too.
    override func intervalDidEnd(for activity: DeviceActivityName) {
        super.intervalDidEnd(for: activity)
        guard activity == .bibleLockDaily else { return }
        applyShield()
    }

    private func applyShield() {
        let chosen = BibleLockSharedSelection.load()
        guard !chosen.applicationTokens.isEmpty || !chosen.categoryTokens.isEmpty else {
            // Nothing chosen any more. Leave the phone alone.
            return
        }
        store.shield.applications = chosen.applicationTokens.isEmpty ? nil : chosen.applicationTokens
        store.shield.applicationCategories = chosen.categoryTokens.isEmpty
            ? nil
            : .specific(chosen.categoryTokens)
    }
}
