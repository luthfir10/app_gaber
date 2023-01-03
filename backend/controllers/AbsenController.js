import AbsenModel from "../models/AbsenModel.js";
import PegawaiModel from "../models/PegawaiModel.js";

PegawaiModel.hasMany(AbsenModel, { foreignKey: "nip" });
AbsenModel.belongsTo(PegawaiModel, { foreignKey: "nip" });

export const getNip = async (req, res) => {
  const bulan = req.params.bulan;
  const tahun = req.params.tahun;
  if (bulan !== undefined && tahun !== null) {
    const nippegawai = await PegawaiModel.findAll({
      attributes: ["nip"],
      order: [["nip", "ASC"]],
    });

    res.status(200).json({ nippegawai });
  } else {
    res.status(200).json("data belum lengkap!!");
  }

  //   for (let i = 0; i < nippegawai.length; i++) {
  //     await AbsenModel.create({ nip: nippegawai[i].nip });
  //   }
};
