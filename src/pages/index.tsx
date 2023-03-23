import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Layout } from "@/components/layout";
import styles from "@/styles/Home.module.css";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { Task } from "@prisma/client";
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

const Index: NextPage = () => {
  const [allTaskList, setAllTask] = useState<Task[]>([]);

  const options: AxiosRequestConfig = {
    url: `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/todo`,
    method: "GET",
  };

  const getAllTasks = async () => {
    await axios(options)
      .then((res: AxiosResponse<{ tasks: Task[] }>) => {
        const { data } = res;
        setAllTask(data.tasks);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.message);
      });
  };

  const onSubmitTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("onSubmit");
  };

  useEffect(() => {
    getAllTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <h1 className={styles.heading}>React研修：TODOアプリ</h1>
      <div className={styles.container}>
        <form onSubmit={onSubmitTask} className={styles.form_container}>
          <input
            className={styles.input}
            type={"text"}
            placeholder={"今日は何をしますか...?"}
            // onChange={handleChange}
            // value={task.task}
          />
          <button type={"submit"} className={styles.submit_btn}>
            編集
          </button>
        </form>
        {allTaskList.map((task) => (
          <div key={task.id} className={styles.task_container}>
            <input
              type={"checkbox"}
              className={styles.check_box}
              // checked={task.completed}
              // onChange={() => updateTask(task._id)}
            />
            <p
              className={
                task.status === "TODO"
                  ? styles.task_text
                  : styles.task_text + " " + styles.line_through
              }
            >
              {task.value}
            </p>
            <button className={styles.edit_task}>
              <FiEdit2 />
            </button>
            <button className={styles.remove_task}>
              <FaRegTrashAlt />
            </button>
          </div>
        ))}
        {allTaskList.length === 0 && (
          <h2 className={styles.no_task}>予定はないようです。</h2>
        )}
      </div>
    </Layout>
  );
};

export default Index;
