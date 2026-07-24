// Maverick Consulting Solutions — shared site behavior (vanilla JS, no dependencies)
document.documentElement.classList.remove('no-js');

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------------------
   Partial include: header & footer are fetched once and injected so
   every page shares one source of truth without a build step.
   --------------------------------------------------------------------- */
async function includePartials() {
  // Site pages are one level deep at most (e.g. /services/servicePhp.html),
  // so "../" for a service page and "" for everything else is all the site
  // ever needs. Computed from the URL rather than hardcoded so the site
  // works unmodified whether it's served at a domain root, under a GitHub
  // Pages project subpath, or from a subfolder anywhere else.
  const root = /\/services\//.test(window.location.pathname) ? '../' : '';

  const slots = document.querySelectorAll('[data-include]');
  await Promise.all(
    Array.from(slots).map(async (slot) => {
      const url = slot.getAttribute('data-include');
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to load ${url}`);
        const html = (await res.text()).replace(/\{\{ROOT\}\}/g, root);
        slot.innerHTML = html;
      } catch (err) {
        console.error(err);
      }
    })
  );
  markActiveNav();
  initNav();
  initHeaderScroll();
  setFooterYear();
}

function markActiveNav() {
  const current = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-list a[data-nav]').forEach((link) => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';
    if (linkPath === current || (current === '/' && linkPath === '/index.html')) {
      link.setAttribute('aria-current', 'page');
    }
  });
}

function setFooterYear() {
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------------------------------------------------------------------
   Mobile navigation + services submenu (works for touch, mouse, keyboard)
   --------------------------------------------------------------------- */
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  const header = document.querySelector('.site-header');
  if (!toggle || !nav) return;

  const closeNav = () => {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    header && header.classList.remove('is-open');
    document.body.style.overflow = '';
  };
  const openNav = () => {
    toggle.setAttribute('aria-expanded', 'true');
    nav.classList.add('is-open');
    header && header.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeNav() : openNav();
  });
  nav.querySelectorAll('.nav-list > li > a').forEach((link) => link.addEventListener('click', closeNav));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });

  // Reset mobile nav state if the viewport grows into desktop
  const desktopQuery = window.matchMedia('(min-width: 1024px)');
  desktopQuery.addEventListener('change', (e) => { if (e.matches) closeNav(); });

  // Services submenu toggle (accordion on mobile, dropdown on desktop)
  const subLabel = nav.querySelector('.nav-sublabel');
  const subMenu = document.getElementById('services-submenu');
  if (subLabel && subMenu) {
    subLabel.addEventListener('click', () => {
      const isOpen = subLabel.getAttribute('aria-expanded') === 'true';
      subLabel.setAttribute('aria-expanded', String(!isOpen));
      subMenu.classList.toggle('is-open', !isOpen);
    });
    document.addEventListener('click', (e) => {
      if (desktopQuery.matches && !subLabel.contains(e.target) && !subMenu.contains(e.target)) {
        subLabel.setAttribute('aria-expanded', 'false');
        subMenu.classList.remove('is-open');
      }
    });
  }
}

/* ---------------------------------------------------------------------
   Header — transparent over the hero, solid ink once scrolled.
   --------------------------------------------------------------------- */
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  const setState = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  setState();
  window.addEventListener('scroll', setState, { passive: true });
}

/* ---------------------------------------------------------------------
   Scroll-reveal — fades/slides sections in as they enter the viewport.
   --------------------------------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  targets.forEach((el, i) => {
    el.style.setProperty('--reveal-i', el.closest('.reveal-group') ? i % 8 : 0);
    io.observe(el);
  });
  // Safety net: guarantee content is never permanently stuck invisible if
  // IntersectionObserver never fires for a given element (e.g. zero-height
  // container at load, or an unusual embedding context).
  window.setTimeout(() => {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => el.classList.add('is-visible'));
  }, 2500);
}

/* ---------------------------------------------------------------------
   Stat counters — count up when scrolled into view
   --------------------------------------------------------------------- */
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    counters.forEach((el) => { el.textContent = el.getAttribute('data-count') + (el.getAttribute('data-suffix') || ''); });
    return;
  }
  const animate = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach((el) => io.observe(el));
  // Safety net: same rationale as initScrollReveal's fallback below.
  window.setTimeout(() => {
    counters.forEach((el) => {
      if (el.textContent === '0') animate(el);
    });
  }, 2500);
}

/* ---------------------------------------------------------------------
   Testimonial slider — one quote at a time, prev/next + progress dots
   --------------------------------------------------------------------- */
function initTestimonialSlider() {
  const root = document.querySelector('[data-testimonial-slider]');
  if (!root) return;
  const pages = Array.from(root.querySelectorAll('.testimonial-page'));
  const dotsWrap = root.querySelector('.testimonial-dots');
  const prevBtn = root.querySelector('[data-testimonial-prev]');
  const nextBtn = root.querySelector('[data-testimonial-next]');
  if (pages.length <= 1) {
    pages.forEach((p) => p.classList.add('is-active'));
    return;
  }
  let index = 0;
  const dots = pages.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Show testimonial ${i + 1} of ${pages.length}`);
    b.addEventListener('click', () => { index = i; render(); });
    dotsWrap.appendChild(b);
    return b;
  });
  function render() {
    pages.forEach((p, i) => p.classList.toggle('is-active', i === index));
    dots.forEach((d, i) => d.setAttribute('aria-current', String(i === index)));
  }
  prevBtn && prevBtn.addEventListener('click', () => { index = (index - 1 + pages.length) % pages.length; render(); });
  nextBtn && nextBtn.addEventListener('click', () => { index = (index + 1) % pages.length; render(); });
  render();
}

/* ---------------------------------------------------------------------
   Contact form — client-side validation + graceful placeholder submit.
   NOTE: form action is a documented placeholder (see README "Form
   backend") until a real endpoint is wired up.
   --------------------------------------------------------------------- */
function initContactForms() {
  document.querySelectorAll('[data-validate]').forEach((form) => {
    const status = form.querySelector('.form-status');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach((field) => {
        const errorEl = form.querySelector(`[data-error-for="${field.id}"]`);
        let message = '';
        if (!field.value.trim()) {
          message = 'This field is required.';
        } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          message = 'Enter a valid email address.';
        }
        field.setAttribute('aria-invalid', String(Boolean(message)));
        if (errorEl) errorEl.textContent = message;
        if (message) valid = false;
      });

      if (!status) return;
      status.classList.remove('success', 'error');
      if (valid) {
        status.textContent = 'Thanks — your message is validated. Connect this form to a real backend endpoint to send it (see README "Form backend").';
        status.classList.add('success', 'is-visible');
        form.reset();
      } else {
        status.textContent = 'Please fix the highlighted fields and try again.';
        status.classList.add('error', 'is-visible');
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  await includePartials();
  initScrollReveal();
  initCounters();
  initTestimonialSlider();
  initContactForms();
});
