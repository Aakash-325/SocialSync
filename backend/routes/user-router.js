import { addRemoveFriend, deleteUser, getAllUser, getUser, updateUser } from "../controller/User";
import express from "express";

const UserRouter = express.Router();

UserRouter.put("/update/:id", updateUser);
UserRouter.delete("/delete/:id", deleteUser);
UserRouter.get("/get/:id", getUser);
UserRouter.get("/getalluser", getAllUser);
UserRouter.put("/friend/:id/:friendId", addRemoveFriend);


export default UserRouter;