(() => {
  const counterEl = document.getElementById('photoCounter');
  const tiles = Array.from(document.querySelectorAll('.tile[data-photo]'));

  if (counterEl) counterEl.textContent = String(tiles.length);

  // Scroll reveal
  const revealEls = Array.from(document.querySelectorAll('.reveal'));
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReduced && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // Lightbox
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const closeBtns = Array.from(document.querySelectorAll('[data-close="true"], .lightbox-close'));

  function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = 'Opened memory';
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImg) return;
    lightbox.classList.remove('show');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
  }

  tiles.forEach(tile => {
    tile.addEventListener('click', () => {
      const src = tile.getAttribute('data-photo');
      openLightbox(src);
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => closeLightbox());
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
})();

