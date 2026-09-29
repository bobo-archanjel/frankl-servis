---
name: Frankl Servis
description: A page from your car's workshop manual, written by an independent garage in Nové Zámky.
colors:
  cobalt-spot: "#1f45d6"
  cobalt-spot-deep: "#1737b4"
  on-cobalt: "#f4f6ff"
  manual-paper: "#edefec"
  manual-paper-shade: "#e2e5e1"
  graphite-ink: "#15181b"
  graphite-ink-soft: "#4b5158"
  hairline: "#c3c8c4"
  plate-black: "#0d1013"
  on-plate: "#eef0ec"
typography:
  display:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(4rem, 12vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 62"
  headline:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.4vw, 4.75rem)"
    fontWeight: 800
    lineHeight: 0.92
    fontVariation: "'wdth' 62"
  title:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 2.4vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 0.95
    fontVariation: "'wdth' 62"
  body:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo Variable, Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 650
    letterSpacing: "0.06em"
    fontVariation: "'wdth' 87.5"
rounded:
  none: "0px"
  marker: "50%"
spacing:
  unit: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt-spot}"
    textColor: "{colors.on-cobalt}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.cobalt-spot-deep}"
  button-line:
    backgroundColor: "transparent"
    textColor: "{colors.graphite-ink}"
    rounded: "{rounded.none}"
    padding: "0 22px"
    height: "52px"
  button-line-hover:
    backgroundColor: "{colors.graphite-ink}"
    textColor: "{colors.manual-paper}"
  callout-marker:
    backgroundColor: "{colors.manual-paper}"
    textColor: "{colors.cobalt-spot}"
    rounded: "{rounded.marker}"
    size: "clamp(28px, 3vw, 40px)"
---

# Design System: Frankl Servis

## Overview

**Creative North Star: "The Workshop Manual"**

The site reads like a chapter from a car repair manual: photographic plates, exploded line drawings keyed by numbered callouts, and spec cells ruled in hairlines. Paper, graphite ink and one cobalt spot ink, printed flat. Imagery carries the atmosphere; the page itself stays quiet, precise and square.

Depth comes from layers, not shadows: a film plate at the back, a line drawing on a middle plane, reading text in front. The rear layers drift on scroll; the reading plane holds still.

**Key Characteristics:**
- Cool paper ground with graphite ink; one cobalt spot ink reserved for actions and callouts.
- Heavy condensed caps for every heading; plain Archivo text for reading.
- Square corners everywhere; the only circles are callout markers and the brand mark, as in manual notation.
- Hairline rules organize content; no cards, no shadows.
- Dark mode is the same manual printed in negative (graphite paper, light ink, lighter cobalt).

## Colors

Restrained: two neutrals in ink and paper, one saturated spot color.

### Primary
- **Cobalt Spot Ink** (`cobalt-spot`): primary buttons, callout leader lines, dots and markers, links, focus rings, text selection, the brand mark. Dark mode lifts it to #7c95ff for contrast.

### Neutral
- **Manual Paper** (`manual-paper`): page ground. Cool grey-white, never cream.
- **Manual Paper Shade** (`manual-paper-shade`): footer and empty map ground.
- **Graphite Ink** (`graphite-ink`): headings, body text, the line drawing on paper, the heavy top rule of every data group.
- **Soft Graphite** (`graphite-ink-soft`): secondary copy, labels, captions (7:1 on paper).
- **Hairline** (`hairline`): 1px dividers between items and cells.
- **Plate Black** / **On Plate** (`plate-black`, `on-plate`): the dark photographic plate and the text and line art laid over it.

### Named Rules
**The Spot Ink Rule.** Cobalt marks something you can act on or a callout you should read. Scores, numerals and decoration stay in graphite.

