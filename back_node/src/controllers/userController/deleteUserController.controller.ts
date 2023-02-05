import { Request, Response } from "express";
import { User } from "../../entities/user.entities";
import deleteUserService from "../../services/userServices/deleteUserService.services";

const deleteUserController = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const userStatus = await deleteUserService(id);
  
    if (userStatus instanceof User) {
      return res.status(204).json(userStatus);
    }
    return res.status(userStatus[1] as number).json({
      message: userStatus[0],
    });
  };

  export default deleteUserController