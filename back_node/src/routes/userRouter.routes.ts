import { Router } from "express";
import createUserController from "../controllers/userController/createUserController.controller";
import deleteUserController from "../controllers/userController/deleteUserController.controller";
import listUsersController from "../controllers/userController/listUserController.controller";
import updateUserController from "../controllers/userController/updateUserController.controller";
import { userLoginController } from "../controllers/userLoginController/loginUserController.controller";

import checkTokenMiddleware from "../middlewares/ensureAuthMiddleware.middleware";
import isAdmMiddleware from "../middlewares/isAdmMiddleware.middleware";
import updateUserMiddleware from "../middlewares/updateUserMiddleware.middleware";


const userRouter = Router();

userRouter.post("", createUserController);
userRouter.get("", checkTokenMiddleware, isAdmMiddleware, listUsersController);
userRouter.patch("/:id", checkTokenMiddleware, updateUserMiddleware, updateUserController);
userRouter.delete("/:id", checkTokenMiddleware, isAdmMiddleware, deleteUserController)

userRouter.post("", userLoginController)

export default userRouter