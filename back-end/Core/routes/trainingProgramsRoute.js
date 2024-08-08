import express from "express";
import trainingProgramsController from "../../App/controllers/trainingProgramsController.js";
const trainingProgramsRoute = express.Router();

trainingProgramsRoute.get(
  "/",
  trainingProgramsController.trainingPrograms_index
);
trainingProgramsRoute.get(
  "/:id",
  trainingProgramsController.trainingPrograms_details
);
trainingProgramsRoute.post(
  "/",
  trainingProgramsController.trainingPrograms_create
);
trainingProgramsRoute.put(
  "/:id",
  trainingProgramsController.trainingPrograms_update
);
trainingProgramsRoute.delete(
  "/:id",
  trainingProgramsController.trainingPrograms_delete
);

export default trainingProgramsRoute;
