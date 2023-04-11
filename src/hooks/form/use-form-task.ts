import { useState, useEffect } from 'react';
import axios, { AxiosResponse, isAxiosError } from 'axios';
import { Task } from '@prisma/client';

export const useFormTask = () => {
  const getAllTasks = async () => {
    try {
      const { data }: AxiosResponse<{ tasks: Task[] }> = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/todo`
      );
      return data;
    } catch (err) {
      if (isAxiosError(err)) {
        console.error(err.message);
      }
    }
  };

  const handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    //setTodoText(event.currentTarget.value);
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
      // setAllTaskList([data.task, ...allTaskList]);
      // setTodoText('');
    } catch (err) {
      if (isAxiosError(err)) {
        console.error(err.message);
      }
    }
  };

  return {
    handleChangeTask,
    onSubmitPostTask,
    getAllTasks,
  };
};
