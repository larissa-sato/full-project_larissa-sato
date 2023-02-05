import { Request, Response } from "express";
import { Contacts } from "../../entities/contacts.entities";
import deleteContactService from "../../services/contactsSetrvices/deleteContactServices.services";

const deleteContactController = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const contactStatus = await deleteContactService(id);
  
    if (contactStatus instanceof Contacts) {
      return res.status(204).json(contactStatus);
    }
    return res.status(contactStatus[1] as number).json({
      message: contactStatus[0],
    });
  };

  export default deleteContactController