import AbsenModel from "../models/AbsenModel.js";
import PegawaiModel from "../models/PegawaiModel.js";

PegawaiModel.hasMany(AbsenModel, { foreignKey: "nip" });
AbsenModel.belongsTo(PegawaiModel, { foreignKey: "nip" });

export const getNip = async (req, res) => {
  const bulan = req.params.bulan;
  const tahun = req.params.tahun;
  if (bulan !== null && tahun !== "") {
    const validdata = await AbsenModel.count({
      where: {
        bulan: bulan,
        tahun: tahun,
      },
    });
    if (validdata === 0) {
      const nippegawai = await PegawaiModel.findAll({
        attributes: ["nip", "nama"],
        order: [["kode_kelurahan", "ASC"]],
      });
      res.json({
        result: nippegawai,
      });
    } else {
      res.status(200).json("Bulan dan Tahun sudah di proses");
    }
  } else {
    res.status(200).json("data belum lengkap!!");
  }
};

export const createAbsen = async (req, res) => {
  let absenarray = req.body.newarrayabsn;
  try {
    for (let i = 0; i < absenarray.length; i++) {
      await AbsenModel.create({
        nip: absenarray[i].nip,
        bulan: absenarray[i].bulan,
        tahun: absenarray[i].tahun,
        jum_tpp: absenarray[i].jum_tpp,
        tk: absenarray[i].tk,
        ta: absenarray[i].ta,
        tms: absenarray[i].tms,
        td1: absenarray[i].td1,
        td2: absenarray[i].td2,
        td3: absenarray[i].td3,
        td4: absenarray[i].td4,
        psj1: absenarray[i].psj1,
        psj2: absenarray[i].psj2,
        psj3: absenarray[i].psj3,
        psj4: absenarray[i].psj4,
        clt: absenarray[i].clt,
      });
    }
    res.status(201).json({ msg: "Sukses Created Absen" });
  } catch (error) {
    console.log(error.message);
  }
  // console.log(req.body);
};
