const taskList = document.getElementById("task-list");
const emptyPlaceholder = document.getElementById("empty-placeholder");

/**
 * ul要素に取得したTODOを追加する
 */
function addNewTask(taskId, taskName) {
  const newTask = createTaskRow(taskId, taskName);
  taskList.appendChild(newTask);
  if (emptyPlaceholder) {
    emptyPlaceholder.remove();
  }
}

/**
 * TODO要素を作成する関数
 */
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
function createTaskCheckbox(taskId) {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("check_box");
  checkbox.addEventListener("change", function () {
    updateTaskStatus(taskId);
  });
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

/**
 * 全てのTODOを取得
 */
async function getInitialTasks() {
  // GET APIを叩き取得したdataを返却する処理
}

/**
 * getInitialTasksを実行し、取得したTODO要素ををDOMに追加する
 */
