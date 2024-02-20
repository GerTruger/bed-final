import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsernameAndPassword = async (username, password) => {
  try {
    const user = await prisma.user.findFirst({
      where: { username, password },
    });

    return user;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default getUsernameAndPassword;