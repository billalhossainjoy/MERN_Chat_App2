import AsyncHandler from "../lib/AsyncHandler";
import { ErrorApi } from "../lib/ErrorHandler";
import JWT from "../lib/jwt";
import ResApi from "../lib/ResponseApi";
import { UserModel } from "../model/user.model";
import { loginSchema, signupSchema } from "../schema/auth.schema";
import bcrypt from "bcryptjs";

class AuthController extends JWT {
  signup = AsyncHandler(async (req, res) => {
    try {
      const { fullName, email, password } = signupSchema.parse(req.body);

      const existingUser = await UserModel.findOne({ email });

      if (existingUser) {
        throw new ErrorApi(401, "Email already exists");
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await UserModel.create({
        fullName,
        email,
        password: hashPassword,
      });

      const accessToken = this.generateToken({
        _id: newUser.id,
        fullName: newUser.fullName,
        email: newUser.email,
      });
      res.cookie("AccessToken", accessToken);

      res.cookie("AccessToken", accessToken, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
      });
    } catch (error) {
      throw error;
    }
  });

  login = AsyncHandler(async (req, res) => {
    try {
      const { identifier, password } = loginSchema.parse(req.body);

      const existingUser = await UserModel.findOne({ email: identifier });

      if (!existingUser) {
        throw new ErrorApi(404, "Email not found.");
      }

      const isPasswordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (!isPasswordMatch) {
        throw new ErrorApi(401, "Invalid credentials.");
      }

      const accessToken = this.generateToken({
        _id: existingUser.id,
        fullName: existingUser.fullName,
        email: existingUser.email,
      });
      res.cookie("AccessToken", accessToken, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
      });

      return ResApi(res, 200, "User logged in successfully.", {
        fullName: existingUser.fullName,
        email: existingUser.email,
        accessToken,
      });
    } catch (error) {
      throw error;
    }
  });

  logout = AsyncHandler(async (req, res) => {
    try {
      res.clearCookie("AccessToken");
      return ResApi(res, 200, "User logged out successfully.");
    } catch (error) {
      throw error;
    }
  });
}

export default AuthController;
