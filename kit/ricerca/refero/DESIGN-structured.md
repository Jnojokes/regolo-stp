# Structured — Style Reference
> Renaissance gallery on putty paper

**Theme:** mixed

Structured treats finance as a gallery exhibition: a warm putty-beige canvas, stark black accents, and classical oil-painting imagery that reframes Bitcoin yield as high art. Typography is the protagonist — a custom serif at display sizes up to 374px carries the brand voice with dramatic negative tracking, while a neutral grotesk handles utility. Sections alternate between light editorial spreads and pitch-black rooms, with no gradients, no shadows, and almost no color. Every surface is flat, every border is hairline, and the only accent is the warm cream/black contrast that runs through everything. The aesthetic borrows from museum wall labels and Renaissance folios: restrained, authoritative, slightly precious.

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Putty | `#c4c3b6` | `--color-putty` | Dominant page canvas — the warm gray-beige that fills hero and most light sections. The single most-used color in the system; sets the gallery-wall tone |
| Ink | `#000000` | `--color-ink` | Dark borders and separators for elevated surfaces and inverted UI. Do not promote it to the primary CTA color |
| Bone | `#e7e5e4` | `--color-bone` | Elevated card surfaces and secondary canvas in light sections. Sits one step above Putty for subtle layering without breaking the monochrome warmth |
| Chalk | `#ebebeb` | `--color-chalk` | Footers and lightest surface tier. The coolest neutral — used sparingly at section bases to signal a different page zone |
| Vellum | `#dfdcd5` | `--color-vellum` | Hairline borders on body and icon elements. A mid-tone warm gray that reads as a printed page edge, not a UI divider |
| Graphite | `#595855` | `--color-graphite` | Muted secondary text fills and subtle image backgrounds. The darkest warm gray — used where pure black would be too severe |
| Ash | `#808080` | `--color-ash` | Image placeholder backgrounds and mid-neutral surfaces. The only truly cool gray in the system, reserved for image containers |
| Paper | `#ffffff` | `--color-paper` | Text on dark sections, white icon strokes, and the rare pure-white element. Used only as reverse type or accent fill, never as a large surface |

## Tokens — Typography

### Davinci — Display and heading serif — the brand voice. Drives the 374px hero wordmark, 94px section titles, and 52px sub-headings. Weight 500 is used for emphasis; 400 for body serif moments. The extreme size range (16–374px) and tight negative tracking at large sizes make this the single most distinctive typographic choice — a wordmark that occupies half the viewport. · `--font-davinci`
- **Substitute:** Canela, Tiempos Headline, GT Super, or Playfair Display
- **Weights:** 400, 500
- **Sizes:** 16, 24, 34, 52, 94, 374px
- **Line height:** 0.84, 1.00, 1.10, 1.33, 1.50
- **Letter spacing:** -0.0090em, -0.0050em, -0.0010em
- **Role:** Display and heading serif — the brand voice. Drives the 374px hero wordmark, 94px section titles, and 52px sub-headings. Weight 500 is used for emphasis; 400 for body serif moments. The extreme size range (16–374px) and tight negative tracking at large sizes make this the single most distinctive typographic choice — a wordmark that occupies half the viewport.

### Helvetica Now — Utility grotesk for body copy, nav labels, button text, stats (TVL, APY), and caption micro-text. Stays at 9–26px — never takes display duty. Weight 500 is reserved for labels and small data callouts. · `--font-helvetica-now`
- **Substitute:** Inter, Neue Haas Grotesk, Söhne, or Helvetica Neue
- **Weights:** 400, 500
- **Sizes:** 9, 12, 15, 16, 22, 24, 26, 43px
- **Line height:** 1.25, 1.50
- **Role:** Utility grotesk for body copy, nav labels, button text, stats (TVL, APY), and caption micro-text. Stays at 9–26px — never takes display duty. Weight 500 is reserved for labels and small data callouts.

### Type Scale

| Role | Size | Line Height | Letter Spacing | Token |
|------|------|-------------|----------------|-------|
| body-sm | 15px | 1.5 | — | `--text-body-sm` |
| subheading | 22px | 1.33 | -0.11px | `--text-subheading` |
| heading-sm | 26px | 1.33 | -0.13px | `--text-heading-sm` |
| heading | 43px | 1.1 | -0.215px | `--text-heading` |
| heading-lg | 52px | 1 | -0.47px | `--text-heading-lg` |
| display | 374px | 0.84 | -3.37px | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** compact

### Spacing Scale

