import { Task } from '@prisma/client';

type TaskListItemPropsType = {
  task: Task;
};

const TaskListItem = ({ task }: TaskListItemPropsType) => {
  return (
    <li className="task_li">
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
  );
};

type TaskListPropsType = {
  allTaskList: Task[];
};

export const TaskList = ({ allTaskList }: TaskListPropsType) => {
  return (
    <ul className="task_ui">
      {allTaskList.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </ul>
  );
};
