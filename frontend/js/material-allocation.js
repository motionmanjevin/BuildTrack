
const addAllocationBtn = document.getElementById("addAllocationBtn");
const allocationModal = document.getElementById("allocationModal");
const closeAllocationModal = document.getElementById("closeAllocationModal");

const allocationForm = document.getElementById("allocationForm");
const allocationTable = document.getElementById("allocationTable");

let allocationCount = 3;

// Open modal
addAllocationBtn.addEventListener("click", function () {
    allocationModal.style.display = "flex";
});

// Close modal
closeAllocationModal.addEventListener("click", function () {
    allocationModal.style.display = "none";
});

allocationModal.addEventListener("click", function (event) {
    if (event.target === allocationModal) {
        allocationModal.style.display = "none";
    }
});

// Add allocation
allocationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const material = document.getElementById("allocationMaterial").value;
    const quantity = Number(document.getElementById("allocationQuantity").value);
    const project = document.getElementById("allocationProject").value;
    const task = document.getElementById("allocationTask").value;
    const date = document.getElementById("allocationDate").value;
    const status = document.getElementById("allocationStatus").value;

    if (!Number.isInteger(quantity) || quantity <= 0) {
        alert("Enter a valid quantity.");
        return;
    }

    const statusClass =
        status === "Allocated" ? "allocated" : "pending";

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>ALC${String(allocationCount).padStart(3, "0")}</td>
        <td>${material}</td>
        <td>${quantity}</td>
        <td>${project}</td>
        <td>${task}</td>
        <td>${date}</td>
        <td><span class="allocation-status ${statusClass}">${status}</span></td>
    `;

    allocationTable.appendChild(newRow);

    allocationCount++;
    allocationForm.reset();
    allocationModal.style.display = "none";
});

// Search and filter
const allocationSearch = document.getElementById("allocationSearch");
const allocationFilter = document.getElementById("allocationFilter");

function filterAllocations() {
    const searchValue = allocationSearch.value.toLowerCase();
    const filterValue = allocationFilter.value.toLowerCase();

    const rows = allocationTable.querySelectorAll("tr");

    rows.forEach(function (row) {
        const material = row.cells[1].textContent.toLowerCase();
        const project = row.cells[3].textContent.toLowerCase();
        const status = row.cells[6].textContent.toLowerCase();

        const matchesSearch =
            material.includes(searchValue) ||
            project.includes(searchValue);

        const matchesFilter =
            filterValue === "" || status === filterValue;

        row.style.display =
            matchesSearch && matchesFilter ? "" : "none";
    });
}

allocationSearch.addEventListener("input", filterAllocations);
allocationFilter.addEventListener("change", filterAllocations);