| Name | Value | Token |
|------|-------|-------|
| 4 | 4px | `--spacing-4` |
| 16 | 16px | `--spacing-16` |
| 20 | 20px | `--spacing-20` |
| 28 | 28px | `--spacing-28` |
| 32 | 32px | `--spacing-32` |
| 36 | 36px | `--spacing-36` |
| 40 | 40px | `--spacing-40` |
| 52 | 52px | `--spacing-52` |
| 60 | 60px | `--spacing-60` |
| 96 | 96px | `--spacing-96` |
| 168 | 168px | `--spacing-168` |

### Border Radius

| Element | Value |
|---------|-------|
| cards | 9px |
| links | 2px |
| buttons | 28.8px |

### Layout

- **Section gap:** 80px
- **Card padding:** 24px
- **Element gap:** 6px

## Components

### Pill Action Button
**Role:** Primary CTA — filled black pill with white text

Background #000000, text #ffffff, font Helvetica Now 12px weight 400, padding 9px 17px, border-radius 28.8px (near-full pill), no border, no shadow. Tight horizontal padding creates a compact capsule. Single accent button per viewport.

### Ghost Text Link
**Role:** Navigation and inline links

Text only, no background, color #000000, font Helvetica Now 12–16px weight 400, underline on hover only. Sits in the top-right header and inline in body copy. No border or background in default state.

### Circular Feature Vignette
**Role:** Feature card — circular image with caption

Circular crop of a classical painting (no border, no shadow), diameter ~200px. Davinci serif caption (22–24px) above, hexagonal nav indicator below. Spaced in a 3-column grid on dark background.

### Notched Product Card
**Role:** Floating product showcase with geometric corners

Dark card (~400px square) with notched/hexagonal corner cuts (not standard border-radius — corner geometry), #000000 background, #ffffff micro-label ('SCROLL' at 9px Helvetica Now) in the lower-left. Floats centered over imagery. 9px radius on the primary edges before the notches.

### Hero Wordmark
**Role:** Brand display — the defining visual element

Davinci serif at 374px weight 500, color #000000, letter-spacing -3.37px, line-height 0.84. Extends beyond the visible viewport width — intentionally cropped at the edges. This is the signature component; the brand IS this wordmark at this scale.

### Stat Pair
**Role:** Inline data display (TVL, APY)

Two values side by side, Helvetica Now 16px weight 500, separated by spacing. Label-value pairs in uppercase tracking, e.g. 'TVL: 85 BTC'. Color #000000 on light sections.

### Hexagonal Nav Indicator
**Role:** Pagination or section indicator dots

Small hexagonal outline shapes (~12px), stroke #000000 on light sections or #ffffff on dark sections, fill transparent. Used in groups of 3 below circular features. The hexagon is a secondary brand shape — distinct from the pill button and circular image crops.

### Logo Mark
**Role:** Brand identity — top-left header mark

A circled 'S' monogram, ~32px diameter, thin black stroke on transparent or light fill. Minimal, monoline, no decoration. The only graphic mark on the page.

### Section Header
**Role:** Display heading for content sections

Davinci serif 94px weight 500, color #000000 on light or #ffffff on dark, letter-spacing -0.85px, line-height 0.84, centered alignment. Used for section titles like 'MAX BTC EXPLAINED'. Often paired with small uppercase section labels at 12px in opposite corners.

### Classical Painting Panel
**Role:** Full-bleed atmospheric imagery

Renaissance/Baroque oil painting reproduction, edge-to-edge with no border or rounded corners, no overlay. The image fills the entire section viewport. Functions as background atmosphere, not as a content asset.

## Do's and Don'ts

### Do
- Use Davinci serif at 52px+ for all section headings and 94px+ for primary display titles — the serif is the brand voice
- Set the hero wordmark to exactly 374px in Davinci weight 500 with -3.37px letter-spacing so it crops at the viewport edges
- Alternate between Putty (#c4c3b6) light sections and Ink (#000000) dark sections — no gradients between them, just hard cuts
- Use the 28.8px pill radius for all filled action buttons and keep padding to 9px 17px for a compact capsule
- Apply circular crops to all feature imagery — the circle is the system's primary image shape after the full-bleed rectangle
- Set all body and utility text in Helvetica Now at 9–16px; the grotesk never exceeds 43px
- Use hexagonal shapes for pagination and decorative indicators — a secondary geometry that complements the circular vignettes and pill buttons

### Don't
- Don't introduce any saturated color — the palette is warm grays and