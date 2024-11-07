document.addEventListener('DOMContentLoaded', function() {
    const submitButton = document.getElementById('submit-btn');
    submitButton.addEventListener('click', async function(event) {
        event.preventDefault();
        await submitForm();
    });
});

async function submitForm() {
    const form = document.getElementById('signup-form');

    const formData = {
        email: form.email.value.trim(),
        first_name: form.first_name.value.trim(),
        last_name: form.last_name.value.trim(),
        password: form.password.value.trim(),
        city: form.city.value.trim(),
        age: form.age.value.trim(),
        about_yourself: form.about_yourself.value.trim(),
        strengths: form.strengths.value.trim(),
        how_you_heard: form.how_you_heard.value.trim(),
        terms_agreement: form.terms_agreement.checked
    };

    const missingFields = [];
    const formFields = ['email', 'first_name', 'last_name', 'password', 'city', 'age', 'about_yourself', 'strengths', 'how_you_heard'];
    formFields.forEach(field => {
        if (!form[field].value.trim()) {
            missingFields.push(field);
            form[field].style.borderColor = 'red';
        } else {
            form[field].style.borderColor = '';
        }
    });

    // בדיקות סיסמה
    if (formData.password.length < 5 || formData.password.length > 8) {
        missingFields.push('Password must be between 5 and 8 characters');
        form.password.style.borderColor = 'red';
    }
    if (!/[0-9]/.test(formData.password)) {
        missingFields.push('Password must contain at least one number (0-9)');
        form.password.style.borderColor = 'red';
    }
    if (!/[!@#$%^&*]/.test(formData.password)) {
        missingFields.push('Password must contain at least one special character (!@#$%^&*)');
        form.password.style.borderColor = 'red';
    }
    if (!/[a-z]/.test(formData.password)) {
        missingFields.push('Password must contain at least one lowercase letter (a-z)');
        form.password.style.borderColor = 'red';
    }
    if (!/[A-Z]/.test(formData.password)) {
        missingFields.push('Password must contain at least one uppercase letter (A-Z)');
        form.password.style.borderColor = 'red';
    }

    if (!formData.terms_agreement) {
        missingFields.push('You must agree to the terms of service.');
    }

    if (missingFields.length > 0) {
        const missingFieldsStr = missingFields.join('\n');
        alert(`Please correct the following issues:\n${missingFieldsStr}`);
        return;
    }

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyMfc2I1QF8720iAMTRt4chKqu5zlzA1HhcqTvIfwDrcNBnzlo6jh8WHEEUSC-WZG33rA/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Form submission failed with status: ' + response.status);
        }

        const result = await response.json();
        if (result.result === 'success') {
            alert('Form submitted successfully!');
            form.reset();
        } else {
            alert('Form submission failed: ' + result.error);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form. Please try again later.');
    }
}
