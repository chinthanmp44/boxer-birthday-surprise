(() => {
  const pinDisplay = document.getElementById('pin-display');
  const errorToast = document.getElementById('error-toast');
  const correctPassword = '1062007';

  const showError = (msg) => {
    if (!errorToast) return;
    errorToast.textContent = msg;
    errorToast.classList.add('show');
    clearTimeout(showError._t);
    showError._t = setTimeout(() => errorToast.classList.remove('show'), 1600);
  };

  window.addNumber = (number) => {
    if (!pinDisplay) return;
    const current = pinDisplay.value || '';
    pinDisplay.value = (current + String(number)).slice(0, 7);
  };

  window.clearPin = () => {
    if (!pinDisplay) return;
    pinDisplay.value = '';
    errorToast && errorToast.classList.remove('show');
  };

  const smoothUnlock = () => {
    const layer = document.getElementById('unlock-layer');
    if (layer) layer.classList.add('show');
    setTimeout(() => {
      window.location.href = 'birthday.html';
    }, 900);
  };

  window.checkPin = () => {
    if (!pinDisplay) return;
    const enteredPin = String(pinDisplay.value || '');
    if (enteredPin === correctPassword) {
      smoothUnlock();
    } else {
      showError('Wrong PIN! Try again ❤️');
      pinDisplay.value = '';
    }
  };

  // Enter, Backspace, numeric typing
  document.addEventListener('keydown', (e) => {
    if (!pinDisplay) return;
    if (e.key >= '0' && e.key <= '9') addNumber(e.key);
    if (e.key === 'Backspace') pinDisplay.value = (pinDisplay.value || '').slice(0, -1);
    if (e.key === 'Enter') checkPin();
  });

  // Birthday -> Love
  const wifeBtn = document.getElementById('wifeBtn');
  if (wifeBtn) wifeBtn.addEventListener('click', () => (window.location.href = 'love.html'));

  // Hearts
  const floatHearts = document.getElementById('float-hearts');
  const spawnHeart = () => {
    if (!floatHearts) return;
    const heart = document.createElement('div');
    heart.textContent = '❤';
    const size = 12 + Math.random() * 16;
    heart.style.position = 'absolute';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${85 + Math.random() * 10}%`;
    heart.style.fontSize = `${size}px`;
    heart.style.color = Math.random() > 0.5 ? 'rgba(255,79,216,.95)' : 'rgba(46,242,255,.9)';
    heart.style.textShadow = '0 0 18px rgba(255,79,216,.35)';
    heart.style.transform = 'translate(-50%, 0)';
    heart.style.opacity = '0.95';
    heart.style.pointerEvents = 'none';
    const dur = 2400 + Math.random() * 1800;
    const drift = (Math.random() * 2 - 1) * 120;

    heart.animate(
      [
        { transform: `translate(-50%, 0) rotate(0deg)`, opacity: 0.95, filter: 'blur(0px)' },
        { transform: `translate(${drift - drift * 0.2}px, -160px) rotate(${Math.random() * 120 - 60}deg)`, opacity: 0.6, filter: 'blur(0.2px)' },
        { transform: `translate(${drift}px, -520px) rotate(${Math.random() * 160 - 80}deg)`, opacity: 0 },
      ],
      { duration: dur, easing: 'cubic-bezier(.2,.9,.2,1)', iterations: 1 }
    );

    floatHearts.appendChild(heart);
    setTimeout(() => heart.remove(), dur + 50);
  };

  const startHearts = () => {
    if (!floatHearts) return;
    const interval = setInterval(() => {
      spawnHeart();
      // occasionally spawn extra
      if (Math.random() > 0.75) setTimeout(spawnHeart, 220);
    }, 380);
    // stop on navigation via unload
    window.addEventListener('beforeunload', () => clearInterval(interval));
  };

  startHearts();

  // Particles canvas
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h, dpr;
  let particles = [];

  const resize = () => {
    dpr = window.devicePixelRatio || 1;
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(90, Math.floor((w * h) / 16000));
    particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() * 2 - 1) * 0.35,
      vy: -0.2 - Math.random() * 0.6,
      r: 1.2 + Math.random() * 2.2,
      a: 0.35 + Math.random() * 0.45,
      c: Math.random() > 0.5 ? '255,79,216' : '122,44,255'
    }));
  };

  const draw = (t) => {
    ctx.clearRect(0, 0, w, h);
    // soft vignette glow
    const grad = ctx.createRadialGradient(w * 0.5, h * 0.2, 0, w * 0.5, h * 0.2, Math.max(w, h));
    grad.addColorStop(0, 'rgba(255,79,216,.10)');
    grad.addColorStop(0.4, 'rgba(122,44,255,.08)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -20) {
        p.y = h + 20;
        p.x = Math.random() * w;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.c},${p.a})`;
      ctx.fill();
    }

    requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener('resize', resize);
  requestAnimationFrame(draw);
})();

