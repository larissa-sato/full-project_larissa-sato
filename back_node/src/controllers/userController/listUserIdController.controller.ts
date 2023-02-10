import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { listUserIdService } from "../../services/userServices/listUserIdService.services";

const listUserIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = await listUserIdService(id);
  return res.json(instanceToPlain(userId));
};

export default listUserIdController;