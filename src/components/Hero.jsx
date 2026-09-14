import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SignatureShape from './SignatureShape';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const section = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro.from('.hero-kicker span', { yPercent: 120, stagger: 0.08, duration: 0.9 })
        .from('.hero-word', { yPercent: 115, opacity: 0, stagger: 0.12, duration: 1.05 }, '-=0.5')
        .from('.hero-meta', { y: 30, opacity: 0, duration: 0.8 }, '-=0.55')
        .from('.hero-line', { scaleX: 0, transformOrigin: 'left', duration: 1 }, '-=0.5');

      gsap.to('.hero-title .hero-word:nth-child(1)', {
        xPercent: -22,
        rotation: -2,
        scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom top', scrub: 1.2 },
      });
      gsap.to('.hero-title .hero-word:nth-child(2)', {
        xPercent: 18,
        scale: 0.86,
        scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom top', scrub: 1.1 },
      });
      gsap.to('.hero-title .hero-word:nth-child(3)', {
        xPercent: -10,
        scale: 1.08,
        scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom top', scrub: 1.4 },
      });
      gsap.to('.hero-meta', {
        yPercent: -70,
        opacity: 15,
        scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });
      gsap.to('.hero-scroll', {
        y: 35,
        opacity: 0,
        scrollTrigger: { trigger: section.current, start: 'top top', end: '35% top', scrub: true },
      });
      gsap.to('.hero .signature-shape', {
        xPercent: -30,
        yPercent: 55,
        scale: 1.5,
        rotation: 100,
        scrollTrigger: { trigger: section.current, start: 'top top', end: 'bottom top', scrub: 1.5 },
      });
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="top" className="hero" ref={section}>
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-kicker"><span>01 / SOFTWARE</span><span>SOFTWARE ENGINEER / FULL-STACK DEVELOPER</span></div>
      <div className="hero-title-wrap">
        <h1 className="hero-title" aria-label="I build digital experiences.">
          <span className="hero-word">I BUILD</span>
          <span className="hero-word">DIGITAL</span>
          <span className="hero-word">EXPERIENCES.</span>
        </h1>
      </div>
      <div className="hero-meta">
        <p>WEB / MOTION / PRODUCT</p>
        <p>BASED IN ADDIS ABABA</p>
      </div>
      <div className="hero-line" />
      <SignatureShape />
      <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><i /></div>
    </section>
  );
}
