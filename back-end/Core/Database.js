import mySql from "mysql2/promise.js";
import databaseConfig from "../config.js";

async function mySqlConnectionQuery(query, params) {
  const connect = await mySql.createConnection(databaseConfig);
  let statement;
  try {
    [statement] = await connect.query(query, params);
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await connect.end();
  }
  return statement;
}

export default mySqlConnectionQuery;
