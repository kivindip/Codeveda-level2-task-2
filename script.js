let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/* SAVE */
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

/* ADD TASK */
function addTask() {
  const text = document.getElementById("taskInput").value.trim();
  const date = document.getElementById("dateInput").value;

  if (!text) return;

  tasks.push({
    text,
    date,
    completed: false
  });

  document.getElementById("taskInput").value = "";
  document.getElementById("dateInput").value = "";

  updateUI();
}

/* TOGGLE COMPLETE */
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  updateUI();
}

/* DELETE WITH CONFIRMATION */
function deleteTask(index) {
  const ok = confirm("⚠️ Are you sure you want to delete this task?");
  if (ok) {
    tasks.splice(index, 1);
    updateUI();
  }
}

/* PROGRESS + MOTIVATION */
function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;

  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById("progressBar").style.width = percent + "%";

  let msg = "";

  if (percent >= 100) msg = "🏆 Perfect! You completed everything!";
  else if (percent >= 75) msg = "🔥 Almost there! Keep going!";
  else if (percent >= 50) msg = "💪 Halfway done!";
  else if (percent >= 25) msg = "✨ Nice start!";
  else msg = "▶️ Start strong! You can do it!";

  document.getElementById("progressText").innerHTML =
    `Completed ${completed}/${total} (${percent}%)<br>${msg}`;

  return { total, completed };
}

/* PIE CHART */
function updateChart() {
  const { total, completed } = updateProgress();
  const pending = total - completed;

  document.getElementById("chartBox").innerHTML = `
    
  `;
}

/* RENDER UI */
function updateUI() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, i) => {
    const li = document.createElement("li");

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div onclick="toggleTask(${i})">
        <div>${task.text}</div>
        <small>📅 ${task.date || "No due date"}</small>
      </div>

      <button class="del" onclick="deleteTask(${i})">Delete</button>
    `;

    list.appendChild(li);
  });

  save();
  updateProgress();
  updateChart();
}

/* FIRST LOAD */
updateUI();