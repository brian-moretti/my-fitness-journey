import express from "express";
import logController from "../../App/controllers/logController.js";
const logRoute = express.Router();

logRoute.get("/", logController.login_page);
logRoute.post("/", logController.login_verify);
logRoute.delete("/", logController.logout);

export default logRoute;
