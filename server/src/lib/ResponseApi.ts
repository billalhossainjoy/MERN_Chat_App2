import { Response } from "express";

const ResApi = (
  res: Response,
  status: number,
  message: string,
  data?: string | object
) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

export default ResApi;
