/* ===== DINERLY - Optimal Book Table & Reservation Logic ===== */
(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initReservationForm();
    initNewsletterForm();
  });

  /* -------------------------------------------------------------
     1. RESERVATION / BOOK TABLE LOGIC
  ------------------------------------------------------------- */
  function initReservationForm() {
    const form = document.getElementById('reservationForm');
    const formWrapper = document.getElementById('reservationFormWrapper');
    if (!form || !formWrapper) return;

    const nameInput = document.getElementById('resName');
    const phoneInput = document.getElementById('resPhone');
    const emailInput = document.getElementById('resEmail');
    const dateInput = document.getElementById('resDate');
    const timeInput = document.getElementById('resTime');
    const guestsSelect = document.getElementById('resGuests');
    const seatingIndicator = document.getElementById('seatingIndicator');
    const timeSlotContainer = document.getElementById('timeSlots');
    const submitBtn = form.querySelector('button[type="submit"]');

    // 1. Datepicker bounds (Today -> +30 days)
    if (dateInput) {
      const today = new Date();
      const maxDate = new Date();
      maxDate.setDate(today.getDate() + 30);

      dateInput.setAttribute('min', today.toISOString().split('T')[0]);
      dateInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
    }

    // 2. Dynamic Seating Type Indicator based on Guest Count
    if (guestsSelect && seatingIndicator) {
      guestsSelect.addEventListener('change', () => {
        const val = parseInt(guestsSelect.value, 10);
        if (isNaN(val)) {
          seatingIndicator.style.display = 'none';
          return;
        }
        seatingIndicator.style.display = 'inline-flex';
        if (val <= 2) {
          seatingIndicator.innerHTML = `🪑 <strong>Romantic Booth Table</strong> (Cozy ambience)`;
        } else if (val <= 4) {
          seatingIndicator.innerHTML = `🪑 <strong>Standard Dining Table</strong> (Main dining hall)`;
        } else {
          seatingIndicator.innerHTML = `🍷 <strong>Chef's Large Family Table</strong> (Spacious seating)`;
        }
      });
    }

    // 3. Quick Time Slot Pills selector
    if (timeSlotContainer && timeInput) {
      const pills = timeSlotContainer.querySelectorAll('.time-pill');
      pills.forEach(pill => {
        pill.addEventListener('click', (e) => {
          e.preventDefault();
          pills.forEach(p => p.classList.remove('is-selected'));
          pill.classList.add('is-selected');
          timeInput.value = pill.dataset.time;
          if (hasAttemptedSubmit) checkFormValidity();
        });
      });
    }

    let hasAttemptedSubmit = false;

    function validateField(input, testFn, errorMsg) {
      const parent = input.closest('.form-group') || input.parentElement;
      let errorEl = parent.querySelector('.field-error');

      if (!testFn(input.value.trim())) {
        input.classList.add('is-invalid');
        if (!errorEl) {
          errorEl = document.createElement('span');
          errorEl.className = 'field-error';
          errorEl.setAttribute('role', 'alert');
          parent.appendChild(errorEl);
        }
        errorEl.textContent = errorMsg;
        input.setAttribute('aria-invalid', 'true');
        return false;
      } else {
        input.classList.remove('is-invalid');
        input.removeAttribute('aria-invalid');
        if (errorEl) {
          errorEl.remove();
        }
        return true;
      }
    }

    function checkFormValidity() {
      const isNameValid = validateField(nameInput, val => val.length >= 2, 'Please enter your name (at least 2 characters).');
      const isPhoneValid = validateField(phoneInput, val => /^[\d\s()+-]{7,}$/.test(val), 'Please enter a valid phone number.');
      const isEmailValid = validateField(emailInput, val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), 'Please enter a valid email address.');
      
      const isDateValid = validateField(dateInput, val => {
        if (!val) return false;
        const selected = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today;
      }, 'Please select a valid future or current date.');

      const isTimeValid = validateField(timeInput, val => val !== '', 'Please select a reservation time.');
      const isGuestsValid = validateField(guestsSelect, val => val !== '', 'Please select party size.');

      return isNameValid && isPhoneValid && isEmailValid && isDateValid && isTimeValid && isGuestsValid;
    }

    const inputs = [nameInput, phoneInput, emailInput, dateInput, timeInput, guestsSelect];
    inputs.forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          if (hasAttemptedSubmit) checkFormValidity();
        });
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      hasAttemptedSubmit = true;

      if (!checkFormValidity()) return;

      const randomRef = 'DINER-' + Math.floor(10000 + Math.random() * 90000);
      const guestCount = guestsSelect.value;
      const seatingText = guestCount <= 2 ? 'Romantic Booth' : (guestCount <= 4 ? 'Standard Table' : "Chef's Family Table");

      const payload = {
        ref: randomRef,
        name: nameInput.value.trim(),
        phone: phoneInput.value.trim(),
        email: emailInput.value.trim(),
        date: dateInput.value,
        time: timeInput.value,
        guests: guestCount,
        seating: seatingText,
        specialRequests: document.getElementById('resRequests')?.value.trim() || 'None'
      };

      console.info('Reservation Submitted Successfully:', payload);

      submitBtn.disabled = true;
      submitBtn.textContent = 'CONFIRMING TABLE...';

      setTimeout(() => {
        // Render rich detailed confirmation receipt card
        formWrapper.innerHTML = `
          <div class="res-card" role="region" aria-live="polite">
            <div class="res-card__header">
              <div>
                <span class="lockup__eyebrow" style="font-size:22px;">Table Confirmed</span>
                <h3 class="form-success-title" style="margin:0;">RESERVATION RECEIPT</h3>
              </div>
              <span class="res-card__ref">${payload.ref}</span>
            </div>

            <p style="font-size:13px; color:var(--text-2); margin-top:-6px;">We have received your table request. A confirmation SMS will be sent to <strong>${escapeHTML(payload.phone)}</strong>.</p>

            <div class="res-card__details">
              <div class="res-card__detail-item">
                <label>GUEST NAME</label>
                <span>${escapeHTML(payload.name)}</span>
              </div>
              <div class="res-card__detail-item">
                <label>PARTY SIZE</label>
                <span>${payload.guests} ${payload.guests === '1' ? 'Person' : 'Guests'}</span>
              </div>
              <div class="res-card__detail-item">
                <label>DATE & TIME</label>
                <span>${payload.date} at ${payload.time}</span>
              </div>
              <div class="res-card__detail-item">
                <label>SEATING TYPE</label>
                <span>${payload.seating}</span>
              </div>
              <div class="res-card__detail-item" style="grid-column:span 2;">
                <label>SPECIAL REQUESTS</label>
                <span>${escapeHTML(payload.specialRequests)}</span>
              </div>
            </div>

            <div style="display:flex; gap:12px; margin-top:8px;">
              <a href="#" id="resResetLink" class="btn btn--ghost" style="flex-grow:1; font-size:11px; padding:12px 18px;">BOOK ANOTHER TABLE</a>
              <button class="btn btn--primary" onclick="window.print()" style="font-size:11px; padding:12px 18px;">PRINT RECEIPT</button>
            </div>
          </div>
        `;

        const resetLink = document.getElementById('resResetLink');
        if (resetLink) {
          resetLink.addEventListener('click', (re) => {
            re.preventDefault();
            location.reload();
          });
        }
      }, 700);
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  /* -------------------------------------------------------------
     2. NEWSLETTER FORM
  ------------------------------------------------------------- */
  function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    const emailInput = document.getElementById('newsletterEmail');
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        emailInput.style.borderColor = '#C4553F';
        return;
      }

      emailInput.style.borderColor = '';
      submitBtn.disabled = true;
      submitBtn.textContent = 'SUBSCRIBING...';

      setTimeout(() => {
        form.innerHTML = `<p style="color:var(--gold); font-weight:600; padding:12px 16px;">Thanks &mdash; check your inbox to confirm.</p>`;
      }, 600);
    });
  }
})();
