import { NextPage } from "next";
import { Layout } from "@/components/layout";
import { TaskForm, TaskContents } from "@/components/task";
import styles from "@/styles/Home.module.css";
import { useFormTask } from "@/hooks/form";

const Index: NextPage = () => {
  const {
    allTaskList,
    todoText,
    editTaskId,
    handleChangeTask,
    updateTaskStatus,
    onSubmitTask,
    onClickEditButton,
    onClickDeleteButton,
  } = useFormTask();

  return (
    <Layout>
      <h1 className={styles.heading}>React研修：TODOアプリ</h1>
      <div className={styles.container}>
        <TaskForm
          onSubmitTask={onSubmitTask}
          handleChangeTask={handleChangeTask}
          todoText={todoText}
          editTaskId={editTaskId}
        />
        <TaskContents
          allTaskList={allTaskList}
          updateTaskStatus={updateTaskStatus}
          onClickEditButton={onClickEditButton}
          onClickDeleteButton={onClickDeleteButton}
        />
      </div>
    </Layout>
  );
};

export default Index;
