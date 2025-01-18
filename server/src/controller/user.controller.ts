import AsyncHandler from "../lib/AsyncHandler";
import Cloudinary from "../lib/Cloudinary";
import { ErrorApi } from "../lib/ErrorHandler";
import ResApi from "../lib/ResponseApi";
import { UserModel } from "../model/user.model";

class UserController extends Cloudinary {
  constructor() {
    super();
  }

  get = AsyncHandler(async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        throw new ErrorApi(401, "Unauthorized");
      }
      return ResApi(res, 200, "ok", user);
    } catch (error) {
      throw error;
    }
  });

  updateProfile = AsyncHandler(async (req, res) => {
    try {
      const { profilePic } = req.body;
      const userId = req.user?._id;

      const uploadResponse = await this.uploader(profilePic);
      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {
          profilePic: uploadResponse.secure_url,
        },
        {
          new: true,
        }
      ).select("-password");

      return ResApi(res, 200, "user profile is updated");
    } catch (error) {
      throw error;
    }
  });
}

export default UserController;
