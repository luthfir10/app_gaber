import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const AbsenModel = db.define(
  "absen",
  {
    nip: { type: DataTypes.BIGINT(18) },
    bulan: { type: DataTypes.INTEGER(2) },
    tahun: { type: DataTypes.INTEGER(4) },
    jum_tpp: { type: DataTypes.DECIMAL(15, 2) },
    tk: { type: DataTypes.INTEGER(2) },
    ta: { type: DataTypes.INTEGER(2) },
    tms: { type: DataTypes.INTEGER(2) },
    td: { type: DataTypes.INTEGER(2) },
    psj: { type: DataTypes.INTEGER(2) },
    clt: { type: DataTypes.INTEGER(2) },
    pot_absen: { type: DataTypes.DECIMAL(15, 2) },
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
