// ============================================================
// timeline.js — Animated Experience Timeline
// Reconstructs the existing timeline with enhanced scroll-
// triggered fade/slide animations using IntersectionObserver.
// Bridges with the existing PortfolioData.experience array.
// ============================================================
'use strict';

var PortfolioTimeline = (function () {

    // ── Category colour map ────────────────────────────────
    var categoryColors = {
        business:    'sky',
        engineering: 'mint'
    };

    // ── Safely encode text ─────────────────────────────────
    function esc(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // ── Build one timeline item ────────────────────────────
    function buildItem(job, index) {
        var color     = categoryColors[job.category] || 'accent';
        var dotMod    = job.current ? ' tl-dot--current' : '';
        var cardMod   = job.current ? ' tl-card--current' : '';
        var side      = index % 2 === 0 ? 'left' : 'right';
        var tagsHtml  = (job.tags || []).map(function (t) {
            return '<span>' + esc(t) + '</span>';
        }).join('');
        var badgeClass = 'tl-badge tl-badge--' + (job.badgeMod || color);

        return '<div class="tl-item tl-item--' + side + ' reveal ' + (side === 'left' ? 'from-left' : 'from-right') + '" '
            +       'role="listitem" '
            +       'aria-label="' + esc(job.title) + ' at ' + esc(job.company) + '">'
            +   '<div class="tl-connector" aria-hidden="true">'
            +     '<div class="tl-dot' + dotMod + '"></div>'
            +   '</div>'
            +   '<div class="tl-card' + cardMod + '">'
            +     '<div class="tl-card-accent tl-card-accent--' + color + '" aria-hidden="true"></div>'
            +     '<div class="tl-card-body">'
            +       '<div class="tl-header">'
            +         '<div class="tl-title-group">'
            +           '<h4>' + esc(job.title) + '</h4>'
            +           '<p class="tl-company"><i class="fas fa-building" aria-hidden="true"></i>&nbsp; ' + esc(job.company) + '</p>'
            +         '</div>'
            +         '<span class="' + badgeClass + '">' + esc(job.badge) + '</span>'
            +       '</div>'
            +       '<span class="tl-period">'
            +         '<i class="far fa-calendar-alt" aria-hidden="true"></i>&nbsp; '
            +         esc(job.period) + ' &nbsp;·&nbsp; '
            +         '<i class="fas fa-map-marker-alt" aria-hidden="true"></i>&nbsp; ' + esc(job.location)
            +       '</span>'
            +       (tagsHtml ? '<div class="tl-tags">' + tagsHtml + '</div>' : '')
            +     '</div>'
            +   '</div>'
            + '</div>';
    }

    // ── Render the full timeline ───────────────────────────
    function render(filter) {
        var wrap = document.querySelector('.portfolio-timeline');
        if (!wrap) return;

        filter = filter || 'all';
        var data = (typeof PortfolioData !== 'undefined' && PortfolioData.experience)
            ? PortfolioData.experience
            : [];

        var items = filter === 'all'
            ? data
            : data.filter(function (e) { return e.category === filter; });

        if (!items.length) {
            wrap.innerHTML = '<p class="tl-empty">No entries found.</p>';
            return;
        }

        wrap.innerHTML = items.map(buildItem).join('');

        // Re-run reveal observer on newly‑inserted nodes
        observeItems(wrap.querySelectorAll('.tl-item'));
    }

    // ── IntersectionObserver for timeline items ────────────
    function observeItems(nodeList) {
        if (!('IntersectionObserver' in window)) {
            nodeList.forEach(function (el) { el.classList.add('is-visible'); });
            return;
        }

        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        nodeList.forEach(function (el) { obs.observe(el); });
    }

    // ── Bind filter buttons ────────────────────────────────
    function bindFilters() {
        var bar = document.querySelector('.portfolio-timeline-filters');
        if (!bar) return;

        bar.addEventListener('click', function (e) {
            var btn = e.target.closest('.tl-filter-btn');
            if (!btn) return;
            bar.querySelectorAll('.tl-filter-btn').forEach(function (b) {
                b.classList.toggle('active', b === btn);
            });
            render(btn.dataset.filter);
        });
    }

    // ── Public init ────────────────────────────────────────
    function init() {
        var section = document.getElementById('section-exp');
        if (!section) return;

        // Inject the enhanced timeline structure, preserving the
        // section container that script.js scroll-spy targets.
        section.innerHTML =
            '<div class="container">'
            + '<div class="section-heading reveal from-up">'
            +   '<span class="section-eyebrow" data-i18n="expEyebrow">Career</span>'
            +   '<h2 data-i18n="expTitle">Work Experience</h2>'
            + '</div>'
            + '<div class="portfolio-timeline-filters exp-filter" role="tablist" aria-label="Filter experience by category">'
            +   '<button class="tl-filter-btn exp-filter-btn active" data-filter="all" role="tab" aria-selected="true">All</button>'
            +   '<button class="tl-filter-btn exp-filter-btn" data-filter="engineering" role="tab" aria-selected="false">Engineering</button>'
            +   '<button class="tl-filter-btn exp-filter-btn" data-filter="business" role="tab" aria-selected="false">Business</button>'
            + '</div>'
            + '<div class="portfolio-timeline tl-track" role="list" aria-label="Work experience timeline"></div>'
            + '</div>';

        bindFilters();
        render('all');
    }

    return { init: init, render: render };
})();
