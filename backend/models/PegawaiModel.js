import { Sequelize } from "sequelize";
import dbtpp from "../config/Database.js";

const { DataTypes } = Sequelize;

const PegawaiModel = dbtpp.define(
  "pegawai",
  {
    nip: { type: DataTypes.BIGINT(18), primaryKey: true },
    nama: DataTypes.STRING,
    kode_kelurahan: { type: DataTypes.STRING(5) },
    gol: { type: DataTypes.STRING(10) },
    kode_jabatan: { type: DataTypes.STRING(5) },
    tgl: { type: DataTypes.DATEONLY },
    alamat: DataTypes.STRING,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

export default PegawaiModel;

// (async () => {
//   await db.sync();
// })();
