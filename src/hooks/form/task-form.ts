import { useState, Dispatch, SetStateAction } from "react";
import axios, { AxiosResponse, isAxiosError } from "axios";
import { Task } from "@prisma/client";

type UseFormTaskPropsType = {
  allTaskList: Task[];
  setAllTaskList: Dispatch<SetStateAction<Task[]>>;
};

export const useFormTask = ({
  allTaskList,
  setAllTaskList,
}: UseFormTaskPropsType) => {
  const [todoText, setTodoText] = useState("");
  const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(event.currentTarget.value);
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

  return {
    todoText,
    handleChangeTask,
    onSubmitPostTask,
  };
};
