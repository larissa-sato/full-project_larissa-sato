import { Request, Response } from "express";
import { IClientRequest } from "../../interfaces/clients";
import createClientService from "../../services/clientsServices/createClientService.services";

const createClientController = async (req: Request, res: Response) => {
  const client: IClientRequest = req.body;
  const createdClient = await createClientService(client);
  return res.status(201).json(createdClient);
};

export default createClientController