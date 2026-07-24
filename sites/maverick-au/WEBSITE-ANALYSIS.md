# Maverick Consulting Solutions — Old Site Analysis

Source: https://maverickconsultingsolutions.com/ (reviewed live, page by page)
Built on: a "Mitech"-style IT/agency HTML template (LineThemes), heavily unmodified — lots of template placeholder content still present.

This document is the source of truth for the rebuild: what content is real (keep it), what is template
leftover (replace it), and what the brand's visual identity is (colors/fonts to preserve).

---

## 1. Company facts (REAL — preserve everywhere)

- **Name:** Maverick Consulting Solutions (Pty Ltd)
- **Tagline used in hero:** "Excellent IT services for your success"
- **Phone:** +61-404007386 (tel link should be `tel:+61404007386`)
- **Email:** info@maverickconsultingsolutions.com
- **Address 1 (primary/AU):** Office: Waterfall Arcade, Suite 9, 201 Mann St, Gosford, NSW 2250, Australia
- **Address 2 (India office):** 2249, Viswakarma Colony, Yamunanagar, Haryana 135003, India
- **Business hours:** Monday–Friday, 9am–5pm (phone & email support)
- **Stats banner:** 30 Happy Clients / 32 Finished Projects / 10 Skilled Experts / 4.8 Average Client Satisfaction
- **Team (real names, generic placeholder avatar icons, no bios/photos):**
  - Nav Mahajan — Director
  - Sheetal Mahajan — Consultant
  - Jaspreet Kaur — Admin/Sales Manager
  - Viraj Singh — Software Engineer
  - Sourabh — Developer
  - Sujal Arora — Trainee
  - Gursandeep Kaur — Trainee
- **Testimonials (keep, appear genuine, not template copy):** Hammad Khawer, Raphael Garcia, Charlie Ketchem, Memoona Atta
- **WhatsApp chat widget** present (via wati.io) — optional to reproduce, not core to rebuild.

## 2. Site map (pages that exist today)

| Page | URL slug |
|---|---|
| Home | `index` |
| About Us | `about_us` |
| Portfolio | `portfolio` |
| Team | `team` |
| Contact / Request a Quote | `contact` |

### Service pages (21 total, one per URL) — all use the same visual template

Web Design & Development: `servicePhp`, `serviceAngular`, `serviceLara`, `serviceNode`, `serviceCodeigniter`, `serviceAsp.Net`, `serviceBlockChain`

Mobile App Development: `serviceAndroid`, `serviceIphoneApp`, `serviceWindow`, `serviceCustomApp`, `serviceWearable`

Digital Marketing: `serviceSearchEngin` (SEO), `serviceSocialMedia`, `servicePayPerClick`, `serviceContentWriting`, `serviceEmailMarketing`

Graphic Design: `serviceBrochureDesign`, `servicePrint` (Print & Packaging), `serviceLogoDesign`, `serviceTBranding` (Branding)

**Bug found:** the desktop header dropdown only lists 2 of the 4 Graphic Design services (Brochure, Logo); the mobile/footer nav lists all 4. Nav should be consistent in the rebuild.

## 3. Page-by-page content notes

### Home
- Hero carousel, 3 slides, each: eyebrow label + H1 + CTA button "Contact us now" → `/contact`
  1. "Secure & IT Services" / "Excellent IT services for your success"
  2. "Tailored IT Solutions" / "Accelerating success with cutting-edge IT support"
  3. "Digital Acceleration" / "Enabling innovation at the speed of change"
- "Industries We Serve" → "Services We Deliver — we provide truly prominent IT solutions." 6-card grid: Web Design & Development, Mobile App Development, Trending Technology (React/Angular/Node), Ecommerce Development, Blockchain Development, SEO Service/Hire Dedicated Team. CTA "Talk to a consultant" (tel link).
- "Discover our company" — "We've been thriving in 5 years" tabbed section:
  - Tab "Our mission": intro paragraph + checklist (IT Consultancy, IT Design, Blockchain Development, Mobile App Development) + "Let's get started" → portfolio
  - Tab "Our services": Quality Assurance System / Highly Professional Staffs / Info Security Management — **these use unmodified template boilerplate text ("At Maverick Consulting Solution, we have a holistic and integrated approach...")** — needs real copy.
