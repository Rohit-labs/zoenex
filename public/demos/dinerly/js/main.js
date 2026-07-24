/* ===== DINERLY - Centralized Imagery, Header, Scroll & Reveal Logic ===== */

// 1. Centralized Image Repository (24 Assets)
// SWAP FOR REAL FOOD PHOTOGRAPHY:
// unsplash.com -> search "dark food photography", "restaurant interior moody",
// right-click the image -> Copy image address -> paste here,
// then append ?w=1600&q=80&auto=format
window.IMAGES = {
  heroPoster: "assets/video/hero-poster.jpg",
  collageA: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80",
  collageB: "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=600&q=80",
  catSushi: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=1200&q=80",
  catBurger: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
  catRice: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=600&q=80",
  catPork: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
  catOpen: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80",
  chef: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=880",
  dish1: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=300&q=80",
  dish2: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=300&q=80",
  dish3: "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=300&q=80",
  dish4: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=300&q=80",
  dish5: "https://images.unsplash.com/photo-1560008511-11c63416e52d?auto=format&fit=crop&w=300&q=80",
  dish6: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80",
  dish7: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80",
  dish8: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80",
  dish9: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=300&q=80",
  dish10: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80",
  pizza: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
  gal1: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  gal2: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
  gal3: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
  gal4: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
  gal5: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80",
  gal6: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80",
  interior: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=1000",
  avatar1: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  avatar2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  avatar3: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  blog1: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=500",
  blog2: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=500",
  blog3: "https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=500"
};

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initImages();
    initHeader();
    initMobileNav();
    initScrollReveal();
    initScrollSpy();
    initBackToTop();
  });

  /* -------------------------------------------------------------
     2. IMAGE LAZY LOADING, BLUR-UP & ERROR FALLBACK
  ------------------------------------------------------------- */
  function initImages() {
    const images = document.querySelectorAll('img[data-img-key]');

    images.forEach(img => {
      const key = img.dataset.imgKey;
      if (key && window.IMAGES[key]) {
        img.src = window.IMAGES[key];
      }

      // Blur-up transition
      if (!img.complete) {
        img.style.opacity = '0';
        img.style.filter = 'blur(14px)';
        img.style.transition = 'opacity 500ms var(--ease), filter 500ms var(--ease)';

        img.addEventListener('load', () => {
          img.style.opacity = '1';
          img.style.filter = 'blur(0)';
        });
      }

      // Gold Cloche Fallback on Error
      img.addEventListener('error', () => {
        const parent = img.parentElement;
        if (parent) {
          const fallback = document.createElement('div');
          fallback.className = 'img-fallback';
          fallback.style.width = '100%';
          fallback.style.height = '100%';
          fallback.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C8973F" stroke-width="1.5">
              <path d="M12 4v2M4 18h16M4 18a8 8 0 0 1 16 0M12 6a6 6 0 0 1 6 6v6H6v-6a6 6 0 0 1 6-6z"/>
            </svg>
          `;
          img.style.display = 'none';
          parent.appendChild(fallback);
        }
      });
    });
  }

  /* -------------------------------------------------------------
     3. HEADER STICKY BEHAVIOR
  ------------------------------------------------------------- */
  function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.classList.add('is-stuck');
      } else {
        header.classList.remove('is-stuck');
      }
    }, { passive: true });
  }

  /* -------------------------------------------------------------
     4. MOBILE NAVIGATION OVERLAY
  ------------------------------------------------------------- */
  function initMobileNav() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const mobileLinks = mobileNav ? mobileNav.querySelectorAll('.mobile-nav__link') : [];

    if (!hamburgerBtn || !mobileNav) return;

    function openMobileNav() {
      mobileNav.classList.add('is-open');
      mobileNav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (mobileNavClose) mobileNavClose.focus();
    }

    function closeMobileNav() {
      mobileNav.classList.remove('is-open');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      hamburgerBtn.focus();
    }

    hamburgerBtn.addEventListener('click', openMobileNav);
    if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('is-open')) {
        closeMobileNav();
      }
    });
  }

  /* -------------------------------------------------------------
     5. SCROLL REVEAL OBSERVER
  ------------------------------------------------------------- */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (!revealElements.length) return;

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealElements.forEach(el => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');

          // Stagger grid children if requested
          if (entry.target.dataset.stagger) {
            const children = entry.target.children;
            Array.from(children).forEach((child, i) => {
              child.style.transitionDelay = `${i * 70}ms`;
            });
          }

          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -70px 0px' });

    revealElements.forEach(el => observer.observe(el));
  }

  /* -------------------------------------------------------------
     6. SCROLL SPY ACTIVE NAV HIGHLIGHTING
  ------------------------------------------------------------- */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

    if (!sections.length || !navLinks.length) return;

    window.addEventListener('scroll', () => {
      let currentSectionId = '';
      const scrollPos = window.scrollY + 120;

      sections.forEach(section => {
        if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('is-active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('is-active');
        }
      });
    }, { passive: true });
  }

  /* -------------------------------------------------------------
     7. BACK TO TOP BUTTON
  ------------------------------------------------------------- */
  function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        backToTopBtn.classList.add('is-visible');
      } else {
        backToTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
