import AppDataSource from "../../data-source";
import { Clients } from "../../entities/client.entities";

const listClientService = async (): Promise<Clients[]> => {
  const clientRepository = AppDataSource.getRepository(Clients);
  const clients = await clientRepository.find();
  return clients;
};

export default listClientService;