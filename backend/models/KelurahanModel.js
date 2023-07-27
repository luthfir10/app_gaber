import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const KelurahanModel = db.define(
  "kelurahan",
  {
    kode: { type: DataTypes.STRING(5), primaryKey: true },
    nama: DataTypes.STRING,
    alamat: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default KelurahanModel;

// (async () => {
//   await db.sync();
// })();
