import styles from "@/styles/Home.module.css";

type TaskFormPropsType = {
  onSubmitTask: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleChangeTask: (event: React.ChangeEvent<HTMLInputElement>) => void;
  todoText: string;
  editTaskId: number | undefined;
};

export const TaskForm = ({
  onSubmitTask,
  handleChangeTask,
  todoText,
  editTaskId,
}: TaskFormPropsType) => {
  return (
    <form onSubmit={onSubmitTask} className={styles.form_container}>
      <input
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
      >
        {editTaskId ? "編集" : "作成"}
      </button>
    </form>
  );
};
