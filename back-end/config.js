import { config } from "dotenv";

config();

const urlRailwayDB = `mysql://${process.env.RAILWAY_USER}:${process.env.RAILWAY_PASSWORD}@${process.env.RAILWAY_CONNECTION}:${process.env.RAILWAY_PORT}/${process.env.RAILWAY_DB_NAME}`;
//"mysql://root:AONXMuCcBaLXGZnwQCdXQxwciXJQxBlb@mysql.railway.internal:3306/railway";

const databaseConfig = urlRailwayDB || {
  host: process.env.CONNECTION,
  port: process.env.PORT,
  user: process.env.DB_USER,
  password: process.env.DB_MYSQL_PASS,
  database: process.env.DB_MYSQL_NAME,
};

export default databaseConfig;
