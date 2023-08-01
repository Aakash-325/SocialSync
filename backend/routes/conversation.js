import express from "express";
import { AddConversation, getConversation } from "../controller/Conversation";
const ConversationRouter = express.Router();

ConversationRouter.post("/add", AddConversation);
ConversationRouter.get("/:userId", getConversation);

export default ConversationRouter;