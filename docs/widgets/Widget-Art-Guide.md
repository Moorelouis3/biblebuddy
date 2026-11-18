# Bible Buddy widget artwork

The PDF includes the color and typography tokens. All dimensions below are in points, with an origin at the top left of the widget. Use the six PNG illustrations as aspect-fit transparent images. Use the study’s production cover for My Study. The Abraham sample in this ZIP was straightened from the supplied Day Complete pop-up.

## Surface layers in draw order

1. Fill the widget bounds with the specified Start-to-End 132° CSS-linear gradient. In a coordinate system with y increasing downward, the gradient direction is (sin 132°, −cos 132°). Center the gradient on the widget rectangle, with endpoints half the projected widget width away from the center along this direction.
2. Overlay an elliptical sheen, center (0.30W, 52), radii (0.70W, 126). Use #FFFFFF at 40% in light mode or the Wave token at 14% in dark mode at the center. Fade to clear at the perimeter.
3. Fill the three paths below with the Wave token. W is the widget width. The height is 170. Use a 24 pt preview mask and the native WidgetKit mask in production.
4. Stroke a rounded rectangle with a 1.3 pt stroke, inset 0.65, radius 23.35. The stroke is #FFFFFF at 88% in light mode or Accent at 24% in dark mode.

| Path | Geometry | Light opacity | Dark opacity |
| --- | --- | --- | --- |
| Top wave | M 0 23 C .29W 24 .29W −8 .49W 1 S .83W 50 W 25 V 0 H 0 Z | 48% | 40% |
| Bottom wave | M 0 161 C .24W 139 .39W 179 .62W 155 S .85W 126 W 133 V 170 H 0 Z | 62% | 53% |
| Bottom ridge | M 0 168 C .30W 158 .45W 180 .70W 159 S .92W 146 W 152 V 170 H 0 Z | 85% | 85% |

## Clouds and rays

The cloud is a solid path. The light fill is #FFFFFF at 78%, and the dark fill is the Wave token at 52%.

```
M 4 16 C −2 16 −2 11 1 9 C 3 7 6 7 8 8 C 9 3 13 1 17 2
C 22 1 26 4 27 8 C 32 6 37 10 36 13 C 35 15 34 16 31 16 Z
```

| Widget | Cloud placements (x, y, scale) |
| --- | --- |
| Verse small short | (117, 108, 1.09), (96, 124, 0.63) |
| Verse small long | None |
| Verse medium | (278, 33, 1.38), (311, 119, 1.23) |
| Streak small | (115, 106, 1.02) |
| My Study active | None |
| My Study empty | (W − 52, 113, 1.18) |
| Bible Lock small | (123, 105, 1.03) |

For My Study medium active, the small gold rays are at (333, 37) with scale 0.9. Draw path `M 0 9 L 2 4 M 5 12 L 10 8 M 8 16 L 14 15` using #FFD252, stroke width 2.4 pt and round caps.

Use native SwiftUI text and SF Symbols for accessory widgets. Apply the system’s monochrome treatment on the Lock Screen.
