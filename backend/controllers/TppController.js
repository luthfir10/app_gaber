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

export const listAbsen = async (req, res) => {
  const bulantpp = req.params.bulantpp;
  const tahuntpp = req.params.tahuntpp;
  const bulanabsen = req.params.bulanabsen;
  const tahunabsen = req.params.tahunabsen;
  if (bulantpp !== null && tahuntpp !== "") {
    const validdata = await TppModel.count({
      where: {
        bulan: bulantpp,
        tahun: tahuntpp,
      },
    });
    if (validdata === 0) {
      const validabsen = await AbsenModel.count({
        where: {
          bulan: bulanabsen,
          tahun: tahunabsen,
        },
      });
      if (validabsen > 0) {
        const nippegawai = await AbsenModel.findAll({
          where: {
            bulan: bulanabsen,
            tahun: tahunabsen,
          },
          attributes: ["id", "nip", "jum_pot"],
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
        res.json({
          result: nippegawai,
        });
      } else {
        res
          .status(400)
          .json({ message: "Bulan dan Tahun Absen belum di proses" });
      }
    } else {
      res.status(400).json({ message: "Bulan dan Tahun TPP sudah di proses" });
    }
  } else {
    res.status(400).json({ message: "data belum lengkap!!" });
  }
};

export const createTpp = async (req, res) => {
  let tpparray = req.body.newarraytpp;
  try {
    for (let i = 0; i < tpparray.length; i++) {
      let saldo60 = tpparray[i].saldo_tpp * 0.6;
      let saldo40 = tpparray[i].saldo_tpp * 0.4;
      let potabsen = (saldo40 * tpparray[i].jum_pot) / 100;
      let rpskp = (tpparray[i].saldo_tpp * tpparray[i].nilskp) / 100;
      let rpkehad = saldo40 - potabsen;
      let tppkotor = rpskp + rpkehad;
      let rppajak = 0;
      if (
        tpparray[i].gol === "IV.a" ||
        tpparray[i].gol === "IV.b" ||
        tpparray[i].gol === "IV.c" ||
        tpparray[i].gol === "IV.d" ||
        tpparray[i].gol === "IV.e"
      ) {
        rppajak = tppkotor * 0.15;
      } else if (
        tpparray[i].gol === "III.a" ||
        tpparray[i].gol === "III.b" ||
        tpparray[i].gol === "III.c" ||
        tpparray[i].gol === "III.d"
      ) {
        rppajak = tppkotor * 0.05;
      } else {
        rppajak = tppkotor * 0;
      }

      let rpbpjs = tpparray[i].saldo_tpp * 0.01;
      let tppbpjspajak = tppkotor - rppajak - rpbpjs;
      let tppbersih = tppbpjspajak - tpparray[i].iur_sos - tpparray[i].pemot_ll;
      await TppModel.create({
        nip: tpparray[i].nip,
        id_absen: tpparray[i].id,
        bulan: tpparray[i].bulan_tpp,
        tahun: tpparray[i].tahun_tpp,
        saldo_tpp: tpparray[i].saldo_tpp,
        iur_sos: tpparray[i].iur_sos,
        pemot_ll: tpparray[i].pemot_ll,
        nilskp: tpparray[i].nilskp,
        harskp: rpskp,
        harkeha: rpkehad,
        tottppkot: tppkotor,
        pajak: rppajak,
        bpjs: rpbpjs,
        tottppber: tppbersih,
      });
    }
    res.status(201).json({ message: "Sukses Proses TPP..!" });
  } catch (error) {
    console.log(error.message);
  }
};

export const getrepotrTpp = async (req, res) => {
  const bulan = req.params.bulan;
  const tahun = req.params.tahun;
  console.log(bulan + " " + tahun);
  if (bulan === undefined && tahun === undefined)
    return res
      .status(404)
      .json({ message: "Harap menginputkan bulan dan tahun.!!" });
  const validdata = await TppModel.count({
    where: {
      bulan: bulan,
      tahun: tahun,
    },
  });
  if (validdata === 0)
    res.status(400).json({ message: "Bulan dan Tahun belum di proses" });

  try {
    const result = await TppModel.findAll({
      where: {
        bulan: bulan,
        tahun: tahun,
      },
      include: [
        {
          model: PegawaiModel,
        },
      ],
    });
    res.json({
      result: result,
    });
  } catch (error) {
    console.log(error.message);
  }
};
