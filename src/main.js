import '@fontsource-variable/archivo/wdth.css';
import 'lenis/dist/lenis.css';
import './style.css';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
const $ = (s) => document.querySelector(s);

/* Hero film: autoplay muted loop; paused for reduced motion, Save-Data, off-screen, or by the visitor. */
const video = $('.hero__video');
const toggle = $('[data-video-toggle]');
let userPaused = false;

const setToggle = (paused) => {
  toggle.classList.toggle('is-paused', paused);
  toggle.setAttribute('aria-label', paused ? 'Prehrať video' : 'Zastaviť video');
};
const play = () => video.play().then(() => setToggle(false)).catch(() => setToggle(true));
const pause = () => { video.pause(); setToggle(true); };

if (reduceMq.matches || navigator.connection?.saveData) { userPaused = true; pause(); }
toggle.addEventListener('click', () => {
  userPaused = !video.paused;
  userPaused ? pause() : play();
});
reduceMq.addEventListener('change', (e) => { if (e.matches) { userPaused = true; pause(); } });
new IntersectionObserver(([entry]) => {
  if (userPaused) return;
  entry.isIntersecting ? play() : video.pause();
}, { threshold: 0.05 }).observe($('.hero__plate'));

/* Smooth scroll: Lenis driven by GSAP's ticker so ScrollTrigger stays in sync. */
let lenis;
if (!reduceMq.matches) {
  lenis = new Lenis({ lerp: 0.065, wheelMultiplier: 0.9, anchors: { offset: -72, lerp: 0.08 }, stopInertiaOnNavigate: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* Nav hairline once the page leaves the top. */
const nav = $('[data-nav]');
ScrollTrigger.create({ start: 8, end: 'max', onToggle: (self) => nav.classList.toggle('is-scrolled', self.isActive) });

/* Mobile call dock: visible between the hero and the contact actions. */
const dock = $('[data-dock]');
let heroVisible = true, contactVisible = false;
const syncDock = () => dock.classList.toggle('is-on', !heroVisible && !contactVisible);
new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; syncDock(); }).observe($('.hero'));
new IntersectionObserver(([e]) => { contactVisible = e.isIntersecting; syncDock(); }).observe($('[data-contact-actions]'));

/* Parallax: rear layers drift, the reading plane holds still. Transforms only. */
const mm = gsap.matchMedia();
mm.add(
  { desk: '(min-width: 768px)', motion: '(prefers-reduced-motion: no-preference)' },
  ({ conditions: { desk, motion } }) => {
    if (!motion) return;
    const k = desk ? 1 : 0.65;
    // scrub 0.8: each layer eases toward its target, so depth reads soft rather than locked to the wheel.
    const scrub = (trigger, start = 'top bottom', end = 'bottom top') => ({ trigger, start, end, scrub: 0.8 });

    // Hero: film (rear) lags behind the scroll, line drawing (mid) runs ahead, copy stays put.
    gsap.to('.hero__media', { yPercent: 14 * k, ease: 'none', scrollTrigger: scrub('.hero', 'top top') });
    gsap.to('.hero__lines', { yPercent: -38 * k, ease: 'none', scrollTrigger: scrub('.hero', 'top top') });

    // About: the plate frame and the photo inside it move at two different depths.
    gsap.fromTo('.plate', { yPercent: 7 * k }, { yPercent: -7 * k, ease: 'none', scrollTrigger: scrub('.about') });
    gsap.fromTo('.plate__img', { yPercent: -7 * k }, { yPercent: 7 * k, ease: 'none', scrollTrigger: scrub('.plate') });

    // Services: the drawing floats on its own plane above the scope table.
    gsap.fromTo('.exploded', { yPercent: 6 * k }, { yPercent: -4 * k, ease: 'none', scrollTrigger: scrub('.services') });

    // Callouts: leader lines draw out from each part, then the numbers land.
    const tl = gsap.timeline({ scrollTrigger: { trigger: '.exploded', start: 'top 72%', once: true } });
    tl.from('.co__dot', { scale: 0, duration: 0.4, ease: 'expo.out', stagger: 0.08 })
      .from('.co__line', { scaleX: 0, duration: 0.7, ease: 'expo.out', stagger: 0.08 }, '<0.1')
      .from('.co__num', { scale: 0.4, autoAlpha: 0, duration: 0.5, ease: 'expo.out', stagger: 0.08 }, '<0.35');
  }
);

// Layout shifts from late fonts or images: re-measure triggers once everything is in.
window.addEventListener('load', () => ScrollTrigger.refresh());
