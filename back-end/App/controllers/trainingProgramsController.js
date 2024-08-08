import TrainingProgramsModel from "../models/trainingProgramsModel.js";

const trainingPrograms_index = async (req, res) => {
  try {
    const result = await TrainingProgramsModel.getAll(req.query);
    return res.status(200).json({
      "Training Programs": result.filter(
        (username) => username.id_user === req.user.id
      ),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};
const trainingPrograms_details = async (req, res) => {
  try {
    let result = await TrainingProgramsModel.getTrainingProgram(req.params.id);
    result = result.filter((username) => username.id_user === req.user.id);
    if (result.length <= 0) {
      return res.status(404).json({ Error: "Training program not founded" });
    }
    result = result.reduce((acc, current) => {
      const {
        name,
        date_start,
        date_end,
        id_user,
        username,
        id_exercise,
        series,
        reps,
        rest,
        weight,
        weiht_max_rm,
        video,
      } = current;
      if (!acc[name]) {
        acc[name] = {
          date_start,
          date_end,
          User: { id_user, username },
          Exercise: [],
        };
      }
      acc[name].Exercise.push({
        id_exercise,
        series,
        reps,
        rest,
        weight,
        weiht_max_rm,
        video,
      });
      return acc;
    }, {});
    return res.status(200).json({ "Training program": result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};
const trainingPrograms_create = async (req, res) => {
  try {
    const result = await TrainingProgramsModel.createTrainingProgram(
      req.body,
      req.user.id
    );
    if (result.affectedRows >= 0) {
      return res.status(201).json({ ID: result.insertId, Training: req.body });
    }
  } catch (error) {
    console.error(error);
    if (error.message === "body") {
      return res.status(400).json({ "Body Error": "Some field are missing" });
    }
    return res.status(500).json({ Error: "Internal server error" });
  }
};

const trainingPrograms_update = async (req, res) => {
  try {
    const [trainingProgram] = await TrainingProgramsModel.getTrainingProgram(
      req.params.id
    );
    if (!trainingProgram)
      return res.status(404).json({ Error: "Training Program not founded" });
    const result = await TrainingProgramsModel.updateTrainingProgram(
      trainingProgram,
      req.body
    );
    if (result.affectedRows >= 1)
      return res
        .status(200)
        .json({ "Training Program Id": trainingProgram.id, Update: req.body });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};

const trainingPrograms_delete = async (req, res) => {
  try {
    const [deletedTrainingProgram, result] =
      await TrainingProgramsModel.deleteTrainingProgram(req.params.id);
    if (!deletedTrainingProgram)
      return res.status(404).json({ Error: "Training program not founded" });
    if (result.affectedRows >= 1)
      return res
        .status(200)
        .json({ "Training Program deleted": deletedTrainingProgram });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};

export default {
  trainingPrograms_details,
  trainingPrograms_index,
  trainingPrograms_create,
  trainingPrograms_update,
  trainingPrograms_delete,
};
