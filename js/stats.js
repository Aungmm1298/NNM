// ============================================================
// stats.js — Animated Statistics Section
// Renders a #section-stats section and triggers counter
// animations via IntersectionObserver when visible.
// ============================================================
'use strict';

var PortfolioStats = (function () {

    // ── Stat definitions ───────────────────────────────────
    var stats = [
        { icon: 'fas fa-briefcase',      color: 'accent', count: 5,  suffix: '+', label: 'Years Experience',    labelTR: 'Yıl Deneyim' },
        { icon: 'fas fa-building',       color: 'rose',   count: 6,  suffix: '+', label: 'Companies Worked',    labelTR: 'Çalıştığı Şirket' },
        { icon: 'fas fa-layer-group',    color: 'sky',    count: 3,  suffix: '',  label: 'Professional Fields', labelTR: 'Profesyonel Alan' },
        { icon: 'fas fa-globe',          color: 'mint',   count: 4,  suffix: '',  label: 'Languages Spoken',    labelTR: 'Konuşulan Dil' }
    ];

    // ── Render HTML into #section-stats ────────────────────
    function render() {
        var section = document.getElementById('section-stats');
        if (!section) return;

        var lang = (typeof PortfolioI18n !== 'undefined') ? PortfolioI18n.getLang() : 'en';

        var cardsHtml = stats.map(function (s, i) {
            var label = (lang === 'tr' ? s.labelTR : s.label);
            return '<div class="stat-counter-card reveal from-up stagger-' + (i + 1) + '" role="listitem">'
                + '<div class="stat-counter-icon stat-counter-icon--' + s.color + '" aria-hidden="true">'
                +   '<i class="' + s.icon + '"></i>'
                + '</div>'
                + '<div class="stat-counter-number" data-count="' + s.count + '" data-suffix="' + s.suffix + '" aria-live="polite">0' + s.suffix + '</div>'
                + '<div class="stat-counter-label" data-i18n-stat="' + i + '">' + label + '</div>'
                + '</div>';
        }).join('');

        section.innerHTML =
            '<div class="container">'
            + '<div class="section-heading reveal from-up">'
            +   '<span class="section-eyebrow" data-i18n="statsEyebrow">At a Glance</span>'
            +   '<h2 data-i18n="statsTitle">Key Numbers</h2>'
            + '</div>'
            + '<div class="stat-counters-grid" role="list">' + cardsHtml + '</div>'
            + '</div>';
    }

    // ── Animate a single counter element ───────────────────
    function animateCounter(el) {
        var end      = parseInt(el.dataset.count, 10);
        var suffix   = el.dataset.suffix || '';
        var duration = 1800;
        var startTs  = null;

        function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

        function step(ts) {
            if (!startTs) startTs = ts;
            var progress = Math.min((ts - startTs) / duration, 1);
            var value    = Math.round(end * easeOutCubic(progress));
            el.textContent = value + suffix;
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    // ── Observe and trigger counter animations ─────────────
    function observe() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.stat-counter-number').forEach(function (el) {
                animateCounter(el);
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-counter-number').forEach(function (el) {
            observer.observe(el);
        });
    }

    // ── Update labels when language switches ───────────────
    function updateLabels(lang) {
        document.querySelectorAll('[data-i18n-stat]').forEach(function (el) {
            var idx = parseInt(el.dataset.i18nStat, 10);
            if (stats[idx]) {
                el.textContent = lang === 'tr' ? stats[idx].labelTR : stats[idx].label;
            }
        });
    }

    // ── Public init ────────────────────────────────────────
    function init() {
        render();
        observe();
    }

    return { init: init, updateLabels: updateLabels };
})();
