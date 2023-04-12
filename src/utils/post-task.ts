import axios, { AxiosResponse, isAxiosError } from "axios";
import { Task } from "@prisma/client";

export const postTask = async (todoText: string) => {
  try {
    const { data }: AxiosResponse<{ task: Task }> = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/todo`,
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
