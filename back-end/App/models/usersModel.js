import mySqlConnectionQuery from "../../Core/Database.js";
import paginations from "../../Core/utilities/paginations.js";

class UsersModel {
  constructor() {}
  static table_name = "users";

  static async getAll(req) {
    const params = paginations(req);
    const query = `SELECT id, username, email, password FROM ${this.table_name} LIMIT ${params.maxData} OFFSET ${params.offsetData}`;
    return await mySqlConnectionQuery(query);
  }

  static async getUser(id) {
    const query = `SELECT us.id, us.username, us.email, programs.name, programs.date_start, programs.date_end FROM ${this.table_name} AS us LEFT JOIN training_programs as programs ON us.id = programs.id_user WHERE us.id = ?`;
    return await mySqlConnectionQuery(query, id);
  }

  static async createUser(data) {
    const query = `INSERT INTO ${this.table_name} (username, email, password) VALUES (?,?,?)`;
    let body = [data.username, data.email, data.password];
    if (body.includes(undefined)) {
      throw new Error("error body");
    }
    return await mySqlConnectionQuery(query, body);
  }

  static async updateUser(currentData, newData) {
    const query = `UPDATE ${this.table_name} SET username = ?, email = ? WHERE id = ?`;
    let body = [
      newData.username ?? currentData.username,
      newData.email ?? currentData.email,
      currentData.id,
    ];
    return await mySqlConnectionQuery(query, body);
  }

  static async deleteUser(id) {
    const query = `DELETE FROM ${this.table_name} WHERE id = ?`;
    const selectQuery = `SELECT u.id, u.username, u.email FROM ${this.table_name} AS u WHERE id = ?`;
    const [deletedUser] = await mySqlConnectionQuery(selectQuery, id);
    const result = await mySqlConnectionQuery(query, id);
    return [deletedUser, result];
  }
}

export default UsersModel;
