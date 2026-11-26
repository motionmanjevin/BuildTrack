
const profileForm = document.getElementById("profileForm");
const passwordForm = document.getElementById("passwordForm");
const savePreferences = document.getElementById("savePreferences");

// Save profile information
profileForm.addEventListener("submit", function (event) {
    event.preventDefault();

    alert("Profile information saved successfully!");
});

// Change password demonstration
passwordForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const currentPassword =
        document.getElementById("currentPassword").value;

    const newPassword =
        document.getElementById("newPassword").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    if (newPassword.length < 8) {
        alert("New password must contain at least 8 characters.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("New passwords do not match.");
        return;
    }

    if (currentPassword === newPassword) {
        alert("Choose a different password.");
        return;
    }

    alert("Password form validated. Backend password update is not connected yet.");

    passwordForm.reset();
});

// Save preferences demonstration
savePreferences.addEventListener("click", function () {
    alert("Account preferences saved successfully!");
});
