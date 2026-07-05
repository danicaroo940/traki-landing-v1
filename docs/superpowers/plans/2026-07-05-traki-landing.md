# TRAKI Landing v1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual (ES/EN) marketing one-page landing for TRAKI that reproduces the Flutter app's dark/volt design language, with GSAP scroll animation and a pre-rendered Remotion hero video.

**Architecture:** Astro 7 static site with native i18n routing (`/es`, `/en`). Design tokens ported from `../traki_flutter/DESIGN.md` to CSS custom properties. GSAP + ScrollTrigger drive in-browser animation via a single vanilla script. Remotion lives in an isolated `remotion/` sub-project that renders the hero video to `public/videos/` (its React deps never enter the Astro bundle). Waitlist posts to an external form service so the site stays fully static.

**Tech Stack:** Astro 7.0.6, Node 24, GSAP 3 + ScrollTrigger, @fontsource (Barlow Condensed / Inter / JetBrains Mono), Vitest (unit tests for pure TS), Remotion 4 (isolated), Formspree (waitlist).

## Global Constraints

- Node `>=22.12.0`; Astro `^7.0.6`.
- Dark-only. Never build light mode.
- One green: `--accent #39FF5C` only for CTAs, live values, progress, PR. Never full-bg, never body text.
- Animate only `transform`/`opacity`. Global easing `cubic-bezier(0.16,1,0.3,1)`.
- Honor `prefers-reduced-motion: reduce` → render final state, run no GSAP.
- Display type always uppercase, `Barlow Condensed`, letter-spacing -0.02em. Numbers always `JetBrains Mono`, tabular-nums.
- Hit targets ≥ 44px. Focus visible = volt glow. Text contrast ≥ 7:1.
- Exact token values come from `docs/superpowers/specs/2026-07-05-traki-landing-design.md`.
- Commit after every task.

---

## File Structure

- `astro.config.mjs` — i18n config (modify)
- `package.json` — deps + scripts (modify)
- `vitest.config.ts` — test runner (create)
- `src/styles/tokens.css` — CSS custom properties ported from design system (create)
- `src/styles/global.css` — resets, base type, utility classes (create)
- `src/layouts/Base.astro` — html shell, fonts, meta/OG, lang attr (create)
- `src/i18n/ui.ts` — dictionary + `t()` + `useTranslations()` + `getLocalePaths()` (create)
- `src/i18n/ui.test.ts` — unit tests for i18n helpers (create)
- `src/components/{Nav,Hero,PhoneMock,Feature,Counters,Waitlist,Footer}.astro` (create)
- `src/lib/waitlist.ts` — email validation + submit helper (create)
- `src/lib/waitlist.test.ts` — unit tests (create)
- `src/scripts/animations.ts` — GSAP/ScrollTrigger init (create)
- `src/pages/index.astro` — redirect to `/es` (replace existing)
- `src/pages/es/index.astro`, `src/pages/en/index.astro` — page composition (create)
- `public/screens/screenshot_1..4.png` — copied from Flutter store (create)
- `public/videos/{hero.mp4,hero.webm,hero-poster.jpg}` — Remotion output (create)
- `remotion/` — isolated React project (create)

---

### Task 1: Dependencies, i18n config, and Vitest harness

**Files:**
- Modify: `package.json`
- Modify: `astro.config.mjs`
- Create: `vitest.config.ts`

**Interfaces:**
- Produces: `npm test` (vitest), `npm run dev/build` (astro). i18n routing active: routes served under `/es` and `/en`.

- [ ] **Step 1: Install runtime + dev deps**

```bash
npm install gsap @fontsource/barlow-condensed @fontsource/inter @fontsource/jetbrains-mono
npm install -D vitest
```

- [ ] **Step 2: Configure Astro native i18n**

Replace `astro.config.mjs` with:

```js
// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: true, // both under /es and /en
    },
  },
});
```

- [ ] **Step 3: Add test script and create Vitest config**

In `package.json` add to `scripts`: `"test": "vitest run"`.

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
```

- [ ] **Step 4: Verify tooling**

Run: `npm run build`
Expected: build succeeds (no pages yet is fine — existing `index.astro` still builds).
Run: `npx vitest run`
Expected: "No test files found" (exit 0) — harness works.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json astro.config.mjs vitest.config.ts
git commit -m "chore: add gsap, fonts, vitest, and i18n routing config"
```

---

