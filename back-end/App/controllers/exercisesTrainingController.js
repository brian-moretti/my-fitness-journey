import mySqlConnectionQuery from "../../Core/Database.js";
import ExercisesModel from "../models/exercisesModel.js";
import ExercisesTrainingModel from "../models/exercisesTrainingModel.js";
import TrainingProgramsModel from "../models/trainingProgramsModel.js";

const exercisesTraining_index = async (req, res) => {
  return res
    .status(400)
    .json(
      "Please provide an exercise ID on the request to look into the database"
    );
};

const exercisesTraining_details = async (req, res) => {
  try {
    let [result] = await ExercisesTrainingModel.getExerciseTraining(
      req.params.id,
      req.user.id
    );
    if (!result) {
      return res
        .status(404)
        .json("Error on finding this exercise in the database");
    }
    result = {
      id_user: result.id_user,
      id_scheda: result.id_scheda,
      id_exercise: result.id_exercise,
      series: result.series,
      reps: result.reps,
      rest: result.rest,
      weight: result.weight,
      max_weight_rm: result.weight_max_rm,
      video: result.video,
      exercise: {
        id: result.id_exercise,
        name: result.exer_name,
        target: result.target,
        gifUrl: result.gifUrl,
        equipment: result.equipment,
        instructions: result.instructions,
        bodyPart: result.bodyPart,
        secondaryMuscles: result.secondaryMuscles,
      },
    };
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal error server");
  }
};

const exercisesTraining_create = async (req, res) => {
  try {
    const [exerciseToFind] = await ExercisesModel.getExercise(
      req.body.id_exercise
    );
    if (!exerciseToFind)
      return res.status(404).json("The exercise provided do not exists");

    const [programToFind] = await TrainingProgramsModel.getTrainingProgram(
      req.user.id,
      req.body.id_scheda
    );
    if (!programToFind)
      return res.status(404).json("The program provided do not exist");
    const result = await ExercisesTrainingModel.createExerciseTraining(
      req.body
    );
    if (result.affectedRows >= 0) {
      return res.status(201).json(req.body);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json( "Internal server error");
  }
};
const exercisesTraining_update = async (req, res) => {
  try {
    const [exerciseToFind] = await ExercisesModel.getExercise(req.params.id);
    if (!exerciseToFind)
      return res
        .status(404)
        .json("The exercise provided do not exists");

    const [programToFind] = await TrainingProgramsModel.getTrainingProgram(
      req.body.id_user,
      req.body.id_scheda
    );
    if (!programToFind)
      return res
        .status(400)
        .json("The program provided do not exists");

    const query = `SELECT * FROM exercises_training WHERE id_exercise = ? AND id_scheda = ?`;
    const [exerciseTraining] = await mySqlConnectionQuery(query, [
      req.params.id,
      req.body.id_scheda,
    ]);
    if (!exerciseTraining)
      return res
        .status(400)
        .json("The exercise do not exist in the program");

    const result = await ExercisesTrainingModel.updateExerciseTraining(
      exerciseTraining,
      req.body
    );
    const updatedExerciseTraining = {};
    if (result.affectedRows >= 1)
      return res
        .status(200)
        .json({ "Exercise Update": exerciseToFind.name, Updated: req.body });
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal error server");
  }
};

const exercisesTraining_delete = async (req, res) => {
  try {
    const [exerciseToDelete] = await ExercisesTrainingModel.getExerciseTraining(
      req.params.id,
      req.user.id
    );
    if (!exerciseToDelete)
      return res
        .status(404)
        .json("The exercise do not exists in the program");
    const result = await ExercisesTrainingModel.deleteExerciseTraining(
      req.params.id,
      exerciseToDelete.id_scheda
    );
    if (result.affectedRows >= 1) {
      return res.status(200).json(exerciseToDelete);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal error server");
  }
};

export default {
  exercisesTraining_index,
  exercisesTraining_details,
  exercisesTraining_create,
  exercisesTraining_update,
  exercisesTraining_delete,
};
