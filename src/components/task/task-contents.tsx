import { Task } from '@prisma/client';

type TaskContentsPropsType = {
  allTaskList: Task[];
};

export const TaskContents = ({ allTaskList }: TaskContentsPropsType) => {
  return (
    <>
      <ul className="task_ui">
        {allTaskList.map((task) => (
          <li key={task.id} className="task_li">
            <input
              type={'checkbox'}
              className="check_box"
              onChange={() => console.log('UPDATE!')}
            />
            <div className="task_text">{task.value}</div>
            <button type="button" className="edit_task">
              編集
            </button>
            <button type="button" className="remove_task">
              削除
            </button>
          </li>
        ))}
      </ul>
      {allTaskList.length === 0 && (
        <h2 className="no_task">予定はないようです。</h2>
      )}
    </>
  );
};
