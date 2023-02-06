import { Router } from "express";
import createContactController from "../controllers/contactController/createContactController.controller";
import listContactController from "../controllers/contactController/listContactController.controller";
import updateContactController from "../controllers/contactController/updateContactController.controller";
import deleteContactController from "../controllers/contactController/deleteContactController.controller";

import checkTokenMiddleware from "../middlewares/ensureAuthMiddleware.middleware";
import isAdmMiddleware from "../middlewares/isAdmMiddleware.middleware";


const contactRouter = Router();

contactRouter.post("", checkTokenMiddleware, isAdmMiddleware, createContactController)
contactRouter.get("", checkTokenMiddleware, isAdmMiddleware, listContactController)
contactRouter.patch("/:id", checkTokenMiddleware, isAdmMiddleware, updateContactController)
contactRouter.delete("/:id", checkTokenMiddleware, isAdmMiddleware, deleteContactController)


export default contactRouter