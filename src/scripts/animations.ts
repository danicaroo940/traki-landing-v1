import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;
const desktop = window.matchMedia('(min-width: 861px)').matches;

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
    const split = new SplitText(title.querySelectorAll('.hero__line'), { type: 'chars' });
    gsap.set(title, { visibility: 'visible' });
    tl.from(split.chars, {
      opacity: 0, yPercent: 60, rotateX: -60, transformOrigin: '50% 100%',
      stagger: 0.028, duration: 0.7,
    });
  }
  // Intro animates the inner card so the scroll parallax (which owns the
  // wrapper's y) never fights it for the same transform.
  const phoneInner = phone?.querySelector<HTMLElement>('[data-tilt-inner]') ?? phone;
  if (phoneInner) {
    tl.from(phoneInner, { opacity: 0, y: 60, duration: 0.9 }, '<0.2');
  }

  // Parallax: glow drifts up, gridlines fade out as hero scrolls away
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const glow = document.querySelector<HTMLElement>('[data-hero-glow]');
  const grid = document.querySelector<HTMLElement>('[data-hero-gridlines]');
  if (hero && (glow || grid)) {
    const scrub = gsap.timeline({
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
    });
    if (glow) scrub.to(glow, { yPercent: -30, opacity: 0.3, ease: 'none' }, 0);
    if (grid) scrub.to(grid, { opacity: 0, ease: 'none' }, 0);
    if (phone) scrub.to(phone, { y: 80, ease: 'none' }, 0);
  }
}

function initTilt() {
  if (!finePointer) return;
  const wrap = document.querySelector<HTMLElement>('[data-tilt]');
  const inner = wrap?.querySelector<HTMLElement>('[data-tilt-inner]');
  if (!wrap || !inner) return;
  const rx = gsap.quickTo(inner, 'rotationX', { duration: 0.5, ease: 'power2.out' });
  const ry = gsap.quickTo(inner, 'rotationY', { duration: 0.5, ease: 'power2.out' });
  wrap.addEventListener('pointermove', (e) => {
    const r = wrap.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;   // -0.5 .. 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5;
    ry(nx * 14);
    rx(ny * -14);
  });
  wrap.addEventListener('pointerleave', () => { rx(0); ry(0); });
}

function initMagnetic() {
  if (!finePointer) return;
  gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
    const y = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - (r.left + r.width / 2)) * 0.25);
      y((e.clientY - (r.top + r.height / 2)) * 0.25);
    });
    el.addEventListener('pointerleave', () => { x(0); y(0); });
  });
}

function initMarquee() {
  const track = document.querySelector<HTMLElement>('[data-marquee-track]');
  if (!track) return;
  // Track holds two identical groups; shifting -50% loops seamlessly.
  gsap.to(track, { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });
}

function initGallery() {
  if (!desktop) return; // mobile falls back to native horizontal scroll
  const section = document.querySelector<HTMLElement>('[data-gallery]');
  const pin = document.querySelector<HTMLElement>('[data-gallery-pin]');
  const track = document.querySelector<HTMLElement>('[data-gallery-track]');
  if (!section || !pin || !track) return;
  const distance = () => track.scrollWidth - window.innerWidth;
  if (distance() <= 0) return;
  gsap.to(track, {
    x: () => -distance(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${distance()}`,
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      anticipatePin: 1,
    },
  });
}

function initScrubText() {
  gsap.utils.toArray<HTMLElement>('[data-scrub-text]').forEach((el) => {
    const split = new SplitText(el, { type: 'words' });
    gsap.set(split.words, { opacity: 0.18 });
    gsap.to(split.words, {
      opacity: 1, stagger: 0.06, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 80%', end: 'top 35%', scrub: true },
    });
  });
}

function initFeatureParallax() {
  // Desktop only — on a single column the offset just carves dead gaps
  // between sections.
  if (!desktop) return;
  gsap.utils.toArray<HTMLElement>('[data-feature] [data-parallax]').forEach((el) => {
    gsap.fromTo(el, { y: 48 }, {
      y: -48, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

function initCounters() {
  gsap.utils.toArray<HTMLElement>('[data-count-to]').forEach((el) => {
    const target = Number(el.dataset.countTo ?? '0');
    const suffix = el.dataset.countSuffix ?? '';
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.fromTo(el,
          { filter: 'blur(8px)', scale: 0.9 },
          { filter: 'blur(0px)', scale: 1, duration: 0.8, ease: 'power2.out' },
        );
        gsap.to(obj, {
          val: target, duration: 1.6, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.round(obj.val).toLocaleString() + suffix; },
        });
      },
    });
  });
}

function initFooterGiant() {
  const giant = document.querySelector<HTMLElement>('[data-footer-giant]');
  if (!giant) return;
  // yPercent is a separate transform component, so the CSS translateY(14%)
  // baseline offset is preserved while this slides the word up into view.
  gsap.from(giant, {
    yPercent: 60, ease: 'none',
    scrollTrigger: { trigger: giant, start: 'top bottom', end: 'top 75%', scrub: true },
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
  gsap.registerPlugin(ScrollTrigger, SplitText);
  initHero();
  initTilt();
  initMagnetic();
  initMarquee();
  initGallery();
  initScrubText();
  initFeatureParallax();
  initReveals();
  initCounters();
  initFooterGiant();
}

main();
