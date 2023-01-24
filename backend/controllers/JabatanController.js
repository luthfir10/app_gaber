import { Op } from "sequelize";

import JabatanModel from "../models/JabatanModel.js";

export const getJabatan = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const search = req.query.search_query || "";
  const totalRows = await JabatanModel.count({
    where: {
      [Op.or]: [
        {
          kode: {
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
  const result = await JabatanModel.findAll({
    where: {
      [Op.or]: [
        {
          kode: {
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
    offset: offset,
    limit: limit,
    order: [["kode", "ASC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalpage: totalpage,
  });
};

export const getJabatanById = async (req, res) => {
  try {
    const result = await JabatanModel.findOne({
      where: {
        kode: req.params.kode,
      },
    });
    res.json({
      result: result,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createJabatan = async (req, res) => {
  const { kode, nama } = req.body;
  if (kode === null || kode === "")
    return res
      .status(400)
      .json({ message: "Kode jabatan tidak boleh kosong.!" });
  const totalRows = await JabatanModel.count({
    where: {
      kode: kode,
    },
  });
  if (totalRows > 0)
    return res.status(400).json({ message: "Kode jabatan sudah digunakan.!" });
  try {
    await JabatanModel.create({
      kode: kode,
      nama: nama,
    });
    res.status(201).json({ message: "Data berhasil disimpan." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateJabatan = async (req, res) => {
  const totalRows = await JabatanModel.findOne({
    where: {
      kode: req.params.kode,
    },
  });
  if (!totalRows)
    return res.status(404).json({
      message: "Kode jabatan tidak terdaftar data gagal di update.!",
    });
  const { nama } = req.body;
  try {
    await JabatanModel.update(
      {
        nama: nama,
      },
      {
        where: {
          kode: req.params.kode,
        },
      }
    );
    res.status(201).json({ message: "Data berhasil diupdate." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteJabatan = async (req, res) => {
  const totalRows = await JabatanModel.findOne({
    where: {
      kode: req.params.kode,
    },
  });
  if (!totalRows)
    return res.status(404).json({
      message: "Kode tidak terdaftar data gagal di Hapus.!",
    });
  try {
    await JabatanModel.destroy({
      where: {
        kode: req.params.kode,
      },
    });
    res.status(201).json({ message: "Data berhasil dihapus." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
