import { Router } from "express";
import MessageController from "../controller/message.controller";
import { Protected } from './../middleware/protected';

class MessageRouter extends MessageController {
  router: Router;
  constructor() {
    super();
	  this.router = Router();
	  this.init();
  }

  init() {
    this.router
      .route("/get-user-slidebar")
      .get(Protected, this.getUserForSlidebar.bind(this));
    this.router.route("/:id").get(Protected, this.getMessage.bind(this));
    this.router.route("/send/:id").get(Protected, this.sendMessage)
  }
}


export default new MessageRouter().router