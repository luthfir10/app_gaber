import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const TppModel = db.define(
  "tpp",
  {
    nip: { type: DataTypes.BIGINT(18) },
    bulan: { type: DataTypes.INTEGER(2) },
    tahun: { type: DataTypes.INTEGER(4) },
    jum_tpp: { type: DataTypes.DECIMAL(15, 2) },
    tk: { type: DataTypes.INTEGER(2) },
    ta: { type: DataTypes.INTEGER(2) },
    tms: { type: DataTypes.INTEGER(2) },
    td1: { type: DataTypes.INTEGER(2) },
    td2: { type: DataTypes.INTEGER(2) },
    td3: { type: DataTypes.INTEGER(2) },
    td4: { type: DataTypes.INTEGER(2) },
    psj1: { type: DataTypes.INTEGER(2) },
    psj2: { type: DataTypes.INTEGER(2) },
    psj3: { type: DataTypes.INTEGER(2) },
    psj4: { type: DataTypes.INTEGER(2) },
    clt: { type: DataTypes.INTEGER(2) },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default AbsenModel;

(async () => {
  await db.sync();
})();
