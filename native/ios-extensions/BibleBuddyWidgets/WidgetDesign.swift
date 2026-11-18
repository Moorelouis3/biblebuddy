import WidgetKit
import SwiftUI
import UIKit

/**
 The widget design system, built to Louis's approved designs (2026-11-18,
 docs/widgets/WIDGET_DESIGN_SPEC.md and widget-preview.png).

 Every home-screen widget is drawn on a DESIGN CANVAS that is 170 pt tall and
 as wide as the widget family (170 small, 364 medium on the 430 pt reference
 phone). All positions in the spec are points from the top left of that
 canvas, so they are written here exactly as the spec gives them, and the
 canvas is scaled to the real widget's height on any other phone.

 The card surface, in draw order (Widget-Art-Guide.md):
   1. a 132-degree CSS-style linear gradient, Start to End;
   2. an elliptical sheen at (0.30W, 52), radii (0.70W, 126);
   3. three wave paths in the Wave colour;
   4. a 1.3 pt edge.
 Plus optional clouds and gold rays.
 */

// MARK: - Colour

func hexColor(_ value: UInt32) -> Color {
    Color(
        red: Double((value >> 16) & 0xFF) / 255,
        green: Double((value >> 8) & 0xFF) / 255,
        blue: Double(value & 0xFF) / 255
    )
}

struct Palette {
    let start: Color
    let end: Color
    let primary: Color
    let secondary: Color
    let accent: Color
    let wave: Color

    init(_ start: UInt32, _ end: UInt32, _ primary: UInt32, _ secondary: UInt32, _ accent: UInt32, _ wave: UInt32) {
        self.start = hexColor(start)
        self.end = hexColor(end)
        self.primary = hexColor(primary)
        self.secondary = hexColor(secondary)
        self.accent = hexColor(accent)
        self.wave = hexColor(wave)
    }
}

/// The colour tokens from the spec, one pair (light, dark) per widget or state.
enum Palettes {
    static func verse(_ dark: Bool) -> Palette {
        dark ? Palette(0x3B235D, 0x231936, 0xFFF6FF, 0xDFCCF7, 0xE7BBFF, 0x6A419B)
             : Palette(0xFAF5FF, 0xEDDCFF, 0x151532, 0x4C4067, 0x6515B4, 0xD7B9FA)
    }
    static func streak(_ dark: Bool) -> Palette {
        dark ? Palette(0x4E2B4F, 0x342440, 0xFFEFDB, 0xF8D4BC, 0xFFD394, 0x8C4C50)
             : Palette(0xFFF8EB, 0xFFE0BE, 0x321A44, 0x67434D, 0x8C3F0E, 0xFFC485)
    }
    static func study(_ dark: Bool) -> Palette {
        dark ? Palette(0x372050, 0x281B45, 0xFFF4FF, 0xE3CEF8, 0xE7B9FF, 0x6C47A0)
             : Palette(0xFDF7FF, 0xE9D8FB, 0x171431, 0x4E3C66, 0x6515B4, 0xCFAFF0)
    }
    static func locked(_ dark: Bool) -> Palette {
        dark ? Palette(0x19365F, 0x192447, 0xF3F8FF, 0xC7DFFA, 0xA9D4FF, 0x35669C)
             : Palette(0xF0FAFF, 0xD2EBFF, 0x111938, 0x345376, 0x164AB2, 0xA4D7FF)
    }
    static func unlocked(_ dark: Bool) -> Palette {
        dark ? Palette(0x16415D, 0x182857, 0xF2FBFF, 0xCCEAF3, 0xB0F5F1, 0x3E7F9F)
             : Palette(0xEEFBFF, 0xD2F5F2, 0x11223E, 0x304E68, 0x1453CB, 0x9FDFE6)
    }
    static func setup(_ dark: Bool) -> Palette {
        dark ? Palette(0x3D265B, 0x261B44, 0xFFF5FF, 0xE7D1F8, 0xE6BCFF, 0x6D4C9E)
             : Palette(0xF8F0FF, 0xE9D8FF, 0x191536, 0x4B3F67, 0x661DB3, 0xD4B5FF)
    }
}

// MARK: - The design canvas

let designHeight: CGFloat = 170

/// Lays content out at 170 pt tall and scales it to the real widget.
struct DesignCanvas<Content: View>: View {
    let content: (CGFloat) -> Content

    init(@ViewBuilder content: @escaping (CGFloat) -> Content) {
        self.content = content
    }

    var body: some View {
        GeometryReader { geo in
            let scale = max(geo.size.height, 1) / designHeight
            let width = geo.size.width / scale
            content(width)
                .frame(width: width, height: designHeight, alignment: .topLeading)
                .scaleEffect(scale, anchor: .topLeading)
        }
    }
}

