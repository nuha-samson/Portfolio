import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import anime from 'animejs/lib/anime.es.js';
import { skills } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function SkillRow({ items, reverse = false, speed = 1 }) {
  const row = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced || !row.current) return;
    const ctx = gsap.context(() => {
      const distance = reverse ? '+=45%' : '-=45%';
      gsap.to(row.current, {
        x: distance,
        duration: 20 / speed,
        repeat: -1,
        ease: 'none',
      });
    }, row);
    return () => ctx.revert();
  }, [reduced, reverse, speed]);

  const hover = (el, active) => {
    if (reduced) return;
    anime({ targets: el, scale: active ? 1.06 : 1, rotate: active ? (reverse ? -2 : 2) : 0, duration: 350, easing: 'easeOutExpo' });
  };

  return (
    <div className={`skills-row ${reverse ? 'reverse' : ''}`}>
      <div className="skills-track" ref={row}>
        {[...items, ...items, ...items].map((skill, i) => (
          <span key={`${skill}-${i}`} data-cursor="SKILL" onMouseEnter={(e) => hover(e.currentTarget, true)} onMouseLeave={(e) => hover(e.currentTarget, false)}>{skill}<b>✳</b></span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const section = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.skills-heading', {
        yPercent: 100,
        opacity: 0,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: section.current, start: 'top 75%' },
      });
      gsap.to('.skills-marker', {
        rotate: 180,
        scrollTrigger: { trigger: section.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
      gsap.to('.skills-row:nth-of-type(2)', {
        xPercent: 8,
        scrollTrigger: { trigger: section.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="skills" ref={section}>
      <div className="section-head"><span>03 / SKILLS</span><span>TOOLS I LIKE</span></div>
      <div className="skills-top">
        <h2 className="skills-heading">MAKE IT<br /><em>MOVE.</em></h2>
        <div className="skills-marker">✳</div>
      </div>
      <SkillRow items={skills} speed={1.1} />
      <SkillRow items={[...skills].reverse()} reverse speed={0.85} />
      <div className="skills-note">ENGINEERING / INTERACTION / MOTION</div>
    </section>
  );
}
