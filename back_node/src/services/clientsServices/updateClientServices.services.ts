import AppDataSource from "../../data-source";
import { Clients } from "../../entities/client.entities";
import { IClientUpdate } from "../../interfaces/clients";
import { AppError } from "../../errors/appError";

const updateClientService = async (
  { name, email, contact }: IClientUpdate,
  id: string
): Promise<Clients> => {
  const clientRepository = AppDataSource.getRepository(Clients);

  const findClient = await clientRepository.findOneBy({
    id,
  });

  if (!findClient) {
    throw new AppError("User not found", 404);
  }

  await clientRepository.update(id, {
    name: name ? name : findClient.name,
    email: email ? email : findClient.email,
    contact: contact ? contact : findClient.contact,
  });

  const newData = await clientRepository.findOneBy({
    id,
  });

  return newData!;
};

export default updateClientService;