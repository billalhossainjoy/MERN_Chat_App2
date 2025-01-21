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
      .post(Protected, this.updateProfile.bind(this));
  }
}

export default new UserRouter().router;
