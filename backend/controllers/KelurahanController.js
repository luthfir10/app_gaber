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
    console.log(error.message);
  }
};

export const createKelurahan = async (req, res) => {
  try {
    await KelurahanModel.create(req.body);
    res.status(201).json({ msg: "Sukses Created Kelurahan" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateKelurahan = async (req, res) => {
  try {
    await KelurahanModel.update(req.body, {
      where: {
        kode: req.params.kode,
      },
    });
    res.status(200).json({ msg: "Sukses Update Kelurahan" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteKelurahan = async (req, res) => {
  try {
    await KelurahanModel.destroy({
      where: {
        kode: req.params.kode,
      },
    });
    res.status(200).json({ msg: "Sukses Delete Kelurahan" });
  } catch (error) {
    console.log(error.message);
  }
};
