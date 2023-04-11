import { NextPage } from 'next';
import { Layout } from '@/components/layout';
import { TaskForm, TaskContents } from '@/components/task';
import styles from '@/styles/Home.module.css';
import { useFormTask } from '@/hooks/form';
import { useEffect, useState } from 'react';
import { Task } from '@prisma/client';

const Index: NextPage = () => {
  const [allTaskList, setAllTaskList] = useState<Task[]>([]);
  const [todoText, setTodoText] = useState('');
  const { handleChangeTask, onSubmitPostTask, getAllTasks } = useFormTask();

  const initializeTaskList = async () => {
    const data = await getAllTasks();
    if (data) {
      setAllTaskList(data.tasks);
    }
  };

  useEffect(() => {
    initializeTaskList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <h1 className={styles.heading}>React研修：TODOアプリ</h1>
      <div className={styles.container}>
        <TaskForm
          onSubmitPostTask={onSubmitPostTask}
          handleChangeTask={handleChangeTask}
          todoText={todoText}
        />
        <TaskContents allTaskList={allTaskList} />
      </div>
    </Layout>
  );
};

export default Index;
