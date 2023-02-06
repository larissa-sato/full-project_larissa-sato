import { IUserRequest } from "../../interfaces/users";
import AppDataSource from "../../data-source";
import { User } from "../../entities/user.entities";
import { hash } from "bcrypt";
import { AppError } from "../../errors/appError";

const createUserService = async ({
  name,
  email,
  password,
  isAdm,
}: IUserRequest): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const emailExists = await userRepository.findOneBy({
    email,
  });

  if (emailExists) {
    throw new AppError("Invalid user or password", 400);
  }

  if (!password) {
    throw new AppError("Password required", 400);
  }

  const hashedPassword = await hash(password, 10);

  const user = userRepository.create({
    name,
    email,
    password: hashedPassword,
    isAdm,
  });

  await userRepository.save(user);

  return user;
};

export default createUserService;