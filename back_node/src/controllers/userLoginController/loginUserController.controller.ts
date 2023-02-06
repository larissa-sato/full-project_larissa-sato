import { Request, Response } from "express";
import { IUserLogin } from "../../interfaces/users";
import loginUserService from "../../services/loginServices/loginUserServices.services";

export const userLoginController = async (req: Request, res: Response) => {
  const login: IUserLogin = req.body;
  const token = await loginUserService(login);
  return res.json({ token });
};