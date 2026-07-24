// Data source for all 21 service pages. One entry per service; shared
// per-category copy (features/advantages/process) is defined once in
// CATEGORY_DEFAULTS and interpolated at build time by scripts/build-services.js.
//
// Each service has both `name` (full display title, e.g. "PHP Development" —
// used for the H1, meta title, and "Advantages of Our X Services" heading)
// and `short` (a concise form, e.g. "PHP" — used inside body copy templates
// so phrases don't double up, e.g. "Full-Cycle PHP" not "Full-Cycle PHP
// Development Development").
//
// Edit this file, then run:
//   node scripts/build-services.js
// to regenerate /services/*.html. Header/footer/nav are shared at runtime
// via /partials, so this only needs to re-run when SERVICE CONTENT changes.

const CATEGORY_DEFAULTS = {
  web: {
    heroTag: 'Highly Tailored IT Design, Management & Support Services.',
    companyHeading: 'Hire Trusted {short} Developers With Practical Industry Experience',
    companyIntro: "At Maverick Consulting Solutions, our dedicated {short} developers bring hands-on experience delivering production-grade software across web and enterprise projects. We match the right specialists to your project so you get quality code, clear communication, and a partner who sticks around after launch.",
    features: [
      { title: 'Full-Cycle {short} Development', description: 'Our dedicated {short} developers handle everything from architecture to deployment, so you get one accountable team for the whole build.' },
      { title: 'Extensive Domain Expertise', description: 'Years of hands-on {short} experience across industries means fewer surprises and faster delivery.' },
      { title: 'Qualified Team', description: 'Every engineer on your project has a track record of shipped {short} work and professional training to back it up.' },
      { title: 'Cost-Effective', description: 'Flexible engagement models are built around your budget without cutting corners on quality.' },
      { title: '24×7 Customer Support', description: 'Dedicated support representatives are ready around the clock once your {short} project goes live.' },
    ],
    advantages: [
      { title: 'Responsive', description: 'We build {short} websites that render cleanly on any device your customers use.' },
      { title: 'Scalable', description: 'Architecture decisions are made up front so your {short} platform grows with your traffic, not against it.' },
      { title: 'Fast', description: 'We tune queries, assets and caching so your {short} build feels instant.' },
      { title: 'SEO-friendly', description: 'Our developers follow SEO best practice from the first commit, not as an afterthought.' },
      { title: 'Tailored Solutions', description: 'Every {short} build is scoped to your business rules, not squeezed into a generic template.' },
      { title: 'Firewall Advance', description: 'Security reviews and hardening are part of every {short} delivery, not a separate line item.' },
    ],
    processHeading: 'A Full-Suite {short} Delivery Process',
    process: [
      { title: 'Discovery & Planning', description: 'We start by understanding your goals, users and technical constraints.' },
      { title: 'Design & Architecture', description: 'We plan the {short} architecture and experience before writing a line of code.' },
      { title: 'Build & Test', description: 'Development happens in short cycles with continuous testing, so issues surface early.' },
      { title: 'Launch & Support', description: 'We deploy, monitor, and stay on hand for support once your {short} project is live.' },
    ],
  },
  mobile: {
    heroTag: 'Native and cross-platform apps, built, tested and supported end-to-end.',
    companyHeading: 'Hire Trusted {short} App Developers Who Ship Real Apps',
    companyIntro: "At Maverick Consulting Solutions, our {short} app team has shipped apps that real users rely on daily. We handle design, build, store submission and post-launch support so your app ships on time and keeps working.",
    features: [
      { title: 'Full-Cycle {short} App Development', description: 'From concept and UI design through store submission, our {short} team owns the whole build.' },
      { title: 'Extensive Domain Expertise', description: 'Years of hands-on {short} experience across industries means fewer surprises and faster delivery.' },
      { title: 'Qualified Team', description: 'Every engineer on your project has a track record of shipped {short} apps in production.' },
      { title: 'Cost-Effective', description: 'Flexible engagement models are built around your budget without cutting corners on quality.' },
      { title: '24×7 Customer Support', description: 'Dedicated support representatives are ready around the clock once your {short} app is live.' },
    ],
    advantages: [
      { title: 'Polished UI', description: 'We design {short} interfaces that feel native and intuitive from the first tap.' },
      { title: 'Scalable', description: 'Backends are architected so your {short} app grows with your user base, not against it.' },
      { title: 'Fast', description: 'We profile and tune so your {short} app stays smooth even on older devices.' },
      { title: 'Store-Ready', description: 'We handle store guidelines and submission so your {short} launch isn’t held up by review rejections.' },
      { title: 'Tailored Solutions', description: 'Every {short} build is scoped to your business rules, not squeezed into a generic template.' },
      { title: 'Secure By Design', description: 'Security reviews and hardening are part of every {short} delivery, not a separate line item.' },
    ],
    processHeading: 'A Full-Suite {short} App Delivery Process',
    process: [
      { title: 'Discovery & Planning', description: 'We start by understanding your goals, users and platform constraints.' },
      { title: 'Design & Prototyping', description: 'We plan the {short} experience and validate it before writing production code.' },
      { title: 'Build & Test', description: 'Development happens in short cycles with continuous testing on real devices.' },
      { title: 'Launch & Support', description: 'We handle submission, monitor performance, and stay on hand once your {short} app is live.' },
    ],
  },
  marketing: {
    heroTag: 'Campaigns measured by results, not vanity metrics.',
    companyHeading: 'Hire A Trusted {short} Team That Reports What Matters',
    companyIntro: "At Maverick Consulting Solutions, our {short} specialists build campaigns around your actual growth goals. We combine platform expertise with transparent reporting, so you always know what's working and why.",
    features: [
      { title: 'Full-Funnel {short} Strategy', description: 'Our {short} specialists plan campaigns around your whole funnel, not just a single metric.' },
      { title: 'Extensive Domain Expertise', description: 'Years of hands-on {short} experience across industries means faster, more confident decisions.' },
      { title: 'Qualified Team', description: 'Every specialist on your account has a track record of measurable {short} results.' },
      { title: 'Cost-Effective', description: 'Flexible engagement models are built around your budget without cutting corners on quality.' },
      { title: '24×7 Monitoring', description: 'Campaigns are monitored continuously so budget is never wasted on underperforming placements.' },
    ],
    advantages: [
      { title: 'Data-Driven', description: 'Every {short} decision traces back to a number, not a guess.' },
      { title: 'Transparent Reporting', description: 'You get plain-language reporting on {short} performance, not a wall of jargon.' },
      { title: 'Fast Turnaround', description: 'We move quickly on {short} campaigns so you can react to what the market is telling you.' },
      { title: 'Platform Expertise', description: 'Our team stays current on {short} platform changes so your strategy never runs on stale rules.' },
      { title: 'Tailored Strategy', description: 'Your {short} plan is built around your audience and goals, not a one-size-fits-all playbook.' },
      { title: 'Compliance-Aware', description: 'We keep {short} campaigns aligned with platform policy, protecting your account long-term.' },
    ],
    processHeading: 'A Full-Suite {short} Delivery Process',
    process: [
      { title: 'Audit & Research', description: 'We start with a clear-eyed audit of where {short} stands today and where the opportunity is.' },
      { title: 'Strategy & Planning', description: 'We build a {short} plan tied to specific, measurable goals.' },
      { title: 'Execute & Optimize', description: 'Campaigns launch and are continuously tuned based on real performance data.' },
      { title: 'Report & Iterate', description: 'You get clear {short} reporting and a plan for what happens next.' },
    ],
  },
  design: {
    heroTag: 'Design that stays on-brand from screen to print.',
    companyHeading: 'Hire A Trusted {short} Team That Designs On-Brand',
    companyIntro: "At Maverick Consulting Solutions, our {short} designers work from your brand guidelines (or help you build them) so every deliverable feels consistent, professional and ready to use.",
    features: [
      { title: 'Full-Cycle {short}', description: 'From concept through final files, our {short} team owns the whole design process.' },
      { title: 'Extensive Domain Expertise', description: 'Years of hands-on {short} experience across industries means fewer revision cycles.' },
      { title: 'Qualified Team', description: 'Every designer on your project has a track record of shipped {short} work clients love.' },
      { title: 'Cost-Effective', description: 'Flexible engagement models are built around your budget without cutting corners on quality.' },
      { title: 'Responsive Support', description: 'Dedicated support representatives are ready to help once your {short} assets are delivered.' },
    ],
    advantages: [
      { title: 'On-Brand', description: 'Every {short} deliverable is built to match — or help define — your brand guidelines.' },
      { title: 'Print-Ready', description: 'Files are delivered print-ready with correct bleed, resolution and color profiles.' },
      { title: 'Fast Turnaround', description: 'We move quickly on {short} projects without sacrificing craft.' },
      { title: 'Unlimited Concepts Within Scope', description: 'We iterate on {short} concepts with you until it feels right.' },
      { title: 'Source Files Included', description: 'You always own the editable source files behind your {short} deliverables.' },
      { title: 'Consistent Across Channels', description: 'Your {short} assets are built to hold up across web, print and social.' },
    ],
    processHeading: 'A Full-Suite {short} Delivery Process',
    process: [
      { title: 'Discovery & Brief', description: 'We start by understanding your brand, audience and the goal of this {short} project.' },
      { title: 'Concept & Direction', description: 'We present distinct {short} concepts before committing to one direction.' },
      { title: 'Refine & Finalize', description: 'We refine the chosen direction based on your feedback.' },
      { title: 'Deliver & Support', description: 'You receive final {short} files in every format you need, plus support after delivery.' },
    ],
  },
};

