import mySqlConnectionQuery from "../../Core/Database.js";
import paginations from "../../Core/utilities/paginations.js";

class TrainingProgramsModel {
  static table_name = "training_programs";

  //! INSERIRE COTROLLO REQ.USER.ID === USER.ID
  static async getAll(req) {
    const params = paginations(req);
    const query = `SELECT training.*, users.username FROM ${this.table_name} AS training INNER JOIN users ON users.id = id_user LIMIT ${params.maxData} OFFSET ${params.offsetData}`;
    const result = await mySqlConnectionQuery(query);
    return result.filter((username) => username.id_user === req.user.id);
  }

  static async getTrainingProgram(id_user, id) {
    const query = `SELECT training.*, users.username, exercises_training.* FROM ${this.table_name} AS training INNER JOIN users ON users.id = training.id_user LEFT JOIN exercises_training ON exercises_training.id_scheda = training.id WHERE training.id = ?`;
    const result = await mySqlConnectionQuery(query, id);
    return result.filter((username) => username.id_user === id_user);
  }

  static async createTrainingProgram(data, id_user) {
    const query = `INSERT INTO ${this.table_name} (name, date_start, date_end, id_user) VALUES (?,?,?,?)`;
    if (data.name === undefined) {
      throw new Error("body");
    }
    let body = [
      data.name,
      data.date_start ?? null,
      data.date_end ?? null,
      id_user,
    ];
    return await mySqlConnectionQuery(query, body);
  }

  static async updateTrainingProgram(currentData, newData) {
    const query = `UPDATE ${this.table_name} SET name = ?, date_start = ?, date_end = ? WHERE id = ?`;
    const body = [
      newData.name ?? currentData.name,
      newData.date_start ?? currentData.date_start,
      newData.date_end ?? currentData.date_end,
      currentData.id,
    ];
    return await mySqlConnectionQuery(query, body);
  }

  static async deleteTrainingProgram(id) {
    const query = `DELETE FROM ${this.table_name} WHERE id = ?`;
    const selectQuery = `SELECT * FROM ${this.table_name} WHERE id = ?`;
    const [deletedTrainingProgram] = await mySqlConnectionQuery(
      selectQuery,
      id
    );
    const result = await mySqlConnectionQuery(query, id);
    return [deletedTrainingProgram, result];
  }
}

export default TrainingProgramsModel;
