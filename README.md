# MCSolutions — Maverick / Mavericks Websites

This repository holds **three separate websites**, each self-contained in its own
folder under [`sites/`](./sites).

```
MCSolutions/
└── sites/
    ├── maverick-au/       # Site 1 — static editorial site (GitHub Pages)
    ├── mavericks-sg/      # Site 2 — Node/Express app (Singapore brand)
    └── maverick-au-app/   # Site 3 — Node/Express app (AU brand, mavericks design)
```

| # | Folder | Brand | Type | Stack | How to run |
|---|--------|-------|------|-------|------------|
| 1 | [`sites/maverick-au`](./sites/maverick-au) | Maverick Consulting Solutions (Gosford, NSW, AU) | Static, multi-page | Semantic HTML5 + plain CSS + vanilla JS | `node serve.js` (or any static server) |
| 2 | [`sites/mavericks-sg`](./sites/mavericks-sg) | Mavericks Consulting (Singapore) | Single-page + API | Node 20, Express 4 | `cd sites/mavericks-sg && npm install && npm run dev` → port **3000** |
| 3 | [`sites/maverick-au-app`](./sites/maverick-au-app) | Maverick Consulting Solutions (AU) | Single-page + API | Node 20, Express 4 | `cd sites/maverick-au-app && npm install && npm run dev` → port **3100** |

Sites **2** and **3** share the same design language (Montserrat / navy–teal–gold)
and Express architecture; site **3** is the Australian brand rebuilt in that style,
running on a different port so both can run at once.

---

## The three sites

### 1 — `maverick-au` (static)
The original from-scratch rebuild of the Maverick Consulting Solutions site in a
bold black-on-white editorial style. Pure HTML/CSS/JS, no build step. See its own
[`README.md`](./sites/maverick-au/README.md) and `WEBSITE-ANALYSIS.md` for the
content/design audit.

### 2 — `mavericks-sg` (Node/Express)
A full-stack replica of mavericks-consulting.com (Singapore) — hero, stats,
services, "our work" recipe banner, thoughts, and a working contact form backed by
Express API routes. See [`sites/mavericks-sg/README.md`](./sites/mavericks-sg/README.md).

### 3 — `maverick-au-app` (Node/Express)
The Australian brand rebuilt in the mavericks-sg style, with Maverick's real
content (10 years' experience, Gosford NSW office, web/mobile/marketing/design
services). See [`sites/maverick-au-app/README.md`](./sites/maverick-au-app/README.md).

---

## Notes

- **GitHub Pages:** site 1 previously served from the repo root. Now that it lives
  in `sites/maverick-au/`, update the Pages source accordingly (e.g. publish that
  folder to a `gh-pages` branch, or point Pages at it) — a subfolder under `sites/`
  is not served automatically.
- Each Node app has its own `package.json`; run `npm install` inside each folder.
