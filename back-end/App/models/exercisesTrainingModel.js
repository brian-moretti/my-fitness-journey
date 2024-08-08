import mySqlConnectionQuery from "../../Core/Database.js";

class ExercisesTrainingModel {
  static table_name = "exercises_training";

  static async getAll(req) {
    //! NON NECESSARIA
  }

  static async getExerciseTraining(id_exercise, id_user) {
    const query = `SELECT program.id_user, ex_train.*, exercises.name AS exer_name, exercises.target, exercises.gifUrl, exercises.instructions, exercises.bodyPart, exercises.secondaryMuscles, program.name AS program_name, program.date_start, program.date_end FROM ${this.table_name} AS ex_train INNER JOIN exercises ON exercises.id = ex_train.id_exercise INNER JOIN training_programs AS program ON ex_train.id_scheda = program.id WHERE ex_train.id_exercise = ? AND program.id_user = ?`;
    return await mySqlConnectionQuery(query, [id_exercise, id_user]);
  }

  static async createExerciseTraining(data) {
    const query = `INSERT INTO ${this.table_name} (id_scheda, id_exercise, series, reps, rest, weight, weight_max_rm, video) VALUES (?,?,?,?,?,?,?,?)`;
    let body = [
      data.id_scheda,
      data.id_exercise,
      data.series,
      data.reps,
      data.rest,
      data.weight,
      data.weight_max_rm,
      data.video,
    ];
    return await mySqlConnectionQuery(query, body);
  }
  static async updateExerciseTraining(currentData, newData) {
    const query = `UPDATE ${this.table_name} SET series = ?, reps = ?, rest = ?, weight = ?, weight_max_rm = ?, video = ? WHERE id_scheda = ?`;
    let body = [
      newData.series ?? currentData.series,
      newData.reps ?? currentData.reps,
      newData.rest ?? currentData.rest,
      newData.weight ?? currentData.weight,
      newData.weight_max_rm ?? currentData.weight_max_rm,
      newData.video ?? currentData.video,
      currentData.id_scheda,
    ];
    return await mySqlConnectionQuery(query, body);
  }
  static async deleteExerciseTraining(id_exercise, id_scheda) {
    const query = `DELETE FROM ${this.table_name} WHERE id_exercise = ? AND id_scheda = ?`;
    return await mySqlConnectionQuery(query, [id_exercise, id_scheda]);
  }
}

export default ExercisesTrainingModel;
