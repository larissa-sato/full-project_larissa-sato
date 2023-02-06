import { Request, Response } from "express";
import {IUserUpdate } from "../../interfaces/users";
import { instanceToPlain } from "class-transformer";
import updateUserService from "../../services/userServices/updateUserService.services";

const updateUserController = async (req: Request, res: Response) => {
    const user: IUserUpdate = req.body;
    const id: string = req.params.id;
    const updatedUser = await updateUserService(user, id);
    return res.json(instanceToPlain(updatedUser));
  };

  export default updateUserController