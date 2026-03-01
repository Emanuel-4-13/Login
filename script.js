document.addEventListener('DOMContentLoaded', () => {
  // ====== Modal ======
  const auth   = document.querySelector('.auth');
  const open   = document.querySelector('.btnLogin-popup');
  const close  = document.querySelectorAll('.close-btn');
  const scrim  = document.querySelector('.scrim');
  const toReg  = document.querySelectorAll('.register-link');
  const toLog  = document.querySelectorAll('.login-link');

  if (open) open.addEventListener('click', () => {
    auth.classList.add('open');
    auth.setAttribute('aria-hidden', 'false');
  });
  if (scrim) scrim.addEventListener('click', () => {
    auth.classList.remove('open','show-register');
    auth.setAttribute('aria-hidden', 'true');
  });
  close.forEach(btn => btn.addEventListener('click', () => {
    auth.classList.remove('open','show-register');
    auth.setAttribute('aria-hidden', 'true');
  }));
  toReg.forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    auth.classList.add('show-register');
  }));
  toLog.forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    auth.classList.remove('show-register');
  }));

  // ====== Música ======
  const music = document.getElementById('bg-music');
  const servicesLink = document.getElementById('nav-services');
  const soundBtn = document.getElementById('sound-btn');

  if (!music) {
    console.error('No se encontró <audio id="bg-music">');
    return;
  }

  music.volume = 0.35;
  music.muted  = true; // autoplay permitido

  // Intentar reproducir tras el primer gesto del usuario
  const tryStart = async () => {
    try { await music.play(); } catch (_) {}
    document.removeEventListener('click', tryStart);
    document.removeEventListener('keydown', tryStart);
  };
  document.addEventListener('click', tryStart);
  document.addEventListener('keydown', tryStart);

  // Mostrar / ocultar el botón de sonido al pulsar Services
  if (servicesLink && soundBtn) {
    servicesLink.addEventListener('click', (e) => {
      e.preventDefault();
      soundBtn.hidden = !soundBtn.hidden;
    });

    // Alternar mute y cambiar icono
    soundBtn.addEventListener('click', async () => {
      if (music.paused) {
        try { await music.play(); } catch (_) {}
      }
      music.muted = !music.muted;
      const icon = soundBtn.querySelector('ion-icon');
      icon.setAttribute('name', music.muted ? 'volume-mute' : 'volume-high');
    });
  } else {
    console.warn('Falta id="nav-services" o id="sound-btn" en el HTML.');
  }
  // ====== Estado de conexión (NO afecta la página) ======
const offlineOverlay = document.getElementById("offline-overlay");

function updateConnectionStatus() {
  if (!navigator.onLine) {
    offlineOverlay.classList.add("show");
  } else {
    offlineOverlay.classList.remove("show");
  }
}

window.addEventListener("offline", updateConnectionStatus);
window.addEventListener("online", updateConnectionStatus);

// Verificar al cargar
updateConnectionStatus();
});
