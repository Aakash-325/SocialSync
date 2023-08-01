import express from "express";
import { addMessage, getMessage } from "../controller/Message";
const MessageRouter = express.Router();

MessageRouter.post("/add", addMessage);
MessageRouter.get("/:conversationId", getMessage)

export default MessageRouter;