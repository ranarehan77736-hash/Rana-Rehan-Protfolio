# Rana Rehan — Personal Brand & Professional Portfolio Website

A lightweight, responsive, SEO-ready static portfolio website built exclusively with **HTML5**, **CSS3**, and **Vanilla JavaScript** for **Rana Rehan (SEO Specialist | Full-Stack Developer)**.

No frameworks, no build tools, no paid services, and no backend required. Ready for free static deployment on **GitHub Pages**, **Netlify**, or **Cloudflare Pages**.

---

## Project Structure

```text
rana-rehan-portfolio/
├── index.html                    # Main portfolio page (11 sections + JSON-LD)
├── robots.txt                    # Search crawler directives
├── sitemap.xml                   # XML sitemap (update domain before launch)
├── favicon.svg                   # Custom RR brand monogram favicon
├── README.md                     # Setup, editing & free deployment guide
├── css/
│   └── style.css                 # Design system, responsive layout & accessibility
├── js/
│   ├── projects.js               # Editable arrays for projects, blog & services
│   └── main.js                   # Vanilla JS interactions, validation & observers
├── assets/
│   ├── images/
│   │   └── og-preview.svg        # Open Graph / social share graphic
│   ├── icons/
│   │   └── seo-mark.svg          # Local SVG icon asset
│   └── cv/
│       └── README.txt            # Place your CV PDF here
└── blog/
    ├── technical-seo-guide.html  # Sample Technical SEO static article
    ├── website-performance.html  # Sample Web Performance static article
    └── on-page-seo.html          # Sample On-Page SEO static article
```

---

## 1. How to Preview Locally

Because this is a pure static website, you can preview it in two ways:

1. **Direct Browser Open:** Double-click `index.html` to open it in Chrome, Edge, Firefox, or Safari.
2. **Local Static Server (Recommended):** Run a local server from the `rana-rehan-portfolio/` folder so relative paths behave identically to production:
   ```bash
   # Using Python 3
   python -m http.server 8080
   ```
   Then visit `http://localhost:8080` in your browser.
   *(Or use the VS Code **Live Server** extension.)*

---

## 2. How to Edit Personal Information

Open `index.html` in any code editor:
- **Hero & About:** Update text in `#home` and `#about`.
- **Experience & Education:** Update the timeline items inside `#experience`.
- **Contact Details:** Update your email, location, and LinkedIn link in `#contact` and `<footer>`, plus the JSON-LD `<script type="application/ld+json">` block inside `<head>`.

---

## 3. How to Add or Edit Projects

Open `js/projects.js` and edit the `window.PORTFOLIO_PROJECTS` array:

```js
{
  id: 'my-project-slug',
  title: 'Your Real Project Name',
  category: 'Web Development', // SEO Projects | Technical SEO | Web Development | Frontend Development
  thumbStyle: 'web',           // seo | web | frontend | strategy
  thumbLabel: 'Live Build',
  statusBadge: 'Completed',
  description: 'Brief, factual summary of the project.',
  technologies: ['HTML5', 'CSS3', 'JavaScript'],
  liveUrl: 'https://example.com',
  sourceUrl: 'https://github.com/your-username/your-repo', // optional; leave "" if private
  isPlaceholder: false
}
```

> **Tip:** Also update the static fallback cards inside `#projects-grid` in `index.html` if you want search crawlers without JavaScript execution to index your latest project titles directly.

---

## 4. How to Add Blog Articles

1. Duplicate one of the existing files inside `blog/` (for example `blog/technical-seo-guide.html`) and rename it with a clean, hyphenated slug (e.g., `blog/core-web-vitals-checklist.html`).
2. Update the `<title>`, `<meta name="description">`, `<link rel="canonical">`, Open Graph tags, JSON-LD `Article` metadata, and article body.
3. Add a matching entry to `window.PORTFOLIO_ARTICLES` in `js/projects.js` (and optionally in the static fallback inside `#blog-grid` in `index.html`).
4. Add the new article URL to `sitemap.xml`.

---

## 5. How to Update Technical SEO Metadata Before Launch

Before deploying to your live domain, find and replace `https://YOUR-DOMAIN.com` with your actual domain (e.g., `https://ranarehan.dev`) in:
- `index.html` (canonical, Open Graph `og:url` & `og:image`, Twitter image, JSON-LD)
- `blog/technical-seo-guide.html`
- `blog/website-performance.html`
- `blog/on-page-seo.html`
- `robots.txt`
- `sitemap.xml`

---

## 6. How to Upload Your CV

1. Copy your CV PDF into `assets/cv/` (for example: `assets/cv/Rana-Rehan-CV.pdf`).
2. Open `index.html` and locate `#download-cv-btn` in the About section.
3. Replace the `<button>` with a direct download link:
   ```html
   <a
     href="assets/cv/Rana-Rehan-CV.pdf"
     download="Rana-Rehan-CV.pdf"
     class="btn btn--secondary btn--full"
   >
     <i data-lucide="file-down" aria-hidden="true"></i>
     <span>Download CV</span>
   </a>
   ```

---

## 7. Optional: Upgrading the Contact Form

By default, the contact form validates all fields and opens the visitor's email client via a `mailto:` link so it works reliably on any static host.

To receive submissions directly in your inbox without opening an email app, you can connect a free static form service such as **Formspree**, **Web3Forms**, or **Netlify Forms**:
1. Create a free form endpoint.
2. On `<form id="contact-form">` in `index.html`, add `action="YOUR_ENDPOINT_URL" method="POST"` and change `data-form-mode="mailto"` to `data-form-mode="endpoint"`.

---

## 8. Free Deployment Guides

### Option A: Deploy on GitHub Pages (Free)
1. Create a public repository on GitHub (e.g., `rana-rehan-portfolio` or `<username>.github.io`).
2. Push the contents of `rana-rehan-portfolio/` to the `main` branch.
3. Go to **Repository Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/ (root)`, and click **Save**.
5. Your site will be live at `https://<username>.github.io/<repo-name>/` (or `https://<username>.github.io/`).

### Option B: Deploy on Netlify (Free)
1. Sign in at [netlify.com](https://www.netlify.com/).
2. Click **Add new site → Deploy manually** and drag-and-drop the `rana-rehan-portfolio/` folder—or connect your GitHub repository with an empty build command and publish directory `.`.
3. Netlify automatically provisions HTTPS and gives you a live `.netlify.app` URL.

### Option C: Deploy on Cloudflare Pages (Free)
1. Sign in at [dash.cloudflare.com](https://dash.cloudflare.com/) and open **Workers & Pages → Create → Pages**.
2. Connect your GitHub repository (or upload the `rana-rehan-portfolio/` folder via Direct Upload).
3. Leave **Build command** blank and set **Build output directory** to `/` (root).
4. Click **Save and Deploy** to publish globally with automatic HTTPS.

---

## 9. How to Connect a Custom Domain Later

1. Purchase a domain from a registrar (Cloudflare Registrar, Namecheap, Porkbun, etc.).
2. Add your custom domain in your hosting dashboard (**GitHub Pages → Custom domain**, **Netlify → Domain management**, or **Cloudflare Pages → Custom domains**).
3. Add the DNS records (`CNAME` or `A`/`AAAA` records) shown by your host.
4. Enable **Enforce HTTPS / Automatic SSL** once DNS propagates.
5. Update `https://YOUR-DOMAIN.com` across your HTML files, `robots.txt`, and `sitemap.xml`, then submit your sitemap in **Google Search Console**.

