// --- GETリクエストでデータを取得し、画面にTODOを表示する ---

/**
 *  step2 要素を取得しよう
 *  esaのコードをコピペしてください
 */

/**
 *  step2 要素を取得しよう
 *  1. id="app-title"の要素を取得してください
 */

/**
 *  step2 要素を取得しよう
 *  2. 1で取得した要素に対して、`textContent プロパティ`を使用してテキストを好きに変更してみてください
 */

/**
 *  step3 GETリクエストでDBからデータを取得しよう
 *  http://localhost:3002/api/todoを叩きデータを取得してください
 */
async function getInitialTasks() {
  // GET APIを叩き取得したdataを返却する処理
  console.log("step:3 API叩きたい");
}

/**
 *  step4 取得したデータを画面に表示してみよう
 *  1. id = "task-list"の要素 (取得したTODOを追加する要素) を getElementId で取得してみましょう
 */

/**
 *  step4 取得したデータを画面に表示してみよう
 *  2. 画像のようにTODOを表示してみましょう
 */
// getInitialTasks().then(function (data) {
//   // 取得したTODOのdataを画面に表示する処理を実行
//   console.log("取得したTODOのdataを画面に表示する処理を実行");
// });

// ---

// --- POSTリクエストでTODOを作成する ---

/**
 * step2.「作成」ボタンに submitイベント を割り当てよう
 */

/**
 * step3. onSubmitPostTask関数内でPOSTリクエストを実行しTODOを作成しよう
 */
async function onSubmitPostTask(event) {
  event.preventDefault();
  console.log("送信しました。");
}
// ----

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
    // checkboxを押した時の処理
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
  button.type = "button";
  button.addEventListener("click", function () {
    // onClickEditButton(taskId, taskName);
  });
  return button;
}

function createDeleteButton(taskId) {
  const button = document.createElement("button");
  button.innerText = "削除";
  button.type = "button";
  button.classList.add("remove_task");
  button.addEventListener("click", function () {
    // onClickDeleteButton(taskId);
  });
  return button;
}

// inputに値が入るとdisable解除
const registerField = document.getElementById("todo-register-field");
const submitButton = document.getElementById("submit-button");
registerField.addEventListener("input", switchSubmitButtonDisability);
function switchSubmitButtonDisability(event) {
  submitButton.disabled = event.target.value === "";
}
