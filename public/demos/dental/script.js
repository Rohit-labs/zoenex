/* ============================================
   DENTAL — JavaScript
============================================ */
(function () {
  'use strict';

  var noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. SCROLL REVEAL ---- */
  var revealEls = document.querySelectorAll('.reveal');

  if (!noMotion && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('visible');
          io.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    for (var i = 0; i < revealEls.length; i++) {
      io.observe(revealEls[i]);
    }
  } else {
    for (var i = 0; i < revealEls.length; i++) {
      revealEls[i].classList.add('visible');
    }
  }

  /* ---- 2. NAV ACTIVE STATE ---- */
  var navLinks = document.querySelectorAll('.nav-link');
  var sectionIds = ['hero', 'services', 'about', 'testimonials', 'blog', 'contact'];

  if ('IntersectionObserver' in window) {
    var navIO = new IntersectionObserver(function (entries) {
      for (var j = 0; j < entries.length; j++) {
        if (entries[j].isIntersecting) {
          for (var k = 0; k < navLinks.length; k++) {
            var href = navLinks[k].getAttribute('href');
            if (href === '#' + entries[j].target.id) {
              navLinks[k].classList.add('nav-link--active');
            } else {
              navLinks[k].classList.remove('nav-link--active');
            }
          }
        }
      }
    }, { threshold: 0.3 });

    for (var i = 0; i < sectionIds.length; i++) {
      var el = document.getElementById(sectionIds[i]);
      if (el) navIO.observe(el);
    }
  }

  /* ---- 3. BOOK A CALL → SCROLL ---- */
  var btnBookcall = document.getElementById('btn-bookcall');
  if (btnBookcall) {
    btnBookcall.addEventListener('click', function (e) {
      e.preventDefault();
      var c = document.getElementById('contact');
      if (c) c.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---- 4. FORM SUBMIT ---- */
  var form = document.querySelector('.cta-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('.cta-submit');
      var orig = btn.textContent;
      btn.textContent = 'Booking confirmed ✓';
      btn.style.background = '#2A6F6F';
      setTimeout(function () {
        btn.textContent = orig;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  /* ---- 5. HERO SLIDER (simple auto-advance) ---- */
  var sliderNum = document.querySelector('.hero-slider-num');
  var sliderFill = document.querySelector('.hero-slider-fill');
  var currentSlide = 1;
  var totalSlides = 5;

  if (sliderNum && sliderFill && !noMotion) {
    setInterval(function () {
      currentSlide = (currentSlide % totalSlides) + 1;
      sliderNum.textContent = currentSlide < 10 ? '0' + currentSlide : currentSlide;
      sliderFill.style.width = (currentSlide / totalSlides * 100) + '%';
    }, 4000);
  }

  /* ---- 6. NAV SCROLL EFFECT ---- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var scrollCheck = function () {
      if (window.scrollY > 100) {
        nav.style.background = 'rgba(26,26,26,0.85)';
        nav.style.backdropFilter = 'blur(12px)';
        nav.style.webkitBackdropFilter = 'blur(12px)';
        nav.style.borderRadius = '16px';
        nav.style.margin = '12px';
        nav.style.left = '36px';
        nav.style.right = '36px';
      } else {
        nav.style.background = '';
        nav.style.backdropFilter = '';
        nav.style.webkitBackdropFilter = '';
        nav.style.borderRadius = '';
        nav.style.margin = '';
        nav.style.left = '24px';
        nav.style.right = '24px';
      }
    };
    window.addEventListener('scroll', scrollCheck, { passive: true });
  }

})();
