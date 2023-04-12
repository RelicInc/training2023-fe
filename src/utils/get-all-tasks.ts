import axios, { AxiosResponse, isAxiosError } from "axios";
import { Task } from "@prisma/client";

export const getAllTasks = async () => {
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
