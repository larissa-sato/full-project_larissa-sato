import AppDataSource from "../../data-source";
import { Clients } from "../../entities/client.entities";
import { AppError } from "../../errors/appError";

const deleteClientService = async (id: string): Promise<Clients> => {
  const clientRepository = AppDataSource.getRepository(Clients);

  const deleteClient = await clientRepository.findOneBy({
    id,
  });

  if (!deleteClient) {
    throw new AppError("Client not found", 404);
  }

  if (deleteClient.isActive === false) {
    throw new AppError("Client not active", 400);
  }

  await clientRepository.update(id, {
    isActive: false,
  });

  const newStatus = await clientRepository.findOneBy({
    id,
  });

  return newStatus!;
};

export default deleteClientService;