document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded"); // Debugging
    const registerForm = document.querySelector("form[action='/back-end/register.php']");
    console.log("Form selected:", registerForm); // Debugging

    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            console.log("Form submitted"); // Debugging
            let isValid = true;

            // Clear previous errors
            clearErrors();

            // Validate Full Name
            const nameInput = document.getElementById("name");
            if (nameInput.value.trim() === "") {
                showError(nameInput, "Full Name is required.");
                isValid = false;
            }

            // Validate Email
            const emailInput = document.getElementById("email");
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === "") {
                showError(emailInput, "Email is required.");
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                showError(emailInput, "Please enter a valid email address.");
                isValid = false;
            }

            // Validate Password
            const passwordInput = document.getElementById("password");
            if (passwordInput.value.trim() === "") {
                showError(passwordInput, "Password is required.");
                isValid = false;
            } else if (passwordInput.value.length < 8) {
                showError(passwordInput, "Password must be at least 8 characters long.");
                isValid = false;
            }

            // Validate Confirm Password
            const confirmPasswordInput = document.getElementById("confirm_password");
            if (confirmPasswordInput.value.trim() === "") {
                showError(confirmPasswordInput, "Confirm Password is required.");
                isValid = false;
            } else if (confirmPasswordInput.value !== passwordInput.value) {
                showError(confirmPasswordInput, "Passwords do not match.");
                isValid = false;
            }

            // Validate Role
            const roleInput = document.getElementById("role");
            if (roleInput.value === "") {
                showError(roleInput, "Please select a role.");
                isValid = false;
            }

            // Prevent form submission if validation fails
            if (!isValid) {
                console.log("Preventing form submission"); // Debugging
                event.preventDefault();
            }
        });

        function showError(input, message) {
            const formGroup = input.parentElement;
            const errorMessage = formGroup.querySelector('.error-message');
            if (!errorMessage) {
                const errorElement = document.createElement('p');
                errorElement.className = 'error-message text-red-500 text-sm mt-1';
                errorElement.textContent = message;
                formGroup.appendChild(errorElement);
            } else {
                errorMessage.textContent = message;
            }
            input.classList.add('border-red-500');
        }

        function clearErrors() {
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(error => error.remove());

            const inputs = document.querySelectorAll('input, select');
            inputs.forEach(input => input.classList.remove('border-red-500'));
        }
    }
});