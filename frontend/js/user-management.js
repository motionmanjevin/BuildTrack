
const addUserBtn = document.getElementById("addUserBtn");
const userModal = document.getElementById("userModal");
const closeUserModal = document.getElementById("closeUserModal");
const userForm = document.getElementById("userForm");
const userTable = document.getElementById("userTable");

let userCount = 3;

// Open modal
addUserBtn.addEventListener("click", function () {
    userModal.style.display = "flex";
});

// Close modal
closeUserModal.addEventListener("click", function () {
    userModal.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target === userModal) {
        userModal.style.display = "none";
    }
});

// Add user
userForm.addEventListener("submit", function (event) {
    event.preventDefault();

    userCount++;

    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const phone = document.getElementById("userPhone").value;
    const role = document.getElementById("userRole").value;
    const status = document.getElementById("userStatus").value;

    const row = document.createElement("tr");

    row.innerHTML = `
        <td>USR${String(userCount).padStart(3, "0")}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${role}</td>
        <td>${phone}</td>
        <td><span class="user-status ${status.toLowerCase()}">${status}</span></td>
        <td><button class="edit-button">Edit</button></td>
    `;

    userTable.appendChild(row);

    userForm.reset();
    userModal.style.display = "none";
});

// Search and filter users
const userSearch = document.getElementById("userSearch");
const userFilter = document.getElementById("userFilter");

function filterUsers() {
    const searchValue = userSearch.value.toLowerCase();
    const filterValue = userFilter.value.toLowerCase();

    userTable.querySelectorAll("tr").forEach(function (row) {
        const rowText = row.textContent.toLowerCase();
        const status = row.cells[5].textContent.toLowerCase();

        const matchesSearch = rowText.includes(searchValue);
        const matchesFilter =
            filterValue === "" || status === filterValue;

        row.style.display =
            matchesSearch && matchesFilter ? "" : "none";
    });
}

userSearch.addEventListener("input", filterUsers);
userFilter.addEventListener("change", filterUsers);
