(() => {
  // year
  const yr = document.getElementById('yr'); if (yr) yr.textContent = new Date().getFullYear();

  // inline icons
  const ICONS = {
    arrow: '<svg class="icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    ext:   '<svg class="icn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></svg>',
    linkedin:'<svg class="icn" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85V21H9z"/></svg>',
    youtube:'<svg class="icn" viewBox="0 0 24 24" fill="currentColor"><path d="M23 12s0-3.3-.42-4.88a2.55 2.55 0 0 0-1.8-1.8C19.2 4.9 12 4.9 12 4.9s-7.2 0-8.78.42a2.55 2.55 0 0 0-1.8 1.8C1 8.7 1 12 1 12s0 3.3.42 4.88c.23.86.9 1.53 1.8 1.76C4.8 19.1 12 19.1 12 19.1s7.2 0 8.78-.42a2.55 2.55 0 0 0 1.8-1.8C23 15.3 23 12 23 12zM9.75 15.5v-7l6 3.5z"/></svg>'
  };
  document.querySelectorAll('[data-i]').forEach(el => { const k = el.getAttribute('data-i'); if (ICONS[k]) el.outerHTML = ICONS[k]; });

  // header flips to light once scrolled past the dark hero
  const hdr = document.getElementById('hdr');
  const hero = document.querySelector('.hero');
  const threshold = () => (hero ? hero.offsetHeight - 78 : 80);
  const onScroll = () => hdr.classList.toggle('scrolled', window.scrollY > threshold());
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  // mobile menu
  const burger = document.getElementById('burger'), mob = document.getElementById('mobnav');
  if (burger) burger.addEventListener('click', () => {
    const open = hdr.classList.toggle('open');
    burger.setAttribute('aria-expanded', open); mob.hidden = !open;
  });
  if (mob) mob.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hdr.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); mob.hidden = true;
  }));

  // scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-reveal]').forEach((el, i) => {
    el.style.transitionDelay = (Math.min(i % 4, 3) * 70) + 'ms';
    io.observe(el);
  });

  // GenixCore video thumbnails
  const cv = document.getElementById('core-vid'), thumbs = document.getElementById('core-thumbs');
  if (cv && thumbs) thumbs.querySelectorAll('.thumb').forEach(btn => btn.addEventListener('click', () => {
    thumbs.querySelectorAll('.thumb').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    cv.querySelector('source').src = btn.dataset.src;
    cv.load(); cv.play().catch(() => {});
  }));
})();
