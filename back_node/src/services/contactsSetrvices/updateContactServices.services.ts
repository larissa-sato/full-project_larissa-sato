import AppDataSource from "../../data-source";
import { Contacts } from "../../entities/contacts.entities";
import { IContactUpdate } from "../../interfaces/contacts";
import { AppError } from "../../errors/appError";

const updateContactService = async (
  { name, email, contact }: IContactUpdate,
  id: string
): Promise<Contacts> => {
  const contactRepository = AppDataSource.getRepository(Contacts);

  const findContact = await contactRepository.findOneBy({
    id,
  });

  if (!findContact) {
    throw new AppError("User not found", 404);
  }

  await contactRepository.update(id, {
    name: name ? name : findContact.name,
    email: email ? email : findContact.email,
    contact: contact ? contact : findContact.contact,
  });

  const newData = await contactRepository.findOneBy({
    id,
  });

  return newData!;
};

export default updateContactService;