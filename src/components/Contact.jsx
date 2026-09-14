import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SignatureShape from './SignatureShape';
import { useMagnetic } from '../hooks/useMagnetic';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const section = useRef(null);
  const emailRef = useMagnetic(0.18);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from('.contact-word', { yPercent: 120, rotateX: -80, stagger: 0.12, duration: 1.1, ease: 'power4.out', scrollTrigger: { trigger: section.current, start: 'top 70%' } });
      gsap.from('.contact-links', { y: 40, opacity: 0, duration: 0.8, scrollTrigger: { trigger: '.contact-links', start: 'top 85%' } });
      gsap.fromTo('.accent-word', { x: 0, y: 40, opacity: 0, color: 'var(--accent)' }, { x: 50, y: 40, opacity: 1, color: 'var(--text)', duration: 0.8, scrollTrigger: { trigger: '.accent-word', start: 'top 85%' } });
      
      gsap.to('.contact .signature-shape', { rotation: 220, scale: 1.3, xPercent: -35, scrollTrigger: { trigger: section.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="contact" className="contact" ref={section}>
      <div className="section-head">
        <span>07 / CONTACT</span>
        <span>LET'S MAKE SOMETHING</span>
      </div>
      <div className="contact-title">
        <span className="contact-word">LET'S</span>
        <span className="contact-word">BUILD</span>
        <span className="contact-word accent-word">SOMETHING.</span>
      </div>
      <div className="contact-bottom">
        <p>
          Have an idea, a problem worth solving, or a project that needs a
          little more life?
        </p>
        <div className="contact-links">
          <a
            ref={emailRef}
            data-cursor="MAIL"
            href="mailto:nuhaskingdom@gmail.com"
          >
            EMAIL ↗
          </a>
          <a
            data-cursor="GITHUB"
            href="https://github.com/nuha-samson"
            target="_blank"
            rel="noreferrer"
          >
            GITHUB ↗
          </a>
          <a
            data-cursor="LINKEDIN"
            href="https://www.linkedin.com/in/nuha-samson"
          >
            LINKEDIN ↗
          </a>
        </div>
      </div>
      <SignatureShape />
    </section>
  );
}
