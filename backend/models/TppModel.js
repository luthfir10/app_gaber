import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const TppModel = db.define(
  "tpp",
  {
    nip: { type: DataTypes.BIGINT(18) },
    id_absen: { type: DataTypes.INTEGER(11) },
    bulan: { type: DataTypes.INTEGER(2) },
    tahun: { type: DataTypes.INTEGER(4) },
    saldo_tpp: { type: DataTypes.DECIMAL(15, 2) },
    nilskp: { type: DataTypes.INTEGER(2) },
    harskp: { type: DataTypes.DECIMAL(15, 2) },
    harkeha: { type: DataTypes.DECIMAL(15, 2) },
    tottppkot: { type: DataTypes.DECIMAL(15, 2) },
    iur_sos: { type: DataTypes.DECIMAL(15, 2) },
    pemot_ll: { type: DataTypes.DECIMAL(15, 2) },
    pajak: { type: DataTypes.DECIMAL(15, 2) },
    bpjs: { type: DataTypes.DECIMAL(15, 2) },
    tottppber: { type: DataTypes.DECIMAL(15, 2) },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default TppModel;

// (async () => {
//   await db.sync();
// })();
