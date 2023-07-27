import { Sequelize } from "sequelize";

const db = new Sequelize("sittp_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
