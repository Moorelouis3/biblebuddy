// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "BibleBuddyBibleLock",
    platforms: [.iOS(.v16)],
    products: [
        .library(
            name: "BibleBuddyBibleLock",
            targets: ["BibleLock"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.0.0")
    ],
    targets: [
        .target(
            name: "BibleLock",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm")
            ],
            path: "ios/Sources/BibleLock")
    ]
)
