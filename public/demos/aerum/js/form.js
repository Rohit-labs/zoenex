/**
 * AERUM Contact Form Validation & Masking (English Locale)
 */
(function () {
  'use strict';

  function initForm() {
    const contactForm = document.getElementById('contact-form');
    const formContainer = document.getElementById('contact-form-container');
    const successPanel = document.getElementById('contact-success-panel');
    const phoneInput = document.getElementById('phone-input');
    const nameInput = document.getElementById('name-input');
    const projectInput = document.getElementById('project-input');
    const submitBtn = document.getElementById('submit-btn');

    if (!contactForm || !phoneInput) return;

    // ----- Phone Input Format (+1 (___) ___-____) -----
    function formatPhone(value) {
      let digits = value.replace(/\D/g, '');
      if (!digits) return '';

      // Normalize if started with 1 or 7
      if (digits.startsWith('1') || digits.startsWith('7')) {
        digits = digits.substring(1);
      }

      digits = digits.substring(0, 10);

      let formatted = '+1';
      if (digits.length > 0) {
        formatted += ' (' + digits.substring(0, 3);
      }
      if (digits.length >= 3) {
        formatted += ') ' + digits.substring(3, 6);
      }
      if (digits.length >= 6) {
        formatted += '-' + digits.substring(6, 10);
      }

      return formatted;
    }

    phoneInput.addEventListener('input', (e) => {
      const formatted = formatPhone(e.target.value);
      e.target.value = formatted;

      clearFieldError(phoneInput);
    });

    phoneInput.addEventListener('focus', () => {
      if (!phoneInput.value) {
        phoneInput.value = '+1 (';
      }
    });

    phoneInput.addEventListener('blur', () => {
      if (phoneInput.value === '+1 (' || phoneInput.value === '+1') {
        phoneInput.value = '';
        clearFieldError(phoneInput);
      }
    });

    nameInput.addEventListener('input', () => {
      clearFieldError(nameInput);
    });

    // ----- Error Handling Helpers -----
    function showFieldError(inputEl, message) {
      inputEl.classList.add('is-invalid');
      const formGroup = inputEl.closest('.form-group');
      if (!formGroup) return;

      let errorEl = formGroup.querySelector('.field-error');
      if (!errorEl) {
        errorEl = document.createElement('div');
        errorEl.className = 'field-error';
        errorEl.setAttribute('aria-live', 'polite');
        formGroup.appendChild(errorEl);
      }
      errorEl.textContent = message;
    }

    function clearFieldError(inputEl) {
      inputEl.classList.remove('is-invalid');
      const formGroup = inputEl.closest('.form-group');
      if (!formGroup) return;

      const errorEl = formGroup.querySelector('.field-error');
      if (errorEl) {
        errorEl.remove();
      }
    }

    // ----- Form Submission -----
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Validate Name (>= 2 chars)
      const nameVal = nameInput.value.trim();
      if (!nameVal || nameVal.length < 2) {
        showFieldError(nameInput, 'Please enter your name');
        isValid = false;
      } else {
        clearFieldError(nameInput);
      }

      // Validate Phone (must have at least 10 digits filled)
      const phoneDigits = phoneInput.value.replace(/\D/g, '');
      if (!phoneDigits || phoneDigits.length < 10) {
        showFieldError(phoneInput, 'Please enter full phone number');
        isValid = false;
      } else {
        clearFieldError(phoneInput);
      }

      if (!isValid) return;

      // Show 700ms loading state on button
      const badgeIcon = submitBtn.querySelector('.badge-icon');
      const originalBadgeHtml = badgeIcon ? badgeIcon.innerHTML : '';
      submitBtn.disabled = true;

      if (badgeIcon) {
        badgeIcon.innerHTML = '<span class="spinner-icon" aria-hidden="true"></span>';
      }

      const payload = {
        name: nameVal,
        phone: phoneInput.value,
        project: projectInput ? projectInput.value.trim() : ''
      };

      setTimeout(() => {
        console.info('AERUM Contact Form Submission Payload:', payload);

        // Hide form container and show success panel
        if (formContainer && successPanel) {
          formContainer.style.display = 'none';
          successPanel.style.display = 'flex';
          successPanel.focus();
        }

        submitBtn.disabled = false;
        if (badgeIcon) {
          badgeIcon.innerHTML = originalBadgeHtml;
        }
      }, 700);
    });

    // ----- Reset Form Handler -----
    const resetBtn = document.getElementById('reset-form-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        contactForm.reset();
        clearFieldError(nameInput);
        clearFieldError(phoneInput);

        if (formContainer && successPanel) {
          successPanel.style.display = 'none';
          formContainer.style.display = 'grid';
          nameInput.focus();
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForm);
  } else {
    initForm();
  }
})();
