// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Status, Task } from '@prisma/client';

type GetResponseData = {
  tasks: Task[];
};
type PostResponseData = {
  task: Task;
};
const prisma = new PrismaClient();
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponseData | PostResponseData>
) {
  if (req.method === 'POST' && 'value' in req.body) {
    const data = {
      value: req.body.value as string,
      status: 'TODO' as Status,
    };
    const task = await prisma.task.create({ data });
    return res.status(200).json({ task });
  }
  const tasks = await prisma.task.findMany();
  res.status(200).json({ tasks });
}
