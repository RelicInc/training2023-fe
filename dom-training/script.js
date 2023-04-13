const form = document.getElementById("todo-form");
const registerField = document.getElementById("todo-register-field");
const submitButton = document.getElementById("submit-button");
const taskList = document.getElementById("task-list");
const emptyPlaceholder = document.getElementById("empty-placeholder");

// submitイベント時に処理を実行する関数を割り当てる
form.addEventListener("submit", onSubmitPostTask);

registerField.addEventListener("input", switchSubmitButtonDisability);

getInitialTasks().then(function (data) {
  // 取得したTODOのdataを画面に表示する処理を実行
  data.reverse().forEach(function (task) {
    addNewTask(task.id, task.value);
  });
});

/**
 * [練習]formに設定するSubmitイベントの作成
 */
function onSubmitPostTask(event) {
  event.preventDefault();
  console.log("テスト： TODOを作成");
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
