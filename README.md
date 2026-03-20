# First Call Exterior Cleaning

Professional exterior cleaning company serving Cape Coral and Southwest Florida. This repository contains the full production website — 27 pages built from reusable templates with a simple Node.js build system.

**Live site:** [firstcallexteriorcleaning.com](http://firstcallexteriorcleaning.com/)

---

## Tech Stack

- **HTML/CSS/JS** — No frameworks, no dependencies. Pure static site.
- **Node.js build system** — Assembles pages from `src/` templates + `includes/` partials.
- **Zero runtime dependencies** — Only Node.js required for building.

## Project Structure

```
├── src/                    # Source templates (edit these)
│   ├── index.html
│   ├── services/           # 13 service pages
│   ├── service-areas/      # 11 location pages
│   └── blog/               # 2 blog articles
├── includes/               # Shared HTML partials
│   ├── head.html           # Meta tags, fonts, CSS link
│   ├── nav.html            # Top bar + navigation
│   ├── quote-form.html     # Lead capture form
│   ├── cta.html            # Call-to-action band
│   └── footer.html         # Footer + JS link
├── css/styles.css          # Global stylesheet
├── js/main.js              # Gallery carousel, form handler, FAQ accordion
├── img/                    # Organized photo library (67 images)
├── build.js                # Build script
├── package.json
├── robots.txt
├── sitemap.xml
├── favicon.svg
└── index.html              # Built output (generated)
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)

### Build

```bash
# Generate all 27 pages from source templates
npm run build
```

### Watch Mode

```bash
# Auto-rebuild when src/ or includes/ files change
npm run watch
```

## How It Works

Source templates in `src/` use `{{include:name}}` markers that reference partials in `includes/`. The build script resolves these includes and replaces two template variables:

| Variable | Purpose | Example output |
|---|---|---|
| `{{BASE}}` | Relative path prefix based on file depth | `../` for subpages, empty for root |
| `{{PAGE_ID}}` | Page identifier derived from filename | `dock-cleaning`, `index` |

**Example source template:**

```html
<head>
  {{include:head}}
  <title>Dock Cleaning | First Call Exterior Cleaning</title>
</head>
<body>
  {{include:nav}}
  <!-- Page-specific content here -->
  {{include:cta}}
  {{include:footer}}
</body>
```

## Making Changes

### Update navigation, footer, or form

Edit the relevant file in `includes/`, then run `npm run build`. The change propagates to all 27 pages.

### Add a new service page

1. Create `src/services/new-service.html` using an existing service page as a template
2. Add the service link to `includes/nav.html` and `includes/footer.html`
3. Add the form checkbox to `includes/quote-form.html`
4. Run `npm run build`

### Add a new service area

1. Create `src/service-areas/new-area.html` using an existing area page as a template
2. Add the area link to `includes/nav.html`
3. Run `npm run build`

## Services

- Paver Cleaning & Sealing
- Pool Cage, Patio & Lanai Cleaning
- Window Cleaning
- Soft Wash Roof Cleaning
- Driveway & Sidewalk Cleaning
- House Washing, Gutter & Soffit
- Fence & Wall Cleaning
- Dock Cleaning
- Rust Removal

## Service Areas

Cape Coral (HQ) | Fort Myers | North Fort Myers | Lehigh Acres | Estero | Bonita Springs | Naples | Pine Island | Sanibel Island | Punta Gorda | Port Charlotte | St. James City

## Contact

- **Phone:** (239) 360-3448
- **Address:** 3412 SW 7th Pl, Cape Coral, FL 33914
- **Hours:** Mon–Sat 7AM–6PM

## License

All rights reserved. &copy; 2026 First Call Exterior Cleaning.
