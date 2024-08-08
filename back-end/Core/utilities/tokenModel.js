import mySqlConnectionQuery from "../Database.js";

export async function insertRefreshTokenDB(table, refreshToken, id) {
  const query = `UPDATE ${table} SET refreshToken = ? WHERE id = ?`;
  return await mySqlConnectionQuery(query, [refreshToken, id]);
}

export async function getRefreshTokenDB(table, id) {
  const query = `SELECT refreshToken FROM ${table} WHERE id = ?`;
  return await mySqlConnectionQuery(query, id);
}

export async function deleteRefreshTokenDB(table, refreshToken) {
  const query = `UPDATE ${table} SET refreshToken = NULL WHERE refreshToken = ?`;
  return await mySqlConnectionQuery(query, [refreshToken]);
}