- **TEMPLATE LEFTOVER (remove/replace):** "Top Training Companies 2016", "CIO Big Data 100", "Top 20 Sales Training Companies 2015", "Pharma Tech Outlook" — award/press logos, all link to `#`, all share the placeholder text "More than 40 years ago, our company's na...". Not real; drop this section or replace with real recognitions/certifications if the client has any (else omit).
- CTA band: "We run all kinds of IT services that vow your success" — "Let's talk" / "Get info" buttons.
- **TEMPLATE LEFTOVER (dummy case studies):** "Case studies — Proud projects make us excel": Arden-Internal Networking, A Freeserve case study, Aqua – Research and Energy, Mitech-Smart Vision. All tagged "Cyber Security", all share one placeholder paragraph, all link to `#`. **"Mitech" is the original template brand name leaking through — must remove.** Replace with real case studies/portfolio pieces or clearly-marked `[TODO: add real case study]` placeholders.
- Testimonials slider (4 real-looking reviews, keep).
- Stats band (30 / 32 / 10 / 4.8).
- Secondary CTA: "Reach out to the most reliable IT services." → Contact.
- Contact form (name, email, phone w/ country code, service dropdown [Graphic Design, Web Design, App Design, Other], message).
- Footer: address (map link), phone, email, quick links, service links, copyright.

### About Us
- Hero: "About Company"
- "Notch Up Digital Success With Web Development Services" → "Experience Digital Success With Custom Web Solutions"
- "10 Years' Experience in IT" stat + "More About Our Success Stories" intro copy (real-sounding, keep/adapt)
- 3 feature blocks with "Discover now" links: Agile Team → /team, Pioneer Technologies → /portfolio, Customer Support Whenever Needed → /contact
- "Resources": "Get a copy of brochure on Brand New IT Tech" → "Download now (3MB)" links to `#` — **broken/placeholder, needs a real PDF or should be removed.**
- "We excel in delivering optimal solutions" — 6 cards: Warranty Management IT, Quality Control System, Highly Professional Staffs, Product Engineering & Services, Infrastructure Integration Technology, Information Security Management.
  - **TEMPLATE LEFTOVER:** Infrastructure Integration Technology card text literally says *"At Mitech, we have a holistic and integrated approach towards..."* — must rewrite with Maverick-specific copy.
- Stats band, testimonials, CTA — same shared sections as Home.
- **Bug:** "Call for advice now!" link uses `tel:190068668` (wrong/leftover number) instead of the real `+61-404007386` used everywhere else on the site.
- A review badge "4.9/5.0 by 700+ customers for 3200+ clients" appears — unclear source/legitimacy; verify with client before reusing, otherwise omit or replace with genuine review platform badge.

### Portfolio
- Hero: "Our Portfolio"
- Simple image grid/lightbox gallery of graphic design work: brochure design, "Tiny Umbrellas" logo, project-portfolio mockup cover, business card mockups, an "S Letter Logo" mark, a peacock-feather logo, a "Health & Fitness" logo + "DM Training" card, an architecture/blueprint mockup.
- **Issue:** several images are generic stock mockups (e.g., "Firstname Lastname" business card, "Your Photo Here" placeholder, images watermarked "envato") rather than real client deliverables — these read as template filler, not proof of work. Rebuild should use real portfolio pieces where available, or clearly marked placeholders.
- No case-study captions/descriptions in the gallery today — just images.

### Team
- Hero: "Experienced & Professional Team" + subhead "You can relay on our amazing features list and also our customer services will be great experience for you without doubt and in no-time" (note: has a grammar issue — "relay on" should be "rely on"; subhead reads as generic template copy, should be replaced with real copy about the team).
- Grid of 7 team members (names/roles above), generic flat-icon avatars (no real photos), each with an email icon link only.

### Contact
- Hero: "Contact us"
- "Have Question?" copy + form (same fields as Home contact form)
- "Write a Message" — same form, second heading (duplicate heading, minor redundancy in original)
- Address / Phone / Email 3-column block with support hours
- Shared CTA band footer

### Service page template (verified via PHP Development; structurally identical across all 21)
1. Hero: service title (e.g. "PHP Developments") + banner image
2. Small "How can we help you?" inline inquiry dropdown (decorative; low value — optional to keep)
3. Tagline: "Highly Tailored IT Design, Management & Support Services."
4. 5-card feature slider (generic across dev services: Full-Cycle Development, Domain Expertise, Qualified Team, Cost-Effective, 24×7 Support) — copy should be tailored per service
5. "Our company" intro paragraph — "Hire Trusted PHP Coders Having Practical Industry Experience" (swap per service)
6. "Advantages of Our [X] Services" — 6-card grid (e.g., Responsive, Scalable, Fast, SEO-friendly, Tailored Solutions, Firewall Advance)
7. CTA "Talk to a consultant" (tel link)
8. "How we works" — 4-step process band (e.g., for PHP: Laravel Development, CakePHP Development, Codeigniter Development, Custom PHP Development)
9. Shared CTA band + footer

