import { Router } from 'express';

const router = Router();

// Services data endpoint
router.get('/services', (req, res) => {
  const services = [
    {
      id: 'web-development',
      title: 'Web Design & Development',
      icon: 'web',
      description:
        'Responsive, scalable websites and web apps built on frameworks like PHP, Laravel, Angular and Node — quality code with a partner who sticks around after launch.',
      href: '#contact',
    },
    {
      id: 'mobile-apps',
      title: 'Mobile App Development',
      icon: 'mobile',
      description:
        'Native and cross-platform apps for Android, iPhone, Windows and wearables — designed, built, store-submitted and supported end to end.',
      href: '#contact',
    },
    {
      id: 'digital-marketing',
      title: 'Digital Marketing',
      icon: 'marketing',
      description:
        'SEO, social media, pay-per-click, content and email campaigns measured by results, not vanity metrics — with plain-language reporting.',
      href: '#contact',
    },
    {
      id: 'graphic-design',
      title: 'Graphic Design',
      icon: 'design',
      description:
        'Logos, branding, brochures and print & packaging that stay on-brand from screen to print — delivered print-ready with source files included.',
      href: '#contact',
    },
  ];
  res.json({ success: true, data: services });
});

// Stats data endpoint
router.get('/stats', (req, res) => {
  const stats = [
    { label: "Years' Experience", value: '10+' },
    { label: 'Happy Clients', value: '30+' },
    { label: 'Finished Projects', value: '32+' },
    { label: 'Skilled Experts', value: '10+' },
  ];
  res.json({ success: true, data: stats });
});

// Blog/thoughts data endpoint
router.get('/thoughts', (req, res) => {
  const thoughts = [
    {
      id: 1,
      tag: 'Web',
      title: 'Building Software That Outlives Its Launch',
      excerpt:
        'The demo is the easy part. We design and engineer for maintainability from day one, so your product keeps working long after go-live.',
      emoji: '🧱',
      date: '2026-06-18',
    },
    {
      id: 2,
      tag: 'Marketing',
      title: 'Measuring Campaigns by Results, Not Vanity Metrics',
      excerpt:
        'Clicks and impressions look good on a slide. We tie every campaign to real growth goals and report in plain language.',
      emoji: '📈',
      date: '2026-05-09',
    },
    {
      id: 3,
      tag: 'Mobile',
      title: 'One Accountable Team, No Siloed Hand-offs',
      excerpt:
        'Engineers, designers and marketers working together beats a relay race of departments. Here is how we keep delivery agile.',
      emoji: '🤝',
      date: '2026-04-02',
    },
  ];
  res.json({ success: true, data: thoughts });
});

// Health check
router.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

export default router;
