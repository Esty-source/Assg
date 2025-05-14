// Form switching functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const forms = document.querySelectorAll('form');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const formType = btn.dataset.form;
        
        // Update active tab
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Show corresponding form
        forms.forEach(form => {
            form.classList.remove('active');
            if (form.id === `${formType}-form`) {
                form.classList.add('active');
            }
        });
    });
});

// Password validation
const signupPassword = document.getElementById('signup-password');
const confirmPassword = document.getElementById('signup-confirm-password');
const requirements = {
    length: document.getElementById('length'),
    uppercase: document.getElementById('uppercase'),
    lowercase: document.getElementById('lowercase'),
    number: document.getElementById('number'),
    special: document.getElementById('special')
};

function validatePassword(password) {
    const conditions = {
        length: password.length >= 10,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    // Update UI for each requirement
    Object.keys(conditions).forEach(condition => {
        if (conditions[condition]) {
            requirements[condition].classList.add('valid');
        } else {
            requirements[condition].classList.remove('valid');
        }
    });

    return Object.values(conditions).every(condition => condition);
}

function validateConfirmPassword() {
    const password = signupPassword.value;
    const confirmPwdValue = confirmPassword.value;
    
    if (confirmPwdValue === '') {
        setErrorFor(confirmPassword, 'Please confirm your password');
        return false;
    } else if (password !== confirmPwdValue) {
        setErrorFor(confirmPassword, 'Passwords do not match');
        return false;
    } else {
        setSuccessFor(confirmPassword);
        return true;
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('.error-message');
    errorMessage.innerText = message;
    input.classList.add('error');
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    const errorMessage = formControl.querySelector('.error-message');
    errorMessage.innerText = '';
    input.classList.remove('error');
}

// Real-time password validation
signupPassword.addEventListener('input', () => {
    validatePassword(signupPassword.value);
    if (confirmPassword.value !== '') {
        validateConfirmPassword();
    }
});

confirmPassword.addEventListener('input', validateConfirmPassword);

// Form submission handlers
document.getElementById('signup-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const username = document.getElementById('signup-username');
    const email = document.getElementById('signup-email');
    let isValid = true;

    // Username validation
    if (username.value.trim() === '') {
        setErrorFor(username, 'Username cannot be empty');
        isValid = false;
    } else {
        setSuccessFor(username);
    }

    // Email validation
    if (email.value.trim() === '') {
        setErrorFor(email, 'Email cannot be empty');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        setErrorFor(email, 'Please enter a valid email');
        isValid = false;
    } else {
        setSuccessFor(email);
    }

    // Password validation
    if (!validatePassword(signupPassword.value)) {
        setErrorFor(signupPassword, 'Password must meet all requirements');
        isValid = false;
    } else {
        setSuccessFor(signupPassword);
    }

    // Confirm password validation
    if (!validateConfirmPassword()) {
        isValid = false;
    }

    if (isValid) {
        showModal('Sign Up Successful!', 'Your account has been created successfully. Welcome aboard!');
        e.target.reset();
    }
});

document.getElementById('signin-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('signin-email');
    const password = document.getElementById('signin-password');
    let isValid = true;

    // Email validation
    if (email.value.trim() === '') {
        setErrorFor(email, 'Email cannot be empty');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        setErrorFor(email, 'Please enter a valid email');
        isValid = false;
    } else {
        setSuccessFor(email);
    }

    // Password validation
    if (password.value.trim() === '') {
        setErrorFor(password, 'Password cannot be empty');
        isValid = false;
    } else {
        setSuccessFor(password);
    }

    if (isValid) {
        showModal('Sign In Successful!', 'Welcome back! You have been signed in successfully.');
        e.target.reset();
    }
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Modal functions
const modal = document.getElementById('success-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');

function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    modal.classList.add('show');
}

function closeModal() {
    modal.classList.remove('show');
}

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal when clicking the X button
document.querySelector('.close-modal').addEventListener('click', closeModal);

// Password toggle functionality
document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const passwordInput = document.getElementById(targetId);
        
        // Toggle password visibility
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');
        } else {
            passwordInput.type = 'password';
            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');
        }
    });
});
