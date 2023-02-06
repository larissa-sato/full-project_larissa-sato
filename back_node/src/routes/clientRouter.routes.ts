import { Router } from "express";
import createClientController from "../controllers/clientController/createClientController.controller";
import listClientController from "../controllers/clientController/listClientController.controller";
import updateClientController from "../controllers/clientController/updateClientController.controller";
import deleteClientController from "../controllers/clientController/deleteClientController.controller";

import checkTokenMiddleware from "../middlewares/ensureAuthMiddleware.middleware";
import isAdmMiddleware from "../middlewares/isAdmMiddleware.middleware";
import updateUserMiddleware from "../middlewares/updateUserMiddleware.middleware";


const clientRouter = Router();

clientRouter.post("", checkTokenMiddleware, isAdmMiddleware, createClientController)
clientRouter.get("", checkTokenMiddleware, isAdmMiddleware, listClientController)
clientRouter.patch("/:id", checkTokenMiddleware, updateUserMiddleware, updateClientController)
clientRouter.delete("/:id", checkTokenMiddleware, isAdmMiddleware, deleteClientController)

export default clientRouter