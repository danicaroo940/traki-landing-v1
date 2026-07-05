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