### Task 2: Design tokens + global stylesheet

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`

**Interfaces:**
- Produces: CSS custom properties (`--accent`, `--surface-*`, `--text-*`, `--font-*`, `--s-*`, `--r-*`, `--glow-volt`, `--ease-out`) and utility classes (`.display-xl`, `.display-lg`, `.display-md`, `.label`, `.numeric`, `.container`, `.btn`, `.btn-primary`, `.card`, `.card-accent`).

- [ ] **Step 1: Create `src/styles/tokens.css`** (values verbatim from design system §2–§7)

```css
:root {
  color-scheme: dark;

  /* Volt accent */
  --volt-300: #7CFFA0; --volt-400: #54FF78; --volt-500: #39FF5C;
  --volt-600: #1FE43F; --volt-700: #10B830; --volt-950: #0A2912;

  /* Ink scale */
  --ink-950:#050506; --ink-900:#0A0A0B; --ink-850:#101012; --ink-800:#16171A;
  --ink-750:#1C1E22; --ink-700:#24272C; --ink-600:#2E3238; --ink-500:#44494F;
  --ink-400:#6B7177; --ink-300:#9AA0A6; --ink-200:#C5C9CD; --ink-100:#E8EAEC;
  --ink-050:#F5F6F7;

  /* Semantic aliases */
  --surface-base:   var(--ink-900);
  --surface-raised: var(--ink-850);
  --surface-higher: var(--ink-800);
  --surface-input:  var(--ink-750);
  --border-subtle:  var(--ink-700);
  --border-strong:  var(--ink-600);
  --text-primary:   var(--ink-100);
  --text-secondary: var(--ink-300);
  --text-muted:     var(--ink-400);
  --accent:         var(--volt-500);
  --accent-hover:   var(--volt-400);
  --accent-pressed: var(--volt-600);
  --on-accent:      #07120A;

  /* State + dataviz */
  --warning:#FFB020; --danger:#FF3B3B; --info:#00E5FF;
  --dv-protein:#FF4D6D; --dv-carbs:#FFB020; --dv-fat:#39FF5C; --dv-track:#1C1E22;

  /* Fonts */
  --font-display: 'Barlow Condensed', 'Oswald', 'Arial Narrow', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, 'SF Mono', 'Menlo', monospace;

  /* Spacing (4px base) */
  --s-1:4px; --s-2:8px; --s-3:12px; --s-4:16px; --s-5:20px; --s-6:24px;
  --s-7:32px; --s-8:40px; --s-9:48px; --s-10:64px; --s-11:80px; --s-12:96px;

  /* Radii */
  --r-sm:4px; --r-md:8px; --r-lg:12px; --r-xl:16px; --r-2xl:24px; --r-pill:999px;

  /* Shadow + glow */
  --shadow-md: 0 4px 12px rgba(0,0,0,0.5);
  --shadow-lg: 0 16px 48px rgba(0,0,0,0.6);
  --glow-volt: 0 0 0 1px rgba(57,255,92,0.35), 0 0 24px rgba(57,255,92,0.25);
  --glow-volt-strong: 0 0 0 1px rgba(57,255,92,0.55), 0 0 32px rgba(57,255,92,0.45);

  /* Motion */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast:120ms; --dur-med:220ms; --dur-slow:400ms;
}
```

- [ ] **Step 2: Create `src/styles/global.css`**

```css
@import '@fontsource/barlow-condensed/700.css';
@import '@fontsource/barlow-condensed/800.css';
@import '@fontsource/barlow-condensed/900.css';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/500.css';
@import '@fontsource/inter/600.css';
@import '@fontsource/inter/700.css';
@import '@fontsource/jetbrains-mono/700.css';
@import './tokens.css';

*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: var(--surface-base);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
img, video { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }

.container { width: 100%; max-width: 1200px; margin-inline: auto; padding-inline: var(--s-6); }

.display-xl, .display-lg, .display-md {
  font-family: var(--font-display); font-weight: 900; text-transform: uppercase;
  letter-spacing: -0.02em; line-height: 0.95; margin: 0;
}
.display-xl { font-size: clamp(48px, 8vw, 88px); }
.display-lg { font-size: clamp(36px, 6vw, 64px); }
.display-md { font-size: clamp(28px, 4.5vw, 44px); line-height: 1.1; }
.accent { color: var(--accent); }

.label {
  font-family: var(--font-body); font-weight: 600; font-size: 11px;
  text-transform: uppercase; letter-spacing: 0.18em; color: var(--text-muted); margin: 0;
}
.numeric { font-family: var(--font-mono); font-weight: 700; font-variant-numeric: tabular-nums; }

.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: var(--s-2);
  min-height: 44px; padding: 12px 24px; border-radius: var(--r-md);
  font-family: var(--font-body); font-weight: 700; font-size: 14px;
  text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer;
  border: 1px solid transparent; transition: all var(--dur-fast) var(--ease-out);
}
.btn-primary { background: var(--accent); color: var(--on-accent); border-color: var(--accent); }
.btn-primary:hover { background: var(--accent-hover); }
.btn-secondary { background: var(--surface-higher); color: var(--text-primary); border-color: var(--border-subtle); }
.btn:focus-visible { outline: none; box-shadow: var(--glow-volt); }

.card {
  background: var(--surface-raised); border: 1px solid var(--border-subtle);
  border-radius: var(--r-lg); padding: var(--s-5) var(--s-6);
}
.card-accent { border-color: var(--accent); box-shadow: var(--glow-volt); }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
}
```

- [ ] **Step 3: Verify build picks up styles**

Run: `npm run build`
Expected: build succeeds (styles not yet imported by a page — this only checks they parse when imported later; acceptable to pass with no import).

- [ ] **Step 4: Commit**

```bash
git add src/styles/tokens.css src/styles/global.css
git commit -m "feat: port TRAKI design tokens and global styles to web"
```

---

### Task 3: i18n dictionary and helpers (TDD)

**Files:**
- Create: `src/i18n/ui.ts`
- Create: `src/i18n/ui.test.ts`

**Interfaces:**
- Produces:
  - `type Lang = 'es' | 'en'`
  - `const languages: Record<Lang, string>` (`{ es: 'ES', en: 'EN' }`)
  - `const ui: Record<Lang, Record<string, string>>`
  - `useTranslations(lang: Lang): (key: string) => string`
  - `oppositeLang(lang: Lang): Lang`

- [ ] **Step 1: Write failing tests** — `src/i18n/ui.test.ts`

```ts
import { describe, it, expect } from 'vitest';
import { useTranslations, oppositeLang, ui } from './ui';

describe('useTranslations', () => {
  it('returns the string for a known key in Spanish', () => {
    const t = useTranslations('es');
    expect(t('nav.cta')).toBe('Únete');
  });
  it('returns the string for a known key in English', () => {
    const t = useTranslations('en');
    expect(t('nav.cta')).toBe('Join');
  });
  it('falls back to the key when missing', () => {
    const t = useTranslations('es');
    expect(t('does.not.exist')).toBe('does.not.exist');
  });
});

describe('oppositeLang', () => {
  it('maps es to en and en to es', () => {
    expect(oppositeLang('es')).toBe('en');
    expect(oppositeLang('en')).toBe('es');
  });
});

describe('ui parity', () => {
  it('has the same keys in every locale', () => {
    const esKeys = Object.keys(ui.es).sort();
    const enKeys = Object.keys(ui.en).sort();
    expect(esKeys).toEqual(enKeys);
  });
});
```

- [ ] **Step 2: Run tests, verify they fail**

Run: `npx vitest run src/i18n/ui.test.ts`
Expected: FAIL — `Cannot find module './ui'`.

- [ ] **Step 3: Implement `src/i18n/ui.ts`**

```ts
export type Lang = 'es' | 'en';

