/* ===== DINERLY - Hero Video Lifecycle & Controls ===== */
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.getElementById('top');
    const heroVideo = document.getElementById('heroVideo');
    const soundToggle = document.getElementById('soundToggle');

    if (!heroVideo || !heroSection) return;

    // Helper: enable static poster mode
    function enableStaticMode() {
      heroSection.classList.add('hero--static');
      if (heroVideo) {
        heroVideo.pause();
      }
      if (soundToggle) {
        soundToggle.style.display = 'none';
      }
    }

    // 1. Check reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      enableStaticMode();
      return;
    }

    // 2. Check Data Saver & Network Speed
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (conn) {
      if (conn.saveData === true || ['slow-2g', '2g'].includes(conn.effectiveType)) {
        heroVideo.setAttribute('preload', 'none');
        enableStaticMode();
        return;
      }
    }

    // Ensure muted for browser autoplay policy compliance
    heroVideo.muted = true;
    heroVideo.playsInline = true;

    // 3. Fade in video when playable
    function revealVideo() {
      heroVideo.classList.add('is-playing');
    }

    if (heroVideo.readyState >= 2) {
      revealVideo();
    } else {
      heroVideo.addEventListener('canplay', revealVideo);
      heroVideo.addEventListener('loadeddata', revealVideo);
    }

    // 4. Autoplay Guard
    const startPlayback = () => {
      heroVideo.muted = true;
      const playPromise = heroVideo.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          heroVideo.classList.add('is-playing');
        }).catch(err => {
          console.warn('Hero video autoplay blocked, falling back to static poster:', err);
          enableStaticMode();
        });
      }
    };

    startPlayback();

    // 5. Error & Stalled handling
    heroVideo.addEventListener('error', () => {
      console.warn('Hero video error encountered');
      enableStaticMode();
    });

    // 6. Pause when out of viewport
    if ('IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!heroSection.classList.contains('hero--static')) {
            if (entry.isIntersecting) {
              heroVideo.play().catch(() => {});
            } else {
              heroVideo.pause();
            }
          }
        });
      }, { threshold: 0.1 });

      heroObserver.observe(heroSection);
    }

    // 7. Pause on tab blur
    document.addEventListener('visibilitychange', () => {
      if (!heroSection.classList.contains('hero--static')) {
        if (document.hidden) {
          heroVideo.pause();
        } else {
          heroVideo.play().catch(() => {});
        }
      }
    });

    // 8. Sound Toggle Button Logic
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
        const isMuted = heroVideo.muted;
        heroVideo.muted = !isMuted;
        soundToggle.setAttribute('aria-pressed', String(!isMuted));
        soundToggle.setAttribute('aria-label', !isMuted ? 'Unmute background video' : 'Mute background video');

        const iconOn = soundToggle.querySelector('.icon-speaker-on');
        const iconOff = soundToggle.querySelector('.icon-speaker-off');
        if (iconOn && iconOff) {
          if (heroVideo.muted) {
            iconOff.style.display = 'block';
            iconOn.style.display = 'none';
          } else {
            iconOff.style.display = 'none';
            iconOn.style.display = 'block';
          }
        }
      });
    }
  });
})();
