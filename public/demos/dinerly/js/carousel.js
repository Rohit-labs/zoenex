/* ===== DINERLY - Carousels (Hero Rotator & Testimonials) ===== */
(function() {
  'use strict';

  // Hero Rotator Data
  const HERO_SLIDES = [
    {
      eyebrow: 'Taste the Difference',
      title: 'A JOURNEY THROUGH<br>EXOTIC CUISINE',
      desc: "Every plate starts with produce picked that morning and ends with a recipe we've spent twenty-five years refining. Come hungry."
    },
    {
      eyebrow: 'From Our Kitchen',
      title: 'SLOW COOKED,<br>BOLDLY SERVED',
      desc: "Charcoal grills, cast-iron pans, and a wood oven that hasn't gone cold since 1998. Nothing here is rushed."
    },
    {
      eyebrow: 'Open Late',
      title: 'DINNER THAT<br>RUNS PAST MIDNIGHT',
      desc: "The kitchen stays open until one. Bring the whole table — we'll find room for everyone."
    }
  ];

  // Testimonials Data
  const TESTIMONIAL_SLIDES = [
    {
      quote: "We booked for six and stayed for four hours. Nobody rushed us, the carbonara was the best I've had outside Rome, and the bill was fair. That's the whole review.",
      name: "Elena Marsh",
      role: "Regular since 2019",
      stars: 5,
      avatarKey: "avatar1"
    },
    {
      quote: "I ordered delivery on a Tuesday expecting it to be fine. The pizza arrived still crackling. I don't know how they did that.",
      name: "Daniel Osei",
      role: "Delivery customer",
      stars: 5,
      avatarKey: "avatar2"
    },
    {
      quote: "They remade my sister's dish without being asked because they noticed she'd barely touched it. Small thing. It's why we keep coming back.",
      name: "Priya Raman",
      role: "Table of eight, twice a month",
      stars: 5,
      avatarKey: "avatar3"
    }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    initHeroRotator();
    initTestimonialsCarousel();
  });

  /* -------------------------------------------------------------
     1. HERO ROTATOR
  ------------------------------------------------------------- */
  function initHeroRotator() {
    const heroEyebrow = document.getElementById('heroEyebrow');
    const heroTitle = document.getElementById('heroTitle');
    const heroDesc = document.getElementById('heroDesc');
    const slideWrapper = document.getElementById('heroSlideWrapper');
    const dotsContainer = document.getElementById('heroDots');
    const heroInner = document.querySelector('.hero__inner');

    if (!heroEyebrow || !heroTitle || !heroDesc || !dotsContainer) return;

    let currentIndex = 0;
    let timer = null;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Create dots
    HERO_SLIDES.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `hero__dot ${idx === 0 ? 'is-active' : ''}`;
      dot.setAttribute('aria-label', `Go to hero slide ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.hero__dot');

    function goToSlide(idx) {
      if (idx === currentIndex) return;
      currentIndex = idx;
      updateSlide();
    }

    function updateSlide() {
      const data = HERO_SLIDES[currentIndex];

      if (slideWrapper && !isReducedMotion) {
        slideWrapper.classList.add('is-animating');
        setTimeout(() => {
          heroEyebrow.textContent = data.eyebrow;
          heroTitle.innerHTML = data.title;
          heroDesc.textContent = data.desc;
          slideWrapper.classList.remove('is-animating');
        }, 300);
      } else {
        heroEyebrow.textContent = data.eyebrow;
        heroTitle.innerHTML = data.title;
        heroDesc.textContent = data.desc;
      }

      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === currentIndex);
      });
    }

    function startAutoPlay() {
      if (isReducedMotion) return;
      stopAutoPlay();
      timer = setInterval(() => {
        currentIndex = (currentIndex + 1) % HERO_SLIDES.length;
        updateSlide();
      }, 6500);
    }

    function stopAutoPlay() {
      if (timer) clearInterval(timer);
    }

    if (heroInner) {
      heroInner.addEventListener('mouseenter', stopAutoPlay);
      heroInner.addEventListener('mouseleave', startAutoPlay);
    }

    // Keyboard support when focused in hero
    document.addEventListener('keydown', (e) => {
      if (document.activeElement && heroInner.contains(document.activeElement)) {
        if (e.key === 'ArrowRight') {
          currentIndex = (currentIndex + 1) % HERO_SLIDES.length;
          goToSlide(currentIndex);
        } else if (e.key === 'ArrowLeft') {
          currentIndex = (currentIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
          goToSlide(currentIndex);
        }
      }
    });

    startAutoPlay();
  }

  /* -------------------------------------------------------------
     2. TESTIMONIALS CAROUSEL
  ------------------------------------------------------------- */
  function initTestimonialsCarousel() {
    const quoteEl = document.getElementById('testimonialQuote');
    const nameEl = document.getElementById('testimonialName');
    const roleEl = document.getElementById('testimonialRole');
    const avatarEl = document.getElementById('testimonialAvatar');
    const cardEl = document.getElementById('testimonialCard');
    const dotsContainer = document.getElementById('testimonialDots');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const sliderContainer = document.querySelector('.testimonials-slider');

    if (!quoteEl || !nameEl || !roleEl || !cardEl || !dotsContainer) return;

    let currentIndex = 0;
    let timer = null;
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Create dots
    TESTIMONIAL_SLIDES.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = `slider-dot ${idx === 0 ? 'is-active' : ''}`;
      dot.setAttribute('aria-label', `Go to testimonial ${idx + 1}`);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.slider-dot');

    function goToSlide(idx) {
      if (idx === currentIndex) return;
      currentIndex = idx;
      updateSlide();
    }

    function updateSlide() {
      const data = TESTIMONIAL_SLIDES[currentIndex];

      if (cardEl && !isReducedMotion) {
        cardEl.classList.add('is-animating');
        setTimeout(() => {
          quoteEl.textContent = `“${data.quote}”`;
          nameEl.textContent = data.name;
          roleEl.textContent = data.role;
          if (avatarEl && window.IMAGES && window.IMAGES[data.avatarKey]) {
            avatarEl.src = window.IMAGES[data.avatarKey];
            avatarEl.alt = `${data.name} portrait`;
          }
          cardEl.classList.remove('is-animating');
        }, 250);
      } else {
        quoteEl.textContent = `“${data.quote}”`;
        nameEl.textContent = data.name;
        roleEl.textContent = data.role;
        if (avatarEl && window.IMAGES && window.IMAGES[data.avatarKey]) {
          avatarEl.src = window.IMAGES[data.avatarKey];
          avatarEl.alt = `${data.name} portrait`;
        }
      }

      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === currentIndex);
      });
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + TESTIMONIAL_SLIDES.length) % TESTIMONIAL_SLIDES.length;
      updateSlide();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % TESTIMONIAL_SLIDES.length;
      updateSlide();
    }

    if (prevBtn) prevBtn.addEventListener('click', prevSlide);
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);

    function startAutoPlay() {
      if (isReducedMotion) return;
      stopAutoPlay();
      timer = setInterval(nextSlide, 7000);
    }

    function stopAutoPlay() {
      if (timer) clearInterval(timer);
    }

    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopAutoPlay);
      sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Touch swipe support
    let startX = 0;
    if (sliderContainer) {
      sliderContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
      }, { passive: true });

      sliderContainer.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        if (Math.abs(diffX) > 40) {
          if (diffX > 0) nextSlide();
          else prevSlide();
        }
      }, { passive: true });
    }

    startAutoPlay();
  }
})();