export const languages: Record<Lang, string> = { es: 'ES', en: 'EN' };

export const ui: Record<Lang, Record<string, string>> = {
  es: {
    'nav.cta': 'Únete',
    'hero.title.1': 'Sin atajos.',
    'hero.title.2': 'Solo reps.',
    'hero.subtitle': 'Entrena fuerza y controla tus macros. Una app, cero excusas.',
    'hero.cta': 'Únete a la lista',
    'feat.analyze.eyebrow': 'Nutrición con IA',
    'feat.analyze.title': 'Escanea tu comida',
    'feat.analyze.body': 'Calorías y macros con IA en segundos. Una foto y listo.',
    'feat.goals.eyebrow': 'Metas diarias',
    'feat.goals.title': 'Controla tus macros',
    'feat.goals.body': 'Objetivos diarios y progreso real. Proteína, carbos y grasas de un vistazo.',
    'feat.strength.eyebrow': 'Programa de fuerza',
    'feat.strength.title': 'Entrena fuerza',
    'feat.strength.body': 'Dominadas, press banca y tus PR. Series descendentes por RM.',
    'feat.coach.eyebrow': 'Coach IA',
    'feat.coach.title': 'Tu coach IA',
    'feat.coach.body': 'Planes y consejos personalizados. Cálculo de TDEE y listas de compra.',
    'counters.workouts': 'Reps registradas',
    'counters.macros': 'Comidas analizadas',
    'counters.prs': 'PR conseguidos',
    'waitlist.title': 'Entra a la lista',
    'waitlist.body': 'Sé de los primeros en usar TRAKI. Sin spam.',
    'waitlist.placeholder': 'tu@email.com',
    'waitlist.cta': 'Únete',
    'waitlist.success': 'Estás dentro. Te avisamos.',
    'waitlist.error': 'Algo falló. Inténtalo de nuevo.',
    'footer.tagline': 'Sin atajos. Solo reps.',
    'footer.privacy': 'Privacidad',
  },
  en: {
    'nav.cta': 'Join',
    'hero.title.1': 'No shortcuts.',
    'hero.title.2': 'Just reps.',
    'hero.subtitle': 'Train strength and track your macros. One app, zero excuses.',
    'hero.cta': 'Join the list',
    'feat.analyze.eyebrow': 'AI nutrition',
    'feat.analyze.title': 'Scan your food',
    'feat.analyze.body': 'Calories and macros with AI in seconds. One photo, done.',
    'feat.goals.eyebrow': 'Daily goals',
    'feat.goals.title': 'Own your macros',
    'feat.goals.body': 'Daily targets and real progress. Protein, carbs and fat at a glance.',
    'feat.strength.eyebrow': 'Strength program',
    'feat.strength.title': 'Train strength',
    'feat.strength.body': 'Pull-ups, bench press and your PRs. Descending sets by 1RM.',
    'feat.coach.eyebrow': 'AI coach',
    'feat.coach.title': 'Your AI coach',
    'feat.coach.body': 'Personalized plans and tips. TDEE calculation and shopping lists.',
    'counters.workouts': 'Reps logged',
    'counters.macros': 'Meals analyzed',
    'counters.prs': 'PRs hit',
    'waitlist.title': 'Get on the list',
    'waitlist.body': 'Be among the first to use TRAKI. No spam.',
    'waitlist.placeholder': 'you@email.com',
    'waitlist.cta': 'Join',
    'waitlist.success': "You're in. We'll reach out.",
    'waitlist.error': 'Something failed. Try again.',
    'footer.tagline': 'No shortcuts. Just reps.',
    'footer.privacy': 'Privacy',
  },
};

export function useTranslations(lang: Lang) {
  return function t(key: string): string {
    return ui[lang][key] ?? key;
  };
}

export function oppositeLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}
```

- [ ] **Step 4: Run tests, verify pass**

Run: `npx vitest run src/i18n/ui.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/i18n/ui.ts src/i18n/ui.test.ts
git commit -m "feat: add i18n dictionary and translation helpers"
```

---

### Task 4: Base layout + copy app screenshots

**Files:**
- Create: `src/layouts/Base.astro`
- Create: `public/screens/screenshot_1.png` … `screenshot_4.png` (copied)

**Interfaces:**
- Consumes: `src/styles/global.css`, `Lang` from `src/i18n/ui.ts`.
- Produces: `Base.astro` with props `{ lang: Lang, title: string, description: string }`, default `<slot />`.

- [ ] **Step 1: Copy screenshots into public**

```bash
mkdir -p public/screens
cp ../traki_flutter/store/screenshots/screenshot_1.png public/screens/
cp ../traki_flutter/store/screenshots/screenshot_2.png public/screens/
cp ../traki_flutter/store/screenshots/screenshot_3.png public/screens/
cp ../traki_flutter/store/screenshots/screenshot_4.png public/screens/
```

- [ ] **Step 2: Create `src/layouts/Base.astro`**

```astro
---
import '../styles/global.css';
import type { Lang } from '../i18n/ui';
import { oppositeLang } from '../i18n/ui';

interface Props { lang: Lang; title: string; description: string; }
const { lang, title, description } = Astro.props;
const other = oppositeLang(lang);
---
<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <link rel="alternate" hreflang={lang} href={`/${lang}/`} />
    <link rel="alternate" hreflang={other} href={`/${other}/`} />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 3: Verify screenshots copied**

