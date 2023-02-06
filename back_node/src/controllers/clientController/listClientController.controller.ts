import { Request, Response } from "express";
import listClientService from "../../services/clientsServices/listClientsServices.services";

const listClientController = async (req: Request, res: Response) => {
  const clients = await listClientService();
  return res.json(clients);
};

export default listClientController