import { User, UserModel } from "../model/user.model";
import AsyncHandler from "./AsyncHandler";
import { ErrorApi } from "./ErrorHandler";
import JWT from "./jwt";

declare global {
  namespace Express {
    interface Request {
      user?: User | null
    }
  }
}

export const Protected = AsyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.AccessToken;

    if (!token) {
      throw new ErrorApi(401, "Unauthorized");
    }

    const decoded = new JWT().verifyToken(token);

    if (!decoded) {
      throw new ErrorApi(401, "Invalid token");
    }

    const user = await UserModel.findOne({ id: token.id });

    if (!user) {
      throw new ErrorApi(401, "User not found");
    }

	  req.user = user;
	  next()
  } catch (error) {
    next(error);
  }
});
