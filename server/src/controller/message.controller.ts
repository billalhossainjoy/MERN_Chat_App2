import { io } from "../app";
import AsyncHandler from "../lib/AsyncHandler";
import Cloudinary from "../lib/Cloudinary";
import { ErrorApi } from "../lib/ErrorHandler";
import ResApi from "../lib/ResponseApi";
import MessageModel from "../model/message.model";
import { UserModel } from "../model/user.model";
import { getReciverSocketId } from "../socket";

class MessageController extends Cloudinary {
  getUserForSlidebar = AsyncHandler(async (req, res) => {
    try {
      const loggedInUserId = req.user?._id;
      if (!loggedInUserId) throw new ErrorApi(401, "Unauthorized");

      const users = await UserModel.find({
        _id: { $ne: loggedInUserId },
      }).select("-password");
      return ResApi(res, 200, "ok", users);
    } catch (error) {
      throw error;
    }
  });

  getMessage = AsyncHandler(async (req, res) => {
    try {
      const { id: reciverId } = req.params;
      const senderId = req.user?._id;

      const messages = await MessageModel.find({
        $or: [
          { senderId: senderId, reciverId: reciverId },
          { senderId: reciverId, reciverId: senderId },
        ],
      });

      return ResApi(res, 200, "ok", messages);
    } catch (error) {
      throw error;
    }
  });

  sendMessage = AsyncHandler(async (req, res) => {
    try {
      const { id: reciverId } = req.params;
      const senderId = req.user?._id;
      const { text, image } = req.body;

      let imageUrl;
      if (image) {
        const uploadResponse = await this.uploader(image);
        imageUrl = uploadResponse.secure_url;
      }

      const newMessage = new MessageModel({
        senderId,
        reciverId,
        text,
        image: imageUrl,
      });

      await newMessage.save();

      const reciverSocketId = getReciverSocketId(reciverId)
      if (reciverId) {
        io.to(reciverSocketId).emit("newMessage", newMessage);
      }

      return ResApi(res, 200, "ok", newMessage);
    } catch (error) {
      throw error;
    }
  });
}

export default MessageController;
