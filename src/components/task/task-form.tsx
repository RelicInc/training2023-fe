import { Dispatch, SetStateAction } from "react";
import { Task } from "@prisma/client";
import { useFormTask } from "@/hooks/form";
import styles from "@/styles/Home.module.css";

type TaskFormPropsType = {
  allTaskList: Task[];
  setAllTaskList: Dispatch<SetStateAction<Task[]>>;
};

export const TaskForm = ({
  allTaskList,
  setAllTaskList,
}: TaskFormPropsType) => {
  const { todoText, handleChangeTask, onSubmitPostTask } = useFormTask({
    allTaskList,
    setAllTaskList,
  });
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
