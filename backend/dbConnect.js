import mysql from "mysql2";

export const dbConnect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "baraka123ABC",
  database: "task",
});
