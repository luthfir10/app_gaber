import { Sequelize } from "sequelize";
import dbtpp from "../config/Database.js";

const { DataTypes } = Sequelize;

const JabatanModel = dbtpp.define(
  "jabatan",
  {
    kode: { type: DataTypes.STRING(5), primaryKey: true },
    nama: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default JabatanModel;

// async () => {
//   await db.sync();
// };
