import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entities";
import { AppError } from "../../errors/appError";

export const listUserIdService = async (id: string): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: { id },
    relations: { clients: true },
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  return findUser;
};