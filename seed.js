import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const tasks = [
  {
    value: "DOMの研修",
    status: "TODO",
  },
  {
    value: "Reactの研修",
    status: "TODO",
  },
];

const main = async () => {
  for (const task of tasks) {
    await prisma.task.create({
      data: task,
    });
  }
};

main()
  .catch((e) => {
    console.error(e);

    process.exit(1);
  })

  .finally(async () => {
    await prisma.$disconnect();
  });
