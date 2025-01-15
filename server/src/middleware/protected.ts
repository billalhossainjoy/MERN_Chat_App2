import { User, UserModel } from "../model/user.model";
import AsyncHandler from "../lib/AsyncHandler";
import { ErrorApi } from "../lib/ErrorHandler";
import JWT from "../lib/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: User | null;
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

    const user = await UserModel.findOne({ id: token.id }).select("-password");

    if (!user) {
      throw new ErrorApi(401, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
});
