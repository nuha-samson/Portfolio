import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const section = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.edu-card', { y: 70, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: section.current, start: 'top 75%' } });
      gsap.from('.edu-rule', { scaleX: 0, transformOrigin: 'left', duration: 1, scrollTrigger: { trigger: '.edu-rule', start: 'top 85%' } });
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section className="education" ref={section}>
      <div className="section-head"><span>06 / EDUCATION</span><span>THE FOUNDATION</span></div>
      <div className="edu-card">
        <div><p className="eyebrow">ADAMA SCIENCE AND TECHNOLOGY UNIVERSITY</p><h2>COLLEGE OF<br /><em>ELECTRICAL ENGINEERING<br />AND COMPUTING.</em></h2></div>
        <div className="edu-meta"><span>BACHELOR OF SCIENCE IN ENGINEERING</span><span>EXPECTED 2030</span><i /></div>
      </div>
      <div className="edu-rule" />
    </section>
  );
}
