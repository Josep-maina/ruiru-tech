document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const dropdowns = document.querySelectorAll(".dropdown");
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Hamburger menu functionality
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector(".nav-link");
        link.addEventListener("click", (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle("active");
            }
        });
    });

    // Form submission handling
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const formData = new FormData(this);
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    formMessage.textContent = "Thank you for your message. We will get back to you soon.";
                    formMessage.className = "form-message success";
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                formMessage.textContent = 'An error occurred. Please try again later.';
                formMessage.className = 'form-message error';
            });
        }
    });

    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        if (name.value.trim() === '') {
            isValid = false;
            showError(name, 'Name is required');
        } else {
            removeError(name);
        }

        if (email.value.trim() === '') {
            isValid = false;
            showError(email, 'Email is required');
        } else if (!isValidEmail(email.value)) {
            isValid = false;
            showError(email, 'Please enter a valid email address');
        } else {
            removeError(email);
        }

        if (message.value.trim() === '') {
            isValid = false;
            showError(message, 'Message is required');
        } else {
            removeError(message);
        }

        return isValid;
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message') || document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(error);
        }
        input.classList.add('error');
    }

    function removeError(input) {
        const formGroup = input.closest('.form-group');
        const error = formGroup.querySelector('.error-message');
        if (error) {
            formGroup.removeChild(error);
        }
        input.classList.remove('error');
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Initialize Lucide icons
    lucide.createIcons();
});

To integrate these three languages (HTML, CSS, and JavaScript) for your contact page:

1. Save the HTML code in a file named `contact.html`.
2. Save the CSS code in a file named `contact.css`.
3. Save the JavaScript code in a file named `contact.js`.
4. Make sure all three files are in the same directory.
5. Ensure that the `style1.css` file (which contains your site-wide styles) is also in the same directory or update the path in the HTML file if it's located elsewhere.
6. Replace `'YOUR_RECAPTCHA_SITE_KEY'` in the HTML file with your actual reCAPTCHA site key.
7. Replace `'your_formspree_id'` in the HTML file with your actual Formspree form ID. You can get this by signing up at Formspree (https://formspree.io/).

The integration is already done in the HTML file:
- The CSS file is linked in the `<head>` section: `<link rel="stylesheet" href="contact.css">`
- The JavaScript file is linked at the end of the `<body>` section: `<script src="contact.js"></script>`

This setup provides a professional contact page with the following features:

1. A responsive design that works well on both desktop and mobile devices.
2. Client-side form validation with error messages.
3. reCAPTCHA integration for spam prevention.
4. A honeypot field for additional spam protection.
5. Confirmation messages displayed after form submission.
6. Privacy information included below the form.
7. The contact form submissions will be handled by Formspree, which will forward the messages to your email address.

Remember to test the page thoroughly to ensure all features are working as expected. If you encounter any issues or need to make adjustments, feel free to ask for help!