import { Router } from "express";
import MessageController from "../controller/message.controller";

class MessageRouter extends MessageController {
  router: Router;
	constructor() {
	  super()
	  this.router = Router();
	  
	}
	
	init() {
		this.router.route("/get-user-slidebar").get(this.getMessage)
	}
}
