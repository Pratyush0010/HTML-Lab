$(document).ready(function () {
    loadTasks();

    // Add task when clicking the Add button
    $("#addTask").click(function () {
        addTask();
    });

    // Add task when pressing Enter key in the input field
    $("#taskInput").keypress(function (e) {
        if (e.which === 13) {  // 13 is the Enter key
            addTask();
        }
    });
});

function addTask() {
    let task = $("#taskInput").val().trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    $("#taskInput").val("");
    loadTasks();
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    $("#taskList").empty();

    tasks.forEach(function (task, index) {
        $("#taskList").append(`
        <li>
            <span>${task}</span>
            <button class="delete-btn" data-index="${index}">X</button>
        </li>
        `);
    });

    // Attach delete event to newly created buttons
    $(".delete-btn").click(function () {
        let index = $(this).data("index");
        deleteTask(index);
        });
}

function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}