/* ===== nav scroll state ===== */
const nav = document.getElementById('nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ===== mobile burger ===== */
const burger = document.getElementById('burger');
const links = document.getElementById('navLinks');
if (burger && links) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('x');
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('x');
    links.classList.remove('open');
  }));
}

/* ===== running timecode (24 fps) ===== */
const tc = document.getElementById('tc');
if (tc) {
  let f = 0;
  const pad = n => String(n).padStart(2, '0');
  setInterval(() => {
    f++;
    const frames = f % 24;
    const s = Math.floor(f / 24) % 60;
    const m = Math.floor(f / 24 / 60) % 60;
    const h = Math.floor(f / 24 / 3600) % 24;
    tc.textContent = `${pad(h)}:${pad(m)}:${pad(s)}:${pad(frames)}`;
  }, 1000 / 24);
}

/* ===== scroll reveal ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ===== lightbox (galleries) ===== */
(function () {
  const shots = document.querySelectorAll('.gallery .shot, .video-frame[data-scene]');
  if (!shots.length) return;

  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML =
    '<button class="lb-close" aria-label="Fermer">&times;</button>' +
    '<div class="lb-frame"><div class="scene"></div><div class="lb-cap mono"></div></div>';
  document.body.appendChild(lb);

  const lbScene = lb.querySelector('.scene');
  const lbCap = lb.querySelector('.lb-cap');
  const close = () => { lb.classList.remove('open'); document.body.style.overflow = ''; };

  shots.forEach(s => {
    s.addEventListener('click', () => {
      const sceneEl = s.querySelector('.scene');
      lbScene.className = 'scene ' + (sceneEl ? sceneEl.className.replace('scene', '').trim() : '');
      lbCap.textContent = s.getAttribute('data-cap') || '';
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  lb.querySelector('.lb-close').addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
