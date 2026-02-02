import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res.status(403).json({
      success: false,
      error: "Token is gone.",
    });
  }
  try {
    const decode = jwt.verify(token, config.jwtSecret) as { userId: string };
    req.user = { userId: decode.userId };
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      error: "Token is invalid.",
    });
  }
};
