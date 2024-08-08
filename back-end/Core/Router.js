import express from "express";
import exercisesRouter from "./routes/exercisesRoute.js";
import exercisesTrainingRoute from "./routes/exercisesTrainingRoute.js";
import logRoute from "./routes/logRoute.js";
import trainingProgramsRoute from "./routes/trainingProgramsRoute.js";
import usersRoute from "./routes/usersRoute.js";
import { authenticateToken } from "./utilities/authentication.js";
const router = express.Router();

router
  .use("/users", usersRoute)
  .use("/training-programs", authenticateToken, trainingProgramsRoute)
  .use("/exercises", exercisesRouter)
  .use("/exercises-training", authenticateToken, exercisesTrainingRoute)
  .use("/login", logRoute);

export default router;
