import Foundation
import Capacitor
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
    private let selection = SelectionStore()

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
        let chosen = selection.load()
        call.resolve([
            "supported": true,
            "authorized": authorized,
            // A count, never the identities. There is nothing here that could
            // tell anyone which apps these are.
            "chosen": chosen.applicationTokens.count + chosen.categoryTokens.count,
            "locked": store.shield.applications?.isEmpty == false
                || store.shield.applicationCategories != nil
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
                initial: self.selection.load(),
                onDone: { [weak self] chosen in
                    guard let self else { return }
                    self.selection.save(chosen)
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
        let chosen = selection.load()
        guard !chosen.applicationTokens.isEmpty || !chosen.categoryTokens.isEmpty else {
            call.reject("No apps have been chosen to lock yet.")
            return
        }
        store.shield.applications = chosen.applicationTokens.isEmpty ? nil : chosen.applicationTokens
        store.shield.applicationCategories = chosen.categoryTokens.isEmpty
            ? nil
            : .specific(chosen.categoryTokens)
        call.resolve(["locked": true])
    }

    @objc func clear(_ call: CAPPluginCall) {
        // Deliberately unconditional, and deliberately the simplest method
        // here. Whatever else has gone wrong, this always gives the phone
        // back.
        store.shield.applications = nil
        store.shield.applicationCategories = nil
        call.resolve(["locked": false])
    }
}

extension ManagedSettingsStore.Name {
    /// Our own store, so clearing the shield can never disturb another app's.
    static let bibleLock = Self("net.mybiblebuddy.app.biblelock")
}

/**
 The chosen apps, between launches.

 FamilyActivitySelection is Codable and its tokens are opaque: what is written
 here cannot be turned back into a list of apps by us or by anyone reading the
 file. It stays on the device and is never sent anywhere.
 */
@available(iOS 16.0, *)
private struct SelectionStore {
    private let key = "net.mybiblebuddy.app.biblelock.selection"

    func load() -> FamilyActivitySelection {
        guard let data = UserDefaults.standard.data(forKey: key),
              let decoded = try? JSONDecoder().decode(FamilyActivitySelection.self, from: data)
        else {
            return FamilyActivitySelection()
        }
        return decoded
    }

    func save(_ selection: FamilyActivitySelection) {
        guard let data = try? JSONEncoder().encode(selection) else { return }
        UserDefaults.standard.set(data, forKey: key)
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
