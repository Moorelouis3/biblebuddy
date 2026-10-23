import Foundation
import Capacitor
import DeviceActivity
import FamilyControls
import ManagedSettings
import SwiftUI

/**
 The Bible lock (Louis, 2026-10-14).

 The reader picks the apps that usually win their attention, and Bible Buddy
 shields them until that day's reading is done.

 This is the first part of Bible Buddy that is not the website in a shell, and
 it has to be: Apple's Screen Time frameworks have no web surface at all.

 Three rules this file keeps, because getting any of them wrong turns a Bible
 app into a one-star review:

 1. We never learn which apps were chosen. The selection comes back from
    Apple's own picker as opaque tokens, which is also why this adds nothing
    to the App Store privacy label - there is no usage data here to declare.
 2. Refusal is normal. Plenty of people will decline the permission prompt and
    the rest of the app must behave exactly as it did before.
 3. Unlocking is instant and always available. `clear` wipes the shield with no
    conditions attached; nothing in here can trap someone out of their phone.
 */
@objc(BibleLockPlugin)
public class BibleLockPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "BibleLockPlugin"
    public let jsName = "BibleLock"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "isSupported", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "status", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestAuthorization", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "chooseApps", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "lock", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "clear", returnType: CAPPluginReturnPromise)
    ]

    private let store = ManagedSettingsStore(named: .bibleLock)
    private let center = DeviceActivityCenter()

    // MARK: - Availability

    @objc func isSupported(_ call: CAPPluginCall) {
        // iOS 16 is where ManagedSettingsStore(named:) and the picker settled.
        // Below that the whole feature is simply absent rather than broken.
        if #available(iOS 16.0, *) {
            call.resolve(["supported": true])
        } else {
            call.resolve(["supported": false])
        }
    }

    @objc func status(_ call: CAPPluginCall) {
        guard #available(iOS 16.0, *) else {
            call.resolve(["supported": false, "authorized": false, "chosen": 0, "locked": false])
            return
        }
        let authorized = AuthorizationCenter.shared.authorizationStatus == .approved
        let chosen = BibleLockSharedSelection.load()
        let state = BibleLockSharedState.load()
        let iso = ISO8601DateFormatter()
        call.resolve([
            "supported": true,
            "authorized": authorized,
            // A count, never the identities. There is nothing here that could
            // tell anyone which apps these are.
            "chosen": chosen.applicationTokens.count + chosen.categoryTokens.count,
            "locked": store.shield.applications?.isEmpty == false
                || store.shield.applicationCategories != nil,
            // The period, from the device that owns the shield. The app used
            // to answer this from its own localStorage, which the extension
            // cannot write - so a shield applied at midnight looked, to the
            // app, like one applied whenever it last locked, and yesterday's
            // reading unlocked today's phone on first launch.
            "periodKey": BibleLockSharedState.periodKey(),
            "lockedAt": state.lockedAt.map { iso.string(from: $0) } as Any,
            "lockedPeriod": state.lockedPeriod as Any,
            "unlockedAt": state.unlockedAt.map { iso.string(from: $0) } as Any,
            "unlockedPeriod": state.unlockedPeriod as Any
        ])
    }

    // MARK: - Permission

    @objc func requestAuthorization(_ call: CAPPluginCall) {
        guard #available(iOS 16.0, *) else {
            call.reject("The Bible lock needs iOS 16 or later.")
            return
        }
        Task {
            do {
                // .individual, not .child: this person is locking their own
                // device. Anything else would be managing another adult's
                // phone, which Apple's terms forbid outright.
                try await AuthorizationCenter.shared.requestAuthorization(for: .individual)
                call.resolve(["authorized": true])
            } catch {
                // Declining is a choice, not a fault. The caller shows the
                // feature as off and everything else carries on.
                call.resolve(["authorized": false])
            }
        }
    }

    // MARK: - Choosing apps

    @objc func chooseApps(_ call: CAPPluginCall) {
        guard #available(iOS 16.0, *) else {
            call.reject("The Bible lock needs iOS 16 or later.")
            return
        }
        guard AuthorizationCenter.shared.authorizationStatus == .approved else {
            call.reject("Bible Buddy has not been allowed to manage Screen Time yet.")
            return
        }

        DispatchQueue.main.async { [weak self] in
            guard let self, let presenter = self.bridge?.viewController else {
                call.reject("Nothing on screen to present the picker from.")
                return
            }

            // Apple's own picker. We do not build this list and we never see
            // what comes back in readable form.
            let picker = ActivityPickerHost(
                initial: BibleLockSharedSelection.load(),
                onDone: { [weak self] chosen in
                    guard let self else { return }
                    BibleLockSharedSelection.save(chosen)
                    presenter.dismiss(animated: true) {
                        call.resolve([
                            "chosen": chosen.applicationTokens.count + chosen.categoryTokens.count
                        ])
                    }
                },
                onCancel: {
                    presenter.dismiss(animated: true) {
                        call.resolve(["cancelled": true])
                    }
                }
            )

            let host = UIHostingController(rootView: picker)
            presenter.present(host, animated: true)
        }
    }

    // MARK: - The lock itself

    @objc func lock(_ call: CAPPluginCall) {
        guard #available(iOS 16.0, *) else {
            call.reject("The Bible lock needs iOS 16 or later.")
            return
        }
        let chosen = BibleLockSharedSelection.load()
        guard !chosen.applicationTokens.isEmpty || !chosen.categoryTokens.isEmpty else {
            call.reject("No apps have been chosen to lock yet.")
            return
        }
        store.shield.applications = chosen.applicationTokens.isEmpty ? nil : chosen.applicationTokens
        store.shield.applicationCategories = chosen.categoryTokens.isEmpty
            ? nil
            : .specific(chosen.categoryTokens)
        // A person tapping Lock moves the boundary to now: what they read an
        // hour before locking does not buy the apps straight back.
        BibleLockSharedState.markLocked(force: true)
        scheduleDailyRelock()
        call.resolve(["locked": true])
    }

    @objc func clear(_ call: CAPPluginCall) {
        // Deliberately unconditional, and deliberately the simplest method
        // here. Whatever else has gone wrong, this always gives the phone
        // back.
        //
        // The daily schedule is deliberately NOT cancelled. Clearing means
        // "you have read today", not "stop locking" - the extension puts the
        // shield back when the day turns over, which is the entire point of
        // the feature. Turning it off for good is removing the apps in the
        // picker, which stops the extension finding anything to shield.
        store.shield.applications = nil
        store.shield.applicationCategories = nil
        // Which period this unlock belongs to, so reopening the app does not
        // put the lock straight back on a day that has already been earned.
        BibleLockSharedState.markUnlocked()
        call.resolve(["locked": false])
    }

    /**
     Ask iOS to wake the extension as each day begins.

     A single repeating window covering the whole day: its start is the moment
     the lock should come back. Scheduling is idempotent - starting an activity
     that is already running replaces it - so calling this on every lock is
     fine and keeps it alive if iOS ever drops it.
     */
    @available(iOS 16.0, *)
    private func scheduleDailyRelock() {
        let schedule = DeviceActivitySchedule(
            intervalStart: DateComponents(hour: 0, minute: 0),
            intervalEnd: DateComponents(hour: 23, minute: 59),
            repeats: true
        )
        do {
            try center.startMonitoring(.bibleLockDaily, during: schedule)
        } catch {
            // Without this the lock still works today, just not tomorrow. Not
            // worth failing the call someone is waiting on.
            print("[BibleLock] could not schedule the daily re-lock: (error.localizedDescription)")
        }
    }
}

/// A sheet around Apple's picker, with the Cancel and Done the picker does not
/// bring with it.
@available(iOS 16.0, *)
private struct ActivityPickerHost: View {
    @State private var selection: FamilyActivitySelection
    let onDone: (FamilyActivitySelection) -> Void
    let onCancel: () -> Void

    init(
        initial: FamilyActivitySelection,
        onDone: @escaping (FamilyActivitySelection) -> Void,
        onCancel: @escaping () -> Void
    ) {
        _selection = State(initialValue: initial)
        self.onDone = onDone
        self.onCancel = onCancel
    }

    var body: some View {
        NavigationView {
            FamilyActivityPicker(selection: $selection)
                .navigationTitle("Choose apps to lock")
                .navigationBarTitleDisplayMode(.inline)
                .toolbar {
                    ToolbarItem(placement: .cancellationAction) {
                        Button("Cancel", action: onCancel)
                    }
                    ToolbarItem(placement: .confirmationAction) {
                        Button("Done") { onDone(selection) }
                    }
                }
        }
    }
}
