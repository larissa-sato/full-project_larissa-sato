import AppDataSource from "../../data-source";
import { Contacts } from "../../entities/contacts.entities";
import { AppError } from "../../errors/appError";
import { IContactRequest } from "../../interfaces/contacts";

const createContactService = async ({
    name,
    email,
    contact
  }: IContactRequest): Promise<Contacts> => {
    const contactRepository = AppDataSource.getRepository(Contacts);
  
    const findContact = await contactRepository.findOneBy({
      email,
    });
  
    if (findContact) {
      throw new AppError("Contact already exists", 409);
    }
  
    if (contact.length !== 11) {
      throw new AppError("Must have eleven digits! ", 400);
    }
  
    const newContact = contactRepository.create({
        name,
        email,
        contact
    });
  
    await contactRepository.save(newContact);
  
    return newContact;
  };

  export default createContactService