import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entities";
import { AppError } from "../../errors/appError";

const deleteUserService = async (id: string): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const deleteUser = await userRepository.findOneBy({
    id,
  });

  if (!deleteUser) {
    throw new AppError("User not found", 404);
  }

  if (deleteUser.isActive === false) {
    throw new AppError("User not active", 400);
  }

  await userRepository.update(id, {
    isActive: false,
  });

  const newStatus = await userRepository.findOneBy({
    id,
  });

  return newStatus!;
};

export default deleteUserService;