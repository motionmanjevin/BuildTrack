const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.textContent = "Hide";
    } else {
        passwordInput.type = "password";
        togglePassword.textContent = "Show";
    }

});
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = passwordInput.value;

    if (email === "" || password === "") {
       loginMessage.textContent = "Please enter your email and password.";
loginMessage.style.color = "red";
        return;
    }

   const loginMessage = document.getElementById("loginMessage");

loginMessage.textContent = "Form validation successful!";
loginMessage.style.color = "green";

});