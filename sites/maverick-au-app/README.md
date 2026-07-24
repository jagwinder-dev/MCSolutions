# Maverick Consulting Solutions — Web App

A full-stack site for **Maverick Consulting Solutions** (Gosford, NSW, Australia),
built in the same **Node.js + Express** style as [`mavericks-sg`](../mavericks-sg).
It reuses that design language (Montserrat / navy–teal–gold) with the Australian
brand's real content: web development, mobile apps, digital marketing and graphic
design.

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
maverick-au-app/
├── server.js               # Express app entry point (default port 3100)
├── package.json
├── .env.example            # Environment variable template
├── .gitignore
├── routes/
│   ├── api.js              # GET /api/services, /stats, /thoughts, /health
│   └── contact.js          # POST /api/contact  (sends email)
└── public/                 # Static assets served by Express
    ├── index.html
    ├── css/main.css
    ├── js/main.js          # ES module — nav, reveal, API fetch, form
    └── images/favicon.svg
```

---

## Quick Start

```bash
cd sites/maverick-au-app
npm install
cp .env.example .env       # then edit values
npm run dev                # node --watch, auto-restarts
```

Open **http://localhost:3100**.

> Runs on port **3100** by default so it can run at the same time as
> `mavericks-sg` (port 3000). Leave SMTP blank in development — form
> submissions are logged to the console instead of emailed.

---

## API Endpoints

| Method | Endpoint          | Description                        |
|--------|-------------------|------------------------------------|
| GET    | `/api/health`     | Server health check                |
| GET    | `/api/services`   | The four service categories        |
| GET    | `/api/stats`      | Headline stat numbers              |
| GET    | `/api/thoughts`   | Blog / thoughts articles           |
| POST   | `/api/contact`    | Submits the contact form           |

---

## Company Details

- **Maverick Consulting Solutions**
- Waterfall Arcade, Suite 9, 201 Mann St, Gosford NSW 2250, Australia
- info@maverickconsultingsolutions.com · +61 404 007 386 · Mon–Fri, 9am–5pm

Edit services, stats and thoughts in `routes/api.js`; colours are CSS custom
properties in `public/css/main.css` under `:root {}`.

---

© 2026 Maverick Consulting Solutions
