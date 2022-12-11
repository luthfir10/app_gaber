import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const PegawaiModel = db.define(
  "pegawai",
  {
    nip: { type: DataTypes.BIGINT(18), primaryKey: true },
    nama: DataTypes.STRING,
    kode_kelurahan: DataTypes.STRING,
    kode_jabatan: DataTypes.STRING,
    tgl: DataTypes.DATE,
    alamat: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);

export default PegawaiModel;

(async () => {
  await db.sync();
})();
