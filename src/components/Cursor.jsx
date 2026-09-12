import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const d = dot.current;
    const r = ring.current;

    const move = (e) => {
      gsap.to(d, { x: e.clientX, y: e.clientY, duration: 0.08, ease: 'none' });
      gsap.to(r, { x: e.clientX, y: e.clientY, duration: 0.45, ease: 'power3.out' });
    };
    const enter = (e) => {
      const label = e.currentTarget.dataset.cursor || '';
      r.querySelector('span').textContent = label;
      gsap.to(r, { scale: label ? 1.8 : 1.25, duration: 0.3, ease: 'power3.out' });
    };
    const leave = () => {
      r.querySelector('span').textContent = '';
      gsap.to(r, { scale: 1, duration: 0.3 });
    };

    window.addEventListener('mousemove', move);
    const interactive = document.querySelectorAll('[data-cursor]');
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dot} />
      <div className="cursor-ring" ref={ring}><span /></div>
    </>
  );
}
