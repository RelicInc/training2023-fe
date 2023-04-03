import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Task } from '@prisma/client';

type GetResponseData = {
  task: Task | null;
};
type PutResponseData = {
  task: Task;
};
type DeleteResponseData = {
  task: Task;
};
type ErrorResponse = {
  message: string;
};

type Method = 'GET' | 'PUT' | 'DELETE';
const prisma = new PrismaClient();
// CORS のミドルウェアを初期化
const cors = Cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// 後続の処理を行う前にミドルウェアの実行を待ち、
// また、ミドルウェアでエラーが発生したときエラーを投げるためのヘルパーメソッド
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse<
    GetResponseData | PutResponseData | DeleteResponseData | ErrorResponse
  >,
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    GetResponseData | PutResponseData | DeleteResponseData | ErrorResponse
  >
) {
  await runMiddleware(req, res, cors);
  const {
    query: { id },
    method,
  } = req;
  if (typeof id !== 'string') return;
  const task = await prisma.task.findFirst({ where: { id: +id } });
  if (!task) return res.status(404).json({ message: 'Not Found' });
  switch (method as Method) {
    case 'GET': {
      return res.status(200).json({ task });
    }
    case 'PUT': {
      const task = await prisma.task.update({
        where: { id: +id },
        data: req.body,
      });
      return res.status(200).json({ task });
    }
    case 'DELETE': {
      const task = await prisma.task.delete({ where: { id: +id } });
      return res.status(200).json({ task });
    }
  }
}
