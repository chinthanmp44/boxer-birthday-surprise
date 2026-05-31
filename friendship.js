// Page 4: Friendship memories UI behaviors
(() => {
  const els = Array.from(document.querySelectorAll('[data-reveal]'));
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    els.forEach(el => {
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    });
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .7s ease, transform .7s ease';
      io.observe(el);
    });
  }

  // Lightweight tilt polish on gallery
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  gallery.addEventListener('mousemove', (e) => {
    const r = gallery.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -8;
    const ry = (px - 0.5) * 10;
    gallery.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;
  });

  gallery.addEventListener('mouseleave', () => {
    gallery.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  });
})();