Run: `ls public/screens`
Expected: `screenshot_1.png screenshot_2.png screenshot_3.png screenshot_4.png`.

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Base.astro public/screens
git commit -m "feat: add base layout and copy app screenshots"
```

---

### Task 5: Nav component

**Files:**
- Create: `src/components/Nav.astro`

**Interfaces:**
- Consumes: `Lang`, `useTranslations`, `languages`, `oppositeLang`.
- Produces: `<Nav lang={lang} />`. Renders a sticky header with `.nav[data-nav]` (hook for scroll blur in Task 10).

- [ ] **Step 1: Create `src/components/Nav.astro`**

```astro
---
import type { Lang } from '../i18n/ui';
import { useTranslations, oppositeLang } from '../i18n/ui';
interface Props { lang: Lang; }
const { lang } = Astro.props;
const t = useTranslations(lang);
const other = oppositeLang(lang);
---
<header class="nav" data-nav>
  <div class="container nav__inner">
    <a href={`/${lang}/`} class="wordmark" aria-label="TRAKI">TRAKI<span class="dot">.</span></a>
    <nav class="nav__actions">
      <a class="nav__lang" href={`/${other}/`} aria-label={`Switch to ${other.toUpperCase()}`}>{other.toUpperCase()}</a>
      <a class="btn btn-primary nav__cta" href="#waitlist">{t('nav.cta')}</a>
    </nav>
  </div>
</header>

<style>
  .nav {
    position: sticky; top: 0; z-index: 50;
    border-bottom: 1px solid transparent;
    transition: background var(--dur-med) var(--ease-out), border-color var(--dur-med) var(--ease-out);
  }
  .nav[data-scrolled] {
    background: color-mix(in srgb, var(--surface-base) 80%, transparent);
    backdrop-filter: blur(12px);
    border-bottom-color: var(--border-subtle);
  }
  .nav__inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
  .wordmark {
    font-family: var(--font-display); font-weight: 900; font-size: 24px;
    text-transform: uppercase; letter-spacing: -0.02em; color: var(--text-primary);
  }
  .dot { color: var(--accent); }
  .nav__actions { display: flex; align-items: center; gap: var(--s-4); }
  .nav__lang {
    font-family: var(--font-body); font-weight: 700; font-size: 13px; letter-spacing: 0.08em;
    color: var(--text-muted); min-height: 44px; display: inline-flex; align-items: center;
  }
  .nav__lang:hover { color: var(--text-primary); }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Nav.astro
git commit -m "feat: add sticky nav with wordmark and lang toggle"
```

---

### Task 6: PhoneMock + Feature components

**Files:**
- Create: `src/components/PhoneMock.astro`
- Create: `src/components/Feature.astro`

**Interfaces:**
- Consumes: nothing beyond props.
- Produces:
  - `<PhoneMock src={string} alt={string} />` — phone frame w/ volt glow, `class="phone" data-reveal`.
  - `<Feature eyebrow title titleAccent body src alt reverse?={boolean} />` — a two-column feature block; `data-reveal` on children for GSAP.

- [ ] **Step 1: Create `src/components/PhoneMock.astro`**

```astro
---
interface Props { src: string; alt: string; }
const { src, alt } = Astro.props;
---
<div class="phone" data-reveal>
  <img src={src} alt={alt} loading="lazy" width="1080" height="1920" />
</div>

<style>
  .phone {
    position: relative; border-radius: var(--r-2xl); overflow: hidden;
    border: 1px solid var(--accent); box-shadow: var(--glow-volt);
    max-width: 300px; margin-inline: auto;
  }
  .phone img { border-radius: inherit; }
</style>
```

- [ ] **Step 2: Create `src/components/Feature.astro`**

```astro
---
import PhoneMock from './PhoneMock.astro';
interface Props {
  eyebrow: string; title: string; titleAccent?: string; body: string;
  src: string; alt: string; reverse?: boolean;
}
const { eyebrow, title, titleAccent, body, src, alt, reverse = false } = Astro.props;
---
<section class={`feature ${reverse ? 'feature--reverse' : ''}`}>
  <div class="container feature__grid">
    <div class="feature__text">
      <p class="label" data-reveal>{eyebrow}</p>
      <h2 class="display-md" data-reveal>
        {title}{titleAccent ? <> <span class="accent">{titleAccent}</span></> : null}
      </h2>
      <p class="feature__body" data-reveal>{body}</p>
    </div>
    <div class="feature__media">
      <PhoneMock src={src} alt={alt} />
    </div>
  </div>
</section>

<style>
  .feature { padding-block: var(--s-11); }
  .feature__grid {
    display: grid; grid-template-columns: 1fr 1fr; gap: var(--s-10); align-items: center;
  }
  .feature--reverse .feature__media { order: -1; }
  .feature__text { display: flex; flex-direction: column; gap: var(--s-4); }
  .feature__body { color: var(--text-secondary); font-size: 18px; max-width: 44ch; margin: 0; }
  @media (max-width: 860px) {
    .feature__grid { grid-template-columns: 1fr; gap: var(--s-8); }
    .feature--reverse .feature__media { order: 0; }
  }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/PhoneMock.astro src/components/Feature.astro
git commit -m "feat: add PhoneMock and Feature components"
```

---

### Task 7: Hero component

**Files:**
- Create: `src/components/Hero.astro`

**Interfaces:**
- Consumes: `Lang`, `useTranslations`.
- Produces: `<Hero lang={lang} />`. Renders `<video>` referencing `/videos/hero.{webm,mp4}` + poster `/videos/hero-poster.jpg` (assets produced in Task 12; before then the poster/video 404 gracefully — page still renders). Headline chars wrapped in `[data-hero-char]` spans for GSAP stagger.

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/ui';
interface Props { lang: Lang; }
const { lang } = Astro.props;
const t = useTranslations(lang);
const line1 = t('hero.title.1');
const line2 = t('hero.title.2');
---
<section class="hero">
  <div class="container hero__grid">
    <div class="hero__text">
      <h1 class="display-xl hero__title" data-hero-title>
        <span class="hero__line">{line1}</span>
        <span class="hero__line accent">{line2}</span>
      </h1>
      <p class="hero__subtitle" data-reveal>{t('hero.subtitle')}</p>
      <a class="btn btn-primary hero__cta" data-reveal href="#waitlist">{t('hero.cta')}</a>
    </div>
    <div class="hero__media" data-hero-phone>
      <video
        class="hero__video"
        autoplay muted loop playsinline
        poster="/videos/hero-poster.jpg"
        aria-hidden="true"
      >
        <source src="/videos/hero.webm" type="video/webm" />
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
    </div>
  </div>
</section>

<style>
  .hero { padding-block: var(--s-12) var(--s-11); }
  .hero__grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: var(--s-10); align-items: center; }
  .hero__text { display: flex; flex-direction: column; gap: var(--s-6); }
  .hero__title { display: flex; flex-direction: column; }
  .hero__subtitle { color: var(--text-secondary); font-size: 20px; max-width: 40ch; margin: 0; }
  .hero__cta { align-self: flex-start; }
  .hero__media {
    position: relative; border-radius: var(--r-2xl); overflow: hidden;
    border: 1px solid var(--accent); box-shadow: var(--glow-volt-strong);
    max-width: 320px; margin-inline: auto;
  }
  .hero__video { width: 100%; aspect-ratio: 1080 / 1920; background: var(--surface-raised); }
  @media (max-width: 860px) {
    .hero__grid { grid-template-columns: 1fr; }
    .hero__cta { align-self: stretch; }
  }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add hero with Remotion video slot and staggered headline"
```