/// Places a view at (x, y) on the canvas, measured from the top left.
extension View {
    func at(_ x: CGFloat, _ y: CGFloat) -> some View {
        self.offset(x: x, y: y)
    }
}

// MARK: - Surface shapes

struct WaveShape: Shape {
    enum Kind { case top, bottom, ridge }
    let kind: Kind

    func path(in rect: CGRect) -> Path {
        let w = rect.width
        var p = Path()
        switch kind {
        case .top:
            // M 0 23 C .29W 24 .29W -8 .49W 1 S .83W 50 W 25 V 0 H 0 Z
            p.move(to: CGPoint(x: 0, y: 23))
            p.addCurve(to: CGPoint(x: 0.49 * w, y: 1), control1: CGPoint(x: 0.29 * w, y: 24), control2: CGPoint(x: 0.29 * w, y: -8))
            p.addCurve(to: CGPoint(x: w, y: 25), control1: CGPoint(x: 0.69 * w, y: 10), control2: CGPoint(x: 0.83 * w, y: 50))
            p.addLine(to: CGPoint(x: w, y: 0))
            p.addLine(to: CGPoint(x: 0, y: 0))
        case .bottom:
            // M 0 161 C .24W 139 .39W 179 .62W 155 S .85W 126 W 133 V 170 H 0 Z
            p.move(to: CGPoint(x: 0, y: 161))
            p.addCurve(to: CGPoint(x: 0.62 * w, y: 155), control1: CGPoint(x: 0.24 * w, y: 139), control2: CGPoint(x: 0.39 * w, y: 179))
            p.addCurve(to: CGPoint(x: w, y: 133), control1: CGPoint(x: 0.85 * w, y: 131), control2: CGPoint(x: 0.85 * w, y: 126))
            p.addLine(to: CGPoint(x: w, y: 170))
            p.addLine(to: CGPoint(x: 0, y: 170))
        case .ridge:
            // M 0 168 C .30W 158 .45W 180 .70W 159 S .92W 146 W 152 V 170 H 0 Z
            p.move(to: CGPoint(x: 0, y: 168))
            p.addCurve(to: CGPoint(x: 0.70 * w, y: 159), control1: CGPoint(x: 0.30 * w, y: 158), control2: CGPoint(x: 0.45 * w, y: 180))
            p.addCurve(to: CGPoint(x: w, y: 152), control1: CGPoint(x: 0.95 * w, y: 138), control2: CGPoint(x: 0.92 * w, y: 146))
            p.addLine(to: CGPoint(x: w, y: 170))
            p.addLine(to: CGPoint(x: 0, y: 170))
        }
        p.closeSubpath()
        return p
    }
}

/// The cloud, in its own 38 x 17 point space.
struct CloudShape: Shape {
    func path(in rect: CGRect) -> Path {
        var p = Path()
        p.move(to: CGPoint(x: 4, y: 16))
        p.addCurve(to: CGPoint(x: 1, y: 9), control1: CGPoint(x: -2, y: 16), control2: CGPoint(x: -2, y: 11))
        p.addCurve(to: CGPoint(x: 8, y: 8), control1: CGPoint(x: 3, y: 7), control2: CGPoint(x: 6, y: 7))
        p.addCurve(to: CGPoint(x: 17, y: 2), control1: CGPoint(x: 9, y: 3), control2: CGPoint(x: 13, y: 1))
        p.addCurve(to: CGPoint(x: 27, y: 8), control1: CGPoint(x: 22, y: 1), control2: CGPoint(x: 26, y: 4))
        p.addCurve(to: CGPoint(x: 36, y: 13), control1: CGPoint(x: 32, y: 6), control2: CGPoint(x: 37, y: 10))
        p.addCurve(to: CGPoint(x: 31, y: 16), control1: CGPoint(x: 35, y: 15), control2: CGPoint(x: 34, y: 16))
        p.closeSubpath()
        return p
    }
}

/// The small gold rays beside an active study (medium only).
struct RaysShape: Shape {
    func path(in rect: CGRect) -> Path {
        var p = Path()
        p.move(to: CGPoint(x: 0, y: 9)); p.addLine(to: CGPoint(x: 2, y: 4))
        p.move(to: CGPoint(x: 5, y: 12)); p.addLine(to: CGPoint(x: 10, y: 8))
        p.move(to: CGPoint(x: 8, y: 16)); p.addLine(to: CGPoint(x: 14, y: 15))
        return p
    }
}

struct CloudPlacement {
    let x: CGFloat
    let y: CGFloat
    let scale: CGFloat
}

// MARK: - The card surface

struct CardSurface: View {
    let palette: Palette
    let dark: Bool
    var clouds: [CloudPlacement] = []
    var rays: CGPoint? = nil

