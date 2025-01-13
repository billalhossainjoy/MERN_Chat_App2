import AsyncHandler from "../lib/AsyncHandler";
import ResApi from "../lib/ResponseApi";

class UserController {
  get = AsyncHandler(async (req, res) => {
    try {
      return ResApi(res, 200, "ok");
    } catch (error) {
      throw error;
    }
  });
}
