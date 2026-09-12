import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SignatureShape from './SignatureShape';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const statement = 'I build things that live on the web.';

export default function About() {
  const section = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.about-word', {
        yPercent: 110,
        opacity: 0,
        rotateX: -70,
        stagger: 0.08,
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: { trigger: section.current, start: 'top 72%' },
      });
      gsap.from('.about-copy', {
        x: 80,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-copy', start: 'top 82%' },
      });
      gsap.to('.about-statement', {
        xPercent: -18,
        scrollTrigger: { trigger: section.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
      gsap.to('.about .signature-shape', {
        xPercent: 50,
        yPercent: -25,
        rotation: -80,
        scrollTrigger: { trigger: section.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 },
      });
      gsap.from('.about-rule', {
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.about-rule', start: 'top 85%' },
      });
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="about" className="about" ref={section}>
      <div className="section-head"><span>02 / ABOUT</span><span>01—02</span></div>
      <div className="about-statement">
        {statement.split(' ').map((word, i) => <span className="about-word" key={i}>{word}</span>)}
      </div>
      <div className="about-bottom">
        <div className="about-copy">
          <p className="eyebrow">THE SHORT VERSION</p>
          <p>I’m interested in the space where engineering, interface design and motion meet. I like useful products that also have a point of view.</p>
        </div>
        <div className="about-index">03<br />/ BUILDING</div>
      </div>
      <div className="about-rule" />
      <SignatureShape />
    </section>
  );
}
