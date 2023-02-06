import { Request, Response } from "express";
import { IClientUpdate } from "../../interfaces/clients";
import updateClientService from "../../services/clientsServices/updateClientServices.services";

const updateClientController = async (req: Request, res: Response) => {
    const client: IClientUpdate = req.body;
    const id: string = req.params.id;
    const updatedClient = await updateClientService(client, id);
    return res.json(updatedClient);
  };

  export default updateClientController