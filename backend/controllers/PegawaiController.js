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
    console.log(error.message);
  }
};

export const createPegawai = async (req, res) => {
  try {
    await PegawaiModel.create(req.body);
    res.status(201).json({ msg: "Sukses Created Pegawai" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePegawai = async (req, res) => {
  try {
    await PegawaiModel.update(req.body, {
      where: {
        nip: req.params.nip,
      },
    });
    res.status(200).json({ msg: "Sukses Update Pegawai" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePegawai = async (req, res) => {
  try {
    await PegawaiModel.destroy({
      where: {
        nip: req.params.nip,
      },
    });
    res.status(200).json({ msg: "Sukses Delete Pegawai" });
  } catch (error) {
    console.log(error.message);
  }
};
