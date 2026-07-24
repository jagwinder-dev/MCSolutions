/**
 * Maverick Consulting Solutions — Static Frontend Module (GitHub Pages)
 * No backend: content is baked into index.html; the contact form opens
 * the visitor's email client via a mailto: link.
 * ES2022+ syntax, no dependencies.
 */

// ── Utilities ──────────────────────────────────────────────────────────────

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

const debounce = (fn, ms) => {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
};

// ── Navbar ─────────────────────────────────────────────────────────────────

const initNavbar = () => {
  const navbar    = $('#navbar');
  const hamburger = $('#hamburger');
  const navLinks  = $('#navLinks');
  const allLinks  = $$('.nav-link');

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    const scrollY = window.scrollY + 100;
    $$('section[id]').forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        allLinks.forEach(a => a.classList.remove('active'));
        $$(`.nav-link[href="#${section.id}"]`).forEach(a => a.classList.add('active'));
      }
    });
  };

  window.addEventListener('scroll', debounce(onScroll, 30), { passive: true });
  onScroll();

  hamburger?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  $$('.has-dropdown').forEach(item => {
    const trigger = item.querySelector('.nav-link');
    trigger?.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        item.classList.toggle('open');
      }
    });
  });

  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
    }
  });

  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = $(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      navLinks.classList.remove('open');
      hamburger?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
};

// ── Scroll Reveal ──────────────────────────────────────────────────────────

const initReveal = () => {
  const observer = new IntersectionObserver(
    entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  $$('.reveal').forEach(el => observer.observe(el));

  $$('.value-card, .service-card, .thought-card, .stat-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
    el.classList.add('reveal');
    observer.observe(el);
  });
};

// ── Contact Form (mailto — no backend) ───────────────────────────────────────

const CONTACT_EMAIL = 'info@maverickconsultingsolutions.com';

const initContactForm = () => {
  const form      = $('#contactForm');
  const feedback  = $('#formFeedback');
  const submitBtn = $('#submitBtn');
  if (!form) return;

  const fields = {
    name:    { el: $('#name'),    errorEl: $('#nameError'),    validate: v => v.trim().length >= 2 ? '' : 'Please enter your name (min 2 characters).' },
    email:   { el: $('#email'),   errorEl: $('#emailError'),   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email address.' },
    message: { el: $('#message'), errorEl: $('#messageError'), validate: v => v.trim().length >= 10 ? '' : 'Message must be at least 10 characters.' },
  };

  Object.values(fields).forEach(({ el, errorEl, validate }) => {
    el?.addEventListener('blur', () => {
      const err = validate(el.value);
      errorEl.textContent = err;
      el.classList.toggle('error', Boolean(err));
    });
    el?.addEventListener('input', () => {
      if (el.classList.contains('error')) {
        const err = validate(el.value);
        errorEl.textContent = err;
        el.classList.toggle('error', Boolean(err));
      }
    });
  });

  const setFeedback = (msg, type) => {
    feedback.textContent = msg;
    feedback.className   = `form-feedback ${type}`;
  };

  form.addEventListener('submit', e => {
    e.preventDefault();

    let hasErrors = false;
    Object.values(fields).forEach(({ el, errorEl, validate }) => {
      const err = validate(el.value);
      errorEl.textContent = err;
      el.classList.toggle('error', Boolean(err));
      if (err) hasErrors = true;
    });
    if (hasErrors) return;

    const name    = $('#name').value.trim();
    const email   = $('#email').value.trim();
    const phone   = $('#phone')?.value.trim() ?? '';
    const subject = $('#subject')?.value.trim() || 'Website enquiry';
    const message = $('#message').value.trim();

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      '',
      message,
    ].filter(l => l !== null).join('\n');

    const mailto = `mailto:${CONTACT_EMAIL}`
      + `?subject=${encodeURIComponent(`[Website Enquiry] ${subject}`)}`
      + `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setFeedback('Opening your email app… if nothing happens, email us directly at ' + CONTACT_EMAIL + '.', 'success');
  });
};

// ── Back to Top ────────────────────────────────────────────────────────────

const initBackToTop = () => {
  const btn = $('#backToTop');
  if (!btn) return;

  window.addEventListener('scroll', debounce(() => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, 50), { passive: true });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
};

// ── Init ───────────────────────────────────────────────────────────────────

const init = () => {
  initNavbar();
  initReveal();
  initContactForm();
  initBackToTop();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
