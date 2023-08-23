import { Sequelize } from "sequelize";

const dbtpp = new Sequelize("nameDB", "username", "password", {
  host: "url",
  port: "port",
  dialect: "sql",
});
export default dbtpp;
