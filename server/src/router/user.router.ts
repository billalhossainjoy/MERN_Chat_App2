import { Router } from "express";
import UserController from "../controller/user.controller";
import { Protected } from "./../middleware/protected";

class UserRouter extends UserController {
  router: Router;
  constructor() {
    super();
    this.router = Router();
    this.init();
  }

  init() {
    this.router
      .route("/update-profile")
      .get(Protected, this.updateProfile.bind(this));
    this.router.route("/get-messages").get(Protected);
  }
}

export default new UserRouter().router;