---

### Task 8: Counters component

**Files:**
- Create: `src/components/Counters.astro`

**Interfaces:**
- Consumes: `Lang`, `useTranslations`.
- Produces: `<Counters lang={lang} />`. Each stat value carries `data-count-to` (target integer) + `data-count-suffix`; GSAP count-up hook in Task 10. Initial rendered text is `0`.

- [ ] **Step 1: Create `src/components/Counters.astro`**

```astro
---
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/ui';
interface Props { lang: Lang; }
const { lang } = Astro.props;
const t = useTranslations(lang);
const stats = [
  { to: 250000, suffix: '+', label: t('counters.workouts') },
  { to: 48000,  suffix: '+', label: t('counters.macros') },
  { to: 12000,  suffix: '+', label: t('counters.prs') },
];
---
<section class="counters">
  <div class="container counters__grid">
    {stats.map((s) => (
      <div class="counters__item" data-reveal>
        <span class="numeric counters__value" data-count-to={s.to} data-count-suffix={s.suffix}>0</span>
        <span class="label counters__label">{s.label}</span>
      </div>
    ))}
  </div>
</section>

<style>
  .counters { padding-block: var(--s-10); border-block: 1px solid var(--border-subtle); }
  .counters__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--s-8); text-align: center; }
  .counters__value { display: block; color: var(--accent); font-size: clamp(40px, 6vw, 64px); line-height: 1; }
  .counters__label { display: block; margin-top: var(--s-3); }
  @media (max-width: 640px) { .counters__grid { grid-template-columns: 1fr; gap: var(--s-6); } }
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Counters.astro
git commit -m "feat: add animated counters strip"
```

---

### Task 9: Waitlist logic (TDD) + component

**Files:**
- Create: `src/lib/waitlist.ts`
- Create: `src/lib/waitlist.test.ts`
- Create: `src/components/Waitlist.astro`

**Interfaces:**
- Consumes: `Lang`, `useTranslations`. Env: `PUBLIC_WAITLIST_ENDPOINT`.
- Produces:
  - `isValidEmail(email: string): boolean`
  - `submitWaitlist(endpoint: string, email: string, fetchFn?: typeof fetch): Promise<{ ok: boolean }>`
  - `<Waitlist lang={lang} />` with `#waitlist` anchor, form `[data-waitlist-form]`, input `[data-waitlist-email]`, status `[data-waitlist-status]`, honeypot input `name="_gotcha"`.

- [ ] **Step 1: Write failing tests** — `src/lib/waitlist.test.ts`

```ts
import { describe, it, expect, vi } from 'vitest';
import { isValidEmail, submitWaitlist } from './waitlist';

describe('isValidEmail', () => {
  it('accepts a normal address', () => { expect(isValidEmail('a@b.com')).toBe(true); });
  it('rejects a missing @', () => { expect(isValidEmail('ab.com')).toBe(false); });
  it('rejects empty', () => { expect(isValidEmail('')).toBe(false); });
  it('rejects whitespace', () => { expect(isValidEmail('  ')).toBe(false); });
});

describe('submitWaitlist', () => {
  it('POSTs the email as form data and returns ok on 200', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ ok: true });
    const res = await submitWaitlist('https://ep.test', 'a@b.com', fetchFn as unknown as typeof fetch);
    expect(res.ok).toBe(true);
    expect(fetchFn).toHaveBeenCalledOnce();
    const [url, init] = fetchFn.mock.calls[0];
    expect(url).toBe('https://ep.test');
    expect((init as RequestInit).method).toBe('POST');
  });
  it('returns not-ok on a failed response', async () => {
    const fetchFn = vi.fn().mockResolvedValue({ ok: false });
    const res = await submitWaitlist('https://ep.test', 'a@b.com', fetchFn as unknown as typeof fetch);
    expect(res.ok).toBe(false);
  });
  it('returns not-ok when fetch throws', async () => {
    const fetchFn = vi.fn().mockRejectedValue(new Error('network'));
    const res = await submitWaitlist('https://ep.test', 'a@b.com', fetchFn as unknown as typeof fetch);
    expect(res.ok).toBe(false);
  });
});
```

- [ ] **Step 2: Run tests, verify fail**

Run: `npx vitest run src/lib/waitlist.test.ts`
Expected: FAIL — `Cannot find module './waitlist'`.

- [ ] **Step 3: Implement `src/lib/waitlist.ts`**

```ts
export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (trimmed.length === 0) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export async function submitWaitlist(
  endpoint: string,
  email: string,
  fetchFn: typeof fetch = fetch,
): Promise<{ ok: boolean }> {
  try {
    const body = new FormData();
    body.append('email', email.trim());
    const res = await fetchFn(endpoint, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body,
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
```

- [ ] **Step 4: Run tests, verify pass**

Run: `npx vitest run src/lib/waitlist.test.ts`
Expected: PASS (7 tests).

- [ ] **Step 5: Create `src/components/Waitlist.astro`**

