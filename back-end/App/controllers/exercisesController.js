import ExercisesModel from "../models/exercisesModel.js";

const exercise_index = async (req, res) => {
  try {
    const result = await ExercisesModel.getAll(req.query);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internar server error" });
  }
};

const exercise_details = async (req, res) => {
  try {
    const [result] = await ExercisesModel.getExercise(req.params.id);
    if (!result) return res.status(404).json({ Error: "Exercise not founded" });
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal error server" });
  }
};

const exercise_create = async (req, res) => {
  try {
    const result = await ExercisesModel.createExercise(req.body);
    const newExercise = { id: result.insertId, ...req.body };
    return res.status(201).json(newExercise);
  } catch (error) {
    if (error.message === "Exercise duplicated")
      return res
        .status(400)
        .json({ Error: "Exercise already saved in database" });
    return res.status(500).json({ Error: "Internal server error" });
  }
};

//? OPZIONALE - NON DECISO
const exercise_multi_create = async (req, res) => {
  try {
    const [result] = await ExercisesModel.createMultiExercises(req.body);
    if (!result)
      return res.status(404).json({
        Error: "Exercise already exists in database. Check log to know which",
      });
    return res.status(201).json({ IDs: result.insertId, Exercise: req.body });
  } catch (error) {
    if (error.message === "Exercise duplicated")
      return res
        .status(400)
        .json({ Error: "Exercise already saved in database" });
    return res.status(500).json({ Error: "Internal server error" });
  }
};

const exercise_update = async (req, res) => {
  try {
    const [exercise] = await ExercisesModel.getExercise(req.params.id);
    if (!exercise)
      return res.status(404).json({ Error: "Exercise not founded" });

    const result = await ExercisesModel.updateExercise(exercise, req.body);
    const updatedExercise = { id: req.params.id, ...req.body };
    if (result.affectedRows >= 1) return res.status(200).json(updatedExercise);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal error server" });
  }
};

const exercise_delete = async (req, res) => {
  try {
    const [deletedExercise, result] = await ExercisesModel.deleteExercise(
      req.params.id
    );

    if (!deletedExercise)
      return res.status(404).json({ Error: "Exercise not founded" });

    if (result.affectedRows >= 1) return res.status(200).json(deletedExercise);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal error server" });
  }
};

export default {
  exercise_details,
  exercise_index,
  exercise_create,
  exercise_multi_create,
  exercise_update,
  exercise_delete,
};
