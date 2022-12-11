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
        kode: req.params.id,
      },
    });
    res.json({
      result: result,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const createJabatan = async (req, res) => {
  try {
    await JabatanModel.create(req.body);
    res.status(201).json({ msg: "Sukses Created Jabatan" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateJabatan = async (req, res) => {
  try {
    await JabatanModel.update(req.body, {
      where: {
        kode: req.params.kode,
      },
    });
    res.status(200).json({ msg: "Sukses Update Jabatan" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteJabatan = async (req, res) => {
  try {
    await JabatanModel.destroy({
      where: {
        kode: req.params.kode,
      },
    });
    res.status(200).json({ msg: "Sukses Delete Jabatan" });
  } catch (error) {
    console.log(error.message);
  }
};
