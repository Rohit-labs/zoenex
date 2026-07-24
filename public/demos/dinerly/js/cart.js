/* ===== DINERLY - Optimal In-Memory Cart & Checkout Logic ===== */
(function() {
  'use strict';

  const STORAGE_KEY = 'dinerly_cart_v1';
  const FREE_SHIPPING_THRESHOLD = 40.00;
  const TAX_RATE = 0.0825; // 8.25%
  const BASE_DELIVERY_FEE = 3.99;

  let cart = loadCartState();

  function loadCartState() {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCartState() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      // Memory fallback in restricted preview
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    const cartTrigger = document.getElementById('cartTrigger');
    const cartBadge = document.getElementById('cartBadge');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartBackdrop = document.getElementById('cartBackdrop');
    const cartClose = document.getElementById('cartClose');
    const cartBody = document.getElementById('cartBody');
    const cartSubtotalVal = document.getElementById('cartSubtotalVal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const toast = document.getElementById('toast');
    const checkoutModal = document.getElementById('checkoutModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');

    // 1. Add to Cart delegation
    document.addEventListener('click', (e) => {
      const addBtn = e.target.closest('.btn-add-cart');
      if (addBtn) {
        e.preventDefault();
        const id = addBtn.dataset.id;
        const name = addBtn.dataset.name;
        const price = parseFloat(addBtn.dataset.price);

        addToCart(id, name, price);
        showToast(`${name} added to cart`);

        // Visual button feedback on dish row
        const originalText = addBtn.textContent;
        addBtn.classList.add('is-added');
        addBtn.textContent = '✓ ADDED';
        setTimeout(() => {
          addBtn.classList.remove('is-added');
          addBtn.textContent = originalText;
        }, 1200);
      }
    });

    function addToCart(id, name, price) {
      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ id, name, price, qty: 1 });
      }
      saveCartState();
      updateCartUI();
      animateBadge();
    }

    function updateQuantity(id, delta) {
      const item = cart.find(item => item.id === id);
      if (!item) return;
      item.qty += delta;
      if (item.qty <= 0) {
        cart = cart.filter(i => i.id !== id);
      }
      saveCartState();
      updateCartUI();
    }

    function removeItem(id) {
      cart = cart.filter(i => i.id !== id);
      saveCartState();
      updateCartUI();
    }

    function clearCart() {
      cart = [];
      saveCartState();
      updateCartUI();
      showToast('Cart cleared');
    }

    if (clearCartBtn) {
      clearCartBtn.addEventListener('click', clearCart);
    }

    function animateBadge() {
      if (!cartBadge) return;
      cartBadge.classList.add('pop');
      setTimeout(() => cartBadge.classList.remove('pop'), 300);
    }

    function updateCartUI() {
      const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      const tax = subtotal * TAX_RATE;
      const deliveryFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : BASE_DELIVERY_FEE;
      const grandTotal = subtotal + tax + deliveryFee;

      // Badge
      if (cartBadge) {
        cartBadge.textContent = totalCount;
      }

      // Subtotal header display
      if (cartSubtotalVal) {
        cartSubtotalVal.textContent = `$${grandTotal.toFixed(2)}`;
      }

      if (!cartBody) return;

      if (cart.length === 0) {
        cartBody.innerHTML = `
          <div class="cart-empty-msg" style="padding-block:40px;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" stroke-width="1.5" style="margin-bottom:12px;"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <p>Your cart is empty.</p>
            <a href="#menu" class="btn btn--ghost" style="margin-top:16px; font-size:11px; padding:10px 20px;" onclick="document.getElementById('cartClose').click();">EXPLORE MENU</a>
          </div>
        `;
        return;
      }

      // Free Shipping Progress Bar calculation
      const neededForFree = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
      const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
      const shippingMessage = neededForFree === 0 
        ? `<strong style="color:var(--gold);">You unlocked FREE delivery! 🎉</strong>` 
        : `Add <strong>$${neededForFree.toFixed(2)}</strong> more for FREE delivery`;

      cartBody.innerHTML = `
        <div class="cart-shipping-bar">
          <div class="cart-shipping-text">
            <span>${shippingMessage}</span>
            <span>$${FREE_SHIPPING_THRESHOLD.toFixed(0)} goal</span>
          </div>
          <div class="cart-shipping-progress">
            <div class="cart-shipping-fill" style="width: ${progressPercent}%"></div>
          </div>
        </div>

        <div class="cart-items-list" style="display:flex; flex-direction:column; gap:12px;">
          ${cart.map(item => `
            <div class="cart-item">
              <div class="cart-item__info">
                <span class="cart-item__name">${escapeHTML(item.name)}</span>
                <span class="cart-item__price">$${(item.price * item.qty).toFixed(2)} <small style="color:var(--text-3);">($${item.price.toFixed(2)} ea)</small></span>
              </div>
              <div class="cart-item__actions">
                <div class="qty-stepper">
                  <button class="qty-btn btn-qty-minus" data-id="${item.id}" aria-label="Decrease quantity">-</button>
                  <span class="qty-val">${item.qty}</span>
                  <button class="qty-btn btn-qty-plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
                </div>
                <button class="cart-remove-btn btn-remove-item" data-id="${item.id}" aria-label="Remove item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="cart-breakdown" style="margin-top:16px;">
          <div class="cart-breakdown-row">
            <span>Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
          </div>
          <div class="cart-breakdown-row">
            <span>Estimated Tax (8.25%)</span>
            <span>$${tax.toFixed(2)}</span>
          </div>
          <div class="cart-breakdown-row">
            <span>Delivery Fee</span>
            <span>${deliveryFee === 0 ? '<span style="color:var(--gold);">FREE</span>' : `$${deliveryFee.toFixed(2)}`}</span>
          </div>
          <div class="cart-breakdown-row cart-breakdown-row--total">
            <span>Total</span>
            <span style="color:var(--gold);">$${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      `;

      // Attach stepper & remove event listeners
      cartBody.querySelectorAll('.btn-qty-minus').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(btn.dataset.id, -1));
      });
      cartBody.querySelectorAll('.btn-qty-plus').forEach(btn => {
        btn.addEventListener('click', () => updateQuantity(btn.dataset.id, 1));
      });
      cartBody.querySelectorAll('.btn-remove-item').forEach(btn => {
        btn.addEventListener('click', () => removeItem(btn.dataset.id));
      });
    }

    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
      );
    }

    // Toast
    let toastTimer = null;
    function showToast(message) {
      if (!toast) return;
      toast.textContent = message;
      toast.classList.add('is-show');
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('is-show');
      }, 2500);
    }

    // Drawer Toggles
    function openDrawer() {
      if (!cartDrawer || !cartBackdrop) return;
      cartDrawer.classList.add('is-open');
      cartBackdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      cartDrawer.setAttribute('aria-hidden', 'false');
      if (cartClose) cartClose.focus();
    }

    function closeDrawer() {
      if (!cartDrawer || !cartBackdrop) return;
      cartDrawer.classList.remove('is-open');
      cartBackdrop.classList.remove('is-open');
      document.body.style.overflow = '';
      cartDrawer.setAttribute('aria-hidden', 'true');
      if (cartTrigger) cartTrigger.focus();
    }

    if (cartTrigger) cartTrigger.addEventListener('click', openDrawer);
    if (cartClose) cartClose.addEventListener('click', closeDrawer);
    if (cartBackdrop) cartBackdrop.addEventListener('click', closeDrawer);

    // Checkout Modal
    if (checkoutBtn && checkoutModal) {
      checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
          showToast('Add items to cart first');
          return;
        }
        closeDrawer();

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        const tax = subtotal * TAX_RATE;
        const deliveryFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : BASE_DELIVERY_FEE;
        const grandTotal = subtotal + tax + deliveryFee;

        // Render detailed order summary inside modal
        const modalContent = checkoutModal.querySelector('.modal-content');
        if (modalContent) {
          modalContent.innerHTML = `
            <div class="form-success-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
            <h3 style="font-family:var(--font-display); color:var(--text); font-size:18px;">DEMO CHECKOUT SUMMARY</h3>
            
            <div style="width:100%; text-align:left; background:var(--bg); border:1px solid var(--line); border-radius:var(--r-xs); padding:16px; font-size:13px; margin-block:8px;">
              <div style="font-weight:600; color:var(--gold); margin-bottom:8px; border-bottom:1px solid var(--line); padding-bottom:6px;">ORDER ITEMS (${cart.reduce((s, i) => s + i.qty, 0)})</div>
              ${cart.map(i => `<div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>${i.qty}x ${escapeHTML(i.name)}</span><span>$${(i.price * i.qty).toFixed(2)}</span></div>`).join('')}
              <div style="border-top:1px solid var(--line); margin-top:8px; padding-top:6px; display:flex; justify-content:space-between; font-weight:700; color:var(--text);">
                <span>TOTAL ESTIMATE</span>
                <span style="color:var(--gold);">$${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <p style="color:var(--text-2); font-size:13px; line-height:1.5;">Frontend demo mode — payments and server API are intentionally disconnected.</p>
            <button class="btn btn--primary btn--full" id="modalCloseBtn">CLOSE ORDER DEMO</button>
          `;

          const newClose = modalContent.querySelector('#modalCloseBtn');
          if (newClose) {
            newClose.addEventListener('click', () => {
              checkoutModal.classList.remove('is-open');
            });
          }
        }

        checkoutModal.classList.add('is-open');
      });
    }

    if (modalCloseBtn && checkoutModal) {
      modalCloseBtn.addEventListener('click', () => {
        checkoutModal.classList.remove('is-open');
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (cartDrawer && cartDrawer.classList.contains('is-open')) closeDrawer();
        if (checkoutModal && checkoutModal.classList.contains('is-open')) checkoutModal.classList.remove('is-open');
      }
    });

    updateCartUI();
  });
})();
