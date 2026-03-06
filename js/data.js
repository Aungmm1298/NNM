// ============================================================
// Portfolio Data — all profile content stored here as objects.
// To update the portfolio, edit this file only.
// ============================================================
'use strict';

var PortfolioData = {

    // ── Profile core ──────────────────────────────────────
    profile: {
        name:          'Naing Naing Maw',
        brandTitle:    'Electrical Power Engineer & Business Administration',
        subtitle:      'Electrical Power Engineer & MBA Candidate',
        typingPhrases: [
            'Electrical Power Engineering Graduate',
            'MBA Candidate',
            'CRM Specialist',
            'Operations Professional'
        ],
        lead: 'Electrical Power Engineering graduate with hands-on experience in power systems and facilities management. Currently advancing into business leadership through an MBA at Beykent University, Istanbul.',
        bio: [
            'I am an Electrical Power Engineering graduate with experience spanning engineering, operations, quality control, and customer relationship management. Starting my career as an intern at Paung Laung Underground Hydropower Plant, I progressed through site engineering and operations roles in Myanmar before relocating to Istanbul.',
            'I have gained strong operational and customer-focused experience through roles at City Mart Holding Limited (CMHL), Facto Investments, Latonix, and currently as a CRM Specialist at Lavixo. My background uniquely combines technical engineering expertise with business operations and people skills — now being deepened through an MBA at Beykent University.'
        ],
        aboutChips: [
            { icon: 'fas fa-map-marker-alt', text: 'Istanbul, Turkey' },
            { icon: 'fas fa-bolt',           text: 'Power Engineer' },
            { icon: 'fas fa-graduation-cap', text: 'MBA Candidate' }
        ],
        heroMetrics: [
            { value: '5+',  label: 'Years Exp.',  count: 5, suffix: '+' },
            { value: '4+',  label: 'Industries',  count: 4, suffix: '+' },
            { value: 'MBA', label: 'In Progress',  count: null }
        ],
        infoChips: [
            { icon: 'fas fa-map-marker-alt', text: 'Istanbul, Turkey' },
            { icon: 'fas fa-university',     text: 'Beykent University' }
        ],
        statsCards: [
            { icon: 'fas fa-briefcase',      color: 'accent', value: '5+',  label: 'Years of Experience',  count: 5, suffix: '+' },
            { icon: 'fas fa-industry',       color: 'rose',   value: '4+',  label: 'Industries Worked In', count: 4, suffix: '+' },
            { icon: 'fas fa-flag',           color: 'sky',    value: '4',   label: 'Languages',            count: 4 },
            { icon: 'fas fa-graduation-cap', color: 'mint',   value: 'MBA', label: 'In Progress',          count: null }
        ],
        photo:  'Photos/NNM.jpg',
        cvUrl:  'assets/Naing_Naing_Maw_CV.pdf'
    },

    // ── Navigation ────────────────────────────────────────
    nav: [
        { href: '#section1',         icon: 'fas fa-user',           label: 'About',         active: true },
        { href: '#section-exp',      icon: 'fas fa-briefcase',      label: 'Experience' },
        { href: '#section2',         icon: 'fas fa-tools',          label: 'Skills' },
        { href: '#section10',        icon: 'fas fa-graduation-cap', label: 'Education' },
        { href: '#section9',         icon: 'fas fa-award',          label: 'Certifications' },
        { href: '#section6',         icon: 'fas fa-envelope',       label: 'Contact' }
    ],

    // ── Key Highlights ────────────────────────────────────
    highlights: [
        { color: 'accent', icon: 'fas fa-bolt',           title: 'Power Engineering Roots',
          text: 'B.Eng in Electrical Power Engineering from Technological University Magway — specialised in power systems, circuit theory & electrical machines.' },
        { color: 'rose',   icon: 'fas fa-water',          title: 'Hydropower Experience',
          text: 'Gained hands-on experience at Paung Laung Underground Hydropower Plant — engineering fieldwork in live power generation environments.' },
        { color: 'sky',    icon: 'fas fa-hard-hat',       title: 'Site Engineering',
          text: 'Junior Site Engineer at Wint Htel San Construction — coordinated on-site electrical work for construction and interior decoration projects.' },
        { color: 'mint',   icon: 'fas fa-store',          title: 'Operations Leadership',
          text: 'Operation Supervisor at CMHL (City Mart Holding) — led facility engineering, preventive maintenance, and safety compliance across multiple retail sites.' },
        { color: 'gold',   icon: 'fas fa-chart-line',     title: 'CRM & QC Expertise',
          text: 'Quality Control Analyst and CRM Administrator at Facto Investments — bringing data discipline and customer relationship skills to business operations.' },
        { color: 'plum',   icon: 'fas fa-graduation-cap', title: 'MBA Candidate',
          text: 'Currently pursuing MBA at Beykent University Istanbul — bridging engineering expertise with strategic business and international management knowledge.' }
    ],

    // ── Work Experience ───────────────────────────────────
    // category: 'engineering' | 'business'
    experience: [
        {
            title:    'Customer Relationship Management Specialist',
            company:  'Lavixo',
            period:   'Mar 2026 – Present',
            location: 'Istanbul, Turkey',
            badge:    'Current Role',
            badgeMod: 'current',
            current:  true,
            tags:     ['Customer Relationship Management (CRM)', 'Microsoft Office', 'Customer Service', 'General office work'],
            category: 'business'
        },
        {
            title:    'Customer Support Specialist',
            company:  'Latonix',
            period:   'Aug 2025 – Feb 2026',
            location: 'Istanbul, Turkey',
            badge:    'Full-time',
            tags:     ['Customer Service', 'Microsoft Office'],
            category: 'business'
        },
        {
            title:    'Quality Control Analyst / CRM Administrator',
            company:  'Facto Investments',
            period:   'May 2024 – Jul 2025',
            location: 'Istanbul, Turkey',
            badge:    'Full-time',
            tags:     ['Quality Control', 'Microsoft Office'],
            category: 'business'
        },
        {
            title:    'Operation Supervisor',
            company:  'CMHL — City Mart Holding Limited',
            period:   'Jan 2023 – Feb 2024',
            location: 'Yangon, Myanmar',
            badge:    'Full-time',
            tags:     ['General Office Work', 'Site Coordination', 'Engineering Support', 'Engineering', 'Microsoft Office'],
            category: 'engineering'
        },
        {
            title:    'Junior Site Engineer',
            company:  'Wint Htel San Construction & Interior Decoration Co., Ltd',
            period:   'Dec 2019 – Feb 2021',
            location: 'Yangon, Myanmar',
            badge:    'Full-time',
            tags:     ['Site Engineer', 'Construction', 'Site Coordination', 'General Office Work'],
            category: 'engineering'
        },
        {
            title:    'Summer Intern',
            company:  'Paung Laung Underground Hydropower Plants',
            period:   'Mar 2019 – May 2019',
            location: 'Myanmar',
            badge:    'Internship',
            badgeMod: 'intern',
            tags:     ['Power Generation', 'Electrical Engineering'],
            category: 'engineering'
        }
    ],

    // ── Education ─────────────────────────────────────────
    education: [
        {
            bgYear:   'MBA',
            icon:     'fas fa-graduation-cap',
            period:   '2024 – Present',
            school:   'Istanbul Beykent University',
            degree:   'Master of Business Administration (MBA)',
            location: 'Istanbul, Turkey',
            status:   'In Progress',
            mod:      'active'
        },
        {
            bgYear:   'B.ENG',
            icon:     'fas fa-university',
            period:   '2013 – 2019',
            school:   'Technological University, Magway',
            degree:   'Bachelor of Engineering — Electrical Power Engineering',
            location: 'Magway, Myanmar',
            status:   'Completed',
            mod:      'done'
        }
    ],

    // ── Skills ────────────────────────────────────────────
    // type: 'dots' (bullet list) | 'lang' (language badges)
    skills: [
        {
            color: 'accent', icon: 'fas fa-bolt',     title: 'Electrical & Engineering', type: 'dots',
            items: [
                'Power Generation & Distribution',
                'Electrical Engineering',
                'Site Engineering & Coordination',
                'Engineering Support',
                'Preventive Maintenance',
                'Electrical Safety Compliance'
            ]
        },
        {
            color: 'rose',   icon: 'fas fa-users',    title: 'Customer & Operations',    type: 'dots',
            items: [
                'Customer Relationship Management (CRM)',
                'Customer Service & Support',
                'Quality Control & Analysis',
                'Operations Supervision',
                'General Office Administration',
                'Construction Project Coordination'
            ]
        },
        {
            color: 'sky',    icon: 'fas fa-tools',    title: 'Tools & Software',         type: 'dots',
            items: [
                'Microsoft Office Suite',
                'Excel & Data Analysis',
                'CRM Software',
                'Report Writing & Documentation'
            ]
        },
        {
            color: 'mint',   icon: 'fas fa-language', title: 'Languages',                type: 'lang',
            items: [
                { badge: 'native',   label: 'Native',       lang: 'Burmese' },
                { badge: 'pro',      label: 'Professional', lang: 'English' },
                { badge: 'learning', label: 'Learning',     lang: 'Turkish' },
                { badge: 'n4',       label: 'JLPT N4',      lang: 'Japanese' }
            ]
        }
    ],

    // ── Certifications ────────────────────────────────────
    // Add cert objects here when available:
    // { color, icon, year, yearMod, title, issuer, desc, tags: [] }
    certifications: [],

    // ── Contact ───────────────────────────────────────────
    contact: {
        email:    'naingmaw154@gmail.com',
        phone:    '905074860797',
        linkedin: 'https://www.linkedin.com/in/naing-naing-maw-603919285',
        location: 'Istanbul, Turkey',
        message:  'Available for engineering roles, consulting projects, or MBA-related opportunities. Feel free to reach out through any channel below.'
    }
};
