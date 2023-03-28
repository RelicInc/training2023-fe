import styles from "@/styles/Home.module.css";
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { Task } from "@prisma/client";

type TaskContentsPropsType = {
  allTaskList: Task[];
  updateTaskStatus: (id: number) => Promise<void>;
  onClickEditButton: (editTask: Task) => void;
  onClickDeleteButton: (id: number) => Promise<void>;
};

export const TaskContents = ({
  allTaskList,
  updateTaskStatus,
  onClickEditButton,
  onClickDeleteButton,
}: TaskContentsPropsType) => {
  return (
    <>
      {allTaskList.map((task) => (
        <div
          key={task.id}
          className={
            task.status === "DONE"
              ? styles.task_container + " " + styles.done_task_container
              : styles.task_container
          }
        >
          <input
            type={"checkbox"}
            className={styles.check_box}
            checked={task.status === "DONE" ? true : false}
            onChange={() => updateTaskStatus(task.id)}
          />
          <p
            className={
              task.status === "DONE"
                ? styles.task_text + " " + styles.line_through
                : styles.task_text
            }
          >
            {task.value}
          </p>
          <button
            className={styles.edit_task}
            onClick={() => onClickEditButton(task)}
          >
            <FiEdit2 />
          </button>
          <button
            className={styles.remove_task}
            onClick={() => onClickDeleteButton(task.id)}
          >
            <FaRegTrashAlt />
          </button>
        </div>
      ))}
      {allTaskList.length === 0 && (
        <h2 className={styles.no_task}>予定はないようです。</h2>
      )}
    </>
  );
};
