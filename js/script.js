const addBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const taskList = document.getElementById('task-list');
const deleteAllBtn = document.getElementById('delete-all-btn');
const filterStatus = document.getElementById('filter-status');
const filterDate = document.getElementById('filter-date'); // jika ada input tanggal filter

let tasks = [];
let statusFilter = 'all';
let dateFilter = ''; // jika ingin filter tanggal

function renderTasks() {
  taskList.innerHTML = '';

  // Terapkan filter status dan tanggal
  const filteredTasks = tasks.filter(task => {
    const matchStatus =
      statusFilter === 'all' ||
      (statusFilter === 'done' && task.done) ||
      (statusFilter === 'pending' && !task.done);

    const matchDate =
      dateFilter === '' || task.date === dateFilter;

    return matchStatus && matchDate;
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `<tr><td colspan="4">No task found</td></tr>`;
    return;
  }

  filteredTasks.forEach((task, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td data-label="Task">${task.text}</td>
      <td data-label="Due Date">${task.date}</td>
      <td data-label="Status">${task.done ? 'Done' : 'Pending'}</td>
      <td data-label="Actions">
        <button onclick="toggleTask(${index})">Toggle</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </td>
    `;
    taskList.appendChild(row);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  const date = dateInput.value;

  if (text === '' || date === '') return;

  tasks.push({ text, date, done: false });
  taskInput.value = '';
  dateInput.value = '';
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteAllTasks() {
  tasks = [];
  renderTasks();
}

// Event listener tombol tambah & hapus semua
addBtn.addEventListener('click', addTask);
deleteAllBtn.addEventListener('click', deleteAllTasks);

// Event listener filter status
filterStatus.addEventListener('change', (e) => {
  statusFilter = e.target.value;
  renderTasks();
});

// Event listener filter tanggal (jika input dengan id filter-date ada)
if (filterDate) {
  filterDate.addEventListener('change', (e) => {
    dateFilter = e.target.value;
    renderTasks();
  });
}

// Pertama kali render
renderTasks();
