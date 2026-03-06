// ============================================================
// Portfolio Renderer — builds all section HTML from PortfolioData.
// Runs at DOMContentLoaded (before script.js initialises jQuery).
// ============================================================
'use strict';

var PortfolioRender = (function () {
    var D = PortfolioData;

    // ── Utility: HTML-encode a string ──────────────────────
    function esc(str) {
        return String(str)
            .replace(/&/g,  '&amp;')
            .replace(/</g,  '&lt;')
            .replace(/>/g,  '&gt;')
            .replace(/"/g,  '&quot;')
            .replace(/'/g,  '&#39;');
    }

    // ── Fill a section element with HTML ──────────────────
    function fill(id, html) {
        var el = document.getElementById(id);
        if (el) el.innerHTML = html;
    }

    // ══════════════════════════════════════════════════════
    // 1. Navigation
    // ══════════════════════════════════════════════════════
    function renderNav() {
        var nav = document.getElementById('main-nav');
        if (!nav) return;
        var links = D.nav.map(function (item) {
            return '<a class="nav-link' + (item.active ? ' active' : '') + '" href="' + item.href + '">'
                + '<i class="' + item.icon + '"></i>'
                + '<span>' + esc(item.label) + '</span>'
                + '</a>';
        }).join('');
        links += '<button id="theme-toggle" aria-label="Toggle dark/light mode" title="Toggle dark/light mode">'
               + '<i class="fas fa-moon"></i></button>';
        links += '<a href="#section6" class="nav-mobile-cta">Contact Me <i class="fas fa-arrow-right"></i></a>';
        nav.innerHTML = links;
    }

    // ══════════════════════════════════════════════════════
    // 2. Hero + About (section1)
    // ══════════════════════════════════════════════════════
    function renderHero() {
        var p = D.profile;

        var metricsHtml = p.heroMetrics.map(function (m) {
            var cnt = m.count !== null
                ? ' data-count="' + m.count + '"' + (m.suffix ? ' data-suffix="' + esc(m.suffix) + '"' : '')
                : '';
            return '<div><h3' + cnt + '>' + esc(m.value) + '</h3><p>' + esc(m.label) + '</p></div>';
        }).join('');

        var infoChipsHtml = p.infoChips.map(function (c) {
            return '<div class="info-chip"><i class="' + c.icon + '"></i><span>' + esc(c.text) + '</span></div>';
        }).join('');

        var chipsHtml = p.aboutChips.map(function (c) {
            return '<span class="about-chip"><i class="' + c.icon + '"></i> ' + esc(c.text) + '</span>';
        }).join('');

        var bioHtml = p.bio.map(function (para) { return '<p>' + esc(para) + '</p>'; }).join('');

        var statCardsHtml = p.statsCards.map(function (s) {
            var cnt = s.count !== null
                ? ' data-count="' + s.count + '"' + (s.suffix ? ' data-suffix="' + esc(s.suffix) + '"' : '')
                : '';
            return '<div class="about-stat-card">'
                + '<div class="stat-icon stat-icon--' + s.color + '"><i class="' + s.icon + '"></i></div>'
                + '<div><h3' + cnt + '>' + esc(s.value) + '</h3><p>' + esc(s.label) + '</p></div>'
                + '</div>';
        }).join('');

        fill('section1',
            '<div class="container">'
            + '<div class="hero">'
            +   '<div class="hero-text">'
            +     '<h1>Naing <span class="name-accent">Naing Maw</span></h1>'
            +     '<p class="hero-subtitle">' + esc(p.subtitle) + '</p>'
            +     '<p class="hero-lead">' + esc(p.lead) + '</p>'
            +     '<div class="hero-actions">'
            +       '<a href="#section6" class="btn btn-primary"><i class="fas fa-paper-plane"></i>&nbsp; Contact Me</a>'
            +       '<a href="#section-exp" class="btn btn-outline">View Experience</a>'
            +       '<a href="' + esc(p.cvUrl) + '" class="btn btn-cv" download><i class="fas fa-download"></i>&nbsp; Download CV</a>'
            +     '</div>'
            +     '<div class="hero-metrics">' + metricsHtml + '</div>'
            +   '</div>'
            +   '<div class="hero-photo-only">'
            +     '<div class="profile-photo-ring"><div class="profile-photo-frame">'
            +       '<img src="' + esc(p.photo) + '" alt="' + esc(p.name) + '">'
            +     '</div></div>'
            +     '<div class="hero-info-chips">' + infoChipsHtml + '</div>'
            +   '</div>'
            + '</div>'
            + '<div class="about-block">'
            +   '<div class="section-heading">'
            +     '<span class="section-eyebrow">Who I Am</span>'
            +     '<h2>About Me</h2>'
            +   '</div>'
            +   '<div class="about-content">'
            +     '<div class="about-bio-text">'
            +       '<div class="about-chips">' + chipsHtml + '</div>'
            +       bioHtml
            +     '</div>'
            +     '<div class="about-stats-col">' + statCardsHtml + '</div>'
            +   '</div>'
            + '</div>'
            + '</div>'
        );
    }

    // ══════════════════════════════════════════════════════
    // 3. Key Highlights (section-highlights)
    // ══════════════════════════════════════════════════════
    function renderHighlights() {
        var cardsHtml = D.highlights.map(function (h) {
            return '<div class="highlight-card highlight-card--' + h.color + '">'
                + '<div class="hl-icon hl-icon--' + h.color + '"><i class="' + h.icon + '"></i></div>'
                + '<h4>' + esc(h.title) + '</h4>'
                + '<p>' + esc(h.text) + '</p>'
                + '</div>';
        }).join('');

        fill('section-highlights',
            '<div class="container">'
            + '<div class="section-heading">'
            +   '<span class="section-eyebrow">Career Snapshot</span>'
            +   '<h2>Key Highlights</h2>'
            + '</div>'
            + '<div class="highlights-grid">' + cardsHtml + '</div>'
            + '</div>'
        );
    }

    // ══════════════════════════════════════════════════════
    // 4. Work Experience (section-exp)
    //    Includes filter buttons; call renderExpTimeline(filter)
    //    to re-draw just the timeline rows.
    // ══════════════════════════════════════════════════════
    function renderExpTimeline(filter) {
        filter = filter || 'all';
        var timeline = document.querySelector('#section-exp .exp-timeline');
        if (!timeline) return;

        var items = filter === 'all'
            ? D.experience
            : D.experience.filter(function (e) { return e.category === filter; });

        if (items.length === 0) {
            timeline.innerHTML = '<p class="exp-empty">No entries found.</p>';
            return;
        }

        timeline.innerHTML = items.map(function (job) {
            var dotClass    = 'exp-dot' + (job.current ? ' exp-dot--current' : '');
            var badgeClass  = 'exp-badge' + (job.badgeMod ? ' exp-badge--' + job.badgeMod : '');
            var tagsHtml    = job.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');
            return '<div class="exp-item">'
                + '<div class="' + dotClass + '"></div>'
                + '<div class="exp-content">'
                +   '<div class="exp-header">'
                +     '<div>'
                +       '<h4>' + esc(job.title) + '</h4>'
                +       '<p class="exp-company"><i class="fas fa-building"></i>&nbsp; ' + esc(job.company) + '</p>'
                +     '</div>'
                +     '<span class="' + badgeClass + '">' + esc(job.badge) + '</span>'
                +   '</div>'
                +   '<span class="exp-period"><i class="far fa-calendar-alt"></i>&nbsp; '
                +     esc(job.period) + ' &nbsp;·&nbsp; ' + esc(job.location)
                +   '</span>'
                +   '<div class="exp-tags">' + tagsHtml + '</div>'
                + '</div>'
                + '</div>';
        }).join('');
    }

    function renderExperience() {
        var filterHtml =
            '<div class="exp-filter">'
            + '<button class="exp-filter-btn active" data-filter="all">All</button>'
            + '<button class="exp-filter-btn" data-filter="engineering">Engineering</button>'
            + '<button class="exp-filter-btn" data-filter="business">Business</button>'
            + '</div>';

        fill('section-exp',
            '<div class="container">'
            + '<div class="section-heading">'
            +   '<span class="section-eyebrow">Career</span>'
            +   '<h2>Work Experience</h2>'
            + '</div>'
            + filterHtml
            + '<div class="exp-timeline"></div>'
            + '</div>'
        );
        renderExpTimeline('all');

        // Bind filter buttons
        var filterBar = document.querySelector('#section-exp .exp-filter');
        if (!filterBar) return;
        filterBar.addEventListener('click', function (e) {
            var btn = e.target.closest('.exp-filter-btn');
            if (!btn) return;
            var f = btn.dataset.filter;
            filterBar.querySelectorAll('.exp-filter-btn').forEach(function (b) {
                b.classList.toggle('active', b.dataset.filter === f);
            });
            renderExpTimeline(f);
            // re-run reveal on newly inserted items
            if (window._portfolioReveal) window._portfolioReveal();
        });
    }

    // ══════════════════════════════════════════════════════
    // 5. Certifications (section9)
    // ══════════════════════════════════════════════════════
    function renderCertifications() {
        var certHtml = D.certifications.length
            ? D.certifications.map(function (c) {
                var tagsHtml = (c.tags || []).map(function (t) {
                    return '<span class="cert-tag cert-tag--' + (c.color || 'accent') + '">' + esc(t) + '</span>';
                }).join('');
                return '<div class="cert-card cert-card--' + (c.color || 'accent') + '">'
                    + '<div class="cert-year cert-year--' + (c.yearMod || c.color || 'accent') + '">' + esc(c.year) + '</div>'
                    + '<div class="cert-icon-wrap cert-icon-wrap--' + (c.color || 'accent') + '"><i class="' + c.icon + '"></i></div>'
                    + '<div class="cert-body">'
                    +   '<h4>' + esc(c.title) + '</h4>'
                    +   '<p class="cert-issuer"><i class="fas fa-building"></i> ' + esc(c.issuer) + '</p>'
                    +   '<p class="cert-desc">' + esc(c.desc) + '</p>'
                    +   '<div class="cert-tags">' + tagsHtml + '</div>'
                    + '</div>'
                    + '</div>';
            }).join('')
            : '<p class="cert-empty" style="color:var(--text-muted);font-size:.9rem;padding:8px 0;">Certifications will be listed here.</p>';

        fill('section9',
            '<div class="container">'
            + '<div class="section-heading">'
            +   '<span class="section-eyebrow">Recognition</span>'
            +   '<h2>Certifications &amp; Awards</h2>'
            + '</div>'
            + '<div class="cert-grid">' + certHtml + '</div>'
            + '</div>'
        );
    }

    // ══════════════════════════════════════════════════════
    // 6. Education (section10)
    // ══════════════════════════════════════════════════════
    function renderEducation() {
        var cardsHtml = D.education.map(function (ed) {
            return '<div class="edu-card edu-card--' + ed.mod + '">'
                + '<div class="edu-card-bg-year">' + esc(ed.bgYear) + '</div>'
                + '<div class="edu-card-icon"><i class="' + ed.icon + '"></i></div>'
                + '<div class="edu-card-body">'
                +   '<span class="edu-card-period">' + esc(ed.period) + '</span>'
                +   '<h4>' + esc(ed.school) + '</h4>'
                +   '<p class="edu-card-degree">' + esc(ed.degree) + '</p>'
                +   '<div class="edu-card-footer">'
                +     '<span class="edu-card-location"><i class="fas fa-map-marker-alt"></i> ' + esc(ed.location) + '</span>'
                +     '<span class="edu-card-badge edu-card-badge--' + ed.mod + '">' + esc(ed.status) + '</span>'
                +   '</div>'
                + '</div>'
                + '</div>';
        }).join('');

        fill('section10',
            '<div class="container">'
            + '<div class="section-heading">'
            +   '<span class="section-eyebrow">Academic Background</span>'
            +   '<h2>Education</h2>'
            + '</div>'
            + '<div class="edu-cards">' + cardsHtml + '</div>'
            + '</div>'
        );
    }

    // ══════════════════════════════════════════════════════
    // 7. Skills (section2)
    // ══════════════════════════════════════════════════════
    function renderSkills() {
        var cardsHtml = D.skills.map(function (s) {
            var itemsHtml;
            if (s.type === 'lang') {
                itemsHtml = '<ul class="lang-list">'
                    + s.items.map(function (l) {
                        return '<li class="lang-row">'
                            + '<span class="lang-badge lang-badge--' + l.badge + '">' + esc(l.label) + '</span>'
                            + '<span>' + esc(l.lang) + '</span>'
                            + '</li>';
                    }).join('')
                    + '</ul>';
            } else {
                itemsHtml = '<ul class="skill-list">'
                    + s.items.map(function (item) {
                        return '<li class="skill-row">'
                            + '<span class="skill-dot skill-dot--' + s.color + '"></span>'
                            + esc(item)
                            + '</li>';
                    }).join('')
                    + '</ul>';
            }
            return '<div class="skill-card-new">'
                + '<div class="skill-card-top skill-card-top--' + s.color + '">'
                +   '<div class="skill-icon-wrap skill-icon-wrap--' + s.color + '"><i class="' + s.icon + '"></i></div>'
                +   '<h4>' + esc(s.title) + '</h4>'
                + '</div>'
                + itemsHtml
                + '</div>';
        }).join('');

        fill('section2',
            '<div class="container">'
            + '<div class="section-heading">'
            +   '<span class="section-eyebrow">Expertise</span>'
            +   '<h2>Skills &amp; Competencies</h2>'
            + '</div>'
            + '<div class="skills-grid-new">' + cardsHtml + '</div>'
            + '</div>'
        );
    }

    // ══════════════════════════════════════════════════════
    // 8. Contact card (section6 — form stays static HTML)
    // ══════════════════════════════════════════════════════
    function renderContact() {
        var mount = document.getElementById('contact-card-mount');
        if (!mount) return;
        var c = D.contact;
        mount.innerHTML =
            '<div class="contact-card">'
            + '<div>'
            +   '<h4>Get In Touch</h4>'
            +   '<p>' + esc(c.message) + '</p>'
            +   '<div class="contact-actions">'
            +     '<a href="mailto:' + esc(c.email) + '" class="btn btn-primary"><i class="fas fa-envelope"></i>&nbsp; Email Me</a>'
            +     '<a href="https://wa.me/' + esc(c.phone) + '" target="_blank" rel="noopener" class="btn btn-whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</a>'
            +     '<a href="' + esc(D.nav.find(function(n){return n.label==='Contact';}) ? c.linkedin : c.linkedin) + '" target="_blank" rel="noopener" class="btn btn-linkedin"><i class="fab fa-linkedin-in"></i> LinkedIn</a>'
            +   '</div>'
            +   '<a href="' + esc(D.profile.cvUrl) + '" class="btn btn-cv mt-3" download><i class="fas fa-file-download"></i>&nbsp; Download CV / Résumé</a>'
            + '</div>'
            + '<ul class="contact-details">'
            +   '<li>'
            +     '<i class="fas fa-envelope"></i>'
            +     '<a href="mailto:' + esc(c.email) + '"><span>' + esc(c.email) + '</span></a>'
            +     '<button class="copy-email-btn" data-email="' + esc(c.email) + '" title="Copy email address" aria-label="Copy email address"><i class="fas fa-copy"></i></button>'
            +   '</li>'
            +   '<li><i class="fab fa-whatsapp"></i> <a href="https://wa.me/' + esc(c.phone) + '" target="_blank" rel="noopener"><span>WhatsApp</span></a></li>'
            +   '<li><i class="fab fa-linkedin-in"></i> <a href="' + esc(c.linkedin) + '" target="_blank" rel="noopener"><span>LinkedIn</span></a></li>'
            +   '<li><i class="fas fa-map-marker-alt"></i> <span>' + esc(c.location) + '</span></li>'
            + '</ul>'
            + '</div>';
    }

    // ══════════════════════════════════════════════════════
    // Public init — call once at DOMContentLoaded
    // ══════════════════════════════════════════════════════
    function init() {
        renderNav();
        renderHero();
        renderHighlights();
        renderExperience();
        renderCertifications();
        renderEducation();
        renderSkills();
        renderContact();
    }

    return { init: init };
})();

document.addEventListener('DOMContentLoaded', PortfolioRender.init);