**The Cool Paper Rule.** The ground is cool grey-white (#edefec). Warm cream is a different world.

## Typography

**Display Font:** Archivo Variable, condensed axis (wdth 62), self-hosted
**Body Font:** Archivo Variable, normal width (wdth 100)
**Label Font:** Archivo Variable, semi-condensed (wdth 87.5)

**Character:** One variable family used across its width axis, like the headings, text and table labels of one technical publication.

### Hierarchy
- **Display** (800, clamp(4rem, 12vw, 6rem), 0.86, uppercase, wdth 62): the brand name on the hero plate only.
- **Headline** (800, clamp(2.5rem, 5.4vw, 4.75rem), 0.92, uppercase, wdth 62, balanced): section headings.
- **Title** (800, clamp(1.75rem, 2.4vw, 2.25rem), 0.95, uppercase, wdth 62): scope-of-work items, cell values such as closing time.
- **Body** (400, 1.0625rem, 1.6): reading text, max 60ch; lead paragraphs step up to clamp(1.1875rem, 1.6vw, 1.375rem).
- **Label** (650, 0.8125rem, 0.06em tracking, uppercase, wdth 87.5): nav links, data-cell labels, buttons (0.9375rem, 0.04em).

### Named Rules
**The Tabular Rule.** Phone numbers, times, ratings and callout numbers use tabular figures.

**The 6rem Ceiling.** Display type never exceeds 6rem; scale comes from compression and weight, not size.

## Layout

A 12-column grid inside `min(100% - 2 × gutter, 1320px)`, gutter clamp(16px, 3.4vw, 48px). Sections breathe with clamp(96px, 13vw, 176px) of vertical padding and are separated by a hairline. Compositions are asymmetric: the plate takes columns 1-5 and text 7-12; the score holds columns 1-4 (sticky) against quotes in 6-12; the exploded drawing is right-aligned under its heading and capped at 116svh wide so all callouts fit one viewport. Everything collapses to a single column below 900px. All spacing is a multiple of a 4px unit. The hero plate sits inside a thin paper frame (clamp(8px, 1.1vw, 16px)) and fills the viewport under a 64px sticky nav. On phones, a fixed call dock appears between the hero and the contact actions.

## Elevation & Depth

No shadows anywhere. Depth is parallax between layered planes, transform-only and scrubbed: the film plate lags the scroll (+14% yPercent), the line drawing runs ahead (-38%), the text stays fixed. The about plate and the photo inside it move in opposite directions (±7%). All of it is off under prefers-reduced-motion, where the video also pauses on its poster frame.

### Named Rules
**The Still Reading Plane Rule.** Only image layers move on scroll. Text never parallaxes.

## Shapes

Square (0px) for every container, button, cell and image. Circles appear only as callout markers, callout anchor dots, the brand mark and the round video toggle. Lines are 1px hairlines, with a 1px graphite rule opening each data group and 1.5px strokes for buttons, markers and leader lines.

## Components

### Buttons
- **Shape:** square (0px), 52px tall (44px compact in the nav), 1.5px border.
- **Primary:** cobalt ground, near-white label, semi-condensed 700 uppercase, Phosphor icon at 1.25em.
- **Line:** transparent with a graphite border; hover inverts to a graphite fill.
- **Glass (on the plate only):** a solid 55% plate-black scrim with a light border (no blur); hover inverts to on-plate.
- **Press:** translateY(1px). **Focus:** 2px cobalt outline, 3px offset.

### Navigation
Sticky 64px paper bar; the brand mark plus the condensed wordmark on the left, semi-condensed uppercase links with an underline that grows on hover, and a compact cobalt call button on the right. A hairline appears once the page scrolls. Links hide below 900px; below 380px the number collapses to the icon.

### Exploded Figure (signature)
A raster line drawing used as a CSS mask (inked in graphite on paper, on-plate at 20% over the hero film), with numbered callouts. Each callout is a cobalt anchor dot, a 1.5px leader line and a paper marker with a cobalt ring. On entry, the dots pop, lines draw out (scaleX) and numbers land in sequence. A legend lists the numbered parts; hovering a legend item fills its marker in cobalt and ghosts the other callouts to 25%.

### Data Cells
The fixed-cell contact grid: a graphite top rule, hairline cell borders, a semi-condensed uppercase label with a cobalt icon, and the value in body or title size. Values that are links (address, phone) underline in hairline color and darken on hover.

### Quote
Hairline-separated testimonials; the lead quote is larger (clamp(1.4375rem, 2.3vw, 2rem)). Slovak typographic quotes („ “), bold name, then the source in soft graphite.

## Do's and Don'ts

### Do:
- **Do** keep cobalt (#1f45d6) for actions and callouts only.
- **Do** set every heading in Archivo condensed 800 caps, capped at 6rem.
- **Do** separate content with 1px hairlines and a graphite rule at the top of each group.
- **Do** keep parallax on image layers and turn it off under reduced motion.
- **Do** make every phone number a `tel:` link and every address a Google Maps directions link.

### Don't:
- **Don't** add shadows, cards or rounded containers.
- **Don't** use cream or warm paper grounds.
- **Don't** put small uppercase kickers above headings.
- **Don't** move reading text on scroll.
- **Don't** present generated imagery as documentary photos of the real workshop; the footer notes it is illustrative.
