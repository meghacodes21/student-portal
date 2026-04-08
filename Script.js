// USERS
let users = JSON.parse(localStorage.getItem("users")) || [];

// REGISTER
let regform = document.getElementById("registerForm");

if (regform) {
    regform.addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("regName").value;
        let email = document.getElementById("regEmail").value;
        let pass = document.getElementById("regPass").value;
        let cpass = document.getElementById("regCPass").value;

        if (pass !== cpass) {
            alert("Password not match");
            return;
        }

        let exist = users.find(u => u.email === email);
        if (exist) {
            alert("User already exists");
            return;
        }

        users.push({ name, email, pass });
        localStorage.setItem("users", JSON.stringify(users));

        alert("Registered Successfully");
        window.location.href = "index.html";
    });
}

// LOGIN
let loginform = document.getElementById("loginForm");

if (loginform) {
    loginform.addEventListener("submit", function (e) {
        e.preventDefault();

        let email = document.getElementById("loginEmail").value;
        let pass = document.getElementById("loginPass").value;

        let user = users.find(u => u.email === email && u.pass === pass);

        if (user) {
            localStorage.setItem("currentUser", email); // 🔥 important
            alert("Login Success");
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid login");
        }
    });
}

// TASK SYSTEM
let tasks = JSON.parse(localStorage.getItem("tasks")) || {};
let currentUser = localStorage.getItem("currentUser");

// ADD TASK
function addTask() {
    let task = document.getElementById("taskInput").value;

    if (!task) {
        alert("Enter task");
        return;
    }

    if (!tasks[currentUser]) {
        tasks[currentUser] = [];
    }

    tasks[currentUser].push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    showTasks();
}

// SHOW TASKS
function showTasks() {
    let list = document.getElementById("taskList");

    if (!list) return;

    let userTasks = tasks[currentUser] || [];

    let output = "";

    userTasks.forEach((t, index) => {
        output += `<p>${t} <button onclick="deleteTask(${index})">Delete</button></p>`;
    });

    list.innerHTML = output;
}

// DELETE TASK
function deleteTask(index) {
    tasks[currentUser].splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    showTasks();
}

// LOGOUT
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

// AUTO LOAD TASKS
if (currentUser) {
    showTasks();
}