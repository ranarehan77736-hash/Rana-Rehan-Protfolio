/**
 * ============================================================================
 * RANA REHAN PORTFOLIO — VANILLA JAVASCRIPT INTERACTIONS
 * Lightweight, accessible, zero-dependency interaction layer.
 * ============================================================================
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Enable progressive enhancement animations only when JS is active
  document.documentElement.classList.add('js-ready');

  /* --------------------------------------------------------------------------
     Utility: Safe HTML Escaping for Dynamic Data Rendering
     -------------------------------------------------------------------------- */
  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
      window.lucide.createIcons();
    }
  }

  /* --------------------------------------------------------------------------
     1. Dynamic Copyright Year
     -------------------------------------------------------------------------- */
  function initCopyrightYear() {
    const yearEl = document.getElementById('copyright-year');
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }

  /* --------------------------------------------------------------------------
     2. Sticky Header Scroll State & Back-to-Top Visibility
     -------------------------------------------------------------------------- */
  function initScrollChrome() {
    const header = document.getElementById('site-header');
    const backToTop = document.getElementById('back-to-top');

    function onScroll() {
      const y = window.scrollY || window.pageYOffset;

      if (header && !header.dataset.alwaysScrolled) {
        header.classList.toggle('is-scrolled', y > 24);
      }

      if (backToTop) {
        backToTop.classList.toggle('is-visible', y > 480);
      }
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      });
    }
  }

  /* --------------------------------------------------------------------------
     3. Mobile Responsive Navigation
     -------------------------------------------------------------------------- */
  function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('primary-nav');
    if (!toggle || !nav) return;

    function setMenuState(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      nav.classList.toggle('is-open', open);
    }

    toggle.addEventListener('click', () => {
      const isOpen = toggle.getAttribute('aria-expanded') === 'true';
      setMenuState(!isOpen);
    });

    // Close menu when clicking any link inside nav
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuState(false));
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && nav.classList.contains('is-open')) {
        setMenuState(false);
        toggle.focus();
      }
    });

    // Close menu on outside click
    document.addEventListener('click', (event) => {
      if (
        nav.classList.contains('is-open') &&
        !nav.contains(event.target) &&
        !toggle.contains(event.target)
      ) {
        setMenuState(false);
      }
    });
  }

  /* --------------------------------------------------------------------------
     4. Active Navigation Link Highlighting on Scroll
     -------------------------------------------------------------------------- */
  function initActiveNavHighlight() {
    const navLinks = Array.from(document.querySelectorAll('.primary-nav .nav-link[href^="#"]'));
    if (!navLinks.length) return;

    const sections = navLinks
      .map((link) => document.querySelector(link.getAttribute('href')))
      .filter(Boolean);

    if (!sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const activeId = `#${entry.target.id}`;
          navLinks.forEach((link) => {
            link.classList.toggle('is-active', link.getAttribute('href') === activeId);
          });
        });
      },
      {
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0
      }
    );

    sections.forEach((section) => observer.observe(section));
  }

  /* --------------------------------------------------------------------------
     5. Scroll Reveal Animations (Respects prefers-reduced-motion)
     -------------------------------------------------------------------------- */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal');
    if (!revealEls.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealEls.forEach((el) => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     6. Accessible Info Modal (Services, CV Placeholder, Project Placeholders)
     -------------------------------------------------------------------------- */
  const modalController = (function () {
    const modal = document.getElementById('info-modal');
    const eyebrowEl = document.getElementById('modal-eyebrow');
    const titleEl = document.getElementById('modal-title');
    const bodyEl = document.getElementById('modal-body');
    const footerEl = document.getElementById('modal-footer');
    let lastFocused = null;

    if (!modal) {
      return { open: () => {}, close: () => {} };
    }

    function close() {
      modal.hidden = true;
      document.body.style.overflow = '';
      if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    function open({ eyebrow, title, bodyHtml, footerHtml }) {
      lastFocused = document.activeElement;
      eyebrowEl.textContent = eyebrow || 'Details';
      titleEl.textContent = title || '';
      bodyEl.innerHTML = bodyHtml || '';
      footerEl.innerHTML = footerHtml || '';
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      refreshIcons();

      const closeBtn = modal.querySelector('.modal__close');
      if (closeBtn) closeBtn.focus();
    }

    modal.addEventListener('click', (event) => {
      if (event.target.closest('[data-modal-close]')) {
        close();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !modal.hidden) {
        close();
      }
    });

    return { open, close };
  })();

  /* --------------------------------------------------------------------------
     7. Service Cards "Learn More" + CV Placeholder Button
     -------------------------------------------------------------------------- */
  function initInteractiveButtons() {
    // Service "Learn More" modals
    document.querySelectorAll('[data-service-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-service-modal');
        const service = window.PORTFOLIO_SERVICES && window.PORTFOLIO_SERVICES[key];
        if (!service) return;

        const listItems = service.deliverables
          .map((item) => `<li>${escapeHtml(item)}</li>`)
          .join('');

        modalController.open({
          eyebrow: service.eyebrow,
          title: service.title,
          bodyHtml: `
            <p>${escapeHtml(service.summary)}</p>
            <ul class="modal__list">${listItems}</ul>
          `,
          footerHtml: `
            <button type="button" class="btn btn--secondary btn--sm" data-modal-close>Close</button>
            <button type="button" class="btn btn--primary btn--sm" data-prefill-subject="${escapeHtml(service.subject)}">
              <span>Discuss This Service</span>
              <i data-lucide="arrow-right" aria-hidden="true"></i>
            </button>
          `
        });
      });
    });

    // Delegate "Discuss This Service" click inside modal
    document.addEventListener('click', (event) => {
      const prefillBtn = event.target.closest('[data-prefill-subject]');
      if (!prefillBtn) return;

      const subject = prefillBtn.getAttribute('data-prefill-subject');
      modalController.close();

      const subjectInput = document.getElementById('contact-subject');
      const contactSection = document.getElementById('contact');
      if (subjectInput) {
        subjectInput.value = subject;
      }
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      }
      if (subjectInput) {
        setTimeout(() => subjectInput.focus(), 350);
      }
    });

    // CV Download Placeholder Notice
    const cvBtn = document.getElementById('download-cv-btn');
    if (cvBtn && cvBtn.getAttribute('data-cv-placeholder') === 'true') {
      cvBtn.addEventListener('click', () => {
        modalController.open({
          eyebrow: 'CV Placeholder',
          title: 'CV File Not Uploaded Yet',
          bodyHtml: `
            <p>
              This button is intentionally configured as an editable placeholder because no CV PDF
              file was bundled yet.
            </p>
            <ul class="modal__list">
              <li>Place your PDF file inside <code>assets/cv/Rana-Rehan-CV.pdf</code></li>
              <li>Update the CV button in <code>index.html</code> to a direct download link</li>
              <li>Or request my latest CV directly via email</li>
            </ul>
          `,
          footerHtml: `
            <button type="button" class="btn btn--secondary btn--sm" data-modal-close>Close</button>
            <a href="mailto:ranarehan77736@gmail.com?subject=CV%20Request%20-%20Rana%20Rehan" class="btn btn--primary btn--sm">
              <span>Request CV via Email</span>
              <i data-lucide="mail" aria-hidden="true"></i>
            </a>
          `
        });
      });
    }

    // Copy Email Button
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        const email = copyBtn.getAttribute('data-copy');
        const label = copyBtn.querySelector('span');
        if (!email || !label) return;

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(email);
          } else {
            const temp = document.createElement('textarea');
            temp.value = email;
            temp.setAttribute('readonly', '');
            temp.style.position = 'absolute';
            temp.style.left = '-9999px';
            document.body.appendChild(temp);
            temp.select();
            document.execCommand('copy');
            document.body.removeChild(temp);
          }
          label.textContent = 'Copied!';
          setTimeout(() => {
            label.textContent = 'Copy email';
          }, 2200);
        } catch {
          label.textContent = 'Use mailto link';
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
     8. Project Cards Rendering & Filtering from js/projects.js
     -------------------------------------------------------------------------- */
  function initProjects() {
    const grid = document.getElementById('projects-grid');
    const filterBar = document.getElementById('project-filters');
    const projects = window.PORTFOLIO_PROJECTS;
    if (!grid || !Array.isArray(projects)) return;

    function renderProjects(category) {
      const filtered =
        category === 'All'
          ? projects
          : projects.filter((project) => project.category === category);

      grid.innerHTML = filtered
        .map((project) => {
          const thumbClass = `project-card__thumb--${escapeHtml(project.thumbStyle || 'seo')}`;
          const techHtml = (project.technologies || [])
            .map((tech) => `<li>${escapeHtml(tech)}</li>`)
            .join('');

          const viewAction = project.liveUrl
            ? `<a href="${escapeHtml(project.liveUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm">
                 <span>Live Website</span>
                 <i data-lucide="external-link" aria-hidden="true"></i>
               </a>`
            : project.isPlaceholder
              ? `<button type="button" class="btn btn--primary btn--sm" data-project-placeholder="${escapeHtml(project.id)}">
                   <span>View Project</span>
                   <i data-lucide="eye" aria-hidden="true"></i>
                 </button>`
              : '';

          const sourceBtnClass = project.liveUrl ? 'btn--secondary' : 'btn--primary';
          const sourceAction = project.sourceUrl
            ? `<a href="${escapeHtml(project.sourceUrl)}" target="_blank" rel="noopener noreferrer" class="btn ${sourceBtnClass} btn--sm">
                 <span>Source Code</span>
                 <i data-lucide="github" aria-hidden="true"></i>
               </a>`
            : '';

          return `
            <article class="project-card card">
              <div class="project-card__thumb ${thumbClass}" aria-hidden="true">
                <span class="project-card__badge">${escapeHtml(project.statusBadge || 'Project')}</span>
                <div class="thumb-graphic">
                  <span>${escapeHtml(project.thumbLabel || project.category)}</span>
                  <div class="thumb-graphic__bars">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
              <div class="project-card__body">
                <span class="project-card__category">${escapeHtml(project.category)}</span>
                <h3 class="project-card__title">${escapeHtml(project.title)}</h3>
                <p class="project-card__desc">${escapeHtml(project.description)}</p>
                <ul class="tech-list">${techHtml}</ul>
                <div class="project-card__actions">
                  ${viewAction}
                  ${sourceAction}
                </div>
              </div>
            </article>
          `;
        })
        .join('');

      refreshIcons();
    }

    renderProjects('All');

    if (filterBar) {
      filterBar.addEventListener('click', (event) => {
        const btn = event.target.closest('.filter-btn');
        if (!btn) return;

        const category = btn.getAttribute('data-filter') || 'All';
        filterBar.querySelectorAll('.filter-btn').forEach((b) => {
          const active = b === btn;
          b.classList.toggle('is-active', active);
          b.setAttribute('aria-selected', String(active));
        });

        renderProjects(category);
      });
    }

    // Placeholder project preview notice
    grid.addEventListener('click', (event) => {
      const btn = event.target.closest('[data-project-placeholder]');
      if (!btn) return;
      const id = btn.getAttribute('data-project-placeholder');
      const project = projects.find((item) => item.id === id);
      if (!project) return;

      modalController.open({
        eyebrow: project.category,
        title: project.title,
        bodyHtml: `
          <p>${escapeHtml(project.description)}</p>
          <p>
            This card is an editable placeholder slot so no unverified links or metrics are shown.
            To publish a live project here, update its entry in <code>js/projects.js</code> with
            a verified <code>liveUrl</code> and optional <code>sourceUrl</code>.
          </p>
        `,
        footerHtml: `
          <button type="button" class="btn btn--secondary btn--sm" data-modal-close>Close</button>
          <button type="button" class="btn btn--primary btn--sm" data-prefill-subject="${escapeHtml('Inquiry about: ' + project.title)}">
            <span>Ask About Similar Work</span>
            <i data-lucide="arrow-right" aria-hidden="true"></i>
          </button>
        `
      });
    });
  }

  /* --------------------------------------------------------------------------
     9. Blog Cards Rendering from js/projects.js
     -------------------------------------------------------------------------- */
  function initBlogCards() {
    const grid = document.getElementById('blog-grid');
    const articles = window.PORTFOLIO_ARTICLES;
    if (!grid || !Array.isArray(articles)) return;

    grid.innerHTML = articles
      .map(
        (article) => `
          <article class="blog-card card">
            <div class="blog-card__meta">
              <span class="blog-card__category">${escapeHtml(article.category)}</span>
              <span class="blog-card__time">${escapeHtml(article.readingTime)}</span>
            </div>
            <h3 class="blog-card__title">
              <a href="${escapeHtml(article.url)}">${escapeHtml(article.title)}</a>
            </h3>
            <p class="blog-card__excerpt">${escapeHtml(article.excerpt)}</p>
            <div class="blog-card__footer">
              <span class="blog-card__status">${escapeHtml(article.status)}</span>
              <a href="${escapeHtml(article.url)}" class="blog-card__link">
                <span>Read Article</span>
                <i data-lucide="arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          </article>
        `
      )
      .join('');

    refreshIcons();
  }

  /* --------------------------------------------------------------------------
     10. Contact Form Validation & Mailto Fallback
     -------------------------------------------------------------------------- */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const statusEl = document.getElementById('form-status');
    const fields = {
      name: document.getElementById('contact-name'),
      email: document.getElementById('contact-email'),
      subject: document.getElementById('contact-subject'),
      message: document.getElementById('contact-message')
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setFieldError(key, message) {
      const input = fields[key];
      const errEl = document.getElementById(`error-${key}`);
      if (!input || !errEl) return;
      input.classList.toggle('is-invalid', Boolean(message));
      input.setAttribute('aria-invalid', message ? 'true' : 'false');
      errEl.textContent = message || '';
    }

    function validateField(key) {
      const input = fields[key];
      if (!input) return true;
      const value = input.value.trim();

      if (key === 'name') {
        if (value.length < 2) {
          setFieldError(key, 'Please enter your name (at least 2 characters).');
          return false;
        }
      } else if (key === 'email') {
        if (!emailRegex.test(value)) {
          setFieldError(key, 'Please enter a valid email address.');
          return false;
        }
      } else if (key === 'subject') {
        if (value.length < 3) {
          setFieldError(key, 'Please enter a short subject for your message.');
          return false;
        }
      } else if (key === 'message') {
        if (value.length < 10) {
          setFieldError(key, 'Please include a brief message (at least 10 characters).');
          return false;
        }
      }

      setFieldError(key, '');
      return true;
    }

    Object.keys(fields).forEach((key) => {
      const input = fields[key];
      if (!input) return;
      input.addEventListener('blur', () => validateField(key));
      input.addEventListener('input', () => {
        if (input.classList.contains('is-invalid')) {
          validateField(key);
        }
      });
    });

    form.addEventListener('submit', (event) => {
      const mode = form.getAttribute('data-form-mode') || 'mailto';
      const valid = Object.keys(fields).map(validateField).every(Boolean);

      if (!valid) {
        event.preventDefault();
        if (statusEl) {
          statusEl.className = 'form-status form-status--error';
          statusEl.textContent = 'Please fix the highlighted fields before sending.';
        }
        const firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // If configured for a third-party static form endpoint later, allow native submit
      if (mode === 'endpoint' && form.getAttribute('action')) {
        return;
      }

      event.preventDefault();

      const recipient = form.getAttribute('data-recipient') || 'ranarehan77736@gmail.com';
      const name = fields.name.value.trim();
      const email = fields.email.value.trim();
      const subject = fields.subject.value.trim();
      const message = fields.message.value.trim();

      const emailBody = [
        `Name: ${name}`,
        `Email: ${email}`,
        '',
        'Message:',
        message
      ].join('\n');

      const mailtoUrl =
        `mailto:${encodeURIComponent(recipient)}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(emailBody)}`;

      if (statusEl) {
        statusEl.className = 'form-status form-status--success';
        statusEl.textContent =
          'Opening your email app with your message pre-filled. If it does not open automatically, email ranarehan77736@gmail.com directly.';
      }

      window.location.href = mailtoUrl;
    });
  }

  /* --------------------------------------------------------------------------
     Initialize Everything on DOM Ready
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initCopyrightYear();
    initScrollChrome();
    initMobileNav();
    initActiveNavHighlight();
    initProjects();
    initBlogCards();
    initInteractiveButtons();
    initContactForm();
    initScrollReveal();
    refreshIcons();
  });
})();

