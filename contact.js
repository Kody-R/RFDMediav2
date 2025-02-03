document.getElementById("contact-form").addEventListener("submit", function (e) {
    const name = document.querySelector("input[name='name']").value.trim();
    const email = document.querySelector("input[name='email']").value.trim();
    const message = document.querySelector("textarea[name='message']").value.trim();
    const status = document.getElementById("form-status");

    // Validate form fields
    if (name === "" || email === "" || message === "") {
        e.preventDefault(); // Prevent submission
        status.textContent = "Please fill in all fields.";
        status.style.color = "red";
        return;
    }

    // Validate email format
    if (!validateEmail(email)) {
        e.preventDefault(); // Prevent submission
        status.textContent = "Please enter a valid email.";
        status.style.color = "red";
        return;
    }

    // If validation passes, allow submission
    status.textContent = "Thank you! Redirecting...";
    status.style.color = "green";
});

// Email validation function
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}
