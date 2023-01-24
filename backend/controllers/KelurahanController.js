import { Op } from "sequelize";

import KelurahanModel from "../models/KelurahanModel.js";

export const getKelurahan = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const search = req.query.search_query || "";
  const totalRows = await KelurahanModel.count({
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
  const result = await KelurahanModel.findAll({
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

export const getKeluruhanById = async (req, res) => {
  try {
    const result = await KelurahanModel.findOne({
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

export const createKelurahan = async (req, res) => {
  const { kode, nama, alamat } = req.body;
  if (kode === null || kode === "")
    return res.status(400).json({ message: "Kode tidak boleh kosong.!" });
  const totalRows = await KelurahanModel.count({
    where: {
      kode: kode,
    },
  });
  if (totalRows > 0)
    return res
      .status(400)
      .json({ message: "Kode sudah digunakan data gagal tersimpan.!" });
  try {
    await KelurahanModel.create({
      kode: kode,
      nama: nama,
      alamat: alamat,
    });
    res.status(201).json({ message: "Data berhasil disimpan." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateKelurahan = async (req, res) => {
  const totalRows = await KelurahanModel.findOne({
    where: {
      kode: req.params.kode,
    },
  });
  if (!totalRows)
    return res.status(404).json({
      message: "Kode tidak terdaftar data gagal di update.!",
    });
  const { nama, alamat } = req.body;

  try {
    await KelurahanModel.update(
      {
        nama: nama,
        alamat: alamat,
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

export const deleteKelurahan = async (req, res) => {
  const totalRows = await KelurahanModel.findOne({
    where: {
      kode: req.params.kode,
    },
  });
  if (!totalRows)
    return res.status(404).json({
      message: "Kode tidak terdaftar data gagal di Hapus.!",
    });

  try {
    await KelurahanModel.destroy({
      where: {
        kode: req.params.kode,
      },
    });
    res.status(201).json({ message: "Data berhasil dihapus." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
