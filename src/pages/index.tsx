import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout';
import { TaskForm, TaskContents } from '@/components/task';
import { getAllTasks } from '@/utils';
import { Task } from '@prisma/client';

const Index: NextPage = () => {
  const [allTaskList, setAllTaskList] = useState<Task[]>([]);

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
      <h1 className="heading">React研修：TODOアプリ</h1>
      <div className="container">
        <TaskForm allTaskList={allTaskList} setAllTaskList={setAllTaskList} />
        <TaskContents allTaskList={allTaskList} />
      </div>
    </Layout>
  );
};

export default Index;
