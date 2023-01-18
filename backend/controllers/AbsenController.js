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
        order: [
          ["kode_kelurahan", "ASC"],
          ["kode_jabatan", "ASC"],
        ],
      });
      res.json({
        result: nippegawai,
      });
    } else {
      res.status(400).json({ message: "Bulan dan Tahun sudah di proses" });
    }
  } else {
    res.status(400).json({ message: "data belum lengkap!!" });
  }
};

export const createAbsen = async (req, res) => {
  let absenarray = req.body.newarrayabsn;
  try {
    for (let i = 0; i < absenarray.length; i++) {
      let tottk = absenarray[i].tk * 3;
      let totta = absenarray[i].ta * 1;
      let tottms = absenarray[i].tms * 1;
      let tottd1 = absenarray[i].td1 * 0.5;
      let tottd2 = absenarray[i].td2 * 1;
      let tottd3 = absenarray[i].td3 * 1.25;
      let tottd4 = absenarray[i].td4 * 1.5;
      let totpsj1 = absenarray[i].psj1 * 0.5;
      let totpsj2 = absenarray[i].psj2 * 1;
      let totpsj3 = absenarray[i].psj3 * 1.25;
      let totpsj4 = absenarray[i].psj4 * 1.5;
      let totallp =
        tottk +
        totta +
        tottms +
        tottd1 +
        tottd2 +
        tottd3 +
        tottd4 +
        totpsj1 +
        totpsj2 +
        totpsj3 +
        totpsj4;
      await AbsenModel.create({
        nip: absenarray[i].nip,
        bulan: absenarray[i].bulan,
        tahun: absenarray[i].tahun,
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
        jum_pot: totallp,
      });
    }
    res.status(201).json({ msg: "Sukses Created Absen" });
  } catch (error) {
    console.log(error.message);
  }
  // console.log(req.body);
};

export const showdatabsen = async (req, res) => {
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
      try {
        const result = await AbsenModel.findOne({
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
    } else {
      res.status(400).json({ message: "Bulan dan Tahun belum di proses" });
    }
  } else {
    res.status(400).json({ message: "Data belum lengkap!!" });
  }
};
