/**
 * Maverick Consulting Solutions — Main Frontend Module
 * ES2022+ syntax, no dependencies
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

  // Scroll state
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    // Active link highlighting
    const scrollY = window.scrollY + 100;
    $$('section[id]').forEach(section => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        allLinks.forEach(a => a.classList.remove('active'));
        const match = $$(`.nav-link[href="#${section.id}"]`);
        match.forEach(a => a.classList.add('active'));
      }
    });
  };

  window.addEventListener('scroll', debounce(onScroll, 30), { passive: true });
  onScroll();

  // Mobile hamburger
  hamburger?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  // Mobile dropdown toggle
  $$('.has-dropdown').forEach(item => {
    const trigger = item.querySelector('.nav-link');
    trigger?.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        item.classList.toggle('open');
      }
    });
  });

  // Close menu on outside click
  document.addEventListener('click', e => {
    if (!navbar.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
    }
  });

  // Smooth scroll for all anchor links + close mobile nav
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

  // Also observe section children for stagger
  $$('.value-card, .service-card, .thought-card, .stat-item').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
    el.classList.add('reveal');
    observer.observe(el);
  });
};

// ── Stats Bar ──────────────────────────────────────────────────────────────

const initStats = async () => {
  const container = $('#statsInner');
  if (!container) return;

  try {
    const res  = await fetch('/api/stats');
    const json = await res.json();

    if (!json.success) throw new Error('API error');

    container.innerHTML = json.data.map(stat => `
      <div class="stat-item reveal">
        <span class="stat-value" data-target="${stat.value}">${stat.value}</span>
        <span class="stat-label">${stat.label}</span>
      </div>
    `).join('');

    // Re-observe new elements
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.2 });

    $$('.stat-item').forEach(el => observer.observe(el));
  } catch {
    // Fallback — hide stats bar gracefully
    container.closest('.stats-bar')?.style.setProperty('display', 'none');
  }
};

// ── Services Grid ──────────────────────────────────────────────────────────

const SERVICE_ICONS = {
  web:       `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>`,
  mobile:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></svg>`,
  marketing: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 14v-3zM11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
  design:    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="6.5" cy="12" r="2.5"/><circle cx="15" cy="17" r="2.5"/><path d="M2 22l6-6"/></svg>`,
};

const initServices = async () => {
  const grid = $('#servicesGrid');
  if (!grid) return;

  try {
    const res  = await fetch('/api/services');
    const json = await res.json();

    if (!json.success) throw new Error('API error');

    grid.innerHTML = json.data.map(svc => `
      <article class="service-card" aria-label="${svc.title}">
        <div class="service-icon" aria-hidden="true">${SERVICE_ICONS[svc.icon] ?? SERVICE_ICONS.web}</div>
        <h3>${svc.title}</h3>
        <p>${svc.description}</p>
        <a href="${svc.href}" class="service-link" aria-label="Read more about ${svc.title}">Read More</a>
      </article>
    `).join('');
  } catch {
    grid.innerHTML = `<p style="color:rgba(255,255,255,0.4);padding:40px;grid-column:1/-1;text-align:center">Unable to load services. Please refresh.</p>`;
  }
};

// ── Thoughts / Blog ────────────────────────────────────────────────────────

const formatDate = iso => new Date(iso).toLocaleDateString('en-AU', {
  day: 'numeric', month: 'long', year: 'numeric',
});

const initThoughts = async () => {
  const grid = $('#thoughtsGrid');
  if (!grid) return;

  try {
    const res  = await fetch('/api/thoughts');
    const json = await res.json();

    if (!json.success) throw new Error('API error');

    grid.innerHTML = json.data.map(t => `
      <article class="thought-card">
        <div class="thought-img" aria-hidden="true">${t.emoji}</div>
        <div class="thought-body">
          <p class="thought-tag">${t.tag}</p>
          <h4>${t.title}</h4>
          <p>${t.excerpt}</p>
          <p style="margin-top:12px;font-size:11px;color:#9ca3af;font-family:'Montserrat',sans-serif;letter-spacing:1px;text-transform:uppercase">
            ${formatDate(t.date)}
          </p>
        </div>
      </article>
    `).join('');
  } catch {
    grid.innerHTML = `<p style="color:var(--mid);padding:40px;grid-column:1/-1;text-align:center">Unable to load articles. Please refresh.</p>`;
  }
};

// ── Contact Form ───────────────────────────────────────────────────────────

const initContactForm = () => {
  const form     = $('#contactForm');
  const feedback = $('#formFeedback');
  const submitBtn = $('#submitBtn');
  if (!form) return;

  const fields = {
    name:    { el: $('#name'),    errorEl: $('#nameError'),    validate: v => v.trim().length >= 2 ? '' : 'Please enter your name (min 2 characters).' },
    email:   { el: $('#email'),   errorEl: $('#emailError'),   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email address.' },
    message: { el: $('#message'), errorEl: $('#messageError'), validate: v => v.trim().length >= 10 ? '' : 'Message must be at least 10 characters.' },
  };

  // Live validation on blur
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

  const setLoading = loading => {
    submitBtn.disabled = loading;
    submitBtn.classList.toggle('loading', loading);
  };

  form.addEventListener('submit', async e => {
    e.preventDefault();

    // Validate all fields
    let hasErrors = false;
    Object.values(fields).forEach(({ el, errorEl, validate }) => {
      const err = validate(el.value);
      errorEl.textContent = err;
      el.classList.toggle('error', Boolean(err));
      if (err) hasErrors = true;
    });
    if (hasErrors) return;

    setLoading(true);
    feedback.className = 'form-feedback';

    const payload = {
      name:    $('#name').value.trim(),
      email:   $('#email').value.trim(),
      phone:   $('#phone')?.value.trim() ?? '',
      subject: $('#subject')?.value.trim() ?? '',
      message: $('#message').value.trim(),
    };

    try {
      const res  = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.success) {
        setFeedback(json.message, 'success');
        form.reset();
        Object.values(fields).forEach(({ el }) => el.classList.remove('error'));
      } else {
        const msg = json.errors?.join(' ') ?? json.error ?? 'Something went wrong.';
        setFeedback(msg, 'error');
      }
    } catch {
      setFeedback('Network error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
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
  initStats();
  initServices();
  initThoughts();
  initContactForm();
  initBackToTop();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
