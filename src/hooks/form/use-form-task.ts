import { useState, useEffect } from "react";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { Task } from "@prisma/client";

export const useFormTask = () => {
  const [allTaskList, setAllTaskList] = useState<Task[]>([]);
  const [todoText, setTodoText] = useState("");
  const [editTaskId, setEditTaskId] = useState<number>();

  const getAllTasks = async () => {
    try {
      const { data }: AxiosResponse<{ tasks: Task[] }> = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/todo`
      );
      setAllTaskList(data.tasks);
    } catch (err) {
      if (isAxiosError(err)) {
        console.error(err.message);
      }
    }
  };

  const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.currentTarget.value);
  };

  const updateTaskStatus = async (id: number) => {
    //NOTE： スプレッド構文じゃないと反映されない　なぜ？
    const tempAllTaskList = [...allTaskList];
    const updateTaskIndex = tempAllTaskList.findIndex((t) => t.id === id);

    try {
      const { data }: AxiosResponse<{ task: Task }> = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/todo` + "/" + id,
        {
          status:
            tempAllTaskList[updateTaskIndex].status === "DONE"
              ? "TODO"
              : "DONE",
        }
      );
      tempAllTaskList[updateTaskIndex] = data.task;
      setAllTaskList(tempAllTaskList);
    } catch (err) {
      if (isAxiosError(err)) {
        console.error(err.message);
      }
    }
  };

  const onSubmitEditTask = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const tempAllTaskList = [...allTaskList];
    const updateTaskIndex = tempAllTaskList.findIndex(
      (t) => t.id === editTaskId
    );
    try {
      const { data }: AxiosResponse<{ task: Task }> = await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/todo` + "/" + editTaskId,
        {
          value: todoText,
        }
      );
      tempAllTaskList[updateTaskIndex] = data.task;
      setAllTaskList(tempAllTaskList);
      setTodoText("");
      setEditTaskId(undefined);
    } catch (err) {
      if (isAxiosError(err)) {
        console.error(err.message);
      }
    }
  };

  const onSubmitPostTask = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    try {
      const { data }: AxiosResponse<{ task: Task }> = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/todo`,
        {
          value: todoText,
        }
      );
      setAllTaskList([data.task, ...allTaskList]);
      setTodoText("");
    } catch (err) {
      if (isAxiosError(err)) {
        console.error(err.message);
      }
    }
  };

  const onClickEditButton = (editTask: Task) => {
    document.getElementById("task-input-area")?.focus();
    setTodoText(editTask.value);
    setEditTaskId(editTask.id);
  };

  const onClickDeleteButton = async (id: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/todo` + "/" + id
      );
      setAllTaskList((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      if (isAxiosError(err)) {
        console.error(err.message);
      }
    }
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
    onSubmitPostTask,
    onSubmitEditTask,
    onClickEditButton,
    onClickDeleteButton,
  };
};
