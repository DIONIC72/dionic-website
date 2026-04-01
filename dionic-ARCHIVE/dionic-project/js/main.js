/* ============================================================
   DIONIC — main.js
   All interactive behaviour. No dependencies required.
   ============================================================ */

/* ── Cursor Glow ── */
(function () {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.matchMedia('(pointer: coarse)').matches) return;
  let mx = 0, my = 0, cx = 0, cy = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function anim() {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    requestAnimationFrame(anim);
  })();
})();

/* ── Hero Canvas Particles ── */
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const N = 50;
  const COLORS = ['rgba(232,168,32,', 'rgba(196,30,48,'];

  function resize() { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; }
  window.addEventListener('resize', resize, { passive: true });
  resize();

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w; this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.4; this.vy = (Math.random() - 0.5) * 0.4;
      this.r = Math.random() * 2 + 1;
      this.color = COLORS[Math.floor(Math.random() * 2)];
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > w || this.y < 0 || this.y > h) this.reset(); }
    draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2); ctx.fillStyle = this.color + this.alpha + ')'; ctx.fill(); }
  }

  for (let i = 0; i < N; i++) particles.push(new Particle());

  function drawLines() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(232,168,32,' + (0.06 * (1 - dist / 120)) + ')';
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      }
    }
  }

  (function loop() { ctx.clearRect(0, 0, w, h); particles.forEach(p => { p.update(); p.draw(); }); drawLines(); requestAnimationFrame(loop); })();
})();

/* ── Navbar Scroll State ── */
(function () {
  const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 60), { passive: true });
})();

/* ── Theme Toggle ── */
(function () {
  const btn  = document.getElementById('themeToggle');
  const html = document.documentElement;
  html.setAttribute('data-theme', 'dark'); // default
  if (!btn) return;
  btn.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
})();

/* ── Mobile Menu ── */
(function () {
  const btn  = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');
  if (!btn || !menu) return;
  function toggle(open) {
    btn.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  btn.addEventListener('click', () => toggle(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') toggle(false); });
})();

/* ── Scroll Reveal ── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach(el => el.classList.add('visible')); return; }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
})();

/* ── Mission Word Reveal ── */
(function () {
  const container = document.getElementById('missionText');
  if (!container) return;
  const mission = 'To redefine the creative landscape by fostering a synergy between human intuition and agentic intelligence, making world-class strategy accessible through automated precision.';
  const highlights = {
    'redefine': 'hl-crimson', 'synergy': 'hl-gold', 'human': 'hl-gold',
    'intuition': 'hl-gold', 'agentic': 'hl-crimson', 'intelligence,': 'hl-crimson',
    'world-class': 'hl-gold', 'automated': 'hl-crimson', 'precision.': 'hl-crimson'
  };
  container.innerHTML = mission.split(' ').map((w, i) => {
    const cls = highlights[w] || highlights[w.toLowerCase()] || '';
    return `<span class="word ${cls}" style="transition-delay:${i * 0.04}s">${w} </span>`;
  }).join('');

  if (!('IntersectionObserver' in window)) { container.querySelectorAll('.word').forEach(w => w.classList.add('visible')); return; }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { container.querySelectorAll('.word').forEach(w => w.classList.add('visible')); obs.unobserve(e.target); } });
  }, { threshold: 0.3 });
  obs.observe(container);
})();

/* ── Contact Form Submission ── */
(function () {
  const form = document.getElementById('pitchForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const data = Object.fromEntries(new FormData(form));
    btn.textContent = 'Sending…';
    btn.disabled = true;

    try {
      /* ── Endpoint options (uncomment one when dionic.ca is live) ──
         Option A: Netlify Forms (add netlify attribute to <form>)
         Option B: Formspree — replace URL below with your Formspree endpoint
         Option C: Custom serverless function at /api/contact
         Currently: logs to console in dev, alerts user ── */

      // await fetch('https://formspree.io/f/YOUR_ID', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
      // await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });

      console.log('[Dionic] Form submission:', data);

      // Success state
      form.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;gap:1rem;padding:2rem;text-align:center;">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E8A820" stroke-width="1.5" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
          <p style="font-family:var(--font-display);font-size:var(--text-lg);font-weight:800;text-transform:uppercase;letter-spacing:0.06em;">Message Received</p>
          <p style="color:var(--muted);font-size:var(--text-sm);">We'll be in touch within 24 hours. Keep an eye on your inbox.</p>
        </div>`;
    } catch (err) {
      btn.textContent = 'Send';
      btn.disabled = false;
      console.error('[Dionic] Form error:', err);
    }
  });
})();

/* ── Smooth Scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});
