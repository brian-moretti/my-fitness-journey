import express from "express";
import usersController from "../../App/controllers/usersController.js";
import { authenticateToken } from "../utilities/authentication.js";
const usersRoute = express.Router();

usersRoute.get("/", authenticateToken, usersController.user_index);
usersRoute.get("/:id", authenticateToken, usersController.user_details);
usersRoute.post("/", usersController.user_create);
usersRoute.put("/:id", authenticateToken, usersController.user_update);
usersRoute.delete("/:id", authenticateToken, usersController.user_delete);

export default usersRoute;
