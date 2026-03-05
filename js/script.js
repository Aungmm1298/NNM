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
    
    // Portfolio Filter
    $('.filter-btn').on('click', function() {
        var filterValue = $(this).attr('data-filter');
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        if (filterValue === 'all') {
            $('.portfolio-item').fadeIn(300).removeClass('hide');
        } else {
            $('.portfolio-item').fadeOut(300).addClass('hide');
            setTimeout(function() {
                $('.portfolio-item[data-category="' + filterValue + '"]').fadeIn(300).removeClass('hide');
            }, 300);
        }
    });
    
    // Image Popup
    $('.image-popup').magnificPopup({
        type: 'image',
        gallery: { enabled: true },
        removalDelay: 300,
        mainClass: 'mfp-fade',
        callbacks: {
            beforeOpen: function() {
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
            }
        }
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

    // Close when a link is tapped
    $nav.find('.nav-link').on('click', function() { closeNav(); });

    // Close when clicking anywhere outside the nav/toggle
    $(document).on('click', function(e) {
        if (!$(e.target).closest('.main-nav, .nav-toggle').length) closeNav();
    });

    // Escape key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') closeNav();
    });

    $(document).ready(function() {
        updateProgress(); // initialise on load (handles mid-page refresh)
        initReveal();
    });
    
})($);
