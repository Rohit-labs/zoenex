/**
 * AERUM Main JavaScript Module
 */
(function () {
  'use strict';

  // ==========================================
  // 1. CENTRALIZED IMAGES MAP (REAL ESTATE & ARCHITECTURE PHOTOGRAPHY)
  // ==========================================
  const IMAGES = {
    hero1: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    hero2: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    hero3: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80',
    hero4: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80',
    hero5: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1920&q=80',
    hero6: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1920&q=80',
    about: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
    svc1: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80',
    svc2: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80',
    svc3: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=900&q=80',
    svc4: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=900&q=80',
    svc5: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80',
    svc6: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80',
    model60: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1000&q=80',
    model90: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1000&q=80',
    model120: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1000&q=80',
    contact: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=80'
  };

  const IMAGE_METADATA = {
    hero1: { width: 1920, height: 1080, alt: 'Modern luxury modular estate at dusk with floor-to-ceiling glass' },
    hero2: { width: 1920, height: 1080, alt: 'Panoramic glass real estate residence in forest setting' },
    hero3: { width: 1920, height: 1080, alt: 'Illuminated modern modular villa with wooden terrace' },
    hero4: { width: 1920, height: 1080, alt: 'Contemporary glass modular home with warm interior lights' },
    hero5: { width: 1920, height: 1080, alt: 'Sleek minimalist real estate architecture at twilight' },
    hero6: { width: 1920, height: 1080, alt: 'Panoramic mountain backdrop modular real estate estate' },
    about: { width: 1200, height: 558, alt: 'AERUM architectural glass modular home at night' },
    svc1: { width: 900, height: 600, alt: 'Architectural selection and design of modern modular homes' },
    svc2: { width: 900, height: 600, alt: 'Precision factory module production hall' },
    svc3: { width: 900, height: 600, alt: 'On-site module crane installation process' },
    svc4: { width: 900, height: 600, alt: 'Smart HVAC and engineering control system' },
    svc5: { width: 900, height: 600, alt: 'Commercial modular office building pavilion' },
    svc6: { width: 900, height: 600, alt: 'Luxury private residence interior with panoramic nature views' },
    model60: { width: 1000, height: 800, alt: 'Compact AERUM 60 m² modern modular home' },
    model90: { width: 1000, height: 800, alt: 'Spacious AERUM 90 m² real estate home' },
    model120: { width: 1000, height: 800, alt: 'Grand AERUM 120 m² panoramic modular residence' },
    contact: { width: 1000, height: 512, alt: 'Warm luxury living room interior with panoramic windows at sunset' }
  };

  function hydrateImages() {
    const imgElements = document.querySelectorAll('img[data-img-key]');

    imgElements.forEach((img) => {
      const key = img.getAttribute('data-img-key');
      if (!key || !IMAGES[key]) return;

      const meta = IMAGE_METADATA[key] || { width: 800, height: 600, alt: 'AERUM modular home' };

      img.src = IMAGES[key];
      img.setAttribute('width', meta.width);
      img.setAttribute('height', meta.height);
      img.alt = meta.alt;

      if (key === 'hero1') {
        img.setAttribute('fetchpriority', 'high');
      } else {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
      }

      img.classList.add('lazy-load');

      img.onload = () => {
        img.classList.remove('lazy-load');
        img.classList.add('lazy-loaded');
      };

      // Always load a real photo on error instead of showing fallback icon
      img.onerror = () => {
        img.onerror = null;
        img.src = `https://picsum.photos/seed/aerum-realestate-${key}/1000/700`;
        img.classList.remove('lazy-load');
        img.classList.add('lazy-loaded');
        img.style.display = 'block';
      };
    });
  }

  // ==========================================
  // 2. STICKY HEADER SCROLL EFFECT
  // ==========================================
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    function checkScroll() {
      if (window.scrollY > 40) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();
  }

  // ==========================================
  // 3. MOBILE MENU OVERLAY & FOCUS TRAP
  // ==========================================
  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const navLinks = overlay ? overlay.querySelectorAll('.nav-link') : [];

    if (!toggleBtn || !overlay) return;

    let isOpen = false;

    function openMenu() {
      isOpen = true;
      overlay.classList.add('is-active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      toggleBtn.setAttribute('aria-label', 'Close menu');
      document.body.style.overflow = 'hidden';

      // Update icon to X
      toggleBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

      // Focus first nav link
      if (navLinks.length > 0) {
        navLinks[0].focus();
      }
    }

    function closeMenu() {
      isOpen = false;
      overlay.classList.remove('is-active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';

      // Update icon back to hamburger
      toggleBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;

      toggleBtn.focus();
    }

    toggleBtn.addEventListener('click', () => {
      if (isOpen) closeMenu();
      else openMenu();
    });

    // Close on backdrop click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeMenu();
    });

    // Close on link click
    navLinks.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Esc key & trap focus
    document.addEventListener('keydown', (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        closeMenu();
        return;
      }

      if (e.key === 'Tab') {
        const focusables = overlay.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  // ==========================================
  // 4. STAT COUNTERS ANIMATION
  // ==========================================
  function initStatCounters() {
    const statsSection = document.querySelector('.stats-grid');
    if (!statsSection) return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const statElements = [
      { id: 'stat-num-1', target: 12, suffix: '' },
      { id: 'stat-num-2', target: 35, suffix: '%' },
      { id: 'stat-num-3', target: 98, suffix: '%' },
      { id: 'stat-num-4', target: 120, prefix: 'up to ', suffix: ' m²' }
    ];

    let hasAnimated = false;

    function animateStats() {
      if (hasAnimated) return;
      hasAnimated = true;

      if (isReducedMotion) {
        statElements.forEach(item => {
          const el = document.getElementById(item.id);
          if (el) {
            el.textContent = (item.prefix || '') + item.target + item.suffix;
          }
        });
        return;
      }

      const duration = 1200; // ms
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 2);

        statElements.forEach(item => {
          const el = document.getElementById(item.id);
          if (el) {
            const current = Math.floor(easeOut * item.target);
            el.textContent = (item.prefix || '') + current + item.suffix;
          }
        });

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          statElements.forEach(item => {
            const el = document.getElementById(item.id);
            if (el) {
              el.textContent = (item.prefix || '') + item.target + item.suffix;
            }
          });
        }
      }

      requestAnimationFrame(update);
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
  }

  // ==========================================
  // 5. SCROLL REVEAL OBSERVER WITH STAGGER
  // ==========================================
  function initScrollReveal() {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const revealEls = document.querySelectorAll('[data-reveal]');

    if (isReducedMotion) {
      revealEls.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const grids = document.querySelectorAll('.services-grid, .materials-grid, .models-grid, .stats-grid');
    grids.forEach(grid => {
      const children = grid.querySelectorAll('[data-reveal]');
      children.forEach((child, idx) => {
        child.style.transitionDelay = `${idx * 60}ms`;
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  }

  // ==========================================
  // 6. FAQ ACCORDION
  // ==========================================
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');

        // Close other open FAQ items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('is-open');
          const otherTrigger = otherItem.querySelector('.faq-trigger');
          if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ==========================================
  // 7. SCHEDULE A MEETING MODAL
  // ==========================================
  function initMeetingModal() {
    const triggers = document.querySelectorAll('[data-open-meeting-modal]');
    const modal = document.getElementById('meeting-modal');
    const closeBtn = document.getElementById('close-meeting-modal');
    const form = document.getElementById('meeting-form');

    if (!modal) return;

    function openModal() {
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      if (closeBtn) closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    triggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeModal);
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        closeModal();
      }
    });

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Scheduling...';
        }

        setTimeout(() => {
          alert('Meeting successfully scheduled! Our team will contact you to confirm details.');
          form.reset();
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Confirm Schedule';
          }
          closeModal();
        }, 700);
      });
    }
  }

  // ==========================================
  // 8. ENTRANCE SEQUENCE ON LOAD
  // ==========================================
  function triggerEntrance() {
    document.body.classList.add('is-loaded');
  }

  function init() {
    hydrateImages();
    initHeaderScroll();
    initMobileMenu();
    initStatCounters();
    initScrollReveal();
    initFaqAccordion();
    initMeetingModal();
    triggerEntrance();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
