import { useState, Dispatch, SetStateAction } from 'react';
import { Task } from '@prisma/client';
import { createTask } from '@/utils/create-task';

type TaskFormPropsType = {
  allTaskList: Task[];
  setAllTaskList: Dispatch<SetStateAction<Task[]>>;
};

export const TaskForm = ({
  allTaskList,
  setAllTaskList,
}: TaskFormPropsType) => {
  const [todoText, setTodoText] = useState('');

  const onChangeTodoText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.currentTarget.value);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await createTask(todoText);
    if (data) {
      setAllTaskList([data.task, ...allTaskList]);
      setTodoText('');
    }
  };

  return (
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
  );
};
