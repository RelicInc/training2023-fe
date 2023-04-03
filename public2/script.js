const form = document.getElementById('todo-form');
const registerField = document.getElementById('todo-register-field');
const submitButton = document.getElementById('submit-button');
const taskList = document.getElementById('task-list');
const emptyPlaceholder = document.getElementById('empty-placeholder');

form.addEventListener('submit', onSubmitPostTask);
registerField.addEventListener('input', switchSubmitButtonDisability);
getInitialTasks().then(function (data) {
  console.log('initialize', data);
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
    event.target.elements.task_input_area.value = '';
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
  submitButton.disabled = event.target.value === '';
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
  const taskRowContainer = document.createElement('div');
  const checkbox = createTaskCheckbox(taskId, taskName);
  const editButton = createEditButton(taskId, taskName);
  const deleteButton = createDeleteButton(taskId);
  taskRowContainer.append(checkbox, editButton, deleteButton);
  return taskRowContainer;
}

/**
 * createTaskRow()で呼び出される関数群
 */

function createTaskCheckbox(taskId, taskName) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('styles.check_box');
  checkbox.addEventListener('change', function () {
    updateTaskStatus(taskId);
  });

  const label = document.createElement('label');
  label.innerHTML = `
      <div className="styles.task_text">${taskName}</div>
  `;
  label.prepend(checkbox);
  return label;
}

function createEditButton(taskId, taskName) {
  const button = document.createElement('button');
  button.innerText = '編集';
  button.type = 'button';
  button.classList.add('styles.edit_task');
  button.addEventListener('click', function () {
    onClickEditButton(taskId, taskName);
  });
  return button;
}

function createDeleteButton(taskId) {
  const button = document.createElement('button');
  button.innerText = '削除';
  button.type = 'button';
  button.classList.add('styles.remove_task');
  button.addEventListener('click', function () {
    onClickDeleteButton(taskId);
  });
  return button;
}

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
