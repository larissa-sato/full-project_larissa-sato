import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/appError";

const isAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isAdm: boolean = req.user.isAdm;

  if (!isAdm) {
    throw new AppError("No authorization", 403);
  }

  next();
};

export default isAdmMiddleware;