// Zero-dependency static site generator for the 21 service pages.
// Reads /data/services.js and writes one static HTML file per service to
// /services/*.html using the render() template function below.
//
// Usage: node scripts/build-services.js
// Re-run this any time data/services.js changes — header/footer nav and
// styling are still shared at runtime via /partials, so this script only
// needs to re-run when SERVICE CONTENT changes, not for nav/footer edits.

const fs = require('fs');
const path = require('path');
const { SERVICES, buildServiceData } = require('../data/services');

const OUT_DIR = path.join(__dirname, '..', 'services');

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

function infoCard(item, num) {
  return `
          <article class="info-card reveal">
            <p class="info-card-num">${String(num).padStart(2, '0')}</p>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
          </article>`;
}

function render(entry) {
  const d = buildServiceData(entry);
  const title = `${d.name} | Maverick Consulting Solutions`;
  const description = `${d.tagline} Talk to Maverick Consulting Solutions about ${d.name.toLowerCase()}.`;
  const canonical = `https://maverickconsultingsolutions.com/services/${d.slug}.html`;

  return `<!doctype html>
<html lang="en" class="no-js">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="/assets/images/og-cover.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="/assets/images/og-cover.png">
  <link rel="icon" href="../assets/images/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../assets/css/tokens.css">
  <link rel="stylesheet" href="../assets/css/main.css">
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <header class="site-header" data-include="../partials/header.html"></header>

  <main id="main-content">

    <section class="page-hero">
      <div class="container">
        <p class="eyebrow reveal"><span class="rule"></span>${escapeHtml(d.categoryLabel.toUpperCase())}</p>
        <h1 class="reveal">${escapeHtml(d.name)}</h1>
        <p class="reveal">${escapeHtml(d.heroTag)}</p>
      </div>
    </section>

    <section class="content-section" aria-labelledby="features-heading">
      <div class="container">
        <div class="section-head reveal" style="padding-top:0;">
          <p class="eyebrow"><span class="rule"></span>KEY FEATURES</p>
          <h2 id="features-heading">What you get with our ${escapeHtml(d.name)} team.</h2>
        </div>
        <div class="info-grid reveal-group">${d.features.map((f, i) => infoCard(f, i + 1)).join('')}
        </div>
      </div>
    </section>

    <section class="content-section content-section--alt content-section--narrow" aria-labelledby="company-heading">
      <div class="container">
        <p class="eyebrow reveal"><span class="rule"></span>OUR COMPANY</p>
        <h2 class="reveal" id="company-heading">${escapeHtml(d.companyHeading)}</h2>
        <p class="reveal" style="margin-top:24px; font-size: var(--fs-body-lg); color: var(--color-grey-mid);">${escapeHtml(d.companyIntro)}</p>
      </div>
    </section>

    <section class="content-section" aria-labelledby="advantages-heading">
      <div class="container">
        <div class="section-head reveal" style="padding-top:0;">
          <p class="eyebrow"><span class="rule"></span>ADVANTAGES</p>
          <h2 id="advantages-heading">Advantages of our ${escapeHtml(d.name)} services.</h2>
        </div>
        <div class="info-grid reveal-group">${d.advantages.map((a, i) => infoCard(a, i + 1)).join('')}
        </div>
      </div>
    </section>

    <section class="content-section content-section--alt" aria-labelledby="process-heading">
      <div class="container">
        <div class="section-head reveal" style="padding-top:0;">
          <p class="eyebrow"><span class="rule"></span>HOW WE WORK</p>
          <h2 id="process-heading">${escapeHtml(d.processHeading)}</h2>
        </div>
        <div class="info-grid reveal-group">${d.process.map((p) => infoCard(p, p.step)).join('')}
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="container">
        <h2 class="reveal">Ready to start your ${escapeHtml(d.name)} project?</h2>
        <a href="../contact.html" class="btn-outline on-inverted reveal">Request a Quote</a>
      </div>
    </section>

  </main>

  <footer class="site-footer" data-include="../partials/footer.html"></footer>

  <script src="../assets/js/main.js" defer></script>
</body>
</html>
`;
}

const STATIC_PAGES = ['/', '/about.html', '/portfolio.html', '/team.html', '/contact.html'];

function buildSitemap() {
  const root = 'https://maverickconsultingsolutions.com';
  const urls = [
    ...STATIC_PAGES.map((p) => `${root}${p}`),
    ...SERVICES.map((s) => `${root}/services/${s.slug}.html`),
  ];
  const body = urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function main() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  let count = 0;
  for (const entry of SERVICES) {
    const html = render(entry);
    fs.writeFileSync(path.join(OUT_DIR, `${entry.slug}.html`), html, 'utf8');
    count += 1;
  }
  console.log(`Generated ${count} service pages into ${path.relative(process.cwd(), OUT_DIR)}/`);

  const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, buildSitemap(), 'utf8');
  console.log(`Wrote ${path.relative(process.cwd(), sitemapPath)} (${STATIC_PAGES.length + SERVICES.length} URLs)`);
}

main();