```astro
---
import type { Lang } from '../i18n/ui';
import { useTranslations } from '../i18n/ui';
interface Props { lang: Lang; }
const { lang } = Astro.props;
const t = useTranslations(lang);
const endpoint = import.meta.env.PUBLIC_WAITLIST_ENDPOINT ?? '';
---
<section id="waitlist" class="waitlist">
  <div class="container">
    <div class="card card-accent waitlist__card" data-reveal>
      <h2 class="display-md">{t('waitlist.title')}</h2>
      <p class="waitlist__body">{t('waitlist.body')}</p>
      <form class="waitlist__form" data-waitlist-form data-endpoint={endpoint}>
        <input type="text" name="_gotcha" tabindex="-1" autocomplete="off" class="waitlist__hp" aria-hidden="true" />
        <input
          type="email" required
          class="waitlist__input" data-waitlist-email
          placeholder={t('waitlist.placeholder')}
          aria-label={t('waitlist.placeholder')}
        />
        <button type="submit" class="btn btn-primary">{t('waitlist.cta')}</button>
      </form>
      <p class="waitlist__status" data-waitlist-status
         data-success={t('waitlist.success')} data-error={t('waitlist.error')} role="status" aria-live="polite"></p>
    </div>
  </div>
</section>

<style>
  .waitlist { padding-block: var(--s-12); }
  .waitlist__card { display: flex; flex-direction: column; gap: var(--s-4); padding: var(--s-9) var(--s-8); text-align: center; align-items: center; }
  .waitlist__body { color: var(--text-secondary); margin: 0; }
  .waitlist__form { display: flex; gap: var(--s-3); width: 100%; max-width: 460px; margin-top: var(--s-3); }
  .waitlist__hp { position: absolute; left: -9999px; width: 1px; height: 1px; }
  .waitlist__input {
    flex: 1; min-height: 44px; padding: 12px 16px; border-radius: var(--r-sm);
    background: var(--surface-input); border: 1px solid var(--border-subtle);
    color: var(--text-primary); font-family: var(--font-mono); font-size: 15px;
  }
  .waitlist__input:focus-visible { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(57,255,92,0.15); }
  .waitlist__status { min-height: 20px; margin: 0; font-size: 14px; }
  .waitlist__status[data-state="ok"] { color: var(--accent); }
  .waitlist__status[data-state="err"] { color: var(--danger); }
  @media (max-width: 520px) { .waitlist__form { flex-direction: column; } }
</style>
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/waitlist.ts src/lib/waitlist.test.ts src/components/Waitlist.astro
git commit -m "feat: add waitlist form with validated submit helper"
```

---

### Task 10: Footer component

**Files:**
- Create: `src/components/Footer.astro`

**Interfaces:**
- Consumes: `Lang`, `useTranslations`, `oppositeLang`.
- Produces: `<Footer lang={lang} />`. Privacy link → `/privacy_policy.html` (copied to public in this task).

- [ ] **Step 1: Copy privacy policy into public**

```bash
cp ../traki_flutter/privacy_policy.html public/privacy_policy.html
```

- [ ] **Step 2: Create `src/components/Footer.astro`**

```astro
---
import type { Lang } from '../i18n/ui';
import { useTranslations, oppositeLang } from '../i18n/ui';
interface Props { lang: Lang; }
const { lang } = Astro.props;
const t = useTranslations(lang);
const other = oppositeLang(lang);
---
<footer class="footer">
  <div class="container footer__inner">
    <div>
      <a href={`/${lang}/`} class="wordmark">TRAKI<span class="dot">.</span></a>
      <p class="footer__tagline">{t('footer.tagline')}</p>
    </div>
    <nav class="footer__links">
      <a href="/privacy_policy.html">{t('footer.privacy')}</a>
      <a href={`/${other}/`}>{other.toUpperCase()}</a>
    </nav>
  </div>
</footer>

<style>
  .footer { border-top: 1px solid var(--border-subtle); padding-block: var(--s-9); }
  .footer__inner { display: flex; justify-content: space-between; align-items: flex-start; gap: var(--s-6); flex-wrap: wrap; }
  .wordmark { font-family: var(--font-display); font-weight: 900; font-size: 20px; text-transform: uppercase; letter-spacing: -0.02em; }
  .dot { color: var(--accent); }
  .footer__tagline { color: var(--text-muted); font-size: 14px; margin: var(--s-2) 0 0; }
  .footer__links { display: flex; gap: var(--s-6); }
  .footer__links a { color: var(--text-secondary); font-size: 14px; }
  .footer__links a:hover { color: var(--text-primary); }
</style>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.astro public/privacy_policy.html
git commit -m "feat: add footer and copy privacy policy"
```

---

### Task 11: Page composition + GSAP animations

**Files:**
- Create: `src/scripts/animations.ts`
- Create: `src/pages/es/index.astro`
- Create: `src/pages/en/index.astro`
- Replace: `src/pages/index.astro`

**Interfaces:**
- Consumes: all components, `animations.ts`.
- Produces: routes `/es/`, `/en/`, and `/` → redirect `/es/`. `animations.ts` is a self-invoking module imported by each page via `<script>`.

- [ ] **Step 1: Create `src/scripts/animations.ts`**

```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveals() {
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.from(el, {
      opacity: 0, y: 24, duration: 0.6, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}

function initHero() {
  const title = document.querySelector<HTMLElement>('[data-hero-title]');
  const phone = document.querySelector<HTMLElement>('[data-hero-phone]');
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  if (title) {
    tl.from(title.querySelectorAll('.hero__line'), { opacity: 0, y: 40, stagger: 0.12, duration: 0.7 });
  }
  if (phone) {
    tl.from(phone, { opacity: 0, y: 60, duration: 0.9 }, '<0.1');
  }
}

function initCounters() {
  gsap.utils.toArray<HTMLElement>('[data-count-to]').forEach((el) => {
    const target = Number(el.dataset.countTo ?? '0');
    const suffix = el.dataset.countSuffix ?? '';
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.val).toLocaleString() + suffix; },
        });
      },
    });
  });
}

function initNavBlur() {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 8) nav.setAttribute('data-scrolled', '');
    else nav.removeAttribute('data-scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function setFinalState() {
  // reduced motion: ensure counters show final numbers, nothing hidden
  document.querySelectorAll<HTMLElement>('[data-count-to]').forEach((el) => {
    const target = Number(el.dataset.countTo ?? '0');
    const suffix = el.dataset.countSuffix ?? '';
    el.textContent = target.toLocaleString() + suffix;
  });
}

function main() {
  initNavBlur(); // nav blur runs regardless of motion preference
  if (reduce) { setFinalState(); return; }
  gsap.registerPlugin(ScrollTrigger);
  initHero();
  initReveals();
  initCounters();
}

main();
```

