import { NextFunction, Request, Response } from "express";

const AsyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => void
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch((err) => {
      next(err);
    });
  };
};

export default AsyncHandler;
