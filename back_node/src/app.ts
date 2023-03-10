import "express-async-errors";
import "reflect-metadata";
import express from "express";
import handleErrorMiddleware from "./middlewares/handleErrorMiddleware.middleware";
import loginRouter from "./routes/userLoginRouter.routes";
import userRouter from "./routes/userRouter.routes";
import clientRouter from "./routes/clientRouter.routes";
import contactRouter from "./routes/contactRouter.routes";

const app = express();
app.use(express.json());

let cors = require("cors")

app.use(cors())

app.use("/login", loginRouter)
app.use("/users", userRouter)
app.use("/client", clientRouter)
app.use("/contact", contactRouter)

app.use(handleErrorMiddleware)

export default app;