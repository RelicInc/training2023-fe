import { NextPage } from 'next';
import { useState } from 'react';

type Task = {
  id: number;
  value: string;
  status: 'TODO' | 'DONE';
};

const allTaskList: Task[] = [
  {
    id: 1,
    value: '本を読む',
    status: 'TODO',
  },
  /**
  {
    id: 2,
    value: 'メールを送る',
    status: 'TODO',
  },
  {
    id: 3,
    value: '役所に行く',
    status: 'TODO',
  },
   */
];

const Index: NextPage = () => {
  const [todoText, setTodoText] = useState('');

  const onChangeTodoText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.currentTarget.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Task「${todoText}」が追加されました`);
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
          {allTaskList.length > 0 && (
            <li key={allTaskList[0].id} className="task_li">
              <input
                type="checkbox"
                className="check_box"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  console.log(`id: ${allTaskList[0].id}`);
                  console.log(`完了: ${event.target.checked}`);
                }}
              />
              <div className="task_text">{allTaskList[0].value}</div>
              <button
                type="button"
                className="edit_task"
                onClick={() => console.log(`編集：${allTaskList[0].id}`)}
              >
                編集
              </button>
              <button
                type="button"
                className="remove_task"
                onClick={() => console.log(`削除：${allTaskList[0].id}`)}
              >
                削除
              </button>
            </li>
          )}
        </ul>
        {allTaskList.length === 0 && (
          <div className="no_task">予定はないようです。</div>
        )}
      </div>
    </main>
  );
};

export default Index;
