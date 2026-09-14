import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { process } from '../data/content';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
  const section = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.process-intro > *', { y: 50, opacity: 0, stagger: 0.1, duration: 0.7, scrollTrigger: { trigger: section.current, start: 'top 75%' } });
      gsap.utils.toArray('.process-step').forEach((step, i) => {
        gsap.from(step, {
          x: i % 2 ? 80 : -80,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: step, start: 'top 82%' },
        });
      });
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="process" className="process" ref={section}>
      <div className="section-head"><span>05 / PROCESS</span><span>HOW I WORK</span></div>
      <div className="process-intro"><h2>LESS<br /><em>THEORY.</em><br />MORE MAKING.</h2><p>My process is deliberately simple: understand, make, test, repeat.</p></div>
      <div className="process-list">
        {process.map(([num, title, copy]) => (
          <div className="process-step" key={num}><span>{num}</span><h3>{title}</h3><p>{copy}</p><b>↘</b></div>
        ))}
      </div>
    </section>
  );
}
