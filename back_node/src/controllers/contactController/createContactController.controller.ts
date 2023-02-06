import { Request, Response } from "express";
import { IContactRequest } from "../../interfaces/contacts";
import createContactService from "../../services/contactsSetrvices/createContactServices.services";

const createContactController = async (req: Request, res: Response) => {
  const contact: IContactRequest = req.body;
  const createdContact = await createContactService(contact);
  return res.status(201).json(createdContact);
};

export default createContactController