/**
 * ============================================================================
 * PORTFOLIO DATA — VERIFIED LIVE PROJECTS, BLOG ARTICLES & SERVICE DETAILS
 * ============================================================================
 * To add or update a project:
 * 1. Edit an object in PORTFOLIO_PROJECTS or add a new one.
 * 2. Add a real `liveUrl` and/or `sourceUrl` (leave empty string "" if none).
 * 3. Keep `category` set to one of:
 *    - "SEO Projects"
 *    - "Technical SEO"
 *    - "Web Development"
 *    - "Frontend Development"
 */

window.PORTFOLIO_PROJECTS = [
  {
    id: 'rbo-accounting-uae',
    title: 'RBO Accounting & Audit Firm (UAE)',
    category: 'Technical SEO',
    thumbStyle: 'seo',
    thumbLabel: 'rboaccounting.ae',
    statusBadge: 'Live Project',
    description:
      'Live business website for RBO, an accounting, audit, and FTA-registered tax consultancy in Ajman Free Zone, UAE — featuring SEO-structured pages, metadata optimization, and responsive frontend engineering.',
    technologies: ['Technical SEO', 'On-Page SEO', 'React.js', 'Responsive Design'],
    liveUrl: 'https://www.rboaccounting.ae/',
    sourceUrl: '',
    isPlaceholder: false
  },
  {
    id: 'qualifiedleadsx-qlx',
    title: 'QualifiedLeadsX (QLX) — Lead Generation Agency',
    category: 'SEO Projects',
    thumbStyle: 'strategy',
    thumbLabel: 'qualifiedleadsx.com',
    statusBadge: 'Live Project',
    description:
      'Live agency website for QualifiedLeadsX, a done-for-you lead generation and appointment-setting agency for service businesses — built with clear conversion hierarchy, structured SEO metadata, and responsive UI.',
    technologies: ['On-Page SEO', 'Technical SEO', 'Web Development', 'Responsive Design'],
    liveUrl: 'https://www.qualifiedleadsx.com',
    sourceUrl: '',
    isPlaceholder: false
  },
  {
    id: 'seven-figure-studio',
    title: 'Seven Figure Studio — UGC Content Agency',
    category: 'SEO Projects',
    thumbStyle: 'seo',
    thumbLabel: 'sevenfigurestudio.us',
    statusBadge: 'Live Project',
    description:
      'Live website for Seven Figure Studio, a UGC content agency producing video ads, AI UGC, and VSLs for brands and coaches — designed for fast presentation, clean on-page SEO structure, and responsive usability.',
    technologies: ['On-Page SEO', 'Technical SEO', 'Website Performance', 'Responsive Design'],
    liveUrl: 'https://sevenfigurestudio.us',
    sourceUrl: '',
    isPlaceholder: false
  },
  {
    id: 'fair-invest',
    title: 'FairInvest — Intelligent Investment Platform',
    category: 'Web Development',
    thumbStyle: 'web',
    thumbLabel: 'fairinvest.site',
    statusBadge: 'Live Platform',
    description:
      'Live full-stack investment platform engineered with a client web application, dedicated admin panel, backend API, and MySQL database schema.',
    technologies: ['JavaScript', 'Full-Stack Development', 'Admin Panel', 'Responsive Design'],
    liveUrl: 'https://fairinvest.site/login',
    sourceUrl: '',
    isPlaceholder: false
  },
  {
    id: 'stocksphere-app',
    title: 'StockSphere — Full-Stack Web App',
    category: 'Web Development',
    thumbStyle: 'frontend',
    thumbLabel: 'stocksphere-six.vercel.app',
    statusBadge: 'Live on Vercel',
    description:
      'Full-stack JavaScript web application with dedicated frontend and backend architecture, deployed live on Vercel for interactive client preview.',
    technologies: ['JavaScript', 'Full-Stack Development', 'Frontend', 'Backend'],
    liveUrl: 'https://stocksphere-six.vercel.app/',
    sourceUrl: 'https://github.com/ranarehan77736-hash/stocksphere',
    isPlaceholder: false
  },
  {
    id: 'my-saas-app',
    title: 'SaaS Web Application Architecture',
    category: 'Web Development',
    thumbStyle: 'web',
    thumbLabel: 'Next.js App Router',
    statusBadge: 'GitHub Repository',
    description:
      'Modern SaaS application built with Next.js App Router, modular UI components, and middleware-driven routing architecture.',
    technologies: ['Next.js', 'React.js', 'Full-Stack Development'],
    liveUrl: '',
    sourceUrl: 'https://github.com/ranarehan77736-hash/my-saas-app',
    isPlaceholder: false
  }
];

/**
 * Editable Blog Articles Array
 * Add new static HTML files inside /blog/ and register them here.
 */
