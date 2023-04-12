import { useState, Dispatch, SetStateAction } from "react";
import { Task } from "@prisma/client";
import { postTask } from "@/utils";
import styles from "@/styles/Home.module.css";

type TaskFormPropsType = {
  allTaskList: Task[];
  setAllTaskList: Dispatch<SetStateAction<Task[]>>;
};

export const TaskForm = ({
  allTaskList,
  setAllTaskList,
}: TaskFormPropsType) => {
  const [todoText, setTodoText] = useState("");

  const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.currentTarget.value);
  };

  const onSubmitPostTask = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const data = await postTask(todoText);
    if (data) {
      setAllTaskList([data.task, ...allTaskList]);
      setTodoText("");
    }
  };

  return (
    <form className={styles.form_container}>
      <input
        id={"task-input-area"}
        className={styles.input}
        type={"text"}
        placeholder={"今日は何をしますか...?"}
        onChange={(e) => handleChangeTask(e)}
        value={todoText}
      />
      <button
        type={"submit"}
        disabled={todoText ? false : true}
        className={styles.submit_btn}
        onClick={(e) => {
          onSubmitPostTask(e);
        }}
      >
        作成
      </button>
    </form>
  );
};
