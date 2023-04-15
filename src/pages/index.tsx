import { NextPage } from 'next';
import { useState } from 'react';

type Task = {
  id: number;
  value: string;
  status: 'TODO' | 'DONE';
};

const Index: NextPage = () => {
  const [allTaskList, setAllTaskList] = useState<Task[]>([]);
  const [todoText, setTodoText] = useState('');

  const onChangeTodoText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.currentTarget.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTask: Task = {
      id: (allTaskList[0]?.id ?? 0) + 1,
      value: todoText,
      status: 'TODO',
    };
    setAllTaskList([newTask, ...allTaskList]);
    setTodoText('');
  };

  return (
    <main className="main">
      <h1 className="heading">React研修：TODOアプリ</h1>
      <div className="container">
        <form className="form_container" onSubmit={onSubmit}>
          <input
            id="task-input-area"
            className="input"
            type="text"
            placeholder="今日は何をしますか...?"
            value={todoText}
            onChange={onChangeTodoText}
          />
          <button type="submit" className="submit_btn" disabled={!todoText}>
            作成
          </button>
        </form>
        <ul className="task_ui">
          {allTaskList.map((task) => (
            <li key={task.id} className="task_li">
              <input
                type="checkbox"
                className="check_box"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  console.log(`id: ${task.id}`);
                  console.log(`完了: ${event.target.checked}`);
                }}
              />
              <div className="task_text">{task.value}</div>
              <button
                type="button"
                className="edit_task"
                onClick={() => console.log(`編集：${task.id}`)}
              >
                編集
              </button>
              <button
                type="button"
                className="remove_task"
                onClick={() => console.log(`削除：${task.id}`)}
              >
                削除
              </button>
            </li>
          ))}
        </ul>
        {allTaskList.length === 0 && (
          <div className="no_task">予定はないようです。</div>
        )}
      </div>
    </main>
  );
};

export default Index;
