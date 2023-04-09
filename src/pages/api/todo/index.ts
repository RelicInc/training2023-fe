import Cors from "cors";

import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, Status, Task } from "@prisma/client";

type GetResponseData = {
  tasks: Task[];
};
type PostResponseData = {
  task: Task;
};

// CORS のミドルウェアを初期化
const cors = Cors({
  methods: ["GET", "POST", "PUT", "DELETE"],
});

// 後続の処理を行う前にミドルウェアの実行を待ち、
// また、ミドルウェアでエラーが発生したときエラーを投げるためのヘルパーメソッド
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse<GetResponseData | PostResponseData>,
  fn: any
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponseData | PostResponseData>
) {
  await runMiddleware(req, res, cors);
  if (req.method === "POST" && "value" in req.body) {
    const data = {
      value: req.body.value as string,
      status: "TODO" as Status,
    };
    const task = await prisma.task.create({ data });
    return res.status(200).json({ task });
  }
  const tasks = await prisma.task.findMany();
  const todoTasks = tasks
    .filter((task) => task.status === "TODO")
    .sort((a, b) => -(a.updatedAt.getTime() - b.updatedAt.getTime()));
  const doneTasks = tasks
    .filter((task) => task.status === "DONE")
    .sort((a, b) => -(a.updatedAt.getTime() - b.updatedAt.getTime()));
  res.status(200).json({ tasks: [...todoTasks, ...doneTasks] });
}
