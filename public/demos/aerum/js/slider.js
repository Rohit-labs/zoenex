/**
 * AERUM Hero Carousel Slider
 */
(function () {
  'use strict';

  function initSlider() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    const slides = heroSection.querySelectorAll('.hero-slide');
    const prevBtn = heroSection.querySelector('.hero-ctrl-prev');
    const nextBtn = heroSection.querySelector('.hero-ctrl-next');

    if (!slides.length) return;

    let currentIndex = 0;
    let autoplayTimer = null;
    let touchStartX = 0;
    let touchEndX = 0;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function goToSlide(index) {
      if (index < 0) {
        currentIndex = slides.length - 1;
      } else if (index >= slides.length) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }

      slides.forEach((slide, idx) => {
        const isActive = idx === currentIndex;
        if (isActive) {
          slide.classList.add('is-active');
          slide.setAttribute('aria-hidden', 'false');
        } else {
          slide.classList.remove('is-active');
          slide.setAttribute('aria-hidden', 'true');
        }
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    function startAutoplay() {
      if (isReducedMotion) return;
      stopAutoplay();
      autoplayTimer = setInterval(nextSlide, 6000);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    // Event listeners for controls
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoplay();
      });
    }

    // Pause on hover
    heroSection.addEventListener('mouseenter', stopAutoplay);
    heroSection.addEventListener('mouseleave', startAutoplay);

    // Pause on document hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    // Keyboard navigation when hero is in viewport
    document.addEventListener('keydown', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        prevSlide();
        startAutoplay();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        startAutoplay();
      }
    });

    // Touch swipe gestures
    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const threshold = 30;
      if (touchEndX < touchStartX - threshold) {
        nextSlide();
        startAutoplay();
      } else if (touchEndX > touchStartX + threshold) {
        prevSlide();
        startAutoplay();
      }
    }

    // Initialize initial slide state & start timer
    goToSlide(0);
    startAutoplay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
  } else {
    initSlider();
  }
})();
