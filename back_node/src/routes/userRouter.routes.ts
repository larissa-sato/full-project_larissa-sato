import { Router } from "express";
import createUserController from "../controllers/userController/createUserController.controller";
import deleteUserController from "../controllers/userController/deleteUserController.controller";
import listUsersController from "../controllers/userController/listUserController.controller";
import updateUserController from "../controllers/userController/updateUserController.controller";

import checkTokenMiddleware from "../middlewares/ensureAuthMiddleware.middleware";
import isAdmMiddleware from "../middlewares/isAdmMiddleware.middleware";


const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", checkTokenMiddleware, isAdmMiddleware, listUsersController);
userRouter.patch("/:id", checkTokenMiddleware, isAdmMiddleware, updateUserController);
userRouter.delete("/:id", checkTokenMiddleware, isAdmMiddleware, deleteUserController)

export default userRouter