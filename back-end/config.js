import { config } from "dotenv";

config();

const urlRailwayDB = `mysql://${process.env.MYSQLUSER}:${process.env.MYSQLPASSWORD}@${process.env.MYSQLHOST}:${process.env.MYSQLPORT}/${process.env.MYSQLDATABASE}`;
//mysql://root:bMKqlRKtHXIdXQGXBLdinMJXVpHbkyvJ@mysql.railway.internal:3306/railway;

const databaseConfig = urlRailwayDB || {
  host: process.env.CONNECTION,
  port: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_MYSQL_PASS,
  database: process.env.DB_MYSQL_NAME,
};

export default databaseConfig;
