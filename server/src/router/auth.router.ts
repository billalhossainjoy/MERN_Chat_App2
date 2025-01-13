import express, { Router } from "express";
import AuthController from "../controller/auth.controller";
import { Protected } from "../middleware/protected";

class AuthRouter extends AuthController {
  router: Router;
  constructor() {
    super();
    this.router = express.Router();
    this.init();
  }

  init() {
    this.router.route("/signup").post(this.signup.bind(this));
    this.router.route("/login").post(this.login.bind(this));
    this.router.route("/logout").get(Protected, this.logout.bind(this));
  }
}

export default new AuthRouter().router;
