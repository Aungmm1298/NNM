// ===================================
// Portfolio Template JavaScript
// ===================================

(function($) {
    'use strict';
    
    // Smooth Scrolling for Navigation Links
    $('.main-nav a[href^="#"]').on('click', function(e) {
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

    // Close when a link or mobile CTA is tapped
    $nav.find('.nav-link, .nav-mobile-cta').on('click', function() { closeNav(); });

    // Close when clicking anywhere outside the nav/toggle
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.main-nav, .nav-toggle').length) closeNav();
    });

    // Escape key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') closeNav();
    });

    // ================================
    // Animated Number Counters
    // ================================
    function initCounters() {
        if (!('IntersectionObserver' in window)) return;
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                var target = parseFloat(el.dataset.count);
                var suffix = el.dataset.suffix || '';
                var duration = 1800;
                var startTime = null;
                function step(ts) {
                    if (!startTime) startTime = ts;
                    var progress = Math.min((ts - startTime) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 4);
                    el.textContent = Math.round(target * eased) + suffix;
                    if (progress < 1) requestAnimationFrame(step);
                }
                requestAnimationFrame(step);
                obs.unobserve(el);
            });
        }, { threshold: 0.7 });
        document.querySelectorAll('[data-count]').forEach(function(el) { obs.observe(el); });
    }

    // ================================
    // Typewriter / Role Cycler
    // ================================
    function initTypewriter() {
        var el = document.querySelector('.hero-subtitle');
        if (!el) return;
        var roles = [
            'Electrical Power Engineer',
            'CRM Specialist',
            'MBA Candidate',
            'Operations Leader',
            'Problem Solver'
        ];
        var roleIdx = 0, charIdx = roles[0].length, deleting = false, pauseCount = 0;
        el.textContent = roles[0];
        var heroText = document.querySelector('.hero-text');
        if (heroText) heroText.classList.add('typing-active');

        function tick() {
            var current = roles[roleIdx];
            if (deleting) { charIdx--; } else { charIdx++; }
            el.textContent = current.slice(0, charIdx);
            var delay = deleting ? 40 : 85;
            if (!deleting && charIdx === current.length) {
                pauseCount++;
                if (pauseCount < 20) { delay = 120; }
                else { deleting = true; pauseCount = 0; }
            } else if (deleting && charIdx === 0) {
                deleting = false;
                roleIdx = (roleIdx + 1) % roles.length;
                delay = 350;
            }
            setTimeout(tick, delay);
        }
        setTimeout(tick, 2200);
    }

    // ================================
    // 3D Card Tilt on Mouse Move
    // ================================
    function initTilt() {
        var SEL = '.highlight-card, .cert-card, .edu-card, .skill-card-new, .about-stat-card';
        document.querySelectorAll(SEL).forEach(function(card) {
            card.addEventListener('mousemove', function(e) {
                var rect = card.getBoundingClientRect();
                var dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
                var dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
                card.style.transition = 'transform 0.08s ease';
                card.style.transform = 'perspective(800px) translateY(-6px) rotateX(' + (-dy * 6) + 'deg) rotateY(' + (dx * 6) + 'deg) scale(1.01)';
            });
            card.addEventListener('mouseleave', function() {
                card.style.transition = 'transform 0.5s var(--ease-smooth)';
                card.style.transform = '';
            });
        });
    }

    // ================================
    // Ripple Click Effect on Buttons
    // ================================
    function initRipple() {
        document.querySelectorAll('.btn').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                var rect = btn.getBoundingClientRect();
                var size = Math.max(rect.width, rect.height) * 2.2;
                var x = e.clientX - rect.left - size / 2;
                var y = e.clientY - rect.top - size / 2;
                var ripple = document.createElement('span');
                ripple.className = 'btn-ripple';
                ripple.style.width  = size + 'px';
                ripple.style.height = size + 'px';
                ripple.style.left   = x + 'px';
                ripple.style.top    = y + 'px';
                btn.appendChild(ripple);
                ripple.addEventListener('animationend', function() { ripple.remove(); });
            });
        });
    }

    // ================================
    // Cursor Sparkle Trail
    // ================================
    function initCursorTrail() {
        var COLORS = ['#4a6a8a','#7295b0','#5e89a8','#3d7a7a','#a0b4cc','#6d8fa8'];
        var lastX = -999, lastY = -999;
        document.addEventListener('mousemove', function(e) {
            var dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
            if (dist < 18) return;
            lastX = e.clientX; lastY = e.clientY;
            if (Math.random() > 0.45) return;
            var spark = document.createElement('div');
            var size = 4 + Math.random() * 5;
            spark.style.cssText = 'position:fixed;pointer-events:none;z-index:99999;'
                + 'border-radius:50%;background:' + COLORS[Math.floor(Math.random() * COLORS.length)] + ';'
                + 'width:' + size + 'px;height:' + size + 'px;'
                + 'left:' + (e.clientX - size / 2) + 'px;top:' + (e.clientY - size / 2) + 'px;'
                + 'opacity:0.75;animation:sparkFade 0.65s ease-out forwards;';
            document.body.appendChild(spark);
            spark.addEventListener('animationend', function() { spark.remove(); });
        });
    }

    // ================================
    // Magnetic Hover on CTA Buttons
    // ================================
    function initMagnetic() {
        document.querySelectorAll('.btn-primary, .btn-cv, .btn-outline').forEach(function(btn) {
            btn.addEventListener('mousemove', function(e) {
                var rect = btn.getBoundingClientRect();
                var dx = (e.clientX - (rect.left + rect.width / 2)) * 0.22;
                var dy = (e.clientY - (rect.top + rect.height / 2)) * 0.22;
                btn.style.transition = 'transform 0.12s ease';
                btn.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
            });
            btn.addEventListener('mouseleave', function() {
                btn.style.transition = 'transform 0.45s var(--ease-spring)';
                btn.style.transform = '';
            });
        });
    }

    // ================================
    // Back to Top Button
    // ================================
    function initBackToTop() {
        var btn = document.getElementById('back-to-top');
        if (!btn) return;
        window.addEventListener('scroll', function() {
            btn.classList.toggle('visible', window.scrollY > 450);
        });
        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ================================
    // Dynamic Greeting
    // ================================
    function initGreeting() {
        var el = document.getElementById('dynamic-greeting');
        if (!el) return;
        var h = new Date().getHours();
        el.textContent = (h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening') + '! ';
    }

    // ================================
    // Skill Bar Animations
    // ================================
    function initSkillBars() {
        if (!('IntersectionObserver' in window)) return;
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting) return;
                var bar = entry.target;
                var pct = bar.dataset.pct || '80';
                setTimeout(function() {
                    bar.style.width = pct + '%';
                }, 200);
                obs.unobserve(bar);
            });
        }, { threshold: 0.5 });
        document.querySelectorAll('.skill-progress-fill').forEach(function(bar) { obs.observe(bar); });
    }

    $(document).ready(function() {
        updateProgress();
        initReveal();
        initCounters();
        initTypewriter();
        initTilt();
        initRipple();
        initCursorTrail();
        initMagnetic();
        initBackToTop();
        initGreeting();
        initSkillBars();
    });

})($);
