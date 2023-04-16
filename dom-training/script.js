/**
 *  step2 要素を取得しよう
 *  esaのコードをコピペしてください
 */
const form = document.getElementById("todo-form");

/**
 *  step2 要素を取得しよう
 *  1. id="app-title"の要素を取得してください
 *  2. 1で取得した要素に対して、`textContent プロパティ`を使用してテキストを好きに変更してみてください
 */
const appTitle = document.getElementById("app-title");
appTitle.textContent = "DOMの研修中です。";

/**
 * step3 GETリクエストでDBからデータを取得しよう
 * http://localhost:3002/api/todoを叩きデータを取得してください
 */
async function getInitialTasks() {
  // GET APIを叩き取得したdataを返却する処理
  try {
    const { data } = await axios.get(`http://localhost:3002/api/todo`);
    console.log(data);
    return data.tasks;
  } catch (err) {
    console.error(err);
  }
}
getInitialTasks();

/**
 * getInitialTasksを実行し、取得したTODO要素ををDOMに追加する
 */

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
  button.classList.add("edit_task");
  button.addEventListener("click", function () {
    onClickEditButton(taskId, taskName);
    button.type = "button";
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