**This confirms a single data-driven template is the right approach** — each of the 21 services differs only in: title, tagline, 5 features, intro paragraph, 6 advantages, 4 process steps. This should be modeled as one JS/JSON data object per service feeding one HTML template.

## 4. Visual identity — extracted from live computed styles (hex values, not eyeballed)

| Role | Color | Hex |
|---|---|---|
| Header / footer background (dark navy) | `rgb(40, 40, 56)` | `#282838` |
| Primary accent (buttons, links, highlighted words) | `rgb(254, 62, 94)` | `#FE3E5E` |
| Secondary/tan button (e.g. "Get info") | `rgb(210, 169, 142)` | `#D2A98E` |
| CTA band background (cream) | `rgb(246, 242, 237)` | `#F6F2ED` |
| Body copy text (gray) | `rgb(105, 105, 105)` | `#696969` |
| Heading text (near-black) | `rgb(51, 51, 51)` | `#333333` |
| Page background | white | `#FFFFFF` |
| Star ratings / stat icon accents | orange/gold | ~`#F5A623` (sampled visually, verify) |

Logo: wordmark "M" built from two overlapping strokes — blue (`#2E9BE6`-ish) and red/pink (matches accent `#FE3E5E`) — plus "MAVERICK CONSULTING SOLUTIONS PTY LTD" small-caps lockup below it.

Typography: template uses a commercial font called **"CerebriSans"** (heading weight 700, body regular) — not freely licensable, so the rebuild needs a modern free pairing that reads similarly (geometric/humanist sans, confident and clean). Recommend **Sora or Plus Jakarta Sans** for headings + **Inter** for body (see design system proposal in the accompanying chat message).

## 5. Full inventory of issues to fix in the rebuild

1. Remove all "Mitech" brand leaks (About Us "Infrastructure Integration Technology" card, dummy case study alt-text references).
2. Replace all 4 dummy "Case studies" (Arden-Internal Networking, A Freeserve, Aqua – Research and Energy, Mitech-Smart Vision) — either real Maverick case studies or clearly marked `[TODO: add real case study]` cards, no links to `#`.
3. Remove or replace the fake "Top Training Companies / CIO Big Data 100 / Pharma Tech Outlook" award-logo strip (unverifiable, all `#` links, shared placeholder text).
4. Rewrite "Our services" tab copy on Home (Quality Assurance System / Highly Professional Staffs / Info Security Management) — currently boilerplate.
5. Fix broken "Download now (3MB)" brochure link on About (either supply a real PDF or remove the CTA).
6. Fix wrong phone number on About's "Call for advice now" link (`tel:190068668` → real number).
7. Verify or remove the "4.9/5.0 by 700+ customers / 3200+ clients" badge on About — unclear provenance.
8. Fix Team page subhead copy ("You can relay on our amazing features list..." — generic + grammatically off); replace with real "why work with our team" copy.
9. Make the Services nav consistent (today desktop dropdown is missing 2 of 4 Graphic Design links that the mobile nav has).
10. Replace stock/mockup portfolio images (watermarked "envato", "Firstname Lastname" business card, "Your Photo Here" placeholder) with real work samples or clearly marked placeholders.
11. All `href="#"` dead links (case studies, award logos, "Take the challenge!" band) need real destinations or removal.
12. No visible skip-link, no semantic landmarks confirmed, icon-only email links on Team page have no accessible label — accessibility pass needed sitewide.
13. Old site not confirmed to have genuine responsive breakpoints under test — rebuild must be verified mobile/tablet/desktop from scratch (do not assume old CSS as reference for responsive behavior).

## 6. What must be preserved as-is (do not "improve" away)

- Company name, tagline voice ("Excellent IT services for your success" / "vow your success" phrasing style), phone, email, both office addresses, all 21 service names, all real team member names/roles, the 4 real testimonials, the stat numbers (30/32/10/4.8), the two-tone red/blue "M" logo concept, and the navy + coral-pink brand palette.
