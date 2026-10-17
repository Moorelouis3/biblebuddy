// swift-tools-version: 5.9
import PackageDescription

// The product name is not a choice. Capacitor derives it from the npm name
// in package.json - @biblebuddy/bible-lock becomes BiblebuddyBibleLock - and
// writes that into the generated CapApp-SPM/Package.swift. Spelling it
// BibleBuddyBibleLock here, with the capital B that reads better, meant Swift
// Package Manager could not find the product, resolution failed, and every
// build from 2026-10-15 onwards died at the archive with nothing more useful
// than "Failed to show build settings". Leave the lowercase b.
let package = Package(
    name: "BiblebuddyBibleLock",
    platforms: [.iOS(.v16)],
    products: [
        .library(
            name: "BiblebuddyBibleLock",
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
