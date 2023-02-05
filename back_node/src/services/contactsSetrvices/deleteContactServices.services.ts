import AppDataSource from "../../data-source";
import { Contacts } from "../../entities/contacts.entities";
import { AppError } from "../../errors/appError";

const deleteContactService = async (id: string): Promise<Contacts> => {
  const contactsRepository = AppDataSource.getRepository(Contacts);

  const deleteContact = await contactsRepository.findOneBy({
    id,
  });

  if (!deleteContact) {
    throw new AppError("Contact not found", 404);
  }

  if (deleteContact.isActive === false) {
    throw new AppError("Contact not active", 400);
  }

  await contactsRepository.update(id, {
    isActive: false,
  });

  const newStatus = await contactsRepository.findOneBy({
    id,
  });

  return newStatus!;
};

export default deleteContactService;