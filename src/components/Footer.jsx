export default function Footer() {
  return (
    <footer className="footer">
      <div><strong>NUHA</strong><span>SOFTWARE ENGINEER / CREATIVE DEVELOPER</span></div>
      <button data-cursor="TOP" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑ BACK TO TOP</button>
      <small>© 2026</small>
    </footer>
  );
}