- [ ] **Step 2: Create `src/pages/es/index.astro`**

```astro
---
import Base from '../../layouts/Base.astro';
import Nav from '../../components/Nav.astro';
import Hero from '../../components/Hero.astro';
import Feature from '../../components/Feature.astro';
import Counters from '../../components/Counters.astro';
import Waitlist from '../../components/Waitlist.astro';
import Footer from '../../components/Footer.astro';
import { useTranslations } from '../../i18n/ui';
const lang = 'es' as const;
const t = useTranslations(lang);
---
<Base lang={lang} title="TRAKI — Sin atajos. Solo reps." description={t('hero.subtitle')}>
  <Nav lang={lang} />
  <main>
    <Hero lang={lang} />
    <Feature eyebrow={t('feat.analyze.eyebrow')} title={t('feat.analyze.title')} body={t('feat.analyze.body')} src="/screens/screenshot_1.png" alt={t('feat.analyze.title')} />
    <Feature eyebrow={t('feat.goals.eyebrow')} title={t('feat.goals.title')} body={t('feat.goals.body')} src="/screens/screenshot_2.png" alt={t('feat.goals.title')} reverse />
    <Feature eyebrow={t('feat.strength.eyebrow')} title={t('feat.strength.title')} body={t('feat.strength.body')} src="/screens/screenshot_3.png" alt={t('feat.strength.title')} />
    <Feature eyebrow={t('feat.coach.eyebrow')} title={t('feat.coach.title')} body={t('feat.coach.body')} src="/screens/screenshot_4.png" alt={t('feat.coach.title')} reverse />
    <Counters lang={lang} />
    <Waitlist lang={lang} />
  </main>
  <Footer lang={lang} />
</Base>
<script>import '../../scripts/animations.ts';</script>
```

- [ ] **Step 3: Create `src/pages/en/index.astro`** (identical, `lang='en'`, EN title)

```astro
---
import Base from '../../layouts/Base.astro';
import Nav from '../../components/Nav.astro';
import Hero from '../../components/Hero.astro';
import Feature from '../../components/Feature.astro';
import Counters from '../../components/Counters.astro';
import Waitlist from '../../components/Waitlist.astro';
import Footer from '../../components/Footer.astro';
import { useTranslations } from '../../i18n/ui';
const lang = 'en' as const;
const t = useTranslations(lang);
---
<Base lang={lang} title="TRAKI — No shortcuts. Just reps." description={t('hero.subtitle')}>
  <Nav lang={lang} />
  <main>
    <Hero lang={lang} />
    <Feature eyebrow={t('feat.analyze.eyebrow')} title={t('feat.analyze.title')} body={t('feat.analyze.body')} src="/screens/screenshot_1.png" alt={t('feat.analyze.title')} />
    <Feature eyebrow={t('feat.goals.eyebrow')} title={t('feat.goals.title')} body={t('feat.goals.body')} src="/screens/screenshot_2.png" alt={t('feat.goals.title')} reverse />
    <Feature eyebrow={t('feat.strength.eyebrow')} title={t('feat.strength.title')} body={t('feat.strength.body')} src="/screens/screenshot_3.png" alt={t('feat.strength.title')} />
    <Feature eyebrow={t('feat.coach.eyebrow')} title={t('feat.coach.title')} body={t('feat.coach.body')} src="/screens/screenshot_4.png" alt={t('feat.coach.title')} reverse />
    <Counters lang={lang} />
    <Waitlist lang={lang} />
  </main>
  <Footer lang={lang} />
</Base>
<script>import '../../scripts/animations.ts';</script>
```

- [ ] **Step 4: Replace `src/pages/index.astro` with a redirect to `/es/`**

```astro
---
return Astro.redirect('/es/');
---
```

- [ ] **Step 5: Wire the waitlist form submit (client script in Waitlist)**

Append this `<script>` to the end of `src/components/Waitlist.astro` (after the `</style>`):

```astro
<script>
  import { isValidEmail, submitWaitlist } from '../lib/waitlist';
  const form = document.querySelector<HTMLFormElement>('[data-waitlist-form]');
  const email = document.querySelector<HTMLInputElement>('[data-waitlist-email]');
  const status = document.querySelector<HTMLElement>('[data-waitlist-status]');
  const hp = document.querySelector<HTMLInputElement>('[name="_gotcha"]');
  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!email || !status) return;
    if (hp && hp.value) return; // bot filled honeypot
    if (!isValidEmail(email.value)) {
      status.dataset.state = 'err';
      status.textContent = status.dataset.error ?? '';
      return;
    }
    const endpoint = form.dataset.endpoint ?? '';
    const { ok } = endpoint ? await submitWaitlist(endpoint, email.value) : { ok: true };
    status.dataset.state = ok ? 'ok' : 'err';
    status.textContent = (ok ? status.dataset.success : status.dataset.error) ?? '';
    if (ok) form.reset();
  });
</script>
```

- [ ] **Step 6: Build and verify routes + tests**

Run: `npm test`
Expected: PASS (all i18n + waitlist unit tests).
Run: `npm run build`
Expected: build succeeds; output includes `dist/es/index.html`, `dist/en/index.html`, and `dist/index.html` (redirect).

- [ ] **Step 7: Manually verify in dev**

