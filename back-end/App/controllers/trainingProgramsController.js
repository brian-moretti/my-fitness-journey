import TrainingProgramsModel from "../models/trainingProgramsModel.js";

const trainingPrograms_index = async (req, res) => {
  try {
    const result = await TrainingProgramsModel.getAll(req);
    const trainingPrograms = result.map((data) => ({
      id: data.id,
      name: data.name,
      date_start: data.date_start,
      date_end: data.date_end,
      User: { id: data.id_user, username: data.username },
    }));
    return res.status(200).json(trainingPrograms);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Error: "Internal server error" });
  }
};
const trainingPrograms_details = async (req, res) => {
  try {
    let result = await TrainingProgramsModel.getTrainingProgram(req);
    if (result.length <= 0) {
      return res.status(404).json({ Error: "Training program not founded" });
    }

    /* return {
        id: data.id,
        [data.name]: {
          date_start: data.date_start,
          date_end: data.date_end,
          User: { id: data.id_user, username: data.username },
          Exercises,
        },
      }; */

    result = result.reduce((acc, current) => {
      const {
        id,
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
          id,
          name,
          date_start,
          date_end,
          User: { id_user, username },
          Exercises: [],
        };
      }
      acc[name].Exercises.push({
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
    return res.status(200).json(result);
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
    const newTrainingProgram = { id: result.insertId, ...req.body };
    if (result.affectedRows >= 0) {
      return res.status(201).json(newTrainingProgram);
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
    const updatedTrainingProgram = { id: trainingProgram.id, ...req.body };
    if (result.affectedRows >= 1)
      return res.status(200).json(updatedTrainingProgram);
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
      return res.status(200).json(deletedTrainingProgram);
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
