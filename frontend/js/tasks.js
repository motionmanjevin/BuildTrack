
const addTaskBtn = document.getElementById("addTaskBtn");
const taskModal = document.getElementById("taskModal");
const closeTaskModal = document.getElementById("closeTaskModal");

const taskForm = document.getElementById("taskForm");
const taskTable = document.getElementById("taskTable");

let taskCount = 4;

// Open modal
addTaskBtn.addEventListener("click", function () {
    taskModal.style.display = "flex";
});

// Close modal
closeTaskModal.addEventListener("click", function () {
    taskModal.style.display = "none";
});

taskModal.addEventListener("click", function (event) {
    if (event.target === taskModal) {
        taskModal.style.display = "none";
    }
});

// Add task
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("taskName").value;
    const project = document.getElementById("taskProject").value;
    const assignedTo = document.getElementById("assignedTo").value;
    const startDate = document.getElementById("taskStartDate").value;
    const dueDate = document.getElementById("taskDueDate").value;
    const status = document.getElementById("taskStatus").value;

    if (dueDate < startDate) {
        alert("Due date cannot be earlier than the start date.");
        return;
    }

    let statusClass = "pending";

    if (status === "In Progress") {
        statusClass = "progress";
    } else if (status === "Completed") {
        statusClass = "completed";
    }

    const newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td>TSK${String(taskCount).padStart(3, "0")}</td>
        <td>${name}</td>
        <td>${project}</td>
        <td>${assignedTo}</td>
        <td>${startDate}</td>
        <td>${dueDate}</td>
        <td><span class="status ${statusClass}">${status}</span></td>
        <td><button class="edit-button">Edit</button></td>
    `;

    taskTable.appendChild(newRow);

    taskCount++;
    taskForm.reset();
    taskModal.style.display = "none";
});

// Search and filter
const taskSearch = document.getElementById("taskSearch");
const taskFilter = document.getElementById("taskFilter");

function filterTasks() {
    const searchValue = taskSearch.value.toLowerCase();
    const filterValue = taskFilter.value.toLowerCase();

    const rows = taskTable.querySelectorAll("tr");

    rows.forEach(function (row) {
        const taskName = row.cells[1].textContent.toLowerCase();
        const status = row.cells[6].textContent.toLowerCase();

        const matchesSearch = taskName.includes(searchValue);
        const matchesFilter =
            filterValue === "" || status === filterValue.toLowerCase();

        row.style.display =
            matchesSearch && matchesFilter ? "" : "none";
    });
}

taskSearch.addEventListener("input", filterTasks);
taskFilter.addEventListener("change", filterTasks);

