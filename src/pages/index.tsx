import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { getAllTasks } from '@/utils/get-all-tasks';
import { Task } from '@prisma/client';
import { Layout } from '@/components/layout';
import { TaskForm } from '@/components/task-form';
import { TaskList } from '@/components/task-list';

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Layout>
      <TaskForm allTaskList={allTaskList} setAllTaskList={setAllTaskList} />
      <TaskList allTaskList={allTaskList} />
      {allTaskList.length === 0 && (
        <div className="no_task">予定はないようです。</div>
      )}
    </Layout>
  );
};

export default Index;
