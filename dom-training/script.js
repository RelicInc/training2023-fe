const form = document.getElementById("todo-form");
const registerField = document.getElementById("todo-register-field");
const submitButton = document.getElementById("submit-button");
const taskList = document.getElementById("task-list");
const emptyPlaceholder = document.getElementById("empty-placeholder");

form.addEventListener("submit", onSubmitPostTask);
registerField.addEventListener("input", switchSubmitButtonDisability);
getInitialTasks().then(function (data) {
  data.reverse().forEach(function (task) {
    addNewTask(task.id, task.value);
  });
});

/**
 * formに設定するSubmitイベント
 */
async function onSubmitPostTask(event) {
  event.preventDefault();
  const taskName = event.target.elements.task_input_area.value;

  try {
    const { data } = await axios.post(`http://localhost:3002/api/todo`, {
      value: taskName,
    });
    addNewTask(data.task.id, data.task.value);
    event.target.elements.task_input_area.value = "";
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err.message);
    }
    console.error(err);
  }
}

/**
 * タスク名の入力フィールドに設定するInputイベント（ReactのonChangeに対応）
 * 送信ボタンのdisabledのつけ外しをする
 */
function switchSubmitButtonDisability(event) {
  submitButton.disabled = event.target.value === "";
}

/**
 * onSubmitPostTask()で呼び出される関数
 */

function addNewTask(taskId, taskName) {
  const newTask = createTaskRow(taskId, taskName);
  taskList.appendChild(newTask);
  if (emptyPlaceholder) {
    emptyPlaceholder.remove();
  }
}

function createTaskRow(taskId, taskName) {
  const taskListItem = document.createElement("li");
  taskListItem.setAttribute("id", taskId);
  taskListItem.classList.add("task_li");
  const checkbox = createTaskCheckbox(taskId);
  const taskText = cerateTaskText(taskName);
  const editButton = createEditButton(taskId, taskName);
  const deleteButton = createDeleteButton(taskId);
  taskListItem.append(checkbox, taskText, editButton, deleteButton);
  return taskListItem;
}

/**
 * createTaskRow()で呼び出される関数群
 */

// function createTaskCheckbox(taskId, taskName) {
function createTaskCheckbox(taskId) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("check_box");
  checkbox.addEventListener("change", function () {
    updateTaskStatus(taskId);
  });

  // const label = document.createElement("label");
  // const todoText = document.createElement("p");

  // todoText.innerHTML = `
  //     <div className="task_text">${taskName}</div>
  // `;
  // label.prepend(checkbox);
  return checkbox;
}
function cerateTaskText(taskName) {
  const taskText = document.createElement("p");
  taskText.classList.add("task_text");
  taskText.textContent = taskName;
  return taskText;
}

function createEditButton(taskId, taskName) {
  const button = document.createElement("button");
  button.innerText = "編集";
  button.type = "button";
  button.classList.add("edit_task");
  button.addEventListener("click", function () {
    onClickEditButton(taskId, taskName);
  });
  return button;
}

function createDeleteButton(taskId) {
  const button = document.createElement("button");
  button.innerText = "削除";
  button.type = "button";
  button.classList.add("remove_task");
  button.addEventListener("click", function () {
    onClickDeleteButton(taskId);
  });
  return button;
}

//NOTE: 全権取得
async function getInitialTasks() {
  try {
    const { data } = await axios.get(`http://localhost:3002/api/todo`);
    return data.tasks;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(err.message);
    }
    console.error(err);
  }
}

//NOTE: 削除
async function onClickDeleteButton(taskId) {
  const deleteTask = document.getElementById(taskId);
  try {
    await axios.delete(`http://localhost:3002/api/todo/${taskId}`);
    deleteTask.remove();
  } catch (err) {
    console.error(err);
  }
}
