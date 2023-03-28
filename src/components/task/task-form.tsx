import styles from "@/styles/Home.module.css";

type TaskFormPropsType = {
  onSubmitPostTask: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => Promise<void>;
  onSubmitEditTask: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => Promise<void>;
  handleChangeTask: (event: React.ChangeEvent<HTMLInputElement>) => void;
  todoText: string;
  editTaskId: number | undefined;
};

export const TaskForm = ({
  onSubmitPostTask,
  onSubmitEditTask,
  handleChangeTask,
  todoText,
  editTaskId,
}: TaskFormPropsType) => {
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
          editTaskId ? onSubmitEditTask(e) : onSubmitPostTask(e);
        }}
      >
        {editTaskId ? "編集" : "作成"}
      </button>
    </form>
  );
};
