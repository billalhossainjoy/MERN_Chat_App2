import AsyncHandler from "../lib/AsyncHandler";
import { ErrorApi } from "../lib/ErrorHandler";
import ResApi from "../lib/ResponseApi";
import MessageModel from "../model/message.model";

class MessageController {
  getUserForSlidebar = AsyncHandler(async (req, res) => {
    try {
      const loggedInUserId = req.user?._id;
      if (loggedInUserId) throw new ErrorApi(401, " authenticated");

      const users = await MessageModel.find({
        _id: { $ne: loggedInUserId },
      }).select("-password");
      return ResApi(res, 200, "ok", users);
    } catch (error) {
      throw error;
    }
  });
  getMessage = AsyncHandler(async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const senderId = req.user?._id;

      const messages = await MessageModel.find({
        $or: [
          { senderId, userToChatId },
          { senderId: userToChatId, userToChatId },
        ],
	  });
      return ResApi(res, 200, "ok", messages);
		
    } catch (error) {
      throw error;
    }
  });
}

export default MessageController;
