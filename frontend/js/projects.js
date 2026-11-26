
const addProjectBtn = document.getElementById("addProjectBtn");
const projectModal = document.getElementById("projectModal");
const closeProjectModal = document.getElementById("closeProjectModal");

const projectForm = document.getElementById("projectForm");
const projectTable = document.getElementById("projectTable");

let projectCount = 4;

// Open form
addProjectBtn.addEventListener("click", function () {
    projectModal.style.display = "flex";
});

// Close form
closeProjectModal.addEventListener("click", function () {
    projectModal.style.display = "none";
});

// Close when clicking outside
projectModal.addEventListener("click", function (event) {
    if (event.target === projectModal) {
        projectModal.style.display = "none";
    }
});

// Save project
projectForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("projectName").value;
    const location = document.getElementById("projectLocation").value;
    const startDate = document.getElementById("startDate").value;
    const deadline = document.getElementById("deadline").value;
    const status = document.getElementById("projectStatus").value;

    if (deadline < startDate) {
        alert("Deadline cannot be earlier than the start date.");
        return;
    }

    const statusClass = status === "Completed"
        ? "completed"
        : "progress";

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>PRJ${String(projectCount).padStart(3, "0")}</td>
        <td>${name}</td>
        <td>${location}</td>
        <td>${startDate}</td>
        <td>${deadline}</td>
        <td>${status === "Completed" ? "100%" : "0%"}</td>
        <td><span class="status ${statusClass}">${status}</span></td>
        <td><button class="edit-button">Edit</button></td>
    `;

    projectTable.appendChild(newRow);

    projectCount++;

    projectForm.reset();
    projectModal.style.display = "none";
});
const projectSearch = document.getElementById("projectSearch");
const projectFilter = document.getElementById("projectFilter");

function filterProjects() {
    const searchValue = projectSearch.value.toLowerCase();
    const filterValue = projectFilter.value.toLowerCase();

    const rows = projectTable.querySelectorAll("tr");

    rows.forEach(function (row) {
        const projectName = row.cells[1].textContent.toLowerCase();
        const status = row.cells[6].textContent.toLowerCase();

        const matchesSearch = projectName.includes(searchValue);

        const matchesFilter =
            filterValue === "" || status === filterValue.toLowerCase();

        row.style.display =
            matchesSearch && matchesFilter ? "" : "none";
    });
}

projectSearch.addEventListener("input", filterProjects);
projectFilter.addEventListener("change", filterProjects);