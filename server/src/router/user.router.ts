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
    this.router.route("/get").get(Protected, this.get.bind(this));
    this.router
      .route("/update-profile")
      .get(Protected, this.updateProfile.bind(this));
  }
}

export default new UserRouter().router;