    var body: some View {
        DesignCanvas { width in
            ZStack(alignment: .topLeading) {
                gradient(width)
                sheen(width)
                WaveShape(kind: .top).fill(palette.wave.opacity(dark ? 0.40 : 0.48))
                WaveShape(kind: .bottom).fill(palette.wave.opacity(dark ? 0.53 : 0.62))
                WaveShape(kind: .ridge).fill(palette.wave.opacity(0.85))
                ForEach(0..<clouds.count, id: \.self) { index in
                    cloud(clouds[index])
                }
                if let rays = rays {
                    RaysShape()
                        .stroke(hexColor(0xFFD252), style: StrokeStyle(lineWidth: 2.4, lineCap: .round))
                        .frame(width: 16, height: 18, alignment: .topLeading)
                        .scaleEffect(0.9, anchor: .topLeading)
                        .at(rays.x, rays.y)
                }
                RoundedRectangle(cornerRadius: 24, style: .continuous)
                    .strokeBorder(dark ? palette.accent.opacity(0.24) : Color.white.opacity(0.88), lineWidth: 1.3)
            }
        }
    }

    /// CSS 132deg: direction (sin, -cos), endpoints half the projected length
    /// from the centre.
    private func gradient(_ width: CGFloat) -> some View {
        let angle = 132.0 * Double.pi / 180
        let dx = CGFloat(sin(angle))
        let dy = CGFloat(-cos(angle))
        let half = (width * abs(dx) + designHeight * abs(dy)) / 2
        let start = UnitPoint(x: (width / 2 - half * dx) / width, y: (designHeight / 2 - half * dy) / designHeight)
        let end = UnitPoint(x: (width / 2 + half * dx) / width, y: (designHeight / 2 + half * dy) / designHeight)
        return LinearGradient(colors: [palette.start, palette.end], startPoint: start, endPoint: end)
            .frame(width: width, height: designHeight)
    }

    private func sheen(_ width: CGFloat) -> some View {
        let color = dark ? palette.wave.opacity(0.14) : Color.white.opacity(0.40)
        return EllipticalGradient(colors: [color, color.opacity(0)], center: .center, startRadiusFraction: 0, endRadiusFraction: 0.5)
            .frame(width: 1.4 * width, height: 252)
            .at(0.30 * width - 0.70 * width, 52 - 126)
    }

    private func cloud(_ placement: CloudPlacement) -> some View {
        CloudShape()
            .fill(dark ? palette.wave.opacity(0.52) : Color.white.opacity(0.78))
            .frame(width: 38, height: 17, alignment: .topLeading)
            .scaleEffect(placement.scale, anchor: .topLeading)
            .at(placement.x, placement.y)
    }
}

// MARK: - Shared pieces

/// "VERSE OF THE DAY", "STREAK", ... : SF Pro Heavy 8.4, +0.65, Accent on an
/// Accent tint, 18 high, top 12.
struct LabelPill: View {
    let text: String
    let palette: Palette
    let dark: Bool

    var body: some View {
        Text(text.uppercased())
            .font(.system(size: 8.4, weight: .heavy))
            .tracking(0.65)
            .foregroundColor(palette.accent)
            .lineLimit(1)
            .padding(.horizontal, 8)
            .frame(height: 18)
            .background(Capsule().fill(palette.accent.opacity(dark ? 0.18 : 0.13)))
    }
}

/// One of the illustrations shipped in the extension (Art/widget-*.png).
struct ArtImage: View {
    let name: String
    let width: CGFloat
    let height: CGFloat

    var body: some View {
        Group {
            if let image = UIImage(named: name) {
                Image(uiImage: image).resizable().aspectRatio(contentMode: .fit)
            } else {
                Color.clear
            }
        }
        .frame(width: width, height: height)
    }
}

/// Extra space between lines so a font's size / line height pair from the spec
/// comes out right. SwiftUI cannot tighten below the font's own line height.
func lineGap(size: CGFloat, lineHeight: CGFloat) -> CGFloat {
    max(0, lineHeight - size * 1.2)
}

extension View {
    /// iOS 17 wants the background declared this way; iOS 16 has no such API.
    @ViewBuilder
    func widgetBackground<Background: View>(@ViewBuilder _ background: () -> Background) -> some View {
        if #available(iOS 17.0, *) {
            self.containerBackground(for: .widget) { background() }
        } else {
            self.background(background())
        }
    }
}

extension WidgetConfiguration {
    /// The designs measure from the widget's own top left, so the system's
    /// iOS 17 content margins are turned off. iOS 16 has none to turn off.
    func designMargins() -> some WidgetConfiguration {
        if #available(iOS 17.0, *) {
            return self.contentMarginsDisabled()
        } else {
            return self
        }
    }
}
