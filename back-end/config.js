import { config } from "dotenv";

config();

const databaseConfig = {
  host: process.env.CONNECTION,
  port: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_MYSQL_PASS,
  database: process.env.DB_MYSQL_NAME
};

export default databaseConfig;
