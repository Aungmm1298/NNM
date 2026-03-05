// =============================================
// Supabase Contact Form Handler
// =============================================

(function () {
    'use strict';

    var SUPABASE_URL = 'https://wvjcxstgraiutrhjsknh.supabase.co';
    var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind2amN4c3RncmFpdXRyaGpza25oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI1MTc5OTcsImV4cCI6MjA4ODA5Mzk5N30.C5Ht8xNprujnShRb5PeJd04igS2W8jfBkKBa2cUc5HM';

    var form        = document.getElementById('contact-form');
    var submitBtn   = document.getElementById('contact-submit');
    var submitText  = document.getElementById('submit-text');
    var submitSpin  = document.getElementById('submit-loading');
    var successMsg  = document.getElementById('form-success');
    var errorMsg    = document.getElementById('form-error');

    if (!form) return; // guard: only run if the form exists

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        var name    = document.getElementById('contact-name').value.trim();
        var email   = document.getElementById('contact-email').value.trim();
        var message = document.getElementById('contact-message').value.trim();

        // Reset state
        successMsg.style.display = 'none';
        errorMsg.style.display   = 'none';
        submitBtn.disabled       = true;
        submitText.style.display = 'none';
        submitSpin.style.display = 'inline-block';

        try {
            var response = await fetch(SUPABASE_URL + '/rest/v1/contact_messages', {
                method: 'POST',
                headers: {
                    'Content-Type':  'application/json',
                    'apikey':        SUPABASE_ANON_KEY,
                    'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
                    'Prefer':        'return=minimal'
                },
                body: JSON.stringify({ name: name, email: email, message: message })
            });

            if (response.ok || response.status === 201) {
                successMsg.style.display = 'flex';
                form.reset();
            } else {
                var err = await response.json().catch(function () { return {}; });
                console.error('Supabase error (status ' + response.status + '):', err);
                var detail = err.message || err.hint || err.error_description || ('HTTP ' + response.status);
                var errSpan = document.getElementById('form-error-text');
                if (errSpan) errSpan.textContent = 'Failed to send (' + detail + '). Please try again or email me directly.';
                errorMsg.style.display = 'flex';
            }
        } catch (err) {
            console.error('Network error:', err);
            var errSpan = document.getElementById('form-error-text');
            if (errSpan) errSpan.textContent = 'Failed to send (network error). Please check your connection or email me directly.';
            errorMsg.style.display = 'flex';
        } finally {
            submitBtn.disabled       = false;
            submitText.style.display = 'inline';
            submitSpin.style.display = 'none';
        }
    });
})();
