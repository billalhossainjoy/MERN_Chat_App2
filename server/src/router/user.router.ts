import { Router } from "express";

class UserRouter {
  router: Router;
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.route("/get").get();
  }
}

export default new UserRouter().router;
