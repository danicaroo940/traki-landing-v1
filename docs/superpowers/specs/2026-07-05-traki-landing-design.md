# TRAKI Landing v1 — Design Spec

> 2026-07-05 · Astro + GSAP + Remotion · dark-only · i18n ES/EN
> Source of truth for visual style: `../traki_flutter/DESIGN.md` (TRAKI Design System v1.0)

## Goal

Marketing one-page landing for TRAKI (strength + nutrition app). Reproduce the app's
design language (dark, volt-green accent, condensed display type, glow) on web, with
scroll-driven GSAP animation and a pre-rendered Remotion hero video. Bilingual ES/EN.
Primary conversion = email waitlist.

## Decisions (locked)

| Topic | Decision |
|---|---|
| Base | Astro 7 (existing scaffold) |
| Animation (in-browser) | GSAP + ScrollTrigger, vanilla `<script>`, no runtime framework |
| Hero video | Remotion, **pre-rendered** to `.mp4`/`.webm` + poster, embedded as `<video>` |
| Remotion v1 content | Screenshots-based (real app PNGs inside animated phone), not rebuilt UI |
| Scope | Full one-page: nav, hero, 4 features, counters, waitlist, footer |
| i18n | Astro native routing `/es` (default) + `/en`; toggle switches route |
| CTA | Email **waitlist** via external service (Formspree/Buttondown) — keeps site static |
| Theme | Dark-only (per design system §11) |

## Design tokens (port from Flutter `DESIGN.md`)

Port to `src/styles/tokens.css` as CSS custom properties. Exact values from design system:

- **Volt accent**: `--accent: #39FF5C` (volt-500), hover `#54FF78`, pressed `#1FE43F`, on-accent `#07120A`.
- **Ink scale**: ink-950 `#050506` … ink-050 `#F5F6F7`. Aliases: `--surface-base #0A0A0B`,
  `--surface-raised #101012`, `--surface-higher #16171A`, `--surface-input #1C1E22`,
  `--border-subtle #24272C`, `--border-strong #2E3238`, `--text-primary #E8EAEC`,
  `--text-secondary #9AA0A6`, `--text-muted #6B7177`.
- **Semantics**: warning `#FFB020`, danger `#FF3B3B`, info `#00E5FF`.
- **Dataviz** (macros only): protein `#FF4D6D`, carbs `#FFB020`, fat `#39FF5C`, track `#1C1E22`.
- **Fonts**: `--font-display: 'Barlow Condensed'` (700/800/900, uppercase, ls -0.02em),
  `--font-body: 'Inter'` (400–700), `--font-mono: 'JetBrains Mono'` (tabular nums).
  Self-host via `@fontsource`.
- **Spacing**: 4px base, `--s-1`=4 … `--s-12`=96.
- **Radii**: sm 4, md 8, lg 12, xl 16, 2xl 24, pill 999.
- **Glow**: `--glow-volt: 0 0 0 1px rgba(57,255,92,.35), 0 0 24px rgba(57,255,92,.25)`;
  strong variant per §6.
- **Motion**: `--ease-out: cubic-bezier(0.16,1,0.3,1)`; durations fast 120 / med 220 / slow 400 ms.

Type scale uses web `clamp()` (design system authorizes it for web; §3):
display-xl `clamp(48px,8vw,88px)`, display-lg `clamp(36px,6vw,64px)`,
display-md `clamp(28px,4.5vw,44px)`. Labels uppercase, ls 0.18em, `--text-muted`.

## Color/type usage rules (from design system, enforce)

1. One green only — `--accent` for CTAs, live values, progress, PR. Never full-bg, never body text.
2. Extreme contrast: near-black bg + near-white text. Greys build hierarchy.
3. Semantics only for states. Dataviz hues ONLY inside macro charts.
4. Glow volt only on max-action elements (CTA, accent card, focus).
5. Display always uppercase. Numbers always JetBrains Mono tabular.

## File structure

```
astro.config.mjs              # + i18n config (defaultLocale 'es', locales ['es','en'])
src/
  layouts/Base.astro          # <head>, fonts, tokens/global css, lang attr, meta/OG
  styles/{tokens,global}.css
  i18n/{es.json,en.json,utils.ts}   # dictionary + t(lang,key) helper
  components/
    Nav.astro                 # wordmark, lang toggle, "Únete" CTA
    Hero.astro                # headline, subtitle, <video>, CTA
    PhoneMock.astro           # reusable phone frame w/ volt glow (feature screenshots)
    Feature.astro             # eyebrow, title, body, phone; alternating side prop
    Counters.astro            # count-up stat strip
    Waitlist.astro            # email form (Formspree action), card-accent
    Footer.astro              # wordmark, tagline, privacy link, lang toggle
  scripts/animations.ts       # GSAP + ScrollTrigger init, reduced-motion guard
  pages/
    index.astro               # redirect -> /es
    es/index.astro            # composes components w/ lang='es'
    en/index.astro            # composes components w/ lang='en'
public/
  videos/{hero.mp4,hero.webm,hero-poster.jpg}
  screens/screenshot_1..4.png # copied from ../traki_flutter/store/screenshots
remotion/                     # isolated React project (own package.json, not in Astro bundle)
  package.json
  src/{Root,HeroVideo,PhoneScene}.tsx
  # render script outputs into ../public/videos/
```

