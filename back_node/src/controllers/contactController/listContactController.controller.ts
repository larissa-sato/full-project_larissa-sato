import { Request, Response } from "express";
import listContactService from "../../services/contactsSetrvices/listContactServices.services";

const listContactController = async (req: Request, res: Response) => {
  const contacts = await listContactService();
  return res.json(contacts);
};

export default listContactController