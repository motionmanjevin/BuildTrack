
const addSupplierBtn = document.getElementById("addSupplierBtn");
const supplierModal = document.getElementById("supplierModal");
const closeSupplierModal = document.getElementById("closeSupplierModal");

const supplierForm = document.getElementById("supplierForm");
const supplierTable = document.getElementById("supplierTable");

let supplierCount = 4;

// Open modal
addSupplierBtn.addEventListener("click", function () {
    supplierModal.style.display = "flex";
});

// Close modal
closeSupplierModal.addEventListener("click", function () {
    supplierModal.style.display = "none";
});

supplierModal.addEventListener("click", function (event) {
    if (event.target === supplierModal) {
        supplierModal.style.display = "none";
    }
});

// Add supplier
supplierForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("supplierName").value;
    const contact = document.getElementById("contactPerson").value;
    const phone = document.getElementById("supplierPhone").value;
    const email = document.getElementById("supplierEmail").value;
    const location = document.getElementById("supplierLocation").value;
    const status = document.getElementById("supplierStatus").value;

    const statusClass =
        status === "Active" ? "active" : "inactive";

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>SUP${String(supplierCount).padStart(3, "0")}</td>
        <td>${name}</td>
        <td>${contact}</td>
        <td>${phone}</td>
        <td>${email}</td>
        <td>${location}</td>
        <td><span class="supplier-status ${statusClass}">${status}</span></td>
        <td><button class="edit-button">Edit</button></td>
    `;

    supplierTable.appendChild(newRow);

    supplierCount++;
    supplierForm.reset();
    supplierModal.style.display = "none";
});

// Search and filter
const supplierSearch = document.getElementById("supplierSearch");
const supplierFilter = document.getElementById("supplierFilter");

function filterSuppliers() {
    const searchValue = supplierSearch.value.toLowerCase();
    const filterValue = supplierFilter.value.toLowerCase();

    const rows = supplierTable.querySelectorAll("tr");

    rows.forEach(function (row) {
        const supplierName = row.cells[1].textContent.toLowerCase();
        const status = row.cells[6].textContent.toLowerCase();

        const matchesSearch = supplierName.includes(searchValue);
        const matchesFilter =
            filterValue === "" || status === filterValue;

        row.style.display =
            matchesSearch && matchesFilter ? "" : "none";
    });
}

supplierSearch.addEventListener("input", filterSuppliers);
supplierFilter.addEventListener("change", filterSuppliers);
