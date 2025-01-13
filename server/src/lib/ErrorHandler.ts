import { NextFunction, Request, Response } from "express";

export class ErrorApi extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const NotFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next(new ErrorApi(404, "404 not found"));
};

export const DefaultErrorHandler = (
  err: ErrorApi,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const error = err.message || err.stack;

  res.status(status).json(error);
};
