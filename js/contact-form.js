/**
 * Client Intake Form Handler
 * Premium Contact Form for The Final Check Website
 * 
 * Handles validation, submission, states and API integration
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('client-intake-form');
    if (!form) return;

    const submitButton = form.querySelector('button[type="submit"]');
    const successMessage = form.querySelector('.form-success-message');
    const errorMessage = form.querySelector('.form-error-message');
    const formFields = form.querySelector('.form-fields');

    /**
     * Validate Email Format
     */
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /**
     * Clear All Errors
     */
    function clearErrors() {
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('has-error');
            const errorText = group.querySelector('.form-error-text');
            if (errorText) errorText.textContent = '';
        });
        errorMessage.style.display = 'none';
    }

    /**
     * Show Field Error
     */
    function showFieldError(fieldId, message) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        
        const formGroup = field.closest('.form-group');
        if (formGroup) formGroup.classList.add('has-error');
        
        const errorText = formGroup.querySelector('.form-error-text');
        if (errorText) errorText.textContent = message;
    }

    /**
     * Validate Form
     */
    function validateForm() {
        clearErrors();
        let isValid = true;

        const businessName = document.getElementById('businessName').value.trim();
        const contactEmail = document.getElementById('contactEmail').value.trim();

        // Business Name validation
        if (!businessName) {
            showFieldError('businessName', 'Business name is required');
            isValid = false;
        }

        // Email validation
        if (!contactEmail) {
            showFieldError('contactEmail', 'Email address is required');
            isValid = false;
        } else if (!isValidEmail(contactEmail)) {
            showFieldError('contactEmail', 'Please enter a valid email address');
            isValid = false;
        }

        // At least one site validation
        const siteEntries = document.querySelectorAll('.site-entry');
        let hasValidSite = false;
        
        siteEntries.forEach(entry => {
            const siteId = entry.dataset.siteId;
            const name = document.getElementById(`${siteId}-name`).value.trim();
            const address = document.getElementById(`${siteId}-address`).value.trim();
            const website = document.getElementById(`${siteId}-website`).value.trim();
            
            if (name || address || website) {
                hasValidSite = true;
            }
        });

        if (!hasValidSite) {
            // We don't have a specific error location for sites so show general error
            isValid = false;
        }

        return isValid;
    }

    /**
     * Collect Form Data
     */
    function collectFormData() {
        const sites = [];
        const siteEntries = document.querySelectorAll('.site-entry');
        
        siteEntries.forEach(entry => {
            const siteId = entry.dataset.siteId;
            sites.push({
                id: siteId,
                name: document.getElementById(`${siteId}-name`).value.trim(),
                address: document.getElementById(`${siteId}-address`).value.trim(),
                website: document.getElementById(`${siteId}-website`).value.trim(),
                status: 'Active'
            });
        });

        return {
            form: {
                businessName: document.getElementById('businessName').value.trim(),
                contactName: document.getElementById('contactName').value.trim(),
                contactRole: document.getElementById('contactRole').value.trim(),
                contactEmail: document.getElementById('contactEmail').value.trim(),
                contactPhone: document.getElementById('contactPhone').value.trim(),
                preferredContactMethod: document.getElementById('preferredContactMethod').value,
                website: document.getElementById('website').value.trim(),
                headOfficeAddress: document.getElementById('headOfficeAddress').value.trim(),
                businessType: document.getElementById('businessType').value,
                weeklySalesBand: document.getElementById('weeklySalesBand').value,
                challenges: document.getElementById('challenges').value.trim(),
                supportNeeded: document.getElementById('supportNeeded').value.trim(),
                extraNotes: document.getElementById('extraNotes').value.trim(),
                sites: sites
            },
            metadata: {
                source: 'website',
                page: 'contact',
                created_from: 'marketing_site',
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            }
        };
    }

    /**
     * Set Loading State
     */
    function setLoadingState(loading) {
        if (loading) {
            form.classList.add('loading');
            submitButton.classList.add('loading');
            submitButton.disabled = true;
        } else {
            form.classList.remove('loading');
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    }

    /**
     * Show Success State
     */
    function showSuccess() {
        formFields.style.display = 'none';
        errorMessage.style.display = 'none';
        successMessage.style.display = 'block';
        setLoadingState(false);
        window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
    }

    /**
     * Show Error State
     */
    function showError() {
        errorMessage.style.display = 'block';
        setLoadingState(false);
        window.scrollTo({ top: form.offsetTop - 100, behavior: 'smooth' });
    }

    /**
     * Submit to Formsubmit.co (email delivery)
     */
    async function submitToFormsubmit(data) {
        const payload = {
            _subject: 'New Enquiry - The Final Check',
            _captcha: 'false',
            businessName: data.form.businessName,
            contactName: data.form.contactName,
            contactRole: data.form.contactRole,
            contactEmail: data.form.contactEmail,
            contactPhone: data.form.contactPhone,
            preferredContactMethod: data.form.preferredContactMethod,
            website: data.form.website,
            headOfficeAddress: data.form.headOfficeAddress,
            businessType: data.form.businessType,
            weeklySalesBand: data.form.weeklySalesBand,
            challenges: data.form.challenges,
            supportNeeded: data.form.supportNeeded,
            extraNotes: data.form.extraNotes,
            sites: data.form.sites.map(function(s) {
                return [s.name, s.address, s.website].filter(Boolean).join(' | ');
            }).join('\n')
        };

        const response = await fetch('https://formsubmit.co/ajax/Thefinalcheck26@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        return await response.json();
    }

    /**
     * Submit to The Final Check portal (CRM/workflow)
     */
    async function submitToPortal(data) {
        const config = window.CLIENT_INTAKE_CONFIG;
        const endpoint = config.APP_BASE_URL + config.SUBMIT_ENDPOINT;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'omit'
            });
            const result = await response.json();
            if (!result.ok) {
                console.warn('Portal returned non-ok response:', result);
            }
        } catch (err) {
            console.warn('Portal submission failed (will not affect user):', err);
        }
    }

    /**
     * Submit to both destinations in parallel.
     * Success/failure shown to user is determined by Formsubmit only.
     */
    async function submitForm(data) {
        const [formsubmitResult] = await Promise.all([
            submitToFormsubmit(data),
            submitToPortal(data)
        ]);
        return formsubmitResult;
    }

    /**
     * Form Submit Handler
     */
    /**
     * Add Another Site Functionality
     */
    let siteCount = 1;
    const addSiteButton = document.getElementById('add-site-button');
    const siteFieldsContainer = document.getElementById('site-fields-container');

    function createNewSiteEntry() {
        siteCount++;
        const siteId = `site-${siteCount}`;

        const siteEntry = document.createElement('div');
        siteEntry.className = 'site-entry';
        siteEntry.dataset.siteId = siteId;

        siteEntry.innerHTML = `
            <div class="form-divider" style="margin: var(--space-lg) 0;"></div>
            
            <div class="form-group">
                <label for="${siteId}-name">Site Name</label>
                <input type="text" id="${siteId}-name" name="siteName" autocomplete="organization" />
            </div>

            <div class="form-group">
                <label for="${siteId}-address">Site Address</label>
                <textarea id="${siteId}-address" name="siteAddress" rows="3"></textarea>
            </div>

            <div class="form-group">
                <label for="${siteId}-website">Site Website</label>
                <input type="url" id="${siteId}-website" name="siteWebsite" autocomplete="url" placeholder="https://" />
            </div>

            <input type="hidden" id="${siteId}-status" name="siteStatus" value="Active" />
        `;

        siteFieldsContainer.appendChild(siteEntry);
        
        gsap.fromTo(siteEntry, {
            opacity: 0,
            y: 10,
            height: 0
        }, {
            opacity: 1,
            y: 0,
            height: 'auto',
            duration: 0.5,
            ease: 'expo.out'
        });
    }

    if (addSiteButton) {
        addSiteButton.addEventListener('click', createNewSiteEntry);
    }

    /**
     * Form Submit Handler
     */
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setLoadingState(true);
        
        try {
            const formData = collectFormData();
            const result = await submitForm(formData);
            
            if (result && (result.success === 'true' || result.success === true)) {
                showSuccess();
            } else {
                showError();
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showError();
        }
    });

});
