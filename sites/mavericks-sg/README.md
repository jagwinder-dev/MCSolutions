# Mavericks Consulting Website

A full-stack replica of [mavericks-consulting.com](https://www.mavericks-consulting.com/) built with **Node.js 20+**, **Express 4**, and vanilla **ES2022+ JavaScript**.

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Runtime   | Node.js 20+ (ESM)                   |
| Backend   | Express 4, Helmet, Compression      |
| Email     | Nodemailer (SMTP)                   |
| Security  | express-rate-limit, Helmet CSP      |
| Frontend  | Vanilla JS (ES2022+), CSS3          |
| Fonts     | Google Fonts (Montserrat, Open Sans)|

---

## Project Structure

```
mavericks/
├── server.js               # Express app entry point
├── package.json
├── .env.example            # Environment variable template
├── .gitignore
├── routes/
│   ├── api.js              # GET /api/services, /stats, /thoughts, /health
│   └── contact.js          # POST /api/contact  (sends email)
└── public/                 # Static assets served by Express
    ├── index.html
    ├── css/
    │   └── main.css
    ├── js/
    │   └── main.js         # ES module — nav, reveal, API fetch, form
    └── images/
        └── favicon.svg
```

---

## Quick Start

### 1. Prerequisites

- Node.js **v20 or higher** — check with `node -v`
- npm v9+ (bundled with Node 20)

### 2. Install dependencies

```bash
cd mavericks
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

```env
PORT=3000
NODE_ENV=development

# Leave SMTP blank in development — form submissions are logged to console instead
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CONTACT_TO=people@mavericks-consulting.com
```

> **Gmail tip:** use an [App Password](https://support.google.com/accounts/answer/185833), not your account password.

### 4. Run in development

```bash
npm run dev
```

Uses `node --watch` (built-in to Node 18+) — restarts automatically on file changes.

### 5. Run in production

```bash
NODE_ENV=production npm start
```

Open **http://localhost:3000** in your browser.

---

## API Endpoints

| Method | Endpoint          | Description                     |
|--------|-------------------|---------------------------------|
| GET    | `/api/health`     | Server health check             |
| GET    | `/api/services`   | Returns the four service cards  |
| GET    | `/api/stats`      | Returns headline stat numbers   |
| GET    | `/api/thoughts`   | Returns blog/thoughts articles  |
| POST   | `/api/contact`    | Submits the contact form        |

### POST `/api/contact` payload

```json
{
  "name":    "Jane Smith",
  "email":   "jane@example.com",
  "phone":   "+65 9123 4567",
  "subject": "Project enquiry",
  "message": "Hello, we'd like to discuss a project..."
}
```

**Success response:**
```json
{ "success": true, "message": "Thanks, we will get back to you as soon as we can." }
```

**Validation error response (400):**
```json
{ "success": false, "errors": ["Valid email is required."] }
```

---

## Features

- **Fixed navigation** — transparent on hero, opaque + shadow on scroll; active section highlighting
- **Mobile hamburger menu** — accessible, keyboard-navigable with ARIA attributes
- **Hero section** — full-viewport with animated geometric rings and scroll indicator
- **Stats bar** — loaded dynamically from `/api/stats`
- **About section** — company description + values grid with hover effects
- **Services grid** — loaded dynamically from `/api/services` with SVG icons
- **Our Work** — recipe formula banner + industry client strip
- **Our Thoughts** — blog cards loaded from `/api/thoughts`
- **Contact form** — client-side validation, loading state, server-side POST to `/api/contact`
- **Back-to-top button** — appears after 400px scroll
- **Scroll reveal** — IntersectionObserver-based animations
- **Rate limiting** — 200 req/15 min globally; 10 contact submissions/hour
- **Security headers** — Helmet with Content Security Policy
- **Accessibility** — semantic HTML, ARIA roles/labels, keyboard focus, reduced-motion support
- **Responsive** — mobile-first, works from 320px upwards

---

## Customisation

### Updating services or stats

Edit the arrays in `routes/api.js` — no restart needed in dev (watch mode auto-reloads).

### Changing colours

All design tokens are CSS custom properties in `public/css/main.css` under `:root {}`:

```css
--navy:  #1a2340;
--teal:  #00b4c8;
--gold:  #e8a020;
```

---

## Deployment Notes

- Set `NODE_ENV=production` to enable long-lived static caching (7 days).
- Place behind a reverse proxy (nginx / Caddy) for TLS termination.
- Set `ALLOWED_ORIGIN` in `.env` to restrict CORS to your domain.
- Consider PM2 or a systemd service for process management in production.

---

© 2024 Mavericks Consulting
