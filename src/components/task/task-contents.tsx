import styles from "@/styles/Home.module.css";
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";
import { Task } from "@prisma/client";

type TaskContentsPropsType = {
  allTaskList: Task[];
};

export const TaskContents = ({ allTaskList }: TaskContentsPropsType) => {
  return (
    <>
      {allTaskList.map((task) => (
        <div key={task.id} className={styles.task_container}>
          <input
            type={"checkbox"}
            className={styles.check_box}
            onChange={() => console.log("UPDATE!")}
          />
          <p className={styles.task_text}>{task.value}</p>
          <button type="button" className={styles.edit_task}>
            <FiEdit2 />
          </button>
          <button type="button" className={styles.remove_task}>
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
