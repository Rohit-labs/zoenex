/* ===== DINERLY - Gallery Lightbox Dialog ===== */
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    const galleryTiles = document.querySelectorAll('.gallery-tile');
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxCounter = document.getElementById('lightboxCounter');

    if (!galleryTiles.length || !lightbox || !lightboxImg) return;

    let galleryItems = [];
    let currentIndex = 0;

    // Collect images from tiles
    galleryTiles.forEach((tile, index) => {
      const img = tile.querySelector('img');
      const src = img ? (tile.dataset.fullsrc || img.src) : '';
      const alt = img ? img.alt : `Gallery item ${index + 1}`;
      galleryItems.push({ src, alt });

      tile.addEventListener('click', () => {
        openLightbox(index);
      });

      tile.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(index);
        }
      });
    });

    function openLightbox(index) {
      currentIndex = index;
      updateLightbox();
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (galleryTiles[currentIndex]) {
        galleryTiles[currentIndex].focus();
      }
    }

    function updateLightbox() {
      const item = galleryItems[currentIndex];
      if (!item) return;

      lightboxImg.src = item.src;
      lightboxImg.alt = item.alt;
      if (lightboxCounter) {
        lightboxCounter.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
      }
    }

    function prevItem() {
      currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
      updateLightbox();
    }

    function nextItem() {
      currentIndex = (currentIndex + 1) % galleryItems.length;
      updateLightbox();
    }

    if (lightboxPrev) lightboxPrev.addEventListener('click', prevItem);
    if (lightboxNext) lightboxNext.addEventListener('click', nextItem);
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;

      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        prevItem();
      } else if (e.key === 'ArrowRight') {
        nextItem();
      }
    });
  });
})();
