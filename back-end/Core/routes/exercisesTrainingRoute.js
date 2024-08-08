import express from "express";
import exercisesTrainingController from "../../App/controllers/exercisesTrainingController.js";
const exercisesTrainingRoute = express.Router();

exercisesTrainingRoute.get("/", exercisesTrainingController.exercisesTraining_index)
exercisesTrainingRoute.get("/:id", exercisesTrainingController.exercisesTraining_details)
exercisesTrainingRoute.post("/", exercisesTrainingController.exercisesTraining_create)
exercisesTrainingRoute.put("/:id", exercisesTrainingController.exercisesTraining_update)
exercisesTrainingRoute.delete("/:id", exercisesTrainingController.exercisesTraining_delete)

export default exercisesTrainingRoute;
