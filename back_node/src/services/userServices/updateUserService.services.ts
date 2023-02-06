import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entities";
import { IUserUpdate } from "../../interfaces/users";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appError";

const updateUserService = async (
  { name, email, password }: IUserUpdate,
  id: string
): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id,
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  await userRepository.update(id, {
    name: name ? name : findUser.name,
    email: email ? email : findUser.email,
    password: password ? await hash(password, 10) : findUser.password,
  });

  const newData = await userRepository.findOneBy({
    id,
  });

  return newData!;
};

export default updateUserService;