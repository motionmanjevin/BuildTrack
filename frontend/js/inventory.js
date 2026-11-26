const addMaterialBtn = document.getElementById("addMaterialBtn");
const materialModal = document.getElementById("materialModal");
const closeModal = document.getElementById("closeModal");

addMaterialBtn.addEventListener("click", function () {
    materialModal.style.display = "flex";
});

closeModal.addEventListener("click", function () {
    materialModal.style.display = "none";
});

materialModal.addEventListener("click", function (event) {
    if (event.target === materialModal) {
        materialModal.style.display = "none";
    }
});
const materialForm = document.getElementById("materialForm");
const inventoryTable = document.querySelector("tbody");

let materialCount = 5;

materialForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("materialName").value;
    const category = document.getElementById("materialCategory").value;
    const quantity = Number(document.getElementById("materialQuantity").value);
    const unit = document.getElementById("materialUnit").value;
    const reorderLevel = Number(document.getElementById("reorderLevel").value);

    const status = quantity <= reorderLevel ? "Low Stock" : "Available";
    const statusClass = quantity <= reorderLevel ? "low" : "available";

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>MAT${String(materialCount).padStart(3, "0")}</td>
        <td>${name}</td>
        <td>${category}</td>
        <td>${quantity}</td>
        <td>${unit}</td>
        <td>${reorderLevel}</td>
        <td><span class="status ${statusClass}">${status}</span></td>
        <td><button class="edit-button">Edit</button></td>
    `;

    inventoryTable.appendChild(newRow);

    materialCount++;

    materialForm.reset();
    materialModal.style.display = "none";
});const searchMaterial = document.getElementById("searchMaterial");
const categoryFilter = document.getElementById("categoryFilter");

function filterMaterials() {
    const searchValue = searchMaterial.value.toLowerCase();
    const categoryValue = categoryFilter.value.toLowerCase();

    const rows = inventoryTable.querySelectorAll("tr");

    rows.forEach(function (row) {
        const materialName = row.cells[1].textContent.toLowerCase();
        const category = row.cells[2].textContent.toLowerCase();

        const matchesSearch = materialName.includes(searchValue);
        const matchesCategory =
            categoryValue === "" || category === categoryValue;

        row.style.display =
            matchesSearch && matchesCategory ? "" : "none";
    });
}

searchMaterial.addEventListener("input", filterMaterials);
categoryFilter.addEventListener("change", filterMaterials);
inventoryTable.addEventListener("click", function (event) {

    if (event.target.classList.contains("edit-button")) {

        const row = event.target.closest("tr");

        const materialName = row.cells[1].textContent;

        const newQuantity = prompt(
            "Enter new quantity for " + materialName,
            row.cells[3].textContent
        );

        if (newQuantity === null || newQuantity.trim() === "") {
            return;
        }

        const quantity = Number(newQuantity);

        if (!Number.isFinite(quantity) || quantity < 0) {
            alert("Please enter a valid quantity.");
            return;
        }

        const newReorderLevel = prompt(
            "Enter new reorder level",
            row.cells[5].textContent
        );

        if (newReorderLevel === null || newReorderLevel.trim() === "") {
            return;
        }

        const reorderLevel = Number(newReorderLevel);

        if (!Number.isFinite(reorderLevel) || reorderLevel < 0) {
            alert("Please enter a valid reorder level.");
            return;
        }

        row.cells[3].textContent = quantity;
        row.cells[5].textContent = reorderLevel;

        const status = quantity <= reorderLevel;

        row.cells[6].innerHTML = status
            ? '<span class="status low">Low Stock</span>'
            : '<span class="status available">Available</span>';
    }

});
inventoryTable.addEventListener("click", function (event) {

    if (event.target.classList.contains("delete-button")) {

        const row = event.target.closest("tr");
        const materialName = row.cells[1].textContent;

        const confirmDelete = confirm(
            "Are you sure you want to delete " + materialName + "?"
        );

        if (confirmDelete) {
            row.remove();
        }
    }

});