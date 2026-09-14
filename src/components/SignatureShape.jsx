import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

export default function SignatureShape() {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ref.current) return;
    const el = ref.current;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        rotation: 360,
        scale: 1.08,
        duration: 18,
        repeat: -1,
        ease: 'none',
      });
      gsap.to(el, {
        borderRadius: '46% 54% 62% 38% / 42% 38% 62% 58%',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    }, ref);
    return () => ctx.revert();
  }, [reduced]);

  return <div ref={ref} className="signature-shape" aria-hidden="true" />;
}
