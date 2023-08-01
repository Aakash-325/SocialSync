import express from "express";
import { login, register } from "../controller/Auth";

const authRouter = express.Router();

authRouter.post("/register", register);

authRouter.post("/login", login);
// AuthRouter.post("/refresh-token", refreshToken); 

export default authRouter;
 