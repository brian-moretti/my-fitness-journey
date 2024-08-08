import express from "express";
import exercisesController from "../../App/controllers/exercisesController.js";
const exercisesRouter = express.Router();

exercisesRouter.get("/", exercisesController.exercise_index);
exercisesRouter.get("/:id", exercisesController.exercise_details);
exercisesRouter.post("/", exercisesController.exercise_create);
//exercisesRouter.post("/", exercisesController.exercise_multi_create);
exercisesRouter.put("/:id", exercisesController.exercise_update);
exercisesRouter.delete("/:id", exercisesController.exercise_delete);

export default exercisesRouter;
