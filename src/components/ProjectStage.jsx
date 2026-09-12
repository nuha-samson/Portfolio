import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/content';
import SignatureShape from './SignatureShape';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

function ProjectVisual({ project }) {
  return (
    <div className={`project-visual project-${project.id}`}>
      <div className="project-screen">
        <div className="mock-browser-bar"><span /><span /><span /></div>
        <div className="mock-content">
          <div className="mock-block mock-block-large" />
          <div className="mock-block-row"><div className="mock-block" /><div className="mock-block" /></div>
          <div className="mock-lines"><i /><i /><i /><i /></div>
        </div>
      </div>
      <div className="project-visual-label">{project.name} / 2026</div>
    </div>
  );
}

function ProjectStage({ project }) {
  const stage = useRef(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage.current,
          start: 'top top',
          end: '+=180%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo('.project-visual', { scale: 0.68, y: 80, rotate: project.id === '01' ? -5 : 5, opacity: 0.4 }, { scale: 1, y: 0, rotate: 0, opacity: 1, duration: 1.1, ease: 'power3.out' })
        .fromTo('.project-index', { x: -120, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55 }, '-=0.7')
        .fromTo('.project-title', { yPercent: 110 }, { yPercent: 0, duration: 0.75, ease: 'power4.out' }, '-=0.5')
        .fromTo('.project-description', { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, '-=0.35')
        .fromTo('.project-tech span', { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.35 }, '-=0.3')
        .to('.project-visual', { scale: 1.12, xPercent: project.id === '01' ? 5 : -5, duration: 0.9, ease: 'power2.inOut' })
        .to('.project-title', { xPercent: project.id === '01' ? -9 : 9, duration: 0.9 }, '<')
        .to('.project-index', { scale: 1.7, opacity: 0.08, duration: 0.9 }, '<')
        .to('.project-info', { yPercent: -10, opacity: 0.35, duration: 0.55 })
        .to('.project-visual', { scale: 0.72, y: -90, opacity: 0.35, duration: 0.9 });

      gsap.to('.project-shape', {
        rotation: project.id === '01' ? 180 : -180,
        xPercent: project.id === '01' ? 70 : -70,
        scrollTrigger: { trigger: stage.current, start: 'top top', end: 'bottom top', scrub: 1 },
      });
    }, stage);
    return () => ctx.revert();
  }, [project.id, reduced]);

  return (
    <article className="project-stage" ref={stage}>
      <div className="project-index">{project.id}</div>
      <div className="project-info">
        <p className="project-kicker">{project.kicker}</p>
        <div className="project-title-wrap"><h3 className="project-title">{project.name}</h3></div>
        <p className="project-description">{project.description}</p>
        <div className="project-tech">{project.tech.map((item) => <span key={item}>{item}</span>)}</div>
        <div className="project-actions">
          <a data-cursor="CODE" href={project.codeUrl} target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a data-cursor="LIVE" href={project.liveUrl} target="_blank" rel="noreferrer">LIVE ↗</a>
        </div>
      </div>
      <ProjectVisual project={project} />
      <div className="project-shape"><SignatureShape /></div>
      <div className="project-counter">SCROLL / {project.id}</div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="projects">
      <div className="projects-intro">
        <div className="section-head"><span>04 / SELECTED WORK</span><span>02 PROJECTS</span></div>
        <h2>THINGS<br /><em>I SHIPPED.</em></h2>
        <p>Two projects. Real problems. Built while learning how to turn ideas into working products.</p>
      </div>
      {projects.map((project) => <ProjectStage key={project.id} project={project} />)}
    </section>
  );
}
