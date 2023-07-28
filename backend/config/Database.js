// import { Sequelize } from "sequelize";

// const db = new Sequelize("sittp_db", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });

// export default db;

import { Sequelize } from "sequelize";

const dbtpp = new Sequelize("my_db", "admin", "10Agus95", {
  host: "database-1.cdwry0ja3jul.us-east-2.rds.amazonaws.com",
  port: "3306",
  dialect: "mysql",
});
export default dbtpp;
