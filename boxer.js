(() => {
  const pinDisplay = document.getElementById('pin-display');
  const errorToast = document.getElementById('error-toast');

  // Keep existing PIN from earlier implementation
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
    const next = current + String(number);
    pinDisplay.value = next.slice(0, 7);
  };

  window.clearPin = () => {
    if (!pinDisplay) return;
    pinDisplay.value = '';
    errorToast && errorToast.classList.remove('show');
  };

  const smoothUnlock = () => {
    const wrap = document.querySelector('.lock-wrap');
    const layer = document.getElementById('unlock-layer');
    if (layer) layer.classList.add('show');

    // Slight delay for cinematic feel
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 900);
    }).then(() => {
      // Page transition (replace current page)
      window.location.href = 'birthday.html';
    });
  };

  window.checkPin = () => {
    if (!pinDisplay) return;
    const enteredPin = String(pinDisplay.value || '').toString();

    if (enteredPin === correctPassword) {
      smoothUnlock();
      return;
    }

    showError('Wrong PIN! Try again ❤️');
    pinDisplay.value = '';
  };

  // If user types manually, keep UX
  document.addEventListener('keydown', (e) => {
    if (!pinDisplay) return;
    if (e.key >= '0' && e.key <= '9') {
      addNumber(e.key);
    }
    if (e.key === 'Backspace') {
      pinDisplay.value = (pinDisplay.value || '').slice(0, -1);
    }
    if (e.key === 'Enter') {
      checkPin();
    }
  });
})();