const SERVICES = [
  // --- Web Design & Development ---
  { slug: 'servicePhp', category: 'web', categoryLabel: 'Web Design & Development', name: 'PHP Development', short: 'PHP', tagline: 'Robust, secure PHP applications built on frameworks that scale with your business.' },
  { slug: 'serviceAngular', category: 'web', categoryLabel: 'Web Design & Development', name: 'AngularJS Development', short: 'AngularJS', tagline: 'Dynamic, component-driven front ends built on Angular.' },
  { slug: 'serviceLara', category: 'web', categoryLabel: 'Web Design & Development', name: 'Laravel Development', short: 'Laravel', tagline: 'Elegant, maintainable PHP applications built on the Laravel framework.' },
  { slug: 'serviceNode', category: 'web', categoryLabel: 'Web Design & Development', name: 'Node Development', short: 'Node.js', tagline: 'Fast, event-driven backends and APIs built on Node.js.' },
  { slug: 'serviceCodeigniter', category: 'web', categoryLabel: 'Web Design & Development', name: 'CodeIgniter Development', short: 'CodeIgniter', tagline: 'Lightweight, rapid application development on a proven PHP framework.' },
  { slug: 'serviceAsp', category: 'web', categoryLabel: 'Web Design & Development', name: 'ASP.Net Development', short: 'ASP.NET', tagline: 'Enterprise-grade applications built on the .NET platform.' },
  { slug: 'serviceBlockChain', category: 'web', categoryLabel: 'Web Design & Development', name: 'Blockchain Development', short: 'Blockchain', tagline: 'Secure smart contracts and decentralized applications, from prototype to mainnet.' },

  // --- Mobile App Development ---
  { slug: 'serviceAndroid', category: 'mobile', categoryLabel: 'Mobile App Development', name: 'Android App Development', short: 'Android', tagline: 'Native Android apps built for performance across the device spectrum.' },
  { slug: 'serviceIphoneApp', category: 'mobile', categoryLabel: 'Mobile App Development', name: 'iPhone App Development', short: 'iPhone', tagline: 'Native iOS apps designed to feel at home on every Apple device.' },
  { slug: 'serviceWindow', category: 'mobile', categoryLabel: 'Mobile App Development', name: 'Windows App Development', short: 'Windows', tagline: 'Desktop and UWP applications built for the Windows ecosystem.' },
  { slug: 'serviceCustomApp', category: 'mobile', categoryLabel: 'Mobile App Development', name: 'Custom Application Development', short: 'Custom', tagline: 'Purpose-built applications designed around your exact workflow.' },
  { slug: 'serviceWearable', category: 'mobile', categoryLabel: 'Mobile App Development', name: 'Wearable App Development', short: 'Wearable', tagline: 'Companion apps built for smartwatches and wearable devices.' },

  // --- Digital Marketing ---
  { slug: 'serviceSearchEngin', category: 'marketing', categoryLabel: 'Digital Marketing', name: 'Search Engine Optimization', short: 'SEO', tagline: 'Sustainable organic growth through technical, on-page and content SEO.' },
  { slug: 'serviceSocialMedia', category: 'marketing', categoryLabel: 'Digital Marketing', name: 'Social Media Marketing', short: 'Social Media', tagline: 'Social campaigns that build an audience and turn it into customers.' },
  { slug: 'servicePayPerClick', category: 'marketing', categoryLabel: 'Digital Marketing', name: 'Pay per Click', short: 'PPC', tagline: 'Paid campaigns managed for return on ad spend, not just clicks.' },
  { slug: 'serviceContentWriting', category: 'marketing', categoryLabel: 'Digital Marketing', name: 'Content Writing', short: 'Content', tagline: 'Clear, on-brand copy that reads well and ranks well.' },
  { slug: 'serviceEmailMarketing', category: 'marketing', categoryLabel: 'Digital Marketing', name: 'Email Marketing', short: 'Email', tagline: 'Lifecycle email campaigns that keep customers coming back.' },

  // --- Graphic Design ---
  { slug: 'serviceBrochureDesign', category: 'design', categoryLabel: 'Graphic Design', name: 'Brochure Design', short: 'Brochure', tagline: 'Print and digital brochures that communicate clearly and look sharp.' },
  { slug: 'servicePrint', category: 'design', categoryLabel: 'Graphic Design', name: 'Print & Packaging Design', short: 'Print & Packaging', tagline: 'Packaging and print collateral designed for shelf and for print production.' },
  { slug: 'serviceLogoDesign', category: 'design', categoryLabel: 'Graphic Design', name: 'Logo Design', short: 'Logo', tagline: 'A distinctive mark that anchors your brand identity.' },
  { slug: 'serviceTBranding', category: 'design', categoryLabel: 'Graphic Design', name: 'Branding', short: 'Branding', tagline: 'A complete visual identity system, built to stay consistent everywhere it appears.' },
];

function fill(str, entry) {
  return str.replace(/\{name\}/g, entry.name).replace(/\{short\}/g, entry.short);
}

function buildServiceData(entry) {
  const defaults = CATEGORY_DEFAULTS[entry.category];
  return {
    slug: entry.slug,
    name: entry.name,
    categoryLabel: entry.categoryLabel,
    tagline: entry.tagline,
    heroTag: fill(defaults.heroTag, entry),
    companyHeading: fill(defaults.companyHeading, entry),
    companyIntro: fill(defaults.companyIntro, entry),
    features: defaults.features.map((f) => ({ title: fill(f.title, entry), description: fill(f.description, entry) })),
    advantages: defaults.advantages.map((a) => ({ title: fill(a.title, entry), description: fill(a.description, entry) })),
    processHeading: fill(defaults.processHeading, entry),
    process: defaults.process.map((p, i) => ({ step: i + 1, title: fill(p.title, entry), description: fill(p.description, entry) })),
  };
}

module.exports = { SERVICES, buildServiceData };