window.PORTFOLIO_ARTICLES = [
  {
    title: "Technical SEO: A Beginner's Guide to Building Search-Friendly Websites",
    category: 'Technical SEO',
    readingTime: 'Reading time: Placeholder',
    status: 'Sample Guide',
    excerpt:
      'Learn how crawlability, clean HTML5 semantics, canonical tags, XML sitemaps, and structured data help search engines discover and understand your website.',
    url: 'blog/technical-seo-guide.html'
  },
  {
    title: 'Website Performance: Why Website Speed Matters for SEO',
    category: 'Web Performance',
    readingTime: 'Reading time: Placeholder',
    status: 'Sample Guide',
    excerpt:
      'Understand how page load speed, asset optimization, layout stability, and Core Web Vitals considerations influence both user experience and search readiness.',
    url: 'blog/website-performance.html'
  },
  {
    title: 'On-Page SEO: How to Optimize Your Website Content',
    category: 'On-Page SEO',
    readingTime: 'Reading time: Placeholder',
    status: 'Sample Guide',
    excerpt:
      'A practical walkthrough of title tags, meta descriptions, heading hierarchy, internal linking, and aligning page structure with user search intent.',
    url: 'blog/on-page-seo.html'
  }
];

/**
 * Service Details for the "Learn More" Modal
 * Transparent scope descriptions without unrealistic ranking guarantees.
 */
window.PORTFOLIO_SERVICES = {
  'technical-seo': {
    eyebrow: 'SEO Foundations',
    title: 'Technical SEO',
    summary:
      'Ensure search engines can efficiently crawl, render, and index your website by strengthening its underlying technical architecture.',
    deliverables: [
      'Crawlability, robots.txt, and XML sitemap review',
      'Indexability checks and canonical tag hygiene',
      'Semantic HTML5 structure and heading hierarchy audit',
      'Schema.org JSON-LD structured data recommendations'
    ],
    subject: 'Inquiry: Technical SEO Audit & Foundations'
  },
  'on-page-seo': {
    eyebrow: 'Content & Relevance',
    title: 'On-Page SEO',
    summary:
      'Refine page-level signals so both visitors and search engines immediately understand the topic and value of every key page.',
    deliverables: [
      'Title tag and meta description optimization',
      'Logical H1–H3 content structuring and readability improvements',
      'Internal linking architecture and descriptive anchor text',
      'Image alt-text and metadata alignment'
    ],
    subject: 'Inquiry: On-Page SEO Optimization'
  },
  'keyword-research': {
    eyebrow: 'Search Strategy',
    title: 'Keyword Research',
    summary:
      'Uncover relevant search queries and content opportunities tailored to your business offerings and audience intent.',
    deliverables: [
      'Topic discovery and search-intent categorization',
      'Page-to-keyword mapping to prevent content overlap',
      'Actionable content structure recommendations',
      'Prioritized editorial roadmap for organic growth'
    ],
    subject: 'Inquiry: Keyword Research & Content Plan'
  },
  'website-development': {
    eyebrow: 'Modern Engineering',
    title: 'Website Development',
    summary:
      'Build clean, responsive, maintainable websites designed from day one for usability, accessibility, and search-engine readiness.',
    deliverables: [
      'Responsive layouts across mobile, tablet, and desktop',
      'Semantic HTML5, modern CSS3, JavaScript, React.js, or Next.js',
      'SEO-friendly URL and metadata foundations built in',
      'Clean, maintainable codebase ready for future growth'
    ],
    subject: 'Inquiry: Website Development Project'
  },
  'performance-optimization': {
    eyebrow: 'Speed & Core Web Vitals',
    title: 'Website Performance Optimization',
    summary:
      'Identify and resolve frontend bottlenecks that slow down loading or cause jarring layout shifts for visitors.',
    deliverables: [
      'Asset, image sizing, and lazy-loading optimization',
      'Render-blocking script and stylesheet reduction',
      'Layout shift prevention and responsive scaling review',
      'Core Web Vitals considerations (LCP, INP, CLS)'
    ],
    subject: 'Inquiry: Website Performance Optimization'
  },
  'qa-testing': {
    eyebrow: 'Reliability & Usability',
    title: 'Website Testing & Quality Assurance',
    summary:
      'Catch visual regressions, responsive breakages, and functional bugs before your users encounter them.',
    deliverables: [
      'Manual functional testing of forms, links, and user flows',
      'Cross-viewport responsive checks (mobile, tablet, desktop)',
      'Clear, reproducible bug reports with severity notes',
      'Basic accessibility and keyboard navigation verification'
    ],
    subject: 'Inquiry: Website Testing & Quality Assurance'
  }
};
