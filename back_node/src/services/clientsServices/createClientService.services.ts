import AppDataSource from "../../data-source";
import { Clients } from "../../entities/client.entities";
import { AppError } from "../../errors/appError";
import { IClientRequest } from "../../interfaces/clients";

const createClientService = async ({
    name,
    email,
    contact
  }: IClientRequest): Promise<Clients> => {
    const clientRepository = AppDataSource.getRepository(Clients);
  
    const findClient = await clientRepository.findOneBy({
      email,
    });
  
    if (findClient) {
      throw new AppError("Client already exists", 409);
    }
  
    if (contact.length !== 11) {
      throw new AppError("Must have eleven digits! ", 400);
    }
  
    const client = clientRepository.create({
        name,
        email,
        contact
    });
  
    await clientRepository.save(client);
  
    return client;
  };

  export default createClientService