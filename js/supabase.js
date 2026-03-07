// =============================================
// Contact Form Handler
// Saves to Supabase  +  sends email via EmailJS
// =============================================

(function () {
    'use strict';

    // ── Supabase ───────────────────────────────────────────
    var SUPABASE_URL      = 'https://wvjcxstgraiutrhjsknh.supabase.co';
    var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2amN4c3RncmFpdXRyaGpza25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MTc5OTcsImV4cCI6MjA4ODA5Mzk5N30.C5Ht8xNprujnShRb5PeJd04igS2W8jfBkKBa2cUc5HM';

    // ── EmailJS — replace the three placeholder values ─────
    // Step-by-step setup (5 minutes, free tier = 200 emails/month):
    //   1. Create a free account at https://www.emailjs.com
    //   2. Dashboard → Email Services → Add New Service → connect your Gmail
    //      → copy the Service ID  (looks like  service_xxxxxxx)
    //   3. Dashboard → Email Templates → Create New Template
    //      → paste the template shown in the README comment below
    //      → copy the Template ID  (looks like  template_xxxxxxx)
    //   4. Dashboard → Account → API Keys → copy the Public Key
    var EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY';    // ← paste here
    var EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';    // ← paste here
    var EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';   // ← paste here

    /*
    ── Recommended EmailJS template body ──────────────────────
    Subject:  New portfolio message from {{from_name}}

    Hello {{to_name}},

    You have a new message from your portfolio contact form:

    Name:    {{from_name}}
    Email:   {{from_email}}
    Message:
    {{message}}

    ───────────────────────────────────────────────────────────
    In the template editor set:
      • "To Email"     → your Gmail address
      • "Reply To"     → {{reply_to}}
    ────────────────────────────────────────────────────────── */

    // ── DOM refs ───────────────────────────────────────────
    var form       = document.getElementById('contact-form');
    var submitBtn  = document.getElementById('contact-submit');
    var submitText = document.getElementById('submit-text');
    var submitSpin = document.getElementById('submit-loading');
    var successMsg = document.getElementById('form-success');
    var errorMsg   = document.getElementById('form-error');
    var errSpan    = document.getElementById('form-error-text');

    if (!form) return;

    // Initialise EmailJS SDK (runs after the CDN script loads)
    function tryInitEmailJS() {
        if (window.emailjs && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
            window.emailjs.init(EMAILJS_PUBLIC_KEY);
        }
    }
    tryInitEmailJS();

    // ── Validation ─────────────────────────────────────────
    function validate(name, email, message) {
        if (!name)                                        return 'Please enter your name.';
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                                                          return 'Please enter a valid email address.';
        if (!message)                                     return 'Please write a message before sending.';
        return null;
    }

    // ── Loading state ──────────────────────────────────────
    function setLoading(on) {
        submitBtn.disabled       = on;
        submitText.style.display = on ? 'none'         : 'inline';
        submitSpin.style.display = on ? 'inline-flex'  : 'none';
    }

    // ── Show feedback ──────────────────────────────────────
    function showResult(ok, msg) {
        if (ok) {
            successMsg.style.display = 'flex';
            errorMsg.style.display   = 'none';
        } else {
            if (errSpan) errSpan.textContent = msg || 'Failed to send. Please try again or email me directly.';
            errorMsg.style.display   = 'flex';
            successMsg.style.display = 'none';
        }
    }

    // ── Submit ─────────────────────────────────────────────
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        var name    = document.getElementById('contact-name').value.trim();
        var email   = document.getElementById('contact-email').value.trim();
        var message = document.getElementById('contact-message').value.trim();

        // Clear previous feedback
        successMsg.style.display = 'none';
        errorMsg.style.display   = 'none';

        // Client-side validation
        var validErr = validate(name, email, message);
        if (validErr) { showResult(false, validErr); return; }

        setLoading(true);

        var dbOk    = false;
        var emailOk = false;

        // 1 ─ Save to Supabase (keeps the database record)
        try {
            var res = await fetch(SUPABASE_URL + '/rest/v1/contact_messages', {
                method: 'POST',
                headers: {
                    'Content-Type':  'application/json',
                    'apikey':        SUPABASE_ANON_KEY,
                    'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
                    'Prefer':        'return=minimal'
                },
                body: JSON.stringify({ name: name, email: email, message: message })
            });
            dbOk = res.ok || res.status === 201;
            if (!dbOk) {
                var dbErr = await res.json().catch(function () { return {}; });
                console.warn('Supabase save failed:', dbErr);
            }
        } catch (dbNetErr) {
            console.warn('Supabase network error:', dbNetErr);
        }

        // 2 ─ Send email notification via EmailJS
        var emailJsReady = window.emailjs && EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY';
        if (emailJsReady) {
            try {
                // Re-init in case the SDK loaded after this script
                tryInitEmailJS();
                await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                    from_name:  name,
                    from_email: email,
                    message:    message,
                    to_name:    'Naing Naing Maw',
                    reply_to:   email
                });
                emailOk = true;
            } catch (ejsErr) {
                console.warn('EmailJS error:', ejsErr);
            }
        } else {
            // EmailJS not yet configured — treat as non-blocking so
            // the form still works via Supabase alone
            emailOk = true;
        }

        setLoading(false);

        if (dbOk || emailOk) {
            showResult(true);
            form.reset();
        } else {
            showResult(false,
                'Could not send your message. Please try again or email me directly at naingmaw154@gmail.com.');
        }
    });
})();
