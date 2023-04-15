import axios, { AxiosResponse, isAxiosError } from 'axios';
import { Task } from '@prisma/client';

export const createTask = async (todoText: string) => {
  try {
    const { data }: AxiosResponse<{ task: Task }> = await axios.post(
      'http://localhost:3002/api/todo',
      {
        value: todoText,
      }
    );
    return data;
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(err.message);
    }
  }
};
