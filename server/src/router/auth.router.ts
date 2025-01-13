import express, { Router } from "express";
import AuthController from "../controller/auth.controller";

class AuthRouter extends AuthController {
  router: Router;
  constructor() {
    super();
    this.router = express.Router();
    this.init();
  }

  init() {
    this.router.post("/signup", this.signup.bind(this));
    this.router.post("/login", this.login.bind(this));
  }
}

export default new AuthRouter().router;
