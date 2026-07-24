import { Router } from 'express';

const router = Router();

// Services data endpoint
router.get('/services', (req, res) => {
  const services = [
    {
      id: 'disruptive-strategy',
      title: 'Disruptive Strategy',
      icon: 'strategy',
      description:
        'Align business strategies, break organisational barriers, evolve the organisation. Disrupt the market and be the leader of the pack.',
      href: '/services/disruptive-strategy',
    },
    {
      id: 'digital-transformation',
      title: 'Digital Transformation & Solutions',
      icon: 'digital',
      description:
        'Customer experience focus, align product/services strategic needs, and adopt evolutionary design planning & architecture.',
      href: '/services/digital-transformation',
    },
    {
      id: 'agile-engineering',
      title: 'Agile Software Engineering',
      icon: 'agile',
      description:
        'Build the right solutions and build the solutions right. Develop and evolve innovations fast, reliably and continuously.',
      href: '/services/agile-engineering',
    },
    {
      id: 'org-enablement',
      title: 'Organisation Enablement & Coaching',
      icon: 'coaching',
      description:
        'Help organisations evolve and stay ahead of the curve in thinking, culture & practices. Groom talents to meet current and future needs.',
      href: '/services/org-enablement',
    },
  ];
  res.json({ success: true, data: services });
});

// Stats data endpoint
router.get('/stats', (req, res) => {
  const stats = [
    { label: 'Projects Delivered', value: '150+' },
    { label: 'Happy Clients', value: '80+' },
    { label: 'Years Experience', value: '10+' },
    { label: 'Team Members', value: '50+' },
  ];
  res.json({ success: true, data: stats });
});

// Blog/thoughts data endpoint
router.get('/thoughts', (req, res) => {
  const thoughts = [
    {
      id: 1,
      tag: 'Agile',
      title: 'Why Agile Mindset Matters More Than Agile Process',
      excerpt:
        'True agility starts in the mind. Explore how shifting your team\'s mindset can unlock far greater value than any framework.',
      emoji: '💡',
      date: '2024-08-15',
    },
    {
      id: 2,
      tag: 'Transformation',
      title: 'Digital Transformation: Beyond Technology',
      excerpt:
        'Successful digital transformation is as much about people and culture as it is about technology and tools.',
      emoji: '🔄',
      date: '2024-07-22',
    },
    {
      id: 3,
      tag: 'Strategy',
      title: 'Building Products That Customers Actually Want',
      excerpt:
        'Design thinking and continuous delivery are the twin engines of customer-centric product development.',
      emoji: '🎯',
      date: '2024-06-10',
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
