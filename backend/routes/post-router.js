import { createPost, deletePost, getPost, postComment, postReaction, updatePost,getComments } from "../controller/Post";
import express from "express";
import { verifyToken } from "../middleware/auth";

const PostRouter = express.Router();

PostRouter.post("/add", createPost);
PostRouter.get("/allpost", getPost);
PostRouter.put("/update/:id", updatePost);
PostRouter.delete("/delete/:id", deletePost);
PostRouter.put("/reaction/:id", postReaction);
PostRouter.post("/comment/:id", postComment);
PostRouter.get("/comments/:id", getComments);

export default PostRouter; 