## Sections

1. **Nav** — sticky, transparent→blur on scroll. `TRAKI.` wordmark (final dot in volt).
   Lang toggle ES/EN (swaps route). Ghost/pill CTA "Únete" scrolls to waitlist.
2. **Hero** — `display-xl` headline `NO SHORTCUTS. JUST REPS.` (EN) / `SIN ATAJOS. SOLO REPS.` (ES),
   subtitle body. Remotion `<video autoplay muted loop playsinline poster>` of phone cycling the
   4 screens with volt glow. Primary CTA → waitlist. GSAP: headline char stagger in, phone rise +
   glow pulse, subtitle/CTA fade-up.
3. **Features** ×4 (alternating image side), each ScrollTrigger reveal:
   - Analizar comida IA — screenshot_1 — "escanea tu comida"
   - Metas / macros diarios — screenshot_2 — "controla tus macros"
   - Fuerza / programa RM series — screenshot_3 — "entrena fuerza"
   - Asistente Coach IA — screenshot_4 — "tu coach IA"
   Each: `label` eyebrow, `display-md` title with one volt keyword, body copy, PhoneMock.
   Copy sourced from existing screenshot marketing lines (ES) + EN translations.
4. **Counters** — stat strip, JetBrains Mono volt numbers, GSAP count-up when scrolled into view
   (e.g. macros tracked, PRs, reps). Placeholder metrics, easily edited.
5. **Waitlist** — full-width accent section, `card-accent` (volt border + glow). Email input
   (`--surface-input`, focus glow) + submit button (primary volt). Posts to Formspree endpoint
   (env/config'd form ID). Success/error inline states. Honeypot field for spam.
6. **Footer** — wordmark, tagline "No shortcuts. Just reps.", privacy link (reuse
   `../traki_flutter/privacy_policy.html` content or link), lang toggle, year.

## Motion (GSAP)

- Load gsap + ScrollTrigger. Animate only `transform`/`opacity` (design §7).
- Global easing = `--ease-out` cubic-bezier(0.16,1,0.3,1).
- Effects: hero char stagger; per-section fade/slide-up reveals; phone parallax on scroll;
  count-up numbers; subtle glow pulse on primary CTAs.
- **Reduced motion**: if `prefers-reduced-motion: reduce`, skip all GSAP, render final state
  (elements visible, no transforms). Guard at top of `animations.ts`.

## Remotion hero video

- Isolated project in `remotion/` (own deps; React stays out of Astro runtime bundle).
- Composition 1080×1920, ~8–12s loop.
- `PhoneScene`: phone frame with volt glow border (matches store screenshots). The 4 screenshot
  PNGs cross-fade / slide in sequence inside the frame. Light micro-motion: floating macro chips,
  ring fill, number tick — using Remotion `interpolate`/`spring`.
- Render outputs `hero.mp4` + `hero.webm` + `hero-poster.jpg` into `public/videos/`.
- Documented `npm run render:hero` script in `remotion/package.json`.
- v1 = screenshots-based (locked). Full UI rebuild in Remotion = future enhancement.

## i18n

- Astro native i18n in `astro.config.mjs`: `defaultLocale: 'es'`, `locales: ['es','en']`,
  `routing: { prefixDefaultLocale: true }` → both under `/es` and `/en`; root `/` redirects to `/es`.
- Dictionary `src/i18n/{es,en}.json`, `t(lang, key)` helper in `utils.ts`.
- Components receive `lang` prop, call `t`. Lang toggle links to the mirrored route.
- `<html lang>`, hreflang alternate tags, per-locale OG meta.

## Waitlist backend

- External service (Formspree free tier or Buttondown) → site stays fully static, deployable to
  any static host (Netlify/Vercel/Cloudflare Pages) with no SSR adapter.
- Form ID via `PUBLIC_WAITLIST_FORM_ID` env. Client POST with fetch; inline success/error.
- Honeypot + basic email validation client-side.
- Swap-in path documented if owner later wants own backend (Astro API route + adapter).

## Accessibility (design §12)

- Hit targets ≥ 44px. Focus visible = volt glow. Text contrast ≥ 7:1.
- `prefers-reduced-motion` honored. Icons w/ aria-labels. State never color-only.
- Video: muted autoplay + `playsinline`; poster fallback; `aria-hidden` decorative.

## Out of scope (v1)

- Full UI rebuild inside Remotion (screenshots-based only).
- Own waitlist backend / DB (external service).
- Blog, pricing, auth, dashboards.
- Light mode (design system is dark-only).
```
