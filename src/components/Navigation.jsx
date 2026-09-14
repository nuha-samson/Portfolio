import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useMagnetic } from '../hooks/useMagnetic';

const links = [
  ['ABOUT', '#about'],
  ['WORK', '#work'],
  ['PROCESS', '#process'],
  ['CONTACT', '#contact'],
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const logoRef = useMagnetic(0.18);

  useEffect(() => {
    const nav = document.querySelector('.nav');
    const onScroll = () => nav?.classList.toggle('nav-scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="nav">
      <button ref={logoRef} className="nav-logo" data-cursor="TOP" onClick={() => go('#top')}>NUHA</button>
      <div className={`nav-links ${open ? 'is-open' : ''}`}>
        {links.map(([label, href]) => (
          <button key={href} data-cursor="GO" onClick={() => go(href)}>{label}</button>
        ))}
      </div>
      <button className="nav-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
        <span /><span />
      </button>
    </header>
  );
}
