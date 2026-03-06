// ===================================
// Portfolio Template JavaScript
// ===================================

(function($) {
    'use strict';
    
    // Smooth Scrolling for Navigation Links (delegated — nav rendered by render.js)
    $('.main-nav').on('click', 'a[href^="#"]', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('.main-nav a').removeClass('active');
            $(this).addClass('active');
            $('html, body').stop().animate({ scrollTop: target.offset().top }, 1000);
        }
    });
    
    // ================================
    // Scroll Progress Bar
    // ================================
    var $progress = $('#scroll-progress');
    function updateProgress() {
        var docH  = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var pct   = docH > 0 ? ($(document).scrollTop() / docH) * 100 : 0;
        $progress.css('width', pct.toFixed(2) + '%');
    }

    // Scroll Spy + Floating Nav
    $(window).on('scroll', function() {
        var scrollPos = $(document).scrollTop();

        // Scroll progress
        updateProgress();

        // Floating nav toggle
        if (scrollPos > 60) {
            $('.site-header').addClass('scrolled');
        } else {
            $('.site-header').removeClass('scrolled');
        }

        $('.section').each(function() {
            var currLink = $(this);
            if (currLink.position().top <= scrollPos + 100 && 
                currLink.position().top + currLink.height() > scrollPos + 100) {
                $('.main-nav a').removeClass('active');
                $('.main-nav a[href="#' + currLink.attr('id') + '"]').addClass('active');
            }
        });
    });

    // ================================
    // Scroll Reveal – IntersectionObserver
    // ================================
    function initReveal() {

        // Each entry: selector, direction, whether to stagger siblings
        var revealGroups = [
            { sel: '.section-heading',        dir: 'from-up',    stagger: false },
            { sel: '.section-eyebrow',        dir: 'from-up',    stagger: false },
            { sel: '.hero-text h1',           dir: 'from-left',  stagger: false },
            { sel: '.hero-text .hero-lead',   dir: 'from-left',  stagger: false },
            { sel: '.hero-text .hero-actions',dir: 'from-left',  stagger: false },
            { sel: '.hero-text .hero-metrics',dir: 'from-up',    stagger: false },
            { sel: '.hero-photo-only',        dir: 'from-right', stagger: false },
            { sel: '.about-block',            dir: 'from-up',    stagger: false },
            { sel: '.about-card',             dir: 'from-right', stagger: false },
            { sel: '.exp-item',               dir: 'from-left',  stagger: true  },
            { sel: '.skill-category',         dir: 'from-up',    stagger: true  },
            { sel: '.skill-item',             dir: 'from-up',    stagger: true  },
            { sel: '.service-item',           dir: 'from-up',    stagger: true  },
            { sel: '.portfolio-item',         dir: 'from-scale', stagger: true  },
            { sel: '.process-step',           dir: 'from-left',  stagger: true  },
            { sel: '.award-item',             dir: 'from-up',    stagger: true  },
            { sel: '.timeline-item',          dir: 'from-right', stagger: true  },
            { sel: '.project-detail',         dir: 'from-up',    stagger: true  },
            { sel: '.contact-card',           dir: 'from-up',    stagger: false },
            { sel: '.contact-form-wrap',      dir: 'from-up',    stagger: false },
            { sel: '.about-stat-card',        dir: 'from-up',    stagger: true  },
            { sel: '.highlight-card',         dir: 'from-up',    stagger: true  },
            { sel: '.skill-card-new',         dir: 'from-up',    stagger: true  },
            { sel: '.cert-card',              dir: 'from-up',    stagger: true  },
            { sel: '.edu-card',               dir: 'from-up',    stagger: true  },
            { sel: '.exp-content',            dir: 'from-left',  stagger: false },
        ];

        var staggerClasses = ['stagger-1','stagger-2','stagger-3','stagger-4','stagger-5','stagger-6'];

        // Group siblings so stagger is per-parent, not global index
        revealGroups.forEach(function(group) {
            // Track stagger index per parent element
            var parentCounters = new WeakMap();

            $(group.sel).each(function() {
                var $el = $(this);
                $el.addClass('reveal ' + group.dir);

                if (group.stagger) {
                    var parent = this.parentElement;
                    var idx = parentCounters.has(parent) ? parentCounters.get(parent) : 0;
                    if (idx < staggerClasses.length) {
                        $el.addClass(staggerClasses[idx]);
                    }
                    parentCounters.set(parent, idx + 1);
                }
            });
        });

        // IntersectionObserver triggers .is-visible when element enters viewport
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.10, rootMargin: '0px 0px -48px 0px' });

            document.querySelectorAll('.reveal').forEach(function(el) {
                observer.observe(el);
            });
        } else {
            // Fallback for older browsers
            $('.reveal').addClass('is-visible');
        }
    }

    // ================================
    // Mobile Nav Toggle
    // ================================
    var $toggle = $('.nav-toggle');
    var $nav    = $('.main-nav');

    function openNav() {
        $nav.addClass('is-open');
        $toggle.addClass('open').attr('aria-expanded', 'true');
    }

    function closeNav() {
        $nav.removeClass('is-open');
        $toggle.removeClass('open').attr('aria-expanded', 'false');
    }

    $toggle.on('click', function(e) {
        e.stopPropagation();
        $nav.hasClass('is-open') ? closeNav() : openNav();
    });

    // Close when a link or mobile CTA is tapped (delegated — nav rendered by render.js)
    $nav.on('click', '.nav-link, .nav-mobile-cta', function() { closeNav(); });

    // Close when clicking anywhere outside the nav/toggle
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.main-nav, .nav-toggle').length) closeNav();
    });

    // Escape key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') closeNav();
    });

    // ================================
    // Typewriter — Hero Subtitle
    // ================================
    function initTypewriter() {
        var el = document.querySelector('.hero-subtitle');
        if (!el) return;
        // Use phrases from data.js if available, otherwise fallback
        var phrases = (typeof PortfolioData !== 'undefined' && PortfolioData.profile.typingPhrases)
            ? PortfolioData.profile.typingPhrases
            : ['Electrical Power Engineering Graduate', 'MBA Candidate', 'CRM Specialist', 'Operations Professional'];
        var phraseIdx = 0, charIdx = phrases[0].length, deleting = false, pauseTicks = 0;
        el.textContent = phrases[0];
        el.classList.add('typewriter-text');

        function tick() {
            var current = phrases[phraseIdx];
            if (deleting) {
                charIdx--;
            } else {
                charIdx++;
            }
            el.textContent = current.slice(0, charIdx);
            var delay = deleting ? 42 : 88;
            if (!deleting && charIdx === current.length) {
                pauseTicks++;
                if (pauseTicks < 18) { delay = 110; } else { deleting = true; pauseTicks = 0; }
            } else if (deleting && charIdx === 0) {
                deleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                delay = 380;
            }
            setTimeout(tick, delay);
        }
        setTimeout(tick, 2500);
    }

    // ================================
    // Animated Stat Counters
    // ================================
    function initCounters() {
        if (!('IntersectionObserver' in window)) return;
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                var end = parseInt(el.dataset.count, 10);
                var suffix = el.dataset.suffix || '';
                var duration = 1600;
                var startTs = null;
                function step(ts) {
                    if (!startTs) startTs = ts;
                    var progress = Math.min((ts - startTs) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.round(end * eased) + suffix;
                    if (progress < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
                obs.unobserve(el);
            });
        }, { threshold: 0.6 });
        document.querySelectorAll('[data-count]').forEach(function(el) { obs.observe(el); });
    }

    // ================================
    // Back to Top Button
    // ================================
    function initBackToTop() {
        var btn = document.getElementById('back-to-top');
        if (!btn) return;
        window.addEventListener('scroll', function() {
            btn.classList.toggle('visible', window.scrollY > 500);
        });
        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ================================
    // Dark / Light Mode Toggle
    // ================================
    function initDarkMode() {
        var btn = document.getElementById('theme-toggle');
        if (!btn) return;
        function applyTheme(theme) {
            document.documentElement.setAttribute('data-theme', theme);
            var icon = btn.querySelector('i');
            if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            localStorage.setItem('portfolio-theme', theme);
        }
        btn.addEventListener('click', function () {
            var current = document.documentElement.getAttribute('data-theme') || 'light';
            applyTheme(current === 'dark' ? 'light' : 'dark');
        });
        // Sync icon with saved state on load
        var saved = localStorage.getItem('portfolio-theme') || 'light';
        if (saved === 'dark') {
            var icon = btn.querySelector('i');
            if (icon) icon.className = 'fas fa-sun';
        }
    }

    // ================================
    // Copy Email Button
    // ================================
    function initCopyEmail() {
        function showCopied(btn) {
            btn.classList.add('copied');
            btn.querySelector('i').className = 'fas fa-check';
            setTimeout(function() {
                btn.classList.remove('copied');
                btn.querySelector('i').className = 'fas fa-copy';
            }, 2200);
        }
        document.querySelectorAll('.copy-email-btn').forEach(function(btn) {
            btn.addEventListener('click', function() {
                var email = btn.dataset.email;
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(email).then(function() { showCopied(btn); });
                } else {
                    var ta = document.createElement('textarea');
                    ta.value = email;
                    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0;';
                    document.body.appendChild(ta);
                    ta.focus();
                    ta.select();
                    try { document.execCommand('copy'); showCopied(btn); } catch(e) {}
                    document.body.removeChild(ta);
                }
            });
        });
    }

    $(document).ready(function() {
        updateProgress();
        initReveal();
        initTypewriter();
        initCounters();
        initBackToTop();
        initCopyEmail();
        initDarkMode();
        window._portfolioReveal = initReveal;
    });

})($);
