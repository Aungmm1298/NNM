// ============================================================
// i18n.js — Language Switch (English / Turkish)
// ─ Persists choice in localStorage.
// ─ Updates all [data-i18n] DOM nodes and calls optional
//   callbacks registered via PortfolioI18n.onSwitch().
// ─ Adds the language toggle pill to the header.
// ============================================================
'use strict';

var PortfolioI18n = (function () {

    // ── Translation strings ────────────────────────────────
    var translations = {
        en: {
            // Hero / About
            heroEyebrow:      'Welcome',
            heroTitle:        'Naing <span class="name-accent">Naing Maw</span>',
            heroLead:         'Electrical Power Engineering graduate with hands-on experience in power systems and facilities management. Currently advancing into business leadership through an MBA at Beykent University, Istanbul.',
            aboutEyebrow:     'Who I Am',
            aboutTitle:       'About Me',

            // Stats section
            statsEyebrow:     'At a Glance',
            statsTitle:       'Key Numbers',

            // Experience section
            expEyebrow:       'Career',
            expTitle:         'Work Experience',

            // Highlights section
            hlEyebrow:        'Career Snapshot',
            hlTitle:          'Key Highlights',

            // Skills section
            skillsEyebrow:    'Expertise',
            skillsTitle:      'Skills &amp; Competencies',

            // Education section
            eduEyebrow:       'Academic Background',
            eduTitle:         'Education',

            // Certifications section
            certEyebrow:      'Recognition',
            certTitle:        'Certifications &amp; Awards',

            // Contact section
            contactEyebrow:   "Let's Connect",
            contactTitle:     'Contact Me',
            contactFormTitle: 'Send a Message',
            nameLabel:        'Name',
            emailLabel:       'Email',
            messageLabel:     'Message',
            submitBtn:        'Send Message',
            namePlaceholder:  'Your name',
            emailPlaceholder: 'your@email.com',
            messagePlaceholder: 'Your message...',

            // Nav
            navAbout:   'About',
            navExp:     'Experience',
            navSkills:  'Skills',
            navEdu:     'Education',
            navCerts:   'Certifications',
            navContact: 'Contact',

            // Toggle label
            langToggleLabel: 'Switch to Turkish'
        },

        tr: {
            // Hero / About
            heroEyebrow:      'Hoş Geldiniz',
            heroTitle:        'Naing <span class="name-accent">Naing Maw</span>',
            heroLead:         'Güç sistemleri ve tesis yönetimi alanında deneyim sahibi Elektrik Güç Mühendisliği mezunu. Şu anda İstanbul Beykent Üniversitesi\'nde MBA yaparak iş dünyasına adım atıyor.',
            aboutEyebrow:     'Ben Kimim',
            aboutTitle:       'Hakkımda',

            // Stats section
            statsEyebrow:     'Bir Bakışta',
            statsTitle:       'Önemli Rakamlar',

            // Experience section
            expEyebrow:       'Kariyer',
            expTitle:         'İş Deneyimi',

            // Highlights section
            hlEyebrow:        'Kariyer Özeti',
            hlTitle:          'Öne Çıkanlar',

            // Skills section
            skillsEyebrow:    'Uzmanlık',
            skillsTitle:      'Beceriler &amp; Yetkinlikler',

            // Education section
            eduEyebrow:       'Akademik Geçmiş',
            eduTitle:         'Eğitim',

            // Certifications section
            certEyebrow:      'Başarılar',
            certTitle:        'Sertifikalar &amp; Ödüller',

            // Contact section
            contactEyebrow:   'İletişime Geçelim',
            contactTitle:     'Bana Ulaşın',
            contactFormTitle: 'Mesaj Gönderin',
            nameLabel:        'Ad',
            emailLabel:       'E-posta',
            messageLabel:     'Mesaj',
            submitBtn:        'Gönder',
            namePlaceholder:  'Adınız',
            emailPlaceholder: 'eposta@adresiniz.com',
            messagePlaceholder: 'Mesajınız...',

            // Nav
            navAbout:   'Hakkımda',
            navExp:     'Deneyim',
            navSkills:  'Beceriler',
            navEdu:     'Eğitim',
            navCerts:   'Sertifikalar',
            navContact: 'İletişim',

            // Toggle label
            langToggleLabel: 'İngilizceye geç'
        }
    };

    // ── Callbacks registered by other modules ──────────────
    var _switchCallbacks = [];

    // ── Active language ────────────────────────────────────
    var _lang = localStorage.getItem('portfolio-lang') || 'en';

    // ── Get current language ────────────────────────────────
    function getLang() { return _lang; }

    // ── Apply all translations to the DOM ─────────────────
    function applyTranslations(lang) {
        var t = translations[lang] || translations['en'];

        // Generic data-i18n attributes
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            var key = el.dataset.i18n;
            if (t[key] !== undefined) {
                el.innerHTML = t[key];
            }
        });

        // Placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            var key = el.dataset.i18nPlaceholder;
            if (t[key] !== undefined) el.placeholder = t[key];
        });

        // Nav links — keyed by data-i18n-nav="navAbout" etc.
        document.querySelectorAll('[data-i18n-nav]').forEach(function (el) {
            var key = el.dataset.i18nNav;
            if (t[key] !== undefined) el.textContent = t[key];
        });

        // HTML lang attribute
        document.documentElement.lang = lang;

        // Toggle button aria-label
        var btn = document.getElementById('lang-toggle');
        if (btn) btn.setAttribute('aria-label', t.langToggleLabel || '');
    }

    // ── Switch language ────────────────────────────────────
    function setLang(lang) {
        if (!translations[lang]) lang = 'en';
        _lang = lang;
        localStorage.setItem('portfolio-lang', lang);
        applyTranslations(lang);

        // Update toggle UI
        var btn = document.getElementById('lang-toggle');
        if (btn) {
            btn.querySelectorAll('.lang-opt').forEach(function (opt) {
                opt.classList.toggle('active', opt.dataset.lang === lang);
            });
        }

        // Notify registered callbacks (e.g. PortfolioStats.updateLabels)
        _switchCallbacks.forEach(function (cb) { cb(lang); });
    }

    // ── Register a callback ────────────────────────────────
    function onSwitch(fn) {
        if (typeof fn === 'function') _switchCallbacks.push(fn);
    }

    // ── Inject the toggle pill into the header ─────────────
    function injectToggle() {
        var headerInner = document.querySelector('.header-inner');
        if (!headerInner || document.getElementById('lang-toggle')) return;

        var toggle = document.createElement('div');
        toggle.id = 'lang-toggle';
        toggle.className = 'lang-toggle';
        toggle.setAttribute('role', 'group');
        toggle.setAttribute('aria-label', 'Language selection');
        toggle.innerHTML =
            '<button class="lang-opt' + (_lang === 'en' ? ' active' : '') + '" data-lang="en" aria-pressed="' + (_lang === 'en') + '">EN</button>'
            + '<button class="lang-opt' + (_lang === 'tr' ? ' active' : '') + '" data-lang="tr" aria-pressed="' + (_lang === 'tr') + '">TR</button>';

        headerInner.appendChild(toggle);

        toggle.addEventListener('click', function (e) {
            var btn = e.target.closest('.lang-opt');
            if (!btn) return;
            setLang(btn.dataset.lang);
        });
    }

    // ── Annotate static DOM nodes with data-i18n ──────────
    // Called once after render.js has painted the DOM.
    function annotateDOM() {
        // Section eyebrows & headings — target existing rendered text
        var map = [
            ['#section1 .section-eyebrow',           'aboutEyebrow'],
            ['#section1 .about-block .section-eyebrow','aboutEyebrow'],
            ['#section1 h2',                          'aboutTitle'],
            ['#section-highlights .section-eyebrow',  'hlEyebrow'],
            ['#section-highlights h2',                'hlTitle'],
            ['#section-exp .section-eyebrow',         'expEyebrow'],
            ['#section-exp h2',                       'expTitle'],
            ['#section-stats .section-eyebrow',       'statsEyebrow'],
            ['#section-stats h2',                     'statsTitle'],
            ['#section2 .section-eyebrow',            'skillsEyebrow'],
            ['#section2 h2',                          'skillsTitle'],
            ['#section10 .section-eyebrow',           'eduEyebrow'],
            ['#section10 h2',                         'eduTitle'],
            ['#section9 .section-eyebrow',            'certEyebrow'],
            ['#section9 h2',                          'certTitle'],
            ['#section6 .section-eyebrow',            'contactEyebrow'],
            ['#section6 h2',                          'contactTitle'],
            ['#section6 h4:not(.contact-card h4)',    'contactFormTitle']
        ];

        map.forEach(function (pair) {
            var el = document.querySelector(pair[0]);
            if (el && !el.dataset.i18n) el.dataset.i18n = pair[1];
        });

        // Form labels & placeholders
        var formMap = [
            ['label[for="contact-name"]',    'nameLabel',    null],
            ['label[for="contact-email"]',   'emailLabel',   null],
            ['label[for="contact-message"]', 'messageLabel', null],
            ['#contact-name',    null, 'namePlaceholder'],
            ['#contact-email',   null, 'emailPlaceholder'],
            ['#contact-message', null, 'messagePlaceholder'],
            ['#submit-text',     'submitBtn', null]
        ];

        formMap.forEach(function (row) {
            var el = document.querySelector(row[0]);
            if (!el) return;
            if (row[1] && !el.dataset.i18n)            el.dataset.i18n = row[1];
            if (row[2] && !el.dataset.i18nPlaceholder) el.dataset.i18nPlaceholder = row[2];
        });

        // Nav links
        var navKeys = {
            'About':          'navAbout',
            'Experience':     'navExp',
            'Skills':         'navSkills',
            'Education':      'navEdu',
            'Certifications': 'navCerts',
            'Contact':        'navContact'
        };
        document.querySelectorAll('.main-nav .nav-link span').forEach(function (span) {
            var key = navKeys[span.textContent.trim()];
            if (key) span.dataset.i18nNav = key;
        });
    }

    // ── Public init ────────────────────────────────────────
    function init() {
        injectToggle();
        // Defer annotation until after all renderers have run
        setTimeout(function () {
            annotateDOM();
            applyTranslations(_lang);
        }, 0);
    }

    return {
        init:     init,
        setLang:  setLang,
        getLang:  getLang,
        onSwitch: onSwitch,
        t: function (key) {
            return (translations[_lang] || translations['en'])[key] || key;
        }
    };
})();
