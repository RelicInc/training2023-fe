import { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Task } from "@prisma/client";

export const useFormTask = () => {
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
          setAllTaskList([res.data.task, ...allTaskList]);
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

  return {
    allTaskList,
    todoText,
    editTaskId,
    handleChangeTask,
    updateTaskStatus,
    onSubmitTask,
    onClickEditButton,
    onClickDeleteButton,
  };
};
