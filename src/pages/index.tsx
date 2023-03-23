import { useState, useEffect } from "react";
import { NextPage } from "next";
import { Layout } from "@/components/layout";
import styles from "@/styles/Home.module.css";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Task } from "@prisma/client";
import { FiEdit2 } from "react-icons/fi";
import { FaRegTrashAlt } from "react-icons/fa";

const Index: NextPage = () => {
  const [allTaskList, setAllTaskList] = useState<Task[]>([]);
  const [todoText, setTodoText] = useState("");
  const [editTaskId, setEditTaskId] = useState<number>();

  const getAllTasks = async () => {
    await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/todo`)
      .then((res: AxiosResponse<{ tasks: Task[] }>) => {
        const { data } = res;
        setAllTaskList(data.tasks);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.message);
      });
  };

  const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.currentTarget.value);
    // event.currentTarget.value
  };

  const updateTaskStatus = async (id: number) => {
    //NOTE： スプレッド構文じゃないと反映されない　なぜ？
    const tempAllTaskList = [...allTaskList];
    const updateTaskIndex = tempAllTaskList.findIndex((t) => t.id === id);

    await axios
      .put(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/todo` + "/" + id, {
        status:
          tempAllTaskList[updateTaskIndex].status === "DONE" ? "TODO" : "DONE",
      })
      .then((res: AxiosResponse<{ task: Task }>) => {
        tempAllTaskList[updateTaskIndex] = res.data.task;
        setAllTaskList(tempAllTaskList);
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err.message);
      });
  };

  const onSubmitTask = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editTaskId) {
      const tempAllTaskList = [...allTaskList];
      const updateTaskIndex = tempAllTaskList.findIndex(
        (t) => t.id === editTaskId
      );
      await axios
        .put(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/todo` + "/" + editTaskId,
          {
            value: todoText,
          }
        )
        .then((res: AxiosResponse<{ task: Task }>) => {
          tempAllTaskList[updateTaskIndex] = res.data.task;
          setAllTaskList(tempAllTaskList);
          setTodoText("");
          setEditTaskId(undefined);
        })
        .catch((err: AxiosError<{ error: string }>) => {
          console.log(err.message);
        });
    } else {
      await axios
        .post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/todo`, {
          value: todoText,
        })
        .then((res: AxiosResponse<{ task: Task }>) => {
          setAllTaskList([...allTaskList, res.data.task]);
          setTodoText("");
        })
        .catch((err: AxiosError<{ error: string }>) => {
          console.log(err.message);
        });
    }
  };

  const onClickEditButton = (editTask: Task) => {
    setTodoText(editTask.value);
    setEditTaskId(editTask.id);
  };
  const onClickDeleteButton = async (id: number) => {
    await axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/todo` + "/" + id)
      .then(() => {
        setAllTaskList((prev) => prev.filter((task) => task.id !== id));
      })
      .catch((err: AxiosError<{ error: string }>) => {
        console.log(err);
      });
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
      </div>
    </Layout>
  );
};

export default Index;
