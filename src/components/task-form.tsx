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

  const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.currentTarget.value);
  };

  const onSubmitcreateTask = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const data = await createTask(todoText);
    if (data) {
      setAllTaskList([data.task, ...allTaskList]);
      setTodoText('');
    }
  };

  return (
    <form className="form_container">
      <input
        id="task-input-area"
        className="input"
        type="text"
        placeholder="今日は何をしますか...?"
        value={todoText}
        onChange={(e) => handleChangeTask(e)}
      />
      <button
        type="submit"
        className="submit_btn"
        disabled={!todoText}
        onClick={(e) => {
          onSubmitcreateTask(e);
        }}
      >
        作成
      </button>
    </form>
  );
};