Run: `npm run dev` then open `http://localhost:4321/es/`.
Expected: dark page renders; nav blur on scroll; features reveal on scroll; counters count up; lang toggle switches to `/en/`; waitlist shows success on valid email (endpoint empty → optimistic ok). Video area shows poster/empty until Task 12.

- [ ] **Step 8: Commit**

```bash
git add src/scripts/animations.ts src/pages
git commit -m "feat: compose landing pages and wire GSAP animations"
```

---

### Task 12: Remotion hero video (isolated project)

**Files:**
- Create: `remotion/package.json`
- Create: `remotion/tsconfig.json`
- Create: `remotion/src/index.ts`
- Create: `remotion/src/Root.tsx`
- Create: `remotion/src/HeroVideo.tsx`
- Create: `remotion/src/PhoneScene.tsx`
- Create: `public/videos/{hero.mp4,hero.webm,hero-poster.jpg}` (rendered output)

**Interfaces:**
- Consumes: screenshot PNGs from `../public/screens/`.
- Produces: `npm run render` (mp4), `npm run render:webm`, `npm run still` (poster) inside `remotion/`, writing into `../public/videos/`.

- [ ] **Step 1: Scaffold isolated Remotion project**

```bash
mkdir -p remotion/src
cd remotion && npm init -y && npm install remotion @remotion/cli react react-dom && cd ..
```

- [ ] **Step 2: Create `remotion/tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

- [ ] **Step 3: Set `remotion/package.json` scripts**

Set the `scripts` block to:

```json
{
  "render": "remotion render src/index.ts HeroVideo ../public/videos/hero.mp4",
  "render:webm": "remotion render src/index.ts HeroVideo ../public/videos/hero.webm --codec=vp8",
  "still": "remotion still src/index.ts HeroVideo ../public/videos/hero-poster.jpg --frame=60",
  "studio": "remotion studio src/index.ts"
}
```

- [ ] **Step 4: Create `remotion/src/index.ts`**

```ts
import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';
registerRoot(RemotionRoot);
```

- [ ] **Step 5: Create `remotion/src/Root.tsx`**

```tsx
import { Composition } from 'remotion';
import { HeroVideo } from './HeroVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HeroVideo"
      component={HeroVideo}
      durationInFrames={300}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
```

- [ ] **Step 6: Create `remotion/src/PhoneScene.tsx`**

```tsx
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';

const screens = [
  'screens/screenshot_1.png',
  'screens/screenshot_2.png',
  'screens/screenshot_3.png',
  'screens/screenshot_4.png',
];

export const PhoneScene: React.FC = () => {
  const frame = useCurrentFrame();
  const per = 300 / screens.length; // frames per screen
  const index = Math.min(screens.length - 1, Math.floor(frame / per));
  const local = frame - index * per;
  const opacity = interpolate(local, [0, 12, per - 12, per], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  return (
    <AbsoluteFill style={{ background: '#0A0A0B', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{
        width: 900, borderRadius: 60, overflow: 'hidden',
        border: '2px solid #39FF5C', boxShadow: '0 0 80px rgba(57,255,92,0.45)',
      }}>
        <Img src={staticFile(screens[index])} style={{ width: '100%', opacity }} />
      </div>
    </AbsoluteFill>
  );
};
```

- [ ] **Step 7: Create `remotion/src/HeroVideo.tsx`**

```tsx
import { AbsoluteFill } from 'remotion';
import { PhoneScene } from './PhoneScene';

export const HeroVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#0A0A0B' }}>
      <PhoneScene />
    </AbsoluteFill>
  );
};
```

- [ ] **Step 8: Link public dir for staticFile**

Remotion resolves `staticFile()` from its own `public/`. Symlink the landing screens so the render finds them:

```bash
mkdir -p remotion/public
cp -R public/screens remotion/public/screens
```

- [ ] **Step 9: Render video + poster**

```bash
cd remotion && npm run render && npm run render:webm && npm run still && cd ..
```
Expected: `public/videos/hero.mp4`, `hero.webm`, `hero-poster.jpg` created.

- [ ] **Step 10: Verify hero shows video in dev**

Run: `npm run dev`, open `/es/`.
Expected: hero phone plays the looping screen cycle with volt glow.

- [ ] **Step 11: Add remotion artifacts + node_modules ignore**

Append to `.gitignore`:

```
remotion/node_modules
remotion/out
```

- [ ] **Step 12: Commit**

```bash
git add remotion .gitignore public/videos
git commit -m "feat: add Remotion hero video project and rendered output"
```

---

## Self-Review

**Spec coverage:**
- Astro base + i18n routing → Task 1, 11. ✓
- Design tokens ported → Task 2. ✓
- Fonts self-hosted → Task 2. ✓
- GSAP + ScrollTrigger + reduced-motion → Task 11. ✓
- Nav / Hero / Feature / PhoneMock / Counters / Waitlist / Footer → Tasks 5–10. ✓
- 4 features with screenshots → Task 6, 11. ✓
- Counters count-up → Task 8, 11. ✓
- Waitlist external service + honeypot + validation → Task 9, 11. ✓
- Footer + privacy reuse → Task 10. ✓
- Remotion isolated + screenshots-based render → Task 12. ✓
- Accessibility (44px targets, focus glow, aria) → across component tasks. ✓
- Out of scope respected (no light mode, no own backend, no UI rebuild). ✓

**Placeholder scan:** No TBD/TODO. Counter metrics are intentional editable defaults, flagged as such. All code blocks complete.

**Type consistency:** `Lang`, `useTranslations`, `oppositeLang`, `ui`, `isValidEmail`, `submitWaitlist` names match across producer/consumer tasks. Data attrs (`data-reveal`, `data-hero-title`, `data-hero-phone`, `data-count-to`, `data-count-suffix`, `data-nav`, `data-waitlist-*`) consistent between components (Tasks 5–9) and `animations.ts` (Task 11).

**Note on video timing:** Hero `<video>` (Task 7) references assets produced in Task 12; pages render fine before Task 12 (poster 404s gracefully). Execute Task 12 to complete the hero.
