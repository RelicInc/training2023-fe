// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    GetResponseData | PutResponseData | DeleteResponseData | ErrorResponse
  >
) {
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
