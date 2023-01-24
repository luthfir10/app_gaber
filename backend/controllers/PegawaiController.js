import { Op } from "sequelize";

import PegawaiModel from "../models/PegawaiModel.js";
import KelurahanModel from "../models/KelurahanModel.js";
import JabatanModel from "../models/JabatanModel.js";

KelurahanModel.hasMany(PegawaiModel, { foreignKey: "kode_kelurahan" });
PegawaiModel.belongsTo(KelurahanModel, { foreignKey: "kode_kelurahan" });

JabatanModel.hasMany(PegawaiModel, { foreignKey: "kode_jabatan" });
PegawaiModel.belongsTo(JabatanModel, { foreignKey: "kode_jabatan" });

export const getPegawai = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const search = req.query.search_query || "";
  const totalRows = await PegawaiModel.count({
    where: {
      [Op.or]: [
        {
          nip: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          nama: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });
  const limit = parseInt(req.query.limit) || totalRows;
  const offset = limit * page;
  const totalpage = Math.ceil(totalRows / limit);
  const result = await PegawaiModel.findAll({
    where: {
      [Op.or]: [
        {
          nip: {
            [Op.like]: "%" + search + "%",
          },
        },
        {
          nama: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
    include: [
      {
        model: KelurahanModel,
      },
      {
        model: JabatanModel,
      },
    ],
    offset: offset,
    limit: limit,
    order: [["nip", "ASC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalpage: totalpage,
  });
};

export const getPegawaiById = async (req, res) => {
  try {
    const result = await PegawaiModel.findOne({
      where: {
        nip: req.params.nip,
      },
      include: [
        {
          model: KelurahanModel,
        },
        {
          model: JabatanModel,
        },
      ],
    });
    res.json({
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPegawai = async (req, res) => {
  const { nip, nama, kode_kelurahan, gol, kode_jabatan, tgl, alamat } =
    req.body;
  if (nip === null || nip === "")
    return res.status(400).json({ message: "Nip tidak boleh kosong.!" });
  const totalRows = await PegawaiModel.count({
    where: {
      nip: nip,
    },
  });
  if (totalRows > 0)
    return res
      .status(400)
      .json({ message: "Nip sudah digunakan data gagal tersimpan.!" });

  try {
    await PegawaiModel.create({
      nip: nip,
      nama: nama,
      kode_kelurahan: kode_kelurahan,
      gol: gol,
      kode_jabatan: kode_jabatan,
      tgl: tgl,
      alamat: alamat,
    });
    res.status(201).json({ message: "Data berhasil disimpan." });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
};

export const updatePegawai = async (req, res) => {
  const totalRows = await PegawaiModel.findOne({
    where: {
      nip: req.params.nip,
    },
  });
  if (!totalRows)
    return res.status(404).json({
      message: "Kode jabatan tidak terdaftar data gagal di update.!",
    });
  const { nama, kode_kelurahan, gol, kode_jabatan, tgl, alamat } = req.body;
  try {
    await PegawaiModel.update(
      {
        nama: nama,
        kode_kelurahan: kode_kelurahan,
        gol: gol,
        kode_jabatan: kode_jabatan,
        tgl: tgl,
        alamat: alamat,
      },
      {
        where: {
          nip: req.params.nip,
        },
      }
    );
    res.status(201).json({ message: "Data berhasil diupdate." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePegawai = async (req, res) => {
  const totalRows = await PegawaiModel.findOne({
    where: {
      nip: req.params.nip,
    },
  });
  if (!totalRows)
    return res.status(404).json({
      message: "Nip tidak terdaftar data gagal di Hapus.!",
    });
  try {
    await PegawaiModel.destroy({
      where: {
        nip: req.params.nip,
      },
    });
    res.status(201).json({ message: "Data berhasil dihapus." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
