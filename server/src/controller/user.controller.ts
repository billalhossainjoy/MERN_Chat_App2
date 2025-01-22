import AsyncHandler from "../lib/AsyncHandler";
import Cloudinary from "../lib/Cloudinary";
import ResApi from "../lib/ResponseApi";
import { UserModel } from "../model/user.model";

class UserController extends Cloudinary {
  constructor() {
    super();
  }

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

      return ResApi(res, 200, "user profile is updated", {
        profilePic: updatedUser?.profilePic
      });
    } catch (error) {
      throw error;
    }
  });
}

export default UserController;
