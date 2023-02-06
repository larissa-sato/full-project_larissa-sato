import { Router } from "express";
import { userLoginController } from "../controllers/userLoginController/loginUserController.controller";


const loginRouter = Router();

loginRouter.post("", userLoginController);

export default loginRouter