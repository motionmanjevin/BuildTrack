
const reportForm = document.getElementById("reportForm");
const reportTable = document.getElementById("reportTable");
const reportPreview = document.getElementById("previewMessage");

let reportCount = 3;

reportForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const reportType = document.getElementById("reportType").value;
    const startDate = document.getElementById("reportStartDate").value;
    const endDate = document.getElementById("reportEndDate").value;

    if (endDate < startDate) {
        alert("End date cannot be earlier than start date.");
        return;
    }

    const generatedDate = new Date().toISOString().split("T")[0];

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>RPT${String(reportCount).padStart(3, "0")}</td>
        <td>${reportType}</td>
        <td>${generatedDate}</td>
        <td>${startDate} to ${endDate}</td>
        <td><button class="view-button">View</button></td>
    `;

    reportTable.appendChild(newRow);

    reportPreview.textContent =
        `${reportType} generated for the period ${startDate} to ${endDate}.`;

    reportCount++;
    reportForm.reset();
});

// View report
reportTable.addEventListener("click", function (event) {
    if (event.target.classList.contains("view-button")) {
        const row = event.target.closest("tr");

        const reportName = row.cells[1].textContent;
        const generatedDate = row.cells[2].textContent;
        const period = row.cells[3].textContent;

        reportPreview.textContent =
            `${reportName} | Generated: ${generatedDate} | Period: ${period}`;
    }
});
