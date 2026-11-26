
const alertSearch = document.getElementById("alertSearch");
const alertFilter = document.getElementById("alertFilter");
const alertTable = document.getElementById("alertTable");

function filterAlerts() {
    const searchValue = alertSearch.value.toLowerCase();
    const filterValue = alertFilter.value.toLowerCase();

    const rows = alertTable.querySelectorAll("tr");

    rows.forEach(function (row) {
        const materialName = row.cells[1].textContent.toLowerCase();
        const status = row.cells[5].textContent.toLowerCase();

        const matchesSearch = materialName.includes(searchValue);
        const matchesFilter =
            filterValue === "" || status === filterValue;

        row.style.display =
            matchesSearch && matchesFilter ? "" : "none";
    });
}

alertSearch.addEventListener("input", filterAlerts);
alertFilter.addEventListener("change", filterAlerts);
