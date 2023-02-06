import { Request, Response } from "express";
import { Clients } from "../../entities/client.entities";
import deleteClientService from "../../services/clientsServices/deleteClientServices.services";

const deleteClientController = async (req: Request, res: Response) => {
    const id: string = req.params.id;
    const clientStatus = await deleteClientService(id);
  
    if (clientStatus instanceof Clients) {
      return res.status(204).json(clientStatus);
    }
    return res.status(clientStatus[1] as number).json({
      message: clientStatus[0],
    });
  };

  export default deleteClientController