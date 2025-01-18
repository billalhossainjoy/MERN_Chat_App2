import { Router } from "express";
import MessageController from "../controller/message.controller";

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
      .get(this.getUserForSlidebar.bind(this));
    this.router.route("/:id").get(this.getMessage.bind(this));
  }
}


export default new MessageRouter().router