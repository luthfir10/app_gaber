import TppModel from "../models/TppModel.js";
import AbsenModel from "../models/AbsenModel.js";
import PegawaiModel from "../models/PegawaiModel.js";
import JabatanModel from "../models/JabatanModel.js";

AbsenModel.hasMany(TppModel, { foreignKey: "id_absen" });
TppModel.belongsTo(AbsenModel, { foreignKey: "id_absen" });

PegawaiModel.hasMany(TppModel, { foreignKey: "nip" });
TppModel.belongsTo(PegawaiModel, { foreignKey: "nip" });

PegawaiModel.hasMany(AbsenModel, { foreignKey: "nip" });
AbsenModel.belongsTo(PegawaiModel, { foreignKey: "nip" });

JabatanModel.hasMany(PegawaiModel, { foreignKey: "kode_jabatan" });
PegawaiModel.belongsTo(JabatanModel, { foreignKey: "kode_jabatan" });

export const listTppNip = async (req, res) => {
  const bulantpp = req.params.bulantpp;
  const tahuntpp = req.params.tahuntpp;
  const nip = req.params.nip;
  if (bulantpp !== null && tahuntpp !== "" && nip !== "") {
    const datatpp = await TppModel.findOne({
      where: {
        nip: nip,
        bulan: bulantpp,
        tahun: tahuntpp,
      },
      include: [
        {
          model: PegawaiModel,
          attributes: ["nama", "gol"],
          include: {
            model: JabatanModel,
            attributes: ["nama"],
          },
        },
      ],
    });
    if (!datatpp)
      return res.status(404).json({ message: "Data TPP tidak ditemukan!!" });
    res.status(200).json({
      result: datatpp,
    });
  } else {
    res.status(400).json({ message: "Data belum lengkap!!" });
  }
};
