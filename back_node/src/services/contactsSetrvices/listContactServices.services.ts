import AppDataSource from "../../data-source";
import { Contacts } from "../../entities/contacts.entities";

const listContactService = async (): Promise<Contacts[]> => {
  const contactRepository = AppDataSource.getRepository(Contacts);
  const contact = await contactRepository.find();
  return contact;
};

export default listContactService;